export type SocialNetwork = "instagram" | "linkedin" | "facebook" | "telegram";

export type SocialLink = {
  id: SocialNetwork;
  href: string;
  labelKey: `footer.social.${SocialNetwork}`;
};

/** Public social profiles, update URLs when accounts are live. */
export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    id: "instagram", href: "https://www.instagram.com/firstdata.ir", labelKey: "footer.social.instagram", }, {
    id: "linkedin", href: "https://www.linkedin.com/company/firstdata", labelKey: "footer.social.linkedin", }, {
    id: "facebook", href: "https://www.facebook.com/firstdata.ir", labelKey: "footer.social.facebook", }, {
    id: "telegram", href: "https://t.me/firstdatair", labelKey: "footer.social.telegram", }, ] as const;
