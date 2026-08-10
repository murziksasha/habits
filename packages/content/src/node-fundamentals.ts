import type { CourseContent, Exercise } from "./types.js";
import {
  codeFill,
  codeOrder,
  codeRead,
  exam,
  lesson,
  matchEx,
  mcq,
  unit,
} from "./builders.js";

const runtime = unit("runtime", "Node runtime", "Node runtime", [
  lesson(
    "nf-what",
    "Що таке Node.js",
    "What is Node.js",
    1,
    true,
    [
      mcq(
        "nf-r1",
        "Node.js — це:",
        "Node.js is:",
        ["JS runtime поза браузером (V8)", "браузерний engine only", "SQL database", "CSS preprocessor"],
        0,
      ),
      mcq(
        "nf-r2",
        "Типові use cases:",
        "Typical use cases:",
        ["APIs, CLI, tooling, servers", "only GPU shaders", "only Excel", "only mobile UI kit"],
        0,
      ),
      codeFill("nf-r3", "process object", "process object", "js", "console.log(___.version);", ["process"], true),
    ],
  ),
  lesson(
    "nf-repl-cli",
    "node CLI",
    "node CLI",
    1,
    true,
    [
      codeFill("nf-r4", "run file", "run file", "bash", "node ___.js", ["app", "index", "server"], false),
      mcq("nf-r5", "node -e:", "node -e:", ["eval string code", "eslint", "npm install", "docker"], 0),
      matchEx("nf-r6", "CLI", "CLI", [
        { left: "node file.js", right: "run script" },
        { left: "node -v", right: "print version" },
        { left: "node", right: "REPL" },
      ]),
    ],
  ),
  exam("nf-runtime-exam", "Контрольна: runtime", "Exam: runtime", 1, [
    mcq("nf-re1", "Node runs:", "Node runs:", ["JS outside browser", "only CSS", "only SQL", "only HTML"], 0),
    codeFill("nf-re2", "process", "process", "js", "___.env.PORT", ["process"], true),
    mcq("nf-re3", "V8 is:", "V8 is:", ["JS engine", "SQL engine", "CSS engine", "Redis"], 0),
    codeFill("nf-re4", "node run", "node run", "bash", "___ server.js", ["node"], true),
  ]),
]);

const modulesU = unit("modules", "Modules", "Modules", [
  lesson(
    "nf-cjs",
    "CommonJS require",
    "CommonJS require",
    2,
    false,
    [
      codeFill("nf-m1", "require", "require", "js", "const fs = ___('fs');", ["require"], true),
      codeFill("nf-m2", "exports", "exports", "js", "module.___ = { add };", ["exports"], true),
      mcq("nf-m3", "require is:", "require is:", ["CommonJS import", "ESM only", "SQL include", "CSS @import for JS always"], 0),
    ],
  ),
  lesson(
    "nf-esm",
    "ESM import/export",
    "ESM import/export",
    2,
    false,
    [
      codeFill("nf-m4", "export", "export", "js", "___ function add(a,b){ return a+b }", ["export"], true),
      codeFill("nf-m5", "import", "import", "js", "___ { add } from './math.js';", ["import"], true),
      mcq("nf-m6", "package.json type module:", "type module:", ["enables ESM by default", "forces CJS only", "disables node", "sets PORT"], 0),
    ],
  ),
  exam("nf-mod-exam", "Контрольна: modules", "Exam: modules", 2, [
    codeFill("nf-me1", "require", "require", "js", "const path = ___('path');", ["require"], true),
    codeFill("nf-me2", "import", "import", "js", "___ x from './x.js';", ["import"], true),
    codeFill("nf-me3", "export", "export", "js", "___ const PI = 3;", ["export"], true),
    mcq("nf-me4", "module.exports:", "module.exports:", ["CJS export object", "HTTP header", "SQL view", "CSS var"], 0),
  ]),
]);

