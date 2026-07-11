import type { Lang } from "./dictionaries";
import type { ProductSlug } from "./product-page";

export type ProductMatcherOption = {
  id: string;
  label: string;
  scores: Partial<Record<ProductSlug, number>>;
};

export type ProductMatcherQuestion = {
  id: string;
  prompt: string;
  options: ProductMatcherOption[];
};

export type ProductPhase2Landing = {
  explorer: {
    eyebrow: string;
    title: string;
    hint: string;
    linkLabel: string;
  };
  matcher: {
    eyebrow: string;
    title: string;
    subtitle: string;
    progressLabel: string;
    backLabel: string;
    nextLabel: string;
    resultEyebrow: string;
    resultTitle: string;
    resultBody: string;
    resultCta: string;
    restartLabel: string;
    questions: ProductMatcherQuestion[];
    resultLabels: Record<ProductSlug, string>;
  };
};

export type ProductPhase2Sub = {
  nav: {
    beforeAfter: string;
    architecture: string;
    compare: string;
  };
  beforeAfter: {
    eyebrow: string;
    title: string;
    beforeLabel: string;
    afterLabel: string;
    beforeLines: string[];
    afterLines: string[];
  };
  architecture: {
    eyebrow: string;
    title: string;
    nodes: string[];
    caption: string;
  };
  stackWhy: Record<string, string>;
  testimonial: {
    eyebrow: string;
    quote: string;
    name: string;
    role: string;
  };
  comparison: {
    eyebrow: string;
    title: string;
    columns: { id: string; title: string; subtitle: string }[];
    rows: { label: string; values: [string, string, string] }[];
    note: string;
  };
};

const matcherQuestionsFa: ProductMatcherQuestion[] = [
  {
    id: "user",
    prompt: "کاربر اصلی محصول شما کیست؟",
    options: [
      { id: "public", label: "مشتری یا بازدیدکننده عمومی", scores: { web: 3, mobile: 1 } },
      { id: "field", label: "تیم میدانی یا فروش", scores: { mobile: 3, web: 1 } },
      { id: "staff", label: "کارکنان داخلی و عملیات", scores: { windows: 2, web: 2, platforms: 1 } },
      { id: "systems", label: "چند سامانه و کانال هم‌زمان", scores: { platforms: 3, web: 1 } },
    ],
  },
  {
    id: "offline",
    prompt: "استفاده آفلاین یا بدون اینترنت پایدار چقدر مهم است؟",
    options: [
      { id: "critical", label: "حیاتی — باید بدون شبکه کار کند", scores: { mobile: 3, windows: 2 } },
      { id: "sometimes", label: "گاهی — sync بعد از اتصال کافی است", scores: { mobile: 2, web: 1, platforms: 1 } },
      { id: "online", label: "همیشه آنلاین — مرورگر یا دسکتاپ متصل", scores: { web: 3, platforms: 2, ai: 1 } },
    ],
  },
  {
    id: "integration",
    prompt: "یکپارچگی با سیستم‌های فعلی چگونه است؟",
    options: [
      { id: "greenfield", label: "شروع تازه — سیستم مستقل", scores: { web: 2, mobile: 2, ai: 1 } },
      { id: "some", label: "چند API یا CRM موجود", scores: { web: 2, mobile: 1, ai: 1, platforms: 1 } },
      { id: "legacy", label: "Legacy زیاد — باید وصل و یکپارچه شود", scores: { platforms: 3, windows: 2 } },
    ],
  },
  {
    id: "priority",
    prompt: "اولویت اصلی شما چیست؟",
    options: [
      { id: "speed", label: "رسیدن سریع به MVP", scores: { web: 2, mobile: 2 } },
      { id: "scale", label: "مقیاس و رشد چندکاناله", scores: { platforms: 3, web: 1 } },
      { id: "automation", label: "اتوماسیون و هوش — کاهش کار دستی", scores: { ai: 3, platforms: 1 } },
      { id: "desktop", label: "عملکرد دسکتاپ، چاپ و سخت‌افزار", scores: { windows: 3 } },
    ],
  },
];

