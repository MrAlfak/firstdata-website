"use client";

import { motion } from "motion/react";

type Props = {
  /** denser bloom during charge/lock */
  intensity?: "low" | "mid" | "high";
  reducedMotion?: boolean;
};

/**
 * Wet-black Grid void — perspective floor, vignette, faint scan, energy bloom.
 * Decorative only.
 */
export function CrossingAtmosphere({
  intensity = "mid",
  reducedMotion = false,
}: Props) {
  const bloom =
    intensity === "high" ? 0.16 : intensity === "mid" ? 0.1 : 0.055;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Deep ink base */}
      <div className="absolute inset-0 bg-[rgb(var(--c-bg))]" />

      {/* Wet specular wash */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 45% at 50% 38%, rgb(var(--c-accent) / ${bloom}), transparent 55%),
            radial-gradient(ellipse 90% 55% at 50% 110%, rgb(0 0 0 / 0.85), transparent 50%),
            radial-gradient(ellipse 40% 30% at 18% 22%, rgb(var(--c-accent) / 0.04), transparent 60%),
            radial-gradient(ellipse 35% 28% at 82% 18%, rgb(var(--c-accent) / 0.035), transparent 55%)
          `,
        }}
      />

      {/* Perspective grid floor */}
      <motion.div
        className="fd-crossing-grid"
        initial={false}
        animate={{ opacity: reducedMotion ? 0.35 : intensity === "high" ? 0.95 : 0.75 }}
        transition={{ duration: 0.5 }}
      />

      {/* Horizon hairline */}
      <div
        className="absolute left-1/2 top-[62%] h-px w-[min(92vw,920px)] -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgb(var(--c-accent) / 0.22), transparent)",
        }}
      />

      {/* Soft scanlines (static — not animated) */}
      <div className="fd-crossing-scan absolute inset-0 opacity-[0.04]" />

      {/* Corner calibration marks */}
      <div className="absolute left-6 top-8 size-5 border-l border-t border-[rgb(var(--c-accent)/0.35)] sm:left-10 sm:top-10" />
      <div className="absolute right-6 top-8 size-5 border-r border-t border-[rgb(var(--c-accent)/0.35)] sm:right-10 sm:top-10" />
      <div className="absolute bottom-10 left-6 size-5 border-b border-l border-[rgb(var(--c-accent)/0.28)] sm:bottom-12 sm:left-10" />
      <div className="absolute bottom-10 right-6 size-5 border-b border-r border-[rgb(var(--c-accent)/0.28)] sm:bottom-12 sm:right-10" />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 45%, transparent 40%, rgb(0 0 0 / 0.55) 100%)",
        }}
      />
    </div>
  );
}
