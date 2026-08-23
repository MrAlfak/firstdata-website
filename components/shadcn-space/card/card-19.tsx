"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  CreditCard,
  Headphones,
  LayoutTemplate,
  LifeBuoy,
  Link2,
  MessageCircle,
  MousePointerClick,
  Package,
  Palette,
  Play,
  Search,
  Shield,
  ShoppingCart,
  Smartphone,
  Target,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ModernIconButton } from "@/components/ui/modern-icon-button";
import { Card, CardContent } from "@/components/ui/card";
import StreamlineCoreIcon from "@/components/icons/StreamlineCoreIcon";
import { resolveCoreTerm } from "@/lib/icons/streamline-core-map";

interface VisualContainerProps {
  children: React.ReactNode;
  className?: string;
}

interface TeamCardProps {
  visual: React.ReactNode;
  title: string;
  description: string;
  url: string;
  ctaLabel?: string;
  className?: string;
}

type MotifKind =
  | "phone"
  | "browser"
  | "store"
  | "headset"
  | "chart"
  | "palette"
  | "chat"
  | "shield";

type ServiceVisualConfig = {
  motif: MotifKind;
  accents: [LucideIcon, LucideIcon];
};

const SERVICE_VISUALS: Record<string, ServiceVisualConfig> = {
  ios: {
    motif: "phone",
    accents: [Shield, LayoutTemplate],
  },
  android: {
    motif: "phone",
    accents: [Play, Smartphone],
  },
  ecommerce: {
    motif: "store",
    accents: [ShoppingCart, CreditCard],
  },
  "web-design": {
    motif: "browser",
    accents: [LayoutTemplate, Package],
  },
  support: {
    motif: "headset",
    accents: [Headphones, LifeBuoy],
  },
  consulting: {
    motif: "chat",
    accents: [MessageCircle, Target],
  },
  seo: {
    motif: "chart",
    accents: [Search, TrendingUp],
  },
  "ui-ux": {
    motif: "palette",
    accents: [Palette, MousePointerClick],
  },
};

const DEFAULT_VISUAL: ServiceVisualConfig = {
  motif: "browser",
  accents: [LayoutTemplate, Link2],
};

function visualForSlug(slug?: string): ServiceVisualConfig {
  if (slug && SERVICE_VISUALS[slug]) return SERVICE_VISUALS[slug];
  return DEFAULT_VISUAL;
}

/** Soft service silhouette — one clear shape, not floating wireframe clutter */
function ServiceMotif({ kind }: { kind: MotifKind }) {
  const stroke = "currentColor";
  const common = {
    fill: "none" as const,
    stroke,
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      viewBox="0 0 200 120"
      className="pointer-events-none absolute inset-0 h-full w-full text-foreground/[0.07]"
      aria-hidden
    >
      {kind === "phone" ? (
        <>
          <rect x="72" y="12" width="56" height="96" rx="10" {...common} />
          <line x1="90" y1="20" x2="110" y2="20" {...common} />
          <circle cx="100" cy="98" r="3" {...common} />
        </>
      ) : null}
      {kind === "browser" ? (
        <>
          <rect x="28" y="22" width="144" height="78" rx="8" {...common} />
          <line x1="28" y1="40" x2="172" y2="40" {...common} />
          <circle cx="42" cy="31" r="2.5" {...common} />
          <circle cx="52" cy="31" r="2.5" {...common} />
          <circle cx="62" cy="31" r="2.5" {...common} />
          <rect x="48" y="52" width="72" height="8" rx="2" {...common} />
          <rect x="48" y="68" width="104" height="5" rx="1.5" {...common} />
          <rect x="48" y="80" width="84" height="5" rx="1.5" {...common} />
        </>
      ) : null}
      {kind === "store" ? (
        <>
          <path d="M56 44h88l-8 52H64l-8-52z" {...common} />
          <path d="M72 44V36a28 28 0 0 1 56 0v8" {...common} />
          <line x1="80" y1="68" x2="120" y2="68" {...common} />
        </>
      ) : null}
      {kind === "headset" ? (
        <>
          <path d="M52 62a48 48 0 0 1 96 0" {...common} />
          <rect x="44" y="58" width="18" height="28" rx="6" {...common} />
          <rect x="138" y="58" width="18" height="28" rx="6" {...common} />
          <path d="M152 86v6a14 14 0 0 1-14 14h-18" {...common} />
        </>
      ) : null}
      {kind === "chart" ? (
        <>
          <path d="M36 88V32h128v56" {...common} />
          <path d="M52 72l28-22 24 14 36-30" {...common} />
          <circle cx="52" cy="72" r="3" {...common} />
          <circle cx="80" cy="50" r="3" {...common} />
          <circle cx="104" cy="64" r="3" {...common} />
          <circle cx="140" cy="34" r="3" {...common} />
        </>
      ) : null}
      {kind === "palette" ? (
        <>
          <path
            d="M100 20c-30 0-54 22-54 48 0 18 12 30 28 30h10c6 0 10 5 10 11 0 8-7 15-16 15 32 0 58-22 58-56 0-26-16-48-36-48z"
            {...common}
          />
          <circle cx="78" cy="48" r="4" {...common} />
          <circle cx="100" cy="38" r="4" {...common} />
          <circle cx="122" cy="48" r="4" {...common} />
          <circle cx="112" cy="68" r="4" {...common} />
        </>
      ) : null}
      {kind === "chat" ? (
        <>
          <rect x="34" y="28" width="84" height="48" rx="12" {...common} />
          <path d="M52 76l-10 14 22-10" {...common} />
          <rect x="82" y="48" width="84" height="44" rx="12" {...common} />
          <path d="M148 92l10 12-22-8" {...common} />
        </>
      ) : null}
      {kind === "shield" ? (
        <>
          <path
            d="M100 18l52 18v28c0 28-22 48-52 58-30-10-52-30-52-58V36l52-18z"
            {...common}
          />
          <path d="M84 62l12 12 22-24" {...common} />
        </>
      ) : null}
    </svg>
  );
}

