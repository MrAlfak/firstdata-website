"use client";

import { useEffect, useState } from "react";
import { Inbox } from "lucide-react";
import { useT } from "@/i18n/LangProvider";
import type { ContactLeadRow } from "@/lib/panel/types";
import { PanelCard, PanelEmpty } from "./PanelLayoutClient";
import { PanelGateLoading } from "./PanelGateLoading";
import { usePanelSkin } from "./PanelSkinToggle";
import PanelDataTable from "./PanelDataTable";

export default function RequestsClient() {
  const { dir, p } = useT();
  const [skin] = usePanelSkin();
  const isModern = skin === "modern";
  const [leads, setLeads] = useState<ContactLeadRow[] | null>(null);

  useEffect(() => {
    fetch("/api/panel/requests")
      .then((r) => r.json())
      .then((j) => j.success && setLeads(j.leads));
  }, []);

  if (!leads) return <PanelGateLoading label={p.common.loading} />;

  if (isModern) {
    return (
      <div dir={dir}>
        <h1 className="text-2xl text-paper">{p.requests.title}</h1>
        <div className="mt-6">
          <PanelDataTable
            title={p.requests.title}
            primaryHeader={p.common.message}
            columnHeaders={[p.common.status, p.common.date]}
            showCheckbox
            empty={
              <PanelEmpty
                label={p.common.empty}
                title={p.requests.emptyTitle}
                description={p.requests.emptyHint}
                href="/contactus/request"
                ctaLabel={p.dashboard.contactCta}
              />
            }
            rows={leads.map((lead) => ({
              id: String(lead.id),
              icon: Inbox,
              iconClassName: "text-teal-400",
              iconBgClassName: "bg-teal-400/20",
              title: lead.service || lead.message.slice(0, 80),
              subtitle: lead.message.length > 80 ? lead.message.slice(0, 120) + "…" : undefined,
              cells: [
                p.status.lead[lead.status ?? "received"] ?? lead.status,
                <span key="d" dir="ltr">
                  {lead.created_at}
                </span>,
              ],
            }))}
          />
        </div>
      </div>
    );
  }

  return (
    <div dir={dir}>
      <h1 className="text-2xl text-paper">{p.requests.title}</h1>
      {leads.length === 0 ? (
        <div className="mt-6">
          <PanelEmpty
            label={p.common.empty}
            title={p.requests.emptyTitle}
            description={p.requests.emptyHint}
            href="/contactus/request"
            ctaLabel={p.dashboard.contactCta}
          />
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {leads.map((lead) => (
            <li key={lead.id}>
              <PanelCard>
                <p className="text-xs text-paper/40">{lead.created_at}</p>
                <p className="mt-1 text-sm text-paper">{lead.service || lead.message.slice(0, 80)}</p>
                <p className="mt-2 text-xs text-paper/45">
                  {p.status.lead[lead.status ?? "received"] ?? lead.status}
                </p>
                <p className="mt-2 text-sm text-paper/55">{lead.message}</p>
              </PanelCard>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
