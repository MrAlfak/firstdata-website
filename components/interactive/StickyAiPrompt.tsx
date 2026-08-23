"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles, X } from "lucide-react";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import AssistantMessageLines from "@/components/interactive/AssistantMessageLines";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import { useT } from "@/i18n/LangProvider";
import { cn } from "@/lib/utils";

type ModalState = {
  question: string;
  lines: string[];
  loading: boolean;
  error: string | null;
};

/** GPU-friendly ease-out — transform + opacity only (no blur / layoutId). */
const softEase = [0.22, 1, 0.36, 1] as const;
const shellEnter = { duration: 0.3, ease: softEase } as const;
const shellExit = { duration: 0.24, ease: softEase } as const;

function ThinkingDots() {
  return (
    <span className="inline-flex items-center gap-1.5" aria-hidden>
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-paper/50 [animation-delay:-0.3s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-paper/50 [animation-delay:-0.15s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-paper/50" />
    </span>
  );
}

function shouldHideSticky(pathname: string): boolean {
  if (pathname.startsWith("/panel")) return true;
  if (pathname.startsWith("/admin")) return true;
  if (pathname.startsWith("/auth")) return true;
  if (pathname.startsWith("/maintenance")) return true;
  if (pathname.startsWith("/offline")) return true;
  if (pathname.startsWith("/cta-01")) return true;
  return false;
}

/**
 * Modern-only sticky First Data assistant —
 * compact mini chip → soft expand into PromptInputBox + answer modal.
 */
export default function StickyAiPrompt() {
  const pathname = usePathname() || "/";
  const [skin] = usePanelSkin();
  const { lang, fa, dir, d } = useT();
  const chat = d.assistantChat;
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [modal, setModal] = useState<ModalState | null>(null);

  useEffect(() => setMounted(true), []);
  useFocusTrap(Boolean(modal), panelRef);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !busy) setModal(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [modal, busy]);

  // Collapse on Escape / click-outside when composer is open (and answer modal is not).
  useEffect(() => {
    if (!expanded || modal) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    const onPointer = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (shellRef.current && target && !shellRef.current.contains(target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [expanded, modal]);

  // Route change → collapse
  useEffect(() => {
    setExpanded(false);
  }, [pathname]);

  const closeModal = useCallback(() => {
    if (busy) {
      abortRef.current?.abort();
      abortRef.current = null;
      setBusy(false);
    }
    setModal(null);
  }, [busy]);

  const ask = useCallback(
    async (raw: string) => {
      const query = raw.trim().slice(0, 500);
      if (!query || busy) return;

      setBusy(true);
      setModal({ question: query, lines: [], loading: true, error: null });

      const ctrl = new AbortController();
      abortRef.current = ctrl;

      try {
        const res = await fetch("/api/assistant/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, lang }),
          signal: ctrl.signal,
        });
        const data = (await res.json()) as {
          success?: boolean;
          lines?: string[];
          message?: string;
        };
        const lines = Array.isArray(data.lines) ? data.lines.filter(Boolean) : [];

        if (!res.ok || !data.success || lines.length === 0) {
          setModal({
            question: query,
            lines: [],
            loading: false,
            error: data.message || chat.errorGeneric,
          });
          return;
        }

        setModal({ question: query, lines, loading: false, error: null });
      } catch (e) {
        if ((e as Error)?.name === "AbortError") {
          setModal(null);
          return;
        }
        setModal({
          question: query,
          lines: [],
          loading: false,
          error: chat.errorGeneric,
        });
      } finally {
        abortRef.current = null;
        setBusy(false);
      }
    },
    [busy, lang, chat.errorGeneric],
  );

  useEffect(() => {
    const onAsk = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (typeof detail === "string" && detail.trim()) {
        setExpanded(true);
        void ask(detail);
      }
    };
    window.addEventListener("fd-assistant-ask", onAsk as EventListener);
    return () => window.removeEventListener("fd-assistant-ask", onAsk as EventListener);
  }, [ask]);

  if (!mounted) return null;
  if (skin !== "modern") return null;
  if (shouldHideSticky(pathname)) return null;

  const modalUi = modal
    ? createPortal(
        <div
          className="fixed inset-0 z-[130] flex items-end justify-center p-3 sm:items-center sm:p-6"
          role="presentation"
          onClick={() => {
            if (!busy) closeModal();
          }}
        >
          <div className="absolute inset-0 bg-ink/80 backdrop-blur-md" aria-hidden />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            dir={dir}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "relative z-10 flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-[var(--ai-card,#181c1b)] shadow-[0_24px_80px_rgba(0,0,0,0.55)]",
              "max-h-[min(88vh,820px)]",
              fa ? "font-iran" : "font-iran",
            )}
          >
            <div className="flex items-center gap-3 border-b border-border/80 px-4 py-3.5 sm:px-5">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {chat.eyebrow}
                </p>
                <h2 id={titleId} className="truncate text-base font-medium text-foreground">
                  {chat.modalTitle}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label={chat.close}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-5">
              <div className="flex justify-end">
                <div className="max-w-[90%] rounded-2xl rounded-ee-md bg-primary px-4 py-2.5 text-sm leading-relaxed text-primary-foreground">
                  {modal.question}
                </div>
              </div>
              <div className="flex justify-start gap-3">
                <div className="mt-1 hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-[10px] font-semibold text-foreground sm:flex">
                  FD
                </div>
                <div className="max-w-[92%] rounded-2xl rounded-es-md border border-border bg-muted/40 px-4 py-3 text-sm leading-relaxed text-foreground">
                  {modal.loading ? (
                    <div className="flex items-center gap-2.5 text-muted-foreground">
                      <ThinkingDots />
                      <span className="text-xs">{chat.thinking}</span>
                    </div>
                  ) : modal.error ? (
                    <p className="text-muted-foreground">{modal.error}</p>
                  ) : (
                    <AssistantMessageLines lines={modal.lines} />
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-border/80 px-4 py-3 sm:px-5">
              <p className="text-[10px] leading-relaxed text-muted-foreground">{chat.disclaimer}</p>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <div
        id="assistant"
        className={cn(
          "pointer-events-none fixed inset-x-0 bottom-0 z-[55]",
          "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        )}
      >
        <div
          className={cn(
            "pointer-events-auto mx-auto w-full px-3",
            // Expanded: clear the left skin FAB; mini chip stays compact & centered.
            expanded
              ? "max-w-3xl pl-[max(0.75rem,13.75rem)] sm:max-w-3xl sm:px-5 sm:pl-[max(1.25rem,13.75rem)] lg:max-w-3xl lg:px-6 lg:pl-[max(1.5rem,13.75rem)]"
              : "flex max-w-3xl justify-center sm:px-5",
          )}
        >
          <div ref={shellRef} className={cn("relative w-full", !expanded && "w-auto")}>
            {/*
              Collapse X sits outside the motion shell so mix-blend-difference
              composites against page content (not trapped by transform/opacity).
              White glyph → white on dark hero, black on light sections.
            */}
            {expanded ? (
              <button
                type="button"
                onClick={() => setExpanded(false)}
                aria-label={chat.collapse}
                className={cn(
                  "absolute end-1 top-0 z-[2] inline-flex h-7 w-7 items-center justify-center rounded-full",
                  "text-white mix-blend-difference",
                  "transition-opacity hover:opacity-70",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                )}
              >
                <X className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
              </button>
            ) : null}
            <AnimatePresence mode="wait" initial={false}>
              {expanded ? (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.97, transition: shellExit }}
                  transition={shellEnter}
                  className={cn(
                    "relative w-full origin-bottom",
                    // Static cyan wash — not animated via filter
                    "before:pointer-events-none before:absolute before:-inset-x-4 before:-bottom-2 before:top-6",
                    "before:-z-10 before:rounded-[2rem] before:bg-[rgba(30,174,219,0.06)] before:blur-2xl before:content-['']",
                  )}
                >
                  <div className="mb-1.5 flex items-center justify-between gap-2 px-1">
                    <span
                      className={`text-[11px] text-paper/40 ${fa ? "font-iran" : "font-mono"}`}
                    >
                      {chat.composerLabel}
                    </span>
                    {/* Hit-area spacer — real close control is the blended sibling above */}
                    <span className="inline-block h-7 w-7 shrink-0" aria-hidden />
                  </div>
                  <PromptInputBox
                    isLoading={busy}
                    autoFocus
                    placeholder={chat.placeholder}
                    className={cn("mb-2", fa ? "font-iran" : "")}
                    onSend={(message) => {
                      const cleaned = message
                        .replace(/^\[(Search|Think|Canvas):\s*/i, "")
                        .replace(/\]$/, "")
                        .replace(/^\[Voice message.*\]$/i, "")
                        .trim();
                      void ask(cleaned || message);
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="mini"
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98, transition: shellExit }}
                  transition={shellEnter}
                  className="mb-2 flex origin-bottom justify-center"
                >
                  <motion.button
                    type="button"
                    onClick={() => setExpanded(true)}
                    aria-label={chat.expandAria}
                    aria-expanded={false}
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.18, ease: softEase }}
                    className={cn(
                      "group inline-flex max-w-[min(92vw,22rem)] items-center gap-2.5 rounded-full border border-[#1F2023]",
                      "bg-[#2E3033]/92 px-3.5 py-2.5 text-sm text-[#9CA3AF]",
                      "shadow-none backdrop-blur-md",
                      "transition-[border-color,background-color,color] duration-200",
                      "hover:border-[#1EAEDB]/40 hover:bg-[#2E3033] hover:text-[#E5E7EB]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1EAEDB]/50",
                      fa ? "font-iran" : "",
                    )}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1EAEDB]/15 text-[#1EAEDB] transition-transform duration-200 group-hover:scale-105">
                      <Sparkles className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    <span className="min-w-0 truncate pe-1 text-start">{chat.miniLabel}</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* Spacer so page content isn’t hidden behind the sticky control */}
      <div className={cn(expanded ? "h-28 sm:h-36" : "h-16 sm:h-[4.25rem]")} aria-hidden />
      {modalUi}
    </>
  );
}
