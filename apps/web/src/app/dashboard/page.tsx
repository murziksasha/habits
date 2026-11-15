import { UI } from "@eduforge/shared";
import { DashboardClient } from "./dashboard-client";

/** Home dashboard — RSC shell + client mission/stats island. */
export default function DashboardPage() {
  return (
    <>
      <h1 className="sr-only">{UI.appName} · Home</h1>
      <DashboardClient />
    </>
  );
}
