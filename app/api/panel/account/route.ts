import { jsonError, jsonOk } from "@/lib/auth/api";
import { getPanelUserOrError } from "@/lib/panel/api";
import { findUserById } from "@/lib/auth/users";
import { hashPassword } from "@/lib/auth/password";
import { toPublicUser } from "@/lib/auth/types";
import {
  accountPatchSchema,
  accountDeleteSchema,
  validationError,
} from "@/lib/auth/account-validation";
import { verifyCurrentPassword, notifyAccountChange } from "@/lib/auth/login-flow";
import { linkContactLeadsToUser } from "@/lib/panel/auth";
import { setUserPassword, updateUserProfile } from "@/lib/panel/repository";
import { deactivateUser } from "@/lib/auth/users";
import { revokeAllUserSessions } from "@/lib/auth/sessions";
import { clearSessionCookie } from "@/lib/auth/session";
import { verifyStoredOtp } from "@/lib/auth/otp";
import { AUTH_ERROR_CODES } from "@/lib/errors/codes";
import { enforceRateLimit } from "@/lib/rate-limit/ip";

export const runtime = "nodejs";

export async function GET() {
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;
  const full = findUserById(user.id);
  if (!full) return jsonError("Not found", 404);
  return jsonOk({ user: toPublicUser(full) });
}

export async function PATCH(req: Request) {
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;

  if (!enforceRateLimit(`account:patch:${user.id}`, 20, 15 * 60 * 1000)) {
    return jsonError("Too many requests. Try again later.", 429, AUTH_ERROR_CODES.RATE_LIMIT);
  }

  const body = await req.json();
  const parsed = accountPatchSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(validationError(parsed.error), 400, AUTH_ERROR_CODES.VALIDATION);
  }

  const full = findUserById(user.id);
  if (!full) return jsonError("Not found", 404);

  if (parsed.data.name || parsed.data.panelSkin) {
    updateUserProfile(user.id, {
      ...(parsed.data.name ? { name: parsed.data.name } : {}),
      ...(parsed.data.panelSkin ? { panelSkin: parsed.data.panelSkin } : {}),
    });
  }

  if (parsed.data.password) {
    const ok = await verifyCurrentPassword(full, parsed.data.currentPassword);
    if (!ok) {
      return jsonError(
        full.password_hash ? "Current password is incorrect" : "Current password required",
        400,
        full.password_hash
          ? AUTH_ERROR_CODES.CURRENT_PASSWORD_INVALID
          : AUTH_ERROR_CODES.CURRENT_PASSWORD_REQUIRED,
      );
    }
    const hash = await hashPassword(parsed.data.password);
    setUserPassword(user.id, hash);
    notifyAccountChange(user.id, "Password updated", "Your account password was changed.");
  }

  const updated = findUserById(user.id);
  if (updated) linkContactLeadsToUser(updated.id, updated.email, updated.phone);
  return jsonOk({ user: updated ? toPublicUser(updated) : null });
}

export async function DELETE(req: Request) {
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;

  const body = await req.json();
  const parsed = accountDeleteSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(validationError(parsed.error), 400, AUTH_ERROR_CODES.VALIDATION);
  }

  const full = findUserById(user.id);
  if (!full) return jsonError("Not found", 404);

  if (full.password_hash) {
    const ok = await verifyCurrentPassword(full, parsed.data.currentPassword);
    if (!ok) {
      return jsonError("Current password is incorrect", 400, AUTH_ERROR_CODES.CURRENT_PASSWORD_INVALID);
    }
  } else if (full.email && parsed.data.otpCode) {
    const ok = await verifyStoredOtp(full.email, "email", parsed.data.otpCode, "delete_account");
    if (!ok) {
      return jsonError("Invalid or expired verification code", 401, AUTH_ERROR_CODES.INVALID_OTP);
    }
  } else {
    return jsonError("Verification required to delete account", 400, AUTH_ERROR_CODES.VALIDATION);
  }

  deactivateUser(user.id);
  revokeAllUserSessions(user.id);
  await clearSessionCookie();
  return jsonOk({ message: "Account deactivated" });
}
