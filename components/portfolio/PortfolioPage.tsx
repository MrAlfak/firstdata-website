"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import InnerPage from "@/components/layout/InnerPage";
import PortfolioProjectCard from "@/components/portfolio/PortfolioProjectCard";
import FinalCta from "@/components/sales/FinalCta";
import { getFeaturedProjects } from "@/config/portfolio";
import { useT } from "@/i18n/LangProvider";
import { portfolioPageDictionaries } from "@/i18n/portfolio-page";

const sectionClass =
  "border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8";

export default function PortfolioPage() {
  const { fa, dir, lang, fd } = useT();
  const ui = portfolioPageDictionaries[lang];
  const featured = getFeaturedProjects();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: ui.hero.title,
    description: ui.hero.body,
    itemListElement: featured.map((project, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: project.title[lang],
      description: project.description[lang],
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <InnerPage
        eyebrow={ui.hero.eyebrow}
        title={ui.hero.title}
        subtitle={ui.hero.lead}
        lines={[ui.hero.body]}
      >
        <Link
          href="/contactus/request"
          dir={dir}
          className={`group inline-flex items-center gap-2 border border-term/40 px-5 py-2.5 text-xs uppercase tracking-wider text-term transition-colors duration-200 hover:bg-term/10 ${fa ? "font-fa" : ""}`}
        >
          {ui.hero.cta}
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            {fa ? "←" : "->"}
          </span>
        </Link>
      </InnerPage>

      {/* Stats */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className="border-b border-paper/20 bg-paper/[0.02] px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <motion.p
            variants={itemReveal}
            dir={dir}
            className={`mb-6 text-center text-[10px] uppercase tracking-widest text-paper/35 ${fa ? "font-fa" : "font-mono"}`}
          >
            {ui.stats.eyebrow}
          </motion.p>
          <motion.ul
            variants={itemReveal}
            className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
            dir={dir}
          >
            {ui.stats.items.map((item) => (
              <li
                key={item.label}
                className={`border border-paper/15 bg-paper/[0.015] px-4 py-5 transition-colors hover:border-term/25 ${fa ? "font-fa" : ""}`}
              >
                <p className="font-mono text-2xl text-term sm:text-3xl" dir="ltr">
                  {fd(item.value)}
                  {item.suffix ? (
                    <span className="text-xl text-term/75">{fd(item.suffix)}</span>
                  ) : null}
                </p>
                <p className="mt-2 text-sm text-paper/85">{item.label}</p>
                <p className="mt-1 text-[11px] text-paper/40">{item.note}</p>
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.section>

      {/* Categories */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ui.categories.eyebrow} title={ui.categories.title} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ui.categories.cards.map((card) => (
              <motion.div key={card.slug} variants={itemReveal}>
                <Link
                  href={`/portfolio/${card.slug}`}
                  dir={dir}
                  className={`group flex h-full flex-col border border-paper/20 bg-paper/[0.015] p-5 transition-colors hover:border-term/35 hover:bg-paper/[0.03] ${fa ? "font-fa" : ""}`}
                >
                  <span className="text-2xl" aria-hidden>
                    {card.icon}
                  </span>
                  <span className="font-mono text-[10px] text-term/45">/{card.slug}</span>
                  <span className={`mt-3 text-base text-paper/90 ${fa ? "font-fa" : "font-pixel"}`}>
                    {card.title}
                  </span>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-paper/50">{card.desc}</p>
                  <span
                    className={`mt-4 text-xs text-paper/35 group-hover:text-term ${fa ? "font-fa" : "font-mono"}`}
                  >
                    {card.linkLabel} {fa ? "←" : "→"}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader
            eyebrow={ui.featured.eyebrow}
            title={ui.featured.title}
            subtitle={ui.featured.subtitle}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <motion.div key={project.id} variants={itemReveal}>
                <PortfolioProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Approach */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ui.approach.eyebrow} title={ui.approach.title} />
          <div className="grid gap-4 sm:grid-cols-2">
            {ui.approach.items.map((item) => (
              <motion.article
                key={item.title}
                variants={itemReveal}
                dir={dir}
                className={`border border-paper/12 bg-paper/[0.015] p-5 sm:p-6 ${fa ? "font-fa" : ""}`}
              >
                <h3 className="text-sm text-paper/85">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/55">{item.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Privacy */}
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
            className={`border border-paper/15 bg-paper/[0.02] p-6 sm:p-8 ${fa ? "font-fa" : ""}`}
          >
            <h2 className="text-sm text-paper/80">{ui.privacy.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-paper/55">{ui.privacy.body}</p>
          </motion.blockquote>
        </div>
      </motion.section>

      <FinalCta />
    </>
  );
}
