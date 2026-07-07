import { buildBreadcrumbJsonLd, type BreadcrumbItem } from "@/lib/seo/breadcrumbs";
import { SITE_URL } from "@/lib/seo/site";

export default function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = buildBreadcrumbJsonLd(items, SITE_URL);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
