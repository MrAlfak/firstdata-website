import type { Metadata } from "next";
import ServiceSection from "@/components/ServiceSection";
import Process from "@/components/sales/Process";
import Testimonials from "@/components/sales/Testimonials";
import Faq from "@/components/sales/Faq";
import FinalCta from "@/components/sales/FinalCta";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { dictionaries } from "@/i18n/dictionaries";
import { buildBilingualFaqJsonLd } from "@/lib/seo/faq-jsonld";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  path: "/services", title: "Services", description:
    "Web design, Android, iOS, Windows software, SEO, UI/UX, consulting, e-commerce, and support, First Data services.", });

const faqSchemas = buildBilingualFaqJsonLd(dictionaries.en.faq.items, dictionaries.fa.faq.items);

const breadcrumbs = [
  { name: "Home", href: "/" }, { name: "Services" }, ];

export default function ServicesPage() {
  return (
    <main>
      <BreadcrumbJsonLd items={breadcrumbs} />
      {faqSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <article aria-label="Services">
        <ServiceSection number="01" />
        <ServiceSection number="02" />
        <ServiceSection number="03" />
        <ServiceSection number="04" />
        <ServiceSection number="05" />
        <ServiceSection number="06" />
        <ServiceSection number="07" />
        <ServiceSection number="08" />
        <ServiceSection number="09" />
      </article>
      <Process />
      <Testimonials />
      <Faq />
      <FinalCta />
    </main>
  );
}
