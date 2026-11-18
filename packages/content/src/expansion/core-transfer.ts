import type { CourseContent } from "../types.js";
import { expandCourse } from "./factory.js";
import { choice, taught } from "./applied-capstones.js";

type Check = [string, string, string[], string[], string, string];
type Case = {
  unit: string;
  slug: string;
  titleUk: string;
  titleEn: string;
  conceptUk: string;
  conceptEn: string;
  checks: [Check, Check, Check];
};

const CASES: Record<string, Case> = {
  programming: {
    unit: "qa", slug: "pr-transfer-release", titleUk: "Простежте зміну від форми до релізу", titleEn: "Trace a change from form to release",
    conceptUk: "Команда додає поле кількості до замовлення. Простежте значення від HTML label і валідації в браузері через API до обмеження в базі. Запишіть приймальні випадки до реалізації: порожнє поле, нуль, допустиме число та повторне надсилання. Реліз готовий лише тоді, коли перевірено весь шлях і помилки можна виправити.",
    conceptEn: "A team adds a quantity field to an order. Trace its value from the HTML label and browser validation through the API to a database constraint. Define acceptance cases before implementation: empty input, zero, a valid number, and repeated submission. The release is ready only when the full path and repairable errors are checked.",
    checks: [
      ["Де перевіряти, що кількість додатна?", "Where must positive quantity be enforced?", ["У API та обмеженні бази", "Лише кольором поля", "Лише в CSS", "Лише в README"], ["At the API and database constraint", "Only by field colour", "Only in CSS", "Only in the README"], "Клієнтську перевірку можна обійти.", "Client validation can be bypassed."],
      ["Який тест виявить злам між формою та API?", "Which test detects a broken form-to-API contract?", ["Надіслати форму та перевірити записану кількість", "Перевірити тільки заголовок сторінки", "Порахувати CSS класи", "Перевірити назву гілки"], ["Submit the form and assert the stored quantity", "Check only the page title", "Count CSS classes", "Check the branch name"], "Перевірка має пройти через межу компонентів.", "The check must cross the component boundary."],
      ["Після тайм-ауту користувач повторює замовлення. Що перевірити перед релізом?", "A user retries after a timeout. What must be checked before release?", ["Повтор не створює друге замовлення", "Кнопка стала синьою", "Запит завжди триває секунду", "У таблиці немає індексу"], ["The retry does not create a second order", "The button turns blue", "The request always takes one second", "The table has no index"], "Невідома відповідь не повинна подвоювати дію.", "An unknown response must not duplicate the action."],
    ],
  },
  typescript: {
    unit: "this_parameters", slug: "ts-transfer-api-result", titleUk: "Звузьте результат версійного API", titleEn: "Narrow a versioned API result",
    conceptUk: "API повертає {ok:true,data} або {ok:false,error}. Після додавання нового коду помилки клієнт має явно його обробити. Розрізнювальне поле ok звужує union; never у вичерпній гілці показує пропущений варіант. Generic зберігає тип data, але не замінює перевірку JSON на межі мережі.",
    conceptEn: "An API returns {ok:true,data} or {ok:false,error}. A new error variant must be handled explicitly. The ok discriminant narrows the union; a never check reveals a missing variant. A generic preserves the data type, but it does not validate JSON at the network boundary.",
    checks: [
      ["Яке поле звузить union без приведення типу?", "Which field narrows the union without a cast?", ["ok", "data.length", "typeof response", "as Success"], ["ok", "data.length", "typeof response", "as Success"], "Спільний дискримінант розділяє гілки.", "The common discriminant separates the branches."],
      ["Додали error.kind = rate_limited. Що має спіймати пропущену обробку?", "A rate_limited error was added. What catches an unhandled branch?", ["Вичерпна перевірка never", "as any", "Необов'язковий catch без тіла", "Видалення union"], ["An exhaustive never check", "as any", "An empty optional catch", "Removing the union"], "Вичерпність перевіряється компілятором.", "The compiler checks exhaustiveness."],
      ["Сервер надіслав невідомий JSON. Чи гарантує generic його форму?", "The server sent unknown JSON. Does a generic guarantee its shape?", ["Ні, потрібна перевірка на межі", "Так, тип завжди змінює мережеві байти", "Так, якщо назва T довга", "Ні, JSON не можна прочитати"], ["No, validate at the boundary", "Yes, types change network bytes", "Yes, if T has a long name", "No, JSON cannot be read"], "Типи TypeScript не перевіряють дані під час виконання.", "TypeScript types do not validate runtime data."],
    ],
  },
  html_semantics: {
    unit: "metadata_social", slug: "html-transfer-service-form", titleUk: "Відновіть помилку в заявці", titleEn: "Repair a public-service form error",
    conceptUk: "У заявці на послугу користувач надсилає форму з помилковим номером. Після відповіді сервера збережіть заповнені поля, покажіть текстову помилку біля відповідного input та переведіть фокус до підсумку помилок. label пов'язує назву поля з input; заголовки й основна область дають зрозумілу структуру сторінки.",
    conceptEn: "A public-service form is submitted with an invalid reference number. After the server responds, retain entered values, show an error beside its input, and move focus to an error summary. A label associates the field name with the input; headings and main content give the page a clear structure.",
    checks: [
      ["Який елемент пов'язує текст назви з полем?", "Which element associates a field name with its input?", ["label з for=id поля", "div без атрибутів", "Порожній span", "footer"], ["label with for=the input id", "A div without attributes", "An empty span", "A footer"], "Явний label дає полю доступну назву.", "An explicit label gives the field an accessible name."],
      ["Після помилки сервера куди перевести фокус?", "Where should focus move after the server error?", ["До підсумку помилок з посиланням на поле", "На логотип", "За межі документа", "На випадкову кнопку"], ["To an error summary linking to the field", "To the logo", "Outside the document", "To a random button"], "Підсумок дає шлях до виправлення.", "The summary provides a repair path."],
      ["Що зберегти після невдалого надсилання?", "What should be retained after a failed submission?", ["Уже введені коректні значення", "Лише колір кнопки", "Тільки журнал сервера", "Жодне поле"], ["Previously entered valid values", "Only the button colour", "Only the server log", "No fields"], "Повторне введення всього ускладнює виправлення.", "Retyping every value makes correction harder."],
    ],
  },
  css_layout: {
    unit: "subgrid_has_snap", slug: "css-transfer-dashboard", titleUk: "Збережіть панель на вузькому екрані", titleEn: "Keep a dashboard usable on a narrow screen",
    conceptUk: "Панель порівняння має картки з довгими назвами й таблицю. Перевірте ширину контейнера, а не лише viewport: компонент може бути вузьким у бічній колонці. Використайте minmax(0,1fr) для стискання колонок, явний горизонтальний прокрут для широкої таблиці та тест при 200% масштабі без обрізання керування.",
    conceptEn: "A comparison dashboard has long card titles and a table. Check container width, not only viewport width: the component can be narrow in a sidebar. Use minmax(0,1fr) for shrinkable tracks, explicit horizontal scrolling for a wide table, and test at 200% zoom without clipping controls.",
    checks: [
      ["Панель вузька у бічній колонці широкого екрана. Що вимірювати?", "The dashboard is narrow in a sidebar on a wide screen. What should drive its layout?", ["Ширина контейнера", "Лише ширина viewport", "Кількість шрифтів", "Колір фону"], ["Container width", "Only viewport width", "Number of fonts", "Background colour"], "Компонент реагує на фактично доступний простір.", "The component responds to the space it actually has."],
      ["Довгий заголовок розпирає Grid. Який трек дозволить стиснення?", "A long title overflows a grid. Which track allows shrinking?", ["minmax(0,1fr)", "1fr без мінімуму за будь-яких умов", "100vw", "max-content для всіх колонок"], ["minmax(0,1fr)", "1fr without considering its minimum", "100vw", "max-content for every track"], "Нульовий мінімум дозволяє колонці стискатися.", "A zero minimum permits the track to shrink."],
      ["Таблиця ширша за телефон. Яка перевірка потрібна?", "The table is wider than a phone. What should be checked?", ["Горизонтальний прокрут таблиці та доступність кнопок при 200%", "Сховати всі стовпці без пояснення", "Зменшити текст до 8px", "Вимкнути масштаб"], ["Table scrolling and usable controls at 200% zoom", "Hide all columns silently", "Shrink text to 8px", "Disable zoom"], "Дані й керування мають лишатися доступними.", "Data and controls must remain usable."],
    ],
  },
  qa_theory: {
    unit: "exploratory_charters", slug: "qa-transfer-risk-triage", titleUk: "Побудуйте перевірку за ризиком", titleEn: "Build a risk-based test plan",
    conceptUk: "У бронюванні одна кімната може бути продана двічі під час одночасних запитів. Спершу сформулюйте ризик і оракул: для одного слота успішним стає лише одне бронювання. Зіставте перевірку меж дат, конкурентних запитів і повідомлення користувачу. Дефект описуйте відтворюваними кроками, очікуваним і фактичним результатом.",
    conceptEn: "A booking service may sell one room twice under concurrent requests. First state the risk and oracle: only one booking for a slot succeeds. Cover date boundaries, concurrent requests, and the user-facing outcome. Report a defect with reproducible steps, expected result, and actual result.",
    checks: [
      ["Який оракул для одночасних бронювань одного слота?", "What is the oracle for concurrent bookings of one slot?", ["Рівно одне бронювання успішне", "Обидва завжди успішні", "Кількість логів дорівнює нулю", "Кнопка зелена"], ["Exactly one booking succeeds", "Both always succeed", "There are zero logs", "The button is green"], "Оракул визначає спостережувану правильну поведінку.", "An oracle defines observable correct behaviour."],
      ["Який тест має найвищий ризик перед релізом?", "Which test has the highest pre-release risk?", ["Два одночасні запити на останній слот", "Зміна кольору іконки", "Перевірка довжини назви файлу", "Знімок порожнього footer"], ["Two concurrent requests for the last slot", "Changing an icon colour", "Checking filename length", "A snapshot of an empty footer"], "Дубльована продажа має великий вплив.", "Double booking has high impact."],
      ["Що потрібно для відтворюваного дефекту?", "What makes the defect reproducible?", ["Кроки, дані, очікуваний і фактичний результат", "Лише оцінка «погано»", "Лише screenshot без контексту", "Лише ім'я автора"], ["Steps, data, expected and actual results", "Only the label 'bad'", "Only a screenshot without context", "Only the author's name"], "Конкретні дані дають повторити збій.", "Concrete data lets others reproduce the failure."],
    ],
  },
  js_fundamentals: {
    unit: "proxy_meta", slug: "js-transfer-search-race", titleUk: "Скасуйте застарілий пошук", titleEn: "Cancel a stale search",
    conceptUk: "Користувач вводить `ca`, а потім `cat`. Перша відповідь може прийти останньою й затерти актуальні результати. Скасуйте попередній fetch через AbortController і додатково перевірте ідентифікатор поточного запиту перед оновленням DOM. Підставляйте текст результату через textContent, не як HTML.",
    conceptEn: "A user types `ca`, then `cat`. The first response may arrive last and overwrite current results. Abort the previous fetch with AbortController and also check the current request identifier before changing the DOM. Render result text with textContent, not as HTML.",
    checks: [
      ["Чому відповідь `ca` не можна показувати після результату `cat`?", "Why must the `ca` response not replace the `cat` result?", ["Вона належить застарілому запиту", "Вона завжди має статус 500", "Вона не містить JSON", "Вона завжди швидша"], ["It belongs to a stale request", "It always has status 500", "It cannot contain JSON", "It is always faster"], "Порядок завершення запитів не гарантує порядок введення.", "Completion order does not guarantee input order."],
      ["Який засіб скасовує попередній fetch?", "Which mechanism cancels the previous fetch?", ["AbortController", "setInterval", "innerHTML", "Object.freeze"], ["AbortController", "setInterval", "innerHTML", "Object.freeze"], "Signal контролера передають до fetch.", "Pass the controller signal to fetch."],
      ["Результат містить рядок `<img onerror=...>`. Як показати його назву?", "A result contains `<img onerror=...>`. How should its title be displayed?", ["Через textContent", "Через innerHTML без перевірки", "Через eval", "Через document.write"], ["With textContent", "With unchecked innerHTML", "With eval", "With document.write"], "Текст має залишатися текстом, а не розміткою.", "The value must remain text, not markup."],
    ],
  },
  react_fundamentals: {
    unit: "react_strict_dev", slug: "react-transfer-edit-form", titleUk: "Виправте асинхронну форму", titleEn: "Repair an async edit form",
    conceptUk: "Форма редагування профілю завантажує початкові дані, але користувач уже почав вводити нове ім'я. Пізня відповідь не повинна перезаписати його введення. Зберігайте стан редагування окремо від стану запиту, скасовуйте застаріле завантаження в cleanup і показуйте помилку з можливістю повторити дію. Значення, яке можна обчислити з наявного стану, не дублюйте в окремому state.",
    conceptEn: "A profile edit form loads initial data after the user has begun typing a new name. A late response must not overwrite their input. Keep edit state separate from request state, cancel stale loading in cleanup, and show a retryable error. Do not duplicate a value in state when it can be derived from existing state.",
    checks: [
      ["Пізня відповідь перезаписує введений текст. Що треба захистити?", "A late response overwrites typed text. What must be protected?", ["Поточний стан редагування", "Лише колір кнопки", "Порядок CSS правил", "Назву компонента"], ["Current edit state", "Only button colour", "CSS rule order", "The component name"], "Введення користувача має пріоритет над застарілим запитом.", "User input takes precedence over a stale request."],
      ["Що робити в cleanup ефекту завантаження?", "What should the loading effect cleanup do?", ["Скасувати застарілий запит", "Надіслати форму вдруге", "Очистити всі поля без причини", "Змінити ключ списку випадково"], ["Abort the stale request", "Submit the form again", "Clear every field needlessly", "Randomly change list keys"], "Cleanup прибирає роботу попереднього ефекту.", "Cleanup ends work from the previous effect."],
      ["Чи зберігати `isValid = name.trim().length > 0` окремо?", "Should `isValid = name.trim().length > 0` be separately stored?", ["Ні, обчислити з name", "Так, завжди дублювати", "Тільки в localStorage", "Тільки в CSS"], ["No, derive it from name", "Yes, always duplicate it", "Only in localStorage", "Only in CSS"], "Похідний стан не повинен розходитися з джерелом.", "Derived state should not drift from its source."],
    ],
  },
  sql_fundamentals: {
    unit: "sql_profiling", slug: "sql-transfer-report", titleUk: "Відновіть звіт без дублювання рядків", titleEn: "Repair a report without duplicate rows",
    conceptUk: "Звіт про замовлення має показати кожного клієнта, включно з тими, хто ще не купував. LEFT JOIN зберігає таких клієнтів, але фільтр по правій таблиці у WHERE може випадково прибрати їх. Підрахуйте замовлення в окремому агрегаті або CTE, а вже потім приєднайте результат. Перевірте план для великого набору й окремо тестуйте NULL та клієнта без замовлень.",
    conceptEn: "An order report must include every customer, including those with no purchases. LEFT JOIN retains them, but a right-table filter in WHERE can accidentally remove them. Aggregate orders in a separate CTE before joining. Inspect the plan for a large dataset and test NULL and a customer with no orders.",
    checks: [
      ["Який JOIN зберігає клієнта без замовлень?", "Which JOIN retains a customer with no orders?", ["LEFT JOIN від customers", "INNER JOIN", "CROSS JOIN без умови", "JOIN лише orders"], ["LEFT JOIN from customers", "INNER JOIN", "CROSS JOIN without a predicate", "A join starting only from orders"], "Ліва таблиця визначає повний набір клієнтів.", "The left table defines the full customer set."],
      ["Де фільтр активних замовлень не знищить порожні рядки клієнтів?", "Where can the active-order filter preserve customers with no orders?", ["У попередньому агрегаті замовлень", "У WHERE після LEFT JOIN без NULL умови", "У ORDER BY", "Лише в назві CTE"], ["In a prior order aggregate", "In WHERE after LEFT JOIN without a NULL condition", "In ORDER BY", "Only in the CTE name"], "Агрегат обмежує праву сторону до приєднання.", "The aggregate limits the right side before the join."],
      ["Який тест виявить втрату клієнтів у звіті?", "Which fixture reveals missing customers in the report?", ["Клієнт без замовлень має нуль", "Лише клієнт з десятьма замовленнями", "Лише порожня таблиця customers", "Лише перевірка синтаксису"], ["A customer with no orders appears with zero", "Only a customer with ten orders", "Only an empty customers table", "Only a syntax check"], "Граничний випадок перевіряє семантику LEFT JOIN.", "The boundary fixture checks LEFT JOIN semantics."],
    ],
  },
  node_fundamentals: {
    unit: "node_diagnostics", slug: "node-transfer-import", titleUk: "Імпортуйте файл без переповнення пам'яті", titleEn: "Import a file without exhausting memory",
    conceptUk: "Сервіс імпортує великий CSV. Не завантажуйте його цілком у пам'ять; читайте потоком і дотримуйтеся backpressure під час запису. Пишіть у тимчасовий файл, а готовий результат замінюйте атомарно після успіху. При SIGTERM зупиніть нові завдання, завершіть поточні в межах deadline і залиште попередній файл придатним до читання.",
    conceptEn: "A service imports a large CSV. Avoid loading it all into memory; read it as a stream and respect write backpressure. Write to a temporary file, then atomically replace the published result after success. On SIGTERM stop new jobs, finish current work within a deadline, and keep the previous file readable.",
    checks: [
      ["Чому `readFile` ризикований для багатогігабайтного CSV?", "Why is readFile risky for a multi-gigabyte CSV?", ["Він тримає весь файл у пам'яті", "Він завжди змінює кодування", "Він не читає байти", "Він запускає SQL"], ["It holds the entire file in memory", "It always changes encoding", "It cannot read bytes", "It runs SQL"], "Потік обмежує обсяг одночасно оброблених даних.", "Streaming bounds in-flight data."],
      ["Записувач не встигає за читачем. Що потрібно?", "The writer is slower than the reader. What is needed?", ["Дотримуватися backpressure", "Нескінченна черга в пам'яті", "Ігнорувати false від write", "Створити ще один процес на кожен рядок"], ["Respect backpressure", "An unbounded in-memory queue", "Ignore write returning false", "Spawn a process per row"], "Читання має сповільнитися разом із записом.", "Reading must slow with writing."],
      ["Імпорт падає на 80%. Як зберегти старий звіт?", "Import fails at 80%. How should the old report be kept?", ["Писати у тимчасовий файл і замінити лише після успіху", "Писати прямо поверх звіту", "Видалити старий файл на старті", "Ігнорувати помилку"], ["Write a temporary file and replace only on success", "Overwrite the report directly", "Delete the old file at start", "Ignore the error"], "Публікація відбувається після повного успіху.", "Publish only after full success."],
    ],
  },
  express_fundamentals: {
    unit: "testing_express", slug: "express-transfer-reservation", titleUk: "Захистіть API бронювання", titleEn: "Protect a reservation API",
    conceptUk: "Користувач створює бронювання й отримує тайм-аут. Повтор з тим самим ключем має повернути ту саму операцію, а не створити дубль. Валідуйте тіло до сервісу; перевіряйте власника запису за даними сесії, не за userId з тіла. Обробляйте помилки стабільним кодом і тестуйте створення, повтор, чужий запис та невалідні дати.",
    conceptEn: "A user creates a reservation and receives a timeout. Retrying with the same key must resolve to the same operation, not create a duplicate. Validate the body before the service; determine record ownership from the session, not a body userId. Return stable error codes and test creation, retry, foreign ownership, and invalid dates.",
    checks: [
      ["Звідки брати власника нового бронювання?", "Where should a new reservation's owner come from?", ["З автентифікованої сесії", "З userId у довільному тілі", "З query параметра", "З останнього запису"], ["From the authenticated session", "From arbitrary body userId", "From a query parameter", "From the latest row"], "Клієнт не може сам призначати собі чужий запис.", "The client must not assign another user's record."],
      ["Повторили POST після тайм-ауту з тим самим ключем. Який результат правильний?", "POST is retried after a timeout with the same key. What is correct?", ["Те саме бронювання без дубля", "Два бронювання", "Завжди 500", "Видалення першого запису"], ["The same reservation without a duplicate", "Two reservations", "Always 500", "Deleting the first record"], "Ідемпотентний повтор не подвоює побічний ефект.", "An idempotent retry does not duplicate the side effect."],
      ["Який інтеграційний тест перевірить контроль доступу?", "Which integration test checks authorization?", ["Користувач B не може читати бронювання A", "A читає власне бронювання", "Маршрут відповідає на ping", "JSON має дужки"], ["User B cannot read user A's reservation", "A reads their own reservation", "The route responds to ping", "JSON has braces"], "Негативний тест доводить межу власності.", "A negative test checks the ownership boundary."],
    ],
  },
  embedded_cpp: {
    unit: "bootloader_ota", slug: "embedded-transfer-telemetry", titleUk: "Переведіть телеметрію у безпечний стан", titleEn: "Fail safely during telemetry loss",
    conceptUk: "Контролер отримує телеметрію в обмежений буфер. Кожне повідомлення перевіряють за довжиною і контрольним полем до доступу до масиву. Якщо свіжі дані не надходять до deadline, система переходить у визначений безпечний стан; watchdog не маскує логічну помилку нескінченними перезапусками. Оновлення прошивки приймають лише після перевірки образу й залишають шлях повернення до попередньої версії.",
    conceptEn: "A controller receives telemetry into a bounded buffer. Check each message length and integrity field before indexing the array. If fresh data misses its deadline, enter a defined safe state; a watchdog must not hide a logic defect behind endless restarts. Accept firmware only after image verification and retain a rollback path.",
    checks: [
      ["Що перевіряти до копіювання payload у фіксований буфер?", "What must be checked before copying a payload into a fixed buffer?", ["Довжину й цілісність повідомлення", "Лише колір індикатора", "Лише час компіляції", "Тільки ім'я змінної"], ["Message length and integrity", "Only indicator colour", "Only compile time", "Only variable name"], "Невалідний пакет не повинен досягти буфера.", "Invalid input must not reach the buffer."],
      ["Дані датчика застаріли. Яка поведінка правильна?", "Sensor data is stale. What is correct behaviour?", ["Перейти у визначений безпечний стан", "Вважати останнє значення завжди свіжим", "Збільшити буфер без меж", "Вимкнути перевірку часу"], ["Enter the defined safe state", "Treat the last value as always fresh", "Grow the buffer without bounds", "Disable the timeout"], "Втрата телеметрії має явний перехід стану.", "Telemetry loss needs an explicit state transition."],
      ["Нова прошивка не проходить перевірку образу. Що робити?", "A new firmware image fails verification. What should happen?", ["Залишити попередній працездатний образ", "Запустити неперевірений образ", "Стерти обидва слоти", "Ігнорувати помилку"], ["Keep the previous working image", "Boot the unverified image", "Erase both slots", "Ignore the error"], "Неперевірене оновлення не стає активним.", "An unverified update must not become active."],
    ],
  },
  sysadmin: {
    unit: "observability_home", slug: "sa-transfer-restore", titleUk: "Відновіть сервіс після збою", titleEn: "Restore service after a failure",
    conceptUk: "Після оновлення домашній файловий сервіс не відповідає. Спершу підтвердьте симптом і межу впливу з клієнта, перевірте стан процесу й журнал, а також вільне місце. Не перезаписуйте єдину резервну копію. Відновлення перевіряйте в окремому місці й лише після цього перемикайте користувачів; зафіксуйте фактичну втрату даних і час простою.",
    conceptEn: "A home file service is unavailable after an update. First confirm the symptom and scope from a client, inspect service state, logs, and free space. Do not overwrite the sole backup. Test restoration in an isolated location before switching users, and record actual data loss and downtime.",
    checks: [
      ["Що зробити перед випадковими перезапусками?", "What should happen before random restarts?", ["Підтвердити симптом, стан сервісу і журнал", "Видалити журнал", "Перезаписати backup", "Вимкнути всі сповіщення"], ["Confirm symptom, service state, and logs", "Delete logs", "Overwrite the backup", "Disable all alerts"], "Діагностика має спиратися на спостереження.", "Diagnosis should use observed evidence."],
      ["Як перевірити єдину резервну копію?", "How should the sole backup be checked?", ["Відновити копію в окреме місце", "Перезаписати її новими даними", "Вважати назву файлу доказом", "Видалити після помилки"], ["Restore it to an isolated location", "Overwrite it with new data", "Treat filename as proof", "Delete it after failure"], "Тест відновлення не руйнує джерело.", "A restore drill must not destroy the source."],
      ["Сервіс знову працює. Який факт потрібен у звіті?", "The service is back. Which fact belongs in the report?", ["Реальна втрата даних і час простою", "Лише фраза «готово»", "Лише назва хоста", "Кількість перезапусків без результату"], ["Actual data loss and downtime", "Only 'done'", "Only the host name", "Restart count without outcome"], "Результат відновлення треба виміряти.", "The restoration outcome should be measured."],
    ],
  },
  software_testing: {
    unit: "st_perf_impact", slug: "st-transfer-intermittent", titleUk: "Локалізуйте нестабільний дефект", titleEn: "Isolate an intermittent defect",
    conceptUk: "API іноді повертає два списання після повторного запиту. Відокремте випадковість мережі від детермінованого оракула: один ключ операції означає одне списання. Зафіксуйте в тесті затримку відповіді, повтор і конкурентне виконання; перевірте стан бази, а не лише HTTP статус. Повторюваний тест має контролювати годинник і зовнішні відповіді.",
    conceptEn: "An API sometimes records two charges after a retry. Separate network timing from the deterministic oracle: one operation key means one charge. Simulate a delayed response, retry, and concurrency; inspect database state, not only HTTP status. A repeatable test controls the clock and external responses.",
    checks: [
      ["Який оракул для двох POST з одним ключем?", "What is the oracle for two POSTs with one key?", ["Одне списання у сховищі", "Два успішні списання", "Однаковий колір відповідей", "Відсутність логів"], ["One stored charge", "Two successful charges", "Matching response colours", "No logs"], "Оракул перевіряє побічний ефект.", "The oracle checks the side effect."],
      ["Що зробить нестабільний сценарій повторюваним?", "What makes the timing scenario repeatable?", ["Контроль годинника й відповідей залежностей", "Довільний sleep на 10 секунд", "Запуск лише раз на тиждень", "Видалення assertion"], ["Control the clock and dependency responses", "An arbitrary ten-second sleep", "Run once a week", "Remove assertions"], "Контроль часу прибирає випадковість тесту.", "Controlled time removes test randomness."],
      ["HTTP 200 отримано двічі. Що ще перевірити?", "HTTP 200 was returned twice. What else should be asserted?", ["Кількість фактичних списань у базі", "Лише довжину URL", "Тільки назву тесту", "Кількість console.log"], ["The number of actual database charges", "Only URL length", "Only the test name", "Number of console.log calls"], "Статус не доводить відсутності дубля.", "Status alone does not prove no duplicate occurred."],
    ],
  },
  postgresql_apps: {
    unit: "pg_pool_replicas", slug: "pg-transfer-online-migration", titleUk: "Змініть схему без втрати записів", titleEn: "Change schema without losing writes",
    conceptUk: "До таблиці замовлень додають обов'язкове поле, поки стара версія застосунку ще пише дані. Спершу додайте сумісне nullable поле, розгорніть код подвійного читання/запису за потреби, заповніть старі рядки порціями й перевірте відсутність пропусків. Лише після переходу всіх авторів запису накладайте жорстке обмеження. Для списку використовуйте стабільний ключовий курсор, щоб вставки не зсували сторінки.",
    conceptEn: "An order table gains a required field while old app instances still write. Add a compatible nullable column first, deploy transitional read/write code as needed, backfill old rows in batches, and verify no gaps. Enforce NOT NULL only after all writers have moved. Use a stable keyset cursor for listings so inserts do not shift pages.",
    checks: [
      ["Який перший крок безпечніший при старих writer-процесах?", "Which first step is safer while old writers still run?", ["Додати сумісне nullable поле", "Одразу NOT NULL без default і backfill", "Видалити таблицю", "Зупинити всі читання назавжди"], ["Add a compatible nullable column", "Immediately enforce NOT NULL without default or backfill", "Drop the table", "Stop all reads forever"], "Старі процеси ще не вміють писати нове поле.", "Old instances cannot write the new field yet."],
      ["Як заповнити мільйони старих рядків?", "How should millions of existing rows be backfilled?", ["Порціями з перевіркою прогресу", "Одним необмеженим циклом без спостереження", "Вручну по одному в UI", "Не заповнювати"], ["In batches with progress checks", "One unbounded loop without observation", "One by one in the UI", "Never backfill"], "Порції зменшують ризик довгих блокувань.", "Batches reduce long-lock risk."],
      ["Новий запис з'явився між сторінками. Яка пагінація стабільніша?", "A new row arrives between pages. Which pagination is more stable?", ["Курсор за впорядкованим унікальним ключем", "OFFSET без стабільного порядку", "Випадкове сортування", "Лише LIMIT"], ["A cursor over an ordered unique key", "OFFSET without stable ordering", "Random ordering", "Only LIMIT"], "Ключовий курсор не залежить від зсуву рядків.", "Keyset pagination does not depend on shifted row positions."],
    ],
  },
  git_workflows: {
    unit: "gw_large_repos", slug: "git-transfer-hotfix", titleUk: "Знайдіть регресію та випустіть виправлення", titleEn: "Find a regression and release a hotfix",
    conceptUk: "Після релізу зламався розрахунок знижки. Зафіксуйте команду або тест, який відрізняє добрий коміт від поганого, і використайте bisect на відтворюваному діапазоні. Зробіть малий hotfix без втрати чужих змін, перевірте конфліктні рядки, запустіть тест і збережіть зв'язок коміту з релізом. Переписування опублікованої історії потребує окремого узгодження.",
    conceptEn: "A discount calculation broke after release. Record a test or command that distinguishes good from bad commits, then bisect a reproducible range. Make a small hotfix without losing others' changes, inspect conflict lines, run the test, and retain a link from commit to release. Rewriting published history requires separate coordination.",
    checks: [
      ["Що потрібно для надійного git bisect?", "What is needed for reliable git bisect?", ["Відтворюваний тест добрий/поганий", "Випадкове припущення", "Лише дата коміту", "Видалення тегів"], ["A reproducible good/bad test", "A random guess", "Only commit date", "Deleting tags"], "Bisect працює лише з перевірюваним сигналом.", "Bisect needs a reliable signal."],
      ["Під час cherry-pick є конфлікт у тесті. Що перевірити?", "A cherry-pick conflicts in a test. What should be checked?", ["Зберегти обидва потрібні інваріанти й запустити тест", "Прийняти всю одну сторону без читання", "Видалити тест", "Позначити реліз успішним до збірки"], ["Preserve both required invariants and run the test", "Accept one entire side unread", "Delete the test", "Mark release successful before building"], "Розв'язаний конфлікт потребує перевірки поведінки.", "A resolved conflict still needs behavioural verification."],
      ["Який запис дає простежити hotfix до релізу?", "Which record traces a hotfix to the release?", ["Коміт і тег/запис релізу з тестовим результатом", "Лише локальний незбережений файл", "Тільки колір гілки", "Видалений reflog"], ["A commit and release tag/record with test result", "Only an unsaved local file", "Only branch colour", "A deleted reflog"], "Історія релізу має вказувати на перевірений код.", "The release record should point to verified code."],
    ],
  },
  web_security: {
    unit: "ws_oauth_supply", slug: "ws-transfer-session-boundary", titleUk: "Виправте порушену межу сесії", titleEn: "Repair a broken session boundary",
    conceptUk: "Користувач A відкрив посилання на запис B, а сервер поклався на userId із URL. Перевіряйте право на конкретний ресурс за автентифікованою сесією. Для мутації через cookie захистіть запит від CSRF; session ID зберігайте як секрет і змінюйте після підвищення привілеїв. Негативний тест має довести, що B не бачить і не змінює запис A.",
    conceptEn: "User A opens a link to B's record, and the server trusts userId from the URL. Check access to the specific resource using the authenticated session. Protect cookie-backed mutations against CSRF; keep session IDs secret and rotate them after privilege elevation. A negative test must prove B cannot read or change A's record.",
    checks: [
      ["Чи достатньо знати ID запису для доступу?", "Is knowing a record ID sufficient for access?", ["Ні, сервер перевіряє власність або дозвіл", "Так, ID є авторизацією", "Так, якщо URL довгий", "Так, якщо є cookie будь-якого користувача"], ["No, the server checks ownership or permission", "Yes, an ID is authorization", "Yes, if the URL is long", "Yes, if any user's cookie exists"], "Ідентифікатор не дає права на ресурс.", "An identifier is not permission."],
      ["Чому POST з cookie потребує CSRF захисту?", "Why does a cookie-backed POST need CSRF protection?", ["Браузер може додати cookie до нав'язаного запиту", "POST завжди публічний", "Cookie вимикає мережу", "CSRF стосується лише CSS"], ["The browser may attach cookies to a forged request", "POST is always public", "Cookies disable networking", "CSRF affects only CSS"], "Автоматична передача cookie створює межу походження.", "Automatic cookie attachment creates an origin boundary."],
      ["Який тест доводить захист від IDOR?", "Which test proves protection against IDOR?", ["Сесія B отримує відмову на запис A", "A читає власний запис", "Кнопка схована в UI", "ID має 16 символів"], ["Session B is denied access to A's record", "A reads their own record", "The button is hidden in the UI", "The ID has 16 characters"], "Тест має пройти через серверну перевірку чужого ресурсу.", "The test must cross the server-side ownership boundary."],
    ],
  },
  nextjs_fullstack: {
    unit: "nx_middleware_edges", slug: "nx-transfer-tenant-inbox", titleUk: "Ізолюйте пошту між організаціями", titleEn: "Isolate a tenant inbox",
    conceptUk: "Сторінка підтримки показує тікети кількох організацій. Server Component читає дані лише після перевірки сесії та tenant доступу; Client Component керує локальною формою. Server Action повторно перевіряє право перед зміною, навіть якщо UI приховав кнопку. Кешований результат має включати межу tenant або не кешуватися між користувачами.",
    conceptEn: "A support inbox contains tickets from several organizations. A Server Component reads data only after checking the session and tenant access; a Client Component manages the local form. The Server Action checks permission again before mutation even if the UI hides a button. Cached results must include the tenant boundary or avoid cross-user caching.",
    checks: [
      ["Де перевірити право на зміну тікета?", "Where must permission to change a ticket be checked?", ["У серверній мутації перед записом", "Лише приховавши кнопку", "Лише в CSS", "Тільки в назві маршруту"], ["In the server mutation before writing", "Only by hiding a button", "Only in CSS", "Only in the route name"], "Клієнтський інтерфейс не є межею авторизації.", "The client UI is not an authorization boundary."],
      ["Кеш повернув тікети іншої організації. Який дефект?", "A cache returned another tenant's tickets. What failed?", ["Ключ/політика кешу не врахували tenant", "Заголовок сторінки короткий", "Форма має два поля", "Порядок CSS"], ["The cache key/policy missed the tenant boundary", "The page title is short", "The form has two fields", "CSS order"], "Дані різних організацій не можна об'єднувати в спільний кеш.", "Different tenants' data cannot share an undifferentiated cache entry."],
      ["Що лишити в Client Component?", "What belongs in the Client Component?", ["Локальний стан форми та взаємодію", "Секретний ключ доступу до бази", "Перевірку SQL прав на сервері", "Усі записи організацій"], ["Local form state and interaction", "A secret database key", "Server-side SQL authorization", "All tenants' records"], "Інтерактивний стан живе на клієнті, секрети й доступ — на сервері.", "Interactive state runs client-side; secrets and access checks stay server-side."],
    ],
  },
  applied_algorithms: {
    unit: "aa_lru_ratelimit", slug: "aa-transfer-bounded-events", titleUk: "Обмежте пам'ять обробника подій", titleEn: "Bound event processor memory",
    conceptUk: "Сервіс отримує мільйони подій, інколи повторює один eventId. Set прискорює перевірку дубля, але нескінченний Set росте без меж. Визначте вікно дедуплікації та ліміт пам'яті; використайте чергу для видалення найстаріших ID. Тестуйте повтор в межах вікна, повтор після нього та максимальний розмір структури, а не лише середній час.",
    conceptEn: "A service receives millions of events, sometimes repeating an eventId. A Set makes duplicate checks fast but an unbounded Set grows forever. Define a deduplication window and memory cap; use a queue to evict oldest IDs. Test a retry inside and outside the window and the maximum structure size, not only average time.",
    checks: [
      ["Чому Set сам по собі не завершує дизайн?", "Why does a Set alone not complete the design?", ["Він може рости без меж", "Він завжди O(n²)", "Він не зберігає рядки", "Він вимикає таймер"], ["It can grow without a bound", "It is always O(n²)", "It cannot store strings", "It disables timers"], "Асимптотика пошуку не обмежує пам'ять.", "Lookup complexity does not cap memory."],
      ["Що видалити, коли досягнуто ліміту вікна?", "What should be evicted when the window cap is reached?", ["Найстаріший ID із черги та Set", "Випадковий поточний ID", "Усі майбутні події", "Лише лічильник без ID"], ["The oldest ID from queue and Set", "A random current ID", "All future events", "Only a counter without an ID"], "Черга задає порядок витіснення.", "The queue defines eviction order."],
      ["Який тест перевіряє обмеженість?", "Which test checks boundedness?", ["Після багатьох унікальних подій розмір ≤ ліміт", "Лише один eventId", "Тільки назва функції", "Лише успішний build"], ["After many unique events, size stays at or below the cap", "Only one eventId", "Only the function name", "Only a successful build"], "Граничний тест перевіряє реальне використання пам'яті.", "A boundary test checks actual retained size."],
    ],
  },
};

export function expandCoreTransfer(course: CourseContent): CourseContent {
  const row = CASES[course.slug];
  if (!row) return course;
  const lesson = taught(row.slug, row.titleUk, row.titleEn, row.conceptUk, row.conceptEn,
    row.checks.map(([promptUk, promptEn, options, optionsEn, explanationUk, explanationEn], index) => choice({
      id: `${row.slug}-q${index + 1}`, promptUk, promptEn, options, optionsEn, correctIndex: 0, explanationUk, explanationEn,
    })));
  return expandCourse(course, { [row.unit]: [lesson] });
}
