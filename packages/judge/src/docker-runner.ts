import { spawn } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { JudgeJob, JudgeLang, JudgeResult } from "./types.js";

const MAX_TIMEOUT = 10_000;
const MAX_SOURCE = 64_000;

const IMAGES: Record<JudgeLang, string> = {
  javascript: "node:22-alpine",
  typescript: "node:22-alpine",
  python: "python:3.12-alpine",
  bash: "bash:5.2",
};

function containerCmd(lang: JudgeLang): string[] {
  switch (lang) {
    case "javascript":
      return ["node", "/work/main.js"];
    case "typescript":
      return ["node", "--experimental-strip-types", "/work/main.ts"];
    case "python":
      return ["python", "/work/main.py"];
    case "bash":
      return ["bash", "/work/main.sh"];
  }
}

function fileName(lang: JudgeLang) {
  if (lang === "python") return "main.py";
  if (lang === "bash") return "main.sh";
  if (lang === "typescript") return "main.ts";
  return "main.js";
}

/**
 * Run code in a short-lived Docker container (network off, memory limited).
 * Requires Docker CLI on the host and JUDGE_MODE=docker.
 */
export async function runDocker(job: JudgeJob): Promise<JudgeResult> {
  const started = Date.now();
  const lang = job.lang;
  const timeoutMs = Math.min(Math.max(job.timeoutMs ?? 3000, 200), MAX_TIMEOUT);
  if (!job.source || job.source.length > MAX_SOURCE) {
    return {
      ok: false,
      mode: "docker",
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

  const dir = await mkdtemp(join(tmpdir(), "eduforge-dj-"));
  const file = join(dir, fileName(lang));
  try {
    await writeFile(file, job.source, "utf8");
    const image = process.env.JUDGE_IMAGE_JS
      ? lang === "python"
        ? process.env.JUDGE_IMAGE_PY ?? IMAGES.python
        : lang === "bash"
          ? process.env.JUDGE_IMAGE_BASH ?? IMAGES.bash
          : process.env.JUDGE_IMAGE_JS
      : IMAGES[lang];

    const args = [
      "run",
      "--rm",
      "--network=none",
      "--memory=128m",
      "--cpus=0.5",
      "--pids-limit=64",
      "-v",
      `${dir}:/work:ro`,
      image,
      ...containerCmd(lang),
    ];

    const result = await new Promise<{
      stdout: string;
      stderr: string;
      exitCode: number | null;
      timedOut: boolean;
    }>((resolve) => {
      let stdout = "";
      let stderr = "";
      let timedOut = false;
      const child = spawn("docker", args, { windowsHide: true });
      const timer = setTimeout(() => {
        timedOut = true;
        child.kill("SIGKILL");
      }, timeoutMs + 1500);
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
        return {
          name,
          pass: result.stdout.includes(t.value),
          detail: result.stdout.includes(t.value) ? undefined : `missing ${t.value}`,
        };
      }
      if (t.type === "stdout_equals") {
        return { name, pass: result.stdout.trim() === t.value.trim() };
      }
      if (t.type === "exit_code") {
        return { name, pass: result.exitCode === t.value, detail: `exit=${result.exitCode}` };
      }
      if (t.type === "not_stdout_contains") {
        return { name, pass: !result.stdout.includes(t.value) };
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
      mode: "docker",
      lang,
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.exitCode,
      timedOut: result.timedOut,
      durationMs: Date.now() - started,
      tests,
      error: result.exitCode === null ? "docker_unavailable" : undefined,
    };
  } finally {
    await rm(dir, { recursive: true, force: true }).catch(() => undefined);
  }
}
