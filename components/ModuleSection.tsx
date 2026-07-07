"use client";

import { motion } from "motion/react";
import type { ModuleData } from "./modules-data";
import ModuleWrapper, { itemReveal } from "./ModuleWrapper";
import { Decode } from "./Decode";
import { useT } from "@/i18n/LangProvider";

export default function ModuleSection({ module }: { module: ModuleData }) {
  const { t, fa, dir, fd } = useT();
  const title = t(`modules.${module.number}.title`);
  const subtitle = t(`modules.${module.number}.subtitle`);
  return (
    <ModuleWrapper
      id={`module-${module.number}`}
      number={module.number}
      eyebrow={title.toLowerCase()}
    >
      <motion.div
        variants={itemReveal}
        className="mb-8 flex items-start justify-between gap-4"
      >
        <div className="flex items-baseline gap-4">
          <Decode
            as="span"
            className="font-pixel text-2xl text-white/40"
            duration={300}
          >
            {fd(module.number)}
          </Decode>
          <div>
            <Decode
              as="h2"
              dir={dir}
              className={`text-xl uppercase tracking-wide sm:text-2xl ${fa ? "font-fa" : "font-pixel"}`}
              duration={200}
            >
              {title}
            </Decode>
            <p dir={dir} className={`mt-2 max-w-md text-sm text-white/60 ${fa ? "font-fa" : ""}`}>
              {subtitle}
            </p>
          </div>
        </div>
        <span className="border border-white/30 px-2 py-1 text-[10px] uppercase tracking-wider text-white/50">
          {module.tag}
        </span>
      </motion.div>

      <motion.div
        variants={itemReveal}
        className="border border-white/20 bg-white/[0.02] p-4 sm:p-6"
      >
        <pre className="ascii text-[11px] sm:text-xs">{module.ascii}</pre>
      </motion.div>
    </ModuleWrapper>
  );
}
