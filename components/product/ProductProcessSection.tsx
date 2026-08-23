"use client";

import Link from "next/link";
import { motion } from "motion/react";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import type { ProductSubPageUi } from "@/i18n/product-sub-page";
import { productPolishUi } from "@/i18n/product-polish";

type Props = {
  data: ProductSubPageUi["process"];
  accentText?: string;
  accentBorder?: string;
};

export default function ProductProcessSection({
  data,
  accentText = "text-term",
  accentBorder = "border-term/40",
}: Props) {
  const { fa, dir, lang } = useT();
  const polish = productPolishUi[lang];

  return (
    <motion.section
      id="process"
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="scroll-mt-24 border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <AboutSectionHeader eyebrow={data.eyebrow} title={data.title} />

        <motion.ol
          variants={itemReveal}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {data.steps.map((step, i) => (
            <li
              key={step.title}
              dir={dir}
              className={`border border-paper/12 bg-paper/[0.015] p-5 ${fa ? "font-fa" : ""}`}
            >
              <span className={`font-mono text-[10px] ${accentText}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className={`mt-2 text-base text-paper ${fa ? "font-fa" : "font-pixel"}`}>
                {step.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-paper/55">{step.body}</p>
            </li>
          ))}
        </motion.ol>

        <motion.div variants={itemReveal} className="mt-8">
          <Link
            href="/contactus/request"
            dir={dir}
            className={`inline-flex items-center gap-2 border px-5 py-2.5 text-xs uppercase tracking-wider transition-colors hover:bg-term/10 ${accentBorder} ${accentText} ${
              fa ? "font-fa" : "font-mono"
            }`}
          >
            {polish.processCta}
            <span aria-hidden>{fa ? "←" : "→"}</span>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
