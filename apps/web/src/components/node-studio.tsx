"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { MonacoCodeEditor } from "@/components/monaco-editor";
import {
  isWebcontainersFlagEnabled,
  webcontainersSupported,
} from "@/lib/webcontainer/boot";
import {
  ensureBooted,
  getSessionState,
  mountTemplate,
  runTemplateCommand,
  stopProcess,
  subscribeStatus,
  subscribeTerminal,
  type SessionState,
  type TerminalLine,
} from "@/lib/webcontainer/session";
import {
  flattenTree,
  buildTemplateTree,
  getTemplateMeta,
  WC_TEMPLATE_META,
  type WcTemplateId,
} from "@/lib/webcontainer/templates";

function monacoLang(path: string): string {
  if (path.endsWith(".css")) return "css";
  if (path.endsWith(".json")) return "json";
  if (path.endsWith(".html")) return "html";
  if (path.endsWith(".ts") || path.endsWith(".tsx")) return "typescript";
  if (path.endsWith(".js") || path.endsWith(".jsx") || path.endsWith(".mjs"))
    return "javascript";
  if (path.endsWith(".md")) return "markdown";
  return "plaintext";
}

export function NodeStudio({ locale = "uk" }: { locale?: "uk" | "en" }) {
  const en = locale === "en";
  const [templateId, setTemplateId] = useState<WcTemplateId>("express-hello");
  const [files, setFiles] = useState<Record<string, string>>(() =>
    flattenTree(buildTemplateTree("express-hello")),
  );
  const [activeFile, setActiveFile] = useState("server.js");
  const [term, setTerm] = useState<TerminalLine[]>([]);
  const [status, setStatus] = useState<SessionState>(getSessionState());
  const [busy, setBusy] = useState(false);
  const [support] = useState(() => webcontainersSupported());

  const meta = useMemo(() => getTemplateMeta(templateId), [templateId]);
  const fileList = useMemo(() => Object.keys(files).sort(), [files]);

  useEffect(() => {
    const offT = subscribeTerminal((line) => {
      setTerm((prev) => [...prev.slice(-400), line]);
    });
    const offS = subscribeStatus(setStatus);
    return () => {
      offT();
      offS();
    };
  }, []);

  const switchTemplate = useCallback((id: WcTemplateId) => {
    setTemplateId(id);
    const tree = buildTemplateTree(id);
    const flat = flattenTree(tree);
    setFiles(flat);
    const m = getTemplateMeta(id);
    setActiveFile(m?.defaultFile ?? Object.keys(flat)[0] ?? "index.js");
    setTerm([]);
  }, []);

  async function onBootMount() {
    setBusy(true);
    try {
      await ensureBooted();
      const flat = await mountTemplate(templateId);
      setFiles(flat);
    } catch {
      /* terminal shows error */
    } finally {
      setBusy(false);
    }
  }

  async function onInstallAndRun() {
    if (!meta) return;
    setBusy(true);
    try {
      await runTemplateCommand(templateId, files, meta.runCommand);
    } catch {
      /* */
    } finally {
      setBusy(false);
    }
  }

  async function onStop() {
    setBusy(true);
    try {
      await stopProcess();
    } finally {
      setBusy(false);
    }
  }

  if (!isWebcontainersFlagEnabled()) {
    return (
      <div className="card space-y-3">
        <h1 className="text-2xl font-black">
          📦 {en ? "Node Studio (WebContainers)" : "Node Studio (WebContainers)"}
        </h1>
        <p className="text-sm font-bold text-ink-muted">
          {en
            ? "Set NEXT_PUBLIC_WEBCONTAINERS=1 in .env and restart the web app. Requires Chrome/Edge (cross-origin isolation)."
            : "Увімкни NEXT_PUBLIC_WEBCONTAINERS=1 у .env і перезапусти web. Потрібен Chrome/Edge (cross-origin isolation)."}
        </p>
        <Link href="/playground" className="btn-secondary inline-flex w-fit">
          ← Playground
        </Link>
      </div>
    );
  }

  if (!support.ok) {
    return (
      <div className="card space-y-3 border-amber-300 dark:border-amber-700">
        <h1 className="text-2xl font-black">📦 Node Studio</h1>
        <p className="text-sm font-bold text-amber-800 dark:text-amber-200">
          {support.reason === "not_isolated" || support.reason === "no_sab"
            ? en
              ? "This page is not cross-origin isolated (COOP/COEP). SharedArrayBuffer unavailable — WebContainers cannot boot. Use Chrome and ensure headers on /studio/node."
              : "Сторінка без cross-origin isolation (COOP/COEP). SharedArrayBuffer недоступний — WebContainers не стартує. Chrome + headers на /studio/node."
            : en
              ? `WebContainers unavailable (${support.reason})`
              : `WebContainers недоступні (${support.reason})`}
        </p>
        <p className="text-xs font-mono">
          crossOriginIsolated:{" "}
          {typeof window !== "undefined"
            ? String(window.crossOriginIsolated)
            : "—"}
        </p>
        <Link href="/playground" className="btn-secondary inline-flex w-fit">
          ← Playground
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black">
            📦 {en ? "Node Studio" : "Node Studio"}
          </h1>
          <p className="text-sm font-bold text-ink-muted">
            {en
              ? "Real Node + npm in the browser (StackBlitz WebContainers). Not a server Docker judge."
              : "Справжній Node + npm у браузері (StackBlitz WebContainers). Не server Docker judge."}
          </p>
          <p className="text-xs font-bold text-sky mt-1">
            {status.status}: {status.message}
            {status.previewUrl ? ` · ${status.previewUrl}` : ""}
          </p>
        </div>
        <Link href="/playground" className="btn-secondary !py-2 text-sm">
          🖥️ Playground
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {WC_TEMPLATE_META.map((t) => (
          <button
            key={t.id}
            type="button"
            className={clsx(
              "rounded-xl border-2 px-3 py-1.5 text-xs font-bold",
              templateId === t.id
                ? "border-sky bg-sky/15"
                : "border-slate-200 dark:border-slate-700",
            )}
            onClick={() => switchTemplate(t.id)}
            disabled={busy}
          >
            {en ? t.titleEn : t.titleUk}
            {t.heavy ? " ⚠" : ""}
          </button>
        ))}
      </div>
      {meta && (
        <p className="text-xs font-bold text-ink-muted">
          {en ? meta.descriptionEn : meta.descriptionUk}
          {meta.heavy
            ? en
              ? " — npm install may take 1–2 min."
              : " — npm install може зайняти 1–2 хв."
            : ""}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="btn-secondary"
          disabled={busy}
          onClick={() => void onBootMount()}
        >
          {en ? "Boot + mount" : "Boot + mount"}
        </button>
        <button
          type="button"
          className="btn-primary"
          disabled={busy}
          onClick={() => void onInstallAndRun()}
        >
          ▶ {busy ? "…" : en ? "Install + Run" : "Install + Run"}
        </button>
        <button
          type="button"
          className="btn-secondary"
          disabled={busy}
          onClick={() => void onStop()}
        >
          ⏹ {en ? "Stop" : "Stop"}
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {fileList.map((path) => (
              <button
                key={path}
                type="button"
                className={clsx(
                  "rounded-lg border-2 px-2 py-1 text-[11px] font-bold",
                  activeFile === path
                    ? "border-sky bg-sky/15"
                    : "border-slate-200 dark:border-slate-700",
                )}
                onClick={() => setActiveFile(path)}
              >
                {path}
              </button>
            ))}
          </div>
          <MonacoCodeEditor
            language={monacoLang(activeFile)}
            value={files[activeFile] ?? ""}
            onChange={(v) =>
              setFiles((prev) => ({ ...prev, [activeFile]: v }))
            }
            height="380px"
          />
        </div>

        <div className="space-y-3">
          <div className="card min-h-[180px] max-h-[240px] overflow-auto bg-slate-950 p-3 font-mono text-xs text-green-300 whitespace-pre-wrap">
            <p className="mb-2 text-[10px] font-bold text-slate-400">TERMINAL</p>
            {term.length === 0 && (
              <span className="text-slate-500">
                {en ? "(empty — Boot or Run)" : "(порожньо — Boot або Run)"}
              </span>
            )}
            {term.map((l, i) => (
              <span
                key={i}
                className={clsx(
                  l.stream === "stderr" && "text-red-400",
                  l.stream === "system" && "text-sky-300",
                )}
              >
                {l.text}
              </span>
            ))}
          </div>

          <div className="card overflow-hidden p-0">
            <p className="border-b border-slate-100 px-3 py-2 text-xs font-bold text-ink-muted dark:border-slate-800">
              {en ? "Preview (server-ready)" : "Preview (server-ready)"}
            </p>
            {status.previewUrl ? (
              <iframe
                title="wc-preview"
                src={status.previewUrl}
                className="h-72 w-full bg-white"
              />
            ) : (
              <p className="p-4 text-sm font-bold text-ink-muted">
                {en
                  ? "HTTP templates (Express / Next) show a live URL here after Run."
                  : "HTTP-шаблони (Express / Next) покажуть live URL після Run."}
              </p>
            )}
          </div>
        </div>
      </div>

      <p className="text-[11px] font-bold text-ink-muted">
        {en
          ? "License: WebContainers may require a commercial agreement for production SaaS. Code runs only in your browser."
          : "Ліцензія: WebContainers для production SaaS можуть потребувати комерційної угоди. Код виконується лише у вашому браузері."}
      </p>
    </div>
  );
}