/** Accent chip — small secondary cue, not a floating doodle swarm */
function AccentChip({
  Icon,
  className,
  delay,
  active,
}: {
  Icon: LucideIcon;
  className?: string;
  delay: number;
  active: boolean;
}) {
  return (
    <motion.div
      initial={false}
      animate={
        active
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0.85, y: 0, scale: 1 }
      }
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "absolute z-10 flex size-8 items-center justify-center rounded-xl border border-border/70 bg-background/90 text-foreground/70 shadow-sm backdrop-blur-sm sm:size-9",
        className,
      )}
    >
      <Icon className="size-3.5 sm:size-4" strokeWidth={1.75} aria-hidden />
    </motion.div>
  );
}

export function Integration({ slug }: { slug?: string } = {}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { margin: "80px 0px", amount: 0.2 });
  const reduced = useReducedMotion();
  const active = Boolean(inView && !reduced);
  const config = visualForSlug(slug);
  const [AccentA, AccentB] = config.accents;
  const iconName = resolveCoreTerm(slug ?? "web-design");

  return (
    <div ref={rootRef} className="relative h-full w-full">
      <ServiceMotif kind={config.motif} />

      {/* Brand accent bloom — gated to in-view / reduced-motion */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[42%] size-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-2xl sm:size-36"
        animate={
          active
            ? { opacity: [0.35, 0.55, 0.35], scale: [1, 1.06, 1] }
            : { opacity: 0.4, scale: 1 }
        }
        transition={
          active
            ? { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0 }
        }
      />

      {/* Focal service mark */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <motion.div
          initial={reduced ? false : { opacity: 0.72, scale: 0.94, y: 6 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex size-[4.25rem] items-center justify-center rounded-2xl border border-border/80 bg-background/95 shadow-[0_8px_28px_-12px_rgb(0_0_0_/_0.35)] ring-1 ring-primary/20 sm:size-[4.75rem]"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-primary/55 to-transparent"
          />
          <StreamlineCoreIcon
            name={iconName}
            size={36}
            className="text-foreground"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-1 start-1/2 h-1.5 w-8 -translate-x-1/2 rounded-full bg-primary/35 blur-[2px]"
          />
        </motion.div>
      </div>

      <AccentChip
        Icon={AccentA}
        delay={0.08}
        active={active}
        className="start-[10%] top-[18%] sm:start-[12%] sm:top-[16%]"
      />
      <AccentChip
        Icon={AccentB}
        delay={0.16}
        active={active}
        className="end-[10%] bottom-[16%] sm:end-[12%] sm:bottom-[14%]"
      />

      {/* Tiny tertiary cue — keeps composition balanced without clutter */}
      <motion.div
        aria-hidden
        className="absolute end-[18%] top-[22%] size-1.5 rounded-full bg-primary/45 sm:top-[20%]"
        animate={active ? { opacity: [0.35, 0.8, 0.35] } : { opacity: 0.5 }}
        transition={
          active
            ? { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }
            : { duration: 0 }
        }
      />
      <motion.div
        aria-hidden
        className="absolute start-[20%] bottom-[22%] size-1 rounded-full bg-foreground/25"
        animate={active ? { opacity: [0.2, 0.55, 0.2] } : { opacity: 0.35 }}
        transition={
          active
            ? { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 }
            : { duration: 0 }
        }
      />
    </div>
  );
}

export function VisualContainer({ children, className }: VisualContainerProps) {
  return (
    <div
      className={cn(
        "relative flex aspect-[564/300] w-full items-center justify-center overflow-hidden rounded-none bg-muted p-3 sm:aspect-[564/260] sm:p-4",
        className,
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_40%,rgb(var(--c-accent)_/_0.08),transparent_70%)]"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background/55 from-5% via-transparent to-background/70 to-95%" />
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export function IntegrationCard({
  visual,
  title,
  description,
  url,
  ctaLabel = "Learn more",
  className,
}: TeamCardProps) {
  return (
    <Card
      className={cn(
        "flex h-full w-full flex-col gap-0 overflow-hidden rounded-2xl border p-0 ring-0",
        className,
      )}
    >
      <VisualContainer>{visual}</VisualContainer>

      <CardContent className="flex flex-1 flex-col gap-4 p-4 sm:gap-5 sm:p-5">
        <div className="flex flex-1 flex-col gap-1.5">
          <h3 className="text-lg font-medium tracking-tight sm:text-xl">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>
        <ModernIconButton href={url} size="sm">
          {ctaLabel}
        </ModernIconButton>
      </CardContent>
    </Card>
  );
}

export function IntegrationCardDemo() {
  return (
    <div className="flex min-h-96 w-full items-center justify-center p-4 sm:p-6">
      <IntegrationCard
        visual={<Integration slug="web-design" />}
        title="Seamless Integrations"
        description="Connect your favorite tools and keep your workflows unified without switching between platforms."
        url="/services"
        className="mx-auto sm:max-w-141"
      />
    </div>
  );
}

export default IntegrationCardDemo;
