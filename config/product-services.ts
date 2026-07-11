import type { ProductSlug } from "@/i18n/product-page";

/** Related service pages per product slug (cross-link graph). */
export const PRODUCT_SERVICE_LINKS: Record<ProductSlug, { href: string; labelKey: string }[]> = {
  web: [
    { href: "/services/web-design", labelKey: "nav.serviceWeb" },
    { href: "/services/seo", labelKey: "nav.serviceSeo" },
    { href: "/services/ui-ux", labelKey: "nav.serviceUiUx" },
  ],
  mobile: [
    { href: "/services/android", labelKey: "nav.serviceAndroid" },
    { href: "/services/ios", labelKey: "nav.serviceIos" },
    { href: "/services/support", labelKey: "nav.serviceSupport" },
  ],
  windows: [
    { href: "/services/consulting", labelKey: "nav.serviceConsulting" },
    { href: "/services/support", labelKey: "nav.serviceSupport" },
  ],
  ai: [
    { href: "/services/consulting", labelKey: "nav.serviceConsulting" },
    { href: "/services/support", labelKey: "nav.serviceSupport" },
  ],
  platforms: [
    { href: "/services/consulting", labelKey: "nav.serviceConsulting" },
    { href: "/services/web-design", labelKey: "nav.serviceWeb" },
    { href: "/services/support", labelKey: "nav.serviceSupport" },
  ],
};
