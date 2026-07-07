import { blogRssResponse } from "@/lib/seo/rss";

/** Persian blog RSS — auto-synced from config/blog.ts */
export const dynamic = "force-dynamic";

export async function GET() {
  return blogRssResponse("fa");
}
