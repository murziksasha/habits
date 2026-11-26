import { applyChessUpgrade } from "./chess-upgrade/index.js";
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
import { sysadminContent as sysadminRaw } from "./sysadmin.js";
import { devopsContent as devopsRaw } from "./devops/index.js";
import { softwareTestingContent as softwareTestingRaw } from "./software-testing.js";
import { postgresqlAppsContent as postgresqlAppsRaw } from "./postgresql-apps.js";
import { gitWorkflowsContent as gitWorkflowsRaw } from "./git-workflows.js";
import { webSecurityContent as webSecurityRaw } from "./web-security.js";
import { aiDevelopmentContent as aiDevelopmentRaw } from "./ai-development.js";
import { pythonForAiContent as pythonForAiRaw } from "./python-for-ai.js";
import { agenticSystemsContent as agenticSystemsRaw } from "./agentic-systems.js";
import { llmopsContent as llmopsRaw } from "./llmops.js";
import { aiSecurityContent as aiSecurityRaw } from "./ai-security.js";
import { aiProductContent as aiProductRaw } from "./ai-product.js";
import { nextjsFullstackContent as nextjsFullstackRaw } from "./nextjs-fullstack.js";
import { appliedAlgorithmsContent as appliedAlgorithmsRaw } from "./applied-algorithms.js";
import { goFundamentalsContent as goFundamentalsRaw } from "./go-fundamentals.js";
import { webAccessibilityContent as webAccessibilityRaw } from "./web-accessibility.js";
import { restApiDesignContent as restApiDesignRaw } from "./rest-api-design.js";
import { frontendPerformanceContent as frontendPerformanceRaw } from "./frontend-performance.js";
import { browserWebApisContent as browserWebApisRaw } from "./browser-web-apis.js";
import { electricalEngineeringContent as electricalEngineeringRaw } from "./electrical-engineering/index.js";
import type { CourseContent } from "./types.js";
import { normalizeCourseLocales } from "./locale-normalize.js";
import { expandEnglish } from "./expansion/english-exp.js";
import { expandEnglishDeep } from "./expansion/english-deep.js";
import { expandChess } from "./expansion/chess-exp.js";
import { expandChessDeep } from "./expansion/chess-deep.js";
import { expandFoundationTransfer } from "./expansion/foundation-transfer.js";
import { expandAppliedCapstones } from "./expansion/applied-capstones.js";
import { expandAiStackCapstones } from "./expansion/ai-stack-capstones.js";
import { expandCoreTransfer } from "./expansion/core-transfer.js";
import { expandTyping } from "./expansion/typing-exp.js";
import { expandSpeedReading } from "./expansion/speed-reading-exp.js";
import { expandLogic } from "./expansion/logic-exp.js";
import { expandJsFundamentals } from "./expansion/js-fundamentals-exp.js";
import { expandTypescript } from "./expansion/typescript-exp.js";
import { expandReactFundamentals } from "./expansion/react-fundamentals-exp.js";
import { expandNodeFundamentals } from "./expansion/node-fundamentals-exp.js";
import { expandExpressFundamentals } from "./expansion/express-fundamentals-exp.js";
import { expandHtmlSemantics } from "./expansion/html-semantics-exp.js";
import { expandCssLayout } from "./expansion/css-layout-exp.js";
import { expandQaTheory } from "./expansion/qa-theory-exp.js";
import { expandProgramming } from "./expansion/programming-exp.js";
import { expandSqlFundamentals } from "./expansion/sql-fundamentals-exp.js";
import { expandEmbeddedCpp } from "./expansion/embedded-cpp-exp.js";
import { expandSysadmin } from "./expansion/sysadmin-exp.js";
import { expandDevops } from "./expansion/devops-exp.js";
import { expandSoftwareTesting } from "./expansion/software-testing-exp.js";
import { expandPostgresqlApps } from "./expansion/postgresql-apps-exp.js";
import { expandGitWorkflows } from "./expansion/git-workflows-exp.js";
import { expandWebSecurity } from "./expansion/web-security-exp.js";
import { expandAiDevelopment } from "./expansion/ai-development-exp.js";
import { expandPythonForAi } from "./expansion/python-for-ai-exp.js";
import { expandAgenticSystems } from "./expansion/agentic-systems-exp.js";
import { expandLlmops } from "./expansion/llmops-exp.js";
import { expandAiSecurity } from "./expansion/ai-security-exp.js";
import { expandAiProduct } from "./expansion/ai-product-exp.js";
import { expandNextjsFullstack } from "./expansion/nextjs-fullstack-exp.js";
import { expandAppliedAlgorithms } from "./expansion/applied-algorithms-exp.js";

