/**
 * Deep-learning units (SPEC 90/91): every lesson opens with a concept card
 * (theory + key points + worked example), then retrieval practice, then a unit exam.
 */
import type { UnitContent } from "./types.js";
import {
  codeFill,
  codeOrder,
  codeOutputMcq,
  codeRead,
  concept,
  exam,
  explain,
  lesson,
  matchEx,
  mcq,
  unit,
} from "./builders.js";

/* ——— JS: closures, this, event loop ——— */
export const jsClosuresEventLoopUnit: UnitContent = unit(
  "closures_event_loop",
  "Замикання, this і event loop",
  "Closures, this & the event loop",
  [
    lesson("jsf-closures", "Замикання", "Closures", 3, false, [
      concept(
        "jsf-cl-c1",
        "Що таке замикання",
        "What a closure is",
        {
          uk: "Замикання — це функція разом із лексичним оточенням, у якому її створили. Внутрішня функція «памʼятає» змінні зовнішньої функції навіть після того, як зовнішня завершилась.\n\nЦе основа приватного стану, фабрик функцій, мемоізації та обробників подій.",
          en: "A closure is a function bundled with the lexical environment it was created in. The inner function \"remembers\" the outer function's variables even after the outer function has returned.\n\nIt powers private state, function factories, memoization and event handlers.",
        },
        {
          keyPointsUk: [
            "Область видимості визначається місцем оголошення, а не виклику",
            "Кожен виклик зовнішньої функції створює нове оточення",
            "let у циклі створює нову змінну на кожній ітерації",
          ],
          keyPointsEn: [
            "Scope is defined where a function is declared, not where it is called",
            "Each call of the outer function creates a new environment",
            "let in a loop creates a fresh binding per iteration",
          ],
          language: "javascript",
          code: "function counter() {\n  let n = 0;\n  return () => ++n;\n}\nconst next = counter();\nnext(); // 1\nnext(); // 2",
          check: {
            qUk: "Що поверне третій виклик next()?",
            qEn: "What does the third call to next() return?",
            options: ["3", "1", "undefined", "NaN"],
            correctIndex: 0,
          },
        },
      ),
      codeOutputMcq(
        "jsf-cl-1",
        "Що виведе код?",
        "What does the code print?",
        "javascript",
        "const fns = [];\nfor (var i = 0; i < 3; i++) fns.push(() => i);\nconsole.log(fns.map((f) => f()).join(','));",
        ["3,3,3", "0,1,2", "undefined", "0,0,0"],
        0,
        {
          explanationUk: "var має одну змінну на всю функцію — усі стрілки бачать i = 3.",
          explanationEn: "var has one binding for the whole function — every arrow sees i = 3.",
        },
      ),
      codeFill(
        "jsf-cl-2",
        "Виправте цикл, щоб отримати 0,1,2",
        "Fix the loop to get 0,1,2",
        "javascript",
        "for (___ i = 0; i < 3; i++) fns.push(() => i);",
        ["let"],
        true,
        {
          explanationUk: "let створює нову змінну на кожній ітерації.",
          explanationEn: "let creates a new binding on each iteration.",
        },
      ),
      mcq(
        "jsf-cl-3",
        "Для чого найчастіше використовують замикання?",
        "What are closures most often used for?",
        [
          "Приватний стан і фабрики функцій",
          "Пришвидшення CSS",
          "Створення таблиць у БД",
          "Заміна HTTP-запитів",
        ],
        0,
      ),
      explain(
        "jsf-cl-x1",
        "Поясніть своїми словами: що таке замикання і чому лічильник counter() памʼятає n?",
        "Explain in your own words: what is a closure and why does counter() remember n?",
        [
          { labelUk: "внутрішня функція", labelEn: "inner function", anyOf: ["функці", "function", "стрілк", "arrow"] },
          { labelUk: "зовнішня змінна / оточення", labelEn: "outer variable / environment", anyOf: ["зовнішн", "outer", "оточенн", "environment", "scope", "област", "лексичн", "lexical"] },
          { labelUk: "після завершення зовнішньої функції", labelEn: "after the outer function returns", anyOf: ["після", "after", "return", "заверш", "finished"] },
        ],
        {
          minWords: 12,
          sampleAnswerUk:
            "Замикання — це внутрішня функція, яка зберігає доступ до змінних зовнішньої функції (її лексичного оточення) навіть після того, як зовнішня функція завершилась. Тому стрілка з counter() бачить ту саму n і збільшує її.",
          sampleAnswerEn:
            "A closure is an inner function that keeps access to the outer function's variables (its lexical environment) even after the outer function has returned. That is why the arrow from counter() still sees the same n and increments it.",
        },
      ),
    ]),
    lesson("jsf-this", "this і bind", "this & bind", 3, false, [
      concept(
        "jsf-cl-c2",
        "Як визначається this",
        "How this is determined",
        {
          uk: "Значення this у звичайній функції залежить від способу виклику: obj.method() → this = obj; просто fn() → undefined у strict mode. Стрілкові функції не мають власного this — вони беруть його з місця оголошення.\n\nbind/call/apply задають this явно.",
          en: "In a regular function this depends on how it is called: obj.method() → this = obj; plain fn() → undefined in strict mode. Arrow functions have no own this — they take it from where they were defined.\n\nbind/call/apply set this explicitly.",
        },
        {
          keyPointsUk: [
            "Метод, відірваний від обʼєкта, втрачає this",
            "Стрілки — лексичний this",
            "bind повертає нову функцію з фіксованим this",
          ],
          keyPointsEn: [
            "A method detached from its object loses this",
            "Arrows use lexical this",
            "bind returns a new function with a fixed this",
          ],
          language: "javascript",
          code: "const user = { name: 'Ann', hi() { return this.name; } };\nconst hi = user.hi;\nhi(); // undefined (strict) — lost this\nuser.hi.bind(user)(); // 'Ann'",
        },
      ),
      codeRead(
        "jsf-cl-4",
        "Що поверне user.later() через 0 мс?",
        "What does user.later() resolve to?",
        "javascript",
        "const user = {\n  name: 'Ann',\n  later() {\n    return new Promise((r) => setTimeout(() => r(this.name), 0));\n  },\n};",
        ["'Ann' — стрілка бере this з later()", "undefined", "TypeError", "'' (порожній рядок)"],
        0,
      ),
      codeFill(
        "jsf-cl-5",
        "Зафіксуйте this для обробника кліку.",
        "Bind this for the click handler.",
        "javascript",
        "button.addEventListener('click', user.hi.___(user));",
        ["bind"],
        true,
      ),
      matchEx("jsf-cl-6", "Зіставте виклик і this", "Match the call to this", [
        { left: "obj.m()", right: "obj" },
        { left: "fn() (strict)", right: "undefined" },
        { left: "fn.call(x)", right: "x" },
      ]),
    ]),
    lesson("jsf-event-loop", "Event loop і мікрозадачі", "Event loop & microtasks", 4, false, [
      concept(
        "jsf-cl-c3",
        "Черги задач",
        "Task queues",
        {
          uk: "JS виконує один стек викликів. Коли стек порожній, event loop спершу виконує ВСІ мікрозадачі (Promise.then, queueMicrotask, await-продовження), а потім бере одну макрозадачу (setTimeout, I/O, події).\n\nТому Promise.then завжди спрацює раніше за setTimeout(..., 0).",
          en: "JS runs one call stack. When the stack is empty, the event loop first drains ALL microtasks (Promise.then, queueMicrotask, await continuations), then takes one macrotask (setTimeout, I/O, events).\n\nThat is why Promise.then always runs before setTimeout(..., 0).",
        },
        {
          keyPointsUk: [
            "Синхронний код → мікрозадачі → макрозадача",
            "await ділить функцію: решта — мікрозадача",
            "Довгий синхронний цикл блокує UI",
          ],
          keyPointsEn: [
            "Sync code → microtasks → one macrotask",
            "await splits a function: the rest is a microtask",
            "A long synchronous loop blocks the UI",
          ],
          language: "javascript",
          code: "console.log('A');\nsetTimeout(() => console.log('B'), 0);\nPromise.resolve().then(() => console.log('C'));\nconsole.log('D');\n// A D C B",
        },
      ),
      codeOutputMcq(
        "jsf-cl-7",
        "Порядок виводу?",
        "Output order?",
        "javascript",
        "setTimeout(() => console.log(1));\nqueueMicrotask(() => console.log(2));\nconsole.log(3);",
        ["3 2 1", "1 2 3", "3 1 2", "2 3 1"],
        0,
      ),
      codeOrder(
        "jsf-cl-8",
        "Розставте вивід у правильному порядку",
        "Put the output in the correct order",
        "javascript",
        ["timeout", "sync", "then"],
        ["sync", "then", "timeout"],
        {
          explanationUk: "Код: setTimeout(timeout); Promise.then(then); console.log(sync).",
          explanationEn: "Code: setTimeout(timeout); Promise.then(then); console.log(sync).",
        },
      ),
      mcq(
        "jsf-cl-9",
        "Що блокує інтерфейс браузера?",
        "What blocks the browser UI?",
        [
          "Довгий синхронний цикл у головному потоці",
          "await fetch()",
          "setTimeout з 1000 мс",
          "Promise.resolve()",
        ],
        0,
      ),
      explain(
        "jsf-cl-x2",
        "Поясніть своїми словами, чому Promise.then спрацьовує раніше за setTimeout(..., 0).",
        "Explain in your own words why Promise.then runs before setTimeout(..., 0).",
        [
          { labelUk: "мікрозадачі", labelEn: "microtasks", anyOf: ["мікро", "micro"] },
          { labelUk: "макрозадачі / таймери", labelEn: "macrotasks / timers", anyOf: ["макро", "macro", "таймер", "timer", "settimeout", "task queue", "черг"] },
          { labelUk: "порожній стек / event loop", labelEn: "empty stack / event loop", anyOf: ["стек", "stack", "event loop", "цикл подій", "loop"] },
        ],
        {
          minWords: 12,
          sampleAnswerUk:
            "Коли стек викликів порожній, event loop спочатку виконує всі мікрозадачі (Promise.then), і лише потім бере наступну макрозадачу з черги таймерів (setTimeout). Тому then завжди раніше.",
          sampleAnswerEn:
            "When the call stack is empty the event loop first drains all microtasks (Promise.then) and only then takes the next macrotask from the timer queue (setTimeout), so then always runs first.",
        },
      ),
    ]),
    exam("jsf-closures-exam", "Контрольна: замикання й event loop", "Exam: closures & event loop", 4, [
      mcq(
        "jsf-cle-1",
        "Замикання памʼятає:",
        "A closure remembers:",
        ["змінні лексичного оточення", "лише глобальні змінні", "DOM", "історію викликів"],
        0,
      ),
      codeOutputMcq(
        "jsf-cle-2",
        "Який буде порядок виводу?",
        "What is the output order?",
        "javascript",
        "Promise.resolve().then(() => console.log('p'));\nsetTimeout(() => console.log('t'));\nconsole.log('s');",
        ["s p t", "p s t", "t p s", "s t p"],
        0,
      ),
      codeFill("jsf-cle-3", "Допишіть стрілку з лексичним this.", "Complete the arrow with lexical this.", "javascript", "const f = () ___ this;", ["=>"], true),
      mcq(
        "jsf-cle-4",
        "Мікрозадачі виконуються:",
        "Microtasks run:",
        ["усі, перед наступною макрозадачею", "по одній на секунду", "лише після setTimeout", "ніколи в браузері"],
        0,
      ),
      codeFill("jsf-cle-5", "Блочна змінна в циклі", "Block binding in a loop", "javascript", "for (___ i = 0; i < n; i++) {}", ["let"], true),
    ]),
  ],
);

