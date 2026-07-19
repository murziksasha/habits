"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  PLAYGROUND_EXAMPLES,
  PLAYGROUND_LANGS,
  decodePlaygroundShare,
  type PlaygroundLang,
} from "@eduforge/shared";
import { useLocale } from "@/lib/locale-context";
import { MonacoCodeEditor } from "@/components/monaco-editor";
import { runPlayground, type RunResult } from "@/lib/playground-run";
import clsx from "clsx";

/**
 * Public embeddable playground (no auth).
 * Load snippet via ?share= base64url payload (same as /playground share).
 */
export default function EmbedPlaygroundPage() {
  const { t, locale } = useLocale();
  const [lang, setLang] = useState<PlaygroundLang>("js");
  const [code, setCode] = useState(
    PLAYGROUND_EXAMPLES.find((e) => e.id === "js-sum")?.code ?? "console.log(1)",
  );
  const [htmlPane, setHtmlPane] = useState(`<div class="card">Card</div>`);
  const [cssPane, setCssPane] = useState(`.card {
  padding: 16px;
  border-radius: 12px;
  background: #0ea5e9;
  color: white;
}`);
  const [result, setResult] = useState<RunResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [loadedShare, setLoadedShare] = useState(false);
  const [shareNote, setShareNote] = useState("");

  useEffect(() => {
    if (loadedShare || typeof window === "undefined") return;
    const raw = new URLSearchParams(window.location.search).get("share");
    if (!raw) {
      setLoadedShare(true);
      return;
    }
    const payload = decodePlaygroundShare(raw);
    if (payload) {
      setLang(payload.lang);
      if (payload.lang === "css") {
        setCssPane(payload.css ?? payload.code);
        if (payload.html) setHtmlPane(payload.html);
        setCode(payload.css ?? payload.code);
      } else {
        setCode(payload.code);
        if (payload.html) setHtmlPane(payload.html);
        if (payload.css) setCssPane(payload.css);
      }
      setShareNote(t.playground.shareLoaded);
    }
    setLoadedShare(true);
  }, [loadedShare, t.playground.shareLoaded]);

  const showCssPanes = lang === "css";
  const showPreview = lang === "html" || lang === "css";

  const fullPlaygroundHref = useMemo(() => {
    if (typeof window === "undefined") return "/playground";
    const raw = new URLSearchParams(window.location.search).get("share");
    return raw ? `/playground?share=${raw}` : "/playground";
  }, [loadedShare]);

  const run = useCallback(async () => {
    setBusy(true);
    try {
      let r = await runPlayground(lang, code, {
        html: htmlPane,
        css: cssPane,
        preferIframe: true,
      });
      if (lang === "css") {
        const prev = await runPlayground("css", cssPane, {
          html: htmlPane,
          css: cssPane,
        });
        r = { ...r, htmlPreview: prev.htmlPreview };
      }
      if (lang === "html") {
        const prev = await runPlayground("html", code);
        r = { ...r, htmlPreview: prev.htmlPreview };
      }
      setResult(r);
    } finally {
      setBusy(false);
    }
  }, [lang, code, htmlPane, cssPane]);

  return (
    <div className="-mx-4 -my-8 min-h-screen bg-slate-50 p-3 dark:bg-slate-950 md:-mx-0 md:my-0">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand text-xs font-black text-white">
            E
          </span>
          <span className="text-sm font-black">{t.playground.title}</span>
          <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold dark:bg-slate-800">
            embed
          </span>
        </div>
        <Link
          href={fullPlaygroundHref}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-bold text-sky hover:underline"
        >
          {t.playground.openFull} →
        </Link>
      </div>

      {shareNote ? (
        <p className="mb-2 text-xs font-bold text-sky">{shareNote}</p>
      ) : null}

      <div className="mb-2 flex flex-wrap gap-1">
        {PLAYGROUND_LANGS.map((l) => (
          <button
            key={l.id}
            type="button"
            className={clsx(
              "rounded-lg border px-2 py-1 text-[11px] font-bold",
              lang === l.id
                ? "border-sky bg-sky/10"
                : "border-slate-200 dark:border-slate-700",
            )}
            onClick={() => setLang(l.id)}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="grid gap-2 lg:grid-cols-2">
        <div className="space-y-2">
          {showCssPanes ? (
            <>
              <MonacoCodeEditor
                language="html"
                value={htmlPane}
                onChange={setHtmlPane}
                height="100px"
              />
              <MonacoCodeEditor
                language="css"
                value={cssPane}
                onChange={setCssPane}
                height="160px"
              />
            </>
          ) : (
            <MonacoCodeEditor
              language={lang}
              value={code}
              onChange={setCode}
              height="260px"
            />
          )}
          <button
            type="button"
            className="btn-primary !py-2 !text-sm"
            disabled={busy}
            onClick={() => void run()}
          >
            ▶ {busy ? "…" : t.playground.run}
          </button>
        </div>
        <div className="space-y-2">
          <div className="min-h-[120px] rounded-xl bg-slate-950 p-3 font-mono text-xs text-green-300 whitespace-pre-wrap">
            {result?.stdout || t.playground.emptyOut}
            {result?.stderr ? (
              <p className="mt-2 text-red-400">
                stderr:{"\n"}
                {result.stderr}
              </p>
            ) : null}
          </div>
          {showPreview && result?.htmlPreview ? (
            <iframe
              title="preview"
              sandbox="allow-scripts"
              className="h-40 w-full rounded-xl border-2 border-slate-200 bg-white dark:border-slate-700"
              srcDoc={result.htmlPreview}
            />
          ) : null}
        </div>
      </div>

      <p className="mt-3 text-center text-[10px] text-ink-muted">
        {locale === "en" ? "Powered by" : "Працює на"} EduForge
      </p>
    </div>
  );
}
