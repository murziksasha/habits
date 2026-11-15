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

const intro = unit("intro", "Express intro", "Express intro", [
  lesson(
    "ef-what",
    "Що таке Express",
    "What is Express",
    1,
    true,
    [
      mcq(
        "ef-i1",
        "Express — це:",
        "Express is:",
        ["мінімальний web-фреймворк для Node.js", "SQL database", "CSS preprocessor", "browser engine"],
        0,
      ),
      mcq(
        "ef-i2",
        "Express типово використовують для:",
        "Express is typically used for:",
        ["HTTP APIs і web servers", "only GPU shaders", "only Excel macros", "only mobile UI kits"],
        0,
      ),
      codeFill("ef-i3", "require express", "require express", "js", "const express = require('___');", ["express"], true),
    ],
  ),
  lesson(
    "ef-install",
    "Install & import",
    "Install & import",
    1,
    true,
    [
      codeFill("ef-i4", "npm install", "npm install", "bash", "npm i ___", ["express"], true),
      mcq("ef-i5", "ESM import Express:", "ESM import Express:", ["import express from 'express'", "import css from 'sql'", "require('html') only", "import React only"], 0),
      matchEx("ef-i6", "Stack", "Stack", [
        { left: "Node.js", right: "runtime" },
        { left: "Express", right: "HTTP framework" },
        { left: "npm", right: "package manager" },
      ]),
    ],
  ),
  exam("ef-intro-exam", "Контрольна: intro", "Exam: intro", 1, [
    mcq("ef-ie1", "Express runs on:", "Express runs on:", ["Node.js", "only browser", "only SQL", "only CSS"], 0),
    codeFill("ef-ie2", "require", "require", "js", "const express = require('___');", ["express"], true),
    codeFill("ef-ie3", "npm i", "npm i", "bash", "npm i ___", ["express"], true),
    mcq("ef-ie4", "Express is for:", "Express is for:", ["HTTP servers/APIs", "only fonts", "only git", "only Redis keys"], 0),
  ]),
]);

const appBasics = unit("app-basics", "App basics", "App basics", [
  lesson(
    "ef-create-app",
    "express() + listen",
    "express() + listen",
    2,
    false,
    [
      codeFill("ef-a1", "create app", "create app", "js", "const app = ___();", ["express"], true),
      codeFill("ef-a2", "listen", "listen", "js", "app.___(3000);", ["listen"], true),
      codeOrder(
        "ef-a3",
        "Minimal boot",
        "Minimal boot",
        "js",
        ["app.listen(3000);", "const express = require('express');", "const app = express();"],
        ["const express = require('express');", "const app = express();", "app.listen(3000);"],
      ),
    ],
  ),
  lesson(
    "ef-first-route",
    "First GET route",
    "First GET route",
    2,
    false,
    [
      codeFill("ef-a4", "app.get", "app.get", "js", "app.___('/', (req, res) => res.send('ok'));", ["get"], true),
      codeFill("ef-a5", "res.send", "res.send", "js", "res.___('hello');", ["send"], true),
      mcq("ef-a6", "app.get('/', …) handles:", "app.get('/', …) handles:", ["GET /", "POST only", "WebSocket only", "SQL SELECT only"], 0),
    ],
  ),
  exam("ef-app-exam", "Контрольна: app", "Exam: app", 2, [
    codeFill("ef-ae1", "express()", "express()", "js", "const app = ___();", ["express"], true),
    codeFill("ef-ae2", "listen", "listen", "js", "app.___(3000)", ["listen"], true),
    codeFill("ef-ae3", "get", "get", "js", "app.___('/health', handler)", ["get"], true),
    mcq("ef-ae4", "res.send:", "res.send:", ["sends response body", "starts npm", "creates DB", "parses CSS"], 0),
  ]),
]);

