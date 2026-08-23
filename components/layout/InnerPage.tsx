"use client";

import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import { Decode } from "@/components/Decode";
import { useT } from "@/i18n/LangProvider";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";

type Props = {
  eyebrow: string;
  title: string;
  subtitle: string;
  lines?: string[];
  children?: React.ReactNode;
};

export default function InnerPage({ eyebrow, title, subtitle, lines, children }: Props) {
  const { fa, dir } = useT();
  const [skin] = usePanelSkin();
  const ai = skin === "modern";

  if (ai) {
    const cleanEyebrow = eyebrow.replace(/^>\s*/, "").replace(/\.\.\.$/, "").trim();
    return (
      <motion.div
        variants={moduleReveal}
        initial="hidden"
        animate="show"
        className="ai-section border-b border-paper/10 px-4 pb-14 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <motion.p
            variants={itemReveal}
            dir={dir}
            className={`ai-eyebrow mb-4 ${fa ? "font-iran" : "font-iran"}`}
          >
            {cleanEyebrow}
          </motion.p>

          <motion.h1
            variants={itemReveal}
            dir={dir}
            className={`ai-display max-w-4xl text-3xl font-medium leading-tight tracking-tight text-paper sm:text-4xl lg:text-5xl ${fa ? "font-iran" : "font-iran"}`}
          >
            {title}
          </motion.h1>

          <motion.p
            variants={itemReveal}
            dir={dir}
            className={`mt-5 max-w-2xl text-base leading-relaxed text-paper/55 sm:text-lg ${fa ? "font-iran" : "font-iran"}`}
          >
            {subtitle}
          </motion.p>

          {lines && lines.length > 0 && (
            <motion.ul
              variants={itemReveal}
              dir={dir}
              className={`mt-10 max-w-2xl space-y-3 ${fa ? "font-iran" : "font-iran"}`}
            >
              {lines.map((line, i) => (
                <li key={i} className="ai-point text-sm leading-relaxed text-paper/60 sm:text-base">
                  {line}
                </li>
              ))}
            </motion.ul>
          )}

          {children && (
            <motion.div variants={itemReveal} className="mt-12">
              {children}
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={moduleReveal}
      initial="hidden"
      animate="show"
      className="border-b border-paper/20 px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-8 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mb-4 text-[10px] txt-comment ${fa ? "font-fa" : "ascii"}`}
        >
          <Decode>{eyebrow}</Decode>
        </motion.p>

        <motion.h1
          variants={itemReveal}
          dir={dir}
          className={`text-2xl leading-tight tracking-tight sm:text-3xl lg:text-4xl ${fa ? "font-fa" : "font-pixel"}`}
        >
          {title}
        </motion.h1>

        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mt-4 max-w-2xl text-sm leading-relaxed text-paper/60 sm:text-base ${fa ? "font-fa" : ""}`}
        >
          {subtitle}
        </motion.p>

        {lines && lines.length > 0 && (
          <motion.div
            variants={itemReveal}
            dir={dir}
            className={`mt-8 max-w-2xl space-y-4 border border-paper/10 bg-paper/[0.015] p-5 sm:p-6 ${fa ? "font-fa" : ""}`}
          >
            {lines.map((line, i) => (
              <p key={i} className="text-sm leading-relaxed text-paper/55">
                <span className="mr-2 font-mono text-term/60">▸</span>
                {line}
              </p>
            ))}
          </motion.div>
        )}

        {children && (
          <motion.div variants={itemReveal} className="mt-10">
            {children}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
