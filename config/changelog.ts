/**
 * Single source of truth for site version and changelog.
 * Bump APP_VERSION and add an entry here when shipping user-visible updates.
 */
export const APP_VERSION = "1.4.12";

export type ChangelogLocaleItems = {
  fa: string[];
  en: string[];
};

export type ChangelogEntry = {
  version: string;
  date: string;
  items: ChangelogLocaleItems;
};

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "1.4.12",
    date: "2026-07-11",
    items: {
      fa: [
        "هم‌تراز کردن عرض Hero با هدر — کاهش فاصله افقی کناره‌های صفحه",
      ],
      en: [
        "Aligned hero width with the header — reduced horizontal side gutters",
      ],
    },
  },
  {
    version: "1.4.11",
    date: "2026-07-11",
    items: {
      fa: [
        "اصلاح موقعیت نقاط دفاتر (تهران، شیراز، اهواز) روی نقشه Hero",
        "حذف نقاط برجسته تصادفی از نقشه — فقط شهرهای دفتر مشخص می‌شوند",
      ],
      en: [
        "Fixed office node positions (Tehran, Shiraz, Ahvaz) on the hero Iran map",
        "Removed random highlight dots — only office cities are marked now",
      ],
    },
  },
  {
    version: "1.4.10",
    date: "2026-07-11",
    items: {
      fa: ["حذف متن eyebrow از بخش Hero صفحه اصلی"],
      en: ["Removed hero eyebrow label from the homepage"],
    },
  },
  {
    version: "1.4.9",
    date: "2026-07-07",
    items: {
      en: [
        "Full about sub-pages for team, partners, and honors with dedicated content, cross-nav, and breadcrumbs",
        "Product hub at /product with category cards, value pillars, process, and linked paths to services and portfolio",
        "Five dedicated product sub-pages (web, mobile, windows, ai, platforms) with use cases, features, stacks, process, and CTAs",
      ],
      fa: [
        "تکمیل زیرصفحه‌های درباره ما برای تیم، شرکا و افتخارات با محتوای اختصاصی، ناوبری متقابل و breadcrumb",
        "صفحه هاب محصولات در /product با کارت‌های دسته‌بندی، ارزش‌های اصلی، فرآیند ساخت و لینک به خدمات و نمونه‌کار",
        "پنج زیرصفحه اختصاصی محصول (وب، موبایل، ویندوز، هوش مصنوعی، پلتفرم‌ها) با موارد استفاده، قابلیت‌ها، استک، فرآیند و CTA",
      ],
    },
  },
  {
    version: "1.4.8",
    date: "2026-07-07",
    items: {
      en: [
        "Consulting service page wired at /services/consulting with metadata and OG image",
        "Support & development page at /services/support — tiers, scope, stack, FAQ JSON-LD",
        "Full portfolio landing at /portfolio with stats, categories, featured projects, and approach",
        "Five portfolio sub-pages (websites, ecommerce, mobile-apps, desktop, other) with case studies and cross-nav",
      ],
      fa: [
        "اتصال صفحه مشاوره در /services/consulting با متادیتا و تصویر OG",
        "صفحه پشتیبانی و توسعه در /services/support — سطوح همکاری، دامنه خدمات، فناوری و FAQ",
        "صفحه کامل نمونه‌کار در /portfolio با آمار، دسته‌بندی، پروژه‌های منتخب و رویکرد",
        "پنج زیرصفحه نمونه‌کار (وب‌سایت، فروشگاه، موبایل، دسکتاپ، سایر) با مطالعات موردی و ناوبری متقابل",
      ],
    },
  },
  {
    version: "1.4.7",
    date: "2026-07-07",
    items: {
      en: [
        "iOS app service page at /services/ios — Swift, SwiftUI, App Store, TestFlight, FAQ JSON-LD",
        "SEO & optimization page at /services/seo — technical SEO, Core Web Vitals, audit deliverables, tools, FAQ",
        "Consulting & project analysis at /services/consulting — audience, deliverables, engagement models, before/after, FAQ",
      ],
      fa: [
        "صفحه اپلیکیشن iOS در /services/ios — Swift، SwiftUI، App Store، TestFlight و FAQ",
        "صفحه سئو و بهینه‌سازی در /services/seo — سئو فنی، Core Web Vitals، خروجی ممیزی، ابزارها و FAQ",
        "صفحه مشاوره و تحلیل پروژه در /services/consulting — مخاطب، تحویل‌دادنی‌ها، مدل همکاری، قبل/بعد و FAQ",
      ],
    },
  },
  {
    version: "1.4.6",
    date: "2026-07-06",
    items: {
      en: [
        "Android app service page at /services/android with native vs cross-platform comparison",
        "App types, features, Kotlin stack, Google Play publishing, process, and FAQ",
      ],
      fa: [
        "صفحه اپلیکیشن اندروید در /services/android",
        "انواع اپ، مقایسه بومی و کراس‌پلتفرم، امکانات، فناوری، انتشار Google Play و سوالات متداول",
      ],
    },
  },
  {
    version: "1.4.5",
    date: "2026-07-06",
    items: {
      en: [
        "E-commerce service page at /services/ecommerce with store types, features, and integrations",
        "Custom vs template comparison, admin panel overview, launch process, and FAQ",
      ],
      fa: [
        "صفحه خدمات فروشگاه اینترنتی در /services/ecommerce",
        "انواع فروشگاه، مقایسه اختصاصی و قالب، امکانات، یکپارچه‌سازی، پنل مدیریت و سوالات متداول",
      ],
    },
  },
  {
    version: "1.4.4",
    date: "2026-07-06",
    items: {
      en: [
        "Dedicated UI/UX service page at /services/ui-ux with outcome-focused sections",
        "UI vs UX comparison, design process, deliverables, and design-only portfolio showcase",
      ],
      fa: [
        "صفحه اختصاصی UI/UX در /services/ui-ux با تمرکز بر نتیجه و تجربه کاربر",
        "تفاوت UI و UX، فرآیند طراحی، خروجی‌ها و نمونه‌کارهای طراحی (بدون پروژه برنامه‌نویسی)",
      ],
    },
  },
  {
    version: "1.4.3",
    date: "2026-07-06",
    items: {
      en: [
        "Web design service page at /services/web-design with full landing sections",
        "Project types, custom vs template comparison, features, process timeline, tech stack, FAQ",
      ],
      fa: [
        "صفحه کامل خدمات طراحی وب‌سایت در /services/web-design",
        "انواع پروژه، مقایسه اختصاصی و قالب، امکانات، فرآیند، فناوری‌ها و سوالات متداول",
      ],
    },
  },
  {
    version: "1.4.2",
    date: "2026-07-06",
    items: {
      en: [
        "Removed demo seed/bootstrap flows — panel and admin are production-only",
        "Admin: invoices page (create, list, manual mark paid)",
        "Admin: project detail with phase updates, approvals, invoices, deliverable uploads",
        "Admin: user search in forms, organization creation, contracts list, status filters",
      ],
      fa: [
        "حذف مسیرهای دمو و bootstrap — پنل مشتری و ادمین فقط برای پروداکشن",
        "ادمین: صفحه فاکتورها (صدور، لیست، ثبت پرداخت دستی)",
        "ادمین: جزئیات پروژه با به‌روزرسانی فاز، تأیید، فاکتور و آپلود فایل تحویلی",
        "ادمین: جستجوی کاربر در فرم‌ها، ساخت سازمان، لیست قراردادها و فیلتر وضعیت",
      ],
    },
  },
  {
    version: "1.4.1",
    date: "2026-07-06",
    items: {
      en: [
        "Client panel layout uses more horizontal space on large screens",
        "Work With Us page at /contactus/collaborate with hiring and freelancer application forms",
        "File uploads for resume and portfolio; leads stored as collaborate_hiring / collaborate_freelancer",
      ],
      fa: [
        "پنل مشتری در صفحه‌نمایش‌های بزرگ فضای افقی بیشتری استفاده می‌کند",
        "صفحه همکاری با ما در /contactus/collaborate با فرم استخدام و همکاری پروژه‌ای",
        "آپلود رزومه و نمونه‌کار؛ ذخیره لید با نوع collaborate_hiring / collaborate_freelancer",
      ],
    },
  },
  {
    version: "1.4.0",
    date: "2026-07-05",
    items: {
      en: [
        "Major stack upgrade: Next.js 16, React 19, TypeScript 6, Tailwind CSS 4",
        "Motion library (framer-motion successor) and Next 16 async params/proxy routing",
        "Package deps updated to latest; production build verified",
      ],
      fa: [
        "ارتقای major: Next.js 16، React 19، TypeScript 6، Tailwind CSS 4",
        "کتابخانه Motion (جایگزین framer-motion) و routing جدید async/proxy در Next 16",
        "همه پکیج‌ها به آخرین نسخه؛ build پروداکشن تأیید شد",
      ],
    },
  },
  {
    version: "1.3.12", date: "2026-07-04", items: {
      en: [
        "Terminal UX color hierarchy, amber comments, dim secondary, accent green used sparingly", "Stats, icons, eyebrows, scroll bar, and nav numbers recolored for readability", ], fa: [
        "سلسله‌مراتب رنگ ترمینال, amber برای کامنت، dim برای ثانویه، سبز فقط accent", "آمار، آیکون‌ها، eyebrow و نوار اسکرول برای خوانایی بهتر تنظیم شد", ], }, }, {
    version: "1.3.11", date: "2026-07-04", items: {
      en: [
        "Hero stats dividers fixed for RTL (logical start edge)", "Browser tab title updates on language switch, slogan, brand on home", ], fa: [
        "خط جداکننده آمار در RTL اصلاح شد", "عنوان تب با تغییر زبان به‌روز می‌شود, «از Dialup تا AI, اولین دیتا»", ], }, }, {
    version: "1.3.10", date: "2026-07-04", items: {
      en: ["Hero stats RTL layout, right-aligned numbers and logical dividers in Persian"], fa: ["چیدمان RTL آمار هیرو, اعداد راست‌چین و خط جداکننده درست در فارسی"], }, }, {
    version: "1.3.9", date: "2026-07-04", items: {
      en: [
        "Fixed hero layout shake during slogan/brand effects, stable scramble + fade-in tagline", ], fa: [
        "رفع لرزش صفحه هنگام افکت شعار هیرو, scramble پایدار و نمایش بدون jitter", ], }, }, {
    version: "1.3.8", date: "2026-07-04", items: {
      en: ["Hero experience stat updated to 15+ years"], fa: ["آمار سال ساخت در هیرو به ۱۵+ سال به‌روز شد"], }, }, {
    version: "1.3.7", date: "2026-07-04", items: {
      en: [
        "Hero stats copy refreshed, removed SLA jargon, added short notes per metric", ], fa: [
        "متن آمار هیرو بازنویسی شد, حذف SLA، برچسب و توضیح کوتاه برای هر عدد", ], }, }, {
    version: "1.3.6", date: "2026-07-04", items: {
      en: [
        "Hero stats simplified to match hero frame, inline row with count-up, no separate window panel", ], fa: [
        "آمار هیرو ساده شد و با کادر اصلی هماهنگ شد, ردیف یک‌خطی با شمارنده، بدون پنجرهٔ جدا", ], }, }, {
    version: "1.3.5", date: "2026-07-04", items: {
      en: ["English hero brand title sized down to stay on one line"], fa: ["اندازهٔ عنوان انگلیسی هیرو برای نمایش در یک خط کوچک‌تر شد"], }, }, {
    version: "1.3.4", date: "2026-07-04", items: {
      en: [
        "Home hero stats redesigned as live terminal metrics panel with count-up and block meters", ], fa: [
        "آمار هیرو به پنل metrics ترمینالی با شمارندهٔ متحرک و نوار بلوکی بازطراحی شد", ], }, }, {
    version: "1.3.3", date: "2026-07-04", items: {
      en: ["Home hero slogan updated to “From the dialup era to the world of AI.”"], fa: ["شعار هیرو به «از روزهای Dialup تا دنیای AI» تغییر کرد"], }, }, {
    version: "1.3.2", date: "2026-07-04", items: {
      en: [
        "Home hero content appears immediately with staggered fade-in (removed 1.1s delay)", ], fa: [
        "محتوای هیرو بلافاصله با افکت fade-in پله‌ای نمایش داده می‌شود (حذف تأخیر ۱.۱ ثانیه)", ], }, }, {
    version: "1.3.1", date: "2026-07-04", items: {
      en: [
        "Terminal-style page navigation preloader between internal routes", "Shared route loading UI for Suspense fallbacks (app/loading.tsx)", ], fa: [
        "پری‌لودر ترمینالی بین صفحات داخلی هنگام ناوبری", "UI یکپارچهٔ loading برای Suspense (app/loading.tsx)", ], }, }, {
    version: "1.3.0", date: "2026-07-04", items: {
      en: [
        "Staff admin panel at /admin, projects, tickets, leads, contract upload, team management", "Lead → project conversion workflow from the staff leads page", "Staff ticket reply, status updates, and close from admin UI", "Zarinpal payment gateway for invoices (with manual pay_url fallback)", "PDF contracts with electronic signature record page", "Multi-user organizations (owner, manager, member) shared project access", "Email/SMS panel notifications via webhooks (PANEL_NOTIFY_* or OTP_* fallbacks)", "ADMIN_API_KEY and staff/admin roles documented in .env.example", ], fa: [
        "پنل Staff در /admin, پروژه، تیکت، درخواست، آپلود قرارداد، مدیریت تیم", "تبدیل lead به پروژه از صفحه درخواست‌های staff", "پاسخ، تغییر وضعیت و بستن تیکت از UI ادمین", "درگاه پرداخت زرین‌پال برای فاکتورها (با fallback لینک دستی)", "قرارداد PDF با صفحه ثبت امضای الکترونیک", "سازمان چندکاربره (مالک، مدیر، عضو) با دسترسی مشترک به پروژه", "اعلان ایمیل/SMS پنل از طریق webhook", "مستندسازی ADMIN_API_KEY و نقش staff/admin در .env.example", ], }, }, {
    version: "1.2.0", date: "2026-07-04", items: {
      en: [
        "Homepage services row (8 cards) and products row (5 cards) with plain-language copy", "Why Us, stats strip, and simplified contact CTA below the hero", "Unified terminal-style SVG icons replacing emoji across home sections", "Full client panel: dashboard, projects, contracts, tickets, files, invoices, requests, notifications, and account", "Persian numerals (۰,۹) and Rooyin digit font across the FA interface", "Contact requests linked to logged-in users; demo project seed for panel testing", "Header wordmark without underscore (First Data / اولین دیتا)", "PWA manifest same-origin fix, service worker MIME-safe caching, and standalone start scripts (dev:4000 / start:4000)", ], fa: [
        "ردیف خدمات (۸ کارت) و محصولات (۵ کارت) در صفحه اصلی با متن ساده", "بخش چرا ما، آمار، و دعوت تماس ساده‌شده زیر هیرو", "آیکون‌های SVG یکپارچه به‌جای emoji در بخش‌های صفحه اصلی", "پنل مشتری کامل: داشبورد، پروژه، قرارداد، تیکت، فایل، فاکتور، درخواست، اعلان و حساب کاربری", "ارقام فارسی (۰,۹) و فونت Rooyin برای اعداد در نسخه FA", "اتصال درخواست‌های تماس به کاربر لاگین‌شده؛ داده نمونه برای تست پنل", "لوگوی هدر بدون آندرلاین (اولین دیتا)", "رفع manifest، کش امن service worker، و اسکریپت اجرای standalone (dev:4000 / start:4000)", ], }, }, {
    version: "1.1.0", date: "2026-07-04", items: {
      en: [
        "Interactive Iran pixel map in the hero with Tehran, Shiraz, and Ahvaz markers", "Blog grid with category filters and localized article pages", "Hybrid navigation with mega-menu subpages for About, Product, Services, and Portfolio", "Footer copyright with locale-aware year, version badge, and changelog modal", "Terms page with usage rules and full release history", "Dev/build guardrails to prevent stale Next.js chunk 404s", ], fa: [
        "نقشه پیکسلی تعاملی ایران در هیرو با نشانگرهای تهران، شیراز و اهواز", "وبلاگ با فیلتر دسته‌بندی و صفحات مقاله دو زبانه", "ناوبری ترکیبی با زیرمنو برای درباره ما، محصولات، خدمات و نمونه‌کارها", "کپی‌رایت فوتر با سال شمسی/میلادی، نسخه و مودال changelog", "صفحه قوانین با شرایط استفاده و تاریخچه نسخه‌ها", "محافظت build/dev برای جلوگیری از خطای chunk در Next.js", ], }, }, {
    version: "1.0.0", date: "2026-01-15", items: {
      en: [
        "Initial First Data marketing site launch", "Bilingual FA/EN interface with terminal-themed UX", "Contact form, portfolio showcase, and service pages", ], fa: [
        "انتشار اولیه سایت اولین دیتا", "رابط دو زبانه فارسی/انگلیسی با تم ترمینال", "فرم تماس، نمونه‌کارها و صفحات خدمات", ], }, }, ];
