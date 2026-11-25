"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Chess, type Square } from "@eduforge/chess-core";
import { ChessBoardFrame, type BoardArrow } from "@/components/chess-board-frame";
import { MoveHistoryPanel } from "@/components/move-history-panel";
import { PageLoading } from "@/components/page-loading";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { useRequireAuth } from "@/lib/use-require-auth";

type LineView = {
  key: string;
  nameUk: string;
  nameEn: string;
  sans: string[];
  comments: Record<string, [string, string]>;
  repetitions: number;
  dueAt: string | null;
  due: boolean;
  started: boolean;
};
type RepView = { id: string; side: "w" | "b"; titleUk: string; titleEn: string; unit: string; lines: LineView[] };

type Session = { rep: RepView; line: LineView; ply: number; tries: string[][]; wrong: { san: string; correct: string } | null };

export function OpeningsClient() {
  const { ready } = useRequireAuth();
  const { token } = useAuth();
  const { t, locale } = useLocale();
  const en = locale === "en";
  const [reps, setReps] = useState<RepView[] | null>(null);
  const [side, setSide] = useState<"w" | "b">("w");
  const [session, setSession] = useState<Session | null>(null);
  const [result, setResult] = useState<{ correct: boolean; intervalDays: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const load = useCallback(() => {
    api<{ repertoires: RepView[] }>("/chess/openings", { token })
      .then((d) => setReps(d.repertoires))
      .catch(() => setError(t.common.error));
  }, [token, t.common.error]);

  useEffect(() => {
    if (ready) load();
  }, [ready, load]);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  /** Due lines first, then new ones. */
  function nextLine(rep: RepView, skip?: string): LineView | null {
    const due = rep.lines.filter((l) => l.started && l.due && l.key !== skip);
    const fresh = rep.lines.filter((l) => !l.started && l.key !== skip);
    return due[0] ?? fresh[0] ?? null;
  }

  function start(rep: RepView, line: LineView | null) {
    if (!line) return;
    setResult(null);
    setSession({ rep, line, ply: 0, tries: [], wrong: null });
  }

  // Auto-play the opponent's moves from the line.
  useEffect(() => {
    if (!session || result) return;
    const { rep, line, ply } = session;
    if (ply >= line.sans.length) return;
    const learnerToMove = (ply % 2 === 0) === (rep.side === "w");
    if (learnerToMove) return;
    timer.current = setTimeout(() => setSession((s) => (s ? { ...s, ply: s.ply + 1, wrong: null } : s)), 450);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [session, result]);

  // Finished: grade on the server.
  useEffect(() => {
    if (!session || result || session.ply < session.line.sans.length) return;
    const { rep, line, tries } = session;
    api<{ correct: boolean; intervalDays: number }>(
      `/chess/openings/${encodeURIComponent(rep.id)}/lines/${encodeURIComponent(line.key)}/attempt`,
      { token, body: { tries } },
    )
      .then((r) => {
        setResult(r);
        load();
      })
      .catch(() => setError(t.common.error));
  }, [session, result, token, load, t.common.error]);

  const fen = useMemo(() => {
    const g = new Chess();
    if (session) for (const san of session.line.sans.slice(0, session.ply)) g.move(san);
    return g.fen();
  }, [session]);
  const lastMove = useMemo(() => {
    if (!session || session.ply === 0) return null;
    const g = new Chess();
    let mv: { from: string; to: string } | null = null;
    for (const san of session.line.sans.slice(0, session.ply)) mv = g.move(san);
    return mv;
  }, [session]);

  function onMove(from: string, to: string, promotion?: "q" | "r" | "b" | "n") {
    if (!session || result) return false;
    const { line, ply } = session;
    const g = new Chess(fen);
    let san: string;
    try {
      san = g.move({ from: from as Square, to: to as Square, promotion }).san;
    } catch {
      return false;
    }
    const expected = line.sans[ply]!;
    // While a wrong try is pending, the last entry of `tries` belongs to this ply.
    const base = session.wrong ? session.tries.slice(0, -1) : session.tries;
    const attempt = [...(session.wrong ? (session.tries.at(-1) ?? []) : []), san];
    if (san !== expected) {
      setSession({ ...session, tries: [...base, attempt], wrong: { san, correct: expected } });
      return false;
    }
    setSession({ ...session, ply: ply + 1, tries: [...base, attempt], wrong: null });
    return true;
  }

  if (!ready || (!reps && !error)) return <PageLoading label={t.common.loading} />;
  if (error && !reps) return <p className="card">{error}</p>;

  const list = (reps ?? []).filter((r) => r.side === side);
  const comment = session && session.ply > 0 ? session.line.comments[String(session.ply - 1)] : undefined;
  const wrongComment = session?.wrong ? session.line.comments[String(session.ply)] : undefined;
  const arrows: BoardArrow[] = [];
  if (session?.wrong) {
    const g = new Chess(fen);
    try {
      const m = g.move(session.wrong.correct);
      arrows.push([m.from as Square, m.to as Square, "rgba(22,163,74,0.8)"]);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="space-y-4 pb-20 md:pb-0">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2 className="text-2xl font-black">📖 {t.chess.openingTrainer}</h2>
        <Link href="/play" className="btn-secondary">
          ♟️ {t.chess.playOnline}
        </Link>
      </div>

      {!session && (
        <>
          <div className="flex gap-2" role="tablist">
            {(["w", "b"] as const).map((s) => (
              <button
                key={s}
                type="button"
                role="tab"
                aria-selected={side === s}
                className={side === s ? "btn-primary" : "btn-secondary"}
                onClick={() => setSide(s)}
              >
                {s === "w" ? t.chess.openingSideWhite : t.chess.openingSideBlack}
              </button>
            ))}
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {list.map((r) => {
              const due = r.lines.filter((l) => l.started && l.due).length;
              const fresh = r.lines.filter((l) => !l.started).length;
              return (
                <div key={r.id} className="card space-y-2" data-testid={`repertoire-${r.id}`}>
                  <p className="text-lg font-black">{en ? r.titleEn : r.titleUk}</p>
                  <p className="text-sm text-ink-muted">
                    {t.chess.dueLines}: <strong>{due}</strong> · {t.chess.openingNewLines}: <strong>{fresh}</strong>
                  </p>
                  <ul className="space-y-1 text-sm">
                    {r.lines.map((l) => (
                      <li key={l.key}>
                        <button type="button" className="underline" onClick={() => start(r, l)}>
                          {en ? l.nameEn : l.nameUk}
                        </button>
                        {l.started && !l.due && l.dueAt ? <span className="text-ink-muted"> · ✓</span> : null}
                      </li>
                    ))}
                  </ul>
                  <button type="button" className="btn-primary" disabled={!nextLine(r)} onClick={() => start(r, nextLine(r))}>
                    {nextLine(r) ? t.chess.openingNext : t.chess.openingAllDone}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}

      {session && (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="mx-auto w-full max-w-[480px] space-y-3">
            <p className="text-center font-black">
              {en ? session.rep.titleEn : session.rep.titleUk} — {en ? session.line.nameEn : session.line.nameUk}
            </p>
            <ChessBoardFrame
              fen={fen}
              mode="play"
              orientation={session.rep.side === "w" ? "white" : "black"}
              viewer={session.rep.side}
              interactive={!result}
              onMove={onMove}
              lastMove={lastMove}
              arrows={arrows}
              boardWidth={420}
            />
            <p className="text-center text-sm font-bold" role="status" aria-live="polite">
              {result
                ? `${result.correct ? "✅" : "🔁"} ${t.chess.lineComplete} · ${t.chess.openingNextReview.replace("{n}", String(result.intervalDays))}`
                : session.wrong
                  ? `❌ ${t.chess.openingWrong} ${session.wrong.correct}`
                  : t.chess.openingYourMove}
            </p>
          </div>
          <div className="card space-y-3">
            {session.wrong && wrongComment && <p className="rounded-xl bg-surface-muted p-3 text-sm">{en ? wrongComment[1] : wrongComment[0]}</p>}
            {!session.wrong && comment && <p className="rounded-xl bg-surface-muted p-3 text-sm">{en ? comment[1] : comment[0]}</p>}
            <MoveHistoryPanel sans={session.line.sans.slice(0, session.ply)} current={session.ply - 1} title={t.chess.moveHistory} />
            <div className="flex flex-wrap gap-2">
              {result && (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    const fresh = reps?.find((r) => r.id === session.rep.id) ?? session.rep;
                    start(fresh, nextLine(fresh, session.line.key));
                  }}
                >
                  {t.chess.openingNext}
                </button>
              )}
              <button type="button" className="btn-secondary" onClick={() => setSession(null)}>
                {t.chess.chooseOpening}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
