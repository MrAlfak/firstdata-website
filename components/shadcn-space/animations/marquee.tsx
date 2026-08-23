import { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode;
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean;
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number;
}

/**
 * Scoped keyframe names (`ss-marquee*`) avoid clobbering the site Hero
 * `@keyframes marquee` (translateX -50% loop).
 */
export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <>
      <style>
        {`
          @keyframes ss-marquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(calc(-100% - var(--gap)));
            }
          }

          @keyframes ss-marquee-vertical {
            from {
              transform: translateY(0);
            }
            to {
              transform: translateY(calc(-100% - var(--gap)));
            }
          }

          @keyframes ss-scroll {
            to {
              transform: translate(calc(-50% - 0.5rem));
            }
          }

          .ss-animate-marquee {
            animation: ss-marquee var(--duration) linear infinite;
          }

          .ss-animate-marquee-vertical {
            animation: ss-marquee-vertical var(--duration) linear infinite;
          }

          .ss-animate-reverse {
            animation-direction: reverse !important;
          }

          .ss-pause-on-hover:hover .ss-animate-marquee,
          .ss-pause-on-hover:hover .ss-animate-marquee-vertical {
            animation-play-state: paused !important;
          }

          .ss-animate-scroll {
            animation: ss-scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .ss-animate-marquee,
            .ss-animate-marquee-vertical,
            .ss-animate-scroll {
              animation: none !important;
            }
          }
        `}
      </style>
      <div
        {...props}
        className={cn(
          "group flex gap-(--gap) overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
          {
            "flex-row": !vertical,
            "flex-col": vertical,
            "ss-pause-on-hover": pauseOnHover,
          },
          className,
        )}
      >
        {Array(repeat)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={cn("flex shrink-0 justify-around gap-(--gap)", {
                "ss-animate-marquee flex-row": !vertical,
                "ss-animate-marquee-vertical flex-col": vertical,
                "ss-animate-reverse": reverse,
              })}
            >
              {children}
            </div>
          ))}
      </div>
    </>
  );
}
