"use client";

import { useScramble } from "@/motion/useScramble";

type Props = {
  text: string;
  start?: boolean;
  duration?: number;
  className?: string;
  block?: boolean;
};

/**
 * Scramble effect with an invisible copy of the final text to prevent layout shift.
 */
export default function StableScramble({
  text,
  start = true,
  duration = 700,
  className = "",
  block = false,
}: Props) {
  const out = useScramble(text, { start, duration });
  const wrap = block ? "block w-full" : "inline-block max-w-full align-top";

  return (
    <span className={`relative ${wrap} ${className}`}>
      <span
        className={`invisible select-none ${block ? "block whitespace-pre-wrap" : "whitespace-pre"}`}
        aria-hidden="true"
      >
        {text}
      </span>
      <span
        className={`absolute inset-0 ${block ? "block whitespace-pre-wrap" : "whitespace-pre"}`}
        aria-hidden={false}
      >
        {out}
      </span>
    </span>
  );
}
