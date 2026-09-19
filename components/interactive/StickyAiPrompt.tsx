"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles, X } from "lucide-react";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import AssistantReplyModal, {
  type AssistantTurn,
} from "@/components/interactive/AssistantReplyModal";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import { useT } from "@/i18n/LangProvider";
import { cn } from "@/lib/utils";

/** GPU-friendly ease-out — transform + opacity only (no blur / layoutId). */
const softEase = [0.22, 1, 0.36, 1] as const;
const shellEnter = { duration: 0.3, ease: softEase } as const;
const shellExit = { duration: 0.24, ease: softEase } as const;

function shouldHideSticky(pathname: string): boolean {
  if (pathname.startsWith("/panel")) return true;
  if (pathname.startsWith("/admin")) return true;
  if (pathname.startsWith("/auth")) return true;
  if (pathname.startsWith("/maintenance")) return true;
  if (pathname.startsWith("/offline")) return true;
  if (pathname.startsWith("/cta-01")) return true;
  return false;
}

function cleanPrompt(message: string): string {
  return message
    .replace(/^\[(Search|Think|Canvas):\s*/i, "")
    .replace(/\]$/, "")
    .replace(/^\[Voice message.*\]$/i, "")
    .trim();
}

function nextTurnId() {
  return `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
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
  const busyRef = useRef(false);
  const turnsRef = useRef<AssistantTurn[]>([]);

  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<AssistantTurn[]>([]);
  const [composerEpoch, setComposerEpoch] = useState(0);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    turnsRef.current = turns;
  }, [turns]);
  useFocusTrap(open, panelRef);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !busy) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, busy]);

  // Collapse on Escape / click-outside. Attach after this open-click so the
  // same pointer-up cannot immediately close the composer.
  useEffect(() => {
    if (!expanded || open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType === "touch" && e.type !== "pointerdown") return;
      const target = e.target as Node | null;
      if (shellRef.current && target && !shellRef.current.contains(target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("keydown", onKey, true);
    const listenId = window.setTimeout(() => {
      document.addEventListener("pointerdown", onPointer, true);
    }, 0);
    return () => {
      window.clearTimeout(listenId);
      document.removeEventListener("keydown", onKey, true);
      document.removeEventListener("pointerdown", onPointer, true);
    };
  }, [expanded, open]);

  // Route change → collapse
  useEffect(() => {
    setExpanded(false);
  }, [pathname]);

  const abortInFlight = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    busyRef.current = false;
    setBusy(false);
    setTurns((prev) => prev.filter((t) => !t.loading));
  }, []);

  const closeModal = useCallback(() => {
    abortInFlight();
    setOpen(false);
  }, [abortInFlight]);

  const newChat = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    busyRef.current = false;
    setBusy(false);
    setTurns([]);
    turnsRef.current = [];
    setComposerEpoch((n) => n + 1);
    setOpen(true);
  }, []);

  const ask = useCallback(
    async (raw: string) => {
      const query = raw.trim().slice(0, 500);
      if (!query || busyRef.current) return;

      busyRef.current = true;
      setBusy(true);
      setExpanded(false);
      setOpen(true);

      const id = nextTurnId();
      const history = turnsRef.current
        .filter((t) => !t.loading && (t.lines.length > 0 || t.error))
        .flatMap((t) => [
          { role: "user" as const, content: t.question },
          {
            role: "assistant" as const,
            content: t.error || t.lines.join("\n"),
          },
        ])
        .slice(-8);

      const nextTurn: AssistantTurn = {
        id,
        question: query,
        lines: [],
        loading: true,
        error: null,
      };
      setTurns((prev) => {
        const next = [...prev, nextTurn];
        turnsRef.current = next;
        return next;
      });

      const ctrl = new AbortController();
      abortRef.current = ctrl;

      try {
        const res = await fetch("/api/assistant/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, lang, history }),
          signal: ctrl.signal,
        });
        const data = (await res.json()) as {
          success?: boolean;
          lines?: string[];
          message?: string;
        };
        const lines = Array.isArray(data.lines) ? data.lines.filter(Boolean) : [];

        const patch = (partial: Partial<AssistantTurn>) => {
          setTurns((prev) => {
            const next = prev.map((t) => (t.id === id ? { ...t, ...partial } : t));
            turnsRef.current = next;
            return next;
          });
        };

        if (!res.ok || !data.success || lines.length === 0) {
          patch({
            lines: [],
            loading: false,
            error: data.message || chat.errorGeneric,
          });
          return;
        }

        patch({ lines, loading: false, error: null });
      } catch (e) {
        if ((e as Error)?.name === "AbortError") {
          setTurns((prev) => {
            const next = prev.filter((t) => t.id !== id);
            turnsRef.current = next;
            return next;
          });
          return;
        }
        setTurns((prev) => {
          const next = prev.map((t) =>
            t.id === id
              ? { ...t, lines: [], loading: false, error: chat.errorGeneric }
              : t,
          );
          turnsRef.current = next;
          return next;
        });
      } finally {
        abortRef.current = null;
        busyRef.current = false;
        setBusy(false);
      }
    },
    [lang, chat.errorGeneric],
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

  const modalUi = createPortal(
    <AnimatePresence>
      {open ? (
        <AssistantReplyModal
          key="assistant-reply"
          turns={turns}
          busy={busy}
          dir={dir}
          fa={fa}
          titleId={titleId}
          panelRef={panelRef}
          composerKey={`modal-${composerEpoch}`}
          suggestions={chat.suggestions ?? []}
          copy={{
            eyebrow: chat.eyebrow,
            assistantName: chat.assistantName,
            online: chat.online,
            thinking: chat.thinking,
            placeholder: chat.placeholder,
            close: chat.close,
            newChat: chat.newChat,
            disclaimer: chat.disclaimer,
            welcomeLines: chat.welcomeLines ?? [],
          }}
          onClose={closeModal}
          onNewChat={newChat}
          onSend={(message) => {
            void ask(cleanPrompt(message) || message);
          }}
        />
      ) : null}
    </AnimatePresence>,
    document.body,
  );

  return (
    <>
      <div
        id="assistant"
        className={cn(
          "fixed bottom-0 left-1/2 z-[90] -translate-x-1/2",
          "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
          expanded
            ? "w-[min(100%-1.5rem,48rem)] pointer-events-auto"
            : "w-max max-w-[min(92vw,22rem)] pointer-events-auto",
          open && "pointer-events-none",
        )}
      >
        <div
          className={cn(
            "mx-auto w-full",
            expanded && "pl-[max(0.75rem,13.75rem)] pr-3 sm:pr-5 lg:pr-6",
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
                      void ask(cleanPrompt(message) || message);
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
                    onPointerDown={(event) => {
                      if (event.button !== 0) return;
                      event.stopPropagation();
                      setExpanded(true);
                    }}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      setExpanded(true);
                    }}
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
