import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { dictionaries } from "@/i18n/dictionaries";
import { getRequestLang } from "@/lib/i18n/request-lang";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  const c = dictionaries[lang].contact;

  return pageMetadata({
    path: "/contactus",
    title: c.title,
    description: c.subtitle,
  });
}

export default function ContactUsPage() {
  return (
    <main className="pt-20">
      <ContactClient />
    </main>
  );
}
