import type { Lang } from "./dictionaries";

export type AndroidPageUi = {
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
    crossTitle: string;
    crossItems: string[];
    nativeTitle: string;
    nativeItems: string[];
  };
  features: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  tech: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  playStore: {
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

export const androidPageDictionaries: Record<Lang, AndroidPageUi> = {
  fa: {
    hero: {
      eyebrow: "> بارگذاری /services/android...",
      title: "اپلیکیشن اندروید",
      lead: "اپلیکیشن اندروید باید سریع، پایدار و در گوشی‌های مختلف یکسان کار کند.",
      body: "اپ‌های بومی اندروید با Kotlin و Jetpack Compose می‌سازیم — از اپ مشتری و فروشگاه موبایل تا ابزار داخلی تیم و سامانه میدانی. تمرکز ما روی تجربه کاربری روان، عملکرد بالا و انتشار حرفه‌ای در Google Play است.",
      cta: "شروع پروژه اندروید",
    },
    types: {
      eyebrow: "// نوع اپ",
      title: "چه اپلیکیشنی نیاز دارید؟",
      cards: [
        {
          icon: "📱",
          title: "اپ مشتری (B2C)",
          line1: "خدمات، رزرو، پیگیری سفارش و ارتباط مستقیم با کاربر.",
          line2: "برای برندها، استارتاپ‌ها و کسب‌وکارهای خدماتی.",
        },
        {
          icon: "🏢",
          title: "اپ سازمانی و داخلی",
          line1: "ابزار کارکنان، گزارش‌گیری میدانی و فرایندهای عملیاتی.",
          line2: "با کنترل دسترسی، نقش کاربری و امنیت سازمانی.",
        },
        {
          icon: "🛒",
          title: "مکمل فروشگاه و وب",
          line1: "خرید موبایلی، اعلان سفارش و وفاداری مشتری.",
          line2: "همگام با پنل و API فروشگاه یا سایت شما.",
        },
        {
          icon: "📍",
          title: "اپ میدانی و لجستیک",
          line1: "موقعیت‌یابی، اسکن، آفلاین و همگام‌سازی بعد از اتصال.",
          line2: "برای پیک، انبار، بازرسی و تیم‌های پرتحرک.",
        },
      ],
    },
    compare: {
      eyebrow: "// مقایسه",
      title: "چرا اندروید بومی؟",
      crossTitle: "کراس‌پلتفرم عمومی",
      crossItems: [
        "عملکرد پایین‌تر روی دستگاه‌های ضعیف",
        "محدودیت در قابلیت‌های سخت‌افزاری",
        "تجربه کاربری غیربومی اندروید",
        "وابستگی به لایه میانی و باگ‌های پنهان",
      ],
      nativeTitle: "اندروید بومی (Native)",
      nativeItems: [
        "سرعت و روان بودن روی طیف وسیع گوشی‌ها",
        "دسترسی کامل به دوربین، GPS، اعلان و بیومتریک",
        "رابط مطابق Material Design و عادت کاربران",
        "پایداری و نگهداری بلندمدت بهتر",
      ],
    },
    features: {
      eyebrow: "// امکانات",
      title: "امکاناتی که پیاده می‌کنیم",
      items: [
        "ورود و ثبت‌نام امن",
        "پرداخت درون‌برنامه‌ای و درگاه",
        "اعلان Push",
        "کار آفلاین و همگام‌سازی",
        "نقشه و موقعیت‌یابی",
        "دوربین و بارکدخوان",
        "احراز هویت بیومتریک",
        "چندزبانه و RTL",
        "اتصال به API و پنل وب",
        "آنالیتیکس و گزارش رفتار کاربر",
      ],
    },
    tech: {
      eyebrow: "// فناوری",
      title: "تکنولوژی‌های اصلی",
      items: [
        "Kotlin",
        "Jetpack Compose",
        "Android SDK",
        "Room",
        "Retrofit",
        "Firebase",
        "Google Play Services",
        "WorkManager",
      ],
    },
    playStore: {
      eyebrow: "// انتشار",
      title: "انتشار در Google Play",
      items: [
        "آماده‌سازی صفحه فروشگاه (Store Listing)",
        "ساخت امضای Release و AAB",
        "رعایت سیاست‌های Google Play",
        "مدیریت نسخه و Changelog",
        "پاسخ به بازخورد و به‌روزرسانی",
        "پشتیبانی از تست داخلی و بتا",
      ],
    },
    process: {
      eyebrow: "// فرآیند",
      title: "فرآیند توسعه اپ اندروید",
      steps: [
        "تحلیل نیاز و تعریف MVP",
        "طراحی UI/UX موبایل",
        "توسعه با Kotlin و Compose",
        "اتصال API و سرویس‌های جانبی",
        "تست روی دستگاه‌های مختلف",
        "انتشار در Google Play",
        "پشتیبانی و به‌روزرسانی",
      ],
    },
    support: {
      eyebrow: "// پس از انتشار",
      title: "انتشار اپ پایان کار نیست.",
      body: "نسخه‌های جدید اندروید، تغییر سیاست‌های Google Play، رفع باگ، بهبود عملکرد و افزودن فیچرهای جدید نیازمند نگهداری مداوم است. ما اپ شما را پس از لانچ هم همراهی می‌کنیم.",
    },
    faq: {
      eyebrow: "// سوالات متداول",
      title: "سوالات متداول",
      items: [
        {
          q: "توسعه اپ اندروید چقدر زمان می‌برد؟",
          a: "اپ ساده با چند صفحه معمولاً ۸ تا ۱۲ هفته؛ اپ‌های پیچیده با پرداخت، نقشه و آفلاین ۱۴ تا ۲۰ هفته. زمان دقیق پس از تعریف MVP اعلام می‌شود.",
        },
        {
          q: "آیا نسخه iOS هم می‌سازید؟",
          a: "بله. می‌توانیم پس از اندروید iOS را جداگانه یا با اشتراک API و طراحی مشترک توسعه دهیم.",
        },
        {
          q: "انتشار در Google Play بر عهده شماست؟",
          a: "بله. آماده‌سازی بسته انتشار، Store Listing و آپلود نسخه اول را انجام می‌دهیم. حساب توسعه‌دهنده می‌تواند متعلق به شما باشد.",
        },
        {
          q: "روی چه گوشی‌هایی تست می‌شود؟",
          a: "روی نسخه‌های مختلف اندروید و اندازه صفحه‌نمایش متفاوت؛ از گوشی‌های اقتصادی تا پرچمدار تست سازگاری انجام می‌شود.",
        },
        {
          q: "کد اپ متعلق به کیست؟",
          a: "متعلق به شماست. سورس کامل، مستندات و دسترسی‌های لازم در پایان پروژه تحویل داده می‌شود.",
        },
      ],
    },
  },
  en: {
    hero: {
      eyebrow: "> loading /services/android...",
      title: "Android App",
      lead: "An Android app should be fast, stable, and work consistently across devices.",
      body: "We build native Android apps with Kotlin and Jetpack Compose—from customer apps and mobile commerce to internal tools and field systems. We focus on smooth UX, high performance, and professional Google Play release.",
      cta: "Start Android project",
    },
    types: {
      eyebrow: "// app type",
      title: "What kind of app do you need?",
      cards: [
        {
          icon: "📱",
          title: "Consumer app (B2C)",
          line1: "Services, booking, order tracking, and direct user engagement.",
          line2: "For brands, startups, and service businesses.",
        },
        {
          icon: "🏢",
          title: "Enterprise & internal",
          line1: "Staff tools, field reporting, and operational workflows.",
          line2: "With access control, roles, and enterprise security.",
        },
        {
          icon: "🛒",
          title: "Store & web companion",
          line1: "Mobile shopping, order alerts, and customer loyalty.",
          line2: "Synced with your store panel or website API.",
        },
        {
          icon: "📍",
          title: "Field & logistics",
          line1: "Location, scanning, offline mode, and sync when online.",
          line2: "For couriers, warehouses, inspections, and mobile teams.",
        },
      ],
    },
    compare: {
      eyebrow: "// comparison",
      title: "Why native Android?",
      crossTitle: "Generic cross-platform",
      crossItems: [
        "Weaker performance on low-end devices",
        "Limited hardware feature access",
        "Non-native Android user experience",
        "Hidden issues in abstraction layers",
      ],
      nativeTitle: "Native Android",
      nativeItems: [
        "Speed and smoothness across device range",
        "Full access to camera, GPS, push, biometrics",
        "UI aligned with Material Design patterns",
        "Better long-term stability and maintenance",
      ],
    },
    features: {
      eyebrow: "// features",
      title: "What we implement",
      items: [
        "Secure login & registration",
        "In-app & gateway payments",
        "Push notifications",
        "Offline mode & sync",
        "Maps & location",
        "Camera & barcode scan",
        "Biometric authentication",
        "Multilingual & RTL",
        "API & web panel integration",
        "Analytics & user behavior",
      ],
    },
    tech: {
      eyebrow: "// technology",
      title: "Core technologies",
      items: [
        "Kotlin",
        "Jetpack Compose",
        "Android SDK",
        "Room",
        "Retrofit",
        "Firebase",
        "Google Play Services",
        "WorkManager",
      ],
    },
    playStore: {
      eyebrow: "// publishing",
      title: "Google Play release",
      items: [
        "Store listing preparation",
        "Release signing & AAB build",
        "Google Play policy compliance",
        "Version management & changelog",
        "Review response & updates",
        "Internal & beta testing tracks",
      ],
    },
    process: {
      eyebrow: "// process",
      title: "Android development process",
      steps: [
        "Requirements & MVP definition",
        "Mobile UI/UX design",
        "Kotlin & Compose development",
        "API & third-party integration",
        "Multi-device testing",
        "Google Play release",
        "Support & updates",
      ],
    },
    support: {
      eyebrow: "// after launch",
      title: "Launch is not the finish line.",
      body: "New Android versions, Google Play policy changes, bug fixes, performance improvements, and new features all require ongoing care. We support your app after go-live.",
    },
    faq: {
      eyebrow: "// faq",
      title: "Frequently asked questions",
      items: [
        {
          q: "How long does Android development take?",
          a: "A simple multi-screen app usually takes 8–12 weeks; complex apps with payments, maps, and offline mode take 14–20 weeks. Exact timeline is set after MVP scope.",
        },
        {
          q: "Do you also build iOS?",
          a: "Yes. We can develop iOS separately or share API and design after Android.",
        },
        {
          q: "Do you handle Google Play publishing?",
          a: "Yes. We prepare the release bundle, store listing, and first upload. The developer account can remain yours.",
        },
        {
          q: "Which devices do you test on?",
          a: "Multiple Android versions and screen sizes—from budget phones to flagships.",
        },
        {
          q: "Who owns the app code?",
          a: "You do. Full source, documentation, and access are delivered at project close.",
        },
      ],
    },
  },
};
