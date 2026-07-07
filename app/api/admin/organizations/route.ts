import type { NextRequest } from "next/server";
import { jsonError, jsonOk } from "@/lib/auth/api";
import { requireStaffOrError } from "@/lib/panel/admin-api";
import {
  adminAddOrgMember,
  adminCreateOrganization,
  adminListOrganizations,
} from "@/lib/panel/admin-repository";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { error } = await requireStaffOrError(req);
  if (error) return error;
  return jsonOk({ organizations: adminListOrganizations() });
}

export async function POST(req: NextRequest) {
  const { error } = await requireStaffOrError(req);
  if (error) return error;
  const body = await req.json();

  if (body.name && body.ownerUserId) {
    const organizationId = adminCreateOrganization(String(body.name), Number(body.ownerUserId));
    return jsonOk({ organizationId });
  }

  const orgId = Number(body.organizationId);
  const userId = Number(body.userId);
  const role = body.role ?? "member";
  if (!orgId || !userId) return jsonError("organizationId and userId required", 400);
  const ok = adminAddOrgMember(orgId, userId, role);
  return jsonOk({ ok });
}
