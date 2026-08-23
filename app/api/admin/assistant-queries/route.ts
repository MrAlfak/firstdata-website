import type { NextRequest } from "next/server";
import { jsonError, jsonOk } from "@/lib/auth/api";
import { requireStaffOrError } from "@/lib/panel/admin-api";
import {
  getAssistantStats,
  listAssistantQueryAggregates,
  updateAssistantQueryMeta,
} from "@/lib/assistant/query-log";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { error } = await requireStaffOrError(req);
  if (error) return error;

  if (req.nextUrl.searchParams.get("stats") === "1") {
    return jsonOk({ stats: getAssistantStats() });
  }

  const unmatchedOnly = req.nextUrl.searchParams.get("unmatched") === "1";
  const status = req.nextUrl.searchParams.get("status") ?? undefined;

  return jsonOk({
    queries: listAssistantQueryAggregates({ unmatchedOnly, status }),
    stats: getAssistantStats(),
  });
}

export async function PATCH(req: NextRequest) {
  const { error } = await requireStaffOrError(req);
  if (error) return error;

  const body = await req.json();
  const queryNorm = typeof body.queryNorm === "string" ? body.queryNorm : "";
  if (!queryNorm) return jsonError("queryNorm required", 400);

  const patch: {
    note?: string;
    status?: string;
    answer_fa?: string;
    answer_en?: string;
    keywords?: string;
  } = {};

  if (typeof body.note === "string") patch.note = body.note.slice(0, 4000);
  if (typeof body.status === "string") patch.status = body.status.slice(0, 40);
  if (typeof body.answer_fa === "string") patch.answer_fa = body.answer_fa.slice(0, 8000);
  if (typeof body.answer_en === "string") patch.answer_en = body.answer_en.slice(0, 8000);
  if (typeof body.keywords === "string") patch.keywords = body.keywords.slice(0, 1000);

  if (!updateAssistantQueryMeta(queryNorm, patch)) {
    return jsonError(
      "Update failed — published answers need answer_fa or answer_en",
      400,
    );
  }
  return jsonOk({ updated: true });
}
