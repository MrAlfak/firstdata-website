import type { Lang } from "./dictionaries";

export type SearchUi = {
  title: string;
  close: string;
  minimize: string;
  maximize: string;
  restore: string;
  placeholder: string;
  submit: string;
  empty: string;
  results: string;
  featuredTitle: string;
  popularTitle: string;
  recentTitle: string;
  clearRecent: string;
  viewAll: string;
  pageTitle: string;
  pageLead: string;
  bannerTitle: string;
  bannerBody: string;
  bannerCta: string;
  typeProduct: string;
  typeService: string;
  typePage: string;
  typeBlog: string;
  typePortfolio: string;
  tipClose: string;
  tipSelect: string;
  tipNavigate: string;
  tipEsc: string;
};

export const searchDictionaries: Record<Lang, SearchUi> = {
  fa: {
    title: "جستجو",
    close: "بستن",
    minimize: "کوچک‌سازی",
    maximize: "تمام‌صفحه",
    restore: "بازگردانی اندازه",
    placeholder: "جستجو در محصولات، خدمات، مقالات و صفحات...",
    submit: "جستجو",
    empty: "نتیجه‌ای پیدا نشد. عبارت دیگری امتحان کنید.",
    results: "نتایج",
    featuredTitle: "محصولات و خدمات پیشنهادی",
    popularTitle: "جستجوهای محبوب",
    recentTitle: "جستجوهای اخیر",
    clearRecent: "پاک کردن",
    viewAll: "مشاهده همه نتایج",
    pageTitle: "جستجوی سایت",
    pageLead: "در محصولات، خدمات، نمونه‌کارها و مقالات First Data جستجو کنید.",
    bannerTitle: "مشاوره رایگان First Data",
    bannerBody: "برای انتخاب مسیر درست پروژه، کوتاه با ما صحبت کنید.",
    bannerCta: "دریافت مشاوره",
    typeProduct: "محصول",
    typeService: "خدمت",
    typePage: "صفحه",
    typeBlog: "مقاله",
    typePortfolio: "نمونه‌کار",
    tipClose: "برای بستن",
    tipSelect: "برای انتخاب",
    tipNavigate: "برای جابه‌جایی",
    tipEsc: "esc",
  },
  en: {
    title: "Search",
    close: "Close",
    minimize: "Minimize",
    maximize: "Maximize",
    restore: "Restore size",
    placeholder: "Search products, services, articles, and pages...",
    submit: "Search",
    empty: "No results. Try a different phrase.",
    results: "Results",
    featuredTitle: "Featured products & services",
    popularTitle: "Popular searches",
    recentTitle: "Recent searches",
    clearRecent: "Clear",
    viewAll: "View all results",
    pageTitle: "Site search",
    pageLead: "Search First Data products, services, portfolio, and articles.",
    bannerTitle: "Free First Data consultation",
    bannerBody: "A short call to pick the right path for your project.",
    bannerCta: "Get consultation",
    typeProduct: "Product",
    typeService: "Service",
    typePage: "Page",
    typeBlog: "Article",
    typePortfolio: "Portfolio",
    tipClose: "To close",
    tipSelect: "To Select",
    tipNavigate: "To Navigate",
    tipEsc: "esc",
  },
};
