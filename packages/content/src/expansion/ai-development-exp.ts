import type { CourseContent, LessonContent, UnitContent } from "../types.js";
import { expandCourse, sectionUnit, teachLesson } from "./factory.js";

export const newUnits: UnitContent[] = [
  sectionUnit(
    "ai_structured_output",
    "Структурований вихід: схема, а не вільний текст",
    "Structured output: a schema, not free text",
    [
      {
        slug: "ai-json-schema",
        titleUk: "Просіть JSON за схемою і перевіряйте його, не 'знайди масив у відповіді'",
        titleEn: "Ask for JSON against a schema and validate it, do not 'find an array in the reply'",
        difficulty: 3,
        pointsUk: ["Схема на виході, валідація після відповіді", "Не regex по вільному тексту", "Приклад у промпті збігається зі схемою"],
        pointsEn: ["A schema on the output, validation after the reply", "Not a regex on free text", "The prompt example matches the schema"],
        conceptUk: "Коли асистент має повернути список задач або патч, вільний текст змушує писати крихкий парсер. Structured output / tool calling з JSON Schema фіксує поля, типи й обов'язковість. Після відповіді все одно валідують (зайві поля, порожні рядки). Якщо модель не підтримує жорсткий режим — кілька ретраїв і явна помилка, не regex 'вийми фігурні дужки'. У промпті приклад має збігатись зі схемою; розбіжність ('у прикладі date рядок, у схемі число') породжує сміття. Версію схеми логують разом із відповіддю.",
        conceptEn: "When an assistant must return a task list or a patch, free text forces a fragile parser. Structured output / tool calling with JSON Schema pins fields, types, and requiredness. After the reply you still validate (extra fields, empty strings). If the model has no hard mode — a few retries and an explicit error, not a regex that 'extracts curly braces'. In the prompt the example must match the schema; a mismatch ('in the example date is a string, in the schema a number') produces junk. The schema version is logged with the reply.",
        code: "complete(prompt, response_format={'type':'json_schema', 'schema': TASK_SCHEMA})\nvalidate(reply, TASK_SCHEMA)  # extra='forbid'",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чому 'вийми JSON регуляркою з відповіді-есе' крихко?", promptEn: "Why is 'extract JSON with a regex from an essay reply' fragile?", options: ["модель додасть текст навколо, зламає коми, змінить ключі; схема в API надійніша", "регулярка завжди повніша за схему", "JSON не можна валідувати", "приклади в промпті заборонені"], correctIndex: 0, explanationUk: "Структурований режим + валідація.", explanationEn: "Structured mode plus validation." },
          { kind: "fill", promptUk: "Допишіть, чим описують форму відповіді", promptEn: "Fill in what describes the reply's shape", language: "python", code: "client.complete(prompt, response_format={'type':'json_schema','schema': ___})", accepted: ["TASK_SCHEMA", "schema", "json_schema"], caseSensitive: true, explanationUk: "JSON Schema передають у виклик.", explanationEn: "You pass a JSON Schema into the call." },
          { kind: "read", promptUk: "Що не так, якщо в прикладі промпту due: 'tomorrow', а в схемі due — ISO date?", promptEn: "What is wrong if the prompt example has due: 'tomorrow' but the schema says due is an ISO date?", language: "json", code: "{ \"due\": \"tomorrow\" }  // schema: due: string, format: date\",", options: ["приклад суперечить схемі й провокує невалідний вихід", "це корисно для гнучкості", "схема тоді ігнорується правильно", "regex це виправить завжди"], correctIndex: 0, explanationUk: "Приклад = контракт так само.", explanationEn: "The example is a contract too." }
        ],
        whyUk: "Як змусити асистента повернути список задач, який код зможе прийняти без регулярки?",
        whyEn: "How do you make an assistant return a task list that code can accept without a regex?",
        ideas: [{ labelUk: "JSON Schema", labelEn: "a JSON Schema", anyOf: ["схем", "schema", "structured", "json"] }, { labelUk: "валідація", labelEn: "validation", anyOf: ["валід", "valid", "ретра", "retr", "regex"] }, { labelUk: "узгоджений приклад", labelEn: "a consistent example", anyOf: ["приклад", "example", "версі", "version", "збіг", "match"] }],
        sampleUk: "Викликають structured output зі схемою, валідують відповідь, ретраять при помилці, а приклад у промпті тримають узгодженим зі схемою; регулярка по есе — останній і крихкий шлях.",
        sampleEn: "You call structured output with a schema, you validate the reply, you retry on error, and you keep the prompt example consistent with the schema; a regex on an essay is a last and fragile path.",
      },
      {
        slug: "ai-tool-args",
        titleUk: "Аргументи інструмента — та сама схема: модель не 'видумує' шлях файлу",
        titleEn: "Tool arguments are the same schema: the model does not 'invent' a file path",
        difficulty: 3,
        pointsUk: ["Політика аргументів у коді, не в промпті", "Коротка відмова моделі або стоп циклу", "Тести на шкідливі аргументи"],
        pointsEn: ["The argument policy is in code, not in the prompt", "A short refusal to the model, or a stop of the loop", "Tests on harmful arguments"],
        conceptUk: "Виклик інструмента (запис файлу, HTTP, SQL) приймає лише аргументи, що пройшли схему й політику: шлях у дозволеному корені, URL з allowlist, SQL без кількох операторів. Модель може галюцинувати шлях `/etc/passwd` або чужий id — це має відхилити код, не промпт 'будь ласка, не роби цього'. Пояснення відхилення повертають моделі коротко, щоб вона виправилась, або зупиняють цикл. Лог аргументів без секретів. Тести: навмисно шкідливі аргументи не проходять шлюз навіть при 'впевненому' тоні моделі.",
        conceptEn: "A tool call (writing a file, HTTP, SQL) accepts only arguments that passed a schema and a policy: a path inside an allowed root, a URL from an allowlist, SQL without certain operators. The model can hallucinate the path `/etc/passwd` or someone else's id — that must be rejected by code, not by a prompt that says 'please do not do this'. A short rejection explanation is returned to the model so it can correct itself, or the loop is stopped. Argument logs have no secrets. Tests: deliberately harmful arguments do not pass the gateway even when the model's tone is 'confident'.",
        code: "def write_file(path, body):\n    p = safe(path)  # must be under ALLOWED_ROOT\n    ...",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Модель упевнено просить write_file('/etc/passwd', ...). Що має статись?", promptEn: "The model confidently asks write_file('/etc/passwd', ...). What should happen?", options: ["шлюз відхиляє шлях поза allowlist, навіть якщо тон впевнений", "промпт 'не чіпай passwd' уже достатній", "запис дозволений, бо модель впевнена", "лог зберігає вміст passwd"], correctIndex: 0, explanationUk: "Політика сильніша за тон.", explanationEn: "Policy is stronger than tone." },
          { kind: "fill", promptUk: "Допишіть перевірку шляху перед записом", promptEn: "Fill in the path check before a write", language: "python", code: "assert path.is_relative_to(ALLOWED____)", accepted: ["_ROOT", "ROOT"], caseSensitive: true, explanationUk: "Корінь allowlist.", explanationEn: "An allowlist root." },
          { kind: "read", promptUk: "Чи варто в лог інструмента писати повний Authorization заголовок запиту?", promptEn: "Should the tool log contain the full Authorization header of the request?", language: "python", code: "log.info('http', headers=req.headers)", options: ["ні: секрети редагують; логують метод, хост, статус", "так, завжди зручно для дебагу в спільних логах", "так, схема вимагає заголовки", "так, якщо тон моделі впевнений"], correctIndex: 0, explanationUk: "Лог аргументів без секретів.", explanationEn: "Argument logs without secrets." }
        ],
        whyUk: "Як не дати асистенту-кодеру записати файл за межами репозиторію?",
        whyEn: "How do you stop a coding assistant from writing a file outside the repository?",
        ideas: [{ labelUk: "схема й allowlist", labelEn: "a schema and an allowlist", anyOf: ["схем", "schema", "allowlist", "корінь", "root", "шлях", "path"] }, { labelUk: "код, не промпт", labelEn: "code, not a prompt", anyOf: ["шлюз", "gateway", "політик", "policy", "промпт", "prompt"] }, { labelUk: "відмова або стоп", labelEn: "a refusal or a stop", anyOf: ["відмов", "reject", "стоп", "stop", "тест", "test"] }],
        sampleUk: "Аргументи інструмента валідують схемою й політикою в коді (корінь шляхів, allowlist), шкідливий шлях відхиляють незалежно від тону моделі, коротко пояснюють або зупиняють цикл і не логують секрети.",
        sampleEn: "Tool arguments are validated with a schema and a policy in code (a path root, an allowlist), a harmful path is rejected regardless of the model's tone, you explain briefly or stop the loop, and you do not log secrets.",
      },
      {
        slug: "ai-repair-loop",
        titleUk: "Ремонт невалідного виходу: обмежені спроби й зразок помилки",
        titleEn: "Repairing invalid output: limited attempts and an error sample",
        difficulty: 3,
        pointsUk: ["2–3 ремонти з конкретною помилкою", "Після ліміту — явний збій, не вічний цикл", "Не мовчазні дефолти на змісті"],
        pointsEn: ["2–3 repairs with a concrete error", "After the limit — an explicit failure, not an endless loop", "No silent defaults on meaning"],
        conceptUk: "Перша відповідь часто не проходить схему (зайва кома, не той тип). Цикл ремонту: повернути моделі текст помилки валідатора й попросити виправити, з лімітом спроб (2–3). Після ліміту — явний збій або запасний шлях (людина, простіша схема), не нескінченний цикл. Помилка має бути конкретною ('field due: expected date, got tomorrow'), не 'invalid JSON'. Не підміняйте мовчки значення дефолтами, якщо це змінює зміст (сума рахунку). Лог: скільки ремонтів, яка помилка. Вимірюйте частку відповідей, що проходять з першого разу — це якість промпту й схеми.",
        conceptEn: "The first reply often fails the schema (a trailing comma, a wrong type). A repair loop: return the validator's error text to the model and ask it to fix, with a limit of attempts (2–3). After the limit — an explicit failure or a fallback (a human, a simpler schema), not an endless loop. The error should be concrete ('field due: expected date, got tomorrow'), not 'invalid JSON'. Do not silently substitute defaults if that changes meaning (an invoice total). The log: how many repairs, which error. Measure the fraction of replies that pass first time — that is the quality of the prompt and the schema.",
        code: "for i in range(3):\n    if valid(reply): return reply\n    reply = complete(repair_prompt(validator.errors))\nraise InvalidOutput()",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чому 'invalid JSON' як єдине повідомлення гірше за вказівку на поле due?", promptEn: "Why is 'invalid JSON' as the only message worse than pointing at the due field?", options: ["модель не знає, що саме виправити; конкретне поле прискорює ремонт", "загальна помилка завжди достатня", "поле due не можна називати", "ремонт тоді заборонений"], correctIndex: 0, explanationUk: "Конкретний зворотний зв'язок.", explanationEn: "Concrete feedback." },
          { kind: "fill", promptUk: "Допишіть ліміт циклу ремонту", promptEn: "Fill in the repair-loop limit", language: "python", code: "for attempt in range(___):\n    reply = complete(prompt, error)\n    if valid(reply): break", accepted: ["3", "2"], caseSensitive: true, explanationUk: "Дві-три спроби, не нескінченність.", explanationEn: "Two or three attempts, not infinity." },
          { kind: "read", promptUk: "Чи можна мовчки поставити due=today, якщо поле невалідне, у рахунку клієнту?", promptEn: "May you silently set due=today when the field is invalid, on a customer invoice?", language: "python", code: "if not valid(due): due = date.today()  # silent", options: ["ні, якщо це змінює зміст: краще явний збій або підтвердження", "так, дефолт завжди безпечний", "так, щоб уникнути ремонту", "так, без логу"], correctIndex: 0, explanationUk: "Зміст не підміняють мовчки.", explanationEn: "Meaning is not substituted silently." }
        ],
        whyUk: "Як полагодити невалідний JSON від моделі, не зациклившись і не підмінивши суму?",
        whyEn: "How do you repair invalid JSON from a model without looping forever and without substituting a total?",
        ideas: [{ labelUk: "конкретна помилка", labelEn: "a concrete error", anyOf: ["поле", "field", "помилк", "error", "валідатор", "validator"] }, { labelUk: "ліміт спроб", labelEn: "a limit of attempts", anyOf: ["3", "ліміт", "limit", "цикл", "loop", "збій", "fail"] }, { labelUk: "не мовчазний дефолт", labelEn: "not a silent default", anyOf: ["дефолт", "default", "сум", "total", "зміст", "meaning"] }],
        sampleUk: "Повертають моделі конкретну помилку валідатора, дають 2–3 спроби, після ліміту — явний збій або fallback, і не підставляють мовчки дефолти, що змінюють зміст документа.",
        sampleEn: "You return a concrete validator error to the model, you give 2–3 attempts, after the limit — an explicit failure or a fallback, and you do not silently insert defaults that change the document's meaning.",
      }
    ],
    "Контрольна: структурований вихід",
    "Exam: structured output",
    [
      { promptUk: "Regex по есе замість схеми…", promptEn: "A regex on an essay instead of a schema is…", options: ["крихкий парсер", "надійніший за JSON Schema", "заміна валідації", "обов'язковий приклад"], correctIndex: 0, explanationUk: "Structured output.", explanationEn: "Structured output." },
      { promptUk: "Приклад у промпті, що суперечить схемі…", promptEn: "A prompt example that contradicts the schema…", options: ["провокує невалідний вихід", "корисно для гнучкості", "ігнорується моделлю завжди", "заміна версії"], correctIndex: 0, explanationUk: "Приклад узгоджують.", explanationEn: "The example is aligned." },
      { promptUk: "Шкідливий шлях у write_file має відхилити…", promptEn: "A harmful path in write_file should be rejected by…", options: ["код політики, не лише промпт", "тон моделі", "regex JSON", "лог секретів"], correctIndex: 0, explanationUk: "Шлюз аргументів.", explanationEn: "An argument gateway." },
      { promptUk: "Лог інструмента з Authorization…", promptEn: "A tool log with Authorization is…", options: ["витік; секрети редагують", "корисний default", "вимога схеми", "заміна allowlist"], correctIndex: 0, explanationUk: "Без секретів у логах.", explanationEn: "No secrets in logs." },
      { promptUk: "Ремонт невалідного JSON обмежують…", promptEn: "Repair of invalid JSON is limited to…", options: ["кількома спробами, потім явний збій", "нескінченним циклом", "мовчазним дефолтом суми", "вимкненням схеми"], correctIndex: 0, explanationUk: "Ліміт і конкретна помилка.", explanationEn: "A limit and a concrete error." },
      { promptUk: "Мовчазний дефолт на сумі рахунку…", promptEn: "A silent default on an invoice total is…", options: ["небезпечний: змінює зміст", "завжди правильний ремонт", "заміна валідатора", "обов'язковий після 3 спроб"], correctIndex: 0, explanationUk: "Зміст не підміняють.", explanationEn: "Meaning is not substituted." }
    ],
  ),
  sectionUnit(
    "ai_rag_eval",
    "Оцінка RAG: чи знайшли потрібне і чи не вигадали",
    "Evaluating RAG: whether you found the right thing and did not invent",
    [
      {
        slug: "ai-rag-labels",
        titleUk: "Набір питань із відомими джерелами — основа оцінки пошуку",
        titleEn: "A question set with known sources is the basis of retrieval evaluation",
        difficulty: 3,
        pointsUk: ["Розмічені питання й id чанків", "recall@k для пошуку, факти й відмови для відповіді", "Не лише схожість ембедингів"],
        pointsEn: ["Labelled questions and chunk ids", "recall@k for retrieval, facts and refusals for the answer", "Not only embedding similarity"],
        conceptUk: "Без розміченого набору ви міняєте ембединги 'на око'. Збирають питання, релевантні чанки (id) і очікувану відповідь або відмову, якщо в корпусі немає факту. Метрики пошуку: recall@k (чи потрапив потрібний чанк), MRR. Метрики відповіді: точність фактів, цитата з правильного джерела, відмова коли треба. Набір тримають невеликим, якісним і версіонованим; після інциденту додають кейс. Не оцінюйте лише 'схожість ембедингів між питанням і відповіддю' — це не перевіряє факти.",
        conceptEn: "Without a labelled set you change embeddings 'by eye'. You collect questions, relevant chunks (ids), and an expected answer or a refusal if the corpus has no fact. Retrieval metrics: recall@k (did the needed chunk appear), MRR. Answer metrics: factual accuracy, a citation from the right source, a refusal when needed. The set stays small, high-quality, and versioned; after an incident you add a case. Do not evaluate only 'embedding similarity between the question and the answer' — that does not check facts.",
        code: "eval = [{q, relevant_chunk_ids, expect: answer_or_refuse}]\n# report recall@5, citation_accuracy, refusal_when_empty",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чому cosine(question, answer) як єдина метрика RAG небезпечна?", promptEn: "Why is cosine(question, answer) as the only RAG metric dangerous?", options: ["висока схожість не означає правдивий факт і правильне джерело", "cosine завжди дорівнює recall@k", "ембединги заборонені в оцінці", "відмова тоді автоматично правильна"], correctIndex: 0, explanationUk: "Потрібні факти й джерела.", explanationEn: "You need facts and sources." },
          { kind: "fill", promptUk: "Допишіть метрику 'чи потрібний чанк у топ-k'", promptEn: "Fill in the metric 'is the needed chunk in the top-k'", language: "python", code: "score = ___at_k(relevant_ids, retrieved_ids, k=5)", accepted: ["recall_"], caseSensitive: true, explanationUk: "recall@k.", explanationEn: "recall@k." },
          { kind: "read", promptUk: "Що має бути очікуванням, якщо факту немає в корпусі?", promptEn: "What should the expectation be if the fact is not in the corpus?", language: "json", code: "{ \"q\": \"what is our 2028 tax rate?\", \"docs\": [] }", options: ["відмова або 'немає в базі', не вигадана цифра", "будь-яка впевнена цифра", "порожній cosine", "максимальний MRR"], correctIndex: 0, explanationUk: "Чесна відмова — теж кейс.", explanationEn: "An honest refusal is also a case." }
        ],
        whyUk: "Як оцінити, чи новий ембединг покращив пошук по регламенту, а не лише 'здається краще'?",
        whyEn: "How do you evaluate whether a new embedding improved policy search, not only that it 'feels better'?",
        ideas: [{ labelUk: "розмічений набір", labelEn: "a labelled set", anyOf: ["набір", "set", "чанки", "chunk", "питання", "question"] }, { labelUk: "recall@k", labelEn: "recall@k", anyOf: ["recall", "mrr", "пошук", "retriev"] }, { labelUk: "факти й відмови", labelEn: "facts and refusals", anyOf: ["факт", "fact", "відмов", "refus", "цитат", "citation", "cosine"] }],
        sampleUk: "Тримають версіонований набір питань із id релевантних чанків, міряють recall@k і правильність фактів або відмову, коли факту немає; одна схожість ембедингів фактів не перевіряє.",
        sampleEn: "You keep a versioned question set with relevant chunk ids, you measure recall@k and factual correctness or a refusal when the fact is absent; embedding similarity alone does not check facts.",
      },
      {
        slug: "ai-citation-faith",
        titleUk: "Цитата має вказувати на чанк, який дійсно це каже",
        titleEn: "A citation must point to a chunk that actually says that",
        difficulty: 3,
        pointsUk: ["Кожне твердження підкріплене чанком", "Уривок у UI, не лише номер", "Суддю калібрують; нерелевантний чанк не підтверджує"],
        pointsEn: ["Every claim is backed by a chunk", "An excerpt in the UI, not only a number", "The judge is calibrated; an irrelevant chunk does not support"],
        conceptUk: "Модель часто ставить гарне посилання поряд із вигаданим реченням (недослівна 'вірність'). Оцінка faithfulness: кожне твердження відповіді підтверджується наведеним чанком або позначається як непідтверджене. Автоматичний суддя корисний, але його калібрують на людській вибірці. UI показує уривок, не лише номер документа. Якщо чанків кілька — яке твердження з якого. Забороняйте відповідь 'як у джерелі' без виділеного фрагмента в внутрішньому контракті агента. Регресійні кейси: підсунутий нерелевантний чанк не повинен 'підтверджувати' факт.",
        conceptEn: "A model often places a nice link next to an invented sentence (unfaithful wording). A faithfulness eval: every claim in the answer is supported by the cited chunk, or is marked unsupported. An automatic judge is useful, but you calibrate it on a human sample. The UI shows an excerpt, not only a document number. If there are several chunks — which claim comes from which. Forbid an answer 'as in the source' without a highlighted fragment in the agent's internal contract. Regression cases: a planted irrelevant chunk must not 'support' a fact.",
        code: "for claim, cite in answer:\n    assert chunk_entails(cite.excerpt, claim)\n# UI: show excerpt, not only doc id",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Відповідь каже 'повернення 90 днів', цитата веде на документ, де написано 14 днів. Це…", promptEn: "The answer says '90-day returns', the citation points to a document that says 14 days. This is…", options: ["невірна цитата / невірна вірність, навіть якщо посилання 'існує'", "успіх, бо джерело відкрилось", "recall@k 1.0 автоматично", "проблема лише UI"], correctIndex: 0, explanationUk: "Цитата має підтверджувати твердження.", explanationEn: "The citation must support the claim." },
          { kind: "fill", promptUk: "Допишіть властивість 'твердження підтверджене джерелом'", promptEn: "Fill in the property 'the claim is supported by the source'", language: "python", code: "assert ___fulness(claim, chunk)  # claim entailed by chunk", accepted: ["faith"], caseSensitive: true, explanationUk: "Faithfulness.", explanationEn: "Faithfulness." },
          { kind: "read", promptUk: "Що показати користувачу поруч із твердженням політики?", promptEn: "What do you show the user next to a policy claim?", language: "javascript", code: "render(claim, citation)", options: ["уривок чанка, що це підтверджує, не лише 'Документ 7'", "лише номер без тексту", "весь корпус", "внутрішній системний промпт"], correctIndex: 0, explanationUk: "Уривок можна перевірити очима.", explanationEn: "The excerpt can be checked by eye." }
        ],
        whyUk: "Як перевірити, що відповідь про строк повернення не бреше під виглядом цитати?",
        whyEn: "How do you check that an answer about a return period is not lying behind the appearance of a citation?",
        ideas: [{ labelUk: "вірність тверджень", labelEn: "claim faithfulness", anyOf: ["faith", "тверджен", "claim", "підтверд", "support"] }, { labelUk: "уривок у UI", labelEn: "an excerpt in the UI", anyOf: ["уривок", "excerpt", "цитат", "citation", "документ", "document"] }, { labelUk: "калібрування й пастки", labelEn: "calibration and traps", anyOf: ["калібр", "calibr", "нерелевант", "irrelevant", "регрес", "regress"] }],
        sampleUk: "Кожне твердження звіряють із цитованим чанком (faithfulness), у UI показують уривок, суддю калібрують на людях, а кейс із нерелевантним чанком не повинен підтверджувати вигаданий факт.",
        sampleEn: "You check every claim against the cited chunk (faithfulness), the UI shows an excerpt, you calibrate the judge on humans, and a case with an irrelevant chunk must not support an invented fact.",
      },
      {
        slug: "ai-rag-change",
        titleUk: "Зміна різки, ембединга чи k — експеримент із фіксованим набором",
        titleEn: "A change of splitter, embedding, or k is an experiment on a fixed set",
        difficulty: 3,
        pointsUk: ["Одна зміна за раз на фіксованому наборі", "Дивіться recall і faithfulness разом", "Версія індексу й відкат"],
        pointsEn: ["One change at a time on a fixed set", "Look at recall and faithfulness together", "An index version and a rollback"],
        conceptUk: "Команда часто міняє три речі одразу (модель ембединга, overlap, top-k) і не знає, що допомогло. Одна зміна за раз, той самий набір, таблиця метрик у PR. Зростання recall при падінні faithfulness — не безумовна перемога (більше шуму в контексті). Вартість і латентність теж у таблиці. Після вибору переможця оновлюють прод однією зміною з можливістю відкату (версія індексу). Переіндексація великого корпусу — окремий план (час, сумісність запитів зі старим індексом).",
        conceptEn: "A team often changes three things at once (the embedding model, overlap, top-k) and does not know what helped. One change at a time, the same set, a metrics table in the PR. A recall rise with a faithfulness drop is not an unconditional win (more noise in the context). Cost and latency belong in the table too. After picking a winner, you update prod with one change and a way to roll back (an index version). Reindexing a large corpus is a separate plan (time, query compatibility with the old index).",
        code: "PR table: baseline vs overlap=0.2 | recall@5 | faithfulness | p95 | cost\n# ship with index_vN, keep vN-1 for rollback",
        language: "markdown",
        retrieval: [
          { kind: "mcq", promptUk: "Recall@5 зріс, а частка невірних цитат теж. Чи котити в прод?", promptEn: "Recall@5 rose, and so did the fraction of wrong citations. Do you ship to prod?", options: ["не одразу: більше чанків може додати шум; дивіться faithfulness і якість відповіді", "так, recall — єдина метрика", "так, без таблиці в PR", "так, змінивши ще й модель і k разом"], correctIndex: 0, explanationUk: "Дві метрики разом.", explanationEn: "Both metrics together." },
          { kind: "fill", promptUk: "Допишіть принцип експерименту над RAG", promptEn: "Fill in the principle of a RAG experiment", language: "markdown", code: "Change ___ variable at a time; same eval set; table in the PR", accepted: ["one", "1"], caseSensitive: true, explanationUk: "Одна змінна за раз.", explanationEn: "One variable at a time." },
          { kind: "read", promptUk: "Як відкотити нову модель ембедингів, якщо індекс уже переписаний?", promptEn: "How do you roll back a new embedding model if the index is already rewritten?", language: "bash", code: "index_v12 --model bge-m3   # prod now", options: ["тримати попередню версію індексу (або можливість перезібрати) і перемикати", "неможливо: індекс завжди один", "достатньо змінити k", "відкат заборонений для RAG"], correctIndex: 0, explanationUk: "Версіонуйте індекс.", explanationEn: "Version the index." }
        ],
        whyUk: "Як порівняти новий overlap чанків зі старим, щоб рішення було чесним?",
        whyEn: "How do you compare a new chunk overlap with the old one so the decision is honest?",
        ideas: [{ labelUk: "одна зміна", labelEn: "one change", anyOf: ["одна", "one", "змін", "variable", "overlap"] }, { labelUk: "той самий набір", labelEn: "the same set", anyOf: ["набір", "set", "таблиц", "table", "pr"] }, { labelUk: "recall і faithfulness", labelEn: "recall and faithfulness", anyOf: ["recall", "faith", "відкат", "rollback", "індекс", "index"] }],
        sampleUk: "Міняють лише overlap, ганяють той самий набір, у PR ставлять таблицю recall, faithfulness, вартості й латентності, переможця котять з версією індексу й відкатом; ріст recall при падінні вірності — не автоматичний шип.",
        sampleEn: "You change only overlap, you run the same set, the PR has a table of recall, faithfulness, cost, and latency, you ship the winner with an index version and a rollback; a recall rise with a faithfulness drop is not an automatic ship.",
      }
    ],
    "Контрольна: оцінка RAG",
    "Exam: RAG evaluation",
    [
      { promptUk: "Оцінка RAG без розміченого набору…", promptEn: "A RAG eval without a labelled set is…", options: ["робота на око", "достатній cosine", "заміна recall", "обов'язковий шип"], correctIndex: 0, explanationUk: "Потрібні питання й чанки.", explanationEn: "You need questions and chunks." },
      { promptUk: "cosine(question, answer) не перевіряє…", promptEn: "cosine(question, answer) does not check…", options: ["правдивість факту й джерело", "схожість векторів", "довжину відповіді завжди", "версію індексу"], correctIndex: 0, explanationUk: "Факти окремо.", explanationEn: "Facts are separate." },
      { promptUk: "Якщо факту немає в корпусі, очікують…", promptEn: "If the fact is not in the corpus, you expect…", options: ["відмову, не вигадану цифру", "впевнену галюцинацію", "максимальний MRR", "більший k"], correctIndex: 0, explanationUk: "Чесний кейс відмови.", explanationEn: "An honest refusal case." },
      { promptUk: "Цитата на документ, що каже протилежне…", promptEn: "A citation of a document that says the opposite is…", options: ["порушення faithfulness", "успіх recall", "проблема лише UI", "заміна уривка"], correctIndex: 0, explanationUk: "Твердження має бути підкріплене.", explanationEn: "The claim must be supported." },
      { promptUk: "Три зміни RAG одразу в одному PR…", promptEn: "Three RAG changes at once in one PR…", options: ["не дають зрозуміти, що допомогло", "найкращий експеримент", "заміна набору", "обов'язкові для відкату"], correctIndex: 0, explanationUk: "Одна змінна за раз.", explanationEn: "One variable at a time." },
      { promptUk: "Ріст recall і падіння faithfulness…", promptEn: "A recall rise and a faithfulness drop is…", options: ["не безумовна перемога", "автоматичний прод", "ігнорують латентність", "привід видалити набір"], correctIndex: 0, explanationUk: "Дивіться обидві метрики.", explanationEn: "Look at both metrics." }
    ],
  ),
  sectionUnit(
    "ai_prompt_cache",
    "Кеш префікса промпту й контроль контексту кодера",
    "Prompt-prefix cache and control of a coder's context",
    [
      {
        slug: "ai-prefix-cache",
        titleUk: "Стабільний префікс промпту можна кешувати; хвіст, що стрибає, — ні",
        titleEn: "A stable prompt prefix can be cached; a tail that jumps cannot",
        difficulty: 3,
        pointsUk: ["Стабільний префікс, динаміка в хвості", "Міряйте hit і не кладіть секрети в кеш", "Дрібна правка на початку скидає кеш"],
        pointsEn: ["A stable prefix, dynamics in the tail", "Measure hit and do not put secrets in the cache", "A tiny edit at the start drops the cache"],
        conceptUk: "Провайдери кешують спільний префікс (система + велика інструкція + статичні приклади) і дешевше тарифікують повтор. Для цього префікс має бути байтово стабільним: не вставляйте в початок поточний час, випадковий nonce чи змінний список файлів. Динаміку кладуть у кінець. Вимірюйте cache hit і економію. Не кладіть секрети в кешований префікс, який може затриматись на боці провайдера довше, ніж ви думаєте. Зміна одного символу на початку скидає кеш — тому версію промпту міняють свідомо, не 'прибрали пробіл'.",
        conceptEn: "Providers cache a shared prefix (the system text + a large instruction + static examples) and charge repeats more cheaply. For that the prefix must be byte-stable: do not insert the current time, a random nonce, or a changing file list at the start. Dynamics go at the end. Measure cache hit and the savings. Do not put secrets in a cached prefix that may linger on the provider's side longer than you think. A one-character change at the start drops the cache — so you change the prompt version deliberately, not 'we removed a space'.",
        code: "prompt = stable_system + stable_examples + dynamic_tail(files, question)\n# no now() or secrets in the prefix; log cache_hit",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чому timestamp на першому рядку системного промпту вбиває кеш префікса?", promptEn: "Why does a timestamp on the first line of the system prompt kill the prefix cache?", options: ["префікс більше не байтово однаковий між викликами", "час завжди в кінці за протоколом", "кеш ігнорує перший рядок", "секрети тоді безпечніші"], correctIndex: 0, explanationUk: "Стабільність з початку рядка.", explanationEn: "Stability from the start of the string." },
          { kind: "fill", promptUk: "Допишіть, куди класти змінний список файлів", promptEn: "Fill in where a changing file list should go", language: "python", code: "prompt = stable_system + stable_examples + ___  # files, time, user", accepted: ["tail", "dynamic_tail", "suffix"], caseSensitive: true, explanationUk: "Динаміка — у хвості.", explanationEn: "Dynamics go in the tail." },
          { kind: "read", promptUk: "Чи варто тримати API-ключ у кешованому системному префіксі 'для зручності інструментів'?", promptEn: "Should you keep an API key in the cached system prefix 'for the convenience of tools'?", language: "python", code: "system = POLICY + 'KEY=' + SECRET", options: ["ні: секрет затримується в кеші провайдера й може витекти у відповідь", "так, кеш шифрує ключі завжди", "так, якщо timestamp теж там", "так, без виміру hit"], correctIndex: 0, explanationUk: "Секрети не в префіксі.", explanationEn: "Secrets are not in the prefix." }
        ],
        whyUk: "Як скласти промпт кодера, щоб великий системний блок кешувався між зверненнями?",
        whyEn: "How do you assemble a coder prompt so a large system block is cached across calls?",
        ideas: [{ labelUk: "стабільний префікс", labelEn: "a stable prefix", anyOf: ["стабільн", "stable", "префікс", "prefix", "байт", "byte"] }, { labelUk: "динаміка в хвості", labelEn: "dynamics in the tail", anyOf: ["хвіст", "tail", "час", "time", "файл", "file"] }, { labelUk: "без секретів і свідома зміна", labelEn: "no secrets and a deliberate change", anyOf: ["секрет", "secret", "пробіл", "space", "hit", "версі", "version"] }],
        sampleUk: "Системний текст і приклади тримають байтово стабільними на початку, час і список файлів — у хвості, секрети не кладуть у кешований префікс, зміну пробілу на початку роблять свідомо, бо вона скидає кеш.",
        sampleEn: "You keep the system text and examples byte-stable at the start, time and the file list go in the tail, secrets are not put in the cached prefix, and a leading-space change is deliberate, because it drops the cache.",
      },
      {
        slug: "ai-context-budget",
        titleUk: "Бюджет контексту кодера: не все репо в одне вікно",
        titleEn: "A coder's context budget: not the whole repo in one window",
        difficulty: 3,
        pointsUk: ["Відбір за релевантністю й ліміт токенів", "Видно, що потрапило в контекст", "Після помилки — новий сигнал, не дубль усього"],
        pointsEn: ["Selection by relevance and a token limit", "It is visible what entered the context", "After an error — a new signal, not a copy of everything"],
        conceptUk: "Асистент-кодер гірше працює, коли в контексті тринадцять нерелевантних файлів і застарілий лог збірки. Відбирають: відкритий файл, помилка компілятора, сусіди за імпортами, тест, який падає — з лімітом токенів. Великі файли скорочують до потрібних символів або підпису функції. Показують користувачу (або в лозі агента), що саме потрапило в контекст — інакше 'модель не бачила мій фікс' недіагностоване. Повторювані службові інструкції тримають у стабільному префіксі (кеш). Після невдачі додають лише новий сигнал (лог помилки), не дублюють увесь контекст ще раз.",
        conceptEn: "A coding assistant works worse when the context holds thirteen irrelevant files and a stale build log. You select: the open file, the compiler error, import neighbours, the failing test — with a token limit. Large files are cut to the needed symbols or a function signature. You show the user (or the agent log) what exactly entered the context — otherwise 'the model did not see my fix' is undiagnosable. Repeated service instructions stay in a stable prefix (cache). After a failure you add only the new signal (the error log), you do not duplicate the whole context again.",
        code: "ctx = pick([open_file, failing_test, imports, compiler_error], max_tokens=8000)\nlog.context_files(ctx)  # after fail: append new error only",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чому 'прикріпи весь монорепо' часто погіршує фікс одного тесту?", promptEn: "Why does 'attach the whole monorepo' often worsen a fix of one test?", options: ["релевантний код тоне в шумі, ліміт з'їдають зайві файли", "більше файлів завжди краще", "кеш префікса тоді сильніший", "тест не потребує помилки компілятора"], correctIndex: 0, explanationUk: "Відбір, не обсяг.", explanationEn: "Selection, not volume." },
          { kind: "fill", promptUk: "Допишіть, що додають після невдалої спроби фіксу", promptEn: "Fill in what you add after a failed fix attempt", language: "python", code: "ctx.append(compiler____)  # not a second full repo dump", accepted: ["_error", "error", "_log", "log"], caseSensitive: true, explanationUk: "Новий сигнал — лог помилки.", explanationEn: "The new signal is the error log." },
          { kind: "read", promptUk: "Навіщо в лозі агента список файлів, що ввійшли в промпт?", promptEn: "Why does the agent log list the files that went into the prompt?", language: "json", code: "{ \"context_files\": [\"a.ts\", \"a.test.ts\"], \"tokens\": 4100 }", options: ["щоб діагностувати 'модель не бачила мій файл'", "це замінює тест", "щоб збільшити монорепо", "це секрет користувача обов'язково"], correctIndex: 0, explanationUk: "Прозорість відбору.", explanationEn: "Transparency of selection." }
        ],
        whyUk: "Що покласти в контекст, коли падає один юніт-тест у великому репозиторії?",
        whyEn: "What do you put in the context when one unit test fails in a large repository?",
        ideas: [{ labelUk: "відбір, не все репо", labelEn: "selection, not the whole repo", anyOf: ["відбір", "select", "ліміт", "limit", "монорепо", "monorepo", "шум", "noise"] }, { labelUk: "тест, код, помилка", labelEn: "the test, the code, the error", anyOf: ["тест", "test", "помилк", "error", "імпорт", "import"] }, { labelUk: "видимий склад", labelEn: "a visible composition", anyOf: ["лог", "log", "файлів", "files", "сигнал", "signal"] }],
        sampleUk: "Беруть падаючий тест, пов'язаний код і повідомлення помилки в межах ліміту, показують цей список у лозі, а після невдачі додають новий лог помилки, не весь монорепо вдруге.",
        sampleEn: "You take the failing test, the related code, and the error message within a limit, you show that list in the log, and after a failure you add the new error log, not the whole monorepo a second time.",
      },
      {
        slug: "ai-diff-scope",
        titleUk: "Патч має бути в межах задачі: не 'заодно переписав сусідній модуль'",
        titleEn: "A patch should stay inside the task: not 'I also rewrote a neighbouring module'",
        difficulty: 3,
        pointsUk: ["Гейт на список файлів і розмір дифа", "Цільовий тест після патчу, не слово моделі", "Зайве — на людину або відхилення"],
        pointsEn: ["A gate on the file list and the diff size", "The target test after the patch, not the model's word", "The extra goes to a human or a rejection"],
        conceptUk: "Асистент часто чіпає зайве: форматування всього файлу, рефакторинг поруч, нові залежності. Перед застосуванням патчу перевіряють список файлів і розмір дифа проти очікуваного обсягу задачі; великий несподіваний диф — на рев'ю людини або відхилення. Інструкція: 'змінюй лише файли, потрібні для тесту X'. Після патчу ганяють цільовий тест, не покладаються на 'модель сказала, що зелене'. Службові зміни (імпорт, ім'я) мають бути пояснені в повідомленні коміту. Це той самий принцип малих дифів, уже знаний у курсі, застосований як автоматичний гейт.",
        conceptEn: "An assistant often touches too much: formatting a whole file, a nearby refactor, new dependencies. Before applying a patch you check the file list and the diff size against the expected scope of the task; a large unexpected diff goes to a human review or a rejection. The instruction: 'change only the files needed for test X'. After the patch you run the target test, you do not rely on 'the model said it is green'. Housekeeping changes (an import, a name) must be explained in the commit message. This is the same small-diff principle already known in the course, applied as an automatic gate.",
        code: "if diff.files - expected or diff.lines > cap: review_or_reject()\nrun(target_test); commit -m 'fix X; import Y needed for test'",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Патч 'пофіксити опечатку' переписав 12 файлів і package.json. Що зробити?", promptEn: "A patch to 'fix a typo' rewrote 12 files and package.json. What do you do?", options: ["не застосовувати мовчки: відхилити або віддати на рев'ю через надмірний обсяг", "закомітити, бо модель впевнена", "пропустити тести", "форматувати ще раз усе репо"], correctIndex: 0, explanationUk: "Обсяг має відповідати задачі.", explanationEn: "The scope must match the task." },
          { kind: "fill", promptUk: "Допишіть перевірку після патчу", promptEn: "Fill in the check after the patch", language: "bash", code: "git apply patch && ___ test path/to/failing.test.ts", accepted: ["pnpm", "npm", "npx", "vitest", "jest"], caseSensitive: true, explanationUk: "Цільовий тест запускають у CI/агенті.", explanationEn: "The target test is run in CI/the agent." },
          { kind: "read", promptUk: "Де написати, що зміна імпорту потрібна для тесту, а не 'заодно'?", promptEn: "Where do you write that an import change is needed for the test, not 'while we are at it'?", language: "bash", code: "git commit -m '...'", options: ["у повідомленні коміту / описі патчу, явно", "ніде, імпорти не пояснюють", "лише в системному промпті наступного користувача", "у package-lock без тексту"], correctIndex: 0, explanationUk: "Пояснення обсягу.", explanationEn: "An explanation of scope." }
        ],
        whyUk: "Як не дати асистенту під виглядом фіксу тесту переписати пів репозиторію?",
        whyEn: "How do you stop an assistant from rewriting half the repository under the guise of fixing a test?",
        ideas: [{ labelUk: "гейті обсягу", labelEn: "a scope gate", anyOf: ["обсяг", "scope", "диф", "diff", "файлів", "files"] }, { labelUk: "цільовий тест", labelEn: "the target test", anyOf: ["тест", "test", "запуск", "run", "зелен", "green"] }, { labelUk: "рев'ю зайвого", labelEn: "a review of the extra", anyOf: ["рев", "review", "відхил", "reject", "коміт", "commit"] }],
        sampleUk: "Перед apply перевіряють, що список файлів і розмір дифа відповідають задачі, після патчу ганяють цільовий тест, надмірний диф відхиляють або віддають людині, а службові правки пояснюють у коміті.",
        sampleEn: "Before apply you check that the file list and the diff size match the task, after the patch you run the target test, an oversized diff is rejected or given to a human, and housekeeping edits are explained in the commit.",
      }
    ],
    "Контрольна: кеш і контекст кодера",
    "Exam: cache and coder context",
    [
      { promptUk: "Timestamp на початку системного промпту…", promptEn: "A timestamp at the start of the system prompt…", options: ["скидає кеш префікса", "покращує hit завжди", "обов'язковий для стабільності", "ховає секрети"], correctIndex: 0, explanationUk: "Префікс має бути стабільним.", explanationEn: "The prefix must be stable." },
      { promptUk: "Змінний список файлів кладуть…", promptEn: "A changing file list goes…", options: ["у хвіст промпту", "на перший рядок системи", "у секрет префікса", "замість прикладів"], correctIndex: 0, explanationUk: "Динаміка в хвості.", explanationEn: "Dynamics in the tail." },
      { promptUk: "Секрет у кешованому префіксі…", promptEn: "A secret in a cached prefix is…", options: ["ризик затримки й витоку", "найкраща практика", "вимога провайдера", "заміна hit"], correctIndex: 0, explanationUk: "Не кладіть секрети в кеш.", explanationEn: "Do not put secrets in the cache." },
      { promptUk: "Весь монорепо в контекст одного тесту…", promptEn: "The whole monorepo in the context of one test…", options: ["топить сигнал у шумі", "завжди покращує фікс", "заміна логу файлів", "обов'язкова для кешу"], correctIndex: 0, explanationUk: "Відбір і ліміт.", explanationEn: "Selection and a limit." },
      { promptUk: "Після невдалого фіксу додають…", promptEn: "After a failed fix you add…", options: ["новий лог помилки, не другий дамп репо", "знову весь монорепо", "timestamp у префікс", "секрет у хвіст"], correctIndex: 0, explanationUk: "Новий сигнал.", explanationEn: "A new signal." },
      { promptUk: "Патч 'опечатка' на 12 файлів…", promptEn: "A 'typo' patch on 12 files should be…", options: ["відхилений або відданий на рев'ю", "застосований мовчки", "без цільового тесту", "без пояснення коміту"], correctIndex: 0, explanationUk: "Обсяг відповідає задачі.", explanationEn: "The scope matches the task." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandAiDevelopment(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
