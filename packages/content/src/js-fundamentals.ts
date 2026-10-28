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
import { jsClosuresEventLoopUnit } from "./deep-units.js";

const values = unit("values", "Values & types", "Values & types", [
  lesson(
    "jsf-values",
    "typeof & primitives",
    "typeof & primitives",
    1,
    true,
    [
      mcq("jsf-v1", "Що повертає typeof null у JavaScript?", "What does typeof null return in JavaScript?", ['"object" (historical bug)', '"null"', '"undefined"', '"number"'], 0),
      codeFill("jsf-v2", "Допишіть рядок типу, щоб перевірка повернула true.", "Fill in the type name so the check returns true.", "js", "typeof 'hi' === '___'", ["string"], true),
      matchEx("jsf-v3", "Зіставте примітивний тип з прикладом значення.", "Match each primitive type to an example value.", [
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
      mcq("jsf-v4", "Що насправді гарантує const?", "What does const actually guarantee?", ["не можна reassign binding", "immutable deep always", "global only", "var alias"], 0),
      codeFill("jsf-v5", "Яке ключове слово дає блокову область видимості замість var?", "Which keyword gives block scope instead of var?", "js", "let x = 1; // use ___ not var for block scope", ["let"], true),
      codeRead("jsf-v6", "Що станеться, якщо змінити масив, оголошений через const?", "What happens when you mutate an array declared with const?", "js", "const a = []; a.push(1);", ["OK — mutate array", "throw always", "syntax error", "a becomes 1"], 0),
    ],
  ),
  exam("jsf-values-exam", "Контрольна: values", "Exam: values", 1, [
    mcq("jsf-ve1", "Що повертає typeof [] (масив)?", "What does typeof [] (an array) return?", ['"object"', '"array"', '"list"', '"undefined"'], 0),
    codeFill("jsf-ve2", "Присвойте змінній булеве значення.", "Assign a boolean literal to the variable.", "js", "const ok = ___;", ["true", "false"], false),
    mcq("jsf-ve3", "Яка область видимості у let?", "What kind of scope does let have?", ["block-scoped", "function-scoped only like var", "const alias", "global only"], 0),
    codeFill("jsf-ve4", "Допишіть тип, який повертає typeof 3.", "Fill in the type that typeof 3 returns.", "js", "typeof 3 === '___'", ["number"], true),
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
      mcq("jsf-o1", "Чим === відрізняється від ==?", "How is === different from ==?", ["без coercion", "з coercion always", "only strings", "only refs"], 0),
      codeRead("jsf-o2", "Що поверне вираз 0 == '0' і чому?", "What does 0 == '0' evaluate to, and why?", "js", "0 == '0'", ["true (coercion)", "false always", "throw", "undefined"], 0),
      codeFill("jsf-o3", "Вставте оператор строгої рівності.", "Insert the strict equality operator.", "js", "a ___ b", ["==="], true),
    ],
  ),
  lesson(
    "jsf-truthy",
    "Truthy / falsy",
    "Truthy / falsy",
    2,
    false,
    [
      mcq("jsf-o4", "Які значення в JS є falsy?", "Which values are falsy in JS?", ["0, '', null, undefined, NaN, false", "only false", "only null", "[] and {}"], 0),
      codeRead("jsf-o5", "Що поверне Boolean([]) для порожнього масиву?", "What does Boolean([]) return for an empty array?", "js", "Boolean([])", ["true", "false", "null", "throw"], 0),
      codeFill("jsf-o6", "Вставте оператор, що підставляє 1 лише коли x — null або undefined.", "Insert the operator that falls back to 1 only when x is null or undefined.", "js", "x ___ 1", ["??"], true),
    ],
  ),
  exam("jsf-ops-exam", "Контрольна: operators", "Exam: operators", 2, [
    mcq("jsf-oe1", "Що означає оператор ===?", "What does the === operator mean?", ["strict equality", "assign", "spread", "await"], 0),
    codeFill("jsf-oe2", "Вставте оператор нульового злиття (nullish coalescing).", "Insert the nullish coalescing operator.", "js", "a ___ b", ["??"], true),
    mcq("jsf-oe3", "Яким є порожній рядок '' у булевому контексті?", "What is the empty string '' in a boolean context?", ["falsy", "truthy", "number", "symbol"], 0),
    codeFill("jsf-oe4", "Вставте оператор строгої нерівності.", "Insert the strict inequality operator.", "js", "a ___ b", ["!=="], true),
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
      codeFill("jsf-f1", "Яке ключове слово оголошує функцію?", "Which keyword declares a function?", "js", "___ add(a, b) { return a + b; }", ["function"], true),
      codeFill("jsf-f2", "Допишіть синтаксис стрілкової функції.", "Complete the arrow function syntax.", "js", "const add = (a, b) ___ a + b;", ["=>"], true),
      mcq("jsf-f3", "Чого НЕ мають власного стрілкові функції?", "What do arrow functions NOT have of their own?", ["this (lexical this)", "parameters", "return", "name always"], 0),
    ],
  ),
  lesson(
    "jsf-fn-params",
    "Default & rest",
    "Default & rest",
    2,
    false,
    [
      codeFill("jsf-f4", "Задайте значення параметра за замовчуванням.", "Give the parameter a default value.", "js", "function f(n = ___) {}", ["0", "1", "null"], false),
      codeFill("jsf-f5", "Назвіть rest-параметр, що збере решту аргументів.", "Name the rest parameter that collects the remaining arguments.", "js", "function f(...___) {}", ["args", "rest"], false),
      mcq("jsf-f6", "Що збирає rest-параметр ...args?", "What does the rest parameter ...args collect?", ["remaining args into array", "only first arg", "object keys", "DOM nodes"], 0),
    ],
  ),
  exam("jsf-fn-exam", "Контрольна: functions", "Exam: functions", 2, [
    codeFill("jsf-fe1", "Допишіть стрілкову функцію identity.", "Complete the identity arrow function.", "js", "const id = x ___ x;", ["=>"], true),
    mcq("jsf-fe2", "З чого виходить оператор return?", "What does return exit from?", ["function", "program always", "loop only", "module"], 0),
    codeFill("jsf-fe3", "Оголосіть функцію через ключове слово.", "Declare a function with the keyword.", "js", "___ f() {}", ["function"], true),
    mcq("jsf-fe4", "Коли спрацьовує значення параметра за замовчуванням?", "When is a default parameter value used?", ["arg undefined", "arg 0 always", "always", "never"], 0),
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
      codeFill("jsf-a1", "Який метод створить новий масив з подвоєними числами?", "Which method creates a new array with doubled numbers?", "js", "[1,2].___(x => x * 2)", ["map"], true),
      codeFill("jsf-a2", "Який метод залишить лише додатні числа?", "Which method keeps only the positive numbers?", "js", "arr.___(x => x > 0)", ["filter"], true),
      mcq("jsf-a3", "Що повертає map?", "What does map return?", ["new array", "mutates always only", "number", "void"], 0),
    ],
  ),
  lesson(
    "jsf-arr-find",
    "find / includes / length",
    "find / includes / length",
    2,
    false,
    [
      codeFill("jsf-a4", "Який метод перевіряє, чи є 2 у масиві?", "Which method checks whether 2 is in the array?", "js", "[1,2].___(2)", ["includes"], true),
      codeFill("jsf-a5", "Яка властивість дає кількість елементів масиву?", "Which property gives the number of elements?", "js", "arr.___", ["length"], true),
      codeRead("jsf-a6", "Що поверне find з цієї умови?", "What does find return for this condition?", "js", "[1,2,3].find(x => x > 1)", ["2", "true", "[2,3]", "undefined"], 0),
    ],
  ),
  exam("jsf-arr-exam", "Контрольна: arrays", "Exam: arrays", 2, [
    codeFill("jsf-ae1", "Перетворіть кожен елемент функцією f.", "Transform every element with f.", "js", "xs.___(f)", ["map"], true),
    codeFill("jsf-ae2", "Залиште лише елементи, для яких f повертає true.", "Keep only the elements for which f returns true.", "js", "xs.___(f)", ["filter"], true),
    mcq("jsf-ae3", "Що робить push?", "What does push do?", ["adds to end", "removes first", "sorts", "freezes"], 0),
    codeFill("jsf-ae4", "Перевірте, чи масив містить значення v.", "Check whether the array contains v.", "js", "xs.___(v)", ["includes"], true),
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
      codeFill("jsf-ob1", "Прочитайте властивість name через крапку.", "Read the name property with dot notation.", "js", "user.___", ["name", "id"], false),
      codeFill("jsf-ob2", "Прочитайте властивість name через квадратні дужки.", "Read the name property with bracket notation.", "js", "user['___']", ["name", "id"], false),
      mcq("jsf-ob3", "Якого типу ключі звичайного обʼєкта?", "What type are the keys of a plain object?", ["strings/symbols", "only numbers", "only arrays", "functions only"], 0),
    ],
  ),
  lesson(
    "jsf-destruct",
    "Destructuring",
    "Destructuring",
    2,
    false,
    [
      codeFill("jsf-ob4", "Деструктуруйте властивість name з user.", "Destructure the name property from user.", "js", "const { ___ } = user;", ["name", "id"], false),
      codeOrder(
        "jsf-ob5",
        "Складіть рядок деструктуризації в правильному порядку.",
        "Put the destructuring line in the correct order.",
        "js",
        ["} = point;", "const { x, y"],
        ["const { x, y", "} = point;"],
      ),
      mcq("jsf-ob6", "Що дає spread {...a, b: 1}?", "What does the spread {...a, b: 1} produce?", ["shallow copy + override", "deep clone always", "deletes a", "async"], 0),
    ],
  ),
  exam("jsf-obj-exam", "Контрольна: objects", "Exam: objects", 2, [
    codeFill("jsf-obe1", "Задайте властивості a значення 1.", "Set property a to 1.", "js", "const o = { a: ___ };", ["1", "true", "'x'"], false),
    mcq("jsf-obe2", "Що таке деструктуризація?", "What is destructuring?", ["pull fields out", "only arrays", "SQL", "CSS"], 0),
    codeFill("jsf-obe3", "Скопіюйте обʼєкт a через spread.", "Copy object a using spread.", "js", "const b = { ...___ };", ["a", "obj"], false),
    mcq("jsf-obe4", "Чим obj.a відрізняється від obj['a']?", "How is obj.a different from obj['a']?", ["often same for string keys", "always different", "illegal", "only in TS"], 0),
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
      mcq("jsf-as1", "У яких станах може бути Promise?", "Which states can a Promise be in?", ["pending/fulfilled/rejected", "only done", "open/closed", "200/404"], 0),
      codeFill("jsf-as2", "Який метод отримує значення виконаного Promise?", "Which method receives a fulfilled Promise's value?", "js", "p.___(v => v)", ["then"], true),
      codeFill("jsf-as3", "Який метод обробляє відхилений Promise?", "Which method handles a rejected Promise?", "js", "p.___(e => e)", ["catch"], true),
    ],
  ),
  lesson(
    "jsf-async-await",
    "async / await",
    "async / await",
    3,
    false,
    [
      codeFill("jsf-as4", "Зробіть функцію асинхронною.", "Make the function asynchronous.", "js", "___ function load() {}", ["async"], true),
      codeFill("jsf-as5", "Дочекайтеся результату fetch.", "Wait for the result of fetch.", "js", "const data = ___ fetch(url);", ["await"], true),
      mcq("jsf-as6", "Де можна використовувати await?", "Where can you use await?", ["async functions (and modules)", "any function always", "only CSS", "only class fields never"], 0),
    ],
  ),
  lesson(
    "jsf-fetch",
    "fetch intro",
    "fetch intro",
    3,
    false,
    [
      codeRead("jsf-as7", "Що повертає fetch('/api')?", "What does fetch('/api') return?", "js", "fetch('/api')", ["Promise<Response>", "string", "number", "void"], 0),
      codeFill("jsf-as8", "Який метод відповіді розбирає тіло як JSON?", "Which response method parses the body as JSON?", "js", "await res.___()", ["json"], true),
      mcq("jsf-as9", "Що означає res.ok?", "What does res.ok mean?", ["status 200–299", "always true", "network offline", "CORS fail"], 0),
    ],
  ),
  exam("jsf-async-exam", "Контрольна: async", "Exam: async", 3, [
    codeFill("jsf-ase1", "Оголосіть асинхронну функцію.", "Declare an async function.", "js", "___ function f() {}", ["async"], true),
    codeFill("jsf-ase2", "Отримайте значення Promise p.", "Get the value of Promise p.", "js", "const x = ___ p;", ["await"], true),
    mcq("jsf-ase3", "Promise reject handled by:", "reject handled by:", ["catch", "map", "filter", "typeof"], 0),
    codeFill("jsf-ase4", "Розберіть тіло відповіді як JSON.", "Parse the response body as JSON.", "js", "await response.___()", ["json"], true),
    mcq("jsf-ase5", "Що таке fetch?", "What is fetch?", ["async HTTP API", "SQL client", "CSS parser", "git"], 0),
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
      codeFill("jsf-d1", "Знайдіть перший елемент button за CSS-селектором.", "Find the first button element by CSS selector.", "js", "document.___('button')", ["querySelector"], true),
      codeFill("jsf-d2", "Знайдіть елемент з id=\"app\".", "Find the element with id=\"app\".", "js", "document.___('app')", ["getElementById"], true),
      mcq("jsf-d3", "Що повертає querySelectorAll?", "What does querySelectorAll return?", ["NodeList", "single Element always", "string", "number"], 0),
    ],
  ),
  lesson(
    "jsf-dom-events",
    "addEventListener",
    "addEventListener",
    2,
    false,
    [
      codeFill("jsf-d4", "Підпишіться на подію кліку.", "Subscribe to the click event.", "js", "el.addEventListener('___', handler)", ["click"], true),
      codeOrder(
        "jsf-d5",
        "Складіть код підключення кнопки в правильному порядку.",
        "Put the button wiring code in the correct order.",
        "js",
        ["console.log('hi');", "btn.addEventListener('click', () => {", "});"],
        ["btn.addEventListener('click', () => {", "console.log('hi');", "});"],
      ),
      mcq("jsf-d6", "Що робить event.preventDefault()?", "What does event.preventDefault() do?", ["stops default browser action", "deletes DOM", "closes tab", "compiles TS"], 0),
    ],
  ),
  exam("jsf-dom-exam", "Контрольна: DOM", "Exam: DOM", 2, [
    codeFill("jsf-de1", "Знайдіть елемент з класом x.", "Find the element with class x.", "js", "document.___('.x')", ["querySelector"], true),
    codeFill("jsf-de2", "Яку подію слухати для натискання?", "Which event do you listen to for a press?", "js", "addEventListener('___', fn)", ["click"], true),
    mcq("jsf-de3", "Що встановлює textContent?", "What does textContent set?", ["text of node", "CSS only", "SQL", "HTTP"], 0),
    codeFill("jsf-de4", "Знайдіть елемент за його id.", "Find an element by its id.", "js", "document.___('id')", ["getElementById"], true),
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
      codeFill("jsf-m1", "Зробіть функцію доступною для інших модулів.", "Make the function available to other modules.", "js", "___ function add() {}", ["export"], true),
      codeFill("jsf-m2", "Вкажіть шлях до модуля math.", "Give the path to the math module.", "js", "import { add } from './___';", ["math.js", "math", "lib"], false),
      mcq("jsf-m3", "Як імпортувати default-експорт?", "How do you import a default export?", ["import x from './m'", "import {default as} only illegal", "require only", "include"], 0),
    ],
  ),
  exam("jsf-mod-exam", "Контрольна: modules", "Exam: modules", 2, [
    codeFill("jsf-me1", "Експортуйте константу PI.", "Export the PI constant.", "js", "___ const PI = 3;", ["export"], true),
    mcq("jsf-me2", "Який синтаксис використовують ES-модулі?", "What syntax do ES modules use?", ["import/export", "only #include", "only CSS @import for JS", "FTP"], 0),
    codeFill("jsf-me3", "Яке ключове слово вказує, звідки імпортувати?", "Which keyword says where to import from?", "js", "import x ___ './a.js'", ["from"], true),
    mcq("jsf-me4", "Що таке side-effect import (import './x.js')?", "What is a side-effect import (import './x.js')?", ["import './polyfill.js'", "export type only", "delete module", "eval"], 0),
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
    mcq("jsf-ce1", "Що означає ===?", "What does === mean?", ["strict equality", "assign", "OR", "await"], 0),
    codeFill("jsf-ce2", "Перетворіть кожен елемент масиву функцією f.", "Transform every array element with f.", "js", "arr.___(f)", ["map"], true),
    codeFill("jsf-ce3", "Оголосіть асинхронну функцію.", "Declare an async function.", "js", "___ function f() {}", ["async"], true),
    codeFill("jsf-ce4", "Дочекайтеся значення Promise p.", "Wait for the value of Promise p.", "js", "const x = ___ p;", ["await"], true),
    codeFill("jsf-ce5", "Знайдіть перше посилання a за селектором.", "Find the first a link by selector.", "js", "document.___('a')", ["querySelector"], true),
    mcq("jsf-ce6", "Що обробляє .catch у Promise?", "What does .catch handle on a Promise?", ["handles reject", "maps array", "CSS", "SQL"], 0),
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
        "Яке ключове слово кидає помилку?",
        "Which keyword throws an error?",
        "js",
        "___ new Error('x');",
        ["throw"],
        true,
      ),
      codeRead(
        "jsf-e3",
        "Чи виконається finally, якщо в try є return?",
        "Does finally run when try contains return?",
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
        "На що вказує obj.__proto__?",
        "What does obj.__proto__ point to?",
        ["prototype of constructor", "global window always", "null always", "class name string"],
        0,
      ),
      codeFill(
        "jsf-e5",
        "Перевірте, що x — власна властивість обʼєкта (не з прототипу).",
        "Check that x is the object's own property (not inherited).",
        "js",
        "obj.___('x')",
        ["hasOwnProperty"],
        true,
      ),
      mcq(
        "jsf-e6",
        "На чому базується class extends?",
        "What is class extends based on?",
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
        "Яке слово перебирає значення масиву в циклі?",
        "Which word iterates over array values in the loop?",
        "js",
        "for (const x ___ arr) {}",
        ["of"],
        true,
      ),
      mcq(
        "jsf-e8",
        "Що перебирає for..in?",
        "What does for..in iterate over?",
        ["enumerable keys", "only values", "only Map", "DOM nodes only"],
        0,
      ),
      codeFill(
        "jsf-e9",
        "Який символ робить обʼєкт ітерованим?",
        "Which symbol makes an object iterable?",
        "js",
        "arr[Symbol.___]",
        ["iterator"],
        true,
      ),
    ],
  ),
  exam("jsf-errors-exam", "Контрольна: errors/proto", "Exam: errors/proto", 3, [
    mcq("jsf-ee1", "Що запускає throw?", "What does throw start?", ["exception flow", "CSS rule", "SQL row", "HTTP always"], 0),
    codeFill("jsf-ee2", "Перехопіть помилку з блоку try.", "Catch the error from the try block.", "js", "try {} ___ (e) {}", ["catch"], true),
    codeFill("jsf-ee3", "Перебирайте значення xs у циклі.", "Iterate over the values of xs.", "js", "for (const x ___ xs)", ["of"], true),
    mcq("jsf-ee4", "Про що механізм прототипів?", "What is the prototype mechanism about?", ["inheritance", "only JSON", "only CSS", "DB indexes"], 0),
  ]),
  lesson(
    "jsf-async-fetch-lite",
    "Async fetch lite",
    "Async fetch lite",
    3,
    false,
    [
      codeFill(
        "jsf-af1",
        "Дочекайтеся відповіді від fetch.",
        "Wait for the response from fetch.",
        "js",
        "const res = ___ fetch(url);",
        ["await"],
        true,
      ),
      mcq(
        "jsf-af2",
        "Що повертає res.json()?",
        "What does res.json() return?",
        ["a Promise", "sync object only", "CSS", "SQL cursor"],
        0,
      ),
      codeFill(
        "jsf-af3",
        "Зробіть функцію load асинхронною.",
        "Make the load function asynchronous.",
        "js",
        "___ function load() { return 1; }",
        ["async"],
        true,
      ),
      mcq(
        "jsf-af4",
        "Що означає HTTP-статус 404?",
        "What does HTTP status 404 mean?",
        ["not found", "OK", "redirect only", "server always down"],
        0,
      ),
    ],
  ),
]);

export const jsFundamentalsContent: CourseContent = {
  slug: "js_fundamentals",
  titleUk: "JavaScript: fundamentals",
  titleEn: "JavaScript Fundamentals",
  descriptionUk:
    "Глибокий JS: типи, operators, functions, arrays, objects, async/await, DOM, modules, errors/prototypes, замикання й event loop + контрольні.",
  descriptionEn:
    "Deep JS: types, operators, functions, arrays, objects, async/await, DOM, modules, errors/prototypes, closures & event loop + unit exams.",
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
    jsClosuresEventLoopUnit,
    capstone,
  ],
};
