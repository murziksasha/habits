import { EmbedPlaygroundClient } from "./embed-client";

/**
 * Public embed playground — RSC shell (no auth) + Monaco client island.
 */
export default function EmbedPlaygroundPage() {
  return <EmbedPlaygroundClient />;
}
