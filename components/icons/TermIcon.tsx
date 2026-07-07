import type { SVGProps } from "react";

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

type IconPathProps = SVGProps<SVGSVGElement>;

function IconPaths({ name, ...props }: { name: TermIconName } & IconPathProps) {
  switch (name) {
    case "web-design":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.5 12h17M12 3.5c2.5 2.8 3.8 6.2 3.8 8.5S14.5 18.2 12 21M12 3.5C9.5 6.3 8.2 9.7 8.2 12s1.3 5.7 3.8 8.5" />
        </svg>
      );
    case "ecommerce":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <path d="M4 5h2l1.5 9h9L18 8H8" />
          <circle cx="10" cy="18.5" r="1.5" />
          <circle cx="16" cy="18.5" r="1.5" />
        </svg>
      );
    case "android":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <rect x="7" y="3.5" width="10" height="17" rx="2" />
          <path d="M10 6.5h4M9.5 19.5h5" />
          <path d="M9 3.5V2M15 3.5V2" />
        </svg>
      );
    case "ios":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <rect x="7.5" y="2.5" width="9" height="19" rx="2.5" />
          <path d="M11 5h2M12 18.5v.5" />
        </svg>
      );
    case "ui-ux":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <rect x="4" y="4" width="16" height="12" rx="1" />
          <path d="M8 20h8M12 16v4" />
          <path d="M8 9h8M8 12h5" />
        </svg>
      );
    case "seo":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <circle cx="10.5" cy="10.5" r="5.5" />
          <path d="M15 15l5 5M10.5 8v5M8 10.5h5" />
        </svg>
      );
    case "consulting":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <path d="M5 5h14v10H9l-4 4V5z" />
          <path d="M8 9h8M8 12h5" />
        </svg>
      );
    case "support":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <path d="M12 3v3M5.5 8.5l2 2M18.5 8.5l-2 2" />
          <path d="M6 14a6 6 0 0 1 12 0v2H6v-2z" />
          <path d="M9 19h6" />
        </svg>
      );
    case "web":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <rect x="3" y="5" width="18" height="14" rx="1" />
          <path d="M3 9h18M7 5V3M17 5V3" />
          <path d="M8 13h8M8 16h5" />
        </svg>
      );
    case "mobile":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <rect x="8" y="3" width="8" height="18" rx="1.5" />
          <path d="M11 18.5h2" />
        </svg>
      );
    case "windows":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <rect x="3" y="4" width="18" height="13" rx="1" />
          <path d="M8 20h8M12 17v3" />
          <path d="M6 8h4v4H6zM14 8h4v4h-4z" />
        </svg>
      );
    case "ai":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <rect x="5" y="5" width="14" height="14" rx="1" />
          <path d="M9 9h2v2H9zM13 9h2v2h-2zM9 13h6" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        </svg>
      );
    case "platforms":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" />
        </svg>
      );
    case "team":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <circle cx="9" cy="8" r="3" />
          <circle cx="16.5" cy="9" r="2.5" />
          <path d="M4 19c0-3 2.5-5 5-5s5 2 5 5M13.5 19c0-2.2 1.8-4 3.5-4" />
        </svg>
      );
    case "calendar":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <rect x="4" y="5" width="16" height="15" rx="1" />
          <path d="M4 9h16M8 3v4M16 3v4M8 13h2v2H8z" />
        </svg>
      );
    case "key":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <circle cx="8.5" cy="12" r="4.5" />
          <path d="M12.5 12H20v3h-2v2" />
        </svg>
      );
    case "message":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <path d="M5 6h14v9H9l-4 3V6z" />
          <path d="M8 10h8" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
          <path d="M12 4l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" />
        </svg>
      );
  }
}

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
};

export default function TermIcon({ name, size = "md", plain = false, className = "" }: TermIconProps) {
  const resolved = resolveTermIconName(name);
  const box = size === "md" ? "h-11 w-11" : "h-9 w-9";
  const glyph = plain
    ? size === "md"
      ? "h-7 w-7"
      : "h-6 w-6"
    : size === "md"
      ? "h-5 w-5"
      : "h-4 w-4";

  if (plain) {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center text-paper/40 transition-colors duration-200 group-hover:text-term/85 ${className}`}
      >
        <IconPaths
          name={resolved}
          className={glyph}
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center border border-paper/20 bg-paper/[0.04] text-paper/45 transition-colors duration-200 group-hover:border-paper/35 group-hover:bg-paper/[0.06] group-hover:text-term/85 ${box} ${className}`}
    >
      <IconPaths
        name={resolved}
        className={glyph}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </span>
  );
}
