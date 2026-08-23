"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import BreadcrumbNav from "@/components/seo/BreadcrumbNav";
import { useT } from "@/i18n/LangProvider";
import { buildSiteBreadcrumbs } from "@/lib/seo/site-breadcrumbs";

/** Site-wide trail below the header; hidden on home, panel, and admin. */
export default function SiteBreadcrumbBar() {
  const pathname = usePathname() ?? "/";
  const { fa, lang } = useT();

  const items = useMemo(() => buildSiteBreadcrumbs(pathname, lang), [pathname, lang]);

  if (items.length === 0) return null;

  return (
    <div className="fd-below-header relative z-10 mx-auto w-full max-w-6xl px-4 pb-2 sm:px-6 lg:px-8">
      <BreadcrumbNav items={items} fa={fa} />
    </div>
  );
}
