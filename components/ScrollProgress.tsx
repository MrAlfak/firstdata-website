"use client";

import { motion, useScroll } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[61] h-px origin-left bg-amber/80"
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  );
}
