"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CrossingPortal } from "./CrossingPortal";
import { IdentityDisc, type DiscVisualPhase } from "./IdentityDisc";
import { brandAnchorCenter } from "@/lib/crossing/geometry";
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
  onCommit: () => void;
  onDone: () => void;
};

type Phase =
  | "idle"
  | "compress"
  | "charge"
  | "assemble"
  | "handoff"
  | "exit"
  | "done";

/**
 * Terminal → modern toggle (~3460ms). Cinematic channel compress → Identity Disc.
 */
export function EnterAiCrossing({ active, locale, status, onCommit, onDone }: Props) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [prevActive, setPrevActive] = useState(active);
  if (active !== prevActive) {
    setPrevActive(active);
    if (!active) {
      setPhase("idle");
    }
  }
  const [flyTo, setFlyTo] = useState<Point | null>(null);
  const doneRef = useRef(false);
  const committedRef = useRef(false);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    clearTimers();
    document.documentElement.removeAttribute("data-crossing-compress");
    clearCrossingLock();
    setLastCrossingDirection("enter-ai");
    releaseCrossing();
    setPhase("done");
    onDone();
  };

  useEffect(() => {
    if (!active) {
      doneRef.current = false;
      committedRef.current = false;
      return;
    }

    if (!tryAcquireCrossing("enter-ai")) {
      onDone();
      return;
    }

    setCrossingLock("enter-ai");
    doneRef.current = false;
    committedRef.current = false;

    const frameId = requestAnimationFrame(() => {
      if (reduced) {
        setPhase("handoff");
        if (!committedRef.current) {
          committedRef.current = true;
          onCommit();
        }
        timers.current.push(window.setTimeout(finish, 120));
        return;
      }

      setPhase("compress");
      document.documentElement.setAttribute("data-crossing-compress", "1");

      timers.current.push(
        window.setTimeout(() => {
          document.documentElement.removeAttribute("data-crossing-compress");
          setPhase("charge");
        }, 320),
        window.setTimeout(() => setPhase("assemble"), 1680),
        window.setTimeout(() => {
          setPhase("handoff");
          if (!committedRef.current) {
            committedRef.current = true;
            onCommit();
          }
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setFlyTo(brandAnchorCenter());
            });
          });
        }, 2480),
        window.setTimeout(() => setPhase("exit"), 3020),
        window.setTimeout(finish, 3520),
      );
    });

    return () => {
      cancelAnimationFrame(frameId);
      clearTimers();
      document.documentElement.removeAttribute("data-crossing-compress");
      if (!doneRef.current) {
        releaseCrossing();
        clearCrossingLock();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reduced]);

  if (!active || phase === "idle" || phase === "done") return null;

  const discPhase: DiscVisualPhase =
    phase === "compress"
      ? "enter"
      : phase === "charge"
        ? "charge"
        : phase === "assemble"
          ? "assemble"
          : phase === "handoff"
            ? "lock"
            : "collapse";

  const intensity =
    phase === "assemble" || phase === "handoff"
      ? "high"
      : phase === "charge"
        ? "mid"
        : "low";

  return (
    <CrossingPortal
      locale={locale}
      status={status}
      exiting={phase === "exit"}
      intensity={intensity}
      reducedMotion={Boolean(reduced)}
    >
      <div className="relative flex -translate-y-[2vh] flex-col items-center md:-translate-y-[1vh]">
        {phase === "compress" ? (
          <div className="relative flex h-[40vh] w-full max-w-lg items-center justify-center">
            {/* Terminal plane collapsing into horizon */}
            <motion.div
              className="absolute inset-x-8 top-[20%] bottom-[20%] overflow-hidden rounded-sm border border-[rgb(var(--c-accent)/0.2)] bg-[rgb(var(--c-bg))]"
              initial={{ scaleY: 1, opacity: 0.85 }}
              animate={{ scaleY: 0.02, opacity: 1 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              style={{ transformOrigin: "50% 55%" }}
            >
              <div className="absolute inset-0 opacity-40">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="mx-4 my-2 h-px bg-[rgb(var(--c-accent)/0.35)]"
                    style={{ width: `${55 + (i % 3) * 12}%` }}
                  />
                ))}
              </div>
            </motion.div>
            <motion.div
              className="absolute left-1/2 top-[55%] h-[2px] w-[min(70vw,360px)] -translate-x-1/2"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgb(var(--c-accent)), rgb(var(--c-fg)), rgb(var(--c-accent)), transparent)",
                boxShadow: "0 0 18px rgb(var(--c-accent) / 0.55)",
              }}
              initial={{ scaleX: 0.15, opacity: 0.4 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.28 }}
            />
          </div>
        ) : (
          <motion.div
            className="relative"
            animate={
              flyTo && phase === "handoff"
                ? {
                    x: flyTo.x - window.innerWidth / 2,
                    y: flyTo.y - window.innerHeight * 0.45,
                    scale: 0.22,
                  }
                : { x: 0, y: 0, scale: 1 }
            }
            transition={{ duration: 0.48, ease: [0.76, 0, 0.24, 1] }}
          >
            <IdentityDisc
              phase={discPhase}
              reducedMotion={Boolean(reduced)}
              showRibbon={phase === "charge" || phase === "assemble"}
              ribbonFrom="left"
            />
          </motion.div>
        )}

        <motion.p
          className={
            locale === "fa"
              ? "mt-7 max-w-[22rem] text-center font-fa text-sm font-medium tracking-wide text-paper/75"
              : "mt-7 max-w-[22rem] text-center font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-paper/75"
          }
          initial={false}
          animate={{
            opacity:
              phase === "compress" || phase === "exit" || phase === "handoff"
                ? 0
                : phase === "assemble"
                  ? 0.85
                  : 0.55,
            y: phase === "charge" ? 4 : 0,
          }}
          transition={{ duration: 0.35 }}
        >
          {status}
        </motion.p>
      </div>
    </CrossingPortal>
  );
}
