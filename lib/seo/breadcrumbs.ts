export type BreadcrumbItem = {
  name: string;
  href?: string;
};

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[], baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.href
        ? { item: item.href.startsWith("http") ? item.href : `${baseUrl}${item.href}` }
        : {}),
    })),
  };
}
