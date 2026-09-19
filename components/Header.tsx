"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { scheduleUpdate } from "@/lib/react/schedule-update";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useScramble } from "@/motion/useScramble";
import { ease } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import { useTheme } from "@/i18n/ThemeProvider";
import { MAIN_NAV, CONTACT_CTA, PANEL_HREF, type NavChild } from "@/config/navigation";
import SearchModal from "@/components/search/SearchModal";
import ModernSearchCommand from "@/components/search/ModernSearchCommand";
import ChromeIcon from "@/components/icons/ChromeIcon";
import type { PublicUser } from "@/lib/auth/types";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";
import { ShoppingCartDrawer } from "@/components/shadcn-space/drawer/drawer-02";
import { ModernIconButton } from "@/components/ui/modern-icon-button";
import ModernMegaMenu, {
  ModernMegaMobileList,
  resolveMegaChildDescription,
  resolveMegaIconSlug,
  resolveMegaPanelCopy,
} from "@/components/header/ModernMegaMenu";
import type { NavItem } from "@/config/navigation";

const listV = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } } };
const rowV = {
  hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: { duration: 0.2 } }, };

const ICON_BTN =
  "flex h-9 w-9 shrink-0 items-center justify-center border border-paper/30 text-paper/70 transition-colors duration-200 hover:border-paper/60 hover:bg-paper/10 hover:text-paper";

const ICON_BTN_MODERN =
  "fd-glass-utility-btn";

const MODERN_PANEL_GLASS =
  "fd-modern-drop-panel overflow-hidden rounded-2xl border border-paper/12 bg-[color-mix(in_srgb,var(--ai-card)_94%,transparent)] text-paper backdrop-blur-xl";

