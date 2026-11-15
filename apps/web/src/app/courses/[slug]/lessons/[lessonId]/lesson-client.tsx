"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  exerciseExplanation,
  exerciseTypeLabel,

  LESSON_MATE_RESULT_MS,
  LESSON_RESULT_SHEET_MS,
  getEvidenceLevelLabels,
  pickLocale,
  type MasteryEvidenceLevel,
  type GrantedRewardItem,
  type LocalLabManifest,
} from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api, isNetworkOrOfflineError } from "@/lib/api";
import { ExercisePlayer, type Exercise } from "@/components/exercises";
import { ConfidencePicker, isConfidenceRateable } from "@/components/confidence-picker";
import type { ConfidenceLevel } from "@eduforge/shared";

/** Answer + learning signals (SPEC 92: wrong soft attempts, confidence). */
type LessonAnswer = {
  exerciseId: string;
  answer: unknown;
  wrongAttempts?: number;
  confidence?: ConfidenceLevel | null;
  hintsUsed?: number;
  solutionRevealed?: boolean;
};
import { HeartsBar } from "@/components/hearts";
import { Celebration } from "@/components/celebration";
import { ShareLinkButtons } from "@/components/share-link";
import { Breadcrumbs, Skeleton, useToast } from "@/components/ui";
import { isBrowserOffline } from "@/components/online-status";
import { LessonShortcutsHelp } from "@/components/lesson-shortcuts-help";
import { LocalLabPanel } from "@/components/local-lab-panel";
import { recordGuestLessonProgress } from "@/lib/guest-progress";
import { isTypingTarget } from "@/lib/answer-keys";

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

function getDraftKey(userId: string | undefined, slug: string, lessonId: string, exId: string) {
  return `draft:${userId || "guest"}:${slug}:${lessonId}:${exId}:1`;
}

type AssistanceMark = {
  wrongAttempts: number;
  hintsUsed: number;
  solutionRevealed: boolean;
};

function assistanceKey(userId: string | undefined, slug: string, lessonId: string, exId: string) {
  return `assist:${userId || "guest"}:${slug}:${lessonId}:${exId}:1`;
}

function readAssistance(
  userId: string | undefined,
  slug: string,
  lessonId: string,
  exId: string,
): AssistanceMark {
  const empty: AssistanceMark = { wrongAttempts: 0, hintsUsed: 0, solutionRevealed: false };
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(assistanceKey(userId, slug, lessonId, exId));
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<AssistanceMark>;
    return {
      wrongAttempts: Math.max(0, Math.floor(Number(parsed.wrongAttempts) || 0)),
      hintsUsed: Math.max(0, Math.floor(Number(parsed.hintsUsed) || 0)),
      solutionRevealed: Boolean(parsed.solutionRevealed),
    };
  } catch {
    return empty;
  }
}

function writeAssistance(
  userId: string | undefined,
  slug: string,
  lessonId: string,
  exId: string,
  mark: AssistanceMark,
) {
  try {
    localStorage.setItem(assistanceKey(userId, slug, lessonId, exId), JSON.stringify(mark));
  } catch {
    /* private mode */
  }
}

function clearAssistance(userId: string | undefined, slug: string, lessonId: string, exId: string) {
  try {
    localStorage.removeItem(assistanceKey(userId, slug, lessonId, exId));
  } catch {
    /* private mode */
  }
}

