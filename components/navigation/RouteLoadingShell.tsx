"use client";

import { motion } from "motion/react";
import { getPreloaderCorner } from "@/lib/siteVersion";
import { formatDigits } from "@/lib/i18n/digits";
import type { Lang } from "@/i18n/dictionaries";

type Props = {
  lang: Lang;
  fa: boolean;
  dir: "ltr" | "rtl";
  routeLine: string;
  steps: string[];
  revealed: number;
  progress: number;
  exiting?: boolean;
  /** Full-screen overlay (route change) vs inline (Suspense fallback). */
  mode?: "overlay" | "inline";
};

const BAR_W = 24;

export default function RouteLoadingShell({
  lang,
  fa,
  dir,
  routeLine,
  steps,
  revealed,
  progress,
  exiting = false,
  mode = "overlay",
}: Props) {
  const pct = Math.min(100, Math.max(0, progress));
  const filled = Math.round((pct / 100) * BAR_W);
  const bar = "█".repeat(filled) + "░".repeat(BAR_W - filled);

  const terminal = (
    <div
      className={`relative w-full max-w-md px-6 font-mono text-[11px] leading-relaxed sm:text-xs ${fa ? "font-fa" : ""}`}
      dir={dir}
    >
      <p className="mb-3 text-paper/35" dir="ltr">
        {getPreloaderCorner(lang)}
      </p>

      <p className="text-term/90">{routeLine}</p>

      <div className="mt-3 space-y-0.5">
        {steps.slice(0, revealed).map((line, i) => (
          <div
            key={i}
            className={
              i === steps.length - 1 && revealed >= steps.length
                ? "text-term"
                : "text-paper/65"
            }
          >
            {line}
          </div>
        ))}
      </div>

      <div className="mt-3 text-paper/45">
        [{bar}] {formatDigits(pct, fa)}%
        <span className="animate-blink ml-1 text-term/70">▮</span>
      </div>
    </div>
  );

  if (mode === "inline") {
    return (
      <main className="flex min-h-[50vh] items-center justify-center px-4 py-16">
        {terminal}
      </main>
    );
  }

  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 z-[110] h-[2px] origin-left bg-term shadow-[0_0_12px_rgb(var(--c-accent)/0.45)]"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={
          exiting
            ? { scaleX: 1, opacity: 0 }
            : { scaleX: Math.max(0.08, pct / 100), opacity: 1 }
        }
        transition={{ duration: exiting ? 0.22 : 0.35, ease: "easeOut" }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: exiting ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="fixed inset-0 z-[109] flex items-center justify-center bg-ink/88 backdrop-blur-[2px]"
        aria-live="polite"
        aria-busy="true"
        role="status"
      >
        <div className="scanlines pointer-events-none absolute inset-0" />
        <motion.div
          animate={{ opacity: exiting ? 0.6 : 1 }}
          transition={{ duration: 0.18 }}
        >
          {terminal}
        </motion.div>
      </motion.div>
    </>
  );
}
