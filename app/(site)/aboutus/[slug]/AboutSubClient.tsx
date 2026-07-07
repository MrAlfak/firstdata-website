"use client";
import AboutHonorsPage from "@/components/about/AboutHonorsPage";
import AboutPartnersPage from "@/components/about/AboutPartnersPage";
import AboutPurposePage from "@/components/about/AboutPurposePage";
import AboutTeamPage from "@/components/about/AboutTeamPage";

type Props = {
  slug: string;
};

export default function AboutSubClient({ slug }: Props) {
  if (slug === "vision") {
    return <AboutPurposePage kind="vision" />;
  }

  if (slug === "mission") {
    return <AboutPurposePage kind="mission" />;
  }

  if (slug === "team") {
    return <AboutTeamPage />;
  }

  if (slug === "partners") {
    return <AboutPartnersPage />;
  }

  if (slug === "honors") {
    return <AboutHonorsPage />;
  }

  return null;
}
