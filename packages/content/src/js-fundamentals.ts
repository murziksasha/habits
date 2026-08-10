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

const values = unit("values", "Values & types", "Values & types", [
  lesson(
    "jsf-values",
    "typeof & primitives",
    "typeof & primitives",
    1,
    true,
    [
      mcq("jsf-v1", "typeof null у JS:", "typeof null in JS:", ['"object" (historical bug)', '"null"', '"undefined"', '"number"'], 0),
      codeFill("jsf-v2", "string type check", "string type check", "js", "typeof 'hi' === '___'", ["string"], true),
      matchEx("jsf-v3", "Primitives", "Primitives", [
        { left: "number", right: "42" },
        { left: "boolean", right: "true/false" },
        { left: "undefined", right: "missing value" },
      ]),
    ],
  ),
  lesson(
    "jsf-const-let",
    "const / let",
    "const / let",
    1,
    true,
    [
      mcq("jsf-v4", "const означає:", "const means:", ["не можна reassign binding", "immutable deep always", "global only", "var alias"], 0),
      codeFill("jsf-v5", "block scope", "block scope", "js", "let x = 1; // use ___ not var for block scope", ["let"], true),
      codeRead("jsf-v6", "Що станеться?", "What happens?", "js", "const a = []; a.push(1);", ["OK — mutate array", "throw always", "syntax error", "a becomes 1"], 0),
    ],
  ),
  exam("jsf-values-exam", "Контрольна: values", "Exam: values", 1, [
    mcq("jsf-ve1", "typeof []:", "typeof []:", ['"object"', '"array"', '"list"', '"undefined"'], 0),
    codeFill("jsf-ve2", "boolean lit", "boolean lit", "js", "const ok = ___;", ["true", "false"], false),
    mcq("jsf-ve3", "let is:", "let is:", ["block-scoped", "function-scoped only like var", "const alias", "global only"], 0),
    codeFill("jsf-ve4", "typeof number", "typeof number", "js", "typeof 3 === '___'", ["number"], true),
  ]),
]);

const operators = unit("operators", "Operators", "Operators", [
  lesson(
    "jsf-eq",
    "== vs ===",
    "== vs ===",
    2,
    false,
    [
      mcq("jsf-o1", "=== порівнює:", "=== compares:", ["без coercion", "з coercion always", "only strings", "only refs"], 0),
      codeRead("jsf-o2", "0 == '0' ?", "0 == '0' ?", "js", "0 == '0'", ["true (coercion)", "false always", "throw", "undefined"], 0),
      codeFill("jsf-o3", "strict equal", "strict equal", "js", "a ___ b", ["==="], true),
    ],
  ),
  lesson(
    "jsf-truthy",
    "Truthy / falsy",
    "Truthy / falsy",
    2,
    false,
    [
      mcq("jsf-o4", "Falsy values include:", "Falsy values include:", ["0, '', null, undefined, NaN, false", "only false", "only null", "[] and {}"], 0),
      codeRead("jsf-o5", "Boolean([])?", "Boolean([])?", "js", "Boolean([])", ["true", "false", "null", "throw"], 0),
      codeFill("jsf-o6", "nullish coalescing", "nullish coalescing", "js", "x ___ 1", ["??"], true),
    ],
  ),
  exam("jsf-ops-exam", "Контрольна: operators", "Exam: operators", 2, [
    mcq("jsf-oe1", "=== is:", "=== is:", ["strict equality", "assign", "spread", "await"], 0),
    codeFill("jsf-oe2", "??", "??", "js", "a ___ b", ["??"], true),
    mcq("jsf-oe3", "'' is:", "'' is:", ["falsy", "truthy", "number", "symbol"], 0),
    codeFill("jsf-oe4", "!==", "!==", "js", "a ___ b", ["!=="], true),
  ]),
]);

