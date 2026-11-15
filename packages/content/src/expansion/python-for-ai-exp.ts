import type { CourseContent, LessonContent, UnitContent } from "../types.js";
import { expandCourse, sectionUnit, teachLesson } from "./factory.js";

export const newUnits: UnitContent[] = [
  sectionUnit(
    "py_typing_contracts",
    "Анотації, протоколи й контракти даних",
    "Annotations, protocols, and data contracts",
    [
      {
        slug: "py-typed-dicts",
        titleUk: "TypedDict і dataclasses: форма відповіді моделі — не 'dict на око'",
        titleEn: "TypedDict and dataclasses: a model's response shape is not 'a dict by eye'",
        difficulty: 3,
        pointsUk: ["Схема ключів на межі JSON, далі — типізований об'єкт", "NotRequired/Optional замість розкиданих get", "Any лише на ізольованому хвості"],
        pointsEn: ["A key schema at the JSON boundary, then a typed object", "NotRequired/Optional instead of scattered gets", "Any only on an isolated tail"],
        conceptUk: "У коді для моделей відповідь API часто приходить як словник. Без схеми опечатка `choises` випливе вже в проді. `TypedDict` і `dataclass` (або Pydantic-модель у сусідніх уроках) фіксують ключі й типи: редактор і `ty`/`mypy` ловлять промах до запуску. Для необов'язкових полів — `NotRequired` або `Optional`, не мовчазне `.get` з різним дефолтом у п'яти місцях. На межі з JSON валідуйте один раз на вході й далі передавайте типізований об'єкт. `dict[str, Any]` скрізь — капітуляція: його лишають лише на справді довільному хвості, і цей хвіст ізолюють.",
        conceptEn: "In model-facing code an API response often arrives as a dictionary. Without a schema a `choises` typo shows up in production. `TypedDict` and `dataclass` (or a Pydantic model in neighbouring lessons) pin the keys and types: the editor and `ty`/`mypy` catch the miss before you run. For optional fields use `NotRequired` or `Optional`, not a silent `.get` with a different default in five places. At the JSON boundary you validate once on the way in and then pass a typed object. `dict[str, Any]` everywhere is a surrender: you leave it only on a truly arbitrary tail, and you isolate that tail.",
        code: "class Choice(TypedDict):\n    text: str\n    logprob: NotRequired[float]\n\ndef parse(raw: dict) -> Choice:\n    return Choice(text=raw['choices'][0]['text'])",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чому відповідь LLM варто одразу класти в TypedDict, а не тягати dict[str, Any] по всьому пайплайну?", promptEn: "Why should an LLM response go into a TypedDict immediately, instead of a dict[str, Any] through the whole pipeline?", options: ["опечатка ключа й зміна форми ловляться раніше, а не в проді", "TypedDict прискорює GPU", "Any заборонений у Python", "JSON не вміє в TypedDict"], correctIndex: 0, explanationUk: "Межа валідації — один раз на вході.", explanationEn: "The validation boundary is once on the way in." },
          { kind: "fill", promptUk: "Допишіть маркер необов'язкового ключа TypedDict", promptEn: "Fill in the marker of an optional TypedDict key", language: "python", code: "class Choice(TypedDict):\n    text: str\n    logprob: ___('[float]')", accepted: ["NotRequired"], caseSensitive: true, explanationUk: "NotRequired — ключ може бути відсутнім.", explanationEn: "NotRequired means the key may be absent." },
          { kind: "read", promptUk: "Де має жити перевірка 'choices[0].text існує'?", promptEn: "Where should the check 'choices[0].text exists' live?", language: "python", code: "def parse(raw: dict) -> Completion: ...\n# later layers take Completion, not raw", options: ["один раз у parse на межі, далі типізований Completion", "у кожному шарі через .get з різним дефолтом", "лише в логах прод", "у коментарі README"], correctIndex: 0, explanationUk: "Одна межа, далі контракт.", explanationEn: "One boundary, then a contract." }
        ],
        whyUk: "Як не рознести опечатку choises по всьому пайплайну відповіді моделі?",
        whyEn: "How do you keep a choises typo from spreading through a model-response pipeline?",
        ideas: [{ labelUk: "схема на вході", labelEn: "a schema at the entrance", anyOf: ["typeddict", "dataclass", "схем", "schema", "меж", "bound"] }, { labelUk: "типізований об'єкт далі", labelEn: "a typed object afterwards", anyOf: ["completion", "parse", "типіз", "typed"] }, { labelUk: "не Any скрізь", labelEn: "not Any everywhere", anyOf: ["any", "get", "опечат", "typo", "notrequired"] }],
        sampleUk: "На межі JSON один раз розбирають відповідь у TypedDict або dataclass, далі передають типізований об'єкт; dict[str, Any] і розкидані .get залишають опечатки ключів до продакшену.",
        sampleEn: "At the JSON boundary you parse the response once into a TypedDict or dataclass, then you pass a typed object; dict[str, Any] and scattered .get calls leave key typos until production.",
      },
      {
        slug: "py-protocol-swap",
        titleUk: "Protocol: залежність від 'схожого на клієнта', не від конкретного SDK",
        titleEn: "Protocol: depend on 'something client-shaped', not on a concrete SDK",
        difficulty: 3,
        pointsUk: ["Protocol описує потрібні методи, не клас SDK", "Фейк у тестах і один адаптер у проді", "Ваші типи на межі, вузький інтерфейс"],
        pointsEn: ["A Protocol describes the methods you need, not the SDK class", "A fake in tests and one adapter in prod", "Your types at the boundary, a narrow interface"],
        conceptUk: "Код агента, що імпортує `OpenAI()` всюди, важко тестувати й важко змінити постачальника. `Protocol` з методами `complete(prompt: str) -> str` описує потрібну поведінку: прод-клас обгортає SDK, у тестах — фейк із фікстурами. Це структурна типізація: клас не мусить наслідувати протокол, достатньо сумісних методів. Не роздувайте протокол на 30 методів 'про запас'. Вхід і вихід протоколу — ваші типи, не сирі відповіді вендора. Так ви міняєте модель або додаєте ретраї в одному адаптері, не в десяти викликах.",
        conceptEn: "Agent code that imports `OpenAI()` everywhere is hard to test and hard to switch away from a vendor. A `Protocol` with `complete(prompt: str) -> str` describes the behaviour you need: the prod class wraps the SDK, tests use a fake with fixtures. This is structural typing: a class does not have to inherit the protocol, compatible methods are enough. Do not bloat the protocol with 30 methods 'just in case'. The protocol's input and output are your types, not raw vendor responses. Then you change the model or add retries in one adapter, not in ten call sites.",
        code: "class LlmClient(Protocol):\n    def complete(self, prompt: str) -> str: ...\n\nclass Fake(LlmClient):\n    def complete(self, prompt: str) -> str:\n        return 'ok'",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Навіщо протокол complete(), якщо в проді все одно OpenAI?", promptEn: "Why a complete() protocol if prod still uses OpenAI?", options: ["тести без мережі й заміна постачальника в одному адаптері", "Protocol прискорює токени", "OpenAI вимагає Protocol", "фейки заборонені"], correctIndex: 0, explanationUk: "Залежність від ролі, не від SDK.", explanationEn: "Depend on a role, not on an SDK." },
          { kind: "fill", promptUk: "Допишіть базовий клас структурної типізації", promptEn: "Fill in the structural-typing base", language: "python", code: "class LlmClient(___):\n    def complete(self, prompt: str) -> str: ...", accepted: ["Protocol"], caseSensitive: true, explanationUk: "typing.Protocol.", explanationEn: "typing.Protocol." },
          { kind: "read", promptUk: "Де додати ретраї й таймаут: у кожному виклику агента чи в адаптері?", promptEn: "Where do you add retries and a timeout: at every agent call, or in the adapter?", language: "python", code: "class OpenAiAdapter:\n    def complete(self, prompt: str) -> str: ...", options: ["в адаптері, що реалізує протокол: виклики агента лишаються простими", "скопіювати tenacity в десять файлів агента", "лише в pytest", "у TypedDict відповіді"], correctIndex: 0, explanationUk: "Один адаптер — одне місце політики.", explanationEn: "One adapter is one place for policy." }
        ],
        whyUk: "Як тестувати агента без живого API й не розмазати SDK по всьому коду?",
        whyEn: "How do you test an agent without a live API and without smearing the SDK through all the code?",
        ideas: [{ labelUk: "Protocol", labelEn: "a Protocol", anyOf: ["protocol", "complete", "інтерфейс", "interface"] }, { labelUk: "фейк у тестах", labelEn: "a fake in tests", anyOf: ["фейк", "fake", "фікстур", "fixture", "тест", "test"] }, { labelUk: "один адаптер", labelEn: "one adapter", anyOf: ["адаптер", "adapter", "ретра", "retr", "sdk"] }],
        sampleUk: "Описують вузький Protocol із вашими типами, прод обгортає SDK в одному адаптері (ретраї теж там), у тестах підставляють фейк — тоді агент не імпортує вендора всюди.",
        sampleEn: "You describe a narrow Protocol with your types, prod wraps the SDK in one adapter (retries live there too), and tests inject a fake — then the agent does not import the vendor everywhere.",
      }
    ],
    "Контрольна: контракти Python",
    "Exam: Python contracts",
    [
      { promptUk: "dict[str, Any] по всьому пайплайну…", promptEn: "dict[str, Any] through the whole pipeline is…", options: ["капітуляція типів; схему ставлять на межі", "найкращий контракт", "заміна TypedDict", "вимога mypy"], correctIndex: 0, explanationUk: "Валідація один раз на вході.", explanationEn: "Validate once on the way in." },
      { promptUk: "NotRequired у TypedDict означає…", promptEn: "NotRequired in a TypedDict means…", options: ["ключ може бути відсутнім", "значення завжди None", "заборону ключа", "Any"], correctIndex: 0, explanationUk: "Необов'язкове поле схеми.", explanationEn: "An optional schema field." },
      { promptUk: "Protocol корисний тим, що…", promptEn: "A Protocol is useful because…", options: ["залежність від поведінки, фейк у тестах, один адаптер SDK", "він прискорює GPU", "він замінює JSON", "класи мусять наслідувати завжди"], correctIndex: 0, explanationUk: "Структурна типізація.", explanationEn: "Structural typing." },
      { promptUk: "Ретраї й таймаут додають…", promptEn: "Retries and a timeout are added…", options: ["в адаптері протоколу, не в десяти викликах", "у кожному файлі агента копіпастою", "у TypedDict", "лише в README"], correctIndex: 0, explanationUk: "Одне місце політики.", explanationEn: "One place for policy." },
      { promptUk: "Перевірка форми JSON має жити…", promptEn: "A JSON-shape check should live…", options: ["один раз у parse на межі", "у п'яти .get з різними дефолтами", "лише в логах", "у будь-якому Any"], correctIndex: 0, explanationUk: "Далі — типізований об'єкт.", explanationEn: "Afterwards — a typed object." },
      { promptUk: "Роздутий протокол на 30 методів 'про запас'…", promptEn: "A bloated 30-method protocol 'just in case' is…", options: ["гірший за вузький інтерфейс потрібних методів", "обов'язковий для фейків", "вимога SDK", "заміна dataclass"], correctIndex: 0, explanationUk: "Вузький контракт.", explanationEn: "A narrow contract." }
    ],
  ),
  sectionUnit(
    "py_packaging_env",
    "Оточення, залежності й відтворюваний запуск",
    "Environments, dependencies, and a reproducible run",
    [
      {
        slug: "py-venv-lock",
        titleUk: "Окреме оточення й зафіксовані версії: 'у мене працює' не є артефактом",
        titleEn: "A dedicated environment and pinned versions: 'it works on my machine' is not an artifact",
        difficulty: 3,
        pointsUk: ["Окремий venv, не системний pip", "Lock у CI, зафіксований Python", "Хеш ваг моделі — частина артефакту"],
        pointsEn: ["A dedicated venv, not system pip", "A lock in CI, a pinned Python", "The model weight hash is part of the artifact"],
        conceptUk: "Глобальний `pip install` у системний Python ламає інші проєкти й не відтворюється на сервері. Відокремлюють оточення (`venv`, `uv venv`, conda лише якщо є причина) і фіксують залежності lock-файлом (`uv lock`, `pip-tools`, poetry.lock). У CI ставлять з lock, не 'останній transformers'. Версію Python теж фіксують (`.python-version`). Dev-залежності (pytest) не змішують із прод-образом без потреби. Для моделей додатково записують хеш ваг і джерело: pip-пакет не завжди містить сам чекпоінт.",
        conceptEn: "A global `pip install` into the system Python breaks other projects and does not reproduce on the server. You isolate an environment (`venv`, `uv venv`, conda only if there is a reason) and you pin dependencies with a lock file (`uv lock`, `pip-tools`, poetry.lock). CI installs from the lock, not 'the latest transformers'. The Python version is pinned too (`.python-version`). Dev dependencies (pytest) are not mixed into the prod image without a need. For models you also record the weight hash and the source: a pip package does not always contain the checkpoint itself.",
        code: "uv venv && uv lock && uv sync --frozen\n# .python-version: 3.12.7\n# model: org/m@sha256:…  or revision=",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Чому pip install transformers без pin у проді ризикований?", promptEn: "Why is pip install transformers without a pin risky in prod?", options: ["наступний деплой може підтягнути іншу поведінку моделі й API", "pip тоді не працює", "venv забороняє transformers", "lock-файл ігнорує версії"], correctIndex: 0, explanationUk: "Залежності — частина релізу.", explanationEn: "Dependencies are part of the release." },
          { kind: "fill", promptUk: "Допишіть файл рекомендованої версії інтерпретатора", promptEn: "Fill in the file for the recommended interpreter version", language: "bash", code: "echo 3.12.7 > .___-version", accepted: ["python"], caseSensitive: true, explanationUk: ".python-version читають pyenv/uv.", explanationEn: ".python-version is read by pyenv/uv." },
          { kind: "read", promptUk: "Що ще записати, якщо пайплайн тягне ваги з Hugging Face?", promptEn: "What else should you record if the pipeline pulls weights from Hugging Face?", language: "python", code: "pipe = pipeline('text-generation', model='org/m')", options: ["ідентифікатор ревізії або хеш ваг, не лише ім'я моделі, яке плаває", "лише ім'я org/m без ревізії завжди достатньо", "системний сайт-packages", "будь-який conda без lock"], correctIndex: 0, explanationUk: "Ваги — артефакт із версією.", explanationEn: "Weights are a versioned artifact." }
        ],
        whyUk: "Як зробити так, щоб тренувальний скрипт на CI повторив те саме оточення, що на ноутбуці?",
        whyEn: "How do you make a training script on CI repeat the same environment as on the laptop?",
        ideas: [{ labelUk: "venv", labelEn: "a venv", anyOf: ["venv", "uv", "оточен", "environ", "систем", "system"] }, { labelUk: "lock і версія Python", labelEn: "a lock and a Python version", anyOf: ["lock", "python-version", "pin", "ci"] }, { labelUk: "хеш ваг", labelEn: "a weight hash", anyOf: ["хеш", "hash", "ваг", "weight", "ревіз", "revision", "модель", "model"] }],
        sampleUk: "Роблять окремий venv, ставлять залежності з lock-файлу й фіксують версію Python; для моделей записують ревізію або хеш ваг, а не ставлять останній пакет у системний Python.",
        sampleEn: "You make a dedicated venv, you install from a lock file, and you pin the Python version; for models you record a revision or a weight hash, and you do not install the latest package into the system Python.",
      },
      {
        slug: "py-pytest-data",
        titleUk: "Тести на дані й промпти: маленькі фікстури, не нічний прогін усього корпусу",
        titleEn: "Tests for data and prompts: small fixtures, not a nightly run of the whole corpus",
        difficulty: 3,
        pointsUk: ["Малі фікстури й інваріанти в юнітах", "Великий корпус — окремий job", "Знімки промпту рев'юють, не accept-all"],
        pointsEn: ["Small fixtures and invariants in units", "A large corpus is a separate job", "Prompt snapshots are reviewed, not accept-all"],
        conceptUk: "Код, що чистить текст, ріже чанки або збирає промпт, тестують як звичайну функцію: фікстура з 3–10 прикладами, очікуваний рядок або інваріант (чанки перекриваються, жоден не довший за ліміт). Ганяти всю базу в юніт-тесті — повільно й нестабільно. Великі регресії — окремий job із порогом, не обов'язковий гейт кожного PR. Випадковість фіксують насінням. Не мокайте власну чистку так, що тест нічого не перевіряє. Знімки (snapshot) промпту ловлять випадкову зміну шаблону, але рев'юйте оновлення знімка, не 'accept all'.",
        conceptEn: "Code that cleans text, cuts chunks, or builds a prompt is tested like a normal function: a fixture of 3–10 examples, an expected string or an invariant (chunks overlap, none is longer than the limit). Running the whole corpus in a unit test is slow and unstable. Large regressions are a separate job with a threshold, not a required gate on every PR. Randomness is pinned with a seed. Do not mock your own cleaner so the test checks nothing. Prompt snapshots catch an accidental template change, but you review a snapshot update, you do not 'accept all'.",
        code: "def test_chunks_respect_limit(doc_small):\n    parts = chunk(doc_small, 200)\n    assert all(len(p) <= 200 for p in parts)\n    assert ''.join(parts).replace(' ','') in doc_small.replace(' ','')",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чому юніт-тест, що читає 2 ГБ корпусу, поганий гейт PR?", promptEn: "Why is a unit test that reads a 2 GB corpus a poor PR gate?", options: ["повільний і крихкий; беріть малі фікстури, корпус — окремо з порогом", "корпус завжди вкладеться в 3 секунди", "фікстури заборонені для чанків", "2 ГБ гарантують якість"], correctIndex: 0, explanationUk: "Швидкий гейт і окрема регресія.", explanationEn: "A fast gate and a separate regression." },
          { kind: "fill", promptUk: "Допишіть фіксацію випадковості", promptEn: "Fill in pinning randomness", language: "python", code: "random.___(42)\nnp.random.seed(42)", accepted: ["seed"], caseSensitive: true, explanationUk: "Насіння робить тест відтворюваним.", explanationEn: "A seed makes the test reproducible." },
          { kind: "read", promptUk: "Що робити, коли snapshot промпту змінився в PR 'правка коментаря'?", promptEn: "What do you do when a prompt snapshot changed in a 'comment-only' PR?", language: "python", code: "# assert prompt == snapshot", options: ["не accept all: з'ясувати, чому шаблон змінився, або відкотити випадковість", "завжди прийняти знімок, якщо CI червоний", "видалити всі знімки", "збільшити корпус до 2 ГБ"], correctIndex: 0, explanationUk: "Знімок — оракул, його зміна — рев'ю.", explanationEn: "A snapshot is an oracle; changing it is a review." }
        ],
        whyUk: "Як тестувати функцію чанкування й шаблон промпту, не ганяючи весь корпус у кожному PR?",
        whyEn: "How do you test a chunking function and a prompt template without running the whole corpus in every PR?",
        ideas: [{ labelUk: "малі фікстури", labelEn: "small fixtures", anyOf: ["фікстур", "fixture", "інваріант", "invariant", "юніт", "unit"] }, { labelUk: "корпус окремо", labelEn: "the corpus separately", anyOf: ["корпус", "corpus", "job", "поріг", "threshold"] }, { labelUk: "знімок із рев'ю", labelEn: "a snapshot with review", anyOf: ["snapshot", "знімок", "accept", "насін", "seed"] }],
        sampleUk: "Юніти тримають на малих фікстурах і інваріантах із насінням, великий корпус виносять в окремий job, зміну знімка промпту рев'юють і не приймають усі знімки сліпо.",
        sampleEn: "Units stay on small fixtures and invariants with a seed, a large corpus goes to a separate job, and a prompt-snapshot change is reviewed — you do not accept all snapshots blindly.",
      }
    ],
    "Контрольна: оточення й тести",
    "Exam: environments and tests",
    [
      { promptUk: "Глобальний pip install у системний Python…", promptEn: "A global pip install into the system Python is…", options: ["ламає відтворюваність; беріть venv і lock", "найкращий прод-практик", "заміна .python-version", "фіксує ваги моделі"], correctIndex: 0, explanationUk: "Окреме оточення.", explanationEn: "A dedicated environment." },
      { promptUk: "У CI залежності ставлять…", promptEn: "In CI, dependencies are installed…", options: ["із lock-файлу, не latest", "завжди latest transformers", "лише глобальним pip", "без версії Python"], correctIndex: 0, explanationUk: "Заморожений граф.", explanationEn: "A frozen graph." },
      { promptUk: "Ім'я моделі без ревізії ваг…", promptEn: "A model name without a weight revision is…", options: ["плаває; записуйте хеш або revision", "достатній артефакт завжди", "заміна lock", "вимога venv"], correctIndex: 0, explanationUk: "Ваги версіонують.", explanationEn: "Weights are versioned." },
      { promptUk: "Юніт на 2 ГБ корпусу в кожному PR…", promptEn: "A unit on a 2 GB corpus in every PR is…", options: ["поганий гейт; малі фікстури + окремий job", "обов'язковий стандарт", "швидший за фікстуру", "заміна насіння"], correctIndex: 0, explanationUk: "Швидкі тести окремо.", explanationEn: "Fast tests are separate." },
      { promptUk: "Accept all на знімках промпту…", promptEn: "Accept-all on prompt snapshots is…", options: ["ризик прийняти випадкову зміну шаблону", "рекомендовано завжди", "фіксує насіння", "заміна інваріанта"], correctIndex: 0, explanationUk: "Рев'ю оновлення знімка.", explanationEn: "Review a snapshot update." },
      { promptUk: "random.seed у тесті потрібен, щоб…", promptEn: "random.seed in a test is there so…", options: ["падіння було відтворюваним", "корпус став меншим", "lock оновився", "venv створився"], correctIndex: 0, explanationUk: "Відтворювана випадковість.", explanationEn: "Reproducible randomness." }
    ],
  ),
  sectionUnit(
    "py_pydantic_io",
    "Pydantic на межах і безпечне розбиття тексту",
    "Pydantic at the boundaries and safe text splitting",
    [
      {
        slug: "py-pydantic-llm",
        titleUk: "Pydantic: сувора схема виходу моделі, не 'розпарсимо якось'",
        titleEn: "Pydantic: a strict schema for model output, not 'we will parse it somehow'",
        difficulty: 3,
        pointsUk: ["Structured output + extra='forbid'", "Помилка розбору — явна, не тихе {}", "Схему версіонують; обережно з секретами в помилках"],
        pointsEn: ["Structured output + extra='forbid'", "A parse failure is explicit, not a silent {}", "The schema is versioned; be careful with secrets in errors"],
        conceptUk: "Модель просять повернути JSON під Pydantic-модель (`response_model`, structured output, tool arguments). Валідація ловить зайві поля (`extra='forbid'`), не той тип, порожній обов'язковий рядок. Якщо розбір не вдався — явна помилка й ретрай або запасний шлях, не тихе `{}`. Версіонуйте схему: додавання поля з дефолтом сумісне, перейменування — ні, потрібен адаптер. Не кладіть у модель секрети користувача без потреби в логах валідації (Pydantic може включити вхід у помилку — налаштуйте, що світиться). Схема — контракт між промптом і кодом.",
        conceptEn: "You ask the model to return JSON that matches a Pydantic model (`response_model`, structured output, tool arguments). Validation catches extra fields (`extra='forbid'`), a wrong type, an empty required string. If parse fails — an explicit error and a retry or a fallback, not a silent `{}`. Version the schema: adding a field with a default is compatible, renaming is not, you need an adapter. Do not put user secrets in the model if validation errors would log the input (Pydantic may include the input in the error — configure what is visible). The schema is the contract between the prompt and the code.",
        code: "class Extract(BaseModel):\n    model_config = ConfigDict(extra='forbid')\n    title: str\n    date: date",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чому extra='forbid' корисний для відповіді моделі?", promptEn: "Why is extra='forbid' useful for a model response?", options: ["зайве поле (галюцинація ключа) стане помилкою, а не тихим ігнором", "воно прискорює токени", "Pydantic тоді вимикає типи", "forbid додає секрети в лог завжди"], correctIndex: 0, explanationUk: "Суворий контракт ключів.", explanationEn: "A strict key contract." },
          { kind: "fill", promptUk: "Допишіть заборону зайвих полів", promptEn: "Fill in forbidding extra fields", language: "python", code: "class Extract(BaseModel):\n    model_config = ConfigDict(extra='___')\n    title: str", accepted: ["forbid"], caseSensitive: true, explanationUk: "extra='forbid'.", explanationEn: "extra='forbid'." },
          { kind: "read", promptUk: "Що робити, якщо validation error містить фрагмент промпту з персональними даними?", promptEn: "What do you do if a validation error contains a prompt fragment with personal data?", language: "python", code: "ValidationError: ... input_value='SSN 123-45-6789'", options: ["налаштувати, що потрапляє в лог/трасу, не світити секрети за замовчуванням", "завжди логувати повний вхід — так легше дебажити в проді публічно", "вимкнути Pydantic", "замінити схему на dict"], correctIndex: 0, explanationUk: "Помилки — теж поверхня витоку.", explanationEn: "Errors are also a leak surface." }
        ],
        whyUk: "Як змусити модель повернути заголовок і дату в очікуваній формі, і що робити при невдачі?",
        whyEn: "How do you make a model return a title and a date in the expected shape, and what do you do on failure?",
        ideas: [{ labelUk: "Pydantic-схема", labelEn: "a Pydantic schema", anyOf: ["pydantic", "схем", "schema", "structured", "forbid"] }, { labelUk: "явна помилка й ретрай", labelEn: "an explicit error and a retry", anyOf: ["помилк", "error", "ретра", "retr", "{}", "fallback"] }, { labelUk: "версія й логи", labelEn: "version and logs", anyOf: ["версі", "version", "секрет", "secret", "лог", "log"] }],
        sampleUk: "Просять structured output під Pydantic із extra='forbid', при невдачі роблять явну помилку й ретрай, а не тихе {}, схему версіонують і не світять секрети у ValidationError.",
        sampleEn: "You ask for structured output under Pydantic with extra='forbid', on failure you raise an explicit error and retry instead of a silent {}, you version the schema, and you do not leak secrets in ValidationError.",
      },
      {
        slug: "py-chunk-overlap",
        titleUk: "Чанки з перекриттям: межа речення важливіша за рівний лічильник символів",
        titleEn: "Chunks with overlap: a sentence boundary matters more than an even character count",
        difficulty: 3,
        pointsUk: ["Ріжте за реченнями й пакуйте до ліміту", "Перекриття — щоб не втратити межу", "Метадані для цитати; зміну різки вимірюють"],
        pointsEn: ["Split on sentences and pack up to the limit", "Overlap is there so a boundary is not lost", "Metadata for a citation; a splitter change is measured"],
        conceptUk: "Для RAG текст ріжуть на чанки з лімітом токенів і перекриттям, щоб речення на межі не розірвати без контексту. Наївний `s[i:i+400]` ріже слово й посилання. Краще різати за абзацами/реченнями й пакувати, доки ліміт не вичерпано; перекриття 10–20% — типова відправна точка, не магія. Занадто великі чанки розмивають пошук, занадто малі — втрачають зміст. Зберігайте метадані (джерело, позиція), щоб цитата була правдивою. Вимірюйте якість на фіксованому наборі питань, коли міняєте різку — не 'на око після одного запиту'.",
        conceptEn: "For RAG you cut text into chunks with a token limit and overlap, so a sentence on the boundary is not torn without context. A naive `s[i:i+400]` cuts words and links. It is better to split on paragraphs/sentences and pack until the limit is reached; 10–20% overlap is a typical starting point, not magic. Chunks that are too large blur retrieval, chunks that are too small lose meaning. Store metadata (source, position) so a citation is truthful. Measure quality on a fixed question set when you change the splitter — not 'by eye after one query'.",
        code: "chunks = pack_sentences(sentences, max_tokens=400, overlap=0.15)\n# each chunk: text, source, start, end",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чим поганий s[i:i+400] для юридичного тексту?", promptEn: "What is wrong with s[i:i+400] for legal text?", options: ["може розрізати речення й посилання посередині слова, цитата стане кривою", "400 символів завжди ідеальні", "перекриття тоді заборонене", "метадані з'являються самі"], correctIndex: 0, explanationUk: "Межа речення важливіша за рівну довжину.", explanationEn: "A sentence boundary matters more than even length." },
          { kind: "fill", promptUk: "Допишіть типове перекриття чанків як частку", promptEn: "Fill in a typical chunk overlap as a fraction", language: "python", code: "chunks = split(doc, size=500, overlap_ratio=0.___)  # 10–20%", accepted: ["15", "1", "2"], caseSensitive: true, explanationUk: "Близько 10–20%, не нуль і не 90%.", explanationEn: "Around 10–20%, not zero and not 90%." },
          { kind: "read", promptUk: "Що зберегти разом із текстом чанка для чесної цитати в відповіді?", promptEn: "What should you store with the chunk text for an honest citation in the answer?", language: "python", code: "Chunk(text=..., source=..., start_char=..., end_char=...)", options: ["джерело й позицію в документі", "лише вектор без джерела", "повний корпус у кожному чанку", "випадковий UUID без прив'язки"], correctIndex: 0, explanationUk: "Користувач має бачити, звідки взято.", explanationEn: "The user should see where it came from." }
        ],
        whyUk: "Як різати довгий регламент для RAG, щоб пошук знаходив ціле правило й цитата була чесною?",
        whyEn: "How do you split a long policy for RAG so retrieval finds a whole rule and the citation is honest?",
        ideas: [{ labelUk: "межа речення", labelEn: "a sentence boundary", anyOf: ["речен", "sentence", "абзац", "paragraph", "різа", "split"] }, { labelUk: "перекриття й ліміт", labelEn: "overlap and a limit", anyOf: ["перекри", "overlap", "ліміт", "limit", "токен", "token"] }, { labelUk: "метадані й вимір", labelEn: "metadata and a measurement", anyOf: ["джерел", "source", "позиц", "position", "вимір", "measur", "фікс", "fixed"] }],
        sampleUk: "Ріжуть за реченнями, пакують до ліміту токенів із перекриттям близько 10–20%, зберігають джерело й позицію для цитати й перевіряють зміну різки на фіксованому наборі питань, а не наївним зрізом символів.",
        sampleEn: "You split on sentences, you pack up to a token limit with about 10–20% overlap, you store the source and position for a citation, and you measure a splitter change on a fixed question set, not with a naive character slice.",
      }
    ],
    "Контрольна: Pydantic і чанки",
    "Exam: Pydantic and chunks",
    [
      { promptUk: "extra='forbid' у відповіді моделі…", promptEn: "extra='forbid' on a model response…", options: ["робить зайвий ключ помилкою", "ігнорує зайве мовчки", "вимикає типи", "логіть секрети обов'язково"], correctIndex: 0, explanationUk: "Суворий контракт.", explanationEn: "A strict contract." },
      { promptUk: "Невдалий розбір JSON моделі варто…", promptEn: "A failed parse of the model's JSON should…", options: ["дати явну помилку й ретрай або fallback, не тихе {}", "підмінити {}", "вимкнути схему", "змінити Python"], correctIndex: 0, explanationUk: "Помилка видима.", explanationEn: "The error is visible." },
      { promptUk: "Перейменування поля схеми…", promptEn: "Renaming a schema field is…", options: ["несумісна зміна, потрібен адаптер", "завжди сумісне як дефолт", "заміна seed", "ігнорується Pydantic"], correctIndex: 0, explanationUk: "Версіонуйте схему.", explanationEn: "Version the schema." },
      { promptUk: "s[i:i+400] для чанків…", promptEn: "s[i:i+400] for chunks is…", options: ["може розрізати речення посередині", "завжди кращий за речення", "додає метадані сам", "вимірює якість"], correctIndex: 0, explanationUk: "Ріжте за реченнями.", explanationEn: "Split on sentences." },
      { promptUk: "Перекриття чанків потрібне, щоб…", promptEn: "Chunk overlap is needed so…", options: ["не втратити контекст на межі", "збільшити чанки до всього документа", "прибрати метадані", "замінити токени"], correctIndex: 0, explanationUk: "Типово 10–20%.", explanationEn: "Typically 10–20%." },
      { promptUk: "Цитата без джерела й позиції…", promptEn: "A citation without a source and a position is…", options: ["нечесна; зберігайте метадані чанка", "достатня для RAG", "заміна виміру", "вимога Pydantic"], correctIndex: 0, explanationUk: "Користувач має знати звідки.", explanationEn: "The user should know the origin." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandPythonForAi(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
