import type { NextRequest } from "next/server";
import { jsonOk } from "@/lib/auth/api";
import { requireStaffOrError } from "@/lib/panel/admin-api";
import { adminListOrgMembers } from "@/lib/panel/admin-repository";

export const runtime = "nodejs";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error } = await requireStaffOrError(req);
  if (error) return error;
  return jsonOk({ members: adminListOrgMembers(Number(id)) });
}
