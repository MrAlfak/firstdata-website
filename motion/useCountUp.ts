"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/** rAF count-up. Ticks 0 → target once when `start` is true. Reduced-motion-safe. */
export function useCountUp(
  target: number,
  opts?: { start?: boolean; duration?: number; decimals?: number },
) {
  const { start = true, duration = 700, decimals = 0 } = opts ?? {};
  const reducedMotion = usePrefersReducedMotion();
  const shouldAnimate = start && !reducedMotion;
  const [val, setVal] = useState(shouldAnimate ? 0 : target);
  const raf = useRef(0);

  useEffect(() => {
    if (!shouldAnimate) return;

    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      setVal(parseFloat((p * target).toFixed(decimals)));
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setVal(target);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [start, target, duration, decimals, shouldAnimate]);

  return shouldAnimate ? val : target;
}
