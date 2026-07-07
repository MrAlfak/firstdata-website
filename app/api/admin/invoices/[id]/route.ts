import type { NextRequest } from "next/server";
import { jsonError, jsonOk } from "@/lib/auth/api";
import { requireStaffOrError } from "@/lib/panel/admin-api";
import { adminMarkInvoicePaid } from "@/lib/panel/admin-repository";

export const runtime = "nodejs";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireStaffOrError(req);
  if (error) return error;
  const { id } = await params;
  const body = await req.json();
  if (body.action !== "markPaid") return jsonError("Unknown action", 400);
  const refId = String(body.refId ?? `manual-${Date.now()}`);
  const ok = adminMarkInvoicePaid(Number(id), refId, "manual");
  if (!ok) return jsonError("Invoice not found", 404);
  return jsonOk({ ok: true });
}
