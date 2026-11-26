"use client";

import { useEffect, useMemo, useState } from "react";
import { localizeMatchPairs } from "@eduforge/shared";
import clsx from "clsx";
import { useLocale } from "@/lib/locale-context";
import { hasOpenDialog, isTypingTarget, optionIndexFromKey } from "@/lib/answer-keys";
import { stableOptionOrder } from "@/lib/option-order";
import { selectedMatchLabel } from "@/lib/match-labels";
import { type Exercise, usePrompt } from "./shared";

export function MatchExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const { locale, t } = useLocale();
  const prompt = usePrompt(exercise);
  const pairs = useMemo(
    () =>
      localizeMatchPairs(locale, {
        pairs: exercise.pairs as { left: string; right: string }[] | undefined,
        pairsEn: (exercise as { pairsEn?: { left: string; right: string }[] }).pairsEn,
      }),
    [exercise, locale],
  );
  const rights = useMemo(
    () => stableOptionOrder(`${String(exercise.id)}:match`, pairs.length).map((index) => pairs[index]!),
    [exercise.id, pairs],
  );
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<{ left: string; right: string }[]>([]);

  const freeLefts = pairs.filter((p) => !matched.some((m) => m.left === p.left));
  const freeRights = rights.filter((r) => !matched.some((m) => m.right === r.right));

  function pickRight(right: string) {
    if (!selectedLeft) return;
    if (matched.some((m) => m.right === right || m.left === selectedLeft)) return;
    setMatched((m) => [...m, { left: selectedLeft, right }]);
    setSelectedLeft(null);
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (isTypingTarget(e.target)) return;
      if (hasOpenDialog()) return;

      const optIdx = optionIndexFromKey(e);
      if (optIdx !== null) {
        e.preventDefault();
        if (!selectedLeft) {
          const left = freeLefts[optIdx]?.left;
          if (left) setSelectedLeft(left);
        } else {
          const right = freeRights[optIdx]?.right;
          if (right) pickRight(right);
        }
        return;
      }

      if (e.key === "Escape") {
        if (selectedLeft) {
          e.preventDefault();
          setSelectedLeft(null);
        }
        return;
      }

      if (e.key === "Backspace" && matched.length) {
        e.preventDefault();
        setMatched((m) => m.slice(0, -1));
        setSelectedLeft(null);
        return;
      }

      if (e.key === "Enter" && matched.length === pairs.length) {
        const target = e.target as HTMLElement | null;
        const isButtonOrLink = Boolean(target?.closest?.("button, a"));
        if (!isButtonOrLink) {
          e.preventDefault();
          onAnswer(matched);
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [freeLefts, freeRights, matched, pairs.length, selectedLeft, onAnswer]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black" id={`ex-prompt-${exercise.id}`}>
        {prompt}
      </h2>
      <p className="text-xs font-bold text-ink-muted">
        {locale === "en"
          ? "Keys: 1–9 left then right · Esc clear · Backspace undo · Enter check"
          : "Клавіші: 1–9 ліво/право · Esc скинути · Backspace · Enter"}
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2" role="list" aria-label="left">
          {pairs.map((p) => {
            const freeIdx = freeLefts.findIndex((x) => x.left === p.left);
            return (
              <button
                key={p.left}
                type="button"
                disabled={matched.some((m) => m.left === p.left)}
                className={clsx(
                  "w-full rounded-2xl border-2 px-3 py-2 font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky",
                  selectedLeft === p.left ? "border-sky bg-sky/10" : "border-slate-200",
                )}
                onClick={() => setSelectedLeft(p.left)}
              >
                {freeIdx >= 0 && (
                  <span className="mr-1 text-[10px] text-ink-muted">{freeIdx + 1}.</span>
                )}
                {p.labelLeft}
              </button>
            );
          })}
        </div>
        <div className="space-y-2" role="list" aria-label="right">
          {rights.map((r) => {
            const freeIdx = freeRights.findIndex((x) => x.right === r.right);
            return (
              <button
                key={r.right}
                type="button"
                disabled={matched.some((m) => m.right === r.right)}
                className="w-full rounded-2xl border-2 border-slate-200 px-3 py-2 font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky"
                onClick={() => pickRight(r.right)}
              >
                {freeIdx >= 0 && (
                  <span className="mr-1 text-[10px] text-ink-muted">{freeIdx + 1}.</span>
                )}
                {r.labelRight}
              </button>
            );
          })}
        </div>
      </div>
      {matched.length > 0 && (
        <p className="text-xs font-bold text-ink-muted">
          {matched
            .map((m) => {
              return selectedMatchLabel(pairs, m);
            })
            .join(" · ")}
        </p>
      )}
      {matched.length > 0 && (
        <button
          type="button"
          className="btn-secondary"
          onClick={() => {
            setMatched((current) => current.slice(0, -1));
            setSelectedLeft(null);
          }}
        >
          {t.lesson.undoLastPair}
        </button>
      )}
      <button
        type="button"
        className="btn-primary"
        disabled={matched.length !== pairs.length}
        onClick={() => onAnswer(matched)}
      >
        {t.lesson.check}
      </button>
    </div>
  );
}
