import type { CourseContent, Exercise } from "./types.js";
import {
  codeFill,
  codeOrderAuto,
  codeProject,
  codeRead,
  concept,
  exam,
  explain,
  lesson,
  matchEx,
  mcq,
  unit,
  why,
} from "./builders.js";

function withOptionsEn(exercise: Exercise, optionsEn: string[]): Exercise {
  if (exercise.type !== "mcq" && exercise.type !== "code_read") {
    throw new Error(`Exercise ${exercise.id} does not support translated options`);
  }
  return { ...exercise, optionsEn };
}

function withPairsEn(exercise: Exercise, pairsEn: { left: string; right: string }[]): Exercise {
  if (exercise.type !== "match") {
    throw new Error(`Exercise ${exercise.id} does not support translated pairs`);
  }
  return { ...exercise, pairsEn };
}

const trustBoundaries = unit(
  "ws_trust_boundaries",
  "Межі довіри та принципи Fail-Closed (OWASP Top 10:2025)",
  "Trust Boundaries & Fail-Closed Defaults",
  [
    lesson(
      "ws-tb-boundaries",
      "Де проходить межа довіри: клієнт vs сервер",
      "Client UI vs Server Authority Trust Boundaries",
      3, true, [
        concept(
          "ws-tb-concept",
          "Межа довіри проходить на сервері",
          "The server enforces the trust boundary",
          {
            uk: "Інтерфейс може приховати дію для зручності, але запит можна змінити або надіслати напряму. Сервер спочатку перевіряє сесію, потім право саме цієї особи виконати дію над конкретним ресурсом. Ідентифікатор ресурсу з URL — лише вхідні дані, не доказ права власності. Перевіряйте доступ для кожного запиту, зокрема коли власник і чужий користувач передають однаковий ID.",
            en: "The interface may hide an action for usability, but a request can be modified or sent directly. The server first verifies the session, then checks whether that person may perform the action on the specific resource. A resource ID from the URL is input, not proof of ownership. Check access on every request, including when an owner and another user submit the same ID.",
          },
          { keyPointsUk: ["Сесія встановлює особу", "Сервер перевіряє дію та конкретний ресурс", "Приховування кнопки не є авторизацією"], keyPointsEn: ["A session establishes identity", "The server authorizes the action on the specific resource", "Hiding a button is not authorization"] },
        ),
        withOptionsEn(mcq(
          "ws-tb1",
          "У вебдодатку React ховає кнопку «Delete Project» для звичайних користувачів, але API `DELETE /api/projects/:id` не перевіряє власника. Наскільки безпечний цей захист?",
          "React hides the Delete button for non-owners, while `DELETE /api/projects/:id` has no ownership check. Is the app safe?",
          [
            "Небезпечно (Broken Access Control, OWASP A01): будь-хто може викликати маршрут напряму через curl/DevTools",
            "Повністю безпечно, бо кнопки немає в HTML",
            "Безпечно, якщо включити TypeScript strict mode",
            "Безпечно за наявності dark theme",
          ],
          0,
          why(
            "Браузер повністю контролює користувач. Кожну авторизацію й валідацію сервер зобов'язаний перевіряти повторно.",
            "Anything in the browser can be bypassed with curl; authorization must always run server-side.",
          ),
        ), ["Unsafe: anyone can call the route directly using curl or DevTools", "Completely safe because the button is absent from HTML", "Safe if TypeScript strict mode is enabled", "Safe if a dark theme is present"]),
        withOptionsEn(codeRead(
          "ws-tb2",
          "Знайдіть помилку fail-open у прапорцях або перевірці доступу: Чому обидва рядки є критичним антипатерном (OWASP A06 Insecure Design / A02)?",
          "Spot fail-open configuration trap: Why are both lines dangerous insecure defaults?",
          "ts",
          "const judgeMode = process.env.JUDGE_MODE || \"host\";\nif (env !== \"prod\" || req.headers[\"x-dev-bypass\"] === \"1\") next();",
          [
            "Порожня або відсутня змінна вмикає небезпечний режим, а заголовок може обійти перевірку навіть у prod",
            "Тому що `process.env` працює тільки на Windows",
            "Бо `||` повільніший за `&&`",
            "Заголовок `x-dev-bypass` не підтримується HTTP/2",
          ],
          0,
          why(
            "`||` підставляє host для порожнього значення, але не перевіряє довільний рядок. У другому рядку заголовок обходить перевірку і в prod. Безпечна конфігурація явно дозволяє відомі значення й відхиляє невідомі; клієнтський заголовок не є доказом доступу.",
            "`||` selects host for a missing or empty value, but does not validate arbitrary strings. The header bypass also works in prod. Explicitly allow known modes, reject unknown ones, and never treat a client header as authorization.",
          ),
        ), ["A missing or empty variable enables an unsafe mode, and the header can bypass the check even in production", "process.env works only on Windows", "|| is slower than &&", "HTTP/2 does not support the x-dev-bypass header"]),
        explain(
          "ws-tb-explain",
          "Користувач змінює ID проєкту в запиті на видалення. Які дві перевірки має виконати сервер і чому прихована кнопка не захищає?",
          "A user changes the project ID in a delete request. What two checks must the server perform, and why does hiding the button not protect the resource?",
          [
            { labelUk: "перевірка особи", labelEn: "verify identity", anyOf: ["сесі", "автентиф", "session", "authenticat"] },
            { labelUk: "право на конкретний ресурс", labelEn: "authorize the specific resource", anyOf: ["власник", "прав", "ресурс", "owner", "permission", "resource"] },
            { labelUk: "клієнт можна обійти", labelEn: "client can be bypassed", anyOf: ["обій", "запит", "клієнт", "bypass", "request", "client"] },
          ],
          { sampleAnswerUk: "Сервер перевіряє сесію та право користувача видалити саме цей ресурс. Приховану кнопку можна обійти, надіславши запит напряму.", sampleAnswerEn: "The server verifies the session and the user's permission to delete the specific resource. A hidden button can be bypassed by sending the request directly." },
        ),
      ], { baseXp: 24 },
    ),
    lesson(
      "ws-tb-threat-flow",
      "Перевірка критичних потоків і мінімальні привілеї",
      "Least Privilege & Attack Surface Mapping",
      3, true, [
        concept(
          "ws-tb-threat-concept",
          "Моделюйте загрозу разом із відмовою",
          "Model the threat and the failure path",
          {
            uk: "Для кожної критичної дії визначте актив, особу, дію та межу довіри. Далі запитайте: що станеться, якщо клієнт підмінить ID, а сервіс перевірки прав недоступний? Особу беруть із перевіреної сесії; дозволи визначають на сервері для конкретної дії та об'єкта. За неможливості перевірити права не виконуйте операцію: відмовте або поверніть помилку сервісу. Логи допомагають розслідувати збій, але не повинні містити паролі чи токени.",
            en: "For each critical action, identify the asset, actor, action, and trust boundary. Ask what happens if a client changes an ID or the authorization service is unavailable. Derive identity from the verified session and authorize the particular action and object on the server. If authorization cannot be checked, do not execute the action: deny it or return a service error. Logs support investigation but must not contain passwords or tokens.",
          },
        ),
        withPairsEn(matchEx(
          "ws-tb3",
          "Зіставте загрозу OWASP 2025 з точним рівнем захисту",
          "Match each security risk to the required control boundary",
          [
            { left: "Підміна ID іншого користувача в тілі запиту (`ownerId`)", right: "Отримувати `userId` лише із серверної сесії, ігнорувати client ownerId" },
            { left: "Витік стектрейсу та пароля БД у відповіді 500", right: "Повертати стабільний код `{ error: \"internal_error\" }`, деталі — у структурований лог без секретів" },
            { left: "Падіння перевірки прав при помилці зовнішнього сервісу", right: "Fail-closed відмова 403/503 замість пропуску далі" },
          ],
        ), [
          { left: "Substituting another user's ID in the request body (ownerId)", right: "Derive userId from the verified server session, not client ownerId" },
          { left: "Leaking a stack trace and database password in a 500 response", right: "Return a stable error code; log details without secrets" },
          { left: "An external authorization service fails", right: "Fail closed with a denial or service error instead of proceeding" },
        ]),
        explain(
          "ws-tb-threat-explain",
          "Сервіс перевірки прав недоступний під час видалення. Опишіть безпечну поведінку та що зафіксувати для розслідування.",
          "The authorization service is unavailable during deletion. Describe the safe behavior and what to record for investigation.",
          [
            { labelUk: "не виконувати дію", labelEn: "do not perform the action", anyOf: ["не викон", "відмов", "deny", "reject", "do not", "fail closed"] },
            { labelUk: "зафіксувати збій", labelEn: "record the failure", anyOf: ["лог", "журнал", "log", "record"] },
            { labelUk: "не записувати секрети", labelEn: "omit secrets", anyOf: ["секрет", "парол", "токен", "secret", "password", "token"] },
          ],
          { sampleAnswerUk: "Не виконувати видалення: повернути помилку сервісу й записати збій у журнал без токенів і паролів.", sampleAnswerEn: "Do not perform the deletion: return a service error and log the failure without tokens or passwords." },
        ),
      ], { baseXp: 24 },
    ),
    exam("ws-tb-exam", "Контрольна: межі довіри", "Checkpoint: Trust Boundaries", 3, [
      withOptionsEn(mcq(
        "ws-tb-e1",
        "Звідки API повинен брати особу поточного користувача для створення чи видалення ресурсу?",
        "Where must the API obtain the authenticated user's identity?",
        [
          "Виключно з серверно верифікованого токена сесії (DB hash lookup / signed verified credential)",
          "Із прихованого поля `<input type=\"hidden\" name=\"userId\">`",
          "Із `req.body.authorId`",
          "Із параметру запиту `?asUser=admin`",
        ],
        0,
      ), ["From a server-verified session or signed credential", "From a hidden input named userId", "From req.body.authorId", "From the query parameter ?asUser=admin"]),
      codeFill(
        "ws-tb-e2",
        "Відхиляти за замовчуванням, якщо роль не підтверджена (fail-closed)",
        "Default deny status when authorization fails",
        "ts",
        "if (!canEdit) return res.status(___).json({ error: \"forbidden\" });",
        ["403"],
        true,
      ),
    ]),
  ],
);

