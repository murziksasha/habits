export interface ReviewTask {
  id: number;
  ownerId: number;
  isPublic?: boolean;
}

export interface NoteStore {
  write: (taskId: number, sanitizedNote: string) => Promise<void>;
}

// TODO: Fix Defect 1 per SPEC.md
export function parseLimit(raw: unknown): number {
  return Math.min(Number(raw) || 20, 50);
}

// TODO: Fix Defect 2 per SPEC.md
export async function safeSaveTaskNote(store: NoteStore, taskId: number, note: string) {
  try {
    await store.write(taskId, note);
    return { ok: true };
  } catch {
    return { ok: true };
  }
}

// TODO: Fix Defect 3 per SPEC.md
export function canActorEditTask(task: ReviewTask | null | undefined, actorId: number): boolean {
  if (!task) return false;
  return Boolean(task.isPublic) || task.ownerId === actorId;
}
