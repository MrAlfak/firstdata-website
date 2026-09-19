"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { LogoCloud } from "@/components/ui/logo-cloud";
import { useT } from "@/i18n/LangProvider";
import { HERO_SPLINE_EMBED_PATH, HERO_SPLINE_POINTER_TYPE } from "@/config/hero-media";

type Props = {
  revealed?: boolean;
};

/**
 * Modern-skin homepage hero — Spline card below the floating glass header.
 *
 * Spline iframe covers the whole card so the robot mouse-follows on the open
 * half (fine pointer). Copy would otherwise steal hits (`pointer-events` is not
 * inherited); the parent forwards those coords into the embed so Look At continues.
 * Coarse/touch: iframe is pointer-events-none so the page scrolls natively.
 *
 * Framing: robot on the physical left in FA, right in EN; copy overlays the logical start.
 * Mobile: stacked, center-aligned title / description / CTAs.
 *
 * CTA hierarchy (sales playbook):
 * 1) Project assessment  2) Portfolio outcomes  3) Builder / 56K world
 */
export default function SplineSceneBasic({ revealed = true }: Props) {
  const router = useRouter();
  const { d, dir, fa, t } = useT();

  const handleOpenBuilderView = () => {
    const fab = document.querySelector<HTMLButtonElement>("[data-skin-fab]");
    if (fab && !fab.disabled) {
      fab.click();
      return;
    }
    router.push("/?skin=terminal");
  };
  // Coarse pointers: let touch hit the page (iframe is overflow-locked).
  const [passThroughPointers, setPassThroughPointers] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const sync = () => setPassThroughPointers(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (passThroughPointers) return;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const iframe = iframeRef.current;
      if (!iframe?.contentWindow) return;
      if (event.target === iframe) return;
      const rect = iframe.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        return;
      }
      iframe.contentWindow.postMessage(
        {
          type: HERO_SPLINE_POINTER_TYPE,
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        },
        window.location.origin,
      );
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [passThroughPointers]);

  // Fallbacks keep the modern hero alive if i18n HMR drops `hero.spline` mid-edit.
  const spline = d.hero?.spline;
  const title = spline?.title ?? d.hero?.brand ?? (fa ? "اولین دیتا" : "FIRST DATA");
  const description =
    spline?.description ??
    d.hero?.lead ??
    (fa
      ? "محصول دیجیتال شما را از ایده تا رشد طراحی، توسعه و پشتیبانی می‌کنیم."
      : "We design, build, and grow digital products that perform.");

  // FA (RTL): robot on the physical left. EN (LTR): robot on the physical right.
  const embedSrc = `${HERO_SPLINE_EMBED_PATH}?robot=${fa ? "left" : "right"}`;

  return (
    <section
      id="top"
      className="hero-ai hero-ai-spline relative z-[1] w-full"
      aria-hidden={!revealed}
    >
      {/*
        Sits below the floating glass header with matching 22px radius.
        Header ≈ 14px pad + 78px bar; section pt leaves a small air gap.
      */}
      <Card
        className={`relative h-[min(calc(100svh-6.75rem),56rem)] w-full overflow-hidden rounded-[22px] border border-white/10 bg-black shadow-none transition-opacity duration-500 ${
          revealed ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* ibelick Spotlight (decorative). Events mostly hit the iframe below. */}
        <Spotlight className="pointer-events-none z-20" size={320} />

        {/* Full-bleed Spline — mouse-follow on fine pointers; scroll-through on touch */}
        <iframe
          key={embedSrc}
          ref={iframeRef}
          title={fa ? "صحنه سه‌بعدی هیرو" : "Hero 3D scene"}
          src={embedSrc}
          className={`absolute inset-0 z-0 h-full w-full border-0 bg-black ${
            passThroughPointers ? "pointer-events-none" : ""
          }`}
          loading="eager"
          allow="autoplay"
          tabIndex={-1}
        />

        {/* Copy overlay: spacer passes through; copy column forwards look-at. */}
        <div
          className="pointer-events-none relative z-10 flex h-full flex-col md:flex-row"
          dir={dir}
        >
          <div className="pointer-events-auto relative z-10 flex flex-1 flex-col items-center justify-center p-8 text-center md:items-start md:p-10 md:text-start">
            {/* Mobile: vertical scrim under centered copy */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/30 to-transparent md:hidden"
            />
            {/* Desktop: scrim from logical start (left EN / right FA) */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 hidden md:block"
              style={{
                background: fa
                  ? "linear-gradient(to left, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.28) 42%, transparent 72%)"
                  : "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.28) 42%, transparent 72%)",
              }}
            />

            <h1
              className={`bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl ${
                fa ? "font-iran" : "font-iran tracking-tight"
              }`}
            >
              {title}
            </h1>
            <p
              className={`mt-4 max-w-lg text-neutral-300 ${fa ? "font-iran" : ""}`}
            >
              {description}
            </p>

            <div
              className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start"
              dir={dir}
            >
              <Link
                href="/contactus/request"
                className={`inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm text-black transition-colors hover:bg-neutral-200 ${
                  fa ? "font-iran" : ""
                }`}
              >
                {t("hero.ctaPrimary")}
                <span aria-hidden className="opacity-70">
                  {fa ? "←" : "→"}
                </span>
              </Link>
              <Link
                href="/portfolio"
                className={`rounded-full border border-white/25 px-5 py-2.5 text-sm text-neutral-200 transition-colors hover:border-white/50 hover:text-white ${
                  fa ? "font-iran" : ""
                }`}
              >
                {t("hero.ctaSecondary")}
              </Link>
              <button
                type="button"
                onClick={handleOpenBuilderView}
                className={`rounded-full border border-white/15 px-4 py-2.5 text-xs text-neutral-400 transition-colors hover:border-white/35 hover:text-neutral-200 ${
                  fa ? "font-iran" : ""
                }`}
              >
                {t("hero.ctaTertiary")}
              </button>
            </div>
          </div>

          {/* Spacer keeps copy on logical start; iframe receives pointers here */}
          <div className="pointer-events-none hidden flex-1 md:block" aria-hidden />
        </div>
      </Card>

      <div className="mx-auto max-w-7xl pt-6 sm:pt-8" aria-label={fa ? "لوگوها" : "logos"}>
        <LogoCloud />
      </div>
    </section>
  );
}
