"use client";

import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";

export default function AboutStatsStrip() {
  const { fa, dir, fd, d } = useT();
  const block = d.aboutUi.statsStrip;

  return (
    <motion.section
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="border-b border-paper/20 bg-paper/[0.02] px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mb-6 text-center text-[10px] uppercase tracking-widest text-paper/35 ${fa ? "font-fa" : "font-mono"}`}
        >
          {block.eyebrow}
        </motion.p>
        <motion.ul
          variants={itemReveal}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
          dir={dir}
        >
          {block.items.map((item) => (
            <li
              key={item.label}
              className={`border border-paper/15 bg-paper/[0.015] px-4 py-5 transition-colors hover:border-term/25 ${fa ? "font-fa" : ""}`}
            >
              <p className="font-mono text-2xl text-term sm:text-3xl" dir="ltr">
                {fd(item.value)}
                {item.suffix ? <span className="text-xl text-term/75">{fd(item.suffix)}</span> : null}
              </p>
              <p className="mt-2 text-sm text-paper/85">{item.label}</p>
              <p className="mt-1 text-[11px] text-paper/40">{item.note}</p>
            </li>
          ))}
        </motion.ul>
      </div>
    </motion.section>
  );
}
