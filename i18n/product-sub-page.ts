import type { Lang } from "./dictionaries";
import type { ProductSlug } from "./product-page";

const featuresCallout: Record<Lang, string> = {
  fa: "این موارد «چک‌لیست معمول» است — نه لیست قیمت. آنچه واقعاً تحویل می‌دهیم بعد از discovery مشخص می‌شود.",
  en: "This is a typical capability checklist — not a price list. Final scope is defined after discovery.",
};

export type ProductSubPageUi = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
  };
  useCases: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cards: { icon: string; title: string; outcome: string }[];
  };
  features: {
    eyebrow: string;
    title: string;
    subtitle: string;
    callout: string;
    items: string[];
  };
  stack: {
    eyebrow: string;
    title: string;
    tags: string[];
  };
  process: {
    eyebrow: string;
    title: string;
    steps: { title: string; body: string }[];
  };
  relatedService: {
    eyebrow: string;
    title: string;
    body: string;
    href: string;
    cta: string;
  };
  crossNav: {
    eyebrow: string;
    title: string;
    linkLabel: string;
  };
  pageCta: string;
};

export const productSubPageDictionaries: Record<Lang, Record<ProductSlug, ProductSubPageUi>> = {
  fa: {
    web: {
      hero: {
        eyebrow: "> بارگذاری /product/web...",
        title: "محصولات وب",
        lead: "وب‌اپ، CMS، پنل مدیریت، PWA و APIهایی که به رشد دیجیتال شما ستون فقرات می‌دهند.",
        body: "محصولات وب ما برای سازمان‌ها و کسب‌وکارهایی ساخته می‌شوند که به سرعت، سئو، تجربه کاربری روان و قابلیت توسعه مداوم نیاز دارند.",
      },
      useCases: {
        eyebrow: "// موارد استفاده",
        title: "کدام تیم‌ها بیشترین ارزش را از محصول وب می‌گیرند؟",
        subtitle: "نقش‌هایی که به سرعت، محتوا و پنل نیاز دارند",
        cards: [
          { icon: "team", title: "تیم بازاریابی و محتوا", outcome: "انتشار کمپین و landing بدون وابستگی به توسعه." },
          { icon: "ecommerce", title: "عملیات فروش آنلاین", outcome: "سفارش، پنل و گزارش در یک پورتال یکپارچه." },
          { icon: "web", title: "تیم عملیات داخلی", outcome: "داشبورد و نقش‌بندی برای کار روزمره تیم." },
          { icon: "seo", title: "رشد و SEO", outcome: "ساختار فنی، schema و صفحات مقیاس‌پذیر برای ترافیک." },
        ],
      },
      features: {
        eyebrow: "// قابلیت‌ها",
        title: "در محصول وب معمولاً چه تحویل می‌دهیم؟",
        subtitle: "چک‌لیست قابلیت‌های رایج — scope نهایی بعد از discovery مشخص می‌شود.",
        callout: featuresCallout.fa,
        items: [
          "CMS سفارشی و نقش‌بندی دسترسی",
          "پنل مدیریت و گزارش‌گیری",
          "APIهای داخلی و عمومی",
          "PWA، کش و عملکرد بهینه",
          "SEO فنی، ساختار URL و اسکیما",
          "فرم‌ها، اعلان‌ها و اتصال به CRM",
        ],
      },
      stack: {
        eyebrow: "// فناوری",
        title: "استک رایج",
        tags: ["Next.js", "React", "Tailwind CSS", "TypeScript", "PWA", "REST API"],
      },
      process: {
        eyebrow: "// فرآیند تحویل",
        title: "از ایده تا لانچ",
        steps: [
          { title: "تحلیل نیاز", body: "محتوا، کاربران، نقش‌ها و جریان‌های کلیدی را مشخص می‌کنیم." },
          { title: "طراحی تجربه", body: "ساختار صفحه، ناوبری، UI و معماری محتوا را شکل می‌دهیم." },
          { title: "پیاده‌سازی و اتصال", body: "فرانت‌اند، CMS، API و پنل مدیریت را به‌صورت مرحله‌ای می‌سازیم." },
          { title: "انتشار و بهینه‌سازی", body: "پس از launch، عملکرد، سئو و رفتار کاربران را بررسی و بهبود می‌دهیم." },
        ],
      },
      relatedService: {
        eyebrow: "// خدمت مرتبط",
        title: "طراحی وب‌سایت و تجربه وب",
        body: "اگر در مرحله انتخاب سرویس هستید، از صفحه خدمات وب شروع کنید تا مدل همکاری و دامنه تحویل را ببینید.",
        href: "/services/web-design",
        cta: "مشاهده خدمت",
      },
      crossNav: {
        eyebrow: "// سایر محصولات",
        title: "دسته‌های دیگر محصول",
        linkLabel: "مشاهده",
      },
      pageCta: "درخواست محصول وب",
    },
    mobile: {
      hero: {
        eyebrow: "> بارگذاری /product/mobile...",
        title: "محصولات موبایل",
        lead: "اپلیکیشن‌های Android و iOS برای سناریوهایی که سرعت دسترسی، آفلاین‌بودن و اعلان اهمیت دارد.",
        body: "محصولات موبایل ما برای سرویس میدانی، فروش، عملیات داخلی، تعامل مشتری و سناریوهایی ساخته می‌شوند که استفاده روزمره و همراه اولویت اصلی است.",
      },
      useCases: {
        eyebrow: "// موارد استفاده",
        title: "کدام تیم‌ها به اپ موبایل اولویت می‌دهند؟",
        subtitle: "سناریوهایی که دسترسی همراه و آفلاین تعیین‌کننده است",
        cards: [
          { icon: "message", title: "تیم تجربه مشتری", outcome: "سفارش، پیگیری و push — بدون تماس پشتیبانی." },
          { icon: "android", title: "عملیات میدانی", outcome: "ثبت و sync آفلاین — حتی بدون اینترنت پایدار." },
          { icon: "ecommerce", title: "فروش و توزیع", outcome: "ویزیت، سفارش و موجودی در جیب نماینده." },
          { icon: "team", title: "کارکنان داخلی", outcome: "تأیید، تیکت و گزارش از هر مکان." },
        ],
      },
      features: {
        eyebrow: "// قابلیت‌ها",
        title: "در محصول موبایل معمولاً چه تحویل می‌دهیم؟",
        subtitle: "چک‌لیست قابلیت‌های رایج — scope نهایی بعد از discovery مشخص می‌شود.",
        callout: featuresCallout.fa,
        items: [
          "پشتیبانی Android و iOS",
          "ذخیره‌سازی محلی و workflow آفلاین",
          "اعلان push و پیام‌های درون‌برنامه",
          "احراز هویت و session امن",
          "اتصال به API و همگام‌سازی",
          "انتشار و نگهداری در استورها",
        ],
      },
      stack: {
        eyebrow: "// فناوری",
        title: "استک رایج",
        tags: ["Kotlin", "Swift", "Flutter", "Push Notifications", "Offline Sync", "REST API"],
      },
      process: {
        eyebrow: "// فرآیند تحویل",
        title: "از سناریو تا انتشار",
        steps: [
          { title: "تعریف سناریو", body: "کاربران، محدودیت شبکه، اعلان‌ها و جریان‌های روزانه را تحلیل می‌کنیم." },
          { title: "طراحی تجربه همراه", body: "UI بومی، navigation و رفتارهای مناسب موبایل طراحی می‌شود." },
          { title: "توسعه و تست", body: "قابلیت‌ها، sync، اعلان و سناریوهای واقعی روی دستگاه بررسی می‌شوند." },
          { title: "انتشار و iteration", body: "استورها، analytics و نسخه‌های بعدی به‌صورت برنامه‌ریزی‌شده مدیریت می‌شوند." },
        ],
      },
      relatedService: {
        eyebrow: "// خدمت مرتبط",
        title: "خدمات اپلیکیشن موبایل",
        body: "اگر می‌خواهید بین Android، iOS یا رویکرد cross-platform تصمیم بگیرید، از صفحه خدمات موبایل شروع کنید.",
        href: "/services/android",
        cta: "مشاهده خدمت",
      },
      crossNav: {
        eyebrow: "// سایر محصولات",
        title: "دسته‌های دیگر محصول",
        linkLabel: "مشاهده",
      },
      pageCta: "درخواست محصول موبایل",
    },
    windows: {
      hero: {
        eyebrow: "> بارگذاری /product/windows...",
        title: "محصولات ویندوز",
        lead: "نرم‌افزارهای LOB، ابزارهای داخلی، MSI و مسیرهای update کنترل‌شده برای تیم‌های عملیاتی.",
        body: "محصولات ویندوز ما برای محیط‌هایی مناسب‌اند که هنوز دسکتاپ نقش کلیدی در عملیات، پردازش محلی، چاپ، سخت‌افزار جانبی یا performance داخلی دارد.",
      },
      useCases: {
        eyebrow: "// موارد استفاده",
        title: "چه تیم‌هایی هنوز به دسکتاپ LOB نیاز دارند؟",
        subtitle: "نقش‌هایی که بیشترین بازده را از محصولات ویندوز می‌گیرند",
        cards: [
          { icon: "ecommerce", title: "مدیر فروشگاه / retail", outcome: "POS، چاپ فاکتور و sync شعبه — بدون Excel پراکنده." },
          { icon: "android", title: "سرپرست انبار", outcome: "بارکد و موجودی حتی وقتی اینترنت قطع است." },
          { icon: "key", title: "مدیر IT", outcome: "Rollout با GPO و MSI — نه USB و نصب دستی." },
          { icon: "team", title: "حسابداری / back-office", outcome: "Export، چاپ و audit trail برای گزارش روزانه." },
        ],
      },
      features: {
        eyebrow: "// قابلیت‌ها",
        title: "در تحویل محصول ویندوز معمولاً چه داریم؟",
        subtitle: "قالب پیش‌فرض قابلیت‌ها — scope دقیق بعد از discovery و تحلیل محیط شما تعیین می‌شود.",
        callout: featuresCallout.fa,
        items: [
          "رابط دسکتاپ برای نقش‌های عملیاتی",
          "MSI و استقرار کنترل‌شده",
          "به‌روزرسانی خودکار و مدیریت نسخه",
          "اتصال به API، دیتابیس یا صف",
          "گزارش‌گیری، export و چاپ",
          "مدیریت مجوز و دسترسی محلی",
        ],
      },
      stack: {
        eyebrow: "// فناوری",
        title: "استک رایج",
        tags: [".NET", "WPF", "Electron", "C#", "MSI", "Auto Update"],
      },
      process: {
        eyebrow: "// فرآیند تحویل",
        title: "از عملیات تا rollout",
        steps: [
          { title: "شناخت محیط اجرا", body: "دستگاه‌ها، کاربران، محدودیت‌های شبکه و تجهیزات جانبی را بررسی می‌کنیم." },
          { title: "طراحی جریان‌های محلی", body: "فرم‌ها، پردازش‌ها و مسیرهای خطا برای استفاده روزانه طراحی می‌شوند." },
          { title: "ساخت و سخت‌سازی", body: "نرم‌افزار، installer، logging و update path با نیاز عملیاتی هماهنگ می‌شود." },
          { title: "آماده‌سازی استقرار", body: "مستندات rollout، پشتیبانی و نسخه‌های بعدی برای تیم داخلی آماده می‌شود." },
        ],
      },
      relatedService: {
        eyebrow: "// خدمت مرتبط",
        title: "خدمات مشاوره و تحلیل پیاده‌سازی",
        body: "برای تصمیم بین دسکتاپ، وب یا مدل hybrid، صفحه مشاوره بهترین نقطه شروع است.",
        href: "/services/consulting",
        cta: "مشاهده خدمت",
      },
      crossNav: {
        eyebrow: "// سایر محصولات",
        title: "دسته‌های دیگر محصول",
        linkLabel: "مشاهده",
      },
      pageCta: "درخواست محصول ویندوز",
    },
    ai: {
      hero: {
        eyebrow: "> بارگذاری /product/ai...",
        title: "محصولات هوش مصنوعی",
        lead: "LLM، RAG و اتوماسیون برای کاهش کار تکراری، افزایش دقت و سریع‌ترشدن تصمیم‌ها.",
        body: "محصولات AI ما با رویکرد privacy-first طراحی می‌شوند تا استفاده از مدل‌های زبانی، جستجوی هوشمند و جریان‌های نیمه‌خودکار با داده و سیاست‌های شما هم‌راستا باشد.",
      },
      useCases: {
        eyebrow: "// موارد استفاده",
        title: "کدام تیم‌ها بیشترین ROI از AI می‌گیرند؟",
        subtitle: "نقش‌هایی که حجم کار تکراری یا جستجو در اسناد دارند",
        cards: [
          { icon: "support", title: "پشتیبانی و helpdesk", outcome: "پاسخ سریع از اسناد داخلی — نه ۲۰ PDF برای هر تیکت." },
          { icon: "message", title: "فروش و pre-sales", outcome: "خلاصه prop و پاسخ به FAQ محصول در لحظه." },
          { icon: "team", title: "عملیات و back-office", outcome: "دسته‌بندی، خلاصه‌سازی و حذف copy-paste." },
          { icon: "ai", title: "مدیر محصول / تصمیم‌گیر", outcome: "تحلیل اولیه و پیشنهاد در سناریوهای پیچیده." },
        ],
      },
      features: {
        eyebrow: "// قابلیت‌ها",
        title: "در محصول AI معمولاً چه تحویل می‌دهیم؟",
        subtitle: "چک‌لیست قابلیت‌های رایج — scope نهایی بعد از discovery مشخص می‌شود.",
        callout: featuresCallout.fa,
        items: [
          "اتصال به مدل‌های LLM و workflowهای سفارشی",
          "RAG و جستجوی مبتنی بر اسناد",
          "قوانین دسترسی و privacy-first design",
          "لاگ‌گیری، ارزیابی و کنترل کیفیت خروجی",
          "اتصال به CRM، helpdesk یا CMS",
          "اتوماسیون با human-in-the-loop",
        ],
      },
      stack: {
        eyebrow: "// فناوری",
        title: "استک رایج",
        tags: ["LLM", "RAG", "Embeddings", "Automation", "Privacy-first", "APIs"],
      },
      process: {
        eyebrow: "// فرآیند تحویل",
        title: "از use case تا deployment",
        steps: [
          { title: "انتخاب use case", body: "ابتدا مشخص می‌کنیم AI دقیقاً کدام اصطکاک را باید کم کند." },
          { title: "آماده‌سازی دانش و سیاست‌ها", body: "منابع داده، مجوزها، tone و محدودیت‌های پاسخ تنظیم می‌شود." },
          { title: "پیاده‌سازی و ارزیابی", body: "نمونه اولیه با سناریوهای واقعی تست و quality آن سنجیده می‌شود." },
          { title: "استقرار و نظارت", body: "خروجی، هزینه، accuracy و privacy به‌صورت مستمر پایش می‌شود." },
        ],
      },
      relatedService: {
        eyebrow: "// خدمت مرتبط",
        title: "خدمات مشاوره و تحلیل پروژه",
        body: "اگر هنوز use case مناسب AI را مشخص نکرده‌اید، از صفحه مشاوره برای تعریف دامنه و ریسک‌ها شروع کنید.",
        href: "/services/consulting",
        cta: "مشاهده خدمت",
      },
      crossNav: {
        eyebrow: "// سایر محصولات",
        title: "دسته‌های دیگر محصول",
        linkLabel: "مشاهده",
      },
      pageCta: "درخواست محصول AI",
    },
    platforms: {
      hero: {
        eyebrow: "> بارگذاری /product/platforms...",
        title: "پلتفرم‌های یکپارچه",
        lead: "وقتی چند سیستم، چند تیم و چند کانال باید مثل یک محصول واحد عمل کنند.",
        body: "پلتفرم‌های یکپارچه برای سازمان‌هایی مناسب‌اند که می‌خواهند احراز هویت، APIها، داده و جریان‌های چندکاناله را در معماری ماژولار و قابل رشد هماهنگ کنند.",
      },
      useCases: {
        eyebrow: "// موارد استفاده",
        title: "کدام تیم‌ها به پلتفرم یکپارچه نیاز دارند؟",
        subtitle: "وقتی چند سامانه و چند کانال باید مثل یک محصول عمل کنند",
        cards: [
          { icon: "key", title: "IT و امنیت", outcome: "SSO و دسترسی واحد روی همه سامانه‌ها." },
          { icon: "platforms", title: "محصول چندکاناله", outcome: "وب، موبایل و پنل روی API و منطق مشترک." },
          { icon: "consulting", title: "معماری و یکپارچه‌سازی", outcome: "Legacy و سیستم جدید پشت یک لایه منسجم." },
          { icon: "team", title: "رهبری محصول", outcome: "افزودن قابلیت مرحله‌ای بدون بازنویسی کامل." },
        ],
      },
      features: {
        eyebrow: "// قابلیت‌ها",
        title: "در پلتفرم یکپارچه معمولاً چه تحویل می‌دهیم؟",
        subtitle: "چک‌لیست قابلیت‌های رایج — scope نهایی بعد از discovery مشخص می‌شود.",
        callout: featuresCallout.fa,
        items: [
          "SSO و مدیریت دسترسی متمرکز",
          "Unified APIs و orchestration سرویس‌ها",
          "معماری ماژولار و قابل توسعه",
          "اتصال به سامانه‌های legacy و جدید",
          "چندکاناله: وب، موبایل، پنل و عملیات",
          "مانیتورینگ، logging و governance فنی",
        ],
      },
      stack: {
        eyebrow: "// فناوری",
        title: "استک رایج",
        tags: ["SSO", "Unified APIs", "Modular Architecture", "Queues", "Webhooks", "Multi-channel"],
      },
      process: {
        eyebrow: "// فرآیند تحویل",
        title: "از پراکندگی به انسجام",
        steps: [
          { title: "نقشه‌برداری سیستم‌ها", body: "سامانه‌ها، کاربران، وابستگی‌ها و نقاط شکست را شناسایی می‌کنیم." },
          { title: "طراحی هسته پلتفرم", body: "هویت، API، event flow و مرز ماژول‌ها تعریف می‌شود." },
          { title: "پیاده‌سازی مرحله‌ای", body: "سیستم‌ها به‌تدریج به هسته جدید متصل می‌شوند تا ریسک migration کم بماند." },
          { title: "پایش و گسترش", body: "پس از تثبیت، قابلیت‌های جدید و کانال‌های بیشتر روی همان ستون فقرات اضافه می‌شوند." },
        ],
      },
      relatedService: {
        eyebrow: "// خدمت مرتبط",
        title: "خدمات مشاوره و تحلیل معماری",
        body: "برای شروع معماری پلتفرم، یک مرحله تحلیل و نقشه‌برداری سیستم‌ها معمولاً بهترین نقطه آغاز است.",
        href: "/services/consulting",
        cta: "مشاهده خدمت",
      },
      crossNav: {
        eyebrow: "// سایر محصولات",
        title: "دسته‌های دیگر محصول",
        linkLabel: "مشاهده",
      },
      pageCta: "درخواست پلتفرم یکپارچه",
    },
  },
  en: {
    web: {
      hero: {
        eyebrow: "> loading /product/web...",
        title: "Web Products",
        lead: "Web apps, CMS, admin panels, PWAs, and APIs that become the backbone of your digital growth.",
        body: "Our web products are built for organizations and businesses that need speed, SEO, smooth user experience, and room for continuous evolution.",
      },
      useCases: {
        eyebrow: "// use cases",
        title: "Which teams get the most value from web products?",
        subtitle: "Roles that need speed, content control, and operational panels",
        cards: [
          { icon: "team", title: "Marketing and content", outcome: "Launch campaigns and landing pages without waiting on engineering." },
          { icon: "ecommerce", title: "Online sales operations", outcome: "Orders, panels, and reporting in one integrated portal." },
          { icon: "web", title: "Internal operations", outcome: "Dashboards and role-based workflows for daily team work." },
          { icon: "seo", title: "Growth and SEO", outcome: "Technical structure, schema, and pages built to scale traffic." },
        ],
      },
      features: {
        eyebrow: "// features",
        title: "What we typically deliver in a web product",
        subtitle: "A common capability checklist — final scope is set after discovery.",
        callout: featuresCallout.en,
        items: [
          "Custom CMS and role-based access",
          "Admin panels and reporting",
          "Internal and public APIs",
          "PWA, caching, and performance optimization",
          "Technical SEO, URL structure, and schema",
          "Forms, notifications, and CRM integration",
        ],
      },
      stack: {
        eyebrow: "// technology",
        title: "Typical stack",
        tags: ["Next.js", "React", "Tailwind CSS", "TypeScript", "PWA", "REST API"],
      },
      process: {
        eyebrow: "// delivery process",
        title: "From idea to launch",
        steps: [
          { title: "Need analysis", body: "We define content, users, roles, and the product’s key flows." },
          { title: "Experience design", body: "We shape page structure, navigation, UI, and content architecture." },
          { title: "Implementation and integration", body: "Frontend, CMS, APIs, and admin surfaces are shipped in stages." },
          { title: "Launch and optimization", body: "After launch, we review performance, SEO, and user behavior for refinement." },
        ],
      },
      relatedService: {
        eyebrow: "// related service",
        title: "Website design and web experience",
        body: "If you are still at the service-selection stage, start with the web service page to review collaboration scope.",
        href: "/services/web-design",
        cta: "View service",
      },
      crossNav: {
        eyebrow: "// other products",
        title: "Explore other product categories",
        linkLabel: "View",
      },
      pageCta: "Request a web product",
    },
    mobile: {
      hero: {
        eyebrow: "> loading /product/mobile...",
        title: "Mobile Products",
        lead: "Android and iOS apps for scenarios where fast access, offline work, and notifications matter.",
        body: "Our mobile products are designed for field service, sales, internal operations, customer engagement, and daily-use scenarios where a handheld experience comes first.",
      },
      useCases: {
        eyebrow: "// use cases",
        title: "Which teams should prioritize mobile?",
        subtitle: "Scenarios where handheld access and offline work decide success",
        cards: [
          { icon: "message", title: "Customer experience", outcome: "Orders, tracking, and push — without calling support." },
          { icon: "android", title: "Field operations", outcome: "Capture and sync offline — even on unstable networks." },
          { icon: "ecommerce", title: "Sales and distribution", outcome: "Visits, orders, and stock in the rep’s pocket." },
          { icon: "team", title: "Internal workforce", outcome: "Approvals, tickets, and reports from anywhere." },
        ],
      },
      features: {
        eyebrow: "// features",
        title: "What we typically deliver in a mobile product",
        subtitle: "A common capability checklist — final scope is set after discovery.",
        callout: featuresCallout.en,
        items: [
          "Android and iOS support",
          "Local storage and offline workflows",
          "Push notifications and in-app messaging",
          "Secure authentication and sessions",
          "API connectivity and synchronization",
          "Store release and maintenance support",
        ],
      },
      stack: {
        eyebrow: "// technology",
        title: "Typical stack",
        tags: ["Kotlin", "Swift", "Flutter", "Push Notifications", "Offline Sync", "REST API"],
      },
      process: {
        eyebrow: "// delivery process",
        title: "From scenario to release",
        steps: [
          { title: "Scenario definition", body: "We analyze users, network limits, notifications, and daily usage flows." },
          { title: "Mobile-first experience design", body: "Native-feeling UI, navigation, and handset behaviors are shaped first." },
          { title: "Development and testing", body: "Capabilities, sync, notifications, and real-device scenarios are validated." },
          { title: "Release and iteration", body: "Stores, analytics, and follow-up releases are managed in a planned cadence." },
        ],
      },
      relatedService: {
        eyebrow: "// related service",
        title: "Mobile app services",
        body: "If you are choosing between Android, iOS, or cross-platform directions, start from our mobile services view.",
        href: "/services/android",
        cta: "View service",
      },
      crossNav: {
        eyebrow: "// other products",
        title: "Explore other product categories",
        linkLabel: "View",
      },
      pageCta: "Request a mobile product",
    },
    windows: {
      hero: {
        eyebrow: "> loading /product/windows...",
        title: "Windows Products",
        lead: "LOB software, internal tools, MSI delivery, and controlled update paths for operational teams.",
        body: "Our Windows products fit environments where desktop software still plays a critical role in operations, local processing, printing, peripheral devices, or internal performance needs.",
      },
      useCases: {
        eyebrow: "// use cases",
        title: "Which teams still need desktop LOB software?",
        subtitle: "Roles that get the strongest return from Windows products",
        cards: [
          { icon: "ecommerce", title: "Store manager / retail", outcome: "POS, invoice printing, and branch sync — without scattered Excel files." },
          { icon: "android", title: "Warehouse supervisor", outcome: "Barcode and stock workflows even when the network drops." },
          { icon: "key", title: "IT manager", outcome: "GPO and MSI rollout — not USB sticks and manual installs." },
          { icon: "team", title: "Accounting / back-office", outcome: "Export, printing, and audit trail for daily reporting." },
        ],
      },
      features: {
        eyebrow: "// features",
        title: "What we typically deliver in a Windows product",
        subtitle: "A default capability template — exact scope follows discovery and your runtime environment.",
        callout: featuresCallout.en,
        items: [
          "Desktop UI for operational roles",
          "MSI packaging and controlled rollout",
          "Auto-update and version management",
          "API, database, or queue integration",
          "Reporting, export, and printing",
          "Local authorization and access rules",
        ],
      },
      stack: {
        eyebrow: "// technology",
        title: "Typical stack",
        tags: [".NET", "WPF", "Electron", "C#", "MSI", "Auto Update"],
      },
      process: {
        eyebrow: "// delivery process",
        title: "From operations to rollout",
        steps: [
          { title: "Runtime environment review", body: "We assess devices, users, network limits, and peripheral dependencies." },
          { title: "Local flow design", body: "Daily forms, processing paths, and error handling are shaped for real use." },
          { title: "Build and hardening", body: "Software, installer, logging, and update paths are aligned with operational needs." },
          { title: "Deployment readiness", body: "Rollout documentation, support, and future version handling are prepared for the internal team." },
        ],
      },
      relatedService: {
        eyebrow: "// related service",
        title: "Consulting and implementation analysis",
        body: "If you are deciding between desktop, web, or a hybrid model, our consulting page is the best starting point.",
        href: "/services/consulting",
        cta: "View service",
      },
      crossNav: {
        eyebrow: "// other products",
        title: "Explore other product categories",
        linkLabel: "View",
      },
      pageCta: "Request a Windows product",
    },
    ai: {
      hero: {
        eyebrow: "> loading /product/ai...",
        title: "AI Products",
        lead: "LLM integration, RAG, and automation to reduce repetitive work, improve accuracy, and speed up decisions.",
        body: "Our AI products are shaped with a privacy-first mindset so language models, intelligent search, and semi-automated flows remain aligned with your data boundaries and operational policies.",
      },
      useCases: {
        eyebrow: "// use cases",
        title: "Which teams see the strongest AI ROI?",
        subtitle: "Roles drowning in repetitive work or document search",
        cards: [
          { icon: "support", title: "Support and helpdesk", outcome: "Fast answers from internal docs — not twenty PDFs per ticket." },
          { icon: "message", title: "Sales and pre-sales", outcome: "Instant prop summaries and product FAQ responses." },
          { icon: "team", title: "Operations and back-office", outcome: "Classification, summarization, and less copy-paste." },
          { icon: "ai", title: "Product lead / decision-maker", outcome: "Initial analysis and guidance in complex scenarios." },
        ],
      },
      features: {
        eyebrow: "// features",
        title: "What we typically deliver in an AI product",
        subtitle: "A common capability checklist — final scope is set after discovery.",
        callout: featuresCallout.en,
        items: [
          "LLM integration and custom workflows",
          "RAG and document-grounded search",
          "Access policies and privacy-first design",
          "Logging, evaluation, and output quality control",
          "CRM, helpdesk, or CMS integrations",
          "Human-in-the-loop automation",
        ],
      },
      stack: {
        eyebrow: "// technology",
        title: "Typical stack",
        tags: ["LLM", "RAG", "Embeddings", "Automation", "Privacy-first", "APIs"],
      },
      process: {
        eyebrow: "// delivery process",
        title: "From use case to deployment",
        steps: [
          { title: "Use case selection", body: "We first define which friction AI should actually reduce." },
          { title: "Knowledge and policy preparation", body: "Data sources, permissions, tone, and answer limits are prepared." },
          { title: "Implementation and evaluation", body: "A prototype is tested against real scenarios and measured for quality." },
          { title: "Deployment and monitoring", body: "Output quality, cost, accuracy, and privacy are monitored continuously." },
        ],
      },
      relatedService: {
        eyebrow: "// related service",
        title: "Consulting and project analysis",
        body: "If the right AI use case is not fully defined yet, start with consulting to shape scope and risk clearly.",
        href: "/services/consulting",
        cta: "View service",
      },
      crossNav: {
        eyebrow: "// other products",
        title: "Explore other product categories",
        linkLabel: "View",
      },
      pageCta: "Request an AI product",
    },
    platforms: {
      hero: {
        eyebrow: "> loading /product/platforms...",
        title: "Integrated Platforms",
        lead: "When multiple systems, teams, and channels need to behave like one coherent product.",
        body: "Integrated platforms are right for organizations that want to align identity, APIs, data, and multi-channel workflows inside a modular architecture that can grow without full rewrites.",
      },
      useCases: {
        eyebrow: "// use cases",
        title: "Which teams need an integrated platform?",
        subtitle: "When multiple systems and channels must behave like one product",
        cards: [
          { icon: "key", title: "IT and security", outcome: "SSO and unified access across every system." },
          { icon: "platforms", title: "Multi-channel product", outcome: "Web, mobile, and admin on shared APIs and logic." },
          { icon: "consulting", title: "Architecture and integration", outcome: "Legacy and new systems behind one coherent layer." },
          { icon: "team", title: "Product leadership", outcome: "Add capability in stages without a full rewrite." },
        ],
      },
      features: {
        eyebrow: "// features",
        title: "What we typically deliver in an integrated platform",
        subtitle: "A common capability checklist — final scope is set after discovery.",
        callout: featuresCallout.en,
        items: [
          "SSO and centralized access management",
          "Unified APIs and service orchestration",
          "Modular, extensible architecture",
          "Legacy and modern system integration",
          "Multi-channel support across web, mobile, admin, and ops",
          "Monitoring, logging, and technical governance",
        ],
      },
      stack: {
        eyebrow: "// technology",
        title: "Typical stack",
        tags: ["SSO", "Unified APIs", "Modular Architecture", "Queues", "Webhooks", "Multi-channel"],
      },
      process: {
        eyebrow: "// delivery process",
        title: "From fragmentation to coherence",
        steps: [
          { title: "System mapping", body: "We identify systems, users, dependencies, and points of failure." },
          { title: "Platform core design", body: "Identity, APIs, event flows, and module boundaries are defined." },
          { title: "Staged implementation", body: "Systems are connected gradually so migration risk stays manageable." },
          { title: "Monitoring and expansion", body: "Once stable, new capabilities and channels are added on the same backbone." },
        ],
      },
      relatedService: {
        eyebrow: "// related service",
        title: "Consulting for architecture planning",
        body: "A platform initiative usually starts best with analysis and system mapping before major implementation begins.",
        href: "/services/consulting",
        cta: "View service",
      },
      crossNav: {
        eyebrow: "// other products",
        title: "Explore other product categories",
        linkLabel: "View",
      },
      pageCta: "Request an integrated platform",
    },
  },
};
