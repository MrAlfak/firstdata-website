import type { Lang } from "./dictionaries";
import type { ProductStatItem } from "./product-sub-extensions";

export type ProductLandingExtensions = {
  stats: {
    eyebrow: string;
    items: ProductStatItem[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
};

export const productLandingExtensions: Record<Lang, ProductLandingExtensions> = {
  fa: {
    stats: {
      eyebrow: "// خطوط محصول First Data",
      items: [
        { id: "lines", value: 5, suffix: "", label: "دسته محصول", note: "وب، موبایل، ویندوز، AI، پلتفرم" },
        { id: "deliveries", value: 100, suffix: "+", label: "تحویل زنده", note: "وب، موبایل، دسکتاپ" },
        { id: "team", value: 80, suffix: "+", label: "تیم همراه", note: "توسعه، طراحی، DevOps" },
        { id: "years", value: 15, suffix: "+", label: "سال ساخت", note: "از Dialup تا AI" },
      ],
    },
    faq: {
      eyebrow: "// سوالات متداول",
      title: "پرسش‌های رایج درباره محصولات",
      items: [
        {
          q: "تفاوت صفحه محصولات با خدمات چیست؟",
          a: "محصولات بر خروجی و دسته راهکار (وب، موبایل، AI و …) تمرکز دارد. خدمات مدل همکاری و تخصص اجرایی را توضیح می‌دهد. هر دو می‌توانند به یک پروژه ختم شوند.",
        },
        {
          q: "چطور دسته مناسب را انتخاب کنم؟",
          a: "از Product Explorer یا Product Matcher شروع کنید؛ هر صفحه use case، نمونه‌کار و FAQ دارد. در صورت تردید، درخواست مشاوره ثبت کنید.",
        },
        {
          q: "آیا محصولات آماده (off-the-shelf) هم دارید؟",
          a: "تمرکز ما محصول سفارشی و قابل توسعه است. در برخی خطوط، ماژول‌های پایه قابل استفاده مجدد داریم که زمان تحویل را کوتاه می‌کند.",
        },
        {
          q: "تحویل مرحله‌ای چگونه است؟",
          a: "معمولاً با discovery و MVP شروع می‌کنیم؛ سپس milestoneهای روشن با بازخورد و اندازه‌گیری. scope هر فاز در قرارداد مشخص است.",
        },
      ],
    },
  },
  en: {
    stats: {
      eyebrow: "// First Data product lines",
      items: [
        { id: "lines", value: 5, suffix: "", label: "Product lines", note: "Web, mobile, Windows, AI, platform" },
        { id: "deliveries", value: 100, suffix: "+", label: "Live deliveries", note: "Web, mobile, desktop" },
        { id: "team", value: 80, suffix: "+", label: "Team members", note: "Dev, design, DevOps" },
        { id: "years", value: 15, suffix: "+", label: "Years building", note: "From dial-up to AI" },
      ],
    },
    faq: {
      eyebrow: "// faq",
      title: "Common questions about products",
      items: [
        {
          q: "How are products different from services?",
          a: "Products focus on deliverable categories (web, mobile, AI, etc.). Services explain engagement models and execution expertise. Both can lead to the same project.",
        },
        {
          q: "How do I pick the right category?",
          a: "Start from the Product Explorer or Matcher—each page has use cases, samples, and FAQ. If unsure, submit a consultation request.",
        },
        {
          q: "Do you offer off-the-shelf products?",
          a: "We focus on custom, extensible products. Some lines reuse base modules to shorten delivery time.",
        },
        {
          q: "How does staged delivery work?",
          a: "We usually start with discovery and an MVP, then clear milestones with feedback and metrics. Each phase scope is defined in the contract.",
        },
      ],
    },
  },
};
