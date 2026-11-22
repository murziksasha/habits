import type { CourseContent, Exercise } from "./types.js";
import {
  codeFill,
  codeOrder,
  codeProject,
  codeRead,
  concept,
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
      concept("nf-runtime-concept", "Node.js і JavaScript", "Node.js and JavaScript", {
        uk: "Node.js — середовище виконання JavaScript поза браузером. Воно використовує рушій V8 та надає власні API, зокрема доступ до файлів і мережі та об'єкт process. Node.js не є браузером: browser API на кшталт document не з'являються автоматично. На ньому створюють сервери, CLI та інструменти збірки. process.version показує версію Node.js; перевірка в уроці оцінює фрагменти, а не запускає сервер.",
        en: "Node.js is a JavaScript runtime outside the browser. It uses the V8 engine and provides its own APIs, including file and network access and the process object. Node.js is not a browser: browser APIs such as document are not automatically present. It is used for servers, CLIs, and build tools. process.version reports the Node.js version; this lesson grades snippets rather than running a server.",
      }),
      {
        ...mcq(
        "nf-r1",
        "Node.js — це:",
        "Node.js is:",
        ["Середовище виконання JavaScript поза браузером", "Лише браузерний рушій", "База даних SQL", "Препроцесор CSS"],
        0,
        { explanationUk: "Node.js використовує V8 і надає API середовища виконання.", explanationEn: "Node.js uses V8 and provides runtime APIs." },
        ),
        optionsEn: ["A JavaScript runtime outside the browser", "Only a browser engine", "A SQL database", "A CSS preprocessor"],
      },
      {
        ...mcq(
        "nf-r2",
        "Типові сфери використання Node.js:",
        "Typical use cases:",
        ["API, CLI, інструменти та сервери", "Лише GPU-шейдери", "Лише Excel", "Лише мобільний UI kit"],
        0,
        { explanationUk: "Node.js застосовують і для серверів, і для інструментів командного рядка.", explanationEn: "Node.js is used for both servers and command-line tools." },
        ),
        optionsEn: ["APIs, CLI tools, build tools, and servers", "Only GPU shaders", "Only Excel", "Only a mobile UI kit"],
      },
      codeFill("nf-r3", "Допишіть об'єкт із версією Node.js. Впишіть лише назву.", "Complete the object that exposes the Node.js version. Enter only its name.", "js", "console.log(___.version);", ["process"], true, { explanationUk: "process.version містить версію Node.js.", explanationEn: "process.version contains the Node.js version." }),
      { ...mcq("nf-r7", "Чи доступний document у звичайному Node.js-процесі без додаткового DOM-середовища?", "Is document available in a normal Node.js process without an added DOM environment?", ["Ні, це browser API", "Так, Node.js завжди створює DOM", "Так, якщо є process", "Лише через SQL"], 0, { explanationUk: "Для document потрібне браузерне або спеціально надане DOM-середовище.", explanationEn: "document requires a browser or an explicitly provided DOM environment." }), optionsEn: ["No, it is a browser API", "Yes, Node.js always creates a DOM", "Yes, whenever process exists", "Only through SQL"] },
    ],
  ),
  lesson(
    "nf-repl-cli",
    "node CLI",
    "node CLI",
    1,
    true,
    [
      concept("nf-cli-concept", "Запуск Node.js", "Running Node.js", {
        uk: "У терміналі команда node app.js запускає файл app.js з поточної теки; node -v показує версію. Якщо запустити node без файлу в інтерактивному терміналі, відкриється REPL для введення виразів. node -e виконує переданий рядок коду. Шлях має відповідати реальному файлу, а інтерактивні приклади в цьому уроці перевіряються за відповіддю, не виконуються в терміналі.",
        en: "In a terminal, node app.js runs app.js from the current directory; node -v prints the version. Running node without a file in an interactive terminal opens a REPL for entering expressions. node -e executes a supplied code string. The path must match an actual file, and this lesson grades answers rather than executing a terminal.",
      }),
      codeFill("nf-r4", "Файл app.js міститься в поточній теці. Допишіть його ім'я без розширення.", "The file app.js is in the current directory. Complete its name without the extension.", "bash", "node ___.js", ["app"], true, { explanationUk: "node app.js запускає вказаний файл.", explanationEn: "node app.js runs the specified file." }),
      { ...mcq("nf-r5", "Що робить node -e із переданим рядком?", "What does node -e do with the supplied string?", ["Виконує рядок як JavaScript", "Запускає ESLint", "Встановлює npm-пакет", "Запускає Docker"], 0, { explanationUk: "-e виконує код, переданий як аргумент.", explanationEn: "-e evaluates code supplied as an argument." }), optionsEn: ["Evaluates the string as JavaScript", "Runs ESLint", "Installs an npm package", "Starts Docker"] },
      { id: "nf-r6", type: "match", promptUk: "Зіставте команди з діями", promptEn: "Match commands to their actions", pairs: [
        { left: "node file.js", right: "Запустити файл" },
        { left: "node -v", right: "Показати версію" },
        { left: "node", right: "Відкрити REPL в інтерактивному терміналі" },
      ], pairsEn: [
        { left: "node file.js", right: "Run a file" },
        { left: "node -v", right: "Print the version" },
        { left: "node", right: "Open the REPL in an interactive terminal" },
      ] },
    ],
  ),
  exam("nf-runtime-exam", "Контрольна: runtime", "Exam: runtime", 1, [
    { ...mcq("nf-re1", "Що таке Node.js?", "What is Node.js?", ["Середовище виконання JavaScript поза браузером", "Лише система стилів", "Тільки сервер SQL", "Мова розмітки"], 0), optionsEn: ["A JavaScript runtime outside the browser", "Only a styling system", "Only a SQL server", "A markup language"] },
    codeFill("nf-re2", "Допишіть глобальний об'єкт process для доступу до PORT.", "Complete the global process object to access PORT.", "js", "___.env.PORT", ["process"], true),
    { ...mcq("nf-re3", "Яку роль V8 виконує в Node.js?", "What role does V8 play in Node.js?", ["Це рушій JavaScript", "Це рушій SQL", "Це CSS-препроцесор", "Це база Redis"], 0), optionsEn: ["It is a JavaScript engine", "It is a SQL engine", "It is a CSS preprocessor", "It is the Redis database"] },
    codeFill("nf-re4", "Запустіть server.js із поточної теки командою node.", "Run server.js from the current directory using node.", "bash", "___ server.js", ["node"], true),
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
      concept("nf-cjs-concept", "Модулі CommonJS", "CommonJS modules", {
        uk: "У CommonJS функція require завантажує модуль, а module.exports задає значення, яке отримає викликач. Наприклад, module.exports = { add } експортує об'єкт із функцією add. Скорочення exports спочатку посилається на той самий об'єкт, але присвоєння exports = {...} змінює лише локальну змінну, а не module.exports. Файл .cjs явно позначає CommonJS. Приклади в уроці оцінюються як фрагменти коду.",
        en: "In CommonJS, require loads a module and module.exports sets the value returned to the caller. For example, module.exports = { add } exports an object containing add. The exports shortcut initially refers to the same object, but assigning exports = {...} only rebinds the local variable, not module.exports. A .cjs file explicitly denotes CommonJS. Lesson examples are graded as code snippets.",
      }),
      codeFill("nf-m1", "Допишіть функцію CommonJS для завантаження вбудованого модуля fs.", "Complete the CommonJS function used to load the built-in fs module.", "js", "const fs = ___('node:fs');", ["require"], true, { explanationUk: "require завантажує модуль через CommonJS loader.", explanationEn: "require loads the module through the CommonJS loader." }),
      codeFill("nf-m2", "Допишіть властивість, якою експортують об'єкт із CommonJS-модуля.", "Complete the property used to export an object from a CommonJS module.", "js", "module.___ = { add };", ["exports"], true, { explanationUk: "Викликач require отримує module.exports.", explanationEn: "The require caller receives module.exports." }),
      { ...mcq("nf-m3", "Яка функція в цьому прикладі використовує CommonJS loader?", "Which function in this example uses the CommonJS loader?", ["require", "document.querySelector", "JSON.stringify", "console.log"], 0, { explanationUk: "require запускає завантаження через CommonJS loader; сумісність із ESM залежить від версії та модуля.", explanationEn: "require uses the CommonJS loader; ESM interoperability depends on the version and module." }), optionsEn: ["require", "document.querySelector", "JSON.stringify", "console.log"] },
      { ...mcq("nf-m7", "У CommonJS виконали exports = { add }, не змінюючи module.exports. Що отримає require?", "In CommonJS, exports = { add } runs without changing module.exports. What does require receive?", ["Початковий порожній module.exports", "Новий об'єкт із add", "Завжди undefined", "Автоматично ES-модуль"], 0, { explanationUk: "Присвоєння змінній exports не замінює module.exports.", explanationEn: "Reassigning the exports variable does not replace module.exports." }), optionsEn: ["The original empty module.exports", "The new object containing add", "Always undefined", "Automatically an ES module"] },
    ],
  ),
  lesson(
    "nf-esm",
    "ESM import/export",
    "ESM import/export",
    2,
    false,
    [
      concept("nf-esm-concept", "Модулі ECMAScript", "ECMAScript modules", {
        uk: "ES-модуль може експортувати іменовану функцію через export і імпортувати її через import { add } from './math.js'. У Node.js розширення .mjs явно задає ESM, .cjs — CommonJS. Для .js поле type у найближчому батьківському package.json визначає формат: type: module означає ESM. Відносні імпорти в ESM зазвичай містять повне розширення. Модульні системи можуть взаємодіяти, але деталі залежать від версії Node.js.",
        en: "An ES module can export a named function with export and import it with import { add } from './math.js'. In Node.js, .mjs explicitly denotes ESM and .cjs denotes CommonJS. For .js, the type field in the nearest parent package.json determines the format: type: module means ESM. Relative ESM imports normally include the full extension. Module systems can interoperate, but details depend on the Node.js version.",
      }),
      codeFill("nf-m4", "Допишіть ключове слово для іменованого експорту функції.", "Complete the keyword for a named function export.", "js", "___ function add(a,b){ return a+b }", ["export"], true, { explanationUk: "export робить add іменованим експортом.", explanationEn: "export makes add a named export." }),
      codeFill("nf-m5", "Допишіть статичний імпорт іменованої функції add.", "Complete the static import of the named add function.", "js", "___ { add } from './math.js';", ["import"], true, { explanationUk: "Фігурні дужки вибирають іменований експорт.", explanationEn: "Braces select a named export." }),
      { ...mcq("nf-m6", "Найближчий package.json має type: module. Як Node.js трактує файл app.js у цьому пакеті?", "The nearest package.json has type: module. How does Node.js interpret app.js in that package?", ["Як ES-модуль", "Завжди як CommonJS", "Як SQL-файл", "Як змінну PORT"], 0, { explanationUk: "type: module визначає формат .js; .cjs залишається CommonJS.", explanationEn: "type: module defines the .js format; .cjs remains CommonJS." }), optionsEn: ["As an ES module", "Always as CommonJS", "As a SQL file", "As the PORT variable"] },
      { ...mcq("nf-m8", "Яке розширення явно задає CommonJS навіть у пакеті з type: module?", "Which extension explicitly selects CommonJS even in a type: module package?", [".cjs", ".mjs", ".css", ".json як JavaScript-модуль"], 0, { explanationUk: ".cjs задає CommonJS незалежно від поля type.", explanationEn: ".cjs selects CommonJS regardless of the type field." }), optionsEn: [".cjs", ".mjs", ".css", ".json as a JavaScript module"] },
    ],
  ),
  exam("nf-mod-exam", "Контрольна: modules", "Exam: modules", 2, [
    codeFill("nf-me1", "Завантажте path у CommonJS за допомогою require.", "Load path in CommonJS using require.", "js", "const path = ___('path');", ["require"], true),
    codeFill("nf-me2", "Допишіть статичний import для значення за замовчуванням.", "Complete the static import of the default value.", "js", "___ x from './x.js';", ["import"], true),
    codeFill("nf-me3", "Допишіть export для іменованої константи.", "Complete export for the named constant.", "js", "___ const PI = 3;", ["export"], true),
    { ...mcq("nf-me4", "Що повертає require для CommonJS-модуля?", "What does require return for a CommonJS module?", ["Значення module.exports цього модуля", "HTTP-заголовки модуля", "Лише ім'я файлу", "Автоматично undefined"], 0), optionsEn: ["The module's module.exports value", "The module's HTTP headers", "Only the file name", "Automatically undefined"] },
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
      concept("nf-path-concept", "Шляхи до файлів", "File paths", {
        uk: "Вбудований node:path допомагає працювати зі шляхами поточної платформи. path.join з'єднує сегменти й нормалізує їх, а path.extname повертає розширення разом із крапкою. У CommonJS __dirname — тека поточного модуля; в ESM його не надають автоматично. Нормалізація не є авторизацією: для шляху від користувача перевіряйте допустимість доступу й межі теки, враховуючи символічні посилання, або використовуйте безпечні ідентифікатори замість довільних шляхів.",
        en: "The built-in node:path module works with paths for the current platform. path.join combines and normalizes segments, while path.extname returns the extension including the dot. In CommonJS, __dirname is the current module's directory; it is not automatically provided in ESM. Normalization is not authorization: validate access and directory boundaries for user-supplied paths, accounting for symbolic links, or use safe identifiers instead of arbitrary paths.",
      }),
      codeFill("nf-f1", "У CommonJS допишіть метод, що з'єднує теку модуля з ім'ям файла.", "In CommonJS, complete the method that joins the module directory and file name.", "js", "path.___(__dirname, 'data.json')", ["join"], true, { explanationUk: "path.join з'єднує та нормалізує сегменти.", explanationEn: "path.join combines and normalizes path segments." }),
      { ...mcq("nf-f2", "Для чого застосовують node:path?", "What is node:path used for?", ["Для роботи зі шляхами файлової системи", "Лише для HTTP", "Лише для CSS", "Лише для Git"], 0, { explanationUk: "Модуль надає операції над шляхами поточної платформи.", explanationEn: "The module provides path operations for the current platform." }), optionsEn: ["Working with filesystem paths", "Only HTTP", "Only CSS", "Only Git"] },
      codeRead("nf-f3", "Що повертає path.extname для цього імені?", "What does path.extname return for this name?", "js", "path.extname('a.js')", ["'.js'", "'a'", "'js/'", "null"], 0, { explanationUk: "Розширення включає крапку: '.js'.", explanationEn: "The extension includes the dot: '.js'." }),
      { ...mcq("nf-f7", "Користувач передав '../secret.txt'. Чи достатньо path.join(base, input), щоб довести право доступу?", "A user supplied '../secret.txt'. Is path.join(base, input) sufficient to establish access is allowed?", ["Ні: потрібна перевірка доступу та меж, зокрема символічних посилань", "Так: join завжди обмежує шлях текою base", "Так: будь-який шлях користувача безпечний", "Так: join перевіряє роль користувача"], 0, { explanationUk: "join нормалізує шлях, але не виконує перевірку прав чи ізоляції.", explanationEn: "join normalizes a path but does not enforce authorization or confinement." }), optionsEn: ["No: check authorization and boundaries, including symbolic links", "Yes: join always confines the path to base", "Yes: every user path is safe", "Yes: join checks the user's role"] },
    ],
  ),
  lesson(
    "nf-fs",
    "fs read/write intro",
    "fs read/write intro",
    2,
    false,
    [
      concept("nf-fs-concept", "Читання й запис файлів", "Reading and writing files", {
        uk: "node:fs має синхронні методи readFileSync і writeFileSync та асинхронні API, зокрема node:fs/promises. Читання з кодуванням utf8 повертає рядок; без кодування readFileSync повертає Buffer. Синхронні операції блокують потік JavaScript до завершення, тому в HTTP-обробниках зазвичай обирають асинхронні API. Вони також можуть завершитись помилкою: обробляйте, наприклад, відсутній файл або відмову в доступі. writeFileSync за замовчуванням перезаписує наявний файл; не використовуйте його без розуміння наслідків.",
        en: "node:fs provides synchronous readFileSync and writeFileSync methods and asynchronous APIs including node:fs/promises. Reading with utf8 returns a string; without an encoding readFileSync returns a Buffer. Synchronous operations block the JavaScript thread until completion, so HTTP handlers generally use asynchronous APIs. These can fail too: handle cases such as a missing file or denied access. By default, writeFileSync overwrites an existing file; understand the consequences before using it.",
      }),
      codeFill("nf-f4", "Допишіть синхронний метод читання UTF-8 файла у рядок.", "Complete the synchronous method that reads a UTF-8 file as a string.", "js", "fs.___('f.txt','utf8')", ["readFileSync"], true, { explanationUk: "readFileSync з utf8 повертає рядок або викидає помилку.", explanationEn: "readFileSync with utf8 returns a string or throws an error." }),
      codeFill("nf-f5", "Допишіть синхронний метод запису файла; стандартний режим може перезаписати файл.", "Complete the synchronous file-writing method; its default mode may overwrite a file.", "js", "fs.___('o.txt', data)", ["writeFileSync"], true, { explanationUk: "writeFileSync записує дані синхронно.", explanationEn: "writeFileSync writes data synchronously." }),
      { ...mcq("nf-f6", "Як синхронний файловий виклик впливає на потік JavaScript?", "How does a synchronous filesystem call affect the JavaScript thread?", ["Блокує його до завершення операції", "Ніколи не блокує", "Автоматично стає асинхронним", "Перетворює файл на SQL"], 0, { explanationUk: "Поки виклик не завершився, цей потік не обробляє іншу роботу.", explanationEn: "The thread cannot process other work until the call completes." }), optionsEn: ["It blocks the thread until the operation completes", "It never blocks", "It automatically becomes asynchronous", "It converts the file to SQL"] },
      { ...mcq("nf-f8", "Що за замовчуванням може статися з наявним o.txt при fs.writeFileSync('o.txt', data)?", "What can happen by default to an existing o.txt when fs.writeFileSync('o.txt', data) is called?", ["Його вміст буде перезаписано", "Він гарантовано залишиться без змін", "Виклик завжди створить інше ім'я", "Файл автоматично зашифрується"], 0, { explanationUk: "Стандартний режим запису замінює вміст наявного файла.", explanationEn: "The default write mode replaces existing file content." }), optionsEn: ["Its contents are overwritten", "It is guaranteed to remain unchanged", "The call always creates a different name", "The file is automatically encrypted"] },
    ],
  ),
  exam("nf-fs-exam", "Контрольна: fs/path", "Exam: fs/path", 2, [
    codeFill("nf-fe1", "З'єднайте сегменти шляху методом join.", "Join the path segments using join.", "js", "path.___(a,b)", ["join"], true),
    codeFill("nf-fe2", "Допишіть синхронний метод readFileSync для читання UTF-8.", "Complete the synchronous readFileSync method to read UTF-8.", "js", "fs.___(p,'utf8')", ["readFileSync"], true),
    { ...mcq("nf-fe3", "Чи захищає path.join(base, userInput) сам по собі від виходу за межі base?", "Does path.join(base, userInput) by itself prevent escape outside base?", ["Ні, нормалізація не замінює перевірку доступу й меж", "Так, join завжди ізолює файли", "Так, якщо шлях містить ..", "Ні, тому що join змінює права файлу"], 0), optionsEn: ["No, normalization does not replace authorization and boundary checks", "Yes, join always confines files", "Yes, if the path contains ..", "No, because join changes file permissions"] },
    codeFill("nf-fe4", "Завантажте вбудований модуль fs або node:fs через require.", "Load the built-in fs or node:fs module with require.", "js", "const fs = require('___');", ["fs", "node:fs"], true),
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
      concept("nf-env-concept", "Конфігурація процесу", "Process configuration", {
        uk: "process.env містить змінні середовища процесу: встановлені значення читаються як рядки, а відсутня змінна дає undefined. Наприклад, PORT='3000' потрібно явно перетворити на число і перевірити за правилами застосунку. Для цього прикладу дозволені цілі порти 1–65535; відсутнє значення може отримати 3000, але невалідне має спричинити зрозумілу помилку запуску. Секрети передають через налаштоване середовище або сховище секретів, не комітять і не виводять у логи.",
        en: "process.env contains process environment variables: present values are read as strings, and an absent variable yields undefined. For example, PORT='3000' needs explicit numeric conversion and validation under the application's rules. In this example valid ports are integers from 1 to 65535; an absent value may default to 3000, but an invalid value should produce a clear startup error. Supply secrets through configured environment or a secret store; do not commit or log them.",
      }),
      codeFill("nf-e1", "Допишіть назву змінної з портом у process.env.", "Complete the port variable name in process.env.", "js", "const rawPort = process.env.___;", ["PORT"], true, { explanationUk: "process.env.PORT — рядок або undefined; далі потрібна валідація.", explanationEn: "process.env.PORT is a string or undefined; validate it before use." }),
      { ...mcq("nf-e2", "Як поводитися із секретом конфігурації?", "How should a configuration secret be handled?", ["Передати через кероване сховище або середовище, не комітити в Git", "Опублікувати в репозиторії", "Вставити в клієнтський CSS", "Записати в публічний README"], 0, { explanationUk: "Доступ до секретів слід обмежувати; вони не належать до публічного коду.", explanationEn: "Restrict access to secrets; they do not belong in public code." }), optionsEn: ["Supply it through a managed store or environment, not Git", "Publish it in the repository", "Put it in client CSS", "Write it in a public README"] },
      { id: "nf-e3", type: "code_read", promptUk: "Що повертає читання FOO, якщо змінну не встановлено?", promptEn: "What does reading FOO return if the variable is unset?", language: "js", code: "process.env.FOO", options: ["undefined", "Завжди викидає помилку", "0", "Рядок 'null'"], optionsEn: ["undefined", "Always throws", "0", "The string 'null'"], correctIndex: 0, explanationUk: "Відсутня змінна дає undefined.", explanationEn: "An absent variable yields undefined." },
      { ...mcq("nf-e6", "PORT='abc' задано в середовищі. Що має зробити застосунок за описаним контрактом?", "PORT='abc' is set in the environment. What should the application do under the described contract?", ["Відхилити конфігурацію зі зрозумілою помилкою", "Вважати abc валідним числовим портом", "Мовчки записати секрет у лог", "Вважати будь-який рядок числом"], 0, { explanationUk: "Перетворення й перевірка мають виявити нечислове значення.", explanationEn: "Conversion and validation must detect a nonnumeric value." }), optionsEn: ["Reject the configuration with a clear error", "Treat abc as a valid numeric port", "Silently log a secret", "Treat every string as a number"] },
    ],
  ),
  lesson(
    "nf-dotenv",
    ".env pattern",
    ".env pattern",
    2,
    false,
    [
      concept("nf-dotenv-concept", "Файли конфігурації", "Configuration files", {
        uk: "Файл .env може зберігати локальні змінні для розробки, але сам по собі не гарантує їх автоматичного завантаження кожним запуском: використовуйте явно налаштований механізм проєкту. Не комітьте реальні секрети; замість них додайте .env.example із назвами та безпечними прикладами. Перевірте, що файл із секретами ігнорується Git, і пам'ятайте: .gitignore не видаляє секрет з уже відстежуваного файла чи історії.",
        en: "A .env file can hold local development variables, but it does not by itself guarantee they are loaded for every invocation: use the project's explicitly configured mechanism. Do not commit real secrets; provide an .env.example with names and safe placeholders instead. Check that the secret-bearing file is ignored by Git, and remember that .gitignore does not remove a secret from an already tracked file or history.",
      }),
      { ...mcq("nf-e4", "Що доречно додати в репозиторій для опису потрібної конфігурації?", "What is appropriate to add to a repository to document required configuration?", [".env.example із назвами та безпечними прикладами", "Реальні паролі в .env", "Секретний токен у README", "Приватний ключ у клієнтський код"], 0, { explanationUk: "Приклад документує змінні без розкриття справжніх секретів.", explanationEn: "An example documents variables without exposing real secrets." }), optionsEn: ["An .env.example with names and safe placeholders", "Real passwords in .env", "A secret token in README", "A private key in client code"] },
      { id: "nf-e5", type: "match", promptUk: "Зіставте змінні з типовим призначенням", promptEn: "Match variables with their typical purpose", pairs: [
        { left: "NODE_ENV", right: "Режим середовища" },
        { left: "PORT", right: "Порт сервера" },
        { left: "DATABASE_URL", right: "Адреса підключення до бази" },
      ], pairsEn: [
        { left: "NODE_ENV", right: "Environment mode" },
        { left: "PORT", right: "Server listening port" },
        { left: "DATABASE_URL", right: "Database connection URL" },
      ] },
      { ...mcq("nf-e7", "Секретний .env уже відстежується Git. Чи видалить додавання його в .gitignore секрет з історії?", "A secret-bearing .env is already tracked by Git. Does adding it to .gitignore remove the secret from history?", ["Ні, потрібно окремо реагувати на розкритий секрет і роботу з історією", "Так, Git автоматично стирає всі попередні коміти", "Так, пароль сам зміниться", "Ні, бо Git не читає .gitignore"], 0, { explanationUk: "Ігнорування не переписує історію й не відкликає скомпрометований секрет.", explanationEn: "Ignoring a file does not rewrite history or revoke an exposed secret." }), optionsEn: ["No; the exposed secret and repository history require separate handling", "Yes, Git automatically erases all previous commits", "Yes, the password changes itself", "No, because Git never reads .gitignore"] },
      codeFill(
        "nf-env-file-flag",
        "Запустити скрипт із вбудованим завантаженням .env без сторонніх пакетів (Node.js 20.6+)",
        "Run script with built-in .env loading without external packages (Node.js 20.6+)",
        "bash",
        "node --___=.env index.js",
        ["env-file"],
        true,
        why(
          "Починаючи з Node.js 20.6+, прапорець --env-file завантажує змінні середовища нативно.",
          "Starting with Node.js 20.6+, the --env-file flag loads environment variables natively without dotenv.",
        ),
      ),
    ],
  ),
  exam("nf-env-exam", "Контрольна: env", "Exam: env", 2, [
    codeFill("nf-ee1", "Допишіть властивість env для доступу до PORT.", "Complete the env property to access PORT.", "js", "process.___.PORT", ["env"], true),
    { ...mcq("nf-ee2", "Що не слід комітити в репозиторій?", "What should not be committed to the repository?", ["Робочі секрети й токени", "README без секретів", "Публічні іконки", "Вихідний код із відкритою ліцензією"], 0), optionsEn: ["Live secrets and tokens", "A README without secrets", "Public icons", "Openly licensed source code"] },
    codeFill("nf-ee3", "Допишіть заданий у прикладі стандартний порт 3000, якщо PORT відсутній.", "Complete the example's default port 3000 when PORT is absent.", "js", "Number(process.env.PORT ?? ___)", ["3000"], true, { explanationUk: "Після перетворення порт додатково перевіряють за контрактом.", explanationEn: "After conversion, validate the port against the contract." }),
    { ...mcq("nf-ee4", "Для чого застосунки часто використовують NODE_ENV?", "What do applications often use NODE_ENV for?", ["Щоб позначити режим, наприклад production або development", "Щоб зберігати SQL-пароль у браузері", "Щоб автоматично перемикати Git-гілку", "Щоб змінювати файлові права ОС"], 0), optionsEn: ["To indicate a mode such as production or development", "To store a SQL password in the browser", "To automatically switch Git branches", "To change OS file permissions"] },
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
      concept("nf-http-concept", "HTTP-сервер Node.js", "A Node.js HTTP server", {
        uk: "Вбудований node:http дозволяє створити сервер через createServer(handler). Для кожного запиту обробник отримує req і res; виклик server.listen(3000) починає слухати порт, а res.end завершує відповідь. Подія error сервера може повідомити, наприклад, що порт зайнятий. Приклади цього уроку перевіряються за фрагментами коду — реальний порт у застосунку не відкривається.",
        en: "The built-in node:http module can create a server with createServer(handler). For each request, the handler receives req and res; server.listen(3000) starts listening on the port, and res.end completes the response. The server's error event can report problems such as a port already being in use. This lesson grades code fragments; it does not open a real port in the app.",
      }),
      codeFill("nf-h1", "Допишіть назву вбудованого HTTP-модуля для CommonJS.", "Complete the built-in HTTP module name for CommonJS.", "js", "const http = require('___');", ["http", "node:http"], true, { explanationUk: "Вбудований модуль можна завантажити як http або node:http.", explanationEn: "The built-in module can be loaded as http or node:http." }),
      codeFill("nf-h2", "Допишіть метод створення HTTP-сервера.", "Complete the method that creates an HTTP server.", "js", "const server = http.___(handler);", ["createServer"], true, { explanationUk: "createServer приймає обробник запитів.", explanationEn: "createServer accepts a request handler." }),
      codeOrder(
        "nf-h3",
        "Розташуйте рядки мінімального сервера в правильному порядку.",
        "Arrange the minimal server lines in the correct order.",
        "js",
        [".listen(3000);", "const http = require('http');", "http.createServer((req,res) => { res.end('ok'); })"],
        ["const http = require('http');", "http.createServer((req,res) => { res.end('ok'); })", ".listen(3000);"],
      ),
      { ...mcq("nf-h7", "Що повідомить серверу почати приймати з'єднання на порту 3000?", "What tells the server to start accepting connections on port 3000?", ["server.listen(3000)", "res.end(3000)", "req.url(3000)", "JSON.parse(3000)"], 0, { explanationUk: "listen запускає прослуховування; створення сервера саме по собі цього не робить.", explanationEn: "listen starts listening; creating the server alone does not." }), optionsEn: ["server.listen(3000)", "res.end(3000)", "req.url(3000)", "JSON.parse(3000)"] },
    ],
  ),
  lesson(
    "nf-req-res",
    "req / res",
    "req / res",
    2,
    false,
    [
      concept("nf-req-res-concept", "Запит і відповідь", "Request and response", {
        uk: "req описує вхідний HTTP-запит: method містить метод, а url у звичайному запиті може містити шлях і query-рядок. Для маршруту /health перевіряйте метод і розібраний pathname, а не порівнюйте весь рядок із query навмання. res.statusCode та заголовки задають до початку надсилання відповіді; res.end('hello') надсилає тіло й завершує її. Для невідомого маршруту можна встановити 404 і завершити відповідь. Кожен шлях обробника має явно завершувати відповідь або передавати керування.",
        en: "req describes an incoming HTTP request: method contains the method, and url in a typical request can contain a path and query string. For a /health route, check the method and parsed pathname rather than comparing an entire URL with a query blindly. Set res.statusCode and headers before the response starts; res.end('hello') sends the body and finishes it. For an unknown route, set 404 and end the response. Each handler path must explicitly finish the response or hand off control.",
      }),
      { ...mcq("nf-h4", "Для звичайного запиту GET /health?full=1 що може містити req.url?", "For a typical GET /health?full=1 request, what can req.url contain?", ["Шлях і query-рядок", "Лише тіло відповіді", "SQL-схему", "CSS-правило"], 0, { explanationUk: "У цьому прикладі req.url містить /health?full=1; для маршруту розберіть pathname.", explanationEn: "In this example req.url contains /health?full=1; parse pathname for routing." }), optionsEn: ["The path and query string", "Only the response body", "A SQL schema", "A CSS rule"] },
      codeFill("nf-h5", "Допишіть властивість HTTP-статусу відповіді до її надсилання.", "Complete the response HTTP status property before sending.", "js", "res.___ = 200;", ["statusCode"], true, { explanationUk: "statusCode задає статус до надсилання заголовків.", explanationEn: "statusCode sets the status before headers are sent." }),
      codeFill("nf-h6", "Допишіть метод, який надсилає текст і завершує відповідь.", "Complete the method that sends text and ends the response.", "js", "res.___('hello');", ["end"], true, { explanationUk: "res.end завершує відповідь.", explanationEn: "res.end finishes the response." }),
      { ...mcq("nf-h8", "Шлях не знайдено. Що зробити в простому HTTP-обробнику?", "The route is not found. What should a simple HTTP handler do?", ["Встановити 404 до надсилання і завершити відповідь", "Залишити запит без відповіді", "Завжди повідомити 200 без пояснення", "Змінити статус після завершення відповіді"], 0, { explanationUk: "404 повідомляє про невідомий маршрут, а end завершує відповідь.", explanationEn: "404 indicates an unknown route and end finishes the response." }), optionsEn: ["Set 404 before sending and end the response", "Leave the request unanswered", "Always return 200 without explanation", "Change the status after the response ends"] },
    ],
  ),
  exam("nf-http-exam", "Контрольна: http", "Exam: http", 2, [
    codeFill("nf-he1", "Завантажте вбудований модуль http або node:http.", "Load the built-in http or node:http module.", "js", "require('___')", ["http", "node:http"], true),
    codeFill("nf-he2", "Створіть сервер методом createServer.", "Create a server using createServer.", "js", "http.___(handler)", ["createServer"], true),
    codeFill("nf-he3", "Почніть слухати порт методом listen.", "Start listening on the port using listen.", "js", "server.___(3000)", ["listen"], true),
    { ...mcq("nf-he4", "Що робить res.end('ok') у HTTP-обробнику?", "What does res.end('ok') do in an HTTP handler?", ["Надсилає тіло та завершує відповідь", "Починає прослуховувати порт", "Читає файл із диска", "Розбирає тіло запиту як JSON"], 0), optionsEn: ["Sends the body and finishes the response", "Starts listening on the port", "Reads a file from disk", "Parses the request body as JSON"] },
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
      concept("nf-npm-concept", "Маніфест і команди npm", "The manifest and npm commands", {
        uk: "package.json описує метадані проєкту, залежності й scripts. Наприклад, npm run build запускає скрипт build, а npm start — скрипт start. package-lock.json фіксує дерево залежностей для узгодженої установки. У CI npm ci використовує наявний lockfile, перевіряє його відповідність manifest і завершується помилкою при невідповідності. Це приклади npm: в інших менеджерах пакетів команди та lockfile відрізняються.",
        en: "package.json describes project metadata, dependencies, and scripts. For example, npm run build runs the build script, and npm start runs start. package-lock.json records the dependency tree for consistent installation. In CI, npm ci uses the existing lockfile, checks it against the manifest, and fails on a mismatch. These are npm examples: other package managers use different commands and lockfiles.",
      }),
      { ...mcq("nf-n1", "Що може містити package.json?", "What can package.json contain?", ["Метадані, залежності та scripts", "Лише CSS", "Лише SQL-дампи", "Лише бінарні файли"], 0, { explanationUk: "Це маніфест проєкту, зокрема для npm.", explanationEn: "It is a project manifest, including for npm." }), optionsEn: ["Metadata, dependencies, and scripts", "Only CSS", "Only SQL dumps", "Only binary files"] },
      codeFill("nf-n2", "У проєкті точка входу — app.js. Допишіть ім'я без розширення у скрипті start.", "The project's entry file is app.js. Complete its name without the extension in the start script.", "json", '"scripts": { "start": "node ___.js" }', ["app"], true, { explanationUk: "Скрипт запускає node app.js.", explanationEn: "The script runs node app.js." }),
      { id: "nf-n3", type: "match", promptUk: "Зіставте npm-команди й файл із призначенням", promptEn: "Match npm commands and file to their purpose", pairs: [
        { left: "npm install", right: "Встановити залежності" },
        { left: "npm run build", right: "Запустити скрипт build" },
        { left: "package-lock.json", right: "Зафіксувати дерево залежностей" },
      ], pairsEn: [
        { left: "npm install", right: "Install dependencies" },
        { left: "npm run build", right: "Run the build script" },
        { left: "package-lock.json", right: "Record the dependency tree" },
      ] },
      { ...mcq("nf-n7", "У CI запускають npm ci, але package.json і lockfile не узгоджені. Що очікувати?", "CI runs npm ci, but package.json and the lockfile disagree. What should you expect?", ["Команда завершиться помилкою; невідповідність потрібно виправити", "Lockfile буде мовчки переписано для успішної установки", "npm запустить сервер замість установки", "Помилку можна ігнорувати як успіх"], 0, { explanationUk: "npm ci вимагає узгодженого lockfile і не переписує його під час установки.", explanationEn: "npm ci requires a consistent lockfile and does not rewrite it during installation." }), optionsEn: ["The command fails; the mismatch must be fixed", "The lockfile is silently rewritten for a successful install", "npm starts a server instead of installing", "The error can be reported as success"] },
    ],
  ),
  lesson(
    "nf-deps",
    "dependencies vs devDependencies",
    "dependencies vs devDependencies",
    2,
    false,
    [
      concept("nf-deps-concept", "Залежності та інструменти", "Dependencies and tools", {
        uk: "dependencies зазвичай містить пакети, потрібні застосунку під час виконання; devDependencies — інструменти, потрібні для розробки, тестів або збірки. Остаточна класифікація залежить від того, як створюють і запускають артефакт: інструмент збірки потрібен на етапі build, навіть якщо його немає у фінальному runtime. Категорія не гарантує, що імпортований клієнтським кодом пакет не потрапить у бандл. node_modules містить установлені пакети; manifest і lockfile описують установку.",
        en: "dependencies normally contains packages needed by the application at runtime; devDependencies contains tools needed for development, tests, or builds. Classification depends on how the artifact is built and run: a build tool is needed during build even if it is absent from the final runtime. The category does not guarantee that a package imported by client code stays out of the bundle. node_modules contains installed packages; the manifest and lockfile describe the installation.",
      }),
      { ...mcq("nf-n4", "Де зазвичай оголошують тестовий інструмент, потрібний лише під час розробки та CI?", "Where is a test tool needed only during development and CI usually declared?", ["У devDependencies", "В операційному ядрі", "У DNS", "Тільки в клієнтському HTML"], 0, { explanationUk: "devDependencies підходить для інструмента, не потрібного runtime-артефакту.", explanationEn: "devDependencies fits a tool not needed by the runtime artifact." }), optionsEn: ["In devDependencies", "In the operating-system kernel", "In DNS", "Only in client HTML"] },
      codeFill("nf-n5", "Допишіть назву тестового інструмента vitest для встановлення як devDependency.", "Complete the name of the vitest test tool to install as a devDependency.", "bash", "npm i -D ___", ["vitest"], true, { explanationUk: "-D додає пакет у devDependencies.", explanationEn: "-D adds the package to devDependencies." }),
      { ...mcq("nf-n6", "Що містить node_modules після установки?", "What does node_modules contain after installation?", ["Установлені пакети", "Лише SQL-схему", "Лише CSS проєкту", "Автоматично всі секрети CI"], 0, { explanationUk: "Установлене дерево створюється менеджером пакетів на основі конфігурації.", explanationEn: "The package manager creates the installed tree from configuration." }), optionsEn: ["Installed packages", "Only a SQL schema", "Only the project's CSS", "Automatically every CI secret"] },
      { ...mcq("nf-n8", "Клієнтський код імпортує devDependency під час збірки. Чи гарантує його категорія відсутність у клієнтському бандлі?", "Client code imports a devDependency during build. Does its category guarantee it stays out of the client bundle?", ["Ні: це залежить від імпортів і збирача", "Так, devDependencies ніколи не потрапляють у бандл", "Так, якщо існує lockfile", "Ні, бо браузер читає npm напряму"], 0, { explanationUk: "Перевірте production-бандл і граф імпортів.", explanationEn: "Inspect the production bundle and import graph." }), optionsEn: ["No: imports and the bundler determine the result", "Yes, devDependencies never enter a bundle", "Yes, if a lockfile exists", "No, because the browser reads npm directly"] },
    ],
  ),
  exam("nf-npm-exam", "Контрольна: npm", "Exam: npm", 2, [
    { ...mcq("nf-ne1", "Яку роль має package.json?", "What is the role of package.json?", ["Маніфест проєкту з метаданими, залежностями та скриптами", "Сертифікат TLS", "Лише файл образу Docker", "Іконка сайту"], 0), optionsEn: ["A project manifest with metadata, dependencies, and scripts", "A TLS certificate", "Only a Docker image file", "A site icon"] },
    codeFill("nf-ne2", "Допишіть install або i для встановлення залежностей npm.", "Complete install or i to install npm dependencies.", "bash", "npm ___", ["install", "i"], false),
    { ...mcq("nf-ne3", "Як запустити скрипт build із package.json?", "How do you run the build script from package.json?", ["npm run build", "git run build", "curl build", "node install build"], 0), optionsEn: ["npm run build", "git run build", "curl build", "node install build"] },
    { ...mcq("nf-ne4", "Де зазвичай зберігають пакет тестового інструмента, не потрібний виконуваному застосунку?", "Where is a test tool package not needed by the running application usually declared?", ["У devDependencies", "У файлі сертифіката", "У ядрі ОС", "У браузерному сховищі"], 0), optionsEn: ["In devDependencies", "In a certificate file", "In the OS kernel", "In browser storage"] },
  ]),
]);

