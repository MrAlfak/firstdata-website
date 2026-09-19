import type { OtpChannel, OtpPurpose } from "./types";

type SendOtpSmsInput = {
  to: string;
  code: string;
  purpose: OtpPurpose;
};

const SMS_LABELS: Record<OtpPurpose, string> = {
  login: "login",
  register: "registration",
  reset_password: "password reset",
  verify_email: "email verification",
  change_email: "email change",
  change_phone: "mobile change",
  delete_account: "account deletion",
};

export async function sendOtpSms(input: SendOtpSmsInput): Promise<void> {
  const label = SMS_LABELS[input.purpose];
  const text = `First Data ${label} code: ${input.code}\nValid for 10 minutes.`;

  const webhook = process.env.OTP_SMS_WEBHOOK?.trim();
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: input.to,
        message: text,
        code: input.code,
        purpose: input.purpose,
        channel: "sms" satisfies OtpChannel,
      }),
    });
    if (!res.ok) {
      throw new Error(`OTP SMS webhook failed (${res.status})`);
    }
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    console.info(`[auth][otp][sms] ${input.to} → ${input.code} (${input.purpose})`);
    return;
  }

  throw new Error("OTP SMS webhook is not configured");
}
