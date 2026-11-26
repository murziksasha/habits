import { UI } from "@eduforge/shared";
import { OpeningsClient } from "./openings-client";

/** Opening repertoire trainer: lines on the 1/3/7/21-day ladder. */
export default function OpeningsPage() {
  return (
    <>
      <h1 className="sr-only">{UI.chess.openingTrainer}</h1>
      <OpeningsClient />
    </>
  );
}
