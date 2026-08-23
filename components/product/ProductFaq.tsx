"use client";

import { motion } from "motion/react";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import FaqAccordionList from "@/components/faq/FaqAccordionList";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";

type FaqItem = { q: string; a: string };

type Props = {
  slug: string;
  eyebrow: string;
  title: string;
  items: FaqItem[];
  maxItems?: number;
};

export default function ProductFaq({ slug, eyebrow, title, items, maxItems }: Props) {
  const [skin] = usePanelSkin();
  const ai = skin === "modern";
  const visibleItems = maxItems ? items.slice(0, maxItems) : items;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: visibleItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <motion.section
      id="faq"
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className={`scroll-mt-24 border-b px-4 py-12 sm:px-6 sm:py-16 lg:px-8 ${
        ai ? "ai-section border-paper/10" : "border-paper/20"
      }`}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className={`mx-auto ${ai ? "max-w-3xl" : "max-w-6xl"}`}>
        <AboutSectionHeader eyebrow={eyebrow} title={title} />
        <motion.div variants={itemReveal}>
          <FaqAccordionList items={visibleItems} idPrefix={`${slug}-faq`} defaultOpenIndex={0} />
        </motion.div>
      </div>
    </motion.section>
  );
}
