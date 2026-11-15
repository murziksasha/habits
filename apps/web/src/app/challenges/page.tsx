import { UI } from "@eduforge/shared";
import { ChallengesClient } from "./challenges-client";

/** Weekly challenges — RSC shell + client data island. */
export default function ChallengesPage() {
  return (
    <>
      <h1 className="sr-only">{UI.nav.challenges}</h1>
      <ChallengesClient />
    </>
  );
}
