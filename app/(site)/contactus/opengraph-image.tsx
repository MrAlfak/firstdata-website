import { renderOgImage } from "@/lib/seo/og-image";

export const dynamic = "force-dynamic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function ContactOgImage() {
  return renderOgImage({
    title: "CONTACT US", subtitle: "Start a conversation, no sales pressure.", eyebrow: "// get in touch", });
}
