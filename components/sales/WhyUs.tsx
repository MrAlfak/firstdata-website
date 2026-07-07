"use client";

import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import TermIcon from "@/components/icons/TermIcon";
import { useT } from "@/i18n/LangProvider";

export default function WhyUs() {
  const { fa, dir, d } = useT();
  const why = d.home.why;

  return (
    <motion.section
      id="why"
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px" }}
      className="scroll-mt-16 border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mb-3 text-sm txt-comment ${fa ? "font-fa" : ""}`}
        >
          {why.eyebrow}
        </motion.p>

        <motion.h2
          variants={itemReveal}
          dir={dir}
          className={`text-2xl font-normal leading-snug tracking-tight text-paper sm:text-3xl lg:text-4xl ${fa ? "font-fa" : ""}`}
        >
          {why.title}
        </motion.h2>

        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mt-4 max-w-2xl text-base leading-relaxed text-paper/65 sm:text-lg ${fa ? "font-fa" : ""}`}
        >
          {why.subtitle}
        </motion.p>

        <motion.div
          variants={itemReveal}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5"
        >
          {why.points.map((pt, i) => (
            <div
              key={i}
              className={`group flex gap-4 rounded-sm border border-paper/12 bg-paper/[0.02] p-5 transition-colors hover:border-paper/28 hover:bg-paper/[0.04] ${fa ? "font-fa" : ""}`}
              dir={dir}
            >
              <TermIcon
                name={pt.icon}
                plain
                size="md"
                className="shrink-0 [&_svg]:h-9 [&_svg]:w-9 sm:[&_svg]:h-10 sm:[&_svg]:w-10"
              />
              <div>
                <p className="text-base font-normal text-paper">{pt.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-paper/55 sm:text-base">
                  {pt.text}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
