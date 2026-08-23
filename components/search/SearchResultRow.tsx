"use client";

import Link from "next/link";
import { typeLabel, type SearchItem } from "@/config/site-search";
import { highlightQuery } from "@/lib/search/highlight";
import { useT } from "@/i18n/LangProvider";
import { searchDictionaries } from "@/i18n/search";

type Props = {
  item: SearchItem;
  query?: string;
  onNavigate?: () => void;
};

export default function SearchResultRow({ item, query = "", onNavigate }: Props) {
  const { fa, dir, lang } = useT();
  const ui = searchDictionaries[lang];

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      dir={dir}
      className={`group flex items-start gap-3 border border-paper/12 bg-paper/[0.02] p-3 transition-colors hover:border-term/35 hover:bg-term/[0.04] ${fa ? "font-fa" : ""}`}
    >
      <span className="mt-0.5 shrink-0 border border-term/25 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-term/70">
        {typeLabel(item.type, ui)}
      </span>
      <span className="min-w-0">
        <span className="block text-sm text-paper group-hover:text-term">
          {highlightQuery(item.title[lang], query)}
        </span>
        {item.blurb ? (
          <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-paper/45">
            {highlightQuery(item.blurb[lang], query)}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
