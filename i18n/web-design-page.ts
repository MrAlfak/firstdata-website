import type { Lang } from "./dictionaries";

export type WebDesignPageUi = {
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
  process: {
    eyebrow: string;
    title: string;
    steps: string[];
  };
  tech: {
    eyebrow: string;
    title: string;
    items: string[];
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

export const webDesignPageDictionaries: Record<Lang, WebDesignPageUi> = {
  fa: {
    hero: {
      eyebrow: "> بارگذاری /services/web-design...",
      title: "طراحی وب‌سایت",
      lead: "وب‌سایت شما، اولین تجربه‌ای است که کاربران از برندتان خواهند داشت.",
      body: "از صفحات معرفی ساده تا فروشگاه‌های اینترنتی و سامانه‌های اختصاصی، وب‌سایت‌هایی طراحی می‌کنیم که سریع، امن، قابل توسعه و متناسب با نیاز واقعی شما باشند.",
      cta: "ثبت درخواست پروژه",
    },
    types: {
      eyebrow: "// نوع پروژه",
      title: "چه وب‌سایتی نیاز دارید؟",
      cards: [
        {
          icon: "🌐",
          title: "سایت شرکتی",
          line1: "معرفی برند، خدمات و تماس با مشتری.",
          line2: "مناسب کسب‌وکارهایی که می‌خواهند آنلاین دیده شوند.",
        },
        {
          icon: "🛒",
          title: "فروشگاه اینترنتی",
          line1: "فروش محصول با درگاه پرداخت و مدیریت سفارش.",
          line2: "از فروشگاه کوچک تا کاتالوگ بزرگ با مقیاس‌پذیری.",
        },
        {
          icon: "📚",
          title: "سایت آموزشی",
          line1: "دوره‌ها، محتوا و پنل دانشجو یا مدرس.",
          line2: "ساختار مناسب برای آموزش آنلاین و عضویت.",
        },
        {
          icon: "⚙️",
          title: "سامانه اختصاصی",
          line1: "پنل مدیریت، فرایندها و گزارش‌گیری سفارشی.",
          line2: "وقتی قالب آماده جواب نمی‌دهد.",
        },
      ],
    },
    compare: {
      eyebrow: "// مقایسه",
      title: "چرا وب‌سایت اختصاصی؟",
      templateTitle: "قالب آماده",
      templateItems: [
        "محدودیت امکانات",
        "سرعت پایین",
        "امنیت کمتر",
        "توسعه سخت",
      ],
      customTitle: "توسعه اختصاصی",
      customItems: [
        "طراحی متناسب با نیاز",
        "سرعت بالا",
        "امنیت بیشتر",
        "قابلیت توسعه",
      ],
    },
    features: {
      eyebrow: "// امکانات",
      title: "امکاناتی که ارائه می‌دهیم",
      items: [
        "طراحی اختصاصی",
        "ریسپانسیو",
        "پنل مدیریت",
        "سئو تکنیکال",
        "امنیت",
        "اتصال به درگاه پرداخت",
        "چندزبانه",
        "API",
        "اتصال به CRM",
        "بهینه‌سازی سرعت",
      ],
    },
    process: {
      eyebrow: "// فرآیند",
      title: "فرآیند توسعه",
      steps: [
        "تحلیل نیاز",
        "طراحی UI/UX",
        "توسعه Front-end",
        "توسعه Back-end",
        "تست",
        "انتشار",
        "پشتیبانی",
      ],
    },
    tech: {
      eyebrow: "// فناوری",
      title: "فناوری‌هایی که استفاده می‌کنیم",
      items: [
        "React",
        "Next.js",
        "Laravel",
        "Node.js",
        "ASP.NET",
        "PHP",
        "MySQL",
        "PostgreSQL",
        "Docker",
      ],
    },
    support: {
      eyebrow: "// پس از تحویل",
      title: "وب‌سایت شما بعد از تحویل رها نمی‌شود.",
      body: "انتشار وب‌سایت پایان پروژه نیست. بروزرسانی، امنیت، مانیتورینگ، رفع اشکال و توسعه امکانات جدید بخشی از خدماتی است که بعد از تحویل نیز ادامه دارد.",
    },
    faq: {
      eyebrow: "// سوالات متداول",
      title: "سوالات متداول",
      items: [
        {
          q: "وب‌سایت چقدر زمان می‌برد؟",
          a: "سایت شرکتی معمولاً ۳ تا ۶ هفته؛ فروشگاه یا سامانه اختصاصی بسته به امکانات ۸ تا ۱۶ هفته. پس از تحلیل نیاز، زمان دقیق اعلام می‌شود.",
        },
        {
          q: "هزینه چطور محاسبه می‌شود؟",
          a: "بر اساس نوع پروژه، تعداد صفحات، امکانات و یکپارچه‌سازی‌ها. پس از جلسه مشاوره، پیشنهاد قیمت شفاف و مرحله‌بندی‌شده ارسال می‌کنیم.",
        },
        {
          q: "پنل مدیریت دارد؟",
          a: "بله. برای به‌روزرسانی محتوا، محصولات، سفارش‌ها یا مدیریت کاربران پنل اختصاصی یا CMS مناسب پروژه شما طراحی می‌شود.",
        },
        {
          q: "بعداً قابل توسعه است؟",
          a: "بله. معماری ما برای رشد طراحی می‌شود؛ می‌توانید بعداً فروشگاه، پنل، API یا اپ موبایل اضافه کنید.",
        },
        {
          q: "هاست هم ارائه می‌کنید؟",
          a: "می‌توانیم سرور، دامنه و استقرار را مدیریت کنیم یا روی زیرساخت خودتان deploy کنیم. هر دو مدل پشتیبانی می‌شود.",
        },
      ],
    },
  },
  en: {
    hero: {
      eyebrow: "> loading /services/web-design...",
      title: "Website Design",
      lead: "Your website is the first experience users have with your brand.",
      body: "From simple company pages to online stores and custom platforms, we build websites that are fast, secure, scalable, and matched to your real needs.",
      cta: "Submit a project request",
    },
    types: {
      eyebrow: "// project type",
      title: "What kind of website do you need?",
      cards: [
        {
          icon: "🌐",
          title: "Corporate site",
          line1: "Brand intro, services, and contact with customers.",
          line2: "For businesses that need a professional online presence.",
        },
        {
          icon: "🛒",
          title: "Online store",
          line1: "Sell products with payment gateway and order management.",
          line2: "From small shops to large catalogs that scale.",
        },
        {
          icon: "📚",
          title: "Education site",
          line1: "Courses, content, and student or instructor panels.",
          line2: "Built for online learning and memberships.",
        },
        {
          icon: "⚙️",
          title: "Custom platform",
          line1: "Admin panel, workflows, and custom reporting.",
          line2: "When off-the-shelf templates are not enough.",
        },
      ],
    },
    compare: {
      eyebrow: "// comparison",
      title: "Why a custom website?",
      templateTitle: "Ready-made template",
      templateItems: [
        "Limited features",
        "Slower performance",
        "Weaker security",
        "Hard to extend",
      ],
      customTitle: "Custom development",
      customItems: [
        "Design matched to your needs",
        "High performance",
        "Stronger security",
        "Built to grow",
      ],
    },
    features: {
      eyebrow: "// features",
      title: "What we deliver",
      items: [
        "Custom design",
        "Responsive layout",
        "Admin panel",
        "Technical SEO",
        "Security hardening",
        "Payment gateway integration",
        "Multilingual support",
        "API development",
        "CRM integration",
        "Speed optimization",
      ],
    },
    process: {
      eyebrow: "// process",
      title: "Development process",
      steps: [
        "Requirements analysis",
        "UI/UX design",
        "Front-end development",
        "Back-end development",
        "Testing",
        "Launch",
        "Support",
      ],
    },
    tech: {
      eyebrow: "// technology",
      title: "Technologies we use",
      items: [
        "React",
        "Next.js",
        "Laravel",
        "Node.js",
        "ASP.NET",
        "PHP",
        "MySQL",
        "PostgreSQL",
        "Docker",
      ],
    },
    support: {
      eyebrow: "// after launch",
      title: "Your website is not abandoned after delivery.",
      body: "Going live is not the end of the project. Updates, security, monitoring, bug fixes, and new features are part of the service that continues after handoff.",
    },
    faq: {
      eyebrow: "// faq",
      title: "Frequently asked questions",
      items: [
        {
          q: "How long does a website take?",
          a: "A corporate site usually takes 3–6 weeks; stores or custom platforms take 8–16 weeks depending on scope. We confirm an exact timeline after requirements analysis.",
        },
        {
          q: "How is pricing calculated?",
          a: "Based on project type, page count, features, and integrations. After a consultation call we send a clear, phased proposal.",
        },
        {
          q: "Does it include an admin panel?",
          a: "Yes. We build a custom admin or CMS so you can update content, products, orders, or users without developer help.",
        },
        {
          q: "Can it be extended later?",
          a: "Yes. Our architecture is built for growth—you can add a store, panel, API, or mobile app when you are ready.",
        },
        {
          q: "Do you provide hosting?",
          a: "We can manage server, domain, and deployment, or deploy on your infrastructure. Both models are supported.",
        },
      ],
    },
  },
};
