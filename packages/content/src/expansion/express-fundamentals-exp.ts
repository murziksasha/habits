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
        conceptUk: "Сесійну cookie треба ставити з HttpOnly (недоступна document.cookie, менший XSS-витік), Secure (лише HTTPS) і SameSite=Lax або Strict проти CSRF. SameSite=None потребує Secure і потрібен лише для крос-сайтових сценаріїв. Max-Age і Expires керують життям; сесійна без них помре з браузером. Path і Domain звужують область: зайвий Domain=.example.com відправляє cookie на всі піддомени. Не зберігайте в cookie токен доступу з довгим життям без ротації; краще непрозорий session id на сервері.",
        conceptEn: "A session cookie should be set with HttpOnly (not reachable from document.cookie, a smaller XSS leak), Secure (HTTPS only), and SameSite=Lax or Strict against CSRF. SameSite=None requires Secure and is only for cross-site scenarios. Max-Age and Expires control lifetime; a session cookie without them dies with the browser. Path and Domain narrow the scope: a sloppy Domain=.example.com sends the cookie to every subdomain. Do not store a long-lived access token in a cookie without rotation; prefer an opaque session id on the server.",
        code: "res.cookie('sid', sessionId, { httpOnly: true, secure: true, sameSite: 'lax', path: '/' });",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Навіщо HttpOnly на сесійній cookie?", promptEn: "Why set HttpOnly on a session cookie?", options: ["щоб скрипт сторінки не читав її через document.cookie", "щоб вона працювала лише в HTTP, не HTTPS", "щоб вимкнути SameSite", "щоб cookie стала постійною"], correctIndex: 0, explanationUk: "Це зменшує витік при XSS, але не замінює екранування.", explanationEn: "It reduces leakage under XSS, but does not replace escaping." },
          { kind: "fill", promptUk: "Допишіть прапорець лише для HTTPS", promptEn: "Fill in the HTTPS-only flag", language: "javascript", code: "res.cookie('sid', id, { httpOnly: true, ___: true, sameSite: 'lax' });", accepted: ["secure"], caseSensitive: true, explanationUk: "Прапорець — secure.", explanationEn: "The flag is secure." },
          { kind: "mcq", promptUk: "Коли SameSite=None виправданий?", promptEn: "When is SameSite=None justified?", options: ["крос-сайтовий запит (вбудований віджет) і обов'язково Secure", "для будь-якої сесії на тому ж сайті", "щоб обійти HTTPS", "завжди замість Lax"], correctIndex: 0, explanationUk: "Це виняток, не значення за замовчуванням.", explanationEn: "It is an exception, not the default." }
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
        conceptUk: "express-session за замовчуванням тримає сесії в MemoryStore: це зникає при рестарті й не ділиться між процесами кластера — лише для розробки. У продакшені потрібне зовнішнє сховище (Redis, БД) з TTL і підписом cookie (secret, краще масив секретів для ротації). rolling і resave визначають, чи подовжується TTL на кожен запит; невдалі типові значення створюють зайві записи. saveUninitialized: false не створює сесію, поки ви щось не записали — менше порожніх ключів. Регенеруйте session id після логіну, щоб запобігти фіксації сесії.",
        conceptEn: "express-session keeps sessions in MemoryStore by default: that vanishes on restart and is not shared across cluster processes — fine only for development. Production needs an external store (Redis, a database) with a TTL and a signed cookie (a secret, preferably an array of secrets for rotation). rolling and resave control whether the TTL extends on every request; poor defaults create extra writes. saveUninitialized: false does not create a session until you write something — fewer empty keys. Regenerate the session id after login to prevent session fixation.",
        code: "req.session.regenerate((err) => {\n  if (err) return next(err);\n  req.session.userId = user.id;\n  res.redirect('/app');\n});",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому MemoryStore непридатний у кластері з кількома процесами?", promptEn: "Why is MemoryStore unfit in a cluster with several processes?", options: ["сесії не спільні між процесами і зникають після рестарту", "Redis заборонений з Express", "cookie тоді не підписується", "MemoryStore не вміє TTL навіть локально"], correctIndex: 0, explanationUk: "Кожен процес має свою пам'ять.", explanationEn: "Each process has its own memory." },
          { kind: "fill", promptUk: "Допишіть регенерацію id після логіну", promptEn: "Fill in regenerating the id after login", language: "javascript", code: "req.session.___(err => { req.session.userId = user.id; });", accepted: ["regenerate"], caseSensitive: true, explanationUk: "Метод — regenerate.", explanationEn: "The method is regenerate." },
          { kind: "mcq", promptUk: "Навіщо saveUninitialized: false?", promptEn: "Why set saveUninitialized: false?", options: ["не писати порожню сесію, поки ви нічого не зберегли", "щоб вимкнути підпис cookie", "щоб MemoryStore став Redis", "щоб SameSite став None"], correctIndex: 0, explanationUk: "Менше порожніх ключів у сховищі.", explanationEn: "Fewer empty keys in the store." }
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
        conceptUk: "cookie-parser із секретом дає req.signedCookies: значення підписане HMAC і відкидається, якщо його підмінили. Підпис не шифрує: клієнт все одно бачить значення, лише не може підробити його непомітно. Не кладіть у підписану cookie секрети чи персональні дані, які не повинні світитись. Для ротації секретів cookie-parser і express-session приймають масив: новий секрет першим, старі ще перевіряють. Зберігайте секрети в змінних середовища, не в репозиторії. Якщо секрет витік — інвалідуйте всі сесії й змініть секрет.",
        conceptEn: "cookie-parser with a secret gives req.signedCookies: the value is HMAC-signed and rejected if it was tampered with. A signature is not encryption: the client can still see the value, they just cannot forge it unnoticed. Do not put secrets or personal data that should stay hidden into a signed cookie. For secret rotation, cookie-parser and express-session accept an array: the new secret first, older ones still verified. Keep secrets in environment variables, not in the repository. If a secret leaks — invalidate every session and change the secret.",
        code: "app.use(cookieParser(process.env.COOKIE_SECRETS.split(',')));\n// req.signedCookies.theme",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чим підписана cookie відрізняється від зашифрованої?", promptEn: "How does a signed cookie differ from an encrypted one?", options: ["клієнт бачить значення, але не підробить його без секрету", "підпис завжди шифрує AES", "підписану cookie не відправити на HTTPS", "signedCookies ховає HttpOnly"], correctIndex: 0, explanationUk: "HMAC — цілісність, не конфіденційність.", explanationEn: "HMAC is integrity, not confidentiality." },
          { kind: "fill", promptUk: "Допишіть читання підписаної cookie", promptEn: "Fill in reading a signed cookie", language: "javascript", code: "const theme = req.___.theme;", accepted: ["signedCookies"], caseSensitive: true, explanationUk: "Поле — signedCookies.", explanationEn: "The field is signedCookies." },
          { kind: "mcq", promptUk: "Як ротувати секрет session без розлогінення всіх одразу в ту ж мить деплою, ще на хвилину?", promptEn: "How do you rotate a session secret without logging everyone out at the exact deploy instant?", options: ["передати масив: новий секрет першим, попередній ще діє", "достатньо змінити ім'я cookie", "робити не можна", "покласти секрет у репозиторій"], correctIndex: 0, explanationUk: "Старий підпис ще перевіряється.", explanationEn: "The old signature is still verified." }
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
      { promptUk: "HttpOnly на сесійній cookie потрібен, щоб…", promptEn: "HttpOnly on a session cookie is there so…", options: ["скрипт не читав її через document.cookie", "вона ходила лише відкритим HTTP", "вимкнути Secure", "зробити SameSite=None"], correctIndex: 0, explanationUk: "Менший витік при XSS.", explanationEn: "A smaller XSS leak." },
      { promptUk: "MemoryStore у продакшені…", promptEn: "MemoryStore in production is…", options: ["непридатний: немає спільності між процесами і рестартами", "обов'язковий для Redis", "швидший за будь-яке зовнішнє сховище завжди", "єдиний спосіб підписати cookie"], correctIndex: 0, explanationUk: "Беріть зовнішнє сховище.", explanationEn: "Use an external store." },
      { promptUk: "Підписана cookie…", promptEn: "A signed cookie…", options: ["захищає цілісність, але не ховає значення", "завжди зашифрована AES", "не потребує секрету", "замінює HttpOnly"], correctIndex: 0, explanationUk: "HMAC не є шифром.", explanationEn: "HMAC is not encryption." },
      { promptUk: "Після логіну session id треба…", promptEn: "After login the session id should be…", options: ["регенерувати проти фіксації сесії", "надрукувати в URL", "зберегти в localStorage", "зробити SameSite=None завжди"], correctIndex: 0, explanationUk: "regenerate.", explanationEn: "regenerate." }
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
        conceptUk: "multer.memoryStorage тримає весь файл у RAM — зручно для маленьких зображень, небезпечно для великих: кілька паралельних завантажень вичерпають процес. diskStorage пише в тимчасовий каталог; тоді треба прибрати файл після обробки і не довіряти оригінальному імені (path traversal, перезапис). Для продакшену часто стрімлять у об'єктне сховище (S3) без повної буферизації. Перевіряйте MIME не лише за розширенням, а за сигнатурою (magic bytes). Обмежуйте розмір fileSize і кількість файлів у limits.",
        conceptEn: "multer.memoryStorage keeps the whole file in RAM — convenient for small images, dangerous for large ones: a few parallel uploads can exhaust the process. diskStorage writes to a temp directory; then you must delete the file after processing and must not trust the original name (path traversal, overwrite). In production you often stream into object storage (S3) without buffering everything. Check MIME not only by extension, but by magic bytes. Cap fileSize and the file count in limits.",
        code: "const upload = multer({\n  storage: multer.diskStorage({ destination: '/tmp', filename: safeName }),\n  limits: { fileSize: 5_000_000, files: 1 },\n});",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому memoryStorage небезпечний для відео на 500 МБ?", promptEn: "Why is memoryStorage dangerous for a 500 MB video?", options: ["увесь файл лежить у RAM процесу, кілька завантажень вичерпають пам'ять", "multer не вміє відео", "диск тоді обов'язково шифрується", "S3 забороняє стріми"], correctIndex: 0, explanationUk: "Буферизація в пам'яті лінійна до розміру.", explanationEn: "In-memory buffering is linear in size." },
          { kind: "fill", promptUk: "Допишіть ліміт розміру файлу", promptEn: "Fill in the file size limit", language: "javascript", code: "multer({ limits: { ___Size: 5_000_000 } })", accepted: ["file"], caseSensitive: true, explanationUk: "Поле — fileSize.", explanationEn: "The field is fileSize." },
          { kind: "mcq", promptUk: "Чому не зберігати файл як req.file.originalname у /uploads без перевірки?", promptEn: "Why should you not save a file as req.file.originalname under /uploads without checks?", options: ["ім'я може містити ../ і вийти за каталог або перезаписати чужий файл", "originalname завжди порожнє", "Express ігнорує дискові імена", "це ламає HTTPS"], correctIndex: 0, explanationUk: "Ім'я з клієнта — небезпечний ввід.", explanationEn: "A client-supplied name is untrusted input." }
        ],
        whyUk: "Як безпечно прийняти зображення профілю в Express?",
        whyEn: "How do you safely accept a profile image in Express?",
        ideas: [{ labelUk: "ліміт розміру", labelEn: "a size limit", anyOf: ["ліміт", "limit", "filesize", "пам'ят", "memory"] }, { labelUk: "не довіряти імені", labelEn: "do not trust the name", anyOf: ["ім'я", "filename", "traversal", "../"] }, { labelUk: "перевірка вмісту", labelEn: "content check", anyOf: ["mime", "magic", "сигнатур", "signature"] }],
        sampleUk: "Для зображення профілю ставлять ліміт fileSize, не кладуть великий файл у RAM, не довіряють originalname і перевіряють тип за сигнатурою, а не лише за розширенням.",
        sampleEn: "For a profile image you set a fileSize limit, you do not put a large file in RAM, you do not trust originalname, and you check the type by signature, not only by extension.",
      },
      {
        slug: "ef-size-limits",
        titleUk: "Ліміти JSON і urlencoded тіла",
        titleEn: "JSON and urlencoded body limits",
        difficulty: 3,
        pointsUk: ["Завжди ставте limit на json і urlencoded", "413 для перевищення, централізований обробник", "Ліміт проксі доповнює ліміт додатка"],
        pointsEn: ["Always set a limit on json and urlencoded", "413 on overflow, with a centralized handler", "A proxy limit complements the app limit"],
        conceptUk: "express.json({ limit: '20kb' }) і express.urlencoded({ limit, extended }) відсікають занадто великі тіла до того, як ви їх парсите в об'єкти. Без ліміту атакуючий надішле сотні мегабайт і вичерпає пам'ять (payload bomb). extended: true в qs дозволяє вкладені об'єкти, але глибока вкладеність теж коштує: ставте parameterLimit. Помилка перевищення ліміту — 413, її має зловити централізований обробник. Ліміт на рівні проксі (nginx client_max_body_size) доповнює, не замінює, ліміт у додатку. Різні маршрути можуть мати різні ліміти.",
        conceptEn: "express.json({ limit: '20kb' }) and express.urlencoded({ limit, extended }) reject bodies that are too large before you parse them into objects. Without a limit an attacker can send hundreds of megabytes and exhaust memory (a payload bomb). extended: true in qs allows nested objects, but deep nesting is expensive too: set parameterLimit. Exceeding the limit is a 413, which a centralized handler should catch. A proxy limit (nginx client_max_body_size) complements, and does not replace, the app limit. Different routes can have different limits.",
        code: "app.use(express.json({ limit: '32kb' }));\napp.use(express.urlencoded({ limit: '32kb', extended: false, parameterLimit: 50 }));",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Що станеться без limit у express.json при величезному тілі?", promptEn: "What happens without a limit on express.json given a huge body?", options: ["парсер намагається прочитати все в пам'ять, ризик вичерпання", "Express сам ставить 1 байт", "тіло ігнорується мовчки", "завжди відповідає 201"], correctIndex: 0, explanationUk: "Дефолт може бути завеликим для вашого сервісу.", explanationEn: "The default may be far too large for your service." },
          { kind: "fill", promptUk: "Допишіть код відповіді для завеликого тіла", promptEn: "Fill in the status code for a body that is too large", language: "javascript", code: "// entity.too.large → HTTP ___", accepted: ["413"], caseSensitive: true, explanationUk: "Код — 413 Payload Too Large.", explanationEn: "The code is 413 Payload Too Large." },
          { kind: "mcq", promptUk: "Чому ліміту nginx недостатньо самого по собі?", promptEn: "Why is an nginx limit not enough on its own?", options: ["запит може обійти проксі або інший вхід; додаток має свій захист", "nginx не вміє лімітів", "Express ігнорує 413 від проксі", "ліміт nginx шифрує тіло"], correctIndex: 0, explanationUk: "Захист на кількох шарах.", explanationEn: "Defence in depth." }
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
        conceptUk: "Парсери Express дивляться на Content-Type: application/json не піде в urlencoded-парсер. Атакуючий може надіслати інший тип, щоб обійти валідацію, або multipart там, де ви чекаєте JSON. Явно обмежуйте типи (type у express.json) і відповідайте 415 Unsupported Media Type на невідомий. Не довіряйте лише розширенню URL. Для JSON переконайтесь, що парсер не приймає 'application/*' надто широко, якщо вам потрібен лише json. Порожнє тіло на POST без типу теж варто відсікати на маршрутах, де тіло обов'язкове.",
        conceptEn: "Express parsers look at Content-Type: application/json will not enter the urlencoded parser. An attacker may send a different type to skip validation, or multipart where you expect JSON. Explicitly restrict types (the type option on express.json) and respond 415 Unsupported Media Type for unknowns. Do not trust only the URL extension. For JSON, make sure the parser does not accept application/* too broadly if you only want json. An empty POST body with no type should also be rejected on routes where a body is required.",
        code: "app.use('/api', express.json({ type: 'application/json', limit: '16kb' }));\napp.use((req, res, next) => {\n  if (req.method === 'POST' && !req.is('json')) return res.sendStatus(415);\n  next();\n});",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Який код відповіді на POST з Content-Type: text/plain, якщо маршрут чекає JSON?", promptEn: "Which status should a POST with Content-Type text/plain get if the route expects JSON?", options: ["415 Unsupported Media Type", "200 з порожнім об'єктом завжди", "500", "301"], correctIndex: 0, explanationUk: "Тип середовища не підтримано.", explanationEn: "The media type is unsupported." },
          { kind: "fill", promptUk: "Допишіть опцію дозволеного типу JSON-парсера", promptEn: "Fill in the allowed-type option of the JSON parser", language: "javascript", code: "express.json({ ___: 'application/json', limit: '16kb' })", accepted: ["type"], caseSensitive: true, explanationUk: "Опція — type.", explanationEn: "The option is type." },
          { kind: "mcq", promptUk: "Чому не достатньо перевірити, що URL закінчується на .json?", promptEn: "Why is it not enough to check that the URL ends in .json?", options: ["тип тіла задає заголовок Content-Type, URL можна підробити незалежно", ".json автоматично парсить будь-яке тіло", "Express ігнорує Content-Type", "розширення шифрує тіло"], correctIndex: 0, explanationUk: "Джерело правди — заголовок і вміст.", explanationEn: "The source of truth is the header and the body." }
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
      { promptUk: "memoryStorage для великого відео…", promptEn: "memoryStorage for a large video is…", options: ["небезпечний, бо файл цілком у RAM", "обов'язковий", "швидший за S3 без недоліків", "ігнорує limits"], correctIndex: 0, explanationUk: "Стрімте на диск або в об'єктне сховище.", explanationEn: "Stream to disk or object storage." },
      { promptUk: "Перевищення limit у express.json має дати…", promptEn: "Exceeding the express.json limit should yield…", options: ["413", "200", "302", "204"], correctIndex: 0, explanationUk: "Payload Too Large.", explanationEn: "Payload Too Large." },
      { promptUk: "originalname з клієнта…", promptEn: "A client originalname is…", options: ["небезпечний ввід: можливий path traversal", "завжди безпечне ім'я файлу", "ігнорується multer", "шифрується само"], correctIndex: 0, explanationUk: "Генеруйте своє ім'я.", explanationEn: "Generate your own name." },
      { promptUk: "Неочікуваний Content-Type…", promptEn: "An unexpected Content-Type is…", options: ["415", "201", "401 завжди", "ідентичний 413"], correctIndex: 0, explanationUk: "Unsupported Media Type.", explanationEn: "Unsupported Media Type." }
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
        pointsUk: ["helmet ставить базові заголовки, CSP — головний важіль проти XSS", "Report-Only спочатку, потім enforce", "unsafe-inline майже обнуляє CSP для скриптів"],
        pointsEn: ["helmet sets baseline headers; CSP is the main lever against XSS", "Report-Only first, then enforce", "unsafe-inline almost zeros CSP for scripts"],
        conceptUk: "helmet підключає набір заголовків: X-Content-Type-Options: nosniff, Referrer-Policy, Frameguard (клікджекінг), HSTS на HTTPS. Найважчий і найкорисніший — Content-Security-Policy: default-src 'self' забороняє інлайн-скрипти й чужі джерела. Почати можна з Content-Security-Policy-Report-Only, зібрати звіти й тоді увімкнути жорстко. 'unsafe-inline' майже скасовує захист від XSS; краще nonce або хеші. helmet не замінює валідацію введення й екранування. CSP треба узгодити з CDN, шрифтами й WebSocket, інакше сайт «мовчки» зламається.",
        conceptEn: "helmet turns on a set of headers: X-Content-Type-Options: nosniff, Referrer-Policy, Frameguard (clickjacking), and HSTS on HTTPS. The hardest and most useful is Content-Security-Policy: default-src 'self' blocks inline scripts and foreign origins. You can start with Content-Security-Policy-Report-Only, collect reports, then enforce. 'unsafe-inline' almost cancels XSS protection; prefer a nonce or hashes. helmet does not replace input validation and escaping. CSP must agree with your CDN, fonts, and WebSocket, or the site will break silently.",
        code: "app.use(helmet({\n  contentSecurityPolicy: { directives: { defaultSrc: [\"'self'\"], scriptSrc: [\"'self'\", (req, res) => `'nonce-${res.locals.nonce}'`] } },\n}));",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому 'unsafe-inline' у script-src майже зводить CSP нанівець як захист від XSS?", promptEn: "Why does 'unsafe-inline' in script-src almost cancel CSP as XSS defence?", options: ["інлайн-скрипт зі сторінки знову дозволений, саме те, що вставляє XSS", "браузер ігнорує весь CSP", "helmet тоді вимикається", "HSTS перестає працювати"], correctIndex: 0, explanationUk: "XSS часто саме інлайн.", explanationEn: "XSS is often exactly inline." },
          { kind: "fill", promptUk: "Допишіть режим спостереження CSP", promptEn: "Fill in the CSP observation mode", language: "javascript", code: "Content-Security-Policy-___-Only", accepted: ["Report"], caseSensitive: true, explanationUk: "Режим — Report-Only.", explanationEn: "The mode is Report-Only." },
          { kind: "mcq", promptUk: "Чи достатньо helmet замість екранування HTML?", promptEn: "Is helmet enough to replace HTML escaping?", options: ["ні, заголовки доповнюють екранування і валідацію, не замінюють", "так, CSP робить екранування зайвим", "так, якщо є HSTS", "helmet сам екранує res.send"], correctIndex: 0, explanationUk: "Захист у глибину.", explanationEn: "Defence in depth." }
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
        conceptUk: "Access-Control-Allow-Origin: * не можна поєднувати з credentials. Якщо API з cookie, дозволені джерела мають бути білим списком, не req.headers.origin «як є»: віддзеркалення будь-якого Origin відкриває сайт до читання відповідей зловмисною сторінкою. Preflight (OPTIONS) має відповідати тими самими правилами. cors пакет з origin: true віддзеркалює — це зручно в dev і небезпечно в прод. Заголовок не замінює авторизацію: CORS обмежує браузер, не curl.",
        conceptEn: "Access-Control-Allow-Origin: * cannot be combined with credentials. If the API uses cookies, allowed origins must be a whitelist, not req.headers.origin as-is: reflecting any Origin lets a malicious page read the response. Preflight (OPTIONS) must follow the same rules. The cors package with origin: true reflects — handy in dev and dangerous in production. The header does not replace authorization: CORS constrains the browser, not curl.",
        code: "app.use(cors({ origin: ['https://app.example.com'], credentials: true }));",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому origin: true у пакеті cors небезпечний у продакшені з cookie?", promptEn: "Why is origin: true on the cors package dangerous in production with cookies?", options: ["він віддзеркалює будь-який Origin, тож чужий сайт може читати відповіді з обліковими даними", "він вимикає HTTPS", "він забороняє OPTIONS", "він замінює SameSite"], correctIndex: 0, explanationUk: "Білий список, не луна.", explanationEn: "A whitelist, not an echo." },
          { kind: "fill", promptUk: "Допишіть заборонену комбінацію", promptEn: "Fill in the forbidden combination", language: "javascript", code: "Access-Control-Allow-Origin: *  +  Access-Control-Allow-Credentials: ___", accepted: ["true"], caseSensitive: true, explanationUk: "Зірочка і credentials несумісні.", explanationEn: "A star and credentials are incompatible." },
          { kind: "mcq", promptUk: "Чи зупинить CORS зловмисника з curl і вкраденим токеном?", promptEn: "Will CORS stop an attacker with curl and a stolen token?", options: ["ні, CORS обмежує лише браузерну політику однакового джерела", "так, сервер відхилить будь-який небраузерний запит", "так, якщо є helmet", "лише коли Origin порожній"], correctIndex: 0, explanationUk: "Авторизація перевіряється окремо.", explanationEn: "Authorization is checked separately." }
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
        conceptUk: "express-rate-limit відсікає надто часті запити: логін, скидання пароля, публічний пошук. Ключ за замовчуванням — IP, але за проксі треба trust proxy і брати правильну адресу, інакше весь трафік з одного NAT виглядає як один клієнт, або атакуючий підробить X-Forwarded-For. Для логіну лімітують ще й за ім'ям облікового запису. Відповідь 429 із Retry-After. Ліміти тримають у Redis, якщо процесів кілька. Не ставте один глобальний ліміт на все: здоров'я /healthz має лишитись доступним. Після успішного логіну лічильник можна скинути.",
        conceptEn: "express-rate-limit rejects requests that come too often: login, password reset, public search. The default key is the IP, but behind a proxy you need trust proxy and the correct address, otherwise all traffic from one NAT looks like one client, or an attacker forges X-Forwarded-For. For login, also limit by account name. The response is 429 with Retry-After. Store limits in Redis if you have several processes. Do not put one global limit on everything: /healthz should stay reachable. After a successful login you can reset the counter.",
        code: "app.set('trust proxy', 1);\nconst loginLimit = rateLimit({ windowMs: 15*60*1000, max: 20, keyGenerator: (req) => req.body.email || req.ip });",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому за проксі без trust proxy ліміт «ламається»?", promptEn: "Why does a limit 'break' behind a proxy without trust proxy?", options: ["усі клієнти виглядають як IP проксі, або підроблений X-Forwarded-For стає ключем", "rate-limit тоді вимикається назавжди", "429 заборонений", "Redis не вміє IP"], correctIndex: 0, explanationUk: "Правильно налаштуйте довіру до проксі.", explanationEn: "Configure proxy trust correctly." },
          { kind: "fill", promptUk: "Допишіть код «забагато запитів»", promptEn: "Fill in the 'too many requests' status", language: "javascript", code: "res.status(___).set('Retry-After', '60');", accepted: ["429"], caseSensitive: true, explanationUk: "Код — 429.", explanationEn: "The code is 429." },
          { kind: "mcq", promptUk: "Навіщо окремий ключ за email на маршруті логіну?", promptEn: "Why a separate email key on the login route?", options: ["щоб розпилювати пароль одного облікового запису з різних IP усе одно гальмувалось", "email не можна хешувати", "IP тоді ігнорується законом", "429 тоді стає 401"], correctIndex: 0, explanationUk: "Атака йде на обліковий запис, не лише на адресу.", explanationEn: "The attack targets the account, not only the address." }
        ],
        whyUk: "Як лімітувати логін у кластері Express за проксі?",
        whyEn: "How do you rate-limit login in an Express cluster behind a proxy?",
        ideas: [{ labelUk: "trust proxy і правильний IP", labelEn: "trust proxy and the correct IP", anyOf: ["trust", "proxy", "forwarded", "ip"] }, { labelUk: "ключ облікового запису", labelEn: "an account key", anyOf: ["email", "логін", "login", "акаунт", "account"] }, { labelUk: "Redis і 429", labelEn: "Redis and 429", anyOf: ["redis", "429", "retry-after", "health"] }],
        sampleUk: "За проксі вмикають trust proxy і беруть реальний IP, на логіні додають ключ облікового запису, лічильники тримають у Redis і відповідають 429, не чіпаючи health-маршрут.",
        sampleEn: "Behind a proxy you enable trust proxy and take the real IP, you add an account key on login, you keep counters in Redis, and you respond 429, leaving the health route alone.",
      }
    ],
    "Контрольна: заголовки й ліміти",
    "Exam: headers and limits",
    [
      { promptUk: "'unsafe-inline' у script-src…", promptEn: "'unsafe-inline' in script-src…", options: ["майже скасовує захист CSP від XSS", "обов'язковий для helmet", "вмикає HSTS", "замінює nonce завжди на краще"], correctIndex: 0, explanationUk: "Краще nonce або хеш.", explanationEn: "Prefer a nonce or a hash." },
      { promptUk: "Віддзеркалення будь-якого Origin з credentials…", promptEn: "Reflecting any Origin with credentials is…", options: ["небезпечне: чужий сайт читає відповіді", "рекомендоване для продакшену", "єдиний спосіб cookie", "заборонене лише в dev"], correctIndex: 0, explanationUk: "Білий список.", explanationEn: "A whitelist." },
      { promptUk: "Забагато запитів на логін — це…", promptEn: "Too many login requests is…", options: ["429 із Retry-After", "200", "301", "204"], correctIndex: 0, explanationUk: "Too Many Requests.", explanationEn: "Too Many Requests." },
      { promptUk: "CORS зупиняє curl із токеном?", promptEn: "Does CORS stop curl with a token?", options: ["ні, це браузерна політика", "так, завжди", "так, разом із helmet обов'язково", "лише для OPTIONS"], correctIndex: 0, explanationUk: "Авторизація окремо.", explanationEn: "Authorization is separate." }
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
        pointsUk: ["createApp експортує app без listen", "listen лише в точці входу", "Supertest може ходити в app напряму"],
        pointsEn: ["createApp exports app without listen", "listen only in the entry point", "Supertest can talk to app directly"],
        conceptUk: "Щоб тестувати HTTP-шар, збирайте застосунок у createApp() і експортуйте app без listen. listen лише в точці входу (server.js), яку тести не імпортують. Інакше тестовий імпорт займе порт, заважатиме паралельним тестам і не закриє з'єднання. Конфіг (порт, БД) передають залежностями, щоб у тесті підставити заглушку. app.listen повертає Server: у інтеграційних тестах його треба close() у after. Для супертеста listen не обов'язковий: він ходить у app напряму.",
        conceptEn: "To test the HTTP layer, build the app in createApp() and export app without listen. listen belongs only in the entry point (server.js) that tests do not import. Otherwise a test import grabs a port, fights parallel tests, and leaves connections open. Pass config (port, database) as dependencies so a test can inject a stub. app.listen returns a Server: in integration tests you must close() it in after. For Supertest, listen is optional: it talks to app directly.",
        code: "export function createApp({ db }) {\n  const app = express();\n  app.get('/health', (_req, res) => res.send('ok'));\n  return app;\n}",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому listen у тому ж модулі, що й app.use, заважає тестам?", promptEn: "Why does listen in the same module as app.use get in the way of tests?", options: ["імпорт модуля займає порт і залишає відкритий сервер", "Express тоді не реєструє маршрути", "supertest вимагає зайнятий порт завжди", "listen вимикає middleware"], correctIndex: 0, explanationUk: "Побічний ефект на імпорті.", explanationEn: "A side effect on import." },
          { kind: "fill", promptUk: "Допишіть фабрику без слухання порту", promptEn: "Fill in a factory that does not listen", language: "javascript", code: "export function create___() { const app = express(); /* routes */ return app; }", accepted: ["App"], caseSensitive: true, explanationUk: "Фабрика — createApp.", explanationEn: "The factory is createApp." },
          { kind: "mcq", promptUk: "Чи потрібен реальний порт для Supertest?", promptEn: "Does Supertest need a real port?", options: ["ні, request(app) ходить у функцію додатка напряму", "так, завжди app.listen спочатку", "так, лише на 80", "лише для GET"], correctIndex: 0, explanationUk: "Supertest інжектить запит у app.", explanationEn: "Supertest injects the request into app." }
        ],
        whyUk: "Як структурувати Express-додаток, щоб його було легко тестувати?",
        whyEn: "How should you structure an Express app so it is easy to test?",
        ideas: [{ labelUk: "фабрика без listen", labelEn: "a factory without listen", anyOf: ["createapp", "listen", "імпорт", "import", "порт", "port"] }, { labelUk: "залежності ззовні", labelEn: "dependencies from outside", anyOf: ["конфіг", "config", "stub", "заглуш"] }, { labelUk: "Supertest напряму", labelEn: "Supertest directly", anyOf: ["supertest", "request", "app"] }],
        sampleUk: "Збирайте app у фабриці без listen, слухайте порт лише в точці входу, конфіг передавайте залежностями; Supertest ходить у app напряму й не потребує реального порту.",
        sampleEn: "Build app in a factory without listen, listen only in the entry point, and pass config as dependencies; Supertest talks to app directly and does not need a real port.",
      },
      {
        slug: "ef-supertest",
        titleUk: "Supertest: статус, заголовки, тіло, cookie",
        titleEn: "Supertest: status, headers, body, and cookies",
        difficulty: 3,
        pointsUk: ["expect на статус, заголовки й тіло", "agent зберігає cookie між запитами", "Асинхронний хендлер має завершити відповідь"],
        pointsEn: ["expect on status, headers, and body", "an agent keeps cookies across requests", "An async handler must finish the response"],
        conceptUk: "request(app).post('/login').send({ email, password }).expect(302) перевіряє статус і може читати заголовки Location і Set-Cookie. Для сесії зберігайте агент: request.agent(app) тримає cookie між викликами. expect(res => ...) дає довільні твердження над тілом. Не дублюйте всю бізнес-логіку в HTTP-тесті: тонкий шар маршруту плюс окремі тести домену. Асинхронні обробники мають повертати проміс або викликати next(err), інакше Supertest зависне без відповіді. Закривайте агенти й БД у after.",
        conceptEn: "request(app).post('/login').send({ email, password }).expect(302) checks the status and can read Location and Set-Cookie. For a session, keep an agent: request.agent(app) holds cookies across calls. expect(res => ...) allows arbitrary assertions on the body. Do not duplicate all business logic in an HTTP test: a thin route layer plus separate domain tests. Async handlers must return a promise or call next(err), or Supertest hangs with no response. Close agents and the database in after.",
        code: "const agent = request.agent(app);\nawait agent.post('/login').send(creds).expect(302);\nawait agent.get('/me').expect(200);",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Навіщо request.agent(app) замість нового request(app) на кожен виклик?", promptEn: "Why use request.agent(app) instead of a fresh request(app) on every call?", options: ["агент зберігає cookie, тож сесія логіну видно наступному запиту", "agent швидший за HTTP/2", "без агента expect не працює", "агент вимикає CSRF"], correctIndex: 0, explanationUk: "Це клієнт із банкою cookie.", explanationEn: "It is a client with a cookie jar." },
          { kind: "fill", promptUk: "Допишіть очікування статусу створеного ресурсу", promptEn: "Fill in expecting the created-resource status", language: "javascript", code: "await request(app).post('/items').send(body).expect(___);", accepted: ["201"], caseSensitive: true, explanationUk: "Типовий код — 201.", explanationEn: "The typical code is 201." },
          { kind: "mcq", promptUk: "Чому тест зависає, якщо async-маршрут кидає, але не викликає next?", promptEn: "Why does a test hang if an async route throws but never calls next?", options: ["Express 4 не ловить відхилений проміс сам, відповідь не завершується", "Supertest ігнорує 500", "expect не вміє 500", "listen обов'язковий"], correctIndex: 0, explanationUk: "Обгорніть async або використовуйте express-async-errors / Express 5.", explanationEn: "Wrap async or use express-async-errors / Express 5." }
        ],
        whyUk: "Як перевірити логін і наступний захищений GET одним клієнтом?",
        whyEn: "How do you test login and a following protected GET with one client?",
        ideas: [{ labelUk: "агент із cookie", labelEn: "an agent with cookies", anyOf: ["agent", "cookie", "сесі", "session"] }, { labelUk: "expect статусу", labelEn: "expect on the status", anyOf: ["expect", "302", "201", "401"] }, { labelUk: "завершений хендлер", labelEn: "a finished handler", anyOf: ["next", "проміс", "promise", "завис", "hang"] }],
        sampleUk: "Логін перевіряють через agent, який зберігає cookie, далі expect на захищений GET; асинхронний маршрут має повернути проміс або викликати next, інакше тест зависне.",
        sampleEn: "You exercise login through an agent that keeps cookies, then expect on the protected GET; an async route must return a promise or call next, or the test hangs.",
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
        code: "const req = { user: { role: 'user' } };\nconst res = { status: fn().json: fn() };\nauthorize('admin')(req, res, next);\nassert(next.called === false);\nassert(res.status.calledWith(403));",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Як відрізнити успішний next від помилки в тесті middleware?", promptEn: "How do you distinguish a successful next from an error in a middleware test?", options: ["success — next() без аргументів, помилка — next(err)", "обидва однакові", "помилка — лише res.status(500)", "next не викликають у тестах"], correctIndex: 0, explanationUk: "Контракт Express — перший аргумент.", explanationEn: "The Express contract is the first argument." },
          { kind: "fill", promptUk: "Допишіть виклик наступного обробника з помилкою", promptEn: "Fill in calling the next handler with an error", language: "javascript", code: "if (!req.user) return ___(unauthorized);", accepted: ["next"], caseSensitive: true, explanationUk: "Передайте помилку в next.", explanationEn: "Pass the error to next." },
          { kind: "mcq", promptUk: "Чому перевірку ролі варто винести з middleware у чисту функцію?", promptEn: "Why extract a role check from middleware into a pure function?", options: ["її можна тестувати без заглушок req/res і без Express", "чисті функції заборонені в тестах", "middleware тоді стає синхронним обов'язково", "next зникне"], correctIndex: 0, explanationUk: "Тонкий HTTP-шар, товста доменна логіка.", explanationEn: "A thin HTTP layer, thick domain logic." }
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
      { promptUk: "listen під час імпорту модуля app…", promptEn: "listen at import time of the app module is…", options: ["заважає тестам: займає порт", "обов'язковий для Supertest", "єдиний спосіб закрити сервер", "вимикає middleware"], correctIndex: 0, explanationUk: "Фабрика без listen.", explanationEn: "A factory without listen." },
      { promptUk: "request.agent потрібен, щоб…", promptEn: "request.agent is needed to…", options: ["зберегти cookie між запитами", "відкрити реальний порт 80", "підписати CSP", "вимкнути rate limit"], correctIndex: 0, explanationUk: "Банка cookie.", explanationEn: "A cookie jar." },
      { promptUk: "next(err) у middleware означає…", promptEn: "next(err) in middleware means…", options: ["передати керування обробнику помилок", "успішне завершення ланцюжка", "автоматичний 200", "закриття процесу"], correctIndex: 0, explanationUk: "Гілка помилки.", explanationEn: "The error branch." },
      { promptUk: "Відхилений проміс у хендлері Express 4 без обгортки…", promptEn: "A rejected promise in an Express 4 handler without a wrapper…", options: ["може не завершити відповідь, тест зависне", "завжди стає 500 сам", "перетворюється на next автоматично в усіх версіях 4", "заборонений компілятором"], correctIndex: 0, explanationUk: "Поверніть проміс коректно або оновіть Express.", explanationEn: "Return the promise correctly or upgrade Express." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandExpressFundamentals(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
