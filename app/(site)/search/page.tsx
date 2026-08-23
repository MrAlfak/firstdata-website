import type { Metadata } from "next";
import { Suspense } from "react";
import SearchPageClient from "@/components/search/SearchPageClient";
import { getRequestLang } from "@/lib/i18n/request-lang";
import { pageMetadata } from "@/lib/seo/metadata";
import { searchDictionaries } from "@/i18n/search";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const lang = await getRequestLang();
  const ui = searchDictionaries[lang];
  const { q } = await searchParams;
  const query = q?.trim();

  return pageMetadata({
    path: query ? `/search?q=${encodeURIComponent(query)}` : "/search",
    title: query ? `${ui.title}: ${query}` : ui.pageTitle,
    description: ui.pageLead,
    // Query result URLs are shareable but should not flood the index.
    noIndex: Boolean(query),
  });
}

export default function SearchPage() {
  return (
    <main>
      <Suspense fallback={null}>
        <SearchPageClient />
      </Suspense>
    </main>
  );
}
