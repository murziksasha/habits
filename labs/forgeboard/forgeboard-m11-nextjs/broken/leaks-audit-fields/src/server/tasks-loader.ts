import type { RawServerTaskRow } from "./tasks-loader.js";

export interface PublicTaskDto {
  id: number;
  title: string;
  status: "todo" | "done";
}

export function loadUserTaskDtos(
  rows: readonly RawServerTaskRow[],
  sessionUserId: number | null,
): PublicTaskDto[] {
  if (!sessionUserId || sessionUserId <= 0) return [];
  // BUG: spreads whole server row leaking internalAuditSecret and ownerEmail!
  return rows.filter((r) => r.ownerId === sessionUserId).map((r) => ({ ...r }));
}
