import type { Lang } from "./dictionaries";

export type IosPageUi = {
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
  appStore: {
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

export const iosPageDictionaries: Record<Lang, IosPageUi> = {
  fa: {
    hero: {
      eyebrow: "> بارگذاری /services/ios...",
      title: "اپلیکیشن iOS",
      lead: "اپ iOS باید روان، امن و مطابق استانداردهای اپل باشد.",
      body: "اپ‌های بومی iOS با Swift و SwiftUI می‌سازیم — از اپ مشتری و فروشگاه موبایل تا ابزار داخلی و سامانه میدانی. تمرکز ما روی تجربه کاربری بومی، عملکرد بالا و انتشار حرفه‌ای در App Store و TestFlight است.",
      cta: "شروع پروژه iOS",
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
      title: "چرا iOS بومی؟",
      crossTitle: "کراس‌پلتفرم عمومی",
      crossItems: [
        "عملکرد پایین‌تر روی دستگاه‌های قدیمی",
        "محدودیت در قابلیت‌های سخت‌افزاری اپل",
        "تجربه کاربری غیربومی iOS",
        "وابستگی به لایه میانی و باگ‌های پنهان",
      ],
      nativeTitle: "iOS بومی (Native)",
      nativeItems: [
        "سرعت و روان بودن روی iPhone و iPad",
        "دسترسی کامل به Face ID، دوربین، GPS و اعلان",
        "رابط مطابق Human Interface Guidelines",
        "پایداری و نگهداری بلندمدت بهتر",
      ],
    },
    features: {
      eyebrow: "// امکانات",
      title: "امکاناتی که پیاده می‌کنیم",
      items: [
        "ورود و ثبت‌نام امن",
        "پرداخت درون‌برنامه‌ای و Apple Pay",
        "اعلان Push",
        "کار آفلاین و همگام‌سازی",
        "نقشه و موقعیت‌یابی",
        "دوربین و بارکدخوان",
        "احراز هویت Face ID و Touch ID",
        "چندزبانه و RTL",
        "اتصال به API و پنل وب",
        "آنالیتیکس و گزارش رفتار کاربر",
      ],
    },
    tech: {
      eyebrow: "// فناوری",
      title: "تکنولوژی‌های اصلی",
      items: [
        "Swift",
        "SwiftUI",
        "UIKit",
        "Core Data",
        "Combine",
        "CloudKit",
        "StoreKit",
        "XCTest",
      ],
    },
    appStore: {
      eyebrow: "// انتشار",
      title: "انتشار در App Store",
      items: [
        "آماده‌سازی صفحه فروشگاه (App Store Listing)",
        "ساخت Archive و آپلود با Xcode",
        "رعایت سیاست‌های App Store Review",
        "مدیریت نسخه و Release Notes",
        "پاسخ به بازخورد و به‌روزرسانی",
        "پشتیبانی از TestFlight و تست بتا",
      ],
    },
    process: {
      eyebrow: "// فرآیند",
      title: "فرآیند توسعه اپ iOS",
      steps: [
        "تحلیل نیاز و تعریف MVP",
        "طراحی UI/UX موبایل",
        "توسعه با Swift و SwiftUI",
        "اتصال API و سرویس‌های جانبی",
        "تست روی iPhone و iPad",
        "انتشار در App Store",
        "پشتیبانی و به‌روزرسانی",
      ],
    },
    support: {
      eyebrow: "// پس از انتشار",
      title: "انتشار اپ پایان کار نیست.",
      body: "نسخه‌های جدید iOS، تغییر سیاست‌های App Store، رفع باگ، بهبود عملکرد و افزودن فیچرهای جدید نیازمند نگهداری مداوم است. ما اپ شما را پس از لانچ هم همراهی می‌کنیم.",
    },
    faq: {
      eyebrow: "// سوالات متداول",
      title: "سوالات متداول",
      items: [
        {
          q: "توسعه اپ iOS چقدر زمان می‌برد؟",
          a: "اپ ساده با چند صفحه معمولاً ۸ تا ۱۲ هفته؛ اپ‌های پیچیده با پرداخت، نقشه و آفلاین ۱۴ تا ۲۰ هفته. زمان دقیق پس از تعریف MVP اعلام می‌شود.",
        },
        {
          q: "آیا نسخه اندروید هم می‌سازید؟",
          a: "بله. می‌توانیم پس از iOS اندروید را جداگانه یا با اشتراک API و طراحی مشترک توسعه دهیم.",
        },
        {
          q: "انتشار در App Store بر عهده شماست؟",
          a: "بله. آماده‌سازی بسته انتشار، App Store Listing و آپلود نسخه اول را انجام می‌دهیم. حساب Apple Developer می‌تواند متعلق به شما باشد.",
        },
        {
          q: "روی چه دستگاه‌هایی تست می‌شود؟",
          a: "روی نسخه‌های مختلف iOS و اندازه صفحه‌نمایش متفاوت؛ از iPhone SE تا iPad Pro تست سازگاری انجام می‌شود.",
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
      eyebrow: "> loading /services/ios...",
      title: "iOS App",
      lead: "An iOS app should be smooth, secure, and aligned with Apple standards.",
      body: "We build native iOS apps with Swift and SwiftUI—from customer apps and mobile commerce to internal tools and field systems. We focus on native UX, high performance, and professional App Store and TestFlight release.",
      cta: "Start iOS project",
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
      title: "Why native iOS?",
      crossTitle: "Generic cross-platform",
      crossItems: [
        "Weaker performance on older devices",
        "Limited Apple hardware feature access",
        "Non-native iOS user experience",
        "Hidden issues in abstraction layers",
      ],
      nativeTitle: "Native iOS",
      nativeItems: [
        "Speed and smoothness on iPhone and iPad",
        "Full access to Face ID, camera, GPS, and push",
        "UI aligned with Human Interface Guidelines",
        "Better long-term stability and maintenance",
      ],
    },
    features: {
      eyebrow: "// features",
      title: "What we implement",
      items: [
        "Secure login & registration",
        "In-app purchases & Apple Pay",
        "Push notifications",
        "Offline mode & sync",
        "Maps & location",
        "Camera & barcode scan",
        "Face ID & Touch ID authentication",
        "Multilingual & RTL",
        "API & web panel integration",
        "Analytics & user behavior",
      ],
    },
    tech: {
      eyebrow: "// technology",
      title: "Core technologies",
      items: [
        "Swift",
        "SwiftUI",
        "UIKit",
        "Core Data",
        "Combine",
        "CloudKit",
        "StoreKit",
        "XCTest",
      ],
    },
    appStore: {
      eyebrow: "// publishing",
      title: "App Store release",
      items: [
        "App Store listing preparation",
        "Archive build & Xcode upload",
        "App Store Review policy compliance",
        "Version management & release notes",
        "Review response & updates",
        "TestFlight & beta testing",
      ],
    },
    process: {
      eyebrow: "// process",
      title: "iOS development process",
      steps: [
        "Requirements & MVP definition",
        "Mobile UI/UX design",
        "Swift & SwiftUI development",
        "API & third-party integration",
        "iPhone & iPad testing",
        "App Store release",
        "Support & updates",
      ],
    },
    support: {
      eyebrow: "// after launch",
      title: "Launch is not the finish line.",
      body: "New iOS versions, App Store policy changes, bug fixes, performance improvements, and new features all require ongoing care. We support your app after go-live.",
    },
    faq: {
      eyebrow: "// faq",
      title: "Frequently asked questions",
      items: [
        {
          q: "How long does iOS development take?",
          a: "A simple multi-screen app usually takes 8–12 weeks; complex apps with payments, maps, and offline mode take 14–20 weeks. Exact timeline is set after MVP scope.",
        },
        {
          q: "Do you also build Android?",
          a: "Yes. We can develop Android separately or share API and design after iOS.",
        },
        {
          q: "Do you handle App Store publishing?",
          a: "Yes. We prepare the release bundle, store listing, and first upload. The Apple Developer account can remain yours.",
        },
        {
          q: "Which devices do you test on?",
          a: "Multiple iOS versions and screen sizes—from iPhone SE to iPad Pro.",
        },
        {
          q: "Who owns the app code?",
          a: "You do. Full source, documentation, and access are delivered at project close.",
        },
      ],
    },
  },
};
