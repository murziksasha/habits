"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { pickLocale } from "@eduforge/shared";
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
import { SubjectCatalog } from "@/components/subject-catalog";

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

/** Learning map: one continue action, then subjects, with quests kept below. */
export function LearnClient() {
  const { t, locale } = useLocale();
  const { user, token, loading: authLoading } = useAuth();
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
      <div>
          <h1 className="text-3xl font-black">{t.learn.title}</h1>
          <p className="text-sm font-bold text-ink-muted">{t.learn.mapTitle}</p>
        </div>

      {user ? <PrimaryMission showSecondary={false} /> : (
        <Link href="/courses" className="btn-primary inline-flex min-h-11">
          {t.coursePage.continue} →
        </Link>
      )}

      <SubjectCatalog variant="sections" showChessBot />

      {user ? (
        <div className="space-y-3">
          <DailyQuestsCard defaultOpen={false} />
          <WeeklyQuestsCard defaultOpen={false} />
        </div>
      ) : null}

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
