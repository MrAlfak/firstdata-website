"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useVelocity, useMotionValueEvent } from "motion/react";
import StableScramble from "@/motion/StableScramble";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import IranSquareGridMap from "@/components/hero/IranSquareGridMap";
import HeroTrustStats from "@/components/hero/HeroTrustStats";
import SplineSceneBasic from "@/components/hero/SplineSceneBasic";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";

export default function Hero() {
  const router = useRouter();
  const [revealed, setRevealed] = useState(false);
  const { t, fa, dir, d, p } = useT();
  const [skin, , skinReady] = usePanelSkin();
  const ai = skin === "modern";

  const marqueeRef = useRef<HTMLDivElement>(null);
  const prevVelRef = useRef(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);

  useMotionValueEvent(velocity, "change", (v) => {
    if (!marqueeRef.current) return;
    const abs = Math.abs(v);
    const duration = Math.max(4, 28 - abs / 150).toFixed(1);
    marqueeRef.current.style.animationDuration = `${duration}s`;
    const shouldReverse = v < -300;
    const wasReverse = prevVelRef.current < -300;
    if (shouldReverse !== wasReverse) {
      marqueeRef.current.style.animationDirection = shouldReverse ? "reverse" : "normal";
    }
    prevVelRef.current = v;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const show = () => {
      requestAnimationFrame(() => setRevealed(true));
    };

    if (!document.documentElement.hasAttribute("data-preloader")) {
      show();
      return;
    }

    const observer = new MutationObserver(() => {
      if (!document.documentElement.hasAttribute("data-preloader")) {
        show();
        observer.disconnect();
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-preloader"],
    });
    return () => observer.disconnect();
  }, []);

  const sloganText = t("hero.slogan");
  const marqueeItems = d.marquee;

  // Wait for document/localStorage skin before branching — prevents modern→terminal flash.
  if (!skinReady) {
    return <section id="top" className="min-h-[70svh] bg-ink" aria-hidden />;
  }

  if (ai) {
    return <SplineSceneBasic revealed={revealed} />;
  }

  return (
    <section
      id="top"
      className="hero-term border-b border-paper/20 px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-sm border border-paper/20 bg-paper/[0.02]">
          <div className="p-5 sm:p-7 lg:p-8">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 xl:gap-x-10">
              <motion.div
                variants={itemReveal}
                initial="hidden"
                animate={revealed ? "show" : "hidden"}
                className="mb-8 lg:order-2 lg:mb-0 lg:self-start"
              >
                <IranSquareGridMap />
              </motion.div>

              <motion.div
                variants={moduleReveal}
                initial="hidden"
                animate={revealed ? "show" : "hidden"}
                className="lg:order-1"
              >
                <motion.h1
                  variants={itemReveal}
                  dir={dir}
                  className={
                    fa
                      ? "font-fa text-5xl leading-[0.9] tracking-tight xs:text-6xl sm:text-8xl md:text-9xl"
                      : "font-pixel text-[clamp(1.65rem,5.2vw,4.25rem)] leading-[0.95] tracking-tight whitespace-nowrap sm:text-6xl md:text-7xl"
                  }
                  aria-label={t("hero.brand")}
                >
                  <StableScramble text={t("hero.brand")} start={revealed} duration={700} />
                  <span
                    className="ms-1 inline-block h-[0.72em] w-[2px] translate-y-[0.06em] bg-term align-baseline animate-blink"
                    aria-hidden
                  />
                </motion.h1>

                <motion.p
                  variants={itemReveal}
                  dir={dir}
                  className={`mt-4 text-xl leading-snug tracking-tight text-paper/80 sm:mt-6 sm:text-2xl md:text-3xl ${
                    fa ? "font-fa" : "font-pixel"
                  }`}
                  aria-label={sloganText}
                >
                  {sloganText}
                </motion.p>

                <motion.div
                  variants={itemReveal}
                  dir={dir}
                  className={`mt-6 max-w-2xl space-y-4 text-justify [text-align-last:auto] sm:mt-8 sm:space-y-5 ${
                    fa ? "font-fa" : ""
                  }`}
                >
                  <p className="text-base leading-relaxed text-paper/80 sm:text-lg">{d.hero.lead}</p>
                  <p className="text-base leading-relaxed text-paper/85 sm:text-lg">{d.hero.tagline}</p>
                  {d.hero.subcopy ? (
                    <p className="text-base leading-relaxed text-paper/75 sm:text-lg">{d.hero.subcopy}</p>
                  ) : null}
                </motion.div>

                <motion.div
                  variants={itemReveal}
                  className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4"
                  dir={dir}
                >
                  <Link
                    href="/contactus/request"
                    className={`inline-flex items-center gap-2 bg-paper px-6 py-3 text-sm tracking-wider text-ink transition-colors duration-200 hover:bg-paper/90 sm:px-7 sm:py-3.5 sm:text-base ${
                      fa ? "font-fa" : "uppercase"
                    }`}
                  >
                    {t("hero.ctaPrimary")}
                    <span aria-hidden className="opacity-70">
                      {fa ? "←" : "→"}
                    </span>
                  </Link>
                  <Link
                    href="/portfolio"
                    className={`border border-paper/35 px-5 py-2.5 text-xs uppercase tracking-wider text-paper/65 transition-colors duration-200 hover:border-paper hover:text-paper sm:px-5 sm:py-3 ${
                      fa ? "font-fa" : ""
                    }`}
                  >
                    {t("hero.ctaSecondary")}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      const fab = document.querySelector<HTMLButtonElement>("[data-skin-fab]");
                      if (fab && !fab.disabled) fab.click();
                      else router.push("/?skin=modern");
                    }}
                    className={`border border-paper/20 px-4 py-2 text-[10px] uppercase tracking-wider text-paper/45 transition-colors duration-200 hover:border-paper/50 hover:text-paper/80 sm:px-5 sm:py-2.5 ${
                      fa ? "font-fa" : ""
                    }`}
                  >
                    {p.skin.enterAi}
                  </button>
                </motion.div>
              </motion.div>
            </div>

            <HeroTrustStats active={revealed} />
          </div>
        </div>

        <div className="marquee-wrap mt-12 overflow-hidden border-t border-paper/10 pt-4 sm:mt-16">
          <div
            ref={marqueeRef}
            className="marquee-inner flex whitespace-nowrap text-[10px] uppercase tracking-widest text-paper/25"
            style={{ animation: "marquee 28s linear infinite" }}
          >
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className={`px-2 sm:px-3 ${fa ? "font-fa" : ""}`}>
                {item} {"///"}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
