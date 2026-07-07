import type { Metadata } from "next";
import AboutUsClient from "./AboutUsClient";
import { dictionaries } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo/metadata";

const en = dictionaries.en.pages.aboutus;

export const metadata: Metadata = pageMetadata({
  path: "/aboutus",
  title: en.title,
  description: `${en.subtitle} ${en.lines[0] ?? ""}`.trim(),
});

export default function AboutUsPage() {
  return (
    <main>
      <AboutUsClient />
    </main>
  );
}
