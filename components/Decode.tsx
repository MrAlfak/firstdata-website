"use client";

import type { ElementType } from "react";
import { useRef } from "react";
import { useInView } from "motion/react";
import { useScramble } from "@/motion/useScramble";

export function Decode({
  children,
  as: Tag = "span",
  duration,
  className,
  dir,
}: {
  children: string;
  as?: ElementType;
  duration?: number;
  className?: string;
  dir?: "ltr" | "rtl";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const text = useScramble(children, { start: inView, duration });
  return (
    <Tag ref={ref} dir={dir} aria-label={children} className={className}>
      {text}
    </Tag>
  );
}
