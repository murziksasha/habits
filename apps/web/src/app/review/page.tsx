import { UI } from "@eduforge/shared";
import { ReviewClient } from "./review-client";

/** Review inbox — RSC shell + client queue island. */
export default function ReviewPage() {
  return (
    <>
      <h1 className="sr-only">{UI.nav.review}</h1>
      <ReviewClient />
    </>
  );
}
