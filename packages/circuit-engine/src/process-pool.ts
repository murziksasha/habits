/**
 * One SPICE run per child process. A timeout kills the process.
 */

import { fork, spawn, type ChildProcess } from "child_process";
import { existsSync } from "fs";
import { fileURLToPath } from "url";
import type { RunSimOutput } from "./runner.js";

const EMPTY: RunSimOutput = {
  ok: false,
  dataType: "real",
  variableNames: [],
  numPoints: 0,
  data: [],
};

export function spiceChildPath(): string | null {
  const dist = fileURLToPath(new URL("../dist/spice-child.js", import.meta.url));
  return existsSync(dist) ? dist : null;
}

export function killProcess(child: ChildProcess): void {
  if (child.killed || child.exitCode !== null) return;
  child.kill("SIGKILL");
}

export function runSpiceChild(netlist: string, timeoutMs: number): Promise<RunSimOutput> {
  const childPath = spiceChildPath();
  if (!childPath) {
    return Promise.resolve({
      ...EMPTY,
      error: "circuit_engine_unavailable: spice child process is not built",
    });
  }
  return runChild(fork(childPath, [], { stdio: ["ignore", "ignore", "ignore", "ipc"] }), { cmd: "run", netlist, timeoutMs }, timeoutMs);
}

export function runChild(
  child: ChildProcess,
  message: { cmd: string; netlist?: string; timeoutMs?: number },
  timeoutMs: number,
): Promise<RunSimOutput> {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (result: RunSimOutput) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      killProcess(child);
      resolve(result);
    };
    const timer = setTimeout(() => {
      finish({
        ...EMPTY,
        error: `simulation_timeout: Execution exceeded time limit of ${timeoutMs / 1000} seconds`,
      });
    }, timeoutMs);

    child.once("message", (msg: { result?: RunSimOutput }) => {
      finish(msg?.result ?? { ...EMPTY, error: "circuit_engine_unavailable: empty child result" });
    });
    child.once("exit", (code) => {
      if (settled) return;
      finish({
        ...EMPTY,
        error: code === 0 ? "circuit_engine_unavailable: child exited before a result" : "engine_crashed",
      });
    });
    child.send(message);
  });
}

/** Starts a process that ignores messages. Used to prove the timeout kills it. */
export function spawnSleeper(): ChildProcess {
  return spawn(process.execPath, ["-e", "setInterval(() => {}, 1000)"], {
    stdio: ["ignore", "ignore", "ignore", "ipc"],
  });
}
