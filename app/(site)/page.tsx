import type { Metadata } from "next";
import Hero from "@/components/Hero";
import HomeServicesRow from "@/components/sales/HomeServicesRow";
import HomeProductsRow from "@/components/sales/HomeProductsRow";
import WhyUs from "@/components/sales/WhyUs";
import FinalCta from "@/components/sales/FinalCta";
import TerminalSection from "@/components/interactive/TerminalSection";
import { getRequestLang } from "@/lib/i18n/request-lang";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  const title =
    lang === "fa"
      ? "اولین دیتا | ما می‌سازیم. شما رشد می‌کنید."
      : "First Data | We Build. You Grow.";
  const description =
    lang === "fa"
      ? "اولین دیتا وب‌سایت سفارشی، اپلیکیشن اندروید و iOS، نرم‌افزار ویندوز و سئو حرفه‌ای می‌سازد."
      : "First Data builds custom websites, Android apps, iOS apps, Windows software, and provides SEO optimization. طراحی سایت، اپلیکیشن موبایل، نرم‌افزار ویندوز و سئو حرفه‌ای.";

  return pageMetadata({
    path: "/",
    title,
    description,
    lang,
    absoluteTitle: true,
  });
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HomeServicesRow />
      <HomeProductsRow />
      <WhyUs />
      <FinalCta plain />
      <TerminalSection showIntro />
    </main>
  );
}
