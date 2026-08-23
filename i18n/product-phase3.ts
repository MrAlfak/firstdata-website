import type { Lang } from "./dictionaries";
import type { ProductSlug } from "./product-page";

export type ProductPricingTier = {
  id: string;
  title: string;
  timeline: string;
  summary: string;
  bullets: string[];
  cta: string;
};

export type ProductServiceLink = {
  href: string;
  title: string;
  body: string;
};

export type ProductPhase3Sub = {
  badges: string[];
  bootLines: string[];
  demo: {
    eyebrow: string;
    title: string;
    caption: string;
  };
  pricing: {
    eyebrow: string;
    title: string;
    subtitle: string;
    note: string;
    tiers: ProductPricingTier[];
    compareRows: { label: string; values: [string, string, string] }[];
  };
  services: {
    eyebrow: string;
    title: string;
    links: ProductServiceLink[];
  };
  changelog: {
    eyebrow: string;
    title: string;
    body: string;
  };
  onePager: {
    eyebrow: string;
    title: string;
    body: string;
    buttonLabel: string;
    printTitle: string;
    sections: { heading: string; bullets: string[] }[];
  };
  nav: {
    demo: string;
    pricing: string;
    services: string;
    changelog: string;
  };
};

export type ProductPhase3Landing = {
  bootLines: string[];
  changelog: ProductPhase3Sub["changelog"];
};

const serviceLinksFa: Record<ProductSlug, ProductServiceLink[]> = {
  web: [
    { href: "/services/web-design", title: "طراحی وب", body: "مدل همکاری و دامنه طراحی وب" },
    { href: "/services/seo", title: "سئو", body: "SEO فنی و رشد ارگانیک" },
    { href: "/services/ui-ux", title: "UI/UX", body: "طراحی تجربه و prototype" },
  ],
  mobile: [
    { href: "/services/android", title: "Android", body: "توسعه native و cross-platform" },
    { href: "/services/ios", title: "iOS", body: "Swift، TestFlight و App Store" },
    { href: "/services/support", title: "پشتیبانی", body: "نگهداری و SLA پس از لانچ" },
  ],
  windows: [
    { href: "/services/consulting", title: "مشاوره", body: "تحلیل legacy و roadmap" },
    { href: "/services/support", title: "پشتیبانی", body: "به‌روزرسانی و MSI" },
    { href: "/portfolio/desktop", title: "نمونه‌کار دسکتاپ", body: "پروژه‌های LOB و ابزار داخلی" },
  ],
  ai: [
    { href: "/services/consulting", title: "مشاوره", body: "انتخاب use case و ارزیابی ریسک" },
    { href: "/services/support", title: "پشتیبانی", body: "monitoring مدل و کیفیت" },
  ],
  platforms: [
    { href: "/services/consulting", title: "مشاوره معماری", body: "نقشه سامانه و migration" },
    { href: "/services/web-design", title: "طراحی وب", body: "کانال web روی پلتفرم" },
    { href: "/services/support", title: "پشتیبانی", body: "SLA و observability" },
  ],
};

const serviceLinksEn: Record<ProductSlug, ProductServiceLink[]> = {
  web: [
    { href: "/services/web-design", title: "Web design", body: "Engagement model and web scope" },
    { href: "/services/seo", title: "SEO", body: "Technical SEO and organic growth" },
    { href: "/services/ui-ux", title: "UI/UX", body: "Experience design and prototypes" },
  ],
  mobile: [
    { href: "/services/android", title: "Android", body: "Native and cross-platform delivery" },
    { href: "/services/ios", title: "iOS", body: "Swift, TestFlight, App Store" },
    { href: "/services/support", title: "Support", body: "Post-launch maintenance and SLA" },
  ],
  windows: [
    { href: "/services/consulting", title: "Consulting", body: "Legacy analysis and roadmap" },
    { href: "/services/support", title: "Support", body: "Updates and MSI packaging" },
    { href: "/portfolio/desktop", title: "Desktop portfolio", body: "LOB tools and internal apps" },
  ],
  ai: [
    { href: "/services/consulting", title: "Consulting", body: "Use case selection and risk review" },
    { href: "/services/support", title: "Support", body: "Model monitoring and quality" },
  ],
  platforms: [
    { href: "/services/consulting", title: "Architecture consulting", body: "System map and migration" },
    { href: "/services/web-design", title: "Web design", body: "Web channel on the platform" },
    { href: "/services/support", title: "Support", body: "SLA and observability" },
  ],
};

