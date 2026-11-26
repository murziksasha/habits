"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { useLocale } from "@/lib/locale-context";
import { MonacoCodeEditor } from "@/components/monaco-editor";
import { buildProjectPreviewSrcDoc, canPreviewProject } from "@/lib/project-preview";
import { softGradeCodeProject } from "@/lib/client-grade";
import { type Exercise, usePrompt, useExerciseHint, useSoftAttempts, DrillFooter, tutorHelpHref } from "./shared";

type ProjectFile = {
  id: string;
  name: string;
  language: string;
  starter: string;
};

function projectFileLanguage(lang?: string, name?: string): string {
  if (name?.endsWith(".md") || lang === "markdown") return "Markdown";
  if (name?.endsWith(".sql") || lang === "sql") return "SQL";
  if (name?.endsWith(".html") || lang === "html") return "HTML";
  if (name?.endsWith(".css") || lang === "css") return "CSS";
  if (name?.endsWith(".ts") || lang === "typescript" || lang === "ts") return "TypeScript";
  if (name?.endsWith(".js") || lang === "javascript" || lang === "js") return "JavaScript";
  if (name?.endsWith(".json") || lang === "json") return "JSON";
  if (lang) return lang.toUpperCase();
  return "";
}

export function CodeProjectExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const prompt = usePrompt(exercise);
  const { locale } = useLocale();
  const files = (exercise.files as ProjectFile[]) ?? [];
  const [active, setActive] = useState(files[0]?.id ?? "");
  const [contents, setContents] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const f of files) init[f.id] = f.starter ?? "";
    return init;
  });
  const [showPreview, setShowPreview] = useState(true);
  const [previewKey, setPreviewKey] = useState(0);
  const hint = useExerciseHint(exercise);
  const soft = useSoftAttempts(hint.setOpen);
  const checks =
    (exercise.checks as { fileId: string; contains: string[] }[]) ?? [];
  const cs = exercise.caseSensitive !== false;

  const current = files.find((f) => f.id === active) ?? files[0];
  const previewable = canPreviewProject(files, contents);
  const srcDoc = useMemo(
    () => (previewable ? buildProjectPreviewSrcDoc(files, contents) : ""),
    [files, contents, previewable],
  );

  // Debounce live preview reloads so typing is smooth
  useEffect(() => {
    if (!showPreview || !previewable) return;
    const t = setTimeout(() => setPreviewKey((k) => k + 1), 400);
    return () => clearTimeout(t);
  }, [srcDoc, showPreview, previewable]);

  function check() {
    if (!files.length) return;
    if (checks.length) {
      const r = softGradeCodeProject(contents, checks, cs);
      if (!r.ok) {
        soft.registerFail(r.missing.slice(0, 4).join("; "));
        return;
      }
    }
    soft.markOk();
    onAnswer({ files: contents });
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black">{prompt}</h2>
      <p className="text-xs font-bold text-ink-muted">
        Mini-project · {files.length} files ·{" "}
        {locale === "en" ? "edit tabs, preview, then check" : "редагуй вкладки, preview, потім check"}
      </p>
      {hint.panel}
      <div className="flex flex-wrap gap-2">
        {files.map((f) => (
          <button
            key={f.id}
            type="button"
            className={clsx(
              "rounded-xl border-2 px-3 py-1.5 text-xs font-bold font-mono",
              active === f.id
                ? "border-sky bg-sky/10"
                : "border-slate-200 dark:border-slate-700",
            )}
            onClick={() => setActive(f.id)}
          >
            {f.name}
          </button>
        ))}
        {previewable ? (
          <button
            type="button"
            className={clsx(
              "rounded-xl border-2 px-3 py-1.5 text-xs font-bold",
              showPreview
                ? "border-grape bg-grape/10"
                : "border-slate-200 dark:border-slate-700",
            )}
            onClick={() => setShowPreview((v) => !v)}
          >
            👁 Preview
          </button>
        ) : null}
      </div>
      <div
        className={clsx(
          "grid gap-3",
          showPreview && previewable && "lg:grid-cols-2",
        )}
      >
        <div className="min-w-0 w-full">
          <div className="flex items-center justify-between rounded-t-2xl border-2 border-b-0 border-slate-200 bg-slate-100/90 px-3 py-1.5 text-xs font-mono font-bold dark:border-slate-700 dark:bg-slate-800/90">
            <span className="text-ink dark:text-slate-100">{current?.name}</span>
            <span className="text-[11px] font-semibold text-ink-muted">
              {projectFileLanguage(current?.language, current?.name)}
            </span>
          </div>
          {current ? (
            <div className="[&>div]:rounded-t-none [&>div]:border-t-0">
              <MonacoCodeEditor
                key={current.id}
                value={contents[current.id] ?? ""}
                onChange={(v) => {
                  setContents((c) => ({ ...c, [current.id]: v }));
                  soft.resetSoft();
                }}
                language={current.language || "javascript"}
                height="360px"
                fileName={current.name}
              />
            </div>
          ) : null}
        </div>
        {showPreview && previewable ? (
          <div className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
            <p className="border-b border-slate-100 px-3 py-1.5 text-[10px] font-bold text-ink-muted dark:border-slate-800">
              Live preview (sandboxed)
            </p>
            <iframe
              key={previewKey}
              title="project-preview"
              sandbox="allow-scripts"
              className="h-[360px] w-full bg-white"
              srcDoc={srcDoc}
            />
          </div>
        ) : null}
      </div>
      <DrillFooter
        canCheck={Boolean(files.length)}
        onCheck={check}
        soft={soft}
        skipAnswer={{ files: contents }}
        onAnswer={onAnswer}
        tutorHref={tutorHelpHref(
          exercise,
          Object.entries(contents)
            .map(([k, v]) => `// ${k}\n${v}`)
            .join("\n\n")
            .slice(0, 800),
        )}
        exercise={exercise}
      />
    </div>
  );
}
