import { verifyPassword } from "./password";

import { createPreAuthToken, createSessionToken, setSessionCookie } from "./session";

import { createUserSession } from "./sessions";

import { toPublicUser, isUserActive, type UserRecord } from "./types";

import { jsonOk, preAuthResponse } from "./api";

import { getClientIp } from "@/lib/rate-limit/ip";



export async function completeLogin(
  user: UserRecord,
  redirect?: string,
  req?: Request,
  options?: { totpVerified?: boolean },
) {
  if (!isUserActive(user)) {
    return { error: "Account deactivated", status: 403, code: "ACCOUNT_DEACTIVATED" as const };
  }

  const publicUser = toPublicUser(user);

  if (user.totp_enabled && user.totp_secret && !options?.totpVerified) {
    const preAuthToken = await createPreAuthToken(user.id);
    return { response: await preAuthResponse(publicUser, preAuthToken) };
  }



  const meta = req

    ? { userAgent: req.headers.get("user-agent") ?? undefined, ip: getClientIp(req) }

    : {};

  const sessionId = createUserSession(user.id, meta);

  const token = await createSessionToken(publicUser, sessionId);

  await setSessionCookie(token);

  return { response: jsonOk({ user: publicUser, redirect: redirect ?? "/panel" }) };

}



export async function verifyCurrentPassword(user: UserRecord, currentPassword?: string): Promise<boolean> {

  if (!user.password_hash) return true;

  if (!currentPassword) return false;

  return verifyPassword(currentPassword, user.password_hash);

}



export async function notifyAccountChange(userId: number, title: string, body: string): Promise<void> {
  try {
    const { createNotification } = await import("@/lib/panel/repository");
    createNotification(userId, "account", title, body, "/panel/account");
  } catch {
    /* panel schema may be unavailable during auth-only flows */
  }
}

