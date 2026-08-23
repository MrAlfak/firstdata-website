import type { Lang } from "./dictionaries";
import type { ProductSlug } from "./product-page";

export type ProductStatItem = {
  id: string;
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  note: string;
  decimals?: number;
};

export type ProductSubExtensions = {
  nav: {
    stats: string;
    useCases: string;
    samples: string;
    features: string;
    stack: string;
    process: string;
    faq: string;
  };
  stats: {
    eyebrow: string;
    items: ProductStatItem[];
  };
  portfolio: {
    eyebrow: string;
    title: string;
    subtitle: string;
    callout: string;
    linkLabel: string;
    href: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
};

const portfolioCallout: Record<Lang, string> = {
  fa: "هر کارت خلاصه یک پروژه واقعی است — نه بسته نرم‌افزاری آماده. برای جزئیات بیشتر به portfolio بروید.",
  en: "Each card summarizes a real delivered project — not a ready-made product bundle. See portfolio for full case details.",
};

const sharedNav: Record<Lang, ProductSubExtensions["nav"]> = {
  fa: {
    stats: "آمار",
    useCases: "موارد استفاده",
    samples: "نمونه‌ها",
    features: "قابلیت‌ها",
    stack: "فناوری",
    process: "فرآیند",
    faq: "سوالات",
  },
  en: {
    stats: "Stats",
    useCases: "Use cases",
    samples: "Samples",
    features: "Features",
    stack: "Stack",
    process: "Process",
    faq: "FAQ",
  },
};

export const productSubExtensions: Record<Lang, Record<ProductSlug, ProductSubExtensions>> = {
  fa: {
    web: {
      nav: sharedNav.fa,
      stats: {
        eyebrow: "// شاخص‌های محصول وب",
        items: [
          { id: "deliveries", value: 40, suffix: "+", label: "تحویل وب", note: "سایت، CMS و پنل" },
          { id: "mvp", value: 6, suffix: " هفته", label: "میانگین MVP", note: "از kickoff تا لانچ اول" },
          { id: "lighthouse", value: 90, suffix: "+", label: "امتیاز Lighthouse", note: "هدف عملکرد و SEO" },
          { id: "uptime", value: 99.9, suffix: "%", label: "آپ‌تایم", note: "هاستینگ و مانیتورینگ", decimals: 1 },
        ],
      },
      portfolio: {
        eyebrow: "// نمونه‌های مرتبط",
        title: "نمونه از پروژه‌های وب تحویل‌شده",
        subtitle: "پروژه‌های واقعی portfolio — محصول آماده نیست؛ هر قرارداد سفارشی است.",
        callout: portfolioCallout.fa,
        linkLabel: "همه نمونه‌کارهای وب",
        href: "/portfolio/websites",
      },
      faq: {
        eyebrow: "// سوالات متداول",
        title: "پرسش‌های رایج درباره محصولات وب",
        items: [
          {
            q: "تفاوت محصول وب با خدمت طراحی وب چیست؟",
            a: "صفحه محصول بر خروجی نهایی (CMS، پنل، API) تمرکز دارد؛ صفحه خدمت مدل همکاری و دامنه طراحی را توضیح می‌دهد. هر دو می‌توانند به یک پروژه ختم شوند.",
          },
          {
            q: "آیا مالکیت کد و داده برای ما باقی می‌ماند؟",
            a: "بله. در پروژه‌های سفارشی، کد منبع، دیتابیس و مستندات تحویل پروژه در اختیار شماست مگر خلاف آن در قرارداد ذکر شده باشد.",
          },
          {
            q: "چقدر طول می‌کشد تا MVP آماده شود؟",
            a: "بسته به پیچیدگی، معمولاً ۴ تا ۸ هفته برای MVP با scope مشخص. پس از تحلیل اولیه، timeline دقیق‌تر ارائه می‌شود.",
          },
          {
            q: "PWA و SEO از روز اول در نظر گرفته می‌شود؟",
            a: "بله. ساختار URL، meta، schema، performance و در صورت نیاز PWA در معماری اولیه لحاظ می‌شود نه به‌عنوان افزونه بعد از لانچ.",
          },
          {
            q: "پس از تحویل پشتیبانی چگونه است؟",
            a: "قرارداد نگهداری ماهانه یا ساعتی، SLA پاسخ، به‌روزرسانی امنیتی و توسعه feature جدید — بر اساس نیاز شما تعریف می‌شود.",
          },
        ],
      },
    },
    mobile: {
      nav: sharedNav.fa,
      stats: {
        eyebrow: "// شاخص‌های محصول موبایل",
        items: [
          { id: "apps", value: 25, suffix: "+", label: "اپ تحویل‌شده", note: "Android و iOS" },
          { id: "offline", value: 100, suffix: "%", label: "پشتیبانی آفلاین", note: "در سناریوهای هدف" },
          { id: "stores", value: 2, suffix: "", label: "استور", note: "Google Play و App Store" },
          { id: "mvp", value: 8, suffix: " هفته", label: "میانگین MVP", note: "یک پلتفرم یا cross-platform" },
        ],
      },
      portfolio: {
        eyebrow: "// نمونه‌های مرتبط",
        title: "نمونه از پروژه‌های موبایل تحویل‌شده",
        subtitle: "پروژه‌های واقعی portfolio — محصول آماده نیست؛ هر قرارداد سفارشی است.",
        callout: portfolioCallout.fa,
        linkLabel: "همه نمونه‌کارهای موبایل",
        href: "/portfolio/mobile-apps",
      },
      faq: {
        eyebrow: "// سوالات متداول",
        title: "پرسش‌های رایج درباره محصولات موبایل",
        items: [
          {
            q: "Native یا cross-platform — کدام را پیشنهاد می‌دهید؟",
            a: "بسته به نیاز عملکرد، تیم داخلی، بودجه و timeline تصمیم می‌گیریم. در تحلیل اولیه گزینه‌ها با مزایا و ریسک هر کدام ارائه می‌شود.",
          },
          {
            q: "آیا اپ بدون اینترنت کار می‌کند؟",
            a: "برای سناریوهای میدانی و فروش، sync آفلاین و queue ارسال طراحی می‌شود. دامنه دقیق در فاز کشف نیاز مشخص می‌شود.",
          },
          {
            q: "انتشار در استورها شامل می‌شود؟",
            a: "می‌تواند بخشی از scope باشد: آماده‌سازی asset، compliance، submit و پاسخ به review — در قرارداد شفاف تعریف می‌شود.",
          },
          {
            q: "اعلان push چگونه پیاده می‌شود؟",
            a: "FCM/APNs با سیاست opt-in، segment و در صورت نیاز deep link به صفحات داخل اپ.",
          },
          {
            q: "API backend هم ساخته می‌شود؟",
            a: "بله، اگر ندارید API و پنل مدیریت را می‌سازیم یا به API موجود شما متصل می‌شویم.",
          },
        ],
      },
    },
    windows: {
      nav: sharedNav.fa,
      stats: {
        eyebrow: "// شاخص‌های محصول ویندوز",
        items: [
          { id: "desktop", value: 15, suffix: "+", label: "نرم‌افزار دسکتاپ", note: "LOB و ابزار داخلی" },
          { id: "deploy", value: 1, suffix: "", label: "مسیر MSI", note: "نصب سازمانی کنترل‌شده" },
          { id: "legacy", value: 10, suffix: "+", label: "سال تجربه", note: "اتصال به سیستم‌های قدیمی" },
          { id: "uptime", value: 99, suffix: "%", label: "پایداری", note: "محیط عملیاتی داخلی", decimals: 0 },
        ],
      },
      portfolio: {
        eyebrow: "// نمونه‌های مرتبط",
        title: "نمونه از پروژه‌های دسکتاپ تحویل‌شده",
        subtitle: "پروژه‌های واقعی portfolio — محصول آماده نیست؛ هر قرارداد سفارشی است.",
        callout: portfolioCallout.fa,
        linkLabel: "همه نمونه‌کارهای دسکتاپ",
        href: "/portfolio/desktop",
      },
      faq: {
        eyebrow: "// سوالات متداول",
        title: "پرسش‌های رایج درباره محصولات ویندوز",
        items: [
          {
            q: "MSI و به‌روزرسانی خودکار پشتیبانی می‌شود؟",
            a: "بله. packaging برای Active Directory/GPO، version channel و rollback در scope قابل تعریف است.",
          },
          {
            q: "آیا با پرینتر و سخت‌افزار جانبی کار می‌کند؟",
            a: "برای POS، بارکد، چاپ فاکتور و دستگاه‌های سریال/USB تجربه عملی داریم — در تحلیل نیاز سخت‌افزار لیست می‌شود.",
          },
          {
            q: "اتصال به نرم‌افزار قدیمی ممکن است؟",
            a: "بله، از API bridge، فایل exchange یا اتصال مستقیم DB — بسته به محدودیت‌های سیستم موجود.",
          },
          {
            q: "WPF، WinForms یا .NET MAUI؟",
            a: "بر اساس تیم شما، عمر محصول و نیاز UI انتخاب می‌شود. در prop اولیه stack پیشنهادی توضیح داده می‌شود.",
          },
          {
            q: "امنیت در شبکه داخلی چگونه است؟",
            a: "Authentication سازمانی، least-privilege، audit log و در صورت نیاز offline license.",
          },
        ],
      },
    },
    ai: {
      nav: sharedNav.fa,
      stats: {
        eyebrow: "// شاخص‌های محصول AI",
        items: [
          { id: "flows", value: 20, suffix: "+", label: "جریان AI", note: "RAG، اتوماسیون، دستیار" },
          { id: "privacy", value: 100, suffix: "%", label: "Privacy-first", note: "مرز داده در طراحی" },
          { id: "eval", value: 3, suffix: "", label: "لایه ارزیابی", note: "کیفیت، هزینه، دقت" },
          { id: "mvp", value: 4, suffix: " هفته", label: "پilot سریع", note: "use case محدود و قابل اندازه‌گیری" },
        ],
      },
      portfolio: {
        eyebrow: "// نمونه‌های مرتبط",
        title: "نمونه از پروژه‌های AI تحویل‌شده",
        subtitle: "پروژه‌های واقعی portfolio — محصول آماده نیست؛ هر قرارداد سفارشی است.",
        callout: portfolioCallout.fa,
        linkLabel: "نمونه‌کارهای مرتبط",
        href: "/portfolio/other",
      },
      faq: {
        eyebrow: "// سوالات متداول",
        title: "پرسش‌های رایج درباره محصولات AI",
        items: [
          {
            q: "داده‌های ما به مدل عمومی ارسال می‌شود؟",
            a: "سیاست privacy-first: مرز داده، anonymization و در صورت امکان مدل private یا VPC. قبل از پیاده‌سازی سند سیاست تأیید می‌شود.",
          },
          {
            q: "RAG چه زمانی مناسب‌تر از fine-tune است؟",
            a: "وقتی پاسخ باید از اسناد داخلی استخراج شود و به‌روزرسانی knowledge ساده‌تر از retrain باشد. در مشاوره اولیه مقایسه می‌شود.",
          },
          {
            q: "چگونه کیفیت خروجی کنترل می‌شود؟",
            a: "logging، human review، golden set تست و monitoring drift/hallucination — بسته به حساسیت use case.",
          },
          {
            q: "هزینه API LLM چطور مدیریت می‌شود؟",
            a: "cache، routing مدل، token budget و alert — در dashboard عملیاتی قابل مشاهده است.",
          },
          {
            q: "آیا جایگزین تیم پشتیبانی می‌شود؟",
            a: "خیر — هدف کاهش کار تکراری و سرعت پاسخ است؛ human-in-the-loop برای موارد حساس حفظ می‌شود.",
          },
        ],
      },
    },
    platforms: {
      nav: sharedNav.fa,
      stats: {
        eyebrow: "// شاخص‌های پلتفرم",
        items: [
          { id: "integrations", value: 30, suffix: "+", label: "یکپارچه‌سازی", note: "API، SSO، webhook" },
          { id: "channels", value: 4, suffix: "", label: "کانال", note: "وب، موبایل، admin، ops" },
          { id: "modules", value: 12, suffix: "+", label: "ماژول", note: "قابل افزودن تدریجی" },
          { id: "uptime", value: 99.9, suffix: "%", label: "SLA هدف", note: "پلتفرم‌های production", decimals: 1 },
        ],
      },
      portfolio: {
        eyebrow: "// نمونه‌های مرتبط",
        title: "نمونه از پروژه‌های پلتفرم تحویل‌شده",
        subtitle: "پروژه‌های واقعی portfolio — محصول آماده نیست؛ هر قرارداد سفارشی است.",
        callout: portfolioCallout.fa,
        linkLabel: "نمونه‌کارهای یکپارچه‌سازی",
        href: "/portfolio/other",
      },
      faq: {
        eyebrow: "// سوالات متداول",
        title: "پرسش‌های رایج درباره پلتفرم یکپارچه",
        items: [
          {
            q: "چه زمانی پلتفرم به‌جای چند محصول جدا نیاز است؟",
            a: "وقتی SSO، API واحد، داده مشترک و تجربه یکپارچه بین چند سیستم یا کانال ضروری است و رشد تدریجی بدون rewrite کامل مدنظر است.",
          },
          {
            q: "آیا باید همه سیستم‌های قدیمی را یک‌جا مهاجرت دهیم؟",
            a: "خیر — رویکرد staged: bridge روی legacy، ماژول جدید روی core مشترک، migration تدریجی با rollback.",
          },
          {
            q: "SSO با Active Directory یا IdP ابری؟",
            a: "هر دو پشتیبانی می‌شود: SAML، OIDC، LDAP — بسته به زیرساخت سازمان.",
          },
          {
            q: "Governance و logging چگونه است؟",
            a: "central audit، role-based access، API rate limit و dashboard سلامت سرویس‌ها.",
          },
          {
            q: "تیم داخلی ما می‌تواند ماژول اضافه کند؟",
            a: "بله — معماری modular، مستندات API و onboarding تیم در scope تحویل قابل تعریف است.",
          },
        ],
      },
    },
  },
  en: {
    web: {
      nav: sharedNav.en,
      stats: {
        eyebrow: "// web product metrics",
        items: [
          { id: "deliveries", value: 40, suffix: "+", label: "Web deliveries", note: "Sites, CMS, panels" },
          { id: "mvp", value: 6, suffix: " wk", label: "Avg. MVP", note: "Kickoff to first launch" },
          { id: "lighthouse", value: 90, suffix: "+", label: "Lighthouse target", note: "Performance & SEO" },
          { id: "uptime", value: 99.9, suffix: "%", label: "Uptime", note: "Hosting & monitoring", decimals: 1 },
        ],
      },
      portfolio: {
        eyebrow: "// related samples",
        title: "Sample delivered web projects",
        subtitle: "Real portfolio work — not off-the-shelf products. Every engagement is tailored.",
        callout: portfolioCallout.en,
        linkLabel: "All web portfolio",
        href: "/portfolio/websites",
      },
      faq: {
        eyebrow: "// faq",
        title: "Common questions about web products",
        items: [
          {
            q: "How is a web product different from the web design service page?",
            a: "The product page focuses on deliverables (CMS, panel, APIs). The service page explains engagement models and design scope. Both can lead to the same project.",
          },
          {
            q: "Do we keep ownership of code and data?",
            a: "Yes. For custom builds, source code, databases, and handover docs belong to you unless the contract states otherwise.",
          },
          {
            q: "How long until an MVP is ready?",
            a: "Typically 4–8 weeks for a scoped MVP. A precise timeline follows the initial discovery phase.",
          },
          {
            q: "Are PWA and SEO considered from day one?",
            a: "Yes. URL structure, meta, schema, performance, and PWA when needed are part of initial architecture—not post-launch add-ons.",
          },
          {
            q: "What does post-launch support look like?",
            a: "Monthly or hourly maintenance, response SLA, security updates, and new features—defined to match your needs.",
          },
        ],
      },
    },
    mobile: {
      nav: sharedNav.en,
      stats: {
        eyebrow: "// mobile product metrics",
        items: [
          { id: "apps", value: 25, suffix: "+", label: "Apps shipped", note: "Android & iOS" },
          { id: "offline", value: 100, suffix: "%", label: "Offline-ready", note: "For target scenarios" },
          { id: "stores", value: 2, suffix: "", label: "Store targets", note: "Play & App Store" },
          { id: "mvp", value: 8, suffix: " wk", label: "Avg. MVP", note: "One platform or cross-platform" },
        ],
      },
      portfolio: {
        eyebrow: "// related samples",
        title: "Sample delivered mobile projects",
        subtitle: "Real portfolio work — not off-the-shelf products. Every engagement is tailored.",
        callout: portfolioCallout.en,
        linkLabel: "All mobile portfolio",
        href: "/portfolio/mobile-apps",
      },
      faq: {
        eyebrow: "// faq",
        title: "Common questions about mobile products",
        items: [
          {
            q: "Native or cross-platform—which do you recommend?",
            a: "We decide based on performance needs, in-house skills, budget, and timeline. Initial analysis compares options with trade-offs.",
          },
          {
            q: "Can the app work without internet?",
            a: "For field and sales scenarios we design offline sync and outbound queues. Exact scope is set in discovery.",
          },
          {
            q: "Is store submission included?",
            a: "It can be in scope: assets, compliance, submit, and review responses—defined clearly in the contract.",
          },
          {
            q: "How is push notification implemented?",
            a: "FCM/APNs with opt-in policy, segments, and deep links when needed.",
          },
          {
            q: "Do you also build the backend API?",
            a: "Yes—we can build API and admin panel or connect to your existing backend.",
          },
        ],
      },
    },
    windows: {
      nav: sharedNav.en,
      stats: {
        eyebrow: "// windows product metrics",
        items: [
          { id: "desktop", value: 15, suffix: "+", label: "Desktop apps", note: "LOB & internal tools" },
          { id: "deploy", value: 1, suffix: "", label: "MSI path", note: "Controlled enterprise install" },
          { id: "legacy", value: 10, suffix: "+", label: "Years experience", note: "Legacy system bridges" },
          { id: "uptime", value: 99, suffix: "%", label: "Stability", note: "Internal ops environments", decimals: 0 },
        ],
      },
      portfolio: {
        eyebrow: "// related samples",
        title: "Sample delivered desktop projects",
        subtitle: "Real portfolio work — not off-the-shelf products. Every engagement is tailored.",
        callout: portfolioCallout.en,
        linkLabel: "All desktop portfolio",
        href: "/portfolio/desktop",
      },
      faq: {
        eyebrow: "// faq",
        title: "Common questions about Windows products",
        items: [
          {
            q: "Do you support MSI and auto-update?",
            a: "Yes—packaging for AD/GPO, version channels, and rollback can be in scope.",
          },
          {
            q: "Does it work with printers and peripherals?",
            a: "We have practical experience with POS, barcode, invoicing printers, and serial/USB devices—listed in discovery.",
          },
          {
            q: "Can you connect to legacy software?",
            a: "Yes—via API bridge, file exchange, or direct DB connection depending on constraints.",
          },
          {
            q: "WPF, WinForms, or .NET MAUI?",
            a: "Chosen based on your team, product lifespan, and UI needs. The initial proposal explains the stack.",
          },
          {
            q: "How is security handled on internal networks?",
            a: "Enterprise auth, least privilege, audit logs, and offline licensing when required.",
          },
        ],
      },
    },
    ai: {
      nav: sharedNav.en,
      stats: {
        eyebrow: "// ai product metrics",
        items: [
          { id: "flows", value: 20, suffix: "+", label: "AI flows", note: "RAG, automation, assistants" },
          { id: "privacy", value: 100, suffix: "%", label: "Privacy-first", note: "Data boundary by design" },
          { id: "eval", value: 3, suffix: "", label: "Eval layers", note: "Quality, cost, accuracy" },
          { id: "mvp", value: 4, suffix: " wk", label: "Fast pilot", note: "Narrow, measurable use case" },
        ],
      },
      portfolio: {
        eyebrow: "// related samples",
        title: "Sample delivered AI projects",
        subtitle: "Real portfolio work — not off-the-shelf products. Every engagement is tailored.",
        callout: portfolioCallout.en,
        linkLabel: "Related portfolio",
        href: "/portfolio/other",
      },
      faq: {
        eyebrow: "// faq",
        title: "Common questions about AI products",
        items: [
          {
            q: "Is our data sent to public models?",
            a: "Privacy-first policy: data boundaries, anonymization, and private/VPC models when possible. Policy doc is approved before build.",
          },
          {
            q: "When is RAG better than fine-tuning?",
            a: "When answers must come from internal docs and updating knowledge is easier than retraining. Compared in initial consulting.",
          },
          {
            q: "How is output quality controlled?",
            a: "Logging, human review, golden test sets, and drift/hallucination monitoring—based on use case sensitivity.",
          },
          {
            q: "How are LLM API costs managed?",
            a: "Caching, model routing, token budgets, and alerts—visible in the ops dashboard.",
          },
          {
            q: "Will it replace our support team?",
            a: "No—the goal is less repetitive work and faster responses; human-in-the-loop remains for sensitive cases.",
          },
        ],
      },
    },
    platforms: {
      nav: sharedNav.en,
      stats: {
        eyebrow: "// platform metrics",
        items: [
          { id: "integrations", value: 30, suffix: "+", label: "Integrations", note: "API, SSO, webhooks" },
          { id: "channels", value: 4, suffix: "", label: "Channels", note: "Web, mobile, admin, ops" },
          { id: "modules", value: 12, suffix: "+", label: "Modules", note: "Add incrementally" },
          { id: "uptime", value: 99.9, suffix: "%", label: "Target SLA", note: "Production platforms", decimals: 1 },
        ],
      },
      portfolio: {
        eyebrow: "// related samples",
        title: "Sample delivered platform projects",
        subtitle: "Real portfolio work — not off-the-shelf products. Every engagement is tailored.",
        callout: portfolioCallout.en,
        linkLabel: "Integration portfolio",
        href: "/portfolio/other",
      },
      faq: {
        eyebrow: "// faq",
        title: "Common questions about integrated platforms",
        items: [
          {
            q: "When do we need a platform instead of separate products?",
            a: "When SSO, unified APIs, shared data, and coherent experience across systems or channels matter—and staged growth without full rewrite is required.",
          },
          {
            q: "Must we migrate all legacy systems at once?",
            a: "No—staged approach: bridge on legacy, new modules on shared core, gradual migration with rollback.",
          },
          {
            q: "SSO with Active Directory or cloud IdP?",
            a: "Both—SAML, OIDC, LDAP depending on your infrastructure.",
          },
          {
            q: "What about governance and logging?",
            a: "Central audit, RBAC, API rate limits, and service health dashboards.",
          },
          {
            q: "Can our internal team add modules?",
            a: "Yes—modular architecture, API docs, and team onboarding can be part of delivery scope.",
          },
        ],
      },
    },
  },
};
