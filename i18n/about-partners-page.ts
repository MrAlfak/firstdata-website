import type { Lang } from "./dictionaries";

export type AboutPartnersPageUi = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    cta: string;
  };
  partnerTypes: {
    eyebrow: string;
    title: string;
    cards: { tag: string; title: string; body: string }[];
  };
  alliances: {
    eyebrow: string;
    title: string;
    cards: { title: string; body: string }[];
  };
  integration: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: string[];
  };
  becomePartner: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
  };
  crossNav: {
    eyebrow: string;
    title: string;
    linkLabel: string;
  };
};

export const aboutPartnersPageDictionaries: Record<Lang, AboutPartnersPageUi> = {
  fa: {
    hero: {
      eyebrow: "> بارگذاری /aboutus/partners...",
      title: "شرکای ما",
      lead: "برای ساخت محصول پایدار، فقط تیم داخلی کافی نیست؛ زنجیره‌ای از شریک‌های قابل اعتماد لازم است.",
      body: "First Data با شریک‌های زیرساختی، پرداخت، فناوری و صنعتی کار می‌کند تا محصول نهایی هم از نظر فنی درست پیاده شود و هم با واقعیت عملیاتی کسب‌وکار هماهنگ بماند.",
      cta: "درخواست همکاری",
    },
    partnerTypes: {
      eyebrow: "// انواع شریک",
      title: "چه نوع همکاری‌هایی داریم",
      cards: [
        {
          tag: "CLD",
          title: "ابر و زیرساخت",
          body: "برای میزبانی، دسترس‌پذیری، استقرار و پایش پایدار سرویس‌ها.",
        },
        {
          tag: "PAY",
          title: "پرداخت",
          body: "برای درگاه، تسویه، مدیریت پرداخت و جریان‌های مالی آنلاین.",
        },
        {
          tag: "TEC",
          title: "فناوری",
          body: "برای ابزارهای توسعه، داده، امنیت، تحلیل و قابلیت‌های محصولی.",
        },
        {
          tag: "IND",
          title: "صنعتی",
          body: "برای هماهنگی با فرآیندهای واقعی هر حوزه، از خرده‌فروشی تا سازمانی.",
        },
      ],
    },
    alliances: {
      eyebrow: "// اکوسیستم همکاری",
      title: "دسته‌های اصلی هم‌پیمانان",
      cards: [
        {
          title: "درگاه‌های پرداخت",
          body: "اتصال checkout، callback، reconciliation و مدیریت وضعیت تراکنش‌ها.",
        },
        {
          title: "میزبانی و cloud hosting",
          body: "سرورها، CDN، بکاپ، محیط staging و استقرار مرحله‌ای.",
        },
        {
          title: "پیام‌رسانی و اعلان",
          body: "ارسال OTP، پیام تراکنشی، اعلان push و اطلاع‌رسانی عملیاتی.",
        },
        {
          title: "تحلیل و مانیتورینگ",
          body: "ردیابی رفتار، خطا، performance و سلامت سرویس در مقیاس واقعی.",
        },
        {
          title: "امنیت و هویت",
          body: "SSO، کنترل دسترسی، مدیریت نشست و کاهش ریسک در سامانه‌های حساس.",
        },
        {
          title: "داده و یکپارچه‌سازی",
          body: "همگام‌سازی با ERP، CRM، انبار، حسابداری و APIهای چندسیستمی.",
        },
      ],
    },
    integration: {
      eyebrow: "// روش اتصال",
      title: "رویکرد ما در یکپارچه‌سازی شریک‌ها",
      intro: "شریک مناسب را فقط به‌خاطر نام یا ترند انتخاب نمی‌کنیم؛ معیار ما سازگاری با مسئله، پایداری عملیاتی و هزینه نگهداری است.",
      steps: [
        "ارزیابی نیاز واقعی محصول و محدودیت‌های کسب‌وکار",
        "انتخاب سرویس‌هایی که lock-in غیرضروری ایجاد نکنند",
        "طراحی لایه اتصال روشن با لاگ، fallback و مانیتورینگ",
        "مستندسازی برای تیم داخلی مشتری و توسعه‌های آینده",
      ],
    },
    becomePartner: {
      eyebrow: "// همکاری جدید",
      title: "اگر ظرفیت مکمل دارید، گفت‌وگو را شروع کنیم",
      body: "اگر در حوزه زیرساخت، پرداخت، داده، امنیت، عملیات یا vertical خاصی تخصص دارید، می‌توانیم درباره فرصت‌های همکاری پروژه‌ای یا بلندمدت صحبت کنیم.",
      cta: "ثبت درخواست همکاری",
    },
    crossNav: {
      eyebrow: "// ادامه مسیر",
      title: "بخش‌های مرتبط درباره ما",
      linkLabel: "مشاهده",
    },
  },
  en: {
    hero: {
      eyebrow: "> loading /aboutus/partners...",
      title: "Our Partners",
      lead: "Reliable products need more than an internal team; they need a dependable partner ecosystem.",
      body: "First Data works with infrastructure, payment, technology, and industry partners so the final product is both technically sound and aligned with real operational requirements.",
      cta: "Start a partnership request",
    },
    partnerTypes: {
      eyebrow: "// partner types",
      title: "What kinds of partnerships we work with",
      cards: [
        {
          tag: "CLD",
          title: "Cloud & infrastructure",
          body: "For hosting, availability, deployment, and stable service operations.",
        },
        {
          tag: "PAY",
          title: "Payments",
          body: "For gateways, settlement flows, online payments, and transaction handling.",
        },
        {
          tag: "TEC",
          title: "Technology",
          body: "For development tooling, data, security, analytics, and product capabilities.",
        },
        {
          tag: "IND",
          title: "Industry",
          body: "For alignment with real workflows in each sector, from retail to enterprise.",
        },
      ],
    },
    alliances: {
      eyebrow: "// alliance ecosystem",
      title: "Core alliance categories",
      cards: [
        {
          title: "Payment gateways",
          body: "Checkout integration, callbacks, reconciliation, and transaction-status handling.",
        },
        {
          title: "Cloud hosting",
          body: "Servers, CDN, backups, staging environments, and staged deployment flows.",
        },
        {
          title: "Messaging & notifications",
          body: "OTP delivery, transactional messages, push notifications, and operational alerts.",
        },
        {
          title: "Analytics & monitoring",
          body: "Behavior tracking, error visibility, performance insight, and service health signals.",
        },
        {
          title: "Security & identity",
          body: "SSO, access control, session management, and risk reduction for sensitive systems.",
        },
        {
          title: "Data & integrations",
          body: "Sync with ERP, CRM, warehouse, accounting, and multi-system APIs.",
        },
      ],
    },
    integration: {
      eyebrow: "// integration approach",
      title: "How we integrate partner capabilities",
      intro: "We do not choose a partner because of a logo or trend alone; we choose based on fit, operational stability, and long-term maintenance cost.",
      steps: [
        "Evaluate the actual product need and business constraints",
        "Select services that avoid unnecessary vendor lock-in",
        "Design a clear integration layer with logs, fallbacks, and monitoring",
        "Document the setup for the client team and future extensions",
      ],
    },
    becomePartner: {
      eyebrow: "// new collaboration",
      title: "If your capability complements ours, let’s talk",
      body: "If you specialize in infrastructure, payments, data, security, operations, or a specific vertical, we can explore project-based or long-term collaboration.",
      cta: "Submit partnership request",
    },
    crossNav: {
      eyebrow: "// continue",
      title: "Related about pages",
      linkLabel: "View",
    },
  },
};
