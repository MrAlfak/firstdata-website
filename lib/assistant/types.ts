/** Client-safe assistant types & helpers (no Node / sqlite imports). */

export type AssistantMode = "terminal" | "chat";

export type PublishedAnswer = {
  query_norm: string;
  keywords: string;
  answer_fa: string | null;
  answer_en: string | null;
};

export function normalizeAssistantQuery(raw: string): string {
  return raw.trim().toLowerCase().replace(/\s+/g, " ").slice(0, 200);
}
