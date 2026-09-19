import type { Metadata } from "next";
import TermsClient from "./TermsClient";
import { dictionaries } from "@/i18n/dictionaries";
import { getRequestLang } from "@/lib/i18n/request-lang";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  const terms = dictionaries[lang].terms;
  return pageMetadata({
    path: "/terms",
    title: terms.title,
    description: terms.subtitle,
    lang,
  });
}

export default function TermsPage() {
  return (
    <main>
      <TermsClient />
    </main>
  );
}
