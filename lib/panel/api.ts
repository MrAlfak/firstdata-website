import { jsonError } from "@/lib/auth/api";
import { requirePanelUser } from "./auth";

export async function getPanelUserOrError() {
  const user = await requirePanelUser();
  if (!user) return { error: jsonError("Unauthorized", 401, "UNAUTHORIZED") as Response, user: null };
  return { error: null, user };
}
