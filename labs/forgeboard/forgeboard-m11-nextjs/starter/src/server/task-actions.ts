import type { RawServerTaskRow } from "./tasks-loader.js";

export interface ActionResult {
  ok: boolean;
  status: number;
  error?: string;
}

// TODO: Enforce session, title validation, and ownership without returning internal secrets
export async function updateTaskAction(
  rows: RawServerTaskRow[],
  sessionUserId: number | null,
  input: { taskId: number; title: string },
): Promise<ActionResult> {
  void rows;
  void sessionUserId;
  void input;
  return { ok: true, status: 200 };
}
