import { sendOtpEmail } from "./mail";
import { sendOtpSms } from "./sms";
import type { OtpChannel, OtpPurpose } from "./types";

type DeliverOtpInput = {
  channel: OtpChannel;
  destination: string;
  code: string;
  purpose: OtpPurpose;
};

export async function deliverOtp(input: DeliverOtpInput): Promise<void> {
  if (input.channel === "email") {
    await sendOtpEmail({ to: input.destination, code: input.code, purpose: input.purpose });
    return;
  }
  await sendOtpSms({ to: input.destination, code: input.code, purpose: input.purpose });
}
