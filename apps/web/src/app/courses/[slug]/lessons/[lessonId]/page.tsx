"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UI } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { ExercisePlayer, type Exercise } from "@/components/exercises";
import { HeartsBar } from "@/components/hearts";

export default function LessonPage() {
  const { slug, lessonId } = useParams<{ slug: string; lessonId: string }>();
  const { token, user, loading, setCharacter } = useAuth();
  const { t } = useLocale();
  const router = useRouter();
  const [lesson, setLesson] = useState<{
    id: string;
    titleUk: string;
    exercises: Exercise[];
    isExam?: boolean;
    passThreshold?: number | null;
  } | null>(null);
  const [hearts, setHearts] = useState(5);
  const [maxHearts, setMaxHearts] = useState(5);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<{ exerciseId: string; answer: unknown }[]>([]);
  const [feedback, setFeedback] = useState<"ok" | "bad" | null>(null);
  const [summary, setSummary] = useState<{
    xpGain: number;
    accuracy: number;
    courseLevel: number;
    levelUp: boolean;
    hearts: number;
    heartLost: boolean;
    streakProtected?: boolean;
    isExam?: boolean;
    passed?: boolean;
    examFailed?: boolean;
    passThreshold?: number;
  } | null>(null);
  const [error, setError] = useState("");
  const [bookmarked, setBookmarked] = useState(false);
  const [noteBody, setNoteBody] = useState("");
  const [noteMsg, setNoteMsg] = useState("");
  const [comments, setComments] = useState<
    { id: string; body: string; displayName: string | null; createdAt: string }[]
  >([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!token) return;
    void api<{
      lesson: {
        id: string;
        titleUk: string;
        exercises: Exercise[];
        isExam?: boolean;
        passThreshold?: number | null;
      };
      hearts?: number;
      maxHearts?: number;
    }>(`/courses/${slug}/lessons/${lessonId}`, { token })
      .then((d) => {
        setLesson(d.lesson);
        if (typeof d.hearts === "number") setHearts(d.hearts);
        if (typeof d.maxHearts === "number") setMaxHearts(d.maxHearts);
      })
      .catch((e: Error & { status?: number; data?: { error?: string } }) => {
        if (e.status === 403 && e.data?.error === "exam_locked") {
          setError("exam_locked");
        } else if (e.status === 402) {
          if (e.data && (e.data as { error?: string }).error === "no_hearts") {
            setError("no_hearts");
          } else {
            setError("premium_required");
          }
        } else setError("load_failed");
      });
    void api<{ bookmarked: boolean }>(`/bookmarks/check/${lessonId}`, { token })
      .then((d) => setBookmarked(d.bookmarked))
      .catch(() => undefined);
    void api<{ note: { body: string } | null }>(`/notes/lesson/${lessonId}`, { token })
      .then((d) => setNoteBody(d.note?.body ?? ""))
      .catch(() => undefined);
    void api<{ comments: typeof comments }>(`/comments/lesson/${lessonId}`, { token })
      .then((d) => setComments(d.comments))
      .catch(() => setComments([]));
  }, [token, slug, lessonId]);

  async function toggleBookmark() {
    if (!token || !lessonId) return;
    if (bookmarked) {
      await api(`/bookmarks/${lessonId}`, { method: "DELETE", token });
      setBookmarked(false);
    } else {
      await api("/bookmarks", {
        method: "POST",
        token,
        body: { lessonId },
      });
      setBookmarked(true);
    }
  }

  async function saveNote() {
    if (!token || !lessonId) return;
    try {
      await api("/notes", {
        method: "POST",
        token,
        body: { lessonId, body: noteBody },
      });
      setNoteMsg("OK");
      setTimeout(() => setNoteMsg(""), 1500);
    } catch {
      setNoteMsg("err");
    }
  }

  async function postComment() {
    if (!token || !lessonId || !commentText.trim()) return;
    try {
      const d = await api<{
        comment: { id: string; body: string; displayName: string | null; createdAt: string };
      }>(`/comments/lesson/${lessonId}`, {
        method: "POST",
        token,
        body: { body: commentText.trim() },
      });
      setComments((c) => [...c, d.comment]);
      setCommentText("");
    } catch {
      /* ignore */
    }
  }

  async function handleAnswer(answer: unknown) {
    if (!lesson) return;
    const ex = lesson.exercises[idx];
    const nextAnswers = [
      ...answers.filter((a) => a.exerciseId !== ex.id),
      { exerciseId: ex.id, answer },
    ];
    setAnswers(nextAnswers);

    if (idx < lesson.exercises.length - 1) {
      setFeedback("ok");
      setTimeout(() => {
        setFeedback(null);
        setIdx((i) => i + 1);
      }, 400);
    } else {
      try {
        const result = await api<{
          xpGain: number;
          accuracy: number;
          courseLevel: number;
          levelUp: boolean;
          character: Parameters<typeof setCharacter>[0];
          hearts?: number;
          heartLost?: boolean;
          streakProtected?: boolean;
          isExam?: boolean;
          passed?: boolean;
          examFailed?: boolean;
          passThreshold?: number;
        }>(`/courses/${slug}/lessons/${lessonId}/submit`, {
          method: "POST",
          token,
          body: { answers: nextAnswers },
        });
        if (result.character) setCharacter(result.character);
        if (typeof result.hearts === "number") setHearts(result.hearts);
        setSummary({
          xpGain: result.xpGain,
          accuracy: result.accuracy,
          courseLevel: result.courseLevel,
          levelUp: result.levelUp,
          hearts: result.hearts ?? hearts,
          heartLost: Boolean(result.heartLost),
          streakProtected: Boolean(result.streakProtected),
          isExam: Boolean(result.isExam),
          passed: result.passed,
          examFailed: Boolean(result.examFailed),
          passThreshold: result.passThreshold,
        });
      } catch (e: unknown) {
        const err = e as Error & { data?: { error?: string } };
        if (err.data?.error === "no_hearts") setError("no_hearts");
        else setError("submit_failed");
      }
    }
  }

  if (error === "exam_locked") {
    return (
      <div className="card mx-auto max-w-lg text-center space-y-4">
        <h1 className="text-2xl font-black">📝 {t.lesson.exam}</h1>
        <p className="text-ink-muted font-bold">{t.lesson.examLocked}</p>
        <Link href={`/courses/${slug}`} className="btn-primary">
          {UI.common.back}
        </Link>
      </div>
    );
  }

  if (error === "premium_required") {
    return (
      <div className="card mx-auto max-w-lg text-center space-y-4">
        <h1 className="text-2xl font-black">{UI.common.locked}</h1>
        <p className="text-ink-muted">Цей урок доступний у Premium.</p>
        <Link href="/pricing" className="btn-primary">
          {UI.common.unlockPremium}
        </Link>
      </div>
    );
  }

  if (error === "no_hearts") {
    return (
      <div className="card mx-auto max-w-lg text-center space-y-4">
        <h1 className="text-2xl font-black">{UI.hearts.empty}</h1>
        <p className="text-ink-muted">{UI.hearts.emptyHint}</p>
        <HeartsBar hearts={0} max={maxHearts} />
        <div className="flex justify-center gap-3">
          <Link href={`/courses/${slug}`} className="btn-secondary">
            {UI.common.back}
          </Link>
          <Link href="/pricing" className="btn-primary">
            Premium
          </Link>
        </div>
      </div>
    );
  }

  if (!lesson) return <p className="text-ink-muted">{error || UI.common.loading}</p>;

  if (summary) {
    const examFail = summary.examFailed || (summary.isExam && summary.passed === false);
    return (
      <div className="card mx-auto max-w-lg space-y-4 text-center">
        <h1 className="text-3xl font-black">
          {examFail
            ? t.lesson.examFailed
            : summary.isExam
              ? t.lesson.examPassed
              : UI.lesson.completed}
        </h1>
        {!examFail && (
          <p className="text-lg font-bold text-brand-dark">
            +{summary.xpGain} {UI.lesson.xpGained}
          </p>
        )}
        <p>
          Точність: {Math.round(summary.accuracy * 100)}%
          {summary.isExam && summary.passThreshold != null
            ? ` · ≥${Math.round(summary.passThreshold * 100)}%`
            : ""}{" "}
          · {UI.dashboard.level} курсу: {summary.courseLevel}
        </p>
        <div className="flex justify-center">
          <HeartsBar hearts={summary.hearts} max={maxHearts} />
        </div>
        {summary.heartLost && (
          <p className="text-sm font-bold text-red-500">{UI.hearts.lost}</p>
        )}
        {summary.levelUp && (
          <p className="text-xl font-black text-grape">{UI.lesson.levelUp}</p>
        )}
        {summary.streakProtected && (
          <p className="text-sm font-black text-sky">🛡️ {t.streak.protected}</p>
        )}
        <div className="flex flex-wrap justify-center gap-3">
          {examFail ? (
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                setSummary(null);
                setIdx(0);
                setAnswers([]);
              }}
            >
              {t.lesson.tryAgain}
            </button>
          ) : null}
          {examFail ? (
            <Link href="/review" className="btn-secondary">
              🔁 {t.nav.review}
            </Link>
          ) : null}
          {examFail ? (
            <Link
              href={`/tutor?course=${encodeURIComponent(slug)}`}
              className="btn-secondary"
            >
              🤖 {t.nav.tutor}
            </Link>
          ) : null}
          <Link href={`/courses/${slug}`} className="btn-primary">
            До курсу
          </Link>
          <Link href="/learn" className="btn-secondary">
            {t.nav.learn}
          </Link>
        </div>
      </div>
    );
  }

  const ex = lesson.exercises[idx];
  const progress = ((idx + 1) / lesson.exercises.length) * 100;

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="flex items-center justify-between gap-2">
        <Link href={`/courses/${slug}`} className="text-sm font-bold text-ink-muted">
          ← {UI.lesson.exit}
        </Link>
        <button
          type="button"
          className="text-sm font-bold"
          onClick={() => void toggleBookmark()}
          title="Bookmark"
        >
          {bookmarked ? "⭐" : "☆"}
        </button>
        <HeartsBar hearts={hearts} max={maxHearts} compact />
        <span className="text-sm font-bold text-ink-muted">
          {idx + 1}/{lesson.exercises.length}
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full bg-brand transition-all" style={{ width: `${progress}%` }} />
      </div>
      {lesson.isExam && (
        <div className="rounded-2xl border-2 border-grape/40 bg-grape/10 px-4 py-3 text-sm font-bold text-grape">
          📝 {t.lesson.examBanner}
        </div>
      )}
      <div className="card">
        <p className="mb-4 text-sm font-bold text-ink-muted">{lesson.titleUk}</p>
        <ExercisePlayer
          key={ex.id}
          exercise={ex}
          onAnswer={handleAnswer}
          examMode={Boolean(lesson.isExam)}
        />
        {feedback === "ok" && (
          <p className="mt-4 font-bold text-brand-dark">{UI.lesson.correct}</p>
        )}
      </div>
      <div className="card space-y-2 !py-3">
        <label className="text-xs font-bold text-ink-muted">📔 Note</label>
        <textarea
          className="input min-h-[72px] text-sm"
          value={noteBody}
          onChange={(e) => setNoteBody(e.target.value)}
          placeholder="…"
        />
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn-secondary !py-1.5 !px-3 text-sm"
            onClick={() => void saveNote()}
          >
            {UI.common.save}
          </button>
          {noteMsg === "OK" && <span className="text-xs font-bold text-green-600">✓</span>}
        </div>
      </div>

      <div className="card space-y-3">
        <h3 className="font-black">💬 Discussion</h3>
        {comments.length === 0 && (
          <p className="text-sm text-ink-muted font-bold">No comments yet</p>
        )}
        {comments.map((c) => (
          <div key={c.id} className="rounded-xl bg-slate-50 p-3 text-sm dark:bg-slate-900">
            <p className="font-bold text-xs text-ink-muted">
              {c.displayName ?? "—"} · {new Date(c.createdAt).toLocaleString()}
            </p>
            <p className="mt-1 whitespace-pre-wrap">{c.body}</p>
          </div>
        ))}
        <div className="flex gap-2">
          <input
            className="input flex-1"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Comment…"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                void postComment();
              }
            }}
          />
          <button type="button" className="btn-primary !py-2" onClick={() => void postComment()}>
            →
          </button>
        </div>
      </div>
    </div>
  );
}
