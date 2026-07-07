import type { NextRequest } from "next/server";
import { jsonError, jsonOk } from "@/lib/auth/api";
import { requireStaffOrError } from "@/lib/panel/admin-api";
import {
  adminCloseTicket,
  adminGetTicket,
  adminSetTicketStatus,
} from "@/lib/panel/admin-repository";
import { adminStaffTicketReply, listTicketMessages } from "@/lib/panel/repository";
import { dispatchPanelNotification } from "@/lib/panel/notify";

export const runtime = "nodejs";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error } = await requireStaffOrError(req);
  if (error) return error;
  const ticket = adminGetTicket(Number(id));
  if (!ticket) return jsonError("Not found", 404);
  const messages = listTicketMessages(ticket.id);
  return jsonOk({ ticket, messages });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error, user } = await requireStaffOrError(req);
  if (error || !user) return error!;
  const body = await req.json();
  const ticketId = Number(id);
  const ticket = adminGetTicket(ticketId);
  if (!ticket) return jsonError("Not found", 404);

  if (body.action === "close") {
    adminCloseTicket(ticketId);
    await dispatchPanelNotification({
      userId: ticket.user_id,
      kind: "ticket",
      title: "Ticket closed",
      body: ticket.subject,
      link: `/panel/tickets/${ticketId}`,
    });
    return jsonOk({ closed: true });
  }

  if (body.action === "status" && body.status) {
    adminSetTicketStatus(ticketId, body.status);
    return jsonOk({ status: body.status });
  }

  if (body.reply) {
    adminStaffTicketReply(ticketId, body.reply, body.staffName ?? user.name);
    await dispatchPanelNotification({
      userId: ticket.user_id,
      kind: "ticket",
      title: "Support reply",
      body: ticket.subject,
      link: `/panel/tickets/${ticketId}`,
    });
    return jsonOk({ replied: true });
  }

  return jsonError("Invalid action", 400);
}
