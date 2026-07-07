import fs from "node:fs";
import { NextResponse } from "next/server";
import { jsonError } from "@/lib/auth/api";
import { getPanelUserOrError } from "@/lib/panel/api";
import { getFileForUser, resolveFileAbsolute } from "@/lib/panel/repository";

export const runtime = "nodejs";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;
  const file = getFileForUser(Number(id), user.id);
  if (!file) return jsonError("Not found", 404);
  const abs = resolveFileAbsolute(file.storage_path);
  if (!fs.existsSync(abs)) return jsonError("File missing on server", 404);
  const data = fs.readFileSync(abs);
  return new NextResponse(data, {
    headers: {
      "Content-Type": file.mime ?? "application/octet-stream",
      "Content-Disposition": `attachment; filename="${encodeURIComponent(file.name)}"`,
    },
  });
}
