"use client";

import { useContext, useState } from "react";
import { countWords, gradeExplanation, type ExplainKeyIdea } from "@eduforge/shared";
import clsx from "clsx";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { type Exercise, ExamModeCtx, LessonIdCtx, usePrompt, useExerciseHint, useSoftAttempts } from "./shared";

/**
 * Explain in your own words (self-explanation). Client soft-grades with the shared rubric;
 * optional tutor feedback via POST /deep/explain-feedback.
 */
export function ExplainExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const { locale, t } = useLocale();
  const en = locale === "en";
  const { token } = useAuth();
  const lessonId = useContext(LessonIdCtx);
  const examMode = useContext(ExamModeCtx);
  const hint = useExerciseHint(exercise);
  const soft = useSoftAttempts(hint.setOpen);
  const [text, setText] = useState("");
  const [missing, setMissing] = useState<string[]>([]);
  const [tutor, setTutor] = useState<string | null>(null);
  const [tutorBusy, setTutorBusy] = useState(false);
  const ideas = (exercise.keyIdeas as ExplainKeyIdea[]) ?? [];
  const minWords = Number(exercise.minWords ?? 12);
  const words = countWords(text);
  const sample = String((en ? exercise.sampleAnswerEn || exercise.sampleAnswerUk : exercise.sampleAnswerUk) ?? "");

  function check() {
    const g = gradeExplanation(text, {
      keyIdeas: ideas,
      minWords,
      passRatio: exercise.passRatio as number | undefined,
    });
    if (!g.correct) {
      const labels = ideas
        .filter((i) => g.missing.includes(i.labelEn || i.labelUk))
        .map((i) => (en ? i.labelEn || i.labelUk : i.labelUk));
      setMissing(labels);
      soft.registerFail(
        g.tooShort
          ? en
            ? `At least ${minWords} words (now ${g.words}).`
            : `Щонайменше ${minWords} слів (зараз ${g.words}).`
          : null,
      );
      return;
    }
    soft.markOk();
    onAnswer({ text });
  }

  async function askTutor() {
    if (!lessonId || !text.trim()) return;
    setTutorBusy(true);
    try {
      const r = await api<{ feedback: string }>("/deep/explain-feedback", {
        method: "POST",
        token,
        body: { lessonId, exerciseId: exercise.id, text, locale },
      });
      setTutor(r.feedback);
    } catch {
      setTutor(en ? "Tutor is unavailable right now." : "Репетитор зараз недоступний.");
    } finally {
      setTutorBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-xs font-black uppercase tracking-wide text-grape">
        ✍️ {en ? "Explain in your own words" : "Поясніть своїми словами"}
      </p>
      <h2 className="text-xl font-black">{usePrompt(exercise)}</h2>
      <textarea
        className="min-h-[140px] w-full rounded-2xl border-2 border-slate-200 p-3 font-bold dark:border-slate-700 dark:bg-slate-900"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          soft.resetSoft();
        }}
        aria-label={en ? "Your explanation" : "Ваше пояснення"}
        placeholder={en ? "Explain as if to a friend…" : "Поясніть так, ніби другу…"}
      />
      <p className={clsx("text-xs font-bold", words >= minWords ? "text-green-600" : "text-ink-muted")}>
        {words}/{minWords} {en ? "words" : "слів"}
      </p>
      {soft.wrong && (
        <div className="rounded-2xl border-2 border-orange-300 bg-orange-50 p-3 text-sm font-bold dark:bg-orange-950/30">
          {soft.detail ? <p>{soft.detail}</p> : null}
          {missing.length > 0 && (
            <p>
              {en ? "Think about: " : "Подумайте про: "}
              {missing.join(", ")}
            </p>
          )}
        </div>
      )}
      {tutor && (
        <p className="whitespace-pre-wrap rounded-2xl bg-sky/10 p-3 text-sm font-bold">🎓 {tutor}</p>
      )}
      <div className="flex flex-wrap gap-2">
        <button className="btn-primary" disabled={!text.trim()} onClick={check}>
          {t.lesson.check}
        </button>
        {lessonId && !examMode && (
          <button
            type="button"
            className="btn-secondary"
            disabled={!text.trim() || tutorBusy}
            onClick={() => void askTutor()}
          >
            🎓 {en ? "Tutor feedback" : "Відгук репетитора"}
          </button>
        )}
        {soft.canSkip && sample && (
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setText(sample);
              setMissing([]);
            }}
          >
            {en ? "Show sample answer" : "Показати приклад відповіді"}
          </button>
        )}
      </div>
      {hint.panel}
    </div>
  );
}