const functionsU = unit("functions", "Functions", "Functions", [
  lesson(
    "jsf-fn-decl",
    "Declarations & arrows",
    "Declarations & arrows",
    2,
    false,
    [
      codeFill("jsf-f1", "function keyword", "function keyword", "js", "___ add(a, b) { return a + b; }", ["function"], true),
      codeFill("jsf-f2", "arrow", "arrow", "js", "const add = (a, b) ___ a + b;", ["=>"], true),
      mcq("jsf-f3", "Arrow functions do not have own:", "Arrows lack own:", ["this (lexical this)", "parameters", "return", "name always"], 0),
    ],
  ),
  lesson(
    "jsf-fn-params",
    "Default & rest",
    "Default & rest",
    2,
    false,
    [
      codeFill("jsf-f4", "default param", "default param", "js", "function f(n = ___) {}", ["0", "1", "null"], false),
      codeFill("jsf-f5", "rest", "rest", "js", "function f(...___) {}", ["args", "rest"], false),
      mcq("jsf-f6", "rest збирає:", "rest collects:", ["remaining args into array", "only first arg", "object keys", "DOM nodes"], 0),
    ],
  ),
  exam("jsf-fn-exam", "Контрольна: functions", "Exam: functions", 2, [
    codeFill("jsf-fe1", "arrow", "arrow", "js", "const id = x ___ x;", ["=>"], true),
    mcq("jsf-fe2", "return exits:", "return exits:", ["function", "program always", "loop only", "module"], 0),
    codeFill("jsf-fe3", "function", "function", "js", "___ f() {}", ["function"], true),
    mcq("jsf-fe4", "default params run when:", "defaults when:", ["arg undefined", "arg 0 always", "always", "never"], 0),
  ]),
]);

const arrays = unit("arrays", "Arrays", "Arrays", [
  lesson(
    "jsf-arr-basics",
    "push / map / filter",
    "push / map / filter",
    2,
    false,
    [
      codeFill("jsf-a1", "map", "map", "js", "[1,2].___(x => x * 2)", ["map"], true),
      codeFill("jsf-a2", "filter", "filter", "js", "arr.___(x => x > 0)", ["filter"], true),
      mcq("jsf-a3", "map returns:", "map returns:", ["new array", "mutates always only", "number", "void"], 0),
    ],
  ),
  lesson(
    "jsf-arr-find",
    "find / includes / length",
    "find / includes / length",
    2,
    false,
    [
      codeFill("jsf-a4", "includes", "includes", "js", "[1,2].___(2)", ["includes"], true),
      codeFill("jsf-a5", "length", "length", "js", "arr.___", ["length"], true),
      codeRead("jsf-a6", "find?", "find?", "js", "[1,2,3].find(x => x > 1)", ["2", "true", "[2,3]", "undefined"], 0),
    ],
  ),
  exam("jsf-arr-exam", "Контрольна: arrays", "Exam: arrays", 2, [
    codeFill("jsf-ae1", "map", "map", "js", "xs.___(f)", ["map"], true),
    codeFill("jsf-ae2", "filter", "filter", "js", "xs.___(f)", ["filter"], true),
    mcq("jsf-ae3", "push:", "push:", ["adds to end", "removes first", "sorts", "freezes"], 0),
    codeFill("jsf-ae4", "includes", "includes", "js", "xs.___(v)", ["includes"], true),
  ]),
]);

