import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { portfolioPageDictionaries } from "@/i18n/portfolio-page";
import { pageMetadata } from "@/lib/seo/metadata";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = pageMetadata({
  path: "/portfolio",
  title: "Portfolio",
  description: portfolioPageDictionaries.fa.hero.body,
});

export default function PortfolioPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Portfolio" },
  ];

  return (
    <main>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <PortfolioClient />
    </main>
  );
}
