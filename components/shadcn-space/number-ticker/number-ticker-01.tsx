"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/motion/usePrefersReducedMotion";

type NumberTickerProps = {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  /** Delay animation until the element enters the viewport. */
  inView?: boolean;
  /** External gate (e.g. hero reveal). Defaults to true. */
  active?: boolean;
  /** Format the numeric string (e.g. Persian digits via `fd`). */
  formatValue?: (value: string) => string;
  /** IntersectionObserver rootMargin when `inView` is set. */
  rootMargin?: string;
};

export function NumberTicker({
  end,
  start = 0,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  inView = false,
  active = true,
  formatValue,
  rootMargin = "0px 0px -12% 0px",
}: NumberTickerProps) {
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [inViewReady, setInViewReady] = useState(!inView);
  const [value, setValue] = useState(reducedMotion && active ? end : start);
  const startTimeRef = useRef<number | null>(null);
  const shouldAnimate = active && inViewReady && !reducedMotion;

  useEffect(() => {
    if (!inView) {
      setInViewReady(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInViewReady(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, rootMargin]);

  useEffect(() => {
    if (!shouldAnimate) {
      setValue(active && reducedMotion ? end : start);
      startTimeRef.current = null;
      return;
    }

    startTimeRef.current = null;
    setValue(start);
    let frame = 0;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;

      const progress = timestamp - startTimeRef.current;
      const percent = Math.min(progress / (duration * 1000), 1);

      // ease-out cubic for smooth animation
      const eased = 1 - Math.pow(1 - percent, 3);

      const current = start + (end - start) * eased;
      setValue(current);

      if (percent < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setValue(end);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [start, end, duration, shouldAnimate, active, reducedMotion]);

  const numeric = value.toFixed(decimals);
  const formatted = formatValue ? formatValue(numeric) : numeric;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

const NumberTickerDemo = () => {
  return (
    <div>
      <NumberTicker
        end={100}
        duration={4}
        className="text-foreground font-medium lg:text-5xl sm:text-4xl text-3xl"
      />
    </div>
  );
};

export default NumberTickerDemo;