const objects = unit("objects", "Objects", "Objects", [
  lesson(
    "jsf-obj-lit",
    "Literals & access",
    "Literals & access",
    2,
    false,
    [
      codeFill("jsf-ob1", "dot access", "dot access", "js", "user.___", ["name", "id"], false),
      codeFill("jsf-ob2", "bracket", "bracket", "js", "user['___']", ["name", "id"], false),
      mcq("jsf-ob3", "Object keys are:", "Object keys are:", ["strings/symbols", "only numbers", "only arrays", "functions only"], 0),
    ],
  ),
  lesson(
    "jsf-destruct",
    "Destructuring",
    "Destructuring",
    2,
    false,
    [
      codeFill("jsf-ob4", "object destructure", "object destructure", "js", "const { ___ } = user;", ["name", "id"], false),
      codeOrder(
        "jsf-ob5",
        "destructure line",
        "destructure line",
        "js",
        ["} = point;", "const { x, y"],
        ["const { x, y", "} = point;"],
      ),
      mcq("jsf-ob6", "Spread {...a, b:1}:", "Spread {...a, b:1}:", ["shallow copy + override", "deep clone always", "deletes a", "async"], 0),
    ],
  ),
  exam("jsf-obj-exam", "Контрольна: objects", "Exam: objects", 2, [
    codeFill("jsf-obe1", "const obj", "const obj", "js", "const o = { a: ___ };", ["1", "true", "'x'"], false),
    mcq("jsf-obe2", "destructuring:", "destructuring:", ["pull fields out", "only arrays", "SQL", "CSS"], 0),
    codeFill("jsf-obe3", "spread", "spread", "js", "const b = { ...___ };", ["a", "obj"], false),
    mcq("jsf-obe4", "obj.a vs obj['a']:", "obj.a vs obj['a']:", ["often same for string keys", "always different", "illegal", "only in TS"], 0),
  ]),
]);

const asyncU = unit("async", "Async", "Async", [
  lesson(
    "jsf-promise",
    "Promises",
    "Promises",
    3,
    false,
    [
      mcq("jsf-as1", "Promise states:", "Promise states:", ["pending/fulfilled/rejected", "only done", "open/closed", "200/404"], 0),
      codeFill("jsf-as2", "then", "then", "js", "p.___(v => v)", ["then"], true),
      codeFill("jsf-as3", "catch", "catch", "js", "p.___(e => e)", ["catch"], true),
    ],
  ),
  lesson(
    "jsf-async-await",
    "async / await",
    "async / await",
    3,
    false,
    [
      codeFill("jsf-as4", "async fn", "async fn", "js", "___ function load() {}", ["async"], true),
      codeFill("jsf-as5", "await", "await", "js", "const data = ___ fetch(url);", ["await"], true),
      mcq("jsf-as6", "await works in:", "await works in:", ["async functions (and modules)", "any function always", "only CSS", "only class fields never"], 0),
    ],
  ),
  lesson(
    "jsf-fetch",
    "fetch intro",
    "fetch intro",
    3,
    false,
    [
      codeRead("jsf-as7", "fetch returns:", "fetch returns:", "js", "fetch('/api')", ["Promise<Response>", "string", "number", "void"], 0),
      codeFill("jsf-as8", "json body", "json body", "js", "await res.___()", ["json"], true),
      mcq("jsf-as9", "res.ok means:", "res.ok means:", ["status 200–299", "always true", "network offline", "CORS fail"], 0),
    ],
  ),
  exam("jsf-async-exam", "Контрольна: async", "Exam: async", 3, [
    codeFill("jsf-ase1", "async", "async", "js", "___ function f() {}", ["async"], true),
    codeFill("jsf-ase2", "await", "await", "js", "const x = ___ p;", ["await"], true),
    mcq("jsf-ase3", "Promise reject handled by:", "reject handled by:", ["catch", "map", "filter", "typeof"], 0),
    codeFill("jsf-ase4", "json()", "json()", "js", "await response.___()", ["json"], true),
    mcq("jsf-ase5", "fetch is:", "fetch is:", ["async HTTP API", "SQL client", "CSS parser", "git"], 0),
  ]),
]);

