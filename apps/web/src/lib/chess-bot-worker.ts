import { chooseBotMove } from "@eduforge/chess-core";

self.onmessage = (event: MessageEvent<{ fen: string; level: string; history?: string[]; openingId?: string }>) => {
  try {
    const { fen, level, history, openingId } = event.data;
    const move = chooseBotMove(fen, level, { history, openingId });
    self.postMessage({ ok: true, move });
  } catch (err) {
    self.postMessage({ ok: false, error: String(err) });
  }
};
