"use client";

import { useState, useEffect, useRef } from "react";
import { scheduleUpdate } from "@/lib/react/schedule-update";
import { motion } from "motion/react";
import { useTypewriter } from "@/motion/useTypewriter";
import { localizedDictionaries } from "@/i18n/localized";
import { formatDigits } from "@/lib/i18n/digits";
import { getPreloaderCorner } from "@/lib/siteVersion";

type Tone = "ok" | "error" | "accent" | "wait" | "success";

const toneClass: Record<Tone, string> = {
  ok: "text-paper/50", error: "text-red-500", accent: "text-paper", wait: "text-paper/30", success: "text-term", };

export default function Preloader() {
  // Read after mount so SSR and first client render match, avoids hydration mismatch
  const [fa, setFa] = useState(false);
  useEffect(() => {
    scheduleUpdate(() => setFa(localStorage.getItem("fd-lang") === "fa"));
  }, []);

  const [wordmarkStarted, setWordmarkStarted] = useState(false);
  const [linesShown, setLinesShown] = useState(0);
  const [showProgress] = useState(true);
  const [percent, setPercent] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);
  const rafRef = useRef(0);

  const d = fa ? localizedDictionaries.fa.preloader : localizedDictionaries.en.preloader;
  const lines = d.lines;

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.documentElement.setAttribute("data-preloader", "active");

    if (reduced) {
      document.documentElement.removeAttribute("data-preloader");
      scheduleUpdate(() => setDone(true));
      return;
    }

    const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setWordmarkStarted(true), 200));

    let clock = 0;
    lines.forEach((line, i) => {
      clock += line.gap;
      t.push(setTimeout(() => setLinesShown(i + 1), clock));
    });

    const exitAt = clock + 1350;
    const fillDur = clock + 1100;
    const steps = 20;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / fillDur);
      const step = Math.floor(p * steps);
      setPercent(step * 5);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else setPercent(100);
    };
    rafRef.current = requestAnimationFrame(tick);

    t.push(setTimeout(() => setExiting(true), exitAt));

    return () => {
      t.forEach(clearTimeout);
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const wordmark = useTypewriter(
    fa ? `> ${localizedDictionaries.fa.preloader.welcome}` : localizedDictionaries.en.preloader.welcome, { start: wordmarkStarted, speed: 50 }
  );

  if (done) return null;

  const printing = linesShown > 0 && linesShown < lines.length;

  return (
    <motion.div
      dir={fa ? "rtl" : "ltr"}
      className="fixed inset-0 z-[9999] flex flex-col justify-center bg-ink px-8 sm:px-16"
      animate={exiting ? { x: "100%" } : { x: 0 }}
      initial={{ x: 0 }}
      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      onAnimationComplete={() => {
        if (exiting) {
          document.documentElement.removeAttribute("data-preloader");
          setDone(true);
        }
      }}
    >
      {/* Corner label */}
      <p className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-widest text-paper/25">
        {getPreloaderCorner(fa ? "fa" : "en")}
      </p>

      {/* Wordmark */}
      <div className="mb-10 min-h-[4rem] sm:min-h-[6rem]">
        <p
          dir={fa ? "rtl" : "ltr"}
          className={`text-5xl leading-none tracking-tight sm:text-7xl md:text-8xl ${fa ? "font-fa" : "font-pixel"}`}
          aria-label={fa ? localizedDictionaries.fa.hero.brand : "FIRST DATA"}
        >
          {wordmark}
          {wordmarkStarted && linesShown === 0 && (
            <span className="animate-blink ml-1">▮</span>
          )}
        </p>
      </div>

      {/* Boot lines */}
      <div
        dir={fa ? "rtl" : "ltr"}
        className={`mb-6 max-h-[55vh] overflow-hidden text-[10px] leading-snug sm:text-xs ${fa ? "font-fa text-right" : "ascii text-left"}`}
      >
        {lines.slice(0, linesShown).map((l, i) => (
          <div key={i} className={toneClass[l.tone]}>
            {l.text}
            {printing && i === linesShown - 1 && (
              <span className="animate-blink"> ▮</span>
            )}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      {showProgress && (
        <div className="absolute bottom-16 left-1/2 w-4/5 -translate-x-1/2 font-mono">
          <div className="mb-1.5 flex items-center justify-between text-[10px] uppercase tracking-widest text-term/70">
            <span className={fa ? "font-fa" : ""}>{d.deploying}</span>
            <span>{formatDigits(percent, fa)}%</span>
          </div>
          <div className="h-4 w-full border border-term/20 bg-term/5">
            <div
              className="h-full bg-term/30"
              style={{ width: `${percent}%`, transition: "width 0.4s linear" }}
            />
          </div>
        </div>
      )}

      {/* Bottom edge label */}
      <p className="absolute bottom-5 right-5 font-mono text-[10px] text-paper/20">
        {d.bottom}
      </p>
    </motion.div>
  );
}
