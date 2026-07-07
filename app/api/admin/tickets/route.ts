import type { NextRequest } from "next/server";
import { jsonOk } from "@/lib/auth/api";
import { requireStaffOrError } from "@/lib/panel/admin-api";
import { adminListAllTickets } from "@/lib/panel/admin-repository";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { error } = await requireStaffOrError(req);
  if (error) return error;
  const status = req.nextUrl.searchParams.get("status") ?? undefined;
  return jsonOk({ tickets: adminListAllTickets(status) });
}
