"use client";

import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import { useT } from "@/i18n/LangProvider";

export default function AboutTimeline() {
  const { fa, dir, d } = useT();
  const block = d.aboutUi.timeline;

  return (
    <motion.section
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <AboutSectionHeader eyebrow={block.eyebrow} title={block.title} />

        <div className="relative">
          <div className="absolute start-4 top-0 hidden h-full w-px bg-paper/15 sm:block" aria-hidden />
          <div className="space-y-6">
            {block.items.map((item, i) => (
              <motion.article
                key={item.era}
                variants={itemReveal}
                dir={dir}
                className={`relative sm:ps-12 ${fa ? "font-fa" : ""}`}
              >
                <span
                  className="absolute start-0 top-1 hidden h-2 w-2 -translate-x-1/2 rounded-full border border-term/60 bg-ink sm:block"
                  aria-hidden
                />
                <div className="border border-paper/15 bg-paper/[0.015] p-5 sm:p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[10px] text-term/70">{item.era}</span>
                    <span className="font-mono text-[10px] text-paper/25">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className={`text-base text-paper/90 ${fa ? "font-fa" : "font-pixel"}`}>{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper/55">{item.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
