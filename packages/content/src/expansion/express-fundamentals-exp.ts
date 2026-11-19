import type { CourseContent, LessonContent, UnitContent } from "../types.js";
import { expandCourse, sectionUnit, teachLesson } from "./factory.js";

export const newUnits: UnitContent[] = [
  sectionUnit(
    "cookies_sessions",
    "Cookies, прапорці й сесії",
    "Cookies, flags, and sessions",
    [
      {
        slug: "ef-cookie-flags",
        titleUk: "Прапорці cookie: HttpOnly, Secure, SameSite",
        titleEn: "Cookie flags: HttpOnly, Secure, SameSite",
        difficulty: 3,
        pointsUk: ["HttpOnly, Secure, SameSite — мінімальний набір для сесії", "SameSite=None лише для крос-сайту і лише з Secure", "Краще непрозорий session id, ніж довгий access token у cookie"],
        pointsEn: ["HttpOnly, Secure, and SameSite are the minimum for a session", "SameSite=None is only for cross-site and only with Secure", "Prefer an opaque session id over a long-lived access token in a cookie"],
        conceptUk: "Для сесійної cookie використовуйте HttpOnly (її не читає document.cookie), Secure для HTTPS і відповідну політику SameSite. Lax або Strict зменшують ризик CSRF, але не замінюють перевірку Origin чи CSRF-токен за моделлю загроз; XSS усе ще може надсилати запити від імені користувача. SameSite=None потрібен для окремих крос-сайтових сценаріїв і вимагає Secure. Max-Age та Expires задають строк; без них браузер вважає cookie сесійною, але може відновити її після перезапуску разом із сеансом. Не задавайте ширший Domain, ніж потрібно: Domain=example.com охоплює і піддомени. Краще використовувати непрозорий ідентифікатор серверної сесії з контрольованим строком дії.",
        conceptEn: "For a session cookie use HttpOnly (document.cookie cannot read it), Secure for HTTPS, and an appropriate SameSite policy. Lax or Strict reduces CSRF risk but does not replace Origin checks or a CSRF token under the threat model; XSS can still send requests as the user. SameSite=None is needed for some cross-site cases and requires Secure. Max-Age and Expires set lifetime; without them the browser treats the cookie as session-scoped, but session restoration may bring it back after restart. Avoid a broader Domain than needed: Domain=example.com covers subdomains too. Prefer an opaque server-side session identifier with a controlled lifetime.",
        code: "res.cookie('sid', sessionId, { httpOnly: true, secure: true, sameSite: 'lax', path: '/' });",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Навіщо HttpOnly на сесійній cookie?", promptEn: "Why set HttpOnly on a session cookie?", options: ["щоб скрипт сторінки не читав її через document.cookie", "щоб вона працювала лише в HTTP, не HTTPS", "щоб вимкнути SameSite", "щоб cookie стала постійною"], optionsEn: ["to prevent page scripts from reading it through document.cookie", "to make it work only over HTTP, not HTTPS", "to disable SameSite", "to make the cookie permanent"], correctIndex: 0, explanationUk: "HttpOnly зменшує ризик читання cookie через XSS, але не забороняє скрипту надсилати запити.", explanationEn: "HttpOnly reduces cookie-reading risk from XSS, but does not stop a script from sending requests." },
          { kind: "fill", promptUk: "Допишіть прапорець лише для HTTPS", promptEn: "Fill in the HTTPS-only flag", language: "javascript", code: "res.cookie('sid', id, { httpOnly: true, ___: true, sameSite: 'lax' });", accepted: ["secure"], caseSensitive: true, explanationUk: "Прапорець — secure.", explanationEn: "The flag is secure." },
          { kind: "mcq", promptUk: "Коли SameSite=None виправданий?", promptEn: "When is SameSite=None justified?", options: ["крос-сайтовий запит (вбудований віджет) і обов'язково Secure", "для будь-якої сесії на тому ж сайті", "щоб обійти HTTPS", "завжди замість Lax"], optionsEn: ["a cross-site request such as an embedded widget, with Secure", "every same-site session", "to bypass HTTPS", "always instead of Lax"], correctIndex: 0, explanationUk: "Доступність сторонніх cookie також залежить від політики браузера.", explanationEn: "Third-party cookie availability also depends on browser policy." }
        ],
        whyUk: "Які прапорці обов'язкові для сесійної cookie інтернет-магазину?",
        whyEn: "Which flags are required for a shop's session cookie?",
        ideas: [{ labelUk: "HttpOnly", labelEn: "HttpOnly", anyOf: ["httponly", "document.cookie", "xss"] }, { labelUk: "Secure і SameSite", labelEn: "Secure and SameSite", anyOf: ["secure", "samesite", "csrf", "lax"] }, { labelUk: "непрозорий id", labelEn: "an opaque id", anyOf: ["opaque", "session", "token", "ротац", "rotat"] }],
        sampleUk: "Сесійну cookie ставлять з HttpOnly, Secure і SameSite=Lax або Strict, а в значенні тримають непрозорий id сесії на сервері, не довгий access token.",
        sampleEn: "A session cookie is set with HttpOnly, Secure, and SameSite=Lax or Strict, and its value is an opaque server-side session id, not a long-lived access token.",
      },
      {
        slug: "ef-session-store",
        titleUk: "Сховище сесій: пам'ять проти Redis",
        titleEn: "A session store: memory versus Redis",
        difficulty: 3,
        pointsUk: ["MemoryStore лише для розробки", "Прод — зовнішнє сховище, TTL і ротація секретів", "Після логіну регенеруйте session id"],
        pointsEn: ["MemoryStore is only for development", "Production needs an external store, a TTL, and rotating secrets", "Regenerate the session id after login"],
        conceptUk: "express-session за замовчуванням використовує MemoryStore: сесії зникають після рестарту і не спільні між процесами; це сховище не призначене для production. У production застосовуйте придатне спільне сховище з контролем строку дії та секретом підпису cookie. rolling керує перевстановленням cookie, resave — повторним збереженням сесії, а оновлення TTL залежить також від реалізації store та touch. saveUninitialized: false уникає збереження нової незміненої сесії. Регенеруйте session id після логіну й обробляйте помилку callback-а, щоб зменшити ризик фіксації сесії.",
        conceptEn: "express-session uses MemoryStore by default: sessions disappear after restart and are not shared between processes; this store is not designed for production. In production use a suitable shared store with expiration and a cookie signing secret. rolling controls cookie reissuance, resave controls resaving a session, and TTL refresh also depends on the store and its touch implementation. saveUninitialized: false avoids saving a new unmodified session. Regenerate the session id after login and handle the callback error to reduce session fixation risk.",
        code: "req.session.regenerate((err) => {\n  if (err) return next(err);\n  req.session.userId = user.id;\n  res.redirect('/app');\n});",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому MemoryStore непридатний у кластері з кількома процесами?", promptEn: "Why is MemoryStore unfit in a cluster with several processes?", options: ["сесії не спільні між процесами і зникають після рестарту", "Redis заборонений з Express", "cookie тоді не підписується", "MemoryStore не вміє TTL навіть локально"], optionsEn: ["sessions are not shared across processes and disappear on restart", "Redis is forbidden with Express", "cookies cannot be signed", "MemoryStore cannot support TTL even locally"], correctIndex: 0, explanationUk: "Кожен процес має свою пам'ять.", explanationEn: "Each process has its own memory." },
          { kind: "fill", promptUk: "Допишіть метод regenerate та обробіть можливу помилку.", promptEn: "Complete the regenerate method and handle a possible error.", language: "javascript", code: "req.session.___(err => { if (err) return next(err); req.session.userId = user.id; });", accepted: ["regenerate"], caseSensitive: true, explanationUk: "Метод — regenerate.", explanationEn: "The method is regenerate." },
          { kind: "mcq", promptUk: "Навіщо saveUninitialized: false?", promptEn: "Why set saveUninitialized: false?", options: ["не зберігати нову незмінену сесію", "щоб вимкнути підпис cookie", "щоб MemoryStore став Redis", "щоб SameSite став None"], optionsEn: ["avoid saving a new unmodified session", "disable cookie signing", "turn MemoryStore into Redis", "set SameSite to None"], correctIndex: 0, explanationUk: "Менше порожніх ключів у сховищі.", explanationEn: "Fewer empty keys in the store." }
        ],
        whyUk: "Чому після логіну викликають session.regenerate?",
        whyEn: "Why do you call session.regenerate after login?",
        ideas: [{ labelUk: "фіксація сесії", labelEn: "session fixation", anyOf: ["фіксац", "fixation", "regenerate", "логін", "login"] }, { labelUk: "не MemoryStore у прод", labelEn: "not MemoryStore in production", anyOf: ["memory", "redis", "кластер", "cluster"] }, { labelUk: "ротація секретів", labelEn: "secret rotation", anyOf: ["секрет", "secret", "ротац", "rotat", "ttl"] }],
        sampleUk: "regenerate змінює session id після логіну, щоб атака фіксації сесії не успадкувала привілеї; у продакшені сесії живуть у зовнішньому сховищі з TTL, а не в MemoryStore.",
        sampleEn: "regenerate changes the session id after login so a fixation attack cannot inherit privileges; in production sessions live in an external store with a TTL, not in MemoryStore.",
      },
      {
        slug: "ef-signed-cookies",
        titleUk: "Підписані cookie і секрет",
        titleEn: "Signed cookies and the secret",
        difficulty: 2,
        pointsUk: ["Підпис виявляє підміну, але не ховає значення", "Ротація — масив секретів, новий першим", "Витоку секрету = інвалідація сесій"],
        pointsEn: ["A signature detects tampering but does not hide the value", "Rotation is an array of secrets, newest first", "A leaked secret means invalidating sessions"],
        conceptUk: "cookie-parser із секретом перевіряє підписані cookie та надає значення в req.signedCookies; невдалий підпис позначається false. Підпис виявляє підміну, але не шифрує значення. Не зберігайте в ньому паролі чи приватні дані. Для планової ротації масив секретів дозволяє перевіряти старі підписи, поки новий ключ використовується першим. При компрометації не залишайте скомпрометований ключ у списку довірених: ротувати ключі й відкликати потенційно скомпрометовані сесії слід за планом реагування.",
        conceptEn: "cookie-parser verifies signed cookies with a secret and exposes values through req.signedCookies; a failed signature is represented as false. A signature detects tampering but does not encrypt the value. Do not store passwords or private data in it. For planned rotation an array of secrets can verify old signatures while the new key is first. After compromise, do not retain the compromised key as trusted: rotate keys and revoke potentially compromised sessions under the incident response plan.",
        code: "app.use(cookieParser(process.env.COOKIE_SECRETS.split(',')));\n// req.signedCookies.theme",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чим підписана cookie відрізняється від зашифрованої?", promptEn: "How does a signed cookie differ from an encrypted one?", options: ["клієнт бачить значення, але не підробить його непомітно без секрету", "підпис завжди шифрує AES", "підписану cookie не відправити на HTTPS", "signedCookies ховає HttpOnly"], optionsEn: ["the client can see the value but cannot forge it undetected without the secret", "the signature always encrypts with AES", "signed cookies cannot be sent over HTTPS", "signedCookies hides HttpOnly"], correctIndex: 0, explanationUk: "HMAC — цілісність, не конфіденційність.", explanationEn: "HMAC is integrity, not confidentiality." },
          { kind: "fill", promptUk: "Допишіть читання підписаної cookie", promptEn: "Fill in reading a signed cookie", language: "javascript", code: "const theme = req.___.theme;", accepted: ["signedCookies"], caseSensitive: true, explanationUk: "Поле — signedCookies.", explanationEn: "The field is signedCookies." },
          { kind: "mcq", promptUk: "Як виконати планову ротацію некомпрометованого секрету без негайної відмови старим підписам?", promptEn: "How can an uncompromised secret be rotated without immediately rejecting old signatures?", options: ["передати масив: новий секрет першим, попередній тимчасово перевіряється", "достатньо змінити ім'я cookie", "ротація неможлива", "покласти секрет у репозиторій"], optionsEn: ["pass an array with the new secret first and temporarily verify the old one", "only change the cookie name", "rotation is impossible", "put the secret in the repository"], correctIndex: 0, explanationUk: "При компрометації старий ключ не можна продовжувати вважати довіреним.", explanationEn: "After compromise, the old key must not remain trusted." }
        ],
        whyUk: "Чому підписана cookie не місце для пароля чи повного токена доступу?",
        whyEn: "Why is a signed cookie the wrong place for a password or a full access token?",
        ideas: [{ labelUk: "підпис не шифрує", labelEn: "a signature does not encrypt", anyOf: ["шифр", "encrypt", "бачить", "see", "hmac"] }, { labelUk: "ротація секретів", labelEn: "secret rotation", anyOf: ["ротац", "rotat", "масив", "array", "секрет"] }, { labelUk: "витік і інвалідація", labelEn: "a leak and invalidation", anyOf: ["витік", "leak", "інвалід", "invalid"] }],
        sampleUk: "Підпис лише виявляє підміну, клієнт бачить значення, тому пароль і довгий токен туди не кладуть; секрети ротують масивом і при витоку інвалідують сесії.",
        sampleEn: "A signature only detects tampering, and the client can see the value, so you do not put a password or a long-lived token there; secrets rotate as an array, and a leak means invalidating sessions.",
      }
    ],
    "Контрольна: cookies і сесії",
    "Exam: cookies and sessions",
    [
      { promptUk: "HttpOnly на сесійній cookie потрібен, щоб…", promptEn: "HttpOnly on a session cookie is there so…", options: ["скрипт не читав її через document.cookie", "вона ходила лише відкритим HTTP", "вимкнути Secure", "зробити SameSite=None"], optionsEn: ["scripts cannot read it via document.cookie", "it is sent only over plain HTTP", "disable Secure", "set SameSite=None"], correctIndex: 0, explanationUk: "Менший витік при XSS.", explanationEn: "A smaller XSS leak." },
      { promptUk: "MemoryStore у продакшені…", promptEn: "MemoryStore in production is…", options: ["непридатний: немає спільності між процесами і рестартами", "обов'язковий для Redis", "швидший за будь-яке зовнішнє сховище завжди", "єдиний спосіб підписати cookie"], optionsEn: ["unsuitable: it is not shared across processes or restarts", "required for Redis", "always faster than any external store", "the only way to sign a cookie"], correctIndex: 0, explanationUk: "Беріть зовнішнє сховище.", explanationEn: "Use an external store." },
      { promptUk: "Підписана cookie…", promptEn: "A signed cookie…", options: ["захищає цілісність, але не ховає значення", "завжди зашифрована AES", "не потребує секрету", "замінює HttpOnly"], optionsEn: ["protects integrity but does not hide the value", "is always encrypted with AES", "requires no secret", "replaces HttpOnly"], correctIndex: 0, explanationUk: "HMAC не є шифром.", explanationEn: "HMAC is not encryption." },
      { promptUk: "Після логіну session id треба…", promptEn: "After login the session id should be…", options: ["регенерувати проти фіксації сесії", "надрукувати в URL", "зберегти в localStorage", "зробити SameSite=None завжди"], optionsEn: ["regenerated to reduce session fixation risk", "printed in the URL", "stored in localStorage", "always set to SameSite=None"], correctIndex: 0, explanationUk: "regenerate.", explanationEn: "regenerate." }
    ],
  ),
  sectionUnit(
    "uploads_limits",
    "Завантаження файлів і ліміти тіла",
    "File uploads and body limits",
    [
      {
        slug: "ef-multer-memory",
        titleUk: "Куди класти файл: пам'ять, диск, сховище",
        titleEn: "Where to put a file: memory, disk, or object storage",
        difficulty: 3,
        pointsUk: ["memoryStorage лише для малих файлів", "Не довіряйте оригінальному імені на диску", "Ліміти розміру й кількості обов'язкові"],
        pointsEn: ["memoryStorage is only for small files", "Do not trust the original filename on disk", "Size and count limits are mandatory"],
        conceptUk: "multer.memoryStorage буферизує весь файл у RAM; паралельні великі завантаження можуть вичерпати пам'ять. diskStorage пише до заданого каталогу: використовуйте унікальні серверні імена та прибирайте тимчасові файли і при успіху, і при помилці. Авторизуйте завантаження, обмежуйте розмір, кількість і конкурентність, зберігайте файли поза публічною текою за потреби. Ім'я та MIME від клієнта недовірені; перевірка сигнатури корисна, але сама не доводить безпечність вмісту — перевіряйте й декодуйте дозволений формат за політикою сервісу.",
        conceptEn: "multer.memoryStorage buffers the entire file in RAM; concurrent large uploads can exhaust memory. diskStorage writes to a configured directory: use unique server-generated names and clean temporary files on success and failure. Authorize uploads, limit size, count, and concurrency, and keep files outside the public directory where needed. Client filenames and MIME types are untrusted; signature checks help but do not by themselves prove safe content — validate and decode permitted formats under the service policy.",
        code: "const upload = multer({\n  storage: multer.diskStorage({ destination: '/tmp', filename: safeName }),\n  limits: { fileSize: 5_000_000, files: 1 },\n});",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому memoryStorage небезпечний для відео на 500 МБ?", promptEn: "Why is memoryStorage dangerous for a 500 MB video?", options: ["увесь файл буферизується в RAM, кілька завантажень можуть вичерпати пам'ять", "multer не вміє відео", "диск тоді обов'язково шифрується", "S3 забороняє стріми"], optionsEn: ["the whole file is buffered in RAM and concurrent uploads may exhaust memory", "multer cannot handle video", "the disk is necessarily encrypted", "S3 forbids streams"], correctIndex: 0, explanationUk: "Буферизація в пам'яті зростає з розміром файлу та кількістю запитів.", explanationEn: "Memory buffering grows with file size and request concurrency." },
          { kind: "fill", promptUk: "Допишіть ліміт розміру файлу", promptEn: "Fill in the file size limit", language: "javascript", code: "multer({ limits: { ___Size: 5_000_000 } })", accepted: ["file"], caseSensitive: true, explanationUk: "Поле — fileSize.", explanationEn: "The field is fileSize." },
          { kind: "mcq", promptUk: "Чому не зберігати файл як req.file.originalname у /uploads без перевірки?", promptEn: "Why should you not save a file as req.file.originalname under /uploads without checks?", options: ["ім'я клієнта може спричинити вихід за каталог або перезапис іншого файлу", "originalname завжди порожнє", "Express ігнорує дискові імена", "це ламає HTTPS"], optionsEn: ["a client-supplied name can cause path traversal or overwrite another file", "originalname is always empty", "Express ignores disk filenames", "it breaks HTTPS"], correctIndex: 0, explanationUk: "Ім'я з клієнта — недовірений ввід, навіть якщо конкретний парсер видаляє частини шляху.", explanationEn: "The client-supplied name is untrusted even if a particular parser strips path segments." }
        ],
        whyUk: "Як безпечно прийняти зображення профілю в Express?",
        whyEn: "How do you safely accept a profile image in Express?",
        ideas: [{ labelUk: "ліміт розміру", labelEn: "a size limit", anyOf: ["ліміт", "limit", "filesize", "пам'ят", "memory"] }, { labelUk: "не довіряти імені", labelEn: "do not trust the name", anyOf: ["ім'я", "filename", "traversal", "../"] }, { labelUk: "перевірка вмісту", labelEn: "content check", anyOf: ["mime", "magic", "сигнатур", "signature"] }],
        sampleUk: "Для зображення профілю авторизують запит, ставлять ліміт fileSize, генерують filename, перевіряють сигнатуру й декодують дозволений формат, а тимчасові файли прибирають навіть при помилці.",
        sampleEn: "For a profile image, authorize the request, set a fileSize limit, generate a filename, check the signature and decode an allowed format, and clean temporary files even on failure.",
      },
      {
        slug: "ef-size-limits",
        titleUk: "Ліміти JSON і urlencoded тіла",
        titleEn: "JSON and urlencoded body limits",
        difficulty: 3,
        pointsUk: ["Завжди ставте limit на json і urlencoded", "413 для перевищення, централізований обробник", "Ліміт проксі доповнює ліміт додатка"],
        pointsEn: ["Always set a limit on json and urlencoded", "413 on overflow, with a centralized handler", "A proxy limit complements the app limit"],
        conceptUk: "express.json та express.urlencoded мають стандартний ліміт тіла 100kb; перевірте документацію встановленої версії та задайте межу відповідно до маршруту. Надто високий ліміт і багато паралельних запитів можуть збільшити споживання пам'яті. Для urlencoded parameterLimit обмежує кількість параметрів, а depth у версіях, що підтримують цю опцію, — глибину вкладеності extended-парсера; це різні обмеження. Перевищення розміру зазвичай дає помилку 413, яку обробник має зберегти як клієнтську, а не перетворити на 500. Ліміти проксі й застосунку доповнюють один одного.",
        conceptEn: "express.json and express.urlencoded have a default body limit of 100kb; check the installed version's documentation and choose a bound for the route. An excessively high limit and many concurrent requests can increase memory use. For urlencoded, parameterLimit limits parameter count, while depth in versions supporting that option limits extended-parser nesting; these are distinct controls. Exceeding the size limit normally produces a 413 error, which error handling should preserve as a client error instead of turning it into 500. Proxy and application limits complement each other.",
        code: "app.use(express.json({ limit: '32kb' }));\napp.use(express.urlencoded({ limit: '32kb', extended: false, parameterLimit: 50 }));",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Що відбувається, якщо не задати limit у express.json?", promptEn: "What happens when express.json is configured without an explicit limit?", options: ["Використовується ліміт за замовчуванням; перевірте його для своєї версії", "Тіло завжди необмежене", "Ліміт завжди дорівнює одному байту", "Усі запити автоматично отримують 201"], optionsEn: ["A default limit applies; check it for your version", "The body is always unlimited", "The limit is always one byte", "All requests automatically receive 201"], correctIndex: 0, explanationUk: "Документація Express body-parser вказує типовий ліміт 100kb.", explanationEn: "Express body-parser documents a default limit of 100kb." },
          { kind: "fill", promptUk: "Допишіть код відповіді для завеликого тіла", promptEn: "Fill in the status code for a body that is too large", language: "javascript", code: "// entity.too.large → HTTP ___", accepted: ["413"], caseSensitive: true, explanationUk: "Код — 413 Payload Too Large.", explanationEn: "The code is 413 Payload Too Large." },
          { kind: "mcq", promptUk: "Чому ліміт застосунку корисний додатково до ліміту nginx?", promptEn: "Why is an application limit useful in addition to an nginx limit?", options: ["він захищає інші шляхи доступу й дозволяє межі для окремих маршрутів", "nginx не вміє лімітів", "Express ігнорує 413 від проксі", "ліміт nginx шифрує тіло"], optionsEn: ["it protects other ingress paths and permits route-specific bounds", "nginx cannot set limits", "Express ignores a proxy's 413", "the nginx limit encrypts the body"], correctIndex: 0, explanationUk: "Захист на кількох шарах.", explanationEn: "Defence in depth." }
        ],
        whyUk: "Навіщо limit у express.json, якщо вже є nginx client_max_body_size?",
        whyEn: "Why set a limit on express.json when nginx already has client_max_body_size?",
        ideas: [{ labelUk: "захист на двох шарах", labelEn: "defence in two layers", anyOf: ["nginx", "проксі", "proxy", "додат", "app", "ліміт"] }, { labelUk: "413", labelEn: "413", anyOf: ["413", "payload", "пам'ят", "memory"] }, { labelUk: "різні маршрути", labelEn: "different routes", anyOf: ["маршрут", "route", "parameterlimit", "extended"] }],
        sampleUk: "Ліміт у express.json захищає сам процес навіть якщо запит обійшов проксі, відповідає 413 і може бути вужчим на окремих маршрутах; ліміт nginx його доповнює, а не замінює.",
        sampleEn: "A limit on express.json protects the process itself even if a request bypasses the proxy, returns 413, and can be tighter on selected routes; the nginx limit complements it, it does not replace it.",
      },
      {
        slug: "ef-content-type",
        titleUk: "Перевірка Content-Type і відмова зайвого",
        titleEn: "Checking Content-Type and rejecting the rest",
        difficulty: 2,
        pointsUk: ["Парсер прив'язаний до Content-Type", "Невідомий тип — 415", "Не довіряйте лише розширенню URL"],
        pointsEn: ["A parser is bound to Content-Type", "An unknown type is 415", "Do not trust only the URL extension"],
        conceptUk: "Парсер обробляє лише відповідні Content-Type; пропуск парсера сам по собі не надсилає 415. Для маршруту, який приймає лише JSON, явно перевірте тип, а після парсингу — обов'язкове тіло та схему. req.is може повернути null, коли тіло відсутнє: визначте в контракті, як відрізняти порожній запит від непідтримуваного типу. Заголовок і розширення URL контролює клієнт; жодне з них не доводить, що вміст валідний або безпечний. Перевірки типу не повинні ненавмисно блокувати інші маршрути, наприклад multipart-завантаження.",
        conceptEn: "A parser handles only matching Content-Type values; skipping it does not itself send 415. For a route accepting only JSON, explicitly check the type, then validate the required body and schema after parsing. req.is may return null when no body is present: define in the contract how empty input differs from unsupported media. Clients control both the header and URL extension; neither proves content is valid or safe. Type checks must not unintentionally block other routes, such as multipart uploads.",
        code: "app.post('/api/items', (req, res, next) => {\n  if (!req.is('application/json')) return res.sendStatus(415);\n  next();\n}, express.json({ limit: '16kb' }), handler);",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "За контрактом маршрут приймає лише JSON. Який статус для тіла text/plain?", promptEn: "The route contract accepts only JSON. What status is appropriate for a text/plain body?", options: ["415 Unsupported Media Type", "200 з порожнім об'єктом завжди", "500", "301"], optionsEn: ["415 Unsupported Media Type", "Always 200 with an empty object", "500", "301"], correctIndex: 0, explanationUk: "Тип не підтримується цим маршрутом; перевірку треба реалізувати явно.", explanationEn: "The route does not support the type; the check must be implemented explicitly." },
          { kind: "fill", promptUk: "Допишіть опцію дозволеного типу JSON-парсера", promptEn: "Fill in the allowed-type option of the JSON parser", language: "javascript", code: "express.json({ ___: 'application/json', limit: '16kb' })", accepted: ["type"], caseSensitive: true, explanationUk: "Опція — type.", explanationEn: "The option is type." },
          { kind: "mcq", promptUk: "Чому не достатньо перевірити, що URL закінчується на .json?", promptEn: "Why is it not enough to check that the URL ends in .json?", options: ["URL не підтверджує тип чи валідність тіла запиту", ".json автоматично парсить будь-яке тіло", "Express ігнорує Content-Type", "розширення шифрує тіло"], optionsEn: ["the URL does not establish the request body's type or validity", ".json automatically parses any body", "Express ignores Content-Type", "the extension encrypts the body"], correctIndex: 0, explanationUk: "Заголовок теж недовірений: після перевірки типу розберіть і провалідуйте вміст.", explanationEn: "The header is also untrusted: after checking type, parse and validate the content." }
        ],
        whyUk: "Як відповісти на запит із неочікуваним Content-Type?",
        whyEn: "How should you respond to a request with an unexpected Content-Type?",
        ideas: [{ labelUk: "415", labelEn: "415", anyOf: ["415", "unsupported", "media", "тип"] }, { labelUk: "обмежити type парсера", labelEn: "restrict the parser type", anyOf: ["type", "application/json", "парсер", "parser"] }, { labelUk: "не розширення URL", labelEn: "not the URL extension", anyOf: ["url", "розширен", "extension", "заголов", "header"] }],
        sampleUk: "Неочікуваний Content-Type відхиляють з 415, парсер обмежують опцією type, а розширення URL не є джерелом правди про тіло.",
        sampleEn: "An unexpected Content-Type is rejected with 415, the parser is restricted with the type option, and the URL extension is not the source of truth about the body.",
      }
    ],
    "Контрольна: завантаження і ліміти",
    "Exam: uploads and limits",
    [
      { promptUk: "memoryStorage для великого відео…", promptEn: "memoryStorage for a large video is…", options: ["ризикований, бо файл цілком у RAM", "обов'язковий", "швидший за S3 без недоліків", "ігнорує limits"], optionsEn: ["risky because the whole file is buffered in RAM", "mandatory", "faster than S3 with no drawbacks", "ignores limits"], correctIndex: 0, explanationUk: "Обмежуйте завантаження та розгляньте диск або об'єктне сховище.", explanationEn: "Bound uploads and consider disk or object storage." },
      { promptUk: "Перевищення limit у express.json має дати…", promptEn: "Exceeding the express.json limit should yield…", options: ["413", "200", "302", "204"], optionsEn: ["413", "200", "302", "204"], correctIndex: 0, explanationUk: "Payload Too Large.", explanationEn: "Payload Too Large." },
      { promptUk: "originalname з клієнта…", promptEn: "A client originalname is…", options: ["недовірений ввід: можливі небезпечний шлях або перезапис", "завжди безпечне ім'я файлу", "ігнорується multer", "шифрується само"], optionsEn: ["untrusted input: unsafe paths or overwrites are possible", "always a safe filename", "ignored by multer", "automatically encrypted"], correctIndex: 0, explanationUk: "Генеруйте своє ім'я.", explanationEn: "Generate your own name." },
      { promptUk: "Маршрут приймає лише JSON, але тіло має непідтримуваний Content-Type. Який статус доречний?", promptEn: "A route accepts only JSON but receives an unsupported Content-Type. Which status is appropriate?", options: ["415", "201", "401 завжди", "ідентичний 413"], optionsEn: ["415", "201", "always 401", "identical to 413"], correctIndex: 0, explanationUk: "Unsupported Media Type; перевірку реалізують явно.", explanationEn: "Unsupported Media Type; the check is explicit." }
    ],
  ),
  sectionUnit(
    "security_headers",
    "Заголовки безпеки, CORS і ліміт частоти",
    "Security headers, CORS, and rate limits",
    [
      {
        slug: "ef-helmet-csp",
        titleUk: "helmet і Content-Security-Policy",
        titleEn: "helmet and Content-Security-Policy",
        difficulty: 3,
        pointsUk: ["Helmet задає заголовки; CSP доповнює захист від XSS", "Report-Only спочатку, потім enforce", "Уникайте дозволу довільних inline-скриптів"],
        pointsEn: ["Helmet sets headers; CSP supplements XSS defenses", "Report-Only first, then enforce", "Avoid permitting arbitrary inline scripts"],
        conceptUk: "Helmet налаштовує захисні HTTP-заголовки, зокрема CSP. Директива default-src є запасною для відповідних типів ресурсів; окрема script-src може її перевизначити. Дозвіл довільних inline-скриптів через unsafe-inline послаблює захист, хоча взаємодія з nonce і хешами залежить від політики та браузера. Почніть із Report-Only зі збором звітів, перевірте реальні ресурси й увімкніть enforce. Для nonce потрібне непередбачуване нове значення на кожну відповідь, однакове в заголовку й дозволених тегах. CSP і Helmet доповнюють контекстне екранування та перевірку даних, але не замінюють їх.",
        conceptEn: "Helmet configures security HTTP headers, including CSP. default-src is a fallback for relevant resource types; a separate script-src can override it. Allowing arbitrary inline scripts with unsafe-inline weakens protection, although interaction with nonces and hashes depends on the policy and browser. Start with Report-Only and reporting, inspect actual resources, then enforce. A nonce must be unpredictable and fresh for each response, with the same value in the header and allowed tags. CSP and Helmet supplement contextual escaping and validation; they do not replace them.",
        code: "app.use(helmet({\n  contentSecurityPolicy: { directives: { defaultSrc: [\"'self'\"], scriptSrc: [\"'self'\"] } },\n}));",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "У політиці без nonce чи хешів що дозволяє unsafe-inline у script-src?", promptEn: "In a policy without nonces or hashes, what does unsafe-inline in script-src allow?", options: ["Виконання inline-скриптів, зокрема потенційно вставлених атакою", "Браузер ігнорує весь CSP", "Helmet вимикається", "HSTS перестає працювати"], optionsEn: ["Inline scripts can execute, including potentially injected scripts", "The browser ignores all CSP", "Helmet is disabled", "HSTS stops working"], correctIndex: 0, explanationUk: "Дозвіл inline-скриптів послаблює один із захистів від ін'єкцій.", explanationEn: "Allowing inline scripts weakens one defense against injection." },
          { kind: "fill", promptUk: "Допишіть режим спостереження CSP", promptEn: "Fill in the CSP observation mode", language: "javascript", code: "Content-Security-Policy-___-Only", accepted: ["Report"], caseSensitive: true, explanationUk: "Режим — Report-Only.", explanationEn: "The mode is Report-Only." },
          { kind: "mcq", promptUk: "Чи достатньо helmet замість екранування HTML?", promptEn: "Is helmet enough to replace HTML escaping?", options: ["ні, заголовки доповнюють екранування і валідацію, не замінюють", "так, CSP робить екранування зайвим", "так, якщо є HSTS", "helmet сам екранує res.send"], optionsEn: ["no, headers complement escaping and validation rather than replacing them", "yes, CSP makes escaping unnecessary", "yes, if HSTS is enabled", "helmet escapes res.send automatically"], correctIndex: 0, explanationUk: "Захист у глибину.", explanationEn: "Defence in depth." }
        ],
        whyUk: "Як упровадити CSP у вже наявний Express-сайт без простою?",
        whyEn: "How do you roll out CSP on an existing Express site without an outage?",
        ideas: [{ labelUk: "спочатку Report-Only", labelEn: "Report-Only first", anyOf: ["report-only", "звіт", "report", "csp"] }, { labelUk: "nonce, не unsafe-inline", labelEn: "a nonce, not unsafe-inline", anyOf: ["nonce", "unsafe-inline", "xss", "хеш", "hash"] }, { labelUk: "узгодити CDN", labelEn: "align the CDN", anyOf: ["cdn", "font", "websocket", "helmet"] }],
        sampleUk: "CSP спочатку вмикають як Report-Only, збирають порушення, потім enforce з nonce замість unsafe-inline, узгодивши CDN і шрифти; helmet доповнює екранування, а не замінює його.",
        sampleEn: "Turn CSP on as Report-Only first, collect violations, then enforce with a nonce instead of unsafe-inline, aligning the CDN and fonts; helmet complements escaping, it does not replace it.",
      },
      {
        slug: "ef-cors-reflect",
        titleUk: "CORS: не віддзеркалюйте Origin сліпо",
        titleEn: "CORS: do not blindly reflect Origin",
        difficulty: 3,
        pointsUk: ["З credentials — лише білий список Origin, не * і не віддзеркалення всього", "Preflight під тими самими правилами", "CORS не захищає від curl і серверних запитів"],
        pointsEn: ["With credentials, only an Origin whitelist — not * and not reflecting everything", "Preflight follows the same rules", "CORS does not protect against curl or server-side requests"],
        conceptUk: "Для браузерних запитів із credentials відповідь Access-Control-Allow-Origin: * не дозволяє читання; задайте точний список довірених origin і перевіряйте preflight. cors origin: true віддзеркалює довільний Origin і разом із credentials може дозволити чужій сторінці читати відповідь, якщо cookie доступні за політикою браузера. Коли відповідь залежить від Origin, кеш має враховувати Vary: Origin. CORS не є авторизацією або самостійним захистом від CSRF: деякі запити можуть бути відправлені без дозволу на читання відповіді, а curl не обмежений браузерною політикою.",
        conceptEn: "For credentialed browser requests Access-Control-Allow-Origin: * does not permit reading the response; configure an exact allowlist of trusted origins and handle preflight consistently. cors origin: true reflects arbitrary origins and with credentials can let a foreign page read a response when cookies are available under browser policy. When a response varies by Origin, caches must account for Vary: Origin. CORS is neither authorization nor a standalone CSRF defense: some requests can be sent without permission to read the response, and curl is not restricted by browser policy.",
        code: "app.use(cors({ origin: ['https://app.example.com'], credentials: true }));",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому origin: true із credentials може бути небезпечним для cookie API?", promptEn: "Why can origin: true with credentials be dangerous for a cookie API?", options: ["Він віддзеркалює довільний Origin і може дозволити сторонньому сайту читати відповіді", "Він вимикає HTTPS", "Він забороняє OPTIONS", "Він замінює SameSite"], optionsEn: ["It reflects arbitrary origins and can allow another site to read responses", "It disables HTTPS", "It forbids OPTIONS", "It replaces SameSite"], correctIndex: 0, explanationUk: "Ризик залежить також від доступності cookie в браузері.", explanationEn: "The risk also depends on cookie availability in the browser." },
          { kind: "fill", promptUk: "Допишіть заборонену комбінацію", promptEn: "Fill in the forbidden combination", language: "javascript", code: "Access-Control-Allow-Origin: *  +  Access-Control-Allow-Credentials: ___", accepted: ["true"], caseSensitive: true, explanationUk: "Зірочка і credentials несумісні.", explanationEn: "A star and credentials are incompatible." },
          { kind: "mcq", promptUk: "Чи зупинить CORS зловмисника з curl і вкраденим токеном?", promptEn: "Will CORS stop an attacker with curl and a stolen token?", options: ["ні, CORS визначає правила браузера для міжджерельних відповідей", "так, сервер відхилить будь-який небраузерний запит", "так, якщо є helmet", "лише коли Origin порожній"], optionsEn: ["no, CORS sets browser rules for cross-origin responses", "yes, the server rejects all non-browser requests", "yes, when helmet is enabled", "only if Origin is empty"], correctIndex: 0, explanationUk: "Авторизація перевіряється окремо.", explanationEn: "Authorization is checked separately." }
        ],
        whyUk: "Як налаштувати CORS для API з сесійною cookie?",
        whyEn: "How should you configure CORS for an API with a session cookie?",
        ideas: [{ labelUk: "білий список", labelEn: "a whitelist", anyOf: ["біл", "whitelist", "origin", "віддзерк", "reflect"] }, { labelUk: "не зірочка з credentials", labelEn: "no star with credentials", anyOf: ["credentials", "*", "зіроч", "star"] }, { labelUk: "не заміна авторизації", labelEn: "not a substitute for authorization", anyOf: ["curl", "авториз", "authoriz", "браузер", "browser"] }],
        sampleUk: "Для API з cookie ставлять білий список Origin і credentials, ніколи не віддзеркалюють будь-який Origin і не комбінують * з credentials; CORS не замінює перевірку авторизації.",
        sampleEn: "For a cookie API you set an Origin whitelist and credentials, you never reflect arbitrary Origins, and you never combine * with credentials; CORS does not replace an authorization check.",
      },
      {
        slug: "ef-rate-limit",
        titleUk: "Ліміт частоти й ключ клієнта",
        titleEn: "Rate limiting and the client key",
        difficulty: 3,
        pointsUk: ["Ключ — IP обережно за проксі, плюс ім'я на логіні", "429 і Retry-After; сховище — Redis у кластері", "Не лімітуйте health-перевірку тим самим лічильником"],
        pointsEn: ["The key is an IP, carefully behind a proxy, plus the name on login", "429 and Retry-After; the store is Redis in a cluster", "Do not limit the health check with the same counter"],
        conceptUk: "Обмеження частоти допомагає стримувати перебір логінів і навантаження. Налаштуйте trust proxy за реальною топологією та переконайтеся, що довірений проксі перезаписує forwarding-заголовки; без цього IP може бути адресою проксі або підробленим значенням. NAT і спільні адреси також об'єднують користувачів. Для логіну застосовуйте незалежні обмеження за IP і за нормалізованим обліковим записом, продумуючи захист від навмисного блокування чужого акаунта та витоку його існування. Для кількох процесів потрібне придатне спільне сховище лічильників. 429 може містити Retry-After; health endpoint має окрему політику.",
        conceptEn: "Rate limits help constrain login guessing and load. Configure trust proxy for the actual topology and ensure a trusted proxy overwrites forwarding headers; otherwise the IP may be the proxy address or a spoofed value. NAT and shared addresses also group users. For login, apply independent IP and normalized-account limits while considering deliberate account lockout and account enumeration. Multiple processes need an appropriate shared counter store. A 429 can include Retry-After; the health endpoint needs its own policy.",
        code: "// Configure trusted proxies and shared stores for the deployment.\napp.post('/login', ipLimiter, accountLimiter, loginHandler);",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Що може статись, якщо trust proxy не відповідає реальній топології?", promptEn: "What can happen if trust proxy does not match the actual topology?", options: ["Ключем може стати IP проксі або підроблена адреса", "Ліміт назавжди вимкнеться", "Статус 429 заборонено", "Redis не підтримує IP"], optionsEn: ["The key can become the proxy IP or a spoofed address", "Rate limiting is disabled forever", "Status 429 is forbidden", "Redis cannot support IPs"], correctIndex: 0, explanationUk: "Налаштовуйте довірені проксі та перевіряйте перезапис заголовків.", explanationEn: "Configure trusted proxies and verify forwarding headers are overwritten." },
          { kind: "fill", promptUk: "Допишіть код «забагато запитів»", promptEn: "Fill in the 'too many requests' status", language: "javascript", code: "res.status(___).set('Retry-After', '60');", accepted: ["429"], caseSensitive: true, explanationUk: "Код — 429.", explanationEn: "The code is 429." },
          { kind: "mcq", promptUk: "Навіщо окремий ліміт за акаунтом на маршруті логіну поряд із лімітом за IP?", promptEn: "Why use a separate account limit alongside an IP limit on the login route?", options: ["Щоб стримувати спроби проти одного акаунта з багатьох адрес", "Email не можна хешувати", "IP більше не потрібно враховувати", "429 автоматично стає 401"], optionsEn: ["To constrain attempts against one account from many addresses", "Email cannot be hashed", "The IP no longer needs consideration", "429 automatically becomes 401"], correctIndex: 0, explanationUk: "Врахуйте ризик навмисного блокування акаунта й витоку його існування.", explanationEn: "Consider deliberate account lockout and account-enumeration risks." }
        ],
        whyUk: "Як лімітувати логін у кластері Express за проксі?",
        whyEn: "How do you rate-limit login in an Express cluster behind a proxy?",
        ideas: [{ labelUk: "trust proxy і правильний IP", labelEn: "trust proxy and the correct IP", anyOf: ["trust", "proxy", "forwarded", "ip"] }, { labelUk: "ключ облікового запису", labelEn: "an account key", anyOf: ["email", "логін", "login", "акаунт", "account"] }, { labelUk: "Redis і 429", labelEn: "Redis and 429", anyOf: ["redis", "429", "retry-after", "health"] }],
        sampleUk: "Довірені проксі налаштовують за реальною топологією й перевіряють IP, для логіну окремо обмежують акаунт, зберігають лічильники в Redis і відповідають 429 з урахуванням ризику блокування.",
        sampleEn: "Configure trusted proxies for the actual topology and verify the IP, separately limit the login account, keep counters in Redis, and return 429 while considering lockout risk.",
      }
    ],
    "Контрольна: заголовки й ліміти",
    "Exam: headers and limits",
    [
      { promptUk: "Що може дозволити unsafe-inline у script-src без nonce або хешів?", promptEn: "What can unsafe-inline in script-src allow without nonces or hashes?", options: ["Виконання довільних inline-скриптів", "Лише увімкнення HSTS", "Автоматичну авторизацію", "Блокування всіх скриптів"], optionsEn: ["Execution of arbitrary inline scripts", "Only enabling HSTS", "Automatic authorization", "Blocking every script"], correctIndex: 0, explanationUk: "За потреби використовуйте правильно налаштований nonce або хеш.", explanationEn: "Where needed, use a correctly configured nonce or hash." },
      { promptUk: "Віддзеркалення будь-якого Origin з credentials…", promptEn: "Reflecting any Origin with credentials is…", options: ["може дозволити чужому сайту читати відповідь", "завжди безпечне в production", "єдиний спосіб cookie", "заборонене лише в dev"], optionsEn: ["can let another site read the response", "is always safe in production", "is the only way to use cookies", "is forbidden only in development"], correctIndex: 0, explanationUk: "Дозволяйте лише довірені origin.", explanationEn: "Allow only trusted origins." },
      { promptUk: "Який статус означає забагато запитів на логін?", promptEn: "Which status means too many login requests?", options: ["429", "200", "301", "204"], optionsEn: ["429", "200", "301", "204"], correctIndex: 0, explanationUk: "429 може супроводжувати Retry-After.", explanationEn: "429 can include Retry-After." },
      { promptUk: "CORS зупиняє curl із токеном?", promptEn: "Does CORS stop curl with a token?", options: ["ні, це браузерна політика", "так, завжди", "так, разом із helmet обов'язково", "лише для OPTIONS"], optionsEn: ["no, it is a browser policy", "yes, always", "yes, whenever helmet is enabled", "only for OPTIONS"], correctIndex: 0, explanationUk: "Авторизація окремо.", explanationEn: "Authorization is separate." }
    ],
  ),
  sectionUnit(
    "testing_express",
    "Тести Express: додаток, маршрути, проміжне ПЗ",
    "Testing Express: the app, routes, and middleware",
    [
      {
        slug: "ef-app-export",
        titleUk: "Експорт app без автоматичного listen",
        titleEn: "Exporting the app without an automatic listen",
        difficulty: 2,
        pointsUk: ["createApp створює app без listen під час імпорту", "Запуск сервера — у точці входу", "Supertest може сам прив'язати тимчасовий порт"],
        pointsEn: ["createApp creates app without listen on import", "Server startup belongs in the entry point", "Supertest can bind an ephemeral port itself"],
        conceptUk: "Збирайте застосунок у createApp() без побічного listen при імпорті; запуск production-сервера залиште точці входу. Передавайте залежності, наприклад репозиторій, щоб тести могли використовувати контрольовану реалізацію. Supertest приймає app або server: якщо сервер не слухає, бібліотека прив'язує його до тимчасового порту. Тесту не потрібно вручну обирати фіксований порт, але це не означає відсутності мережевого сокета. Закривайте сервери й ресурси, які запустили самостійно.",
        conceptEn: "Build the application in createApp() without a listen side effect on import; leave production server startup to the entry point. Inject dependencies such as a repository so tests can use a controlled implementation. Supertest accepts an app or server: if it is not listening, the library binds it to an ephemeral port. The test need not choose a fixed port manually, but this does not mean no network socket is used. Close servers and resources that you start yourself.",
        code: "import express from 'express';\nexport function createApp() {\n  const app = express();\n  app.get('/health', (_req, res) => res.send('ok'));\n  return app;\n}",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому безумовний listen під час імпорту модуля може заважати тестам?", promptEn: "Why can an unconditional listen during module import interfere with tests?", options: ["Імпорт займає порт і може залишити відкритий сервер", "Express не реєструє маршрути", "Supertest завжди вимагає зайнятий порт", "listen вимикає middleware"], optionsEn: ["Importing binds a port and can leave a server open", "Express does not register routes", "Supertest always requires an occupied port", "listen disables middleware"], correctIndex: 0, explanationUk: "Це побічний ефект імпорту, а не проблема самого розташування app.use.", explanationEn: "The issue is the import side effect, not the location of app.use itself." },
          { kind: "fill", promptUk: "Допишіть фабрику без слухання порту", promptEn: "Fill in a factory that does not listen", language: "javascript", code: "export function create___() { const app = express(); /* routes */ return app; }", accepted: ["App"], caseSensitive: true, explanationUk: "Фабрика — createApp.", explanationEn: "The factory is createApp." },
          { kind: "mcq", promptUk: "Що робить Supertest із app, яка ще не слухає порт?", promptEn: "What does Supertest do with an app that is not already listening?", options: ["Прив'язує сервер до тимчасового порту для запиту", "Вимагає вручну відкрити порт 80", "Завжди обходиться без мережевого сокета", "Працює лише для GET"], optionsEn: ["Binds the server to an ephemeral port for the request", "Requires manually opening port 80", "Always avoids a network socket", "Works only for GET"], correctIndex: 0, explanationUk: "Фіксований порт у тесті не потрібен, але сокет використовується.", explanationEn: "The test needs no fixed port, but a socket is used." }
        ],
        whyUk: "Як структурувати Express-додаток, щоб його було легко тестувати?",
        whyEn: "How should you structure an Express app so it is easy to test?",
        ideas: [{ labelUk: "фабрика без listen", labelEn: "a factory without listen", anyOf: ["createapp", "listen", "імпорт", "import", "порт", "port"] }, { labelUk: "залежності ззовні", labelEn: "dependencies from outside", anyOf: ["конфіг", "config", "stub", "заглуш"] }, { labelUk: "Supertest напряму", labelEn: "Supertest directly", anyOf: ["supertest", "request", "app"] }],
        sampleUk: "Збирайте app у фабриці без listen при імпорті, передавайте конфіг і залежності ззовні; Supertest приймає app і сам використовує тимчасовий порт замість фіксованого.",
        sampleEn: "Build app in a factory without listen on import and inject config and dependencies; Supertest accepts the app and uses an ephemeral port instead of a fixed one.",
      },
      {
        slug: "ef-supertest",
        titleUk: "Supertest: статус, заголовки, тіло, cookie",
        titleEn: "Supertest: status, headers, body, and cookies",
        difficulty: 3,
        pointsUk: ["expect на статус, заголовки й тіло", "agent зберігає cookie між запитами", "Асинхронний хендлер має завершити відповідь"],
        pointsEn: ["expect on status, headers, and body", "an agent keeps cookies across requests", "An async handler must finish the response"],
        conceptUk: "request(app).post(...).send(...).expect(...) перевіряє HTTP-статус, заголовки й тіло; request.agent(app) зберігає cookie між запитами. Асинхронний маршрут має завершити відповідь або передати помилку: саме повернення проміса не надсилає відповідь. Express 5 передає відхилення повернутого проміса до error middleware; в Express 4 потрібен catch/next або обгортка. Встановлюйте таймаут тесту й закривайте власні сервери та підключення після тесту.",
        conceptEn: "request(app).post(...).send(...).expect(...) checks HTTP status, headers, and body; request.agent(app) preserves cookies across requests. An async route must end the response or forward an error: returning a promise alone does not send a response. Express 5 forwards a returned promise rejection to error middleware; Express 4 needs catch/next or a wrapper. Set a test timeout and close servers and connections started by the test.",
        code: "const agent = request.agent(app);\nawait agent.post('/login').send(creds).expect(302);\nawait agent.get('/me').expect(200);",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Навіщо request.agent(app) замість нового request(app) на кожен виклик?", promptEn: "Why use request.agent(app) instead of a fresh request(app) on every call?", options: ["агент зберігає cookie для наступних запитів", "agent швидший за HTTP/2", "без агента expect не працює", "агент вимикає CSRF"], optionsEn: ["the agent retains cookies for subsequent requests", "agent is faster than HTTP/2", "expect cannot work without an agent", "the agent disables CSRF"], correctIndex: 0, explanationUk: "Це клієнт із банкою cookie.", explanationEn: "It is a client with a cookie jar." },
          { kind: "fill", promptUk: "Допишіть очікування статусу створеного ресурсу", promptEn: "Fill in expecting the created-resource status", language: "javascript", code: "await request(app).post('/items').send(body).expect(___);", accepted: ["201"], caseSensitive: true, explanationUk: "Типовий код — 201.", explanationEn: "The typical code is 201." },
          { kind: "mcq", promptUk: "У Express 4 async-маршрут повертає відхилений проміс без catch. Який ризик?", promptEn: "An Express 4 async route returns a rejected promise without catch. What is the risk?", options: ["Помилка не передається автоматично до Express; відповідь може не завершитися або процес може завершитися", "Supertest ігнорує всі 500", "expect не підтримує 500", "listen на порту 80 обов'язковий"], optionsEn: ["The error is not automatically forwarded to Express; the response may hang or the process may exit", "Supertest ignores every 500", "expect cannot check 500", "Listening on port 80 is mandatory"], correctIndex: 0, explanationUk: "Використовуйте catch/next або перевірену обгортку; поведінка Node залежить від конфігурації.", explanationEn: "Use catch/next or a tested wrapper; Node behavior depends on configuration." }
        ],
        whyUk: "Як перевірити логін і наступний захищений GET одним клієнтом?",
        whyEn: "How do you test login and a following protected GET with one client?",
        ideas: [{ labelUk: "агент із cookie", labelEn: "an agent with cookies", anyOf: ["agent", "cookie", "сесі", "session"] }, { labelUk: "expect статусу", labelEn: "expect on the status", anyOf: ["expect", "302", "201", "401"] }, { labelUk: "завершений хендлер", labelEn: "a finished handler", anyOf: ["next", "проміс", "promise", "завис", "hang"] }],
        sampleUk: "Логін перевіряють через agent, який зберігає cookie, далі expect на захищений GET; маршрут має завершити відповідь, а помилку асинхронного проміса передати до next відповідно до версії Express.",
        sampleEn: "Exercise login through an agent that keeps cookies, then expect on the protected GET; the route must end the response and forward async promise errors to next according to the Express version.",
      },
      {
        slug: "ef-mw-unit-test",
        titleUk: "Одиничний тест проміжного ПЗ без HTTP",
        titleEn: "A unit test for middleware without HTTP",
        difficulty: 2,
        pointsUk: ["req, res, next — заглушки, шпигун на next", "next(err) — окрема гілка", "Чисту логіку виносьте з middleware"],
        pointsEn: ["req, res, next are stubs, with a spy on next", "next(err) is a separate branch", "Extract pure logic from middleware"],
        conceptUk: "Проміжне ПЗ — функція (req, res, next). У одиничному тесті підставляють заглушки req і res і шпигують next. Якщо middleware викликає next(err), це гілка помилки, не success next(). Для res перевіряють status і json, якщо відповідь завершується тут (авторизація). Не тягніть увесь Express, коли логіка — чиста функція (перевірка ролі): винесіть її і тестуйте без req. Час і дату підставляйте залежністю, не Date.now() глибоко всередині, щоб тест був детермінований. Після тестів скидайте таймери й моки.",
        conceptEn: "Middleware is a function (req, res, next). In a unit test you supply stub req and res and spy on next. If the middleware calls next(err), that is the error branch, not a success next(). For res, assert status and json when the response finishes here (authorization). Do not pull in all of Express when the logic is a pure function (a role check): extract it and test it without req. Inject time and date as a dependency, not Date.now() deep inside, so the test is deterministic. After tests, clear timers and mocks.",
        code: "// authorize is the middleware under test; assert is node:assert/strict.\nconst req = { user: { role: 'user' } };\nconst res = { statusCode: 0, body: null,\n  status(code) { this.statusCode = code; return this; },\n  json(body) { this.body = body; return this; } };\nlet nextCalled = false;\nauthorize('admin')(req, res, () => { nextCalled = true; });\nassert.equal(nextCalled, false);\nassert.equal(res.statusCode, 403);",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Як відрізнити успішний next від помилки в тесті middleware?", promptEn: "How do you distinguish a successful next from an error in a middleware test?", options: ["success — next() без аргументів, помилка — next(err)", "обидва однакові", "помилка — лише res.status(500)", "next не викликають у тестах"], optionsEn: ["success calls next() without arguments; an error calls next(err)", "both are identical", "an error is only res.status(500)", "next is never called in tests"], correctIndex: 0, explanationUk: "Перевіряйте аргумент виклику next.", explanationEn: "Assert the argument passed to next." },
          { kind: "fill", promptUk: "Допишіть виклик наступного обробника з помилкою", promptEn: "Fill in calling the next handler with an error", language: "javascript", code: "if (!req.user) return ___(unauthorized);", accepted: ["next"], caseSensitive: true, explanationUk: "Передайте помилку в next.", explanationEn: "Pass the error to next." },
          { kind: "mcq", promptUk: "Чому перевірку ролі варто винести з middleware у чисту функцію?", promptEn: "Why extract a role check from middleware into a pure function?", options: ["її можна тестувати без заглушок req/res і без Express", "чисті функції заборонені в тестах", "middleware тоді стає синхронним обов'язково", "next зникне"], optionsEn: ["it can be tested without req/res stubs or Express", "pure functions are forbidden in tests", "middleware must then be synchronous", "next disappears"], correctIndex: 0, explanationUk: "Окремо перевіряйте і сам HTTP-ланцюжок.", explanationEn: "Also test the HTTP chain separately." }
        ],
        whyUk: "Що перевіряє одиничний тест authorize middleware?",
        whyEn: "What should a unit test of authorize middleware assert?",
        ideas: [{ labelUk: "next або відповідь", labelEn: "next or a response", anyOf: ["next", "status", "401", "403"] }, { labelUk: "гілка next(err)", labelEn: "the next(err) branch", anyOf: ["err", "помилк", "error"] }, { labelUk: "чиста функція ролі", labelEn: "a pure role function", anyOf: ["чиста", "pure", "ролі", "role", "заглуш", "stub"] }],
        sampleUk: "Тест middleware підставляє заглушки req і res, перевіряє next() або next(err) і статус відповіді; перевірку ролі варто винести в чисту функцію без Express.",
        sampleEn: "A middleware test supplies stub req and res, asserts next() or next(err) and the response status; a role check belongs in a pure function without Express.",
      }
    ],
    "Контрольна: тести Express",
    "Exam: testing Express",
    [
      { promptUk: "Безумовний listen під час імпорту модуля app…", promptEn: "An unconditional listen when importing the app module…", options: ["може заважати тестам, займаючи порт", "обов'язковий для Supertest", "єдиний спосіб закрити сервер", "вимикає middleware"], optionsEn: ["can interfere with tests by binding a port", "is required by Supertest", "is the only way to close the server", "disables middleware"], correctIndex: 0, explanationUk: "Експортуйте app без побічного запуску.", explanationEn: "Export app without a startup side effect." },
      { promptUk: "request.agent потрібен, щоб…", promptEn: "request.agent is needed to…", options: ["зберегти cookie між запитами", "відкрити реальний порт 80", "підписати CSP", "вимкнути rate limit"], optionsEn: ["retain cookies between requests", "open port 80", "sign CSP", "disable rate limiting"], correctIndex: 0, explanationUk: "Банка cookie.", explanationEn: "A cookie jar." },
      { promptUk: "next(err) у middleware означає…", promptEn: "next(err) in middleware means…", options: ["передати керування обробнику помилок", "успішне завершення ланцюжка", "автоматичний 200", "закриття процесу"], optionsEn: ["forward control to error handling", "successfully finish the chain", "automatically return 200", "exit the process"], correctIndex: 0, explanationUk: "Гілка помилки.", explanationEn: "The error branch." },
      { promptUk: "Відхилений проміс у хендлері Express 4 без catch чи обгортки…", promptEn: "A rejected promise in an Express 4 handler without catch or a wrapper…", options: ["не передається автоматично до обробника помилок", "завжди стає 500 сам", "автоматично передається next у всіх версіях 4", "заборонений компілятором"], optionsEn: ["is not automatically forwarded to error handling", "always becomes 500 by itself", "is automatically forwarded to next in every Express 4 version", "is forbidden by the compiler"], correctIndex: 0, explanationUk: "В Express 4 явно передайте відхилення до next або використайте перевірену обгортку.", explanationEn: "In Express 4 forward the rejection to next or use a tested wrapper." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandExpressFundamentals(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
