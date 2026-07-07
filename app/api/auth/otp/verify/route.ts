import { jsonError } from "@/lib/auth/api";

import { completeLogin } from "@/lib/auth/login-flow";

import { verifyStoredOtp } from "@/lib/auth/otp";

import {

  createUser,

  emailExists,

  findUserByEmail,

  findUserByPhone,

  phoneExists,

} from "@/lib/auth/users";

import {

  otpVerifyDestination,

  otpVerifySchema,

  parsePhone,

  validationError,

} from "@/lib/auth/validation";

import { linkContactLeadsToUser } from "@/lib/panel/auth";

import { AUTH_ERROR_CODES } from "@/lib/errors/codes";



export const runtime = "nodejs";



export async function POST(req: Request) {

  try {

    const body = await req.json();

    const parsed = otpVerifySchema.safeParse(body);

    if (!parsed.success) {

      return jsonError(validationError(parsed.error), 400, AUTH_ERROR_CODES.VALIDATION);

    }



    const { channel, destination } = otpVerifyDestination(parsed.data);

    const { code, purpose } = parsed.data;

    const valid = await verifyStoredOtp(destination, channel, code, purpose);



    if (!valid) {

      return jsonError("Invalid or expired verification code", 401, AUTH_ERROR_CODES.INVALID_OTP);

    }



    const redirect =

      typeof body.redirect === "string" && body.redirect.startsWith("/")

        ? body.redirect

        : undefined;



    if (purpose === "login") {

      const user =

        parsed.data.channel === "email"

          ? findUserByEmail(parsed.data.email)

          : findUserByPhone(parsePhone(parsed.data.phone));



      if (!user) {

        return jsonError(

          parsed.data.channel === "email"

            ? "No account found for this email"

            : "No account found for this mobile number",

          404,

          parsed.data.channel === "email"

            ? AUTH_ERROR_CODES.ACCOUNT_NOT_FOUND

            : AUTH_ERROR_CODES.ACCOUNT_NOT_FOUND_PHONE,

        );

      }

      linkContactLeadsToUser(user.id, user.email, user.phone);

      const result = await completeLogin(user, redirect, req);

      if ("error" in result && result.error) {

        return jsonError(result.error, result.status, result.code);

      }

      return result.response!;

    }



    if (parsed.data.channel === "email") {

      if (emailExists(parsed.data.email)) {

        return jsonError("Email already registered", 409, AUTH_ERROR_CODES.EMAIL_ALREADY_EXISTS);

      }

      const user = await createUser({ email: parsed.data.email, name: parsed.data.name, emailVerified: true });

      linkContactLeadsToUser(user.id, user.email, user.phone);

      const full = findUserByEmail(parsed.data.email)!;

      const result = await completeLogin(full, redirect, req);

      if ("error" in result && result.error) {

        return jsonError(result.error, result.status, result.code);

      }

      return result.response!;

    }



    const phone = parsePhone(parsed.data.phone);

    if (phoneExists(phone)) {

      return jsonError("Mobile number already registered", 409, AUTH_ERROR_CODES.PHONE_ALREADY_EXISTS);

    }

    const user = await createUser({ phone, name: parsed.data.name, phoneVerified: true });

    linkContactLeadsToUser(user.id, user.email, user.phone);

    const full = findUserByPhone(phone)!;

    const result = await completeLogin(full, redirect, req);

    if ("error" in result && result.error) {

      return jsonError(result.error, result.status, result.code);

    }

    return result.response!;

  } catch {

    return jsonError("Verification failed", 500, AUTH_ERROR_CODES.SERVER);

  }

}

