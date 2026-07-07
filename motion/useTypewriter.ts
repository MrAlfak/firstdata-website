"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Typewriter — reveals `target` char-by-char, left to right.
 * SSR-safe (renders full text when animation is off) and reduced-motion-safe.
 */
export function useTypewriter(
  target: string,
  opts?: { start?: boolean; speed?: number },
) {
  const { start = true, speed = 70 } = opts ?? {};
  const reducedMotion = usePrefersReducedMotion();
  const shouldAnimate = start && !reducedMotion;
  const [out, setOut] = useState("");
  const raf = useRef(0);

  useEffect(() => {
    if (!shouldAnimate) return;

    const t0 = performance.now();
    const tick = (now: number) => {
      const n = Math.min(target.length, Math.floor((now - t0) / speed));
      setOut(target.slice(0, n));
      if (n < target.length) raf.current = requestAnimationFrame(tick);
      else setOut(target);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, shouldAnimate, speed]);

  return shouldAnimate ? out : target;
}
