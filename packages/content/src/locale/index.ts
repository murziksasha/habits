import type { ExerciseLocaleEnrichment } from "./types.js";
import { ENGLISH_LOCALE_ENRICHMENT } from "./english.js";
import { PROGRAMMING_LOCALE_ENRICHMENT } from "./programming.js";
import { APPLIED_ALGORITHMS_LOCALE_ENRICHMENT } from "./applied-algorithms.js";
import { SPEED_READING_LOCALE_ENRICHMENT } from "./speed-reading.js";
import { PYTHON_FOR_AI_LOCALE_ENRICHMENT } from "./python-for-ai.js";
import { JS_FUNDAMENTALS_LOCALE_ENRICHMENT } from "./js-fundamentals.js";
import { EMBEDDED_CPP_LOCALE_ENRICHMENT } from "./embedded-cpp.js";
import { LOGIC_LOCALE_ENRICHMENT } from "./logic.js";
import { CHESS_LOCALE_ENRICHMENT } from "./chess.js";

export type { ExerciseLocaleEnrichment };

export const GLOBAL_LOCALE_ENRICHMENT_BY_ID: Record<string, ExerciseLocaleEnrichment> = {
  ...ENGLISH_LOCALE_ENRICHMENT,
  ...PROGRAMMING_LOCALE_ENRICHMENT,
  ...APPLIED_ALGORITHMS_LOCALE_ENRICHMENT,
  ...SPEED_READING_LOCALE_ENRICHMENT,
  ...PYTHON_FOR_AI_LOCALE_ENRICHMENT,
  ...JS_FUNDAMENTALS_LOCALE_ENRICHMENT,
  ...EMBEDDED_CPP_LOCALE_ENRICHMENT,
  ...LOGIC_LOCALE_ENRICHMENT,
  ...CHESS_LOCALE_ENRICHMENT,
};
