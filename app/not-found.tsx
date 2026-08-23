"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteErrorPage from "@/components/errors/SiteErrorPage";
import { useT } from "@/i18n/LangProvider";
import { searchDictionaries } from "@/i18n/search";

export default function NotFound() {
  const { lang, t } = useT();
  const searchUi = searchDictionaries[lang];

  return (
    <>
      <Header />
      <main className="pt-20">
        <SiteErrorPage
          pageKey="notFound"
          code="404"
          extraActions={[
            { label: searchUi.pageTitle, href: "/search", primary: false },
            { label: t("nav.product"), href: "/product", primary: false },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