/* ——— TypeScript: advanced types ——— */
export const tsAdvancedTypesUnit: UnitContent = unit(
  "advanced_types",
  "Просунуті типи",
  "Advanced types",
  [
    lesson("tsc-conditional", "Conditional types та infer", "Conditional types & infer", 4, false, [
      concept(
        "tsc-adv-c1",
        "Умовні типи",
        "Conditional types",
        {
          uk: "Умовний тип має форму T extends U ? X : Y — «якщо T сумісний з U, то X, інакше Y». Для union він розподіляється по кожному члену (distributive).\n\ninfer дозволяє «витягти» частину типу всередині умови, наприклад тип результату Promise.",
          en: "A conditional type has the form T extends U ? X : Y — \"if T is assignable to U then X else Y\". On a union it distributes over each member.\n\ninfer lets you extract part of a type inside the condition, e.g. the value type of a Promise.",
        },
        {
          keyPointsUk: [
            "extends у типах = перевірка сумісності",
            "Union розподіляється по членах",
            "infer оголошує змінну типу в шаблоні",
          ],
          keyPointsEn: [
            "extends in types = assignability check",
            "Unions distribute over members",
            "infer declares a type variable inside the pattern",
          ],
          language: "typescript",
          code: "type Awaited2<T> = T extends Promise<infer V> ? V : T;\ntype A = Awaited2<Promise<number>>; // number\ntype IsStr<T> = T extends string ? true : false;\ntype B = IsStr<'a' | 1>; // boolean (true | false)",
          check: {
            qUk: "Що дасть Awaited2<string>?",
            qEn: "What is Awaited2<string>?",
            options: ["string", "never", "Promise<string>", "unknown"],
            correctIndex: 0,
          },
        },
      ),
      codeFill(
        "tsc-adv-1",
        "Витягніть тип елемента масиву",
        "Extract the array element type",
        "typescript",
        "type Elem<T> = T extends (___ U)[] ? U : never;",
        ["infer"],
        true,
      ),
      codeRead(
        "tsc-adv-2",
        "Чому дорівнює R?",
        "What is R?",
        "typescript",
        "type NonNull<T> = T extends null | undefined ? never : T;\ntype R = NonNull<string | null | undefined>;",
        ["string", "never", "string | null", "unknown"],
        0,
      ),
      mcq(
        "tsc-adv-3",
        "Distributive conditional type означає:",
        "A distributive conditional type means:",
        [
          "умова застосовується до кожного члена union окремо",
          "тип копіюється в runtime",
          "тип стає any",
          "умова виконується лише в JS",
        ],
        0,
      ),
      explain(
        "tsc-adv-x1",
        "Поясніть своїми словами, як працює infer в умовному типі Awaited2<T>.",
        "Explain in your own words how infer works in the conditional type Awaited2<T>.",
        [
          { labelUk: "умова extends", labelEn: "extends condition", anyOf: ["extends", "умов", "condition", "сумісн", "assignab"] },
          { labelUk: "infer витягує тип", labelEn: "infer extracts a type", anyOf: ["infer", "витяг", "extract", "вивод"] },
          { labelUk: "інакше повертає T", labelEn: "otherwise returns T", anyOf: ["інакше", "otherwise", "else", ": t", "сам t", "itself"] },
        ],
        {
          minWords: 12,
          sampleAnswerUk:
            "Awaited2 перевіряє умову T extends Promise<infer V>: якщо T — проміс, infer витягує тип значення V і повертає його, інакше повертає сам T.",
          sampleAnswerEn:
            "Awaited2 checks T extends Promise<infer V>: if T is a promise, infer extracts the value type V and returns it; otherwise it returns T itself.",
        },
      ),
    ]),
    lesson("tsc-mapped", "Mapped types", "Mapped types", 4, false, [
      concept(
        "tsc-adv-c2",
        "Типи-відображення",
        "Mapped types",
        {
          uk: "Mapped type проходить по ключах іншого типу: { [K in keyof T]: … }. Так побудовані Partial, Readonly, Record.\n\nМодифікатори ? і readonly можна додавати (+) або знімати (-), а через as — перейменовувати ключі.",
          en: "A mapped type iterates over the keys of another type: { [K in keyof T]: … }. Partial, Readonly and Record are built this way.\n\nThe ? and readonly modifiers can be added (+) or removed (-), and keys can be remapped with as.",
        },
        {
          keyPointsUk: ["keyof T — union ключів", "-? робить поле обовʼязковим", "as дозволяє фільтрувати/перейменовувати ключі"],
          keyPointsEn: ["keyof T is the union of keys", "-? makes a field required", "as lets you filter/rename keys"],
          language: "typescript",
          code: "type Mutable<T> = { -readonly [K in keyof T]: T[K] };\ntype Getters<T> = {\n  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];\n};",
        },
      ),
      codeFill(
        "tsc-adv-4",
        "Власний Partial",
        "Your own Partial",
        "typescript",
        "type MyPartial<T> = { [K in ___ T]?: T[K] };",
        ["keyof"],
        true,
      ),
      matchEx("tsc-adv-5", "Утиліта → суть", "Utility → meaning", [
        { left: "Readonly<T>", right: "{ readonly [K in keyof T]: T[K] }" },
        { left: "Required<T>", right: "{ [K in keyof T]-?: T[K] }" },
        { left: "Record<K, V>", right: "{ [P in K]: V }" },
      ]),
      codeRead(
        "tsc-adv-6",
        "Які ключі має Getters<{ age: number }>?",
        "Which keys does Getters<{ age: number }> have?",
        "typescript",
        "type Getters<T> = {\n  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];\n};",
        ["getAge", "age", "getage", "get"],
        0,
      ),
    ]),
    lesson("tsc-template-literal", "Template literal types", "Template literal types", 4, false, [
      concept(
        "tsc-adv-c3",
        "Шаблонні рядкові типи",
        "Template literal types",
        {
          uk: "Template literal types складають рядкові типи як шаблонні рядки: `on${Capitalize<E>}`. Union у шаблоні дає всі комбінації.\n\nЦе дозволяє типізувати імена подій, CSS-змінні, маршрути API.",
          en: "Template literal types compose string types like template strings: `on${Capitalize<E>}`. A union inside the template yields every combination.\n\nThey type event names, CSS variables and API routes.",
        },
        {
          keyPointsUk: ["Union × union = декартів добуток", "Uppercase / Lowercase / Capitalize — вбудовані", "Працює разом з infer для парсингу"],
          keyPointsEn: ["Union × union = cartesian product", "Uppercase / Lowercase / Capitalize are built in", "Combine with infer to parse strings"],
          language: "typescript",
          code: "type Size = 'sm' | 'lg';\ntype Color = 'red' | 'blue';\ntype Cls = `${Size}-${Color}`; // 4 variants",
        },
      ),
      mcq(
        "tsc-adv-7",
        "Скільки варіантів у `${'a'|'b'}-${'x'|'y'|'z'}`?",
        "How many members in `${'a'|'b'}-${'x'|'y'|'z'}`?",
        ["6", "5", "2", "3"],
        0,
      ),
      codeFill(
        "tsc-adv-8",
        "Ім'я обробника події",
        "Event handler name",
        "typescript",
        "type Handler<E extends string> = `on${___<E>}`;",
        ["Capitalize"],
        true,
      ),
      codeRead(
        "tsc-adv-9",
        "Чому дорівнює P?",
        "What is P?",
        "typescript",
        "type Param<S> = S extends `/users/${infer Id}` ? Id : never;\ntype P = Param<'/users/42'>;",
        ["'42'", "number", "never", "string"],
        0,
      ),
    ]),
    exam("tsc-advanced-exam", "Контрольна: просунуті типи", "Exam: advanced types", 4, [
      codeFill("tsc-adve-1", "infer", "infer", "typescript", "type R<T> = T extends () => ___ U ? U : never;", ["infer"], true),
      mcq(
        "tsc-adve-2",
        "-? у mapped type:",
        "-? in a mapped type:",
        ["знімає опціональність", "додає null", "робить поле readonly", "видаляє ключ"],
        0,
      ),
      codeFill("tsc-adve-3", "keyof", "keyof", "typescript", "type Keys<T> = ___ T;", ["keyof"], true),
      mcq(
        "tsc-adve-4",
        "`${'GET'|'POST'} /api` містить:",
        "`${'GET'|'POST'} /api` contains:",
        ["'GET /api' | 'POST /api'", "лише string", "never", "'GET' | 'POST'"],
        0,
      ),
      codeRead(
        "tsc-adve-5",
        "X = ?",
        "X = ?",
        "typescript",
        "type X = (string | number) extends string ? 'yes' : 'no';",
        ["'no' — без generic немає розподілу", "'yes'", "'yes' | 'no'", "never"],
        0,
      ),
    ]),
  ],
);

