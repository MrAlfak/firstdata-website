import ProjectDetailClient from "@/components/panel/ProjectDetailClient";

export default async function PanelProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProjectDetailClient id={id} />;
}
