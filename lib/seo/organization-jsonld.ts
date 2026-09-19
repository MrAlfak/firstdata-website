import { SOCIAL_LINKS } from "@/config/social";
import {
  ORG_ADDRESS,
  ORG_GEO,
  ORG_OPENING_HOURS_JSON_LD,
  SITE_URL,
} from "@/lib/seo/site";

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: "First Data",
    alternateName: ["اولین دیتا", "FirstData"],
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    image: `${SITE_URL}/opengraph-image`,
    description:
      "First Data engineers custom websites, Android apps, iOS apps, Windows software, and SEO optimization for businesses of all sizes.",
    email: "info@firstdata.ir",
    telephone: "+989331274039",
    priceRange: "$$",
    areaServed: { "@type": "Country", name: "Iran" },
    address: {
      "@type": "PostalAddress",
      streetAddress: ORG_ADDRESS.streetAddress,
      addressLocality: ORG_ADDRESS.addressLocality,
      addressRegion: ORG_ADDRESS.addressRegion,
      addressCountry: ORG_ADDRESS.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: ORG_GEO.latitude,
      longitude: ORG_GEO.longitude,
    },
    openingHoursSpecification: ORG_OPENING_HOURS_JSON_LD,
    sameAs: SOCIAL_LINKS.map((link) => link.href),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Design & Development",
            description: "Custom websites built with Next.js, React, and Laravel.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Android App Development",
            description: "Native Android apps built with Kotlin and Jetpack Compose.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "iOS App Development",
            description: "Premium iOS apps built with Swift and SwiftUI.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Windows & Desktop Software",
            description: "Professional desktop applications with C#, WPF, and WinUI 3.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO & Performance Optimization",
            description: "Technical SEO, Core Web Vitals, and keyword strategy.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UI/UX Design",
            description: "User research, Figma prototypes, and design systems.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "E-Commerce & Online Stores",
            description: "Custom storefronts with Zarinpal and Stripe payment gateways.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Support & Ongoing Development",
            description: "SLA-backed maintenance and continuous feature development.",
          },
        },
      ],
    },
  };
}
