"use client";

import { motion } from "motion/react";
import { FILL_PATHS, TRACE_PATH } from "@/lib/brand/mark-paths";
import { EnergyRibbon } from "./EnergyRibbon";

export type DiscVisualPhase =
  | "enter"
  | "charge"
  | "assemble"
  | "lock"
  | "collapse"
  | "static";

type Props = {
  phase: DiscVisualPhase;
  reducedMotion?: boolean;
  className?: string;
  showRibbon?: boolean;
  ribbonFrom?: "left" | "bottom";
};

const EASE_CHARGE = [0.16, 1, 0.3, 1] as const;
const EASE_LOCK = [0.22, 0.75, 0.12, 1] as const;
const EASE_COLLAPSE = [0.76, 0, 0.24, 1] as const;

/** Asymmetric calibration notches around the rim (degrees). */
const NOTCHES = [12, 47, 98, 141, 203, 268, 311, 334] as const;

function notchXY(deg: number, r: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: 128 + r * Math.cos(rad), y: 128 + r * Math.sin(rad) };
}

/**
 * Cinematic Identity Disc — machined rim, notches, energy ring, FD monogram.
 */
export function IdentityDisc({
  phase,
  reducedMotion = false,
  className,
  showRibbon = false,
  ribbonFrom = "left",
}: Props) {
  const charging = phase === "charge" || phase === "assemble";
  const locked = phase === "lock" || phase === "static";
  const collapsing = phase === "collapse";
  const entering = phase === "enter";
  const assembling = phase === "assemble";

  const ghostOpacity =
    reducedMotion || locked || collapsing
      ? 0
      : entering
        ? 0.12
        : charging
          ? assembling
            ? 0.06
            : 0.18
          : 0.08;

  const outlineProgress =
    reducedMotion || locked || collapsing
      ? 1
      : assembling
        ? 1
        : charging
          ? 0.78
          : 0;

  const fillOpacity =
    reducedMotion || locked || collapsing ? 1 : assembling ? 0.42 : 0;

  const rimDrawn =
    reducedMotion || locked || collapsing
      ? 1
      : charging
        ? 1
        : entering
          ? 0.12
          : 0.08;

  return (
    <motion.div
      className={
        className ??
        "relative size-[clamp(200px,32vw,380px)] will-change-transform"
      }
      initial={false}
      animate={{
        opacity: entering ? 0.35 : collapsing ? 0 : 1,
        scale: entering ? 0.38 : collapsing ? 0.18 : 1,
        rotate: reducedMotion
          ? 0
          : entering
            ? -14
            : charging
              ? assembling
                ? 4
                : 11
              : locked
                ? 0
                : collapsing
                  ? 6
                  : 0,
      }}
      transition={{
        duration: collapsing ? 0.36 : charging ? 0.9 : 0.48,
        ease: collapsing ? EASE_COLLAPSE : EASE_CHARGE,
      }}
      aria-hidden="true"
    >
      {/* Soft outer bloom disc */}
      <motion.div
        className="pointer-events-none absolute inset-[-12%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--c-accent) / 0.14), transparent 62%)",
        }}
        animate={{
          opacity: collapsing ? 0 : locked ? 0.85 : charging ? 1 : 0.35,
          scale: locked && !reducedMotion ? [1, 1.06, 1] : 1,
        }}
        transition={{
          opacity: { duration: 0.4 },
          scale: { duration: 0.45, times: [0, 0.4, 1], ease: EASE_LOCK },
        }}
      />

      <svg
        viewBox="0 0 256 256"
        className="relative z-[1] size-full overflow-visible text-term"
        fill="none"
        focusable="false"
      >
        <defs>
          <filter id="fd-disc-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="fd-rim-grad" x1="40" y1="20" x2="220" y2="240">
            <stop offset="0%" stopColor="rgb(var(--c-fg))" stopOpacity="0.95" />
            <stop offset="45%" stopColor="rgb(var(--c-accent))" stopOpacity="1" />
            <stop offset="100%" stopColor="rgb(var(--c-accent))" stopOpacity="0.55" />
          </linearGradient>
          <radialGradient id="fd-disc-glass" cx="42%" cy="36%" r="58%">
            <stop offset="0%" stopColor="rgb(var(--c-fg))" stopOpacity="0.09" />
            <stop offset="55%" stopColor="rgb(var(--c-accent))" stopOpacity="0.03" />
            <stop offset="100%" stopColor="rgb(var(--c-accent))" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Glass face */}
        <circle cx="128" cy="128" r="108" fill="url(#fd-disc-glass)" />

        {/* Inner track rings */}
        <circle
          cx="128"
          cy="128"
          r="102"
          stroke="currentColor"
          strokeOpacity="0.14"
          strokeWidth="0.8"
        />
        <circle
          cx="128"
          cy="128"
          r="94"
          stroke="currentColor"
          strokeOpacity="0.08"
          strokeWidth="0.6"
          strokeDasharray="2 6"
        />

        {/* Primary machined rim — draws on */}
        <motion.circle
          cx="128"
          cy="128"
          r="114"
          pathLength={1}
          stroke="url(#fd-rim-grad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          filter="url(#fd-disc-glow)"
          initial={false}
          animate={{
            pathLength: rimDrawn,
            opacity: collapsing ? 0 : entering ? 0.35 : 1,
            strokeDasharray: locked ? "1 0" : "0.55 0.04 0.22 0.08 0.11",
          }}
          transition={{ duration: reducedMotion ? 0 : 0.95, ease: EASE_CHARGE }}
        />

        {/* Secondary rim */}
        <motion.circle
          cx="128"
          cy="128"
          r="108"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeOpacity="0.28"
          initial={false}
          animate={{
            opacity: collapsing ? 0 : locked ? 0.45 : 0.22,
            scale: locked ? 1.01 : 1,
          }}
          style={{ transformOrigin: "128px 128px" }}
          transition={{ duration: 0.25, ease: EASE_LOCK }}
        />

        {/* Calibration notches */}
        <g stroke="currentColor" strokeLinecap="round">
          {NOTCHES.map((deg, i) => {
            const outer = notchXY(deg, 114);
            const inner = notchXY(deg, i % 2 === 0 ? 106 : 108);
            return (
              <motion.line
                key={deg}
                x1={outer.x}
                y1={outer.y}
                x2={inner.x}
                y2={inner.y}
                strokeWidth={i % 3 === 0 ? 1.6 : 1}
                initial={false}
                animate={{
                  opacity: collapsing
                    ? 0
                    : reducedMotion || locked || charging
                      ? i % 3 === 0
                        ? 0.7
                        : 0.4
                      : 0.12,
                }}
                transition={{
                  duration: 0.35,
                  delay: reducedMotion || !charging ? 0 : 0.08 * i,
                }}
              />
            );
          })}
        </g>

        {/* Orbiting energy dash during charge */}
        {charging && !reducedMotion ? (
          <motion.circle
            cx="128"
            cy="128"
            r="100"
            stroke="url(#fd-rim-grad)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="28 220"
            filter="url(#fd-disc-glow)"
            animate={{ rotate: 360 }}
            transition={{ duration: 2.4, ease: "linear", repeat: Infinity }}
            style={{ transformOrigin: "128px 128px" }}
          />
        ) : null}

        {/* Inner incomplete arcs while charging */}
        {charging && !reducedMotion ? (
          <g stroke="currentColor" fill="none">
            <motion.circle
              cx="128"
              cy="128"
              r="88"
              strokeWidth="1"
              strokeOpacity="0.35"
              strokeDasharray="55 200"
              animate={{ strokeDashoffset: [0, -255] }}
              transition={{ duration: 3.2, ease: "linear", repeat: Infinity }}
            />
            <motion.circle
              cx="128"
              cy="128"
              r="78"
              strokeWidth="0.8"
              strokeOpacity="0.2"
              strokeDasharray="32 210"
              animate={{ strokeDashoffset: [40, 295] }}
              transition={{ duration: 4.1, ease: "linear", repeat: Infinity }}
            />
          </g>
        ) : null}

        {/* Lock flash ring */}
        {locked && !reducedMotion ? (
          <motion.circle
            cx="128"
            cy="128"
            r="114"
            stroke="rgb(var(--c-fg))"
            strokeWidth="1.5"
            initial={{ opacity: 0.7, scale: 1 }}
            animate={{ opacity: 0, scale: 1.18 }}
            transition={{ duration: 0.55, ease: EASE_LOCK }}
            style={{ transformOrigin: "128px 128px" }}
            filter="url(#fd-disc-glow)"
          />
        ) : null}

        {/* Mark — scaled from 64×64 */}
        <g transform="translate(64 64) scale(2)">
          <g opacity={ghostOpacity} fill="currentColor" fillRule="evenodd">
            {FILL_PATHS.map((d) => (
              <path key={`g-${d}`} d={d} transform="translate(-2.2 0)" />
            ))}
            {FILL_PATHS.map((d) => (
              <path
                key={`g2-${d}`}
                d={d}
                transform="translate(2.2 0)"
                opacity={0.5}
              />
            ))}
          </g>

          {(charging || entering) && !locked ? (
            <path
              d={TRACE_PATH}
              stroke="currentColor"
              strokeOpacity="0.22"
              strokeWidth="1.1"
              fill="none"
            />
          ) : null}

          <g
            stroke="url(#fd-rim-grad)"
            strokeWidth="1.6"
            fill="none"
            strokeLinejoin="round"
            filter="url(#fd-disc-glow)"
          >
            {FILL_PATHS.map((d, i) => (
              <motion.path
                key={`o-${d}`}
                d={d}
                pathLength={1}
                initial={false}
                animate={{
                  pathLength: outlineProgress,
                  opacity: entering ? 0.25 : 1,
                }}
                transition={{
                  duration: reducedMotion ? 0 : 0.62,
                  delay: reducedMotion || !charging ? 0 : 0.15 + i * 0.08,
                  ease: EASE_CHARGE,
                }}
              />
            ))}
          </g>

          <motion.g
            fill="currentColor"
            fillRule="evenodd"
            initial={false}
            animate={{
              opacity: fillOpacity,
              scale: locked && !reducedMotion ? [0.96, 1.04, 1] : 1,
            }}
            transition={{
              opacity: { duration: reducedMotion ? 0 : 0.22, ease: EASE_LOCK },
              scale: {
                duration: reducedMotion ? 0 : 0.32,
                times: [0, 0.4, 1],
                ease: EASE_LOCK,
              },
            }}
            style={{ transformOrigin: "32px 32px" }}
            filter={locked ? "url(#fd-disc-glow)" : undefined}
          >
            {FILL_PATHS.map((d) => (
              <path key={`f-${d}`} d={d} />
            ))}
          </motion.g>
        </g>
      </svg>

      {showRibbon && charging ? (
        <EnergyRibbon
          active
          from={ribbonFrom}
          reducedMotion={reducedMotion}
        />
      ) : null}
    </motion.div>
  );
}
