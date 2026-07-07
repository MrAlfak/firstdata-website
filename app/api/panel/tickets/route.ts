import { jsonError, jsonOk } from "@/lib/auth/api";
import { getPanelUserOrError } from "@/lib/panel/api";
import { createTicket, listProjects, listTickets } from "@/lib/panel/repository";

export const runtime = "nodejs";

export async function GET() {
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;
  return jsonOk({ tickets: listTickets(user.id), projects: listProjects(user.id) });
}

export async function POST(req: Request) {
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;
  const body = await req.json();
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (subject.length < 3 || message.length < 5) {
    return jsonError("Subject and message are required", 400);
  }
  const projectId = body.projectId ? Number(body.projectId) : null;
  const priority = typeof body.priority === "string" ? body.priority : "normal";
  const id = createTicket(user.id, subject, message, projectId, priority);
  return jsonOk({ ticketId: id });
}
