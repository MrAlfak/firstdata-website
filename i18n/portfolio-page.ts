import type { Lang } from "./dictionaries";
import type { PortfolioCategory } from "@/config/portfolio";

export type PortfolioPageUi = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    cta: string;
  };
  stats: {
    eyebrow: string;
    items: { value: string; suffix?: string; label: string; note: string }[];
  };
  categories: {
    eyebrow: string;
    title: string;
    cards: {
      slug: PortfolioCategory;
      icon: string;
      title: string;
      desc: string;
      linkLabel: string;
    }[];
  };
  featured: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  approach: {
    eyebrow: string;
    title: string;
    items: { title: string; body: string }[];
  };
  privacy: {
    title: string;
    body: string;
  };
  outcomeLabel: string;
  tagsAria: string;
  backToPortfolio: string;
  categoryLabels: Record<PortfolioCategory, string>;
  caseFile: {
    sample: string;
    featured: string;
    stack: string;
    open: string;
    challenge: string;
    alsoShipped: string;
    statusOk: string;
    openCase: string;
  };
};

export const portfolioPageDictionaries: Record<Lang, PortfolioPageUi> = {
  fa: {
    hero: {
      eyebrow: "> بارگذاری /portfolio...",
      title: "نمونه‌کارها",
      lead: "پروژه‌هایی که با تیم‌های مختلف ساخته‌ایم — بدون نام مشتری، با تمرکز بر مسئله و نتیجه.",
      body: "از وب‌سایت و فروشگاه آنلاین تا اپ موبایل، نرم‌افزار دسکتاپ و یکپارچه‌سازی؛ هر مورد نمایانگر نوع چالشی است که معمولاً حل می‌کنیم. جزئیات کامل و مراجع در جلسه معرفی در دسترس است.",
      cta: "ثبت درخواست پروژه",
    },
    stats: {
      eyebrow: "// در یک نگاه",
      items: [
        {
          value: "10",
          suffix: "+",
          label: "سال فعالیت",
          note: "توسعه وب و نرم‌افزار",
        },
        {
          value: "5",
          label: "دسته پروژه",
          note: "وب، فروشگاه، موبایل، دسکتاپ، سایر",
        },
        {
          value: "8",
          suffix: "+",
          label: "حوزه صنعت",
          note: "از خرده‌فروشی تا سازمانی",
        },
        {
          value: "24",
          suffix: "/7",
          label: "پشتیبانی قراردادی",
          note: "برای پروژه‌های در حال اجرا",
        },
      ],
    },
    categories: {
      eyebrow: "// دسته‌بندی",
      title: "کدام نوع پروژه را می‌خواهید ببینید؟",
      cards: [
        {
          slug: "websites",
          icon: "🌐",
          title: "وب‌سایت‌ها",
          desc: "سایت شرکتی، پرتال محتوا، لندینگ خدمات و CMS اختصاصی.",
          linkLabel: "مشاهده وب‌سایت‌ها",
        },
        {
          slug: "ecommerce",
          icon: "🛒",
          title: "فروشگاه اینترنتی",
          desc: "B2C، B2B، محصولات دیجیتال و مدیریت موجودی.",
          linkLabel: "مشاهده فروشگاه‌ها",
        },
        {
          slug: "mobile-apps",
          icon: "📱",
          title: "اپلیکیشن موبایل",
          desc: "اندروید، iOS و اپ‌های سازمانی با همگام‌سازی.",
          linkLabel: "مشاهده اپ‌ها",
        },
        {
          slug: "desktop",
          icon: "🖥️",
          title: "نرم‌افزار دسکتاپ",
          desc: "کلاینت ویندوز، POS، انبار و ابزارهای داخلی.",
          linkLabel: "مشاهده دسکتاپ",
        },
        {
          slug: "other",
          icon: "⚙️",
          title: "سایر پروژه‌ها",
          desc: "یکپارچه‌سازی API، مهاجرت داده و مدرن‌سازی تدریجی.",
          linkLabel: "مشاهده سایر",
        },
      ],
    },
    featured: {
      eyebrow: "// منتخب",
      title: "نمونه‌های برجسته",
      subtitle: "گزیده‌ای از پروژه‌هایی که نمایانگر دامنه کار ما هستند — بدون ادعای عددی اغراق‌آمیز.",
    },
    approach: {
      eyebrow: "// رویکرد",
      title: "چطور نمونه‌کار را ارائه می‌دهیم",
      items: [
        {
          title: "تمرکز بر مسئله",
          body: "هر مورد با شرح چالش کسب‌وکار شروع می‌شود، نه با لیست تکنولوژی.",
        },
        {
          title: "نتیجه کیفی",
          body: "خروجی‌ها به‌صورت قابل فهم توصیف می‌شوند؛ درصد ساختگی یا آمار تبلیغاتی نداریم.",
        },
        {
          title: "حفظ حریم خصوصی",
          body: "نام مشتری و جزئیات قراردادی منتشر نمی‌شود مگر با اجازه کتبی.",
        },
        {
          title: "جلسه معرفی",
          body: "برای پروژه‌های مشابه، دمو و مراجع بیشتر در گفت‌وگوی اولیه ارائه می‌شود.",
        },
      ],
    },
    privacy: {
      title: "یادداشت حریم خصوصی",
      body: "مطالب این بخش ناشناس‌سازی شده‌اند. برای مشاهده جزئیات فنی، دمو زنده یا تماس با مرجع پروژه، از فرم درخواست استفاده کنید.",
    },
    outcomeLabel: "نتیجه",
    tagsAria: "برچسب‌ها",
    backToPortfolio: "بازگشت به نمونه‌کارها",
    categoryLabels: {
      websites: "وب‌سایت",
      ecommerce: "فروشگاه",
      "mobile-apps": "موبایل",
      desktop: "دسکتاپ",
      other: "سایر",
    },
    caseFile: {
      sample: "SAMPLE",
      featured: "FEATURED",
      stack: "STACK",
      open: "باز کردن",
      challenge: "چالش",
      alsoShipped: "نمونهٔ دیگر از همین دسته",
      statusOk: "تحویل‌شده",
      openCase: "مشاهدهٔ نمونه‌کارهای مشابه",
    },
  },
  en: {
    hero: {
      eyebrow: "> loading /portfolio...",
      title: "Portfolio",
      lead: "Work we have shipped with different teams — no client names, focus on problems and outcomes.",
      body: "From websites and online stores to mobile apps, desktop software, and integrations; each entry represents a type of challenge we typically solve. Full details and references are available on request.",
      cta: "Submit a project request",
    },
    stats: {
      eyebrow: "// at a glance",
      items: [
        {
          value: "10",
          suffix: "+",
          label: "Years active",
          note: "Web and software development",
        },
        {
          value: "5",
          label: "Project types",
          note: "Web, store, mobile, desktop, other",
        },
        {
          value: "8",
          suffix: "+",
          label: "Industries",
          note: "From retail to enterprise",
        },
        {
          value: "24",
          suffix: "/7",
          label: "Contract support",
          note: "For active engagements",
        },
      ],
    },
    categories: {
      eyebrow: "// categories",
      title: "Which type of project do you want to explore?",
      cards: [
        {
          slug: "websites",
          icon: "🌐",
          title: "Websites",
          desc: "Corporate sites, content portals, service landings, and custom CMS.",
          linkLabel: "View websites",
        },
        {
          slug: "ecommerce",
          icon: "🛒",
          title: "Online stores",
          desc: "B2C, B2B, digital products, and inventory management.",
          linkLabel: "View stores",
        },
        {
          slug: "mobile-apps",
          icon: "📱",
          title: "Mobile apps",
          desc: "Android, iOS, and enterprise apps with sync.",
          linkLabel: "View apps",
        },
        {
          slug: "desktop",
          icon: "🖥️",
          title: "Desktop software",
          desc: "Windows clients, POS, warehouse, and internal tools.",
          linkLabel: "View desktop",
        },
        {
          slug: "other",
          icon: "⚙️",
          title: "Other projects",
          desc: "API integration, data migration, and gradual modernization.",
          linkLabel: "View other",
        },
      ],
    },
    featured: {
      eyebrow: "// featured",
      title: "Highlighted work",
      subtitle: "A selection that represents our scope — no inflated percentages or vanity metrics.",
    },
    approach: {
      eyebrow: "// approach",
      title: "How we present case studies",
      items: [
        {
          title: "Problem-first",
          body: "Each entry starts with the business challenge, not a technology laundry list.",
        },
        {
          title: "Qualitative outcomes",
          body: "Results are described in plain language; we do not publish fabricated growth stats.",
        },
        {
          title: "Privacy by default",
          body: "Client names and contract details are not published without written consent.",
        },
        {
          title: "Intro call",
          body: "For similar projects, live demos and additional references are shared in an initial conversation.",
        },
      ],
    },
    privacy: {
      title: "Privacy note",
      body: "Content in this section is anonymized. For technical details, live demos, or project references, use the request form.",
    },
    outcomeLabel: "Outcome",
    tagsAria: "Tags",
    backToPortfolio: "Back to portfolio",
    categoryLabels: {
      websites: "Website",
      ecommerce: "Store",
      "mobile-apps": "Mobile",
      desktop: "Desktop",
      other: "Other",
    },
    caseFile: {
      sample: "SAMPLE",
      featured: "FEATURED",
      stack: "STACK",
      open: "Open",
      challenge: "Challenge",
      alsoShipped: "Another case in this category",
      statusOk: "shipped",
      openCase: "See similar portfolio work",
    },
  },
};
