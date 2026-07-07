"use client";

import { useEffect, useRef } from "react";
import { APP_VERSION } from "@/config/changelog";
import ChangelogList from "@/components/changelog/ChangelogList";
import { formatDigits } from "@/lib/i18n/digits";
import type { Lang } from "@/i18n/dictionaries";

type Props = {
  open: boolean;
  onClose: () => void;
  lang: Lang;
  fa: boolean;
  dir: "ltr" | "rtl";
  title: string;
  closeLabel: string;
};

export default function ChangelogModal({
  open,
  onClose,
  lang,
  fa,
  dir,
  title,
  closeLabel,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center p-4 sm:items-center"
      role="presentation"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" aria-hidden />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="changelog-title"
        dir={dir}
        className="relative z-10 flex max-h-[min(85vh,720px)] w-full max-w-2xl flex-col border border-paper/20 bg-ink shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-paper/15 px-4 py-3 sm:px-5">
          <div>
            <p className={`text-[10px] text-paper/35 ${fa ? "font-fa" : "font-mono uppercase"}`}>
              v{formatDigits(APP_VERSION, fa)}
            </p>
            <h2
              id="changelog-title"
              className={`text-sm text-paper sm:text-base ${fa ? "font-fa" : "font-pixel tracking-wide"}`}
            >
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`shrink-0 border border-paper/25 px-3 py-1.5 text-[10px] uppercase tracking-wider text-paper/60 transition-colors hover:border-paper/40 hover:text-paper ${fa ? "font-fa" : "font-mono"}`}
          >
            {closeLabel}
          </button>
        </div>

        <div className="overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
          <ChangelogList lang={lang} fa={fa} compact />
        </div>
      </div>
    </div>
  );
}