function tiersForSlug(slug: ProductSlug, lang: Lang): ProductPricingTier[] {
  const fa = lang === "fa";

  if (slug === "windows") {
    return fa
      ? [
          {
            id: "mvp",
            title: "کشف نیاز + MVP",
            timeline: "۴–۸ هفته",
            summary: "شروع سریع با یک workflow عملیاتی محدود",
            bullets: ["workshop عملیات", "MVP روی یک فرایند", "نصب pilot (MSI)", "مستندات تحویل"],
            cta: "درخواست MVP",
          },
          {
            id: "full",
            title: "محصول کامل",
            timeline: "۳–۶ ماه",
            summary: "LOB کامل با سخت‌افزار و sync",
            bullets: ["MSI و GPO", "چاپ، POS و بارکد", "sync با HQ", "آموزش تیم"],
            cta: "درخواست محصول کامل",
          },
          {
            id: "enterprise",
            title: "سازمانی",
            timeline: "قرارداد بلندمدت",
            summary: "Rollout چند شعبه، audit و SLA",
            bullets: ["کانال auto-update", "audit و RBAC", "Rollout مرحله‌ای", "SLA پشتیبانی"],
            cta: "گفتگو با تیم فروش",
          },
        ]
      : [
          {
            id: "mvp",
            title: "Discovery + MVP",
            timeline: "4–8 weeks",
            summary: "Fast start with one bounded operational workflow",
            bullets: ["Ops workshop", "MVP on one process", "Pilot MSI install", "Handover docs"],
            cta: "Request MVP",
          },
          {
            id: "full",
            title: "Full product",
            timeline: "3–6 months",
            summary: "Complete LOB with hardware and HQ sync",
            bullets: ["MSI and GPO", "Print, POS, barcode", "HQ sync", "Team training"],
            cta: "Request full product",
          },
          {
            id: "enterprise",
            title: "Enterprise",
            timeline: "Long-term engagement",
            summary: "Multi-branch rollout, audit, and SLA",
            bullets: ["Auto-update channel", "Audit and RBAC", "Staged rollout", "Support SLA"],
            cta: "Talk to sales",
          },
        ];
  }

  if (fa) {
    return [
      {
        id: "mvp",
        title: "کشف + MVP",
        timeline: "۴–۸ هفته",
        summary: "شروع سریع با scope محدود و قابل اندازه‌گیری",
        bullets: ["Workshop و wireframe", "MVP قابل لانچ", "بازخورد هفتگی", "مستندات تحویل"],
        cta: "درخواست MVP",
      },
      {
        id: "full",
        title: "محصول کامل",
        timeline: "۳–۶ ماه",
        summary: "محصول کامل با یکپارچه‌سازی و پنل",
        bullets: ["CMS / پنل مدیریت", "API و integration", "QA و performance", "آموزش تیم"],
        cta: "درخواست محصول کامل",
      },
      {
        id: "enterprise",
        title: "سازمانی",
        timeline: "قرارداد بلندمدت",
        summary: "مقیاس، SLA، governance و rollout",
        bullets: ["SSO / RBAC پیشرفته", "Monitoring و SLA", "Rollout مرحله‌ای", "تیم اختصاصی"],
        cta: "گفتگو با تیم فروش",
      },
    ];
  }

  return [
    {
      id: "mvp",
      title: "Discovery + MVP",
      timeline: "4–8 weeks",
      summary: "Fast start with a bounded, measurable scope",
      bullets: ["Workshop and wireframes", "Launch-ready MVP", "Weekly feedback", "Handover docs"],
      cta: "Request MVP",
    },
    {
      id: "full",
      title: "Full product",
      timeline: "3–6 months",
      summary: "Complete product with integrations and admin",
      bullets: ["CMS / admin panel", "API and integrations", "QA and performance", "Team training"],
      cta: "Request full product",
    },
    {
      id: "enterprise",
      title: "Enterprise",
      timeline: "Long-term engagement",
      summary: "Scale, SLA, governance, and rollout",
      bullets: ["Advanced SSO / RBAC", "Monitoring and SLA", "Staged rollout", "Dedicated team"],
      cta: "Talk to sales",
    },
  ];
}

