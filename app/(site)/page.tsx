import type { Metadata } from "next";
import Hero from "@/components/Hero";
import HomeServicesRow from "@/components/sales/HomeServicesRow";
import HomeProductsRow from "@/components/sales/HomeProductsRow";
import WhyUs from "@/components/sales/WhyUs";
import FinalCta from "@/components/sales/FinalCta";
import TerminalSection from "@/components/interactive/TerminalSection";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  path: "/",
  title: "First Data | We Build. You Grow.",
  description:
    "First Data builds custom websites, Android apps, iOS apps, Windows software, and provides SEO optimization. طراحی سایت، اپلیکیشن موبایل، نرم‌افزار ویندوز و سئو حرفه‌ای.",
});

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
