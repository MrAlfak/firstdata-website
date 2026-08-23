import type { Metadata } from "next";
import StatusPage from "@/components/status/StatusPage";
import { statusPageDictionaries } from "@/i18n/status-page";
import { getRequestLang } from "@/lib/i18n/request-lang";
import { SITE_URL } from "@/lib/seo/site";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  const ui = statusPageDictionaries[lang];
  return {
    title: ui.metaTitle,
    description: ui.metaDescription,
    alternates: { canonical: `${SITE_URL}/status` },
  };
}

export default function Page() {
  return <StatusPage />;
}
