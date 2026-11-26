/**
 * Minimal UCI client for an external engine (Stockfish) at STOCKFISH_PATH.
 * One process per analysis job; every call is bounded by a timeout.
 */
import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";

export type UciEval = { cp: number; mate: number | null; bestUci: string | null; pv: string[] };

/** Mate scores mapped onto a centipawn scale (side to move POV). */
export function scoreToCp(kind: "cp" | "mate", value: number): number {
  if (kind === "cp") return Math.max(-3000, Math.min(3000, value));
  return value > 0 ? 3000 - value * 10 : -3000 - value * 10;
}

/** Parse the last `info … score …` line before `bestmove`. */
export function parseUciInfo(lines: readonly string[]): UciEval | null {
  let cp: number | null = null;
  let mate: number | null = null;
  let pv: string[] = [];
  let best: string | null = null;
  for (const line of lines) {
    const m = /\bscore (cp|mate) (-?\d+)/.exec(line);
    if (m && line.startsWith("info") && !/\b(lowerbound|upperbound)\b/.test(line)) {
      const v = Number(m[2]);
      mate = m[1] === "mate" ? v : null;
      cp = scoreToCp(m[1] as "cp" | "mate", v);
      const p = / pv (.+)$/.exec(line);
      if (p) pv = p[1]!.trim().split(/\s+/);
    }
    const b = /^bestmove (\S+)/.exec(line);
    if (b) best = b[1] === "(none)" ? null : b[1]!;
  }
  if (cp === null) return null;
  return { cp, mate, bestUci: best ?? pv[0] ?? null, pv };
}

export class UciEngine {
  private proc: ChildProcessWithoutNullStreams;
  private buf = "";
  private waiters: { test: (l: string) => boolean; lines: string[]; resolve: (l: string[]) => void }[] = [];

  constructor(path: string) {
    this.proc = spawn(path, [], { stdio: "pipe" });
    this.proc.stdout.setEncoding("utf8");
    this.proc.stdout.on("data", (chunk: string) => {
      this.buf += chunk;
      let i: number;
      while ((i = this.buf.indexOf("\n")) >= 0) {
        const line = this.buf.slice(0, i).trim();
        this.buf = this.buf.slice(i + 1);
        const w = this.waiters[0];
        if (!w) continue;
        w.lines.push(line);
        if (w.test(line)) {
          this.waiters.shift();
          w.resolve(w.lines);
        }
      }
    });
    this.proc.on("error", () => this.quit());
  }

  private send(cmd: string) {
    this.proc.stdin.write(`${cmd}\n`);
  }

  private until(test: (l: string) => boolean, timeoutMs: number): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("engine_timeout")), timeoutMs);
      this.waiters.push({
        test,
        lines: [],
        resolve: (l) => {
          clearTimeout(timer);
          resolve(l);
        },
      });
    });
  }

  async init(timeoutMs = 5000) {
    const ok = this.until((l) => l === "uciok", timeoutMs);
    this.send("uci");
    await ok;
    const ready = this.until((l) => l === "readyok", timeoutMs);
    this.send("setoption name Threads value 1");
    this.send("isready");
    await ready;
  }

  async evaluate(fen: string, opts: { depth?: number; movetimeMs?: number; timeoutMs?: number } = {}): Promise<UciEval | null> {
    const done = this.until((l) => l.startsWith("bestmove"), opts.timeoutMs ?? 5000);
    this.send(`position fen ${fen}`);
    this.send(opts.movetimeMs ? `go movetime ${opts.movetimeMs}` : `go depth ${opts.depth ?? 12}`);
    return parseUciInfo(await done);
  }

  quit() {
    try {
      this.send("quit");
    } catch {
      /* already closed */
    }
    setTimeout(() => {
      if (!this.proc.killed) this.proc.kill("SIGKILL");
    }, 200).unref();
  }
}
