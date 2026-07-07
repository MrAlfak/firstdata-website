import type { Lang } from "./dictionaries";
import type { PortfolioCategory } from "@/config/portfolio";

export type PortfolioSubPageUi = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  capabilities: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  tech: {
    eyebrow: string;
    title: string;
    tags: string[];
  };
  crossNav: {
    eyebrow: string;
    title: string;
    linkLabel: string;
  };
  cta: string;
};

export type PortfolioSubPageDictionaries = Record<PortfolioCategory, PortfolioSubPageUi>;

export const portfolioSubPageDictionaries: Record<Lang, PortfolioSubPageDictionaries> = {
  fa: {
    websites: {
      hero: {
        eyebrow: "> بارگذاری /portfolio/websites...",
        title: "وب‌سایت‌ها",
        lead: "سایت شرکتی، پرتال محتوا و لندینگ‌های خدماتی.",
        body: "پروژه‌هایی که حضور آنلاین، انتشار محتوا و جذب سرنخ را برای سازمان‌ها فراهم کرده‌اند — با تمرکز بر سرعت، سئو و نگهداری ساده.",
      },
      projects: {
        eyebrow: "// پروژه‌ها",
        title: "نمونه‌های وب‌سایت",
        subtitle: "هر مورد نمایانگر نوع سایتی است که معمولاً طراحی و پیاده‌سازی می‌کنیم.",
      },
      capabilities: {
        eyebrow: "// قابلیت‌ها",
        title: "معمولاً چه تحویل می‌دهیم",
        items: [
          "طراحی واکنش‌گرا و سازگار با موبایل",
          "چندزبانه (فارسی / انگلیسی)",
          "CMS یا پنل مدیریت محتوا",
          "فرم تماس و یکپارچه‌سازی CRM",
          "سئو فنی و ساختار URL پایدار",
          "عملکرد بالا و Core Web Vitals",
        ],
      },
      tech: {
        eyebrow: "// فناوری",
        title: "استک‌های رایج",
        tags: ["Next.js", "React", "TypeScript", "Tailwind", "SSR", "i18n", "SQLite", "PostgreSQL"],
      },
      crossNav: {
        eyebrow: "// سایر دسته‌ها",
        title: "دسته‌های دیگر نمونه‌کار",
        linkLabel: "مشاهده",
      },
      cta: "پروژه وب‌سایت مشابه دارید؟",
    },
    ecommerce: {
      hero: {
        eyebrow: "> بارگذاری /portfolio/ecommerce...",
        title: "فروشگاه اینترنتی",
        lead: "تجربه خرید آنلاین از B2C تا B2B.",
        body: "فروشگاه‌هایی با پرداخت آنلاین، مدیریت موجودی و پنل سفارش — برای برندهای خرده‌فروشی و عمده‌فروشی.",
      },
      projects: {
        eyebrow: "// پروژه‌ها",
        title: "نمونه‌های فروشگاه",
        subtitle: "از فروشگاه پوشاک تا بازارچه محصولات دیجیتال.",
      },
      capabilities: {
        eyebrow: "// قابلیت‌ها",
        title: "معمولاً چه تحویل می‌دهیم",
        items: [
          "کاتالوگ محصول و فیلتر پیشرفته",
          "سبد خرید و checkout",
          "درگاه پرداخت (زرین‌پال و …)",
          "پنل مدیریت سفارش و موجودی",
          "قیمت‌گذاری B2B و قراردادی",
          "اعلان وضعیت سفارش به مشتری",
        ],
      },
      tech: {
        eyebrow: "// فناوری",
        title: "استک‌های رایج",
        tags: ["Next.js", "Zarinpal", "SQLite", "Admin Panel", "REST API", "Inventory", "SMS"],
      },
      crossNav: {
        eyebrow: "// سایر دسته‌ها",
        title: "دسته‌های دیگر نمونه‌کار",
        linkLabel: "مشاهده",
      },
      cta: "فروشگاه آنلاین می‌خواهید؟",
    },
    "mobile-apps": {
      hero: {
        eyebrow: "> بارگذاری /portfolio/mobile-apps...",
        title: "اپلیکیشن موبایل",
        lead: "اندروید، iOS و اپ‌های سازمانی.",
        body: "اپ‌هایی برای سرویس میدانی، مدیریت، توزیع و ارتباطات داخلی — با تمرکز بر عملکرد آفلاین و همگام‌سازی.",
      },
      projects: {
        eyebrow: "// پروژه‌ها",
        title: "نمونه‌های موبایل",
        subtitle: "اپ‌های بومی و سازمانی که در استور یا به‌صورت داخلی منتشر شده‌اند.",
      },
      capabilities: {
        eyebrow: "// قابلیت‌ها",
        title: "معمولاً چه تحویل می‌دهیم",
        items: [
          "طراحی UI بومی پلتفرم",
          "همگام‌سازی آفلاین / آنلاین",
          "اعلان push",
          "اتصال به API و احراز هویت",
          "انتشار Google Play و App Store",
          "پشتیبانی نسخه‌های OS جدید",
        ],
      },
      tech: {
        eyebrow: "// فناوری",
        title: "استک‌های رایج",
        tags: ["Kotlin", "Swift", "SwiftUI", "Android", "REST", "JWT", "Push", "Offline Sync"],
      },
      crossNav: {
        eyebrow: "// سایر دسته‌ها",
        title: "دسته‌های دیگر نمونه‌کار",
        linkLabel: "مشاهده",
      },
      cta: "اپ موبایل نیاز دارید؟",
    },
    desktop: {
      hero: {
        eyebrow: "> بارگذاری /portfolio/desktop...",
        title: "نرم‌افزار دسکتاپ",
        lead: "کلاینت ویندوز و ابزارهای داخلی.",
        body: "نرم‌افزارهایی برای انبار، فروش، ERP و پردازش اسناد — با اتصال به API مرکزی و عملکرد محلی.",
      },
      projects: {
        eyebrow: "// پروژه‌ها",
        title: "نمونه‌های دسکتاپ",
        subtitle: "ابزارهایی که تیم‌های دفتر و عملیات روزانه از آن استفاده می‌کنند.",
      },
      capabilities: {
        eyebrow: "// قابلیت‌ها",
        title: "معمولاً چه تحویل می‌دهیم",
        items: [
          "رابط دسکتاپ ویندوز",
          "اتصال به API / دیتابیس مرکزی",
          "چاپ و بارکد",
          "کار آفلاین با همگام‌سازی",
          "نصب و به‌روزرسانی کنترل‌شده",
          "گزارش‌گیری و export",
        ],
      },
      tech: {
        eyebrow: "// فناوری",
        title: "استک‌های رایج",
        tags: [".NET", "WPF", "C#", "SQLite", "REST API", "Barcode", "POS", "Printing"],
      },
      crossNav: {
        eyebrow: "// سایر دسته‌ها",
        title: "دسته‌های دیگر نمونه‌کار",
        linkLabel: "مشاهده",
      },
      cta: "نرم‌افزار دسکتاپ می‌خواهید؟",
    },
    other: {
      hero: {
        eyebrow: "> بارگذاری /portfolio/other...",
        title: "سایر پروژه‌ها",
        lead: "یکپارچه‌سازی، مهاجرت و مدرن‌سازی.",
        body: "پروژه‌هایی که زیرساخت، داده و سامانه‌های قدیمی را به محیط مدرن وصل می‌کنند — بدون توقف کامل کسب‌وکار.",
      },
      projects: {
        eyebrow: "// پروژه‌ها",
        title: "نمونه‌های یکپارچه‌سازی و زیرساخت",
        subtitle: "هاب API، مهاجرت داده، پل legacy و داشبورد عملیات.",
      },
      capabilities: {
        eyebrow: "// قابلیت‌ها",
        title: "معمولاً چه تحویل می‌دهیم",
        items: [
          "طراحی و پیاده‌سازی API",
          "صف رویداد و webhook",
          "مهاجرت داده با اعتبارسنجی",
          "لایه bridge روی سامانه قدیمی",
          "مانیتورینگ و هشدار",
          "مستندسازی فنی و runbook",
        ],
      },
      tech: {
        eyebrow: "// فناوری",
        title: "استک‌های رایج",
        tags: ["Node.js", "Python", "REST", "Webhooks", "ETL", "SQL", "Queue", "React"],
      },
      crossNav: {
        eyebrow: "// سایر دسته‌ها",
        title: "دسته‌های دیگر نمونه‌کار",
        linkLabel: "مشاهده",
      },
      cta: "یکپارچه‌سازی یا مهاجرت دارید؟",
    },
  },
  en: {
    websites: {
      hero: {
        eyebrow: "> loading /portfolio/websites...",
        title: "Websites",
        lead: "Corporate sites, content portals, and service landings.",
        body: "Projects that established online presence, content publishing, and lead capture — focused on speed, SEO, and maintainability.",
      },
      projects: {
        eyebrow: "// projects",
        title: "Website case studies",
        subtitle: "Each entry represents a type of site we typically design and build.",
      },
      capabilities: {
        eyebrow: "// capabilities",
        title: "What we typically deliver",
        items: [
          "Responsive, mobile-friendly design",
          "Multilingual (FA / EN)",
          "CMS or content admin panel",
          "Contact forms and CRM integration",
          "Technical SEO and stable URL structure",
          "High performance and Core Web Vitals",
        ],
      },
      tech: {
        eyebrow: "// technology",
        title: "Common stacks",
        tags: ["Next.js", "React", "TypeScript", "Tailwind", "SSR", "i18n", "SQLite", "PostgreSQL"],
      },
      crossNav: {
        eyebrow: "// other categories",
        title: "Explore other portfolio categories",
        linkLabel: "View",
      },
      cta: "Planning a similar website?",
    },
    ecommerce: {
      hero: {
        eyebrow: "> loading /portfolio/ecommerce...",
        title: "Online Stores",
        lead: "E-commerce from B2C to B2B.",
        body: "Stores with online payment, inventory management, and order admin — for retail brands and wholesale operations.",
      },
      projects: {
        eyebrow: "// projects",
        title: "Store case studies",
        subtitle: "From fashion retail to digital product marketplaces.",
      },
      capabilities: {
        eyebrow: "// capabilities",
        title: "What we typically deliver",
        items: [
          "Product catalog and advanced filters",
          "Cart and checkout",
          "Payment gateway (Zarinpal, etc.)",
          "Order and inventory admin",
          "B2B and contract pricing",
          "Order status notifications",
        ],
      },
      tech: {
        eyebrow: "// technology",
        title: "Common stacks",
        tags: ["Next.js", "Zarinpal", "SQLite", "Admin Panel", "REST API", "Inventory", "SMS"],
      },
      crossNav: {
        eyebrow: "// other categories",
        title: "Explore other portfolio categories",
        linkLabel: "View",
      },
      cta: "Need an online store?",
    },
    "mobile-apps": {
      hero: {
        eyebrow: "> loading /portfolio/mobile-apps...",
        title: "Mobile Apps",
        lead: "Android, iOS, and enterprise apps.",
        body: "Apps for field service, management, delivery, and internal comms — with offline performance and sync.",
      },
      projects: {
        eyebrow: "// projects",
        title: "Mobile case studies",
        subtitle: "Native and enterprise apps shipped to stores or internal distribution.",
      },
      capabilities: {
        eyebrow: "// capabilities",
        title: "What we typically deliver",
        items: [
          "Platform-native UI design",
          "Offline / online sync",
          "Push notifications",
          "API and authentication",
          "Google Play and App Store release",
          "Support for new OS versions",
        ],
      },
      tech: {
        eyebrow: "// technology",
        title: "Common stacks",
        tags: ["Kotlin", "Swift", "SwiftUI", "Android", "REST", "JWT", "Push", "Offline Sync"],
      },
      crossNav: {
        eyebrow: "// other categories",
        title: "Explore other portfolio categories",
        linkLabel: "View",
      },
      cta: "Need a mobile app?",
    },
    desktop: {
      hero: {
        eyebrow: "> loading /portfolio/desktop...",
        title: "Desktop Software",
        lead: "Windows clients and internal tools.",
        body: "Software for warehouse, sales, ERP, and document processing — connected to central APIs with local performance.",
      },
      projects: {
        eyebrow: "// projects",
        title: "Desktop case studies",
        subtitle: "Tools office and operations teams use every day.",
      },
      capabilities: {
        eyebrow: "// capabilities",
        title: "What we typically deliver",
        items: [
          "Windows desktop UI",
          "Central API / database connection",
          "Printing and barcode",
          "Offline work with sync",
          "Controlled install and updates",
          "Reporting and export",
        ],
      },
      tech: {
        eyebrow: "// technology",
        title: "Common stacks",
        tags: [".NET", "WPF", "C#", "SQLite", "REST API", "Barcode", "POS", "Printing"],
      },
      crossNav: {
        eyebrow: "// other categories",
        title: "Explore other portfolio categories",
        linkLabel: "View",
      },
      cta: "Need desktop software?",
    },
    other: {
      hero: {
        eyebrow: "> loading /portfolio/other...",
        title: "Other Projects",
        lead: "Integration, migration, and modernization.",
        body: "Projects that connect infrastructure, data, and legacy systems to modern environments — without full business shutdown.",
      },
      projects: {
        eyebrow: "// projects",
        title: "Integration and infrastructure case studies",
        subtitle: "API hubs, data migration, legacy bridges, and ops dashboards.",
      },
      capabilities: {
        eyebrow: "// capabilities",
        title: "What we typically deliver",
        items: [
          "API design and implementation",
          "Event queue and webhooks",
          "Data migration with validation",
          "Bridge layer on legacy systems",
          "Monitoring and alerts",
          "Technical docs and runbooks",
        ],
      },
      tech: {
        eyebrow: "// technology",
        title: "Common stacks",
        tags: ["Node.js", "Python", "REST", "Webhooks", "ETL", "SQL", "Queue", "React"],
      },
      crossNav: {
        eyebrow: "// other categories",
        title: "Explore other portfolio categories",
        linkLabel: "View",
      },
      cta: "Need integration or migration?",
    },
  },
};

export function getPortfolioSubPage(lang: Lang, category: PortfolioCategory): PortfolioSubPageUi {
  return portfolioSubPageDictionaries[lang][category];
}
