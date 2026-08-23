"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ModernAccordionCard } from "@/components/shadcn-space/accordion/accordion-04";
import { useT } from "@/i18n/LangProvider";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";

export type FaqAccordionItem = { q: string; a: string };

type Props = {
  items: FaqAccordionItem[];
  /** Prefix for terminal a11y ids, e.g. `faq`, `shop-faq`, `web-faq`. */
  idPrefix: string;
  /** Terminal + modern: which item starts open. `null` = all closed. */
  defaultOpenIndex?: number | null;
  className?: string;
};

/**
 * Skin-aware FAQ list: accordion-04 card in modern, existing +/- list in terminal.
 */
export default function FaqAccordionList({
  items,
  idPrefix,
  defaultOpenIndex = 0,
  className,
}: Props) {
  const { fa, dir } = useT();
  const [skin] = usePanelSkin();
  const ai = skin === "modern";
  const [openFaq, setOpenFaq] = useState<number | null>(defaultOpenIndex ?? null);

  if (ai) {
    return (
      <ModernAccordionCard
        className={`max-w-none font-iran ${className ?? ""}`}
        items={items.map((item) => ({ question: item.q, answer: item.a }))}
        defaultOpenIndex={defaultOpenIndex}
      />
    );
  }

  return (
    <div className={`divide-y divide-paper/10 ${className ?? ""}`}>
      {items.map((item, i) => {
        const isOpen = openFaq === i;
        const qId = `${idPrefix}-q-${i}`;
        const aId = `${idPrefix}-a-${i}`;
        return (
          <div key={item.q} className="py-4 sm:py-5">
            <button
              type="button"
              onClick={() => setOpenFaq(isOpen ? null : i)}
              dir={dir}
              id={qId}
              aria-expanded={isOpen}
              aria-controls={aId}
              className={`flex w-full items-start justify-between gap-4 text-sm text-paper/80 transition-colors hover:text-paper ${
                fa ? "font-fa text-right" : "text-left"
              }`}
            >
              <span>{item.q}</span>
              <span className="mt-0.5 shrink-0 font-mono text-paper/30">
                {isOpen ? "[-]" : "[+]"}
              </span>
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
                  <p
                    dir={dir}
                    className={`mt-3 text-sm leading-relaxed text-paper/50 ${fa ? "font-fa" : ""}`}
                  >
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
