import { jsonError, jsonOk } from "@/lib/auth/api";
import { getPanelUserOrError } from "@/lib/panel/api";
import { getProjectDetail } from "@/lib/panel/repository";

export const runtime = "nodejs";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;
  const detail = getProjectDetail(Number(id), user.id);
  if (!detail) return jsonError("Not found", 404);
  return jsonOk({ detail });
}
