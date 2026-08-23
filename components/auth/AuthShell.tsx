"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import { Decode } from "@/components/Decode";
import { useT } from "@/i18n/LangProvider";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";

export const authInputClass = (fa: boolean, ai = false) =>
  ai
    ? `w-full rounded-xl border border-paper/15 bg-paper/[0.04] px-4 py-3.5 text-sm text-paper placeholder:text-paper/30 outline-none transition-colors focus:border-term/40 focus:ring-2 focus:ring-term/15 ${fa ? "font-iran text-right" : "font-iran"}`
    : `w-full border border-paper/20 bg-paper/[0.03] px-4 py-3 text-xs text-paper placeholder:text-paper/25 outline-none focus:border-paper/50 transition-colors duration-200 ${fa ? "font-fa text-right" : "font-mono"}`;

export const authLabelClass = (fa: boolean, ai = false) =>
  ai
    ? `mb-2 block text-xs text-paper/45 ${fa ? "font-iran" : "font-iran"}`
    : `block text-[10px] uppercase tracking-widest text-paper/40 mb-2 ${fa ? "font-fa" : ""}`;

export const authTabClass = (active: boolean, fa: boolean, ai = false) =>
  ai
    ? `flex-1 rounded-xl border px-3 py-2.5 text-sm transition-colors duration-200 ${
        active
          ? "border-paper/40 bg-paper/10 text-paper"
          : "border-paper/10 text-paper/40 hover:border-paper/25 hover:text-paper/70"
      } ${fa ? "font-iran" : "font-iran"}`
    : `flex-1 border px-3 py-2 text-[10px] uppercase tracking-wider transition-colors duration-200 ${
        active
          ? "border-paper/50 bg-paper/10 text-paper"
          : "border-paper/15 text-paper/40 hover:border-paper/30 hover:text-paper/70"
      } ${fa ? "font-fa" : "font-mono"}`;

export const authBtnClass = (fa: boolean, ai = false) =>
  ai
    ? `w-full rounded-xl bg-paper px-4 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-paper/90 disabled:opacity-40 ${fa ? "font-iran" : "font-iran"}`
    : `w-full border border-paper/40 bg-paper/5 px-4 py-3 text-[11px] uppercase tracking-wider text-paper transition-colors duration-200 hover:border-paper hover:bg-paper/10 disabled:opacity-40 ${fa ? "font-fa" : "font-mono"}`;

type Props = {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  altHref: string;
  altLabel: string;
};

export default function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  altHref,
  altLabel,
}: Props) {
  const { fa, dir } = useT();
  const [skin] = usePanelSkin();
  const ai = skin === "modern";
  const cleanEyebrow = eyebrow.replace(/^\/\/\s*/, "").replace(/^>\s*/, "").trim();

  return (
    <motion.section
      variants={moduleReveal}
      initial="hidden"
      animate="show"
      className={`min-h-[70vh] border-b px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-8 lg:px-8 ${
        ai ? "ai-section border-paper/10" : "border-paper/20"
      }`}
    >
      <div className="mx-auto max-w-md">
        <motion.p
          variants={itemReveal}
          dir={dir}
          className={
            ai
              ? `ai-eyebrow mb-4 ${fa ? "font-iran" : "font-iran"}`
              : `mb-4 text-[10px] text-paper/30 ${fa ? "font-fa" : "ascii"}`
          }
        >
          {ai ? cleanEyebrow : <Decode>{eyebrow}</Decode>}
        </motion.p>

        <motion.h1
          variants={itemReveal}
          dir={dir}
          className={
            ai
              ? `ai-display mb-3 text-3xl font-medium tracking-tight sm:text-4xl ${fa ? "font-iran" : "font-iran"}`
              : `mb-3 text-3xl tracking-tight sm:text-4xl ${fa ? "font-fa" : "font-pixel"}`
          }
        >
          {title}
        </motion.h1>

        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mb-8 text-sm text-paper/55 ${fa ? (ai ? "font-iran" : "font-fa") : ai ? "font-iran" : ""}`}
        >
          {subtitle}
        </motion.p>

        <motion.div variants={itemReveal}>{children}</motion.div>

        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mt-8 text-center text-xs text-paper/40 ${
            fa ? (ai ? "font-iran" : "font-fa") : ai ? "font-iran" : "font-mono"
          }`}
        >
          <Link href={altHref} className="link-underline transition-colors duration-200 hover:text-paper">
            {altLabel}
          </Link>
        </motion.p>
      </div>
    </motion.section>
  );
}
