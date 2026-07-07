"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthShell, {
  authBtnClass,
  authInputClass,
  authLabelClass,
  authTabClass,
} from "@/components/auth/AuthShell";
import InlineError from "@/components/errors/InlineError";
import { useT } from "@/i18n/LangProvider";
import type { OtpChannel } from "@/lib/auth/types";
import { fetchJson } from "@/lib/errors/fetch-json";
import { resolveAuthError } from "@/lib/errors/resolve-auth-error";

type Mode = "email" | "otp";
type OtpStep = "details" | "code";

export default function RegisterClient() {
  const { fa, dir, d } = useT();
  const copy = d.auth.register;
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("email");
  const [otpChannel, setOtpChannel] = useState<OtpChannel>("email");
  const [otpStep, setOtpStep] = useState<OtpStep>("details");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [devCode, setDevCode] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    code: "",
  });

  function setAuthError(result: { message: string; code?: string }) {
    setError(resolveAuthError(d.errors.auth, result, copy.errorGeneric));
  }

  function otpSendBody() {
    if (otpChannel === "email") {
      return { channel: "email" as const, email: form.email, purpose: "register" as const };
    }
    return { channel: "sms" as const, phone: form.phone, purpose: "register" as const };
  }

  function otpVerifyBody() {
    const base = { name: form.name, code: form.code, purpose: "register" as const };
    if (otpChannel === "email") {
      return { ...base, channel: "email" as const, email: form.email };
    }
    return { ...base, channel: "sms" as const, phone: form.phone };
  }

  async function handleEmailRegister(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError(copy.errorPasswordMatch);
      return;
    }
    setLoading(true);
    setError("");
    const result = await fetchJson<{ redirect?: string }>(
      "/api/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      },
      d.errors.network,
    );
    if (!result.ok) {
      setAuthError(result);
      setLoading(false);
      return;
    }
    router.push(result.data.redirect ?? "/panel");
    router.refresh();
    setLoading(false);
  }

  async function sendOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setDevCode("");
    const result = await fetchJson<{ devCode?: string }>(
      "/api/auth/otp/send",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(otpSendBody()),
      },
      d.errors.network,
    );
    if (!result.ok) {
      setAuthError(result);
      setLoading(false);
      return;
    }
    if (result.data.devCode) setDevCode(String(result.data.devCode));
    setOtpStep("code");
    setLoading(false);
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await fetchJson<{ redirect?: string }>(
      "/api/auth/otp/verify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(otpVerifyBody()),
      },
      d.errors.network,
    );
    if (!result.ok) {
      setAuthError(result);
      setLoading(false);
      return;
    }
    router.push(result.data.redirect ?? "/panel");
    router.refresh();
    setLoading(false);
  }

  return (
    <AuthShell
      eyebrow={copy.eyebrow}
      title={copy.title}
      subtitle={copy.subtitle}
      altHref="/auth/login"
      altLabel={copy.toLogin}
    >
      <div className="mb-6 flex gap-2" dir={dir}>
        <button
          type="button"
          className={authTabClass(mode === "email", fa)}
          onClick={() => { setMode("email"); setError(""); }}
        >
          {copy.tabEmail}
        </button>
        <button
          type="button"
          className={authTabClass(mode === "otp", fa)}
          onClick={() => { setMode("otp"); setOtpStep("details"); setError(""); }}
        >
          {copy.tabOtp}
        </button>
      </div>

      {error && <InlineError message={error} dir={dir} fa={fa} />}

      {mode === "email" ? (
        <form onSubmit={handleEmailRegister} className="space-y-5" dir={dir}>
          <div>
            <label className={authLabelClass(fa)}>{copy.labelName}</label>
            <input
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={authInputClass(fa)}
              placeholder={copy.labelName}
            />
          </div>
          <div>
            <label className={authLabelClass(fa)}>{copy.labelEmail}</label>
            <input
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={authInputClass(fa)}
              placeholder={copy.labelEmail}
            />
          </div>
          <div>
            <label className={authLabelClass(fa)}>{copy.labelPassword}</label>
            <input
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={authInputClass(fa)}
              placeholder={copy.labelPassword}
            />
          </div>
          <div>
            <label className={authLabelClass(fa)}>{copy.labelConfirm}</label>
            <input
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              className={authInputClass(fa)}
              placeholder={copy.labelConfirm}
            />
          </div>
          <button type="submit" disabled={loading} className={authBtnClass(fa)}>
            {loading ? copy.loading : copy.submit}
          </button>
        </form>
      ) : (
        <>
          {otpStep === "details" && (
            <div className="mb-4 flex gap-2" dir={dir}>
              <button
                type="button"
                className={authTabClass(otpChannel === "email", fa)}
                onClick={() => setOtpChannel("email")}
              >
                {copy.otpChannelEmail}
              </button>
              <button
                type="button"
                className={authTabClass(otpChannel === "sms", fa)}
                onClick={() => setOtpChannel("sms")}
              >
                {copy.otpChannelSms}
              </button>
            </div>
          )}

          {otpStep === "details" ? (
            <form onSubmit={sendOtp} className="space-y-5" dir={dir}>
              <div>
                <label className={authLabelClass(fa)}>{copy.labelName}</label>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={authInputClass(fa)}
                  placeholder={copy.labelName}
                />
              </div>
              {otpChannel === "email" ? (
                <div>
                  <label className={authLabelClass(fa)}>{copy.labelEmail}</label>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={authInputClass(fa)}
                    placeholder={copy.labelEmail}
                  />
                </div>
              ) : (
                <div>
                  <label className={authLabelClass(fa)}>{copy.labelPhone}</label>
                  <input
                    type="tel"
                    required
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={authInputClass(fa)}
                    placeholder={copy.phonePlaceholder}
                    dir="ltr"
                  />
                </div>
              )}
              <button type="submit" disabled={loading} className={authBtnClass(fa)}>
                {loading ? copy.loading : copy.sendOtp}
              </button>
            </form>
          ) : (
            <form onSubmit={verifyOtp} className="space-y-5" dir={dir}>
              {devCode && (
                <p className="text-[10px] text-term/70 font-mono" dir="ltr">
                  dev: {devCode}
                </p>
              )}
              <p dir={dir} className={`text-xs text-paper/45 ${fa ? "font-fa" : "font-mono"}`}>
                {otpChannel === "email" ? copy.otpSentEmail : copy.otpSentSms}
              </p>
              <div>
                <label className={authLabelClass(fa)}>{copy.labelOtp}</label>
                <input
                  type="text"
                  required
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength={6}
                  autoComplete="one-time-code"
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.replace(/\D/g, "") })}
                  className={`${authInputClass(fa)} tracking-[0.4em]`}
                  placeholder="000000"
                  dir="ltr"
                />
              </div>
              <button type="submit" disabled={loading} className={authBtnClass(fa)}>
                {loading ? copy.loading : copy.verifyOtp}
              </button>
              <button
                type="button"
                onClick={() => setOtpStep("details")}
                className={`text-[10px] text-paper/40 hover:text-paper ${fa ? "font-fa" : "font-mono"}`}
              >
                {copy.changeContact}
              </button>
            </form>
          )}
        </>
      )}
    </AuthShell>
  );
}
