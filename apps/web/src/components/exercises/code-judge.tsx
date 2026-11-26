"use client";

import { useContext, useState } from "react";
import { gradeCodeJudgeText } from "@eduforge/shared";
import clsx from "clsx";
import { useLocale } from "@/lib/locale-context";
import { MonacoCodeEditor } from "@/components/monaco-editor";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { type Exercise, WrongAttemptCtx, usePrompt } from "./shared";

/** Multi-lang Docker/local judge exercise with behavior and text verification modes */
export function CodeJudgeExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const { locale, t } = useLocale();
  const { token } = useAuth();
  const onWrongAttempt = useContext(WrongAttemptCtx);
  const lang = String(exercise.language ?? "javascript") as
    | "javascript"
    | "typescript"
    | "python"
    | "bash";
  const starter = String(exercise.starter ?? exercise.code ?? "");
  const [code, setCode] = useState(starter);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [judgeUnavailable, setJudgeUnavailable] = useState(false);
  const [mobileTab, setMobileTab] = useState<"task" | "editor" | "output">("editor");

  // Verification mode: "behavior" (default) or "text", saved to device localStorage
  const [mode, setMode] = useState<"behavior" | "text">(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("eduforge_grading_mode");
        if (saved === "text" || saved === "behavior") return saved;
      } catch {
        /* ignore */
      }
    }
    return "behavior";
  });

  function handleModeChange(newMode: "behavior" | "text") {
    setMode(newMode);
    setMsg("");
    setJudgeUnavailable(false);
    try {
      localStorage.setItem("eduforge_grading_mode", newMode);
    } catch {
      /* ignore */
    }
  }

  const tests = (exercise.tests as { type: string; value: string | number }[]) ?? [];
  const limitations = locale === "en" ? exercise.limitationsEn : exercise.limitationsUk;

  async function checkTextMode() {
    setBusy(true);
    setMsg("");
    try {
      const res = gradeCodeJudgeText(exercise, code);
      if (res.correct) {
        setMsg(
          locale === "en"
            ? "✓ Text criteria passed! Code accepted."
            : "✓ Текстові критерії пройдено! Відповідь зараховано.",
        );
        onAnswer({
          source: code,
          mode: "text",
        });
      } else {
        const miss = res.meta?.missing as string[] | undefined;
        const forb = res.meta?.forbidden as string | undefined;
        const reason = forb
          ? `${locale === "en" ? "Forbidden pattern:" : "Заборонений патерн:"} ${forb}`
          : miss?.length
            ? `${locale === "en" ? "Missing required elements:" : "Не вистачає обов'язкових елементів:"} ${miss.join(", ")}`
            : locale === "en"
              ? "Code does not meet the required criteria."
              : "Код не відповідає зазначеним критеріям.";
        setMsg(`FAIL: ${reason}`);
        onWrongAttempt?.();
      }
      setMobileTab("output");
    } finally {
      setBusy(false);
    }
  }

  async function runBehaviorMode() {
    setBusy(true);
    setMsg("");
    setJudgeUnavailable(false);
    try {
      const d = await api<{
        result: {
          ok: boolean;
          stdout: string;
          stderr: string;
          tests: { pass: boolean; name: string }[];
          mode: string;
          error?: string;
        };
      }>("/judge/run", {
        method: "POST",
        token,
        body: {
          lang,
          source: code,
          tests: tests.map((t) => ({
            type: t.type,
            value: t.value,
          })),
          timeoutMs: Number(exercise.timeoutMs ?? 3000),
        },
      });

      if (d.result.mode === "disabled" || d.result.error === "judge_disabled") {
        setJudgeUnavailable(true);
        setMsg(
          locale === "en"
            ? "Judge runner is currently offline or disabled."
            : "Judge runner зараз вимкнено або недоступний.",
        );
        return;
      }

      const passed = d.result.tests.filter((t) => t.pass).length;
      const total = d.result.tests.length || (d.result.ok ? 1 : 0);
      setMsg(
        `${d.result.mode}: ${d.result.ok ? "OK" : "FAIL"}\n${d.result.stdout}\n${d.result.stderr}`,
      );

      if (d.result.ok) {
        onAnswer({
          source: code,
          mode: "behavior",
        });
      } else {
        onWrongAttempt?.();
      }
      setMobileTab("output");
    } catch (e: unknown) {
      const err = e as Error & { status?: number; data?: { error?: string } };
      if (err.status === 503 || err.data?.error === "judge_unavailable" || err.data?.error === "judge_disabled") {
        setJudgeUnavailable(true);
      } else {
        setMsg(e instanceof Error ? e.message : "judge_error");
      }
      setMobileTab("output");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Mobile Tab Switcher (Condition / Code / Output) */}
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
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-black">{usePrompt(exercise)}</h2>
          <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            <button
              type="button"
              className={clsx(
                "rounded-lg px-3 py-1 text-xs font-bold transition",
                mode === "behavior"
                  ? "bg-white text-ink shadow dark:bg-slate-700 dark:text-white"
                  : "text-ink-muted hover:text-ink dark:text-slate-400 dark:hover:text-white",
              )}
              onClick={() => handleModeChange("behavior")}
            >
              ⚙️ {t.lesson.modeBehavior}
            </button>
            <button
              type="button"
              className={clsx(
                "rounded-lg px-3 py-1 text-xs font-bold transition",
                mode === "text"
                  ? "bg-white text-ink shadow dark:bg-slate-700 dark:text-white"
                  : "text-ink-muted hover:text-ink dark:text-slate-400 dark:hover:text-white",
              )}
              onClick={() => handleModeChange("text")}
            >
              📄 {t.lesson.modeText}
            </button>
          </div>
        </div>

        {mode === "text" && (
          <div className="rounded-2xl border border-sky-300 bg-sky-50/80 p-3 text-xs font-medium text-sky-900 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200">
            ℹ️ {t.lesson.textModeDisclaimer}
          </div>
        )}

        {Boolean(limitations) && (
          <p className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-medium text-ink-muted dark:bg-slate-800/60 dark:text-slate-300">
            ℹ️ {String(limitations)}
          </p>
        )}

        <p className="text-xs font-bold text-ink-muted">
          Judge · {lang} ·{" "}
          {mode === "behavior"
            ? locale === "en"
              ? "isolated server execution"
              : "ізольоване серверне виконання"
            : locale === "en"
              ? "static source verification"
              : "статична перевірка коду"}
        </p>
      </div>

      <div className={clsx("space-y-2", mobileTab !== "editor" && "hidden sm:block")}>
        <MonacoCodeEditor
          value={code}
          onChange={setCode}
          language={lang === "python" ? "python" : lang === "bash" ? "shell" : "javascript"}
          height="220px"
        />
      </div>

      <div className={clsx("space-y-3", mobileTab !== "output" && "hidden sm:block")}>
        {judgeUnavailable && (
          <div className="rounded-2xl border-2 border-amber-500 bg-amber-50 p-4 dark:bg-amber-950/30 space-y-2">
            <p className="font-bold text-amber-800 dark:text-amber-200">
              ⚠️ {t.lesson.judgeUnavailable}
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-300">
              {t.lesson.judgeUnavailableHint}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                className="btn-primary !py-1.5 !text-xs"
                disabled={busy}
                onClick={() => void runBehaviorMode()}
              >
                🔄 {t.lesson.retryBehaviorCheck}
              </button>
              <button
                type="button"
                className="btn-secondary !py-1.5 !text-xs"
                onClick={() => {
                  setJudgeUnavailable(false);
                  handleModeChange("text");
                }}
              >
                📝 {t.lesson.switchToTextCheck}
              </button>
            </div>
          </div>
        )}

        {msg && (
          <pre className="max-h-40 overflow-auto rounded-xl bg-slate-900 p-3 text-xs text-green-300">
            {msg}
          </pre>
        )}
      </div>

      <div className="flex gap-2 pt-1">
        <button
          type="button"
          className="btn-primary"
          disabled={busy}
          onClick={() => {
            if (mode === "text") {
              void checkTextMode();
            } else {
              void runBehaviorMode();
            }
          }}
        >
          {busy
            ? locale === "en"
              ? "Running…"
              : "Виконуємо…"
            : mode === "text"
              ? locale === "en"
                ? "Check text"
                : "Перевірити (текст)"
              : locale === "en"
                ? "Run in judge"
                : "Запустити в judge"}
        </button>
      </div>
    </div>
  );
}
