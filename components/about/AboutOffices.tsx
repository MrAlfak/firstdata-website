"use client";

import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import { useT } from "@/i18n/LangProvider";

export default function AboutOffices() {
  const { fa, dir, d } = useT();
  const block = d.aboutUi.offices;

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

        <motion.div variants={itemReveal} className="overflow-hidden border border-paper/20">
          <div className="flex items-center gap-1.5 border-b border-paper/20 bg-paper/[0.04] px-3 py-2" dir="ltr">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]/70" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]/70" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]/70" />
            <span className="ms-auto font-mono text-[9px] text-paper/25">geo.iran.nodes</span>
          </div>
          <div className="grid gap-px bg-paper/10 sm:grid-cols-3">
            {block.cities.map((city) => (
              <div
                key={city.name}
                dir={dir}
                className={`bg-paper/[0.015] p-5 sm:p-6 ${fa ? "font-fa" : ""}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-base text-paper/90">{city.name}</p>
                  <span className="shrink-0 font-mono text-[10px] text-term/60">{city.status}</span>
                </div>
                <p className="mt-2 text-sm text-paper/55">{city.label}</p>
              </div>
            ))}
          </div>
          <p
            dir={dir}
            className={`border-t border-paper/15 bg-paper/[0.02] px-4 py-3 text-[11px] text-paper/40 ${fa ? "font-fa" : "font-mono"}`}
          >
            {block.hint}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
