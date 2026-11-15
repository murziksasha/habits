"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { io, type Socket } from "socket.io-client";
import { ChessBoardFrame } from "@/components/chess-board-frame";
import {
  Chess,
  chooseBotMove,
  gameTermination,
  type BotLevel,
  type BotMove,
} from "@eduforge/chess-core";
import { CHESS_TIME_CONTROLS } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { Suspense } from "react";
import { PageLoading } from "@/components/page-loading";
import { setPlayMatchActive } from "@/lib/play-match";

const REALTIME_URL = process.env.NEXT_PUBLIC_REALTIME_URL ?? "http://localhost:4001";

type MatchPlayer = {
  userId: string;
  displayName: string;
  elo?: number;
  levelLabel?: string;
};

type MatchInfo = {
  gameId: string;
  fen: string;
  youAre: "w" | "b";
  white: MatchPlayer;
  black: MatchPlayer;
  whiteTimeMs: number;
  blackTimeMs: number;
  timeControl: string;
  rated: boolean;
  vsBot?: boolean;
  botLevel?: BotLevel;
};

async function requestBotMove(currentFen: string, level: BotLevel): Promise<BotMove | null> {
  if (level === "strong" && typeof window !== "undefined" && typeof Worker !== "undefined") {
    try {
      const move = await new Promise<BotMove | null>((resolve, reject) => {
        const worker = new Worker(new URL("./chess-bot-worker.ts", import.meta.url));
        const timeout = setTimeout(() => {
          worker.terminate();
          reject(new Error("worker_timeout"));
        }, 3000);
        worker.onmessage = (e) => {
          clearTimeout(timeout);
          worker.terminate();
          if (e.data?.ok) {
            resolve(e.data.move ?? null);
          } else {
            reject(new Error(e.data?.error ?? "worker_failed"));
          }
        };
        worker.onerror = (err) => {
          clearTimeout(timeout);
          worker.terminate();
          reject(err);
        };
        worker.postMessage({ fen: currentFen, level: "strong" });
      });
      return move;
    } catch {
      // Strong falls back to Club if worker fails
      return chooseBotMove(currentFen, "club");
    }
  }

  return chooseBotMove(currentFen, level);
}

