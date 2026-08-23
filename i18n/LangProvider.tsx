"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { AnimatePresence } from "motion/react";
import { dictionaries, type Lang } from "./dictionaries";
import { localizedDictionaries } from "./localized";
import { panelDictionaries, type PanelUi } from "./panel";
import { adminDictionaries, type AdminUi } from "./admin";
import { formatDigits } from "@/lib/i18n/digits";
import LangTransition from "@/components/LangTransition";
import { LANG_CHANGE_EVENT } from "@/lib/console-brand";
import { LANG_STORAGE_KEY } from "@/lib/i18n/lang-cookie";

type DictType = (typeof dictionaries)[Lang];

type Ctx = {
  lang: Lang;
  fa: boolean;
  dir: "ltr" | "rtl";
  setLang: (l: Lang) => void;
  toggle: () => void;
  /** Translate a dotted key, e.g. t("hero.slogan") */
  t: (key: string) => string;
  /** Format digits for the active locale (Persian numerals when fa). */
  fd: (value: string | number) => string;
  /** Panel UI strings */
  p: PanelUi;
  /** Staff admin UI strings */
  a: AdminUi;
  /** Full typed dictionary for the active language — use for arrays/objects */
  d: DictType;
};

const LangContext = createContext<Ctx | null>(null);

function resolve(lang: Lang, key: string): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let node: any = localizedDictionaries[lang];
  for (const part of key.split(".")) {
    node = node?.[part];
    if (node == null) return key;
  }
  return typeof node === "string" ? node : key;
}

function persistLang(l: Lang) {
  localStorage.setItem(LANG_STORAGE_KEY, l);
  document.cookie = `${LANG_STORAGE_KEY}=${l};path=/;max-age=31536000;SameSite=Lax`;
}

type Props = {
  children: ReactNode;
  /** Server-resolved language (cookie / default fa) — SSR is source of truth */
  initialLang?: Lang;
};

export function LangProvider({ children, initialLang = "fa" }: Props) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [switching, setSwitching] = useState(false);
  const [txKey, setTxKey] = useState(0);
  const txTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep client storage aligned with SSR — never override UI from stale localStorage
  // (that was causing English→Persian / Persian→English flashes on first paint).
  useEffect(() => {
    persistLang(initialLang);
    if (lang !== initialLang) {
      setLangState(initialLang);
    }
    // Only re-sync when the server seed changes (navigation with new cookie)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLang]);

  const playTransition = useCallback(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    setTxKey((k) => k + 1);
    setSwitching(true);
    if (txTimer.current) clearTimeout(txTimer.current);
    txTimer.current = setTimeout(() => setSwitching(false), 1700);
  }, []);

  useEffect(
    () => () => {
      if (txTimer.current) clearTimeout(txTimer.current);
    },
    [],
  );

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback(
    (l: Lang) => {
      setLangState((prev) => {
        if (prev !== l) playTransition();
        return l;
      });
      persistLang(l);
      window.dispatchEvent(new CustomEvent(LANG_CHANGE_EVENT, { detail: { fa: l === "fa" } }));
    },
    [playTransition],
  );

  const toggle = useCallback(() => {
    playTransition();
    setLangState((prev) => {
      const next: Lang = prev === "en" ? "fa" : "en";
      persistLang(next);
      window.dispatchEvent(new CustomEvent(LANG_CHANGE_EVENT, { detail: { fa: next === "fa" } }));
      return next;
    });
  }, [playTransition]);

  const fa = lang === "fa";
  const value: Ctx = {
    lang,
    fa,
    dir: fa ? "rtl" : "ltr",
    setLang,
    toggle,
    t: (key) => resolve(lang, key),
    fd: (value) => formatDigits(value, fa),
    d: localizedDictionaries[lang],
    p: panelDictionaries[lang],
    a: adminDictionaries[lang],
  };

  return (
    <LangContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {switching && <LangTransition key={txKey} fa={fa} />}
      </AnimatePresence>
    </LangContext.Provider>
  );
}

export function useT(): Ctx {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useT must be used within <LangProvider>");
  return ctx;
}
