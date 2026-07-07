import type { Metadata } from "next";
import TermsClient from "./TermsClient";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  path: "/terms", title: "Terms of Use, First Data", description:
    "Terms of use, versioning policy, and release changelog for the First Data website.", });

export default function TermsPage() {
  return (
    <main className="pt-20">
      <TermsClient />
    </main>
  );
}
