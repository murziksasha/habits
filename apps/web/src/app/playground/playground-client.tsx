"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  EXTERNAL_LABS,
  PLAYGROUND_CHALLENGES,
  PLAYGROUND_EXAMPLES,
  PLAYGROUND_LANGS,
  pickLocale,
  type PlaygroundLang,
} from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import {
  runDomAsserts,
  runPlayground,
  type DomAssertResult,
  type RunResult,
} from "@/lib/playground-run";
import { DEFAULT_REACT_FILES } from "@/lib/react-playground-run";
import { MonacoCodeEditor } from "@/components/monaco-editor";
import {
  buildPlaygroundEmbedUrl,
  buildPlaygroundShareUrl,
  decodePlaygroundShare,
  playgroundEmbedIframeHtml,
} from "@/lib/playground-share";
import clsx from "clsx";
import type { DomAssert } from "@eduforge/shared";
import { PageLoading } from "@/components/page-loading";

type ChallengeRow = {
  id: string;
  lang: string;
  titleUk: string;
  titleEn: string;
  promptUk: string;
  promptEn: string;
  starterCode: string;
  starterHtml?: string;
  starterFiles?: Record<string, string>;
  xpReward: number;
  hintUk?: string;
  hintEn?: string;
  mode?: string;
  hasDomAsserts?: boolean;
  domAsserts?: DomAssert[];
  solved?: boolean;
};

