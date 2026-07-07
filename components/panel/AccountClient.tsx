"use client";

import { scheduleUpdate } from "@/lib/react/schedule-update";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useT } from "@/i18n/LangProvider";
import type { PublicUser } from "@/lib/auth/types";
import { fetchJson } from "@/lib/errors/fetch-json";
import { PanelCard, PanelLoading } from "./PanelLayoutClient";

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

const input =
  "w-full border border-paper/20 bg-paper/[0.03] px-3 py-2 text-sm text-paper outline-none focus:border-paper/45";

const btn =
  "border border-paper/30 px-4 py-2 text-sm text-paper transition-colors hover:border-paper/50 hover:bg-paper/[0.04]";

const btnDanger =
  "border border-terr/40 px-4 py-2 text-sm text-terr transition-colors hover:border-terr/60 hover:bg-terr/10";

function Badge({ ok, yes, no }: { ok: boolean; yes: string; no: string }) {
  return (
    <span
      className={`ms-2 inline-block rounded px-1.5 py-0.5 text-[10px] ${
        ok ? "bg-term/15 text-term" : "bg-amber/15 text-amber"
      }`}
    >
      {ok ? yes : no}
    </span>
  );
}

export default function AccountClient() {
  const router = useRouter();
  const { dir, p } = useT();
  const a = p.account;

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
  }

  function flashErr(message: string) {
    setMsg("");
    setErr(message);
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
      flashErr(result.message);
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
      flashErr(result.message);
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
      flashErr(result.message);
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
      flashErr(result.message);
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
      flashErr(result.message);
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
      flashErr(result.message);
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
      flashErr(result.message);
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
      flashErr(result.message);
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
      flashErr(result.message);
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
      flashErr(result.message);
      return;
    }
    router.push("/auth/login");
    router.refresh();
  }

  if (loading || !user) return <PanelLoading label={p.common.loading} />;

  return (
    <div dir={dir} className="space-y-8">
      <div>
        <h1 className="text-2xl text-paper">{a.title}</h1>
        {msg && <p className="mt-2 text-xs text-term">{msg}</p>}
        {err && <p className="mt-2 text-xs text-terr">{err}</p>}
      </div>

      <PanelCard>
        <h2 className="text-sm font-medium text-paper">{a.profileSection}</h2>
        <form onSubmit={saveProfile} className="mt-4 max-w-md space-y-4">
          <div>
            <label className="mb-1 block text-xs text-paper/45">{a.name}</label>
            <input className={input} value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="mb-1 block text-xs text-paper/45">{a.email}</label>
            <div className="flex items-center">
              <input className={input} value={user.email ?? a.noEmail} disabled dir="ltr" />
              {user.email && (
                <Badge ok={user.emailVerified} yes={a.verified} no={a.unverified} />
              )}
            </div>
          </div>
          {user.phone && (
            <div>
              <label className="mb-1 block text-xs text-paper/45">{a.phone}</label>
              <div className="flex items-center">
                <input className={input} value={user.phone} disabled dir="ltr" />
                <Badge ok={user.phoneVerified} yes={a.verified} no={a.unverified} />
              </div>
            </div>
          )}
          {user.hasPassword && (
            <div>
              <label className="mb-1 block text-xs text-paper/45">{a.currentPassword}</label>
              <input
                type="password"
                className={input}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
          )}
          <div>
            <label className="mb-1 block text-xs text-paper/45">
              {user.hasPassword ? a.newPassword : a.setPasswordLabel}
            </label>
            <input
              type="password"
              className={input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              autoComplete="new-password"
            />
          </div>
          {password && (
            <div>
              <label className="mb-1 block text-xs text-paper/45">{a.confirmPassword}</label>
              <input
                type="password"
                className={input}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="new-password"
              />
            </div>
          )}
          <button type="submit" className={btn}>
            {p.common.save}
          </button>
        </form>
      </PanelCard>

      {user.email && !user.emailVerified && (
        <PanelCard>
          <h2 className="text-sm font-medium text-paper">{a.verifyEmailSection}</h2>
          <p className="mt-1 text-xs text-paper/45">{a.verifyEmailHint}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className={btn} onClick={() => void sendVerifyEmail()}>
              {a.sendVerifyCode}
            </button>
          </div>
          {verifyDev && (
            <p className="mt-2 font-mono text-[10px] text-term/70" dir="ltr">
              dev: {verifyDev}
            </p>
          )}
          <form onSubmit={confirmVerifyEmail} className="mt-4 flex max-w-xs flex-wrap items-end gap-2">
            <div className="min-w-[8rem] flex-1">
              <label className="mb-1 block text-xs text-paper/45">{a.verificationCode}</label>
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
      )}

      <PanelCard>
        <h2 className="text-sm font-medium text-paper">{a.changeContactSection}</h2>
        <p className="mt-1 text-xs text-paper/45">{a.changeContactHint}</p>
        {contactStep === "idle" ? (
          <form onSubmit={sendContactChange} className="mt-4 max-w-md space-y-4">
            <div className="flex gap-2">
              <button
                type="button"
                className={`${btn} ${contactChannel === "email" ? "border-paper/50 bg-paper/[0.06]" : ""}`}
                onClick={() => setContactChannel("email")}
              >
                {a.changeEmail}
              </button>
              <button
                type="button"
                className={`${btn} ${contactChannel === "sms" ? "border-paper/50 bg-paper/[0.06]" : ""}`}
                onClick={() => setContactChannel("sms")}
              >
                {a.changePhone}
              </button>
            </div>
            <div>
              <label className="mb-1 block text-xs text-paper/45">
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
            <button type="submit" className={btn}>
              {a.sendContactCode}
            </button>
          </form>
        ) : (
          <form onSubmit={confirmContactChange} className="mt-4 max-w-md space-y-4">
            {contactDev && (
              <p className="font-mono text-[10px] text-term/70" dir="ltr">
                dev: {contactDev}
              </p>
            )}
            <div>
              <label className="mb-1 block text-xs text-paper/45">{a.verificationCode}</label>
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
            <div className="flex gap-2">
              <button type="submit" className={btn}>
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

      <PanelCard>
        <h2 className="text-sm font-medium text-paper">{a.sessionsSection}</h2>
        <p className="mt-1 text-xs text-paper/45">{a.sessionsHint}</p>
        <ul className="mt-4 space-y-2">
          {sessions.length === 0 && <li className="text-xs text-paper/40">{p.common.empty}</li>}
          {sessions.map((s) => (
            <li
              key={s.id}
              className="flex flex-wrap items-center justify-between gap-2 border border-paper/10 px-3 py-2 text-xs"
            >
              <div className="min-w-0 text-paper/60" dir="ltr">
                <span className="block truncate">{s.userAgent ?? a.unknownDevice}</span>
                <span className="text-paper/35">
                  {s.ip ?? "—"} · {new Date(s.lastSeenAt).toLocaleString()}
                  {s.current && ` · ${a.currentSession}`}
                </span>
              </div>
              {!s.current && !s.revoked && (
                <button type="button" className={btnDanger} onClick={() => void revokeSession(s.id)}>
                  {a.revokeSession}
                </button>
              )}
            </li>
          ))}
        </ul>
      </PanelCard>

      <PanelCard>
        <h2 className="text-sm font-medium text-paper">{a.totpSection}</h2>
        <p className="mt-1 text-xs text-paper/45">{a.totpHint}</p>
        {totp?.enabled || user.totpEnabled ? (
          <form onSubmit={disableTotp} className="mt-4 max-w-md space-y-4">
            <p className="text-xs text-term">{a.totpActive}</p>
            {user.hasPassword && (
              <div>
                <label className="mb-1 block text-xs text-paper/45">{a.currentPassword}</label>
                <input
                  type="password"
                  className={input}
                  value={disableTotpPassword}
                  onChange={(e) => setDisableTotpPassword(e.target.value)}
                />
              </div>
            )}
            <div>
              <label className="mb-1 block text-xs text-paper/45">{a.totpCode}</label>
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
          <form onSubmit={enableTotp} className="mt-4 max-w-md space-y-4">
            {totp?.secret && (
              <>
                <p className="text-xs text-paper/45">{a.totpSetupHint}</p>
                <p className="break-all font-mono text-[11px] text-paper/60" dir="ltr">
                  {totp.secret}
                </p>
                {totp.uri && (
                  <p className="break-all font-mono text-[10px] text-paper/35" dir="ltr">
                    {totp.uri}
                  </p>
                )}
              </>
            )}
            {user.hasPassword && (
              <div>
                <label className="mb-1 block text-xs text-paper/45">{a.currentPassword}</label>
                <input
                  type="password"
                  className={input}
                  value={totpPassword}
                  onChange={(e) => setTotpPassword(e.target.value)}
                />
              </div>
            )}
            <div>
              <label className="mb-1 block text-xs text-paper/45">{a.totpCode}</label>
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
            <button type="submit" className={btn}>
              {a.enableTotp}
            </button>
          </form>
        )}
      </PanelCard>

      <PanelCard>
        <h2 className="text-sm font-medium text-terr">{a.deleteSection}</h2>
        <p className="mt-1 text-xs text-paper/45">{a.deleteHint}</p>
        {!user.hasPassword && user.email && (
          <button type="button" className={`${btn} mt-4`} onClick={() => void sendDeleteOtp()}>
            {a.sendDeleteOtp}
          </button>
        )}
        {deleteDev && (
          <p className="mt-2 font-mono text-[10px] text-term/70" dir="ltr">
            dev: {deleteDev}
          </p>
        )}
        <form onSubmit={deleteAccount} className="mt-4 max-w-md space-y-4">
          <div>
            <label className="mb-1 block text-xs text-paper/45">{a.deleteConfirmLabel}</label>
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
              <label className="mb-1 block text-xs text-paper/45">{a.currentPassword}</label>
              <input
                type="password"
                className={input}
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                required
              />
            </div>
          ) : (
            <div>
              <label className="mb-1 block text-xs text-paper/45">{a.verificationCode}</label>
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
    </div>
  );
}