const routesU = unit("routes", "Routes", "Routes", [
  lesson(
    "ef-methods",
    "HTTP methods on app",
    "HTTP methods on app",
    2,
    false,
    [
      codeFill("ef-r1", "post", "post", "js", "app.___('/users', handler);", ["post"], true),
      codeFill("ef-r2", "put", "put", "js", "app.___('/users/:id', handler);", ["put"], true),
      matchEx("ef-r3", "Methods", "Methods", [
        { left: "GET", right: "read" },
        { left: "POST", right: "create" },
        { left: "DELETE", right: "remove" },
      ]),
    ],
  ),
  lesson(
    "ef-params-query",
    "params & query",
    "params & query",
    2,
    false,
    [
      codeFill("ef-r4", "params", "params", "js", "const id = req.___.id;", ["params"], true),
      codeFill("ef-r5", "query", "query", "js", "const page = req.___.page;", ["query"], true),
      codeRead("ef-r6", "Route param?", "Route param?", "js", "app.get('/u/:id', (req,res)=>res.json(req.params))", ["req.params.id from URL", "always body JSON", "CSS selector", "git ref only"], 0),
    ],
  ),
  exam("ef-routes-exam", "Контрольна: routes", "Exam: routes", 2, [
    codeFill("ef-re1", "post", "post", "js", "app.___('/items', h)", ["post"], true),
    codeFill("ef-re2", "params", "params", "js", "req.___.id", ["params"], true),
    codeFill("ef-re3", "query", "query", "js", "req.___.q", ["query"], true),
    mcq("ef-re4", "DELETE typically:", "DELETE typically:", ["removes a resource", "only CSS reset", "only npm install", "only git clone"], 0),
  ]),
]);

const middlewareU = unit("middleware", "Middleware", "Middleware", [
  lesson(
    "ef-use-next",
    "app.use & next()",
    "app.use & next()",
    2,
    false,
    [
      codeFill("ef-m1", "use", "use", "js", "app.___((req, res, next) => { next(); });", ["use"], true),
      mcq("ef-m2", "next() means:", "next() means:", ["pass control to next middleware/route", "stop Node process", "open SQL only", "clear CSS"], 0),
      codeOrder(
        "ef-m3",
        "Middleware then route",
        "Middleware then route",
        "js",
        ["app.get('/', (req,res)=>res.send('ok'));", "app.use(logger);", "const app = express();"],
        ["const app = express();", "app.use(logger);", "app.get('/', (req,res)=>res.send('ok'));"],
      ),
    ],
  ),
  lesson(
    "ef-json-static",
    "express.json & static",
    "express.json & static",
    2,
    false,
    [
      codeFill("ef-m4", "json parser", "json parser", "js", "app.use(express.___());", ["json"], true),
      codeFill("ef-m5", "static", "static", "js", "app.use(express.___('public'));", ["static"], true),
      codeRead("ef-m6", "json() purpose?", "json() purpose?", "js", "app.use(express.json());", ["parse JSON request body", "compile TypeScript", "run Redis", "format CSS"], 0),
    ],
  ),
  exam("ef-mw-exam", "Контрольна: middleware", "Exam: middleware", 2, [
    codeFill("ef-me1", "use", "use", "js", "app.___(fn)", ["use"], true),
    codeFill("ef-me2", "json", "json", "js", "express.___()", ["json"], true),
    mcq("ef-me3", "Middleware next():", "Middleware next():", ["continue chain", "kill server always", "drop DB", "git push"], 0),
    codeFill("ef-me4", "static", "static", "js", "express.___('public')", ["static"], true),
  ]),
]);

const restU = unit("rest", "REST responses", "REST responses", [
  lesson(
    "ef-status-json",
    "status + json",
    "status + json",
    2,
    false,
    [
      codeFill("ef-s1", "status", "status", "js", "res.___(201).json({ ok: true });", ["status"], true),
      codeFill("ef-s2", "json body", "json body", "js", "res.status(200).___({ users });", ["json"], true),
      mcq("ef-s3", "HTTP 404 means:", "HTTP 404 means:", ["not found", "created", "server error only", "redirect always"], 0),
    ],
  ),
  lesson(
    "ef-rest-paths",
    "RESTful paths",
    "RESTful paths",
    2,
    false,
    [
      mcq("ef-s4", "Users collection path:", "Users collection path:", ["/users", "/getUsers.php", "/do-user", "/api_user_list only"], 0),
      matchEx("ef-s5", "Status codes", "Status codes", [
        { left: "200", right: "OK" },
        { left: "201", right: "Created" },
        { left: "500", right: "Server error" },
      ]),
      codeFill("ef-s6", "created status", "created status", "js", "res.status(___).json(item);", ["201", "200"], false),
    ],
  ),
  exam("ef-rest-exam", "Контрольна: REST", "Exam: REST", 2, [
    codeFill("ef-se1", "status", "status", "js", "res.___(404)", ["status"], true),
    codeFill("ef-se2", "json", "json", "js", "res.___({ error: 'x' })", ["json"], true),
    mcq("ef-se3", "201 often for:", "201 often for:", ["successful create", "only delete", "only CSS", "only git merge"], 0),
    mcq("ef-se4", "REST resource path:", "REST resource path:", ["/items/:id", "/getItemById always required name", "/sql", "/css"], 0),
  ]),
]);

