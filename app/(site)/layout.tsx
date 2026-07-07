import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionSidebarGate from "@/components/layout/SectionSidebarGate";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <SectionSidebarGate />
      {children}
      <Footer />
    </>
  );
}
