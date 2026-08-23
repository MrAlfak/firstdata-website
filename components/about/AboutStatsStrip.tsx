"use client";

import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import { NumberTicker } from "@/components/shadcn-space/number-ticker/number-ticker-01";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";
import { useT } from "@/i18n/LangProvider";

/** Parse locale-aware digit strings ("۱۵۰", "99.9") into a ticker target. */
function parseStatValue(raw: string): { end: number; decimals: number } {
  const latin = raw
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
  const cleaned = latin.replace(/[^\d.]/g, "");
  const end = Number.parseFloat(cleaned);
  if (!Number.isFinite(end)) return { end: 0, decimals: 0 };
  const frac = cleaned.split(".")[1];
  return { end, decimals: frac?.length ?? 0 };
}

export default function AboutStatsStrip() {
  const { fa, dir, fd, d } = useT();
  const [skin] = usePanelSkin();
  const ai = skin === "modern";
  const block = d.aboutUi.statsStrip;

  return (
    <motion.section
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className={`border-b border-paper/20 bg-paper/[0.02] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 ${ai ? "ai-section" : ""}`}
    >
      <div className={`mx-auto ${ai ? "max-w-7xl" : "max-w-6xl"}`}>
        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mb-6 text-center text-[10px] uppercase tracking-widest text-paper/35 ${
            ai ? "ai-eyebrow font-iran normal-case" : fa ? "font-fa" : "font-mono"
          }`}
        >
          {block.eyebrow}
        </motion.p>
        <motion.ul
          variants={itemReveal}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
          dir={dir}
        >
          {block.items.map((item) => {
            const parsed = parseStatValue(item.value);
            return (
              <li
                key={item.label}
                className={`border border-paper/15 bg-paper/[0.015] px-4 py-5 transition-colors hover:border-term/25 ${
                  ai ? "rounded-xl border-paper/10" : ""
                } ${fa ? "font-fa" : ""}`}
              >
                <p
                  className={`font-mono text-2xl text-term sm:text-3xl ${ai ? "font-iran tabular-nums" : ""}`}
                  dir="ltr"
                >
                  {ai ? (
                    <NumberTicker
                      end={parsed.end}
                      decimals={parsed.decimals}
                      suffix={item.suffix ?? ""}
                      duration={2}
                      inView
                      formatValue={(n) => (fa ? fd(n) : n)}
                    />
                  ) : (
                    <>
                      {fd(item.value)}
                      {item.suffix ? (
                        <span className="text-xl text-term/75">{fd(item.suffix)}</span>
                      ) : null}
                    </>
                  )}
                </p>
                <p className="mt-2 text-sm text-paper/85">{item.label}</p>
                <p className="mt-1 text-[11px] text-paper/40">{item.note}</p>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </motion.section>
  );
}
