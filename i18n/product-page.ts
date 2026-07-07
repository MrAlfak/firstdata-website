import type { Lang } from "./dictionaries";

export type ProductSlug = "web" | "mobile" | "windows" | "ai" | "platforms";

export type ProductPageUi = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    cta: string;
  };
  categories: {
    eyebrow: string;
    title: string;
    cards: { slug: ProductSlug; title: string; body: string; linkLabel: string }[];
  };
  pillars: {
    eyebrow: string;
    title: string;
    items: { title: string; body: string }[];
  };
  process: {
    eyebrow: string;
    title: string;
    steps: { title: string; body: string }[];
  };
  links: {
    eyebrow: string;
    title: string;
    servicesTitle: string;
    servicesBody: string;
    servicesHref: string;
    portfolioTitle: string;
    portfolioBody: string;
    portfolioHref: string;
    linkLabel: string;
  };
};

export const productPageDictionaries: Record<Lang, ProductPageUi> = {
  fa: {
    hero: {
      eyebrow: "> بارگذاری /product...",
      title: "محصولات و خطوط راهکار",
      lead: "از وب‌اپ و اپ موبایل تا AI و پلتفرم‌های یکپارچه، محصول را متناسب با مسیر واقعی رشد شما می‌سازیم.",
      body: "صفحه محصولات First Data دسته‌های اصلی راهکارهای ما را نشان می‌دهد. هر دسته بر نوعی از مسئله تمرکز دارد: تجربه کاربر، عملیات داخلی، یکپارچه‌سازی، اتوماسیون یا مقیاس‌پذیری.",
      cta: "ثبت درخواست پروژه",
    },
    categories: {
      eyebrow: "// دسته‌ها",
      title: "کدام مسیر محصول به نیاز شما نزدیک‌تر است؟",
      cards: [
        {
          slug: "web",
          title: "محصولات وب",
          body: "سایت، CMS، پنل مدیریت، پورتال مشتری و APIهای متصل.",
          linkLabel: "مشاهده جزئیات",
        },
        {
          slug: "mobile",
          title: "محصولات موبایل",
          body: "اپ Android و iOS با تجربه آفلاین، اعلان و همگام‌سازی.",
          linkLabel: "مشاهده جزئیات",
        },
        {
          slug: "windows",
          title: "محصولات ویندوز",
          body: "نرم‌افزارهای LOB، ابزارهای داخلی، MSI و مسیر به‌روزرسانی کنترل‌شده.",
          linkLabel: "مشاهده جزئیات",
        },
        {
          slug: "ai",
          title: "محصولات هوش مصنوعی",
          body: "LLM، RAG، اتوماسیون و جریان‌های privacy-first برای تیم‌ها و کسب‌وکارها.",
          linkLabel: "مشاهده جزئیات",
        },
        {
          slug: "platforms",
          title: "پلتفرم‌های یکپارچه",
          body: "SSO، APIهای واحد، orchestration چندکاناله و معماری ماژولار.",
          linkLabel: "مشاهده جزئیات",
        },
      ],
    },
    pillars: {
      eyebrow: "// مزیت اصلی",
      title: "سه اصل مشترک در همه محصولات",
      items: [
        {
          title: "قابل نگهداری از روز اول",
          body: "محصول باید بعد از لانچ هم قابل توسعه و پشتیبانی بماند، نه اینکه فقط نسخه اول را تحویل دهد.",
        },
        {
          title: "هم‌راستا با عملیات",
          body: "ما فقط UI نمی‌سازیم؛ فرآیند، نقش‌ها، داده و جریان تصمیم را هم در نظر می‌گیریم.",
        },
        {
          title: "آماده رشد مرحله‌ای",
          body: "هر محصول طوری طراحی می‌شود که بتواند با نیازهای بعدی، یکپارچه‌سازی‌ها و کانال‌های جدید توسعه پیدا کند.",
        },
      ],
    },
    process: {
      eyebrow: "// نحوه ساخت",
      title: "چگونه این محصولات را جلو می‌بریم",
      steps: [
        {
          title: "کشف مسئله",
          body: "تعریف نیاز واقعی، کاربران، ریسک‌ها و نتیجه‌ای که باید به آن برسیم.",
        },
        {
          title: "طراحی معماری و تجربه",
          body: "تعیین ساختار محصول، مدل داده، جریان‌های کلیدی و مسیر توسعه.",
        },
        {
          title: "تحویل مرحله‌ای",
          body: "ساخت MVP یا milestoneهای روشن با بازخورد مستمر و قابلیت اندازه‌گیری.",
        },
        {
          title: "پایداری و گسترش",
          body: "پایش، مستندسازی، نگهداری و آماده‌سازی برای iterationهای بعدی.",
        },
      ],
    },
    links: {
      eyebrow: "// مسیرهای مکمل",
      title: "از محصولات به خدمات و نمونه‌کار",
      servicesTitle: "مشاهده خدمات",
      servicesBody: "اگر هنوز بین راهکارها مردد هستید، از صفحه خدمات شروع کنید و مدل همکاری مناسب را ببینید.",
      servicesHref: "/services",
      portfolioTitle: "مشاهده نمونه‌کارها",
      portfolioBody: "اگر می‌خواهید خروجی‌های مشابه را ببینید، از نمونه‌کارها وارد دسته‌بندی‌های پروژه شوید.",
      portfolioHref: "/portfolio",
      linkLabel: "باز کردن",
    },
  },
  en: {
    hero: {
      eyebrow: "> loading /product...",
      title: "Products & Solution Lines",
      lead: "From web apps and mobile apps to AI and integrated platforms, we build products that match your real growth path.",
      body: "The First Data product hub shows our main solution categories. Each category is shaped around a type of problem: user experience, internal operations, integration, automation, or scalable growth.",
      cta: "Submit a project request",
    },
    categories: {
      eyebrow: "// categories",
      title: "Which product direction is closest to your need?",
      cards: [
        {
          slug: "web",
          title: "Web products",
          body: "Sites, CMS, admin panels, customer portals, and connected APIs.",
          linkLabel: "View details",
        },
        {
          slug: "mobile",
          title: "Mobile products",
          body: "Android and iOS apps with offline flows, notifications, and sync.",
          linkLabel: "View details",
        },
        {
          slug: "windows",
          title: "Windows products",
          body: "LOB software, internal tools, MSI packaging, and controlled update paths.",
          linkLabel: "View details",
        },
        {
          slug: "ai",
          title: "AI products",
          body: "LLM integration, RAG, automation, and privacy-first flows for teams and businesses.",
          linkLabel: "View details",
        },
        {
          slug: "platforms",
          title: "Integrated platforms",
          body: "SSO, unified APIs, multi-channel orchestration, and modular architecture.",
          linkLabel: "View details",
        },
      ],
    },
    pillars: {
      eyebrow: "// value pillars",
      title: "Three principles shared by every product",
      items: [
        {
          title: "Maintainable from day one",
          body: "A product should remain extendable and supportable after launch, not just deliver a first version.",
        },
        {
          title: "Aligned with operations",
          body: "We do not build UI in isolation; we account for process, roles, data, and decision flow.",
        },
        {
          title: "Ready for staged growth",
          body: "Each product is designed so future integrations, channels, and capabilities can be added without starting over.",
        },
      ],
    },
    process: {
      eyebrow: "// how we build",
      title: "How we move products forward",
      steps: [
        {
          title: "Problem discovery",
          body: "Define the real need, users, risks, and the outcome the product must achieve.",
        },
        {
          title: "Experience and architecture design",
          body: "Shape the product structure, data model, key flows, and development path.",
        },
        {
          title: "Staged delivery",
          body: "Ship an MVP or clear milestones with ongoing feedback and measurable progress.",
        },
        {
          title: "Stability and expansion",
          body: "Monitor, document, maintain, and prepare the product for future iterations.",
        },
      ],
    },
    links: {
      eyebrow: "// adjacent paths",
      title: "Move from product thinking to services and portfolio",
      servicesTitle: "Explore services",
      servicesBody: "If you are still comparing options, start from the services page to review engagement models.",
      servicesHref: "/services",
      portfolioTitle: "Explore portfolio",
      portfolioBody: "If you want to see related outcomes, move into the project categories inside portfolio.",
      portfolioHref: "/portfolio",
      linkLabel: "Open",
    },
  },
};