const errorsU = unit("errors", "Error handling", "Error handling", [
  lesson(
    "ef-error-mw",
    "Error middleware",
    "Error middleware",
    3,
    false,
    [
      mcq(
        "ef-e1",
        "Error middleware arity in Express:",
        "Error middleware arity in Express:",
        ["4 (err, req, res, next)", "1", "2 only", "0"],
        0,
      ),
      codeFill("ef-e2", "500", "500", "js", "res.status(___).json({ error: 'internal' });", ["500"], true),
      codeRead("ef-e3", "next(err)?", "next(err)?", "js", "catch (e) { next(e); }", ["forward to error middleware", "ignore always", "git commit", "CSS inject"], 0),
    ],
  ),
  lesson(
    "ef-try-catch",
    "try/catch in handlers",
    "try/catch in handlers",
    3,
    false,
    [
      mcq("ef-e4", "Unhandled throw in async route:", "Unhandled throw in async route:", ["should be caught / next(err)", "always fine forever", "auto CSS fix", "restarts Docker always"], 0),
      codeFill("ef-e5", "next err", "next err", "js", "next(___);", ["err", "e", "error"], false),
      matchEx("ef-e6", "Layers", "Layers", [
        { left: "Route", right: "HTTP entry" },
        { left: "Error mw", right: "centralized failures" },
        { left: "JSON body", right: "req.body after parser" },
      ]),
    ],
  ),
  exam("ef-err-exam", "Контрольна: errors", "Exam: errors", 3, [
    mcq("ef-ee1", "Error mw has:", "Error mw has:", ["4 arguments", "0 arguments", "only CSS", "only SQL"], 0),
    codeFill("ef-ee2", "500", "500", "js", "res.status(___)", ["500"], true),
    codeFill("ef-ee3", "next", "next", "js", "___ (err)", ["next"], true),
    mcq("ef-ee4", "next(err):", "next(err):", ["passes to error handler", "installs npm", "clones git", "parses HTML only"], 0),
  ]),
]);

const routersU = unit("routers", "Routers", "Routers", [
  lesson(
    "ef-router",
    "express.Router",
    "express.Router",
    3,
    false,
    [
      codeFill("ef-o1", "Router", "Router", "js", "const r = express.___();", ["Router"], true),
      codeFill("ef-o2", "mount", "mount", "js", "app.use('/api', ___);", ["router", "r", "usersRouter"], false),
      mcq("ef-o3", "Routers help with:", "Routers help with:", ["modular route groups", "only CSS modules", "only SQL dumps", "only fonts"], 0),
    ],
  ),
  lesson(
    "ef-mount-prefix",
    "Mount prefixes",
    "Mount prefixes",
    3,
    false,
    [
      codeRead(
        "ef-o4",
        "Mount effect?",
        "Mount effect?",
        "js",
        "app.use('/api', router); router.get('/health', …)",
        ["handles GET /api/health", "handles only GET /health at root", "disables Express", "runs git"],
        0,
      ),
      matchEx("ef-o5", "Organization", "Organization", [
        { left: "app.js", right: "compose mounts" },
        { left: "routes/users.js", right: "user Router" },
        { left: "middleware/", right: "shared mw" },
      ]),
      codeFill("ef-o6", "router get", "router get", "js", "router.___('/', handler);", ["get"], true),
    ],
  ),
  exam("ef-router-exam", "Контрольна: routers", "Exam: routers", 3, [
    codeFill("ef-oe1", "Router", "Router", "js", "express.___()", ["Router"], true),
    codeFill("ef-oe2", "use mount", "use mount", "js", "app.___('/api', router)", ["use"], true),
    mcq("ef-oe3", "Router is:", "Router is:", ["mini app for routes", "SQL client", "CSS engine", "git tool"], 0),
    codeFill("ef-oe4", "router.get", "router.get", "js", "router.___('/x', h)", ["get"], true),
  ]),
]);

