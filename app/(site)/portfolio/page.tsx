import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { dictionaries } from "@/i18n/dictionaries";
import { portfolioPageDictionaries } from "@/i18n/portfolio-page";
import { getRequestLang } from "@/lib/i18n/request-lang";
import { pageMetadata } from "@/lib/seo/metadata";
import PortfolioClient from "./PortfolioClient";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  const ui = portfolioPageDictionaries[lang];
  return pageMetadata({
    path: "/portfolio",
    title: ui.hero.title,
    description: ui.hero.body,
    lang,
  });
}

export default async function PortfolioPage() {
  const lang = await getRequestLang();
  const ui = portfolioPageDictionaries[lang];
  const nav = dictionaries[lang].nav;
  const breadcrumbs = [
    { name: nav.home, href: "/" },
    { name: ui.hero.title },
  ];

  return (
    <main>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <PortfolioClient />
    </main>
  );
}
