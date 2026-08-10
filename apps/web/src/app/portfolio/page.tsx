import { UI } from "@eduforge/shared";
import { PortfolioClient } from "./portfolio-client";

/** Learner portfolio — RSC shell + client showcase island. */
export default function PortfolioPage() {
  return (
    <>
      <h1 className="sr-only">Portfolio · {UI.appName}</h1>
      <PortfolioClient />
    </>
  );
}
