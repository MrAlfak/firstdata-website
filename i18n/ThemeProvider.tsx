"use client";



import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { scheduleUpdate } from "@/lib/react/schedule-update";



export type Theme = "dark" | "light";



const STORAGE_KEY = "fd-theme";



type Ctx = {

  theme: Theme;

  isDark: boolean;

  setTheme: (theme: Theme) => void;

  toggle: () => void;

};



const ThemeContext = createContext<Ctx | null>(null);



function readStoredTheme(): Theme {

  if (typeof window === "undefined") return "dark";

  const saved = localStorage.getItem(STORAGE_KEY);

  return saved === "light" || saved === "dark" ? saved : "dark";

}



function applyTheme(theme: Theme): void {

  document.documentElement.setAttribute("data-theme", theme);

  const meta = document.querySelector('meta[name="theme-color"]');

  if (meta) {

    meta.setAttribute("content", theme === "light" ? "#eef4e8" : "#080c08");

  }

}



export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // SSR + first client paint must match; inline script in layout.tsx sets data-theme before hydrate.
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme");
    const stored =
      attr === "light" || attr === "dark" ? attr : readStoredTheme();
    scheduleUpdate(() => setThemeState(stored));
  }, []);



  useEffect(() => {

    applyTheme(theme);

  }, [theme]);



  const setTheme = useCallback((next: Theme) => {

    setThemeState(next);

    localStorage.setItem(STORAGE_KEY, next);

    applyTheme(next);

  }, []);



  const toggle = useCallback(() => {

    setThemeState((prev) => {

      const next: Theme = prev === "dark" ? "light" : "dark";

      localStorage.setItem(STORAGE_KEY, next);

      applyTheme(next);

      return next;

    });

  }, []);



  return (

    <ThemeContext.Provider

      value={{ theme, isDark: theme === "dark", setTheme, toggle }}

    >

      {children}

    </ThemeContext.Provider>

  );

}



export function useTheme(): Ctx {

  const ctx = useContext(ThemeContext);

  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");

  return ctx;

}

