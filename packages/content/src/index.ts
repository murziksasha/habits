import { englishContent as englishRaw } from "./english.js";
import { chessContent as chessRaw } from "./chess.js";
import { typingContent as typingRaw } from "./typing.js";
import { speedReadingContent as speedReadingRaw } from "./speed-reading.js";
import { logicContent as logicRaw } from "./logic.js";
import { programmingContent as programmingRaw } from "./programming.js";
import { typescriptContent as typescriptRaw } from "./typescript.js";
import { htmlSemanticsContent as htmlSemanticsRaw } from "./html-semantics.js";
import { cssLayoutContent as cssLayoutRaw } from "./css-layout.js";
import { qaTheoryContent as qaTheoryRaw } from "./qa-theory.js";
import { jsFundamentalsContent as jsFundamentalsRaw } from "./js-fundamentals.js";
import { reactFundamentalsContent as reactFundamentalsRaw } from "./react-fundamentals.js";
import { sqlFundamentalsContent as sqlFundamentalsRaw } from "./sql-fundamentals.js";
import { nodeFundamentalsContent as nodeFundamentalsRaw } from "./node-fundamentals.js";
import { expressFundamentalsContent as expressFundamentalsRaw } from "./express-fundamentals.js";
import { embeddedCppContent as embeddedCppRaw } from "./embedded-cpp.js";
import { normalizeCourseLocales } from "./locale-normalize.js";

/** Skill tracks: promptEn filled via skill-prompt-en map when missing in source. */
export const englishContent = normalizeCourseLocales(englishRaw);
export const chessContent = normalizeCourseLocales(chessRaw);
export const typingContent = normalizeCourseLocales(typingRaw);
export const speedReadingContent = normalizeCourseLocales(speedReadingRaw);
export const logicContent = normalizeCourseLocales(logicRaw);
export const programmingContent = normalizeCourseLocales(programmingRaw);
export const typescriptContent = normalizeCourseLocales(typescriptRaw);
export const htmlSemanticsContent = normalizeCourseLocales(htmlSemanticsRaw);
export const cssLayoutContent = normalizeCourseLocales(cssLayoutRaw);
export const qaTheoryContent = normalizeCourseLocales(qaTheoryRaw);
export const jsFundamentalsContent = normalizeCourseLocales(jsFundamentalsRaw);
export const reactFundamentalsContent = normalizeCourseLocales(reactFundamentalsRaw);
export const sqlFundamentalsContent = normalizeCourseLocales(sqlFundamentalsRaw);
export const nodeFundamentalsContent = normalizeCourseLocales(nodeFundamentalsRaw);
export const expressFundamentalsContent = normalizeCourseLocales(expressFundamentalsRaw);
export const embeddedCppContent = normalizeCourseLocales(embeddedCppRaw);

export { FLASHCARD_DECKS } from "./flashcards.js";
export type { CourseContent, UnitContent, LessonContent, Exercise } from "./types.js";
export type { DeckSeed, FlashcardSeed } from "./flashcards.js";
export {
  normalizeCourseLocales,
  ensureFreemiumFreeLessons,
  FREEMIUM_FREE_LESSON_COUNT,
} from "./locale-normalize.js";
export { SKILL_PROMPT_EN_BY_ID } from "./skill-prompt-en.js";
export { parseMdxLesson, mdxToExercises, mdxToLesson } from "./mdx/parse.js";
export type { MdxFrontmatter, ParsedMdxLesson, MdxLessonSeed } from "./mdx/parse.js";
