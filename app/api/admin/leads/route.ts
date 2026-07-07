import type { NextRequest } from "next/server";
import { jsonError, jsonOk } from "@/lib/auth/api";
import { requireStaffOrError } from "@/lib/panel/admin-api";
import { adminListLeads, adminUpdateLeadStatus } from "@/lib/panel/admin-repository";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { error } = await requireStaffOrError(req);
  if (error) return error;
  const status = req.nextUrl.searchParams.get("status") ?? undefined;
  return jsonOk({ leads: adminListLeads(status) });
}

export async function PATCH(req: NextRequest) {
  const { error } = await requireStaffOrError(req);
  if (error) return error;
  const body = await req.json();
  const leadId = Number(body.leadId);
  const status = body.status;
  if (!leadId || !status) return jsonError("leadId and status required", 400);
  if (!adminUpdateLeadStatus(leadId, status)) return jsonError("Lead not found", 404);
  return jsonOk({ updated: true });
}
