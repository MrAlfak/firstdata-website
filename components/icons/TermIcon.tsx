"use client";

import PixelIcon from "@/components/icons/PixelIcon";
import StreamlineCoreIcon from "@/components/icons/StreamlineCoreIcon";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";
import { resolveCoreTerm } from "@/lib/icons/streamline-core-map";
import { resolvePixelTerm } from "@/lib/icons/streamline-pixel-map";

export type TermIconName =
  | "web-design"
  | "ecommerce"
  | "android"
  | "ios"
  | "ui-ux"
  | "seo"
  | "consulting"
  | "support"
  | "web"
  | "mobile"
  | "windows"
  | "ai"
  | "platforms"
  | "team"
  | "calendar"
  | "key"
  | "message"
  | "default";

const ICONS: Record<string, TermIconName> = {
  "web-design": "web-design",
  ecommerce: "ecommerce",
  android: "android",
  ios: "ios",
  "ui-ux": "ui-ux",
  seo: "seo",
  consulting: "consulting",
  support: "support",
  web: "web",
  mobile: "mobile",
  windows: "windows",
  ai: "ai",
  platforms: "platforms",
  team: "team",
  calendar: "calendar",
  key: "key",
  message: "message",
};

export function resolveTermIconName(slug: string): TermIconName {
  return ICONS[slug] ?? "default";
}

type TermIconProps = {
  name: string;
  size?: "sm" | "md";
  plain?: boolean;
  className?: string;
  /** Kept for call-site compatibility; modern skin uses Streamline Core SVGs */
  variant?: "outline" | "solid" | "filled" | "duotone";
};

export default function TermIcon({
  name,
  size = "md",
  plain = false,
  className = "",
}: TermIconProps) {
  const [skin] = usePanelSkin();
  const modern = skin === "modern";
  const box = size === "md" ? "h-11 w-11" : "h-9 w-9";
  const px = plain ? (size === "md" ? 28 : 24) : size === "md" ? 20 : 16;

  const glyph = modern ? (
    <StreamlineCoreIcon name={resolveCoreTerm(name)} size={px} className="text-current" />
  ) : (
    <PixelIcon name={resolvePixelTerm(name)} size={px} className="text-current" />
  );

  if (plain) {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center text-paper/40 transition-colors duration-200 group-hover:text-term/85 ${className}`}
      >
        {glyph}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center border border-paper/20 bg-paper/[0.04] text-paper/45 transition-colors duration-200 group-hover:border-paper/35 group-hover:bg-paper/[0.06] group-hover:text-term/85 ${box} ${className}`}
    >
      {glyph}
    </span>
  );
}
