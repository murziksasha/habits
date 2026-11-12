"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { COURSE_HUB_HREF, COURSE_META, isCourseSlug, pickLocale } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { PageLoading } from "@/components/page-loading";
import { useRequireAuth } from "@/lib/use-require-auth";
import clsx from "clsx";

type Q = {
  id: string;
  promptUk: string;
  promptEn: string;
  options: string[];
};

type Result = {
  score: number;
  correct: number;
  total: number;
  levelLabel: string;
  titleUk: string;
  titleEn: string;
  startHref: string;
  recommendedUnitSlug?: string;
  skippedUnits?: string[];
  skippedLessons?: number;
};

export function CoursePlacementClient({ courseSlug }: { courseSlug: string }) {
  const { user, token, loading } = useAuth();
  const { ready } = useRequireAuth();
  const { t, locale } = useLocale();
  const [questions, setQuestions] = useState<Q[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<Result | null>(null);
  const [last, setLast] = useState<{
    score: number;
    levelLabel: string;
    createdAt: string;
  } | null>(null);
  const [busy, setBusy] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [applySkip, setApplySkip] = useState(true);

  const meta = isCourseSlug(courseSlug) ? COURSE_META[courseSlug] : null;
  const hub = isCourseSlug(courseSlug)
    ? (COURSE_HUB_HREF[courseSlug] ?? `/courses/${courseSlug}`)
    : "/courses";
  const title = meta ? pickLocale(locale, meta.titleUk, meta.titleEn) : courseSlug;

  useEffect(() => {
    if (!token) return;
    setDataLoading(true);
    setUnavailable(false);
    void api<{
      questions: Q[];
      lastResult: typeof last;
    }>(`/learning/placement/${encodeURIComponent(courseSlug)}`, { token })
      .then((d) => {
        setQuestions(d.questions ?? []);
        setLast(d.lastResult);
        if (!d.questions?.length) setUnavailable(true);
      })
      .catch(() => {
        setQuestions([]);
        setUnavailable(true);
      })
      .finally(() => setDataLoading(false));
  }, [token, courseSlug]);

  async function submit() {
    if (!token) return;
    setBusy(true);
    try {
      const payload = questions.map((q) => ({
        questionId: q.id,
        index: answers[q.id] ?? -1,
      }));
      const d = await api<{ result: Result }>(
        `/learning/placement/${encodeURIComponent(courseSlug)}`,
        {
          method: "POST",
          token,
          body: { answers: payload, applySkip },
        },
      );
      setResult(d.result);
    } catch {
      /* ignore */
    } finally {
      setBusy(false);
    }
  }

  if (loading || !ready || (dataLoading && !questions.length && !result && !unavailable)) {
    return <PageLoading label={t.common.loading} />;
  }
  if (!user) return <PageLoading label={t.common.loading} />;

  if (unavailable && !result) {
    return (
      <div className="mx-auto max-w-lg card space-y-4 text-center">
        <h1 className="text-2xl font-black">🧭 {t.placementQuiz.title}</h1>
        <p className="font-bold">{title}</p>
        <p className="text-ink-muted">{t.placementQuiz.unavailable}</p>
        <Link href={hub} className="btn-primary inline-flex">
          {title} →
        </Link>
      </div>
    );
  }

  if (result) {
    return (
      <div className="mx-auto max-w-lg card space-y-4 text-center">
        <h1 className="text-3xl font-black">🧭 {t.learning.yourLevel}</h1>
        <p className="text-5xl font-black text-brand-dark">{result.levelLabel}</p>
        <p className="font-bold">{locale === "en" ? result.titleEn : result.titleUk}</p>
        <p className="text-ink-muted">
          {result.correct}/{result.total} · {Math.round(result.score * 100)}%
        </p>
        {result.skippedLessons ? (
          <p className="text-sm font-bold text-grape">
            {t.placementQuiz.skipped}: {result.skippedUnits?.length ?? 0}{" "}
            {t.placementQuiz.skippedUnits} · {result.skippedLessons}{" "}
            {t.placementQuiz.skippedLessons}
          </p>
        ) : null}
        <Link href={result.startHref} className="btn-primary inline-flex">
          {t.placementQuiz.startHere}
        </Link>
        <Link href={hub} className="btn-secondary inline-flex">
          {title}
        </Link>
        <button type="button" className="text-sm font-bold text-sky hover:underline" onClick={() => {
          setResult(null);
          setAnswers({});
        }}>
          {t.placementQuiz.retake}
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-black">
          🧭 {t.placementQuiz.title}: {title}
        </h1>
        <p className="text-ink-muted font-bold">{t.placementQuiz.hint}</p>
        {last && (
          <p className="mt-2 text-sm font-bold text-grape">
            Last: {last.levelLabel} ({Math.round(last.score * 100)}%)
          </p>
        )}
      </div>

      {questions.map((q, i) => (
        <div key={q.id} className="card space-y-3">
          <p className="font-black">
            {i + 1}. {locale === "en" ? q.promptEn : q.promptUk}
          </p>
          <div className="grid gap-2">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                className={clsx(
                  "rounded-2xl border-2 px-4 py-2 text-left font-bold transition",
                  answers[q.id] === idx
                    ? "border-sky bg-sky/10"
                    : "border-slate-200 hover:bg-slate-50 dark:border-slate-700",
                )}
                onClick={() => setAnswers((a) => ({ ...a, [q.id]: idx }))}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      <label className="flex items-start gap-3 card text-sm font-bold">
        <input
          type="checkbox"
          className="mt-1"
          checked={applySkip}
          onChange={(e) => setApplySkip(e.target.checked)}
        />
        <span>{t.placementQuiz.applySkip}</span>
      </label>

      <button
        type="button"
        className="btn-primary w-full"
        disabled={busy || Object.keys(answers).length < questions.length}
        onClick={() => void submit()}
      >
        {t.learning.submit}
      </button>
    </div>
  );
}
