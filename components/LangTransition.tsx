"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

/**
 * Full-screen terminal overlay that plays a fake "set-locale" sequence whenever
 * the language is switched. Mounted by LangProvider, keyed per switch so it
 * replays its timeline each time. Pure eye-candy — the real swap happens behind it.
 */

const BAR_W = 24;

export default function LangTransition({ fa }: { fa: boolean }) {
  const to = fa ? "fa_IR" : "en_US";
  const from = fa ? "en_US" : "fa_IR";
  const dirLabel = fa ? "rtl" : "ltr";

  const lines = [
    `root@fd:~$ setlocale ${to}`,
    `▸ flushing ${from} strings …`,
    `▸ fetching ${to} dictionary …`,
    `▸ applying ${dirLabel} layout …`,
    `✓ locale switched → ${to}`,
  ];

  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setRevealed(i);
      if (i >= lines.length) clearInterval(id);
    }, 130);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pct = Math.round((revealed / lines.length) * 100);
  const filled = Math.round((revealed / lines.length) * BAR_W);
  const bar = "█".repeat(filled) + "░".repeat(BAR_W - filled);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-ink"
      aria-hidden="true"
    >
      {/* CRT scanlines */}
      <div className="scanlines pointer-events-none absolute inset-0" />

      {/* slight CRT flicker */}
      <motion.div
        animate={{ opacity: [1, 0.86, 1, 0.94, 1] }}
        transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.7, 1] }}
        className="relative w-full max-w-sm px-6 font-mono text-[11px] leading-relaxed sm:text-xs"
        dir="ltr"
      >
        {lines.slice(0, revealed).map((l, i) => (
          <div
            key={i}
            className={i === lines.length - 1 ? "text-term" : "text-paper/70"}
          >
            {l}
          </div>
        ))}

        <div className="mt-3 text-paper/45">
          [{bar}] {pct}%
          <span className="animate-blink ml-1 text-term/70">▮</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
