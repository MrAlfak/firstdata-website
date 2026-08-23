"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import { useAuthClasses } from "@/components/auth/useAuthClasses";
import InlineError from "@/components/errors/InlineError";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";
import RegisterForm from "@/components/shadcn-space/blocks/register-01/register";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useT } from "@/i18n/LangProvider";
import type { OtpChannel } from "@/lib/auth/types";
import { fetchJson } from "@/lib/errors/fetch-json";
import { resolveAuthError } from "@/lib/errors/resolve-auth-error";
import { cn } from "@/lib/utils";

type Mode = "email" | "otp";
type OtpStep = "details" | "code";

export default function RegisterClient() {
  const { fa, dir, d } = useT();
  const ac = useAuthClasses();
  const [skin] = usePanelSkin();
  const modern = skin === "modern";
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

  const modeTabClass = (active: boolean) =>
    cn(
      "flex-1 rounded-lg border px-3 py-2 text-sm transition-colors",
      active
        ? "border-card-foreground/40 bg-card-foreground/5 text-card-foreground"
        : "border-border text-muted-foreground hover:border-card-foreground/25 hover:text-card-foreground",
      fa ? "font-iran" : "font-iran",
    );

  if (modern) {
    const onSubmit =
      mode === "email"
        ? handleEmailRegister
        : otpStep === "details"
          ? sendOtp
          : verifyOtp;

    const otpFields =
      mode === "otp" ? (
        <div className="flex flex-col gap-4">
          {otpStep === "details" && (
            <div className="flex gap-2" dir={dir}>
              <button
                type="button"
                className={modeTabClass(otpChannel === "email")}
                onClick={() => setOtpChannel("email")}
              >
                {copy.otpChannelEmail}
              </button>
              <button
                type="button"
                className={modeTabClass(otpChannel === "sms")}
                onClick={() => setOtpChannel("sms")}
              >
                {copy.otpChannelSms}
              </button>
            </div>
          )}

          {otpStep === "details" ? (
            <>
              <Field className="gap-1.5">
                <FieldLabel
                  htmlFor="name"
                  className="text-sm font-normal text-muted-foreground"
                >
                  {copy.labelName}
                </FieldLabel>
                <Input
                  id="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={copy.namePlaceholder}
                  className="h-9 shadow-sm dark:bg-background"
                />
              </Field>
              {otpChannel === "email" ? (
                <Field className="gap-1.5">
                  <FieldLabel
                    htmlFor="email"
                    className="text-sm font-normal text-muted-foreground"
                  >
                    {copy.labelEmail}
                  </FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={copy.emailPlaceholder}
                    className="h-9 shadow-sm dark:bg-background"
                  />
                </Field>
              ) : (
                <Field className="gap-1.5">
                  <FieldLabel
                    htmlFor="phone"
                    className="text-sm font-normal text-muted-foreground"
                  >
                    {copy.labelPhone}
                  </FieldLabel>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder={copy.phonePlaceholder}
                    dir="ltr"
                    className="h-9 shadow-sm dark:bg-background"
                  />
                </Field>
              )}
            </>
          ) : (
            <>
              {devCode ? (
                <p className="font-mono text-[10px] text-muted-foreground" dir="ltr">
                  dev: {devCode}
                </p>
              ) : null}
              <p
                dir={dir}
                className={`text-xs text-muted-foreground ${fa ? "font-iran" : "font-iran"}`}
              >
                {otpChannel === "email" ? copy.otpSentEmail : copy.otpSentSms}
              </p>
              <Field className="gap-1.5">
                <FieldLabel
                  htmlFor="otp"
                  className="text-sm font-normal text-muted-foreground"
                >
                  {copy.labelOtp}
                </FieldLabel>
                <Input
                  id="otp"
                  type="text"
                  required
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength={6}
                  autoComplete="one-time-code"
                  value={form.code}
                  onChange={(e) =>
                    setForm({ ...form, code: e.target.value.replace(/\D/g, "") })
                  }
                  placeholder="000000"
                  dir="ltr"
                  className="h-9 tracking-[0.4em] shadow-sm dark:bg-background"
                />
              </Field>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOtpStep("details")}
                className={`h-auto justify-start px-0 text-xs text-muted-foreground hover:text-card-foreground ${fa ? "font-iran" : "font-iran"}`}
              >
                {copy.changeContact}
              </Button>
            </>
          )}
        </div>
      ) : undefined;

    return (
      <RegisterForm
        brand="firstdata"
        logoHref="/"
        loginHref="/auth/login"
        showSocial={false}
        showConfirm
        dir={dir}
        name={form.name}
        email={form.email}
        password={form.password}
        confirm={form.confirm}
        onNameChange={(v) => setForm({ ...form, name: v })}
        onEmailChange={(v) => setForm({ ...form, email: v })}
        onPasswordChange={(v) => setForm({ ...form, password: v })}
        onConfirmChange={(v) => setForm({ ...form, confirm: v })}
        onSubmit={onSubmit}
        loading={loading}
        labels={{
          title: copy.title,
          description: copy.subtitle,
          name: copy.labelName,
          email: copy.labelEmail,
          password: copy.labelPassword,
          confirm: copy.labelConfirm,
          namePlaceholder: copy.namePlaceholder,
          emailPlaceholder: copy.emailPlaceholder,
          passwordPlaceholder: copy.passwordPlaceholder,
          confirmPlaceholder: copy.confirmPlaceholder,
          submit:
            mode === "email"
              ? copy.submit
              : otpStep === "details"
                ? copy.sendOtp
                : copy.verifyOtp,
          loading: copy.loading,
          alreadyHaveAccount: copy.alreadyHaveAccount,
          signIn: copy.signIn,
          logoAlt: copy.logoAlt,
        }}
        topSlot={
          <div className="flex gap-2" dir={dir}>
            <button
              type="button"
              className={modeTabClass(mode === "email")}
              onClick={() => {
                setMode("email");
                setError("");
              }}
            >
              {copy.tabEmail}
            </button>
            <button
              type="button"
              className={modeTabClass(mode === "otp")}
              onClick={() => {
                setMode("otp");
                setOtpStep("details");
                setError("");
              }}
            >
              {copy.tabOtp}
            </button>
          </div>
        }
        errorSlot={error ? <InlineError message={error} dir={dir} fa={fa} /> : null}
        fieldsSlot={otpFields}
      />
    );
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
            setOtpStep("details");
            setError("");
          }}
        >
          {copy.tabOtp}
        </button>
      </div>

      {error && <InlineError message={error} dir={dir} fa={fa} />}

      {mode === "email" ? (
        <form onSubmit={handleEmailRegister} className="space-y-5" dir={dir}>
          <div>
            <label className={ac.label()}>{copy.labelName}</label>
            <input
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={ac.input()}
              placeholder={copy.labelName}
            />
          </div>
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
            <label className={ac.label()}>{copy.labelPassword}</label>
            <input
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={ac.input()}
              placeholder={copy.labelPassword}
            />
          </div>
          <div>
            <label className={ac.label()}>{copy.labelConfirm}</label>
            <input
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              className={ac.input()}
              placeholder={copy.labelConfirm}
            />
          </div>
          <button type="submit" disabled={loading} className={ac.btn()}>
            {loading ? copy.loading : copy.submit}
          </button>
        </form>
      ) : (
        <>
          {otpStep === "details" && (
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

          {otpStep === "details" ? (
            <form onSubmit={sendOtp} className="space-y-5" dir={dir}>
              <div>
                <label className={ac.label()}>{copy.labelName}</label>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={ac.input()}
                  placeholder={copy.labelName}
                />
              </div>
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
