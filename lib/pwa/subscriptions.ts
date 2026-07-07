import { getDb } from "@/lib/auth/db";

export type PushSubscriptionPayload = {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
};

export function ensurePushTable(): void {
  const db = getDb();
  db.exec(`
    CREATE TABLE IF NOT EXISTS push_subscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      endpoint TEXT NOT NULL UNIQUE,
      p256dh TEXT NOT NULL,
      auth TEXT NOT NULL,
      user_agent TEXT,
      locale TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_push_subscriptions_locale ON push_subscriptions(locale);
  `);
}

export function savePushSubscription(
  subscription: PushSubscriptionPayload,
  meta: { userAgent?: string; locale?: string },
): void {
  ensurePushTable();
  const db = getDb();

  db.prepare(
    `INSERT INTO push_subscriptions (endpoint, p256dh, auth, user_agent, locale, updated_at)
     VALUES (@endpoint, @p256dh, @auth, @userAgent, @locale, datetime('now'))
     ON CONFLICT(endpoint) DO UPDATE SET
       p256dh = excluded.p256dh,
       auth = excluded.auth,
       user_agent = excluded.user_agent,
       locale = excluded.locale,
       updated_at = datetime('now')`,
  ).run({
    endpoint: subscription.endpoint,
    p256dh: subscription.keys.p256dh,
    auth: subscription.keys.auth,
    userAgent: meta.userAgent ?? null,
    locale: meta.locale ?? null,
  });
}

export function removePushSubscription(endpoint: string): void {
  ensurePushTable();
  getDb().prepare("DELETE FROM push_subscriptions WHERE endpoint = ?").run(endpoint);
}

export function listPushSubscriptions(): PushSubscriptionPayload[] {
  ensurePushTable();
  const rows = getDb()
    .prepare("SELECT endpoint, p256dh, auth FROM push_subscriptions")
    .all() as { endpoint: string; p256dh: string; auth: string }[];

  return rows.map((row) => ({
    endpoint: row.endpoint,
    keys: { p256dh: row.p256dh, auth: row.auth },
  }));
}
