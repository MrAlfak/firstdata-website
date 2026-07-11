"use client";

import Link from "next/link";
import { motion } from "motion/react";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import type { ProductPhase3Sub } from "@/i18n/product-phase3";

type Props = {
  data: ProductPhase3Sub["services"];
  accentText?: string;
};

export default function ProductServiceGraph({ data, accentText = "text-term" }: Props) {
  const { fa, dir } = useT();

  return (
    <motion.section
      id="services"
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="scroll-mt-24 border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <AboutSectionHeader eyebrow={data.eyebrow} title={data.title} />
        <motion.div variants={itemReveal} className="relative">
          <div className="pointer-events-none absolute start-1/2 top-8 hidden h-[calc(100%-2rem)] w-px -translate-x-1/2 bg-paper/10 md:block" aria-hidden />
          <div className="grid gap-4 md:grid-cols-3">
            {data.links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                dir={dir}
                className={`group relative flex flex-col border border-paper/15 bg-paper/[0.015] p-5 transition-colors hover:border-paper/30 hover:bg-paper/[0.03] ${fa ? "font-fa" : ""}`}
              >
                <span className="font-mono text-[9px] text-paper/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`mt-2 text-base text-paper group-hover:text-term ${fa ? "font-fa" : "font-pixel"}`}>
                  {link.title}
                </span>
                <p className="mt-2 flex-1 text-sm text-paper/55">{link.body}</p>
                <span className={`mt-4 font-mono text-[10px] ${accentText}`}>
                  {fa ? "←" : "→"}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
