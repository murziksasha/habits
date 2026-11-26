"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Chessboard } from "@/components/chessboard-lazy";
import {
  Chess,
  checkInfo,
  destinations,
  exploreDestinations,
  isPromotionMove,
  type Destination,
  type Square,
} from "@eduforge/chess-core";
import { useLocale } from "@/lib/locale-context";
import { CHESS_BOARD_THEME_IDS, chessBoardSquareStyles, type ChessBoardThemeId, type UiDict } from "@eduforge/shared";
import { useChessPrefs } from "@/lib/chess-prefs";
import { playChessSound, soundForSan } from "@/lib/chess-sounds";

export type ChessBoardMode = "play" | "puzzle" | "explore";
export type PromotionPiece = "q" | "r" | "b" | "n";
export type BoardArrow = [Square, Square, string?];

export type ChessBoardFrameProps = {
  fen: string;
  mode?: ChessBoardMode;
  orientation?: "white" | "black";
  interactive?: boolean;
  viewer?: "w" | "b";
  onMove?: (from: string, to: string, promotion?: PromotionPiece) => boolean;
  /** Last played move, highlighted under check rings and selection. */
  lastMove?: { from: string; to: string } | null;
  /** Squares to ring (hints). */
  highlightSquares?: string[];
  /** Arrows (plans, hints, review). */
  arrows?: BoardArrow[];
  endReason?: "checkmate" | "stalemate" | null;
  endLine?: string | null;
  onDismissEnd?: () => void;
  boardWidth?: number;
  /** Flip, sound and board settings under the board (default: on except in explore mode). */
  showControls?: boolean;
};

const PIECE_TYPE_TO_KEY: Record<string, "pawn" | "knight" | "bishop" | "rook" | "queen" | "king"> = {
  p: "pawn",
  n: "knight",
  b: "bishop",
  r: "rook",
  q: "queen",
  k: "king",
};

