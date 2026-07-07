import type { Metadata } from "next";
import DashboardClient from "@/components/panel/DashboardClient";

export const metadata: Metadata = {
  title: "User Panel", description: "First Data client panel, projects, contracts, tickets, files, and invoices.", robots: { index: false, follow: false }, };

export default function PanelDashboardPage() {
  return <DashboardClient />;
}
