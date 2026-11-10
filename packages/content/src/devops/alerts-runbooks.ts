import { unit } from "../builders.js";
import { quiz, teach, why } from "./kit.js";

export const alertsRunbooks = unit("alerts-runbooks", "Алерти, на які є відповідь", "Pages a human can answer", [
  teach("do-alert-symptom", "Симптом користувача", "The user-visible symptom", 4, "do-alert-symptom", [
    {
      t: "read", uk: "Який рядок найкраще обґрунтовує терміновий виклик чергового forge-status?", en: "Which row best justifies urgently paging the forge-status on-call engineer?", lang: "text",
      code: "window: last 5 min, sustained\nA: CPU 91%, success 99.99%, p95 120ms\nB: CPU 25%, 5xx 18%, p95 4200ms\nnormal p95: 150ms; latency objective: 500ms",
      o: ["A, бо CPU завжди дорівнює шкоді / A, because CPU always equals harm", "B, бо є помилки та затримка для користувачів / B, because users see errors and latency", "Жоден, бо всі Pod Running / Neither, because all Pods are Running"], i: 1,
      note: why("5xx і затримка описують шкоду користувачам. CPU може пояснювати причину, але низький CPU не виключає блокування чи проблеми залежностей.", "5xx and latency describe user harm. CPU may explain a cause, but low CPU does not rule out blocking or dependency problems."),
    },
    {
      t: "fill", uk: "Заповніть regex для HTTP 5xx у чисельнику частки помилок. Трафік у вікні ненульовий.", en: "Fill the HTTP 5xx regex in the error-ratio numerator. Traffic in this window is nonzero.", lang: "promql",
      code: "sum(rate(http_requests_total{service=\"forge-status\",code=~\"___\"}[5m]))\n/ sum(rate(http_requests_total{service=\"forge-status\"}[5m]))", ok: ["5.."],
      note: why("Чисельник і знаменник мають однакові service та вікно. Для відсутнього трафіку й відсутніх метрик потрібна окрема визначена поведінка.", "Numerator and denominator use the same service and window. No traffic and missing metrics need separately defined behavior."),
    },
    {
      t: "mcq", uk: "CPU 95% під час дозволеної пакетної роботи, але SLI нормальні й негайної дії немає. Як поводитися з CPU-правилом?", en: "CPU is 95% during permitted batch work, SLIs are healthy, and no immediate action exists. How should the CPU rule be treated?",
      o: ["Будити чергового щохвилини / Wake the on-call every minute", "Приховати всі майбутні симптоми / Hide all future symptoms", "Використати як діагностичний сигнал або задачу місткості за потреби / Use it as a diagnostic signal or capacity ticket when warranted"], i: 2,
      note: why("Page потребує термінової дії. Високий CPU без шкоди може вимагати планування, але не автоматичного нічного виклику.", "A page needs urgent action. High CPU without harm may require planning, not an automatic overnight wake-up."),
    },
    {
      t: "order", uk: "У runbook спочатку встановлюють симптом, потім причину й ефект дії. Відновіть цей шлях.", en: "The runbook establishes the symptom before the cause and action outcome. Reconstruct that path.", lang: "text",
      correct: ["Підтвердити 5xx і затримку на користувацькому шляху / Confirm 5xx and latency on the user journey", "За тим самим вікном зіставити deploy і залежності / Correlate deploy and dependencies in the same window", "За перевіреною гіпотезою виконати обмежене пом'якшення / Apply bounded mitigation for the tested hypothesis", "Виміряти зміну тих самих користувацьких SLI / Measure changes in those same user SLIs"],
      note: why("CPU або кількість restart можуть змінитися без одужання користувачів. Завершальна перевірка повертається до вихідного симптому.", "CPU or restart counts can change without user recovery. The final check returns to the original symptom."),
    },
    {
      t: "match", uk: "Зіставте показник із його роллю в цьому інциденті.", en: "Match each signal to its role in this incident.",
      pairs: [{ left: "HTTP 5xx ratio", right: "Частка невдалих запитів користувачів / Fraction of failed user requests" }, { left: "request p95", right: "Затримка повільного хвоста запитів / Latency in the slower request tail" }, { left: "CPU utilization", right: "Можливе пояснення ресурсного тиску / Possible evidence of resource pressure" }],
      note: why("Симптом задає пріоритет відповіді, ресурсні сигнали допомагають діагностувати. p95 не є ні середнім, ні максимумом.", "Symptoms set response priority; resource signals help diagnosis. p95 is neither the mean nor the maximum."),
    },
    {
      t: "read", uk: "5xx знизилися до нуля, але чи можна вважати цей шлях здоровим?", en: "5xx dropped to zero, but can this journey be considered healthy?", lang: "text",
      code: "HTTP 2xx: 100%\nrequest p95: 12s\nlatency objective: 500ms\nexternal probe: timeout at 5s",
      o: ["Ні: успішний код не усуває шкоду від затримки / No: a success code does not remove latency harm", "Так: 2xx достатньо для всіх SLI / Yes: 2xx is sufficient for every SLI", "Так: треба прибрати probe / Yes: remove the probe"], i: 0,
      note: why("Запит може завершитися 2xx після того, як клієнт уже здався. Перевіряють доступність і затримку з відповідної точки користувача.", "A request may finish with 2xx after the client has given up. Check availability and latency from the relevant user perspective."),
    },
  ]),
  teach("do-alert-burn", "Швидке й повільне спалення бюджету", "Fast and slow budget burn", 5, "do-alert-burn", [
    {
      t: "read", uk: "SLO успіху — 99%. Який burn rate відповідає частці помилок 6% за це вікно?", en: "The success SLO is 99%. What burn rate corresponds to a 6% error ratio in this window?", lang: "text",
      code: "allowed error fraction = 1 - 0.99 = 0.01\nobserved error fraction = 0.06\nburn rate = observed / allowed",
      o: ["0.06", "6", "99"], i: 1,
      note: why("0.06 / 0.01 = 6: бюджет витрачається у шість разів швидше за сталий допустимий темп. Це не означає, що вже витрачено 6% місячного бюджету.", "0.06 / 0.01 = 6: the budget burns six times faster than its sustainable allowance. It does not mean 6% of the monthly budget is already spent."),
    },
    {
      t: "fill", uk: "Нагадайте функцію для швидкості лічильника запитів; вона враховує скидання counter.", en: "Recall the function for a request counter's rate; it handles counter resets.", lang: "promql",
      code: "sum(___(http_requests_total{service=\"forge-status\",code=~\"5..\"}[5m]))", ok: ["rate"],
      note: why("rate перетворює counter на середню швидкість за секунду у вікні. Спочатку rate для кожного ряду, потім sum, щоб не загубити скидання окремих counter.", "rate turns a counter into an average per-second rate over the window. Apply rate per series before sum so individual counter resets remain visible."),
    },
    {
      t: "read", uk: "Recording rules нижче — частки помилок для одного service. Коли спрацює ця fast-burn умова?", en: "The recording rules below are error ratios for one service. When does this fast-burn condition hold?", lang: "promql",
      code: "(forge:error_ratio:rate1h{service=\"forge-status\"} / 0.01 > 14.4)\nand\n(forge:error_ratio:rate5m{service=\"forge-status\"} / 0.01 > 14.4)",
      o: ["Коли будь-яке одне вікно перевищило поріг / When either window exceeds the threshold", "Коли CPU нижче 14.4% / When CPU is below 14.4%", "Коли обидва узгоджені вікна перевищують burn 14.4 / When both matching windows exceed burn 14.4"], i: 2,
      note: why("Довге вікно виявляє суттєве витрачання, коротке підтверджує, що проблема ще триває. Потрібні узгоджені labels та визначена поведінка за відсутності даних.", "The long window detects material spending; the short window confirms it is ongoing. Labels must match and missing-data behavior must be defined."),
    },
    {
      t: "order", uk: "Побудуйте slow-burn правило з тих самих request counter.", en: "Build a slow-burn rule from the same request counters.", lang: "text",
      correct: ["Обчислити частки помилок за 6 год і 30 хв / Calculate error ratios over 6 hours and 30 minutes", "Поділити обидві частки на допустиму частку SLO / Divide both ratios by the SLO error allowance", "Порівняти обидва burn rate з обраним slow-порогом / Compare both burn rates with the chosen slow threshold", "Перевірити правило на історії та спрямувати за терміновістю / Test against history and route according to urgency"],
      note: why("Повільне виснаження теж важливе: наприклад, burn 6 на 6 год і 30 хв може виявити проблему, яку fast-поріг пропустить. Маршрут залежить від часу, доступного для дії.", "Slow depletion matters too: for example, burn 6 over 6 hours and 30 minutes can catch issues missed by the fast threshold. Routing depends on the time available to act."),
    },
    {
      t: "match", uk: "Зіставте поняття багатовіконного alerting.", en: "Match multi-window alerting concepts.",
      pairs: [{ left: "fast burn", right: "Швидка загроза бюджету, що потребує термінової дії / Rapid budget threat requiring urgent action" }, { left: "slow burn", right: "Стійке менше відхилення на довшому вікні / Sustained smaller deviation over a longer window" }, { left: "short confirmation window", right: "Доказ, що погіршення ще триває / Evidence that degradation is still ongoing" }],
      note: why("Одне миттєве значення не показує темп витрачання за тривалий час. Fast і slow доповнюють одне одного, а не дублюють лише CPU-поріг.", "One instantaneous value does not show sustained budget consumption. Fast and slow signals complement each other rather than duplicating a CPU threshold."),
    },
    {
      t: "out", uk: "За умов сталої інтенсивності трафіку яку частку 30-денного бюджету у відсотках витратить burn 14.4 за одну годину?", en: "Assuming constant traffic volume, what percentage of a 30-day budget does burn 14.4 consume in one hour?", lang: "python",
      code: "burn = 14.4\nwindow_hours = 1\nperiod_hours = 30 * 24\nprint(round(100 * burn * window_hours / period_hours, 1))", o: ["2.0", "14.4", "100.0"], i: 0,
      note: why("14.4 / 720 = 2% бюджету за годину за цих припущень. Для request-based SLO нерівномірний трафік змінює частку фактичних допустимих помилок.", "14.4 / 720 is 2% of the budget per hour under these assumptions. Uneven traffic changes the actual budget fraction for a request-based SLO."),
    },
  ]),
  teach("do-alert-use", "USE вузла та RED API", "Node USE and API RED", 4, "do-alert-use", [
    {
      t: "match", uk: "Підпорядкуйте діагностику golden signals із do-golden. Зіставте рамку з її об'єктом.", en: "Place diagnostics under the golden signals from do-golden. Match the framework to its subject.",
      pairs: [{ left: "USE", right: "Ресурс: utilization, saturation, errors / Resource: utilization, saturation, errors" }, { left: "RED", right: "API: rate, errors, duration / API: rate, errors, duration" }, { left: "golden signals", right: "Огляд: latency, traffic, errors, saturation / Overview: latency, traffic, errors, saturation" }],
      note: why("RED деталізує запити сервісу, USE — ресурси вузла. Вони допомагають пояснити чотири golden signals, а не створюють три незалежні причини для однакових pages.", "RED details service requests; USE details node resources. They help explain the four golden signals rather than creating three independent reasons for duplicate pages."),
    },
    {
      t: "read", uk: "Який сигнал показує saturation, а не просто utilization вузла?", en: "Which signal shows node saturation rather than utilization alone?", lang: "text",
      code: "CPU busy: 70%\nCPU runnable queue: 18 tasks on 4 cores\nAPI requests: 300/s\nAPI 5xx: 0.1%",
      o: ["API requests 300/s / API requests 300/s", "Черга 18 runnable tasks / The queue of 18 runnable tasks", "Назва вузла / The node name"], i: 1,
      note: why("Saturation показує роботу, що чекає ресурсу. Utilization показує його зайнятість; це пов'язані, але різні виміри.", "Saturation shows work waiting for a resource. Utilization shows how busy it is; these are related but distinct measurements."),
    },
    {
      t: "fill", uk: "Додайте відсутню складову RED: rate, errors, ___.", en: "Add the missing RED component: rate, errors, ___.", lang: "text",
      code: "forge-status API\nR = request rate\nE = request errors\nD = ___", ok: ["duration"],
      note: why("Duration описує час запиту. CPU не є D у RED: CPU належить ресурсній діагностиці USE.", "Duration describes request time. CPU is not the D in RED; CPU belongs to USE resource diagnosis."),
    },
    {
      t: "order", uk: "API p95 уже погіршився. Пройдіть від симптомів до перевірки ресурсної гіпотези.", en: "API p95 has degraded. Move from symptoms to validation of a resource hypothesis.", lang: "text",
      correct: ["За RED встановити час і масштаб затримки API / Use RED to establish timing and scope of API latency", "Для відповідних вузлів зіставити USE за тим самим часом / Correlate USE on the relevant nodes over that time", "Перевірити гіпотезу ресурсного очікування трасами й подіями / Test resource-wait hypotheses with traces and events", "Після цільової дії повторно перевірити RED / Recheck RED after the targeted action"],
      note: why("Збіг графіків — гіпотеза, не доказ причини. Повернення до RED показує, чи допомогла ресурсна дія користувачам.", "Correlated charts are a hypothesis, not proof of cause. Returning to RED shows whether the resource action helped users."),
    },
    {
      t: "read", uk: "Яке пояснення сумісне зі знімком, але ще потребує перевірки?", en: "Which explanation fits the snapshot but still needs verification?", lang: "text",
      code: "API rate: unchanged\nAPI p95: 3s\nnode CPU: 20%\ndisk await: elevated\napplication logs: database timeout",
      o: ["Низький CPU виключає saturation / Low CPU rules out saturation", "Треба переписати SLO під CPU / Rewrite the SLO around CPU", "Очікування I/O або БД може пояснювати затримку / I/O or database waits may explain latency"], i: 2,
      note: why("Saturation буває не лише CPU. Дані вказують напрям перевірки I/O і БД; вони не доводять конкретний винний диск.", "Saturation is not limited to CPU. These signals guide I/O and database investigation without proving a particular disk is responsible."),
    },
    {
      t: "mcq", uk: "Три дашборди показують один збій. Як уникнути трьох однакових нічних викликів?", en: "Three dashboards show the same failure. How can three duplicate overnight pages be avoided?",
      o: ["Один actionable symptom page, USE/RED як пов'язані діагностичні дані / One actionable symptom page with USE/RED as linked diagnostics", "Page на кожен графік / Page on every chart", "Видалити всі ресурсні метрики / Delete all resource metrics"], i: 0,
      note: why("Спостережність зберігає деталі, а маршрутизація має зменшувати дублікати. Одному черговому потрібні контекст і дія, а не число графіків.", "Observability retains detail while routing should reduce duplicates. The responder needs context and an action, not a count of charts."),
    },
  ]),
  teach("do-alert-labels", "Loki: сервіс, середовище, trace id", "Loki: service, environment, trace ID", 4, "do-alert-labels", [
    {
      t: "read", uk: "Яка стратегія Loki збереже фільтрацію й не створить потік на кожен запит?", en: "Which Loki strategy preserves filtering without creating a stream for every request?", lang: "json",
      code: "{\"service\":\"forge-status\",\"env\":\"prod\",\"trace_id\":\"ab71\",\"level\":\"error\",\"event\":\"db_timeout\"}",
      o: ["Індексувати кожен trace_id як label / Index every trace_id as a label", "Labels service/env; trace_id залишити JSON-полем або structured metadata / Use service/env labels; keep trace_id as a JSON field or structured metadata", "Видалити trace_id з усіх логів / Remove trace_id from every log"], i: 1,
      note: why("service/env мають обмежену кардинальність. trace_id потрібен для кореляції, але як індексний label створює надто багато потоків.", "service/env have bounded cardinality. trace_id supports correlation but creates too many streams as an indexed label."),
    },
    {
      t: "fill", uk: "Рядки є JSON. Вставте LogQL parser перед фільтром trace_id.", en: "Lines contain JSON. Insert the LogQL parser before the trace_id filter.", lang: "logql",
      code: "{service=\"forge-status\",env=\"prod\"} | ___ | trace_id=\"ab71\"", ok: ["json"],
      note: why("Selector спочатку звужує потоки за labels, потім JSON parser відкриває поля рядка. trace_id не потрібно додавати до індексних labels.", "The selector first narrows streams by labels, then the JSON parser exposes line fields. trace_id does not need an indexed label."),
    },
    {
      t: "match", uk: "Зіставте поля з призначенням.", en: "Match fields to their purpose.",
      pairs: [{ left: "service", right: "Який сервіс створив подію / Which service produced the event" }, { left: "env", right: "Відокремлення prod від stage / Separating prod from stage" }, { left: "trace_id", right: "Зв'язок події з конкретною трасою / Linking the event to a specific trace" }],
      note: why("service та env звужують пошук до правильного місця. trace_id зв'язує конкретні події між компонентами; він не має містити секретів.", "service and env narrow the search to the right scope. trace_id links particular events across components and must not contain secrets."),
    },
    {
      t: "order", uk: "Від page з service/env і часом дійдіть до конкретної траси.", en: "Move from a page containing service/env and time to a specific trace.", lang: "text",
      correct: ["Вибрати service, env і час із page / Select service, env, and time from the page", "У цьому наборі відфільтрувати помилки й розібрати JSON / Filter errors and parse JSON within that scope", "З потрібної події взяти trace_id / Extract trace_id from the relevant event", "Відкрити відповідну трасу та звірити час / Open the matching trace and verify timing"],
      note: why("Час та середовище запобігають змішуванню різних інцидентів. Сам trace_id має сенс у контексті конкретного запиту.", "Time and environment prevent mixing unrelated incidents. A trace_id belongs in the context of a specific request."),
    },
    {
      t: "read", uk: "Який із цих рядків відповідає пошуку?", en: "Which row matches the query?", lang: "text",
      code: "query: service=forge-status, env=prod, trace_id=ab71\nA: forge-status stage ab71 db_timeout\nB: billing prod ab71 db_timeout\nC: forge-status prod ab71 db_timeout",
      o: ["A", "B", "C"], i: 2,
      note: why("Лише C відповідає всім трьом обмеженням. Однаковий тип помилки у stage або іншому сервісі не є доказом production-інциденту forge-status.", "Only C matches all three constraints. The same error in stage or another service is not evidence for the forge-status production incident."),
    },
    {
      t: "mcq", uk: "У JSON-лог потрапив DSN із паролем. Що змінити в логуванні?", en: "A DSN containing a password entered JSON logs. What should change in logging?",
      o: ["Санітизувати чутливі значення, зберігши service/env/trace_id / Sanitize sensitive values while preserving service/env/trace_id", "Індексувати пароль для швидкого пошуку / Index the password for fast searching", "Прибрати env, але залишити пароль / Remove env but keep the password"], i: 0,
      note: why("Структуровані логи не повинні розкривати секрети. Витік також потребує ротації за процедурою; зміна формату не скасовує вже розкритий пароль.", "Structured logs must not expose secrets. A leak also requires procedural rotation; changing the format does not revoke an exposed password."),
    },
  ]),
  teach("do-alert-trace", "Від API до БД і відсутнього span", "From API to database and a missing span", 5, "do-alert-trace", [
    {
      t: "read", uk: "Це одна повільна траса. Який висновок обґрунтований?", en: "This is one slow trace. Which conclusion is justified?", lang: "text",
      code: "trace ab71\nAPI GET /status       0-920ms\n  auth                5-15ms\n  cache lookup       16-20ms\n  database span      MISSING\nlog at 900ms: db_timeout, trace_id=ab71",
      o: ["БД точно працювала 880 мс / The database certainly ran for 880ms", "Відсутній span доводить відсутність SQL / A missing span proves no SQL happened", "Є прогалина доказів; треба перевірити інструментацію та логи / There is an evidence gap; inspect instrumentation and logs"], i: 2,
      note: why("Час між spans може включати пул, SQL, мережу або роботу API. Лог підсилює гіпотезу БД, але не вимірює відсутній span.", "Time between spans may include pool waits, SQL, networking, or API work. The log supports a database hypothesis but does not measure the missing span."),
    },
    {
      t: "match", uk: "Зіставте частини траси.", en: "Match trace components.",
      pairs: [{ left: "trace_id", right: "Спільний ідентифікатор шляху запиту / Shared request-journey identifier" }, { left: "span_id", right: "Ідентифікатор однієї операції / Identifier of one operation" }, { left: "parent span", right: "Причинний зв'язок вкладеної операції / Causal link for a nested operation" }],
      note: why("Зв'язки spans показують структуру, а не лише набір часових міток. Для переходу між процесами потрібне передавання контексту.", "Span relationships show structure rather than just timestamps. Crossing process boundaries requires context propagation."),
    },
    {
      t: "fill", uk: "У назві заголовка W3C Trace Context бракує другої частини. Доповніть стандартну назву.", en: "The W3C Trace Context header name is missing its second part. Complete the standard name.", lang: "text",
      code: "trace___: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01", ok: ["parent"],
      note: why("traceparent переносить ідентичність траси та батьківський span між інструментованими сервісами. SQL driver instrumentation усе одно налаштовують окремо.", "traceparent carries trace identity and parent span between instrumented services. SQL driver instrumentation still needs separate setup."),
    },
    {
      t: "order", uk: "Закрийте прогалину DB span без припущення, що БД була швидкою.", en: "Close the DB-span evidence gap without assuming the database was fast.", lang: "text",
      correct: ["Зберегти повільну trace_id та пов'язані логи / Preserve the slow trace_id and related logs", "Перевірити sampling, exporter та інструментацію драйвера / Inspect sampling, exporter, and driver instrumentation", "Після виправлення повторити представницький запит / Repeat a representative request after the fix", "Перевірити вкладений DB span і окремо очікування пулу / Verify the nested DB span and pool wait separately"],
      note: why("Пропуск може бути через відсутню інструментацію або втрату експорту. Новий тест перевіряє спостережність, але не змінює минулі невідомі факти.", "A gap may come from missing instrumentation or export loss. A new test validates observability without changing unknown historical facts."),
    },
    {
      t: "read", uk: "Після виправлення отримано цю трасу. На який етап вказує найбільше очікування?", en: "After the fix, this trace is available. Which stage contains the largest wait?", lang: "text",
      code: "API GET /status: 900ms\n  pool.acquire: 700ms\n  db SELECT: 120ms\n  serialize: 10ms",
      o: ["Очікування з'єднання пулу / Waiting to acquire a pool connection", "Серіалізація / Serialization", "Лише виконання SELECT / Only SELECT execution"], i: 0,
      note: why("700 мс припадає на pool.acquire, а SQL — 120 мс. Потрібно дослідити бюджет з'єднань і зайняті транзакції, а не називати весь час повільним SQL.", "700ms is pool.acquire while SQL takes 120ms. Investigate connection budgets and occupied transactions instead of calling all elapsed time slow SQL."),
    },
    {
      t: "mcq", uk: "Одна sampled траса швидка, але p95 усіх запитів поганий. Що можна стверджувати?", en: "One sampled trace is fast while all-request p95 is poor. What can be claimed?",
      o: ["Усі запити здорові / Every request is healthy", "Одна траса не спростовує агрегований симптом; потрібні повільні приклади / One trace does not refute the aggregate symptom; seek slow examples", "Гістограму треба видалити / Delete the histogram"], i: 1,
      note: why("Sampling може не захопити проблемні запити. Метрики показують поширеність, а траси — приклади конкретних шляхів.", "Sampling may miss problematic requests. Metrics show prevalence while traces illustrate particular journeys."),
    },
  ]),
  teach("do-alert-book", "Runbook із наступною дією", "A runbook with a next action", 4, "do-alert-book", [
    {
      t: "read", uk: "Якої частини бракує цьому alert, щоб черговий міг діяти?", en: "What is missing from this alert for the responder to act?", lang: "yaml",
      code: "alert: ForgeHigh5xx\nlabels:\n  service: forge-status\n  env: prod\nannotations:\n  summary: '5xx above objective'\n  dashboard: 'https://monitor.invalid/forge'",
      o: ["Ще одного випадкового графіка / Another arbitrary chart", "Пароля БД у summary / Database password in the summary", "Посилання на перевірений runbook з діями й ескалацією / A link to a tested runbook with actions and escalation"], i: 2,
      note: why("Дашборд показує дані, але не обов'язково визначає безпечну дію. Runbook задає перевірки, межі, критерій успіху та контакти.", "A dashboard shows data but may not define safe action. A runbook provides checks, bounds, success criteria, and contacts."),
    },
    {
      t: "fill", uk: "Команда стандартизувала annotation runbook_url. Заповніть її ім'я; URL тут навчальний.", en: "The team standardized the runbook_url annotation. Fill its name; the URL here is illustrative.", lang: "yaml",
      code: "annotations:\n  ___: https://ops.invalid/runbooks/forge-5xx", ok: ["runbook_url"],
      note: why("Стабільне поле допомагає шаблону повідомлення показати правильне посилання. Сам URL не доводить, що інструкція доступна й актуальна — це тестують.", "A stable field lets notification templates show the right link. A URL does not prove the instructions are accessible or current; test that."),
    },
    {
      t: "order", uk: "Runbook для 5xx потребує перевіреної гіпотези перед дією. Упорядкуйте його основу.", en: "The 5xx runbook requires a checked hypothesis before action. Order its core flow.", lang: "text",
      correct: ["Перевірити env, масштаб шкоди та останні зміни / Check env, impact scope, and recent changes", "За read-only перевірками вибрати гілку діагнозу / Use read-only checks to choose a diagnosis branch", "Виконати обмежене пом'якшення з умовою зупинки / Apply bounded mitigation with a stop condition", "Перевірити SLI та за невдачі ескалювати / Validate SLIs and escalate if unsuccessful"],
      note: why("Runbook не має починатися з restart усього. У кожної дії потрібні передумова, очікуваний результат і шлях виходу.", "A runbook should not start with restarting everything. Each action needs a precondition, expected result, and exit path."),
    },
    {
      t: "match", uk: "Зіставте розділи runbook з питаннями чергового.", en: "Match runbook sections to responder questions.",
      pairs: [{ left: "preconditions", right: "Чи це правильне середовище та гілка збою? / Is this the right environment and failure branch?" }, { left: "verification", right: "Який SLI підтвердить поліпшення? / Which SLI confirms improvement?" }, { left: "escalation", right: "Кого залучити й за якої умови? / Who joins and under what condition?" }],
      note: why("Корисний runbook обмежує невизначеність під тиском. Контакти й доступ до інструкції перевіряють під час тренувань.", "A useful runbook reduces uncertainty under pressure. Validate contacts and instruction access during drills."),
    },
    {
      t: "mcq", uk: "Alert регулярно будить людину, але після перевірки немає жодної термінової дії. Що робити?", en: "An alert repeatedly wakes someone, but investigation offers no urgent action. What should happen?",
      o: ["Переглянути поріг, маршрут або перетворити на задачу з власником / Review threshold and routing or turn it into an owned ticket", "Додати ще десять повторів / Add ten more repeats", "Прибрати історію спрацювань / Delete firing history"], i: 0,
      note: why("Відсутність дії робить page шумом. Перегляд має зберегти видимість справжньої шкоди, а не просто назавжди приглушити симптоми.", "A page with no action is noise. Review should preserve visibility of real harm rather than permanently silencing symptoms."),
    },
    {
      t: "read", uk: "Який запис робить дію runbook перевірюваною?", en: "Which entry makes a runbook action verifiable?", lang: "text",
      code: "A: restart services until green\nB: if errors align with digest d2 and rollback is schema-compatible, revert desired digest to d1; stop if healthy capacity falls; verify 5xx and p95 for 10 min\nC: wait and hope",
      o: ["A", "B", "C"], i: 1,
      note: why("B задає умову, обмежену дію, stop condition та вимір успіху. Сумісність rollback перевіряють до зміни.", "B defines a precondition, bounded action, stop condition, and success measurement. Check rollback compatibility before changing anything."),
    },
  ]),
  quiz("do-alert-exam", "Іспит: CPU-алерт о 03:00", "Exam: the 03:00 CPU page", 5, "do-alert-exam", [
    {
      t: "read", uk: "О 03:00 це правило викликало чергового. Усі користувацькі SLI здорові. Яка помилка в обчисленні?", en: "At 03:00 this rule paged the responder. All user SLIs are healthy. What is wrong with the calculation?", lang: "promql",
      code: "rate(forge_cpu_utilization_ratio{service=\"forge-status\"}[5m]) > 0.8\n# forge_cpu_utilization_ratio is a gauge in [0,1]",
      o: ["rate gauge вимірює зміну, а не поточну зайнятість; потрібна відповідна gauge-агрегація / rate on this gauge measures change, not utilization; use an appropriate gauge aggregation", "rate перетворює кожен gauge на точний SLI / rate turns every gauge into a precise SLI", "CPU gauge доводить 5xx / A CPU gauge proves 5xx"], i: 0,
      note: why("rate призначена для counter. Для цього gauge читають значення або, наприклад, avg_over_time; терміновість page окремо перевіряють за шкодою та дією.", "rate is intended for counters. Read this gauge directly or use, for example, avg_over_time; assess paging urgency separately from harm and action."),
    },
    {
      t: "order", uk: "Оцініть нічний page перш ніж міняти навантаження сервісу.", en: "Assess the overnight page before changing service load.", lang: "text",
      correct: ["Підтвердити service, env і часовий інтервал / Confirm service, env, and time window", "Перевірити користувацькі помилки та затримку / Check user errors and latency", "Зіставити ресурсний сигнал із дозволеною роботою й runbook / Correlate the resource signal with permitted work and the runbook", "Записати висновок і виправити правило або маршрут за процедурою / Record findings and correct the rule or route through the procedure"],
      note: why("Здорові SLI не означають, що CPU-дані треба видалити. Вони допомагають вибрати діагностику або задачу замість термінової зміни без підстав.", "Healthy SLIs do not mean CPU data should be deleted. They help choose diagnosis or a ticket instead of an unjustified urgent change."),
    },
    {
      t: "read", uk: "У наступному вікні SLO — 99%, частки помилок 0.16 і 0.17. Що показує fast-burn перевірка?", en: "In the next window, the SLO is 99% and error ratios are 0.16 and 0.17. What does the fast-burn check show?", lang: "text",
      code: "1h burn: 0.16 / 0.01 = 16\n5m burn: 0.17 / 0.01 = 17\ncondition: both > 14.4",
      o: ["Значення — це CPU gauge / These values are a CPU gauge", "Лише коротке вікно перевищило поріг / Only the short window crossed", "Обидва вікна перевищили поріг; є симптом витрачання бюджету / Both windows crossed; there is a budget-consumption symptom"], i: 2,
      note: why("На відміну від попереднього CPU page, це узгоджений симптом невдалих запитів. Потрібні actionable runbook та перевірка масштабу.", "Unlike the earlier CPU page, this is a consistent failed-request symptom. It needs an actionable runbook and impact validation."),
    },
    {
      t: "order", uk: "Із page перейдіть до повільної траси з прогалиною DB span, зберігаючи причинний порядок.", en: "Move from the page to a slow trace with a DB-span gap while preserving the dependency order.", lang: "text",
      correct: ["У Loki вибрати service/env і час page / Select the page's service/env and time in Loki", "Розібрати JSON помилки й отримати trace_id / Parse the error JSON and obtain trace_id", "Відкрити цю трасу й встановити відсутній DB span / Open that trace and identify the missing DB span", "За прогалиною перевірити інструментацію й пов'язані дані БД / Use the gap to inspect instrumentation and related database evidence"],
      note: why("Без span не можна приписати весь невідомий час SQL. Логи й метрики допомагають перевірити гіпотези та інструментацію.", "Without the span, all unaccounted time cannot be assigned to SQL. Logs and metrics help test hypotheses and instrumentation."),
    },
    {
      t: "fill", uk: "Виправте CPU gauge-агрегацію для діагностичного графіка: потрібне середнє у вікні, не counter rate.", en: "Correct the CPU gauge aggregation for a diagnostic chart: use a window average, not a counter rate.", lang: "promql",
      code: "___(forge_cpu_utilization_ratio{service=\"forge-status\"}[5m])", ok: ["avg_over_time"],
      note: why("avg_over_time усереднює зразки gauge. Коректна формула ще не робить CPU-поріг причиною нічного виклику без дії.", "avg_over_time averages gauge samples. A correct formula alone does not justify an overnight CPU page without an action."),
    },
    {
      t: "match", uk: "Зіставте спостереження з правильним використанням.", en: "Match observations to their proper use.",
      pairs: [{ left: "node runnable queue", right: "USE: saturation ресурсу / USE: resource saturation" }, { left: "API errors and duration", right: "RED: симптоми запитів / RED: request symptoms" }, { left: "trace_id in JSON", right: "Кореляція без індексного label на кожен запит / Correlation without a per-request indexed label" }],
      note: why("Кожен сигнал має власну роль. Golden signals поєднують загальну картину, USE/RED деталізують її, trace_id зв'язує докази.", "Each signal has a role. Golden signals provide the overview, USE/RED add detail, and trace_id links evidence."),
    },
    {
      t: "out", uk: "Який burn rate буде за цих значень SLO й частки помилок?", en: "What burn rate results from this SLO and error ratio?", lang: "python",
      code: "slo = 0.99\nerror_ratio = 0.03\nprint(round(error_ratio / (1 - slo)))", o: ["3", "30", "99"], i: 0,
      note: why("3% помилок проти допустимого 1% означає burn 3. Невисокий проти fast-порога темп може бути суттєвим на slow-вікні.", "3% errors against a 1% allowance gives burn 3. A rate below the fast threshold can still matter over a slow window."),
    },
    {
      t: "mcq", uk: "Runbook для CPU має лише фразу «подивитися дашборд», без дії. Який наступний крок власника правила?", en: "The CPU runbook only says 'look at the dashboard' and defines no action. What should the rule owner do next?",
      o: ["Додати повтор кожні 10 секунд / Repeat every 10 seconds", "Визначити термінову дію або змінити page на доречний маршрут із власником / Define urgent action or move the page to an appropriate owned route", "Приховати всі 5xx / Hide all 5xx"], i: 1,
      note: why("Діагностичний сигнал може лишитися на графіку чи в задачі. Page потребує дії, меж, перевірки та ескалації, доступних черговому.", "A diagnostic signal may remain on a chart or ticket. A page needs action, bounds, validation, and escalation available to the responder."),
    },
  ]),
]);
