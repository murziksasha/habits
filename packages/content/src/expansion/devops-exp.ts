import type { CourseContent, LessonContent, UnitContent } from "../types.js";
import { expandCourse, sectionUnit, teachLesson } from "./factory.js";

export const newUnits: UnitContent[] = [
  sectionUnit(
    "finops_cost",
    "Фінансова дисципліна хмари: теги, простій, бюджети",
    "Cloud FinOps: tags, idle resources, and budgets",
    [
      {
        slug: "do-fin-tags",
        titleUk: "Без тегів рахунок — загадка, а не інструмент",
        titleEn: "Without tags a bill is a riddle, not a tool",
        difficulty: 3,
        pointsUk: ["Обов'язкові теги в IaC і політиці створення", "Тег на кожному платному ресурсі, не лише на акаунті", "Звіт про нетеговані — регулярна робота"],
        pointsEn: ["Mandatory tags in IaC and in the create policy", "A tag on every billed resource, not only on the account", "An untagged report is regular work"],
        conceptUk: "Рахунок хмари без обов'язкових тегів (team, env, service, cost-center) неможливо розкласти: хтось платить за чужі експерименти, а 'тимчасовий' стенд живе рік. Політика тегів має бути в IaC і в admission/SCPs: створити ресурс без env=prod|staging|dev неможливо. Теги на акаунті чи підписці не замінюють теги на кожному диску й IP — саме вони генерують рядок у білі. Регулярний звіт 'нетеговані ресурси' — така ж робота, як патчі. Не плутайте ім'я інстанса з тегом: ім'я не потрапляє в cost allocation.",
        conceptEn: "A cloud bill without mandatory tags (team, env, service, cost-center) cannot be split: someone pays for other people's experiments, and a 'temporary' staging box lives a year. The tag policy belongs in IaC and in admission/SCPs: creating a resource without env=prod|staging|dev is impossible. Tags on the account or subscription do not replace tags on every disk and IP — those are what generate the bill line. A regular 'untagged resources' report is the same kind of work as patching. Do not confuse an instance name with a tag: a name does not land in cost allocation.",
        code: "resource \"aws_ebs_volume\" \"data\" {\n  tags = { env = \"prod\", team = \"payments\", service = \"api\", \"cost-center\" = \"cc-12\" }\n}",
        language: "hcl",
        retrieval: [
          { kind: "mcq", promptUk: "Чому ім'я інстанса web-anna-tmp не замінює тег team=anna?", promptEn: "Why does the instance name web-anna-tmp not replace the tag team=anna?", options: ["ім'я не потрапляє в cost allocation; теги — це поля білінгу", "ім'я завжди дорожче за тег", "SCP ігнорує теги", "IaC забороняє імена"], correctIndex: 0, explanationUk: "Білінг групує за тегами, не за Name.", explanationEn: "Billing groups by tags, not by Name." },
          { kind: "fill", promptUk: "Допишіть обов'язковий ключ середовища", promptEn: "Fill in the mandatory environment key", language: "hcl", code: "tags = { ___ = \"staging\", team = \"payments\", service = \"api\" }", accepted: ["env", "environment"], caseSensitive: true, explanationUk: "Ключ env (або environment) — частина політики.", explanationEn: "The env (or environment) key is part of the policy." }
        ],
        whyUk: "Як зробити так, щоб новий диск у хмарі не з'являвся без власника в рахунку?",
        whyEn: "How do you make sure a new cloud disk does not appear on the bill without an owner?",
        ideas: [{ labelUk: "обов'язкові теги", labelEn: "mandatory tags", anyOf: ["тег", "tag", "env", "team", "обов"] }, { labelUk: "політика створення", labelEn: "a create policy", anyOf: ["iac", "scp", "admission", "політик", "policy"] }, { labelUk: "не лише ім'я", labelEn: "not only a name", anyOf: ["ім'я", "name", "allocation", "білінг", "bill"] }],
        sampleUk: "Ставлять обов'язкові теги team, env і service в IaC і в політиці створення, перевіряють нетеговані ресурси звітом і не вважають ім'я інстанса заміною тегу в білінгу.",
        sampleEn: "You put mandatory team, env, and service tags in IaC and in the create policy, you review untagged resources in a report, and you do not treat an instance name as a substitute for a billing tag.",
      },
      {
        slug: "do-fin-idle",
        titleUk: "Простій і зайвий розмір коштують більше, ніж 'оптимізація коду'",
        titleEn: "Idle and oversized resources cost more than 'optimizing the code'",
        difficulty: 3,
        pointsUk: ["Шукайте простій: диски, NAT, порожні LB, забуті GPU", "Rightsizing за фактом використання, не за відчуттям", "Savings Plan — після стабільного базису"],
        pointsEn: ["Look for idle: disks, NAT, empty LBs, forgotten GPUs", "Rightsizing from actual use, not from a feeling", "A Savings Plan comes after a stable baseline"],
        conceptUk: "Типові дірки в рахунку: зупинений, але не видалений диск; балансувальник без цілей; NAT на порожньому VPC; GPU-інстанс, увімкнений на вихідні 'на всяк випадок'; база, яку ніхто не запитує. Rightsizing — це не завжди менше CPU, а відповідність факту: якщо p95 CPU 8%, великий тип — марнотратство. Розклад старт/стоп для dev (не для prod з SLI) знімає нічні години. Перед видаленням — знімок або тег 'review-by'. Алерт на аномалію рахунку важливіший за мікрооптимізацію лямбди. Reserved/Savings Plan купують після кількох тижнів стабільного базису, не в перший день експерименту.",
        conceptEn: "Typical holes in a bill: a stopped but not deleted disk; a load balancer with no targets; a NAT on an empty VPC; a GPU instance left on 'just in case' for the weekend; a database nobody queries. Rightsizing is not always less CPU, it is a match to reality: if p95 CPU is 8%, a large type is waste. A start/stop schedule for dev (not for prod with an SLI) drops night hours. Before deletion — a snapshot or a review-by tag. An anomaly alert on the bill matters more than micro-optimizing a lambda. Reserved/Savings Plans are bought after weeks of a stable baseline, not on the first day of an experiment.",
        code: "# weekly: unattached volumes, LB with 0 targets, NAT in empty VPC, GPU with p95 CPU < 5%\n# dev only: stop at 20:00 local, start at 09:00",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Що зазвичай дорожче за тиждень, ніж зайвий рядок у лямбді?", promptEn: "What usually costs more in a week than an extra line in a lambda?", options: ["забутий GPU або NAT без трафіку, залишений увімкненим", "коментар у Terraform", "тег team", "лог на DEBUG у staging"], correctIndex: 0, explanationUk: "Години простою великого типу домінують рахунок.", explanationEn: "Hours of an idle large type dominate the bill." },
          { kind: "read", promptUk: "Чому Savings Plan у перший день PoC — погана ідея?", promptEn: "Why is a Savings Plan on the first day of a PoC a bad idea?", language: "bash", code: "# commitment: 3y all-upfront, instance family g5, 24/7", options: ["зобов'язання фіксує витрати, а PoC може зникнути через тиждень", "Savings Plan знижує безпеку", "PoC забороняє теги", "all-upfront завжди дешевший навіть на день"], correctIndex: 0, explanationUk: "Спочатку базис, потім зобов'язання.", explanationEn: "A baseline first, then a commitment." }
        ],
        whyUk: "Як за тиждень зменшити рахунок dev-акаунта без ризику для продакшену?",
        whyEn: "How do you cut a dev-account bill in a week without risking production?",
        ideas: [{ labelUk: "простій", labelEn: "idle", anyOf: ["прост", "idle", "диск", "disk", "nat", "gpu", "баланс"] }, { labelUk: "розклад dev", labelEn: "a dev schedule", anyOf: ["розклад", "schedule", "dev", "stop", "night"] }, { labelUk: "не Savings одразу", labelEn: "not a Savings Plan immediately", anyOf: ["savings", "reserved", "базис", "baseline", "poc"] }],
        sampleUk: "Прибирають простій (диски, NAT, порожні балансувальники, забуті GPU), ставлять розклад старт/стоп для dev і не купують Savings Plan, поки немає стабільного базису; прод з SLI так не вимикають.",
        sampleEn: "You remove idle (disks, NAT, empty load balancers, forgotten GPUs), you put a start/stop schedule on dev, and you do not buy a Savings Plan until you have a stable baseline; prod with an SLI is not stopped that way.",
      },
      {
        slug: "do-fin-budget",
        titleUk: "Бюджет і аномалія: дізнатись про сюрприз до рахунку",
        titleEn: "Budgets and anomalies: learn about a surprise before the invoice",
        difficulty: 3,
        pointsUk: ["Бюджет — поріг із командним каналом, часто не твердий cap", "Аномалія ловить стрибок патерну, не лише абсолют", "Місячний розбір топу сервісів і 'дрібниць'"],
        pointsEn: ["A budget is a threshold with a team channel, often not a hard cap", "An anomaly catches a pattern spike, not only an absolute", "A monthly review of top services and 'small' lines"],
        conceptUk: "Бюджет — не 'ліміт, який хмара сама відріже' (часто лише алерт), а поріг із каналом: чат команди, не особиста пошта одного інженера, що у відпустці. Окремі бюджети на prod і на пісочницю: пісочниця має жорсткіший поріг і, де підтримується, справжній cap. Детектор аномалій ловить стрибок відносно звичного патерну (в 5 разів більший egress у вихідні), навіть якщо абсолют ще 'в бюджеті року'. Алерт без власника — шум. Раз на місяць розбирайте топ сервісів і незрозумілі рядки (egress, snapshots, несподіваний регіон). Не ігноруйте 'маленькі' рядки: 30 доларів на забуті Elastic IP за рік — це звичка.",
        conceptEn: "A budget is not 'a limit the cloud will cut off by itself' (often it is only an alert), it is a threshold with a channel: the team chat, not the personal inbox of one engineer who is on leave. Separate budgets for prod and for the sandbox: the sandbox has a tighter threshold and, where supported, a real cap. An anomaly detector catches a spike against the usual pattern (five times the usual weekend egress) even when the absolute is still 'inside the yearly budget'. An alert with no owner is noise. Once a month, review the top services and the confusing lines (egress, snapshots, an unexpected region). Do not ignore 'small' lines: thirty dollars of forgotten Elastic IPs over a year is a habit.",
        code: "# budgets: prod  warn@80%  / sandbox hard-cap where supported\n# anomaly: +3 sigma daily vs 14-day baseline → #finops-alerts",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Чому бюджет 10 000 на рік не спіймає раптовий egress у 800 за вихідні в лютому?", promptEn: "Why will a 10,000 yearly budget miss a sudden 800 weekend egress in February?", options: ["абсолют ще 'в річному ліміті', потрібен детектор аномалії відносно патерну", "бюджети не вміють email", "egress безкоштовний", "аномалія працює лише для GPU"], correctIndex: 0, explanationUk: "Потрібні і поріг, і аномалія.", explanationEn: "You need both a threshold and an anomaly." },
          { kind: "fill", promptUk: "Допишіть, куди слати алерт бюджету", promptEn: "Fill in where a budget alert should go", language: "yaml", code: "notification: channel: team-___-alerts   # not one person's inbox", accepted: ["finops", "ops", "platform", "cost"], caseSensitive: true, explanationUk: "Командний канал, не особиста пошта.", explanationEn: "A team channel, not a personal inbox." }
        ],
        whyUk: "Як організувати сповіщення, щоб сюрприз у рахунку не прийшов лише в день інвойсу?",
        whyEn: "How do you set up notices so a bill surprise does not arrive only on invoice day?",
        ideas: [{ labelUk: "командний канал", labelEn: "a team channel", anyOf: ["канал", "channel", "чат", "chat", "пошт", "inbox"] }, { labelUk: "аномалія і бюджет", labelEn: "anomaly and budget", anyOf: ["аномал", "anomaly", "бюджет", "budget", "поріг", "threshold"] }, { labelUk: "місячний розбір", labelEn: "a monthly review", anyOf: ["місяц", "month", "топ", "top", "egress", "snapshot"] }],
        sampleUk: "Ставлять окремі бюджети prod і пісочниці з алертом у командний канал, вмикають детектор аномалій на стрибок патерну й раз на місяць розбирають топ рядків, а не чекають інвойсу.",
        sampleEn: "You set separate prod and sandbox budgets with an alert to a team channel, you turn on an anomaly detector for a pattern spike, and once a month you review the top lines, instead of waiting for the invoice.",
      },
      {
        slug: "do-fin-unit",
        titleUk: "Юніт-економіка сервісу: вартість на замовлення, не лише рахунок акаунта",
        titleEn: "Service unit economics: cost per order, not only the account bill",
        difficulty: 3,
        pointsUk: ["Діліть рахунок на одиницю продукту", "Ріст рахунку ≠ проблема, якщо одиниця стабільна", "Ціну бачить команда-власник"],
        pointsEn: ["Divide the bill by a product unit", "Bill growth is not a problem if the unit is stable", "The owning team sees the price"],
        conceptUk: "FinOps стає корисним, коли рахунок ділять на одиницю продукту: вартість 1000 запитів, одного замовлення, однієї тренувальної години. Для цього потрібні теги/атрибуція й обсяг із продуктових метрик (замовлення за день), інакше 'ріст рахунку' не відрізнити від росту бізнесу. Якщо вартість замовлення зросла, а трафік ні — шукайте регресію (новий регіон, неочікуваний egress, неефективний запит). Показуйте ціну команді, що володіє сервісом, не лише фінансам. Не порівнюйте raw-долари двох сервісів без одиниці: великий сервіс має бути дорожчим. Рішення 'кешувати' або 'змінити тариф' перевіряють цією одиницею.",
        conceptEn: "FinOps becomes useful when the bill is divided by a product unit: the cost of 1000 requests, of one order, of one training hour. That needs tags/attribution and a volume from product metrics (orders per day); otherwise 'bill growth' cannot be told apart from business growth. If cost per order rose and traffic did not — look for a regression (a new region, unexpected egress, an inefficient query). Show the price to the team that owns the service, not only to finance. Do not compare raw dollars of two services without a unit: a large service should cost more. A decision to 'cache' or 'change the tariff' is checked against this unit.",
        code: "usd_per_order = daily_cost[service] / daily_orders[service]\n# alert: usd_per_order > 1.3 * 28-day median",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Рахунок сервісу зріс на 40%, замовлень теж на 40%. Що це означає?", promptEn: "The service bill grew 40%, and so did orders. What does that mean?", options: ["вартість одиниці стабільна — це ріст бізнесу, не обов'язково регресія", "обов'язково аварія egress", "треба негайно купити Reserved на 3 роки", "теги зламались"], correctIndex: 0, explanationUk: "Дивіться одиницю, не лише абсолют.", explanationEn: "Look at the unit, not only the absolute." },
          { kind: "read", promptUk: "Яку метрику показати команді checkout?", promptEn: "Which metric should you show the checkout team?", language: "sql", code: "SELECT sum(cost_usd) / nullif(sum(orders),0) AS usd_per_order FROM daily_finops WHERE service='checkout'", options: ["доларів на замовлення, а не лише суму акаунта", "лише загальний рахунок організації", "кількість тегів", "час інвойсу"], correctIndex: 0, explanationUk: "Одиниця — мова команди й фінансів.", explanationEn: "The unit is the language of the team and of finance." }
        ],
        whyUk: "Як відрізнити здоровий ріст рахунку від регресії вартості?",
        whyEn: "How do you tell healthy bill growth from a cost regression?",
        ideas: [{ labelUk: "одиниця продукту", labelEn: "a product unit", anyOf: ["одиниц", "unit", "замовлен", "order", "запит", "request"] }, { labelUk: "обсяг і рахунок", labelEn: "volume and the bill", anyOf: ["обсяг", "volume", "трафік", "traffic", "рахунок", "bill"] }, { labelUk: "команда бачить ціну", labelEn: "the team sees the price", anyOf: ["команд", "team", "влас", "owner", "цін", "price"] }],
        sampleUk: "Ділять рахунок на одиницю продукту (замовлення чи запит) разом з обсягом: якщо одиниця стабільна, ріст рахунку — це бізнес, а якщо одиниця зросла без трафіку — шукають регресію й показують ціну команді-власнику.",
        sampleEn: "You divide the bill by a product unit (an order or a request) together with volume: if the unit is stable, bill growth is the business, and if the unit rose without traffic, you look for a regression and you show the price to the owning team.",
      }
    ],
    "Контрольна: FinOps",
    "Exam: FinOps",
    [
      { promptUk: "Ім'я інстанса в cost allocation…", promptEn: "An instance name in cost allocation is…", options: ["не заміна тегу team/env/service", "обов'язковий ключ білінгу", "твердий cap бюджету", "Savings Plan"], correctIndex: 0, explanationUk: "Теги — поля рахунку.", explanationEn: "Tags are bill fields." },
      { promptUk: "Savings Plan у перший день PoC…", promptEn: "A Savings Plan on the first day of a PoC is…", options: ["ризиковане зобов'язання без базису", "завжди найдешевший шлях", "заміна тегів", "твердий cap пісочниці"], correctIndex: 0, explanationUk: "Спочатку стабільний базис.", explanationEn: "A stable baseline first." },
      { promptUk: "Річний бюджет може пропустити…", promptEn: "A yearly budget can miss…", options: ["стрибок патерну, який ловить детектор аномалій", "будь-який рядок egress завжди", "теги на дисках", "розклад dev"], correctIndex: 0, explanationUk: "Поріг і аномалія разом.", explanationEn: "A threshold and an anomaly together." },
      { promptUk: "Алерт бюджету на особисту пошту однієї людини…", promptEn: "A budget alert to one person's inbox is…", options: ["крихкий, коли людина у відпустці; потрібен командний канал", "найкраща практика", "твердий cap", "заміна юніт-економіки"], correctIndex: 0, explanationUk: "Командний канал.", explanationEn: "A team channel." },
      { promptUk: "Рахунок і замовлення зросли однаково…", promptEn: "The bill and orders grew by the same amount…", options: ["вартість одиниці стабільна, це може бути здоровий ріст", "це завжди регресія", "треба вимкнути прод", "теги зламані обов'язково"], correctIndex: 0, explanationUk: "Дивіться одиницю.", explanationEn: "Look at the unit." },
      { promptUk: "Зупинений, але не видалений диск…", promptEn: "A stopped but not deleted disk is…", options: ["типовий простій, який далі тарифікується", "завжди безкоштовний", "заміна знімка", "тег allocation"], correctIndex: 0, explanationUk: "Шукайте невидалені томи.", explanationEn: "Look for undeleted volumes." }
    ],
  ),
  sectionUnit(
    "supply_chain_builds",
    "Ланцюг постачання збірки: SBOM, піни, provenance",
    "Build supply chain: SBOMs, pins, and provenance",
    [
      {
        slug: "do-sc-sbom",
        titleUk: "SBOM: що саме ви відвантажили, не 'десь була бібліотека'",
        titleEn: "An SBOM: what you actually shipped, not 'a library was around somewhere'",
        difficulty: 3,
        pointsUk: ["SBOM — перелік конкретного артефакту тієї ж збірки", "Lock-файл і відтворюваність роблять список чесним", "Прозорість не замінює виправлення"],
        pointsEn: ["An SBOM is the list of a concrete artifact from the same build", "A lock file and reproducibility make the list honest", "Transparency does not replace a fix"],
        conceptUk: "SBOM (Software Bill of Materials, часто SPDX або CycloneDX) — це перелік компонентів конкретного артефакту: ім'я, версія, ліцензія, інколи хеш. Його генерують під час збірки того самого коміту, що й образ, і зберігають поряд (як атестацію), а не 'згадують' через місяць. SBOM дозволяє відповісти: чи є в учорашньому релізі ця CVE, і який шар її приніс. Генерація з dev-машини 'приблизно ті самі пакети' бреше: відтворювана збірка і lock-файл — умова чесного SBOM. Не публікуйте SBOM як заміну виправлення: список дір без плану — лише прозорість.",
        conceptEn: "An SBOM (Software Bill of Materials, often SPDX or CycloneDX) is the list of components of a concrete artifact: name, version, license, sometimes a hash. It is generated during the build of the same commit as the image, and stored alongside (as an attestation), not 'remembered' a month later. An SBOM lets you answer: is this CVE in yesterday's release, and which layer brought it. Generating one from a dev machine with 'roughly the same packages' lies: a reproducible build and a lock file are the condition of an honest SBOM. Do not publish an SBOM as a substitute for a fix: a list of holes with no plan is only transparency.",
        code: "syft packages ghcr.io/app@sha256:abc -o cyclonedx-json > sbom.cdx.json\n# attach as attestation to the same digest",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Чому SBOM, згенерований на ноутбуці через тиждень після релізу, слабший?", promptEn: "Why is an SBOM generated on a laptop a week after the release weaker?", options: ["це вже не той самий граф залежностей, що в образі, який пішов у прод", "SPDX забороняє ноутбуки", "CVE тоді не існують", "lock-файл забороняє SBOM"], correctIndex: 0, explanationUk: "SBOM має народитись разом з артефактом.", explanationEn: "The SBOM should be born with the artifact." },
          { kind: "fill", promptUk: "Допишіть поширений формат переліку компонентів", promptEn: "Fill in a common component-list format", language: "bash", code: "syft packages ghcr.io/app:1.2 -o ___ > sbom.json", accepted: ["spdx-json", "cyclonedx-json", "cyclonedx", "spdx"], caseSensitive: true, explanationUk: "SPDX і CycloneDX — типові формати.", explanationEn: "SPDX and CycloneDX are typical formats." }
        ],
        whyUk: "Коли саме генерувати SBOM і навіщо він після оголошення CVE?",
        whyEn: "When exactly do you generate an SBOM, and why is it useful after a CVE is announced?",
        ideas: [{ labelUk: "під час тієї ж збірки", labelEn: "during the same build", anyOf: ["збір", "build", "коміт", "commit", "артефакт", "artifact"] }, { labelUk: "конкретний перелік", labelEn: "a concrete list", anyOf: ["sbom", "spdx", "cyclonedx", "версі", "version"] }, { labelUk: "пошук CVE", labelEn: "looking up a CVE", anyOf: ["cve", "шар", "layer", "реліз", "release"] }],
        sampleUk: "SBOM генерують під час тієї ж збірки, що й образ, із lock-файлом, зберігають поряд і потім шукають у ньому CVE конкретного релізу; список із ноутбука через тиждень уже не той граф, і сам перелік не замінює виправлення.",
        sampleEn: "You generate the SBOM during the same build as the image, from a lock file, you store it alongside, and later you look up a CVE in that exact release; a laptop list a week later is already a different graph, and the list itself does not replace a fix.",
      },
      {
        slug: "do-sc-pin",
        titleUk: "Піни й хеші: latest у Dockerfile — це чужий коміт у вашому проді",
        titleEn: "Pins and hashes: latest in a Dockerfile is someone else's commit in your prod",
        difficulty: 3,
        pointsUk: ["Пініть версію й дигест критичних образів і actions", "Оновлення пінів — окремий PR із збіркою", "Lock-файл у CI обов'язковий"],
        pointsEn: ["Pin the version and the digest of critical images and actions", "Updating pins is a separate PR with a build", "A lock file in CI is mandatory"],
        conceptUk: "FROM node:latest або action@v4 без хеша означає, що наступна збірка може підтягнути інший вміст під тією самою назвою — зокрема зламаний або підмінений. Пініть мажор.мінор.патч і, для критичних базових образів і GitHub Actions, дигест sha256 / pin SHA коміту. Dependabot або Renovate оновлюють піни свідомо, з diff і збіркою, а не 'завжди latest'. npm/pip без lock-файлу в CI — та сама дірка. Перевіряйте підпис постачальника, коли він є, але підпис не скасовує пін: ви хочете той самий відомий вміст. Коментар 'оновити пізніше' біля latest — не контроль.",
        conceptEn: "FROM node:latest or an action@v4 without a hash means the next build may pull different content under the same name — including broken or substituted content. Pin major.minor.patch and, for critical base images and GitHub Actions, a sha256 digest / a commit SHA pin. Dependabot or Renovate update pins deliberately, with a diff and a build, not 'always latest'. npm/pip without a lock file in CI is the same hole. Verify a vendor signature when one exists, but a signature does not cancel a pin: you want that same known content. A comment 'update later' next to latest is not control.",
        code: "FROM node:22.11.0@sha256:abc...\n# uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683  # v4.2.2",
        language: "dockerfile",
        retrieval: [
          { kind: "mcq", promptUk: "Чим небезпечний uses: actions/checkout@v4 без SHA?", promptEn: "What is dangerous about uses: actions/checkout@v4 without a SHA?", options: ["тег v4 може пересунутись на інший коміт, зокрема скомпрометований", "GitHub забороняє v4", "SHA не можна перевірити", "checkout тоді не клонує"], correctIndex: 0, explanationUk: "Тег плаває, SHA — ні.", explanationEn: "A tag floats, a SHA does not." },
          { kind: "fill", promptUk: "Допишіть незмінне посилання базового образу", promptEn: "Fill in an immutable base-image reference", language: "dockerfile", code: "FROM node:22.11.0@sha256:___", accepted: ["abc", "deadbeef", "sha"], caseSensitive: true, explanationUk: "Після sha256: — дигест вмісту.", explanationEn: "After sha256: comes the content digest." }
        ],
        whyUk: "Як оновлювати залежності, не живучи на latest?",
        whyEn: "How do you update dependencies without living on latest?",
        ideas: [{ labelUk: "пін версії й дигесту", labelEn: "a version and digest pin", anyOf: ["пін", "pin", "sha256", "digest", "latest"] }, { labelUk: "PR від Renovate", labelEn: "a Renovate PR", anyOf: ["renovate", "dependabot", "pr", "збір", "build"] }, { labelUk: "lock-файл", labelEn: "a lock file", anyOf: ["lock", "npm", "pip", "ci"] }],
        sampleUk: "Фіксують версію й sha256 критичних образів і actions, оновлюють піни окремим PR із збіркою (Renovate/Dependabot) і тримають lock-файл у CI; latest і тег без SHA підкладають чужий вміст.",
        sampleEn: "You pin the version and sha256 of critical images and actions, you update pins in a separate PR with a build (Renovate/Dependabot), and you keep a lock file in CI; latest and a tag without a SHA slip in someone else's content.",
      },
      {
        slug: "do-sc-prov",
        titleUk: "Provenance: хто зібрав, з якого коміту, у якому раннері",
        titleEn: "Provenance: who built it, from which commit, in which runner",
        difficulty: 3,
        pointsUk: ["Атестація: коміт, раннер, workflow — поряд із дигестом", "Політика деплою відхиляє образи 'з ноутбука'", "Provenance не замінює рев'ю коду"],
        pointsEn: ["An attestation: commit, runner, workflow — next to the digest", "A deploy policy rejects images 'from a laptop'", "Provenance does not replace a code review"],
        conceptUk: "Provenance (SLSA) — атестація, що артефакт зібрано з конкретного коміту в захищеному раннері, а не 'з ноутбука під п'ятницю'. Її підписують (наприклад, keyless OIDC у CI) і зберігають біля дигесту. При деплої політика може вимагати: лише образи з provenance від цього репозиторію й цього workflow. Це закриває шлях 'я запушив однойменний тег із домашньої Docker'. Рівні SLSA зростають від документованого процесу до герметичної збірки. Provenance не доводить, що код добрий — лише що він зібраний там, де ви очікуєте. Секрети збірки не повинні потрапляти в атестацію.",
        conceptEn: "Provenance (SLSA) is an attestation that the artifact was built from a concrete commit in a protected runner, not 'from a laptop on a Friday'. It is signed (for example, keyless OIDC in CI) and stored next to the digest. At deploy time a policy can require: only images with provenance from this repository and this workflow. That closes the path 'I pushed the same tag from my home Docker'. SLSA levels rise from a documented process to a hermetic build. Provenance does not prove the code is good — only that it was built where you expect. Build secrets must not leak into the attestation.",
        code: "# policy: admit image only if SLSA provenance.repo == github.com/org/app\n# and workflow == .github/workflows/release.yml",
        language: "yaml",
        retrieval: [
          { kind: "mcq", promptUk: "Що provenance не доводить?", promptEn: "What does provenance not prove?", options: ["що код правильний і безпечний за змістом — лише що збірка була в очікуваному CI", "з якого коміту зібрано", "який workflow збирав", "що підпис валідний"], correctIndex: 0, explanationUk: "Це походження збірки, не якість коду.", explanationEn: "It is build origin, not code quality." },
          { kind: "read", promptUk: "Чому деплой має відхилити образ із тим самим тегом, зібраний локально?", promptEn: "Why should a deploy reject an image with the same tag built locally?", language: "bash", code: "docker push ghcr.io/app:1.2   # from a laptop, no attestation", options: ["немає атестації від захищеного workflow цього репозиторію", "локальний Docker завжди повільніший", "теги локально заборонені реєстром", "SLSA вимагає latest"], correctIndex: 0, explanationUk: "Політика дивиться provenance, не лише тег.", explanationEn: "The policy looks at provenance, not only the tag." }
        ],
        whyUk: "Як політика деплою відрізняє офіційну збірку від образу 'з ноутбука'?",
        whyEn: "How does a deploy policy tell an official build from an image 'from a laptop'?",
        ideas: [{ labelUk: "атестація provenance", labelEn: "a provenance attestation", anyOf: ["provenance", "атестац", "attestation", "slsa"] }, { labelUk: "коміт і workflow", labelEn: "commit and workflow", anyOf: ["коміт", "commit", "workflow", "раннер", "runner"] }, { labelUk: "не лише тег", labelEn: "not only a tag", anyOf: ["тег", "tag", "ноут", "laptop", "політик", "policy"] }],
        sampleUk: "Під час CI підписують provenance (коміт, раннер, workflow) біля дигесту, а деплой вимагає цю атестацію від потрібного репозиторію; однойменний тег із ноутбука відхиляють. Це не замінює рев'ю коду.",
        sampleEn: "During CI you sign provenance (commit, runner, workflow) next to the digest, and the deploy requires that attestation from the right repository; a same-named tag from a laptop is rejected. That does not replace a code review.",
      },
      {
        slug: "do-sc-depscan",
        titleUk: "Скан залежностей: сигнал, тріаж і термін, не море PDF",
        titleEn: "Dependency scanning: a signal, a triage, and a deadline — not a sea of PDFs",
        difficulty: 3,
        pointsUk: ["Тріаж у контексті й SLO, інакше сканер вимкнуть", "Ignore з датою, не назавжди", "Скануйте lock і фінальний образ, не лише маніфест"],
        pointsEn: ["Triage in context and an SLO, or the scanner gets turned off", "An ignore with a date, not forever", "Scan the lock and the final image, not only the manifest"],
        conceptUk: "Щоденний звіт на 400 CVE без тріажу ніхто не читає: команда вимикає сканер. Потрібні: серйозність у вашому контексті (чи код взагалі викликається), наявність експлойта, чи є виправлення, і SLO на виправлення (критичне — дні, низьке — наступний цикл). Ignore — з причиною і датою перегляду, не 'назавжди'. Скануйте lock-файл і фінальний образ (в т.ч. OS-пакети базового шару), не лише package.json. Оновлення транзитивної залежності перевіряйте тестами. Не плутайте 'ліцензія GPL у внутрішньому клієнті' з CVE — це інший процес, теж із SBOM.",
        conceptEn: "A daily report of 400 CVEs with no triage is read by nobody: the team turns the scanner off. You need: severity in your context (is the code even called), whether an exploit exists, whether a fix exists, and an SLO for the fix (critical — days, low — the next cycle). An ignore has a reason and a review date, not 'forever'. Scan the lock file and the final image (including OS packages of the base layer), not only package.json. A transitive dependency update is checked with tests. Do not confuse 'a GPL license in an internal client' with a CVE — that is a different process, also from the SBOM.",
        code: "# policy: critical reachable CVE = 7 days; ignore requires reason + review-by\n# scan: package-lock.json AND final image (OS + app)",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Чому 400 'high' щодня без тріажу шкідливі?", promptEn: "Why are 400 'high' findings a day without triage harmful?", options: ["команда ігнорує сигнал; потрібен контекст, пріоритет і термін", "сканер завжди має рацію й треба все закривати за годину", "high означає, що прод уже зламали", "ліцензії важливіші за CVE"], correctIndex: 0, explanationUk: "Сигнал без тріажу стає шумом.", explanationEn: "A signal without triage becomes noise." },
          { kind: "read", promptUk: "Чому скану лише package.json недостатньо?", promptEn: "Why is scanning only package.json not enough?", language: "json", code: "{ \"dependencies\": { \"app-lib\": \"^1.2.0\" } }", options: ["транзитивні версії й OS-пакети образу живуть у lock і в шарах, не в маніфесті", "у package.json ніколи немає залежностей", "сканери не читають json", "CVE бувають лише в Ruby"], correctIndex: 0, explanationUk: "Lock і образ — фактичний граф.", explanationEn: "The lock and the image are the actual graph." }
        ],
        whyUk: "Як зробити скан залежностей корисним, а не причиною вимкнути бота?",
        whyEn: "How do you make dependency scanning useful, instead of a reason to turn the bot off?",
        ideas: [{ labelUk: "тріаж і контекст", labelEn: "triage and context", anyOf: ["тріаж", "triage", "контекст", "context", "виклик", "called"] }, { labelUk: "SLO і ignore з датою", labelEn: "an SLO and a dated ignore", anyOf: ["slo", "ignore", "дат", "date", "термін", "deadline"] }, { labelUk: "lock і образ", labelEn: "the lock and the image", anyOf: ["lock", "образ", "image", "транзитив", "transitive"] }],
        sampleUk: "Тріажать знахідки в контексті виклику коду, ставлять SLO й ignore з датою перегляду, сканують lock-файл і фінальний образ, а не шлють 400 high щодня без пріоритету — інакше команду вимикає шум.",
        sampleEn: "You triage findings in the context of whether the code is called, you set an SLO and a dated ignore, you scan the lock file and the final image, and you do not send 400 highs a day with no priority — otherwise noise makes the team turn the scanner off.",
      }
    ],
    "Контрольна: ланцюг постачання",
    "Exam: supply chain",
    [
      { promptUk: "SBOM варто генерувати…", promptEn: "An SBOM should be generated…", options: ["під час тієї ж збірки, що й артефакт", "на ноутбуці через місяць", "лише після CVE", "замість виправлення"], correctIndex: 0, explanationUk: "Той самий коміт і lock-файл.", explanationEn: "The same commit and lock file." },
      { promptUk: "action@v4 без SHA…", promptEn: "An action@v4 without a SHA is…", options: ["плаваючий тег, вміст може змінитись", "незмінний як дигест", "заборонений GitHub", "заміна SBOM"], correctIndex: 0, explanationUk: "Пініть SHA.", explanationEn: "Pin the SHA." },
      { promptUk: "Provenance доводить…", promptEn: "Provenance proves…", options: ["що збірка була з цього коміту в очікуваному CI, не що код ідеальний", "відсутність CVE", "якість рев'ю", "що latest безпечний"], correctIndex: 0, explanationUk: "Походження, не якість.", explanationEn: "Origin, not quality." },
      { promptUk: "Деплой образу 'з ноутбука' з тим самим тегом…", promptEn: "Deploying a 'laptop' image with the same tag should…", options: ["відхилитися політикою без атестації workflow", "завжди проходити, якщо тег збігся", "замінити SLSA", "не потребувати реєстру"], correctIndex: 0, explanationUk: "Політика дивиться атестацію.", explanationEn: "The policy looks at the attestation." },
      { promptUk: "Ignore CVE 'назавжди' без дати…", promptEn: "Ignoring a CVE 'forever' with no date is…", options: ["погана практика; потрібні причина і review-by", "стандарт SLSA", "заміна lock-файлу", "обов'язкова для low"], correctIndex: 0, explanationUk: "Термін перегляду.", explanationEn: "A review date." },
      { promptUk: "Скан лише package.json пропускає…", promptEn: "Scanning only package.json misses…", options: ["транзитивні версії в lock і OS-пакети образу", "усі прямі залежності завжди", "ліцензії в README", "назву сервісу"], correctIndex: 0, explanationUk: "Скануйте lock і образ.", explanationEn: "Scan the lock and the image." }
    ],
  ),
  sectionUnit(
    "policy_as_code",
    "Політика як код: OPA, admission, break-glass",
    "Policy as code: OPA, admission, and break-glass",
    [
      {
        slug: "do-pol-opa",
        titleUk: "Правило в репозиторії, не в вікі, яку ніхто не читає",
        titleEn: "A rule in a repository, not in a wiki nobody reads",
        difficulty: 3,
        pointsUk: ["Правило в коді з PR і тестами allow/deny", "Автоматичне застосування, не вікі", "Deny пояснює, як виправити"],
        pointsEn: ["A rule in code with a PR and allow/deny tests", "Automatic enforcement, not a wiki", "A deny explains how to fix it"],
        conceptUk: "Політика як код (OPA/Rego, Kyverno, Sentinel) записує правило так, щоб його можна було рев'ювати, тестувати й застосовувати автоматично: 'у prod немає latest', 'усі сервіси мають limits', 'S3 без публічного ACL'. Вікі 'будь ласка, не робіть' не зупиняє CI. Тести політики (вхідний фікстурний ресурс → allow/deny) такі ж обов'язкові, як тести застосунку: помилковий deny зупиняє реліз, помилковий allow відкриває дірку. Версіонуйте політику окремим репозиторієм або текою з PR. Пояснення deny має казати, що виправити, не лише 'violation'.",
        conceptEn: "Policy as code (OPA/Rego, Kyverno, Sentinel) writes a rule so it can be reviewed, tested, and applied automatically: 'no latest in prod', 'every service has limits', 'no public ACL on S3'. A wiki that says 'please do not' does not stop CI. Policy tests (an input fixture resource → allow/deny) are as mandatory as application tests: a wrong deny stops a release, a wrong allow opens a hole. Version the policy in a separate repository or folder with a PR. A deny explanation should say what to fix, not only 'violation'.",
        code: "# policy_test.yaml\ninput: { image: 'app:latest', env: 'prod' }\nwant: deny  # message: pin a digest, latest is forbidden in prod",
        language: "yaml",
        retrieval: [
          { kind: "mcq", promptUk: "Чому правило 'не використовуйте latest' у Confluence слабше за Rego-тест у CI?", promptEn: "Why is a 'do not use latest' rule in Confluence weaker than a Rego test in CI?", options: ["вікі не блокує збірку; код політики з тестом — блокує і має рев'ю", "Confluence не можна відкрити", "Rego не вміє latest", "PR забороняє політику"], correctIndex: 0, explanationUk: "Політика має виконуватись машиною.", explanationEn: "The policy has to be enforced by a machine." },
          { kind: "fill", promptUk: "Допишіть очікуваний результат юніт-тесту політики", promptEn: "Fill in the expected result of a policy unit test", language: "yaml", code: "want: ___   # for input: image: app:latest, env: prod", accepted: ["deny", "false", "fail"], caseSensitive: true, explanationUk: "latest у prod має бути deny.", explanationEn: "latest in prod should be deny." }
        ],
        whyUk: "Як запровадити правило 'у prod немає latest', щоб воно дійсно виконувалось?",
        whyEn: "How do you introduce a 'no latest in prod' rule so that it is actually enforced?",
        ideas: [{ labelUk: "політика як код", labelEn: "policy as code", anyOf: ["opa", "rego", "kyverno", "політик", "policy"] }, { labelUk: "тести allow/deny", labelEn: "allow/deny tests", anyOf: ["тест", "test", "deny", "allow", "фікстур", "fixture"] }, { labelUk: "не вікі", labelEn: "not a wiki", anyOf: ["вікі", "wiki", "confluence", "PR", "рев"] }],
        sampleUk: "Пишуть правило в OPA чи Kyverno з PR і тестами фікстур allow/deny, підключають його в CI або admission, і в повідомленні deny кажуть, що виправити; запис у вікі сам збірку не зупинить.",
        sampleEn: "You write the rule in OPA or Kyverno with a PR and fixture allow/deny tests, you hook it into CI or admission, and the deny message says what to fix; a wiki entry alone will not stop a build.",
      },
      {
        slug: "do-pol-admission",
        titleUk: "Admission у кластері: остання лінія, не єдина",
        titleEn: "Admission in the cluster: the last line, not the only one",
        difficulty: 3,
        pointsUk: ["Admission ловить apply з ноутбука", "Ту саму політику ганяйте в CI раніше", "Ignore при падінні webhook — дірка"],
        pointsEn: ["Admission catches an apply from a laptop", "Run the same policy in CI earlier", "Ignore when the webhook is down is a hole"],
        conceptUk: "Validating admission (ValidatingAdmissionPolicy, OPA Gatekeeper, Kyverno) відхиляє об'єкт, який не відповідає правилу, ще до того, як він стане в API. Це остання лінія: зловлений kubectl apply з ноутбука. Але покладатись лише на кластер пізно — ту саму політику варто ганяти в CI проти маніфестів, щоб розробник дізнався за хвилини, не після deploy. Mutating admission, що 'тихо дописує' labels, ускладнює розуміння: краще вимагати поле в репозиторії. Вимкнений webhook (failurePolicy=Ignore при недоступності) — дірка; плануйте високу доступність контролера. Тестуйте політику на dry-run.",
        conceptEn: "Validating admission (ValidatingAdmissionPolicy, OPA Gatekeeper, Kyverno) rejects an object that fails a rule before it becomes part of the API. That is the last line: a kubectl apply from a laptop gets caught. But relying only on the cluster is late — the same policy should run in CI against manifests, so a developer finds out in minutes, not after deploy. Mutating admission that 'quietly fills in' labels makes understanding harder: better to require the field in the repository. A webhook with failurePolicy=Ignore when it is down is a hole; plan high availability for the controller. Test the policy in dry-run.",
        code: "# ValidatingAdmissionPolicy + CI: conftest test manifests/ -p policy/\n# webhook failurePolicy=Fail, HA replicas >= 2",
        language: "yaml",
        retrieval: [
          { kind: "mcq", promptUk: "Чому failurePolicy=Ignore на validating webhook небезпечний?", promptEn: "Why is failurePolicy=Ignore on a validating webhook dangerous?", options: ["якщо контролер упав, заборонені об'єкти пройдуть без перевірки", "Ignore прискорює API і це завжди добре", "Kubernetes тоді видаляє політику", "CI перестає працювати"], correctIndex: 0, explanationUk: "Відмова контролю не повинна ставати allow.", explanationEn: "A control failure must not become allow." },
          { kind: "read", promptUk: "Де раніше зловити відсутність resources.limits?", promptEn: "Where should a missing resources.limits be caught earlier?", language: "yaml", code: "# only cluster admission, no CI policy check", options: ["у CI проти маніфесту, а кластер лишається останньою лінією", "лише після інциденту OOM", "лише в Slack", "у DNS"], correctIndex: 0, explanationUk: "Швидкий зворотний зв'язок у CI.", explanationEn: "Fast feedback in CI." }
        ],
        whyUk: "Як поєднати admission у кластері з перевіркою в CI, щоб не лишати дірки при падінні webhook?",
        whyEn: "How do you combine cluster admission with a CI check so a down webhook does not leave a hole?",
        ideas: [{ labelUk: "однакова політика в CI", labelEn: "the same policy in CI", anyOf: ["ci", "маніфест", "manifest", "раніше", "earlier"] }, { labelUk: "admission як остання лінія", labelEn: "admission as the last line", anyOf: ["admission", "kubectl", "кластер", "cluster"] }, { labelUk: "не Ignore", labelEn: "not Ignore", anyOf: ["ignore", "fail", "webhook", "доступн", "availab"] }],
        sampleUk: "Ту саму політику ганяють у CI проти маніфестів, admission у кластері лишають останньою лінією проти apply з ноутбука, а failurePolicy не ставлять Ignore, щоб падіння webhook не відкривало allow.",
        sampleEn: "You run the same policy in CI against manifests, you leave admission in the cluster as the last line against an apply from a laptop, and you do not set failurePolicy to Ignore, so a down webhook does not become an allow.",
      },
      {
        slug: "do-pol-breakglass",
        titleUk: "Break-glass: рідко, коротко, з журналом і відкликанням",
        titleEn: "Break-glass: rare, short, logged, and revoked",
        difficulty: 3,
        pointsUk: ["Коротке вікно з причиною й алертом, не вічний виняток", "Автоматичне відкликання й рев'ю сесії", "Постійний cluster-admin у спільній теці — не break-glass"],
        pointsEn: ["A short window with a reason and an alert, not a forever exception", "Automatic revocation and a session review", "A permanent cluster-admin in a shared folder is not break-glass"],
        conceptUk: "Іноді політика заважає лікувати інцидент: потрібен навмисний обхід (break-glass) — короткоживуча роль, обмежений час, обов'язковий запис 'чому' й оповіщення каналу безпеки. Це не постійний виняток у коді політики 'для цього сервісу назавжди'. Після вікна права відкликають автоматично, сесію рев'юять. Обхід без журналу — дірка, яку не відрізнити від атаки. Тренуйте процедуру на tabletop: хто затверджує, як довго, що логігється. Не кладіть постійний kubeconfig cluster-admin у спільну теку 'на всяк випадок' — це не break-glass, це витік.",
        conceptEn: "Sometimes a policy gets in the way of fixing an incident: you need a deliberate bypass (break-glass) — a short-lived role, a limited time, a mandatory 'why' record, and a notice to the security channel. That is not a permanent exception in the policy code 'for this service forever'. After the window, rights are revoked automatically, and the session is reviewed. A bypass with no journal is a hole you cannot tell from an attack. Rehearse the procedure in a tabletop: who approves, how long, what is logged. Do not leave a permanent cluster-admin kubeconfig in a shared folder 'just in case' — that is not break-glass, it is a leak.",
        code: "# break-glass: JIT role, 60 min, ticket id required, notify #sec-alerts, auto-revoke, post-incident review",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Чим постійний exception у політиці для сервісу X гірший за timboxed break-glass?", promptEn: "Why is a permanent policy exception for service X worse than a time-boxed break-glass?", options: ["виняток живе роками без рев'ю й стає тінню політики", "тимчасове вікно завжди небезпечніше", "exception не можна записати в git", "break-glass забороняє журнал"], correctIndex: 0, explanationUk: "Тимчасовість і журнал — суть обходу.", explanationEn: "Temporariness and a journal are the point of a bypass." },
          { kind: "fill", promptUk: "Допишіть обов'язкову властивість прав break-glass", promptEn: "Fill in a mandatory property of break-glass rights", language: "bash", code: "aws sts assume-role --role-arn ... --duration-seconds 3600  # ___-lived", accepted: ["short", "short-lived", "timeboxed"], caseSensitive: true, explanationUk: "Права короткоживучі.", explanationEn: "The rights are short-lived." }
        ],
        whyUk: "Як зробити обхід політики під час інциденту, щоб він не став постійною діркою?",
        whyEn: "How do you bypass a policy during an incident without turning it into a permanent hole?",
        ideas: [{ labelUk: "коротке вікно", labelEn: "a short window", anyOf: ["short", "час", "time", "вікно", "window", "3600"] }, { labelUk: "журнал і алерт", labelEn: "a journal and an alert", anyOf: ["журнал", "log", "alert", "причин", "why", "канал"] }, { labelUk: "відкликання", labelEn: "revocation", anyOf: ["відклик", "revok", "exception", "назавжди", "forever"] }],
        sampleUk: "Дають короткоживучу роль із записом причини й алертом у канал безпеки, після вікна права відкликають і сесію рев'юють; постійний exception у політиці чи cluster-admin у спільній теці — це вже не break-glass.",
        sampleEn: "You grant a short-lived role with a recorded reason and an alert to the security channel, after the window you revoke the rights and review the session; a permanent exception in the policy or a cluster-admin in a shared folder is no longer break-glass.",
      },
      {
        slug: "do-pol-data",
        titleUk: "Дані політики: свіжі каталоги, не зашитий список команд 2022 року",
        titleEn: "Policy data: fresh catalogs, not a team list hard-coded in 2022",
        difficulty: 3,
        pointsUk: ["Дані політики окремо від коду правила й свіжі", "Джерело правди — каталог, оновлення через пайплайн", "Версія бандла пояснює зміну allow/deny"],
        pointsEn: ["Policy data is separate from rule code and is fresh", "The source of truth is the catalog, updates go through a pipeline", "The bundle version explains an allow/deny change"],
        conceptUk: "Правило часто залежить від даних: список команд, дозволені реєстри, критичність сервісів. Якщо цей список зашитий у Rego з 2022-го, політика розходиться з реальністю (нова команда не може задеплоїти, стара — має зайві права). Дані тримають окремо (Bundle, ConfigMap, API каталогу) з джерелом правди в HR/service catalog і з тестом, що ключі існують. Оновлення даних — теж PR або контрольований пайплайн, не ручний kubectl у проді. Версія бандла політики й час оновлення мають бути видимі: 'чому вчора allow, сьогодні deny'. Не змішуйте секрет із даними політики в одному файлі без потреби.",
        conceptEn: "A rule often depends on data: a team list, allowed registries, service criticality. If that list is hard-coded in Rego from 2022, the policy drifts from reality (a new team cannot deploy, an old one has extra rights). Keep the data separate (a bundle, a ConfigMap, a catalog API) with a source of truth in HR/the service catalog and a test that the keys exist. Updating data is also a PR or a controlled pipeline, not a manual kubectl in prod. The policy bundle version and the update time should be visible: 'why was it allow yesterday and deny today'. Do not mix a secret with policy data in one file without a need.",
        code: "# data/allowed_registries.json  ← from service catalog, CI publishes bundle v42\n# policy.rego imports data.allowed_registries  (not a 2022 array in source)",
        language: "json",
        retrieval: [
          { kind: "mcq", promptUk: "Що станеться, якщо дозволені реєстри зашиті в Rego й команда додала новий GHCR org?", promptEn: "What happens if allowed registries are hard-coded in Rego and the team added a new GHCR org?", options: ["деплой буде deny, доки дані не оновлять контрольовано; тому каталог має бути свіжим", "OPA сам знайде новий org", "реєстри не можна додавати", "admission ігнорує реєстри"], correctIndex: 0, explanationUk: "Дані мають оновлюватись разом із каталогом.", explanationEn: "Data must update with the catalog." },
          { kind: "read", promptUk: "Як зрозуміти, чому вчора образ пройшов, а сьогодні ні, без версії бандла?", promptEn: "How do you understand why an image passed yesterday and not today, with no bundle version?", language: "bash", code: "# opa bundle: no version label, data.json edited by hand on the cluster", options: ["майже ніяк: потрібні версія, час і PR/пайплайн змін даних", "завжди винний Kubernetes", "вчора політики не існувало за визначенням", "достатньо логу kubectl"], correctIndex: 0, explanationUk: "Версіонуйте бандл.", explanationEn: "Version the bundle." }
        ],
        whyUk: "Як тримати список дозволених реєстрів у політиці, щоб нова команда не застрягла на місяці?",
        whyEn: "How do you keep the allowed-registry list in a policy so a new team is not stuck for a month?",
        ideas: [{ labelUk: "дані окремо й свіжі", labelEn: "data separate and fresh", anyOf: ["дані", "data", "каталог", "catalog", "bundle"] }, { labelUk: "пайплайн не kubectl", labelEn: "a pipeline, not kubectl", anyOf: ["пайплайн", "pipeline", "pr", "kubectl", "ручн"] }, { labelUk: "версія бандла", labelEn: "the bundle version", anyOf: ["версі", "version", "allow", "deny", "час", "time"] }],
        sampleUk: "Список реєстрів і команд тримають окремо від коду правила, оновлюють із каталогу через PR або пайплайн і версіонують бандл, щоб пояснити зміну allow/deny; зашитий список 2022 року розходиться з реальністю.",
        sampleEn: "You keep the registry and team lists separate from the rule code, you update them from the catalog through a PR or a pipeline, and you version the bundle so you can explain an allow/deny change; a list hard-coded in 2022 drifts from reality.",
      }
    ],
    "Контрольна: політика як код",
    "Exam: policy as code",
    [
      { promptUk: "Правило у вікі без автоматичного застосування…", promptEn: "A wiki rule with no automatic enforcement is…", options: ["слабке: CI його не блокує", "рівне OPA з тестами", "заміна admission", "твердий cap"], correctIndex: 0, explanationUk: "Політика має виконуватись машиною.", explanationEn: "The policy must be enforced by a machine." },
      { promptUk: "failurePolicy=Ignore на validating webhook…", promptEn: "failurePolicy=Ignore on a validating webhook is…", options: ["дірка: при падінні контролера заборонене пройде", "рекомендована HA-практика", "заміна CI", "обов'язковий dry-run"], correctIndex: 0, explanationUk: "Відмова контролю ≠ allow.", explanationEn: "A control failure is not allow." },
      { promptUk: "Політику варто ганяти…", promptEn: "The policy should run…", options: ["і в CI проти маніфестів, і в admission як остання лінія", "лише після інциденту", "лише в вікі", "лише mutating"], correctIndex: 0, explanationUk: "Ранній сигнал і остання лінія.", explanationEn: "An early signal and a last line." },
      { promptUk: "Постійний exception у політиці 'для сервісу X'…", promptEn: "A permanent policy exception 'for service X' is…", options: ["гірший за timboxed break-glass із журналом і відкликанням", "правильний break-glass", "обов'язковий для prod", "заміна HA webhook"], correctIndex: 0, explanationUk: "Обхід — короткий і залогований.", explanationEn: "A bypass is short and logged." },
      { promptUk: "Постійний cluster-admin kubeconfig у спільній теці…", promptEn: "A permanent cluster-admin kubeconfig in a shared folder is…", options: ["витік, не break-glass", "зразковий JIT", "журнал сесії", "дані бандла"], correctIndex: 0, explanationUk: "JIT, коротко, з рев'ю.", explanationEn: "JIT, short, with a review." },
      { promptUk: "Список команд, зашитий у Rego з 2022-го…", promptEn: "A team list hard-coded in Rego from 2022 is…", options: ["застарілі дані: тримайте каталог окремо й версіонуйте бандл", "джерело правди назавжди", "секрет політики", "failurePolicy"], correctIndex: 0, explanationUk: "Дані свіжі й окремо.", explanationEn: "Data is fresh and separate." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandDevops(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits, "data-plane");
}
