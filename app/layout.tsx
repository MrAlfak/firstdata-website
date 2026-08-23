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
import SiteSkinRoot from "@/components/SiteSkinRoot";
import { AlertProvider } from "@/components/alerts/AlertProvider";
import AlertStack from "@/components/alerts/AlertStack";
import AlertWatchers from "@/components/alerts/AlertWatchers";
import { LangProvider } from "@/i18n/LangProvider";
import { ThemeProvider } from "@/i18n/ThemeProvider";
import { getRequestLang } from "@/lib/i18n/request-lang";
import { getRequestPanelSkin } from "@/lib/i18n/request-panel-skin";
import { PanelSkinProvider } from "@/components/panel/PanelSkinToggle";
import { ORG_GEO, ORG_OPENING_HOURS_JSON_LD, SITE_URL } from "@/lib/seo/site";
import { buildWebsiteJsonLd } from "@/lib/seo/website-jsonld";
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

/* Query → SSR html[lang] → cookie → localStorage → fa. Never let stale storage override SSR.
   Skin: ?skin=terminal|modern (or ?view=builder|business) wins, else localStorage, else modern. */
const LANG_BOOT_SCRIPT =
  "(function(){try{var e=document.documentElement;var q=new URLSearchParams(location.search);var l=q.get('lang');var cookie=((document.cookie.split('; ').find(function(r){return r.indexOf('fd-lang=')===0;})||'').split('=')[1]||'').trim().toLowerCase();var stored=(localStorage.getItem('fd-lang')||'').trim().toLowerCase();var ssr=(e.lang||'').trim().toLowerCase();var lang=(l==='fa'||l==='en')?l:(ssr==='fa'||ssr==='en')?ssr:(cookie==='en'||cookie==='fa')?cookie:(stored==='en'||stored==='fa')?stored:'fa';localStorage.setItem('fd-lang',lang);document.cookie='fd-lang='+lang+';path=/;max-age=31536000;SameSite=Lax';e.dir=lang==='fa'?'rtl':'ltr';e.lang=lang;var t=localStorage.getItem('fd-theme');e.setAttribute('data-theme',t==='light'?'light':'dark');var qSkin=(q.get('skin')||'').trim().toLowerCase();var qView=(q.get('view')||'').trim().toLowerCase();var sk;if(qSkin==='terminal'||qSkin==='modern'){sk=qSkin;}else if(qView==='builder'||qView==='56k'||qView==='terminal'){sk='terminal';}else if(qView==='business'||qView==='ai'||qView==='modern'){sk='modern';}else{sk=localStorage.getItem('fd-panel-skin');sk=sk==='terminal'?'terminal':'modern';}localStorage.setItem('fd-panel-skin',sk);e.setAttribute('data-panel-skin',sk);document.cookie='fd-panel-skin='+sk+';path=/;max-age=31536000;SameSite=Lax';}catch(x){}})();";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getRequestLang();
  const panelSkin = await getRequestPanelSkin();
  const dir = lang === "fa" ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={dir} data-theme="dark" data-panel-skin={panelSkin} data-scroll-behavior="smooth" suppressHydrationWarning className={`${mono.variable} ${pixel.variable}`}>
      <head>
        {/* Pre-paint: locale + theme + skin (no flash) */}
        <link rel="alternate" type="application/rss+xml" hrefLang="en" title="First Data Blog (English)" href={`${SITE_URL}/blog/rss.xml`} />
        <link rel="alternate" type="application/rss+xml" hrefLang="fa" title="وبلاگ اولین دیتا (فارسی)" href={`${SITE_URL}/blog/rss/fa.xml`} />
        <link rel="alternate" type="application/atom+xml" hrefLang="en" title="First Data Blog Atom (English)" href={`${SITE_URL}/blog/atom.xml`} />
        <link rel="alternate" type="application/atom+xml" hrefLang="fa" title="وبلاگ اولین دیتا Atom (فارسی)" href={`${SITE_URL}/blog/atom/fa.xml`} />
        <link rel="author" href={`${SITE_URL}/humans.txt`} />
        <link rel="describedby" href={`${SITE_URL}/llms.txt`} />
        <script
          dangerouslySetInnerHTML={{
            __html: LANG_BOOT_SCRIPT,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebsiteJsonLd()) }}
        />
      </head>
      <body className="font-mono bg-ink text-paper antialiased">
        <ThemeProvider>
          <LangProvider initialLang={lang}>
            <PanelSkinProvider initialSkin={panelSkin}>
              <AlertProvider>
                <DocumentTitle />
                <Preloader />
                <PageNavPreloader />
                <ScrollProgress />
                <AmbientLayer />
                <SiteSkinRoot />
                <AlertWatchers />
                <AlertStack />
                <SystemWatchers />
                <ServiceWorkerRegistrar />
                <PwaPrompts />
                <ConsoleBrand />
                <ClientErrorReporter />
                <CookieBanner />
                <SiteAnalytics />
                {children}
              </AlertProvider>
            </PanelSkinProvider>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
