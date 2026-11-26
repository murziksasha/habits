"use client";

/**
 * Exercise player. Each exercise type lives in ./exercises/<type>.tsx and is
 * loaded with next/dynamic, so a lesson only downloads the code (Monaco, the
 * chessboard, the circuit editor, …) for the types it actually shows.
 * Shared contexts and helpers: ./exercises/shared.tsx.
 */
import dynamic from "next/dynamic";
import { useLocale } from "@/lib/locale-context";
import {
  AssistanceCtx,
  ExamModeCtx,
  LessonIdCtx,
  WrongAttemptCtx,
  type Exercise,
} from "./exercises/shared";

export type { Exercise } from "./exercises/shared";

function ExerciseLoading() {
  return <div className="min-h-[12rem] animate-pulse rounded-xl bg-white/5" aria-busy="true" />;
}

const McqExercise = dynamic(() => import("./exercises/mcq").then((m) => m.McqExercise), { loading: ExerciseLoading });
const TextExercise = dynamic(() => import("./exercises/text").then((m) => m.TextExercise), { loading: ExerciseLoading });
const MatchExercise = dynamic(() => import("./exercises/match").then((m) => m.MatchExercise), { loading: ExerciseLoading });
const CodeRunExercise = dynamic(() => import("./exercises/code-run").then((m) => m.CodeRunExercise), { loading: ExerciseLoading });
const CodeFillExercise = dynamic(() => import("./exercises/code-fill").then((m) => m.CodeFillExercise), { loading: ExerciseLoading });
const CodeProjectExercise = dynamic(() => import("./exercises/code-project").then((m) => m.CodeProjectExercise), { loading: ExerciseLoading });
const OrderWordsExercise = dynamic(() => import("./exercises/order-words").then((m) => m.OrderWordsExercise), { loading: ExerciseLoading });
const TypingExercise = dynamic(() => import("./exercises/reading").then((m) => m.TypingExercise), { loading: ExerciseLoading });
const RsvpExercise = dynamic(() => import("./exercises/reading").then((m) => m.RsvpExercise), { loading: ExerciseLoading });
const ComprehensionExercise = dynamic(() => import("./exercises/reading").then((m) => m.ComprehensionExercise), { loading: ExerciseLoading });
const ChessPuzzleExercise = dynamic(() => import("./exercises/chess").then((m) => m.ChessPuzzleExercise), { loading: ExerciseLoading });
const ChessEndgameDrillExercise = dynamic(() => import("./exercises/chess").then((m) => m.ChessEndgameDrillExercise), { loading: ExerciseLoading });
const ChessPlanExercise = dynamic(() => import("./exercises/chess").then((m) => m.ChessPlanExercise), { loading: ExerciseLoading });
const ChessLessonExercise = dynamic(() => import("./exercises/chess").then((m) => m.ChessLessonExercise), { loading: ExerciseLoading });
const ConceptExercise = dynamic(() => import("./exercises/concept").then((m) => m.ConceptExercise), { loading: ExerciseLoading });
const ExplainExercise = dynamic(() => import("./exercises/explain").then((m) => m.ExplainExercise), { loading: ExerciseLoading });
const VideoExercise = dynamic(() => import("./exercises/video").then((m) => m.VideoExercise), { loading: ExerciseLoading });
const CodeJudgeExercise = dynamic(() => import("./exercises/code-judge").then((m) => m.CodeJudgeExercise), { loading: ExerciseLoading });
const NumericExercise = dynamic(() => import("./exercises/numeric").then((m) => m.NumericExercise), { loading: ExerciseLoading });
const CircuitLabExerciseComponent = dynamic(() => import("./exercises/circuit-lab").then((m) => m.CircuitLabExerciseComponent), { loading: ExerciseLoading });

