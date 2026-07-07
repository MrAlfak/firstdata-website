import { blogRssResponse } from "@/lib/seo/rss";

/** Regenerate from config/blog.ts on each request (new posts appear without manual RSS edits). */
export const dynamic = "force-dynamic";

export async function GET() {
  return blogRssResponse("en");
}
