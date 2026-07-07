"use client";

import { useEffect, useState } from "react";
import RouteLoadingShell from "@/components/navigation/RouteLoadingShell";
import { useT } from "@/i18n/LangProvider";

/** Suspense fallback, matches in-app route preloader styling. */
export default function RouteLoadingFallback() {
  const { fa, dir, lang, d } = useT();
  const [revealed, setRevealed] = useState(1);
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    let step = 1;
    const id = setInterval(() => {
      step += 1;
      setRevealed((r) => Math.min(d.navPreloader.steps.length, r + 1));
      setProgress((p) => Math.min(88, p + 14));
      if (step >= d.navPreloader.steps.length) clearInterval(id);
    }, 130);
    return () => clearInterval(id);
  }, [d.navPreloader.steps.length]);

  return (
    <RouteLoadingShell
      lang={lang}
      fa={fa}
      dir={dir}
      routeLine={d.navPreloader.loading("…")}
      steps={d.navPreloader.steps}
      revealed={revealed}
      progress={progress}
      mode="inline"
    />
  );
}
