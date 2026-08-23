"use client";

import { motion } from "motion/react";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useCountUp } from "@/motion/useCountUp";
import { NumberTicker } from "@/components/shadcn-space/number-ticker/number-ticker-01";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";
import { useT } from "@/i18n/LangProvider";
import type { ProductStatItem } from "@/i18n/product-sub-extensions";

type Props = {
  eyebrow: string;
  items: ProductStatItem[];
  accentText?: string;
  active?: boolean;
};

function StatCell({
  stat,
  active,
  fa,
  bordered,
  accentText,
  ai,
}: {
  stat: ProductStatItem;
  active: boolean;
  fa: boolean;
  bordered?: boolean;
  accentText: string;
  ai: boolean;
}) {
  const { fd } = useT();
  const decimals = stat.decimals ?? 0;
  const count = useCountUp(stat.value, { start: !ai && active, duration: 750, decimals });
  const num = decimals > 0 ? count.toFixed(decimals) : String(Math.round(count));
  const terminalDisplay = `${stat.prefix ?? ""}${fa ? fd(num) : num}${stat.suffix}`;

  return (
    <motion.div
      variants={itemReveal}
      className={`min-w-0 px-3 py-1 sm:px-4 ${fa ? "text-right" : ""} ${
        bordered
          ? "relative max-sm:border-0 sm:before:absolute sm:before:inset-y-3 sm:before:w-px sm:before:bg-paper/10 sm:before:start-0 sm:before:content-['']"
          : ""
      }`}
    >
      <p
        className={`font-mono text-2xl leading-none tabular-nums sm:text-3xl ${accentText} ${ai ? "font-iran" : ""}`}
        dir="ltr"
      >
        {ai ? (
          <NumberTicker
            end={stat.value}
            decimals={decimals}
            prefix={stat.prefix ?? ""}
            suffix={stat.suffix}
            duration={2}
            active={active}
            inView
            formatValue={(n) => (fa ? fd(n) : n)}
          />
        ) : (
          terminalDisplay
        )}
      </p>
      <p className={`mt-2 text-sm text-paper/75 ${fa ? "font-fa" : ""}`}>{stat.label}</p>
      <p className={`mt-1 text-[10px] text-paper/38 sm:text-xs ${fa ? "font-fa" : "font-mono"}`}>{stat.note}</p>
    </motion.div>
  );
}

export default function ProductStatsStrip({
  eyebrow,
  items,
  accentText = "text-paper/85",
  active = true,
}: Props) {
  const { fa, dir } = useT();
  const [skin] = usePanelSkin();
  const ai = skin === "modern";

  return (
    <motion.section
      id="stats"
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className={`scroll-mt-24 border-b border-paper/20 bg-paper/[0.02] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 ${ai ? "ai-section" : ""}`}
    >
      <div className={`mx-auto ${ai ? "max-w-7xl" : "max-w-6xl"}`}>
        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mb-6 text-center text-[10px] uppercase tracking-widest text-paper/35 ${
            ai ? "ai-eyebrow font-iran normal-case" : fa ? "font-fa" : "font-mono"
          }`}
        >
          {eyebrow}
        </motion.p>
        <motion.div variants={moduleReveal} className="grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-y-0">
          {items.map((stat, index) => (
            <StatCell
              key={stat.id}
              stat={stat}
              active={active}
              fa={fa}
              ai={ai}
              bordered={index > 0}
              accentText={accentText}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
