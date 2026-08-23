import type { ProductSlug } from "@/i18n/product-page";
import type { Lang } from "@/i18n/dictionaries";

export type ProductCaseStudyDeep = {
  challenge: string;
  approach: string;
  metrics: { label: string; value: string }[];
  stack: string[];
};

const CASES: Record<Lang, Record<ProductSlug, ProductCaseStudyDeep>> = {
  fa: {
    web: {
      challenge: "محتوا وابسته به توسعه‌دهنده بود و سرنخ‌ها در چند کانال پراکنده می‌شد.",
      approach: "CMS اختصاصی، فرم‌های یکپارچه با CRM، و مسیر انتشار هفتگی با پایش Core Web Vitals.",
      metrics: [
        { label: "زمان انتشار", value: "−۶۰٪" },
        { label: "Lighthouse", value: "۹۰+" },
        { label: "سرنخ به CRM", value: "خودکار" },
      ],
      stack: ["Next.js", "TypeScript", "SQLite", "Tailwind"],
    },
    mobile: {
      challenge: "تیم میدانی فقط در دفتر همگام می‌شد و گزارش‌ها دیر می‌رسید.",
      approach: "صف آفلاین، push status، و یک codebase برای Android/iOS با sync کنترل‌شده.",
      metrics: [
        { label: "گزارش همان‌روز", value: "✓" },
        { label: "کار آفلاین", value: "✓" },
        { label: "کدبیس", value: "۱" },
      ],
      stack: ["React Native", "Kotlin", "Push", "REST"],
    },
    windows: {
      challenge: "شعب با USB آپدیت می‌شدند و لاگ audit وجود نداشت.",
      approach: "نصب MSI/GPO، به‌روزرسانی کنترل‌شده، و کلاینت دسکتاپ متصل به API مرکزی.",
      metrics: [
        { label: "نصب متمرکز", value: "AD/GPO" },
        { label: "Audit log", value: "✓" },
        { label: "Sync شعبه", value: "روزانه" },
      ],
      stack: [".NET", "WPF", "REST", "SQLite"],
    },
    ai: {
      challenge: "پاسخ‌های دستی پشتیبانی کند و بدون زمینهٔ تیکت بود.",
      approach: "دستیار با زمینه تیکت/فاکتور، محدودیت نقش، و مسیر escalation به انسان.",
      metrics: [
        { label: "زمان پاسخ اول", value: "−۴۰٪" },
        { label: "Escalation", value: "قابل ردیابی" },
        { label: "دسترسی نقش", value: "✓" },
      ],
      stack: ["Next.js", "LLM API", "RBAC", "Panel"],
    },
    platforms: {
      challenge: "چند سیستم جدا بدون هویت و همگام‌سازی واحد.",
      approach: "هاب API، احراز هویت یکپارچه، و همگام‌سازی رویدادمحور بین سرویس‌ها.",
      metrics: [
        { label: "سیستم‌های وصل", value: "۴+" },
        { label: "SSO/Auth", value: "✓" },
        { label: "رویدادها", value: "Webhook" },
      ],
      stack: ["API Gateway", "Auth", "Queues", "Postgres"],
    },
  },
  en: {
    web: {
      challenge: "Content depended on developers and leads were scattered across channels.",
      approach: "Custom CMS, CRM-bound forms, weekly release path with Core Web Vitals monitoring.",
      metrics: [
        { label: "Publish time", value: "−60%" },
        { label: "Lighthouse", value: "90+" },
        { label: "CRM intake", value: "Auto" },
      ],
      stack: ["Next.js", "TypeScript", "SQLite", "Tailwind"],
    },
    mobile: {
      challenge: "Field teams only synced at the office; reports arrived late.",
      approach: "Offline queue, push status, and one Android/iOS codebase with controlled sync.",
      metrics: [
        { label: "Same-day reports", value: "✓" },
        { label: "Offline work", value: "✓" },
        { label: "Codebases", value: "1" },
      ],
      stack: ["React Native", "Kotlin", "Push", "REST"],
    },
    windows: {
      challenge: "Branches updated via USB with no audit trail.",
      approach: "MSI/GPO install, controlled updates, desktop client on a central API.",
      metrics: [
        { label: "Central install", value: "AD/GPO" },
        { label: "Audit log", value: "✓" },
        { label: "Branch sync", value: "Daily" },
      ],
      stack: [".NET", "WPF", "REST", "SQLite"],
    },
    ai: {
      challenge: "Manual support replies were slow and lacked ticket context.",
      approach: "Assistant grounded in ticket/invoice context, role limits, and human escalation.",
      metrics: [
        { label: "First reply", value: "−40%" },
        { label: "Escalation", value: "Traceable" },
        { label: "RBAC", value: "✓" },
      ],
      stack: ["Next.js", "LLM API", "RBAC", "Panel"],
    },
    platforms: {
      challenge: "Separate systems with no shared identity or sync.",
      approach: "API hub, unified auth, and event-driven sync across services.",
      metrics: [
        { label: "Connected systems", value: "4+" },
        { label: "SSO/Auth", value: "✓" },
        { label: "Events", value: "Webhook" },
      ],
      stack: ["API Gateway", "Auth", "Queues", "Postgres"],
    },
  },
};

