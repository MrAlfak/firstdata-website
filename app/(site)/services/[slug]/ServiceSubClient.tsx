"use client";

import ServiceSection from "@/components/ServiceSection";
import AndroidServicePage from "@/components/services/AndroidServicePage";
import ConsultingServicePage from "@/components/services/ConsultingServicePage";
import EcommerceServicePage from "@/components/services/EcommerceServicePage";
import IosServicePage from "@/components/services/IosServicePage";
import SeoServicePage from "@/components/services/SeoServicePage";
import SupportServicePage from "@/components/services/SupportServicePage";
import UiUxServicePage from "@/components/services/UiUxServicePage";
import WebDesignServicePage from "@/components/services/WebDesignServicePage";
import FinalCta from "@/components/sales/FinalCta";
import { SERVICES_SLUG_TO_NUMBER } from "@/config/navigation";

type Props = {
  slug: string;
};

export default function ServiceSubClient({ slug }: Props) {
  if (slug === "web-design") {
    return <WebDesignServicePage />;
  }

  if (slug === "ui-ux") {
    return <UiUxServicePage />;
  }

  if (slug === "ecommerce") {
    return <EcommerceServicePage />;
  }

  if (slug === "android") {
    return <AndroidServicePage />;
  }

  if (slug === "ios") {
    return <IosServicePage />;
  }

  if (slug === "seo") {
    return <SeoServicePage />;
  }

  if (slug === "consulting") {
    return <ConsultingServicePage />;
  }

  if (slug === "support") {
    return <SupportServicePage />;
  }

  const serviceNumber = SERVICES_SLUG_TO_NUMBER[slug];
  if (!serviceNumber) return null;

  return (
    <>
      <ServiceSection number={serviceNumber} />
      <FinalCta />
    </>
  );
}
