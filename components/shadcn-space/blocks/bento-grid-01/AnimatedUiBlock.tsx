"use client";

import { motion } from "motion/react";
import {
  AppWindowMac,
  BarChart3,
  Box,
  Command,
  Presentation,
  ShieldCheck,
  WandSparkles,
} from "lucide-react";

export default function AnimatedUiBlock() {
  return (
    <div className="relative flex min-h-[216px] items-center justify-center">
      <span className="flex items-center justify-center rounded-full shadow-lg">
        <img
          alt="shadcn dark logo"
          src="https://images.shadcnspace.com/assets/logo/shadcn-logo.png"
          width={96}
          height={96}
        />
      </span>
      <motion.div
        className="absolute start-[70%] top-0 z-10"
        animate={{
          y: [-15, 15, -15],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <span
          aria-label="Multiple Layouts"
          className="flex size-11 items-center justify-center rounded-full bg-background lg:size-18"
        >
          <AppWindowMac size={32} />
        </span>
      </motion.div>
      <motion.div
        className="absolute start-[91%] top-[28%] z-10"
        animate={{
          y: [15, -15, 15],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <span
          aria-label="UI Blocks"
          className="flex size-7 items-center justify-center rounded-full bg-background lg:size-12"
        >
          <Command size={24} />
        </span>
      </motion.div>
      <motion.div
        className="absolute start-[78%] top-[61%] z-10"
        animate={{
          y: [-15, 15, -15],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 1,
        }}
      >
        <span
          aria-label="Authentication"
          className="flex size-11 items-center justify-center rounded-full bg-background lg:size-18"
        >
          <ShieldCheck size={36} />
        </span>
      </motion.div>
      <motion.div
        className="absolute end-[78%] top-0"
        animate={{
          y: [15, -15, 15],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <span
          aria-label="Animated Components"
          className="flex size-7 items-center justify-center rounded-full bg-background lg:size-12"
        >
          <Presentation size={20} />
        </span>
      </motion.div>
      <motion.div
        className="absolute end-[67%] top-[80%] z-10 lg:top-[61%]"
        animate={{
          y: [-15, 15, -15],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 0.2,
        }}
      >
        <span
          aria-label="Ai Builder"
          className="flex size-11 items-center justify-center rounded-full bg-background lg:size-18"
        >
          <WandSparkles size={32} />
        </span>
      </motion.div>
      <motion.div
        className="absolute end-[80%] top-[30%] lg:end-[98%] lg:top-0"
        animate={{
          y: [15, -15, 15],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 0.5,
        }}
      >
        <span
          aria-label="Charts"
          className="flex size-11 items-center justify-center rounded-full bg-background lg:size-18"
        >
          <BarChart3 size={32} />
        </span>
      </motion.div>
      <motion.div
        className="absolute end-[95%] top-[67%] z-10"
        animate={{
          y: [-15, 15, -15],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 0.7,
        }}
      >
        <span
          aria-label="UI Components"
          className="flex size-7 items-center justify-center rounded-full bg-background lg:size-12"
        >
          <Box size={22} />
        </span>
      </motion.div>
    </div>
  );
}
