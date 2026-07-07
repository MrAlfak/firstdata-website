import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Session Expired",
  robots: { index: false, follow: false },
};

export default function SessionExpiredLayout({ children }: { children: React.ReactNode }) {
  return children;
}
