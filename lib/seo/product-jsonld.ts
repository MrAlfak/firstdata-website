import type { ProductSlug } from "@/i18n/product-page";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://firstdata.ir";

type ProductJsonLdInput = {
  slug: ProductSlug;
  name: string;
  description: string;
  lang?: "fa" | "en";
};

export function buildProductJsonLd({ slug, name, description, lang = "en" }: ProductJsonLdInput) {
  const url = `${SITE_URL}/product/${slug}`;
  const inLanguage = lang === "fa" ? "fa-IR" : "en-US";

  return [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name,
      description,
      url,
      inLanguage,
      brand: {
        "@type": "Organization",
        name: "First Data",
        url: SITE_URL,
      },
      category: name,
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name,
      description,
      url,
      inLanguage,
      provider: {
        "@type": "Organization",
        name: "First Data",
        url: SITE_URL,
      },
      areaServed: {
        "@type": "Country",
        name: "Iran",
      },
      serviceType: name,
    },
  ];
}

export function buildProductHubJsonLd(title: string, description: string) {
  const url = `${SITE_URL}/product`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: "First Data",
      url: SITE_URL,
    },
  };
}
