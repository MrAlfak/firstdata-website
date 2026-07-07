import { jsonError, jsonOk } from "@/lib/auth/api";
import { verifyStoredOtp } from "@/lib/auth/otp";
import { hashPassword } from "@/lib/auth/password";
import { findUserByEmail, findUserByPhone } from "@/lib/auth/users";
import {
  passwordResetConfirmSchema,
  validationError,
} from "@/lib/auth/account-validation";
import { parsePhone } from "@/lib/auth/validation";
import { setUserPassword } from "@/lib/panel/repository";
import { revokeAllUserSessions } from "@/lib/auth/sessions";
import { AUTH_ERROR_CODES } from "@/lib/errors/codes";
import { enforceRateLimit, getClientIp } from "@/lib/rate-limit/ip";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (!enforceRateLimit(`auth:reset-confirm:${ip}`, 10, 15 * 60 * 1000)) {
      return jsonError("Too many requests. Try again later.", 429, AUTH_ERROR_CODES.RATE_LIMIT);
    }

    const body = await req.json();
    const parsed = passwordResetConfirmSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(validationError(parsed.error), 400, AUTH_ERROR_CODES.VALIDATION);
    }

    if (parsed.data.password !== parsed.data.confirmPassword) {
      return jsonError("Password mismatch", 400, AUTH_ERROR_CODES.PASSWORD_MISMATCH);
    }

    const channel = parsed.data.channel;
    const destination =
      channel === "email"
        ? parsed.data.email.trim().toLowerCase()
        : parsePhone(parsed.data.phone);

    const ok = await verifyStoredOtp(destination, channel, parsed.data.code, "reset_password");
    if (!ok) {
      return jsonError("Invalid or expired verification code", 401, AUTH_ERROR_CODES.INVALID_OTP);
    }

    const user =
      channel === "email"
        ? findUserByEmail(parsed.data.email)
        : findUserByPhone(parsePhone(parsed.data.phone));

    if (!user) {
      return jsonError("Account not found", 404, AUTH_ERROR_CODES.ACCOUNT_NOT_FOUND);
    }

    const hash = await hashPassword(parsed.data.password);
    setUserPassword(user.id, hash);
    revokeAllUserSessions(user.id);

    return jsonOk({ message: "Password updated. Please sign in again." });
  } catch {
    return jsonError("Password reset failed", 500, AUTH_ERROR_CODES.SERVER);
  }
}