export function LessonClient() {
  const { slug, lessonId } = useParams<{ slug: string; lessonId: string }>();
  const { token, user, loading, setCharacter } = useAuth();
  const { t, locale } = useLocale();
  const router = useRouter();
  const [lesson, setLesson] = useState<{
    id: string;
    titleUk: string;
    titleEn?: string | null;
    exercises: Exercise[];
    isExam?: boolean;
    passThreshold?: number | null;
  } | null>(null);
  const [localLab, setLocalLab] = useState<LocalLabManifest | null>(null);
  const [hearts, setHearts] = useState(5);
  const [maxHearts, setMaxHearts] = useState(5);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<LessonAnswer[]>([]);
  const [confidence, setConfidence] = useState<ConfidenceLevel | null>(null);
  const [isMateHold, setIsMateHold] = useState(false);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingNextAnswersRef = useRef<LessonAnswer[] | null>(null);
  const advanceNextRef = useRef<() => void>(() => {});

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) {
        clearTimeout(advanceTimerRef.current);
      }
    };
  }, []);
  const wrongAttemptsRef = useRef(0);
  const hintsRef = useRef(0);
  const solutionRef = useRef(false);

  useEffect(() => {
    const exercise = lesson?.exercises[idx];
    if (!exercise || !slug || !lessonId) return;
    const mark = readAssistance(user?.id, slug, lessonId, exercise.id);
    wrongAttemptsRef.current = mark.wrongAttempts;
    hintsRef.current = mark.hintsUsed;
    solutionRef.current = mark.solutionRevealed;
  }, [idx, lesson, lessonId, slug, user?.id]);
  const [feedback, setFeedback] = useState<"ok" | "bad" | null>(null);
  const [feedbackExplain, setFeedbackExplain] = useState("");
  const [showCoach, setShowCoach] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState<
    LessonAnswer[] | null
  >(null);
  const [keysHelp, setKeysHelp] = useState(false);
  const [summary, setSummary] = useState<{
    xpGain: number;
    accuracy: number;
    courseLevel: number;
    courseLevelBefore?: number;
    courseLevelAfter?: number;
    courseLevelUp?: boolean;
    levelUp: boolean;
    characterXpGain?: number;
    characterLevelBefore?: number | null;
    characterLevelAfter?: number | null;
    characterLevelUp?: boolean;
    dailyCapReached?: boolean;
    grantedRewards?: GrantedRewardItem[];
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
    evidenceLevel?: MasteryEvidenceLevel;
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
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportNote, setReportNote] = useState("");
  const [reportSent, setReportSent] = useState(false);
  const [reportBusy, setReportBusy] = useState(false);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  // Default focus on mobile; desktop starts full (notes/comments available)
  const [focusMode, setFocusMode] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : true,
  );
  const [submitting, setSubmitting] = useState(false);
  const idempotencyKeyRef = useRef(newIdempotencyKey());
  const initialExercisesSigRef = useRef<string | null>(null);
  const [structureChanged, setStructureChanged] = useState(false);
  const [judgeUnavailable, setJudgeUnavailable] = useState<string | null>(null);
  const { toast } = useToast();

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
      if (isTypingTarget(e.target)) return;

      if (e.key === "Enter" && feedback === "ok" && !submitting) {
        if (!e.metaKey && !e.ctrlKey && !e.altKey) {
          e.preventDefault();
          advanceNextRef.current();
          return;
        }
      }

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
  }, [answers.length, idx, router, slug, summary, keysHelp, t.lesson?.exit, feedback, submitting]);

  useEffect(() => {
    if (loading) return;
    void api<{
      lesson: {
        id: string;
        titleUk: string;
        exercises: Exercise[];
        isExam?: boolean;
        passThreshold?: number | null;
      };
      localLab?: LocalLabManifest | null;
      hearts?: number;
      maxHearts?: number;
    }>(`/courses/${slug}/lessons/${lessonId}`, token ? { token } : {})
      .then((d) => {
        const sig = d.lesson.exercises.map((e) => e.id).join(",");
        if (initialExercisesSigRef.current && initialExercisesSigRef.current !== sig) {
          setStructureChanged(true);
        } else {
          initialExercisesSigRef.current = sig;
          setLesson(d.lesson);
        }
        setLocalLab(d.localLab ?? null);
        if (typeof d.hearts === "number") setHearts(d.hearts);
        if (typeof d.maxHearts === "number") setMaxHearts(d.maxHearts);
      })
      .catch((e: Error & { status?: number; data?: { error?: string } }) => {
        if (e.status === 403 && e.data?.error === "exam_locked") {
          setError("exam_locked");
        } else setError("load_failed");
      });

    if (token) {
      void api<{ bookmarked: boolean }>(`/bookmarks/check/${lessonId}`, { token })
        .then((d) => setBookmarked(d.bookmarked))
        .catch(() => undefined);
      void api<{ note: { body: string } | null }>(`/notes/lesson/${lessonId}`, { token })
        .then((d) => setNoteBody(d.note?.body ?? ""))
        .catch(() => undefined);
      void api<{ comments: typeof comments }>(`/comments/lesson/${lessonId}`, { token })
        .then((d) => setComments(d.comments))
        .catch(() => setComments([]));
    }
  }, [loading, token, slug, lessonId]);

  function reloadLessonStructure() {
    setStructureChanged(false);
    void api<{
      lesson: {
        id: string;
        titleUk: string;
        exercises: Exercise[];
        isExam?: boolean;
        passThreshold?: number | null;
      };
    }>(`/courses/${slug}/lessons/${lessonId}`, token ? { token } : {}).then((d) => {
      initialExercisesSigRef.current = d.lesson.exercises.map((e) => e.id).join(",");
      setLesson(d.lesson);
      setAnswers((prev) => prev.filter((a) => d.lesson.exercises.some((e) => e.id === a.exerciseId)));
      setIdx((curr) => Math.min(curr, Math.max(0, d.lesson.exercises.length - 1)));
    });
  }

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

  function advanceNext() {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
    if (!lesson) return;
    if (idx < lesson.exercises.length - 1) {
      setFeedback(null);
      setFeedbackExplain("");
      setIsMateHold(false);
      setIdx((i) => i + 1);
    } else if (pendingNextAnswersRef.current) {
      setIsMateHold(false);
      void submitLessonAnswers(pendingNextAnswersRef.current);
    }
  }
  advanceNextRef.current = advanceNext;

  async function handleAnswer(answer: unknown) {
    if (!lesson || submitting || feedback === "ok") return;
    const ex = lesson.exercises[idx];
    const nextAnswers: LessonAnswer[] = [
      ...answers.filter((a) => a.exerciseId !== ex.id),
      {
        exerciseId: ex.id,
        answer,
        wrongAttempts: wrongAttemptsRef.current,
        hintsUsed: hintsRef.current,
        solutionRevealed: solutionRef.current,
        confidence,
      },
    ];
    wrongAttemptsRef.current = 0;
    hintsRef.current = 0;
    solutionRef.current = false;
    setConfidence(null);
    setAnswers(nextAnswers);
    pendingNextAnswersRef.current = nextAnswers;
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(getDraftKey(user?.id, slug, lessonId, ex.id), JSON.stringify(answer));
      } catch {}
    }
    const explain = exerciseExplanation(
      ex as Record<string, unknown>,
      locale === "en" ? "en" : "uk",
    );

    const isMateOrStalemate =
      typeof answer === "object" &&
      answer !== null &&
      (Boolean((answer as { mate?: boolean }).mate) ||
        Boolean((answer as { stalemate?: boolean }).stalemate));

    if (isMateOrStalemate) {
      setIsMateHold(true);
    }

    setFeedback("ok");
    setFeedbackExplain(explain);
    const delay = explain
      ? 6000
      : isMateOrStalemate
        ? LESSON_MATE_RESULT_MS
        : LESSON_RESULT_SHEET_MS;
    advanceTimerRef.current = setTimeout(() => {
      advanceNext();
    }, delay);
  }

  async function submitLessonAnswers(
    nextAnswers: LessonAnswer[],
  ) {
    if (!lessonId) return;
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
        guest?: boolean;
        xpGain: number;
        accuracy: number;
        courseLevel?: number;
        courseLevelBefore?: number;
        courseLevelAfter?: number;
        courseLevelUp?: boolean;
        levelUp?: boolean;
        characterXpGain?: number;
        characterLevelBefore?: number | null;
        characterLevelAfter?: number | null;
        characterLevelUp?: boolean;
        dailyCapReached?: boolean;
        grantedRewards?: GrantedRewardItem[];
        character?: Parameters<typeof setCharacter>[0];
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
        evidenceLevel?: MasteryEvidenceLevel;
        certificate?: { code: string; titleUk: string } | null;
        nextLesson?: {
          id: string;
          titleUk: string;
          titleEn?: string | null;
          href: string;
        } | null;
      } & { character?: { progression?: { skillPoints?: number } } }>(`/courses/${slug}/lessons/${lessonId}/submit`, {
        method: "POST",
        ...(token ? { token } : {}),
        body: {
          answers: nextAnswers,
          ...(token ? { idempotencyKey: idempotencyKeyRef.current } : {}),
        },
      });

      if (result.passed && !user) {
        recordGuestLessonProgress(slug, lessonId);
      }
      if (typeof window !== "undefined" && lesson) {
        for (const exercise of lesson.exercises) {
          try {
            localStorage.removeItem(getDraftKey(user?.id, slug, lessonId, exercise.id));
            clearAssistance(user?.id, slug, lessonId, exercise.id);
          } catch {}
        }
      }
      if (result.character) setCharacter(result.character);
      if (typeof result.hearts === "number") setHearts(result.hearts);
      setSummary({
        xpGain: result.xpGain ?? 0,
        accuracy: result.accuracy,
        courseLevel: result.courseLevel ?? 1,
        courseLevelBefore: result.courseLevelBefore,
        courseLevelAfter: result.courseLevelAfter,
        courseLevelUp: Boolean(result.courseLevelUp ?? result.levelUp),
        levelUp: Boolean(result.levelUp),
        characterXpGain: result.characterXpGain,
        characterLevelBefore: result.characterLevelBefore ?? null,
        characterLevelAfter: result.characterLevelAfter ?? null,
        characterLevelUp: Boolean(result.characterLevelUp),
        dailyCapReached: Boolean(result.dailyCapReached),
        grantedRewards: Array.isArray(result.grantedRewards) ? result.grantedRewards : [],
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
        evidenceLevel: result.evidenceLevel,
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
      const err = e as Error & { data?: { error?: string; exerciseId?: string }; offline?: boolean };
      if (err.data?.error === "judge_unavailable") {
        setJudgeUnavailable(err.data.exerciseId ?? "judge");
        setPendingSubmit(nextAnswers);
        setFeedback(null);
        setFeedbackExplain("");
        toast(t.lesson.judgeUnavailable, "error");
        return;
      }
      if (isNetworkOrOfflineError(e) || err.data?.error === "offline") {
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

  async function submitReport(exerciseId: string) {
    if (!token) return;
    setReportBusy(true);
    try {
      await api("/feedback", {
        method: "POST",
        token,
        body: {
          category: "content",
          pagePath: typeof window !== "undefined" ? window.location.pathname : "",
          message: `[Exercise Ambiguity: ${exerciseId}] ${reportNote.trim() || "Reported ambiguity"}`,
        },
      });
      setReportSent(true);
      setTimeout(() => {
        setReportModalOpen(false);
        setReportSent(false);
        setReportNote("");
      }, 1500);
    } catch {
      /* ignore */
    } finally {
      setReportBusy(false);
    }
  }

  function handleResetDraft(exerciseId: string) {
    localStorage.removeItem(getDraftKey(user?.id, slug, lessonId, exerciseId));
    clearAssistance(user?.id, slug, lessonId, exerciseId);
    setConfirmResetOpen(false);
    window.location.reload();
  }

  if (error === "exam_locked") {
    return (
      <div className="card mx-auto max-w-lg text-center space-y-4">
        <h1 className="text-2xl font-black">📝 {t.lesson.exam}</h1>
        <p className="text-ink-muted font-bold">{t.lesson.examLocked}</p>
        <Link href={`/courses/${slug}`} className="btn-primary">
          {t.common.back}
        </Link>
      </div>
    );
  }

  if (judgeUnavailable && pendingSubmit && !summary) {
    return (
      <div className="card mx-auto max-w-lg space-y-4 text-center">
        <p className="font-bold text-amber-500 text-lg">
          ⚠️ {t.lesson.judgeUnavailable}
        </p>
        <p className="text-sm text-ink-muted">
          {t.lesson.judgeUnavailableHint}
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
          <button
            type="button"
            className="btn-primary min-h-11"
            disabled={submitting}
            onClick={() => {
              setJudgeUnavailable(null);
              void submitLessonAnswers(pendingSubmit);
            }}
          >
            🔄 {t.lesson.retryBehaviorCheck}
          </button>
          <button
            type="button"
            className="btn-secondary min-h-11"
            disabled={submitting}
            onClick={() => {
              setJudgeUnavailable(null);
              const switched = pendingSubmit.map((a) => {
                if (typeof a.answer === "object" && a.answer !== null) {
                  return { ...a, answer: { ...(a.answer as Record<string, unknown>), mode: "text" } };
                }
                return { ...a, answer: { source: String(a.answer ?? ""), mode: "text" } };
              });
              void submitLessonAnswers(switched);
            }}
          >
            📝 {t.lesson.switchToTextCheck}
          </button>
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
          {t.common.back}
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
            {t.common.back}
          </Link>
        </div>
      );
    }
    return (
      <div className="mx-auto max-w-2xl space-y-4" aria-busy="true">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-64 w-full" />
        <p className="sr-only">{t.common.loading}</p>
      </div>
    );
  }

  if (summary) {
    const examFail = summary.examFailed || (summary.isExam && summary.passed === false);
    const wrong = (summary.results ?? []).filter((r) => !r.correct);
    const sharePath = summary.certificate?.code
      ? `/certificates/${summary.certificate.code}`
      : `/courses/${slug}`;
    const courseLeveled = Boolean(summary.courseLevelUp ?? summary.levelUp);
    const charLeveled = Boolean(summary.characterLevelUp);
    const anyLevelUp = courseLeveled || charLeveled;
    const levelDetailParts: string[] = [];
    if (courseLeveled) {
      levelDetailParts.push(
        `${t.lesson.courseLevelLabel} ${summary.courseLevelAfter ?? summary.courseLevel}`,
      );
    }
    if (charLeveled && summary.characterLevelAfter != null) {
      levelDetailParts.push(
        `${t.lesson.characterLevelLabel} ${summary.characterLevelAfter}`,
      );
    }
    const levelDetail = levelDetailParts.length ? levelDetailParts.join(" · ") : undefined;
    const rewards = summary.grantedRewards ?? [];

    return (
      <div className="card mx-auto max-w-lg space-y-4 text-center">
        <Celebration
          kind={
            summary.certificate
              ? "cert"
              : anyLevelUp
                ? "level"
                : summary.streakProtected
                  ? "streak"
                  : "complete"
          }
          detail={levelDetail}
          show={!examFail}
        />
        <h1 className="text-3xl font-black">
          {examFail
            ? t.lesson.examFailed
            : summary.isExam
              ? t.lesson.examPassed
              : t.lesson.completed}
        </h1>
        {!examFail && (
          user ? (
            <div className="space-y-1" role="status" aria-live="polite">
              <p className="text-lg font-bold text-brand-dark">
                +{summary.xpGain} {t.lesson.xpGained}{" "}
                <span className="text-xs font-bold text-ink-muted">
                  ({t.lesson.courseXpGained})
                </span>
              </p>
              {typeof summary.characterXpGain === "number" && (
                <p className="text-sm font-bold text-sky">
                  +{summary.characterXpGain} {t.lesson.characterXpGained}
                  {summary.dailyCapReached ? (
                    <span className="ml-1.5 text-xs text-ink-muted">
                      · {t.lesson.dailyCapReached}
                    </span>
                  ) : null}
                </p>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-brand/30 bg-brand-soft/30 p-3 text-sm space-y-2">
              <p className="font-bold text-ink">
                💡 {t.onboarding.guestSaveProgressPrompt}
              </p>
              <div className="flex justify-center gap-2">
                <Link
                  href={`/login?next=${encodeURIComponent(`/courses/${slug}`)}`}
                  className="btn-secondary !py-1.5 !px-3 text-xs"
                >
                  {t.onboarding.guestSignIn}
                </Link>
                <Link
                  href={`/register?next=${encodeURIComponent(`/courses/${slug}`)}`}
                  className="btn-primary !py-1.5 !px-3 text-xs"
                >
                  {t.onboarding.guestRegister}
                </Link>
              </div>
            </div>
          )
        )}
        <p>
          {locale === "en" ? "Accuracy" : "Точність"}: {Math.round(summary.accuracy * 100)}%
          {summary.correctCount != null && summary.total != null
            ? ` · ${summary.correctCount}/${summary.total}`
            : ""}
          {summary.isExam && summary.passThreshold != null
            ? ` · ≥${Math.round(summary.passThreshold * 100)}%`
            : ""}
        </p>
        {summary.evidenceLevel && summary.evidenceLevel !== "insufficient_data" ? (
          <div className="flex justify-center">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                summary.evidenceLevel === "retained_verified"
                  ? "border border-emerald-300 bg-emerald-100 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                  : summary.evidenceLevel === "self_verified"
                    ? "border border-sky/30 bg-sky/15 text-sky-dark dark:bg-sky/20 dark:text-sky-light"
                    : "bg-slate-100 text-ink-muted dark:bg-slate-800"
              }`}
            >
              <span>{summary.evidenceLevel === "retained_verified" ? "🛡️" : summary.evidenceLevel === "self_verified" ? "✨" : "💬"}</span>
              <span>
                {locale === "en"
                  ? getEvidenceLevelLabels(summary.evidenceLevel).labelEn
                  : getEvidenceLevelLabels(summary.evidenceLevel).labelUk}
              </span>
            </span>
          </div>
        ) : null}
        {user ? (
          <div className="grid gap-2 text-left sm:grid-cols-2">
            <div
              className={`rounded-2xl border p-3 text-sm ${
                courseLeveled
                  ? "border-brand/50 bg-brand-soft/40"
                  : "border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
              }`}
            >
              <p className="text-xs font-bold text-ink-muted">{t.lesson.courseLevelLabel}</p>
              <p className="font-black">
                {courseLeveled && summary.courseLevelBefore != null
                  ? `${summary.courseLevelBefore} → ${summary.courseLevelAfter ?? summary.courseLevel} 🎉`
                  : summary.courseLevel}
              </p>
            </div>
            {summary.characterLevelAfter != null ? (
              <div
                className={`rounded-2xl border p-3 text-sm ${
                  charLeveled
                    ? "border-grape/50 bg-grape/10"
                    : "border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
                }`}
              >
                <p className="text-xs font-bold text-ink-muted">{t.lesson.characterLevelLabel}</p>
                <p className="font-black">
                  {charLeveled && summary.characterLevelBefore != null
                    ? `${summary.characterLevelBefore} → ${summary.characterLevelAfter} ⭐`
                    : summary.characterLevelAfter}
                </p>
              </div>
            ) : null}
          </div>
        ) : null}
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
                const isEnv = Boolean(r.meta?.category === "environment_error" || r.meta?.isEnvironmentIssue);
                return (
                  <li key={r.exerciseId || i} className="flex flex-wrap items-center gap-2">
                    <span className={isEnv ? "text-amber-500" : "text-red-500"}>{isEnv ? "⚠️" : "✗"}</span>
                    <span>{human}</span>
                    {isEnv ? (
                      <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                        {locale === "en" ? "Runtime issue (penalty waived)" : "Збій середовища (штраф скасовано)"}
                      </span>
                    ) : missing ? (
                      <span className="text-xs text-ink-muted">· {missing}</span>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {user ? (
          <div className="flex justify-center">
            <HeartsBar hearts={summary.hearts} max={maxHearts} />
          </div>
        ) : null}
        {summary.heartLost && (
          <p className="text-sm font-bold text-red-500">{t.hearts.lost}</p>
        )}
        {anyLevelUp && (
          <p className="text-xl font-black text-grape">
            {courseLeveled && charLeveled
              ? t.lesson.bothLevelUp
              : charLeveled
                ? `${t.lesson.characterLevelLabel} ${summary.characterLevelAfter}!`
                : t.lesson.levelUp}
          </p>
        )}
        {rewards.length > 0 && (
          <div className="rounded-2xl border border-sun/30 bg-sun/10 p-3 text-left space-y-2">
            <p className="text-xs font-black uppercase text-ink-muted">
              {t.lesson.rewardsGranted}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {rewards.map((rw, i) => (
                <span
                  key={`${rw.kind}-${rw.key ?? i}`}
                  className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-black shadow-sm dark:bg-slate-900"
                >
                  <span aria-hidden>{rw.icon}</span>
                  <span>{locale === "en" ? rw.labelEn : rw.labelUk}</span>
                </span>
              ))}
            </div>
          </div>
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
          {(summary.skillPoints ?? 0) > 0 || anyLevelUp ? (
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

  const isCodeEx =
    typeof ex.type === "string" &&
    (ex.type.startsWith("code_") || ex.type === "code_judge");
  const nearEnd =
    lesson.exercises.length > 2 && idx >= lesson.exercises.length - 2;

  return (
    <div
      className={`mx-auto ${isCodeEx ? "max-w-3xl lesson-code-mobile" : "max-w-2xl"} space-y-4`}
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
          ← {t.lesson.exit}
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
          {user ? (
            <>
              <button
                type="button"
                className="touch-target text-sm font-bold"
                onClick={() => void toggleBookmark()}
                title="Bookmark"
              >
                {bookmarked ? "⭐" : "☆"}
              </button>
              <HeartsBar hearts={hearts} max={maxHearts} compact />
            </>
          ) : null}
          <button
            type="button"
            className="touch-target rounded-xl border border-slate-200 px-2 py-1 text-xs font-bold text-ink-muted hover:text-ink dark:border-slate-800"
            onClick={() => setConfirmResetOpen(true)}
            title={locale === "en" ? "Reset draft" : "Скинути чернетку"}
          >
            ↺
          </button>
          <button
            type="button"
            className="touch-target rounded-xl border border-slate-200 px-2 py-1 text-xs font-bold text-ink-muted hover:text-ink dark:border-slate-800"
            onClick={() => setReportModalOpen(true)}
            title={locale === "en" ? "Report ambiguity" : "Повідомити про неточність"}
          >
            🚩
          </button>
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
      {structureChanged && (
        <div className="card border-2 border-sky-400 bg-sky-50 dark:bg-sky-950/30 p-3 space-y-2">
          <p className="text-xs font-bold text-sky-800 dark:text-sky-200">
            ℹ️ {t.lesson.lessonStructureChanged}
          </p>
          <button
            type="button"
            className="btn-primary !py-1 !text-xs"
            onClick={reloadLessonStructure}
          >
            🔄 {t.lesson.reloadLesson}
          </button>
        </div>
      )}
      <div className="card relative">
        <p className="mb-4 text-sm font-bold text-ink-muted">
          {pickLocale(locale, lesson.titleUk, lesson.titleEn)}
        </p>
        <div className={feedback === "ok" ? (isMateHold ? "pointer-events-none" : "pointer-events-none opacity-60") : undefined}>
          {isConfidenceRateable(ex.type) && (
            <div className="mb-3">
              <ConfidencePicker value={confidence} onChange={setConfidence} />
            </div>
          )}
          <ExercisePlayer
            key={ex.id}
            exercise={ex}
            onAnswer={handleAnswer}
            examMode={Boolean(lesson.isExam)}
            onWrongAttempt={() => {
              wrongAttemptsRef.current += 1;
              writeAssistance(user?.id, slug, lessonId, ex.id, {
                wrongAttempts: wrongAttemptsRef.current,
                hintsUsed: hintsRef.current,
                solutionRevealed: solutionRef.current,
              });
            }}
            onHintUsed={() => {
              hintsRef.current += 1;
              writeAssistance(user?.id, slug, lessonId, ex.id, {
                wrongAttempts: wrongAttemptsRef.current,
                hintsUsed: hintsRef.current,
                solutionRevealed: solutionRef.current,
              });
            }}
            onSolutionRevealed={() => {
              solutionRef.current = true;
              writeAssistance(user?.id, slug, lessonId, ex.id, {
                wrongAttempts: wrongAttemptsRef.current,
                hintsUsed: hintsRef.current,
                solutionRevealed: true,
              });
            }}
            lessonId={lessonId}
          />
        </div>
        {feedback === "ok" && (
          <div
            className="ef-celebrate mt-4 space-y-3 rounded-2xl border-2 border-brand bg-brand-soft/50 p-4"
            role="status"
            aria-live="polite"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-lg font-black text-brand-dark">
                ✓ {t.onboarding.resultCorrect}
              </p>
              <button
                type="button"
                className="btn-primary !py-2 !px-4 text-sm font-black shadow-sm"
                onClick={advanceNext}
              >
                {t.lesson.continue} →
              </button>
            </div>
            {feedbackExplain ? (
              <div className="rounded-xl bg-white/70 p-3 text-sm font-bold text-ink-muted whitespace-pre-wrap dark:bg-slate-900/60">
                {feedbackExplain}
              </div>
            ) : null}
            <p className="text-xs font-bold text-ink-muted">
              {submitting
                ? locale === "en"
                  ? "Submitting…"
                  : "Надсилаємо…"
                : `${t.lesson.pressEnterToContinue || (locale === "en" ? "Press Enter or Continue" : "Натисніть Enter або Далі для переходу")} (↵)`}
            </p>
          </div>
        )}
        {feedback === "bad" && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-bold text-red-600 dark:border-red-900 dark:bg-red-950/40" role="status" aria-live="assertive">
            <p>{t.lesson.wrong}</p>
            <p className="mt-1 text-xs text-red-500/80">📌 {t.lesson.addedToMistakes}</p>
          </div>
        )}
      </div>

      {localLab && !lesson.isExam ? <LocalLabPanel lab={localLab} /> : null}

      {!focusMode && user && (
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
                {t.common.save}
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

      {confirmResetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="card w-full max-w-sm space-y-4">
            <h3 className="text-lg font-black">
              {locale === "en" ? "Reset current draft?" : "Скинути чернетку?"}
            </h3>
            <p className="text-xs text-ink-muted">
              {locale === "en"
                ? "This will clear your saved draft answer for this exercise."
                : "Це очистить збережену відповідь для цієї вправи."}
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="btn-secondary !py-1.5 text-xs"
                onClick={() => setConfirmResetOpen(false)}
              >
                {locale === "en" ? "Cancel" : "Скасувати"}
              </button>
              <button
                type="button"
                className="btn-primary !py-1.5 text-xs !bg-red-600 hover:!bg-red-700"
                onClick={() => handleResetDraft(ex.id)}
              >
                {locale === "en" ? "Reset" : "Скинути"}
              </button>
            </div>
          </div>
        </div>
      )}

      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="card w-full max-w-md space-y-3">
            <h3 className="text-lg font-black">
              🚩 {locale === "en" ? "Report ambiguity in exercise" : "Повідомити про неточність у завданні"}
            </h3>
            <p className="text-xs font-mono text-ink-muted">
              ID: {ex?.id}
            </p>
            {reportSent ? (
              <p className="text-sm font-bold text-green-600">
                ✓ {locale === "en" ? "Thank you! Your report has been submitted." : "Дякуємо! Ваше повідомлення надіслано авторам."}
              </p>
            ) : (
              <>
                <textarea
                  className="input min-h-[96px] text-sm"
                  placeholder={
                    locale === "en"
                      ? "Describe what is unclear or incorrect in the formulation or test checks..."
                      : "Опишіть, що саме є незрозумілим або некоректним в умові чи перевірці..."
                  }
                  value={reportNote}
                  onChange={(e) => setReportNote(e.target.value)}
                />
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    className="btn-secondary !py-1.5 text-xs"
                    disabled={reportBusy}
                    onClick={() => setReportModalOpen(false)}
                  >
                    {locale === "en" ? "Cancel" : "Скасувати"}
                  </button>
                  <button
                    type="button"
                    className="btn-primary !py-1.5 text-xs"
                    disabled={reportBusy || !reportNote.trim()}
                    onClick={() => void submitReport(ex.id)}
                  >
                    {reportBusy ? "…" : locale === "en" ? "Send report" : "Надіслати"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
