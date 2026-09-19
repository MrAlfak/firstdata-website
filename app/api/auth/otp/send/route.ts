import { jsonError, jsonOk } from "@/lib/auth/api";
import { deliverOtp, jsonOtpDeliveryFailure } from "@/lib/auth/deliver-otp";

import { canSendOtp, createOtp } from "@/lib/auth/otp";

import { emailExists, phoneExists } from "@/lib/auth/users";

import {

  otpDestination,

  otpSendSchema,

  parsePhone,

  validationError,

} from "@/lib/auth/validation";

import { AUTH_ERROR_CODES } from "@/lib/errors/codes";

import { enforceRateLimit, getClientIp } from "@/lib/rate-limit/ip";

import type { OtpPurpose } from "@/lib/auth/types";



export const runtime = "nodejs";



const PUBLIC_OTP_PURPOSES: OtpPurpose[] = ["login", "register", "reset_password"];



export async function POST(req: Request) {

  try {

    const ip = getClientIp(req);

    if (!enforceRateLimit(`auth:otp:${ip}`, 12, 15 * 60 * 1000)) {

      return jsonError("Too many requests. Try again later.", 429, AUTH_ERROR_CODES.RATE_LIMIT);

    }



    const body = await req.json();

    const parsed = otpSendSchema.safeParse(body);

    if (!parsed.success) {

      return jsonError(validationError(parsed.error), 400, AUTH_ERROR_CODES.VALIDATION);

    }



    const { channel, destination } = otpDestination(parsed.data);

    const { purpose } = parsed.data;



    if (!PUBLIC_OTP_PURPOSES.includes(purpose)) {

      return jsonError("Use account settings for this verification", 403, AUTH_ERROR_CODES.VALIDATION);

    }



    if (parsed.data.channel === "email") {

      const email = parsed.data.email.trim().toLowerCase();

      if (purpose === "login" && !emailExists(email)) {

        return jsonError("No account found for this email", 404, AUTH_ERROR_CODES.ACCOUNT_NOT_FOUND);

      }

      if (purpose === "register" && emailExists(email)) {

        return jsonError("Email already registered", 409, AUTH_ERROR_CODES.EMAIL_ALREADY_EXISTS);

      }

      if (purpose === "reset_password" && !emailExists(email)) {

        return jsonError("No account found for this email", 404, AUTH_ERROR_CODES.ACCOUNT_NOT_FOUND);

      }

    }



    if (parsed.data.channel === "sms") {

      const phone = parsePhone(parsed.data.phone);

      if (purpose === "login" && !phoneExists(phone)) {

        return jsonError("No account found for this mobile number", 404, AUTH_ERROR_CODES.ACCOUNT_NOT_FOUND_PHONE);

      }

      if (purpose === "register" && phoneExists(phone)) {

        return jsonError("Mobile number already registered", 409, AUTH_ERROR_CODES.PHONE_ALREADY_EXISTS);

      }

      if (purpose === "reset_password" && !phoneExists(phone)) {

        return jsonError("No account found for this mobile number", 404, AUTH_ERROR_CODES.ACCOUNT_NOT_FOUND_PHONE);

      }

    }



    if (!canSendOtp(destination, channel)) {

      return jsonError("Too many requests. Try again later.", 429, AUTH_ERROR_CODES.RATE_LIMIT);

    }



    const code = await createOtp(destination, channel, purpose);

    await deliverOtp({ channel, destination, code, purpose });



    const payload: Record<string, unknown> = {

      message: "Verification code sent",

      channel,

      expiresIn: 600,

    };



    if (process.env.NODE_ENV !== "production") {

      payload.devCode = code;

    }



    return jsonOk(payload);
  } catch (err) {
    return jsonOtpDeliveryFailure(err);
  }

}

