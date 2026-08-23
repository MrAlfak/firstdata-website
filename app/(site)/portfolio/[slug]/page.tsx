import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { SLUG_TO_CATEGORY } from "@/config/portfolio";
import { PORTFOLIO_SLUGS } from "@/config/navigation";
import { portfolioPageDictionaries } from "@/i18n/portfolio-page";
import { portfolioSubPageDictionaries } from "@/i18n/portfolio-sub-page";
import { pageMetadata } from "@/lib/seo/metadata";
import PortfolioSubClient from "./PortfolioSubClient";

type Props = {
  params: Promise<{ slug: string }>;
};

const TITLES: Record<string, string> = {
  websites: "Websites",
  ecommerce: "Online Stores",
  "mobile-apps": "Mobile Apps",
  desktop: "Desktop Software",
  other: "Other Projects",
};

export function generateStaticParams() {
  return PORTFOLIO_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = SLUG_TO_CATEGORY[slug];
  if (!category) {
    return { title: "Not Found" };
  }

  const title = TITLES[slug] ?? "Portfolio";
  const description = portfolioSubPageDictionaries.fa[category].hero.body;

  return pageMetadata({
    path: `/portfolio/${slug}`,
    title,
    description,
  });
}

export default async function PortfolioSubPage({ params }: Props) {
  const { slug } = await params;
  if (!PORTFOLIO_SLUGS.includes(slug)) {
    notFound();
  }

  const category = SLUG_TO_CATEGORY[slug];
  const title = category ? portfolioPageDictionaries.en.categoryLabels[category] : slug;
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: portfolioPageDictionaries.en.hero.title, href: "/portfolio" },
    { name: TITLES[slug] ?? title },
  ];

  return (
    <main>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <PortfolioSubClient slug={slug} />
    </main>
  );
}
