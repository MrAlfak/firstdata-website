import type { ContactSubmitInput } from "./validation";

type ConfirmPayload = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  type: "contact_confirmation";
  name: string;
};

function confirmationCopy(input: ContactSubmitInput, lang: "en" | "fa") {
  if (lang === "fa") {
    return {
      subject: "اولین دیتا, پیام شما دریافت شد",
      text: [
        `${input.name} عزیز،`,
        "",
        "پیام شما را دریافت کردیم و ظرف یک روز کاری پاسخ می‌دهیم.",
        "",
        `خدمات: ${input.service || "عمومی"}`,
        "",
        "با تشکر،",
        "تیم اولین دیتا",
        "info@firstdata.ir",
      ].join("\n"),
    };
  }

  return {
    subject: "First Data, we received your message",
    text: [
      `Hi ${input.name},`,
      "",
      "Thanks for reaching out. We received your message and will reply within one business day.",
      "",
      `Service: ${input.service || "General"}`,
      "",
      "Thanks,",
      "First Data Team",
      "info@firstdata.ir",
    ].join("\n"),
  };
}

export async function sendContactConfirmation(
  input: ContactSubmitInput,
  lang: "en" | "fa" = "en",
): Promise<boolean> {
  const webhook = process.env.CONTACT_CONFIRM_WEBHOOK ?? process.env.OTP_EMAIL_WEBHOOK;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact][confirm] skipped, no webhook", input.email);
    }
    return true;
  }

  const copy = confirmationCopy(input, lang);
  const payload: ConfirmPayload = {
    to: input.email,
    subject: copy.subject,
    text: copy.text,
    type: "contact_confirmation",
    name: input.name,
  };

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return res.ok;
}
