/**
 * High-level session helpers: mount template, install, run, stop, preview URL.
 */

import type { WebContainer, WebContainerProcess } from "@webcontainer/api";
import {
  buildTemplateTree,
  filesToTree,
  flattenTree,
  type WcTemplateId,
} from "./templates";
import { getWebContainer } from "./boot";

export type TerminalLine = { stream: "stdout" | "stderr" | "system"; text: string };

export type SessionState = {
  status:
    | "idle"
    | "booting"
    | "mounting"
    | "installing"
    | "ready"
    | "running"
    | "error";
  message: string;
  previewUrl: string | null;
  installedTemplate: WcTemplateId | null;
};

type Listener = (line: TerminalLine) => void;
type StatusListener = (s: SessionState) => void;

let currentProcess: WebContainerProcess | null = null;
let statusListeners: StatusListener[] = [];
let termListeners: Listener[] = [];
let state: SessionState = {
  status: "idle",
  message: "",
  previewUrl: null,
  installedTemplate: null,
};

function setState(partial: Partial<SessionState>) {
  state = { ...state, ...partial };
  for (const l of statusListeners) l(state);
}

function emit(stream: TerminalLine["stream"], text: string) {
  const line: TerminalLine = { stream, text };
  for (const l of termListeners) l(line);
}

export function getSessionState(): SessionState {
  return state;
}

export function subscribeTerminal(fn: Listener): () => void {
  termListeners.push(fn);
  return () => {
    termListeners = termListeners.filter((x) => x !== fn);
  };
}

export function subscribeStatus(fn: StatusListener): () => void {
  statusListeners.push(fn);
  fn(state);
  return () => {
    statusListeners = statusListeners.filter((x) => x !== fn);
  };
}

async function pipeOutput(proc: WebContainerProcess) {
  const reader = proc.output.getReader();
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      if (value) emit("stdout", typeof value === "string" ? value : decoder.decode(value));
    }
  } catch {
    /* process ended */
  }
}

export async function ensureBooted(): Promise<WebContainer> {
  setState({ status: "booting", message: "Booting WebContainer…" });
  emit("system", "Booting WebContainer…\n");
  try {
    const wc = await getWebContainer();
    setState({ status: "ready", message: "WebContainer ready" });
    emit("system", "WebContainer ready\n");
    return wc;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    setState({ status: "error", message: msg });
    emit("stderr", msg + "\n");
    throw e;
  }
}

export async function mountTemplate(id: WcTemplateId): Promise<Record<string, string>> {
  const wc = await ensureBooted();
  const tree = buildTemplateTree(id);
  setState({ status: "mounting", message: `Mounting ${id}…`, previewUrl: null });
  emit("system", `Mounting template ${id}…\n`);
  await wc.mount(tree);
  state.installedTemplate = null;
  setState({ status: "ready", message: `Mounted ${id}`, installedTemplate: null });
  return flattenTree(tree);
}

export async function writeFiles(files: Record<string, string>): Promise<void> {
  const wc = await ensureBooted();
  // Write each file path (create parent dirs via mount of delta tree)
  const tree = filesToTree(files);
  await wc.mount(tree);
}

export async function npmInstall(templateId: WcTemplateId): Promise<void> {
  const wc = await ensureBooted();
  if (state.installedTemplate === templateId) {
    emit("system", "Dependencies already installed for this template\n");
    setState({ status: "ready", message: "Install skipped (cached)" });
    return;
  }
  setState({ status: "installing", message: "npm install…" });
  emit("system", "npm install… (first time can take a while)\n");
  const proc = await wc.spawn("npm", ["install"]);
  void pipeOutput(proc);
  const code = await proc.exit;
  if (code !== 0) {
    const msg = `npm install failed (exit ${code})`;
    setState({ status: "error", message: msg });
    emit("stderr", msg + "\n");
    throw new Error(msg);
  }
  setState({
    status: "ready",
    message: "npm install OK",
    installedTemplate: templateId,
  });
  emit("system", "npm install finished\n");
}

export async function stopProcess(): Promise<void> {
  if (currentProcess) {
    try {
      currentProcess.kill();
    } catch {
      /* */
    }
    currentProcess = null;
  }
  setState({
    status: "ready",
    message: "Stopped",
    previewUrl: null,
  });
  emit("system", "Process stopped\n");
}

let serverReadyBound = false;

function bindServerReady(wc: WebContainer) {
  if (serverReadyBound) return;
  serverReadyBound = true;
  wc.on("server-ready", (port: number, url: string) => {
    setState({ previewUrl: url, status: "running", message: `Server :${port}` });
    emit("system", `server-ready ${url}\n`);
  });
}

export async function runCommand(cmd: string, args: string[]): Promise<number> {
  const wc = await ensureBooted();
  bindServerReady(wc);

  if (currentProcess) {
    try {
      currentProcess.kill();
    } catch {
      /* */
    }
    currentProcess = null;
  }

  setState({ status: "running", message: `${cmd} ${args.join(" ")}`, previewUrl: null });
  emit("system", `> ${cmd} ${args.join(" ")}\n`);

  const proc = await wc.spawn(cmd, args);
  currentProcess = proc;
  void pipeOutput(proc);
  const code = await proc.exit;
  if (currentProcess === proc) currentProcess = null;
  // Keep previewUrl if server process exited unexpectedly; user can Stop to clear
  setState({
    status: code === 0 ? "ready" : "error",
    message: `exit ${code}`,
  });
  emit("system", `Process exited with code ${code}\n`);
  return code;
}

export async function runTemplateCommand(
  templateId: WcTemplateId,
  files: Record<string, string>,
  run: { cmd: string; args: string[] },
): Promise<number> {
  await writeFiles(files);
  await npmInstall(templateId);
  return runCommand(run.cmd, run.args);
}