const validationOutput = unit(
  "ws_validation_output",
  "Валідація, захист від XSS та Injection (OWASP A05)",
  "Server Validation, XSS & Injection Prevention",
  [
    lesson(
      "ws-vo-xss-sql",
      "Контекстне екранування проти XSS і параметризовані запити проти SQLi",
      "Preventing XSS & SQL Injection",
      3, true, [
        concept(
          "ws-vo-injection-concept",
          "Дані залишаються даними в кожному контексті",
          "Keep data as data in each context",
          {
            uk: "Для тексту в JSX використовуйте звичайний текстовий вузол; вставка HTML потребує перевіреного санітайзера, налаштованого для потрібного набору тегів. URL перевіряють за призначенням: для звичайних посилань визначають допустимі схеми, а для завантаження ресурсів можуть знадобитися і дозволені походження. Значення SQL передають параметрами, не конкатенують у запит. Назви стовпців і напрямок сортування не є параметрами значень: обирайте їх із фіксованої мапи та відхиляйте невідомі ключі. Звичайний JavaScript-об'єкт має успадковані властивості, тому використовуйте Map або перевірку власного ключа.",
            en: "For text in JSX, use a normal text node; inserting HTML requires a vetted sanitizer configured for the allowed markup. Validate URLs for their purpose: ordinary links need an allowed-scheme policy, while resource loads may also need an origin allowlist. Bind SQL values as parameters instead of concatenating them into the query. Column names and sort directions are not value parameters: choose them from a fixed map and reject unknown keys. Ordinary JavaScript objects have inherited properties, so use a Map or an own-property check.",
          },
          { code: "const sortColumns = new Map([['newest', 'created_at'], ['title', 'title']]);\nconst column = sortColumns.get(userChoice);\nif (column === undefined) throw new Error('invalid_sort');\n// Only interpolate this fixed identifier; bind values separately: WHERE owner_id = $1.", language: "ts" },
        ),
        withOptionsEn(codeRead(
          "ws-vo1",
          "Знайдіть вектор Stored XSS у відображенні нотаток задачі: Чому рендер `{task.notes}` у JSX безпечний, а `dangerouslySetInnerHTML` без строгого санітайзера — ні?",
          "Diagnose Stored XSS risk in HTML rendering: Why is JSX `{task.notes}` safe against XSS while `dangerouslySetInnerHTML` is vulnerable?",
          "tsx",
          "// Bad:\n<div dangerouslySetInnerHTML={{ __html: task.notes }} />\n// Safe:\n<p className=\"whitespace-pre-wrap\">{task.notes}</p>",
          [
            "React відображає рядок у `{...}` як текст, а raw HTML може створювати небезпечні елементи та обробники подій",
            "React видаляє всі символи пробілу в `{...}`",
            "dangerouslySetInnerHTML працює тільки в IE11",
            "XSS неможливий у тегах `<div>`",
          ],
          0,
          why(
            "Ніколи не вставляйте неперевірений HTML користувача в DOM; крім того перевіряйте URL посилань на allowlist `https:`/`http:` (заборона `javascript:`).",
            "Rely on context-aware text escaping by default, and allowlist `http:`/`https:` schemes for user-supplied links.",
          ),
        ), ["React renders the string inside {...} as text, whereas raw HTML can create dangerous elements and event handlers", "React removes all spaces inside {...}", "dangerouslySetInnerHTML works only in IE11", "XSS is impossible inside div elements"]),
        mcq(
          "ws-vo2",
          "Застосунок дозволяє в посиланнях лише HTTPS, HTTP і відносні шляхи. Яке значення слід відхилити незалежно від захисту React?",
          "An application allows only HTTPS, HTTP and relative paths in links. Which value should its URL policy reject regardless of React's protections?",
          [
            "`javascript:alert(document.domain)`",
            "`https://example.com/docs?id=1`",
            "`/tasks/42`",
            "`#section-1`",
          ],
          0,
          why(
            "React 19 блокує `javascript:` у низці URL-властивостей, але це не замінює політику застосунку: розбирайте URL з відомою базою, дозволяйте потрібні схеми й окремо обмежуйте походження там, де це потрібно.",
            "React 19 blocks `javascript:` in several URL props, but that does not replace application policy: parse URLs against a known base, allow the required schemes, and restrict origins separately where needed.",
          ),
        ),
        withOptionsEn(mcq(
          "ws-vo-sort-map",
          "Чому для вибору SQL-стовпця недостатньо перевірити `if (allowed[userChoice])` у звичайному JavaScript-об'єкті?",
          "Why is checking only `if (allowed[userChoice])` on an ordinary JavaScript object insufficient when selecting a SQL column?",
          [
            "Об'єкт може успадкувати ключі на кшталт `constructor`; використайте Map або перевірте власну властивість",
            "Параметри SQL автоматично замінюють назви стовпців",
            "Будь-який рядок є безпечним SQL-ідентифікатором",
            "Map автоматично перевіряє право доступу користувача",
          ],
          0,
          why(
            "Дозволена мапа має повертати лише заздалегідь визначені ідентифікатори; окремо перевіряйте авторизацію та параметризуйте значення.",
            "The allowlist must return only predefined identifiers; authorize separately and bind values as parameters.",
          ),
        ), ["An object can inherit keys such as constructor; use a Map or check for an own property", "SQL value parameters automatically substitute column names", "Every string is a safe SQL identifier", "A Map automatically checks user authorization"]),
      ], { baseXp: 25 },
    ),
    lesson(
      "ws-vo-zod-strict",
      "Строга валідація схеми та захист від масового присвоєння",
      "Strict Payload Validation & Mass Assignment Prevention",
      3, true, [
        concept(
          "ws-vo-dto-concept",
          "Перевірка форми не дає права на зміну поля",
          "A valid payload does not grant permission to update a field",
          {
            uk: "Клієнт може додати до JSON поля, яких немає у формі. На сервері опишіть дозволений DTO, відхиліть зайві ключі, перевірте права на дію та явно виберіть поля для запису. Схема перевіряє форму і значення даних, але не замінює авторизацію або контекстне кодування виводу. Навіть адміністраторські поля не повинні потрапляти в загальний маршрут оновлення профілю.",
            en: "A client can add JSON fields that are not present in the form. On the server, define an allowed DTO, reject unknown keys, authorize the action, and explicitly select fields for persistence. A schema validates the shape and values, but does not replace authorization or context-specific output encoding. Administrative fields should not flow through a general profile-update endpoint.",
          },
        ),
        withOptionsEn(codeRead(
          "ws-vo3",
          "Атака Mass Assignment через передачу всього `req.body` у `.set()`: Що зможе зробити зловмисник на вразливому рядку?",
          "Prevent mass-assignment bug with explicit allowlisted DTO: What can an attacker exploit in the first line?",
          "ts",
          "// Vulnerable:\nawait db.update(users).set(req.body).where(eq(users.id, userId));\n// Safe:\nconst dto = updateProfileSchema.parse(req.body);\nawait db.update(users).set({ name: dto.name }).where(eq(users.id, userId));",
          [
            "Передати JSON `{ \"role\": \"admin\" }` і перезаписати привілейоване поле, якщо схема таблиці та ORM дозволяють його змінити",
            "Змінити версію Node.js",
            "Скинути TLS-сертифікат",
            "Примусити браузер вимкнути CSS",
          ],
          0,
          why(
            "Завжди розбирайте payload через сувору Zod-схему і передавайте в БД лише явно дозволені поля.",
            "Always parse untrusted JSON into strict schemas and pick explicit fields before persistence.",
          ),
        ), ["Submit { role: 'admin' } and overwrite a privileged field if the table and ORM permit it", "Change the Node.js version", "Reset the TLS certificate", "Force the browser to disable CSS"]),
        codeFill(
          "ws-vo4",
          "Заблокувати невідомі ключі в об'єкті Zod-схеми",
          "Reject unexpected keys in Zod object schema",
          "ts",
          "const schema = z.object({ title: z.string().min(1) }).___();",
          ["strict"],
          true,
        ),
      ], { baseXp: 25 },
    ),
    exam("ws-vo-exam", "Контрольна: валідація та ін'єкції", "Checkpoint: Validation & Injection", 3, [
      withOptionsEn(mcq(
        "ws-vo-e1",
        "Користувач пропустив валідацію на фронтенді через прямий `POST` запит. Як на це має реагувати API?",
        "How must the server API handle invalid inputs sent directly via curl?",
        [
          "Суворо перевірити схему на сервері, відхилити з HTTP 400 (`validation_error`) без запису в БД",
          "Довіритись тому, що форма у React вже перевірила",
          "Зберегти невалідні дані й показати 200",
          "Упасти з неперехопленою помилкою 500",
        ],
        0,
      ), ["Validate the schema on the server and reject the request with HTTP 400 without writing to the database", "Trust that the React form already validated it", "Save invalid data and return 200", "Crash with an uncaught 500 error"]),
      withOptionsEn(mcq(
        "ws-vo-e2",
        "Як безпечно передавати користувацькі значення в SQL-запит до PostgreSQL?",
        "How should user-supplied values be passed safely to a PostgreSQL query?",
        [
          "Передавати значення параметрами (`$1`, `$2`); динамічні ідентифікатори обирати з дозволеної мапи",
          "Блокування лише слова SELECT через RegExp",
          "Кодування у Base64 перед конкатенацією рядка SQL",
          "Зменшення довжини пароля БД",
        ],
        0,
      ), ["Bind values as parameters ($1, $2) and choose dynamic identifiers from an allowlisted map", "Block only the word SELECT with a regular expression", "Base64-encode values before concatenating SQL", "Shorten the database password"]),
    ]),
  ],
);

