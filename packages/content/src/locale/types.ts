export type ExerciseLocaleEnrichment = {
  optionsEn?: string[];
  pairsEn?: { left: string; right: string }[];
  passageEn?: string;
  textEn?: string;
  notesEn?: string;
  quizEn?: {
    qEn?: string;
    optionsEn?: string[];
  };
  questionsEn?: {
    qEn?: string;
    optionsEn?: string[];
  }[];
};
