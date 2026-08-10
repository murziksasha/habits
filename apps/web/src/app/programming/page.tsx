import { UI } from "@eduforge/shared";
import { ProgrammingClient } from "./programming-client";

/** Programming path hub — RSC shell + client path/minis island. */
export default function ProgrammingPage() {
  return (
    <>
      <h1 className="sr-only">{UI.nav.programming}</h1>
      <ProgrammingClient />
    </>
  );
}
