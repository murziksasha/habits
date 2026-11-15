import { UI } from "@eduforge/shared";
import { PlayClient } from "./play-client";

/** Chess play / matchmaking — RSC shell + client board island. */
export default function PlayPage() {
  return (
    <>
      <h1 className="sr-only">{UI.nav.play}</h1>
      <PlayClient />
    </>
  );
}
