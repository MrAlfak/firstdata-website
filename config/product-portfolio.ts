import type { ProductSlug } from "@/i18n/product-page";
import {
  getAllProjects,
  getProjectById,
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

export function getFlagshipProjectForProduct(slug: ProductSlug, projectId: string): PortfolioProject | undefined {
  const project = getProjectById(projectId);
  if (!project) return undefined;
  const categories = SLUG_CATEGORIES[slug];
  if (!categories.includes(project.category)) {
    return getProjectsForProduct(slug, 1)[0];
  }
  return project;
}
