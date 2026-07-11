"use client";

import { useState } from "react";
import { motion } from "motion/react";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";

type Props = {
  eyebrow: string;
  title: string;
  tags: string[];
  stackWhy: Record<string, string>;
  accentBorder?: string;
  tooltipHint?: string;
};

export default function ProductStackTags({
  eyebrow,
  title,
  tags,
  stackWhy,
  accentBorder = "border-paper/35",
  tooltipHint,
}: Props) {
  const { fa, dir, lang } = useT();
  const [active, setActive] = useState<string | null>(null);
  const hint = tooltipHint ?? (lang === "fa" ? "روی هر تگ بزنید — چرا این فناوری؟" : "Click a tag — why this stack?");

  return (
    <motion.section
      id="stack"
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="scroll-mt-24 border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <AboutSectionHeader eyebrow={eyebrow} title={title} />
        <p dir={dir} className={`mb-4 font-mono text-[10px] text-paper/35 ${fa ? "font-fa" : ""}`}>
          {hint}
        </p>
        <motion.div variants={itemReveal} className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const why = stackWhy[tag];
            const isActive = active === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActive(isActive ? null : tag)}
                className={`border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                  isActive ? "border-term/50 bg-term/[0.08] text-term" : `text-paper/75 ${accentBorder} hover:border-paper/40`
                }`}
                aria-expanded={isActive}
              >
                {tag}
              </button>
            );
          })}
        </motion.div>
        {active && stackWhy[active] ? (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            dir={dir}
            className={`mt-4 border border-paper/15 bg-paper/[0.02] p-4 font-mono text-xs text-paper/65 ${fa ? "font-fa" : ""}`}
          >
            <span className="text-term/70">$ stack --why {active}</span>
            <p className={`mt-2 leading-relaxed ${fa ? "font-fa" : ""}`}>{stackWhy[active]}</p>
          </motion.div>
        ) : null}
      </div>
    </motion.section>
  );
}
