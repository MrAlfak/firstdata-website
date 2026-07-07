"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { scheduleUpdate } from "@/lib/react/schedule-update";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useScramble } from "@/motion/useScramble";
import { ease } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import { useTheme } from "@/i18n/ThemeProvider";
import { MAIN_NAV, CONTACT_CTA, PANEL_HREF, type NavChild } from "@/config/navigation";
import type { PublicUser } from "@/lib/auth/types";

const listV = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } } };
const rowV = {
  hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: { duration: 0.2 } }, };

const ICON_BTN =
  "flex h-9 w-9 shrink-0 items-center justify-center border border-paper/30 text-paper/70 transition-colors duration-200 hover:border-paper/60 hover:bg-paper/10 hover:text-paper";

/** CRT panel, always dark, readable on any site theme */
const TERM_PANEL =
  "overflow-hidden rounded border border-[#33ff66]/25 bg-[#080c08] text-[#33ff66] shadow-[0_16px_48px_rgba(0,0,0,0.65)]";
const TERM_PANEL_MOBILE =
  "overflow-hidden rounded border border-[#33ff66]/25 bg-[#080c08] text-[#33ff66]";
const TERM_CHROME =
  "flex items-center gap-1.5 border-b border-[#33ff66]/15 bg-[#0c120c] px-3 py-2";
const TERM_ROW =
  "flex w-full items-center gap-2 px-3 py-2.5 text-[13px] transition-colors duration-150 text-[#33ff66]/75 hover:bg-[#33ff66]/[0.07] hover:text-[#33ff66]";
const TERM_ROW_ACTIVE = "bg-[#33ff66]/15 text-[#33ff66]";

function termTreeMark(last: boolean, rtl = false): string {
  if (rtl) return last ? "─┘" : "─┤";
  return last ? "└─" : "├─";
}

function TermChromeTitle({ fa, menuId }: { fa: boolean; menuId: string }) {
  const dots = (
    <div className="flex shrink-0 items-center gap-1.5">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5a5a]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#ffb020]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#33ff66]" />
    </div>
  );

  const title = (
    <span className="flex-1 font-mono text-[9px] text-[#33ff66]/45 text-end" dir="ltr">
      {menuId}.menu
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
  href, label, mark, active, fa, onClick, }: {
  href: string;
  label: string;
  mark: string;
  active: boolean;
  fa: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      role="menuitem"
      onClick={onClick}
      dir="ltr"
      className={`${TERM_ROW} ${active ? TERM_ROW_ACTIVE : ""} ${
        fa ? "justify-end font-fa normal-case" : "justify-start font-mono"
      }`}
      aria-current={active ? "page" : undefined}
    >
      {fa ? (
        <>
          <span>{label}</span>
          <span className="shrink-0 font-mono text-[10px] text-[#33ff66]/30">{mark}</span>
        </>
      ) : (
        <>
          <span className="shrink-0 font-mono text-[10px] text-[#33ff66]/30">{mark}</span>
          <span>{label}</span>
        </>
      )}
    </Link>
  );
}

