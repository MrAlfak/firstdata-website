"use client";

import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import { Decode } from "@/components/Decode";
import { useT } from "@/i18n/LangProvider";

type Props = {
  id: string;
  number: string;
  eyebrow: string;
  children: React.ReactNode;
  className?: string;
};

export default function ModuleWrapper({
  id,
  number,
  eyebrow,
  children,
  className,
}: Props) {
  const { fa, dir } = useT();
  return (
    <motion.section
      id={id}
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px" }}
      className={`scroll-mt-16 border-b border-white/20 px-4 py-16 ${className ?? ""}`}
    >
      <div className="mx-auto max-w-6xl">
        {/* Eyebrow */}
        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mb-4 text-[10px] text-white/30 ${fa ? "font-fa" : "ascii"}`}
        >
          <Decode>{fa ? `ماژول ${number} — ${eyebrow}` : `> module ${number}: ${eyebrow}`}</Decode>
        </motion.p>
        {children}
      </div>
    </motion.section>
  );
}

export { itemReveal };