function pricingBlock(
  badges: string[],
  bootLines: string[],
  demoCaption: string,
  onePagerSections: { heading: string; bullets: string[] }[],
  compareRows: { label: string; values: [string, string, string] }[],
  quoteName: string,
  lang: Lang,
  slug: ProductSlug,
): ProductPhase3Sub {
  const fa = lang === "fa";
  const services = fa ? serviceLinksFa[slug] : serviceLinksEn[slug];
  const deployDemo = slug === "windows";

  return {
    badges,
    bootLines,
    demo: {
      eyebrow: fa
        ? deployDemo
          ? "// پیش‌نمایش استقرار"
          : "// پیش‌نمایش زنده"
        : deployDemo
          ? "// deploy preview"
          : "// live preview",
      title: fa
        ? deployDemo
          ? "مسیر استقرار MSI"
          : "پیش‌نمایش تعاملی"
        : deployDemo
          ? "MSI deploy path"
          : "Interactive preview",
      caption: demoCaption,
    },
    pricing: {
      eyebrow: fa ? "// سطوح همکاری" : "// engagement tiers",
      title: fa ? "سطوح همکاری و تحویل" : "Engagement tiers and delivery",
      subtitle: fa
        ? "از MVP عملیاتی تا محصول enterprise — بسته‌ای که با scope و محیط اجرای شما هم‌خوان است."
        : "From operational MVP to enterprise rollout — pick the engagement that matches your scope and runtime.",
      note: fa
        ? "اعداد timeline راهنما هستند — scope دقیق پس از discovery تعیین می‌شود."
        : "Timelines are indicative — exact scope is set after discovery.",
      tiers: tiersForSlug(slug, lang),
      compareRows,
    },
    services: {
      eyebrow: fa ? "// خدمات مرتبط" : "// related services",
      title: fa ? "خدمات مکمل این خط محصول" : "Services that complement this product line",
      links: services,
    },
    changelog: {
      eyebrow: fa ? "// به‌روزرسانی محصول" : "// product updates",
      title: fa ? "این خط محصول زنده است" : "This product line is actively maintained",
      body: fa
        ? "آخرین به‌روزرسانی‌های First Data — شامل بهبود صفحات محصول و قابلیت‌های پنل."
        : "Recent First Data releases — including product pages and panel capabilities.",
    },
    onePager: {
      eyebrow: fa ? "// یک‌صفحه‌ای" : "// one-pager",
      title: fa ? "معرفی یک‌صفحه‌ای" : "One-page overview",
      body: fa
        ? "نسخه چاپ/PDF برای اشتراک با تیم یا مدیران — شامل خلاصه، stack و مسیر همکاری."
        : "Print/PDF version to share with stakeholders — summary, stack, and engagement path.",
      buttonLabel: fa ? "باز کردن / چاپ PDF" : "Open / print PDF",
      printTitle: quoteName,
      sections: onePagerSections,
    },
    nav: {
      demo: fa ? (deployDemo ? "استقرار" : "پیش‌نمایش") : deployDemo ? "Deploy" : "Preview",
      pricing: fa ? "سطوح" : "Tiers",
      services: fa ? "خدمات" : "Services",
      changelog: fa ? "به‌روزرسانی" : "Updates",
    },
  };
}

