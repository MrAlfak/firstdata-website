"use client";

import { cn } from "@/lib/utils";
import { animate, motion, useMotionValue } from "motion/react";
import {
  Children,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import useMeasure from "react-use-measure";

export type InfiniteSliderProps = {
  children: ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};

/**
 * Seamless infinite strip. Measures one set, clones enough to cover the viewport,
 * then translates by exactly one set width so the loop never jumps or "fills from the left".
 */
export function InfiniteSlider({
  children,
  gap = 16,
  speed = 100,
  speedOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const [viewportRef, { width: viewportW, height: viewportH }] = useMeasure();
  const [setRef, { width: setW, height: setH }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [started, setStarted] = useState(false);

  const isHorizontal = direction === "horizontal";
  const viewportSize = isHorizontal ? viewportW : viewportH;
  const setSize = isHorizontal ? setW : setH;

  const childArray = useMemo(() => Children.toArray(children), [children]);

  // Enough copies that one "period" (setSize) always covers the viewport with slack.
  const copyCount = useMemo(() => {
    if (setSize <= 0 || viewportSize <= 0) return 2;
    return Math.max(2, Math.ceil((viewportSize * 2) / setSize) + 1);
  }, [setSize, viewportSize]);

  const ready = setSize > 0 && viewportSize > 0;

  useEffect(() => {
    if (!ready || setSize <= 0) return;

    let controls: ReturnType<typeof animate> | undefined;
    // One period = measured set + the trailing gap before the next identical set.
    const period = setSize + gap;
    const from = reverse ? -period : 0;
    const to = reverse ? 0 : -period;
    const distance = Math.abs(to - from);
    const duration = distance / Math.max(currentSpeed, 1);

    if (isTransitioning) {
      const remaining = Math.abs(translation.get() - to);
      controls = animate(translation, to, {
        ease: "linear",
        duration: remaining / Math.max(currentSpeed, 1),
        onComplete: () => setIsTransitioning(false),
      });
    } else {
      translation.set(from);
      setStarted(true);
      controls = animate(translation, [from, to], {
        ease: "linear",
        duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        repeatDelay: 0,
      });
    }

    return () => controls?.stop();
  }, [
    ready,
    setSize,
    gap,
    currentSpeed,
    isTransitioning,
    reverse,
    translation,
  ]);

  const hoverProps = speedOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speedOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speed);
        },
      }
    : {};

  const trackStyle = isHorizontal
    ? { x: translation, gap: `${gap}px`, flexDirection: "row" as const }
    : { y: translation, gap: `${gap}px`, flexDirection: "column" as const };

  return (
    <div
      ref={viewportRef}
      className={cn("overflow-hidden", className)}
      // Force LTR track so RTL pages don't reverse flex and reveal empty space from the left.
      dir="ltr"
    >
      <motion.div
        className={cn(
          "flex w-max will-change-transform",
          started ? "opacity-100" : "opacity-0",
        )}
        style={trackStyle}
        {...hoverProps}
      >
        {Array.from({ length: copyCount }, (_, copyIndex) => (
          <div
            key={`set-${copyIndex}`}
            ref={copyIndex === 0 ? setRef : undefined}
            className="flex shrink-0"
            style={{
              gap: `${gap}px`,
              flexDirection: isHorizontal ? "row" : "column",
            }}
            aria-hidden={copyIndex > 0}
          >
            {childArray}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
