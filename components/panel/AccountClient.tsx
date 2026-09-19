"use client";

import { scheduleUpdate } from "@/lib/react/schedule-update";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useT } from "@/i18n/LangProvider";
import type { PublicUser } from "@/lib/auth/types";
import { fetchJson } from "@/lib/errors/fetch-json";
import { resolveAuthError } from "@/lib/errors/resolve-auth-error";
import { LogOut, Monitor } from "lucide-react";
import { PanelAlert, PanelCard, PanelEmpty, PanelLoading } from "./PanelLayoutClient";
import { usePanelSkin } from "./PanelSkinToggle";
import PanelDataTable from "./PanelDataTable";
import { pushAlert } from "@/lib/alerts/types";

type SessionRow = {
  id: string;
  userAgent: string | null;
  ip: string | null;
  createdAt: string;
  lastSeenAt: string;
  revoked: boolean;
  current: boolean;
};

type TotpSetup = {
  enabled: boolean;
  secret?: string;
  uri?: string;
};

type SectionId = "overview" | "profile" | "security" | "sessions" | "danger";

const input =
  "account-input w-full border border-paper/20 bg-paper/[0.03] px-3 py-2.5 text-sm text-paper outline-none transition-[border-color,box-shadow,background-color] duration-200 focus:border-term/40";

const btn =
  "account-btn inline-flex h-9 items-center justify-center border border-paper/30 px-3.5 text-sm text-paper transition-[background-color,border-color,color,transform,box-shadow] duration-200 hover:border-paper/50 hover:bg-paper/[0.04]";

const btnPrimary =
  "account-btn account-btn-primary inline-flex h-9 items-center justify-center border border-term/40 bg-term/10 px-3.5 text-sm text-term transition-[background-color,border-color,color,transform,box-shadow] duration-200 hover:bg-term/20";

const btnDanger =
  "account-btn account-btn-danger inline-flex h-9 items-center justify-center border border-terr/40 px-3.5 text-sm text-terr transition-[background-color,border-color,color,transform,box-shadow] duration-200 hover:border-terr/60 hover:bg-terr/10";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "FD";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
}

function deviceLabel(ua: string | null, fallback: string): string {
  if (!ua) return fallback;
  const lower = ua.toLowerCase();
  if (lower.includes("iphone") || lower.includes("ipad")) return "iOS";
  if (lower.includes("android")) return "Android";
  if (lower.includes("mac os") || lower.includes("macintosh")) return "macOS";
  if (lower.includes("windows")) return "Windows";
  if (lower.includes("linux")) return "Linux";
  return fallback;
}

function StatusDot({ ok }: { ok: boolean }) {
  return (
    <span
      className={`account-status-dot mt-1.5 h-2 w-2 shrink-0 rounded-full ${ok ? "is-ok bg-term" : "is-warn bg-amber/80"}`}
      aria-hidden
    />
  );
}

function generateStrongPassword(length = 16): string {
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lower = "abcdefghijkmnopqrstuvwxyz";
  const digits = "23456789";
  const symbols = "!@#$%&*-_=+";
  const all = upper + lower + digits + symbols;
  const pick = (set: string) => set[Math.floor(Math.random() * set.length)]!;
  const chars = [pick(upper), pick(lower), pick(digits), pick(symbols)];
  while (chars.length < length) chars.push(pick(all));
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = chars[i]!;
    chars[i] = chars[j]!;
    chars[j] = tmp;
  }
  return chars.join("");
}

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="text-current">
        <path
          d="M3 3l18 18M10.5 10.7a2.5 2.5 0 003.5 3.5M9.9 5.1A10.4 10.4 0 0112 5c5.5 0 9.5 4.5 10.8 6.5a1.2 1.2 0 010 1.3c-.5.8-1.6 2.3-3.4 3.7M6.1 6.1C4.1 7.6 2.7 9.5 2.1 10.6a1.2 1.2 0 000 1.3C3.4 14 7.4 18.5 12.9 18.5c1.2 0 2.3-.2 3.3-.6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="text-current">
      <path
        d="M2.1 11.3a1.2 1.2 0 000 1.4C3.4 14.7 7.4 19 12.9 19c5.5 0 9.5-4.3 10.8-6.3a1.2 1.2 0 000-1.4C22.4 9.3 18.4 5 12.9 5 7.4 5 3.4 9.3 2.1 11.3z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

