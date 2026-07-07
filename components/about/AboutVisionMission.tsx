"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import { useT } from "@/i18n/LangProvider";

export default function AboutVisionMission() {
  const { fa, dir, d } = useT();
  const block = d.aboutUi.visionMission;

  const cards = [
    { key: "vision", data: block.vision, href: "/aboutus/vision" },
    { key: "mission", data: block.mission, href: "/aboutus/mission" },
  ] as const;

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

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          {cards.map(({ key, data, href }) => (
            <motion.div
              key={key}
              variants={itemReveal}
              dir={dir}
              className={`group flex h-full flex-col border border-paper/20 bg-gradient-to-br from-paper/[0.03] to-transparent p-6 sm:p-8 ${fa ? "font-fa" : ""}`}
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-amber/70">
                {key === "vision" ? "VISION" : "MISSION"}
              </span>
              <h3 className={`mt-4 text-lg text-paper sm:text-xl ${fa ? "font-fa" : "font-pixel"}`}>{data.title}</h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-paper/60 sm:text-base">{data.text}</p>
              <Link
                href={href}
                className={`mt-6 inline-flex items-center gap-2 text-sm text-term/80 transition-colors hover:text-term ${fa ? "font-fa" : "font-mono"}`}
              >
                {data.linkLabel}
                <span aria-hidden>{fa ? "←" : "→"}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
