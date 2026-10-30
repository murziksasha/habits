"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  COURSE_GROUP_META,
  COURSE_HUB_HREF,
  COURSE_META,
  pickLocale,
  type CourseGroup,
  type CourseSlug,
} from "@eduforge/shared";
import { useLocale } from "@/lib/locale-context";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { Card, Skeleton } from "@/components/ui";
import { PrimaryMission } from "@/components/primary-mission";
import { ContextualToolkit } from "@/components/contextual-toolkit";
import { DailyQuestsCard } from "@/components/daily-quests-card";
import { WeeklyQuestsCard } from "@/components/weekly-quests-card";
import { OnboardingWizard } from "@/components/onboarding-wizard";
import { GuestBanner } from "@/components/guest-banner";

type NextRec = {
  kind: string;
  titleUk: string;
  titleEn: string;
  href: string;
};

type ExamSummary = {
  summary: { totalExams: number; passed: number; ready: number; locked: number };
  courses: {
    courseSlug: string;
    titleUk: string;
    titleEn: string;
    icon: string;
    exams: {
      lessonId: string;
      titleUk: string;
      titleEn: string;
      status: string;
      href: string;
      bestScore: number;
    }[];
  }[];
};

const GROUP_ORDER: CourseGroup[] = ["code", "deep", "skill", "chess"];

/** Learning map: tight one-session fold + collapsed quests + catalog. */
export function LearnClient() {
  const { t, locale } = useLocale();
  const { user, token, character, loading: authLoading } = useAuth();
  const skillPoints = character?.progression?.skillPoints ?? 0;
  const [data, setData] = useState<{
    next: { recommendations: NextRec[] } | null;
    exams: ExamSummary | null;
  }>({
    next: null,
    exams: null,
  });
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    if (!token || !user) {
      setData({ next: null, exams: null });
      return;
    }
    setDataLoading(true);
    Promise.all([
      api<{ recommendations: NextRec[] }>("/learning/next", { token }).catch(() => null),
      api<ExamSummary>("/learning/exams/me", { token }).catch(() => null),
    ])
      .then(([next, exams]) => {
        setData({
          next: next ? { recommendations: next.recommendations } : null,
          exams,
        });
      })
      .finally(() => setDataLoading(false));

    void api("/auth/onboarding/complete", {
      method: "POST",
      token,
      body: { key: "viewedLearnMap" },
    }).catch(() => undefined);
  }, [token, user]);

  if (authLoading || (user && dataLoading && !data.next && !data.exams)) {
    return (
      <div className="space-y-4" aria-busy="true">
        <Skeleton className="h-10 w-48" />
        <Card className="space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-11 w-40" />
        </Card>
        <p className="sr-only">{t.common.loading}</p>
      </div>
    );
  }

  const exams = data.exams ?? null;
  const readyExams =
    exams?.courses.flatMap((c) =>
      c.exams
        .filter((e) => e.status === "ready")
        .map((e) => ({ ...e, icon: c.icon, course: c.titleUk })),
    ) ?? [];

  const showExams =
    exams &&
    (exams.summary.ready > 0 || exams.summary.passed > 0 || exams.summary.locked > 0);

  return (
    <div className="space-y-6">
      {!user ? <GuestBanner /> : <OnboardingWizard />}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black">🗺️ {t.learn.title}</h1>
          <p className="text-sm font-bold text-ink-muted">{t.learn.mapTitle}</p>
        </div>
        {user && skillPoints > 0 ? (
          <Link
            href="/profile#build"
            className="btn-secondary shrink-0 !py-2 text-sm ring-1 ring-grape/40"
          >
            ⭐ {locale === "en" ? "Build" : "Прокачка"} ({skillPoints})
          </Link>
        ) : null}
      </div>

      {user && (
        <div className="space-y-3">
          {/* One session above the fold: mission with reason */}
          <PrimaryMission showSecondary={false} />

          {/* Quests start closed; open on tap */}
          <DailyQuestsCard defaultOpen={false} />
          <WeeklyQuestsCard defaultOpen={false} />
        </div>
      )}

      {/* Catalog groups stay: code, deep, skill, chess */}
      <div className="space-y-6 pt-2">
        {GROUP_ORDER.map((g) => {
          const meta = COURSE_GROUP_META[g];
          const slugs = (Object.keys(COURSE_META) as CourseSlug[]).filter(
            (s) => COURSE_META[s].group === g,
          );
          return (
            <section key={g} className="space-y-3">
              <h2 className="text-lg font-black">
                {locale === "en" ? meta.titleEn : meta.titleUk}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {slugs.map((slug) => {
                  const c = COURSE_META[slug];
                  const href = COURSE_HUB_HREF[slug] ?? `/courses/${slug}`;
                  return (
                    <Link
                      key={slug}
                      href={href}
                      className="card flex min-h-11 items-center gap-3 hover:border-brand/40 border-l-4"
                      style={{ borderLeftColor: c.color }}
                    >
                      <span className="text-2xl" aria-hidden>
                        {c.icon}
                      </span>
                      <span className="font-black">
                        {pickLocale(locale, c.titleUk, c.titleEn)}
                      </span>
                    </Link>
                  );
                })}

                {/* Extra line for Chess group: Practice vs Club bot */}
                {g === "chess" && (
                  <Link
                    href="/play?level=club"
                    className="card flex min-h-11 items-center justify-between border-l-4 border-l-sky bg-sky/5 hover:border-sky/40 font-bold transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" aria-hidden>🤖</span>
                      <span className="font-black text-brand-dark">
                        {t.chess.practiceClubBot}
                      </span>
                    </div>
                    <span className="text-sky font-black">→</span>
                  </Link>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {user && (
        <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <ContextualToolkit />

          {showExams && exams && (
            <section id="exams" className="card space-y-3 border-grape/30 scroll-mt-24">
              <h2 className="text-xl font-black">📝 {t.learn.examsBoard}</h2>
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div className="rounded-xl bg-slate-50 p-2 dark:bg-slate-900">
                  <p className="text-xs text-ink-muted font-bold">{t.learn.examsPassed}</p>
                  <p className="text-2xl font-black text-brand-dark">{exams.summary.passed}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-2 dark:bg-slate-900">
                  <p className="text-xs text-ink-muted font-bold">{t.learn.examsReady}</p>
                  <p className="text-2xl font-black text-grape">{exams.summary.ready}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-2 dark:bg-slate-900">
                  <p className="text-xs text-ink-muted font-bold">{t.learn.examsLocked}</p>
                  <p className="text-2xl font-black">{exams.summary.locked}</p>
                </div>
              </div>
              {readyExams.slice(0, 3).map((e) => (
                <Link
                  key={e.lessonId}
                  href={e.href}
                  className="flex min-h-11 justify-between rounded-xl border border-grape/20 px-3 py-2 text-sm font-bold hover:bg-grape/5"
                >
                  <span>
                    {e.icon} {locale === "en" ? e.titleEn : e.titleUk}
                  </span>
                  <span className="text-grape">{t.learn.openExam} →</span>
                </Link>
              ))}
            </section>
          )}
        </div>
      )}
    </div>
  );
}
