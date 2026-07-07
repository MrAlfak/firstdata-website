import { jsonError, jsonOk } from "@/lib/auth/api";
import { getPanelUserOrError } from "@/lib/panel/api";
import { signContract } from "@/lib/panel/repository";

export const runtime = "nodejs";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const userAgent = req.headers.get("user-agent") ?? undefined;
  const ok = await signContract(Number(id), user.id, { ip, userAgent });
  if (!ok) return jsonError("Cannot sign this contract", 400);
  return jsonOk({ signed: true });
}
