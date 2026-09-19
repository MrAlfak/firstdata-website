import type { OtpPurpose } from "./types";

type SendOtpMailInput = {
  to: string;
  code: string;
  purpose: OtpPurpose;
};

const SUBJECTS: Record<OtpPurpose, string> = {
  login: "First Data, login verification code",
  register: "First Data, registration verification code",
  reset_password: "First Data, password reset code",
  verify_email: "First Data, verify your email",
  change_email: "First Data, confirm your new email",
  change_phone: "First Data, confirm your new mobile number",
  delete_account: "First Data, account deletion confirmation",
};

export async function sendOtpEmail(input: SendOtpMailInput): Promise<void> {
  const subject = SUBJECTS[input.purpose];
  const text = [
    "Your verification code:",
    "",
    input.code,
    "",
    "This code expires in 10 minutes.",
    "If you did not request this, ignore this email.",
  ].join("\n");

  const webhook = process.env.OTP_EMAIL_WEBHOOK?.trim();
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: input.to, subject, text }),
    });
    if (!res.ok) {
      throw new Error(`OTP email webhook failed (${res.status})`);
    }
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    console.info(`[auth][otp] ${input.to} → ${input.code} (${input.purpose})`);
    return;
  }

  throw new Error("OTP email webhook is not configured");
}
