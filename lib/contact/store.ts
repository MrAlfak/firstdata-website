import { getDb } from "@/lib/auth/db";
import type { ContactSubmitInput } from "./validation";
import type { ConsultationRequestInput } from "./consultation-request";
import type { CollaborateMetadata } from "./collaborate-request";
import type { ProjectRequestAttachment, ProjectRequestInput } from "./project-request";
import { migrateContactLeadsTable } from "./schema";

function ensureContactTable(): void {
  const db = getDb();
  db.exec(`
    CREATE TABLE IF NOT EXISTS contact_leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      service TEXT,
      message TEXT NOT NULL,
      ip TEXT,
      user_id INTEGER REFERENCES users(id),
      status TEXT NOT NULL DEFAULT 'received',
      lead_type TEXT NOT NULL DEFAULT 'general',
      company_name TEXT,
      project_types TEXT,
      budget TEXT,
      timeline TEXT,
      attachments TEXT,
      contact_method TEXT,
      contact_time TEXT,
      metadata TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_contact_leads_created ON contact_leads(created_at);
  `);
  migrateContactLeadsTable(db);
}

export function ensureContactSchema(): void {
  ensureContactTable();
}

export function saveContactLead(input: ContactSubmitInput, ip: string): number {
  ensureContactTable();
  const db = getDb();
  const result = db
    .prepare(
      `INSERT INTO contact_leads (name, email, phone, service, message, ip)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .run(
      input.name,
      input.email,
      input.phone || null,
      input.service || null,
      input.message,
      ip,
    );
  return Number(result.lastInsertRowid);
}

export function saveProjectRequestLead(
  input: ProjectRequestInput,
  meta: {
    ip: string;
    message: string;
    service: string;
    attachments: ProjectRequestAttachment[];
  },
): number {
  ensureContactTable();
  const db = getDb();
  const result = db
    .prepare(
      `INSERT INTO contact_leads (
        name, email, phone, service, message, ip,
        lead_type, company_name, project_types, budget, timeline, attachments
      ) VALUES (?, ?, ?, ?, ?, ?, 'project_request', ?, ?, ?, ?, ?)`,
    )
    .run(
      input.name,
      input.email,
      input.phone,
      meta.service,
      meta.message,
      meta.ip,
      input.companyName || null,
      JSON.stringify(input.projectTypes),
      input.budget,
      input.timeline,
      meta.attachments.length ? JSON.stringify(meta.attachments) : null,
    );
  return Number(result.lastInsertRowid);
}

export function saveConsultationRequestLead(
  input: ConsultationRequestInput,
  meta: { ip: string; message: string; service: string; emailForDb: string },
): number {
  ensureContactTable();
  const db = getDb();
  const result = db
    .prepare(
      `INSERT INTO contact_leads (
        name, email, phone, service, message, ip,
        lead_type, contact_method, contact_time
      ) VALUES (?, ?, ?, ?, ?, ?, 'consultation', ?, ?)`,
    )
    .run(
      input.name,
      meta.emailForDb,
      input.phone,
      meta.service,
      meta.message,
      meta.ip,
      input.contactMethod,
      input.contactTime,
    );
  return Number(result.lastInsertRowid);
}

export function saveCollaborateLead(
  leadType: "collaborate_hiring" | "collaborate_freelancer",
  data: {
    name: string;
    email: string;
    phone: string | null;
    service: string;
    message: string;
    metadata: CollaborateMetadata;
    projectTypes: string[] | null;
    budget: string | null;
    timeline: string | null;
  },
  ip: string,
): number {
  ensureContactTable();
  const db = getDb();
  const result = db
    .prepare(
      `INSERT INTO contact_leads (
        name, email, phone, service, message, ip,
        lead_type, project_types, budget, timeline, metadata
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      data.name,
      data.email,
      data.phone,
      data.service,
      data.message,
      ip,
      leadType,
      data.projectTypes ? JSON.stringify(data.projectTypes) : null,
      data.budget,
      data.timeline,
      JSON.stringify(data.metadata),
    );
  return Number(result.lastInsertRowid);
}
