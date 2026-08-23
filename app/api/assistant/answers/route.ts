import { jsonOk } from "@/lib/auth/api";
import { listPublishedAnswers } from "@/lib/assistant/query-log";

export const runtime = "nodejs";

/** Public: published Q&A used by the homepage assistant */
export async function GET() {
  return jsonOk({ answers: listPublishedAnswers() });
}
