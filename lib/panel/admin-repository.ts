import fs from "node:fs";
import path from "node:path";
import { getDb } from "@/lib/auth/db";
import { findUserById } from "@/lib/auth/users";
import { getAccessibleUserIds } from "./access";
import { getUploadsRoot } from "./auth";
import { writeContractPdf } from "./contracts-pdf";
import { DEFAULT_MILESTONES, ensurePanelSchema } from "./migrate";
import { createNotification } from "./repository";
import type {
  AdminLeadRow, AdminTicketRow, ContactLeadRow, OrganizationMemberWithUser, OrganizationRow, ProjectRow, } from "./types";
import type { UserRecord as AuthUserRecord } from "@/lib/auth/types";

function db() {
  ensurePanelSchema();
  return getDb();
}

export function adminDashboardStats(): {
  openTickets: number;
  newLeads: number;
  activeProjects: number;
  unpaidInvoices: number;
} {
  const openTickets = (
    db().prepare(`SELECT COUNT(*) AS c FROM tickets WHERE status != 'closed'`).get() as { c: number }
  ).c;
  const newLeads = (
    db()
      .prepare(`SELECT COUNT(*) AS c FROM contact_leads WHERE status IN ('received','reviewing')`)
      .get() as { c: number }
  ).c;
  const activeProjects = (
    db()
      .prepare(
        `SELECT COUNT(*) AS c FROM projects WHERE status IN ('contract','active','support')`, )
      .get() as { c: number }
  ).c;
  const unpaidInvoices = (
    db().prepare(`SELECT COUNT(*) AS c FROM invoices WHERE status = 'unpaid'`).get() as { c: number }
  ).c;
  return { openTickets, newLeads, activeProjects, unpaidInvoices };
}

export function adminListLeads(status?: string): AdminLeadRow[] {
  const sql = status
    ? `SELECT l.*, u.name AS user_name FROM contact_leads l
       LEFT JOIN users u ON u.id = l.user_id WHERE l.status = ? ORDER BY l.created_at DESC LIMIT 100`
    : `SELECT l.*, u.name AS user_name FROM contact_leads l
       LEFT JOIN users u ON u.id = l.user_id ORDER BY l.created_at DESC LIMIT 100`;
  return (status ? db().prepare(sql).all(status) : db().prepare(sql).all()) as AdminLeadRow[];
}

export function adminUpdateLeadStatus(leadId: number, status: string): boolean {
  const r = db().prepare(`UPDATE contact_leads SET status = ? WHERE id = ?`).run(status, leadId);
  return r.changes > 0;
}

export function adminListAllProjects(): (ProjectRow & { user_name: string })[] {
  return db()
    .prepare(
      `SELECT p.*, u.name AS user_name FROM projects p
       JOIN users u ON u.id = p.user_id ORDER BY p.updated_at DESC LIMIT 200`, )
    .all() as (ProjectRow & { user_name: string })[];
}

export function adminListAllTickets(status?: string): AdminTicketRow[] {
  const base = `SELECT t.*, u.name AS user_name, u.email AS user_email, p.title AS project_title
    FROM tickets t JOIN users u ON u.id = t.user_id
    LEFT JOIN projects p ON p.id = t.project_id`;
  if (status) {
    return db()
      .prepare(`${base} WHERE t.status = ? ORDER BY t.updated_at DESC LIMIT 100`)
      .all(status) as AdminTicketRow[];
  }
  return db()
    .prepare(`${base} ORDER BY t.updated_at DESC LIMIT 100`)
    .all() as AdminTicketRow[];
}

export function adminGetTicket(ticketId: number): AdminTicketRow | undefined {
  return db()
    .prepare(
      `SELECT t.*, u.name AS user_name, u.email AS user_email, p.title AS project_title
       FROM tickets t JOIN users u ON u.id = t.user_id
       LEFT JOIN projects p ON p.id = t.project_id WHERE t.id = ?`, )
    .get(ticketId) as AdminTicketRow | undefined;
}

