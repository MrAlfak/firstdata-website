"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import { ABOUTUS_CHILDREN } from "@/config/navigation";
import { useT } from "@/i18n/LangProvider";

export default function AboutExplore() {
  const { fa, dir, d, t } = useT();
  const ui = d.aboutUi;
  const descBySlug = Object.fromEntries(ui.exploreCards.map((c) => [c.slug, c.desc]));

  return (
    <motion.section
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <AboutSectionHeader eyebrow={ui.exploreEyebrow} title={ui.exploreTitle} />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ABOUTUS_CHILDREN.map((child) => (
            <motion.div key={child.slug} variants={itemReveal}>
              <Link
                href={child.href}
                dir={dir}
                className={`group flex h-full flex-col border border-paper/20 bg-paper/[0.015] p-5 transition-colors hover:border-term/35 hover:bg-paper/[0.03] ${fa ? "font-fa" : ""}`}
              >
                <span className="font-mono text-[10px] text-term/45">/{child.slug}</span>
                <span className={`mt-3 text-base text-paper/90 ${fa ? "font-fa" : "font-pixel"}`}>
                  {t(child.labelKey)}
                </span>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-paper/50">
                  {descBySlug[child.slug] ?? ""}
                </p>
                <span className={`mt-4 text-xs text-paper/35 group-hover:text-term ${fa ? "font-fa" : "font-mono"}`}>
                  {ui.exploreMore} {fa ? "←" : "→"}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
