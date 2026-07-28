"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { COURSE_META, pickLocale } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { XpBar } from "@/components/xp-bar";
import { OnboardingCard } from "@/components/onboarding";
import { EmptyState, Skeleton } from "@/components/ui";

type ProgressRow = {
  slug: string;
  titleUk: string;
  icon: string;
  color: string;
  xp: number;
  level: number;
  completedLessons: number;
};

type HomePayload = {
  progress: ProgressRow[];
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
    raceMeta: { slug: string; completedThisWeek: boolean; lessonId: string | null }[];
  } | null;
  examBoard: {
    summary: { totalExams: number; passed: number; ready: number; locked: number };
  } | null;
};

export default function DashboardPage() {
  const { user, character, token, loading } = useAuth();
  const { t, locale } = useLocale();
  const router = useRouter();
  const [home, setHome] = useState<HomePayload | null>(null);
  const [homeError, setHomeError] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

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
        <div className="grid gap-3 sm:grid-cols-2">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
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

  const progress = home?.progress ?? [];
  const activity = home?.activity ?? [];
  const next = home?.recommendations ?? [];
  const minisRace = home?.minisRace ?? null;
  const examBoard = home?.examBoard ?? null;
  const courses = Object.values(COURSE_META);

  return (
    <div className="space-y-8">
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
              {(character?.streakFreezes ?? 0) === 0 && (
                <Link href="/shop" className="text-xs font-bold text-grape hover:underline">
                  {t.streak.buyShield}
                </Link>
              )}
            </p>
          </div>
        </div>
        <div className="w-full max-w-sm space-y-3">
          <XpBar
            xp={character?.globalXp ?? 0}
            label={`${t.dashboard.level} ${character?.globalLevel ?? 1}`}
          />
          <p className="text-right text-xs font-bold text-ink-muted">
            {t.dashboard.globalScore}: {character?.globalXp ?? 0} XP
          </p>
          {(() => {
            const goal = character?.dailyGoalXp ?? 50;
            const daily = character?.dailyXp ?? 0;
            const ratio = Math.min(1, daily / Math.max(1, goal));
            const done = daily >= goal;
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
                    className={`h-full rounded-full transition-all ${done ? "bg-grape" : "bg-sky"}`}
                    style={{ width: `${ratio * 100}%` }}
                  />
                </div>
                {done && (
                  <p className="mt-1 text-xs font-bold text-grape">{t.dashboard.dailyGoalDone}</p>
                )}
              </div>
            );
          })()}
        </div>
      </section>

      {next[0] && (
        <section className="card border-brand/40 bg-brand-soft/20 space-y-1">
          <p className="text-xs font-black uppercase text-brand-dark">{t.learn.recommended}</p>
          <Link href={next[0].href} className="text-lg font-black hover:underline">
            {locale === "en" ? next[0].titleEn : next[0].titleUk} →
          </Link>
          <Link href="/learn" className="text-sm font-bold text-brand-dark hover:underline">
            {t.nav.learn} →
          </Link>
        </section>
      )}

      {(() => {
        const prog = progress.find((x) => x.slug === "programming");
        if (!prog && progress.length === 0) return null;
        const completed = prog?.completedLessons ?? 0;
        return (
          <section className="card flex flex-col gap-3 border-sky/30 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold text-sky uppercase">💻 {t.nav.programming}</p>
              <p className="text-lg font-black">
                L{prog?.level ?? 1} · {completed} {t.programming.unitProgress} ·{" "}
                {prog?.xp ?? 0} XP
              </p>
              <p className="text-sm text-ink-muted font-bold">
                {t.programming.hubSubtitle.slice(0, 48)}…
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/programming" className="btn-primary !py-2 text-sm">
                {t.programming.continueCode}
              </Link>
              <Link href="/playground" className="btn-secondary !py-2 text-sm">
                🖥️ {t.nav.playground}
              </Link>
            </div>
          </section>
        );
      })()}

      {minisRace && (
        <section className="card flex flex-col gap-2 border-grape/30 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold text-grape uppercase">
              🏁 {t.programming.minisRace} · {minisRace.weekKey}
            </p>
            <p className="text-sm font-black">
              {minisRace.me?.score ?? 0}/{minisRace.totalRace}{" "}
              {t.programming.miniDone}
              {minisRace.me && minisRace.me.rank > 0
                ? ` · #${minisRace.me.rank}`
                : ""}
              {minisRace.me?.canClaim ? " · 🎁" : ""}
            </p>
            <p className="text-xs font-bold text-ink-muted">
              {t.programming.minisRaceHint}
            </p>
          </div>
          <Link href="/programming" className="btn-secondary !py-2 text-sm">
            {t.programming.minisRace} →
          </Link>
        </section>
      )}

      {examBoard && examBoard.summary.totalExams > 0 && (
        <section className="card flex flex-col gap-2 border-sky/30 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold text-sky uppercase">📝 {t.learn.examsBoard}</p>
            <p className="text-sm font-black">
              {t.learn.examsPassed}: {examBoard.summary.passed} · {t.learn.examsReady}:{" "}
              {examBoard.summary.ready} · {t.learn.examsLocked}: {examBoard.summary.locked}
            </p>
          </div>
          <Link href="/learn" className="btn-secondary !py-2 text-sm">
            {t.nav.learn} →
          </Link>
        </section>
      )}

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { href: "/learn", icon: "🗺️", label: t.nav.learn },
          { href: "/programming", icon: "💻", label: t.nav.programming },
          { href: "/playground", icon: "🖥️", label: t.nav.playground },
          { href: "/courses", icon: "📚", label: t.nav.courses },
          { href: "/flashcards", icon: "🃏", label: t.nav.flashcards },
          { href: "/tutor", icon: "🤖", label: t.nav.tutor },
          { href: "/review", icon: "🔁", label: t.nav.review },
          { href: "/quests", icon: "✅", label: t.nav.quests },
        ].map((x) => (
          <Link key={x.href} href={x.href} className="card flex items-center gap-3 hover:border-brand/40">
            <span className="text-2xl">{x.icon}</span>
            <span className="font-black">{x.label}</span>
          </Link>
        ))}
      </section>

      {next.length > 1 && (
        <section>
          <h2 className="mb-3 text-xl font-black">{t.learning.nextSteps}</h2>
          <div className="space-y-2">
            {next.slice(0, 5).map((r, i) => (
              <Link
                key={`${r.href}-${i}`}
                href={r.href}
                className="card flex items-center justify-between hover:border-brand/40"
              >
                <span className="font-bold">
                  {locale === "en" ? r.titleEn : r.titleUk}
                </span>
                <span className="text-brand-dark font-black">→</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-4 text-xl font-black">{t.dashboard.continueLearning}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => {
            const p = progress.find((x) => x.slug === c.slug);
            const title = pickLocale(locale, c.titleUk, c.titleEn);
            const desc = pickLocale(locale, c.descriptionUk, c.descriptionEn);
            return (
              <Link
                key={c.slug}
                href={`/courses/${c.slug}`}
                className="card hover:border-brand/40 transition"
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{c.icon}</span>
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-bold text-white"
                    style={{ backgroundColor: c.color }}
                  >
                    {t.dashboard.level} {p?.level ?? 1}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-black">{title}</h3>
                <p className="mt-1 text-sm text-ink-muted line-clamp-2">{desc}</p>
                <div className="mt-4">
                  <XpBar
                    xp={p?.xp ?? 0}
                    color={c.color}
                    label={`${p?.completedLessons ?? 0}`}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/play" className="card bg-gradient-to-br from-slate-900 to-slate-700 text-white">
          <h3 className="text-xl font-black">♟️ {t.chess.playOnline}</h3>
          <p className="mt-2 text-white/80">Matchmaking · Elo · 3/5/10</p>
        </Link>
        <Link href="/achievements" className="card">
          <h3 className="text-xl font-black">🏅 {t.engagement.achievements}</h3>
          <p className="mt-2 text-ink-muted">Badges · XP</p>
        </Link>
        <Link href="/leaderboard" className="card">
          <h3 className="text-xl font-black">🏆 {t.nav.leaderboard}</h3>
          <p className="mt-2 text-ink-muted">Global · Chess Elo</p>
        </Link>
      </section>

      <section className="card space-y-3">
        <h2 className="text-xl font-black">{t.engagement.activity}</h2>
        {!activity.length && (
          <p className="text-sm text-ink-muted">{t.engagement.emptyActivity}</p>
        )}
        <ul className="space-y-2">
          {activity.slice(0, 12).map((e) => (
            <li
              key={e.id}
              className="flex justify-between gap-3 rounded-xl border border-slate-100 px-3 py-2 text-sm dark:border-slate-800"
            >
              <span className="font-bold">{e.kind}</span>
              <span className="text-xs text-ink-muted">
                {new Date(e.createdAt).toLocaleString(locale === "en" ? "en-US" : "uk-UA")}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
