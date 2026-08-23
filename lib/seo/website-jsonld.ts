import { SITE_URL, absoluteUrl } from "@/lib/seo/site";

/** WebSite schema with sitelinks search box pointing at /search. */
export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "First Data",
    alternateName: ["اولین دیتا", "FirstData"],
    inLanguage: ["fa-IR", "en-US"],
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl("/search")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
