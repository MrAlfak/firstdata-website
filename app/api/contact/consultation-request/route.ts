import { NextResponse } from "next/server";
import { sendContactConfirmation } from "@/lib/contact/confirm";
import { deliverContactLead } from "@/lib/contact/deliver";
import {
  consultationRequestSchema,
  consultationValidationError,
  formatConsultationMessage,
} from "@/lib/contact/consultation-request";
import { saveConsultationRequestLead } from "@/lib/contact/store";
import { enforceRateLimit, getClientIp } from "@/lib/rate-limit/ip";
import { getSessionFromCookies } from "@/lib/auth/session";
import { findUserById } from "@/lib/auth/users";
import { getDb } from "@/lib/auth/db";
import { ensurePanelSchema } from "@/lib/panel/migrate";

export const runtime = "nodejs";

const CONTACT_MAX_PER_WINDOW = 5;
const CONTACT_WINDOW_MS = 15 * 60 * 1000;

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const bucket = `contact-consultation:${ip}`;

    if (!enforceRateLimit(bucket, CONTACT_MAX_PER_WINDOW, CONTACT_WINDOW_MS)) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Try again later.", code: "RATE_LIMIT" },
        { status: 429 },
      );
    }

    const body = await req.json();

    if (typeof body.website === "string" && body.website.trim()) {
      return NextResponse.json({ success: true, message: "Message received" });
    }

    const parsed = consultationRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: consultationValidationError(parsed.error),
          code: "VALIDATION",
        },
        { status: 400 },
      );
    }

    const input = parsed.data;
    const emailForDb =
      input.email.trim() ||
      (input.contactMethod === "email" ? "unknown@contact.local" : `phone-${input.phone.replace(/\D/g, "").slice(-12)}@contact.local`);

    const message = formatConsultationMessage(input, {
      method: input.contactMethod,
      time: input.contactTime,
    });

    const leadId = saveConsultationRequestLead(input, {
      ip,
      message,
      service: `consultation:${input.contactMethod}`,
      emailForDb,
    });

    const session = await getSessionFromCookies();
    if (session) {
      ensurePanelSchema();
      const user = findUserById(Number(session.sub));
      if (user) {
        getDb()
          .prepare(`UPDATE contact_leads SET user_id = ? WHERE id = ?`)
          .run(user.id, leadId);
      }
    }

    const contactInput = {
      name: input.name,
      email: input.email.trim() || emailForDb,
      phone: input.phone,
      service: `Free Consultation (${input.contactMethod})`,
      message,
      company: "",
      lang: input.lang,
    };

    const delivered = await deliverContactLead(contactInput, leadId, ip, {
      leadType: "consultation",
      projectTypes: [input.contactMethod],
      budget: input.contactTime,
    });

    if (!delivered) {
      return NextResponse.json(
        { success: false, message: "Failed to deliver message", code: "DELIVERY_FAILED" },
        { status: 502 },
      );
    }

    if (input.email.trim()) {
      await sendContactConfirmation(contactInput, input.lang);
    }

    return NextResponse.json({ success: true, message: "Message received", id: leadId });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to submit consultation request", code: "SERVER" },
      { status: 500 },
    );
  }
}
