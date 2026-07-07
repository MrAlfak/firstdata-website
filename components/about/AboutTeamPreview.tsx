"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import { useT } from "@/i18n/LangProvider";

export default function AboutTeamPreview() {
  const { fa, dir, d } = useT();
  const block = d.aboutUi.teamPreview;

  return (
    <motion.section
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <AboutSectionHeader eyebrow={block.eyebrow} title={block.title} subtitle={block.subtitle} />

        <motion.div variants={itemReveal} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {block.roles.map((role, i) => (
            <div
              key={role.title}
              dir={dir}
              className={`border border-paper/15 bg-paper/[0.015] p-5 ${fa ? "font-fa" : ""}`}
            >
              <span className="font-mono text-[10px] text-term/55">{role.tag}</span>
              <span className="ms-2 font-mono text-[10px] text-paper/25">{String(i + 1).padStart(2, "0")}</span>
              <h3 className={`mt-3 text-sm text-paper/90 ${fa ? "font-fa" : "font-pixel"}`}>{role.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/55">{role.text}</p>
            </div>
          ))}
        </motion.div>

        <motion.div variants={itemReveal} className="mt-8">
          <Link
            href="/aboutus/team"
            dir={dir}
            className={`inline-flex items-center gap-2 border border-paper/20 px-5 py-3 text-sm text-paper/75 transition-colors hover:border-term/35 hover:text-paper ${fa ? "font-fa" : "font-mono"}`}
          >
            {block.cta}
            <span aria-hidden>{fa ? "←" : "→"}</span>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
