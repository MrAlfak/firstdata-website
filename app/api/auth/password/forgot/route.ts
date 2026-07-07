import { jsonError, jsonOk } from "@/lib/auth/api";
import { deliverOtp } from "@/lib/auth/deliver-otp";
import { canSendOtp, createOtp } from "@/lib/auth/otp";
import { emailExists, phoneExists } from "@/lib/auth/users";
import {
  passwordResetRequestSchema,
  validationError,
} from "@/lib/auth/account-validation";
import { parsePhone } from "@/lib/auth/validation";
import { AUTH_ERROR_CODES } from "@/lib/errors/codes";
import { enforceRateLimit, getClientIp } from "@/lib/rate-limit/ip";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (!enforceRateLimit(`auth:reset:${ip}`, 8, 15 * 60 * 1000)) {
      return jsonError("Too many requests. Try again later.", 429, AUTH_ERROR_CODES.RATE_LIMIT);
    }

    const body = await req.json();
    const parsed = passwordResetRequestSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(validationError(parsed.error), 400, AUTH_ERROR_CODES.VALIDATION);
    }

    const channel = parsed.data.channel;
    const destination =
      channel === "email"
        ? parsed.data.email.trim().toLowerCase()
        : parsePhone(parsed.data.phone);

    const exists =
      channel === "email" ? emailExists(destination) : phoneExists(destination);
    if (!exists) {
      return jsonError(
        channel === "email" ? "No account found for this email" : "No account found for this mobile number",
        404,
        channel === "email" ? AUTH_ERROR_CODES.ACCOUNT_NOT_FOUND : AUTH_ERROR_CODES.ACCOUNT_NOT_FOUND_PHONE,
      );
    }

    if (!canSendOtp(destination, channel)) {
      return jsonError("Too many requests. Try again later.", 429, AUTH_ERROR_CODES.RATE_LIMIT);
    }

    const code = await createOtp(destination, channel, "reset_password");
    await deliverOtp({ channel, destination, code, purpose: "reset_password" });

    const payload: Record<string, unknown> = { message: "Reset code sent", channel, expiresIn: 600 };
    if (process.env.NODE_ENV !== "production") payload.devCode = code;
    return jsonOk(payload);
  } catch {
    return jsonError("Failed to send reset code", 500, AUTH_ERROR_CODES.OTP_SEND_FAILED);
  }
}
