import { SignJWT, jwtVerify } from "jose";

import { cookies } from "next/headers";

import type { NextRequest } from "next/server";

import { SESSION_COOKIE, SESSION_MAX_AGE } from "./constants";

import { isSessionActive, touchUserSession } from "./sessions";

import type { PublicUser } from "./types";

import { userContactLabel } from "./types";



export type SessionPayload = {

  sub: string;

  email: string;

  name: string;

  sid?: string;

};



const PRE_AUTH_MAX_AGE = 60 * 5;



function getSecret(): Uint8Array {

  const secret = process.env.AUTH_SECRET;

  if (!secret) {

    if (process.env.NODE_ENV === "production") {

      throw new Error("AUTH_SECRET is required in production");

    }

    return new TextEncoder().encode("fd-dev-secret-change-me");

  }

  return new TextEncoder().encode(secret);

}



export async function createSessionToken(user: PublicUser, sessionId?: string): Promise<string> {

  const payload: Omit<SessionPayload, "sub"> = {

    email: userContactLabel(user),

    name: user.name,

  };

  if (sessionId) payload.sid = sessionId;



  return new SignJWT(payload)

    .setProtectedHeader({ alg: "HS256" })

    .setSubject(String(user.id))

    .setIssuedAt()

    .setExpirationTime(`${SESSION_MAX_AGE}s`)

    .sign(getSecret());

}



export async function createPreAuthToken(userId: number): Promise<string> {

  return new SignJWT({ purpose: "2fa" })

    .setProtectedHeader({ alg: "HS256" })

    .setSubject(String(userId))

    .setIssuedAt()

    .setExpirationTime(`${PRE_AUTH_MAX_AGE}s`)

    .sign(getSecret());

}



export async function verifyPreAuthToken(token: string): Promise<number | null> {

  try {

    const { payload } = await jwtVerify(token, getSecret());

    if (payload.purpose !== "2fa" || typeof payload.sub !== "string") return null;

    return Number(payload.sub);

  } catch {

    return null;

  }

}



export async function verifySessionToken(token: string): Promise<SessionPayload | null> {

  try {

    const { payload } = await jwtVerify(token, getSecret());

    const sub = payload.sub;

    const email = payload.email;

    const name = payload.name;

    const sid = payload.sid;

    if (typeof sub !== "string" || typeof email !== "string" || typeof name !== "string") {

      return null;

    }

    const session: SessionPayload = { sub, email, name };

    if (typeof sid === "string") {

      if (!isSessionActive(sid)) return null;

      touchUserSession(sid);

      session.sid = sid;

    }

    return session;

  } catch {

    return null;

  }

}



export async function setSessionCookie(token: string): Promise<void> {

  const jar = await cookies();

  jar.set(SESSION_COOKIE, token, {

    httpOnly: true,

    secure: process.env.NODE_ENV === "production",

    sameSite: "lax",

    path: "/",

    maxAge: SESSION_MAX_AGE,

  });

}



export async function clearSessionCookie(): Promise<void> {

  const jar = await cookies();

  jar.delete(SESSION_COOKIE);

}



export async function getSessionFromCookies(): Promise<SessionPayload | null> {

  const jar = await cookies();

  const token = jar.get(SESSION_COOKIE)?.value;

  if (!token) return null;

  return verifySessionToken(token);

}



export async function getSessionFromRequest(req: NextRequest): Promise<SessionPayload | null> {

  const token = req.cookies.get(SESSION_COOKIE)?.value;

  if (!token) return null;

  return verifySessionToken(token);

}



export async function getCurrentSessionId(): Promise<string | null> {

  const session = await getSessionFromCookies();

  return session?.sid ?? null;

}

