"use client";

import { useT } from "@/i18n/LangProvider";
import ErrorPageShell, { type ErrorAction } from "./ErrorPageShell";

type PageKey = keyof (typeof import("@/i18n/dictionaries").dictionaries)["en"]["errors"]["pages"];

type Props = {
  pageKey: PageKey;
  code: string;
  tone?: "default" | "danger" | "warn";
  detail?: string;
  onRetry?: () => void;
  extraActions?: ErrorAction[];
  loginNext?: string;
};

export default function SiteErrorPage({
  pageKey,
  code,
  tone = "default",
  detail,
  onRetry,
  extraActions = [],
  loginNext,
}: Props) {
  const { d } = useT();
  const p = d.errors.pages[pageKey];

  const actions: ErrorAction[] = [];

  if (p.ctaRetry && onRetry) {
    actions.push({ label: p.ctaRetry, onClick: onRetry, primary: true });
  } else if (p.ctaRetry && pageKey === "maintenance") {
    actions.push({ label: p.ctaRetry, onClick: () => window.location.reload(), primary: true });
  } else if (p.ctaRetry && pageKey === "offline") {
    actions.push({ label: p.ctaRetry, onClick: () => window.location.reload(), primary: true });
  }

  if (p.ctaLogin) {
    const loginHref = loginNext
      ? `/auth/login?next=${encodeURIComponent(loginNext)}`
      : "/auth/login";
    actions.push({
      label: p.ctaLogin,
      href: loginHref,
      primary: actions.length === 0,
    });
  }

  actions.push({
    label: p.ctaHome,
    href: "/",
    primary: actions.length === 0,
  });

  actions.push({
    label: p.ctaContact,
    href: "/contactus",
    primary: false,
  });

  actions.push(...extraActions);

  return (
    <ErrorPageShell
      code={code}
      eyebrow={p.eyebrow}
      title={p.title}
      subtitle={p.subtitle}
      art={p.art}
      prompt={p.prompt}
      actions={actions}
      tone={tone}
      detail={detail}
    />
  );
}
