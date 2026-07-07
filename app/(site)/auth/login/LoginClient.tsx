"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
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
type OtpStep = "input" | "code";
type LoginStep = "credentials" | "totp";

export default function LoginClient() {
  const { fa, dir, d } = useT();
  const copy = d.auth.login;
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/panel";

  const [mode, setMode] = useState<Mode>("email");
  const [otpChannel, setOtpChannel] = useState<OtpChannel>("email");
  const [otpStep, setOtpStep] = useState<OtpStep>("input");
  const [loginStep, setLoginStep] = useState<LoginStep>("credentials");
  const [preAuthToken, setPreAuthToken] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [devCode, setDevCode] = useState("");
  const [form, setForm] = useState({ email: "", phone: "", password: "", code: "" });

  function setAuthError(result: { message: string; code?: string }) {
    setError(resolveAuthError(d.errors.auth, result, copy.errorGeneric));
  }

  function otpSendBody() {
    if (otpChannel === "email") {
      return { channel: "email" as const, email: form.email, purpose: "login" as const };
    }
    return { channel: "sms" as const, phone: form.phone, purpose: "login" as const };
  }

  function otpVerifyBody() {
    const base = { code: form.code, purpose: "login" as const, redirect: next };
    if (otpChannel === "email") {
      return { ...base, channel: "email" as const, email: form.email };
    }
    return { ...base, channel: "sms" as const, phone: form.phone };
  }

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await fetchJson<{ redirect?: string; requiresTotp?: boolean; preAuthToken?: string }>(
      "/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password, redirect: next }),
      },
      d.errors.network,
    );
    if (!result.ok) {
      setAuthError(result);
      setLoading(false);
      return;
    }
    if (result.data.requiresTotp && result.data.preAuthToken) {
      setPreAuthToken(result.data.preAuthToken);
      setLoginStep("totp");
      setLoading(false);
      return;
    }
    router.push(result.data.redirect ?? next);
    router.refresh();
    setLoading(false);
  }

  async function handleTotpVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await fetchJson<{ redirect?: string }>(
      "/api/auth/2fa/verify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preAuthToken, code: totpCode, redirect: next }),
      },
      d.errors.network,
    );
    if (!result.ok) {
      setAuthError(result);
      setLoading(false);
      return;
    }
    router.push(result.data.redirect ?? next);
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
    router.push(result.data.redirect ?? next);
    router.refresh();
    setLoading(false);
  }

  return (
    <AuthShell
      eyebrow={copy.eyebrow}
      title={copy.title}
      subtitle={copy.subtitle}
      altHref="/auth/register"
      altLabel={copy.toRegister}
    >
      {error && <InlineError message={error} dir={dir} fa={fa} />}

      {loginStep === "totp" ? (
        <form onSubmit={handleTotpVerify} className="space-y-5" dir={dir}>
          <p className={`text-xs text-paper/45 ${fa ? "font-fa" : "font-mono"}`}>{copy.totpSubtitle}</p>
          <div>
            <label className={authLabelClass(fa)}>{copy.labelTotp}</label>
            <input
              type="text"
              required
              inputMode="numeric"
              pattern="\d{6}"
              maxLength={6}
              autoComplete="one-time-code"
              value={totpCode}
              onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ""))}
              className={`${authInputClass(fa)} tracking-[0.4em]`}
              placeholder="000000"
              dir="ltr"
            />
          </div>
          <button type="submit" disabled={loading} className={authBtnClass(fa)}>
            {loading ? copy.loading : copy.totpSubmit}
          </button>
          <button
            type="button"
            onClick={() => {
              setLoginStep("credentials");
              setPreAuthToken("");
              setTotpCode("");
            }}
            className={`text-[10px] text-paper/40 hover:text-paper ${fa ? "font-fa" : "font-mono"}`}
          >
            {copy.totpBack}
          </button>
        </form>
      ) : (
        <>
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
          onClick={() => { setMode("otp"); setOtpStep("input"); setError(""); }}
        >
          {copy.tabOtp}
        </button>
      </div>

      {mode === "email" ? (
        <form onSubmit={handleEmailLogin} className="space-y-5" dir={dir}>
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
            <div className="mb-1 flex items-center justify-between gap-2">
              <label className={authLabelClass(fa)}>{copy.labelPassword}</label>
              <Link
                href="/auth/forgot-password"
                className={`text-[10px] text-paper/40 hover:text-paper ${fa ? "font-fa" : "font-mono"}`}
              >
                {copy.forgotPassword}
              </Link>
            </div>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={authInputClass(fa)}
              placeholder={copy.labelPassword}
            />
          </div>
          <button type="submit" disabled={loading} className={authBtnClass(fa)}>
            {loading ? copy.loading : copy.submit}
          </button>
        </form>
      ) : (
        <>
          {otpStep === "input" && (
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

          {otpStep === "input" ? (
            <form onSubmit={sendOtp} className="space-y-5" dir={dir}>
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
                onClick={() => setOtpStep("input")}
                className={`text-[10px] text-paper/40 hover:text-paper ${fa ? "font-fa" : "font-mono"}`}
              >
                {copy.changeContact}
              </button>
            </form>
          )}
        </>
      )}
        </>
      )}
    </AuthShell>
  );
}
