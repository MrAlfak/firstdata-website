import type { NextRequest } from "next/server";
import { jsonError, jsonOk } from "@/lib/auth/api";
import {
  logAssistantQuery,
  type AssistantMode,
} from "@/lib/assistant/query-log";
import {
  enforceRateLimit,
  getClientIp,
} from "@/lib/rate-limit/ip";

export const runtime = "nodejs";

/** Soft analytics — never surface 429 to the chat UI */
const MAX_PER_WINDOW = 180;
const WINDOW_MS = 15 * 60 * 1000;

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  // Skip quietly when over limit (chat must keep working)
  if (!enforceRateLimit(`assistant-log:${ip}`, MAX_PER_WINDOW, WINDOW_MS)) {
    return jsonOk({ logged: false, skipped: true });
  }

  let body: {
    query?: unknown;
    matched?: unknown;
    mode?: unknown;
    lang?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return jsonError("Invalid JSON", 400);
  }

  const query = typeof body.query === "string" ? body.query : "";
  if (!query.trim()) return jsonError("query required", 400);

  const mode: AssistantMode = body.mode === "terminal" ? "terminal" : "chat";
  const lang = body.lang === "fa" ? "fa" : "en";
  const matched = Boolean(body.matched);

  try {
    logAssistantQuery({
      queryRaw: query,
      matched,
      mode,
      lang,
      ip,
    });
  } catch {
    // Still 200 — logging must not break the assistant
    return jsonOk({ logged: false, skipped: true });
  }

  return jsonOk({ logged: true });
}
