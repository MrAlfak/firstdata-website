import type { Lang } from "./dictionaries";

export type AboutHonorsPageUi = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
  };
  stats: {
    eyebrow: string;
    title: string;
    items: { value: string; suffix?: string; label: string; note: string }[];
  };
  timeline: {
    eyebrow: string;
    title: string;
    items: { year: string; title: string; body: string }[];
  };
  recognition: {
    eyebrow: string;
    title: string;
    cards: { title: string; body: string }[];
  };
  trust: {
    eyebrow: string;
    title: string;
    body: string;
    points: string[];
  };
  crossNav: {
    eyebrow: string;
    title: string;
    linkLabel: string;
  };
};

export const aboutHonorsPageDictionaries: Record<Lang, AboutHonorsPageUi> = {
  fa: {
    hero: {
      eyebrow: "> بارگذاری /aboutus/honors...",
      title: "افتخارات و دستاوردها",
      lead: "ما افتخار را بیشتر در اعتماد تکرارشونده، تحویل قابل اتکا و رشد تدریجی می‌بینیم تا در ادعاهای تبلیغاتی.",
      body: "دستاوردهای First Data حاصل سال‌ها اجرای پروژه، حفظ مشتری، توسعه قابلیت‌های جدید و ساخت سیستم‌هایی است که در محیط واقعی کار می‌کنند. این صفحه خلاصه‌ای از همان مسیر است.",
    },
    stats: {
      eyebrow: "// در یک نگاه",
      title: "شاخص‌های کیفی مسیر ما",
      items: [
        {
          value: "10",
          suffix: "+",
          label: "سال فعالیت",
          note: "همراهی با پروژه‌های وب و نرم‌افزار در چند نسل تکنولوژی",
        },
        {
          value: "5",
          label: "مسیر محصول",
          note: "وب، موبایل، ویندوز، AI و پلتفرم‌های یکپارچه",
        },
        {
          value: "8",
          suffix: "+",
          label: "حوزه همکاری",
          note: "از کسب‌وکارهای خدماتی تا فرآیندهای سازمانی",
        },
        {
          value: "24",
          suffix: "/7",
          label: "نگاه به پایداری",
          note: "طراحی برای تداوم سرویس و پاسخ‌گویی عملیاتی",
        },
      ],
    },
    timeline: {
      eyebrow: "// مسیر رشد",
      title: "چند نقطه مهم در این مسیر",
      items: [
        {
          year: "2014",
          title: "شروع با پروژه‌های وب و سیستم‌های سفارشی",
          body: "تمرکز اولیه بر ساخت وب‌سایت‌ها و ابزارهایی که دقیقاً با نیاز مشتری منطبق باشند.",
        },
        {
          year: "2017",
          title: "ورود جدی‌تر به پنل‌ها و عملیات داخلی",
          body: "پروژه‌ها از صفحات اطلاع‌رسانی به داشبورد، اتوماسیون و گردش کار گسترده‌تر رسیدند.",
        },
        {
          year: "2020",
          title: "گسترش روی موبایل و تجربه چندکاناله",
          body: "نیاز به حضور هم‌زمان روی وب و موبایل، مدل تحویل و طراحی ما را بالغ‌تر کرد.",
        },
        {
          year: "2023",
          title: "تقویت زیرساخت، پایداری و مسیرهای انتشار",
          body: "پروژه‌ها بیشتر به سمت نگهداری‌پذیری، امنیت و چرخه release منظم حرکت کردند.",
        },
        {
          year: "2025",
          title: "ورود جدی به AI، اتوماسیون و یکپارچه‌سازی",
          body: "تمرکز جدید بر LLM، RAG، اتوماسیون و اتصال سیستم‌های پراکنده به تجربه‌ای یکپارچه‌تر.",
        },
        {
          year: "2026",
          title: "تبدیل تجربه اجرا به خطوط محصول روشن‌تر",
          body: "تعریف دسته‌های محصول و صفحه‌های تخصصی برای توضیح شفاف‌تر توانمندی‌ها و مسیر همکاری.",
        },
      ],
    },
    recognition: {
      eyebrow: "// زمینه‌های اعتبار",
      title: "در چه زمینه‌هایی شناخته می‌شویم",
      cards: [
        {
          title: "تحویل چندرشته‌ای",
          body: "هماهنگ‌کردن طراحی، توسعه، زیرساخت و نیاز کسب‌وکار در یک مسیر اجرایی روشن.",
        },
        {
          title: "واقع‌گرایی فنی",
          body: "پیشنهاد راه‌حل متناسب با نیاز واقعی پروژه، نه صرفاً تکنولوژی‌های پر سروصدا.",
        },
        {
          title: "روابط بلندمدت",
          body: "بخش مهمی از اعتماد بازار از ادامه همکاری، نگهداری و توسعه مرحله‌ای شکل گرفته است.",
        },
      ],
    },
    trust: {
      eyebrow: "// اعتماد مشتری",
      title: "چرا این افتخارات برای مشتری معنا دارد",
      body: "برای ما افتخار فقط یک صفحه معرفی نیست؛ باید در تجربه همکاری احساس شود. مشتری باید بداند تیمی روبه‌رویش است که مسئله را می‌فهمد، محدودیت‌ها را پنهان نمی‌کند و مسیر تحویل را قابل پیش‌بینی نگه می‌دارد.",
      points: [
        "تحویل مرحله‌ای به‌جای قول‌های مبهم و یک‌باره",
        "مستندسازی و شفافیت برای کاهش ریسک وابستگی",
        "اولویت‌دادن به نگهداری‌پذیری و توسعه‌پذیری در کنار لانچ",
      ],
    },
    crossNav: {
      eyebrow: "// ادامه مسیر",
      title: "بخش‌های مرتبط درباره ما",
      linkLabel: "مشاهده",
    },
  },
  en: {
    hero: {
      eyebrow: "> loading /aboutus/honors...",
      title: "Honors & Milestones",
      lead: "We see recognition less in promotional claims and more in repeated trust, reliable delivery, and steady growth.",
      body: "First Data’s achievements come from years of shipping projects, retaining clients, expanding capabilities, and building systems that work in real environments. This page is a compact view of that journey.",
    },
    stats: {
      eyebrow: "// at a glance",
      title: "Qualitative signals from our journey",
      items: [
        {
          value: "10",
          suffix: "+",
          label: "Years active",
          note: "Supporting web and software projects across multiple technology cycles",
        },
        {
          value: "5",
          label: "Product tracks",
          note: "Web, mobile, Windows, AI, and integrated platforms",
        },
        {
          value: "8",
          suffix: "+",
          label: "Engagement areas",
          note: "From service businesses to enterprise workflows",
        },
        {
          value: "24",
          suffix: "/7",
          label: "Reliability mindset",
          note: "Designed for service continuity and operational responsiveness",
        },
      ],
    },
    timeline: {
      eyebrow: "// growth path",
      title: "Key points along the way",
      items: [
        {
          year: "2014",
          title: "Started with web projects and custom systems",
          body: "The early focus was building websites and tools shaped directly around client needs.",
        },
        {
          year: "2017",
          title: "Moved deeper into panels and internal operations",
          body: "Projects expanded from informational pages into dashboards, automation, and richer workflows.",
        },
        {
          year: "2020",
          title: "Expanded into mobile and multi-channel delivery",
          body: "The need to serve users across web and mobile matured both our delivery model and design process.",
        },
        {
          year: "2023",
          title: "Strengthened infrastructure, stability, and release paths",
          body: "Projects leaned more heavily toward maintainability, security, and structured release cycles.",
        },
        {
          year: "2025",
          title: "Expanded seriously into AI, automation, and integrations",
          body: "New focus areas included LLMs, RAG, automation, and connecting fragmented systems into coherent flows.",
        },
        {
          year: "2026",
          title: "Turned execution experience into clearer product lines",
          body: "We defined sharper product categories and dedicated pages to explain capabilities and engagement paths more clearly.",
        },
      ],
    },
    recognition: {
      eyebrow: "// recognition areas",
      title: "What we tend to be recognized for",
      cards: [
        {
          title: "Cross-disciplinary delivery",
          body: "Coordinating design, development, infrastructure, and business needs inside one visible execution path.",
        },
        {
          title: "Technical realism",
          body: "Recommending solutions that match the real project need, not just whatever technology is making noise.",
        },
        {
          title: "Long-term relationships",
          body: "A meaningful share of trust comes from continued support, follow-up work, and staged evolution.",
        },
      ],
    },
    trust: {
      eyebrow: "// client trust",
      title: "Why these milestones matter to clients",
      body: "For us, recognition is not just a presentation page; it should be felt in the collaboration itself. Clients should know they are working with a team that understands the problem, does not hide constraints, and keeps delivery predictable.",
      points: [
        "Phased delivery instead of vague one-shot promises",
        "Documentation and transparency to reduce dependency risk",
        "Maintainability and extensibility valued alongside launch speed",
      ],
    },
    crossNav: {
      eyebrow: "// continue",
      title: "Related about pages",
      linkLabel: "View",
    },
  },
};