function HeaderIconTip({
  label,
  fa,
  children,
  className = "",
}: {
  label: string;
  fa: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`group/tip relative inline-flex ${className}`}>
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute left-1/2 top-[calc(100%+0.4rem)] z-[80] -translate-x-1/2 whitespace-nowrap border border-paper/20 bg-ink px-2 py-1 text-[10px] text-paper/85 opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-opacity duration-150 group-hover/tip:opacity-100 group-focus-within/tip:opacity-100 ${
          fa ? "font-fa normal-case" : "font-mono uppercase tracking-wider"
        }`}
      >
        {label}
      </span>
    </span>
  );
}

/** CRT panel, always dark, readable on any site theme */
const TERM_PANEL =
  "overflow-hidden rounded border border-[#33ff66]/25 bg-[#080c08] text-[#33ff66] shadow-[0_16px_48px_rgba(0,0,0,0.65)]";
const TERM_PANEL_MOBILE =
  "overflow-hidden rounded border border-[#33ff66]/25 bg-[#080c08] text-[#33ff66]";
const MODERN_PANEL =
  MODERN_PANEL_GLASS;
const MODERN_PANEL_MOBILE =
  "fd-modern-drop-panel overflow-hidden rounded-2xl border border-paper/12 bg-[var(--ai-card)] text-paper";
const TERM_CHROME =
  "flex items-center gap-1.5 border-b border-[#33ff66]/15 bg-[#0c120c] px-3 py-2";
const MODERN_CHROME =
  "flex items-center border-b border-paper/8 px-3 py-2.5";
const TERM_ROW =
  "flex w-full items-center gap-2 px-3 py-2.5 text-sm transition-colors duration-150 text-[#33ff66]/85 hover:bg-[#33ff66]/[0.07] hover:text-[#33ff66]";
const MODERN_ROW =
  "flex w-full items-center gap-2 px-3 py-2.5 text-sm transition-colors duration-150 text-paper/75 hover:bg-term/8 hover:text-paper";
const TERM_ROW_ACTIVE = "bg-[#33ff66]/15 text-[#33ff66]";
const MODERN_ROW_ACTIVE = "bg-term/10 text-term";

function termTreeMark(last: boolean, rtl = false): string {
  if (rtl) return last ? "─┘" : "─┤";
  return last ? "└─" : "├─";
}

function TermChromeTitle({
  fa,
  menuId,
  modern,
}: {
  fa: boolean;
  menuId: string;
  modern?: boolean;
}) {
  if (modern) {
    return (
      <div className={MODERN_CHROME}>
        <span className="font-iran text-xs font-medium text-paper/50" dir={fa ? "rtl" : "ltr"}>
          {menuId}
        </span>
      </div>
    );
  }

  const dots = (
    <div className="flex shrink-0 items-center gap-1.5">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5a5a]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#ffb020]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#33ff66]" />
    </div>
  );

  const title = (
    <span className="flex-1 text-end font-mono text-[9px] text-[#33ff66]/45" dir="ltr">
      {`${menuId}.menu`}
    </span>
  );

  return (
    <div className={TERM_CHROME}>
      {fa ? (
        <>
          {title}
          {dots}
        </>
      ) : (
        <>
          {dots}
          {title}
        </>
      )}
    </div>
  );
}

function TermSubLink({
  href,
  label,
  mark,
  active,
  fa,
  modern,
  onClick,
}: {
  href: string;
  label: string;
  mark: string;
  active: boolean;
  fa: boolean;
  modern?: boolean;
  onClick?: () => void;
}) {
  const row = modern ? MODERN_ROW : TERM_ROW;
  const rowActive = modern ? MODERN_ROW_ACTIVE : TERM_ROW_ACTIVE;
  return (
    <Link
      href={href}
      role="menuitem"
      onClick={onClick}
      dir="ltr"
      className={`${row} ${active ? rowActive : ""} ${
        modern
          ? `${fa ? "justify-end" : "justify-start"} font-iran normal-case`
          : fa
            ? "justify-end font-fa normal-case"
            : "justify-start font-mono"
      }`}
      aria-current={active ? "page" : undefined}
    >
      {fa ? (
        <>
          <span>{label}</span>
          {!modern ? (
            <span className="shrink-0 font-mono text-[10px] text-[#33ff66]/30">{mark}</span>
          ) : null}
        </>
      ) : (
        <>
          {!modern ? (
            <span className="shrink-0 font-mono text-[10px] text-[#33ff66]/30">{mark}</span>
          ) : null}
          <span>{label}</span>
        </>
      )}
    </Link>
  );
}

function TermPrompt({ fa, menuId, modern }: { fa: boolean; menuId: string; modern?: boolean }) {
  if (modern) return null;
  return (
    <div
      className={`flex items-center gap-1 border-t border-[#33ff66]/10 px-3 py-2 font-mono text-[10px] text-[#33ff66]/35 ${
        fa ? "justify-end" : "justify-start"
      }`}
      dir="ltr"
    >
      <span dir="ltr">fd@{menuId}:~$</span>
      <span className="animate-blink text-[#33ff66]/80">▮</span>
    </div>
  );
}

function TermDropdown({
  items,
  fa,
  pathname,
  t,
  menuId,
  panelClass = TERM_PANEL,
  modern,
  onItemClick,
}: {
  items: NavChild[];
  fa: boolean;
  pathname: string;
  t: (key: string) => string;
  menuId: string;
  panelClass?: string;
  modern?: boolean;
  onItemClick?: () => void;
}) {
  return (
    <div className={panelClass} dir={fa ? "rtl" : "ltr"}>
      <TermChromeTitle fa={fa} menuId={menuId} modern={modern} />
      {items.map((child, i) => {
        const last = i === items.length - 1;
        return (
          <TermSubLink
            key={child.slug}
            href={child.href}
            label={t(child.labelKey)}
            mark={termTreeMark(last, fa)}
            active={pathname === child.href}
            fa={fa}
            modern={modern}
            onClick={onItemClick}
          />
        );
      })}
      <TermPrompt fa={fa} menuId={menuId} modern={modern} />
    </div>
  );
}

function termMenuId(slug: string): string {
  if (slug === "aboutus") return "about";
  if (slug === "services") return "services";
  if (slug === "portfolio") return "portfolio";
  if (slug === "product") return "product";
  return slug;
}

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const { t, d, lang, fa, toggle, fd } = useT();
  const { isDark, toggle: toggleTheme } = useTheme();
  const pathname = usePathname();
  const [skin] = usePanelSkin();
  const siteModern = skin === "modern";
  const [wordmarkStart, setWordmarkStart] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const [contactMobileOpen, setContactMobileOpen] = useState(false);
  const [contactDesktopOpen, setContactDesktopOpen] = useState(false);
  const contactDesktopRef = useRef<HTMLDivElement>(null);
  const navbarWrapRef = useRef<HTMLDivElement>(null);
  const megaCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaTriggerRefs = useRef<Record<string, HTMLElement | null>>({});
  const [openMegaSlug, setOpenMegaSlug] = useState<string | null>(null);
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpenMobileSubmenu(null);
    setContactDesktopOpen(false);
    setOpenMegaSlug(null);
  }
  const [authUser, setAuthUser] = useState<PublicUser | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  const megaNavItems = MAIN_NAV.filter((item): item is NavItem & { children: NavChild[] } =>
    Boolean(item.children?.length),
  );

  const themeLabel = isDark ? t("nav.themeLight") : t("nav.themeDark");
  const contactActive = isActive(pathname, CONTACT_CTA.href);
  const face = siteModern ? "font-iran" : fa ? "font-fa" : "font-mono";
  const iconBtn = siteModern ? ICON_BTN_MODERN : ICON_BTN;
  const dropPanel = siteModern ? MODERN_PANEL : TERM_PANEL;
  const dropPanelMobile = siteModern ? MODERN_PANEL_MOBILE : TERM_PANEL_MOBILE;
  const cartLabels = {
    viewCart: t("nav.cart"),
    items: (count: number) => t("nav.cartItems").replace("{count}", fd(count)),
    spendMore: (amount: string) =>
      t("nav.cartSpendMore").replace("{amount}", amount),
    freeShippingUnlocked: t("nav.cartFreeShipping"),
    emptyProgress: t("nav.cartEmptyProgress"),
    youMayAlsoLike: t("nav.cartAlsoLike"),
    subtotal: (count: number) =>
      t("nav.cartSubtotal").replace("{count}", fd(count)),
    shipping: t("nav.cartShipping"),
    shippingFree: t("nav.cartShippingFree"),
    tax: t("nav.cartTax"),
    checkout: (total: string) =>
      t("nav.cartCheckout").replace("{total}", total),
    close: t("nav.cartClose"),
    emptyTitle: t("nav.cartEmpty"),
    emptyDescription: t("nav.cartEmptyDesc"),
    emptyCta: t("nav.cartEmptyCta"),
    emptyCtaHref: "/product",
  };
  const cartTrigger = (
    <ShoppingCartDrawer
      iconOnly
      persist
      triggerClassName={iconBtn}
      triggerAriaLabel={t("nav.cart")}
      triggerWrapper={(trigger) => (
        <HeaderIconTip label={t("nav.cart")} fa={fa}>
          {trigger}
        </HeaderIconTip>
      )}
      labels={cartLabels}
    />
  );

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => setAuthUser(data.user ?? null))
      .catch(() => setAuthUser(null));
  }, [pathname]);

  useEffect(() => {
    if (!siteModern) return;
    const onScroll = () => setHeaderScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [siteModern]);

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1280) setMobileOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    if (!contactDesktopOpen) return;
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const root = contactDesktopRef.current;
      if (!root) return;
      if (event.target instanceof Node && !root.contains(event.target)) {
        setContactDesktopOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setContactDesktopOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [contactDesktopOpen]);

  const clearMegaCloseTimer = () => {
    if (megaCloseTimer.current) {
      clearTimeout(megaCloseTimer.current);
      megaCloseTimer.current = null;
    }
  };

  const closeMegaMenus = (opts?: { restoreFocus?: boolean }) => {
    clearMegaCloseTimer();
    const last = openMegaSlug;
    setOpenMegaSlug(null);
    if (opts?.restoreFocus && last) {
      megaTriggerRefs.current[last]?.focus();
    }
  };

  const updateMegaArrow = (slug: string) => {
    const wrap = navbarWrapRef.current;
    const trigger = megaTriggerRefs.current[slug];
    const menu = wrap?.querySelector<HTMLElement>(`[data-menu="mega-${slug}"]`);
    if (!wrap || !trigger || !menu) return;
    const wrapRect = wrap.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    const triggerCenter = triggerRect.left + triggerRect.width / 2;
    const menuWidth = menu.offsetWidth || menu.getBoundingClientRect().width || 0;
    if (!menuWidth) return;

    // Contact (utility icon) sits on the actions edge — pin panel under that trigger
    // so hover path works and the arrow stays over the button (LTR + RTL).
    if (slug === "contactus" || menu.classList.contains("fd-mega-menu--anchored")) {
      const pad = 8;
      let left = triggerCenter - wrapRect.left - menuWidth / 2;
      left = Math.max(pad, Math.min(wrapRect.width - menuWidth - pad, left));
      menu.style.insetInlineEnd = "auto";
      menu.style.left = `${left}px`;
      menu.style.right = "auto";
      const menuLeftViewport = wrapRect.left + left;
      const arrowX = Math.max(28, Math.min(menuWidth - 28, triggerCenter - menuLeftViewport));
      menu.style.setProperty("--fd-mega-arrow-x", `${arrowX}px`);
      return;
    }

    menu.style.left = "";
    menu.style.right = "";
    menu.style.insetInlineEnd = "";
    const menuLeft = wrapRect.left + (wrapRect.width - menuWidth) / 2;
    const arrowX = Math.max(28, Math.min(menuWidth - 28, triggerCenter - menuLeft));
    menu.style.setProperty("--fd-mega-arrow-x", `${arrowX}px`);
  };

  const openMegaMenu = (slug: string, opts?: { focusFirst?: boolean }) => {
    if (typeof window !== "undefined" && window.innerWidth < 1280) return;
    clearMegaCloseTimer();
    setOpenMegaSlug(slug);
    setContactDesktopOpen(false);
    requestAnimationFrame(() => {
      updateMegaArrow(slug);
      if (opts?.focusFirst) {
        const first = navbarWrapRef.current
          ?.querySelector<HTMLElement>(`[data-menu="mega-${slug}"] a[href]`);
        first?.focus();
      }
    });
  };

  const scheduleMegaClose = () => {
    clearMegaCloseTimer();
    megaCloseTimer.current = setTimeout(() => closeMegaMenus(), 145);
  };

  useEffect(() => {
    if (!siteModern || !openMegaSlug) return;
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const wrap = navbarWrapRef.current;
      if (!wrap) return;
      if (event.target instanceof Node && !wrap.contains(event.target)) {
        closeMegaMenus();
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMegaMenus({ restoreFocus: true });
      }
    };
    const onResize = () => {
      if (window.innerWidth < 1280) closeMegaMenus();
      else if (openMegaSlug) updateMegaArrow(openMegaSlug);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteModern, openMegaSlug]);

  useEffect(() => {
    return () => clearMegaCloseTimer();
  }, []);

  useEffect(() => {
    if (searchOpen) return;
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.setAttribute("data-mobile-nav", "open");
    } else {
      document.body.style.overflow = "";
      document.documentElement.removeAttribute("data-mobile-nav");
    }
    return () => {
      if (!searchOpen) document.body.style.overflow = "";
      document.documentElement.removeAttribute("data-mobile-nav");
    };
  }, [mobileOpen, searchOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((open) => !open);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!document.documentElement.hasAttribute("data-preloader")) {
      scheduleUpdate(() => setWordmarkStart(true));
      return;
    }
    const observer = new MutationObserver(() => {
      if (!document.documentElement.hasAttribute("data-preloader")) {
        setWordmarkStart(true);
        observer.disconnect();
      }
    });
    observer.observe(document.documentElement, {
      attributes: true, attributeFilter: ["data-preloader"], });
    return () => observer.disconnect();
  }, []);

  const wordmark = useScramble(
    fa ? ">اولین دیتا" : ">FIRST DATA", { start: wordmarkStart && !siteModern, duration: 700 }
  );
  const wordmarkLabel = fa ? "اولین دیتا" : "First Data";

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenMobileSubmenu(null);
    setContactMobileOpen(false);
  };

  const desktopNavClass = (href: string, featured?: boolean) => {
    const active = isActive(pathname, href);
    if (siteModern) {
      return "fd-glass-nav-link font-iran";
    }
    return [
      "rounded-lg px-2.5 py-1.5 text-base transition-colors duration-200",
      fa ? "font-fa normal-case tracking-normal" : "tracking-wide",
      active
        ? "bg-term/10 text-paper ring-1 ring-term/30"
        : "text-paper/80 hover:bg-paper/5 hover:text-paper",
      featured && !active ? "font-medium text-amber/90" : "",
    ].join(" ");
  };

  const modernUtilityCluster = (
    <div className="fd-glass-utility" aria-label={t("nav.menuTitle")}>
      {authUser ? (
        <HeaderIconTip label={`${t("nav.panel")} — ${authUser.name}`} fa={fa}>
          <Link href={PANEL_HREF} aria-label={t("nav.panel")} className={iconBtn}>
            <ChromeIcon name="user" modern size={16} />
          </Link>
        </HeaderIconTip>
      ) : (
        <HeaderIconTip label={t("nav.login")} fa={fa}>
          <Link href="/auth/login" aria-label={t("nav.login")} className={iconBtn}>
            <ChromeIcon name="login" modern size={16} />
          </Link>
        </HeaderIconTip>
      )}

      <HeaderIconTip label={t("nav.language")} fa={fa}>
        <button type="button" onClick={toggle} aria-label={t("nav.language")} className={iconBtn}>
          <span className="fd-glass-lang-text font-iran">{lang === "en" ? "فا" : "EN"}</span>
        </button>
      </HeaderIconTip>

      <HeaderIconTip label={themeLabel} fa={fa}>
        <button type="button" onClick={toggleTheme} aria-label={themeLabel} className={iconBtn}>
          <ChromeIcon name={isDark ? "sun" : "moon"} modern size={16} />
        </button>
      </HeaderIconTip>

      <HeaderIconTip label={t("nav.search")} fa={fa}>
        <button
          type="button"
          onClick={() => {
            setSearchOpen(true);
            setMobileOpen(false);
          }}
          aria-label={t("nav.search")}
          className={iconBtn}
        >
          <ChromeIcon name="search" modern size={16} />
        </button>
      </HeaderIconTip>

      {cartTrigger}

      <HeaderIconTip
        label={t(CONTACT_CTA.labelKey)}
        fa={fa}
        className={openMegaSlug === "contactus" ? "[&_[role=tooltip]]:invisible" : ""}
      >
        <button
          type="button"
          ref={(el) => {
            megaTriggerRefs.current.contactus = el;
          }}
          aria-label={t(CONTACT_CTA.labelKey)}
          aria-expanded={openMegaSlug === "contactus" || contactActive}
          aria-haspopup="dialog"
          aria-controls="mega-contactus"
          onMouseEnter={() => openMegaMenu("contactus")}
          onMouseLeave={scheduleMegaClose}
          onFocus={() => openMegaMenu("contactus")}
          onClick={() => {
            if (openMegaSlug === "contactus") closeMegaMenus();
            else openMegaMenu("contactus");
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              openMegaMenu("contactus", { focusFirst: true });
            }
          }}
          className={iconBtn}
        >
          <ChromeIcon name="message" modern size={16} />
        </button>
      </HeaderIconTip>
    </div>
  );

  return (
    <>
      {siteModern ? (
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: ease.tty }}
          className={`site-header-ai fixed inset-x-0 top-0 z-50 ${face}${headerScrolled ? " is-scrolled" : ""}`}
        >
          <div className="fd-glass-navbar-wrap" ref={navbarWrapRef}>
            <nav
              className="fd-glass-navbar"
              aria-label={t("nav.menuTitle")}
              dir={fa ? "rtl" : "ltr"}
            >
              <span className="fd-glass-grain" aria-hidden="true" />
              <span className="fd-glass-refraction" aria-hidden="true" />

              <Link
                href="/"
                data-brand-mark-anchor
                className="fd-glass-brand font-iran"
                aria-label={wordmarkLabel}
                onClick={closeMobile}
              >
                <span className="fd-glass-brand-mark" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5.25 6.5h13.5M5.25 12h9.4M5.25 17.5h6.25"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                    />
                    <path
                      d="m16.3 15.55 2.25 1.95-2.25 1.95"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="fd-glass-brand-copy">
                  <span className="fd-glass-brand-name">{wordmarkLabel}</span>
                  <span className="fd-glass-brand-sub">{d.pages.product.title}</span>
                </span>
              </Link>

              <div className="fd-glass-desktop-nav">
                {MAIN_NAV.map((item) => {
                  if (item.children?.length) {
                    const active = isActive(pathname, item.href);
                    const expanded = openMegaSlug === item.slug;
                    return (
                      <div key={item.slug} className="shrink-0">
                        <button
                          type="button"
                          ref={(el) => {
                            megaTriggerRefs.current[item.slug] = el;
                          }}
                          className={`${desktopNavClass(item.href, item.featured)} inline-flex items-center gap-1`}
                          aria-expanded={expanded || active}
                          aria-haspopup="dialog"
                          aria-controls={`mega-${item.slug}`}
                          onMouseEnter={() => openMegaMenu(item.slug)}
                          onMouseLeave={scheduleMegaClose}
                          onFocus={() => openMegaMenu(item.slug)}
                          onClick={() => {
                            if (openMegaSlug === item.slug) closeMegaMenus();
                            else openMegaMenu(item.slug);
                          }}
                          onKeyDown={(event) => {
                            if (event.key === "ArrowDown") {
                              event.preventDefault();
                              openMegaMenu(item.slug, { focusFirst: true });
                            }
                          }}
                        >
                          <span>{t(item.labelKey)}</span>
                          <ChromeIcon
                            name="chevron"
                            modern
                            size={12}
                            className={`opacity-45 transition-transform duration-200 ${
                              expanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.slug}
                      href={item.href}
                      className={desktopNavClass(item.href, item.featured)}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      onMouseEnter={() => closeMegaMenus()}
                    >
                      {t(item.labelKey)}
                    </Link>
                  );
                })}
              </div>

              <div className="fd-glass-actions">
                {modernUtilityCluster}
                <HeaderIconTip label={mobileOpen ? t("nav.menuClose") : t("nav.menuOpen")} fa={fa}>
                  <button
                    type="button"
                    aria-label={mobileOpen ? t("nav.menuClose") : t("nav.menuOpen")}
                    aria-expanded={mobileOpen}
                    onClick={() => {
                      closeMegaMenus();
                      setMobileOpen((v) => !v);
                    }}
                    className="fd-glass-menu-toggle"
                  >
                    <ChromeIcon name={mobileOpen ? "close" : "menu"} modern size={18} />
                  </button>
                </HeaderIconTip>
              </div>
            </nav>

            {megaNavItems.map((item) => {
              const copy = resolveMegaPanelCopy(item.slug, d, t);
              return (
                <ModernMegaMenu
                  key={item.slug}
                  menuId={`mega-${item.slug}`}
                  open={openMegaSlug === item.slug}
                  fa={fa}
                  pathname={pathname}
                  eyebrow={t(item.labelKey)}
                  title={copy.title}
                  description={copy.description}
                  viewAllLabel={t("nav.megaViewAll")}
                  parentHref={item.href}
                  items={item.children}
                  layout={copy.layout}
                  featured={copy.featured}
                  getLabel={t}
                  getDescription={(child) =>
                    resolveMegaChildDescription(child, item.slug, d, lang)
                  }
                  getIconSlug={resolveMegaIconSlug}
                  onNavigate={() => closeMegaMenus()}
                  onMouseEnter={clearMegaCloseTimer}
                  onMouseLeave={scheduleMegaClose}
                />
              );
            })}

            {(() => {
              const contactCopy = resolveMegaPanelCopy("contactus", d, t);
              return (
                <ModernMegaMenu
                  menuId="mega-contactus"
                  open={openMegaSlug === "contactus"}
                  fa={fa}
                  pathname={pathname}
                  eyebrow={t(CONTACT_CTA.labelKey)}
                  title={contactCopy.title}
                  description={contactCopy.description}
                  viewAllLabel={t("nav.megaViewAll")}
                  parentHref={CONTACT_CTA.href}
                  items={[...CONTACT_CTA.children]}
                  layout={contactCopy.layout}
                  featured={contactCopy.featured}
                  anchored
                  getLabel={t}
                  getDescription={(child) =>
                    resolveMegaChildDescription(child, "contactus", d, lang)
                  }
                  getIconSlug={resolveMegaIconSlug}
                  onNavigate={() => closeMegaMenus()}
                  onMouseEnter={clearMegaCloseTimer}
                  onMouseLeave={scheduleMegaClose}
                />
              );
            })()}
          </div>
        </motion.header>
      ) : (
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: ease.tty }}
          className={`fixed inset-x-0 top-0 z-50 border-b border-paper/20 bg-ink/90 backdrop-blur ${face}`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <Link
              href="/"
              data-brand-mark-anchor
              dir={fa ? "rtl" : "ltr"}
              className={`shrink-0 text-base sm:text-lg ${
                fa ? "font-fa tracking-widest" : "font-pixel tracking-widest"
              }`}
              aria-label={fa ? "اولین دیتا" : "First Data"}
              onClick={closeMobile}
            >
              {wordmark}
            </Link>

            <nav
              className="hidden min-w-0 flex-1 flex-nowrap items-center justify-center gap-1 xl:flex xl:gap-2"
              aria-label={t("nav.menuTitle")}
            >
              {MAIN_NAV.map((item) => {
                if (item.children?.length) {
                  const active = isActive(pathname, item.href);
                  return (
                    <div key={item.slug} className="group relative shrink-0">
                      <Link
                        href={item.href}
                        className={`${desktopNavClass(item.href)} inline-flex items-center gap-1 whitespace-nowrap`}
                        aria-current={active ? "page" : undefined}
                        aria-haspopup="true"
                      >
                        <span className="font-mono text-[11px] text-paper/50">{fd(item.num)}</span>
                        <span className="mx-1 text-paper/35" aria-hidden="true">·</span>
                        <span>{t(item.labelKey)}</span>
                        <ChromeIcon
                          name="chevron"
                          modern={false}
                          size={10}
                          className="opacity-45 transition-transform duration-200 group-hover:rotate-180"
                        />
                      </Link>
                      <div
                        className={`pointer-events-none absolute left-1/2 top-full z-[70] hidden -translate-x-1/2 pt-2 group-hover:pointer-events-auto group-hover:block ${
                          item.slug === "services"
                            ? "min-w-[18rem]"
                            : item.slug === "portfolio" || item.slug === "product"
                              ? "min-w-[16rem]"
                              : "min-w-[12.5rem]"
                        }`}
                      >
                        <TermDropdown
                          items={item.children}
                          fa={fa}
                          pathname={pathname}
                          t={t}
                          menuId={termMenuId(item.slug)}
                          panelClass={dropPanel}
                        />
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.slug}
                    href={item.href}
                    className={`${desktopNavClass(item.href, item.featured)} whitespace-nowrap`}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  >
                    <span className="font-mono text-[11px] text-paper/50">{fd(item.num)}</span>
                    <span className="mx-1 text-paper/35" aria-hidden="true">·</span>
                    <span>{t(item.labelKey)}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-2">
              {!fa ? cartTrigger : null}

              <div ref={contactDesktopRef} className="group relative hidden shrink-0 sm:block">
                <HeaderIconTip label={t(CONTACT_CTA.labelKey)} fa={fa}>
                  <button
                    type="button"
                    aria-label={t(CONTACT_CTA.labelKey)}
                    aria-expanded={contactDesktopOpen || contactActive}
                    aria-haspopup="true"
                    onClick={() => setContactDesktopOpen((open) => !open)}
                    className={`${iconBtn} ${
                      contactDesktopOpen || contactActive
                        ? "border-paper/60 bg-paper/10 text-paper"
                        : ""
                    }`}
                  >
                    <ChromeIcon name="message" modern={false} />
                  </button>
                </HeaderIconTip>
                <div
                  className={`absolute left-1/2 top-full z-[70] min-w-[15rem] -translate-x-1/2 pt-2 ${
                    contactDesktopOpen
                      ? "pointer-events-auto block"
                      : "pointer-events-none hidden group-hover:pointer-events-auto group-hover:block group-focus-within:pointer-events-auto group-focus-within:block"
                  }`}
                >
                  <TermDropdown
                    items={CONTACT_CTA.children}
                    fa={fa}
                    pathname={pathname}
                    t={t}
                    menuId="contact"
                    panelClass={dropPanel}
                    onItemClick={() => setContactDesktopOpen(false)}
                  />
                </div>
              </div>

              {fa ? cartTrigger : null}

              <HeaderIconTip label={t("nav.search")} fa={fa} className="hidden xl:inline-flex">
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(true);
                    setMobileOpen(false);
                  }}
                  aria-label={t("nav.search")}
                  className={iconBtn}
                >
                  <ChromeIcon name="search" modern={false} />
                </button>
              </HeaderIconTip>

              <HeaderIconTip label={themeLabel} fa={fa} className="hidden xl:inline-flex">
                <button type="button" onClick={toggleTheme} aria-label={themeLabel} className={iconBtn}>
                  <ChromeIcon name={isDark ? "sun" : "moon"} modern={false} />
                </button>
              </HeaderIconTip>

              <HeaderIconTip label={t("nav.language")} fa={fa} className="hidden xl:inline-flex">
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={t("nav.language")}
                  className={`${iconBtn} font-mono text-[11px] uppercase`}
                >
                  {lang === "en" ? "فا" : "EN"}
                </button>
              </HeaderIconTip>

              {authUser ? (
                <HeaderIconTip label={`${t("nav.panel")} — ${authUser.name}`} fa={fa} className="hidden xl:inline-flex">
                  <Link href={PANEL_HREF} aria-label={t("nav.panel")} className={iconBtn}>
                    <ChromeIcon name="user" modern={false} />
                  </Link>
                </HeaderIconTip>
              ) : (
                <HeaderIconTip label={t("nav.login")} fa={fa} className="hidden xl:inline-flex">
                  <Link href="/auth/login" aria-label={t("nav.login")} className={iconBtn}>
                    <ChromeIcon name="login" modern={false} />
                  </Link>
                </HeaderIconTip>
              )}

              <HeaderIconTip label={mobileOpen ? t("nav.menuClose") : t("nav.menuOpen")} fa={fa}>
                <button
                  type="button"
                  aria-label={mobileOpen ? t("nav.menuClose") : t("nav.menuOpen")}
                  onClick={() => setMobileOpen((v) => !v)}
                  className={`${iconBtn} xl:hidden`}
                >
                  <ChromeIcon name={mobileOpen ? "close" : "menu"} modern={false} size={18} />
                </button>
              </HeaderIconTip>
            </div>
          </div>
        </motion.header>
      )}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-0 z-40 flex h-[100dvh] min-h-[100dvh] flex-col overflow-hidden xl:hidden ${
              siteModern ? "bg-[var(--bg)]" : "bg-ink"
            }`}
            role="dialog"
            aria-modal="true"
            aria-label={t("nav.menuTitle")}
          >
            <div
              className={`mx-auto flex min-h-0 w-full max-w-lg flex-1 flex-col overflow-y-auto overscroll-contain px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 ${face} ${
                siteModern
                  ? "pt-[calc(5.5rem+env(safe-area-inset-top))]"
                  : "pt-[calc(3.75rem+env(safe-area-inset-top))]"
              }`}
              dir={fa ? "rtl" : "ltr"}
            >
              <p
                className={`mb-4 shrink-0 text-[11px] text-paper/35 ${siteModern ? "font-iran" : "font-mono"}`}
                dir="ltr"
              >
                {siteModern ? (
                  t("nav.menuTitle")
                ) : (
                  <>
                    <span className="text-term/60">fd@menu</span>
                    <span className="text-paper/25"> ~ </span>
                    {t("nav.menuTitle")}
                  </>
                )}
              </p>

              <motion.nav
                variants={listV}
                initial="hidden"
                animate="show"
                className="min-h-0 flex-1 space-y-1"
                aria-label={t("nav.menuTitle")}
              >
                {MAIN_NAV.map((item) => {
                  const active = isActive(pathname, item.href);
                  const hasChildren = Boolean(item.children?.length);
                  const showMobileChildren =
                    hasChildren && (openMobileSubmenu === item.slug || active);

                  return (
                    <motion.div key={item.slug} variants={rowV} className="space-y-0.5">
                      <div className="flex items-stretch gap-1">
                        <Link
                          href={item.href}
                          onClick={closeMobile}
                          className={`flex min-h-[52px] flex-1 items-center gap-3 rounded-lg px-3 py-3 text-lg transition-colors duration-150 ${
                            siteModern ? "font-iran" : fa ? "font-fa normal-case" : ""
                          } ${
                            active
                              ? "bg-term/10 text-paper ring-1 ring-term/25"
                              : "text-paper/85 hover:bg-paper/5 hover:text-paper"
                          } ${item.featured && !active ? "font-medium text-amber/90" : ""}`}
                          aria-current={active ? "page" : undefined}
                        >
                          {!siteModern ? (
                            <span className="w-6 shrink-0 font-mono text-sm text-paper/50">{fd(item.num)}</span>
                          ) : null}
                          <span className="flex-1">{t(item.labelKey)}</span>
                          {active && (
                            <span className="h-2 w-2 shrink-0 rounded-full bg-term" aria-hidden="true" />
                          )}
                        </Link>

                        {hasChildren && (
                          <button
                            type="button"
                            onClick={() =>
                              setOpenMobileSubmenu((open) => (open === item.slug ? null : item.slug))
                            }
                            className="flex min-h-[52px] min-w-[52px] items-center justify-center rounded-lg border border-paper/15 text-paper/60 transition-colors hover:bg-paper/5 hover:text-paper"
                            aria-expanded={showMobileChildren}
                            aria-label={t("nav.submenuToggle")}
                          >
                            <ChromeIcon
                              name="chevron"
                              modern={siteModern}
                              size={14}
                              className={`transition-transform duration-200 ${showMobileChildren ? "rotate-180" : ""}`}
                            />
                          </button>
                        )}
                      </div>

                      {showMobileChildren && item.children && (
                        <div className="mt-1">
                          {siteModern ? (
                            <ModernMegaMobileList
                              items={item.children}
                              fa={fa}
                              pathname={pathname}
                              getLabel={t}
                              getDescription={(child) =>
                                resolveMegaChildDescription(child, item.slug, d, lang)
                              }
                              getIconSlug={resolveMegaIconSlug}
                              onNavigate={closeMobile}
                            />
                          ) : (
                            <TermDropdown
                              items={item.children}
                              fa={fa}
                              pathname={pathname}
                              t={t}
                              menuId={termMenuId(item.slug)}
                              panelClass={dropPanelMobile}
                              onItemClick={closeMobile}
                            />
                          )}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.nav>

              <motion.div variants={rowV} initial="hidden" animate="show" className="mt-4 shrink-0 space-y-0.5">
                <div className="flex items-stretch gap-1">
                  {siteModern ? (
                    <ModernIconButton
                      href={CONTACT_CTA.href}
                      onClick={closeMobile}
                      className="min-h-[52px] w-full flex-1 justify-center font-iran"
                    >
                      {t(CONTACT_CTA.labelKey)}
                    </ModernIconButton>
                  ) : (
                    <Link
                      href={CONTACT_CTA.href}
                      onClick={closeMobile}
                      className={`flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-lg border border-term px-4 py-3 text-base font-medium transition-colors duration-200 ${
                        fa ? "font-fa normal-case" : ""
                      } ${
                        contactActive
                          ? "bg-term text-ink"
                          : "bg-term/15 text-term hover:bg-term hover:text-ink"
                      }`}
                    >
                      {t(CONTACT_CTA.labelKey)}
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => setContactMobileOpen((open) => !open)}
                    className="flex min-h-[52px] min-w-[52px] items-center justify-center rounded-lg border border-term/40 text-term/70 transition-colors hover:bg-term/10 hover:text-term"
                    aria-expanded={contactMobileOpen || contactActive}
                    aria-label={t("nav.submenuToggle")}
                  >
                    <ChromeIcon
                      name="chevron"
                      modern={siteModern}
                      size={14}
                      className={`transition-transform duration-200 ${contactMobileOpen || contactActive ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>

                {(contactMobileOpen || contactActive) && (
                  siteModern ? (
                    <ModernMegaMobileList
                      items={[...CONTACT_CTA.children]}
                      fa={fa}
                      pathname={pathname}
                      getLabel={t}
                      getDescription={(child) =>
                        resolveMegaChildDescription(child, "contactus", d, lang)
                      }
                      getIconSlug={resolveMegaIconSlug}
                      onNavigate={closeMobile}
                    />
                  ) : (
                    <TermDropdown
                      items={CONTACT_CTA.children}
                      fa={fa}
                      pathname={pathname}
                      t={t}
                      menuId="contact"
                      panelClass={dropPanelMobile}
                      onItemClick={closeMobile}
                    />
                  )
                )}
              </motion.div>

              {siteModern ? (
                <div className="fd-glass-mobile-utility mt-5 shrink-0 border-t border-paper/10 pt-4" aria-label={t("nav.menuTitle")}>
                  {authUser ? (
                    <Link href={PANEL_HREF} onClick={closeMobile} aria-label={t("nav.panel")} className="fd-glass-utility-btn">
                      <ChromeIcon name="user" modern size={16} />
                    </Link>
                  ) : (
                    <Link href="/auth/login" onClick={closeMobile} aria-label={t("nav.login")} className="fd-glass-utility-btn">
                      <ChromeIcon name="login" modern size={16} />
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      toggle();
                      closeMobile();
                    }}
                    aria-label={t("nav.language")}
                    className="fd-glass-utility-btn"
                  >
                    <span className="fd-glass-lang-text font-iran">{lang === "en" ? "فا" : "EN"}</span>
                  </button>
                  <button type="button" onClick={toggleTheme} aria-label={themeLabel} className="fd-glass-utility-btn">
                    <ChromeIcon name={isDark ? "sun" : "moon"} modern size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(true);
                      closeMobile();
                    }}
                    aria-label={t("nav.search")}
                    className="fd-glass-utility-btn"
                  >
                    <ChromeIcon name="search" modern size={16} />
                  </button>
                  {cartTrigger}
                </div>
              ) : (
                <div className="mt-5 grid shrink-0 grid-cols-2 gap-2 border-t border-paper/10 pt-4 sm:grid-cols-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(true);
                      closeMobile();
                    }}
                    className={`flex min-h-[44px] flex-col items-center justify-center gap-1 rounded-lg border border-paper/15 px-2 py-2 text-paper/70 transition-colors hover:border-paper/30 hover:bg-paper/5 hover:text-paper ${
                      fa ? "font-fa text-xs" : "font-mono text-[10px] uppercase"
                    }`}
                  >
                    <ChromeIcon name="search" modern={false} size={16} />
                    <span>{t("nav.search")}</span>
                  </button>

                  <button
                    type="button"
                    onClick={toggleTheme}
                    className={`flex min-h-[44px] flex-col items-center justify-center gap-1 rounded-lg border border-paper/15 px-2 py-2 text-paper/70 transition-colors hover:border-paper/30 hover:bg-paper/5 hover:text-paper ${
                      fa ? "font-fa text-xs" : "font-mono text-[10px] uppercase"
                    }`}
                  >
                    <ChromeIcon name={isDark ? "sun" : "moon"} modern={false} size={16} />
                    <span>{themeLabel}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      toggle();
                      closeMobile();
                    }}
                    className={`flex min-h-[44px] flex-col items-center justify-center gap-1 rounded-lg border border-paper/15 px-2 py-2 text-paper/70 transition-colors hover:border-paper/30 hover:bg-paper/5 hover:text-paper ${
                      fa ? "font-fa text-xs" : "font-mono text-[10px] uppercase"
                    }`}
                  >
                    <span className="text-sm">{lang === "en" ? "فا" : "EN"}</span>
                    <span>{t("nav.language")}</span>
                  </button>

                  {authUser ? (
                    <Link
                      href={PANEL_HREF}
                      onClick={closeMobile}
                      className={`flex min-h-[44px] flex-col items-center justify-center gap-1 rounded-lg border border-paper/15 px-2 py-2 text-paper/70 transition-colors hover:border-paper/30 hover:bg-paper/5 hover:text-paper ${
                        fa ? "font-fa text-xs" : "font-mono text-[10px] uppercase"
                      }`}
                    >
                      <ChromeIcon name="user" modern={false} size={16} />
                      <span>{t("nav.panel")}</span>
                    </Link>
                  ) : (
                    <Link
                      href="/auth/login"
                      onClick={closeMobile}
                      className={`flex min-h-[44px] flex-col items-center justify-center gap-1 rounded-lg border border-paper/15 px-2 py-2 text-paper/70 transition-colors hover:border-paper/30 hover:bg-paper/5 hover:text-paper ${
                        fa ? "font-fa text-xs" : "font-mono text-[10px] uppercase"
                      }`}
                    >
                      <ChromeIcon name="login" modern={false} size={16} />
                      <span>{t("nav.login")}</span>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {siteModern ? (
        <ModernSearchCommand open={searchOpen} onClose={() => setSearchOpen(false)} />
      ) : (
        <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      )}
    </>
  );
}
