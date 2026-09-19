"use client";

import { useEffect, useId, useRef, useState } from "react";
import { APP_VERSION } from "@/config/changelog";
import ChangelogList from "@/components/changelog/ChangelogList";
import TermModalChrome from "@/components/ui/TermModalChrome";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import { formatDigits } from "@/lib/i18n/digits";
import type { Lang } from "@/i18n/dictionaries";
import { searchDictionaries } from "@/i18n/search";

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
  const titleId = useId();
  const [maximized, setMaximized] = useState(false);

  useFocusTrap(open, panelRef);

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

  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (!open) setMaximized(false);
  }

  if (!open) return null;

  const chrome = searchDictionaries[lang];

  return (
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center p-3 sm:items-center sm:p-4"
      role="presentation"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink/85 backdrop-blur-sm" aria-hidden />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        dir={dir}
        className={`relative z-10 flex w-full flex-col overflow-hidden border border-term/25 bg-ink shadow-[0_24px_80px_rgba(0,0,0,0.65)] transition-[max-width,max-height] duration-200 ${
          maximized
            ? "max-h-[min(96vh,960px)] max-w-4xl"
            : "max-h-[min(85vh,720px)] max-w-2xl"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <TermModalChrome
          title={`${title} · v${formatDigits(APP_VERSION, fa)}`}
          titleId={titleId}
          prompt="fd@changelog:~$"
          fa={fa}
          onClose={onClose}
          onMinimize={onClose}
          onMaximize={() => setMaximized((v) => !v)}
          maximized={maximized}
          closeLabel={closeLabel}
          minimizeLabel={chrome.minimize}
          maximizeLabel={chrome.maximize}
          restoreLabel={chrome.restore}
        />

        <div className="overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
          <ChangelogList lang={lang} fa={fa} compact />
        </div>
      </div>
    </div>
  );
}
