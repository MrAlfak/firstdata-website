"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useT } from "@/i18n/LangProvider";
import type { NotificationRow } from "@/lib/panel/types";
import { scheduleUpdate } from "@/lib/react/schedule-update";
import { panelFetch } from "./panel-fetch";
import { PanelCard, PanelEmpty, PanelLoading } from "./PanelLayoutClient";

export default function NotificationsClient() {
  const { dir, p } = useT();
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

  if (!items) return <PanelLoading label={p.common.loading} />;

  return (
    <div dir={dir}>
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
      {items.length === 0 ? (
        <PanelCard className="mt-6">
          <PanelEmpty label={p.common.empty} />
        </PanelCard>
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
