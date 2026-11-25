import type {
  CircuitDocument,
  CircuitAnalysis,
  CircuitCriterion,
  CircuitConstraints,
} from "@eduforge/shared";

type ExerciseBody =
  | {
      id: string;
      type: "mcq";
      promptUk: string;
      promptEn?: string;
      options: string[];
      optionsEn?: string[];
      correctIndex: number;
      explanationUk?: string;
      explanationEn?: string;
    }
  | {
      id: string;
      type: "translate";
      promptUk: string;
      promptEn?: string;
      source: string;
      accepted: string[];
      direction: "en_uk" | "uk_en";
    }
  | {
      id: string;
      type: "match";
      promptUk: string;
      promptEn?: string;
      pairs: { left: string; right: string }[];
      pairsEn?: { left: string; right: string }[];
      explanationUk?: string;
      explanationEn?: string;
    }
  | {
      id: string;
      type: "order_words";
      promptUk: string;
      promptEn?: string;
      words: string[];
      correct: string[];
    }
  | {
      id: string;
      type: "fill_blank";
      promptUk: string;
      promptEn?: string;
      sentence: string;
      accepted: string[];
    }
  | {
      id: string;
      type: "typing";
      promptUk: string;
      promptEn?: string;
      text: string;
      layout: "en" | "uk";
      targetWpm?: number;
    }
  | {
      id: string;
      type: "rsvp";
      promptUk: string;
      promptEn?: string;
      text: string;
      textEn?: string;
      wpm: number;
    }
  | {
      id: string;
      type: "comprehension";
      promptUk: string;
      promptEn?: string;
      passage: string;
      passageEn?: string;
      questions: { q: string; qEn?: string; options: string[]; optionsEn?: string[]; correctIndex: number }[];
      explanationUk?: string;
      explanationEn?: string;
    }
  | {
      id: string;
      type: "logic_puzzle";
      promptUk: string;
      promptEn?: string;
      category: string;
      difficulty: number;
      options: string[];
      optionsEn?: string[];
      correctIndex: number;
      hintUk?: string;
      hintEn?: string;
      explanationUk?: string;
      explanationEn?: string;
    }
  | ChessPuzzleExercise
  | ChessPlanExercise
  | {
      id: string;
      type: "chess_lesson";
      promptUk: string;
      promptEn?: string;
      fen: string;
      notesUk: string;
      notesEn?: string;
      quiz?: { q: string; qEn?: string; options: string[]; optionsEn?: string[]; correctIndex: number };
    }
  | {
      id: string;
      type: "code_read";
      promptUk: string;
      promptEn?: string;
      code: string;
      language: string;
      options: string[];
      optionsEn?: string[];
      correctIndex: number;
      explanationUk?: string;
      explanationEn?: string;
    }
  | {
      id: string;
      type: "code_output";
      promptUk: string;
      promptEn?: string;
      code: string;
      language: string;
      options?: string[];
      optionsEn?: string[];
      correctIndex?: number;
      accepted?: string[];
      explanationUk?: string;
      explanationEn?: string;
    }
  | {
      id: string;
      type: "code_fill";
      promptUk: string;
      promptEn?: string;
      code: string;
      language: string;
      /** Placeholder shown as ___ in UI; student fills accepted */
      accepted: string[];
      caseSensitive?: boolean;
      explanationUk?: string;
      explanationEn?: string;
    }
  | {
      id: string;
      type: "code_order";
      promptUk: string;
      promptEn?: string;
      language?: string;
      lines: string[];
      /** Ukrainian labels aligned with the canonical lines; answers remain canonical. */
      linesUk?: string[];
      correct: string[];
      explanationUk?: string;
      explanationEn?: string;
    }
  | {
      id: string;
      type: "code_project";
      promptUk: string;
      promptEn?: string;
      /** Multi-file mini project (HTML/CSS/JS tabs) */
      files: {
        id: string;
        name: string;
        language: string;
        starter: string;
      }[];
      /**
       * Source checks: file substrings and/or HTML-wide needles.
       * Optional kind "dom" is for client soft-grade / preview (selector present in HTML).
       */
      checks: {
        fileId?: string;
        contains?: string[];
        /** Search all files joined (for multi-file HTML structures) */
        containsHtml?: string[];
        /** Must not appear in the file */
        forbidden?: string[];
        kind?: "source" | "dom";
        selector?: string;
        minCount?: number;
      }[];
      caseSensitive?: boolean;
      hintUk?: string;
      hintEn?: string;
      explanationUk?: string;
      explanationEn?: string;
    }
  | {
      id: string;
      type: "code_run";
      promptUk: string;
      promptEn?: string;
      language: string;
      starter: string;
      /** Client-run tests (e.g. C++ via JSCPP); all must match stdout */
      tests: { stdin?: string; stdout: string }[];
      /** Server-side source needles (anti-cheat / offline grade) */
      requiredSource?: string[];
      forbiddenSource?: string[];
      timeLimitMs?: number;
      caseSensitive?: boolean;
      hintUk?: string;
      hintEn?: string;
      explanationUk?: string;
      explanationEn?: string;
      solutionUk?: string;
      solutionEn?: string;
      limitationsUk?: string;
      limitationsEn?: string;
      checkMode?: "behavior" | "text" | "both";
    }
  | {
      id: string;
      type: "video";
      promptUk: string;
      promptEn?: string;
      videoUrl: string;
      durationSec?: number;
      minWatchRatio?: number;
      explanationUk?: string;
      explanationEn?: string;
    }
  | {
      id: string;
      /** Theory / worked-example card shown before practice (deep learning) */
      type: "concept";
      promptUk: string;
      promptEn?: string;
      bodyUk: string;
      bodyEn?: string;
      keyPointsUk?: string[];
      keyPointsEn?: string[];
      code?: string;
      language?: string;
      /** Optional 1-question self-check; without it the card is graded as acknowledged */
      check?: { qUk: string; qEn?: string; options: string[]; correctIndex: number };
    }
  | {
      id: string;
      /** Self-explanation, graded by keyword rubric (+ optional tutor feedback) */
      type: "explain";
      promptUk: string;
      promptEn?: string;
      keyIdeas: { labelUk: string; labelEn?: string; anyOf: string[] }[];
      minWords?: number;
      passRatio?: number;
      sampleAnswerUk?: string;
      sampleAnswerEn?: string;
    }
  | {
      id: string;
      type: "code_judge";
      promptUk: string;
      promptEn?: string;
      language: "javascript" | "typescript" | "python" | "bash";
      starter: string;
      tests: {
        type: "stdout_contains" | "stdout_equals" | "exit_code" | "not_stdout_contains";
        value: string | number;
      }[];
      timeoutMs?: number;
      accepted?: string[];
      requiredSource?: string[];
      forbiddenSource?: string[];
      caseSensitive?: boolean;
      checkMode?: "behavior" | "text" | "both";
      limitationsUk?: string;
      limitationsEn?: string;
      explanationUk?: string;
      explanationEn?: string;
    }
  | {
      id: string;
      type: "numeric";
      promptUk: string;
      promptEn?: string;
      target?: number | { real: number; imag: number } | string;
      unit?: string;
      formula?: string;
      absTolerance?: number;
      relTolerance?: number;
      requireUnit?: boolean;
      fields?: {
        name?: string;
        labelUk?: string;
        labelEn?: string;
        target: number | { real: number; imag: number } | string;
        unit?: string;
        absTolerance?: number;
        relTolerance?: number;
        requireUnit?: boolean;
        placeholder?: string;
      }[];
      explanationUk?: string;
      explanationEn?: string;
    }
  | {
      id: string;
      type: "circuit_lab";
      promptUk: string;
      promptEn?: string;
      title?: string;
      circuitDocument?: CircuitDocument;
      netlist?: string;
      analysis: CircuitAnalysis;
      criteria: CircuitCriterion[];
      hintsUk?: string[];
      hintsEn?: string[];
      explanationUk?: string;
      explanationEn?: string;
      circuit?: CircuitDocument;
      constraints?: CircuitConstraints;
      scenarios?: {
        id: string;
        overrides?: Record<string, string>;
        faults?: string[];
        criteria: CircuitCriterion[];
      }[];
      rejectOutputSubstitution?: boolean;
    };

