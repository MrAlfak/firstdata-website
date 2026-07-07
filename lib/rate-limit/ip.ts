import { getDb } from "@/lib/auth/db";

const RATE_LIMIT_TABLE = "rate_limit_events";

function ensureRateLimitTable(): void {
  const db = getDb();
  db.exec(`
    CREATE TABLE IF NOT EXISTS ${RATE_LIMIT_TABLE} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      bucket TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_rate_limit_bucket_created
      ON ${RATE_LIMIT_TABLE}(bucket, created_at);
  `);
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

export function checkRateLimit(
  bucket: string,
  maxAttempts: number,
  windowMs: number,
): boolean {
  ensureRateLimitTable();
  const db = getDb();
  const since = new Date(Date.now() - windowMs).toISOString();

  const row = db
    .prepare(
      `SELECT COUNT(*) AS count FROM ${RATE_LIMIT_TABLE}
       WHERE bucket = ? AND created_at >= ?`,
    )
    .get(bucket, since) as { count: number };

  return row.count < maxAttempts;
}

export function recordRateLimitHit(bucket: string): void {
  ensureRateLimitTable();
  const db = getDb();
  db.prepare(`INSERT INTO ${RATE_LIMIT_TABLE} (bucket) VALUES (?)`).run(bucket);
}

export function enforceRateLimit(
  bucket: string,
  maxAttempts: number,
  windowMs: number,
): boolean {
  if (!checkRateLimit(bucket, maxAttempts, windowMs)) return false;
  recordRateLimitHit(bucket);
  return true;
}
