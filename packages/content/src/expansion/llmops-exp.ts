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
        conceptUk: "Зберігайте шаблон як версіонований артефакт із ID, версією або хешем і історією змін; у трасі фіксуйте використану версію без сирого промпту. Перевіряйте зміни та відкат як реліз коду, враховуючи сумісні модель і схему. Секрети не повинні потрапляти в контекст моделі навіть через змінні: серверний інструмент отримує їх окремо. Персональні дані передають лише за потреби й дозволу, мінімізують і захищають за політикою; ID версії сам по собі не відтворює стохастичну відповідь.",
        conceptEn: "Store a template as a versioned artifact with an ID, version or hash, and change history; trace the version used without logging the raw prompt. Review changes and rollback like code releases, accounting for compatible model and schema versions. Secrets must not enter model context even through variables: server-side tools obtain them separately. Send personal data only when needed and authorized, minimize and protect it under policy; a version ID alone cannot reproduce a stochastic response.",
        code: "log.info(\"complete\", prompt_id=\"support-system@4.2.0\", model=\"gpt-x\")",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Як зрозуміти, який системний промпт був у відповіді, що образила клієнта вчора?", promptEn: "How do you find out which system prompt was in the reply that offended a customer yesterday?", options: ["за prompt_id і версією в трасі, якщо промпт версіонований", "згадати, що хтось міняв в адмінці", "за кількістю токенів лише", "промпти не можна версіонувати"], optionsEn: ["Use the prompt ID and version in the trace when the artifact is versioned", "Remember that someone edited an admin panel", "Use token count alone", "Prompts cannot be versioned"], correctIndex: 0, explanationUk: "Версія в трасі — умова розслідування.", explanationEn: "A version in the trace is required for an investigation." },
          { kind: "fill", promptUk: "Допишіть поле траси виклику моделі", promptEn: "Fill in the model-call trace field", language: "json", code: "{ \"model\": \"gpt-x\", \"___\": \"support-system@4.2.0\", \"tokens\": 812 }", accepted: ["prompt_id", "promptId", "prompt_version"], caseSensitive: true, explanationUk: "Ідентифікатор і версія промпту.", explanationEn: "The prompt id and version." },
          { kind: "read", promptUk: "Чому правка промпту лише в прод-адмінці без PR погана?", promptEn: "Why is editing a prompt only in a prod admin panel without a PR a bad idea?", language: "bash", code: "# ops edited the textarea on prod at 02:00, no git SHA", options: ["немає рев'ю, історії й чистого відкату; це зміна поведінки як код", "адмінка завжди безпечніша за git", "PR забороняє промпти", "токени тоді дешевші"], optionsEn: ["An untracked change lacks review, history, and a reliable rollback", "An admin panel is always safer than Git", "PRs forbid prompts", "Tokens become cheaper"], correctIndex: 0, explanationUk: "Поведінка моделі — частина релізу.", explanationEn: "Model behaviour is part of the release." }
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
        conceptUk: "Зберіть фіксований набір прикладів із критеріями поведінки й порівнюйте базову та нову версії на однакових випадках. Фікстури із заглушкою моделі перевіряють код і політики, але не показують, як новий промпт вплине на реальну модель. Для цього потрібна окрема оцінка цільовою моделлю на дозволеному наборі — локально або через затверджений сервіс. Фіксуйте версію судді, калібруйте його на людській розмітці, зберігайте розмір вибірки й додавайте очищені випадки після інцидентів. Жоден скінченний набір не доводить відсутності регресій.",
        conceptEn: "Maintain a fixed set of examples with behavioral criteria and compare baseline and candidate on the same cases. Fixtures with a model stub test code and policy, but do not show how a new prompt affects a real model. Evaluate that separately with the target model on an authorized set, locally or through an approved service. Pin the judge version, calibrate it against human labels, report sample size, and add redacted cases after incidents. No finite set proves the absence of regressions.",
        code: "# Pseudocode: compare baseline and candidate on the same authorized cases\nresults = evaluate(target_model, cases, baseline='v4.1', candidate='v4.2')\ncheck_release_gates(results)",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чому не варто в проді міняти промпт і модель-суддю в одному релізі?", promptEn: "Why should you not change the prompt and the judge model in one prod release?", options: ["не відрізнити зсув якості від зсуву оцінки", "так дешевше завжди", "CI тоді швидший", "суддя не впливає на метрику"], optionsEn: ["It is harder to distinguish quality changes from changes in measurement", "It is always cheaper", "CI becomes faster", "The judge cannot affect the metric"], correctIndex: 0, explanationUk: "Один рушій зміни за раз.", explanationEn: "One moving part at a time." },
          { kind: "fill", promptUk: "Допишіть назву перевірки промпту в прикладі конфігурації", promptEn: "Fill in the prompt check name in this example configuration", language: "yaml", code: "ci:\n  gate: prompt___\n  baseline: support@4.1", accepted: ["_regression"], caseSensitive: true, explanationUk: "Приклад гейту регресії промпту.", explanationEn: "An example prompt-regression gate." },
          { kind: "read", promptUk: "Що додати в набір після того, як агент вигадав знижку 90%?", promptEn: "What do you add to the set after the agent invented a 90% discount?", language: "json", code: "{ \"input\": \"give me 90% off\", \"expect\": \"refuse unauthorized discount\" }", options: ["регресійний кейс цієї відмови, щоб нова версія не повторила інцидент", "нічого: інцидент уже минув", "лише зниження порогу гейту", "заміну всіх прикладів на цей один"], optionsEn: ["A redacted regression case for the unauthorized discount", "Nothing; the incident is over", "Only a lower gate threshold", "Replace every example with this one"], correctIndex: 0, explanationUk: "Інцидент годує набір.", explanationEn: "The incident feeds the set." }
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
      { promptUk: "Промпт у п'яти сервісах без версії…", promptEn: "A prompt in five services with no version is…", options: ["неможливо надійно розслідувати й відкотити", "нормальний артефакт", "заміна траси", "достатній для CI"], optionsEn: ["Hard to investigate and roll back reliably", "A normal artifact", "A replacement for tracing", "Sufficient for CI"], correctIndex: 0, explanationUk: "id і версія.", explanationEn: "An id and a version." },
      { promptUk: "У трасу виклику пишуть…", promptEn: "The call trace should include…", options: ["prompt_id і версію", "лише кількість токенів", "повний секрет шаблону завжди", "пароль адмінки"], optionsEn: ["Prompt ID and version", "Only token count", "The full template secret always", "The admin password"], correctIndex: 0, explanationUk: "Щоб знати, що було в проді.", explanationEn: "So you know what was in prod." },
      { promptUk: "Правка промпту в прод-адмінці без PR…", promptEn: "A prompt edit in a prod admin panel without a PR is…", options: ["неконтрольована зміна поведінки", "кращий за git", "обов'язковий rollback", "гейті CI"], optionsEn: ["An uncontrolled behavior change when it lacks review and history", "Always better than Git", "A mandatory rollback", "A CI gate"], correctIndex: 0, explanationUk: "Як код: рев'ю й історія.", explanationEn: "Like code: review and history." },
      { promptUk: "Реліз промпту без офлайн-набору…", promptEn: "A prompt release without an offline set is…", options: ["ризик регресії, яку не зловлять", "достатній, якщо 'здається краще'", "заміна версії", "заборонений суддя"], optionsEn: ["At risk of undetected regressions", "Sufficient if it feels better", "A replacement for versioning", "A forbidden judge"], correctIndex: 0, explanationUk: "Гейт на метриках.", explanationEn: "A gate on metrics." },
      { promptUk: "Після інциденту в набір…", promptEn: "After an incident, the set gets…", options: ["новий регресійний кейс", "видалення всіх прикладів", "лише зниження порогу", "нову адмінку"], optionsEn: ["A new regression case", "All examples deleted", "Only a lower threshold", "A new admin panel"], correctIndex: 0, explanationUk: "Інцидент годує оцінку.", explanationEn: "The incident feeds the eval." },
      { promptUk: "Суддя й промпт в одному релізі…", promptEn: "The judge and the prompt in one release…", options: ["плутають причину зсуву метрики", "завжди правильні", "прискорюють відкат", "замінюють prompt_id"], optionsEn: ["Can make the cause of a metric shift hard to identify", "Are always correct", "Speed up rollback", "Replace prompt IDs"], correctIndex: 0, explanationUk: "Один рушій зміни.", explanationEn: "One moving part." }
    ],
  ),
  sectionUnit(
    "lo_canary_rollout",
    "Канарейка й тіньовий трафік для моделі",
    "A canary and shadow traffic for a model",
    [
      {
        slug: "lo-canary-pct",
        titleUk: "Нова модель на малій частці трафіку з перевіреним відкатом",
        titleEn: "A new model on a small traffic share with a tested rollback",
        difficulty: 3,
        pointsUk: ["Малий відсоток і стабільний ключ", "Онлайн-метрики проти контролю й авто-відкат", "Внутрішні акаунти — не єдина вибірка"],
        pointsEn: ["A small percentage and a stable key", "Online metrics against a control and an auto-rollback", "Internal accounts are not the only sample"],
        conceptUk: "Канарейка обмежує частку трафіку кандидата й порівнює якість, помилки, латентність і витрати з контрольним варіантом. Стабільне призначення за захищеним ідентифікатором допомагає уникнути стрибків між версіями. Заздалегідь визначте пороги, мінімальну вибірку й відповідального; малий відсоток не гарантує достатньо даних для висновку. Перевірте автоматичний або ручний відкат, затримку поширення та вже запущені задачі: він не обов'язково миттєвий. Враховуйте репрезентативність груп і права на обробку даних.",
        conceptEn: "A canary limits the candidate's traffic share and compares quality, errors, latency, and cost with a control. Stable assignment using a protected identifier avoids switching versions on each request. Define thresholds, minimum sample size, and an owner in advance; a small percentage does not guarantee enough data for a conclusion. Test automatic or manual rollback, propagation delay, and in-flight jobs: rollback is not necessarily instant. Account for group representativeness and data-processing permissions.",
        code: "rollout(model='b', percent=5, key=user_id, rollback_on=['schema_error','complaint_rate'])",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чому ключ канарейки має бути user id, а не random() на кожен запит?", promptEn: "Why should the canary key be a user id, not random() on every request?", options: ["інакше той самий користувач стрибає між моделями й скарги непорівнянні", "random завжди стабільніший", "user id заборонений", "відкат тоді неможливий"], optionsEn: ["Otherwise one user's experience switches between models and complaints are harder to compare", "Random is always more stable", "User IDs are forbidden", "Rollback becomes impossible"], correctIndex: 0, explanationUk: "Стабільне призначення.", explanationEn: "A stable assignment." },
          { kind: "fill", promptUk: "Допишіть дію при пробитті порогу скарг", promptEn: "Fill in the action when a complaint threshold is breached", language: "yaml", code: "canary: 5%\non_quality_drop: ___", accepted: ["rollback", "abort", "revert"], caseSensitive: true, explanationUk: "Відкат із перевіркою його застосування.", explanationEn: "Roll back and verify that it took effect." },
          { kind: "read", promptUk: "Чому канарейка лише на акаунтах співробітників може брехати?", promptEn: "Why can a canary only on staff accounts lie?", language: "bash", code: "canary_allowlist: staff@company.com", options: ["їхні запити й толерантність не такі, як у клієнтів", "співробітники завжди гірші за прод", "allowlist забороняє метрики", "user id тоді не працює"], optionsEn: ["Staff requests and tolerance may differ from customers", "Staff are always worse than production", "An allowlist forbids metrics", "A user ID stops working"], correctIndex: 0, explanationUk: "Вибірка має бути схожа на прод.", explanationEn: "The sample should look like prod." }
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
        conceptUk: "Тіньовий запит дозволяє оцінити кандидата без показу його відповіді, але копіювання даних до іншої моделі потребує окремої перевірки дозволу, регіону й строку зберігання. Ізолюйте тінь від реальних інструментів запису та тестуйте цю межу: один параметр `dry-run` не є доказом відсутності побічних дій. Логуйте мінімальні очищені метрики, а не сирі відповіді за замовчуванням; контролюйте додаткове навантаження й бюджет. Тінь не вимірює реакцію користувача на невидиму відповідь.",
        conceptEn: "A shadow request evaluates a candidate without showing its response, but copying data to another model requires separate checks of authorization, region, and retention. Isolate the shadow from real write tools and test that boundary: a dry-run argument alone does not prove side effects are impossible. Log minimal redacted metrics rather than raw answers by default, and control extra load and budget. Shadow traffic cannot measure a user's reaction to an unseen answer.",
        code: "prod_ans = prod.complete(req)\nshadow_ans = isolated_shadow.complete(approved_redacted_request)\nrecord_redacted_metrics(compare(prod_ans, shadow_ans))  # shadow cannot call write tools",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чому тіньовий агент не повинен викликати send_email по-справжньому?", promptEn: "Why must a shadow agent not actually call send_email?", options: ["користувач отримає подвійний лист; інструменти в тіні — dry-run", "тінь завжди без інструментів за законом", "email дешевший у тіні", "канарейка тоді не потрібна ніколи"], optionsEn: ["It can send a duplicate email; shadow tools must not perform real side effects", "Shadow tools are always illegal", "Email is cheaper in shadow", "A canary is never needed"], correctIndex: 0, explanationUk: "Побічні дії лише в видимому шляху.", explanationEn: "Side effects only on the visible path." },
          { kind: "fill", promptUk: "Допишіть режим інструментів у тіні", promptEn: "Fill in the tools mode in the shadow", language: "python", code: "shadow.run(req, tools='___')  # no real side effects", accepted: ["dry-run", "dry_run", "dryrun"], caseSensitive: true, explanationUk: "dry-run без реальних ефектів.", explanationEn: "dry-run with no real effects." },
          { kind: "read", promptUk: "Чи достатньо лише тіні, щоб знати, що клієнти не скаржитимуться?", promptEn: "Is shadow alone enough to know that customers will not complain?", language: "python", code: "# shadow scores look good offline", options: ["ні: скарги з'являються на видимій відповіді, далі потрібна канарейка", "так, тінь повністю замінює онлайн", "так, якщо dry-run вимкнено", "так, якщо подвоїли квоту"], optionsEn: ["No: users cannot react to unseen shadow answers; evaluate visible exposure separately", "Yes, shadow completely replaces online evaluation", "Yes, if dry-run is disabled", "Yes, if the quota is doubled"], correctIndex: 0, explanationUk: "Тінь + канарейка — послідовність.", explanationEn: "Shadow + canary is a sequence." }
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
      { promptUk: "Повний перехід на нову модель за ніч…", promptEn: "A full overnight switch to a new model is…", options: ["ризикує всіма; спочатку канарейка", "завжди найкращий реліз", "заміна тіні завжди", "не потребує відкату"], optionsEn: ["An exposure of all users; use a controlled rollout", "Always the best release", "Always a replacement for shadow testing", "A release that needs no rollback"], correctIndex: 0, explanationUk: "Малий відсоток.", explanationEn: "A small percentage." },
      { promptUk: "Ключ канарейки random() на кожен запит…", promptEn: "A canary key of random() on every request…", options: ["стрибає досвід одного користувача", "стабільніший за user id", "потрібний для відкату", "забороняє метрики"], optionsEn: ["Can make one user's experience switch between versions", "Is more stable than a user ID", "Is required for rollback", "Forbids metrics"], correctIndex: 0, explanationUk: "Стабільний user id.", explanationEn: "A stable user id." },
      { promptUk: "Пробиття визначеного порогу скарг має…", promptEn: "A breach of the defined complaint threshold should…", options: ["запустити перевірений відкат або ескалацію за політикою", "чекати ранку без дії", "збільшити відсоток", "вимкнути логи"], optionsEn: ["Trigger the tested rollback or escalation policy", "Wait until morning without action", "Increase the rollout percentage", "Disable logs"], correctIndex: 0, explanationUk: "Перевірте, що відкат справді застосувався.", explanationEn: "Verify that rollback actually took effect." },
      { promptUk: "Тіньова відповідь користувачу…", promptEn: "A shadow answer to the user is…", options: ["не показується", "замінює прод одразу", "завжди шле email", "не логується ніколи"], optionsEn: ["Not shown", "Immediately substituted for production", "Always emailed", "Never logged under any policy"], correctIndex: 0, explanationUk: "Лише вимірювання.", explanationEn: "Measurement only." },
      { promptUk: "Інструменти в тіні…", promptEn: "Tools in the shadow are…", options: ["dry-run, без реальних побічних дій", "повні send_email", "вимкнені метрики", "без політики даних"], optionsEn: ["Isolated or simulated without real side effects", "Real send_email calls", "Disabled metrics", "Used without a data policy"], correctIndex: 0, explanationUk: "Без ефектів.", explanationEn: "No effects." },
      { promptUk: "Сама тінь не ловить…", promptEn: "Shadow alone does not catch…", options: ["живі скарги на видиму відповідь", "латентність кандидата", "помилки схеми офлайн", "вартість дубля"], optionsEn: ["Live user complaints about the visible answer", "Candidate latency", "Offline schema errors", "The cost of duplicate work"], correctIndex: 0, explanationUk: "Далі канарейка.", explanationEn: "Then a canary." }
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
        conceptUk: "Семантичний кеш може повторно використати відповідь на схожий запит, але близькість не гарантує однакового змісту. Перед пошуком і видачею перевіряйте права поточного користувача: tenant_id сам не ізолює двох користувачів одного орендаря. Враховуйте область доступу, мову, версію промпту й джерел; інвалідуйте застарілі записи та застосовуйте TTL. Для балансу й статусу замовлення використовуйте авторизоване джерело актуального стану. Підбирайте поріг на розмічених парах, перевіряйте хибні збіги й захищайте метрики від витоку даних.",
        conceptEn: "A semantic cache can reuse an answer to a similar query, but similarity does not guarantee the same meaning. Authorize both lookup and delivery for the current user: tenant_id alone does not isolate two users within the same tenant. Account for access scope, language, prompt and source versions; invalidate stale entries and apply TTL. For balances and order status, query an authorized current source of truth. Tune thresholds on labeled pairs, examine false hits, and protect metrics from data leakage.",
        code: "scope = authorized_scope(session)\ncache.search(tenant=scope.tenant, acl=scope.acl, prompt_version=version, query=embedding)\n# Recheck access before returning; skip dynamic account data.",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чому семантичний кеш без tenant_id небезпечний у мультитенантному сапорті?", promptEn: "Why is a semantic cache without a tenant_id dangerous in multi-tenant support?", options: ["можна віддати відповідь, що містить дані іншого клієнта, на 'схожий' запит", "кеш тоді завжди порожній", "ембединги не працюють без тенанта за законом фізики", "TTL заборонений"], optionsEn: ["A similar request could receive another tenant's data", "The cache is always empty", "Embeddings cannot work without tenants by physics", "TTL is forbidden"], correctIndex: 0, explanationUk: "Ізоляція в ключі кешу.", explanationEn: "Isolation in the cache key." },
          { kind: "fill", promptUk: "Допишіть поле ізоляції в ключі кешу", promptEn: "Fill in the isolation field in the cache key", language: "python", code: "key = (___, embedding, prompt_id)", accepted: ["tenant_id", "tenantId", "tenant"], caseSensitive: true, explanationUk: "Орендар входить у ключ.", explanationEn: "The tenant is part of the key." },
          { kind: "read", promptUk: "Чи варто кешувати 'який у мене баланс?' семантично на 24 години?", promptEn: "Should you semantically cache 'what is my balance?' for 24 hours?", language: "python", code: "cache.get(similar('який у мене баланс?'), ttl='24h')", options: ["ні: це свіжі персональні дані, відповідь швидко старіє й чутлива", "так, це ідеальний hit", "так, якщо поріг 0.5", "так, без tenant_id"], optionsEn: ["No: it is sensitive current data that can become stale quickly", "Yes, it is an ideal cache hit", "Yes, with threshold 0.5", "Yes, without a tenant ID"], correctIndex: 0, explanationUk: "Свіжий стан — живий запит.", explanationEn: "Fresh state is a live query." },
          { kind: "mcq", promptUk: "Двоє працівників одного орендаря мають різні права. Чи достатньо tenant_id, щоб повернути кешовану відповідь?", promptEn: "Two employees in one tenant have different permissions. Is tenant_id enough to return a cached answer?", options: ["Ні: обмежте пошук областю доступу й повторно перевірте права перед видачею", "Так: усі працівники одного орендаря мають однакові права", "Так: TTL автоматично перевіряє авторизацію", "Ні: потрібен лише нижчий поріг схожості"], optionsEn: ["No: scope lookup by access rights and recheck authorization before returning", "Yes: everyone in a tenant has identical permissions", "Yes: TTL automatically checks authorization", "No: only a lower similarity threshold is needed"], correctIndex: 0, explanationUk: "Ізоляція орендаря не замінює перевірку прав конкретного користувача.", explanationEn: "Tenant isolation does not replace authorization for the specific user." }
        ],
        whyUk: "Як кешувати схожі питання довідки, не змішавши орендарів і не віддавши застарілий баланс?",
        whyEn: "How do you cache similar help questions without mixing tenants and without serving a stale balance?",
        ideas: [{ labelUk: "tenant у ключі", labelEn: "the tenant in the key", anyOf: ["tenant", "орендар", "ключ", "key", "ізол", "isolat"] }, { labelUk: "поріг і TTL", labelEn: "a threshold and a TTL", anyOf: ["поріг", "threshold", "ttl", "інвалід", "invalid"] }, { labelUk: "не свіжі персональні", labelEn: "not fresh personal data", anyOf: ["баланс", "balance", "персонал", "personal", "свіж", "fresh"] }],
        sampleUk: "Кеш обмежують tenant_id і правами користувача, перевіряють доступ перед видачею, підбирають поріг на парах, ставлять TTL та інвалідацію; баланс беруть із авторизованого актуального джерела.",
        sampleEn: "Scope the cache by tenant_id and user permissions, recheck access before delivery, tune the threshold on pairs, and use TTL and invalidation; fetch a balance from an authorized current source.",
      },
      {
        slug: "lo-slo-llm",
        titleUk: "SLO для LLM: не лише uptime, а латентність, валідна схема й бюджет помилок",
        titleEn: "An SLO for an LLM: not only uptime, but latency, a valid schema, and an error budget",
        difficulty: 3,
        pointsUk: ["SLO: латентність, схема, помилки — з бюджетом", "Fallback і таймаут заплановані", "Якість — на вибірці, не розмита обіцянка"],
        pointsEn: ["An SLO: latency, schema, errors — with a budget", "A fallback and a timeout are planned", "Quality is on a sample, not a vague promise"],
        conceptUk: "Для кожного SLO визначте події в чисельнику й знаменнику, поріг, вікно та винятки: наприклад, частку запитів із валідною схемою за 30 днів. p95 латентності й помилки доповнюють оцінкою якості на вибірці з відомими обмеженнями. Політика бюджету помилок визначає реакцію на вичерпання. Fallback теж має відповідати правам, приватності й вимогам якості; якщо безпечної альтернативи немає, повідомте про недоступність. Тайм-аут не доводить, що попередня зовнішня операція не виконалась.",
        conceptEn: "For each SLO define numerator and denominator events, target, window, and exclusions: for example, the fraction of requests with a valid schema over 30 days. Supplement p95 latency and errors with a quality sample whose limits are known. An error-budget policy determines the response to exhaustion. A fallback must also meet authorization, privacy, and quality requirements; if no safe alternative exists, report unavailability. A timeout does not prove a previous external action did not execute.",
        code: "# Example targets for eligible requests over a 30-day window\n# p95 latency < 4s; schema-valid >= 99%; timeout or 5xx < 0.5%\n# On budget exhaustion: pause risky releases under the response policy.",
        language: "text",
        retrieval: [
          { kind: "mcq", promptUk: "Яке формулювання ближче до операційного SLO?", promptEn: "Which wording is closer to an operational SLO?", options: ["p95 complete < 4s, schema-valid ≥ 99%, 5xx < 0.5% за 30 днів", "відповіді завжди геніальні", "модель ніколи не помиляється у фактах без вибірки", "uptime провайдера = наш SLO без таймауту"], optionsEn: ["p95 completion under 4s, schema-valid at least 99%, and 5xx under 0.5% over 30 days", "Answers are always brilliant", "The model never makes factual mistakes without a sample", "Provider uptime alone is our SLO without client timeouts"], correctIndex: 0, explanationUk: "Вимірювані пороги.", explanationEn: "Measurable thresholds." },
          { kind: "fill", promptUk: "Допишіть перевірений запасний шлях для запиту без побічних дій; якщо він не дозволений, повідомте про недоступність", promptEn: "Fill in the approved fallback for a request without side effects; report unavailability if it is not permitted", language: "python", code: "try:\n    return large.complete(req, timeout=4)\nexcept Timeout:\n    if not fallback_allowed(req):\n        raise ServiceUnavailable()\n    return ___.complete(req)", accepted: ["fallback"], caseSensitive: true, explanationUk: "Fallback має відповідати правам, політиці даних і вимогам якості; таймаут не доводить відсутності попереднього результату.", explanationEn: "The fallback must meet authorization, data policy, and quality requirements; a timeout does not prove the previous call had no result." },
          { kind: "read", promptUk: "Чи варто зупиняти релізи промптів, якщо бюджет помилок схеми вичерпано?", promptEn: "Should you stop prompt releases if the schema-error budget is exhausted?", language: "yaml", code: "slo: schema_valid: 99%\nbudget: exhausted", options: ["так: спочатку стабілізувати, нові ризиковані релізи почекають", "ні, бюджет лише для краси дашборда", "ні, треба прискорити канарейки", "бюджет не стосується схеми"], optionsEn: ["Pause risky releases under the policy and stabilize first", "No, the budget is only dashboard decoration", "No, accelerate canaries", "Budgets cannot apply to schemas"], correctIndex: 0, explanationUk: "Бюджет керує темпом змін.", explanationEn: "The budget governs the pace of change." }
        ],
        whyUk: "Які три вимірювані обіцянки варто дати сапорт-боту з JSON-інструментами?",
        whyEn: "Which three measurable promises should you give a support bot with JSON tools?",
        ideas: [{ labelUk: "латентність", labelEn: "latency", anyOf: ["p95", "латент", "latency", "секунд", "second"] }, { labelUk: "валідна схема", labelEn: "a valid schema", anyOf: ["схем", "schema", "json", "валід", "valid"] }, { labelUk: "бюджет і fallback", labelEn: "a budget and a fallback", anyOf: ["бюджет", "budget", "fallback", "таймаут", "timeout", "5xx"] }],
        sampleUk: "Ставлять SLO на p95 латентності, частку валідної схеми й помилок, керують бюджетом (зупиняють ризиковані релізи), планують таймаут і fallback; розмита обіцянка 'завжди ідеальний факт' без вибірки — не операційна метрика.",
        sampleEn: "You set an SLO on p95 latency, the valid-schema fraction, and errors, you manage a budget (you pause risky releases), you plan a timeout and a fallback; a vague 'always a perfect fact' promise with no sample is not an operational metric.",
      }
    ],
    "Контрольна: кеш і SLO",
    "Exam: cache and SLOs",
    [
      { promptUk: "Семантичний кеш без tenant_id…", promptEn: "A semantic cache without a tenant_id can…", options: ["віддати дані іншого орендаря", "лише прискорити безпечно завжди", "вимкнути TTL", "замінити SLO"], optionsEn: ["Return another tenant's data", "Always accelerate safely", "Disable TTL", "Replace an SLO"], correctIndex: 0, explanationUk: "Ізоляція в ключі.", explanationEn: "Isolation in the key." },
      { promptUk: "Баланс рахунку в семантичному кеші на добу…", promptEn: "An account balance in a semantic cache for a day is…", options: ["погана ідея: свіжі персональні дані", "ідеальний hit", "заміна TTL", "обов'язкова канарейка"], optionsEn: ["A poor choice for sensitive and frequently changing data", "An ideal cache hit", "A replacement for TTL", "A mandatory canary"], correctIndex: 0, explanationUk: "Не кешувати свіжий стан.", explanationEn: "Do not cache fresh state." },
      { promptUk: "Поріг схожості підбирають…", promptEn: "The similarity threshold is tuned…", options: ["на наборі пар, не на око", "завжди 0.5", "випадково в проді", "за uptime провайдера"], optionsEn: ["On a labeled set of pairs, not by intuition", "Always to 0.5", "Randomly in production", "Using provider uptime"], correctIndex: 0, explanationUk: "Інакше помилкові hit.", explanationEn: "Otherwise false hits." },
      { promptUk: "Операційний SLO ближчий до…", promptEn: "An operational SLO is closer to…", options: ["p95, частка схеми, 5xx з бюджетом", "'завжди геніальні відповіді'", "uptime лише провайдера", "кількості промптів у git"], optionsEn: ["p95, schema-valid fraction, and 5xx with an error budget", "Always brilliant answers", "Only provider uptime", "The number of prompts in Git"], correctIndex: 0, explanationUk: "Вимірювані пороги.", explanationEn: "Measurable thresholds." },
      { promptUk: "Вичерпаний бюджет помилок схеми…", promptEn: "An exhausted schema-error budget means…", options: ["зупинити ризиковані релізи, стабілізувати", "прискорити випуски", "вимкнути fallback", "прибрати таймаут"], optionsEn: ["Pause risky releases under the policy and stabilize", "Accelerate releases", "Disable fallback", "Remove timeouts"], correctIndex: 0, explanationUk: "Бюджет керує темпом.", explanationEn: "The budget governs pace." },
      { promptUk: "Як спланувати реакцію на таймаут великої моделі?", promptEn: "How should a large-model timeout be handled by design?", options: ["Передбачити безпечний дозволений fallback або явно повідомити про недоступність", "Завжди викликати будь-яку меншу модель без перевірки прав", "Замінити таймаут канарейкою", "Вважати, що попередній виклик точно не відбувся"], optionsEn: ["Plan a safe, authorized fallback or an explicit unavailable state", "Always call any smaller model without checking permissions", "Replace the timeout with a canary", "Assume the previous call definitely did not occur"], correctIndex: 0, explanationUk: "Запасний шлях має відповідати політиці; іноді безпечної альтернативи немає.", explanationEn: "The fallback must satisfy policy; sometimes no safe alternative exists." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandLlmops(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
