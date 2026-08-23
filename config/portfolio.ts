export type PortfolioCategory =
  | "websites"
  | "ecommerce"
  | "mobile-apps"
  | "desktop"
  | "other";

export type PortfolioProject = {
  id: string;
  category: PortfolioCategory;
  featured?: boolean;
  year?: string;
  /** Public path under /portfolio — SVG shell or future PNG screenshot */
  cover?: string;
  title: { fa: string; en: string };
  description: { fa: string; en: string };
  outcome: { fa: string; en: string };
  tags: string[];
};

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  "websites",
  "ecommerce",
  "mobile-apps",
  "desktop",
  "other",
];

export const SLUG_TO_CATEGORY: Record<string, PortfolioCategory> = {
  websites: "websites",
  ecommerce: "ecommerce",
  "mobile-apps": "mobile-apps",
  desktop: "desktop",
  other: "other",
};

const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  // — websites —
  {
    id: "corp-brand-site",
    category: "websites",
    featured: true,
    cover: "/portfolio/websites.svg",
    year: "2024",
    title: {
      fa: "وب‌سایت معرفی شرکت صنعتی",
      en: "Industrial Corporate Brand Site",
    },
    description: {
      fa: "سایت چندزبانه با صفحات خدمات، نمونه‌کار و فرم تماس یکپارچه با CRM داخلی.",
      en: "Multilingual site with services pages, case highlights, and contact forms integrated with an internal CRM.",
    },
    outcome: {
      fa: "تیم فروش از یک نقطه واحد برای دریافت و پیگیری سرنخ‌ها استفاده می‌کند.",
      en: "The sales team works from a single hub for lead intake and follow-up.",
    },
    tags: ["Next.js", "TypeScript", "Tailwind", "i18n"],
  },
  {
    id: "cms-editorial",
    category: "websites",
    featured: true,
    cover: "/portfolio/websites.svg",
    year: "2023",
    title: {
      fa: "پرتال محتوایی با CMS اختصاصی",
      en: "Editorial Portal with Custom CMS",
    },
    description: {
      fa: "سامانه انتشار مقاله، دسته‌بندی و مدیریت رسانه برای تیم محتوا بدون وابستگی به وردپرس.",
      en: "Article publishing, taxonomy, and media management for a content team without WordPress dependency.",
    },
    outcome: {
      fa: "زمان انتشار محتوا کوتاه‌تر و ساختار URL پایدار برای سئو حفظ شد.",
      en: "Publishing cycles shortened and stable URL structure was preserved for SEO.",
    },
    tags: ["Next.js", "SQLite", "React", "SSR"],
  },
  {
    id: "association-site",
    category: "websites",
    year: "2023",
    title: {
      fa: "وب‌سایت انجمن حرفه‌ای",
      en: "Professional Association Website",
    },
    description: {
      fa: "معرفی رویدادها، عضویت، آرشیو خبر و جستجوی اعضا با دسترسی نقش‌محور.",
      en: "Events, membership info, news archive, and member search with role-based access.",
    },
    outcome: {
      fa: "اطلاعات عمومی و بخش اعضا از هم جدا شد و پشتیبانی ساده‌تر شد.",
      en: "Public information and member areas were separated for simpler maintenance.",
    },
    tags: ["React", "Tailwind", "Auth", "PostgreSQL"],
  },
  {
    id: "services-landing",
    category: "websites",
    year: "2022",
    title: {
      fa: "لندینگ خدمات B2B",
      en: "B2B Services Landing",
    },
    description: {
      fa: "صفحات تخصصی برای هر خط خدمات، FAQ ساختاریافته و فرم درخواست مشاوره.",
      en: "Dedicated pages per service line, structured FAQ, and consultation request forms.",
    },
    outcome: {
      fa: "درخواست‌های ورودی با برچسب خدمات دسته‌بندی می‌شوند.",
      en: "Incoming requests are categorized by service type at intake.",
    },
    tags: ["Next.js", "Motion", "Forms", "Analytics"],
  },

  // — ecommerce —
  {
    id: "b2c-fashion",
    category: "ecommerce",
    featured: true,
    cover: "/portfolio/ecommerce.svg",
    year: "2024",
    title: {
      fa: "فروشگاه B2C پوشاک",
      en: "B2C Fashion Store",
    },
    description: {
      fa: "کاتالوگ محصول، فیلتر سایز و رنگ، سبد خرید و پرداخت آنلاین با زرین‌پال.",
      en: "Product catalog, size and color filters, cart, and online checkout via Zarinpal.",
    },
    outcome: {
      fa: "سفارش‌ها از پنل مدیریت قابل پیگیری و وضعیت ارسال به مشتری اعلام می‌شود.",
      en: "Orders are trackable in admin and shipment status is communicated to customers.",
    },
    tags: ["Next.js", "Zarinpal", "SQLite", "Admin Panel"],
  },
  {
    id: "b2b-wholesale",
    category: "ecommerce",
    year: "2023",
    title: {
      fa: "پرتال عمده‌فروشی B2B",
      en: "B2B Wholesale Portal",
    },
    description: {
      fa: "قیمت‌گذاری قراردادی، سفارش حجمی و تایید اعتبار قبل از ثبت نهایی.",
      en: "Contract pricing, bulk ordering, and credit approval before final checkout.",
    },
    outcome: {
      fa: "فرایند سفارش عمده بدون تماس تلفنی تکراری انجام می‌شود.",
      en: "Bulk ordering runs without repeated phone coordination.",
    },
    tags: ["React", "REST API", "Role-based", "Invoicing"],
  },
  {
    id: "digital-marketplace",
    category: "ecommerce",
    featured: true,
    cover: "/portfolio/ecommerce.svg",
    year: "2023",
    title: {
      fa: "بازارچه محصولات دیجیتال",
      en: "Digital Products Marketplace",
    },
    description: {
      fa: "فروش لایسنس و فایل قابل دانلود با تحویل خودکار پس از پرداخت.",
      en: "License and downloadable file sales with automatic delivery after payment.",
    },
    outcome: {
      fa: "تحویل فوری و کاهش کار دستی پشتیبانی برای ارسال فایل.",
      en: "Instant delivery reduced manual support work for file distribution.",
    },
    tags: ["Next.js", "Payment Gateway", "Webhooks", "Email"],
  },
  {
    id: "specialty-food",
    category: "ecommerce",
    year: "2022",
    title: {
      fa: "فروشگاه مواد غذایی تخصصی",
      en: "Specialty Food E-commerce",
    },
    description: {
      fa: "مدیریت موجودی محدود، بازه ارسال و هشدار اتمام موجودی.",
      en: "Limited stock management, delivery windows, and low-stock alerts.",
    },
    outcome: {
      fa: "فروش فصلی بدون oversell و شفافیت موجودی برای مشتری.",
      en: "Seasonal sales without overselling and clear stock visibility for buyers.",
    },
    tags: ["Next.js", "Inventory", "SMS", "Admin"],
  },

  // — mobile-apps —
  {
    id: "field-service-android",
    category: "mobile-apps",
    featured: true,
    cover: "/portfolio/mobile-apps.svg",
    year: "2024",
    title: {
      fa: "اپ اندروید سرویس میدانی",
      en: "Android Field Service App",
    },
    description: {
      fa: "ثبت کار میدانی، عکس، امضا و همگام‌سازی آفلاین با سرور مرکزی.",
      en: "Field job logging, photos, signatures, and offline sync with a central server.",
    },
    outcome: {
      fa: "گزارش‌های میدانی همان روز در دفتر قابل مشاهده است.",
      en: "Field reports are visible at the office the same day.",
    },
    tags: ["Kotlin", "Android", "Offline Sync", "REST"],
  },
  {
    id: "ios-companion",
    category: "mobile-apps",
    year: "2023",
    title: {
      fa: "اپ iOS همراه سامانه سازمانی",
      en: "iOS Companion for Enterprise System",
    },
    description: {
      fa: "اعلان‌ها، تایید درخواست‌ها و مشاهده وضعیت پروژه برای مدیران.",
      en: "Notifications, request approvals, and project status for managers.",
    },
    outcome: {
      fa: "تصمیم‌های ساده بدون ورود به دسکتاپ انجام می‌شود.",
      en: "Routine decisions happen without logging into desktop systems.",
    },
    tags: ["Swift", "SwiftUI", "Push", "JWT"],
  },
  {
    id: "delivery-driver",
    category: "mobile-apps",
    year: "2023",
    title: {
      fa: "اپ راننده توزیع",
      en: "Delivery Driver App",
    },
    description: {
      fa: "مسیریابی سفارش، تایید تحویل و به‌روزرسانی وضعیت برای انبار.",
      en: "Order routing, delivery confirmation, and status updates for the warehouse.",
    },
    outcome: {
      fa: "هماهنگی بین انبار و راننده از طریق وضعیت لحظه‌ای بهبود یافت.",
      en: "Warehouse and driver coordination improved through live status updates.",
    },
    tags: ["Kotlin", "GPS", "Maps", "Background Sync"],
  },
  {
    id: "internal-comms",
    category: "mobile-apps",
    year: "2022",
    title: {
      fa: "اپ ارتباطات داخلی",
      en: "Internal Communications App",
    },
    description: {
      fa: "اطلاعیه‌ها، تقویم تیمی و دسترسی سریع به اسناد سازمانی.",
      en: "Announcements, team calendar, and quick access to organizational documents.",
    },
    outcome: {
      fa: "کانال واحد برای اخبار داخلی جایگزین پیام‌های پراکنده شد.",
      en: "A single internal news channel replaced scattered messaging.",
    },
    tags: ["Kotlin", "Firebase", "Documents", "Notifications"],
  },

  // — desktop —
  {
    id: "windows-erp",
    category: "desktop",
    featured: true,
    cover: "/portfolio/desktop.svg",
    year: "2023",
    title: {
      fa: "کلاینت ویندوز ERP",
      en: "Windows ERP Client",
    },
    description: {
      fa: "ماژول‌های انبار، فاکتور و گزارش‌گیری برای کاربران دفتر با اتصال به API مرکزی.",
      en: "Inventory, invoicing, and reporting modules for office users connected to a central API.",
    },
    outcome: {
      fa: "کاربران به داده یکسان در محیط دسکتاپ آشنا دسترسی دارند.",
      en: "Users access consistent data in a familiar desktop environment.",
    },
    tags: [".NET", "WPF", "REST API", "SQLite"],
  },
  {
    id: "inventory-desktop",
    category: "desktop",
    year: "2023",
    title: {
      fa: "نرم‌افزار مدیریت انبار دسکتاپ",
      en: "Desktop Inventory Management",
    },
    description: {
      fa: "ورود و خروج کالا، بارکد و چاپ برچسب در محیط آفلاین با همگام‌سازی دوره‌ای.",
      en: "Stock in/out, barcode scanning, and label printing offline with periodic sync.",
    },
    outcome: {
      fa: "شمارش انبار سریع‌تر و خطای دستی کمتر شد.",
      en: "Stock counts became faster with fewer manual entry errors.",
    },
    tags: [".NET", "Barcode", "Printing", "Sync"],
  },
  {
    id: "document-processor",
    category: "desktop",
    year: "2022",
    title: {
      fa: "ابزار پردازش اسناد ویندوز",
      en: "Windows Document Processing Tool",
    },
    description: {
      fa: "تبدیل دسته‌ای PDF، استخراج متادیتا و خروجی برای آرشیو سازمانی.",
      en: "Batch PDF conversion, metadata extraction, and export for organizational archive.",
    },
    outcome: {
      fa: "آرشیو اسناد قدیمی بدون ورود دستی تک‌تک فایل‌ها انجام شد.",
      en: "Legacy document archiving completed without manual per-file entry.",
    },
    tags: ["C#", "PDF", "Desktop", "Automation"],
  },
  {
    id: "pos-terminal",
    category: "desktop",
    year: "2022",
    title: {
      fa: "صندوق فروشگاهی (POS)",
      en: "Point-of-Sale Terminal",
    },
    description: {
      fa: "ثبت فروش، چاپ رسید و اتصال به موجودی مرکزی در شعبه.",
      en: "Sales recording, receipt printing, and connection to central stock per branch.",
    },
    outcome: {
      fa: "گزارش فروش شعبه همان روز در مرکز در دسترس است.",
      en: "Branch sales reports are available at headquarters the same day.",
    },
    tags: ["Windows", ".NET", "POS", "Printing"],
  },

  // — other —
  {
    id: "api-integration-hub",
    category: "other",
    featured: true,
    cover: "/portfolio/other.svg",
    year: "2024",
    title: {
      fa: "هاب یکپارچه‌سازی API",
      en: "API Integration Hub",
    },
    description: {
      fa: "اتصال CRM، انبار و درگاه پرداخت با صف رویداد و مانیتورینگ خطا.",
      en: "CRM, warehouse, and payment gateway connections with event queue and error monitoring.",
    },
    outcome: {
      fa: "تبادل داده بین سامانه‌ها بدون کپی دستی انجام می‌شود.",
      en: "Data exchange between systems runs without manual copy-paste.",
    },
    tags: ["Node.js", "REST", "Webhooks", "Queue"],
  },
  {
    id: "data-migration",
    category: "other",
    year: "2023",
    title: {
      fa: "خط لوله مهاجرت داده",
      en: "Data Migration Pipeline",
    },
    description: {
      fa: "استخراج از پایگاه قدیمی، تبدیل و بارگذاری تدریجی با گزارش اعتبارسنجی.",
      en: "Extract from legacy database, transform, and staged load with validation reports.",
    },
    outcome: {
      fa: "مهاجرت با حداقل توقف سرویس و قابلیت بازگشت مرحله‌ای انجام شد.",
      en: "Migration completed with minimal downtime and staged rollback capability.",
    },
    tags: ["Python", "ETL", "SQL", "Validation"],
  },
  {
    id: "legacy-bridge",
    category: "other",
    year: "2022",
    title: {
      fa: "پل مدرن‌سازی سامانه قدیمی",
      en: "Legacy System Modernization Bridge",
    },
    description: {
      fa: "لایه API روی نرم‌افزار قدیمی برای اتصال رابط وب جدید بدون بازنویسی کامل.",
      en: "API layer on legacy software to connect a new web UI without full rewrite.",
    },
    outcome: {
      fa: "کاربران از رابط جدید استفاده می‌کنند در حالی که هسته قدیمی فعال است.",
      en: "Users work in the new interface while the legacy core remains operational.",
    },
    tags: ["API Bridge", "Node.js", "Auth", "Gradual Rollout"],
  },
  {
    id: "automation-dashboard",
    category: "other",
    year: "2022",
    title: {
      fa: "داشبورد اتوماسیون و مانیتورینگ",
      en: "Automation & Monitoring Dashboard",
    },
    description: {
      fa: "نمایش وضعیت jobها، هشدار خطا و راه‌اندازی مجدد از یک پنل وب.",
      en: "Job status display, error alerts, and restart controls from a web panel.",
    },
    outcome: {
      fa: "تیم عملیات بدون SSH مستقیم وضعیت را می‌بیند.",
      en: "Operations staff view status without direct SSH access.",
    },
    tags: ["React", "Webhooks", "Cron", "Alerts"],
  },
];

export function getProjectsByCategory(cat: PortfolioCategory): PortfolioProject[] {
  return PORTFOLIO_PROJECTS.filter((p) => p.category === cat);
}

export function getFeaturedProjects(): PortfolioProject[] {
  return PORTFOLIO_PROJECTS.filter((p) => p.featured);
}

export function getAllProjects(): PortfolioProject[] {
  return PORTFOLIO_PROJECTS;
}

export function getProjectById(id: string): PortfolioProject | undefined {
  return PORTFOLIO_PROJECTS.find((p) => p.id === id);
}