/* ——— SQL: CTE & performance ——— */
export const sqlCtePerformanceUnit: UnitContent = unit(
  "cte-performance",
  "CTE, індекси та EXPLAIN",
  "CTEs, indexes & EXPLAIN",
  [
    lesson("sqlf-cte", "WITH (CTE)", "WITH (CTE)", 3, false, [
      concept(
        "sqlf-cte-c1",
        "Common Table Expressions",
        "Common Table Expressions",
        {
          uk: "CTE (WITH name AS (...)) — іменований підзапит, видимий у наступному SELECT. Він робить складні запити читабельними: кожен крок має назву.\n\nWITH RECURSIVE дозволяє обходити ієрархії (дерево категорій, орг-структура).",
          en: "A CTE (WITH name AS (...)) is a named subquery visible to the following SELECT. It makes complex queries readable: every step gets a name.\n\nWITH RECURSIVE walks hierarchies (category trees, org charts).",
        },
        {
          keyPointsUk: ["CTE живе лише в межах одного запиту", "Кілька CTE розділяються комами", "RECURSIVE = якірна частина UNION ALL рекурсивна"],
          keyPointsEn: ["A CTE lives only within one statement", "Separate several CTEs with commas", "RECURSIVE = anchor UNION ALL recursive part"],
          language: "sql",
          code: "WITH paid AS (\n  SELECT user_id, SUM(amount) AS total\n  FROM orders WHERE status = 'paid'\n  GROUP BY user_id\n)\nSELECT u.email, p.total\nFROM users u JOIN paid p ON p.user_id = u.id\nWHERE p.total > 100;",
        },
      ),
      codeFill(
        "sqlf-cte-1",
        "Почніть CTE",
        "Start a CTE",
        "sql",
        "___ recent AS (SELECT * FROM orders WHERE created_at > now() - interval '7 days')\nSELECT count(*) FROM recent;",
        ["WITH", "with"],
        false,
      ),
      codeOrder(
        "sqlf-cte-2",
        "Складіть запит з CTE",
        "Assemble the CTE query",
        "sql",
        ["SELECT * FROM top_users;", "WITH top_users AS (", ")", "  SELECT user_id FROM orders GROUP BY user_id HAVING count(*) > 5"],
        ["WITH top_users AS (", "  SELECT user_id FROM orders GROUP BY user_id HAVING count(*) > 5", ")", "SELECT * FROM top_users;"],
      ),
      mcq(
        "sqlf-cte-3",
        "Для дерева категорій (parent_id) потрібен:",
        "To walk a category tree (parent_id) you need:",
        ["WITH RECURSIVE", "GROUP BY", "DISTINCT", "LIMIT"],
        0,
      ),
    ]),
    lesson("sqlf-indexes", "Індекси", "Indexes", 3, false, [
      concept(
        "sqlf-cte-c2",
        "Як працює B-tree індекс",
        "How a B-tree index works",
        {
          uk: "Індекс — відсортована структура (зазвичай B-tree), що дозволяє знайти рядки за O(log n) замість повного сканування таблиці.\n\nСкладений індекс (a, b) допомагає умовам на a або на a і b, але не лише на b (правило лівого префікса). Кожен індекс сповільнює INSERT/UPDATE.",
          en: "An index is a sorted structure (usually a B-tree) that finds rows in O(log n) instead of a full table scan.\n\nA composite index (a, b) helps filters on a, or on a and b, but not on b alone (leftmost-prefix rule). Every index slows down INSERT/UPDATE.",
        },
        {
          keyPointsUk: ["Індексуйте колонки з WHERE / JOIN / ORDER BY", "Правило лівого префікса", "Функція над колонкою (lower(email)) вимикає звичайний індекс"],
          keyPointsEn: ["Index columns used in WHERE / JOIN / ORDER BY", "Leftmost-prefix rule", "A function on the column (lower(email)) disables a plain index"],
          language: "sql",
          code: "CREATE INDEX orders_user_created_idx\n  ON orders (user_id, created_at);",
        },
      ),
      codeFill(
        "sqlf-cte-4",
        "Створіть індекс",
        "Create an index",
        "sql",
        "CREATE ___ users_email_idx ON users (email);",
        ["INDEX", "index"],
        false,
      ),
      mcq(
        "sqlf-cte-5",
        "Індекс (user_id, created_at) НЕ допоможе запиту:",
        "Index (user_id, created_at) will NOT help:",
        [
          "WHERE created_at > '2026-01-01' (без user_id)",
          "WHERE user_id = 7",
          "WHERE user_id = 7 AND created_at > now() - interval '1 day'",
          "WHERE user_id = 7 ORDER BY created_at",
        ],
        0,
      ),
      mcq(
        "sqlf-cte-6",
        "Ціна зайвих індексів:",
        "The cost of extra indexes:",
        ["повільніші INSERT/UPDATE і більше місця", "повільніший SELECT завжди", "втрата даних", "неможливість JOIN"],
        0,
      ),
      explain(
        "sqlf-cte-x1",
        "Поясніть своїми словами, коли індекс прискорює запит і чому не варто індексувати все.",
        "Explain in your own words when an index speeds up a query and why you should not index everything.",
        [
          { labelUk: "пошук без повного сканування", labelEn: "lookup without a full scan", anyOf: ["скан", "scan", "log", "швидш", "faster", "пошук", "lookup", "b-tree", "btree"] },
          { labelUk: "колонки WHERE / JOIN / ORDER BY", labelEn: "WHERE / JOIN / ORDER BY columns", anyOf: ["where", "join", "order by", "фільтр", "filter"] },
          { labelUk: "ціна запису", labelEn: "write cost", anyOf: ["insert", "update", "запис", "write", "місц", "space", "повільн", "slower"] },
        ],
        {
          minWords: 15,
          sampleAnswerUk:
            "Індекс (B-tree) дозволяє знайти рядки без повного сканування таблиці, тому корисний для колонок у WHERE, JOIN і ORDER BY. Але кожен індекс займає місце і робить INSERT/UPDATE повільнішими, тому індексують лише потрібне.",
          sampleAnswerEn:
            "An index (B-tree) finds rows without a full table scan, so it helps columns used in WHERE, JOIN and ORDER BY. But every index takes space and makes INSERT/UPDATE slower, so you index only what queries need.",
        },
      ),
    ]),
    lesson("sqlf-explain", "EXPLAIN", "EXPLAIN", 4, false, [
      concept(
        "sqlf-cte-c3",
        "Читаємо план запиту",
        "Reading a query plan",
        {
          uk: "EXPLAIN показує план, який обрав оптимізатор; EXPLAIN ANALYZE ще й виконує запит і показує реальний час і кількість рядків.\n\nSeq Scan на великій таблиці при вибірці кількох рядків — сигнал додати індекс. Index Scan / Index Only Scan — індекс використано.",
          en: "EXPLAIN shows the plan chosen by the optimizer; EXPLAIN ANALYZE also runs the query and shows real time and row counts.\n\nA Seq Scan on a big table while selecting a few rows is a hint to add an index. Index Scan / Index Only Scan means the index is used.",
        },
        {
          keyPointsUk: ["EXPLAIN ANALYZE реально виконує запит", "Порівнюйте rows (оцінка) з actual rows", "Seq Scan не завжди поганий на малих таблицях"],
          keyPointsEn: ["EXPLAIN ANALYZE really runs the query", "Compare estimated rows with actual rows", "A Seq Scan is fine on small tables"],
          language: "sql",
          code: "EXPLAIN ANALYZE\nSELECT * FROM orders WHERE user_id = 42;\n-- Index Scan using orders_user_created_idx on orders ...",
        },
      ),
      codeFill(
        "sqlf-cte-7",
        "Подивіться реальний час виконання",
        "See real execution time",
        "sql",
        "EXPLAIN ___ SELECT * FROM orders WHERE user_id = 42;",
        ["ANALYZE", "analyze"],
        false,
      ),
      matchEx("sqlf-cte-8", "Вузол плану → значення", "Plan node → meaning", [
        { left: "Seq Scan", right: "читає всю таблицю" },
        { left: "Index Scan", right: "шукає через індекс" },
        { left: "Hash Join", right: "зʼєднання через хеш-таблицю" },
      ]),
      mcq(
        "sqlf-cte-9",
        "WHERE lower(email) = 'a@b.c' не використовує індекс на email. Рішення:",
        "WHERE lower(email) = 'a@b.c' ignores the email index. Fix:",
        ["індекс на вираз: CREATE INDEX ... ON users (lower(email))", "додати LIMIT 1", "DISTINCT", "ORDER BY email"],
        0,
      ),
    ]),
    exam("sqlf-cte-exam", "Контрольна: CTE і продуктивність", "Exam: CTEs & performance", 4, [
      codeFill("sqlf-ctee-1", "CTE", "CTE", "sql", "___ t AS (SELECT 1) SELECT * FROM t;", ["WITH", "with"], false),
      mcq(
        "sqlf-ctee-2",
        "Ієрархію обходять через:",
        "Hierarchies are walked with:",
        ["WITH RECURSIVE", "HAVING", "UNION без ALL лише", "CROSS JOIN"],
        0,
      ),
      mcq(
        "sqlf-ctee-3",
        "Правило лівого префікса стосується:",
        "The leftmost-prefix rule is about:",
        ["складених індексів", "назв таблиць", "транзакцій", "GRANT"],
        0,
      ),
      codeFill("sqlf-ctee-4", "План з виконанням", "Plan with execution", "sql", "EXPLAIN ___ SELECT 1;", ["ANALYZE", "analyze"], false),
      mcq(
        "sqlf-ctee-5",
        "Seq Scan по 10 млн рядків, щоб знайти 1 рядок, означає:",
        "A Seq Scan over 10M rows to find 1 row means:",
        ["ймовірно бракує індексу", "запит оптимальний", "таблиця порожня", "індекс зламався завжди"],
        0,
      ),
    ]),
  ],
);

