import { UI } from "@eduforge/shared";
import { PuzzlesClient } from "./puzzles-client";

/** Adaptive chess puzzle trainer (Glicko-2 rating, modes, placement). */
export default function PuzzlesPage() {
  return (
    <>
      <h1 className="sr-only">{UI.chess.puzzleTrainer}</h1>
      <PuzzlesClient />
    </>
  );
}
