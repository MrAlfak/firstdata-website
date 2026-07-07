import { jsonError, jsonOk } from "@/lib/auth/api";

import { clearSessionCookie, getSessionFromCookies } from "@/lib/auth/session";
import { revokeUserSession } from "@/lib/auth/sessions";

import { AUTH_ERROR_CODES } from "@/lib/errors/codes";



export const runtime = "nodejs";



export async function POST() {

  try {

    const session = await getSessionFromCookies();

    if (session?.sid) {

      revokeUserSession(Number(session.sub), session.sid);

    }

    await clearSessionCookie();

    return jsonOk({ message: "Signed out" });

  } catch {

    return jsonError("Logout failed", 500, AUTH_ERROR_CODES.LOGOUT_FAILED);

  }

}

