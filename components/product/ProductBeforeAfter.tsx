"use client";

import { motion } from "motion/react";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import type { ProductPhase2Sub } from "@/i18n/product-phase2";

type Props = {
  data: ProductPhase2Sub["beforeAfter"];
};

function LogPanel({
  label,
  lines,
  variant,
}: {
  label: string;
  lines: string[];
  variant: "before" | "after";
}) {
  const border = variant === "before" ? "border-paper/20" : "border-term/30";
  const titleColor = variant === "before" ? "text-paper/40" : "text-term/70";

  return (
    <div className={`overflow-hidden rounded-sm border bg-[#080c08] font-mono text-[11px] ${border}`} dir="ltr">
      <div className={`border-b border-paper/10 px-3 py-2 text-[9px] uppercase tracking-wider ${titleColor}`}>
        {label}
      </div>
      <ul className="space-y-1.5 p-4 text-paper/55">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ProductBeforeAfter({ data }: Props) {
  useT();

  return (
    <motion.section
      id="before-after"
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="scroll-mt-24 border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <AboutSectionHeader eyebrow={data.eyebrow} title={data.title} />
        <motion.div variants={itemReveal} className="grid gap-4 md:grid-cols-2 md:gap-6">
          <LogPanel label={data.beforeLabel} lines={data.beforeLines} variant="before" />
          <LogPanel label={data.afterLabel} lines={data.afterLines} variant="after" />
        </motion.div>
      </div>
    </motion.section>
  );
}
