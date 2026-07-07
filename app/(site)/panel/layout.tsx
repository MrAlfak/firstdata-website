import PanelLayoutClient from "@/components/panel/PanelLayoutClient";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return <PanelLayoutClient>{children}</PanelLayoutClient>;
}
