import { isoWeekKey } from "./week.js";

export type PlaygroundLang =
  | "html"
  | "css"
  | "js"
  | "typescript"
  | "sql"
  | "bash"
  | "json";

export type PlaygroundExample = {
  id: string;
  lang: PlaygroundLang;
  titleUk: string;
  titleEn: string;
  code: string;
  /** For css/html multi-pane demos */
  html?: string;
  css?: string;
};

export const PLAYGROUND_LANGS: {
  id: PlaygroundLang;
  label: string;
  runnable: "preview" | "js" | "sql" | "bash" | "json";
}[] = [
  { id: "html", label: "HTML", runnable: "preview" },
  { id: "css", label: "CSS", runnable: "preview" },
  { id: "js", label: "JavaScript", runnable: "js" },
  { id: "typescript", label: "TypeScript", runnable: "js" },
  { id: "sql", label: "SQL", runnable: "sql" },
  { id: "bash", label: "Bash (sim)", runnable: "bash" },
  { id: "json", label: "JSON", runnable: "json" },
];

export const PLAYGROUND_EXAMPLES: PlaygroundExample[] = [
  {
    id: "html-hello",
    lang: "html",
    titleUk: "HTML hello",
    titleEn: "HTML hello",
    code: `<!DOCTYPE html>
<html>
  <body>
    <h1>Hello EduForge</h1>
    <p>Mini playground</p>
  </body>
</html>`,
  },
  {
    id: "css-card",
    lang: "css",
    titleUk: "CSS card",
    titleEn: "CSS card",
    html: `<div class="card">Card</div>`,
    css: `.card {
  padding: 16px;
  border-radius: 12px;
  background: #0ea5e9;
  color: white;
  font-family: system-ui;
}`,
    code: `/* CSS + HTML panes */`,
  },
  {
    id: "js-sum",
    lang: "js",
    titleUk: "JS sum",
    titleEn: "JS sum",
    code: `function sum(a, b) {
  return a + b;
}
console.log(sum(2, 3));
console.log("ready");`,
  },
  {
    id: "ts-greet",
    lang: "typescript",
    titleUk: "TS greet (runs as JS)",
    titleEn: "TS greet (runs as JS)",
    code: `type User = { name: string };
function greet(u: User): string {
  return "Hi " + u.name;
}
console.log(greet({ name: "Ada" }));`,
  },
  {
    id: "sql-users",
    lang: "sql",
    titleUk: "SQL SELECT users",
    titleEn: "SQL SELECT users",
    code: `SELECT id, name FROM users WHERE active = 1;`,
  },
  {
    id: "bash-echo",
    lang: "bash",
    titleUk: "Bash echo",
    titleEn: "Bash echo",
    code: `echo "hello playground"
pwd
ls`,
  },
  {
    id: "json-user",
    lang: "json",
    titleUk: "JSON user",
    titleEn: "JSON user",
    code: `{
  "id": "1",
  "name": "Ada",
  "roles": ["student"]
}`,
  },
];

