"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

type WordsPullUpProps = {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  active?: boolean;
  /** Logical end gap between words (RTL-safe). */
  wordGapEm?: number;
};

/**
 * Staggered word reveal — PrismaHero pattern (21st.dev / rahil1202).
 */
export function WordsPullUp({
  text,
  className = "",
  showAsterisk = false,
  active = true,
  wordGapEm = 0.25,
}: WordsPullUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const play = active && inView;
  const words = text.trim().split(/\s+/).filter(Boolean);

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={`${word}-${i}`}
            initial={{ y: "0.55em", opacity: 0 }}
            animate={play ? { y: 0, opacity: 1 } : { y: "0.55em", opacity: 0 }}
            transition={{ duration: 0.65, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            className="relative inline-block"
            style={{ marginInlineEnd: isLast ? 0 : `${wordGapEm}em` }}
          >
            {word}
            {!isLast ? "\u00A0" : null}
            {showAsterisk && isLast ? (
              <span
                aria-hidden
                className="absolute top-[0.55em] text-[0.28em] text-term"
                style={{ insetInlineEnd: "-0.35em" }}
              >
                *
              </span>
            ) : null}
          </motion.span>
        );
      })}
    </div>
  );
}
