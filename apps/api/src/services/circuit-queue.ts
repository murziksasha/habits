/**
 * Server SPICE admission: two running jobs, eight waiting, one active job per user.
 */

const MAX_RUNNING = 2;
const MAX_WAITING = 8;

let running = 0;
const waiting: Array<() => void> = [];
const activeUsers = new Set<string>();

export class CircuitQueueFull extends Error {
  constructor() {
    super("circuit_engine_unavailable");
    this.name = "CircuitQueueFull";
  }
}

function release(): void {
  running = Math.max(0, running - 1);
  const next = waiting.shift();
  if (next) next();
}

async function acquire(): Promise<void> {
  if (running < MAX_RUNNING) {
    running += 1;
    return;
  }
  if (waiting.length >= MAX_WAITING) throw new CircuitQueueFull();
  await new Promise<void>((resolve, reject) => {
    const grant = () => {
      running += 1;
      resolve();
    };
    waiting.push(grant);
    if (waiting.length > MAX_WAITING) {
      const idx = waiting.indexOf(grant);
      if (idx >= 0) waiting.splice(idx, 1);
      reject(new CircuitQueueFull());
    }
  });
}

export async function withCircuitSlot<T>(userId: string | null, job: () => Promise<T>): Promise<T> {
  if (userId && activeUsers.has(userId)) throw new CircuitQueueFull();
  if (userId) activeUsers.add(userId);
  try {
    await acquire();
    try {
      return await job();
    } finally {
      release();
    }
  } finally {
    if (userId) activeUsers.delete(userId);
  }
}

export function circuitQueueState(): { running: number; waiting: number } {
  return { running, waiting: waiting.length };
}
