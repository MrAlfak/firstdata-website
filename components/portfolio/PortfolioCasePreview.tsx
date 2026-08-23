"use client";

import type { PortfolioCategory, PortfolioProject } from "@/config/portfolio";
import { useT } from "@/i18n/LangProvider";

type Props = {
  project: PortfolioProject;
  compact?: boolean;
};

function Pulse({ className = "" }: { className?: string }) {
  return <div className={`rounded-sm bg-paper/10 product-demo-pulse ${className}`} aria-hidden />;
}

function BrowserShell({
  title,
  path,
  tall,
}: {
  title: string;
  path: string;
  tall?: boolean;
}) {
  return (
    <div className="overflow-hidden border border-paper/20 bg-[#080c08] shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
      <div className="flex items-center gap-2 border-b border-paper/10 bg-[#0c120c] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5a5a]/75" />
        <span className="h-2 w-2 rounded-full bg-[#ffb020]/75" />
        <span className="h-2 w-2 rounded-full bg-term/60" />
        <span className="ms-2 min-w-0 flex-1 truncate font-mono text-[9px] text-paper/35" dir="ltr">
          firstdata.ir/{path}
        </span>
      </div>
      <div className={`space-y-3 p-4 ${tall ? "sm:p-6" : ""}`}>
        <div className="flex items-end justify-between gap-3">
          <Pulse className={`${tall ? "h-4 w-2/5" : "h-3 w-1/3"} bg-term/25`} />
          <Pulse className="h-6 w-16 bg-term/20" />
        </div>
        <p className="truncate font-mono text-[10px] uppercase tracking-wider text-paper/45" dir="ltr">
          {title}
        </p>
        <div className={`grid grid-cols-3 gap-2 ${tall ? "gap-3" : ""}`}>
          <Pulse className={tall ? "h-20" : "h-14"} />
          <Pulse className={`${tall ? "h-20" : "h-14"} bg-term/15`} />
          <Pulse className={tall ? "h-20" : "h-14"} />
        </div>
        <Pulse className={tall ? "h-16 w-full" : "h-10 w-full"} />
        {tall ? (
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Pulse className="h-8" />
            <Pulse className="h-8 bg-term/10" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function PhoneShell({ title, tall }: { title: string; tall?: boolean }) {
  return (
    <div className={`mx-auto ${tall ? "max-w-[220px]" : "max-w-[160px]"}`}>
      <div className="overflow-hidden rounded-[1.35rem] border-2 border-paper/25 bg-[#080c08] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
        <div className="overflow-hidden rounded-[1rem] border border-paper/10 bg-[#060906]">
          <div className="flex justify-center py-1.5">
            <span className="h-1 w-10 rounded-full bg-paper/20" />
          </div>
          <div className={`space-y-2 px-3 pb-4 ${tall ? "min-h-[260px]" : "min-h-[180px]"}`}>
            <Pulse className="h-2 w-1/2 bg-term/25" />
            <p className="truncate font-mono text-[9px] text-paper/40" dir="ltr">
              {title}
            </p>
            <Pulse className={`${tall ? "h-24" : "h-16"} w-full`} />
            <Pulse className="h-8 w-full" />
            <div className="flex gap-2 pt-1">
              <Pulse className="h-8 flex-1 bg-term/20" />
              <Pulse className="h-8 flex-1" />
            </div>
            {tall ? <Pulse className="mt-2 h-12 w-full" /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopShell({ title, tall }: { title: string; tall?: boolean }) {
  return (
    <div className="overflow-hidden border border-paper/20 bg-[#080c08] shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
      <div className="flex items-center justify-between border-b border-paper/10 bg-[#0c120c] px-3 py-1.5">
        <span className="truncate font-mono text-[9px] text-term/70" dir="ltr">
          {title}.exe
        </span>
        <span className="font-mono text-[9px] text-paper/30">— □ ×</span>
      </div>
      <div className={`grid grid-cols-[100px_1fr] ${tall ? "min-h-[220px] sm:grid-cols-[140px_1fr]" : "min-h-[140px]"}`}>
        <div className="space-y-2 border-e border-paper/10 p-3">
          <Pulse className="h-2 w-full bg-term/20" />
          <Pulse className="h-2 w-4/5" />
          <Pulse className="h-2 w-full" />
          <Pulse className="h-2 w-3/5 bg-term/15" />
        </div>
        <div className="space-y-2 p-3">
          <Pulse className="h-3 w-1/2" />
          <Pulse className={`${tall ? "h-28" : "h-16"} w-full`} />
          <div className="flex justify-end gap-2">
            <Pulse className="h-6 w-14" />
            <Pulse className="h-6 w-14 bg-term/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

function OtherShell({ title, tall }: { title: string; tall?: boolean }) {
  const nodes = ["API", "Sync", "Auth", "Data"];
  return (
    <div className="overflow-hidden border border-paper/20 bg-[#080c08] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:p-6">
      <p className="mb-3 truncate font-mono text-[9px] uppercase tracking-wider text-term/55" dir="ltr">
        {title}
      </p>
      <div className={`grid grid-cols-2 gap-3 ${tall ? "gap-4" : ""}`}>
        {nodes.map((label, i) => (
          <div
            key={label}
            className="flex items-center justify-center border border-term/25 bg-term/[0.04] px-3 py-4 font-mono text-[10px] uppercase tracking-wider text-term/80 product-demo-node"
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

function previewForCategory(
  category: PortfolioCategory,
  title: string,
  path: string,
  tall: boolean,
) {
  if (category === "mobile-apps") return <PhoneShell title={title} tall={tall} />;
  if (category === "desktop") return <DesktopShell title={title} tall={tall} />;
  if (category === "other") return <OtherShell title={title} tall={tall} />;
  return <BrowserShell title={title} path={path} tall={tall} />;
}

export default function PortfolioCasePreview({ project, compact = false }: Props) {
  const { lang } = useT();
  const title = project.title.en;
  const path = project.id.replace(/-/g, "/");

  if (project.cover) {
    return (
      <div className={compact ? "pointer-events-none select-none" : "pointer-events-none select-none"}>
        <div className="overflow-hidden border border-paper/20 bg-[#080c08] shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
          <div className="flex items-center gap-2 border-b border-paper/10 bg-[#0c120c] px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-[#ff5a5a]/75" />
            <span className="h-2 w-2 rounded-full bg-[#ffb020]/75" />
            <span className="h-2 w-2 rounded-full bg-term/60" />
            <span className="ms-2 min-w-0 flex-1 truncate font-mono text-[9px] text-paper/35" dir="ltr">
              {title}
            </span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.cover}
            alt=""
            className={`w-full object-cover object-top ${compact ? "max-h-40" : "max-h-72 sm:max-h-96"}`}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={compact ? "pointer-events-none select-none" : "pointer-events-none select-none"}>
      {previewForCategory(project.category, title, path, !compact)}
    </div>
  );
}