const sessionsAuthn = unit(
  "ws_sessions_authn",
  "Сесії, паролі та MFA (OWASP A07)",
  "Sessions, Password Hashing & MFA",
  [
    lesson(
      "ws-sa-tokens-cookies",
      "Хешування токенів у БД, `HttpOnly` cookies та захист сесії",
      "Hashed Session Tokens & Cookie Flags",
      4, true, [
        concept(
          "ws-sa-session-concept",
          "Токен сесії та межі захисту cookie",
          "Session tokens and cookie protections",
          {
            uk: "Сервер генерує високоентропійний токен криптографічним генератором, надсилає клієнту й зберігає лише його хеш. На кожен запит сервер перевіряє активність, строк дії та відкликання сесії. HttpOnly приховує cookie від JavaScript, Secure обмежує передавання HTTPS, а SameSite зменшує частину міжсайтових запитів; для cookie-сесій усе одно потрібен захист CSRF. Обмежуйте область cookie, наскільки дозволяє сценарій. Ці атрибути не усувають XSS: скрипт у довіреному походженні може надсилати автентифіковані запити. Хеш зменшує наслідки витоку самої бази, але не захищає викрадений із браузера сирий токен.",
            en: "The server generates a high-entropy token with a cryptographically secure generator, sends it to the client, and stores only its hash. On each request the server checks that the session is active, unexpired, and unrevoked. HttpOnly hides the cookie from JavaScript, Secure restricts transmission to HTTPS, and SameSite reduces some cross-site requests; cookie sessions still need CSRF protection. Scope cookies as narrowly as the application allows. These attributes do not eliminate XSS: a script in the trusted origin can send authenticated requests. A hash reduces the impact of a database-only leak but does not protect a raw token stolen from the browser.",
          },
          { keyPointsUk: ["Випадковий токен клієнту, хеш серверу", "HttpOnly не усуває XSS", "Перевіряйте строк дії та відкликання"], keyPointsEn: ["Random token to the client, hash on the server", "HttpOnly does not eliminate XSS", "Check expiry and revocation"] },
        ),
        withOptionsEn(mcq(
          "ws-sa1",
          "Навіщо в таблиці `sessions` (як в EduForge) зберігати `SHA-256(token)`, а клієнту віддавати cookie `HttpOnly; SameSite=Lax; Secure`?",
          "Why store `SHA-256(token)` in the database `sessions` table while sending an `HttpOnly; SameSite=Lax; Secure` cookie?",
          [
            "Якщо зловмисник прочитає дамп або лог таблиці `sessions`, сирий секретний cookie-токен не розкривається; `HttpOnly` також ховає токен від JS при XSS",
            "Тому що SHA-256 стискає cookie у 100 разів",
            "`HttpOnly` забороняє передавати cookie через HTTP узагалі",
            "`SameSite=Lax` шифрує JSON тіло відповіді",
          ],
          0,
          why(
            "Високоентропійний випадковий токен хешують швидким SHA-256 на сервері (на відміну від паролів користувачів, де потрібні повільні Argon2/scrypt).",
            "Hashing a high-entropy opaque token reduces the risk from a database-only leak; `HttpOnly` prevents JavaScript from reading the cookie but does not stop XSS from making authenticated requests.",
          ),
        ), ["A database-only leak does not directly expose the raw token, and HttpOnly prevents JavaScript from reading the cookie", "SHA-256 compresses cookies 100 times", "HttpOnly forbids sending the cookie over HTTP entirely", "SameSite=Lax encrypts the JSON response body"]),
        codeFill(
          "ws-sa2",
          "Заборонити доступ JavaScript (`document.cookie`) до сесійного cookie",
          "Flag protecting cookie from JavaScript access",
          "http",
          "Set-Cookie: session=abc; Path=/; ___; SameSite=Lax",
          ["HttpOnly", "httponly", "Secure", "secure"],
          false,
        ),
        withOptionsEn(mcq(
          "ws-sa-cookie-xss",
          "На сторінці є XSS, а сесійний cookie має HttpOnly. Що залишається можливим для шкідливого скрипту?",
          "A page has XSS and its session cookie is HttpOnly. What can the injected script still do?",
          [
            "Надсилати запити від імені користувача, хоча прочитати cookie через JavaScript не може",
            "Завжди прочитати HttpOnly через document.cookie",
            "Лише змінити колір сторінки без мережевих запитів",
            "Автоматично відкликати всі сесії інших користувачів",
          ],
          0,
          why("HttpOnly зменшує ризик викрадення cookie через JavaScript, але не зупиняє дії в контексті сторінки.", "HttpOnly reduces JavaScript access to the cookie but does not stop actions in the page's context."),
        ), ["Send authenticated requests as the user even though JavaScript cannot read the cookie", "Always read HttpOnly through document.cookie", "Only change page color without network requests", "Automatically revoke all other users' sessions"]),
      ], { baseXp: 26 },
    ),
    lesson(
      "ws-sa-passwords-mfa",
      "Повільне хешування паролів, ротація сесії та MFA gating",
      "Slow Password Hashing, Session Rotation & MFA",
      4, false, [
        concept(
          "ws-sa-password-concept",
          "Паролі та сесії мають різні моделі загроз",
          "Passwords and sessions have different threat models",
          {
            uk: "Паролі, обрані людьми, часто можна вгадати, тому їх зберігають за допомогою спеціального повільного алгоритму хешування паролів із унікальною сіллю, наприклад Argon2id; робочі параметри підбирають і переглядають. Після перевірки пароля обліковий запис із MFA залишається в обмеженому короткочасному стані до успішного другого фактора; спроби перевірки обмежують. При переході до автентифікованої сесії змініть її ідентифікатор і відкличте попередній, щоб протидіяти фіксації сесії. Після скидання пароля відкличте існуючі сесії за політикою відновлення й запропонуйте звичайний вхід; відновлення MFA також потребує окремого захисту.",
            en: "Human-chosen passwords are often guessable, so store them using a dedicated slow password-hashing algorithm with a unique salt, such as Argon2id, and review its work parameters. After the password check, an account with MFA stays in a short-lived restricted state until the second factor succeeds; limit verification attempts. Rotate the session identifier and revoke the previous one when transitioning to an authenticated session to mitigate session fixation. After password reset, revoke existing sessions under the recovery policy and offer a normal sign-in; MFA recovery also needs separate protection.",
          },
        ),
        withOptionsEn(mcq(
          "ws-sa3",
          "Користувач увів пароль і в нього увімкнено 2FA (TOTP), але ще не пройшов другий фактор (`mfa_required`). Що має дозволяти ця проміжна сесія?",
          "A user passed password check and has TOTP 2FA enabled (`mfa_required` state). What should this pending session allow?",
          [
            "Лише верифікацію TOTP / logout; доступ до приватних API проєктів, задач або адмінки має бути заблокований (403/401)",
            "Повний доступ на читання й запис усіх задач",
            "Вимкнення 2FA без коду підтвердження",
            "Експорт чужих даних",
          ],
          0,
          why(
            "Успішний пароль ще не завершив MFA: проміжний стан має допускати лише необхідні кроки завершення входу та вихід.",
            "A correct password does not complete MFA: the pending state should permit only the necessary sign-in completion steps and logout.",
          ),
        ), ["Only TOTP verification and logout; private project, task, and admin APIs remain blocked", "Full read and write access to every task", "Disabling 2FA without confirmation", "Exporting other users' data"]),
        explain(
          "ws-sa-explain",
          "Чому пароль і випадковий токен сесії хешують по-різному, і що має статись після успішного MFA?",
          "Why are a password and a random session token hashed differently, and what should happen after MFA succeeds?",
          [
            { labelUk: "пароль і повільний алгоритм", labelEn: "password and slow hashing", anyOf: ["argon", "scrypt", "bcrypt", "повільн", "slow"] },
            { labelUk: "випадковий токен", labelEn: "random token", anyOf: ["випадков", "ентроп", "random", "entropy"] },
            { labelUk: "оновити сесію", labelEn: "rotate the session", anyOf: ["сесі", "токен", "session", "token"] },
          ],
          { sampleAnswerUk: "Пароль може бути вгаданим, тому потрібен повільний Argon2id; випадковий токен має високу ентропію. Після MFA оновлюють ідентифікатор сесії.", sampleAnswerEn: "A password is guessable and needs slow Argon2id; a random token has high entropy. After MFA, rotate the session identifier." },
        ),
        withOptionsEn(mcq(
          "ws-sa-fixation",
          "Після MFA застосунок видав новий токен, але старий токен попередньої сесії все ще дає доступ. Чи завершена ротація?",
          "After MFA the application issues a new token, but the previous session token still grants access. Is rotation complete?",
          [
            "Ні: попередню сесію потрібно відкликати, а нову перевіряти за серверним станом",
            "Так: достатньо показати новий токен на екрані",
            "Так: старий токен стає недійсним через HttpOnly",
            "Ні: потрібно зберігати обидва сирі токени в URL",
          ],
          0,
          why("Заміна ідентифікатора захищає лише тоді, коли попередній більше не працює як автентифікована сесія.", "Identifier rotation protects only when the previous credential no longer works as an authenticated session."),
        ), ["No: revoke the previous session and validate the new one against server state", "Yes: displaying a new token is enough", "Yes: HttpOnly invalidates the old token", "No: store both raw tokens in the URL"]),
      ], { baseXp: 26 },
    ),
    exam("ws-sa-exam", "Контрольна: сесії та автентифікація", "Checkpoint: Sessions & Authentication", 4, [
      withOptionsEn(mcq(
        "ws-sa-e1",
        "Чому для паролів користувачів використовують Argon2id / scrypt / bcrypt із сіллю, а НЕ простий SHA-256?",
        "Why must user passwords use Argon2id/scrypt/bcrypt with salt instead of raw SHA-256?",
        [
          "Паролі мають низьку ентропію: GPU перебирають мільярди SHA-256 на секунду, тоді як Argon2/scrypt навмисно затратні по пам'яті та часу",
          "SHA-256 не вміє хешувати кирилицю",
          "Сіль робить пароль коротшим",
          "Argon2 можна розшифрувати назад у plain text",
        ],
        0,
      ), ["Passwords are often guessable, while password hashing is deliberately costly to slow offline guessing", "SHA-256 cannot hash Cyrillic text", "A salt makes the password shorter", "Argon2 can be decrypted back to plaintext"]),
      withOptionsEn(mcq(
        "ws-sa-e2",
        "Що слід зробити з існуючими сесіями після успішного скидання забутого пароля за безпечною політикою відновлення?",
        "Under a secure recovery policy, what should happen to existing sessions after a successful forgotten-password reset?",
        [
          "Відкликати існуючі сесії на сервері та запропонувати звичайний вхід із новим паролем",
          "Залишити всі старі сесії безстроково активними",
          "Зберегти старий токен у URL query string",
          "Перезавантажити Redis без перевірки БД",
        ],
        0,
      ), ["Revoke existing sessions on the server and offer normal sign-in with the new password", "Keep all old sessions active indefinitely", "Store the old token in a URL query string", "Restart Redis without checking the database"]),
    ]),
  ],
);