/** Strip simple TypeScript annotations for browser run (not a full compiler). */
export function stripSimpleTypescript(src: string): string {
  return src
    .replace(/^\s*import\s+type[\s\S]*?;\s*$/gm, "")
    .replace(/\btype\s+\w+\s*=\s*[^;]+;/g, "")
    .replace(/\binterface\s+\w+\s*\{[\s\S]*?\}\s*/g, "")
    .replace(/:\s*[A-Za-z0-9_<>\[\]|&'",\s]+(?=[,)=])/g, "")
    .replace(/\)\s*:\s*[A-Za-z0-9_<>\[\]|&'"]+\s*\{/g, ") {")
    .replace(/as\s+[A-Za-z0-9_<>\[\]]+/g, "");
}

export type DomAssert = {
  /** CSS selector */
  selector: string;
  /** Minimum number of matches (default 1) */
  minCount?: number;
  /** Element textContent must include */
  textIncludes?: string;
  /** Required attribute name=value */
  attr?: { name: string; value: string };
};

export type PlaygroundChallenge = {
  id: string;
  lang: PlaygroundLang;
  titleUk: string;
  titleEn: string;
  promptUk: string;
  promptEn: string;
  starterCode: string;
  /** For CSS challenges with separate HTML pane */
  starterHtml?: string;
  /** Exact stdout lines after normalize (trim, no trailing empty) */
  expectedStdout?: string[];
  /**
   * Source checks (HTML/CSS/bash): all substrings must appear (case-insensitive
   * unless `caseSensitiveSource` is true).
   */
  expectedSourceContains?: string[];
  caseSensitiveSource?: boolean;
  /** Client-side DOM assertions run inside sandboxed preview iframe */
  domAsserts?: DomAssert[];
  xpReward: number;
  hintUk?: string;
  hintEn?: string;
};

export const PLAYGROUND_CHALLENGES: PlaygroundChallenge[] = [
  {
    id: "ch-js-double",
    lang: "js",
    titleUk: "Подвоєння",
    titleEn: "Double it",
    promptUk: "Напиши функцію double(n), виведи double(7).",
    promptEn: "Write double(n) and log double(7).",
    starterCode: `function double(n) {
  // TODO
}
console.log(double(7));`,
    expectedStdout: ["14"],
    xpReward: 8,
    hintUk: "return n * 2",
    hintEn: "return n * 2",
  },
  {
    id: "ch-js-greet",
    lang: "js",
    titleUk: "Привітання",
    titleEn: "Greeting",
    promptUk: 'Функція greet(name) → "Hello, NAME". Виведи greet("Ada").',
    promptEn: 'greet(name) → "Hello, NAME". Log greet("Ada").',
    starterCode: `function greet(name) {
  // TODO
}
console.log(greet("Ada"));`,
    expectedStdout: ["Hello, Ada"],
    xpReward: 8,
  },
  {
    id: "ch-js-sum-arr",
    lang: "js",
    titleUk: "Сума масиву",
    titleEn: "Array sum",
    promptUk: "sum([1,2,3,4]) має вивести 10.",
    promptEn: "sum([1,2,3,4]) should log 10.",
    starterCode: `function sum(arr) {
  // TODO
}
console.log(sum([1, 2, 3, 4]));`,
    expectedStdout: ["10"],
    xpReward: 10,
  },
  {
    id: "ch-js-fizz",
    lang: "js",
    titleUk: "Fizz (3)",
    titleEn: "Fizz (3)",
    promptUk: 'Якщо n%3===0 виведи "fizz", інакше n. Виклич для 3 і 4.',
    promptEn: 'If n%3===0 log "fizz", else n. Call for 3 and 4.',
    starterCode: `function fizz(n) {
  // TODO
}
console.log(fizz(3));
console.log(fizz(4));`,
    expectedStdout: ["fizz", "4"],
    xpReward: 12,
  },
  {
    id: "ch-js-max",
    lang: "js",
    titleUk: "Максимум",
    titleEn: "Maximum",
    promptUk: "max(a,b) → більше число. Виведи max(3,9) і max(5,2).",
    promptEn: "max(a,b) returns larger. Log max(3,9) and max(5,2).",
    starterCode: `function max(a, b) {
  // TODO
}
console.log(max(3, 9));
console.log(max(5, 2));`,
    expectedStdout: ["9", "5"],
    xpReward: 10,
  },
  {
    id: "ch-js-reverse",
    lang: "js",
    titleUk: "Реверс рядка",
    titleEn: "Reverse string",
    promptUk: 'reverse("code") → "edoc". Виведи результат.',
    promptEn: 'reverse("code") → "edoc". Log it.',
    starterCode: `function reverse(s) {
  // TODO
}
console.log(reverse("code"));`,
    expectedStdout: ["edoc"],
    xpReward: 12,
    hintUk: "split + reverse + join",
    hintEn: "split + reverse + join",
  },
  {
    id: "ch-js-filter-even",
    lang: "js",
    titleUk: "Парні числа",
    titleEn: "Even numbers",
    promptUk: "even([1,2,3,4,5]) → [2,4] (JSON). Виведи JSON.stringify(...).",
    promptEn: "even([1,2,3,4,5]) → [2,4]. Log JSON.stringify(...).",
    starterCode: `function even(arr) {
  // TODO
}
console.log(JSON.stringify(even([1, 2, 3, 4, 5])));`,
    expectedStdout: ["[2,4]"],
    xpReward: 12,
  },
  {
    id: "ch-ts-id",
    lang: "typescript",
    titleUk: "TS identity",
    titleEn: "TS identity",
    promptUk: "identity<T>(x: T): T — виведи identity(42).",
    promptEn: "identity<T>(x: T): T — log identity(42).",
    starterCode: `function identity<T>(x: T): T {
  // TODO
}
console.log(identity(42));`,
    expectedStdout: ["42"],
    xpReward: 10,
  },
  {
    id: "ch-sql-active",
    lang: "sql",
    titleUk: "Активні users",
    titleEn: "Active users",
    promptUk: "SELECT id, name FROM users WHERE active = 1",
    promptEn: "SELECT id, name FROM users WHERE active = 1",
    starterCode: `SELECT id, name FROM users WHERE active = 0;`,
    expectedStdout: [
      JSON.stringify(
        [
          { id: 1, name: "Ada" },
          { id: 2, name: "Lin" },
        ],
        null,
        2,
      ),
    ],
    xpReward: 10,
  },
  {
    id: "ch-sql-orders",
    lang: "sql",
    titleUk: "Orders user 1",
    titleEn: "Orders user 1",
    promptUk: "SELECT id, total FROM orders WHERE user_id = 1",
    promptEn: "SELECT id, total FROM orders WHERE user_id = 1",
    starterCode: `SELECT * FROM orders;`,
    expectedStdout: [
      JSON.stringify(
        [
          { id: 10, total: 20 },
          { id: 11, total: 15 },
        ],
        null,
        2,
      ),
    ],
    xpReward: 12,
  },
  {
    id: "ch-json-parse",
    lang: "json",
    titleUk: "Валідний JSON",
    titleEn: "Valid JSON",
    promptUk: "Зроби валідний JSON з полем ok: true",
    promptEn: "Make valid JSON with ok: true",
    starterCode: `{
  "ok": false
}`,
    expectedStdout: [JSON.stringify({ ok: true }, null, 2)],
    xpReward: 6,
    hintUk: "Зміни false на true",
    hintEn: "Change false to true",
  },
  {
    id: "ch-json-user",
    lang: "json",
    titleUk: "JSON user",
    titleEn: "JSON user",
    promptUk: 'Об\'єкт { "name": "Ada", "level": 3 }',
    promptEn: 'Object { "name": "Ada", "level": 3 }',
    starterCode: `{
  "name": "?",
  "level": 0
}`,
    expectedStdout: [JSON.stringify({ name: "Ada", level: 3 }, null, 2)],
    xpReward: 8,
  },
  {
    id: "ch-bash-echo",
    lang: "bash",
    titleUk: "echo hello",
    titleEn: "echo hello",
    promptUk: 'Виведи "hello playground" через echo',
    promptEn: 'Print "hello playground" with echo',
    starterCode: `echo "todo"`,
    expectedStdout: ["hello playground"],
    xpReward: 6,
  },
  /* ——— HTML / CSS visual (source checks) ——— */
  {
    id: "ch-html-h1",
    lang: "html",
    titleUk: "HTML заголовок",
    titleEn: "HTML heading",
    promptUk: 'Сторінка з <h1>EduForge</h1> і <p class="lead">',
    promptEn: 'Page with <h1>EduForge</h1> and <p class="lead">',
    starterCode: `<!DOCTYPE html>
<html>
<body>
  <!-- TODO: h1 EduForge + p.lead -->
</body>
</html>`,
    expectedSourceContains: ["<h1", "EduForge", "</h1>", 'class="lead"', "<p"],
    domAsserts: [
      { selector: "h1", textIncludes: "EduForge", minCount: 1 },
      { selector: "p.lead", minCount: 1 },
    ],
    xpReward: 10,
  },
  {
    id: "ch-html-link",
    lang: "html",
    titleUk: "HTML посилання",
    titleEn: "HTML link",
    promptUk: 'Додай <a href="/courses">Courses</a>',
    promptEn: 'Add <a href="/courses">Courses</a>',
    starterCode: `<!DOCTYPE html>
<html>
<body>
  <nav>
    <!-- TODO -->
  </nav>
</body>
</html>`,
    expectedSourceContains: ["<a", 'href="/courses"', "Courses", "</a>"],
    domAsserts: [
      { selector: 'a[href="/courses"]', textIncludes: "Courses", minCount: 1 },
    ],
    xpReward: 10,
  },
  {
    id: "ch-html-form",
    lang: "html",
    titleUk: "HTML форма",
    titleEn: "HTML form",
    promptUk: 'form method="post" з input type="email" і button type="submit"',
    promptEn: 'form method="post" with email input and submit button',
    starterCode: `<!DOCTYPE html>
<html>
<body>
  <!-- TODO form -->
</body>
</html>`,
    expectedSourceContains: [
      "<form",
      'method="post"',
      'type="email"',
      'type="submit"',
      "</form>",
    ],
    domAsserts: [
      { selector: 'form[method="post"]', minCount: 1 },
      { selector: 'input[type="email"]', minCount: 1 },
      { selector: 'button[type="submit"], input[type="submit"]', minCount: 1 },
    ],
    xpReward: 12,
  },
  {
    id: "ch-css-flex",
    lang: "css",
    titleUk: "CSS flex center",
    titleEn: "CSS flex center",
    promptUk: ".box: display flex; justify-content center; align-items center",
    promptEn: ".box: display flex; justify-content center; align-items center",
    starterHtml: `<div class="box">Hi</div>`,
    starterCode: `.box {
  /* TODO flex center */
  min-height: 120px;
  background: #0ea5e9;
  color: white;
}`,
    expectedSourceContains: [
      ".box",
      "display: flex",
      "justify-content: center",
      "align-items: center",
    ],
    domAsserts: [{ selector: ".box", textIncludes: "Hi", minCount: 1 }],
    xpReward: 12,
    hintUk: "display: flex + justify/align center",
    hintEn: "display: flex + justify/align center",
  },
  {
    id: "ch-css-card",
    lang: "css",
    titleUk: "CSS card",
    titleEn: "CSS card",
    promptUk: ".card: padding 16px, border-radius 12px, background #111827, color white",
    promptEn: ".card: padding 16px, border-radius 12px, background #111827, color white",
    starterHtml: `<div class="card">Card</div>`,
    starterCode: `.card {
  /* TODO */
}`,
    expectedSourceContains: [
      ".card",
      "padding: 16px",
      "border-radius: 12px",
      "background: #111827",
      "color: white",
    ],
    domAsserts: [{ selector: ".card", textIncludes: "Card", minCount: 1 }],
    xpReward: 12,
  },
  {
    id: "ch-css-button",
    lang: "css",
    titleUk: "CSS button hover",
    titleEn: "CSS button hover",
    promptUk: "button + button:hover з background",
    promptEn: "button + button:hover with background",
    starterHtml: `<button>Go</button>`,
    starterCode: `button {
  /* TODO base + :hover */
}`,
    expectedSourceContains: ["button", "background", ":hover"],
    domAsserts: [{ selector: "button", textIncludes: "Go", minCount: 1 }],
    xpReward: 10,
  },
  /* ——— Stage 32 extras ——— */
  {
    id: "ch-js-palindrome",
    lang: "js",
    titleUk: "Паліндром",
    titleEn: "Palindrome",
    promptUk: 'isPalindrome("level") → true, isPalindrome("code") → false. JSON log.',
    promptEn: 'isPalindrome("level") → true, isPalindrome("code") → false. Log JSON.',
    starterCode: `function isPalindrome(s) {
  // TODO
}
console.log(JSON.stringify(isPalindrome("level")));
console.log(JSON.stringify(isPalindrome("code")));`,
    expectedStdout: ["true", "false"],
    xpReward: 14,
    hintUk: "порівняй s з reverse",
    hintEn: "compare s to its reverse",
  },
  {
    id: "ch-js-count-vowels",
    lang: "js",
    titleUk: "Голосні",
    titleEn: "Count vowels",
    promptUk: 'countVowels("EduForge") → 4 (e,u,o,e). Log the number.',
    promptEn: 'countVowels("EduForge") → 4. Log the number.',
    starterCode: `function countVowels(s) {
  // TODO aeiou (ignore case)
}
console.log(countVowels("EduForge"));`,
    expectedStdout: ["4"],
    xpReward: 12,
  },
  {
    id: "ch-bash-pwd",
    lang: "bash",
    titleUk: "pwd",
    titleEn: "pwd",
    promptUk: "Виведи поточну директорію командою pwd",
    promptEn: "Print current directory with pwd",
    starterCode: `# TODO`,
    expectedStdout: ["/playground"],
    xpReward: 6,
  },
  {
    id: "ch-sql-count",
    lang: "sql",
    titleUk: "COUNT users",
    titleEn: "COUNT users",
    promptUk: "SELECT COUNT(*) AS n FROM users",
    promptEn: "SELECT COUNT(*) AS n FROM users",
    starterCode: `SELECT * FROM users;`,
    expectedStdout: [JSON.stringify([{ n: 3 }], null, 2)],
    xpReward: 12,
    hintUk: "demo DB має 3 users",
    hintEn: "demo DB has 3 users",
  },
  {
    id: "ch-html-list",
    lang: "html",
    titleUk: "HTML список",
    titleEn: "HTML list",
    promptUk: "ul з трьома li: HTML, CSS, JS",
    promptEn: "ul with three li: HTML, CSS, JS",
    starterCode: `<!DOCTYPE html>
<html>
<body>
  <!-- TODO ul > li -->
</body>
</html>`,
    expectedSourceContains: ["<ul", "<li", "HTML", "CSS", "JS", "</ul>"],
    domAsserts: [
      { selector: "ul", minCount: 1 },
      { selector: "li", minCount: 3 },
    ],
    xpReward: 10,
  },
  {
    id: "ch-css-grid",
    lang: "css",
    titleUk: "CSS grid 2 col",
    titleEn: "CSS grid 2 col",
    promptUk: ".grid: display grid; grid-template-columns 1fr 1fr; gap 12px",
    promptEn: ".grid: display grid; grid-template-columns 1fr 1fr; gap 12px",
    starterHtml: `<div class="grid"><div>A</div><div>B</div></div>`,
    starterCode: `.grid {
  /* TODO grid 2 columns */
}`,
    expectedSourceContains: [
      ".grid",
      "display: grid",
      "grid-template-columns",
      "1fr",
      "gap: 12px",
    ],
    domAsserts: [{ selector: ".grid", minCount: 1 }],
    xpReward: 12,
  },
];

/** ISO week race: fixed subset of challenge ids rotated by week number */
export function weeklyRaceChallengeIds(weekKey?: string): string[] {
  const key = weekKey ?? isoWeekKey();
  const n = parseInt(key.replace(/\D/g, "").slice(-2) || "1", 10) || 1;
  const pool = PLAYGROUND_CHALLENGES.map((c) => c.id);
  const pick = 5;
  const start = (n * 3) % Math.max(1, pool.length);
  const ids: string[] = [];
  for (let i = 0; i < pick; i++) {
    ids.push(pool[(start + i) % pool.length]!);
  }
  return [...new Set(ids)];
}

export function weeklyRaceXpBonus(rank: number): number {
  if (rank === 1) return 25;
  if (rank === 2) return 15;
  if (rank === 3) return 10;
  return 0;
}

export function normalizeStdout(text: string): string[] {
  const lines = text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.trimEnd());
  while (lines.length && lines[lines.length - 1] === "") lines.pop();
  return lines;
}

export function matchChallengeStdout(
  actual: string,
  expectedLines: string[],
): { pass: boolean; actualLines: string[] } {
  const actualLines = normalizeStdout(actual);
  const expected = expectedLines.flatMap((e) => normalizeStdout(e));
  const a = actualLines.join("\n").trim();
  const e = expected.join("\n").trim();
  return { pass: a === e, actualLines };
}

/** Collapse whitespace for looser CSS/HTML source matching */
export function normalizeSource(src: string, caseSensitive: boolean): string {
  const s = src.replace(/\s+/g, " ").trim();
  return caseSensitive ? s : s.toLowerCase();
}

export function matchSourceContains(
  source: string,
  needles: string[],
  caseSensitive = false,
): { pass: boolean; missing: string[] } {
  const hay = normalizeSource(source, caseSensitive);
  const missing: string[] = [];
  for (const n of needles) {
    const needle = normalizeSource(n, caseSensitive);
    if (!hay.includes(needle)) missing.push(n);
  }
  return { pass: missing.length === 0, missing };
}

export function evaluatePlaygroundChallenge(
  ch: PlaygroundChallenge,
  opts: { stdout?: string; source?: string },
): { pass: boolean; reason?: string } {
  if (ch.expectedStdout && ch.expectedStdout.length) {
    const { pass } = matchChallengeStdout(opts.stdout ?? "", ch.expectedStdout);
    return pass ? { pass: true } : { pass: false, reason: "stdout_mismatch" };
  }
  if (ch.expectedSourceContains && ch.expectedSourceContains.length) {
    const { pass, missing } = matchSourceContains(
      opts.source ?? "",
      ch.expectedSourceContains,
      ch.caseSensitiveSource ?? false,
    );
    return pass
      ? { pass: true }
      : { pass: false, reason: `missing:${missing.join("|")}` };
  }
  return { pass: false, reason: "no_criteria" };
}

export function playgroundChallengeById(id: string): PlaygroundChallenge | undefined {
  return PLAYGROUND_CHALLENGES.find((c) => c.id === id);
}

export function playgroundXpForCodes(codes: string[]): {
  solved: number;
  xp: number;
} {
  let xp = 0;
  let solved = 0;
  for (const code of codes) {
    if (!code.startsWith("pg_ch_")) continue;
    const id = code.slice("pg_ch_".length);
    const ch = playgroundChallengeById(id);
    if (ch) {
      solved += 1;
      xp += ch.xpReward;
    }
  }
  return { solved, xp };
}

/* ——— Share snippet via URL (?share= base64url JSON) ——— */

export type PlaygroundSharePayload = {
  v: 1;
  lang: PlaygroundLang;
  code: string;
  html?: string;
  css?: string;
  challengeId?: string | null;
};

/** Max encoded length for `?share=` (URL size safety). */
export const PLAYGROUND_SHARE_MAX_ENCODED = 8 * 1024;

const B64 =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function bytesToBase64(bytes: Uint8Array): string {
  let out = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const a = bytes[i]!;
    const b = i + 1 < bytes.length ? bytes[i + 1]! : 0;
    const c = i + 2 < bytes.length ? bytes[i + 2]! : 0;
    const triple = (a << 16) | (b << 8) | c;
    out += B64[(triple >> 18) & 63];
    out += B64[(triple >> 12) & 63];
    out += i + 1 < bytes.length ? B64[(triple >> 6) & 63] : "=";
    out += i + 2 < bytes.length ? B64[triple & 63] : "=";
  }
  return out;
}

function base64ToBytes(b64: string): Uint8Array {
  const clean = b64.replace(/=+$/, "");
  const len = clean.length;
  const outLen = Math.floor((len * 3) / 4);
  const out = new Uint8Array(outLen);
  let o = 0;
  for (let i = 0; i < len; i += 4) {
    const n = (B64.indexOf(clean[i]!) << 18) |
      (B64.indexOf(clean[i + 1]!) << 12) |
      ((i + 2 < len ? B64.indexOf(clean[i + 2]!) : 0) << 6) |
      (i + 3 < len ? B64.indexOf(clean[i + 3]!) : 0);
    out[o++] = (n >> 16) & 255;
    if (i + 2 < len) out[o++] = (n >> 8) & 255;
    if (i + 3 < len) out[o++] = n & 255;
  }
  return out.subarray(0, o);
}

function utf8ToBase64Url(text: string): string {
  const bytes = new TextEncoder().encode(text);
  return bytesToBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToUtf8(s: string): string {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad;
  return new TextDecoder().decode(base64ToBytes(b64));
}

export function encodePlaygroundShare(payload: PlaygroundSharePayload): string | null {
  try {
    const json = JSON.stringify(payload);
    const encoded = utf8ToBase64Url(json);
    if (encoded.length > PLAYGROUND_SHARE_MAX_ENCODED) return null;
    return encoded;
  } catch {
    return null;
  }
}

export function decodePlaygroundShare(raw: string): PlaygroundSharePayload | null {
  try {
    if (!raw || raw.length > PLAYGROUND_SHARE_MAX_ENCODED + 64) return null;
    const json = base64UrlToUtf8(raw);
    const data = JSON.parse(json) as PlaygroundSharePayload;
    if (data?.v !== 1 || typeof data.code !== "string" || !data.lang) return null;
    if (data.code.length > 50_000) return null;
    return {
      v: 1,
      lang: data.lang,
      code: data.code,
      html: typeof data.html === "string" ? data.html : undefined,
      css: typeof data.css === "string" ? data.css : undefined,
      challengeId: data.challengeId ?? null,
    };
  } catch {
    return null;
  }
}

export function buildPlaygroundShareUrl(
  origin: string,
  payload: PlaygroundSharePayload,
): string | null {
  const enc = encodePlaygroundShare(payload);
  if (!enc) return null;
  return `${origin.replace(/\/$/, "")}/playground?share=${enc}`;
}

/** Chrome-free embed route for iframes / blog posts */
export function buildPlaygroundEmbedUrl(
  origin: string,
  payload: PlaygroundSharePayload,
): string | null {
  const enc = encodePlaygroundShare(payload);
  if (!enc) return null;
  return `${origin.replace(/\/$/, "")}/embed/playground?share=${enc}`;
}

export function playgroundEmbedIframeHtml(embedUrl: string, height = 480): string {
  return `<iframe src="${embedUrl}" width="100%" height="${height}" style="border:0;border-radius:12px" allow="clipboard-write" loading="lazy" title="EduForge Playground"></iframe>`;
}
