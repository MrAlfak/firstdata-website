import type { Metadata } from "next";
import MethodPage from "@/components/method/MethodPage";
import { methodPageDictionaries } from "@/i18n/method-page";
import { getRequestLang } from "@/lib/i18n/request-lang";
import { SITE_URL } from "@/lib/seo/site";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  const ui = methodPageDictionaries[lang];
  return {
    title: ui.metaTitle,
    description: ui.metaDescription,
    alternates: { canonical: `${SITE_URL}/method` },
  };
}

export default function Page() {
  return <MethodPage />;
}
