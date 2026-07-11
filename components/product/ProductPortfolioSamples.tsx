"use client";

import Link from "next/link";
import { motion } from "motion/react";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import PortfolioProjectCard from "@/components/portfolio/PortfolioProjectCard";
import { getProjectsForProduct } from "@/config/product-portfolio";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import type { ProductSlug } from "@/i18n/product-page";

type Props = {
  slug: ProductSlug;
  eyebrow: string;
  title: string;
  linkLabel: string;
  href: string;
  accentText?: string;
};

export default function ProductPortfolioSamples({
  slug,
  eyebrow,
  title,
  linkLabel,
  href,
  accentText = "text-term",
}: Props) {
  const { fa, dir } = useT();
  const projects = getProjectsForProduct(slug, 3);

  if (projects.length === 0) return null;

  return (
    <motion.section
      id="samples"
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="scroll-mt-24 border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <AboutSectionHeader eyebrow={eyebrow} title={title} />
        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemReveal}>
              <PortfolioProjectCard project={project} />
            </motion.div>
          ))}
        </div>
        <motion.div variants={itemReveal} className="mt-8">
          <Link
            href={href}
            dir={dir}
            className={`group inline-flex items-center gap-2 text-sm ${accentText} transition-opacity hover:opacity-80 ${fa ? "font-fa" : "font-mono"}`}
          >
            {linkLabel}
            <span aria-hidden>{fa ? "?" : "?"}</span>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