export function adminCloseTicket(ticketId: number): boolean {
  const r = db()
    .prepare(`UPDATE tickets SET status = 'closed', updated_at = datetime('now') WHERE id = ?`)
    .run(ticketId);
  if (r.changes > 0) {
    const ticket = db()
      .prepare(`SELECT user_id, subject FROM tickets WHERE id = ?`)
      .get(ticketId) as { user_id: number; subject: string } | undefined;
    if (ticket) {
      createNotification(
        ticket.user_id, "ticket", "Ticket closed", ticket.subject, `/panel/tickets/${ticketId}`, );
    }
  }
  return r.changes > 0;
}

export function adminSetTicketStatus(ticketId: number, status: string): boolean {
  const r = db()
    .prepare(`UPDATE tickets SET status = ?, updated_at = datetime('now') WHERE id = ?`)
    .run(status, ticketId);
  return r.changes > 0;
}

export function adminSearchUsers(query: string): AuthUserRecord[] {
  const q = `%${query.trim()}%`;
  return db()
    .prepare(
      `SELECT * FROM users WHERE name LIKE ? OR email LIKE ? OR phone LIKE ? ORDER BY id DESC LIMIT 20`, )
    .all(q, q, q) as AuthUserRecord[];
}

export function adminConvertLeadToProject(input: {
  leadId: number;
  title?: string;
  serviceSlug?: string;
  staffName?: string;
}): { projectId: number; userId: number } | null {
  const lead = db()
    .prepare(`SELECT * FROM contact_leads WHERE id = ?`)
    .get(input.leadId) as ContactLeadRow | undefined;
  if (!lead) return null;

  let userId = lead.user_id;
  if (!userId) {
    const existing = lead.email
      ? (db()
          .prepare(`SELECT id FROM users WHERE email = ? COLLATE NOCASE`)
          .get(lead.email) as { id: number } | undefined)
      : undefined;
    if (existing) {
      userId = existing.id;
    } else {
      const result = db()
        .prepare(
          `INSERT INTO users (email, phone, name, password_hash, updated_at) VALUES (?, ?, ?, NULL, datetime('now'))`, )
        .run(lead.email?.trim().toLowerCase() ?? null, lead.phone, lead.name.trim());
      userId = Number(result.lastInsertRowid);
    }
    db().prepare(`UPDATE contact_leads SET user_id = ? WHERE id = ?`).run(userId, lead.id);
  }

  const title = input.title ?? lead.service ?? `Project, ${lead.name}`;
  const projectId = adminCreateProjectWithOrg({
    userId, title, serviceSlug: input.serviceSlug ?? lead.service ?? undefined, status: "inquiry", phase: "consult", progressPct: 5, summary: lead.message.slice(0, 500), milestoneLabels: {
      consult: "Consultation", design: "Design", build: "Development", launch: "Launch", }, });

  db()
    .prepare(`UPDATE contact_leads SET status = 'converted' WHERE id = ?`)
    .run(lead.id);

  return { projectId, userId };
}

function adminCreateProjectWithOrg(input: {
  userId: number;
  title: string;
  serviceSlug?: string;
  status?: string;
  phase?: string;
  progressPct?: number;
  summary?: string;
  deliveryDue?: string;
  organizationId?: number | null;
  milestoneLabels: Record<string, string>;
}): number {
  const orgId = input.organizationId ?? getOrCreateUserOrganization(input.userId);
  const result = db()
    .prepare(
      `INSERT INTO projects (user_id, organization_id, title, service_slug, status, phase, progress_pct, summary, delivery_due, started_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`, )
    .run(
      input.userId, orgId, input.title, input.serviceSlug ?? null, input.status ?? "active", input.phase ?? "consult", input.progressPct ?? 0, input.summary ?? null, input.deliveryDue ?? null, );
  const projectId = Number(result.lastInsertRowid);
  const insertMilestone = db().prepare(
    `INSERT INTO project_milestones (project_id, milestone_key, label, status, sort_order) VALUES (?, ?, ?, ?, ?)`, );
  for (const m of DEFAULT_MILESTONES) {
    const st = m.key === (input.phase ?? "consult") ? "active" : "pending";
    insertMilestone.run(projectId, m.key, input.milestoneLabels[m.key] ?? m.key, st, m.sort);
  }
  return projectId;
}

