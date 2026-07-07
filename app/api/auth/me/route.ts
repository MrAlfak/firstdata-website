import { jsonError, jsonOk } from "@/lib/auth/api";
import { getSessionFromCookies } from "@/lib/auth/session";
import { findUserById } from "@/lib/auth/users";
import { toPublicUser } from "@/lib/auth/types";
import { AUTH_ERROR_CODES } from "@/lib/errors/codes";

export const runtime = "nodejs";

export async function GET() {
  try {
    const session = await getSessionFromCookies();
    if (!session) {
      return jsonOk({ user: null });
    }

    const user = findUserById(Number(session.sub));
    if (!user) {
      return jsonOk({ user: null });
    }

    return jsonOk({ user: toPublicUser(user) });
  } catch {
    return jsonError("Session check failed", 500, AUTH_ERROR_CODES.SESSION_FAILED);
  }
}
