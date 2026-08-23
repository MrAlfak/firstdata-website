/**
 * Streamline Core (CC BY 4.0) glyph ids for modern / AI skin.
 * Source: https://www.streamlinehq.com/icons/streamline-core
 * Data: @iconify-json/streamline
 */

/** Header / chrome controls */
export const CORE_CHROME = {
  search: "interface-search-glass-search-magnifying",
  sun: "interface-weather-sun-photos-light-camera-mode-brightness-sun-photo-full",
  moon: "interface-weather-moon-astronomy-moon-science-space-crescent",
  user: "interface-user-circle-circle-geometric-human-person-single-user",
  login: "interface-login-arrow-enter-frame-left-login-point-rectangle",
  menu: "interface-setting-menu-1-button-parallel-horizontal-lines-menu-navigation-three-hamburger",
  close: "delete-1",
  chevron: "arrow-down-2",
  message: "mail-send-email-message",
} as const;

/** Domain / product / service glyphs (TermIcon) */
export const CORE_TERM = {
  "web-design": "browser-website-1",
  ecommerce: "shopping-cart-1",
  android: "android",
  ios: "computer-logo-apple-os-system-apple",
  "ui-ux": "interface-edit-brush-1-brush-color-colors-design-paint-painting",
  seo: "interface-edit-binocular-binocular-binoculars-view-zoom",
  consulting: "mail-send-email-message",
  support: "interface-help-customer-support-1-customer-headset-help-microphone-phone-support",
  web: "computer-laptop-device-laptop-electronics-computer-notebook",
  mobile: "phone-mobile-phone",
  windows: "computer-logo-windows-1-os-system-microsoft",
  ai: "artificial-intelligence-spark",
  platforms: "computer-monitor-screen-desktop-monitor-device-electronics-display-computer",
  team: "interface-user-multiple-close-geometric-human-multiple-person-up-user",
  calendar: "blank-calendar",
  key: "key",
  message: "mail-send-email-message",
  default: "star-1",
} as const;

/** Contact / modal / assistant actions */
export const CORE_CONTACT = {
  email: "mail-send-envelope",
  phone: "phone",
  whatsapp: "whatsapp",
  telegram: "telegram",
  map: "location-pin-3",
  rocket: "fireworks-rocket",
  users: "interface-user-multiple-close-geometric-human-multiple-person-up-user",
  cross: "delete-1",
  maximize: "expand",
  calendar: "blank-calendar",
  send: "mail-send-email-send-email-paper-airplane",
  arrowUp: "arrow-up-1",
  ai: "artificial-intelligence-spark",
} as const;

/** Footer / public social network logos */
export const CORE_SOCIAL = {
  instagram: "instagram",
  linkedin: "linkedin",
  facebook: "facebook-1",
  telegram: "telegram",
} as const;

export type CoreChromeName = keyof typeof CORE_CHROME;
export type CoreTermName = keyof typeof CORE_TERM;
export type CoreContactName = keyof typeof CORE_CONTACT;
export type CoreSocialName = keyof typeof CORE_SOCIAL;

export function resolveCoreTerm(slug: string): string {
  return (CORE_TERM as Record<string, string>)[slug] ?? CORE_TERM.default;
}
