import type { NextRequest } from "next/server";
import { jsonError, jsonOk } from "@/lib/auth/api";
import { requireStaffOrError } from "@/lib/panel/admin-api";
import {
  adminGetProjectDetail,
  adminUpdateProjectStatus,
} from "@/lib/panel/admin-repository";
import {
  adminAddProjectUpdate,
  adminCreateApproval,
  adminCreateInvoice,
  adminUpdateProjectPhase,
} from "@/lib/panel/repository";

export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireStaffOrError(_req);
  if (error) return error;
  const { id } = await params;
  const detail = adminGetProjectDetail(Number(id));
  if (!detail) return jsonError("Not found", 404);
  return jsonOk({ detail });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireStaffOrError(req);
  if (error) return error;
  const { id } = await params;
  const projectId = Number(id);
  const detail = adminGetProjectDetail(projectId);
  if (!detail) return jsonError("Not found", 404);

  const body = await req.json();
  const userId = detail.project.user_id;

  if (body.update) {
    adminAddProjectUpdate(projectId, String(body.update));
  }
  if (body.phase && body.progressPct != null) {
    adminUpdateProjectPhase(projectId, String(body.phase), Number(body.progressPct));
  }
  if (body.status) {
    adminUpdateProjectStatus(projectId, String(body.status));
  }
  if (body.approvalTitle) {
    adminCreateApproval({
      projectId,
      userId,
      title: String(body.approvalTitle),
      description: body.approvalDescription,
    });
  }
  if (body.invoiceTitle && body.invoiceNumber) {
    adminCreateInvoice({
      userId,
      projectId,
      number: String(body.invoiceNumber),
      title: String(body.invoiceTitle),
      amountRial: Number(body.amountRial) || 0,
      payUrl: body.payUrl,
      dueAt: body.dueAt,
    });
  }

  return jsonOk({ detail: adminGetProjectDetail(projectId) });
}
