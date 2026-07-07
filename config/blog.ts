export type BlogCategorySlug = "web" | "design" | "seo" | "mobile" | "product" | "ai";

export const BLOG_CATEGORIES: BlogCategorySlug[] = [
  "web",
  "design",
  "seo",
  "mobile",
  "product",
  "ai",
];

export type BlogPostContent = {
  title: string;
  excerpt: string;
  body: string[];
};

export type BlogPost = {
  slug: string;
  category: BlogCategorySlug;
  publishedAt: string;
  readMinutes: number;
  featured?: boolean;
  tags?: string[];
  en: BlogPostContent;
  fa: BlogPostContent;
};

export const BLOG_AUTHOR = {
  en: { name: "First Data Team", role: "Engineering & Product" },
  fa: { name: "تیم اولین دیتا", role: "مهندسی و محصول" },
} as const;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "core-web-vitals-guide",
    category: "seo",
    publishedAt: "2026-03-12",
    readMinutes: 7,
    featured: true,
    tags: ["performance", "seo", "web-vitals"],
    en: {
      title: "Core Web Vitals in 2026: What Actually Moves the Needle",
      excerpt:
        "LCP, INP, and CLS still matter, but the fixes that work today are more architectural than cosmetic.",
      body: [
        "Google's Core Web Vitals remain a practical proxy for user experience, not just an SEO checkbox. Teams that treat them as a deployment gate rather than a marketing metric consistently ship faster pages and see better conversion rates.",
        "## LCP, asset layer wins",
        "Largest Contentful Paint (LCP) is usually won or lost at the asset layer: hero images without explicit dimensions, unoptimized fonts, and render-blocking third-party scripts are still the top offenders we see in audits.",
        ", Set explicit width/height on hero media",
        ", Self-host fonts with `font-display: swap`",
        ", Defer third-party scripts below the fold",
        "## INP, predictable main thread",
        "Interaction to Next Paint (INP) rewards predictable main-thread work. Defer non-critical JavaScript, split long tasks, and prefer server components or static HTML for above-the-fold content when your stack allows it.",
        "## CLS, design system discipline",
        "Cumulative Layout Shift (CLS) is almost always a design-system problem, reserve space for ads, embeds, and dynamic UI before paint. A one-line aspect-ratio utility often beats weeks of post-launch patching.",
        "## What we ship in practice",
        "Our recommendation: baseline every release with Lighthouse CI, set budgets per route, and fix regressions in the same sprint, not in a quarterly SEO cleanup.",
      ],
    },
    fa: {
      title: "Core Web Vitals در ۲۰۲۶: چه چیزهایی واقعاً اثر می‌گذارند",
      excerpt:
        "LCP، INP و CLS هنوز مهم‌اند, اما راه‌حل‌های مؤثر امروز بیشتر معماری هستند تا ظاهری.",
      body: [
        "Core Web Vitals گوگل همچنان معیار عملی تجربه کاربر است، نه فقط یک تیک سئو. تیم‌هایی که آن را دروازه استقرار می‌دانند، صفحات سریع‌تری تحویل می‌دهند و نرخ تبدیل بهتری می‌بینند.",
        "## LCP, برد در لایه دارایی",
        "Largest Contentful Paint (LCP) معمولاً در لایه دارایی‌ها تعیین می‌شود: تصاویر هیرو بدون ابعاد مشخص، فونت‌های بهینه‌نشده و اسکریپت‌های شخص ثالث مسدودکننده رندر، هنوز پرتکرارترین مشکلات در ممیزی‌ها هستند.",
        ", ابعاد صریح برای رسانه هیرو",
        ", میزبانی فونت با font-display: swap",
        ", به‌تعویق انداختن اسکریپت‌های ثالث",
        "## INP, main thread قابل پیش‌بینی",
        "Interaction to Next Paint (INP) به کار قابل پیش‌بینی در main thread پاداش می‌دهد. جاوااسکریپت غیرضروری را به تعویق بیندازید، تسک‌های طولانی را بشکنید و در صورت امکان از کامپوننت سرور یا HTML استاتیک برای محتوای بالای صفحه استفاده کنید.",
        "## CLS, انضباط سیستم طراحی",
        "Cumulative Layout Shift (CLS) تقریباً همیشه مشکل سیستم طراحی است, قبل از paint برای تبلیغات، embed و UI پویا فضا رزرو کنید. یک utility نسبت تصویر اغلب از هفته‌ها وصله‌کاری پس از لانچ بهتر است.",
        "## آنچه در عمل تحویل می‌دهیم",
        "پیشنهاد ما: هر انتشار را با Lighthouse CI پایش کنید، بودجه برای هر مسیر تعریف کنید و افت‌ها را در همان اسپرینت رفع کنید, نه در یک پاکسازی فصلی سئو.",
      ],
    },
  },
  {
    slug: "figma-to-production",
    category: "design",
    publishedAt: "2026-02-28",
    readMinutes: 6,
    en: {
      title: "From Figma to Production Without Losing the Design",
      excerpt: "A handoff workflow that keeps spacing, tokens, and motion consistent across design and code.",
      body: [
        "The gap between design and development is rarely about tools, it's about shared language. We start every product with a token map: color, type scale, spacing, and motion durations live in one document both teams reference.",
        "Components in Figma mirror components in code. When a button has three states in design, it has three states in Storybook before it ships to production. No one-off CSS in page templates.",
        "Responsive behavior is specified, not implied. Breakpoints, max widths, and RTL mirroring rules are documented alongside each layout, critical for Persian and Arabic products.",
        "Motion is part of the spec: enter/exit durations, easing curves, and reduced-motion fallbacks are exported as constants, not improvised in the browser.",
      ],
    },
    fa: {
      title: "از Figma تا پروداکشن بدون از دست دادن طراحی",
      excerpt: "گردش کار تحویل که فاصله‌ها، توکن‌ها و موشن را بین طراحی و کد یکسان نگه می‌دارد.",
      body: [
        "شکاف بین طراحی و توسعه معمولاً به ابزار مربوط نیست, به زبان مشترک مربوط است. هر محصول را با نقشه توکن شروع می‌کنیم: رنگ، تایپوگرافی، فاصله و مدت موشن در یک سند مرجع هر دو تیم.",
        "کامپوننت‌های Figma آینه کامپوننت‌های کد هستند. وقتی دکمه‌ای سه حالت در طراحی دارد، قبل از پروداکشن سه حالت در Storybook دارد, بدون CSS یک‌بارمصرف در قالب صفحه.",
        "رفتار واکنش‌گرا مشخص است، نه حدسی. breakpointها، عرض حداکثر و قوانین آینه RTL کنار هر layout مستند می‌شوند, برای محصولات فارسی و عربی حیاتی است.",
        "موشن بخشی از مشخصات است: مدت ورود/خروج، منحنی easing و fallback برای reduced-motion به‌صورت ثابت export می‌شوند، نه در مرورگر بداهه.",
      ],
    },
  },
  {
    slug: "kotlin-compose-ui",
    category: "mobile",
    publishedAt: "2026-02-14",
    readMinutes: 5,
    en: {
      title: "Kotlin Compose Patterns We Use in Client Apps",
      excerpt: "State hoisting, navigation graphs, and offline-first screens that survive real networks.",
      body: [
        "Jetpack Compose rewards clear state boundaries. We hoist UI state to ViewModels, keep composables dumb, and test business logic without Robolectric whenever possible.",
        "Navigation uses typed routes with argument validation at the graph level, fewer runtime crashes from deep links and push notification payloads.",
        "Offline-first is not optional for field apps: Room as source of truth, WorkManager for sync, and explicit UI for conflict resolution when two edits collide.",
        "Performance: avoid recompositions from unstable lambdas, use derivedStateOf for expensive transforms, and profile with Macrobenchmark before claiming smooth scroll.",
      ],
    },
    fa: {
      title: "الگوهای Kotlin Compose که در اپ‌های مشتری استفاده می‌کنیم",
      excerpt: "بالا بردن state، گراف ناوبری و صفحات آفلاین‌اول که شبکه واقعی را تحمل می‌کنند.",
      body: [
        "Jetpack Compose به مرزهای واضح state پاداش می‌دهد. state رابط را به ViewModel می‌سپاریم، composableها را ساده نگه می‌داریم و منطق کسب‌وکار را بدون Robolectric تست می‌کنیم.",
        "ناوبری با routeهای تایپ‌شده و اعتبارسنجی آرگومان در سطح گراف, کرش کمتر از deep link و payload اعلان push.",
        "آفلاین‌اول برای اپ میدانی اختیاری نیست: Room به‌عنوان منبع حقیقت، WorkManager برای همگام‌سازی و UI صریح برای حل تداخل وقتی دو ویرایش برخورد می‌کنند.",
        "عملکرد: از recomposition ناشی از lambda ناپایدار پرهیز کنید، derivedStateOf برای تبدیل‌های سنگین و Macrobenchmark قبل از ادعای اسکرول روان.",
      ],
    },
  },
  {
    slug: "nextjs-server-components",
    category: "web",
    publishedAt: "2026-01-30",
    readMinutes: 8,
    en: {
      title: "Next.js App Router: When Server Components Win",
      excerpt: "Practical boundaries between server and client components on marketing and product sites.",
      body: [
        "Server Components are the default for content-heavy pages: blog posts, docs, and landing sections that rarely need browser APIs ship as HTML with minimal JavaScript.",
        "Client boundaries belong where interactivity lives, filters, carts, theme toggles, and animations. Wrap small islands; don't client-wrap entire layouts out of habit.",
        "Data fetching on the server keeps secrets off the wire and improves TTFB. Cache tags and revalidation windows should match how stale your business can tolerate each page.",
        "For bilingual sites, resolve locale on the server when possible so the first paint is already in the correct direction and language, no flash of wrong content.",
      ],
    },
    fa: {
      title: "Next.js App Router: چه زمانی Server Component برنده است",
      excerpt: "مرزهای عملی بین کامپوننت سرور و کلاینت در سایت‌های مارکتینگ و محصول.",
      body: [
        "Server Component پیش‌فرض صفحات محتوامحور است: پست بلاگ، مستندات و بخش‌های لندینگ که به API مرورگر نیاز ندارند، با حداقل جاوااسکریپت به‌صورت HTML تحویل می‌شوند.",
        "مرز کلاینت جایی است که تعامل زنده است, فیلتر، سبد، تغییر تم و انیمیشن. جزیره‌های کوچک را wrap کنید؛ کل layout را از عادت client نکنید.",
        "واکشی داده در سرور رازها را از wire دور نگه می‌دارد و TTFB را بهتر می‌کند. برچسب cache و پنجره revalidate باید با تحمل کسب‌وکار به کهنگی هر صفحه هم‌خوان باشد.",
        "برای سایت دوزبانه، locale را در سرور resolve کنید تا اولین paint از همان ابتدا جهت و زبان درست باشد, بدون فلش محتوای اشتباه.",
      ],
    },
  },
  {
    slug: "ai-features-product",
    category: "ai",
    publishedAt: "2026-01-18",
    readMinutes: 6,
    en: {
      title: "Adding AI Features Without Breaking Trust",
      excerpt: "Guardrails, fallbacks, and UX patterns for LLM-powered product features.",
      body: [
        "Users forgive slow AI; they don't forgive wrong AI presented as fact. Every generative surface needs confidence labeling, source attribution where possible, and a human-readable fallback path.",
        "Keep prompts and model calls server-side. Log redacted traces for debugging, never ship API keys to the client, and rate-limit per user to control cost and abuse.",
        "Start with narrow tasks, summarization, classification, search, before open-ended chat. Narrow scope improves quality and makes evaluation measurable.",
        "Privacy-first deployments (on-prem or regional inference) are increasingly a sales requirement in enterprise deals, design for data residency from day one.",
      ],
    },
    fa: {
      title: "افزودن قابلیت هوش مصنوعی بدون شکستن اعتماد",
      excerpt: "نگهبان‌ها، fallback و الگوهای UX برای قابلیت‌های مبتنی بر LLM.",
      body: [
        "کاربران کندی AI را می‌بخشند؛ AI اشتباه ارائه‌شده به‌عنوان حقیقت را نه. هر سطح generative به برچسب اطمینان، ارجاع منبع در صورت امکان و مسیر fallback قابل فهم نیاز دارد.",
        "prompt و فراخوانی مدل سمت سرور بماند. traceهای ماسک‌شده برای دیباگ لاگ کنید، API key به کلاینت نفرستید و per user rate-limit برای کنترل هزینه و سوءاستفاده.",
        "با کارهای باریک شروع کنید, خلاصه‌سازی، طبقه‌بندی، جستجو, قبل از چت باز. دامنه باریک کیفیت را بالا می‌برد و ارزیابی را قابل اندازه‌گیری می‌کند.",
        "استقرار privacy-first (on-prem یا inference منطقه‌ای) در معاملات سازمانی الزام فروش می‌شود, از روز اول برای اقامت داده طراحی کنید.",
      ],
    },
  },
  {
    slug: "mvp-scope-checklist",
    category: "product",
    publishedAt: "2025-12-20",
    readMinutes: 5,
    en: {
      title: "MVP Scope: A Checklist Before You Write Code",
      excerpt: "How we help founders cut scope without cutting value.",
      body: [
        "An MVP should prove one risky assumption, not ship a mini-version of every future feature. We document the hypothesis, success metric, and timeline before design starts.",
        "Must-have vs nice-to-have is a negotiation, not a wish list. We use impact/effort mapping with stakeholders so cuts are explicit and agreed, not discovered in week ten.",
        "Integrations are scope multipliers. Every third-party API adds auth, error handling, and monitoring. Defer non-critical integrations behind a manual workflow first.",
        "Launch criteria include operational readiness: support channel, analytics events, and rollback plan, not just a feature checklist.",
      ],
    },
    fa: {
      title: "دامنه MVP: چک‌لیست قبل از نوشتن کد",
      excerpt: "چگونه به بنیان‌گذاران کمک می‌کنیم دامنه را بدون کم کردن ارزش ببُرند.",
      body: [
        "MVP باید یک فرض پرریسک را اثبات کند، نه نسخه کوچک هر فیچر آینده. فرضیه، معیار موفقیت و زمان‌بندی را قبل از شروع طراحی مستند می‌کنیم.",
        "باید-داشتنی در برابر ناز-باشدنی مذاکره است، نه لیست آرزو. نقشه impact/effort با ذی‌نفعان می‌سازیم تا برش‌ها شفاف و توافق‌شده باشند, نه کشف در هفته دهم.",
        "یکپارچه‌سازی‌ها ضریب دامنه‌اند. هر API ثالث auth، خطا و مانیتورینگ اضافه می‌کند. یکپارچه‌سازی غیرحیاتی را پشت گردش کار دستی به تعویق بیندازید.",
        "معیار لانچ شامل آمادگی عملیاتی است: کانال پشتیبانی، رویداد آنالیتیکس و برنامه rollback, نه فقط چک‌لیست فیچر.",
      ],
    },
  },
  {
    slug: "rtl-design-checklist",
    category: "design",
    publishedAt: "2025-12-05",
    readMinutes: 4,
    en: {
      title: "RTL UI Checklist for Persian and Arabic Products",
      excerpt: "Mirroring rules that go beyond flipping the layout.",
      body: [
        "Direction affects more than text alignment: icons with semantic direction (arrows, timelines, progress) must mirror; symmetric icons (close, search) must not.",
        "Numbers and Latin snippets often stay LTR inside RTL paragraphs, use unicode-bidi and isolated spans, not manual string hacks.",
        "Form labels and error messages need the same reading order as fields. Tab order must follow visual flow in RTL, not the DOM order from an LTR template.",
        "Test with real content length, Persian copy is often longer than English placeholders used in wireframes.",
      ],
    },
    fa: {
      title: "چک‌لیست UI راست‌به‌چپ برای محصولات فارسی و عربی",
      excerpt: "قوانین آینه‌سازی فراتر از برگرداندن layout.",
      body: [
        "جهت بیش از تراز متن اثر دارد: آیکون‌های جهت‌دار (فلش، تایم‌لاین، پیشرفت) باید آینه شوند؛ آیکون‌های متقارن (بستن، جستجو) نه.",
        "اعداد و تکه‌های لاتین اغلب LTR داخل پاراگراف RTL می‌مانند, از unicode-bidi و span ایزوله استفاده کنید، نه hack دستی رشته.",
        "برچسب و پیام خطای فرم باید همان ترتیب خواندن فیلد را داشته باشند. ترتیب Tab باید جریان بصری RTL را دنبال کند، نه ترتیب DOM قالب LTR.",
        "با محتوای واقعی تست کنید, متن فارسی اغلب از placeholder انگلیسی در وایرفریم بلندتر است.",
      ],
    },
  },
  {
    slug: "ecommerce-checkout-ux",
    category: "web",
    publishedAt: "2025-11-22",
    readMinutes: 6,
    en: {
      title: "Checkout UX Patterns That Reduce Cart Abandonment",
      excerpt: "Friction points we fix first on Iranian e-commerce rebuilds.",
      body: [
        "Guest checkout should be the default path, forced account creation before payment is still a top abandonment driver in local market audits.",
        "Show all-in pricing early: shipping estimate, VAT, and payment fees before the final step. Surprises on the last screen kill trust instantly.",
        "Payment method diversity matters: Zarinpal, card, wallet, and COD each need clear icons and failure recovery, retry without losing the cart.",
        "Mobile thumb zones: primary CTA full-width, sticky on scroll, with enough contrast in both light and dark themes.",
      ],
    },
    fa: {
      title: "الگوهای UX تسویه که رهاسازی سبد را کم می‌کنند",
      excerpt: "نقاط اصطکاکی که اول در بازطراحی فروشگاه‌های ایرانی رفع می‌کنیم.",
      body: [
        "تسویه مهمان باید مسیر پیش‌فرض باشد, اجبار ساخت حساب قبل از پرداخت هنوز از عوامل اصلی رهاسازی در ممیزی بازار محلی است.",
        "قیمت تمام‌شده را زود نشان دهید: برآورد ارسال، مالیات و کارمزد قبل از مرحله آخر. غافلگیری در صفحه آخر فوراً اعتماد را می‌کشد.",
        "تنوع روش پرداخت مهم است: زرین‌پال، کارت، کیف پول و COD هر کدام آیکون و بازیابی خطای واضح, تلاش مجدد بدون از دست دادن سبد.",
        "منطقه انگشت موبایل: CTA اصلی تمام‌عرض، چسبان در اسکرول، با کنتراست کافی در تم روشن و تاریک.",
      ],
    },
  },
  {
    slug: "technical-seo-audit",
    category: "seo",
    publishedAt: "2025-11-08",
    readMinutes: 7,
    en: {
      title: "Technical SEO Audit: The First 48 Hours",
      excerpt: "Our prioritized crawl of indexation, structure, and performance blockers.",
      body: [
        "Day one is crawlability: robots.txt, sitemap freshness, canonical tags, and hreflang for multilingual sites. Fix indexation before content strategy.",
        "URL architecture and internal linking determine how equity flows. Flatten deep product hierarchies and ensure every money page is within three clicks from home.",
        "Structured data validates in Rich Results Test, Article, Product, FAQ, and Organization schemas where they match real page content, not aspirational markup.",
        "Log file analysis (when available) reveals what Googlebot actually fetches vs what you think is important, often eye-opening for large catalogs.",
      ],
    },
    fa: {
      title: "ممیزی سئوی فنی: ۴۸ ساعت اول",
      excerpt: "خزش اولویت‌دار ما روی ایندکس، ساختار و مسدودکننده‌های عملکرد.",
      body: [
        "روز اول crawlability است: robots.txt، تازگی sitemap، canonical و hreflang برای سایت چندزبانه. قبل از استراتژی محتوا ایندکس را درست کنید.",
        "معماری URL و لینک‌دهی داخلی تعیین می‌کند equity چگونه جریان می‌یابد. سلسله‌مراتب عمیق محصول را صاف کنید و هر صفحه درآمدی در سه کلیک از خانه باشد.",
        "داده ساختاریافته در Rich Results Test اعتبارسنجی شود, Article، Product، FAQ و Organization جایی که با محتوای واقعی صفحه هم‌خوان است، نه markup آرزویی.",
        "تحلیل log file (در صورت دسترسی) نشان می‌دهد Googlebot واقعاً چه می‌خزد در برابر آنچه مهم می‌پندارید, برای کاتالوگ بزرگ اغلب چشمگیر است.",
      ],
    },
  },
  {
    slug: "laravel-api-patterns",
    category: "web",
    publishedAt: "2026-03-01",
    readMinutes: 6,
    tags: ["laravel", "api", "backend"],
    en: {
      title: "Laravel API Patterns for Production Apps",
      excerpt: "Form requests, resources, policies, and queue boundaries we use on every backend engagement.",
      body: [
        "A Laravel API is only as maintainable as its boundaries. We treat controllers as HTTP adapters, not business logic containers, every write path goes through a Form Request and a dedicated action or service.",
        "## Validation at the edge",
        "Form Requests enforce authorization and validation before a controller method runs. Nested array rules use dot notation; custom messages map to translation keys for bilingual clients.",
        "## Consistent JSON contracts",
        "API Resources shape outbound data, never return Eloquent models directly. Pagination uses a standard envelope: success, message, data, meta.",
        "## Authorization everywhere",
        "Policies gate model actions; middleware handles route-level permissions. Element-level checks belong in resources and form requests, not scattered in controllers.",
        "## Async by default for side effects",
        "Emails, webhooks, and heavy transforms go to queued jobs with explicit tries, backoff, and failed() logging, the request cycle stays fast and predictable.",
      ],
    },
    fa: {
      title: "الگوهای API لاراول برای اپ‌های پروداکشن",
      excerpt: "Form Request، Resource، Policy و مرز صف, آنچه در هر بک‌اند استفاده می‌کنیم.",
      body: [
        "API لارavel به اندازه مرزهایش قابل نگهداری است. کنترلر را آداپتور HTTP می‌دانیم، نه محفظه منطق, هر مسیر نوشتنی از Form Request و action یا service اختصاصی عبور می‌کند.",
        "## اعتبارسنجی در لبه",
        "Form Request مجوز و اعتبارسنجی را قبل از اجرای متد کنترلر enforce می‌کند. قوانین آرایه تو در تو با dot notation؛ پیام‌های سفارشی به کلید ترجمه برای کلاینت دوزبانه.",
        "## قرارداد JSON یکنواخت",
        "API Resource داده خروجی را shape می‌کند, هرگز مدل Eloquent مستقیم برنگردانید. صفحه‌بندی با پاکت استاندارد: success، message، data، meta.",
        "## مجوز در همه جا",
        "Policy عملیات مدل را gate می‌کند؛ middleware مجوز سطح route. بررسی سطح element در resource و form request، نه پراکنده در کنترلر.",
        "## async پیش‌فرض برای side effect",
        "ایمیل، webhook و transform سنگین به job صف با tries، backoff و لاگ failed(), چرخه درخواست سریع و قابل پیش‌بینی می‌ماند.",
      ],
    },
  },
  {
    slug: "swiftui-production-tips",
    category: "mobile",
    publishedAt: "2026-02-20",
    readMinutes: 5,
    tags: ["ios", "swiftui", "mobile"],
    en: {
      title: "SwiftUI in Production: What Survives App Store Review",
      excerpt: "Navigation, state, accessibility, and performance patterns from shipped iOS apps.",
      body: [
        "SwiftUI accelerates UI work, but production apps need explicit architecture. We standardize on MVVM with @Observable (or ObservableObject) view models injected via environment or factory.",
        "## Navigation that scales",
        "Typed navigation paths with NavigationStack, deep links and push payloads validated at the router, not in individual views.",
        "## Accessibility is not optional",
        "Every interactive control gets accessibilityLabel and accessibilityHint in both supported languages before TestFlight. VoiceOver order follows visual RTL/LTR flow.",
        "## Performance on real devices",
        "Profile with Instruments before claiming smooth lists. LazyVStack for long feeds, equatable view wrappers where diffing matters, and image downsampling for thumbnails.",
      ],
    },
    fa: {
      title: "SwiftUI در پروداکشن: آنچه App Store Review را رد می‌کند",
      excerpt: "ناوبری، state، دسترس‌پذیری و عملکرد, الگوها از اپ‌های iOS منتشرشده.",
      body: [
        "SwiftUI کار UI را سریع می‌کند، اما اپ پروداکشن به معماری صریح نیاز دارد. MVVM با view modelهای @Observable (یا ObservableObject) تزریق‌شده via environment یا factory.",
        "## ناوبری مقیاس‌پذیر",
        "مسیرهای ناوبری تایپ‌شده با NavigationStack, deep link و payload push در router اعتبارسنجی، نه در viewهای جدا.",
        "## دسترس‌پذیری اختیاری نیست",
        "هر کنترل تعاملی accessibilityLabel و Hint در هر دو زبان قبل از TestFlight. ترتیب VoiceOver جریان بصری RTL/LTR را دنبال می‌کند.",
        "## عملکرد روی دستگاه واقعی",
        "با Instruments پروفایل قبل از ادعای لیست روان. LazyVStack برای feed بلند، wrapper equatable جایی که diff مهم است، downsampling تصویر برای thumbnail.",
      ],
    },
  },
];

export const BLOG_SLUGS = BLOG_POSTS.map((p) => p.slug);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogCategorySlug): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.category === category);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];

  const sameCategory = BLOG_POSTS.filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const others = BLOG_POSTS.filter(
    (p) => p.slug !== slug && p.category !== current.category,
  );

  return [...sameCategory, ...others].slice(0, limit);
}

export function getSortedPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getFeaturedPosts(): BlogPost[] {
  return getSortedPosts().filter((p) => p.featured);
}

export function isBlogCategory(value: string): value is BlogCategorySlug {
  return (BLOG_CATEGORIES as readonly string[]).includes(value);
}

export function getAdjacentPosts(slug: string): {
  prev: BlogPost | null;
  next: BlogPost | null;
} {
  const sorted = getSortedPosts();
  const index = sorted.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index < sorted.length - 1 ? sorted[index + 1]! : null,
    next: index > 0 ? sorted[index - 1]! : null,
  };
}
