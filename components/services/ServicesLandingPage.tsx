"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  Apple,
  BadgeCheck,
  Bot,
  Code2,
  Globe2,
  Headphones,
  LayoutTemplate,
  MessageCircle,
  Pencil,
  Rocket,
  Search,
  Send,
  ShoppingCart,
  Sparkles,
  Wand2,
} from "lucide-react";
import ServiceSection from "@/components/ServiceSection";
import Process from "@/components/sales/Process";
import Testimonials from "@/components/sales/Testimonials";
import Faq from "@/components/sales/Faq";
import FinalCta from "@/components/sales/FinalCta";
import Bentogrid from "@/components/shadcn-space/blocks/bento-grid-01/bentogrid";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import { servicesPageDictionaries } from "@/i18n/services-page";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";
import { cn } from "@/lib/utils";

const CARD_ICONS: Record<string, LucideIcon> = {
  "web-design": Globe2,
  "ui-ux": LayoutTemplate,
  ecommerce: ShoppingCart,
  android: Bot,
  ios: Apple,
  seo: Search,
  consulting: MessageCircle,
  support: Headphones,
};

const FEATURE_ICONS: Record<string, LucideIcon> = {
  custom: Wand2,
  expertise: BadgeCheck,
  quality: Sparkles,
};

const STEP_ICONS: LucideIcon[] = [MessageCircle, Pencil, Code2, Rocket];

function ServicesBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-[rgb(var(--c-accent)/0.22)] bg-[rgb(var(--c-accent)/0.1)] px-3 py-1 text-xs font-medium text-[rgb(var(--c-accent))] sm:text-sm",
        className,
      )}
    >
      <Sparkles className="size-3.5 shrink-0 opacity-80" aria-hidden />
      {children}
    </span>
  );
}

