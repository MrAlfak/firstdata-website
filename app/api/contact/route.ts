import { NextResponse } from "next/server";
import { sendContactConfirmation } from "@/lib/contact/confirm";
import { deliverContactLead } from "@/lib/contact/deliver";
import { saveContactLead } from "@/lib/contact/store";
import { contactSubmitSchema, contactValidationError } from "@/lib/contact/validation";
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
    const bucket = `contact:${ip}`;

    if (!enforceRateLimit(bucket, CONTACT_MAX_PER_WINDOW, CONTACT_WINDOW_MS)) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Try again later.", code: "RATE_LIMIT" },
        { status: 429 },
      );
    }

    const body = await req.json();
    const parsed = contactSubmitSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: contactValidationError(parsed.error), code: "VALIDATION" },
        { status: 400 },
      );
    }

    if (parsed.data.company?.trim()) {
      return NextResponse.json({ success: true, message: "Message received" });
    }

    const leadId = saveContactLead(parsed.data, ip);

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

    const delivered = await deliverContactLead(parsed.data, leadId, ip);
    if (!delivered) {
      return NextResponse.json(
        { success: false, message: "Failed to deliver message", code: "DELIVERY_FAILED" },
        { status: 502 },
      );
    }

    await sendContactConfirmation(parsed.data, parsed.data.lang);

    return NextResponse.json({ success: true, message: "Message received", id: leadId });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to submit contact form", code: "SERVER" },
      { status: 500 },
    );
  }
}
