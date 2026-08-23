"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import { useAuthClasses } from "@/components/auth/useAuthClasses";
import InlineError from "@/components/errors/InlineError";
import ForgotPassword from "@/components/shadcn-space/blocks/forgot-password-01/forgot-password";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";
import { useT } from "@/i18n/LangProvider";
import { fetchJson } from "@/lib/errors/fetch-json";
import { resolveAuthError } from "@/lib/errors/resolve-auth-error";

type Channel = "email" | "sms";
type Step = "contact" | "sent";

export default function ForgotPasswordClient() {
  const { fa, dir, d } = useT();
  const ac = useAuthClasses();
  const [skin] = usePanelSkin();
  const copy = d.auth.forgotPassword;
  const router = useRouter();
  const modern = skin === "modern";

  const [channel, setChannel] = useState<Channel>("email");
  const [step, setStep] = useState<Step>("contact");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [devCode, setDevCode] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function setAuthError(result: { message: string; code?: string }) {
    setError(resolveAuthError(d.errors.auth, result, copy.errorGeneric));
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setDevCode("");
    const body =
      channel === "email"
        ? { channel: "email" as const, email }
        : { channel: "sms" as const, phone };
    const result = await fetchJson<{ devCode?: string }>(
      "/api/auth/password/forgot",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
      d.errors.network,
    );
    if (!result.ok) {
      setAuthError(result);
      setLoading(false);
      return;
    }
    if (result.data.devCode) setDevCode(String(result.data.devCode));
    setStep("sent");
    setLoading(false);
  }

  function goToReset() {
    const params = new URLSearchParams({ channel });
    if (channel === "email") params.set("email", email);
    else params.set("phone", phone);
    router.push(`/auth/reset-password?${params.toString()}`);
  }

  if (modern) {
    const channelTabs = (
      <div className="flex gap-2" dir={dir}>
        <Button
          type="button"
          variant={channel === "email" ? "default" : "outline"}
          className="flex-1 rounded-xl"
          onClick={() => setChannel("email")}
        >
          {copy.tabEmail}
        </Button>
        <Button
          type="button"
          variant={channel === "sms" ? "default" : "outline"}
          className="flex-1 rounded-xl"
          onClick={() => setChannel("sms")}
        >
          {copy.tabSms}
        </Button>
      </div>
    );

    const contactFields =
      channel === "email" ? undefined : (
        <Field className="gap-1.5">
          <FieldLabel
            htmlFor="forgot-phone"
            className="text-sm font-normal text-muted-foreground"
          >
            {copy.labelPhone}
          </FieldLabel>
          <Input
            id="forgot-phone"
            type="tel"
            required
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={copy.phonePlaceholder}
            dir="ltr"
            className="h-9 shadow-xs dark:bg-background"
          />
        </Field>
      );

    const sentBody = (
      <div className="flex flex-col gap-4" dir={dir}>
        {devCode ? (
          <p className="font-mono text-[10px] text-muted-foreground" dir="ltr">
            dev: {devCode}
          </p>
        ) : null}
        <p className="text-sm text-muted-foreground">
          {channel === "email" ? copy.sentEmail : copy.sentSms}
        </p>
        <Button
          type="button"
          size="lg"
          className="h-10 cursor-pointer rounded-xl hover:bg-primary/80"
          onClick={goToReset}
        >
          {copy.continueReset}
        </Button>
        <Button
          type="button"
          size="lg"
          variant="ghost"
          className="cursor-pointer rounded-xl"
          onClick={() => setStep("contact")}
        >
          {copy.changeContact}
        </Button>
        <Button
          type="button"
          size="lg"
          variant="ghost"
          className="cursor-pointer rounded-xl"
          asChild
        >
          <Link href="/auth/login">{copy.toLogin}</Link>
        </Button>
      </div>
    );

    return (
      <ForgotPassword
        dir={dir}
        title={copy.title}
        description={copy.subtitle}
        emailLabel={copy.labelEmail}
        emailPlaceholder={d.auth.register.emailPlaceholder}
        submitLabel={loading ? copy.loading : copy.submit}
        backLabel={copy.toLogin}
        backHref="/auth/login"
        logoHref="/"
        logoLightSrc="/icon.svg"
        logoDarkSrc="/icon.svg"
        logoAlt={d.auth.register.logoAlt}
        email={email}
        emailId="forgot-email"
        onEmailChange={setEmail}
        onSubmit={handleSend}
        loading={loading}
        error={
          error ? <InlineError message={error} dir={dir} fa={fa} /> : null
        }
        beforeFields={step === "contact" ? channelTabs : undefined}
        fields={step === "contact" ? contactFields : undefined}
        formBody={step === "sent" ? sentBody : undefined}
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
      {error && <InlineError message={error} dir={dir} fa={fa} />}

      {step === "contact" ? (
        <>
          <div className="mb-6 flex gap-2" dir={dir}>
            <button
              type="button"
              className={ac.tab(channel === "email")}
              onClick={() => setChannel("email")}
            >
              {copy.tabEmail}
            </button>
            <button
              type="button"
              className={ac.tab(channel === "sms")}
              onClick={() => setChannel("sms")}
            >
              {copy.tabSms}
            </button>
          </div>
          <form onSubmit={handleSend} className="space-y-5" dir={dir}>
            {channel === "email" ? (
              <div>
                <label className={ac.label()}>{copy.labelEmail}</label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={ac.input()}
                />
              </div>
            ) : (
              <div>
                <label className={ac.label()}>{copy.labelPhone}</label>
                <input
                  type="tel"
                  required
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={ac.input()}
                  placeholder={copy.phonePlaceholder}
                  dir="ltr"
                />
              </div>
            )}
            <button type="submit" disabled={loading} className={ac.btn()}>
              {loading ? copy.loading : copy.submit}
            </button>
          </form>
        </>
      ) : (
        <div className="space-y-5" dir={dir}>
          {devCode && (
            <p className="font-mono text-[10px] text-term/70" dir="ltr">
              dev: {devCode}
            </p>
          )}
          <p className={`text-xs text-paper/45 ${fa ? "font-fa" : "font-mono"}`}>
            {channel === "email" ? copy.sentEmail : copy.sentSms}
          </p>
          <button type="button" onClick={goToReset} className={ac.btn()}>
            {copy.continueReset}
          </button>
          <button
            type="button"
            onClick={() => setStep("contact")}
            className={`text-[10px] text-paper/40 hover:text-paper ${fa ? "font-fa" : "font-mono"}`}
          >
            {copy.changeContact}
          </button>
        </div>
      )}

      <p className={`mt-6 text-center text-[10px] text-paper/35 ${fa ? "font-fa" : "font-mono"}`}>
        <Link href="/auth/login" className="hover:text-paper/60">
          {copy.toLogin}
        </Link>
      </p>
    </AuthShell>
  );
}