function PlayPageInner() {
  const { user, token, loading, character } = useAuth();
  const { t, locale } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const inviteParam = searchParams.get("invite");
  const [elo, setElo] = useState(1000);
  const [timeControl, setTimeControl] = useState("5+0");
  const [rated, setRated] = useState(true);
  const [seeking, setSeeking] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [match, setMatch] = useState<MatchInfo | null>(null);
  const [fen, setFen] = useState("start");
  const [whiteTime, setWhiteTime] = useState(0);
  const [blackTime, setBlackTime] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [gameOverReason, setGameOverReason] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [inviteId, setInviteId] = useState<string | null>(null);
  const [inviteUrl, setInviteUrl] = useState("");
  const [joinCode, setJoinCode] = useState(inviteParam ?? "");
  const [copied, setCopied] = useState(false);
  const [hintText, setHintText] = useState("");
  const [hintLoading, setHintLoading] = useState(false);

  // Bot practice options
  const [botLevel, setBotLevel] = useState<BotLevel>(() => {
    const p = searchParams.get("level");
    if (p === "learner" || p === "club" || p === "strong") return p;
    return "club";
  });
  const [botColor, setBotColor] = useState<"w" | "b">("w");

  const testFen = process.env.NODE_ENV !== "production" ? searchParams.get("testFen") : null;

  useEffect(() => {
    if (process.env.NODE_ENV === "production" || !testFen) return;
    try {
      const viewer = (searchParams.get("testViewer") as "w" | "b") || "w";
      const reason = searchParams.get("testReason") as "checkmate" | "stalemate" | null;
      const testResult = searchParams.get("testResult") as "1-0" | "0-1" | "1/2-1/2" | null;
      setMatch({
        gameId: "test-game",
        fen: testFen,
        youAre: viewer,
        white: { userId: "me", displayName: t.chess.you, elo: 1200 },
        black: { userId: "opponent", displayName: t.chess.opponent, elo: 1200 },
        whiteTimeMs: 300_000,
        blackTimeMs: 300_000,
        timeControl: "5+0",
        rated: false,
        vsBot: true,
      });
      setFen(testFen);
      if (reason) {
        setGameOverReason(reason);
        if (testResult) {
          setResult(testResult);
        } else if (reason === "checkmate") {
          setResult(viewer === "w" ? "1-0" : "0-1");
        } else if (reason === "stalemate") {
          setResult("1/2-1/2");
        }
      }
    } catch {
      /* ignore invalid test FEN */
    }
  }, [testFen, searchParams, t]);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  // Hide sticky Continue during seek or live match (board focus)
  useEffect(() => {
    setPlayMatchActive(Boolean(match) || seeking);
    return () => setPlayMatchActive(false);
  }, [match, seeking]);

  useEffect(() => {
    if (!token) return;
    void api<{ rating: { elo: number } }>("/chess/rating/me", { token }).then((d) =>
      setElo(d.rating.elo),
    );
  }, [token]);

  useEffect(() => {
    if (!token) return;
    const s = io(REALTIME_URL, {
      auth: { token },
      transports: ["websocket", "polling"],
    });
    setSocket(s);

    s.on("seeking", () => setSeeking(true));
    s.on("match_found", (m: MatchInfo) => {
      setSeeking(false);
      setInviteId(null);
      setMatch({ ...m, vsBot: false });
      setFen(m.fen);
      setWhiteTime(m.whiteTimeMs);
      setBlackTime(m.blackTimeMs);
      setResult(null);
      setGameOverReason(null);
      setStatus("");
      s.emit("join_game", { gameId: m.gameId });
    });
    s.on(
      "moved",
      (p: {
        fen: string;
        whiteTimeMs: number;
        blackTimeMs: number;
      }) => {
        setFen(p.fen);
        setWhiteTime(p.whiteTimeMs);
        setBlackTime(p.blackTimeMs);
      },
    );
    s.on("game_over", (p: { result?: string; reason?: string }) => {
      setResult(p.result ?? "finished");
      setGameOverReason(p.reason ?? null);
      setStatus(p.reason ?? "");
      setSeeking(false);
    });

    return () => {
      s.disconnect();
    };
  }, [token]);

  // Auto-join invite from URL
  useEffect(() => {
    if (!socket || !inviteParam || match) return;
    markTriedChess();
    socket.emit(
      "join_invite",
      { gameId: inviteParam },
      (res: {
        error?: string;
        waiting?: boolean;
        matched?: boolean;
        gameId?: string;
        fen?: string;
        youAre?: "w" | "b";
        whiteTimeMs?: number;
        blackTimeMs?: number;
        timeControl?: string;
      }) => {
        if (res?.error) {
          setStatus(res.error === "unavailable" ? t.chess.inviteUnavailable : res.error);
          return;
        }
        if (res?.waiting) {
          setInviteId(res.gameId ?? inviteParam);
          setStatus(t.chess.inviteWaiting);
        }
      },
    );
    // markTriedChess is stable enough for this flow
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, inviteParam, t]);

  // local clock tick (online + bot)
  useEffect(() => {
    if (!match || result) return;
    const turn = fen === "start" ? "w" : new Chess(fen).turn();
    const tInterval = setInterval(() => {
      if (turn === "w") setWhiteTime((x) => Math.max(0, x - 250));
      else setBlackTime((x) => Math.max(0, x - 250));
    }, 250);
    return () => clearInterval(tInterval);
  }, [match, fen, result]);

  // Bot move when it is the bot's turn in bot games
  useEffect(() => {
    if (!match?.vsBot || result) return;
    const game = fen === "start" ? new Chess() : new Chess(fen);
    if (game.isGameOver()) return;
    const botSide = match.youAre === "w" ? "b" : "w";
    if (game.turn() !== botSide) return;

    let active = true;
    const timer = setTimeout(async () => {
      const move = await requestBotMove(game.fen(), match.botLevel ?? "club");
      if (!active || !move) return;
      const g = new Chess(game.fen());
      try {
        g.move({ from: move.from, to: move.to, promotion: move.promotion });
      } catch {
        return;
      }
      setFen(g.fen());
      const term = gameTermination(g.fen());
      if (term.over) {
        setResult(term.result);
        setGameOverReason(term.reason);
        if (term.reason) setStatus(term.reason);
      }
    }, 450 + Math.random() * 500);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [match, fen, result]);

  const orientation = match?.youAre === "b" ? "black" : "white";
  const myTurn = useMemo(() => {
    if (!match || result) return false;
    const turn = fen === "start" ? "w" : new Chess(fen).turn();
    return turn === match.youAre;
  }, [match, fen, result]);

  function formatMs(ms: number) {
    const s = Math.ceil(ms / 1000);
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${r.toString().padStart(2, "0")}`;
  }

  function markTriedChess() {
    if (!token) return;
    void api("/auth/onboarding/complete", {
      method: "POST",
      token,
      body: { key: "triedChess" },
    }).catch(() => undefined);
  }

  function findMatch() {
    if (!socket) return;
    setResult(null);
    setGameOverReason(null);
    markTriedChess();
    socket.emit("seek", { timeControl, rated }, (res: { error?: string }) => {
      if (res?.error === "rated_limit") {
        setStatus(t.chess.seekFailed);
        setSeeking(false);
      } else {
        setSeeking(true);
      }
    });
  }

  function cancelSeek() {
    socket?.emit("cancel_seek");
    setSeeking(false);
  }

  function getLevelLabel(lvl: BotLevel): string {
    if (lvl === "learner") return t.chess.levelLearner;
    if (lvl === "club") return t.chess.levelClub;
    return t.chess.levelStrong;
  }

  function startBotGame() {
    cancelSeek();
    markTriedChess();
    const ms =
      CHESS_TIME_CONTROLS.find((tc) => tc.id === timeControl)?.initialMs ?? 300_000;
    const chess = new Chess();
    const levelLabel = getLevelLabel(botLevel);
    const youAre = botColor;

    const userPlayer: MatchPlayer = {
      userId: user?.id ?? "me",
      displayName: character?.displayName ?? t.chess.you,
      elo,
    };
    const botPlayer: MatchPlayer = {
      userId: "bot",
      displayName: t.chess.botName,
      levelLabel,
    };

    setMatch({
      gameId: `bot-${Date.now()}`,
      fen: chess.fen(),
      youAre,
      white: youAre === "w" ? userPlayer : botPlayer,
      black: youAre === "b" ? userPlayer : botPlayer,
      whiteTimeMs: ms,
      blackTimeMs: ms,
      timeControl,
      rated: false,
      vsBot: true,
      botLevel,
    });
    setFen(chess.fen());
    setWhiteTime(ms);
    setBlackTime(ms);
    setResult(null);
    setGameOverReason(null);
    setStatus("");
  }

  function createInvite() {
    if (!socket) return;
    cancelSeek();
    markTriedChess();
    socket.emit(
      "create_invite",
      { timeControl },
      (res: {
        error?: string;
        gameId?: string;
        fen?: string;
        whiteTimeMs?: number;
        blackTimeMs?: number;
        youAre?: "w" | "b";
      }) => {
        if (res?.error || !res?.gameId) {
          setStatus(res?.error ?? "error");
          return;
        }
        setInviteId(res.gameId);
        const url = `${window.location.origin}/play?invite=${res.gameId}`;
        setInviteUrl(url);
        setStatus(t.chess.inviteWaiting);
        setFen(res.fen ?? "start");
        setWhiteTime(res.whiteTimeMs ?? 300_000);
        setBlackTime(res.blackTimeMs ?? 300_000);
      },
    );
  }

  async function copyInvite() {
    if (!inviteUrl) return;
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setStatus(inviteUrl);
    }
  }

  function joinInvite() {
    if (!socket || !joinCode.trim()) return;
    markTriedChess();
    const id = joinCode.trim();
    socket.emit("join_invite", { gameId: id }, (res: { error?: string }) => {
      if (res?.error) {
        setStatus(
          res.error === "cannot_join_own"
            ? t.chess.cannotJoinOwn
            : t.chess.inviteUnavailable,
        );
      }
    });
  }

  async function requestHint() {
    if (!token || fen === "start") return;
    setHintLoading(true);
    setHintText("");
    try {
      const d = await api<{
        hint: {
          bestMove: { san: string; from: string; to: string } | null;
          evalCp: number;
          commentUk: string;
          commentEn: string;
        };
      }>("/coach/hint", {
        method: "POST",
        token,
        body: { fen, depth: 2 },
      });
      const h = d.hint;
      const comment = locale === "en" ? h.commentEn : h.commentUk;
      setHintText(
        h.bestMove
          ? `${h.bestMove.san} (${h.bestMove.from}→${h.bestMove.to}) · ${h.evalCp}cp · ${comment}`
          : comment,
      );
    } catch {
      setHintText(t.common.error);
    } finally {
      setHintLoading(false);
    }
  }

  function onDrop(from: string, to: string) {
    if (!match || !myTurn) return false;

    if (match.vsBot) {
      const g = fen === "start" ? new Chess() : new Chess(fen);
      try {
        const m = g.move({ from, to, promotion: "q" });
        if (!m) return false;
        setFen(g.fen());
        const term = gameTermination(g.fen());
        if (term.over) {
          setResult(term.result);
          setGameOverReason(term.reason);
          if (term.reason) setStatus(term.reason);
        }
        return true;
      } catch {
        return false;
      }
    }

    if (!socket) return false;
    socket.emit(
      "move",
      { gameId: match.gameId, from, to, promotion: "q" },
      (res: { error?: string; fen?: string }) => {
        if (res?.error) setStatus(res.error);
        if (res?.fen) setFen(res.fen);
      },
    );
    return true;
  }

  function resign() {
    if (!match) return;
    if (match.vsBot) {
      setResult(match.youAre === "w" ? "0-1" : "1-0");
      setGameOverReason("resign");
      return;
    }
    socket?.emit("resign", { gameId: match.gameId });
  }

  const endReason: "checkmate" | "stalemate" | null =
    gameOverReason === "checkmate" || gameOverReason === "stalemate"
      ? gameOverReason
      : null;

  const cardEndLine = useMemo(() => {
    if (!endReason) return null;
    if (endReason === "stalemate") {
      return t.chess.draw;
    }
    if (endReason === "checkmate") {
      if (!result) return null;
      if (result === "1-0") {
        return match?.youAre === "w" ? t.chess.cardYouWon : t.chess.cardYouLost;
      }
      if (result === "0-1") {
        return match?.youAre === "b" ? t.chess.cardYouWon : t.chess.cardYouLost;
      }
    }
    return null;
  }, [endReason, result, match?.youAre, t.chess]);

  if (loading || !user) return <PageLoading label={t.common.loading} />;

  return (
    <div className={`space-y-6 ${match ? "" : "pb-20 md:pb-0"}`}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">♟️ {t.chess.playOnline}</h1>
          <p className="text-ink-muted">
            {t.chess.rating}: <strong>{elo}</strong>
          </p>
        </div>
        <Link href="/courses/chess" className="btn-secondary">
          {t.chess.learn} / {t.chess.puzzles}
        </Link>
      </div>

      {!match && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="card space-y-4">
            <div>
              <label className="label">{t.chess.timeControl}</label>
              <div className="flex flex-wrap gap-2">
                {CHESS_TIME_CONTROLS.map((tc) => (
                  <button
                    key={tc.id}
                    type="button"
                    className={
                      timeControl === tc.id ? "btn-primary !py-2" : "btn-secondary !py-2"
                    }
                    onClick={() => setTimeControl(tc.id)}
                  >
                    {tc.label}
                  </button>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-2 font-bold">
              <input
                type="checkbox"
                checked={rated}
                onChange={(e) => setRated(e.target.checked)}
              />
              {t.chess.ratedMatch}
            </label>
            {seeking ? (
              <div className="space-y-3">
                <p className="font-bold text-sky">{t.chess.seeking}</p>
                <button className="btn-secondary" onClick={cancelSeek}>
                  {t.chess.cancelSeek}
                </button>
              </div>
            ) : (
              <button className="btn-primary w-full" onClick={findMatch}>
                {t.chess.findMatch}
              </button>
            )}
            {status && !inviteId && (
              <p className="text-sm font-bold text-sun">{status}</p>
            )}
            <p className="text-sm text-ink-muted">
              {t.chess.twoTabsHint}
            </p>
          </div>

          <div className="card space-y-4 border-grape/30 bg-grape/5">
            <h2 className="text-xl font-black">🔗 {t.chess.inviteFriend}</h2>
            <p className="text-sm text-ink-muted">{t.chess.inviteHint}</p>
            {!inviteId ? (
              <button className="btn-primary w-full" onClick={createInvite}>
                {t.chess.createInvite}
              </button>
            ) : (
              <div className="space-y-2">
                <p className="font-bold text-sky">{t.chess.inviteWaiting}</p>
                <p className="break-all rounded-xl bg-white p-2 text-xs font-mono border">
                  {inviteUrl}
                </p>
                <button className="btn-secondary w-full" onClick={() => void copyInvite()}>
                  {copied ? `✓ ${t.chess.copied}` : t.chess.copyInvite}
                </button>
              </div>
            )}
            <div className="border-t border-slate-100 pt-3 space-y-2">
              <label className="label">{t.chess.inviteCode}</label>
              <input
                className="input font-mono text-sm"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder={t.chess.inviteCodePlaceholder}
              />
              <button className="btn-secondary w-full" onClick={joinInvite}>
                {t.chess.joinInvite}
              </button>
            </div>
          </div>

          <div className="card space-y-4 border-sky/30 bg-sky/5">
            <h2 className="text-xl font-black">🤖 {t.chess.playBot}</h2>
            <p className="text-sm text-ink-muted">{t.chess.botHint}</p>

            {/* Level selection */}
            <div className="space-y-1.5">
              <label className="label text-xs">{t.chess.botLevel}</label>
              <div className="grid grid-cols-3 gap-2">
                {(["learner", "club", "strong"] as const).map((lvl) => {
                  const label =
                    lvl === "learner"
                      ? t.chess.levelLearner
                      : lvl === "club"
                        ? t.chess.levelClub
                        : t.chess.levelStrong;
                  const isSelected = botLevel === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      className={
                        isSelected
                          ? "btn-primary !py-2 !px-2 text-xs"
                          : "btn-secondary !py-2 !px-2 text-xs"
                      }
                      onClick={() => setBotLevel(lvl)}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color selection */}
            <div className="space-y-1.5">
              <label className="label text-xs">{t.chess.playAs}</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className={
                    botColor === "w"
                      ? "btn-primary !py-2 !px-2 text-xs"
                      : "btn-secondary !py-2 !px-2 text-xs"
                  }
                  onClick={() => setBotColor("w")}
                >
                  ♔ {t.chess.white}
                </button>
                <button
                  type="button"
                  className={
                    botColor === "b"
                      ? "btn-primary !py-2 !px-2 text-xs"
                      : "btn-secondary !py-2 !px-2 text-xs"
                  }
                  onClick={() => setBotColor("b")}
                >
                  ♚ {t.chess.black}
                </button>
              </div>
            </div>

            <button className="btn-sky w-full" onClick={startBotGame}>
              {t.chess.playBot}
            </button>
          </div>
        </div>
      )}

      {match && (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div
            className="mx-auto w-full max-w-[min(100%,480px)]"
            role="application"
            aria-label="Chess board"
          >
            <ChessBoardFrame
              fen={fen === "start" ? "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" : fen}
              mode="play"
              orientation={orientation}
              viewer={match.youAre}
              interactive={!result}
              onMove={onDrop}
              endReason={endReason}
              endLine={cardEndLine}
              boardWidth={Math.min(
                480,
                typeof window !== "undefined" ? Math.max(240, window.innerWidth - 48) : 360,
              )}
            />
            <p className="sr-only">
              {t.chess.moveHint}
            </p>
          </div>
          <div className="card space-y-4">
            {match.vsBot && (
              <p className="rounded-xl bg-sky/10 px-3 py-2 text-xs font-bold text-sky">
                {t.chess.botTrainingNotice}
              </p>
            )}
            <div className="flex justify-between font-bold">
              <span>
                ♛ {match.black.displayName}{" "}
                {match.black.levelLabel
                  ? `(${match.black.levelLabel})`
                  : match.black.elo !== undefined
                    ? `(${match.black.elo})`
                    : ""}
              </span>
              <span className="font-mono">{formatMs(blackTime)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>
                ♔ {match.white.displayName}{" "}
                {match.white.levelLabel
                  ? `(${match.white.levelLabel})`
                  : match.white.elo !== undefined
                    ? `(${match.white.elo})`
                    : ""}
              </span>
              <span className="font-mono">{formatMs(whiteTime)}</span>
            </div>
            <p className="text-sm font-bold text-ink-muted">
              {result
                ? result === "1-0"
                  ? match.youAre === "w"
                    ? t.chess.youWon
                    : t.chess.youLost
                  : result === "0-1"
                    ? match.youAre === "b"
                      ? t.chess.youWon
                      : t.chess.youLost
                    : t.chess.draw
                : myTurn
                  ? t.chess.yourTurn
                  : t.chess.opponentTurn}
            </p>
            {!result && (
              <>
                <button
                  type="button"
                  className="btn-sky w-full"
                  disabled={hintLoading}
                  onClick={() => void requestHint()}
                >
                  {hintLoading ? t.chess.hintLoading : `💡 ${t.chess.hint}`}
                </button>
                {hintText && (
                  <p className="text-xs font-bold text-ink-muted break-words">{hintText}</p>
                )}
                <button className="btn-secondary w-full" onClick={resign}>
                  {t.chess.resign}
                </button>
              </>
            )}
            {result && (
              <button
                className="btn-primary w-full"
                onClick={() => {
                  setMatch(null);
                  setFen("start");
                  setResult(null);
                  setHintText("");
                }}
              >
                {t.chess.newGame}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function PlayClient() {
  return (
    <Suspense fallback={<p>Loading…</p>}>
      <PlayPageInner />
    </Suspense>
  );
}
