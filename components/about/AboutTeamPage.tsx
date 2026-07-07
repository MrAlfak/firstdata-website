"use client";

import Link from "next/link";
import { motion } from "motion/react";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import InnerPage from "@/components/layout/InnerPage";
import FinalCta from "@/components/sales/FinalCta";
import { ABOUTUS_CHILDREN } from "@/config/navigation";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import { aboutTeamPageDictionaries } from "@/i18n/about-team-page";

const sectionClass = "border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8";

export default function AboutTeamPage() {
  const { fa, dir, lang, t } = useT();
  const ui = aboutTeamPageDictionaries[lang];
  const links = ABOUTUS_CHILDREN.filter((item) => item.slug !== "team");

  return (
    <>
      <InnerPage eyebrow={ui.hero.eyebrow} title={ui.hero.title} subtitle={ui.hero.lead} lines={[ui.hero.body]}>
        <Link
          href="/contactus/collaborate"
          dir={dir}
          className={`group inline-flex items-center gap-2 border border-term/40 px-5 py-2.5 text-xs uppercase tracking-wider text-term transition-colors duration-200 hover:bg-term/10 ${fa ? "font-fa" : ""}`}
        >
          {ui.hero.cta}
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">{fa ? "←" : "->"}</span>
        </Link>
      </InnerPage>

      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ui.culture.eyebrow} title={ui.culture.title} />
          <div className="grid gap-4 md:grid-cols-3">
            {ui.culture.items.map((item, index) => (
              <motion.article
                key={item.title}
                variants={itemReveal}
                dir={dir}
                className={`border border-paper/15 bg-paper/[0.015] p-5 sm:p-6 ${fa ? "font-fa" : ""}`}
              >
                <span className="font-mono text-[10px] text-term/55">{String(index + 1).padStart(2, "0")}</span>
                <h3 className={`mt-3 text-base text-paper/90 ${fa ? "font-fa" : "font-pixel"}`}>{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/55">{item.body}</p>
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
          <AboutSectionHeader eyebrow={ui.disciplines.eyebrow} title={ui.disciplines.title} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ui.disciplines.cards.map((card) => (
              <motion.article
                key={card.tag}
                variants={itemReveal}
                dir={dir}
                className={`group border border-paper/15 bg-paper/[0.015] p-5 transition-colors hover:border-term/35 ${fa ? "font-fa" : ""}`}
              >
                <span className="font-mono text-[10px] text-term/65">{card.tag}</span>
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
        <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <AboutSectionHeader eyebrow={ui.squadModel.eyebrow} title={ui.squadModel.title} />
            <motion.p
              variants={itemReveal}
              dir={dir}
              className={`max-w-2xl text-sm leading-relaxed text-paper/60 sm:text-base ${fa ? "font-fa" : ""}`}
            >
              {ui.squadModel.intro}
            </motion.p>
          </div>
          <motion.ul
            variants={itemReveal}
            dir={dir}
            className={`space-y-0 divide-y divide-paper/10 border border-paper/15 bg-paper/[0.015] p-5 sm:p-6 ${fa ? "font-fa" : ""}`}
          >
            {ui.squadModel.items.map((item, index) => (
              <li key={item} className="flex gap-3 py-3 text-sm leading-relaxed text-paper/60 first:pt-0 last:pb-0">
                <span className="shrink-0 font-mono text-[10px] text-term/55">[{String(index + 1).padStart(2, "0")}]</span>
                <span>{item}</span>
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
          <AboutSectionHeader eyebrow={ui.principles.eyebrow} title={ui.principles.title} />
          <motion.div variants={itemReveal} dir={dir} className={`grid gap-3 sm:grid-cols-2 ${fa ? "font-fa" : ""}`}>
            {ui.principles.items.map((item) => (
              <div key={item} className="border border-paper/12 bg-paper/[0.015] px-4 py-4 text-sm leading-relaxed text-paper/65">
                <span className="me-2 text-term/75" aria-hidden>
                  ✓
                </span>
                {item}
              </div>
            ))}
          </motion.div>
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
                  className={`group flex items-center justify-between border border-paper/15 bg-paper/[0.015] px-4 py-3 text-sm transition-colors hover:border-term/30 hover:bg-paper/[0.03] ${fa ? "font-fa" : ""}`}
                >
                  <span className="text-paper/75 group-hover:text-paper">{t(item.labelKey)}</span>
                  <span className="font-mono text-[10px] text-paper/35 group-hover:text-term">
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
