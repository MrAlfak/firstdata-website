export type NavChild = {
  slug: string;
  href: string;
  labelKey: string;
};

export type NavItem = {
  num: string;
  slug: string;
  href: string;
  labelKey: string;
  /** Highlight as primary sales destination */
  featured?: boolean;
  children?: NavChild[];
};

export const ABOUTUS_CHILDREN: NavChild[] = [
  { slug: "team", href: "/aboutus/team", labelKey: "nav.aboutTeam" }, { slug: "partners", href: "/aboutus/partners", labelKey: "nav.aboutPartners" }, { slug: "honors", href: "/aboutus/honors", labelKey: "nav.aboutHonors" }, { slug: "vision", href: "/aboutus/vision", labelKey: "nav.aboutVision" }, { slug: "mission", href: "/aboutus/mission", labelKey: "nav.aboutMission" }, ];

export type AboutSubPageKey =
| "aboutTeam"
| "aboutPartners"
| "aboutHonors"
| "aboutVision"
| "aboutMission";

export const ABOUTUS_SLUG_TO_PAGE: Record<string, AboutSubPageKey> = {
  team: "aboutTeam", partners: "aboutPartners", honors: "aboutHonors", vision: "aboutVision", mission: "aboutMission", };

export const ABOUTUS_SLUGS = ABOUTUS_CHILDREN.map((c) => c.slug);

export const CONTACT_CHILDREN: NavChild[] = [
  { slug: "request", href: "/contactus/request", labelKey: "nav.contactRequest" }, { slug: "consultation", href: "/contactus/consultation", labelKey: "nav.contactConsultation" }, { slug: "collaborate", href: "/contactus/collaborate", labelKey: "nav.contactCollaborate" }, ];

export type ContactSubPageKey =
| "contactRequest"
| "contactConsultation"
| "contactCollaborate";

export const CONTACT_SLUG_TO_PAGE: Record<string, ContactSubPageKey> = {
  request: "contactRequest", consultation: "contactConsultation", collaborate: "contactCollaborate", };

export const CONTACT_SLUGS = CONTACT_CHILDREN.map((c) => c.slug);

export const SERVICES_CHILDREN: NavChild[] = [
  { slug: "web-design", href: "/services/web-design", labelKey: "nav.serviceWeb" }, { slug: "ui-ux", href: "/services/ui-ux", labelKey: "nav.serviceUiUx" }, { slug: "ecommerce", href: "/services/ecommerce", labelKey: "nav.serviceEcommerce" }, { slug: "android", href: "/services/android", labelKey: "nav.serviceAndroid" }, { slug: "ios", href: "/services/ios", labelKey: "nav.serviceIos" }, { slug: "seo", href: "/services/seo", labelKey: "nav.serviceSeo" }, { slug: "consulting", href: "/services/consulting", labelKey: "nav.serviceConsulting" }, { slug: "support", href: "/services/support", labelKey: "nav.serviceSupport" }, ];

/** Maps service sub-route slug → ServiceSection number (01,09) */
export const SERVICES_SLUG_TO_NUMBER: Record<string, string> = {
  "web-design": "01", "ui-ux": "06", ecommerce: "07", android: "02", ios: "03", seo: "05", consulting: "09", support: "08", };

export const SERVICES_SLUGS = SERVICES_CHILDREN.map((c) => c.slug);

export const PORTFOLIO_CHILDREN: NavChild[] = [
  { slug: "websites", href: "/portfolio/websites", labelKey: "nav.portfolioWebsites" }, { slug: "ecommerce", href: "/portfolio/ecommerce", labelKey: "nav.portfolioEcommerce" }, { slug: "mobile-apps", href: "/portfolio/mobile-apps", labelKey: "nav.portfolioMobile" }, { slug: "desktop", href: "/portfolio/desktop", labelKey: "nav.portfolioDesktop" }, { slug: "other", href: "/portfolio/other", labelKey: "nav.portfolioOther" }, ];

export type PortfolioSubPageKey =
| "portfolioWebsites"
| "portfolioEcommerce"
| "portfolioMobile"
| "portfolioDesktop"
| "portfolioOther";

export const PORTFOLIO_SLUG_TO_PAGE: Record<string, PortfolioSubPageKey> = {
  websites: "portfolioWebsites", ecommerce: "portfolioEcommerce", "mobile-apps": "portfolioMobile", desktop: "portfolioDesktop", other: "portfolioOther", };

export const PORTFOLIO_SLUGS = PORTFOLIO_CHILDREN.map((c) => c.slug);

export const PRODUCT_CHILDREN: NavChild[] = [
  { slug: "web", href: "/product/web", labelKey: "nav.productWeb" }, { slug: "mobile", href: "/product/mobile", labelKey: "nav.productMobile" }, { slug: "windows", href: "/product/windows", labelKey: "nav.productWindows" }, { slug: "ai", href: "/product/ai", labelKey: "nav.productAi" }, { slug: "platforms", href: "/product/platforms", labelKey: "nav.productPlatforms" }, ];

export type ProductSubPageKey =
| "productWeb"
| "productMobile"
| "productWindows"
| "productAi"
| "productPlatforms";

export const PRODUCT_SLUG_TO_PAGE: Record<string, ProductSubPageKey> = {
  web: "productWeb", mobile: "productMobile", windows: "productWindows", ai: "productAi", platforms: "productPlatforms", };

export const PRODUCT_SLUGS = PRODUCT_CHILDREN.map((c) => c.slug);

/** Main header links, contact is a separate CTA button with submenu */
export const MAIN_NAV: NavItem[] = [
  { num: "00", slug: "home", href: "/", labelKey: "nav.home" }, {
    num: "01", slug: "aboutus", href: "/aboutus", labelKey: "nav.aboutus", children: ABOUTUS_CHILDREN, }, { num: "02", slug: "product", href: "/product", labelKey: "nav.product", children: PRODUCT_CHILDREN }, {
    num: "03", slug: "services", href: "/services", labelKey: "nav.services", featured: true, children: SERVICES_CHILDREN, }, { num: "04", slug: "portfolio", href: "/portfolio", labelKey: "nav.portfolio", children: PORTFOLIO_CHILDREN }, { num: "05", slug: "blog", href: "/blog", labelKey: "nav.blog" }, ];

export const CONTACT_CTA = {
  num: "06", href: "/contactus", labelKey: "nav.contactus", children: CONTACT_CHILDREN, } as const;

export const PANEL_HREF = "/panel";
export const LOGIN_HREF = "/auth/login";
export const REGISTER_HREF = "/auth/register";

/** All routes for footer / sitemap (includes contact) */
export const ALL_NAV: NavItem[] = [
  ...MAIN_NAV, {
    num: CONTACT_CTA.num, slug: "contactus", href: CONTACT_CTA.href, labelKey: CONTACT_CTA.labelKey, children: CONTACT_CHILDREN, }, ];
