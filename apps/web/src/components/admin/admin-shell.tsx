"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { PageLoading } from "@/components/page-loading";
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
  const { t, locale } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user || user.role !== "admin") {
      router.replace("/dashboard");
      return;
    }
    if (
      user.mfaEnrollRequired &&
      !pathname?.startsWith("/admin/security") &&
      !pathname?.startsWith("/admin/mfa")
    ) {
      router.replace("/admin/security");
    }
  }, [loading, user, router, pathname]);

  // Close drawer on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (loading || !user || user.role !== "admin") {
    return (
      <div className="p-6">
        <PageLoading label={t.common.loading} />
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] gap-0 md:gap-6">
      <a
        href="#admin-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-[100] focus:rounded-xl focus:bg-brand focus:px-4 focus:py-2 focus:font-bold focus:text-white"
      >
        {locale === "en" ? "Skip to admin content" : "До змісту адмінки"}
      </a>

      <button
        type="button"
        className="btn-secondary fixed bottom-20 right-4 z-40 min-h-11 !py-2 md:hidden"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="admin-sidebar"
      >
        ☰ Admin
      </button>

      {open && (
        <button
          type="button"
          className="fixed inset-0 z-20 bg-black/30 md:hidden"
          aria-label={locale === "en" ? "Close menu" : "Закрити меню"}
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        id="admin-sidebar"
        aria-label={t.admin.title}
        className={clsx(
          "shrink-0 border-r border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900",
          "fixed inset-y-0 left-0 z-30 w-64 transform p-4 transition md:static md:translate-x-0 md:rounded-3xl md:border-2",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="text-lg font-black">{t.admin.title}</p>
          <button
            type="button"
            className="min-h-11 min-w-11 rounded-xl text-sm font-bold md:hidden"
            onClick={() => setOpen(false)}
            aria-label={locale === "en" ? "Close" : "Закрити"}
          >
            ✕
          </button>
        </div>
        <p className="mb-3 truncate text-xs font-bold text-ink-muted">{user.email}</p>
        {user.totpEnabled ? (
          <p className="mb-3 rounded-xl bg-brand-soft px-2 py-1 text-xs font-bold text-brand-dark">
            2FA ✓
          </p>
        ) : (
          <p className="mb-3 rounded-xl bg-amber-100 px-2 py-1 text-xs font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-200">
            2FA off
          </p>
        )}
        <nav className="flex flex-col gap-1" aria-label="Admin modules">
          {NAV.map((item) => {
            const label =
              "label" in item && item.label
                ? item.label
                : ((t.admin as Record<string, string>)[item.key] ?? item.key);
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition",
                  active
                    ? "bg-brand text-white shadow-btn"
                    : "text-ink hover:bg-slate-50 dark:hover:bg-slate-800",
                )}
              >
                <span aria-hidden>{item.icon}</span>
                {label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/learn"
          className="mt-4 block rounded-xl px-3 py-2 text-xs font-bold text-sky hover:underline"
        >
          ← {t.nav.learn}
        </Link>
      </aside>

      <div id="admin-main" className="min-w-0 flex-1 pb-24 md:pb-0" role="main">
        {children}
      </div>
    </div>
  );
}
