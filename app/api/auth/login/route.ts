import { AUTH_ERROR_CODES } from "@/lib/errors/codes";

import { jsonError } from "@/lib/auth/api";

import { completeLogin } from "@/lib/auth/login-flow";

import { linkContactLeadsToUser } from "@/lib/panel/auth";

import { findUserByEmail } from "@/lib/auth/users";

import { verifyPassword } from "@/lib/auth/password";

import { loginSchema, validationError } from "@/lib/auth/validation";

import { enforceRateLimit, getClientIp } from "@/lib/rate-limit/ip";



export const runtime = "nodejs";



const LOGIN_MAX = 10;

const LOGIN_WINDOW_MS = 15 * 60 * 1000;



export async function POST(req: Request) {

  try {

    const ip = getClientIp(req);

    if (!enforceRateLimit(`auth:login:${ip}`, LOGIN_MAX, LOGIN_WINDOW_MS)) {

      return jsonError("Too many requests. Try again later.", 429, AUTH_ERROR_CODES.RATE_LIMIT);

    }



    const body = await req.json();

    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {

      return jsonError(validationError(parsed.error), 400, AUTH_ERROR_CODES.VALIDATION);

    }



    const { email, password } = parsed.data;

    const user = findUserByEmail(email);



    if (!user || !user.password_hash) {

      return jsonError("Invalid email or password", 401, AUTH_ERROR_CODES.INVALID_CREDENTIALS);

    }



    const valid = await verifyPassword(password, user.password_hash);

    if (!valid) {

      return jsonError("Invalid email or password", 401, AUTH_ERROR_CODES.INVALID_CREDENTIALS);

    }



    linkContactLeadsToUser(user.id, user.email, user.phone);



    const redirect =

      typeof body.redirect === "string" && body.redirect.startsWith("/")

        ? body.redirect

        : undefined;



    const result = await completeLogin(user, redirect, req);

    if ("error" in result && result.error) {

      return jsonError(result.error, result.status, result.code);

    }

    return result.response!;

  } catch {

    return jsonError("Login failed", 500, AUTH_ERROR_CODES.SERVER);

  }

}

