"use client";

import { useEffect } from "react";
import { useT } from "@/i18n/LangProvider";
import { LANG_CHANGE_EVENT, printConsoleBrand } from "@/lib/console-brand";

export default function ConsoleBrand() {
  const { fa, lang } = useT();

  useEffect(() => {
    printConsoleBrand(fa);
  }, [fa, lang]);

  useEffect(() => {
    const onLangChange = (event: Event) => {
      const detail = (event as CustomEvent<{ fa: boolean }>).detail;
      if (detail) printConsoleBrand(detail.fa, true);
    };
    window.addEventListener(LANG_CHANGE_EVENT, onLangChange);
    return () => window.removeEventListener(LANG_CHANGE_EVENT, onLangChange);
  }, []);

  return null;
}
