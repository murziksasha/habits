"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  COURSE_GROUP_META,
  COURSE_HUB_HREF,
  COURSE_META,
  pickLocale,
  type CourseGroup,
  type CourseSlug,
} from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";

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

export default function LearnPage() {
  const { user, token, loading } = useAuth();
  const { t, locale } = useLocale();
  const router = useRouter();
  const [next, setNext] = useState<NextRec[]>([]);
  const [exams, setExams] = useState<ExamSummary | null>(null);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!token) return;
    void api<{ recommendations: NextRec[] }>("/learning/next", { token })
      .then((d) => setNext(d.recommendations.slice(0, 5)))
      .catch(() => setNext([]));
    void api<ExamSummary>("/learning/exams/me", { token })
      .then(setExams)
      .catch(() => setExams(null));
    // Onboarding: mark learn map visited
    void api("/auth/onboarding/complete", {
      method: "POST",
      token,
      body: { key: "viewedLearnMap" },
    }).catch(() => undefined);
  }, [token]);

  if (loading || !user) return <p>{t.common.loading}</p>;

  const readyExams =
    exams?.courses.flatMap((c) =>
      c.exams
        .filter((e) => e.status === "ready")
        .map((e) => ({ ...e, icon: c.icon, course: c.titleUk })),
    ) ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black">🗺️ {t.learn.title}</h1>
        <p className="text-sm font-bold text-ink-muted">{t.learn.mapTitle}</p>
      </div>

      {next[0] && (
        <section className="card border-brand/40 space-y-2 bg-brand-soft/20">
          <p className="text-xs font-black uppercase text-brand-dark">
            {t.learn.recommended}
          </p>
          <Link href={next[0].href} className="text-xl font-black hover:underline">
            {locale === "en" ? next[0].titleEn : next[0].titleUk} →
          </Link>
        </section>
      )}

      {next.length > 1 && (
        <section className="space-y-2">
          <h2 className="text-lg font-black">{t.learning.nextSteps}</h2>
          {next.slice(1).map((r, i) => (
            <Link
              key={`${r.href}-${i}`}
              href={r.href}
              className="card flex justify-between font-bold hover:border-brand/40"
            >
              <span>{locale === "en" ? r.titleEn : r.titleUk}</span>
              <span>→</span>
            </Link>
          ))}
        </section>
      )}

      {exams && (
        <section className="card space-y-3 border-grape/30">
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
          {readyExams.slice(0, 5).map((e) => (
            <Link
              key={e.lessonId}
              href={e.href}
              className="flex justify-between rounded-xl border border-grape/20 px-3 py-2 text-sm font-bold hover:bg-grape/5"
            >
              <span>
                {e.icon} {locale === "en" ? e.titleEn : e.titleUk}
              </span>
              <span className="text-grape">{t.learn.openExam} →</span>
            </Link>
          ))}
        </section>
      )}

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
                    className="card flex items-center gap-3 hover:border-brand/40"
                  >
                    <span className="text-2xl">{c.icon}</span>
                    <span className="font-black">
                      {pickLocale(locale, c.titleUk, c.titleEn)}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      <section className="card space-y-2">
        <h2 className="font-black">{t.learn.studyToolkit}</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { href: "/review", label: t.nav.review },
            { href: "/flashcards", label: t.nav.flashcards },
            { href: "/tutor", label: t.nav.tutor },
            { href: "/quests", label: t.nav.quests },
            { href: "/focus", label: t.nav.focus },
            { href: "/notes", label: t.nav.notes },
          ].map((x) => (
            <Link key={x.href} href={x.href} className="btn-secondary !py-1.5 !px-3 text-sm">
              {x.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
