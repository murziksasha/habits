import { UI } from "@eduforge/shared";
import { GameReviewClient } from "./review-client";

/** Post-game review: move-by-move navigation with engine annotations. */
export default async function GameReviewPage({ params }: { params: Promise<{ gameId: string }> }) {
  const { gameId } = await params;
  return (
    <>
      <h1 className="sr-only">{UI.chess.reviewGame}</h1>
      <GameReviewClient gameId={gameId} />
    </>
  );
}
