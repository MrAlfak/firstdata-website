import fs from "node:fs";
import path from "node:path";
import { jsonError, jsonOk } from "@/lib/auth/api";
import { getPanelUserOrError } from "@/lib/panel/api";
import { getUploadsRoot } from "@/lib/panel/auth";
import { listFiles, listProjects, saveUploadedFile } from "@/lib/panel/repository";
import { validateUploadFile } from "@/lib/panel/file-upload";

export const runtime = "nodejs";

const MAX_BYTES = 10 * 1024 * 1024;

export async function GET(req: Request) {
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;
  const url = new URL(req.url);
  const projectId = url.searchParams.get("projectId");
  return jsonOk({
    files: listFiles(user.id, projectId ? Number(projectId) : undefined),
    projects: listProjects(user.id),
  });
}

export async function POST(req: Request) {
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return jsonError("File required", 400);
  if (file.size > MAX_BYTES) return jsonError("File too large (max 10 MB)", 400);

  const typeError = validateUploadFile(file.name, file.type, "document");
  if (typeError) return jsonError(typeError, 400);

  const projectIdRaw = form.get("projectId");
  const projectId = projectIdRaw ? Number(projectIdRaw) : null;
  const description = typeof form.get("description") === "string" ? String(form.get("description")) : "";

  const safeName = file.name.replace(/[^\w.\-()+\u0600-\u06FF\s]/g, "_").slice(0, 120);
  const rel = path.join(String(user.id), "uploads", `${Date.now()}-${safeName}`);
  const abs = path.join(getUploadsRoot(), rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(abs, buffer);

  const id = saveUploadedFile({
    userId: user.id,
    projectId,
    name: safeName,
    storagePath: rel.replace(/\\/g, "/"),
    mime: file.type || null,
    sizeBytes: file.size,
    description: description || undefined,
  });

  return jsonOk({ fileId: id });
}
