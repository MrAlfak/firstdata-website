"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { MessageSquarePlus, Sparkles, X } from "lucide-react";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import AssistantMessageLines from "@/components/interactive/AssistantMessageLines";
import { cn } from "@/lib/utils";

export type AssistantTurn = {
  id: string;
  question: string;
  lines: string[];
  loading: boolean;
  error: string | null;
};

type Copy = {
  eyebrow: string;
  assistantName: string;
  online: string;
  thinking: string;
  placeholder: string;
  close: string;
  newChat: string;
  disclaimer: string;
  welcomeLines: string[];
};

type Props = {
  turns: AssistantTurn[];
  busy: boolean;
  dir: "rtl" | "ltr";
  fa: boolean;
  titleId: string;
  copy: Copy;
  suggestions: string[];
  composerKey: string;
  panelRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onNewChat: () => void;
  onSend: (message: string) => void;
};

const ease = [0.22, 1, 0.36, 1] as const;

function ThinkingPulse({ label }: { label: string }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2.5 text-[#9CA3AF]">
        <span className="inline-flex items-center gap-1" aria-hidden>
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#1EAEDB] [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#1EAEDB] [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#1EAEDB]" />
        </span>
        <span className="text-sm">{label}</span>
      </div>
      <div className="space-y-2">
        <span className="block h-2 w-[88%] overflow-hidden rounded-full bg-white/8">
          <motion.span
            className="block h-full w-1/2 rounded-full bg-gradient-to-r from-transparent via-[#1EAEDB]/45 to-transparent"
            animate={{ x: ["-80%", "180%"] }}
            transition={{ duration: 1.35, repeat: Infinity, ease: "linear" }}
          />
        </span>
        <span className="block h-2 w-[64%] overflow-hidden rounded-full bg-white/8">
          <motion.span
            className="block h-full w-1/2 rounded-full bg-gradient-to-r from-transparent via-white/25 to-transparent"
            animate={{ x: ["-80%", "180%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.12 }}
          />
        </span>
      </div>
    </div>
  );
}

export default function AssistantReplyModal({
  turns,
  busy,
  dir,
  fa,
  titleId,
  copy,
  suggestions,
  composerKey,
  panelRef,
  onClose,
  onNewChat,
  onSend,
}: Props) {
  const endRef = useRef<HTMLDivElement>(null);
  const last = turns[turns.length - 1];
  const showHints =
    !busy && (!last || (!last.loading && !last.error)) && suggestions.length > 0;
  const hintList =
    last?.question
      ? suggestions.filter((s) => s !== last.question).slice(0, 3)
      : suggestions.slice(0, 3);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [turns]);

  return (
    <motion.div
      className="fixed inset-0 z-[130] flex items-end justify-center p-3 sm:items-center sm:p-6"
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={() => {
        if (!busy) onClose();
      }}
    >
      <div className="absolute inset-0 bg-[#050607]/78 backdrop-blur-2xl" aria-hidden />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -start-[20%] top-[8%] h-[42%] w-[55%] rounded-full bg-[#1EAEDB]/18 blur-[110px]"
        animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -end-[12%] bottom-[6%] h-[48%] w-[50%] rounded-full bg-[#1EAEDB]/12 blur-[120px]"
        animate={{ opacity: [0.25, 0.55, 0.25], scale: [1.05, 1, 1.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        dir={dir}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 36, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.4, ease }}
        className={cn(
          "relative z-10 flex w-full max-w-[42rem] flex-col",
          "max-h-[min(90vh,840px)] p-px",
          "rounded-[28px] bg-gradient-to-b from-[#1EAEDB]/55 via-white/12 to-white/5",
          "shadow-[0_40px_140px_rgba(0,0,0,0.72),0_0_90px_rgba(30,174,219,0.16)]",
          "font-iran",
        )}
      >
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[27px] bg-[#101214]/96">
          <div
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#1EAEDB]/80 to-transparent"
            aria-hidden
          />

          <header className="flex items-center gap-3 border-b border-white/8 bg-white/[0.03] px-4 py-3.5 sm:px-5">
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1EAEDB]/15 text-[#1EAEDB] ring-1 ring-[#1EAEDB]/30">
              <Sparkles className="h-5 w-5" aria-hidden />
              <span className="absolute -bottom-0.5 -end-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#101214]" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] tracking-[0.16em] text-[#6B7280] uppercase">
                {copy.eyebrow}
              </p>
              <h2 id={titleId} className="truncate text-[15px] font-semibold text-[#F3F4F6]">
                {copy.assistantName}
              </h2>
            </div>
            <span className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-[#9CA3AF] sm:inline-flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              {copy.online}
            </span>
            <button
              type="button"
              onClick={onNewChat}
              aria-label={copy.newChat}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1.5 text-[11px] text-[#9CA3AF] transition-colors hover:border-white/20 hover:bg-white/5 hover:text-[#E5E7EB]"
            >
              <MessageSquarePlus className="h-3.5 w-3.5" aria-hidden />
              <span className="hidden sm:inline">{copy.newChat}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label={copy.close}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#9CA3AF] transition-colors hover:bg-white/8 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-5 sm:px-5">
            {turns.length === 0 ? (
              <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 px-2 py-6 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1EAEDB]/12 text-[#1EAEDB] ring-1 ring-[#1EAEDB]/25">
                  <Sparkles className="h-6 w-6" aria-hidden />
                </span>
                <div className="max-w-md space-y-2 text-sm leading-relaxed text-[#C4C9D1]">
                  {copy.welcomeLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            ) : (
              turns.map((turn) => (
                <motion.div
                  key={turn.id}
                  className="space-y-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, ease }}
                >
                  <div className="flex justify-end" dir="ltr">
                    <div
                      dir={dir}
                      className="max-w-[88%] rounded-2xl rounded-br-md bg-white px-4 py-2.5 text-sm leading-relaxed text-black shadow-[0_10px_28px_rgba(30,174,219,0.18)]"
                    >
                      {turn.question}
                    </div>
                  </div>
                  <div className="flex justify-start gap-3" dir="ltr">
                    <div className="mt-1 hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1EAEDB]/12 text-[#1EAEDB] ring-1 ring-[#1EAEDB]/20 sm:flex">
                      <Sparkles className="h-3.5 w-3.5" aria-hidden />
                    </div>
                    <div
                      dir={dir}
                      className="max-w-[92%] rounded-2xl rounded-bl-md border border-white/8 bg-white/[0.045] px-4 py-3 text-sm leading-relaxed text-[#E5E7EB] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                    >
                      {turn.loading ? (
                        <ThinkingPulse label={copy.thinking} />
                      ) : turn.error ? (
                        <p className="text-[#F87171]">{turn.error}</p>
                      ) : (
                        <div className="space-y-2.5">
                          <AssistantMessageLines lines={turn.lines} />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}

            {showHints && hintList.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {hintList.map((hint) => (
                  <button
                    key={hint}
                    type="button"
                    disabled={busy}
                    onClick={() => onSend(hint)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] text-[#C4C9D1] transition-colors hover:border-[#1EAEDB]/40 hover:bg-[#1EAEDB]/10 hover:text-white"
                  >
                    {hint}
                  </button>
                ))}
              </div>
            ) : null}
            <div ref={endRef} />
          </div>

          <div className="border-t border-white/8 bg-black/25 px-3 pb-3 pt-3 sm:px-4">
            <PromptInputBox
              key={composerKey}
              isLoading={busy}
              autoFocus
              placeholder={copy.placeholder}
              className={cn("mb-2", fa ? "font-iran" : "")}
              onSend={(message) => {
                const cleaned = message
                  .replace(/^\[(Search|Think|Canvas):\s*/i, "")
                  .replace(/\]$/, "")
                  .replace(/^\[Voice message.*\]$/i, "")
                  .trim();
                onSend(cleaned || message);
              }}
            />
            <p className="px-1 text-[10px] leading-relaxed text-[#6B7280]">{copy.disclaimer}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
