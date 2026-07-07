import { TicketDetailClient } from "@/components/panel/TicketsClient";

export default async function PanelTicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <TicketDetailClient id={id} />;
}
