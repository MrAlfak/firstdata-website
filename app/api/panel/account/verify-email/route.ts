import { jsonError, jsonOk } from "@/lib/auth/api";
import { deliverOtp, jsonOtpDeliveryFailure } from "@/lib/auth/deliver-otp";
import { canSendOtp, createOtp, verifyStoredOtp } from "@/lib/auth/otp";
import { getPanelUserOrError } from "@/lib/panel/api";
import { findUserById, markEmailVerified } from "@/lib/auth/users";
import { verifyEmailConfirmSchema, validationError } from "@/lib/auth/account-validation";
import { notifyAccountChange } from "@/lib/auth/login-flow";
import { AUTH_ERROR_CODES } from "@/lib/errors/codes";
import { enforceRateLimit } from "@/lib/rate-limit/ip";

export const runtime = "nodejs";

export async function POST() {
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;

  if (!enforceRateLimit(`account:verify-email:${user.id}`, 5, 15 * 60 * 1000)) {
    return jsonError("Too many requests. Try again later.", 429, AUTH_ERROR_CODES.RATE_LIMIT);
  }

  const full = findUserById(user.id);
  if (!full?.email) {
    return jsonError("No email on this account", 400, AUTH_ERROR_CODES.VALIDATION);
  }

  if (full.email_verified_at) {
    return jsonOk({ message: "Email already verified" });
  }

  if (!canSendOtp(full.email, "email")) {
    return jsonError("Too many requests. Try again later.", 429, AUTH_ERROR_CODES.RATE_LIMIT);
  }

  const code = await createOtp(full.email, "email", "verify_email");
  try {
    await deliverOtp({ channel: "email", destination: full.email, code, purpose: "verify_email" });
  } catch (err) {
    return jsonOtpDeliveryFailure(err);
  }

  const payload: Record<string, unknown> = { message: "Verification code sent" };
  if (process.env.NODE_ENV !== "production") payload.devCode = code;
  return jsonOk(payload);
}

export async function PATCH(req: Request) {
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;

  const body = await req.json();
  const parsed = verifyEmailConfirmSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(validationError(parsed.error), 400, AUTH_ERROR_CODES.VALIDATION);
  }

  const full = findUserById(user.id);
  if (!full?.email) {
    return jsonError("No email on this account", 400, AUTH_ERROR_CODES.VALIDATION);
  }

  const ok = await verifyStoredOtp(full.email, "email", parsed.data.code, "verify_email");
  if (!ok) {
    return jsonError("Invalid or expired verification code", 401, AUTH_ERROR_CODES.INVALID_OTP);
  }

  markEmailVerified(user.id);
  notifyAccountChange(user.id, "Email verified", "Your email address has been verified.");

  const updated = findUserById(user.id);
  const { toPublicUser } = await import("@/lib/auth/types");
  return jsonOk({ user: updated ? toPublicUser(updated) : null });
}
