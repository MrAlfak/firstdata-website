import { BLOG_POSTS } from "@/config/blog";
import {
  CONTACT_CHILDREN,
  PORTFOLIO_CHILDREN,
  PRODUCT_CHILDREN,
  SERVICES_CHILDREN,
} from "@/config/navigation";
import type { Lang } from "@/i18n/dictionaries";
import type { SearchUi } from "@/i18n/search";

export type SearchItemType = "product" | "service" | "page" | "blog" | "portfolio";

export type SearchItem = {
  id: string;
  type: SearchItemType;
  href: string;
  title: { fa: string; en: string };
  blurb?: { fa: string; en: string };
  keywords: string[];
  featured?: boolean;
};

export type PopularSearch = {
  id: string;
  label: { fa: string; en: string };
  href: string;
};

const PAGE_ITEMS: SearchItem[] = [
  {
    id: "home",
    type: "page",
    href: "/",
    title: { fa: "خانه", en: "Home" },
    keywords: ["home", "خانه", "first data", "اولین دیتا"],
  },
  {
    id: "about",
    type: "page",
    href: "/aboutus",
    title: { fa: "درباره ما", en: "About Us" },
    keywords: ["about", "درباره", "team", "تیم"],
  },
  {
    id: "product-hub",
    type: "page",
    href: "/product",
    title: { fa: "محصولات", en: "Products" },
    keywords: ["product", "محصول", "products"],
    featured: true,
  },
  {
    id: "services-hub",
    type: "page",
    href: "/services",
    title: { fa: "خدمات", en: "Services" },
    keywords: ["services", "خدمات", "service"],
    featured: true,
  },
  {
    id: "portfolio-hub",
    type: "page",
    href: "/portfolio",
    title: { fa: "نمونه‌کارها", en: "Portfolio" },
    keywords: ["portfolio", "نمونه‌کار", "samples"],
  },
  {
    id: "blog-hub",
    type: "page",
    href: "/blog",
    title: { fa: "وبلاگ", en: "Blog" },
    keywords: ["blog", "وبلاگ", "article", "مقاله"],
  },
  {
    id: "contact",
    type: "page",
    href: "/contactus",
    title: { fa: "تماس با ما", en: "Contact" },
    keywords: ["contact", "تماس", "support"],
  },
  {
    id: "consultation",
    type: "page",
    href: "/contactus/consultation",
    title: { fa: "مشاوره رایگان", en: "Free Consultation" },
    keywords: ["consultation", "مشاوره", "free", "رایگان"],
    featured: true,
  },
  {
    id: "request",
    type: "page",
    href: "/contactus/request",
    title: { fa: "ثبت درخواست پروژه", en: "Submit Project Request" },
    keywords: ["request", "درخواست", "project", "پروژه"],
  },
];

const PRODUCT_TITLES: Record<string, { fa: string; en: string; keywords: string[] }> = {
  web: {
    fa: "محصول وب",
    en: "Web Product",
    keywords: ["web", "وب", "website", "سایت", "next.js"],
  },
  mobile: {
    fa: "محصول موبایل",
    en: "Mobile Product",
    keywords: ["mobile", "موبایل", "android", "ios", "اپ"],
  },
  windows: {
    fa: "محصول ویندوز",
    en: "Windows Product",
    keywords: ["windows", "ویندوز", "desktop", "دسکتاپ"],
  },
  ai: {
    fa: "هوش مصنوعی",
    en: "Artificial Intelligence",
    keywords: ["ai", "هوش", "artificial", "llm"],
  },
  platforms: {
    fa: "پلتفرم یکپارچه",
    en: "Integrated Platforms",
    keywords: ["platform", "پلتفرم", "sso", "api"],
  },
};

const SERVICE_TITLES: Record<string, { fa: string; en: string; keywords: string[] }> = {
  "web-design": {
    fa: "طراحی وب‌سایت",
    en: "Website Design",
    keywords: ["web design", "طراحی سایت", "website"],
  },
  "ui-ux": {
    fa: "طراحی UI و UX",
    en: "UI/UX Design",
    keywords: ["ui", "ux", "figma", "طراحی"],
  },
  ecommerce: {
    fa: "فروشگاه اینترنتی",
    en: "Online Store",
    keywords: ["ecommerce", "فروشگاه", "shop", "store"],
  },
  android: {
    fa: "اپلیکیشن اندروید",
    en: "Android App",
    keywords: ["android", "اندروید", "kotlin"],
  },
  ios: {
    fa: "اپلیکیشن iOS",
    en: "iOS App",
    keywords: ["ios", "swift", "آیفون"],
  },
  seo: {
    fa: "سئو و بهینه‌سازی",
    en: "SEO & Optimization",
    keywords: ["seo", "سئو", "vitals"],
  },
  consulting: {
    fa: "مشاوره و تحلیل پروژه",
    en: "Consulting & Project Analysis",
    keywords: ["consulting", "مشاوره", "analysis"],
  },
  support: {
    fa: "پشتیبانی و توسعه",
    en: "Support & Development",
    keywords: ["support", "پشتیبانی", "maintenance"],
  },
};