const jsonBody = unit("json-body", "JSON body", "JSON body", [
  lesson(
    "ef-json-mw",
    "express.json middleware",
    "express.json middleware",
    2,
    true,
    [
      codeFill(
        "ef-jb1",
        "json mw",
        "json mw",
        "js",
        "app.use(express.___());",
        ["json"],
        true,
      ),
      mcq(
        "ef-jb2",
        "express.json() parses:",
        "express.json() parses:",
        ["JSON request bodies into req.body", "only cookies", "only query strings", "HTML templates"],
        0,
      ),
      codeFill(
        "ef-jb3",
        "read body field",
        "read body field",
        "js",
        "const name = req.___.name;",
        ["body"],
        true,
      ),
      mcq(
        "ef-jb4",
        "Content-Type for JSON APIs:",
        "Content-Type for JSON APIs:",
        ["application/json", "text/css", "image/png", "multipart only always"],
        0,
      ),
    ],
  ),
  lesson(
    "ef-post-create",
    "POST create pattern",
    "POST create pattern",
    2,
    true,
    [
      codeFill(
        "ef-jb5",
        "app.post",
        "app.post",
        "js",
        "app.___('/users', handler);",
        ["post"],
        true,
      ),
      mcq(
        "ef-jb6",
        "Typical success status for create:",
        "Typical success status for create:",
        ["201 Created", "404", "301 only", "500 always"],
        0,
      ),
      codeFill(
        "ef-jb7",
        "status json",
        "status json",
        "js",
        "res.___(201).json(user);",
        ["status"],
        true,
      ),
      mcq(
        "ef-jb8",
        "Validate body before DB write:",
        "Validate body before DB write:",
        ["yes — reject bad input early", "never validate", "only on GET", "only in CSS"],
        0,
      ),
    ],
  ),
  exam("ef-json-exam", "Контрольна: JSON body", "Exam: JSON body", 2, [
    mcq("ef-je1", "express.json parses:", "express.json parses:", ["JSON body", "only CSS", "images", "DNS"], 0),
    codeFill("ef-je2", "json mw", "json mw", "js", "app.use(express.___())", ["json"], true),
    codeFill("ef-je3", "body field", "body field", "js", "req.___.email", ["body"], true),
    codeFill("ef-je4", "post route", "post route", "js", "app.___('/x', h)", ["post"], true),
    mcq("ef-je5", "Create status often:", "Create status often:", ["201", "404", "301", "100"], 0),
    codeFill("ef-je6", "status", "status", "js", "res.___(201).json(x)", ["status"], true),
  ]),
]);

