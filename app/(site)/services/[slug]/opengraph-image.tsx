import { SERVICES_SLUG_TO_NUMBER } from "@/config/navigation";
import { consultingPageDictionaries } from "@/i18n/consulting-page";
import { iosPageDictionaries } from "@/i18n/ios-page";
import { seoPageDictionaries } from "@/i18n/seo-page";
import { supportPageDictionaries } from "@/i18n/support-page";
import { renderOgImage } from "@/lib/seo/og-image";

export const dynamic = "force-dynamic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TITLES: Record<string, string> = {
  "web-design": "Website Design",
  "ui-ux": "UI/UX Design",
  ecommerce: "Online Store",
  android: "Android App",
  ios: "iOS App",
  seo: "SEO & Optimization",
  consulting: "Consulting & Project Analysis",
  support: "Support & Development",
};

type Props = { params: Promise<{ slug: string }> };

const OG_SUBTITLES: Record<string, string> = {
  ios: iosPageDictionaries.fa.hero.body,
  seo: seoPageDictionaries.fa.hero.body,
  consulting: consultingPageDictionaries.fa.hero.body,
  support: supportPageDictionaries.fa.hero.body,
};

export default async function ServiceOgImage({ params }: Props) {
  const { slug } = await params;
  const title = TITLES[slug] ?? "Services";
  const num = SERVICES_SLUG_TO_NUMBER[slug];
  const subtitle =
    OG_SUBTITLES[slug] ??
    (num ? `Service module ${num}, First Data` : "First Data services");

  return renderOgImage({
    title: title.toUpperCase(),
    subtitle,
    eyebrow: "// services.firstdata.ir",
  });
}
