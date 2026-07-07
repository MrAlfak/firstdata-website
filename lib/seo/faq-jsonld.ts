type FaqItem = { q: string; a: string };

export function buildFaqJsonLd(items: FaqItem[], lang: "en" | "fa" = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang === "fa" ? "fa-IR" : "en-US",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function buildBilingualFaqJsonLd(enItems: FaqItem[], faItems: FaqItem[]) {
  return [buildFaqJsonLd(enItems, "en"), buildFaqJsonLd(faItems, "fa")];
}
