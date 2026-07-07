import { jsonOk } from "@/lib/auth/api";
import { getPanelUserOrError } from "@/lib/panel/api";
import { listUserOrganizations } from "@/lib/panel/org";

export const runtime = "nodejs";

export async function GET() {
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;
  return jsonOk({ organizations: listUserOrganizations(user.id) });
}
