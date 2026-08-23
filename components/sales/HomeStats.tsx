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

export default function HomeStats() {
  const { fa, dir, fd, d } = useT();
  const [skin] = usePanelSkin();
  const ai = skin === "modern";
  const block = d.home.stats;

  return (
    <motion.section
      id="stats"
      aria-label={block.eyebrow}
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
      className={`scroll-mt-16 border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-14 lg:px-8 ${ai ? "ai-section" : ""}`}
    >
      <div className="mx-auto max-w-7xl">
        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mb-8 text-center text-sm text-paper/40 ${
            ai ? "ai-eyebrow font-iran" : fa ? "font-fa" : ""
          }`}
        >
          {block.eyebrow}
        </motion.p>

        <motion.ul
          variants={itemReveal}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6 lg:gap-3 xl:gap-4"
          dir={dir}
        >
          {block.items.map((stat, i) => {
            const parsed = parseStatValue(stat.value);
            return (
              <motion.li
                key={i}
                variants={itemReveal}
                className={`group flex min-w-0 flex-col rounded-sm border border-paper/12 bg-paper/[0.02] px-3 py-4 transition-colors hover:border-term/25 hover:bg-paper/[0.04] sm:px-4 sm:py-5 lg:px-3 lg:py-4 xl:px-4 ${
                  ai ? "rounded-xl" : ""
                } ${fa ? "font-fa" : ""}`}
              >
                <p
                  className={`flex items-baseline gap-0.5 text-2xl leading-none tracking-tight text-term sm:text-3xl lg:text-2xl xl:text-3xl ${
                    ai ? "font-iran tabular-nums" : ""
                  }`}
                  dir="ltr"
                >
                  {ai ? (
                    <NumberTicker
                      end={parsed.end}
                      decimals={parsed.decimals}
                      suffix={stat.suffix ?? ""}
                      duration={2}
                      inView
                      formatValue={(n) => (fa ? fd(n) : n)}
                    />
                  ) : (
                    <>
                      <span>{fd(stat.value)}</span>
                      {stat.suffix ? (
                        <span className="text-xl text-term/80 sm:text-2xl lg:text-xl xl:text-2xl">
                          {fd(stat.suffix)}
                        </span>
                      ) : null}
                    </>
                  )}
                </p>
                <p className="mt-2 text-xs font-normal text-paper sm:text-sm lg:text-xs xl:text-sm">{stat.label}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-paper/45 sm:text-xs lg:text-[10px] xl:text-xs">
                  {stat.punchline}
                </p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </motion.section>
  );
}
