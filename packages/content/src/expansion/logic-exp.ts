import type { CourseContent, UnitContent } from "../types.js";
import { expandCourse } from "./factory.js";

const newUnits: UnitContent[] = [
  {
    slug: "propositional",
    titleUk: "Пропозиційна логіка",
    titleEn: "Propositional logic",
    lessons: [
      {
        slug: "lg-truth-tables",
        titleUk: "Таблиці істинності",
        titleEn: "Truth tables",
        baseXp: 22,
        difficulty: 3,
        isFree: true,
        exercises: [
          {"id": "lg-tt-1", "type": "logic_puzzle", "promptUk": "Який рядок для A ∧ B є істинним?", "promptEn": "Which row is true for A ∧ B?", "category": "propositional", "difficulty": 2, "options": ["A=true, B=true", "A=true, B=false", "A=false, B=true", "A=false, B=false"], "correctIndex": 0, "hintUk": "Кон'юнкція істинна лише коли обидва істинні.", "hintEn": "Conjunction is true only when both are true."},
          {"id": "lg-tt-2", "type": "logic_puzzle", "promptUk": "Коли A ∨ B хибна?", "promptEn": "When is A ∨ B false?", "category": "propositional", "difficulty": 2, "options": ["обидва хибні", "достатньо одного хибного", "коли A істинна", "ніколи"], "correctIndex": 0, "hintUk": "Диз'юнкція хибна лише якщо обидва хибні.", "hintEn": "Disjunction is false only if both are false."},
          {"id": "lg-tt-3", "type": "logic_puzzle", "promptUk": "Чому дорівнює ¬(true)?", "promptEn": "What is ¬(true)?", "category": "propositional", "difficulty": 1, "options": ["false", "true", "невизначено", "true ∧ false"], "correctIndex": 0, "hintUk": "Заперечення інвертує значення.", "hintEn": "Negation flips the value."}
        ],
      },
      {
        slug: "lg-demorgan",
        titleUk: "Закони де Моргана",
        titleEn: "De Morgan's laws",
        baseXp: 22,
        difficulty: 3,
        isFree: false,
        exercises: [
          {"id": "lg-dm-1", "type": "logic_puzzle", "promptUk": "¬(A ∧ B) еквівалентне:", "promptEn": "¬(A ∧ B) is equivalent to:", "category": "propositional", "difficulty": 3, "options": ["¬A ∨ ¬B", "¬A ∧ ¬B", "A ∨ B", "A ∧ ¬B"], "correctIndex": 0, "hintUk": "Заперечення кон'юнкції — диз'юнкція заперечень.", "hintEn": "The negation of a conjunction is a disjunction of negations."},
          {"id": "lg-dm-2", "type": "logic_puzzle", "promptUk": "¬(A ∨ B) еквівалентне:", "promptEn": "¬(A ∨ B) is equivalent to:", "category": "propositional", "difficulty": 3, "options": ["¬A ∧ ¬B", "¬A ∨ ¬B", "A ∧ B", "¬(¬A ∧ ¬B)"], "correctIndex": 0, "hintUk": "Заперечення диз'юнкції — кон'юнкція заперечень.", "hintEn": "The negation of a disjunction is a conjunction of negations."},
          {"id": "lg-dm-3", "type": "logic_puzzle", "promptUk": "У коді if (!(ready && valid)) який еквівалент?", "promptEn": "In code, if (!(ready && valid)) is equivalent to?", "category": "propositional", "difficulty": 3, "options": ["if (!ready || !valid)", "if (!ready && !valid)", "if (ready || valid)", "if (ready && !valid)"], "correctIndex": 0, "hintUk": "Це пряме застосування де Моргана до умови.", "hintEn": "That is De Morgan applied directly to the condition."}
        ],
      },
      {
        slug: "lg-implication",
        titleUk: "Імплікація і контрапозиція",
        titleEn: "Implication and contraposition",
        baseXp: 22,
        difficulty: 3,
        isFree: false,
        exercises: [
          {"id": "lg-imp-1", "type": "logic_puzzle", "promptUk": "A → B хибна лише коли:", "promptEn": "A → B is false only when:", "category": "propositional", "difficulty": 3, "options": ["A істинна, а B хибна", "обидва хибні", "обидва істинні", "A хибна, B істинна"], "correctIndex": 0, "hintUk": "З істини не може випливати хиба.", "hintEn": "Truth cannot imply falsehood."},
          {"id": "lg-imp-2", "type": "logic_puzzle", "promptUk": "Контрапозиція до A → B:", "promptEn": "The contrapositive of A → B is:", "category": "propositional", "difficulty": 3, "options": ["¬B → ¬A", "B → A", "¬A → ¬B", "A ∧ B"], "correctIndex": 0, "hintUk": "Контрапозиція рівносильна імплікації.", "hintEn": "The contrapositive is equivalent to the implication."},
          {"id": "lg-imp-3", "type": "logic_puzzle", "promptUk": "Якщо A хибна, A → B є:", "promptEn": "If A is false, A → B is:", "category": "propositional", "difficulty": 3, "options": ["істинна (хиба імплікує що завгодно)", "завжди хибна", "невизначена", "дорівнює B"], "correctIndex": 0, "hintUk": "Порожня істинність: з хибної посилки імплікація істинна.", "hintEn": "Vacuous truth: an implication with a false antecedent is true."}
        ],
      },
      {
        slug: "lg-biconditional",
        titleUk: "Еквіваленція і виключне або",
        titleEn: "Biconditional and exclusive or",
        baseXp: 22,
        difficulty: 3,
        isFree: false,
        exercises: [
          {"id": "lg-eq-1", "type": "logic_puzzle", "promptUk": "A ↔ B істинна, коли:", "promptEn": "A ↔ B is true when:", "category": "propositional", "difficulty": 3, "options": ["A і B однакові", "A істинна", "B хибна", "хоча б одне істинне"], "correctIndex": 0, "hintUk": "Еквіваленція — «обидва або жоден».", "hintEn": "The biconditional is 'both or neither'."},
          {"id": "lg-eq-2", "type": "logic_puzzle", "promptUk": "A XOR B істинна, коли:", "promptEn": "A XOR B is true when:", "category": "propositional", "difficulty": 2, "options": ["рівно одне з A, B істинне", "обидва істинні", "обидва хибні", "завжди"], "correctIndex": 0, "hintUk": "Виключне або відкидає збіг.", "hintEn": "Exclusive or rejects a match."},
          {"id": "lg-eq-3", "type": "logic_puzzle", "promptUk": "A ↔ B еквівалентне:", "promptEn": "A ↔ B is equivalent to:", "category": "propositional", "difficulty": 3, "options": ["(A → B) ∧ (B → A)", "A ∨ B", "¬A ∧ B", "A XOR B"], "correctIndex": 0, "hintUk": "Дві імплікації в обидва боки.", "hintEn": "Two implications, one each way."}
        ],
      },
      {
        slug: "lg-tautology",
        titleUk: "Тавтологія і суперечність",
        titleEn: "Tautology and contradiction",
        baseXp: 22,
        difficulty: 3,
        isFree: false,
        exercises: [
          {"id": "lg-tau-1", "type": "logic_puzzle", "promptUk": "A ∨ ¬A — це:", "promptEn": "A ∨ ¬A is:", "category": "propositional", "difficulty": 2, "options": ["тавтологія", "суперечність", "контингент", "імплікація"], "correctIndex": 0, "hintUk": "Закон виключеного третього завжди істинний.", "hintEn": "The law of excluded middle is always true."},
          {"id": "lg-tau-2", "type": "logic_puzzle", "promptUk": "A ∧ ¬A — це:", "promptEn": "A ∧ ¬A is:", "category": "propositional", "difficulty": 2, "options": ["суперечність (завжди хибна)", "тавтологія", "істинна коли A істинна", "еквіваленція"], "correctIndex": 0, "hintUk": "Ніщо не може бути істинним і хибним одночасно.", "hintEn": "Nothing can be both true and false at once."},
          {"id": "lg-tau-3", "type": "logic_puzzle", "promptUk": "Формула, істинна не завжди і не ніколи, називається:", "promptEn": "A formula that is neither always true nor always false is called:", "category": "propositional", "difficulty": 3, "options": ["контингентною", "тавтологією", "суперечністю", "аксіомою"], "correctIndex": 0, "hintUk": "Контингент залежить від значень змінних.", "hintEn": "A contingent formula depends on the values of its variables."}
        ],
      }
    ],
  },
  {
    slug: "fallacies",
    titleUk: "Логічні помилки",
    titleEn: "Logical fallacies",
    lessons: [
      {
        slug: "lg-ad-hominem",
        titleUk: "Ad hominem і авторитет",
        titleEn: "Ad hominem and authority",
        baseXp: 22,
        difficulty: 3,
        isFree: false,
        exercises: [
          {"id": "lg-fh-1", "type": "logic_puzzle", "promptUk": "«Цей аргумент хибний, бо автор неприємний» — це:", "promptEn": "'This argument is false because the author is unpleasant' is:", "category": "fallacy", "difficulty": 2, "options": ["ad hominem (атака на особу)", "валідне спростування", "тавтологія", "індукція"], "correctIndex": 0, "hintUk": "Якість людини не доводить хибність твердження.", "hintEn": "A person's character does not prove a claim false."},
          {"id": "lg-fh-2", "type": "logic_puzzle", "promptUk": "«Це правда, бо так сказав знаменитий актор» без експертизи — це:", "promptEn": "'It is true because a famous actor said so' with no expertise is:", "category": "fallacy", "difficulty": 3, "options": ["хибний авторитет", "дедукція", "контрапозиція", "визначення"], "correctIndex": 0, "hintUk": "Авторитет має бути релевантним до теми.", "hintEn": "Authority has to be relevant to the topic."},
          {"id": "lg-fh-3", "type": "logic_puzzle", "promptUk": "Що є валідною відповіддю на аргумент?", "promptEn": "What is a valid reply to an argument?", "category": "fallacy", "difficulty": 2, "options": ["показати помилку в посилках або висновку", "образити опонента", "згадати популярність", "змінити тему"], "correctIndex": 0, "hintUk": "Атакують твердження, не особу.", "hintEn": "Attack the claim, not the person."}
        ],
      },
      {
        slug: "lg-straw-slippery",
        titleUk: "Опудало і слизький шлях",
        titleEn: "Straw man and slippery slope",
        baseXp: 22,
        difficulty: 3,
        isFree: false,
        exercises: [
          {"id": "lg-fh-4", "type": "logic_puzzle", "promptUk": "Перекрутити позицію опонента і спростувати перекручене — це:", "promptEn": "Misstating an opponent's view and refuting the distortion is:", "category": "fallacy", "difficulty": 3, "options": ["опудало (straw man)", "дедукція", "аналогія", "визначення"], "correctIndex": 0, "hintUk": "Спростували не ту тезу.", "hintEn": "A different thesis was refuted."},
          {"id": "lg-fh-5", "type": "logic_puzzle", "promptUk": "«Якщо дозволимо A, неминуче дійдемо до Z» без механізму — це:", "promptEn": "'If we allow A we will inevitably reach Z' with no mechanism is:", "category": "fallacy", "difficulty": 3, "options": ["слизький шлях", "modus ponens", "індукція з даними", "аксіома"], "correctIndex": 0, "hintUk": "Ланцюжок треба обґрунтувати, а не лише заявити.", "hintEn": "The chain must be justified, not merely declared."},
          {"id": "lg-fh-6", "type": "logic_puzzle", "promptUk": "Як відрізнити справжній ризик ескалації від слизького шляху?", "promptEn": "How do you tell a real escalation risk from a slippery slope?", "category": "fallacy", "difficulty": 3, "options": ["показати конкретний причинний механізм і дані", "просто назвати Z страшним", "повторити «неминуче»", "змінити визначення A"], "correctIndex": 0, "hintUk": "Потрібні причини, не лише страх.", "hintEn": "You need causes, not just fear."}
        ],
      },
      {
        slug: "lg-false-dilemma",
        titleUk: "Хибна дилема і кругова аргументація",
        titleEn: "False dilemma and circular argument",
        baseXp: 22,
        difficulty: 3,
        isFree: false,
        exercises: [
          {"id": "lg-fh-7", "type": "logic_puzzle", "promptUk": "«Або повністю згоден, або ворог» ігнорує:", "promptEn": "'Either you fully agree or you are an enemy' ignores:", "category": "fallacy", "difficulty": 2, "options": ["проміжні і інші варіанти", "закон де Моргана", "тавтологію", "імовірність 1"], "correctIndex": 0, "hintUk": "Це хибна дилема.", "hintEn": "This is a false dilemma."},
          {"id": "lg-fh-8", "type": "logic_puzzle", "promptUk": "«Це правда, бо так написано, а написано правду» — це:", "promptEn": "'It is true because it is written, and it is written because it is true' is:", "category": "fallacy", "difficulty": 3, "options": ["кругова аргументація", "контрапозиція", "індукція", "силогізм Barbara"], "correctIndex": 0, "hintUk": "Висновок уже захований у посилці.", "hintEn": "The conclusion is already hidden in the premise."},
          {"id": "lg-fh-9", "type": "logic_puzzle", "promptUk": "Як виправити хибну дилему?", "promptEn": "How do you fix a false dilemma?", "category": "fallacy", "difficulty": 2, "options": ["назвати принаймні ще один реальний варіант", "повторити два крайні", "заперечити логіку взагалі", "перейти на особистості"], "correctIndex": 0, "hintUk": "Покажіть, що альтернатив більше ніж дві.", "hintEn": "Show that there are more than two alternatives."}
        ],
      },
      {
        slug: "lg-correlation-cause",
        titleUk: "Кореляція і причина",
        titleEn: "Correlation and cause",
        baseXp: 22,
        difficulty: 3,
        isFree: false,
        exercises: [
          {"id": "lg-fh-10", "type": "logic_puzzle", "promptUk": "Два показники зростають разом. Це доводить, що один спричиняє інший?", "promptEn": "Two measures rise together. Does that prove one causes the other?", "category": "fallacy", "difficulty": 2, "options": ["ні, кореляція не є причинністю", "так, завжди", "так, якщо числа великі", "так, якщо це відсотки"], "correctIndex": 0, "hintUk": "Може бути третій фактор або випадковість.", "hintEn": "There may be a third factor or coincidence."},
          {"id": "lg-fh-11", "type": "logic_puzzle", "promptUk": "Морозиво і пожежі частішають улітку. Найкраще пояснення:", "promptEn": "Ice cream and fires both rise in summer. The best explanation is:", "category": "fallacy", "difficulty": 2, "options": ["спільна причина — спека, не «морозиво палить»", "морозиво спричиняє пожежі", "пожежі спричиняють морозиво", "дані помилкові завжди"], "correctIndex": 0, "hintUk": "Класичний третій фактор.", "hintEn": "A classic third factor."},
          {"id": "lg-fh-12", "type": "logic_puzzle", "promptUk": "Що зміцнює причинний висновок?", "promptEn": "What strengthens a causal conclusion?", "category": "fallacy", "difficulty": 3, "options": ["механізм, контроль змінних, відтворення", "лише одна красива діаграма", "більший шрифт на слайді", "зміна теми"], "correctIndex": 0, "hintUk": "Причинність будують, а не лише спостерігають.", "hintEn": "Causation is built, not merely observed."}
        ],
      },
      {
        slug: "lg-post-hoc-anecdote",
        titleUk: "Post hoc і анекдот",
        titleEn: "Post hoc and anecdote",
        baseXp: 22,
        difficulty: 3,
        isFree: false,
        exercises: [
          {"id": "lg-fh-13", "type": "logic_puzzle", "promptUk": "«Після події A сталася B, отже A спричинила B» — це:", "promptEn": "'After A, B happened, therefore A caused B' is:", "category": "fallacy", "difficulty": 3, "options": ["post hoc", "modus tollens", "де Морган", "індукція з контролем"], "correctIndex": 0, "hintUk": "Послідовність у часі не є причиною.", "hintEn": "Time order is not a cause."},
          {"id": "lg-fh-14", "type": "logic_puzzle", "promptUk": "Одна історія успіху як єдиний доказ ефективності — це:", "promptEn": "A single success story as the only evidence of effectiveness is:", "category": "fallacy", "difficulty": 2, "options": ["анекдотичний доказ", "повна вибірка", "експеримент", "тавтологія"], "correctIndex": 0, "hintUk": "Потрібні систематичні дані, не одна історія.", "hintEn": "You need systematic data, not one story."},
          {"id": "lg-fh-15", "type": "logic_puzzle", "promptUk": "Як відповісти на post hoc у продукті («після релізу впали продажі»)?", "promptEn": "How do you answer a post hoc in a product ('sales dropped after the release')?", "category": "fallacy", "difficulty": 3, "options": ["перевірити інші зміни, сезонність і контрольну групу", "одразу відкотити без аналізу", "звинуватити одну людину", "ігнорувати цифри"], "correctIndex": 0, "hintUk": "Співпадіння в часі треба розплутати.", "hintEn": "A coincidence in time has to be untangled."}
        ],
      }
    ],
  },
  {
    slug: "probability",
    titleUk: "Ймовірність і підрахунок",
    titleEn: "Probability and counting",
    lessons: [
      {
        slug: "lg-prob-basic",
        titleUk: "Базова ймовірність",
        titleEn: "Basic probability",
        baseXp: 22,
        difficulty: 3,
        isFree: false,
        exercises: [
          {"id": "lg-pr-1", "type": "logic_puzzle", "promptUk": "Справедливий кубик. P(парне)?", "promptEn": "A fair die. P(even)?", "category": "probability", "difficulty": 2, "options": ["1/2", "1/6", "1/3", "5/6"], "correctIndex": 0, "hintUk": "Три парні з шести граней.", "hintEn": "Three even faces out of six."},
          {"id": "lg-pr-2", "type": "logic_puzzle", "promptUk": "Дві незалежні монети. P(обидва герби)?", "promptEn": "Two independent coins. P(both heads)?", "category": "probability", "difficulty": 2, "options": ["1/4", "1/2", "1", "1/3"], "correctIndex": 0, "hintUk": "1/2 × 1/2 = 1/4.", "hintEn": "1/2 × 1/2 = 1/4."},
          {"id": "lg-pr-3", "type": "logic_puzzle", "promptUk": "P(A) = 0.3, P(не A) = ?", "promptEn": "P(A) = 0.3, P(not A) = ?", "category": "probability", "difficulty": 1, "options": ["0.7", "0.3", "1.3", "0"], "correctIndex": 0, "hintUk": "Доповнення: 1 − P(A).", "hintEn": "The complement is 1 − P(A)."}
        ],
      },
      {
        slug: "lg-conditional",
        titleUk: "Умовна ймовірність",
        titleEn: "Conditional probability",
        baseXp: 22,
        difficulty: 3,
        isFree: false,
        exercises: [
          {"id": "lg-pr-4", "type": "logic_puzzle", "promptUk": "P(A|B) означає:", "promptEn": "P(A|B) means:", "category": "probability", "difficulty": 2, "options": ["ймовірність A за умови, що B вже сталося", "P(A)×P(B)", "P(A або B)", "завжди P(A)"], "correctIndex": 0, "hintUk": "Умова змінює простір подій.", "hintEn": "The condition changes the sample space."},
          {"id": "lg-pr-5", "type": "logic_puzzle", "promptUk": "Якщо A і B незалежні, P(A|B) дорівнює:", "promptEn": "If A and B are independent, P(A|B) equals:", "category": "probability", "difficulty": 3, "options": ["P(A)", "0", "1", "P(B)"], "correctIndex": 0, "hintUk": "Незалежність: умова не змінює ймовірність.", "hintEn": "Independence: the condition does not change the probability."},
          {"id": "lg-pr-6", "type": "logic_puzzle", "promptUk": "У сім'ї двоє дітей, хоча б один хлопець. Ймовірність двох хлопців (BB, BG, GB рівноймовірні, без GG)?", "promptEn": "A family has two children, at least one boy. Probability of two boys (BB, BG, GB equally likely, no GG)?", "category": "probability", "difficulty": 4, "options": ["1/3", "1/2", "1/4", "2/3"], "correctIndex": 0, "hintUk": "Три рівноймовірні випадки лишаються, лише один з них BB.", "hintEn": "Three equally likely cases remain, only one of them is BB."}
        ],
      },
      {
        slug: "lg-bayes-intuition",
        titleUk: "Інтуїція Баєса",
        titleEn: "Bayes intuition",
        baseXp: 26,
        difficulty: 4,
        isFree: false,
        exercises: [
          {"id": "lg-pr-7", "type": "logic_puzzle", "promptUk": "Рідкісна хвороба (1 з 1000), тест з 1% хибних плюсів, майже без пропусків. Більшість позитивних — це:", "promptEn": "A rare disease (1 in 1000), a test with 1% false positives and almost no misses. Most positives are:", "category": "probability", "difficulty": 4, "options": ["хибні плюси, бо здорових набагато більше", "майже напевно хворі", "рівно 50/50", "неможливо сказати нічого"], "correctIndex": 0, "hintUk": "База: 999 здорових дадуть близько 10 хибних плюсів на 1 справжнього.", "hintEn": "The base: 999 healthy people yield about 10 false positives per 1 true case."},
          {"id": "lg-pr-8", "type": "logic_puzzle", "promptUk": "Що таке базова частота (base rate)?", "promptEn": "What is a base rate?", "category": "probability", "difficulty": 3, "options": ["попередня поширеність події до тесту", "точність тесту", "кількість питань", "дисперсія"], "correctIndex": 0, "hintUk": "Баєс починається з пріора.", "hintEn": "Bayes starts from the prior."},
          {"id": "lg-pr-9", "type": "logic_puzzle", "promptUk": "Чому «точність 99%» не достатня для рідкісної події?", "promptEn": "Why is '99% accurate' not enough for a rare event?", "category": "probability", "difficulty": 3, "options": ["хибні плюси можуть перевищити рідкісні справжні випадки", "99% завжди означає майже впевненість", "точність не визначена", "ймовірність не застосовується"], "correctIndex": 0, "hintUk": "Потрібен пріор, не лише специфічність.", "hintEn": "You need the prior, not just specificity."}
        ],
      },
      {
        slug: "lg-expected-value",
        titleUk: "Очікуване значення",
        titleEn: "Expected value",
        baseXp: 22,
        difficulty: 3,
        isFree: false,
        exercises: [
          {"id": "lg-pr-10", "type": "logic_puzzle", "promptUk": "Гра: +10 з ймовірністю 0.5 і −6 з 0.5. Очікування:", "promptEn": "A game: +10 with probability 0.5 and −6 with 0.5. The expectation is:", "category": "probability", "difficulty": 3, "options": ["+2", "+10", "−6", "0"], "correctIndex": 0, "hintUk": "0.5×10 + 0.5×(−6) = 2.", "hintEn": "0.5×10 + 0.5×(−6) = 2."},
          {"id": "lg-pr-11", "type": "logic_puzzle", "promptUk": "Очікуване значення — це:", "promptEn": "Expected value is:", "category": "probability", "difficulty": 2, "options": ["середнє за ймовірностями, не обов'язково результат однієї спроби", "завжди те, що випаде наступного разу", "максимальний виграш", "мода"], "correctIndex": 0, "hintUk": "Це довгострокове середнє.", "hintEn": "It is a long-run average."},
          {"id": "lg-pr-12", "type": "logic_puzzle", "promptUk": "Чому гра з від'ємним очікуванням може здаватися привабливою?", "promptEn": "Why can a game with a negative expectation still look attractive?", "category": "probability", "difficulty": 3, "options": ["рідкісний великий виграш затінює часті малі програші", "очікування завжди додатне", "ймовірності не множать", "це тавтологія"], "correctIndex": 0, "hintUk": "Дивіться на середнє, не на рекламу джекпоту.", "hintEn": "Look at the average, not the jackpot advert."}
        ],
      },
      {
        slug: "lg-counting",
        titleUk: "Комбінаторика коротко",
        titleEn: "Counting, briefly",
        baseXp: 22,
        difficulty: 3,
        isFree: false,
        exercises: [
          {"id": "lg-pr-13", "type": "logic_puzzle", "promptUk": "Скільки способів вибрати 2 літери з {A,B,C} без порядку?", "promptEn": "How many ways to choose 2 letters from {A,B,C} without order?", "category": "counting", "difficulty": 2, "options": ["3", "6", "2", "8"], "correctIndex": 0, "hintUk": "AB, AC, BC — комбінації C(3,2)=3.", "hintEn": "AB, AC, BC — combinations C(3,2)=3."},
          {"id": "lg-pr-14", "type": "logic_puzzle", "promptUk": "Скільки перестановок трьох різних літер?", "promptEn": "How many permutations of three distinct letters?", "category": "counting", "difficulty": 2, "options": ["6", "3", "9", "1"], "correctIndex": 0, "hintUk": "3! = 6.", "hintEn": "3! = 6."},
          {"id": "lg-pr-15", "type": "logic_puzzle", "promptUk": "Коли множимо варіанти (правило добутку)?", "promptEn": "When do we multiply options (the product rule)?", "category": "counting", "difficulty": 3, "options": ["коли кроки незалежні і виконуються разом", "коли варіанти взаємовиключні на одному кроці", "завжди", "ніколи для ймовірностей"], "correctIndex": 0, "hintUk": "«І» для незалежних кроків — добуток.", "hintEn": "'And' for independent steps is a product."}
        ],
      }
    ],
  },
  {
    slug: "graphs-invariants",
    titleUk: "Графи й інваріанти",
    titleEn: "Graphs and invariants",
    lessons: [
      {
        slug: "lg-graph-path",
        titleUk: "Шляхи і цикли",
        titleEn: "Paths and cycles",
        baseXp: 22,
        difficulty: 3,
        isFree: false,
        exercises: [
          {"id": "lg-gr-1", "type": "logic_puzzle", "promptUk": "Цикл у графі — це:", "promptEn": "A cycle in a graph is:", "category": "graph", "difficulty": 2, "options": ["замкнений шлях без повторів вершин (окрім старту/кінця)", "будь-яке ребро", "дерево", "ізольована вершина"], "correctIndex": 0, "hintUk": "Повертаємось туди, звідки почали, не повторюючи вершин.", "hintEn": "You return to the start without repeating vertices."},
          {"id": "lg-gr-2", "type": "logic_puzzle", "promptUk": "Дерево — це:", "promptEn": "A tree is:", "category": "graph", "difficulty": 2, "options": ["зв'язний граф без циклів", "будь-який граф з коренем", "повний граф", "граф з петлею"], "correctIndex": 0, "hintUk": "n вершин і n−1 ребер у скінченному дереві.", "hintEn": "A finite tree has n vertices and n−1 edges."},
          {"id": "lg-gr-3", "type": "logic_puzzle", "promptUk": "Чи може в дереві на 5 вершинах бути 6 ребер?", "promptEn": "Can a tree on 5 vertices have 6 edges?", "category": "graph", "difficulty": 3, "options": ["ні, з'явиться цикл", "так, завжди", "так, якщо є корінь", "лише у орієнтованому"], "correctIndex": 0, "hintUk": "Зайве ребро замкне цикл.", "hintEn": "An extra edge would close a cycle."}
        ],
      },
      {
        slug: "lg-euler-handshaking",
        titleUk: "Степені й рукостискання",
        titleEn: "Degrees and handshaking",
        baseXp: 22,
        difficulty: 3,
        isFree: false,
        exercises: [
          {"id": "lg-gr-4", "type": "logic_puzzle", "promptUk": "Сума степенів усіх вершин дорівнює:", "promptEn": "The sum of all vertex degrees equals:", "category": "graph", "difficulty": 3, "options": ["подвоєній кількості ребер", "кількості вершин", "кількості циклів", "завжди непарному числу"], "correctIndex": 0, "hintUk": "Кожне ребро додає 1 до двох степенів.", "hintEn": "Each edge adds 1 to two degrees."},
          {"id": "lg-gr-5", "type": "logic_puzzle", "promptUk": "Скільки непарних степенів може бути в графі?", "promptEn": "How many odd degrees can a graph have?", "category": "graph", "difficulty": 3, "options": ["парну кількість", "непарну кількість", "рівно одну", "будь-яку без обмежень"], "correctIndex": 0, "hintUk": "Сума степенів парна, отже непарних степенів парна кількість.", "hintEn": "The degree sum is even, so the number of odd degrees is even."},
          {"id": "lg-gr-6", "type": "logic_puzzle", "promptUk": "Чи можливий граф зі степенями 3, 3, 1?", "promptEn": "Is a graph with degrees 3, 3, 1 possible?", "category": "graph", "difficulty": 3, "options": ["ні, одна непарна кількість непарних степенів", "так", "так, це дерево", "так, якщо мультиребра"], "correctIndex": 0, "hintUk": "Три непарні степені — неможливо.", "hintEn": "Three odd degrees is impossible."}
        ],
      },
      {
        slug: "lg-invariant",
        titleUk: "Інваріант у задачі",
        titleEn: "An invariant in a puzzle",
        baseXp: 26,
        difficulty: 4,
        isFree: false,
        exercises: [
          {"id": "lg-inv-1", "type": "logic_puzzle", "promptUk": "Інваріант — це:", "promptEn": "An invariant is:", "category": "invariant", "difficulty": 2, "options": ["величина, що не змінюється дозволеними ходами", "випадкове число", "назва вершини", "ймовірність 1"], "correctIndex": 0, "hintUk": "Якщо інваріант не збігається з ціллю, позиція недосяжна.", "hintEn": "If the invariant does not match the goal, the position is unreachable."},
          {"id": "lg-inv-2", "type": "logic_puzzle", "promptUk": "На шахівниці фарбування чорне/біле. Слон лишається:", "promptEn": "On a chessboard's black/white colouring, a bishop stays:", "category": "invariant", "difficulty": 2, "options": ["на клітинках того самого кольору", "на будь-якому кольорі щоходу", "лише на діагоналі a1-h8", "на краю"], "correctIndex": 0, "hintUk": "Колір клітинки — інваріант слона.", "hintEn": "Square colour is the bishop's invariant."},
          {"id": "lg-inv-3", "type": "logic_puzzle", "promptUk": "У грі з фішками хід змінює дві клітинки. Парність кількості фішок:", "promptEn": "In a token game a move changes two cells. The parity of the token count:", "category": "invariant", "difficulty": 3, "options": ["може бути інваріантом (зміна на парне число)", "завжди випадкова", "завжди стає 0", "не існує"], "correctIndex": 0, "hintUk": "Якщо хід змінює парну кількість, парність суми зберігається.", "hintEn": "If a move changes an even number, the sum's parity is preserved."}
        ],
      },
      {
        slug: "lg-parity-puzzles",
        titleUk: "Парність",
        titleEn: "Parity puzzles",
        baseXp: 22,
        difficulty: 3,
        isFree: false,
        exercises: [
          {"id": "lg-inv-4", "type": "logic_puzzle", "promptUk": "15-puzzle: якщо порожня клітинка на місці, досяжність визначає:", "promptEn": "15-puzzle: with the blank in place, reachability is decided by:", "category": "invariant", "difficulty": 4, "options": ["парність перестановки плиток", "випадковість", "колір рамки", "сума номерів завжди"], "correctIndex": 0, "hintUk": "Лише парні перестановки досяжні.", "hintEn": "Only even permutations are reachable."},
          {"id": "lg-inv-5", "type": "logic_puzzle", "promptUk": "Усі три лампи вимкнені. Хід перемикає рівно дві. Чи можна засвітити рівно одну?", "promptEn": "All three lamps are off. A move toggles exactly two. Can you light exactly one?", "category": "invariant", "difficulty": 4, "options": ["ні, парність кількості увімкнених зберігається (0 парна, 1 непарна)", "так, одним ходом", "так, якщо почати з кінця", "завжди"], "correctIndex": 0, "hintUk": "Кожен хід змінює кількість увімкнених на парне число (0 або 2).", "hintEn": "Each move changes the number of lights on by an even amount (0 or 2)."},
          {"id": "lg-inv-6", "type": "logic_puzzle", "promptUk": "Монета: орел=0, решка=1. Хід перевертає дві. Чи можна з 000 отримати 100?", "promptEn": "Coins: heads=0, tails=1. A move flips two. Can you go from 000 to 100?", "category": "invariant", "difficulty": 4, "options": ["ні, парність суми зберігається (обидва стартове і 100 мають різну парність: 0 vs 1)", "так, одним ходом", "так, трьома", "завжди"], "correctIndex": 0, "hintUk": "Переворот двох змінює суму на парне, парність суми — інваріант.", "hintEn": "Flipping two changes the sum by an even amount, so sum parity is invariant."}
        ],
      },
      {
        slug: "lg-counterexample",
        titleUk: "Контрприклад",
        titleEn: "Counterexamples",
        baseXp: 22,
        difficulty: 3,
        isFree: false,
        exercises: [
          {"id": "lg-cx-1", "type": "logic_puzzle", "promptUk": "Щоб спростувати «всі лебеді білі», достатньо:", "promptEn": "To refute 'all swans are white', it is enough to have:", "category": "counterexample", "difficulty": 1, "options": ["одного небілого лебедя", "тисячі білих", "опитування", "визначення слова лебідь"], "correctIndex": 0, "hintUk": "Універсальне твердження б'є один контрприклад.", "hintEn": "A single counterexample defeats a universal claim."},
          {"id": "lg-cx-2", "type": "logic_puzzle", "promptUk": "«Кожен простий більший за 2 є непарним». Контрприклад:", "promptEn": "'Every prime greater than 2 is odd'. A counterexample:", "category": "counterexample", "difficulty": 2, "options": ["немає контрприкладу, твердження істинне", "число 2", "число 9", "число 1"], "correctIndex": 0, "hintUk": "Твердження обмежене «більший за 2».", "hintEn": "The claim is restricted to 'greater than 2'."},
          {"id": "lg-cx-3", "type": "logic_puzzle", "promptUk": "Чому «я не знайшов контрприкладу» ще не доводить універсальне твердження?", "promptEn": "Why does 'I found no counterexample' not yet prove a universal claim?", "category": "counterexample", "difficulty": 3, "options": ["пошук міг бути неповним; потрібне доведення", "це завжди достатньо", "контрприклади не існують у математиці", "індукція заборонена"], "correctIndex": 0, "hintUk": "Відсутність знахідки — не відсутність об'єкта.", "hintEn": "Not finding one is not the same as there being none."}
        ],
      }
    ],
  }
,
  {
    slug: "quantifiers",
    titleUk: "Квантори",
    titleEn: "Quantifiers",
    lessons: [
      {
        slug: "lg-forall",
        titleUk: "Універсальний квантор",
        titleEn: "The universal quantifier",
        baseXp: 22,
        difficulty: 3,
        isFree: true,
        exercises: [
          {
            "id": "lg-fa-1",
            "type": "logic_puzzle",
            "promptUk": "«∀x P(x)» означає:",
            "promptEn": "«∀x P(x)» means:",
            "category": "quantifiers",
            "difficulty": 2,
            "options": [
              "P істинне для кожного x у домені",
              "існує хоча б один x з P",
              "P хибне для всіх x",
              "P істинне для більшості x"
            ],
            "correctIndex": 0,
            "hintUk": "Універсальний квантор вимагає всіх елементів.",
            "hintEn": "The universal quantifier requires every element."
          },
          {
            "id": "lg-fa-2",
            "type": "logic_puzzle",
            "promptUk": "Щоб спростувати ∀x P(x), достатньо:",
            "promptEn": "To refute ∀x P(x) it is enough to have:",
            "category": "quantifiers",
            "difficulty": 2,
            "options": [
              "одного x, для якого P хибне",
              "доведення для майже всіх x",
              "порожнього домену завжди",
              "статистичної вибірки"
            ],
            "correctIndex": 0,
            "hintUk": "Один контрприклад б'є універсальне твердження.",
            "hintEn": "A single counterexample defeats a universal claim."
          },
          {
            "id": "lg-fa-3",
            "type": "logic_puzzle",
            "promptUk": "«Усі прапорці в формі обов'язкові». Це хибне, якщо:",
            "promptEn": "'Every flag in the form is required.' This is false if:",
            "category": "quantifiers",
            "difficulty": 3,
            "options": [
              "є хоча б один необов'язковий прапорець",
              "більшість прапорців обов'язкові",
              "форма порожня",
              "користувач не відправив форму"
            ],
            "correctIndex": 0,
            "hintUk": "∀ хибне, щойно знайдено виняток.",
            "hintEn": "∀ is false as soon as an exception is found."
          }
        ],
      },
      {
        slug: "lg-exists",
        titleUk: "Екзистенційний квантор",
        titleEn: "The existential quantifier",
        baseXp: 22,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "lg-ex-1",
            "type": "logic_puzzle",
            "promptUk": "«∃x P(x)» означає:",
            "promptEn": "«∃x P(x)» means:",
            "category": "quantifiers",
            "difficulty": 2,
            "options": [
              "є принаймні один x, для якого P істинне",
              "P істинне для всіх x",
              "P істинне для рівно одного x",
              "P завжди хибне"
            ],
            "correctIndex": 0,
            "hintUk": "Достатньо одного свідка.",
            "hintEn": "A single witness is enough."
          },
          {
            "id": "lg-ex-2",
            "type": "logic_puzzle",
            "promptUk": "Щоб спростувати ∃x P(x), треба:",
            "promptEn": "To refute ∃x P(x) you must:",
            "category": "quantifiers",
            "difficulty": 3,
            "options": [
              "показати, що P хибне для кожного x",
              "знайти один x без P",
              "показати два контрприклади",
              "змінити домен"
            ],
            "correctIndex": 0,
            "hintUk": "Екзистенційне твердження б'є лише повний перебір або доведення для всіх.",
            "hintEn": "An existential is only beaten by covering every element, or a proof for all."
          },
          {
            "id": "lg-ex-3",
            "type": "logic_puzzle",
            "promptUk": "Тест «існує користувач з роллю admin». Який результат його підтверджує?",
            "promptEn": "The test 'there exists a user with the admin role'. Which result confirms it?",
            "category": "quantifiers",
            "difficulty": 2,
            "options": [
              "знайдено одного адміна",
              "усі користувачі — адміни",
              "адмінів немає, але є модератори",
              "таблиця користувачів порожня"
            ],
            "correctIndex": 0,
            "hintUk": "Один знайдений адмін — свідок для ∃.",
            "hintEn": "One found admin is a witness for ∃."
          }
        ],
      },
      {
        slug: "lg-neg-quant",
        titleUk: "Заперечення кванторів",
        titleEn: "Negating quantifiers",
        baseXp: 22,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "lg-nq-1",
            "type": "logic_puzzle",
            "promptUk": "¬∀x P(x) еквівалентне:",
            "promptEn": "¬∀x P(x) is equivalent to:",
            "category": "quantifiers",
            "difficulty": 3,
            "options": [
              "∃x ¬P(x)",
              "∀x ¬P(x)",
              "¬∃x P(x)",
              "∃x P(x)"
            ],
            "correctIndex": 0,
            "hintUk": "Не всі — означає існує виняток.",
            "hintEn": "Not all means there is an exception."
          },
          {
            "id": "lg-nq-2",
            "type": "logic_puzzle",
            "promptUk": "¬∃x P(x) еквівалентне:",
            "promptEn": "¬∃x P(x) is equivalent to:",
            "category": "quantifiers",
            "difficulty": 3,
            "options": [
              "∀x ¬P(x)",
              "∃x ¬P(x)",
              "¬∀x ¬P(x)",
              "∀x P(x)"
            ],
            "correctIndex": 0,
            "hintUk": "Не існує жодного — для всіх P хибне.",
            "hintEn": "There exists none — P is false for all."
          },
          {
            "id": "lg-nq-3",
            "type": "logic_puzzle",
            "promptUk": "Код if (!users.every(u => u.active)) еквівалентний:",
            "promptEn": "The code if (!users.every(u => u.active)) is equivalent to:",
            "category": "quantifiers",
            "difficulty": 3,
            "options": [
              "if (users.some(u => !u.active))",
              "if (users.every(u => !u.active))",
              "if (!users.some(u => u.active))",
              "if (users.length === 0)"
            ],
            "correctIndex": 0,
            "hintUk": "Заперечення every — це some з запереченою умовою.",
            "hintEn": "The negation of every is some with the predicate negated."
          }
        ],
      },
      {
        slug: "lg-quant-order",
        titleUk: "Порядок кванторів",
        titleEn: "Quantifier order",
        baseXp: 22,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "lg-qo-1",
            "type": "logic_puzzle",
            "promptUk": "∀x ∃y P(x,y) означає:",
            "promptEn": "∀x ∃y P(x,y) means:",
            "category": "quantifiers",
            "difficulty": 3,
            "options": [
              "для кожного x є свій (можливо інший) y",
              "є один y, що працює для всіх x",
              "існує пара (x,y)",
              "для всіх пар P істинне"
            ],
            "correctIndex": 0,
            "hintUk": "y може залежати від x.",
            "hintEn": "y may depend on x."
          },
          {
            "id": "lg-qo-2",
            "type": "logic_puzzle",
            "promptUk": "∃y ∀x P(x,y) є:",
            "promptEn": "∃y ∀x P(x,y) is:",
            "category": "quantifiers",
            "difficulty": 3,
            "options": [
              "сильнішим: один і той самий y для всіх x",
              "слабшим за ∀x ∃y",
              "еквівалентним ∀x ∃y завжди",
              "завжди хибним"
            ],
            "correctIndex": 0,
            "hintUk": "Спочатку вибираємо y, потім він має підійти всім x.",
            "hintEn": "You pick y first, then it must work for every x."
          },
          {
            "id": "lg-qo-3",
            "type": "logic_puzzle",
            "promptUk": "«Кожен користувач має пароль» vs «є один пароль для всіх користувачів»:",
            "promptEn": "'Every user has a password' vs 'there is one password for all users':",
            "category": "quantifiers",
            "difficulty": 3,
            "options": [
              "перше — ∀x ∃y, друге — ∃y ∀x",
              "це одне й те саме",
              "перше — ∃y ∀x",
              "жоден не є квантором"
            ],
            "correctIndex": 0,
            "hintUk": "Порядок кванторів змінює сенс кардинально.",
            "hintEn": "Quantifier order changes the meaning completely."
          }
        ],
      },
      {
        slug: "lg-vacuous-empty",
        titleUk: "Порожній домен і вакуумна істинність",
        titleEn: "Empty domains and vacuous truth",
        baseXp: 22,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "lg-ve-1",
            "type": "logic_puzzle",
            "promptUk": "Якщо домен порожній, ∀x P(x) є:",
            "promptEn": "If the domain is empty, ∀x P(x) is:",
            "category": "quantifiers",
            "difficulty": 3,
            "options": [
              "істинним (немає контрприкладу)",
              "хибним",
              "невизначеним завжди",
              "дорівнює ∃x P(x)"
            ],
            "correctIndex": 0,
            "hintUk": "Немає елемента, який би спростував універсальне твердження.",
            "hintEn": "There is no element that could refute the universal claim."
          },
          {
            "id": "lg-ve-2",
            "type": "logic_puzzle",
            "promptUk": "Якщо домен порожній, ∃x P(x) є:",
            "promptEn": "If the domain is empty, ∃x P(x) is:",
            "category": "quantifiers",
            "difficulty": 3,
            "options": [
              "хибним (немає свідка)",
              "істинним",
              "вакуумно істинним",
              "еквівалентним ∀"
            ],
            "correctIndex": 0,
            "hintUk": "Свідка взяти нізвідки.",
            "hintEn": "There is nowhere to take a witness from."
          },
          {
            "id": "lg-ve-3",
            "type": "logic_puzzle",
            "promptUk": "У коді [].every(x => x > 0) у JavaScript повертає:",
            "promptEn": "In JavaScript, [].every(x => x > 0) returns:",
            "category": "quantifiers",
            "difficulty": 2,
            "options": [
              "true (вакуумна істинність)",
              "false",
              "помилку",
              "undefined"
            ],
            "correctIndex": 0,
            "hintUk": "every на порожньому масиві дає true — як ∀ на порожньому домені.",
            "hintEn": "every on an empty array is true — like ∀ on an empty domain."
          }
        ],
      },
    ],
  },
  {
    slug: "necessary-sufficient",
    titleUk: "Необхідні й достатні умови",
    titleEn: "Necessary and sufficient conditions",
    lessons: [
      {
        slug: "lg-sufficient",
        titleUk: "Достатня умова",
        titleEn: "Sufficient conditions",
        baseXp: 22,
        difficulty: 3,
        isFree: true,
        exercises: [
          {
            "id": "lg-sf-1",
            "type": "logic_puzzle",
            "promptUk": "A достатня для B означає:",
            "promptEn": "A is sufficient for B means:",
            "category": "conditions",
            "difficulty": 2,
            "options": [
              "якщо A, то B (A → B)",
              "якщо B, то A",
              "A і B рівносильні",
              "без A не буде B"
            ],
            "correctIndex": 0,
            "hintUk": "Достатня — гарантує наслідок, але не є єдиним шляхом.",
            "hintEn": "Sufficient guarantees the consequent, but is not the only path."
          },
          {
            "id": "lg-sf-2",
            "type": "logic_puzzle",
            "promptUk": "«Якщо тести зелені, можна релізити» — зелені тести є:",
            "promptEn": "'If the tests are green, we may release' — green tests are:",
            "category": "conditions",
            "difficulty": 3,
            "options": [
              "достатньою умовою релізу за цим правилом",
              "необхідною і єдиною завжди",
              "непов'язаними",
              "забороною релізу"
            ],
            "correctIndex": 0,
            "hintUk": "Правило каже: зелені ⇒ реліз дозволено.",
            "hintEn": "The rule says: green ⇒ release is allowed."
          },
          {
            "id": "lg-sf-3",
            "type": "logic_puzzle",
            "promptUk": "Достатня умова може бути хибною, а наслідок істинним?",
            "promptEn": "Can a sufficient condition be false while the consequent is still true?",
            "category": "conditions",
            "difficulty": 3,
            "options": [
              "так, бо можуть бути інші шляхи до B",
              "ні, тоді B завжди хибне",
              "лише у порожньому домені",
              "ні, це суперечність"
            ],
            "correctIndex": 0,
            "hintUk": "A → B не забороняє інші причини B.",
            "hintEn": "A → B does not forbid other causes of B."
          }
        ],
      },
      {
        slug: "lg-necessary",
        titleUk: "Необхідна умова",
        titleEn: "Necessary conditions",
        baseXp: 22,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "lg-nc-1",
            "type": "logic_puzzle",
            "promptUk": "A необхідна для B означає:",
            "promptEn": "A is necessary for B means:",
            "category": "conditions",
            "difficulty": 2,
            "options": [
              "якщо B, то A (B → A); без A не буде B",
              "якщо A, то B",
              "A достатня",
              "A і B незалежні"
            ],
            "correctIndex": 0,
            "hintUk": "Необхідна умова є в усіх випадках, коли є B.",
            "hintEn": "A necessary condition is present whenever B is."
          },
          {
            "id": "lg-nc-2",
            "type": "logic_puzzle",
            "promptUk": "Щоб увійти на сервер, потрібен валідний ключ. Ключ є:",
            "promptEn": "To enter the server you need a valid key. The key is:",
            "category": "conditions",
            "difficulty": 2,
            "options": [
              "необхідною умовою входу",
              "достатньою завжди (навіть без мережі)",
              "і необхідною, і достатньою обов'язково",
              "неумовою"
            ],
            "correctIndex": 0,
            "hintUk": "Без ключа входу немає; сам ключ може бути недостатнім (потрібна ще мережа).",
            "hintEn": "Without the key there is no entry; the key alone may not be enough (you still need the network)."
          },
          {
            "id": "lg-nc-3",
            "type": "logic_puzzle",
            "promptUk": "Як спростувати «A необхідна для B»?",
            "promptEn": "How do you refute 'A is necessary for B'?",
            "category": "conditions",
            "difficulty": 3,
            "options": [
              "показати випадок B без A",
              "показати A без B",
              "показати ¬B",
              "показати, що A істинне"
            ],
            "correctIndex": 0,
            "hintUk": "Контрприклад: B трапилось, а A не було.",
            "hintEn": "A counterexample: B happened and A did not."
          }
        ],
      },
      {
        slug: "lg-iff-def",
        titleUk: "Тоді й лише тоді, означення",
        titleEn: "If and only if, and definitions",
        baseXp: 22,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "lg-iff-1",
            "type": "logic_puzzle",
            "promptUk": "A тоді й лише тоді, коли B означає:",
            "promptEn": "A if and only if B means:",
            "category": "conditions",
            "difficulty": 2,
            "options": [
              "A → B і B → A (обидві необхідні й достатні)",
              "лише A → B",
              "лише B → A",
              "A або B"
            ],
            "correctIndex": 0,
            "hintUk": "Біумовність: обидва напрямки.",
            "hintEn": "A biconditional: both directions."
          },
          {
            "id": "lg-iff-2",
            "type": "logic_puzzle",
            "promptUk": "Означення «трикутник рівносторонній iff усі сторони рівні» фіксує:",
            "promptEn": "The definition 'a triangle is equilateral iff all sides are equal' fixes:",
            "category": "conditions",
            "difficulty": 2,
            "options": [
              "необхідну і достатню умову",
              "лише достатню",
              "лише необхідну",
              "приклад, не означення"
            ],
            "correctIndex": 0,
            "hintUk": "Хороше означення дає критерій в обидва боки.",
            "hintEn": "A good definition is a criterion in both directions."
          },
          {
            "id": "lg-iff-3",
            "type": "logic_puzzle",
            "promptUk": "Чому циклічне означення («швидкий — той, що є швидким») погане?",
            "promptEn": "Why is a circular definition ('fast means that which is fast') bad?",
            "category": "conditions",
            "difficulty": 3,
            "options": [
              "воно не дає незалежного критерію перевірки",
              "воно завжди хибне логічно",
              "iff заборонений в означеннях",
              "означення не можуть використовувати iff"
            ],
            "correctIndex": 0,
            "hintUk": "Без виходу на інші поняття перевірити неможливо.",
            "hintEn": "Without a route to other concepts you cannot check it."
          }
        ],
      },
      {
        slug: "lg-hidden-assumptions",
        titleUk: "Приховані припущення",
        titleEn: "Hidden assumptions",
        baseXp: 22,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "lg-ha-1",
            "type": "logic_puzzle",
            "promptUk": "«Треба найняти ще розробників, бо дедлайн близько». Приховане припущення:",
            "promptEn": "'We should hire more developers because the deadline is close.' A hidden assumption:",
            "category": "assumptions",
            "difficulty": 3,
            "options": [
              "більше людей обов'язково прискорить здачу",
              "дедлайн не існує",
              "найм безкоштовний у часі",
              "розробників не існує"
            ],
            "correctIndex": 0,
            "hintUk": "Закон Брукса: нові люди можуть сповільнити проєкт.",
            "hintEn": "Brooks's law: new people can slow a project down."
          },
          {
            "id": "lg-ha-2",
            "type": "logic_puzzle",
            "promptUk": "Як виявити приховане припущення в аргументі?",
            "promptEn": "How do you find a hidden assumption in an argument?",
            "category": "assumptions",
            "difficulty": 3,
            "options": [
              "запитати, що має бути істинним, щоб висновок випливав з посилок",
              "відкинути всі посилки",
              "порахувати слова",
              "змінити тему"
            ],
            "correctIndex": 0,
            "hintUk": "Шукайте відсутню ланку між посилами і висновком.",
            "hintEn": "Look for the missing link between the premises and the conclusion."
          },
          {
            "id": "lg-ha-3",
            "type": "logic_puzzle",
            "promptUk": "«Метрика зросла, отже продукт кращий». Яке припущення треба перевірити?",
            "promptEn": "'The metric went up, so the product is better.' Which assumption should you check?",
            "category": "assumptions",
            "difficulty": 3,
            "options": [
              "що ця метрика справді вимірює якість продукту",
              "що метрики завжди цілі числа",
              "що зростання неможливе",
              "що продукт не існує"
            ],
            "correctIndex": 0,
            "hintUk": "Метрика може рухатись з причин, не пов'язаних із якістю.",
            "hintEn": "A metric can move for reasons unrelated to quality."
          }
        ],
      },
      {
        slug: "lg-strengthen-weaken",
        titleUk: "Посилення й послаблення тверджень",
        titleEn: "Strengthening and weakening claims",
        baseXp: 22,
        difficulty: 3,
        isFree: false,
        exercises: [
          {
            "id": "lg-sw-1",
            "type": "logic_puzzle",
            "promptUk": "Щоб посилити універсальне твердження, ми:",
            "promptEn": "To strengthen a universal claim we:",
            "category": "claims",
            "difficulty": 3,
            "options": [
              "розширюємо домен або посилюємо предикат",
              "додаємо винятки",
              "замінюємо ∀ на ∃",
              "коротшаємо речення"
            ],
            "correctIndex": 0,
            "hintUk": "«Всі птахи літають швидко» сильніше за «всі птахи літають».",
            "hintEn": "'All birds fly fast' is stronger than 'all birds fly'."
          },
          {
            "id": "lg-sw-2",
            "type": "logic_puzzle",
            "promptUk": "«Деякі запити повільні» у порівнянні з «усі запити повільні» є:",
            "promptEn": "'Some queries are slow' compared with 'all queries are slow' is:",
            "category": "claims",
            "difficulty": 2,
            "options": [
              "слабшим твердженням",
              "сильнішим",
              "еквівалентним",
              "суперечливим саме по собі"
            ],
            "correctIndex": 0,
            "hintUk": "∃ слабше за ∀: його легше захистити й важче спростувати повністю.",
            "hintEn": "∃ is weaker than ∀: easier to defend, harder to refute completely."
          },
          {
            "id": "lg-sw-3",
            "type": "logic_puzzle",
            "promptUk": "У рев'ю коду фраза «це завжди безпечно» ризикована, бо:",
            "promptEn": "In a code review the phrase 'this is always safe' is risky because:",
            "category": "claims",
            "difficulty": 3,
            "options": [
              "універсальне твердження падає від одного контрприкладу",
              "слово завжди заборонене граматикою",
              "безпека не є предикатом",
              "рев'ю не оцінює твердження"
            ],
            "correctIndex": 0,
            "hintUk": "Краще обмежити домен: «безпечно за таких-то вхідних даних».",
            "hintEn": "It is better to restrict the domain: 'safe under such-and-such inputs'."
          }
        ],
      },
    ],
  }
];

export function expandLogic(course: CourseContent): CourseContent {
  return expandCourse(course, {}, newUnits);
}
