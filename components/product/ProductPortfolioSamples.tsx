"use client";

import Link from "next/link";
import { motion } from "motion/react";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import PortfolioCaseFile from "@/components/portfolio/PortfolioCaseFile";
import { getProjectsForProduct } from "@/config/product-portfolio";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import { portfolioPageDictionaries } from "@/i18n/portfolio-page";
import type { ProductSlug } from "@/i18n/product-page";

type Props = {
  slug: ProductSlug;
  eyebrow: string;
  title: string;
  subtitle: string;
  linkLabel: string;
  href: string;
  accentText?: string;
  accentHover?: string;
  accentBorder?: string;
  limit?: number;
};

export default function ProductPortfolioSamples({
  slug,
  eyebrow,
  title,
  subtitle,
  linkLabel,
  href,
  accentText = "text-term",
  accentHover = "hover:border-term/35",
  accentBorder = "border-term/40",
  limit = 3,
}: Props) {
  const { fa, dir, lang } = useT();
  const cf = portfolioPageDictionaries[lang].caseFile;
  const projects = getProjectsForProduct(slug, limit);

  if (projects.length === 0) return null;

  const [flagship, ...rest] = projects;

  return (
    <motion.section
      id="samples"
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="scroll-mt-24 border-b border-paper/20 bg-ink px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <AboutSectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />

        <motion.div variants={itemReveal}>
          <PortfolioCaseFile
            project={flagship}
            variant="flagship"
            href={href}
            accentText={accentText}
            accentHover={accentHover}
            accentBorder={accentBorder}
          />
        </motion.div>

        {rest.length > 0 ? (
          <motion.div variants={itemReveal} className="mt-8">
            <p
              dir={dir}
              className={`mb-4 font-mono text-[10px] uppercase tracking-wider text-paper/35 ${fa ? "font-fa" : ""}`}
            >
              {cf.alsoShipped}
            </p>
            <div className={`grid gap-4 ${rest.length > 1 ? "sm:grid-cols-2" : ""}`}>
              {rest.map((project) => (
                <PortfolioCaseFile
                  key={project.id}
                  project={project}
                  variant="compact"
                  href={href}
                  accentText={accentText}
                  accentHover={accentHover}
                  accentBorder={accentBorder}
                />
              ))}
            </div>
          </motion.div>
        ) : null}

        <motion.div variants={itemReveal} className="mt-10 flex justify-center sm:justify-start">
          <Link
            href={href}
            dir={dir}
            className={`group inline-flex items-center gap-2 border px-5 py-3 text-xs uppercase tracking-wider transition-colors ${accentBorder} ${accentText} hover:bg-term/10 ${fa ? "font-fa" : "font-mono"}`}
          >
            {linkLabel}
            <span
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              {fa ? "←" : "→"}
            </span>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
