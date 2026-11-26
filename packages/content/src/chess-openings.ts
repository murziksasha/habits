/**
 * Opening repertoires (phase 7). The trees live in @eduforge/chess-core so the bot book
 * and the server grader share them; this module re-exports them for content tooling.
 */
export {
  REPERTOIRES,
  getRepertoire,
  findOpeningLine,
  learnerPlies,
  type OpeningLine,
  type OpeningNode,
  type Repertoire,
} from "@eduforge/chess-core";
