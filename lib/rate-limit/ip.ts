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

/** Match SQLite `datetime('now')` format: `YYYY-MM-DD HH:MM:SS` (UTC). */
function sinceSqlite(windowMs: number): string {
  return new Date(Date.now() - windowMs)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  // Dev / direct Node often has no proxy headers — isolate per-process bucket
  return "local";
}

let lastCleanupAt = 0;
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000; // run at most every 5 minutes

/** Deterministic, time-based cleanup instead of a random 2% chance per request. */
function maybeCleanup(): void {
  const now = Date.now();
  if (now - lastCleanupAt < CLEANUP_INTERVAL_MS) return;
  lastCleanupAt = now;
  try {
    getDb()
      .prepare(`DELETE FROM ${RATE_LIMIT_TABLE} WHERE created_at < datetime('now', '-2 days')`)
      .run();
  } catch {
    /* non-fatal: cleanup is best-effort */
  }
}

export function checkRateLimit(
  bucket: string,
  maxAttempts: number,
  windowMs: number,
): boolean {
  ensureRateLimitTable();
  maybeCleanup();
  const db = getDb();
  const since = sinceSqlite(windowMs);

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
