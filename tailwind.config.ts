import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    screens: {
      xs: "360px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        ink: "rgb(var(--c-bg) / <alpha-value>)",
        paper: "rgb(var(--c-fg) / <alpha-value>)",
        term: {
          DEFAULT: "rgb(var(--c-accent) / <alpha-value>)",
          dim: "rgb(var(--c-dim) / <alpha-value>)",
        },
        amber: "rgb(var(--c-amber) / <alpha-value>)",
        terr: "rgb(var(--c-error) / <alpha-value>)",
      },
      fontFamily: {
        mono: [
          "RooyinDigits",
          "Rooyin",
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
        pixel: ["RooyinDigits", "Rooyin", "var(--font-pixel)", "var(--font-mono)", "monospace"],
        fa: ["Rooyin", "Tahoma", "sans-serif"],
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        scanline: {
          "0%": { transform: "translateY(-2px)" },
          "100%": { transform: "translateY(100vh)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.25" },
        },
        "clock-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "scroll-caret": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(4px)", opacity: "0.3" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        blink: "blink 1s steps(1) infinite",
        scanline: "scanline 8s linear infinite",
        marquee: "marquee 22s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
        "clock-scroll": "clock-scroll 3s linear infinite",
        "scroll-caret": "scroll-caret 1.2s steps(2, end) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
