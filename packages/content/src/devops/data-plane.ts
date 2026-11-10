import { unit } from "../builders.js";
import { quiz, teach, why } from "./kit.js";

export const dataPlane = unit("data-plane", "База під сервісом", "The database under the service", [
  teach("do-data-place", "Де живе Postgres", "Where Postgres lives", 4, "do-data-place", [
    {
      t: "read", uk: "Що створить HPA, коли збільшить replicas цього forge-status до трьох?", en: "What will the HPA create when it increases this forge-status workload to three replicas?", lang: "yaml",
      code: "kind: Deployment\nspec:\n  replicas: 1\n  template:\n    spec:\n      containers:\n        - name: api\n          image: forge-status:lab\n        - name: postgres\n          image: postgres:17",
      o: ["Кластер Postgres із готовою реплікацією / A Postgres cluster with configured replication", "Три API Pod з окремими Postgres без налаштованої реплікації / Three API Pods with separate Postgres instances without configured replication", "Одну managed БД / One managed database"], i: 1,
      note: why("Sidecar пов'язує життєвий цикл БД із API Pod. Масштабування API не повинно створювати незалежні бази; це не production-топологія курсу.", "A sidecar couples database lifecycle to the API Pod. API scaling must not create independent databases; this is not the course's production topology."),
    },
    {
      t: "mcq", uk: "Команда обрала managed Postgres для production. Що залишається її відповідальністю?", en: "The team chose managed Postgres for production. What remains its responsibility?",
      o: ["Доступ, перевірка відновлення та цілі RPO/RTO / Access, recovery validation, and RPO/RTO objectives", "Припустити, що всі копії вже перевірені / Assume all backups are already validated", "Зберігати DSN відкрито у Git / Store the DSN in clear text in Git"], i: 0,
      note: why("Провайдер виконує частину операцій, але команда має довести відновлюваність свого сервісу й обмежити доступ.", "The provider handles part of operations, but the team must prove its service is recoverable and restrict access."),
    },
    {
      t: "fill", uk: "Самостійній БД потрібні стабільні імена та PVC. Заповніть контролер; він сам не налаштовує реплікацію.", en: "A self-managed database needs stable names and PVCs. Fill the controller kind; it does not configure replication itself.", lang: "yaml",
      code: "apiVersion: apps/v1\nkind: ___\nmetadata:\n  name: forge-postgres\nspec:\n  serviceName: forge-postgres\n  replicas: 1", ok: ["StatefulSet"],
      note: why("StatefulSet підтримує стабільну ідентичність і сховище через volumeClaimTemplates. Копії, оновлення та failover потребують окремого операційного плану.", "StatefulSet supports stable identity and storage through volumeClaimTemplates. Backups, upgrades, and failover require a separate operational plan."),
    },
    {
      t: "order", uk: "Упорядкуйте рішення щодо розміщення БД; кожне спирається на попереднє.", en: "Order database placement decisions; each depends on the previous one.", lang: "text",
      correct: ["Визначити вимоги до даних і відновлення / Define data and recovery requirements", "За вимогами обрати managed PG або StatefulSet і власника / Choose managed PG or StatefulSet and an owner from those requirements", "Налаштувати доступ, сховище та копії обраного варіанта / Configure access, storage, and backups for that choice", "Перевірити відновлення та заміну API Pod / Validate restoration and API Pod replacement"],
      note: why("Вибір контролера не доводить надійність. Перевірка має показати, що заміна API не втрачає дані та копія відновлюється.", "A controller choice does not prove reliability. Validation must show API replacement preserves data and a backup restores."),
    },
    {
      t: "match", uk: "Зіставте розміщення з операційною межею.", en: "Match placement to its operational boundary.",
      pairs: [{ left: "Managed Postgres", right: "Операції провайдера; перевірка відновлення команди / Provider operations; team-owned recovery validation" }, { left: "StatefulSet + PVC", right: "Стабільні ідентичність і сховище; операції БД команди / Stable identity and storage; team-owned database operations" }, { left: "Postgres sidecar API", right: "Спільний життєвий цикл Pod; лише навчальна схема / Shared Pod lifecycle; a lab arrangement only" }],
      note: why("Managed і самостійна БД відрізняються розподілом роботи. Sidecar не дає автоматичної production HA.", "Managed and self-managed databases divide responsibilities differently. A sidecar does not provide automatic production HA."),
    },
    {
      t: "read", uk: "Що доводить цей тест?", en: "What does this test prove?", lang: "text",
      code: "before: api-a -> managed-pg/forge\nafter: api-b -> managed-pg/forge\nmarker row: present\nrestore drill: not run",
      o: ["Повний DR уже перевірений / Full DR is already validated", "Копії більше не потрібні / Backups are no longer needed", "Заміна API зберегла дані; restore ще не перевірений / API replacement preserved data; restore remains untested"], i: 2,
      note: why("Відокремлення життєвих циклів пройшло цей тест. Втрата або пошкодження БД — інший сценарій.", "Lifecycle separation passed this test. Database loss or corruption is a different scenario."),
    },
  ]),
  teach("do-data-migrate", "Спочатку expand, потім contract", "Expand before contract", 5, "do-data-migrate", [
    {
      t: "read", uk: "Старі API ще читають summary. Чому новий entrypoint небезпечний?", en: "Old APIs still read summary. Why is this new entrypoint unsafe?", lang: "bash",
      code: "psql \"$DATABASE_URL\" -c 'ALTER TABLE incidents DROP COLUMN summary'\nnode dist/server.js",
      o: ["DROP змінює лише контейнер / DROP affects only the container", "Startup руйнує спільну схему старих реплік / Startup destroys the shared schema required by old replicas", "Rollback образу автоматично поверне колонку / Image rollback automatically restores the column"], i: 1,
      note: why("Контейнери можуть стартувати паралельно й повторно. Несумісний DROP має бути вилучений зі startup; міграція потребує окремого контрольованого кроку.", "Containers can start concurrently and repeatedly. Remove incompatible DROP from startup; migration needs a separate controlled step."),
    },
    {
      t: "order", uk: "Перенесіть summary у title зі збереженням сумісного rollback до contract.", en: "Move summary to title while preserving compatible rollback until contract.", lang: "text",
      correct: ["Додати nullable title, залишивши summary / Add nullable title while preserving summary", "Впровадити сумісні записи й backfill / Deploy compatible writes and backfill", "Перевірити повноту та перемкнути читання / Verify completeness and switch reads", "Після вікна rollback прибрати старі звернення й summary / After the rollback window, retire old accesses and summary"],
      note: why("Expand дає версіям час перейти. Contract виконують після перевірки даних і припинення використання старої структури.", "Expand gives versions time to transition. Contract follows data validation and retirement of old structure usage."),
    },
    {
      t: "fill", uk: "Окрема міграція додає нову колонку, не видаляючи summary. Заповніть ключове слово.", en: "A separate migration adds the new column without removing summary. Fill the keyword.", lang: "sql",
      code: "ALTER TABLE incidents ___ COLUMN title text;", ok: ["ADD", "add"],
      note: why("Nullable колонка підтримує старі читання. Ще потрібні контроль блокувань, перехід записувачів і backfill.", "A nullable column preserves old reads. Lock management, writer transition, and backfill are still required."),
    },
    {
      t: "match", uk: "Зіставте етапи зміни схеми.", en: "Match schema-change stages.",
      pairs: [{ left: "expand", right: "Додати сумісну структуру / Add compatible structure" }, { left: "backfill", right: "Перенести історичні дані малими пакетами / Populate historical data in small batches" }, { left: "contract", right: "Прибрати старе після переходу читачів / Remove the old shape after readers transition" }],
      note: why("Backfill контролюють за навантаженням. Видалення старого — окреме рішення після вікна сумісності.", "Control backfill load. Removing the old shape is a separate decision after the compatibility window."),
    },
    {
      t: "read", uk: "Чи можна вже видалити summary?", en: "Can summary be dropped yet?", lang: "text",
      code: "rows_missing_title: 317\nold_api_replicas: 2\nnew_api_replicas: 2\nrollback_window: open",
      o: ["Ні: дані неповні та старі читачі працюють / No: data is incomplete and old readers still run", "Так: нові репліки вже є / Yes: new replicas exist", "Так: DROP завершить backfill / Yes: DROP completes backfill"], i: 0,
      note: why("Неповний backfill, стара версія й відкритий rollback блокують contract. Готовність нової репліки не усуває цих умов.", "Incomplete backfill, old code, and an open rollback window block contract. New replica readiness does not remove these conditions."),
    },
    {
      t: "mcq", uk: "Хто запускає міграцію, коли десять контейнерів одночасно стартують після збою?", en: "Who runs the migration when ten containers start together after a failure?",
      o: ["Кожен без координації / Each without coordination", "Будь-який запит користувача / Any user request", "Окремий migration Job із захистом від конкуренції / A separate migration Job with concurrency protection"], i: 2,
      note: why("Job відокремлює зміну схеми від startup і дає видимий статус. Права, координація та сумісність усе одно потрібні.", "A Job separates schema change from startup and provides visible status. Permissions, coordination, and compatibility remain necessary."),
    },
  ]),
  teach("do-data-backup", "Snapshot, PITR і перевірка копії", "Snapshots, PITR, and copy validation", 5, "do-data-backup", [
    {
      t: "read", uk: "DELETE стався о 09:40 UTC. Як дослідити стан перед ним без перезапису production?", en: "DELETE happened at 09:40 UTC. How can the preceding state be inspected without overwriting production?", lang: "text",
      code: "consistent snapshot: 09:00 UTC\nrequired continuous WAL: 09:00-10:00 UTC\nDELETE: 09:40 UTC\ntarget: new isolated instance",
      o: ["Відновити базу й WAL до моменту перед DELETE на ізольованій копії / Restore the base and WAL to just before DELETE on an isolated copy", "Перезаписати робочу БД без перевірки / Overwrite the live database without validation", "Перейменувати snapshot на production / Rename the snapshot to production"], i: 0,
      note: why("PITR використовує базову копію й потрібний безперервний WAL. Окрема ціль дозволяє перевірити дані та звірити пізніші коректні записи.", "PITR uses a base backup and required continuous WAL. A separate target permits validation and reconciliation of later legitimate writes."),
    },
    {
      t: "fill", uk: "Це запис плану, не API провайдера. Вставте час у хвилину перед DELETE о 09:40 UTC.", en: "This is a plan record, not a provider API. Fill the time in the minute before the 09:40 UTC DELETE.", lang: "yaml",
      code: "source: forge-prod\nrestoreTo: forge-restore-drill\nrecoveryTargetUtc: '2026-11-10T___:00Z'", ok: ["09:39"],
      note: why("Точка 09:39 виключає DELETE, але не містить пізніших коректних змін. Їхню звірку планують до перемикання.", "09:39 excludes the DELETE but omits later legitimate changes. Plan their reconciliation before cutover."),
    },
    {
      t: "order", uk: "Упорядкуйте restore drill без перемикання робочого трафіку.", en: "Order a restore drill without switching live traffic.", lang: "text",
      correct: ["Вибрати придатну копію й цільову точку / Select a usable backup and target point", "Відновити копію та потрібний WAL на ізольованій цілі / Restore the backup and required WAL to an isolated target", "Перевірити цілісність і прикладне читання / Validate integrity and application reads", "Записати точку, тривалість і прогалини / Record achieved point, duration, and gaps"],
      note: why("Успішний snapshot доводить завершення резервування. Відновлення і прикладна перевірка доводять придатність копії.", "A successful snapshot proves backup completion. Restoration and application validation demonstrate backup usability."),
    },
    {
      t: "match", uk: "Зіставте механізми резервування.", en: "Match backup mechanisms.",
      pairs: [{ left: "consistent snapshot", right: "Узгоджена базова точка даних / Consistent baseline data point" }, { left: "PITR", right: "Базова копія й журнал до обраного моменту / Base backup and log up to a chosen time" }, { left: "isolated restore copy", right: "Окрема ціль перевірки без робочого трафіку / Separate validation target without live traffic" }],
      note: why("Snapshot має бути придатним для Postgres. Самої наявності файлів без потрібного WAL та перевірки читання недостатньо.", "The snapshot must be suitable for Postgres. Files alone without required WAL and read validation are insufficient."),
    },
    {
      t: "read", uk: "Чому точка 09:39 ще не є доведено досяжною?", en: "Why is 09:39 not yet proven reachable?", lang: "text",
      code: "base verified: 09:00\nWAL present: 09:00-09:20\nWAL missing: 09:20-09:25\nWAL present: 09:25-10:00\nrequested point: 09:39",
      o: ["Пізніший WAL сам заповнить прогалину / Later WAL fills the gap automatically", "У потрібному ланцюжку журналу є розрив / The required log chain has a gap", "Snapshot містить усі майбутні зміни / The snapshot contains all future changes"], i: 1,
      note: why("Для цієї бази потрібна безперервна послідовність журналу. Сегменти після прогалини самі не забезпечують PITR.", "This base needs a continuous log sequence. Segments after a gap do not provide PITR by themselves."),
    },
    {
      t: "mcq", uk: "Копія читається. Що потрібно перед реальним перемиканням після втрати даних?", en: "The copy is readable. What is required before a real cutover after data loss?",
      o: ["Писати на двох незалежних primary / Write to two independent primaries", "Ігнорувати пізніші коректні записи / Ignore later legitimate writes", "Узгодити звірку, єдиного записувача й перевірку сервісу / Agree reconciliation, a single writer, and service validation"], i: 2,
      note: why("Перевірена копія — лише передумова. План має охопити новіші дані та запобігання розбіжним записам.", "A validated copy is only a prerequisite. The plan must address later data and prevent divergent writes."),
    },
  ]),
  teach("do-data-pool", "HPA, з'єднання та PgBouncer", "HPA, connections, and PgBouncer", 4, "do-data-pool", [
    {
      t: "read", uk: "HPA хоче вісім API Pod. Який ризик без PgBouncer?", en: "The HPA wants eight API Pods. What is the risk without PgBouncer?", lang: "text",
      code: "max_connections: 120\noperations reserve: 20\nother clients: 20\nAPI pool max per Pod: 15\nHPA replicas: 8",
      o: ["API потребує лише 15 слотів / The API needs only 15 slots", "120 слотів API перевищують його бюджет 80 / 120 API slots exceed its budget of 80", "HPA збільшує max_connections / HPA increases max_connections"], i: 1,
      note: why("8 × 15 = 120, але доступно 120 − 20 − 20 = 80. HPA масштабує API, а не серверні слоти Postgres.", "8 × 15 = 120, but 120 − 20 − 20 = 80 are available. HPA scales the API, not Postgres server slots."),
    },
    {
      t: "fill", uk: "Поверніть серверне з'єднання PgBouncer після завершення транзакції. Заповніть режим.", en: "Release a PgBouncer server connection when the transaction ends. Fill the mode.", lang: "ini",
      code: "[pgbouncer]\npool_mode = ___\ndefault_pool_size = 40\nmax_client_conn = 400", ok: ["transaction"],
      note: why("Transaction pooling відділяє клієнтів від зайнятих серверних з'єднань. Сесійні можливості клієнта треба перевірити на сумісність.", "Transaction pooling separates clients from occupied server connections. Check client session features for compatibility."),
    },
    {
      t: "order", uk: "Упорядкуйте підвищення maxReplicas із перевіркою межі БД.", en: "Order raising maxReplicas while validating database limits.", lang: "text",
      correct: ["Порахувати бюджет з усіма пулами та резервом / Calculate the budget including all pools and reserve", "Узгодити ліміти клієнтів, PgBouncer та HPA / Align client, PgBouncer, and HPA limits", "Перевірити очікування й тайм-аути під навантаженням / Load-test waits and timeouts", "За результатами дозволити нову межу / Use results to authorize the new limit"],
      note: why("Пулер може чергувати клієнтів, але не створює необмежену місткість. Очікування має бути видимим і обмеженим.", "A pooler can queue clients but cannot create unlimited capacity. Waiting must be observable and bounded."),
    },
    {
      t: "match", uk: "Зіставте ліміти різних рівнів.", en: "Match limits at different layers.",
      pairs: [{ left: "API pool max", right: "Клієнтські з'єднання одного процесу / Client connections from one process" }, { left: "PgBouncer max_client_conn", right: "Прийняті клієнти пулера / Accepted pooler clients" }, { left: "Postgres max_connections", right: "Серверні слоти для всіх споживачів / Server slots for all consumers" }],
      note: why("default_pool_size не глобальна межа: враховуйте окремі пули database/user та всі екземпляри пулера.", "default_pool_size is not a global cap: account for separate database/user pools and every pooler instance."),
    },
    {
      t: "out", uk: "Скільки прямих серверних слотів можуть зайняти API Pod після HPA?", en: "How many direct server slots can API Pods occupy after HPA scaling?", lang: "python",
      code: "replicas = 6\npool_per_pod = 12\nprint(replicas * pool_per_pod)", o: ["18", "12", "72"], i: 2,
      note: why("Кожен Pod має незалежний пул: 6 × 12 = 72. Міграції та воркери потребують додаткового бюджету.", "Each Pod has an independent pool: 6 × 12 = 72. Migrations and workers require additional budget."),
    },
    {
      t: "mcq", uk: "Після HPA pool_wait росте, БД уже на межі. Яка дія обґрунтована?", en: "After HPA scaling, pool_wait grows and the database is already at capacity. Which action is justified?",
      o: ["Обмежити паралельність і перевірити довгі транзакції / Bound concurrency and inspect long transactions", "Безмежно збільшити пул / Increase the pool without bounds", "Прибрати всі тайм-аути / Remove every timeout"], i: 0,
      note: why("Додаткові одночасні запити збільшують конкуренцію. Межа має відповідати місткості БД, а не лише CPU API.", "More simultaneous queries increase contention. The limit must reflect database capacity, not just API CPU."),
    },
  ]),
  teach("do-data-rpo", "RPO та RTO у хвилинах", "RPO and RTO in minutes", 4, "do-data-rpo", [
    {
      t: "read", uk: "Окремий restore drill копії з do-data-backup дав ці виміри. Який можливий розрив даних у хвилинах?", en: "A separate restore drill of the do-data-backup copy produced these measurements. What is the possible data gap in minutes?", lang: "text",
      code: "latest recoverable commit: 09:57 UTC\nfailure: 10:00 UTC\nrestore completed: 10:18 UTC\nvalidation completed: 10:23 UTC\ntraffic restored: 10:27 UTC",
      o: ["27", "18", "3"], i: 2,
      note: why("Можливий розрив — 10:00 − 09:57 = 3 хв. Фактичну втрату звіряють за даними й порівнюють із цільовим RPO.", "The possible gap is 10:00 − 09:57 = 3 minutes. Reconcile actual loss against data and compare with the RPO target."),
    },
    {
      t: "out", uk: "За вимірами цієї копії скільки хвилин тривало повне відновлення послуги?", en: "From this copy's measurements, how many minutes did complete service recovery take?", lang: "python",
      code: "restore = 18\nvalidate = 5\ncutover = 4\nprint(restore + validate + cutover)", o: ["18", "27", "23"], i: 1,
      note: why("Відновлення, перевірка й перемикання разом дають 27 хв. Самі 18 хв restore не доводять RTO сервісу.", "Restore, validation, and cutover total 27 minutes. An 18-minute restore alone does not prove service RTO."),
    },
    {
      t: "fill", uk: "Ціль RTO — 30 хв, повне відновлення — 27. Заповніть запас.", en: "The RTO target is 30 minutes and full recovery took 27. Fill the headroom.", lang: "text",
      code: "RTO target: 30 min\nmeasured recovery: 27 min\nheadroom: ___ min", ok: ["3"],
      note: why("Запас лише 3 хв. Більша база або недоступні ключі можуть змінити час; вимірювання треба повторювати за суттєвих змін.", "Headroom is only 3 minutes. A larger database or unavailable keys can change timing; repeat measurements after material changes."),
    },
    {
      t: "match", uk: "Зіставте мету або вимір із визначенням.", en: "Match the objective or measurement to its definition.",
      pairs: [{ left: "RPO target: 5 min", right: "Допустимий часовий розрив даних / Tolerable data-time gap" }, { left: "RTO target: 30 min", right: "Цільова межа повернення послуги / Target service recovery limit" }, { left: "isolated restore: 18 min", right: "Вимір одного етапу без повного повернення сервісу / One stage measurement without complete service recovery" }],
      note: why("Цілі задають до інциденту, а фактичні точки й час вимірюють. Частота копій сама по собі не доводить досягнення цілей.", "Set objectives before an incident and measure actual points and durations. Backup frequency alone does not prove objectives are met."),
    },
    {
      t: "order", uk: "Отримайте перевірений висновок щодо RPO/RTO наступного тренування.", en: "Produce an evidence-based RPO/RTO assessment for the next drill.", lang: "text",
      correct: ["Зафіксувати цілі й момент умовного збою / Record objectives and simulated failure time", "Відновити копію та визначити її останній commit / Restore the copy and identify its latest commit", "Перевірити сервіс і час повернення трафіку / Validate service and record traffic return time", "Обчислити розрив і тривалість та порівняти з цілями / Calculate gap and duration and compare with objectives"],
      note: why("Для порівняння потрібні всі часові точки. Не підміняйте цілі виміряними значеннями після тесту.", "Comparison needs all relevant timestamps. Do not redefine objectives as measured values after the test."),
    },
    {
      t: "mcq", uk: "Є лише snapshot о 09:00, збій о 10:00, WAL немає. Ціль RPO — 5 хв. Який висновок?", en: "Only a 09:00 snapshot exists, failure is at 10:00, and no WAL is available. The RPO target is 5 minutes. What follows?",
      o: ["Можливий розрив 60 хв не відповідає цілі / A possible 60-minute gap misses the target", "Швидкий restore прибере розрив / A fast restore removes the gap", "RPO автоматично дорівнює 5 хв / RPO automatically becomes 5 minutes"], i: 0,
      note: why("Швидкість впливає на RTO, але не створює відсутні зміни. Потрібні частіші придатні точки або перевірений PITR.", "Speed affects RTO but does not recreate missing changes. More frequent usable points or validated PITR are needed."),
    },
  ]),
  teach("do-data-dsn", "DSN через External Secrets або SOPS", "DSNs through External Secrets or SOPS", 4, "do-data-dsn", [
    {
      t: "read", uk: "DSN вигаданий. Чому така форма production values.yaml неприйнятна навіть у приватному Git?", en: "The DSN is fictional. Why is this production values.yaml shape unacceptable even in private Git?", lang: "yaml",
      code: "env:\n  DATABASE_URL: postgresql://forge:example-only@db.invalid/forge",
      o: ["YAML автоматично шифрує значення / YAML automatically encrypts values", "Git зберігає пароль в історії; потрібне посилання або шифрування / Git retains the password in history; use a reference or encryption", "Назва змінної приховує значення / The variable name hides the value"], i: 1,
      note: why("Зберігайте External Secrets-посилання або SOPS ciphertext. Видалення відкритого пароля наступним комітом не прибирає його з історії.", "Store an External Secrets reference or SOPS ciphertext. Removing a clear-text password in a later commit does not remove it from history."),
    },
    {
      t: "fill", uk: "DSN уже доставлений у Secret forge-db. Доповніть посилання контейнера без відкритого значення.", en: "The DSN is already delivered to Secret forge-db. Complete the container reference without a clear-text value.", lang: "yaml",
      code: "env:\n  - name: DATABASE_URL\n    valueFrom:\n      ___:\n        name: forge-db\n        key: dsn", ok: ["secretKeyRef"],
      note: why("secretKeyRef читає ключ Secret. Base64 не є шифруванням: потрібні RBAC та захист зберігання.", "secretKeyRef reads a Secret key. Base64 is not encryption: RBAC and storage protection are required."),
    },
    {
      t: "order", uk: "У цьому варіанті використано External Secrets. Упорядкуйте шлях DSN до нового API Pod.", en: "This option uses External Secrets. Order the DSN path to a new API Pod.", lang: "text",
      correct: ["Записати DSN у захищене зовнішнє сховище / Store the DSN in the protected external store", "Налаштувати ExternalSecret на remote key / Configure ExternalSecret for the remote key", "Перевірити синхронізацію Secret без друку DSN / Verify Secret synchronization without printing the DSN", "Створити Pod із secretKeyRef і перевірити доступ / Create a Pod with secretKeyRef and verify access"],
      note: why("Оператор синхронізує значення в Kubernetes Secret. Sync перевіряють до старту залежного Pod; пароль не потрібен у журналі перевірки.", "The operator synchronizes into a Kubernetes Secret. Check sync before dependent Pod startup; validation logs do not need the password."),
    },
    {
      t: "match", uk: "Зіставте засоби доставки DSN.", en: "Match DSN delivery tools.",
      pairs: [{ left: "External Secrets", right: "Синхронізація зовнішнього сховища в Secret / External store synchronization into a Secret" }, { left: "SOPS", right: "Зашифрований документ у Git і контрольоване дешифрування / Encrypted document in Git and controlled decryption" }, { left: "secretKeyRef", right: "Посилання Pod на ключ Secret / Pod reference to a Secret key" }],
      note: why("External Secrets і SOPS — альтернативні шляхи. Обидва потребують обмежених прав до сховища або ключів дешифрування.", "External Secrets and SOPS are alternative paths. Both require restricted store or decryption-key access."),
    },
    {
      t: "read", uk: "Що доводить цей результат?", en: "What does this result prove?", lang: "text",
      code: "ExternalSecret/forge-db: Ready=True\nSecret/forge-db: resourceVersion=42\napi-a started before version 42\napi-a uses env DATABASE_URL\nauthentication: failed",
      o: ["Усі процеси мають новий DSN / All processes have the new DSN", "Треба опублікувати DSN / Publish the DSN", "Secret синхронізовано, але env старого процесу не оновився / The Secret synced, but the old process environment did not update"], i: 2,
      note: why("Env читається на старті контейнера. Ротація потребує контрольованого rollout або явного підтримуваного механізму перечитування.", "Environment variables are read at container startup. Rotation needs controlled rollout or an explicit supported reload mechanism."),
    },
    {
      t: "mcq", uk: "Обрано SOPS. Хто має право дешифрувати production DSN?", en: "SOPS is selected. Who should have permission to decrypt the production DSN?",
      o: ["Усі читачі Git за замовчуванням / All Git readers by default", "Контрольована deployment identity та уповноважені оператори / The controlled deployment identity and authorized operators", "Ключ відкрито лежить поруч у values.yaml / The key lies in clear text beside it in values.yaml"], i: 1,
      note: why("Ciphertext можна версіонувати, але ключі та права дешифрування мають бути відокремлені й обмежені.", "Ciphertext can be versioned, but keys and decryption permissions must remain separate and restricted."),
    },
  ]),
  quiz("do-data-exam", "Іспит: копія, яку не відновлювали", "Exam: the never-restored backup", 5, "do-data-exam", [
    {
      t: "read", uk: "Який висновок випливає зі звіту?", en: "What follows from this report?", lang: "text",
      code: "nightly snapshots: SUCCESS\nretention: 14 days\nrestore drills: NEVER\nclaimed service RTO: 20 min",
      o: ["RTO 20 хв доведений / A 20-minute RTO is proven", "Копії є, відновлюваність і RTO не перевірені / Backups exist, recoverability and RTO are unverified", "Snapshot виключає пошкодження / A snapshot rules out corruption"], i: 1,
      note: why("Зелена задача резервування не перевіряє читання відновлених даних. Потрібен ізольований тест повного шляху.", "A green backup job does not validate restored data reads. An isolated end-to-end test is required."),
    },
    {
      t: "order", uk: "Доведіть придатність копії без перезапису production.", en: "Demonstrate backup usability without overwriting production.", lang: "text",
      correct: ["Вибрати копію та зафіксувати точку й початок тесту / Choose a backup and record its point and test start", "Відновити її на ізольованій цілі / Restore it to an isolated target", "Перевірити дані та прикладний шлях / Validate data and the application journey", "Порівняти виміряні розрив і час із RPO/RTO / Compare measured gap and time with RPO/RTO"],
      note: why("Кожен висновок спирається на попередню перевірку. Завершення restore ще не означає повернення послуги.", "Each conclusion relies on prior validation. Restore completion does not yet mean service recovery."),
    },
    {
      t: "read", uk: "Резерв — 20, інші клієнти — 20, max_connections — 120. Який ризик HPA?", en: "Reserve is 20, other clients use 20, and max_connections is 120. What is the HPA risk?", lang: "text",
      code: "API direct pool max: 15\nHPA maxReplicas: 8\nPgBouncer: absent",
      o: ["8 × 15 перевищує бюджет API 80 / 8 × 15 exceeds the API budget of 80", "Вісім Pod ділять один пул 15 / Eight Pods share one pool of 15", "HPA додає серверні слоти / HPA adds server slots"], i: 0,
      note: why("Можливі 120 API-з'єднань плюс інші споживачі. Узгодьте HPA з бюджетом і пулером.", "Up to 120 API connections are possible plus other consumers. Align HPA with the budget and pooler."),
    },
    {
      t: "order", uk: "Старі API ще читають summary. Упорядкуйте перехід без DROP на startup.", en: "Old APIs still read summary. Order transition without startup DROP.", lang: "text",
      correct: ["Окремою міграцією додати title / Add title in a separate migration", "Впровадити сумісні записи й завершити backfill / Deploy compatible writes and finish backfill", "Перевести читання та закрити вікно старого rollback / Move reads and close the old rollback window", "Окремо видалити невикористовувану summary / Separately remove unused summary"],
      note: why("Expand-contract зберігає сумісність під час переходу. Повторний startup не повинен руйнувати спільну схему.", "Expand-contract preserves transition compatibility. Repeated startup must not destroy shared schema."),
    },
    {
      t: "out", uk: "Збій о 10:00, останній відновлюваний commit о 09:48. Який розрив у хвилинах?", en: "Failure is at 10:00, latest recoverable commit at 09:48. What is the gap in minutes?", lang: "python",
      code: "failure_minute = 10 * 60\nrecoverable_minute = 9 * 60 + 48\nprint(failure_minute - recoverable_minute)", o: ["48", "60", "12"], i: 2,
      note: why("12 хвилин перевищують ціль RPO 5 хв незалежно від швидкості restore.", "12 minutes exceeds a 5-minute RPO target regardless of restore speed."),
    },
    {
      t: "fill", uk: "Доповніть посилання на DSN без clear text у Helm values.", en: "Complete the DSN reference without clear text in Helm values.", lang: "yaml",
      code: "- name: DATABASE_URL\n  valueFrom:\n    ___:\n      name: forge-db\n      key: dsn", ok: ["secretKeyRef"],
      note: why("Значення доставляють через External Secrets або SOPS. Маніфест Pod містить посилання, а не пароль.", "Supply the value through External Secrets or SOPS. The Pod manifest holds a reference, not a password."),
    },
    {
      t: "match", uk: "Зіставте прогалини з наступною дією.", en: "Match gaps to the next action.",
      pairs: [{ left: "Postgres sidecar у prod API / Postgres sidecar in prod API", right: "Обрати managed PG або окремий StatefulSet з операційним планом / Choose managed PG or a separate StatefulSet with an operational plan" }, { left: "Snapshot є, restore не було / Snapshot exists, no restore run", right: "Перевірити ізольовану копію / Validate an isolated copy" }, { left: "DSN відкритий у Git / DSN exposed in Git", right: "Ротувати й перейти на External Secrets або SOPS / Rotate and adopt External Secrets or SOPS" }],
      note: why("Розміщення, відновлюваність і секрети потребують різних конкретних дій. Загальний restart не закриває жодної прогалини.", "Placement, recoverability, and secrets require different specific actions. A general restart closes none of these gaps."),
    },
    {
      t: "mcq", uk: "Restore завершився за 15 хв, але читання не працює. Що записати у звіт?", en: "Restore finished in 15 minutes, but reads fail. What belongs in the report?",
      o: ["RTO доведено як 15 хв / RTO proven as 15 minutes", "Відновлення послуги не доведено; записати збій і власника виправлення / Service recovery is unproven; record the failure and remediation owner", "Копія точно придатна / The copy is certainly usable"], i: 1,
      note: why("Файли без робочого прикладного шляху не є відновленою послугою. Прогалину перевірки треба явно закрити.", "Files without a working application journey are not recovered service. The validation gap must be explicitly resolved."),
    },
  ]),
]);
