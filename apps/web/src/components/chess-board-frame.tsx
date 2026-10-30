"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Chessboard } from "@/components/chessboard-lazy";
import {
  Chess,
  checkInfo,
  destinations,
  exploreDestinations,
  type Destination,
  type Square,
} from "@eduforge/chess-core";
import { useLocale } from "@/lib/locale-context";
import { getUI } from "@eduforge/shared";

export type ChessBoardMode = "play" | "puzzle" | "explore";

export type ChessBoardFrameProps = {
  fen: string;
  mode?: ChessBoardMode;
  orientation?: "white" | "black";
  interactive?: boolean;
  viewer?: "w" | "b";
  onMove?: (from: string, to: string) => boolean;
  endReason?: "checkmate" | "stalemate" | null;
  endLine?: string | null;
  onDismissEnd?: () => void;
  boardWidth?: number;
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
  orientation = "white",
  interactive = true,
  viewer = orientation === "black" ? "b" : "w",
  onMove,
  endReason = null,
  endLine = null,
  onDismissEnd,
  boardWidth = 360,
}: ChessBoardFrameProps) {
  const { locale } = useLocale();
  const t = getUI(locale);

  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [dests, setDests] = useState<Destination[]>([]);
  const [noMoveSquare, setNoMoveSquare] = useState<Square | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(boardWidth);

  // Sync internal width when boardWidth prop changes
  useEffect(() => {
    setCurrentWidth(boardWidth);
  }, [boardWidth]);

  // Reset local selection when FEN changes
  useEffect(() => {
    setSelectedSquare(null);
    setDests([]);
    setNoMoveSquare(null);
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
      const isMyTurn = mode === "puzzle" || turn === viewer;
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
          onMove?.(from, square);
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
      onMove,
    ],
  );

  const handleDragBegin = useCallback(
    (_piece: unknown, sourceSquare: Square) => {
      if (!interactive || endReason) return;
      const turn = game.turn();
      const isMyTurn = mode === "puzzle" || turn === viewer;
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
      const isMyTurn = mode === "puzzle" || turn === viewer;
      if (!isMyTurn) return false;

      setSelectedSquare(null);
      setDests([]);
      setNoMoveSquare(null);

      if (onMove) {
        return onMove(sourceSquare, targetSquare);
      }
      return false;
    },
    [interactive, endReason, game, mode, viewer, onMove],
  );

  const isDraggablePiece = useCallback(
    ({ piece, sourceSquare }: { piece: string; sourceSquare: Square }) => {
      if (!interactive || endReason || mode === "explore") return false;
      const turn = game.turn();
      const isMyTurn = mode === "puzzle" || turn === viewer;
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
  }, [check, mode, endReason, selectedSquare, dests]);

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
          onSquareClick={handleSquareClick}
          customSquareStyles={customSquareStyles}
          autoPromoteToQueen={true}
          animationDuration={200}
        />

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
    </div>
  );
}

