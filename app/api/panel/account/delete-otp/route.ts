import { jsonError, jsonOk } from "@/lib/auth/api";
import { deliverOtp, jsonOtpDeliveryFailure } from "@/lib/auth/deliver-otp";
import { canSendOtp, createOtp } from "@/lib/auth/otp";
import { getPanelUserOrError } from "@/lib/panel/api";
import { findUserById } from "@/lib/auth/users";
import { AUTH_ERROR_CODES } from "@/lib/errors/codes";

export const runtime = "nodejs";

/** Send OTP required before account deletion (OTP-only users). */
export async function POST() {
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;

  const full = findUserById(user.id);
  if (!full?.email) {
    return jsonError("Add and verify an email before deleting via OTP", 400, AUTH_ERROR_CODES.VALIDATION);
  }

  if (!canSendOtp(full.email, "email")) {
    return jsonError("Too many requests. Try again later.", 429, AUTH_ERROR_CODES.RATE_LIMIT);
  }

  const code = await createOtp(full.email, "email", "delete_account");
  try {
    await deliverOtp({ channel: "email", destination: full.email, code, purpose: "delete_account" });
  } catch (err) {
    return jsonOtpDeliveryFailure(err);
  }

  const payload: Record<string, unknown> = { message: "Deletion confirmation code sent" };
  if (process.env.NODE_ENV !== "production") payload.devCode = code;
  return jsonOk(payload);
}
