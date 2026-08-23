"use client";

import { motion } from "motion/react";
import { itemReveal } from "@/motion/tokens";
import { Decode } from "@/components/Decode";
import { useT } from "@/i18n/LangProvider";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
};

export default function AboutSectionHeader({ eyebrow, title, subtitle, className = "mb-8" }: Props) {
  const { fa, dir } = useT();
  const [skin] = usePanelSkin();
  const ai = skin === "modern";
  const cleanEyebrow = eyebrow.replace(/^\/\/\s*/, "").replace(/^>\s*/, "").trim();

  return (
    <div className={className}>
      <motion.p
        variants={itemReveal}
        dir={dir}
        className={
          ai
            ? `ai-eyebrow mb-3 ${fa ? "font-iran" : "font-iran"}`
            : `mb-4 text-[10px] txt-comment ${fa ? "font-fa" : "ascii"}`
        }
      >
        {ai ? cleanEyebrow : <Decode>{eyebrow}</Decode>}
      </motion.p>
      <motion.h2
        variants={itemReveal}
        dir={dir}
        className={
          ai
            ? `ai-display text-2xl font-medium leading-tight tracking-tight text-paper sm:text-3xl lg:text-4xl ${fa ? "font-iran" : "font-iran"}`
            : `text-xl leading-tight tracking-tight sm:text-2xl lg:text-3xl ${fa ? "font-fa" : "font-pixel"}`
        }
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mt-4 max-w-2xl text-sm leading-relaxed text-paper/55 sm:text-base ${
            fa ? (ai ? "font-iran" : "font-fa") : ai ? "font-iran" : ""
          }`}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  );
}
