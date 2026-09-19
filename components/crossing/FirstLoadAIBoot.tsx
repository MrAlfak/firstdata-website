"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CrossingPortal } from "./CrossingPortal";
import { IdentityDisc, type DiscVisualPhase } from "./IdentityDisc";
import {
  clearCrossingLock,
  hasSeenModernFirstLoad,
  markModernFirstLoadSeen,
  setCrossingLock,
  setLastCrossingDirection,
} from "@/lib/crossing/session";
import { releaseCrossing, tryAcquireCrossing } from "@/lib/crossing/mutex";
import type { CrossingLocale } from "@/lib/crossing/types";

type Props = {
  locale: CrossingLocale;
  status: string;
  ready?: string;
  enabled?: boolean;
  onDone: () => void;
};

type Phase = "void" | "charge" | "assemble" | "lock" | "exit" | "done";

/**
 * Cold first-load Identity Disc boot for modern skin (~2300ms).
 */
export function FirstLoadAIBoot({
  locale,
  status,
  ready,
  enabled = true,
  onDone,
}: Props) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase | "skip" | null>(() => (!enabled ? "skip" : null));
  const [prevEnabled, setPrevEnabled] = useState(enabled);
  if (enabled !== prevEnabled) {
    setPrevEnabled(enabled);
    if (!enabled) {
      setPhase("skip");
    }
  }
  const doneRef = useRef(false);
  const timers = useRef<number[]>([]);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    markModernFirstLoadSeen();
    clearCrossingLock();
    setLastCrossingDirection("enter-ai");
    releaseCrossing();
    setPhase("done");
    onDone();
  }, [onDone]);

  useEffect(() => {
    if (!enabled) {
      onDone();
      return;
    }

    const frameId = requestAnimationFrame(() => {
      if (hasSeenModernFirstLoad()) {
        setPhase("skip");
        onDone();
        return;
      }

      if (!tryAcquireCrossing("enter-ai")) {
        setPhase("skip");
        onDone();
        return;
      }

      setCrossingLock("enter-ai");
      setPhase("void");

      if (reduced) {
        setPhase("lock");
        const t = window.setTimeout(finish, 100);
        timers.current.push(t);
        return;
      }

      timers.current.push(
        window.setTimeout(() => setPhase("charge"), 200),
        window.setTimeout(() => setPhase("assemble"), 980),
        window.setTimeout(() => setPhase("lock"), 1480),
        window.setTimeout(() => setPhase("exit"), 1880),
        window.setTimeout(finish, 2360),
      );
    });

    return () => {
      cancelAnimationFrame(frameId);
      timers.current.forEach(clearTimeout);
      timers.current = [];
      if (!doneRef.current) {
        releaseCrossing();
        clearCrossingLock();
      }
    };
  }, [enabled, onDone, reduced, finish]);

  if (!phase || phase === "skip" || phase === "done") return null;

  const discPhase: DiscVisualPhase =
    phase === "void"
      ? "enter"
      : phase === "charge"
        ? "charge"
        : phase === "assemble"
          ? "assemble"
          : phase === "lock"
            ? "lock"
            : "collapse";

  const intensity =
    phase === "lock" || phase === "assemble"
      ? "high"
      : phase === "charge"
        ? "mid"
        : "low";

  return (
    <CrossingPortal
      locale={locale}
      status={phase === "exit" ? (ready ?? status) : status}
      exiting={phase === "exit"}
      intensity={intensity}
      reducedMotion={Boolean(reduced)}
    >
      <div className="relative flex -translate-y-[3vh] flex-col items-center">
        <IdentityDisc
          phase={discPhase}
          reducedMotion={Boolean(reduced)}
          showRibbon={phase === "charge" || phase === "assemble"}
          ribbonFrom="left"
        />
        <motion.p
          className={
            locale === "fa"
              ? "mt-7 text-center font-fa text-sm font-medium text-paper/75"
              : "mt-7 text-center font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-paper/75"
          }
          initial={false}
          animate={{
            opacity:
              phase === "void" || phase === "exit"
                ? 0
                : phase === "lock"
                  ? 0.85
                  : 0.5,
            letterSpacing: locale === "en" && phase === "lock" ? "0.22em" : undefined,
          }}
          transition={{ duration: 0.35 }}
        >
          {status}
        </motion.p>
      </div>
    </CrossingPortal>
  );
}
