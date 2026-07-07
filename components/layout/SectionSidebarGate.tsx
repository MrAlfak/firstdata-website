"use client";

import { usePathname } from "next/navigation";
import SectionSidebar from "@/components/SectionSidebar";

/** Scroll-spy sidebar — only on the services page */
export default function SectionSidebarGate() {
  const pathname = usePathname();
  if (pathname !== "/services") return null;
  return <SectionSidebar />;
}
