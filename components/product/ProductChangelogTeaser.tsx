"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { APP_VERSION, CHANGELOG } from "@/config/changelog";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import type { ProductPhase3Sub } from "@/i18n/product-phase3";

type Props = {
  data: ProductPhase3Sub["changelog"];
};

export default function ProductChangelogTeaser({ data }: Props) {
  const { fa, dir, lang } = useT();
  const recent = CHANGELOG.slice(0, 3);

  return (
    <motion.section
      id="changelog"
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="scroll-mt-24 border-b border-paper/20 bg-paper/[0.015] px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <AboutSectionHeader eyebrow={data.eyebrow} title={data.title} />
        <motion.p variants={itemReveal} dir={dir} className={`mb-6 max-w-2xl text-sm text-paper/55 ${fa ? "font-fa" : ""}`}>
          {data.body}
        </motion.p>
        <motion.ul variants={itemReveal} className="space-y-3">
          {recent.map((entry) => (
            <li
              key={entry.version}
              dir={dir}
              className={`border border-paper/12 bg-paper/[0.02] px-4 py-3 ${fa ? "font-fa" : ""}`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-term" dir="ltr">
                  v{entry.version}
                </span>
                <span className="font-mono text-[10px] text-paper/35" dir="ltr">
                  {entry.date}
                </span>
                {entry.version === APP_VERSION ? (
                  <span className="border border-term/30 px-1.5 py-0.5 font-mono text-[8px] uppercase text-term/80">
                    current
                  </span>
                ) : null}
              </div>
              <ul className="mt-2 space-y-1 text-sm text-paper/60">
                {entry.items[lang].slice(0, 2).map((item) => (
                  <li key={item}>▸ {item}</li>
                ))}
              </ul>
            </li>
          ))}
        </motion.ul>
        <motion.div variants={itemReveal} className="mt-6">
          <Link
            href="/terms"
            dir={dir}
            className={`text-xs text-paper/45 transition-colors hover:text-term ${fa ? "font-fa" : "font-mono"}`}
          >
            {fa ? "مشاهده changelog کامل ←" : "View full changelog →"}
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