type PasswordFieldProps = {
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  minLength?: number;
  required?: boolean;
  showGenerator?: boolean;
  onGenerate?: () => void;
  showLabel: string;
  hideLabel: string;
  generateLabel?: string;
};

function PasswordField({
  value,
  onChange,
  autoComplete,
  minLength,
  required,
  showGenerator,
  onGenerate,
  showLabel,
  hideLabel,
  generateLabel,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const pad = showGenerator ? "pl-[4.75rem]" : "pl-10";

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center gap-0.5 pl-1.5">
        {showGenerator && onGenerate && generateLabel ? (
          <button
            type="button"
            tabIndex={0}
            className="pointer-events-auto flex h-8 w-8 items-center justify-center text-paper/45 transition-colors hover:text-term"
            onClick={onGenerate}
            aria-label={generateLabel}
            title={generateLabel}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        ) : null}
        <button
          type="button"
          tabIndex={0}
          className="pointer-events-auto flex h-8 w-8 items-center justify-center text-paper/45 transition-colors hover:text-paper/80"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? hideLabel : showLabel}
          title={visible ? hideLabel : showLabel}
        >
          <EyeIcon open={visible} />
        </button>
      </div>
      <input
        type={visible ? "text" : "password"}
        className={`${input} ${pad} pr-3`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        minLength={minLength}
        required={required}
        dir="ltr"
      />
    </div>
  );
}

function SectionHead({
  title,
  hint,
  badge,
  badgeTone = "neutral",
}: {
  title: string;
  hint?: string;
  badge?: string;
  badgeTone?: "ok" | "warn" | "danger" | "neutral";
}) {
  return (
    <div className="account-section-head flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <h2 className="account-section-title text-sm font-medium text-paper">{title}</h2>
        {hint ? <p className="account-section-hint mt-1 text-xs text-paper/40">{hint}</p> : null}
      </div>
      {badge ? (
        <span className={`account-chip account-chip-${badgeTone}`}>{badge}</span>
      ) : null}
    </div>
  );
}

function Skel({ className = "" }: { className?: string }) {
  return <span className={`account-skel ${className}`} aria-hidden />;
}

/** AI-mode page skeleton — mirrors hero / tabs / dense cards. */
function AccountSkeleton({ label }: { label: string }) {
  return (
    <div className="account-page account-skeleton space-y-5" aria-busy="true" aria-live="polite">
      <span className="sr-only">{label}</span>
      <div className="account-hero border border-paper/15 bg-paper/[0.02] p-4 sm:p-5">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3.5">
            <Skel className="!h-14 !w-14 !rounded-full" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skel className="h-3 w-20" />
              <Skel className="h-6 w-44 max-w-full" />
              <Skel className="h-3 w-36 max-w-full" />
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-2 sm:w-auto sm:min-w-[16rem]">
            <div className="account-metric space-y-2">
              <Skel className="h-3 w-16" />
              <Skel className="h-6 w-12" />
              <Skel className="h-1.5 w-full" />
            </div>
            <div className="account-metric space-y-2">
              <Skel className="h-3 w-20" />
              <Skel className="h-6 w-8" />
              <Skel className="h-3 w-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="account-tabs flex gap-2 p-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skel key={i} className="h-8 w-16 !rounded-md" />
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {[0, 1].map((card) => (
          <PanelCard key={card} className="account-card !p-0">
            <div className="account-card-pad">
              <Skel className="h-4 w-28" />
            </div>
            <ul className="account-dense-list">
              {Array.from({ length: 4 }).map((_, i) => (
                <li key={i} className="account-dense-row items-center">
                  <Skel className="!h-2 !w-2 !rounded-full !shrink-0" />
                  <Skel className="h-3.5 flex-1" />
                  <Skel className="h-5 w-14 !rounded-full" />
                </li>
              ))}
            </ul>
            <div className="account-card-pad flex gap-2 border-t border-paper/10">
              <Skel className="h-9 w-24 !rounded-md" />
              <Skel className="h-9 w-20 !rounded-md" />
            </div>
          </PanelCard>
        ))}
      </div>
    </div>
  );
}

