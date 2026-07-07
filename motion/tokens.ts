import type { Variants } from "motion/react";

export const ease = {
  tty: [0.4, 0, 0.2, 1] as const,
  linear: "linear" as const,
  step: "steps(8, end)" as const,
};

export const dur = {
  micro: 0.15,
  reveal: 0.5,
  decode: 0.7,
  ambientFast: 1,
  ambientSlow: 8,
};

export const stagger = {
  char: 0.018,
  child: 0.06,
};

export const moduleReveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.06,
    },
  },
};

export const itemReveal: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
};
