import fs from "node:fs";
import path from "node:path";
import type { NextRequest } from "next/server";
import { jsonError, jsonOk } from "@/lib/auth/api";
import { requireStaffOrError } from "@/lib/panel/admin-api";
import { adminGetProjectDetail } from "@/lib/panel/admin-repository";
import { getUploadsRoot } from "@/lib/panel/auth";
import { adminAddDeliverableFile } from "@/lib/panel/repository";

export const runtime = "nodejs";

const MAX_BYTES = 25 * 1024 * 1024;

export async function POST(req: NextRequest) {
  const { error } = await requireStaffOrError(req);
  if (error) return error;

  const form = await req.formData();
  const file = form.get("file");
  const userId = Number(form.get("userId"));
  const projectId = Number(form.get("projectId"));
  if (!(file instanceof File) || !userId || !projectId) {
    return jsonError("file, userId, projectId required", 400);
  }
  if (file.size > MAX_BYTES) return jsonError("File too large (max 25 MB)", 400);

  const detail = adminGetProjectDetail(projectId);
  if (!detail || detail.project.user_id !== userId) {
    return jsonError("Project not found for user", 404);
  }

  const safeName = file.name.replace(/[^\w.\-()+\u0600-\u06FF\s]/g, "_").slice(0, 120);
  const rel = path.join(String(userId), "deliverables", `${projectId}-${Date.now()}-${safeName}`);
  const abs = path.join(getUploadsRoot(), rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(abs, buffer);

  const description =
    typeof form.get("description") === "string" ? String(form.get("description")) : undefined;

  const fileId = adminAddDeliverableFile({
    userId,
    projectId,
    name: safeName,
    relativePath: rel.replace(/\\/g, "/"),
    mime: file.type || undefined,
    sizeBytes: file.size,
    description,
  });

  return jsonOk({ fileId });
}
