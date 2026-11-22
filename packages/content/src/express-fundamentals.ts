import type { CourseContent, Exercise } from "./types.js";
import {
  codeFill,
  codeOrder,
  codeOrderAuto,
  codeOutputMcq,
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

const intro = unit("intro", "Вступ до Express", "Express intro", [
  lesson(
    "ef-what",
    "Що таке Express",
    "What is Express",
    1,
    true,
    [
      concept("ef-intro-concept", "Express і Node.js", "Express and Node.js", {
        uk: "Express — бібліотека для створення HTTP-застосунків у Node.js. Вона допомагає зіставляти HTTP-метод і шлях із обробником, передавати запит через middleware та формувати відповідь. Node.js виконує JavaScript і надає мережевий сервер; Express додає зручний шар поверх нього. Сам Express не створює базу даних, не перевіряє права автоматично й не запускає сервер, доки застосунок не почне слухати порт.",
        en: "Express is a library for building HTTP applications in Node.js. It helps match an HTTP method and path to a handler, pass requests through middleware, and build responses. Node.js runs JavaScript and supplies the network server; Express adds a convenient layer on top. Express does not create a database, automatically authorize users, or start listening until the application listens on a port.",
      }),
      { ...mcq(
        "ef-i1",
        "Express — це:",
        "Express is:",
        ["мінімальний web-фреймворк для Node.js", "база даних SQL", "препроцесор CSS", "рушій браузера"],
        0,
        why("Express працює в Node.js та надає засоби для HTTP-застосунків.", "Express runs in Node.js and provides tools for HTTP applications."),
      ), optionsEn: ["a minimal web framework for Node.js", "a SQL database", "a CSS preprocessor", "a browser engine"] },
      { ...mcq(
        "ef-i2",
        "Express типово використовують для:",
        "Express is typically used for:",
        ["HTTP API та вебсерверів", "лише GPU-шейдерів", "лише макросів Excel", "лише мобільних UI-наборів"],
        0,
      ), optionsEn: ["HTTP APIs and web servers", "only GPU shaders", "only Excel macros", "only mobile UI kits"] },
      codeFill("ef-i3", "Допишіть назву пакета Express у CommonJS require.", "Complete the Express package name in a CommonJS require call.", "js", "const express = require('___');", ["express"], true, why("Пакет потрібно спочатку встановити в проєкті.", "Install the package in the project first.")),
      { ...mcq("ef-i7", "Чи перевіряє Express право користувача на конкретний запис автоматично?", "Does Express automatically verify a user's permission to access a specific record?", ["Ні, перевірку авторизації має реалізувати застосунок", "Так, якщо існує маршрут", "Так, якщо запит має JSON", "Так, якщо сервер слухає порт"], 0, why("Маршрут і формат запиту не доводять право доступу.", "A route and request format do not establish permission.")), optionsEn: ["No, the application must enforce authorization", "Yes, whenever a route exists", "Yes, for JSON requests", "Yes, when the server listens on a port"] },
    ],
  ),
  lesson(
    "ef-install",
    "Встановлення та імпорт",
    "Install & import",
    1,
    true,
    [
      concept("ef-install-concept", "Встановлення пакета", "Installing the package", {
        uk: "У теці проєкту з package.json команда npm install express додає Express до залежностей і встановлює його. У CommonJS пакет завантажують через require('express'), а в ES-модулі — import express from 'express'. Формат модуля визначає конфігурація Node.js, зокрема розширення файла і поле type у package.json. Перевірка нижче оцінює текст відповіді й не встановлює пакет у вашому середовищі.",
        en: "In a project directory with package.json, npm install express adds Express to dependencies and installs it. In CommonJS load it with require('express'); in an ES module use import express from 'express'. Node.js configuration, including the file extension and package.json type, determines module format. The checks below grade answer text and do not install a package in your environment.",
      }),
      codeFill("ef-i4", "Встановіть пакет express через npm i.", "Install the express package using npm i.", "bash", "npm i ___", ["express"], true),
      { ...mcq("ef-i5", "Який статичний імпорт підходить для Express в ES-модулі?", "Which static import loads Express in an ES module?", ["import express from 'express'", "import css from 'sql'", "require('html')", "import React from 'react'"], 0), optionsEn: ["import express from 'express'", "import css from 'sql'", "require('html')", "import React from 'react'"] },
      { id: "ef-i6", type: "match", promptUk: "Зіставте інструменти та їхні ролі.", promptEn: "Match each tool to its role.", pairs: [{ left: "Node.js", right: "Середовище виконання JavaScript" }, { left: "Express", right: "HTTP-фреймворк" }, { left: "npm", right: "Менеджер пакетів" }], pairsEn: [{ left: "Node.js", right: "JavaScript runtime" }, { left: "Express", right: "HTTP framework" }, { left: "npm", right: "Package manager" }] },
      { ...mcq("ef-i8", "Яка команда зазвичай використовує наявний узгоджений npm lockfile для чистої установки в CI?", "Which command normally uses an existing consistent npm lockfile for a clean CI install?", ["npm ci", "npm start", "node --version", "git status"], 0, why("npm ci вимагає узгодженого lockfile і не переписує його.", "npm ci requires a consistent lockfile and does not rewrite it.")), optionsEn: ["npm ci", "npm start", "node --version", "git status"] },
    ],
  ),
  exam("ef-intro-exam", "Контрольна: intro", "Exam: intro", 1, [
    { ...mcq("ef-ie1", "У якому середовищі працює Express?", "Which runtime does Express run on?", ["Node.js", "Лише в браузері", "Лише в SQL", "Лише в CSS"], 0), optionsEn: ["Node.js", "Only in a browser", "Only in SQL", "Only in CSS"] },
    codeFill("ef-ie2", "Завантажте встановлений пакет express через require.", "Load the installed express package using require.", "js", "const express = require('___');", ["express"], true),
    codeFill("ef-ie3", "Встановіть express через npm i.", "Install express using npm i.", "bash", "npm i ___", ["express"], true),
    { ...mcq("ef-ie4", "Для чого зазвичай застосовують Express?", "What is Express typically used for?", ["Для HTTP-серверів і API", "Лише для шрифтів", "Лише для Git", "Лише для ключів Redis"], 0), optionsEn: ["For HTTP servers and APIs", "Only for fonts", "Only for Git", "Only for Redis keys"] },
  ]),
]);

const appBasics = unit("app-basics", "Основи застосунку", "App basics", [
  lesson(
    "ef-create-app",
    "express() + listen",
    "express() + listen",
    2,
    false,
    [
      concept("ef-app-concept", "Створення та запуск", "Creating and starting an app", {
        uk: "Після імпорту express() створює об'єкт застосунку, на якому реєструють middleware та маршрути. app.listen(port) створює HTTP-сервер і починає слухати порт; сам виклик express() мережевий порт не відкриває. У реальному сервісі перевіряйте конфігурацію порту й обробляйте помилки сервера, наприклад зайнятий порт. Завдання тут перевіряють фрагменти коду без запуску сервера.",
        en: "After import, express() creates an application object on which middleware and routes are registered. app.listen(port) creates an HTTP server and starts listening; calling express() alone does not open a network port. In a real service, validate port configuration and handle server errors such as an occupied port. These exercises grade code fragments without starting a server.",
      }),
      codeFill("ef-a1", "Створіть застосунок викликом імпортованої функції express.", "Create the app by calling the imported express function.", "js", "const app = ___();", ["express"], true),
      codeFill("ef-a2", "Почніть слухати порт 3000 методом listen.", "Start listening on port 3000 using listen.", "js", "app.___(3000);", ["listen"], true),
      codeOrder(
        "ef-a3",
        "Упорядкуйте імпорт, створення застосунку та запуск сервера.",
        "Order the import, app creation, and server startup.",
        "js",
        ["app.listen(3000);", "const express = require('express');", "const app = express();"],
        ["const express = require('express');", "const app = express();", "app.listen(3000);"],
      ),
      { ...mcq("ef-a7", "Що відбудеться після const app = express(), якщо listen ще не викликано?", "What happens after const app = express() if listen has not been called?", ["Створюється об'єкт застосунку, але порт ще не слухається", "Сервер обов'язково слухає порт 3000", "Автоматично створюється база даних", "Усі маршрути вже доступні через мережу"], 0, why("Слухання порту запускається окремим кроком.", "Listening on a port is a separate step.")), optionsEn: ["An app object is created, but no port is listening yet", "The server must listen on port 3000", "A database is created automatically", "All routes are already available over the network"] },
    ],
  ),
  lesson(
    "ef-first-route",
    "Перший GET-маршрут",
    "First GET route",
    2,
    false,
    [
      concept("ef-route-concept", "Обробник запиту", "A request handler", {
        uk: "app.get('/health', handler) реєструє обробник GET для шляху /health. Express передає йому req з даними запиту та res для відповіді; res.send('ok') надсилає тіло й завершує відповідь. Якщо middleware не надсилає відповідь, воно має передати керування через next; інакше запит може зависнути. Порядок реєстрації маршруту й middleware впливає на обробку.",
        en: "app.get('/health', handler) registers a GET handler for /health. Express passes req with request data and res for the response; res.send('ok') sends a body and ends the response. If middleware does not send a response, it must pass control with next; otherwise the request can hang. The order in which routes and middleware are registered affects handling.",
      }),
      codeFill("ef-a4", "Зареєструйте GET-маршрут методом get.", "Register a GET route using get.", "js", "app.___('/', (req, res) => res.send('ok'));", ["get"], true),
      codeFill("ef-a5", "Надішліть тіло відповіді методом send.", "Send the response body using send.", "js", "res.___('hello');", ["send"], true),
      { ...mcq("ef-a6", "Який запит відповідає app.get('/health', handler)?", "Which request matches app.get('/health', handler)?", ["GET /health", "POST /health", "GET /users", "DELETE /health"], 0, why("Маршрут зіставляє метод і шлях; GET також має поведінку для HEAD.", "The route matches method and path; GET also has behavior for HEAD.")), optionsEn: ["GET /health", "POST /health", "GET /users", "DELETE /health"] },
      { ...mcq("ef-a8", "Middleware не надсилає відповідь і не викликає next(). Що може статися?", "Middleware neither sends a response nor calls next(). What can happen?", ["Запит залишиться без завершеної відповіді", "Express завжди автоматично надішле 200", "Автоматично виконається наступний маршрут", "Сервер створить нову базу даних"], 0, why("Потрібно завершити відповідь або передати керування далі.", "End the response or pass control onward.")), optionsEn: ["The request can remain without a completed response", "Express always sends 200 automatically", "The next route runs automatically", "The server creates a new database"] },
    ],
  ),
  exam("ef-app-exam", "Контрольна: app", "Exam: app", 2, [
    codeFill("ef-ae1", "Створіть застосунок викликом express.", "Create an app by calling express.", "js", "const app = ___();", ["express"], true),
    codeFill("ef-ae2", "Запустіть прослуховування порту методом listen.", "Start listening on the port using listen.", "js", "app.___(3000)", ["listen"], true),
    codeFill("ef-ae3", "Зареєструйте GET /health методом get.", "Register GET /health using get.", "js", "app.___('/health', handler)", ["get"], true),
    { ...mcq("ef-ae4", "Що робить res.send('ok')?", "What does res.send('ok') do?", ["Надсилає тіло й завершує відповідь", "Запускає npm", "Створює базу даних", "Розбирає CSS"], 0), optionsEn: ["Sends the body and ends the response", "Starts npm", "Creates a database", "Parses CSS"] },
  ]),
]);

const routesU = unit("routes", "Маршрути", "Routes", [
  lesson(
    "ef-methods",
    "HTTP-методи маршрутів",
    "HTTP methods on app",
    2,
    false,
    [
      concept("ef-methods-concept", "Метод і шлях", "Method and path", {
        uk: "Express зіставляє HTTP-метод і шлях із зареєстрованим маршрутом. Наприклад, GET /users зазвичай читає колекцію, POST /users створює ресурс, а DELETE /users/:id запитує його видалення. PUT часто використовують для заміни стану ресурсу; точну поведінку визначає контракт API. Назва методу сама не реалізує ні запис, ні перевірку прав — це робота обробника та сервісу.",
        en: "Express matches an HTTP method and path against registered routes. For example, GET /users usually reads a collection, POST /users creates a resource, and DELETE /users/:id requests its deletion. PUT often replaces resource state; the API contract defines the exact behavior. The method name itself neither writes data nor checks permissions; the handler and service must do that.",
      }),
      codeFill("ef-r1", "Зареєструйте POST /users методом post.", "Register POST /users using post.", "js", "app.___('/users', handler);", ["post"], true),
      codeFill("ef-r2", "Зареєструйте PUT /users/:id методом put.", "Register PUT /users/:id using put.", "js", "app.___('/users/:id', handler);", ["put"], true),
      { id: "ef-r3", type: "match", promptUk: "Зіставте типові HTTP-методи з діями над ресурсом.", promptEn: "Match common HTTP methods with resource actions.", pairs: [{ left: "GET", right: "Читання" }, { left: "POST", right: "Створення" }, { left: "DELETE", right: "Видалення" }], pairsEn: [{ left: "GET", right: "Read" }, { left: "POST", right: "Create" }, { left: "DELETE", right: "Delete" }] },
      { ...mcq("ef-r7", "Чи гарантує сам маршрут DELETE /users/:id, що запитувач має право видалити користувача?", "Does the DELETE /users/:id route itself guarantee that the requester may delete the user?", ["Ні, право потрібно перевірити в застосунку", "Так, DELETE автоматично перевіряє власника", "Так, якщо id існує", "Так, якщо запит містить JSON"], 0, why("Метод і шлях не є перевіркою авторизації.", "Method and path do not enforce authorization.")), optionsEn: ["No, the application must check permission", "Yes, DELETE automatically checks ownership", "Yes, if the id exists", "Yes, if the request contains JSON"] },
    ],
  ),
  lesson(
    "ef-params-query",
    "Параметри маршруту та query",
    "params & query",
    2,
    false,
    [
      concept("ef-params-concept", "Частини URL", "Parts of the URL", {
        uk: "Маршрут /users/:id захоплює сегмент шляху як req.params.id. Для GET /users/42?page=2 значення id — рядок '42', а параметр пошуку page доступний через req.query.page; query не входить до шляху маршруту. Дані обох джерел контролює клієнт: перевіряйте наявність, тип і допустимий формат до використання, зокрема тому, що значення query можуть мати іншу форму залежно від парсера.",
        en: "The route /users/:id captures a path segment as req.params.id. For GET /users/42?page=2, id is the string '42' and the query parameter page is available as req.query.page; the query string is not part of the route path. Both sources are controlled by the client: validate presence, type, and format before use, especially because query values can have different shapes depending on the parser.",
      }),
      codeFill("ef-r4", "Прочитайте id з параметрів маршруту через params.", "Read id from route parameters using params.", "js", "const id = req.___.id;", ["params"], true),
      codeFill("ef-r5", "Прочитайте page із query через query.", "Read page from the query using query.", "js", "const page = req.___.page;", ["query"], true),
      { ...(codeRead("ef-r6", "Яке значення req.params.id для GET /u/42?", "What is req.params.id for GET /u/42?", "js", "app.get('/u/:id', (req,res)=>res.json(req.params))", ["Рядок '42'", "Число 42 без перетворення", "Тіло JSON", "Завжди undefined"], 0, why("Параметр шляху надходить як рядок; за потреби перевірте й перетворіть його.", "A path parameter arrives as a string; validate and convert it if needed.")) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["The string '42'", "The number 42 without conversion", "The JSON body", "Always undefined"] },
      { ...mcq("ef-r8", "Чому перед використанням req.query.page потрібно перевірити тип і діапазон?", "Why validate the type and range of req.query.page before using it?", ["Значення надходить від клієнта і може бути відсутнім або некоректним", "Express гарантує додатне ціле число", "Query завжди містить перевірений токен", "Перевірка автоматично змінює метод на POST"], 0), optionsEn: ["It comes from the client and may be absent or invalid", "Express guarantees a positive integer", "The query always contains a validated token", "Validation automatically changes the method to POST"] },
    ],
  ),
  exam("ef-routes-exam", "Контрольна: routes", "Exam: routes", 2, [
    codeFill("ef-re1", "Зареєструйте POST /items методом post.", "Register POST /items using post.", "js", "app.___('/items', h)", ["post"], true),
    codeFill("ef-re2", "Прочитайте id із параметрів маршруту.", "Read id from the route parameters.", "js", "req.___.id", ["params"], true),
    codeFill("ef-re3", "Прочитайте q із query-рядка.", "Read q from the query string.", "js", "req.___.q", ["query"], true),
    { ...mcq("ef-re4", "Для чого зазвичай використовують DELETE /items/:id?", "What is DELETE /items/:id typically used for?", ["Для запиту видалення конкретного ресурсу", "Для встановлення npm-пакета", "Для запуску CSS", "Для клонування Git-репозиторію"], 0), optionsEn: ["To request deletion of a specific resource", "To install an npm package", "To run CSS", "To clone a Git repository"] },
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
      concept("ef-middleware-concept", "Ланцюжок middleware", "The middleware chain", {
        uk: "Middleware отримує req, res і next та виконується в порядку реєстрації для запиту, що відповідає його шляху. Воно може завершити відповідь або викликати next(), передавши керування далі; next(err) передає помилку в ланцюжок обробників помилок. Не надсилайте відповідь повторно після її завершення. Для перевірки доступу розміщуйте захисний middleware до захищеного маршруту й тестуйте заборонені запити.",
        en: "Middleware receives req, res, and next and runs in registration order for requests matching its path. It may end the response or call next() to pass control onward; next(err) passes an error to error handlers. Do not send a second response after finishing one. Place access-control middleware before protected routes and test denied requests.",
      }),
      codeFill("ef-m1", "Зареєструйте middleware методом app.use.", "Register middleware using app.use.", "js", "app.___((req, res, next) => { next(); });", ["use"], true),
      { ...mcq("ef-m2", "Що робить next() у звичайному middleware?", "What does next() do in ordinary middleware?", ["Передає керування наступному відповідному middleware або маршруту", "Зупиняє процес Node", "Автоматично надсилає відповідь 200", "Видаляє базу даних"], 0), optionsEn: ["Passes control to the next matching middleware or route", "Stops the Node process", "Automatically sends a 200 response", "Deletes the database"] },
      codeOrder(
        "ef-m3",
        "Розташуйте створення застосунку, logger і маршрут так, щоб logger виконався до маршруту.",
        "Order app creation, logger, and route so logger runs before the route.",
        "js",
        ["app.get('/', (req,res)=>res.send('ok'));", "app.use(logger);", "const app = express();"],
        ["const app = express();", "app.use(logger);", "app.get('/', (req,res)=>res.send('ok'));"],
      ),
      { ...mcq("ef-m7", "Маршрут завершує відповідь і не викликає next(). Чи виконається зареєстрований після нього logger для цього запиту?", "A route ends the response and does not call next(). Will a logger registered after it run for that request?", ["Ні, керування не передано далі", "Так, завжди після кожної відповіді", "Так, якщо статус 200", "Ні, бо logger працює лише з POST"], 0, why("Порядок реєстрації та передача керування визначають виконання ланцюжка.", "Registration order and passing control determine chain execution.")), optionsEn: ["No, control was not passed onward", "Yes, always after every response", "Yes, if the status is 200", "No, because a logger only handles POST"] },
    ],
  ),
  lesson(
    "ef-json-static",
    "express.json & static",
    "express.json & static",
    2,
    false,
    [
      concept("ef-json-static-concept", "JSON та статичні файли", "JSON and static files", {
        uk: "express.json() розбирає відповідні JSON-тіла запитів до req.body, тому його реєструють до маршрутів, що читають тіло. Розбір не перевіряє бізнес-схему й не робить дані довіреними: перевіряйте поля та встановлюйте відповідний ліміт розміру. express.static('public') обслуговує файли з указаної теки; публікуйте лише файли, які дозволено віддати клієнтам. Помилки некоректного JSON потрібно передати в обробник помилок.",
        en: "express.json() parses matching JSON request bodies into req.body, so register it before routes that read the body. Parsing does not validate a business schema or make data trusted: validate fields and set an appropriate size limit. express.static('public') serves files from the specified directory; publish only files clients are allowed to receive. Handle malformed JSON through error middleware.",
      }),
      codeFill("ef-m4", "Додайте JSON-парсер методом express.json.", "Add the JSON parser using express.json.", "js", "app.use(express.___());", ["json"], true),
      codeFill("ef-m5", "Додайте роздачу теки public методом express.static.", "Serve the public directory using express.static.", "js", "app.use(express.___('public'));", ["static"], true),
      { ...(codeRead("ef-m6", "Яке призначення цього middleware?", "What is the purpose of this middleware?", "js", "app.use(express.json());", ["Розібрати відповідне JSON-тіло запиту в req.body", "Компілювати TypeScript", "Запустити Redis", "Форматувати CSS"], 0, why("Парсинг не замінює перевірку схеми й прав доступу.", "Parsing does not replace schema validation or authorization.")) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["Parse a matching JSON request body into req.body", "Compile TypeScript", "Start Redis", "Format CSS"] },
      { ...mcq("ef-m8", "Клієнт надіслав коректний JSON із невалідним email. Чи достатньо express.json() для перевірки?", "A client sent valid JSON with an invalid email. Is express.json() enough to validate it?", ["Ні, окремо перевірте схему та правила поля", "Так, парсер перевіряє всі бізнес-правила", "Так, JSON завжди є довіреним", "Ні, тому що Express не вміє читати JSON"], 0), optionsEn: ["No, validate the schema and field rules separately", "Yes, the parser validates all business rules", "Yes, JSON is always trusted", "No, because Express cannot read JSON"] },
    ],
  ),
  exam("ef-mw-exam", "Контрольна: middleware", "Exam: middleware", 2, [
    codeFill("ef-me1", "Зареєструйте middleware fn методом use.", "Register middleware fn using use.", "js", "app.___(fn)", ["use"], true),
    codeFill("ef-me2", "Створіть парсер JSON методом json.", "Create a JSON parser using json.", "js", "express.___()", ["json"], true),
    { ...mcq("ef-me3", "Що робить next(err)?", "What does next(err) do?", ["Передає помилку наступному відповідному обробнику помилок", "Завжди відповідає 200", "Перезапускає сервер", "Очищає базу даних"], 0), optionsEn: ["Passes the error to the next matching error handler", "Always responds with 200", "Restarts the server", "Clears the database"] },
    codeFill("ef-me4", "Створіть middleware для статичної теки методом static.", "Create middleware for a static directory using static.", "js", "express.___('public')", ["static"], true),
  ]),
]);

const restU = unit("rest", "Відповіді REST API", "REST responses", [
  lesson(
    "ef-status-json",
    "status + json",
    "status + json",
    2,
    false,
    [
      concept("ef-status-concept", "Статус і тіло відповіді", "Response status and body", {
        uk: "res.status(code) задає HTTP-статус, а res.json(value) серіалізує значення в JSON і надсилає відповідь. 200 зазвичай означає успіх, 201 — створення ресурсу, 404 — що ресурс не знайдено, а 500 — неочікувану помилку сервера. Успішне створення може також повертати Location із адресою нового ресурсу. Обирайте статус за фактичним результатом і контрактом; не надсилайте внутрішній стек помилки клієнту.",
        en: "res.status(code) sets the HTTP status and res.json(value) serializes a value as JSON and sends the response. 200 generally means success, 201 resource creation, 404 that a resource was not found, and 500 an unexpected server error. Successful creation can also return a Location header pointing to the new resource. Choose the status based on the actual outcome and contract; do not expose internal error stacks to clients.",
      }),
      codeFill("ef-s1", "Задайте статус 201 методом status перед JSON-відповіддю.", "Set status 201 using status before the JSON response.", "js", "res.___(201).json({ ok: true });", ["status"], true),
      codeFill("ef-s2", "Надішліть об'єкт як JSON методом json.", "Send the object as JSON using json.", "js", "res.status(200).___({ users });", ["json"], true),
      { ...mcq("ef-s3", "Що зазвичай означає HTTP 404?", "What does HTTP 404 usually mean?", ["Ресурс не знайдено", "Ресурс створено", "Неочікувана помилка сервера", "Обов'язкове перенаправлення"], 0), optionsEn: ["The resource was not found", "The resource was created", "An unexpected server error", "A mandatory redirect"] },
      { ...mcq("ef-s7", "Запис створено, і API повертає його адресу. Який заголовок доречний?", "A record was created and the API returns its address. Which header is appropriate?", ["Location", "Content-Length як адреса", "Cookie як URL ресурсу", "Authorization із паролем"], 0, why("Location може вказувати адресу новоствореного ресурсу.", "Location can identify the newly created resource.")), optionsEn: ["Location", "Content-Length as an address", "Cookie as the resource URL", "Authorization containing a password"] },
    ],
  ),
  lesson(
    "ef-rest-paths",
    "Шляхи ресурсів",
    "RESTful paths",
    2,
    false,
    [
      concept("ef-rest-paths-concept", "Колекція та окремий ресурс", "Collections and individual resources", {
        uk: "У цьому API /users позначає колекцію, а /users/:id — окремий запис. HTTP-метод визначає дію: GET читає, POST може створити, DELETE запитує видалення. Це приклад узгодженого контракту, а не вимога, що всі API мають однакові назви шляхів. Після створення ресурсу 201 явно повідомляє про створення; 200 теж може позначати успіх в інших контрактах, але не має окремого значення Created.",
        en: "In this API /users identifies a collection and /users/:id an individual record. The HTTP method specifies the action: GET reads, POST can create, and DELETE requests deletion. This is an example of a consistent contract, not a requirement that every API use identical paths. After creating a resource, 201 explicitly communicates creation; 200 may indicate success in other contracts but does not specifically mean Created.",
      }),
      { ...mcq("ef-s4", "У контракті API колекція користувачів називається users. Який шлях природно її позначає?", "In this API contract the user collection is named users. Which path naturally identifies it?", ["/users", "/users/:id для одного користувача", "Лише query-рядок ?id=", "HTTP-заголовок Content-Type"], 0), optionsEn: ["/users", "/users/:id for one user", "Only the query string ?id=", "The Content-Type HTTP header"] },
      { id: "ef-s5", type: "match", promptUk: "Зіставте статуси з їхнім значенням.", promptEn: "Match statuses to their meanings.", pairs: [{ left: "200", right: "Успіх" }, { left: "201", right: "Ресурс створено" }, { left: "500", right: "Помилка сервера" }], pairsEn: [{ left: "200", right: "OK" }, { left: "201", right: "Created" }, { left: "500", right: "Server error" }] },
      codeFill("ef-s6", "Вкажіть статус 201 Created для успішно створеного ресурсу.", "Enter the 201 Created status for a successfully created resource.", "js", "res.status(___).json(item);", ["201"], false, why("201 явно позначає створення; 200 означає загальний успіх.", "201 explicitly means creation; 200 indicates general success.")),
      { ...mcq("ef-s8", "Чи достатньо знати URL /users/42, щоб отримати приватний запис?", "Is knowing the URL /users/42 enough to access a private record?", ["Ні, сервер має перевірити право доступу", "Так, ID є дозволом", "Так, якщо маршрут використовує GET", "Так, якщо відповідь JSON"], 0), optionsEn: ["No, the server must check authorization", "Yes, the ID is permission", "Yes, if the route uses GET", "Yes, if the response is JSON"] },
    ],
  ),
  exam("ef-rest-exam", "Контрольна: REST", "Exam: REST", 2, [
    codeFill("ef-se1", "Задайте статус 404 методом status.", "Set status 404 using status.", "js", "res.___(404)", ["status"], true),
    codeFill("ef-se2", "Надішліть об'єкт методом json.", "Send the object using json.", "js", "res.___({ error: 'x' })", ["json"], true),
    { ...mcq("ef-se3", "Який статус явно повідомляє про створення ресурсу?", "Which status explicitly indicates that a resource was created?", ["201 Created", "404 Not Found", "500 Internal Server Error", "304 Not Modified"], 0), optionsEn: ["201 Created", "404 Not Found", "500 Internal Server Error", "304 Not Modified"] },
    { ...mcq("ef-se4", "Який шлях у цьому API позначає один ресурс із параметром id?", "Which path in this API identifies one resource by id?", ["/items/:id", "/items для всієї колекції", "Лише заголовок Accept", "Тільки тіло запиту"], 0), optionsEn: ["/items/:id", "/items for the whole collection", "Only the Accept header", "Only the request body"] },
  ]),
]);

const errorsU = unit("errors", "Обробка помилок", "Error handling", [
  lesson(
    "ef-error-mw",
    "Middleware обробки помилок",
    "Error middleware",
    3,
    false,
    [
      concept("ef-error-concept", "Централізована відповідь на помилку", "Centralized error responses", {
        uk: "Express розпізнає middleware помилок за чотирма аргументами (err, req, res, next). Зареєструйте його після маршрутів: next(err) передає помилку відповідному обробнику. Некоректний ввід і неочікувані збої можуть потребувати різних статусів; клієнту повертайте стабільний код, а внутрішній стек зберігайте лише в безпечних логах. Якщо заголовки вже надіслано, передайте помилку далі через next(err), а не надсилайте другу відповідь.",
        en: "Express recognizes error middleware by its four arguments (err, req, res, next). Register it after routes: next(err) forwards an error to a matching handler. Invalid input and unexpected failures can require different statuses; return a stable code to the client and keep internal stacks only in protected logs. If headers have already been sent, delegate with next(err) instead of sending a second response.",
      }),
      { ...mcq(
        "ef-e1",
        "Яка сигнатура middleware обробки помилок Express?",
        "Which signature identifies Express error middleware?",
        ["4 аргументи (err, req, res, next)", "1 аргумент", "Лише 2 аргументи", "Жодного аргументу"],
        0,
      ), optionsEn: ["4 arguments (err, req, res, next)", "1 argument", "Only 2 arguments", "No arguments"] },
      codeFill("ef-e2", "Задайте статус 500 для неочікуваної внутрішньої помилки.", "Set status 500 for an unexpected internal error.", "js", "res.status(___).json({ error: 'internal' });", ["500"], true),
      { ...(codeRead("ef-e3", "Що робить next(e) у цьому catch?", "What does next(e) do in this catch block?", "js", "catch (e) { next(e); }", ["Передає помилку обробнику помилок", "Завжди ігнорує помилку", "Створює Git-коміт", "Надсилає CSS"], 0) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["Forwards the error to error middleware", "Always ignores the error", "Creates a Git commit", "Sends CSS"] },
      { ...mcq("ef-e7", "Обробник отримав помилку після надсилання заголовків. Що робити?", "An error handler receives an error after headers were sent. What should it do?", ["Передати помилку далі через next(err)", "Надіслати другий JSON зі статусом 500", "Змінити вже надісланий статус", "Видалити базу даних"], 0), optionsEn: ["Delegate the error using next(err)", "Send a second JSON response with status 500", "Change the status already sent", "Delete the database"] },
    ],
  ),
  lesson(
    "ef-try-catch",
    "Асинхронні помилки в обробниках",
    "try/catch in handlers",
    3,
    false,
    [
      concept("ef-async-error-concept", "Помилки промісів і callback-ів", "Promise and callback errors", {
        uk: "Синхронний throw в обробнику Express потрапляє до обробки помилок. В Express 5 відхилений проміс, повернутий маршрутом або middleware, автоматично передається до next; в Express 4 для async-помилок використовуйте try/catch із next(err) або перевірену обгортку. Помилка в пізнішому callback-у чи неповернутому промісі потребує явного передавання в обох версіях. Не викликайте next(err) двічі для одного збою.",
        en: "A synchronous throw inside an Express handler reaches error handling. In Express 5 a rejected promise returned by a route or middleware is automatically forwarded to next; in Express 4 use try/catch with next(err) or a tested wrapper for async failures. Errors in a later callback or an unreturned promise need explicit forwarding in both versions. Do not call next(err) twice for the same failure.",
      }),
      { ...mcq("ef-e4", "Як Express 5 обробляє відхилений проміс, повернутий async-маршрутом?", "How does Express 5 handle a rejected promise returned by an async route?", ["Автоматично передає помилку до next", "Автоматично відповідає 200", "Завжди ігнорує відхилення", "Перезапускає Docker"], 0, why("В Express 4 таке відхилення потрібно явно передати або використати обгортку.", "Express 4 requires explicit forwarding or a wrapper for such rejections.")), optionsEn: ["It automatically forwards the error to next", "It automatically responds with 200", "It always ignores the rejection", "It restarts Docker"] },
      codeFill("ef-e5", "У catch (err) передайте саме err до next.", "Inside catch (err), pass err to next.", "js", "try { await save(); } catch (err) { next(___); }", ["err"], true),
      { id: "ef-e6", type: "match", promptUk: "Зіставте частини обробки запиту з ролями.", promptEn: "Match request-handling components to their roles.", pairs: [{ left: "Route", right: "HTTP-обробник" }, { left: "Error middleware", right: "Централізована обробка помилок" }, { left: "express.json()", right: "Розбір тіла в req.body" }], pairsEn: [{ left: "Route", right: "HTTP handler" }, { left: "Error middleware", right: "Centralized error handling" }, { left: "express.json()", right: "Parse the body into req.body" }] },
      { ...mcq("ef-e8", "У Express 5 маршрут запустив проміс, але не повернув і не очікував його. Що з його помилкою?", "In Express 5 a route starts a promise but neither returns nor awaits it. What about its failure?", ["Її потрібно явно обробити й передати до next", "Express гарантовано автоматично її перехопить", "Вона автоматично стане відповіддю 201", "Вона не може виникнути"], 0), optionsEn: ["Handle it and forward it to next explicitly", "Express is guaranteed to catch it automatically", "It automatically becomes a 201 response", "It cannot occur"] },
    ],
  ),
  exam("ef-err-exam", "Контрольна: errors", "Exam: errors", 3, [
    { ...mcq("ef-ee1", "Скільки аргументів має стандартна сигнатура error middleware?", "How many arguments are in the standard error middleware signature?", ["4", "0", "1", "2"], 0), optionsEn: ["4", "0", "1", "2"] },
    codeFill("ef-ee2", "Задайте статус 500 для неочікуваної помилки сервера.", "Set status 500 for an unexpected server error.", "js", "res.status(___)", ["500"], true),
    codeFill("ef-ee3", "Передайте err далі викликом next.", "Forward err by calling next.", "js", "___(err)", ["next"], true),
    { ...mcq("ef-ee4", "Що робить next(err)?", "What does next(err) do?", ["Передає помилку до обробника помилок", "Встановлює npm", "Клонує Git", "Розбирає HTML"], 0), optionsEn: ["Forwards the error to error handling", "Installs npm", "Clones Git", "Parses HTML"] },
  ]),
]);

const routersU = unit("routers", "Маршрутизатори", "Routers", [
  lesson(
    "ef-router",
    "express.Router",
    "express.Router",
    3,
    false,
    [
      concept("ef-router-concept", "Групування маршрутів", "Grouping routes", {
        uk: "express.Router() створює маршрутизатор для групи пов'язаних маршрутів і middleware. Після реєстрації обробників монтуйте його в застосунок через app.use('/api', router): префікс /api додається до шляхів усередині групи. Маршрутизатор допомагає організувати код, але сам не перевіряє права доступу; встановіть потрібний middleware перед захищеними обробниками.",
        en: "express.Router() creates a router for related routes and middleware. After registering handlers, mount it in the app with app.use('/api', router): the /api prefix is combined with paths inside the group. A router organizes code but does not itself enforce authorization; install the required middleware before protected handlers.",
      }),
      codeFill("ef-o1", "Створіть маршрутизатор викликом express.Router().", "Create a router by calling express.Router().", "js", "const r = express.___();", ["Router"], true),
      codeFill("ef-o2", "Змонтуйте саме оголошений маршрутизатор r за префіксом /api.", "Mount the declared router r at the /api prefix.", "js", "const r = express.Router();\napp.use('/api', ___);", ["r"], true),
      { ...mcq("ef-o3", "Навіщо застосовують express.Router()?", "Why use express.Router()?", ["Щоб групувати пов'язані маршрути й middleware", "Щоб автоматично перевіряти права", "Щоб створювати SQL-таблиці", "Щоб збирати CSS"], 0), optionsEn: ["To group related routes and middleware", "To automatically authorize requests", "To create SQL tables", "To compile CSS"] },
      { ...mcq("ef-o7", "Де має бути захисний middleware для приватного маршруту router.get('/me')?", "Where should access-control middleware be placed for a private router.get('/me') route?", ["Перед захищеним обробником у ланцюжку", "Лише після вже завершеної відповіді", "Лише в CSS", "Він не потрібен, бо Router приватний за замовчуванням"], 0), optionsEn: ["Before the protected handler in the chain", "Only after the response has ended", "Only in CSS", "It is unnecessary because Router is private by default"] },
    ],
  ),
  lesson(
    "ef-mount-prefix",
    "Префікси монтування",
    "Mount prefixes",
    3,
    false,
    [
      concept("ef-mount-concept", "Шлях маршрутизатора та префікс", "Router paths and mount prefixes", {
        uk: "Якщо router змонтовано через app.use('/api', router), маршрут router.get('/health', handler) відповідає на GET /api/health. Усередині маршрутизатора шлях задають відносно точки монтування. Для вкладених маршрутизаторів доступ до параметрів батьківського шляху потребує відповідної конфігурації mergeParams; не припускайте, що всі параметри автоматично доступні.",
        en: "If router is mounted with app.use('/api', router), router.get('/health', handler) matches GET /api/health. Paths inside the router are relative to its mount point. For nested routers, access to parent path parameters requires appropriate mergeParams configuration; do not assume all parameters are automatically available.",
      }),
      { ...(codeRead(
        "ef-o4",
        "Який GET-шлях обробляє цей маршрут?",
        "Which GET path does this route handle?",
        "js",
        "app.use('/api', router); router.get('/health', handler);",
        ["GET /api/health", "Лише GET /health у корені", "Будь-який метод і шлях", "Лише POST /api/health"],
        0,
      ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["GET /api/health", "Only GET /health at the root", "Any method and path", "Only POST /api/health"] },
      { id: "ef-o5", type: "match", promptUk: "Зіставте можливу організацію файлів із ролями.", promptEn: "Match this possible file organization to roles.", pairs: [{ left: "app.js", right: "Монтування маршрутизаторів" }, { left: "routes/users.js", right: "Маршрути користувачів" }, { left: "middleware/", right: "Спільні middleware" }], pairsEn: [{ left: "app.js", right: "Mount routers" }, { left: "routes/users.js", right: "User routes" }, { left: "middleware/", right: "Shared middleware" }] },
      codeFill("ef-o6", "Зареєструйте GET / у маршрутизаторі методом get.", "Register GET / on the router using get.", "js", "router.___('/', handler);", ["get"], true),
      { ...mcq("ef-o8", "Вкладеному Router потрібен :userId з батьківського шляху. Яку опцію перевірити?", "A nested Router needs :userId from its parent path. Which option should you check?", ["mergeParams: true", "strict: false як перевірку прав", "JSON.stringify", "Content-Type: text/css"], 0, why("mergeParams передає параметри батьківського маршрутизатора дочірньому.", "mergeParams gives the child router access to parent route parameters.")), optionsEn: ["mergeParams: true", "strict: false as authorization", "JSON.stringify", "Content-Type: text/css"] },
    ],
  ),
  exam("ef-router-exam", "Контрольна: routers", "Exam: routers", 3, [
    codeFill("ef-oe1", "Створіть Router через express.Router().", "Create a Router using express.Router().", "js", "express.___()", ["Router"], true),
    codeFill("ef-oe2", "Змонтуйте router методом app.use.", "Mount router using app.use.", "js", "app.___('/api', router)", ["use"], true),
    { ...mcq("ef-oe3", "Для чого призначений Router?", "What is a Router used for?", ["Для групування маршрутів і middleware", "Для автоматичної авторизації всіх запитів", "Для компіляції CSS", "Для створення Git-комітів"], 0), optionsEn: ["Grouping routes and middleware", "Automatically authorizing every request", "Compiling CSS", "Creating Git commits"] },
    codeFill("ef-oe4", "Зареєструйте GET /x методом router.get.", "Register GET /x using router.get.", "js", "router.___('/x', h)", ["get"], true),
  ]),
]);

const jsonBody = unit("json-body", "Тіло запиту JSON", "JSON body", [
  lesson(
    "ef-json-mw",
    "express.json middleware",
    "express.json middleware",
    2,
    true,
    [
      concept("ef-json-body-concept", "Від байтів до перевірених даних", "From bytes to validated data", {
        uk: "express.json() розбирає JSON для відповідного Content-Type і записує результат у req.body; зареєструйте його до маршруту. Некоректний JSON спричиняє помилку парсингу, а валідний JSON усе ще може не відповідати схемі. Перевіряйте типи, обов'язкові поля й обмеження розміру; за відсутнього або невідповідного тіла не припускайте, що req.body має потрібну форму. Помилки парсингу та валідації мають давати клієнту зрозумілу відповідь.",
        en: "express.json() parses JSON for a matching Content-Type and puts the result in req.body; register it before the route. Malformed JSON causes a parsing error, while valid JSON can still violate the schema. Validate types, required fields, and size limits; do not assume req.body has the expected shape when the body is absent or does not match. Give clients understandable responses for parsing and validation errors.",
      }),
      codeFill(
        "ef-jb1",
        "Зареєструйте парсер express.json до маршруту.",
        "Register express.json before the route.",
        "js",
        "app.use(express.___());",
        ["json"],
        true,
      ),
      { ...mcq(
        "ef-jb2",
        "Що робить express.json() для відповідного тіла запиту?",
        "What does express.json() do for a matching request body?",
        ["Розбирає JSON у req.body", "Читає лише cookie", "Розбирає лише query-рядок", "Компілює HTML-шаблони"],
        0,
      ), optionsEn: ["Parses JSON into req.body", "Reads only cookies", "Parses only the query string", "Compiles HTML templates"] },
      codeFill(
        "ef-jb3",
        "Прочитайте поле name з req.body після парсера.",
        "Read name from req.body after the parser.",
        "js",
        "const name = req.___.name;",
        ["body"],
        true,
      ),
      { ...mcq(
        "ef-jb4",
        "Який Content-Type зазвичай вказує на JSON-тіло?",
        "Which Content-Type normally identifies a JSON body?",
        ["application/json", "text/css", "image/png", "multipart/form-data"],
        0,
      ), optionsEn: ["application/json", "text/css", "image/png", "multipart/form-data"] },
      { ...mcq("ef-jb9", "JSON синтаксично правильний, але поле email відсутнє. Що робити?", "The JSON syntax is valid but email is missing. What should happen?", ["Відхилити дані за правилами схеми до запису", "Вважати їх валідними, бо парсер завершився", "Автоматично повернути 201", "Видалити базу даних"], 0, why("Парсер перевіряє синтаксис, а схема — форму й правила даних.", "The parser checks syntax; the schema checks data shape and rules.")), optionsEn: ["Reject the data under the schema before writing", "Treat it as valid because parsing succeeded", "Automatically return 201", "Delete the database"] },
    ],
  ),
  lesson(
    "ef-post-create",
    "Створення через POST",
    "POST create pattern",
    2,
    true,
    [
      concept("ef-post-concept", "Безпечне створення", "Safe creation", {
        uk: "POST /users приймає дані, перевіряє їх за контрактом і лише тоді викликає сервіс створення. За успішного створення відповідь 201 може містити створений публічний ресурс і заголовок Location. Некоректний ввід не має потрапити до запису; конфлікти та неочікувані помилки обробляють окремо. Не повертайте пароль або інші секретні поля в JSON. Повтор після таймауту може створити дубль, якщо API не визначає ідемпотентну поведінку.",
        en: "POST /users receives data, validates it against the contract, and only then invokes the creation service. On success, a 201 response can contain the created public resource and a Location header. Invalid input must not reach the write; conflicts and unexpected errors are handled separately. Do not return passwords or other secret fields in JSON. A retry after a timeout can create a duplicate unless the API defines idempotent behavior.",
      }),
      codeFill(
        "ef-jb5",
        "Зареєструйте POST /users методом post.",
        "Register POST /users using post.",
        "js",
        "app.___('/users', handler);",
        ["post"],
        true,
      ),
      { ...mcq(
        "ef-jb6",
        "Який статус явно позначає успішне створення?",
        "Which status explicitly indicates successful creation?",
        ["201 Created", "404 Not Found", "301 Moved Permanently", "500 Internal Server Error"],
        0,
      ), optionsEn: ["201 Created", "404 Not Found", "301 Moved Permanently", "500 Internal Server Error"] },
      codeFill(
        "ef-jb7",
        "Задайте статус 201 перед JSON-відповіддю методом status.",
        "Set status 201 before the JSON response using status.",
        "js",
        "res.___(201).json(user);",
        ["status"],
        true,
      ),
      { ...mcq(
        "ef-jb8",
        "Навіщо перевіряти тіло до запису в базу?",
        "Why validate the body before writing to the database?",
        ["Щоб відхилити некоректні дані за контрактом", "Щоб ніколи не обробляти помилки", "Перевірка потрібна лише для GET", "Перевірка замінює авторизацію"],
        0,
      ), optionsEn: ["To reject invalid data under the contract", "To avoid ever handling errors", "Validation is only needed for GET", "Validation replaces authorization"] },
      { ...mcq("ef-jb10", "Користувач повторив POST після таймауту. Що має запобігати дублю, якщо контракт цього вимагає?", "A user retries POST after a timeout. What should prevent a duplicate if the contract requires it?", ["Реалізована сервером ідемпотентність для операції", "Лише повторна перевірка синтаксису JSON", "Зміна кольору кнопки", "Відсутність заголовка Content-Type"], 0, why("Сам метод POST не робить повтор безпечним.", "POST alone does not make retries safe.")), optionsEn: ["Server-implemented idempotency for the operation", "Only rechecking JSON syntax", "Changing the button color", "Omitting Content-Type"] },
    ],
  ),
  exam("ef-json-exam", "Контрольна: JSON body", "Exam: JSON body", 2, [
    { ...mcq("ef-je1", "Що гарантує успішний розбір express.json()?", "What does successful parsing by express.json() guarantee?", ["Відповідне тіло має припустимий JSON-синтаксис", "Усі поля відповідають бізнес-схемі", "Користувач авторизований", "Запис у базі вже створено"], 0), optionsEn: ["The matching body has valid JSON syntax", "Every field satisfies the business schema", "The user is authorized", "A database record has already been created"] },
    codeFill("ef-je2", "Зареєструйте парсер методом json.", "Register the parser using json.", "js", "app.use(express.___())", ["json"], true),
    codeFill("ef-je3", "Прочитайте email із req.body.", "Read email from req.body.", "js", "req.___.email", ["body"], true),
    codeFill("ef-je4", "Зареєструйте POST /x методом post.", "Register POST /x using post.", "js", "app.___('/x', h)", ["post"], true),
    { ...mcq("ef-je5", "Який статус явно означає створення ресурсу?", "Which status explicitly indicates resource creation?", ["201", "404", "301", "100"], 0), optionsEn: ["201", "404", "301", "100"] },
    codeFill("ef-je6", "Задайте статус 201 методом status.", "Set status 201 using status.", "js", "res.___(201).json(x)", ["status"], true),
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
        concept("ex-scen-validation-concept", "Межа перевірки запиту", "The request validation boundary", {
          uk: "Парсер JSON перевіряє синтаксис, а схема — форму й правила полів. Після невдалої перевірки поверніть безпечну відповідь і не викликайте контролер; за успіху передайте перевірені дані далі. Публічні помилки мають містити лише дозволені поля, без сирих значень секретів. return у гілці відповіді зупиняє решту функції, але сам по собі не є спеціальним правилом Express.",
          en: "The JSON parser checks syntax, while a schema checks field shape and rules. On validation failure, return a safe response and do not invoke the controller; on success pass validated data onward. Public errors should include only allowed fields, without raw secret values. return in the response branch stops the rest of the function, but is not a special Express requirement by itself.",
        }),
        { ...(codeRead(
          "ex-scen-1",
          "Що робить middleware при невдалій перевірці схеми?",
          "What does the middleware do when schema validation fails?",
          "js",
          "function validateBody(schema) {\n  return (req, res, next) => {\n    const result = schema.safeParse(req.body);\n    if (!result.success) {\n      return res.status(400).json({ error: 'invalid_payload' });\n    }\n    req.validatedBody = result.data;\n    next();\n  };\n}",
          [
            "Валідує дані до входу в контролер; якщо схема невалідна — повертає 400 і перериває ланцюжок",
            "Завжди пропускає запит далі",
            "Працює лише для GET запитів",
            "Видаляє дані з бази",
          ],
          0,
        ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["Returns 400 and stops the function before calling the controller", "Always passes the request onward", "Works only for GET requests", "Deletes database records"] },
        codeFill(
          "ex-scen-2",
          "Встановлення HTTP-статусу 400 Bad Request",
          "Send 400 Bad Request status response",
          "js",
          "return res.___(400).json({ error: 'validation_failed' });",
          ["status"],
          true,
        ),
        { ...mcq(
          "ex-scen-3",
          "Навіщо return у гілці помилки цього middleware, якщо код після неї викликає next()?",
          "Why use return in this middleware's error branch when code after it calls next()?",
          [
            "Щоб запобігти продовженню виконання коду функції та повторному виклику next() або іншої відповіді (ERR_HTTP_HEADERS_SENT)",
            "Тому що без return Express автоматично падає",
            "Для очищення cookie",
            "Це вимога стандарту ES6",
          ],
          0,
          why("Інші структури керування теж можуть зупинити цю гілку; return не є окремою вимогою Express.", "Other control flow can also stop this branch; return is not a separate Express requirement."),
        ), optionsEn: ["To prevent the function from continuing to next() or sending another response", "Because Express always crashes without return", "To clear cookies", "Because ES6 requires it"] },
        { ...mcq("ex-scen-validation-extra", "Чи означає успішний парсинг JSON, що пароль або email пройшов перевірку схеми?", "Does successful JSON parsing mean a password or email passed schema validation?", ["Ні, перевірка схеми є окремим кроком", "Так, парсер перевіряє всі бізнес-правила", "Так, якщо запит має Content-Type", "Ні, бо JSON не може містити рядків"], 0), optionsEn: ["No, schema validation is a separate step", "Yes, the parser checks all business rules", "Yes, if the request has Content-Type", "No, because JSON cannot contain strings"] },
      ],
    ),
    lesson(
      "exp-scen-async-error-forwarding",
      "Перехоплення помилок в асинхронних роутах",
      "Async route error forwarding & next(err)",
      3,
      false,
      [
        concept("ex-scen-async-concept", "Передавання асинхронних помилок", "Forwarding asynchronous errors", {
          uk: "Express 4 не передає відхилення async-маршруту автоматично: використовуйте try/catch із next(err) або перевірену обгортку. Express 5 автоматично передає відхилення повернутого проміса. В обох версіях помилку від неповернутого проміса або пізнішого callback-а треба обробити явно; наслідок необробленого відхилення залежить від Node.js та конфігурації, тому не можна гарантувати лише зависання запиту.",
          en: "Express 4 does not automatically forward an async route rejection: use try/catch with next(err) or a tested wrapper. Express 5 forwards a rejection from a returned promise automatically. In either version, explicitly handle errors from an unreturned promise or later callback; the outcome of an unhandled rejection depends on Node.js and configuration, so a hanging request is not the only possible outcome.",
        }),
        { ...(codeRead(
          "ex-scen-4",
          "Що потрібно для передачі відхилення db.findUser в обробник помилок Express 4?",
          "What is needed to forward a db.findUser rejection to Express 4 error handling?",
          "js",
          "app.get('/users/:id', async (req, res, next) => {\n  // Express 4 does not automatically forward this rejection.\n  const user = await db.findUser(req.params.id);\n  res.json(user);\n});",
          [
            "try/catch із next(err) або перевірена обгортка для проміса",
            "DB автоматично відправляє 500 клієнту",
            "Express закриває сервер",
            "Параметр req.params не підтримує async",
          ],
          0,
        ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["try/catch with next(err) or a tested promise wrapper", "The database automatically sends 500 to the client", "Express shuts down the server", "req.params cannot be used asynchronously"] },
        codeFill(
          "ex-scen-5",
          "Передайте спійману помилку err до Express викликом next.",
          "Forward the caught err to Express by calling next.",
          "js",
          "try {\n  await process();\n} catch (err) {\n  ___(err);\n}",
          ["next"],
          true,
        ),
        { ...mcq("ex-scen-async-extra", "Маршрут Express 5 повертає проміс, який відхилився. Що відбудеться?", "An Express 5 route returns a promise that rejects. What happens?", ["Express передасть помилку до next автоматично", "Express завжди відповість 200", "Помилка автоматично перетвориться на JSON-тіло", "Процес обов'язково перезапуститься"], 0), optionsEn: ["Express automatically forwards the error to next", "Express always responds with 200", "The error automatically becomes a JSON body", "The process must restart"] },
      ],
    ),
    lesson(
      "exp-scen-centralized-error-handler",
      "Централізований обробник помилок (4 аргументи)",
      "Centralized 4-argument error handler",
      3,
      false,
      [
        concept("ex-scen-error-concept", "Безпечна відповідь на збій", "A safe failure response", {
          uk: "Обробник помилок Express має сигнатуру (err, req, res, next) і реєструється після маршрутів. Класифікуйте лише відомі помилки, наприклад перевірену помилку вводу як 400, а невідомі — як 500 зі стабільним публічним кодом. Не повертайте клієнту сирі err.message чи stack: вони можуть містити секрети. Якщо заголовки вже надіслано, передайте помилку через next(err) замість другої відповіді.",
          en: "Express error middleware has the signature (err, req, res, next) and is registered after routes. Classify only known errors, such as a verified input error as 400; map unknown failures to 500 with a stable public code. Do not return raw err.message or stack to clients: they may contain secrets. If headers were already sent, delegate with next(err) instead of sending a second response.",
        }),
        { ...(codeRead(
          "ex-scen-6",
          "Чому Express розпізнає цю функцію як middleware обробки помилок?",
          "Why does Express recognize this function as error middleware?",
          "js",
          "app.use((err, req, res, next) => {\n  if (res.headersSent) return next(err);\n  res.status(500).json({ error: 'server_error' });\n});",
          [
            "Express розпізнає middleware як обробник помилок лише за наявності рівно 4 параметрів у сигнатурі функції",
            "4 параметри використовуються лише для логування",
            "err завжди має бути рядком",
            "next не потрібен у коді",
          ],
          0,
        ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["The function has the four-argument error middleware signature", "Four parameters are only used for logging", "err must always be a string", "next must never be used in the function"] },
        codeFill(
          "ex-scen-7",
          "Якщо заголовки вже надіслано, передайте err наступному обробнику через next.",
          "If headers were already sent, forward err to the next handler with next.",
          "js",
          "if (res.headersSent) return ___(err);",
          ["next"],
          true,
        ),
        { ...mcq("ex-scen-error-extra", "Неочікувана помилка бази містить адресу сервера у message. Що надіслати клієнту?", "An unexpected database error contains a server address in message. What should be sent to the client?", ["Стабільний загальний код помилки без внутрішнього message або stack", "Сирий message і stack", "URL бази з паролем", "Усі змінні середовища"], 0), optionsEn: ["A stable generic error code without the internal message or stack", "The raw message and stack", "The database URL with password", "All environment variables"] },
      ],
    ),
    exam(
      "exp-scen-exam",
      "Екзамен: валідація та збої в Express",
      "Exam: validation & error resilience",
      3,
      [
        { ...mcq(
          "ex-scen-8",
          "Що означає помилка Node.js: 'Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client'?",
          "What does 'ERR_HTTP_HEADERS_SENT' mean in Express?",
          [
            "Код спробував змінити заголовки після того, як їх уже надіслано",
            "Браузер заблокував CORS",
            "Заголовки містять некоректні символи",
            "Порт сервера зайнятий іншим процесом",
          ],
          0,
        ), optionsEn: ["Code tried to modify headers after they were already sent", "The browser blocked CORS", "The headers contain invalid characters", "Another process occupies the server port"] },
        { ...(codeRead(
          "ex-scen-9",
          "Де в ланцюжку middleware повинен розташовуватися обробник 404 Not Found?",
          "Where should 404 Not Found middleware be placed?",
          "js",
          "app.use((req, res, next) => {\n  res.status(404).json({ error: 'not_found' });\n});",
          [
            "Наприкінці, після всіх реальних ендпоінтів",
            "На самому початку перед app.use(express.json())",
            "Всередині кожного роута",
            "Не має значення",
          ],
          0,
        ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["At the end, after the actual endpoints", "At the very beginning before express.json()", "Inside each route", "Order never matters"] },
        codeFill(
          "ex-scen-10",
          "Парсер тіла JSON запитів у вбудованому Express",
          "Built-in Express middleware for parsing incoming JSON bodies",
          "js",
          "app.use(express.___());",
          ["json"],
          true,
        ),
        { ...mcq(
          "ex-scen-11",
          "У цьому API routeHandler читає перевірене тіло. Що має виконатися до нього?",
          "In this API routeHandler reads a validated body. What must execute before it?",
          [
            "Парсер і валідація тіла, а також потрібна авторизація",
            "Лише errorHandler після відповіді",
            "Тільки роздача статичних файлів",
            "Жодна перевірка не потрібна",
          ],
          0,
          why(
            "Парсер має передувати валідації тіла; порядок автентифікації та парсингу залежить від дизайну. Обробник помилок виконується при помилці, а не після кожної успішної відповіді.",
            "Parsing must precede body validation; auth and parsing order depends on the design. Error middleware runs for errors, not after every successful response.",
          ),
        ), optionsEn: ["Body parsing and validation, plus the required authorization", "Only errorHandler after the response", "Only static file serving", "No checks are needed"] },
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
        concept("ef-authz-concept", "Особистість і доступ до ресурсу", "Identity and resource access", {
          uk: "Автентифікація встановлює особу за сесією або іншим обліковим підтвердженням, а авторизація перевіряє, чи дозволена конкретна дія над конкретним ресурсом. Для задачі перевірка лише requireAuth не доводить володіння: обмежте запит до бази перевіреним userId або перевірте політику до зміни. Відсутні чи недійсні облікові дані зазвичай дають 401; відмова відомому користувачу може давати 403 або 404 за політикою приховування існування ресурсу. Перевіряйте дозволені й заборонені дії та конкурентні зміни.",
          en: "Authentication establishes identity from a session or other credential; authorization checks whether a specific action on a specific resource is allowed. requireAuth alone does not prove ownership: scope the database operation to the verified userId or enforce policy before mutation. Missing or invalid credentials generally result in 401; denial for a known user may use 403 or 404 under a resource-concealment policy. Test allowed and denied actions and concurrent changes.",
        }),
        { ...mcq(
          "ef-ca1",
          "API явно повертає 403 для чужої задачі. user-b увійшов і змінює задачу user-a: який статус за цим контрактом?",
          "This API explicitly returns 403 for another user's task. user-b is logged in and patches user-a's task: which status matches the contract?",
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
        ), optionsEn: ["403 Forbidden ({ error: 'forbidden' })", "401 Unauthorized (another login is required)", "200 OK with an empty body", "500 Internal Server Error"] },
        { ...(codeRead(
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
        ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["It checks login but does not restrict the deletion to the authorized owner", "app.delete cannot use async", "It should return 201 rather than 200", "req.params.id is always a number"] },
        codeFill(
          "ef-ca3",
          "У заданому контракті допишіть 403 для вже виявленої чужої задачі.",
          "Under the given contract, complete 403 for a task already found to belong to someone else.",
          "js",
          "if (task.ownerId !== req.user.id) {\n  return res.status(___).json({ error: 'forbidden' });\n}",
          ["403"],
          true,
          why("Чужий ресурс не можна змінювати — повертаємо 403 forbidden.", "Block cross-user mutation with 403 forbidden."),
        ),
        { ...mcq("ef-ca7", "Як зменшити ризик зміни власника між перевіркою та видаленням?", "How can you reduce the risk of ownership changing between the check and deletion?", ["Виконати видалення з умовою id і перевіреного ownerId в одній операції", "Перевірити лише колір кнопки", "Довірити ownerId з тіла запиту", "Видалити без будь-якої умови"], 0, why("Умова авторизації має застосовуватись під час самої мутації.", "Apply the authorization condition to the mutation itself.")), optionsEn: ["Delete in one operation scoped by id and verified ownerId", "Check only the button color", "Trust ownerId from the request body", "Delete without any condition"] },
      ],
    ),
    lesson(
      "ef-pagination-contracts",
      "Пагінація, фільтри та стабільні контракти помилок",
      "Pagination, filtering & consistent API error contracts",
      3,
      false,
      [
        concept("ef-pagination-concept", "Межі списку та контракт помилок", "List bounds and error contracts", {
          uk: "Параметри limit, offset, фільтри й сортування надходять від клієнта: перевіряйте тип, цілісність, діапазон і дозволені значення до запиту. Обмеження limit не робить довільний великий offset дешевим; для великих списків розгляньте курсор. Сортування має містити унікальний tie-breaker; навіть тоді offset-пагінація може зсуватися при конкурентних вставках. Застосовуйте область доступу користувача до списку й total. Стабільний код помилки дозволяє клієнту показати локалізоване повідомлення.",
          en: "Clients control limit, offset, filters, and sorting: validate type, integer-ness, range, and allowed values before querying. Limiting limit does not make an arbitrarily large offset cheap; consider cursor pagination for large lists. Sorting needs a unique tie-breaker; even then offset pages can shift under concurrent inserts. Apply the user's access scope to both the list and total. A stable error code lets clients display a localized message.",
        }),
        codeOutputMcq(
          "ef-ca4",
          "Для цього прикладу цілі значення вже перевірено. Що поверне clampPagination('500', '-10')?",
          "For this example integer inputs are already validated. What does clampPagination('500', '-10') return?",
          "js",
          "function clampPagination(rawLimit, rawOffset) {\n  const limit = Math.min(50, Math.max(1, Number(rawLimit) || 20));\n  const offset = Math.max(0, Number(rawOffset) || 0);\n  return { limit, offset };\n}\nconsole.log(JSON.stringify(clampPagination('500', '-10')));",
          ['{"limit":50,"offset":0}', '{"limit":500,"offset":0}', '{"limit":20,"offset":-10}', '{"limit":50,"offset":-10}'],
          0,
          why(
            "Ліміт обрізано до 50, offset — до 0. Окремо перевіряйте тип, цілісність і допустимий максимум offset.",
            "The limit is clamped to 50 and offset to 0. Separately validate type, integer-ness, and the maximum allowed offset.",
          ),
        ),
        { ...mcq(
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
        ), optionsEn: ["Clients and tests can recognize the error and show localized text without depending on prose", "JSON forbids spaces in values", "Express automatically translates snake_case into Ukrainian", "It is needed only for HTML forms"] },
        codeProject(
          "ef-ca6",
          "Реалізуйте список задач із перевіркою сесії, цілих limit/offset, дозволеного sortOrder та область доступу користувача для items і total. Повертайте стабільний код помилки. Перевірка шукає лише req.user, 401, Math.min, offset і next(err) у тексті; вона не запускає код і не доводить авторизацію чи правильність пагінації. Перевірте поведінку локальними тестами.",
          "Implement a task list with session validation, integer limit/offset, an allowed sortOrder, and the user's access scope for items and total. Return a stable error code. The grader only searches the text for req.user, 401, Math.min, offset, and next(err); it does not execute code or prove authorization or pagination. Verify behavior with local tests.",
          [
            {
              id: "js",
              name: "tasks-route.js",
              language: "javascript",
              starter: `// TODO: validate input, apply the user scope, and return paginated results
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
        { ...mcq("ef-ca8", "Два рядки мають однаковий created_at. Що потрібно для детермінованого порядку?", "Two rows have the same created_at. What is needed for deterministic ordering?", ["Додати унікальний id як другий ключ сортування", "Прибрати ORDER BY", "Збільшити limit без меж", "Покладатися на випадковий порядок бази"], 0, why("Унікальний ключ розрізняє рядки з однаковим часом; конкурентні вставки можуть усе одно зсувати offset.", "A unique key distinguishes equal timestamps; concurrent inserts can still shift offsets.")), optionsEn: ["Add a unique id as a second sort key", "Remove ORDER BY", "Increase limit without bounds", "Rely on the database's arbitrary ordering"] },
      ],
    ),
    exam("ef-contracts-exam", "Контрольна: API контракти та доступ", "Exam: API contracts & authorization", 3, [
      { ...mcq(
        "ef-cae1",
        "У цьому API немає дійсної сесії або доступ до чужої задачі явно заборонено. Які статуси використовує контракт?",
        "In this API a session is invalid or access to another user's task is explicitly forbidden. Which statuses does the contract use?",
        [
          "401 — не аутентифіковано; 403 — аутентифіковано, але заборонено доступ до ресурсу",
          "401 — помилка БД; 403 — відсутній маршрут",
          "Це повні синоніми",
          "403 повертається лише при невалідному JSON",
        ],
        0,
        why("Розрізнення auth vs authz запобігає незрозумілим редиректам на логін при чужому ресурсі.", "Separating 401 vs 403 lets clients prompt login vs show access denied."),
      ), optionsEn: ["401 for missing/invalid authentication; 403 for this forbidden action", "401 for a database error; 403 for a missing route", "They are complete synonyms", "403 only for malformed JSON"] },
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
      { ...(codeRead(
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
      ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["Rows with identical created_at may be duplicated or skipped between pages", "SQL produces a syntax error", "OFFSET 10 returns the first 10 rows", "The id field is automatically deleted"] },
      { ...mcq(
        "ef-cae4",
        "Що необхідно перевірити до зміни захищеної задачі?",
        "What must be verified before modifying a protected task?",
        [
          "Ідентичність, валідність даних і право змінювати саме цю задачу",
          "Лише наявність ідентифікатора задачі в URL",
          "Лише колір кнопки в клієнті",
          "Тільки Content-Type відповіді",
        ],
        0,
        why(
          "Обмежте мутацію правами користувача; порядок інших перевірок залежить від контракту.",
          "Scope the mutation to the user's rights; the order of other checks depends on the contract.",
        ),
      ), optionsEn: ["Identity, valid input, and permission to modify this specific task", "Only the task identifier in the URL", "Only the client's button color", "Only the response Content-Type"] },
    ]),
  ],
);

const capstone = unit("capstone", "Підсумковий проєкт", "Capstone", [
  lesson(
    "ef-capstone-api",
    "Мініпроєкт: API /health",
    "Mini: REST /health API",
    3,
    false,
    [
      concept("ef-capstone-concept", "Від коду до перевірки API", "From code to an API check", {
        uk: "Створіть Express-застосунок, зареєструйте express.json() і GET /health, який повертає JSON та завершує відповідь. Слухайте перевірений PORT із локальним значенням за відсутності; додайте npm start і команди перевірки. Локально запустіть сервер, виконайте curl і перевірте статус та тіло, потім зупиніть процес. Вбудована перевірка лише шукає фрагменти тексту у файлах — вона не запускає сервер і не доводить його поведінку.",
        en: "Create an Express app, register express.json() and GET /health that returns JSON and ends the response. Listen on a validated PORT with a local fallback when absent; add npm start and verification commands. Run the server locally, use curl to inspect status and body, then stop the process. The built-in grader only searches file text; it does not run the server or prove its behavior.",
      }),
      {
        id: "ef-c1",
        type: "code_project",
        promptUk:
          "Створіть app.js із express.json(), маршрутом GET /health, що повертає JSON, та запуском на PORT із локальним значенням за відсутності. Додайте npm start і приклад curl у README. Статична перевірка шукає в app.js: express, json, /health, listen, PORT; у package.json: start, node; у README: curl, health. Вона не запускає сервер і не перевіряє поведінку — перевірте її локально.",
        promptEn:
          "Create app.js with express.json(), a GET /health route that returns JSON, and startup on PORT with a local fallback when absent. Add npm start and a curl example to README. The static grader searches app.js for express, json, /health, listen, PORT; package.json for start, node; and README for curl, health. It does not run the server or verify behavior; check it locally.",
        files: [
          {
            id: "js",
            name: "app.js",
            language: "javascript",
            starter: `// TODO: implement the app and start the server
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
<!-- Add startup and verification instructions. -->
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
        hintUk: "Зареєструйте маршрут до listen, перевірте PORT та завершіть відповідь через res.json(...).",
        hintEn: "Register the route before listen, validate PORT, and finish the response with res.json(...).",
      } as Exercise,
      { ...mcq("ef-capstone-q", "Що доводить успішна статична перевірка цього проєкту?", "What does a passing static check for this project prove?", ["У файлах знайдено потрібні фрагменти тексту", "Сервер запущено й маршрут перевірено HTTP-запитом", "PORT завжди валідний", "Сервіс автоматично захищений авторизацією"], 0, why("Поведінку потрібно перевірити окремим локальним запуском і запитом.", "Behavior must be verified separately with a local run and request.")), optionsEn: ["The required text fragments were found in the files", "The server was started and its route tested with an HTTP request", "PORT is always valid", "The service automatically enforces authorization"] },
    ],
  ),
  lesson(
    "ef-forgeboard-api-lab",
    "ForgeBoard M5: REST API з валідацією й ownership",
    "ForgeBoard M5: Validated REST API with Ownership Checks",
    4,
    false,
    [
      concept("ef-forgeboard-concept", "Перевірка API локально", "Testing the API locally", {
        uk: "ForgeBoard M5 — локальна практика: завантажте пакет лабораторної, реалізуйте API та запустіть його тести за інструкцією. Контракт вправи розрізняє 401 без ідентичності, 403 для чужої задачі, 404 для відсутньої та 400 для невалідного вводу. Лабораторні тести використовують x-user-id як навчальний спосіб задати особу; у реальному сервісі не довіряйте такому заголовку без перевіреної автентифікації. HTTP-тести перевіряють маршрут, middleware та відповідь разом, але не гарантують відсутності всіх вразливостей.",
        en: "ForgeBoard M5 is local practice: download the lab package, implement the API, and run its tests as instructed. Its contract distinguishes 401 without an identity, 403 for another user's task, 404 for a missing task, and 400 for invalid input. The lab tests use x-user-id as a teaching shortcut for identity; a real service must not trust such a header without verified authentication. HTTP tests exercise routes, middleware, and responses together, but cannot guarantee the absence of all vulnerabilities.",
      }),
      { ...mcq(
        "ef-fb1",
        "За контрактом локальної лаби ForgeBoard M5, який статус повертає `PATCH /tasks/:id` для чужої задачі?",
        "Under the local ForgeBoard M5 contract, what status does `PATCH /tasks/:id` return for another user's task?",
        ["403 (`forbidden`)", "200 (`ok`)", "400 (`invalid_input`)", "302 Redirect"],
        0,
        why("Чужа задача доступна тільки власнику — іншим повертаємо 403.", "Cross-user modification must fail with 403 forbidden."),
      ), optionsEn: ["403 (`forbidden`)", "200 (`ok`)", "400 (`invalid_input`)", "302 Redirect"] },
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
      { ...(codeRead(
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
      ) as Extract<Exercise, { type: "code_read" }>), optionsEn: ["An HTTP path exercises middleware ordering and serializes headers and statuses", "Mock req/res cannot work in Node.js", "fetch automatically starts PostgreSQL", "supertest disables TypeScript"] },
      { ...mcq("ef-fb4", "Лабораторія використовує заголовок x-user-id як навчальну підстановку особи. Чи можна без перевірки довіряти йому в реальному API?", "The lab uses x-user-id as a teaching shortcut for identity. Can a real API trust it without verification?", ["Ні, потрібне перевірене джерело автентифікації", "Так, будь-який клієнт може призначити собі userId", "Так, якщо тіло запиту — JSON", "Так, якщо маршрут має назву /tasks"], 0), optionsEn: ["No, identity needs a verified authentication source", "Yes, any client may choose its userId", "Yes, if the request body is JSON", "Yes, if the route is named /tasks"] },
    ],
  ),
  exam("ef-cap-exam", "Фінальна контрольна Express", "Final Express exam", 3, [
    { ...mcq("ef-ce1", "Що таке Express?", "What is Express?", ["HTTP-фреймворк для Node.js", "База SQL", "Лише браузер", "Бібліотека CSS"], 0), optionsEn: ["An HTTP framework for Node.js", "A SQL database", "Only a browser", "A CSS library"] },
    codeFill("ef-ce2", "Створіть застосунок функцією express.", "Create the app using express.", "js", "const app = ___();", ["express"], true),
    codeFill("ef-ce3", "Зареєструйте GET /health методом get.", "Register GET /health using get.", "js", "app.___('/health', h)", ["get"], true),
    codeFill("ef-ce4", "Зареєструйте парсер express.json.", "Register the express.json parser.", "js", "app.use(express.___())", ["json"], true),
    codeFill("ef-ce5", "Задайте статус 201 методом status.", "Set status 201 using status.", "js", "res.___(201).json(x)", ["status"], true),
    { ...mcq("ef-ce6", "Яку сигнатуру має Express middleware для помилок?", "What is the Express error middleware signature?", ["(err, req, res, next)", "(req)", "()", "(css, sql)"], 0), optionsEn: ["(err, req, res, next)", "(req)", "()", "(css, sql)"] },
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
