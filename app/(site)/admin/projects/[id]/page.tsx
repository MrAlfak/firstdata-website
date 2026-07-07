import AdminProjectDetailClient from "@/components/admin/AdminProjectDetailClient";

export default async function AdminProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AdminProjectDetailClient projectId={id} />;
}