const matcherQuestionsEn: ProductMatcherQuestion[] = [
  {
    id: "user",
    prompt: "Who is the primary user of your product?",
    options: [
      { id: "public", label: "Customers or public visitors", scores: { web: 3, mobile: 1 } },
      { id: "field", label: "Field or sales teams", scores: { mobile: 3, web: 1 } },
      { id: "staff", label: "Internal staff and operations", scores: { windows: 2, web: 2, platforms: 1 } },
      { id: "systems", label: "Multiple systems and channels at once", scores: { platforms: 3, web: 1 } },
    ],
  },
  {
    id: "offline",
    prompt: "How important is offline or unstable-network usage?",
    options: [
      { id: "critical", label: "Critical — must work without network", scores: { mobile: 3, windows: 2 } },
      { id: "sometimes", label: "Sometimes — sync after reconnect is fine", scores: { mobile: 2, web: 1, platforms: 1 } },
      { id: "online", label: "Always online — browser or connected desktop", scores: { web: 3, platforms: 2, ai: 1 } },
    ],
  },
  {
    id: "integration",
    prompt: "How does integration with existing systems look?",
    options: [
      { id: "greenfield", label: "Greenfield — standalone product", scores: { web: 2, mobile: 2, ai: 1 } },
      { id: "some", label: "A few APIs or an existing CRM", scores: { web: 2, mobile: 1, ai: 1, platforms: 1 } },
      { id: "legacy", label: "Heavy legacy — must connect and unify", scores: { platforms: 3, windows: 2 } },
    ],
  },
  {
    id: "priority",
    prompt: "What is your top priority?",
    options: [
      { id: "speed", label: "Reach MVP quickly", scores: { web: 2, mobile: 2 } },
      { id: "scale", label: "Scale and multi-channel growth", scores: { platforms: 3, web: 1 } },
      { id: "automation", label: "Automation and intelligence — less manual work", scores: { ai: 3, platforms: 1 } },
      { id: "desktop", label: "Desktop performance, printing, hardware", scores: { windows: 3 } },
    ],
  },
];

const resultLabelsFa: Record<ProductSlug, string> = {
  web: "محصولات وب",
  mobile: "محصولات موبایل",
  windows: "محصولات ویندوز",
  ai: "محصولات هوش مصنوعی",
  platforms: "پلتفرم‌های یکپارچه",
};

const resultLabelsEn: Record<ProductSlug, string> = {
  web: "Web products",
  mobile: "Mobile products",
  windows: "Windows products",
  ai: "AI products",
  platforms: "Integrated platforms",
};

export const productPhase2Landing: Record<Lang, ProductPhase2Landing> = {
  fa: {
    explorer: {
      eyebrow: "// product explorer",
      title: "دسته‌ها را زنده کاوش کنید",
      hint: "روی هر خط محصول کلیک کنید — پیش‌نمایش و مسیر جزئیات",
      linkLabel: "مشاهده جزئیات",
    },
    matcher: {
      eyebrow: "// product matcher",
      title: "کدام محصول به شما نزدیک‌تر است؟",
      subtitle: "۴ سوال کوتاه — پیشنهاد دسته بر اساس نیاز واقعی",
      progressLabel: "سوال",
      backLabel: "قبلی",
      nextLabel: "بعدی",
      resultEyebrow: "> match found",
      resultTitle: "پیشنهاد ما",
      resultBody: "بر اساس پاسخ‌های شما، این دسته بیشترین هم‌راستایی را دارد. جزئیات، نمونه‌کار و FAQ را ببینید.",
      resultCta: "مشاهده صفحه محصول",
      restartLabel: "شروع دوباره",
      questions: matcherQuestionsFa,
      resultLabels: resultLabelsFa,
    },
  },
  en: {
    explorer: {
      eyebrow: "// product explorer",
      title: "Explore categories live",
      hint: "Click a product line — preview and path to details",
      linkLabel: "View details",
    },
    matcher: {
      eyebrow: "// product matcher",
      title: "Which product line fits you best?",
      subtitle: "Four short questions — category suggestion based on real needs",
      progressLabel: "Question",
      backLabel: "Back",
      nextLabel: "Next",
      resultEyebrow: "> match found",
      resultTitle: "Our suggestion",
      resultBody: "Based on your answers, this category aligns best. Review use cases, samples, and FAQ.",
      resultCta: "Open product page",
      restartLabel: "Start over",
      questions: matcherQuestionsEn,
      resultLabels: resultLabelsEn,
    },
  },
};

