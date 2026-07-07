import fs from "node:fs";
import path from "node:path";
import { getDb } from "@/lib/auth/db";
import { findUserById } from "@/lib/auth/users";
import { getAccessibleUserIds, canAccessUserData } from "./access";
import { getUploadsRoot } from "./auth";
import {
  appendSignaturePage,
  detectMime,
  hashFile,
  hashSignaturePayload,
  type ContractSignaturePayload,
} from "./contracts-pdf";
import { DEFAULT_MILESTONES, ensurePanelSchema } from "./migrate";
import type {
  ApprovalRow,
  ContactLeadRow,
  ContractRow,
  DashboardData,
  InvoiceRow,
  MilestoneRow,
  NotificationRow,
  PanelFileRow,
  ProjectDetail,
  ProjectRow,
  ProjectUpdateRow,
  TicketMessageRow,
  TicketRow,
} from "./types";

function db() {
  ensurePanelSchema();
  return getDb();
}

export function createNotification(
  userId: number,
  kind: string,
  title: string,
  body?: string,
  link?: string,
): void {
  db()
    .prepare(
      `INSERT INTO notifications (user_id, kind, title, body, link) VALUES (?, ?, ?, ?, ?)`,
    )
    .run(userId, kind, title, body ?? null, link ?? null);
}

export function listProjects(userId: number): ProjectRow[] {
  const ids = getAccessibleUserIds(userId);
  const placeholders = ids.map(() => "?").join(",");
  return db()
    .prepare(`SELECT * FROM projects WHERE user_id IN (${placeholders}) ORDER BY updated_at DESC`)
    .all(...ids) as ProjectRow[];
}

export function getProjectForUser(projectId: number, userId: number): ProjectRow | undefined {
  const project = db()
    .prepare(`SELECT * FROM projects WHERE id = ?`)
    .get(projectId) as ProjectRow | undefined;
  if (!project || !canAccessUserData(userId, project.user_id)) return undefined;
  return project;
}

export function getProjectDetail(projectId: number, userId: number): ProjectDetail | null {
  const project = getProjectForUser(projectId, userId);
  if (!project) return null;
  const milestones = db()
    .prepare(`SELECT * FROM project_milestones WHERE project_id = ? ORDER BY sort_order`)
    .all(projectId) as MilestoneRow[];
  const updates = db()
    .prepare(`SELECT * FROM project_updates WHERE project_id = ? ORDER BY created_at DESC LIMIT 20`)
    .all(projectId) as ProjectUpdateRow[];
  const contracts = db()
    .prepare(`SELECT * FROM contracts WHERE project_id = ? ORDER BY created_at DESC`)
    .all(projectId) as ContractRow[];
  const files = db()
    .prepare(`SELECT * FROM panel_files WHERE project_id = ? ORDER BY created_at DESC`)
    .all(projectId) as PanelFileRow[];
  const approvals = db()
    .prepare(`SELECT * FROM approvals WHERE project_id = ? ORDER BY created_at DESC`)
    .all(projectId) as ApprovalRow[];
  return { project, milestones, updates, contracts, files, approvals };
}

export function listContracts(userId: number): (ContractRow & { project_title: string })[] {
  const ids = getAccessibleUserIds(userId);
  const placeholders = ids.map(() => "?").join(",");
  return db()
    .prepare(
      `SELECT c.*, p.title AS project_title FROM contracts c
       JOIN projects p ON p.id = c.project_id
       WHERE c.user_id IN (${placeholders}) ORDER BY c.created_at DESC`,
    )
    .all(...ids) as (ContractRow & { project_title: string })[];
}

export function getContractForUser(contractId: number, userId: number): ContractRow | undefined {
  const contract = db()
    .prepare(`SELECT * FROM contracts WHERE id = ?`)
    .get(contractId) as ContractRow | undefined;
  if (!contract || !canAccessUserData(userId, contract.user_id)) return undefined;
  return contract;
}

