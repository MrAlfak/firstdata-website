"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getFeaturedSearchItems,
  POPULAR_SEARCHES,
  searchSite,
} from "@/config/site-search";
import SearchResultRow from "@/components/search/SearchResultRow";
import { clearRecentSearches, getRecentSearches, pushRecentSearch } from "@/lib/search/history";
import { useT } from "@/i18n/LangProvider";
import { searchDictionaries } from "@/i18n/search";

export default function SearchPageClient() {
  const { fa, dir, lang } = useT();
  const ui = searchDictionaries[lang];
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    setQuery(initial);
    if (initial.trim()) pushRecentSearch(initial);
    setRecent(getRecentSearches());
  }, [initial]);

  const results = useMemo(() => searchSite(query, lang, 24), [query, lang]);
  const featured = useMemo(() => getFeaturedSearchItems(6), []);
  const active = query.trim().length > 0;

  const submit = (raw: string) => {
    const q = raw.trim();
    if (!q) return;
    setRecent(pushRecentSearch(q));
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <header dir={dir} className={fa ? "font-fa" : ""}>
        <p className="font-mono text-[10px] uppercase tracking-wider text-term/60">
          {fa ? "> search /site..." : "> search /site..."}
        </p>
        <h1 className={`mt-2 text-2xl text-paper sm:text-3xl ${fa ? "font-fa" : "font-pixel"}`}>
          {ui.pageTitle}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-paper/55">{ui.pageLead}</p>
      </header>

      <form
        className="mt-8 flex flex-col gap-2 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          submit(query);
        }}
      >
        <label className="relative flex min-w-0 flex-1 items-center border border-term/35 bg-ink focus-within:border-term/60">
          <span className="pointer-events-none absolute start-3 text-term/60" aria-hidden>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={ui.placeholder}
            className={`w-full bg-transparent py-3 pe-3 text-sm text-paper outline-none placeholder:text-paper/35 ${
              fa ? "font-fa ps-10" : "font-mono ps-10"
            }`}
            autoComplete="off"
          />
        </label>
        <button
          type="submit"
          className={`border border-term/50 bg-term/15 px-5 py-3 text-xs uppercase tracking-wider text-term hover:bg-term/25 ${
            fa ? "font-fa" : "font-mono"
          }`}
        >
          {ui.submit}
        </button>
      </form>

      {active ? (
        <section className="mt-8">
          <p
            className={`mb-3 font-mono text-[10px] uppercase tracking-wider text-paper/40 ${
              fa ? "font-fa" : ""
            }`}
          >
            {ui.results} ({results.length})
          </p>
          {results.length === 0 ? (
            <p className={`text-sm text-paper/50 ${fa ? "font-fa" : ""}`}>{ui.empty}</p>
          ) : (
            <div className="grid gap-2">
              {results.map((item) => (
                <SearchResultRow key={item.id} item={item} query={query} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          {recent.length > 0 ? (
            <section className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <p className={`font-mono text-[10px] uppercase tracking-wider text-paper/40 ${fa ? "font-fa" : ""}`}>
                  {ui.recentTitle}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    clearRecentSearches();
                    setRecent([]);
                  }}
                  className={`text-[11px] text-paper/40 hover:text-paper/70 ${fa ? "font-fa" : "font-mono"}`}
                >
                  {ui.clearRecent}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recent.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => submit(item)}
                    className={`border border-paper/20 px-3 py-1.5 text-xs text-paper/70 hover:border-term/40 hover:text-term ${
                      fa ? "font-fa" : "font-mono"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-8">
            <p className={`mb-3 font-mono text-[10px] uppercase tracking-wider text-paper/40 ${fa ? "font-fa" : ""}`}>
              {ui.featuredTitle}
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {featured.map((item) => (
                <SearchResultRow key={item.id} item={item} />
              ))}
            </div>
          </section>

          <section className="mt-8">
            <p className={`mb-3 font-mono text-[10px] uppercase tracking-wider text-paper/40 ${fa ? "font-fa" : ""}`}>
              {ui.popularTitle}
            </p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((tag) => (
                <Link
                  key={tag.id}
                  href={tag.href}
                  className={`border border-term/30 px-3 py-1.5 text-xs text-term/85 hover:bg-term/10 ${
                    fa ? "font-fa" : "font-mono"
                  }`}
                >
                  {tag.label[lang]}
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