const authorizationIdor = unit(
  "ws_authorization_idor",
  "Авторизація, IDOR та захист привілеїв (OWASP A01)",
  "Authorization, IDOR & Step-Up Checks",
  [
    lesson(
      "ws-az-idor",
      "Злам IDOR на прикладі ForgeBoard і виправлення на рівні запиту",
      "Diagnosing & Fixing Insecure Direct Object Reference (IDOR)",
      4, false, [
        concept(
          "ws-az-idor-concept",
          "Перевіряйте дію для кожного об'єкта",
          "Authorize the action on each object",
          {
            uk: "IDOR виникає, коли сервер приймає посилання на об'єкт від клієнта й не перевіряє, чи дозволена цьому користувачу конкретна дія. Непередбачуваний ID ускладнює вгадування, але не замінює перевірки. Для приватної задачі можна обмежити запит власником; для спільного проєкту перевіряють членство й право саме на читання або зміну. Для масового оновлення перевіряють кожен ID та визначають поведінку при частковій відмові; права й оновлення мають бути узгоджені з конкурентними змінами.",
            en: "IDOR occurs when a server accepts an object reference from a client without checking whether that user may perform the specific action. An unpredictable ID makes guessing harder but does not replace authorization. A private task query can be scoped to its owner; a shared project requires checking membership and the permission for the specific read or write. For bulk updates, check every ID, define partial-failure behavior, and keep authorization and mutation consistent with concurrent permission changes.",
          },
          { keyPointsUk: ["ID не є дозволом", "Перевіряйте користувача, дію та об'єкт", "Враховуйте членство і кожен ID масової операції"], keyPointsEn: ["An ID is not permission", "Check the user, action, and object", "Account for membership and each ID in a bulk operation"] },
        ),
        withOptionsEn(codeRead(
          "ws-az1",
          "Виявіть класичний IDOR у маршруті читання задачі: Що може зробити автентифікований користувач Bob з `id = 2`?",
          "Spot and fix an IDOR vulnerability: What can authenticated user Bob (`id = 2`) exploit here?",
          "ts",
          "app.get(\"/api/tasks/:id\", authMiddleware, async (req, res) => {\n  const [task] = await db.select().from(tasks).where(eq(tasks.id, Number(req.params.id)));\n  if (!task) return res.status(404).json({ error: \"not_found\" });\n  return res.json({ task });\n});",
          [
            "Перебрати `:id` (1, 2, 3...) і читати чужі задачі Alice, бо маршрут перевірив лише логін (`401`), але не перевірив належність ресурсу (`ownerId` / membership)!",
            "Нічого, бо `authMiddleware` блокує всіх, крім власника",
            "Змінити версію SQL-драйвера",
            "Видалити cookie Alice",
          ],
          0,
          why(
            "Автентифікація встановлює особу; авторизація перевіряє право на конкретну дію. Для приватних задач обмежте запит власником, а для спільних перевіряйте членство та потрібний дозвіл. Відмову можна оформити як 403 або 404 згідно з політикою.",
            "Authentication establishes identity; authorization checks permission for the specific action. Scope private tasks to the owner, and check membership and permissions for shared tasks. Return 403 or 404 according to the disclosure policy.",
          ),
        ), ["Enumerate IDs and read Alice's tasks because authentication does not check ownership or membership", "Nothing: authMiddleware allows only the owner", "Change the SQL driver version", "Delete Alice's cookie"]),
        codeFill(
          "ws-az2",
          "Перевірка належності запису користувачу в SQL/Drizzle",
          "Scope lookup by both task id and session user ownerId",
          "ts",
          "and(eq(tasks.id, taskId), eq(tasks.___, req.user.id))",
          ["ownerId"],
          true,
        ),
        explain(
          "ws-az-idor-explain",
          "Чому UUID у посиланні не усуває IDOR і як перевірити зміну задачі спільного проєкту?",
          "Why does a UUID in a link not eliminate IDOR, and how should an update to a shared project's task be authorized?",
          [
            { labelUk: "ідентифікатор не дозвіл", labelEn: "identifier is not authorization", anyOf: ["ідентифік", "uuid", "посилан", "identifier", "id", "link"] },
            { labelUk: "перевірка членства", labelEn: "check membership", anyOf: ["членств", "учасник", "membership", "member"] },
            { labelUk: "дозвіл на зміну", labelEn: "check update permission", anyOf: ["прав", "дозв", "permission", "authoriz"] },
          ],
          { sampleAnswerUk: "UUID можна отримати з посилання, тому сервер перевіряє членство користувача в проєкті та дозвіл змінювати конкретну задачу.", sampleAnswerEn: "A UUID can be obtained from a link, so the server checks project membership and permission to update the specific task." },
        ),
        withOptionsEn(mcq(
          "ws-az-readonly",
          "Користувач є учасником спільного проєкту з правом лише читання і надсилає PATCH задачі. Що має зробити сервер?",
          "A shared-project member has read-only permission and sends a PATCH for a task. What should the server do?",
          [
            "Відхилити зміну: саме членство не дає права на запис",
            "Дозволити зміну, бо користувач знає UUID задачі",
            "Дозволити зміну, бо будь-який учасник має всі права",
            "Змінити задачу й приховати результат у клієнті",
          ],
          0,
          why("Авторизація залежить від конкретної дії та об'єкта, а не лише від членства або знання ID.", "Authorization depends on the specific action and object, not just membership or knowledge of an ID."),
        ), ["Reject the update: membership alone does not grant write permission", "Allow the update because the user knows the task UUID", "Allow the update because every member has all permissions", "Update the task and hide the result in the client"]),
      ], { baseXp: 26 },
    ),
    lesson(
      "ws-az-stepup",
      "Step-up автентифікація та захист адміністративних дій",
      "Step-Up Re-Authentication & Admin RBAC",
      4, false, [
        concept(
          "ws-az-stepup-concept",
          "Роль і свіжий доказ вирішують різні задачі",
          "Role and recent proof solve different problems",
          {
            uk: "Роль адміністратора визначає, які дії дозволені; step-up додатково вимагає свіжого підтвердження особи перед чутливою операцією. Сервер перевіряє обидві умови, прив'язує підтвердження до конкретної сесії та обмежує час його дії. Підтвердження іншої сесії, прострочений або відсутній доказ не підвищує привілеї. Перевіряйте актуальну роль і право на дію в момент виконання, навіть після успішного step-up. Він не замінює захист від CSRF та журналювання без секретів.",
            en: "An administrator role determines which actions are allowed; step-up additionally requires recent proof of identity before a sensitive operation. The server checks both conditions, binds the proof to the specific session, and limits its lifetime. Proof from another session, or proof that is missing or expired, does not grant elevated access. Check the current role and permission at execution even after successful step-up. It does not replace CSRF protection or logging without secrets.",
          },
        ),
        withOptionsEn(mcq(
          "ws-az3",
          "Навіщо чутливі дії адміністратора (зміна ролі, перегляд аудит-логів чи відкликання сесій) захищати через `requireStepUp` (повторний доказ або свіжий код), а не лише загальну адмін-сесію?",
          "Why guard sensitive admin mutations with step-up verification in addition to regular admin RBAC?",
          [
            "Обмежує шкоду від тимчасово залишеної відкритої вкладки браузера чи викраденої старої сесії",
            "Зменшує кількість таблиць у базі даних",
            "Замінює HTTPS на HTTP",
            "Дозволяє пускати анонімних користувачів в адмінку",
          ],
          0,
          why(
            "Step-up зменшує ризик використання старої сесії, але сервер усе одно перевіряє роль, дію та свіжість підтвердження.",
            "Step-up reduces the risk of an old session being misused, but the server must still check the role, action, and freshness of the proof.",
          ),
        ), ["It limits damage from a temporarily unattended browser or an old stolen session", "It reduces the number of database tables", "It replaces HTTPS with HTTP", "It lets anonymous users into the admin area"]),
        withOptionsEn(mcq(
          "ws-az-stepup-session",
          "Адміністратор підтвердив step-up у сесії A. Сесія B того самого акаунта не проходила підтвердження. Чи може B виконати чутливу дію?",
          "An administrator completed step-up in session A. Session B for the same account has not completed it. Can B perform a sensitive action?",
          [
            "Ні: підтвердження має бути свіжим і прив'язаним до сесії B; роль також перевіряють",
            "Так: підтвердження назавжди діє на всі сесії акаунта",
            "Так: достатньо надіслати ID сесії A у запиті",
            "Так: CSRF автоматично надає step-up",
          ],
          0,
          why("Не переносіть привілейований стан між сесіями та не довіряйте клієнтському твердженню про підтвердження.", "Do not transfer privileged state between sessions or trust a client claim of verification."),
        ), ["No: proof must be recent and bound to session B; check the role as well", "Yes: verification permanently applies to every account session", "Yes: send session A's ID in the request", "Yes: CSRF automatically grants step-up"]),
      ], { baseXp: 26 },
    ),
    exam("ws-az-exam", "Контрольна: авторизація та IDOR", "Checkpoint: Authorization & IDOR", 4, [
      withOptionsEn(mcq(
        "ws-az-e1",
        "Користувач без токена отримує `401 unauthorized`, а залогінений користувач, що звертається до чужого ресурсу, — ___?",
        "Unauthenticated callers get `401 unauthorized`; an authenticated user accessing someone else's private record receives ___?",
        ["403 forbidden (або 404 за політикою приховування існування запису)", "200 OK", "301 Redirect", "502 Bad Gateway"],
        0,
      ), ["403 Forbidden, or 404 under a policy that conceals the record's existence", "200 OK", "301 Redirect", "502 Bad Gateway"]),
      withOptionsEn(mcq(
        "ws-az-e2",
        "Який підхід захищає масову операцію `PATCH /tasks/bulk` від зміни недозволених задач?",
        "Which approach protects `PATCH /tasks/bulk` from modifying unauthorized tasks?",
        [
          "Перевіряти право на зміну кожної задачі та узгодити перевірку з оновленням і конкурентними змінами прав",
          "Довіряти списку ID з клієнта, якщо їх більше двох",
          "Перевіряти лише перший елемент масиву",
          "Вимкнути HTTPS локально",
        ],
        0,
        why(
          "У приватній моделі можна обмежити оновлення власником; у спільній потрібні членство й дозвіл на дію. Визначте, чи відхиляється весь запит при недоступному ID.",
          "In a private model the update can be owner-scoped; shared resources need membership and action permissions. Define whether an unauthorized ID rejects the entire request.",
        ),
      ), ["Check permission to modify each task and keep the check consistent with the update and concurrent permission changes", "Trust client IDs when there are more than two", "Check only the first array element", "Disable HTTPS locally"]),
    ]),
  ],
);

