import type { Lang } from "@/i18n/dictionaries";

export type KnowledgeEntry = {
  id: string;
  /** Keywords / phrases (lowercase) — any hit scores the entry */
  keywords: string[];
  replies: Record<Lang, string[]>;
};

/** Sensitive topics → always route to human / contact form */
export const SENSITIVE_KEYWORDS: string[] = [
  "قرارداد",
  "contract",
  "پرداخت",
  "payment",
  "فاکتور",
  "invoice",
  "پیش پرداخت",
  "پیش‌پرداخت",
  "واریز",
  "شکایت",
  "complaint",
  "دعوی",
  "legal",
  "حقوقی",
  "refund",
  "بازگشت وجه",
];

export const STATIC_KNOWLEDGE: KnowledgeEntry[] = [
  {
    id: "pricing",
    keywords: [
      "قیمت",
      "هزینه",
      "چقدر",
      "چند",
      "تعرفه",
      "بودجه",
      "pricing",
      "price",
      "cost",
      "how much",
      "budget",
      "quote",
      "نرخ",
    ],
    replies: {
      en: [
        "Pricing depends on scope (pages, integrations, design depth, and timeline).",
        "Typical ranges (ballpark, not a fixed quote):",
        "  • Marketing site: from ~30M IRR",
        "  • Online store: from ~70M IRR",
        "  • Mobile app: from ~150M IRR",
        "We never give a hard price in chat — a short consult makes the estimate accurate.",
        "Free consult → /contactus/consultation",
        "Project request → /contactus/request",
      ],
      fa: [
        "قیمت به دامنه کار بستگی دارد (صفحات، یکپارچه‌سازی، عمق طراحی و زمان‌بندی).",
        "بازه تقریبی (نه قیمت قطعی):",
        "  • سایت معرفی: از حدود ۳۰ میلیون تومان",
        "  • فروشگاه اینترنتی: از حدود ۷۰ میلیون تومان",
        "  • اپلیکیشن موبایل: از حدود ۱۵۰ میلیون تومان",
        "در چت قیمت قطعی نمی‌دهیم — با یک مشاوره کوتاه برآورد دقیق می‌شود.",
        "مشاوره رایگان → /contactus/consultation",
        "ثبت درخواست پروژه → /contactus/request",
      ],
    },
  },
  {
    id: "services",
    keywords: [
      "خدمات",
      "سرویس",
      "چه کار",
      "چی کار",
      "چه خدماتی",
      "services",
      "what do you",
      "offer",
      "do you build",
      "می‌سازید",
      "میسازید",
    ],
    replies: {
      en: [
        "We build and support digital products:",
        "  01  Website design & development → /services/web-design",
        "  02  UI/UX design → /services/ui-ux",
        "  03  Online stores → /services/ecommerce",
        "  04  Android apps → /services/android",
        "  05  iOS apps → /services/ios",
        "  06  SEO & performance → /services/seo",
        "  07  Consulting → /services/consulting",
        "  08  Ongoing support → /services/support",
        "Full list → /services",
      ],
      fa: [
        "محصولات و خدمات دیجیتال ما:",
        "  ۰۱  طراحی و توسعه وب‌سایت → /services/web-design",
        "  ۰۲  طراحی UI/UX → /services/ui-ux",
        "  ۰۳  فروشگاه اینترنتی → /services/ecommerce",
        "  ۰۴  اپلیکیشن اندروید → /services/android",
        "  ۰۵  اپلیکیشن iOS → /services/ios",
        "  ۰۶  سئو و بهینه‌سازی → /services/seo",
        "  ۰۷  مشاوره → /services/consulting",
        "  ۰۸  پشتیبانی مداوم → /services/support",
        "فهرست کامل → /services",
      ],
    },
  },
  {
    id: "timeline",
    keywords: [
      "زمان",
      "چقدر طول",
      "مدت",
      "تحویل",
      "deadline",
      "timeline",
      "how long",
      "delivery",
      "کی آماده",
      "schedule",
    ],
    replies: {
      en: [
        "Delivery time depends on scope and feedback speed.",
        "Rough guides:",
        "  • Landing / brochure site: ~2–4 weeks",
        "  • Content site / CMS: ~4–8 weeks",
        "  • Store or custom product: ~8–16+ weeks",
        "We kick off within about 7 days after contract.",
        "Tell us your deadline → /contactus/request",
      ],
      fa: [
        "زمان تحویل به دامنه کار و سرعت بازخورد شما بستگی دارد.",
        "راهنمای تقریبی:",
        "  • لندینگ / سایت معرفی: حدود ۲ تا ۴ هفته",
        "  • سایت محتوا / CMS: حدود ۴ تا ۸ هفته",
        "  • فروشگاه یا محصول سفارشی: حدود ۸ تا ۱۶+ هفته",
        "معمولاً تا حدود ۷ روز بعد از قرارداد شروع می‌کنیم.",
        "ددلاین‌تان را بگویید → /contactus/request",
      ],
    },
  },
  {
    id: "start",
    keywords: [
      "شروع",
      "چطور شروع",
      "how to start",
      "get started",
      "next step",
      "قدم بعد",
      "همکاری",
      "سفارش",
      "order",
      "kickoff",
    ],
    replies: {
      en: [
        "Easiest path:",
        "  1) Free consultation → /contactus/consultation",
        "  2) Or send a project brief → /contactus/request",
        "  3) We scope, propose timeline & budget, then kick off",
        "See how we work → /method",
      ],
      fa: [
        "ساده‌ترین مسیر:",
        "  ۱) مشاوره رایگان → /contactus/consultation",
        "  ۲) یا ارسال درخواست پروژه → /contactus/request",
        "  ۳) دامنه را مشخص می‌کنیم، زمان و بودجه پیشنهاد می‌دهیم، بعد شروع",
        "روش کار ما → /method",
      ],
    },
  },
  {
    id: "contact",
    keywords: [
      "تماس",
      "contact",
      "ایمیل",
      "email",
      "تلفن",
      "phone",
      "واتساپ",
      "whatsapp",
      "آدرس",
      "address",
    ],
    replies: {
      en: [
        "Reach First Data:",
        "  Email: info@firstdata.ir",
        "  Phone: +98 933 127 4039",
        "  Contact page → /contactus",
        "  Free consult → /contactus/consultation",
      ],
      fa: [
        "راه‌های ارتباط با اولین دیتا:",
        "  ایمیل: info@firstdata.ir",
        "  تلفن: ‎+۹۸ ۹۳۳ ۱۲۷ ۴۰۳۹",
        "  صفحه تماس → /contactus",
        "  مشاوره رایگان → /contactus/consultation",
      ],
    },
  },
  {
    id: "about",
    keywords: [
      "درباره",
      "کی هستید",
      "شما کیستید",
      "about",
      "who are you",
      "first data",
      "اولین دیتا",
      "شرکت",
    ],
    replies: {
      en: [
        "First Data — We Build. You Grow.",
        "15+ years building web, mobile, desktop, and custom platforms.",
        "150+ live projects · full code ownership · post-launch support.",
        "About us → /aboutus",
        "Portfolio → /portfolio",
      ],
      fa: [
        "اولین دیتا — ما می‌سازیم. شما رشد می‌کنید.",
        "بیش از ۱۵ سال ساخت وب، موبایل، دسکتاپ و پلتفرم‌های اختصاصی.",
        "۱۵۰+ پروژه زنده · مالکیت کامل کد · پشتیبانی بعد از لانچ.",
        "درباره ما → /aboutus",
        "نمونه‌کارها → /portfolio",
      ],
    },
  },
  {
    id: "products",
    keywords: [
      "محصول",
      "product",
      "ai",
      "هوش مصنوعی",
      "پلتفرم",
      "platform",
      "saas",
    ],
    replies: {
      en: [
        "Product lines we engineer:",
        "  • Web products → /product/web",
        "  • Mobile → /product/mobile",
        "  • Windows → /product/windows",
        "  • AI features → /product/ai",
        "  • Integrated platforms → /product/platforms",
        "Overview → /product",
      ],
      fa: [
        "خطوط محصولی که مهندسی می‌کنیم:",
        "  • محصولات وب → /product/web",
        "  • موبایل → /product/mobile",
        "  • ویندوز → /product/windows",
        "  • قابلیت‌های هوش مصنوعی → /product/ai",
        "  • پلتفرم‌های یکپارچه → /product/platforms",
        "نمای کلی → /product",
      ],
    },
  },
  {
    id: "seo",
    keywords: ["سئو", "seo", "گوگل", "google", "رتبه", "ranking"],
    replies: {
      en: [
        "SEO & performance is one of our core services.",
        "Technical SEO, speed, content structure, and measurement.",
        "Service page → /services/seo",
        "Ask for an audit via → /contactus/consultation",
      ],
      fa: [
        "سئو و بهینه‌سازی یکی از خدمات اصلی ماست.",
        "سئوی فنی، سرعت، ساختار محتوا و اندازه‌گیری.",
        "صفحه خدمت → /services/seo",
        "برای درخواست بررسی → /contactus/consultation",
      ],
    },
  },
];

