import type { Lang } from "./dictionaries";

export type UiUxPageUi = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    cta: string;
  };
  diff: {
    eyebrow: string;
    title: string;
    ui: { title: string; items: string[] };
    ux: { title: string; items: string[] };
  };
  products: {
    eyebrow: string;
    title: string;
    cards: { icon: string; title: string }[];
  };
  process: {
    eyebrow: string;
    title: string;
    steps: string[];
  };
  principles: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  deliverables: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  whyBefore: {
    eyebrow: string;
    title: string;
    body: string;
  };
  showcase: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewAll: string;
    items: { title: string; desc: string; scope: string }[];
  };
};

export const uiUxPageDictionaries: Record<Lang, UiUxPageUi> = {
  fa: {
    hero: {
      eyebrow: "> بارگذاری /services/ui-ux...",
      title: "طراحی UI/UX",
      lead: "طراحی خوب فقط زیبا نیست؛ استفاده از محصول را ساده‌تر، سریع‌تر و لذت‌بخش‌تر می‌کند.",
      body: "قبل از توسعه، رفتار کاربران، نیازهای پروژه و مسیر استفاده از محصول را بررسی می‌کنیم تا رابطی طراحی شود که هم از نظر بصری جذاب باشد و هم تجربه‌ای روان و قابل فهم ایجاد کند.",
      cta: "دریافت مشاوره طراحی",
    },
    diff: {
      eyebrow: "// تفاوت UI و UX",
      title: "UI و UX چه تفاوتی دارند؟",
      ui: {
        title: "UI (User Interface)",
        items: ["رنگ‌بندی", "تایپوگرافی", "آیکون‌ها", "دکمه‌ها", "ظاهر صفحات"],
      },
      ux: {
        title: "UX (User Experience)",
        items: [
          "مسیر حرکت کاربر",
          "سادگی استفاده",
          "دسترسی سریع",
          "کاهش خطا",
          "افزایش رضایت کاربر",
        ],
      },
    },
    products: {
      eyebrow: "// حوزه طراحی",
      title: "طراحی برای چه محصولاتی؟",
      cards: [
        { icon: "📱", title: "اپلیکیشن موبایل" },
        { icon: "🌐", title: "وب‌سایت" },
        { icon: "🛒", title: "فروشگاه اینترنتی" },
        { icon: "⚙️", title: "پنل‌های مدیریتی و داشبوردها" },
      ],
    },
    process: {
      eyebrow: "// فرآیند",
      title: "فرآیند طراحی",
      steps: [
        "شناخت نیاز",
        "تحقیق کاربران",
        "Wireframe",
        "طراحی رابط کاربری",
        "نمونه اولیه (Prototype)",
        "بازخورد و اصلاح",
        "تحویل نهایی",
      ],
    },
    principles: {
      eyebrow: "// اصول",
      title: "اصولی که در طراحی رعایت می‌کنیم",
      items: [
        "سادگی",
        "دسترس‌پذیری (Accessibility)",
        "ریسپانسیو",
        "طراحی منسجم",
        "سرعت تعامل",
        "طراحی بر اساس رفتار کاربران",
        "قابلیت توسعه",
        "سازگاری با هویت برند",
      ],
    },
    deliverables: {
      eyebrow: "// خروجی",
      title: "خروجی نهایی",
      items: [
        "فایل Figma",
        "Design System",
        "Prototype",
        "UI Kit",
        "Icon Pack",
        "Developer Handoff",
      ],
    },
    whyBefore: {
      eyebrow: "// قبل از توسعه",
      title: "چرا طراحی قبل از برنامه‌نویسی مهم است؟",
      body: "تغییر یک دکمه در مرحله طراحی چند دقیقه زمان می‌برد، اما همان تغییر پس از توسعه می‌تواند ساعت‌ها یا حتی روزها زمان و هزینه ایجاد کند. طراحی UI/UX باعث می‌شود قبل از شروع توسعه، مسیر استفاده از محصول مشخص و تجربه کاربران بهینه شود.",
    },
    showcase: {
      eyebrow: "// نمونه‌کار",
      title: "نمونه‌کارهای طراحی",
      subtitle: "فقط پروژه‌های UI/UX — نه پروژه‌های برنامه‌نویسی",
      viewAll: "مشاهده نمونه‌کارها",
      items: [
        {
          title: "بازطراحی UX اپلیکیشن فین‌تک",
          desc: "تحقیق کاربر، نقشه سفر و پروتوتایپ تعاملی برای کاهش ریزش در فرایند ثبت‌نام.",
          scope: "UX Research · Prototype · UI Kit",
        },
        {
          title: "Design System فروشگاه آنلاین",
          desc: "سیستم طراحی یکپارچه برای صفحات محصول، سبد خرید و پنل مدیریت.",
          scope: "Design System · Figma · Handoff",
        },
        {
          title: "رابط داشبورد مدیریتی",
          desc: "طراحی داشبورد با تمرکز بر خوانایی داده، فیلترها و دسترسی سریع به اقدامات.",
          scope: "UI Design · Wireframe · Icon Pack",
        },
        {
          title: "پروتوتایپ اپلیکیشن خدماتی",
          desc: "نمونه کلیک‌پذیر برای تست جریان رزرو و پرداخت قبل از شروع توسعه.",
          scope: "Prototype · User Flow · UI",
        },
      ],
    },
  },
  en: {
    hero: {
      eyebrow: "> loading /services/ui-ux...",
      title: "UI/UX Design",
      lead: "Good design is not just beautiful—it makes your product easier, faster, and more enjoyable to use.",
      body: "Before development, we study user behavior, project needs, and usage paths to design an interface that looks great and delivers a smooth, understandable experience.",
      cta: "Book a design consultation",
    },
    diff: {
      eyebrow: "// UI vs UX",
      title: "What is the difference between UI and UX?",
      ui: {
        title: "UI (User Interface)",
        items: ["Color palette", "Typography", "Icons", "Buttons", "Page appearance"],
      },
      ux: {
        title: "UX (User Experience)",
        items: [
          "User journey",
          "Ease of use",
          "Fast access",
          "Fewer errors",
          "Higher satisfaction",
        ],
      },
    },
    products: {
      eyebrow: "// scope",
      title: "What do we design?",
      cards: [
        { icon: "📱", title: "Mobile apps" },
        { icon: "🌐", title: "Websites" },
        { icon: "🛒", title: "Online stores" },
        { icon: "⚙️", title: "Admin panels & dashboards" },
      ],
    },
    process: {
      eyebrow: "// process",
      title: "Design process",
      steps: [
        "Requirements discovery",
        "User research",
        "Wireframe",
        "UI design",
        "Interactive prototype",
        "Feedback & iteration",
        "Final handoff",
      ],
    },
    principles: {
      eyebrow: "// principles",
      title: "Principles we follow",
      items: [
        "Simplicity",
        "Accessibility",
        "Responsive layout",
        "Consistent design",
        "Interaction speed",
        "Behavior-driven design",
        "Scalable structure",
        "Brand alignment",
      ],
    },
    deliverables: {
      eyebrow: "// deliverables",
      title: "What you receive",
      items: [
        "Figma files",
        "Design System",
        "Prototype",
        "UI Kit",
        "Icon Pack",
        "Developer Handoff",
      ],
    },
    whyBefore: {
      eyebrow: "// before code",
      title: "Why design before development matters",
      body: "Changing a button in design takes minutes; the same change after development can cost hours or days. UI/UX design clarifies the product flow and optimizes user experience before a single line of code is written.",
    },
    showcase: {
      eyebrow: "// showcase",
      title: "Design portfolio",
      subtitle: "UI/UX projects only — not development case studies",
      viewAll: "View portfolio",
      items: [
        {
          title: "FinTech app UX redesign",
          desc: "User research, journey mapping, and interactive prototype to reduce signup drop-off.",
          scope: "UX Research · Prototype · UI Kit",
        },
        {
          title: "E-commerce design system",
          desc: "Unified system for product pages, cart, and admin screens.",
          scope: "Design System · Figma · Handoff",
        },
        {
          title: "Management dashboard UI",
          desc: "Dashboard focused on data readability, filters, and quick actions.",
          scope: "UI Design · Wireframe · Icon Pack",
        },
        {
          title: "Service app prototype",
          desc: "Clickable prototype to test booking and payment flows before build.",
          scope: "Prototype · User Flow · UI",
        },
      ],
    },
  },
};
