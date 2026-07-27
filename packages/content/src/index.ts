import { englishContent as englishRaw } from "./english.js";
import { chessContent as chessRaw } from "./chess.js";
import { typingContent as typingRaw } from "./typing.js";
import { speedReadingContent as speedReadingRaw } from "./speed-reading.js";
import { logicContent as logicRaw } from "./logic.js";
import { normalizeCourseLocales } from "./locale-normalize.js";

/** Skill tracks: promptEn filled via skill-prompt-en map when missing in source. */
export const englishContent = normalizeCourseLocales(englishRaw);
export const chessContent = normalizeCourseLocales(chessRaw);
export const typingContent = normalizeCourseLocales(typingRaw);
export const speedReadingContent = normalizeCourseLocales(speedReadingRaw);
export const logicContent = normalizeCourseLocales(logicRaw);

export { programmingContent } from "./programming.js";
export { typescriptContent } from "./typescript.js";
export { htmlSemanticsContent } from "./html-semantics.js";
export { cssLayoutContent } from "./css-layout.js";
export { qaTheoryContent } from "./qa-theory.js";
export { jsFundamentalsContent } from "./js-fundamentals.js";
export { reactFundamentalsContent } from "./react-fundamentals.js";
export { sqlFundamentalsContent } from "./sql-fundamentals.js";
export { nodeFundamentalsContent } from "./node-fundamentals.js";
export { expressFundamentalsContent } from "./express-fundamentals.js";
export { FLASHCARD_DECKS } from "./flashcards.js";
export type { CourseContent, UnitContent, LessonContent, Exercise } from "./types.js";
export type { DeckSeed, FlashcardSeed } from "./flashcards.js";
export { normalizeCourseLocales } from "./locale-normalize.js";
export { SKILL_PROMPT_EN_BY_ID } from "./skill-prompt-en.js";
export { parseMdxLesson, mdxToExercises } from "./mdx/parse.js";
export type { MdxFrontmatter, ParsedMdxLesson } from "./mdx/parse.js";