export function unknownReply(lang: Lang): string[] {
  if (lang === "fa") {
    return [
      "این سؤال را هنوز دقیق بلد نیستم — ثبت شد تا جواب بهتری برایش بسازیم.",
      "برای پاسخ انسانی و مشاوره رایگان از فرم تماس استفاده کنید:",
      "→ /contactus",
      "یا مشاوره → /contactus/consultation",
    ];
  }
  return [
    "I don’t have a solid answer for that yet — we logged it to improve later.",
    "For a human reply and a free consult, use the contact form:",
    "→ /contactus",
    "Or book a consult → /contactus/consultation",
  ];
}

export function sensitiveReply(lang: Lang): string[] {
  if (lang === "fa") {
    return [
      "این موضوع بهتر است مستقیم با تیم بررسی شود (قرارداد، پرداخت، مسائل حقوقی).",
      "لطفاً از فرم تماس یا مشاوره استفاده کنید — پاسخ اسکریپتی جایگزین انسان نیست.",
      "→ /contactus",
      "→ /contactus/consultation",
    ];
  }
  return [
    "This topic is best handled by our team directly (contracts, payments, legal).",
    "Please use the contact or consult form — a scripted chat is not a substitute.",
    "→ /contactus",
    "→ /contactus/consultation",
  ];
}

function scoreEntry(norm: string, keywords: string[]): number {
  let score = 0;
  for (const kw of keywords) {
    const k = kw.toLowerCase().trim();
    if (!k) continue;
    if (norm === k) score += 10;
    else if (norm.includes(k)) score += Math.min(6, k.length / 2);
  }
  return score;
}

export function matchStaticKnowledge(
  query: string,
  lang: Lang,
): { id: string; lines: string[]; score: number } | null {
  const norm = query.trim().toLowerCase().replace(/\s+/g, " ");
  if (!norm) return null;

  let best: { id: string; lines: string[]; score: number } | null = null;
  for (const entry of STATIC_KNOWLEDGE) {
    const score = scoreEntry(norm, entry.keywords);
    if (score <= 0) continue;
    if (!best || score > best.score) {
      best = { id: entry.id, lines: entry.replies[lang], score };
    }
  }
  // Require a minimal signal so random words don’t match
  if (!best || best.score < 2.5) return null;
  return best;
}

export function isSensitiveQuery(query: string): boolean {
  const norm = query.trim().toLowerCase();
  return SENSITIVE_KEYWORDS.some((kw) => norm.includes(kw.toLowerCase()));
}
