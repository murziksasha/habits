"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  WEEKLY_TARGET_MAX,
  WEEKLY_TARGET_MIN,
  WEEKLY_TARGET_PRESETS,
  type LearningGoalState,
  type UpdateLearningGoalResponse,
} from "@eduforge/shared";
import { api } from "@/lib/api";
import { useLocale } from "@/lib/locale-context";
import { Badge, Button } from "@/components/ui";

export function WeeklyGoalCard({
  goal,
  token,
  onGoalChange,
}: {
  goal: LearningGoalState;
  token: string;
  onGoalChange: (nextGoal: LearningGoalState, weeklyTarget: number | null) => void;
}) {
  const { t, locale } = useLocale();
  const en = locale === "en";
  const [inputVal, setInputVal] = useState(
    goal.weeklyTarget != null ? String(goal.weeklyTarget) : "10",
  );
  const [busy, setBusy] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (goal.weeklyTarget != null) {
      setInputVal(String(goal.weeklyTarget));
    }
  }, [goal.weeklyTarget]);

  async function saveTarget(target: number | null) {
    if (busy) return;
    if (
      target !== null &&
      (!Number.isInteger(target) ||
        target < WEEKLY_TARGET_MIN ||
        target > WEEKLY_TARGET_MAX)
    ) {
      setErrorMsg(t.learning.targetInvalid);
      setStatusMsg(null);
      return;
    }
    setBusy(true);
    setErrorMsg(null);
    setStatusMsg(null);
    try {
      const res = await api<UpdateLearningGoalResponse>("/learning/goal", {
        method: "PUT",
        token,
        body: { weeklyTarget: target },
      });
      onGoalChange(res.goal, res.weeklyTarget);
      setStatusMsg(
        target === null ? t.learning.targetRemoved : t.learning.targetSaved,
      );
    } catch {
      setErrorMsg(t.learning.targetSaveFailed);
    } finally {
      setBusy(false);
    }
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const num = Number(inputVal.trim());
    if (!inputVal.trim() || !Number.isInteger(num)) {
      setErrorMsg(t.learning.targetInvalid);
      setStatusMsg(null);
      return;
    }
    void saveTarget(num);
  }

  const weekSpan = `${goal.weekStart.slice(0, 10)} – ${goal.weekEnd.slice(0, 10)}`;

  return (
    <section
      className="card min-w-0 space-y-4 border-brand/30"
      aria-label={t.learning.weeklyGoalTitle}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-black">🎯 {t.learning.weeklyGoalTitle}</h2>
            <Badge tone={goal.mode === "custom" ? "brand" : "sky"}>
              {goal.mode === "custom"
                ? `${goal.weekKey} (Mon–Sun UTC)`
                : t.learning.automaticGoalBadge}
            </Badge>
          </div>
          <p className="mt-1 text-xs font-bold text-ink-muted">
            {t.learning.weeklyGoalHint} ({weekSpan} UTC)
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-ink-muted">
            {en ? "This week" : "Цього тижня"}
          </p>
          <p className="text-2xl font-black text-brand-dark">
            {goal.currentWeekSuccesses}
            {goal.weeklyTarget != null ? ` / ${goal.weeklyTarget}` : ""}
          </p>
        </div>
      </div>

      {goal.mode === "custom" && goal.weeklyTarget != null ? (
        <div className="space-y-2">
          <div
            className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
            role="progressbar"
            aria-label={t.learning.weeklyGoalTitle}
            aria-valuenow={goal.currentWeekSuccesses}
            aria-valuemin={0}
            aria-valuemax={goal.weeklyTarget}
          >
            <div
              className="h-full rounded-full bg-brand transition-all motion-reduce:transition-none"
              style={{ width: `${Math.round((goal.progressRatio ?? 0) * 100)}%` }}
            />
          </div>
          {goal.completed ? (
            <div
              className="ef-celebrate motion-reduce:animate-none rounded-2xl border border-brand/40 bg-brand-soft/60 px-4 py-2.5 text-sm font-black text-brand-dark"
              role="status"
            >
              🏆 {t.learning.targetReached} ({goal.currentWeekSuccesses}/{goal.weeklyTarget})
            </div>
          ) : (
            <p className="text-xs font-bold text-ink-muted">
              {en
                ? `${goal.remaining ?? 0} successful attempt(s) left this week`
                : `Залишилось успішних спроб цього тижня: ${goal.remaining ?? 0}`}
            </p>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-sky/30 bg-sky/5 p-4 space-y-2">
          <p className="text-xs font-bold text-ink-muted">
            {t.learning.automaticGoalHint}
          </p>
          {goal.automaticGoal ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-black">
                ✨{" "}
                {en ? goal.automaticGoal.titleEn : goal.automaticGoal.titleUk}
              </p>
              <Link
                href={goal.automaticGoal.href}
                className="btn-sky !py-2 !px-4 text-sm min-h-11"
              >
                {t.onboarding.startNow} →
              </Link>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-black">🗺️ {t.learn.mapTitle}</p>
              <Link href="/learn" className="btn-sky !py-2 !px-4 text-sm min-h-11">
                {t.nav.learn} →
              </Link>
            </div>
          )}
        </div>
      )}

      <div className="border-t border-slate-100 pt-3 dark:border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-ink-muted">
            {en ? "Quick presets:" : "Швидкий вибір:"}
          </span>
          {WEEKLY_TARGET_PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              disabled={busy}
              onClick={() => {
                setInputVal(String(preset));
                void saveTarget(preset);
              }}
              className={`min-h-10 rounded-xl border-2 px-3 py-1 text-sm font-black transition motion-reduce:transition-none ${
                goal.weeklyTarget === preset
                  ? "border-brand bg-brand-soft text-brand-dark"
                  : "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900"
              }`}
            >
              {preset}
            </button>
          ))}
        </div>

        <form onSubmit={handleFormSubmit} className="flex flex-wrap items-end gap-2">
          <div className="min-w-[10rem] flex-1">
            <label
              htmlFor="weekly-goal-input"
              className="label text-xs"
            >
              {t.learning.customTargetLabel}
            </label>
            <input
              id="weekly-goal-input"
              type="number"
              min={WEEKLY_TARGET_MIN}
              max={WEEKLY_TARGET_MAX}
              step={1}
              className="input !py-2 text-sm"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
          </div>
          <Button type="submit" size="sm" disabled={busy} className="min-h-11">
            {t.learning.saveTarget}
          </Button>
          {goal.mode === "custom" && (
            <Button
              type="button"
              size="sm"
              variant="secondary"
              disabled={busy}
              className="min-h-11"
              onClick={() => void saveTarget(null)}
            >
              {t.learning.removeTarget}
            </Button>
          )}
        </form>

        {statusMsg && (
          <p className="text-xs font-black text-brand-dark" role="status">
            ✓ {statusMsg}
          </p>
        )}
        {errorMsg && (
          <p className="text-xs font-black text-red-500" role="alert">
            {errorMsg}
          </p>
        )}
      </div>
    </section>
  );
}
