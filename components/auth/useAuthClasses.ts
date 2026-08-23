"use client";

import { useT } from "@/i18n/LangProvider";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";
import {
  authBtnClass,
  authInputClass,
  authLabelClass,
  authTabClass,
} from "@/components/auth/AuthShell";

/** Skin-aware auth form class helpers. */
export function useAuthClasses() {
  const { fa } = useT();
  const [skin] = usePanelSkin();
  const ai = skin === "modern";
  return {
    fa,
    ai,
    input: (extra = "") => `${authInputClass(fa, ai)} ${extra}`.trim(),
    label: () => authLabelClass(fa, ai),
    tab: (active: boolean) => authTabClass(active, fa, ai),
    btn: () => authBtnClass(fa, ai),
  };
}
