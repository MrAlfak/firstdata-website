/** Keys treated as known even when not in `commands` map */
const GLOBAL_ALIASES = new Set([
  "clear",
  "whoami",
  "version",
  "help",
  "services",
  "stat",
  "render",
  "whoareyou",
  "نسخه",
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

export type AssistantTermDict = {
  clearCmd: string;
  whoamiCmd: string;
  commands: Record<string, string[]>;
};

export function isKnownAssistantCommand(
  raw: string,
  term: AssistantTermDict,
): boolean {
  const trimmed = raw.trim();
  if (!trimmed) return false;
  const lower = trimmed.toLowerCase();

  if (
    lower === term.clearCmd.toLowerCase() ||
    lower === "clear" ||
    trimmed === term.clearCmd
  ) {
    return true;
  }
  if (
    lower === term.whoamiCmd.toLowerCase() ||
    lower === "whoami" ||
    trimmed === term.whoamiCmd
  ) {
    return true;
  }
  if (GLOBAL_ALIASES.has(lower) || GLOBAL_ALIASES.has(trimmed)) {
    return true;
  }
  if (term.commands[lower] || term.commands[trimmed]) {
    return true;
  }
  return false;
}

/** Suggestion chips for chat UI (same command set as terminal help) */
export function assistantSuggestionKeys(term: AssistantTermDict, fa: boolean): string[] {
  const keys = Object.keys(term.commands);
  const out = [...keys];
  if (!out.includes(term.whoamiCmd)) out.push(term.whoamiCmd);
  const versionKey = fa ? "نسخه" : "version";
  if (!out.includes(versionKey)) out.push(versionKey);
  return out.slice(0, 8);
}
