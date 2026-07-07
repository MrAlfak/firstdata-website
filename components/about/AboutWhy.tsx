"use client";

import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import TermIcon from "@/components/icons/TermIcon";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import { useT } from "@/i18n/LangProvider";

export default function AboutWhy() {
  const { fa, dir, d } = useT();
  const why = d.aboutUi.why;

  return (
    <motion.section
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <AboutSectionHeader eyebrow={why.eyebrow} title={why.title} subtitle={why.subtitle} />

        <motion.div variants={itemReveal} className="grid gap-4 sm:grid-cols-2">
          {why.points.map((pt) => (
            <div
              key={pt.label}
              dir={dir}
              className={`flex gap-4 border border-paper/15 bg-paper/[0.015] p-5 transition-colors hover:border-term/25 ${fa ? "font-fa" : ""}`}
            >
              <TermIcon
                name={pt.icon}
                plain
                size="md"
                className="shrink-0 [&_svg]:h-9 [&_svg]:w-9"
              />
              <div>
                <p className="text-base text-paper/90">{pt.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-paper/55">{pt.text}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
