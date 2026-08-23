"use client";

import { PanelLoading } from "./PanelLayoutClient";
import { usePanelSkin } from "./PanelSkinToggle";
import { useT } from "@/i18n/LangProvider";
import { LiquidWaveSpinner } from "@/components/shadcn-space/spinner/spinner-10";

/** Shows LiquidWaveSpinner in AI mode; terminal keeps text loading. */
export function PanelGateLoading({
  label,
  variant = "list",
}: {
  label: string;
  variant?: "list" | "dashboard" | "detail";
}) {
  const [skin] = usePanelSkin();
  const { d } = useT();

  if (skin === "modern") {
    return (
      <div
        className={`flex items-center justify-center py-10 ${
          variant === "dashboard" ? "min-h-[16rem]" : "min-h-[12rem]"
        }`}
        aria-busy="true"
        aria-live="polite"
        role="status"
      >
        <span className="sr-only">{label}</span>
        <LiquidWaveSpinner
          size={variant === "detail" ? "md" : "sm"}
          words={d.liquidSpinner.words}
          className="max-w-[14rem] bg-transparent"
        />
      </div>
    );
  }

  return <PanelLoading label={label} />;
}