export async function signContract(
  contractId: number,
  userId: number,
  meta?: { ip?: string; userAgent?: string },
): Promise<boolean> {
  const c = getContractForUser(contractId, userId);
  if (!c || c.status !== "pending" || !c.file_path) return false;

  const user = findUserById(userId);
  const signedAt = new Date().toISOString();
  const payload: ContractSignaturePayload = {
    userId,
    userName: user?.name ?? `User #${userId}`,
    signedAt,
    contractId,
    contractTitle: c.title,
    ip: meta?.ip,
    userAgent: meta?.userAgent,
  };
  const signatureHash = hashSignaturePayload(payload);

  let signedPath: string | null = null;
  const root = getUploadsRoot();
  const srcAbs = path.join(root, c.file_path);
  if (fs.existsSync(srcAbs) && c.mime === "application/pdf") {
    const rel = c.file_path.replace(/\.pdf$/i, `-signed-${Date.now()}.pdf`);
    signedPath = await appendSignaturePage({
      sourceRelativePath: c.file_path,
      userId,
      outputRelativePath: rel,
      payload,
    });
  } else if (fs.existsSync(srcAbs)) {
    const rel = c.file_path.replace(/(\.[^.]+)?$/, `-signed-${Date.now()}.txt`);
    const abs = path.join(root, rel);
    const content = [
      "SIGNED CONTRACT",
      `Title: ${c.title}`,
      `Signer: ${payload.userName}`,
      `Signed at: ${signedAt}`,
      `Hash: ${hashFile(fs.readFileSync(srcAbs))}`,
      `Signature: ${signatureHash}`,
    ].join("\n");
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, content, "utf8");
    signedPath = rel.replace(/\\/g, "/");
  }

  db()
    .prepare(
      `UPDATE contracts SET status = 'signed', signed_at = datetime('now'),
       signature_hash = ?, signature_payload = ?, signed_file_path = ? WHERE id = ?`,
    )
    .run(signatureHash, JSON.stringify(payload), signedPath, contractId);
  createNotification(userId, "contract", "Contract signed", c.title, `/panel/contracts`);
  return true;
}

export function listTickets(userId: number): TicketRow[] {
  const ids = getAccessibleUserIds(userId);
  const placeholders = ids.map(() => "?").join(",");
  return db()
    .prepare(`SELECT * FROM tickets WHERE user_id IN (${placeholders}) ORDER BY updated_at DESC`)
    .all(...ids) as TicketRow[];
}

export function getTicketForUser(ticketId: number, userId: number): TicketRow | undefined {
  const ticket = db()
    .prepare(`SELECT * FROM tickets WHERE id = ?`)
    .get(ticketId) as TicketRow | undefined;
  if (!ticket || !canAccessUserData(userId, ticket.user_id)) return undefined;
  return ticket;
}

export function listTicketMessages(ticketId: number): TicketMessageRow[] {
  return db()
    .prepare(`SELECT * FROM ticket_messages WHERE ticket_id = ? ORDER BY created_at ASC`)
    .all(ticketId) as TicketMessageRow[];
}

export function createTicket(
  userId: number,
  subject: string,
  body: string,
  projectId?: number | null,
  priority = "normal",
): number {
  const result = db()
    .prepare(
      `INSERT INTO tickets (user_id, project_id, subject, priority, status, updated_at)
       VALUES (?, ?, ?, ?, 'open', datetime('now'))`,
    )
    .run(userId, projectId ?? null, subject.trim(), priority);
  const ticketId = Number(result.lastInsertRowid);
  db()
    .prepare(
      `INSERT INTO ticket_messages (ticket_id, author_type, author_name, body) VALUES (?, 'client', NULL, ?)`,
    )
    .run(ticketId, body.trim());
  createNotification(userId, "ticket", "Ticket opened", subject, `/panel/tickets/${ticketId}`);
  return ticketId;
}

export function addTicketMessage(
  ticketId: number,
  userId: number,
  body: string,
  authorName: string,
): boolean {
  const ticket = getTicketForUser(ticketId, userId);
  if (!ticket || ticket.status === "closed") return false;
  db()
    .prepare(
      `INSERT INTO ticket_messages (ticket_id, author_type, author_name, body) VALUES (?, 'client', ?, ?)`,
    )
    .run(ticketId, authorName, body.trim());
  db()
    .prepare(`UPDATE tickets SET status = 'open', updated_at = datetime('now') WHERE id = ?`)
    .run(ticketId);
  return true;
}

export function listFiles(userId: number, projectId?: number): PanelFileRow[] {
  const ids = getAccessibleUserIds(userId);
  const placeholders = ids.map(() => "?").join(",");
  if (projectId) {
    return db()
      .prepare(
        `SELECT * FROM panel_files WHERE user_id IN (${placeholders}) AND project_id = ? ORDER BY created_at DESC`,
      )
      .all(...ids, projectId) as PanelFileRow[];
  }
  return db()
    .prepare(`SELECT * FROM panel_files WHERE user_id IN (${placeholders}) ORDER BY created_at DESC`)
    .all(...ids) as PanelFileRow[];
}

export function getFileForUser(fileId: number, userId: number): PanelFileRow | undefined {
  const file = db()
    .prepare(`SELECT * FROM panel_files WHERE id = ?`)
    .get(fileId) as PanelFileRow | undefined;
  if (!file || !canAccessUserData(userId, file.user_id)) return undefined;
  return file;
}

