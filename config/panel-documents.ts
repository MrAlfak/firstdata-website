import type { Lang } from "@/i18n/dictionaries";

export type PanelDocCategory =
  | "onboarding"
  | "delivery"
  | "support"
  | "brand"
  | "legal";

export type PanelDocument = {
  id: string;
  category: PanelDocCategory;
  title: Record<Lang, string>;
  summary: Record<Lang, string>;
  body: Record<Lang, string[]>;
  /** Optional public link (blog, terms, contact) */
  href?: string;
};

/** Standard documentation First Data provides to every client in the panel. */
export const PANEL_DOCUMENTS: PanelDocument[] = [
  {
    id: "kickoff-guide",
    category: "onboarding",
    title: {
      fa: "راهنمای شروع پروژه (Kickoff)",
      en: "Project kickoff guide",
    },
    summary: {
      fa: "قبل از شروع توسعه چه چیزهایی از شما می‌خواهیم و چطور همکاری را شروع می‌کنیم.",
      en: "What we need from you before development starts and how collaboration begins.",
    },
    body: {
      fa: [
        "پس از ثبت درخواست و تأیید محدوده، جلسه kickoff برگزار می‌شود.",
        "دسترسی‌ها (دامنه، هاست، اپ‌استور، آنالیتیکس) و دارایی‌های برند را آماده کنید.",
        "تصمیم‌گیرنده واحد معرفی کنید تا بازخوردها در یک کانال جمع شود.",
        "برنامه تحویل MVP و معیار موفقیت پروژه در همان جلسه مکتوب می‌شود.",
      ],
      en: [
        "After the brief is confirmed, we run a kickoff call.",
        "Prepare access (domain, hosting, stores, analytics) and brand assets.",
        "Nominate a single decision-maker so feedback stays in one channel.",
        "MVP delivery plan and success metrics are written down in that meeting.",
      ],
    },
    href: "/contactus/request",
  },
  {
    id: "panel-howto",
    category: "onboarding",
    title: {
      fa: "راهنمای استفاده از پنل مشتری",
      en: "How to use the client panel",
    },
    summary: {
      fa: "داشبورد، پروژه‌ها، قراردادها، تیکت، فاکتور و مستندات را از همین پنل مدیریت کنید.",
      en: "Manage dashboard, projects, contracts, tickets, invoices, and documents from this panel.",
    },
    body: {
      fa: [
        "داشبورد وضعیت پروژه و کارهای در انتظار شما را نشان می‌دهد.",
        "قراردادها را بخوانید و در صورت تأیید امضا کنید.",
        "برای هر موضوع پشتیبانی یک تیکت جدا بسازید و پیوست لازم را ضمیمه کنید.",
        "فاکتورهای پرداخت‌نشده از بخش فاکتورها قابل پرداخت آنلاین هستند.",
      ],
      en: [
        "The dashboard shows project status and items waiting on you.",
        "Read contracts and sign when you approve.",
        "Open one ticket per support topic and attach needed files.",
        "Unpaid invoices can be paid online from the Invoices section.",
      ],
    },
  },
  {
    id: "handover-checklist",
    category: "delivery",
    title: {
      fa: "چک‌لیست تحویل و لانچ",
      en: "Handover & launch checklist",
    },
    summary: {
      fa: "مواردی که قبل از لانچ و پس از تحویل نهایی باید تأیید شوند.",
      en: "Items to confirm before launch and after final handover.",
    },
    body: {
      fa: [
        "دسترسی ادمین/پنل و مالکیت دامنه/هاست در اختیار شماست.",
        "بکاپ اولیه و مانیتورینگ پایه فعال است.",
        "مستندات فنی و راهنمای ادمین در همین بخش مستندات قرار می‌گیرد.",
        "پس از لانچ، دوره پشتیبانی طبق قرارداد آغاز می‌شود.",
      ],
      en: [
        "Admin/panel access and domain/hosting ownership are yours.",
        "Initial backup and basic monitoring are active.",
        "Technical docs and admin guides land in this Documents section.",
        "After launch, the support window starts per contract.",
      ],
    },
  },
  {
    id: "brand-assets",
    category: "brand",
    title: {
      fa: "راهنمای تحویل دارایی برند",
      en: "Brand asset delivery guide",
    },
    summary: {
      fa: "لوگو، فونت، رنگ و محتوای لازم را چگونه برای تیم ارسال کنید.",
      en: "How to send logos, fonts, colors, and content to the team.",
    },
    body: {
      fa: [
        "لوگو را در قالب SVG یا PNG شفاف با کیفیت بالا بفرستید.",
        "فونت‌های دارای لایسنس و کد رنگ (HEX) را همراه بفرستید.",
        "متن‌های صفحه و تصاویر محصول را با نام‌گذاری واضح آپلود کنید.",
        "فایل‌های برند را می‌توانید در بخش «ارسال به تیم» همین صفحه آپلود کنید.",
      ],
      en: [
        "Send logos as SVG or high-quality transparent PNG.",
        "Include licensed fonts and HEX color codes.",
        "Upload page copy and product images with clear filenames.",
        "You can upload brand files via “Send to the team” on this page.",
      ],
    },
  },
  {
    id: "support-sla",
    category: "support",
    title: {
      fa: "پشتیبانی و SLA",
      en: "Support & SLA overview",
    },
    summary: {
      fa: "اولویت‌بندی تیکت‌ها، زمان پاسخ و محدوده پشتیبانی پس از لانچ.",
      en: "Ticket priorities, response times, and post-launch support scope.",
    },
    body: {
      fa: [
        "اولویت بالا برای قطع سرویس یا باگ امنیتی؛ اولویت عادی برای بهبود و سؤال.",
        "درخواست‌های خارج از محدوده قرارداد به‌صورت فاز جدید برآورد می‌شود.",
        "برای مشکلات فوری علاوه بر تیکت با کانال تماس اعلام‌شده هماهنگ کنید.",
        "جزئیات SLA در قرارداد پروژه شما مکتوب است.",
      ],
      en: [
        "High priority for outages or security bugs; normal for improvements and questions.",
        "Out-of-scope requests are estimated as a new phase.",
        "For urgent issues, coordinate via the agreed contact channel as well as a ticket.",
        "SLA details are written in your project contract.",
      ],
    },
    href: "/services/support",
  },
  {
    id: "terms-overview",
    category: "legal",
    title: {
      fa: "شرایط استفاده و مالکیت کد",
      en: "Terms & code ownership",
    },
    summary: {
      fa: "خلاصه مالکیت کد، محرمانگی و شرایط استفاده از خدمات First Data.",
      en: "Summary of code ownership, confidentiality, and First Data terms of use.",
    },
    body: {
      fa: [
        "پس از تسویه، مالکیت کد تحویلی طبق قرارداد به شما منتقل می‌شود.",
        "اطلاعات پروژه محرمانه تلقی می‌شود و بدون اجازه منتشر نمی‌شود.",
        "متن کامل شرایط استفاده در صفحه Terms سایت در دسترس است.",
      ],
      en: [
        "After settlement, delivered code ownership transfers per your contract.",
        "Project information is confidential and not published without consent.",
        "Full terms of use are available on the site Terms page.",
      ],
    },
    href: "/terms",
  },
];

export const PANEL_DOC_CATEGORIES: PanelDocCategory[] = [
  "onboarding",
  "delivery",
  "support",
  "brand",
  "legal",
];
