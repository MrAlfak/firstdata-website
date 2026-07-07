"use client";

import { motion } from "motion/react";
import { itemReveal } from "@/motion/tokens";
import { Decode } from "@/components/Decode";
import { useT } from "@/i18n/LangProvider";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
};

export default function AboutSectionHeader({ eyebrow, title, subtitle, className = "mb-8" }: Props) {
  const { fa, dir } = useT();

  return (
    <div className={className}>
      <motion.p
        variants={itemReveal}
        dir={dir}
        className={`mb-4 text-[10px] txt-comment ${fa ? "font-fa" : "ascii"}`}
      >
        <Decode>{eyebrow}</Decode>
      </motion.p>
      <motion.h2
        variants={itemReveal}
        dir={dir}
        className={`text-xl leading-tight tracking-tight sm:text-2xl lg:text-3xl ${fa ? "font-fa" : "font-pixel"}`}
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mt-4 max-w-2xl text-sm leading-relaxed text-paper/60 sm:text-base ${fa ? "font-fa" : ""}`}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  );
}
