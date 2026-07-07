"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import InnerPage from "@/components/layout/InnerPage";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import FinalCta from "@/components/sales/FinalCta";
import { useT } from "@/i18n/LangProvider";

type Kind = "vision" | "mission";

type Props = {
  kind: Kind;
};

export default function AboutPurposePage({ kind }: Props) {
  const { fa, dir, d } = useT();
  const pageKey = kind === "vision" ? "aboutVision" : "aboutMission";
  const page = d.pages[pageKey];
  const ui = kind === "vision" ? d.visionUi : d.missionUi;
  const badge = kind === "vision" ? "VISION" : "MISSION";

  return (
    <>
      <InnerPage
        eyebrow={page.eyebrow}
        title={page.title}
        subtitle={page.subtitle}
        lines={page.lines}
      />

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
            className="relative overflow-hidden border border-amber/25 bg-gradient-to-br from-amber/[0.06] via-paper/[0.02] to-transparent p-6 sm:p-10"
          >
            <p className={`mb-3 font-mono text-[10px] text-amber/60 ${fa ? "font-fa" : ""}`}>{ui.quoteLabel}</p>
            <p className={`text-lg leading-relaxed text-paper sm:text-xl lg:text-2xl ${fa ? "font-fa" : "font-pixel"}`}>
              {ui.quote}
            </p>
            <span className="absolute bottom-4 end-4 font-mono text-[10px] text-paper/25">{badge}</span>
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
          <AboutSectionHeader eyebrow={ui.openingEyebrow} title={ui.openingTitle} />
          <motion.article
            variants={itemReveal}
            dir={dir}
            className={`space-y-5 border border-paper/10 bg-paper/[0.015] p-5 sm:p-8 ${fa ? "font-fa" : ""}`}
          >
            {ui.opening.map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-paper/70 sm:text-base lg:leading-relaxed">
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
          <AboutSectionHeader eyebrow={ui.beliefsEyebrow} title={ui.beliefsTitle} />
          <div className="grid gap-4 md:grid-cols-2">
            {ui.beliefs.map((belief, i) => (
              <motion.div
                key={belief.label}
                variants={itemReveal}
                dir={dir}
                className={`border border-paper/15 bg-paper/[0.015] p-5 sm:p-6 ${fa ? "font-fa" : ""}`}
              >
                <span className="font-mono text-[10px] text-term/50">{String(i + 1).padStart(2, "0")}</span>
                <h3 className={`mt-3 text-base text-paper/90 ${fa ? "font-fa" : "font-pixel"}`}>{belief.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/55">{belief.text}</p>
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
          <AboutSectionHeader eyebrow={ui.pillarsEyebrow} title={ui.pillarsTitle} />
          <div className="grid gap-4 sm:grid-cols-2">
            {ui.pillars.map((pillar) => (
              <motion.div
                key={pillar.tag}
                variants={itemReveal}
                dir={dir}
                className={`group border border-paper/20 bg-paper/[0.015] p-5 transition-colors hover:border-term/30 sm:p-6 ${fa ? "font-fa" : ""}`}
              >
                <span className="font-mono text-[10px] text-amber/80">{pillar.tag}</span>
                <h3 className={`mt-3 text-sm text-paper/90 sm:text-base ${fa ? "font-fa" : "font-pixel"}`}>
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/55">{pillar.text}</p>
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
          <AboutSectionHeader eyebrow={ui.commitmentEyebrow} title={ui.commitmentTitle} />
          <motion.div
            variants={itemReveal}
            dir={dir}
            className={`overflow-hidden border border-paper/20 ${fa ? "font-fa" : ""}`}
          >
            <div className="flex items-center gap-1.5 border-b border-paper/20 bg-paper/[0.04] px-3 py-2" dir="ltr">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]/70" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]/70" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]/70" />
              <span className="ms-auto font-mono text-[9px] text-paper/25">{badge.toLowerCase()}.commitments</span>
            </div>
            <ul className="space-y-0 divide-y divide-paper/10 bg-paper/[0.015] p-4 sm:p-6">
              {ui.commitments.map((item, i) => (
                <li key={i} className="flex gap-3 py-3 text-sm leading-relaxed text-paper/65 first:pt-0 last:pb-0 sm:text-base">
                  <span className="shrink-0 font-mono text-[10px] text-term/55">[{String(i + 1).padStart(2, "0")}]</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
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
          <motion.p
            variants={itemReveal}
            dir={dir}
            className={`mb-4 text-[10px] txt-comment ${fa ? "font-fa" : "ascii"}`}
          >
            {ui.closingEyebrow}
          </motion.p>
          <motion.p
            variants={itemReveal}
            dir={dir}
            className={`max-w-3xl text-base leading-relaxed text-paper/70 sm:text-lg ${fa ? "font-fa" : ""}`}
          >
            {ui.closing}
          </motion.p>

          <motion.div
            variants={itemReveal}
            className="mt-10 grid gap-4 sm:grid-cols-2"
          >
            <Link
              href={ui.relatedHref}
              dir={dir}
              className={`group flex h-full flex-col border border-paper/20 bg-paper/[0.015] p-5 transition-colors hover:border-term/35 sm:p-6 ${fa ? "font-fa" : ""}`}
            >
              <span className="font-mono text-[10px] text-term/45">{ui.relatedLabel}</span>
              <span className={`mt-3 text-base text-paper/90 ${fa ? "font-fa" : "font-pixel"}`}>{ui.relatedTitle}</span>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-paper/50">{ui.relatedDesc}</p>
              <span className={`mt-4 text-xs text-paper/35 group-hover:text-term ${fa ? "font-fa" : "font-mono"}`}>
                {fa ? "← ادامه مطلب" : "Read more →"}
              </span>
            </Link>
            <Link
              href="/aboutus"
              dir={dir}
              className={`group flex h-full flex-col border border-paper/20 bg-paper/[0.015] p-5 transition-colors hover:border-term/35 sm:p-6 ${fa ? "font-fa" : ""}`}
            >
              <span className="font-mono text-[10px] text-term/45">/aboutus</span>
              <span className={`mt-3 text-base text-paper/90 ${fa ? "font-fa" : "font-pixel"}`}>{ui.backAbout}</span>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-paper/50">{ui.backAboutDesc}</p>
              <span className={`mt-4 text-xs text-paper/35 group-hover:text-term ${fa ? "font-fa" : "font-mono"}`}>
                {fa ? "← بازگشت" : "Go back →"}
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <FinalCta plain />
    </>
  );
}
