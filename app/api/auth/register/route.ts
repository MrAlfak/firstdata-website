import { jsonError } from "@/lib/auth/api";

import { completeLogin } from "@/lib/auth/login-flow";

import { deliverOtp } from "@/lib/auth/deliver-otp";

import { canSendOtp, createOtp } from "@/lib/auth/otp";

import { linkContactLeadsToUser } from "@/lib/panel/auth";

import { createUser, emailExists } from "@/lib/auth/users";

import { registerSchema, validationError } from "@/lib/auth/validation";

import { AUTH_ERROR_CODES } from "@/lib/errors/codes";

import { enforceRateLimit, getClientIp } from "@/lib/rate-limit/ip";



export const runtime = "nodejs";



const REGISTER_MAX = 8;

const REGISTER_WINDOW_MS = 15 * 60 * 1000;



export async function POST(req: Request) {

  try {

    const ip = getClientIp(req);

    if (!enforceRateLimit(`auth:register:${ip}`, REGISTER_MAX, REGISTER_WINDOW_MS)) {

      return jsonError("Too many requests. Try again later.", 429, AUTH_ERROR_CODES.RATE_LIMIT);

    }



    const body = await req.json();

    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {

      return jsonError(validationError(parsed.error), 400, AUTH_ERROR_CODES.VALIDATION);

    }



    const { name, email, password } = parsed.data;



    if (emailExists(email)) {

      return jsonError("Email already registered", 409, AUTH_ERROR_CODES.EMAIL_ALREADY_EXISTS);

    }



    const user = await createUser({ name, email, password, emailVerified: false });

    linkContactLeadsToUser(user.id, user.email, user.phone);



    if (canSendOtp(email.trim().toLowerCase(), "email")) {
      try {
        const code = await createOtp(email.trim().toLowerCase(), "email", "verify_email");
        await deliverOtp({ channel: "email", destination: email.trim().toLowerCase(), code, purpose: "verify_email" });
      } catch {
        // Password signup still succeeds if transactional email is not configured.
      }
    }



    const result = await completeLogin(

      (await import("@/lib/auth/users")).findUserById(user.id)!,

      undefined,

      req,

    );

    if ("error" in result && result.error) {

      return jsonError(result.error, result.status, result.code);

    }

    return result.response!;

  } catch {

    return jsonError("Registration failed", 500, AUTH_ERROR_CODES.SERVER);

  }

}

