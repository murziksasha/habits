"use client";

import dynamic from "next/dynamic";
import type { editor } from "monaco-editor";

const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="grid h-[320px] place-items-center rounded-2xl border-2 border-slate-200 bg-slate-50 text-sm font-bold text-ink-muted dark:border-slate-700 dark:bg-slate-900">
      Loading editor…
    </div>
  ),
});

const LANG_MAP: Record<string, string> = {
  js: "javascript",
  javascript: "javascript",
  typescript: "typescript",
  ts: "typescript",
  html: "html",
  css: "css",
  sql: "sql",
  json: "json",
  bash: "shell",
  shell: "shell",
  jsx: "javascript",
  cpp: "cpp",
  "c++": "cpp",
  c: "c",
  cmake: "plaintext",
  qml: "plaintext",
};

export function MonacoCodeEditor({
  value,
  onChange,
  language = "javascript",
  height = "320px",
  readOnly = false,
}: {
  value: string;
  onChange: (v: string) => void;
  language?: string;
  height?: string;
  readOnly?: boolean;
}) {
  const monacoLang = LANG_MAP[language] ?? language;

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-slate-200 dark:border-slate-700">
      <Editor
        height={height}
        language={monacoLang}
        value={value}
        theme="vs-dark"
        onChange={(v) => onChange(v ?? "")}
        options={
          {
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            wordWrap: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            readOnly,
            padding: { top: 12 },
          } satisfies editor.IStandaloneEditorConstructionOptions
        }
      />
    </div>
  );
}
