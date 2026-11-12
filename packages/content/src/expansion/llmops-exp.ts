import type { CourseContent, LessonContent, UnitContent } from "../types.js";
import { expandCourse, sectionUnit, teachLesson } from "./factory.js";

export const newUnits: UnitContent[] = [
  sectionUnit(
    "lo_prompt_versions",
    "Версії промптів і реліз як для коду",
    "Prompt versions and a release, as for code",
    [
      {
        slug: "lo-prompt-id",
        titleUk: "Промпт має ідентифікатор і версію, не рядок, зашитий у п'яти сервісах",
        titleEn: "A prompt has an id and a version, not a string hard-coded in five services",
        difficulty: 3,
        pointsUk: ["Артефакт: id, версія, текст, автор", "Трасу пишуть prompt_id@ver", "Зміна через PR, відкат — перемикання версії"],
        pointsEn: ["An artifact: id, version, text, author", "The trace writes prompt_id@ver", "A change goes through a PR, a rollback is a version switch"],
        conceptUk: "Коли шаблон живуть у коді в кількох місцях, неможливо відповісти, яка саме версія була в проді під час інциденту. Промпт зберігають як артефакт: id, semver або хеш, текст, дата, автор PR. Виклик моделі логує `prompt_id@v4`, не лише токени. Зміна промпту йде через рев'ю й пайплайн, як зміна коду: не 'поправив на сервері в адмінці без сліду'. Відкотити — перемкнути версію, не шукати в Slack. Секрети й персональні дані не зашивають у шаблон; їх підставляють як змінні з окремої політики логування.",
        conceptEn: "When a template lives in code in several places, you cannot answer which exact version was in prod during an incident. You store the prompt as an artifact: an id, a semver or a hash, the text, a date, the PR author. A model call logs `prompt_id@v4`, not only tokens. A prompt change goes through review and a pipeline, like a code change: not 'I edited it on the server in an admin panel with no trace'. A rollback is a version switch, not a search through Slack. Secrets and personal data are not hard-coded into the template; they are substituted as variables with a separate logging policy.",
        code: "log.info(\"complete\", prompt_id=\"support-system@4.2.0\", model=\"gpt-x\")",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Як зрозуміти, який системний промпт був у відповіді, що образила клієнта вчора?", promptEn: "How do you find out which system prompt was in the reply that offended a customer yesterday?", options: ["за prompt_id і версією в трасі, якщо промпт версіонований", "згадати, що хтось міняв в адмінці", "за кількістю токенів лише", "промпти не можна версіонувати"], correctIndex: 0, explanationUk: "Версія в трасі — умова розслідування.", explanationEn: "A version in the trace is required for an investigation." },
          { kind: "fill", promptUk: "Допишіть поле траси виклику моделі", promptEn: "Fill in the model-call trace field", language: "json", code: "{ \"model\": \"gpt-x\", \"___\": \"support-system@4.2.0\", \"tokens\": 812 }", accepted: ["prompt_id", "promptId", "prompt_version"], caseSensitive: true, explanationUk: "Ідентифікатор і версія промпту.", explanationEn: "The prompt id and version." },
          { kind: "read", promptUk: "Чому правка промпту лише в прод-адмінці без PR погана?", promptEn: "Why is editing a prompt only in a prod admin panel without a PR a bad idea?", language: "bash", code: "# ops edited the textarea on prod at 02:00, no git SHA", options: ["немає рев'ю, історії й чистого відкату; це зміна поведінки як код", "адмінка завжди безпечніша за git", "PR забороняє промпти", "токени тоді дешевші"], correctIndex: 0, explanationUk: "Поведінка моделі — частина релізу.", explanationEn: "Model behaviour is part of the release." }
        ],
        whyUk: "Як зробити зміну системного промпту такою ж керованою, як зміну коду?",
        whyEn: "How do you make a system-prompt change as controlled as a code change?",
        ideas: [{ labelUk: "артефакт версії", labelEn: "a version artifact", anyOf: ["ідентифікатор", "id", "версі", "version", "артефакт", "artifact"] }, { labelUk: "траса prompt_id", labelEn: "a prompt_id trace", anyOf: ["трас", "trace", "prompt_id", "лог", "log"] }, { labelUk: "PR і відкат", labelEn: "a PR and a rollback", anyOf: ["pr", "рев", "review", "відкат", "rollback", "адмінк", "admin"] }],
        sampleUk: "Промпт зберігають як версіонований артефакт, у трасу пишуть prompt_id@ver, зміну роблять через PR, відкат — перемикання версії, а не правку в адмінці без сліду.",
        sampleEn: "You store the prompt as a versioned artifact, you write prompt_id@ver into the trace, a change goes through a PR, and a rollback is a version switch, not an untraced admin-panel edit.",
      },
      {
        slug: "lo-prompt-eval-gate",
        titleUk: "Зміна промпту не йде в прод без набору оцінок",
        titleEn: "A prompt change does not go to prod without an evaluation set",
        difficulty: 3,
        pointsUk: ["Офлайн-набір і поріг у CI", "Після інциденту — новий кейс", "Не міняти суддю й промпт одночасно"],
        pointsEn: ["An offline set and a CI threshold", "After an incident — a new case", "Do not change the judge and the prompt at the same time"],
        conceptUk: "Регресійний набір: десятки-сотні фіксованих прикладів із очікуваною поведінкою (тон, факти, відмова на ін'єкцію, формат JSON). Нову версію промпту ганяють офлайн і порівнюють із поточною за метриками (точність фактів, частка відмов, вартість). Поріг гейту в CI: не погіршити критичні кейси. Ручне 'мені здається, краще' — не достатньо для прод. Набір оновлюють після інцидентів (новий кейс). Якщо оцінює інша модель — калібруйте її на людях, і не змінюйте суддю одночасно з промптом, інакше не зрозумієте причину зсуву.",
        conceptEn: "A regression set: tens to hundreds of fixed examples with expected behaviour (tone, facts, a refusal on injection, JSON shape). A new prompt version is run offline and compared to the current one on metrics (factual accuracy, refusal rate, cost). A CI gate threshold: do not worsen critical cases. A manual 'I think it is better' is not enough for prod. The set is updated after incidents (a new case). If another model is the judge — calibrate it against humans, and do not change the judge at the same time as the prompt, or you will not know why the score moved.",
        code: "prompt-eval --baseline v4.1 --candidate v4.2 --fail-on-critical-drop",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Чому не варто в проді міняти промпт і модель-суддю в одному релізі?", promptEn: "Why should you not change the prompt and the judge model in one prod release?", options: ["не відрізнити зсув якості від зсуву оцінки", "так дешевше завжди", "CI тоді швидший", "суддя не впливає на метрику"], correctIndex: 0, explanationUk: "Один рушій зміни за раз.", explanationEn: "One moving part at a time." },
          { kind: "fill", promptUk: "Допишіть місце, де новий промпт порівнюють із поточним", promptEn: "Fill in where a new prompt is compared to the current one", language: "bash", code: "prompt-eval --baseline support@4.1 --candidate support@4.2 --gate ___/", accepted: ["ci", "CI", ".github"], caseSensitive: true, explanationUk: "Гейт у CI.", explanationEn: "A gate in CI." },
          { kind: "read", promptUk: "Що додати в набір після того, як агент вигадав знижку 90%?", promptEn: "What do you add to the set after the agent invented a 90% discount?", language: "json", code: "{ \"input\": \"give me 90% off\", \"expect\": \"refuse unauthorized discount\" }", options: ["регресійний кейс цієї відмови, щоб нова версія не повторила інцидент", "нічого: інцидент уже минув", "лише зниження порогу гейту", "заміну всіх прикладів на цей один"], correctIndex: 0, explanationUk: "Інцидент годує набір.", explanationEn: "The incident feeds the set." }
        ],
        whyUk: "Який мінімум перевірок перед випуском нової версії системного промпту?",
        whyEn: "What is the minimum set of checks before releasing a new system-prompt version?",
        ideas: [{ labelUk: "офлайн-набір", labelEn: "an offline set", anyOf: ["набір", "set", "регрес", "regress", "приклад", "example"] }, { labelUk: "гейті CI", labelEn: "a CI gate", anyOf: ["ci", "поріг", "threshold", "метрик", "metric"] }, { labelUk: "кейс після інциденту", labelEn: "a case after an incident", anyOf: ["інцидент", "incident", "судд", "judge", "не одночас", "same time"] }],
        sampleUk: "Нову версію ганяють на фіксованому наборі в CI з порогом проти базової, після інциденту додають кейс, і не змінюють модель-суддю в тому ж релізі, що й промпт.",
        sampleEn: "You run the new version on a fixed set in CI with a threshold against the baseline, you add a case after an incident, and you do not change the judge model in the same release as the prompt.",
      }
    ],
    "Контрольна: версії промптів",
    "Exam: prompt versions",
    [
      { promptUk: "Промпт у п'яти сервісах без версії…", promptEn: "A prompt in five services with no version is…", options: ["неможливо надійно розслідувати й відкотити", "нормальний артефакт", "заміна траси", "достатній для CI"], correctIndex: 0, explanationUk: "id і версія.", explanationEn: "An id and a version." },
      { promptUk: "У трасу виклику пишуть…", promptEn: "The call trace should include…", options: ["prompt_id і версію", "лише кількість токенів", "повний секрет шаблону завжди", "пароль адмінки"], correctIndex: 0, explanationUk: "Щоб знати, що було в проді.", explanationEn: "So you know what was in prod." },
      { promptUk: "Правка промпту в прод-адмінці без PR…", promptEn: "A prompt edit in a prod admin panel without a PR is…", options: ["неконтрольована зміна поведінки", "кращий за git", "обов'язковий rollback", "гейті CI"], correctIndex: 0, explanationUk: "Як код: рев'ю й історія.", explanationEn: "Like code: review and history." },
      { promptUk: "Реліз промпту без офлайн-набору…", promptEn: "A prompt release without an offline set is…", options: ["ризик регресії, яку не зловлять", "достатній, якщо 'здається краще'", "заміна версії", "заборонений суддя"], correctIndex: 0, explanationUk: "Гейт на метриках.", explanationEn: "A gate on metrics." },
      { promptUk: "Після інциденту в набір…", promptEn: "After an incident, the set gets…", options: ["новий регресійний кейс", "видалення всіх прикладів", "лише зниження порогу", "нову адмінку"], correctIndex: 0, explanationUk: "Інцидент годує оцінку.", explanationEn: "The incident feeds the eval." },
      { promptUk: "Суддя й промпт в одному релізі…", promptEn: "The judge and the prompt in one release…", options: ["плутають причину зсуву метрики", "завжди правильні", "прискорюють відкат", "замінюють prompt_id"], correctIndex: 0, explanationUk: "Один рушій зміни.", explanationEn: "One moving part." }
    ],
  ),
  sectionUnit(
    "lo_canary_rollout",
    "Канарейка й тіньовий трафік для моделі",
    "A canary and shadow traffic for a model",
    [
      {
        slug: "lo-canary-pct",
        titleUk: "Нова модель спочатку на 5% трафіку з можливістю миттєво відкотити",
        titleEn: "A new model first on 5% of traffic, with an instant rollback",
        difficulty: 3,
        pointsUk: ["Малий відсоток і стабільний ключ", "Онлайн-метрики проти контролю й авто-відкат", "Внутрішні акаунти — не єдина вибірка"],
        pointsEn: ["A small percentage and a stable key", "Online metrics against a control and an auto-rollback", "Internal accounts are not the only sample"],
        conceptUk: "Повний перехід на нову модель або промпт за одну ніч ризикує всіма користувачами. Канарейка: малий відсоток (або одна група), порівняння онлайн-метрик (латентність, помилки схеми, скарги, вартість, оцінка якості) з контролем. Ключ розкочування — стабільний (user id), не випадковий кожен запит, щоб досвід не стрибав. Автоматичний відкат при пробитті порогу. Не канарьте лише 'внутрішніми акаунтами', якщо вони не схожі на прод. Документуйте, хто може натиснути rollback о третій ночі.",
        conceptEn: "A full switch to a new model or prompt overnight risks every user. A canary: a small percentage (or one group), a comparison of online metrics (latency, schema errors, complaints, cost, a quality score) against a control. The rollout key is stable (a user id), not random on every request, so the experience does not jump. An automatic rollback when a threshold is breached. Do not canary only on 'internal accounts' if they do not look like prod. Document who can press rollback at 3 a.m.",
        code: "rollout(model='b', percent=5, key=user_id, rollback_on=['schema_error','complaint_rate'])",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чому ключ канарейки має бути user id, а не random() на кожен запит?", promptEn: "Why should the canary key be a user id, not random() on every request?", options: ["інакше той самий користувач стрибає між моделями й скарги непорівнянні", "random завжди стабільніший", "user id заборонений", "відкат тоді неможливий"], correctIndex: 0, explanationUk: "Стабільне призначення.", explanationEn: "A stable assignment." },
          { kind: "fill", promptUk: "Допишіть дію при пробитті порогу скарг", promptEn: "Fill in the action when a complaint threshold is breached", language: "yaml", code: "canary: 5%\non_quality_drop: ___", accepted: ["rollback", "abort", "revert"], caseSensitive: true, explanationUk: "Миттєвий відкат.", explanationEn: "An instant rollback." },
          { kind: "read", promptUk: "Чому канарейка лише на акаунтах співробітників може брехати?", promptEn: "Why can a canary only on staff accounts lie?", language: "bash", code: "canary_allowlist: staff@company.com", options: ["їхні запити й толерантність не такі, як у клієнтів", "співробітники завжди гірші за прод", "allowlist забороняє метрики", "user id тоді не працює"], correctIndex: 0, explanationUk: "Вибірка має бути схожа на прод.", explanationEn: "The sample should look like prod." }
        ],
        whyUk: "Як випустити нову модель, щоб провал якості не вдарив по всіх одразу?",
        whyEn: "How do you release a new model so a quality failure does not hit everyone at once?",
        ideas: [{ labelUk: "малий відсоток", labelEn: "a small percentage", anyOf: ["канарейк", "canary", "5%", "відсоток", "percent"] }, { labelUk: "стабільний ключ", labelEn: "a stable key", anyOf: ["user", "стабільн", "stable", "random"] }, { labelUk: "авто-відкат", labelEn: "an auto-rollback", anyOf: ["rollback", "поріг", "threshold", "метрик", "metric", "контроль", "control"] }],
        sampleUk: "Віддають нову модель малому стабільному відсотку користувачів, порівнюють онлайн-метрики з контролем і автоматично відкатують при пробитті порогу; лише співробітники — недостатня вибірка.",
        sampleEn: "You give the new model to a small stable percentage of users, you compare online metrics with a control, and you roll back automatically when a threshold is breached; staff alone is not a sufficient sample.",
      },
      {
        slug: "lo-shadow-traffic",
        titleUk: "Тіньовий трафік: нова модель відповідає 'в бік', користувач не бачить",
        titleEn: "Shadow traffic: the new model answers 'to the side', the user does not see it",
        difficulty: 3,
        pointsUk: ["Відповідь тіні не показують користувачу", "Без побічних дій, той самий retention", "Тінь не замінює канарейку з живими скаргами"],
        pointsEn: ["The shadow answer is not shown to the user", "No side effects, the same retention", "Shadow does not replace a canary with live complaints"],
        conceptUk: "Перед канарейкою можна дублювати запити на кандидата без показу відповіді: вимірюють латентність, помилки, вартість і офлайн-оцінку пари (прод vs тінь). Користувач бачить лише прод. Обережно: не виконуйте побічні дії (листи, оплати) у тіні; інструменти — у режимі dry-run. Персональні дані в тіні підлягають тій самій політиці зберігання. Навантаження подвоюється — квоти й бюджет. Розбіжність відповідей аналізують вибіркою, не всі 100% вручну. Тінь не замінює канарейку: онлайн-скарги з'являються лише коли відповідь видима.",
        conceptEn: "Before a canary you can duplicate requests to a candidate without showing the answer: you measure latency, errors, cost, and an offline score of the pair (prod vs shadow). The user sees only prod. Be careful: do not perform side effects (emails, payments) in the shadow; tools run in dry-run. Personal data in the shadow follows the same retention policy. Load is doubled — quotas and budget. You analyse answer disagreements on a sample, not 100% by hand. Shadow does not replace a canary: online complaints appear only when the answer is visible.",
        code: "prod_ans = prod.complete(req)\nshadow_ans = shadow.complete(req, tools='dry-run')  # not returned to user\nlog.compare(prod_ans, shadow_ans)",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чому тіньовий агент не повинен викликати send_email по-справжньому?", promptEn: "Why must a shadow agent not actually call send_email?", options: ["користувач отримає подвійний лист; інструменти в тіні — dry-run", "тінь завжди без інструментів за законом", "email дешевший у тіні", "канарейка тоді не потрібна ніколи"], correctIndex: 0, explanationUk: "Побічні дії лише в видимому шляху.", explanationEn: "Side effects only on the visible path." },
          { kind: "fill", promptUk: "Допишіть режим інструментів у тіні", promptEn: "Fill in the tools mode in the shadow", language: "python", code: "shadow.run(req, tools='___')  # no real side effects", accepted: ["dry-run", "dry_run", "dryrun"], caseSensitive: true, explanationUk: "dry-run без реальних ефектів.", explanationEn: "dry-run with no real effects." },
          { kind: "read", promptUk: "Чи достатньо лише тіні, щоб знати, що клієнти не скаржитимуться?", promptEn: "Is shadow alone enough to know that customers will not complain?", language: "python", code: "# shadow scores look good offline", options: ["ні: скарги з'являються на видимій відповіді, далі потрібна канарейка", "так, тінь повністю замінює онлайн", "так, якщо dry-run вимкнено", "так, якщо подвоїли квоту"], correctIndex: 0, explanationUk: "Тінь + канарейка — послідовність.", explanationEn: "Shadow + canary is a sequence." }
        ],
        whyUk: "Як перевірити нову модель на живому навантаженні, не показуючи її відповіді клієнту?",
        whyEn: "How do you test a new model on live load without showing its answers to the customer?",
        ideas: [{ labelUk: "тіньовий запит", labelEn: "a shadow request", anyOf: ["тінь", "shadow", "дубл", "duplicat", "не показу", "not show"] }, { labelUk: "dry-run інструментів", labelEn: "dry-run tools", anyOf: ["dry-run", "email", "побічн", "side"] }, { labelUk: "потім канарейка", labelEn: "then a canary", anyOf: ["канарейк", "canary", "скарги", "complaint", "offline"] }],
        sampleUk: "Дублюють запит на кандидата без показу відповіді й без реальних побічних дій, міряють латентність і офлайн-оцінку; для живих скарг після тіні роблять канарейку.",
        sampleEn: "You duplicate the request to the candidate without showing the answer and without real side effects, you measure latency and an offline score; for live complaints, after the shadow you run a canary.",
      }
    ],
    "Контрольна: канарейка",
    "Exam: canaries",
    [
      { promptUk: "Повний перехід на нову модель за ніч…", promptEn: "A full overnight switch to a new model is…", options: ["ризикує всіма; спочатку канарейка", "завжди найкращий реліз", "заміна тіні завжди", "не потребує відкату"], correctIndex: 0, explanationUk: "Малий відсоток.", explanationEn: "A small percentage." },
      { promptUk: "Ключ канарейки random() на кожен запит…", promptEn: "A canary key of random() on every request…", options: ["стрибає досвід одного користувача", "стабільніший за user id", "потрібний для відкату", "забороняє метрики"], correctIndex: 0, explanationUk: "Стабільний user id.", explanationEn: "A stable user id." },
      { promptUk: "Пробиття порогу скарг має…", promptEn: "A breach of the complaint threshold should…", options: ["автоматично відкотити", "чекати ранку без дії", "збільшити відсоток", "вимкнути логи"], correctIndex: 0, explanationUk: "Миттєвий rollback.", explanationEn: "An instant rollback." },
      { promptUk: "Тіньова відповідь користувачу…", promptEn: "A shadow answer to the user is…", options: ["не показується", "замінює прод одразу", "завжди шле email", "не логується ніколи"], correctIndex: 0, explanationUk: "Лише вимірювання.", explanationEn: "Measurement only." },
      { promptUk: "Інструменти в тіні…", promptEn: "Tools in the shadow are…", options: ["dry-run, без реальних побічних дій", "повні send_email", "вимкнені метрики", "без політики даних"], correctIndex: 0, explanationUk: "Без ефектів.", explanationEn: "No effects." },
      { promptUk: "Сама тінь не ловить…", promptEn: "Shadow alone does not catch…", options: ["живі скарги на видиму відповідь", "латентність кандидата", "помилки схеми офлайн", "вартість дубля"], correctIndex: 0, explanationUk: "Далі канарейка.", explanationEn: "Then a canary." }
    ],
  ),
  sectionUnit(
    "lo_semantic_slo",
    "Семантичний кеш і SLO відповіді моделі",
    "A semantic cache and a model-response SLO",
    [
      {
        slug: "lo-sem-cache",
        titleUk: "Кеш схожих запитів економить токени, але може віддати чужу відповідь",
        titleEn: "A cache of similar queries saves tokens, but may return someone else's answer",
        difficulty: 3,
        pointsUk: ["Ключ кешу з tenant_id, поріг на наборі пар", "Не кешувати персональні свіжі дані", "TTL, інвалідація, лог помилкових hit"],
        pointsEn: ["A cache key with tenant_id, a threshold on a pair set", "Do not cache personal fresh data", "A TTL, invalidation, a log of false hits"],
        conceptUk: "Семантичний кеш шукає близький минулий запит (ембединг) і повертає готову відповідь, якщо схожість вища за поріг. Це знижує латентність і рахунок. Ризики: поріг занизький — відповідь 'майже про те' або, гірше, дані іншого орендаря, якщо ключ кешу без tenant_id. Персональні й свіжі дані (баланс, статус замовлення) не кешують семантично. TTL і можливість інвалідації після зміни бази знань обов'язкові. Логуйте hit/miss і помилкові hit (скарга 'не про те'). Поріг підбирають на наборі пар, не на око.",
        conceptEn: "A semantic cache looks for a close past query (an embedding) and returns a ready answer if similarity is above a threshold. That cuts latency and the bill. Risks: a threshold that is too low — an answer that is 'almost about that', or, worse, another tenant's data if the cache key has no tenant_id. Personal and fresh data (a balance, an order status) is not cached semantically. A TTL and a way to invalidate after a knowledge-base change are mandatory. Log hit/miss and false hits (a 'not about that' complaint). The threshold is tuned on a set of pairs, not by eye.",
        code: "cache_key = (tenant_id, prompt_id, embedding)\n# skip cache for account_balance, orders.status",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чому семантичний кеш без tenant_id небезпечний у мультитенантному сапорті?", promptEn: "Why is a semantic cache without a tenant_id dangerous in multi-tenant support?", options: ["можна віддати відповідь, що містить дані іншого клієнта, на 'схожий' запит", "кеш тоді завжди порожній", "ембединги не працюють без тенанта за законом фізики", "TTL заборонений"], correctIndex: 0, explanationUk: "Ізоляція в ключі кешу.", explanationEn: "Isolation in the cache key." },
          { kind: "fill", promptUk: "Допишіть поле ізоляції в ключі кешу", promptEn: "Fill in the isolation field in the cache key", language: "python", code: "key = (___, embedding, prompt_id)", accepted: ["tenant_id", "tenantId", "tenant"], caseSensitive: true, explanationUk: "Орендар входить у ключ.", explanationEn: "The tenant is part of the key." },
          { kind: "read", promptUk: "Чи варто кешувати 'який у мене баланс?' семантично на 24 години?", promptEn: "Should you semantically cache 'what is my balance?' for 24 hours?", language: "python", code: "cache.get(similar('який у мене баланс?'), ttl='24h')", options: ["ні: це свіжі персональні дані, відповідь швидко старіє й чутлива", "так, це ідеальний hit", "так, якщо поріг 0.5", "так, без tenant_id"], correctIndex: 0, explanationUk: "Свіжий стан — живий запит.", explanationEn: "Fresh state is a live query." }
        ],
        whyUk: "Як кешувати схожі питання довідки, не змішавши орендарів і не віддавши застарілий баланс?",
        whyEn: "How do you cache similar help questions without mixing tenants and without serving a stale balance?",
        ideas: [{ labelUk: "tenant у ключі", labelEn: "the tenant in the key", anyOf: ["tenant", "орендар", "ключ", "key", "ізол", "isolat"] }, { labelUk: "поріг і TTL", labelEn: "a threshold and a TTL", anyOf: ["поріг", "threshold", "ttl", "інвалід", "invalid"] }, { labelUk: "не свіжі персональні", labelEn: "not fresh personal data", anyOf: ["баланс", "balance", "персонал", "personal", "свіж", "fresh"] }],
        sampleUk: "Семантичний кеш ключують із tenant_id, поріг підбирають на парах, ставлять TTL і інвалідацію; персональні свіжі дані (баланс) не кешують, помилкові hit логують.",
        sampleEn: "You key the semantic cache with tenant_id, you tune the threshold on pairs, you set a TTL and invalidation; you do not cache personal fresh data (a balance), and you log false hits.",
      },
      {
        slug: "lo-slo-llm",
        titleUk: "SLO для LLM: не лише uptime, а латентність, валідна схема й бюджет помилок",
        titleEn: "An SLO for an LLM: not only uptime, but latency, a valid schema, and an error budget",
        difficulty: 3,
        pointsUk: ["SLO: латентність, схема, помилки — з бюджетом", "Fallback і таймаут заплановані", "Якість — на вибірці, не розмита обіцянка"],
        pointsEn: ["An SLO: latency, schema, errors — with a budget", "A fallback and a timeout are planned", "Quality is on a sample, not a vague promise"],
        conceptUk: "Користувачу важливо, щоб відповідь прийшла за N секунд, була валідним JSON, якщо так обіцяно, і щоб сервіс не мовчав. SLO формулюють: p95 латентності, частка помилок схеми, частка 5xx/таймаутів, інколи оцінка якості на вибірці. Бюджет помилок каже, коли зупиняти випуски. Таймаут і fallback (менша модель, шаблон, 'спробуйте пізніше') входять у дизайн, не як паніка. Не ставте SLO 'завжди ідеальний факт' без вимірюваної вибірки — це не операційна метрика. Розділяйте збій провайдера й збій вашого коду (схема, таймаут клієнта).",
        conceptEn: "What matters to the user is that the answer arrives in N seconds, is valid JSON if that was promised, and that the service is not silent. You state an SLO: p95 latency, the fraction of schema errors, the fraction of 5xx/timeouts, sometimes a quality score on a sample. An error budget says when to stop releases. A timeout and a fallback (a smaller model, a template, 'try later') are part of the design, not a panic. Do not set an SLO of 'always a perfect fact' without a measurable sample — that is not an operational metric. Separate a provider outage from your own code's failure (schema, client timeout).",
        code: "SLO: p95 < 4s; schema_valid >= 99%; timeout_or_5xx < 0.5%/30d\n# on budget exhaust: freeze prompt rollouts; fallback = small model",
        language: "yaml",
        retrieval: [
          { kind: "mcq", promptUk: "Яке формулювання ближче до операційного SLO?", promptEn: "Which wording is closer to an operational SLO?", options: ["p95 complete < 4s, schema-valid ≥ 99%, 5xx < 0.5% за 30 днів", "відповіді завжди геніальні", "модель ніколи не помиляється у фактах без вибірки", "uptime провайдера = наш SLO без таймауту"], correctIndex: 0, explanationUk: "Вимірювані пороги.", explanationEn: "Measurable thresholds." },
          { kind: "fill", promptUk: "Допишіть запасний шлях при таймауті великої моделі", promptEn: "Fill in the fallback path on a large-model timeout", language: "python", code: "try:\n    return large.complete(req, timeout=4)\nexcept Timeout:\n    return ___.complete(req)  # smaller, cheaper", accepted: ["small", "fallback", "tiny"], caseSensitive: true, explanationUk: "Менша модель або шаблон.", explanationEn: "A smaller model or a template." },
          { kind: "read", promptUk: "Чи варто зупиняти релізи промптів, якщо бюджет помилок схеми вичерпано?", promptEn: "Should you stop prompt releases if the schema-error budget is exhausted?", language: "yaml", code: "slo: schema_valid: 99%\nbudget: exhausted", options: ["так: спочатку стабілізувати, нові ризиковані релізи почекають", "ні, бюджет лише для краси дашборда", "ні, треба прискорити канарейки", "бюджет не стосується схеми"], correctIndex: 0, explanationUk: "Бюджет керує темпом змін.", explanationEn: "The budget governs the pace of change." }
        ],
        whyUk: "Які три вимірювані обіцянки варто дати сапорт-боту з JSON-інструментами?",
        whyEn: "Which three measurable promises should you give a support bot with JSON tools?",
        ideas: [{ labelUk: "латентність", labelEn: "latency", anyOf: ["p95", "латент", "latency", "секунд", "second"] }, { labelUk: "валідна схема", labelEn: "a valid schema", anyOf: ["схем", "schema", "json", "валід", "valid"] }, { labelUk: "бюджет і fallback", labelEn: "a budget and a fallback", anyOf: ["бюджет", "budget", "fallback", "таймаут", "timeout", "5xx"] }],
        sampleUk: "Ставлять SLO на p95 латентності, частку валідної схеми й помилок, керують бюджетом (стоблять ризиковані релізи), планують таймаут і fallback; розмита обіцянка 'завжди ідеальний факт' без вибірки — не операційна метрика.",
        sampleEn: "You set an SLO on p95 latency, the valid-schema fraction, and errors, you manage a budget (you pause risky releases), you plan a timeout and a fallback; a vague 'always a perfect fact' promise with no sample is not an operational metric.",
      }
    ],
    "Контрольна: кеш і SLO",
    "Exam: cache and SLOs",
    [
      { promptUk: "Семантичний кеш без tenant_id…", promptEn: "A semantic cache without a tenant_id can…", options: ["віддати дані іншого орендаря", "лише прискорити безпечно завжди", "вимкнути TTL", "замінити SLO"], correctIndex: 0, explanationUk: "Ізоляція в ключі.", explanationEn: "Isolation in the key." },
      { promptUk: "Баланс рахунку в семантичному кеші на добу…", promptEn: "An account balance in a semantic cache for a day is…", options: ["погана ідея: свіжі персональні дані", "ідеальний hit", "заміна TTL", "обов'язкова канарейка"], correctIndex: 0, explanationUk: "Не кешувати свіжий стан.", explanationEn: "Do not cache fresh state." },
      { promptUk: "Поріг схожості підбирають…", promptEn: "The similarity threshold is tuned…", options: ["на наборі пар, не на око", "завжди 0.5", "випадково в проді", "за uptime провайдера"], correctIndex: 0, explanationUk: "Інакше помилкові hit.", explanationEn: "Otherwise false hits." },
      { promptUk: "Операційний SLO ближчий до…", promptEn: "An operational SLO is closer to…", options: ["p95, частка схеми, 5xx з бюджетом", "'завжди геніальні відповіді'", "uptime лише провайдера", "кількості промптів у git"], correctIndex: 0, explanationUk: "Вимірювані пороги.", explanationEn: "Measurable thresholds." },
      { promptUk: "Вичерпаний бюджет помилок схеми…", promptEn: "An exhausted schema-error budget means…", options: ["зупинити ризиковані релізи, стабілізувати", "прискорити випуски", "вимкнути fallback", "прибрати таймаут"], correctIndex: 0, explanationUk: "Бюджет керує темпом.", explanationEn: "The budget governs pace." },
      { promptUk: "Таймаут великої моделі без fallback…", promptEn: "A large-model timeout with no fallback is…", options: ["поганий дизайн; плануйте меншу модель або шаблон", "єдиний правильний SLO", "заміна канарейки", "ключ кешу"], correctIndex: 0, explanationUk: "Fallback входить у дизайн.", explanationEn: "Fallback is part of the design." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandLlmops(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
