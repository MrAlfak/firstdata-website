import { NextResponse } from "next/server";
import { APP_VERSION } from "@/config/changelog";
import { getDb } from "@/lib/auth/db";

export const dynamic = "force-dynamic";

export function GET() {
  const started = Date.now();
  let dbOk = false;
  let dbError: string | undefined;

  try {
    const db = getDb();
    const row = db.prepare("SELECT 1 AS ok").get() as { ok: number } | undefined;
    dbOk = row?.ok === 1;
  } catch (e) {
    dbOk = false;
    dbError = e instanceof Error ? e.message : "db_error";
  }

  const ok = dbOk;
  const body = {
    ok,
    version: APP_VERSION,
    checks: {
      authDb: dbOk ? "ok" : "fail",
    },
    ...(dbError && !dbOk ? { error: dbError } : {}),
    latencyMs: Date.now() - started,
    ts: new Date().toISOString(),
  };

  return NextResponse.json(body, { status: ok ? 200 : 503 });
}
