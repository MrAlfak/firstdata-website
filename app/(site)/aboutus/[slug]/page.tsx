import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { ABOUTUS_SLUGS, ABOUTUS_SLUG_TO_PAGE } from "@/config/navigation";
import { aboutHonorsPageDictionaries } from "@/i18n/about-honors-page";
import { aboutPartnersPageDictionaries } from "@/i18n/about-partners-page";
import { aboutTeamPageDictionaries } from "@/i18n/about-team-page";
import { dictionaries } from "@/i18n/dictionaries";
import { getRequestLang } from "@/lib/i18n/request-lang";
import { pageMetadata } from "@/lib/seo/metadata";
import AboutSubClient from "./AboutSubClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return ABOUTUS_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pageKey = ABOUTUS_SLUG_TO_PAGE[slug];
  if (!pageKey) {
    return { title: "Not Found" };
  }

  const lang = await getRequestLang();
  const page = dictionaries[lang].pages[pageKey];
  const path = `/aboutus/${slug}`;
  const description =
    slug === "team"
      ? aboutTeamPageDictionaries[lang].hero.body
      : slug === "partners"
        ? aboutPartnersPageDictionaries[lang].hero.body
        : slug === "honors"
          ? aboutHonorsPageDictionaries[lang].hero.body
          : `${page.subtitle} ${page.lines[0] ?? ""}`.trim();

  return pageMetadata({
    path,
    title: page.title,
    description,
    lang,
  });
}

export default async function AboutSubPage({ params }: Props) {
  const { slug } = await params;
  if (!ABOUTUS_SLUGS.includes(slug)) {
    notFound();
  }

  const lang = await getRequestLang();
  const pageTitle = dictionaries[lang].pages[ABOUTUS_SLUG_TO_PAGE[slug]].title;
  const breadcrumbs = [
    { name: dictionaries[lang].nav.home, href: "/" },
    { name: dictionaries[lang].pages.aboutus.title, href: "/aboutus" },
    { name: pageTitle },
  ];

  return (
    <main>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <AboutSubClient slug={slug} />
    </main>
  );
}
