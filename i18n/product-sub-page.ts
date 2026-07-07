import type { Lang } from "./dictionaries";
import type { ProductSlug } from "./product-page";

export type ProductSubPageUi = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
  };
  useCases: {
    eyebrow: string;
    title: string;
    cards: { title: string; body: string }[];
  };
  features: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  stack: {
    eyebrow: string;
    title: string;
    tags: string[];
  };
  process: {
    eyebrow: string;
    title: string;
    steps: { title: string; body: string }[];
  };
  relatedService: {
    eyebrow: string;
    title: string;
    body: string;
    href: string;
    cta: string;
  };
  crossNav: {
    eyebrow: string;
    title: string;
    linkLabel: string;
  };
  pageCta: string;
};

export const productSubPageDictionaries: Record<Lang, Record<ProductSlug, ProductSubPageUi>> = {
  fa: {
    web: {
      hero: {
        eyebrow: "> بارگذاری /product/web...",
        title: "محصولات وب",
        lead: "وب‌اپ، CMS، پنل مدیریت، PWA و APIهایی که به رشد دیجیتال شما ستون فقرات می‌دهند.",
        body: "محصولات وب ما برای سازمان‌ها و کسب‌وکارهایی ساخته می‌شوند که به سرعت، سئو، تجربه کاربری روان و قابلیت توسعه مداوم نیاز دارند.",
      },
      useCases: {
        eyebrow: "// موارد استفاده",
        title: "وب برای چه مسئله‌هایی مناسب است؟",
        cards: [
          { title: "سایت و پورتال سازمانی", body: "برای معرفی، محتوا، جذب سرنخ و مدیریت تجربه برند." },
          { title: "CMS و اتاق انتشار", body: "برای تیم‌هایی که باید محتوا، صفحات و کمپین‌ها را مستقل مدیریت کنند." },
          { title: "پنل و داشبورد", body: "برای عملیات داخلی، گزارش‌گیری و نقش‌های مختلف کاربری." },
          { title: "PWA و تجربه همیشه‌در‌دسترس", body: "برای دسترسی سریع، cache هوشمند و استفاده نزدیک به اپ." },
        ],
      },
      features: {
        eyebrow: "// قابلیت‌ها",
        title: "ویژگی‌های رایج",
        items: [
          "CMS سفارشی و نقش‌بندی دسترسی",
          "پنل مدیریت و گزارش‌گیری",
          "APIهای داخلی و عمومی",
          "PWA، کش و عملکرد بهینه",
          "SEO فنی، ساختار URL و اسکیما",
          "فرم‌ها، اعلان‌ها و اتصال به CRM",
        ],
      },
      stack: {
        eyebrow: "// فناوری",
        title: "استک رایج",
        tags: ["Next.js", "React", "Tailwind CSS", "TypeScript", "PWA", "REST API"],
      },
      process: {
        eyebrow: "// فرآیند تحویل",
        title: "از ایده تا لانچ",
        steps: [
          { title: "تحلیل نیاز", body: "محتوا، کاربران، نقش‌ها و جریان‌های کلیدی را مشخص می‌کنیم." },
          { title: "طراحی تجربه", body: "ساختار صفحه، ناوبری، UI و معماری محتوا را شکل می‌دهیم." },
          { title: "پیاده‌سازی و اتصال", body: "فرانت‌اند، CMS، API و پنل مدیریت را به‌صورت مرحله‌ای می‌سازیم." },
          { title: "انتشار و بهینه‌سازی", body: "پس از launch، عملکرد، سئو و رفتار کاربران را بررسی و بهبود می‌دهیم." },
        ],
      },
      relatedService: {
        eyebrow: "// خدمت مرتبط",
        title: "طراحی وب‌سایت و تجربه وب",
        body: "اگر در مرحله انتخاب سرویس هستید، از صفحه خدمات وب شروع کنید تا مدل همکاری و دامنه تحویل را ببینید.",
        href: "/services/web-design",
        cta: "مشاهده خدمت",
      },
      crossNav: {
        eyebrow: "// سایر محصولات",
        title: "دسته‌های دیگر محصول",
        linkLabel: "مشاهده",
      },
      pageCta: "درخواست محصول وب",
    },
    mobile: {
      hero: {
        eyebrow: "> بارگذاری /product/mobile...",
        title: "محصولات موبایل",
        lead: "اپلیکیشن‌های Android و iOS برای سناریوهایی که سرعت دسترسی، آفلاین‌بودن و اعلان اهمیت دارد.",
        body: "محصولات موبایل ما برای سرویس میدانی، فروش، عملیات داخلی، تعامل مشتری و سناریوهایی ساخته می‌شوند که استفاده روزمره و همراه اولویت اصلی است.",
      },
      useCases: {
        eyebrow: "// موارد استفاده",
        title: "موبایل کجا بیشترین ارزش را ایجاد می‌کند؟",
        cards: [
          { title: "اپ مشتری", body: "برای سفارش، پیگیری، اعلان و تعامل مداوم با برند." },
          { title: "اپ عملیات میدانی", body: "برای تیم‌هایی که بیرون از دفتر کار می‌کنند و به آفلاین‌بودن نیاز دارند." },
          { title: "ابزار فروش و توزیع", body: "برای ثبت سفارش، موجودی، ویزیت و هماهنگی روزانه." },
          { title: "اپ داخلی سازمان", body: "برای تأییدها، تیکت‌ها، گزارش‌ها و دسترسی سریع کارکنان." },
        ],
      },
      features: {
        eyebrow: "// قابلیت‌ها",
        title: "ویژگی‌های رایج",
        items: [
          "پشتیبانی Android و iOS",
          "ذخیره‌سازی محلی و workflow آفلاین",
          "اعلان push و پیام‌های درون‌برنامه",
          "احراز هویت و session امن",
          "اتصال به API و همگام‌سازی",
          "انتشار و نگهداری در استورها",
        ],
      },
      stack: {
        eyebrow: "// فناوری",
        title: "استک رایج",
        tags: ["Kotlin", "Swift", "Flutter", "Push Notifications", "Offline Sync", "REST API"],
      },
      process: {
        eyebrow: "// فرآیند تحویل",
        title: "از سناریو تا انتشار",
        steps: [
          { title: "تعریف سناریو", body: "کاربران، محدودیت شبکه، اعلان‌ها و جریان‌های روزانه را تحلیل می‌کنیم." },
          { title: "طراحی تجربه همراه", body: "UI بومی، navigation و رفتارهای مناسب موبایل طراحی می‌شود." },
          { title: "توسعه و تست", body: "قابلیت‌ها، sync، اعلان و سناریوهای واقعی روی دستگاه بررسی می‌شوند." },
          { title: "انتشار و iteration", body: "استورها، analytics و نسخه‌های بعدی به‌صورت برنامه‌ریزی‌شده مدیریت می‌شوند." },
        ],
      },
      relatedService: {
        eyebrow: "// خدمت مرتبط",
        title: "خدمات اپلیکیشن موبایل",
        body: "اگر می‌خواهید بین Android، iOS یا رویکرد cross-platform تصمیم بگیرید، از صفحه خدمات موبایل شروع کنید.",
        href: "/services/android",
        cta: "مشاهده خدمت",
      },
      crossNav: {
        eyebrow: "// سایر محصولات",
        title: "دسته‌های دیگر محصول",
        linkLabel: "مشاهده",
      },
      pageCta: "درخواست محصول موبایل",
    },
    windows: {
      hero: {
        eyebrow: "> بارگذاری /product/windows...",
        title: "محصولات ویندوز",
        lead: "نرم‌افزارهای LOB، ابزارهای داخلی، MSI و مسیرهای update کنترل‌شده برای تیم‌های عملیاتی.",
        body: "محصولات ویندوز ما برای محیط‌هایی مناسب‌اند که هنوز دسکتاپ نقش کلیدی در عملیات، پردازش محلی، چاپ، سخت‌افزار جانبی یا performance داخلی دارد.",
      },
      useCases: {
        eyebrow: "// موارد استفاده",
        title: "ویندوز برای چه سناریوهایی مناسب است؟",
        cards: [
          { title: "ابزارهای خط کسب‌وکار", body: "برای تیم‌های فروش، انبار، حسابداری و عملیات روزمره." },
          { title: "کار با سخت‌افزار جانبی", body: "برای چاپ، بارکد، اسکنر، کارت‌خوان و تجهیزات محلی." },
          { title: "پردازش آفلاین یا محلی", body: "برای محیط‌هایی که latency پایین یا اتصال محدود مهم است." },
          { title: "استقرار سازمانی", body: "برای rollout کنترل‌شده، MSI و به‌روزرسانی قابل مدیریت." },
        ],
      },
      features: {
        eyebrow: "// قابلیت‌ها",
        title: "ویژگی‌های رایج",
        items: [
          "رابط دسکتاپ برای نقش‌های عملیاتی",
          "MSI و استقرار کنترل‌شده",
          "auto-update و version management",
          "اتصال به API، دیتابیس یا queue",
          "گزارش‌گیری، export و چاپ",
          "مدیریت مجوز و دسترسی محلی",
        ],
      },
      stack: {
        eyebrow: "// فناوری",
        title: "استک رایج",
        tags: [".NET", "WPF", "Electron", "C#", "MSI", "Auto Update"],
      },
      process: {
        eyebrow: "// فرآیند تحویل",
        title: "از عملیات تا rollout",
        steps: [
          { title: "شناخت محیط اجرا", body: "دستگاه‌ها، کاربران، محدودیت‌های شبکه و تجهیزات جانبی را بررسی می‌کنیم." },
          { title: "طراحی جریان‌های محلی", body: "فرم‌ها، پردازش‌ها و مسیرهای خطا برای استفاده روزانه طراحی می‌شوند." },
          { title: "ساخت و سخت‌سازی", body: "نرم‌افزار، installer، logging و update path با نیاز عملیاتی هماهنگ می‌شود." },
          { title: "آماده‌سازی استقرار", body: "مستندات rollout، پشتیبانی و نسخه‌های بعدی برای تیم داخلی آماده می‌شود." },
        ],
      },
      relatedService: {
        eyebrow: "// خدمت مرتبط",
        title: "خدمات مشاوره و تحلیل پیاده‌سازی",
        body: "برای تصمیم بین دسکتاپ، وب یا مدل hybrid، صفحه مشاوره بهترین نقطه شروع است.",
        href: "/services/consulting",
        cta: "مشاهده خدمت",
      },
      crossNav: {
        eyebrow: "// سایر محصولات",
        title: "دسته‌های دیگر محصول",
        linkLabel: "مشاهده",
      },
      pageCta: "درخواست محصول ویندوز",
    },
    ai: {
      hero: {
        eyebrow: "> بارگذاری /product/ai...",
        title: "محصولات هوش مصنوعی",
        lead: "LLM، RAG و اتوماسیون برای کاهش کار تکراری، افزایش دقت و سریع‌ترشدن تصمیم‌ها.",
        body: "محصولات AI ما با رویکرد privacy-first طراحی می‌شوند تا استفاده از مدل‌های زبانی، جستجوی هوشمند و جریان‌های نیمه‌خودکار با داده و سیاست‌های شما هم‌راستا باشد.",
      },
      useCases: {
        eyebrow: "// موارد استفاده",
        title: "AI کجا بیشترین اثر را می‌گذارد؟",
        cards: [
          { title: "جستجوی دانش و RAG", body: "برای بازیابی سریع اطلاعات از اسناد، FAQها و پایگاه‌های دانش داخلی." },
          { title: "اتوماسیون فرایند", body: "برای خلاصه‌سازی، دسته‌بندی، پاسخ‌نویسی و حذف کارهای تکراری." },
          { title: "دستیار داخلی تیم", body: "برای پشتیبانی از فروش، عملیات، پشتیبانی یا مدیریت محتوا." },
          { title: "تصمیم‌یار", body: "برای ارائه پیشنهاد، تحلیل اولیه یا هدایت کاربر در سناریوهای پیچیده." },
        ],
      },
      features: {
        eyebrow: "// قابلیت‌ها",
        title: "ویژگی‌های رایج",
        items: [
          "اتصال به مدل‌های LLM و workflowهای سفارشی",
          "RAG و جستجوی مبتنی بر اسناد",
          "قوانین دسترسی و privacy-first design",
          "لاگ‌گیری، ارزیابی و کنترل کیفیت خروجی",
          "اتصال به CRM، helpdesk یا CMS",
          "اتوماسیون با human-in-the-loop",
        ],
      },
      stack: {
        eyebrow: "// فناوری",
        title: "استک رایج",
        tags: ["LLM", "RAG", "Embeddings", "Automation", "Privacy-first", "APIs"],
      },
      process: {
        eyebrow: "// فرآیند تحویل",
        title: "از use case تا deployment",
        steps: [
          { title: "انتخاب use case", body: "ابتدا مشخص می‌کنیم AI دقیقاً کدام اصطکاک را باید کم کند." },
          { title: "آماده‌سازی دانش و سیاست‌ها", body: "منابع داده، مجوزها، tone و محدودیت‌های پاسخ تنظیم می‌شود." },
          { title: "پیاده‌سازی و ارزیابی", body: "نمونه اولیه با سناریوهای واقعی تست و quality آن سنجیده می‌شود." },
          { title: "استقرار و نظارت", body: "خروجی، هزینه، accuracy و privacy به‌صورت مستمر پایش می‌شود." },
        ],
      },
      relatedService: {
        eyebrow: "// خدمت مرتبط",
        title: "خدمات مشاوره و تحلیل پروژه",
        body: "اگر هنوز use case مناسب AI را مشخص نکرده‌اید، از صفحه مشاوره برای تعریف دامنه و ریسک‌ها شروع کنید.",
        href: "/services/consulting",
        cta: "مشاهده خدمت",
      },
      crossNav: {
        eyebrow: "// سایر محصولات",
        title: "دسته‌های دیگر محصول",
        linkLabel: "مشاهده",
      },
      pageCta: "درخواست محصول AI",
    },
    platforms: {
      hero: {
        eyebrow: "> بارگذاری /product/platforms...",
        title: "پلتفرم‌های یکپارچه",
        lead: "وقتی چند سیستم، چند تیم و چند کانال باید مثل یک محصول واحد عمل کنند.",
        body: "پلتفرم‌های یکپارچه برای سازمان‌هایی مناسب‌اند که می‌خواهند احراز هویت، APIها، داده و جریان‌های چندکاناله را در معماری ماژولار و قابل رشد هماهنگ کنند.",
      },
      useCases: {
        eyebrow: "// موارد استفاده",
        title: "پلتفرم یکپارچه در چه موقعیت‌هایی لازم می‌شود؟",
        cards: [
          { title: "SSO و هویت مشترک", body: "وقتی چند سامانه باید با یک مدل هویت و دسترسی کار کنند." },
          { title: "API واحد برای چند کانال", body: "وقتی وب، موبایل، پنل و ابزار داخلی باید روی منطق مشترک تکیه کنند." },
          { title: "چند سامانه، یک تجربه", body: "وقتی legacy و سیستم‌های جدید باید پشت یک لایه منسجم قرار بگیرند." },
          { title: "رشد مرحله‌ای محصول", body: "وقتی سازمان می‌خواهد بدون بازنویسی کامل، قابلیت‌های جدید اضافه کند." },
        ],
      },
      features: {
        eyebrow: "// قابلیت‌ها",
        title: "ویژگی‌های رایج",
        items: [
          "SSO و مدیریت دسترسی متمرکز",
          "Unified APIs و orchestration سرویس‌ها",
          "معماری ماژولار و قابل توسعه",
          "اتصال به سامانه‌های legacy و جدید",
          "چندکاناله: وب، موبایل، پنل و عملیات",
          "مانیتورینگ، logging و governance فنی",
        ],
      },
      stack: {
        eyebrow: "// فناوری",
        title: "استک رایج",
        tags: ["SSO", "Unified APIs", "Modular Architecture", "Queues", "Webhooks", "Multi-channel"],
      },
      process: {
        eyebrow: "// فرآیند تحویل",
        title: "از پراکندگی به انسجام",
        steps: [
          { title: "نقشه‌برداری سیستم‌ها", body: "سامانه‌ها، کاربران، وابستگی‌ها و نقاط شکست را شناسایی می‌کنیم." },
          { title: "طراحی هسته پلتفرم", body: "هویت، API، event flow و مرز ماژول‌ها تعریف می‌شود." },
          { title: "پیاده‌سازی مرحله‌ای", body: "سیستم‌ها به‌تدریج به هسته جدید متصل می‌شوند تا ریسک migration کم بماند." },
          { title: "پایش و گسترش", body: "پس از تثبیت، قابلیت‌های جدید و کانال‌های بیشتر روی همان ستون فقرات اضافه می‌شوند." },
        ],
      },
      relatedService: {
        eyebrow: "// خدمت مرتبط",
        title: "خدمات مشاوره و تحلیل معماری",
        body: "برای شروع معماری پلتفرم، یک مرحله تحلیل و نقشه‌برداری سیستم‌ها معمولاً بهترین نقطه آغاز است.",
        href: "/services/consulting",
        cta: "مشاهده خدمت",
      },
      crossNav: {
        eyebrow: "// سایر محصولات",
        title: "دسته‌های دیگر محصول",
        linkLabel: "مشاهده",
      },
      pageCta: "درخواست پلتفرم یکپارچه",
    },
  },
  en: {
    web: {
      hero: {
        eyebrow: "> loading /product/web...",
        title: "Web Products",
        lead: "Web apps, CMS, admin panels, PWAs, and APIs that become the backbone of your digital growth.",
        body: "Our web products are built for organizations and businesses that need speed, SEO, smooth user experience, and room for continuous evolution.",
      },
      useCases: {
        eyebrow: "// use cases",
        title: "Where web products fit best",
        cards: [
          { title: "Sites and organizational portals", body: "For brand presence, content, lead capture, and managed user journeys." },
          { title: "CMS and publishing rooms", body: "For teams that need to manage pages, content, and campaigns independently." },
          { title: "Panels and dashboards", body: "For internal operations, reporting, and role-based workflows." },
          { title: "PWA and always-available experiences", body: "For fast access, smart caching, and app-like usage on the web." },
        ],
      },
      features: {
        eyebrow: "// features",
        title: "Common capabilities",
        items: [
          "Custom CMS and role-based access",
          "Admin panels and reporting",
          "Internal and public APIs",
          "PWA, caching, and performance optimization",
          "Technical SEO, URL structure, and schema",
          "Forms, notifications, and CRM integration",
        ],
      },
      stack: {
        eyebrow: "// technology",
        title: "Typical stack",
        tags: ["Next.js", "React", "Tailwind CSS", "TypeScript", "PWA", "REST API"],
      },
      process: {
        eyebrow: "// delivery process",
        title: "From idea to launch",
        steps: [
          { title: "Need analysis", body: "We define content, users, roles, and the product’s key flows." },
          { title: "Experience design", body: "We shape page structure, navigation, UI, and content architecture." },
          { title: "Implementation and integration", body: "Frontend, CMS, APIs, and admin surfaces are shipped in stages." },
          { title: "Launch and optimization", body: "After launch, we review performance, SEO, and user behavior for refinement." },
        ],
      },
      relatedService: {
        eyebrow: "// related service",
        title: "Website design and web experience",
        body: "If you are still at the service-selection stage, start with the web service page to review collaboration scope.",
        href: "/services/web-design",
        cta: "View service",
      },
      crossNav: {
        eyebrow: "// other products",
        title: "Explore other product categories",
        linkLabel: "View",
      },
      pageCta: "Request a web product",
    },
    mobile: {
      hero: {
        eyebrow: "> loading /product/mobile...",
        title: "Mobile Products",
        lead: "Android and iOS apps for scenarios where fast access, offline work, and notifications matter.",
        body: "Our mobile products are designed for field service, sales, internal operations, customer engagement, and daily-use scenarios where a handheld experience comes first.",
      },
      useCases: {
        eyebrow: "// use cases",
        title: "Where mobile creates the most value",
        cards: [
          { title: "Customer apps", body: "For ordering, tracking, notifications, and ongoing brand engagement." },
          { title: "Field operations apps", body: "For teams working outside the office who need offline reliability." },
          { title: "Sales and distribution tools", body: "For order capture, stock visibility, visits, and daily coordination." },
          { title: "Internal workforce apps", body: "For approvals, tickets, reports, and fast employee access." },
        ],
      },
      features: {
        eyebrow: "// features",
        title: "Common capabilities",
        items: [
          "Android and iOS support",
          "Local storage and offline workflows",
          "Push notifications and in-app messaging",
          "Secure authentication and sessions",
          "API connectivity and synchronization",
          "Store release and maintenance support",
        ],
      },
      stack: {
        eyebrow: "// technology",
        title: "Typical stack",
        tags: ["Kotlin", "Swift", "Flutter", "Push Notifications", "Offline Sync", "REST API"],
      },
      process: {
        eyebrow: "// delivery process",
        title: "From scenario to release",
        steps: [
          { title: "Scenario definition", body: "We analyze users, network limits, notifications, and daily usage flows." },
          { title: "Mobile-first experience design", body: "Native-feeling UI, navigation, and handset behaviors are shaped first." },
          { title: "Development and testing", body: "Capabilities, sync, notifications, and real-device scenarios are validated." },
          { title: "Release and iteration", body: "Stores, analytics, and follow-up releases are managed in a planned cadence." },
        ],
      },
      relatedService: {
        eyebrow: "// related service",
        title: "Mobile app services",
        body: "If you are choosing between Android, iOS, or cross-platform directions, start from our mobile services view.",
        href: "/services/android",
        cta: "View service",
      },
      crossNav: {
        eyebrow: "// other products",
        title: "Explore other product categories",
        linkLabel: "View",
      },
      pageCta: "Request a mobile product",
    },
    windows: {
      hero: {
        eyebrow: "> loading /product/windows...",
        title: "Windows Products",
        lead: "LOB software, internal tools, MSI delivery, and controlled update paths for operational teams.",
        body: "Our Windows products fit environments where desktop software still plays a critical role in operations, local processing, printing, peripheral devices, or internal performance needs.",
      },
      useCases: {
        eyebrow: "// use cases",
        title: "Where Windows products fit best",
        cards: [
          { title: "Line-of-business tools", body: "For sales, warehouse, accounting, and day-to-day operational teams." },
          { title: "Peripheral-heavy workflows", body: "For printing, barcode, scanner, payment, and local device interaction." },
          { title: "Offline or local processing", body: "For low-latency or limited-connectivity environments." },
          { title: "Organizational rollout", body: "For managed distribution, MSI packaging, and controlled updates." },
        ],
      },
      features: {
        eyebrow: "// features",
        title: "Common capabilities",
        items: [
          "Desktop UI for operational roles",
          "MSI packaging and controlled rollout",
          "Auto-update and version management",
          "API, database, or queue integration",
          "Reporting, export, and printing",
          "Local authorization and access rules",
        ],
      },
      stack: {
        eyebrow: "// technology",
        title: "Typical stack",
        tags: [".NET", "WPF", "Electron", "C#", "MSI", "Auto Update"],
      },
      process: {
        eyebrow: "// delivery process",
        title: "From operations to rollout",
        steps: [
          { title: "Runtime environment review", body: "We assess devices, users, network limits, and peripheral dependencies." },
          { title: "Local flow design", body: "Daily forms, processing paths, and error handling are shaped for real use." },
          { title: "Build and hardening", body: "Software, installer, logging, and update paths are aligned with operational needs." },
          { title: "Deployment readiness", body: "Rollout documentation, support, and future version handling are prepared for the internal team." },
        ],
      },
      relatedService: {
        eyebrow: "// related service",
        title: "Consulting and implementation analysis",
        body: "If you are deciding between desktop, web, or a hybrid model, our consulting page is the best starting point.",
        href: "/services/consulting",
        cta: "View service",
      },
      crossNav: {
        eyebrow: "// other products",
        title: "Explore other product categories",
        linkLabel: "View",
      },
      pageCta: "Request a Windows product",
    },
    ai: {
      hero: {
        eyebrow: "> loading /product/ai...",
        title: "AI Products",
        lead: "LLM integration, RAG, and automation to reduce repetitive work, improve accuracy, and speed up decisions.",
        body: "Our AI products are shaped with a privacy-first mindset so language models, intelligent search, and semi-automated flows remain aligned with your data boundaries and operational policies.",
      },
      useCases: {
        eyebrow: "// use cases",
        title: "Where AI delivers the most impact",
        cards: [
          { title: "Knowledge search and RAG", body: "For fast retrieval from documents, FAQs, and internal knowledge bases." },
          { title: "Process automation", body: "For summarization, classification, response drafting, and repetitive-task reduction." },
          { title: "Internal team assistants", body: "For supporting sales, operations, support, or content management teams." },
          { title: "Decision support", body: "For suggestions, initial analysis, or user guidance in complex workflows." },
        ],
      },
      features: {
        eyebrow: "// features",
        title: "Common capabilities",
        items: [
          "LLM integration and custom workflows",
          "RAG and document-grounded search",
          "Access policies and privacy-first design",
          "Logging, evaluation, and output quality control",
          "CRM, helpdesk, or CMS integrations",
          "Human-in-the-loop automation",
        ],
      },
      stack: {
        eyebrow: "// technology",
        title: "Typical stack",
        tags: ["LLM", "RAG", "Embeddings", "Automation", "Privacy-first", "APIs"],
      },
      process: {
        eyebrow: "// delivery process",
        title: "From use case to deployment",
        steps: [
          { title: "Use case selection", body: "We first define which friction AI should actually reduce." },
          { title: "Knowledge and policy preparation", body: "Data sources, permissions, tone, and answer limits are prepared." },
          { title: "Implementation and evaluation", body: "A prototype is tested against real scenarios and measured for quality." },
          { title: "Deployment and monitoring", body: "Output quality, cost, accuracy, and privacy are monitored continuously." },
        ],
      },
      relatedService: {
        eyebrow: "// related service",
        title: "Consulting and project analysis",
        body: "If the right AI use case is not fully defined yet, start with consulting to shape scope and risk clearly.",
        href: "/services/consulting",
        cta: "View service",
      },
      crossNav: {
        eyebrow: "// other products",
        title: "Explore other product categories",
        linkLabel: "View",
      },
      pageCta: "Request an AI product",
    },
    platforms: {
      hero: {
        eyebrow: "> loading /product/platforms...",
        title: "Integrated Platforms",
        lead: "When multiple systems, teams, and channels need to behave like one coherent product.",
        body: "Integrated platforms are right for organizations that want to align identity, APIs, data, and multi-channel workflows inside a modular architecture that can grow without full rewrites.",
      },
      useCases: {
        eyebrow: "// use cases",
        title: "When an integrated platform becomes necessary",
        cards: [
          { title: "Shared identity and SSO", body: "When multiple systems must work through one access and authentication model." },
          { title: "Unified APIs for many channels", body: "When web, mobile, admin, and internal tools should rely on the same core logic." },
          { title: "Many systems, one experience", body: "When legacy and newer systems need a coherent layer in front of them." },
          { title: "Staged product growth", body: "When the organization needs to add capability without a complete rewrite." },
        ],
      },
      features: {
        eyebrow: "// features",
        title: "Common capabilities",
        items: [
          "SSO and centralized access management",
          "Unified APIs and service orchestration",
          "Modular, extensible architecture",
          "Legacy and modern system integration",
          "Multi-channel support across web, mobile, admin, and ops",
          "Monitoring, logging, and technical governance",
        ],
      },
      stack: {
        eyebrow: "// technology",
        title: "Typical stack",
        tags: ["SSO", "Unified APIs", "Modular Architecture", "Queues", "Webhooks", "Multi-channel"],
      },
      process: {
        eyebrow: "// delivery process",
        title: "From fragmentation to coherence",
        steps: [
          { title: "System mapping", body: "We identify systems, users, dependencies, and points of failure." },
          { title: "Platform core design", body: "Identity, APIs, event flows, and module boundaries are defined." },
          { title: "Staged implementation", body: "Systems are connected gradually so migration risk stays manageable." },
          { title: "Monitoring and expansion", body: "Once stable, new capabilities and channels are added on the same backbone." },
        ],
      },
      relatedService: {
        eyebrow: "// related service",
        title: "Consulting for architecture planning",
        body: "A platform initiative usually starts best with analysis and system mapping before major implementation begins.",
        href: "/services/consulting",
        cta: "View service",
      },
      crossNav: {
        eyebrow: "// other products",
        title: "Explore other product categories",
        linkLabel: "View",
      },
      pageCta: "Request an integrated platform",
    },
  },
};
