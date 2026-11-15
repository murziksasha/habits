/**
 * Client-side C++ runner for playground + code_run lessons.
 *
 * Modes (NEXT_PUBLIC_CPP_RUNNER):
 * - auto (default): JSCPP interpreter in browser; mock on server/SSR
 * - jscpp | wasm: force JSCPP (browser C++ subset interpreter; not full clang yet)
 * - mock: lightweight sim for CI/e2e (no heavy deps)
 *
 * No server-side execution of student code.
 */

export type CppRunRequest = {
  source: string;
  stdin?: string;
  timeLimitMs?: number;
};

export type CppRunResult = {
  ok: boolean;
  compileOk: boolean;
  stdout: string;
  stderr: string;
  exitCode?: number;
  durationMs?: number;
  backend?: "jscpp" | "mock";
};

type JscppModule = {
  run: (
    code: string,
    input: string,
    config?: {
      stdio?: { write?: (s: string) => void };
      maxTimeout?: number;
    },
  ) => number;
};

function runnerMode(): "auto" | "jscpp" | "wasm" | "mock" {
  const m = (process.env.NEXT_PUBLIC_CPP_RUNNER ?? "auto").toLowerCase();
  if (m === "mock" || m === "jscpp" || m === "wasm" || m === "auto") return m;
  return "auto";
}

export function isCppRunnerAvailable(): boolean {
  return true;
}

export function getCppRunnerLabel(): string {
  const mode = runnerMode();
  if (mode === "mock") return "C++ mock";
  if (mode === "wasm" || mode === "jscpp") return "C++ (JSCPP)";
  return typeof window === "undefined" ? "C++ mock" : "C++ (JSCPP)";
}

