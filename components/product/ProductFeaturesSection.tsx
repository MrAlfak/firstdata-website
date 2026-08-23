"use client";

import { motion } from "motion/react";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import type { ProductSubPageUi } from "@/i18n/product-sub-page";

type Props = {
  data: ProductSubPageUi["features"];
  accentText?: string;
};

export default function ProductFeaturesSection({ data, accentText = "text-term" }: Props) {
  const { fa, dir } = useT();

  return (
    <motion.section
      id="features"
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="scroll-mt-24 border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <AboutSectionHeader eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />

        <motion.ul
          variants={itemReveal}
          dir={dir}
          className={`grid gap-x-8 gap-y-3 sm:grid-cols-2 ${fa ? "font-fa" : ""}`}
        >
          {data.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 border border-paper/10 bg-paper/[0.015] px-3 py-2.5 text-sm text-paper/70"
            >
              <span className={`mt-0.5 shrink-0 font-mono ${accentText}`} aria-hidden>
                [x]
              </span>
              <span>{item}</span>
            </li>
          ))}
        </motion.ul>

        {data.callout ? (
          <motion.p
            variants={itemReveal}
            dir={dir}
            className={`mt-6 border border-paper/10 bg-paper/[0.02] px-4 py-3 text-xs leading-relaxed text-paper/45 ${
              fa ? "font-fa" : "font-mono"
            }`}
          >
            <span className={`me-2 ${accentText}`} aria-hidden>
              //
            </span>
            {data.callout}
          </motion.p>
        ) : null}
      </div>
    </motion.section>
  );
}
