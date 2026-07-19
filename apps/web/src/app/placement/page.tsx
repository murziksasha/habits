"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
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
};

export default function PlacementPage() {
  const { user, token, loading } = useAuth();
  const { t, locale } = useLocale();
  const router = useRouter();
  const [questions, setQuestions] = useState<Q[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<Result | null>(null);
  const [last, setLast] = useState<{
    score: number;
    levelLabel: string;
    createdAt: string;
  } | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!token) return;
    void api<{
      questions: Q[];
      lastResult: typeof last;
    }>("/learning/placement/english", { token })
      .then((d) => {
        setQuestions(d.questions);
        setLast(d.lastResult);
      })
      .catch(() => setQuestions([]));
  }, [token]);

  async function submit() {
    if (!token) return;
    setBusy(true);
    try {
      const payload = questions.map((q) => ({
        questionId: q.id,
        index: answers[q.id] ?? -1,
      }));
      const d = await api<{ result: Result }>("/learning/placement/english", {
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

  if (loading || !user) return <p>{t.common.loading}</p>;

  if (result) {
    return (
      <div className="mx-auto max-w-lg card space-y-4 text-center">
        <h1 className="text-3xl font-black">🧭 {t.learning.yourLevel}</h1>
        <p className="text-5xl font-black text-brand-dark">{result.levelLabel}</p>
        <p className="font-bold">
          {locale === "en" ? result.titleEn : result.titleUk}
        </p>
        <p className="text-ink-muted">
          {result.correct}/{result.total} · {Math.round(result.score * 100)}%
        </p>
        <Link href={result.startHref} className="btn-primary inline-flex">
          {t.learning.startPath}
        </Link>
        <Link href="/courses/english" className="btn-secondary inline-flex">
          English
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex flex-wrap gap-2">
        <Link href="/placement" className="btn-primary !py-1.5 text-sm">
          English
        </Link>
        <Link href="/placement/programming" className="btn-secondary !py-1.5 text-sm">
          Programming
        </Link>
      </div>
      <div>
        <h1 className="text-3xl font-black">🧭 {t.learning.placementTitle}</h1>
        <p className="text-ink-muted font-bold">{t.learning.placementHint}</p>
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
