"use client";

import Link from "next/link";
import InnerPage from "@/components/layout/InnerPage";
import ProjectRequestForm from "@/components/contact/ProjectRequestForm";
import ConsultationRequestForm from "@/components/contact/ConsultationRequestForm";
import CollaborateForm from "@/components/contact/CollaborateForm";
import { CONTACT_SLUG_TO_PAGE, type ContactSubPageKey } from "@/config/navigation";
import { useT } from "@/i18n/LangProvider";

type Props = {
  slug: string;
};

export default function ContactSubClient({ slug }: Props) {
  const { d, fa, t } = useT();
  const pageKey = CONTACT_SLUG_TO_PAGE[slug] as ContactSubPageKey;
  const page = d.pages[pageKey];

  if (slug === "request") {
    return (
      <InnerPage
        eyebrow={page.eyebrow}
        title={page.title}
        subtitle={page.subtitle}
        lines={page.lines}
      >
        <ProjectRequestForm />
      </InnerPage>
    );
  }

  if (slug === "consultation") {
    return (
      <InnerPage
        eyebrow={page.eyebrow}
        title={page.title}
        subtitle={page.subtitle}
        lines={page.lines}
      >
        <ConsultationRequestForm />
      </InnerPage>
    );
  }

  if (slug === "collaborate") {
    return (
      <InnerPage
        eyebrow={page.eyebrow}
        title={page.title}
        subtitle={page.subtitle}
        lines={page.lines}
      >
        <CollaborateForm />
      </InnerPage>
    );
  }

  return (
    <InnerPage
      eyebrow={page.eyebrow}
      title={page.title}
      subtitle={page.subtitle}
      lines={page.lines}
    >
      <Link
        href="/contactus"
        className={`inline-flex border border-term bg-term/15 px-5 py-3 text-sm text-term transition-colors duration-200 hover:bg-term hover:text-ink ${
          fa ? "font-fa normal-case" : "tracking-wide"
        }`}
      >
        {t("nav.contactus")}
      </Link>
    </InnerPage>
  );
}
