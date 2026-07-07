import { jsonOk } from "@/lib/auth/api";
import { getPanelUserOrError } from "@/lib/panel/api";
import { listContracts } from "@/lib/panel/repository";

export const runtime = "nodejs";

export async function GET() {
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;
  return jsonOk({ contracts: listContracts(user.id) });
}
