export interface RawServerTaskRow {
  id: number;
  ownerId: number;
  title: string;
  status: "todo" | "done";
  internalAuditSecret: string;
  ownerEmail: string;
}

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
  return rows
    .filter((r) => r.ownerId === sessionUserId)
    .map((r) => ({ id: r.id, title: r.title, status: r.status }));
}
