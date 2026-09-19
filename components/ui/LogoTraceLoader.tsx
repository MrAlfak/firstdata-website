"use client";

import { useEffect, useRef, useState } from "react";
import { FILL_PATHS, LOGO_VIEW_BOX, TRACE_PATH } from "@/lib/brand/mark-paths";
import { usePrefersReducedMotion } from "@/motion/usePrefersReducedMotion";

/**
 * Logo Trace Loader — compact SVG reveal (21st.dev / dqnamo pattern).
 * Short dashed segment loops a continuous contour, then closes into a filled mark.
 */

type LoaderPhase = "loop" | "closingOutline" | "fadingFill" | "done";

export type LogoTraceLoaderProps = {
  loading?: boolean;
  isComplete?: boolean;
  size?: number;
  strokeWidth?: number;
  loopDurationSeconds?: number;
  fillFadeSeconds?: number;
  className?: string;
  ariaLabel?: string;
  onDone?: () => void;
};

export function LogoTraceLoader({
  loading = true,
  isComplete = false,
  size = 64,
  strokeWidth = 2.25,
  loopDurationSeconds = 1.35,
  fillFadeSeconds = 0.4,
  className,
  ariaLabel = "Loading",
  onDone,
}: LogoTraceLoaderProps) {
  const prefersReduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<LoaderPhase>(() => (prefersReduced ? "done" : "loop"));
  const [fillOpacity, setFillOpacity] = useState(() => (prefersReduced ? 1 : 0));
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  const shouldResolve = isComplete || !loading || prefersReduced;

  useEffect(() => {
    if (prefersReduced) {
      if (!doneRef.current) {
        doneRef.current = true;
        onDoneRef.current?.();
      }
    }
  }, [prefersReduced]);

  useEffect(() => {
    if (doneRef.current) return;
    if (!shouldResolve) return;
    if (phase !== "loop") return;

    const t0 = window.setTimeout(() => {
      setPhase("closingOutline");
    }, 0);
    const closeMs = 420;
    const fillMs = Math.round(fillFadeSeconds * 1000);
    const holdMs = 280;

    const t1 = window.setTimeout(() => {
      setPhase("fadingFill");
      setFillOpacity(1);
    }, closeMs);

    const t2 = window.setTimeout(() => {
      setPhase("done");
      if (!doneRef.current) {
        doneRef.current = true;
        onDoneRef.current?.();
      }
    }, closeMs + fillMs + holdMs);

    const fallback = window.setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        setPhase("done");
        setFillOpacity(1);
        onDoneRef.current?.();
      }
    }, closeMs + fillMs + holdMs + 800);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(fallback);
    };
  }, [shouldResolve, phase, fillFadeSeconds]);

  const showLoop = phase === "loop";
  const showClosing = phase === "closingOutline" || phase === "fadingFill" || phase === "done";
  const showFill = phase === "fadingFill" || phase === "done";

  return (
    <svg
      role="status"
      aria-label={ariaLabel}
      aria-busy={phase !== "done"}
      viewBox={LOGO_VIEW_BOX}
      width={size}
      height={size}
      className={className}
      fill="none"
    >
      <g opacity={0.18}>
        <path
          d={TRACE_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth={Math.max(1, strokeWidth / 2)}
          strokeLinejoin="round"
        />
      </g>

      {showLoop ? (
        <path
          d={TRACE_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="0.16 0.84"
          style={{
            animation: `logo-trace-loader-loop ${loopDurationSeconds}s linear infinite`,
          }}
        />
      ) : null}

      {/* Ghost mark while tracing — brand readable before resolve */}
      {showLoop
        ? FILL_PATHS.map((d) => (
            <path
              key={`ghost-${d}`}
              d={d}
              fill="currentColor"
              fillRule="evenodd"
              opacity={0.12}
            />
          ))
        : null}

      {showClosing ? (
        <path
          d={TRACE_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="1 0"
          className={
            phase === "closingOutline"
              ? "logo-trace-loader-close"
              : undefined
          }
          style={
            phase === "fadingFill" || phase === "done"
              ? { opacity: 0.35, transition: `opacity ${fillFadeSeconds}s ease` }
              : undefined
          }
        />
      ) : null}

      {showFill
        ? FILL_PATHS.map((d) => (
            <path
              key={d}
              d={d}
              fill="currentColor"
              fillRule="evenodd"
              style={{
                opacity: fillOpacity,
                transition: `opacity ${fillFadeSeconds}s ease`,
              }}
            />
          ))
        : null}
    </svg>
  );
}
