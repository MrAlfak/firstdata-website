import type { Lang } from "./dictionaries";

export type AboutTeamPageUi = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    cta: string;
  };
  culture: {
    eyebrow: string;
    title: string;
    items: { title: string; body: string }[];
  };
  disciplines: {
    eyebrow: string;
    title: string;
    cards: { tag: string; title: string; body: string }[];
  };
  squadModel: {
    eyebrow: string;
    title: string;
    intro: string;
    items: string[];
  };
  principles: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  crossNav: {
    eyebrow: string;
    title: string;
    linkLabel: string;
  };
};

export const aboutTeamPageDictionaries: Record<Lang, AboutTeamPageUi> = {
  fa: {
    hero: {
      eyebrow: "> بارگذاری /aboutus/team...",
      title: "تیم ما",
      lead: "تیم‌های چندتخصصی که حول مسئله محصول شکل می‌گیرند، نه حول عنوان‌های پرزرق‌وبرق.",
      body: "در First Data تیم‌ها بر اساس نیاز پروژه چیده می‌شوند: مهندسی، طراحی، محصول، QA، DevOps و استراتژی در یک ریتم مشترک کار می‌کنند تا تصمیم‌گیری سریع، تحویل پایدار و ارتباط شفاف باقی بماند.",
      cta: "همکاری با First Data",
    },
    culture: {
      eyebrow: "// فرهنگ همکاری",
      title: "چگونه با هم کار می‌کنیم",
      items: [
        {
          title: "مالکیت واقعی",
          body: "هر عضو تیم فقط task تحویل نمی‌دهد؛ نسبت به نتیجه نهایی و تجربه کاربر مسئول است.",
        },
        {
          title: "شفافیت در اجرا",
          body: "وضعیت کار، ریسک‌ها و تصمیم‌ها از ابتدا روشن بیان می‌شوند تا پروژه بدون ابهام جلو برود.",
        },
        {
          title: "یادگیری مستمر",
          body: "پس از هر release بازبینی می‌کنیم چه چیزی بهتر شد و چه چیزی باید برای iteration بعدی اصلاح شود.",
        },
      ],
    },
    disciplines: {
      eyebrow: "// نقش‌ها",
      title: "تخصص‌هایی که در کنار هم قرار می‌گیرند",
      cards: [
        {
          tag: "ENG",
          title: "مهندسی",
          body: "پیاده‌سازی فرانت‌اند، بک‌اند، معماری API و نگهداری کدبیس برای رشد بلندمدت.",
        },
        {
          tag: "DES",
          title: "طراحی",
          body: "طراحی تجربه و رابط، سیستم‌های UI و ساده‌سازی جریان‌های پیچیده برای کاربران واقعی.",
        },
        {
          tag: "PRD",
          title: "محصول",
          body: "تبدیل نیازهای مبهم به scope قابل اجرا، اولویت‌بندی backlog و هم‌راستا نگه‌داشتن خروجی با هدف کسب‌وکار.",
        },
        {
          tag: "Q/A",
          title: "تضمین کیفیت",
          body: "بررسی سناریوها، ریسک‌های انتشار، پایداری جریان‌ها و کاهش خطا پیش از تحویل.",
        },
        {
          tag: "OPS",
          title: "DevOps",
          body: "استقرار، مانیتورینگ، امنیت، پشتیبان‌گیری و آماده نگه‌داشتن زیرساخت برای release پایدار.",
        },
        {
          tag: "STR",
          title: "استراتژی",
          body: "اتصال تصمیم‌های فنی به بازار، عملیات و مدل رشد تا محصول فقط ساخته نشود، قابل استفاده هم بماند.",
        },
      ],
    },
    squadModel: {
      eyebrow: "// مدل اسکواد",
      title: "ساختار تیم در پروژه‌ها",
      intro: "برای هر پروژه یک squad کوچک و پاسخ‌گو شکل می‌گیرد که تصمیم‌های روزمره را بدون بروکراسی اضافی جلو می‌برد.",
      items: [
        "یک هسته کوچک با مالک فنی و مالک محصول برای تصمیم‌گیری سریع",
        "دسترسی مشترک به طراحی، QA و DevOps از ابتدای کار نه فقط در انتها",
        "تقسیم کار بر اساس outcome و milestone، نه فقط فایل و تسک",
        "جلسه‌های sync کوتاه و گزارش‌های شفاف برای تیم داخلی مشتری",
      ],
    },
    principles: {
      eyebrow: "// اصول کاری",
      title: "آنچه از تیم ما انتظار دارید",
      items: [
        "ساختن چیزی که قابل نگهداری باشد، نه صرفاً چیزی که امروز کار کند",
        "ترجیح وضوح و سادگی به پیچیدگی نمایشی",
        "ثبت تصمیم‌ها، فرض‌ها و محدودیت‌ها به‌جای وابستگی به حافظه افراد",
        "همکاری نزدیک با تیم مشتری بدون ایجاد وابستگی ناسالم",
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
      eyebrow: "> loading /aboutus/team...",
      title: "Our Team",
      lead: "Cross-functional squads formed around product problems, not inflated job titles.",
      body: "At First Data, teams are assembled around project needs: engineering, design, product, QA, DevOps, and strategy work in one rhythm so decisions stay fast, delivery stays stable, and communication stays clear.",
      cta: "Collaborate with First Data",
    },
    culture: {
      eyebrow: "// culture",
      title: "How we work together",
      items: [
        {
          title: "Real ownership",
          body: "Every team member owns outcomes and user experience, not just a list of assigned tasks.",
        },
        {
          title: "Execution transparency",
          body: "Status, risks, and decisions are communicated early so projects move forward without hidden surprises.",
        },
        {
          title: "Continuous learning",
          body: "After each release, we review what improved and what should change in the next iteration.",
        },
      ],
    },
    disciplines: {
      eyebrow: "// disciplines",
      title: "Capabilities we bring into the same room",
      cards: [
        {
          tag: "ENG",
          title: "Engineering",
          body: "Frontend, backend, API architecture, and codebase stewardship for long-term growth.",
        },
        {
          tag: "DES",
          title: "Design",
          body: "UX, interface systems, and simplification of complex flows for real users.",
        },
        {
          tag: "PRD",
          title: "Product",
          body: "Turning ambiguous needs into executable scope, prioritizing backlog, and keeping delivery aligned with business goals.",
        },
        {
          tag: "Q/A",
          title: "Quality Assurance",
          body: "Scenario validation, release-risk review, flow stability, and error reduction before handoff.",
        },
        {
          tag: "OPS",
          title: "DevOps",
          body: "Deployment, monitoring, security, backups, and infrastructure readiness for reliable releases.",
        },
        {
          tag: "STR",
          title: "Strategy",
          body: "Connecting technical choices to market, operations, and growth so products remain useful after launch.",
        },
      ],
    },
    squadModel: {
      eyebrow: "// squad model",
      title: "How teams are structured",
      intro: "Each project gets a small, accountable squad that can move day-to-day decisions forward without unnecessary bureaucracy.",
      items: [
        "A compact core with technical and product ownership for faster decisions",
        "Shared access to design, QA, and DevOps from the start, not only at the end",
        "Work organized around outcomes and milestones, not just files and tickets",
        "Short syncs and transparent reporting for the client’s internal team",
      ],
    },
    principles: {
      eyebrow: "// principles",
      title: "What you can expect from our team",
      items: [
        "Build things that remain maintainable, not just things that work today",
        "Prefer clarity and simplicity over performative complexity",
        "Document decisions, assumptions, and limits instead of relying on memory",
        "Work closely with client teams without creating unhealthy dependency",
      ],
    },
    crossNav: {
      eyebrow: "// continue",
      title: "Related about pages",
      linkLabel: "View",
    },
  },
};
