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
import { SITE_URL } from "@/lib/seo/site";
import { buildOrganizationJsonLd } from "@/lib/seo/organization-jsonld";
import { buildWebsiteJsonLd } from "@/lib/seo/website-jsonld";
import "./globals.css";
// Self-hosted (no Google fetch), same faces, served from /public/fonts.
// Both are variable woff2 covering the 400,700 weight range.
const mono = localFont({
  src: "../public/fonts/jetbrains/JetBrainsMono-latin.woff2", variable: "--font-mono", weight: "400 700", display: "swap", });

const pixel = localFont({
  src: "../public/fonts/pixelify/PixelifySans-latin.woff2", variable: "--font-pixel", weight: "400 700", display: "swap", });

export const viewport: Viewport = { themeColor: "#080c08" };

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  const fa = lang === "fa";
  const defaultTitle = fa
    ? "اولین دیتا | ما می‌سازیم. شما رشد می‌کنید."
    : "First Data | We Build. You Grow.";
  const description = fa
    ? "اولین دیتا وب‌سایت سفارشی، اپلیکیشن اندروید و iOS، نرم‌افزار ویندوز و سئو حرفه‌ای می‌سازد."
    : "First Data builds custom websites, Android apps, iOS apps, Windows software, and SEO optimization for businesses. طراحی سایت، اپلیکیشن موبایل، نرم‌افزار ویندوز و سئو حرفه‌ای.";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: defaultTitle,
      template: fa ? "%s | اولین دیتا" : "%s | First Data",
    },
    description,
    keywords: [
      "web design",
      "web development",
      "Android app development",
      "iOS app development",
      "Windows software",
      "desktop application",
      "SEO optimization",
      "UI/UX design",
      "e-commerce development",
      "Next.js developer",
      "React developer",
      "mobile app",
      "enterprise software",
      "first data",
      "firstdata.ir",
      "طراحی سایت",
      "توسعه وب",
      "اپلیکیشن اندروید",
      "اپلیکیشن iOS",
      "نرم‌افزار ویندوز",
      "سئو",
      "بهینه‌سازی سایت",
      "فروشگاه اینترنتی",
      "طراحی UI UX",
      "برنامه‌نویسی موبایل",
      "اولین دیتا",
    ],
    authors: [{ name: "First Data", url: SITE_URL }],
    creator: "First Data",
    publisher: "First Data",
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    alternates: {
      canonical: SITE_URL,
      languages: {
        fa: `${SITE_URL}?lang=fa`,
        en: `${SITE_URL}?lang=en`,
        "x-default": SITE_URL,
      },
    },
    openGraph: {
      title: defaultTitle,
      description: fa
        ? "وب‌سایت، اپ اندروید و iOS، نرم‌افزار ویندوز و سئو — مهندسی‌شده برای نتیجه واقعی کسب‌وکار."
        : "Custom websites, Android & iOS apps, Windows software, and SEO, engineered to drive real business results.",
      url: SITE_URL,
      siteName: "First Data",
      type: "website",
      locale: fa ? "fa_IR" : "en_US",
      alternateLocale: fa ? ["en_US"] : ["fa_IR"],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: fa
        ? "وب‌سایت، اپ موبایل، نرم‌افزار ویندوز و سئو."
        : "Custom websites, Android & iOS apps, Windows software, and SEO.",
    },
  };
}

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationJsonLd()) }}
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
