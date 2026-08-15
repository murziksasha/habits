"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  firstAvailableLessonHref,
  freemiumPathLabel,
  isProgrammingMiniSlug,
  PROGRAMMING_MINI_LESSON_SLUGS,
  PROGRAMMING_STACK_META,
  PROGRAMMING_UNIT_ORDER,
  pickLocale,
} from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { XpBar } from "@/components/xp-bar";
import { PageLoading } from "@/components/page-loading";
import { useRequireAuth } from "@/lib/use-require-auth";
import clsx from "clsx";

type Lesson = {
  id: string;
  slug?: string;
  titleUk: string;
  titleEn?: string;
  locked: boolean;
  status: string;
  bestScore: number;
};

type Unit = {
  id: string;
  slug: string;
  titleUk: string;
  titleEn?: string;
  lessons: Lesson[];
};



export function ProgrammingClient() {
  const { user, token, loading, setCharacter } = useAuth();
  const { ready } = useRequireAuth();
  const { t, locale } = useLocale();
  const [units, setUnits] = useState<Unit[]>([]);
  const [progress, setProgress] = useState({
    xp: 0,
    level: 1,
    completedLessons: 0,
    hearts: 5,
    maxHearts: 5,
  });
  const [freemium, setFreemium] = useState<{
    freeLessonCount: number;
    freeCompleted: number;
    freeLeft: number;
    isPremium: boolean;
  } | null>(null);
  const [hubLoading, setHubLoading] = useState(true);
  const [error, setError] = useState("");
  const [placement, setPlacement] = useState<{
    levelLabel: string;
    recommendedUnitSlug: string | null;
    score: number;
  } | null>(null);
  const [miniBoard, setMiniBoard] = useState<{
    minis: {
      slug: string;
      lessonId: string | null;
      titleUk: string;
      titleEn: string;
      unitSlug: string | null;
      completed: boolean;
      missing: boolean;
    }[];
    total: number;
    completed: number;
    allDone: boolean;
  } | null>(null);
  const [miniLb, setMiniLb] = useState<{
    entries: {
      rank: number;
      userId: string;
      displayName: string;
      globalLevel: number;
      minisCompleted: number;
      allDone: boolean;
    }[];
    totalMinis: number;
    me: {
      rank: number;
      minisCompleted: number;
      allDone: boolean;
    } | null;
  } | null>(null);
  const [miniRace, setMiniRace] = useState<{
    weekKey: string;
    totalRace: number;
    raceMeta: {
      slug: string;
      lessonId: string | null;
      titleUk: string;
      titleEn: string;
      completedThisWeek: boolean;
    }[];
    entries: {
      rank: number;
      userId: string;
      displayName: string;
      score: number;
      bonusXp: number;
    }[];
    me: {
      rank: number;
      score: number;
      bonusXp: number;
      canClaim: boolean;
      claimed: boolean;
    } | null;
  } | null>(null);
  const [raceMsg, setRaceMsg] = useState("");

  useEffect(() => {
    if (!token) return;
    setHubLoading(true);
    void api("/auth/onboarding/complete", {
      method: "POST",
      token,
      body: { key: "triedProgramming" },
    }).catch(() => undefined);
    void api<{
      course: { titleUk: string; titleEn?: string; color: string };
      units: Unit[];
      progress: typeof progress;
      freemium?: typeof freemium;
    }>("/courses/programming", { token })
      .then((d) => {
        const order = new Map(PROGRAMMING_UNIT_ORDER.map((s, i) => [s, i]));
        const sorted = [...d.units].sort(
          (a, b) => (order.get(a.slug as never) ?? 99) - (order.get(b.slug as never) ?? 99),
        );
        setUnits(sorted);
        setProgress(d.progress);
        setFreemium(d.freemium ?? null);
      })
      .catch(() => setError(t.common.error))
      .finally(() => setHubLoading(false));
    void api<{
      lastResult: {
        levelLabel: string;
        recommendedUnitSlug: string | null;
        score: number;
      } | null;
    }>("/learning/placement/programming", { token })
      .then((d) => setPlacement(d.lastResult))
      .catch(() => setPlacement(null));
    void api<NonNullable<typeof miniBoard>>("/learning/programming/minis", { token })
      .then(setMiniBoard)
      .catch(() => setMiniBoard(null));
    void api<NonNullable<typeof miniLb>>(
      "/learning/programming/minis/leaderboard?limit=10",
      { token },
    )
      .then(setMiniLb)
      .catch(() => setMiniLb(null));
    void api<NonNullable<typeof miniRace>>("/learning/programming/minis/race", {
      token,
    })
      .then(setMiniRace)
      .catch(() => setMiniRace(null));
  }, [token, t.common.error]);

  async function claimMinisRaceBonus() {
    if (!token) return;
    setRaceMsg("");
    try {
      const r = await api<{
        ok: boolean;
        xpGain?: number;
        error?: string;
        character?: Parameters<typeof setCharacter>[0];
      }>("/learning/programming/minis/race/claim-bonus", {
        method: "POST",
        token,
      });
      if (r.character) setCharacter(r.character);
      setRaceMsg(
        r.ok
          ? `${t.programming.raceClaimed} +${r.xpGain ?? 0} XP`
          : r.error ?? t.common.error,
      );
      const next = await api<NonNullable<typeof miniRace>>(
        "/learning/programming/minis/race",
        { token },
      );
      setMiniRace(next);
    } catch {
      setRaceMsg(t.common.error);
    }
  }

  if (loading || !ready || (hubLoading && !units.length && !error)) {
    return <PageLoading label={t.common.loading} />;
  }
  if (error) {
    return (
      <div className="card mx-auto max-w-lg space-y-3 text-center">
        <p className="font-bold text-red-500">{error}</p>
        <button type="button" className="btn-primary" onClick={() => window.location.reload()}>
          {locale === "en" ? "Retry" : "Спробувати знову"}
        </button>
      </div>
    );
  }

  const allLessons = units.flatMap((u) =>
    u.lessons.map((l) => ({ ...l, unitSlug: u.slug })),
  );
  const continueHref = firstAvailableLessonHref("programming", units) ?? "/learn";
  const freeLabel =
    freemium &&
    freemiumPathLabel({
      freeCompleted: freemium.freeCompleted,
      freeLessonCount: freemium.freeLessonCount,
      isPremium: freemium.isPremium,
      locale: locale === "en" ? "en" : "uk",
    });
  const miniTotal = miniBoard?.total ?? PROGRAMMING_MINI_LESSON_SLUGS.length;
  const miniDone = miniBoard?.completed ?? 0;
  const unitsDone = units.filter(
    (u) => u.lessons.length > 0 && u.lessons.every((l) => l.status === "completed"),
  ).length;
  const totalLessons = allLessons.length || 1;
  const pathPct = Math.round((progress.completedLessons / totalLessons) * 100);

  const nextLesson =
    allLessons.find((l) => !l.locked && l.status !== "completed") ??
    allLessons.find((l) => !l.locked) ??
    null;

  return (
    <div className="space-y-8 pb-24 md:pb-8">
      <section className="card flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-brand/30 bg-gradient-to-br from-brand-soft/30 to-sky/5">
        <div>
          <p className="text-4xl">💻</p>
          <h1 className="mt-2 text-3xl font-black">{t.programming.hubTitle}</h1>
          <p className="text-ink-muted font-bold">{t.programming.hubSubtitle}</p>
          <p className="mt-2 text-sm font-bold text-sky">
            {t.programming.pathPct}: {pathPct}% · {unitsDone}/{units.length} units · 🧩{" "}
            {miniDone}/{miniTotal} {t.programming.miniDone}
          </p>
          <div className="mt-2 h-2 max-w-md overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-sky transition-all"
              style={{ width: `${Math.min(100, pathPct)}%` }}
            />
          </div>
          {freeLabel && (
            <p className="mt-1 text-xs font-black text-grape">
              {t.onboarding.freePath}: {freeLabel}
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href={continueHref} className="btn-primary min-h-11">
              {t.onboarding.continuePath}
              {nextLesson
                ? `: ${pickLocale(locale, nextLesson.titleUk, nextLesson.titleEn)}`
                : ""}{" "}
              →
            </Link>
            <Link href="/playground" className="btn-secondary min-h-11">
              🖥️ {t.nav.playground}
            </Link>
          </div>
        </div>
        <div className="w-full max-w-xs space-y-2">
          <XpBar
            xp={progress.xp}
            color="#0EA5E9"
            label={`${t.dashboard.level} ${progress.level}`}
          />
          <p className="text-sm font-bold text-ink-muted">
            {t.programming.unitProgress}: {progress.completedLessons}/{totalLessons}
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href="/courses/programming" className="btn-secondary !py-2 text-sm inline-flex">
              {t.programming.openPath}
            </Link>
            <Link
              href="/placement/programming"
              className="btn-primary !py-2 text-sm inline-flex"
            >
              {t.programming.takePlacement}
            </Link>
            <Link href="/typescript" className="btn-secondary !py-2 text-sm inline-flex">
              📘 {t.courses.typescript}
            </Link>
            <Link href="/html-semantics" className="btn-secondary !py-2 text-sm inline-flex">
              🌐 {t.courses.html_semantics}
            </Link>
            <Link href="/css-layout" className="btn-secondary !py-2 text-sm inline-flex">
              🎨 {t.courses.css_layout}
            </Link>
            <Link href="/qa-theory" className="btn-secondary !py-2 text-sm inline-flex">
              🧪 {t.courses.qa_theory}
            </Link>
            <Link href="/js-fundamentals" className="btn-secondary !py-2 text-sm inline-flex">
              ⚡ {t.courses.js_fundamentals}
            </Link>
            <Link href="/react-fundamentals" className="btn-secondary !py-2 text-sm inline-flex">
              ⚛️ {t.courses.react_fundamentals}
            </Link>
            <Link href="/sql-fundamentals" className="btn-secondary !py-2 text-sm inline-flex">
              🗄️ {t.courses.sql_fundamentals}
            </Link>
            <Link href="/node-fundamentals" className="btn-secondary !py-2 text-sm inline-flex">
              🟢 {t.courses.node_fundamentals}
            </Link>
            <Link href="/express-fundamentals" className="btn-secondary !py-2 text-sm inline-flex">
              🚂 {t.courses.express_fundamentals}
            </Link>
            <Link href="/embedded-cpp" className="btn-secondary !py-2 text-sm inline-flex">
              🪖 {t.courses.embedded_cpp}
            </Link>
            <Link href="/playground" className="btn-secondary !py-2 text-sm inline-flex">
              🖥️ {t.nav.playground}
            </Link>
            <Link
              href="/playground"
              className="btn-secondary !py-2 text-sm inline-flex"
              title="React Studio"
            >
              ⚛️ React Studio
            </Link>
            <a href="/studio/node" className="btn-secondary !py-2 text-sm inline-flex">
              📦 Node Studio
            </a>
            <Link href="/tutor" className="btn-secondary !py-2 text-sm inline-flex">
              🤖 {t.nav.tutor}
            </Link>
            <Link href="/review" className="btn-secondary !py-2 text-sm inline-flex">
              🔁 {t.nav.review}
            </Link>
          </div>
          {placement && (
            <p className="text-xs font-bold text-grape">
              Placement: {placement.levelLabel} (
              {Math.round(placement.score * 100)}%)
              {placement.recommendedUnitSlug
                ? ` → ${placement.recommendedUnitSlug}`
                : ""}
            </p>
          )}
        </div>
      </section>

      {(miniBoard || miniTotal > 0) && (
        <section className="card space-y-3 border-sky/30">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-black">
              🧩 {t.programming.miniProjects}{" "}
              <span className="text-sm font-bold text-ink-muted">
                {miniDone}/{miniTotal}
              </span>
            </h2>
            {miniBoard?.allDone ? (
              <Link
                href="/certificates"
                className="rounded-full bg-brand/15 px-3 py-1 text-xs font-black text-brand-dark"
              >
                📜 {t.programming.minisCert}
              </Link>
            ) : null}
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-sky transition-all"
              style={{
                width: `${miniTotal ? Math.round((miniDone / miniTotal) * 100) : 0}%`,
              }}
            />
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {(miniBoard?.minis ?? []).map((m) => {
              const stackMeta =
                m.unitSlug && m.unitSlug in PROGRAMMING_STACK_META
                  ? PROGRAMMING_STACK_META[
                      m.unitSlug as keyof typeof PROGRAMMING_STACK_META
                    ]
                  : null;
              const icon = stackMeta?.icon ?? "🧩";
              const label = pickLocale(locale, m.titleUk, m.titleEn);
              if (m.missing || !m.lessonId) {
                return (
                  <span
                    key={m.slug}
                    className="rounded-xl border-2 border-dashed border-slate-200 px-2 py-2 text-xs font-bold text-ink-muted opacity-60"
                  >
                    {icon} {m.slug}
                  </span>
                );
              }
              return (
                <Link
                  key={m.slug}
                  href={`/courses/programming/lessons/${m.lessonId}`}
                  className={clsx(
                    "rounded-xl border-2 px-2 py-2 text-xs font-bold hover:border-sky",
                    m.completed
                      ? "border-brand/40 bg-brand-soft/50"
                      : "border-slate-200 dark:border-slate-700",
                  )}
                >
                  <span className="mr-1">{icon}</span>
                  {m.completed ? "✓ " : "▶ "}
                  {label.replace(/^Mini-project:\s*/i, "").slice(0, 22)}
                </Link>
              );
            })}
          </div>
          {miniBoard?.allDone ? (
            <p className="text-sm font-black text-brand-dark">
              🏆 {t.programming.minisAllDone}
            </p>
          ) : null}

          {miniRace && (
            <div className="mt-3 space-y-2 border-t border-slate-100 pt-3 dark:border-slate-800">
              <h3 className="text-sm font-black">
                🏁 {t.programming.minisRace}{" "}
                <span className="text-ink-muted font-bold">({miniRace.weekKey})</span>
              </h3>
              <p className="text-[10px] font-bold text-ink-muted">
                {t.programming.minisRaceHint}
              </p>
              <div className="flex flex-wrap gap-2">
                {miniRace.raceMeta.map((m) =>
                  m.lessonId ? (
                    <Link
                      key={m.slug}
                      href={`/courses/programming/lessons/${m.lessonId}`}
                      className={clsx(
                        "rounded-lg border px-2 py-1 text-[11px] font-bold",
                        m.completedThisWeek
                          ? "border-brand/40 bg-brand-soft/40"
                          : "border-slate-200 dark:border-slate-700",
                      )}
                    >
                      {m.completedThisWeek ? "✓ " : "▶ "}
                      {pickLocale(locale, m.titleUk, m.titleEn).replace(
                        /^Mini-project:\s*/i,
                        "",
                      ).slice(0, 18)}
                    </Link>
                  ) : (
                    <span key={m.slug} className="text-[11px] font-bold opacity-50">
                      {m.slug}
                    </span>
                  ),
                )}
              </div>
              {miniRace.entries.slice(0, 5).map((e) => (
                <div
                  key={e.userId}
                  className="flex justify-between text-xs font-bold"
                >
                  <span>
                    #{e.rank} {e.displayName}
                    {e.userId === user?.id ? ` (${t.programming.minisYou})` : ""}
                  </span>
                  <span className="text-ink-muted">
                    {e.score}/{miniRace.totalRace}
                    {e.bonusXp ? ` · +${e.bonusXp}` : ""}
                  </span>
                </div>
              ))}
              {miniRace.me && (
                <p className="text-xs font-bold text-ink-muted">
                  {t.programming.minisYou}: {miniRace.me.score}/{miniRace.totalRace}
                  {miniRace.me.rank > 0 ? ` · #${miniRace.me.rank}` : ""}
                </p>
              )}
              {miniRace.me?.canClaim && (
                <button
                  type="button"
                  className="btn-primary !py-1.5 !px-3 text-xs"
                  onClick={() => void claimMinisRaceBonus()}
                >
                  {t.programming.claimRaceBonus}
                </button>
              )}
              {raceMsg && (
                <p className="text-xs font-bold text-grape">{raceMsg}</p>
              )}
            </div>
          )}

          {miniLb && miniLb.entries.length > 0 && (
            <div className="mt-3 space-y-1 border-t border-slate-100 pt-3 dark:border-slate-800">
              <h3 className="text-sm font-black">🏅 {t.programming.minisLeaderboard}</h3>
              {miniLb.entries.slice(0, 8).map((e) => (
                <Link
                  key={e.userId}
                  href={`/u/${e.userId}`}
                  className={clsx(
                    "flex justify-between text-xs font-bold rounded-lg px-2 py-1 hover:bg-slate-50 dark:hover:bg-slate-900",
                    e.userId === user?.id && "bg-sky/10",
                  )}
                >
                  <span>
                    #{e.rank} {e.displayName}
                    {e.userId === user?.id ? ` (${t.programming.minisYou})` : ""}
                    {e.allDone ? " 🏆" : ""}
                  </span>
                  <span className="text-ink-muted">
                    {e.minisCompleted}/{miniLb.totalMinis}
                  </span>
                </Link>
              ))}
              {miniLb.me && miniLb.me.rank === 0 && (
                <p className="text-xs font-bold text-ink-muted px-2">
                  {t.programming.minisYou}: {miniLb.me.minisCompleted}/
                  {miniLb.totalMinis}
                </p>
              )}
            </div>
          )}
        </section>
      )}

      <div className="relative space-y-4">
        {units.map((u, idx) => {
          const done = u.lessons.filter((l) => l.status === "completed").length;
          const total = u.lessons.length || 1;
          const unitComplete = done === total && total > 0;
          const recommended = placement?.recommendedUnitSlug === u.slug;
          const firstOpen = u.lessons.find((l) => !l.locked);
          const mini = u.lessons.find(
            (l) =>
              (l.slug && isProgrammingMiniSlug(l.slug)) ||
              /mini|Mini-project/i.test(l.titleUk + (l.titleEn ?? "")),
          );
          return (
            <div
              key={u.id}
              className={clsx(
                "card relative",
                recommended && "border-sky ring-2 ring-sky/30",
                unitComplete && "border-brand/40",
              )}
            >
              {idx < units.length - 1 && (
                <div className="absolute left-8 top-full h-4 w-0.5 bg-slate-200 dark:bg-slate-700 z-0" />
              )}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <Link
                    href={`/programming/${u.slug}`}
                    className="grid h-12 w-12 place-items-center rounded-2xl bg-sky/15 text-2xl hover:ring-2 ring-sky"
                  >
                    {PROGRAMMING_STACK_META[
                      u.slug as keyof typeof PROGRAMMING_STACK_META
                    ]?.icon ?? "📦"}
                  </Link>
                  <div>
                    <p className="text-xs font-bold text-ink-muted uppercase">
                      {idx + 1}/{units.length}
                      {unitComplete ? ` · ✓ ${t.programming.unitDone}` : ""}
                      {recommended ? " · ★" : ""}
                    </p>
                    <Link
                      href={`/programming/${u.slug}`}
                      className="text-xl font-black hover:text-sky"
                    >
                      {pickLocale(locale, u.titleUk, u.titleEn)}
                    </Link>
                    <p className="text-sm font-bold text-ink-muted">
                      {done}/{total} · {Math.round((done / total) * 100)}%
                    </p>
                    <div className="mt-2 h-2 max-w-xs overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-sky"
                        style={{ width: `${(done / total) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mini && !mini.locked && (
                    <Link
                      href={`/courses/programming/lessons/${mini.id}`}
                      className={clsx(
                        "rounded-xl border-2 px-2 py-1 text-xs font-black hover:border-grape",
                        mini.status === "completed"
                          ? "border-brand/50 bg-brand-soft/50"
                          : "border-grape/40 bg-grape/10",
                      )}
                    >
                      🧩 Mini
                    </Link>
                  )}
                  {u.lessons.slice(0, 4).map((l) =>
                    l.locked ? (
                      <span
                        key={l.id}
                        className="rounded-xl border-2 border-slate-100 px-2 py-1 text-xs font-bold opacity-60"
                      >
                        🔒
                      </span>
                    ) : (
                      <Link
                        key={l.id}
                        href={`/courses/programming/lessons/${l.id}`}
                        className={clsx(
                          "rounded-xl border-2 px-2 py-1 text-xs font-bold hover:border-sky",
                          l.status === "completed"
                            ? "border-brand/40 bg-brand-soft/40"
                            : "border-slate-200",
                        )}
                      >
                        {l.status === "completed" ? "★" : "▶"}{" "}
                        {pickLocale(locale, l.titleUk, l.titleEn).slice(0, 18)}
                      </Link>
                    ),
                  )}
                  {firstOpen && (
                    <Link
                      href={`/courses/programming/lessons/${firstOpen.id}`}
                      className="btn-primary !py-1.5 !px-3 text-sm"
                    >
                      →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {!units.length && <p className="text-ink-muted font-bold">{t.common.loading}</p>}
      </div>

      {nextLesson ? (
        <div className="fixed inset-x-0 bottom-16 z-30 border-t border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur md:bottom-0 dark:border-slate-800 dark:bg-slate-950/95">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
            <p className="truncate text-sm font-bold">
              {locale === "en" ? "Continue path" : "Продовжити path"}:{" "}
              {pickLocale(locale, nextLesson.titleUk, nextLesson.titleEn)}
            </p>
            <Link
              href={`/courses/programming/lessons/${nextLesson.id}`}
              className="btn-primary shrink-0 !py-2 text-sm"
            >
              {locale === "en" ? "Go" : "Далі"} →
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
