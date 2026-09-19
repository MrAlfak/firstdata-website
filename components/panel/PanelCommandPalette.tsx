"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useT } from "@/i18n/LangProvider";

const ROUTES = [
  { href: "/panel", key: "dashboard" as const },
  { href: "/panel/projects", key: "projects" as const },
  { href: "/panel/contracts", key: "contracts" as const },
  { href: "/panel/tickets", key: "tickets" as const },
  { href: "/panel/documents", key: "documents" as const },
  { href: "/panel/invoices", key: "invoices" as const },
  { href: "/panel/requests", key: "requests" as const },
  { href: "/panel/notifications", key: "notifications" as const },
  { href: "/panel/org", key: "org" as const },
  { href: "/panel/account", key: "account" as const },
] as const;

export default function PanelCommandPalette() {
  const { p, fa, dir } = useT();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const cmd = p.commandPalette;

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ROUTES.filter((r) => {
      if (!q) return true;
      const label = p.nav[r.key]?.toLowerCase() ?? "";
      return label.includes(q) || r.href.includes(q);
    });
  }, [query, p.nav]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const path = window.location.pathname;
      if (!path.startsWith("/panel")) return;
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        close();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(t);
  }, [open]);

  const [prevQuery, setPrevQuery] = useState(query);
  if (query !== prevQuery) {
    setPrevQuery(query);
    setActive(0);
  }

  function go(href: string) {
    close();
    router.push(href);
  }

  function onInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, Math.max(items.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && items[active]) {
      e.preventDefault();
      go(items[active].href);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-ink/55 px-4 pt-[12vh] backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label={cmd.title}
      onClick={close}
    >
      <div
        className={`w-full max-w-md overflow-hidden border border-paper/20 bg-ink shadow-2xl ${
          fa ? "font-fa" : "font-mono"
        }`}
        dir={dir}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-paper/15 px-3 py-2">
          <p className="mb-1.5 text-[10px] uppercase tracking-wider text-paper/35">{cmd.title}</p>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder={cmd.placeholder}
            className="w-full bg-transparent text-sm text-paper outline-none placeholder:text-paper/30"
            aria-autocomplete="list"
          />
        </div>
        <ul className="max-h-72 overflow-y-auto py-1" role="listbox">
          {items.length === 0 ? (
            <li className="px-3 py-3 text-sm text-paper/40">{cmd.empty}</li>
          ) : (
            items.map((item, i) => (
              <li key={item.href} role="option" aria-selected={i === active}>
                <button
                  type="button"
                  className={`flex w-full items-center justify-between gap-3 px-3 py-2.5 text-start text-sm transition-colors ${
                    i === active
                      ? "bg-paper/[0.08] text-paper"
                      : "text-paper/65 hover:bg-paper/[0.04] hover:text-paper"
                  }`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(item.href)}
                >
                  <span>{p.nav[item.key]}</span>
                  <span className="font-mono text-[10px] text-paper/30" dir="ltr">
                    {item.href}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
        <p className="border-t border-paper/10 px-3 py-2 text-[10px] text-paper/30">{cmd.hint}</p>
      </div>
    </div>
  );
}
