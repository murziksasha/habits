import { describe, expect, it } from "vitest";
import { nextjsFullstackContent } from "./index.js";

const reviewedUnits = new Set([
  "nx_app_routing", "nx_server_client_boundaries", "nx_data_access",
  "nx_mutations_actions", "nx_identity_authz", "nx_caching_failures",
  "nx_deploy_diagnostics_capstone", "nx_streaming_ppr", "nx_metadata_assets",
  "nx_middleware_edges",
]);

describe("Next.js reviewed exercise localization", () => {
  it("provides aligned English choices for reviewed exercises in the assembled course", () => {
    const units = nextjsFullstackContent.units.filter((unit) => reviewedUnits.has(unit.slug));
    expect(units).toHaveLength(reviewedUnits.size);
    const exercises = units.flatMap((unit) => unit.lessons.flatMap((lesson) => lesson.exercises));
    for (const exercise of exercises) {
      if (exercise.type === "mcq" || exercise.type === "code_read") {
        expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
        expect(exercise.optionsEn?.join(" "), exercise.id).not.toMatch(/[А-Яа-яІіЇїЄєҐґ]/u);
      }
      if (exercise.type === "match") {
        expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
        expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[А-Яа-яІіЇїЄєҐґ]/u);
      }
    }
  });
});