/* ——— English: learning skills ——— */
export const englishLearningSkillsUnit: UnitContent = unit(
  "learning-skills",
  "Як ми вчимося",
  "Learning skills",
  [
    lesson("learning-talk", "Говоримо про навчання", "Talking about learning", 2, false, [
      concept(
        "en-ls-c1",
        "Лексика навчання",
        "Study vocabulary",
        {
          uk: "Щоб говорити про навчання англійською, потрібні дієслова learn (вчити щось нове), study (систематично вивчати), practise/practice (тренувати), review/revise (повторювати), memorize (запамʼятовувати).\n\nНаукові техніки: spaced repetition — інтервальне повторення; retrieval practice — пригадування без підглядання.",
          en: "To talk about learning you need the verbs learn (acquire something new), study (work on a subject), practise/practice (train), review/revise (go over again) and memorize (commit to memory).\n\nEvidence-based techniques: spaced repetition and retrieval practice.",
        },
        {
          keyPointsUk: ["learn ≠ teach", "review (US) = revise (UK)", "practice — іменник, practise — дієслово (UK)"],
          keyPointsEn: ["learn ≠ teach", "review (US) = revise (UK)", "practice is the noun, practise the verb (UK)"],
        },
      ),
      {
        id: "en-ls-1",
        type: "match",
        promptUk: "Зіставте слова",
        promptEn: "Match the words",
        pairs: [
          { left: "review", right: "повторювати" },
          { left: "memorize", right: "запамʼятовувати" },
          { left: "spaced repetition", right: "інтервальне повторення" },
        ],
      },
      {
        id: "en-ls-2",
        type: "fill_blank",
        promptUk: "I ___ English every morning for twenty minutes.",
        promptEn: "I ___ English every morning for twenty minutes.",
        sentence: "I ___ English every morning for twenty minutes.",
        accepted: ["study", "practise", "practice", "learn"],
      },
      {
        id: "en-ls-3",
        type: "mcq",
        promptUk: "Яке речення правильне?",
        promptEn: "Which sentence is correct?",
        options: [
          "My teacher taught me a useful trick.",
          "My teacher learned me a useful trick.",
          "My teacher teached me a useful trick.",
          "My teacher learnt me a useful trick.",
        ],
        correctIndex: 0,
        explanationUk: "teach — навчати когось (taught); learn — вчитися самому.",
        explanationEn: "teach someone (taught); learn yourself.",
      },
      explain(
        "en-ls-x1",
        "Describe in English how you study (at least 10 words). Use: study / practise / review.",
        "Describe in English how you study (at least 10 words). Use: study / practise / review.",
        [
          { labelUk: "study", labelEn: "study", anyOf: ["study", "studied", "learn"] },
          { labelUk: "practise / practice", labelEn: "practise / practice", anyOf: ["practis", "practic"] },
          { labelUk: "review / revise", labelEn: "review / revise", anyOf: ["review", "revis", "repeat"] },
        ],
        {
          minWords: 10,
          passRatio: 0.66,
          sampleAnswerUk: "I study English every morning, practise speaking with a friend and review new words in the evening.",
          sampleAnswerEn: "I study English every morning, practise speaking with a friend and review new words in the evening.",
        },
      ),
    ]),
    lesson("study-phrasal", "Фразові дієслова для навчання", "Phrasal verbs for studying", 3, false, [
      concept(
        "en-ls-c2",
        "Фразові дієслова",
        "Phrasal verbs",
        {
          uk: "Фразові дієслова часто звучать у розмовах про навчання: look up (знайти в словнику), go over (переглянути ще раз), catch up (наздогнати), figure out (розібратися), brush up on (освіжити знання).",
          en: "Phrasal verbs are common when talking about studying: look up, go over, catch up, figure out, brush up on.",
        },
        {
          keyPointsUk: ["look a word up / look up a word", "brush up on + noun", "figure out = зрозуміти самостійно"],
          keyPointsEn: ["look a word up / look up a word", "brush up on + noun", "figure out = understand by yourself"],
          check: {
            qUk: "«Освіжити граматику» англійською:",
            qEn: "\"Refresh my grammar\" as a phrasal verb:",
            options: ["brush up on my grammar", "brush off my grammar", "look over my grammar up", "catch my grammar"],
            correctIndex: 0,
          },
        },
      ),
      {
        id: "en-ls-4",
        type: "fill_blank",
        promptUk: "If you don't know a word, look it ___ in a dictionary.",
        promptEn: "If you don't know a word, look it ___ in a dictionary.",
        sentence: "If you don't know a word, look it ___ in a dictionary.",
        accepted: ["up"],
      },
      {
        id: "en-ls-5",
        type: "order_words",
        promptUk: "Let's go over the notes again",
        promptEn: "Order: Let's go over the notes again",
        words: ["over", "Let's", "notes", "go", "the", "again"],
        correct: ["Let's", "go", "over", "the", "notes", "again"],
      },
      {
        id: "en-ls-6",
        type: "translate",
        promptUk: "Перекладіть: Мені треба наздогнати групу.",
        promptEn: "Translate: Мені треба наздогнати групу.",
        source: "Мені треба наздогнати групу.",
        accepted: [
          "I need to catch up with the group",
          "I need to catch up with the group.",
          "I have to catch up with the group",
          "I have to catch up with the group.",
        ],
        direction: "uk_en",
      },
    ]),
  ],
);
