import {
  detectJsHazards,
  stripSimpleTypescript,
  type DomAssert,
  type PlaygroundLang,
} from "@eduforge/shared";

export type RunResult = {
  ok: boolean;
  stdout: string;
  stderr: string;
  htmlPreview?: string;
  isolated?: boolean;
};

export type DomAssertResult = {
  selector: string;
  pass: boolean;
  detail: string;
};

/** In-memory demo DB for SQL playground */
const SQL_USERS = [
  { id: 1, name: "Ada", active: 1 },
  { id: 2, name: "Lin", active: 1 },
  { id: 3, name: "Grace", active: 0 },
];
const SQL_ORDERS = [
  { id: 10, user_id: 1, total: 20 },
  { id: 11, user_id: 1, total: 15 },
  { id: 12, user_id: 2, total: 40 },
];

function tables(): Record<string, Record<string, unknown>[]> {
  return {
    users: SQL_USERS as unknown as Record<string, unknown>[],
    orders: SQL_ORDERS as unknown as Record<string, unknown>[],
  };
}

/** Very small SELECT … FROM t [WHERE col = n] mock (+ COUNT(*)) */
export function runMockSql(sql: string): RunResult {
  try {
    const s = sql.replace(/;+\s*$/, "").trim();
    // COUNT(*) [AS alias]
    const countM = s.match(
      /^select\s+count\s*\(\s*\*\s*\)(?:\s+as\s+(\w+))?\s+from\s+(\w+)(?:\s+where\s+(\w+)\s*=\s*(\d+|'[^']*'))?\s*$/i,
    );
    if (countM) {
      const alias = countM[1] ?? "count";
      const table = countM[2]!.toLowerCase();
      const db = tables();
      if (!db[table]) {
        return { ok: false, stdout: "", stderr: `Unknown table: ${table}` };
      }
      let rows = [...db[table]!];
      if (countM[3] && countM[4]) {
        const col = countM[3];
        let val: string | number = countM[4];
        if (val.startsWith("'")) val = val.slice(1, -1);
        else val = Number(val);
        rows = rows.filter((r) => r[col] == val);
      }
      return {
        ok: true,
        stdout: JSON.stringify([{ [alias]: rows.length }], null, 2),
        stderr: "",
      };
    }

    const m = s.match(
      /^select\s+([\w\s,*]+)\s+from\s+(\w+)(?:\s+where\s+(\w+)\s*=\s*(\d+|'[^']*'))?\s*$/i,
    );
    if (!m) {
      return {
        ok: false,
        stdout: "",
        stderr:
          "Demo SQL: SELECT cols FROM users|orders [WHERE col = value]\n  or SELECT COUNT(*) [AS n] FROM t [WHERE …]\nTables: users(id,name,active), orders(id,user_id,total)",
      };
    }
    const cols = m[1]!.split(",").map((c) => c.trim());
    const table = m[2]!.toLowerCase();
    const db = tables();
    if (!db[table]) {
      return { ok: false, stdout: "", stderr: `Unknown table: ${table}` };
    }
    let rows = [...db[table]!];
    if (m[3] && m[4]) {
      const col = m[3];
      let val: string | number = m[4];
      if (val.startsWith("'")) val = val.slice(1, -1);
      else val = Number(val);
      rows = rows.filter((r) => r[col] == val);
    }
    const projected =
      cols.length === 1 && cols[0] === "*"
        ? rows
        : rows.map((r) => {
            const o: Record<string, unknown> = {};
            for (const c of cols) o[c] = r[c];
            return o;
          });
    return {
      ok: true,
      stdout: JSON.stringify(projected, null, 2),
      stderr: "",
    };
  } catch (e) {
    return { ok: false, stdout: "", stderr: String(e) };
  }
}

export function runBashSim(code: string): RunResult {
  const lines = code.split("\n").map((l) => l.trim()).filter(Boolean);
  const out: string[] = [];
  for (const line of lines) {
    if (line.startsWith("#")) continue;
    if (line.startsWith("echo ")) {
      out.push(line.slice(5).replace(/^["']|["']$/g, ""));
    } else if (line === "pwd") {
      out.push("/playground");
    } else if (line === "ls" || line.startsWith("ls ")) {
      out.push("app.js  package.json  README.md");
    } else if (line.startsWith("node ")) {
      out.push(`[sim] would run: ${line}`);
    } else if (line.startsWith("git ")) {
      out.push(`[sim] git ok: ${line}`);
    } else {
      out.push(`[sim] unknown/unsupported: ${line}`);
    }
  }
  return { ok: true, stdout: out.join("\n"), stderr: "" };
}

export function runJsonValidate(code: string): RunResult {
  try {
    const v = JSON.parse(code);
    return { ok: true, stdout: JSON.stringify(v, null, 2), stderr: "" };
  } catch (e) {
    return { ok: false, stdout: "", stderr: String(e) };
  }
}

function formatArg(a: unknown): string {
  if (typeof a === "string") return a;
  try {
    return JSON.stringify(a);
  } catch {
    return String(a);
  }
}

/**
 * Fallback same-thread runner (used if iframe unavailable).
 */
export function runJs(code: string, asTypescript = false): RunResult {
  const src = asTypescript ? stripSimpleTypescript(code) : code;
  const logs: string[] = [];
  const fakeConsole = {
    log: (...args: unknown[]) => {
      logs.push(args.map((a) => formatArg(a)).join(" "));
    },
    error: (...args: unknown[]) => {
      logs.push("[error] " + args.map((a) => formatArg(a)).join(" "));
    },
    warn: (...args: unknown[]) => {
      logs.push("[warn] " + args.map((a) => formatArg(a)).join(" "));
    },
  };
  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function("console", `"use strict";\n${src}\n`);
    fn(fakeConsole);
    return { ok: true, stdout: logs.join("\n") || "(no output)", stderr: "" };
  } catch (e) {
    return {
      ok: false,
      stdout: logs.join("\n"),
      stderr: e instanceof Error ? e.message : String(e),
    };
  }
}

/**
 * Run JS/TS inside a sandboxed iframe (no same-origin → no parent DOM access).
 */
export function runJsInIframe(
  code: string,
  asTypescript = false,
  timeoutMs = 2500,
): Promise<RunResult> {
  if (typeof document === "undefined") {
    return Promise.resolve(runJs(code, asTypescript));
  }
  const src = asTypescript ? stripSimpleTypescript(code) : code;
  // Static preflight: hard hazards never enter the sandbox
  const hazards = detectJsHazards(src).filter((h) => h.severity === "error");
  if (hazards.length) {
    return Promise.resolve({
      ok: false,
      stdout: "",
      stderr: hazards.map((h) => h.message).join("; "),
      isolated: true,
    });
  }
  const id = `pg-${Math.random().toString(36).slice(2)}`;
  // Cap timeout (P1b: isolated iframe worker timeouts)
  const ms = Math.min(Math.max(timeoutMs, 500), 8000);

  return new Promise((resolve) => {
    const iframe = document.createElement("iframe");
    iframe.setAttribute("sandbox", "allow-scripts");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    let settled = false;
    const finish = (r: RunResult) => {
      if (settled) return;
      settled = true;
      window.removeEventListener("message", onMsg);
      try {
        iframe.remove();
      } catch {
        /* */
      }
      resolve({ ...r, isolated: true });
    };

    const onMsg = (ev: MessageEvent) => {
      // Sandbox without allow-same-origin → opaque origin; trust source window + message id
      if (ev.source !== iframe.contentWindow) return;
      const data = ev.data as {
        type?: string;
        id?: string;
        ok?: boolean;
        logs?: string[];
        error?: string;
      };
      if (!data || data.type !== "eduforge-pg" || data.id !== id) return;
      finish({
        ok: Boolean(data.ok),
        stdout: (data.logs ?? []).join("\n") || (data.ok ? "(no output)" : ""),
        stderr: data.error ?? "",
      });
    };
    window.addEventListener("message", onMsg);

    const escaped = JSON.stringify(src);
    const html = `<!DOCTYPE html><html><body><script>
(function(){
  var logs = [];
  var c = {
    log: function(){ logs.push(Array.prototype.slice.call(arguments).map(function(x){
      try { return typeof x === 'string' ? x : JSON.stringify(x); } catch(e) { return String(x); }
    }).join(' ')); },
    error: function(){ logs.push('[error] ' + Array.prototype.slice.call(arguments).join(' ')); },
    warn: function(){ logs.push('[warn] ' + Array.prototype.slice.call(arguments).join(' ')); }
  };
  try {
    var src = ${escaped};
    (new Function('console', '"use strict";\\n' + src + '\\n'))(c);
    // Opaque sandbox origin cannot use a concrete targetOrigin reliably
    parent.postMessage({ type: 'eduforge-pg', id: ${JSON.stringify(id)}, ok: true, logs: logs }, '*');
  } catch (e) {
    parent.postMessage({ type: 'eduforge-pg', id: ${JSON.stringify(id)}, ok: false, error: String(e), logs: logs }, '*');
  }
})();
</script></body></html>`;

    iframe.srcdoc = html;
    window.setTimeout(() => {
      finish({
        ok: false,
        stdout: "",
        stderr: `timeout after ${ms}ms (possible infinite loop)`,
        isolated: true,
      });
    }, ms);
  });
}

export function buildPreviewHtml(opts: {
  lang: PlaygroundLang;
  code: string;
  html?: string;
  css?: string;
}): string {
  if (opts.lang === "html") {
    return opts.code;
  }
  if (opts.lang === "css") {
    return `<!DOCTYPE html><html><head><style>${opts.css ?? opts.code}</style></head><body>${
      opts.html ?? "<div class='card'>Preview</div>"
    }</body></html>`;
  }
  if (opts.lang === "js" || opts.lang === "typescript") {
    const js = opts.lang === "typescript" ? stripSimpleTypescript(opts.code) : opts.code;
    return `<!DOCTYPE html><html><body>
<pre id="out" style="font:14px monospace"></pre>
<script>
const out = document.getElementById('out');
const log = (...a) => { out.textContent += a.map(x => typeof x==='string'?x:JSON.stringify(x)).join(' ') + '\\n'; };
console.log = log; console.error = log; console.warn = log;
try { ${js.replace(/<\/script/gi, "<\\/script")} } catch(e) { log(String(e)); }
</script></body></html>`;
  }
  return `<pre>${opts.code}</pre>`;
}

export async function runPlayground(
  lang: PlaygroundLang,
  code: string,
  extra?: {
    html?: string;
    css?: string;
    preferIframe?: boolean;
    stdin?: string;
    /** Multi-file map for React studio */
    files?: Record<string, string>;
  },
): Promise<RunResult> {
  switch (lang) {
    case "js":
      if (extra?.preferIframe !== false) return runJsInIframe(code, false);
      return runJs(code, false);
    case "typescript":
      if (extra?.preferIframe !== false) return runJsInIframe(code, true);
      return runJs(code, true);
    case "cpp": {
      const { runCpp } = await import("./cpp-runner");
      const r = await runCpp({ source: code, stdin: extra?.stdin ?? "" });
      return {
        ok: r.ok && r.compileOk,
        stdout: r.stdout || (r.compileOk ? "(no output)" : ""),
        stderr: r.stderr,
      };
    }
    case "react": {
      const { runReactPlayground, DEFAULT_REACT_FILES } = await import(
        "./react-playground-run"
      );
      const files =
        extra?.files && Object.keys(extra.files).length
          ? extra.files
          : {
              ...DEFAULT_REACT_FILES,
              "App.tsx": code || DEFAULT_REACT_FILES["App.tsx"]!,
              ...(extra?.css ? { "styles.css": extra.css } : {}),
            };
      const r = await runReactPlayground(files);
      return {
        ok: r.ok,
        stdout: r.stdout,
        stderr: r.stderr,
        htmlPreview: r.htmlPreview,
      };
    }
    case "sql":
      return runMockSql(code);
    case "bash":
      return runBashSim(code);
    case "json":
      return runJsonValidate(code);
    case "html":
    case "css":
      return {
        ok: true,
        stdout: "Preview updated",
        stderr: "",
        htmlPreview: buildPreviewHtml({
          lang,
          code,
          html: extra?.html,
          css: extra?.css ?? (lang === "css" ? code : undefined),
        }),
      };
    default:
      return { ok: false, stdout: "", stderr: "Unsupported language" };
  }
}

/**
 * Run DOM assertions inside a sandboxed iframe that postMessages results.
 * Does not grant parent access to iframe document.
 */
export function runDomAsserts(
  htmlDoc: string,
  asserts: DomAssert[],
  timeoutMs = 2000,
  /** Wait for async mounts (React) before querying */
  settleMs = 0,
): Promise<{ pass: boolean; results: DomAssertResult[] }> {
  if (typeof document === "undefined" || !asserts.length) {
    return Promise.resolve({ pass: true, results: [] });
  }
  const id = `dom-${Math.random().toString(36).slice(2)}`;
  return new Promise((resolve) => {
    const iframe = document.createElement("iframe");
    // allow-scripts + network for esm.sh React; no allow-same-origin
    iframe.setAttribute("sandbox", "allow-scripts");
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    let settled = false;
    const finish = (pass: boolean, results: DomAssertResult[]) => {
      if (settled) return;
      settled = true;
      window.removeEventListener("message", onMsg);
      try {
        iframe.remove();
      } catch {
        /* */
      }
      resolve({ pass, results });
    };
    const onMsg = (ev: MessageEvent) => {
      const data = ev.data as {
        type?: string;
        id?: string;
        results?: DomAssertResult[];
      };
      if (!data || data.type !== "eduforge-dom" || data.id !== id) return;
      const results = data.results ?? [];
      finish(
        results.length > 0 && results.every((r) => r.pass),
        results,
      );
    };
    window.addEventListener("message", onMsg);
    const assertsJson = JSON.stringify(asserts);
    const delay = Math.max(0, settleMs);
    // Inject assertion runner before </body> or at end
    const runner = `<script>
(function(){
  var asserts = ${assertsJson};
  function run() {
    var results = asserts.map(function(a){
      try {
        var els = document.querySelectorAll(a.selector);
        var min = a.minCount || 1;
        if (els.length < min) {
          return { selector: a.selector, pass: false, detail: 'count ' + els.length + ' < ' + min };
        }
        if (a.textIncludes) {
          var ok = false;
          for (var i = 0; i < els.length; i++) {
            if ((els[i].textContent || '').indexOf(a.textIncludes) !== -1) { ok = true; break; }
          }
          if (!ok) return { selector: a.selector, pass: false, detail: 'text missing: ' + a.textIncludes };
        }
        if (a.attr) {
          var found = false;
          for (var j = 0; j < els.length; j++) {
            if (els[j].getAttribute(a.attr.name) === a.attr.value) { found = true; break; }
          }
          if (!found) return { selector: a.selector, pass: false, detail: 'attr ' + a.attr.name + ' mismatch' };
        }
        return { selector: a.selector, pass: true, detail: 'ok' };
      } catch (e) {
        return { selector: a.selector, pass: false, detail: String(e) };
      }
    });
    parent.postMessage({ type: 'eduforge-dom', id: ${JSON.stringify(id)}, results: results }, '*');
  }
  setTimeout(run, ${delay});
})();
</script>`;
    let doc = htmlDoc;
    if (/<\/body>/i.test(doc)) {
      doc = doc.replace(/<\/body>/i, runner + "</body>");
    } else {
      doc = doc + runner;
    }
    iframe.srcdoc = doc;
    window.setTimeout(() => {
      finish(false, [
        { selector: "*", pass: false, detail: "dom assert timeout" },
      ]);
    }, Math.max(timeoutMs, settleMs + 1500));
  });
}
