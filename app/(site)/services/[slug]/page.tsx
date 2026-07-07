import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import BreadcrumbNav from "@/components/seo/BreadcrumbNav";
import { SERVICES_SLUGS, SERVICES_SLUG_TO_NUMBER } from "@/config/navigation";
import { androidPageDictionaries } from "@/i18n/android-page";
import { consultingPageDictionaries } from "@/i18n/consulting-page";
import { ecommercePageDictionaries } from "@/i18n/ecommerce-page";
import { iosPageDictionaries } from "@/i18n/ios-page";
import { seoPageDictionaries } from "@/i18n/seo-page";
import { supportPageDictionaries } from "@/i18n/support-page";
import { uiUxPageDictionaries } from "@/i18n/ui-ux-page";
import { webDesignPageDictionaries } from "@/i18n/web-design-page";
import { pageMetadata } from "@/lib/seo/metadata";
import ServiceSubClient from "./ServiceSubClient";

type Props = {
  params: Promise<{ slug: string }>;
};

const TITLES: Record<string, string> = {
  "web-design": "Website Design",
  "ui-ux": "UI/UX Design",
  ecommerce: "Online Store",
  android: "Android App",
  ios: "iOS App",
  seo: "SEO & Optimization",
  consulting: "Consulting & Project Analysis",
  support: "Support & Development",
};

export function generateStaticParams() {
  return SERVICES_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!SERVICES_SLUG_TO_NUMBER[slug]) {
    return { title: "Not Found" };
  }

  const title = TITLES[slug] ?? "Services";
  const description =
    slug === "web-design"
      ? webDesignPageDictionaries.fa.hero.body
      : slug === "ui-ux"
        ? uiUxPageDictionaries.fa.hero.body
        : slug === "ecommerce"
          ? ecommercePageDictionaries.fa.hero.body
          : slug === "android"
            ? androidPageDictionaries.fa.hero.body
            : slug === "ios"
              ? iosPageDictionaries.fa.hero.body
              : slug === "seo"
                ? seoPageDictionaries.fa.hero.body
                : slug === "consulting"
                  ? consultingPageDictionaries.fa.hero.body
                  : slug === "support"
                    ? supportPageDictionaries.fa.hero.body
                    : `First Data, ${title}`;

  return pageMetadata({
    path: `/services/${slug}`,
    title,
    description,
  });
}

export default async function ServiceSubPage({ params }: Props) {
  const { slug } = await params;
  if (!SERVICES_SLUGS.includes(slug)) {
    notFound();
  }

  const title = TITLES[slug] ?? slug;
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: title },
  ];

  return (
    <main>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <div className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <BreadcrumbNav items={breadcrumbs} />
      </div>
      <ServiceSubClient slug={slug} />
    </main>
  );
}
