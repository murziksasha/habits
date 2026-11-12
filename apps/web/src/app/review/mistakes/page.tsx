import { MistakesClient } from "./mistakes-client";

/** Mistake notebook — exercise-level spaced repetition (SPEC 92). */
export default function MistakesPage() {
  return (
    <>
      <h1 className="sr-only">Mistake notebook</h1>
      <MistakesClient />
    </>
  );
}
