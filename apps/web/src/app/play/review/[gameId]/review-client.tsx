"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { replayHistory } from "@eduforge/chess-core";
import { ChessBoardFrame } from "@/components/chess-board-frame";
import { MoveHistoryPanel, type HistoryLabel } from "@/components/move-history-panel";
import { PageLoading } from "@/components/page-loading";
import { api, API_URL } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { useRequireAuth } from "@/lib/use-require-auth";

type Annotation = { ply: number; label: HistoryLabel; bestSan: string | null; evalBeforeCp: number | null; evalAfterCp: number | null };
type GameRes = {
  game: { id: string; pgn: string; startFen: string; result: string | null; termination: string | null; whiteId: string | null; blackId: string | null; analysisStatus: string | null };
  annotations: Annotation[];
};

const START = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export function GameReviewClient({ gameId }: { gameId: string }) {
  const { ready } = useRequireAuth();
  const { token, user } = useAuth();
  const { t } = useLocale();
  const [data, setData] = useState<GameRes | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ply, setPly] = useState(-1);

  const load = useCallback(() => {
    api<GameRes>(`/chess/games/${encodeURIComponent(gameId)}`, { token })
      .then(setData)
      .catch(() => setError(t.common.error));
  }, [gameId, token, t.common.error]);

  useEffect(() => {
    if (ready) load();
  }, [ready, load]);

  // Poll while the analysis is running.
  useEffect(() => {
    if (!data || (data.game.analysisStatus && data.game.analysisStatus !== "pending")) return;
    const id = setTimeout(load, 4000);
    return () => clearTimeout(id);
  }, [data, load]);

  const sans = useMemo(() => (data?.game.pgn ?? "").split(" ").filter(Boolean), [data]);
  const startFen = data?.game.startFen && data.game.startFen !== "startpos" ? data.game.startFen : START;
  const positions = useMemo(() => {
    const g = replayHistory(startFen, []);
    const out = [startFen];
    const moves: ({ from: string; to: string } | null)[] = [null];
    for (const san of sans) {
      const m = g?.move(san);
      if (!m || !g) break;
      out.push(g.fen());
      moves.push({ from: m.from, to: m.to });
    }
    return { fens: out, moves };
  }, [sans, startFen]);
  const labels = useMemo(() => new Map((data?.annotations ?? []).map((a) => [a.ply, a.label])), [data]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setPly((p) => Math.max(-1, p - 1));
      if (e.key === "ArrowRight") setPly((p) => Math.min(sans.length - 1, p + 1));
      if (e.key === "Home") setPly(-1);
      if (e.key === "End") setPly(sans.length - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sans.length]);

  if (!ready || (!data && !error)) return <PageLoading label={t.common.loading} />;
  if (error || !data) return <p className="card">{error}</p>;

  const youAreBlack = data.game.blackId === user?.id && data.game.whiteId !== user?.id;
  const ann = data.annotations.find((a) => a.ply === ply);
  const labelText = (l: HistoryLabel) =>
    l === "blunder" ? t.chess.blunder : l === "mistake" || l === "possible_blunder" ? t.chess.mistake : t.chess.inaccuracy;

  return (
    <div className="space-y-4 pb-20 md:pb-0">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2 className="text-2xl font-black">
          🔍 {t.chess.reviewGame} · {data.game.result ?? "*"}
          {data.game.termination === "threefold" ? ` · ${t.chess.threefold}` : ""}
        </h2>
        <div className="flex gap-2">
          <a className="btn-secondary" href={`${API_URL}/chess/games/${gameId}/pgn`} target="_blank" rel="noreferrer">
            PGN
          </a>
          <Link href="/play" className="btn-secondary">
            ♟️ {t.chess.playOnline}
          </Link>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="mx-auto w-full max-w-[480px] space-y-3">
          <ChessBoardFrame
            fen={positions.fens[ply + 1] ?? startFen}
            mode="explore"
            orientation={youAreBlack ? "black" : "white"}
            interactive={false}
            lastMove={positions.moves[ply + 1] ?? null}
            boardWidth={420}
          />
          <div className="flex justify-center gap-2" role="toolbar">
            <button type="button" className="btn-secondary" aria-label={t.chess.firstMove} onClick={() => setPly(-1)}>
              ⟨⟨
            </button>
            <button type="button" className="btn-secondary" aria-label={t.chess.prevMove} onClick={() => setPly((p) => Math.max(-1, p - 1))}>
              ⟨
            </button>
            <button type="button" className="btn-secondary" aria-label={t.chess.nextMove} onClick={() => setPly((p) => Math.min(sans.length - 1, p + 1))}>
              ⟩
            </button>
            <button type="button" className="btn-secondary" aria-label={t.chess.lastMoveBtn} onClick={() => setPly(sans.length - 1)}>
              ⟩⟩
            </button>
          </div>
        </div>
        <div className="card space-y-3">
          {ann ? (
            <div className="rounded-xl bg-surface-muted p-3 text-sm" data-testid="annotation">
              <p className="font-black">{labelText(ann.label)}</p>
              {ann.bestSan && (
                <p>
                  {t.chess.bestWas}: <strong>{ann.bestSan}</strong>
                </p>
              )}
              {ann.evalBeforeCp !== null && ann.evalAfterCp !== null && (
                <p className="font-mono text-xs">
                  {ann.evalBeforeCp} → {ann.evalAfterCp} cp
                </p>
              )}
            </div>
          ) : null}
          {(!data.game.analysisStatus || data.game.analysisStatus === "pending") && <p className="text-sm">{t.chess.analysisPending}</p>}
          {data.game.analysisStatus === "done" && data.annotations.length === 0 && <p className="text-sm">{t.chess.noAnnotations}</p>}
          <MoveHistoryPanel sans={sans} current={ply} onSelect={setPly} labels={labels} title={t.chess.moveHistory} />
        </div>
      </div>
    </div>
  );
}
