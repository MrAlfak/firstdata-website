import { renderOgImage } from "@/lib/seo/og-image";

export const dynamic = "force-dynamic";
export const alt = "First Data, We Build. You Grow.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return renderOgImage({
    title: "FIRST DATA", subtitle: "We Build. You Grow.", eyebrow: "// web.mobile.desktop.seo, delivered.", footer: "firstdata.ir, info@firstdata.ir", });
}
