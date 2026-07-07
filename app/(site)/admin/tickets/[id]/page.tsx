"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useT } from "@/i18n/LangProvider";
import { PanelCard, PanelLoading } from "@/components/panel/PanelLayoutClient";

type Message = {
  id: number;
  author_type: string;
  author_name: string | null;
  body: string;
  created_at: string;
};

export default function AdminTicketDetailPage() {
  const { dir, a } = useT();
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [ticket, setTicket] = useState<{ subject: string; status: string; user_name: string } | null>(
    null, );
  const [messages, setMessages] = useState<Message[]>([]);
  const [reply, setReply] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    fetch(`/api/admin/tickets/${id}`)
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

  async function sendReply() {
    if (!reply.trim()) return;
    setBusy(true);
    await fetch(`/api/admin/tickets/${id}`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reply }), });
    setBusy(false);
    setReply("");
    load();
  }

  async function ticketAction(action: string, status?: string) {
    setBusy(true);
    await fetch(`/api/admin/tickets/${id}`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action, status }), });
    setBusy(false);
    load();
  }

  if (!ticket) return <PanelLoading label={a.common.loading} />;

  return (
    <div dir={dir}>
      <button type="button" onClick={() => router.back()} className="text-xs text-paper/40">
        ←
      </button>
      <h1 className="mt-2 text-xl text-paper">{ticket.subject}</h1>
      <p className="text-xs text-paper/40">
        {ticket.user_name}, {ticket.status}
      </p>

      <ul className="mt-6 space-y-3">
        {messages.map((m) => (
          <li key={m.id}>
            <PanelCard className={m.author_type === "staff" ? "border-accent/20" : ""}>
              <p className="text-[10px] uppercase text-paper/35">
                {m.author_type === "staff" ? m.author_name ?? a.common.staff : a.common.clientRole}
              </p>
              <p className="mt-1 whitespace-pre-wrap text-sm text-paper/80">{m.body}</p>
            </PanelCard>
          </li>
        ))}
      </ul>

      {ticket.status !== "closed" && (
        <PanelCard className="mt-6">
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder={a.tickets.replyPlaceholder}
            rows={4}
            className="w-full border border-paper/20 bg-transparent px-3 py-2 text-sm text-paper"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy || !reply.trim()}
              onClick={sendReply}
              className="border border-accent/50 px-3 py-1.5 text-xs text-accent"
            >
              {a.common.reply}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => ticketAction("status", "in_progress")}
              className="border border-paper/30 px-3 py-1.5 text-xs text-paper/60"
            >
              {a.tickets.markInProgress}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => ticketAction("close")}
              className="border border-paper/30 px-3 py-1.5 text-xs text-paper/60"
            >
              {a.common.close}
            </button>
          </div>
        </PanelCard>
      )}
    </div>
  );
}
