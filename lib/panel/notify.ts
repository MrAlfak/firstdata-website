import { findUserById } from "@/lib/auth/users";
import { createNotification } from "./repository";

type NotifyInput = {
  userId: number;
  kind: string;
  title: string;
  body?: string;
  link?: string;
  /** Skip email/SMS even when webhooks are configured */
  inAppOnly?: boolean;
};

async function sendEmail(to: string, subject: string, text: string): Promise<void> {
  const webhook =
    process.env.PANEL_NOTIFY_EMAIL_WEBHOOK?.trim() ||
    process.env.OTP_EMAIL_WEBHOOK?.trim();
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[panel][email] ${to}, ${subject}`);
    }
    return;
  }
  await fetch(webhook, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ to, subject, text }), });
}

async function sendSms(to: string, message: string): Promise<void> {
  const webhook =
    process.env.PANEL_NOTIFY_SMS_WEBHOOK?.trim() ||
    process.env.OTP_SMS_WEBHOOK?.trim();
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[panel][sms] ${to}, ${message.slice(0, 80)}`);
    }
    return;
  }
  await fetch(webhook, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ to, message, channel: "panel", purpose: "notify" }), });
}

/** In-app notification + optional email/SMS to the user. */
export async function dispatchPanelNotification(input: NotifyInput): Promise<void> {
  createNotification(input.userId, input.kind, input.title, input.body, input.link);
  if (input.inAppOnly) return;

  const user = findUserById(input.userId);
  if (!user) return;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";
  const linkLine = input.link
    ? siteUrl
      ? `${siteUrl}${input.link}`
      : input.link
    : "";

  const text = [input.title, input.body ?? "", linkLine].filter(Boolean).join("\n\n");
  const subject = `First Data, ${input.title}`;

  if (user.email) {
    await sendEmail(user.email, subject, text).catch(() => undefined);
  }
  if (user.phone) {
    await sendSms(user.phone, `${input.title}${input.body ? `: ${input.body}` : ""}`).catch(
      () => undefined, );
  }
}