export default function AccountClient() {
  const router = useRouter();
  const { dir, fa, fd, p, d } = useT();
  const a = p.account;
  const [skin] = usePanelSkin();

  const [section, setSection] = useState<SectionId>("overview");
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [verifyCode, setVerifyCode] = useState("");
  const [verifyDev, setVerifyDev] = useState("");

  const [contactChannel, setContactChannel] = useState<"email" | "sms">("email");
  const [newContact, setNewContact] = useState("");
  const [contactCode, setContactCode] = useState("");
  const [contactDev, setContactDev] = useState("");
  const [contactStep, setContactStep] = useState<"idle" | "code">("idle");

  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [totp, setTotp] = useState<TotpSetup | null>(null);
  const [totpCode, setTotpCode] = useState("");
  const [totpPassword, setTotpPassword] = useState("");
  const [disableTotpCode, setDisableTotpCode] = useState("");
  const [disableTotpPassword, setDisableTotpPassword] = useState("");

  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteOtp, setDeleteOtp] = useState("");
  const [deleteDev, setDeleteDev] = useState("");

  const loadUser = useCallback(async () => {
    const res = await fetch("/api/panel/account");
    const j = await res.json();
    if (j.success && j.user) {
      setUser(j.user);
      setName(j.user.name);
    }
    setLoading(false);
  }, []);

  const loadSessions = useCallback(async () => {
    const res = await fetch("/api/panel/account/sessions");
    const j = await res.json();
    if (j.success) setSessions(j.sessions ?? []);
  }, []);

  const loadTotp = useCallback(async () => {
    const res = await fetch("/api/panel/account/2fa");
    const j = await res.json();
    if (j.success) setTotp({ enabled: j.enabled, secret: j.secret, uri: j.uri });
  }, []);

  useEffect(() => {
    scheduleUpdate(() => {
      void loadUser();
      void loadSessions();
      void loadTotp();
    });
  }, [loadUser, loadSessions, loadTotp]);

  function flash(ok: string) {
    setErr("");
    setMsg(ok);
    pushAlert({ message: ok || d.alerts.saved, tone: "success" });
  }

  function flashErr(message: string) {
    setMsg("");
    setErr(message);
    pushAlert({ message, tone: "error" });
  }

  function flashApiErr(result: { message: string; code?: string }) {
    flashErr(resolveAuthError(d.errors.auth, result, result.message));
  }

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setMsg("");
    if (password && password !== confirm) {
      flashErr(a.passwordMismatch);
      return;
    }
    const body: Record<string, string> = { name };
    if (password) {
      body.password = password;
      body.confirmPassword = confirm;
      if (currentPassword) body.currentPassword = currentPassword;
    }
    const result = await fetchJson<{ user: PublicUser }>(
      "/api/panel/account",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    if (!result.ok) {
      flashApiErr(result);
      return;
    }
    setUser(result.data.user);
    setPassword("");
    setConfirm("");
    setCurrentPassword("");
    flash(a.saved);
  }

  async function sendVerifyEmail() {
    setErr("");
    setMsg("");
    const result = await fetchJson<{ devCode?: string }>(
      "/api/panel/account/verify-email",
      { method: "POST" },
    );
    if (!result.ok) {
      flashApiErr(result);
      return;
    }
    if (result.data.devCode) setVerifyDev(String(result.data.devCode));
    flash(a.verifySent);
  }

  async function confirmVerifyEmail(e: React.FormEvent) {
    e.preventDefault();
    const result = await fetchJson<{ user: PublicUser }>(
      "/api/panel/account/verify-email",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: verifyCode }),
      },
    );
    if (!result.ok) {
      flashApiErr(result);
      return;
    }
    setUser(result.data.user);
    setVerifyCode("");
    setVerifyDev("");
    flash(a.emailVerified);
  }

  async function sendContactChange(e: React.FormEvent) {
    e.preventDefault();
    const body =
      contactChannel === "email"
        ? { channel: "email" as const, email: newContact }
        : { channel: "sms" as const, phone: newContact };
    const result = await fetchJson<{ devCode?: string }>(
      "/api/panel/account/contact",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    if (!result.ok) {
      flashApiErr(result);
      return;
    }
    if (result.data.devCode) setContactDev(String(result.data.devCode));
    setContactStep("code");
    flash(a.contactCodeSent);
  }

  async function confirmContactChange(e: React.FormEvent) {
    e.preventDefault();
    const body =
      contactChannel === "email"
        ? { channel: "email" as const, email: newContact, code: contactCode }
        : { channel: "sms" as const, phone: newContact, code: contactCode };
    const result = await fetchJson<{ user: PublicUser }>(
      "/api/panel/account/contact",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    if (!result.ok) {
      flashApiErr(result);
      return;
    }
    setUser(result.data.user);
    setNewContact("");
    setContactCode("");
    setContactDev("");
    setContactStep("idle");
    flash(a.contactUpdated);
  }

  async function revokeSession(sessionId: string) {
    const result = await fetchJson(
      "/api/panel/account/sessions",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      },
    );
    if (!result.ok) {
      flashApiErr(result);
      return;
    }
    void loadSessions();
    flash(a.sessionRevoked);
  }

  async function enableTotp(e: React.FormEvent) {
    e.preventDefault();
    const body: Record<string, string> = { code: totpCode };
    if (totpPassword) body.currentPassword = totpPassword;
    const result = await fetchJson<{ user: PublicUser; enabled: boolean }>(
      "/api/panel/account/2fa",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    if (!result.ok) {
      flashApiErr(result);
      return;
    }
    setUser(result.data.user);
    setTotpCode("");
    setTotpPassword("");
    setTotp({ enabled: true });
    flash(a.totpEnabled);
  }

  async function disableTotp(e: React.FormEvent) {
    e.preventDefault();
    const body: Record<string, string> = { code: disableTotpCode };
    if (disableTotpPassword) body.currentPassword = disableTotpPassword;
    const result = await fetchJson<{ user: PublicUser; enabled: boolean }>(
      "/api/panel/account/2fa",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    if (!result.ok) {
      flashApiErr(result);
      return;
    }
    setUser(result.data.user);
    setDisableTotpCode("");
    setDisableTotpPassword("");
    void loadTotp();
    flash(a.totpDisabled);
  }

  async function sendDeleteOtp() {
    const result = await fetchJson<{ devCode?: string }>(
      "/api/panel/account/delete-otp",
      { method: "POST" },
    );
    if (!result.ok) {
      flashApiErr(result);
      return;
    }
    if (result.data.devCode) setDeleteDev(String(result.data.devCode));
    flash(a.deleteOtpSent);
  }

  async function deleteAccount(e: React.FormEvent) {
    e.preventDefault();
    const body: Record<string, string> = { confirm: deleteConfirm };
    if (user?.hasPassword) body.currentPassword = deletePassword;
    else if (deleteOtp) body.otpCode = deleteOtp;
    const result = await fetchJson(
      "/api/panel/account",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    if (!result.ok) {
      flashApiErr(result);
      return;
    }
    router.push("/auth/login");
    router.refresh();
  }

  const checks = useMemo(() => {
    if (!user) return [];
    return [
      { id: "email", ok: Boolean(user.email && user.emailVerified), label: a.checkEmail },
      { id: "password", ok: user.hasPassword, label: a.checkPassword },
      { id: "totp", ok: user.totpEnabled || Boolean(totp?.enabled), label: a.checkTotp },
      { id: "phone", ok: Boolean(user.phone), label: a.checkPhone },
    ];
  }, [user, totp?.enabled, a.checkEmail, a.checkPassword, a.checkTotp, a.checkPhone]);

  const score = checks.filter((c) => c.ok).length;
  const scorePct = Math.round((score / Math.max(checks.length, 1)) * 100);
  const activeSessions = sessions.filter((s) => !s.revoked).length;

  const nav: { id: SectionId; label: string }[] = [
    { id: "overview", label: a.navOverview },
    { id: "profile", label: a.navProfile },
    { id: "security", label: a.navSecurity },
    { id: "sessions", label: a.navSessions },
    { id: "danger", label: a.navDanger },
  ];

  if (loading || !user) {
    if (skin === "modern") return <AccountSkeleton label={p.common.loading} />;
    return <PanelLoading label={p.common.loading} />;
  }

  const memberDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString(fa ? "fa-IR" : "en-US")
    : "—";

  return (
    <div dir={dir} className="account-page space-y-5">
      <header className="account-hero relative overflow-hidden border border-paper/15 bg-paper/[0.02]">
        <div className="account-hero-glow pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <div className="relative flex flex-col gap-5 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-center gap-3.5">
            <div className="account-avatar flex h-14 w-14 shrink-0 items-center justify-center border border-term/35 bg-term/[0.08] text-base font-semibold tracking-wide text-term">
              {initials(user.name)}
            </div>
            <div className="min-w-0">
              <p className="account-kicker text-[11px] text-paper/45">{a.title}</p>
              <h1 className="account-name mt-0.5 truncate text-xl font-semibold tracking-tight text-paper sm:text-2xl">
                {user.name}
              </h1>
              <p className="mt-1 truncate text-xs text-paper/45" dir="ltr">
                {user.email ?? user.phone ?? a.noEmail}
              </p>
              <p className="mt-1.5 text-[11px] text-paper/35">
                {a.memberSince}: {memberDate}
              </p>
            </div>
          </div>

          <div className="account-metrics grid w-full grid-cols-2 gap-2 sm:w-auto sm:min-w-[16rem]">
            <div className="account-metric">
              <p className="account-metric-k">{a.securityTitle}</p>
              <p className="account-metric-v" dir="ltr">
                {fd(score)}/{fd(checks.length)}
              </p>
              <div className="account-meter mt-2">
                <div className="account-meter-fill" style={{ width: `${scorePct}%` }} />
              </div>
            </div>
            <div className="account-metric">
              <p className="account-metric-k">{a.sessionsSection}</p>
              <p className="account-metric-v" dir="ltr">
                {fd(activeSessions)}
              </p>
              <p className="mt-2 text-[11px] leading-snug text-paper/40">{a.securityHint}</p>
            </div>
          </div>
        </div>
      </header>

      {(msg || err) && (
        <PanelAlert message={msg || err} variant={msg ? "success" : "error"} />
      )}

      <nav className="account-tabs" aria-label={a.title}>
        {nav.map((item) => {
          const active = section === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSection(item.id)}
              className={`account-tab ${active ? "is-active" : ""} ${item.id === "danger" ? "is-danger" : ""}`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {section === "overview" && (
        <div className="grid gap-3 lg:grid-cols-2">
          <PanelCard className="account-card !p-0">
            <div className="account-card-pad">
              <SectionHead title={a.securityTitle} />
            </div>
            <ul className="account-dense-list">
              {checks.map((c) => (
                <li key={c.id} className="account-dense-row">
                  <StatusDot ok={c.ok} />
                  <span className={`min-w-0 flex-1 text-sm ${c.ok ? "text-paper/75" : "text-paper/45"}`}>
                    {c.label}
                  </span>
                  <span className={`account-chip ${c.ok ? "account-chip-ok" : "account-chip-warn"}`}>
                    {c.ok ? a.verified : a.unverified}
                  </span>
                </li>
              ))}
            </ul>
            <div className="account-card-pad flex flex-wrap gap-2 border-t border-paper/10">
              {!user.emailVerified && user.email ? (
                <button type="button" className={btnPrimary} onClick={() => setSection("security")}>
                  {a.verifyEmailSection}
                </button>
              ) : null}
              {!user.totpEnabled && !totp?.enabled ? (
                <button type="button" className={btn} onClick={() => setSection("security")}>
                  {a.enableTotp}
                </button>
              ) : null}
              <button type="button" className={btn} onClick={() => setSection("profile")}>
                {a.profileSection}
              </button>
            </div>
          </PanelCard>

          <PanelCard className="account-card !p-0">
            <div className="account-card-pad">
              <SectionHead title={a.profileSection} />
            </div>
            <dl className="account-dense-list">
              <div className="account-dense-row account-kv">
                <dt>{a.name}</dt>
                <dd>{user.name}</dd>
              </div>
              <div className="account-dense-row account-kv">
                <dt>{a.email}</dt>
                <dd className="text-end" dir="ltr">
                  {user.email ?? a.noEmail}
                  {user.email ? (
                    <span
                      className={`ms-2 inline-block ${
                        user.emailVerified ? "account-chip account-chip-ok" : "account-chip account-chip-warn"
                      }`}
                    >
                      {user.emailVerified ? a.verified : a.unverified}
                    </span>
                  ) : null}
                </dd>
              </div>
              <div className="account-dense-row account-kv">
                <dt>{a.phone}</dt>
                <dd className="text-end" dir="ltr">
                  {user.phone ?? a.noPhone}
                </dd>
              </div>
              <div className="account-dense-row account-kv">
                <dt>{a.sessionsSection}</dt>
                <dd className="font-mono text-term" dir="ltr">
                  {fd(activeSessions)}
                </dd>
              </div>
            </dl>
          </PanelCard>
        </div>
      )}

      {section === "profile" && (
        <div className="grid gap-3 lg:grid-cols-2">
          <PanelCard className="account-card">
            <SectionHead title={a.profileSection} hint={a.lead} />
            <form onSubmit={saveProfile} className="account-form mt-4 space-y-3.5">
              <div>
                <label className="account-label">{a.name}</label>
                <input className={input} value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label className="account-label">{a.email}</label>
                <input className={input} value={user.email ?? a.noEmail} disabled dir="ltr" />
              </div>
              <div>
                <label className="account-label">{a.phone}</label>
                <input className={input} value={user.phone ?? a.noPhone} disabled dir="ltr" />
              </div>
              <button type="submit" className={btnPrimary}>
                {p.common.save}
              </button>
            </form>
          </PanelCard>

          <PanelCard className="account-card">
            <SectionHead title={a.passwordSection} />
            <form onSubmit={saveProfile} className="account-form mt-4 space-y-3.5">
              {user.hasPassword && (
                <div>
                  <label className="account-label">{a.currentPassword}</label>
                  <PasswordField
                    value={currentPassword}
                    onChange={setCurrentPassword}
                    autoComplete="current-password"
                    showLabel={a.showPassword}
                    hideLabel={a.hidePassword}
                  />
                </div>
              )}
              <div>
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <label className="account-label !mb-0">
                    {user.hasPassword ? a.newPassword : a.setPasswordLabel}
                  </label>
                  <button
                    type="button"
                    className="text-[11px] text-term/80 transition-colors hover:text-term"
                    onClick={() => {
                      const next = generateStrongPassword();
                      setPassword(next);
                      setConfirm(next);
                      flash(a.passwordGenerated);
                    }}
                  >
                    {a.generatePassword}
                  </button>
                </div>
                <PasswordField
                  value={password}
                  onChange={setPassword}
                  minLength={8}
                  autoComplete="new-password"
                  showGenerator
                  generateLabel={a.generatePassword}
                  onGenerate={() => {
                    const next = generateStrongPassword();
                    setPassword(next);
                    setConfirm(next);
                    flash(a.passwordGenerated);
                  }}
                  showLabel={a.showPassword}
                  hideLabel={a.hidePassword}
                />
              </div>
              {password ? (
                <div>
                  <label className="account-label">{a.confirmPassword}</label>
                  <PasswordField
                    value={confirm}
                    onChange={setConfirm}
                    autoComplete="new-password"
                    showLabel={a.showPassword}
                    hideLabel={a.hidePassword}
                  />
                </div>
              ) : null}
              <button type="submit" className={btnPrimary} disabled={!password && user.hasPassword}>
                {user.hasPassword ? a.setPassword : a.setPasswordLabel}
              </button>
            </form>
          </PanelCard>

          <PanelCard className="account-card lg:col-span-2">
            <SectionHead title={a.changeContactSection} hint={a.changeContactHint} />
            {contactStep === "idle" ? (
              <form onSubmit={sendContactChange} className="account-form mt-4 max-w-lg space-y-3.5">
                <div className="account-segment flex gap-1.5">
                  <button
                    type="button"
                    className={`${btn} ${contactChannel === "email" ? "is-selected border-term/40 bg-term/[0.06] text-term" : ""}`}
                    onClick={() => setContactChannel("email")}
                  >
                    {a.changeEmail}
                  </button>
                  <button
                    type="button"
                    className={`${btn} ${contactChannel === "sms" ? "is-selected border-term/40 bg-term/[0.06] text-term" : ""}`}
                    onClick={() => setContactChannel("sms")}
                  >
                    {a.changePhone}
                  </button>
                </div>
                <div>
                  <label className="account-label">
                    {contactChannel === "email" ? a.newEmail : a.newPhone}
                  </label>
                  <input
                    className={input}
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                    type={contactChannel === "email" ? "email" : "tel"}
                    dir="ltr"
                    required
                  />
                </div>
                <button type="submit" className={btnPrimary}>
                  {a.sendContactCode}
                </button>
              </form>
            ) : (
              <form onSubmit={confirmContactChange} className="account-form mt-4 max-w-lg space-y-3.5">
                {contactDev ? (
                  <p className="font-mono text-[10px] text-term/70" dir="ltr">
                    dev: {contactDev}
                  </p>
                ) : null}
                <div>
                  <label className="account-label">{a.verificationCode}</label>
                  <input
                    className={input}
                    value={contactCode}
                    onChange={(e) => setContactCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    inputMode="numeric"
                    maxLength={6}
                    dir="ltr"
                    required
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <button type="submit" className={btnPrimary}>
                    {a.confirmChange}
                  </button>
                  <button
                    type="button"
                    className={btn}
                    onClick={() => {
                      setContactStep("idle");
                      setContactCode("");
                    }}
                  >
                    {p.common.cancel}
                  </button>
                </div>
              </form>
            )}
          </PanelCard>
        </div>
      )}

      {section === "security" && (
        <div className="space-y-3">
          {user.email && !user.emailVerified ? (
            <PanelCard className="account-card">
              <SectionHead
                title={a.verifyEmailSection}
                hint={a.verifyEmailHint}
                badge={a.unverified}
                badgeTone="warn"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" className={btnPrimary} onClick={() => void sendVerifyEmail()}>
                  {a.sendVerifyCode}
                </button>
              </div>
              {verifyDev ? (
                <p className="mt-2 font-mono text-[10px] text-term/70" dir="ltr">
                  dev: {verifyDev}
                </p>
              ) : null}
              <form onSubmit={confirmVerifyEmail} className="mt-4 flex max-w-md flex-wrap items-end gap-2">
                <div className="min-w-[8rem] flex-1">
                  <label className="account-label">{a.verificationCode}</label>
                  <input
                    className={input}
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    inputMode="numeric"
                    maxLength={6}
                    dir="ltr"
                  />
                </div>
                <button type="submit" className={btn}>
                  {a.confirmVerify}
                </button>
              </form>
            </PanelCard>
          ) : null}

          <PanelCard className="account-card">
            <SectionHead
              title={a.totpSection}
              hint={a.totpHint}
              badge={totp?.enabled || user.totpEnabled ? a.totpActive : a.unverified}
              badgeTone={totp?.enabled || user.totpEnabled ? "ok" : "neutral"}
            />

            {totp?.enabled || user.totpEnabled ? (
              <form onSubmit={disableTotp} className="account-form mt-4 max-w-md space-y-3.5">
                {user.hasPassword ? (
                  <div>
                    <label className="account-label">{a.currentPassword}</label>
                    <PasswordField
                      value={disableTotpPassword}
                      onChange={setDisableTotpPassword}
                      showLabel={a.showPassword}
                      hideLabel={a.hidePassword}
                    />
                  </div>
                ) : null}
                <div>
                  <label className="account-label">{a.totpCode}</label>
                  <input
                    className={input}
                    value={disableTotpCode}
                    onChange={(e) => setDisableTotpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    inputMode="numeric"
                    maxLength={6}
                    dir="ltr"
                    required
                  />
                </div>
                <button type="submit" className={btnDanger}>
                  {a.disableTotp}
                </button>
              </form>
            ) : (
              <form onSubmit={enableTotp} className="account-form mt-4 max-w-lg space-y-3.5">
                {totp?.secret ? (
                  <div className="account-secret border border-term/20 bg-term/[0.04] p-4">
                    <p className="text-xs text-paper/45">{a.totpSetupHint}</p>
                    <p className="mt-3 break-all font-mono text-sm tracking-wider text-term" dir="ltr">
                      {totp.secret}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        className={btn}
                        onClick={() => {
                          void navigator.clipboard?.writeText(totp.secret ?? "").then(() => {
                            flash(a.secretCopied);
                          });
                        }}
                      >
                        {a.copySecret}
                      </button>
                      {totp.uri ? (
                        <a href={totp.uri} className={btnPrimary}>
                          {a.openAuthenticator}
                        </a>
                      ) : null}
                    </div>
                  </div>
                ) : null}
                {user.hasPassword ? (
                  <div>
                    <label className="account-label">{a.currentPassword}</label>
                    <PasswordField
                      value={totpPassword}
                      onChange={setTotpPassword}
                      showLabel={a.showPassword}
                      hideLabel={a.hidePassword}
                    />
                  </div>
                ) : null}
                <div>
                  <label className="account-label">{a.totpCode}</label>
                  <input
                    className={input}
                    value={totpCode}
                    onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    inputMode="numeric"
                    maxLength={6}
                    dir="ltr"
                    required
                  />
                </div>
                <button type="submit" className={btnPrimary}>
                  {a.enableTotp}
                </button>
              </form>
            )}
          </PanelCard>
        </div>
      )}

      {section === "sessions" &&
        (skin === "modern" ? (
          <PanelDataTable
            title={a.sessionsSection}
            description={a.sessionsHint}
            primaryHeader={p.common.device}
            columnHeaders={[p.common.status, a.lastSeen]}
            actionsHeader={p.common.action}
            showCheckbox
            empty={
              <PanelEmpty
                label={p.common.empty}
                title={a.sessionsEmpty}
                description={a.sessionsEmptyHint}
              />
            }
            rows={sessions.map((s) => {
              const device = deviceLabel(s.userAgent, a.unknownDevice);
              return {
                id: s.id,
                icon: Monitor,
                iconClassName: s.current ? "text-teal-400" : "text-sky-400",
                iconBgClassName: s.current ? "bg-teal-400/20" : "bg-sky-400/20",
                title: device,
                subtitle: (
                  <span dir="ltr">
                    {(s.userAgent ?? a.unknownDevice).slice(0, 72)}
                    {s.ip ? ` · ${s.ip}` : ""}
                  </span>
                ),
                cells: [
                  s.current ? (
                    <span key="cur" className="text-teal-500">
                      {a.currentSession}
                    </span>
                  ) : (
                    "—"
                  ),
                  <span key="seen" dir="ltr">
                    {new Date(s.lastSeenAt).toLocaleString(fa ? "fa-IR" : "en-US")}
                  </span>,
                ],
                actions:
                  !s.current && !s.revoked
                    ? [
                        {
                          label: a.revokeSession,
                          icon: LogOut,
                          destructive: true,
                          onSelect: () => void revokeSession(s.id),
                        },
                      ]
                    : [],
              };
            })}
          />
        ) : (
          <PanelCard className="account-card !p-0">
          <div className="account-card-pad">
            <SectionHead title={a.sessionsSection} hint={a.sessionsHint} />
          </div>
          <ul className="account-dense-list">
            {sessions.length === 0 ? (
              <li className="account-card-pad">
                <PanelEmpty
                  label={p.common.empty}
                  title={a.sessionsEmpty}
                  description={a.sessionsEmptyHint}
                />
              </li>
            ) : (
              sessions.map((s) => (
                <li
                  key={s.id}
                  className={`account-session-row ${s.current ? "is-current" : ""}`}
                >
                  <span
                    className={`account-status-dot shrink-0 ${s.current ? "is-ok" : "is-idle"}`}
                    aria-hidden
                  />
                  <div className="account-session-icon" aria-hidden>
                    {deviceLabel(s.userAgent, "UA").slice(0, 3)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-paper/85" dir="ltr">
                      {s.userAgent ?? a.unknownDevice}
                    </p>
                    <p className="mt-0.5 text-[11px] text-paper/40" dir="ltr">
                      {s.ip ?? "—"} · {a.lastSeen}:{" "}
                      {new Date(s.lastSeenAt).toLocaleString(fa ? "fa-IR" : "en-US")}
                      {s.current ? ` · ${a.currentSession}` : ""}
                    </p>
                  </div>
                  {!s.current && !s.revoked ? (
                    <button
                      type="button"
                      className={btnDanger}
                      onClick={() => void revokeSession(s.id)}
                    >
                      {a.revokeSession}
                    </button>
                  ) : s.current ? (
                    <span className="account-chip account-chip-ok">{a.currentSession}</span>
                  ) : null}
                </li>
              ))
            )}
          </ul>
        </PanelCard>
        ))}

      {section === "danger" && (
        <PanelCard className="account-card account-card-danger border-terr/25">
          <SectionHead title={a.deleteSection} hint={a.deleteHint} badgeTone="danger" />
          {!user.hasPassword && user.email ? (
            <button type="button" className={`${btn} mt-4`} onClick={() => void sendDeleteOtp()}>
              {a.sendDeleteOtp}
            </button>
          ) : null}
          {deleteDev ? (
            <p className="mt-2 font-mono text-[10px] text-term/70" dir="ltr">
              dev: {deleteDev}
            </p>
          ) : null}
          <form onSubmit={deleteAccount} className="account-form mt-4 max-w-md space-y-3.5">
            <div>
              <label className="account-label">{a.deleteConfirmLabel}</label>
              <input
                className={input}
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                placeholder="DELETE"
                dir="ltr"
                required
              />
            </div>
            {user.hasPassword ? (
              <div>
                <label className="account-label">{a.currentPassword}</label>
                <PasswordField
                  value={deletePassword}
                  onChange={setDeletePassword}
                  required
                  showLabel={a.showPassword}
                  hideLabel={a.hidePassword}
                />
              </div>
            ) : (
              <div>
                <label className="account-label">{a.verificationCode}</label>
                <input
                  className={input}
                  value={deleteOtp}
                  onChange={(e) => setDeleteOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  inputMode="numeric"
                  maxLength={6}
                  dir="ltr"
                />
              </div>
            )}
            <button type="submit" className={btnDanger}>
              {a.deleteAccount}
            </button>
          </form>
        </PanelCard>
      )}
    </div>
  );
}
