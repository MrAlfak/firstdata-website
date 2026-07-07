"use client";

import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import { Decode } from "@/components/Decode";
import { useT } from "@/i18n/LangProvider";

export default function Testimonials() {
  const { fa, dir, d } = useT();
  const tmt = d.testimonials;

  return (
    <motion.section
      id="testimonials"
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
          <Decode>{tmt.eyebrow}</Decode>
        </motion.p>

        <motion.h2
          variants={itemReveal}
          dir={dir}
          className={`mb-8 text-2xl leading-tight tracking-tight sm:mb-12 sm:text-3xl lg:text-4xl ${fa ? "font-fa" : "font-pixel"}`}
        >
          {tmt.title}
        </motion.h2>

        <motion.div
          variants={itemReveal}
          className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {tmt.items.map((item, i) => (
            <div key={i} className="flex flex-col gap-4 border border-paper/10 bg-paper/[0.01] p-5 sm:p-6 transition-colors duration-200 hover:border-paper/25">
              {/* Terminal-style quote header */}
              <div className="flex items-center gap-2 border-b border-paper/10 pb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-term/60" />
                <span className="font-mono text-[9px] text-paper/25">{fa ? "بازخورد مشتری" : "client-feedback"}</span>
              </div>

              <p dir={dir} className={`text-sm leading-relaxed text-paper/70 flex-1 ${fa ? "font-fa" : ""}`}>
                &ldquo;{item.text}&rdquo;
              </p>

              <div className="border-t border-paper/10 pt-3">
                <p className={`text-xs tracking-wide text-paper ${fa ? "font-fa" : "font-pixel"}`}>{item.name}</p>
                <p dir={dir} className={`mt-0.5 text-[10px] text-paper/40 ${fa ? "font-fa" : ""}`}>{item.role}</p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
}