const fsU = unit("fs-path", "fs & path", "fs & path", [
  lesson(
    "nf-path",
    "path module",
    "path module",
    2,
    false,
    [
      codeFill("nf-f1", "path join", "path join", "js", "path.___(__dirname, 'data.json')", ["join"], true),
      mcq("nf-f2", "path helps with:", "path helps with:", ["OS-safe file paths", "HTTP only", "CSS only", "git only"], 0),
      codeRead("nf-f3", "extname?", "extname?", "js", "path.extname('a.js')", ["'.js'", "'a'", "'js/'", "null"], 0),
    ],
  ),
  lesson(
    "nf-fs",
    "fs read/write intro",
    "fs read/write intro",
    2,
    false,
    [
      codeFill("nf-f4", "readFileSync", "readFileSync", "js", "fs.___('f.txt','utf8')", ["readFileSync"], true),
      codeFill("nf-f5", "writeFileSync", "writeFileSync", "js", "fs.___('o.txt', data)", ["writeFileSync"], true),
      mcq("nf-f6", "Sync vs async fs:", "Sync vs async fs:", ["sync blocks event loop", "sync never blocks", "async is sync", "fs is SQL"], 0),
    ],
  ),
  exam("nf-fs-exam", "Контрольна: fs/path", "Exam: fs/path", 2, [
    codeFill("nf-fe1", "join", "join", "js", "path.___(a,b)", ["join"], true),
    codeFill("nf-fe2", "readFileSync", "readFileSync", "js", "fs.___(p,'utf8')", ["readFileSync"], true),
    mcq("nf-fe3", "fs is for:", "fs is for:", ["filesystem I/O", "CSS parse", "DNS only", "GPU"], 0),
    codeFill("nf-fe4", "require fs", "require fs", "js", "const fs = require('___');", ["fs"], true),
  ]),
]);

const envU = unit("env", "Env & config", "Env & config", [
  lesson(
    "nf-env",
    "process.env",
    "process.env",
    2,
    false,
    [
      codeFill("nf-e1", "PORT", "PORT", "js", "const port = process.env.___ || 3000;", ["PORT"], true),
      mcq("nf-e2", "Secrets should go in:", "Secrets should go in:", ["env / secret store, not git", "public repo always", "client CSS", "README only"], 0),
      codeRead("nf-e3", "Missing env?", "Missing env?", "js", "process.env.FOO", ["undefined if unset", "throws always", "0", "null string always"], 0),
    ],
  ),
  lesson(
    "nf-dotenv",
    ".env pattern",
    ".env pattern",
    2,
    false,
    [
      mcq("nf-e4", ".env files:", ".env files:", ["local config not committed with secrets", "must commit passwords", "replace package.json", "disable node"], 0),
      matchEx("nf-e5", "Config", "Config", [
        { left: "NODE_ENV", right: "development/production" },
        { left: "PORT", right: "listen port" },
        { left: "DATABASE_URL", right: "DB connection" },
      ]),
    ],
  ),
  exam("nf-env-exam", "Контрольна: env", "Exam: env", 2, [
    codeFill("nf-ee1", "process.env", "process.env", "js", "process.___.PORT", ["env"], true),
    mcq("nf-ee2", "Don't commit:", "Don't commit:", ["secrets", "README", "public icons", "open source code always"], 0),
    codeFill("nf-ee3", "PORT default", "PORT default", "js", "Number(process.env.PORT || ___)", ["3000", "8080", "4000"], false),
    mcq("nf-ee4", "NODE_ENV often:", "NODE_ENV often:", ["production/development", "SQL mode", "CSS theme", "git branch only"], 0),
  ]),
]);

const httpU = unit("http", "http server", "http server", [
  lesson(
    "nf-http-create",
    "http.createServer",
    "http.createServer",
    2,
    false,
    [
      codeFill("nf-h1", "require http", "require http", "js", "const http = require('___');", ["http"], true),
      codeFill("nf-h2", "createServer", "createServer", "js", "http.___((req,res) => { … })", ["createServer"], true),
      codeOrder(
        "nf-h3",
        "Minimal server",
        "Minimal server",
        "js",
        [".listen(3000);", "const http = require('http');", "http.createServer((req,res) => { res.end('ok'); })"],
        ["const http = require('http');", "http.createServer((req,res) => { res.end('ok'); })", ".listen(3000);"],
      ),
    ],
  ),
  lesson(
    "nf-req-res",
    "req / res",
    "req / res",
    2,
    false,
    [
      mcq("nf-h4", "req.url is:", "req.url is:", ["request path/query", "response body", "SQL", "CSS"], 0),
      codeFill("nf-h5", "statusCode", "statusCode", "js", "res.___ = 200;", ["statusCode"], true),
      codeFill("nf-h6", "end body", "end body", "js", "res.___('hello');", ["end"], true),
    ],
  ),
  exam("nf-http-exam", "Контрольна: http", "Exam: http", 2, [
    codeFill("nf-he1", "http", "http", "js", "require('___')", ["http"], true),
    codeFill("nf-he2", "createServer", "createServer", "js", "http.___(handler)", ["createServer"], true),
    codeFill("nf-he3", "listen", "listen", "js", "server.___(3000)", ["listen"], true),
    mcq("nf-he4", "res.end:", "res.end:", ["finishes response", "starts server", "reads file", "parses JSON only"], 0),
  ]),
]);

