"use client";

import Link from "next/link";
import { motion } from "motion/react";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import InnerPage from "@/components/layout/InnerPage";
import FinalCta from "@/components/sales/FinalCta";
import { ABOUTUS_CHILDREN } from "@/config/navigation";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import { aboutPartnersPageDictionaries } from "@/i18n/about-partners-page";

const sectionClass = "border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8";

export default function AboutPartnersPage() {
  const { fa, dir, lang, t } = useT();
  const ui = aboutPartnersPageDictionaries[lang];
  const links = ABOUTUS_CHILDREN.filter((item) => item.slug !== "partners");

  return (
    <>
      <InnerPage eyebrow={ui.hero.eyebrow} title={ui.hero.title} subtitle={ui.hero.lead} lines={[ui.hero.body]}>
        <Link
          href="/contactus/collaborate"
          dir={dir}
          className={`group inline-flex items-center gap-2 border border-sky/40 px-5 py-2.5 text-xs uppercase tracking-wider text-sky transition-colors duration-200 hover:bg-sky/10 ${fa ? "font-fa" : ""}`}
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
          <AboutSectionHeader eyebrow={ui.partnerTypes.eyebrow} title={ui.partnerTypes.title} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ui.partnerTypes.cards.map((card) => (
              <motion.article
                key={card.tag}
                variants={itemReveal}
                dir={dir}
                className={`border border-paper/15 bg-paper/[0.015] p-5 sm:p-6 ${fa ? "font-fa" : ""}`}
              >
                <span className="font-mono text-[10px] text-sky/70">{card.tag}</span>
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
          <AboutSectionHeader eyebrow={ui.alliances.eyebrow} title={ui.alliances.title} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ui.alliances.cards.map((card, index) => (
              <motion.article
                key={card.title}
                variants={itemReveal}
                dir={dir}
                className={`group border border-paper/15 bg-paper/[0.015] p-5 transition-colors hover:border-sky/35 sm:p-6 ${fa ? "font-fa" : ""}`}
              >
                <span className="font-mono text-[10px] text-sky/60">{String(index + 1).padStart(2, "0")}</span>
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
        <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <AboutSectionHeader eyebrow={ui.integration.eyebrow} title={ui.integration.title} />
            <motion.p
              variants={itemReveal}
              dir={dir}
              className={`max-w-2xl text-sm leading-relaxed text-paper/60 sm:text-base ${fa ? "font-fa" : ""}`}
            >
              {ui.integration.intro}
            </motion.p>
          </div>
          <motion.ul
            variants={itemReveal}
            dir={dir}
            className={`space-y-3 border border-paper/15 bg-paper/[0.015] p-5 sm:p-6 ${fa ? "font-fa" : ""}`}
          >
            {ui.integration.steps.map((step, index) => (
              <li key={step} className="flex gap-3 text-sm leading-relaxed text-paper/60">
                <span className="shrink-0 font-mono text-[10px] text-sky/65">[{String(index + 1).padStart(2, "0")}]</span>
                <span>{step}</span>
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
          <motion.div
            variants={itemReveal}
            dir={dir}
            className={`border border-sky/20 bg-sky/[0.04] p-6 sm:p-8 ${fa ? "font-fa" : ""}`}
          >
            <p className="text-[10px] txt-comment">{ui.becomePartner.eyebrow}</p>
            <h2 className={`mt-3 text-xl text-paper sm:text-2xl ${fa ? "font-fa" : "font-pixel"}`}>{ui.becomePartner.title}</h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-paper/65 sm:text-base">{ui.becomePartner.body}</p>
            <Link
              href="/contactus/collaborate"
              dir={dir}
              className={`mt-6 inline-flex items-center gap-2 border border-sky/40 px-5 py-3 text-sm text-sky transition-colors hover:bg-sky/10 ${fa ? "font-fa" : ""}`}
            >
              {ui.becomePartner.cta}
              <span aria-hidden>{fa ? "←" : "→"}</span>
            </Link>
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
                  className={`group flex items-center justify-between border border-paper/15 bg-paper/[0.015] px-4 py-3 text-sm transition-colors hover:border-sky/30 hover:bg-paper/[0.03] ${fa ? "font-fa" : ""}`}
                >
                  <span className="text-paper/75 group-hover:text-paper">{t(item.labelKey)}</span>
                  <span className="font-mono text-[10px] text-paper/35 group-hover:text-sky">
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
