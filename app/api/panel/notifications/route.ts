import { jsonOk } from "@/lib/auth/api";
import { getPanelUserOrError } from "@/lib/panel/api";
import {
  listNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/lib/panel/repository";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;
  const unread = new URL(req.url).searchParams.get("unread") === "1";
  return jsonOk({ notifications: listNotifications(user.id, unread) });
}

export async function POST(req: Request) {
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;
  const body = await req.json();
  if (body.all === true) {
    markAllNotificationsRead(user.id);
    return jsonOk({ ok: true });
  }
  const id = Number(body.id);
  if (id) markNotificationRead(id, user.id);
  return jsonOk({ ok: true });
}
