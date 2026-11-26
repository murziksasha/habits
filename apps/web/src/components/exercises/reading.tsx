"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { useLocale } from "@/lib/locale-context";
import { stableOptionOrder } from "@/lib/option-order";
import { type Exercise, usePrompt } from "./shared";

export function TypingExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const { locale, t } = useLocale();
  const text = String(exercise.text ?? "");
  const [value, setValue] = useState("");
  const [started, setStarted] = useState<number | null>(null);

  const accuracy = useMemo(() => {
    if (!value.length) return 1;
    let ok = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === text[i]) ok += 1;
    }
    return ok / value.length;
  }, [value, text]);

  const wpm = useMemo(() => {
    if (started === null || value.length < 2) return 0;
    const minutes = (Date.now() - started) / 60000;
    return Math.round(value.length / 5 / Math.max(minutes, 0.01));
  }, [value, started]);

  const done = value.length >= text.length;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black">{usePrompt(exercise)}</h2>
      <p className="text-sm font-semibold text-ink-muted">
        {t.typing.layoutLabel}: {String(exercise.layout ?? "").toUpperCase()}
        {typeof exercise.targetWpm === "number" && exercise.targetWpm > 0
          ? ` · ${t.typing.targetLabel}: ${exercise.targetWpm} ${t.typing.wpm}`
          : null}
      </p>
      <p className="text-sm text-ink-muted">{t.typing.passRule}</p>
      <p className="rounded-2xl bg-slate-100 p-4 font-mono text-lg leading-relaxed tracking-wide">
        {text.split("").map((ch, i) => {
          let color = "text-slate-400";
          if (i < value.length) color = value[i] === ch ? "text-brand-dark" : "text-red-500";
          return (
            <span key={i} className={color}>
              {ch}
            </span>
          );
        })}
      </p>
      <textarea
        className="input min-h-28 font-mono"
        value={value}
        onChange={(e) => {
          if (started === null && e.target.value.length > 0) setStarted(Date.now());
          setValue(e.target.value);
        }}
        placeholder={locale === "en" ? "Start typing…" : "Почніть друкувати…"}
      />
      <div className="flex gap-4 text-sm font-bold">
        <span>
          {t.typing.wpm}: {wpm}
        </span>
        <span>
          {t.typing.accuracy}: {Math.round(accuracy * 100)}%
        </span>
      </div>
      <button
        className="btn-primary"
        disabled={!done}
        onClick={() => onAnswer({ wpm, text: value, completed: true })}
      >
        {t.lesson.check}
      </button>
    </div>
  );
}

export function RsvpExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const { t, locale } = useLocale();
  const text = String(locale === "en" && exercise.textEn ? exercise.textEn : exercise.text ?? "");
  const words = text.split(/\s+/).filter(Boolean);
  const wpm = Number(exercise.wpm ?? 240);
  const [i, setI] = useState(-1);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setI(-1);
    setRunning(false);
  }, [exercise.id, text]);

  useEffect(() => {
    if (!running || i < 0) return;
    if (i >= words.length) {
      setRunning(false);
      return;
    }
    const ms = 60000 / wpm;
    const t = setTimeout(() => setI((x) => x + 1), ms);
    return () => clearTimeout(t);
  }, [running, i, words.length, wpm]);

  const finished = i >= words.length;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black">{usePrompt(exercise)}</h2>
      <div className="grid h-40 place-items-center rounded-3xl bg-slate-900 text-3xl font-black text-white">
        {i < 0 ? "…" : finished ? "✓" : words[i]}
      </div>
      <p className="text-sm font-bold text-ink-muted">
        {t.reading.wpm}: {wpm}
      </p>
      {!running && !finished && (
        <button
          className="btn-sky"
          onClick={() => {
            if (i < 0) setI(0);
            setRunning(true);
          }}
        >
          {i < 0 ? t.reading.startRsvp : t.reading.resumeRsvp}
        </button>
      )}
      {running && (
        <button type="button" className="btn-secondary" onClick={() => setRunning(false)}>
          {t.reading.pauseRsvp}
        </button>
      )}
      {finished && (
        <button type="button" className="btn-secondary" onClick={() => { setI(0); setRunning(true); }}>
          {t.reading.restartRsvp}
        </button>
      )}
      {finished && (
        <button className="btn-primary" onClick={() => onAnswer({ completed: true })}>
          {t.lesson.continue}
        </button>
      )}
    </div>
  );
}

export function ComprehensionExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const { locale, t } = useLocale();
  const questions = (exercise.questions as { q: string; qEn?: string; options: string[]; optionsEn?: string[] }[]) ?? [];
  const optionOrders = useMemo(
    () => questions.map((q, qi) => stableOptionOrder(`${String(exercise.id)}:${qi}`, q.options.length)),
    [exercise.id, questions],
  );
  const [answers, setAnswers] = useState<(number | null)[]>(questions.map(() => null));
  const [showQs, setShowQs] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black">{usePrompt(exercise)}</h2>
      <div className="rounded-2xl bg-slate-100 p-4 leading-relaxed">
        {String(locale === "en" && exercise.passageEn ? exercise.passageEn : exercise.passage)}
      </div>
      {!showQs ? (
        <button className="btn-primary" onClick={() => setShowQs(true)}>
          {locale === "en" ? "To questions" : "До питань"}
        </button>
      ) : (
        <>
          {questions.map((q, qi) => (
            <div key={qi} className="space-y-2">
              <p className="font-bold">{locale === "en" && q.qEn ? q.qEn : q.q}</p>
              {(optionOrders[qi] ?? []).map((original) => (
                <button
                  key={original}
                  type="button"
                  className={clsx(
                    "block w-full rounded-xl border-2 px-3 py-2 text-left font-semibold",
                    answers[qi] === original ? "border-sky bg-sky/10" : "border-slate-200",
                  )}
                  onClick={() =>
                    setAnswers((a) => a.map((v, i) => (i === qi ? original : v)))
                  }
                >
                  {(locale === "en" && q.optionsEn?.length === q.options.length ? q.optionsEn : q.options)[original]}
                </button>
              ))}
            </div>
          ))}
          <button
            className="btn-primary"
            disabled={answers.some((a) => a === null)}
            onClick={() => onAnswer(answers)}
          >
            {t.lesson.check}
          </button>
        </>
      )}
    </div>
  );
}
