import { UI } from "@eduforge/shared";
import { LeaderboardClient } from "./leaderboard-client";

/** Leaderboard — RSC shell + client tabs/data island. */
export default function LeaderboardPage() {
  return (
    <>
      <h1 className="sr-only">🏆 {UI.leaderboard.title}</h1>
      <LeaderboardClient />
    </>
  );
}
