"use client";

import Link from "next/link";
import { motion } from "motion/react";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import { methodPageDictionaries } from "@/i18n/method-page";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";

export default function MethodPage() {
  const { fa, dir, lang } = useT();
  const [skin] = usePanelSkin();
  const ai = skin === "modern";
  const ui = methodPageDictionaries[lang];
  const face = ai ? "font-iran" : fa ? "font-fa" : "";

  return (
    <div>
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        animate="show"
        className={`border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 ${ai ? "ai-section" : ""}`}
      >
        <div className={`mx-auto ${ai ? "max-w-7xl" : "max-w-6xl"}`}>
          {ai ? (
            <>
              <p className="ai-eyebrow mb-4" dir={dir}>
                {ui.eyebrow}
              </p>
              <h1 className="ai-display max-w-3xl text-paper" dir={dir}>
                {ui.title}
              </h1>
              <p className={`mt-5 max-w-2xl text-lg leading-relaxed text-paper/60 ${face}`} dir={dir}>
                {ui.lead}
              </p>
            </>
          ) : (
            <AboutSectionHeader eyebrow={ui.eyebrow} title={ui.title} subtitle={ui.lead} />
          )}
          <motion.div variants={itemReveal} className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contactus/request"
              className={
                ai
                  ? `rounded-xl bg-paper px-6 py-3 text-sm font-medium text-ink hover:bg-paper/90 ${face}`
                  : `border border-term/40 bg-term/10 px-5 py-2.5 text-xs uppercase tracking-wider text-term transition-colors hover:bg-term/20 ${fa ? "font-fa" : "font-mono"}`
              }
            >
              {ui.ctaPrimary}
            </Link>
            <Link
              href="/contactus/consultation"
              className={
                ai
                  ? `rounded-xl border border-paper/20 px-6 py-3 text-sm font-medium text-paper/65 hover:border-paper/40 hover:text-paper ${face}`
                  : `border border-paper/25 px-5 py-2.5 text-xs uppercase tracking-wider text-paper/65 transition-colors hover:border-paper/45 hover:text-paper ${fa ? "font-fa" : "font-mono"}`
              }
            >
              {ui.ctaSecondary}
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={`px-4 py-12 sm:px-6 sm:py-16 lg:px-8 ${ai ? "ai-section border-0" : ""}`}
      >
        <ol className={`mx-auto space-y-0 ${ai ? "max-w-3xl" : "max-w-6xl space-y-4"}`}>
          {ui.steps.map((step, i) => (
            <motion.li
              key={step.title}
              variants={itemReveal}
              dir={dir}
              className={
                ai
                  ? `ai-point border-0 border-t border-paper/10 py-10 ${face}`
                  : `border border-paper/15 bg-paper/[0.02] p-5 sm:p-6 ${fa ? "font-fa" : ""}`
              }
            >
              <div className="flex flex-wrap items-baseline gap-3">
                <span
                  className={ai ? "font-iran text-sm font-medium text-paper/30" : "font-mono text-[11px] text-term"}
                  dir="ltr"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2
                  className={
                    ai
                      ? "text-2xl font-semibold tracking-tight text-paper"
                      : `text-lg text-paper ${fa ? "font-fa" : "font-pixel"}`
                  }
                >
                  {step.title}
                </h2>
              </div>
              <p className={`mt-3 leading-relaxed text-paper/60 ${ai ? "text-base" : "text-sm text-paper/65"}`}>
                {step.body}
              </p>
              <p className={`mt-3 ${ai ? "text-sm text-paper/45" : `text-xs text-term/80 ${fa ? "font-fa" : "font-mono"}`}`}>
                {step.outcome}
              </p>
            </motion.li>
          ))}
        </ol>
      </motion.section>
    </div>
  );
}
