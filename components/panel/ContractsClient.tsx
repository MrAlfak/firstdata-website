"use client";

import { useEffect, useState } from "react";
import { useT } from "@/i18n/LangProvider";
import { PanelCard, PanelEmpty, PanelLoading } from "./PanelLayoutClient";

type ContractItem = {
  id: number;
  title: string;
  status: string;
  summary: string | null;
  project_title: string;
  signed_at: string | null;
};

export default function ContractsClient() {
  const { dir, p } = useT();
  const [contracts, setContracts] = useState<ContractItem[] | null>(null);
  const [signing, setSigning] = useState<number | null>(null);

  function load() {
    fetch("/api/panel/contracts")
      .then((r) => r.json())
      .then((j) => j.success && setContracts(j.contracts));
  }

  useEffect(() => {
    load();
  }, []);

  async function sign(id: number) {
    if (!confirm(p.contracts.signConfirm)) return;
    setSigning(id);
    await fetch(`/api/panel/contracts/${id}/sign`, { method: "POST" });
    setSigning(null);
    load();
  }

  if (!contracts) return <PanelLoading label={p.common.loading} />;

  return (
    <div dir={dir}>
      <h1 className="text-2xl text-paper">{p.contracts.title}</h1>
      {contracts.length === 0 ? (
        <PanelCard className="mt-6">
          <PanelEmpty label={p.common.empty} />
        </PanelCard>
      ) : (
        <ul className="mt-6 space-y-3">
          {contracts.map((c) => (
            <li key={c.id}>
              <PanelCard>
                <p className="text-xs text-paper/40">{c.project_title}</p>
                <p className="mt-1 text-lg text-paper">{c.title}</p>
                {c.summary && <p className="mt-2 text-sm text-paper/55">{c.summary}</p>}
                <p className="mt-2 text-xs text-paper/45">
                  {p.common.status}: {p.status.contract[c.status] ?? c.status}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={`/api/panel/contracts/${c.id}/download`}
                    className="border border-paper/25 px-3 py-1.5 text-xs text-paper/70 hover:border-paper"
                  >
                    {p.common.download}
                  </a>
                  {c.status === "pending" && (
                    <button
                      type="button"
                      disabled={signing === c.id}
                      onClick={() => sign(c.id)}
                      className="border border-term/40 px-3 py-1.5 text-xs text-term disabled:opacity-40"
                    >
                      {p.common.sign}
                    </button>
                  )}
                </div>
              </PanelCard>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
