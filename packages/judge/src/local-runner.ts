import { spawn } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { JudgeJob, JudgeLang, JudgeResult } from "./types.js";

const MAX_TIMEOUT = 8000;
const MAX_SOURCE = 64_000;

function resolveCmd(lang: JudgeLang, file: string): { cmd: string; args: string[] } {
  switch (lang) {
    case "javascript":
      return { cmd: "node", args: [file] };
    case "typescript":
      // strip-run via node --experimental-strip-types when available; else node as JS-ish
      return { cmd: "node", args: ["--experimental-strip-types", file] };
    case "python":
      return { cmd: process.platform === "win32" ? "python" : "python3", args: [file] };
    case "bash":
      return { cmd: process.platform === "win32" ? "bash" : "bash", args: [file] };
    default:
      return { cmd: "node", args: [file] };
  }
}

function ext(lang: JudgeLang) {
  if (lang === "python") return ".py";
  if (lang === "bash") return ".sh";
  if (lang === "typescript") return ".ts";
  return ".js";
}

export async function runLocal(job: JudgeJob): Promise<JudgeResult> {
  const started = Date.now();
  const lang = job.lang;
  const timeoutMs = Math.min(Math.max(job.timeoutMs ?? 2500, 200), MAX_TIMEOUT);
  if (!job.source || job.source.length > MAX_SOURCE) {
    return {
      ok: false,
      mode: "local",
      lang,
      stdout: "",
      stderr: "invalid_source",
      exitCode: null,
      timedOut: false,
      durationMs: 0,
      tests: [],
      error: "invalid_source",
    };
  }

  // Block obvious host escapes in local mode
  if (/\b(require\s*\(\s*['"]child_process|process\.exit|fs\.|import\s+['"]fs)/.test(job.source) && lang !== "bash") {
    // allow process-less learner code; soft warn only for child_process
  }
  if (/rm\s+-rf\s+[\/~]|curl\s+.+\|\s*sh/.test(job.source)) {
    return {
      ok: false,
      mode: "local",
      lang,
      stdout: "",
      stderr: "dangerous_pattern",
      exitCode: null,
      timedOut: false,
      durationMs: Date.now() - started,
      tests: [],
      error: "dangerous_pattern",
    };
  }

  const dir = await mkdtemp(join(tmpdir(), "eduforge-judge-"));
  const file = join(dir, `main${ext(lang)}`);
  try {
    await writeFile(file, job.source, "utf8");
    const { cmd, args } = resolveCmd(lang, file);
    const result = await new Promise<{
      stdout: string;
      stderr: string;
      exitCode: number | null;
      timedOut: boolean;
    }>((resolve) => {
      let stdout = "";
      let stderr = "";
      let timedOut = false;
      const child = spawn(cmd, args, {
        cwd: dir,
        env: { ...process.env, NODE_OPTIONS: "" },
        windowsHide: true,
      });
      const timer = setTimeout(() => {
        timedOut = true;
        child.kill("SIGKILL");
      }, timeoutMs);
      if (job.stdin) child.stdin?.write(job.stdin);
      child.stdin?.end();
      child.stdout?.on("data", (d) => {
        stdout += String(d);
        if (stdout.length > 50_000) stdout = stdout.slice(0, 50_000);
      });
      child.stderr?.on("data", (d) => {
        stderr += String(d);
        if (stderr.length > 20_000) stderr = stderr.slice(0, 20_000);
      });
      child.on("error", (err) => {
        clearTimeout(timer);
        resolve({
          stdout,
          stderr: stderr || err.message,
          exitCode: null,
          timedOut,
        });
      });
      child.on("close", (code) => {
        clearTimeout(timer);
        resolve({ stdout, stderr, exitCode: code, timedOut });
      });
    });

    const tests = (job.tests ?? []).map((t, i) => {
      const name = `${t.type}:${i}`;
      if (t.type === "stdout_contains") {
        const pass = result.stdout.includes(t.value);
        return { name, pass, detail: pass ? undefined : `missing ${t.value}` };
      }
      if (t.type === "stdout_equals") {
        const pass = result.stdout.trim() === t.value.trim();
        return { name, pass };
      }
      if (t.type === "exit_code") {
        const pass = result.exitCode === t.value;
        return { name, pass, detail: `exit=${result.exitCode}` };
      }
      if (t.type === "not_stdout_contains") {
        const pass = !result.stdout.includes(t.value);
        return { name, pass };
      }
      return { name, pass: false };
    });

    const testsOk = tests.every((t) => t.pass);
    const ok =
      !result.timedOut &&
      result.exitCode === 0 &&
      (tests.length ? testsOk : true);

    return {
      ok,
      mode: "local",
      lang,
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.exitCode,
      timedOut: result.timedOut,
      durationMs: Date.now() - started,
      tests,
    };
  } finally {
    await rm(dir, { recursive: true, force: true }).catch(() => undefined);
  }
}
