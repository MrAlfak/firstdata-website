"use client";

import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import { useT } from "@/i18n/LangProvider";

export default function AboutStory() {
  const { fa, dir, d } = useT();
  const ui = d.aboutUi;

  return (
    <>
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className="border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <motion.blockquote
            variants={itemReveal}
            dir={dir}
            className="relative overflow-hidden border border-term/30 bg-gradient-to-br from-term/[0.08] via-paper/[0.02] to-transparent p-6 sm:p-10 lg:p-12"
          >
            <p className={`mb-3 font-mono text-[10px] text-term/50 ${fa ? "font-fa" : ""}`}>$ cat manifesto.txt</p>
            <p
              className={`max-w-4xl text-xl leading-snug tracking-tight text-paper sm:text-2xl lg:text-[1.75rem] lg:leading-snug ${fa ? "font-fa" : "font-pixel"}`}
            >
              {ui.manifesto}
            </p>
            <span className="absolute bottom-4 end-4 animate-blink font-mono text-term/40" aria-hidden>
              ▮
            </span>
          </motion.blockquote>
        </div>
      </motion.section>

      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className="border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ui.storyEyebrow} title={ui.storyTitle} />

          <motion.article
            variants={itemReveal}
            dir={dir}
            className={`grid gap-5 border border-paper/10 bg-paper/[0.015] p-5 sm:grid-cols-1 sm:p-8 lg:gap-6 ${fa ? "font-fa" : ""}`}
          >
            {ui.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-paper/70 sm:text-base lg:text-[1.05rem] lg:leading-relaxed">
                <span className="me-3 inline-block font-mono text-[10px] text-term/45">{String(i + 1).padStart(2, "0")}</span>
                {paragraph}
              </p>
            ))}
          </motion.article>
        </div>
      </motion.section>

      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className="border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ui.pillarsEyebrow} title={ui.pillarsTitle} />

          <div className="grid gap-4 md:grid-cols-3">
            {ui.pillars.map((pillar, i) => (
              <motion.div
                key={pillar.label}
                variants={itemReveal}
                dir={dir}
                className="flex h-full flex-col border border-paper/20 bg-paper/[0.015] p-5 sm:p-6"
              >
                <span className="mb-3 font-mono text-[10px] text-term/50">{String(i + 1).padStart(2, "0")}</span>
                <h3 className={`text-base text-paper/90 ${fa ? "font-fa" : "font-pixel"}`}>{pillar.label}</h3>
                <p className={`mt-3 flex-1 text-sm leading-relaxed text-paper/55 ${fa ? "font-fa" : ""}`}>
                  {pillar.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className="border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ui.capabilitiesEyebrow} title={ui.capabilitiesTitle} />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ui.capabilities.map((cap) => (
              <motion.div
                key={cap.tag}
                variants={itemReveal}
                dir={dir}
                className="group border border-paper/20 bg-paper/[0.015] p-5 transition-colors hover:border-term/30 sm:p-6"
              >
                <span className="font-mono text-[10px] text-amber/80">{cap.tag}</span>
                <h3 className={`mt-3 text-sm text-paper/90 sm:text-base ${fa ? "font-fa" : "font-pixel"}`}>
                  {cap.title}
                </h3>
                <p className={`mt-2 text-sm leading-relaxed text-paper/55 ${fa ? "font-fa" : ""}`}>{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
}
