import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { sendContactConfirmation } from "@/lib/contact/confirm";
import { deliverContactLead } from "@/lib/contact/deliver";
import {
  formatProjectRequestMessage,
  projectRequestSchema,
  projectRequestValidationError,
  type ProjectRequestAttachment,
} from "@/lib/contact/project-request";
import { saveProjectRequestLead } from "@/lib/contact/store";
import {
  PROJECT_REQUEST_ALLOWED_MIME,
  PROJECT_REQUEST_MAX_BYTES,
  PROJECT_REQUEST_MAX_FILES,
} from "@/config/project-request";
import { getUploadsRoot } from "@/lib/panel/auth";
import { enforceRateLimit, getClientIp } from "@/lib/rate-limit/ip";
import { getSessionFromCookies } from "@/lib/auth/session";
import { findUserById } from "@/lib/auth/users";
import { getDb } from "@/lib/auth/db";
import { ensurePanelSchema } from "@/lib/panel/migrate";

export const runtime = "nodejs";

const CONTACT_MAX_PER_WINDOW = 5;
const CONTACT_WINDOW_MS = 15 * 60 * 1000;

function parseProjectTypes(raw: FormDataEntryValue | null): string[] {
  if (typeof raw !== "string" || !raw.trim()) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return raw.split(",").map((s) => s.trim()).filter(Boolean);
  }
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const bucket = `contact-project:${ip}`;

    if (!enforceRateLimit(bucket, CONTACT_MAX_PER_WINDOW, CONTACT_WINDOW_MS)) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Try again later.", code: "RATE_LIMIT" },
        { status: 429 },
      );
    }

    const form = await req.formData();

    if (typeof form.get("website") === "string" && String(form.get("website")).trim()) {
      return NextResponse.json({ success: true, message: "Message received" });
    }

    const parsed = projectRequestSchema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      companyName: form.get("companyName") ?? "",
      projectTypes: parseProjectTypes(form.get("projectTypes")),
      budget: form.get("budget"),
      timeline: form.get("timeline"),
      description: form.get("description"),
      lang: form.get("lang") ?? "en",
      website: form.get("website") ?? "",
    });

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: projectRequestValidationError(parsed.error),
          code: "VALIDATION",
        },
        { status: 400 },
      );
    }

    const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
    if (files.length > PROJECT_REQUEST_MAX_FILES) {
      return NextResponse.json(
        { success: false, message: "Too many files", code: "VALIDATION" },
        { status: 400 },
      );
    }

    for (const file of files) {
      if (file.size > PROJECT_REQUEST_MAX_BYTES) {
        return NextResponse.json(
          { success: false, message: "File too large (max 10 MB)", code: "VALIDATION" },
          { status: 400 },
        );
      }
      const mime = file.type || "application/octet-stream";
      if (!PROJECT_REQUEST_ALLOWED_MIME.has(mime)) {
        return NextResponse.json(
          { success: false, message: "Unsupported file type", code: "VALIDATION" },
          { status: 400 },
        );
      }
    }

    const input = parsed.data;
    const service = input.projectTypes.join(", ");
    const message = formatProjectRequestMessage(input, {
      types: input.projectTypes,
      budget: input.budget,
      timeline: input.timeline,
      company: input.companyName || undefined,
      attachments: files.map((f) => f.name),
    });

    const leadId = saveProjectRequestLead(input, {
      ip,
      message,
      service,
      attachments: [],
    });

    const savedAttachments: ProjectRequestAttachment[] = [];
    if (files.length > 0) {
      const relDir = path.join("contact", String(leadId));
      const absDir = path.join(getUploadsRoot(), relDir);
      fs.mkdirSync(absDir, { recursive: true });

      for (const file of files) {
        const safeName = file.name.replace(/[^\w.\-()+\u0600-\u06FF\s]/g, "_").slice(0, 120);
        const rel = path.join(relDir, `${Date.now()}-${safeName}`).replace(/\\/g, "/");
        const abs = path.join(getUploadsRoot(), rel);
        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(abs, buffer);
        savedAttachments.push({
          name: safeName,
          path: rel,
          size: file.size,
          mime: file.type || null,
        });
      }

      getDb()
        .prepare(`UPDATE contact_leads SET attachments = ? WHERE id = ?`)
        .run(JSON.stringify(savedAttachments), leadId);
    }

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
      email: input.email,
      phone: input.phone,
      service,
      message,
      company: "",
      lang: input.lang,
    };

    const delivered = await deliverContactLead(contactInput, leadId, ip, {
      leadType: "project_request",
      companyName: input.companyName || undefined,
      projectTypes: input.projectTypes,
      budget: input.budget,
      timeline: input.timeline,
      attachments: savedAttachments.map((a) => ({ name: a.name, path: a.path })),
    });

    if (!delivered) {
      return NextResponse.json(
        { success: false, message: "Failed to deliver message", code: "DELIVERY_FAILED" },
        { status: 502 },
      );
    }

    await sendContactConfirmation(contactInput, input.lang);

    return NextResponse.json({ success: true, message: "Message received", id: leadId });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to submit project request", code: "SERVER" },
      { status: 500 },
    );
  }
}
