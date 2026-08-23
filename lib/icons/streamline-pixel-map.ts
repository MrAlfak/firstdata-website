/**
 * Streamline Pixel (CC BY 4.0) glyph ids for terminal skin.
 * Source: https://www.streamlinehq.com/icons/pixel
 * Data: @iconify-json/streamline-pixel
 */

/** Header / chrome controls */
export const PIXEL_CHROME = {
  search: "interface-essential-search-1",
  sun: "weather-cloud-sun-fine",
  moon: "weather-moon",
  user: "interface-essential-profile-male",
  login: "interface-essential-signin-login",
  menu: "interface-essential-navigation-menu-1",
  close: "phone-actions-remove-1",
  chevron: "interface-essential-keyboard-button-direction-1",
  message: "interface-essential-message",
} as const;

/** Domain / product / service glyphs (TermIcon) */
export const PIXEL_TERM = {
  "web-design": "ui-design-website",
  ecommerce: "shopping-shipping-cart",
  android: "coding-apps-websites-android",
  ios: "computers-devices-electronics-vintage-mac",
  "ui-ux": "design-color-brush-paint",
  seo: "interface-essential-search-binocular",
  consulting: "interface-essential-message",
  support: "interface-essential-call-center-contact-help",
  web: "computers-devices-electronics-laptop",
  mobile: "mobile-phone",
  windows: "computers-devices-electronics-desktop",
  ai: "technology-robot-ai",
  platforms: "computers-devices-electronics-monitor",
  team: "multiple-user",
  calendar: "interface-essential-calendar-date",
  key: "interface-essential-key",
  message: "interface-essential-message",
  default: "social-rewards-rating-star-1",
} as const;

/** Contact / misc terminal actions */
export const PIXEL_CONTACT = {
  email: "email-envelope",
  phone: "phone-incoming-call",
  whatsapp: "logo-whatapp",
  telegram: "interface-essential-send-mail",
  map: "map-navigation-pin-location-1",
  rocket: "business-product-startup-1",
  users: "multiple-user",
  cross: "phone-actions-remove-1",
  maximize: "interface-essential-expand-1",
  calendar: "interface-essential-calendar-date",
} as const;

/** Footer / public social network logos (Pixel has no Telegram mark — send glyph) */
export const PIXEL_SOCIAL = {
  instagram: "logo-social-media-instagram",
  linkedin: "logo-linkedin",
  facebook: "logo-social-media-facebook-circle",
  telegram: "interface-essential-send-mail",
} as const;

export type PixelChromeName = keyof typeof PIXEL_CHROME;
export type PixelTermName = keyof typeof PIXEL_TERM;
export type PixelContactName = keyof typeof PIXEL_CONTACT;
export type PixelSocialName = keyof typeof PIXEL_SOCIAL;

export function resolvePixelTerm(slug: string): string {
  return (PIXEL_TERM as Record<string, string>)[slug] ?? PIXEL_TERM.default;
}
