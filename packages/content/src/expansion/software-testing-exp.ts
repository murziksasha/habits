import type { CourseContent, LessonContent, UnitContent } from "../types.js";
import { expandCourse, sectionUnit, teachLesson } from "./factory.js";

export const newUnits: UnitContent[] = [
  sectionUnit(
    "st_mutation_testing",
    "Мутаційне тестування: чи тести взагалі ловлять помилки",
    "Mutation testing: whether the tests actually catch faults",
    [
      {
        slug: "st-mut-idea",
        titleUk: "Мутант, який вижив, каже більше, ніж зелений звіт",
        titleEn: "A surviving mutant says more than a green report",
        difficulty: 3,
        pointsUk: ["Вижилий мутант — прогалина в тестах, не в покритті рядків", "Ганяйте на критичному й зміненому коді", "Звіт — черга роботи, не метрика для галочки"],
        pointsEn: ["A surviving mutant is a gap in the tests, not in line coverage", "Run it on critical and changed code", "The report is a work queue, not a vanity metric"],
        conceptUk: "Мутаційне тестування навмисно змінює код (оператор, константу, умову) і запускає тести: якщо всі тести зелені, мутант 'вижив' — набору не вистачає, щоб помітити цю зміну. Покриття рядків може бути 100%, а мутант `if (a >= b)` → `if (a > b)` виживає, бо немає випадку рівності. Це інструмент якості тестів, не заміни рев'ю. Його ганяють на критичних модулях і в CI за зміненим кодом, бо повний прогон усього монорепо дорогий. Звіт читають як чергу роботи над тестами, не як 'відсоток заради відсотка'.",
        conceptEn: "Mutation testing deliberately changes the code (an operator, a constant, a condition) and runs the tests: if every test is green, the mutant 'survived' — the suite cannot notice that change. Line coverage can be 100%, and the mutant `if (a >= b)` → `if (a > b)` still survives because there is no equal-values case. It is a tool for test quality, not a substitute for review. You run it on critical modules and in CI on the changed code, because a full monorepo run is expensive. You read the report as a queue of work on the tests, not as 'a percentage for its own sake'.",
        code: "if (amount >= threshold) applyDiscount();\n// mutant: amount > threshold  — killed only by a test where amount == threshold",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Покриття рядків 100%, мутант замінив >= на > і вижив. Що це означає?", promptEn: "Line coverage is 100%, a mutant replaced >= with > and survived. What does that mean?", options: ["немає тесту на межу рівності, хоча рядок виконувався", "мутаційне тестування зламалось", "100% покриття гарантує повноту", "оператори порівнювати не можна"], correctIndex: 0, explanationUk: "Рядок виконувався, але оракул був слабкий.", explanationEn: "The line ran, but the oracle was weak." },
          { kind: "fill", promptUk: "Допишіть статус мутанта, коли тести лишились зеленими", promptEn: "Fill in the mutant's status when the tests stayed green", language: "bash", code: "# pitest: mutant SURVIVED  # tests did not ___ the mutant", accepted: ["kill", "catch", "detect"], caseSensitive: true, explanationUk: "Тести мають 'вбити' мутанта.", explanationEn: "The tests should 'kill' the mutant." },
          { kind: "read", promptUk: "Де розумніше запускати мутації в великому монорепо?", promptEn: "Where is it wiser to run mutations in a large monorepo?", language: "bash", code: "pitest --includes com.payments.pricing --changedSince origin/main", options: ["на критичних пакетах і на зміненому коді, не обов'язково на всьому репо щоночі", "лише на всьому монорепо без фільтра щокомітно", "лише локально без CI", "лише на CSS"], correctIndex: 0, explanationUk: "Вартість прогону має сенс.", explanationEn: "The cost of the run has to make sense." }
        ],
        whyUk: "Чому зелені тести з 100% покриттям рядків можуть пропустити зміну >= на >?",
        whyEn: "Why can green tests with 100% line coverage miss a change from >= to >?",
        ideas: [{ labelUk: "вижилий мутант", labelEn: "a surviving mutant", anyOf: ["мутант", "mutant", "вижив", "surviv", "kill"] }, { labelUk: "немає межі", labelEn: "no boundary case", anyOf: ["меж", "bound", "рівн", "equal", ">="] }, { labelUk: "покриття рядків недостатньо", labelEn: "line coverage is not enough", anyOf: ["покритт", "coverage", "рядок", "line", "оракул", "oracle"] }],
        sampleUk: "Якщо мутант замінив >= на > і тести зелені, мутант вижив: рядок покритий, але немає випадку рівності, тож покриття рядків не доводить силу оракула; такі прогони роблять на критичному й зміненому коді.",
        sampleEn: "If a mutant replaced >= with > and the tests are green, the mutant survived: the line is covered, but there is no equal-values case, so line coverage does not prove the oracle is strong; you run that on critical and changed code.",
      },
      {
        slug: "st-mut-equivalent",
        titleUk: "Еквівалентний мутант: не кожен 'вижилий' вартий нового тесту",
        titleEn: "An equivalent mutant: not every 'survivor' deserves a new test",
        difficulty: 3,
        pointsUk: ["Еквівалент не змінює спостережувану поведінку", "Питання: чи є вхід, де користувач бачить різницю?", "Не роздувайте суіту заради знаменника"],
        pointsEn: ["An equivalent does not change observable behaviour", "The question: is there an input where a user sees a difference?", "Do not bloat the suite for the denominator"],
        conceptUk: "Іноді зміна компілятора або оператора не змінює спостережувану поведінку — еквівалентний мутант. Приклад: `x + 0`, заміна на `x`, або мертвий код за неможливою умовою. Витрачати годину на тест, який 'уб'є' еквівалента, — марна справа; його позначають і виключають із знаменника. Відрізнити еквівалента від справжньої прогалини допомагає питання: чи існує вхід, на якому користувач побачить різницю? Якщо так — це прогалина. Інструменти іноді пропонують підозрілі еквіваленти; рішення лишається за людиною. Не роздувайте суіту тестами на внутрішню формулу, яку специфікація вважає тією самою.",
        conceptEn: "Sometimes a compiler-level or operator change does not change observable behaviour — an equivalent mutant. An example: `x + 0` replaced with `x`, or dead code behind an impossible condition. Spending an hour on a test that 'kills' an equivalent is wasted work; you mark it and exclude it from the denominator. To tell an equivalent from a real gap, ask: is there an input where a user would see a difference? If yes — it is a gap. Tools sometimes flag suspected equivalents; the decision stays with a human. Do not bloat the suite with tests of an internal formula the specification treats as the same.",
        code: "return total + 0; // mutant: return total;  — equivalent, do not pad the suite",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Мутант замінив `return x + 0` на `return x` і вижив. Що робити першим?", promptEn: "A mutant replaced `return x + 0` with `return x` and survived. What do you do first?", options: ["перевірити, чи це еквівалент; не писати тест заради відсотка", "обов'язково додати assert на + 0", "видалити всі тести модуля", "вимкнути мутації назавжди"], correctIndex: 0, explanationUk: "Спочатку спостережувана різниця.", explanationEn: "Observable difference first." },
          { kind: "fill", promptUk: "Допишіть назву мутанта без спостережуваної зміни", promptEn: "Fill in the name of a mutant with no observable change", language: "bash", code: "# this survivor is an ___ mutant — exclude from the score", accepted: ["equivalent", "equiv"], caseSensitive: true, explanationUk: "Еквівалентний мутант.", explanationEn: "An equivalent mutant." },
          { kind: "mcq", promptUk: "Яке питання відрізняє прогалину в тестах від еквівалента?", promptEn: "Which question tells a test gap from an equivalent?", options: ["чи існує вхід, на якому користувач побачить іншу поведінку", "чи покриття рядків нижче 80%", "чи інструмент завжди має рацію", "чи мутант змінив пробіл"], correctIndex: 0, explanationUk: "Спостережувана поведінка — критерій.", explanationEn: "Observable behaviour is the criterion." }
        ],
        whyUk: "Коли вижилий мутант не варто 'вбивати' новим тестом?",
        whyEn: "When should you not 'kill' a surviving mutant with a new test?",
        ideas: [{ labelUk: "еквівалент", labelEn: "an equivalent", anyOf: ["еквівалент", "equivalent", "спостереж", "observ"] }, { labelUk: "немає входу з різницею", labelEn: "no input with a difference", anyOf: ["вхід", "input", "користувач", "user", "різниц", "difference"] }, { labelUk: "не заради відсотка", labelEn: "not for a percentage", anyOf: ["відсот", "score", "знаменник", "denominator", "suite"] }],
        sampleUk: "Якщо мутант не змінює спостережувану поведінку (наприклад x+0), це еквівалент: його позначають і не пишуть тест заради відсотка; новий тест потрібен лише коли існує вхід, де користувач побачить різницю.",
        sampleEn: "If a mutant does not change observable behaviour (for example x+0), it is an equivalent: you mark it and you do not write a test for the percentage; a new test is needed only when there is an input where a user would see a difference.",
      },
      {
        slug: "st-mut-ci",
        titleUk: "Мутації в CI: поріг на змінений код і бюджет часу",
        titleEn: "Mutations in CI: a threshold on changed code and a time budget",
        difficulty: 3,
        pointsUk: ["У CI — змінений код і ліміт часу", "Поріг на зріз, не 100% легасі з дня один", "Регресія скору — сигнал, не змагання команд"],
        pointsEn: ["In CI — changed code and a time limit", "A threshold on a slice, not 100% of legacy from day one", "A score regression is a signal, not a team contest"],
        conceptUk: "Повний мутаційний прогон великого сервісу може тривати години. У CI зазвичай обмежують область: пакети, що змінилися, або директорія модуля, плюс ліміт часу. Поріг (mutation score) ставлять на цей зріз, не вимагають 100% на всьому легасі з першого дня — інакше пайплайн стане церемонією винятків. Регресія скору на зміненому файлі — сигнал написати тест або визнати еквівалента. Кеш і інкрементальні фреймворки (Stryker, PIT з changedSince) роблять перевірку практичною. Не порівнюйте raw score двох команд із різним легасі без контексту.",
        conceptEn: "A full mutation run of a large service can take hours. In CI you usually limit the scope: packages that changed, or a module directory, plus a time limit. You set a threshold (mutation score) on that slice; you do not demand 100% on all legacy from day one — otherwise the pipeline becomes a ceremony of exceptions. A score regression on a changed file is a signal to write a test or to accept an equivalent. Caches and incremental frameworks (Stryker, PIT with changedSince) make the check practical. Do not compare raw scores of two teams with different legacy without context.",
        code: "stryker run --mutate 'src/payments/**' --since origin/main\n# fail PR if mutation score on the slice drops",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Чому вимагати mutation score 100% на всьому старому монорепо в кожному PR шкідливо?", promptEn: "Why is demanding a 100% mutation score on a whole old monorepo in every PR harmful?", options: ["прогон не вкладається в час, з'являються сліпі винятки, сигнал зникає", "100% завжди легко", "мутації не працюють у CI", "легасі не містить мутантів"], correctIndex: 0, explanationUk: "Почніть зі зміненого коду.", explanationEn: "Start with the changed code." },
          { kind: "fill", promptUk: "Допишіть обмеження області PIT", promptEn: "Fill in PIT's scope limit", language: "bash", code: "mvn pitest -D___=origin/main", accepted: ["changedSince", "changedsince"], caseSensitive: true, explanationUk: "changedSince обмежує мутації зміненим кодом.", explanationEn: "changedSince limits mutations to changed code." },
          { kind: "read", promptUk: "Що робити, якщо скор зміненого пакета впав у PR?", promptEn: "What do you do if the changed package's score dropped in a PR?", language: "bash", code: "# mutationScore: 72% → 51% on com.payments.pricing", options: ["дописати тест або пояснити еквівалента, не ігнорувати регресію", "порівняти скор з іншою командою й закрити очі", "вимкнути PIT назавжди", "вимагати 100% на всьому монорепо зараз"], correctIndex: 0, explanationUk: "Регресія — черга роботи.", explanationEn: "A regression is a work queue." }
        ],
        whyUk: "Як вбудувати мутаційне тестування в CI, щоб пайплайн лишився швидким?",
        whyEn: "How do you put mutation testing in CI so the pipeline stays fast?",
        ideas: [{ labelUk: "змінений код", labelEn: "changed code", anyOf: ["changed", "змін", "пакет", "package", "зріз", "slice"] }, { labelUk: "бюджет часу", labelEn: "a time budget", anyOf: ["час", "time", "ліміт", "limit", "кеш", "cache"] }, { labelUk: "поріг не 100% легасі", labelEn: "not a 100% legacy threshold", anyOf: ["поріг", "threshold", "легасі", "legacy", "регрес", "regress"] }],
        sampleUk: "У CI обмежують мутації зміненим кодом і бюджетом часу, ставлять поріг на цей зріз, а не 100% на всьому легасі, і регресію скору розбирають тестом або еквівалентом — так сигнал лишається, а пайплайн не стає церемонією.",
        sampleEn: "In CI you limit mutations to changed code and a time budget, you set a threshold on that slice rather than 100% on all legacy, and you handle a score regression with a test or an equivalent — the signal stays, and the pipeline does not become a ceremony.",
      }
    ],
    "Контрольна: мутації",
    "Exam: mutation testing",
    [
      { promptUk: "Вижилий мутант при 100% покритті рядків означає…", promptEn: "A surviving mutant at 100% line coverage means…", options: ["оракул тестів слабкий для цієї зміни", "покриття завжди бреше про рядки", "інструмент зламаний", "треба видалити модуль"], correctIndex: 0, explanationUk: "Покриття ≠ сила перевірок.", explanationEn: "Coverage is not oracle strength." },
      { promptUk: "Еквівалентний мутант…", promptEn: "An equivalent mutant is…", options: ["не змінює спостережувану поведінку; не завжди вартий нового тесту", "завжди прогалина в суіті", "заміна mutation score", "помилка компілятора обов'язково"], correctIndex: 0, explanationUk: "Спочатку питання про вхід користувача.", explanationEn: "First the question about a user-visible input." },
      { promptUk: "У великому CI мутації варто обмежувати…", promptEn: "In a large CI, mutations should be limited to…", options: ["зміненим або критичним кодом і бюджетом часу", "усім монорепо в кожному PR без ліміту", "лише CSS", "лише локальною машиною"], correctIndex: 0, explanationUk: "Практичний зріз.", explanationEn: "A practical slice." },
      { promptUk: "Регресія mutation score на зміненому пакеті…", promptEn: "A mutation-score regression on a changed package is…", options: ["сигнал дописати тест або визнати еквівалента", "привід порівнювати команди", "ігнорується завжди", "вимога 100% легасі"], correctIndex: 0, explanationUk: "Черга роботи.", explanationEn: "A work queue." },
      { promptUk: "Зміна >= на > часто виживає, бо…", promptEn: "A change from >= to > often survives because…", options: ["немає тесту на випадок рівності", "рядки не покриті за визначенням", "мутації не вміють умови", "CI вимкнений"], correctIndex: 0, explanationUk: "Межовий випадок.", explanationEn: "A boundary case." },
      { promptUk: "Mutation score двох команд без контексту легасі…", promptEn: "The mutation scores of two teams without legacy context are…", options: ["погана основа для змагання", "єдина справедлива метрика року", "заміна рев'ю коду", "поріг CI обов'язково"], correctIndex: 0, explanationUk: "Контекст важливий.", explanationEn: "Context matters." }
    ],
  ),
  sectionUnit(
    "st_property_flaky",
    "Властивості, випадковість і нестабільні тести",
    "Properties, randomness, and flaky tests",
    [
      {
        slug: "st-pbt-props",
        titleUk: "Property-based: інваріант на багатьох входах, не один приклад",
        titleEn: "Property-based: an invariant on many inputs, not one example",
        difficulty: 3,
        pointsUk: ["Інваріант на згенерованих входах, shrink до малого контрприкладу", "Межі в генераторі, не лише 'щасливі' дані", "Приклади лишаються документацією"],
        pointsEn: ["An invariant on generated inputs, shrunk to a small counterexample", "Edges in the generator, not only 'happy' data", "Examples remain documentation"],
        conceptUk: "Прикладові тести фіксують кілька входів; property-based (fast-check, Hypothesis, QuickCheck) генерує десятки й сотні й перевіряє інваріант: decode(encode(x)) === x, сума сплат дорівнює рахунку, сортування зберігає довжину й мінімум. Важко написати властивість — це сигнал, що ви ще не розумієте контракт. Коли тест падає, фреймворк зменшує (shrink) контрприклад до малого входу — його варто зберегти як регресійний приклад. Генератори мають покривати межі (порожній рядок, 0, великі числа), інакше це ті самі щасливі випадки. Не замінюйте всі приклади: зрозумілий приклад лишається документацією.",
        conceptEn: "Example tests pin a few inputs; property-based tests (fast-check, Hypothesis, QuickCheck) generate dozens and hundreds and check an invariant: decode(encode(x)) === x, the payments sum to the bill, a sort keeps length and the minimum. A property that is hard to write is a signal that you do not yet understand the contract. When a test fails, the framework shrinks the counterexample to a small input — you should keep that as a regression example. Generators must cover edges (empty string, 0, large numbers), or you are back to the same happy cases. Do not replace every example: a clear example stays as documentation.",
        code: "fc.assert(fc.property(fc.json(), (x) => deepEqual(decode(encode(x)), x)))",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Навіщо зберігати зменшений контрприклад як окремий тест?", promptEn: "Why keep a shrunk counterexample as a separate test?", options: ["це швидка регресія й зрозумілий вхід, який уже ловив дірку", "shrink забороняє приклади", "генератор тоді вимикається", "інваріант більше не потрібен"], correctIndex: 0, explanationUk: "Малий вхід — документація падіння.", explanationEn: "A small input documents the failure." },
          { kind: "fill", promptUk: "Допишіть типовий інваріант серіалізації", promptEn: "Fill in a typical serialization invariant", language: "javascript", code: "fc.assert(fc.property(fc.json(), (x) => deepEqual(decode(___(x)), x)))", accepted: ["encode", "serialize", "stringify"], caseSensitive: true, explanationUk: "decode(encode(x)) === x.", explanationEn: "decode(encode(x)) === x." },
          { kind: "read", promptUk: "Чому генератор лише з додатних парних чисел слабкий для функції abs?", promptEn: "Why is a generator of only positive even numbers weak for an abs function?", language: "javascript", code: "fc.nat().filter(n => n % 2 === 0)  // never 0? maybe; never negative", options: ["немає від'ємних і, можливо, нуля — інваріант не перевіряється на межах", "парні завжди ламають abs", "Hypothesis не вміє nat", "abs не має інваріантів"], correctIndex: 0, explanationUk: "Генератор має бачити межі.", explanationEn: "The generator must see the edges." }
        ],
        whyUk: "Як перевірити серіалізацію сильніше, ніж одним прикладом {a:1}?",
        whyEn: "How do you check serialization more strongly than with a single {a:1} example?",
        ideas: [{ labelUk: "інваріант encode/decode", labelEn: "an encode/decode invariant", anyOf: ["decode", "encode", "інваріант", "invariant"] }, { labelUk: "багато входів і shrink", labelEn: "many inputs and shrink", anyOf: ["генерат", "generat", "shrink", "контр", "counter"] }, { labelUk: "приклад лишається", labelEn: "the example stays", anyOf: ["приклад", "example", "документац", "document"] }],
        sampleUk: "Пишуть властивість decode(encode(x))===x на згенерованих входах із межами, зберігають зменшений контрприклад як регресію й лишають зрозумілий приклад як документацію — один {a:1} цього не замінює.",
        sampleEn: "You write a decode(encode(x))===x property on generated inputs with edges, you keep the shrunk counterexample as a regression, and you leave a clear example as documentation — a single {a:1} does not replace that.",
      },
      {
        slug: "st-flaky-cause",
        titleUk: "Нестабільний тест: спочатку причина, не 'перезапусти ще раз'",
        titleEn: "A flaky test: the cause first, not 'run it again'",
        difficulty: 3,
        pointsUk: ["Шукайте причину нестабільності, не rerun як норму", "Ізоляція: годинник, дані, насіння, умова замість sleep", "Зовнішній SaaS — не юніт-тест"],
        pointsEn: ["Look for the cause of flakiness, do not make reruns the norm", "Isolation: clock, data, seed, a condition instead of sleep", "External SaaS is not a unit test"],
        conceptUk: "Нестабільний (flaky) тест іноді червоний, іноді зелений без зміни коду. Типові причини: час і гонки, залежність від порядку тестів, зовнішній мережевий сервіс, неізольована БД, випадковість без насіння, анімації в UI. 'Перезапустити CI' ховає сигнал і дорожчає пайплайн. Ізолюйте: фейкові годинники, унікальні дані, стабільне насіння, очікування за умовою, не sleep(1000). Якщо тест перевіряє чужий SaaS — це вже не юніт, винесіть у контрактний чи ручний шар. Кількість rerun у CI має бути нулем або тимчасовим винятком із тикетом, не нормою.",
        conceptEn: "A flaky test is sometimes red and sometimes green with no code change. Typical causes: time and races, order dependence, an external network service, a shared database, randomness without a seed, UI animations. 'Rerun CI' hides the signal and makes the pipeline more expensive. Isolate: fake clocks, unique data, a stable seed, waiting on a condition, not sleep(1000). If the test checks someone else's SaaS, it is not a unit anymore — move it to a contract or manual layer. The number of CI reruns should be zero, or a temporary exception with a ticket, not the norm.",
        code: "// bad: await sleep(1000); expect(screen.getByText('Saved')).toBeVisible()\n// good: await screen.findByText('Saved')",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому sleep(1000) перед expect у UI-тесті часто народжує flake?", promptEn: "Why does sleep(1000) before an expect in a UI test often create a flake?", options: ["час іноді більший за секунду, іноді анімація вже минула; чекайте умови", "sleep завжди стабільний", "CI забороняє умови", "одна секунда — стандарт WCAG"], correctIndex: 0, explanationUk: "Чекайте появи елемента, не годинника.", explanationEn: "Wait for the element, not the clock." },
          { kind: "fill", promptUk: "Допишіть, чого не вистачає випадковому генератору в тесті", promptEn: "Fill in what a random generator in a test is missing", language: "javascript", code: "fc.configureGlobal({ ___: 12345 })  // reproducible failures", accepted: ["seed"], caseSensitive: true, explanationUk: "Насіння робить падіння відтворюваним.", explanationEn: "A seed makes a failure reproducible." },
          { kind: "read", promptUk: "Що зробити з юніт-тестом, який ходить у реальний платіжний SaaS?", promptEn: "What should you do with a unit test that hits a real payments SaaS?", language: "javascript", code: "await fetch('https://pay.example/charge')", options: ["винести з юнітів: мок/контракт; rerun не лікує чужий простій", "додати три rerun і вважати це нормою", "збільшити sleep до 10 секунд", "вимкнути затвердження карток"], correctIndex: 0, explanationUk: "Шар тесту має відповідати залежності.", explanationEn: "The test layer must match the dependency." }
        ],
        whyUk: "Як лікувати тест, який червоний лише іноді в CI?",
        whyEn: "How do you treat a test that is only sometimes red in CI?",
        ideas: [{ labelUk: "знайти причину", labelEn: "find the cause", anyOf: ["причин", "cause", "гонка", "race", "час", "time", "flake"] }, { labelUk: "ізоляція, не sleep", labelEn: "isolation, not sleep", anyOf: ["ізол", "isolat", "seed", "годин", "clock", "sleep"] }, { labelUk: "rerun не норма", labelEn: "a rerun is not the norm", anyOf: ["rerun", "перезап", "тикет", "ticket", "saas"] }],
        sampleUk: "Шукають причину (гонка, час, спільна БД, SaaS), ізолюють годинником, насінням і очікуванням умови замість sleep, а rerun у CI не роблять нормою — інакше сигнал ховається.",
        sampleEn: "You look for the cause (a race, time, a shared DB, SaaS), you isolate with a clock, a seed, and waiting on a condition instead of sleep, and you do not make CI reruns the norm — otherwise the signal is hidden.",
      },
      {
        slug: "st-flaky-quarantine",
        titleUk: "Карантин нестабільного тесту — короткий і видимий",
        titleEn: "A flaky-test quarantine is short and visible",
        difficulty: 3,
        pointsUk: ["Карантин із власником і датою, не кладовище", "Повертають після фіксу причини", "Критичний сценарій не ховають у карантині"],
        pointsEn: ["A quarantine with an owner and a date, not a graveyard", "They return after the cause is fixed", "A critical scenario is not hidden in quarantine"],
        conceptUk: "Якщо flake блокує весь пайплайн, його іноді карантинують: вимикають у основному прогоні, але він лишається видимим у звіті з власником, датою повернення й тикетом. Карантин без терміну — тихе кладовище тестів, які вже нічого не захищають. Метрика 'кількість тестів у карантині' має бути на дашборді команди. Повернення супроводжують фіксом причини, не 'здається, вже не падає'. Не карантинуйте цілий файл через один кейс. Не ховайте падіння продакшену за карантином критичного сценарію — тоді краще зупинити реліз і лікувати.",
        conceptEn: "If a flake blocks the whole pipeline, it is sometimes quarantined: taken out of the main run, but still visible in a report with an owner, a return date, and a ticket. A quarantine with no deadline is a quiet graveyard of tests that no longer protect anything. The metric 'how many tests are in quarantine' belongs on the team's dashboard. Coming back is accompanied by a fix of the cause, not 'it seems to pass now'. Do not quarantine a whole file because of one case. Do not hide a production failure behind quarantining a critical scenario — then it is better to stop the release and fix it.",
        code: "# quarantine.yaml: owner, review_by, ticket; dashboard: quarantine_count\n# return only after the race/clock/seed is fixed",
        language: "yaml",
        retrieval: [
          { kind: "mcq", promptUk: "Чому 'skip назавжди' без тикета гірший за карантин на 7 днів?", promptEn: "Why is 'skip forever' with no ticket worse than a 7-day quarantine?", options: ["тест зникає з огляду й більше нічого не захищає, без відповідального", "skip завжди швидший і кращий", "карантин заборонений у CI", "тикет вимикає метрики"], correctIndex: 0, explanationUk: "Видимість і термін — суть карантину.", explanationEn: "Visibility and a deadline are the point of quarantine." },
          { kind: "fill", promptUk: "Допишіть обов'язкове поле карантину", promptEn: "Fill in a mandatory quarantine field", language: "yaml", code: "quarantine: { test: checkout.spec.ts:42, owner: payments, review_by: '2026-11-20', ___ : PLAY-441 }", accepted: ["ticket", "issue", "jira"], caseSensitive: true, explanationUk: "Тикет прив'язує роботу.", explanationEn: "A ticket ties the work." },
          { kind: "mcq", promptUk: "Критичний тест оплати став flake перед релізом. Що не варто робити?", promptEn: "A critical payment test became flaky before a release. What should you not do?", options: ["назавжди сховати його в карантин і релізити як ніби все зелене", "зупинитись і шукати причину", "короткий карантин лише якщо ризик усвідомлений і видимий", "зафіксувати в звіті релізу"], correctIndex: 0, explanationUk: "Критичний захист не закопують.", explanationEn: "Critical protection is not buried." }
        ],
        whyUk: "Як карантинувати нестабільний тест, щоб він не зник назавжди?",
        whyEn: "How do you quarantine a flaky test so it does not vanish forever?",
        ideas: [{ labelUk: "власник і дата", labelEn: "an owner and a date", anyOf: ["влас", "owner", "дата", "date", "review"] }, { labelUk: "тикет", labelEn: "a ticket", anyOf: ["тикет", "ticket", "issue", "видимий", "visible"] }, { labelUk: "фікс причини, не skip назавжди", labelEn: "a fix of the cause, not skip forever", anyOf: ["фікс", "fix", "skip", "назавжди", "forever", "критичн", "critical"] }],
        sampleUk: "Карантин ставлять із власником, датою повернення й тикетом, на дашборді видно кількість, повертають після фіксу причини; skip назавжди й ховання критичного сценарію перетворюють захист на кладовище.",
        sampleEn: "You quarantine with an owner, a return date, and a ticket, the count is on the dashboard, and the test returns after the cause is fixed; skip-forever and hiding a critical scenario turn protection into a graveyard.",
      }
    ],
    "Контрольна: властивості й flake",
    "Exam: properties and flakes",
    [
      { promptUk: "Property-based перевіряє…", promptEn: "Property-based testing checks…", options: ["інваріант на багатьох згенерованих входах", "лише один приклад {a:1}", "покриття рядків", "час sleep"], correctIndex: 0, explanationUk: "Інваріант і генератор.", explanationEn: "An invariant and a generator." },
      { promptUk: "Зменшений контрприклад варто…", promptEn: "A shrunk counterexample should be…", options: ["зберегти як швидкий регресійний приклад", "видалити, бо генератор і так ловить", "замінити на sleep", "ігнорувати"], correctIndex: 0, explanationUk: "Малий вхід документує дірку.", explanationEn: "A small input documents the hole." },
      { promptUk: "sleep(1000) у UI-тесті…", promptEn: "sleep(1000) in a UI test is…", options: ["часто джерело flake; чекайте умови", "найстабільніший патерн", "заміна насіння", "обов'язковий у CI"], correctIndex: 0, explanationUk: "Очікування за умовою.", explanationEn: "Wait on a condition." },
      { promptUk: "Rerun як норма в CI…", promptEn: "Reruns as the norm in CI…", options: ["ховають сигнал і дорожчають пайплайн", "лікують причину flake", "замінюють насіння", "обов'язкові для PBT"], correctIndex: 0, explanationUk: "Спочатку причина.", explanationEn: "The cause first." },
      { promptUk: "Карантин без дати й власника…", promptEn: "A quarantine with no date and no owner is…", options: ["кладовище тестів, які вже не захищають", "зразкова практика", "заміна інваріанта", "метрика покриття"], correctIndex: 0, explanationUk: "Термін і видимість.", explanationEn: "A deadline and visibility." },
      { promptUk: "Генератор без меж (лише 'щасливі' дані)…", promptEn: "A generator with no edges (only 'happy' data) is…", options: ["слабкий: інваріант не бачить порожнє, нуль, велике", "достатній завжди", "заборонений у Hypothesis", "заміна shrink"], correctIndex: 0, explanationUk: "Межі в генераторі.", explanationEn: "Edges in the generator." }
    ],
  ),
  sectionUnit(
    "st_perf_impact",
    "Навантаження, вплив змін і візуальні регресії",
    "Load, change impact, and visual regressions",
    [
      {
        slug: "st-perf-goals",
        titleUk: "Тест навантаження без SLO — це графік без питання",
        titleEn: "A load test without an SLO is a chart without a question",
        difficulty: 3,
        pointsUk: ["Спочатку SLO й питання, потім графік", "Реалістичне навантаження й дані", "Висновок pass/fail по хвосту й помилках"],
        pointsEn: ["An SLO and a question first, then a chart", "Realistic load and data", "A pass/fail conclusion on the tail and the errors"],
        conceptUk: "Перед тестом навантаження формулюють питання: 'p95 латентності checkout < 300 мс при 200 RPS, помилки < 0.1%'. Без SLO ви отримаєте гарний графік і суперечку. Навантаження має бути реалістичним (суміш читання/запису, розігрів кешу, дані близькі до прод), інакше ви тестуєте іншу систему. Розрізняють smoke (малий обсяг кожної збірки), тест потужності перед сезоном, і стрес до відмови — різні цілі. Дивляться не лише середнє, а хвіст і помилки, насичення CPU/IO, і де саме черга. Після тесту — висновок 'проходимо / не проходимо SLO', не лише скрін Grafana.",
        conceptEn: "Before a load test you state a question: 'checkout p95 latency < 300 ms at 200 RPS, errors < 0.1%'. Without an SLO you get a pretty chart and an argument. The load should be realistic (a mix of reads and writes, a warmed cache, data close to prod), or you are testing a different system. Distinguish a smoke load (a small volume on every build), a capacity test before a season, and a stress-to-failure — they are different goals. Look not only at the average, but at the tail and the errors, CPU/IO saturation, and where the queue is. After the test — a 'we meet / we do not meet the SLO' conclusion, not only a Grafana screenshot.",
        code: "# SLO: checkout p95 < 300ms @ 200 RPS, errors < 0.1%\nk6 run --rps 200 --duration 10m checkout.js",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Чому середня латентність 80 мс при p95 2 с не є успіхом, якщо SLO — p95 < 300 мс?", promptEn: "Why is an average latency of 80 ms with a p95 of 2 s not a success if the SLO is p95 < 300 ms?", options: ["користувач хвоста не вкладається в SLO; середнє ховає проблему", "середнє завжди важливіше за p95", "2 с — норма для checkout", "SLO не дивиться хвіст"], correctIndex: 0, explanationUk: "Хвіст — частина обіцянки.", explanationEn: "The tail is part of the promise." },
          { kind: "fill", promptUk: "Допишіть одиницю інтенсивності навантаження", promptEn: "Fill in the unit of load intensity", language: "bash", code: "k6 run --rps 200 checkout.js  # 200 ___", accepted: ["RPS", "rps", "requests"], caseSensitive: true, explanationUk: "RPS — запитів на секунду.", explanationEn: "RPS is requests per second." },
          { kind: "read", promptUk: "Чим поганий тест навантаження на порожній кеш і 10 рядках у БД?", promptEn: "What is wrong with a load test on an empty cache and 10 database rows?", language: "bash", code: "k6 run -u 200 empty-dev.json", options: ["це інша система, ніж прод із теплим кешем і мільйонами рядків", "k6 не вміє dev", "порожній кеш завжди кращий", "10 рядків гарантують p95"], correctIndex: 0, explanationUk: "Дані й розігрів мають бути близькі до прод.", explanationEn: "Data and warmup should be close to prod." }
        ],
        whyUk: "Як спланувати тест навантаження checkout, щоб результат можна було прийняти чи відхилити?",
        whyEn: "How do you plan a checkout load test so the result can be accepted or rejected?",
        ideas: [{ labelUk: "SLO як питання", labelEn: "an SLO as the question", anyOf: ["slo", "p95", "300", "питання", "question"] }, { labelUk: "реалістичне навантаження", labelEn: "realistic load", anyOf: ["реаліст", "realistic", "кеш", "cache", "дані", "data", "rps"] }, { labelUk: "висновок pass/fail", labelEn: "a pass/fail conclusion", anyOf: ["pass", "fail", "хвіст", "tail", "помилк", "error"] }],
        sampleUk: "Спочатку ставлять SLO (p95, RPS, частка помилок), ганяють реалістичне навантаження на даних і розігрітому кеші й завершують висновком pass/fail по хвосту, а не середнім і скріном графіка.",
        sampleEn: "You first set an SLO (p95, RPS, error fraction), you run a realistic load on realistic data and a warm cache, and you finish with a pass/fail on the tail, not with an average and a chart screenshot.",
      },
      {
        slug: "st-tia-select",
        titleUk: "Test impact: не ганяти все, але й не пропустити залежне",
        titleEn: "Test impact: do not run everything, but do not miss dependents",
        difficulty: 3,
        pointsUk: ["TIA скорочує CI навколо обов'язкового smoke", "Помилка графу = хибний зелений; граф оновлюють", "У лозі — чому тест не обрали"],
        pointsEn: ["TIA shortens CI around a mandatory smoke", "A graph error is a false green; you update the graph", "The log says why a test was not selected"],
        conceptUk: "Test impact analysis обирає тести, яких торкнулась зміна: за графом залежностей, покриттям або історичними падіннями. Це скорочує CI, але помилка в графі (забутий інтеграційний тест, динамічний імпорт, конфіг поза графом) дає хибний зелений. Тому критичний набір (smoke, оплата, логін) ганяють завжди, а TIA — навколо нього. Після інциденту 'TIA пропустив тест' граф оновлюють, не вимикають аналіз. Покриття як єдине джерело графу крихке для генерованого коду. Пояснюйте в лозі CI, чому тест не потрапив у прогін — інакше довіра зникне.",
        conceptEn: "Test impact analysis selects the tests a change touched: from a dependency graph, from coverage, or from historical failures. That shortens CI, but a graph error (a forgotten integration test, a dynamic import, config outside the graph) gives a false green. So a critical set (smoke, payment, login) always runs, and TIA runs around it. After an incident 'TIA skipped a test', you update the graph; you do not turn the analysis off. Coverage as the only graph source is fragile for generated code. Explain in the CI log why a test was not selected — otherwise trust disappears.",
        code: "# always: smoke, login, payment\n# tia: related unit tests from the graph; log skipped + reason",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Чому навіть з TIA логін і оплату варто ганяти в кожному PR?", promptEn: "Why should login and payment still run in every PR even with TIA?", options: ["помилка графу не повинна пропускати критичний шлях", "TIA забороняє smoke", "критичні тести завжди коротші за 1 мс", "графік навантаження замінює їх"], correctIndex: 0, explanationUk: "Обов'язковий набір — страховка.", explanationEn: "A mandatory set is insurance." },
          { kind: "fill", promptUk: "Допишіть аналіз, що обирає тести за зміною", promptEn: "Fill in the analysis that selects tests from a change", language: "bash", code: "jest --___  # or a coverage-based test impact tool", accepted: ["changedSince", "onlyChanged", "findRelatedTests", "tia"], caseSensitive: true, explanationUk: "Інструменти related/changed/TIA обирають зріз.", explanationEn: "Related/changed/TIA tools select a slice." },
          { kind: "read", promptUk: "Що зробити після інциденту, коли TIA не вибрав інтеграційний тест через динамічний import()?", promptEn: "What do you do after an incident where TIA skipped an integration test because of a dynamic import()?", language: "javascript", code: "const mod = await import(process.env.PLUGIN)", options: ["оновити граф (явні ребра чи завжди-ганяти), не вимикати TIA мовчки", "назавжди ганяти весь монорепо без обговорення графу", "видалити інтеграційні тести", "вимкнути CI"], correctIndex: 0, explanationUk: "Лікують граф, зберігають аналіз.", explanationEn: "You fix the graph and keep the analysis." }
        ],
        whyUk: "Як скоротити CI за допомогою TIA, не отримуючи хибний зелений?",
        whyEn: "How do you shorten CI with TIA without getting a false green?",
        ideas: [{ labelUk: "обов'язковий smoke", labelEn: "a mandatory smoke", anyOf: ["smoke", "оплат", "payment", "логін", "login", "завжди", "always"] }, { labelUk: "граф і його дірки", labelEn: "the graph and its holes", anyOf: ["граф", "graph", "динаміч", "dynamic", "import"] }, { labelUk: "пояснення в лозі", labelEn: "an explanation in the log", anyOf: ["лог", "log", "чому", "why", "довіра", "trust"] }],
        sampleUk: "Критичний smoke ганяють завжди, TIA обирає решту за графом, дірки (динамічний імпорт) закривають явними ребрами, а в лозі CI видно, чому тест не обрали — так скорочення не стає хибним зеленим.",
        sampleEn: "A critical smoke always runs, TIA selects the rest from the graph, holes (a dynamic import) are closed with explicit edges, and the CI log shows why a test was not selected — so the shortening does not become a false green.",
      },
      {
        slug: "st-visual-reg",
        titleUk: "Візуальна регресія: скрін як оракул, і його шум",
        titleEn: "Visual regression: a screenshot as an oracle, and its noise",
        difficulty: 3,
        pointsUk: ["Скрін ловить layout, юніт — ні", "Приберіть шум: годинник, анімації, маски", "Еталон оновлюють у PR, не accept-all"],
        pointsEn: ["A screenshot catches layout, a unit test does not", "Remove noise: clock, animations, masks", "A baseline is updated in a PR, not accept-all"],
        conceptUk: "Візуальні тести порівнюють скрін з еталоном (Playwright, Chromatic, Percy). Вони ловлять зламаний layout, який юніт не бачить. Шум — різні шрифти, анімації, час, дані, anti-aliasing на іншій ОС — дає хибні падіння; тому фіксують теми, локаль, годинник, вимикають анімації, маскують динамічні ділянки (дата, аватар). Еталон оновлюють свідомо в PR із прев'ю, не 'accept all' після зміни CSS на всьому сайті. Поріг різниці (відсоток пікселів) ховає дрібні, але важливі дірки (зникла ціна). Критичні екрани тримають суворішими за другорядні.",
        conceptEn: "Visual tests compare a screenshot to a baseline (Playwright, Chromatic, Percy). They catch a broken layout that a unit test does not see. Noise — different fonts, animations, time, data, anti-aliasing on another OS — produces false failures; so you pin themes, locale, and the clock, you turn animations off, and you mask dynamic regions (a date, an avatar). You update a baseline deliberately in a PR with a preview, not 'accept all' after a CSS change across the site. A difference threshold (a percentage of pixels) can hide a small but important hole (a missing price). Critical screens are held to a stricter standard than secondary ones.",
        code: "await expect(page).toHaveScreenshot('cart.png', {\n  animations: 'disabled', mask: [page.getByTestId('clock')], maxDiffPixels: 0\n})",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому 'accept all' після великого рефакторингу CSS небезпечний?", promptEn: "Why is 'accept all' after a large CSS refactor dangerous?", options: ["можна прийняти справжній злам (зникла кнопка) разом із навмисними змінами", "еталони не можна змінювати ніколи", "CSS не впливає на скрін", "пороги тоді стають 0"], correctIndex: 0, explanationUk: "Прев'ю кожного еталона.", explanationEn: "A preview of each baseline." },
          { kind: "fill", promptUk: "Допишіть, що маскують на скріні кошика", promptEn: "Fill in what you mask on a cart screenshot", language: "javascript", code: "await expect(page).toHaveScreenshot({ mask: [page.getByTestId('___')] })  // changes every second", accepted: ["clock", "time", "date", "timestamp"], caseSensitive: true, explanationUk: "Динамічний час маскують.", explanationEn: "Dynamic time is masked." },
          { kind: "read", promptUk: "Чим ризикований поріг 'ігнорувати до 5% пікселів' на екрані оплати?", promptEn: "What is the risk of a 'ignore up to 5% of pixels' threshold on a payment screen?", language: "javascript", code: "maxDiffPixelRatio: 0.05", options: ["може сховати зниклу ціну або кнопку, що займає менше 5%", "5% завжди безпечні", "візуальні тести тоді зайві", "маска годинника заборонена"], correctIndex: 0, explanationUk: "Критичний екран — суворіший поріг.", explanationEn: "A critical screen gets a stricter threshold." }
        ],
        whyUk: "Як налаштувати візуальні тести кошика, щоб ловити злам верстки, а не час на годиннику?",
        whyEn: "How do you set up cart visual tests so they catch a layout break, not the clock time?",
        ideas: [{ labelUk: "маска динаміки", labelEn: "a mask on dynamics", anyOf: ["маск", "mask", "час", "clock", "дата", "date"] }, { labelUk: "фіксовані тема й локаль", labelEn: "a fixed theme and locale", anyOf: ["тема", "theme", "локал", "locale", "анімац", "animation"] }, { labelUk: "свідомий еталон", labelEn: "a deliberate baseline", anyOf: ["еталон", "baseline", "accept", "поріг", "threshold", "цін", "price"] }],
        sampleUk: "Фіксують тему, локаль і годинник, маскують динамічні ділянки, еталон оновлюють у PR з прев'ю, а на екрані кошика тримають суворий поріг, щоб не сховати зниклу ціну під 'accept all' чи 5% шуму.",
        sampleEn: "You pin the theme, locale, and clock, you mask dynamic regions, you update the baseline in a PR with a preview, and on the cart screen you keep a strict threshold so a missing price is not hidden under 'accept all' or 5% noise.",
      }
    ],
    "Контрольна: навантаження й вплив",
    "Exam: load and impact",
    [
      { promptUk: "Тест навантаження без SLO дає…", promptEn: "A load test without an SLO gives…", options: ["графік без критерію pass/fail", "автоматичний висновок", "гарантований p95", "заміну TIA"], correctIndex: 0, explanationUk: "Спочатку питання.", explanationEn: "The question first." },
      { promptUk: "Середнє 80 мс і p95 2 с при SLO p95 < 300 мс…", promptEn: "An 80 ms average and a 2 s p95 with an SLO of p95 < 300 ms is…", options: ["провал хвоста, не успіх середнього", "успіх, бо середнє низьке", "ігнорується", "заміна RPS"], correctIndex: 0, explanationUk: "Хвіст входить у SLO.", explanationEn: "The tail is in the SLO." },
      { promptUk: "TIA має працювати…", promptEn: "TIA should run…", options: ["навколо обов'язкового критичного smoke", "замість логіну й оплати завжди", "лише раз на рік", "без логу пропусків"], correctIndex: 0, explanationUk: "Страховка критичного шляху.", explanationEn: "Insurance for the critical path." },
      { promptUk: "'Accept all' еталонів після великого CSS…", promptEn: "'Accept all' on baselines after a large CSS change is…", options: ["ризик прийняти справжній злам", "обов'язкова практика", "заміна маски", "поріг 0"], correctIndex: 0, explanationUk: "Прев'ю кожного скріна.", explanationEn: "A preview of each screen." },
      { promptUk: "Порожній кеш і 10 рядків у тесті навантаження…", promptEn: "An empty cache and 10 rows in a load test are…", options: ["інша система, ніж прод", "найкращий реалізм", "гарантія p95", "SLO за замовчуванням"], correctIndex: 0, explanationUk: "Дані близькі до прод.", explanationEn: "Data close to prod." },
      { promptUk: "Поріг 5% пікселів на екрані оплати…", promptEn: "A 5% pixel threshold on a payment screen can…", options: ["сховати зниклу ціну чи кнопку", "завжди бути безпечним", "замінити SLO", "вимкнути маски"], correctIndex: 0, explanationUk: "Суворіший поріг для критичного.", explanationEn: "A stricter threshold for the critical." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandSoftwareTesting(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
