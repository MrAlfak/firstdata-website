import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CONTACT_SLUGS, CONTACT_SLUG_TO_PAGE, type ContactSubPageKey } from "@/config/navigation";
import { dictionaries } from "@/i18n/dictionaries";
import { getRequestLang } from "@/lib/i18n/request-lang";
import { pageMetadata } from "@/lib/seo/metadata";
import ContactSubClient from "./ContactSubClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return CONTACT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pageKey = CONTACT_SLUG_TO_PAGE[slug] as ContactSubPageKey | undefined;
  if (!pageKey) {
    return { title: "Not Found", robots: { index: false, follow: false } };
  }

  const lang = await getRequestLang();
  const page = dictionaries[lang].pages[pageKey];

  return pageMetadata({
    path: `/contactus/${slug}`,
    title: page.title,
    description: page.subtitle,
    lang,
  });
}

export default async function ContactSubPage({ params }: Props) {
  const { slug } = await params;
  if (!CONTACT_SLUGS.includes(slug)) {
    notFound();
  }

  return (
    <main>
      <ContactSubClient slug={slug} />
    </main>
  );
}
