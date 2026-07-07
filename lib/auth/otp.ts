import { getDb } from "./db";
import {
  OTP_LENGTH,
  OTP_MAX_ATTEMPTS_PER_WINDOW,
  OTP_RATE_WINDOW_MS,
  OTP_TTL_MS,
} from "./constants";
import { hashOtp, verifyOtp } from "./password";
import type { OtpChannel, OtpPurpose } from "./types";

function generateCode(): string {
  const max = 10 ** OTP_LENGTH;
  const num = crypto.getRandomValues(new Uint32Array(1))[0] % max;
  return num.toString().padStart(OTP_LENGTH, "0");
}

export function canSendOtp(destination: string, channel: OtpChannel): boolean {
  const db = getDb();
  const since = new Date(Date.now() - OTP_RATE_WINDOW_MS).toISOString();
  const row = db
    .prepare(
      `SELECT COUNT(*) AS count FROM otp_codes
       WHERE destination = ? AND channel = ? AND created_at >= ?`,
    )
    .get(destination, channel, since) as { count: number };
  return row.count < OTP_MAX_ATTEMPTS_PER_WINDOW;
}

export async function createOtp(
  destination: string,
  channel: OtpChannel,
  purpose: OtpPurpose,
): Promise<string> {
  const db = getDb();
  const code = generateCode();
  const codeHash = await hashOtp(code);
  const expiresAt = new Date(Date.now() + OTP_TTL_MS).toISOString();

  db.prepare(
    `INSERT INTO otp_codes (destination, channel, code_hash, purpose, expires_at)
     VALUES (?, ?, ?, ?, ?)`,
  ).run(destination, channel, codeHash, purpose, expiresAt);

  return code;
}

export async function verifyStoredOtp(
  destination: string,
  channel: OtpChannel,
  code: string,
  purpose: OtpPurpose,
): Promise<boolean> {
  const db = getDb();
  const now = new Date().toISOString();

  const rows = db
    .prepare(
      `SELECT id, code_hash FROM otp_codes
       WHERE destination = ?
         AND channel = ?
         AND purpose = ?
         AND used_at IS NULL
         AND expires_at > ?
       ORDER BY created_at DESC
       LIMIT 5`,
    )
    .all(destination, channel, purpose, now) as { id: number; code_hash: string }[];

  for (const row of rows) {
    const ok = await verifyOtp(code, row.code_hash);
    if (ok) {
      db.prepare(`UPDATE otp_codes SET used_at = datetime('now') WHERE id = ?`).run(row.id);
      return true;
    }
  }

  return false;
}
