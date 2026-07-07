"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import { useT } from "@/i18n/LangProvider";

export default function AboutHonorsPreview() {
  const { fa, dir, fd, d } = useT();
  const block = d.aboutUi.honorsPreview;

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

        <motion.div variants={itemReveal} className="grid gap-4 sm:grid-cols-3">
          {block.items.map((item) => (
            <div
              key={item.label}
              dir={dir}
              className={`border border-paper/15 bg-paper/[0.015] p-5 sm:p-6 ${fa ? "font-fa" : ""}`}
            >
              <p className="font-mono text-3xl text-term">{fd(item.value)}</p>
              <p className="mt-2 text-sm font-normal text-paper/85">{item.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-paper/50">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        <motion.div variants={itemReveal} className="mt-8">
          <Link
            href="/aboutus/honors"
            dir={dir}
            className={`inline-flex items-center gap-2 text-sm text-term/80 transition-colors hover:text-term ${fa ? "font-fa" : "font-mono"}`}
          >
            {block.cta}
            <span aria-hidden>{fa ? "←" : "→"}</span>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
