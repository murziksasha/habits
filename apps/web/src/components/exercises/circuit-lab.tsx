"use client";

import { useState } from "react";
import { type CircuitDocument, type CircuitAnalysis, type CircuitCriterion } from "@eduforge/shared";
import { useLocale } from "@/lib/locale-context";
import { CircuitEditor } from "@/components/circuit/circuit-editor";
import type { RunSimOutput } from "@eduforge/circuit-engine";
import { type Exercise, usePrompt, useExerciseHint, useSoftAttempts, SoftFeedback } from "./shared";

export function CircuitLabExerciseComponent({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const { t } = useLocale();
  const prompt = usePrompt(exercise);
  const hint = useExerciseHint(exercise);
  const soft = useSoftAttempts(hint.setOpen);

  const seeded = (exercise.circuit as CircuitDocument) || (exercise.circuitDocument as CircuitDocument);
  const initialDoc = seeded || {
    version: 2,
    title: (exercise.title as string) || "Lab Circuit",
    components: [],
    wires: [],
    junctions: [],
    mode: "schematic" as const,
  };

  const [currentDoc, setCurrentDoc] = useState<CircuitDocument>(initialDoc);
  const [simOutput, setSimOutput] = useState<RunSimOutput | null>(null);

  const criteria = (exercise.criteria as CircuitCriterion[]) || [];
  const analysis = (exercise.analysis as CircuitAnalysis) || {
    type: "tran",
    tran: { tStep: 1e-5, tStop: 5e-3 },
  };

  const handleSubmit = () => {
    soft.markOk();
    onAnswer({ circuit: currentDoc });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            {t.circuitLab.title}
          </span>
        </div>
        <h2 className="text-xl font-black text-slate-100" id={`ex-prompt-${exercise.id}`}>
          {prompt}
        </h2>
      </div>

      {/* Embedded Circuit Editor with SPICE engine and waveforms */}
      <CircuitEditor
        initialDoc={currentDoc}
        onChange={setCurrentDoc}
        initialAnalysis={analysis}
        criteria={criteria}
        onSimulationResult={(res) => {
          setSimOutput(res);
          if (res.ok) {
            soft.resetSoft();
          }
        }}
      />

      {/* Feedback / hint */}
      <SoftFeedback
        wrong={soft.wrong}
        detail={soft.detail}
        attempts={soft.attempts}
        max={soft.max}
        mentorRank={soft.mentorRank}
      />

      {simOutput && !simOutput.ok ? (
        <p className="text-sm font-bold text-amber-300">{t.circuitLab.simFailed}</p>
      ) : null}

      <div className="flex items-center gap-3 pt-3">
        <button
          type="button"
          onClick={handleSubmit}
          className="btn-primary"
        >
          {t.circuitLab.submitSolution}
        </button>

        {soft.canSkip && (
          <button
            type="button"
            onClick={() =>
              onAnswer({ circuit: currentDoc, skipped: true })
            }
            className="text-xs font-bold text-slate-400 hover:text-slate-200 underline"
          >
            {t.circuitLab.skipExercise}
          </button>
        )}
      </div>
    </div>
  );
}