function subBlock(
  before: string[],
  after: string[],
  nodes: string[],
  archCaption: string,
  stackWhy: Record<string, string>,
  quote: string,
  name: string,
  role: string,
  compareRows: { label: string; values: [string, string, string] }[],
  compareNote: string,
  navFa: ProductPhase2Sub["nav"],
): ProductPhase2Sub {
  return {
    nav: navFa,
    beforeAfter: {
      eyebrow: "// before / after",
      title: navFa.beforeAfter === "قبل/بعد" ? "قبل و بعد از محصول درست" : "Before and after the right product",
      beforeLabel: "legacy.log",
      afterLabel: "firstdata.log",
      beforeLines: before,
      afterLines: after,
    },
    architecture: {
      eyebrow: "// architecture",
      title: navFa.architecture === "معماری" ? "نمای معماری" : "Architecture snapshot",
      nodes,
      caption: archCaption,
    },
    stackWhy,
    testimonial: { eyebrow: "// client signal", quote, name, role },
    comparison: {
      eyebrow: "// engagement tiers",
      title: navFa.compare === "مقایسه" ? "سطوح همکاری" : "Engagement tiers",
      columns: [
        {
          id: "mvp",
          title: "Discovery + MVP",
          subtitle: navFa.compare === "مقایسه" ? "شروع سریع و قابل اندازه‌گیری" : "Fast, measurable start",
        },
        {
          id: "full",
          title: "Full product",
          subtitle: navFa.compare === "مقایسه" ? "محصول کامل با یکپارچه‌سازی" : "Full product with integrations",
        },
        {
          id: "enterprise",
          title: "Enterprise",
          subtitle: navFa.compare === "مقایسه" ? "مقیاس، SLA و governance" : "Scale, SLA, and governance",
        },
      ],
      rows: compareRows,
      note: compareNote,
    },
  };
}

const navFa = { beforeAfter: "قبل/بعد", architecture: "معماری", compare: "مقایسه" };
const navEn = { beforeAfter: "Before/after", architecture: "Architecture", compare: "Compare" };

