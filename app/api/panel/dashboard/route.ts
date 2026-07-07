import { jsonOk } from "@/lib/auth/api";
import { getPanelUserOrError } from "@/lib/panel/api";
import { getDashboard, listProjects } from "@/lib/panel/repository";

export const runtime = "nodejs";

export async function GET() {
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;
  return jsonOk({ dashboard: getDashboard(user.id), projects: listProjects(user.id) });
}
