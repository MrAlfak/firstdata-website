"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthShell, {
  authBtnClass,
  authInputClass,
  authLabelClass,
  authTabClass,
} from "@/components/auth/AuthShell";
import InlineError from "@/components/errors/InlineError";
import { useT } from "@/i18n/LangProvider";
import { fetchJson } from "@/lib/errors/fetch-json";
import { resolveAuthError } from "@/lib/errors/resolve-auth-error";

type Channel = "email" | "sms";
type Step = "contact" | "sent";

export default function ForgotPasswordClient() {
  const { fa, dir, d } = useT();
  const copy = d.auth.forgotPassword;
  const router = useRouter();

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
              className={authTabClass(channel === "email", fa)}
              onClick={() => setChannel("email")}
            >
              {copy.tabEmail}
            </button>
            <button
              type="button"
              className={authTabClass(channel === "sms", fa)}
              onClick={() => setChannel("sms")}
            >
              {copy.tabSms}
            </button>
          </div>
          <form onSubmit={handleSend} className="space-y-5" dir={dir}>
            {channel === "email" ? (
              <div>
                <label className={authLabelClass(fa)}>{copy.labelEmail}</label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={authInputClass(fa)}
                />
              </div>
            ) : (
              <div>
                <label className={authLabelClass(fa)}>{copy.labelPhone}</label>
                <input
                  type="tel"
                  required
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={authInputClass(fa)}
                  placeholder={copy.phonePlaceholder}
                  dir="ltr"
                />
              </div>
            )}
            <button type="submit" disabled={loading} className={authBtnClass(fa)}>
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
          <button type="button" onClick={goToReset} className={authBtnClass(fa)}>
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
