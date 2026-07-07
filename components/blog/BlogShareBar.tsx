"use client";

import { useCallback, useState } from "react";
import { useT } from "@/i18n/LangProvider";

type Props = {
  url: string;
  title: string;
};

export default function BlogShareBar({ url, title }: Props) {
  const { fa, dir, d } = useT();
  const ui = d.blogUi;
  const [copied, setCopied] = useState(false);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  }, [url]);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const linkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const telegram = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;

  return (
    <div
      dir={dir}
      className={`flex flex-wrap items-center gap-3 border-t border-paper/10 pt-6 ${fa ? "font-fa" : ""}`}
    >
      <span className={`text-[10px] uppercase tracking-widest text-paper/35 ${fa ? "font-fa" : "font-mono"}`}>
        {ui.shareLabel}
      </span>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => void copyLink()}
          className={`border border-paper/20 px-3 py-1.5 text-xs text-paper/55 transition-colors hover:border-term/40 hover:text-term ${fa ? "font-fa" : "font-mono"}`}
        >
          {copied ? ui.copiedLink : ui.copyLink}
        </button>
        <a
          href={linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className={`border border-paper/20 px-3 py-1.5 text-xs text-paper/55 transition-colors hover:border-term/40 hover:text-term ${fa ? "font-fa" : "font-mono"}`}
        >
          LinkedIn
        </a>
        <a
          href={telegram}
          target="_blank"
          rel="noopener noreferrer"
          className={`border border-paper/20 px-3 py-1.5 text-xs text-paper/55 transition-colors hover:border-term/40 hover:text-term ${fa ? "font-fa" : "font-mono"}`}
        >
          Telegram
        </a>
      </div>
    </div>
  );
}
