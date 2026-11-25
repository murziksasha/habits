import { chooseBotMove } from "@eduforge/chess-core";

self.onmessage = (event: MessageEvent<{ fen: string; level: string; history?: string[]; startFen?: string; openingId?: string }>) => {
  try {
    const { fen, level, history, startFen, openingId } = event.data;
    const move = chooseBotMove(fen, level, { history, startFen, openingId });
    self.postMessage({ ok: true, move });
  } catch (err) {
    self.postMessage({ ok: false, error: String(err) });
  }
};
