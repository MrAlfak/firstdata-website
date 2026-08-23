import type { AssistantMode } from "@/lib/assistant/types";

let lastAt = 0;
let lastQuery = "";

/** Fire-and-forget log of user assistant/terminal input (never blocks UX). */
export function logAssistantQueryClient(input: {
  query: string;
  matched: boolean;
  mode: AssistantMode;
  lang: string;
}): void {
  const query = input.query.trim();
  if (!query) return;

  const now = Date.now();
  // Throttle bursts (suggestion spam / Strict Mode double-invoke)
  if (now - lastAt < 400) return;
  if (query === lastQuery && now - lastAt < 2500) return;
  lastAt = now;
  lastQuery = query;

  try {
    void fetch("/api/assistant/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        matched: input.matched,
        mode: input.mode,
        lang: input.lang,
      }),
      keepalive: true,
    }).catch(() => {
      /* ignore */
    });
  } catch {
    /* ignore */
  }
}