export function saveUploadedFile(input: {
  userId: number;
  projectId?: number | null;
  name: string;
  storagePath: string;
  mime: string | null;
  sizeBytes: number;
  description?: string;
}): number {
  const result = db()
    .prepare(
      `INSERT INTO panel_files (user_id, project_id, direction, name, storage_path, mime, size_bytes, description)
       VALUES (?, ?, 'upload', ?, ?, ?, ?, ?)`,
    )
    .run(
      input.userId,
      input.projectId ?? null,
      input.name,
      input.storagePath,
      input.mime,
      input.sizeBytes,
      input.description ?? null,
    );
  return Number(result.lastInsertRowid);
}

export function listInvoices(userId: number): (InvoiceRow & { project_title: string | null })[] {
  const ids = getAccessibleUserIds(userId);
  const placeholders = ids.map(() => "?").join(",");
  return db()
    .prepare(
      `SELECT i.*, p.title AS project_title FROM invoices i
       LEFT JOIN projects p ON p.id = i.project_id
       WHERE i.user_id IN (${placeholders}) ORDER BY i.created_at DESC`,
    )
    .all(...ids) as (InvoiceRow & { project_title: string | null })[];
}

export function listLeads(userId: number): ContactLeadRow[] {
  const ids = getAccessibleUserIds(userId);
  const placeholders = ids.map(() => "?").join(",");
  return db()
    .prepare(`SELECT * FROM contact_leads WHERE user_id IN (${placeholders}) ORDER BY created_at DESC`)
    .all(...ids) as ContactLeadRow[];
}

export function listApprovals(userId: number, status?: string): ApprovalRow[] {
  const ids = getAccessibleUserIds(userId);
  const placeholders = ids.map(() => "?").join(",");
  if (status) {
    return db()
      .prepare(
        `SELECT * FROM approvals WHERE user_id IN (${placeholders}) AND status = ? ORDER BY created_at DESC`,
      )
      .all(...ids, status) as ApprovalRow[];
  }
  return db()
    .prepare(`SELECT * FROM approvals WHERE user_id IN (${placeholders}) ORDER BY created_at DESC`)
    .all(...ids) as ApprovalRow[];
}

export function decideApproval(
  approvalId: number,
  userId: number,
  decision: "approved" | "rejected",
): boolean {
  const row = db()
    .prepare(`SELECT * FROM approvals WHERE id = ? AND status = 'pending'`)
    .get(approvalId) as ApprovalRow | undefined;
  if (!row || !canAccessUserData(userId, row.user_id)) return false;
  db()
    .prepare(`UPDATE approvals SET status = ?, decided_at = datetime('now') WHERE id = ?`)
    .run(decision, approvalId);
  createNotification(
    userId,
    "approval",
    decision === "approved" ? "Approval recorded" : "Revision requested",
    row.title,
    `/panel/projects/${row.project_id}`,
  );
  return true;
}

export function listNotifications(userId: number, unreadOnly = false): NotificationRow[] {
  if (unreadOnly) {
    return db()
      .prepare(
        `SELECT * FROM notifications WHERE user_id = ? AND read_at IS NULL ORDER BY created_at DESC LIMIT 50`,
      )
      .all(userId) as NotificationRow[];
  }
  return db()
    .prepare(`SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 50`)
    .all(userId) as NotificationRow[];
}

export function markNotificationRead(notificationId: number, userId: number): void {
  db()
    .prepare(`UPDATE notifications SET read_at = datetime('now') WHERE id = ? AND user_id = ?`)
    .run(notificationId, userId);
}

export function markAllNotificationsRead(userId: number): void {
  db()
    .prepare(`UPDATE notifications SET read_at = datetime('now') WHERE user_id = ? AND read_at IS NULL`)
    .run(userId);
}

