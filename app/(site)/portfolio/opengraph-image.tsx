import { renderOgImage } from "@/lib/seo/og-image";

export const dynamic = "force-dynamic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function PortfolioOgImage() {
  return renderOgImage({
    title: "PORTFOLIO",
    subtitle: "Real deliveries across web, mobile, desktop, and commerce.",
    eyebrow: "// portfolio.firstdata.ir",
  });
}
