"use client";

import { motion } from "motion/react";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import TermIcon from "@/components/icons/TermIcon";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import type { ProductSubPageUi } from "@/i18n/product-sub-page";

type Props = {
  data: ProductSubPageUi["useCases"];
  accentText?: string;
  accentHover?: string;
  accentCard?: string;
};

export default function ProductUseCaseCards({
  data,
  accentText = "text-term",
  accentHover = "hover:border-term/25",
  accentCard = "border-paper/15 bg-paper/[0.015]",
}: Props) {
  const { fa, dir } = useT();

  return (
    <motion.section
      id="use-cases"
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="scroll-mt-24 border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <AboutSectionHeader eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />

        <motion.div variants={itemReveal} className="grid gap-4 sm:grid-cols-2">
          {data.cards.map((card) => (
            <div
              key={card.title}
              dir={dir}
              className={`flex gap-4 border p-5 transition-colors sm:p-6 ${accentCard} ${accentHover} ${fa ? "font-fa" : ""}`}
            >
              <TermIcon
                name={card.icon}
                plain
                size="md"
                className={`shrink-0 ${accentText} [&_i]:text-[1.75rem]`}
              />
              <div className="min-w-0">
                <p className={`text-base text-paper/90 ${fa ? "font-fa" : "font-pixel"}`}>{card.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-paper/55">{card.outcome}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
