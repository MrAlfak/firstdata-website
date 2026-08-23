import type { ReactNode } from "react";

/** Split text and wrap query matches for highlight display. */
export function highlightQuery(text: string, query: string): ReactNode {
  const q = query.trim();
  if (!q) return text;

  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(re);
  if (parts.length === 1) return text;

  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark key={`${part}-${i}`} className="bg-term/25 text-inherit">
        {part}
      </mark>
    ) : (
      <span key={`${part}-${i}`}>{part}</span>
    ),
  );
}
