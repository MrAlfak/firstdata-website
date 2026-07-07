import { jsonError, jsonOk } from "@/lib/auth/api";
import { getPanelUserOrError } from "@/lib/panel/api";
import {
  findUserById,
  setTotpEnabled,
  setTotpSecret,
  getTotpSecret,
} from "@/lib/auth/users";
import { generateTotpSecret, getTotpUri, verifyTotpCode } from "@/lib/auth/totp";
import { userContactLabel, toPublicUser } from "@/lib/auth/types";
import {
  totpEnableSchema,
  totpDisableSchema,
  validationError,
} from "@/lib/auth/account-validation";
import { verifyCurrentPassword, notifyAccountChange } from "@/lib/auth/login-flow";
import { AUTH_ERROR_CODES } from "@/lib/errors/codes";
import { enforceRateLimit } from "@/lib/rate-limit/ip";

export const runtime = "nodejs";

export async function GET() {
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;

  const full = findUserById(user.id);
  if (!full) return jsonError("Not found", 404);

  if (full.totp_enabled) {
    return jsonOk({ enabled: true });
  }

  let secret = getTotpSecret(user.id);
  if (!secret) {
    secret = generateTotpSecret();
    setTotpSecret(user.id, secret);
  }

  const label = userContactLabel(full);
  return jsonOk({
    enabled: false,
    secret,
    uri: getTotpUri(secret, label),
  });
}

export async function POST(req: Request) {
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;

  if (!enforceRateLimit(`account:2fa:${user.id}`, 10, 15 * 60 * 1000)) {
    return jsonError("Too many requests. Try again later.", 429, AUTH_ERROR_CODES.RATE_LIMIT);
  }

  const body = await req.json();
  const parsed = totpEnableSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(validationError(parsed.error), 400, AUTH_ERROR_CODES.VALIDATION);
  }

  const full = findUserById(user.id);
  if (!full) return jsonError("Not found", 404);

  const ok = await verifyCurrentPassword(full, parsed.data.currentPassword);
  if (!ok && full.password_hash) {
    return jsonError("Current password is incorrect", 400, AUTH_ERROR_CODES.CURRENT_PASSWORD_INVALID);
  }

  const secret = getTotpSecret(user.id);
  if (!secret) {
    return jsonError("Setup expired. Refresh and try again.", 400, AUTH_ERROR_CODES.TOTP_INVALID);
  }

  const label = userContactLabel(full);
  if (!verifyTotpCode(secret, label, parsed.data.code)) {
    return jsonError("Invalid authentication code", 401, AUTH_ERROR_CODES.TOTP_INVALID);
  }

  setTotpEnabled(user.id, true);
  notifyAccountChange(user.id, "Two-factor enabled", "Two-factor authentication is now active on your account.");

  const updated = findUserById(user.id);
  return jsonOk({ user: updated ? toPublicUser(updated) : null, enabled: true });
}

export async function DELETE(req: Request) {
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;

  const body = await req.json();
  const parsed = totpDisableSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(validationError(parsed.error), 400, AUTH_ERROR_CODES.VALIDATION);
  }

  const full = findUserById(user.id);
  if (!full?.totp_secret) {
    return jsonError("Two-factor is not enabled", 400, AUTH_ERROR_CODES.TOTP_INVALID);
  }

  const ok = await verifyCurrentPassword(full, parsed.data.currentPassword);
  if (!ok && full.password_hash) {
    return jsonError("Current password is incorrect", 400, AUTH_ERROR_CODES.CURRENT_PASSWORD_INVALID);
  }

  const label = userContactLabel(full);
  if (!verifyTotpCode(full.totp_secret, label, parsed.data.code)) {
    return jsonError("Invalid authentication code", 401, AUTH_ERROR_CODES.TOTP_INVALID);
  }

  setTotpEnabled(user.id, false);
  setTotpSecret(user.id, null);
  notifyAccountChange(user.id, "Two-factor disabled", "Two-factor authentication was turned off.");

  const updated = findUserById(user.id);
  return jsonOk({ user: updated ? toPublicUser(updated) : null, enabled: false });
}