export function getProductCaseStudy(slug: ProductSlug, lang: Lang): ProductCaseStudyDeep {
  return CASES[lang][slug];
}

export const PRODUCT_INDUSTRY_STRIP: Record<
  Lang,
  { initials: string; label: string }[]
> = {
  fa: [
    { initials: "صن", label: "صنعت / تولید" },
    { initials: "توز", label: "توزیع" },
    { initials: "B2B", label: "خدمات B2B" },
    { initials: "فرو", label: "خرده‌فروشی" },
    { initials: "سازمان", label: "سازمانی" },
  ],
  en: [
    { initials: "MF", label: "Manufacturing" },
    { initials: "DI", label: "Distribution" },
    { initials: "B2B", label: "B2B services" },
    { initials: "RT", label: "Retail" },
    { initials: "EN", label: "Enterprise" },
  ],
};

export type DemoStep = { id: string; title: string; body: string; preview: string };

export const PRODUCT_DEMO_STEPS: Record<Lang, Record<ProductSlug, DemoStep[]>> = {
  fa: {
    web: [
      { id: "1", title: "صفحه خدمات", body: "ساختار SEO و CTA واضح برای هر خط خدمات.", preview: "services.tsx → SSR" },
      { id: "2", title: "فرم به CRM", body: "ارسال سرنخ با برچسب محصول بدون ورود دستی.", preview: "POST /leads ✓" },
      { id: "3", title: "انتشار محتوا", body: "تیم محتوا صفحه را بدون تیکت توسعه منتشر می‌کند.", preview: "CMS publish ✓" },
    ],
    mobile: [
      { id: "1", title: "ثبت میدانی", body: "عکس و امضا حتی بدون اینترنت.", preview: "offline queue" },
      { id: "2", title: "Sync", body: "با اتصال، صف به سرور مرکزی می‌رود.", preview: "sync → API" },
      { id: "3", title: "Push", body: "تغییر وضعیت همان روز به موبایل می‌رسد.", preview: "FCM/APNs" },
    ],
    windows: [
      { id: "1", title: "نصب", body: "بسته MSI از طریق AD/GPO روی شعب.", preview: "msiexec /i" },
      { id: "2", title: "کار روزانه", body: "فاکتور و انبار روی دسکتاپ آشنا.", preview: "WPF modules" },
      { id: "3", title: "آپدیت", body: "به‌روزرسانی کنترل‌شده بدون USB.", preview: "auto-update" },
    ],
    ai: [
      { id: "1", title: "زمینه", body: "دستیار تیکت و فاکتور مرتبط را می‌بیند.", preview: "context pack" },
      { id: "2", title: "پاسخ پیشنهادی", body: "پاسخ قابل ویرایش برای اپراتور.", preview: "draft reply" },
      { id: "3", title: "Escalation", body: "موارد حساس به انسان منتقل می‌شود.", preview: "hand-off ✓" },
    ],
    platforms: [
      { id: "1", title: "Auth یکپارچه", body: "یک هویت برای چند سامانه.", preview: "SSO session" },
      { id: "2", title: "رویداد", body: "تغییر در یک سرویس به بقیه می‌رسد.", preview: "webhook fan-out" },
      { id: "3", title: "مانیتور", body: "وضعیت همگام‌سازی قابل مشاهده است.", preview: "sync health" },
    ],
  },
  en: {
    web: [
      { id: "1", title: "Services page", body: "SEO structure and clear CTAs per line.", preview: "services.tsx → SSR" },
      { id: "2", title: "Form → CRM", body: "Leads land tagged without manual entry.", preview: "POST /leads ✓" },
      { id: "3", title: "Publish", body: "Content team ships pages without eng tickets.", preview: "CMS publish ✓" },
    ],
    mobile: [
      { id: "1", title: "Field capture", body: "Photos and signatures offline.", preview: "offline queue" },
      { id: "2", title: "Sync", body: "Queue flushes to the central API online.", preview: "sync → API" },
      { id: "3", title: "Push", body: "Status changes reach the device same day.", preview: "FCM/APNs" },
    ],
    windows: [
      { id: "1", title: "Install", body: "MSI via AD/GPO across branches.", preview: "msiexec /i" },
      { id: "2", title: "Daily work", body: "Invoices and stock in a familiar desktop UI.", preview: "WPF modules" },
      { id: "3", title: "Update", body: "Controlled updates without USB sticks.", preview: "auto-update" },
    ],
    ai: [
      { id: "1", title: "Context", body: "Assistant sees related tickets and invoices.", preview: "context pack" },
      { id: "2", title: "Draft", body: "Editable suggested reply for operators.", preview: "draft reply" },
      { id: "3", title: "Escalation", body: "Sensitive cases hand off to humans.", preview: "hand-off ✓" },
    ],
    platforms: [
      { id: "1", title: "Unified auth", body: "One identity across systems.", preview: "SSO session" },
      { id: "2", title: "Events", body: "A change fans out to connected services.", preview: "webhook fan-out" },
      { id: "3", title: "Monitor", body: "Sync health is visible at a glance.", preview: "sync health" },
    ],
  },
};
