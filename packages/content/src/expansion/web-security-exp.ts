import type { CourseContent, LessonContent, UnitContent } from "../types.js";
import { expandCourse, sectionUnit, teachLesson } from "./factory.js";

export const newUnits: UnitContent[] = [
  sectionUnit(
    "ws_ssrf_redirect",
    "SSRF, відкриті редіректи й CSRF у 2020-х",
    "SSRF, open redirects, and CSRF in the 2020s",
    [
      {
        slug: "ws-ssrf-allow",
        titleUk: "SSRF: сервер просить URL, який обрав користувач — і може постукати в хмарний метаданий",
        titleEn: "SSRF: the server fetches a user-chosen URL — and may knock on the cloud metadata service",
        difficulty: 3,
        pointsUk: ["Allowlist хостів і лише https, не blacklist IP", "Не слідувати редіректу на інший хост", "Не віддавати внутрішню відповідь клієнту"],
        pointsEn: ["A host allowlist and https only, not an IP blacklist", "Do not follow a redirect to another host", "Do not return an internal response to the client"],
        conceptUk: "Server-Side Request Forgery виникає, коли додаток робить HTTP-запит за адресою з запиту користувача (прев'ю посилання, імпорт з URL, вебхук). Атакуючий підставляє `http://169.254.169.254/` (метадані хмари), внутрішній адмін або `file:///`. Захист: дозволяти лише схему https, звіряти хост із суворим allowlist (не blacklist IP — є DNS rebinding і редіректи), не йти за редіректом на інший хост, окрема мережа для egress. Відповідь внутрішнього сервісу не віддають клієнту як є. Метаданий IMDSv2 (токен) зменшує шкоду, але не замінює allowlist у коді.",
        conceptEn: "Server-Side Request Forgery happens when the app makes an HTTP request to an address from the user's request (a link preview, an import from a URL, a webhook). An attacker supplies `http://169.254.169.254/` (cloud metadata), an internal admin, or `file:///`. Defence: allow only the https scheme, check the host against a strict allowlist (not an IP blacklist — there is DNS rebinding and redirects), do not follow a redirect to another host, and use a separate egress network. An internal service's response is not returned to the client as-is. IMDSv2 metadata (a token) reduces harm, but does not replace an allowlist in code.",
        code: "// deny: fetch(userUrl)  // may be 169.254.169.254 or http://admin.internal\n// allow: https host in allowlist, no cross-host redirects, sanitized excerpt only",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому blacklist 169.254.169.254 недостатній проти SSRF?", promptEn: "Why is a blacklist of 169.254.169.254 not enough against SSRF?", options: ["DNS rebinding, редіректи, інші внутрішні IP й IPv6 обходять один запис", "цей IP ніколи не буває метаданими", "HTTPS забороняє SSRF сам", "allowlist слабший за blacklist"], correctIndex: 0, explanationUk: "Суворий список дозволених хостів і власний резолвер.", explanationEn: "A strict allowlist of hosts and your own resolver." },
          { kind: "fill", promptUk: "Допишіть типову адресу метаданих AWS/GCP, яку цілить SSRF", promptEn: "Fill in a typical AWS/GCP metadata address that SSRF aims at", language: "bash", code: "curl http://169.254.___.254/latest/meta-data/", accepted: ["169"], caseSensitive: true, explanationUk: "169.254.169.254 — link-local metadata.", explanationEn: "169.254.169.254 is link-local metadata." },
          { kind: "read", promptUk: "Чи безпечно показати користувачу тіло відповіді з URL, який він надіслав?", promptEn: "Is it safe to show the user the body of the response from a URL they submitted?", language: "javascript", code: "const body = await fetch(req.query.url).then(r => r.text()); res.send(body)", options: ["ні: це може бути внутрішня панель чи секрет; не проксуйте відповідь як є", "так, якщо URL починається з http", "так, fetch завжди зовнішній", "так, CORS це заборонить на сервері"], correctIndex: 0, explanationUk: "Прев'ю — санітизований уривок із allowlist.", explanationEn: "A preview is a sanitized excerpt from an allowlist." }
        ],
        whyUk: "Як зробити прев'ю посилання, не відкриваючи внутрішню мережу й метадані хмари?",
        whyEn: "How do you build a link preview without opening the internal network and cloud metadata?",
        ideas: [{ labelUk: "allowlist і https", labelEn: "an allowlist and https", anyOf: ["allowlist", "https", "схем", "scheme", "хост", "host"] }, { labelUk: "не внутрішній IP", labelEn: "not an internal IP", anyOf: ["169.254", "metadata", "ssrf", "ребінд", "rebind", "редірект", "redirect"] }, { labelUk: "не проксувати тіло", labelEn: "do not proxy the body", anyOf: ["тіло", "body", "внутрішн", "internal", "секрет", "secret"] }],
        sampleUk: "Беруть URL лише з allowlist https-хостів, не йдуть за редіректом на інший хост і не віддають сиру відповідь клієнту; blacklist одного метаданого IP і IMDSv2 не замінюють ці правила.",
        sampleEn: "You only fetch URLs from an allowlist of https hosts, you do not follow a redirect to another host, and you do not return the raw response to the client; blacklisting one metadata IP and IMDSv2 do not replace those rules.",
      },
      {
        slug: "ws-open-redirect",
        titleUk: "Відкритий редірект: ?next= на чужий домен краде сесію через фішинг",
        titleEn: "An open redirect: ?next= to a foreign domain steals a session through phishing",
        difficulty: 3,
        pointsUk: ["next — лише свій шлях або точний allowlist", "Наївне startsWith('/') обходять // і кодування", "OAuth redirect_uri — точний збіг"],
        pointsEn: ["next is only your path or an exact allowlist", "A naive startsWith('/') is bypassed by // and encoding", "An OAuth redirect_uri is an exact match"],
        conceptUk: "Після логіну додаток часто робить `redirect(req.query.next)`. Якщо `next` може бути `https://evil.example/`, користувач бачить ваш домен у першому кроці, а потрапляє на фішинг, який знімає токен з фрагмента чи просить пароль ще раз. Дозволяйте лише відносні шляхи на своєму origin (`/app/orders`) або суворий список абсолютних URL. Недостатньо перевірити, що рядок 'починається з /' — `//evil.example` і `/%5Cevil` обходять наївні перевірки. Логуйте відхилені next. OAuth `redirect_uri` має бути точним збігом, не префіксом.",
        conceptEn: "After login the app often does `redirect(req.query.next)`. If `next` can be `https://evil.example/`, the user sees your domain in the first step and lands on a phishing page that lifts a token from the fragment or asks for the password again. Allow only relative paths on your origin (`/app/orders`) or a strict list of absolute URLs. It is not enough to check that the string 'starts with /' — `//evil.example` and `/%5Cevil` bypass naive checks. Log rejected next values. An OAuth `redirect_uri` must be an exact match, not a prefix.",
        code: "function safeNext(n) {\n  if (typeof n === 'string' && n.startsWith('/') && !n.startsWith('//') && !n.includes('\\\\')) return n;\n  return '/app';\n}",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чим небезпечний redirect(next) при next=//evil.example?", promptEn: "Why is redirect(next) dangerous when next=//evil.example?", options: ["// — протокол-відносний URL, браузер піде на чужий хост", "// завжди залишається на вашому origin", "це блокує CSRF", "OAuth вимагає саме //"], correctIndex: 0, explanationUk: "Перевіряйте origin і шлях уважно.", explanationEn: "Check the origin and path carefully." },
          { kind: "fill", promptUk: "Допишіть параметр повернення після логіну, який треба валідувати", promptEn: "Fill in the after-login return parameter that must be validated", language: "javascript", code: "const target = safeNext(req.query.___); // only '/…' on this origin", accepted: ["next", "returnTo", "return_to", "redirect"], caseSensitive: true, explanationUk: "Типові імена: next, returnTo.", explanationEn: "Typical names: next, returnTo." },
          { kind: "read", promptUk: "Чому redirect_uri=https://app.example/callback/extra не можна приймати як префікс https://app.example/callback?", promptEn: "Why must you not accept redirect_uri=https://app.example/callback/extra as a prefix of https://app.example/callback?", language: "javascript", code: "// client registered https://app.example/callback", options: ["префікс може вказати на інший шлях або відкритий редірект на цьому хості", "OAuth забороняє точний збіг", "extra завжди той самий origin і безпечний", "префікс вимагає PKCE"], correctIndex: 0, explanationUk: "Точний зареєстрований URI.", explanationEn: "The exact registered URI." }
        ],
        whyUk: "Як безпечно повернути користувача на сторінку після логіну?",
        whyEn: "How do you safely return a user to a page after login?",
        ideas: [{ labelUk: "лише свій шлях", labelEn: "only your path", anyOf: ["next", "відносн", "relative", "origin", "шлях", "path"] }, { labelUk: "не // і не чужий хост", labelEn: "not // and not a foreign host", anyOf: ["//", "evil", "фішинг", "phish", "open"] }, { labelUk: "точний redirect_uri", labelEn: "an exact redirect_uri", anyOf: ["redirect_uri", "точн", "exact", "префікс", "prefix"] }],
        sampleUk: "Приймають лише відносний шлях свого origin або точний allowlist, відхиляють // і закодовані обходи, логують погані next; OAuth redirect_uri звіряють точним збігом, не префіксом.",
        sampleEn: "You accept only a relative path on your origin or an exact allowlist, you reject // and encoded bypasses, you log bad next values; an OAuth redirect_uri is checked with an exact match, not a prefix.",
      },
      {
        slug: "ws-csrf-samesite",
        titleUk: "CSRF у світі SameSite: не всі запити захищені печивом Lax",
        titleEn: "CSRF in a SameSite world: not every request is saved by Lax cookies",
        difficulty: 3,
        pointsUk: ["Руйнівні дії — не GET, навіть з Lax", "Токен або Origin на змінах, не лише SameSite", "Bearer у заголовку ≠ печиво сесії"],
        pointsEn: ["Destructive actions are not GET, even with Lax", "A token or Origin on mutations, not only SameSite", "A Bearer in a header is not a session cookie"],
        conceptUk: "SameSite=Lax зменшує класичний CSRF для POST з чужого сайту: браузер не надішле печиво. Але GET-навігація з Lax печиво все ще відправляє, тому руйнівні дії не можуть бути GET. Cross-site POST з SameSite=None (потрібне для деяких вбудованих віджетів) знову відкритий. Захист глибше: анти-CSRF токен або перевірка Origin/Referer на змінах, і не покладатись лише на Lax. Fetch з іншим origin без CORS-креденшалів печиво не додасть, але formal POST з форми — так, якщо SameSite це дозволяє. Для API на Bearer-токені в заголовку CSRF менш релевантний (заголовок сам по собі з чужої форми не поставити), доки токен не лежить у печиві.",
        conceptEn: "SameSite=Lax reduces classical CSRF for a POST from a foreign site: the browser will not send the cookie. But a GET navigation still sends a Lax cookie, so destructive actions cannot be GET. A cross-site POST with SameSite=None (needed for some embedded widgets) is open again. Deeper defence: an anti-CSRF token or an Origin/Referer check on mutations, and do not rely on Lax alone. A fetch from another origin without CORS credentials will not attach the cookie, but a formal POST from a form will, if SameSite allows it. For an API with a Bearer token in a header, CSRF is less relevant (a foreign form cannot set that header by itself), as long as the token is not also in a cookie.",
        code: "app.post('/pay', requireOrigin('https://app.example'), requireCsrf, handler);\n// never: app.get('/pay?amount=')",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому logout або transfer через GET небезпечні навіть при SameSite=Lax?", promptEn: "Why are logout or transfer via GET dangerous even with SameSite=Lax?", options: ["Lax надсилає печиво на міжсайтову GET-навігацію (клік по посиланню)", "Lax блокує всі GET", "GET не може змінити стан за визначенням HTTP у всіх додатках", "CSRF не буває на GET"], correctIndex: 0, explanationUk: "Зміни стану — POST/PUT/DELETE з захистом.", explanationEn: "State changes are POST/PUT/DELETE with protection." },
          { kind: "fill", promptUk: "Допишіть заголовок, який перевіряють на мутаціях", promptEn: "Fill in the header you check on mutations", language: "javascript", code: "if (req.get('___') !== 'https://app.example') deny();", accepted: ["Origin", "origin"], caseSensitive: true, explanationUk: "Origin (і запасний Referer) на змінах.", explanationEn: "Origin (and Referer as a fallback) on mutations." },
          { kind: "read", promptUk: "API з Authorization: Bearer у заголовку, без сесійного печива. Чи потрібен CSRF-токен як для форми?", promptEn: "An API with Authorization: Bearer in a header and no session cookie. Do you need a CSRF token the way a form does?", language: "javascript", code: "fetch('/api/pay', { headers: { Authorization: 'Bearer ' + t } })", options: ["зазвичай ні: чужа форма не поставить цей заголовок; небезпека з'являється, якщо токен ще й у печиві", "завжди так, SameSite тоді обов'язковий на Bearer", "Bearer у заголовку надсилається з будь-якої HTML-форми сам", "CSRF-токен замінює TLS"], correctIndex: 0, explanationUk: "Місце зберігання токена визначає CSRF.", explanationEn: "Where the token is stored decides CSRF." }
        ],
        whyUk: "Як захистити зміну стану (оплату), якщо сесія в печиві з SameSite=Lax?",
        whyEn: "How do you protect a state change (a payment) if the session is in a SameSite=Lax cookie?",
        ideas: [{ labelUk: "не GET", labelEn: "not GET", anyOf: ["get", "lax", "навігац", "navigat", "руйнівн", "destruct"] }, { labelUk: "токен або Origin", labelEn: "a token or Origin", anyOf: ["csrf", "токен", "token", "origin", "referer"] }, { labelUk: "не лише Lax", labelEn: "not only Lax", anyOf: ["samesite", "lax", "none", "печив", "cookie"] }],
        sampleUk: "Оплату роблять методом зміни стану, не GET, перевіряють CSRF-токен або Origin і не покладаються лише на SameSite=Lax; Bearer у заголовку без печива має інший профіль ризику.",
        sampleEn: "You make the payment a state-changing method, not GET, you check a CSRF token or Origin, and you do not rely on SameSite=Lax alone; a Bearer in a header with no cookie has a different risk profile.",
      }
    ],
    "Контрольна: SSRF і CSRF",
    "Exam: SSRF and CSRF",
    [
      { promptUk: "SSRF небезпечний тим, що сервер…", promptEn: "SSRF is dangerous because the server…", options: ["йде за URL атакуючого, зокрема до метаданих хмари", "завжди блокує 169.254 сам", "віддає лише зовнішні сайти", "не вміє HTTPS"], correctIndex: 0, explanationUk: "Allowlist, не blacklist одного IP.", explanationEn: "An allowlist, not a blacklist of one IP." },
      { promptUk: "Blacklist 169.254.169.254…", promptEn: "A blacklist of 169.254.169.254 is…", options: ["недостатній: редіректи, DNS rebinding, інші внутрішні адреси", "повний захист SSRF", "заміна https", "заборона allowlist"], correctIndex: 0, explanationUk: "Суворий список хостів.", explanationEn: "A strict host list." },
      { promptUk: "next=//evil.example — це…", promptEn: "next=//evil.example is…", options: ["відкритий редірект через протокол-відносний URL", "безпечний відносний шлях", "точний OAuth redirect_uri", "захист CSRF"], correctIndex: 0, explanationUk: "Не startsWith('/') наївно.", explanationEn: "Not a naive startsWith('/')." },
      { promptUk: "OAuth redirect_uri порівнюють…", promptEn: "An OAuth redirect_uri is compared as…", options: ["точний збіг, не префікс", "префікс хоста", "будь-який шлях на тому ж домені", "лише схему"], correctIndex: 0, explanationUk: "Як зареєстровано — так і є.", explanationEn: "Exactly as registered." },
      { promptUk: "Руйнівна дія через GET при Lax…", promptEn: "A destructive action via GET with Lax is…", options: ["вразлива: Lax надсилає печиво на міжсайтовий GET", "повністю захищена Lax", "неможлива в HTTP", "заміна Origin"], correctIndex: 0, explanationUk: "Зміни — не GET.", explanationEn: "Mutations are not GET." },
      { promptUk: "Bearer лише в заголовку, без печива…", promptEn: "A Bearer only in a header, with no cookie, is…", options: ["менш чутливий до класичного CSRF з форми", "ідентичний сесійному печиву", "привід вимкнути TLS", "заміна SameSite=None"], correctIndex: 0, explanationUk: "Чужа форма заголовок сама не поставить.", explanationEn: "A foreign form will not set the header by itself." }
    ],
  ),
  sectionUnit(
    "ws_csp_passkeys",
    "CSP, Trusted Types і ключі доступу",
    "CSP, Trusted Types, and passkeys",
    [
      {
        slug: "ws-csp-nonce",
        titleUk: "CSP з nonce: заборона чужих скриптів без 'повного вимкнення інлайну назавжди'",
        titleEn: "CSP with a nonce: blocking foreign scripts without 'banning all inline forever' on day one",
        difficulty: 3,
        pointsUk: ["Nonce на кожну відповідь, не unsafe-inline", "Report-Only спочатку, потім enforce", "CSP не замінює санітизацію й унікальний nonce не кешують глобально"],
        pointsEn: ["A nonce on every response, not unsafe-inline", "Report-Only first, then enforce", "CSP does not replace sanitization, and a unique nonce is not cached globally"],
        conceptUk: "Content-Security-Policy обмежує, звідки браузер може вантажити скрипти, стилі й кадри. `script-src 'unsafe-inline'` майже скасовує захист від XSS. Практичний шлях: `script-src 'nonce-…'` (випадковий nonce на кожну відповідь) і ті самі nonce на своїх тегах, плюс заборона `eval`. Заголовок шлють на HTML-відповідях послідовно; звіт `report-to` допомагає зловити порушення без глухого блокування на перший день (`Report-Only`). CSP не замінює санітизацію й не рятує, якщо nonce витікає в кешовану сторінку, спільну для всіх. Не ставте `*` у script-src. Для кадрів — `frame-ancestors`.",
        conceptEn: "Content-Security-Policy limits where the browser may load scripts, styles, and frames. `script-src 'unsafe-inline'` almost cancels XSS protection. A practical path: `script-src 'nonce-…'` (a random nonce on every response) and the same nonce on your tags, plus a ban on `eval`. The header is sent consistently on HTML responses; a `report-to` report helps catch violations without a hard block on day one (`Report-Only`). CSP does not replace sanitization and does not help if the nonce leaks into a cached page shared by everyone. Do not put `*` in script-src. For frames — `frame-ancestors`.",
        code: "Content-Security-Policy: script-src 'nonce-R4nd0m' 'strict-dynamic'; object-src 'none'; frame-ancestors 'self'",
        language: "http",
        retrieval: [
          { kind: "mcq", promptUk: "Чому один і той самий nonce на всіх сторінках у CDN-кеші небезпечний?", promptEn: "Why is the same nonce on every page in a CDN cache dangerous?", options: ["атакуючий, що побачив nonce, вставить свій скрипт із цим значенням на кешованій сторінці", "CSP забороняє CDN", "nonce має бути рядком 'unsafe-inline'", "кеш завжди унікальний"], correctIndex: 0, explanationUk: "Nonce — одноразовий на відповідь.", explanationEn: "A nonce is one-time per response." },
          { kind: "fill", promptUk: "Допишіть директиву джерел скриптів", promptEn: "Fill in the script-source directive", language: "http", code: "Content-Security-Policy: ___-src 'nonce-R4nd0m' 'strict-dynamic'", accepted: ["script"], caseSensitive: true, explanationUk: "script-src задає джерела скриптів.", explanationEn: "script-src sets script sources." },
          { kind: "read", promptUk: "Навіщо почати з Content-Security-Policy-Report-Only?", promptEn: "Why start with Content-Security-Policy-Report-Only?", language: "http", code: "Content-Security-Policy-Report-Only: script-src 'nonce-abc'; report-to csp", options: ["побачити порушення без поломки сайту, потім увімкнути enforce", "Report-Only вже блокує XSS сильніше за enforce", "без цього nonce не працює", "це вимикає XSS"], correctIndex: 0, explanationUk: "Спочатку телеметрія, потім блокування.", explanationEn: "Telemetry first, then blocking." }
        ],
        whyUk: "Як увімкнути CSP на наявному сайті з кількома інлайн-скриптами, не зламавши його в перший день?",
        whyEn: "How do you turn on CSP on an existing site with several inline scripts without breaking it on day one?",
        ideas: [{ labelUk: "nonce, не unsafe-inline", labelEn: "a nonce, not unsafe-inline", anyOf: ["nonce", "unsafe-inline", "script-src", "eval"] }, { labelUk: "Report-Only", labelEn: "Report-Only", anyOf: ["report", "only", "порушен", "violation", "enforce"] }, { labelUk: "унікальний на відповідь", labelEn: "unique per response", anyOf: ["кеш", "cache", "унікальн", "unique", "відповід", "response"] }],
        sampleUk: "Ставлять script-src з унікальним nonce на кожну відповідь, інлайн переводять на цей nonce, спочатку Report-Only, потім enforce; unsafe-inline і спільний кешований nonce майже скасовують захист.",
        sampleEn: "You set script-src with a unique nonce on every response, you move inline scripts onto that nonce, you start with Report-Only and then enforce; unsafe-inline and a shared cached nonce almost cancel the protection.",
      },
      {
        slug: "ws-trusted-types",
        titleUk: "Trusted Types: заборона присвоїти рядок у innerHTML 'випадково'",
        titleEn: "Trusted Types: forbidding a raw string assignment to innerHTML 'by accident'",
        difficulty: 3,
        pointsUk: ["Сирий рядок у innerHTML більше не пройде", "Одна справжня політика санітизації", "Політика-ідентичність марна"],
        pointsEn: ["A raw string in innerHTML will no longer pass", "One real sanitizing policy", "An identity policy is worthless"],
        conceptUk: "Багато XSS — це `el.innerHTML = userInput`. Trusted Types (CSP `require-trusted-types-for 'script'`) змушують браузер прийняти лише об'єкт, створений зареєстрованою політикою, а не сирий рядок. Політика одна в додатку: санітизація (DOMPurify.createHTML) або шаблон. Обхід `innerHTML` через `document.write` і `eval` теж закривають. Впровадження починають із report, потім ламають небезпечні присвоєння в CI. Це не замінює CSP і серверні заголовки; це остання лінія в DOM. Політика, що повертає вхід як є (`createHTML: s => s`), нічого не дає — і це видно на рев'ю.",
        conceptEn: "A lot of XSS is `el.innerHTML = userInput`. Trusted Types (CSP `require-trusted-types-for 'script'`) make the browser accept only an object created by a registered policy, not a raw string. There is one policy in the app: sanitization (DOMPurify.createHTML) or a template. Bypasses via `document.write` and `eval` are closed too. You start with a report, then you break unsafe assignments in CI. This does not replace CSP and server headers; it is the last line in the DOM. A policy that returns the input as-is (`createHTML: s => s`) gives nothing — and that shows up in review.",
        code: "trustedTypes.createPolicy('app', { createHTML: (s) => DOMPurify.sanitize(s) });\nel.innerHTML = policy.createHTML(userInput);",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому політика createHTML: s => s не захищає?", promptEn: "Why does a createHTML: s => s policy not protect you?", options: ["вона знову дозволяє будь-який рядок, лише обгорнутий типом", "Trusted Types забороняють політики", "DOMPurify тоді вимикається", "innerHTML більше не існує"], correctIndex: 0, explanationUk: "Політика має санітизувати або відхиляти.", explanationEn: "The policy must sanitize or reject." },
          { kind: "fill", promptUk: "Допишіть небезпечне присвоєння, яке Trusted Types блокує для рядка", promptEn: "Fill in the dangerous assignment Trusted Types block for a string", language: "javascript", code: "el.___ = userInput; // TypeError if Trusted Types are enforced", accepted: ["innerHTML"], caseSensitive: true, explanationUk: "innerHTML не приймає сирий рядок.", explanationEn: "innerHTML does not accept a raw string." },
          { kind: "read", promptUk: "З чого почати впровадження Trusted Types на великому фронтенді?", promptEn: "How do you start Trusted Types on a large frontend?", language: "http", code: "Content-Security-Policy-Report-Only: require-trusted-types-for 'script'", options: ["зі звітів про порушення, потім виправлення точок присвоєння й enforce", "з політики-ідентичності в проді одразу без звітів", "з вимикання CSP", "з document.write скрізь"], correctIndex: 0, explanationUk: "Спочатку видно всі небезпечні місця.", explanationEn: "First you see every unsafe sink." }
        ],
        whyUk: "Як зробити так, щоб випадковий innerHTML = userInput не став XSS?",
        whyEn: "How do you make a casual innerHTML = userInput not become XSS?",
        ideas: [{ labelUk: "Trusted Types", labelEn: "Trusted Types", anyOf: ["trusted", "types", "require-trusted"] }, { labelUk: "політика санітизації", labelEn: "a sanitizing policy", anyOf: ["dompurify", "createHTML", "саніт", "sanit", "політик", "policy"] }, { labelUk: "не ідентичність", labelEn: "not an identity", anyOf: ["s => s", "ідентич", "identity", "рядок", "string", "report"] }],
        sampleUk: "Вмикають Trusted Types, щоб innerHTML приймав лише об'єкт політики з санітизацією (не сирий рядок і не політику-ідентичність), починають із Report-Only і закривають інші стоки; це остання лінія в DOM поруч із CSP.",
        sampleEn: "You turn on Trusted Types so innerHTML only accepts a policy object that sanitizes (not a raw string and not an identity policy), you start with Report-Only, and you close other sinks; that is the last line in the DOM next to CSP.",
      },
      {
        slug: "ws-passkeys-webauthn",
        titleUk: "Passkeys: секрет лишається на пристрої, фішинг не отримує пароль",
        titleEn: "Passkeys: the secret stays on the device, phishing does not get a password",
        difficulty: 3,
        pointsUk: ["Приватний ключ не йде на сервер і не на фішинг", "Челендж одноразовий, origin перевіряється", "Кілька ключів і відкликання, запас не лише SMS"],
        pointsEn: ["The private key does not go to the server or to phishing", "The challenge is one-time, the origin is checked", "Several keys and revocation, a backup that is not only SMS"],
        conceptUk: "Passkey (WebAuthn) — ключова пара: приватний ключ не покидає автентифікатор (телефон, ключ, TPM), сервер зберігає лише публічний ключ і credential id. Вхід — підпис челенджу для конкретного origin; фішинговий сайт інший origin і підпис не підійде. Це сильніше за пароль+SMS, який можна виманити. Реалізація: реєстрація (attestation за потреби), автентифікація, запасний шлях (не слабкий SMS як єдиний), кілька ключів на акаунт, можливість відкликати втрачений. Челендж має бути криптографічно випадковим і одноразовим. Не підміняйте origin у 'допоміжному' iframe без чітких правил Related Origin Requests.",
        conceptEn: "A passkey (WebAuthn) is a key pair: the private key does not leave the authenticator (a phone, a security key, a TPM), the server stores only the public key and a credential id. Sign-in is a signature of a challenge for a concrete origin; a phishing site is a different origin and the signature will not fit. That is stronger than a password+SMS, which can be tricked out of the user. Implementation: registration (attestation if needed), authentication, a backup path (not weak SMS as the only one), several keys per account, a way to revoke a lost one. The challenge must be cryptographically random and one-time. Do not substitute the origin in a 'helper' iframe without clear Related Origin Requests rules.",
        code: "// server stores: credentialId, publicKey, signCount\n// auth: random one-time challenge, verify signature + origin + rpId",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому passkey не спрацює на https://app.examp1e.com (фішинг)?", promptEn: "Why will a passkey not work on https://app.examp1e.com (phishing)?", options: ["підпис прив'язаний до справжнього origin; інший хост не отримає валідного твердження", "браузер надсилає приватний ключ на будь-який схожий домен", "WebAuthn ігнорує origin", "фішинг завжди має ваш TPM"], correctIndex: 0, explanationUk: "Origin у WebAuthn — частина протоколу.", explanationEn: "The origin is part of the WebAuthn protocol." },
          { kind: "fill", promptUk: "Допишіть, що зберігає сервер від passkey", promptEn: "Fill in what the server stores from a passkey", language: "sql", code: "INSERT INTO creds(user_id, credential_id, ____key) VALUES ($1, $2, $3);", accepted: ["public"], caseSensitive: true, explanationUk: "Лише публічний ключ і id, не приватний.", explanationEn: "Only the public key and id, not the private one." },
          { kind: "read", promptUk: "Чому один-єдиний запасний шлях 'надішлемо SMS' послаблює акаунт із passkey?", promptEn: "Why does a single backup path of 'we will send an SMS' weaken a passkey account?", language: "javascript", code: "// account recovery: SMS code only", options: ["атакуючий цілить у слабше відновлення, не в ключ", "SMS сильніший за WebAuthn", "відкликати ключ тоді неможливо", "челендж стає непотрібним"], correctIndex: 0, explanationUk: "Відновлення — частина моделі загроз.", explanationEn: "Recovery is part of the threat model." }
        ],
        whyUk: "Чому passkey краще захищає від фішингу, ніж пароль, і що мусить робити сервер?",
        whyEn: "Why does a passkey protect against phishing better than a password, and what must the server do?",
        ideas: [{ labelUk: "ключ на пристрої", labelEn: "the key on the device", anyOf: ["приватн", "private", "автентифікатор", "authenticator", "пристро", "device"] }, { labelUk: "origin і челендж", labelEn: "origin and challenge", anyOf: ["origin", "челендж", "challenge", "фішинг", "phish"] }, { labelUk: "публічний ключ і відкликання", labelEn: "a public key and revocation", anyOf: ["публічн", "public", "відклик", "revok", "sms", "запас", "backup"] }],
        sampleUk: "Сервер зберігає лише публічний ключ, приватний лишається на пристрої й підписує одноразовий челендж для свого origin, тож фішинг інший хост не отримує секрету; потрібні кілька ключів, відкликання й запас, сильніший за один SMS.",
        sampleEn: "The server stores only the public key, the private key stays on the device and signs a one-time challenge for its origin, so a phishing host does not get the secret; you need several keys, revocation, and a backup stronger than SMS alone.",
      }
    ],
    "Контрольна: CSP і passkeys",
    "Exam: CSP and passkeys",
    [
      { promptUk: "unsafe-inline у script-src…", promptEn: "unsafe-inline in script-src…", options: ["майже скасовує захист від XSS", "рівний nonce", "обов'язковий для Trusted Types", "блокує eval"], correctIndex: 0, explanationUk: "Беріть nonce.", explanationEn: "Use a nonce." },
      { promptUk: "Nonce в глобальному CDN-кеші…", promptEn: "A nonce in a global CDN cache is…", options: ["небезпечний: значення повторюється", "найкраща практика", "заміна Report-Only", "обов'язковий *"], correctIndex: 0, explanationUk: "Унікальний на відповідь.", explanationEn: "Unique per response." },
      { promptUk: "Trusted Types блокують…", promptEn: "Trusted Types block…", options: ["присвоєння сирого рядка в innerHTML", "усі CSP-заголовки", "passkeys", "заголовок Origin"], correctIndex: 0, explanationUk: "Потрібен об'єкт політики.", explanationEn: "A policy object is required." },
      { promptUk: "Політика createHTML: s => s…", promptEn: "A createHTML: s => s policy is…", options: ["марна: будь-який рядок знову дозволений", "еквівалент DOMPurify", "enforce CSP", "заміна nonce"], correctIndex: 0, explanationUk: "Треба санітизувати або відхиляти.", explanationEn: "You must sanitize or reject." },
      { promptUk: "Passkey на фішинговому origin…", promptEn: "A passkey on a phishing origin…", options: ["не видасть валідний підпис для вашого сайту", "надішле приватний ключ", "замінить SMS завжди гірше", "ігнорує челендж"], correctIndex: 0, explanationUk: "Origin — частина протоколу.", explanationEn: "The origin is part of the protocol." },
      { promptUk: "Єдине відновлення через SMS у акаунта з passkey…", promptEn: "SMS as the only recovery for a passkey account…", options: ["стає слабким місцем, яке атакують замість ключа", "посилює WebAuthn", "замінює відкликання", "робить челендж довговічним"], correctIndex: 0, explanationUk: "Модель загроз включає recovery.", explanationEn: "The threat model includes recovery." }
    ],
  ),
  sectionUnit(
    "ws_oauth_supply",
    "OAuth PKCE і ланцюг постачання npm",
    "OAuth PKCE and the npm supply chain",
    [
      {
        slug: "ws-oauth-pkce",
        titleUk: "PKCE: публічний клієнт не носить client_secret у мобільному додатку",
        titleEn: "PKCE: a public client does not carry a client_secret in a mobile app",
        difficulty: 3,
        pointsUk: ["PKCE замінює секрет у публічному клієнті", "S256, state, точний redirect_uri", "Не implicit і не refresh у localStorage наосліп"],
        pointsEn: ["PKCE replaces a secret in a public client", "S256, state, an exact redirect_uri", "Not implicit, and not a refresh token in localStorage blindly"],
        conceptUk: "Мобільний чи SPA-клієнт не може зберегти client_secret: його витягнуть із пакета. PKCE (Proof Key for Code Exchange) додає verifier і його хеш challenge: авторизаційний код без verifier марний, навіть якщо його перехопили з редіректу. Використовуйте S256, одноразовий state і точний redirect_uri. Authorization Code + PKCE — рекомендований потік; implicit (`token` у фрагменті URL) застарів. Сервер обміну коду (або власний BFF) тримає токени обережно; SPA не кладе refresh у localStorage без розуміння XSS. Не логіть код і verifier.",
        conceptEn: "A mobile or SPA client cannot keep a client_secret: it will be pulled out of the package. PKCE (Proof Key for Code Exchange) adds a verifier and its hash challenge: an authorization code without the verifier is useless, even if it was stolen from the redirect. Use S256, a one-time state, and an exact redirect_uri. Authorization Code + PKCE is the recommended flow; implicit (`token` in the URL fragment) is obsolete. The code-exchange server (or your own BFF) holds tokens carefully; an SPA does not put a refresh token in localStorage without understanding XSS. Do not log the code or the verifier.",
        code: "code_challenge = BASE64URL(SHA256(verifier))\n# exchange: code + verifier  (no client_secret for a public client)",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Чому client_secret у мобільному APK — погана ідея?", promptEn: "Why is a client_secret in a mobile APK a bad idea?", options: ["секрет можна витягти з пакета; для публічних клієнтів є PKCE", "мобільні клієнти не вміють HTTPS", "PKCE вимагає секрет обов'язково", "APK шифрує секрет від усіх назавжди"], correctIndex: 0, explanationUk: "Публічний клієнт не тримає секрет.", explanationEn: "A public client does not hold a secret." },
          { kind: "fill", promptUk: "Допишіть метод хешу PKCE, який треба обирати", promptEn: "Fill in the PKCE hash method you should choose", language: "http", code: "code_challenge_method=___", accepted: ["S256"], caseSensitive: true, explanationUk: "S256, не plain.", explanationEn: "S256, not plain." },
          { kind: "read", promptUk: "Чим поганий implicit-потік із токеном у фрагменті URL?", promptEn: "What is wrong with the implicit flow with a token in the URL fragment?", language: "http", code: "https://app.example/cb#access_token=eyJ...", options: ["токен потрапляє в історію, логи реферера й розширення; код+PKCE безпечніший", "фрагмент ніколи не видно JavaScript", "implicit вимагає S256 обов'язково", "це єдиний дозволений потік для SPA"], correctIndex: 0, explanationUk: "Authorization Code + PKCE.", explanationEn: "Authorization Code + PKCE." }
        ],
        whyUk: "Як авторизувати мобільний додаток без client_secret у пакеті?",
        whyEn: "How do you authorize a mobile app without a client_secret in the package?",
        ideas: [{ labelUk: "PKCE verifier", labelEn: "a PKCE verifier", anyOf: ["pkce", "verifier", "challenge", "секрет", "secret"] }, { labelUk: "S256 і state", labelEn: "S256 and state", anyOf: ["S256", "state", "redirect_uri"] }, { labelUk: "не implicit", labelEn: "not implicit", anyOf: ["implicit", "fragment", "localStorage", "refresh", "лог", "log"] }],
        sampleUk: "Використовують Authorization Code з PKCE (S256), одноразовим state і точним redirect_uri, не кладуть client_secret у APK і не беруть implicit із токеном у фрагменті.",
        sampleEn: "You use Authorization Code with PKCE (S256), a one-time state, and an exact redirect_uri, you do not put a client_secret in the APK, and you do not use implicit with a token in the fragment.",
      },
      {
        slug: "ws-token-theft",
        titleUk: "Крадіжка токена: короткий access, оборот refresh, відкликання",
        titleEn: "Token theft: a short access token, a rotating refresh, and revocation",
        difficulty: 3,
        pointsUk: ["Короткий access, оборотний refresh", "Повтор старого refresh — відкликання родини", "Перевіряйте aud/iss; logout на сервері"],
        pointsEn: ["A short access token, a rotating refresh", "Reuse of an old refresh revokes the family", "Check aud/iss; logout on the server"],
        conceptUk: "Якщо access-токен живе день і його вкрали з лога чи XSS, атакуючий ходить цілий день. Робіть access коротким (хвилини), refresh — оборотним (rotation): кожне оновлення видає нову пару, старий refresh стає недійсним; повторне використання старого — сигнал крадіжки, і всю родину токенів відкликають. Зберігання: httpOnly Secure печиво через BFF, або в пам'яті SPA з розумінням ризику перезавантаження; не localStorage як замовчування. Аудиторія й issuer перевіряються на API (`aud`, `iss`, підпис). Logout відкликає refresh на сервері, не лише чистить UI.",
        conceptEn: "If an access token lives a day and is stolen from a log or XSS, the attacker walks around all day. Make access short (minutes), and the refresh rotating: every refresh issues a new pair, the old refresh becomes invalid; reuse of the old one is a theft signal, and the whole token family is revoked. Storage: an httpOnly Secure cookie through a BFF, or in SPA memory with an understanding of the reload risk; not localStorage as the default. Audience and issuer are checked at the API (`aud`, `iss`, the signature). Logout revokes the refresh on the server, it does not only clear the UI.",
        code: "// access TTL = 10 min; refresh rotates; reuse of old refresh => revoke family\n// API: verify iss, aud, sig, exp",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Що означає повторне використання вже оборотеного refresh-токена?", promptEn: "What does reuse of an already rotated refresh token mean?", options: ["ймовірна крадіжка: треба відкликати всю родину сесій", "нормальний повторний логін", "треба подовжити access до доби", "підпис JWT можна не перевіряти"], correctIndex: 0, explanationUk: "Rotation виявляє витік.", explanationEn: "Rotation detects a leak." },
          { kind: "fill", promptUk: "Допишіть поле аудиторії JWT, яке перевіряє API", promptEn: "Fill in the JWT audience claim the API checks", language: "javascript", code: "assert(payload.___ === 'api://payments')", accepted: ["aud"], caseSensitive: true, explanationUk: "aud має збігатись із цим API.", explanationEn: "aud must match this API." },
          { kind: "read", promptUk: "Чому 'logout' лише через localStorage.removeItem('token') недостатній?", promptEn: "Why is a 'logout' that only does localStorage.removeItem('token') not enough?", language: "javascript", code: "localStorage.removeItem('token'); navigate('/login')", options: ["refresh на сервері лишається чинним, його треба відкликати", "localStorage сам відкликає токен на IdP", " aud перевіряється в localStorage", "короткий access тоді стає вічним"], correctIndex: 0, explanationUk: "Сервер тримає стан refresh.", explanationEn: "The server holds the refresh state." }
        ],
        whyUk: "Як зменшити шкоду, якщо access-токен витік у лог, і як помітити крадіжку refresh?",
        whyEn: "How do you reduce harm if an access token leaked into a log, and how do you notice refresh theft?",
        ideas: [{ labelUk: "короткий access", labelEn: "a short access token", anyOf: ["коротк", "short", "хвилин", "minute", "access"] }, { labelUk: "ротація refresh", labelEn: "refresh rotation", anyOf: ["ротац", "rotat", "refresh", "родин", "family", "повтор", "reuse"] }, { labelUk: "відкликання на logout", labelEn: "revocation on logout", anyOf: ["відклик", "revok", "logout", "aud", "iss"] }],
        sampleUk: "Access роблять коротким, refresh оборотною парою: повтор старого відкликає всю родину; logout відкликає на сервері, API перевіряє aud і iss, токен не кладуть у localStorage за замовчуванням.",
        sampleEn: "You make access short and the refresh a rotating pair: reuse of the old one revokes the whole family; logout revokes on the server, the API checks aud and iss, and the token is not put in localStorage by default.",
      },
      {
        slug: "ws-npm-install",
        titleUk: "npm install — це виконання чужого коду: пін, audit, ignore-scripts",
        titleEn: "npm install is running someone else's code: a pin, an audit, ignore-scripts",
        difficulty: 3,
        pointsUk: ["Install-скрипти — виконання коду; ignore-scripts у CI", "Lock, review омонімів, обмежений токен", "Audit з тріажем, не latest у проді"],
        pointsEn: ["Install scripts are code execution; ignore-scripts in CI", "A lock, a review of look-alikes, a limited token", "An audit with triage, not latest in prod"],
        conceptUk: "Пакет у реєстрі може в install-скрипті вкрасти токени CI (`preinstall`). Захист: lock-файл і перевірена збірка, `--ignore-scripts` у CI де можливо, обмежений токен реєстру, review нових залежностей (несподіваний мейнтейнер, пакет-омонім — typosquatting). `npm audit` без тріажу — шум; критичне з експлойтом — термін. Підпис provenance (npm provenance) перевіряйте для критичних пакетів. Не публікуйте `.env` і не тримайте `NPM_TOKEN` з правом публікації на pull-запитах із форків. Оновлення залежності — PR із тестами, не `latest` у проді.",
        conceptEn: "A package in the registry can steal CI tokens in an install script (`preinstall`). Defence: a lock file and a verified build, `--ignore-scripts` in CI where possible, a limited registry token, and a review of new dependencies (a surprising maintainer, a look-alike package — typosquatting). `npm audit` without triage is noise; a critical with an exploit gets a deadline. Check provenance signatures for critical packages. Do not publish `.env`, and do not keep an `NPM_TOKEN` with publish rights on pull requests from forks. A dependency update is a PR with tests, not `latest` in prod.",
        code: "npm ci --ignore-scripts\n# NPM_TOKEN: read-only on pull_request; publish only on a trusted release job",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Навіщо в CI часто ставлять npm ci --ignore-scripts?", promptEn: "Why does CI often run npm ci --ignore-scripts?", options: ["щоб postinstall чужого пакета не виконувався з токенами збірки", "щоб вимкнути lock-файл", "це замінює audit", "ignore-scripts забороняє TypeScript"], correctIndex: 0, explanationUk: "Менша поверхня під час встановлення.", explanationEn: "A smaller surface during install." },
          { kind: "fill", promptUk: "Допишіть файл зафіксованих версій, без якого збірка плаває", promptEn: "Fill in the pinned-versions file without which the build floats", language: "bash", code: "npm ci   # requires package-___", accepted: ["lock.json"], caseSensitive: true, explanationUk: "package-lock.json фіксує граф.", explanationEn: "package-lock.json pins the graph." },
          { kind: "read", promptUk: "Чому NPM_TOKEN з правом publish на CI форка небезпечний?", promptEn: "Why is an NPM_TOKEN with publish rights on a fork's CI dangerous?", language: "yaml", code: "# GitHub Actions: pull_request from a fork has the token", options: ["автор форка може витягти токен і опублікувати пакет від вашого імені", "форки не вміють npm", "publish-токен працює лише локально", "lock-файл блокує токен"], correctIndex: 0, explanationUk: "Найменші права й недовіра до форків.", explanationEn: "Least privilege and no trust in forks." }
        ],
        whyUk: "Як ставити залежності в CI, щоб чужий preinstall не вкрав токен публікації?",
        whyEn: "How do you install dependencies in CI so a foreign preinstall does not steal a publish token?",
        ideas: [{ labelUk: "ignore-scripts і lock", labelEn: "ignore-scripts and a lock", anyOf: ["ignore-scripts", "lock", "npm ci", "preinstall"] }, { labelUk: "обмежений токен", labelEn: "a limited token", anyOf: ["токен", "token", "publish", "форк", "fork", "права", "privilege"] }, { labelUk: "рев'ю й audit", labelEn: "review and audit", anyOf: ["рев", "review", "typo", "audit", "provenance", "latest"] }],
        sampleUk: "У CI ставлять npm ci з lock-файлом і --ignore-scripts, токен без права publish на форках, нові пакети рев'юють проти омонімів, audit тріажать, у прод не пускають latest.",
        sampleEn: "In CI you run npm ci with a lock file and --ignore-scripts, a token without publish rights on forks, you review new packages against look-alikes, you triage the audit, and you do not ship latest to prod.",
      }
    ],
    "Контрольна: OAuth і npm",
    "Exam: OAuth and npm",
    [
      { promptUk: "client_secret у APK…", promptEn: "A client_secret in an APK is…", options: ["витягується з пакета; публічному клієнту потрібен PKCE", "безпечний сховок", "заміна S256", "обов'язковий для мобільних"], correctIndex: 0, explanationUk: "Публічний клієнт без секрету.", explanationEn: "A public client has no secret." },
      { promptUk: "Рекомендований потік для SPA й мобільних…", promptEn: "The recommended flow for SPAs and mobile is…", options: ["Authorization Code + PKCE", "implicit із токеном у фрагменті", "пароль у URL", "client_secret у репо"], correctIndex: 0, explanationUk: "S256 і точний redirect_uri.", explanationEn: "S256 and an exact redirect_uri." },
      { promptUk: "Повтор уже оборотеного refresh…", promptEn: "Reuse of an already rotated refresh token is…", options: ["сигнал крадіжки: відкликають родину", "нормальне оновлення", "привід подовжити access до доби", "ігнорується"], correctIndex: 0, explanationUk: "Rotation виявляє витік.", explanationEn: "Rotation detects a leak." },
      { promptUk: "Logout лише в UI без відкликання на сервері…", promptEn: "A UI-only logout without server revocation is…", options: ["недостатній: refresh лишається чинним", "повний захист", "заміна aud", "коротший access"], correctIndex: 0, explanationUk: "Відкликайте на сервері.", explanationEn: "Revoke on the server." },
      { promptUk: "preinstall у пакеті npm це…", promptEn: "A preinstall script in an npm package is…", options: ["виконання чужого коду під час install", "лише документація", "заміна lock", "перевірка aud"], correctIndex: 0, explanationUk: "ignore-scripts у CI, де можна.", explanationEn: "ignore-scripts in CI where possible." },
      { promptUk: "NPM_TOKEN із publish на CI форка…", promptEn: "An NPM_TOKEN with publish on a fork's CI is…", options: ["ризик крадіжки й публікації від вашого імені", "рекомендована практика", "блокується lock-файлом сам", "потрібний для npm ci"], correctIndex: 0, explanationUk: "Найменші права.", explanationEn: "Least privilege." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandWebSecurity(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
