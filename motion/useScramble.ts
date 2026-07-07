"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\|<>_-=+*#%@░▒▓█";

export function useScramble(
  target: string,
  opts?: { duration?: number; start?: boolean },
) {
  const { duration = 700, start = true } = opts ?? {};
  const reducedMotion = usePrefersReducedMotion();
  const isAscii = /^[\x00-\x7F]*$/.test(target);
  const shouldAnimate = start && isAscii && !reducedMotion;
  const [out, setOut] = useState(target);
  const raf = useRef(0);

  useEffect(() => {
    if (!shouldAnimate) return;

    const t0 = performance.now();
    const charDelay = 18;
    const tick = (now: number) => {
      const elapsed = now - t0;
      let next = "";
      for (let i = 0; i < target.length; i++) {
        const charStart = i * charDelay;
        const p = Math.min(1, Math.max(0, (elapsed - charStart) / duration));
        const ch = target[i];
        if (ch === " " || ch === "\n" || ch === "\t") next += ch;
        else if (p >= 1) next += ch;
        else next += POOL[(Math.random() * POOL.length) | 0];
      }
      setOut(next);
      if (elapsed < duration + target.length * charDelay) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setOut(target);
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, shouldAnimate, duration]);

  return shouldAnimate ? out : target;
}
