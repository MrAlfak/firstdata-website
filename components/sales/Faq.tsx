"use client";

import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import { Decode } from "@/components/Decode";
import FaqAccordionList from "@/components/faq/FaqAccordionList";
import { useT } from "@/i18n/LangProvider";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";

export default function Faq() {
  const { fa, dir, d } = useT();
  const [skin] = usePanelSkin();
  const ai = skin === "modern";
  const faq = d.faq;

  return (
    <motion.section
      id="faq"
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px" }}
      className={`scroll-mt-16 border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 ${ai ? "ai-section" : ""}`}
    >
      <div className={`mx-auto ${ai ? "max-w-3xl" : "max-w-6xl"}`}>
        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mb-4 text-[10px] txt-comment ${ai ? "ai-eyebrow text-sm" : fa ? "font-fa" : "ascii"}`}
        >
          {ai ? faq.eyebrow : <Decode>{faq.eyebrow}</Decode>}
        </motion.p>

        <motion.h2
          variants={itemReveal}
          dir={dir}
          className={
            ai
              ? "ai-display mb-10 text-paper sm:mb-12"
              : `mb-8 text-2xl leading-tight tracking-tight sm:mb-10 sm:text-3xl lg:text-4xl ${fa ? "font-fa" : "font-pixel"}`
          }
        >
          {faq.title}
        </motion.h2>

        <motion.div variants={itemReveal}>
          <FaqAccordionList items={faq.items} idPrefix="faq" defaultOpenIndex={null} />
        </motion.div>
      </div>
    </motion.section>
  );
}