export function getDashboard(userId: number): DashboardData {
  const ids = getAccessibleUserIds(userId);
  const placeholders = ids.map(() => "?").join(",");

  const activeProjects = (
    db()
      .prepare(
        `SELECT COUNT(*) AS c FROM projects WHERE user_id IN (${placeholders}) AND status IN ('contract','active','support')`,
      )
      .get(...ids) as { c: number }
  ).c;

  const pendingApprovals = listApprovals(userId, "pending");
  const pendingContracts = db()
    .prepare(
      `SELECT * FROM contracts WHERE user_id IN (${placeholders}) AND status = 'pending'`,
    )
    .all(...ids) as ContractRow[];

  const openTickets = (
    db()
      .prepare(
        `SELECT COUNT(*) AS c FROM tickets WHERE user_id IN (${placeholders}) AND status != 'closed'`,
      )
      .get(...ids) as { c: number }
  ).c;

  const unpaidInvoices = (
    db()
      .prepare(
        `SELECT COUNT(*) AS c FROM invoices WHERE user_id IN (${placeholders}) AND status = 'unpaid'`,
      )
      .get(...ids) as { c: number }
  ).c;

  const unreadNotifications = (
    db()
      .prepare(`SELECT COUNT(*) AS c FROM notifications WHERE user_id = ? AND read_at IS NULL`)
      .get(userId) as { c: number }
  ).c;

  const recentUpdates = db()
    .prepare(
      `SELECT u.project_id AS projectId, p.title AS projectTitle, u.body, u.created_at AS createdAt
       FROM project_updates u JOIN projects p ON p.id = u.project_id
       WHERE p.user_id IN (${placeholders}) ORDER BY u.created_at DESC LIMIT 5`,
    )
    .all(...ids) as DashboardData["recentUpdates"];

  return {
    activeProjects,
    pendingActions: pendingApprovals.length + pendingContracts.length,
    openTickets,
    unpaidInvoices,
    unreadNotifications,
    recentUpdates,
    pendingApprovals,
    pendingContracts,
  };
}

export function adminCreateProject(input: {
  userId: number;
  title: string;
  serviceSlug?: string;
  status?: string;
  phase?: string;
  progressPct?: number;
  summary?: string;
  deliveryDue?: string;
  milestoneLabels: Record<string, string>;
}): number {
  const orgRow = db()
    .prepare(`SELECT organization_id FROM organization_members WHERE user_id = ? LIMIT 1`)
    .get(input.userId) as { organization_id: number } | undefined;
  let orgId = orgRow?.organization_id ?? null;
  if (!orgId) {
    const user = findUserById(input.userId);
    const orgResult = db()
      .prepare(`INSERT INTO organizations (name) VALUES (?)`)
      .run(user?.name ? `${user.name} Co.` : `Organization #${input.userId}`);
    orgId = Number(orgResult.lastInsertRowid);
    db()
      .prepare(
        `INSERT INTO organization_members (organization_id, user_id, role) VALUES (?, ?, 'owner')`,
      )
      .run(orgId, input.userId);
  }

  const result = db()
    .prepare(
      `INSERT INTO projects (user_id, organization_id, title, service_slug, status, phase, progress_pct, summary, delivery_due, started_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
    )
    .run(
      input.userId,
      orgId,
      input.title,
      input.serviceSlug ?? null,
      input.status ?? "active",
      input.phase ?? "consult",
      input.progressPct ?? 0,
      input.summary ?? null,
      input.deliveryDue ?? null,
    );
  const projectId = Number(result.lastInsertRowid);
  const insertMilestone = db().prepare(
    `INSERT INTO project_milestones (project_id, milestone_key, label, status, sort_order) VALUES (?, ?, ?, ?, ?)`,
  );
  for (const m of DEFAULT_MILESTONES) {
    const st = m.key === (input.phase ?? "consult") ? "active" : "pending";
    insertMilestone.run(projectId, m.key, input.milestoneLabels[m.key] ?? m.key, st, m.sort);
  }
  createNotification(input.userId, "project", "New project", input.title, `/panel/projects/${projectId}`);
  return projectId;
}

export function adminAddProjectUpdate(projectId: number, body: string): void {
  const project = db().prepare(`SELECT * FROM projects WHERE id = ?`).get(projectId) as ProjectRow | undefined;
  if (!project) return;
  db().prepare(`INSERT INTO project_updates (project_id, body) VALUES (?, ?)`).run(projectId, body);
  db().prepare(`UPDATE projects SET updated_at = datetime('now') WHERE id = ?`).run(projectId);
  createNotification(project.user_id, "update", "Project update", body.slice(0, 120), `/panel/projects/${projectId}`);
}

export function adminCreateContract(input: {
  projectId: number;
  userId: number;
  title: string;
  summary?: string;
  filePath?: string;
}): number {
  const result = db()
    .prepare(
      `INSERT INTO contracts (project_id, user_id, title, summary, file_path, mime, status) VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
    )
    .run(
      input.projectId,
      input.userId,
      input.title,
      input.summary ?? null,
      input.filePath ?? null,
      input.filePath ? detectMime(input.filePath) : null,
    );
  createNotification(input.userId, "contract", "Contract ready to sign", input.title, `/panel/contracts`);
  return Number(result.lastInsertRowid);
}

