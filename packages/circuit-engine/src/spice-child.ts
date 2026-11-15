/**
 * Child process entry. The parent kills this process when the timeout fires.
 */
import { executeSpiceInProcess } from "./runner.js";

type ChildMessage = { cmd?: string; netlist?: string; timeoutMs?: number };

process.on("message", (msg: ChildMessage) => {
  void (async () => {
    if (!msg || typeof msg !== "object") return;
    if (msg.cmd === "hang") {
      await new Promise(() => {});
      return;
    }
    if (msg.cmd === "run" && typeof msg.netlist === "string") {
      const result = await executeSpiceInProcess(msg.netlist, { timeoutMs: msg.timeoutMs });
      process.send?.({ cmd: "result", result });
      process.exit(0);
    }
  })();
});
