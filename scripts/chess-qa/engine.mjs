/**
 * Minimal UCI wrapper for offline chess QA.
 * One Stockfish process per position with a hard timeout: Stockfish 17.x can hang
 * on some positions with `movetime`, so a stuck process is killed and retried at lower depth.
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(__dirname, "../..");

export async function loadChess() {
  const require = createRequire(join(ROOT, "packages/chess-core/package.json"));
  const { Chess } = await import(pathToFileURL(require.resolve("chess.js")).href);
  return Chess;
}

export function stockfishPath() {
  const fromEnv = process.env.STOCKFISH_PATH;
  if (fromEnv && existsSync(fromEnv)) return fromEnv;
  for (const p of ["/usr/games/stockfish", "/usr/bin/stockfish", "/usr/local/bin/stockfish"]) {
    if (existsSync(p)) return p;
  }
  throw new Error("Stockfish not found: set STOCKFISH_PATH");
}

export const MATE = 100000;
/** Encode a UCI score from the side to move's view. */
export function encodeScore(kind, value) {
  if (kind === "mate") return value > 0 ? MATE - value : -MATE - value;
  return value;
}
export function isMateScore(v) {
  return Math.abs(v) > MATE - 1000;
}
/** Plies-to-mate distance in moves (positive = side to move mates). */
export function mateIn(v) {
  if (!isMateScore(v)) return null;
  return v > 0 ? MATE - v : -(MATE + v);
}
export function fmtScore(v) {
  if (v === null || v === undefined) return "?";
  const m = mateIn(v);
  return m === null ? `${v}cp` : `M${m}`;
}

let engineVersion = null;

/**
 * Analyse one FEN. Returns lines sorted by multipv: [{ uci, score, pv: [uci...] }].
 * Options: { multipv = 3, depth = 18, movetime, timeoutMs = 8000, searchMoves }.
 */
export function analyse(fen, opts = {}) {
  const { multipv = 3, depth = 18, movetime, timeoutMs = 8000, searchMoves } = opts;
  return new Promise((resolveP) => {
    const sf = spawn(stockfishPath(), [], { stdio: ["pipe", "pipe", "ignore"] });
    let buf = "";
    const best = new Map();
    let done = false;
    const finish = (ok) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      try {
        sf.kill("SIGKILL");
      } catch {
        /* ignore */
      }
      const lines = [...best.entries()].sort((a, b) => a[0] - b[0]).map(([, v]) => v);
      resolveP({ ok, lines });
    };
    const timer = setTimeout(() => finish(false), timeoutMs);
    sf.stdout.on("data", (d) => {
      buf += d;
      let i;
      while ((i = buf.indexOf("\n")) >= 0) {
        const l = buf.slice(0, i).trim();
        buf = buf.slice(i + 1);
        if (l.startsWith("id name") && !engineVersion) engineVersion = l.slice(8);
        if (l.startsWith("info") && l.includes(" pv ")) {
          const m = l.match(/ multipv (\d+) .*?score (cp|mate) (-?\d+)(?: (?:lowerbound|upperbound))?.* pv (.+)$/);
          if (m && !/ (lowerbound|upperbound) /.test(l)) {
            const pv = m[4].trim().split(/\s+/);
            best.set(Number(m[1]), { uci: pv[0], score: encodeScore(m[2], Number(m[3])), pv });
          }
        }
        if (l.startsWith("bestmove")) finish(true);
      }
    });
    sf.on("error", () => finish(false));
    const send = (s) => sf.stdin.write(s + "\n");
    send("uci");
    send(`setoption name MultiPV value ${multipv}`);
    send("setoption name Threads value 2");
    send("setoption name Hash value 64");
    send("isready");
    send(`position fen ${fen}`);
    const sm = searchMoves?.length ? ` searchmoves ${searchMoves.join(" ")}` : "";
    send(movetime ? `go movetime ${movetime}${sm}` : `go depth ${depth}${sm}`);
  });
}

/** Analyse with retries at decreasing depth when the engine hangs. */
export async function analyseSafe(fen, opts = {}) {
  const depths = [opts.depth ?? 18, 14, 10];
  for (const depth of depths) {
    const r = await analyse(fen, { ...opts, depth });
    if (r.ok && r.lines.length) return r.lines;
  }
  return [];
}

export function getEngineVersion() {
  return engineVersion ?? "unknown";
}

export function uciToMove(game, uci) {
  const from = uci.slice(0, 2);
  const to = uci.slice(2, 4);
  const promotion = uci.length > 4 ? uci[4] : undefined;
  return game.move({ from, to, promotion });
}

export function moveUci(m) {
  return m.from + m.to + (m.promotion ?? "");
}

/** Material balance in centipawns from White's view. */
export function materialCp(game) {
  const v = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };
  let s = 0;
  for (const row of game.board()) for (const p of row) if (p) s += (p.color === "w" ? 1 : -1) * v[p.type];
  return s;
}

/** Run async tasks with limited concurrency. */
export async function pool(items, limit, fn) {
  const out = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const i = next++;
      out[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return out;
}
