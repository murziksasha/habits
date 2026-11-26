"use client";

import { useState } from "react";
import clsx from "clsx";
import { useLocale } from "@/lib/locale-context";
import { MonacoCodeEditor } from "@/components/monaco-editor";
import { softGradeCodeRunSource } from "@/lib/client-grade";
import { runCppTests } from "@/lib/cpp-runner";
import { type Exercise, usePrompt, useExerciseHint, useSoftAttempts, DrillFooter, tutorHelpHref } from "./shared";

export function CodeRunExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const prompt = usePrompt(exercise);
  const { locale } = useLocale();
  const starter = String(exercise.starter ?? "");
  const [source, setSource] = useState(starter);
  const [busy, setBusy] = useState(false);
  const [runMsg, setRunMsg] = useState("");
  const [testsOk, setTestsOk] = useState(false);
  const [mobileTab, setMobileTab] = useState<"task" | "editor" | "output">("editor");
  const hint = useExerciseHint(exercise);
  const soft = useSoftAttempts(hint.setOpen);
  const tests =
    (exercise.tests as { stdin?: string; stdout: string }[]) ?? [];
  const required = (exercise.requiredSource as string[]) ?? [];
  const forbidden = (exercise.forbiddenSource as string[]) ?? [
    "system(",
    "exec(",
  ];
  const lang = String(exercise.language ?? "cpp");
  const cs = exercise.caseSensitive !== false;

  async function runTests() {
    setBusy(true);
    setRunMsg(locale === "en" ? "Running…" : "Запуск…");
    setTestsOk(false);
    setMobileTab("output");
    try {
      const srcCheck = softGradeCodeRunSource(
        source,
        required,
        forbidden,
        cs,
        lang,
      );
      if (!srcCheck.ok) {
        setRunMsg(
          locale === "en"
            ? `Source check failed: missing ${srcCheck.missing.join(", ") || "—"} banned ${srcCheck.banned.join(", ") || "—"}`
            : `Перевірка коду: бракує ${srcCheck.missing.join(", ") || "—"} заборонено ${srcCheck.banned.join(", ") || "—"}`,
        );
        soft.registerFail();
        return;
      }
      if (lang === "cpp" && tests.length) {
        const r = await runCppTests(
          source,
          tests,
          Number(exercise.timeLimitMs ?? 3000),
        );
        if (!r.pass) {
          setRunMsg(
            locale === "en"
              ? `Tests failed: ${r.firstError ?? "stdout mismatch"}`
              : `Тести не пройшли: ${r.firstError ?? "stdout"}`,
          );
          soft.registerFail();
          return;
        }
        setTestsOk(true);
        setRunMsg(
          locale === "en"
            ? `All ${tests.length} test(s) passed`
            : `Усі ${tests.length} тест(и) пройдено`,
        );
      } else {
        setTestsOk(true);
        setRunMsg(locale === "en" ? "Source checks OK" : "Перевірки коду OK");
      }
    } finally {
      setBusy(false);
    }
  }

  function check() {
    if (!testsOk) {
      soft.registerFail();
      setRunMsg(
        locale === "en"
          ? "Run tests successfully before submit"
          : "Спочатку успішно запусти тести",
      );
      setMobileTab("output");
      return;
    }
    const srcCheck = softGradeCodeRunSource(
      source,
      required,
      forbidden,
      cs,
      lang,
    );
    if (!srcCheck.ok) {
      soft.registerFail();
      setMobileTab("output");
      return;
    }
    soft.markOk();
    onAnswer({ source });
  }

  return (
    <div className="space-y-4">
      {/* Mobile Tab Switcher (Task / Code / Output) */}
      <div className="flex sm:hidden border-b border-slate-200 dark:border-slate-800 mb-2 gap-1" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={mobileTab === "task"}
          className={clsx(
            "flex-1 py-1.5 text-xs font-bold border-b-2 text-center transition",
            mobileTab === "task"
              ? "border-brand text-brand-dark dark:text-brand-light"
              : "border-transparent text-ink-muted",
          )}
          onClick={() => setMobileTab("task")}
        >
          📋 {locale === "en" ? "Task" : "Умова"}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mobileTab === "editor"}
          className={clsx(
            "flex-1 py-1.5 text-xs font-bold border-b-2 text-center transition",
            mobileTab === "editor"
              ? "border-brand text-brand-dark dark:text-brand-light"
              : "border-transparent text-ink-muted",
          )}
          onClick={() => setMobileTab("editor")}
        >
          💻 {locale === "en" ? "Code" : "Код"}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mobileTab === "output"}
          className={clsx(
            "flex-1 py-1.5 text-xs font-bold border-b-2 text-center transition",
            mobileTab === "output"
              ? "border-brand text-brand-dark dark:text-brand-light"
              : "border-transparent text-ink-muted",
          )}
          onClick={() => setMobileTab("output")}
        >
          ▶️ {locale === "en" ? "Output" : "Результат"}
        </button>
      </div>

      <div className={clsx("space-y-3", mobileTab !== "task" && "hidden sm:block")}>
        <h2 className="text-xl font-black">{prompt}</h2>
        {hint.panel}
        <p className="text-xs font-bold text-ink-muted">
          {locale === "en"
            ? "C++ lab — Run tests (client), then Check"
            : "C++ lab — Запусти тести (у браузері), потім Перевірити"}
        </p>
      </div>

      <div className={clsx("space-y-2", mobileTab !== "editor" && "hidden sm:block")}>
        <MonacoCodeEditor
          value={source}
          onChange={(v) => {
            setSource(v);
            setTestsOk(false);
            soft.resetSoft();
          }}
          language={lang === "cpp" ? "cpp" : lang}
          height="320px"
        />
      </div>

      <div className={clsx("space-y-2", mobileTab !== "output" && "hidden sm:block")}>
        {runMsg ? (
          <pre
            className={clsx(
              "rounded-xl border-2 p-3 text-xs font-mono whitespace-pre-wrap",
              testsOk
                ? "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-100"
                : "border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-100",
            )}
          >
            {runMsg}
          </pre>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        <button
          type="button"
          className="btn-secondary"
          disabled={busy}
          onClick={() => void runTests()}
        >
          {busy
            ? locale === "en"
              ? "Running…"
              : "…"
            : locale === "en"
              ? "▶ Run tests"
              : "▶ Запустити тести"}
        </button>
      </div>
      <DrillFooter
        canCheck={testsOk && Boolean(source.trim())}
        onCheck={check}
        soft={soft}
        skipAnswer={{ source }}
        onAnswer={onAnswer}
        tutorHref={tutorHelpHref(exercise, source)}
        exercise={exercise}
        onApplySolution={(a) => {
          if (typeof a === "string") setSource(a);
          else if (a && typeof a === "object" && "source" in (a as object)) {
            setSource(String((a as { source: string }).source));
          }
        }}
      />
    </div>
  );
}
