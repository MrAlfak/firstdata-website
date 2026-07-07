import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { deliverContactLead } from "@/lib/contact/deliver";
import {
  collaborateFreelancerSchema,
  collaborateHiringSchema,
  collaborateValidationError,
  formatCollaborateFreelancerMessage,
  formatCollaborateHiringMessage,
  type CollaborateAttachment,
} from "@/lib/contact/collaborate-request";
import { saveCollaborateLead } from "@/lib/contact/store";
import {
  COLLABORATE_ALLOWED_MIME,
  COLLABORATE_MAX_BYTES,
  COLLABORATE_MAX_FILES,
} from "@/config/collaborate-request";
import { getUploadsRoot } from "@/lib/panel/auth";
import { enforceRateLimit, getClientIp } from "@/lib/rate-limit/ip";
import { getSessionFromCookies } from "@/lib/auth/session";
import { findUserById } from "@/lib/auth/users";
import { getDb } from "@/lib/auth/db";
import { ensurePanelSchema } from "@/lib/panel/migrate";

export const runtime = "nodejs";

const CONTACT_MAX_PER_WINDOW = 5;
const CONTACT_WINDOW_MS = 15 * 60 * 1000;

function parseSpecialties(raw: FormDataEntryValue | null): string[] {
  if (typeof raw !== "string" || !raw.trim()) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return raw.split(",").map((s) => s.trim()).filter(Boolean);
  }
}

function validateFiles(files: File[]): string | null {
  if (files.length > COLLABORATE_MAX_FILES) return "Too many files";
  for (const file of files) {
    if (file.size > COLLABORATE_MAX_BYTES) return "File too large (max 10 MB)";
    const mime = file.type || "application/octet-stream";
    if (!COLLABORATE_ALLOWED_MIME.has(mime)) return "Unsupported file type";
  }
  return null;
}

