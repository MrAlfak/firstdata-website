import fs from "node:fs";
import { NextResponse } from "next/server";
import { jsonError } from "@/lib/auth/api";
import { getPanelUserOrError } from "@/lib/panel/api";
import { getContractForUser, resolveFileAbsolute } from "@/lib/panel/repository";
import { detectMime } from "@/lib/panel/contracts-pdf";

export const runtime = "nodejs";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;
  const contract = getContractForUser(Number(id), user.id);
  if (!contract?.file_path) return jsonError("No file", 404);
  const rel = contract.signed_file_path ?? contract.file_path;
  const abs = resolveFileAbsolute(rel);
  if (!fs.existsSync(abs)) return jsonError("File missing", 404);
  const data = fs.readFileSync(abs);
  const mime = contract.mime ?? detectMime(rel);
  const ext = mime.includes("pdf") ? "pdf" : "txt";
  return new NextResponse(data, {
    headers: {
      "Content-Type": mime,
      "Content-Disposition": `attachment; filename="contract-${contract.id}.${ext}"`,
    },
  });
}
