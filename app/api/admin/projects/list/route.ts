import type { NextRequest } from "next/server";
import { jsonOk } from "@/lib/auth/api";
import { requireStaffOrError } from "@/lib/panel/admin-api";
import { adminListAllProjects } from "@/lib/panel/admin-repository";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { error } = await requireStaffOrError(req);
  if (error) return error;
  return jsonOk({ projects: adminListAllProjects() });
}
