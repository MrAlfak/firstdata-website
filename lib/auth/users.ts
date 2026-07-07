import { getDb } from "./db";

import { hashPassword } from "./password";

import type { PublicUser, UserRecord } from "./types";

import { toPublicUser } from "./types";



export function findUserByEmail(email: string): UserRecord | undefined {

  const db = getDb();

  return db

    .prepare("SELECT * FROM users WHERE email = ? COLLATE NOCASE")

    .get(email.trim().toLowerCase()) as UserRecord | undefined;

}



export function findUserByPhone(phone: string): UserRecord | undefined {

  const db = getDb();

  return db.prepare("SELECT * FROM users WHERE phone = ?").get(phone) as UserRecord | undefined;

}



export function findUserById(id: number): UserRecord | undefined {

  const db = getDb();

  return db.prepare("SELECT * FROM users WHERE id = ?").get(id) as UserRecord | undefined;

}



export async function createUser(input: {

  name: string;

  email?: string;

  phone?: string;

  password?: string;

  emailVerified?: boolean;

  phoneVerified?: boolean;

}): Promise<PublicUser> {

  const email = input.email?.trim().toLowerCase() ?? null;

  const phone = input.phone ?? null;

  const name = input.name.trim();



  if (!email && !phone) {

    throw new Error("Email or phone is required");

  }



  const db = getDb();

  const passwordHash = input.password ? await hashPassword(input.password) : null;

  const emailVerifiedAt = input.emailVerified && email ? new Date().toISOString() : null;

  const phoneVerifiedAt = input.phoneVerified && phone ? new Date().toISOString() : null;



  const result = db

    .prepare(

      `INSERT INTO users (email, phone, name, password_hash, email_verified_at, phone_verified_at, updated_at)

       VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`,

    )

    .run(email, phone, name, passwordHash, emailVerifiedAt, phoneVerifiedAt);



  const user = findUserById(Number(result.lastInsertRowid));

  if (!user) throw new Error("Failed to create user");

  return toPublicUser(user);

}



export function emailExists(email: string): boolean {

  return Boolean(findUserByEmail(email));

}



export function phoneExists(phone: string): boolean {

  return Boolean(findUserByPhone(phone));

}



export function markEmailVerified(userId: number): void {

  const db = getDb();

  db.prepare(

    `UPDATE users SET email_verified_at = datetime('now'), updated_at = datetime('now') WHERE id = ?`,

  ).run(userId);

}



export function markPhoneVerified(userId: number): void {

  const db = getDb();

  db.prepare(

    `UPDATE users SET phone_verified_at = datetime('now'), updated_at = datetime('now') WHERE id = ?`,

  ).run(userId);

}



export function deactivateUser(userId: number): void {

  const db = getDb();

  db.prepare(

    `UPDATE users SET status = 'deactivated', updated_at = datetime('now') WHERE id = ?`,

  ).run(userId);

}



export function setTotpSecret(userId: number, secret: string | null): void {

  const db = getDb();

  db.prepare(

    `UPDATE users SET totp_secret = ?, updated_at = datetime('now') WHERE id = ?`,

  ).run(secret, userId);

}



export function setTotpEnabled(userId: number, enabled: boolean): void {

  const db = getDb();

  db.prepare(

    `UPDATE users SET totp_enabled = ?, updated_at = datetime('now') WHERE id = ?`,

  ).run(enabled ? 1 : 0, userId);

}



export function getTotpSecret(userId: number): string | null {

  const user = findUserById(userId);

  return user?.totp_secret ?? null;

}



export function setUserRole(userId: number, role: string): void {

  const db = getDb();

  db.prepare(

    `UPDATE users SET role = ?, updated_at = datetime('now') WHERE id = ?`,

  ).run(role, userId);

}

