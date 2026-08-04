"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { resolvePersona } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { XpBar } from "@/components/xp-bar";
import { OnboardingCard } from "@/components/onboarding";
import { PrimaryMission } from "@/components/primary-mission";
import { EmptyState, Skeleton } from "@/components/ui";
import { OnboardingWizard } from "@/components/onboarding-wizard";
import { StreakCalendar } from "@/components/streak-calendar";

type HomePayload = {
  progress: {
    slug: string;
    titleUk: string;
    icon: string;
    color: string;
    xp: number;
    level: number;
    completedLessons: number;
  }[];
  activity: {
    id: string;
    kind: string;
    payload: Record<string, unknown>;
    createdAt: string;
  }[];
  recommendations: {
    kind: string;
    titleUk: string;
    titleEn: string;
    href: string;
  }[];
  minisRace: {
    weekKey: string;
    totalRace: number;
    me: { rank: number; score: number; canClaim: boolean } | null;
  } | null;
  examBoard: {
    summary: { totalExams: number; passed: number; ready: number; locked: number };
  } | null;
};

/**
 * Thin home shell: one primary mission + streak/hearts + 2–3 chips.
 * Learn owns the full map; no DailyQuests / Continue duplication.
 */
export default function DashboardPage() {
  const { user, character, token, loading } = useAuth();
  const { t, locale } = useLocale();
  const router = useRouter();
  const [home, setHome] = useState<HomePayload | null>(null);
  const [homeError, setHomeError] = useState(false);

  const persona = resolvePersona(character?.onboarding);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  // Role-based first destination for parent/teacher
  useEffect(() => {
    if (!character?.onboarding?.wizardCompleted) return;
    if (persona === "parent" && typeof window !== "undefined") {
      const once = sessionStorage.getItem("ef_home_redirect");
      if (!once) {
        sessionStorage.setItem("ef_home_redirect", "1");
        // soft: stay on dashboard if they navigated intentionally; only deep link from logo uses /learn
      }
    }
  }, [character, persona]);

  useEffect(() => {
    if (!token) return;
    void api<HomePayload>("/me/home", { token })
      .then((d) => {
        setHome(d);
        setHomeError(false);
      })
      .catch(() => {
        setHome(null);
        setHomeError(true);
      });
  }, [token]);

  if (loading || !user) {
    return (
      <div className="space-y-4" aria-busy="true" aria-live="polite">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-20 w-full" />
        <p className="sr-only">{t.common.loading}</p>
      </div>
    );
  }

  if (token && !home && !homeError) {
    return (
      <div className="space-y-4" aria-busy="true">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-40 w-full" />
        <p className="sr-only">{t.common.loading}</p>
      </div>
    );
  }

  const activity = home?.activity ?? [];
  const activeDates = activity
    .map((a) => a.createdAt?.slice(0, 10))
    .filter(Boolean) as string[];
  // Include today if streak > 0
  if ((character?.streakDays ?? 0) > 0) {
    activeDates.push(new Date().toISOString().slice(0, 10));
  }

  const chips =
    persona === "parent"
      ? [
          { href: "/parents", icon: "👪", label: t.nav.parents },
          { href: "/family", icon: "👨‍👩‍👧‍👦", label: locale === "en" ? "Family" : "Сімʼя" },
          { href: "/learn", icon: "🗺️", label: t.nav.learn },
        ]
      : persona === "teacher"
        ? [
            { href: "/teacher", icon: "👩‍🏫", label: locale === "en" ? "Desk" : "Учитель" },
            { href: "/homework", icon: "📝", label: t.nav.homework },
            { href: "/learn", icon: "🗺️", label: t.nav.learn },
          ]
        : [
            { href: "/learn", icon: "🗺️", label: t.nav.learn },
            { href: "/programming", icon: "💻", label: t.nav.programming },
            { href: "/play", icon: "♟️", label: t.nav.play },
          ];

  return (
    <div className="space-y-6">
      <OnboardingWizard />
      <OnboardingCard />

      {homeError && (
        <EmptyState
          title={locale === "en" ? "Could not load home" : "Не вдалося завантажити"}
          description={
            locale === "en"
              ? "Check your connection and try again."
              : "Перевірте зʼєднання і спробуйте ще раз."
          }
          actionHref="/learn"
          actionLabel={t.nav.learn}
        />
      )}

      <section className="card flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-3xl bg-brand-soft text-3xl">
            🧙‍♂️
          </div>
          <div>
            <p className="text-sm font-bold text-ink-muted">{t.dashboard.welcome}</p>
            <h1 className="text-2xl font-black">{character?.displayName}</h1>
            <p className="text-sm text-ink-muted flex flex-wrap items-center gap-2">
              <span>
                🔥 {t.dashboard.streak}: {character?.streakDays ?? 0}
              </span>
              <span className="rounded-full bg-sky/15 px-2 py-0.5 text-xs font-black text-sky">
                🛡️ {t.streak.shields}: {character?.streakFreezes ?? 0}
              </span>
            </p>
          </div>
        </div>
        <div className="w-full max-w-sm space-y-3">
          <XpBar
            xp={character?.globalXp ?? 0}
            label={`${t.dashboard.level} ${character?.globalLevel ?? 1}`}
          />
          {(() => {
            const goal = character?.dailyGoalXp ?? 50;
            const daily = character?.dailyXp ?? 0;
            const ratio = Math.min(1, daily / Math.max(1, goal));
            return (
              <div>
                <div className="mb-1 flex justify-between text-xs font-bold text-ink-muted">
                  <span>🎯 {t.dashboard.dailyGoal}</span>
                  <span>
                    {daily}/{goal} XP
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-sky transition-all"
                    style={{ width: `${ratio * 100}%` }}
                  />
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Single primary CTA */}
      <PrimaryMission showSecondary />

      <StreakCalendar
        activeDates={activeDates}
        streakDays={character?.streakDays ?? 0}
      />

      <div className="grid gap-3 sm:grid-cols-3">
        {chips.map((x) => (
          <Link
            key={x.href}
            href={x.href}
            className="card flex min-h-11 items-center gap-3 hover:border-brand/40"
          >
            <span className="text-2xl" aria-hidden>
              {x.icon}
            </span>
            <span className="font-black">{x.label}</span>
          </Link>
        ))}
      </div>

      {home?.examBoard && home.examBoard.summary.ready > 0 && (
        <Link
          href="/learn#exams"
          className="card flex items-center justify-between border-grape/30 hover:border-grape/50"
        >
          <span className="font-black">
            📝 {t.learn.examsReady}: {home.examBoard.summary.ready}
          </span>
          <span className="text-grape font-black">→</span>
        </Link>
      )}

      {home?.minisRace && (
        <Link
          href="/programming"
          className="card flex items-center justify-between border-grape/20 text-sm font-bold hover:border-grape/40"
        >
          <span>
            🏁 {t.programming.minisRace}: {home.minisRace.me?.score ?? 0}/
            {home.minisRace.totalRace}
          </span>
          <span>→</span>
        </Link>
      )}

      <p className="text-center text-sm font-bold text-ink-muted">
        <Link href="/learn" className="text-sky hover:underline">
          {t.nav.learn} →
        </Link>
      </p>
    </div>
  );
}
