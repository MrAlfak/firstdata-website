"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";

type FaqItem = { q: string; a: string };

type Props = {
  slug: string;
  eyebrow: string;
  title: string;
  items: FaqItem[];
};

export default function ProductFaq({ slug, eyebrow, title, items }: Props) {
  const { fa, dir } = useT();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
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
      className="scroll-mt-24 border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="mx-auto max-w-6xl">
        <AboutSectionHeader eyebrow={eyebrow} title={title} />
        <motion.div variants={itemReveal} className="divide-y divide-paper/10">
          {items.map((item, i) => {
            const isOpen = openFaq === i;
            const qId = `${slug}-faq-q-${i}`;
            const aId = `${slug}-faq-a-${i}`;
            return (
              <div key={item.q} className="py-4 sm:py-5">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  dir={dir}
                  id={qId}
                  aria-expanded={isOpen}
                  aria-controls={aId}
                  className={`flex w-full items-start justify-between gap-4 text-sm text-paper/80 transition-colors hover:text-paper ${fa ? "font-fa text-right" : "text-left"}`}
                >
                  <span>{item.q}</span>
                  <span className="mt-0.5 shrink-0 font-mono text-paper/30">{isOpen ? "[-]" : "[+]"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={aId}
                      role="region"
                      aria-labelledby={qId}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p dir={dir} className={`mt-3 text-sm leading-relaxed text-paper/50 ${fa ? "font-fa" : ""}`}>
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
