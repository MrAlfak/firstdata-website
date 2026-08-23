import { renderOgImage } from "@/lib/seo/og-image";

export const dynamic = "force-dynamic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function AboutOgImage() {
  return renderOgImage({
    title: "ABOUT FIRST DATA",
    subtitle: "Fifteen years building software — same passion, more experience.",
    eyebrow: "// aboutus.firstdata.ir",
  });
}
