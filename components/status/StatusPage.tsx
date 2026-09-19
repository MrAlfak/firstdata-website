"use client";

import { useCallback, useEffect, useState } from "react";
import { useT } from "@/i18n/LangProvider";
import { statusPageDictionaries } from "@/i18n/status-page";
import { formatDigits } from "@/lib/i18n/digits";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";

type HealthPayload = {
  ok: boolean;
  version: string;
  checks: { authDb: string };
  latencyMs: number;
  ts: string;
};

export default function StatusPage() {
  const { lang, fa, dir } = useT();
  const [skin] = usePanelSkin();
  const ai = skin === "modern";
  const ui = statusPageDictionaries[lang];
  const [data, setData] = useState<HealthPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchHealth = useCallback(() => {
    fetch("/api/health", { cache: "no-store" })
      .then(async (r) => {
        const j = (await r.json()) as HealthPayload;
        setData(j);
        if (!r.ok) setError(true);
      })
      .catch(() => {
        setError(true);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const load = useCallback(() => {
    setLoading(true);
    setError(false);
    fetchHealth();
  }, [fetchHealth]);

  useEffect(() => {
    fetchHealth();
  }, [fetchHealth]);

  const ok = data?.ok && !error;
  const font = ai ? "font-iran" : fa ? "font-fa" : "font-mono";

  return (
    <section
      className={`mx-auto px-4 py-12 sm:px-6 sm:py-16 ${ai ? "max-w-3xl ai-section border-0" : "max-w-3xl"} ${font}`}
      dir={dir}
    >
      <h1 className={ai ? "ai-display text-paper" : "text-3xl tracking-tight text-paper sm:text-4xl"}>
        {ui.title}
      </h1>
      <p className={`mt-4 max-w-xl leading-relaxed text-paper/55 ${ai ? "text-base" : "text-sm"}`}>
        {ui.lead}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <p
          className={`inline-flex items-center gap-2 border px-3 py-1.5 text-sm ${
            loading
              ? "border-paper/20 text-paper/45"
              : ok
                ? "border-term/40 bg-term/10 text-term"
                : "border-red-500/40 bg-red-500/10 text-red-300"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              loading ? "bg-paper/30" : ok ? "bg-term" : "bg-red-400"
            }`}
            aria-hidden
          />
          {loading ? ui.loading : ok ? ui.overallOk : ui.overallDegraded}
        </p>
        <button
          type="button"
          onClick={load}
          className="border border-paper/25 px-3 py-1.5 text-xs text-paper/60 transition-colors hover:border-paper/50 hover:text-paper"
        >
          {ui.refresh}
        </button>
      </div>

      <dl
        className={`mt-10 space-y-4 text-sm ${
          ai
            ? "border-t border-paper/10 pt-8"
            : "border border-paper/15 bg-paper/[0.02] p-5"
        }`}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <dt className="text-paper/45">{ui.authDb}</dt>
          <dd className={data?.checks?.authDb === "ok" ? "text-term" : "text-red-300"}>
            {data?.checks?.authDb === "ok" ? ui.operational : ui.down}
          </dd>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <dt className="text-paper/45">{ui.version}</dt>
          <dd className="font-mono text-paper/80" dir="ltr">
            {data?.version ? `v${fa ? formatDigits(data.version, true) : data.version}` : "—"}
          </dd>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <dt className="text-paper/45">{ui.latency}</dt>
          <dd className="font-mono text-paper/80" dir="ltr">
            {data
              ? `${fa ? formatDigits(String(data.latencyMs), true) : data.latencyMs} ms`
              : "—"}
          </dd>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <dt className="text-paper/45">{ui.lastCheck}</dt>
          <dd className="font-mono text-paper/60" dir="ltr">
            {data?.ts ? new Date(data.ts).toLocaleString(fa ? "fa-IR" : "en-GB") : "—"}
          </dd>
        </div>
      </dl>
    </section>
  );
}
