"use client";

import { APP_VERSION } from "@/config/changelog";
import { getDisplayYear } from "@/lib/date/displayYear";
import { formatDigits } from "@/lib/i18n/digits";
import type { Lang } from "@/i18n/dictionaries";

type Props = {
  lang: Lang;
  fa: boolean;
  dir: "ltr" | "rtl";
  brand: string;
  suffix: string;
  changelogAria: string;
  onVersionClick: () => void;
};

export default function FooterMetaBar({
  lang,
  fa,
  dir,
  brand,
  suffix,
  changelogAria,
  onVersionClick,
}: Props) {
  const year = getDisplayYear(lang);
  const versionLabel = fa ? `v${formatDigits(APP_VERSION, true)}` : `v${APP_VERSION}`;

  return (
    <div
      dir="ltr"
      className="overflow-hidden border border-paper/10 bg-paper/[0.015]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-paper/10 bg-paper/[0.02] px-3 py-1.5 sm:px-4">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full border border-paper/30" />
          <span className="h-1.5 w-1.5 rounded-full border border-paper/30" />
          <span className="h-1.5 w-1.5 rounded-full border border-paper/30" />
        </div>
        <span className={`text-[9px] uppercase tracking-[0.2em] text-paper/25 ${fa ? "font-fa" : "font-mono"}`}>
          fd://footer
        </span>
      </div>

      <div className="flex flex-col gap-3 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-2.5">
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-paper/45">
          <span className="text-term/50">▸</span>
          <span>root@fd:~$</span>
          <span className="animate-blink text-term/60">▮</span>
        </div>

        <div
          dir={dir}
          className={`flex flex-wrap items-center gap-x-2 gap-y-1 sm:justify-end ${fa ? "font-fa text-[11px]" : "font-mono text-[10px]"}`}
        >
          <span className="text-paper/65">{brand}</span>
          <span className="hidden text-paper/20 sm:inline" aria-hidden>
            |
          </span>
          <span className="text-paper/45">{year}</span>
          <button
            type="button"
            onClick={onVersionClick}
            aria-label={changelogAria}
            className="inline-flex items-center border border-term/30 bg-term/[0.07] px-1.5 py-0.5 text-[10px] text-term/85 transition-colors hover:border-term/50 hover:bg-term/15"
          >
            {versionLabel}
          </button>
          <span className="text-paper/35">{suffix}</span>
        </div>
      </div>
    </div>
  );
}