/** Skill tracks: promptEn filled via skill-prompt-en map when missing in source. */
export const englishContent = normalizeCourseLocales(expandFoundationTransfer(expandEnglishDeep(expandEnglish(englishRaw))));
export const chessContent = normalizeCourseLocales(applyChessUpgrade(expandFoundationTransfer(expandChessDeep(expandChess(chessRaw)))));
export const typingContent = normalizeCourseLocales(expandFoundationTransfer(expandTyping(typingRaw)));
export const speedReadingContent = normalizeCourseLocales(expandFoundationTransfer(expandSpeedReading(speedReadingRaw)));
export const logicContent = normalizeCourseLocales(expandFoundationTransfer(expandLogic(logicRaw)));
export const programmingContent = normalizeCourseLocales(expandCoreTransfer(expandProgramming(programmingRaw)));
export const typescriptContent = normalizeCourseLocales(expandCoreTransfer(expandTypescript(typescriptRaw)));
export const htmlSemanticsContent = normalizeCourseLocales(expandCoreTransfer(expandHtmlSemantics(htmlSemanticsRaw)));
export const cssLayoutContent = normalizeCourseLocales(expandCoreTransfer(expandCssLayout(cssLayoutRaw)));
export const qaTheoryContent = normalizeCourseLocales(expandCoreTransfer(expandQaTheory(qaTheoryRaw)));
export const jsFundamentalsContent = normalizeCourseLocales(expandCoreTransfer(expandJsFundamentals(jsFundamentalsRaw)));
export const reactFundamentalsContent = normalizeCourseLocales(expandCoreTransfer(expandReactFundamentals(reactFundamentalsRaw)));
export const sqlFundamentalsContent = normalizeCourseLocales(expandCoreTransfer(expandSqlFundamentals(sqlFundamentalsRaw)));
export const nodeFundamentalsContent = normalizeCourseLocales(expandCoreTransfer(expandNodeFundamentals(nodeFundamentalsRaw)));
export const expressFundamentalsContent = normalizeCourseLocales(expandCoreTransfer(expandExpressFundamentals(expressFundamentalsRaw)));
export const embeddedCppContent = normalizeCourseLocales(expandCoreTransfer(expandEmbeddedCpp(embeddedCppRaw)));
export const sysadminContent = normalizeCourseLocales(expandCoreTransfer(expandSysadmin(sysadminRaw)));
export const devopsContent = normalizeCourseLocales(expandDevops(devopsRaw));
export const softwareTestingContent = normalizeCourseLocales(expandCoreTransfer(expandSoftwareTesting(softwareTestingRaw)));
export const postgresqlAppsContent = normalizeCourseLocales(expandCoreTransfer(expandPostgresqlApps(postgresqlAppsRaw)));
export const gitWorkflowsContent = normalizeCourseLocales(expandCoreTransfer(expandGitWorkflows(gitWorkflowsRaw)));
export const webSecurityContent = normalizeCourseLocales(expandCoreTransfer(expandWebSecurity(webSecurityRaw)));
export const aiDevelopmentContent = normalizeCourseLocales(expandAiStackCapstones(expandAiDevelopment(aiDevelopmentRaw)));
export const pythonForAiContent = normalizeCourseLocales(expandAiStackCapstones(expandPythonForAi(pythonForAiRaw)));
export const agenticSystemsContent = normalizeCourseLocales(expandAiStackCapstones(expandAgenticSystems(agenticSystemsRaw)));
export const llmopsContent = normalizeCourseLocales(expandAiStackCapstones(expandLlmops(llmopsRaw)));
export const aiSecurityContent = normalizeCourseLocales(expandAiStackCapstones(expandAiSecurity(aiSecurityRaw)));
export const aiProductContent = normalizeCourseLocales(expandAiStackCapstones(expandAiProduct(aiProductRaw)));
export const nextjsFullstackContent = normalizeCourseLocales(expandCoreTransfer(expandNextjsFullstack(nextjsFullstackRaw)));
export const appliedAlgorithmsContent = normalizeCourseLocales(expandCoreTransfer(expandAppliedAlgorithms(appliedAlgorithmsRaw)));
export const goFundamentalsContent = normalizeCourseLocales(expandAppliedCapstones(goFundamentalsRaw));
export const webAccessibilityContent = normalizeCourseLocales(expandAppliedCapstones(webAccessibilityRaw));
export const restApiDesignContent = normalizeCourseLocales(expandAppliedCapstones(restApiDesignRaw));
export const frontendPerformanceContent = normalizeCourseLocales(expandAppliedCapstones(frontendPerformanceRaw));
export const browserWebApisContent = normalizeCourseLocales(expandAppliedCapstones(browserWebApisRaw));
export const electricalEngineeringContent = normalizeCourseLocales(electricalEngineeringRaw);

