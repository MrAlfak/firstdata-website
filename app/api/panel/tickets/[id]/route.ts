import { jsonError, jsonOk } from "@/lib/auth/api";
import { getPanelUserOrError } from "@/lib/panel/api";
import {
  addTicketMessage,
  getTicketForUser,
  listTicketFiles,
  listTicketMessages,
} from "@/lib/panel/repository";
import { sanitizeTicketHtml, ticketHtmlToPlain } from "@/lib/panel/ticket-html";

export const runtime = "nodejs";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;
  const ticket = getTicketForUser(Number(id), user.id);
  if (!ticket) return jsonError("Not found", 404);
  return jsonOk({
    ticket,
    messages: listTicketMessages(ticket.id),
    files: listTicketFiles(ticket.id, user.id),
  });
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;
  const body = await req.json();
  const raw = typeof body.message === "string" ? body.message : "";
  const message = sanitizeTicketHtml(raw) || raw.trim();
  if (ticketHtmlToPlain(message).length < 1 && message.length < 1) {
    return jsonError("Message required", 400);
  }
  const ok = addTicketMessage(Number(id), user.id, message, user.name);
  if (!ok) return jsonError("Cannot reply", 400);
  return jsonOk({ ok: true });
}
