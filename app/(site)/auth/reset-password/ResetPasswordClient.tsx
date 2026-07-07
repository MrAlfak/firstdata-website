"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AuthShell, {
  authBtnClass,
  authInputClass,
  authLabelClass,
} from "@/components/auth/AuthShell";
import InlineError from "@/components/errors/InlineError";
import { useT } from "@/i18n/LangProvider";
import { fetchJson } from "@/lib/errors/fetch-json";
import { resolveAuthError } from "@/lib/errors/resolve-auth-error";

export default function ResetPasswordClient() {
  const { fa, dir, d } = useT();
  const copy = d.auth.resetPassword;
  const router = useRouter();
  const searchParams = useSearchParams();

  const channel = (searchParams.get("channel") === "sms" ? "sms" : "email") as "email" | "sms";
  const initialEmail = searchParams.get("email") ?? "";
  const initialPhone = searchParams.get("phone") ?? "";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  function setAuthError(result: { message: string; code?: string }) {
    setError(resolveAuthError(d.errors.auth, result, copy.errorGeneric));
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError(copy.passwordMismatch);
      return;
    }
    setLoading(true);
    setError("");
    const base =
      channel === "email"
        ? { channel: "email" as const, email, code, password, confirmPassword: confirm }
        : { channel: "sms" as const, phone, code, password, confirmPassword: confirm };
    const result = await fetchJson(
      "/api/auth/password/reset",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(base),
      },
      d.errors.network,
    );
    if (!result.ok) {
      setAuthError(result);
      setLoading(false);
      return;
    }
    router.push("/auth/login?reset=1");
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
      {error && <InlineError message={error} dir={dir} fa={fa} />}

      <form onSubmit={handleReset} className="space-y-5" dir={dir}>
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
        <div>
          <label className={authLabelClass(fa)}>{copy.labelCode}</label>
          <input
            type="text"
            required
            inputMode="numeric"
            pattern="\d{6}"
            maxLength={6}
            autoComplete="one-time-code"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            className={`${authInputClass(fa)} tracking-[0.4em]`}
            placeholder="000000"
            dir="ltr"
          />
        </div>
        <div>
          <label className={authLabelClass(fa)}>{copy.labelPassword}</label>
          <input
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={authInputClass(fa)}
          />
        </div>
        <div>
          <label className={authLabelClass(fa)}>{copy.labelConfirm}</label>
          <input
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={authInputClass(fa)}
          />
        </div>
        <button type="submit" disabled={loading} className={authBtnClass(fa)}>
          {loading ? copy.loading : copy.submit}
        </button>
      </form>

      <p className={`mt-4 text-center text-[10px] text-paper/35 ${fa ? "font-fa" : "font-mono"}`}>
        <Link href="/auth/forgot-password" className="hover:text-paper/60">
          {copy.resendCode}
        </Link>
      </p>
    </AuthShell>
  );
}
