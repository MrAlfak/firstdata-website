"use client";

import type { PortfolioProject } from "@/config/portfolio";
import PortfolioCaseFile from "@/components/portfolio/PortfolioCaseFile";

type Props = {
  project: PortfolioProject;
};

/** Compact case-file card for portfolio grids (flagship stage is product-page only). */
export default function PortfolioProjectCard({ project }: Props) {
  return <PortfolioCaseFile project={project} variant="compact" />;
}
