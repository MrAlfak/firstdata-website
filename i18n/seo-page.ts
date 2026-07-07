import type { Lang } from "./dictionaries";

export type SeoPageUi = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    cta: string;
  };
  pillars: {
    eyebrow: string;
    title: string;
    cards: { icon: string; title: string; line1: string; line2: string }[];
  };
  deliverables: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  tools: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  process: {
    eyebrow: string;
    title: string;
    steps: string[];
  };
  results: {
    eyebrow: string;
    title: string;
    body: string;
    items: string[];
  };
  support: {
    eyebrow: string;
    title: string;
    body: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
};

export const seoPageDictionaries: Record<Lang, SeoPageUi> = {
  fa: {
    hero: {
      eyebrow: "> بارگذاری /services/seo...",
      title: "سئو و بهینه‌سازی",
      lead: "دیده شدن در گوگل و سرعت واقعی سایت، هر دو برای رشد کسب‌وکار ضروری‌اند.",
      body: "سئو فنی، بهینه‌سازی محتوا و Core Web Vitals را با هم پوشش می‌دهیم — از ممیزی اولیه تا مانیتورینگ مداوم. هدف ما ترافیک باکیفیت، تجربه کاربری سریع و گزارش‌دهی شفاف است.",
      cta: "درخواست ممیزی سئو",
    },
    pillars: {
      eyebrow: "// حوزه‌های خدمات",
      title: "چه چیزی را بهینه می‌کنیم؟",
      cards: [
        {
          icon: "⚙️",
          title: "سئو فنی",
          line1: "خزش، ایندکس، ساختار URL، Schema و رفع خطاهای Search Console.",
          line2: "پایه‌ای برای دیده شدن در نتایج جستجو.",
        },
        {
          icon: "📝",
          title: "سئو درون‌صفحه",
          line1: "عنوان، متا، هدینگ، لینک‌سازی داخلی و محتوای هدفمند.",
          line2: "هم‌راستا با قصد جستجوی کاربر.",
        },
        {
          icon: "⚡",
          title: "Core Web Vitals",
          line1: "LCP، INP و CLS — سرعت بارگذاری و پایداری بصری.",
          line2: "بهینه‌سازی فرانت‌اند و سرور.",
        },
        {
          icon: "📊",
          title: "مانیتورینگ و گزارش",
          line1: "ردیابی رتبه، ترافیک ارگانیک و هشدار رگرسیون.",
          line2: "گزارش دوره‌ای با اقدام‌های بعدی.",
        },
      ],
    },
    deliverables: {
      eyebrow: "// خروجی ممیزی",
      title: "تحویل‌دادنی‌های ممیزی",
      items: [
        "گزارش فنی سئو با اولویت‌بندی",
        "لیست خطاها و پیشنهاد رفع",
        "تحلیل Core Web Vitals",
        "بررسی ساختار محتوا و متا",
        "نقشه راه ۳۰/۶۰/۹۰ روزه",
        "چک‌لیست پیاده‌سازی برای تیم فنی",
      ],
    },
    tools: {
      eyebrow: "// ابزارها",
      title: "ابزارهایی که با آن کار می‌کنیم",
      items: [
        "Google Search Console",
        "Google Analytics 4",
        "Lighthouse & PageSpeed",
        "Screaming Frog",
        "Ahrefs / Semrush",
        "Chrome DevTools",
      ],
    },
    process: {
      eyebrow: "// فرآیند",
      title: "فرآیند سئو و بهینه‌سازی",
      steps: [
        "ممیزی اولیه سایت و رقبا",
        "تحلیل فنی، محتوا و سرعت",
        "اولویت‌بندی و نقشه راه",
        "پیاده‌سازی و رفع مشکلات",
        "مانیتورینگ و گزارش دوره‌ای",
      ],
    },
    results: {
      eyebrow: "// نتایج",
      title: "چه تغییری می‌بینید؟",
      body: "سئو و بهینه‌سازی سرعت، ترکیبی از بهبودهای فنی و محتوایی است. ما روی شاخص‌های قابل اندازه‌گیری تمرکز می‌کنیم:",
      items: [
        "افزایش ترافیک ارگانیک باکیفیت",
        "بهبود رتبه برای کلیدواژه‌های هدف",
        "کاهش زمان بارگذاری و پرش کاربر",
        "رفع خطاهای ایندکس و خزش",
        "گزارش شفاف و قابل اقدام",
      ],
    },
    support: {
      eyebrow: "// پشتیبانی",
      title: "سئو یک‌باره نیست.",
      body: "الگوریتم‌ها، رقبا و محتوای سایت مدام تغییر می‌کنند. با قرارداد نگهداری، مانیتورینگ مداوم، به‌روزرسانی توصیه‌ها و همراهی تیم فنی برای پیاده‌سازی در کنار شما هستیم.",
    },
    faq: {
      eyebrow: "// سوالات متداول",
      title: "سوالات متداول",
      items: [
        {
          q: "چقدر طول می‌کشد تا نتیجه سئو دیده شود؟",
          a: "بسته به رقابت و وضعیت فعلی سایت، معمولاً ۳ تا ۶ ماه برای روند پایدار. بهبود فنی و سرعت اغلب زودتر قابل مشاهده است.",
        },
        {
          q: "آیا فقط گزارش می‌دهید یا پیاده‌سازی هم می‌کنید؟",
          a: "هر دو. ممیزی و نقشه راه ارائه می‌شود و در صورت نیاز، رفع فنی و بهینه‌سازی را تیم ما یا همراهی با تیم شما انجام می‌دهیم.",
        },
        {
          q: "Core Web Vitals چقدر مهم است؟",
          a: "هم برای تجربه کاربر و هم برای سیگنال‌های رتبه‌بندی گوگل مهم است. LCP، INP و CLS را در ممیزی و بهینه‌سازی پوشش می‌دهیم.",
        },
        {
          q: "برای سایت‌های Next.js و React هم کار می‌کنید؟",
          a: "بله. SSR، lazy loading، تصاویر، فونت و کش را برای عملکرد بهتر بررسی و بهینه می‌کنیم.",
        },
        {
          q: "گزارش‌دهی چگونه است؟",
          a: "گزارش ماهانه با شاخص‌های ترافیک، رتبه، سرعت و لیست اقدام‌های انجام‌شده و پیشنهادی.",
        },
        {
          q: "آیا سئو محلی (Local SEO) هم دارید؟",
          a: "بله. برای کسب‌وکارهای محلی، Google Business Profile و سئو محلی را در scope قرار می‌دهیم.",
        },
      ],
    },
  },
  en: {
    hero: {
      eyebrow: "> loading /services/seo...",
      title: "SEO & Optimization",
      lead: "Google visibility and real site speed both matter for growth.",
      body: "We cover technical SEO, on-page optimization, and Core Web Vitals—from initial audit to ongoing monitoring. Our goal is quality traffic, fast UX, and clear reporting.",
      cta: "Request SEO audit",
    },
    pillars: {
      eyebrow: "// service areas",
      title: "What we optimize",
      cards: [
        {
          icon: "⚙️",
          title: "Technical SEO",
          line1: "Crawl, index, URL structure, Schema, and Search Console fixes.",
          line2: "Foundation for search visibility.",
        },
        {
          icon: "📝",
          title: "On-page SEO",
          line1: "Titles, meta, headings, internal links, and intent-aligned content.",
          line2: "Matched to user search intent.",
        },
        {
          icon: "⚡",
          title: "Core Web Vitals",
          line1: "LCP, INP, and CLS — load speed and visual stability.",
          line2: "Frontend and server optimization.",
        },
        {
          icon: "📊",
          title: "Monitoring & reporting",
          line1: "Rank tracking, organic traffic, and regression alerts.",
          line2: "Periodic reports with next actions.",
        },
      ],
    },
    deliverables: {
      eyebrow: "// audit output",
      title: "Audit deliverables",
      items: [
        "Prioritized technical SEO report",
        "Error list with fix recommendations",
        "Core Web Vitals analysis",
        "Content and meta structure review",
        "30/60/90-day roadmap",
        "Implementation checklist for dev team",
      ],
    },
    tools: {
      eyebrow: "// tools",
      title: "Tools we work with",
      items: [
        "Google Search Console",
        "Google Analytics 4",
        "Lighthouse & PageSpeed",
        "Screaming Frog",
        "Ahrefs / Semrush",
        "Chrome DevTools",
      ],
    },
    process: {
      eyebrow: "// process",
      title: "SEO & optimization process",
      steps: [
        "Initial site and competitor audit",
        "Technical, content, and speed analysis",
        "Prioritization and roadmap",
        "Implementation and fixes",
        "Monitoring and periodic reporting",
      ],
    },
    results: {
      eyebrow: "// results",
      title: "What changes do you see?",
      body: "SEO and speed optimization combine technical and content improvements. We focus on measurable outcomes:",
      items: [
        "More quality organic traffic",
        "Better rankings for target keywords",
        "Faster load times and lower bounce",
        "Fixed index and crawl errors",
        "Clear, actionable reporting",
      ],
    },
    support: {
      eyebrow: "// support",
      title: "SEO is not one-and-done.",
      body: "Algorithms, competitors, and your content keep changing. With a maintenance plan we provide ongoing monitoring, updated recommendations, and hands-on support for your dev team.",
    },
    faq: {
      eyebrow: "// faq",
      title: "Frequently asked questions",
      items: [
        {
          q: "How long until SEO results show?",
          a: "Depending on competition and current site health, usually 3–6 months for stable trends. Technical and speed gains often appear sooner.",
        },
        {
          q: "Do you only report or also implement?",
          a: "Both. We deliver audit and roadmap, and can implement fixes ourselves or alongside your team.",
        },
        {
          q: "How important are Core Web Vitals?",
          a: "Important for user experience and Google ranking signals. We cover LCP, INP, and CLS in audit and optimization.",
        },
        {
          q: "Do you work on Next.js and React sites?",
          a: "Yes. We review and optimize SSR, lazy loading, images, fonts, and caching for better performance.",
        },
        {
          q: "How does reporting work?",
          a: "Monthly reports with traffic, rankings, speed metrics, and completed plus recommended actions.",
        },
        {
          q: "Do you offer local SEO?",
          a: "Yes. For local businesses we include Google Business Profile and local SEO in scope.",
        },
      ],
    },
  },
};