function TermPrompt({ fa, menuId }: { fa: boolean; menuId: string }) {
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
  items, fa, pathname, t, menuId, panelClass = TERM_PANEL, onItemClick, }: {
  items: NavChild[];
  fa: boolean;
  pathname: string;
  t: (key: string) => string;
  menuId: string;
  panelClass?: string;
  onItemClick?: () => void;
}) {
  return (
    <div className={panelClass} dir={fa ? "rtl" : "ltr"}>
      <TermChromeTitle fa={fa} menuId={menuId} />
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
            onClick={onItemClick}
          />
        );
      })}
      <TermPrompt fa={fa} menuId={menuId} />
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
  const { t, lang, fa, toggle, fd } = useT();
  const { isDark, toggle: toggleTheme } = useTheme();
  const pathname = usePathname();
  const [wordmarkStart, setWordmarkStart] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const [contactMobileOpen, setContactMobileOpen] = useState(false);
  const [authUser, setAuthUser] = useState<PublicUser | null>(null);

  const themeLabel = isDark ? t("nav.themeLight") : t("nav.themeDark");
  const contactActive = isActive(pathname, CONTACT_CTA.href);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => setAuthUser(data.user ?? null))
      .catch(() => setAuthUser(null));
  }, [pathname]);

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1280) setMobileOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    scheduleUpdate(() => setOpenMobileSubmenu(null));
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

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
    fa ? ">اولین دیتا" : ">FIRST DATA", { start: wordmarkStart, duration: 700 }
  );

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenMobileSubmenu(null);
    setContactMobileOpen(false);
  };

  const desktopNavClass = (href: string, featured?: boolean) => {
    const active = isActive(pathname, href);
    return [
      "rounded px-2.5 py-1.5 text-sm transition-colors duration-200", fa ? "font-fa normal-case tracking-normal" : "tracking-wide", active
        ? "bg-term/10 text-paper ring-1 ring-term/30"
        : "text-paper/65 hover:bg-paper/5 hover:text-paper", featured && !active ? "font-medium text-amber/90" : "", ].join(" ");
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: ease.tty }}
        className="fixed inset-x-0 top-0 z-50 border-b border-paper/20 bg-ink/90 backdrop-blur"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">

          <Link
            href="/"
            dir={fa ? "rtl" : "ltr"}
            className={`shrink-0 text-base tracking-widest sm:text-lg ${fa ? "font-fa" : "font-pixel"}`}
            aria-label={fa ? "اولین دیتا" : "First Data"}
            onClick={closeMobile}
          >
            {wordmark}
          </Link>

          {/* Desktop, readable labels, dim numbers, services highlighted */}
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
                      <span className="font-mono text-[10px] text-paper/35">{fd(item.num)}</span>
                      <span className="mx-1 text-paper/25" aria-hidden="true">·</span>
                      <span>{t(item.labelKey)}</span>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                        className="opacity-45 transition-transform duration-200 group-hover:rotate-180"
                      >
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>

                    {/* Hover bridge, centered under «درباره ما» */}
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
                  <span className="font-mono text-[10px] text-paper/35">{fd(item.num)}</span>
                  <span className="mx-1 text-paper/25" aria-hidden="true">·</span>
                  <span>{t(item.labelKey)}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            {/* Contact CTA + terminal submenu */}
            <div className="group relative hidden shrink-0 sm:block">
              <Link
                href={CONTACT_CTA.href}
                className={`inline-flex items-center gap-1 rounded border px-3 py-2 text-sm transition-colors duration-200 ${
                  fa ? "font-fa normal-case" : "tracking-wide"
                } ${
                  contactActive
                    ? "border-term bg-term text-ink"
                    : "border-term/60 bg-term/15 text-term hover:bg-term hover:text-ink"
                }`}
                aria-current={contactActive ? "page" : undefined}
                aria-haspopup="true"
              >
                <span className="font-mono text-[10px] opacity-70">{fd(CONTACT_CTA.num)}</span>
                {t(CONTACT_CTA.labelKey)}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="opacity-60 transition-transform duration-200 group-hover:rotate-180"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              <div className="pointer-events-none absolute left-1/2 top-full z-[70] hidden min-w-[15rem] -translate-x-1/2 pt-2 group-hover:pointer-events-auto group-hover:block">
                <TermDropdown
                  items={CONTACT_CTA.children}
                  fa={fa}
                  pathname={pathname}
                  t={t}
                  menuId="contact"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={themeLabel}
              title={themeLabel}
              className={ICON_BTN}
            >
              {isDark ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M21 14.5A7.5 7.5 0 0 1 9.5 3a6 6 0 1 0 8.5 11.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={toggle}
              aria-label={t("nav.language")}
              title={t("nav.language")}
              className={`${ICON_BTN} font-mono text-[11px] uppercase`}
            >
              {lang === "en" ? "فا" : "EN"}
            </button>

            {authUser ? (
              <Link
                href={PANEL_HREF}
                aria-label={t("nav.panel")}
                title={`${t("nav.panel")} — ${authUser.name}`}
                className={`${ICON_BTN} hidden sm:flex`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Link>
            ) : (
              <Link
                href="/auth/login"
                aria-label={t("nav.login")}
                title={t("nav.login")}
                className={`hidden rounded border border-paper/30 px-3 py-2 text-xs text-paper/70 transition-colors hover:border-paper/50 hover:text-paper sm:inline-flex ${fa ? "font-fa" : "font-mono uppercase tracking-wide"}`}
              >
                {t("nav.login")}
              </Link>
            )}

            <button
              type="button"
              aria-label={mobileOpen ? (fa ? "بستن منو" : "Close menu") : (fa ? "باز کردن منو" : "Open menu")}
              onClick={() => setMobileOpen((v) => !v)}
              className={`${ICON_BTN} flex-col gap-1.5 xl:hidden`}
            >
              <span className={`block h-px w-4 bg-current transition-all duration-200 ${mobileOpen ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`block h-px w-4 bg-current transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px w-4 bg-current transition-all duration-200 ${mobileOpen ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 top-[53px] z-40 max-h-[calc(100vh-53px)] overflow-y-auto border-b border-paper/20 bg-ink/95 backdrop-blur xl:hidden"
          >
            <div className="mx-auto max-w-lg px-4 py-5 sm:px-6" dir={fa ? "rtl" : "ltr"}>
              {/* Decorative terminal line only */}
              <p className="mb-4 font-mono text-[11px] text-paper/35" dir="ltr">
                <span className="text-term/60">fd@menu</span>
                <span className="text-paper/25"> ~ </span>
                {t("nav.menuTitle")}
              </p>

              <motion.nav
                variants={listV}
                initial="hidden"
                animate="show"
                className="space-y-1"
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
                          className={`flex min-h-[48px] flex-1 items-center gap-3 rounded-lg px-3 py-3 text-base transition-colors duration-150 ${
                            fa ? "font-fa normal-case" : ""
                          } ${
                            active
                              ? "bg-term/10 text-paper ring-1 ring-term/25"
                              : "text-paper/75 hover:bg-paper/5 hover:text-paper"
                          } ${item.featured && !active ? "font-medium text-amber/90" : ""}`}
                          aria-current={active ? "page" : undefined}
                        >
                          <span className="w-6 shrink-0 font-mono text-xs text-paper/35">{fd(item.num)}</span>
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
                            className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-lg border border-paper/15 text-paper/60 transition-colors hover:bg-paper/5 hover:text-paper"
                            aria-expanded={showMobileChildren}
                            aria-label={fa ? "نمایش زیرمنو" : "Toggle submenu"}
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              aria-hidden="true"
                              className={`transition-transform duration-200 ${showMobileChildren ? "rotate-180" : ""}`}
                            >
                              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        )}
                      </div>

                      {showMobileChildren && item.children && (
                        <div className="mt-1">
                          <TermDropdown
                            items={item.children}
                            fa={fa}
                            pathname={pathname}
                            t={t}
                            menuId={termMenuId(item.slug)}
                            panelClass={TERM_PANEL_MOBILE}
                            onItemClick={closeMobile}
                          />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.nav>

              <motion.div variants={rowV} initial="hidden" animate="show" className="mt-4 space-y-0.5">
                <div className="flex items-stretch gap-1">
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
                  <button
                    type="button"
                    onClick={() => setContactMobileOpen((open) => !open)}
                    className="flex min-h-[52px] min-w-[52px] items-center justify-center rounded-lg border border-term/40 text-term/70 transition-colors hover:bg-term/10 hover:text-term"
                    aria-expanded={contactMobileOpen || contactActive}
                    aria-label={fa ? "نمایش زیرمنوی تماس" : "Toggle Contact submenu"}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className={`transition-transform duration-200 ${contactMobileOpen || contactActive ? "rotate-180" : ""}`}
                    >
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                {(contactMobileOpen || contactActive) && (
                  <TermDropdown
                    items={CONTACT_CTA.children}
                    fa={fa}
                    pathname={pathname}
                    t={t}
                    menuId="contact"
                    panelClass={TERM_PANEL_MOBILE}
                    onItemClick={closeMobile}
                  />
                )}
              </motion.div>

              {/* Utility row with readable labels */}
              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-paper/10 pt-4">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className={`flex min-h-[44px] flex-col items-center justify-center gap-1 rounded-lg border border-paper/15 px-2 py-2 text-paper/70 transition-colors hover:border-paper/30 hover:bg-paper/5 hover:text-paper ${
                    fa ? "font-fa text-xs" : "font-mono text-[10px] uppercase"
                  }`}
                >
                  {isDark ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M21 14.5A7.5 7.5 0 0 1 9.5 3a6 6 0 1 0 8.5 11.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                  )}
                  <span>{themeLabel}</span>
                </button>

                <button
                  type="button"
                  onClick={() => { toggle(); closeMobile(); }}
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
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
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
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 3v18M5 10h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span>{t("nav.login")}</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-ink/60 xl:hidden"
            onClick={closeMobile}
          />
        )}
      </AnimatePresence>
    </>
  );
}
