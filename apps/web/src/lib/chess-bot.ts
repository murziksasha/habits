import { chooseBotMove, type BotLevel, type BotMove } from "@eduforge/chess-core";

/**
 * Ask the bot for a move off the main thread (all levels). Falls back to an inline
 * Club search when Workers are unavailable or the worker times out.
 */
export async function requestBotMove(
  fen: string,
  level: BotLevel,
  opts: { history?: string[]; openingId?: string; timeoutMs?: number } = {},
): Promise<BotMove | null> {
  if (typeof window !== "undefined" && typeof Worker !== "undefined") {
    try {
      return await new Promise<BotMove | null>((resolve, reject) => {
        const worker = new Worker(new URL("./chess-bot-worker.ts", import.meta.url));
        const timeout = setTimeout(() => {
          worker.terminate();
          reject(new Error("worker_timeout"));
        }, opts.timeoutMs ?? 4000);
        worker.onmessage = (e) => {
          clearTimeout(timeout);
          worker.terminate();
          if (e.data?.ok) resolve(e.data.move ?? null);
          else reject(new Error(e.data?.error ?? "worker_failed"));
        };
        worker.onerror = (err) => {
          clearTimeout(timeout);
          worker.terminate();
          reject(err);
        };
        worker.postMessage({ fen, level, history: opts.history, openingId: opts.openingId });
      });
    } catch {
      return chooseBotMove(fen, level === "strong" ? "club" : level, { history: opts.history, openingId: opts.openingId });
    }
  }
  return chooseBotMove(fen, level, { history: opts.history, openingId: opts.openingId });
}