const domU = unit("dom", "DOM basics", "DOM basics", [
  lesson(
    "jsf-dom-select",
    "querySelector",
    "querySelector",
    2,
    false,
    [
      codeFill("jsf-d1", "querySelector", "querySelector", "js", "document.___('button')", ["querySelector"], true),
      codeFill("jsf-d2", "getElementById", "getElementById", "js", "document.___('app')", ["getElementById"], true),
      mcq("jsf-d3", "querySelectorAll returns:", "querySelectorAll returns:", ["NodeList", "single Element always", "string", "number"], 0),
    ],
  ),
  lesson(
    "jsf-dom-events",
    "addEventListener",
    "addEventListener",
    2,
    false,
    [
      codeFill("jsf-d4", "click listener", "click listener", "js", "el.addEventListener('___', handler)", ["click"], true),
      codeOrder(
        "jsf-d5",
        "wire button",
        "wire button",
        "js",
        ["console.log('hi');", "btn.addEventListener('click', () => {", "});"],
        ["btn.addEventListener('click', () => {", "console.log('hi');", "});"],
      ),
      mcq("jsf-d6", "preventDefault:", "preventDefault:", ["stops default browser action", "deletes DOM", "closes tab", "compiles TS"], 0),
    ],
  ),
  exam("jsf-dom-exam", "Контрольна: DOM", "Exam: DOM", 2, [
    codeFill("jsf-de1", "querySelector", "querySelector", "js", "document.___('.x')", ["querySelector"], true),
    codeFill("jsf-de2", "click", "click", "js", "addEventListener('___', fn)", ["click"], true),
    mcq("jsf-de3", "textContent sets:", "textContent sets:", ["text of node", "CSS only", "SQL", "HTTP"], 0),
    codeFill("jsf-de4", "getElementById", "getElementById", "js", "document.___('id')", ["getElementById"], true),
  ]),
]);

const modulesU = unit("modules", "Modules", "Modules", [
  lesson(
    "jsf-mod-export",
    "export / import",
    "export / import",
    2,
    false,
    [
      codeFill("jsf-m1", "export", "export", "js", "___ function add() {}", ["export"], true),
      codeFill("jsf-m2", "import named", "import named", "js", "import { add } from './___';", ["math.js", "math", "lib"], false),
      mcq("jsf-m3", "default export import:", "default export import:", ["import x from './m'", "import {default as} only illegal", "require only", "include"], 0),
    ],
  ),
  exam("jsf-mod-exam", "Контрольна: modules", "Exam: modules", 2, [
    codeFill("jsf-me1", "export", "export", "js", "___ const PI = 3;", ["export"], true),
    mcq("jsf-me2", "ESM uses:", "ESM uses:", ["import/export", "only #include", "only CSS @import for JS", "FTP"], 0),
    codeFill("jsf-me3", "from", "from", "js", "import x ___ './a.js'", ["from"], true),
    mcq("jsf-me4", "side-effect import:", "side-effect import:", ["import './polyfill.js'", "export type only", "delete module", "eval"], 0),
  ]),
]);

const capstone = unit("capstone", "Capstone", "Capstone", [
  lesson(
    "jsf-capstone-counter",
    "Mini: counter logic",
    "Mini: counter logic",
    3,
    false,
    [
      {
        id: "jsf-c1",
        type: "code_project",
        promptUk:
          "JS: function createCounter() returns { inc, value }. HTML button#inc. README: state.",
        promptEn:
          "JS: function createCounter() returns { inc, value }. HTML button#inc. README: state.",
        files: [
          {
            id: "js",
            name: "counter.js",
            language: "javascript",
            starter: `// TODO: export function createCounter()
export function createCounter() {
  // ...
}
`,
          },
          {
            id: "html",
            name: "index.html",
            language: "html",
            starter: `<!-- TODO: button id="inc" -->
`,
          },
          {
            id: "md",
            name: "README.md",
            language: "markdown",
            starter: `# Counter
<!-- state -->
`,
          },
        ],
        checks: [
          { fileId: "js", contains: ["createCounter", "inc", "return"] },
          { kind: "dom", selector: "#inc" },
          { fileId: "md", contains: ["state"] },
        ],
      } as Exercise,
    ],
  ),
  exam("jsf-cap-exam", "Фінальна контрольна JS", "Final JS exam", 3, [
    mcq("jsf-ce1", "=== is:", "=== is:", ["strict equality", "assign", "OR", "await"], 0),
    codeFill("jsf-ce2", "map", "map", "js", "arr.___(f)", ["map"], true),
    codeFill("jsf-ce3", "async", "async", "js", "___ function f() {}", ["async"], true),
    codeFill("jsf-ce4", "await", "await", "js", "const x = ___ p;", ["await"], true),
    codeFill("jsf-ce5", "querySelector", "querySelector", "js", "document.___('a')", ["querySelector"], true),
    mcq("jsf-ce6", "Promise catch:", "Promise catch:", ["handles reject", "maps array", "CSS", "SQL"], 0),
  ]),
]);

