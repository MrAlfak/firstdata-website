import { jsonError, jsonOk } from "@/lib/auth/api";
import { getPanelUserOrError } from "@/lib/panel/api";
import { listUserSessions, revokeUserSession } from "@/lib/auth/sessions";
import { getCurrentSessionId } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function GET() {
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;

  const currentSid = await getCurrentSessionId();
  const sessions = listUserSessions(user.id).map((s) => ({
    id: s.id,
    userAgent: s.user_agent,
    ip: s.ip,
    createdAt: s.created_at,
    lastSeenAt: s.last_seen_at,
    revoked: Boolean(s.revoked_at),
    current: s.id === currentSid,
  }));

  return jsonOk({ sessions });
}

export async function DELETE(req: Request) {
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;

  const body = await req.json();
  const sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
  if (!sessionId) {
    return jsonError("sessionId required", 400);
  }

  const currentSid = await getCurrentSessionId();
  if (sessionId === currentSid) {
    return jsonError("Cannot revoke current session from here. Use sign out.", 400);
  }

  const ok = revokeUserSession(user.id, sessionId);
  if (!ok) return jsonError("Session not found", 404);
  return jsonOk({ message: "Session revoked" });
}
