"use client";

import type { SVGProps } from "react";
import { SOCIAL_LINKS, type SocialNetwork } from "@/config/social";
import { useT } from "@/i18n/LangProvider";

function SocialGlyph({ network, ...props }: { network: SocialNetwork } & SVGProps<SVGSVGElement>) {
  switch (network) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <rect x="4.5" y="4.5" width="15" height="15" rx="4" />
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <rect x="4" y="4" width="16" height="16" rx="1" />
          <path d="M8 10v7M8 7.5v.5" />
          <path d="M12 17v-4c0-1.2.8-2 2-2s2 .8 2 2v4" />
          <path d="M12 13v4" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <path d="M14 8h2.5V5H14c-2.2 0-3.5 1.4-3.5 3.5V11H8v3h2.5v7H14v-7h2.5l.5-3H14V8.5c0-.3.2-.5.5-.5z" />
        </svg>
      );
    case "telegram":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <path d="M5 12l13-5-3 11-4-3-5 3 1-4-6-2z" />
          <path d="M12 13l4 4" />
        </svg>
      );
  }
}

export default function FooterSocialLinks() {
  const { t } = useT();

  return (
    <div className="mt-4 flex flex-wrap items-center gap-4 sm:gap-5">
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.id}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t(link.labelKey)}
          className="inline-flex items-center justify-center text-paper/45 transition-colors duration-200 hover:text-paper"
        >
          <SocialGlyph
            network={link.id}
            className="h-6 w-6 sm:h-7 sm:w-7"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </a>
      ))}
    </div>
  );
}
