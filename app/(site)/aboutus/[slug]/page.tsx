import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import BreadcrumbNav from "@/components/seo/BreadcrumbNav";
import { ABOUTUS_SLUGS, ABOUTUS_SLUG_TO_PAGE } from "@/config/navigation";
import { aboutHonorsPageDictionaries } from "@/i18n/about-honors-page";
import { aboutPartnersPageDictionaries } from "@/i18n/about-partners-page";
import { aboutTeamPageDictionaries } from "@/i18n/about-team-page";
import { dictionaries } from "@/i18n/dictionaries";
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

  const page = dictionaries.en.pages[pageKey];
  const path = `/aboutus/${slug}`;
  const description =
    slug === "team"
      ? aboutTeamPageDictionaries.en.hero.body
      : slug === "partners"
        ? aboutPartnersPageDictionaries.en.hero.body
        : slug === "honors"
          ? aboutHonorsPageDictionaries.en.hero.body
          : `${page.subtitle} ${page.lines[0] ?? ""}`.trim();

  return pageMetadata({
    path,
    title: page.title,
    description,
  });
}

export default async function AboutSubPage({ params }: Props) {
  const { slug } = await params;
  if (!ABOUTUS_SLUGS.includes(slug)) {
    notFound();
  }

  const pageTitle = dictionaries.en.pages[ABOUTUS_SLUG_TO_PAGE[slug]].title;
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: dictionaries.en.pages.aboutus.title, href: "/aboutus" },
    { name: pageTitle },
  ];

  return (
    <main>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <div className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <BreadcrumbNav items={breadcrumbs} />
      </div>
      <AboutSubClient slug={slug} />
    </main>
  );
}
