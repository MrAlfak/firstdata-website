"use client";

import Link from "next/link";
import type { dictionaries, Lang } from "@/i18n/dictionaries";
import { methodPageDictionaries } from "@/i18n/method-page";
import type { NavChild } from "@/config/navigation";
import TermIcon from "@/components/icons/TermIcon";
import ChromeIcon from "@/components/icons/ChromeIcon";

type Dict = (typeof dictionaries)[Lang];

export type MegaLayout = "products" | "resources";

export type MegaFeatured = {
  label: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
};

type Props = {
  menuId: string;
  open: boolean;
  fa: boolean;
  pathname: string;
  eyebrow: string;
  title: string;
  description: string;
  viewAllLabel: string;
  parentHref: string;
  items: NavChild[];
  layout: MegaLayout;
  featured?: MegaFeatured;
  /** Align under an edge trigger (e.g. contact utility) instead of navbar center */
  anchored?: boolean;
  getLabel: (labelKey: string) => string;
  getDescription: (child: NavChild) => string;
  getIconSlug: (child: NavChild) => string;
  onNavigate?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const PAGE_DESC_BY_SLUG: Record<string, keyof Dict["pages"]> = {
  team: "aboutTeam",
  partners: "aboutPartners",
  honors: "aboutHonors",
  vision: "aboutVision",
  mission: "aboutMission",
  web: "productWeb",
  mobile: "productMobile",
  windows: "productWindows",
  ai: "productAi",
  platforms: "productPlatforms",
  websites: "portfolioWebsites",
  ecommerce: "portfolioEcommerce",
  "mobile-apps": "portfolioMobile",
  desktop: "portfolioDesktop",
  other: "portfolioOther",
  request: "contactRequest",
  consultation: "contactConsultation",
  collaborate: "contactCollaborate",
};

const ICON_BY_SLUG: Record<string, string> = {
  team: "team",
  partners: "key",
  honors: "default",
  vision: "ai",
  mission: "message",
  method: "calendar",
  web: "web",
  mobile: "mobile",
  windows: "windows",
  ai: "ai",
  platforms: "platforms",
  "web-design": "web-design",
  "ui-ux": "ui-ux",
  ecommerce: "ecommerce",
  android: "android",
  ios: "ios",
  seo: "seo",
  consulting: "consulting",
  support: "support",
  websites: "web",
  "mobile-apps": "mobile",
  desktop: "windows",
  other: "platforms",
  request: "message",
  consultation: "calendar",
  collaborate: "team",
};

export function resolveMegaChildDescription(
  child: NavChild,
  parentSlug: string,
  d: Dict,
  lang: Lang,
): string {
  if (parentSlug === "services") {
    const item = d.home.services.items.find((entry) => entry.slug === child.slug);
    if (item?.desc) return item.desc;
  }
  if (parentSlug === "product") {
    const item = d.home.products.items.find((entry) => entry.slug === child.slug);
    if (item?.desc) return item.desc;
  }
  if (child.slug === "method") {
    return methodPageDictionaries[lang].lead;
  }
  const pageKey = PAGE_DESC_BY_SLUG[child.slug];
  if (pageKey) return d.pages[pageKey].subtitle;
  return "";
}

export function resolveMegaIconSlug(child: NavChild): string {
  return ICON_BY_SLUG[child.slug] ?? child.slug;
}

export function resolveMegaPanelCopy(
  parentSlug: string,
  d: Dict,
  t: (key: string) => string,
): {
  title: string;
  description: string;
  layout: MegaLayout;
  featured?: MegaFeatured;
} {
  if (parentSlug === "product") {
    return {
      title: d.pages.product.title,
      description: d.pages.product.subtitle,
      layout: "products",
      featured: {
        label: t("nav.megaFeatured"),
        title: d.pages.product.lines[0] ?? d.pages.product.subtitle,
        description: d.pages.product.lines[1] ?? d.home.products.subtitle,
        href: "/contactus/request",
        linkLabel: t("nav.contactRequest"),
      },
    };
  }
  if (parentSlug === "services") {
    return {
      title: d.home.services.title,
      description: d.home.services.subtitle,
      layout: "resources",
      featured: {
        label: t("nav.megaFeatured"),
        title: d.home.services.integrationTitle,
        description: d.home.services.integrationDescription,
        href: "/contactus/consultation",
        linkLabel: t("nav.contactConsultation"),
      },
    };
  }
  if (parentSlug === "portfolio") {
    return {
      title: d.pages.portfolio.title,
      description: d.pages.portfolio.subtitle,
      layout: "products",
      featured: {
        label: t("nav.megaFeatured"),
        title: d.pages.portfolio.lines[0] ?? d.pages.portfolio.subtitle,
        description: d.pages.portfolio.lines[1] ?? d.pages.portfolio.subtitle,
        href: "/contactus/request",
        linkLabel: t("nav.contactRequest"),
      },
    };
  }
  if (parentSlug === "aboutus") {
    return {
      title: d.pages.aboutus.title,
      description: d.pages.aboutus.subtitle,
      layout: "products",
      featured: {
        label: t("nav.megaFeatured"),
        title: d.aboutUi.teamPreview.title,
        description: d.aboutUi.teamPreview.subtitle,
        href: "/aboutus/team",
        linkLabel: d.aboutUi.teamPreview.cta,
      },
    };
  }
  if (parentSlug === "contactus") {
    return {
      title: t("nav.contactus"),
      description: d.pages.contactRequest.subtitle,
      layout: "products",
      featured: {
        label: t("nav.megaFeatured"),
        title: d.pages.contactRequest.title,
        description: d.pages.contactRequest.subtitle,
        href: "/contactus/request",
        linkLabel: t("nav.contactRequest"),
      },
    };
  }
  return {
    title: t(`nav.${parentSlug}`),
    description: "",
    layout: "products",
  };
}

function MegaChevron({ fa }: { fa: boolean }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={fa ? "rotate-180" : undefined}
    >
      <path
        d="M5 12h14m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ModernMegaMenu({
  menuId,
  open,
  fa,
  pathname,
  eyebrow,
  title,
  description,
  viewAllLabel,
  parentHref,
  items,
  layout,
  featured,
  anchored,
  getLabel,
  getDescription,
  getIconSlug,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
}: Props) {
  const isResources = layout === "resources";

  return (
    <div
      id={menuId}
      className={`fd-mega-menu${open ? " is-open" : ""}${
        isResources ? " fd-mega-menu--resources" : " fd-mega-menu--products"
      }${anchored ? " fd-mega-menu--anchored" : ""}`}
      data-menu={menuId}
      role="dialog"
      aria-label={title}
      aria-hidden={!open}
      dir={fa ? "rtl" : "ltr"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="fd-mega-hover-bridge" aria-hidden="true" />

      <div className={isResources ? "fd-mega-resources-layout" : "fd-mega-products-layout"}>
        <section className={isResources ? "fd-mega-menu-main" : "fd-mega-product-list-panel"}>
          <div className="fd-mega-menu-header">
            <div className="fd-mega-heading-wrap">
              <span className="fd-mega-eyebrow">
                <span className="fd-mega-eyebrow-dot" aria-hidden="true" />
                {eyebrow}
              </span>
              <h2 className="fd-mega-title font-iran">{title}</h2>
              {description ? (
                <p className="fd-mega-description font-iran">{description}</p>
              ) : null}
            </div>
            <Link
              href={parentHref}
              className="fd-mega-text-link font-iran"
              onClick={onNavigate}
            >
              {viewAllLabel}
              <MegaChevron fa={fa} />
            </Link>
          </div>

          <div className={isResources ? "fd-mega-resource-grid" : "fd-mega-product-list"}>
            {items.map((child) => {
              const active = pathname === child.href || pathname.startsWith(`${child.href}/`);
              const desc = getDescription(child);
              if (isResources) {
                return (
                  <Link
                    key={child.slug}
                    href={child.href}
                    className={`fd-mega-resource-card${active ? " is-active" : ""}`}
                    aria-current={active ? "page" : undefined}
                    onClick={onNavigate}
                  >
                    <span className="fd-mega-resource-icon">
                      <TermIcon name={getIconSlug(child)} plain size="sm" />
                    </span>
                    <span className="fd-mega-resource-copy">
                      <span className="fd-mega-resource-title-line">
                        <strong className="fd-mega-resource-title font-iran">
                          {getLabel(child.labelKey)}
                        </strong>
                      </span>
                      {desc ? (
                        <p className="fd-mega-resource-description font-iran">{desc}</p>
                      ) : null}
                    </span>
                    <span className="fd-mega-resource-arrow" aria-hidden="true">
                      <MegaChevron fa={fa} />
                    </span>
                  </Link>
                );
              }
              return (
                <Link
                  key={child.slug}
                  href={child.href}
                  className={`fd-mega-product-link${active ? " is-active" : ""}`}
                  aria-current={active ? "page" : undefined}
                  onClick={onNavigate}
                >
                  <span className="fd-mega-product-icon">
                    <TermIcon name={getIconSlug(child)} plain size="sm" />
                  </span>
                  <span className="fd-mega-product-copy">
                    <strong className="font-iran">{getLabel(child.labelKey)}</strong>
                    {desc ? <span className="font-iran">{desc}</span> : null}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {featured ? (
          <Link
            href={featured.href}
            className="fd-mega-product-feature"
            onClick={onNavigate}
          >
            <span className="fd-mega-product-feature-inner">
              <span className="fd-mega-product-feature-label font-iran">{featured.label}</span>
              <strong className="fd-mega-product-feature-title font-iran">{featured.title}</strong>
              <span className="fd-mega-product-feature-description font-iran">
                {featured.description}
              </span>
              <span className="fd-mega-product-feature-link font-iran">
                {featured.linkLabel}
                <MegaChevron fa={fa} />
              </span>
            </span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

/** Compact accordion rows for modern mobile drawer */
export function ModernMegaMobileList({
  items,
  fa,
  pathname,
  getLabel,
  getDescription,
  getIconSlug,
  onNavigate,
  bare,
}: {
  items: NavChild[];
  fa: boolean;
  pathname: string;
  getLabel: (labelKey: string) => string;
  getDescription: (child: NavChild) => string;
  getIconSlug: (child: NavChild) => string;
  onNavigate?: () => void;
  bare?: boolean;
}) {
  return (
    <div className={`fd-mega-mobile-list${bare ? " is-bare" : ""}`} dir={fa ? "rtl" : "ltr"}>
      {items.map((child) => {
        const active = pathname === child.href || pathname.startsWith(`${child.href}/`);
        const desc = getDescription(child);
        return (
          <Link
            key={child.slug}
            href={child.href}
            className={`fd-mega-mobile-row${active ? " is-active" : ""}`}
            aria-current={active ? "page" : undefined}
            onClick={onNavigate}
          >
            <span className="fd-mega-mobile-icon">
              <TermIcon name={getIconSlug(child)} plain size="sm" />
            </span>
            <span className="fd-mega-mobile-copy">
              <strong className="font-iran">{getLabel(child.labelKey)}</strong>
              {desc ? <span className="font-iran">{desc}</span> : null}
            </span>
            <ChromeIcon
              name="chevron"
              modern
              size={12}
              className={`opacity-40 ${fa ? "rotate-90" : "-rotate-90"}`}
            />
          </Link>
        );
      })}
    </div>
  );
}