async function saveAttachments(
  leadId: number,
  entries: { file: File; role: "resume" | "portfolio" }[],
): Promise<CollaborateAttachment[]> {
  if (entries.length === 0) return [];

  const relDir = path.join("contact", String(leadId));
  const absDir = path.join(getUploadsRoot(), relDir);
  fs.mkdirSync(absDir, { recursive: true });

  const saved: CollaborateAttachment[] = [];
  for (const { file, role } of entries) {
    const safeName = file.name.replace(/[^\w.\-()+\u0600-\u06FF\s]/g, "_").slice(0, 120);
    const rel = path.join(relDir, `${Date.now()}-${safeName}`).replace(/\\/g, "/");
    const abs = path.join(getUploadsRoot(), rel);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(abs, buffer);
    saved.push({
      name: safeName,
      path: rel,
      size: file.size,
      mime: file.type || null,
      role,
    });
  }

  getDb()
    .prepare(`UPDATE contact_leads SET attachments = ? WHERE id = ?`)
    .run(JSON.stringify(saved), leadId);

  return saved;
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const bucket = `contact-collaborate:${ip}`;

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

    const branch = String(form.get("branch") ?? "");

    if (branch === "hiring") {
      const parsed = collaborateHiringSchema.safeParse({
        branch: "hiring",
        name: form.get("name"),
        github: form.get("github") ?? "",
        linkedin: form.get("linkedin") ?? "",
        portfolioUrl: form.get("portfolioUrl") ?? "",
        skills: form.get("skills"),
        expectedSalary: form.get("expectedSalary"),
        workMode: form.get("workMode"),
        lang: form.get("lang") ?? "en",
        website: form.get("website") ?? "",
      });

      if (!parsed.success) {
        return NextResponse.json(
          {
            success: false,
            message: collaborateValidationError(parsed.error),
            code: "VALIDATION",
          },
          { status: 400 },
        );
      }

      const resume = form.get("resume");
      if (!(resume instanceof File) || resume.size === 0) {
        return NextResponse.json(
          { success: false, message: "Resume is required", code: "VALIDATION" },
          { status: 400 },
        );
      }

      const fileError = validateFiles([resume]);
      if (fileError) {
        return NextResponse.json(
          { success: false, message: fileError, code: "VALIDATION" },
          { status: 400 },
        );
      }

      const input = parsed.data;
      const emailForDb = `hiring-${Date.now()}@contact.local`;
      const message = formatCollaborateHiringMessage(input, {
        workMode: input.workMode,
        attachments: [resume.name],
      });

      const metadata = {
        branch: "hiring" as const,
        github: input.github || undefined,
        linkedin: input.linkedin || undefined,
        portfolioUrl: input.portfolioUrl || undefined,
        skills: input.skills,
        expectedSalary: input.expectedSalary,
        workMode: input.workMode,
      };

      const leadId = saveCollaborateLead(
        "collaborate_hiring",
        {
          name: input.name,
          email: emailForDb,
          phone: null,
          service: `hiring:${input.workMode}`,
          message,
          metadata,
          projectTypes: null,
          budget: input.expectedSalary,
          timeline: input.workMode,
        },
        ip,
      );

      const savedAttachments = await saveAttachments(leadId, [{ file: resume, role: "resume" }]);

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
        email: emailForDb,
        phone: "",
        service: "Collaborate — Hiring",
        message,
        company: "",
        lang: input.lang,
      };

      const delivered = await deliverContactLead(contactInput, leadId, ip, {
        leadType: "collaborate_hiring",
        budget: input.expectedSalary,
        timeline: input.workMode,
        attachments: savedAttachments.map((a) => ({ name: a.name, path: a.path })),
      });

      if (!delivered) {
        return NextResponse.json(
          { success: false, message: "Failed to deliver message", code: "DELIVERY_FAILED" },
          { status: 502 },
        );
      }

      return NextResponse.json({ success: true, message: "Message received", id: leadId });
    }

    if (branch === "freelancer") {
      const parsed = collaborateFreelancerSchema.safeParse({
        branch: "freelancer",
        name: form.get("name"),
        phone: form.get("phone"),
        specialties: parseSpecialties(form.get("specialties")),
        lang: form.get("lang") ?? "en",
        website: form.get("website") ?? "",
      });

      if (!parsed.success) {
        return NextResponse.json(
          {
            success: false,
            message: collaborateValidationError(parsed.error),
            code: "VALIDATION",
          },
          { status: 400 },
        );
      }

      const portfolioFile = form.get("portfolioFile");
      if (!(portfolioFile instanceof File) || portfolioFile.size === 0) {
        return NextResponse.json(
          { success: false, message: "Portfolio file is required", code: "VALIDATION" },
          { status: 400 },
        );
      }

      const resumeOptional = form.get("resume");
      const fileEntries: { file: File; role: "resume" | "portfolio" }[] = [
        { file: portfolioFile, role: "portfolio" },
      ];
      if (resumeOptional instanceof File && resumeOptional.size > 0) {
        fileEntries.push({ file: resumeOptional, role: "resume" });
      }

      const fileError = validateFiles(fileEntries.map((e) => e.file));
      if (fileError) {
        return NextResponse.json(
          { success: false, message: fileError, code: "VALIDATION" },
          { status: 400 },
        );
      }

      const input = parsed.data;
      const emailForDb = `freelancer-${input.phone.replace(/\D/g, "").slice(-12)}@contact.local`;
      const message = formatCollaborateFreelancerMessage(input, {
        specialties: input.specialties,
        attachments: fileEntries.map((e) => e.file.name),
      });

      const metadata = {
        branch: "freelancer" as const,
        specialties: input.specialties,
      };

      const leadId = saveCollaborateLead(
        "collaborate_freelancer",
        {
          name: input.name,
          email: emailForDb,
          phone: input.phone,
          service: `freelancer:${input.specialties.join(",")}`,
          message,
          metadata,
          projectTypes: input.specialties,
          budget: null,
          timeline: null,
        },
        ip,
      );

      const savedAttachments = await saveAttachments(leadId, fileEntries);

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
        email: emailForDb,
        phone: input.phone,
        service: "Collaborate — Freelancer",
        message,
        company: "",
        lang: input.lang,
      };

      const delivered = await deliverContactLead(contactInput, leadId, ip, {
        leadType: "collaborate_freelancer",
        projectTypes: input.specialties,
        attachments: savedAttachments.map((a) => ({ name: a.name, path: a.path })),
      });

      if (!delivered) {
        return NextResponse.json(
          { success: false, message: "Failed to deliver message", code: "DELIVERY_FAILED" },
          { status: 502 },
        );
      }

      return NextResponse.json({ success: true, message: "Message received", id: leadId });
    }

    return NextResponse.json(
      { success: false, message: "Invalid branch", code: "VALIDATION" },
      { status: 400 },
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to submit collaborate request", code: "SERVER" },
      { status: 500 },
    );
  }
}
