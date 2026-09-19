import type { Metadata } from "next";
import MethodPage from "@/components/method/MethodPage";
import { methodPageDictionaries } from "@/i18n/method-page";
import { getRequestLang } from "@/lib/i18n/request-lang";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  const ui = methodPageDictionaries[lang];
  return pageMetadata({
    path: "/method",
    title: ui.metaTitle,
    description: ui.metaDescription,
    lang,
  });
}

export default function Page() {
  return <MethodPage />;
}
