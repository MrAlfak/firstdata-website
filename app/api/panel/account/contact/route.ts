import { jsonError, jsonOk } from "@/lib/auth/api";
import { getPanelUserOrError } from "@/lib/panel/api";
import { deliverOtp } from "@/lib/auth/deliver-otp";
import { canSendOtp, createOtp, verifyStoredOtp } from "@/lib/auth/otp";
import { emailExists, findUserById, phoneExists, markEmailVerified, markPhoneVerified } from "@/lib/auth/users";
import {
  contactChangeSendSchema,
  contactChangeConfirmSchema,
  validationError,
} from "@/lib/auth/account-validation";
import { parsePhone } from "@/lib/auth/validation";
import { updateUserProfile } from "@/lib/panel/repository";
import { notifyAccountChange } from "@/lib/auth/login-flow";
import { toPublicUser } from "@/lib/auth/types";
import { AUTH_ERROR_CODES } from "@/lib/errors/codes";
import { enforceRateLimit } from "@/lib/rate-limit/ip";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;

  if (!enforceRateLimit(`account:contact:${user.id}`, 8, 15 * 60 * 1000)) {
    return jsonError("Too many requests. Try again later.", 429, AUTH_ERROR_CODES.RATE_LIMIT);
  }

  const body = await req.json();
  const parsed = contactChangeSendSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(validationError(parsed.error), 400, AUTH_ERROR_CODES.VALIDATION);
  }

  const channel = parsed.data.channel;
  const destination =
    channel === "email"
      ? parsed.data.email.trim().toLowerCase()
      : parsePhone(parsed.data.phone);

  if (channel === "email" && emailExists(destination)) {
    return jsonError("Email already in use", 409, AUTH_ERROR_CODES.EMAIL_ALREADY_EXISTS);
  }
  if (channel === "sms" && phoneExists(destination)) {
    return jsonError("Mobile number already in use", 409, AUTH_ERROR_CODES.PHONE_ALREADY_EXISTS);
  }

  if (!canSendOtp(destination, channel)) {
    return jsonError("Too many requests. Try again later.", 429, AUTH_ERROR_CODES.RATE_LIMIT);
  }

  const purpose = channel === "email" ? "change_email" : "change_phone";
  const code = await createOtp(destination, channel, purpose);
  await deliverOtp({ channel, destination, code, purpose });

  const payload: Record<string, unknown> = { message: "Verification code sent", channel };
  if (process.env.NODE_ENV !== "production") payload.devCode = code;
  return jsonOk(payload);
}

export async function PATCH(req: Request) {
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;

  const body = await req.json();
  const parsed = contactChangeConfirmSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(validationError(parsed.error), 400, AUTH_ERROR_CODES.VALIDATION);
  }

  const channel = parsed.data.channel;
  const destination =
    channel === "email"
      ? parsed.data.email.trim().toLowerCase()
      : parsePhone(parsed.data.phone);
  const purpose = channel === "email" ? "change_email" : "change_phone";

  const ok = await verifyStoredOtp(destination, channel, parsed.data.code, purpose);
  if (!ok) {
    return jsonError("Invalid or expired verification code", 401, AUTH_ERROR_CODES.INVALID_OTP);
  }

  if (channel === "email") {
    if (emailExists(destination)) {
      return jsonError("Email already in use", 409, AUTH_ERROR_CODES.EMAIL_ALREADY_EXISTS);
    }
    updateUserProfile(user.id, { email: destination });
    markEmailVerified(user.id);
    notifyAccountChange(user.id, "Email updated", `Your email was changed to ${destination}.`);
  } else {
    if (phoneExists(destination)) {
      return jsonError("Mobile number already in use", 409, AUTH_ERROR_CODES.PHONE_ALREADY_EXISTS);
    }
    updateUserProfile(user.id, { phone: destination });
    markPhoneVerified(user.id);
    notifyAccountChange(user.id, "Mobile updated", "Your mobile number was updated.");
  }

  const updated = findUserById(user.id);
  return jsonOk({ user: updated ? toPublicUser(updated) : null });
}