const expressResilienceScenarios = unit(
  "express_resilience_scenarios",
  "Scenario: валідація даних та обробка збоїв",
  "Scenario: Validation Middleware & Failure Handling",
  [
    lesson(
      "exp-scen-validation-middleware",
      "Middleware валідації схеми запиту",
      "Schema validation middleware & 400 Bad Request",
      3,
      false,
      [
        codeRead(
          "ex-scen-1",
          "Паттерн валідації тіла запиту перед викликом контролера",
          "Body validation interceptor pattern",
          "js",
          "function validateBody(schema) {\n  return (req, res, next) => {\n    const result = schema.safeParse(req.body);\n    if (!result.success) {\n      return res.status(400).json({ error: 'invalid_payload', issues: result.error.issues });\n    }\n    req.validatedBody = result.data;\n    next();\n  };\n}",
          [
            "Валідує дані до входу в контролер; якщо схема невалідна — повертає 400 і перериває ланцюжок",
            "Завжди пропускає запит далі",
            "Працює лише для GET запитів",
            "Видаляє дані з бази",
          ],
          0,
        ),
        codeFill(
          "ex-scen-2",
          "Встановлення HTTP-статусу 400 Bad Request",
          "Send 400 Bad Request status response",
          "js",
          "return res.___(400).json({ error: 'validation_failed' });",
          ["status"],
          true,
        ),
        mcq(
          "ex-scen-3",
          "Чому важливо повертати return res.status(400)... у middleware?",
          "Why is return res.status(400)... necessary in middleware?",
          [
            "Щоб запобігти продовженню виконання коду функції та повторному виклику next() або іншої відповіді (ERR_HTTP_HEADERS_SENT)",
            "Тому що без return Express автоматично падає",
            "Для очищення cookie",
            "Це вимога стандарту ES6",
          ],
          0,
        ),
      ],
    ),
    lesson(
      "exp-scen-async-error-forwarding",
      "Перехоплення помилок в асинхронних роутах",
      "Async route error forwarding & next(err)",
      3,
      false,
      [
        codeRead(
          "ex-scen-4",
          "Чому необроблена асинхронна помилка в Express 4 'вішає' клієнтське з'єднання?",
          "Why unhandled async throw in Express 4 hangs connection",
          "js",
          "app.get('/users/:id', async (req, res, next) => {\n  // Якщо DB падає, без try/catch помилка промісу не дійде до Express middleware!\n  const user = await db.findUser(req.params.id);\n  res.json(user);\n});",
          [
            "Express 4 не перехоплює відхилені Promise автоматично; потрібен try/catch з next(err) або обгортка express-async-errors",
            "DB автоматично відправляє 500 клієнту",
            "Express закриває сервер",
            "Параметр req.params не підтримує async",
          ],
          0,
        ),
        codeFill(
          "ex-scen-5",
          "Передача спійманої помилки у централізований обробник Express",
          "Pass caught error to centralized Express handler",
          "js",
          "try {\n  await process();\n} catch (err) {\n  ___(err);\n}",
          ["next"],
          true,
        ),
      ],
    ),
    lesson(
      "exp-scen-centralized-error-handler",
      "Централізований обробник помилок (4 аргументи)",
      "Centralized 4-argument error handler",
      3,
      false,
      [
        codeRead(
          "ex-scen-6",
          "Централізований обробник помилок Express: 4 параметри (err, req, res, next)",
          "Centralized error handling middleware with 4 parameters",
          "js",
          "app.use((err, req, res, next) => {\n  const status = err.status || 500;\n  const message = status === 500 ? 'Internal Server Error' : err.message;\n  res.status(status).json({ error: err.code || 'server_error', message });\n});",
          [
            "Express розпізнає middleware як обробник помилок лише за наявності рівно 4 параметрів у сигнатурі функції",
            "4 параметри використовуються лише для логування",
            "err завжди має бути рядком",
            "next не потрібен у коді",
          ],
          0,
        ),
        codeFill(
          "ex-scen-7",
          "Приховування стек-трейсу в продакшні для безпеки",
          "Hide stack trace in production environment",
          "js",
          "const response = { error: err.message };\nif (process.env.NODE_ENV !== '___') {\n  response.stack = err.stack;\n}",
          ["production"],
          true,
        ),
      ],
    ),
    exam(
      "exp-scen-exam",
      "Екзамен: валідація та збої в Express",
      "Exam: validation & error resilience",
      3,
      [
        mcq(
          "ex-scen-8",
          "Що означає помилка Node.js: 'Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client'?",
          "What does 'ERR_HTTP_HEADERS_SENT' mean in Express?",
          [
            "Код спробував надіслати відповідь (res.send/res.json) більше одного разу для одного HTTP-запиту",
            "Браузер заблокував CORS",
            "Заголовки містять некоректні символи",
            "Порт сервера зайнятий іншим процесом",
          ],
          0,
        ),
        codeRead(
          "ex-scen-9",
          "Де в ланцюжку middleware повинен розташовуватися обробник 404 Not Found?",
          "Where should 404 Not Found middleware be placed?",
          "js",
          "// Після всіх робочих маршрутів, але перед обробником помилок:\napp.use((req, res, next) => {\n  res.status(404).json({ error: 'not_found' });\n});",
          [
            "Наприкінці, після всіх реальних ендпоінтів",
            "На самому початку перед app.use(express.json())",
            "Всередині кожного роута",
            "Не має значення",
          ],
          0,
        ),
        codeFill(
          "ex-scen-10",
          "Парсер тіла JSON запитів у вбудованому Express",
          "Built-in Express middleware for parsing incoming JSON bodies",
          "js",
          "app.use(express.___());",
          ["json"],
          true,
        ),
        codeOrder(
          "ex-scen-11",
          "Порядок виконання Express middleware для безпечного маршруту",
          "Express middleware execution order for secure route",
          "text",
          [
            "3. validateBody(schema) (валідація схеми даних)",
            "1. app.use(express.json()) (парсинг тіла)",
            "5. errorHandler (4 параметри — перехоплення збоїв)",
            "2. authMiddleware (перевірка сесії / токена)",
            "4. routeHandler (бізнес-логіка та збереження в БД)",
          ],
          [
            "1. app.use(express.json()) (парсинг тіла)",
            "2. authMiddleware (перевірка сесії / токена)",
            "3. validateBody(schema) (валідація схеми даних)",
            "4. routeHandler (бізнес-логіка та збереження в БД)",
            "5. errorHandler (4 параметри — перехоплення збоїв)",
          ],
          why(
            "Спочатку парсинг і аутентифікація, потім валідація тіла, далі контролер і централізований обробник помилок наприкінці.",
            "Parse JSON and verify auth first, validate inputs next, run handler, and keep the 4-arg error middleware last.",
          ),
        ),
      ],
    ),
  ],
);

