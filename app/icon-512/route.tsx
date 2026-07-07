import { renderAppIcon } from "@/lib/seo/og-image";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET() {
  return renderAppIcon(512);
}
