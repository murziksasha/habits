import type { CourseContent, LessonContent, UnitContent } from "../types.js";
import { expandCourse, sectionUnit, teachLesson } from "./factory.js";

export const newUnits: UnitContent[] = [
  sectionUnit(
    "as_data_residency",
    "Резидентність даних і що їде до провайдера",
    "Data residency and what goes to the provider",
    [
      {
        slug: "as-residency-map",
        titleUk: "Карта потоків: які поля взагалі не повинні потрапити в промпт",
        titleEn: "A flow map: which fields must not enter the prompt at all",
        difficulty: 3,
        pointsUk: ["Карта потоків і мінімізація в промпті", "DPA й регіон не замінюють заборону полів", "Шлюз відхиляє заборонене; псевдоніми у вас"],
        pointsEn: ["A flow map and minimisation in the prompt", "A DPA and a region do not replace a field ban", "The gateway rejects the forbidden; pseudonyms stay with you"],
        conceptUk: "Перш ніж підключити модель, малюють, які дані куди йдуть: промпт, логи, трейси, провайдер, регіон, термін зберігання. Спеціальні категорії (здоров'я, фінанси, документи, що ідентифікують) часто не можна надсилати в зовнішній API без договору, DPA й регіону. Мінімізація: у промпт — лише потрібний уривок, не весь файл. Псевдонімізація до виклику й зворотна карта лише на вашому боці. Регіон ендпоінту (EU) не рівний 'провайдер нічого не тренує' — читайте договір і налаштування retention. Тест: намагаються надіслати заборонене поле — шлюз відхиляє.",
        conceptEn: "Before you connect a model, you draw which data goes where: the prompt, logs, traces, the provider, the region, the retention period. Special categories (health, finance, identifying documents) often cannot be sent to an external API without a contract, a DPA, and a region. Minimisation: the prompt gets only the needed excerpt, not the whole file. Pseudonymisation before the call, and the reverse map only on your side. An EU endpoint region is not the same as 'the provider will not train on this' — read the contract and the retention settings. A test: an attempt to send a forbidden field is rejected by the gateway.",
        code: "gateway.deny(fields=['passport', 'full_medical_record'])\nprompt = excerpt(note, allow=['symptom_summary'])  # after DPA + region check",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чому ендпоінт у ЄС сам по собі не закриває питання тренування на ваших промптах?", promptEn: "Why does an EU endpoint by itself not close the question of training on your prompts?", options: ["регіон ≠ політика використання; потрібні договір, DPA й вимкнений train-на-даних", "у ЄС завжди дозволено будь-що", "регіон замінює мінімізацію", "DPA забороняє карти потоків"], correctIndex: 0, explanationUk: "Регіон, договір і мінімізація — різні контролі.", explanationEn: "Region, contract, and minimisation are different controls." },
          { kind: "fill", promptUk: "Допишіть документ із провайдером про обробку даних", promptEn: "Fill in the document with the provider about data processing", language: "bash", code: "# legal: signed ___ before sending health excerpts", accepted: ["DPA", "dpa", "DPA/DPA"], caseSensitive: true, explanationUk: "Data Processing Agreement.", explanationEn: "A Data Processing Agreement." },
          { kind: "read", promptUk: "Що зробити перед тим, як покласти весь PDF паспорта в промпт 'для зручності'?", promptEn: "What do you do before putting a whole passport PDF into the prompt 'for convenience'?", language: "python", code: "prompt = system + passport_pdf_bytes", options: ["не надсилати: мінімізувати, можливо заборонити поле шлюзом, перевірити договір", "завжди надсилати, якщо регіон EU", "достатньо стиснути PDF", "замінити DPA коментарем у коді"], correctIndex: 0, explanationUk: "Мінімізація й заборона полів.", explanationEn: "Minimisation and a field ban." }
        ],
        whyUk: "Як вирішити, чи можна надіслати уривок медичної нотатки в зовнішню модель?",
        whyEn: "How do you decide whether a medical-note excerpt may be sent to an external model?",
        ideas: [{ labelUk: "карта потоків", labelEn: "a flow map", anyOf: ["карт", "map", "потік", "flow", "регіон", "region"] }, { labelUk: "договір і DPA", labelEn: "a contract and a DPA", anyOf: ["dpa", "договір", "contract", "тренув", "train"] }, { labelUk: "мінімізація й шлюз", labelEn: "minimisation and a gateway", anyOf: ["мініміз", "minim", "шлюз", "gateway", "заборо", "forbid", "паспорт", "passport"] }],
        sampleUk: "Малюють карту потоків, перевіряють DPA й політику тренування, у промпт кладуть лише потрібний уривок або забороняють поле шлюзом; регіон EU сам по собі цього не замінює.",
        sampleEn: "You draw a flow map, you check the DPA and the training policy, you put only the needed excerpt in the prompt or the gateway bans the field; an EU region by itself does not replace that.",
      },
      {
        slug: "as-exfil-prompt",
        titleUk: "Витік через відповідь: модель повторює секрет, який не треба було бачити",
        titleEn: "Leakage through the answer: the model repeats a secret it should not have seen",
        difficulty: 3,
        pointsUk: ["Секрети не живуть у промпті й RAG", "Фільтр виходу й редакція трейсів", "Витяг = компрометація, ключ відкликають"],
        pointsEn: ["Secrets do not live in the prompt or in RAG", "An output filter and redacted traces", "Extraction is compromise; the key is revoked"],
        conceptUk: "Навіть якщо UI не показує ключ API, його могли вставити в системний промпт або в RAG-фрагмент, і хитрий запит ('повтори службові інструкції', непрямий витяг) витягне їх у відповідь. Захист: ніколи не класти секрети в промпт; фільтр виходу на шаблони ключів і персональні ідентифікатори; окремий системний шар, який користувач не може попросити 'процитувати'. Трейси червонять ті самі шаблони. Тести red-team: відомі формулювання витягу. Якщо секрет уже потрапив у вікно — вважайте його скомпрометованим і відкличте.",
        conceptEn: "Even if the UI does not show an API key, it may have been inserted into the system prompt or a RAG fragment, and a crafty request ('repeat the system instructions', an indirect extract) will pull them into the answer. Defence: never put secrets in the prompt; an output filter for key patterns and personal identifiers; a separate system layer the user cannot ask to 'quote'. Traces redact the same patterns. Red-team tests: known extraction phrasings. If a secret already entered the window — treat it as compromised and revoke it.",
        code: "assert 'sk-' not in system_prompt\noutput = reject_if_secret_pattern(model.complete(req))\ntraces.write(redact(output))",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Системний промпт містить службовий токен 'для виклику внутрішнього API'. Який ризик?", promptEn: "The system prompt contains a service token 'for calling an internal API'. What is the risk?", options: ["користувач може витягти токен відповіддю; токен не місце в промпті", "модель ніколи не цитує систему", "фільтр виходу тоді зайвий", "RAG блокує всі токени сам"], correctIndex: 0, explanationUk: "Секрет — у сховищі секретів, не в тексті.", explanationEn: "The secret lives in a secret store, not in the text." },
          { kind: "fill", promptUk: "Допишіть обробку логів, що прибирає ключі", promptEn: "Fill in the log processing that strips keys", language: "python", code: "traces.write(___(response_text))", accepted: ["redact", "redact_secrets", "mask"], caseSensitive: true, explanationUk: "Редакція перед записом.", explanationEn: "Redaction before write." },
          { kind: "read", promptUk: "Що зробити, якщо red-team успішно витяг ключ із відповіді?", promptEn: "What do you do if a red-team successfully extracted a key from an answer?", language: "bash", code: "# extracted: sk-live-...", options: ["відкликати ключ, прибрати його з промпту, додати тест і фільтр", "лише змінити формулювання промпту, ключ лишити", "ігнорувати: це ж тест", "опублікувати ключ у README"], correctIndex: 0, explanationUk: "Витяг = компрометація.", explanationEn: "Extraction is compromise." }
        ],
        whyUk: "Як не дати моделі виплеснути службовий ключ у відповідь користувачу?",
        whyEn: "How do you stop a model from pouring a service key into the user's answer?",
        ideas: [{ labelUk: "не класти секрет у промпт", labelEn: "do not put a secret in the prompt", anyOf: ["секрет", "secret", "промпт", "prompt", "rag", "токен", "token"] }, { labelUk: "фільтр виходу", labelEn: "an output filter", anyOf: ["фільтр", "filter", "виход", "output", "шаблон", "pattern"] }, { labelUk: "відкликати після витягу", labelEn: "revoke after extraction", anyOf: ["відклик", "revok", "redact", "red-team", "компромет", "compromis"] }],
        sampleUk: "Секрети не кладуть у промпт і RAG, відповідь і трейси фільтрують, тести намагаються витягти інструкції; якщо ключ витік — його відкликають і вважають скомпрометованим.",
        sampleEn: "You do not put secrets in the prompt or in RAG, you filter the answer and the traces, tests try to extract instructions; if a key leaked — you revoke it and treat it as compromised.",
      }
    ],
    "Контрольна: дані й витоки",
    "Exam: data and leaks",
    [
      { promptUk: "Регіон EU ендпоінту сам по собі…", promptEn: "An EU endpoint region by itself…", options: ["не замінює DPA, політику тренування й мінімізацію", "дозволяє будь-які паспорти в промпті", "вимикає шлюз", "забороняє карту потоків"], correctIndex: 0, explanationUk: "Кілька контролів разом.", explanationEn: "Several controls together." },
      { promptUk: "Весь PDF паспорта в промпт 'для зручності'…", promptEn: "A whole passport PDF in the prompt 'for convenience' is…", options: ["порушення мінімізації, часто заборона", "рекомендована практика", "заміна DPA", "безпечно в будь-якому регіоні"], correctIndex: 0, explanationUk: "Лише потрібний уривок або відмова.", explanationEn: "Only the needed excerpt, or a refusal." },
      { promptUk: "Шлюз на заборонені поля…", promptEn: "A gateway on forbidden fields…", options: ["відхиляє відправку до моделі", "лише логує після витоку", "замінює договір завжди", "шифрує паспорт у відповіді користувача"], correctIndex: 0, explanationUk: "Контроль до виклику.", explanationEn: "A control before the call." },
      { promptUk: "Службовий токен у системному промпті…", promptEn: "A service token in the system prompt is…", options: ["ризик витягу відповіддю", "найкращий секрет-сховище", "невидимий для моделі завжди", "заміна фільтра"], correctIndex: 0, explanationUk: "Секрети — не в тексті.", explanationEn: "Secrets are not in the text." },
      { promptUk: "Успішний витяг ключа в red-team…", promptEn: "A successful key extract in a red-team is…", options: ["компрометація: ключ відкликають", "лише цікавий звіт без дій", "доказ, що фільтр зайвий", "привід залишити ключ"], correctIndex: 0, explanationUk: "Відкликання обов'язкове.", explanationEn: "Revocation is mandatory." },
      { promptUk: "Трейси без редакції секретів…", promptEn: "Traces without secret redaction are…", options: ["друга поверхня витоку", "безпечніші за промпт завжди", "заміна шлюзу", "вимога DPA до логування всього"], correctIndex: 0, explanationUk: "Редакція перед записом.", explanationEn: "Redaction before write." }
    ],
  ),
  sectionUnit(
    "as_jailbreak_evals",
    "Оцінка відмов: джейлбрейк як регресійний набір",
    "Refusal evaluation: jailbreaks as a regression set",
    [
      {
        slug: "as-jailbreak-set",
        titleUk: "Набір атак живе в CI: нова версія промпту не повинна здати відоме обходження",
        titleEn: "An attack set lives in CI: a new prompt version must not fail a known bypass",
        difficulty: 3,
        pointsUk: ["Версіонований набір атак у CI", "Непрямі атаки в RAG теж", "Міряйте overblock, набір не світіть публічно весь"],
        pointsEn: ["A versioned attack set in CI", "Indirect RAG attacks too", "Measure overblock; do not publish the whole set"],
        conceptUk: "Джейлбрейки (рольові ігри, 'ігноруй інструкції', кодування, багатокрокові обходи) з'являються знову на нових моделях. Тримають версіонований набір промптів-атак і очікувану відмову або безпечну поведінку. Гейті CI падає, якщо частка успішних обходів зросла. Набір не публікують повністю в відкритий README продукту (не робимо шпаргалку), але внутрішня копія й процес додавання після інциденту обов'язкові. Оцінка має включати непрямі атаки (шкідливі інструкції в документі RAG), не лише прямий чат. Помилкові відмови (overblock) теж міряють — інакше продукт стане німим.",
        conceptEn: "Jailbreaks (role play, 'ignore the instructions', encoding, multi-step bypasses) reappear on new models. You keep a versioned set of attack prompts and an expected refusal or safe behaviour. The CI gate fails if the fraction of successful bypasses rose. You do not publish the full set in a public product README (we are not making a cheat sheet), but an internal copy and a process to add cases after an incident are mandatory. The eval should include indirect attacks (harmful instructions in a RAG document), not only direct chat. False refusals (overblock) are measured too — otherwise the product goes mute.",
        code: "ci: jailbreak_success <= 2% AND overblock <= 5%\n# include RAG-indirect cases; add incident prompts internally",
        language: "yaml",
        retrieval: [
          { kind: "mcq", promptUk: "Чому гейті якості без jailbreak-набору недостатній для безпечного релізу?", promptEn: "Why is a quality gate without a jailbreak set not enough for a safe release?", options: ["корисні метрики можуть зрости, а відомі обходи знову пройти", "джейлбрейки не повторюються ніколи", "CI не вміє промпти", "overblock тоді неможливий"], correctIndex: 0, explanationUk: "Безпека — окремий поріг.", explanationEn: "Safety is a separate threshold." },
          { kind: "fill", promptUk: "Допишіть метрику зайвих відмов на безпечних запитах", promptEn: "Fill in the metric of extra refusals on safe questions", language: "yaml", code: "gates:\n  jailbreak_success_max: 0.02\n  ___max: 0.05   # false refusals", accepted: ["overblock_", "overblock"], caseSensitive: true, explanationUk: "Overblock — хибні відмови.", explanationEn: "Overblock is false refusals." },
          { kind: "read", promptUk: "Яку атаку додати, крім прямого 'ігноруй правила' в чаті?", promptEn: "Which attack should you add besides a direct 'ignore the rules' in chat?", language: "python", code: "# user: summarize this file\n# file contains hidden instructions", options: ["непряму ін'єкцію в документі RAG або вкладенні", "лише ті самі прямі фрази ще раз", "видалити всі атаки з CI", "опублікувати повний набір у маркетинг"], correctIndex: 0, explanationUk: "Непрямий шлях теж перевіряють.", explanationEn: "The indirect path is tested too." }
        ],
        whyUk: "Як не випустити новий промпт, що знову піддається вже відомому обходу?",
        whyEn: "How do you avoid releasing a new prompt that falls for a already-known bypass again?",
        ideas: [{ labelUk: "набір у CI", labelEn: "a set in CI", anyOf: ["набір", "set", "jailbreak", "ci", "гейті", "gate"] }, { labelUk: "непрямі атаки", labelEn: "indirect attacks", anyOf: ["непрям", "indirect", "rag", "документ", "document"] }, { labelUk: "overblock і не світити все", labelEn: "overblock and do not publish everything", anyOf: ["overblock", "відмов", "refusal", "публіч", "public"] }],
        sampleUk: "Тримають внутрішній версіонований набір прямих і непрямих атак як гейт CI, міряють і успіх обходу, і зайві відмови, після інциденту додають кейс і не публікують повну шпаргалку.",
        sampleEn: "You keep an internal versioned set of direct and indirect attacks as a CI gate, you measure both bypass success and extra refusals, you add a case after an incident, and you do not publish a full cheat sheet.",
      },
      {
        slug: "as-model-supply",
        titleUk: "Ланцюг моделі: звідки ваги, який хеш, хто має право підмінити файл",
        titleEn: "The model supply chain: where the weights are from, which hash, who may replace the file",
        difficulty: 3,
        pointsUk: ["Хеш і джерело ваг перевіряють у проді", "Запис у сховище — з журналом", "Оновлення ваг — реліз із відкатом; дані тюну теж довіра"],
        pointsEn: ["The hash and source of the weights are checked in prod", "Writes to the store are logged", "A weight update is a release with a rollback; tune data is also trust"],
        conceptUk: "Локальна чи fine-tuned модель — це файл ваг. Підміна ваг (на реєстрі, на диску інференсу) може вбудувати бекдор. Фіксують джерело, хеш, підпис, ревізію; завантаження в прод порівнює хеш. Доступ на запис до сховища ваг — обмежений і з журналом. Fine-tune на неперевірених даних теж ланцюг постачання: отруєні приклади змінюють поведінку. Не тягніть 'популярний чекпоінт' з невідомого диска. Картка моделі (model card) і ліцензія входять у реліз. Оновлення ваг — як реліз сервісу, з канарейкою й відкатом на попередній хеш.",
        conceptEn: "A local or fine-tuned model is a weights file. Substituting the weights (on a registry, on the inference disk) can plant a backdoor. You pin the source, a hash, a signature, a revision; a prod download checks the hash. Write access to the weight store is limited and logged. A fine-tune on unverified data is also a supply chain: poisoned examples change behaviour. Do not pull a 'popular checkpoint' from an unknown disk. The model card and the license are part of the release. A weight update is like a service release, with a canary and a rollback to the previous hash.",
        code: "deploy --artifact model.safetensors --sha256 $EXPECTED --canary 5%\n# rollback: previous sha256",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Що зробити перед тим, як інференс-сервер завантажить нові ваги з реєстру?", promptEn: "What do you do before an inference server loads new weights from a registry?", options: ["перевірити хеш/підпис проти очікуваної ревізії", "довіритись імені тегу latest", "дозволити всім писати в бакет", "пропустити model card"], correctIndex: 0, explanationUk: "Цілісність артефакту.", explanationEn: "Integrity of the artifact." },
          { kind: "fill", promptUk: "Допишіть перевірку цілісності ваг", promptEn: "Fill in the integrity check of the weights", language: "bash", code: "echo \"$EXPECTED  model.safetensors\" | sha256___ -c", accepted: ["sum"], caseSensitive: true, explanationUk: "sha256sum -c звіряє хеш.", explanationEn: "sha256sum -c verifies the hash." },
          { kind: "read", promptUk: "Чим небезпечний fine-tune на 'злитий з інтернету' корпус без перевірки?", promptEn: "Why is a fine-tune on a 'scraped from the internet' corpus without review dangerous?", language: "python", code: "train(base, data='random_dump.jsonl')", options: ["отруєні приклади можуть змінити відмови й факти; дані — частина ланцюга", "інтернет-корпус завжди чистий", "хеш ваг тоді не потрібний", "ліцензія завжди дозволяє все"], correctIndex: 0, explanationUk: "Дані тюну — теж постачання.", explanationEn: "Tune data is also supply." }
        ],
        whyUk: "Як упевнитись, що в проді крутяться саме ті ваги, які ви зібрали, а не підмінений файл?",
        whyEn: "How do you make sure prod is running exactly the weights you built, not a substituted file?",
        ideas: [{ labelUk: "хеш і підпис", labelEn: "a hash and a signature", anyOf: ["хеш", "hash", "підпис", "sign", "ревіз", "revision"] }, { labelUk: "обмежений запис", labelEn: "limited writes", anyOf: ["запис", "write", "журнал", "log", "сховищ", "store"] }, { labelUk: "реліз і дані тюну", labelEn: "a release and tune data", anyOf: ["канарейк", "canary", "відкат", "rollback", "отруєн", "poison", "дані", "data"] }],
        sampleUk: "Ваги пінять хешем і джерелом, прод звіряє цілісність, запис у сховище обмежений, оновлення йде як реліз із відкатом; дані fine-tune теж перевіряють, бо отруєння — частина ланцюга.",
        sampleEn: "You pin the weights with a hash and a source, prod checks integrity, writes to the store are limited, an update is a release with a rollback; you also review fine-tune data, because poisoning is part of the chain.",
      }
    ],
    "Контрольна: джейлбрейк і ваги",
    "Exam: jailbreaks and weights",
    [
      { promptUk: "Jailbreak-набір у CI потрібен, щоб…", promptEn: "A jailbreak set in CI is there so…", options: ["нова версія не пропустила відомий обхід", "опублікувати шпаргалку", "прибрати overblock з метрик", "замінити хеш ваг"], correctIndex: 0, explanationUk: "Регресія безпеки.", explanationEn: "A safety regression." },
      { promptUk: "Непряма атака в RAG…", promptEn: "An indirect attack in RAG should be…", options: ["частиною набору, не лише прямий чат", "проігнорована", "єдиним публічним README", "заміною overblock"], correctIndex: 0, explanationUk: "Документ теж вектор.", explanationEn: "The document is a vector too." },
      { promptUk: "Overblock міряють, бо…", promptEn: "Overblock is measured because…", options: ["інакше продукт стане німим від зайвих відмов", "це єдиний гейт безпеки", "він замінює CI", "він рівний jailbreak_success"], correctIndex: 0, explanationUk: "Баланс відмов.", explanationEn: "A balance of refusals." },
      { promptUk: "Завантаження ваг у прод без звірки хеша…", promptEn: "Loading weights into prod without a hash check is…", options: ["ризик підміни й бекдора", "достатньо імені latest", "вимога model card лише", "заміна канарейки"], correctIndex: 0, explanationUk: "Цілісність артефакту.", explanationEn: "Artifact integrity." },
      { promptUk: "Fine-tune на неперевіреному корпусі…", promptEn: "A fine-tune on an unverified corpus is…", options: ["ризик отруєння поведінки", "завжди безпечний", "заміна підпису ваг", "єдиний спосіб відкату"], correctIndex: 0, explanationUk: "Дані — ланцюг постачання.", explanationEn: "Data is a supply chain." },
      { promptUk: "Оновлення ваг проводять як…", promptEn: "A weight update is done as…", options: ["реліз із канарейкою й відкатом на попередній хеш", "тиху підміну файлу на диску", "latest без журналу", "публікацію атак у README"], correctIndex: 0, explanationUk: "Як реліз сервісу.", explanationEn: "Like a service release." }
    ],
  ),
  sectionUnit(
    "as_log_redaction",
    "Логи, трейси й право на забуття в AI-системах",
    "Logs, traces, and the right to be forgotten in AI systems",
    [
      {
        slug: "as-trace-minimize",
        titleUk: "Трейс не є дампом промпту за замовчуванням",
        titleEn: "A trace is not a prompt dump by default",
        difficulty: 3,
        pointsUk: ["За замовчуванням мінімальний трейс і редакція", "Повний дамп — debug, короткий TTL, роль", "Retention не вічний"],
        pointsEn: ["By default a minimal trace and redaction", "A full dump is debug, a short TTL, a role", "Retention is not eternal"],
        conceptUk: "Повний промпт і повна відповідь у трейсі зручні для дебагу й небезпечні як сховище персональних даних. За замовчуванням — мінімум: id промпту, хеш входу, розмір, коди інструментів, редакція секретів і PII. Повний запис — лише в захищеному debug-режимі з коротким TTL і доступом за роллю. Виробничі дашборди не показують сирий текст користувача всім інженерам. Політика retention узгоджується з юридичною (дні, не 'вічно для аналітики'). Тест: у звичайному трейсі немає номера телефону з фікстури.",
        conceptEn: "A full prompt and a full answer in the trace are convenient for debugging and dangerous as a store of personal data. By default — a minimum: the prompt id, an input hash, size, tool codes, redaction of secrets and PII. A full record is only in a protected debug mode with a short TTL and role-based access. Production dashboards do not show raw user text to every engineer. The retention policy agrees with legal (days, not 'forever for analytics'). A test: a normal trace does not contain the phone number from the fixture.",
        code: "default_trace = {prompt_id, input_hash, tokens, tools, pii: 'redacted'}\n# debug_full: TTL 24h, role=support_debug, access logged",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Хто повинен бачити сирий текст звернення клієнта в проді?", promptEn: "Who should see the raw text of a customer message in prod?", options: ["лише ролі з потребою й аудитом, не весь Slack інженерів", "будь-хто з дашбордом Grafana", "модель-суддя публічно", "ніхто ніколи, навіть support з тикетом і підставою"], correctIndex: 0, explanationUk: "Найменші права й журнал доступу.", explanationEn: "Least privilege and an access log." },
          { kind: "fill", promptUk: "Допишіть режим повного запису промпту", promptEn: "Fill in the mode that records the full prompt", language: "python", code: "tracer.write(req, mode='___', ttl_hours=24)  # not default", accepted: ["debug", "debug_full"], caseSensitive: true, explanationUk: "Debug з коротким TTL, не default.", explanationEn: "Debug with a short TTL, not default." },
          { kind: "read", promptUk: "Що має лишитись у звичайному трейсі замість повного промпту?", promptEn: "What should remain in a normal trace instead of the full prompt?", language: "json", code: "{ \"prompt_id\": \"s@4\", \"input_hash\": \"…\", \"tokens\": 812, \"pii\": \"redacted\" }", options: ["ідентифікатори, хеш, розмір і редаговані поля, не сирий PII", "повний паспорт 'для зручності'", "секрет API 'на всяк випадок'", "вічне зберігання всього чату"], correctIndex: 0, explanationUk: "Мінімум для розслідування без зайвого тексту.", explanationEn: "A minimum for investigation without extra text." }
        ],
        whyUk: "Який трейс ставити за замовчуванням, щоб дебаг ще був можливий, а PII не розливались?",
        whyEn: "Which trace do you set as the default so debugging is still possible and PII does not spill?",
        ideas: [{ labelUk: "мінімум за замовчуванням", labelEn: "a default minimum", anyOf: ["мінімум", "minimum", "хеш", "hash", "prompt_id", "редакц", "redact"] }, { labelUk: "debug із TTL і роллю", labelEn: "debug with a TTL and a role", anyOf: ["debug", "ttl", "рол", "role", "доступ", "access"] }, { labelUk: "не вічне зберігання", labelEn: "not eternal storage", anyOf: ["retention", "утриман", "вічн", "forever", "pii"] }],
        sampleUk: "За замовчуванням пишуть мінімальний редагований трейс (id, хеш, розмір), повний дамп лише в debug з коротким TTL і роллю, retention обмежений, сирий текст не світять усьому відділу.",
        sampleEn: "By default you write a minimal redacted trace (id, hash, size), a full dump only in debug with a short TTL and a role, retention is limited, and raw text is not shown to the whole department.",
      },
      {
        slug: "as-forget-user",
        titleUk: "Видалити користувача означає прибрати його й із RAG, і з трейсів",
        titleEn: "Deleting a user means removing them from RAG and from traces too",
        difficulty: 3,
        pointsUk: ["Список усіх сховищ AI, не лише users", "Перевірка, що пошук мовчить", "Набори оцінки — без зайвого PII"],
        pointsEn: ["A list of every AI store, not only users", "A check that search is silent", "Eval sets without unnecessary PII"],
        conceptUk: "Право на видалення (або внутрішнє 'закрити акаунт') легко забути в AI-стеку: ембединги в векторній базі, чанки в object storage, трейси, семантичний кеш, офлайн-набори оцінки, файнтюн-корпус. Процедура має список сховищ і перевірку 'після видалення пошук не повертає чанки цієї людини'. Бекапи — з політикою доживання. Офлайн-набори не повинні містити реальні персональні кейси без потреби; краще синтетика або анонімізація. Документуйте строк виконання запиту. Тест інтеграції запускають після процедури, не лише 'DELETE FROM users'.",
        conceptEn: "The right to erasure (or an internal 'close the account') is easy to forget in an AI stack: embeddings in a vector store, chunks in object storage, traces, a semantic cache, offline eval sets, a fine-tune corpus. The procedure has a list of stores and a check 'after deletion, search does not return this person's chunks'. Backups have a residual-lifetime policy. Offline sets should not contain real personal cases without a need; prefer synthetic or anonymised data. Document the time to complete a request. An integration test runs after the procedure, not only 'DELETE FROM users'.",
        code: "erase(user):\n  db.users.delete(user); vectors.drop(tenant, user); cache.drop(user); traces.erase(user)\nassert retrieve(user) == []",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Після DELETE FROM users семантичний пошук все ще знаходить лист клієнта. Що забули?", promptEn: "After DELETE FROM users, semantic search still finds the customer's letter. What was forgotten?", options: ["чанки й ембединги в векторному сховищі (і кеш, трейси)", "нічого: SQL — єдине місце даних", "модель-ваги завжди містять цей лист явно", "бекапи не стосуються права на видалення ніколи"], correctIndex: 0, explanationUk: "AI-сховища в процедурі.", explanationEn: "AI stores are in the procedure." },
          { kind: "fill", promptUk: "Допишіть перевірку після забуття", promptEn: "Fill in the check after erasure", language: "python", code: "assert retrieve(query='лист від '+name, tenant=t) == []  # no ___ left", accepted: ["chunks", "embeddings", "hits"], caseSensitive: true, explanationUk: "Пошук не повертає чанки людини.", explanationEn: "Search does not return the person's chunks." },
          { kind: "read", promptUk: "Чому реальні листи клієнтів у публічному eval-наборі — погана ідея?", promptEn: "Why are real customer letters in a public eval set a bad idea?", language: "json", code: "{ \"input\": \"<real complaint with address>\", \"expect\": \"...\" }", options: ["PII роз'їжджається в копіях набору; беріть синтетику або анонімізацію", "публічний набір завжди безпечний", "DELETE FROM users чистить github сам", "ліцензія моделі замінює згоду"], correctIndex: 0, explanationUk: "Оцінка теж сховище даних.", explanationEn: "Eval is also a data store." }
        ],
        whyUk: "Що входить у 'видалити акаунт' для сапорт-бота з RAG?",
        whyEn: "What is included in 'delete the account' for a support bot with RAG?",
        ideas: [{ labelUk: "усі сховища", labelEn: "every store", anyOf: ["вектор", "vector", "чанки", "chunks", "кеш", "cache", "трейс", "trace", "users"] }, { labelUk: "перевірка пошуку", labelEn: "a search check", anyOf: ["пошук", "retrieve", "порожн", "empty", "тест", "test"] }, { labelUk: "набори без PII", labelEn: "sets without PII", anyOf: ["eval", "синтет", "synthetic", "анонім", "anonym", "бекап", "backup"] }],
        sampleUk: "Процедура чистить users, чанки, ембединги, кеш, трейси й корпуси, потім перевіряє, що пошук нічого не повертає; eval-набори краще синтетичні, бекапи мають строк доживання.",
        sampleEn: "The procedure clears users, chunks, embeddings, the cache, traces, and corpora, then checks that search returns nothing; eval sets are preferably synthetic, and backups have a residual lifetime.",
      }
    ],
    "Контрольна: логи й забуття",
    "Exam: logs and erasure",
    [
      { promptUk: "Повний промпт у звичайному прод-трейсі…", promptEn: "A full prompt in a normal prod trace is…", options: ["зайве сховище PII; за замовчуванням мінімум", "обов'язковий для всіх інженерів", "заміна шлюзу", "вічний retention"], correctIndex: 0, explanationUk: "Мінімальний трейс.", explanationEn: "A minimal trace." },
      { promptUk: "Повний дамп для дебагу…", promptEn: "A full dump for debugging is…", options: ["окремий режим із TTL і роллю", "default для Grafana", "без журналу доступу", "без редакції секретів"], correctIndex: 0, explanationUk: "Коротке життя й доступ.", explanationEn: "A short life and access control." },
      { promptUk: "Сирий текст клієнта на дашборді всіх інженерів…", promptEn: "Raw customer text on every engineer's dashboard is…", options: ["порушення найменших прав", "найкраща спостережуваність", "вимога SLO", "заміна хеша"], correctIndex: 0, explanationUk: "Доступ за потребою.", explanationEn: "Access on a need basis." },
      { promptUk: "DELETE FROM users без очистки векторів…", promptEn: "DELETE FROM users without clearing vectors…", options: ["неповне видалення: пошук ще знайде чанки", "повне виконання права на забуття", "заміна бекапів", "достатній тест"], correctIndex: 0, explanationUk: "Список усіх сховищ.", explanationEn: "A list of every store." },
      { promptUk: "Реальні листи в публічному eval…", promptEn: "Real letters in a public eval are…", options: ["ризик PII; синтетика або анонімізація", "рекомендовані завжди", "чистяться DELETE FROM users на GitHub самі", "заміна TTL трейсів"], correctIndex: 0, explanationUk: "Оцінка — теж сховище.", explanationEn: "Eval is also a store." },
      { promptUk: "Після процедури забуття варто…", promptEn: "After the erasure procedure you should…", options: ["прогнати тест, що retrieve порожній", "лише закрити тікет без перевірки", "опублікувати чанки", "збільшити retention"], correctIndex: 0, explanationUk: "Інтеграційна перевірка.", explanationEn: "An integration check." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandAiSecurity(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
