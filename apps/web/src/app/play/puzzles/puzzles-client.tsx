"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  CHESS_THEMES,
  META_CHESS_THEMES,
  chessThemeLabel,
  getCourseParts,
  type ChessThemeKey,
} from "@eduforge/shared";
import { ExercisePlayer, type Exercise } from "@/components/exercises";
import { PageLoading } from "@/components/page-loading";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { useRequireAuth } from "@/lib/use-require-auth";

type Mode = "mix" | "theme" | "mate" | "endgame" | "placement";
type Rating = { rating: number; rd: number; attempts: number; placed: boolean; provisional: boolean };
type NextRes = { lessonId: string; puzzleRating: number; exercise: Exercise; rating: Rating };
type AttemptRes = { correct: boolean; score: number; ratingDelta: number; rating: Rating };
type ThemeStat = { theme: string; accuracy: number; attempts: number };
type OwnPuzzle = { id: string; gameId: string | null; exercise: Exercise };

const PLACEMENT_LENGTH = 8;
const THEME_KEYS = (Object.keys(CHESS_THEMES) as ChessThemeKey[]).filter((k) => !META_CHESS_THEMES.has(k));

export function PuzzlesClient() {
  const { ready } = useRequireAuth();
  const { token } = useAuth();
  const { t, locale } = useLocale();
  const en = locale === "en";
  const [rating, setRating] = useState<Rating | null>(null);
  const [mode, setMode] = useState<Mode>("mix");
  const [theme, setTheme] = useState<ChessThemeKey>("fork");
  const [current, setCurrent] = useState<NextRes | null>(null);
  const [result, setResult] = useState<AttemptRes | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [themes, setThemes] = useState<ThemeStat[]>([]);
  const [placementLeft, setPlacementLeft] = useState(0);
  const [partId, setPartId] = useState<string | null>(null);
  const [own, setOwn] = useState<OwnPuzzle[]>([]);
  const [ownCurrent, setOwnCurrent] = useState<OwnPuzzle | null>(null);
  const [ownDone, setOwnDone] = useState<boolean | null>(null);
  const wrongRef = useRef(0);
  const startedAt = useRef(Date.now());

  const loadMeta = useCallback(async () => {
    const [r, th] = await Promise.all([
      api<{ rating: Rating; partId: string | null }>("/chess/puzzles/rating/me", { token }),
      api<{ themes: ThemeStat[] }>("/chess/puzzles/themes/me", { token }),
    ]);
    setRating(r.rating);
    setPartId(r.partId);
    setThemes(th.themes);
    api<{ items: OwnPuzzle[] }>("/chess/personal-puzzles/due", { token })
      .then((d) => setOwn(d.items))
      .catch(() => undefined);
  }, [token]);

  function startOwn() {
    wrongRef.current = 0;
    setOwnDone(null);
    setOwnCurrent(own[0] ?? null);
  }

  async function onOwnAnswer(answer: unknown) {
    if (!ownCurrent) return;
    const a = (answer ?? {}) as { sans?: string[]; revealed?: boolean };
    const res = await api<{ correct: boolean }>(`/chess/personal-puzzles/${ownCurrent.id}/attempt`, {
      token,
      body: { sans: a.sans ?? [], revealed: a.revealed === true, wrongAttempts: wrongRef.current },
    });
    setOwnDone(res.correct);
    setOwn((list) => list.filter((x) => x.id !== ownCurrent.id));
  }

  const loadNext = useCallback(
    async (m: Mode = mode) => {
      setError(null);
      setResult(null);
      wrongRef.current = 0;
      startedAt.current = Date.now();
      const q = new URLSearchParams({ mode: m });
      if (m === "theme") q.set("theme", theme);
      try {
        const res = await api<NextRes>(`/chess/puzzles/next?${q}`, { token });
        setCurrent(res);
        setRating(res.rating);
      } catch {
        setCurrent(null);
        setError(t.chess.noPuzzles);
      }
    },
    [mode, theme, token, t.chess.noPuzzles],
  );

  useEffect(() => {
    if (!ready) return;
    loadMeta().catch(() => undefined);
  }, [ready, loadMeta]);

  useEffect(() => {
    if (!ready || !rating) return;
    if (!current && !error && (rating.placed || placementLeft > 0)) loadNext().catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, rating?.placed]);

  async function onAnswer(answer: unknown) {
    if (!current || result) return;
    const a = (answer ?? {}) as { sans?: string[]; hintsUsed?: number; revealed?: boolean };
    const res = await api<AttemptRes>(`/chess/puzzles/${encodeURIComponent(String(current.exercise.id))}/attempt`, {
      token,
      body: {
        sans: a.sans ?? [],
        hintsUsed: a.hintsUsed ?? 0,
        revealed: a.revealed === true,
        wrongAttempts: wrongRef.current,
        msSpent: Date.now() - startedAt.current,
      },
    });
    setResult(res);
    setRating(res.rating);
    if (mode === "placement") {
      const left = placementLeft - 1;
      setPlacementLeft(left);
      if (left <= 0) {
        const fin = await api<{ rating: Rating; partId: string }>("/chess/puzzles/placement/finish", { token, method: "POST", body: {} });
        setRating(fin.rating);
        setPartId(fin.partId);
        setMode("mix");
      }
    }
    api<{ themes: ThemeStat[] }>("/chess/puzzles/themes/me", { token })
      .then((th) => setThemes(th.themes))
      .catch(() => undefined);
  }

  function startPlacement() {
    setMode("placement");
    setPlacementLeft(PLACEMENT_LENGTH);
    loadNext("placement").catch(() => undefined);
  }

  async function skipPlacement() {
    const res = await api<{ rating: Rating }>("/chess/puzzles/placement/skip", { token, method: "POST", body: {} });
    setRating(res.rating);
  }

  function switchMode(m: Mode) {
    setMode(m);
    if (rating?.placed) loadNext(m).catch(() => undefined);
  }

  if (!ready || !rating) return <PageLoading label={t.common.loading} />;
  const part = partId ? getCourseParts("chess").find((p) => p.id === partId) : null;
  const inPlacement = mode === "placement" && placementLeft > 0;

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black">🧩 {t.chess.puzzleTrainer}</h2>
          <p className="text-ink-muted" data-testid="puzzle-rating">
            {t.chess.puzzleRating}: <strong>{rating.rating}</strong>
            {rating.provisional && <span> ({t.chess.provisional})</span>}
            {result && (
              <span className={result.ratingDelta >= 0 ? "text-emerald-600" : "text-rose-600"}>
                {" "}
                {result.ratingDelta >= 0 ? "+" : ""}
                {result.ratingDelta}
              </span>
            )}
          </p>
        </div>
        <Link href="/play" className="btn-secondary">
          ♟️ {t.chess.playOnline}
        </Link>
      </div>

      {!rating.placed && !inPlacement && (
        <div className="card space-y-3" data-testid="placement-banner">
          <p>{t.chess.placementIntro}</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn-primary" onClick={startPlacement}>
              {t.chess.placementStart}
            </button>
            <button type="button" className="btn-secondary" onClick={() => skipPlacement().catch(() => undefined)}>
              {t.chess.placementSkip}
            </button>
          </div>
        </div>
      )}

      {part && rating.placed && (
        <p className="card text-sm">
          {t.chess.recommendedUnit}: <strong>{en ? part.titleEn : part.titleUk}</strong>{" "}
          <Link href="/courses/chess" className="underline">
            {t.chess.learn}
          </Link>
        </p>
      )}

      {rating.placed && (
        <div className="flex flex-wrap items-center gap-2" role="tablist">
          {(["mix", "theme", "mate", "endgame"] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              className={mode === m ? "btn-primary" : "btn-secondary"}
              onClick={() => switchMode(m)}
            >
              {m === "mix" ? t.chess.modeMix : m === "theme" ? t.chess.modeTheme : m === "mate" ? t.chess.modeMate : t.chess.modeEndgame}
            </button>
          ))}
          {mode === "theme" && (
            <select
              className="input w-auto"
              aria-label={t.chess.themesLabel}
              value={theme}
              onChange={(e) => setTheme(e.target.value as ChessThemeKey)}
              onBlur={() => loadNext("theme").catch(() => undefined)}
            >
              {THEME_KEYS.map((k) => (
                <option key={k} value={k}>
                  {chessThemeLabel(k, en ? "en" : "uk")}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {rating.placed && !inPlacement && own.length > 0 && !ownCurrent && (
        <div className="card flex flex-wrap items-center justify-between gap-2" data-testid="own-puzzles">
          <p className="font-bold">
            {t.chess.ownGamePuzzle}: {own.length}
          </p>
          <button type="button" className="btn-primary" onClick={startOwn}>
            {t.chess.nextPuzzle}
          </button>
        </div>
      )}

      {ownCurrent && (
        <div className="card space-y-4">
          <p className="text-sm font-bold">
            {t.chess.ownGamePuzzle}
            {ownCurrent.gameId && (
              <>
                {" · "}
                <Link href={`/play/review/${ownCurrent.gameId}`} className="underline">
                  {t.chess.reviewGame}
                </Link>
              </>
            )}
          </p>
          <ExercisePlayer
            key={ownCurrent.id}
            exercise={ownCurrent.exercise}
            onAnswer={(a) => onOwnAnswer(a).catch(() => setError(t.common.error))}
            onWrongAttempt={() => {
              wrongRef.current += 1;
            }}
          />
          {ownDone !== null && (
            <div className="flex justify-center">
              <button type="button" className="btn-primary" onClick={() => (own.length ? startOwn() : setOwnCurrent(null))}>
                {t.chess.nextPuzzle}
              </button>
            </div>
          )}
        </div>
      )}

      {inPlacement && <p className="font-bold">{`${PLACEMENT_LENGTH - placementLeft + 1} / ${PLACEMENT_LENGTH}`}</p>}

      {error && <p className="card">{error}</p>}

      {current && (rating.placed || inPlacement || result) && (
        <div className="card space-y-4">
          <ExercisePlayer
            key={String(current.exercise.id)}
            exercise={current.exercise}
            onAnswer={(a) => onAnswer(a).catch(() => setError(t.common.error))}
            onWrongAttempt={() => {
              wrongRef.current += 1;
            }}
            examMode={inPlacement}
          />
          {result && (
            <div className="flex justify-center">
              <button type="button" className="btn-primary" onClick={() => loadNext().catch(() => undefined)} data-testid="next-puzzle">
                {t.chess.nextPuzzle}
              </button>
            </div>
          )}
        </div>
      )}

      {themes.length > 0 && (
        <section className="card space-y-2">
          <h3 className="font-black">{t.chess.themeAccuracy}</h3>
          <ul className="grid gap-1 sm:grid-cols-2">
            {themes.slice(0, 12).map((s) => (
              <li key={s.theme} className="flex justify-between text-sm">
                <span>{chessThemeLabel(s.theme, en ? "en" : "uk")}</span>
                <span>
                  {Math.round(s.accuracy * 100)}% · {s.attempts}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
