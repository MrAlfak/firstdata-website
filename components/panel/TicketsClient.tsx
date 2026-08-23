"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Eye, Ticket } from "lucide-react";
import { useT } from "@/i18n/LangProvider";
import type { ContractRow, PanelFileRow, ProjectRow, TicketRow } from "@/lib/panel/types";
import PanelRichEditor from "./PanelRichEditor";
import { PanelAlert, PanelCard, PanelEmpty } from "./PanelLayoutClient";
import { PanelGateLoading } from "./PanelGateLoading";
import FileDropzone from "@/components/ui/FileDropzone";
import { usePanelSkin } from "./PanelSkinToggle";
import PanelDataTable from "./PanelDataTable";

type ContractOption = ContractRow & { project_title: string };

const DEPARTMENTS = ["support", "technical", "billing", "sales", "contracts"] as const;
const PRIORITIES = ["low", "normal", "high"] as const;

export default function TicketsClient() {
  const { dir, p } = useT();
  const [skin] = usePanelSkin();
  const isModern = skin === "modern";
  const [tickets, setTickets] = useState<TicketRow[] | null>(null);

  useEffect(() => {
    fetch("/api/panel/tickets")
      .then((r) => r.json())
      .then((j) => j.success && setTickets(j.tickets));
  }, []);

  if (!tickets) return <PanelGateLoading label={p.common.loading} />;

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-2xl text-paper">{p.tickets.title}</h1>
      <Link
        href="/panel/tickets/new"
        className="inline-flex items-center border border-term/40 bg-term/10 px-4 py-2 text-sm font-medium text-term transition-colors hover:bg-term/20"
      >
        {p.tickets.new}
      </Link>
    </div>
  );

  const empty = (
    <PanelEmpty
      label={p.common.empty}
      title={p.tickets.emptyTitle}
      description={p.tickets.emptyHint}
      href="/panel/tickets/new"
      ctaLabel={p.tickets.new}
    />
  );

  if (isModern) {
    return (
      <div dir={dir}>
        {header}
        <div className="mt-6">
          {tickets.length === 0 ? (
            empty
          ) : (
            <PanelDataTable
              title={p.tickets.title}
              primaryHeader={p.tickets.subject}
              columnHeaders={[p.common.status, p.common.priority, p.common.date]}
              actionsHeader={p.common.action}
              showCheckbox
              empty={empty}
              rows={tickets.map((t) => ({
                id: String(t.id),
                icon: Ticket,
                iconClassName: "text-sky-400",
                iconBgClassName: "bg-sky-400/20",
                title: t.subject,
                subtitle: p.tickets[`dept_${t.department}`] ?? String(t.department),
                cells: [
                  p.status.ticket[t.status] ?? t.status,
                  p.tickets[`priority_${t.priority}`] ?? t.priority,
                  <span key="d" dir="ltr">
                    {t.updated_at}
                  </span>,
                ],
                href: `/panel/tickets/${t.id}`,
                actions: [
                  {
                    label: p.common.view,
                    icon: Eye,
                    href: `/panel/tickets/${t.id}`,
                  },
                ],
              }))}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div dir={dir}>
      {header}
      {tickets.length === 0 ? (
        <div className="mt-6">{empty}</div>
      ) : (
        <ul className="mt-6 space-y-2">
          {tickets.map((t) => (
            <li key={t.id}>
              <Link href={`/panel/tickets/${t.id}`}>
                <PanelCard className="transition-colors hover:border-paper/30">
                  <p className="text-sm text-paper">{t.subject}</p>
                  <p className="mt-1 text-xs text-paper/40">
                    {p.status.ticket[t.status] ?? t.status}
                    {" · "}
                    {p.tickets[`priority_${t.priority}`] ?? t.priority}
                    {" · "}
                    {t.updated_at}
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
  const { dir, fa, p } = useT();
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [contracts, setContracts] = useState<ContractOption[]>([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [projectId, setProjectId] = useState("");
  const [contractId, setContractId] = useState("");
  const [department, setDepartment] = useState<(typeof DEPARTMENTS)[number]>("support");
  const [priority, setPriority] = useState<(typeof PRIORITIES)[number]>("normal");
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/panel/tickets")
      .then((r) => r.json())
      .then((j) => {
        if (!j.success) return;
        setProjects(j.projects ?? []);
        setContracts(j.contracts ?? []);
      });
  }, []);

  const filteredContracts = useMemo(() => {
    if (!projectId) return contracts;
    return contracts.filter((c) => String(c.project_id) === projectId);
  }, [contracts, projectId]);

  useEffect(() => {
    if (contractId && !filteredContracts.some((c) => String(c.id) === contractId)) {
      setContractId("");
    }
  }, [contractId, filteredContracts]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const form = new FormData();
    form.append("subject", subject);
    form.append("message", message);
    form.append("department", department);
    form.append("priority", priority);
    if (projectId) form.append("projectId", projectId);
    if (contractId) form.append("contractId", contractId);
    files.forEach((file) => form.append("files", file));

    const res = await fetch("/api/panel/tickets", { method: "POST", body: form });
    const j = await res.json();
    setBusy(false);
    if (j.success && j.ticketId) {
      window.location.href = `/panel/tickets/${j.ticketId}`;
      return;
    }
    setError(typeof j.message === "string" ? j.message : p.common.error);
  }

  const input =
    "w-full border border-paper/20 bg-paper/[0.03] px-3 py-2.5 text-sm text-paper outline-none transition-colors focus:border-term/40";

  return (
    <div dir={dir}>
      <h1 className="text-2xl text-paper">{p.tickets.new}</h1>
      <PanelCard className="mt-6">
        {error && (
          <div className="mb-4">
            <PanelAlert message={error} />
          </div>
        )}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs text-paper/45">{p.tickets.subject}</label>
            <input
              className={input}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              minLength={3}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-paper/45">{p.tickets.department}</label>
              <select
                className={input}
                value={department}
                onChange={(e) => setDepartment(e.target.value as (typeof DEPARTMENTS)[number])}
              >
                {DEPARTMENTS.map((key) => (
                  <option key={key} value={key}>
                    {p.tickets[`dept_${key}`]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-paper/45">{p.common.priority}</label>
              <select
                className={input}
                value={priority}
                onChange={(e) => setPriority(e.target.value as (typeof PRIORITIES)[number])}
              >
                {PRIORITIES.map((key) => (
                  <option key={key} value={key}>
                    {p.tickets[`priority_${key}`]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-paper/45">{p.common.project}</label>
              <select
                className={input}
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                disabled={projects.length === 0}
              >
                <option value="">{p.tickets.noProject}</option>
                {projects.map((pr) => (
                  <option key={pr.id} value={pr.id}>
                    {pr.title}
                  </option>
                ))}
              </select>
              {projects.length === 0 ? (
                <p className="mt-1 text-[11px] text-paper/35">{p.tickets.noProjectHint}</p>
              ) : null}
            </div>
            <div>
              <label className="mb-1 block text-xs text-paper/45">{p.nav.contracts}</label>
              <select
                className={input}
                value={contractId}
                onChange={(e) => setContractId(e.target.value)}
                disabled={filteredContracts.length === 0}
              >
                <option value="">{p.tickets.noContract}</option>
                {filteredContracts.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                    {c.project_title ? ` — ${c.project_title}` : ""}
                  </option>
                ))}
              </select>
              {filteredContracts.length === 0 ? (
                <p className="mt-1 text-[11px] text-paper/35">{p.tickets.noContractHint}</p>
              ) : null}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs text-paper/45">{p.tickets.message}</label>
            <PanelRichEditor
              value={message}
              onChange={setMessage}
              dir={dir}
              fa={fa}
              placeholder={p.tickets.messagePlaceholder}
              labels={{
                bold: p.tickets.editorBold,
                italic: p.tickets.editorItalic,
                underline: p.tickets.editorUnderline,
                list: p.tickets.editorList,
                orderedList: p.tickets.editorOrdered,
                link: p.tickets.editorLink,
              }}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-paper/45">{p.tickets.attachments}</label>
            <FileDropzone
              multiple
              buttonLabel={p.common.upload}
              hint={p.tickets.attachmentsHint}
              removeLabel={p.tickets.attachments}
              files={files.map((file) => ({ key: `${file.name}-${file.size}`, name: file.name }))}
              onFilesSelected={(picked) => setFiles((prev) => [...prev, ...picked].slice(0, 5))}
              onRemoveFile={(index) => setFiles((prev) => prev.filter((_, i) => i !== index))}
              buttonClassName="border border-paper/30 bg-transparent px-4 py-2 text-xs text-paper/75 transition-colors hover:border-paper"
              panelClassName="border border-dashed border-paper/25 bg-paper/[0.02] px-3 py-4"
              listItemClassName="flex items-center justify-between gap-2 border border-paper/10 px-3 py-2 text-xs text-paper/55"
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center border border-term/40 bg-term/10 px-5 py-2.5 text-sm font-medium text-term transition-colors hover:bg-term/20 disabled:opacity-40"
          >
            {busy ? p.common.loading : p.common.submit}
          </button>
        </form>
      </PanelCard>
    </div>
  );
}

function MessageBody({ body }: { body: string }) {
  const looksHtml = /<\/?[a-z][\s\S]*>/i.test(body);
  if (looksHtml) {
    return (
      <div
        className="mt-1 text-paper/70 [&_a]:text-term [&_a]:underline [&_ol]:ms-5 [&_ol]:list-decimal [&_ul]:ms-5 [&_ul]:list-disc"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    );
  }
  return <p className="mt-1 whitespace-pre-wrap text-paper/70">{body}</p>;
}

export function TicketDetailClient({ id }: { id: string }) {
  const { dir, p } = useT();
  const [ticket, setTicket] = useState<TicketRow | null>(null);
  const [messages, setMessages] = useState<
    { id: number; author_type: string; author_name: string | null; body: string; created_at: string }[]
  >([]);
  const [files, setFiles] = useState<PanelFileRow[]>([]);
  const [reply, setReply] = useState("");

  const load = useCallback(() => {
    fetch(`/api/panel/tickets/${id}`)
      .then((r) => r.json())
      .then((j) => {
        if (j.success) {
          setTicket(j.ticket);
          setMessages(j.messages);
          setFiles(j.files ?? []);
        }
      });
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  async function sendReply(e: React.FormEvent) {
    e.preventDefault();
    await fetch(`/api/panel/tickets/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: reply }),
    });
    setReply("");
    load();
  }

  if (!ticket) return <PanelGateLoading label={p.common.loading} variant="detail" />;

  return (
    <div dir={dir}>
      <Link href="/panel/tickets" className="text-xs text-paper/45">
        ← {p.tickets.title}
      </Link>
      <h1 className="mt-2 text-xl text-paper">{ticket.subject}</h1>
      <p className="mt-1 text-xs text-paper/40">
        {p.status.ticket[ticket.status]}
        {" · "}
        {p.tickets[`priority_${ticket.priority}`] ?? ticket.priority}
        {" · "}
        {p.tickets[`dept_${ticket.department}`] ?? ticket.department}
      </p>

      {files.length > 0 ? (
        <PanelCard className="mt-4">
          <h2 className="text-xs text-paper/45">{p.tickets.attachments}</h2>
          <ul className="mt-2 space-y-1">
            {files.map((f) => (
              <li key={f.id}>
                <a href={`/api/panel/files/${f.id}`} className="text-sm text-term hover:underline">
                  {f.name}
                </a>
              </li>
            ))}
          </ul>
        </PanelCard>
      ) : null}

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
            <MessageBody body={m.body} />
          </div>
        ))}
      </PanelCard>

      {ticket.status !== "closed" ? (
        <form onSubmit={sendReply} className="mt-4">
          <textarea
            className="w-full border border-paper/20 bg-paper/[0.03] px-3 py-2.5 text-sm text-paper outline-none transition-colors focus:border-term/40"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder={p.tickets.message}
          />
          <button
            type="submit"
            className="mt-2 inline-flex items-center border border-term/40 bg-term/10 px-4 py-2 text-sm font-medium text-term transition-colors hover:bg-term/20"
          >
            {p.tickets.reply}
          </button>
        </form>
      ) : (
        <p className="mt-4 text-sm text-paper/45">{p.tickets.closed}</p>
      )}
    </div>
  );
}
