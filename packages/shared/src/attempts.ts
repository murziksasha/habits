/**
 * Extended Attempt & Verification Session Types (SPEC Wave 1).
 */

import { type FeedbackCategory } from "./feedback-contract.js";
import { type MasteryEvidenceLevel } from "./mastery-evidence.js";

export const ATTEMPT_VERIFICATION_METHODS = [
  "practice",
  "lesson",
  "unit_exam",
  "self_verify",
  "srs_review",
  "transfer_check",
] as const;

export type AttemptVerificationMethod = (typeof ATTEMPT_VERIFICATION_METHODS)[number];

export const ATTEMPT_DATA_SOURCES = [
  "synthetic",
  "curated",
  "dynamic_seed",
] as const;

export type AttemptDataSource = (typeof ATTEMPT_DATA_SOURCES)[number];

export const PRACTICE_MODES = [
  "guided",
  "independent",
  "timed_exam",
] as const;

export type PracticeMode = (typeof PRACTICE_MODES)[number];

export interface ExtendedAttemptRecord {
  id?: string;
  userId: string;
  lessonId: string;
  exerciseId: string;
  exerciseType: string;
  correct: boolean;
  firstTry: boolean;
  firstCheckPassed: boolean;
  hintsUsed: number;
  solutionRevealed: boolean;
  practiceMode: PracticeMode;
  verificationMethod: AttemptVerificationMethod;
  dataSource: AttemptDataSource;
  feedbackCategory?: FeedbackCategory;
  exerciseVersion?: string;
  variantId?: string;
  confidence?: number | null;
  source: string;
  createdAt?: string;
}

export interface SelfVerificationSessionInput {
  userId: string;
  courseSlug: string;
  lessonSlug: string;
  exerciseIndex: number;
  datasetVersion: string;
  firstAnswer: unknown;
  metadata?: Record<string, unknown>;
}

export interface SelfVerificationResult {
  sessionId: string;
  passed: boolean;
  evidenceLevel: MasteryEvidenceLevel;
  feedbackCategory: FeedbackCategory;
  awardedAt: string;
}
