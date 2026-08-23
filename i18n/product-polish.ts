import type { Lang } from "./dictionaries";

export type ProductPolishUi = {
  caseStudy: {
    eyebrow: string;
    title: string;
    challenge: string;
    approach: string;
    outcome: string;
    stack: string;
    cta: string;
  };
  navCaseStudy: string;
  navDemo: string;
  navPricing: string;
  navCompare: string;
  processCta: string;
  secondaryCta: string;
  crossNavHint: string;
  demo: { eyebrow: string; title: string; subtitle: string };
  industries: { eyebrow: string; title: string };
};

export const productPolishUi: Record<Lang, ProductPolishUi> = {
  fa: {
    caseStudy: {
      eyebrow: "// مطالعه موردی",
      title: "یک نمونه واقعی از همین خط محصول",
      challenge: "چالش",
      approach: "رویکرد",
      outcome: "نتیجه",
      stack: "فناوری",
      cta: "مشاهده نمونه‌کارهای بیشتر",
    },
    navCaseStudy: "مطالعه موردی",
    navDemo: "دمو",
    navPricing: "قیمت",
    navCompare: "مقایسه",
    processCta: "شروع با درخواست پروژه",
    secondaryCta: "مشاوره رایگان",
    crossNavHint: "مسیر بعدی",
    demo: {
      eyebrow: "// دمو تعاملی",
      title: "۳ کلیک تا حس محصول",
      subtitle: "مسیر کوتاه از صفحه تا نتیجه — بدون لاگین.",
    },
    industries: {
      eyebrow: "// حوزه‌ها",
      title: "انواع پروژه‌هایی که تحویل داده‌ایم",
    },
  },
  en: {
    caseStudy: {
      eyebrow: "// case study",
      title: "A real sample from this product line",
      challenge: "Challenge",
      approach: "Approach",
      outcome: "Outcome",
      stack: "Stack",
      cta: "See more portfolio work",
    },
    navCaseStudy: "Case study",
    navDemo: "Demo",
    navPricing: "Pricing",
    navCompare: "Compare",
    processCta: "Start with a project request",
    secondaryCta: "Free consultation",
    crossNavHint: "Next path",
    demo: {
      eyebrow: "// interactive demo",
      title: "Three clicks to feel the product",
      subtitle: "A short path from screen to outcome — no login.",
    },
    industries: {
      eyebrow: "// industries",
      title: "Kinds of work we have shipped",
    },
  },
};
