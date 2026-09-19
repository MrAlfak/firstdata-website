import type { Metadata } from "next";
import StatusPage from "@/components/status/StatusPage";
import { statusPageDictionaries } from "@/i18n/status-page";
import { getRequestLang } from "@/lib/i18n/request-lang";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  const ui = statusPageDictionaries[lang];
  return pageMetadata({
    path: "/status",
    title: ui.metaTitle,
    description: ui.metaDescription,
    lang,
  });
}

export default function Page() {
  return <StatusPage />;
}
