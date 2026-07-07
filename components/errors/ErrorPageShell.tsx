"use client";

import { useT } from "@/i18n/LangProvider";
import ErrorTerminalLayout, { type ErrorAction } from "./ErrorTerminalLayout";

type Props = {
  code: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  art?: string;
  prompt: string;
  actions: ErrorAction[];
  tone?: "default" | "danger" | "warn";
  detail?: string;
  minHeight?: string;
};

export default function ErrorPageShell(props: Props) {
  const { fa, dir } = useT();
  return <ErrorTerminalLayout {...props} fa={fa} dir={dir} />;
}

export type { ErrorAction };
