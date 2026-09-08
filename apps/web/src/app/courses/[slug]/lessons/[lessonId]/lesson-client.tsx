"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  exerciseExplanation,
  exerciseTypeLabel,
  heartsWarningLevel,
  LESSON_RESULT_SHEET_MS,
  UI,
} from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api, isNetworkOrOfflineError } from "@/lib/api";
import { ExercisePlayer, type Exercise } from "@/components/exercises";
import { HeartsBar } from "@/components/hearts";
import { PaywallCard } from "@/components/paywall";
import { Celebration } from "@/components/celebration";
import { ShareLinkButtons } from "@/components/share-link";
import { Breadcrumbs, Skeleton, useToast } from "@/components/ui";
import { isBrowserOffline } from "@/components/online-status";
import { dispatchHeartsRefresh } from "@/components/hearts-chrome";
import { LessonShortcutsHelp } from "@/components/lesson-shortcuts-help";

type ExerciseResult = {
  exerciseId: string;
  type?: string;
  correct: boolean;
  meta?: Record<string, unknown>;
};

function newIdempotencyKey() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID().replace(/-/g, "");
  }
  return `k${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
}

export function LessonClient() {
  const { slug, lessonId } = useParams<{ slug: string; lessonId: string }>();
  const { token, user, loading, setCharacter } = useAuth();
  const { t, locale } = useLocale();
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
  const [feedbackExplain, setFeedbackExplain] = useState("");
  const [showCoach, setShowCoach] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState<
    { exerciseId: string; answer: unknown }[] | null
  >(null);
  const [keysHelp, setKeysHelp] = useState(false);
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
    results?: ExerciseResult[];
    correctCount?: number;
    total?: number;
    certificate?: { code: string; titleUk: string } | null;
    nextLesson?: {
      id: string;
      titleUk: string;
      titleEn?: string | null;
      href: string;
    } | null;
    skillPoints?: number;
  } | null>(null);
  const [error, setError] = useState("");
  const [bookmarked, setBookmarked] = useState(false);
  const [noteBody, setNoteBody] = useState("");
  const [noteMsg, setNoteMsg] = useState("");
  const [comments, setComments] = useState<
    { id: string; body: string; displayName: string | null; createdAt: string }[]
  >([]);
  const [commentText, setCommentText] = useState("");
  // Default focus on mobile; desktop starts full (notes/comments available)
  const [focusMode, setFocusMode] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : true,
  );
  const [submitting, setSubmitting] = useState(false);
  const idempotencyKeyRef = useRef(newIdempotencyKey());
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(
        `/login?next=${encodeURIComponent(`/courses/${slug}/lessons/${lessonId}`)}`,
      );
    }
  }, [loading, user, router, slug, lessonId]);

  // One-time coach tip for focus / Esc
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      if (localStorage.getItem("ef_coach_focus") === "1") return;
      setShowCoach(true);
      localStorage.setItem("ef_coach_focus", "1");
      const t = window.setTimeout(() => setShowCoach(false), 5000);
      return () => window.clearTimeout(t);
    } catch {
      /* ignore */
    }
  }, []);

  // Auto-retry submit when network returns (PWA / offline)
  useEffect(() => {
    if (!pendingSubmit || submitting || summary) return;
    function onOnline() {
      if (!pendingSubmit) return;
      toast(t.onboarding.autoRetry, "success");
      void submitLessonAnswers(pendingSubmit);
    }
    window.addEventListener("online", onOnline);
    return () => window.removeEventListener("online", onOnline);
  }, [pendingSubmit, submitting, summary, t.onboarding.autoRetry]);

  // Focus mode: hide global nav/header via html class
  useEffect(() => {
    const root = document.documentElement;
    if (focusMode && lesson && !summary && !error) {
      root.classList.add("lesson-focus");
    } else {
      root.classList.remove("lesson-focus");
    }
    return () => root.classList.remove("lesson-focus");
  }, [focusMode, lesson, summary, error]);

  // Fresh idempotency key per lesson load / retry
  useEffect(() => {
    idempotencyKeyRef.current = newIdempotencyKey();
  }, [lessonId]);

  // Escape → exit lesson (confirm if mid-progress); F toggles focus; ? help
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        if (!e.metaKey && !e.ctrlKey && !e.altKey) {
          e.preventDefault();
          setKeysHelp((v) => !v);
        }
        return;
      }

      if (e.key === "f" || e.key === "F") {
        if (!e.metaKey && !e.ctrlKey && !e.altKey && !keysHelp) {
          e.preventDefault();
          setFocusMode((v) => !v);
        }
        return;
      }

      if (e.key !== "Escape") return;
      if (keysHelp) {
        setKeysHelp(false);
        return;
      }
      if (summary) {
        router.push(`/courses/${slug}`);
        return;
      }
      if (answers.length > 0 || idx > 0) {
        const ok =
          typeof window !== "undefined"
            ? window.confirm(t.lesson?.exit ? `${t.lesson.exit}?` : "Exit lesson?")
            : true;
        if (!ok) return;
      }
      router.push(`/courses/${slug}`);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [answers.length, idx, router, slug, summary, keysHelp, t.lesson?.exit]);

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
      toast(locale === "en" ? "Note saved" : "Нотатку збережено", "success");
      setTimeout(() => setNoteMsg(""), 1500);
    } catch {
      setNoteMsg("err");
      toast(locale === "en" ? "Save failed" : "Помилка збереження", "error");
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
    if (!lesson || submitting || feedback === "ok") return;
    const ex = lesson.exercises[idx];
    const nextAnswers = [
      ...answers.filter((a) => a.exerciseId !== ex.id),
      { exerciseId: ex.id, answer },
    ];
    setAnswers(nextAnswers);
    const explain = exerciseExplanation(
      ex as Record<string, unknown>,
      locale === "en" ? "en" : "uk",
    );

    if (idx < lesson.exercises.length - 1) {
      // Result sheet: show correct + explanation before next
      setFeedback("ok");
      setFeedbackExplain(explain);
      setTimeout(() => {
        setFeedback(null);
        setFeedbackExplain("");
        setIdx((i) => i + 1);
      }, LESSON_RESULT_SHEET_MS);
    } else {
      setFeedback("ok");
      setFeedbackExplain(explain);
      await submitLessonAnswers(nextAnswers);
    }
  }

  async function submitLessonAnswers(
    nextAnswers: { exerciseId: string; answer: unknown }[],
  ) {
    if (!token || !lessonId) return;
    setSubmitting(true);
    setPendingSubmit(null);
    try {
      if (isBrowserOffline()) {
        throw Object.assign(new Error("offline"), {
          offline: true,
          status: 0,
          data: { error: "offline" },
        });
      }
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
        results?: ExerciseResult[];
        correctCount?: number;
        total?: number;
        certificate?: { code: string; titleUk: string } | null;
        nextLesson?: {
          id: string;
          titleUk: string;
          titleEn?: string | null;
          href: string;
        } | null;
      } & { character?: { progression?: { skillPoints?: number } } }>(`/courses/${slug}/lessons/${lessonId}/submit`, {
        method: "POST",
        token,
        body: {
          answers: nextAnswers,
          idempotencyKey: idempotencyKeyRef.current,
        },
      });
      if (result.character) setCharacter(result.character);
      if (typeof result.hearts === "number") setHearts(result.hearts);
      dispatchHeartsRefresh();
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
        results: result.results,
        correctCount: result.correctCount,
        total: result.total,
        certificate: result.certificate ?? null,
        nextLesson: result.nextLesson ?? null,
        skillPoints: (() => {
          const ch = result.character as
            | { progression?: { skillPoints?: number } }
            | null
            | undefined;
          return typeof ch?.progression?.skillPoints === "number"
            ? ch.progression.skillPoints
            : undefined;
        })(),
      });
      setFeedback(null);
      setFeedbackExplain("");
    } catch (e: unknown) {
      const err = e as Error & { data?: { error?: string }; offline?: boolean };
      if (err.data?.error === "no_hearts") {
        setError("no_hearts");
        setFeedback(null);
        setFeedbackExplain("");
      } else if (isNetworkOrOfflineError(e) || err.data?.error === "offline") {
        setPendingSubmit(nextAnswers);
        setFeedback(null);
        setFeedbackExplain("");
        toast(
          locale === "en"
            ? "Offline / network error — tap Retry to submit"
            : "Офлайн / мережа — натисніть «Повторити»",
          "error",
        );
      } else {
        setError("submit_failed");
        setFeedback(null);
        setFeedbackExplain("");
      }
    } finally {
      setSubmitting(false);
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
    return <PaywallCard reason="premium_required" backHref={`/courses/${slug}`} />;
  }

  if (error === "no_hearts") {
    return (
      <div className="space-y-4">
        <PaywallCard reason="no_hearts" backHref={`/courses/${slug}`} />
        <div className="flex justify-center">
          <HeartsBar hearts={0} max={maxHearts} />
        </div>
      </div>
    );
  }

  if (pendingSubmit && !summary) {
    return (
      <div className="card mx-auto max-w-lg space-y-3 text-center">
        <p className="font-bold text-sun">
          {locale === "en"
            ? "Could not reach the server"
            : "Не вдалося звʼязатись із сервером"}
        </p>
        <p className="text-sm font-bold text-ink-muted">
          {locale === "en"
            ? "Your answers are kept. Retry when you are online."
            : "Відповіді збережено. Повторіть, коли зʼявиться мережа."}
        </p>
        <button
          type="button"
          className="btn-primary min-h-11"
          disabled={submitting}
          onClick={() => void submitLessonAnswers(pendingSubmit)}
        >
          {locale === "en" ? "Retry submit" : "Повторити надсилання"}
        </button>
        <Link href={`/courses/${slug}`} className="btn-secondary inline-flex">
          {UI.common.back}
        </Link>
      </div>
    );
  }

  if (!lesson) {
    if (error === "load_failed" || error === "submit_failed") {
      return (
        <div className="card mx-auto max-w-lg space-y-3 text-center">
          <p className="font-bold text-red-500">
            {error === "submit_failed"
              ? locale === "en"
                ? "Submit failed"
                : "Помилка надсилання"
              : locale === "en"
                ? "Could not load lesson"
                : "Не вдалося завантажити урок"}
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              setError("");
              window.location.reload();
            }}
          >
            {locale === "en" ? "Retry" : "Спробувати знову"}
          </button>
          <Link href={`/courses/${slug}`} className="btn-secondary inline-flex">
            {UI.common.back}
          </Link>
        </div>
      );
    }
    return (
      <div className="mx-auto max-w-2xl space-y-4" aria-busy="true">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-64 w-full" />
        <p className="sr-only">{UI.common.loading}</p>
      </div>
    );
  }

  if (summary) {
    const examFail = summary.examFailed || (summary.isExam && summary.passed === false);
    const wrong = (summary.results ?? []).filter((r) => !r.correct);
    const sharePath = summary.certificate?.code
      ? `/certificates/${summary.certificate.code}`
      : `/courses/${slug}`;
    return (
      <div className="card mx-auto max-w-lg space-y-4 text-center">
        <Celebration
          kind={
            summary.certificate
              ? "cert"
              : summary.levelUp
                ? "level"
                : summary.streakProtected
                  ? "streak"
                  : "complete"
          }
          show={!examFail}
        />
        <h1 className="text-3xl font-black">
          {examFail
            ? t.lesson.examFailed
            : summary.isExam
              ? t.lesson.examPassed
              : UI.lesson.completed}
        </h1>
        {!examFail && (
          <p className="text-lg font-bold text-brand-dark" role="status" aria-live="polite">
            +{summary.xpGain} {UI.lesson.xpGained}
          </p>
        )}
        <p>
          {locale === "en" ? "Accuracy" : "Точність"}: {Math.round(summary.accuracy * 100)}%
          {summary.correctCount != null && summary.total != null
            ? ` · ${summary.correctCount}/${summary.total}`
            : ""}
          {summary.isExam && summary.passThreshold != null
            ? ` · ≥${Math.round(summary.passThreshold * 100)}%`
            : ""}{" "}
          · {UI.dashboard.level}: {summary.courseLevel}
        </p>
        {wrong.length > 0 && (
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-left dark:border-slate-800 dark:bg-slate-900">
            <p className="mb-2 text-xs font-black uppercase text-ink-muted">
              {t.onboarding.reviewMisses}
            </p>
            <ul className="space-y-2 text-sm font-bold">
              {wrong.map((r, i) => {
                const missing = Array.isArray(r.meta?.missing)
                  ? (r.meta!.missing as string[]).slice(0, 3).join(", ")
                  : null;
                const human = exerciseTypeLabel(
                  r.type,
                  locale === "en" ? "en" : "uk",
                );
                return (
                  <li key={r.exerciseId || i} className="flex flex-wrap gap-2">
                    <span className="text-red-500">✗</span>
                    <span>{human}</span>
                    {missing ? (
                      <span className="text-xs text-ink-muted">· {missing}</span>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
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
        {summary.certificate?.code && (
          <div className="rounded-2xl border-2 border-brand/40 bg-brand-soft/40 p-4 space-y-2">
            <p className="text-lg font-black text-brand-dark">📜 {t.certificates.ready}</p>
            <p className="text-sm font-bold text-ink-muted">{summary.certificate.titleUk}</p>
            <Link
              href={`/certificates/${summary.certificate.code}`}
              className="btn-primary inline-flex"
            >
              {t.certificates.openCert}
            </Link>
          </div>
        )}
        {!examFail && (
          <div className="rounded-2xl border border-slate-100 p-3 text-left dark:border-slate-800">
            <p className="mb-2 text-xs font-black uppercase text-ink-muted">
              {locale === "en" ? "Share" : "Поділитись"}
            </p>
            <ShareLinkButtons
              path={sharePath}
              title={locale === "en" ? "I finished a lesson on EduForge" : "Я пройшов урок в EduForge"}
              text={
                locale === "en"
                  ? `+${summary.xpGain} XP · ${Math.round(summary.accuracy * 100)}% accuracy`
                  : `+${summary.xpGain} XP · точність ${Math.round(summary.accuracy * 100)}%`
              }
            />
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-3">
          {examFail ? (
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                idempotencyKeyRef.current = newIdempotencyKey();
                setSummary(null);
                setIdx(0);
                setAnswers([]);
              }}
            >
              {t.lesson.tryAgain}
            </button>
          ) : null}
          {examFail ? (
            <Link href="/review?from=exam" className="btn-secondary">
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
          {!examFail && summary.nextLesson ? (
            <Link href={summary.nextLesson.href} className="btn-primary min-h-11">
              {t.onboarding.nextLesson}:{" "}
              {locale === "en"
                ? summary.nextLesson.titleEn || summary.nextLesson.titleUk
                : summary.nextLesson.titleUk}
              {" →"}
            </Link>
          ) : null}
          {(summary.skillPoints ?? 0) > 0 || summary.levelUp ? (
            <Link
              href="/profile#build"
              className="btn-secondary min-h-11 ring-1 ring-grape/40"
            >
              ⭐{" "}
              {locale === "en"
                ? `Build character${summary.skillPoints ? ` (${summary.skillPoints} SP)` : ""}`
                : `Прокачай персонажа${summary.skillPoints ? ` (${summary.skillPoints} очок)` : ""}`}
            </Link>
          ) : null}
          <Link
            href={`/courses/${slug}`}
            className={!examFail && summary.nextLesson ? "btn-secondary" : "btn-primary"}
          >
            {locale === "en" ? "Back to course" : "До курсу"}
          </Link>
          <Link href="/learn" className="btn-secondary">
            {t.nav.learn}
          </Link>
          {!examFail ? (
            <Link href="/review" className="btn-secondary">
              🔁 {t.nav.review}
            </Link>
          ) : null}
        </div>
      </div>
    );
  }

  const ex = lesson.exercises[idx];
  const progress = ((idx + 1) / lesson.exercises.length) * 100;
  const heartsLevel = heartsWarningLevel(hearts, maxHearts);
  const isCodeEx =
    typeof ex.type === "string" &&
    (ex.type.startsWith("code_") || ex.type === "code_judge");
  const nearEnd =
    lesson.exercises.length > 2 && idx >= lesson.exercises.length - 2;

  return (
    <div
      className={`mx-auto max-w-2xl space-y-4 ${isCodeEx ? "lesson-code-mobile" : ""}`}
    >
      <LessonShortcutsHelp open={keysHelp} onClose={() => setKeysHelp(false)} />
      <Breadcrumbs
        items={[
          { href: "/courses", label: locale === "en" ? "Courses" : "Курси" },
          { href: `/courses/${slug}`, label: String(slug) },
          { label: locale === "en" ? "Lesson" : "Урок" },
        ]}
      />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link
          href={`/courses/${slug}`}
          className="text-sm font-bold text-ink-muted min-h-11 inline-flex items-center"
          title="Esc"
        >
          ← {UI.lesson.exit}
          <span className="ml-1 text-[10px] opacity-60">Esc</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="touch-target rounded-xl border-2 border-slate-200 px-2 py-1 text-xs font-black dark:border-slate-700"
            onClick={() => setKeysHelp(true)}
            title={locale === "en" ? "Keyboard help (?)" : "Гарячі клавіші (?)"}
          >
            ?
          </button>
          <button
            type="button"
            className="touch-target rounded-xl border-2 border-slate-200 px-2 py-1 text-xs font-black dark:border-slate-700"
            onClick={() => setFocusMode((v) => !v)}
            title={locale === "en" ? "Toggle focus (F)" : "Режим фокусу (F)"}
            aria-pressed={focusMode}
          >
            {focusMode
              ? locale === "en"
                ? "🎯 Focus"
                : "🎯 Фокус"
              : locale === "en"
                ? "🗒 Full"
                : "🗒 Усе"}
          </button>
          <button
            type="button"
            className="touch-target text-sm font-bold"
            onClick={() => void toggleBookmark()}
            title="Bookmark"
          >
            {bookmarked ? "⭐" : "☆"}
          </button>
          <HeartsBar hearts={hearts} max={maxHearts} compact />
          <span
            className="text-sm font-bold text-ink-muted"
            aria-live="polite"
            aria-atomic="true"
          >
            {locale === "en"
              ? `Exercise ${idx + 1} of ${lesson.exercises.length}`
              : `Вправа ${idx + 1} з ${lesson.exercises.length}`}
          </span>
        </div>
      </div>
      {heartsLevel === "low" && (
        <p className="rounded-xl bg-sun/15 px-3 py-2 text-xs font-bold text-sun" role="status">
          ⚠️ {t.onboarding.heartsLow} · {t.onboarding.heartsRegen}
        </p>
      )}
      {nearEnd && !feedback && (
        <p
          className="rounded-xl bg-brand/10 px-3 py-2 text-xs font-bold text-brand-dark"
          role="status"
        >
          {locale === "en"
            ? "Almost done — finish strong 💪"
            : "Майже фініш — дотисніть 💪"}
        </p>
      )}
      {feedback === "ok" && (
        <p className="text-center text-sm font-black text-green-600" role="status">
          {locale === "en" ? "Nice!" : "Клас!"} ✓
        </p>
      )}
      {feedback === "bad" && (
        <p className="text-center text-sm font-black text-orange-600" role="status">
          {locale === "en"
            ? "Not quite — try a hint or another answer"
            : "Ще не те — підказка або інша відповідь"}
        </p>
      )}
      <div
        className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
        role="progressbar"
        aria-valuenow={idx + 1}
        aria-valuemin={1}
        aria-valuemax={lesson.exercises.length}
      >
        <div className="h-full bg-brand transition-all" style={{ width: `${progress}%` }} />
      </div>
      {lesson.isExam && (
        <div className="rounded-2xl border-2 border-grape/40 bg-grape/10 px-4 py-3 text-sm font-bold text-grape">
          📝 {t.lesson.examBanner}
        </div>
      )}
      {showCoach && (
        <p
          className="rounded-2xl border-2 border-sky/30 bg-sky/10 px-3 py-2 text-xs font-bold text-sky"
          role="status"
        >
          💡 {t.onboarding.coachFocus}
        </p>
      )}
      <div className="card relative">
        <p className="mb-4 text-sm font-bold text-ink-muted">{lesson.titleUk}</p>
        <div className={feedback === "ok" ? "pointer-events-none opacity-60" : undefined}>
          <ExercisePlayer
            key={ex.id}
            exercise={ex}
            onAnswer={handleAnswer}
            examMode={Boolean(lesson.isExam)}
          />
        </div>
        {feedback === "ok" && (
          <div
            className="ef-celebrate mt-4 space-y-2 rounded-2xl border-2 border-brand bg-brand-soft/50 p-4"
            role="status"
            aria-live="polite"
          >
            <p className="text-lg font-black text-brand-dark">
              ✓ {t.onboarding.resultCorrect}
            </p>
            {feedbackExplain ? (
              <p className="text-sm font-bold text-ink-muted whitespace-pre-wrap">
                {feedbackExplain}
              </p>
            ) : null}
            <p className="text-xs font-bold text-ink-muted">
              {submitting
                ? locale === "en"
                  ? "Submitting…"
                  : "Надсилаємо…"
                : `${t.onboarding.resultContinue}…`}
            </p>
          </div>
        )}
        {feedback === "bad" && (
          <p className="mt-4 font-bold text-red-500" role="status" aria-live="assertive">
            {t.lesson.wrong}
          </p>
        )}
      </div>

      {!focusMode && (
        <>
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
              {noteMsg === "OK" && (
                <span className="text-xs font-bold text-green-600">✓</span>
              )}
            </div>
          </div>

          <div className="card space-y-3">
            <h3 className="font-black">💬 Discussion</h3>
            {comments.length === 0 && (
              <p className="text-sm text-ink-muted font-bold">
                {locale === "en" ? "No comments yet" : "Коментарів ще немає"}
              </p>
            )}
            {comments.map((c) => (
              <div
                key={c.id}
                className="rounded-xl bg-slate-50 p-3 text-sm dark:bg-slate-900"
              >
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
                placeholder={locale === "en" ? "Comment…" : "Коментар…"}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    void postComment();
                  }
                }}
              />
              <button
                type="button"
                className="btn-primary !py-2"
                onClick={() => void postComment()}
              >
                →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
