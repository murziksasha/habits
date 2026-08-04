"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
  recommendedUnitSlug: string;
};

export default function ProgrammingPlacementPage() {
  const { user, token, loading } = useAuth();
  const { ready } = useRequireAuth();
  const { t, locale } = useLocale();
  const [questions, setQuestions] = useState<Q[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<Result | null>(null);
  const [last, setLast] = useState<{
    score: number;
    levelLabel: string;
    recommendedUnitSlug: string | null;
  } | null>(null);
  const [busy, setBusy] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    setDataLoading(true);
    void api<{ questions: Q[]; lastResult: typeof last }>(
      "/learning/placement/programming",
      { token },
    )
      .then((d) => {
        setQuestions(d.questions);
        setLast(d.lastResult);
      })
      .catch(() => setQuestions([]))
      .finally(() => setDataLoading(false));
  }, [token]);

  async function submit() {
    if (!token) return;
    setBusy(true);
    try {
      const payload = questions.map((q) => ({
        questionId: q.id,
        index: answers[q.id] ?? -1,
      }));
      const d = await api<{ result: Result }>("/learning/placement/programming", {
        method: "POST",
        token,
        body: { answers: payload },
      });
      setResult(d.result);
    } catch {
      /* ignore */
    } finally {
      setBusy(false);
    }
  }

  if (loading || !ready || (dataLoading && !questions.length && !result)) {
    return <PageLoading label={t.common.loading} />;
  }
  if (!user) return <PageLoading label={t.common.loading} />;

  if (result) {
    return (
      <div className="mx-auto max-w-lg card space-y-4 text-center">
        <h1 className="text-3xl font-black">💻 {t.learning.yourLevel}</h1>
        <p className="text-4xl font-black text-sky">{result.levelLabel}</p>
        <p className="font-bold">
          {locale === "en" ? result.titleEn : result.titleUk}
        </p>
        <p className="text-ink-muted">
          {result.correct}/{result.total} · {Math.round(result.score * 100)}% · unit:{" "}
          {result.recommendedUnitSlug}
        </p>
        <Link href={result.startHref} className="btn-primary inline-flex">
          {t.learning.startPath}
        </Link>
        <Link href="/programming" className="btn-secondary inline-flex">
          {t.programming.hubTitle}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-black">💻 {t.programming.placementTitle}</h1>
        <p className="text-ink-muted font-bold">{t.programming.placementHint}</p>
        {last && (
          <p className="mt-2 text-sm font-bold text-grape">
            Last: {last.levelLabel} ({Math.round(last.score * 100)}%)
            {last.recommendedUnitSlug ? ` → ${last.recommendedUnitSlug}` : ""}
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
