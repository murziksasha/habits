import { chooseBotMove } from "@eduforge/chess-core";

self.onmessage = (event: MessageEvent<{ fen: string; level: string; history?: string[]; personality?: string }>) => {
  try {
    const { fen, level, history } = event.data;
    const move = chooseBotMove(fen, level, { history });
    self.postMessage({ ok: true, move });
  } catch (err) {
    self.postMessage({ ok: false, error: String(err) });
  }
};
