import type { Metadata } from "next";
import ServicesLandingPage from "@/components/services/ServicesLandingPage";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { dictionaries } from "@/i18n/dictionaries";
import { servicesPageDictionaries } from "@/i18n/services-page";
import { buildBilingualFaqJsonLd } from "@/lib/seo/faq-jsonld";
import { getRequestLang } from "@/lib/i18n/request-lang";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  const ui = servicesPageDictionaries[lang];
  return pageMetadata({
    path: "/services",
    title: ui.metaTitle,
    description: ui.metaDescription,
    lang,
  });
}

const faqSchemas = buildBilingualFaqJsonLd(dictionaries.en.faq.items, dictionaries.fa.faq.items);

export default async function ServicesPage() {
  const lang = await getRequestLang();
  const nav = dictionaries[lang].nav;
  const breadcrumbs = [
    { name: nav.home, href: "/" },
    { name: nav.services },
  ];

  return (
    <main>
      <BreadcrumbJsonLd items={breadcrumbs} />
      {faqSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <ServicesLandingPage />
    </main>
  );
}
