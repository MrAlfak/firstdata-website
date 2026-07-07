"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useT } from "@/i18n/LangProvider";
import type { PublicUser } from "@/lib/auth/types";

const NAV = [
  { href: "/panel", key: "dashboard" as const, exact: true },
  { href: "/panel/projects", key: "projects" as const },
  { href: "/panel/contracts", key: "contracts" as const },
  { href: "/panel/tickets", key: "tickets" as const },
  { href: "/panel/files", key: "files" as const },
  { href: "/panel/invoices", key: "invoices" as const },
  { href: "/panel/requests", key: "requests" as const },
  { href: "/panel/notifications", key: "notifications" as const },
  { href: "/panel/org", key: "org" as const },
  { href: "/panel/account", key: "account" as const },
];

export function PanelCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`border border-paper/15 bg-paper/[0.02] p-4 sm:p-5 ${className}`}>{children}</div>
  );
}

export function PanelLoading({ label }: { label: string }) {
  return <p className="font-mono text-sm text-paper/40">{label}</p>;
}

export function PanelEmpty({ label }: { label: string }) {
  return <p className={`text-sm text-paper/45 ${label.includes("…") ? "font-mono" : ""}`}>{label}</p>;
}

export function PanelAlert({ message, variant = "error" }: { message: string; variant?: "error" | "success" }) {
  const cls =
    variant === "success"
      ? "border-term/30 bg-term/5 text-term"
      : "border-red-500/30 bg-red-500/5 text-red-300";
  return <p className={`border px-3 py-2 text-sm ${cls}`}>{message}</p>;
}

export default function PanelLayoutClient({ children }: { children: React.ReactNode }) {
  const { fa, dir, p, d } = useT();
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (!data.user) {
          router.replace(`/auth/login?next=${encodeURIComponent(pathname || "/panel")}`);
          return;
        }
        setUser(data.user);
      })
      .finally(() => setLoading(false));
  }, [pathname, router]);

  useEffect(() => {
    if (!user) return;
    fetch("/api/panel/notifications?unread=1")
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setUnreadCount(j.notifications?.length ?? 0);
      });
  }, [user, pathname]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/auth/login");
    router.refresh();
  }

  const font = fa ? "font-fa" : "font-mono";

  return (
    <div className={`min-h-screen pt-20 ${font}`} dir={dir}>
      <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:px-8 xl:px-10">
        <aside className="shrink-0 lg:w-60">
          <div className="border border-paper/20 bg-paper/[0.02] p-4">
            <p className="text-[10px] uppercase tracking-widest text-paper/35">
              {d.pages.panel.title}
            </p>
            {user && (
              <p className="mt-2 text-sm text-paper/70">{user.name}</p>
            )}
            <nav className="mt-4 flex flex-row flex-wrap gap-1 lg:flex-col" aria-label="Panel">
              {NAV.map((item) => {
                const active = item.exact
                  ? pathname === item.href
                  : pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-2 py-1.5 text-xs transition-colors ${
                      active
                        ? "border border-paper/30 bg-paper/[0.06] text-paper"
                        : "text-paper/50 hover:text-paper"
                    }`}
                  >
                    {p.nav[item.key]}
                    {item.key === "notifications" && unreadCount > 0 && (
                      <span className="ms-1 inline-flex min-w-[1rem] items-center justify-center rounded-full bg-term/20 px-1 text-[10px] text-term" dir="ltr">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 flex flex-col gap-2 border-t border-paper/10 pt-4 text-xs">
              <Link href="/" className="text-paper/45 hover:text-paper">
                {p.nav.backToSite}
              </Link>
              <button
                type="button"
                onClick={logout}
                className="text-start text-paper/45 hover:text-paper"
              >
                {p.nav.logout}
              </button>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {loading ? (
            <PanelLoading label={p.common.loading} />
          ) : user ? (
            children
          ) : null}
        </div>
      </div>
    </div>
  );
}