export function getOrCreateUserOrganization(userId: number): number {
  const existing = db()
    .prepare(`SELECT organization_id FROM organization_members WHERE user_id = ? LIMIT 1`)
    .get(userId) as { organization_id: number } | undefined;
  if (existing) return existing.organization_id;

  const user = findUserById(userId);
  const orgName = user?.name ? `${user.name} Co.` : `Organization #${userId}`;
  const orgResult = db().prepare(`INSERT INTO organizations (name) VALUES (?)`).run(orgName);
  const orgId = Number(orgResult.lastInsertRowid);
  db()
    .prepare(
      `INSERT INTO organization_members (organization_id, user_id, role) VALUES (?, ?, 'owner')`, )
    .run(orgId, userId);
  return orgId;
}

export function adminCreateOrganization(name: string, ownerUserId: number): number {
  const orgResult = db().prepare(`INSERT INTO organizations (name) VALUES (?)`).run(name.trim());
  const orgId = Number(orgResult.lastInsertRowid);
  db()
    .prepare(
      `INSERT INTO organization_members (organization_id, user_id, role) VALUES (?, ?, 'owner')`, )
    .run(orgId, ownerUserId);
  return orgId;
}

export function adminAddOrgMember(
  organizationId: number, userId: number, role: "owner" | "manager" | "member", ): boolean {
  try {
    db()
      .prepare(
        `INSERT INTO organization_members (organization_id, user_id, role) VALUES (?, ?, ?)`, )
      .run(organizationId, userId, role);
    return true;
  } catch {
    return false;
  }
}

export function adminListOrganizations(): OrganizationRow[] {
  return db()
    .prepare(`SELECT * FROM organizations ORDER BY created_at DESC LIMIT 100`)
    .all() as OrganizationRow[];
}

export function adminListOrgMembers(organizationId: number): OrganizationMemberWithUser[] {
  return db()
    .prepare(
      `SELECT m.*, u.name AS user_name, u.email AS user_email, u.phone AS user_phone
       FROM organization_members m JOIN users u ON u.id = m.user_id
       WHERE m.organization_id = ? ORDER BY m.created_at`, )
    .all(organizationId) as OrganizationMemberWithUser[];
}

export async function adminUploadContractPdf(input: {
  userId: number;
  projectId: number;
  title: string;
  summary?: string;
  fileBuffer: Buffer;
  originalName: string;
}): Promise<number> {
  const root = getUploadsRoot();
  const ext = path.extname(input.originalName).toLowerCase() || ".pdf";
  const rel = path.join(
    String(input.userId), "contracts", `${input.projectId}-${Date.now()}${ext}`, );
  const abs = path.join(root, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, input.fileBuffer);

  const mime = ext === ".pdf" ? "application/pdf" : "application/octet-stream";
  const result = db()
    .prepare(
      `INSERT INTO contracts (project_id, user_id, title, summary, file_path, mime, status)
       VALUES (?, ?, ?, ?, ?, ?, 'pending')`, )
    .run(
      input.projectId, input.userId, input.title, input.summary ?? null, rel.replace(/\\/g, "/"), mime, );
  const contractId = Number(result.lastInsertRowid);
  return contractId;
}

export async function adminCreateContractPdf(input: {
  userId: number;
  projectId: number;
  title: string;
  summary?: string;
}): Promise<number> {
  const { relativePath, mime } = await writeContractPdf(
    input.userId, input.projectId, input.title, input.summary, );
  const result = db()
    .prepare(
      `INSERT INTO contracts (project_id, user_id, title, summary, file_path, mime, status)
       VALUES (?, ?, ?, ?, ?, ?, 'pending')`, )
    .run(
      input.projectId, input.userId, input.title, input.summary ?? null, relativePath, mime, );
  return Number(result.lastInsertRowid);
}

export function adminGetInvoiceByAuthority(authority: string) {
  return db()
    .prepare(`SELECT * FROM invoices WHERE payment_authority = ?`)
    .get(authority) as import("./types").InvoiceRow | undefined;
}

export function adminMarkInvoicePaid(
  invoiceId: number, refId: string, gateway = "zarinpal", ): boolean {
  const r = db()
    .prepare(
      `UPDATE invoices SET status = 'paid', paid_at = datetime('now'), payment_ref_id = ?, payment_gateway = ? WHERE id = ?`, )
    .run(refId, gateway, invoiceId);
  if (r.changes > 0) {
    const inv = db()
      .prepare(`SELECT user_id, title FROM invoices WHERE id = ?`)
      .get(invoiceId) as { user_id: number; title: string };
    createNotification(inv.user_id, "invoice", "Payment received", inv.title, `/panel/invoices`);
  }
  return r.changes > 0;
}