function buildIndex(): SearchItem[] {
  const products: SearchItem[] = PRODUCT_CHILDREN.map((c) => {
    const meta = PRODUCT_TITLES[c.slug];
    return {
      id: `product-${c.slug}`,
      type: "product" as const,
      href: c.href,
      title: { fa: meta.fa, en: meta.en },
      keywords: meta.keywords,
      featured: true,
    };
  });

  const services: SearchItem[] = SERVICES_CHILDREN.map((c) => {
    const meta = SERVICE_TITLES[c.slug];
    return {
      id: `service-${c.slug}`,
      type: "service" as const,
      href: c.href,
      title: { fa: meta.fa, en: meta.en },
      keywords: meta.keywords,
      featured: c.slug === "web-design" || c.slug === "seo" || c.slug === "consulting",
    };
  });

  const portfolio: SearchItem[] = PORTFOLIO_CHILDREN.map((c) => ({
    id: `portfolio-${c.slug}`,
    type: "portfolio" as const,
    href: c.href,
    title: {
      fa: c.labelKey.replace("nav.", ""),
      en: c.slug,
    },
    keywords: [c.slug, "portfolio", "نمونه‌کار"],
  }));

  // Fix portfolio titles properly
  const portfolioTitles: Record<string, { fa: string; en: string }> = {
    websites: { fa: "نمونه‌کار وب‌سایت", en: "Website Portfolio" },
    ecommerce: { fa: "نمونه‌کار فروشگاه", en: "Store Portfolio" },
    "mobile-apps": { fa: "نمونه‌کار موبایل", en: "Mobile Portfolio" },
    desktop: { fa: "نمونه‌کار دسکتاپ", en: "Desktop Portfolio" },
    other: { fa: "سایر نمونه‌کارها", en: "Other Portfolio" },
  };
  for (const item of portfolio) {
    const slug = item.id.replace("portfolio-", "");
    const t = portfolioTitles[slug];
    if (t) item.title = t;
  }

  const contacts: SearchItem[] = CONTACT_CHILDREN.filter((c) => c.slug !== "consultation").map(
    (c) => ({
      id: `contact-${c.slug}`,
      type: "page" as const,
      href: c.href,
      title:
        c.slug === "request"
          ? { fa: "ثبت درخواست پروژه", en: "Project Request" }
          : { fa: "همکاری با ما", en: "Work With Us" },
      keywords: [c.slug, "contact", "تماس"],
    }),
  );

  const blog: SearchItem[] = BLOG_POSTS.map((post) => ({
    id: `blog-${post.slug}`,
    type: "blog" as const,
    href: `/blog/${post.slug}`,
    title: { fa: post.fa.title, en: post.en.title },
    blurb: { fa: post.fa.excerpt, en: post.en.excerpt },
    keywords: [
      post.slug,
      post.category,
      ...(post.tags ?? []),
      ...post.en.title.toLowerCase().split(/\s+/),
      ...post.fa.title.split(/\s+/),
    ],
    featured: Boolean(post.featured),
  }));

  return [...PAGE_ITEMS, ...products, ...services, ...portfolio, ...contacts, ...blog];
}

export const SITE_SEARCH_INDEX: SearchItem[] = buildIndex();

export const POPULAR_SEARCHES: PopularSearch[] = [
  { id: "p-web", label: { fa: "محصول وب", en: "Web product" }, href: "/product/web" },
  { id: "p-mobile", label: { fa: "اپ موبایل", en: "Mobile app" }, href: "/product/mobile" },
  { id: "p-ai", label: { fa: "هوش مصنوعی", en: "AI" }, href: "/product/ai" },
  { id: "s-web", label: { fa: "طراحی سایت", en: "Web design" }, href: "/services/web-design" },
  { id: "s-seo", label: { fa: "سئو", en: "SEO" }, href: "/services/seo" },
  { id: "portfolio", label: { fa: "نمونه‌کارها", en: "Portfolio" }, href: "/portfolio" },
  { id: "blog", label: { fa: "وبلاگ", en: "Blog" }, href: "/blog" },
  { id: "consult", label: { fa: "مشاوره رایگان", en: "Consultation" }, href: "/contactus/consultation" },
  { id: "contact", label: { fa: "تماس با ما", en: "Contact" }, href: "/contactus" },
];

export function typeLabel(type: SearchItemType, ui: SearchUi): string {
  switch (type) {
    case "product":
      return ui.typeProduct;
    case "service":
      return ui.typeService;
    case "blog":
      return ui.typeBlog;
    case "portfolio":
      return ui.typePortfolio;
    default:
      return ui.typePage;
  }
}

export function searchSite(query: string, lang: Lang, limit = 12): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const scored = SITE_SEARCH_INDEX.map((item) => {
    const title = item.title[lang].toLowerCase();
    const blurb = item.blurb?.[lang].toLowerCase() ?? "";
    const keys = item.keywords.join(" ").toLowerCase();
    let score = 0;
    if (title === q) score += 100;
    else if (title.startsWith(q)) score += 80;
    else if (title.includes(q)) score += 60;
    if (keys.includes(q)) score += 40;
    if (blurb.includes(q)) score += 20;
    for (const part of q.split(/\s+/).filter(Boolean)) {
      if (title.includes(part)) score += 10;
      if (keys.includes(part)) score += 6;
    }
    return { item, score };
  })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((row) => row.item);
}

export function getFeaturedSearchItems(limit = 6): SearchItem[] {
  return SITE_SEARCH_INDEX.filter((item) => item.featured).slice(0, limit);
}
