import type { Lang } from "./dictionaries";

export type ServicesPageCard = {
  slug: string;
  title: string;
  desc: string;
};

export type ServicesPageFeature = {
  id: string;
  title: string;
  text: string;
};

export type ServicesPageStep = {
  num: string;
  title: string;
  text: string;
};

export type ServicesPageUi = {
  metaTitle: string;
  metaDescription: string;
  heroBadge: string;
  heroTitle: string;
  heroLead: string;
  features: ServicesPageFeature[];
  gridBadge: string;
  gridTitle: string;
  gridLead: string;
  cards: ServicesPageCard[];
  processBadge: string;
  processTitle: string;
  steps: ServicesPageStep[];
  ctaTitle: string;
  ctaLead: string;
  ctaButton: string;
  collageAria: string;
};

export const servicesPageDictionaries: Record<Lang, ServicesPageUi> = {
  fa: {
    metaTitle: "خدمات",
    metaDescription:
      "طراحی وب، UI/UX، فروشگاه اینترنتی، اندروید، iOS، سئو، مشاوره و پشتیبانی — راهکارهای دیجیتال اولین دیتا.",
    heroBadge: "خدمات ما",
    heroTitle: "راهکارهای دیجیتال برای رشد کسب‌وکار شما",
    heroLead:
      "با ترکیب خلاقیت و فناوری، محصولاتی می‌سازیم که دیده می‌شوند، اعتماد می‌سازند و به رشد واقعی کمک می‌کنند.",
    features: [
      {
        id: "custom",
        title: "رویکرد سفارشی",
        text: "هر پروژه را متناسب با نیاز، بازار و اهداف شما طراحی و اجرا می‌کنیم.",
      },
      {
        id: "expertise",
        title: "تجربه و تخصص",
        text: "تیمی با سابقه ساخت محصولات وب، موبایل و پلتفرم برای کسب‌وکارهای واقعی.",
      },
      {
        id: "quality",
        title: "کیفیت و تعهد",
        text: "از طراحی تا پشتیبانی، کیفیت تحویل و پاسخ‌گویی شفاف اولویت ماست.",
      },
    ],
    gridBadge: "خدمات ما",
    gridTitle: "راهکارهای جامع برای نیازهای دیجیتال شما",
    gridLead: "هشت حوزه تخصصی — از ایده تا محصول زنده، کنار شما.",
    cards: [
      {
        slug: "web-design",
        title: "طراحی وب‌سایت",
        desc: "سایت حرفه‌ای، سریع و آماده رشد برای معرفی برند و جذب مشتری.",
      },
      {
        slug: "ui-ux",
        title: "طراحی UI/UX",
        desc: "تجربه کاربری شفاف و رابط بصری که استفاده از محصول را ساده می‌کند.",
      },
      {
        slug: "ecommerce",
        title: "طراحی فروشگاه اینترنتی",
        desc: "فروش آنلاین با پرداخت امن، مدیریت سفارش و مسیر خرید روان.",
      },
      {
        slug: "android",
        title: "طراحی اپلیکیشن اندروید",
        desc: "اپ اندروید برای مشتری یا تیم داخلی، با انتشار در Google Play.",
      },
      {
        slug: "ios",
        title: "طراحی اپلیکیشن iOS",
        desc: "اپلیکیشن iPhone و iPad با استاندارد اپل و انتشار در App Store.",
      },
      {
        slug: "seo",
        title: "سئو و بهینه‌سازی",
        desc: "دیده شدن در گوگل با سئوی فنی، محتوا و سرعت واقعی.",
      },
      {
        slug: "consulting",
        title: "مشاوره پروژه",
        desc: "تحلیل نیاز، محدوده و مسیر اجرا — قبل از شروع ساخت.",
      },
      {
        slug: "support",
        title: "پشتیبانی و توسعه",
        desc: "پس از لانچ هم کنار شما می‌مانیم: رفع باگ، آپدیت و رشد مستمر.",
      },
    ],
    processBadge: "فرآیند همکاری",
    processTitle: "از ایده تا نتیجه، در چهار گام ساده",
    steps: [
      {
        num: "01",
        title: "بررسی و مشاوره",
        text: "اهداف، محدودیت‌ها و اولویت‌ها را شفاف می‌کنیم.",
      },
      {
        num: "02",
        title: "طراحی و برنامه‌ریزی",
        text: "ساختار، UI و نقشه تحویل را قبل از کدنویسی قفل می‌کنیم.",
      },
      {
        num: "03",
        title: "توسعه و پیاده‌سازی",
        text: "ساخت تکراری با دموهای قابل لمس در طول مسیر.",
      },
      {
        num: "04",
        title: "تحویل و پشتیبانی",
        text: "لانچ، مانیتورینگ اولیه و همراهی بعد از تحویل.",
      },
    ],
    ctaTitle: "آماده شروع پروژه بعدی شما هستیم",
    ctaLead: "ایده‌تان را بگویید — مشاوره اولیه رایگان است و مسیر را با هم روشن می‌کنیم.",
    ctaButton: "درخواست مشاوره رایگان",
    collageAria: "نمایش ترکیبی داشبورد و اپلیکیشن موبایل",
  },
  en: {
    metaTitle: "Services",
    metaDescription:
      "Web design, UI/UX, ecommerce, Android, iOS, SEO, consulting, and support — First Data digital solutions.",
    heroBadge: "Our services",
    heroTitle: "Digital solutions that grow your business",
    heroLead:
      "We combine craft and engineering to ship products that get found, earn trust, and drive real growth.",
    features: [
      {
        id: "custom",
        title: "Custom approach",
        text: "Every engagement is shaped around your market, goals, and constraints.",
      },
      {
        id: "expertise",
        title: "Experience & expertise",
        text: "A team that has shipped web, mobile, and platform products for real businesses.",
      },
      {
        id: "quality",
        title: "Quality & commitment",
        text: "From design to support, delivery quality and clear ownership come first.",
      },
    ],
    gridBadge: "Our services",
    gridTitle: "End-to-end solutions for your digital needs",
    gridLead: "Eight focused practices — from idea to a live product, with you.",
    cards: [
      {
        slug: "web-design",
        title: "Website design",
        desc: "A fast, professional site that introduces your brand and converts visitors.",
      },
      {
        slug: "ui-ux",
        title: "UI/UX design",
        desc: "Clear flows and polished interfaces that make products easy to use.",
      },
      {
        slug: "ecommerce",
        title: "Online store design",
        desc: "Sell online with secure payments, order management, and a smooth checkout.",
      },
      {
        slug: "android",
        title: "Android app design",
        desc: "Android apps for customers or teams, ready for Google Play.",
      },
      {
        slug: "ios",
        title: "iOS app design",
        desc: "iPhone and iPad apps built to Apple standards and App Store ready.",
      },
      {
        slug: "seo",
        title: "SEO & optimization",
        desc: "Get found on Google with technical SEO, content, and real performance.",
      },
      {
        slug: "consulting",
        title: "Project consulting",
        desc: "Scope, feasibility, and a clear build path — before engineering starts.",
      },
      {
        slug: "support",
        title: "Support & development",
        desc: "After launch we stay: fixes, updates, and continuous improvement.",
      },
    ],
    processBadge: "How we work",
    processTitle: "From idea to result, in four simple steps",
    steps: [
      {
        num: "01",
        title: "Review & consult",
        text: "We clarify goals, constraints, and priorities together.",
      },
      {
        num: "02",
        title: "Design & plan",
        text: "We lock structure, UI, and delivery plan before heavy coding.",
      },
      {
        num: "03",
        title: "Build & implement",
        text: "Iterative development with tangible demos along the way.",
      },
      {
        num: "04",
        title: "Deliver & support",
        text: "Launch, early monitoring, and hands-on support after go-live.",
      },
    ],
    ctaTitle: "Ready to start your next project",
    ctaLead: "Tell us the idea — the first consult is free and we map the path together.",
    ctaButton: "Request a free consultation",
    collageAria: "Illustrated collage of dashboard and mobile app",
  },
};
