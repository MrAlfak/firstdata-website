"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useT } from "@/i18n/LangProvider";
import type { PublicUser } from "@/lib/auth/types";
import { PanelCard, PanelLoading } from "@/components/panel/PanelLayoutClient";

const NAV = [
  { href: "/admin", key: "dashboard" as const, exact: true },
  { href: "/admin/projects", key: "projects" as const },
  { href: "/admin/tickets", key: "tickets" as const },
  { href: "/admin/leads", key: "leads" as const },
  { href: "/admin/contracts", key: "contracts" as const },
  { href: "/admin/invoices", key: "invoices" as const },
  { href: "/admin/team", key: "team" as const },
];

function isStaffRole(role: string) {
  return role === "admin" || role === "staff";
}

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const { fa, dir, a } = useT();
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (!data.user) {
          router.replace(`/auth/login?next=${encodeURIComponent(pathname || "/admin")}`);
          return;
        }
        if (!isStaffRole(data.user.role)) {
          setForbidden(true);
          return;
        }
        setUser(data.user);
      })
      .finally(() => setLoading(false));
  }, [pathname, router]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/auth/login");
    router.refresh();
  }

  const font = fa ? "font-fa" : "font-mono";

  if (loading) {
    return (
      <div className={`min-h-screen pt-20 ${font}`} dir={dir}>
        <div className="mx-auto max-w-6xl px-4 py-8">
          <PanelLoading label={a.common.loading} />
        </div>
      </div>
    );
  }

  if (forbidden) {
    return (
      <div className={`min-h-screen pt-20 ${font}`} dir={dir}>
        <div className="mx-auto max-w-lg px-4 py-8">
          <PanelCard>
            <p className="text-sm text-paper/70">{a.forbidden}</p>
            <Link href="/" className="mt-4 inline-block text-xs text-term">
              {a.nav.backToSite}
            </Link>
          </PanelCard>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-20 ${font}`} dir={dir}>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:px-8">
        <aside className="shrink-0 lg:w-56">
          <div className="border border-accent/30 bg-paper/[0.02] p-4">
            <p className="text-[10px] uppercase tracking-widest text-accent/70">Staff</p>
            {user && <p className="mt-2 text-sm text-paper/70">{user.name}</p>}
            <nav className="mt-4 flex flex-row flex-wrap gap-1 lg:flex-col" aria-label="Admin">
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
                        ? "border border-accent/40 bg-accent/10 text-paper"
                        : "text-paper/50 hover:text-paper"
                    }`}
                  >
                    {a.nav[item.key]}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 flex flex-col gap-2 border-t border-paper/10 pt-4 text-xs">
              <Link href="/panel" className="text-paper/45 hover:text-paper">
                {a.nav.clientPanel}
              </Link>
              <Link href="/" className="text-paper/45 hover:text-paper">
                {a.nav.backToSite}
              </Link>
              <button
                type="button"
                onClick={logout}
                className="text-start text-paper/45 hover:text-paper"
              >
                {a.nav.logout}
              </button>
            </div>
          </div>
        </aside>
        <div className="min-w-0 flex-1">{user ? children : null}</div>
      </div>
    </div>
  );
}
