import type { Metadata } from "next";
import { absoluteUrl, langAlternates, SITE_URL } from "@/lib/seo/site";

type PageMetaInput = {
  path: string;
  title: string;
  description: string;
  openGraphType?: "website" | "article";
  /** Absolute or site-relative image path */
  image?: string;
  noIndex?: boolean;
};

export function pageMetadata({
  path,
  title,
  description,
  openGraphType = "website",
  image,
  noIndex = false,
}: PageMetaInput): Metadata {
  const alternates = langAlternates(path);
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : absoluteUrl(image)
    : absoluteUrl("/opengraph-image");

  return {
    title,
    description,
    alternates,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
    openGraph: {
      title,
      description,
      type: openGraphType,
      url: alternates.canonical,
      siteName: "First Data",
      locale: "fa_IR",
      alternateLocale: ["en_US"],
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    other: {
      "ai-content": `${SITE_URL}/llms.txt`,
    },
  };
}
