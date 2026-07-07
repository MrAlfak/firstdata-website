import type { NextRequest } from "next/server";
import { jsonError, jsonOk } from "@/lib/auth/api";
import { requireStaffOrError } from "@/lib/panel/admin-api";import {
  adminAddProjectUpdate,
  adminCreateApproval,
  adminCreateContract,
  adminCreateInvoice,
  adminCreateProject,
  adminStaffTicketReply,
  adminUpdateProjectPhase,
  writeContractPlaceholder,
} from "@/lib/panel/repository";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { error: authError } = await requireStaffOrError(req);
  if (authError) return authError;

  const body = await req.json();
  const userId = Number(body.userId);
  if (!userId) return jsonError("userId required", 400);

  const milestoneLabels = body.milestoneLabels ?? {
    consult: "Consultation",
    design: "Design",
    build: "Development",
    launch: "Launch",
  };

  const projectId = adminCreateProject({
    userId,
    title: body.title,
    serviceSlug: body.serviceSlug,
    status: body.status ?? "active",
    phase: body.phase ?? "consult",
    progressPct: body.progressPct ?? 10,
    summary: body.summary,
    deliveryDue: body.deliveryDue,
    milestoneLabels,
  });

  if (body.contractTitle) {
    const contractPath = await writeContractPlaceholder(userId, projectId, body.contractTitle);
    adminCreateContract({
      projectId,
      userId,
      title: body.contractTitle,
      summary: body.summary,
      filePath: contractPath,
    });
  }

  if (body.update) adminAddProjectUpdate(projectId, body.update);
  if (body.approvalTitle) {
    adminCreateApproval({
      projectId,
      userId,
      title: body.approvalTitle,
      description: body.approvalDescription,
    });
  }
  if (body.invoiceTitle) {
    adminCreateInvoice({
      userId,
      projectId,
      number: body.number ?? `INV-${projectId}`,
      title: body.invoiceTitle,
      amountRial: body.amountRial ?? 0,
      payUrl: body.payUrl,
    });
  }
  if (body.phase && body.progressPct != null) {
    adminUpdateProjectPhase(projectId, body.phase, Number(body.progressPct));
  }
  if (body.ticketId && body.staffReply) {
    adminStaffTicketReply(Number(body.ticketId), body.staffReply, body.staffName ?? "First Data");
  }

  return jsonOk({ projectId });
}
