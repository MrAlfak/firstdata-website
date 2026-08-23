import fs from "node:fs";
import path from "node:path";
import { jsonError, jsonOk } from "@/lib/auth/api";
import { getPanelUserOrError } from "@/lib/panel/api";
import { getUploadsRoot } from "@/lib/panel/auth";
import {
  createTicket,
  listContracts,
  listProjects,
  listTickets,
  saveUploadedFile,
} from "@/lib/panel/repository";
import { sanitizeTicketHtml, ticketHtmlToPlain } from "@/lib/panel/ticket-html";
import { validateUploadFile } from "@/lib/panel/file-upload";

export const runtime = "nodejs";

const MAX_BYTES = 10 * 1024 * 1024;
const MAX_FILES = 5;
const PRIORITIES = new Set(["low", "normal", "high"]);
const DEPARTMENTS = new Set(["support", "technical", "billing", "sales", "contracts"]);

export async function GET() {
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;
  return jsonOk({
    tickets: listTickets(user.id),
    projects: listProjects(user.id),
    contracts: listContracts(user.id),
  });
}

async function persistUploads(
  userId: number,
  ticketId: number,
  projectId: number | null,
  files: File[],
): Promise<number[]> {
  const ids: number[] = [];
  for (const file of files.slice(0, MAX_FILES)) {
    if (file.size > MAX_BYTES) continue;
    const typeError = validateUploadFile(file.name, file.type, "document");
    if (typeError) continue;
    const safeName = file.name.replace(/[^\w.\-()+\u0600-\u06FF\s]/g, "_").slice(0, 120);
    const rel = path.join(String(userId), "tickets", String(ticketId), `${Date.now()}-${safeName}`);
    const abs = path.join(getUploadsRoot(), rel);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, Buffer.from(await file.arrayBuffer()));
    ids.push(
      saveUploadedFile({
        userId,
        projectId,
        ticketId,
        name: safeName,
        storagePath: rel.replace(/\\/g, "/"),
        mime: file.type || null,
        sizeBytes: file.size,
        description: "ticket-attachment",
      }),
    );
  }
  return ids;
}

export async function POST(req: Request) {
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;

  const contentType = req.headers.get("content-type") || "";
  let subject = "";
  let messageHtml = "";
  let projectId: number | null = null;
  let contractId: number | null = null;
  let department = "support";
  let priority = "normal";
  const files: File[] = [];

  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();
    subject = typeof form.get("subject") === "string" ? String(form.get("subject")).trim() : "";
    messageHtml = typeof form.get("message") === "string" ? String(form.get("message")) : "";
    const projectRaw = form.get("projectId");
    const contractRaw = form.get("contractId");
    projectId = projectRaw ? Number(projectRaw) : null;
    contractId = contractRaw ? Number(contractRaw) : null;
    department = typeof form.get("department") === "string" ? String(form.get("department")) : "support";
    priority = typeof form.get("priority") === "string" ? String(form.get("priority")) : "normal";
    for (const value of form.getAll("files")) {
      if (value instanceof File && value.size > 0) files.push(value);
    }
  } else {
    const body = await req.json();
    subject = typeof body.subject === "string" ? body.subject.trim() : "";
    messageHtml = typeof body.message === "string" ? body.message : "";
    projectId = body.projectId ? Number(body.projectId) : null;
    contractId = body.contractId ? Number(body.contractId) : null;
    department = typeof body.department === "string" ? body.department : "support";
    priority = typeof body.priority === "string" ? body.priority : "normal";
  }

  const message = sanitizeTicketHtml(messageHtml);
  const plain = ticketHtmlToPlain(message);
  if (subject.length < 3 || plain.length < 5) {
    return jsonError("Subject and message are required", 400);
  }
  if (!PRIORITIES.has(priority)) priority = "normal";
  if (!DEPARTMENTS.has(department)) department = "support";

  try {
    const id = createTicket(user.id, subject, message, {
      projectId,
      contractId,
      department,
      priority,
    });
    const fileIds = await persistUploads(user.id, id, projectId, files);
    return jsonOk({ ticketId: id, fileIds });
  } catch (err) {
    if (err instanceof Error && err.message === "INVALID_PROJECT") {
      return jsonError("Invalid project", 400);
    }
    if (err instanceof Error && err.message === "INVALID_CONTRACT") {
      return jsonError("Invalid contract", 400);
    }
    throw err;
  }
}
