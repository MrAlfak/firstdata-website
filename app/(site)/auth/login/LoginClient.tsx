"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import { useAuthClasses } from "@/components/auth/useAuthClasses";
import InlineError from "@/components/errors/InlineError";
import LoginForm from "@/components/shadcn-space/blocks/login-01/login";
import TwoFactorAuthForm from "@/components/shadcn-space/blocks/two-factor-authentication-01/two-factor-auth";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useT } from "@/i18n/LangProvider";
import type { OtpChannel } from "@/lib/auth/types";
import { FILL_PATHS, LOGO_VIEW_BOX } from "@/lib/brand/mark-paths";
import { fetchJson } from "@/lib/errors/fetch-json";
import { resolveAuthError } from "@/lib/errors/resolve-auth-error";
import { pushAlert } from "@/lib/alerts/types";

type Mode = "email" | "otp";
type OtpStep = "input" | "code";
type LoginStep = "credentials" | "totp";

function FirstDataMark({ className }: { className?: string }) {
  return (
    <svg viewBox={LOGO_VIEW_BOX} className={className} aria-hidden>
      {FILL_PATHS.map((d) => (
        <path key={d} d={d} fill="currentColor" fillRule="evenodd" />
      ))}
    </svg>
  );
}

export default function LoginClient() {
  const { fa, dir, d } = useT();
  const ac = useAuthClasses();
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
  const [remember, setRemember] = useState(true);
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
      pushAlert({ message: d.alerts.loginFail, tone: "error" });
      setLoading(false);
      return;
    }
    if (result.data.requiresTotp && result.data.preAuthToken) {
      setPreAuthToken(result.data.preAuthToken);
      setLoginStep("totp");
      setLoading(false);
      return;
    }
    pushAlert({ message: d.alerts.loginOk, tone: "success" });
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

  const modernLabels = {
    title: copy.welcomeTitle,
    description: copy.welcomeSubtitle,
    emailLabel: `${copy.labelEmail}*`,
    passwordLabel: `${copy.labelPassword}*`,
    emailPlaceholder: copy.emailPlaceholder,
    passwordPlaceholder: copy.passwordPlaceholder,
    rememberLabel: copy.rememberDevice,
    forgotPasswordLabel: copy.forgotPassword,
    submitLabel: copy.submit,
    submitLoadingLabel: copy.loading,
    orSignInWith: copy.orSignInWith,
    noAccount: copy.noAccount,
    createAccountLabel: copy.createAccount,
    logoAlt: fa ? "اولین دیتا" : "First Data",
  };

  const modeTabs = (
    <div className="mb-2 flex gap-2" dir={dir}>
      <Button
        type="button"
        variant={mode === "email" ? "default" : "outline"}
        size="sm"
        className="flex-1 rounded-lg"
        onClick={() => {
          setMode("email");
          setError("");
        }}
      >
        {copy.tabEmail}
      </Button>
      <Button
        type="button"
        variant={mode === "otp" ? "default" : "outline"}
        size="sm"
        className="flex-1 rounded-lg"
        onClick={() => {
          setMode("otp");
          setOtpStep("input");
          setError("");
        }}
      >
        {copy.tabOtp}
      </Button>
    </div>
  );

  if (ac.ai) {
    const errorNode = error ? <InlineError message={error} dir={dir} fa={fa} /> : null;

    if (loginStep === "totp") {
      return (
        <TwoFactorAuthForm
          dir={dir}
          brand="firstdata"
          logoHref="/"
          logo={<FirstDataMark className="h-10 w-10 text-card-foreground" />}
          labels={{
            title: copy.labelTotp,
            description: copy.totpSubtitle,
            confirmLabel: copy.totpSubmit,
            confirmLoadingLabel: copy.loading,
            logoAlt: modernLabels.logoAlt,
          }}
          value={totpCode}
          onValueChange={(v) => setTotpCode(v.replace(/\D/g, "").slice(0, 6))}
          onSubmit={handleTotpVerify}
          showResend={false}
          loading={loading}
          error={errorNode}
          footerSlot={
            <button
              type="button"
              onClick={() => {
                setLoginStep("credentials");
                setPreAuthToken("");
                setTotpCode("");
              }}
              className="text-sm text-muted-foreground hover:text-card-foreground"
            >
              {copy.totpBack}
            </button>
          }
        />
      );
    }

    if (mode === "otp") {
      return (
        <LoginForm
          dir={dir}
          labels={modernLabels}
          showOAuth={false}
          logo={<FirstDataMark className="h-10 w-10 text-card-foreground" />}
          logoHref="/"
          registerHref="/auth/register"
          forgotPasswordHref="/auth/forgot-password"
          error={errorNode}
        >
          {modeTabs}
          {otpStep === "input" && (
            <div className="mb-2 flex gap-2" dir={dir}>
              <Button
                type="button"
                variant={otpChannel === "email" ? "default" : "outline"}
                size="sm"
                className="flex-1 rounded-lg"
                onClick={() => setOtpChannel("email")}
              >
                {copy.otpChannelEmail}
              </Button>
              <Button
                type="button"
                variant={otpChannel === "sms" ? "default" : "outline"}
                size="sm"
                className="flex-1 rounded-lg"
                onClick={() => setOtpChannel("sms")}
              >
                {copy.otpChannelSms}
              </Button>
            </div>
          )}
          {otpStep === "input" ? (
            <form onSubmit={sendOtp} className="flex flex-col gap-4" dir={dir}>
              {otpChannel === "email" ? (
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="login-otp-email" className="text-sm font-normal text-muted-foreground">
                    {copy.labelEmail}
                  </FieldLabel>
                  <Input
                    id="login-otp-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="h-9 shadow-xs dark:bg-background"
                    placeholder={copy.emailPlaceholder}
                  />
                </Field>
              ) : (
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="login-otp-phone" className="text-sm font-normal text-muted-foreground">
                    {copy.labelPhone}
                  </FieldLabel>
                  <Input
                    id="login-otp-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="h-9 shadow-xs dark:bg-background"
                    placeholder={copy.phonePlaceholder}
                    dir="ltr"
                  />
                </Field>
              )}
              <Button type="submit" size="lg" disabled={loading} className="h-10 rounded-lg">
                {loading ? copy.loading : copy.sendOtp}
              </Button>
            </form>
          ) : (
            <form onSubmit={verifyOtp} className="flex flex-col gap-4" dir={dir}>
              {devCode && (
                <p className="font-mono text-[10px] text-muted-foreground" dir="ltr">
                  dev: {devCode}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                {otpChannel === "email" ? copy.otpSentEmail : copy.otpSentSms}
              </p>
              <Field className="gap-1.5">
                <FieldLabel htmlFor="login-otp-code" className="text-sm font-normal text-muted-foreground">
                  {copy.labelOtp}
                </FieldLabel>
                <Input
                  id="login-otp-code"
                  type="text"
                  required
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength={6}
                  autoComplete="one-time-code"
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.replace(/\D/g, "") })}
                  className="h-9 tracking-[0.4em] shadow-xs dark:bg-background"
                  placeholder="000000"
                  dir="ltr"
                />
              </Field>
              <Button type="submit" size="lg" disabled={loading} className="h-10 rounded-lg">
                {loading ? copy.loading : copy.verifyOtp}
              </Button>
              <button
                type="button"
                onClick={() => setOtpStep("input")}
                className="text-sm text-muted-foreground hover:text-card-foreground"
              >
                {copy.changeContact}
              </button>
            </form>
          )}
        </LoginForm>
      );
    }

    return (
      <LoginForm
        dir={dir}
        labels={modernLabels}
        email={form.email}
        password={form.password}
        onEmailChange={(v) => setForm({ ...form, email: v })}
        onPasswordChange={(v) => setForm({ ...form, password: v })}
        remember={remember}
        onRememberChange={setRemember}
        onSubmit={handleEmailLogin}
        loading={loading}
        showOAuth={false}
        logo={<FirstDataMark className="h-10 w-10 text-card-foreground" />}
        logoHref="/"
        registerHref="/auth/register"
        forgotPasswordHref="/auth/forgot-password"
        error={errorNode}
        beforeFields={modeTabs}
      />
    );
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
            <label className={ac.label()}>{copy.labelTotp}</label>
            <input
              type="text"
              required
              inputMode="numeric"
              pattern="\d{6}"
              maxLength={6}
              autoComplete="one-time-code"
              value={totpCode}
              onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ""))}
              className={ac.input("tracking-[0.4em]")}
              placeholder="000000"
              dir="ltr"
            />
          </div>
          <button type="submit" disabled={loading} className={ac.btn()}>
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
              className={ac.tab(mode === "email")}
              onClick={() => {
                setMode("email");
                setError("");
              }}
            >
              {copy.tabEmail}
            </button>
            <button
              type="button"
              className={ac.tab(mode === "otp")}
              onClick={() => {
                setMode("otp");
                setOtpStep("input");
                setError("");
              }}
            >
              {copy.tabOtp}
            </button>
          </div>

          {mode === "email" ? (
            <form onSubmit={handleEmailLogin} className="space-y-5" dir={dir}>
              <div>
                <label className={ac.label()}>{copy.labelEmail}</label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={ac.input()}
                  placeholder={copy.labelEmail}
                />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between gap-2">
                  <label className={ac.label()}>{copy.labelPassword}</label>
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
                  className={ac.input()}
                  placeholder={copy.labelPassword}
                />
              </div>
              <button type="submit" disabled={loading} className={ac.btn()}>
                {loading ? copy.loading : copy.submit}
              </button>
            </form>
          ) : (
            <>
              {otpStep === "input" && (
                <div className="mb-4 flex gap-2" dir={dir}>
                  <button
                    type="button"
                    className={ac.tab(otpChannel === "email")}
                    onClick={() => setOtpChannel("email")}
                  >
                    {copy.otpChannelEmail}
                  </button>
                  <button
                    type="button"
                    className={ac.tab(otpChannel === "sms")}
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
                      <label className={ac.label()}>{copy.labelEmail}</label>
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={ac.input()}
                        placeholder={copy.labelEmail}
                      />
                    </div>
                  ) : (
                    <div>
                      <label className={ac.label()}>{copy.labelPhone}</label>
                      <input
                        type="tel"
                        required
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={ac.input()}
                        placeholder={copy.phonePlaceholder}
                        dir="ltr"
                      />
                    </div>
                  )}
                  <button type="submit" disabled={loading} className={ac.btn()}>
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
                    <label className={ac.label()}>{copy.labelOtp}</label>
                    <input
                      type="text"
                      required
                      inputMode="numeric"
                      pattern="\d{6}"
                      maxLength={6}
                      autoComplete="one-time-code"
                      value={form.code}
                      onChange={(e) => setForm({ ...form, code: e.target.value.replace(/\D/g, "") })}
                      className={ac.input("tracking-[0.4em]")}
                      placeholder="000000"
                      dir="ltr"
                    />
                  </div>
                  <button type="submit" disabled={loading} className={ac.btn()}>
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
