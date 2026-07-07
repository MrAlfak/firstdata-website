import { randomUUID } from "node:crypto";
import { getDb } from "./db";

export type SessionMeta = {
  userAgent?: string;
  ip?: string;
};

export type UserSessionRow = {
  id: string;
  user_id: number;
  user_agent: string | null;
  ip: string | null;
  created_at: string;
  last_seen_at: string;
  revoked_at: string | null;
};

export function createUserSession(userId: number, meta: SessionMeta = {}): string {
  const db = getDb();
  const id = randomUUID();
  db.prepare(
    `INSERT INTO user_sessions (id, user_id, user_agent, ip, created_at, last_seen_at)
     VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))`,
  ).run(id, userId, meta.userAgent ?? null, meta.ip ?? null);
  return id;
}

export function touchUserSession(sessionId: string): void {
  const db = getDb();
  db.prepare(
    `UPDATE user_sessions SET last_seen_at = datetime('now') WHERE id = ? AND revoked_at IS NULL`,
  ).run(sessionId);
}

export function isSessionActive(sessionId: string): boolean {
  const db = getDb();
  const row = db
    .prepare(`SELECT 1 AS ok FROM user_sessions WHERE id = ? AND revoked_at IS NULL`)
    .get(sessionId) as { ok: number } | undefined;
  return Boolean(row);
}

export function listUserSessions(userId: number): UserSessionRow[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT * FROM user_sessions WHERE user_id = ? ORDER BY last_seen_at DESC LIMIT 20`,
    )
    .all(userId) as UserSessionRow[];
}

export function revokeUserSession(userId: number, sessionId: string): boolean {
  const db = getDb();
  const result = db
    .prepare(
      `UPDATE user_sessions SET revoked_at = datetime('now')
       WHERE id = ? AND user_id = ? AND revoked_at IS NULL`,
    )
    .run(sessionId, userId);
  return result.changes > 0;
}

export function revokeAllUserSessions(userId: number, exceptSessionId?: string): number {
  const db = getDb();
  if (exceptSessionId) {
    const result = db
      .prepare(
        `UPDATE user_sessions SET revoked_at = datetime('now')
         WHERE user_id = ? AND id != ? AND revoked_at IS NULL`,
      )
      .run(userId, exceptSessionId);
    return result.changes;
  }
  const result = db
    .prepare(
      `UPDATE user_sessions SET revoked_at = datetime('now')
       WHERE user_id = ? AND revoked_at IS NULL`,
    )
    .run(userId);
  return result.changes;
}
