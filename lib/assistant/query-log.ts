import { getDb } from "@/lib/auth/db";
import {
  normalizeAssistantQuery,
  type AssistantMode,
  type PublishedAnswer,
} from "@/lib/assistant/types";

export type { AssistantMode, PublishedAnswer };
export { normalizeAssistantQuery };

export type AssistantQueryStatus = "open" | "draft" | "published" | "done";

export type AssistantQueryAggregate = {
  query_norm: string;
  raw_sample: string;
  hits: number;
  matched: number;
  modes: string;
  langs: string;
  first_seen: string;
  last_seen: string;
  note: string | null;
  answer_fa: string | null;
  answer_en: string | null;
  keywords: string | null;
  status: string;
};

export type AssistantStats = {
  totalEvents: number;
  matchedEvents: number;
  matchRate: number;
  distinctQueries: number;
  unmatchedDistinct: number;
  byLang: { fa: number; en: number };
  byStatus: Record<string, number>;
  topUnmatched: { query_norm: string; raw_sample: string; hits: number }[];
};

function ensureTables(): void {
  const db = getDb();
  db.exec(`
    CREATE TABLE IF NOT EXISTS assistant_query_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      query_raw TEXT NOT NULL,
      query_norm TEXT NOT NULL,
      matched INTEGER NOT NULL DEFAULT 0,
      mode TEXT NOT NULL,
      lang TEXT NOT NULL,
      ip TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_assistant_query_norm
      ON assistant_query_events(query_norm);
    CREATE INDEX IF NOT EXISTS idx_assistant_query_created
      ON assistant_query_events(created_at);

    CREATE TABLE IF NOT EXISTS assistant_query_meta (
      query_norm TEXT PRIMARY KEY,
      note TEXT,
      answer_fa TEXT,
      answer_en TEXT,
      keywords TEXT,
      status TEXT NOT NULL DEFAULT 'open',
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  const cols = db
    .prepare(`PRAGMA table_info(assistant_query_meta)`)
    .all() as { name: string }[];
  const names = new Set(cols.map((c) => c.name));
  if (!names.has("answer_fa")) {
    db.exec(`ALTER TABLE assistant_query_meta ADD COLUMN answer_fa TEXT`);
  }
  if (!names.has("answer_en")) {
    db.exec(`ALTER TABLE assistant_query_meta ADD COLUMN answer_en TEXT`);
  }
  if (!names.has("keywords")) {
    db.exec(`ALTER TABLE assistant_query_meta ADD COLUMN keywords TEXT`);
  }
}

export function logAssistantQuery(input: {
  queryRaw: string;
  matched: boolean;
  mode: AssistantMode;
  lang: string;
  ip?: string;
}): void {
  const queryRaw = input.queryRaw.trim().slice(0, 500);
  const queryNorm = normalizeAssistantQuery(queryRaw);
  if (!queryNorm) return;

  ensureTables();
  const db = getDb();
  db.prepare(
    `INSERT INTO assistant_query_events
      (query_raw, query_norm, matched, mode, lang, ip)
     VALUES (?, ?, ?, ?, ?, ?)`,
  ).run(
    queryRaw,
    queryNorm,
    input.matched ? 1 : 0,
    input.mode,
    input.lang === "fa" ? "fa" : "en",
    input.ip ?? null,
  );
}

export function listPublishedAnswers(): PublishedAnswer[] {
  ensureTables();
  const db = getDb();
  return db
    .prepare(
      `SELECT query_norm, COALESCE(keywords, '') AS keywords, answer_fa, answer_en
       FROM assistant_query_meta
       WHERE status = 'published'
         AND (
           (answer_fa IS NOT NULL AND length(trim(answer_fa)) > 0)
           OR (answer_en IS NOT NULL AND length(trim(answer_en)) > 0)
         )`,
    )
    .all() as PublishedAnswer[];
}

export function listAssistantQueryAggregates(opts?: {
  unmatchedOnly?: boolean;
  status?: string;
  limit?: number;
}): AssistantQueryAggregate[] {
  ensureTables();
  const db = getDb();
  const limit = Math.min(Math.max(opts?.limit ?? 200, 1), 500);
  const clauses: string[] = [];
  const params: unknown[] = [];

  if (opts?.unmatchedOnly) {
    clauses.push("e.matched = 0");
    clauses.push("COALESCE(m.status, 'open') != 'published'");
  }
  if (opts?.status) {
    clauses.push("COALESCE(m.status, 'open') = ?");
    params.push(opts.status);
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";

  return db
    .prepare(
      `SELECT
         e.query_norm AS query_norm,
         (SELECT e2.query_raw FROM assistant_query_events e2
           WHERE e2.query_norm = e.query_norm
           ORDER BY e2.id DESC LIMIT 1) AS raw_sample,
         COUNT(*) AS hits,
         MAX(e.matched) AS matched,
         GROUP_CONCAT(DISTINCT e.mode) AS modes,
         GROUP_CONCAT(DISTINCT e.lang) AS langs,
         MIN(e.created_at) AS first_seen,
         MAX(e.created_at) AS last_seen,
         m.note AS note,
         m.answer_fa AS answer_fa,
         m.answer_en AS answer_en,
         m.keywords AS keywords,
         COALESCE(m.status, 'open') AS status
       FROM assistant_query_events e
       LEFT JOIN assistant_query_meta m ON m.query_norm = e.query_norm
       ${where}
       GROUP BY e.query_norm
       ORDER BY hits DESC, last_seen DESC
       LIMIT ?`,
    )
    .all(...params, limit) as AssistantQueryAggregate[];
}

export function updateAssistantQueryMeta(
  queryNorm: string,
  patch: {
    note?: string;
    status?: string;
    answer_fa?: string;
    answer_en?: string;
    keywords?: string;
  },
): boolean {
  const norm = normalizeAssistantQuery(queryNorm);
  if (!norm) return false;
  ensureTables();
  const db = getDb();

  const existing = db
    .prepare(
      `SELECT query_norm, note, answer_fa, answer_en, keywords, status
       FROM assistant_query_meta WHERE query_norm = ?`,
    )
    .get(norm) as
    | {
        query_norm: string;
        note: string | null;
        answer_fa: string | null;
        answer_en: string | null;
        keywords: string | null;
        status: string;
      }
    | undefined;

  const next = {
    note: patch.note !== undefined ? patch.note : (existing?.note ?? null),
    answer_fa:
      patch.answer_fa !== undefined ? patch.answer_fa : (existing?.answer_fa ?? null),
    answer_en:
      patch.answer_en !== undefined ? patch.answer_en : (existing?.answer_en ?? null),
    keywords:
      patch.keywords !== undefined ? patch.keywords : (existing?.keywords ?? null),
    status: patch.status !== undefined ? patch.status : (existing?.status ?? "open"),
  };

  if (next.status === "published") {
    const hasAnswer =
      (next.answer_fa && next.answer_fa.trim()) ||
      (next.answer_en && next.answer_en.trim());
    if (!hasAnswer) return false;
  }

  if (!existing) {
    db.prepare(
      `INSERT INTO assistant_query_meta
        (query_norm, note, answer_fa, answer_en, keywords, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
    ).run(
      norm,
      next.note,
      next.answer_fa,
      next.answer_en,
      next.keywords,
      next.status,
    );
    return true;
  }

  db.prepare(
    `UPDATE assistant_query_meta
     SET note = ?, answer_fa = ?, answer_en = ?, keywords = ?, status = ?,
         updated_at = datetime('now')
     WHERE query_norm = ?`,
  ).run(
    next.note,
    next.answer_fa,
    next.answer_en,
    next.keywords,
    next.status,
    norm,
  );
  return true;
}

