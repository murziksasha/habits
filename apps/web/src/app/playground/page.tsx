import { UI } from "@eduforge/shared";
import { PlaygroundClient } from "./playground-client";

/** Code playground — RSC shell + client editor/challenges island. */
export default function PlaygroundPage() {
  return (
    <>
      <h1 className="sr-only">{UI.nav.playground}</h1>
      <PlaygroundClient />
    </>
  );
}
