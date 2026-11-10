import { unit } from "../builders.js";
import { quiz, teach, why } from "./kit.js";

export const incidentDrills = unit("incident-drills", "Нічні зміни", "Nights on forge-status", [
  teach("do-drill-cert", "Сертифікат прострочений, renewal не пройшов", "Expired certificate after failed renewal", 4, "do-drill-cert", [
    {
      t: "comprehension", uk: "Прочитайте коротку хронологію TLS-збою forge-status.", en: "Read the short timeline of the forge-status TLS failure.",
      passage: "UK\n01:40 UTC — cert-manager: renewal не пройшов, HTTP-01 challenge повертає 404 після зміни Ingress.\n02:00 — завершується строк сертифіката status.example.invalid.\n02:03 — зовнішній probe повідомляє certificate expired; API усередині кластера відповідає 200.\n\nEN\n01:40 UTC — cert-manager renewal fails: the HTTP-01 challenge returns 404 after an Ingress change.\n02:00 — the certificate for status.example.invalid expires.\n02:03 — the external probe reports certificate expired; the internal API returns 200.",
      questions: [{ q: "Який ланцюг підтверджений хронологією? / Which sequence is supported by the timeline?", qEn: "Which sequence is supported by the timeline?", options: ["Провал renewal передував простроченню й зовнішньому TLS-збою / Renewal failure preceded expiry and external TLS failure", "API 200 доводить здоровий публічний TLS / Internal API 200 proves public TLS is healthy", "Спочатку вийшла з ладу БД / The database failed first"], correctIndex: 0 }],
      note: why("Події вказують на крайовий TLS-шлях і невдале поновлення, а не на потребу рестартувати API. Внутрішня відповідь не перевіряє публічний сертифікат.", "The events point to edge TLS and failed renewal, not a need to restart the API. An internal response does not validate the public certificate."),
    },
    {
      t: "order", uk: "Збережіть докази, відновіть renewal і перевірте саме публічний шлях. Упорядкуйте залежні кроки.", en: "Preserve evidence, restore renewal, and validate the public path. Order the dependent steps.", lang: "text",
      correct: ["Зовні перевірити host, строк і сертифікат, який реально видається / Externally inspect the host, validity, and actually served certificate", "Зіставити його з Certificate, Secret і challenge Events / Correlate it with Certificate, Secret, and challenge Events", "За підтвердженим 404 виправити маршрут challenge та повторити renewal за процедурою / For the confirmed 404, fix challenge routing and retry renewal through the procedure", "Перевірити новий сертифікат зовні та успіх користувацьких запитів / Verify the new certificate externally and successful user requests"],
      note: why("Лише перезапуск Pod не виправляє недоступний challenge. Кінець процедури — новий сертифікат на публічному endpoint, а не лише зелений контролер.", "Restarting Pods alone does not fix an unreachable challenge. The procedure ends with the new certificate on the public endpoint, not merely a green controller."),
    },
    {
      t: "read", uk: "Що пояснює відсутність нового сертифіката?", en: "What explains the missing replacement certificate?", lang: "text",
      code: "Certificate/forge-public: Ready=False\nReason: Failed\nChallenge: http-01\nself-check: GET /.well-known/acme-challenge/... -> 404\nIngress recent change: unmatched paths -> application backend",
      o: ["Потрібно вимкнути TLS-перевірку у клієнтів / Disable TLS validation in clients", "Challenge не доходить до solver; перевірити маршрутизацію / The challenge does not reach the solver; inspect routing", "CPU API доводить причину / API CPU proves the cause"], i: 1,
      note: why("404 у self-check дає конкретну гіпотезу маршруту HTTP-01. Виправлення має зберегти TLS-перевірку та штатне поновлення.", "A self-check 404 supplies a concrete HTTP-01 routing hypothesis. The fix must preserve TLS validation and normal renewal."),
    },
    {
      t: "fill", uk: "Перевіряйте потрібне ім'я через SNI. Заповніть опцію openssl; команда лише читає сертифікат.", en: "Inspect the intended hostname through SNI. Fill the openssl option; this command only reads the certificate.", lang: "bash",
      code: "openssl s_client -connect status.example.invalid:443 -___ status.example.invalid </dev/null 2>/dev/null | openssl x509 -noout -dates -serial", ok: ["servername"],
      note: why("SNI обирає правильний сертифікат на спільному TLS endpoint. Без нього можна випадково перевірити типовий сертифікат іншого host.", "SNI selects the correct certificate on a shared TLS endpoint. Without it, inspection may show another host's default certificate."),
    },
    {
      t: "match", uk: "Зіставте докази TLS-інциденту.", en: "Match TLS incident evidence.",
      pairs: [{ left: "notAfter", right: "Час завершення чинності сертифіката / Certificate expiry time" }, { left: "Certificate Events", right: "Спроби й помилки видачі або renewal / Issuance or renewal attempts and errors" }, { left: "served serial", right: "Який сертифікат бачить зовнішній клієнт / Which certificate the external client receives" }],
      note: why("Треба перевірити і процес поновлення, і результат на endpoint. Новий Secret сам по собі не доводить, що Ingress уже видає новий сертифікат.", "Check both the renewal process and the endpoint result. A new Secret alone does not prove the Ingress serves the new certificate."),
    },
    {
      t: "read", uk: "Renewal завершився. Чому інцидент ще не можна закрити?", en: "Renewal completed. Why can the incident not yet be closed?", lang: "text",
      code: "Certificate: Ready=True\nSecret serial: 9002, valid\npublic endpoint serial: 8110, expired\nexternal probe: TLS failure",
      o: ["Ready=True достатньо / Ready=True is enough", "Клієнти повинні ігнорувати строк / Clients should ignore expiry", "Endpoint ще видає старий сертифікат; перевірити binding і reconcile / The endpoint still serves the old certificate; inspect binding and reconciliation"], i: 2,
      note: why("Нова копія є, але шлях доставки сертифіката ще не відновлений. Перевіряють Secret reference й стан Ingress/controller перед цільовою дією.", "The replacement exists but certificate delivery is not recovered. Check the Secret reference and Ingress/controller state before targeted action."),
    },
  ]),
  teach("do-drill-digest", "Тег пересунувся, digest не закріплений", "Moved tag, unpinned digest", 4, "do-drill-digest", [
    {
      t: "comprehension", uk: "Прочитайте хронологію двох версій за одним тегом.", en: "Read the timeline of two versions behind one tag.",
      passage: "UK\n00:10 UTC — Deployment посилається на forge-status:prod; старі Pod працюють із digest A.\n00:20 — registry пересуває тег prod на digest B без зміни Git.\n00:25 — новий вузол завантажує тег і запускає Pod із B; старі Pod залишаються на A. Помилки зосереджені на B.\n\nEN\n00:10 UTC — the Deployment references forge-status:prod; existing Pods run digest A.\n00:20 — the registry moves prod to digest B without a Git change.\n00:25 — a new node pulls the tag and starts a Pod with B; existing Pods remain on A. Errors concentrate on B.",
      questions: [{ q: "Чому одна декларація дала різні версії? / Why did one declaration produce different versions?", qEn: "Why did one declaration produce different versions?", options: ["Тег гарантує незмінність вмісту / A tag guarantees immutable content", "Незакріплений тег змінив відповідний digest / The unpinned tag changed its resolved digest", "Digest залежить лише від імені Pod / A digest depends only on the Pod name"], correctIndex: 1 }],
      note: why("Тег може рухатися, а вже запущені контейнери не замінюють образ самі. Порівнюють фактичні imageID, а не лише однакові рядки image.", "A tag can move while running containers do not replace their images automatically. Compare actual imageIDs, not just matching image strings."),
    },
    {
      t: "order", uk: "Сумісний digest A є у registry. Відновіть сервіс і зафіксуйте незмінне бажане значення.", en: "Compatible digest A exists in the registry. Restore service and establish an immutable desired value.", lang: "text",
      correct: ["Зберегти imageID Pod і зіставити 5xx із digest / Preserve Pod imageIDs and correlate 5xx with digests", "Підтвердити A як справний та сумісний із поточною схемою / Confirm A is healthy and compatible with the current schema", "Записати A як pinned digest у бажаний Git-стан і виконати узгоджений sync / Pin A in desired Git state and perform the agreed sync", "Перевірити фактичні imageID та 5xx після rollout / Verify actual imageIDs and 5xx after rollout"],
      note: why("Перезапуск незакріпленого тегу може завантажити ще більше B. Бажаний стан повинен посилатися на перевірений незмінний артефакт.", "Restarting the unpinned tag may pull more B. Desired state must reference the verified immutable artifact."),
    },
    {
      t: "read", uk: "Digest у витязі скорочені. Що приховує однаковий рядок image?", en: "Digests in this excerpt are abbreviated. What does the identical image string hide?", lang: "text",
      code: "POD    IMAGE                 IMAGEID\napi-a  forge-status:prod     ...@sha256:aaaa\napi-b  forge-status:prod     ...@sha256:bbbb\n5xx: api-a=0.1%, api-b=22%",
      o: ["Різні фактичні образи та кореляцію помилок із B / Different actual images and error correlation with B", "Обидва Pod гарантовано виконують однакові байти / Both Pods certainly run identical bytes", "Треба видалити метрику 5xx / Delete the 5xx metric"], i: 0,
      note: why("image — бажане посилання, imageID — фактично запущений вміст. Кореляція дає гіпотезу для сумісного rollback, але не повний доказ дефекту коду.", "image is the desired reference; imageID identifies actual running content. Correlation supports a compatible rollback hypothesis but is not complete proof of a code defect."),
    },
    {
      t: "fill", uk: "Закріпіть перевірений образ за повним digest. Вставте роздільник перед sha256.", en: "Pin the verified image by its full digest. Insert the separator before sha256.", lang: "yaml",
      code: "image: ghcr.io/edu/forge-status___sha256:1111111111111111111111111111111111111111111111111111111111111111", ok: ["@"],
      note: why("name@sha256:… посилається на незмінний digest. У прикладі digest умовний; у rollout беруть перевірений фактичний digest із registry.", "name@sha256:… references an immutable digest. This digest is illustrative; use a verified actual registry digest in rollout."),
    },
    {
      t: "match", uk: "Зіставте поля образу.", en: "Match image fields.",
      pairs: [{ left: ":prod", right: "Рухоме ім'я тегу / Mutable tag name" }, { left: "@sha256:…", right: "Посилання на конкретний вміст / Reference to specific content" }, { left: "status.containerStatuses[].imageID", right: "Доказ фактично запущеного образу / Evidence of the actual running image" }],
      note: why("Однаковий тег не є доказом однакової версії. Після sync потрібна перевірка actual imageID і користувацьких показників.", "Matching tags do not prove matching versions. After sync, check actual imageIDs and user-facing metrics."),
    },
    {
      t: "read", uk: "Чому пропозиція restart усіх Pod не є безпечним поверненням до A?", en: "Why is restarting all Pods not a safe return to A?", lang: "yaml",
      code: "image: forge-status:prod\nimagePullPolicy: Always\n# registry prod now resolves to B\n# currently: two healthy A Pods, one failing B Pod",
      o: ["Always означає завжди A / Always means always A", "Restart автоматично відновить Git / Restart automatically restores Git", "Нові старти можуть усі отримати B й прибрати справну місткість A / New starts may all get B and remove healthy A capacity"], i: 2,
      note: why("Always перевіряє посилання при старті, а не пам'ятає старий вміст тегу. Спочатку фіксують перевірений digest у бажаному стані.", "Always resolves the reference at startup rather than remembering the tag's old content. First pin the verified digest in desired state."),
    },
  ]),
  teach("do-drill-disk", "Диск, логи та eviction", "Disk pressure, logs, and eviction", 4, "do-drill-disk", [
    {
      t: "comprehension", uk: "Прочитайте хронологію тиску на диск вузла.", en: "Read the node disk-pressure timeline.",
      passage: "UK\n01:00 UTC — після debug-конфігурації логи контейнера forge-status швидко ростуть.\n01:12 — node-a: вільне nodefs 3%, DiskPressure=True.\n01:14 — kubelet виселяє API Pod через ephemeral-storage; у БД PVC залишається достатньо місця.\n\nEN\n01:00 UTC — container logs grow rapidly after a debug configuration change.\n01:12 — node-a has 3% free nodefs and DiskPressure=True.\n01:14 — kubelet evicts an API Pod for ephemeral-storage; the database PVC still has sufficient free space.",
      questions: [{ q: "Який ресурс показано як проблему? / Which resource is shown as the problem?", qEn: "Which resource is shown as the problem?", options: ["Обов'язково PVC БД / Necessarily the database PVC", "Сертифікат Ingress / The Ingress certificate", "Локальний диск вузла з контейнерними логами / The node-local disk holding container logs"], correctIndex: 2 }],
      note: why("Події розрізняють nodefs/ephemeral-storage та PVC бази. Видалення томів БД не відповідає цьому діагнозу й знищує дані.", "The events distinguish nodefs/ephemeral-storage from the database PVC. Deleting database volumes does not address this diagnosis and destroys data."),
    },
    {
      t: "order", uk: "Runbook дозволяє контроль log retention через runtime, не видалення PVC. Упорядкуйте відповідь.", en: "The runbook permits runtime-managed log retention, not deleting PVCs. Order the response.", lang: "text",
      correct: ["Зберегти Events eviction і метрики файлової системи / Preserve eviction Events and filesystem metrics", "За ними визначити зростання контейнерних логів як джерело / Use them to identify growing container logs as the source", "Прибрати зайвий debug і застосувати узгоджену ротацію/retention / Remove excessive debug and apply approved rotation/retention", "Перевірити запас диска, зняття pressure та відновлення API / Verify disk headroom, cleared pressure, and API recovery"],
      note: why("Спочатку фіксують джерело заповнення. Очищення й обмеження логів мають зберегти потрібні докази та дані застосунку.", "Establish the source of growth first. Log cleanup and limits must preserve necessary evidence and application data."),
    },
    {
      t: "read", uk: "Яка причина зупинки цього Pod, відмінна від OOM?", en: "What stopped this Pod, distinct from OOM?", lang: "text",
      code: "Status: Failed\nReason: Evicted\nMessage: The node was low on resource: ephemeral-storage.\nNode condition: DiskPressure=True\nContainer logs: 18GiB",
      o: ["Node-pressure eviction через локальне сховище / Node-pressure eviction due to local storage", "OOMKilled через memory limit / OOMKilled due to memory limit", "Невдале поновлення TLS / Failed TLS renewal"], i: 0,
      note: why("Reason і Message вказують на ephemeral-storage. Рестарт без усунення джерела логів може відтворити pressure й повторні eviction.", "Reason and Message identify ephemeral-storage. Restarting without addressing log growth can reproduce pressure and repeated eviction."),
    },
    {
      t: "fill", uk: "Заповніть умову вузла для read-only перевірки тиску на диск.", en: "Fill the node condition for a read-only disk-pressure check.", lang: "bash",
      code: "kubectl get node node-a -o jsonpath='{.status.conditions[?(@.type==\"___\")].status}'", ok: ["DiskPressure"],
      note: why("DiskPressure — стан вузла, не ознака заповнення конкретного PVC. Далі перевіряють саме файлові системи, які використовує kubelet.", "DiskPressure is a node condition, not a statement about a particular PVC. Next inspect the filesystems used by kubelet."),
    },
    {
      t: "match", uk: "Зіставте дані для розбору pressure.", en: "Match disk-pressure investigation data.",
      pairs: [{ left: "nodefs available", right: "Запас локальної файлової системи вузла / Free space on the node-local filesystem" }, { left: "container log rotation", right: "Обмеження росту локальних логів / Bounding local log growth" }, { left: "database PVC", right: "Окремий том даних, який не видаляють як очищення логів / Separate data volume not deleted as log cleanup" }],
      note: why("Сховище має різні межі та власників. Потрібно контролювати саме джерело росту, а не звільняти будь-які доступні байти.", "Storage has different boundaries and owners. Control the actual growth source rather than freeing arbitrary bytes."),
    },
    {
      t: "read", uk: "Команда пропонує PDB як єдиний захист. Чому цього недостатньо?", en: "The team proposes a PDB as the only protection. Why is it insufficient?", lang: "text",
      code: "PodDisruptionBudget minAvailable: 2\nnode-a: DiskPressure=True\nkubelet: node-pressure eviction\nlog retention: unlimited",
      o: ["PDB автоматично стискає логи / A PDB automatically compresses logs", "PDB не зупиняє node-pressure eviction; потрібні retention і запас диска / A PDB does not prevent node-pressure eviction; retention and disk headroom are needed", "PDB додає диск вузлу / A PDB adds node disk capacity"], i: 1,
      note: why("PDB обмежує добровільні disruption через eviction API, а не гарантує захист від тиску ресурсів kubelet. Причина заповнення лишається.", "A PDB constrains voluntary disruption through the eviction API, not kubelet resource-pressure eviction. The source of disk exhaustion remains."),
    },
  ]),
  teach("do-drill-5xx", "Новий digest і запізніла readiness", "New digest and late readiness", 5, "do-drill-5xx", [
    {
      t: "comprehension", uk: "Прочитайте хронологію 5xx після rollout.", en: "Read the timeline of 5xx after rollout.",
      passage: "UK\n02:10 UTC — sync нового digest B; процес слухає порт за 2 с, прогрів триває 40 с.\n02:11 — readinessProbe не задана, нові Pod отримують трафік до завершення прогріву; 5xx ростуть.\n02:18 — readiness додали пізніше, але завершення rollout і відновлення SLI ще не перевірені.\n\nEN\n02:10 UTC — digest B is synced; the process listens after 2s but warms up for 40s.\n02:11 — no readinessProbe is configured, so new Pods receive traffic before warm-up completes; 5xx rises.\n02:18 — readiness is added late, but rollout completion and SLI recovery remain unverified.",
      questions: [{ q: "Яка прогалина допустила ранній трафік? / Which gap admitted traffic too early?", qEn: "Which gap admitted traffic too early?", options: ["Не було readiness, що перевіряє готовність обслуговувати / No readiness check verified ability to serve", "Наявність digest сама затримує трафік / Having a digest delays traffic by itself", "Зелений CI довів успішність прогріву / Green CI proved successful warm-up"], correctIndex: 0 }],
      note: why("Відкритий порт не дорівнює готовності. Пізня зміна маніфесту не скасовує вже завданої шкоди та потребує перевірки фактичного стану Pod.", "A listening port is not readiness. A late manifest change does not undo earlier harm and requires validation of actual Pod state."),
    },
    {
      t: "order", uk: "A сумісний і справний, healthy capacity ще є. Упорядкуйте обмеження шкоди й виправлення перед повторним rollout B.", en: "A is compatible and healthy, and healthy capacity remains. Order damage containment and repair before retrying B.", lang: "text",
      correct: ["Зберегти кореляцію 5xx, digest і стану готовності / Preserve correlation of 5xx, digest, and readiness state", "Зупинити просування B та повернути перевірений A у Git-стані за процедурою / Stop B promotion and restore verified A in Git state through the procedure", "Підтвердити відновлення SLI, потім перевірити readiness до прогріву в stage / Confirm SLI recovery, then test readiness during warm-up in stage", "Лише після перевірки повторити контрольований rollout B і виміряти SLI / Only after validation, retry a controlled B rollout and measure SLIs"],
      note: why("Спочатку зберігають докази й обмежують шкоду. Повторне просування потребує перевірки, що неготові Pod не отримують трафік.", "First preserve evidence and contain harm. Re-promotion requires proving unready Pods do not receive traffic."),
    },
    {
      t: "read", uk: "Чому перевірка TCP не відображає готовність цього застосунку?", en: "Why does a TCP check not represent this application's readiness?", lang: "text",
      code: "t=2s: TCP :8080 accepts\nt=3s: GET /ready -> 503\nt=40s: GET /ready -> 200\nt=3s: GET /status -> 503",
      o: ["TCP перевіряє всі залежності / TCP checks every dependency", "Відкритий порт передує прикладній готовності / The open port precedes application readiness", "503 означає успішний прогрів / 503 means successful warm-up"], i: 1,
      note: why("Застосунок явно відрізняє /ready від прослуховування порту. Readiness має відображати здатність обслуговувати потрібний шлях без надмірно широкої залежності.", "The application explicitly separates /ready from listening on a port. Readiness should reflect ability to serve the intended journey without an unnecessarily broad dependency chain."),
    },
    {
      t: "fill", uk: "Додайте probe, що прибирає неготовий Pod із Service endpoints, а не рестартує процес.", en: "Add the probe that removes an unready Pod from Service endpoints rather than restarting the process.", lang: "yaml",
      code: "___:\n  httpGet:\n    path: /ready\n    port: 8080\n  periodSeconds: 2\n  failureThreshold: 1", ok: ["readinessProbe"],
      note: why("Readiness керує придатністю для трафіку. Startup дає час ініціалізації, liveness може перезапускати завислий процес; вони не замінюють одне одного.", "Readiness controls traffic eligibility. Startup allows initialization time and liveness can restart a stuck process; these roles are not interchangeable."),
    },
    {
      t: "match", uk: "Зіставте докази rollout із питаннями.", en: "Match rollout evidence to the question it answers.",
      pairs: [{ left: "imageID", right: "Який digest реально працює? / Which digest actually runs?" }, { left: "Ready condition + endpoints", right: "Чи має Pod отримувати Service-трафік? / Should the Pod receive Service traffic?" }, { left: "5xx and p95", right: "Чи відновився користувацький шлях? / Has the user journey recovered?" }],
      note: why("Справний rollout потребує узгодження артефакта, допуску трафіку й користувацьких показників. Одного статусу Running недостатньо.", "A healthy rollout needs alignment of artifact, traffic eligibility, and user metrics. Running status alone is insufficient."),
    },
    {
      t: "read", uk: "Readiness додали о 02:18. Чому повідомлення «виправлено» передчасне?", en: "Readiness was added at 02:18. Why is 'fixed' premature?", lang: "text",
      code: "desired template: readinessProbe /ready\nnew template rollout: 1 of 3 updated\nold Pods without probe: 2\n5xx: still above objective",
      o: ["Будь-яка зміна YAML миттєво змінює всі Pod / Any YAML edit instantly changes every Pod", "Ready probe скасовує старі помилки / A readiness probe cancels past failures", "Бажаний шаблон ще не всюди застосований, SLI не відновився / The desired template is not fully applied and the SLI has not recovered"], i: 2,
      note: why("Шаблон Deployment поширюється через заміну Pod. Потрібні контроль rollout і вимірювання, а не лише збережений маніфест.", "A Deployment template propagates by replacing Pods. Rollout control and measurements are needed, not just a saved manifest."),
    },
  ]),
  teach("do-drill-secret", "Секрет ротовано, env застарів", "Rotated secret, stale environment", 4, "do-drill-secret", [
    {
      t: "comprehension", uk: "Прочитайте хронологію ротації DSN без значень паролів.", en: "Read the DSN rotation timeline without password values.",
      passage: "UK\n03:00 UTC — пароль БД ротовано у сховищі.\n03:01 — ExternalSecret синхронізував Secret forge-db до версії 42.\n03:03 — старі API Pod, запущені о 02:00 з DSN у env, отримують authentication failed. Новий canary із версією 42 успішно читає БД.\n\nEN\n03:00 UTC — the database password rotates in the store.\n03:01 — ExternalSecret synchronizes Secret forge-db to version 42.\n03:03 — old API Pods started at 02:00 with the DSN in env report authentication failed. A new canary using version 42 reads the database successfully.",
      questions: [{ q: "Що пояснює різницю старих Pod і canary? / What explains the difference between old Pods and the canary?", qEn: "What explains the difference between old Pods and the canary?", options: ["Ready=True автоматично переписує env процесу / Ready=True rewrites process env automatically", "Env старих контейнерів не перечитав оновлений Secret / Old container environments did not reread the updated Secret", "Новий пароль треба опублікувати для діагностики / Publish the new password for diagnosis"], correctIndex: 1 }],
      note: why("Secret оновився, але env встановлюється при старті контейнера. Успіх canary підтверджує новий шлях без розкриття значення.", "The Secret updated, but environment variables are set at container startup. Canary success validates the new path without disclosing its value."),
    },
    {
      t: "order", uk: "Canary вже має новий Secret і читає БД. Runbook дозволяє контрольований rollout, зберігаючи місткість. Упорядкуйте кроки.", en: "The canary already uses the new Secret and reads the database. The runbook permits a controlled rollout preserving capacity. Order the steps.", lang: "text",
      correct: ["Зберегти час ротації, sync status і помилки старих Pod без DSN / Preserve rotation time, sync status, and old Pod errors without the DSN", "Підтвердити secretKeyRef і успішну перевірку нового canary / Confirm secretKeyRef and the new canary's successful check", "Контрольовано замінити старі Pod із перевіркою готовності / Replace old Pods in a controlled rollout with readiness checks", "Перевірити зникнення auth-помилок і відновлення SLI / Verify authentication errors clear and SLIs recover"],
      note: why("Замінюють саме споживачів stale env після перевірки нової конфігурації. Restart усіх сервісів одночасно може прибрати здорову місткість і не виправляє sync.", "Replace stale-env consumers after validating the new configuration. Restarting all services simultaneously can remove healthy capacity and does not repair synchronization."),
    },
    {
      t: "read", uk: "Чого не доводить зелений статус ExternalSecret?", en: "What does a green ExternalSecret status not prove?", lang: "text",
      code: "ExternalSecret Ready=True\nrefreshTime=03:01 UTC\ntarget Secret version=42\napi-old startTime=02:00 UTC\napi-old DATABASE_URL source=env",
      o: ["Що вже запущений процес отримав новий env / That the running process received new env", "Що sync завершився / That synchronization completed", "Що є цільовий Secret / That a target Secret exists"], i: 0,
      note: why("Sync status описує роботу оператора. Він не є підтвердженням застосування секрету в кожному споживачі.", "Sync status describes the operator's work. It does not confirm application of the secret in every consumer."),
    },
    {
      t: "fill", uk: "Canary має читати DSN із ключа Secret, а не з literal value. Заповніть поле.", en: "The canary must read the DSN from a Secret key rather than a literal value. Fill the field.", lang: "yaml",
      code: "env:\n  - name: DATABASE_URL\n    valueFrom:\n      ___:\n        name: forge-db\n        key: dsn", ok: ["secretKeyRef"],
      note: why("Посилання не відкриває DSN у маніфесті. Доступ і працездатність перевіряють без друку пароля в логах чи чаті.", "The reference does not expose the DSN in the manifest. Validate access and operation without printing passwords in logs or chat."),
    },
    {
      t: "match", uk: "Зіставте етапи ротації з доказами.", en: "Match rotation stages to evidence.",
      pairs: [{ left: "external store rotation", right: "Нова версія credential у сховищі / New credential version in the store" }, { left: "ExternalSecret sync", right: "Оновлений цільовий Kubernetes Secret / Updated target Kubernetes Secret" }, { left: "consumer adoption", right: "Новий процес успішно автентифікується / New process authenticates successfully" }],
      note: why("Це три різні етапи. Запис у сховище не доводить sync, а sync не доводить adoption старими процесами.", "These are three different stages. A store update does not prove sync, and sync does not prove adoption by old processes."),
    },
    {
      t: "read", uk: "Яка перевірка дозволяє обґрунтовано завершити інцидент?", en: "Which check supports closing the incident?", lang: "text",
      code: "A: Secret exists\nB: all Pods Running\nC: all intended consumers replaced; DB auth failures cleared; external success and p95 back within objectives",
      o: ["A", "B", "C"], i: 2,
      note: why("Секрет і статус процесу — проміжні факти. C перевіряє застосування зміни та реальне повернення сервісу.", "The Secret and process status are intermediate facts. C validates adoption and actual service recovery."),
    },
  ]),
  teach("do-drill-write", "Хронологія, вплив і дії", "Timeline, impact, and actions", 4, "do-drill-write", [
    {
      t: "comprehension", uk: "Прочитайте факти для короткого звіту без пошуку винних.", en: "Read the facts for a short blameless incident report.",
      passage: "UK\n04:00 UTC — після зміни log level росте локальний диск.\n04:08 — два API Pod виселені; 600 із 3000 запитів повертають 5xx у вікні 04:08–04:18.\n04:12 — debug вимкнено, застосовано retention за runbook.\n04:18 — місткість і SLI відновлені; автоматичної перевірки log retention до зміни не було.\n\nEN\n04:00 UTC — local disk use rises after a log-level change.\n04:08 — two API Pods are evicted; 600 of 3000 requests return 5xx during 04:08–04:18.\n04:12 — debug is disabled and runbook retention is applied.\n04:18 — capacity and SLIs recover; no automated log-retention check existed before the change.",
      questions: [{ q: "Який опис впливу підтверджено? / Which impact statement is supported?", qEn: "Which impact statement is supported?", options: ["Усі користувачі втратили дані / All users lost data", "Одна людина є кореневою причиною / One person is the root cause", "600 із 3000 запитів мали 5xx у визначеному 10-хвилинному вікні / 600 of 3000 requests had 5xx in the stated 10-minute window"], correctIndex: 2 }],
      note: why("Звіт розрізняє виміряний вплив, технічний механізм та прогалину захисту. Даних про втрату БД чи всіх користувачів немає.", "The report separates measured impact, technical mechanism, and safeguard gap. It provides no evidence of database loss or impact to every user."),
    },
    {
      t: "order", uk: "Підготуйте звіт так, щоб дії спиралися на встановлені факти.", en: "Prepare the report so actions follow from established facts.", lang: "text",
      correct: ["Зібрати UTC-події, метрики й застосовані дії / Collect UTC events, metrics, and applied actions", "За ними записати хронологію та виміряний вплив / Use them to record the timeline and measured impact", "Відокремити підтверджений механізм і прогалини від гіпотез / Separate the confirmed mechanism and gaps from hypotheses", "Для прогалин призначити перевірювані дії з власниками й датами / Assign verifiable actions with owners and dates to the gaps"],
      note: why("Висновки не повинні передувати доказам. Дії мають закривати знайдені умови збою, а не вимагати абстрактно бути уважнішими.", "Conclusions should not precede evidence. Actions should close identified failure conditions rather than demand abstractly greater care."),
    },
    {
      t: "read", uk: "Який action item придатний для перевірки виконання?", en: "Which action item can be verified as complete?", lang: "text",
      code: "A: be more careful\nB: owner=Platform; due=2026-11-17; enforce runtime log rotation; demonstrate bounded log growth under debug load in stage\nC: never have incidents again",
      o: ["A", "B", "C"], i: 1,
      note: why("B задає власника, дату, зміну та критерій перевірки. Завдання на кшталт «бути уважним» не визначає захист системи.", "B defines an owner, date, change, and validation criterion. 'Be careful' does not define a system safeguard."),
    },
    {
      t: "fill", uk: "Заповніть виміряний відсоток невдалих запитів, не називаючи його відсотком користувачів.", en: "Fill the measured failed-request percentage without calling it a percentage of users.", lang: "text",
      code: "window: 04:08-04:18 UTC\nfailed requests: 600\ntotal requests: 3000\nfailed request ratio: ___%", ok: ["20"],
      note: why("600 / 3000 = 20%. Один користувач може зробити багато запитів, тому кількість запитів не визначає кількість постраждалих людей.", "600 / 3000 = 20%. One user can make many requests, so request counts do not determine affected people."),
    },
    {
      t: "match", uk: "Зіставте розділи incident write-up.", en: "Match incident write-up sections.",
      pairs: [{ left: "timeline", right: "Коли сталися спостереження й дії з UTC-часом / When observations and actions occurred, with UTC times" }, { left: "impact", right: "Який шлях і скільки виміряних запитів постраждали / Which journey and how many measured requests were affected" }, { left: "follow-up actions", right: "Що змінити, хто відповідає, до коли і як перевірити / What changes, who owns it, by when, and how to validate" }],
      note: why("Хронологія описує послідовність, вплив — шкоду, follow-up — зміну захисту. Ці розділи не підміняють одне одного.", "The timeline describes sequence, impact describes harm, and follow-up changes safeguards. These sections do not replace one another."),
    },
    {
      t: "read", uk: "Яке формулювання відповідає фактам і не шукає винного?", en: "Which wording fits the facts without assigning personal blame?", lang: "text",
      code: "Known: debug logs grew, retention was unbounded, kubelet evicted Pods.\nUnknown: whether the same load without debug would have filled the disk.",
      o: ["Необмежений debug-лог сприяв pressure; додамо й перевіримо retention / Unbounded debug logging contributed to pressure; add and test retention", "Оператор назавжди спричиняє всі збої / The operator permanently causes every failure", "Усе доведено про будь-яке майбутнє навантаження / Everything is proven about all future loads"], i: 0,
      note: why("Формулювання тримається відомого механізму та конкретного поліпшення. Невідомі умови позначають окремо, без бездоказових узагальнень.", "The wording stays with the known mechanism and a specific improvement. Mark unknown conditions separately without unsupported generalization."),
    },
  ]),
  quiz("do-drill-exam", "Іспит: спочатку перевірити", "Exam: check first", 5, "do-drill-exam", [
    {
      t: "read", uk: "Що перевірити першим за цих симптомів о 03:00?", en: "What should be checked first given these symptoms at 03:00?", lang: "text",
      code: "external probe: certificate expired\ninternal API /health: 200\nlast cert-manager event: renewal failed\nproposal: restart every Deployment",
      o: ["Перезапустити всі Deployment до збереження доказів / Restart every Deployment before preserving evidence", "Перевірити сертифікат публічного host і renewal Events / Inspect the public host's certificate and renewal Events", "Видалити БД PVC / Delete the database PVC"], i: 1,
      note: why("Симптом указує на TLS і renewal. Restart усього не відповідає гіпотезі й може зруйнувати здорові частини сервісу.", "The symptom points to TLS and renewal. Restarting everything does not address the hypothesis and can damage healthy service components."),
    },
    {
      t: "order", uk: "Незакріплений prod-тег пересунувся, помилки на B. A сумісний. Упорядкуйте повернення до A.", en: "The unpinned prod tag moved and errors concentrate on B. A is compatible. Order recovery to A.", lang: "text",
      correct: ["Зберегти фактичні imageID й кореляцію помилок / Preserve actual imageIDs and error correlation", "Перевірити доступність і справність digest A / Verify digest A availability and health", "Закріпити A у бажаному Git-стані та виконати узгоджений sync / Pin A in desired Git state and perform agreed sync", "Перевірити єдину версію та відновлення SLI / Verify the intended version and SLI recovery"],
      note: why("Тег не визначає незмінну версію. Відновлення має змінити бажаний стан на перевірений артефакт, а не повторно запустити той самий рухомий тег.", "A tag does not define an immutable version. Recovery must set desired state to a verified artifact rather than restart the same mutable tag."),
    },
    {
      t: "read", uk: "Який наступний крок обґрунтований до зміни всіх Pod?", en: "Which next step is justified before changing every Pod?", lang: "text",
      code: "Secret version=42, sync Ready=True\nold Pods: env captured before rotation, auth failed\nnew canary: auth success\nuser impact: 5xx on old Pods",
      o: ["Видалити Secret / Delete the Secret", "Надрукувати DSN у page / Print the DSN in the page", "Підтвердити adoption canary і виконати контрольовану заміну stale-env споживачів / Confirm canary adoption and roll stale-env consumers in a controlled way"], i: 2,
      note: why("Нова конфігурація вже працює на canary; старий env не оновився. Зміна має бути спрямована на цих споживачів із контролем місткості.", "The new configuration already works on the canary; old env did not update. Target those consumers while controlling capacity."),
    },
    {
      t: "order", uk: "Події вказують на log-driven DiskPressure. Упорядкуйте response; PVC бази не зачіпається.", en: "Events show log-driven DiskPressure. Order the response without touching the database PVC.", lang: "text",
      correct: ["Зберегти eviction Events і знімок вільного диска / Preserve eviction Events and a free-disk snapshot", "Зіставити локальний ріст із контейнерними логами / Correlate local growth with container logs", "Застосувати дозволене обмеження debug та log retention / Apply permitted debug limits and log retention", "Перевірити зняття pressure, місткість і користувацький шлях / Verify pressure clears, capacity returns, and the user journey works"],
      note: why("Докази визначають джерело, а targeted retention усуває його. Restart без звільнення й обмеження логів може лише відтворити eviction.", "Evidence identifies the source and targeted retention addresses it. Restarting without freeing and bounding logs can merely reproduce eviction."),
    },
    {
      t: "read", uk: "Яка перша перевірка найкорисніша для цього 5xx-збою після нового digest?", en: "Which first check is most useful for this 5xx failure after a new digest?", lang: "text",
      code: "new digest B at 02:10\nport accepts at startup+2s\napp warms until startup+40s\nreadiness added at 02:18\n5xx ongoing; rollout state unknown",
      o: ["Зіставити imageID, фактичні probes/endpoints і 5xx за часом / Correlate imageIDs, actual probes/endpoints, and 5xx over time", "Вважати пізнє додавання readiness доказом одужання / Treat late readiness configuration as proof of recovery", "Вимкнути всі перевірки / Disable all checks"], i: 0,
      note: why("Потрібен фактичний стан, не лише записаний шаблон. Так перевіряють, чи трафік потрапляв у неготові Pod і чи зміна вже застосована.", "Actual state is needed, not just the saved template. This tests whether traffic reached unready Pods and whether the change is applied."),
    },
    {
      t: "fill", uk: "Додайте відповідального до action item. За умовою власник ротації логів — Platform.", en: "Add an owner to the action item. The stated log-rotation owner is Platform.", lang: "yaml",
      code: "action: enforce-and-test-log-retention\nowner: ___\ndue: 2026-11-17\nverify: bounded disk growth under debug load in stage", ok: ["Platform"],
      note: why("Дія має власника, дату й доказ завершення. Саме призначення команди без перевірки ще не закриває завдання.", "The action has an owner, due date, and completion evidence. Assigning a team without validation does not complete the work."),
    },
    {
      t: "match", uk: "Зіставте першу перевірку з симптомом, замість restart усього.", en: "Match the first check to the symptom instead of restarting everything.",
      pairs: [{ left: "certificate expired", right: "Публічний сертифікат і renewal status / Public certificate and renewal status" }, { left: "same tag, different behavior", right: "Фактичні imageID кожного Pod / Actual imageIDs of each Pod" }, { left: "DiskPressure + Evicted", right: "Файлова система вузла та джерело локального росту / Node filesystem and local growth source" }],
      note: why("Перші перевірки мають розрізняти механізми збою, зберігаючи докази. Універсальний restart не виконує цієї функції.", "First checks should distinguish failure mechanisms while preserving evidence. A universal restart does not do that."),
    },
    {
      t: "mcq", uk: "Який фінальний запис прийнятний у звіті після відновлення?", en: "Which final report entry is acceptable after recovery?",
      o: ["Хтось помилився; усім бути уважнішими / Someone made a mistake; everyone be more careful", "UTC-хронологія, виміряний вплив, перевірені дії та follow-up із власниками й датами / UTC timeline, measured impact, verified actions, and follow-up with owners and dates", "Усе перезапущено, тому причину доведено / Everything was restarted, so the cause is proven"], i: 1,
      note: why("Звіт має пояснювати відоме, позначати невідоме та створювати перевірювані поліпшення. Успіх restart сам по собі не доводить причину.", "A report should explain what is known, mark unknowns, and create verifiable improvements. A successful restart alone does not prove cause."),
    },
  ]),
]);
