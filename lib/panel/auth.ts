import fs from "node:fs";
import path from "node:path";
import type { NextRequest } from "next/server";
import { getDb } from "@/lib/auth/db";
import { getSessionFromCookies, getSessionFromRequest } from "@/lib/auth/session";
import { findUserById } from "@/lib/auth/users";
import { ensurePanelSchema } from "./migrate";
import { ensureContactSchema } from "@/lib/contact/store";

export function ensurePanelReady(): void {
  ensurePanelSchema();
}

export type PanelAuthUser = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  role: string;
};

function toPanelUser(user: NonNullable<ReturnType<typeof findUserById>>): PanelAuthUser {
  const row = user as typeof user & { role?: string };
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: row.role ?? "client",
  };
}

export async function requirePanelUser(): Promise<PanelAuthUser | null> {
  ensurePanelReady();
  const session = await getSessionFromCookies();
  if (!session) return null;
  const user = findUserById(Number(session.sub));
  if (!user || user.status === "deactivated") return null;
  return toPanelUser(user);
}

export async function requirePanelUserFromRequest(
  req: NextRequest,
): Promise<PanelAuthUser | null> {
  ensurePanelReady();
  const session = await getSessionFromRequest(req);
  if (!session) return null;
  const user = findUserById(Number(session.sub));
  if (!user || user.status === "deactivated") return null;
  return toPanelUser(user);
}

export function isAdminAuthorized(req: NextRequest | Request, user: PanelAuthUser | null): boolean {
  return isStaffAuthorized(req, user);
}

export function isStaffRole(role: string | undefined): boolean {
  return role === "admin" || role === "staff";
}

export function isStaffAuthorized(req: NextRequest | Request, user: PanelAuthUser | null): boolean {
  if (user && isStaffRole(user.role)) return true;
  const key = process.env.ADMIN_API_KEY?.trim();
  if (!key) return false;
  const header = req.headers.get("x-admin-key") ?? req.headers.get("authorization");
  if (!header) return false;
  if (header === key) return true;
  return header === `Bearer ${key}`;
}

export function getUploadsRoot(): string {
  const dir = path.join(process.cwd(), "data", "uploads");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

export function linkContactLeadsToUser(
  userId: number,
  email: string | null,
  phone: string | null,
): void {
  ensurePanelReady();
  ensureContactSchema();
  const db = getDb();
  if (email) {
    db.prepare(
      `UPDATE contact_leads SET user_id = ? WHERE user_id IS NULL AND lower(email) = lower(?)`,
    ).run(userId, email.trim());
  }
  if (phone) {
    db.prepare(
      `UPDATE contact_leads SET user_id = ? WHERE user_id IS NULL AND phone = ?`,
    ).run(userId, phone);
  }
}