const apiContractsAuthz = unit(
  "api_contracts_authz",
  "Валідований CRUD, пагінація та auth vs authz",
  "Validated CRUD, Pagination & Auth vs Ownership",
  [
    lesson(
      "ef-auth-vs-authz",
      "Аутентифікація (401) проти авторизації / ownership (403)",
      "Authentication (401) vs authorization & ownership (403)",
      3,
      false,
      [
        mcq(
          "ef-ca1",
          "Користувач увійшов у систему як `user-b`, але намагається змінити задачу, власником якої є `user-a`. Який HTTP статус коректний?",
          "User `user-b` is logged in and tries to patch a task owned by `user-a`. Which HTTP status fits best?",
          [
            "403 Forbidden (`{ error: 'forbidden' }`)",
            "401 Unauthorized (потрібен ще один логін)",
            "200 OK із порожнім тілом",
            "500 Internal Server Error",
          ],
          0,
          why(
            "401 означає відсутню/невалідну аутентифікацію; 403 — особа відома, але доступу до ресурсу немає.",
            "401 means missing/invalid credentials; 403 means authenticated user lacks permission on that resource.",
          ),
        ),
        codeRead(
          "ef-ca2",
          "Знайдіть вразливість (IDOR) у цьому Express-обробнику:",
          "Diagnose the broken ownership check (IDOR) in this Express handler:",
          "js",
          "app.delete('/tasks/:id', requireAuth, async (req, res) => {\n  const deleted = await repo.deleteById(req.params.id);\n  if (!deleted) return res.status(404).json({ error: 'not_found' });\n  res.json({ ok: true });\n});",
          [
            "Перевірено лише факт логіну (`requireAuth`), але не перевірено `task.ownerId === req.user.id` перед видаленням",
            "Метод app.delete не підтримує async",
            "Слід повернути статус 201 замість 200",
            "req.params.id завжди є числом",
          ],
          0,
          why(
            "Авторизація потребує перевірки власника або ролі для конкретного ресурсу.",
            "Authorization requires checking resource ownership (`ownerId === req.user.id`) or explicit role.",
          ),
        ),
        codeFill(
          "ef-ca3",
          "Виправте ендпоінт: додайте перевірку власника та стабільний код помилки",
          "Repair the endpoint: enforce owner check and return a stable error code",
          "js",
          "if (task.ownerId !== req.user.id) {\n  return res.status(___).json({ error: 'forbidden' });\n}",
          ["403"],
          true,
          why("Чужий ресурс не можна змінювати — повертаємо 403 forbidden.", "Block cross-user mutation with 403 forbidden."),
        ),
      ],
    ),
    lesson(
      "ef-pagination-contracts",
      "Пагінація, фільтри та стабільні контракти помилок",
      "Pagination, filtering & consistent API error contracts",
      3,
      false,
      [
        codeOutputMcq(
          "ef-ca4",
          "Передбачте результат: клієнт передав `?limit=500&offset=-10` у clamp-функцію. Що поверне вираз?",
          "Predict what `clampPagination('500', '-10')` returns:",
          "js",
          "function clampPagination(rawLimit, rawOffset) {\n  const limit = Math.min(50, Math.max(1, Number(rawLimit) || 20));\n  const offset = Math.max(0, Number(rawOffset) || 0);\n  return { limit, offset };\n}\nconsole.log(JSON.stringify(clampPagination('500', '-10')));",
          ['{"limit":50,"offset":0}', '{"limit":500,"offset":0}', '{"limit":20,"offset":-10}', '{"limit":50,"offset":-10}'],
          0,
          why(
            "Обмеження максимуму (50) захищає БД від вичитування мільйона рядків за запит, а `Math.max(0, ...)` прибирає від'ємний offset.",
            "Clamping `limit <= 50` protects memory/DB and `Math.max(0, offset)` prevents invalid negative offsets.",
          ),
        ),
        mcq(
          "ef-ca5",
          "Чому для API контрактів використовують стабільні коди помилок `{ \"error\": \"invalid_input\" }` замість вільних речень англійською?",
          "Why use stable `snake_case` error codes like `{ \"error\": \"invalid_input\" }` instead of prose strings as the contract?",
          [
            "Клієнт і тести можуть надійно розпізнавати помилку та показувати локалізоване (UK/EN) повідомлення, не ламаючись від зміни тексту",
            "JSON забороняє пробіли у значеннях",
            "Express автоматично перекладає snake_case на українську",
            "Це потрібно лише для HTML-форм",
          ],
          0,
          why(
            "Машинозчитувані коди дозволяють безпечно локалізувати UI та писати стабільні тести.",
            "Machine-readable codes keep client handling and automated tests decoupled from UI copy changes.",
          ),
        ),
        codeProject(
          "ef-ca6",
          "Зберіть контракт списку задач з пагінацією, `sortOrder` та єдиним error envelope.",
          "Implement paginated `/tasks` query validation and consistent error contract in Express.",
          [
            {
              id: "js",
              name: "tasks-route.js",
              language: "javascript",
              starter: `// TODO: validate limit/offset, check req.user, return { items, total, limit, offset }
export function listTasksHandler(repo) {
  return async (req, res, next) => {
    try {
      res.json({ items: [] });
    } catch (err) {
      next(err);
    }
  };
}
`,
            },
          ],
          [
            { fileId: "js", contains: ["req.user", "401", "Math.min", "offset", "next(err)"] },
          ],
          {
            hintUk: "Перевірте `if (!req.user) return res.status(401).json({ error: 'unauthorized' })`, обмежте `limit` і передайте в `repo.list`.",
            hintEn: "Guard `if (!req.user) return res.status(401).json({ error: 'unauthorized' })`, clamp `limit`, and query `repo.list`.",
          },
        ),
      ],
    ),
    exam("ef-contracts-exam", "Контрольна: API контракти та доступ", "Exam: API contracts & authorization", 3, [
      mcq(
        "ef-cae1",
        "Яка різниця між `401` та `403`?",
        "What distinguishes `401` from `403`?",
        [
          "401 — не аутентифіковано; 403 — аутентифіковано, але заборонено доступ до ресурсу",
          "401 — помилка БД; 403 — відсутній маршрут",
          "Це повні синоніми",
          "403 повертається лише при невалідному JSON",
        ],
        0,
        why("Розрізнення auth vs authz запобігає незрозумілим редиректам на логін при чужому ресурсі.", "Separating 401 vs 403 lets clients prompt login vs show access denied."),
      ),
      codeFill(
        "ef-cae2",
        "Передача асинхронної помилки у централізований Express error handler",
        "Forward async error to Express error handler",
        "js",
        "try { await save(); } catch (err) { ___(err); }",
        ["next"],
        true,
        why("Без `next(err)` Express 4 не потрапить у error middleware.", "Express 4 requires `next(err)` for async errors."),
      ),
      codeRead(
        "ef-cae3",
        "Який ризик несе пагінація без стабільного tie-breaker у `ORDER BY created_at DESC`?",
        "What bug occurs when paginating with `ORDER BY created_at DESC` without a unique tie-breaker?",
        "sql",
        "SELECT id, title FROM tasks ORDER BY created_at DESC LIMIT 10 OFFSET 10;",
        [
          "Рядки з однаковим `created_at` можуть дублюватися або пропускатися між сторінками",
          "SQL видасть синтаксичну помилку",
          "OFFSET 10 поверне перші 10 рядків",
          "Поле `id` автоматично видалиться",
        ],
        0,
        why("Завжди додавайте унікальну колонку як другий критерій (`ORDER BY created_at DESC, id DESC`).", "Always add a unique tie-breaker (`ORDER BY created_at DESC, id DESC`)."),
      ),
      codeOrderAuto(
        "ef-cae4",
        "Порядок перевірок у захищеному `PATCH /tasks/:id`",
        "Check order inside a protected `PATCH /tasks/:id` route",
        "text",
        [
          "1. Перевірити сесію користувача (401 якщо відсутня)",
          "2. Провалідувати тіло запиту через Zod (400 якщо невалідне)",
          "3. Знайти задачу в БД (404 якщо не існує)",
          "4. Перевірити task.ownerId === req.user.id (403 якщо чужа)",
          "5. Застосувати оновлення та повернути 200 JSON",
        ],
        why(
          "Спочатку ідентичність і формат входу, потім пошук ресурсу та перевірка власника перед записом.",
          "Verify identity and schema first, fetch resource, check owner, then persist update.",
        ),
      ),
    ]),
  ],
);

