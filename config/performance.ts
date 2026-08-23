/**
 * Manual performance snapshot for the footer badge.
 * Update after a real Lighthouse run on production.
 */
export const PERFORMANCE = {
  /** Lighthouse Performance score 0–100 */
  score: 92,
  /** Largest Contentful Paint (seconds) */
  lcp: 1.8,
  /** Cumulative Layout Shift */
  cls: 0.02,
  /** Label shown in footer badge */
  label: {
    en: "Perf 92",
    fa: "پرف ۹۲",
  },
  /** Tooltip / title */
  title: {
    en: "Lighthouse Performance ~92 · LCP 1.8s · CLS 0.02 (manual snapshot)",
    fa: "Lighthouse Performance حدود ۹۲ · LCP ۱٫۸ث · CLS ۰٫۰۲ (اسنپ‌شات دستی)",
  },
} as const;
