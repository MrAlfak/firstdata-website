"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useT } from "@/i18n/LangProvider";
import PanelSkinToggle, {
  applyPanelSkin,
  reconcileSkinWithAccount,
  usePanelSkin,
} from "@/components/panel/PanelSkinToggle";
import { parseSkinFromSearchParams } from "@/lib/i18n/panel-skin";

/**
 * Site-wide Business / Builder (modern / 56K) skin:
 * - keeps `data-panel-skin` on <html> for every route
 * - mounts the fixed bottom-left FAB
 * - honors ?skin= / ?view= campaign entry (boot script + hydrate), then preference
 * - reconciles signed-in account with localStorage (local wins)
 */
export default function SiteSkinRoot() {
  const pathname = usePathname() || "/";
  const { p, t, dir } = useT();
  const [skin] = usePanelSkin();
  const isEmbed = pathname.startsWith("/embed");

  // Campaign / share links: apply skin from query and persist as preference.
  // Boot script already paints first frame; this keeps React + storage in sync.
  useEffect(() => {
    if (isEmbed || typeof window === "undefined") return;
    const fromQuery = parseSkinFromSearchParams(
      new URLSearchParams(window.location.search),
    );
    if (!fromQuery) return;
    applyPanelSkin(fromQuery, { syncAccount: true });
  }, [isEmbed, pathname]);

  useEffect(() => {
    if (isEmbed) return;
    const root = document.documentElement;
    // Preloader locks skin via data-preloader-skin — don't overwrite mid-boot.
    if (root.hasAttribute("data-preloader")) {
      const locked = root.getAttribute("data-preloader-skin");
      if (locked === "terminal" || locked === "modern") {
        root.setAttribute("data-panel-skin", locked);
      }
    } else {
      root.setAttribute("data-panel-skin", skin);
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    const theme = root.getAttribute("data-theme");
    const effective =
      root.getAttribute("data-panel-skin") === "terminal" ? "terminal" : "modern";
    if (effective === "modern") {
      meta?.setAttribute("content", theme === "light" ? "#f5f7f6" : "#0f1211");
    } else {
      meta?.setAttribute("content", theme === "light" ? "#eef4e8" : "#080c08");
    }
  }, [skin, isEmbed]);

  useEffect(() => {
    if (isEmbed) return;
    let cancelled = false;

    const sync = () => {
      fetch("/api/auth/me")
        .then((r) => r.json())
        .then((data) => {
          if (cancelled || !data?.user) return;
          reconcileSkinWithAccount(data.user.panelSkin);
        })
        .catch(() => {
          /* guest / offline */
        });
    };

    // Wait until first-load preloader finishes so account reconcile doesn't
    // flip visuals mid-boot. Skip reconcile when campaign query forces a skin.
    const campaignSkin =
      typeof window !== "undefined"
        ? parseSkinFromSearchParams(new URLSearchParams(window.location.search))
        : null;
    if (campaignSkin) return;

    if (document.documentElement.hasAttribute("data-preloader")) {
      const observer = new MutationObserver(() => {
        if (!document.documentElement.hasAttribute("data-preloader")) {
          observer.disconnect();
          sync();
        }
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-preloader"],
      });
      return () => {
        cancelled = true;
        observer.disconnect();
      };
    }

    sync();
    return () => {
      cancelled = true;
    };
  }, [isEmbed]);

  if (isEmbed) return null;

  return (
    <PanelSkinToggle
      dir={dir}
      labels={{
        enterAi: p.skin.enterAi,
        back56k: p.skin.back56k,
        fabEnter: p.skin.fabEnter,
        fabBack: p.skin.fabBack,
        assemble: p.skin.assemble,
        reconnect: p.skin.reconnect,
        brand: t("hero.brand"),
        horizonStatus: p.skin.horizonStatus,
        horizonReady: p.skin.horizonReady,
        horizonBeat: p.skin.horizonBeat,
        horizonAwaken: p.skin.horizonAwaken,
        horizonTag: p.skin.horizonTag,
        horizonTagReady: p.skin.horizonTagReady,
      }}
    />
  );
}
