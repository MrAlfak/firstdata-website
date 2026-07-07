import type { Lang } from "./dictionaries";

export type ConsultingPageUi = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    cta: string;
  };
  audience: {
    eyebrow: string;
    title: string;
    cards: { icon: string; title: string; line1: string; line2: string }[];
  };
  analyze: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  deliverables: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  process: {
    eyebrow: string;
    title: string;
    steps: string[];
  };
  compare: {
    eyebrow: string;
    title: string;
    beforeTitle: string;
    beforeItems: string[];
    afterTitle: string;
    afterItems: string[];
  };
  engagement: {
    eyebrow: string;
    title: string;
    cards: { icon: string; title: string; line1: string; line2: string }[];
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

export const consultingPageDictionaries: Record<Lang, ConsultingPageUi> = {
  fa: {
    hero: {
      eyebrow: "> بارگذاری /services/consulting...",
      title: "مشاوره و تحلیل پروژه",
      lead: "قبل از کدنویسی، باید بدانید چه می‌سازید و چرا.",
      body: "نیازها، معماری، بودجه و ریسک را با تیم فنی و کسب‌وکار شما بررسی می‌کنیم — تا تصمیم‌های ساخت، انتخاب فناوری و زمان‌بندی روی داده واقعی باشد نه حدس.",
      cta: "درخواست جلسه مشاوره",
    },
    audience: {
      eyebrow: "// مخاطب",
      title: "این خدمت برای چه کسانی است؟",
      cards: [
        {
          icon: "🚀",
          title: "استارتاپ و ایده اولیه",
          line1: "تعریف MVP، اولویت‌بندی فیچر و تخمین واقع‌بینانه زمان و هزینه.",
          line2: "قبل از سرمایه‌گذاری یا جذب سرمایه.",
        },
        {
          icon: "🏢",
          title: "کسب‌وکار در حال دیجیتال‌سازی",
          line1: "انتقال فرایندهای دستی به سامانه، یکپارچه‌سازی و انتخاب پلتفرم.",
          line2: "برای شرکت‌ها و سازمان‌های در حال تحول.",
        },
        {
          icon: "📱",
          title: "تیم محصول با پروژه نیمه‌کاره",
          line1: "بازبینی معماری، بدهی فنی و مسیر ادامه توسعه.",
          line2: "وقتی پروژه گیر کرده یا جهت مشخص نیست.",
        },
        {
          icon: "🔍",
          title: "سرمایه‌گذار و due diligence",
          line1: "ارزیابی فنی محصول، کد، زیرساخت و ریسک‌های اجرایی.",
          line2: "گزارش مستقل برای تصمیم سرمایه‌گذاری.",
        },
      ],
    },
    analyze: {
      eyebrow: "// حوزه تحلیل",
      title: "چه چیزهایی را بررسی می‌کنیم؟",
      items: [
        "نیازمندی‌ها و اهداف کسب‌وکار",
        "معماری فنی و انتخاب فناوری",
        "تطابق UX با کاربر هدف",
        "زمان‌بندی و نقاط عطف",
        "بودجه و تخصیص منابع",
        "ریسک‌های فنی و عملیاتی",
        "مقیاس‌پذیری و رشد آینده",
        "شکاف تیم و نیازهای استخدام",
      ],
    },
    deliverables: {
      eyebrow: "// خروجی‌ها",
      title: "چه چیزی تحویل می‌گیرید؟",
      items: [
        "گزارش تحلیل و وضعیت فعلی",
        "نقشه راه (Roadmap) با اولویت‌بندی",
        "تخمین زمان و هزینه به تفکیک فاز",
        "توصیه‌های فناوری و معماری",
        "ثبت ریسک‌ها و راهکارهای کاهش",
      ],
    },
    process: {
      eyebrow: "// فرآیند",
      title: "فرآیند مشاوره",
      steps: [
        "جلسه کشف و جمع‌آوری اطلاعات",
        "بررسی مستندات، کد یا نمونه موجود",
        "تحلیل فنی و کسب‌وکار",
        "تهیه گزارش و ارائه به ذینفعان",
        "جلسه پیگیری و پاسخ به سوالات",
      ],
    },
    compare: {
      eyebrow: "// قبل و بعد",
      title: "تفاوت با و بدون مشاوره",
      beforeTitle: "بدون تحلیل اولیه",
      beforeItems: [
        "شروع کدنویسی بدون تعریف دقیق MVP",
        "انتخاب فناوری بر اساس ترند نه نیاز",
        "تخمین‌های خوش‌بینانه زمان و بودجه",
        "کشف مشکلات در میانه پروژه",
        "بازنویسی و هزینه اضافی",
      ],
      afterTitle: "با مشاوره ساختاریافته",
      afterItems: [
        "MVP و اولویت‌ها شفاف و مستند",
        "معماری متناسب با مقیاس و تیم",
        "تخمین واقع‌بینانه با فازبندی",
        "ریسک‌ها شناسایی و برنامه‌ریزی شده",
        "شروع پروژه با اطمینان بیشتر",
      ],
    },
    engagement: {
      eyebrow: "// مدل همکاری",
      title: "چگونه همکاری می‌کنیم؟",
      cards: [
        {
          icon: "📋",
          title: "ممیزی یک‌باره",
          line1: "بررسی فنی یا محصولی در بازه محدود.",
          line2: "گزارش جامع با توصیه‌های عملی — مناسب تصمیم‌گیری سریع.",
        },
        {
          icon: "🤝",
          title: "مشاوره مستمر (Retainer)",
          line1: "جلسات منظم با تیم شما در طول پروژه.",
          line2: "بازبینی تصمیم‌ها، اولویت‌ها و ریسک‌های در حال ظهور.",
        },
        {
          icon: "🛠️",
          title: "کارگاه پیش از ساخت",
          line1: "جلسه فشرده ۱ تا ۲ روزه با ذینفعان.",
          line2: "خروجی: MVP، نقشه راه و تخمین اولیه برای شروع توسعه.",
        },
      ],
    },
    support: {
      eyebrow: "// پس از مشاوره",
      title: "گزارش پایان مسیر نیست.",
      body: "اگر تصمیم به اجرا بگیرید، می‌توانیم پیاده‌سازی را هم بر عهده بگیریم یا تیم شما را در مرحله ساخت همراهی کنیم — با انتقال دانش و مستندات شفاف.",
    },
    faq: {
      eyebrow: "// سوالات متداول",
      title: "سوالات متداول",
      items: [
        {
          q: "مشاوره چقدر زمان می‌برد؟",
          a: "ممیزی یک‌باره معمولاً ۱ تا ۲ هفته؛ کارگاه پیش از ساخت ۱ تا ۲ روز؛ مشاوره مستمر بر اساس قرارداد ماهانه تنظیم می‌شود.",
        },
        {
          q: "آیا به کد و سورس دسترسی نیاز دارید؟",
          a: "برای تحلیل فنی بله — با NDA و کنترل دسترسی. برای ایده اولیه، مستندات و جلسات کافی است.",
        },
        {
          q: "آیا مجبوریم اجرا را با شما انجام دهیم؟",
          a: "خیر. گزارش و توصیه‌ها متعلق به شماست و می‌توانید با هر تیمی اجرا کنید.",
        },
        {
          q: "تفاوت با مشاوره رایگان تماس چیست؟",
          a: "جلسه اولیه برای شناخت نیاز است؛ مشاوره پروژه شامل تحلیل عمیق، گزارش مستند و تخمین فازبندی‌شده است.",
        },
        {
          q: "آیا برای پروژه‌های نیمه‌کاره هم کار می‌کنید؟",
          a: "بله. بازبینی کد، معماری، بدهی فنی و پیشنهاد مسیر ادامه از خدمات رایج ما است.",
        },
      ],
    },
  },
  en: {
    hero: {
      eyebrow: "> loading /services/consulting...",
      title: "Consulting & Project Analysis",
      lead: "Before writing code, you need to know what to build and why.",
      body: "We review requirements, architecture, budget, and risk with your technical and business teams—so build decisions, technology choices, and timelines are based on real data, not guesswork.",
      cta: "Request consultation",
    },
    audience: {
      eyebrow: "// audience",
      title: "Who is this for?",
      cards: [
        {
          icon: "🚀",
          title: "Startup & early idea",
          line1: "MVP definition, feature prioritization, and realistic time and cost estimates.",
          line2: "Before investment or fundraising.",
        },
        {
          icon: "🏢",
          title: "Business going digital",
          line1: "Moving manual processes to systems, integration, and platform selection.",
          line2: "For companies and organizations in transformation.",
        },
        {
          icon: "📱",
          title: "Product team with stalled project",
          line1: "Architecture review, technical debt, and a path forward.",
          line2: "When the project is stuck or direction is unclear.",
        },
        {
          icon: "🔍",
          title: "Investor due diligence",
          line1: "Technical assessment of product, code, infrastructure, and execution risk.",
          line2: "Independent report for investment decisions.",
        },
      ],
    },
    analyze: {
      eyebrow: "// analysis scope",
      title: "What we examine",
      items: [
        "Requirements & business goals",
        "Technical architecture & stack",
        "UX fit for target users",
        "Timeline & milestones",
        "Budget & resource allocation",
        "Technical & operational risks",
        "Scalability & future growth",
        "Team gaps & hiring needs",
      ],
    },
    deliverables: {
      eyebrow: "// deliverables",
      title: "What you receive",
      items: [
        "Analysis report & current-state assessment",
        "Prioritized roadmap",
        "Phased time & cost estimates",
        "Technology & architecture recommendations",
        "Risk register & mitigation plans",
      ],
    },
    process: {
      eyebrow: "// process",
      title: "Consulting process",
      steps: [
        "Discovery session & information gathering",
        "Review of docs, code, or existing prototype",
        "Technical & business analysis",
        "Report delivery & stakeholder presentation",
        "Follow-up session & Q&A",
      ],
    },
    compare: {
      eyebrow: "// before & after",
      title: "With vs without structured consulting",
      beforeTitle: "Without upfront analysis",
      beforeItems: [
        "Coding starts without clear MVP scope",
        "Tech chosen by trend, not need",
        "Overly optimistic time & budget estimates",
        "Problems surface mid-project",
        "Rewrites and extra cost",
      ],
      afterTitle: "With structured consulting",
      afterItems: [
        "Clear, documented MVP & priorities",
        "Architecture matched to scale & team",
        "Realistic phased estimates",
        "Risks identified and planned for",
        "Project kickoff with more confidence",
      ],
    },
    engagement: {
      eyebrow: "// engagement models",
      title: "How we work together",
      cards: [
        {
          icon: "📋",
          title: "One-time audit",
          line1: "Focused technical or product review in a fixed window.",
          line2: "Comprehensive report with actionable recommendations.",
        },
        {
          icon: "🤝",
          title: "Advisory retainer",
          line1: "Regular sessions with your team throughout the project.",
          line2: "Review decisions, priorities, and emerging risks.",
        },
        {
          icon: "🛠️",
          title: "Pre-build workshop",
          line1: "Intensive 1–2 day session with stakeholders.",
          line2: "Output: MVP, roadmap, and initial estimate to start development.",
        },
      ],
    },
    support: {
      eyebrow: "// after consulting",
      title: "The report is not the finish line.",
      body: "If you decide to build, we can implement or support your team through execution—with knowledge transfer and clear documentation.",
    },
    faq: {
      eyebrow: "// faq",
      title: "Frequently asked questions",
      items: [
        {
          q: "How long does consulting take?",
          a: "A one-time audit is usually 1–2 weeks; a pre-build workshop is 1–2 days; advisory retainer is scoped monthly.",
        },
        {
          q: "Do you need access to code and source?",
          a: "For technical analysis, yes—with NDA and controlled access. For early ideas, docs and sessions are enough.",
        },
        {
          q: "Must we build with you afterward?",
          a: "No. Reports and recommendations are yours to execute with any team.",
        },
        {
          q: "How is this different from a free intro call?",
          a: "The intro call scopes needs; project consulting includes deep analysis, documented report, and phased estimates.",
        },
        {
          q: "Do you work on half-finished projects?",
          a: "Yes. Code review, architecture, technical debt, and a path forward are common engagements.",
        },
      ],
    },
  },
};
