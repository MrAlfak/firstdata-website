"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { CrossingAtmosphere } from "./CrossingAtmosphere";

type Props = {
  children: ReactNode;
  status: string;
  locale: "fa" | "en";
  exiting?: boolean;
  intensity?: "low" | "mid" | "high";
  reducedMotion?: boolean;
  className?: string;
};

function clearShellLock(shell: HTMLElement, prevBusy: string | null) {
  if (prevBusy) shell.setAttribute("aria-busy", prevBusy);
  else shell.removeAttribute("aria-busy");
  shell.removeAttribute("inert");
  shell.removeAttribute("aria-hidden");
  document.documentElement.removeAttribute("data-crossing");
}

/** Full-viewport crossing overlay via portal (above route layouts). */
export function CrossingPortal({
  children,
  status,
  locale,
  exiting = false,
  intensity = "mid",
  reducedMotion = false,
  className,
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const shell = document.getElementById("site-shell") ?? document.body;
    const prevBusy = shell.getAttribute("aria-busy");
    let safety: number | undefined;

    const frame = requestAnimationFrame(() => {
      shell.setAttribute("aria-busy", "true");
      if (shell !== document.body) {
        shell.setAttribute("inert", "");
        shell.setAttribute("aria-hidden", "true");
      }
      document.documentElement.setAttribute("data-crossing", "1");
      safety = window.setTimeout(() => clearShellLock(shell, prevBusy), 18_000);
    });

    return () => {
      cancelAnimationFrame(frame);
      if (safety) clearTimeout(safety);
      clearShellLock(shell, prevBusy);
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <motion.div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-busy={!exiting}
      aria-label={status}
      dir={locale === "fa" ? "rtl" : "ltr"}
      className={[
        "fd-crossing-overlay fixed inset-0 z-[10000] isolate overflow-hidden",
        "bg-ink text-paper",
        exiting ? "pointer-events-none" : "",
        className ?? "",
      ].join(" ")}
      initial={{ opacity: 0 }}
      animate={{
        opacity: exiting ? 0 : 1,
        scale: exiting ? 0.988 : 1,
      }}
      transition={{ duration: exiting ? 0.48 : 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <CrossingAtmosphere intensity={intensity} reducedMotion={reducedMotion} />
      <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-6 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
        {children}
      </div>
      <span className="sr-only">{status}</span>
    </motion.div>,
    document.body,
  );
}
