"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { io, type Socket } from "socket.io-client";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { CHESS_TIME_CONTROLS, UI } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { Suspense } from "react";

const REALTIME_URL = process.env.NEXT_PUBLIC_REALTIME_URL ?? "http://localhost:4001";

type MatchInfo = {
  gameId: string;
  fen: string;
  youAre: "w" | "b";
  white: { userId: string; displayName: string; elo: number };
  black: { userId: string; displayName: string; elo: number };
  whiteTimeMs: number;
  blackTimeMs: number;
  timeControl: string;
  rated: boolean;
  vsBot?: boolean;
};

function pickBotMove(fen: string): { from: string; to: string; promotion?: "q" } | null {
  const game = new Chess(fen);
  const moves = game.moves({ verbose: true });
  if (!moves.length) return null;
  // Prefer captures / checks lightly
  const captures = moves.filter((m) => m.captured);
  const pool = captures.length && Math.random() < 0.55 ? captures : moves;
  const m = pool[Math.floor(Math.random() * pool.length)];
  return {
    from: m.from,
    to: m.to,
    promotion: m.promotion ? "q" : undefined,
  };
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
  const [status, setStatus] = useState("");
  const [inviteId, setInviteId] = useState<string | null>(null);
  const [inviteUrl, setInviteUrl] = useState("");
  const [joinCode, setJoinCode] = useState(inviteParam ?? "");
  const [copied, setCopied] = useState(false);
  const [hintText, setHintText] = useState("");
  const [hintLoading, setHintLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

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
          setStatus(res.error === "unavailable" ? "Запрошення недоступне" : res.error);
          return;
        }
        if (res?.waiting) {
          setInviteId(res.gameId ?? inviteParam);
          setStatus(UI.chess.inviteWaiting);
        }
      },
    );
    // markTriedChess is stable enough for this flow
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, inviteParam]);

  // local clock tick (online + bot)
  useEffect(() => {
    if (!match || result) return;
    const turn = fen === "start" ? "w" : new Chess(fen).turn();
    const t = setInterval(() => {
      if (turn === "w") setWhiteTime((x) => Math.max(0, x - 250));
      else setBlackTime((x) => Math.max(0, x - 250));
    }, 250);
    return () => clearInterval(t);
  }, [match, fen, result]);

  // bot move when it's black's turn in bot games
  useEffect(() => {
    if (!match?.vsBot || result) return;
    const game = fen === "start" ? new Chess() : new Chess(fen);
    if (game.isGameOver()) return;
    if (game.turn() !== "b") return;
    const timer = setTimeout(() => {
      const move = pickBotMove(game.fen());
      if (!move) return;
      const g = new Chess(game.fen());
      try {
        g.move({ from: move.from, to: move.to, promotion: move.promotion });
      } catch {
        return;
      }
      setFen(g.fen());
      if (g.isGameOver()) {
        if (g.isCheckmate()) setResult(g.turn() === "w" ? "0-1" : "1-0");
        else setResult("1/2-1/2");
      }
    }, 450 + Math.random() * 600);
    return () => clearTimeout(timer);
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
    markTriedChess();
    socket.emit("seek", { timeControl, rated }, (res: { error?: string }) => {
      if (res?.error === "rated_limit") {
        setStatus("Ліміт рейтингових партій. Оформіть Premium або грайте unrated.");
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

  function startBotGame() {
    cancelSeek();
    markTriedChess();
    const ms =
      CHESS_TIME_CONTROLS.find((t) => t.id === timeControl)?.initialMs ?? 300_000;
    const chess = new Chess();
    setMatch({
      gameId: `bot-${Date.now()}`,
      fen: chess.fen(),
      youAre: "w",
      white: {
        userId: user?.id ?? "me",
        displayName: character?.displayName ?? "Ви",
        elo,
      },
      black: {
        userId: "bot",
        displayName: UI.chess.botName,
        elo: 800,
      },
      whiteTimeMs: ms,
      blackTimeMs: ms,
      timeControl,
      rated: false,
      vsBot: true,
    });
    setFen(chess.fen());
    setWhiteTime(ms);
    setBlackTime(ms);
    setResult(null);
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
        setStatus(UI.chess.inviteWaiting);
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
            ? "Не можна приєднатися до власного запрошення"
            : "Запрошення недоступне",
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
        if (g.isGameOver()) {
          if (g.isCheckmate()) setResult(g.turn() === "w" ? "0-1" : "1-0");
          else setResult("1/2-1/2");
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
      return;
    }
    socket?.emit("resign", { gameId: match.gameId });
  }

  if (loading || !user) return <p>{UI.common.loading}</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">♟️ {UI.chess.playOnline}</h1>
          <p className="text-ink-muted">
            {UI.chess.rating}: <strong>{elo}</strong>
          </p>
        </div>
        <Link href="/courses/chess" className="btn-secondary">
          {UI.chess.learn} / {UI.chess.puzzles}
        </Link>
      </div>

      {!match && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="card space-y-4">
            <div>
              <label className="label">{UI.chess.timeControl}</label>
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
              Рейтингова партія
            </label>
            {seeking ? (
              <div className="space-y-3">
                <p className="font-bold text-sky">{UI.chess.seeking}</p>
                <button className="btn-secondary" onClick={cancelSeek}>
                  {UI.chess.cancelSeek}
                </button>
              </div>
            ) : (
              <button className="btn-primary w-full" onClick={findMatch}>
                {UI.chess.findMatch}
              </button>
            )}
            {status && !inviteId && (
              <p className="text-sm font-bold text-sun">{status}</p>
            )}
            <p className="text-sm text-ink-muted">
              Відкрийте другу вкладку / інший акаунт, щоб зіграти online.
            </p>
          </div>

          <div className="card space-y-4 border-grape/30 bg-grape/5">
            <h2 className="text-xl font-black">🔗 {UI.chess.inviteFriend}</h2>
            <p className="text-sm text-ink-muted">{UI.chess.inviteHint}</p>
            {!inviteId ? (
              <button className="btn-primary w-full" onClick={createInvite}>
                {UI.chess.createInvite}
              </button>
            ) : (
              <div className="space-y-2">
                <p className="font-bold text-sky">{UI.chess.inviteWaiting}</p>
                <p className="break-all rounded-xl bg-white p-2 text-xs font-mono border">
                  {inviteUrl}
                </p>
                <button className="btn-secondary w-full" onClick={() => void copyInvite()}>
                  {copied ? "✓ Скопійовано" : UI.chess.copyInvite}
                </button>
              </div>
            )}
            <div className="border-t border-slate-100 pt-3 space-y-2">
              <label className="label">{UI.chess.inviteCode}</label>
              <input
                className="input font-mono text-sm"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder="UUID гри"
              />
              <button className="btn-secondary w-full" onClick={joinInvite}>
                {UI.chess.joinInvite}
              </button>
            </div>
          </div>

          <div className="card space-y-4 border-sky/30 bg-sky/5">
            <h2 className="text-xl font-black">🤖 {UI.chess.playBot}</h2>
            <p className="text-sm text-ink-muted">{UI.chess.botHint}</p>
            <button className="btn-sky w-full" onClick={startBotGame}>
              {UI.chess.playBot}
            </button>
          </div>
        </div>
      )}

      {match && (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="mx-auto w-full max-w-[480px]">
            <Chessboard
              position={fen === "start" ? undefined : fen}
              onPieceDrop={onDrop}
              boardOrientation={orientation}
              arePiecesDraggable={!!myTurn && !result}
              boardWidth={Math.min(
                480,
                typeof window !== "undefined" ? window.innerWidth - 48 : 480,
              )}
            />
          </div>
          <div className="card space-y-4">
            {match.vsBot && (
              <p className="rounded-xl bg-sky/10 px-3 py-2 text-xs font-bold text-sky">
                Тренування з ботом · Elo не змінюється
              </p>
            )}
            <div className="flex justify-between font-bold">
              <span>
                ♛ {match.black.displayName} ({match.black.elo})
              </span>
              <span className="font-mono">{formatMs(blackTime)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>
                ♔ {match.white.displayName} ({match.white.elo})
              </span>
              <span className="font-mono">{formatMs(whiteTime)}</span>
            </div>
            <p className="text-sm font-bold text-ink-muted">
              {result
                ? result === "1-0"
                  ? match.youAre === "w"
                    ? UI.chess.youWon
                    : UI.chess.youLost
                  : result === "0-1"
                    ? match.youAre === "b"
                      ? UI.chess.youWon
                      : UI.chess.youLost
                    : UI.chess.draw
                : myTurn
                  ? UI.chess.yourTurn
                  : UI.chess.opponentTurn}
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
                  {UI.chess.resign}
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
                Нова гра
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PlayPage() {
  return (
    <Suspense fallback={<p>{UI.common.loading}</p>}>
      <PlayPageInner />
    </Suspense>
  );
}
