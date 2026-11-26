"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { ChessBoardFrame } from "@/components/chess-board-frame";
import { DifficultyStars } from "@/components/difficulty-stars";
import { Chess, checkEndgameGoal, evaluatePuzzleMove, replaySans, type EndgameGoal, type PuzzleSpec, type Square } from "@eduforge/chess-core";
import { requestBotMove } from "@/lib/chess-bot";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { playChessSound } from "@/lib/chess-sounds";
import { localizeExerciseOptions, chessThemeLabel, visibleChessThemes } from "@eduforge/shared";
import clsx from "clsx";
import { useLocale } from "@/lib/locale-context";
import { stableOptionOrder } from "@/lib/option-order";
import { type Exercise, ExamModeCtx, WrongAttemptCtx, AssistanceCtx, usePrompt } from "./shared";

type PuzzleMoveRecord = { san: string; from: string; to: string };

type PuzzleSourceInfo = { kind?: string; white?: string; black?: string; year?: number; event?: string; lichessId?: string; gameUrl?: string };

type ChessPlanOption = { san: string; explanationUk: string; explanationEn?: string };

type DrillMove = { san: string; from: string; to: string };

function puzzleSourceLine(src: PuzzleSourceInfo | undefined, lichessLabel: string): { text: string; href?: string } | null {
  if (!src) return null;
  if (src.kind === "lichess") return { text: src.lichessId ? `${lichessLabel} · #${src.lichessId}` : lichessLabel, href: src.gameUrl };
  const players = [src.white, src.black].filter(Boolean).join(" — ");
  const rest = [src.event, src.year].filter(Boolean).join(", ");
  const text = [players, rest].filter(Boolean).join(", ");
  return text ? { text } : null;
}

const MAX_WRONG_BEFORE_REVEAL = 3;

