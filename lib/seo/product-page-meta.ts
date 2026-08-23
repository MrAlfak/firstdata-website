import type { Lang } from "@/i18n/dictionaries";
import { productPageDictionaries } from "@/i18n/product-page";
import { productSubPageDictionaries } from "@/i18n/product-sub-page";
import type { ProductSlug } from "@/i18n/product-page";

const HOME: Record<Lang, string> = { fa: "خانه", en: "Home" };

function clampMeta(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

export function productSubPageMeta(slug: ProductSlug, lang: Lang) {
  const ui = productSubPageDictionaries[lang][slug];
  const hub = productPageDictionaries[lang];
  const title = clampMeta(ui.hero.title, 60);
  const description = clampMeta(
    [ui.hero.lead, ui.hero.body].filter(Boolean).join(" — "),
    160,
  );

  return {
    title,
    description,
    breadcrumbs: [
      { name: HOME[lang], href: "/" },
      { name: hub.hero.title, href: "/product" },
      { name: ui.hero.title },
    ],
  };
}

export function productHubMeta(lang: Lang) {
  const hub = productPageDictionaries[lang];
  return {
    title: clampMeta(hub.hero.title, 60),
    description: clampMeta(hub.hero.lead, 160),
    breadcrumbs: [{ name: HOME[lang], href: "/" }, { name: hub.hero.title }],
  };
}
