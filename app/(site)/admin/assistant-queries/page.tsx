"use client";

import { useEffect, useState } from "react";
import { useT } from "@/i18n/LangProvider";
import { PanelCard, PanelEmpty, PanelLoading } from "@/components/panel/PanelLayoutClient";

type Row = {
  query_norm: string;
  raw_sample: string;
  hits: number;
  matched: number;
  modes: string;
  langs: string;
  first_seen: string;
  last_seen: string;
  note: string | null;
  answer_fa: string | null;
  answer_en: string | null;
  keywords: string | null;
  status: string;
};

type Stats = {
  totalEvents: number;
  matchedEvents: number;
  matchRate: number;
  distinctQueries: number;
  unmatchedDistinct: number;
  byLang: { fa: number; en: number };
  byStatus: Record<string, number>;
  topUnmatched: { query_norm: string; raw_sample: string; hits: number }[];
};

type Draft = {
  note: string;
  answer_fa: string;
  answer_en: string;
  keywords: string;
};

export default function AdminAssistantQueriesPage() {
  const { dir, a, fa } = useT();
  const t = a.assistantQueries;
  const [rows, setRows] = useState<Row[] | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [filter, setFilter] = useState<
    "all" | "unmatched" | "open" | "draft" | "published" | "done"
  >("unmatched");
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [busy, setBusy] = useState<string | null>(null);

  function load() {
    const params = new URLSearchParams();
    if (filter === "unmatched") params.set("unmatched", "1");
    else if (filter !== "all") params.set("status", filter);
    fetch(`/api/admin/assistant-queries?${params}`)
      .then((r) => r.json())
      .then((j) => {
        if (!j.success) return;
        setRows(j.queries);
        if (j.stats) setStats(j.stats);
        const next: Record<string, Draft> = {};
        for (const q of j.queries as Row[]) {
          next[q.query_norm] = {
            note: q.note ?? "",
            answer_fa: q.answer_fa ?? "",
            answer_en: q.answer_en ?? "",
            keywords: q.keywords ?? "",
          };
        }
        setDrafts(next);
      });
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  function patchDraft(norm: string, key: keyof Draft, value: string) {
    setDrafts((prev) => ({
      ...prev,
      [norm]: { ...(prev[norm] ?? { note: "", answer_fa: "", answer_en: "", keywords: "" }), [key]: value },
    }));
  }

  async function save(queryNorm: string, status?: string) {
    setBusy(queryNorm);
    const d = drafts[queryNorm] ?? { note: "", answer_fa: "", answer_en: "", keywords: "" };
    const res = await fetch("/api/admin/assistant-queries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        queryNorm,
        note: d.note,
        answer_fa: d.answer_fa,
        answer_en: d.answer_en,
        keywords: d.keywords,
        status,
      }),
    });
    setBusy(null);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      alert(j.error || a.common.failed);
      return;
    }
    load();
  }

  if (!rows) return <PanelLoading label={a.common.loading} />;

  const filters: { id: typeof filter; label: string }[] = [
    { id: "all", label: t.filterAll },
    { id: "unmatched", label: t.filterUnmatched },
    { id: "open", label: t.filterOpen },
    { id: "draft", label: t.filterDraft },
    { id: "published", label: t.filterPublished },
    { id: "done", label: t.filterDone },
  ];

  return (
    <div dir={dir}>
      <h1 className="text-2xl text-paper">{t.title}</h1>
      <p className={`mt-2 text-sm text-paper/50 ${fa ? "font-fa" : ""}`}>{t.subtitle}</p>

      {stats && (
        <PanelCard className="mt-4">
          <p className="text-[10px] uppercase tracking-widest text-accent/70">{t.statsTitle}</p>
          <div className="mt-2 grid gap-2 text-xs text-paper/70 sm:grid-cols-2 lg:grid-cols-4">
            <p>
              {t.statsEvents}: {stats.totalEvents}
            </p>
            <p>
              {t.statsMatchRate}: {Math.round(stats.matchRate * 100)}%
            </p>
            <p>
              {t.statsUnmatched}: {stats.unmatchedDistinct}
            </p>
            <p>
              {t.statsLangFa}: {stats.byLang.fa} · {t.statsLangEn}: {stats.byLang.en}
            </p>
          </div>
          {stats.topUnmatched.length > 0 && (
            <div className="mt-3 border-t border-paper/10 pt-3">
              <p className="text-[10px] uppercase tracking-wide text-paper/35">{t.topUnmatched}</p>
              <ul className="mt-1 space-y-1 text-xs text-paper/55">
                {stats.topUnmatched.slice(0, 5).map((u) => (
                  <li key={u.query_norm} dir="auto">
                    {u.raw_sample || u.query_norm}{" "}
                    <span className="text-paper/30">×{u.hits}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </PanelCard>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`border px-3 py-1 text-xs ${
              filter === f.id ? "border-accent/50 text-accent" : "border-paper/20 text-paper/50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <div className="mt-6">
          <PanelEmpty label={a.common.empty} title={a.common.empty} description={a.common.emptyHint} />
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {rows.map((row) => {
            const d = drafts[row.query_norm] ?? {
              note: "",
              answer_fa: "",
              answer_en: "",
              keywords: "",
            };
            return (
              <li key={row.query_norm}>
                <PanelCard>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm text-paper" dir="auto">
                      {row.raw_sample || row.query_norm}
                    </p>
                    <p className="text-[10px] uppercase tracking-wide text-paper/35">
                      {t.hits}: {row.hits} · {row.matched ? t.matched : t.unmatched} ·{" "}
                      {row.status}
                    </p>
                  </div>
                  <p className="mt-1 text-xs text-paper/40">
                    {t.modes}: {row.modes || "—"} · {t.langs}: {row.langs || "—"} · {t.lastSeen}:{" "}
                    {row.last_seen}
                  </p>

                  <label className="mt-3 block text-[10px] uppercase tracking-wide text-paper/35">
                    {t.keywords}
                  </label>
                  <input
                    value={d.keywords}
                    onChange={(e) => patchDraft(row.query_norm, "keywords", e.target.value)}
                    placeholder={t.keywordsPlaceholder}
                    className="mt-1 w-full border border-paper/20 bg-transparent px-2 py-1.5 text-xs text-paper"
                  />

                  <label className="mt-2 block text-[10px] uppercase tracking-wide text-paper/35">
                    {t.answerFa}
                  </label>
                  <textarea
                    value={d.answer_fa}
                    onChange={(e) => patchDraft(row.query_norm, "answer_fa", e.target.value)}
                    placeholder={t.answerPlaceholder}
                    rows={3}
                    dir="rtl"
                    className="mt-1 w-full border border-paper/20 bg-transparent px-2 py-1.5 text-xs text-paper font-fa"
                  />

                  <label className="mt-2 block text-[10px] uppercase tracking-wide text-paper/35">
                    {t.answerEn}
                  </label>
                  <textarea
                    value={d.answer_en}
                    onChange={(e) => patchDraft(row.query_norm, "answer_en", e.target.value)}
                    placeholder={t.answerPlaceholder}
                    rows={3}
                    dir="ltr"
                    className="mt-1 w-full border border-paper/20 bg-transparent px-2 py-1.5 text-xs text-paper"
                  />

                  <label className="mt-2 block text-[10px] uppercase tracking-wide text-paper/35">
                    {t.note}
                  </label>
                  <textarea
                    value={d.note}
                    onChange={(e) => patchDraft(row.query_norm, "note", e.target.value)}
                    placeholder={t.notePlaceholder}
                    rows={2}
                    className="mt-1 w-full border border-paper/20 bg-transparent px-2 py-1.5 text-xs text-paper"
                  />

                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={busy === row.query_norm}
                      onClick={() => save(row.query_norm, "draft")}
                      className="border border-paper/30 px-3 py-1.5 text-xs text-paper/60"
                    >
                      {t.saveDraft}
                    </button>
                    <button
                      type="button"
                      disabled={busy === row.query_norm}
                      onClick={() => save(row.query_norm, "published")}
                      className="border border-accent/50 px-3 py-1.5 text-xs text-accent"
                    >
                      {t.publish}
                    </button>
                    {row.status === "published" ? (
                      <button
                        type="button"
                        disabled={busy === row.query_norm}
                        onClick={() => save(row.query_norm, "draft")}
                        className="border border-paper/30 px-3 py-1.5 text-xs text-paper/50"
                      >
                        {t.unpublish}
                      </button>
                    ) : null}
                    {row.status !== "done" ? (
                      <button
                        type="button"
                        disabled={busy === row.query_norm}
                        onClick={() => save(row.query_norm, "done")}
                        className="border border-paper/30 px-3 py-1.5 text-xs text-paper/50"
                      >
                        {t.markDone}
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={busy === row.query_norm}
                        onClick={() => save(row.query_norm, "open")}
                        className="border border-paper/30 px-3 py-1.5 text-xs text-paper/50"
                      >
                        {t.reopen}
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={busy === row.query_norm}
                      onClick={() => save(row.query_norm)}
                      className="border border-paper/20 px-3 py-1.5 text-xs text-paper/40"
                    >
                      {t.save}
                    </button>
                  </div>
                </PanelCard>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
