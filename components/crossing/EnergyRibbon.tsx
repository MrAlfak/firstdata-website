"use client";

import { motion } from "motion/react";

type Props = {
  active: boolean;
  /** Which side the ribbon enters from */
  from?: "left" | "bottom";
  reducedMotion?: boolean;
};

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Light-ribbon energy transfer into the Identity Disc.
 * One cyan core + faint light-wall plane + single amber gyro speck.
 */
export function EnergyRibbon({
  active,
  from = "left",
  reducedMotion = false,
}: Props) {
  if (reducedMotion || !active) return null;

  const isBottom = from === "bottom";

  return (
    <motion.div
      className={
        isBottom
          ? "pointer-events-none absolute left-1/2 top-[calc(100%-6px)] h-[clamp(72px,18vh,140px)] w-5 -translate-x-1/2"
          : "pointer-events-none absolute right-[calc(100%-4px)] top-[52%] h-8 w-[clamp(100px,28vw,340px)] -translate-y-1/2 -rotate-[3deg] md:rotate-0"
      }
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      aria-hidden
    >
      {/* Light-wall plane */}
      <motion.div
        className={
          isBottom
            ? "absolute inset-x-0 bottom-0 top-0 origin-bottom bg-gradient-to-t from-[rgb(var(--c-accent)/0.14)] via-[rgb(var(--c-accent)/0.05)] to-transparent"
            : "absolute inset-x-0 top-1/2 h-5 origin-left -translate-y-1/2 bg-gradient-to-b from-[rgb(var(--c-accent)/0.14)] via-[rgb(var(--c-accent)/0.04)] to-transparent"
        }
        initial={{
          clipPath: isBottom ? "inset(100% 0 0 0)" : "inset(0 100% 0 0)",
        }}
        animate={{
          clipPath: isBottom ? "inset(0 0 0 0)" : "inset(0 0% 0 0)",
        }}
        transition={{ duration: 0.78, ease: EASE }}
      />

      {/* Bright core */}
      <motion.div
        className={
          isBottom
            ? "absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-t from-[rgb(var(--c-accent))] via-[rgb(var(--c-accent)/0.7)] to-transparent shadow-[0_0_12px_rgb(var(--c-accent)/0.45)]"
            : "absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[rgb(var(--c-accent)/0.55)] to-[rgb(var(--c-fg)/0.95)] shadow-[0_0_14px_rgb(var(--c-accent)/0.4)]"
        }
        initial={{
          clipPath: isBottom ? "inset(100% 0 0 0)" : "inset(0 100% 0 0)",
        }}
        animate={{
          clipPath: isBottom ? "inset(0 0 0 0)" : "inset(0 0% 0 0)",
        }}
        transition={{ duration: 0.78, ease: EASE }}
      />

      {/* Amber gyro speck */}
      <motion.span
        className="absolute size-[4px] rounded-full bg-[rgb(var(--c-amber))] shadow-[0_0_10px_rgb(var(--c-amber)/0.55)]"
        initial={
          isBottom
            ? { top: "100%", left: "50%", x: "-50%", opacity: 0, scale: 0.5 }
            : { left: "0%", top: "50%", y: "-50%", opacity: 0, scale: 0.5 }
        }
        animate={
          isBottom
            ? {
                top: ["100%", "0%"],
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1.15, 1, 0.4],
              }
            : {
                left: ["0%", "100%"],
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1.15, 1, 0.4],
              }
        }
        transition={{ duration: 0.78, times: [0, 0.12, 0.82, 1], ease: EASE }}
      />
    </motion.div>
  );
}
