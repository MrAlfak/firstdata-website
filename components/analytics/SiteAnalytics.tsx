"use client";

import { useEffect, useState } from "react";
import { scheduleUpdate } from "@/lib/react/schedule-update";
import Script from "next/script";
import { useT } from "@/i18n/LangProvider";

const CONSENT_KEY = "fd-cookie-consent";
export const CONSENT_EVENT = "fd:cookie-consent";

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function hasConsent(): boolean {
  return typeof window !== "undefined" && localStorage.getItem(CONSENT_KEY) === "1";
}

export default function SiteAnalytics() {
  const [gaAllowed, setGaAllowed] = useState(false);

  useEffect(() => {
    scheduleUpdate(() => setGaAllowed(hasConsent()));
    const onConsent = () => setGaAllowed(true);
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  return (
    <>
      {plausibleDomain ? (
        <Script
          defer
          data-domain={plausibleDomain}
          src={process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL ?? "https://plausible.io/js/script.js"}
          strategy="afterInteractive"
        />
      ) : null}
      {gaId && gaAllowed ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}
    </>
  );
}

export function CookieBanner() {
  const { fa, dir, d } = useT();
  const copy = d.consent;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!gaId) return;
    if (!hasConsent() && localStorage.getItem(CONSENT_KEY) !== "0") {
      scheduleUpdate(() => setVisible(true));
    }
  }, []);

  if (!gaId || !visible) return null;

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "1");
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, "0");
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      dir={dir}
      className="fixed inset-x-0 bottom-0 z-[110] border-t border-paper/20 bg-ink/95 px-4 py-4 backdrop-blur-sm"
    >
      <div className={`mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${fa ? "font-fa" : "font-mono"}`}>
        <p className="text-xs text-paper/70">{copy.message}</p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={reject}
            className="border border-paper/25 px-3 py-1.5 text-[10px] uppercase tracking-wider text-paper/50 hover:text-paper"
          >
            {copy.reject}
          </button>
          <button
            type="button"
            onClick={accept}
            className="border border-term/40 bg-term/10 px-3 py-1.5 text-[10px] uppercase tracking-wider text-term hover:bg-term/20"
          >
            {copy.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