const browserSecurity = unit(
  "ws_browser_security",
  "Браузерна безпека: CSRF, CORS, CSP та заголовки (OWASP A02)",
  "Browser Security: CSRF, CORS, CSP & Headers",
  [
    lesson(
      "ws-bs-csrf-cors",
      "Як працює CSRF проти cookie-сесій і чому CORS — не брандмауер",
      "CSRF Origin Verification & CORS Misconceptions",
      4, false, [
        concept(
          "ws-bs-csrf-concept",
          "CORS і CSRF контролюють різні речі",
          "CORS and CSRF address different problems",
          {
            uk: "CORS визначає, чи може браузерний скрипт прочитати відповідь іншого origin; для деяких запитів браузер спершу надсилає preflight і не надсилає основний запит без дозволу. Проста HTML-форма може надіслати POST без preflight, навіть якщо відповідь недоступна скрипту. Чи додасть браузер cookie, залежить від SameSite, налаштувань і контексту запиту. Same-site не означає same-origin: сусідній піддомен може належати тому самому сайту, але не бути довіреним origin. Для cookie-автентифікованих змін сервер застосовує CSRF-токен або сувору перевірку походження з визначеною політикою для відсутніх заголовків; SameSite — додатковий захист, не заміна авторизації.",
            en: "CORS controls whether browser scripts can read cross-origin responses; for some requests the browser first sends a preflight and withholds the actual request if permission is denied. A simple HTML form can send a POST without a preflight even when a script cannot read the response. Whether cookies accompany it depends on SameSite, browser settings, and request context. Same-site does not mean same-origin: a sibling subdomain may belong to the same site without being a trusted origin. For cookie-authenticated mutations, use a CSRF token or strict origin validation with a defined policy for missing headers; SameSite adds defense but does not replace authorization.",
          },
        ),
        withOptionsEn(mcq(
          "ws-bs1",
          "Якщо браузер за своїми правилами додає cookie до міжсайтової форми POST, чому одного обмеження CORS недостатньо для захисту від CSRF?",
          "If browser cookie rules allow a cross-site form POST to carry a session cookie, why is restricting CORS alone insufficient against CSRF?",
          [
            "Форма може надіслати POST без preflight; сервер має перевіряти CSRF-токен або походження, а SameSite додає захист",
            "HTML форми заборонені з 2020 року",
            "JSON-парсер сам блокує сторонні домени на рівні TCP",
            "React автоматично шифрує cookie",
          ],
          0,
          why(
            "Обмеження читання відповіді не скасовує дію, вже виконану простим запитом. Для інших типів запитів preflight може зупинити основний запит; наявність cookie залежить від браузерних правил.",
            "Restricting response access cannot undo an action already performed by a simple request. Preflight can block other request types; whether cookies are sent depends on browser rules.",
          ),
        ), ["A form can send a POST without preflight; the server must validate a CSRF token or origin, while SameSite adds protection", "HTML forms have been forbidden since 2020", "A JSON parser blocks external domains at the TCP layer", "React automatically encrypts cookies"]),
        withOptionsEn(codeRead(
          "ws-bs2",
          "Виявіть смертельно небезпечну комбінацію CORS: Яку помилку робить сервер, що динамічно відбиває будь-який заголовок `Origin` у `Access-Control-Allow-Origin` разом із `Allow-Credentials: true`?",
          "Why is blindly echoing the request `Origin` with `Access-Control-Allow-Credentials: true` dangerous?",
          "http",
          "Access-Control-Allow-Origin: https://evil-mirror.example\nAccess-Control-Allow-Credentials: true",
          [
            "Сторонній сайт може читати приватну відповідь із cookie жертви, якщо браузер дозволяє передати ці cookie",
            "Помилка лише в тому, що HTTPS став повільнішим",
            "Це блокує запити з самого localhost",
            "Така комбінація не має жодних наслідків",
          ],
          0,
          why(
            "Завжди звіряйте `Origin` із суворим фіксованим allowlist доменів вашого фронтенду.",
            "Only echo origins strictly present in a server-side allowlist when credentials are enabled.",
          ),
        ), ["An external site may read a private response using the victim's cookies if browser rules allow those cookies to be sent", "The only problem is slower HTTPS", "It blocks requests from localhost", "This combination has no consequences"]),
        withOptionsEn(mcq(
          "ws-bs-sibling-origin",
          "Додаток довіряє лише `https://app.example.com`. Скомпрометований `https://other.example.com` надсилає запит зі зміною даних. Чи достатньо SameSite як єдиного захисту?",
          "An app trusts only `https://app.example.com`. A compromised `https://other.example.com` sends a mutating request. Is SameSite alone sufficient?",
          [
            "Ні: це різні origin, але вони можуть бути same-site; потрібна перевірка CSRF відповідно до політики",
            "Так: різні піддомени завжди є cross-site",
            "Так: CORS завжди зупинить надсилання HTML-форми",
            "Так: ім'я cookie доводить право на зміну",
          ],
          0,
          why("Перевіряйте точний дозволений origin або коректний CSRF-токен; не ототожнюйте межі origin та site.", "Validate the exact trusted origin or a valid CSRF token; do not conflate origin and site boundaries."),
        ), ["No: these are distinct origins but may be same-site; enforce the CSRF policy", "Yes: different subdomains are always cross-site", "Yes: CORS always blocks an HTML form from being sent", "Yes: the cookie name proves permission to mutate"]),
      ], { baseXp: 26 },
    ),
    lesson(
      "ws-bs-csp-headers",
      "CSP, `X-Content-Type-Options: nosniff` і безпечні завантаження",
      "Content-Security-Policy & Hardening Headers",
      4, false, [
        concept(
          "ws-bs-csp-concept",
          "Заголовки доповнюють безпечний код",
          "Headers complement secure code",
          {
            uk: "CSP обмежує джерела ресурсів і виконання скриптів відповідно до заданої політики. `script-src 'self'` без дозволу inline блокує багато інжектованих inline-скриптів і сторонніх скриптів, але дозволений same-origin скрипт теж може бути небезпечним, зокрема якщо зловмисник може завантажити його на цей origin. Для nonce-політики генеруйте непередбачуваний nonce окремо для кожної відповіді та додавайте лише довіреним скриптам. `X-Content-Type-Options: nosniff` допомагає браузеру не інтерпретувати відповідь усупереч MIME-типу, зокрема для script і style. Вказуйте коректний Content-Type, ізолюйте недовірені завантаження та тестуйте політику; заголовки не замінюють санітизацію або авторизацію.",
            en: "CSP restricts resource sources and script execution according to the configured policy. `script-src 'self'` without inline permission blocks many injected inline and cross-origin scripts, but an allowed same-origin script can still be dangerous, especially if an attacker can upload it to that origin. For a nonce policy generate an unpredictable nonce per response and attach it only to trusted scripts. `X-Content-Type-Options: nosniff` helps prevent the browser from interpreting a response contrary to its MIME type, particularly for script and style loads. Set the correct Content-Type, isolate untrusted uploads, and test the policy; headers do not replace sanitization or authorization.",
          },
        ),
        codeFill(
          "ws-bs3",
          "Увімкнути захист від MIME sniffing для відповідей, зокрема script і style",
          "Enable MIME-sniffing protection for responses, including script and style loads",
          "http",
          "X-Content-Type-Options: ___",
          ["nosniff", "nosniff;"],
          false,
          why(
            "Встановлюйте також правильний Content-Type; цей заголовок не робить усі недовірені файли безпечними.",
            "Also set the correct Content-Type; this header does not make every untrusted file safe.",
          ),
        ),
        withOptionsEn(mcq(
          "ws-bs-csp-upload",
          "Політика дозволяє `script-src 'self'`, а користувач може розмістити виконуваний JS на тому самому origin. Який ризик лишається?",
          "The policy allows `script-src 'self'`, and a user can host executable JavaScript on that same origin. What risk remains?",
          [
            "Політика може дозволити завантажений скрипт; недовірені файли потрібно ізолювати й обробляти безпечно",
            "CSP автоматично перевіряє, що кожен same-origin файл довірений",
            "nosniff гарантує безпеку JavaScript із правильним MIME-типом",
            "Файли на тому самому origin не можуть бути скриптами",
          ],
          0,
          why("Дозволене походження не доводить довіру до кожного файлу на ньому; потрібна окрема політика для завантажень.", "An allowed origin does not establish trust in every file served from it; uploads need a separate policy."),
        ), ["The policy may allow the uploaded script; isolate and safely handle untrusted files", "CSP automatically verifies that every same-origin file is trusted", "nosniff guarantees safety for JavaScript with the correct MIME type", "Same-origin files cannot be scripts"]),
        withOptionsEn(mcq(
          "ws-sri-check",
          "Який механізм гарантує, що завантажений зі стороннього CDN скрипт не був підмінений або скомпрометований?",
          "Which mechanism ensures that a third-party CDN script has not been modified or compromised?",
          [
            "Subresource Integrity (SRI) з атрибутом integrity='sha384-...'",
            "Лише заголовок X-Frame-Options: DENY",
            "Параметр SameSite=Strict для cookies",
            "Протокол HTTP/2 без перевірки хешу",
          ],
          0,
          why(
            "SRI звіряє криптографічний хеш файлу з очікуваним у тегу <script integrity='...'>.",
            "Subresource Integrity compares the cryptographic hash of the fetched file with the expected value in the integrity attribute.",
          ),
        ), [
          "Subresource Integrity (SRI) with an integrity='sha384-...' attribute",
          "Only the X-Frame-Options: DENY header",
          "The SameSite=Strict cookie parameter",
          "HTTP/2 protocol without hash validation",
        ]),
      ], { baseXp: 25 },
    ),
    exam("ws-bs-exam", "Контрольна: браузерна безпека", "Checkpoint: Browser Security", 4, [
      withOptionsEn(mcq(
        "ws-bs-e1",
        "Що дає директива Content-Security-Policy `script-src 'self'` (без `'unsafe-inline'`)?",
        "What attack class is strongly mitigated by `Content-Security-Policy: script-src 'self'` without `'unsafe-inline'`?",
        [
          "Багато inline-скриптів і завантажень скриптів зі сторонніх origin; дозволений same-origin скрипт усе ще може бути небезпечним",
          "Атаки DDoS на UDP-порт 53",
          "Скидання паролів SQL-дампом",
          "Перегрів процесора сервера",
        ],
        0,
      ), ["It blocks many inline and cross-origin scripts, though an allowed same-origin script can still be dangerous", "DDoS attacks on UDP port 53", "Password resets through an SQL dump", "Server CPU overheating"]),
      withOptionsEn(mcq(
        "ws-bs-e2",
        "Для state-changing запитів (`POST`, `PATCH`, `DELETE`) з cookie-сесією який захист має діяти на сервері?",
        "What defense protects cookie-authenticated mutating routes (`POST`/`PATCH`/`DELETE`)?",
        [
          "CSRF-токен або сувора перевірка походження з визначеною політикою для відсутніх заголовків; SameSite як додатковий захист",
          "Довіра до будь-якого `Origin`, якщо є `User-Agent`",
          "Дозволити все через GET-запити",
          "Вимкнути перевірку авторизації",
        ],
        0,
      ), ["A CSRF token or strict origin validation with a defined missing-header policy, with SameSite as additional defense", "Trust any Origin if a User-Agent is present", "Allow all changes through GET requests", "Disable authorization checks"]),
    ]),
  ],
);

