"use client";

import Link from "next/link";
import { motion } from "motion/react";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import InnerPage from "@/components/layout/InnerPage";
import FinalCta from "@/components/sales/FinalCta";
import { ABOUTUS_CHILDREN } from "@/config/navigation";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import { aboutHonorsPageDictionaries } from "@/i18n/about-honors-page";

const sectionClass = "border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8";

export default function AboutHonorsPage() {
  const { fa, dir, fd, lang, t } = useT();
  const ui = aboutHonorsPageDictionaries[lang];
  const links = ABOUTUS_CHILDREN.filter((item) => item.slug !== "honors");

  return (
    <>
      <InnerPage eyebrow={ui.hero.eyebrow} title={ui.hero.title} subtitle={ui.hero.lead} lines={[ui.hero.body]} />

      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className="border-b border-paper/20 bg-paper/[0.02] px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ui.stats.eyebrow} title={ui.stats.title} />
          <motion.ul variants={itemReveal} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" dir={dir}>
            {ui.stats.items.map((item) => (
              <li
                key={item.label}
                className={`border border-paper/15 bg-paper/[0.015] px-4 py-5 transition-colors hover:border-amber/25 ${fa ? "font-fa" : ""}`}
              >
                <p className="font-mono text-3xl text-amber" dir="ltr">
                  {fd(item.value)}
                  {item.suffix ? <span className="text-xl text-amber/75">{fd(item.suffix)}</span> : null}
                </p>
                <p className="mt-2 text-sm text-paper/85">{item.label}</p>
                <p className="mt-1 text-[11px] text-paper/40">{item.note}</p>
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.section>

      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ui.timeline.eyebrow} title={ui.timeline.title} />
          <div className="space-y-4">
            {ui.timeline.items.map((item) => (
              <motion.article
                key={`${item.year}-${item.title}`}
                variants={itemReveal}
                dir={dir}
                className={`grid gap-4 border border-paper/15 bg-paper/[0.015] p-5 sm:grid-cols-[120px_1fr] sm:p-6 ${fa ? "font-fa" : ""}`}
              >
                <div className="font-mono text-lg text-amber" dir="ltr">
                  {fd(item.year)}
                </div>
                <div>
                  <h3 className={`text-base text-paper/90 ${fa ? "font-fa" : "font-pixel"}`}>{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper/55">{item.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ui.recognition.eyebrow} title={ui.recognition.title} />
          <div className="grid gap-4 md:grid-cols-3">
            {ui.recognition.cards.map((card, index) => (
              <motion.article
                key={card.title}
                variants={itemReveal}
                dir={dir}
                className={`border border-paper/15 bg-paper/[0.015] p-5 sm:p-6 ${fa ? "font-fa" : ""}`}
              >
                <span className="font-mono text-[10px] text-amber/70">{String(index + 1).padStart(2, "0")}</span>
                <h3 className={`mt-3 text-base text-paper/90 ${fa ? "font-fa" : "font-pixel"}`}>{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/55">{card.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <motion.blockquote
            variants={itemReveal}
            dir={dir}
            className={`border border-amber/20 bg-amber/[0.04] p-6 sm:p-8 ${fa ? "font-fa" : ""}`}
          >
            <p className="text-[10px] txt-comment">{ui.trust.eyebrow}</p>
            <h2 className={`mt-3 text-xl text-paper sm:text-2xl ${fa ? "font-fa" : "font-pixel"}`}>{ui.trust.title}</h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-paper/65 sm:text-base">{ui.trust.body}</p>
            <ul className="mt-6 space-y-3">
              {ui.trust.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-paper/60">
                  <span className="text-amber/75" aria-hidden>
                    ▸
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.blockquote>
        </div>
      </motion.section>

      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ui.crossNav.eyebrow} title={ui.crossNav.title} />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {links.map((item) => (
              <motion.div key={item.slug} variants={itemReveal}>
                <Link
                  href={item.href}
                  dir={dir}
                  className={`group flex items-center justify-between border border-paper/15 bg-paper/[0.015] px-4 py-3 text-sm transition-colors hover:border-amber/30 hover:bg-paper/[0.03] ${fa ? "font-fa" : ""}`}
                >
                  <span className="text-paper/75 group-hover:text-paper">{t(item.labelKey)}</span>
                  <span className="font-mono text-[10px] text-paper/35 group-hover:text-amber">
                    {ui.crossNav.linkLabel} {fa ? "←" : "→"}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <FinalCta plain />
    </>
  );
}
