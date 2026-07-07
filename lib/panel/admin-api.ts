import type { NextRequest } from "next/server";
import { jsonError } from "@/lib/auth/api";
import { isStaffAuthorized, requirePanelUserFromRequest, type PanelAuthUser } from "./auth";

export async function requireStaffFromRequest(
  req: NextRequest,
): Promise<{ error: Response | null; user: PanelAuthUser | null }> {
  const user = await requirePanelUserFromRequest(req);
  if (!isStaffAuthorized(req, user)) {
    return { error: jsonError("Forbidden", 403), user: null };
  }
  return { error: null, user };
}

export async function requireStaffOrError(req: NextRequest) {
  const { error, user } = await requireStaffFromRequest(req);
  if (error || !user) return { error: error ?? jsonError("Forbidden", 403), user: null };
  return { error: null, user };
}