export function PlaygroundClient() {
  const { user, token, loading, setCharacter, refresh } = useAuth();
  const { t, locale } = useLocale();
  const router = useRouter();
  const [lang, setLang] = useState<PlaygroundLang>("js");
  const [code, setCode] = useState(PLAYGROUND_EXAMPLES.find((e) => e.id === "js-sum")!.code);
  const [htmlPane, setHtmlPane] = useState(`<div class="card">Card</div>`);
  const [cssPane, setCssPane] = useState(`.card {
  padding: 16px;
  border-radius: 12px;
  background: #0ea5e9;
  color: white;
  font-family: system-ui;
}`);
  const [reactFiles, setReactFiles] = useState<Record<string, string>>({
    ...DEFAULT_REACT_FILES,
  });
  const [reactFileTab, setReactFileTab] = useState("App.tsx");
  const [result, setResult] = useState<RunResult | null>(null);
  const [exampleId, setExampleId] = useState<string | undefined>("js-sum");
  const [challenges, setChallenges] = useState<ChallengeRow[]>(
    PLAYGROUND_CHALLENGES.map((c) => ({ ...c, solved: false })),
  );
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);
  const [challengeMsg, setChallengeMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [myStats, setMyStats] = useState({ solved: 0, xp: 0, total: 0, maxXp: 0 });
  const [board, setBoard] = useState<
    { rank: number; displayName: string; score: number; solved: number }[]
  >([]);
  const [race, setRace] = useState<{
    weekKey: string;
    challengeIds: string[];
    entries: {
      rank: number;
      displayName: string;
      score: number;
      solved: number;
      bonusXp: number;
    }[];
  } | null>(null);
  const [classAssigns, setClassAssigns] = useState<
    {
      id: string;
      challengeId: string;
      className: string;
      titleUk?: string;
      titleEn?: string;
      solved: boolean;
      xpReward: number;
    }[]
  >([]);
  const [domResults, setDomResults] = useState<DomAssertResult[]>([]);
  const [raceMe, setRaceMe] = useState({ solved: 0, total: 0 });
  const [raceClaimMsg, setRaceClaimMsg] = useState("");
  const [shareMsg, setShareMsg] = useState("");
  const [shareHydrated, setShareHydrated] = useState(false);

  const loadChallenges = useCallback(async () => {
    if (!token) return;
    try {
      const d = await api<{ challenges: ChallengeRow[] }>("/playground/challenges", {
        token,
      });
      setChallenges(d.challenges);
      const me = await api<{
        solved: number;
        xp: number;
        totalChallenges: number;
        maxXp: number;
        race?: { solved: number; total: number };
      }>("/playground/me", { token });
      setMyStats({
        solved: me.solved,
        xp: me.xp,
        total: me.totalChallenges,
        maxXp: me.maxXp,
      });
      if (me.race) setRaceMe({ solved: me.race.solved, total: me.race.total });
    } catch {
      /* use static */
    }
  }, [token]);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  // Load shared snippet from ?share= or deep-link ?challenge= (once)
  useEffect(() => {
    if (shareHydrated || typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("share");
    const challengeQ = params.get("challenge");
    if (raw) {
      const payload = decodePlaygroundShare(raw);
      if (payload) {
        setLang(payload.lang);
        if (payload.lang === "css") {
          setCssPane(payload.css ?? payload.code);
          setHtmlPane(payload.html ?? htmlPane);
          setCode(payload.css ?? payload.code);
        } else {
          setCode(payload.code);
          if (payload.html) setHtmlPane(payload.html);
          if (payload.css) setCssPane(payload.css);
        }
        if (payload.challengeId) setActiveChallenge(payload.challengeId);
        setExampleId(undefined);
        setShareMsg(t.playground.shareLoaded);
      }
    } else if (challengeQ) {
      // Defer until challenges state ready — loadChallenge uses catalog
      const ch = PLAYGROUND_CHALLENGES.find((c) => c.id === challengeQ);
      if (ch) {
        setActiveChallenge(ch.id);
        setExampleId(undefined);
        setLang(ch.lang as PlaygroundLang);
        setCode(ch.starterCode);
        if (ch.starterHtml) setHtmlPane(ch.starterHtml);
        if (ch.lang === "css") setCssPane(ch.starterCode);
        setChallengeMsg("");
      }
    }
    if (raw || challengeQ) {
      const url = new URL(window.location.href);
      url.searchParams.delete("share");
      url.searchParams.delete("challenge");
      window.history.replaceState({}, "", url.pathname + url.search);
    }
    setShareHydrated(true);
  }, [shareHydrated, t.playground.shareLoaded, htmlPane]);

  useEffect(() => {
    void loadChallenges();
    void api<{
      entries: { rank: number; displayName: string; score: number; solved: number }[];
    }>("/playground/leaderboard")
      .then((d) => setBoard(d.entries.slice(0, 10)))
      .catch(() => setBoard([]));
    void api<{
      weekKey: string;
      challengeIds: string[];
      entries: {
        rank: number;
        displayName: string;
        score: number;
        solved: number;
        bonusXp: number;
      }[];
    }>("/playground/race/weekly")
      .then(setRace)
      .catch(() => setRace(null));
    if (token) {
      void api<{
        assignments: {
          id: string;
          challengeId: string;
          className: string;
          titleUk?: string;
          titleEn?: string;
          solved: boolean;
          xpReward: number;
        }[];
      }>("/playground/class-mine", { token })
        .then((d) => setClassAssigns(d.assignments))
        .catch(() => setClassAssigns([]));
    }
  }, [loadChallenges, token]);

  const examples = useMemo(
    () => PLAYGROUND_EXAMPLES.filter((e) => e.lang === lang),
    [lang],
  );

  const langChallenges = useMemo(
    () => challenges.filter((c) => c.lang === lang),
    [challenges, lang],
  );

  function loadExample(id: string) {
    const ex = PLAYGROUND_EXAMPLES.find((e) => e.id === id);
    if (!ex) return;
    setActiveChallenge(null);
    setExampleId(id);
    setLang(ex.lang);
    setCode(ex.code);
    if (ex.html) setHtmlPane(ex.html);
    if (ex.css) setCssPane(ex.css);
    if (ex.lang === "react") {
      const files = ex.files ?? {
        "App.tsx": ex.code,
        "styles.css": ex.css ?? DEFAULT_REACT_FILES["styles.css"]!,
      };
      setReactFiles(files);
      setReactFileTab(Object.keys(files)[0] ?? "App.tsx");
      setCode(files["App.tsx"] ?? ex.code);
    }
    setResult(null);
    setChallengeMsg("");
  }

  function loadChallenge(id: string) {
    const ch =
      challenges.find((c) => c.id === id) ??
      PLAYGROUND_CHALLENGES.find((c) => c.id === id);
    if (!ch) return;
    setActiveChallenge(id);
    setExampleId(undefined);
    setLang(ch.lang as PlaygroundLang);
    setCode(ch.starterCode);
    if ("starterHtml" in ch && ch.starterHtml) setHtmlPane(ch.starterHtml);
    if (ch.lang === "css") setCssPane(ch.starterCode);
    if (ch.lang === "react") {
      const files =
        ("starterFiles" in ch && ch.starterFiles) ||
        ({
          "App.tsx": ch.starterCode,
          "styles.css": DEFAULT_REACT_FILES["styles.css"]!,
        } as Record<string, string>);
      setReactFiles(files);
      setReactFileTab(Object.keys(files)[0] ?? "App.tsx");
      setCode(files["App.tsx"] ?? ch.starterCode);
    }
    setResult(null);
    setChallengeMsg("");
  }

  function sharePayload() {
    return {
      v: 1 as const,
      lang,
      code: lang === "css" ? cssPane : code,
      html:
        lang === "html" || lang === "css"
          ? lang === "html"
            ? code
            : htmlPane
          : undefined,
      css: lang === "css" ? cssPane : undefined,
      challengeId: activeChallenge,
    };
  }

  async function shareCode() {
    setShareMsg("");
    const url = buildPlaygroundShareUrl(window.location.origin, sharePayload());
    if (!url) {
      setShareMsg(t.playground.shareTooLarge);
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setShareMsg(t.playground.shareCopied);
    } catch {
      setShareMsg(url);
    }
  }

  async function shareEmbed() {
    setShareMsg("");
    const url = buildPlaygroundEmbedUrl(window.location.origin, sharePayload());
    if (!url) {
      setShareMsg(t.playground.shareTooLarge);
      return;
    }
    const html = playgroundEmbedIframeHtml(url);
    try {
      await navigator.clipboard.writeText(html);
      setShareMsg(t.playground.embedCopied);
    } catch {
      setShareMsg(html);
    }
  }

  async function run() {
    setBusy(true);
    setChallengeMsg("");
    try {
      const appCode =
        lang === "react" ? (reactFiles["App.tsx"] ?? code) : code;
      let r = await runPlayground(lang, appCode, {
        html: htmlPane,
        css: lang === "react" ? reactFiles["styles.css"] : cssPane,
        preferIframe: true,
        files: lang === "react" ? reactFiles : undefined,
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

      // DOM asserts for HTML/CSS/React challenges
      let domOk = true;
      const chMeta =
        activeChallenge &&
        (challenges.find((x) => x.id === activeChallenge) ||
          PLAYGROUND_CHALLENGES.find((x) => x.id === activeChallenge));
      const asserts =
        chMeta && "domAsserts" in chMeta
          ? (chMeta.domAsserts as DomAssert[] | undefined)
          : undefined;
      if (asserts?.length && (lang === "html" || lang === "css" || lang === "react")) {
        const doc =
          lang === "html"
            ? code
            : lang === "react"
              ? (r.htmlPreview ?? "")
              : `<!DOCTYPE html><html><head><style>${cssPane}</style></head><body>${htmlPane}</body></html>`;
        const dom = await runDomAsserts(
          doc,
          asserts,
          lang === "react" ? 6000 : 2000,
          lang === "react" ? 800 : 0,
        );
        setDomResults(dom.results);
        domOk = dom.pass;
        if (!dom.pass) {
          setChallengeMsg(t.playground.domFailed);
        }
      } else {
        setDomResults([]);
      }

      if (token) {
        void api("/playground/log", {
          method: "POST",
          token,
          body: {
            lang,
            success: r.ok,
            exampleId,
            isolated: r.isolated,
          },
        }).catch(() => undefined);
      }

      if (activeChallenge && token && domOk) {
        const source =
          lang === "css"
            ? cssPane
            : lang === "react"
              ? (reactFiles["App.tsx"] ?? code)
              : code;
        try {
          const sub = await api<{
            pass: boolean;
            xpGain: number;
            alreadySolved: boolean;
            character?: Parameters<typeof setCharacter>[0];
          }>("/playground/challenge/submit", {
            method: "POST",
            token,
            body: {
              challengeId: activeChallenge,
              stdout: r.stdout,
              source,
            },
          });
          if (sub.pass) {
            setChallengeMsg(
              sub.alreadySolved
                ? t.playground.alreadySolved
                : `${t.playground.passed} +${sub.xpGain} XP`,
            );
            if (sub.character) setCharacter(sub.character);
            else if (sub.xpGain) await refresh();
            await loadChallenges();
          } else if (r.ok || lang === "html" || lang === "css" || lang === "react") {
            setChallengeMsg(t.playground.failed);
          }
        } catch {
          setChallengeMsg(t.common.error);
        }
      }
    } finally {
      setBusy(false);
    }
  }

  if (loading || !user) return <PageLoading label={t.common.loading} />;

  const showCssPanes = lang === "css";
  const showReactStudio = lang === "react";
  const showPreview =
    Boolean(result?.htmlPreview) ||
    lang === "html" ||
    lang === "css" ||
    lang === "react";
  const activeMeta = activeChallenge
    ? challenges.find((c) => c.id === activeChallenge)
    : null;
  const reactTabs = Object.keys(reactFiles);

  const nextUnsolved = langChallenges.find((c) => !c.solved) ?? challenges.find((c) => !c.solved);

  return (
    <div className="space-y-4 pb-24 md:pb-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black">🖥️ {t.playground.title}</h1>
          <p className="text-sm font-bold text-ink-muted">{t.playground.hint}</p>
          <p className="text-xs font-bold text-sky mt-1">{t.playground.isolated}</p>
          <p className="text-xs font-bold text-ink-muted mt-1">
            {t.playground.myScore}: {myStats.solved}/{myStats.total || "—"} · {myStats.xp} XP
            {raceMe.total > 0 && (
              <>
                {" "}
                · {t.playground.race}: {raceMe.solved}/{raceMe.total}
              </>
            )}
          </p>
          {nextUnsolved && !activeChallenge && (
            <button
              type="button"
              className="mt-2 text-xs font-black text-brand hover:underline"
              onClick={() => loadChallenge(nextUnsolved.id)}
            >
              {locale === "en" ? "Next unsolved challenge" : "Наступний unsolved challenge"}:{" "}
              {pickLocale(locale, nextUnsolved.titleUk, nextUnsolved.titleEn)} →
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {PLAYGROUND_LANGS.map((l) => (
            <button
              key={l.id}
              type="button"
              className={clsx(
                "rounded-xl px-3 py-1.5 text-sm font-bold border-2",
                lang === l.id
                  ? "border-sky bg-sky/15"
                  : "border-slate-200 dark:border-slate-700",
              )}
              onClick={() => {
                setLang(l.id);
                setActiveChallenge(null);
                const first = PLAYGROUND_EXAMPLES.find((e) => e.lang === l.id);
                if (first) loadExample(first.id);
                else setResult(null);
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {race && (
        <section className="card space-y-2 border-grape/30">
          <h2 className="font-black">🏁 {t.playground.race} · {race.weekKey}</h2>
          <p className="text-xs font-bold text-ink-muted">{t.playground.raceHint}</p>
          <div className="flex flex-wrap gap-2">
            {race.challengeIds.map((id) => {
              const ch = PLAYGROUND_CHALLENGES.find((c) => c.id === id);
              if (!ch) return null;
              return (
                <button
                  key={id}
                  type="button"
                  className="btn-secondary !py-1.5 !px-3 text-xs"
                  onClick={() => loadChallenge(id)}
                >
                  {pickLocale(locale, ch.titleUk, ch.titleEn)}
                </button>
              );
            })}
          </div>
          {race.entries.slice(0, 5).map((e) => (
            <div key={e.rank} className="flex justify-between text-sm font-bold">
              <span>
                #{e.rank} {e.displayName}
              </span>
              <span className="text-ink-muted">
                {e.score} XP · +{e.bonusXp} {t.playground.bonus}
              </span>
            </div>
          ))}
          <button
            type="button"
            className="btn-secondary !py-1.5 text-sm"
            onClick={() => {
              if (!token) return;
              void api<{
                ok: boolean;
                xpGain?: number;
                error?: string;
                rank?: number;
                character?: Parameters<typeof setCharacter>[0];
              }>("/playground/race/claim-bonus", { method: "POST", token })
                .then(async (d) => {
                  if (d.ok) {
                    setRaceClaimMsg(`+${d.xpGain} XP (#${d.rank})`);
                    if (d.character) setCharacter(d.character);
                    else await refresh();
                  } else {
                    setRaceClaimMsg(d.error ?? t.common.error);
                  }
                })
                .catch(() => setRaceClaimMsg(t.common.error));
            }}
          >
            {t.playground.claimBonus}
          </button>
          {raceClaimMsg && (
            <p className="text-xs font-bold text-grape">{raceClaimMsg}</p>
          )}
        </section>
      )}

      {classAssigns.length > 0 && (
        <section className="card space-y-2 border-sky/30">
          <h2 className="font-black">🏫 {t.playground.classChallenges}</h2>
          {classAssigns.map((a) => (
            <div key={a.id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="font-bold">
                {a.solved ? "✓ " : ""}
                {locale === "en" ? a.titleEn || a.titleUk : a.titleUk}{" "}
                <span className="text-ink-muted">({a.className})</span>
              </span>
              <button
                type="button"
                className="btn-primary !py-1 !px-3 text-xs"
                onClick={() => loadChallenge(a.challengeId)}
              >
                {a.xpReward} XP →
              </button>
            </div>
          ))}
        </section>
      )}

      {langChallenges.length > 0 && (
        <section className="card space-y-2">
          <h2 className="font-black">{t.playground.challenges}</h2>
          <div className="flex flex-wrap gap-2">
            {langChallenges.map((ch) => (
              <button
                key={ch.id}
                type="button"
                className={clsx(
                  "rounded-xl border-2 px-3 py-1.5 text-xs font-bold",
                  activeChallenge === ch.id
                    ? "border-grape bg-grape/10"
                    : "border-slate-200 dark:border-slate-700",
                  ch.solved && "opacity-80",
                )}
                onClick={() => loadChallenge(ch.id)}
              >
                {ch.solved ? "✓ " : ""}
                {pickLocale(locale, ch.titleUk, ch.titleEn)} (+{ch.xpReward} XP)
              </button>
            ))}
          </div>
          {activeMeta && (
            <div className="rounded-xl bg-slate-50 p-3 text-sm dark:bg-slate-900">
              <p className="font-bold">
                {locale === "en" ? activeMeta.promptEn : activeMeta.promptUk}
              </p>
              {(activeMeta.hintUk || activeMeta.hintEn) && (
                <p className="mt-1 text-ink-muted">
                  💡 {locale === "en" ? activeMeta.hintEn : activeMeta.hintUk}
                </p>
              )}
            </div>
          )}
        </section>
      )}

      <div className="flex flex-wrap gap-2">
        {examples.map((ex) => (
          <button
            key={ex.id}
            type="button"
            className="btn-secondary !py-1.5 !px-3 text-xs"
            onClick={() => loadExample(ex.id)}
          >
            {pickLocale(locale, ex.titleUk, ex.titleEn)}
          </button>
        ))}
      </div>

      {lang === "react" && (
        <p className="text-xs font-bold text-ink-muted rounded-xl border-2 border-sky/30 bg-sky/5 px-3 py-2">
          {locale === "en"
            ? "React Studio: client TSX preview (Sucrase + esm.sh). Full Next.js / npm → external labs below or future WebContainers."
            : "React Studio: клієнтський TSX preview (Sucrase + esm.sh). Повний Next.js / npm → external labs нижче або майбутні WebContainers."}
        </p>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          {showCssPanes && (
            <>
              <label className="text-xs font-bold text-ink-muted">HTML</label>
              <MonacoCodeEditor
                language="html"
                value={htmlPane}
                onChange={setHtmlPane}
                height="140px"
              />
              <label className="text-xs font-bold text-ink-muted">CSS</label>
              <MonacoCodeEditor
                language="css"
                value={cssPane}
                onChange={setCssPane}
                height="200px"
              />
            </>
          )}
          {showReactStudio && (
            <>
              <div className="flex flex-wrap gap-1">
                {reactTabs.map((name) => (
                  <button
                    key={name}
                    type="button"
                    className={clsx(
                      "rounded-lg px-2 py-1 text-xs font-bold border-2",
                      reactFileTab === name
                        ? "border-sky bg-sky/15"
                        : "border-slate-200 dark:border-slate-700",
                    )}
                    onClick={() => setReactFileTab(name)}
                  >
                    {name}
                  </button>
                ))}
              </div>
              <MonacoCodeEditor
                language={
                  reactFileTab.endsWith(".css")
                    ? "css"
                    : reactFileTab.endsWith(".json")
                      ? "json"
                      : "typescript"
                }
                value={reactFiles[reactFileTab] ?? ""}
                onChange={(v) => {
                  setReactFiles((prev) => ({ ...prev, [reactFileTab]: v }));
                  if (reactFileTab === "App.tsx") setCode(v);
                }}
                height="360px"
              />
            </>
          )}
          {!showCssPanes && !showReactStudio && (
            <MonacoCodeEditor
              language={lang === "cpp" ? "cpp" : lang}
              value={code}
              onChange={setCode}
              height="360px"
            />
          )}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="btn-primary"
              disabled={busy}
              onClick={() => void run()}
            >
              ▶ {busy ? "…" : t.playground.run}
              {activeChallenge ? ` · ${t.playground.check}` : ""}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => void shareCode()}
            >
              🔗 {t.playground.share}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => void shareEmbed()}
            >
              {"</>"} {t.playground.shareEmbed}
            </button>
          </div>
          {shareMsg && (
            <p className="text-sm font-bold text-sky break-all">{shareMsg}</p>
          )}
          {challengeMsg && (
            <p className="text-sm font-bold text-grape">{challengeMsg}</p>
          )}
          {domResults.length > 0 && (
            <div className="rounded-xl border-2 border-slate-100 p-3 text-xs font-mono space-y-1 dark:border-slate-700">
              <p className="font-bold font-sans">{t.playground.domResults}</p>
              {domResults.map((d, i) => (
                <p key={i} className={d.pass ? "text-green-600" : "text-red-500"}>
                  {d.pass ? "✓" : "✗"} {d.selector}: {d.detail}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="card min-h-[160px] bg-slate-950 text-green-300 font-mono text-sm whitespace-pre-wrap">
            <p className="text-xs text-slate-400 mb-2">
              stdout
              {result?.isolated ? ` · ${t.playground.isolatedBadge}` : ""}
            </p>
            {result?.stdout || t.playground.emptyOut}
            {result?.stderr && (
              <p className="mt-3 text-red-400">
                stderr:{"\n"}
                {result.stderr}
              </p>
            )}
          </div>
          {showPreview && (
            <div className="card overflow-hidden p-0">
              <p className="px-3 py-2 text-xs font-bold text-ink-muted border-b border-slate-100 dark:border-slate-800">
                {t.playground.preview}
                {activeMeta?.mode === "source" ? ` · ${t.playground.visualCheck}` : ""}
              </p>
              <iframe
                title="preview"
                sandbox="allow-scripts"
                className="h-64 w-full bg-white"
                srcDoc={
                  result?.htmlPreview ??
                  (lang === "html"
                    ? code
                    : lang === "css"
                      ? `<style>${cssPane}</style>${htmlPane}`
                      : lang === "react"
                        ? "<p style='padding:12px;font:14px system-ui'>Press Run for React preview…</p>"
                        : "<p></p>")
                }
              />
            </div>
          )}

          <section className="card space-y-2 border-dashed border-2 border-slate-200 dark:border-slate-700">
            <h2 className="font-black text-sm">
              {locale === "en"
                ? "Node Studio & external labs"
                : "Node Studio і зовнішні labs"}
            </h2>
            <p className="text-xs font-bold text-ink-muted">
              {locale === "en"
                ? "In-app Node/npm via WebContainers (SPEC 76). Playwright still external."
                : "Node/npm у додатку через WebContainers (SPEC 76). Playwright — зовнішній lab."}
            </p>
            <a
              href="/studio/node"
              className="rounded-xl border-2 border-sky/40 bg-sky/5 px-3 py-2 text-sm font-bold block hover:border-sky"
            >
              📦 Node Studio (WebContainers)
              <span className="block text-xs font-bold text-ink-muted mt-0.5">
                {locale === "en"
                  ? "Express / Node / optional Next — Install + Run + preview (full page load for COOP/COEP)"
                  : "Express / Node / optional Next — Install + Run + preview (повне завантаження сторінки для COOP/COEP)"}
              </span>
            </a>
            <div className="flex flex-col gap-2">
              {EXTERNAL_LABS.map((lab) => (
                <a
                  key={lab.id}
                  href={lab.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border-2 border-slate-100 px-3 py-2 text-sm font-bold hover:border-sky dark:border-slate-800"
                >
                  <span className="text-sky uppercase text-[10px]">{lab.stack}</span>
                  <br />
                  {pickLocale(locale, lab.titleUk, lab.titleEn)}
                  <span className="block text-xs font-bold text-ink-muted mt-0.5">
                    {pickLocale(locale, lab.descriptionUk, lab.descriptionEn)}
                  </span>
                </a>
              ))}
            </div>
          </section>

          {board.length > 0 && (
            <div className="card space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="font-black">🏆 {t.playground.leaderboard}</h2>
                <Link href="/leaderboard?tab=playground" className="text-xs font-bold text-sky">
                  {t.common.back === "Назад" ? "Усі" : "All"} →
                </Link>
              </div>
              {board.map((e) => (
                <div key={e.rank} className="flex justify-between text-sm font-bold">
                  <span>
                    #{e.rank} {e.displayName}
                  </span>
                  <span className="text-ink-muted">
                    {e.solved} ch · {e.score} XP
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-16 z-30 border-t border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur md:bottom-0 dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-2">
          <p className="truncate text-sm font-bold">
            {activeMeta
              ? pickLocale(locale, activeMeta.titleUk, activeMeta.titleEn)
              : lang.toUpperCase()}
            {challengeMsg ? ` · ${challengeMsg}` : ""}
          </p>
          <div className="flex gap-2">
            {nextUnsolved && activeChallenge !== nextUnsolved.id ? (
              <button
                type="button"
                className="btn-secondary !py-2 text-sm"
                onClick={() => loadChallenge(nextUnsolved.id)}
              >
                {locale === "en" ? "Next challenge" : "Наступний"}
              </button>
            ) : null}
            <button
              type="button"
              className="btn-primary !py-2 text-sm"
              disabled={busy}
              onClick={() => void run()}
            >
              ▶ {busy ? "…" : t.playground.run}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
