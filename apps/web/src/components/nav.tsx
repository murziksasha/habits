"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import {
  mobileNavForPersona,
  primaryNavForPersona,
  resolvePersona,
  type NavSlot,
} from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { useTheme } from "@/lib/theme-context";
import { NotificationsBell } from "@/components/notifications-bell";
import { CommandPalette } from "@/components/command-palette";
import { HeartsChrome } from "@/components/hearts-chrome";

type NavLink = { href: string; label: string; icon: string; group?: string };

function labelForSlot(
  id: NavSlot["id"],
  t: ReturnType<typeof useLocale>["t"],
  locale: string,
): string {
  const map: Record<NavSlot["id"], string> = {
    home: t.nav.home,
    learn: t.nav.learn,
    courses: t.nav.courses,
    code: t.nav.programming,
    play: t.nav.play,
    profile: t.nav.profile,
    children: t.nav.parents,
    reports: t.nav.reports,
    family: locale === "en" ? "Family" : "Сімʼя",
    desk: locale === "en" ? "Teacher" : "Учитель",
    homework: t.nav.homework,
    class: t.nav.schools,
    friends: t.nav.friends,
  };
  return map[id] ?? id;
}

export function Nav() {
  const pathname = usePathname();
  const { user, character, logout } = useAuth();
  const { t, locale, setLocale } = useLocale();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [labsOn, setLabsOn] = useState(false);
  const persona = resolvePersona(character?.onboarding);

  // Labs: ?labs=1 enables experimental routes; ?labs=0 disables; persists in localStorage
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const q = new URLSearchParams(window.location.search).get("labs");
      if (q === "1" || q === "true") {
        localStorage.setItem("eduforge_labs", "1");
        setLabsOn(true);
        return;
      }
      if (q === "0" || q === "false") {
        localStorage.removeItem("eduforge_labs");
        setLabsOn(false);
        return;
      }
      setLabsOn(localStorage.getItem("eduforge_labs") === "1");
    } catch {
      setLabsOn(false);
    }
  }, [pathname]);

  // Embed routes: chrome-free for iframe / share embeds
  if (pathname.startsWith("/embed")) return null;

  const moreLabel = locale === "en" ? "More" : "Ще";
  const toolkitLabel = locale === "en" ? "Study toolkit" : "Інструменти";
  const schoolLabel = locale === "en" ? "School & family" : "Школа та сімʼя";
  const socialLabel = locale === "en" ? "Social" : "Соціальне";
  const accountLabel = locale === "en" ? "Account" : "Акаунт";
  const labsLabel = locale === "en" ? "Labs" : "Labs";

  // Persona primary (≤6) — student / parent / teacher
  const primaryLinks: NavLink[] = primaryNavForPersona(persona).map((s) => ({
    href: s.href,
    icon: s.icon,
    label: labelForSlot(s.id, t, locale),
  }));

  // Compact More: toolkit + social + account; school only for parent/teacher personas
  const moreDefs: NavLink[] = [
    { href: "/review", label: t.nav.review, icon: "🔁", group: toolkitLabel },
    { href: "/playground", label: t.nav.playground, icon: "🖥️", group: toolkitLabel },
    { href: "/flashcards", label: t.nav.flashcards, icon: "🃏", group: toolkitLabel },
    { href: "/tutor", label: t.nav.tutor, icon: "🤖", group: toolkitLabel },
    { href: "/programming/tree", label: locale === "en" ? "Skill tree" : "Дерево навичок", icon: "🌳", group: toolkitLabel },
    { href: "/search", label: t.nav.search, icon: "🔍", group: toolkitLabel },
    { href: "/dashboard", label: t.nav.home, icon: "🏠", group: toolkitLabel },
    { href: "/leaderboard", label: t.nav.leaderboard, icon: "🏆", group: socialLabel },
    { href: "/friends", label: t.nav.friends, icon: "👥", group: socialLabel },
    { href: "/certificates", label: t.nav.certificates, icon: "📜", group: socialLabel },
    { href: "/portfolio", label: locale === "en" ? "Portfolio" : "Портфоліо", icon: "📁", group: socialLabel },
    { href: "/pricing", label: t.nav.pricing, icon: "💎", group: accountLabel },
    { href: "/feedback", label: t.nav.feedback, icon: "💬", group: accountLabel },
    { href: "/quests", label: t.nav.quests, icon: "✅", group: accountLabel },
    { href: "/shop", label: t.nav.shop, icon: "🛒", group: accountLabel },
  ];

  if (persona === "parent" || persona === "teacher" || persona === "student") {
    // Student: soft-hide school (still discoverable via search); parent/teacher surface school
    if (persona !== "student") {
      moreDefs.push(
        { href: "/schools", label: t.nav.schools, icon: "🏫", group: schoolLabel },
        { href: "/homework", label: t.nav.homework, icon: "📝", group: schoolLabel },
        { href: "/parents", label: t.nav.parents, icon: "👪", group: schoolLabel },
        { href: "/family", label: locale === "en" ? "Family" : "Сімʼя", icon: "👨‍👩‍👧‍👦", group: schoolLabel },
        { href: "/teacher", label: locale === "en" ? "Teacher" : "Учитель", icon: "👩‍🏫", group: schoolLabel },
      );
    }
  }

  if (user?.role === "admin") {
    moreDefs.push({ href: "/admin", label: t.admin.title, icon: "🛠️", group: accountLabel });
  }

  // Experimental / labs — not in default IA (SPEC/CURRENT); enable with ?labs=1
  if (labsOn) {
    moreDefs.push(
      { href: "/referrals", label: t.nav.referrals, icon: "🎁", group: labsLabel },
      { href: "/export", label: t.nav.export, icon: "📤", group: labsLabel },
      { href: "/focus", label: t.nav.focus, icon: "⏱️", group: labsLabel },
      { href: "/reports", label: t.nav.reports, icon: "📊", group: labsLabel },
      { href: "/embedded-cpp", label: t.nav.embeddedCpp, icon: "🪖", group: labsLabel },
      { href: "/studio/node", label: "Node Studio", icon: "📦", group: labsLabel },
      {
        href: "/classroom/live/demo",
        label: locale === "en" ? "Live classroom" : "Живий клас",
        icon: "📡",
        group: labsLabel,
      },
    );
  }

  const moreLinks = moreDefs;
  const moreActive = moreLinks.some((l) => pathname.startsWith(l.href));

  // Mobile drawer: primary first, then more (still no deep-track spam)
  const mobileLinks = [...primaryLinks, ...moreLinks];
  const mobileBottom = mobileNavForPersona(persona).map((s) => ({
    href: s.href,
    icon: s.icon,
    label: labelForSlot(s.id, t, locale),
  }));

  const moreByGroup = moreLinks.reduce<Record<string, NavLink[]>>((acc, l) => {
    const g = l.group ?? moreLabel;
    (acc[g] ??= []).push(l);
    return acc;
  }, {});

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link
            href={user ? "/learn" : "/"}
            className="flex items-center gap-2 font-black text-xl text-brand-dark"
            onClick={() => setOpen(false)}
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-white shadow-btn">
              E
            </span>
            <span className="hidden xs:inline sm:inline">{t.appName}</span>
          </Link>

          <nav
            className="hidden lg:flex items-center gap-1 relative"
            aria-label={locale === "en" ? "Primary" : "Головна навігація"}
          >
            {primaryLinks.map((l) => {
              const active = pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "rounded-xl px-3 py-2 text-sm font-bold transition min-h-11 inline-flex items-center",
                    active
                      ? "bg-brand-soft text-brand-dark"
                      : "text-ink-muted hover:bg-slate-100 dark:hover:bg-slate-900",
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
            <div className="relative">
              <button
                type="button"
                className={clsx(
                  "rounded-xl px-3 py-2 text-sm font-bold transition",
                  moreActive || moreOpen
                    ? "bg-brand-soft text-brand-dark"
                    : "text-ink-muted hover:bg-slate-100 dark:hover:bg-slate-900",
                )}
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
              >
                {moreLabel} ▾
              </button>
              {moreOpen && (
                <>
                  <button
                    type="button"
                    className="fixed inset-0 z-40 cursor-default"
                    aria-label="Close"
                    onClick={() => setMoreOpen(false)}
                  />
                  <div className="absolute right-0 top-full z-50 mt-1 max-h-[70vh] w-64 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-950">
                    {Object.entries(moreByGroup).map(([group, links]) => (
                      <div key={group} className="mb-2 last:mb-0">
                        <p className="px-3 py-1 text-[10px] font-black uppercase tracking-wide text-ink-muted">
                          {group}
                        </p>
                        {links.map((l) => (
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
                    ))}
                    <div className="mt-1 border-t border-slate-100 pt-1 dark:border-slate-800">
                      <button
                        type="button"
                        className="w-full rounded-xl px-3 py-2 text-left text-[11px] font-bold text-ink-muted hover:bg-slate-100 dark:hover:bg-slate-900"
                        onClick={() => {
                          try {
                            if (labsOn) {
                              localStorage.removeItem("eduforge_labs");
                              setLabsOn(false);
                            } else {
                              localStorage.setItem("eduforge_labs", "1");
                              setLabsOn(true);
                            }
                          } catch {
                            setLabsOn((v) => !v);
                          }
                        }}
                      >
                        {labsOn
                          ? locale === "en"
                            ? "Hide Labs"
                            : "Сховати Labs"
                          : locale === "en"
                            ? "Show Labs (?labs=1)"
                            : "Показати Labs (?labs=1)"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <CommandPalette />
                <HeartsChrome className="max-sm:scale-90" />
                <NotificationsBell />
                <Link
                  href="/profile"
                  className="flex min-h-11 items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white px-2 py-1 sm:px-3 sm:py-1.5 dark:border-slate-800 dark:bg-slate-900"
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
                  className="lg:hidden grid h-10 w-10 place-items-center rounded-xl border-2 border-slate-200 font-black dark:border-slate-700"
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
              className="grid h-9 w-9 place-items-center rounded-xl border-2 border-slate-200 text-sm dark:border-slate-700"
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
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto dark:border-slate-800 dark:bg-slate-950">
            {mobileLinks.map((l) => (
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

      {/* Mobile bottom — persona-aware (student / parent / teacher) */}
      {user && (
        <nav
          className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur pb-[env(safe-area-inset-bottom)] dark:border-slate-800 dark:bg-slate-950/95"
          aria-label="Primary"
        >
          <div
            className="mx-auto grid max-w-lg"
            style={{ gridTemplateColumns: `repeat(${mobileBottom.length}, minmax(0, 1fr))` }}
          >
            {mobileBottom.map((l) => {
              const active = pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "flex min-h-11 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-bold touch-target",
                    active ? "text-brand-dark" : "text-ink-muted",
                  )}
                >
                  <span className="text-lg leading-none" aria-hidden>
                    {l.icon}
                  </span>
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
