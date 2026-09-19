import { jsonError } from "@/lib/auth/api";
import { sendOtpEmail } from "./mail";
import { sendOtpSms } from "./sms";
import { AUTH_ERROR_CODES } from "@/lib/errors/codes";
import type { OtpChannel, OtpPurpose } from "./types";

type DeliverOtpInput = {
  channel: OtpChannel;
  destination: string;
  code: string;
  purpose: OtpPurpose;
};

export class OtpDeliveryNotConfiguredError extends Error {
  readonly channel: OtpChannel;

  constructor(channel: OtpChannel) {
    super(`OTP ${channel} delivery is not configured`);
    this.name = "OtpDeliveryNotConfiguredError";
    this.channel = channel;
  }
}

function webhookFor(channel: OtpChannel): string {
  const raw = channel === "email" ? process.env.OTP_EMAIL_WEBHOOK : process.env.OTP_SMS_WEBHOOK;
  return raw?.trim() ?? "";
}

export function assertOtpDeliveryConfigured(channel: OtpChannel): void {
  if (process.env.NODE_ENV !== "production") return;
  if (!webhookFor(channel)) {
    throw new OtpDeliveryNotConfiguredError(channel);
  }
}

export function jsonOtpDeliveryFailure(err: unknown) {
  if (err instanceof OtpDeliveryNotConfiguredError) {
    return jsonError(
      "Verification delivery is not configured",
      503,
      AUTH_ERROR_CODES.OTP_DELIVERY_UNAVAILABLE,
    );
  }
  return jsonError("Failed to send verification code", 500, AUTH_ERROR_CODES.OTP_SEND_FAILED);
}

export async function deliverOtp(input: DeliverOtpInput): Promise<void> {
  assertOtpDeliveryConfigured(input.channel);
  if (input.channel === "email") {
    await sendOtpEmail({ to: input.destination, code: input.code, purpose: input.purpose });
    return;
  }
  await sendOtpSms({ to: input.destination, code: input.code, purpose: input.purpose });
}