export function getAssistantStats(): AssistantStats {
  ensureTables();
  const db = getDb();

  const totals = db
    .prepare(
      `SELECT
         COUNT(*) AS totalEvents,
         SUM(CASE WHEN matched = 1 THEN 1 ELSE 0 END) AS matchedEvents,
         COUNT(DISTINCT query_norm) AS distinctQueries
       FROM assistant_query_events`,
    )
    .get() as {
    totalEvents: number;
    matchedEvents: number;
    distinctQueries: number;
  };

  const unmatchedDistinct = (
    db
      .prepare(
        `SELECT COUNT(*) AS c FROM (
           SELECT e.query_norm
           FROM assistant_query_events e
           LEFT JOIN assistant_query_meta m ON m.query_norm = e.query_norm
           WHERE e.matched = 0
             AND COALESCE(m.status, 'open') != 'published'
           GROUP BY e.query_norm
         )`,
      )
      .get() as { c: number }
  ).c;

  const langRows = db
    .prepare(
      `SELECT lang, COUNT(*) AS c FROM assistant_query_events GROUP BY lang`,
    )
    .all() as { lang: string; c: number }[];
  const byLang = { fa: 0, en: 0 };
  for (const r of langRows) {
    if (r.lang === "fa") byLang.fa = r.c;
    else byLang.en += r.c;
  }

  const statusRows = db
    .prepare(
      `SELECT COALESCE(status, 'open') AS status, COUNT(*) AS c
       FROM assistant_query_meta GROUP BY status`,
    )
    .all() as { status: string; c: number }[];
  const byStatus: Record<string, number> = {};
  for (const r of statusRows) byStatus[r.status] = r.c;

  const topUnmatched = db
    .prepare(
      `SELECT
         e.query_norm AS query_norm,
         (SELECT e2.query_raw FROM assistant_query_events e2
           WHERE e2.query_norm = e.query_norm
           ORDER BY e2.id DESC LIMIT 1) AS raw_sample,
         COUNT(*) AS hits
       FROM assistant_query_events e
       LEFT JOIN assistant_query_meta m ON m.query_norm = e.query_norm
       WHERE e.matched = 0
         AND COALESCE(m.status, 'open') != 'published'
       GROUP BY e.query_norm
       ORDER BY hits DESC
       LIMIT 10`,
    )
    .all() as AssistantStats["topUnmatched"];

  const totalEvents = totals.totalEvents || 0;
  const matchedEvents = totals.matchedEvents || 0;

  return {
    totalEvents,
    matchedEvents,
    matchRate: totalEvents ? matchedEvents / totalEvents : 0,
    distinctQueries: totals.distinctQueries || 0,
    unmatchedDistinct,
    byLang,
    byStatus,
    topUnmatched,
  };
}
