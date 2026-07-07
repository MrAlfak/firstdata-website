import { jsonError, jsonOk } from "@/lib/auth/api";
import { getPanelUserOrError } from "@/lib/panel/api";
import { decideApproval } from "@/lib/panel/repository";

export const runtime = "nodejs";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;
  const body = await req.json();
  const decision = body.decision === "rejected" ? "rejected" : "approved";
  const ok = decideApproval(Number(id), user.id, decision);
  if (!ok) return jsonError("Cannot decide", 400);
  return jsonOk({ ok: true });
}
