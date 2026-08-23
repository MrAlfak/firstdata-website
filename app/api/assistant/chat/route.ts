import type { NextRequest } from "next/server";
import { jsonError, jsonOk } from "@/lib/auth/api";
import {
  isSensitiveQuery,
  matchStaticKnowledge,
  sensitiveReply,
  unknownReply,
} from "@/lib/assistant/knowledge";
import { logAssistantQuery } from "@/lib/assistant/query-log";
import {
  parspackChatCompletion,
  splitAssistantAnswer,
} from "@/lib/assistant/parspack";
import { buildFirstDataSystemPrompt } from "@/lib/assistant/system-prompt";
import {
  enforceRateLimit,
  getClientIp,
} from "@/lib/rate-limit/ip";

export const runtime = "nodejs";

const MAX_PER_WINDOW = 20;
const WINDOW_MS = 60 * 1000;
const MAX_QUERY = 500;

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!enforceRateLimit(`assistant-chat:${ip}`, MAX_PER_WINDOW, WINDOW_MS)) {
    return jsonError("Too many requests. Try again shortly.", 429, "rate_limited");
  }

  let body: { query?: unknown; lang?: unknown };
  try {
    body = await req.json();
  } catch {
    return jsonError("Invalid JSON", 400);
  }

  const query =
    typeof body.query === "string" ? body.query.trim().slice(0, MAX_QUERY) : "";
  if (!query) return jsonError("query required", 400);

  const lang = body.lang === "en" ? "en" : "fa";

  const finish = (lines: string[], matched: boolean, source: string) => {
    try {
      logAssistantQuery({
        queryRaw: query,
        matched,
        mode: "chat",
        lang,
        ip,
      });
    } catch {
      /* logging must not break chat */
    }
    return jsonOk({ lines, matched, source });
  };

  if (isSensitiveQuery(query)) {
    return finish(sensitiveReply(lang), true, "sensitive");
  }

  const ctrl = AbortSignal.timeout(45_000);
  const llm = await parspackChatCompletion({
    messages: [
      { role: "system", content: buildFirstDataSystemPrompt(lang) },
      { role: "user", content: query },
    ],
    maxTokens: 700,
    temperature: 0.25,
    signal: ctrl,
  });

  if (llm.ok) {
    const lines = splitAssistantAnswer(llm.content);
    if (lines.length) {
      return finish(lines, true, "parspack");
    }
  }

  const faq = matchStaticKnowledge(query, lang);
  if (faq) {
    return finish(faq.lines, true, "knowledge");
  }

  return finish(unknownReply(lang), false, llm.ok ? "empty" : "fallback");
}
