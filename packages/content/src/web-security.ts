import type { CourseContent } from "./types.js";
import {
  codeFill,
  codeOrderAuto,
  codeProject,
  codeRead,
  exam,
  lesson,
  matchEx,
  mcq,
  unit,
  why,
} from "./builders.js";

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
        mcq(
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
        ),
        codeRead(
          "ws-tb2",
          "Знайдіть помилку fail-open у прапорцях або перевірці доступу: Чому обидва рядки є критичним антипатерном (OWASP A06 Insecure Design / A02)?",
          "Spot fail-open configuration trap: Why are both lines dangerous insecure defaults?",
          "ts",
          "const judgeMode = process.env.JUDGE_MODE || \"host\";\nif (env !== \"prod\" || req.headers[\"x-dev-bypass\"] === \"1\") next();",
          [
            "Fallback при помилковій або відсутній змінній вмикає привілейований/небезпечний режим замість fail-closed відмови",
            "Тому що `process.env` працює тільки на Windows",
            "Бо `||` повільніший за `&&`",
            "Заголовок `x-dev-bypass` не підтримується HTTP/2",
          ],
          0,
          why(
            "Безпечна типова поведінка — fail-closed (`off`/403), коли відсутній або невідомий параметр відхиляється.",
            "Security controls must default closed (`off`/reject) when configuration or proofs are absent.",
          ),
        ),
      ], { baseXp: 24 },
    ),
    lesson(
      "ws-tb-threat-flow",
      "Перевірка критичних потоків і мінімальні привілеї",
      "Least Privilege & Attack Surface Mapping",
      3, true, [
        matchEx(
          "ws-tb3",
          "Зіставте загрозу OWASP 2025 з точним рівнем захисту",
          "Match each security risk to the required control boundary",
          [
            { left: "Підміна ID іншого користувача в тілі запиту (`ownerId`)", right: "Отримувати `userId` лише із серверної сесії, ігнорувати client ownerId" },
            { left: "Витік стектрейсу та пароля БД у відповіді 500", right: "Повертати стабільний код `{ error: \"internal_error\" }`, деталі — у структурований лог без секретів" },
            { left: "Падіння перевірки прав при помилці зовнішнього сервісу", right: "Fail-closed відмова 403/503 замість пропуску далі" },
          ],
        ),
      ], { baseXp: 24 },
    ),
    exam("ws-tb-exam", "Контрольна: межі довіри", "Checkpoint: Trust Boundaries", 3, [
      mcq(
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
      ),
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
        codeRead(
          "ws-vo1",
          "Знайдіть вектор Stored XSS у відображенні нотаток задачі: Чому рендер `{task.notes}` у JSX безпечний, а `dangerouslySetInnerHTML` без строгого санітайзера — ні?",
          "Diagnose Stored XSS risk in HTML rendering: Why is JSX `{task.notes}` safe against XSS while `dangerouslySetInnerHTML` is vulnerable?",
          "tsx",
          "// Bad:\n<div dangerouslySetInnerHTML={{ __html: task.notes }} />\n// Safe:\n<p className=\"whitespace-pre-wrap\">{task.notes}</p>",
          [
            "React автоматично екранує текст у `{...}` як текстовий вузол (`<script>` стає текстом), а raw HTML виконує скрипт/onerror атрибути",
            "React видаляє всі символи пробілу в `{...}`",
            "dangerouslySetInnerHTML працює тільки в IE11",
            "XSS неможливий у тегах `<div>`",
          ],
          0,
          why(
            "Ніколи не вставляйте неперевірений HTML користувача в DOM; крім того перевіряйте URL посилань на allowlist `https:`/`http:` (заборона `javascript:`).",
            "Rely on context-aware text escaping by default, and allowlist `http:`/`https:` schemes for user-supplied links.",
          ),
        ),
        mcq(
          "ws-vo2",
          "Розробник додав перевірку `href={task.link}` у React-компонент. Яке значення `task.link` запустить виконання JS при кліку?",
          "A component renders `<a href={task.link}>Ref</a>`. Which user input executes script when clicked?",
          [
            "`javascript:alert(document.domain)`",
            "`https://example.com/docs?id=1`",
            "`/tasks/42`",
            "`#section-1`",
          ],
          0,
          why(
            "JSX НЕ блокує `javascript:` URL автоматично у `<a href>`; сервер і клієнт мають валідувати схему URL (`new URL(...)` -> `http:`/`https:`).",
            "JSX escapes text but does not block `javascript:` URIs in `<a href>`; always allowlist `http:`/`https:`.",
          ),
        ),
      ], { baseXp: 25 },
    ),
    lesson(
      "ws-vo-zod-strict",
      "Строга валідація схеми (Zod `.strict()` / типи) та санітизація тексту",
      "Strict Payload Validation & Mass Assignment Prevention",
      3, true, [
        codeRead(
          "ws-vo3",
          "Атака Mass Assignment через передачу всього `req.body` у `.set()`: Що зможе зробити зловмисник на вразливому рядку?",
          "Prevent mass-assignment bug with explicit allowlisted DTO: What can an attacker exploit in the first line?",
          "ts",
          "// Vulnerable:\nawait db.update(users).set(req.body).where(eq(users.id, userId));\n// Safe:\nconst dto = updateProfileSchema.parse(req.body);\nawait db.update(users).set({ name: dto.name }).where(eq(users.id, userId));",
          [
            "Передати JSON `{ \"role\": \"admin\", \"planTier\": \"pro\" }` і перезаписати привілейовані поля таблиці `users`",
            "Змінити версію Node.js",
            "Скинути TLS-сертифікат",
            "Примусити браузер вимкнути CSS",
          ],
          0,
          why(
            "Завжди розбирайте payload через сувору Zod-схему і передавайте в БД лише явно дозволені поля.",
            "Always parse untrusted JSON into strict schemas and pick explicit fields before persistence.",
          ),
        ),
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
      mcq(
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
      ),
      mcq(
        "ws-vo-e2",
        "Який метод є єдиним системним захистом проти SQL-ін'єкцій у запитах до PostgreSQL?",
        "Which mechanism fundamentally eliminates SQL injection?",
        [
          "Параметризовані запити (prepared/bind placeholders `$1, $2` або безпечний query builder на кшталт Drizzle)",
          "Блокування лише слова SELECT через RegExp",
          "Кодування у Base64 перед конкатенацією рядка SQL",
          "Зменшення довжини пароля БД",
        ],
        0,
      ),
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
        mcq(
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
            "High-entropy opaque tokens use SHA-256 in DB to prevent DB-leak hijacking, while `HttpOnly` keeps tokens unreachable from JS.",
          ),
        ),
        codeFill(
          "ws-sa2",
          "Заборонити доступ JavaScript (`document.cookie`) до сесійного cookie",
          "Flag protecting cookie from JavaScript access",
          "http",
          "Set-Cookie: session=abc; Path=/; ___; SameSite=Lax",
          ["HttpOnly"],
          true,
        ),
      ], { baseXp: 26 },
    ),
    lesson(
      "ws-sa-passwords-mfa",
      "Повільне хешування паролів, ротація сесії та MFA gating",
      "Slow Password Hashing, Session Rotation & MFA",
      4, false, [
        mcq(
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
        ),
      ], { baseXp: 26 },
    ),
    exam("ws-sa-exam", "Контрольна: сесії та автентифікація", "Checkpoint: Sessions & Authentication", 4, [
      mcq(
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
      ),
      mcq(
        "ws-sa-e2",
        "Що обов'язково зробити зі старим токеном при логіні або зміні пароля?",
        "What should happen to active sessions when rotating credentials or resetting a password?",
        [
          "Інвалідувати/відкликати старі сесії у БД і видати новий ідентифікатор сесії",
          "Залишити всі старі сесії безстроково активними",
          "Зберегти старий токен у URL query string",
          "Перезавантажити Redis без перевірки БД",
        ],
        0,
      ),
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
        codeRead(
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
            "Автентифікація (хто ти) не дорівнює авторизації (чи маєш ти право). Прив'язуйте умову власника `and(eq(tasks.id, id), eq(tasks.ownerId, userId))` прямо в запиті або перевіряйте 403.",
            "Authentication (`authMiddleware`) answers WHO you are; resource ownership checks answer WHAT you may access.",
          ),
        ),
        codeFill(
          "ws-az2",
          "Перевірка належності запису користувачу в SQL/Drizzle",
          "Scope lookup by both task id and session user ownerId",
          "ts",
          "and(eq(tasks.id, taskId), eq(tasks.___, req.user.id))",
          ["ownerId"],
          true,
        ),
      ], { baseXp: 26 },
    ),
    lesson(
      "ws-az-stepup",
      "Step-up автентифікація та захист адміністративних дій",
      "Step-Up Re-Authentication & Admin RBAC",
      4, false, [
        mcq(
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
        ),
      ], { baseXp: 26 },
    ),
    exam("ws-az-exam", "Контрольна: авторизація та IDOR", "Checkpoint: Authorization & IDOR", 4, [
      mcq(
        "ws-az-e1",
        "Користувач без токена отримує `401 unauthorized`, а залогінений користувач, що звертається до чужого ресурсу, — ___?",
        "Unauthenticated callers get `401 unauthorized`; an authenticated user accessing someone else's private record receives ___?",
        ["403 forbidden (або 404 за політикою приховування існування запису)", "200 OK", "301 Redirect", "502 Bad Gateway"],
        0,
      ),
      mcq(
        "ws-az-e2",
        "Який метод гарантує відсутність BOLA/IDOR при масових операціях `PATCH /tasks/bulk`?",
        "What prevents IDOR in bulk mutations like `PATCH /tasks/bulk`?",
        [
          "Фільтрувати всі передані ID умовою `ownerId = req.user.id` або транзакційно перевіряти членство на кожен об'єкт перед оновленням",
          "Довіряти списку ID з клієнта, якщо їх більше двох",
          "Перевіряти лише перший елемент масиву",
          "Вимкнути HTTPS локально",
        ],
        0,
      ),
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
        mcq(
          "ws-bs1",
          "Якщо API приймає cookie-автентифікацію, а адмін заходить на шкідливий сайт, форма `<form method=\"POST\" action=\"https://api.forgeboard.local/tasks/delete\">` надсилає кукі автоматично. Що реально зупиняє CSRF?",
          "Why doesn't disabling CORS alone stop cross-site `<form method=\"POST\">` CSRF attacks on cookie auth?",
          [
            "Браузер надсилає simple POST-запит ДО перевірки CORS; зупиняє перевірка `Origin`/`Referer` + `SameSite=Lax/Strict` або CSRF-токен",
            "HTML форми заборонені з 2020 року",
            "JSON-парсер сам блокує сторонні домени на рівні TCP",
            "React автоматично шифрує cookie",
          ],
          0,
          why(
            "CORS регулює, чи може скрипт прочитати відповідь у браузері, тоді як mutating request уже міг виконатися на сервері без строгого перевіреного `Origin`!",
            "CORS controls response reading, whereas cookie-carrying mutating requests still hit your server unless `Origin`/CSRF guards reject them.",
          ),
        ),
        codeRead(
          "ws-bs2",
          "Виявіть смертельно небезпечну комбінацію CORS: Яку помилку робить сервер, що динамічно відбиває будь-який заголовок `Origin` у `Access-Control-Allow-Origin` разом із `Allow-Credentials: true`?",
          "Spot fatal wildcard + credentials CORS bug: Why is blindly echoing request `Origin` with `Access-Control-Allow-Credentials: true` critical?",
          "http",
          "Access-Control-Allow-Origin: https://evil-mirror.example\nAccess-Control-Allow-Credentials: true",
          [
            "Будь-який сторонній сайт отримує право робити запити з cookie жертви й ЧИТАТИ приватні відповіді API!",
            "Помилка лише в тому, що HTTPS став повільнішим",
            "Це блокує запити з самого localhost",
            "Така комбінація не має жодних наслідків",
          ],
          0,
          why(
            "Завжди звіряйте `Origin` із суворим фіксованим allowlist доменів вашого фронтенду.",
            "Only echo origins strictly present in a server-side allowlist when credentials are enabled.",
          ),
        ),
      ], { baseXp: 26 },
    ),
    lesson(
      "ws-bs-csp-headers",
      "CSP, `X-Content-Type-Options: nosniff` і безпечні завантаження",
      "Content-Security-Policy & Hardening Headers",
      4, false, [
        codeFill(
          "ws-bs3",
          "Заборонити браузеру виконувати завантажений текст/файл як довільний скрипт (MIME sniffing)",
          "Disable browser MIME-type sniffing",
          "http",
          "X-Content-Type-Options: ___",
          ["nosniff"],
          true,
        ),
      ], { baseXp: 25 },
    ),
    exam("ws-bs-exam", "Контрольна: браузерна безпека", "Checkpoint: Browser Security", 4, [
      mcq(
        "ws-bs-e1",
        "Що дає директива Content-Security-Policy `script-src 'self'` (без `'unsafe-inline'`)?",
        "What attack class is strongly mitigated by `Content-Security-Policy: script-src 'self'` without `'unsafe-inline'`?",
        [
          "Виконання інжектованих inline `<script>` і сторонніх шкідливих JS-бандлів при XSS",
          "Атаки DDoS на UDP-порт 53",
          "Скидання паролів SQL-дампом",
          "Перегрів процесора сервера",
        ],
        0,
      ),
      mcq(
        "ws-bs-e2",
        "Для state-changing запитів (`POST`, `PATCH`, `DELETE`) з cookie-сесією який захист має діяти на сервері?",
        "What defense protects cookie-authenticated mutating routes (`POST`/`PATCH`/`DELETE`)?",
        [
          "Сувора перевірка `Origin` (allowlist) + `SameSite=Lax/Strict` (та CSRF-токен за потреби)",
          "Довіра до будь-якого `Origin`, якщо є `User-Agent`",
          "Дозволити все через GET-запити",
          "Вимкнути перевірку авторизації",
        ],
        0,
      ),
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
        mcq(
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
        ),
        mcq(
          "ws-dc2",
          "Ви знайшли закомічений API-ключ у старому коміті репозиторію, який уже запушили в команду. Достатньо лише видалити рядок новим комітом?",
          "An API key was committed and pushed yesterday. Is removing it in a new commit enough?",
          [
            "Ні! Старий коміт залишається в історії Git — ключ треба негайно відкликати/перевипустити (rotate) у провайдера та очистити історію",
            "Так, новий коміт стирає історію GitHub автоматично",
            "Достатньо додати ключ у `.gitignore`",
            "Ключі в `.env.example` не потребують уваги",
          ],
          0,
        ),
      ], { baseXp: 26 },
    ),
    lesson(
      "ws-forgeboard-security-lab",
      "Лаб: аудит та захист ForgeBoard (M9)",
      "Lab: Hardening & Security Audit of ForgeBoard (M9)",
      4, false, [
        mcq(
          "ws-fb1",
          "У Milestone 9 ви усуваєте навмисно закладені вразливості у ForgeBoard: IDOR між користувачами, XSS у нотатці задачі, відсутній CSRF/Origin guard і витік сирих винятків 500. Що перевіряє тест-набір M9?",
          "In Milestone 9 you harden ForgeBoard against IDOR, XSS output bugs, missing Origin/CSRF guards, and leaking 500 details. What proves your fix?",
          [
            "Поведінкові тести безпеки відтворюють спробу доступу чужим користувачем (403), шкідливий скрипт не виконується/екранується, а чужий Origin відхиляється",
            "Лише наявність файлу `.gitignore`",
            "Вимкнення всіх HTTP-роутів",
            "Перейменування колонок в JSON на випадкові букви",
          ],
          0,
        ),
        codeProject(
          "ws-fb2",
          "Виправте охоронну функцію ForgeBoard (перевірка власника + екранування/санітизація тексту); завантажте M9 нижче для повних тестів на вразливості.",
          "Implement safe ownership verification and HTML escaping for ForgeBoard; download Milestone 9 below to run real security exploit regression tests.",
          [
            {
              id: "ts",
              name: "security-guards.ts",
              language: "typescript",
              starter: `export function assertTaskOwner(taskOwnerId: number, sessionUserId: number): void {\n  if (taskOwnerId !== sessionUserId) {\n    const err = new Error("forbidden");\n    (err as Error & { status?: number }).status = 403;\n    throw err;\n  }\n}\n\nexport function escapeHtmlText(raw: string): string {\n  return raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");\n}\n`,
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
      mcq(
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
      ),
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
