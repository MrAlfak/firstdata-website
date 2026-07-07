import type { Lang } from "./dictionaries";

export type EcommercePageUi = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    cta: string;
  };
  types: {
    eyebrow: string;
    title: string;
    cards: { icon: string; title: string; line1: string; line2: string }[];
  };
  compare: {
    eyebrow: string;
    title: string;
    templateTitle: string;
    templateItems: string[];
    customTitle: string;
    customItems: string[];
  };
  features: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  integrations: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  admin: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  process: {
    eyebrow: string;
    title: string;
    steps: string[];
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

export const ecommercePageDictionaries: Record<Lang, EcommercePageUi> = {
  fa: {
    hero: {
      eyebrow: "> بارگذاری /services/ecommerce...",
      title: "فروشگاه اینترنتی",
      lead: "فروشگاه شما باید فقط محصول نشان ندهد؛ باید بفروشد.",
      body: "از طراحی مسیر خرید تا درگاه پرداخت، مدیریت سفارش و پنل فروشنده — فروشگاه‌هایی می‌سازیم که سریع بارگذاری می‌شوند، اعتماد ایجاد می‌کنند و فرایند خرید را تا آخرین مرحله همراهی می‌کنند.",
      cta: "شروع پروژه فروشگاه",
    },
    types: {
      eyebrow: "// مدل فروش",
      title: "چه نوع فروشگاهی می‌خواهید؟",
      cards: [
        {
          icon: "🛍️",
          title: "فروشگاه خرده‌فروشی (B2C)",
          line1: "فروش مستقیم به مشتری نهایی با سبد خرید و پرداخت آنلاین.",
          line2: "مناسب برند، پوشاک، لوازم خانگی و محصولات فیزیکی.",
        },
        {
          icon: "🏢",
          title: "فروش سازمانی (B2B)",
          line1: "ثبت سفارش عمده، قیمت‌گذاری پلکانی و حساب کاربری سازمانی.",
          line2: "برای توزیع‌کنندگان و فروش به کسب‌وکارها.",
        },
        {
          icon: "📦",
          title: "محصولات دیجیتال",
          line1: "فروش فایل، دوره، لایسنس یا اشتراک با تحویل خودکار.",
          line2: "بدون نیاز به انبار و ارسال فیزیکی.",
        },
        {
          icon: "🔁",
          title: "اشتراک و فروش دوره‌ای",
          line1: "پرداخت ماهانه یا سالانه با تمدید خودکار.",
          line2: "برای سرویس‌ها، باشگاه مشتریان و SaaS.",
        },
      ],
    },
    compare: {
      eyebrow: "// مقایسه",
      title: "چرا فروشگاه اختصاصی؟",
      templateTitle: "قالب یا پلاگین آماده",
      templateItems: [
        "محدودیت در فرایند خرید",
        "کندی با افزایش محصولات",
        "سفارشی‌سازی سخت و گران",
        "وابستگی به افزونه‌های شخص ثالث",
      ],
      customTitle: "فروشگاه اختصاصی",
      customItems: [
        "مسیر خرید بهینه برای محصول شما",
        "مقیاس‌پذیر از ده تا ده‌هزار محصول",
        "پنل مدیریت متناسب با کسب‌وکار",
        "یکپارچه‌سازی دقیق با سیستم‌های شما",
      ],
    },
    features: {
      eyebrow: "// امکانات",
      title: "امکانات فروشگاه",
      items: [
        "صفحه محصول سئوپذیر",
        "سبد خرید و تسویه حساب",
        "درگاه پرداخت آنلاین",
        "مدیریت موجودی و انبار",
        "پیگیری سفارش",
        "کد تخفیف و کمپین",
        "فیلتر و جستجوی پیشرفته",
        "پنل مدیریت فروشنده",
        "گزارش فروش و آمار",
        "چندزبانه و چندارزی",
      ],
    },
    integrations: {
      eyebrow: "// یکپارچه‌سازی",
      title: "اتصال به سرویس‌های مورد نیاز",
      items: [
        "زرین‌پال و درگاه‌های پرداخت",
        "اسنپ‌پی و اقساط",
        "پست و پیک و حمل‌ونقل",
        "پیامک و اعلان سفارش",
        "CRM و باشگاه مشتریان",
        "حسابداری و فاکتور",
        "انبارداری و ERP",
        "Google Analytics و تگ منیجر",
      ],
    },
    admin: {
      eyebrow: "// پنل مدیریت",
      title: "مدیریت فروش بدون دردسر",
      items: [
        "افزودن و ویرایش محصول",
        "مدیریت دسته‌بندی و برچسب",
        "بررسی و تغییر وضعیت سفارش",
        "تعریف تخفیف و کد هدیه",
        "گزارش فروش روزانه و ماهانه",
        "مدیریت کاربران و نقش‌ها",
      ],
    },
    process: {
      eyebrow: "// فرآیند",
      title: "فرآیند راه‌اندازی فروشگاه",
      steps: [
        "تحلیل محصول و مدل فروش",
        "طراحی UI/UX فروشگاه",
        "توسعه فروشگاه و پنل",
        "اتصال درگاه و حمل‌ونقل",
        "تست خرید و پرداخت",
        "انتشار و آموزش تیم",
        "پشتیبانی و بهینه‌سازی",
      ],
    },
    support: {
      eyebrow: "// پس از راه‌اندازی",
      title: "فروش آنلاین با راه‌اندازی تمام نمی‌شود.",
      body: "به‌روزرسانی امنیتی، افزودن امکانات جدید، بهینه‌سازی نرخ تبدیل، پشتیبانی فنی و کمپین‌های فصلی بخشی از همراهی ماست. فروشگاه شما با رشد کسب‌وکارتان رشد می‌کند.",
    },
    faq: {
      eyebrow: "// سوالات متداول",
      title: "سوالات متداول",
      items: [
        {
          q: "راه‌اندازی فروشگاه چقدر زمان می‌برد؟",
          a: "فروشگاه استاندارد معمولاً ۶ تا ۱۰ هفته؛ فروشگاه‌های پیچیده‌تر با یکپارچه‌سازی انبار یا B2B ممکن است بیشتر طول بکشد. زمان دقیق پس از تحلیل نیاز اعلام می‌شود.",
        },
        {
          q: "کدام درگاه پرداخت پشتیبانی می‌شود؟",
          a: "زرین‌پال، زیبال، آیدی‌پی و درگاه‌های رایج ایران؛ در صورت نیاز Stripe برای فروش بین‌المللی. اتصال درگاه در scope پروژه تعریف می‌شود.",
        },
        {
          q: "آیا محصولات را خودمان اضافه می‌کنیم؟",
          a: "بله. پنل مدیریت برای افزودن محصول، قیمت، تصویر و موجودی در اختیار شماست. در صورت نیاز، بارگذاری اولیه انبوه هم انجام می‌دهیم.",
        },
        {
          q: "آیا برای موبایل هم بهینه است؟",
          a: "بله. طراحی موبایل‌فرست است و مسیر خرید روی گوشی به‌اندازه دسکتاپ روان پیاده می‌شود.",
        },
        {
          q: "هاست و دامنه را شما می‌دهید؟",
          a: "می‌توانیم استقرار و نگهداری سرور را بر عهده بگیریم یا روی زیرساخت خودتان deploy کنیم. هر دو مدل پشتیبانی می‌شود.",
        },
      ],
    },
  },
  en: {
    hero: {
      eyebrow: "> loading /services/ecommerce...",
      title: "Online Store",
      lead: "Your store should not just list products—it should sell.",
      body: "From checkout flow to payment gateway, order management, and seller panel—we build stores that load fast, build trust, and guide customers through every step of purchase.",
      cta: "Start store project",
    },
    types: {
      eyebrow: "// store model",
      title: "What type of store do you need?",
      cards: [
        {
          icon: "🛍️",
          title: "Retail store (B2C)",
          line1: "Direct sales to end customers with cart and online payment.",
          line2: "Ideal for brands, fashion, home goods, and physical products.",
        },
        {
          icon: "🏢",
          title: "Wholesale (B2B)",
          line1: "Bulk orders, tiered pricing, and business accounts.",
          line2: "For distributors and business-to-business sales.",
        },
        {
          icon: "📦",
          title: "Digital products",
          line1: "Sell files, courses, licenses, or subscriptions with instant delivery.",
          line2: "No warehouse or physical shipping required.",
        },
        {
          icon: "🔁",
          title: "Subscription & recurring",
          line1: "Monthly or yearly billing with auto-renewal.",
          line2: "For services, memberships, and SaaS products.",
        },
      ],
    },
    compare: {
      eyebrow: "// comparison",
      title: "Why a custom online store?",
      templateTitle: "Ready-made theme or plugin",
      templateItems: [
        "Limited checkout flows",
        "Slows down as catalog grows",
        "Hard and costly to customize",
        "Dependency on third-party plugins",
      ],
      customTitle: "Custom-built store",
      customItems: [
        "Checkout optimized for your products",
        "Scales from tens to tens of thousands of SKUs",
        "Admin panel matched to your operations",
        "Precise integration with your systems",
      ],
    },
    features: {
      eyebrow: "// features",
      title: "Store capabilities",
      items: [
        "SEO-ready product pages",
        "Cart & checkout",
        "Online payment gateway",
        "Inventory management",
        "Order tracking",
        "Coupons & campaigns",
        "Advanced filters & search",
        "Seller admin panel",
        "Sales reports & analytics",
        "Multilingual & multi-currency",
      ],
    },
    integrations: {
      eyebrow: "// integrations",
      title: "Connect the services you need",
      items: [
        "Zarinpal & payment gateways",
        "Installment providers",
        "Shipping & courier APIs",
        "SMS & order notifications",
        "CRM & loyalty programs",
        "Accounting & invoicing",
        "Warehouse & ERP",
        "Google Analytics & Tag Manager",
      ],
    },
    admin: {
      eyebrow: "// admin",
      title: "Run sales without friction",
      items: [
        "Add and edit products",
        "Manage categories & tags",
        "Review and update order status",
        "Create discounts & gift codes",
        "Daily and monthly sales reports",
        "User and role management",
      ],
    },
    process: {
      eyebrow: "// process",
      title: "Store launch process",
      steps: [
        "Product & sales model analysis",
        "Store UI/UX design",
        "Store & admin development",
        "Payment & shipping integration",
        "Purchase & payment testing",
        "Launch & team training",
        "Support & optimization",
      ],
    },
    support: {
      eyebrow: "// after launch",
      title: "Online sales do not end at launch.",
      body: "Security updates, new features, conversion optimization, technical support, and seasonal campaigns are part of our ongoing partnership. Your store grows with your business.",
    },
    faq: {
      eyebrow: "// faq",
      title: "Frequently asked questions",
      items: [
        {
          q: "How long does store setup take?",
          a: "A standard store usually takes 6–10 weeks; complex B2B or warehouse integrations may take longer. Exact timeline is confirmed after requirements analysis.",
        },
        {
          q: "Which payment gateways are supported?",
          a: "Zarinpal and common Iranian gateways; Stripe for international sales when needed. Gateway integration is defined in project scope.",
        },
        {
          q: "Can we add products ourselves?",
          a: "Yes. The admin panel lets you manage products, prices, images, and stock. Bulk initial import is available on request.",
        },
        {
          q: "Is it mobile-optimized?",
          a: "Yes. Mobile-first design with a checkout flow as smooth on phone as on desktop.",
        },
        {
          q: "Do you provide hosting and domain?",
          a: "We can manage deployment and hosting, or deploy on your infrastructure. Both models are supported.",
        },
      ],
    },
  },
};
