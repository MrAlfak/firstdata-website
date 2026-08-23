"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";

/**
 * @efferd/logo-cloud-3 — infinite logo strip.
 * Theme filters via `.fd-logo-cloud-mark` in globals.css (`data-theme`).
 */
export function LogoCloud({ className }: { className?: string }) {
  return (
    <div
      className={
        className ??
        "mask-[linear-gradient(to_right,transparent,black,transparent)] min-h-9 overflow-hidden py-4"
      }
    >
      <InfiniteSlider gap={42} reverse speed={80} speedOnHover={25}>
        {logos.map((logo) => (
          // eslint-disable-next-line @next/next/no-img-element -- remote wordmarks from Efferd CDN
          <img
            alt={logo.alt}
            className="fd-logo-cloud-mark pointer-events-none h-4 w-auto shrink-0 select-none md:h-5"
            decoding="async"
            fetchPriority="high"
            height={20}
            key={logo.alt}
            loading="eager"
            src={logo.src}
            width={120}
          />
        ))}
      </InfiniteSlider>
    </div>
  );
}

const logos = [
  {
    src: "https://storage.efferd.com/logo/nvidia-wordmark.svg",
    alt: "Nvidia Logo",
  },
  {
    src: "https://storage.efferd.com/logo/supabase-wordmark.svg",
    alt: "Supabase Logo",
  },
  {
    src: "https://storage.efferd.com/logo/openai-wordmark.svg",
    alt: "OpenAI Logo",
  },
  {
    src: "https://storage.efferd.com/logo/turso-wordmark.svg",
    alt: "Turso Logo",
  },
  {
    src: "https://storage.efferd.com/logo/vercel-wordmark.svg",
    alt: "Vercel Logo",
  },
  {
    src: "https://storage.efferd.com/logo/github-wordmark.svg",
    alt: "GitHub Logo",
  },
  {
    src: "https://storage.efferd.com/logo/claude-wordmark.svg",
    alt: "Claude AI Logo",
  },
  {
    src: "https://storage.efferd.com/logo/clerk-wordmark.svg",
    alt: "Clerk Logo",
  },
];
