import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CONTACT_SLUGS, CONTACT_SLUG_TO_PAGE } from "@/config/navigation";
import ContactSubClient from "./ContactSubClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return CONTACT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pageKey = CONTACT_SLUG_TO_PAGE[slug];
  if (!pageKey) {
    return { title: "Not Found" };
  }

  const titles: Record<string, string> = {
    request: "Submit Project Request",
    consultation: "Free Consultation",
    collaborate: "Work With Us",
  };

  const title = titles[slug] ?? "Contact";

  return {
    title,
    description: `First Data, ${title}`,
    alternates: { canonical: `https://firstdata.ir/contactus/${slug}` },
  };
}

export default async function ContactSubPage({ params }: Props) {
  const { slug } = await params;
  if (!CONTACT_SLUGS.includes(slug)) {
    notFound();
  }

  return (
    <main className="pt-20">
      <ContactSubClient slug={slug} />
    </main>
  );
}
