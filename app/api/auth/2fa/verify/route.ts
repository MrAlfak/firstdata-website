import { jsonError } from "@/lib/auth/api";
import { completeLogin } from "@/lib/auth/login-flow";
import { verifyPreAuthToken } from "@/lib/auth/session";
import { findUserById } from "@/lib/auth/users";
import { verifyTotpCode } from "@/lib/auth/totp";
import { totpLoginSchema, validationError } from "@/lib/auth/account-validation";
import { userContactLabel } from "@/lib/auth/types";
import { AUTH_ERROR_CODES } from "@/lib/errors/codes";
import { enforceRateLimit, getClientIp } from "@/lib/rate-limit/ip";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (!enforceRateLimit(`auth:2fa:${ip}`, 10, 15 * 60 * 1000)) {
      return jsonError("Too many requests. Try again later.", 429, AUTH_ERROR_CODES.RATE_LIMIT);
    }

    const body = await req.json();
    const parsed = totpLoginSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(validationError(parsed.error), 400, AUTH_ERROR_CODES.VALIDATION);
    }

    const userId = await verifyPreAuthToken(parsed.data.preAuthToken);
    if (!userId) {
      return jsonError("Session expired. Sign in again.", 401, AUTH_ERROR_CODES.SESSION_FAILED);
    }

    const user = findUserById(userId);
    if (!user || !user.totp_secret || !user.totp_enabled) {
      return jsonError("Two-factor authentication is not enabled", 400, AUTH_ERROR_CODES.TOTP_INVALID);
    }

    const label = userContactLabel(user);
    if (!verifyTotpCode(user.totp_secret, label, parsed.data.code)) {
      return jsonError("Invalid authentication code", 401, AUTH_ERROR_CODES.TOTP_INVALID);
    }

    const redirect =
      typeof body.redirect === "string" && body.redirect.startsWith("/") ? body.redirect : undefined;

    const result = await completeLogin(user, redirect, req, { totpVerified: true });
    if ("error" in result && result.error) {
      return jsonError(result.error, result.status, result.code);
    }
    return result.response!;
  } catch {
    return jsonError("Verification failed", 500, AUTH_ERROR_CODES.SERVER);
  }
}
