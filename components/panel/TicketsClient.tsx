"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useT } from "@/i18n/LangProvider";
import type { ProjectRow, TicketRow } from "@/lib/panel/types";
import { PanelCard, PanelEmpty, PanelLoading } from "./PanelLayoutClient";

export default function TicketsClient() {
  const { dir, p } = useT();
  const [tickets, setTickets] = useState<TicketRow[] | null>(null);

  useEffect(() => {
    fetch("/api/panel/tickets")
      .then((r) => r.json())
      .then((j) => j.success && setTickets(j.tickets));
  }, []);

  if (!tickets) return <PanelLoading label={p.common.loading} />;

  return (
    <div dir={dir}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl text-paper">{p.tickets.title}</h1>
        <Link
          href="/panel/tickets/new"
          className="border border-paper/30 px-4 py-2 text-sm text-paper/75 hover:border-paper"
        >
          {p.tickets.new}
        </Link>
      </div>
      {tickets.length === 0 ? (
        <PanelCard className="mt-6">
          <PanelEmpty label={p.common.empty} />
        </PanelCard>
      ) : (
        <ul className="mt-6 space-y-2">
          {tickets.map((t) => (
            <li key={t.id}>
              <Link href={`/panel/tickets/${t.id}`}>
                <PanelCard className="transition-colors hover:border-paper/30">
                  <p className="text-sm text-paper">{t.subject}</p>
                  <p className="mt-1 text-xs text-paper/40">
                    {p.status.ticket[t.status] ?? t.status}, {t.updated_at}
                  </p>
                </PanelCard>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function TicketNewClient() {
  const { dir, p } = useT();
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [projectId, setProjectId] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/panel/tickets")
      .then((r) => r.json())
      .then((j) => j.success && setProjects(j.projects ?? []));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const res = await fetch("/api/panel/tickets", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ subject, message, projectId: projectId || null }), });
    setBusy(false);
    const j = await res.json();
    if (j.success && j.ticketId) {
      window.location.href = `/panel/tickets/${j.ticketId}`;
    }
  }

  const input =
    "w-full border border-paper/20 bg-paper/[0.03] px-3 py-2 text-sm text-paper outline-none focus:border-paper/45";

  return (
    <div dir={dir}>
      <h1 className="text-2xl text-paper">{p.tickets.new}</h1>
      <PanelCard className="mt-6">
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs text-paper/45">{p.tickets.subject}</label>
            <input className={input} value={subject} onChange={(e) => setSubject(e.target.value)} required />
          </div>
          {projects.length > 0 && (
            <div>
              <label className="mb-1 block text-xs text-paper/45">{p.common.project}</label>
              <select
                className={input}
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
              >
                <option value="">,</option>
                {projects.map((pr) => (
                  <option key={pr.id} value={pr.id}>
                    {pr.title}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="mb-1 block text-xs text-paper/45">{p.tickets.message}</label>
            <textarea
              className={`${input} min-h-[120px]`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="border border-paper/30 px-5 py-2 text-sm text-paper disabled:opacity-40"
          >
            {p.common.submit}
          </button>
        </form>
      </PanelCard>
    </div>
  );
}

export function TicketDetailClient({ id }: { id: string }) {
  const { dir, p } = useT();
  const [ticket, setTicket] = useState<TicketRow | null>(null);
  const [messages, setMessages] = useState<{ id: number; author_type: string; author_name: string | null; body: string; created_at: string }[]>([]);
  const [reply, setReply] = useState("");

  const load = useCallback(() => {
    fetch(`/api/panel/tickets/${id}`)
      .then((r) => r.json())
      .then((j) => {
        if (j.success) {
          setTicket(j.ticket);
          setMessages(j.messages);
        }
      });
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  async function sendReply(e: React.FormEvent) {
    e.preventDefault();
    await fetch(`/api/panel/tickets/${id}`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: reply }), });
    setReply("");
    load();
  }

  if (!ticket) return <PanelLoading label={p.common.loading} />;

  return (
    <div dir={dir}>
      <Link href="/panel/tickets" className="text-xs text-paper/45">
        ← {p.tickets.title}
      </Link>
      <h1 className="mt-2 text-xl text-paper">{ticket.subject}</h1>
      <p className="mt-1 text-xs text-paper/40">{p.status.ticket[ticket.status]}</p>

      <PanelCard className="mt-6 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`text-sm ${m.author_type === "staff" ? "border-s-2 border-term/40 ps-3" : ""}`}
          >
            <p className="text-xs text-paper/35">
              {m.author_type === "staff"
                ? m.author_name ?? p.common.staff
                : p.common.you}
              , {m.created_at}
            </p>
            <p className="mt-1 text-paper/70">{m.body}</p>
          </div>
        ))}
      </PanelCard>

      {ticket.status !== "closed" ? (
        <form onSubmit={sendReply} className="mt-4">
          <textarea
            className="w-full border border-paper/20 bg-paper/[0.03] px-3 py-2 text-sm text-paper"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder={p.tickets.message}
          />
          <button type="submit" className="mt-2 border border-paper/30 px-4 py-2 text-sm text-paper/75">
            {p.tickets.reply}
          </button>
        </form>
      ) : (
        <p className="mt-4 text-sm text-paper/45">{p.tickets.closed}</p>
      )}
    </div>
  );
}
