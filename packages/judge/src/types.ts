export type JudgeLang = "javascript" | "typescript" | "python" | "bash";

export type JudgeTest =
  | { type: "stdout_contains"; value: string }
  | { type: "stdout_equals"; value: string }
  | { type: "exit_code"; value: number }
  | { type: "not_stdout_contains"; value: string };

export type JudgeJob = {
  lang: JudgeLang;
  source: string;
  tests?: JudgeTest[];
  /** Wall-clock ms (capped server-side) */
  timeoutMs?: number;
  /** stdin for the process */
  stdin?: string;
};

export type JudgeResult = {
  ok: boolean;
  mode: "local" | "docker" | "disabled";
  lang: JudgeLang;
  stdout: string;
  stderr: string;
  exitCode: number | null;
  timedOut: boolean;
  durationMs: number;
  tests: { name: string; pass: boolean; detail?: string }[];
  error?: string;
};

export type JudgeMode = "local" | "docker" | "off";
