"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";
import { useT } from "@/i18n/LangProvider";
import { cn } from "@/lib/utils";

/** Show after ~half a viewport, clamped to the 400–600px band. */
const SHOW_MIN = 400;
const SHOW_MAX = 600;

/** Soft enter: long ease-out; exit a touch quicker. */
const ENTER_MS = 480;
const EXIT_MS = 240;
const EASE_SOFT = "cubic-bezier(0.22, 1, 0.36, 1)";

function showThresholdPx(): number {
  if (typeof window === "undefined") return 480;
  return Math.min(SHOW_MAX, Math.max(SHOW_MIN, Math.round(window.innerHeight * 0.55)));
}

/**
 * Site-wide back-to-top — physical bottom-right dock.
 * Modern: glass pill (AI dock language). Terminal: CRT chrome.
 */
export default function BackToTop() {
  const [skin] = usePanelSkin();
  const { d, fa } = useT();
  const copy = d.backToTop;
  const modern = skin === "modern";

  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(mq.matches);
    syncMotion();
    mq.addEventListener("change", syncMotion);
    return () => mq.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    let threshold = showThresholdPx();
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setVisible(y > threshold);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    const onResize = () => {
      threshold = showThresholdPx();
      update();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div
      className={cn(
        "pointer-events-none fixed z-[50]",
        reducedMotion
          ? visible
            ? "pointer-events-auto opacity-100"
            : "opacity-0"
          : cn(
              "transition-[opacity,transform]",
              visible
                ? "pointer-events-auto opacity-100 translate-y-0"
                : "opacity-0 translate-y-1",
            ),
      )}
      style={
        reducedMotion
          ? {
              right: "1rem",
              bottom: "var(--fd-dock-bottom)",
            }
          : {
              right: "1rem",
              bottom: "var(--fd-dock-bottom)",
              transitionDuration: `${visible ? ENTER_MS : EXIT_MS}ms`,
              transitionTimingFunction: EASE_SOFT,
            }
      }
      data-back-to-top
      data-skin={modern ? "modern" : "terminal"}
      aria-hidden={!visible}
    >
      <button
        type="button"
        onClick={scrollTop}
        tabIndex={visible ? 0 : -1}
        aria-label={copy.ariaLabel}
        title={copy.tooltip}
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center transition-[border-color,background-color,box-shadow,color,transform] duration-200",
          "focus-visible:outline-none",
          modern
            ? cn(
                "rounded-full border border-[#1F2023] bg-[#2E3033]/92 text-[#1EAEDB]",
                "shadow-[0_10px_32px_rgba(0,0,0,0.4)] backdrop-blur-md",
                "hover:border-[#1EAEDB]/40 hover:bg-[#2E3033] hover:text-[#67D4F0]",
                "hover:shadow-[0_14px_40px_rgba(0,0,0,0.5)]",
                "focus-visible:ring-2 focus-visible:ring-[#1EAEDB]/50",
                "active:scale-[0.97]",
              )
            : cn(
                "rounded-sm border border-[rgba(80,255,140,0.22)] bg-[#07140c]/92 text-[#8dffb0]",
                "font-mono shadow-[0_0_0_1px_rgba(0,0,0,0.55),0_8px_20px_rgba(0,0,0,0.45)]",
                "hover:border-[rgba(80,255,140,0.45)] hover:bg-[#0a1c10] hover:text-[#c8ffd8]",
                "focus-visible:ring-2 focus-visible:ring-[rgba(80,255,140,0.45)]",
                "active:scale-[0.97]",
                fa ? "font-fa" : "",
              ),
        )}
      >
        <ArrowUp className="h-4 w-4" strokeWidth={modern ? 2.25 : 2} aria-hidden />
      </button>
    </div>
  );
}
