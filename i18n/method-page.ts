import type { Lang } from "./dictionaries";

export type MethodPageUi = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  steps: { title: string; body: string; outcome: string }[];
  ctaPrimary: string;
  ctaSecondary: string;
  navLabel: string;
};

export const methodPageDictionaries: Record<Lang, MethodPageUi> = {
  fa: {
    metaTitle: "روش کار",
    metaDescription: "مسیر واقعی همکاری با اولین دیتا — از کشف تا تحویل و پشتیبانی.",
    eyebrow: "// روش کار",
    title: "چطور پروژه را جلو می‌بریم",
    lead: "یک مسیر شفاف با خروجی قابل اندازه‌گیری در هر مرحله — بدون غافلگیری در انتهای مسیر.",
    steps: [
      {
        title: "کشف و محدوده",
        body: "اهداف کسب‌وکار، محدودیت‌ها و اولویت‌ها را هم‌تراز می‌کنیم و scope قابل اندازه‌گیری می‌نویسیم.",
        outcome: "خروجی: brief + معیار موفقیت",
      },
      {
        title: "طراحی و تأیید",
        body: "جریان‌های کلیدی و UI را قبل از کدنویسی سنگین با شما قفل می‌کنیم.",
        outcome: "خروجی: wireframe / پروتوتایپ تأییدشده",
      },
      {
        title: "ساخت تکراری",
        body: "اسپرینت‌های کوتاه با دمو قابل لمس؛ اولویت با ارزشمندترین مسیر کاربر.",
        outcome: "خروجی: بیلدهای هفتگی روی محیط staging",
      },
      {
        title: "راه‌اندازی",
        body: "دیپلوی، مانیتورینگ اولیه و چک‌لیست go-live — نه فقط «آپلود فایل».",
        outcome: "خروجی: production + handover",
      },
      {
        title: "پشتیبانی و رشد",
        body: "تیکت، SLA و بهبود مستمر روی همان محصول — نه پروژه یک‌بارمصرف.",
        outcome: "خروجی: کانال پشتیبانی + بک‌لاگ روشن",
      },
    ],
    ctaPrimary: "درخواست پروژه",
    ctaSecondary: "مشاوره رایگان",
    navLabel: "روش کار",
  },
  en: {
    metaTitle: "How we work",
    metaDescription: "The real First Data delivery path — from discovery to launch and support.",
    eyebrow: "// method",
    title: "How we move a project forward",
    lead: "A clear path with measurable outputs at each stage — no end-of-project surprises.",
    steps: [
      {
        title: "Discovery & scope",
        body: "We align business goals, constraints, and priorities into a measurable scope.",
        outcome: "Output: brief + success metrics",
      },
      {
        title: "Design & lock",
        body: "Key flows and UI are approved before heavy engineering.",
        outcome: "Output: signed-off wireframes / prototype",
      },
      {
        title: "Iterative build",
        body: "Short sprints with tangible demos; highest-value user paths first.",
        outcome: "Output: weekly staging builds",
      },
      {
        title: "Launch",
        body: "Deploy, early monitoring, and a real go-live checklist — not just a file upload.",
        outcome: "Output: production + handover",
      },
      {
        title: "Support & growth",
        body: "Tickets, SLA, and continuous improvement on the same product.",
        outcome: "Output: support channel + clear backlog",
      },
    ],
    ctaPrimary: "Request a project",
    ctaSecondary: "Free consultation",
    navLabel: "How we work",
  },
};
