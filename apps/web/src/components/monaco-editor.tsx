"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import type { editor } from "monaco-editor";

const Editor = dynamic(() => import("./monaco-editor-inner"), {
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

const QUICK_SYMBOLS = ["{", "}", "(", ")", "[", "]", ";", "=", ">", "<", "=>", "\"", "'", ":", "tab"];

export function MonacoCodeEditor({
  value,
  onChange,
  language = "javascript",
  height = "320px",
  readOnly = false,
  fileName,
}: {
  value: string;
  onChange: (v: string) => void;
  language?: string;
  height?: string;
  readOnly?: boolean;
  fileName?: string;
}) {
  const monacoLang = LANG_MAP[language] ?? language;
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  function insertSymbol(sym: string) {
    const insertText = sym === "tab" ? "  " : sym;
    const ed = editorRef.current;
    if (ed) {
      const selection = ed.getSelection();
      if (selection) {
        ed.executeEdits("quick-toolbar", [
          {
            range: selection,
            text: insertText,
            forceMoveMarkers: true,
          },
        ]);
        ed.focus();
        return;
      }
    }
    onChange(value + insertText);
  }

  return (
    <div
      className="w-full min-w-0 overflow-hidden rounded-2xl border-2 border-slate-200 dark:border-slate-700"
      role="region"
      aria-label={fileName ? `Code editor: ${fileName}` : "Code editor"}
    >
      <Editor
        height={height}
        language={monacoLang}
        value={value}
        theme="vs-dark"
        onMount={(ed) => {
          editorRef.current = ed;
        }}
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
            fixedOverflowWidgets: true,
            scrollbar: {
              alwaysConsumeMouseWheel: false,
            },
            overviewRulerLanes: 0,
          } satisfies editor.IStandaloneEditorConstructionOptions
        }
      />
      {!readOnly && (
        <div
          className="flex items-center gap-1 overflow-x-auto border-t border-slate-200 bg-slate-100/90 p-1.5 dark:border-slate-800 dark:bg-slate-900/90"
          role="toolbar"
          aria-label="Quick code symbols"
        >
          {QUICK_SYMBOLS.map((sym) => (
            <button
              key={sym}
              type="button"
              tabIndex={-1}
              onClick={() => insertSymbol(sym)}
              className="shrink-0 rounded-lg border border-slate-300 bg-white px-2.5 py-1 font-mono text-xs font-black shadow-sm transition active:scale-95 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              {sym}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