export const productPhase3Sub: Record<Lang, Record<ProductSlug, ProductPhase3Sub>> = {
  fa: {
    web: pricingBlock(
      ["Lighthouse 90+", "SEO-ready", "PWA"],
      ["> boot /product/web...", "> load next.js runtime...", "> mount dashboard shell...", "> ready."],
      "مرورگر، CMS و API — loop زنده UI dashboard",
      [
        { heading: "مسیر محصول", bullets: ["سایت و پورتال", "CMS اختصاصی", "پنل مدیریت", "API عمومی/داخلی"] },
        { heading: "Stack", bullets: ["Next.js", "React", "TypeScript", "Tailwind", "PWA"] },
      ],
      [
        { label: "CMS / پنل", values: ["MVP", "✓", "✓"] },
        { label: "SEO فنی", values: ["پایه", "✓", "✓+"] },
        { label: "SLA", values: ["—", "اختیاری", "✓"] },
      ],
      "محصولات وب — First Data",
      "fa",
      "web",
    ),
    mobile: pricingBlock(
      ["Offline sync", "Push", "App Store"],
      ["> boot /product/mobile...", "> init sync queue...", "> push channel ok...", "> ready."],
      "فریم موبایل با animation sync و notification",
      [
        { heading: "مسیر محصول", bullets: ["Android / iOS", "آفلاین و sync", "Push notification", "Store submit"] },
        { heading: "Stack", bullets: ["Kotlin", "Swift", "Flutter", "REST API"] },
      ],
      [
        { label: "Offline", values: ["✓", "✓", "✓"] },
        { label: "Store", values: ["—", "✓", "✓"] },
        { label: "MDM", values: ["—", "—", "✓"] },
      ],
      "محصولات موبایل — First Data",
      "fa",
      "mobile",
    ),
    windows: pricingBlock(
      ["MSI deploy", "Auto-update", "LOB"],
      ["> بارگذاری /product/windows...", "> runtime .net...", "> پل دستگاه ok...", "> آماده."],
      "مسیر استقرار MSI از build تا rollout در Active Directory",
      [
        { heading: "مسیر محصول", bullets: ["نرم‌افزار LOB", "MSI و GPO", "چاپ و POS", "sync با HQ"] },
        { heading: "Stack", bullets: [".NET", "WPF", "C#", "MSI"] },
      ],
      [
        { label: "MSI / updater", values: ["—", "✓", "✓"] },
        { label: "سخت‌افزار (چاپ/POS)", values: ["MVP", "✓", "✓"] },
        { label: "GPO / AD", values: ["—", "MVP", "✓"] },
        { label: "SLA پشتیبانی", values: ["—", "اختیاری", "✓"] },
      ],
      "محصولات ویندوز — First Data",
      "fa",
      "windows",
    ),
    ai: pricingBlock(
      ["RAG", "Privacy-first", "Eval"],
      ["> boot /product/ai...", "> load policy layer...", "> index secure...", "> ready."],
      "ترمینال AI با typing effect روی prompt/response",
      [
        { heading: "مسیر محصول", bullets: ["RAG داخلی", "اتوماسیون workflow", "Human-in-the-loop", "Monitoring"] },
        { heading: "Stack", bullets: ["LLM", "Embeddings", "RAG", "APIs"] },
      ],
      [
        { label: "RAG pilot", values: ["✓", "✓", "✓"] },
        { label: "Private model", values: ["—", "اختیاری", "✓"] },
      ],
      "محصولات AI — First Data",
      "fa",
      "ai",
    ),
    platforms: pricingBlock(
      ["SSO", "Unified API", "Modular"],
      ["> boot /product/platforms...", "> sso handshake...", "> gateway up...", "> ready."],
      "نودهای Web/Mobile/Admin/API با pulse اتصال",
      [
        { heading: "مسیر محصول", bullets: ["SSO", "API Gateway", "Legacy bridge", "Multi-channel"] },
        { heading: "Stack", bullets: ["SSO", "Queues", "Webhooks", "Modular services"] },
      ],
      [
        { label: "SSO + API", values: ["—", "✓", "✓"] },
        { label: "Legacy bridge", values: ["MVP", "✓", "✓"] },
      ],
      "پلتفرم یکپارچه — First Data",
      "fa",
      "platforms",
    ),
  },
  en: {
    web: pricingBlock(
      ["Lighthouse 90+", "SEO-ready", "PWA"],
      ["> boot /product/web...", "> load next.js runtime...", "> mount dashboard shell...", "> ready."],
      "Browser, CMS, and API — live dashboard UI loop",
      [
        { heading: "Product path", bullets: ["Site and portal", "Custom CMS", "Admin panel", "Public/internal API"] },
        { heading: "Stack", bullets: ["Next.js", "React", "TypeScript", "Tailwind", "PWA"] },
      ],
      [
        { label: "CMS / panel", values: ["MVP", "✓", "✓"] },
        { label: "Technical SEO", values: ["Basic", "✓", "✓+"] },
        { label: "SLA", values: ["—", "Optional", "✓"] },
      ],
      "Web products — First Data",
      "en",
      "web",
    ),
    mobile: pricingBlock(
      ["Offline sync", "Push", "App Store"],
      ["> boot /product/mobile...", "> init sync queue...", "> push channel ok...", "> ready."],
      "Mobile frame with sync and notification animation",
      [
        { heading: "Product path", bullets: ["Android / iOS", "Offline and sync", "Push notifications", "Store submit"] },
        { heading: "Stack", bullets: ["Kotlin", "Swift", "Flutter", "REST API"] },
      ],
      [
        { label: "Offline", values: ["✓", "✓", "✓"] },
        { label: "Store", values: ["—", "✓", "✓"] },
        { label: "MDM", values: ["—", "—", "✓"] },
      ],
      "Mobile products — First Data",
      "en",
      "mobile",
    ),
    windows: pricingBlock(
      ["MSI deploy", "Auto-update", "LOB"],
      ["> boot /product/windows...", "> load .net runtime...", "> device bridge ok...", "> ready."],
      "MSI deploy path from build to AD/GPO rollout",
      [
        { heading: "Product path", bullets: ["LOB software", "MSI and GPO", "Print and POS", "HQ sync"] },
        { heading: "Stack", bullets: [".NET", "WPF", "C#", "MSI"] },
      ],
      [
        { label: "MSI / updater", values: ["—", "✓", "✓"] },
        { label: "Hardware (print/POS)", values: ["MVP", "✓", "✓"] },
        { label: "GPO / AD", values: ["—", "MVP", "✓"] },
        { label: "Support SLA", values: ["—", "Optional", "✓"] },
      ],
      "Windows products — First Data",
      "en",
      "windows",
    ),
    ai: pricingBlock(
      ["RAG", "Privacy-first", "Eval"],
      ["> boot /product/ai...", "> load policy layer...", "> index secure...", "> ready."],
      "AI terminal with typing on prompt/response",
      [
        { heading: "Product path", bullets: ["Internal RAG", "Workflow automation", "Human-in-the-loop", "Monitoring"] },
        { heading: "Stack", bullets: ["LLM", "Embeddings", "RAG", "APIs"] },
      ],
      [
        { label: "RAG pilot", values: ["✓", "✓", "✓"] },
        { label: "Private model", values: ["—", "Optional", "✓"] },
      ],
      "AI products — First Data",
      "en",
      "ai",
    ),
    platforms: pricingBlock(
      ["SSO", "Unified API", "Modular"],
      ["> boot /product/platforms...", "> sso handshake...", "> gateway up...", "> ready."],
      "Web/Mobile/Admin/API nodes with connection pulse",
      [
        { heading: "Product path", bullets: ["SSO", "API gateway", "Legacy bridge", "Multi-channel"] },
        { heading: "Stack", bullets: ["SSO", "Queues", "Webhooks", "Modular services"] },
      ],
      [
        { label: "SSO + API", values: ["—", "✓", "✓"] },
        { label: "Legacy bridge", values: ["MVP", "✓", "✓"] },
      ],
      "Integrated platform — First Data",
      "en",
      "platforms",
    ),
  },
};

export const productPhase3Landing: Record<Lang, ProductPhase3Landing> = {
  fa: {
    bootLines: ["> boot /product...", "> load catalog...", "> explorer + matcher online...", "> ready."],
    changelog: productPhase3Sub.fa.web.changelog,
  },
  en: {
    bootLines: ["> boot /product...", "> load catalog...", "> explorer + matcher online...", "> ready."],
    changelog: productPhase3Sub.en.web.changelog,
  },
};
