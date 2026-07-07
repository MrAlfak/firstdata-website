import type { Metadata } from "next";
import { langAlternates } from "@/lib/seo/site";

type PageMetaInput = {
  path: string;
  title: string;
  description: string;
  openGraphType?: "website" | "article";
};

export function pageMetadata({
  path,
  title,
  description,
  openGraphType = "website",
}: PageMetaInput): Metadata {
  const alternates = langAlternates(path);
  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      type: openGraphType,
      url: alternates.canonical,
    },
  };
}
