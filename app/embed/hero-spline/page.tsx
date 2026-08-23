import type { Metadata } from "next";
import HeroSplineEmbedClient from "./HeroSplineEmbedClient";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Hero Spline Embed",
};

type SearchParams = {
  /** Physical half for the robot — preferred (survives site `?lang=` cookie redirect). */
  robot?: string;
  /** @deprecated site proxy strips `lang`; kept as fallback only. */
  lang?: string;
  side?: string;
};

/**
 * Isolated Spline runtime for the modern homepage hero.
 * Loaded inside an iframe so the parent document keeps normal wheel scrolling
 * (full-viewport WebGL in the parent frame blocks Chromium wheel scroll).
 *
 * Query: `?robot=left|right` — physical framing (FA → left, EN → right).
 * Do not rely on `?lang=` here: `proxy.ts` redirects it away into the fd-lang cookie.
 */
export default async function HeroSplineEmbedPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const robot =
    params?.robot === "left" || params?.robot === "right"
      ? params.robot
      : params?.lang === "fa"
        ? "left"
        : "right";

  return <HeroSplineEmbedClient robot={robot} />;
}
