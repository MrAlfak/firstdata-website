import type { NextRequest } from "next/server";
import { jsonOk } from "@/lib/auth/api";
import { requireStaffOrError } from "@/lib/panel/admin-api";
import { adminSearchUsers } from "@/lib/panel/admin-repository";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { error } = await requireStaffOrError(req);
  if (error) return error;
  const q = req.nextUrl.searchParams.get("q") ?? "";
  const users = adminSearchUsers(q).map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone,
    role: u.role,
  }));
  return jsonOk({ users });
}