import type { NextRequest } from "next/server";
import { jsonError, jsonOk } from "@/lib/auth/api";
import { requireStaffOrError } from "@/lib/panel/admin-api";
import { adminListInvoices } from "@/lib/panel/admin-repository";
import { adminCreateInvoice } from "@/lib/panel/repository";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { error } = await requireStaffOrError(req);
  if (error) return error;
  const status = req.nextUrl.searchParams.get("status") ?? undefined;
  return jsonOk({ invoices: adminListInvoices(status) });
}

export async function POST(req: NextRequest) {
  const { error } = await requireStaffOrError(req);
  if (error) return error;
  const body = await req.json();
  const userId = Number(body.userId);
  if (!userId || !body.title || !body.number) {
    return jsonError("userId, number, title required", 400);
  }
  const invoiceId = adminCreateInvoice({
    userId,
    projectId: body.projectId ? Number(body.projectId) : undefined,
    number: String(body.number),
    title: String(body.title),
    amountRial: Number(body.amountRial) || 0,
    dueAt: body.dueAt,
    payUrl: body.payUrl,
  });
  return jsonOk({ invoiceId });
}
