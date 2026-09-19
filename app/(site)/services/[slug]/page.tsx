import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { SERVICES_SLUGS, SERVICES_SLUG_TO_NUMBER } from "@/config/navigation";
import { dictionaries, type Lang } from "@/i18n/dictionaries";
import { androidPageDictionaries } from "@/i18n/android-page";
import { consultingPageDictionaries } from "@/i18n/consulting-page";
import { ecommercePageDictionaries } from "@/i18n/ecommerce-page";
import { iosPageDictionaries } from "@/i18n/ios-page";
import { seoPageDictionaries } from "@/i18n/seo-page";
import { supportPageDictionaries } from "@/i18n/support-page";
import { uiUxPageDictionaries } from "@/i18n/ui-ux-page";
import { webDesignPageDictionaries } from "@/i18n/web-design-page";
import { getRequestLang } from "@/lib/i18n/request-lang";
import { pageMetadata } from "@/lib/seo/metadata";
import ServiceSubClient from "./ServiceSubClient";

type Props = {
  params: Promise<{ slug: string }>;
};

function serviceHero(slug: string, lang: Lang) {
  switch (slug) {
    case "web-design":
      return webDesignPageDictionaries[lang].hero;
    case "ui-ux":
      return uiUxPageDictionaries[lang].hero;
    case "ecommerce":
      return ecommercePageDictionaries[lang].hero;
    case "android":
      return androidPageDictionaries[lang].hero;
    case "ios":
      return iosPageDictionaries[lang].hero;
    case "seo":
      return seoPageDictionaries[lang].hero;
    case "consulting":
      return consultingPageDictionaries[lang].hero;
    case "support":
      return supportPageDictionaries[lang].hero;
    default:
      return null;
  }
}

export function generateStaticParams() {
  return SERVICES_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!SERVICES_SLUG_TO_NUMBER[slug]) {
    return { title: "Not Found" };
  }

  const lang = await getRequestLang();
  const hero = serviceHero(slug, lang);
  const title = hero?.title ?? dictionaries[lang].nav.services;
  const description = hero?.body ?? title;

  return pageMetadata({
    path: `/services/${slug}`,
    title,
    description,
    lang,
  });
}

export default async function ServiceSubPage({ params }: Props) {
  const { slug } = await params;
  if (!SERVICES_SLUGS.includes(slug)) {
    notFound();
  }

  const lang = await getRequestLang();
  const nav = dictionaries[lang].nav;
  const hero = serviceHero(slug, lang);
  const breadcrumbs = [
    { name: nav.home, href: "/" },
    { name: nav.services, href: "/services" },
    { name: hero?.title ?? slug },
  ];

  return (
    <main>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ServiceSubClient slug={slug} />
    </main>
  );
}
