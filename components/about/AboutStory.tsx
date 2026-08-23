"use client";

import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import { useT } from "@/i18n/LangProvider";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";

export default function AboutStory() {
  const { fa, dir, d } = useT();
  const ui = d.aboutUi;
  const [skin] = usePanelSkin();
  const ai = skin === "modern";

  return (
    <>
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={`border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 ${ai ? "ai-section border-paper/10" : ""}`}
      >
        <div className="mx-auto max-w-6xl">
          <motion.blockquote
            variants={itemReveal}
            dir={dir}
            className={
              ai
                ? "relative max-w-4xl py-2"
                : "relative overflow-hidden border border-term/30 bg-gradient-to-br from-term/[0.08] via-paper/[0.02] to-transparent p-6 sm:p-10 lg:p-12"
            }
          >
            {!ai ? (
              <p className={`mb-3 font-mono text-[10px] text-term/50 ${fa ? "font-fa" : ""}`}>
                $ cat manifesto.txt
              </p>
            ) : null}
            <p
              className={
                ai
                  ? `ai-display font-iran text-2xl leading-snug tracking-tight text-paper sm:text-3xl lg:text-4xl`
                  : `max-w-4xl text-xl leading-snug tracking-tight text-paper sm:text-2xl lg:text-[1.75rem] lg:leading-snug ${fa ? "font-fa" : "font-pixel"}`
              }
            >
              {ui.manifesto}
            </p>
            {!ai ? (
              <span
                className="absolute bottom-4 end-4 animate-blink font-mono text-term/40"
                aria-hidden
              >
                ▮
              </span>
            ) : null}
          </motion.blockquote>
        </div>
      </motion.section>

      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={`border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 ${ai ? "ai-section border-paper/10" : ""}`}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ui.storyEyebrow} title={ui.storyTitle} />

          <motion.article
            variants={itemReveal}
            dir={dir}
            className={
              ai
                ? `mt-8 grid max-w-3xl gap-6 ${fa ? "font-iran" : "font-iran"}`
                : `grid gap-5 border border-paper/10 bg-paper/[0.015] p-5 sm:grid-cols-1 sm:p-8 lg:gap-6 ${fa ? "font-fa" : ""}`
            }
          >
            {ui.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className={
                  ai
                    ? "text-base leading-relaxed text-paper/65 sm:text-lg"
                    : "text-sm leading-relaxed text-paper/70 sm:text-base lg:text-[1.05rem] lg:leading-relaxed"
                }
              >
                {!ai ? (
                  <span className="me-3 inline-block font-mono text-[10px] text-term/45">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                ) : null}
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
        className={`border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 ${ai ? "ai-section border-paper/10" : ""}`}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ui.pillarsEyebrow} title={ui.pillarsTitle} />

          <div className="grid gap-4 md:grid-cols-3">
            {ui.pillars.map((pillar, i) => (
              <motion.div
                key={pillar.label}
                variants={itemReveal}
                dir={dir}
                className={
                  ai
                    ? `flex h-full flex-col rounded-2xl border border-paper/10 bg-paper/[0.03] p-5 sm:p-6 ${fa ? "font-iran" : "font-iran"}`
                    : "flex h-full flex-col border border-paper/20 bg-paper/[0.015] p-5 sm:p-6"
                }
              >
                {!ai ? (
                  <span className="mb-3 font-mono text-[10px] text-term/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                ) : null}
                <h3
                  className={
                    ai
                      ? "text-base font-medium text-paper"
                      : `text-base text-paper/90 ${fa ? "font-fa" : "font-pixel"}`
                  }
                >
                  {pillar.label}
                </h3>
                <p
                  className={`mt-3 flex-1 text-sm leading-relaxed text-paper/55 ${fa ? (ai ? "font-iran" : "font-fa") : ""}`}
                >
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
        className={`border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 ${ai ? "ai-section border-paper/10" : ""}`}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ui.capabilitiesEyebrow} title={ui.capabilitiesTitle} />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ui.capabilities.map((cap) => (
              <motion.div
                key={cap.tag}
                variants={itemReveal}
                dir={dir}
                className={
                  ai
                    ? `group rounded-2xl border border-paper/10 bg-paper/[0.03] p-5 transition-colors hover:border-paper/25 sm:p-6 ${fa ? "font-iran" : "font-iran"}`
                    : "group border border-paper/20 bg-paper/[0.015] p-5 transition-colors hover:border-term/30 sm:p-6"
                }
              >
                <span
                  className={
                    ai
                      ? "text-[11px] uppercase tracking-wider text-term/70"
                      : "font-mono text-[10px] text-amber/80"
                  }
                >
                  {cap.tag}
                </span>
                <h3
                  className={
                    ai
                      ? "mt-3 text-base font-medium text-paper"
                      : `mt-3 text-sm text-paper/90 sm:text-base ${fa ? "font-fa" : "font-pixel"}`
                  }
                >
                  {cap.title}
                </h3>
                <p className={`mt-2 text-sm leading-relaxed text-paper/55 ${fa ? (ai ? "font-iran" : "font-fa") : ""}`}>
                  {cap.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
}
