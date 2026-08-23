const STORAGE_KEY = "fd-search-recent";
const MAX_ITEMS = 8;

export type RecentSearchEntry = {
  q: string;
  at: number;
};

function normalizeEntries(raw: unknown): RecentSearchEntry[] {
  if (!Array.isArray(raw)) return [];
  const out: RecentSearchEntry[] = [];
  for (const item of raw) {
    if (typeof item === "string" && item.trim()) {
      out.push({ q: item.trim(), at: Date.now() });
      continue;
    }
    if (
      item &&
      typeof item === "object" &&
      typeof (item as RecentSearchEntry).q === "string" &&
      (item as RecentSearchEntry).q.trim()
    ) {
      const entry = item as RecentSearchEntry;
      out.push({
        q: entry.q.trim(),
        at: typeof entry.at === "number" ? entry.at : Date.now(),
      });
    }
  }
  return out.slice(0, MAX_ITEMS);
}

export function getRecentSearchEntries(): RecentSearchEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return normalizeEntries(JSON.parse(raw) as unknown);
  } catch {
    return [];
  }
}

/** @deprecated Prefer getRecentSearchEntries — kept for terminal SearchModal. */
export function getRecentSearches(): string[] {
  return getRecentSearchEntries().map((entry) => entry.q);
}

export function pushRecentSearch(query: string): string[] {
  const q = query.trim();
  if (!q || typeof window === "undefined") return getRecentSearches();
  const next: RecentSearchEntry[] = [
    { q, at: Date.now() },
    ...getRecentSearchEntries().filter((item) => item.q.toLowerCase() !== q.toLowerCase()),
  ].slice(0, MAX_ITEMS);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore quota */
  }
  return next.map((entry) => entry.q);
}

export function clearRecentSearches(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/** Short relative label for command-06-style recent rows. */
export function formatRecentTimestamp(
  at: number,
  lang: "fa" | "en",
  now = Date.now(),
): string {
  const deltaSec = Math.max(0, Math.floor((now - at) / 1000));
  if (lang === "fa") {
    if (deltaSec < 60) return "همین الان";
    if (deltaSec < 3600) return `${Math.floor(deltaSec / 60)} د پیش`;
    if (deltaSec < 86400) return `${Math.floor(deltaSec / 3600)} س پیش`;
    return `${Math.floor(deltaSec / 86400)} ر پیش`;
  }
  if (deltaSec < 60) return "just now";
  if (deltaSec < 3600) return `${Math.floor(deltaSec / 60)}m ago`;
  if (deltaSec < 86400) return `${Math.floor(deltaSec / 3600)}h ago`;
  return `${Math.floor(deltaSec / 86400)}d ago`;
}
