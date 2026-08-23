"use client";

import { motion } from "motion/react";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useCountUp } from "@/motion/useCountUp";
import { NumberTicker } from "@/components/shadcn-space/number-ticker/number-ticker-01";
import { useT } from "@/i18n/LangProvider";

type TrustItem = {
  id: string;
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  note: string;
  decimals?: number;
};

function TrustStat({
  stat,
  active,
  fa,
  bordered,
  ai,
}: {
  stat: TrustItem;
  active: boolean;
  fa: boolean;
  bordered?: boolean;
  ai?: boolean;
}) {
  const { fd } = useT();
  const decimals = stat.decimals ?? 0;
  const count = useCountUp(stat.value, {
    start: !ai && active,
    duration: 750,
    decimals,
  });

  const num =
    decimals > 0 ? count.toFixed(decimals) : String(Math.round(count));
  const terminalDisplay = `${stat.prefix ?? ""}${fa ? fd(num) : num}${stat.suffix}`;

  const valueClass = `leading-none tabular-nums ${
    stat.id === "uptime"
      ? "txt-live"
      : stat.id === "projects"
        ? "text-paper"
        : "text-paper/85"
  } ${
    fa
      ? "font-mono text-2xl sm:text-3xl"
      : ai
        ? "font-iran text-2xl sm:text-3xl md:text-[1.85rem]"
        : "font-pixel text-xl sm:text-2xl md:text-[1.65rem]"
  }`;

  return (
    <motion.div
      variants={itemReveal}
      className={`group min-w-0 px-3 py-1 sm:px-4 ${fa ? "text-right" : ""} ${
        bordered
          ? "relative max-sm:border-0 sm:before:absolute sm:before:inset-y-3 sm:before:w-px sm:before:bg-paper/10 sm:before:start-0 sm:before:content-['']"
          : ""
      }`}
    >
      <p className={valueClass} dir="ltr">
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
      <p
        className={`mt-2 flex items-center gap-1.5 text-sm leading-snug text-paper/75 sm:text-base ${
          fa ? "flex-row-reverse justify-end font-fa" : ""
        }`}
      >
        <span className="shrink-0 font-mono text-[10px] txt-dim" aria-hidden>
          ▸
        </span>
        {stat.label}
      </p>
      <p
        className={`mt-1 text-[10px] leading-snug text-paper/38 sm:text-xs ${
          fa ? "pe-0 ps-0 font-fa" : "ps-4 font-mono tracking-wide"
        }`}
        dir={fa ? "rtl" : "ltr"}
      >
        {stat.note}
      </p>
    </motion.div>
  );
}

export default function HeroTrustStats({ active, ai = false }: { active: boolean; ai?: boolean }) {
  const { fa, dir, d } = useT();
  const trust = d.trust;
  const staggerVariants = ai
    ? {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.1, delayChildren: 0.15 },
        },
      }
    : moduleReveal;

  return (
    <motion.div
      variants={staggerVariants}
      initial="hidden"
      animate={active ? "show" : "hidden"}
      dir={dir}
      className="mt-8 border-t border-paper/15 pt-6 sm:mt-10 sm:pt-7"
    >
      <motion.p
        variants={itemReveal}
        className={`mb-5 text-[10px] tracking-widest txt-comment sm:mb-6 ${
          ai ? (fa ? "font-iran normal-case" : "font-iran normal-case") : fa ? "font-fa uppercase" : "font-mono uppercase"
        }`}
      >
        {trust.eyebrow}
      </motion.p>

      <motion.div variants={staggerVariants} className="grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-y-0">
        {trust.items.map((stat, index) => (
          <TrustStat
            key={stat.id}
            stat={stat}
            active={active}
            fa={fa}
            ai={ai}
            bordered={index > 0}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
