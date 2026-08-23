"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import { Decode } from "@/components/Decode";
import CTA from "@/components/shadcn-space/blocks/cta-01/cta";
import { useT } from "@/i18n/LangProvider";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";

type Props = {
  /** Homepage: plain copy, no terminal panel */
  plain?: boolean;
};

export default function FinalCta({ plain = false }: Props) {
  const { fa, dir, d } = useT();
  const [skin] = usePanelSkin();
  const ai = skin === "modern";
  const cta = plain ? d.home.start : d.finalCta;
  const face = ai ? "font-iran" : fa ? "font-fa" : "";
  const buttonLabel = plain
    ? (cta as typeof d.home.start).cta
    : (cta as typeof d.finalCta).ctaSecondary;

  if (ai) {
    return (
      <motion.section
        id="start"
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15% 0px" }}
        className="ai-final-cta scroll-mt-16 border-b border-foreground/8"
      >
        {/* Soft ambient lights — low-sat mint, transform/opacity only */}
        <div className="fd-cta-lights" aria-hidden="true">
          <span className="fd-cta-mesh" />
          <span className="fd-cta-orb fd-cta-orb--a" />
          <span className="fd-cta-orb fd-cta-orb--b" />
          <span className="fd-cta-orb fd-cta-orb--c" />
          <span className="fd-cta-orb fd-cta-orb--d" />
          <span className="fd-cta-streak fd-cta-streak--a" />
          <span className="fd-cta-streak fd-cta-streak--b" />
          <span className="fd-cta-stage" />
        </div>

        <div className="relative z-10">
          <CTA
            className={`w-full ${face}`}
            wide
            title={cta.title}
            description={
              plain
                ? `${cta.subtitle}${(cta as typeof d.home.start).responseNote ? ` ${(cta as typeof d.home.start).responseNote}` : ""}`
                : cta.subtitle
            }
            buttonLabel={buttonLabel}
            href="/contactus"
          />

          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-2 px-4 pb-12 text-sm text-foreground/45 sm:flex-row sm:justify-center sm:gap-6 sm:px-6 sm:pb-14 lg:px-8">
            <a
              href="mailto:info@firstdata.ir"
              className={`transition-colors duration-200 hover:text-foreground/70 ${face}`}
            >
              info@firstdata.ir
            </a>
            <span className={face} dir="ltr">
              {d.contact.directPhone}
            </span>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      id="start"
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px" }}
      className="scroll-mt-16 border-b border-paper/20 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mb-3 text-sm txt-comment ${fa ? "font-fa" : plain ? "" : "ascii"}`}
        >
          {plain ? cta.eyebrow : <Decode>{(cta as typeof d.finalCta).eyebrow}</Decode>}
        </motion.p>

        <motion.h2
          variants={itemReveal}
          dir={dir}
          className={`text-2xl font-normal leading-snug tracking-tight text-paper sm:text-3xl lg:text-4xl ${
            fa ? "font-fa" : plain ? "" : "font-pixel"
          }`}
        >
          {cta.title}
        </motion.h2>

        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mx-auto mt-5 max-w-xl text-base leading-relaxed text-paper/60 sm:mt-6 sm:text-lg ${face}`}
        >
          {cta.subtitle}
        </motion.p>

        {!plain ? (
          <motion.div variants={itemReveal} className="mx-auto mt-8 max-w-sm">
            <div className="flex items-center gap-1.5 border border-b-0 border-paper/20 bg-paper/[0.04] px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]/70" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]/70" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]/70" />
              <span className="ml-auto font-mono text-[9px] text-paper/20">
                {fa ? "وضعیت سیستم" : "system-status"}
              </span>
            </div>
            <div className="border border-paper/20 bg-paper/[0.015] p-4 text-left">
              <pre className="ascii text-[9px] leading-relaxed text-paper/40 sm:text-[10px]">
                {fa
                  ? `> وضعیت: آنلاین        [OK]
> پاسخ: ۱ روز کاری   [OK]
> ظرفیت: موجود       [OK]
> مشاوره: رایگان     [OK]`
                  : `> status:  online       [OK]
> reply:   1 biz day  [OK]
> slots:   available  [OK]
> consult: free       [OK]`}
              </pre>
              <div className="mt-3 flex items-center gap-1 font-mono text-[10px] text-paper/20">
                <span>root@fd:~$</span>
                <span className="animate-blink ml-0.5 text-term/60">▮</span>
              </div>
            </div>
          </motion.div>
        ) : null}

        {plain ? (
          <motion.p
            variants={itemReveal}
            dir={dir}
            className={`mt-4 text-sm text-paper/45 ${face}`}
          >
            {(cta as typeof d.home.start).responseNote}
          </motion.p>
        ) : null}

        <motion.div variants={itemReveal} className="mt-10 flex justify-center" dir={dir}>
          <Link
            href="/contactus"
            className={`border border-paper/30 px-8 py-3.5 text-base text-paper/75 transition-colors duration-200 hover:border-paper hover:text-paper ${face}`}
          >
            {buttonLabel}
          </Link>
        </motion.div>

        <motion.div
          variants={itemReveal}
          className="mt-8 flex flex-col items-center gap-2 text-sm text-paper/40 sm:flex-row sm:justify-center sm:gap-6"
        >
          <a
            href="mailto:info@firstdata.ir"
            className={`transition-colors duration-200 hover:text-paper/70 ${ai ? face : "font-mono"}`}
          >
            info@firstdata.ir
          </a>
          <span className={ai ? face : "font-mono"} dir="ltr">
            {d.contact.directPhone}
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
}