export function adminSetInvoicePaymentAuthority(
  invoiceId: number, authority: string, payUrl: string, ): void {
  db()
    .prepare(
      `UPDATE invoices SET payment_authority = ?, pay_url = ?, payment_gateway = 'zarinpal' WHERE id = ?`, )
    .run(authority, payUrl, invoiceId);
}

export type AdminInvoiceRow = import("./types").InvoiceRow & {
  user_name: string;
  project_title: string | null;
};

export type AdminContractListRow = import("./types").ContractRow & {
  user_name: string;
  project_title: string;
};

export type AdminProjectDetail = import("./types").ProjectDetail & {
  project: import("./types").ProjectRow & { user_name: string };
  invoices: import("./types").InvoiceRow[];
};

export function adminListInvoices(status?: string): AdminInvoiceRow[] {
  const base = `SELECT i.*, u.name AS user_name, p.title AS project_title
    FROM invoices i JOIN users u ON u.id = i.user_id
    LEFT JOIN projects p ON p.id = i.project_id`;
  if (status) {
    return db()
      .prepare(`${base} WHERE i.status = ? ORDER BY i.created_at DESC LIMIT 200`)
      .all(status) as AdminInvoiceRow[];
  }
  return db()
    .prepare(`${base} ORDER BY i.created_at DESC LIMIT 200`)
    .all() as AdminInvoiceRow[];
}

export function adminListContracts(): AdminContractListRow[] {
  return db()
    .prepare(
      `SELECT c.*, u.name AS user_name, p.title AS project_title
       FROM contracts c JOIN users u ON u.id = c.user_id
       JOIN projects p ON p.id = c.project_id
       ORDER BY c.created_at DESC LIMIT 200`, )
    .all() as AdminContractListRow[];
}

export function adminGetProjectDetail(projectId: number): AdminProjectDetail | null {
  const project = db()
    .prepare(
      `SELECT p.*, u.name AS user_name FROM projects p
       JOIN users u ON u.id = p.user_id WHERE p.id = ?`, )
    .get(projectId) as (import("./types").ProjectRow & { user_name: string }) | undefined;
  if (!project) return null;

  const milestones = db()
    .prepare(`SELECT * FROM project_milestones WHERE project_id = ? ORDER BY sort_order`)
    .all(projectId) as import("./types").MilestoneRow[];
  const updates = db()
    .prepare(`SELECT * FROM project_updates WHERE project_id = ? ORDER BY created_at DESC LIMIT 30`)
    .all(projectId) as import("./types").ProjectUpdateRow[];
  const contracts = db()
    .prepare(`SELECT * FROM contracts WHERE project_id = ? ORDER BY created_at DESC`)
    .all(projectId) as import("./types").ContractRow[];
  const files = db()
    .prepare(`SELECT * FROM panel_files WHERE project_id = ? ORDER BY created_at DESC`)
    .all(projectId) as import("./types").PanelFileRow[];
  const approvals = db()
    .prepare(`SELECT * FROM approvals WHERE project_id = ? ORDER BY created_at DESC`)
    .all(projectId) as import("./types").ApprovalRow[];
  const invoices = db()
    .prepare(`SELECT * FROM invoices WHERE project_id = ? ORDER BY created_at DESC`)
    .all(projectId) as import("./types").InvoiceRow[];

  return { project, milestones, updates, contracts, files, approvals, invoices };
}

export function adminUpdateProjectStatus(projectId: number, status: string): void {
  db()
    .prepare(`UPDATE projects SET status = ?, updated_at = datetime('now') WHERE id = ?`)
    .run(status, projectId);
}

export function getInvoiceForUser(invoiceId: number, userId: number) {
  const ids = getAccessibleUserIds(userId);
  const placeholders = ids.map(() => "?").join(",");
  return db()
    .prepare(`SELECT * FROM invoices WHERE id = ? AND user_id IN (${placeholders})`)
    .get(invoiceId, ...ids) as import("./types").InvoiceRow | undefined;
}

export { adminCreateProjectWithOrg };