export function adminCreateInvoice(input: {
  userId: number;
  projectId?: number;
  number: string;
  title: string;
  amountRial: number;
  dueAt?: string;
  payUrl?: string;
}): number {
  const result = db()
    .prepare(
      `INSERT INTO invoices (user_id, project_id, number, title, amount_rial, due_at, pay_url, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'unpaid')`,
    )
    .run(
      input.userId,
      input.projectId ?? null,
      input.number,
      input.title,
      input.amountRial,
      input.dueAt ?? null,
      input.payUrl ?? null,
    );
  createNotification(input.userId, "invoice", "New invoice", input.title, `/panel/invoices`);
  return Number(result.lastInsertRowid);
}

export function adminCreateApproval(input: {
  projectId: number;
  userId: number;
  title: string;
  description?: string;
}): number {
  const result = db()
    .prepare(
      `INSERT INTO approvals (project_id, user_id, title, description, status) VALUES (?, ?, ?, ?, 'pending')`,
    )
    .run(input.projectId, input.userId, input.title, input.description ?? null);
  createNotification(input.userId, "approval", "Approval needed", input.title, `/panel/projects/${input.projectId}`);
  return Number(result.lastInsertRowid);
}

export function adminAddDeliverableFile(input: {
  userId: number;
  projectId: number;
  name: string;
  relativePath: string;
  mime?: string;
  sizeBytes?: number;
  description?: string;
}): number {
  const result = db()
    .prepare(
      `INSERT INTO panel_files (user_id, project_id, direction, name, storage_path, mime, size_bytes, description)
       VALUES (?, ?, 'download', ?, ?, ?, ?, ?)`,
    )
    .run(
      input.userId,
      input.projectId,
      input.name,
      input.relativePath,
      input.mime ?? null,
      input.sizeBytes ?? null,
      input.description ?? null,
    );
  createNotification(input.userId, "file", "New file available", input.name, `/panel/files`);
  return Number(result.lastInsertRowid);
}

export function adminStaffTicketReply(ticketId: number, body: string, staffName: string): boolean {
  const ticket = db().prepare(`SELECT * FROM tickets WHERE id = ?`).get(ticketId) as TicketRow | undefined;
  if (!ticket) return false;
  db()
    .prepare(
      `INSERT INTO ticket_messages (ticket_id, author_type, author_name, body) VALUES (?, 'staff', ?, ?)`,
    )
    .run(ticketId, staffName, body.trim());
  db()
    .prepare(`UPDATE tickets SET status = 'waiting_client', updated_at = datetime('now') WHERE id = ?`)
    .run(ticketId);
  createNotification(ticket.user_id, "ticket", "Support reply", ticket.subject, `/panel/tickets/${ticketId}`);
  return true;
}

export function adminUpdateProjectPhase(projectId: number, phase: string, progressPct: number): void {
  db()
    .prepare(`UPDATE projects SET phase = ?, progress_pct = ?, updated_at = datetime('now') WHERE id = ?`)
    .run(phase, progressPct, projectId);
  const project = db().prepare(`SELECT user_id FROM projects WHERE id = ?`).get(projectId) as { user_id: number } | undefined;
  if (project) {
    createNotification(project.user_id, "project", "Phase updated", phase, `/panel/projects/${projectId}`);
  }
}

export async function writeContractPlaceholder(userId: number, projectId: number, title: string): Promise<string> {
  const { writeContractPdf } = await import("./contracts-pdf");
  const { relativePath } = await writeContractPdf(userId, projectId, title);
  return relativePath;
}

export function resolveFileAbsolute(storagePath: string): string {
  return path.join(getUploadsRoot(), storagePath);
}

export function updateUserProfile(
  userId: number,
  input: { name?: string; email?: string | null; phone?: string | null },
): void {
  const fields: string[] = [];
  const values: unknown[] = [];
  if (input.name !== undefined) {
    fields.push("name = ?");
    values.push(input.name.trim());
  }
  if (input.email !== undefined) {
    fields.push("email = ?");
    values.push(input.email?.trim().toLowerCase() ?? null);
  }
  if (input.phone !== undefined) {
    fields.push("phone = ?");
    values.push(input.phone ?? null);
  }
  if (fields.length === 0) return;
  fields.push("updated_at = datetime('now')");
  values.push(userId);
  db().prepare(`UPDATE users SET ${fields.join(", ")} WHERE id = ?`).run(...values);
}

export function setUserPassword(userId: number, passwordHash: string): void {
  db()
    .prepare(`UPDATE users SET password_hash = ?, updated_at = datetime('now') WHERE id = ?`)
    .run(passwordHash, userId);
}
