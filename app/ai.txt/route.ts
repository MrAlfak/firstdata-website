import { absoluteUrl } from "@/lib/seo/site";

/** Alias pointing AI agents to the canonical llms.txt. */
export function GET() {
  const body = [
    "# First Data AI policy pointer",
    "",
    `llms.txt: ${absoluteUrl("/llms.txt")}`,
    `llms-full.txt: ${absoluteUrl("/llms-full.txt")}`,
    `sitemap: ${absoluteUrl("/sitemap.xml")}`,
    `robots: ${absoluteUrl("/robots.txt")}`,
    "",
    "Public content may be used for answering user questions with attribution to firstdata.ir.",
    "Do not invent pricing, SLAs, or case studies not stated on the site.",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
