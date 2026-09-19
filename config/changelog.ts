/**
 * Single source of truth for site version and changelog.
 * Bump APP_VERSION and add an entry here when shipping user-visible updates.
 */
export const APP_VERSION = "2.6.153";

export type ChangelogLocaleItems = {
  fa: string[];
  en: string[];
};

export type ChangelogEntry = {
  version: string;
  date: string;
  items: ChangelogLocaleItems;
};

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "2.6.153",
    date: "2026-08-26",
    items: {
      fa: [
        "متن ویس دستیار در دو خط دیده می‌شود و دیگر روی یک خط قطع نمی‌شود",
      ],
      en: [
        "Assistant voice transcript wraps to two lines instead of cutting off",
      ],
    },
  },
  {
    version: "2.6.152",
    date: "2026-08-26",
    items: {
      fa: [
        "ورودی صوتی دستیار بدون گوگل کار می‌کند و گفتار فارسی روی دستگاه به متن تبدیل می‌شود",
      ],
      en: [
        "Assistant voice works without Google by transcribing Persian on-device",
      ],
    },
  },
  {
    version: "2.6.151",
    date: "2026-08-26",
    items: {
      fa: [
        "ویس دستیار گفتار را در مرورگر به متن تبدیل می‌کند و خطای Transcription برطرف شد",
      ],
      en: [
        "Assistant voice transcribes in the browser and no longer shows Transcription failed",
      ],
    },
  },
  {
    version: "2.6.150",
    date: "2026-08-26",
    items: {
      fa: [
        "ویس دستیار میکروفون را می‌گیرد و گفتار را به متن تبدیل می‌کند",
      ],
      en: [
        "Assistant mic records voice and turns speech into a message",
      ],
    },
  },
  {
    version: "2.6.149",
    date: "2026-08-26",
    items: {
      fa: [
        "مودال پاسخ دستیار با ظاهر شیشه‌ای، انیمیشن و پیام بعدی بازطراحی شد",
      ],
      en: [
        "Assistant reply modal restyled with glass, motion, and follow-up chat",
      ],
    },
  },
  {
    version: "2.6.148",
    date: "2026-08-26",
    items: {
      fa: [
        "کلیک روی «از اولین دیتا بپرسید» دوباره آهنگساز را باز می‌کند",
      ],
      en: [
        "Ask First Data chip opens the assistant composer again",
      ],
    },
  },
  {
    version: "2.6.147",
    date: "2026-08-26",
    items: {
      fa: [
        "خط بالای دکمه‌های دایره‌ای منوی موبایل برداشته شد",
      ],
      en: [
        "Removed the hairline highlight on mobile-menu circular buttons",
      ],
    },
  },
  {
    version: "2.6.146",
    date: "2026-08-25",
    items: {
      fa: [
        "با باز شدن منوی موبایل، نوار پرسش و دکمه ۵۶K پنهان می‌شوند",
      ],
      en: [
        "Mobile menu hides the Ask bar and 56K dock while it is open",
      ],
    },
  },
  {
    version: "2.6.145",
    date: "2026-08-25",
    items: {
      fa: [
        "در نسخه انگلیسی ربات هیرو به سمت راست صحنه می‌رود",
      ],
      en: [
        "English hero places the 3D robot on the right side of the scene",
      ],
    },
  },
  {
    version: "2.6.144",
    date: "2026-08-25",
    items: {
      fa: [
        "ربات هیرو موس را روی متن و دکمه‌ها هم دنبال می‌کند",
      ],
      en: [
        "Hero robot keeps mouse-follow while the cursor is over the copy and CTAs",
      ],
    },
  },
  {
    version: "2.6.143",
    date: "2026-08-25",
    items: {
      fa: [
        "ربات سه‌بعدی هیرو به سمت چپ صحنه منتقل شد",
      ],
      en: [
        "Hero 3D robot moved to the left side of the scene",
      ],
    },
  },
  {
    version: "2.6.142",
    date: "2026-08-25",
    items: {
      fa: [
        "خط زرد نوار اسکرول بالای هیرو مدرن حذف شد",
      ],
      en: [
        "Removed the amber scroll hairline from the top of the modern hero",
      ],
    },
  },
  {
    version: "2.6.141",
    date: "2026-08-25",
    items: {
      fa: [
        "پس‌زمینه اسکین مدرن در حالت شب کاملاً مشکی شد",
      ],
      en: [
        "Modern dark theme page background is true black",
      ],
    },
  },
  {
    version: "2.6.140",
    date: "2026-08-25",
    items: {
      fa: [
        "منوی همبرگر هدر مدرن روی موبایل به لبهٔ چپ نوار چسبید",
      ],
      en: [
        "Modern header hamburger sits on the left edge of the bar on mobile",
      ],
    },
  },
  {
    version: "2.6.139",
    date: "2026-08-25",
    items: {
      fa: [
        "ربات سه‌بعدی هیرو دوباره در مرکز صحنه لود می‌شود (WASM اسپیلاین دیگر با CSP قطع نمی‌شود)",
        "اسلایدر لوگو زیر هیرو مدرن برگشت",
      ],
      en: [
        "Hero 3D robot loads again in the center (Spline WASM no longer blocked by CSP)",
        "Logo slider restored under the modern hero",
      ],
    },
  },
  {
    version: "2.6.138",
    date: "2026-08-25",
    items: {
      fa: [
        "کلیدهای Dokploy از سورس حذف شد؛ اسکریپت استقرار فقط از متغیر محیط می‌خواند",
        "مسیرهای دمو UI دیگر ایندکس نمی‌شوند؛ عنوان صفحات بدون تکرار برند",
        "JSON-LD دفتر شیراز و لینک شبکه‌های اجتماعی؛ هدر CSP",
        "OTP در تولید بدون وب‌هوک دیگر موفق گزارش نمی‌شود (۵۰۳)",
        "نمونه‌کارها به‌عنوان نمونه‌های ناشناس مشخص شدند",
        "بلاگ و جستجو بدون خالی‌شدن SSR؛ ?lang= برای hreflang پایدار ماند",
      ],
      en: [
        "Removed Dokploy secrets from source; deploy scripts require env vars",
        "Demo UI routes are noindex; document titles no longer repeat the brand",
        "Shiraz NAP in JSON-LD plus social sameAs; Content-Security-Policy header",
        "Production OTP fails closed without delivery webhooks (503)",
        "Portfolio labeled as anonymized samples, not named-client proofs",
        "Blog and search stay populated on SSR; ?lang= kept for hreflang",
      ],
    },
  },
  {
    version: "2.6.137",
    date: "2026-08-06",
    items: {
      fa: [
        "هدر مدرن در حالت شب: نوار سفید مات (بدون شیشه/تار)، متن و آیکون تیره روی سفید؛ مگامنو همچنان خوانا",
      ],
      en: [
        "Modern header in dark mode: solid opaque white bar (no glass/blur), dark text and icons on white; mega menus stay readable",
      ],
    },
  },
  {
    version: "2.6.136",
    date: "2026-08-05",
    items: {
      fa: [
        "هیرو Spline: اسکرول چرخ/تاچ روی صحنه درست شد — هدایت فوری به صفحه؛ روی لمس، iframe مانع اسکرول نمی‌شود",
      ],
      en: [
        "Spline hero: wheel/touch over the scene scrolls the page again — capture-phase forward + touch pass-through on coarse pointers",
      ],
    },
  },
  {
    version: "2.6.135",
    date: "2026-08-05",
    items: {
      fa: [
        "دکمهٔ اسکین: انیمیشن اعداد باینری برگشت — بدون هالهٔ نارنجی/آبی؛ ارقام ملایم خاکستری/فسفر",
      ],
      en: [
        "Skin FAB: binary digit rain restored without orange/blue bloom orbs — muted paper/phosphor digits",
      ],
    },
  },
  {
    version: "2.6.134",
    date: "2026-08-05",
    items: {
      fa: [
        "دکمهٔ شناور تعویض اسکین: هاله‌های آبی و نارنجی پشت دکمه حذف شد؛ ظاهر تمیز بدون bloom",
      ],
      en: [
        "Skin FAB: removed blue/orange bloom orbs behind the button for a clean pill",
      ],
    },
  },
  {
    version: "2.6.133",
    date: "2026-08-05",
    items: {
      fa: [
        "هدر مدرن در حالت شب: شیشهٔ تیرهٔ خوانا، آیکون‌ها و دکمهٔ منو با کنتراست درست، مگامنو و حالت اسکرول هماهنگ با پالت تاریک",
      ],
      en: [
        "Modern header night mode: dense dark glass, readable icons and menu toggle, mega menus and scrolled state aligned to the dark palette",
      ],
    },
  },
  {
    version: "2.6.132",
    date: "2026-08-05",
    items: {
      fa: [
        "منوی هدایت شونده (breadcrumb) دیگر زیر هدر شناور مدرن پنهان نمی‌شود؛ فاصلهٔ بالا با ارتفاع هدر هماهنگ شد",
      ],
      en: [
        "Site breadcrumb no longer sits under the floating modern header; top clearance matches header height",
      ],
    },
  },
  {
    version: "2.6.131",
    date: "2026-08-05",
    items: {
      fa: [
        "ورود/ثبت‌نام مدرن: پس‌زمینهٔ تیرهٔ بلوک و حلقه‌های تزئینی حذف شد؛ کارت روی پس‌زمینهٔ عادی سایت می‌نشیند",
      ],
      en: [
        "Modern auth: removed dark block background and decorative rings so the card sits on the normal site background",
      ],
    },
  },
  {
    version: "2.6.130",
    date: "2026-08-05",
    items: {
      fa: [
        "هدر مدرن: مگامنوی تماس پهن‌تر شد (تا حدود ۹۰۰px) با حفظ هم‌ترازی زیر آیکون تماس",
      ],
      en: [
        "Modern header: contact mega menu widened (~900px) while staying anchored under the contact icon",
      ],
    },
  },
  {
    version: "2.6.129",
    date: "2026-08-05",
    items: {
      fa: [
        "بلوک Two-Factor Auth (Shadcn Space) با InputOTP؛ ورود مدرن از آن برای مرحلهٔ TOTP استفاده می‌کند",
      ],
      en: [
        "Shadcn Space Two-Factor Auth block with InputOTP; modern login uses it for the TOTP step",
      ],
    },
  },
  {
    version: "2.6.128",
    date: "2026-08-05",
    items: {
      fa: [
        "ورود مدرن: فرم Login-01 (Shadcn Space) با برند فرست‌دیتا و منطق فعلی auth",
      ],
      en: [
        "Modern login: Login-01 (Shadcn Space) form with First Data branding and existing auth logic",
      ],
    },
  },
  {
    version: "2.6.127",
    date: "2026-08-05",
    items: {
      fa: [
        "ثبت‌نام مدرن: فرم Register-01 (Shadcn Space) با برند فرست‌دیتا و منطق فعلی auth",
      ],
      en: [
        "Modern register: Register-01 (Shadcn Space) form with First Data branding and existing auth logic",
      ],
    },
  },
  {
    version: "2.6.126",
    date: "2026-08-05",
    items: {
      fa: [
        "فراموشی رمز مدرن: بلوک forgot-password-01 (Shadcn Space) با حفظ منطق ارسال کد",
      ],
      en: [
        "Modern forgot-password: Shadcn Space forgot-password-01 block with existing reset-code flow",
      ],
    },
  },
  {
    version: "2.6.125",
    date: "2026-08-05",
    items: {
      fa: [
        "بلوک Verify Email (Shadcn Space) برای صفحهٔ تأیید ایمیل آماده شد",
      ],
      en: [
        "Shadcn Space Verify Email block ready for the email verification screen",
      ],
    },
  },
  {
    version: "2.6.124",
    date: "2026-08-05",
    items: {
      fa: [
        "هدر مدرن: مگامنوی تماس زیر آیکون تماس باز می‌شود (هم‌تراز با تریگر، RTL/LTR)",
      ],
      en: [
        "Modern header: contact mega menu opens aligned under the contact trigger (RTL/LTR)",
      ],
    },
  },
  {
    version: "2.6.123",
    date: "2026-08-05",
    items: {
      fa: [
        "صفحهٔ خدمات: گرید کارت‌ها با بلوک Bento Grid (Shadcn) جایگزین شد",
      ],
      en: [
        "Services page: replaced the card grid with the Shadcn Bento Grid block",
      ],
    },
  },
  {
    version: "2.6.122",
    date: "2026-08-05",
    items: {
      fa: [
        "دکمهٔ ۵۶K و قرص AI: سایهٔ مشکی زیر دکمه‌ها حذف شد",
      ],
      en: [
        "56K FAB and AI pill: removed black drop shadows under the buttons",
      ],
    },
  },
  {
    version: "2.6.121",
    date: "2026-08-05",
    items: {
      fa: [
        "هدر و هیرو مدرن هم‌عرض؛ پس‌زمینهٔ سفید نوبار هنگام اسکرول حذف می‌شود",
      ],
      en: [
        "Modern header and hero share the same width; navbar fill clears on scroll",
      ],
    },
  },
  {
    version: "2.6.120",
    date: "2026-08-05",
    items: {
      fa: [
        "هیرو مدرن: فاصلهٔ مناسب زیر هدر + گوشهٔ گرد ۲۲px هم‌اندازه نوبار شیشه‌ای",
      ],
      en: [
        "Modern hero: proper gap below the header + 22px corners matching the glass navbar",
      ],
    },
  },
  {
    version: "2.6.119",
    date: "2026-08-05",
    items: {
      fa: [
        "هدر مدرن: زیرمنوی تماس با ساختار مگامنو؛ آیکون تلگرام از هدر حذف شد",
      ],
      en: [
        "Modern header: contact submenu uses mega-menu layout; Telegram icon removed from header",
      ],
    },
  },
  {
    version: "2.6.118",
    date: "2026-08-05",
    items: {
      fa: [
        "هیرو مدرن: پس‌زمینهٔ روشن پشت هدر حذف شد — صحنهٔ مشکی تمام‌عرض زیر نوبار شناور",
      ],
      en: [
        "Modern hero: removed light page strip behind the header — full-bleed black scene under the floating navbar",
      ],
    },
  },
  {
    version: "2.6.117",
    date: "2026-08-05",
    items: {
      fa: [
        "هدر مدرن (تم روشن): نوبار واقعاً سفید مات روی هیرو تیره — مگامنو هم‌خوان؛ تم تاریک و ترمینال بدون تغییر",
      ],
      en: [
        "Modern header (light): solid opaque white navbar over dark heroes — mega menu matched; dark + terminal unchanged",
      ],
    },
  },
  {
    version: "2.6.116",
    date: "2026-08-05",
    items: {
      fa: [
        "دکمهٔ ۵۶K: هاله‌های نارنجی/فیروزه‌ای نرم‌تر و کم‌رنگ‌تر (بلور بیشتر، بدون دایره‌های تیز)",
      ],
      en: [
        "56K FAB: softer, fainter orange/cyan blooms (more blur, no hard disc edges)",
      ],
    },
  },
  {
    version: "2.6.115",
    date: "2026-08-05",
    items: {
      fa: [
        "هدر مدرن (تم روشن): سطح نوبار شیشه‌ای سفید تمیز — تم تاریک و ترمینال بدون تغییر",
      ],
      en: [
        "Modern header (light theme): clean white glass navbar surface — dark theme and terminal unchanged",
      ],
    },
  },
  {
    version: "2.6.114",
    date: "2026-08-05",
    items: {
      fa: [
        "دکمهٔ ۵۶K: هم‌تراز با داک AI؛ سایه/بلوم/باینری مطابق فایل مرجع shiny-button (شامل هالهٔ ملایم در حالت عادی)",
      ],
      en: [
        "56K FAB: re-aligned to AI dock; bloom/shadow/binary matched to shiny-button HTML reference (subtle idle glow)",
      ],
    },
  },
  {
    version: "2.6.113",
    date: "2026-08-05",
    items: {
      fa: [
        "هدر مدرن: کاهش شدت شیشه‌ای منو و مگامنو (بلور و شیری کمتر، خوانایی بیشتر) — ترمینال بدون تغییر",
      ],
      en: [
        "Modern header: dialed down glass blur/milkiness on nav and mega menus for clearer surfaces — terminal unchanged",
      ],
    },
  },
  {
    version: "2.6.112",
    date: "2026-08-05",
    items: {
      fa: [
        "هدر مدرن: مگامنوی شیشه‌ای برای محصولات، خدمات، نمونه‌کارها و درباره ما (با توضیحات و آیکن) — ترمینال بدون تغییر",
      ],
      en: [
        "Modern header: glass mega menus for Products, Services, Portfolio, and About (icons + descriptions) — terminal unchanged",
      ],
    },
  },
  {
    version: "2.6.111",
    date: "2026-08-05",
    items: {
      fa: [
        "دکمهٔ ۵۶K: سایهٔ هاور دوباره دو‌رنگ نارنجی/فیروزه‌ای روشن (نسخهٔ اول) — بدون هاله در حالت عادی",
      ],
      en: [
        "56K FAB: restored vivid orange+cyan dual hover bloom (original look) — idle stays quiet",
      ],
    },
  },
  {
    version: "2.6.110",
    date: "2026-08-05",
    items: {
      fa: [
        "صفحه خدمات (مدرن): هیرو دوستونه، گرید ۸ کارت، فرآیند چهارگامی و CTA مشاوره — اسکین ترمینال بدون تغییر",
      ],
      en: [
        "Services page (modern): two-column hero, 8-card grid, four-step process, consult CTA — terminal skin unchanged",
      ],
    },
  },
  {
    version: "2.6.109",
    date: "2026-08-05",
    items: {
      fa: [
        "دکمهٔ ۵۶K: نورهای نارنجی/آبی هاور ملایم‌تر؛ برچسب با تایپ mono و گرادیان فیروزه‌ای؛ ارقام باینری پشت دکمه خلوت‌تر و جذاب‌تر",
      ],
      en: [
        "56K FAB: softer hover orange/cyan blooms; mono + cyan-tint label; calmer, more attractive binary digits behind",
      ],
    },
  },
  {
    version: "2.6.107",
    date: "2026-08-05",
    items: {
      fa: [
        "خانه (مدرن): CTA نهایی با پس‌زمینه سفید، پنل شیشه‌ای ملایم و نورهای مینت کم‌اشباع — ترمینال بدون تغییر",
      ],
      en: [
        "Home (modern): Final CTA on white with soft frosted-glass panel and whisper mint lights — terminal unchanged",
      ],
    },
  },
  {
    version: "2.6.106",
    date: "2026-08-05",
    items: {
      fa: [
        "هدر مدرن: هنگام اسکرول پس‌زمینه و هالهٔ شیشه‌ای برداشته می‌شود و بلور کمتر می‌شود — ترمینال بدون تغییر",
      ],
      en: [
        "Modern header: on scroll, clears fill/glow and reduces glass blur — terminal unchanged",
      ],
    },
  },
  {
    version: "2.6.105",
    date: "2026-08-05",
    items: {
      fa: [
        "دکمهٔ تعویض اسکین ۵۶K: هاله و سایهٔ رنگی فقط هنگام هاور/فوکوس — در حالت عادی فقط شیشه و برچسب",
      ],
      en: [
        "56K skin FAB: colored bloom/shadow only on hover/focus — idle shows glass pill + label only",
      ],
    },
  },
  {
    version: "2.6.104",
    date: "2026-08-05",
    items: {
      fa: [
        "هدر مدرن: نوار شیشه‌ای شناور (گلس، دکمه‌های دایره‌ای یکپارچه، برند با زیرعنوان) — ترمینال بدون تغییر",
      ],
      en: [
        "Modern header: floating glass navbar (blur, integrated circular actions, brand + subtitle) — terminal unchanged",
      ],
    },
  },
  {
    version: "2.6.103",
    date: "2026-08-05",
    items: {
      fa: [
        "دکمهٔ رفتن به بالا: ورود نرم‌تر از پایین (ease طولانی‌تر، جابه‌جایی کمتر)",
      ],
      en: [
        "Back-to-top: softer slide-up entrance (longer ease-out, gentler translate)",
      ],
    },
  },
  {
    version: "2.6.102",
    date: "2026-08-05",
    items: {
      fa: [
        "جستجوی مدرن: کارت بالاآمده (--ai-card)، سایه و گوشه گرد درست، فوتر نکات فشرده‌تر، بدون شستشوی پس‌زمینه صفحه",
      ],
      en: [
        "Modern search: elevated --ai-card surface, proper shadow/radius, denser tip footer — no page-wash background",
      ],
    },
  },

  {
    version: "2.6.101",
    date: "2026-08-05",
    items: {
      fa: [
        "خانه (مدرن): CTA نهایی با پس‌زمینهٔ عمیق‌تر و نورهای متحرک واضح‌تر (اورب‌های بزرگ + رگه‌های نور)",
      ],
      en: [
        "Home (modern): Final CTA with richer depth and clearly drifting lights (larger orbs + light streaks)",
      ],
    },
  },
  {
    version: "2.6.100",
    date: "2026-08-05",
    items: {
      fa: [
        "جستجوی مدرن: هم‌تراز command-06 — شِل مشترک، ترتیب پیشنهاد/اخیر/محبوب، خالی واقعی، Ctrl+K تاگل، بدون رینگ فوکوس سبز",
      ],
      en: [
        "Modern search: aligned to command-06 — shared shell, Suggestions/Recent/Popular order, real empty state, Ctrl+K toggle, no green focus ring",
      ],
    },
  },
  {
    version: "2.6.99",
    date: "2026-08-05",
    items: {
      fa: [
        "خانه (مدرن): سکشن CTA نهایی تمام‌عرض با نورهای پس‌زمینهٔ متحرک (سبز/فیروزه‌ای)، بدون کارت تو‌رفته",
      ],
      en: [
        "Home (modern): full-bleed Final CTA with drifting green/teal ambient lights — no inset card chrome",
      ],
    },
  },
  {
    version: "2.6.98",
    date: "2026-08-05",
    items: {
      fa: [
        "دکمه بازگشت به بالا (پایین-راست) در اسکین مدرن و ترمینال، با ظاهر هماهنگ هر اسکین",
      ],
      en: [
        "Back-to-top control (bottom-right) for modern and terminal skins, styled to each design language",
      ],
    },
  },
  {
    version: "2.6.97",
    date: "2026-08-05",
    items: {
      fa: [
        "خانه (مدرن): فاصله بالا/پایین بخش نظرات («حرف‌های واقعی») فشرده‌تر شد",
      ],
      en: [
        "Home (modern): tighter top/bottom spacing on the testimonials («Real Words») section",
      ],
    },
  },
  {
    version: "2.6.96",
    date: "2026-08-05",
    items: {
      fa: [
        "خانه (مدرن): تصویر بالای کارت‌های خدمات حرفه‌ای‌تر شد — آیکون اختصاصی هر خدمت، موتیف ظریف، بدون شلوغی FD و آیکون‌های شناور",
      ],
      en: [
        "Home (modern): service card top visuals upgraded — per-service focal icon, subtle motif, no cluttered FD hub + floating wireframes",
      ],
    },
  },
  {
    version: "2.6.95",
    date: "2026-08-05",
    items: {
      fa: [
        "هیرو Spline: اسکرول چرخ موس روی ربات دیگر کند/لگ نیست (اسکرول فوری والد + تبدیل delta خط به پیکسل)",
      ],
      en: [
        "Spline hero: mouse-wheel over the robot scrolls the page snappily again (instant parent scroll + LINE delta → px)",
      ],
    },
  },
  {
    version: "2.6.94",
    date: "2026-08-05",
    items: {
      fa: [
        "هیرو Spline: ربات فارسی سمت چپ / انگلیسی سمت راست با ?robot= (رفع حذف ?lang توسط proxy)؛ موس برای Look At/Follow؛ لبخند/States فقط با Variable در صحنه Spline",
      ],
      en: [
        "Spline hero: FA left / EN right via ?robot= (proxy strips ?lang); mouse Look At/Follow; smile/States only when Spline Variables exist",
      ],
    },
  },
  {
    version: "2.6.93",
    date: "2026-08-05",
    items: {
      fa: [
        "خانه (مدرن): افکت حرکت دکمه سبز کارت خدمات با transform روان شد (بدون لگ padding/left)؛ انیمیشن کارت‌های خارج از دید متوقف می‌شود",
      ],
      en: [
        "Home (modern): service-card green CTA hover uses smooth transform-only motion (no padding/left lag); pause offscreen card path loops",
      ],
    },
  },
  {
    version: "2.6.92",
    date: "2026-08-05",
    items: {
      fa: [
        "خانه (مدرن): افکت‌های پشت FAB اسکین (bloom، باینری، رینگ) برگشت؛ ظاهر پیل مثل دستیار AI حفظ شد",
      ],
      en: [
        "Home (modern): restore skin FAB behind-effects (blooms, binary, ring); keep AI-pill chrome",
      ],
    },
  },
  {
    version: "2.6.91",
    date: "2026-08-05",
    items: {
      fa: [
        "Grid Crossing: اتمسفر سینمایی‌تر، دیسک ماشین‌کاری با notch و رینگ انرژی، ribbon با light-wall، خروج با filament ضخیم‌تر",
      ],
      en: [
        "Grid Crossing: richer cinematic void, machined disc with notches + energy ring, light-wall ribbon, thicker exit filament",
      ],
    },
  },
  {
    version: "2.6.90",
    date: "2026-08-05",
    items: {
      fa: [
        "خانه (مدرن): FAB اسکین و پیل دستیار روی یک خط از پایین؛ FAB با همان گردی، پس‌زمینه شیشه‌ای و تایپ پیل AI",
      ],
      en: [
        "Home (modern): skin FAB and assistant pill share one bottom dock; FAB matches AI pill radius, glass bg, and type",
      ],
    },
  },
  {
    version: "2.6.88",
    date: "2026-08-05",
    items: {
      fa: [
        "دستیار چسبان: ضربدر بستن با mix-blend روی پس‌زمینه تیره سفید و روی روشن مشکی می‌شود",
      ],
      en: [
        "Sticky assistant: collapse X uses mix-blend so it reads white on dark and black on light",
      ],
    },
  },
  {
    version: "2.6.87",
    date: "2026-08-05",
    items: {
      fa: [
        "دستیار چسبان: رفع لگ/پرش انیمیشن باز شدن — حذف blur و morph؛ فقط opacity + transform",
      ],
      en: [
        "Sticky assistant: fix expand animation lag/snap — drop blur + layout morph; opacity + transform only",
      ],
    },
  },
  {
    version: "2.6.86",
    date: "2026-08-05",
    items: {
      fa: [
        "دستیار چسبان: انیمیشن باز/بسته شدن نرم‌تر (morph + spring) از مینی‌پیل به کامپوزر کامل",
      ],
      en: [
        "Sticky assistant: softer expand/collapse morph (shared layout + spring) from mini pill to full composer",
      ],
    },
  },
  {
    version: "2.6.85",
    date: "2026-08-05",
    items: {
      fa: [
        "هیرو مدرن Spline: ربات در فارسی سمت چپ و در انگلیسی سمت راست؛ متن و CTA در موبایل وسط‌چین",
      ],
      en: [
        "Modern Spline hero: robot framed left in FA / right in EN; mobile hero copy and CTAs center-aligned",
      ],
    },
  },
  {
    version: "2.6.84",
    date: "2026-08-05",
    items: {
      fa: [
        "پیش‌فرض فروش: نمای کسب‌وکار (Modern)؛ لینک کمپین ?skin=terminal یا ?view=builder",
        "سوئیچ اسکین: نام‌گذاری Business/Builder View؛ حفظ اسکرول هنگام Crossing",
        "هیرو: سلسله‌مراتب CTA — برآورد پروژه، نمونه‌کار، جهان 56K",
        "تماس: مسیرهای تشخیص / ساخت / رشد؛ ترمینال start/brief/contact با پیش‌پر فرم",
      ],
      en: [
        "Sales default: Business View (Modern); campaign links ?skin=terminal or ?view=builder",
        "Skin switch: Business/Builder View naming; scroll preserved across Crossing",
        "Hero CTA hierarchy: project assessment, portfolio, 56K world",
        "Contact: Diagnose / Build / Grow paths; terminal start/brief/contact prefills the form",
      ],
    },
  },
  {
    version: "2.6.83",
    date: "2026-08-05",
    items: {
      fa: [
        "هیرو مدرن Spline: ارتفاع تمام‌صفحه در لود اول؛ صحنه تمام‌عرض پشت متن تا ربات موس را در کل هیرو دنبال کند (اسکرول و CTA حفظ شد)",
      ],
      en: [
        "Modern Spline hero: full first-viewport height; full-bleed scene behind copy so the robot follows the mouse across the whole hero (wheel scroll and CTAs kept)",
      ],
    },
  },
  {
    version: "2.6.82",
    date: "2026-08-05",
    items: {
      fa: [
        "هیرو مدرن Spline: بازگشت به چیدمان دمو (کارت ۵۰۰px + Spotlight + فلکس متن/صحنه) با حفظ iframe برای اسکرول و دنبال‌کردن موس",
      ],
      en: [
        "Modern Spline hero: restored demo layout (500px Card + Spotlight + flex copy/scene) while keeping iframe scroll isolation and mouse-follow",
      ],
    },
  },

  {
    version: "2.6.81",
    date: "2026-08-05",
    items: {
      fa: [
        "دستیار چسبان: حالت پیش‌فرض مینی‌پیل؛ با کلیک با انیمیشن نرم (fade/blur/scale) به کامپوزر کامل باز می‌شود",
      ],
      en: [
        "Sticky assistant: default mini pill; click expands to the full composer with a soft fade/blur/scale motion",
      ],
    },
  },

  {
    version: "2.6.80",
    date: "2026-08-05",
    items: {
      fa: [
        "هیرو Spline: ربات دوباره موس را دنبال می‌کند؛ صحنه روی سمت چپ (پایان منطقی) و اسکرول چرخ از iframe به صفحه پاس می‌شود",
      ],
      en: [
        "Spline hero: robot follows the mouse again; scene on the logical end (left in FA) with wheel forwarded from the iframe to the page",
      ],
    },
  },
  {
    version: "2.6.79",
    date: "2026-08-05",
    items: {
      fa: [
        "سوئیچ AI↔۵۶K: بازگشت افکت Horizon برای ورود به AI؛ FAB بالای نوار چت؛ رفع قفل inert/mutex که کلیک را بی‌اثر می‌کرد",
      ],
      en: [
        "AI↔56K switch: restore Horizon enter-AI ceremony; FAB above sticky chat; clear stuck inert/mutex that made clicks do nothing",
      ],
    },
  },
  {
    version: "2.6.78",
    date: "2026-08-05",
    items: {
      fa: [
        "هیرو Spline: X-Frame-Options برای /embed روی SAMEORIGIN تا iframe صحنه بلاک نشود (اسکرول صفحه حفظ می‌شود)",
      ],
      en: [
        "Spline hero: allow SAMEORIGIN framing for /embed so the scene iframe is not blocked (page scroll stays free)",
      ],
    },
  },
  {
    version: "2.6.77",
    date: "2026-08-05",
    items: {
      fa: [
        "رفع قفل اسکرول صفحه: صحنه Spline هیرو داخل iframe ایزوله شد تا WebGL چرخ‌ماوس را روی سند اصلی مسدود نکند",
      ],
      en: [
        "Fix page scroll lock: isolate the Spline hero in an iframe so WebGL no longer traps wheel scrolling on the parent document",
      ],
    },
  },
  {
    version: "2.6.76",
    date: "2026-08-05",
    items: {
      fa: [
        "هدر: دکمه تماس فقط آیکن (مثل جستجو/سبد)؛ کلیک زیرمنوی تماس را باز می‌کند",
      ],
      en: [
        "Header: Contact is icon-only (like search/cart); click opens the contact submenu",
      ],
    },
  },
  {
    version: "2.6.75",
    date: "2026-08-05",
    items: {
      fa: [
        "دستیار چسبان مدرن: نوار جمع‌شده تمام‌عرض (سبک ChatGPT) به‌جای پیل باریک؛ عرض تا max-w-6xl روی دسکتاپ",
      ],
      en: [
        "Modern sticky assistant: full-width collapsed bar (ChatGPT-style) instead of a narrow chip; up to max-w-6xl on desktop",
      ],
    },
  },
  {
    version: "2.6.74",
    date: "2026-08-05",
    items: {
      fa: [
        "Grid Crossing: لودینگ مدرن Identity Disc؛ ورود AI کوتاه‌تر؛ خروج به ۵۶K با filament به‌سمت FAB و wipe موجود؛ بدون toast موفقیت",
      ],
      en: [
        "Grid Crossing: modern Identity Disc first-load; shorter Enter AI; Exit to 56K via FAB filament + existing wipe; no success toasts",
      ],
    },
  },
  {
    version: "2.6.73",
    date: "2026-08-05",
    items: {
      fa: [
        "هوم مدرن: هیرو Spline تمام‌عرض؛ متن «اولین دیتا» روی سمت شروع (راست در فارسی) و صحنه تمام‌صفحه پشت آن",
      ],
      en: [
        "Modern home: Spline hero full-bleed; brand copy on logical start (right in FA) with scene behind",
      ],
    },
  },
  {
    version: "2.6.72",
    date: "2026-08-05",
    items: {
      fa: [
        "هوم مدرن: جلوگیری از کرش هیرو Spline وقتی کلید i18n نیست؛ در صورت خطای CDN صحنه به‌صورت امن جایگزین می‌شود",
      ],
      en: [
        "Modern home: stop Spline hero crash when i18n keys are missing; degrade gracefully if the scene CDN fails",
      ],
    },
  },
  {
    version: "2.6.71",
    date: "2026-08-05",
    items: {
      fa: [
        "هوم مدرن: بخش «چرا اولین دیتا» با مارکی نظرات مشتریان جایگزین شد؛ اسکین ترمینال بدون تغییر",
      ],
      en: [
        "Modern home: replace “Why First Data” with a testimonial marquee; terminal skin unchanged",
      ],
    },
  },
  {
    version: "2.6.70",
    date: "2026-08-05",
    items: {
      fa: [
        "هوم مدرن — کارت‌های خدمات: آیکن‌های ماهواره‌ای مرتبط با هر سرویس + کوچک‌تر شدن گرافیک hub؛ ترمینال بدون تغییر",
      ],
      en: [
        "Modern home — service cards: per-service satellite icons + smaller hub graphic; terminal unchanged",
      ],
    },
  },
  {
    version: "2.6.69",
    date: "2026-08-05",
    items: {
      fa: [
        "دکمه‌های CTA مدرن (فارسی/RTL): فلش آیکن برعکس (ArrowUpLeft) و چرخش هاور آینه‌ای؛ ترمینال بدون تغییر",
      ],
      en: [
        "Modern CTAs (FA/RTL): reverse arrow icon (ArrowUpLeft) and mirrored hover rotate; terminal unchanged",
      ],
    },
  },
  {
    version: "2.6.68",
    date: "2026-08-05",
    items: {
      fa: [
        "هوم مدرن: حذف خط «وب.موبایل.دسکتاپ.سئو، تحویل‌شده» از هیرو؛ اسکین ترمینال بدون تغییر",
      ],
      en: [
        "Modern home: remove “web.mobile.desktop.seo, delivered” eyebrow from hero; terminal skin unchanged",
      ],
    },
  },
  {
    version: "2.6.67",
    date: "2026-08-05",
    items: {
      fa: [
        "سبد خرید: QA بصری — رفع پریدن خط/بوردر، کارت inset با overflow-hidden، Progress و ScrollArea مطابق drawer-02",
      ],
      en: [
        "Cart: visual QA — fix overflowing borders, inset card overflow-hidden, Progress and ScrollArea matching drawer-02",
      ],
    },
  },
  {
    version: "2.6.66",
    date: "2026-08-05",
    items: {
      fa: [
        "رفع ۴۰۴ مسیرهای /auth/* و /api/auth/* ناشی از کش خراب Turbopack؛ گارد dev برای پاک‌سازی کش",
      ],
      en: [
        "Fix /auth/* and /api/auth/* 404s from a corrupted Turbopack cache; harden dev cache wipe guard",
      ],
    },
  },
  {
    version: "2.6.65",
    date: "2026-08-05",
    items: {
      fa: [
        "هوم مدرن: هیرو Spline سه‌بعدی تعاملی با Spotlight و کارت تمام‌عرض؛ اسکین ترمینال بدون تغییر",
      ],
      en: [
        "Modern home: interactive Spline 3D hero with Spotlight and full-bleed card; terminal skin unchanged",
      ],
    },
  },
  {
    version: "2.6.64",
    date: "2026-08-05",
    items: {
      fa: [
        "سبد خرید: اصلاح overflow خط‌ها و بوردرها، کارت inset گرد، Progress و اسکرول افقی پیشنهادها مطابق drawer-02",
      ],
      en: [
        "Cart: fix overflowing borders/separators, inset rounded card, Progress and suggestion scroll matching drawer-02",
      ],
    },
  },
  {
    version: "2.6.63",
    date: "2026-08-05",
    items: {
      fa: [
        "هوم مدرن: باکس‌های خدمات در گرید ۴ ستونه (۲ ردیف × ۴ کارت) با پدینگ متناسب",
      ],
      en: [
        "Modern home: services boxes in a 4-column grid (2×4) with tighter card padding",
      ],
    },
  },
  {
    version: "2.6.62",
    date: "2026-08-05",
    items: {
      fa: [
        "سبد خرید: دراور خالی به‌صورت پیش‌فرض تا افزودن کالا؛ empty-state، پیشنهادها، و ذخیره در localStorage",
      ],
      en: [
        "Cart: drawer starts empty until items are added; empty-state, suggestions, and localStorage persistence",
      ],
    },
  },
  {
    version: "2.6.61",
    date: "2026-08-05",
    items: {
      fa: [
        "هوم مدرن: هیرو Mainframe — ویدیوی scrub با موس، اینترو بلور، تایپ‌رایتر و دکمه‌های قرصی دو زبانه",
      ],
      en: [
        "Modern home: Mainframe hero — mouse-scrub video, blurred intro, typewriter, bilingual action pills",
      ],
    },
  },
  {
    version: "2.6.60",
    date: "2026-08-05",
    items: {
      fa: [
        "جستجوی مدرن: تریگر هدر دوباره آیکن گرد؛ مودال مطابق command-06 (دیالوگ max-w-lg و فوتر راهنما)",
      ],
      en: [
        "Modern search: header trigger restored to round icon; modal still matches command-06 (max-w-lg dialog + tip footer)",
      ],
    },
  },
  {
    version: "2.6.59",
    date: "2026-08-05",
    items: {
      fa: [
        "سبد خرید: دراور drawer-02 هم‌تراز دمو — کارت inset گوشه‌گرد، Progress ارسال رایگان، پیشنهادها و کنترل تعداد",
      ],
      en: [
        "Cart: drawer-02 matched to demo — inset rounded card, free-shipping Progress, suggestions, qty controls",
      ],
    },
  },
  {
    version: "2.6.58",
    date: "2026-08-05",
    items: {
      fa: [
        "جستجوی مدرن: دیزاین مطابق command-06 — تریگر outline+Kbd، دیالوگ max-w-lg، فوتر راهنما، رفع gap دیالوگ",
      ],
      en: [
        "Modern search: matched to command-06 — outline+Kbd trigger, max-w-lg dialog, tip footer, dialog gap fix",
      ],
    },
  },
  {
    version: "2.6.57",
    date: "2026-08-05",
    items: {
      fa: [
        "پنل (مدرن): جدول‌های داده با الگوی table-01 — کارت، چک‌باکس، آیکن، پیشرفت و منوی عملیات",
        "دمو /table-01 و کامپوننت‌های shadcn table/checkbox/dropdown-menu",
      ],
      en: [
        "Panel (modern): data tables restyled to table-01 — card, checkbox, icon, progress, action menu",
        "Demo /table-01 plus shadcn table/checkbox/dropdown-menu primitives",
      ],
    },
  },
  {
    version: "2.6.56",
    date: "2026-08-05",
    items: {
      fa: [
        "پنل/ادمین (مدرن): empty-state-06 برای جداول و لیست‌های خالی با عنوان، توضیح و CTA",
        "بلوک دمو: مسیر /empty-state-06",
      ],
      en: [
        "Panel/admin (modern): empty-state-06 for empty tables and lists with title, description, and CTA",
        "Demo block: /empty-state-06 route",
      ],
    },
  },
  {
    version: "2.6.55",
    date: "2026-08-05",
    items: {
      fa: [
        "مدرن: اسلایدر ضخیم slider-04؛ استپر فرم‌های تماس؛ آکاردئون FAQ؛ جستجوی Command؛ سبد drawer؛ AnimatedTabs؛ اسپینر LiquidWave؛ بدون preloader سایت (ترمینال دست‌نخورده)",
      ],
      en: [
        "Modern: thick slider-04; contact form steppers; FAQ accordion; Command search; cart drawer; AnimatedTabs; LiquidWave spinner; no site preloader (terminal unchanged)",
      ],
    },
  },
  {
    version: "2.6.54",
    date: "2026-08-05",
    items: {
      fa: [
        "دکمه‌های CTA اصلی (مدرن): استایل قرص کشویی با آیکن ArrowUpRight — هدر، هیرو، خدمات، محصول و CTA نهایی",
      ],
      en: [
        "Primary CTAs (modern): sliding-pill + ArrowUpRight style — header, hero, services, product, and final CTA",
      ],
    },
  },
  {
    version: "2.6.53",
    date: "2026-08-05",
    items: {
      fa: [
        "آمار (مدرن): انیمیشن NumberTicker برای اعداد هیرو، درباره ما و محصول — ترمینال بدون تغییر",
      ],
      en: [
        "Stats (modern): NumberTicker animation for hero, about, and product numbers — terminal unchanged",
      ],
    },
  },
  {
    version: "2.6.52",
    date: "2026-08-05",
    items: {
      fa: [
        "دستیار مدرن: نوار چت استیکی به‌صورت مینی (قرص شناور) — کلیک برای باز شدن کامل Prompt؛ Escape / بیرون / بستن برای جمع شدن",
      ],
      en: [
        "Modern assistant: sticky chat defaults to a mini floating pill — click to expand full Prompt; Escape / outside / collapse to shrink",
      ],
    },
  },
  {
    version: "2.6.51",
    date: "2026-08-05",
    items: {
      fa: [
        "خانه (مدرن): کارت Integration برای هر خدمت با عنوان، توضیح و CTA همان خدمت",
      ],
      en: [
        "Home (modern): one Integration Card per service, driven by that service’s title, description, and CTA",
      ],
    },
  },
  {
    version: "2.6.50",
    date: "2026-08-05",
    items: {
      fa: [
        "CTA نهایی (مدرن): باکس وایدتر با کنتراست بهتر روی پس‌زمینه روشن",
      ],
      en: [
        "Final CTA (modern): wider box with stronger contrast on light background",
      ],
    },
  },
  {
    version: "2.6.49",
    date: "2026-08-05",
    items: {
      fa: [
        "خانه (مدرن): حذف بلوک «از اولین دیتا بپرسید» و چیپ‌های پیشنهاد — چت فقط از نوار استیکی پایین",
      ],
      en: [
        "Home (modern): removed mid-page “Ask First Data” block and suggestion chips — chat stays in the sticky bottom bar",
      ],
    },
  },
  {
    version: "2.6.48",
    date: "2026-08-05",
    items: {
      fa: [
        "دستیار مدرن: نوار Prompt استیکی پایین صفحه + مودال پاسخ استایل ChatGPT؛ اتصال به ParsPack با grounding اولین دیتا",
      ],
      en: [
        "Modern assistant: sticky bottom PromptInputBox + ChatGPT-style answer modal; ParsPack grounded on First Data",
      ],
    },
  },
  {
    version: "2.6.47",
    date: "2026-08-05",
    items: {
      fa: [
        "CTA نهایی (مدرن): بلاک شادسی‌ان cta-01 واید برای «نیازتان را برایمان بنویسید»",
      ],
      en: [
        "Final CTA (modern): wide shadcn cta-01 block for “Tell us what you need”",
      ],
    },
  },
  {
    version: "2.6.46",
    date: "2026-08-05",
    items: {
      fa: [
        "وبلاگ (مدرن): صفحه‌بندی Interactive Jump شادسی‌ان (pagination-03) — پرش به صفحه با کلیک روی شماره",
      ],
      en: [
        "Blog (modern): shadcn Interactive Jump pagination (pagination-03) — click page number to jump",
      ],
    },
  },
  {
    version: "2.6.45",
    date: "2026-08-05",
    items: {
      fa: [
        "بردکرامب مدرن: استایل outline شادسی‌ان (breadcrumb-03) با دکمه‌های عقب/جلو در مسیر هدایت",
      ],
      en: [
        "Modern breadcrumb: shadcn outline trail (breadcrumb-03) with back/forward controls",
      ],
    },
  },
  {
    version: "2.6.44",
    date: "2026-08-05",
    items: {
      fa: [
        "خانه / خدمات (مدرن): کارت Integration شادسی‌ان (card-19) به‌جای گرید قدیمی",
      ],
      en: [
        "Home / Services (modern): shadcn Integration card (card-19) replaces the old grid",
      ],
    },
  },
  {
    version: "2.6.43",
    date: "2026-08-05",
    items: {
      fa: [
        "دکمه ورود AI / ۵۶K: فونت فارسی مثل ترمینال (Rooyin)",
      ],
      en: [
        "Enter AI / 56K FAB: Persian face uses terminal Rooyin font",
      ],
    },
  },
  {
    version: "2.6.42",
    date: "2026-08-05",
    items: {
      fa: [
        "چت مدرن: باکس‌های آماده + نوار Composer؛ پاسخ در مودال؛ اتصال به ParsPack با grounding فقط درباره محصولات و خدمات اولین دیتا",
      ],
      en: [
        "Modern chat: ready prompt boxes + Composer bar; answers in a modal; ParsPack AI grounded only on First Data products & services",
      ],
    },
  },
  {
    version: "2.6.41",
    date: "2026-08-05",
    items: {
      fa: [
        "Alert Stack پایین‌راست: اعلان‌های پشته‌ای برای فرم، آپلود، ورود، اسکین، تب جدید، کپی و آفلاین",
      ],
      en: [
        "Bottom-right Alert Stack: stacked toasts for forms, uploads, sign-in, skin switch, new tabs, copy, and offline",
      ],
    },
  },
  {
    version: "2.6.40",
    date: "2026-08-05",
    items: {
      fa: [
        "دکمه سوئیچ اسکین: shiny binary — مدرن با طیف نارنجی/بنفش/آبی، ترمینال با فسفر سبز + آیکون و متن وسط",
      ],
      en: [
        "Skin FAB: shiny binary button — modern orange/purple/blue spectrum, terminal phosphor green + center icon & label",
      ],
    },
  },
  {
    version: "2.6.39",
    date: "2026-08-05",
    items: {
      fa: [
        "رفع: دکمه «ورود به دنیای AI» دوباره کار می‌کند — cleanup دیگر مراسم را در Strict Mode قطع نمی‌کند",
      ],
      en: [
        "Fix: «Enter AI world» works again — cleanup no longer aborts the ceremony under React Strict Mode",
      ],
    },
  },
  {
    version: "2.6.38",
    date: "2026-08-05",
    items: {
      fa: [
        "رفع باگ: لایه سیاه Horizon دیگر روی سایت گیر نمی‌کند — timeout اضطراری + آزادسازی کلیک",
        "dev: اجازه 127.0.0.1 در کنار localhost برای HMR/فونت",
      ],
      en: [
        "Fix: Horizon black overlay can no longer trap the page — safety timeout + click release",
        "dev: allow 127.0.0.1 alongside localhost for HMR/fonts",
      ],
    },
  },
  {
    version: "2.6.37",
    date: "2026-08-05",
    items: {
      fa: [
        "ترنزیشن Horizon: مراسم title-card — فقط برند، یک خط وضعیت و ریل نازک؛ HUD کابین حذف شد",
        "پایان یکپارچه با --fd-land/--fd-fade؛ طلوع سه‌بعدی قوی‌تر؛ کپی احساسی‌تر ورود به دنیای AI",
      ],
      en: [
        "Horizon transition: title-card ceremony — brand, one status line, thin rail; cockpit HUD removed",
        "Unified ending via --fd-land/--fd-fade; stronger 3D crest bloom; warmer enter-AI copy",
      ],
    },
  },
  {
    version: "2.6.36",
    date: "2026-08-04",
    items: {
      fa: [
        "ترنزیشن Horizon: باگ پایان رفع شد — Framer دیگر opacity را قفل نمی‌کند؛ dissolve فقط با --fd-fade",
        "wash نرم‌تر، unmount فوری بعد از محو کامل، اسکرول بعد از خروج تا پایان یکپارچه بماند",
      ],
      en: [
        "Horizon transition: ending fix — Framer no longer locks opacity; dissolve owned by --fd-fade only",
        "Softer wash, instant unmount after full fade, scroll deferred so the landing stays one piece",
      ],
    },
  },
  {
    version: "2.6.35",
    date: "2026-08-04",
    items: {
      fa: [
        "ترنزیشن Horizon: پایان کاملاً یکپارچه — از finale یک dissolve واحد تا اسکین AI بدون فاز خروج جدا",
        "letterbox و wash و محو برند با --fd-landing/--fd-fade هم‌زمان پیش می‌روند",
      ],
      en: [
        "Horizon transition: fully cohesive ending — one dissolve from finale into the AI skin, no separate exit beat",
        "Letterbox, wash and brand fade advance together via --fd-landing/--fd-fade",
      ],
    },
  },
  {
    version: "2.6.34",
    date: "2026-08-04",
    items: {
      fa: [
        "ترنزیشن Horizon: پایان یکپارچه — wash گرم از finale تا dissolve بدون iris و فلش دوم",
        "کروم و صحنه با --fd-landing هم‌زمان محو می‌شوند؛ brand نرم در دنیای AI فرود می‌آید",
      ],
      en: [
        "Horizon transition: cohesive ending — warm wash from finale through dissolve, no iris or second flash",
        "Chrome and scene fade on one --fd-landing curve; brand settles softly into the AI world",
      ],
    },
  },
  {
    version: "2.6.33",
    date: "2026-08-04",
    items: {
      fa: [
        "ترنزیشن Horizon سینمایی‌تر: pre-roll قفل سیگنال، چگالی کروم بر اساس بیت، ghost برند در handshake",
        "خروج iris، letterbox بازشونده، اسپراکت فیلم، صدای استریو و زمان‌بندی طولانی‌تر برای نفس‌کشیدن صحنه",
      ],
      en: [
        "Horizon transition more cinematic: signal-lock pre-roll, beat-based chrome density, brand ghost on handshake",
        "Iris exit, opening letterbox, film sprockets, stereo modem audio and longer timing for breathing room",
      ],
    },
  },
  {
    version: "2.6.32",
    date: "2026-08-04",
    items: {
      fa: [
        "ترنزیشن Horizon: صدای مودم هم‌فاز با بیت‌ها + لرزش دوربین و CRT roll روی CONNECT",
        "تله‌متری حرفه‌ای‌تر: SNR/LINK، نشان REC، فوران شهاب در کلیمکس و مسیر دوربین با crest دست‌دهی",
      ],
      en: [
        "Horizon transition: modem audio synced to beats + camera shake and CRT roll on CONNECT",
        "Richer telemetry: SNR/LINK, REC tally, climax meteor volley and handshake-crest camera rail",
      ],
    },
  },
  {
    version: "2.6.31",
    date: "2026-08-04",
    items: {
      fa: [
        "ترنزیشن Horizon: تونل نور دست‌دهی + جریان بسته‌های دیتا در صحنه سه‌بعدی",
        "درجه‌بندی رنگ مرحله‌ای CRT سبز → کهربایی Handshake → طلوع AI؛ افتریمیج فسفر و آرام‌شدن کروم در پایان",
      ],
      en: [
        "Horizon transition: handshake light tunnel + packet data streams in the 3D scene",
        "Phase color grade CRT green → handshake amber → AI dawn; phosphor afterimage and quieter chrome on arrival",
      ],
    },
  },
  {
    version: "2.6.30",
    date: "2026-08-04",
    items: {
      fa: [
        "ترنزیشن Horizon: صدای دست‌دهی مودم (Web Audio) + ترمینال CRT بوت و کوریوگرافی دقیق‌تر بیت‌ها",
        "مسیر دوربین و زمان‌بندی برای Dial-up → Handshake → Uplink → AI بازنویسی شد",
      ],
      en: [
        "Horizon transition: procedural modem handshake audio (Web Audio) + CRT boot terminal and tighter beat choreography",
        "Camera path and timing rewritten for Dial-up → Handshake → Uplink → AI",
      ],
    },
  },
  {
    version: "2.6.29",
    date: "2026-08-04",
    items: {
      fa: [
        "ترنزیشن Horizon حرفه‌ای‌تر: پنل مودم با LEDهای OH/CD/RD/SD، بالا رفتن BAUD، لاگ AT و اسپکتروم حامل",
        "افکت CRT کامل‌تر: انحنای لوله، جداسازی RGB، حلقه‌های سیگنال و ستون‌های دیتا روی شبکه",
      ],
      en: [
        "Horizon transition polished: modem faceplate with OH/CD/RD/SD LEDs, climbing BAUD, AT log and carrier spectrum",
        "Richer CRT era: tube curvature, RGB split, signal rings and data columns on the grid",
      ],
    },
  },
  {
    version: "2.6.28",
    date: "2026-08-04",
    items: {
      fa: [
        "Logo Cloud مدرن: لوپ یکدست بدون پر شدن از چپ هنگام لود",
      ],
      en: [
        "Modern Logo Cloud: seamless loop without left-fill flash on load",
      ],
    },
  },
  {
    version: "2.6.27",
    date: "2026-08-04",
    items: {
      fa: [
        "ترنزیشن Horizon: پس‌زمینه از دوران Dial-up/CRT به دنیای AI مورف می‌شود — اسکین‌لاین، شبکه مودم، فسفر سبز و طلوع AI",
        "متن‌ها و مراحل HUD با روایت ۵۶K → دست‌دهی → آپلینک → AI هماهنگ شد",
      ],
      en: [
        "Horizon transition: background morphs from Dial-up/CRT into the AI world — scanlines, modem grid, phosphor green and AI dawn",
        "HUD copy and beats aligned to 56K → handshake → uplink → AI",
      ],
    },
  },
  {
    version: "2.6.26",
    date: "2026-08-04",
    items: {
      fa: [
        "نسخه مدرن: نوار کلمات هیرو با Logo Cloud بی‌نهایت (Efferd) جایگزین شد",
      ],
      en: [
        "Modern skin: hero keyword strip replaced with Efferd infinite Logo Cloud",
      ],
    },
  },
  {
    version: "2.6.25",
    date: "2026-08-04",
    items: {
      fa: [
        "ترنزیشن Horizon حرفه‌ای‌تر شد: شعاع نور، فلر لنز، شهاب، محو ستاره‌ها، خط نور ستیغ و ذرات غبار",
        "HUD سینمایی کامل‌تر: براکت قاب فیلم، تله‌متری زنده دوربین، نشان‌گر مراحل و خط جداکننده تایپ",
      ],
      en: [
        "Horizon transition polished: god rays, lens flare, meteors, star fade, ridge rim light and dust motes",
        "Richer cinematic HUD: film-gate brackets, live camera telemetry, beat pills and type rule",
      ],
    },
  },
  {
    version: "2.6.24",
    date: "2026-08-04",
    items: {
      fa: [
        "ترنزیشن Horizon: متن‌ها به لایه HUD مستقل منتقل شدند — همیشه خوانا روی همه افکت‌ها، با تایم‌کد، شمارنده مرحله و نوار پیشرفت سینمایی",
        "صحنه طلوع بازسازی شد — خورشید واقعی با هاله نرم، خط افق پیوسته و حذف آرتیفکت‌های هندسی",
      ],
      en: [
        "Horizon transition: copy moved to a dedicated HUD layer — always legible above all effects, with timecode, beat counter and cinematic progress rail",
        "Dawn scene rebuilt — believable sun with soft halo, continuous horizon line, geometry artifacts removed",
      ],
    },
  },
  {
    version: "2.6.23",
    date: "2026-08-04",
    items: {
      fa: [
        "ترنزیشن Horizon: پایان بازنویسی شد — فرود آرام، شکوفایی نور گرم و دیزالو نرم به‌جای فلاش سفید",
      ],
      en: [
        "Horizon transition: reworked ending — settled landing, warm light bloom and soft dissolve instead of a white flash",
      ],
    },
  },
  {
    version: "2.6.22",
    date: "2026-08-04",
    items: {
      fa: [
        "ترنزیشن Horizon: پالت واقعی طلوع (نیلی/کهربایی) به‌جای سبز و حرکت نرم‌تر",
      ],
      en: [
        "Horizon transition: realistic dawn palette (indigo/amber) and smoother motion",
      ],
    },
  },
  {
    version: "2.6.21",
    date: "2026-08-04",
    items: {
      fa: [
        "ورود به دنیای AI: ترنزیشن Horizon سینمایی‌تر (طلوع خورشید، letterbox، فلاش اوج)",
      ],
      en: [
        "Enter AI world: more cinematic Horizon transition (sun rise, letterbox, climax flash)",
      ],
    },
  },
  {
    version: "2.6.20",
    date: "2026-08-04",
    items: {
      fa: [
        "ورود به دنیای AI: صحنه سه‌بعدی Horizon (Three.js) هنگام سوئیچ از ۵۶K",
      ],
      en: [
        "Enter AI world: Three.js Horizon scene on switch from 56K skin",
      ],
    },
  },
  {
    version: "2.6.19",
    date: "2026-08-04",
    items: {
      fa: [
        "ورود به دنیای AI: ترنزیشن سینمایی Horizon Crossing هنگام سوئیچ از ۵۶K",
      ],
      en: [
        "Enter AI world: cinematic Horizon Crossing transition from 56K skin",
      ],
    },
  },
  {
    version: "2.6.18",
    date: "2026-08-04",
    items: {
      fa: [
        "هیرو مدرن: کنتراست دکمه مشاوره در تم روشن اصلاح شد",
      ],
      en: [
        "Modern hero: consult CTA contrast fixed in light theme",
      ],
    },
  },
  {
    version: "2.6.17",
    date: "2026-08-04",
    items: {
      fa: [
        "هیرو مدرن: CTAها داخل کادر گرد ماندند (دیگر از گوشه بیرون نمی‌زنند)",
      ],
      en: [
        "Modern hero: CTAs stay inside the rounded stage (no edge overflow)",
      ],
    },
  },
  {
    version: "2.6.16",
    date: "2026-08-04",
    items: {
      fa: [
        "اسکین ترمینال: حذف فلش لودینگ/هیرو مدرن قبل از ترمینال (کوکی SSR + hydrate gate)",
      ],
      en: [
        "Terminal skin: no modern preloader/hero flash before terminal (SSR cookie + hydrate gate)",
      ],
    },
  },
  {
    version: "2.6.15",
    date: "2026-08-04",
    items: {
      fa: [
        "هیرو مدرن: Prisma-style سینمایی با ویدیو پس‌زمینه و word-reveal (ترمینال بدون تغییر)",
      ],
      en: [
        "Modern hero: cinematic Prisma-style video + word reveal (terminal hero unchanged)",
      ],
    },
  },
  {
    version: "2.6.14",
    date: "2026-08-04",
    items: {
      fa: [
        "پریلودر مدرن: Logo Trace روی مونوگرام FD (ترمینال بدون تغییر)",
      ],
      en: [
        "Modern preloader: Logo Trace on FD monogram (terminal boot unchanged)",
      ],
    },
  },
  {
    version: "2.6.13",
    date: "2026-08-04",
    items: {
      fa: [
        "پریلودر ترمینال: boot جدا از مدرن + قفل اسکین تا پایان لودینگ تا متن تایپی دیده شود",
      ],
      en: [
        "Terminal preloader: separate boot from modern + skin lock until boot ends so typing is visible",
      ],
    },
  },
  {
    version: "2.6.12",
    date: "2026-08-04",
    items: {
      fa: [
        "اسکین: حالت ترمینال بعد از رفرش حفظ می‌شود (localStorage اولویت دارد)",
        "پریلودر: اجرای یک‌باره پایدار بدون ریست در Strict Mode",
      ],
      en: [
        "Skin: terminal mode persists after refresh (localStorage wins)",
        "Preloader: stable one-shot boot that survives Strict Mode remounts",
      ],
    },
  },
  {
    version: "2.6.11",
    date: "2026-08-04",
    items: {
      fa: [
        "پریلودر: رفع رفرش دوبل اول بازدید — سرویس‌ورکر دیگر صفحه را بعد از claim اول reload نمی‌کند",
      ],
      en: [
        "Preloader: fix double first-load refresh — service worker no longer reloads on first claim",
      ],
    },
  },
  {
    version: "2.6.10",
    date: "2026-08-04",
    items: {
      fa: [
        "فوتر: آیکن شبکه‌های اجتماعی با Streamline Core (مدرن) و Pixel (ترمینال) جایگزین شد",
      ],
      en: [
        "Footer: social icons now use Streamline Core (modern) and Pixel (terminal)",
      ],
    },
  },
  {
    version: "2.6.9",
    date: "2026-08-04",
    items: {
      fa: [
        "مدرن: آیکن‌ها با Streamline Core به‌صورت SVG جایگزین شدند — هدر، سرویس/محصول، تماس و دستیار",
      ],
      en: [
        "Modern: icons swapped to Streamline Core SVGs — header, service/product, contact, and assistant glyphs",
      ],
    },
  },
  {
    version: "2.6.8",
    date: "2026-08-04",
    items: {
      fa: ["تماس: دراپ‌داون خدمات در اسکین ترمینال با پنل تیره هم‌سبک CRT جایگزین شد"],
      en: ["Contact: service dropdown in terminal skin now uses a dark CRT-matched panel"],
    },
  },
  {
    version: "2.6.7",
    date: "2026-08-04",
    items: {
      fa: [
        "ترمینال: آیکن‌ها با Streamline Pixel (سبک پیکسلی) جایگزین شدند — هدر، سرویس/محصول، تماس",
      ],
      en: [
        "Terminal: icons swapped to Streamline Pixel set — header, service/product, and contact glyphs",
      ],
    },
  },
  {
    version: "2.6.6",
    date: "2026-08-04",
    items: {
      fa: ["تماس: متن ایمیل و شماره از نوار آیکن حذف شد و فقط آیکن‌های tooltipدار باقی ماندند"],
      en: ["Contact: email and phone text were removed from the icon row, leaving tooltip-only icons"],
    },
  },
  {
    version: "2.6.5",
    date: "2026-08-04",
    items: {
      fa: ["پریلودر: لودینگ و تایپ اولیه ترمینال دوباره به‌صورت مستقل از اسکین AI اجرا می‌شود"],
      en: ["Preloader: terminal first-load typing now runs independently from the AI skin state"],
    },
  },
  {
    version: "2.6.4",
    date: "2026-08-04",
    items: {
      fa: ["آپلودها: فرم‌های پروژه/همکاری/رزومه و بخش‌های تیکت و ادمین به حالت drag-and-drop یکپارچه شدند"],
      en: ["Uploads: project/collaboration/resume forms plus ticket and admin upload areas now use a unified drag-and-drop flow"],
    },
  },
  {
    version: "2.6.3",
    date: "2026-08-04",
    items: {
      fa: ["تماس: آیکن واتساپ/تلگرام/نقشه با tooltip + مودال نقشه و حذف عنوان مستقیم و دکمه‌های قبلی"],
      en: ["Contact: WhatsApp/Telegram/map icon buttons with tooltips + map modal; removed direct-contact header and previous buttons"],
    },
  },
  {
    version: "2.6.2",
    date: "2026-08-04",
    items: {
      fa: ["تماس: آیکن ایمیل/تلفن با تولتیپ + حذف واتساپ/تلگرام و عنوان مستقیم، مودال نقشه با لوکیشن"],
      en: ["Contact: email/phone icons with tooltips + remove WhatsApp/Telegram and direct header, map modal with location"],
    },
  },
  {
    version: "2.6.1",
    date: "2026-08-04",
    items: {
      fa: ["تماس: حذف باکس وضعیت/تخصص از سایدبار"],
      en: ["Contact: remove status/expertise sidebar box"],
    },
  },
  {
    version: "2.6.0",
    date: "2026-08-04",
    items: {
      fa: [
        "تماس با ما: اسکین AI کامل + سایدبار واقعی (آدرس، tel، واتساپ/تلگرام/نقشه)",
        "مسیرهای درخواست پروژه / مشاوره / همکاری روی صفحه؛ اعتبارسنجی خدمت؛ متادیتای دوزبانه",
      ],
      en: [
        "Contact: full AI skin + real sidebar (address, tel, WhatsApp/Telegram/map)",
        "Project / consult / collaborate paths on-page; service validation; bilingual meta",
      ],
    },
  },
  {
    version: "2.5.0",
    date: "2026-07-20",
    items: {
      fa: [
        "اسکین AI: مودال/InnerPage/خدمات/About بدون CRT",
        "Hero با CTA دستیار، محصول و FAQ و دمو ادیتوریال",
        "۴۰۴، لودینگ مسیر، Auth، نمونه‌کار و بلاگ هم‌سبک SaaS",
      ],
      en: [
        "AI skin: modals/InnerPage/services/About without CRT chrome",
        "Hero assistant CTA; editorial product demo & FAQ",
        "404, route loading, Auth, portfolio & blog match SaaS shell",
      ],
    },
  },
  {
    version: "2.4.2",
    date: "2026-07-19",
    items: {
      fa: [
        "چت: دیگر با Too Many Requests قطع نمی‌شود — لاگ نرم + سقف بالاتر",
      ],
      en: [
        "Chat: no more Too Many Requests from logging — soft skip + higher limit",
      ],
    },
  },
  {
    version: "2.4.1",
    date: "2026-07-19",
    items: {
      fa: [
        "رفع بیلد: SQLite دیگر به باندل کلاینت چت کشیده نمی‌شود",
      ],
      en: [
        "Build fix: keep SQLite out of the assistant client bundle",
      ],
    },
  },
  {
    version: "2.4.0",
    date: "2026-07-19",
    items: {
      fa: [
        "چت AI حرفه‌ای: پاسخ کلیدواژه‌ای (قیمت/خدمات/زمان)، لینک‌های قابل کلیک، Stop و گفتگوی جدید",
        "ادمین: پیش‌نویس → انتشار جواب + آمار unmatched؛ شفافیت دستیار اسکریپتی",
      ],
      en: [
        "Pro AI chat: keyword FAQ (pricing/services/timeline), clickable links, Stop & new chat",
        "Admin: draft → publish answers + unmatched stats; scripted-assistant disclaimer",
      ],
    },
  },
  {
    version: "2.3.1",
    date: "2026-07-19",
    items: {
      fa: [
        "چت AI: حالت «در حال فکر کردن» با زمان متفاوت برای هر پیام، بعد تایپ پاسخ",
      ],
      en: [
        "AI chat: per-message Thinking pause with variable duration, then typed reply",
      ],
    },
  },
  {
    version: "2.3.0",
    date: "2026-07-19",
    items: {
      fa: [
        "اسکین AI: ترمینال خانه به چت شبیه ChatGPT تبدیل شد (همان پاسخ‌های قبلی)",
        "ذخیره سؤالات کاربران از ترمینال و چت + صفحه ادمین «سؤالات دستیار»",
      ],
      en: [
        "AI skin: homepage terminal becomes a ChatGPT-style chat (same scripted replies)",
        "Log visitor questions from terminal & chat + admin «Assistant Qs» page",
      ],
    },
  },
  {
    version: "2.2.4",
    date: "2026-07-19",
    items: {
      fa: [
        "Keenicons فقط در اسکین AI؛ حالت ترمینال دوباره آیکون‌های خطی قبلی را دارد",
      ],
      en: [
        "Keenicons only in AI skin; terminal mode keeps the previous line icons",
      ],
    },
  },
  {
    version: "2.2.3",
    date: "2026-07-19",
    items: {
      fa: [
        "آیکون‌ها: Keenicons (Metronic) — outline/solid/filled/duotone، TermIcon و آیکون‌های هدر/منو",
      ],
      en: [
        "Icons: Keenicons (Metronic) — outline/solid/filled/duotone for TermIcon and header/menu glyphs",
      ],
    },
  },
  {
    version: "2.2.2",
    date: "2026-07-19",
    items: {
      fa: ["منوی موبایل تمام‌صفحه (۱۰۰dvh) با اسکرول داخلی"],
      en: ["Mobile menu is full-screen (100dvh) with internal scroll"],
    },
  },
  {
    version: "2.2.1",
    date: "2026-07-19",
    items: {
      fa: [
        "رفع پریلودر ترمینال: دیگر با اسکین AI قاطی نمی‌شود — نمایش از data-panel-skin از همان فریم اول",
      ],
      en: [
        "Fix terminal first-load preloader: no more AI flash — visuals follow data-panel-skin from first paint",
      ],
    },
  },
  {
    version: "2.2.0",
    date: "2026-07-19",
    items: {
      fa: [
        "اسکین AI: دیزاین Editorial SaaS جدا — Hero تمام‌عرض، سکشن‌های باز، هدر/فوتر تمیز (بدون CRT)",
        "ترمینال: بدون تغییر — سوئیچ FAB همان تجربهٔ قبل را نگه می‌دارد",
      ],
      en: [
        "AI skin: distinct Editorial SaaS — full-bleed hero, open sections, clean header/footer (no CRT)",
        "Terminal unchanged — FAB switch keeps the prior experience",
      ],
    },
  },
  {
    version: "2.1.0",
    date: "2026-07-19",
    items: {
      fa: [
        "اثبات قدرت: کاور نمونه‌کار، کیس‌استادی عمیق، دمو تعاملی، قیمت/مقایسه/نظر/one-pager روی صفحات محصول",
        "صفحه روش کار (/method)، وضعیت سیستم (/status + /api/health)، بج پرفورمنس در فوتر",
        "پنل: ⌘K پالت دستور، empty با CTA، wipe دایره‌ای از FAB اسکین",
        "AI: موشن Hero و تایپوگرافی نرم‌تر محصول",
      ],
      en: [
        "Proof stack: portfolio covers, deep case studies, interactive demos, pricing/compare/testimonial/one-pager on product pages",
        "How we work (/method), system status (/status + /api/health), performance badge in footer",
        "Panel: ⌘K command palette, empty states with CTA, circular skin wipe from FAB",
        "AI: Hero motion polish and softer product typography",
      ],
    },
  },
  {
    version: "2.0.2",
    date: "2026-07-19",
    items: {
      fa: [
        "حالت AI: تم شب/روز کار می‌کند — پالت تیره SaaS جدا از CRT، هدر/کارت/پریلودر همگام با theme",
      ],
      en: [
        "AI mode: day/night theme works — SaaS dark palette (not CRT), header/cards/preloader follow theme",
      ],
    },
  },
  {
    version: "2.0.1",
    date: "2026-07-19",
    items: {
      fa: [
        "AI: Hero/Preloader/فوتر مدرن، اسکلتون کل پنل، View Transition روی FAB، نرم‌سازی محصول/auth/ادمین",
        "ترمینال: بدون تغییر رفتار CRT — همهٔ موارد بالا فقط در اسکین AI",
      ],
      en: [
        "AI: modern Hero/Preloader/footer, panel-wide skeletons, FAB view transition, softer product/auth/admin",
        "Terminal: CRT behavior unchanged — all of the above is AI-skin only",
      ],
    },
  },
  {
    version: "2.0.0",
    date: "2026-07-19",
    items: {
      fa: [
        "نسخه ۲: حالت AI در کل سایت (نه فقط پنل)، دکمهٔ گرد مودم/AI پایین‌چپ همه‌جا، پیش‌فرض مدرن",
      ],
      en: [
        "Version 2: AI skin across the whole site (not only the panel), modem/AI FAB bottom-left everywhere, modern by default",
      ],
    },
  },
  {
    version: "1.4.56",
    date: "2026-07-19",
    items: {
      fa: [
        "صفحه حساب کاربری: اسکلتون لودینگ فقط در حالت AI (شیمِر نرم هم‌شکل صفحه)",
      ],
      en: [
        "Account page: skeleton loading only in AI mode (soft shimmer matching the page layout)",
      ],
    },
  },
  {
    version: "1.4.55",
    date: "2026-07-19",
    items: {
      fa: [
        "صفحه حساب کاربری در حالت AI: ترکیب تمیزی shadcn، تراکم Vercel و نرمی Linear (هدر متریک، تب‌ها، لیست‌های فشرده، فرم‌ها)",
      ],
      en: [
        "Account page in AI mode: shadcn cleanliness + Vercel density + Linear softness (metric hero, tabs, dense lists, forms)",
      ],
    },
  },
  {
    version: "1.4.54",
    date: "2026-07-19",
    items: {
      fa: [
        "حالت AI پنل: پیش‌فرض مدرن، ذخیرهٔ اسکین روی حساب کاربری، polish فرم‌ها/تیکت/فاکتور، وزن‌های Thin تا Black فونت",
      ],
      en: [
        "Panel AI mode: modern by default, skin saved on the user account, polished tickets/invoices/forms, Thin–Black font weights",
      ],
    },
  },
  {
    version: "1.4.53",
    date: "2026-07-19",
    items: {
      fa: [
        "فونت رسمی IRANSansX Pro در حالت AI — نسخه FaNum برای اعداد فارسی + وزن‌های Light تا ExtraBold",
      ],
      en: [
        "Official IRANSansX Pro in AI mode — FaNum cut for Persian digits plus Light through ExtraBold weights",
      ],
    },
  },
  {
    version: "1.4.52",
    date: "2026-07-19",
    items: {
      fa: [
        "حالت AI پنل: کل صفحه شامل هدر با فونت ایران‌سنس و ظاهر روشن مدرن؛ خروج از پنل به ترمینال برمی‌گردد",
      ],
      en: [
        "Panel AI mode: full page including header switches to IRANSans and a light modern look; leaving the panel restores the terminal theme",
      ],
    },
  },
  {
    version: "1.4.51",
    date: "2026-07-19",
    items: {
      fa: [
        "سوئیچ مودم/AI فقط در پنل کاربری — دکمه ثابت پایین‌چپ؛ با کلیک ظاهر پنل بین ترمینال و مدرن عوض می‌شود",
      ],
      en: [
        "Modem/AI switch only in the client panel — fixed bottom-left FAB; click swaps panel skin between terminal and modern",
      ],
    },
  },
  {
    version: "1.4.50",
    date: "2026-07-18",
    items: {
      fa: [
        "دکمهٔ گرد حالت: با کلیک مستقیم مودم ↔ AI عوض می‌شود (بدون پنل بازشو)",
      ],
      en: [
        "Round mode button: click toggles modem ↔ AI icon directly (no popover panel)",
      ],
    },
  },
  {
    version: "1.4.49",
    date: "2026-07-18",
    items: {
      fa: [
        "سوئیچ حالت ۵۶K / AI جمع شد به دکمهٔ گرد — با کلیک پنل سه نسخه باز می‌شود (صفحه اصلی و پنل)",
      ],
      en: [
        "56K / AI mode switch collapsed to a round FAB — click opens the three-variant panel (home and panel)",
      ],
    },
  },
  {
    version: "1.4.48",
    date: "2026-07-18",
    items: {
      fa: [
        "صفحه اصلی: همان سه نسخهٔ سوئیچ حالت ۵۶K / AI به‌صورت کارت ثابت پایین‌چپ (هم‌سان با پنل)",
      ],
      en: [
        "Homepage: same three 56K / AI mode-switch variants as a fixed bottom-left card (shared with panel preference)",
      ],
    },
  },
  {
    version: "1.4.47",
    date: "2026-07-18",
    items: {
      fa: [
        "سایدبار پنل: سه نسخهٔ دکمهٔ سوئیچ حالت ۵۶K / AI برای مقایسه (فعلاً فقط UI + ذخیرهٔ انتخاب)",
      ],
      en: [
        "Panel sidebar: three 56K / AI mode-switch button variants for comparison (UI + preference storage only for now)",
      ],
    },
  },
  {
    version: "1.4.46",
    date: "2026-07-18",
    items: {
      fa: [
        "فیلدهای رمز حساب: دکمه نمایش/مخفی داخل فیلد (سمت چپ) و ساخت رمز قوی برای رمز جدید",
      ],
      en: [
        "Account password fields: show/hide toggle inside the field (left) and strong password generator for new passwords",
      ],
    },
  },
  {
    version: "1.4.45",
    date: "2026-07-18",
    items: {
      fa: [
        "تنظیمات حساب پنل بازطراحی شد — هدر پروفایل، خلاصه امنیت، تب‌های پروفایل/امنیت/نشست‌ها",
      ],
      en: [
        "Panel account settings redesigned — profile header, security overview, profile/security/sessions tabs",
      ],
    },
  },
  {
    version: "1.4.44",
    date: "2026-07-18",
    items: {
      fa: [
        "منوی پنل «فایل‌ها» به «مستندات» تبدیل شد — راهنماهای First Data + فایل‌های تحویلی پروژه",
      ],
      en: [
        "Panel “Files” menu renamed to “Documents” — First Data guides plus delivered project files",
      ],
    },
  },
  {
    version: "1.4.43",
    date: "2026-07-18",
    items: {
      fa: [
        "سئوی سراسری: llms.txt / llms-full / ai.txt، Atom دو زبانه، sitemap و robots سخت‌تر، WebSite JSON-LD و meta تماس اصلاح‌شده",
      ],
      en: [
        "Sitewide SEO: llms.txt / llms-full / ai.txt, bilingual Atom feeds, tighter sitemap/robots, WebSite JSON-LD, fixed contact meta",
      ],
    },
  },
  {
    version: "1.4.42",
    date: "2026-07-18",
    items: {
      fa: [
        "فرم تیکت جدید: ادیتور متن، آپلود پیوست، اتصال به پروژه/قرارداد، دپارتمان و اولویت",
      ],
      en: [
        "New ticket form: rich editor, file attachments, project/contract linking, department and priority",
      ],
    },
  },
  {
    version: "1.4.41",
    date: "2026-07-18",
    items: {
      fa: [
        "جستجوی عمومی /search با هایلایت، تاریخچه و focus-trap مودال",
        "ناوبری چسبان سبک برای صفحات بلند محصول + meta/FAQ JSON-LD و sitemap",
        "مودال‌ها با chrome ترمینال یکسان؛ preloader فقط یک‌بار در نشست؛ پنل خواناتر برای پروژه/فایل/فاکتور",
      ],
      en: [
        "Public /search with highlight, recent history, and modal focus-trap",
        "Light sticky product nav + bilingual meta/FAQ JSON-LD and sitemap updates",
        "Unified terminal modal chrome; one-shot session preloader; clearer panel project/file/invoice UX",
      ],
    },
  },
  {
    version: "1.4.40",
    date: "2026-07-18",
    items: {
      fa: [
        "صفحه محصول حرفه‌ای‌تر — قابلیت‌ها، مطالعه موردی، فرآیند تحویل، خدمات مرتبط، CTA دوگانه و پالت CRT یکدست",
      ],
      en: [
        "Richer product subpages — features, case study, delivery process, related services, dual CTAs, and unified CRT accents",
      ],
    },
  },
  {
    version: "1.4.39",
    date: "2026-07-18",
    items: {
      fa: [
        "کنترل‌های ترمینال مودال جستجو — سه‌نقطه سمت چپ؛ قرمز/زرد بستن، سبز بزرگ‌نمایی",
      ],
      en: [
        "Search modal terminal controls — traffic lights on the left; red/yellow close, green maximize",
      ],
    },
  },
  {
    version: "1.4.38",
    date: "2026-07-18",
    items: {
      fa: [
        "جستجوی سایت در هدر — آیکون کنار تم، مودال ترمینالی با پیشنهادها، تگ‌های محبوب و نتایج زنده (Ctrl/Cmd+K)",
      ],
      en: [
        "Site search in the header — icon beside theme, terminal modal with featured items, popular tags, and live results (Ctrl/Cmd+K)",
      ],
    },
  },
  {
    version: "1.4.37",
    date: "2026-07-18",
    items: {
      fa: [
        "نمونه‌کار محصول بازطراحی شد — پیش‌نمایش بصری مرورگر/موبایل/دسکتاپ، نتیجه به‌عنوان تیتر اصلی، تا ۳ نمونه",
      ],
      en: [
        "Product portfolio restaged — browser/mobile/desktop previews, outcome-first headline, up to 3 samples",
      ],
    },
  },
  {
    version: "1.4.36",
    date: "2026-07-18",
    items: {
      fa: [
        "رفع فلش انگلیسی→فارسی هنگام باز شدن سایت — زبان SSR منبع حقیقت است و localStorage دیگر صفحه را عوض نمی‌کند",
      ],
      en: [
        "Fix English→Persian flash on load — SSR language is authoritative; stale localStorage no longer swaps the page",
      ],
    },
  },
  {
    version: "1.4.35",
    date: "2026-07-18",
    items: {
      fa: [
        "Tooltip روی آیکون‌های هدر — تم، زبان، ورود/پنل و منوی موبایل",
      ],
      en: [
        "Tooltips on header icons — theme, language, login/panel, and mobile menu",
      ],
    },
  },
  {
    version: "1.4.34",
    date: "2026-07-18",
    items: {
      fa: [
        "نمونه‌کار محصول جذاب‌تر — صحنهٔ کیس تمام‌عرض با ترمینال زنده، نتیجهٔ برجسته و نمونهٔ دوم فشرده",
      ],
      en: [
        "Richer product portfolio stage — full-width case with live terminal, highlighted outcome, and compact second sample",
      ],
    },
  },
  {
    version: "1.4.33",
    date: "2026-07-18",
    items: {
      fa: [
        "آیکون ورود در هدر — هم‌سبک دکمه‌های تم و زبان؛ بعد از ورود آیکون پنل کاربری",
      ],
      en: [
        "Login icon in the header — matches theme/language icon buttons; panel icon when signed in",
      ],
    },
  },
  {
    version: "1.4.32",
    date: "2026-07-18",
    items: {
      fa: [
        "نمونه‌کارها به‌صورت Case File ترمینالی — نمونه اصلی برجسته + نمونه فشرده در صفحات محصول و پورتفولیو",
      ],
      en: [
        "Portfolio samples as terminal Case Files — flagship + compact layout on product and portfolio pages",
      ],
    },
  },
  {
    version: "1.4.31",
    date: "2026-07-16",
    items: {
      fa: [
        "خوانایی بهتر روی موبایل — منو بزرگ‌تر، متن‌های فرعی تیره‌تر، توضیحات hero و کارت‌های خانه واضح‌تر",
      ],
      en: [
        "Better small-screen readability — larger nav, darker secondary text, clearer hero and home card copy",
      ],
    },
  },
  {
    version: "1.4.30",
    date: "2026-07-16",
    items: {
      fa: [
        "CTA اصلی hero — «مشاوره رایگان» با پس‌زمینه پر و کنتراست بالاتر؛ «شروع پروژه» به‌عنوان اقدام ثانویه",
      ],
      en: [
        "Hero primary CTA — filled high-contrast “Free consultation”; “Start project” as secondary action",
      ],
    },
  },
  {
    version: "1.4.29",
    date: "2026-07-16",
    items: {
      fa: [
        "عنوان روشن‌تر بخش‌های خانه: «خدماتی که برای شما انجام می‌دهیم» و «راهکارهایی که برای کسب‌وکارها می‌سازیم»",
      ],
      en: [
        "Clearer home section titles: “Services we deliver for you” and “Solutions we build for businesses”",
      ],
    },
  },
  {
    version: "1.4.28",
    date: "2026-07-16",
    items: {
      fa: ["CTA اختصاصی برای هر کارت خدمات و محصولات در صفحه اصلی — به‌جای عبارت تکراری «ببین چطور کار می‌کنه»"],
      en: ["Per-card CTAs on home services and products rows — replaces the repeated “See how it works” label"],
    },
  },
  {
    version: "1.4.27",
    date: "2026-07-11",
    items: {
      fa: [
        "بازگشت layout زیرمحصول — hero با visual، persona cards، دو نمونه portfolio و FAQ کوتاه",
        "حذف چک‌لیست مناسب/نیست، case study مصنوعی و CTA تکراری",
      ],
      en: [
        "Product sub-page layout reverted — hero with visual, persona cards, two portfolio samples, short FAQ",
        "Removed fit checklist, synthetic case study, and duplicate CTAs",
      ],
    },
  },
  {
    version: "1.4.26",
    date: "2026-07-11",
    items: {
      fa: [
        "بازطراحی صفحات زیرمحصول — InnerPage، چک‌لیست مناسب/نیست، case study و دو مسیر تماس",
        "حذف nav چسبان، use cases، features، FAQ و pricing از layout جدید",
      ],
      en: [
        "Product sub-pages redesigned — InnerPage, fit checklist, flagship case study, dual contact paths",
        "Removed sticky nav, use cases, features, FAQ, and pricing from the new layout",
      ],
    },
  },
  {
    version: "1.4.25",
    date: "2026-07-11",
    items: {
      fa: ["حذف بخش سطوح همکاری و تحویل از صفحات زیرمحصول"],
      en: ["Removed engagement tiers section from product sub-pages"],
    },
  },
  {
    version: "1.4.24",
    date: "2026-07-11",
    items: {
      fa: [
        "بازطراحی صفحات زیرمحصول — hero ساده، حذف آمار/نقل‌قول/خدمات/یک‌صفحه‌ای و nav محصولات دیگر",
        "لیست قابلیت‌ها و سطوح همکاری سبک‌تر — بدون جدول مقایسه و باکس‌های اضافه",
      ],
      en: [
        "Product sub-page redesign — simpler hero, removed stats/testimonial/services/one-pager/cross-nav",
        "Lighter features list and engagement tiers — no compare table or extra callout boxes",
      ],
    },
  },
  {
    version: "1.4.22",
    date: "2026-07-11",
    items: {
      fa: [
        "شفاف‌سازی بخش نمونه‌کار و قابلیت‌ها — عنوان، توضیح، حذف لینک تکراری portfolio",
        "افزودن «نمونه‌ها» به nav چسبان صفحات محصول",
      ],
      en: [
        "Clearer portfolio samples and capabilities sections — titles, hints, deduped portfolio link",
        "Added Samples to product sub-page sticky nav",
      ],
    },
  },
  {
    version: "1.4.21",
    date: "2026-07-11",
    items: {
      fa: ["حذف بخش قبل/بعد و پیش‌نمایش استقرار/demo از صفحات زیرمحصول"],
      en: ["Removed before/after and deploy/demo preview sections from product sub-pages"],
    },
  },
  {
    version: "1.4.20",
    date: "2026-07-11",
    items: {
      fa: ["ادغام بخش موارد استفاده و قبل/بعد در یک سکشن — nav خلوت‌تر"],
      en: ["Merged product use-cases and before/after into one section — slimmer nav"],
    },
  },
  {
    version: "1.4.19",
    date: "2026-07-11",
    items: {
      fa: [
        "بازطراحی بخش موارد استفاده محصول — کارت پرسونا با آیکون، outcome و لینک نمونه‌کار",
      ],
      en: [
        "Redesigned product use-cases section — persona cards with icons, outcomes, and portfolio link",
      ],
    },
  },
  {
    version: "1.4.18",
    date: "2026-07-11",
    items: {
      fa: [
        "بازطراحی بخش قبل/بعد و پیش‌نمایش استقرار MSI — خوانایی در تم روشن",
      ],
      en: [
        "Redesigned before/after and MSI deploy preview sections for light-theme readability",
      ],
    },
  },
  {
    version: "1.4.17",
    date: "2026-07-11",
    items: {
      fa: ["حذف متن eyebrow از Hero صفحات زیرمحصول (مثل /product/windows)"],
      en: ["Removed hero eyebrow label from product sub-pages (e.g. /product/windows)"],
    },
  },
  {
    version: "1.4.16",
    date: "2026-07-11",
    items: {
      fa: [
        "اصلاح i18n و SEO صفحات محصول (breadcrumb، metadata، JSON-LD)",
        "رفع باگ UI (فلش‌ها، aria-label)، nav خلوت‌تر، demo استقرار Windows، pricing اختصاصی",
      ],
      en: [
        "Product page i18n and SEO fixes (breadcrumb, metadata, JSON-LD)",
        "UI bug fixes (arrows, aria-label), slimmer nav, Windows deploy demo, tailored pricing",
      ],
    },
  },
  {
    version: "1.4.15",
    date: "2026-07-11",
    items: {
      fa: [
        "فاز ۳ صفحات محصول: boot sequence، demo loop، pricing tiers و service graph",
        "Changelog teaser، one-pager چاپی و JSON-LD برای SEO در /product و sub-pages",
      ],
      en: [
        "Product pages phase 3: boot sequence, demo loop, pricing tiers, and service graph",
        "Changelog teaser, printable one-pager, and JSON-LD schema on /product and sub-pages",
      ],
    },
  },
  {
    version: "1.4.14",
    date: "2026-07-11",
    items: {
      fa: [
        "فاز ۲ صفحات محصول: Product Explorer و Product Matcher در /product",
        "قبل/بعد terminal، دیاگرام معماری، stack تعاملی، testimonial و جدول مقایسه در صفحات sub-product",
      ],
      en: [
        "Product pages phase 2: Product Explorer and Matcher on /product",
        "Before/after terminal, architecture diagram, interactive stack, testimonial, and comparison table on sub-product pages",
      ],
    },
  },
  {
    version: "1.4.13",
    date: "2026-07-11",
    items: {
      fa: [
        "فاز ۱ صفحات محصول: Hero بصری، آمار، نمونه‌کار، FAQ و sticky nav",
        "بهبود لندینگ /product با نوار آمار و FAQ",
      ],
      en: [
        "Product pages phase 1: visual hero, stats, portfolio samples, FAQ, and sticky nav",
        "Improved /product landing with stats strip and FAQ",
      ],
    },
  },
  {
    version: "1.4.12",
    date: "2026-07-11",
    items: {
      fa: [
        "هم‌تراز کردن عرض Hero با هدر — کاهش فاصله افقی کناره‌های صفحه",
      ],
      en: [
        "Aligned hero width with the header — reduced horizontal side gutters",
      ],
    },
  },
  {
    version: "1.4.11",
    date: "2026-07-11",
    items: {
      fa: [
        "اصلاح موقعیت نقاط دفاتر (تهران، شیراز، اهواز) روی نقشه Hero",
        "حذف نقاط برجسته تصادفی از نقشه — فقط شهرهای دفتر مشخص می‌شوند",
      ],
      en: [
        "Fixed office node positions (Tehran, Shiraz, Ahvaz) on the hero Iran map",
        "Removed random highlight dots — only office cities are marked now",
      ],
    },
  },
  {
    version: "1.4.10",
    date: "2026-07-11",
    items: {
      fa: ["حذف متن eyebrow از بخش Hero صفحه اصلی"],
      en: ["Removed hero eyebrow label from the homepage"],
    },
  },
  {
    version: "1.4.9",
    date: "2026-07-07",
    items: {
      en: [
        "Full about sub-pages for team, partners, and honors with dedicated content, cross-nav, and breadcrumbs",
        "Product hub at /product with category cards, value pillars, process, and linked paths to services and portfolio",
        "Five dedicated product sub-pages (web, mobile, windows, ai, platforms) with use cases, features, stacks, process, and CTAs",
      ],
      fa: [
        "تکمیل زیرصفحه‌های درباره ما برای تیم، شرکا و افتخارات با محتوای اختصاصی، ناوبری متقابل و breadcrumb",
        "صفحه هاب محصولات در /product با کارت‌های دسته‌بندی، ارزش‌های اصلی، فرآیند ساخت و لینک به خدمات و نمونه‌کار",
        "پنج زیرصفحه اختصاصی محصول (وب، موبایل، ویندوز، هوش مصنوعی، پلتفرم‌ها) با موارد استفاده، قابلیت‌ها، استک، فرآیند و CTA",
      ],
    },
  },
  {
    version: "1.4.8",
    date: "2026-07-07",
    items: {
      en: [
        "Consulting service page wired at /services/consulting with metadata and OG image",
        "Support & development page at /services/support — tiers, scope, stack, FAQ JSON-LD",
        "Full portfolio landing at /portfolio with stats, categories, featured projects, and approach",
        "Five portfolio sub-pages (websites, ecommerce, mobile-apps, desktop, other) with case studies and cross-nav",
      ],
      fa: [
        "اتصال صفحه مشاوره در /services/consulting با متادیتا و تصویر OG",
        "صفحه پشتیبانی و توسعه در /services/support — سطوح همکاری، دامنه خدمات، فناوری و FAQ",
        "صفحه کامل نمونه‌کار در /portfolio با آمار، دسته‌بندی، پروژه‌های منتخب و رویکرد",
        "پنج زیرصفحه نمونه‌کار (وب‌سایت، فروشگاه، موبایل، دسکتاپ، سایر) با مطالعات موردی و ناوبری متقابل",
      ],
    },
  },
  {
    version: "1.4.7",
    date: "2026-07-07",
    items: {
      en: [
        "iOS app service page at /services/ios — Swift, SwiftUI, App Store, TestFlight, FAQ JSON-LD",
        "SEO & optimization page at /services/seo — technical SEO, Core Web Vitals, audit deliverables, tools, FAQ",
        "Consulting & project analysis at /services/consulting — audience, deliverables, engagement models, before/after, FAQ",
      ],
      fa: [
        "صفحه اپلیکیشن iOS در /services/ios — Swift، SwiftUI، App Store، TestFlight و FAQ",
        "صفحه سئو و بهینه‌سازی در /services/seo — سئو فنی، Core Web Vitals، خروجی ممیزی، ابزارها و FAQ",
        "صفحه مشاوره و تحلیل پروژه در /services/consulting — مخاطب، تحویل‌دادنی‌ها، مدل همکاری، قبل/بعد و FAQ",
      ],
    },
  },
  {
    version: "1.4.6",
    date: "2026-07-06",
    items: {
      en: [
        "Android app service page at /services/android with native vs cross-platform comparison",
        "App types, features, Kotlin stack, Google Play publishing, process, and FAQ",
      ],
      fa: [
        "صفحه اپلیکیشن اندروید در /services/android",
        "انواع اپ، مقایسه بومی و کراس‌پلتفرم، امکانات، فناوری، انتشار Google Play و سوالات متداول",
      ],
    },
  },
  {
    version: "1.4.5",
    date: "2026-07-06",
    items: {
      en: [
        "E-commerce service page at /services/ecommerce with store types, features, and integrations",
        "Custom vs template comparison, admin panel overview, launch process, and FAQ",
      ],
      fa: [
        "صفحه خدمات فروشگاه اینترنتی در /services/ecommerce",
        "انواع فروشگاه، مقایسه اختصاصی و قالب، امکانات، یکپارچه‌سازی، پنل مدیریت و سوالات متداول",
      ],
    },
  },
  {
    version: "1.4.4",
    date: "2026-07-06",
    items: {
      en: [
        "Dedicated UI/UX service page at /services/ui-ux with outcome-focused sections",
        "UI vs UX comparison, design process, deliverables, and design-only portfolio showcase",
      ],
      fa: [
        "صفحه اختصاصی UI/UX در /services/ui-ux با تمرکز بر نتیجه و تجربه کاربر",
        "تفاوت UI و UX، فرآیند طراحی، خروجی‌ها و نمونه‌کارهای طراحی (بدون پروژه برنامه‌نویسی)",
      ],
    },
  },
  {
    version: "1.4.3",
    date: "2026-07-06",
    items: {
      en: [
        "Web design service page at /services/web-design with full landing sections",
        "Project types, custom vs template comparison, features, process timeline, tech stack, FAQ",
      ],
      fa: [
        "صفحه کامل خدمات طراحی وب‌سایت در /services/web-design",
        "انواع پروژه، مقایسه اختصاصی و قالب، امکانات، فرآیند، فناوری‌ها و سوالات متداول",
      ],
    },
  },
  {
    version: "1.4.2",
    date: "2026-07-06",
    items: {
      en: [
        "Removed demo seed/bootstrap flows — panel and admin are production-only",
        "Admin: invoices page (create, list, manual mark paid)",
        "Admin: project detail with phase updates, approvals, invoices, deliverable uploads",
        "Admin: user search in forms, organization creation, contracts list, status filters",
      ],
      fa: [
        "حذف مسیرهای دمو و bootstrap — پنل مشتری و ادمین فقط برای پروداکشن",
        "ادمین: صفحه فاکتورها (صدور، لیست، ثبت پرداخت دستی)",
        "ادمین: جزئیات پروژه با به‌روزرسانی فاز، تأیید، فاکتور و آپلود فایل تحویلی",
        "ادمین: جستجوی کاربر در فرم‌ها، ساخت سازمان، لیست قراردادها و فیلتر وضعیت",
      ],
    },
  },
  {
    version: "1.4.1",
    date: "2026-07-06",
    items: {
      en: [
        "Client panel layout uses more horizontal space on large screens",
        "Work With Us page at /contactus/collaborate with hiring and freelancer application forms",
        "File uploads for resume and portfolio; leads stored as collaborate_hiring / collaborate_freelancer",
      ],
      fa: [
        "پنل مشتری در صفحه‌نمایش‌های بزرگ فضای افقی بیشتری استفاده می‌کند",
        "صفحه همکاری با ما در /contactus/collaborate با فرم استخدام و همکاری پروژه‌ای",
        "آپلود رزومه و نمونه‌کار؛ ذخیره لید با نوع collaborate_hiring / collaborate_freelancer",
      ],
    },
  },
  {
    version: "1.4.0",
    date: "2026-07-05",
    items: {
      en: [
        "Major stack upgrade: Next.js 16, React 19, TypeScript 6, Tailwind CSS 4",
        "Motion library (framer-motion successor) and Next 16 async params/proxy routing",
        "Package deps updated to latest; production build verified",
      ],
      fa: [
        "ارتقای major: Next.js 16، React 19، TypeScript 6، Tailwind CSS 4",
        "کتابخانه Motion (جایگزین framer-motion) و routing جدید async/proxy در Next 16",
        "همه پکیج‌ها به آخرین نسخه؛ build پروداکشن تأیید شد",
      ],
    },
  },
  {
    version: "1.3.12", date: "2026-07-04", items: {
      en: [
        "Terminal UX color hierarchy, amber comments, dim secondary, accent green used sparingly", "Stats, icons, eyebrows, scroll bar, and nav numbers recolored for readability", ], fa: [
        "سلسله‌مراتب رنگ ترمینال, amber برای کامنت، dim برای ثانویه، سبز فقط accent", "آمار، آیکون‌ها، eyebrow و نوار اسکرول برای خوانایی بهتر تنظیم شد", ], }, }, {
    version: "1.3.11", date: "2026-07-04", items: {
      en: [
        "Hero stats dividers fixed for RTL (logical start edge)", "Browser tab title updates on language switch, slogan, brand on home", ], fa: [
        "خط جداکننده آمار در RTL اصلاح شد", "عنوان تب با تغییر زبان به‌روز می‌شود, «از Dialup تا AI, اولین دیتا»", ], }, }, {
    version: "1.3.10", date: "2026-07-04", items: {
      en: ["Hero stats RTL layout, right-aligned numbers and logical dividers in Persian"], fa: ["چیدمان RTL آمار هیرو, اعداد راست‌چین و خط جداکننده درست در فارسی"], }, }, {
    version: "1.3.9", date: "2026-07-04", items: {
      en: [
        "Fixed hero layout shake during slogan/brand effects, stable scramble + fade-in tagline", ], fa: [
        "رفع لرزش صفحه هنگام افکت شعار هیرو, scramble پایدار و نمایش بدون jitter", ], }, }, {
    version: "1.3.8", date: "2026-07-04", items: {
      en: ["Hero experience stat updated to 15+ years"], fa: ["آمار سال ساخت در هیرو به ۱۵+ سال به‌روز شد"], }, }, {
    version: "1.3.7", date: "2026-07-04", items: {
      en: [
        "Hero stats copy refreshed, removed SLA jargon, added short notes per metric", ], fa: [
        "متن آمار هیرو بازنویسی شد, حذف SLA، برچسب و توضیح کوتاه برای هر عدد", ], }, }, {
    version: "1.3.6", date: "2026-07-04", items: {
      en: [
        "Hero stats simplified to match hero frame, inline row with count-up, no separate window panel", ], fa: [
        "آمار هیرو ساده شد و با کادر اصلی هماهنگ شد, ردیف یک‌خطی با شمارنده، بدون پنجرهٔ جدا", ], }, }, {
    version: "1.3.5", date: "2026-07-04", items: {
      en: ["English hero brand title sized down to stay on one line"], fa: ["اندازهٔ عنوان انگلیسی هیرو برای نمایش در یک خط کوچک‌تر شد"], }, }, {
    version: "1.3.4", date: "2026-07-04", items: {
      en: [
        "Home hero stats redesigned as live terminal metrics panel with count-up and block meters", ], fa: [
        "آمار هیرو به پنل metrics ترمینالی با شمارندهٔ متحرک و نوار بلوکی بازطراحی شد", ], }, }, {
    version: "1.3.3", date: "2026-07-04", items: {
      en: ["Home hero slogan updated to “From the dialup era to the world of AI.”"], fa: ["شعار هیرو به «از روزهای Dialup تا دنیای AI» تغییر کرد"], }, }, {
    version: "1.3.2", date: "2026-07-04", items: {
      en: [
        "Home hero content appears immediately with staggered fade-in (removed 1.1s delay)", ], fa: [
        "محتوای هیرو بلافاصله با افکت fade-in پله‌ای نمایش داده می‌شود (حذف تأخیر ۱.۱ ثانیه)", ], }, }, {
    version: "1.3.1", date: "2026-07-04", items: {
      en: [
        "Terminal-style page navigation preloader between internal routes", "Shared route loading UI for Suspense fallbacks (app/loading.tsx)", ], fa: [
        "پری‌لودر ترمینالی بین صفحات داخلی هنگام ناوبری", "UI یکپارچهٔ loading برای Suspense (app/loading.tsx)", ], }, }, {
    version: "1.3.0", date: "2026-07-04", items: {
      en: [
        "Staff admin panel at /admin, projects, tickets, leads, contract upload, team management", "Lead → project conversion workflow from the staff leads page", "Staff ticket reply, status updates, and close from admin UI", "Zarinpal payment gateway for invoices (with manual pay_url fallback)", "PDF contracts with electronic signature record page", "Multi-user organizations (owner, manager, member) shared project access", "Email/SMS panel notifications via webhooks (PANEL_NOTIFY_* or OTP_* fallbacks)", "ADMIN_API_KEY and staff/admin roles documented in .env.example", ], fa: [
        "پنل Staff در /admin, پروژه، تیکت، درخواست، آپلود قرارداد، مدیریت تیم", "تبدیل lead به پروژه از صفحه درخواست‌های staff", "پاسخ، تغییر وضعیت و بستن تیکت از UI ادمین", "درگاه پرداخت زرین‌پال برای فاکتورها (با fallback لینک دستی)", "قرارداد PDF با صفحه ثبت امضای الکترونیک", "سازمان چندکاربره (مالک، مدیر، عضو) با دسترسی مشترک به پروژه", "اعلان ایمیل/SMS پنل از طریق webhook", "مستندسازی ADMIN_API_KEY و نقش staff/admin در .env.example", ], }, }, {
    version: "1.2.0", date: "2026-07-04", items: {
      en: [
        "Homepage services row (8 cards) and products row (5 cards) with plain-language copy", "Why Us, stats strip, and simplified contact CTA below the hero", "Unified terminal-style SVG icons replacing emoji across home sections", "Full client panel: dashboard, projects, contracts, tickets, files, invoices, requests, notifications, and account", "Persian numerals (۰,۹) and Rooyin digit font across the FA interface", "Contact requests linked to logged-in users; demo project seed for panel testing", "Header wordmark without underscore (First Data / اولین دیتا)", "PWA manifest same-origin fix, service worker MIME-safe caching, and standalone start scripts (dev:4000 / start:4000)", ], fa: [
        "ردیف خدمات (۸ کارت) و محصولات (۵ کارت) در صفحه اصلی با متن ساده", "بخش چرا ما، آمار، و دعوت تماس ساده‌شده زیر هیرو", "آیکون‌های SVG یکپارچه به‌جای emoji در بخش‌های صفحه اصلی", "پنل مشتری کامل: داشبورد، پروژه، قرارداد، تیکت، فایل، فاکتور، درخواست، اعلان و حساب کاربری", "ارقام فارسی (۰,۹) و فونت Rooyin برای اعداد در نسخه FA", "اتصال درخواست‌های تماس به کاربر لاگین‌شده؛ داده نمونه برای تست پنل", "لوگوی هدر بدون آندرلاین (اولین دیتا)", "رفع manifest، کش امن service worker، و اسکریپت اجرای standalone (dev:4000 / start:4000)", ], }, }, {
    version: "1.1.0", date: "2026-07-04", items: {
      en: [
        "Interactive Iran pixel map in the hero with Tehran, Shiraz, and Ahvaz markers", "Blog grid with category filters and localized article pages", "Hybrid navigation with mega-menu subpages for About, Product, Services, and Portfolio", "Footer copyright with locale-aware year, version badge, and changelog modal", "Terms page with usage rules and full release history", "Dev/build guardrails to prevent stale Next.js chunk 404s", ], fa: [
        "نقشه پیکسلی تعاملی ایران در هیرو با نشانگرهای تهران، شیراز و اهواز", "وبلاگ با فیلتر دسته‌بندی و صفحات مقاله دو زبانه", "ناوبری ترکیبی با زیرمنو برای درباره ما، محصولات، خدمات و نمونه‌کارها", "کپی‌رایت فوتر با سال شمسی/میلادی، نسخه و مودال changelog", "صفحه قوانین با شرایط استفاده و تاریخچه نسخه‌ها", "محافظت build/dev برای جلوگیری از خطای chunk در Next.js", ], }, }, {
    version: "1.0.0", date: "2026-01-15", items: {
      en: [
        "Initial First Data marketing site launch", "Bilingual FA/EN interface with terminal-themed UX", "Contact form, portfolio showcase, and service pages", ], fa: [
        "انتشار اولیه سایت اولین دیتا", "رابط دو زبانه فارسی/انگلیسی با تم ترمینال", "فرم تماس، نمونه‌کارها و صفحات خدمات", ], }, }, ];
