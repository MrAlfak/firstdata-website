"use client";

import PortfolioCategoryPage from "@/components/portfolio/PortfolioCategoryPage";
import { SLUG_TO_CATEGORY } from "@/config/portfolio";

type Props = {
  slug: string;
};

export default function PortfolioSubClient({ slug }: Props) {
  const category = SLUG_TO_CATEGORY[slug];
  if (!category) return null;

  return <PortfolioCategoryPage category={category} />;
}
