"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteErrorPage from "@/components/errors/SiteErrorPage";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <SiteErrorPage pageKey="notFound" code="404" />
      </main>
      <Footer />
    </>
  );
}