const depsConfigCapstone = unit(
  "ws_deps_config_capstone",
  "Секрети, залежності, логування та ForgeBoard M9",
  "Secrets, Supply Chain, Logging & ForgeBoard Security",
  [
    lesson(
      "ws-dc-secrets-logs",
      "Секрети в Git/логах, аудит залежностей (OWASP A03/A09/A10)",
      "Secrets Hygiene, Dependencies & Safe Error Logging",
      4, false, [
        concept(
          "ws-dc-ops-concept",
          "Безпечне реагування на витік та оновлення залежностей",
          "Respond safely to leaks and dependency risks",
          {
            uk: "Журналюйте подію, час і кореляційний ID, але не паролі, cookie, токени чи повне тіло запиту. Якщо ключ потрапив у Git, вважайте його скомпрометованим: відкличте або замініть у провайдера, перевірте використання та сповістіть відповідальних за процедурою інциденту. Новий коміт не видаляє стару історію; очищення історії й копій координують після стримування витоку. Аудит lockfile виявляє частину відомих вразливостей, але не гарантує безпеки пакета. `pnpm audit --prod` обмежує перевірку production-залежностями: dev-залежності теж можуть виконувати код у CI або під час збірки. Враховуйте їх у моделі загроз, перевіряйте походження, вплив і оновлення.",
            en: "Log the event, time, and correlation ID, but not passwords, cookies, tokens, or the entire request body. If a key enters Git, treat it as compromised: revoke or replace it with the provider, investigate usage, and notify responsible people under the incident procedure. A new commit does not erase old history; coordinate cleanup of history and copies after containment. A lockfile audit finds some known vulnerabilities but cannot guarantee a package is safe. `pnpm audit --prod` limits the audit to production dependencies: dev dependencies can also execute code in CI or builds. Include them in the threat model and review provenance, impact, and updates.",
          },
        ),
        withOptionsEn(mcq(
          "ws-dc1",
          "У структурований лог Express випадково серіалізують увесь об'єкт `req` разом із `headers.cookie` та `body.password`. Який ризик OWASP A09?",
          "An Express logger dumps full `req.headers` and `req.body` including cookies and passwords. Why is this a severe A09 violation?",
          [
            "Токени сесій та паролі осідають у plain-text логах моніторингу й відкривають захоплення акаунтів для кожного, хто читає логи",
            "JSON-логи не підтримують рядки довше 20 символів",
            "Пароль у лозі автоматично змінюється сам",
            "Це зупиняє збирач сміття V8",
          ],
          0,
          why(
            "Редактуйте/виключайте `password`, `authorization`, `cookie`, `token`, `secret` у логері й ніколи не віддавайте стектрейси клієнту в prod.",
            "Redact credentials, cookies, and tokens before writing logs, and never return stack traces in HTTP responses.",
          ),
        ), ["Session tokens and passwords persist in plaintext logs, exposing accounts to people who can read them", "JSON logs cannot contain strings longer than 20 characters", "A logged password changes automatically", "It stops the V8 garbage collector"]),
        withOptionsEn(mcq(
          "ws-dc2",
          "Ви знайшли закомічений API-ключ у старому коміті репозиторію, який уже запушили в команду. Достатньо лише видалити рядок новим комітом?",
          "An API key was committed and pushed yesterday. Is removing it in a new commit enough?",
          [
            "Ні: відкличте або замініть ключ у провайдера, оцініть використання та скоординуйте подальше очищення історії й копій",
            "Так, новий коміт стирає історію GitHub автоматично",
            "Достатньо додати ключ у `.gitignore`",
            "Ключі в `.env.example` не потребують уваги",
          ],
          0,
          why(
            "Першочергове відкликання обмежує використання ключа; переписування історії не видаляє незалежні клони чи копії.",
            "Revocation limits use of the key first; rewriting history does not remove independent clones or copies.",
          ),
        ), ["No: revoke or replace the key with the provider, investigate its use, and coordinate cleanup of history and copies", "Yes: a new commit automatically erases GitHub history", "Adding the key to .gitignore is enough", "Keys in .env.example never require attention"]),
        withOptionsEn(mcq(
          "ws-dc-dev-deps",
          "CI встановлює dev-залежності й запускає збірку. Чи достатньо лише `pnpm audit --prod` для оцінки відомих ризиків усіх пакетів, що виконуються в CI?",
          "CI installs dev dependencies and runs a build. Is `pnpm audit --prod` alone enough to assess known risks for every package executed in CI?",
          [
            "Ні: він обмежений production-залежностями; dev-залежності також потребують перевірки відповідно до моделі загроз",
            "Так: dev-залежності ніколи не виконують код",
            "Так: audit доводить відсутність шкідливих пакетів",
            "Ні: достатньо видалити файл lockfile",
          ],
          0,
          why("Dev-інструменти виконуються у збірці, а аудит охоплює лише відомі вразливості й заданий набір залежностей.", "Dev tools execute during builds, and an audit covers only known vulnerabilities in the selected dependency set."),
        ), ["No: it is restricted to production dependencies; assess dev dependencies against the threat model too", "Yes: dev dependencies never execute code", "Yes: an audit proves packages are not malicious", "No: deleting the lockfile is enough"]),
      ], { baseXp: 26 },
    ),
    lesson(
      "ws-forgeboard-security-lab",
      "Лаб: аудит та захист ForgeBoard (M9)",
      "Lab: Hardening & Security Audit of ForgeBoard (M9)",
      4, false, [
        concept(
          "ws-fb-security-method",
          "Відтворіть атаку, виправте захист, перевірте регресію",
          "Reproduce the attack, fix the defense, verify the regression",
          {
            uk: "Працюйте в локальній лабораторії з тестовими обліковими записами. Спершу відтворіть доступ до чужого ресурсу, небезпечне відображення нотатки та запит із чужого походження. Потім перевірте авторизацію кожної дії, контекстне відображення тексту й серверний CSRF-захист. Запустіть тести лабораторії повторно і перевірте також дозволені дії власника, щоб виправлення не закрило нормальний сценарій. Вбудоване завдання нижче перевіряє лише наявність фрагментів, а не виконання коду чи безпечність реалізації.",
            en: "Work in the local lab with test accounts. First reproduce access to another user's resource, unsafe note rendering, and a request from an untrusted origin. Then check authorization for each action, context-safe text rendering, and server-side CSRF protection. Rerun the lab tests and check the owner's allowed actions too, so the fix does not block normal use. The embedded exercise below checks only for code fragments; it does not execute the code or establish security.",
          },
          { keyPointsUk: ["Відтворіть загрозу на тестових даних", "Перевірте відмову й дозволений сценарій", "Фрагменти коду не замінюють поведінкові тести"], keyPointsEn: ["Reproduce the threat with test data", "Test both denial and the permitted path", "Code fragments do not replace behavioral tests"] },
        ),
        withOptionsEn(mcq(
          "ws-fb1",
          "У Milestone 9 ви усуваєте IDOR, XSS, відсутність CSRF-захисту й витік деталей помилок. Яка перевірка дасть корисні свідчення про виправлення?",
          "In Milestone 9 you harden ForgeBoard against IDOR, XSS output bugs, missing Origin/CSRF guards, and leaking 500 details. Which check provides useful evidence for the fix?",
          [
            "Поведінкові тести перевіряють відмову чужому користувачу, безпечне відображення тексту й відхилення чужого Origin, а також дозволені дії власника",
            "Лише наявність файлу `.gitignore`",
            "Вимкнення всіх HTTP-роутів",
            "Перейменування колонок в JSON на випадкові букви",
          ],
          0,
          why(
            "Тести дають свідчення для охоплених сценаріїв, але самі по собі не доводять відсутність усіх вразливостей.",
            "Tests provide evidence for the scenarios they cover; they do not prove the absence of every vulnerability.",
          ),
        ), ["Behavioral tests check denial to another user, safe text rendering, rejection of untrusted origins, and the owner's allowed actions", "Only the existence of .gitignore", "Disabling every HTTP route", "Renaming JSON columns to random letters"]),
        withOptionsEn(mcq(
          "ws-fb-regression",
          "Після виправлення API відмовляє чужому користувачу, але також блокує власника задачі. Як оцінити результат?",
          "After a fix, the API rejects another user but also blocks the task owner. How should the result be assessed?",
          [
            "Виправлення неповне: перевірте політику та відновіть дозволений сценарій власника",
            "Виправлення завершено, бо всі запити відхилені",
            "Дозвольте всім користувачам змінювати задачу",
            "Видаліть тест власника",
          ],
          0,
          why("Тестуйте як відмову недозволених дій, так і успіх дозволених відповідно до політики.", "Test both denial of unauthorized actions and success of authorized actions under the policy."),
        ), ["The fix is incomplete: check the policy and restore the owner's permitted flow", "The fix is complete because all requests are rejected", "Allow every user to modify the task", "Delete the owner test"]),
        codeProject(
          "ws-fb2",
          "Реалізуйте перевірку власника та екранування тексту для HTML. Вбудована перевірка шукає фрагменти коду й не доводить безпечність; M9 нижче містить поведінкові перевірки.",
          "Implement ownership verification and HTML text escaping. The in-app check searches code fragments and does not establish security; M9 below supplies behavioral checks.",
          [
            {
              id: "ts",
              name: "security-guards.ts",
              language: "typescript",
              starter: `export function assertTaskOwner(taskOwnerId: number, sessionUserId: number): void {\n  // TODO: reject an owner mismatch\n}\n\nexport function escapeHtmlText(raw: string): string {\n  // TODO: escape text for an HTML context\n  return raw;\n}\n`,
            },
          ],
          [
            { fileId: "ts", contains: ["taskOwnerId !== sessionUserId", "403", "&lt;", "&amp;"] },
          ],
          {
            hintUk: "Завантажте M9 нижче, щоб перевірити фікси проти реальних attack payloads.",
            hintEn: "Download M9 below to verify defenses against automated IDOR, XSS, CSRF, and validation attack suites.",
          },
        ),
      ], { baseXp: 45 },
    ),
    exam("ws-dc-exam", "Контрольна: безпечні конфіги та залежності", "Checkpoint: Supply Chain & Security Ops", 4, [
      withOptionsEn(mcq(
        "ws-dc-e1",
        "Що означає вимога A10 / error-handling resilience: не ковтати винятки і не залишати відкритим bypass?",
        "Why must security error handlers fail closed instead of catching errors and proceeding?",
        [
          "Будь-який збій перевірки прав, підпису або парсингу має повертати відмову (401/403/503), а не пропускати запит далі",
          "Помилки потрібно ігнорувати заради 100% uptime",
          "catch блок має автоматично робити користувача адміном",
          "Логувати стектрейс прямо в HTML клієнту",
        ],
        0,
      ), ["Failures in authorization, signature verification, or parsing must deny the request rather than let it proceed", "Ignore errors for 100% uptime", "A catch block should automatically make the user an administrator", "Log the stack trace directly in client HTML"]),
      codeFill(
        "ws-dc-e2",
        "Перевірити вразливості в lockfile залежностях pnpm",
        "Run dependency audit against lockfile",
        "bash",
        "pnpm ___ --prod",
        ["audit"],
        true,
      ),
    ]),
  ],
);

export const webSecurityContent: CourseContent = {
  slug: "web_security",
  titleUk: "Безпека вебдодатків",
  titleEn: "Secure Web Applications",
  descriptionUk:
    "OWASP Top 10:2025 на практиці: межі довіри, серверна валідація й XSS/SQLi, сесії SHA-256 + MFA, IDOR і авторизація, CSRF/CORS/CSP та аудит ForgeBoard.",
  descriptionEn:
    "OWASP Top 10:2025 in practice: trust boundaries, validation and XSS/SQLi defenses, hashed sessions and MFA, IDOR/authz, CSRF/CORS/CSP, and ForgeBoard security.",
  icon: "🛡️",
  color: "#DC2626",
  units: [
    trustBoundaries,
    validationOutput,
    sessionsAuthn,
    authorizationIdor,
    browserSecurity,
    depsConfigCapstone,
  ],
};