export type Exercise = ExerciseBody & {
  contentVersion?: string;
  examVariant?: "A" | "B" | "C";
};

export type LessonContent = {
  slug: string;
  titleUk: string;
  titleEn?: string;
  baseXp: number;
  difficulty: number;
  /**
   * @deprecated EduForge is free for all users. All lessons are open.
   * Kept only for backwards compatibility with legacy CMS data and imports.
   */
  isFree?: boolean;
  /** Unit control test — higher pass bar, no solution reveal */
  isExam?: boolean;
  /** 0..1 accuracy required when isExam (default 0.7 in app) */
  passThreshold?: number;
  /** 2 for the rewritten electrical engineering course. */
  contentVersion?: number;
  exercises: Exercise[];
};

export type UnitContent = {
  slug: string;
  titleUk: string;
  titleEn?: string;
  lessons: LessonContent[];
};

export type CourseContent = {
  /** Seed-known or CMS free-form slug */
  slug: string;
  titleUk: string;
  titleEn: string;
  descriptionUk: string;
  descriptionEn: string;
  icon: string;
  color: string;
  units: UnitContent[];
};

export type ChessGoal = "mate" | "win_material" | "draw" | "promote" | "best_move";

export type ChessSource = {
  kind: "game" | "lichess" | "composed" | "theory";
  white?: string;
  black?: string;
  year?: number;
  event?: string;
  lichessId?: string;
  gameUrl?: string;
};

export type ChessPuzzleExercise = {
  id: string;
  type: "chess_puzzle";
  promptUk: string;
  promptEn?: string;
  fen: string;
  /** Main line: learner move, opponent reply, learner move… */
  solutionSans: string[];
  difficulty: number;
  goal?: ChessGoal;
  /** Learner ply index → other SANs that reach the goal (offline QA). */
  acceptedAlternatives?: Record<string, string[]>;
  /** Up to 3 full alternative lines (offline QA). */
  alternativeLines?: string[][];
  goalThresholdCp?: number;
  themes?: string[];
  /** Hint step 1: which piece. */
  hintUk?: string;
  hintEn?: string;
  /** Square of the piece to look at (hint step 1 highlight). */
  hintPiece?: string;
  /** Hint step 2: which square / idea. */
  hintSquareUk?: string;
  hintSquareEn?: string;
  hintSquare?: string;
  explanationUk?: string;
  explanationEn?: string;
  explanationKind?: "template" | "authored";
  plyExplanations?: Array<{ ply: number; uk: string; en?: string }>;
  source?: ChessSource;
  rating?: number;
  /** Explicit repeat of another puzzle (allowed FEN duplicate). */
  reviewOf?: string;
};

export type ChessPlanExercise = {
  id: string;
  type: "chess_plan";
  promptUk: string;
  promptEn?: string;
  fen: string;
  /** Exactly 3 candidate moves. Named `choices` (not `options`) so generic MCQ shuffling never touches it. */
  choices: Array<{ san: string; explanationUk: string; explanationEn?: string }>;
  correctIndex: number;
  themes?: string[];
  source?: ChessSource;
  /** Explicit repeat of another item (allowed FEN duplicate). */
  reviewOf?: string;
};
