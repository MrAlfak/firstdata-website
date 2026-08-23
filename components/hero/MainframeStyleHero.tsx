"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/i18n/LangProvider";
import { useTypewriter } from "@/lib/hooks/useTypewriter";
import { HERO_MAINFRAME_VIDEO } from "@/config/hero-media";

const SENSITIVITY = 0.8;

const PILL_BASE =
  "inline-flex items-center justify-center rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 mx-[0.2em] mb-[0.4em] transition-colors duration-200 whitespace-nowrap font-iran";

const PILL_SOLID = `${PILL_BASE} bg-white text-black border border-black/10 hover:bg-black hover:text-white`;

const PILL_OUTLINE = `${PILL_BASE} gap-2 sm:gap-3 text-white bg-transparent border border-white hover:bg-white hover:text-black`;

const pillPad = { paddingTop: "0.3em", paddingBottom: "0.3em" } as const;

type Props = {
  revealed?: boolean;
};

/**
 * Mainframe-style cinematic hero — mouse-scrub video, blurred intro,
 * typewriter line, and action pills. Modern skin only; site Header stays global.
 */
export default function MainframeStyleHero({ revealed = true }: Props) {
  const { d, dir, fa } = useT();
  const mf = d.hero.mainframe;
  const email = d.contact.directEmail;

  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef(0);
  const seekingRef = useRef(false);

  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const { displayed, done } = useTypewriter({
    text: revealed ? mf.typewriter : "",
    speed: 38,
    startDelay: 600,
  });

  useEffect(() => {
    if (!revealed) return;
    const timer = setTimeout(() => setPillsVisible(true), 400);
    return () => clearTimeout(timer);
  }, [revealed]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleSeeked = () => {
      seekingRef.current = false;
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.01) {
        seekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    video.addEventListener("seeked", handleSeeked);

    const handleMouseMove = (e: MouseEvent) => {
      if (!video || !video.duration) return;

      const currentX = e.clientX;
      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const offset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      const newTime = Math.max(0, Math.min(video.duration, targetTimeRef.current + offset));
      targetTimeRef.current = newTime;

      if (!seekingRef.current) {
        seekingRef.current = true;
        video.currentTime = newTime;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard may be denied */
    }
  };

  return (
    <section id="top" className="hero-ai hero-ai-mainframe relative z-[1] h-svh overflow-hidden">
      {/* Full-bleed scrub video — absolute within hero so later home sections stay opaque */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        src={HERO_MAINFRAME_VIDEO}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
        style={{ objectPosition: "70% center" }}
        aria-hidden
      />

      <div
        className="relative z-[1] flex h-full flex-col justify-end overflow-hidden px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0"
        dir={dir}
      >
        <div className={`max-w-xl relative z-10 ${fa ? "ms-auto md:ms-0 md:me-auto" : ""}`}>
          {/* Blurred intro */}
          <div
            className="pointer-events-none mb-5 select-none font-iran sm:mb-6"
            style={{
              fontSize: "clamp(18px, 4vw, 26px)",
              lineHeight: 1.3,
              fontWeight: 400,
              color: "#000",
              filter: "blur(4px)",
            }}
          >
            <p>{mf.introLine1}</p>
            <p>{mf.introLine2}</p>
          </div>

          {/* Typewriter */}
          <p
            className="mb-5 font-iran text-black sm:mb-6"
            style={{
              fontSize: "clamp(18px, 4vw, 26px)",
              lineHeight: 1.35,
              fontWeight: 400,
              minHeight: "54px",
            }}
            aria-label={mf.typewriter}
          >
            {displayed}
            {!done ? (
              <span
                className="cursor-blink ms-[2px] inline-block h-[1.1em] w-[2px] align-middle bg-black"
                aria-hidden
              />
            ) : null}
          </p>

          {/* Action pills — appear 400ms after mount, independent of typewriter */}
          <div
            className="flex flex-wrap gap-y-1"
            style={{
              opacity: pillsVisible ? 1 : 0,
              transform: pillsVisible ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            <Link href="/contactus/request" className={PILL_SOLID} style={pillPad}>
              {mf.pillIdea}
            </Link>
            <Link href="/contactus/collaborate" className={PILL_SOLID} style={pillPad}>
              {mf.pillCareers}
            </Link>
            <Link href="/contactus/consultation" className={PILL_SOLID} style={pillPad}>
              {mf.pillHello}
            </Link>
            <Link href="/method" className={PILL_SOLID} style={pillPad}>
              {mf.pillMethod}
            </Link>
            <button
              type="button"
              onClick={() => void copyEmail()}
              className={PILL_OUTLINE}
              style={pillPad}
              aria-label={mf.copyEmailAria}
            >
              <span>
                {mf.emailReach}{" "}
                <span className="underline underline-offset-2">{email}</span>
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="0"
                  width="8"
                  height="8"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                />
                <rect
                  x="0"
                  y="3"
                  width="8"
                  height="8"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                />
              </svg>
              <span className="sr-only" aria-live="polite">
                {copied ? mf.emailCopied : ""}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
