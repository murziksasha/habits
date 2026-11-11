import type { CourseContent, Exercise } from "./types.js";
import {
  codeFill,
  codeOrder,
  codeOrderAuto,
  codeOutputMcq,
  codeProject,
  codeRead,
  exam,
  lesson,
  matchEx,
  mcq,
  unit,
  why,
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

const nodeResilienceScenarios = unit(
  "node_resilience_scenarios",
  "Scenario: стійкість процесів та обробка збоїв",
  "Scenario: Process Resilience & Failure Handling",
  [
    lesson(
      "node-scen-unhandled-rejection",
      "Обробка unhandledRejection та graceful shutdown",
      "Unhandled rejections & graceful shutdown",
      3,
      false,
      [
        codeRead(
          "nd-scen-1",
          "Чому необроблений проміс у сучасних версіях Node.js завершує процес аварійно?",
          "Why unhandledRejection terminates modern Node.js processes",
          "js",
          "process.on('unhandledRejection', (reason, promise) => {\n  console.error('Unhandled Rejection at:', promise, 'reason:', reason);\n  // Node.js за замовчуванням виходить з кодом 1\n});",
          [
            "Щоб уникнути роботи процесу в непередбачуваному та пошкодженому стані",
            "Це баг середовища Node.js",
            "Тому що пам'ять автоматично очищається",
            "Для збільшення швидкості обчислень",
          ],
          0,
        ),
        codeFill(
          "nd-scen-2",
          "Зупинка HTTP сервера та закриття сокетів перед виходом процесу",
          "Graceful shutdown: close server before process exit",
          "js",
          "process.on('SIGTERM', () => {\n  server.___(() => {\n    console.log('Server closed gracefully');\n    process.exit(0);\n  });\n});",
          ["close"],
          true,
        ),
        mcq(
          "nd-scen-3",
          "Який сигнал ОС надсилається контейнером Docker/Kubernetes для коректної зупинки процесу?",
          "Which OS signal is sent by Docker/Kubernetes to initiate graceful stop?",
          ["SIGTERM (після чого через grace period надсилається SIGKILL)", "SIGINT", "SIGHUP", "SIGSTOP"],
          0,
        ),
      ],
    ),
    lesson(
      "node-scen-stream-backpressure",
      "Запобігання переповненню пам'яті: Backpressure",
      "Memory safety: stream backpressure & pipeline",
      3,
      false,
      [
        codeRead(
          "nd-scen-4",
          "Чому пряме читання readable.on('data', chunk => res.write(chunk)) викликає витік пам'яті?",
          "Why manual data listener without backpressure leaks RAM",
          "js",
          "// Небезпечно при повільному клієнті:\nreadable.on('data', chunk => {\n  res.write(chunk); // буфер накопичується в пам'яті!\n});",
          [
            "Джерело читає файл швидше, ніж мережевий сокет клієнта встигає надсилати байти (відсутній backpressure)",
            "res.write() не вміє передавати бінарні байти",
            "readable streams закриваються автоматично",
            "Node.js не підтримує буфери більше 1 КБ",
          ],
          0,
        ),
        codeFill(
          "nd-scen-5",
          "Використання pipeline для автоматичного керування backpressure та помилками",
          "Use pipeline to safely stream with automatic backpressure",
          "js",
          "const { pipeline } = require('stream/promises');\nawait ___(fs.createReadStream('huge.csv'), res);",
          ["pipeline"],
          true,
        ),
      ],
    ),
    lesson(
      "node-scen-fs-error-handling",
      "Безпечні операції з файлами та таймаути",
      "Safe file I/O & timeout aborts",
      3,
      false,
      [
        codeRead(
          "nd-scen-6",
          "Патерн атомарного запису у файл для уникнення пошкодження даних при аварії",
          "Atomic file write pattern via temporary file & rename",
          "js",
          "// 1. Запис у тимчасовий файл -> 2. Атомарне перейменування\nawait fs.writeFile('config.json.tmp', data);\nawait fs.rename('config.json.tmp', 'config.json');",
          [
            "fs.rename на рівні файлової системи є атомарною операцією: читачі ніколи не побачать напівзаписаний файл",
            "rename копіює файл двічі",
            "writeFile блокує всі інші процеси ОС",
            "Це працює лише на Windows",
          ],
          0,
        ),
        codeFill(
          "nd-scen-7",
          "Перевірка коду системної помилки 'Файл не знайдено'",
          "Check system error code for File Not Found",
          "js",
          "try {\n  await fs.readFile(path);\n} catch (err) {\n  if (err.code === '___') { return null; }\n  throw err;\n}",
          ["ENOENT"],
          true,
        ),
      ],
    ),
    exam(
      "node-scen-exam",
      "Екзамен: стійкість Node.js",
      "Exam: Node resilience",
      3,
      [
        mcq(
          "nd-scen-8",
          "Чому використання синхронних методів (наприклад, fs.readFileSync) є небезпечним у серверних обробниках?",
          "Why are sync fs methods dangerous inside server request handlers?",
          [
            "Вони блокують Event Loop, заморожуючи обслуговування всіх одночасних запитів інших користувачів",
            "Синхронні методи видаляють вихідний файл",
            "Вони не працюють з форматом JSON",
            "Синхронний код заборонений компілятором V8",
          ],
          0,
        ),
        codeRead(
          "nd-scen-9",
          "Що виведе процес при виклику process.exit(1)?",
          "What happens when process.exit(1) is invoked?",
          "js",
          "process.exit(1);",
          [
            "Негайно завершує процес з кодом помилки 1 (сигнал операційній системі про збій)",
            "Перезапускає сервер",
            "Викидає виняток, який можна перехопити в try/catch",
            "Повертає статус 200 клієнту",
          ],
          0,
        ),
        codeFill(
          "nd-scen-10",
          "Глобальний об'єкт для роботи з буферами бінарних даних",
          "Global object for binary data buffers in Node.js",
          "js",
          "const buf = ___.from('hello world', 'utf8');",
          ["Buffer"],
          true,
        ),
        codeOrder(
          "nd-scen-11",
          "Черговість фаз Event Loop у Node.js",
          "Node.js Event Loop phases in order",
          "text",
          [
            "3. Poll (отримання нових I/O подій)",
            "1. Timers (setTimeout, setInterval)",
            "5. Close callbacks (socket.on('close'))",
            "2. Pending callbacks (системні I/O операції)",
            "4. Check (setImmediate)",
          ],
          [
            "1. Timers (setTimeout, setInterval)",
            "2. Pending callbacks (системні I/O операції)",
            "3. Poll (отримання нових I/O подій)",
            "4. Check (setImmediate)",
            "5. Close callbacks (socket.on('close'))",
          ],
          why(
            "libuv проходить фази циклічно: Timers → Pending → Poll (очікування I/O) → Check (setImmediate) → Close.",
            "libuv cycles through phases: Timers → Pending → Poll (I/O) → Check (setImmediate) → Close.",
          ),
        ),
      ],
    ),
  ],
);

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
  lesson(
    "nf-json-errors",
    "JSON & errors lite",
    "JSON & errors lite",
    2,
    true,
    [
      codeFill(
        "nf-je1",
        "JSON.parse",
        "JSON.parse",
        "js",
        "const obj = JSON.___('{\"a\":1}');",
        ["parse"],
        true,
      ),
      codeFill(
        "nf-je2",
        "JSON.stringify",
        "JSON.stringify",
        "js",
        "const s = JSON.___({ a: 1 });",
        ["stringify"],
        true,
      ),
      mcq(
        "nf-je3",
        "try/catch is for:",
        "try/catch is for:",
        ["sync thrown errors", "only CSS", "only SQL locks", "blocking the event loop forever"],
        0,
      ),
      codeFill(
        "nf-je4",
        "throw Error",
        "throw Error",
        "js",
        "___ new Error('boom');",
        ["throw"],
        true,
      ),
    ],
  ),
]);

