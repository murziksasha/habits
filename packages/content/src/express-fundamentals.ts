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
    "App, routes, middleware, REST, errors, Router — deep track + контрольні.",
  descriptionEn:
    "App, routes, middleware, REST, errors, Router — deep track + unit exams.",
  icon: "🚂",
  color: "#000000",
  units: [intro, appBasics, routesU, middlewareU, restU, errorsU, routersU, capstone],
};
