"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bell, Check, ExternalLink } from "lucide-react";
import { useT } from "@/i18n/LangProvider";
import type { NotificationRow } from "@/lib/panel/types";
import { scheduleUpdate } from "@/lib/react/schedule-update";
import { panelFetch } from "./panel-fetch";
import { PanelCard, PanelEmpty } from "./PanelLayoutClient";
import { PanelGateLoading } from "./PanelGateLoading";
import { usePanelSkin } from "./PanelSkinToggle";
import PanelDataTable from "./PanelDataTable";

export default function NotificationsClient() {
  const { dir, p } = useT();
  const [skin] = usePanelSkin();
  const isModern = skin === "modern";
  const [items, setItems] = useState<NotificationRow[] | null>(null);

  async function load() {
    const res = await panelFetch<{ notifications: NotificationRow[] }>("/api/panel/notifications");
    if (res.ok) setItems(res.body.notifications);
    else setItems([]);
  }

  useEffect(() => {
    scheduleUpdate(() => {
      void load();
    });
  }, []);

  async function markAll() {
    await fetch("/api/panel/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ all: true }),
    });
    void load();
  }

  async function markOne(id: number) {
    await fetch("/api/panel/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    void load();
  }

  if (!items) return <PanelGateLoading label={p.common.loading} />;

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-2xl text-paper">{p.notifications.title}</h1>
      {items.some((n) => !n.read_at) && (
        <button
          type="button"
          onClick={markAll}
          className="text-xs text-paper/45 hover:text-paper"
        >
          {p.notifications.markAllRead}
        </button>
      )}
    </div>
  );

  if (isModern) {
    return (
      <div dir={dir}>
        {header}
        <div className="mt-6">
          <PanelDataTable
            title={p.notifications.title}
            primaryHeader={p.notifications.title}
            columnHeaders={[p.common.date]}
            actionsHeader={p.common.action}
            showCheckbox
            empty={
              <PanelEmpty
                label={p.common.empty}
                title={p.notifications.emptyTitle}
                description={p.notifications.emptyHint}
              />
            }
            rows={items.map((n) => ({
              id: String(n.id),
              icon: Bell,
              iconClassName: n.read_at ? "text-muted-foreground" : "text-orange-400",
              iconBgClassName: n.read_at ? "bg-muted" : "bg-orange-400/20",
              title: n.title,
              subtitle: n.body ?? undefined,
              cells: [
                <span key="d" dir="ltr">
                  {n.created_at}
                </span>,
              ],
              actions: [
                ...(!n.read_at
                  ? [
                      {
                        label: p.notifications.markRead,
                        icon: Check,
                        onSelect: () => void markOne(n.id),
                      },
                    ]
                  : []),
                ...(n.link
                  ? [
                      {
                        label: p.common.view,
                        icon: ExternalLink,
                        href: n.link,
                      },
                    ]
                  : []),
              ],
            }))}
          />
        </div>
      </div>
    );
  }

  return (
    <div dir={dir}>
      {header}
      {items.length === 0 ? (
        <div className="mt-6">
          <PanelEmpty
            label={p.common.empty}
            title={p.notifications.emptyTitle}
            description={p.notifications.emptyHint}
          />
        </div>
      ) : (
        <ul className="mt-6 space-y-2">
          {items.map((n) => (
            <li key={n.id}>
              <PanelCard className={!n.read_at ? "border-term/25" : ""}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="text-sm text-paper">{n.title}</p>
                  {!n.read_at && (
                    <button
                      type="button"
                      onClick={() => markOne(n.id)}
                      className="text-[10px] text-paper/45 hover:text-paper"
                    >
                      {p.notifications.markRead}
                    </button>
                  )}
                </div>
                {n.body && <p className="mt-1 text-xs text-paper/50">{n.body}</p>}
                <p className="mt-1 text-[10px] text-paper/30">{n.created_at}</p>
                {n.link && (
                  <Link href={n.link} className="mt-2 inline-block text-xs text-term">
                    {p.common.view} →
                  </Link>
                )}
              </PanelCard>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