export const productPhase2Sub: Record<Lang, Record<ProductSlug, ProductPhase2Sub>> = {
  fa: {
    web: subBlock(
      ["> excel export — manual every morning", "> content updates need developer", "> SEO broken after redesign", "> no single CRM intake"],
      ["> cms publish — self-service ✓", "> lighthouse 90+ — monitored ✓", "> leads routed to CRM — auto ✓", "> staged releases — weekly ✓"],
      ["Browser / PWA", "Next.js App", "REST API", "Database"],
      "مسیر درخواست از مرورگر تا داده — SEO و CMS در لایه اپ",
      { "Next.js": "SSR/SSG برای SEO و عملکرد", React: "UI component-based و قابل نگهداری", "Tailwind CSS": "Design system سریع", TypeScript: "Type safety در scale تیم", PWA: "cache و دسترسی سریع", "REST API": "اتصال CRM و پنل" },
      "پس از تحویل CMS، تیم محتوا بدون تیکت به توسعه صفحات جدید منتشر می‌کند.",
      "مدیر محصول — سازمان B2B",
      "مدیر عملیات دیجیتال",
      [{ label: "تحلیل و wireframe", values: ["✓", "✓", "✓"] }, { label: "CMS / پنل", values: ["MVP", "✓", "✓"] }, { label: "یکپارچه‌سازی API", values: ["اساسی", "✓", "✓+"] }, { label: "SLA و monitoring", values: ["—", "اختیاری", "✓"] }],
      "scope دقیق پس از discovery در proposal مشخص می‌شود.",
      navFa,
    ),
    mobile: subBlock(
      ["> paper forms — lost in transit", "> sync when back at office only", "> no push for status changes"],
      ["> offline queue — sync on reconnect ✓", "> push alerts — same day ✓", "> one codebase — both stores ✓"],
      ["Mobile App", "Sync Layer", "API Gateway", "Database"],
      "اپ، صف آفلاین و API — تجربه میدانی",
      { "React Native": "یک codebase برای Android و iOS", Kotlin: "Native modules", Swift: "iOS compliance", Flutter: "Cross-platform سریع", "Push Notifications": "اعلان real-time", "Offline Sync": "صف و sync آفلاین", "REST API": "Sync مرکزی" },
      "تیم میدانی دیگر منتظر برگشت به دفتر نیست — sync همان لحظه.",
      "سرپرست عملیات — توزیع",
      "Operations Lead",
      [{ label: "Offline sync", values: ["✓", "✓", "✓"] }, { label: "Store submit", values: ["—", "✓", "✓"] }, { label: "MDM deploy", values: ["—", "—", "✓"] }],
      "Cross-platform vs native در discovery انتخاب می‌شود.",
      navFa,
    ),
    windows: subBlock(
      ["> manual re-key from branch", "> updates via USB", "> printer drivers break"],
      ["> MSI deploy — AD/GPO ✓", "> auto-update — controlled ✓", "> audit log ✓"],
      ["Desktop App", "Local DB", "Devices", "HQ Sync"],
      "دسکتاپ، دستگاه و sync با مرکز",
      { ".NET": "LOB پایدار", WPF: "UI دسکتاپ", Electron: "Hybrid در صورت نیاز", "C#": "اکوسystem Windows", MSI: "Deploy سازمانی", "Auto Update": "کانال به‌روزرسانی کنترل‌شده" },
      "شعب گزارش فروش را همان روز می‌فرستند.",
      "مدیر فناوری — retail",
      "IT Manager",
      [{ label: "MSI / updater", values: ["—", "✓", "✓"] }, { label: "Hardware", values: ["MVP", "✓", "✓"] }],
      "Windows 10/11 و air-gapped قابل برنامه‌ریزی است.",
      navFa,
    ),
    ai: subBlock(
      ["> support reads 20 PDFs per ticket", "> data sent to public chat", "> no eval"],
      ["> RAG on internal docs ✓", "> data boundary documented ✓", "> quality dashboard ✓"],
      ["User / Agent", "RAG Index", "LLM", "Policy Layer"],
      "سؤال → بازیابی → مدل → سیاست",
      { LLM: "Reasoning", RAG: "Grounded answers", Embeddings: "Semantic search", Automation: "Workflow", "Privacy-first": "مرز داده", APIs: "CRM و تیکت" },
      "تیم پشتیبانی زمان جستجو در PDF را به‌شدت کم کرد.",
      "Head of Support",
      "Operations Director",
      [{ label: "RAG pilot", values: ["✓", "✓", "✓"] }, { label: "Private model", values: ["—", "اختیاری", "✓"] }],
      "هزینه token در قرارداد شفاف است.",
      navFa,
    ),
    platforms: subBlock(
      ["> 5 logins for staff", "> duplicate data", "> new channel = rewrite"],
      ["> SSO — one identity ✓", "> unified API ✓", "> plug-in modules ✓"],
      ["SSO / IdP", "API Gateway", "Core Services", "Channels"],
      "هویت، gateway و کانال‌ها روی یک core",
      { SSO: "یک login", "Unified APIs": "Logic مشترک", "Modular Architecture": "بدون rewrite", Queues: "Event-driven", Webhooks: "Real-time", "Multi-channel": "web/mobile/admin" },
      "یک identity و API واحد — onboarding IT نصف شد.",
      "CTO",
      "Enterprise Architect",
      [{ label: "SSO + API", values: ["—", "✓", "✓"] }, { label: "Legacy bridge", values: ["MVP", "✓", "✓"] }],
      "Migration staged — بدون big-bang.",
      navFa,
    ),
  },
  en: {
    web: subBlock(
      ["> excel export — manual every morning", "> content updates need developer", "> SEO broken after redesign"],
      ["> cms publish — self-service ✓", "> lighthouse 90+ — monitored ✓", "> leads to CRM — auto ✓"],
      ["Browser / PWA", "Next.js App", "REST API", "Database"],
      "Browser to data — SEO and CMS in the app layer",
      { "Next.js": "SSR/SSG for SEO", React: "Maintainable UI", "Tailwind CSS": "Fast design system", TypeScript: "Type safety", PWA: "Fast repeat access", "REST API": "CRM and panel hooks" },
      "Content team ships pages without dev tickets after CMS delivery.",
      "Product Manager — B2B",
      "Digital Operations Lead",
      [{ label: "Discovery", values: ["✓", "✓", "✓"] }, { label: "CMS / panel", values: ["MVP", "✓", "✓"] }, { label: "API integrations", values: ["Basic", "✓", "✓+"] }],
      "Exact scope after discovery in the proposal.",
      navEn,
    ),
    mobile: subBlock(
      ["> paper forms — lost", "> sync at office only", "> no push"],
      ["> offline queue ✓", "> push same day ✓", "> one codebase ✓"],
      ["Mobile App", "Sync Layer", "API Gateway", "Database"],
      "App, offline queue, API",
      { "React Native": "One codebase", Kotlin: "Native modules", Swift: "iOS compliance", Flutter: "Fast cross-platform", "Push Notifications": "Real-time alerts", "Offline Sync": "Queue and offline sync", "REST API": "Central sync" },
      "Field teams sync in the moment, not back at the office.",
      "Operations Supervisor",
      "Operations Lead",
      [{ label: "Offline sync", values: ["✓", "✓", "✓"] }, { label: "Store submit", values: ["—", "✓", "✓"] }],
      "Cross-platform vs native chosen in discovery.",
      navEn,
    ),
    windows: subBlock(
      ["> manual re-key", "> USB updates", "> print drivers break"],
      ["> MSI — AD/GPO ✓", "> controlled updates ✓", "> audit log ✓"],
      ["Desktop App", "Local DB", "Devices", "HQ Sync"],
      "Desktop, devices, HQ sync",
      { ".NET": "LOB ecosystem", WPF: "Rich desktop UI", Electron: "Hybrid when needed", "C#": "Windows ecosystem", MSI: "Enterprise deploy", "Auto Update": "Controlled update channel" },
      "Branches report sales the same day.",
      "IT Manager — retail",
      "IT Manager",
      [{ label: "MSI / updater", values: ["—", "✓", "✓"] }, { label: "Hardware", values: ["MVP", "✓", "✓"] }],
      "Windows 10/11 and air-gapped plans supported.",
      navEn,
    ),
    ai: subBlock(
      ["> 20 PDFs per ticket", "> public chat with data", "> no eval"],
      ["> RAG on internal docs ✓", "> data boundary ✓", "> quality dashboard ✓"],
      ["User / Agent", "RAG Index", "LLM", "Policy Layer"],
      "Question → retrieval → model → policy",
      { LLM: "Reasoning", RAG: "Grounded answers", Embeddings: "Semantic search", Automation: "Workflows", "Privacy-first": "Data boundary", APIs: "CRM/helpdesk" },
      "Support cut PDF search time significantly.",
      "Head of Support",
      "Operations Director",
      [{ label: "RAG pilot", values: ["✓", "✓", "✓"] }, { label: "Private model", values: ["—", "Optional", "✓"] }],
      "Token cost explicit in contract.",
      navEn,
    ),
    platforms: subBlock(
      ["> 5 logins", "> duplicate data", "> rewrite per channel"],
      ["> SSO ✓", "> unified API ✓", "> plug-in modules ✓"],
      ["SSO / IdP", "API Gateway", "Core Services", "Channels"],
      "Identity, gateway, channels on one core",
      { SSO: "One login", "Unified APIs": "Shared logic", "Modular Architecture": "No rewrite", Queues: "Events", Webhooks: "Partners", "Multi-channel": "All surfaces" },
      "One identity and API — IT onboarding halved.",
      "CTO",
      "Enterprise Architect",
      [{ label: "SSO + API", values: ["—", "✓", "✓"] }, { label: "Legacy bridge", values: ["MVP", "✓", "✓"] }],
      "Staged migration, no big-bang.",
      navEn,
    ),
  },
};

export function resolveProductMatch(
  answers: string[],
  questions: ProductMatcherQuestion[],
): ProductSlug {
  const totals: Record<ProductSlug, number> = { web: 0, mobile: 0, windows: 0, ai: 0, platforms: 0 };

  questions.forEach((q, i) => {
    const option = q.options.find((o) => o.id === answers[i]);
    if (!option) return;
    for (const [slug, score] of Object.entries(option.scores)) {
      totals[slug as ProductSlug] += score ?? 0;
    }
  });

  let best: ProductSlug = "web";
  let max = -1;
  (Object.keys(totals) as ProductSlug[]).forEach((slug) => {
    if (totals[slug] > max) {
      max = totals[slug];
      best = slug;
    }
  });
  return best;
}