export function ChessBoardFrame({
  fen,
  mode = "play",
  orientation: orientationProp = "white",
  interactive = true,
  viewer = orientationProp === "black" ? "b" : "w",
  onMove,
  endReason = null,
  endLine = null,
  onDismissEnd,
  boardWidth = 360,
  lastMove = null,
  highlightSquares,
  arrows,
  showControls = mode !== "explore",
}: ChessBoardFrameProps) {
  const { t } = useLocale();
  const [prefs, setPrefs] = useChessPrefs();
  const [flipped, setFlipped] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const orientation: "white" | "black" = flipped ? (orientationProp === "white" ? "black" : "white") : orientationProp;
  const squareTheme = useMemo(() => chessBoardSquareStyles(prefs.theme), [prefs.theme]);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const on = () => setReducedMotion(mq.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);

  // Move sounds: classify the last move against the previous position.
  const prevFen = useRef<string | null>(null);
  useEffect(() => {
    const before = prevFen.current;
    prevFen.current = fen;
    if (!before || before === fen || !lastMove || mode === "explore") return;
    try {
      const g = before === "start" ? new Chess() : new Chess(before);
      const m = g.move({ from: lastMove.from as Square, to: lastMove.to as Square, promotion: "q" });
      if (m) playChessSound(soundForSan(m.san));
    } catch {
      /* not a single-move step (reset, jump) */
    }
  }, [fen, lastMove, mode]);

  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [dests, setDests] = useState<Destination[]>([]);
  const [noMoveSquare, setNoMoveSquare] = useState<Square | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(boardWidth);
  const [pendingPromotion, setPendingPromotion] = useState<{ from: Square; to: Square } | null>(null);

  /** Route a move through the promotion picker when a pawn reaches the last rank. */
  const submitMove = useCallback(
    (from: Square, to: Square): boolean => {
      if (isPromotionMove(fen, from, to)) {
        setPendingPromotion({ from, to });
        return false;
      }
      return onMove?.(from, to) ?? false;
    },
    [fen, onMove],
  );

  // Sync internal width when boardWidth prop changes
  useEffect(() => {
    setCurrentWidth(boardWidth);
  }, [boardWidth]);

  // Reset local selection when FEN changes
  useEffect(() => {
    setSelectedSquare(null);
    setDests([]);
    setNoMoveSquare(null);
    setPendingPromotion(null);
  }, [fen]);

  // Reset dismissed state if endReason clears
  useEffect(() => {
    if (!endReason) {
      setDismissed(false);
    }
  }, [endReason]);

  const game = useMemo(() => {
    try {
      return fen === "start" ? new Chess() : new Chess(fen);
    } catch {
      return new Chess();
    }
  }, [fen]);

  const check = useMemo(() => {
    if (mode === "explore") {
      return { inCheck: false, king: null, attackers: [], double: false };
    }
    return checkInfo(fen);
  }, [fen, mode]);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    onDismissEnd?.();
  }, [onDismissEnd]);

  // Determine whether check strip is visible
  const showCheckStrip =
    mode !== "explore" &&
    check.inCheck &&
    !endReason &&
    !dismissed;

  const checkStripText = useMemo(() => {
    if (!check.inCheck) return "";
    if (check.double) {
      return `${t.chess.check} · ${t.chess.doubleCheck}`;
    }
    if (check.attackers.length === 1) {
      const pieceKey = PIECE_TYPE_TO_KEY[check.attackers[0]?.type];
      const pieceName = pieceKey ? t.chess[pieceKey] : "";
      return pieceName ? `${t.chess.check} · ${pieceName}` : t.chess.check;
    }
    return t.chess.check;
  }, [check, t]);

  // Attacker descriptor for checkmate card
  const mateAttackerText = useMemo(() => {
    if (check.double) {
      return t.chess.doubleCheck;
    }
    if (check.attackers.length === 1) {
      const pieceKey = PIECE_TYPE_TO_KEY[check.attackers[0]?.type];
      return pieceKey ? t.chess[pieceKey] : "";
    }
    return "";
  }, [check, t]);

  const handleSquareClick = useCallback(
    (square: Square) => {
      if (!interactive) return;

      if (endReason && !dismissed) {
        if (mode === "play") {
          handleDismiss();
        }
        return;
      }

      if (mode === "explore") {
        if (selectedSquare === square) {
          setSelectedSquare(null);
          setDests([]);
          return;
        }
        const piece = game.get(square);
        if (!piece) {
          setSelectedSquare(null);
          setDests([]);
          return;
        }
        const legal = exploreDestinations(fen, square);
        setSelectedSquare(square);
        setDests(legal);
        return;
      }

      // Play or Puzzle mode
      const turn = game.turn();
      const isMyTurn = turn === viewer;
      if (!isMyTurn) return;

      if (selectedSquare) {
        if (square === selectedSquare) {
          setSelectedSquare(null);
          setDests([]);
          setNoMoveSquare(null);
          return;
        }

        const isDest = dests.some((d) => d.to === square);
        if (isDest) {
          const from = selectedSquare;
          setSelectedSquare(null);
          setDests([]);
          setNoMoveSquare(null);
          submitMove(from, square);
          return;
        }

        const piece = game.get(square);
        if (piece && piece.color === turn) {
          const nextDests = destinations(fen, square);
          setSelectedSquare(square);
          setDests(nextDests);
          if (nextDests.length === 0) {
            setNoMoveSquare(square);
          } else {
            setNoMoveSquare(null);
          }
          return;
        }

        setSelectedSquare(null);
        setDests([]);
        setNoMoveSquare(null);
        return;
      }

      const piece = game.get(square);
      if (piece && piece.color === turn) {
        const nextDests = destinations(fen, square);
        setSelectedSquare(square);
        setDests(nextDests);
        if (nextDests.length === 0) {
          setNoMoveSquare(square);
        } else {
          setNoMoveSquare(null);
        }
      }
    },
    [
      interactive,
      endReason,
      dismissed,
      mode,
      game,
      viewer,
      selectedSquare,
      dests,
      fen,
      handleDismiss,
      submitMove,
    ],
  );

  const handleDragBegin = useCallback(
    (_piece: unknown, sourceSquare: Square) => {
      if (!interactive || endReason) return;
      const turn = game.turn();
      const isMyTurn = turn === viewer;
      if (!isMyTurn) return;

      const p = game.get(sourceSquare);
      if (!p || p.color !== turn) return;

      const nextDests = destinations(fen, sourceSquare);
      setSelectedSquare(sourceSquare);
      setDests(nextDests);
      if (nextDests.length === 0) {
        setNoMoveSquare(sourceSquare);
      } else {
        setNoMoveSquare(null);
      }
    },
    [interactive, endReason, game, mode, viewer, fen],
  );

  const handlePieceDrop = useCallback(
    (sourceSquare: Square, targetSquare: Square): boolean => {
      if (!interactive || endReason) return false;
      const turn = game.turn();
      const isMyTurn = turn === viewer;
      if (!isMyTurn) return false;

      setSelectedSquare(null);
      setDests([]);
      setNoMoveSquare(null);

      if (onMove) {
        return submitMove(sourceSquare, targetSquare);
      }
      return false;
    },
    [interactive, endReason, game, mode, viewer, onMove, submitMove],
  );

  const isDraggablePiece = useCallback(
    ({ piece, sourceSquare }: { piece: string; sourceSquare: Square }) => {
      if (!interactive || endReason || mode === "explore") return false;
      const turn = game.turn();
      const isMyTurn = turn === viewer;
      if (!isMyTurn) return false;
      const p = game.get(sourceSquare);
      return Boolean(p && p.color === turn && piece.startsWith(turn));
    },
    [interactive, endReason, mode, game, viewer],
  );

  // Compute custom square styles
  const customSquareStyles = useMemo(() => {
    const styles: Record<Square, Record<string, string | number>> = {} as Record<
      Square,
      Record<string, string | number>
    >;

    // 0. Last move tint (under check rings, selection and dots)
    if (lastMove) {
      for (const sq of [lastMove.from, lastMove.to] as Square[]) {
        styles[sq] = { ...styles[sq], backgroundColor: "rgba(255, 213, 0, 0.35)" };
      }
    }
    for (const sq of (highlightSquares ?? []) as Square[]) {
      styles[sq] = { ...styles[sq], boxShadow: "inset 0 0 0 4px #0ea5e9" };
    }

    // 1. Check rings: King and Attacker(s)
    // "After dismiss, the chip does not return. Rings stay."
    // In stalemate: "No attacker and no rings."
    if (mode !== "explore" && endReason !== "stalemate") {
      if (check.king) {
        styles[check.king] = {
          ...styles[check.king],
          boxShadow: "inset 0 0 0 4px #ef4444",
        };
      }
      for (const att of check.attackers) {
        styles[att.square] = {
          ...styles[att.square],
          boxShadow: "inset 0 0 0 2px #ef4444",
        };
      }
    }

    // 2. Selected square tint
    if (selectedSquare) {
      styles[selectedSquare] = {
        ...styles[selectedSquare],
        backgroundColor: "rgba(14, 165, 233, 0.35)",
      };
    }

    // 3. Destinations
    for (const dest of dests) {
      if (dest.capture) {
        styles[dest.to] = {
          ...styles[dest.to],
          boxShadow: "inset 0 0 0 3.5px #f59e0b",
        };
      } else {
        styles[dest.to] = {
          ...styles[dest.to],
          backgroundImage:
            "radial-gradient(circle, rgba(34, 197, 94, 0.85) 12%, transparent 14%)",
        };
      }
    }

    return styles;
  }, [check, mode, endReason, selectedSquare, dests, lastMove, highlightSquares]);

  // Coordinates for "No legal move" overlay
  const noMoveCoords = useMemo(() => {
    if (!noMoveSquare) return null;
    const fileIdx = noMoveSquare.charCodeAt(0) - 97; // 0..7
    const rankIdx = parseInt(noMoveSquare[1], 10) - 1; // 0..7
    const col = orientation === "white" ? fileIdx : 7 - fileIdx;
    const row = orientation === "white" ? 7 - rankIdx : rankIdx;
    const sqSize = currentWidth / 8;
    return {
      left: col * sqSize,
      top: row * sqSize,
      size: sqSize,
    };
  }, [noMoveSquare, orientation, currentWidth]);

  const showEndCard = (endReason === "checkmate" || endReason === "stalemate") && !dismissed;

  return (
    <div className="flex flex-col items-center">
      {/* Check strip */}
      {showCheckStrip && (
        <div
          role="status"
          aria-live="polite"
          className="mb-2 flex w-full max-w-[min(100%,480px)] items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 shadow-sm dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300"
        >
          <span>⚠️ {checkStripText}</span>
        </div>
      )}

      {/* Screen reader move hint */}
      <p className="sr-only">{t.chess.moveHint}</p>

      {/* Board relative container */}
      <div
        className="relative mx-auto select-none"
        style={{ width: currentWidth, maxWidth: "100%" }}
        onClick={() => {
          if (showEndCard && mode === "play") {
            handleDismiss();
          }
        }}
      >
        <Chessboard
          position={fen === "start" ? undefined : fen}
          boardOrientation={orientation}
          boardWidth={currentWidth}
          onBoardWidthChange={setCurrentWidth}
          arePiecesDraggable={interactive && mode !== "explore" && !endReason}
          isDraggablePiece={isDraggablePiece}
          onPieceDragBegin={handleDragBegin}
          onPieceDrop={handlePieceDrop}
          onPieceClick={(_piece, square) => handleSquareClick(square)}
          onSquareClick={(square) => handleSquareClick(square)}
          customSquareStyles={customSquareStyles}
          onPromotionCheck={() => false}
          customArrows={arrows}
          areArrowsAllowed={false}
          animationDuration={reducedMotion ? 0 : 200}
          customLightSquareStyle={squareTheme.light}
          customDarkSquareStyle={squareTheme.dark}
          showBoardNotation={prefs.coordinates}
        />

        {/* Promotion picker (queen, rook, bishop, knight) */}
        {pendingPromotion && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-900/40 p-4">
            <div
              role="dialog"
              aria-label={t.chess.promotionTitle}
              className="rounded-2xl border-2 border-brand bg-white p-3 text-center shadow-2xl dark:bg-slate-900"
            >
              <p className="mb-2 text-sm font-black">{t.chess.promotionTitle}</p>
              <div className="flex gap-2">
                {(["q", "r", "b", "n"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    data-testid={`promote-${p}`}
                    aria-label={t.chess[PIECE_TYPE_TO_KEY[p]!]}
                    className="grid h-14 w-14 place-items-center rounded-xl border-2 border-slate-200 text-4xl hover:border-brand focus:border-brand dark:border-slate-700"
                    onClick={() => {
                      const pend = pendingPromotion;
                      setPendingPromotion(null);
                      onMove?.(pend.from, pend.to, p);
                    }}
                  >
                    {promotionGlyph(game.turn(), p)}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="mt-2 text-xs font-bold text-ink-muted underline"
                onClick={() => setPendingPromotion(null)}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* No legal move badge */}
        {noMoveCoords && (
          <div
            className="pointer-events-none absolute z-10 flex items-center justify-center p-1"
            style={{
              left: noMoveCoords.left,
              top: noMoveCoords.top,
              width: noMoveCoords.size,
              height: noMoveCoords.size,
            }}
          >
            <span
              className="rounded-lg bg-slate-900/90 px-1.5 py-0.5 text-center text-[10px] font-bold leading-tight text-white shadow-md backdrop-blur-sm dark:bg-slate-800/95"
              role="status"
              aria-live="polite"
            >
              {t.chess.noLegalMove}
            </span>
          </div>
        )}

        {/* Checkmate center card */}
        {showEndCard && endReason === "checkmate" && (
          <div className="absolute inset-0 z-20 flex items-center justify-center p-4 pointer-events-none">
            <div
              className={`rounded-2xl border-2 border-brand bg-white/95 px-6 py-4 text-center shadow-2xl backdrop-blur-md dark:border-brand-dark dark:bg-slate-900/95 ${
                mode === "play" ? "pointer-events-auto cursor-pointer" : "pointer-events-none"
              }`}
              role="dialog"
              aria-label={t.chess.checkmate}
              onClick={(e) => {
                if (mode === "play") {
                  e.stopPropagation();
                  handleDismiss();
                }
              }}
            >
              <p className="text-2xl font-black text-ink dark:text-white">
                {t.chess.checkmate}
              </p>
              <p className="mt-1 text-sm font-bold text-ink-muted dark:text-slate-300">
                {mode === "puzzle"
                  ? endLine || t.chess.puzzleSolved
                  : mateAttackerText
                    ? `${mateAttackerText} · ${endLine || ""}`
                    : endLine || ""}
              </p>
            </div>
          </div>
        )}

        {/* Stalemate center card */}
        {showEndCard && endReason === "stalemate" && (
          <div className="absolute inset-0 z-20 flex items-center justify-center p-4 pointer-events-none">
            <div
              className={`rounded-2xl border border-slate-300 bg-white/95 px-6 py-4 text-center shadow-2xl backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/95 ${
                mode === "play" ? "pointer-events-auto cursor-pointer" : "pointer-events-none"
              }`}
              role="dialog"
              aria-label={t.chess.stalemate}
              onClick={(e) => {
                if (mode === "play") {
                  e.stopPropagation();
                  handleDismiss();
                }
              }}
            >
              <p className="text-base font-black text-ink dark:text-white">
                {t.chess.stalemate} · {endLine || t.chess.draw}
              </p>
            </div>
          </div>
        )}
      </div>

      {showControls && (
        <div className="mt-2 flex w-full max-w-[min(100%,480px)] flex-wrap items-center justify-center gap-2 text-xs">
          <button
            type="button"
            className="btn-secondary !px-2 !py-1"
            aria-label={t.chess.flipBoard}
            data-testid="flip-board"
            onClick={() => setFlipped((f) => !f)}
          >
            ⇅ {t.chess.flipBoard}
          </button>
          <button
            type="button"
            className="btn-secondary !px-2 !py-1"
            aria-label={prefs.sound ? t.chess.soundOff : t.chess.soundOn}
            aria-pressed={prefs.sound}
            data-testid="sound-toggle"
            onClick={() => setPrefs({ sound: !prefs.sound })}
          >
            {prefs.sound ? "🔊" : "🔇"} {t.chess.sound}
          </button>
          <button
            type="button"
            className="btn-secondary !px-2 !py-1"
            aria-label={t.chess.boardSettings}
            aria-expanded={settingsOpen}
            data-testid="board-settings"
            onClick={() => setSettingsOpen((o) => !o)}
          >
            ⚙️
          </button>
          {settingsOpen && (
            <div className="flex w-full flex-wrap items-center justify-center gap-3 rounded-xl bg-surface-muted p-2" data-testid="board-settings-panel">
              <label className="flex items-center gap-1">
                {t.chess.boardTheme}
                <select
                  className="input !py-0.5 text-xs"
                  value={prefs.theme}
                  onChange={(e) => setPrefs({ theme: e.target.value as ChessBoardThemeId })}
                >
                  {CHESS_BOARD_THEME_IDS.map((id) => (
                    <option key={id} value={id}>
                      {themeLabel(t, id)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={prefs.coordinates}
                  data-testid="coordinates-toggle"
                  onChange={(e) => setPrefs({ coordinates: e.target.checked })}
                />
                {t.chess.coordinates}
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function themeLabel(t: UiDict, id: ChessBoardThemeId): string {
  return id === "green" ? t.chess.themeGreen : id === "blue" ? t.chess.themeBlue : id === "wood" ? t.chess.themeWood : t.chess.themeClassic;
}

const GLYPHS: Record<"w" | "b", Record<PromotionPiece, string>> = {
  w: { q: "♕", r: "♖", b: "♗", n: "♘" },
  b: { q: "♛", r: "♜", b: "♝", n: "♞" },
};

function promotionGlyph(color: "w" | "b", piece: PromotionPiece): string {
  return GLYPHS[color][piece];
}