const capstone = unit("capstone", "Capstone", "Capstone", [
  lesson(
    "ef-capstone-api",
    "Mini: REST /health API",
    "Mini: REST /health API",
    3,
    false,
    [
      {
        id: "ef-c1",
        type: "code_project",
        promptUk:
          "Express: express(), express.json(), GET /health → { ok: true }, listen PORT||3000. README з curl.",
        promptEn:
          "Express: express(), express.json(), GET /health → { ok: true }, listen PORT||3000. README with curl.",
        files: [
          {
            id: "js",
            name: "app.js",
            language: "javascript",
            starter: `// TODO: express app + GET /health
`,
          },
          {
            id: "json",
            name: "package.json",
            language: "json",
            starter: `{
  "name": "express-health",
  "scripts": {}
}
`,
          },
          {
            id: "md",
            name: "README.md",
            language: "markdown",
            starter: `# API
<!-- curl example for /health -->
`,
          },
        ],
        checks: [
          {
            fileId: "js",
            contains: ["express", "json", "/health", "listen", "PORT"],
          },
          { fileId: "json", contains: ["start", "node"] },
          { fileId: "md", contains: ["curl", "health"] },
        ],
        hintUk: "const app = express(); app.use(express.json()); app.get('/health', …); app.listen(process.env.PORT||3000)",
        hintEn: "const app = express(); app.use(express.json()); app.get('/health', …); app.listen(process.env.PORT||3000)",
      } as Exercise,
    ],
  ),
  lesson(
    "ef-forgeboard-api-lab",
    "ForgeBoard M5: REST API з валідацією й ownership",
    "ForgeBoard M5: Validated REST API with Ownership Checks",
    4,
    false,
    [
      mcq(
        "ef-fb1",
        "Перед початком локальної лаби ForgeBoard M5: який статус має повертати `PATCH /tasks/:id` при спробі редагувати чужу задачу?",
        "Before starting ForgeBoard M5 locally: what status should `PATCH /tasks/:id` return when modifying another user's task?",
        ["403 (`forbidden`)", "200 (`ok`)", "400 (`invalid_input`)", "302 Redirect"],
        0,
        why("Чужа задача доступна тільки власнику — іншим повертаємо 403.", "Cross-user modification must fail with 403 forbidden."),
      ),
      codeFill(
        "ef-fb2",
        "У локальному API ForgeBoard: поверніть 400 при помилці Zod-схеми",
        "In the ForgeBoard API: return 400 with `invalid_input` when Zod validation fails",
        "js",
        "if (!parsed.success) return res.status(___).json({ error: 'invalid_input' });",
        ["400"],
        true,
        why("Помилка вхідного контракту повертає 400 Bad Request.", "Malformed client payloads return 400 Bad Request."),
      ),
      codeRead(
        "ef-fb3",
        "Чому тести Express API краще запускати проти реального Express app instance (`supertest` / `fetch`), а не лише тестувати мок `res.json`?",
        "Why test Express endpoints through real HTTP requests (`fetch` / `supertest`) instead of mocking `req`/`res` objects?",
        "js",
        "const res = await fetch(`${baseUrl}/tasks`, { method: 'POST', headers, body: '{}' });\nassert.equal(res.status, 400);",
        [
          "Реальний HTTP-шлях перевіряє порядок middleware (`express.json`, auth, validation, error handler) та серіалізацію заголовків/статусів",
          "Мок req/res не працює в Node.js",
          "fetch автоматично запускає PostgreSQL",
          "supertest вимикає TypeScript",
        ],
        0,
        why(
          "Інтеграційні HTTP-тести ловлять помилки в порядку middleware та error-handler сигнатурах.",
          "Real HTTP integration tests catch middleware ordering bugs and header/status serialization mismatches.",
        ),
      ),
    ],
  ),
  exam("ef-cap-exam", "Фінальна контрольна Express", "Final Express exam", 3, [
    mcq("ef-ce1", "Express is:", "Express is:", ["Node HTTP framework", "SQL DB", "browser only", "CSS lib"], 0),
    codeFill("ef-ce2", "express()", "express()", "js", "const app = ___();", ["express"], true),
    codeFill("ef-ce3", "get health", "get health", "js", "app.___('/health', h)", ["get"], true),
    codeFill("ef-ce4", "json mw", "json mw", "js", "app.use(express.___())", ["json"], true),
    codeFill("ef-ce5", "status", "status", "js", "res.___(201).json(x)", ["status"], true),
    mcq("ef-ce6", "Error middleware arity:", "Error middleware arity:", ["4 args", "1 arg", "0 args", "only CSS"], 0),
  ]),
]);

export const expressFundamentalsContent: CourseContent = {
  slug: "express_fundamentals",
  titleUk: "Express: fundamentals",
  titleEn: "Express Fundamentals",
  descriptionUk:
    "App, routes, middleware, REST, валідація, обробка збоїв, auth vs ownership, Router та ForgeBoard API — deep track + контрольні.",
  descriptionEn:
    "App, routes, middleware, REST, validation resilience, auth vs ownership, Router, and ForgeBoard API — deep track + unit exams.",
  icon: "🚂",
  color: "#000000",
  units: [
    intro,
    appBasics,
    routesU,
    middlewareU,
    restU,
    jsonBody,
    errorsU,
    routersU,
    expressResilienceScenarios,
    apiContractsAuthz,
    capstone,
  ],
};
