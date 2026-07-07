"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import { Decode } from "@/components/Decode";
import { useT } from "@/i18n/LangProvider";

export const authInputClass = (fa: boolean) =>
  `w-full border border-paper/20 bg-paper/[0.03] px-4 py-3 text-xs text-paper placeholder:text-paper/25 outline-none focus:border-paper/50 transition-colors duration-200 ${fa ? "font-fa text-right" : "font-mono"}`;

export const authLabelClass = (fa: boolean) =>
  `block text-[10px] uppercase tracking-widest text-paper/40 mb-2 ${fa ? "font-fa" : ""}`;

export const authTabClass = (active: boolean, fa: boolean) =>
  `flex-1 border px-3 py-2 text-[10px] uppercase tracking-wider transition-colors duration-200 ${
    active
      ? "border-paper/50 bg-paper/10 text-paper"
      : "border-paper/15 text-paper/40 hover:border-paper/30 hover:text-paper/70"
  } ${fa ? "font-fa" : "font-mono"}`;

export const authBtnClass = (fa: boolean) =>
  `w-full border border-paper/40 bg-paper/5 px-4 py-3 text-[11px] uppercase tracking-wider text-paper transition-colors duration-200 hover:border-paper hover:bg-paper/10 disabled:opacity-40 ${fa ? "font-fa" : "font-mono"}`;

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

  return (
    <motion.section
      variants={moduleReveal}
      initial="hidden"
      animate="show"
      className="min-h-[70vh] border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-md">
        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mb-4 text-[10px] text-paper/30 ${fa ? "font-fa" : "ascii"}`}
        >
          <Decode>{eyebrow}</Decode>
        </motion.p>

        <motion.h1
          variants={itemReveal}
          dir={dir}
          className={`mb-3 text-3xl tracking-tight sm:text-4xl ${fa ? "font-fa" : "font-pixel"}`}
        >
          {title}
        </motion.h1>

        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mb-8 text-sm text-paper/60 ${fa ? "font-fa" : ""}`}
        >
          {subtitle}
        </motion.p>

        <motion.div variants={itemReveal}>{children}</motion.div>

        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mt-8 text-center text-xs text-paper/40 ${fa ? "font-fa" : "font-mono"}`}
        >
          <Link href={altHref} className="link-underline hover:text-paper transition-colors duration-200">
            {altLabel}
          </Link>
        </motion.p>
      </div>
    </motion.section>
  );
}
