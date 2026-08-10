import { freemiumMatrix, UI } from "@eduforge/shared";
import { PricingClient } from "./pricing-client";

/**
 * Pricing — Server Component shell (static freemium table meta) + client checkout island.
 */
export default function PricingPage() {
  const matrix = freemiumMatrix();
  return (
    <div className="space-y-4">
      <p className="sr-only">
        {UI.appName} freemium: {matrix.freeLessonsPerCourse} free lessons,{" "}
        {matrix.freeHearts} hearts
      </p>
      <PricingClient />
    </div>
  );
}
