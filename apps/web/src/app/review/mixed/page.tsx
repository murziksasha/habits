import { MixedPracticeClient } from "./mixed-client";

/** Interleaved retrieval practice — RSC shell + client island (SPEC 91). */
export default function MixedPracticePage() {
  return (
    <>
      <h1 className="sr-only">Mixed practice</h1>
      <MixedPracticeClient />
    </>
  );
}