const productionPatternsU = unit(
  "production_patterns",
  "Конфіг, скасування та сервісні патерни",
  "Config Validation, Cancellation & Service Reliability",
  [
    lesson(
      "nf-config-shutdown",
      "Fail-fast конфіг, AbortController та graceful shutdown",
      "Fail-fast config, AbortController & graceful shutdown",
      3,
      false,
      [
        mcq(
          "nf-prod-1",
          "Чому сервіс повинен валідувати `process.env` одразу при старті (fail-fast), а не в момент першого запиту?",
          "Why should a Node service validate `process.env` at startup (fail-fast) rather than on first request?",
          [
            "Щоб процес упав негайно при старті контейнера до перемикання трафіку, замість прихованих 500 на проді",
            "Щоб зменшити розмір node_modules",
            "Тому що Node.js забороняє читати process.env усередині функцій",
            "Щоб автоматично створювати базу даних",
          ],
          0,
          why(
            "Проблеми з відсутнім DATABASE_URL або AUTH_SECRET мають блокувати деплой під час старту.",
            "Missing secrets or ports should fail healthchecks before traffic reaches the instance.",
          ),
        ),
        codeOutputMcq(
          "nf-prod-2",
          "Передбачте поведінку: що станеться з fetch, коли спрацює AbortSignal.timeout(50)?",
          "Predict: what happens when `AbortSignal.timeout(50)` fires while `fetch` is still pending?",
          "js",
          "const res = await fetch(url, { signal: AbortSignal.timeout(50) });",
          [
            "Promise відхилиться з TimeoutError / AbortError і звільнить з'єднання",
            "fetch поверне порожній рядок зі статусом 200",
            "Node.js поставить процес на паузу на 50 секунд",
            "Таймер проігнорується, якщо сервер відповідає 500",
          ],
          0,
          why(
            "Таймаути через AbortSignal запобігають зависанню сокетів при повільному upstream.",
            "AbortSignal timeouts cancel pending I/O so slow upstreams do not exhaust sockets.",
          ),
        ),
        codeFill(
          "nf-prod-3",
          "Виправте збій: додайте перевірку структурованого JSON-логу та примусовий тайм-аут завершення при SIGTERM",
          "Repair the shutdown: add structured JSON log and unref'd safety timer on SIGTERM",
          "js",
          "const timer = setTimeout(() => process.exit(1), 5000);\ntimer.___();",
          ["unref"],
          true,
          why(
            "`timer.unref()` дозволяє процесу вийти раніше, якщо `server.close()` завершився успішно.",
            "`timer.unref()` lets Node exit cleanly as soon as `server.close()` finishes draining connections.",
          ),
        ),
      ],
    ),
    lesson(
      "nf-logs-blocking-tests",
      "Структуровані логи, CPU-робота та інтеграційні тести",
      "Structured logs, blocking CPU work & node:test",
      3,
      false,
      [
        codeRead(
          "nf-prod-4",
          "Чому важке синхронне хешування або парсинг 50 МБ JSON у роуті ламає сусідній `/health`?",
          "Why does heavy sync work inside a request handler stall unrelated `/health` probes?",
          "js",
          "app.get('/report', (req, res) => {\n  const out = heavySyncSort(millionRows);\n  res.json(out);\n});",
          [
            "Головний потік Event Loop один: поки синхронна функція крутиться, жоден інший запит чи таймер не обробляється",
            "Express блокує порт 4000 під час JSON.stringify",
            "healthcheck завжди чекає 30 секунд за стандартом HTTP",
            "V8 очищає всі сокети при масивах понад 1000 елементів",
          ],
          0,
          why(
            "CPU-інтенсивні задачі виносять у worker_threads, черги або окремі процеси.",
            "Offload CPU-heavy work to worker_threads or background queues so the event loop stays responsive.",
          ),
        ),
        codeFill(
          "nf-prod-5",
          "Створіть структурований JSON-рядок логу з рівнем, подією та `requestId`",
          "Emit a structured JSON log line with level, msg, and requestId",
          "js",
          "console.log(JSON.___({ level: 'info', msg: 'ready', requestId }));",
          ["stringify"],
          true,
          why(
            "Однорядковий JSON спрощує пошук за `requestId` у системах агрегації логів.",
            "Single-line JSON enables filtering by `requestId` across log collectors.",
          ),
        ),
        codeProject(
          "nf-prod-6",
          "Напишіть міні-сервіс Node із fail-fast перевіркою `PORT`, `AbortSignal.timeout` та тестом на `node:test`.",
          "Build a predictable Node service helper with fail-fast `PORT` validation, timeout signal, and `node:test` verification.",
          [
            {
              id: "js",
              name: "service.js",
              language: "javascript",
              starter: `export function readConfig(env) {
  // TODO: validate PORT (1..65535) or throw
  return { port: 3000 };
}
`,
            },
            {
              id: "test",
              name: "service.test.js",
              language: "javascript",
              starter: `import test from 'node:test';
import assert from 'node:assert/strict';
import { readConfig } from './service.js';

// TODO: test valid and invalid PORT
`,
            },
          ],
          [
            { fileId: "js", contains: ["readConfig", "throw", "Number"] },
            { fileId: "test", contains: ["test(", "assert", "throws"] },
          ],
          {
            hintUk: "Перевірте Number.isInteger(port) && port >= 1 && port <= 65535; у тесті використайте assert.throws.",
            hintEn: "Validate Number.isInteger(port) && port >= 1 && port <= 65535; assert failure with assert.throws.",
          },
        ),
      ],
    ),
    exam("nf-prod-exam", "Контрольна: надійний Node-сервіс", "Exam: production Node service", 3, [
      mcq(
        "nf-pe1",
        "Коли варто валідувати обов'язкові змінні середовища?",
        "When should required environment variables be validated?",
        [
          "Одразу при старті процесу до прослуховування порту",
          "Тільки при отриманні POST /login",
          "У браузерному localStorage",
          "Після першого SIGKILL",
        ],
        0,
        why("Ранній збій не дозволяє несправному інстансу приймати трафік.", "Early validation keeps broken replicas out of rotation."),
      ),
      codeFill(
        "nf-pe2",
        "Таймаут скасування зовнішнього запиту",
        "Timeout cancellation for outbound fetch",
        "js",
        "fetch(url, { signal: AbortSignal.___(2000) });",
        ["timeout"],
        true,
        why("AbortSignal.timeout створює сигнал автоскасування.", "AbortSignal.timeout aborts slow requests cleanly."),
      ),
      codeRead(
        "nf-pe3",
        "Що поверне `readConfig({ PORT: 'abc' })` при строгій валідації?",
        "What does strict config validation do when `PORT='abc'`?",
        "js",
        "const port = Number(env.PORT);\nif (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('invalid_port');",
        [
          "Викине помилку `invalid_port` одразу при старті",
          "Тихо підставить порт 80",
          "Сконвертує 'abc' у 3000",
          "Поверне undefined без виключення",
        ],
        0,
        why("Невалідна конфігурація має зупиняти запуск явно.", "Invalid config must fail explicitly rather than falling back silently."),
      ),
      codeOrderAuto(
        "nf-pe4",
        "Порядок безпечного завершення Node HTTP-сервісу",
        "Order of graceful Node HTTP shutdown",
        "text",
        [
          "1. Отримати SIGTERM і позначити /ready як not-ready",
          "2. Викликати server.close(), щоб перестати приймати нові з'єднання",
          "3. Закрити пул БД та ресурси після завершення активних запитів",
          "4. Вийти з кодом 0 (або 1 по timeout.unref() запобіжнику)",
        ],
        why(
          "Спочатку знімаємо навантаження та закриваємо сервер, потім звільняємо пули БД.",
          "Stop accepting new traffic first, finish active requests, then close DB pools.",
        ),
      ),
    ]),
  ],
);

export const nodeFundamentalsContent: CourseContent = {
  slug: "node_fundamentals",
  titleUk: "Node.js: fundamentals",
  titleEn: "Node.js Fundamentals",
  descriptionUk:
    "Runtime, modules, fs/path, env, http server, npm, async, events/streams, стійкість процесів та надійні сервіси — deep track + контрольні.",
  descriptionEn:
    "Runtime, modules, fs/path, env, http server, npm, async, events/streams, process resilience, and service reliability — deep track + unit exams.",
  icon: "🟢",
  color: "#339933",
  units: [
    runtime,
    modulesU,
    fsU,
    envU,
    httpU,
    npmU,
    asyncU,
    eventsU,
    nodeResilienceScenarios,
    productionPatternsU,
    capstone,
  ],
};
