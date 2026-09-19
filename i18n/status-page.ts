import type { Lang } from "./dictionaries";

export type StatusPageUi = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  lead: string;
  overallOk: string;
  overallDegraded: string;
  loading: string;
  refresh: string;
  version: string;
  latency: string;
  authDb: string;
  lastCheck: string;
  operational: string;
  down: string;
};

export const statusPageDictionaries: Record<Lang, StatusPageUi> = {
  en: {
    metaTitle: "System status",
    metaDescription: "Live health of First Data site services — API and auth database.",
    title: "System status",
    lead: "Lightweight checks for the public site and client panel auth store.",
    overallOk: "All systems operational",
    overallDegraded: "Degraded — investigating",
    loading: "Checking…",
    refresh: "Refresh",
    version: "App version",
    latency: "Check latency",
    authDb: "Auth database",
    lastCheck: "Last check",
    operational: "Operational",
    down: "Unavailable",
  },
  fa: {
    metaTitle: "وضعیت سیستم",
    metaDescription: "وضعیت زنده سرویس‌های سایت اولین دیتا — API و پایگاه احراز هویت.",
    title: "وضعیت سیستم",
    lead: "بررسی سبک سرویس‌های عمومی سایت و ذخیره‌سازی احراز هویت پنل.",
    overallOk: "همه سیستم‌ها عملیاتی‌اند",
    overallDegraded: "اختلال — در حال بررسی",
    loading: "در حال بررسی…",
    refresh: "بروزرسانی",
    version: "نسخه اپ",
    latency: "تأخیر بررسی",
    authDb: "پایگاه احراز هویت",
    lastCheck: "آخرین بررسی",
    operational: "عملیاتی",
    down: "در دسترس نیست",
  },
};
