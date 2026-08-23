import { getDb } from "./db";
import {
  OTP_LENGTH,
  OTP_MAX_ATTEMPTS_PER_WINDOW,
  OTP_RATE_WINDOW_MS,
  OTP_TTL_MS,
} from "./constants";
import { hashOtp, verifyOtp } from "./password";
import { checkRateLimit, recordRateLimitHit } from "@/lib/rate-limit/ip";
import type { OtpChannel, OtpPurpose } from "./types";

// Brute-force protection: cap verification attempts per destination/window,
// independent of the send rate-limit. Enforced inside verifyStoredOtp so every
// caller (login, register, reset_password, verify_email, delete_account, ...) is covered.
const OTP_VERIFY_MAX_ATTEMPTS = 5;
const OTP_VERIFY_WINDOW_MS = 15 * 60 * 1000;

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

  // Rate-limit verification attempts per destination to stop brute-force.
  const verifyBucket = `otp:verify:${channel}:${destination}`;
  if (!checkRateLimit(verifyBucket, OTP_VERIFY_MAX_ATTEMPTS, OTP_VERIFY_WINDOW_MS)) {
    return false;
  }

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

  recordRateLimitHit(verifyBucket);
  return false;
}
