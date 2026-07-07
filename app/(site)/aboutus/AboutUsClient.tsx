"use client";

import InnerPage from "@/components/layout/InnerPage";
import AboutStatsStrip from "@/components/about/AboutStatsStrip";
import AboutStory from "@/components/about/AboutStory";
import AboutTimeline from "@/components/about/AboutTimeline";
import AboutVisionMission from "@/components/about/AboutVisionMission";
import AboutWhy from "@/components/about/AboutWhy";
import AboutTeamPreview from "@/components/about/AboutTeamPreview";
import AboutOffices from "@/components/about/AboutOffices";
import AboutHonorsPreview from "@/components/about/AboutHonorsPreview";
import AboutExplore from "@/components/about/AboutExplore";
import Process from "@/components/sales/Process";
import Testimonials from "@/components/sales/Testimonials";
import Faq from "@/components/sales/Faq";
import FinalCta from "@/components/sales/FinalCta";
import { useT } from "@/i18n/LangProvider";

export default function AboutUsClient() {
  const { d } = useT();
  const page = d.pages.aboutus;

  return (
    <>
      <InnerPage
        eyebrow={page.eyebrow}
        title={page.title}
        subtitle={page.subtitle}
        lines={page.lines}
      />
      <AboutStatsStrip />
      <AboutStory />
      <AboutTimeline />
      <AboutVisionMission />
      <AboutWhy />
      <AboutTeamPreview />
      <AboutOffices />
      <AboutHonorsPreview />
      <AboutExplore />
      <Process />
      <Testimonials />
      <Faq />
      <FinalCta plain />
    </>
  );
}
