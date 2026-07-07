"use client";

import { useEffect, useState } from "react";
import { scheduleUpdate } from "@/lib/react/schedule-update";
import ErrorTerminalLayout from "@/components/errors/ErrorTerminalLayout";

const COPY = {
  en: {
    eyebrow: "> kernel panic, root layout unreachable", title: "Something broke deep inside", subtitle:
      "The page shell crashed before we could recover. Your data is safe, reload or head home.", prompt: "root@fd:~$ systemctl restart first-data", retry: "Reload", home: "Homepage", contact: "Contact us", }, fa: {
    eyebrow: "> خطای بحرانی, layout از دسترس خارج شد", title: "یک خطای عمیق رخ داد", subtitle:
      "پوسته صفحه قبل از بازیابی از کار افتاد. داده‌های شما امن است, رفرش کنید یا به خانه برگردید.", prompt: "root@fd:~$ systemctl restart first-data", retry: "بارگذاری مجدد", home: "صفحه اصلی", contact: "تماس با ما", }, };

function readLang(): "fa" | "en" {
  if (typeof document === "undefined") return "en";
  const cookie = document.cookie
    .split("; ")
    .find((r) => r.startsWith("fd-lang="))
    ?.split("=")[1];
  if (cookie === "fa" || cookie === "en") return cookie;
  const stored = localStorage.getItem("fd-lang");
  if (stored === "fa" || stored === "en") return stored;
  return document.documentElement.lang === "fa" ? "fa" : "en";
}

export default function GlobalError({
  error, reset, }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [lang, setLang] = useState<"fa" | "en">("en");

  useEffect(() => {
    scheduleUpdate(() => setLang(readLang()));
    console.error(error);
  }, [error]);

  const c = COPY[lang];
  const fa = lang === "fa";
  const detail = [
    "✸ runtime exception", `  ${error.message || "unknown error"}`, error.digest ? `  digest: ${error.digest}` : "", ]
    .filter(Boolean)
    .join("\n");

  return (
    <html lang={lang} dir={fa ? "rtl" : "ltr"} data-theme="dark">
      <body className="bg-ink font-mono text-paper antialiased">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] animate-scanline bg-term/20"
        />
        <main>
          <ErrorTerminalLayout
            code="FATAL"
            eyebrow={c.eyebrow}
            title={c.title}
            subtitle={c.subtitle}
            prompt={c.prompt}
            tone="danger"
            detail={detail}
            fa={fa}
            dir={fa ? "rtl" : "ltr"}
            minHeight="min-h-screen"
            actions={[
              { label: c.retry, onClick: reset, primary: true }, { label: c.home, href: "/", primary: false }, { label: c.contact, href: "/contactus", primary: false }, ]}
          />
        </main>
      </body>
    </html>
  );
}
