import { redirect } from "next/navigation";

/** Legacy route — files menu renamed to documents. */
export default function PanelFilesRedirectPage() {
  redirect("/panel/documents");
}
