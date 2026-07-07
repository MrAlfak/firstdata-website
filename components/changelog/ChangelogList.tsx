"use client";

import { CHANGELOG } from "@/config/changelog";
import { formatChangelogDate } from "@/lib/date/displayYear";
import { formatDigits } from "@/lib/i18n/digits";
import type { Lang } from "@/i18n/dictionaries";

type Props = {
  lang: Lang;
  fa: boolean;
  compact?: boolean;
};

export default function ChangelogList({ lang, fa, compact = false }: Props) {
  const locale = lang === "fa" ? "fa" : "en";

  return (
    <div className={`space-y-6 ${compact ? "" : "mt-2"}`}>
      {CHANGELOG.map((entry) => (
        <article
          key={entry.version}
          className="border border-paper/10 bg-paper/[0.015] p-4 sm:p-5"
        >
          <header className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3
              className={`text-sm tracking-wide text-paper ${fa ? "font-fa" : "font-mono uppercase"}`}
            >
              v{formatDigits(entry.version, fa)}
            </h3>
            <time
              dateTime={entry.date}
              className={`text-[10px] text-paper/40 ${fa ? "font-fa" : "font-mono"}`}
            >
              {formatChangelogDate(entry.date, lang)}
            </time>
          </header>
          <ul className={`space-y-2 ${fa ? "font-fa" : ""}`}>
            {entry.items[locale].map((item) => (
              <li
                key={item}
                className="flex gap-2 text-xs leading-relaxed text-paper/60 sm:text-sm"
              >
                <span className="mt-0.5 shrink-0 font-mono text-term/60">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
