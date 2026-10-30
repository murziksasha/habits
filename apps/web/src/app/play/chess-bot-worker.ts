import { chooseBotMove } from "@eduforge/chess-core";

self.onmessage = (event: MessageEvent<{ fen: string; level: string }>) => {
  try {
    const { fen, level } = event.data;
    const move = chooseBotMove(fen, level);
    self.postMessage({ ok: true, move });
  } catch (err) {
    self.postMessage({ ok: false, error: String(err) });
  }
};

