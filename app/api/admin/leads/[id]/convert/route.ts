import type { NextRequest } from "next/server";
import { jsonError, jsonOk } from "@/lib/auth/api";
import { requireStaffOrError } from "@/lib/panel/admin-api";
import { adminConvertLeadToProject } from "@/lib/panel/admin-repository";
import { dispatchPanelNotification } from "@/lib/panel/notify";

export const runtime = "nodejs";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error } = await requireStaffOrError(req);
  if (error) return error;
  const body = await req.json().catch(() => ({}));
  const result = adminConvertLeadToProject({
    leadId: Number(id),
    title: body.title,
    serviceSlug: body.serviceSlug,
  });
  if (!result) return jsonError("Lead not found", 404);

  await dispatchPanelNotification({
    userId: result.userId,
    kind: "project",
    title: "Your request became a project",
    body: body.title ?? "We opened a project from your contact request.",
    link: `/panel/projects/${result.projectId}`,
  });

  return jsonOk(result);
}
