import type { Metadata } from "next";
import AboutUsClient from "./AboutUsClient";
import { dictionaries } from "@/i18n/dictionaries";
import { getRequestLang } from "@/lib/i18n/request-lang";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  const page = dictionaries[lang].pages.aboutus;
  return pageMetadata({
    path: "/aboutus",
    title: page.title,
    description: `${page.subtitle} ${page.lines[0] ?? ""}`.trim(),
    lang,
  });
}

export default function AboutUsPage() {
  return (
    <main>
      <AboutUsClient />
    </main>
  );
}
