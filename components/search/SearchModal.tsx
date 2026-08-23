"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getFeaturedSearchItems,
  POPULAR_SEARCHES,
  searchSite,
} from "@/config/site-search";
import SearchResultRow from "@/components/search/SearchResultRow";
import TermModalChrome from "@/components/ui/TermModalChrome";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import { clearRecentSearches, getRecentSearches, pushRecentSearch } from "@/lib/search/history";
import { useT } from "@/i18n/LangProvider";
import { searchDictionaries } from "@/i18n/search";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SearchModal({ open, onClose }: Props) {
  const { fa, dir, lang } = useT();
  const ui = searchDictionaries[lang];
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const [query, setQuery] = useState("");
  const [maximized, setMaximized] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);

  const featured = useMemo(() => getFeaturedSearchItems(6), []);
  const results = useMemo(() => searchSite(query, lang), [query, lang]);
  const showResults = query.trim().length > 0;

  useFocusTrap(open, panelRef);

  useEffect(() => {
    if (!open) return;
    setRecent(getRecentSearches());

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 40);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setMaximized(false);
    }
  }, [open]);

  if (!open) return null;

  const commitSearch = (raw: string) => {
    const q = raw.trim();
    if (!q) {
      inputRef.current?.focus();
      return;
    }
    setRecent(pushRecentSearch(q));
    onClose();
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center p-3 sm:items-center sm:p-4"
      role="presentation"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink/85 backdrop-blur-sm" aria-hidden />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        dir={dir}
        className={`relative z-10 flex w-full flex-col overflow-hidden border border-term/25 bg-ink shadow-[0_24px_80px_rgba(0,0,0,0.65)] transition-[max-width,max-height] duration-200 ${
          maximized
            ? "max-h-[min(96vh,960px)] max-w-5xl"
            : "max-h-[min(92vh,820px)] max-w-3xl"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <TermModalChrome
          title={ui.title}
          titleId={titleId}
          prompt="fd@search:~$"
          fa={fa}
          onClose={onClose}
          onMinimize={onClose}
          onMaximize={() => setMaximized((v) => !v)}
          maximized={maximized}
          closeLabel={ui.close}
          minimizeLabel={ui.minimize}
          maximizeLabel={ui.maximize}
          restoreLabel={ui.restore}
        />

        <div className="overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
          <form
            className="flex flex-col gap-2 sm:flex-row sm:items-stretch"
            onSubmit={(event) => {
              event.preventDefault();
              commitSearch(query);
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
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={ui.placeholder}
                className={`w-full bg-transparent py-3 pe-3 text-sm text-paper outline-none placeholder:text-paper/35 ${
                  fa ? "font-fa ps-10" : "font-mono ps-10"
                }`}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
            </label>
            <button
              type="submit"
              className={`shrink-0 border border-term/50 bg-term/15 px-5 py-3 text-xs uppercase tracking-wider text-term transition-colors hover:bg-term/25 ${
                fa ? "font-fa" : "font-mono"
              }`}
            >
              {ui.submit}
            </button>
          </form>

          <div className="mt-4 flex flex-col gap-3 border border-paper/12 bg-paper/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className={fa ? "font-fa" : ""}>
              <p className={`text-sm text-paper sm:text-base ${fa ? "" : "font-pixel"}`}>
                {ui.bannerTitle}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-paper/50 sm:text-sm">{ui.bannerBody}</p>
            </div>
            <Link
              href="/contactus/consultation"
              onClick={onClose}
              className={`inline-flex shrink-0 items-center justify-center border border-term/40 px-4 py-2.5 text-xs uppercase tracking-wider text-term transition-colors hover:bg-term/10 ${
                fa ? "font-fa" : "font-mono"
              }`}
            >
              {ui.bannerCta}
            </Link>
          </div>

          {showResults ? (
            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p
                  className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-paper/40 ${
                    fa ? "font-fa" : ""
                  }`}
                >
                  <span className="h-1.5 w-1.5 bg-term" aria-hidden />
                  {ui.results}
                </p>
                <Link
                  href={`/search?q=${encodeURIComponent(query.trim())}`}
                  onClick={() => {
                    pushRecentSearch(query);
                    onClose();
                  }}
                  className={`text-[11px] text-term/80 hover:text-term ${fa ? "font-fa" : "font-mono"}`}
                >
                  {ui.viewAll}
                </Link>
              </div>
              {results.length === 0 ? (
                <p className={`text-sm text-paper/50 ${fa ? "font-fa" : ""}`}>{ui.empty}</p>
              ) : (
                <div className="grid gap-2">
                  {results.map((item) => (
                    <SearchResultRow
                      key={item.id}
                      item={item}
                      query={query}
                      onNavigate={() => {
                        pushRecentSearch(query);
                        onClose();
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              {recent.length > 0 ? (
                <div className="mt-6">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p
                      className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-paper/40 ${
                        fa ? "font-fa" : ""
                      }`}
                    >
                      <span className="h-1.5 w-1.5 bg-term" aria-hidden />
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
                        onClick={() => {
                          setQuery(item);
                          commitSearch(item);
                        }}
                        className={`border border-paper/20 px-3 py-1.5 text-xs text-paper/70 transition-colors hover:border-term/40 hover:text-term ${
                          fa ? "font-fa" : "font-mono"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-6">
                <p
                  className={`mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-paper/40 ${
                    fa ? "font-fa" : ""
                  }`}
                >
                  <span className="h-1.5 w-1.5 bg-term" aria-hidden />
                  {ui.featuredTitle}
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {featured.map((item) => (
                    <SearchResultRow key={item.id} item={item} onNavigate={onClose} />
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p
                  className={`mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-paper/40 ${
                    fa ? "font-fa" : ""
                  }`}
                >
                  <span className="h-1.5 w-1.5 bg-term" aria-hidden />
                  {ui.popularTitle}
                </p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((tag) => (
                    <Link
                      key={tag.id}
                      href={tag.href}
                      onClick={onClose}
                      className={`border border-term/30 px-3 py-1.5 text-xs text-term/85 transition-colors hover:border-term/55 hover:bg-term/10 hover:text-term ${
                        fa ? "font-fa" : "font-mono"
                      }`}
                    >
                      {tag.label[lang]}
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
