"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useT } from "@/i18n/LangProvider";
import { getDocumentTitle } from "@/lib/seo/document-title";

export default function DocumentTitle() {
  const pathname = usePathname();
  const { lang } = useT();

  useEffect(() => {
    document.title = getDocumentTitle(pathname, lang);
  }, [pathname, lang]);

  return null;
}