export function ExercisePlayer({
  exercise,
  onAnswer,
  examMode = false,
  onWrongAttempt,
  onHintUsed,
  onSolutionRevealed,
  lessonId,
}: {
  exercise: Exercise;
  onAnswer: (answer: unknown) => void;
  /** Unit exams: no skip / solution reveal */
  examMode?: boolean;
  /** Called on each wrong soft attempt (client check) */
  onWrongAttempt?: () => void;
  /** Called when the learner opens or deepens a hint. */
  onHintUsed?: () => void;
  /** Called when the learner opens the worked solution. */
  onSolutionRevealed?: () => void;
  /** Lesson id (enables tutor feedback on explain exercises) */
  lessonId?: string;
}) {
  const { t } = useLocale();
  const body = (() => {
    switch (exercise.type) {
      case "mcq":
      case "logic_puzzle":
      case "code_read":
        return <McqExercise exercise={exercise} onAnswer={onAnswer} />;
      case "code_output":
        return exercise.options
          ? <McqExercise exercise={exercise} onAnswer={onAnswer} />
          : <CodeFillExercise exercise={exercise} onAnswer={onAnswer} />;
      case "code_fill":
        return <CodeFillExercise exercise={exercise} onAnswer={onAnswer} />;
      case "code_order":
        return <OrderWordsExercise exercise={exercise} onAnswer={onAnswer} />;
      case "code_project":
        return <CodeProjectExercise exercise={exercise} onAnswer={onAnswer} />;
      case "code_run":
        return <CodeRunExercise exercise={exercise} onAnswer={onAnswer} />;
      case "translate":
      case "fill_blank":
        return <TextExercise exercise={exercise} onAnswer={onAnswer} />;
      case "match":
        return <MatchExercise exercise={exercise} onAnswer={onAnswer} />;
      case "order_words":
        return <OrderWordsExercise exercise={exercise} onAnswer={onAnswer} />;
      case "typing":
        return <TypingExercise exercise={exercise} onAnswer={onAnswer} />;
      case "rsvp":
        return <RsvpExercise exercise={exercise} onAnswer={onAnswer} />;
      case "comprehension":
        return <ComprehensionExercise exercise={exercise} onAnswer={onAnswer} />;
      case "chess_puzzle":
        return <ChessPuzzleExercise exercise={exercise} onAnswer={onAnswer} />;
      case "chess_lesson":
        return <ChessLessonExercise exercise={exercise} onAnswer={onAnswer} />;
      case "chess_plan":
        return <ChessPlanExercise exercise={exercise} onAnswer={onAnswer} />;
      case "chess_endgame_drill":
        return <ChessEndgameDrillExercise exercise={exercise} onAnswer={onAnswer} />;
      case "video":
        return <VideoExercise exercise={exercise} onAnswer={onAnswer} />;
      case "code_judge":
        return <CodeJudgeExercise exercise={exercise} onAnswer={onAnswer} />;
      case "concept":
        return <ConceptExercise exercise={exercise} onAnswer={onAnswer} />;
      case "explain":
        return <ExplainExercise exercise={exercise} onAnswer={onAnswer} />;
      case "composite_artifact":
        return <CodeProjectExercise exercise={exercise} onAnswer={onAnswer} />;
      case "dataset_query":
        return <CodeFillExercise exercise={exercise} onAnswer={onAnswer} />;
      case "incident_step":
        return <OrderWordsExercise exercise={exercise} onAnswer={onAnswer} />;
      case "numeric":
        return <NumericExercise exercise={exercise} onAnswer={onAnswer} />;
      case "circuit_lab":
        return <CircuitLabExerciseComponent exercise={exercise} onAnswer={onAnswer} />;
      default:
        return <p>{t.lesson.unknownExerciseType}: {exercise.type}</p>;
    }
  })();

  return (
    <ExamModeCtx.Provider value={examMode}>
      <WrongAttemptCtx.Provider value={onWrongAttempt ?? null}>
        <AssistanceCtx.Provider value={{ onHintUsed, onSolutionRevealed }}>
          <LessonIdCtx.Provider value={lessonId ?? null}>{body}</LessonIdCtx.Provider>
        </AssistanceCtx.Provider>
      </WrongAttemptCtx.Provider>
    </ExamModeCtx.Provider>
  );
}
