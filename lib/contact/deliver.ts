import type { ContactSubmitInput } from "./validation";

type ContactWebhookExtras = {
  leadType?: string;
  companyName?: string;
  projectTypes?: string[];
  budget?: string;
  timeline?: string;
  attachments?: { name: string; path: string }[];
};

type ContactWebhookPayload = ContactSubmitInput & {
  leadId: number;
  ip: string;
} & ContactWebhookExtras;

export async function deliverContactLead(
  input: ContactSubmitInput,
  leadId: number,
  ip: string,
  extras: ContactWebhookExtras = {},
): Promise<boolean> {
  const webhook = process.env.CONTACT_WEBHOOK;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] lead saved", { leadId, email: input.email, service: input.service });
    }
    return true;
  }

  const payload: ContactWebhookPayload = {
    ...input,
    leadId,
    ip,
    ...extras,
  };

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return res.ok;
}