const npmU = unit("npm", "npm & scripts", "npm & scripts", [
  lesson(
    "nf-package",
    "package.json",
    "package.json",
    2,
    false,
    [
      mcq("nf-n1", "package.json stores:", "package.json stores:", ["deps, scripts, metadata", "only CSS", "only SQL dumps", "only binaries"], 0),
      codeFill("nf-n2", "scripts start", "scripts start", "json", '"scripts": { "start": "node ___.js" }', ["index", "server", "app"], false),
      matchEx("nf-n3", "npm", "npm", [
        { left: "npm install", right: "install dependencies" },
        { left: "npm run build", right: "run script build" },
        { left: "package-lock.json", right: "lock versions" },
      ]),
    ],
  ),
  lesson(
    "nf-deps",
    "dependencies vs devDependencies",
    "dependencies vs devDependencies",
    2,
    false,
    [
      mcq("nf-n4", "devDependencies:", "devDependencies:", ["tooling not needed in prod runtime", "only production runtime always", "OS packages", "DNS"], 0),
      codeFill("nf-n5", "npm i -D", "npm i -D", "bash", "npm i -D ___", ["typescript", "vitest", "eslint"], false),
      mcq("nf-n6", "node_modules:", "node_modules:", ["installed packages tree", "source of truth in git always required", "SQL schema", "CSS"], 0),
    ],
  ),
  exam("nf-npm-exam", "Контрольна: npm", "Exam: npm", 2, [
    mcq("nf-ne1", "package.json:", "package.json:", ["project manifest", "SSL cert", "Dockerfile only", "favicon"], 0),
    codeFill("nf-ne2", "npm install", "npm install", "bash", "npm ___", ["install", "i"], false),
    mcq("nf-ne3", "scripts run via:", "scripts run via:", ["npm run <name>", "only node -e", "only git", "only curl"], 0),
    mcq("nf-ne4", "devDependency example:", "devDependency example:", ["test/linter tools", "production DB driver always only", "OS kernel", "browser"], 0),
  ]),
]);

const asyncU = unit("async-node", "Async in Node", "Async in Node", [
  lesson(
    "nf-event-loop",
    "Event loop idea",
    "Event loop idea",
    3,
    false,
    [
      mcq("nf-a1", "Node is largely:", "Node is largely:", ["single-threaded event loop + async I/O", "one thread per request always only", "GPU only", "batch mainframe only"], 0),
      mcq(
        "nf-a2",
        "Blocking sync I/O on big files:",
        "Blocking sync I/O:",
        ["can stall the loop", "never matters", "speeds HTTP always", "disables JS"],
        0,
      ),
      codeFill("nf-a3", "setTimeout", "setTimeout", "js", "___(() => {}, 0);", ["setTimeout"], true),
    ],
  ),
  lesson(
    "nf-promises",
    "Promises / async await",
    "Promises / async await",
    3,
    false,
    [
      codeFill("nf-a4", "async function", "async function", "js", "___ function main() {}", ["async"], true),
      codeFill("nf-a5", "await", "await", "js", "const data = ___ fs.promises.readFile(p);", ["await"], true),
      mcq("nf-a6", "Unhandled rejection:", "Unhandled rejection:", ["should be handled (catch)", "always fine", "compiles CSS", "restarts Docker always"], 0),
    ],
  ),
  exam("nf-async-exam", "Контрольна: async", "Exam: async", 3, [
    codeFill("nf-ae1", "async", "async", "js", "___ function f() {}", ["async"], true),
    codeFill("nf-ae2", "await", "await", "js", "const x = ___ p;", ["await"], true),
    mcq("nf-ae3", "Event loop:", "Event loop:", ["drives async callbacks", "SQL engine", "CSS parser", "git"], 0),
    mcq("nf-ae4", "Prefer async I/O for:", "Prefer async I/O for:", ["servers under load", "never", "only fonts", "only SVG"], 0),
  ]),
]);