const errorsProto = unit("errors_proto", "Errors & prototypes", "Errors & prototypes", [
  lesson(
    "jsf-try-catch",
    "try / catch / finally",
    "try / catch / finally",
    3,
    false,
    [
      mcq(
        "jsf-e1",
        "catch ловить:",
        "catch handles:",
        ["кинуті помилки в try", "лише syntax errors always", "network only", "CSS"],
        0,
      ),
      codeFill(
        "jsf-e2",
        "throw",
        "throw",
        "js",
        "___ new Error('x');",
        ["throw"],
        true,
      ),
      codeRead(
        "jsf-e3",
        "finally runs?",
        "finally runs?",
        "js",
        "try { return 1; } finally { console.log('f'); }",
        ["yes, before return completes", "never", "only on error", "syntax error"],
        0,
      ),
    ],
  ),
  lesson(
    "jsf-proto",
    "Prototype chain",
    "Prototype chain",
    3,
    false,
    [
      mcq(
        "jsf-e4",
        "obj.__proto__ points to:",
        "obj.__proto__ points to:",
        ["prototype of constructor", "global window always", "null always", "class name string"],
        0,
      ),
      codeFill(
        "jsf-e5",
        "hasOwnProperty",
        "hasOwnProperty",
        "js",
        "obj.___('x')",
        ["hasOwnProperty"],
        true,
      ),
      mcq(
        "jsf-e6",
        "class extends uses:",
        "class extends uses:",
        ["prototype inheritance", "copy paste only", "CSS cascade", "SQL joins"],
        0,
      ),
    ],
  ),
  lesson(
    "jsf-iter",
    "Iterables & for..of",
    "Iterables & for..of",
    3,
    false,
    [
      codeFill(
        "jsf-e7",
        "for of",
        "for of",
        "js",
        "for (const x ___ arr) {}",
        ["of"],
        true,
      ),
      mcq(
        "jsf-e8",
        "for..in iterates:",
        "for..in iterates:",
        ["enumerable keys", "only values", "only Map", "DOM nodes only"],
        0,
      ),
      codeFill(
        "jsf-e9",
        "Symbol.iterator",
        "Symbol.iterator",
        "js",
        "arr[Symbol.___]",
        ["iterator"],
        true,
      ),
    ],
  ),
  exam("jsf-errors-exam", "Контрольна: errors/proto", "Exam: errors/proto", 3, [
    mcq("jsf-ee1", "throw creates:", "throw creates:", ["exception flow", "CSS rule", "SQL row", "HTTP always"], 0),
    codeFill("jsf-ee2", "catch", "catch", "js", "try {} ___ (e) {}", ["catch"], true),
    codeFill("jsf-ee3", "for of", "for of", "js", "for (const x ___ xs)", ["of"], true),
    mcq("jsf-ee4", "prototype is about:", "prototype is about:", ["inheritance", "only JSON", "only CSS", "DB indexes"], 0),
  ]),
]);

export const jsFundamentalsContent: CourseContent = {
  slug: "js_fundamentals",
  titleUk: "JavaScript: fundamentals",
  titleEn: "JavaScript Fundamentals",
  descriptionUk:
    "Глибокий JS: типи, operators, functions, arrays, objects, async/await, DOM, modules, errors/prototypes + контрольні.",
  descriptionEn:
    "Deep JS: types, operators, functions, arrays, objects, async/await, DOM, modules, errors/prototypes + unit exams.",
  icon: "⚡",
  color: "#F7DF1E",
  units: [
    values,
    operators,
    functionsU,
    arrays,
    objects,
    asyncU,
    domU,
    modulesU,
    errorsProto,
    capstone,
  ],
};
