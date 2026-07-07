import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import AmbientLayer from "@/components/AmbientLayer";
import ConsoleBrand from "@/components/ConsoleBrand";
import SiteAnalytics, { CookieBanner } from "@/components/analytics/SiteAnalytics";
import ClientErrorReporter from "@/components/monitoring/ClientErrorReporter";
import SystemWatchers from "@/components/errors/SystemWatchers";
import ServiceWorkerRegistrar from "@/components/pwa/ServiceWorkerRegistrar";
import PwaPrompts from "@/components/pwa/PwaPrompts";
import Preloader from "@/components/Preloader";
import PageNavPreloader from "@/components/navigation/PageNavPreloader";
import DocumentTitle from "@/components/seo/DocumentTitle";
import ScrollProgress from "@/components/ScrollProgress";
import { LangProvider } from "@/i18n/LangProvider";
import { ThemeProvider } from "@/i18n/ThemeProvider";
import { ORG_GEO, ORG_OPENING_HOURS_JSON_LD, SITE_URL } from "@/lib/seo/site";
import "./globals.css";
// Self-hosted (no Google fetch), same faces, served from /public/fonts.
// Both are variable woff2 covering the 400,700 weight range.
const mono = localFont({
  src: "../public/fonts/jetbrains/JetBrainsMono-latin.woff2", variable: "--font-mono", weight: "400 700", display: "swap", });

const pixel = localFont({
  src: "../public/fonts/pixelify/PixelifySans-latin.woff2", variable: "--font-pixel", weight: "400 700", display: "swap", });

export const viewport: Viewport = { themeColor: "#080c08" };

export const metadata: Metadata = {  metadataBase: new URL(SITE_URL), title: {
    default: "First Data, We Build. You Grow.", template: "%s, First Data", }, description:
    "First Data builds custom websites, Android apps, iOS apps, Windows software, and SEO optimization for businesses. طراحی سایت، اپلیکیشن موبایل، نرم‌افزار ویندوز و سئو حرفه‌ای.", keywords: [
    // English keywords
    "web design", "web development", "Android app development", "iOS app development", "Windows software", "desktop application", "SEO optimization", "UI/UX design", "e-commerce development", "Next.js developer", "React developer", "mobile app", "enterprise software", "first data", "firstdata.ir", // Persian keywords
    "طراحی سایت", "توسعه وب", "اپلیکیشن اندروید", "اپلیکیشن iOS", "نرم‌افزار ویندوز", "سئو", "بهینه‌سازی سایت", "فروشگاه اینترنتی", "طراحی UI UX", "برنامه‌نویسی موبایل", "اولین دیتا", ], authors: [{ name: "First Data", url: SITE_URL }], creator: "First Data", publisher: "First Data", robots: {
    index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" }, }, alternates: {
    canonical: SITE_URL, languages: {
      fa: `${SITE_URL}?lang=fa`, en: `${SITE_URL}?lang=en`, "x-default": SITE_URL, }, }, openGraph: {
    title: "First Data, We Build. You Grow.", description:
      "Custom websites, Android & iOS apps, Windows software, and SEO, engineered to drive real business results.", url: SITE_URL, siteName: "First Data", type: "website", locale: "fa_IR", alternateLocale: ["en_US"], // OG image is generated dynamically by app/opengraph-image.tsx
  }, twitter: {
    card: "summary_large_image", title: "First Data, We Build. You Grow.", description:
      "Custom websites, Android & iOS apps, Windows software, and SEO.", // Twitter image inherits from app/opengraph-image.tsx
  }, // Favicon (app/icon.svg) and apple-touch icon (app/apple-icon.tsx) are
  // auto-detected by Next.js file conventions, no explicit paths needed.
};

const organizationJsonLd = {
  "@context": "https://schema.org", "@type": ["ProfessionalService", "LocalBusiness"], "@id": `${SITE_URL}/#organization`, name: "First Data", alternateName: ["اولین دیتا", "FirstData"], url: SITE_URL, logo: `${SITE_URL}/icon.svg`, image: `${SITE_URL}/opengraph-image`, description:
    "First Data engineers custom websites, Android apps, iOS apps, Windows software, and SEO optimization for businesses of all sizes.", email: "info@firstdata.ir", telephone: "+989331274039", priceRange: "$$", areaServed: { "@type": "Country", name: "Iran" }, address: {
    "@type": "PostalAddress", addressLocality: "Tehran", addressCountry: "IR", }, geo: {
    "@type": "GeoCoordinates", latitude: ORG_GEO.latitude, longitude: ORG_GEO.longitude, }, openingHoursSpecification: ORG_OPENING_HOURS_JSON_LD, sameAs: [], hasOfferCatalog: {
    "@type": "OfferCatalog", name: "Digital Development Services", itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Design & Development", description: "Custom websites built with Next.js, React, and Laravel." } }, { "@type": "Offer", itemOffered: { "@type": "Service", name: "Android App Development", description: "Native Android apps built with Kotlin and Jetpack Compose." } }, { "@type": "Offer", itemOffered: { "@type": "Service", name: "iOS App Development", description: "Premium iOS apps built with Swift and SwiftUI." } }, { "@type": "Offer", itemOffered: { "@type": "Service", name: "Windows & Desktop Software", description: "Professional desktop applications with C#, WPF, and WinUI 3." } }, { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO & Performance Optimization", description: "Technical SEO, Core Web Vitals, and keyword strategy." } }, { "@type": "Offer", itemOffered: { "@type": "Service", name: "UI/UX Design", description: "User research, Figma prototypes, and design systems." } }, { "@type": "Offer", itemOffered: { "@type": "Service", name: "E-Commerce & Online Stores", description: "Custom storefronts with Zarinpal and Stripe payment gateways." } }, { "@type": "Offer", itemOffered: { "@type": "Service", name: "Support & Ongoing Development", description: "SLA-backed maintenance and continuous feature development." } }, ], }, };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" data-theme="dark" data-scroll-behavior="smooth" suppressHydrationWarning className={`${mono.variable} ${pixel.variable}`}>
      <head>
        {/* Pre-paint: locale + theme (no flash) */}
        <link rel="alternate" type="application/rss+xml" hrefLang="en" title="First Data Blog (English)" href={`${SITE_URL}/blog/rss.xml`} />
        <link rel="alternate" type="application/rss+xml" hrefLang="fa" title="وبلاگ اولین دیتا (فارسی)" href={`${SITE_URL}/blog/rss/fa.xml`} />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var e=document.documentElement;var q=new URLSearchParams(location.search);var l=q.get('lang');if(l==='fa'||l==='en'){localStorage.setItem('fd-lang',l);document.cookie='fd-lang='+l+';path=/;max-age=31536000;SameSite=Lax';e.dir=l==='fa'?'rtl':'ltr';e.lang=l;}else if(localStorage.getItem('fd-lang')==='fa'){e.dir='rtl';e.lang='fa';}var t=localStorage.getItem('fd-theme');e.setAttribute('data-theme',t==='light'?'light':'dark');}catch(x){}})();", }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="font-mono bg-ink text-paper antialiased">
        <ThemeProvider>
          <LangProvider>
            <DocumentTitle />
            <Preloader />
            <PageNavPreloader />
            <ScrollProgress />
            <AmbientLayer />
            <SystemWatchers />
            <ServiceWorkerRegistrar />
            <PwaPrompts />
            <ConsoleBrand />
            <ClientErrorReporter />
            <CookieBanner />
            <SiteAnalytics />
            {children}
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
