export type Exercise =
  | {
      id: string;
      type: "mcq";
      promptUk: string;
      promptEn?: string;
      options: string[];
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
      wpm: number;
    }
  | {
      id: string;
      type: "comprehension";
      promptUk: string;
      promptEn?: string;
      passage: string;
      questions: { q: string; qEn?: string; options: string[]; correctIndex: number }[];
    }
  | {
      id: string;
      type: "logic_puzzle";
      promptUk: string;
      promptEn?: string;
      category: string;
      difficulty: number;
      options: string[];
      correctIndex: number;
      hintUk?: string;
      hintEn?: string;
    }
  | {
      id: string;
      type: "chess_puzzle";
      promptUk: string;
      promptEn?: string;
      fen: string;
      solutionSans: string[];
      difficulty: number;
    }
  | {
      id: string;
      type: "chess_lesson";
      promptUk: string;
      promptEn?: string;
      fen: string;
      notesUk: string;
      notesEn?: string;
      quiz?: { q: string; qEn?: string; options: string[]; correctIndex: number };
    }
  | {
      id: string;
      type: "code_read";
      promptUk: string;
      promptEn?: string;
      code: string;
      language: string;
      options: string[];
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
      /** Each file must contain all listed substrings */
      checks: { fileId: string; contains: string[] }[];
      caseSensitive?: boolean;
      hintUk?: string;
      hintEn?: string;
      explanationUk?: string;
      explanationEn?: string;
    };

export type LessonContent = {
  slug: string;
  titleUk: string;
  titleEn?: string;
  baseXp: number;
  difficulty: number;
  isFree?: boolean;
  exercises: Exercise[];
};

export type UnitContent = {
  slug: string;
  titleUk: string;
  titleEn?: string;
  lessons: LessonContent[];
};

export type CourseContent = {
  slug: "english" | "chess" | "typing" | "speed_reading" | "logic" | "programming";
  titleUk: string;
  titleEn: string;
  descriptionUk: string;
  descriptionEn: string;
  icon: string;
  color: string;
  units: UnitContent[];
};
