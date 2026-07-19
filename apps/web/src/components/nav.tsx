"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { useTheme } from "@/lib/theme-context";
import { NotificationsBell } from "@/components/notifications-bell";

const PRIMARY_HREFS = new Set([
  "/dashboard",
  "/courses",
  "/programming",
  "/playground",
  "/play",
  "/friends",
  "/leaderboard",
]);

export function Nav() {
  const pathname = usePathname();
  const { user, character, logout } = useAuth();
  const { t, locale, setLocale } = useLocale();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  // Embed routes: chrome-free for iframe / share embeds
  if (pathname.startsWith("/embed")) return null;
  const baseLinks = [
    { href: "/dashboard", label: t.nav.home, icon: "🏠" },
    { href: "/courses", label: t.nav.courses, icon: "📚" },
    { href: "/programming", label: t.nav.programming, icon: "💻" },
    { href: "/playground", label: t.nav.playground, icon: "🖥️" },
    { href: "/search", label: t.nav.search, icon: "🔍" },
    { href: "/play", label: t.nav.play, icon: "♟️" },
    { href: "/challenges", label: t.nav.challenges, icon: "🎯" },
    { href: "/friends", label: t.nav.friends, icon: "👥" },
    { href: "/bookmarks", label: t.nav.bookmarks, icon: "⭐" },
    { href: "/review", label: t.nav.review, icon: "🔁" },
    { href: "/quests", label: t.nav.quests, icon: "✅" },
    { href: "/shop", label: t.nav.shop, icon: "🛒" },
    { href: "/notes", label: t.nav.notes, icon: "📔" },
    { href: "/focus", label: t.nav.focus, icon: "⏱️" },
    { href: "/flashcards", label: t.nav.flashcards, icon: "🃏" },
    { href: "/tutor", label: t.nav.tutor, icon: "🤖" },
    { href: "/calendar", label: t.nav.calendar, icon: "📅" },
    { href: "/placement", label: t.nav.placement, icon: "🧭" },
    { href: "/export", label: t.nav.export, icon: "📦" },
    { href: "/reports", label: t.nav.reports, icon: "📧" },
    { href: "/achievements", label: t.engagement.achievements, icon: "🏅" },
    { href: "/certificates", label: t.nav.certificates, icon: "📜" },
    { href: "/homework", label: t.nav.homework, icon: "📝" },
    { href: "/parents", label: t.nav.parents, icon: "👪" },
    { href: "/referrals", label: t.nav.referrals, icon: "🎁" },
    { href: "/tournaments", label: t.nav.tournaments, icon: "🏁" },
    { href: "/schools", label: t.nav.schools, icon: "🏫" },
    { href: "/leaderboard", label: t.nav.leaderboard, icon: "🏆" },
    { href: "/pricing", label: t.nav.pricing, icon: "💎" },
  ];
  const links =
    user?.role === "admin"
      ? [...baseLinks, { href: "/admin", label: t.admin.title, icon: "🛠️" }]
      : baseLinks;
  const primaryLinks = links.filter((l) => PRIMARY_HREFS.has(l.href));
  const moreLinks = links.filter((l) => !PRIMARY_HREFS.has(l.href));
  const moreActive = moreLinks.some((l) => pathname.startsWith(l.href));

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link
            href="/"
            className="flex items-center gap-2 font-black text-xl text-brand-dark"
            onClick={() => setOpen(false)}
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-white shadow-btn">
              E
            </span>
            <span className="hidden xs:inline sm:inline">{t.appName}</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 relative">
            {primaryLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  "rounded-xl px-3 py-2 text-sm font-bold transition",
                  pathname.startsWith(l.href)
                    ? "bg-brand-soft text-brand-dark"
                    : "text-ink-muted hover:bg-slate-100",
                )}
              >
                {l.label}
              </Link>
            ))}
            <div className="relative">
              <button
                type="button"
                className={clsx(
                  "rounded-xl px-3 py-2 text-sm font-bold transition",
                  moreActive || moreOpen
                    ? "bg-brand-soft text-brand-dark"
                    : "text-ink-muted hover:bg-slate-100",
                )}
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
              >
                {locale === "en" ? "More" : "Ще"} ▾
              </button>
              {moreOpen && (
                <>
                  <button
                    type="button"
                    className="fixed inset-0 z-40 cursor-default"
                    aria-label="Close"
                    onClick={() => setMoreOpen(false)}
                  />
                  <div className="absolute right-0 top-full z-50 mt-1 max-h-[70vh] w-56 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-950">
                    {moreLinks.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={() => setMoreOpen(false)}
                        className={clsx(
                          "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold",
                          pathname.startsWith(l.href)
                            ? "bg-brand-soft text-brand-dark"
                            : "text-ink-muted hover:bg-slate-100 dark:hover:bg-slate-900",
                        )}
                      >
                        <span>{l.icon}</span>
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <NotificationsBell />
                <Link
                  href="/profile"
                  className="flex items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white px-2 py-1 sm:px-3 sm:py-1.5"
                >
                  <span className="text-lg">🧙</span>
                  <span className="hidden sm:inline text-sm font-bold">
                    {character?.displayName}
                    <span className="ml-2 text-ink-muted font-semibold">
                      {t.dashboard.level} {character?.globalLevel ?? 1}
                    </span>
                  </span>
                  {user.plan === "premium" && (
                    <span className="rounded-full bg-grape/15 px-2 py-0.5 text-xs font-bold text-grape">
                      Premium
                    </span>
                  )}
                </Link>
                <button
                  type="button"
                  className="btn-secondary !py-2 !px-3 text-sm hidden sm:inline-flex"
                  onClick={() => void logout()}
                >
                  {t.nav.logout}
                </button>
                <button
                  type="button"
                  className="lg:hidden grid h-10 w-10 place-items-center rounded-xl border-2 border-slate-200 font-black"
                  aria-label="Menu"
                  onClick={() => setOpen((v) => !v)}
                >
                  {open ? "✕" : "☰"}
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-secondary !py-2 !px-3 text-sm">
                  {t.nav.login}
                </Link>
                <Link href="/register" className="btn-primary !py-2 !px-3 text-sm hidden sm:inline-flex">
                  {t.nav.register}
                </Link>
              </>
            )}
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-xl border-2 border-slate-200 text-sm"
              onClick={toggle}
              title={theme === "dark" ? t.extra.lightMode : t.extra.darkMode}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <div className="flex rounded-xl border-2 border-slate-200 overflow-hidden text-xs font-black dark:border-slate-700">
              <button
                type="button"
                className={clsx(
                  "px-2 py-1.5",
                  locale === "uk" ? "bg-brand text-white" : "bg-white dark:bg-slate-900",
                )}
                onClick={() => setLocale("uk")}
              >
                UK
              </button>
              <button
                type="button"
                className={clsx(
                  "px-2 py-1.5",
                  locale === "en" ? "bg-brand text-white" : "bg-white dark:bg-slate-900",
                )}
                onClick={() => setLocale("en")}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold",
                  pathname.startsWith(l.href)
                    ? "bg-brand-soft text-brand-dark"
                    : "text-ink-muted",
                )}
              >
                <span>{l.icon}</span>
                {l.label}
              </Link>
            ))}
            {user && (
              <button
                type="button"
                className="w-full rounded-xl px-3 py-3 text-left text-sm font-bold text-red-500"
                onClick={() => {
                  setOpen(false);
                  void logout();
                }}
              >
                {t.nav.logout}
              </button>
            )}
          </div>
        )}
      </header>

      {/* Mobile bottom bar — primary 5 */}
      {user && (
        <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur pb-[env(safe-area-inset-bottom)]">
          <div className="mx-auto grid max-w-lg grid-cols-5">
            {baseLinks.slice(0, 5).map((l) => {
              const active = pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={clsx(
                    "flex flex-col items-center gap-0.5 py-2 text-[10px] font-bold",
                    active ? "text-brand-dark" : "text-ink-muted",
                  )}
                >
                  <span className="text-lg leading-none">{l.icon}</span>
                  {l.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
}
