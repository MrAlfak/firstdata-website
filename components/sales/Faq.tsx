"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import { Decode } from "@/components/Decode";
import { useT } from "@/i18n/LangProvider";

export default function Faq() {
  const { fa, dir, d } = useT();
  const faq = d.faq;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <motion.section
      id="faq"
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px" }}
      className="scroll-mt-16 border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">

        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mb-4 text-[10px] txt-comment ${fa ? "font-fa" : "ascii"}`}
        >
          <Decode>{faq.eyebrow}</Decode>
        </motion.p>

        <motion.h2
          variants={itemReveal}
          dir={dir}
          className={`mb-8 text-2xl leading-tight tracking-tight sm:mb-10 sm:text-3xl lg:text-4xl ${fa ? "font-fa" : "font-pixel"}`}
        >
          {faq.title}
        </motion.h2>

        <motion.div
          variants={itemReveal}
          className="divide-y divide-paper/10"
        >
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="py-4 sm:py-5">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  dir={dir}
                  id={`faq-q-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  className={`flex w-full items-start justify-between gap-4 text-sm text-paper/80 transition-colors duration-200 hover:text-paper ${fa ? "font-fa text-right" : "text-left"}`}
                >
                  <span>{item.q}</span>
                  <span className="shrink-0 font-mono text-paper/30 mt-0.5">
                    {isOpen ? "[-]" : "[+]"}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
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
        </motion.div>

      </div>
    </motion.section>
  );
}