function ServicesHeroCollage({ ariaLabel }: { ariaLabel: string }) {
  return (
    <div
      className="relative mx-auto aspect-[5/4] w-full max-w-lg lg:max-w-none"
      aria-label={ariaLabel}
      role="img"
    >
      {/* Soft dots */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgb(var(--c-accent) / 0.35) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -start-6 top-8 size-24 rounded-full bg-[rgb(var(--c-accent)/0.12)] blur-2xl sm:size-32"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -end-4 bottom-10 size-28 rounded-full bg-[rgb(var(--c-accent)/0.1)] blur-2xl"
      />

      {/* Floating line chart */}
      <div
        aria-hidden
        className="absolute start-0 top-[8%] z-20 w-[38%] rounded-xl border border-paper/10 bg-[var(--ai-card)] p-2.5 shadow-lg shadow-black/5 sm:p-3"
      >
        <div className="mb-2 h-1.5 w-10 rounded-full bg-paper/15" />
        <svg viewBox="0 0 120 48" className="h-auto w-full text-[rgb(var(--c-accent))]" fill="none">
          <path
            d="M4 36 C20 34 28 18 44 22 C60 26 68 10 84 14 C100 18 108 28 116 20"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M4 36 C20 34 28 18 44 22 C60 26 68 10 84 14 C100 18 108 28 116 20 V48 H4 Z"
            fill="currentColor"
            opacity="0.12"
          />
        </svg>
      </div>

      {/* Laptop */}
      <div
        aria-hidden
        className="absolute start-[12%] top-[14%] z-10 w-[72%] rotate-[-2deg]"
      >
        <div className="rounded-t-xl border border-paper/12 bg-[var(--ai-card)] p-2 shadow-xl shadow-black/10 sm:p-2.5">
          <div className="overflow-hidden rounded-lg bg-[rgb(var(--c-fg)/0.04)] p-2 sm:p-2.5">
            <div className="mb-2 flex gap-1.5">
              <span className="size-1.5 rounded-full bg-paper/25" />
              <span className="size-1.5 rounded-full bg-paper/25" />
              <span className="size-1.5 rounded-full bg-paper/25" />
            </div>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              <div className="col-span-2 rounded-md bg-[var(--ai-card)] p-1.5 shadow-sm sm:p-2">
                <div className="mb-1.5 h-1.5 w-12 rounded bg-paper/20" />
                <div className="flex h-10 items-end gap-1 sm:h-12">
                  {[40, 65, 45, 80, 55, 70, 50].map((h, i) => (
                    <span
                      key={i}
                      className="flex-1 rounded-t bg-[rgb(var(--c-accent)/0.55)]"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="rounded-md bg-[var(--ai-card)] p-1.5 shadow-sm sm:p-2">
                <div className="mb-1 text-[9px] font-semibold tabular-nums text-paper/70 sm:text-[10px]">
                  12,648
                </div>
                <div className="h-1.5 w-full rounded-full bg-paper/10">
                  <div className="h-full w-2/3 rounded-full bg-[rgb(var(--c-accent)/0.7)]" />
                </div>
              </div>
              <div className="col-span-3 rounded-md bg-[var(--ai-card)] p-1.5 shadow-sm sm:p-2">
                <svg viewBox="0 0 160 28" className="h-auto w-full text-[rgb(var(--c-accent))]" fill="none">
                  <path
                    d="M2 22 C18 20 30 8 48 12 C66 16 78 4 96 8 C114 12 130 18 158 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto h-2 w-[88%] rounded-b-md bg-paper/15" />
        <div className="mx-auto h-1 w-[40%] rounded-b bg-paper/10" />
      </div>

      {/* Phone */}
      <div
        aria-hidden
        className="absolute bottom-[6%] end-[6%] z-30 w-[34%] max-w-[140px] rotate-[6deg]"
      >
        <div className="rounded-[1.25rem] border-[3px] border-paper/20 bg-[var(--ai-card)] p-1.5 shadow-2xl shadow-black/15">
          <div className="overflow-hidden rounded-[0.9rem] bg-[rgb(var(--c-fg)/0.04)]">
            <div className="mx-auto mt-1.5 h-1 w-8 rounded-full bg-paper/20" />
            <div className="space-y-2 p-2.5 pt-3">
              <div className="h-1.5 w-10 rounded bg-paper/15" />
              <div className="text-sm font-bold tabular-nums text-paper/80">$4,280</div>
              <div className="h-12 rounded-lg bg-[rgb(var(--c-accent)/0.12)]" />
              <div className="grid grid-cols-2 gap-1.5">
                <div className="h-8 rounded-md bg-[var(--ai-card)] shadow-sm" />
                <div className="h-8 rounded-md bg-[var(--ai-card)] shadow-sm" />
              </div>
            </div>
            <div className="flex justify-around border-t border-paper/8 py-2">
              {[1, 2, 3, 4].map((i) => (
                <span key={i} className="size-2 rounded-full bg-paper/20" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Donut card */}
      <div
        aria-hidden
        className="absolute bottom-[18%] start-[2%] z-20 w-[36%] rounded-xl border border-paper/10 bg-[var(--ai-card)] p-2.5 shadow-lg shadow-black/5 sm:p-3"
      >
        <div className="mb-2 h-1.5 w-14 rounded-full bg-paper/15" />
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 40 40" className="size-10 shrink-0 sm:size-12">
            <circle cx="20" cy="20" r="14" fill="none" stroke="rgb(var(--c-fg) / 0.08)" strokeWidth="6" />
            <circle
              cx="20"
              cy="20"
              r="14"
              fill="none"
              stroke="rgb(var(--c-accent))"
              strokeWidth="6"
              strokeDasharray="55 88"
              strokeLinecap="round"
              transform="rotate(-90 20 20)"
            />
            <circle
              cx="20"
              cy="20"
              r="14"
              fill="none"
              stroke="rgb(var(--c-accent) / 0.4)"
              strokeWidth="6"
              strokeDasharray="28 88"
              strokeDashoffset="-55"
              strokeLinecap="round"
              transform="rotate(-90 20 20)"
            />
          </svg>
          <div className="min-w-0 flex-1 space-y-1">
            <div className="h-1.5 w-full rounded bg-paper/12" />
            <div className="h-1.5 w-3/4 rounded bg-paper/10" />
            <div className="h-1.5 w-1/2 rounded bg-paper/8" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesModernLanding() {
  const { dir, lang, fd } = useT();
  const ui = servicesPageDictionaries[lang];
  const face = "font-iran";

  return (
    <div>
      {/* Hero */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        animate="show"
        className="ai-section border-b border-paper/10 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
        aria-labelledby="services-hero-title"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          {/* Content first in DOM → inline-start (right in RTL, left in LTR) */}
          <motion.div variants={itemReveal} dir={dir}>
            <ServicesBadge className={`mb-4 ${face}`}>{ui.heroBadge}</ServicesBadge>
            <h1
              id="services-hero-title"
              className={`ai-display max-w-xl text-3xl text-paper sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15] ${face}`}
            >
              {ui.heroTitle}
            </h1>
            <p className={`mt-4 max-w-lg text-base leading-relaxed text-paper/55 sm:text-lg ${face}`}>
              {ui.heroLead}
            </p>

            <ul className={`mt-8 space-y-4 ${face}`}>
              {ui.features.map((feature) => {
                const Icon = FEATURE_ICONS[feature.id] ?? Sparkles;
                return (
                  <li key={feature.id} className="flex gap-3.5">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--c-accent)/0.12)] text-[rgb(var(--c-accent))]">
                      <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <p className="text-base font-semibold text-paper">{feature.title}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-paper/50">{feature.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <motion.div variants={itemReveal} dir={dir}>
            <ServicesHeroCollage ariaLabel={ui.collageAria} />
          </motion.div>
        </div>
      </motion.section>

      {/* Services bento grid */}
      <motion.section
        id="services-grid"
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className="ai-section scroll-mt-16 border-b border-paper/10"
        aria-labelledby="services-grid-title"
      >
        <motion.div variants={itemReveal}>
          <Bentogrid
            dir={dir}
            faceClassName={face}
            badge={ui.gridBadge}
            title={ui.gridTitle}
            titleId="services-grid-title"
            lead={ui.gridLead}
            reminderItems={ui.cards.slice(0, 7).map((card) => ({
              id: card.slug,
              title: card.title,
              icon: CARD_ICONS[card.slug] ?? Globe2,
            }))}
            featurePrimary={{
              title: ui.cards[0]?.title ?? "",
              description: ui.cards[0]?.desc ?? "",
              href: ui.cards[0] ? `/services/${ui.cards[0].slug}` : undefined,
            }}
            featureWide={{
              title: ui.cards[1]?.title ?? "",
              description: ui.cards[1]?.desc ?? "",
              href: ui.cards[1] ? `/services/${ui.cards[1].slug}` : undefined,
            }}
            featureCards={[
              {
                title: ui.cards[2]?.title ?? "",
                description: ui.cards[2]?.desc ?? "",
                href: ui.cards[2] ? `/services/${ui.cards[2].slug}` : undefined,
                imageLight: "https://images.shadcnspace.com/assets/bento-grid/bento-grid-img-1.png",
                imageDark: "https://images.shadcnspace.com/assets/bento-grid/bento-grid-darkimg-1.png",
                imageAlt: ui.cards[2]?.title,
              },
              {
                title: ui.cards[3]?.title ?? "",
                description: ui.cards[3]?.desc ?? "",
                href: ui.cards[3] ? `/services/${ui.cards[3].slug}` : undefined,
                imageLight: "https://images.shadcnspace.com/assets/bento-grid/bento-grid-img-2.png",
                imageDark: "https://images.shadcnspace.com/assets/bento-grid/bento-grid-darkimg-2.png",
                imageAlt: ui.cards[3]?.title,
              },
              {
                title: ui.cards[4]?.title ?? "",
                description: ui.cards[4]?.desc ?? "",
                href: ui.cards[4] ? `/services/${ui.cards[4].slug}` : undefined,
                imageLight: "https://images.shadcnspace.com/assets/bento-grid/bento-grid-img-3.png",
                imageAlt: ui.cards[4]?.title,
              },
            ]}
          />
        </motion.div>
        {/* Keep remaining services reachable */}
        <div className="mx-auto max-w-7xl px-4 pb-10 lg:px-8 xl:px-16">
          <ul
            className={cn(
              "grid list-none grid-cols-1 gap-3 sm:grid-cols-3",
              face,
            )}
            dir={dir}
          >
            {ui.cards.slice(5).map((card) => {
              const Icon = CARD_ICONS[card.slug] ?? Globe2;
              return (
                <li key={card.slug}>
                  <Link
                    href={`/services/${card.slug}`}
                    className={cn(
                      "group flex h-full items-start gap-3 rounded-xl border border-border bg-background px-4 py-4 transition-colors hover:bg-muted/50",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--c-accent)/0.45)]",
                    )}
                  >
                    <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--c-accent)/0.12)] text-[rgb(var(--c-accent))]">
                      <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-foreground sm:text-base">
                        {card.title}
                      </span>
                      <span className="mt-0.5 block text-sm text-muted-foreground">{card.desc}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.section>

      {/* Process */}
      <motion.section
        id="services-process"
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className="ai-section scroll-mt-16 border-b border-paper/10 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
        aria-labelledby="services-process-title"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div variants={itemReveal} className="mx-auto max-w-2xl text-center" dir={dir}>
            <ServicesBadge className={`mb-4 ${face}`}>{ui.processBadge}</ServicesBadge>
            <h2
              id="services-process-title"
              className={`ai-display text-2xl text-paper sm:text-3xl lg:text-4xl ${face}`}
            >
              {ui.processTitle}
            </h2>
          </motion.div>

          <motion.ol
            variants={itemReveal}
            className="relative mt-12 grid list-none gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
            dir={dir}
          >
            {/* Dashed connector — desktop */}
            <div
              aria-hidden
              className="pointer-events-none absolute start-[12.5%] end-[12.5%] top-4 hidden border-t-2 border-dashed border-[rgb(var(--c-accent)/0.28)] lg:block"
            />

            {ui.steps.map((step, idx) => {
              const Icon = STEP_ICONS[idx] ?? Rocket;
              return (
                <li key={step.num} className="relative flex flex-col items-center text-center" dir={dir}>
                  <span className="relative z-10 mb-4 flex size-8 items-center justify-center rounded-full bg-[rgb(var(--c-accent))] text-xs font-bold text-white shadow-md shadow-[rgb(var(--c-accent)/0.35)]">
                    {fd(step.num)}
                  </span>
                  <span className="mb-3 flex size-14 items-center justify-center rounded-full border border-[rgb(var(--c-accent)/0.2)] bg-[rgb(var(--c-accent)/0.08)] text-[rgb(var(--c-accent))]">
                    <Icon className="size-6" strokeWidth={1.6} aria-hidden />
                  </span>
                  <h3 className={`text-base font-semibold text-paper ${face}`}>{step.title}</h3>
                  <p className={`mt-1.5 max-w-[16rem] text-sm leading-relaxed text-paper/50 ${face}`}>
                    {step.text}
                  </p>
                </li>
              );
            })}
          </motion.ol>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        id="services-cta"
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className="ai-section scroll-mt-16 border-0 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
        aria-labelledby="services-cta-title"
      >
        <motion.div
          variants={itemReveal}
          className="mx-auto flex max-w-7xl flex-col items-center gap-8 overflow-hidden rounded-[1.75rem] border border-paper/10 bg-[var(--ai-card)]/80 px-6 py-10 shadow-sm backdrop-blur-md sm:flex-row sm:items-center sm:gap-8 sm:px-10 sm:py-12 lg:gap-12 lg:px-14"
          dir={dir}
        >
          <div className="order-1 min-w-0 flex-1 text-center sm:order-none sm:text-start">
            <h2 id="services-cta-title" className={`text-2xl font-bold tracking-tight text-paper sm:text-3xl ${face}`}>
              {ui.ctaTitle}
            </h2>
            <p className={`mt-2 max-w-xl text-base leading-relaxed text-paper/55 ${face}`}>{ui.ctaLead}</p>
          </div>

          <Link
            href="/contactus/consultation"
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-xl bg-[rgb(var(--c-accent))] px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--c-accent)/0.5)] focus-visible:ring-offset-2",
              "order-2 sm:order-none",
              face,
            )}
          >
            {ui.ctaButton}
            <span aria-hidden className="text-base opacity-90">
              {dir === "rtl" ? "←" : "→"}
            </span>
          </Link>

          <div className="relative order-3 shrink-0 sm:order-none" aria-hidden>
            <div className="relative flex size-28 items-center justify-center rounded-2xl bg-[rgb(var(--c-accent)/0.12)] sm:size-32">
              <span className="absolute -start-2 top-3 size-3 rounded-full bg-[rgb(var(--c-accent)/0.45)]" />
              <span className="absolute -end-1 bottom-6 size-2.5 rounded-full bg-[rgb(var(--c-accent)/0.35)]" />
              <span className="absolute start-4 -bottom-1 size-2 rounded-full bg-[rgb(var(--c-accent)/0.25)]" />
              <Send className="size-12 -rotate-12 text-[rgb(var(--c-accent))] sm:size-14" strokeWidth={1.4} />
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}

function ServicesTerminalLanding() {
  return (
    <>
      <article aria-label="Services">
        <ServiceSection number="01" />
        <ServiceSection number="02" />
        <ServiceSection number="03" />
        <ServiceSection number="04" />
        <ServiceSection number="05" />
        <ServiceSection number="06" />
        <ServiceSection number="07" />
        <ServiceSection number="08" />
        <ServiceSection number="09" />
      </article>
      <Process />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}

export default function ServicesLandingPage() {
  const [skin] = usePanelSkin();
  const modern = skin === "modern";

  return modern ? <ServicesModernLanding /> : <ServicesTerminalLanding />;
}
