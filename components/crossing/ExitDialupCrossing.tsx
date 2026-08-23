"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { createPortal } from "react-dom";
import {
  brandAnchorCenter,
  filamentPath,
  measureFabCenter,
  wipeRadiusFrom,
} from "@/lib/crossing/geometry";
import {
  clearCrossingLock,
  setCrossingLock,
  setLastCrossingDirection,
} from "@/lib/crossing/session";
import { releaseCrossing, tryAcquireCrossing } from "@/lib/crossing/mutex";
import type { CrossingLocale, Point } from "@/lib/crossing/types";

type Props = {
  active: boolean;
  locale: CrossingLocale;
  status: string;
  origin: Point | null;
  onCommit: () => void;
  onDone: () => void;
  onError?: () => void;
};

type Phase =
  | "idle"
  | "coherence"
  | "unspool"
  | "retract"
  | "reveal"
  | "done";

/**
 * Modern → dialup (~1400ms). Cinematic de-rez + filament into FAB, then wipe.
 */
export function ExitDialupCrossing({
  active,
  locale,
  status,
  origin,
  onCommit,
  onDone,
  onError,
}: Props) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [mounted, setMounted] = useState(false);
  const [from, setFrom] = useState<Point>({ x: 0, y: 0 });
  const [to, setTo] = useState<Point>({ x: 0, y: 0 });
  const [pathLen, setPathLen] = useState(1);
  const doneRef = useRef(false);
  const committedRef = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(() => setMounted(true), []);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    clearTimers();
    document.documentElement.classList.remove("fd-crossing-derez");
    delete document.documentElement.dataset.skinWipe;
    clearCrossingLock();
    setLastCrossingDirection("exit-dialup");
    releaseCrossing();
    setPhase("done");
    onDone();
  };

  const runViewTransitionWipe = (fab: Point) => {
    const root = document.documentElement;
    const r = wipeRadiusFrom(fab);
    root.style.setProperty("--fd-skin-x", `${fab.x}px`);
    root.style.setProperty("--fd-skin-y", `${fab.y}px`);
    root.style.setProperty("--fd-skin-r", `${r}px`);
    root.dataset.skinWipe = "1";

    const run = () => {
      if (!committedRef.current) {
        committedRef.current = true;
        onCommit();
      }
    };

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> };
    };

    if (typeof doc.startViewTransition === "function") {
      const vt = doc.startViewTransition(run);
      void vt.finished
        .catch(() => {
          /* ignore */
        })
        .finally(() => {
          delete root.dataset.skinWipe;
        });
    } else {
      run();
      delete root.dataset.skinWipe;
    }
  };

  useEffect(() => {
    if (!active) {
      setPhase("idle");
      doneRef.current = false;
      committedRef.current = false;
      return;
    }

    if (!tryAcquireCrossing("exit-dialup")) {
      onDone();
      return;
    }

    setCrossingLock("exit-dialup");
    doneRef.current = false;
    committedRef.current = false;

    const fab = origin ?? measureFabCenter();
    const brand = brandAnchorCenter();
    setFrom(brand);
    setTo(fab);
    setPathLen(1);

    if (reduced) {
      try {
        if (!committedRef.current) {
          committedRef.current = true;
          onCommit();
        }
        timers.current.push(window.setTimeout(finish, 80));
      } catch {
        onError?.();
        finish();
      }
      return () => {
        clearTimers();
        releaseCrossing();
        clearCrossingLock();
      };
    }

    setPhase("coherence");
    document.documentElement.classList.add("fd-crossing-derez");

    timers.current.push(
      window.setTimeout(() => {
        document.documentElement.classList.remove("fd-crossing-derez");
        setPhase("unspool");
        setPathLen(1);
      }, 220),
      window.setTimeout(() => {
        setPhase("retract");
        setPathLen(0);
      }, 620),
      window.setTimeout(() => {
        setPhase("reveal");
        try {
          runViewTransitionWipe(fab);
        } catch {
          onError?.();
          if (!committedRef.current) {
            committedRef.current = true;
            onCommit();
          }
        }
      }, 860),
      window.setTimeout(finish, 1420),
    );

    return () => {
      clearTimers();
      document.documentElement.classList.remove("fd-crossing-derez");
      if (!doneRef.current) {
        releaseCrossing();
        clearCrossingLock();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reduced]);

  if (!mounted || !active || phase === "idle" || phase === "done") return null;

  const d = filamentPath(from, to);
  const showFilament = phase === "unspool" || phase === "retract";
  const showStatus =
    phase === "coherence" || phase === "unspool" || phase === "retract";

  return createPortal(
    <div
      className="pointer-events-none fixed inset-0 z-[10000]"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={status}
      dir={locale === "fa" ? "rtl" : "ltr"}
    >
      {/* Darkening veil */}
      <motion.div
        className="absolute inset-0 bg-[rgb(var(--c-bg))]"
        initial={{ opacity: 0 }}
        animate={{
          opacity:
            phase === "coherence"
              ? 0.18
              : phase === "unspool" || phase === "retract"
                ? 0.32
                : 0,
        }}
        transition={{ duration: 0.25 }}
      />

      {/* Horizontal slice glitches */}
      {phase === "coherence"
        ? Array.from({ length: 7 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-0 right-0 h-[1px] bg-[rgb(var(--c-accent)/0.35)]"
              style={{ top: `${18 + i * 10}%` }}
              initial={{ x: 0, opacity: 0 }}
              animate={{
                x: i % 2 === 0 ? [0, 3, -2, 0] : [0, -3, 2, 0],
                opacity: [0, 0.7, 0.4, 0],
              }}
              transition={{ duration: 0.22, delay: i * 0.02 }}
            />
          ))
        : null}

      {/* Partial rim + mark flash at brand */}
      {(phase === "unspool" || phase === "retract") && (
        <svg
          className="absolute inset-0 size-full overflow-visible"
          aria-hidden
          focusable="false"
        >
          <defs>
            <filter id="fd-exit-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <motion.circle
            cx={from.x}
            cy={from.y}
            r={42}
            fill="none"
            stroke="rgb(var(--c-accent))"
            strokeWidth="2"
            strokeDasharray="170 90"
            filter="url(#fd-exit-glow)"
            initial={{ opacity: 0, rotate: -20 }}
            animate={{ opacity: phase === "retract" ? 0 : 0.85, rotate: 12 }}
            transition={{ duration: 0.35 }}
            style={{ transformOrigin: `${from.x}px ${from.y}px` }}
          />
          <motion.circle
            cx={from.x}
            cy={from.y}
            r={28}
            fill="rgb(var(--c-accent) / 0.08)"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: phase === "retract" ? 0 : 1 }}
            style={{ transformOrigin: `${from.x}px ${from.y}px` }}
          />
        </svg>
      )}

      {showFilament ? (
        <svg
          className="absolute inset-0 size-full overflow-visible"
          aria-hidden
          focusable="false"
        >
          {/* Soft light-wall under filament */}
          <motion.path
            d={d}
            fill="none"
            stroke="rgb(var(--c-accent) / 0.18)"
            strokeWidth={10}
            strokeLinecap="round"
            pathLength={1}
            initial={false}
            animate={{
              pathLength: pathLen,
              opacity: phase === "retract" && pathLen === 0 ? 0 : 1,
            }}
            transition={{
              duration: phase === "retract" ? 0.22 : 0.38,
              ease: phase === "retract" ? [0.55, 0, 0.85, 0.25] : [0.16, 1, 0.3, 1],
            }}
          />
          <motion.path
            d={d}
            fill="none"
            stroke="rgb(var(--c-accent))"
            strokeWidth={phase === "retract" ? 1 : 2.2}
            strokeLinecap="round"
            pathLength={1}
            filter="url(#fd-exit-glow)"
            initial={false}
            animate={{
              pathLength: pathLen,
              opacity: phase === "retract" && pathLen === 0 ? 0 : 0.95,
            }}
            transition={{
              duration: phase === "retract" ? 0.22 : 0.38,
              ease: phase === "retract" ? [0.55, 0, 0.85, 0.25] : [0.16, 1, 0.3, 1],
            }}
          />
        </svg>
      ) : null}

      {/* FAB energy sink ring */}
      {(phase === "retract" || phase === "reveal") && (
        <motion.span
          className="absolute size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgb(var(--c-accent)/0.7)]"
          style={{ left: to.x, top: to.y, boxShadow: "0 0 16px rgb(var(--c-accent) / 0.35)" }}
          initial={{ scale: 1.4, opacity: 0 }}
          animate={{ scale: [1.4, 0.85, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 0.4 }}
          aria-hidden
        />
      )}

      {phase === "reveal" ? (
        <motion.span
          className="absolute h-4 w-[2px] -translate-x-1/2 bg-[rgb(var(--c-accent))]"
          style={{ left: to.x, top: to.y - 8, boxShadow: "0 0 10px rgb(var(--c-accent) / 0.6)" }}
          initial={{ scaleY: 0, opacity: 0.8 }}
          animate={{ scaleY: [0, 1, 0], opacity: [0.8, 1, 0] }}
          transition={{ duration: 0.18 }}
          aria-hidden
        />
      ) : null}

      {showStatus ? (
        <motion.p
          className={
            locale === "fa"
              ? "absolute left-1/2 top-[58%] -translate-x-1/2 font-fa text-sm text-paper/70"
              : "absolute left-1/2 top-[58%] -translate-x-1/2 font-mono text-[12px] uppercase tracking-[0.16em] text-paper/70"
          }
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 0.8, y: 0 }}
        >
          {status}
        </motion.p>
      ) : null}

      <span className="sr-only">{status}</span>
    </div>,
    document.body,
  );
}
