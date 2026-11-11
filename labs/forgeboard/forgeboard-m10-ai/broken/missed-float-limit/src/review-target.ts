export interface ReviewTask {
  id: number;
  ownerId: number;
  isPublic?: boolean;
}

export interface NoteStore {
  write: (taskId: number, sanitizedNote: string) => Promise<void>;
}

// BUG: forgets Number.isInteger -> accepts floats like 3.5 cleanly!
export function parseLimit(raw: unknown): number {
  if (raw === undefined || raw === "") return 20;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 1) {
    throw new RangeError("invalid_limit");
  }
  return Math.min(n, 50);
}

export async function safeSaveTaskNote(store: NoteStore, taskId: number, note: string) {
  const trimmed = note.trim();
  if (!trimmed) throw new RangeError("empty_note");
  const clean = trimmed.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  await store.write(taskId, clean);
  return { ok: true };
}

export function canActorEditTask(task: ReviewTask | null | undefined, actorId: number): boolean {
  if (!task || actorId <= 0) return false;
  return task.ownerId === actorId;
}
