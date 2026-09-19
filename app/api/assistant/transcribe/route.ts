import type { NextRequest } from "next/server";
import { jsonError, jsonOk } from "@/lib/auth/api";
import { parspackTranscribe } from "@/lib/assistant/parspack";
import { enforceRateLimit, getClientIp } from "@/lib/rate-limit/ip";

export const runtime = "nodejs";

const MAX_PER_WINDOW = 10;
const WINDOW_MS = 60 * 1000;
const MAX_BYTES = 3 * 1024 * 1024;

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!enforceRateLimit(`assistant-transcribe:${ip}`, MAX_PER_WINDOW, WINDOW_MS)) {
    return jsonError("Too many requests. Try again shortly.", 429, "rate_limited");
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return jsonError("Invalid form data", 400);
  }

  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return jsonError("audio required", 400);
  }
  if (file.size > MAX_BYTES) {
    return jsonError("audio too large", 413);
  }

  const lang = form.get("lang") === "en" ? "en" : "fa";
  const filename = file.name || (file.type.includes("mp4") ? "voice.mp4" : "voice.webm");

  const result = await parspackTranscribe({
    file,
    filename,
    language: lang,
    signal: AbortSignal.timeout(45_000),
  });

  if (!result.ok) {
    return jsonError("Transcription failed", 502);
  }

  return jsonOk({ text: result.text.slice(0, 500) });
}
