"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import InnerPage from "@/components/layout/InnerPage";
import PortfolioProjectCard from "@/components/portfolio/PortfolioProjectCard";
import FinalCta from "@/components/sales/FinalCta";
import type { PortfolioCategory } from "@/config/portfolio";
import { getProjectsByCategory } from "@/config/portfolio";
import { PORTFOLIO_CHILDREN } from "@/config/navigation";
import { useT } from "@/i18n/LangProvider";
import { portfolioPageDictionaries } from "@/i18n/portfolio-page";
import { portfolioSubPageDictionaries } from "@/i18n/portfolio-sub-page";

const sectionClass =
  "border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8";

type Props = {
  category: PortfolioCategory;
};

export default function PortfolioCategoryPage({ category }: Props) {
  const { fa, dir, lang, t } = useT();
  const ui = portfolioSubPageDictionaries[lang][category];
  const mainLabels = portfolioPageDictionaries[lang].categoryLabels;
  const projects = getProjectsByCategory(category);
  const otherCategories = PORTFOLIO_CHILDREN.filter((c) => c.slug !== category);

  return (
    <>
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
          {ui.cta}
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            {fa ? "←" : "->"}
          </span>
        </Link>
      </InnerPage>

      {/* Projects */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader
            eyebrow={ui.projects.eyebrow}
            title={ui.projects.title}
            subtitle={ui.projects.subtitle}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <motion.div key={project.id} variants={itemReveal}>
                <PortfolioProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Capabilities */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ui.capabilities.eyebrow} title={ui.capabilities.title} />
          <motion.ul
            variants={itemReveal}
            dir={dir}
            className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-3 ${fa ? "font-fa" : ""}`}
          >
            {ui.capabilities.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 border border-paper/10 bg-paper/[0.015] px-4 py-3 text-sm text-paper/75"
              >
                <span className="text-term/80" aria-hidden>
                  ✓
                </span>
                {item}
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.section>

      {/* Tech */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ui.tech.eyebrow} title={ui.tech.title} />
          <motion.div variants={itemReveal} className="flex flex-wrap gap-2">
            {ui.tech.tags.map((tag) => (
              <span
                key={tag}
                className="border border-term/15 bg-term/[0.02] px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-paper/70"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Cross-nav */}
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
            {otherCategories.map((child) => (
              <motion.div key={child.slug} variants={itemReveal}>
                <Link
                  href={child.href}
                  dir={dir}
                  className={`group flex items-center justify-between border border-paper/15 bg-paper/[0.015] px-4 py-3 text-sm transition-colors hover:border-term/30 hover:bg-paper/[0.03] ${fa ? "font-fa" : ""}`}
                >
                  <span className="text-paper/75 group-hover:text-paper">
                    {mainLabels[child.slug as PortfolioCategory] ?? t(child.labelKey)}
                  </span>
                  <span className="font-mono text-[10px] text-paper/35 group-hover:text-term">
                    {ui.crossNav.linkLabel} {fa ? "←" : "→"}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <FinalCta />
    </>
  );
}
