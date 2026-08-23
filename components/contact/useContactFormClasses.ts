"use client";

import { useT } from "@/i18n/LangProvider";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";
import {
  authBtnClass,
  authInputClass,
  authLabelClass,
} from "@/components/auth/AuthShell";

/** Skin-aware classes for contact / lead forms. */
export function useContactFormClasses() {
  const { fa } = useT();
  const [skin] = usePanelSkin();
  const ai = skin === "modern";
  const face = ai || fa ? "font-iran" : "font-mono";

  return {
    fa,
    ai,
    face,
    input: (extra = "") => `${authInputClass(fa, ai)} ${extra}`.trim(),
    label: () => authLabelClass(fa, ai),
    btn: () => authBtnClass(fa, ai),
    section: () =>
      ai
        ? `mb-1 text-sm text-paper/55 ${face}`
        : `text-sm text-paper/70 ${fa ? "font-fa" : "font-mono uppercase tracking-wider"}`,
    fieldset: () =>
      ai
        ? "space-y-4 rounded-2xl border border-paper/10 bg-paper/[0.02] p-5 sm:p-6"
        : "space-y-4 border border-paper/10 bg-paper/[0.015] p-5",
    chip: (active: boolean) =>
      ai
        ? `flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
            active
              ? "border-paper/35 bg-paper/10 text-paper"
              : "border-paper/10 text-paper/55 hover:border-paper/25 hover:text-paper/80"
          } ${face}`
        : `flex cursor-pointer items-center gap-3 border px-3 py-2.5 text-sm transition-colors ${
            active
              ? "border-term/40 bg-term/5 text-paper"
              : "border-paper/15 text-paper/60 hover:border-paper/30"
          } ${fa ? "font-fa" : ""}`,
    successBox: () =>
      ai
        ? "rounded-2xl border border-term/25 bg-term/5 p-8"
        : "border border-term/30 bg-term/5 p-8",
    successText: () => `text-sm text-term ${face}`,
    secondaryBtn: () =>
      ai
        ? `mt-6 rounded-xl border border-paper/20 px-4 py-2.5 text-sm text-paper/70 transition-colors hover:border-paper/40 hover:text-paper ${face}`
        : `mt-6 border border-paper/30 px-4 py-2 text-[11px] uppercase tracking-wider text-paper/70 transition-colors duration-200 hover:border-paper hover:text-paper ${fa ? "font-fa" : ""}`,
    uploadBtn: () =>
      ai
        ? `rounded-xl border border-paper/20 px-4 py-2.5 text-sm text-paper/75 transition-colors hover:border-paper/40 disabled:opacity-40 ${face}`
        : `border border-paper/30 px-4 py-2 text-xs text-paper/75 transition-colors hover:border-paper disabled:opacity-40 ${fa ? "font-fa" : ""}`,
    cleanSuccess: (raw: string) => raw.replace(/^>\s*/, "").trim(),
  };
}
