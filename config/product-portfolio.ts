import type { ProductSlug } from "@/i18n/product-page";
import {
  getAllProjects,
  type PortfolioCategory,
  type PortfolioProject,
} from "./portfolio";

const SLUG_CATEGORIES: Record<ProductSlug, PortfolioCategory[]> = {
  web: ["websites", "ecommerce"],
  mobile: ["mobile-apps"],
  windows: ["desktop"],
  ai: ["other"],
  platforms: ["other", "websites"],
};

function sortFeaturedFirst(a: PortfolioProject, b: PortfolioProject): number {
  if (a.featured && !b.featured) return -1;
  if (!a.featured && b.featured) return 1;
  return (b.year ?? "").localeCompare(a.year ?? "");
}

export function getProjectsForProduct(slug: ProductSlug, limit = 3): PortfolioProject[] {
  const categories = SLUG_CATEGORIES[slug];
  return getAllProjects()
    .filter((p) => categories.includes(p.category))
    .sort(sortFeaturedFirst)
    .slice(0, limit);
}
