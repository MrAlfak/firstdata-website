"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useT } from "@/i18n/LangProvider";
import { WordsPullUp } from "@/components/hero/WordsPullUp";
import HeroTrustStats from "@/components/hero/HeroTrustStats";
import { LogoCloud } from "@/components/ui/logo-cloud";
import { ModernIconButton } from "@/components/ui/modern-icon-button";
import { HERO_PRISMA_POSTER, HERO_PRISMA_VIDEO } from "@/config/hero-media";

type Props = {
  revealed: boolean;
};

/**
 * Modern-skin cinematic hero — adapted from PrismaHero (21st.dev / rahil1202).
 * Site Header stays global; this block is video + word reveal + CTA only.
 */
export default function ModernPrismaHero({ revealed }: Props) {
  const { t, fa, dir, d } = useT();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOk, setVideoOk] = useState(true);
  const slogan = t("hero.slogan");
  const brand = t("hero.brand");

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    const play = () => {
      void el.play().catch(() => setVideoOk(false));
    };
    if (revealed) play();
  }, [revealed]);

  return (
    <section id="top" className="hero-ai hero-ai-prisma relative">
      <div className="px-3 pb-3 pt-[4.75rem] sm:px-4 sm:pb-4 sm:pt-20 lg:px-5">
        <div className="hero-ai-prisma-stage relative isolate min-h-[min(100svh-5.25rem,52rem)] overflow-hidden rounded-2xl md:min-h-[calc(100svh-5.5rem)] md:rounded-[2rem]">
          {/* Background video / poster */}
          {videoOk ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster={HERO_PRISMA_POSTER}
              className="absolute inset-0 h-full w-full object-cover"
              src={HERO_PRISMA_VIDEO}
              onError={() => setVideoOk(false)}
            />
          ) : (
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_35%,rgb(var(--c-accent)/0.25),transparent_55%),linear-gradient(160deg,#0b1210,#050807_55%,#0a1010)]"
              aria-hidden
            />
          )}

          <div className="hero-ai-prisma-noise pointer-events-none absolute inset-0 opacity-[0.55] mix-blend-overlay" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/75"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgb(var(--c-accent)/0.18),transparent_55%)]"
            aria-hidden
          />

          {/* Bottom content — keep fully inside rounded stage (no clip overflow) */}
          <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-6 sm:px-8 sm:pb-8 md:px-10 md:pb-10">
            <div className="grid grid-cols-12 items-end gap-5 lg:gap-8" dir={dir}>
              <div className="col-span-12 min-w-0 lg:col-span-7 xl:col-span-8">
                <h1
                  className="hero-ai-prisma-title ai-display font-iran font-medium leading-[0.88] tracking-[-0.04em] text-[clamp(2.75rem,14vw,9.5rem)] text-[#E8E6D9]"
                  aria-label={brand}
                >
                  <WordsPullUp text={brand} active={revealed} showAsterisk={!fa} />
                </h1>
                <motion.p
                  initial={{ y: 16, opacity: 0 }}
                  animate={revealed ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
                  transition={{ duration: 0.7, delay: revealed ? 0.35 : 0, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-3 max-w-xl font-iran text-base font-medium text-[#E8E6D9]/75 sm:mt-4 sm:text-xl md:text-2xl"
                  aria-label={slogan}
                >
                  {slogan}
                </motion.p>
              </div>

              <div className="col-span-12 flex min-w-0 flex-col gap-4 pb-1 lg:col-span-5 xl:col-span-4 lg:pb-2">
                <motion.p
                  initial={{ y: 18, opacity: 0 }}
                  animate={revealed ? { y: 0, opacity: 1 } : { y: 18, opacity: 0 }}
                  transition={{ duration: 0.75, delay: revealed ? 0.45 : 0, ease: [0.16, 1, 0.3, 1] }}
                  className="font-iran text-sm leading-relaxed text-[#E8E6D9]/65 sm:text-base"
                >
                  {d.hero.lead}
                </motion.p>

                <motion.div
                  initial={{ y: 18, opacity: 0 }}
                  animate={revealed ? { y: 0, opacity: 1 } : { y: 18, opacity: 0 }}
                  transition={{ duration: 0.75, delay: revealed ? 0.6 : 0, ease: [0.16, 1, 0.3, 1] }}
                  className="flex min-w-0 flex-col items-start gap-3"
                >
                  <ModernIconButton
                    href="/contactus/consultation"
                    className="hero-ai-prisma-cta max-w-full font-iran"
                  >
                    {t("hero.ctaSecondary")}
                  </ModernIconButton>
                  <a
                    href="#assistant"
                    className="inline-flex max-w-full items-center rounded-full border border-[#E8E6D9]/30 px-4 py-2.5 font-iran text-sm text-[#E8E6D9]/80 transition-colors hover:border-[#E8E6D9]/55 hover:text-[#E8E6D9]"
                  >
                    {t("hero.ctaChat")}
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-paper/8 pt-10 sm:pt-12">
          <HeroTrustStats active={revealed} ai />
        </div>

        <div className="mt-12 border-t border-paper/8 pt-5 sm:mt-14" aria-label="logos">
          <LogoCloud />
        </div>
      </div>
    </section>
  );
}
