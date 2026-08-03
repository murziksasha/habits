"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import clsx from "clsx";

const NAV = [
  { href: "/admin", key: "title", icon: "🛠️" },
  { href: "/admin/courses", key: "courses", icon: "📚" },
  { href: "/admin/content", key: "content", icon: "✏️" },
  { href: "/admin/appearance", key: "appearance", icon: "🎨" },
  { href: "/admin/users", key: "users", icon: "👥" },
  { href: "/admin/metrics", key: "metrics", icon: "📈" },
  { href: "/admin/feedback", key: "audit", label: "Feedback", icon: "💬" },
  { href: "/admin/audit", key: "audit", icon: "📋" },
  { href: "/admin/billing", key: "billing", icon: "💳" },
  { href: "/admin/classroom", key: "classroom", icon: "🏫" },
  { href: "/admin/parents", key: "parents", icon: "👪" },
  { href: "/admin/engagement", key: "engagement", icon: "🏆" },
  { href: "/admin/programming", key: "programming", icon: "💻" },
  { href: "/admin/security", key: "security", icon: "🔐" },
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const { t } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user || user.role !== "admin") {
      router.replace("/dashboard");
      return;
    }
    if (user.mfaEnrollRequired && !pathname?.startsWith("/admin/security") && !pathname?.startsWith("/admin/mfa")) {
      router.replace("/admin/security");
    }
  }, [loading, user, router, pathname]);

  if (loading || !user || user.role !== "admin") {
    return <p className="p-6 font-bold text-ink-muted">{t.common.loading}</p>;
  }

  return (
    <div className="flex min-h-[70vh] gap-0 md:gap-6">
      <button
        type="button"
        className="btn-secondary fixed bottom-20 right-4 z-40 !py-2 md:hidden"
        onClick={() => setOpen((v) => !v)}
      >
        ☰ Admin
      </button>
      <aside
        className={clsx(
          "shrink-0 border-r border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900",
          "fixed inset-y-0 left-0 z-30 w-64 transform p-4 transition md:static md:translate-x-0 md:rounded-3xl md:border-2",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="text-lg font-black">{t.admin.title}</p>
          <button type="button" className="md:hidden text-sm font-bold" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>
        <p className="mb-3 truncate text-xs font-bold text-ink-muted">{user.email}</p>
        {user.totpEnabled ? (
          <p className="mb-3 rounded-xl bg-brand-soft px-2 py-1 text-xs font-bold text-brand-dark">
            2FA ✓
          </p>
        ) : (
          <p className="mb-3 rounded-xl bg-amber-100 px-2 py-1 text-xs font-bold text-amber-800">
            2FA off
          </p>
        )}
        <nav className="flex flex-col gap-1">
          {NAV.map((item) => {
            const label =
              "label" in item && item.label
                ? item.label
                : (t.admin as Record<string, string>)[item.key] ?? item.key;
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "rounded-xl px-3 py-2 text-sm font-bold transition",
                  active
                    ? "bg-brand text-white shadow-btn"
                    : "text-ink hover:bg-slate-50 dark:hover:bg-slate-800",
                )}
              >
                {item.icon} {label}
              </Link>
            );
          })}
        </nav>
      </aside>
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-20 bg-black/30 md:hidden"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      )}
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