export { FLASHCARD_DECKS } from "./flashcards.js";
export type { CourseContent, UnitContent, LessonContent, Exercise } from "./types.js";
export type { DeckSeed, FlashcardSeed } from "./flashcards.js";
export {
  normalizeCourseLocales,
  ensureFreemiumFreeLessons,
  FREEMIUM_FREE_LESSON_COUNT,
} from "./locale-normalize.js";
export { SKILL_PROMPT_EN_BY_ID } from "./skill-prompt-en.js";
export {
  parseMdxLesson,
  mdxToExercises,
  mdxToLesson,
  parseConceptBlock,
  parseExplainIdeas,
} from "./mdx/parse.js";
export type { MdxFrontmatter, ParsedMdxLesson, MdxLessonSeed, MdxConcept } from "./mdx/parse.js";

/** Every published course, in COURSE_SLUGS order. Used by the quality gate and seed-adjacent tests. */
export const ALL_COURSE_CONTENTS: CourseContent[] = [
  englishContent,
  chessContent,
  typingContent,
  speedReadingContent,
  logicContent,
  programmingContent,
  typescriptContent,
  htmlSemanticsContent,
  cssLayoutContent,
  qaTheoryContent,
  jsFundamentalsContent,
  reactFundamentalsContent,
  sqlFundamentalsContent,
  nodeFundamentalsContent,
  expressFundamentalsContent,
  embeddedCppContent,
  sysadminContent,
  devopsContent,
  softwareTestingContent,
  postgresqlAppsContent,
  gitWorkflowsContent,
  webSecurityContent,
  aiDevelopmentContent,
  pythonForAiContent,
  agenticSystemsContent,
  llmopsContent,
  aiSecurityContent,
  aiProductContent,
  nextjsFullstackContent,
  appliedAlgorithmsContent,
  goFundamentalsContent,
  webAccessibilityContent,
  restApiDesignContent,
  frontendPerformanceContent,
  browserWebApisContent,
  electricalEngineeringContent,
];
export { ENDGAME_DRILL_SPECS } from "./chess-upgrade/endgame-drills.js";
export { REPERTOIRES } from "./chess-openings.js";
