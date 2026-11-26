"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { type Exercise, usePrompt } from "./shared";

/** Video LMS block — track watch progress (min ratio). */
export function VideoExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const { locale, t } = useLocale();
  const url = String(exercise.videoUrl ?? "");
  const durationSec = Number(exercise.durationSec ?? exercise.videoDurationSec ?? 60);
  const minRatio = Number(exercise.minWatchRatio ?? 0.8);
  const [watched, setWatched] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const tick = window.setInterval(() => {
      setWatched((w) => {
        const n = Math.min(durationSec, w + 1);
        if (n / durationSec >= minRatio) {
          window.clearInterval(tick);
          setDone(true);
        }
        return n;
      });
    }, 1000);
    return () => window.clearInterval(tick);
  }, [durationSec, minRatio, done]);

  const ratio = durationSec ? watched / durationSec : 0;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black">{usePrompt(exercise)}</h2>
      <div className="aspect-video w-full overflow-hidden rounded-2xl border-2 border-slate-200 bg-black dark:border-slate-700">
        {url ? (
          <iframe
            title="lesson-video"
            src={url}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <p className="grid h-full place-items-center text-white font-bold">No video URL</p>
        )}
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full bg-brand transition-all"
          style={{ width: `${Math.min(100, ratio * 100)}%` }}
        />
      </div>
      <p className="text-sm font-bold text-ink-muted">
        {locale === "en" ? "Watch progress" : "Перегляд"}: {Math.round(ratio * 100)}% · ≥
        {Math.round(minRatio * 100)}%
      </p>
      <button
        type="button"
        className="btn-primary"
        disabled={!done && ratio < minRatio}
        onClick={() =>
          onAnswer({
            watchedSec: watched,
            durationSec,
            ratio,
            completed: ratio >= minRatio,
          })
        }
      >
        {done || ratio >= minRatio
          ? t.lesson.continue
          : locale === "en"
            ? "Keep watching…"
            : "Дивіться далі…"}
      </button>
      <button
        type="button"
        className="btn-secondary text-sm"
        onClick={() => {
          setWatched(durationSec);
          setDone(true);
        }}
      >
        {locale === "en" ? "Mark watched (dev)" : "Позначити переглянутим (dev)"}
      </button>
    </div>
  );
}