const asyncU = unit("async-node", "Асинхронність у Node.js", "Async in Node", [
  lesson(
    "nf-event-loop",
    "Як працює event loop",
    "Event loop idea",
    3,
    false,
    [
      concept("nf-event-loop-concept", "Черга роботи та неблокувальний I/O", "The work queue and nonblocking I/O", {
        uk: "JavaScript конкретного потоку виконується по одному фрагменту за раз. Node.js може доручати операції I/O операційній системі або пулу потоків і виконувати іншу роботу до готовності результату. Event loop запускає відповідні callback-и, коли потік JavaScript може їх обробити. Тривала синхронна робота затримує інші callback-и; асинхронність не робить обчислення автоматично паралельними. setTimeout(fn, 0) задає мінімальну затримку, а не гарантує негайного виконання.",
        en: "JavaScript on a given thread runs one piece at a time. Node.js can delegate I/O to the operating system or a thread pool and do other work while the result is pending. The event loop runs the corresponding callbacks when the JavaScript thread can handle them. Long synchronous work delays other callbacks; asynchronous code does not automatically parallelize computation. setTimeout(fn, 0) sets a minimum delay, not an immediate execution guarantee.",
      }),
      { ...mcq("nf-a1", "Що робить event loop, коли асинхронна операція готова до обробки?", "What does the event loop do when an asynchronous operation is ready to be handled?", ["Планує виконання відповідного callback-а в потоці JavaScript", "Створює окремий процес для кожного запиту", "Гарантує паралельне виконання всього JavaScript", "Замінює операційну систему"], 0, { explanationUk: "Callback чекає, поки потік JavaScript зможе його виконати.", explanationEn: "The callback waits until the JavaScript thread can run it." }), optionsEn: ["Schedules the corresponding callback on the JavaScript thread", "Creates a separate process for every request", "Guarantees all JavaScript runs in parallel", "Replaces the operating system"] },
      { ...mcq("nf-a2", "Що може статись, якщо сервер синхронно читає великий файл під час запиту?", "What can happen if a server synchronously reads a large file during a request?", ["Інші callback-и в цьому потоці затримаються до завершення читання", "Інші callback-и завжди виконаються негайно", "JavaScript автоматично перейде на GPU", "Node.js відхилить будь-який синхронний код"], 0, { explanationUk: "Синхронне читання блокує потік, доки не завершиться.", explanationEn: "Synchronous reading blocks the thread until it finishes." }), optionsEn: ["Other callbacks on that thread wait until the read completes", "Other callbacks always run immediately", "JavaScript automatically moves to the GPU", "Node.js rejects all synchronous code"] },
      codeFill("nf-a3", "Допишіть setTimeout, щоб запланувати callback із нульовою затримкою.", "Complete setTimeout to schedule a callback with zero delay.", "js", "___(() => {}, 0);", ["setTimeout"], true, { explanationUk: "Callback виконається пізніше, коли цикл зможе його обробити.", explanationEn: "The callback runs later, when the loop can handle it." }),
      { ...mcq("nf-a7", "Що гарантує setTimeout(fn, 0)?", "What does setTimeout(fn, 0) guarantee?", ["Callback заплановано на пізніше, але точний час виконання не гарантовано", "Callback виконається до наступного рядка", "Callback запуститься в окремому потоці", "Затримок через інший код не буде"], 0, { explanationUk: "Поточний код і черги можуть затримати callback.", explanationEn: "Current work and queues can delay the callback." }), optionsEn: ["The callback is scheduled for later, but its exact execution time is not guaranteed", "The callback runs before the next line", "The callback runs on a separate thread", "Other work cannot delay it"] },
    ],
  ),
  lesson(
    "nf-promises",
    "Проміси та async/await",
    "Promises / async await",
    3,
    false,
    [
      concept("nf-promises-concept", "Результат і помилка проміса", "Promise results and failures", {
        uk: "Проміс представляє майбутній результат або помилку. async-функція завжди повертає проміс; await призупиняє її виконання до завершення проміса, не блокуючи весь потік. Відхилення await викидає помилку в async-функції, тому використовуйте try/catch або передайте її виклику, який обробить проміс. Для незалежних операцій Promise.all запускає очікування разом, але відхиляється при першій помилці й сам не скасовує інші операції.",
        en: "A promise represents a future result or failure. An async function always returns a promise; await suspends that function until the promise settles without blocking the whole thread. A rejected await throws inside the async function, so use try/catch or propagate the error to a caller that handles the promise. Promise.all waits for independent operations together, but rejects on the first failure and does not cancel the others itself.",
      }),
      codeFill("nf-a4", "Допишіть ключове слово для async-функції.", "Complete the keyword for an async function.", "js", "___ function main() {}", ["async"], true, { explanationUk: "async-функція повертає проміс.", explanationEn: "An async function returns a promise." }),
      codeFill("nf-a5", "Дочекайтеся читання файлу всередині async-функції.", "Wait for the file read inside an async function.", "js", "const data = ___ fs.promises.readFile(p);", ["await"], true, { explanationUk: "await повертає значення виконаного проміса або викидає причину відхилення.", explanationEn: "await yields the fulfilled value or throws the rejection reason." }),
      { ...mcq("nf-a6", "Як обробити можливу помилку await усередині async-функції?", "How can an async function handle a possible failure from await?", ["Огорнути await у try/catch", "Ігнорувати повернений проміс", "Додати setTimeout навколо виклику", "Перетворити помилку на коментар"], 0, { explanationUk: "catch отримує причину відхилення; її можна обробити або передати далі.", explanationEn: "catch receives the rejection reason, which can be handled or propagated." }), optionsEn: ["Wrap await in try/catch", "Ignore the returned promise", "Wrap the call in setTimeout", "Turn the error into a comment"] },
      { ...mcq("nf-a8", "Що станеться з іншими вже запущеними операціями, якщо один проміс у Promise.all відхилиться?", "What happens to other already-started operations if one promise in Promise.all rejects?", ["Promise.all відхилиться; інші операції автоматично не скасуються", "Усі операції автоматично скасуються", "Promise.all дочекається їх і завжди поверне успіх", "Node.js завершить процес у всіх конфігураціях"], 0, { explanationUk: "Скасування потребує окремого механізму, наприклад підтримки AbortSignal.", explanationEn: "Cancellation requires a separate mechanism, such as AbortSignal support." }), optionsEn: ["Promise.all rejects; the other operations are not automatically cancelled", "All operations are automatically cancelled", "Promise.all waits and always resolves successfully", "Node.js exits in every configuration"] },
    ],
  ),
  exam("nf-async-exam", "Контрольна: async", "Exam: async", 3, [
    codeFill("nf-ae1", "Допишіть ключове слово для async-функції.", "Complete the keyword for an async function.", "js", "___ function f() {}", ["async"], true),
    codeFill("nf-ae2", "Дочекайтеся проміса p всередині async-функції.", "Wait for promise p inside an async function.", "js", "const x = ___ p;", ["await"], true),
    { ...mcq("nf-ae3", "Що відбувається з callback-ом таймера, поки виконується довга синхронна функція в тому самому потоці?", "What happens to a timer callback while a long synchronous function runs on the same thread?", ["Callback чекає завершення поточної роботи", "Callback перериває функцію", "Callback гарантовано запускається в іншому потоці", "Таймер автоматично скасовується"], 0), optionsEn: ["The callback waits for current work to finish", "The callback interrupts the function", "The callback is guaranteed to run on another thread", "The timer is automatically cancelled"] },
    { ...mcq("nf-ae4", "Навіщо серверу використовувати асинхронний I/O під навантаженням?", "Why use asynchronous I/O in a server under load?", ["Потік може обробляти іншу роботу, поки операція I/O очікує", "Це гарантує відсутність будь-яких помилок", "Це автоматично паралелізує весь JavaScript", "Це усуває потребу обробляти відхилення"], 0), optionsEn: ["The thread can handle other work while I/O is pending", "It guarantees no errors", "It automatically parallelizes all JavaScript", "It removes the need to handle rejections"] },
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
        concept("nd-scen-rejection-concept", "Відхилення та зупинка процесу", "Rejections and process shutdown", {
          uk: "Обробляйте помилки промісів там, де можна прийняти рішення про повтор або відповідь клієнту. Поведінка необробленого відхилення залежить від версії Node.js, прапорця --unhandled-rejections і встановлених обробників. У режимі throw обробник unhandledRejection перехоплює подію: сам лише запис у журнал не завершує процес. Для SIGTERM сервер має припинити приймати нові запити, дочекатися активних операцій і закрити ресурси з обмеженим часом очікування.",
          en: "Handle promise failures where you can decide whether to retry or respond to a client. Unhandled rejection behavior depends on the Node.js version, the --unhandled-rejections flag, and installed handlers. In throw mode an unhandledRejection listener receives the event: logging alone does not terminate the process. On SIGTERM, stop accepting requests, allow active work to finish, and close resources with a bounded timeout.",
        }),
        { ...(codeRead(
          "nd-scen-1",
          "Node.js запущено в режимі --unhandled-rejections=throw. Що гарантує цей обробник?",
          "Node.js runs with --unhandled-rejections=throw. What does this listener guarantee?",
          "js",
          "process.on('unhandledRejection', (reason) => {\n  console.error('Unhandled rejection:', reason);\n});",
          [
            "Він записує причину; сам по собі не завершує процес",
            "Він завжди завершує процес із кодом 1",
            "Він повторює відхилену операцію",
            "Він робить проміс успішним",
          ],
          0,
          { explanationUk: "У режимі throw наявний слухач отримує подію; лише журналювання не є стратегією завершення.", explanationEn: "In throw mode an installed listener receives the event; logging alone is not a shutdown strategy." },
        ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["It logs the reason; it does not itself terminate the process", "It always exits with code 1", "It retries the rejected operation", "It makes the promise successful"] },
        codeFill(
          "nd-scen-2",
          "Який метод припиняє приймати нові HTTP-з'єднання і викликає callback після закриття сервера?",
          "Which method stops accepting new HTTP connections and calls back when the server closes?",
          "js",
          "process.on('SIGTERM', () => {\n  server.___(() => {\n    console.log('Server closed');\n  });\n});",
          ["close"],
          true,
          { explanationUk: "server.close() — лише частина shutdown: окремо закрийте інші ресурси й установіть таймаут.", explanationEn: "server.close() is only part of shutdown: close other resources and set a timeout separately." },
        ),
        { ...mcq(
          "nd-scen-3",
          "Який сигнал ОС надсилається контейнером Docker/Kubernetes для коректної зупинки процесу?",
          "Which OS signal is sent by Docker/Kubernetes to initiate graceful stop?",
          ["SIGTERM (після чого через grace period надсилається SIGKILL)", "SIGINT", "SIGHUP", "SIGSTOP"],
          0,
          { explanationUk: "Звичайний сигнал зупинки — SIGTERM; після grace period процес можуть примусово завершити.", explanationEn: "SIGTERM normally initiates termination; the process may be forcibly killed after the grace period." },
        ), optionsEn: ["SIGTERM (followed by SIGKILL after the grace period)", "SIGINT", "SIGHUP", "SIGSTOP"] },
      ],
    ),
    lesson(
      "node-scen-stream-backpressure",
      "Запобігання переповненню пам'яті: Backpressure",
      "Memory safety: stream backpressure & pipeline",
      3,
      false,
      [
        concept("nd-scen-stream-concept", "Потоки та backpressure", "Streams and backpressure", {
          uk: "Якщо writable.write(chunk) повертає false, призупиніть джерело до події drain. Ігнорування сигналу може роздути буфер, коли споживач повільніший за джерело; це не обов'язково витік пам'яті. pipeline поєднує потоки, передає backpressure і помилки; обробляйте відхилення проміса та розрив з'єднання.",
          en: "When writable.write(chunk) returns false, pause the source until drain. Ignoring that signal can grow the buffer when the consumer is slower than the source; this is not necessarily a memory leak. pipeline connects streams and propagates backpressure and errors; handle its promise rejection and connection failures.",
        }),
        { ...(codeRead(
          "nd-scen-4",
          "Чому цей код може накопичувати багато даних у пам'яті, якщо клієнт повільний?",
          "Why can this code buffer a lot of data when the client is slow?",
          "js",
          "// Небезпечно при повільному клієнті:\nreadable.on('data', chunk => {\n  res.write(chunk); // буфер накопичується в пам'яті!\n});",
          [
            "Джерело читає файл швидше, ніж мережевий сокет клієнта встигає надсилати байти (відсутній backpressure)",
            "res.write() не вміє передавати бінарні байти",
            "readable streams закриваються автоматично",
            "Node.js не підтримує буфери більше 1 КБ",
          ],
          0,
          { explanationUk: "Код ігнорує false від write і не очікує drain.", explanationEn: "The code ignores a false return from write and does not wait for drain." },
        ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["The source can outpace the network socket without backpressure", "res.write cannot send binary bytes", "Readable streams always close immediately", "Node.js cannot buffer more than 1 KB"] },
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
        concept("nd-scen-file-concept", "Публікація файлу та скасування", "File publication and cancellation", {
          uk: "Для заміни конфігурації можна записати дані в унікальний тимчасовий файл у тому самому каталозі, закрити його та перейменувати на цільовий шлях. На файловій системі з атомарним rename читачі цільового шляху бачать стару або нову версію; поведінка залежить від платформи й файлової системи. Це не гарантує збереження даних після збою живлення: для durability можуть знадобитися синхронізація файлу й каталогу та перевірка гарантій ОС. Обробляйте помилки й прибирайте тимчасовий файл; для підтримуваних операцій AbortSignal запитує скасування, але не відкочує вже виконані дії.",
          en: "To replace a configuration file, write data to a unique temporary file in the same directory, close it, and rename it to the target path. On a filesystem with atomic rename, readers of the target path see the old or new version; behavior depends on the platform and filesystem. This alone does not guarantee durability after power loss: syncing the file and directory and checking OS guarantees may be necessary. Handle failures and clean up the temporary file; AbortSignal requests cancellation of supported operations but does not roll back work already done.",
        }),
        { ...(codeRead(
          "nd-scen-6",
          "За умови атомарного rename в одній файловій системі, що дає цей спосіб читачам цільового файлу?",
          "Assuming atomic rename on the same filesystem, what does this approach provide to target-file readers?",
          "js",
          "// tmp is a unique path in the target directory\nawait fs.writeFile(tmp, data);\nawait fs.rename(tmp, 'config.json');",
          [
            "Читачі цільового шляху бачать стару або нову версію, а не часткову заміну",
            "Дані гарантовано збережені після будь-якого збою живлення",
            "Одночасні автори автоматично узгоджують свої зміни",
            "Усі файлові системи гарантують однакову поведінку rename",
          ],
          0,
          { explanationUk: "Атомарна видимість і довговічність після збою — різні властивості.", explanationEn: "Atomic visibility and durability after a crash are separate properties." },
        ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["Target-path readers see the old or new version, not a partial replacement", "Data is guaranteed durable after every power failure", "Concurrent writers automatically reconcile their changes", "All filesystems guarantee identical rename behavior"] },
        codeFill(
          "nd-scen-7",
          "Допишіть код ENOENT для відсутнього файлу; інші помилки передайте далі.",
          "Complete the ENOENT code for a missing file; propagate other errors.",
          "js",
          "try {\n  await fs.readFile(path);\n} catch (err) {\n  if (err.code === '___') { return null; }\n  throw err;\n}",
          ["ENOENT"],
          true,
          { explanationUk: "Не маскуйте помилки доступу або інші збої як відсутній файл.", explanationEn: "Do not mask permission errors or other failures as a missing file." },
        ),
        { ...mcq("nd-scen-file-abort", "Що гарантує AbortSignal для підтримуваної файлової операції?", "What does AbortSignal guarantee for a supported file operation?", ["Він запитує скасування, але не відкочує вже виконані дії", "Він відновлює попередній стан усіх файлів", "Він гарантує збереження даних після вимкнення живлення", "Він скасовує будь-яку операцію миттєво незалежно від реалізації"], 0, { explanationUk: "Обробляйте помилку скасування і залишки частково виконаної роботи.", explanationEn: "Handle the cancellation error and any partially completed work." }), optionsEn: ["It requests cancellation but does not roll back work already done", "It restores the previous state of all files", "It guarantees durability after power loss", "It instantly cancels every operation regardless of implementation"] },
      ],
    ),
    exam(
      "node-scen-exam",
      "Екзамен: стійкість Node.js",
      "Exam: Node resilience",
      3,
      [
        { ...mcq(
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
          { explanationUk: "Синхронне читання затримує callback-и на тому самому потоці.", explanationEn: "A synchronous read delays callbacks on the same thread." },
        ), optionsEn: ["They block the event loop and delay work on that JavaScript thread", "They delete the source file", "They cannot read JSON", "V8 forbids synchronous code"] },
        { ...(codeRead(
          "nd-scen-9",
          "Що робить виклик process.exit(1)?",
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
          { explanationUk: "Примусовий вихід може перервати незавершений асинхронний вивід і очищення ресурсів.", explanationEn: "Forced exit can interrupt pending asynchronous output and resource cleanup." },
        ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["It terminates the process immediately with exit code 1", "It restarts the server", "It throws an exception catchable by try/catch", "It returns HTTP status 200 to the client"] },
        codeFill(
          "nd-scen-10",
          "Глобальний об'єкт для роботи з буферами бінарних даних",
          "Global object for binary data buffers in Node.js",
          "js",
          "const buf = ___.from('hello world', 'utf8');",
          ["Buffer"],
          true,
        ),
        { ...mcq(
          "nd-scen-11",
          "Яке твердження про setTimeout(fn, 0) і setImmediate є правильним для коду верхнього рівня?",
          "Which statement about setTimeout(fn, 0) and setImmediate is correct at top level?",
          ["Не слід покладатися на фіксований порядок їх виконання", "Таймер завжди виконується першим", "setImmediate завжди виконується першим", "Вони синхронно переривають поточний код"],
          0,
          { explanationUk: "Порядок залежить від контексту й умов виконання; не використовуйте його як гарантію.", explanationEn: "Order depends on execution context and conditions; do not rely on a fixed ordering." },
        ), optionsEn: ["Do not rely on a fixed order between them", "The timer always runs first", "setImmediate always runs first", "They synchronously interrupt the current code"] },
      ],
    ),
  ],
);

const capstone = unit("capstone", "Підсумковий проєкт", "Capstone", [
  lesson(
    "nf-capstone-server",
    "Мініпроєкт: HTTP-сервер",
    "Mini: tiny HTTP server",
    3,
    false,
    [
      concept("nf-capstone-concept", "Від запуску до перевірки", "From startup to verification", {
        uk: "Node HTTP-сервер створюють через http.createServer(handler) і запускають методом listen. Обробник має завершувати кожну відповідь, наприклад res.end('ok'), інакше клієнт чекатиме. process.env.PORT містить рядок: перевірте значення й використайте локальний порт, коли змінна відсутня. Додайте npm start та інструкцію запуску. Після запуску локально перевірте відповідь через curl і зупиніть процес. Вбудована перевірка проєкту шукає текст у файлах і не перевіряє роботу сервера.",
        en: "Create a Node HTTP server with http.createServer(handler) and start it with listen. The handler must end every response, for example with res.end('ok'), or the client keeps waiting. process.env.PORT is a string: validate it and use a local port when it is absent. Add npm start and startup instructions. After starting locally, check the response with curl and stop the process. The built-in project grader searches file text and does not verify server behavior.",
      }),
      {
        id: "nf-c1",
        type: "code_project",
        promptUk:
          "Створіть HTTP-сервер, який відповідає 'ok' і завершує відповідь. Використайте PORT із середовища з локальним значенням за відсутності, npm start і README з інструкцією перевірки через curl. Статична перевірка лише шукає в server.js: http, createServer, listen, PORT; у package.json: start, node; у README: env. Вона не запускає код і не перевіряє поведінку — перевірте її локально.",
        promptEn:
          "Build an HTTP server that responds 'ok' and ends the response. Use PORT from the environment with a local fallback when absent, add npm start, and document a curl check in README. The static grader only searches server.js for http, createServer, listen, PORT; package.json for start, node; and README for env. It does not run code or verify behavior; verify it locally.",
        files: [
          {
            id: "js",
            name: "server.js",
            language: "javascript",
            starter: `// TODO: implement the server
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
<!-- Add startup and verification instructions. -->
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
      { ...mcq("nf-capstone-response", "Клієнт отримав заголовки, але очікує завершення відповіді. Що слід перевірити в обробнику?", "The client received headers but is waiting for the response to finish. What should you check in the handler?", ["Чи викликано res.end після формування відповіді", "Чи названо файл package.json", "Чи є каталог node_modules у README", "Чи встановлено кольоровий логер"], 0, { explanationUk: "Відповідь потрібно завершити, коли всі дані надіслано.", explanationEn: "End the response once all data has been sent." }), optionsEn: ["Whether res.end is called after producing the response", "Whether the file is named package.json", "Whether README mentions node_modules", "Whether a colored logger is installed"] },
    ],
  ),
  exam("nf-cap-exam", "Фінальна контрольна Node", "Final Node exam", 3, [
    { ...mcq("nf-ce1", "Що надає Node.js для серверного JavaScript?", "What does Node.js provide for server-side JavaScript?", ["Середовище виконання з API для файлів і мережі", "Лише браузерний DOM", "Реляційну базу даних", "Тільки бібліотеку CSS"], 0), optionsEn: ["A runtime with file and network APIs", "Only the browser DOM", "A relational database", "Only a CSS library"] },
    codeFill("nf-ce2", "Завантажте модуль fs у CommonJS за допомогою require.", "Load the fs module in CommonJS using require.", "js", "const fs = ___('fs');", ["require"], true),
    codeFill("nf-ce3", "Створіть HTTP-сервер методом createServer.", "Create an HTTP server using createServer.", "js", "http.___(fn)", ["createServer"], true),
    codeFill("nf-ce4", "Отримайте PORT зі змінних середовища process.env.", "Read PORT from process.env.", "js", "process.___.PORT", ["env"], true),
    codeFill("nf-ce5", "Оголосіть async-функцію.", "Declare an async function.", "js", "___ function main(){}", ["async"], true),
    { ...mcq("nf-ce6", "Як запустити скрипт build, визначений у package.json?", "How do you run the build script defined in package.json?", ["npm run build", "node install build", "git run build", "curl build"], 0), optionsEn: ["npm run build", "node install build", "git run build", "curl build"] },
  ]),
]);

const eventsU = unit("events_streams", "Події та потоки", "Events & streams", [
  lesson(
    "nf-events",
    "Основи EventEmitter",
    "EventEmitter basics",
    3,
    false,
    [
      concept("nf-events-concept", "Слухачі та події", "Listeners and events", {
        uk: "EventEmitter дає об'єкту публікувати іменовані події, а слухачам — реагувати на них. on додає слухач, once видаляє його після першого виклику, а emit синхронно викликає зареєстровані слухачі у порядку реєстрації з переданими аргументами. Для події error потрібна обробка: без слухача error Node.js викидає помилку. Видаляйте непотрібні слухачі, щоб вони не накопичувалися.",
        en: "EventEmitter lets an object emit named events and listeners react to them. on registers a listener, once removes it after its first call, and emit synchronously invokes registered listeners in registration order with the supplied arguments. Handle the error event: without an error listener, Node.js throws. Remove listeners when they are no longer needed to prevent accumulation.",
      }),
      { ...mcq("nf-ev1", "Що відбувається, коли EventEmitter викликає emit для події зі слухачами?", "What happens when EventEmitter emits an event with registered listeners?", ["Слухачі викликаються синхронно в порядку реєстрації", "Слухачі завжди працюють у нових потоках", "Подія автоматично записується в базу", "Слухачі викликаються лише після перезапуску процесу"], 0, { explanationUk: "emit викликає слухачі до повернення керування.", explanationEn: "emit invokes listeners before returning." }), optionsEn: ["Listeners are called synchronously in registration order", "Listeners always run on new threads", "The event is automatically stored in a database", "Listeners run only after the process restarts"] },
      codeFill(
        "nf-ev2",
        "Зареєструйте fn як слухач події data за допомогою on.",
        "Register fn as a listener for the data event using on.",
        "js",
        "emitter.___('data', fn);",
        ["on"],
        true,
        { explanationUk: "on додає слухач; його можна прибрати пізніше.", explanationEn: "on registers a listener that can later be removed." },
      ),
      codeFill(
        "nf-ev3",
        "Згенеруйте подію ready з аргументом payload за допомогою emit.",
        "Emit the ready event with payload using emit.",
        "js",
        "emitter.___('ready', payload);",
        ["emit"],
        true,
        { explanationUk: "Аргумент payload передається слухачам ready.", explanationEn: "The payload argument is passed to ready listeners." },
      ),
      { ...mcq("nf-ev7", "Що станеться, якщо EventEmitter згенерує error без слухача error?", "What happens when EventEmitter emits error without an error listener?", ["Буде викинуто помилку", "Подію завжди мовчки проігнорують", "Всі слухачі автоматично перереєструються", "Подія перетвориться на ready"], 0, { explanationUk: "Обробляйте error відповідно до життєвого циклу об'єкта.", explanationEn: "Handle error according to the object's lifecycle." }), optionsEn: ["An error is thrown", "The event is always silently ignored", "All listeners automatically register again", "The event becomes ready"] },
    ],
  ),
  lesson(
    "nf-streams",
    "Потоки читання",
    "Readable streams idea",
    3,
    false,
    [
      concept("nf-streams-concept", "Дані частинами та backpressure", "Chunks and backpressure", {
        uk: "Readable stream дає дані частинами, а writable stream їх приймає; це дозволяє обробляти великий файл без завантаження всього файлу одразу. pipe з'єднує потоки й узгоджує швидкість через backpressure. Якщо обробляєте writable.write вручну, значення false означає потребу зачекати drain. Для повного ланцюга зручний pipeline: він поширює помилки та закриває потоки при збої; обробіть і його помилку.",
        en: "A readable stream supplies chunks and a writable stream accepts them, allowing a large file to be processed without loading it all at once. pipe connects streams and coordinates their speed using backpressure. When writing manually, a false return from writable.write means you should wait for drain. For a complete chain, pipeline propagates errors and closes streams on failure; handle its error too.",
      }),
      { ...mcq("nf-ev4", "Чому потік корисний для обробки великого файлу?", "Why is a stream useful for processing a large file?", ["Дані можна обробляти частинами, не завантажуючи файл цілком", "Потік гарантує відсутність помилок читання", "Потік завжди перетворює файл на JSON", "Файли доступні лише через потоки"], 0), optionsEn: ["Data can be processed in chunks without loading the whole file", "A stream guarantees no read errors", "A stream always converts the file to JSON", "Files can only be accessed through streams"] },
      codeFill(
        "nf-ev5",
        "З'єднайте readable із writable методом pipe.",
        "Connect readable to writable with pipe.",
        "js",
        "readable.___(writable);",
        ["pipe"],
        true,
        { explanationUk: "pipe передає дані до writable з урахуванням backpressure.", explanationEn: "pipe forwards data to writable while respecting backpressure." },
      ),
      { ...mcq("nf-ev6", "Як реагувати на false від writable.write при ручному записі?", "How should manual writing respond when writable.write returns false?", ["Призупинити подачу й дочекатися drain", "Продовжувати запис без обмежень", "Вважати, що chunk не був прийнятий, і негайно записати його ще раз", "Видалити джерело даних"], 0, { explanationUk: "Chunk уже передано; false сигналізує зачекати перед подальшим записом.", explanationEn: "The chunk was accepted; false signals that further writes should wait." }), optionsEn: ["Pause input and wait for drain", "Keep writing without bounds", "Assume the chunk was rejected and immediately write it again", "Delete the data source"] },
      { ...mcq("nf-ev8", "Яка перевага pipeline перед ручним з'єднанням кількох потоків?", "What is an advantage of pipeline over manually connecting several streams?", ["Він передає помилки й завершує потоки при збої", "Він гарантує, що помилок не станеться", "Він завантажує весь файл у пам'ять", "Він скасовує потребу обробляти результат"], 0), optionsEn: ["It propagates errors and destroys streams on failure", "It guarantees errors cannot occur", "It loads the whole file into memory", "It removes the need to handle the result"] },
    ],
  ),
  exam("nf-events-exam", "Контрольна: events/streams", "Exam: events/streams", 3, [
    { ...mcq("nf-eve1", "Який метод додає слухач, що викликається лише для першої події?", "Which method registers a listener that runs only for the first event?", ["once", "emit", "pipe", "write"], 0), optionsEn: ["once", "emit", "pipe", "write"] },
    codeFill("nf-eve2", "Згенеруйте подію x методом emit.", "Emit event x using emit.", "js", "e.___('x')", ["emit"], true),
    codeFill("nf-eve3", "З'єднайте читання rs із записом ws методом pipe.", "Connect readable rs to writable ws using pipe.", "js", "rs.___(ws)", ["pipe"], true),
    { ...mcq("nf-eve4", "Що означає false від writable.write(chunk)?", "What does false from writable.write(chunk) mean?", ["Перед наступним записом слід дочекатися drain", "Chunk відхилено й потрібно негайно повторити", "Запис повністю завершено і потік закрито", "Дані автоматично видалено"], 0), optionsEn: ["Wait for drain before writing more", "The chunk was rejected and must be retried immediately", "Writing has finished and the stream is closed", "The data was automatically deleted"] },
  ]),
  lesson(
    "nf-json-errors",
    "JSON та обробка помилок",
    "JSON & errors lite",
    2,
    true,
    [
      concept("nf-json-concept", "JSON і межі try/catch", "JSON and try/catch boundaries", {
        uk: "JSON.parse перетворює коректний JSON-рядок на значення JavaScript і викидає SyntaxError для некоректного синтаксису. JSON.stringify серіалізує підтримуване значення; це не перевірка схеми. try/catch перехоплює синхронний throw у своєму блоці, а в async-функції також відхилення проміса, якого дочекалися через await. Помилку в callback-у, викликаному пізніше, треба обробити в ньому або передати через проміс.",
        en: "JSON.parse converts a valid JSON string into a JavaScript value and throws SyntaxError for invalid syntax. JSON.stringify serializes a supported value; it does not validate a schema. try/catch catches synchronous throws in its block and, inside an async function, rejection of a promise awaited there. An error in a callback invoked later must be handled in that callback or propagated through a promise.",
      }),
      codeFill(
        "nf-je1",
        "Розберіть JSON-рядок методом parse.",
        "Parse the JSON string using parse.",
        "js",
        "const obj = JSON.___('{\"a\":1}');",
        ["parse"],
        true,
      ),
      codeFill(
        "nf-je2",
        "Серіалізуйте об'єкт у JSON методом stringify.",
        "Serialize the object to JSON using stringify.",
        "js",
        "const s = JSON.___({ a: 1 });",
        ["stringify"],
        true,
      ),
      { ...mcq("nf-je3", "Що станеться, якщо JSON.parse отримає некоректний JSON у блоці try?", "What happens when JSON.parse receives invalid JSON inside a try block?", ["Викинуту синтаксичну помилку можна перехопити в catch", "parse завжди поверне порожній об'єкт", "catch не може обробляти синхронні помилки", "Помилка автоматично виправить JSON"], 0), optionsEn: ["The thrown syntax error can be caught in catch", "parse always returns an empty object", "catch cannot handle synchronous errors", "The error automatically repairs the JSON"] },
      codeFill(
        "nf-je4",
        "Викиньте нову помилку за допомогою throw.",
        "Throw the new error using throw.",
        "js",
        "___ new Error('boom');",
        ["throw"],
        true,
      ),
      { ...mcq("nf-je5", "Чи перехопить зовнішній try/catch помилку, викинуту пізніше всередині callback-а setTimeout?", "Will an outer try/catch catch an error thrown later inside a setTimeout callback?", ["Ні, callback виконується після виходу з блоку try", "Так, будь-який callback назавжди належить цьому try", "Так, якщо затримка нульова", "Ні, тому що throw працює лише з JSON"], 0, { explanationUk: "Обробіть помилку всередині callback-а або передайте її через проміс.", explanationEn: "Handle the error inside the callback or propagate it through a promise." }), optionsEn: ["No, the callback runs after the try block has exited", "Yes, every callback belongs to that try forever", "Yes, if the delay is zero", "No, because throw only works with JSON"] },
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
        concept("nf-prod-config-concept", "Конфігурація та завершення", "Configuration and shutdown", {
          uk: "Перед прийманням трафіку перевіряйте обов'язкові змінні та їхні допустимі значення; помилку повідомляйте без секретів. Для зовнішнього запиту передавайте підтримуваний AbortSignal і обробляйте відхилення: скасування не гарантує, що віддалений сервер не виконав дію. На SIGTERM зніміть готовність, припиніть приймати нові з'єднання, дочекайтеся активних запитів і закрийте ресурси. Обмежте shutdown таймером; unref дозволяє процесу завершитись раніше, якщо інша робота вже завершена.",
          en: "Validate required environment values before accepting traffic and report errors without secrets. Pass a supported AbortSignal to outbound requests and handle rejection: cancellation does not prove the remote server did not perform the operation. On SIGTERM mark the instance unready, stop accepting connections, drain active requests, and close resources. Bound shutdown with a timer; unref lets the process exit earlier if no other work remains.",
        }),
        { ...mcq(
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
        ), optionsEn: ["To fail startup before accepting traffic rather than return hidden production errors", "To reduce node_modules size", "Because Node.js forbids reading process.env inside functions", "To automatically create a database"] },
        { ...(codeRead(
          "nf-prod-2",
          "Передбачте поведінку: що станеться з fetch, коли спрацює AbortSignal.timeout(50)?",
          "Predict: what happens when `AbortSignal.timeout(50)` fires while `fetch` is still pending?",
          "js",
          "const res = await fetch(url, { signal: AbortSignal.timeout(50) });",
          [
            "Проміс fetch відхилиться через скасування; помилку потрібно обробити",
            "fetch поверне порожній рядок зі статусом 200",
            "Node.js поставить процес на паузу на 50 секунд",
            "Таймер проігнорується, якщо сервер відповідає 500",
          ],
          0,
          why(
            "Скасування запиту не доводить, що сервер не виконав дію; обробіть відхилення.",
            "Cancellation does not prove the server did not perform the operation; handle the rejection.",
          ),
        ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["The fetch promise rejects due to cancellation; handle the error", "fetch returns an empty string with status 200", "Node.js pauses the process for 50 seconds", "The timer is ignored whenever the server returns 500"] },
        codeFill(
          "nf-prod-3",
          "Допишіть метод, який не дозволить самому таймеру утримувати процес відкритим.",
          "Complete the method that prevents the timer alone from keeping the process alive.",
          "js",
          "const timer = setTimeout(() => process.exit(1), 5000);\ntimer.___();",
          ["unref"],
          true,
          why(
            "`timer.unref()` дозволяє процесу вийти, якщо інших активних ресурсів більше немає.",
            "`timer.unref()` lets the process exit if no other active resources remain.",
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
        concept("nf-prod-logs-concept", "Діагностика та перевірка сервісу", "Service diagnostics and verification", {
          uk: "Структурований лог зі стабільними полями, рівнем і requestId допомагає зв'язати події запиту; не записуйте токени чи інші секрети. Довга синхронна CPU-робота затримує інші callback-и того самого потоку, тому важкі обчислення можна винести до worker thread або окремого процесу. Автоматичні тести мають перевіряти валідні й невалідні конфігурації; статичний пошук фрагментів коду сам по собі не запускає тест і не доводить поведінку.",
          en: "Structured logs with stable fields, a level, and requestId help correlate request events; do not log tokens or other secrets. Long synchronous CPU work delays other callbacks on the same thread, so heavy computation can be moved to a worker thread or separate process. Automated tests should cover valid and invalid configuration; static substring checks alone do not execute tests or prove behavior.",
        }),
        { ...(codeRead(
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
        ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["The JavaScript thread is busy, delaying other callbacks on that thread", "Express blocks port 4000 during JSON.stringify", "HTTP requires health checks to wait 30 seconds", "V8 clears all sockets for arrays above 1000 elements"] },
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
          "Реалізуйте readConfig: PORT має бути цілим числом 1–65535, інакше викиньте помилку. Додайте тести валідного й невалідного значень через node:test. Перевірка шукає лише фрагменти коду та не запускає файли; запустіть тести локально для перевірки поведінки.",
          "Implement readConfig: PORT must be an integer from 1 to 65535, otherwise throw. Add node:test cases for valid and invalid values. The grader only searches for code fragments and does not run files; run the tests locally to verify behavior.",
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
      { ...mcq(
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
      ), optionsEn: ["At startup before listening on the port", "Only after POST /login", "In browser localStorage", "After the first SIGKILL"] },
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
      { ...(codeRead(
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
      ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["It throws invalid_port when validation runs", "It silently substitutes port 80", "It converts 'abc' to 3000", "It returns undefined without throwing"] },
      { ...mcq(
        "nf-pe4",
        "Що робити з пулом БД під час graceful shutdown HTTP-сервісу?",
        "What should happen to the database pool during graceful HTTP service shutdown?",
        [
          "Закрити його після завершення активних запитів, обмеживши час очікування",
          "Закрити його до завершення всіх запитів, які ним користуються",
          "Залишити відкритим без обмеження часу",
          "Викликати SIGKILL для кожного запиту",
        ],
        0,
        why(
          "Спочатку знімаємо навантаження та закриваємо сервер, потім звільняємо пули БД.",
          "Stop accepting new traffic first, finish active requests, then close DB pools.",
        ),
      ), optionsEn: ["Close it after active requests finish, with a bounded wait", "Close it before requests using it finish", "Leave it open without a deadline", "Send SIGKILL to every request"] },
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