export function ChessPuzzleExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const { t, locale } = useLocale();
  const examMode = useContext(ExamModeCtx);
  const assistance = useContext(AssistanceCtx);
  const onWrongAttempt = useContext(WrongAttemptCtx);
  const fen = String(exercise.fen);
  const en = locale === "en";
  const difficulty = Number(exercise.difficulty ?? 1);
  const spec = useMemo<PuzzleSpec>(
    () => ({
      fen,
      solutionSans: (exercise.solutionSans as string[]) ?? [],
      goal: exercise.goal as PuzzleSpec["goal"],
      acceptedAlternatives: exercise.acceptedAlternatives as PuzzleSpec["acceptedAlternatives"],
      alternativeLines: exercise.alternativeLines as PuzzleSpec["alternativeLines"],
    }),
    [fen, exercise.solutionSans, exercise.goal, exercise.acceptedAlternatives, exercise.alternativeLines],
  );
  const [moves, setMoves] = useState<PuzzleMoveRecord[]>([]);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [solved, setSolved] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [wrongFlash, setWrongFlash] = useState<PuzzleMoveRecord | null>(null);
  const [endReason, setEndReason] = useState<"checkmate" | "stalemate" | null>(null);
  const [wrongCount, setWrongCount] = useState(0);
  const [hintStep, setHintStep] = useState<0 | 1 | 2>(0);
  /** Display-only replay of the solution after the puzzle is finished. */
  const [replay, setReplay] = useState<PuzzleMoveRecord[] | null>(null);

  const viewer = useMemo(() => {
    try {
      return (new Chess(fen)).turn();
    } catch {
      return "w";
    }
  }, [fen]);
  const orientation = viewer === "b" ? "black" : "white";

  const shown = replay ?? [...moves, ...(wrongFlash ? [wrongFlash] : [])];
  const boardFen = useMemo(() => {
    const g = replaySans(fen, shown.map((m) => m.san));
    return g ? g.fen() : fen;
  }, [fen, shown]);
  const lastMove = shown.at(-1) ?? null;

  useEffect(() => {
    setMoves([]);
    setMsg("");
    setBusy(false);
    setSolved(false);
    setRevealed(false);
    setWrongFlash(null);
    setEndReason(null);
    setWrongCount(0);
    setHintStep(0);
    setReplay(null);
  }, [exercise.id]);

  const done = solved || revealed;
  const hintPiece = typeof exercise.hintPiece === "string" ? exercise.hintPiece : null;
  const hintSquare = typeof exercise.hintSquare === "string" ? exercise.hintSquare : null;
  const hintText1 = String((en ? exercise.hintEn : exercise.hintUk) ?? exercise.hintUk ?? "");
  const hintText2 = String((en ? exercise.hintSquareEn : exercise.hintSquareUk) ?? exercise.hintSquareUk ?? "");
  const canHint = !examMode && !done && Boolean(hintText1) && (difficulty <= 2 || wrongCount > 0) && hintStep < 2;
  const highlight = done ? [] : [hintStep >= 1 ? hintPiece : null, hintStep >= 2 ? hintSquare : null].filter((x): x is string => Boolean(x));
  const themes = visibleChessThemes(exercise.themes as string[] | undefined);
  const explanation = String((en ? exercise.explanationEn : exercise.explanationUk) ?? exercise.explanationUk ?? "");
  const source = puzzleSourceLine(exercise.source as PuzzleSourceInfo | undefined, t.chess.lichessSource);

  function restart() {
    setMoves([]);
    setMsg("");
    setSolved(false);
    setWrongFlash(null);
    setEndReason(null);
  }

  function useHint() {
    const next = (hintStep + 1) as 1 | 2;
    setHintStep(next);
    assistance.onHintUsed?.();
  }

  function animate(line: PuzzleMoveRecord[]) {
    setReplay([]);
    line.forEach((_, i) => setTimeout(() => setReplay(line.slice(0, i + 1)), 600 * (i + 1)));
    setTimeout(() => setReplay(null), 600 * (line.length + 1) + 400);
  }

  function solutionRecords(): PuzzleMoveRecord[] {
    const g = new Chess(fen);
    const out: PuzzleMoveRecord[] = [];
    for (const san of spec.solutionSans) {
      try {
        const mv = g.move(san);
        out.push({ san: mv.san, from: mv.from, to: mv.to });
      } catch {
        break;
      }
    }
    return out;
  }

  function revealSolution() {
    const line = solutionRecords();
    setRevealed(true);
    setMoves(line);
    setMsg(t.chess.solutionShown);
    assistance.onSolutionRevealed?.();
    animate(line);
    onAnswer({ solved: false, revealed: true, sans: line.map((m) => m.san), playerSans: [], hintsUsed: hintStep });
  }

  function finish(line: PuzzleMoveRecord[], alternative: boolean) {
    const g = replaySans(fen, line.map((m) => m.san));
    setSolved(true);
    playChessSound("puzzleSolved");
    setMsg(alternative ? t.chess.alternativeAccepted : t.lesson.correct);
    const sans = line.map((m) => m.san);
    const playerSans = sans.filter((_, i) => i % 2 === 0);
    const base = { solved: true, sans, playerSans, hintsUsed: hintStep };
    if (g?.isCheckmate()) {
      setEndReason("checkmate");
      onAnswer({ ...base, mate: true });
    } else if (g?.isStalemate()) {
      setEndReason("stalemate");
      onAnswer({ ...base, stalemate: true });
    } else {
      onAnswer(base);
    }
  }

  function onDrop(from: string, to: string, promotion?: "q" | "r" | "b" | "n") {
    if (busy || done) return false;
    const played = moves.map((m) => m.san);
    const r = evaluatePuzzleMove(spec, played, { from, to, promotion });
    if (!r.ok) {
      if (r.reason === "illegal" || r.reason === "not_your_turn") return false;
      // Wrong: show the move briefly, then take back only that move.
      const probe = replaySans(fen, played);
      let san = "";
      try {
        san = probe?.move({ from, to, promotion })?.san ?? "";
      } catch {
        return false;
      }
      onWrongAttempt?.();
      playChessSound("puzzleWrong");
      setWrongCount((c) => c + 1);
      setMsg(t.chess.wrongMove);
      setWrongFlash({ san, from, to });
      setBusy(true);
      setTimeout(() => {
        setWrongFlash(null);
        setBusy(false);
      }, 700);
      return true;
    }
    const next = [...moves, { san: r.san, from, to }];
    setMoves(next);
    setMsg("");
    if (r.done) {
      finish(next, r.alternative);
      return true;
    }
    if (r.nextOpponentSan) {
      setBusy(true);
      setMsg(t.chess.opponentThinking);
      const reply = r.nextOpponentSan;
      setTimeout(() => {
        const g = replaySans(fen, next.map((m) => m.san));
        try {
          const mv = g?.move(reply);
          if (mv) setMoves([...next, { san: mv.san, from: mv.from, to: mv.to }]);
        } catch {
          /* QA guarantees legal replies */
        }
        setMsg("");
        setBusy(false);
      }, 500);
    }
    return true;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black">{usePrompt(exercise)}</h2>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <DifficultyStars value={difficulty} label={t.chess.difficultyLabel} />
        {(!examMode || done) &&
          themes.map((k) => (
            <span key={k} className="rounded-full bg-surface-muted px-2 py-0.5 text-xs font-bold" data-testid="puzzle-theme">
              {chessThemeLabel(k, en ? "en" : "uk")}
            </span>
          ))}
      </div>
      <div className="mx-auto max-w-md">
        <ChessBoardFrame
          fen={boardFen}
          mode="puzzle"
          orientation={orientation}
          viewer={viewer}
          interactive={!busy && !done && !replay}
          onMove={onDrop}
          lastMove={lastMove}
          highlightSquares={highlight}
          endReason={replay ? null : endReason}
          endLine={t.chess.puzzleSolved}
          boardWidth={360}
        />
      </div>
      {msg && <p className="font-bold text-center" role="status" aria-live="polite">{msg}</p>}
      {hintStep >= 1 && !done && (
        <div className="rounded-xl bg-surface-muted p-3 text-sm" data-testid="puzzle-hint-text">
          <p>{hintText1}</p>
          {hintStep >= 2 && hintText2 && <p className="mt-1 font-bold">{hintText2}</p>}
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-2">
        {moves.length > 0 && !done && !busy && (
          <button type="button" className="btn-secondary" onClick={restart}>
            {t.chess.restartPuzzle}
          </button>
        )}
        {canHint && (
          <button type="button" className="btn-secondary" onClick={useHint} data-testid="puzzle-hint">
            {hintStep === 0 ? t.chess.puzzleHint : t.chess.puzzleHintMore}
          </button>
        )}
        {!examMode && !done && wrongCount >= MAX_WRONG_BEFORE_REVEAL && (
          <button type="button" className="btn-secondary" onClick={revealSolution} data-testid="puzzle-reveal">
            {t.chess.showSolution}
          </button>
        )}
        {done && !examMode && (
          <button type="button" className="btn-secondary" onClick={() => animate(solutionRecords())} data-testid="puzzle-replay">
            {t.chess.replaySolution}
          </button>
        )}
      </div>
      {done && !examMode && (explanation || source) && (
        <section className="rounded-xl border border-ink/10 p-3 text-sm space-y-1" data-testid="puzzle-explanation">
          <h3 className="font-black">{t.chess.explanation}</h3>
          {explanation && <p>{explanation}</p>}
          {source && (
            <p className="text-ink-muted">
              {t.chess.source}:{" "}
              {source.href ? (
                <a href={source.href} target="_blank" rel="noreferrer" className="underline">
                  {source.text}
                </a>
              ) : (
                source.text
              )}
            </p>
          )}
        </section>
      )}
    </div>
  );
}

/** Endgame drill: play the position out against the bot; goal judged by rules (server re-grades). */
export function ChessEndgameDrillExercise({ exercise, onAnswer }: { exercise: Exercise; onAnswer: (a: unknown) => void }) {
  const { t, locale } = useLocale();
  const { token: authToken } = useAuth();
  const examMode = useContext(ExamModeCtx);
  const assistance = useContext(AssistanceCtx);
  const en = locale === "en";
  const fen = String(exercise.fen);
  const goal = (exercise.goal as EndgameGoal) ?? "win";
  const maxMoves = Number(exercise.maxMoves ?? 30);
  const botLevel = exercise.botLevel === "club" ? "club" : "strong";
  const [moves, setMoves] = useState<DrillMove[]>([]);
  const [thinking, setThinking] = useState(false);
  const [finished, setFinished] = useState<"success" | "fail" | null>(null);
  const [hintShown, setHintShown] = useState(false);
  // Signed game state from the API; the server plays the defender and grading trusts only this.
  const [drillToken, setDrillToken] = useState<string | null>(null);
  // Unsaved exercises (admin preview) are unknown to the API: play the defender locally, ungraded.
  const [localOnly, setLocalOnly] = useState(false);
  const [serverError, setServerError] = useState(false);

  const viewer = useMemo(() => {
    try {
      return new Chess(fen).turn();
    } catch {
      return "w" as const;
    }
  }, [fen]);
  const boardFen = useMemo(() => replaySans(fen, moves.map((m) => m.san))?.fen() ?? fen, [fen, moves]);
  const status = useMemo(() => checkEndgameGoal(fen, moves.map((m) => m.san), goal, maxMoves), [fen, moves, goal, maxMoves]);

  useEffect(() => {
    setMoves([]);
    setThinking(false);
    setFinished(null);
    setHintShown(false);
    setDrillToken(null);
    setServerError(false);
  }, [exercise.id]);

  // Report the outcome once.
  useEffect(() => {
    if (finished || status.status === "in_progress" || thinking) return;
    setFinished(status.status);
    playChessSound(status.status === "success" ? "puzzleSolved" : "puzzleWrong");
    onAnswer({ token: drillToken, hintsUsed: hintShown ? 1 : 0, reason: status.reason });
  }, [status, finished, thinking, drillToken, hintShown, onAnswer]);

  // Local defender (preview only).
  useEffect(() => {
    if (!localOnly || finished || status.status !== "in_progress") return;
    const g = replaySans(fen, moves.map((m) => m.san));
    if (!g || g.turn() === viewer) return;
    let active = true;
    setThinking(true);
    const timer = setTimeout(async () => {
      const mv = await requestBotMove(g.fen(), botLevel, { history: moves.map((m) => m.san), startFen: fen });
      if (!active || !mv) return;
      try {
        const r = g.move({ from: mv.from, to: mv.to, promotion: mv.promotion });
        setMoves((prev) => [...prev, { san: r.san, from: r.from, to: r.to }]);
      } catch {
        /* bot returned an illegal move — ignore */
      }
      setThinking(false);
    }, 350);
    return () => {
      active = false;
      clearTimeout(timer);
      setThinking(false);
    };
  }, [localOnly, moves, fen, viewer, botLevel, finished, status.status]);

  async function sendToServer(prevMoves: DrillMove[], mv: { from: string; to: string; promotion?: string }) {
    setThinking(true);
    setServerError(false);
    try {
      const r = await api<{ sans: string[]; reply: DrillMove | null; token: string }>(
        `/chess/drills/${encodeURIComponent(String(exercise.id))}/move`,
        { token: authToken, body: { token: drillToken, move: mv } },
      );
      const g = replaySans(fen, []);
      const next: DrillMove[] = [];
      for (const san of r.sans) {
        const m = g?.move(san);
        if (m) next.push({ san: m.san, from: m.from, to: m.to });
      }
      setDrillToken(r.token);
      setMoves(next);
    } catch (e) {
      if ((e as { status?: number }).status === 404) {
        setLocalOnly(true);
        return;
      }
      setMoves(prevMoves);
      setServerError(true);
    } finally {
      setThinking(false);
    }
  }

  function onDrop(from: string, to: string, promotion?: "q" | "r" | "b" | "n") {
    if (finished || thinking) return false;
    const g = replaySans(fen, moves.map((m) => m.san));
    if (!g || g.turn() !== viewer) return false;
    try {
      const r = g.move({ from: from as Square, to: to as Square, promotion });
      const prev = moves;
      setMoves([...prev, { san: r.san, from: r.from, to: r.to }]);
      if (!localOnly) void sendToServer(prev, { from: r.from, to: r.to, promotion: r.promotion });
      return true;
    } catch {
      return false;
    }
  }

  function restart() {
    setMoves([]);
    setThinking(false);
    setDrillToken(null);
    setServerError(false);
  }

  const goalText = (goal === "draw" ? t.chess.endgameGoalDraw : goal === "promote" ? t.chess.endgameGoalPromote : t.chess.endgameGoalWin).replace(
    "{n}",
    String(maxMoves),
  );
  const hint = String((en ? exercise.hintEn : exercise.hintUk) ?? exercise.hintUk ?? "");
  const explanation = String((en ? exercise.explanationEn : exercise.explanationUk) ?? exercise.explanationUk ?? "");
  const last = moves.at(-1) ?? null;
  const g = replaySans(fen, moves.map((m) => m.san));
  const endReason = g?.isCheckmate() ? "checkmate" : g?.isStalemate() ? "stalemate" : null;

  return (
    <div className="space-y-4" data-testid="endgame-drill">
      <h2 className="text-xl font-black">{usePrompt(exercise)}</h2>
      <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-bold">
        <span className="rounded-full bg-surface-muted px-3 py-1" data-testid="endgame-goal">
          🎯 {goalText}
        </span>
        <span className="rounded-full bg-surface-muted px-3 py-1" data-testid="endgame-moves-left">
          {t.chess.movesLeft}: {status.movesLeft}
        </span>
      </div>
      <div className="mx-auto max-w-md">
        <ChessBoardFrame
          fen={boardFen}
          mode="play"
          orientation={viewer === "b" ? "black" : "white"}
          viewer={viewer}
          interactive={!finished && !thinking}
          onMove={onDrop}
          lastMove={last}
          endReason={endReason}
          endLine={finished === "success" ? t.chess.endgameSuccess : t.chess.endgameFail}
          boardWidth={360}
        />
      </div>
      <p className="text-center font-bold" role="status" aria-live="polite">
        {finished === "success" ? `✅ ${t.chess.endgameSuccess}` : finished === "fail" ? `❌ ${t.chess.endgameFail}` : thinking ? t.chess.opponentThinking : serverError ? t.chess.drillServerError : ""}
      </p>
      {hintShown && hint && !finished && <div className="rounded-xl bg-surface-muted p-3 text-sm">{hint}</div>}
      {finished && explanation && <div className="rounded-xl bg-surface-muted p-3 text-sm">{explanation}</div>}
      {!finished && (
        <div className="flex flex-wrap justify-center gap-2">
          <button type="button" className="btn-secondary" onClick={restart} disabled={moves.length === 0}>
            {t.chess.restartPuzzle}
          </button>
          {!examMode && hint && !hintShown && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setHintShown(true);
                assistance.onHintUsed?.();
              }}
            >
              💡 {t.chess.hint}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function ChessPlanExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const { t, locale } = useLocale();
  const examMode = useContext(ExamModeCtx);
  const fen = String(exercise.fen);
  const options = (exercise.choices as ChessPlanOption[] | undefined) ?? [];
  const correctIndex = Number(exercise.correctIndex);
  const order = useMemo(() => stableOptionOrder(`${String(exercise.id)}:plan`, options.length), [exercise.id, options.length]);
  const [picked, setPicked] = useState<number | null>(null);
  useEffect(() => setPicked(null), [exercise.id]);
  const viewer = useMemo(() => {
    try {
      return new Chess(fen).turn();
    } catch {
      return "w";
    }
  }, [fen]);
  const arrowFor = (i: number): [Square, Square, string] | null => {
    const opt = options[i];
    if (!opt) return null;
    try {
      const mv = new Chess(fen).move(opt.san);
      return mv ? [mv.from, mv.to, i === correctIndex ? "rgba(34,197,94,0.85)" : "rgba(239,68,68,0.8)"] : null;
    } catch {
      return null;
    }
  };
  const arrows = picked === null ? [] : [arrowFor(picked), picked !== correctIndex ? arrowFor(correctIndex) : null].filter(
    (a): a is [Square, Square, string] => Boolean(a),
  );
  const explain = (o: ChessPlanOption) => (locale === "en" && o.explanationEn ? o.explanationEn : o.explanationUk);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black">{usePrompt(exercise)}</h2>
      <p className="text-sm font-bold text-ink-muted">{t.chess.planPick}</p>
      <div className="mx-auto max-w-md">
        <ChessBoardFrame
          fen={fen}
          mode="explore"
          orientation={viewer === "b" ? "black" : "white"}
          viewer={viewer}
          arrows={arrows}
          boardWidth={360}
        />
      </div>
      <div className="grid gap-2">
        {order.map((i) => {
          const o = options[i]!;
          const revealed = picked !== null && !examMode;
          return (
            <button
              key={i}
              type="button"
              data-testid={`plan-option-${i}`}
              disabled={picked !== null}
              className={clsx(
                "rounded-2xl border-2 px-4 py-3 text-left",
                picked === i ? "border-sky bg-sky/10" : "border-slate-200",
                revealed && i === correctIndex && "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
                revealed && picked === i && i !== correctIndex && "border-rose-400 bg-rose-50 dark:bg-rose-950/30",
              )}
              onClick={() => setPicked(i)}
            >
              <span className="font-black">{o.san}</span>
              {revealed && <span className="mt-1 block text-sm">{explain(o)}</span>}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <>
          {!examMode && (
            <p className="text-center font-bold" role="status">
              {picked === correctIndex ? t.chess.planCorrect : t.chess.planWrong}
            </p>
          )}
          <button type="button" className="btn-primary" onClick={() => onAnswer(picked)}>
            {t.lesson.continue}
          </button>
        </>
      )}
    </div>
  );
}

export function ChessLessonExercise({
  exercise,
  onAnswer,
}: {
  exercise: Exercise;
  onAnswer: (a: unknown) => void;
}) {
  const { t, locale } = useLocale();
  const quiz = exercise.quiz as { q: string; qEn?: string; options: string[]; optionsEn?: string[]; correctIndex: number } | undefined;
  const quizOptions = quiz ? localizeExerciseOptions(locale, quiz) : [];
  const order = useMemo(
    () => stableOptionOrder(`${String(exercise.id)}:quiz`, quiz?.options.length ?? 0),
    [exercise.id, quiz?.options.length],
  );
  const [selected, setSelected] = useState<number | null>(null);
  const fen = String(exercise.fen);
  const viewer = useMemo(() => {
    try {
      return (new Chess(fen)).turn();
    } catch {
      return "w";
    }
  }, [fen]);
  const orientation = viewer === "b" ? "black" : "white";

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black">{usePrompt(exercise)}</h2>
      <div className="mx-auto max-w-md">
        <ChessBoardFrame
          fen={fen}
          mode="explore"
          orientation={orientation}
          viewer={viewer}
          boardWidth={360}
        />
      </div>
      <p className="rounded-2xl bg-slate-100 p-4 leading-relaxed">{String(locale === "en" && exercise.notesEn ? exercise.notesEn : exercise.notesUk)}</p>
      {quiz ? (
        <>
          <p className="font-bold">{locale === "en" && quiz.qEn ? quiz.qEn : quiz.q}</p>
          <div className="grid gap-2">
            {order.map((original) => (
              <button
                key={original}
                type="button"
                className={clsx(
                  "rounded-2xl border-2 px-4 py-3 text-left font-bold",
                  selected === original ? "border-sky bg-sky/10" : "border-slate-200",
                )}
                onClick={() => setSelected(original)}
              >
                {quizOptions[original]}
              </button>
            ))}
          </div>
          <button
            className="btn-primary"
            disabled={selected === null}
            onClick={() => selected !== null && onAnswer(selected)}
          >
            {t.lesson.check}
          </button>
        </>
      ) : (
        <button className="btn-primary" onClick={() => onAnswer(true)}>
          {t.lesson.continue}
        </button>
      )}
    </div>
  );
}
