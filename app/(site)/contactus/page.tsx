import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  path: "/contactus",
  title: "Contact First Data",
  description:
    "Get in touch with First Data. We build websites, Android apps, iOS apps, Windows software, and provide SEO optimization.",
});

export default function ContactUsPage() {
  return (
    <main className="pt-20">
      <ContactClient />
    </main>
  );
}
