import { NextResponse } from "next/server";

import type { PublicUser } from "./types";

import { getClientIp } from "@/lib/rate-limit/ip";



export function jsonOk<T extends Record<string, unknown>>(data: T, status = 200) {

  return NextResponse.json({ success: true, ...data }, { status });

}



export function jsonError(message: string, status = 400, code?: string) {

  return NextResponse.json({ success: false, message, code }, { status });

}



export async function loginResponse(user: PublicUser, redirect?: string, req?: Request) {

  const { createUserSession } = await import("./sessions");

  const { createSessionToken, setSessionCookie } = await import("./session");



  const meta = req

    ? {

        userAgent: req.headers.get("user-agent") ?? undefined,

        ip: getClientIp(req),

      }

    : {};



  const sessionId = createUserSession(user.id, meta);

  const token = await createSessionToken(user, sessionId);

  await setSessionCookie(token);

  return jsonOk({ user, redirect: redirect ?? "/panel" });

}



export async function preAuthResponse(user: PublicUser, preAuthToken: string) {

  return jsonOk({ requiresTotp: true, preAuthToken, user: { id: user.id, name: user.name } });

}

