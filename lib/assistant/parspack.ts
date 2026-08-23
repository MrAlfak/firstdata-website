export type ParspackChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type ParspackChatResult =
  | { ok: true; content: string; model: string }
  | { ok: false; error: string; status?: number };

function env(name: string, fallback = ""): string {
  return (process.env[name] ?? fallback).trim();
}

/** OpenAI-compatible chat completions via ParsPack AI Studio. */
export async function parspackChatCompletion(input: {
  messages: ParspackChatMessage[];
  maxTokens?: number;
  temperature?: number;
  signal?: AbortSignal;
}): Promise<ParspackChatResult> {
  const apiKey = env("PARSPACK_AI_API_KEY");
  if (!apiKey) {
    return { ok: false, error: "PARSPACK_AI_API_KEY is not configured" };
  }

  const base = env(
    "PARSPACK_AI_BASE_URL",
    "https://my.parspack.com/api/aistudio/api/v1",
  ).replace(/\/+$/, "");
  const model = env("PARSPACK_AI_MODEL", "abrha/free-model");

  let res: Response;
  try {
    res = await fetch(`${base}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        model,
        messages: input.messages,
        max_tokens: input.maxTokens ?? 700,
        temperature: input.temperature ?? 0.25,
      }),
      signal: input.signal,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "network error";
    return { ok: false, error: msg };
  }

  const raw = await res.text();
  let parsed: {
    choices?: { message?: { content?: string }; finish_reason?: string }[];
    error?: { message?: string };
  } = {};
  try {
    parsed = JSON.parse(raw) as typeof parsed;
  } catch {
    return {
      ok: false,
      error: raw.slice(0, 240) || `HTTP ${res.status}`,
      status: res.status,
    };
  }

  if (!res.ok) {
    return {
      ok: false,
      error: parsed.error?.message || raw.slice(0, 240) || `HTTP ${res.status}`,
      status: res.status,
    };
  }

  const content = (parsed.choices?.[0]?.message?.content ?? "").trim();
  if (!content) {
    return {
      ok: false,
      error: "Empty model response",
      status: res.status,
    };
  }

  return { ok: true, content, model };
}

export function splitAssistantAnswer(content: string): string[] {
  return content
    .split(/\r?\n/)
    .map((l) => l.trimEnd())
    .filter((l) => l.length > 0);
}
