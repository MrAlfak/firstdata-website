import type { Lang } from "./dictionaries";

export type SupportPageUi = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    cta: string;
  };
  who: {
    eyebrow: string;
    title: string;
    cards: { icon: string; title: string; line1: string; line2: string }[];
  };
  scope: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  tiers: {
    eyebrow: string;
    title: string;
    cards: { title: string; line1: string; line2: string; line3: string }[];
  };
  process: {
    eyebrow: string;
    title: string;
    steps: string[];
  };
  compare: {
    eyebrow: string;
    title: string;
    withoutTitle: string;
    withoutItems: string[];
    withTitle: string;
    withItems: string[];
  };
  stack: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
};

export const supportPageDictionaries: Record<Lang, SupportPageUi> = {
  fa: {
    hero: {
      eyebrow: "> بارگذاری /services/support...",
      title: "پشتیبانی و توسعه",
      lead: "محصول زنده نیاز به مراقبت مداوم دارد.",
      body: "نگهداری، رفع باگ، به‌روزرسانی امنیتی و توسعه فیچرهای کوچک تا متوسط را برای وب، موبایل و ابزارهای داخلی شما انجام می‌دهیم — تا تیم شما روی رشد کسب‌وکار تمرکز کند.",
      cta: "درخواست پشتیبانی",
    },
    who: {
      eyebrow: "// مخاطب",
      title: "برای چه محصولاتی؟",
      cards: [
        {
          icon: "🌐",
          title: "وب‌سایت و پورتال",
          line1: "سایت شرکتی، لندینگ، پنل و پورتال‌های سازمانی پس از لانچ.",
          line2: "به‌روزرسانی محتوا، سئو فنی و رفع باگ.",
        },
        {
          icon: "🛒",
          title: "فروشگاه اینترنتی",
          line1: "نگهداری سبد، پرداخت، موجودی و یکپارچه‌سازی‌ها.",
          line2: "پایداری در فصل‌های پرترافیک.",
        },
        {
          icon: "📱",
          title: "اپلیکیشن موبایل",
          line1: "Android و iOS پس از انتشار در استورها.",
          line2: "سازگاری با نسخه‌های جدید OS و رفع کرش.",
        },
        {
          icon: "⚙️",
          title: "ابزار داخلی و API",
          line1: "داشبورد، CRM، اتوماسیون و سرویس‌های بک‌اند.",
          line2: "پشتیبانی از تیم عملیاتی و توسعه تدریجی.",
        },
      ],
    },
    scope: {
      eyebrow: "// دامنه خدمات",
      title: "چه کارهایی انجام می‌دهیم؟",
      items: [
        "رفع باگ و خطاهای گزارش‌شده",
        "وصله‌های امنیتی و به‌روزرسانی وابستگی‌ها",
        "پایش عملکرد و بهینه‌سازی سرعت",
        "فیچرهای کوچک و بهبودهای UX",
        "نگهداری سرور، دیتابیس و زیرساخت",
        "پشتیبان‌گیری و بازیابی",
        "مستندسازی تغییرات و runbook",
        "هماهنگی انتشار و release",
      ],
    },
    tiers: {
      eyebrow: "// سطوح همکاری",
      title: "مدل‌های پشتیبانی",
      cards: [
        {
          title: "نگهداری ضروری",
          line1: "رفع باگ، وصله امنیتی و به‌روزرسانی‌های بحرانی.",
          line2: "پاسخ در بازه کاری معمول (۱ تا ۲ روز کاری).",
          line3: "مناسب سایت‌های پایدار با تغییرات کم.",
        },
        {
          title: "قرارداد رشد",
          line1: "نگهداری + فیچرهای کوچک ماهانه و بهبود عملکرد.",
          line2: "ساعات توسعه مشخص در ماه؛ اولویت‌بندی با تیم شما.",
          line3: "پاسخ سریع‌تر برای مسائل مهم (همان روز کاری).",
        },
        {
          title: "همکاری اختصاصی",
          line1: "دسترسی مستمر به تیم فنی؛ نقش extension تیم شما.",
          line2: "ساعات بیشتر، جلسات هفتگی و roadmap مشترک.",
          line3: "مناسب محصولات در حال رشد با نیاز توسعه مداوم.",
        },
      ],
    },
    process: {
      eyebrow: "// فرآیند",
      title: "چگونه شروع می‌کنیم؟",
      steps: [
        "آشنایی با کدبیس، زیرساخت و مستندات",
        "راه‌اندازی کانال تیکت و اولویت‌بندی",
        "چرخه اسپرینت یا release منظم",
        "گزارش ماهانه وضعیت و کارهای انجام‌شده",
      ],
    },
    compare: {
      eyebrow: "// مقایسه",
      title: "با و بدون پشتیبانی مستمر",
      withoutTitle: "بدون پشتیبانی",
      withoutItems: [
        "باگ‌ها انباشته و کاربران ناراضی می‌شوند",
        "وصله‌های امنیتی دیر اعمال می‌شوند",
        "وابستگی‌ها منقضی و آسیب‌پذیر می‌مانند",
        "تیم داخلی از توسعه جدید باز می‌ماند",
        "بازیابی پس از خرابی پرهزینه و پراسترس",
      ],
      withTitle: "با پشتیبانی First Data",
      withItems: [
        "مسائل شناسایی و رفع به‌موقع",
        "به‌روزرسانی امنیتی منظم",
        "عملکرد پایش و بهبود می‌شود",
        "فیچرهای کوچک بدون توقف رشد",
        "آرامش خاطر و تمرکز روی کسب‌وکار",
      ],
    },
    stack: {
      eyebrow: "// فناوری",
      title: "پشتیبانی از استک‌هایی که می‌شناسیم",
      items: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "Android / Kotlin",
        "iOS / Swift",
        "SQLite",
        "Tailwind CSS",
        "REST API",
        "Docker",
      ],
    },
    faq: {
      eyebrow: "// سوالات متداول",
      title: "سوالات متداول",
      items: [
        {
          q: "آیا محصولی که تیم دیگری ساخته را هم پشتیبانی می‌کنید؟",
          a: "بله، پس از بازبینی اولیه کد و زیرساخت. ممکن است دوره onboarding کوتاهی برای آشنایی لازم باشد.",
        },
        {
          q: "آیا پروژه‌های قبلی First Data شامل می‌شود؟",
          a: "بله. مشتریانی که با ما ساختند می‌توانند بلافاصله قرارداد پشتیبانی ببندند.",
        },
        {
          q: "رفع اضطراری چگونه است؟",
          a: "در سطوح بالاتر اولویت بیشتری دارد. جزئیات پاسخ‌دهی در قرارداد مشخص می‌شود — بدون وعده عددی ثابت.",
        },
        {
          q: "حداقل مدت قرارداد چقدر است؟",
          a: "معمولاً ۳ ماه برای شروع؛ قراردادهای بلندمدت با شرایط بهتر.",
        },
        {
          q: "آیا می‌توانید فیچر بزرگ هم بسازید؟",
          a: "پشتیبانی برای نگهداری و فیچرهای کوچک تا متوسط است. پروژه‌های بزرگ به‌صورت جداگانه scoped می‌شوند.",
        },
        {
          q: "گزارش‌دهی چگونه است؟",
          a: "گزارش ماهانه با کارهای انجام‌شده، مسائل باز و پیشنهادهای بعدی.",
        },
      ],
    },
  },
  en: {
    hero: {
      eyebrow: "> loading /services/support...",
      title: "Support & Development",
      lead: "Live products need ongoing care.",
      body: "We handle maintenance, bug fixes, security patches, and small-to-medium feature development for your web, mobile, and internal tools—so your team can focus on growing the business.",
      cta: "Request support",
    },
    who: {
      eyebrow: "// audience",
      title: "What products do we support?",
      cards: [
        {
          icon: "🌐",
          title: "Websites & portals",
          line1: "Corporate sites, landing pages, panels, and org portals after launch.",
          line2: "Content updates, technical SEO, and bug fixes.",
        },
        {
          icon: "🛒",
          title: "E-commerce stores",
          line1: "Cart, payments, inventory, and integrations upkeep.",
          line2: "Stability through high-traffic seasons.",
        },
        {
          icon: "📱",
          title: "Mobile apps",
          line1: "Android and iOS after store release.",
          line2: "Compatibility with new OS versions and crash fixes.",
        },
        {
          icon: "⚙️",
          title: "Internal tools & APIs",
          line1: "Dashboards, CRM, automation, and backend services.",
          line2: "Support for ops teams and gradual evolution.",
        },
      ],
    },
    scope: {
      eyebrow: "// scope",
      title: "What we handle",
      items: [
        "Bug fixes & reported issues",
        "Security patches & dependency updates",
        "Performance monitoring & optimization",
        "Small features & UX improvements",
        "Server, database & infrastructure care",
        "Backup & recovery",
        "Change documentation & runbooks",
        "Release coordination",
      ],
    },
    tiers: {
      eyebrow: "// tiers",
      title: "Support models",
      cards: [
        {
          title: "Essential maintenance",
          line1: "Bug fixes, security patches, and critical updates.",
          line2: "Response within typical business windows (1–2 business days).",
          line3: "Best for stable sites with low change volume.",
        },
        {
          title: "Growth retainer",
          line1: "Maintenance plus monthly small features and performance work.",
          line2: "Defined dev hours per month; prioritized with your team.",
          line3: "Faster response for important issues (same business day).",
        },
        {
          title: "Dedicated partnership",
          line1: "Ongoing access to our team as an extension of yours.",
          line2: "More hours, weekly syncs, and shared roadmap.",
          line3: "For growing products with continuous development needs.",
        },
      ],
    },
    process: {
      eyebrow: "// process",
      title: "How we get started",
      steps: [
        "Onboard to codebase, infrastructure, and docs",
        "Set up ticket channel and prioritization",
        "Regular sprint or release cadence",
        "Monthly status report of work completed",
      ],
    },
    compare: {
      eyebrow: "// comparison",
      title: "With vs without ongoing support",
      withoutTitle: "Without support",
      withoutItems: [
        "Bugs pile up and users get frustrated",
        "Security patches applied too late",
        "Dependencies go stale and vulnerable",
        "Internal team pulled away from new development",
        "Recovery after outages is costly and stressful",
      ],
      withTitle: "With First Data support",
      withItems: [
        "Issues identified and fixed promptly",
        "Regular security updates",
        "Performance monitored and improved",
        "Small features without stopping growth",
        "Peace of mind to focus on the business",
      ],
    },
    stack: {
      eyebrow: "// technology",
      title: "Stacks we support",
      items: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "Android / Kotlin",
        "iOS / Swift",
        "SQLite",
        "Tailwind CSS",
        "REST API",
        "Docker",
      ],
    },
    faq: {
      eyebrow: "// faq",
      title: "Frequently asked questions",
      items: [
        {
          q: "Can you support a product built by another team?",
          a: "Yes, after an initial code and infrastructure review. A short onboarding period may be needed.",
        },
        {
          q: "Does this include previous First Data projects?",
          a: "Yes. Clients who built with us can start a support contract right away.",
        },
        {
          q: "How do emergency fixes work?",
          a: "Higher tiers get more priority. Response details are defined in the contract—no fixed numeric SLA promises.",
        },
        {
          q: "What is the minimum contract length?",
          a: "Usually 3 months to start; longer terms may have better terms.",
        },
        {
          q: "Can you build large new features?",
          a: "Support covers maintenance and small-to-medium features. Large projects are scoped separately.",
        },
        {
          q: "How is reporting done?",
          a: "Monthly report with completed work, open issues, and next recommendations.",
        },
      ],
    },
  },
};
