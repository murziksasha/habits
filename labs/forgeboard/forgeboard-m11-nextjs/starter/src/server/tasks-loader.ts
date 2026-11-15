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

// TODO: Scope by session userId and strip internalAuditSecret / ownerEmail before crossing RSC boundary
export function loadUserTaskDtos(
  rows: readonly RawServerTaskRow[],
  sessionUserId: number | null,
): PublicTaskDto[] {
  void sessionUserId;
  return rows as unknown as PublicTaskDto[];
}