/** Brace / main sanity checks shared by mock + preflight */
export function preflightCppSource(source: string): { ok: boolean; stderr: string } {
  const src = source ?? "";
  if (!src.trim()) return { ok: false, stderr: "error: empty source" };
  if (!/\bmain\s*\(/.test(src)) {
    return { ok: false, stderr: "error: no main() function found" };
  }
  let depth = 0;
  for (const ch of src) {
    if (ch === "{") depth++;
    if (ch === "}") depth--;
    if (depth < 0) return { ok: false, stderr: "error: unmatched '}'" };
  }
  if (depth !== 0) return { ok: false, stderr: "error: unmatched '{'" };
  const forbidden = [/\bsystem\s*\(/, /\bexec\s*\(/, /\bpopen\s*\(/];
  for (const re of forbidden) {
    if (re.test(src)) {
      return { ok: false, stderr: `error: forbidden call (${re.source})` };
    }
  }
  return { ok: true, stderr: "" };
}

/**
 * Deterministic mock for CI: supports simple cout string/int literals and
 * `// mock-stdout: line1|line2` override for tests.
 */
export function runCppMock(req: CppRunRequest): CppRunResult {
  const t0 = Date.now();
  const pre = preflightCppSource(req.source);
  if (!pre.ok) {
    return {
      ok: false,
      compileOk: false,
      stdout: "",
      stderr: pre.stderr,
      durationMs: Date.now() - t0,
      backend: "mock",
    };
  }

  const override = req.source.match(/\/\/\s*mock-stdout:\s*(.+)$/m);
  if (override) {
    const stdout = override[1]!.split("|").join("\n");
    return {
      ok: true,
      compileOk: true,
      stdout,
      stderr: "",
      exitCode: 0,
      durationMs: Date.now() - t0,
      backend: "mock",
    };
  }

  const lines: string[] = [];
  // cout << "str" or cout << 'c' or cout << 123
  const coutRe =
    /cout\s*<<\s*(?:"([^"]*)"|'([^']*)'|(-?\d+(?:\.\d+)?)|(\w+))/g;
  let m: RegExpExecArray | null;
  const src = req.source;
  while ((m = coutRe.exec(src))) {
    if (m[1] != null) lines.push(m[1]);
    else if (m[2] != null) lines.push(m[2]);
    else if (m[3] != null) lines.push(m[3]);
    else if (m[4] != null && m[4] !== "endl") lines.push(m[4]);
  }

  // very small: a=2,b=3; cout << (a+b) when both int literals assigned
  if (!lines.length && /cout\s*<</.test(src)) {
    const a = src.match(/\ba\s*=\s*(-?\d+)/);
    const b = src.match(/\bb\s*=\s*(-?\d+)/);
    if (a && b && /a\s*\+\s*b|b\s*\+\s*a/.test(src)) {
      lines.push(String(Number(a[1]) + Number(b[1])));
    }
  }

  if (!lines.length && /cout\s*</.test(src)) {
    return {
      ok: false,
      compileOk: true,
      stdout: "",
      stderr:
        "mock runner: could not infer stdout (use JSCPP mode or // mock-stdout: …)",
      exitCode: 1,
      durationMs: Date.now() - t0,
      backend: "mock",
    };
  }

  return {
    ok: true,
    compileOk: true,
    stdout: lines.join("\n"),
    stderr: "",
    exitCode: 0,
    durationMs: Date.now() - t0,
    backend: "mock",
  };
}

let jscppPromise: Promise<JscppModule | null> | null = null;

async function loadJscpp(): Promise<JscppModule | null> {
  if (typeof window === "undefined") return null;
  if (!jscppPromise) {
    jscppPromise = (async () => {
      try {
        // CJS package — default or namespace
        const mod = await import(/* webpackIgnore: false */ "JSCPP");
        const m = (mod as { default?: JscppModule }).default ?? (mod as JscppModule);
        if (m && typeof m.run === "function") return m;
        return null;
      } catch {
        return null;
      }
    })();
  }
  return jscppPromise;
}

export async function runCppJscpp(req: CppRunRequest): Promise<CppRunResult> {
  const t0 = Date.now();
  const pre = preflightCppSource(req.source);
  if (!pre.ok) {
    return {
      ok: false,
      compileOk: false,
      stdout: "",
      stderr: pre.stderr,
      durationMs: Date.now() - t0,
      backend: "jscpp",
    };
  }

  const JSCPP = await loadJscpp();
  if (!JSCPP) {
    return {
      ok: false,
      compileOk: false,
      stdout: "",
      stderr: "C++ runtime failed to load (JSCPP). Try mock mode or reload.",
      durationMs: Date.now() - t0,
      backend: "jscpp",
    };
  }

  const chunks: string[] = [];
  const limit = req.timeLimitMs ?? 3000;
  try {
    const exitCode = JSCPP.run(req.source, req.stdin ?? "", {
      stdio: {
        write: (s: string) => {
          chunks.push(s);
        },
      },
      maxTimeout: limit,
    });
    const stdout = chunks.join("").replace(/\r\n/g, "\n");
    return {
      ok: exitCode === 0,
      compileOk: true,
      stdout: stdout.replace(/\n$/, ""),
      stderr: exitCode === 0 ? "" : `exit code ${exitCode}`,
      exitCode,
      durationMs: Date.now() - t0,
      backend: "jscpp",
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    const isParse = /Parsing Failure|ERROR:/i.test(msg);
    return {
      ok: false,
      compileOk: !isParse ? true : false,
      stdout: chunks.join(""),
      stderr: msg,
      durationMs: Date.now() - t0,
      backend: "jscpp",
    };
  }
}

export async function runCpp(req: CppRunRequest): Promise<CppRunResult> {
  const mode = runnerMode();
  if (mode === "mock") return runCppMock(req);
  if (mode === "jscpp" || mode === "wasm") {
    if (typeof window === "undefined") return runCppMock(req);
    return runCppJscpp(req);
  }
  // auto
  if (typeof window === "undefined") return runCppMock(req);
  const r = await runCppJscpp(req);
  if (!r.compileOk && /failed to load/i.test(r.stderr)) {
    return runCppMock(req);
  }
  return r;
}

/** Run multiple stdin/stdout tests; all must pass. */
export async function runCppTests(
  source: string,
  tests: { stdin?: string; stdout: string }[],
  timeLimitMs?: number,
): Promise<{
  pass: boolean;
  results: { expected: string; actual: string; ok: boolean; stderr: string }[];
  firstError?: string;
}> {
  const results: {
    expected: string;
    actual: string;
    ok: boolean;
    stderr: string;
  }[] = [];
  for (const t of tests) {
    const r = await runCpp({
      source,
      stdin: t.stdin ?? "",
      timeLimitMs,
    });
    const expected = t.stdout.replace(/\r\n/g, "\n").trimEnd();
    const actual = r.stdout.replace(/\r\n/g, "\n").trimEnd();
    const ok = r.compileOk && r.ok && actual === expected;
    results.push({
      expected,
      actual,
      ok,
      stderr: r.stderr,
    });
    if (!ok) {
      return {
        pass: false,
        results,
        firstError: r.stderr || `expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`,
      };
    }
  }
  return { pass: results.every((x) => x.ok), results };
}
