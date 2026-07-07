import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "403 Forbidden",
  robots: { index: false, follow: false },
};

export default function Forbidden403Layout({ children }: { children: React.ReactNode }) {
  return children;
}
