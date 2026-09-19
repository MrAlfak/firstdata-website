import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { SLUG_TO_CATEGORY } from "@/config/portfolio";
import { PORTFOLIO_SLUGS } from "@/config/navigation";
import { dictionaries } from "@/i18n/dictionaries";
import { portfolioPageDictionaries } from "@/i18n/portfolio-page";
import { portfolioSubPageDictionaries } from "@/i18n/portfolio-sub-page";
import { getRequestLang } from "@/lib/i18n/request-lang";
import { pageMetadata } from "@/lib/seo/metadata";
import PortfolioSubClient from "./PortfolioSubClient";

type Props = {
  params: Promise<{ slug: string }>;
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

  const lang = await getRequestLang();
  const ui = portfolioSubPageDictionaries[lang][category];

  return pageMetadata({
    path: `/portfolio/${slug}`,
    title: ui.hero.title,
    description: ui.hero.body,
    lang,
  });
}

export default async function PortfolioSubPage({ params }: Props) {
  const { slug } = await params;
  if (!PORTFOLIO_SLUGS.includes(slug)) {
    notFound();
  }

  const lang = await getRequestLang();
  const category = SLUG_TO_CATEGORY[slug];
  const ui = category ? portfolioSubPageDictionaries[lang][category] : null;
  const breadcrumbs = [
    { name: dictionaries[lang].nav.home, href: "/" },
    { name: portfolioPageDictionaries[lang].hero.title, href: "/portfolio" },
    { name: ui?.hero.title ?? slug },
  ];

  return (
    <main>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <PortfolioSubClient slug={slug} />
    </main>
  );
}
