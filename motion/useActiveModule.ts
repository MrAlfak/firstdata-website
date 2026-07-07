"use client";

import { useState, useEffect } from "react";

export const MODULE_IDS = ["01", "02", "03", "04", "05", "06", "07", "08"];

/**
 * Single source of truth for scroll-spy. One scroll listener, shared by
 * Header nav + SectionSidebar. Returns the active module id ("01".."08"
 * or "--") and whether the viewer has scrolled past the hero.
 */
export function useActiveModule() {
  const [active, setActive]   = useState("--");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight * 0.45;
      let current = "";
      for (const id of MODULE_IDS) {
        const el = document.getElementById(`module-${id}`);
        if (el && el.offsetTop <= mid) current = id;
      }
      setActive(current || "--");
      setVisible(window.scrollY > 80);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { active, visible };
}
