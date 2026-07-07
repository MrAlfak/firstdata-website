import type { NextRequest } from "next/server";
import { jsonError, jsonOk } from "@/lib/auth/api";
import { requireStaffOrError } from "@/lib/panel/admin-api";
import {
  adminCreateContractPdf,
  adminListContracts,
  adminUploadContractPdf,
} from "@/lib/panel/admin-repository";
import { dispatchPanelNotification } from "@/lib/panel/notify";

export const runtime = "nodejs";

async function notifyContract(userId: number, title: string) {
  await dispatchPanelNotification({
    userId,
    kind: "contract",
    title: "Contract ready to sign",
    body: title,
    link: "/panel/contracts",
  });
}

export async function GET(req: NextRequest) {
  const { error } = await requireStaffOrError(req);
  if (error) return error;
  return jsonOk({ contracts: adminListContracts() });
}

export async function POST(req: NextRequest) {
  const { error } = await requireStaffOrError(req);
  if (error) return error;

  const contentType = req.headers.get("content-type") ?? "";
  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();
    const file = form.get("file");
    const userId = Number(form.get("userId"));
    const projectId = Number(form.get("projectId"));
    const title = String(form.get("title") ?? "Contract");
    const summary = form.get("summary") ? String(form.get("summary")) : undefined;
    if (!(file instanceof File) || !userId || !projectId) {
      return jsonError("file, userId, projectId required", 400);
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const contractId = await adminUploadContractPdf({
      userId,
      projectId,
      title,
      summary,
      fileBuffer: buffer,
      originalName: file.name,
    });
    await notifyContract(userId, title);
    return jsonOk({ contractId });
  }

  const body = await req.json();
  const userId = Number(body.userId);
  const projectId = Number(body.projectId);
  if (!userId || !projectId || !body.title) {
    return jsonError("userId, projectId, title required", 400);
  }
  const contractId = await adminCreateContractPdf({
    userId,
    projectId,
    title: body.title,
    summary: body.summary,
  });
  await notifyContract(userId, body.title);
  return jsonOk({ contractId });
}
