import type { Lang } from "@/i18n/dictionaries";
import {
  isKnownAssistantCommand,
  type AssistantTermDict,
} from "@/lib/assistant/known";
import {
  isSensitiveQuery,
  matchStaticKnowledge,
  sensitiveReply,
  unknownReply,
} from "@/lib/assistant/knowledge";
import {
  normalizeAssistantQuery,
  type PublishedAnswer,
} from "@/lib/assistant/types";

export type { PublishedAnswer };

export type ResolveKind =
  | "command"
  | "special"
  | "published"
  | "faq"
  | "sensitive"
  | "unknown"
  | "clear";

export type ResolveResult = {
  matched: boolean;
  kind: ResolveKind;
  lines: string[];
  /** Handled only on client (whoami / clear / navigate) */
  special?: "whoami" | "clear" | "version" | "navigate";
  /** Client: open sales form after printing lines */
  navigateHref?: string;
  /** Optional description seed for project request form */
  leadDescription?: string;
};

function publishedLines(p: PublishedAnswer, lang: Lang): string[] | null {
  const raw = lang === "fa" ? p.answer_fa : p.answer_en;
  const fallback = p.answer_fa || p.answer_en;
  const text = (raw || fallback || "").trim();
  if (!text) return null;
  return text.split(/\r?\n/).map((l) => l.trimEnd()).filter((l) => l.length > 0);
}

function matchPublished(
  query: string,
  published: PublishedAnswer[],
  lang: Lang,
): ResolveResult | null {
  const norm = normalizeAssistantQuery(query);
  if (!norm) return null;

  for (const p of published) {
    if (p.query_norm === norm) {
      const lines = publishedLines(p, lang);
      if (lines?.length) return { matched: true, kind: "published", lines };
    }
  }

  let best: { lines: string[]; score: number } | null = null;
  for (const p of published) {
    const kws = (p.keywords || "")
      .split(/[,،\n]/)
      .map((k) => k.trim().toLowerCase())
      .filter(Boolean);
    let score = 0;
    for (const k of kws) {
      if (norm === k) score += 10;
      else if (norm.includes(k)) score += Math.min(6, k.length / 2);
    }
    if (score < 2.5) continue;
    const lines = publishedLines(p, lang);
    if (!lines?.length) continue;
    if (!best || score > best.score) best = { lines, score };
  }
  if (!best) return null;
  return { matched: true, kind: "published", lines: best.lines };
}

/** Terminal sales commands → project assessment form (with optional brief seed). */
function matchSalesNavigate(
  display: string,
  trimmed: string,
  lang: Lang,
): ResolveResult | null {
  const parts = display.trim().split(/\s+/);
  const head = (parts[0] || "").toLowerCase();
  const rest = parts.slice(1).join(" ").trim();

  const startHeads = new Set([
    "start",
    "brief",
    "project",
    "contact",
    "assess",
    "assessment",
    "شروع",
    "بریف",
    "پروژه",
    "تماس",
    "برآورد",
  ]);
  if (!startHeads.has(head)) return null;

  const isConsult =
    head === "contact" ||
    head === "تماس" ||
    trimmed === "consult" ||
    trimmed === "consultation" ||
    trimmed === "مشاوره";

  const href = isConsult ? "/contactus/consultation" : "/contactus/request";
  const leadDescription = rest.slice(0, 2000) || undefined;

  const lines =
    lang === "fa"
      ? [
          isConsult
            ? "در حال باز کردن مسیر تشخیص (مشاوره)…"
            : "در حال باز کردن فرم برآورد پروژه…",
          leadDescription
            ? "بریف شما به فرم منتقل می‌شود تا دوباره تایپ نکنید."
            : "اگر ایده دارید، بنویسید: start [توضیح کوتاه]",
          `→ ${href}`,
        ]
      : [
          isConsult
            ? "Opening Diagnose path (consultation)…"
            : "Opening project assessment form…",
          leadDescription
            ? "Carrying your brief into the form so you don't retype."
            : "Tip: start [short description] to prefill the brief.",
          `→ ${href}`,
        ];

  return {
    matched: true,
    kind: "special",
    special: "navigate",
    navigateHref: href,
    leadDescription,
    lines,
  };
}

/**
 * Resolve a user message for chat (and natural language in terminal).
 * Terminal exact commands still win first.
 */
export function resolveAssistantQuery(
  raw: string,
  lang: Lang,
  term: AssistantTermDict,
  published: PublishedAnswer[] = [],
): ResolveResult {
  const display = raw.trim();
  if (!display) {
    return { matched: false, kind: "unknown", lines: [] };
  }
  const trimmed = display.toLowerCase();

  if (
    trimmed === term.clearCmd.toLowerCase() ||
    trimmed === "clear" ||
    display === term.clearCmd
  ) {
    return { matched: true, kind: "clear", lines: [], special: "clear" };
  }

  if (
    trimmed === term.whoamiCmd.toLowerCase() ||
    trimmed === "whoami" ||
    display === term.whoamiCmd
  ) {
    return { matched: true, kind: "special", lines: [], special: "whoami" };
  }

  if (trimmed === "version" || trimmed === "نسخه" || display === "نسخه") {
    return { matched: true, kind: "special", lines: [], special: "version" };
  }

  const nav = matchSalesNavigate(display, trimmed, lang);
  if (nav) return nav;

  const cmdOut = term.commands[trimmed] ?? term.commands[display];
  if (cmdOut) {
    return { matched: true, kind: "command", lines: cmdOut };
  }

  // Exact known aliases without dictionary output (e.g. help in FA locale typing EN)
  if (isKnownAssistantCommand(display, term) && !cmdOut) {
    // fall through to FAQ — help aliases often live in commands map
  }

  if (isSensitiveQuery(display)) {
    return { matched: true, kind: "sensitive", lines: sensitiveReply(lang) };
  }

  const pub = matchPublished(display, published, lang);
  if (pub) return pub;

  const faq = matchStaticKnowledge(display, lang);
  if (faq) {
    return { matched: true, kind: "faq", lines: faq.lines };
  }

  return { matched: false, kind: "unknown", lines: unknownReply(lang) };
}
