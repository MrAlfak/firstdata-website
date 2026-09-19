import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionSidebarGate from "@/components/layout/SectionSidebarGate";
import StickyAiPrompt from "@/components/interactive/StickyAiPrompt";
import SiteBreadcrumbBar from "@/components/seo/SiteBreadcrumbBar";
import BackToTop from "@/components/ui/BackToTop";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="site-shell" suppressHydrationWarning>
      <Header />
      <SectionSidebarGate />
      <SiteBreadcrumbBar />
      {children}
      <Footer />
      <StickyAiPrompt />
      <BackToTop />
    </div>
  );
}
