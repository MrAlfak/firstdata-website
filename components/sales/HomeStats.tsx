"use client";

import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";

export default function HomeStats() {
  const { fa, dir, fd, d } = useT();
  const block = d.home.stats;

  return (
    <motion.section
      id="stats"
      aria-label={block.eyebrow}
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
      className="scroll-mt-16 border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-14 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mb-8 text-center text-sm text-paper/40 ${fa ? "font-fa" : ""}`}
        >
          {block.eyebrow}
        </motion.p>

        <motion.ul
          variants={itemReveal}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6 lg:gap-3 xl:gap-4"
          dir={dir}
        >
          {block.items.map((stat, i) => (
            <motion.li
              key={i}
              variants={itemReveal}
              className={`group flex min-w-0 flex-col rounded-sm border border-paper/12 bg-paper/[0.02] px-3 py-4 transition-colors hover:border-term/25 hover:bg-paper/[0.04] sm:px-4 sm:py-5 lg:px-3 lg:py-4 xl:px-4 ${fa ? "font-fa" : ""}`}
            >
              <p
                className="flex items-baseline gap-0.5 text-2xl leading-none tracking-tight text-term sm:text-3xl lg:text-2xl xl:text-3xl"
                dir="ltr"
              >
                <span>{fd(stat.value)}</span>
                {stat.suffix ? (
                  <span className="text-xl text-term/80 sm:text-2xl lg:text-xl xl:text-2xl">{fd(stat.suffix)}</span>
                ) : null}
              </p>
              <p className="mt-2 text-xs font-normal text-paper sm:text-sm lg:text-xs xl:text-sm">{stat.label}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-paper/45 sm:text-xs lg:text-[10px] xl:text-xs">
                {stat.punchline}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.section>
  );
}
