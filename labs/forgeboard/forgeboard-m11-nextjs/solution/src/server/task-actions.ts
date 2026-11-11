import type { RawServerTaskRow } from "./tasks-loader.js";

export interface ActionResult {
  ok: boolean;
  status: number;
  error?: string;
}

export async function updateTaskAction(
  rows: RawServerTaskRow[],
  sessionUserId: number | null,
  input: { taskId: number; title: string },
): Promise<ActionResult> {
  if (!sessionUserId || sessionUserId <= 0) {
    return { ok: false, status: 401, error: "unauthorized" };
  }
  const cleanTitle = input.title.trim();
  if (!cleanTitle || cleanTitle.length > 120) {
    return { ok: false, status: 400, error: "invalid_input" };
  }
  const target = rows.find((r) => r.id === input.taskId);
  if (!target) {
    return { ok: false, status: 404, error: "not_found" };
  }
  if (target.ownerId !== sessionUserId) {
    return { ok: false, status: 403, error: "forbidden" };
  }
  target.title = cleanTitle;
  return { ok: true, status: 200 };
}
