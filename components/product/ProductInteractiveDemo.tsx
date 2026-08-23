"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import { PRODUCT_DEMO_STEPS } from "@/config/product-case-studies";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";
import {
  AnimatedTabs,
  type AnimatedTabItem,
} from "@/components/shadcn-space/tabs/tabs-08";
import type { ProductSlug } from "@/i18n/product-page";

type Props = {
  slug: ProductSlug;
  eyebrow: string;
  title: string;
  subtitle: string;
  accentText?: string;
  accentBorder?: string;
};

export default function ProductInteractiveDemo({
  slug,
  eyebrow,
  title,
  subtitle,
  accentText = "text-term",
  accentBorder = "border-term/35",
}: Props) {
  const { fa, dir, lang } = useT();
  const [skin] = usePanelSkin();
  const ai = skin === "modern";
  const steps = PRODUCT_DEMO_STEPS[lang][slug];
  const [active, setActive] = useState(steps[0]?.id ?? "1");
  const current = steps.find((s) => s.id === active) ?? steps[0];

  const modernTabs: AnimatedTabItem[] = useMemo(
    () =>
      steps.map((step) => ({
        value: step.id,
        label: step.title,
        content: (
          <div
            dir={dir}
            className={`rounded-2xl border border-paper/15 bg-paper/[0.03] p-5 sm:p-6 ${
              fa ? "font-iran" : "font-iran"
            }`}
          >
            <h3 className={`text-lg font-medium text-paper ${fa ? "font-iran" : "font-iran"}`}>
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-paper/65">{step.body}</p>
            <pre
              dir="ltr"
              className={`mt-5 overflow-x-auto rounded-xl border p-4 font-mono text-[11px] text-paper/70 bg-paper/[0.04] ${accentBorder}`}
            >
              {step.preview}
            </pre>
          </div>
        ),
      })),
    [accentBorder, dir, fa, steps],
  );

  if (!current) return null;

  return (
    <motion.section
      id="demo"
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className={`scroll-mt-24 border-b px-4 py-12 sm:px-6 sm:py-16 lg:px-8 ${
        ai ? "ai-section border-paper/10" : "border-paper/20"
      }`}
    >
      <div className="mx-auto max-w-6xl">
        <AboutSectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />

        {ai ? (
          <motion.div variants={itemReveal}>
            <AnimatedTabs
              tabs={modernTabs}
              value={active}
              onValueChange={setActive}
              indicatorId={`product-demo-tabs-${slug}`}
              className={fa ? "font-iran" : "font-iran"}
              listClassName="w-full max-w-full sm:w-full"
            />
          </motion.div>
        ) : (
          <motion.div variants={itemReveal} className="grid gap-4 lg:grid-cols-[220px_1fr]">
            <div className="flex flex-row gap-2 overflow-x-auto lg:flex-col" role="tablist" aria-label={title}>
              {steps.map((step, i) => {
                const on = step.id === active;
                return (
                  <button
                    key={step.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(step.id)}
                    className={`shrink-0 border px-3 py-2.5 text-start text-xs transition-colors ${
                      on
                        ? `${accentBorder} bg-paper/[0.06] ${accentText}`
                        : "border-paper/12 text-paper/50 hover:border-paper/25 hover:text-paper/75"
                    } ${fa ? "font-fa" : "font-mono"}`}
                  >
                    <span className="opacity-50" dir="ltr">
                      0{i + 1}{" "}
                    </span>
                    {step.title}
                  </button>
                );
              })}
            </div>

            <div
              dir={dir}
              className={`border border-paper/15 bg-paper/[0.02] p-5 sm:p-6 ${fa ? "font-fa" : ""}`}
            >
              <h3 className={`text-lg text-paper ${fa ? "font-fa" : "font-pixel"}`}>{current.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-paper/65">{current.body}</p>
              <pre
                dir="ltr"
                className={`mt-5 overflow-x-auto border bg-[#080c08] p-4 font-mono text-[11px] text-term/80 ${accentBorder}`}
              >
                {current.preview}
              </pre>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