const capstone = unit("capstone", "Capstone", "Capstone", [
  lesson(
    "nf-capstone-server",
    "Mini: tiny HTTP server",
    "Mini: tiny HTTP server",
    3,
    false,
    [
      {
        id: "nf-c1",
        type: "code_project",
        promptUk:
          "Node: require http, createServer, listen process.env.PORT||3000, package.json scripts.start. README: env.",
        promptEn:
          "Node: require http, createServer, listen process.env.PORT||3000, package.json scripts.start. README: env.",
        files: [
          {
            id: "js",
            name: "server.js",
            language: "javascript",
            starter: `// TODO: http.createServer + listen
`,
          },
          {
            id: "json",
            name: "package.json",
            language: "json",
            starter: `{
  "name": "mini-server",
  "scripts": {}
}
`,
          },
          {
            id: "md",
            name: "README.md",
            language: "markdown",
            starter: `# Server
<!-- env -->
`,
          },
        ],
        checks: [
          {
            fileId: "js",
            contains: ["http", "createServer", "listen", "PORT"],
          },
          { fileId: "json", contains: ["start", "node"] },
          { fileId: "md", contains: ["env"] },
        ],
      } as Exercise,
    ],
  ),
  exam("nf-cap-exam", "Фінальна контрольна Node", "Final Node exam", 3, [
    mcq("nf-ce1", "Node is:", "Node is:", ["JS runtime", "browser only", "SQL DB", "CSS lib"], 0),
    codeFill("nf-ce2", "require", "require", "js", "const fs = ___('fs');", ["require"], true),
    codeFill("nf-ce3", "createServer", "createServer", "js", "http.___(fn)", ["createServer"], true),
    codeFill("nf-ce4", "process.env", "process.env", "js", "process.___.PORT", ["env"], true),
    codeFill("nf-ce5", "async", "async", "js", "___ function main(){}", ["async"], true),
    mcq("nf-ce6", "package.json scripts:", "package.json scripts:", ["npm run commands", "SQL views", "SSL only", "DNS"], 0),
  ]),
]);

const eventsU = unit("events_streams", "Events & streams", "Events & streams", [
  lesson(
    "nf-events",
    "EventEmitter basics",
    "EventEmitter basics",
    3,
    false,
    [
      mcq(
        "nf-ev1",
        "EventEmitter is for:",
        "EventEmitter is for:",
        ["pub/sub style events", "only SQL", "only CSS", "only DNS"],
        0,
      ),
      codeFill(
        "nf-ev2",
        "on listener",
        "on listener",
        "js",
        "emitter.___('data', fn);",
        ["on"],
        true,
      ),
      codeFill(
        "nf-ev3",
        "emit",
        "emit",
        "js",
        "emitter.___('ready', payload);",
        ["emit"],
        true,
      ),
    ],
  ),
  lesson(
    "nf-streams",
    "Readable streams idea",
    "Readable streams idea",
    3,
    false,
    [
      mcq(
        "nf-ev4",
        "Streams help when:",
        "Streams help when:",
        ["data is large / chunked", "only tiny strings", "never files", "only JSON parse sync"],
        0,
      ),
      codeFill(
        "nf-ev5",
        "pipe",
        "pipe",
        "js",
        "readable.___(writable);",
        ["pipe"],
        true,
      ),
      mcq(
        "nf-ev6",
        "Backpressure means:",
        "Backpressure means:",
        ["slow consumer signals producer", "always drop data", "block DNS", "ban async"],
        0,
      ),
    ],
  ),
  exam("nf-events-exam", "Контрольна: events/streams", "Exam: events/streams", 3, [
    mcq("nf-eve1", "on registers:", "on registers:", ["listener", "SQL view", "SSL cert only", "CSS"], 0),
    codeFill("nf-eve2", "emit", "emit", "js", "e.___('x')", ["emit"], true),
    codeFill("nf-eve3", "pipe", "pipe", "js", "rs.___(ws)", ["pipe"], true),
    mcq("nf-eve4", "Streams are:", "Streams are:", ["chunk-oriented I/O", "only sync arrays", "DB engines", "fonts"], 0),
  ]),
]);

export const nodeFundamentalsContent: CourseContent = {
  slug: "node_fundamentals",
  titleUk: "Node.js: fundamentals",
  titleEn: "Node.js Fundamentals",
  descriptionUk:
    "Runtime, modules, fs/path, env, http server, npm, async, events/streams — deep track + контрольні.",
  descriptionEn:
    "Runtime, modules, fs/path, env, http server, npm, async, events/streams — deep track + unit exams.",
  icon: "🟢",
  color: "#339933",
  units: [runtime, modulesU, fsU, envU, httpU, npmU, asyncU, eventsU, capstone],
};
