import type { UnitContent } from "../types.js";
import {
  createConcept,
  createExplain,
  createNumeric,
  createMcq,
  createMatch,
  createLesson,
  createUnit,
} from "./helpers.js";
import type { Exercise } from "../types.js";
import { stage1Rest } from "./stage1-rest.js";

function concept(id: string, promptUk: string, promptEn: string, bodyUk: string, bodyEn: string, keyPointsUk: string[], keyPointsEn: string[]): Exercise {
  return createConcept({ id, promptUk, promptEn, bodyUk, bodyEn, keyPointsUk, keyPointsEn });
}

function explain(id: string, promptUk: string, promptEn: string, tokenUk: string, tokenEn: string, sampleUk: string, sampleEn: string): Exercise {
  return createExplain({
    id,
    promptUk,
    promptEn,
    minWords: 20,
    keyIdeas: [{ labelUk: tokenUk, labelEn: tokenEn, anyOf: [tokenUk, tokenEn] }],
    sampleAnswerUk: sampleUk,
    sampleAnswerEn: sampleEn,
  });
}

function num(id: string, promptUk: string, promptEn: string, target: number, unit: string, variant?: "A" | "B"): Exercise {
  return createNumeric({
    id,
    promptUk,
    promptEn,
    target,
    unit,
    absTolerance: Math.abs(target) === 0 ? 1e-9 : Math.abs(target) * 0.01,
    relTolerance: 0.02,
    explanationUk: "Відповідь отримано прямим підставленням у щойно виведену залежність.",
    explanationEn: "The value comes from substituting the given data into the relation just derived.",
    examVariant: variant,
  });
}

function mcq(id: string, promptUk: string, promptEn: string, options: string[], optionsEn: string[], correctIndex: number, variant?: "A" | "B"): Exercise {
  return createMcq({
    id,
    promptUk,
    promptEn,
    options,
    optionsEn,
    correctIndex,
    explanationUk: "Правильний варіант узгоджений із моделлю уроку.",
    explanationEn: "The correct option matches the model in the lesson.",
    examVariant: variant,
  });
}

function taught(slug: string, titleUk: string, titleEn: string, difficulty: number, exercises: Exercise[]) {
  return createLesson({ slug, titleUk, titleEn, difficulty, baseXp: 35, exercises });
}

function exam(slug: string, titleUk: string, titleEn: string, exercises: Exercise[]) {
  return createLesson({ slug, titleUk, titleEn, difficulty: 2, baseXp: 50, isExam: true, exercises });
}

const chargeBodyUk = `Питання: чому натертий бурштин притягує шматочки паперу, хоча в ньому немає батареї і замкненого кола? Модель така: речовина складається з атомів. У ядрі є протони, навколо ядра — електрони. Заряд протона за модулем дорівнює заряду електрона, $e = 1.602\\times 10^{-19}\\,\\mathrm{C}$. Нейтральний атом має однакову кількість протонів і електронів, тому його сумарний заряд нульовий. Тертя не створює заряд із нічого: воно переносить електрони з одного тіла на інше. Якщо тіло втратило $N$ електронів, його заряд $Q = +Ne$. Приклад. З шматка скла забрали $10^{10}$ електронів. Дано $N$, шукаємо $Q$. Метод — множення на елементарний заряд: $Q = 10^{10}\\times 1.602\\times 10^{-19} = 1.602\\times 10^{-9}\\,\\mathrm{C} = 1.60\\,\\mathrm{nC}$. Перевірка: це дуже малий заряд, його досить для легкого притягання паперу і замало для відчутного струму в товстому дроті. Типова помилка — сказати, що тертя «породжує електрику» без переносу частинок. Межа моделі: ми ще не рахуємо силу між зарядами і не вводимо коло.`;

const chargeBodyEn = `Question: why does rubbed amber pick up paper scraps when there is no battery and no closed path? The model is atomic. A nucleus holds protons and the surrounding cloud holds electrons. The proton charge equals the electron charge in magnitude, $e = 1.602\\times 10^{-19}\\,\\mathrm{C}$. A neutral atom has equal counts, so its net charge is zero. Rubbing does not create charge. It moves electrons from one object to the other. If an object loses $N$ electrons, $Q = +Ne$. Worked example. Glass loses $10^{10}$ electrons. Given $N$, find $Q$ by multiplying by the elementary charge: $Q = 10^{10}\\times 1.602\\times 10^{-19} = 1.602\\times 10^{-9}\\,\\mathrm{C} = 1.60\\,\\mathrm{nC}$. Plausibility: that is enough to lift a paper scrap and far too small to be a large current in a thick wire. A common mistake is to say rubbing creates electricity from nothing. Limit: this lesson does not yet compute the force between charges and it does not introduce a circuit.`;

export const stage1Units: UnitContent[] = [
  createUnit({
    slug: "ee-01-matter-charge",
    titleUk: "Заряд і речовина",
    titleEn: "Charge and matter",
    lessons: [
      taught("ee-01-l1", "Заряд і атоми", "Charge and atoms", 1, [
        concept("ee-01-l1-charge-v2", "Звідки береться заряд на натертому тілі?", "Where does the charge on a rubbed object come from?", chargeBodyUk, chargeBodyEn,
          ["Заряд квантується порціями e", "Тертя переносить електрони", "Нейтральний атом має нульовий сумарний заряд"],
          ["Charge comes in portions of e", "Rubbing moves electrons", "A neutral atom has zero net charge"]),
        num("ee-01-l1-n-v2", "Скільки кулонів у $2\\times 10^{10}$ електронах? Дайте модуль заряду.", "How many coulombs are in $2\\times 10^{10}$ electrons? Give the magnitude.", 3.204e-9, "C"),
        mcq("ee-01-l1-q-v2", "Що відбувається під час електризації тертям?", "What happens when an object is charged by rubbing?",
          ["Електрони переходять з одного тіла на інше", "У тілі народжуються нові протони", "Зникає маса тіла", "Заряд стає неперервною рідиною без частинок"],
          ["Electrons move from one object to the other", "New protons are created in the object", "The object's mass disappears", "Charge becomes a continuous fluid with no particles"], 0),
        createMatch({
          id: "ee-01-l1-m-v2",
          promptUk: "Зіставте частинку і знак її заряду.",
          promptEn: "Match each particle with the sign of its charge.",
          pairs: [
            { left: "протон", right: "додатний" },
            { left: "електрон", right: "від'ємний" },
            { left: "нейтрон", right: "нульовий" },
          ],
          explanationUk: "Протон додатний, електрон від'ємний, нейтрон не має заряду.",
          explanationEn: "A proton is positive, an electron is negative, and a neutron has no charge.",
        }),
        explain("ee-01-l1-x-v2", "Поясніть своїми словами, чому нейтральний атом не притягує папір, а натертий — притягує.", "Explain in your own words why a neutral atom does not pick up paper, while a rubbed object does.",
          "електрон", "electron",
          "Нейтральний атом має порівну протонів і електронів, тож сумарний заряд нульовий. Тертя забирає частину електронів, з'являється надлишковий заряд, і саме він діє на легкий папір.",
          "A neutral atom has matching proton and electron counts, so the net charge is zero. Rubbing removes some electrons, a net charge appears, and that charge acts on the paper."),
      ]),
      taught("ee-01-l2", "Електрони, протони, іони", "Electrons, protons, ions", 1, [
        concept("ee-01-l2-ions-v2", "Чим іон відрізняється від нейтрального атома?", "How does an ion differ from a neutral atom?",
          `Питання: якщо атом втратив один електрон, що змінилось у ядрі і що змінилось у заряді? Модель: число протонів задає хімічний елемент і в цій події не змінюється. Змінюється число електронів. Атом, який втратив електрон, має більше протонів, ніж електронів, і його називають додатним іоном. Атом, який прийняв зайвий електрон, — від'ємний іон. Математика проста і її треба записати до прикладу: $Q = (N_p - N_e)e$. Приклад. Натрій має 11 протонів і після втрати одного електрона 10 електронів. $Q = (11-10)\\times 1.602\\times 10^{-19} = +1.602\\times 10^{-19}\\,\\mathrm{C}$. Перевірка: один елементарний заряд — це саме той масштаб, який далі зустрінеться в електролізі. Помилка — думати, що додатний іон отримав новий протон. Межа: ми не описуємо хімічний зв'язок і не рахуємо енергію іонізації.`,
          `Question: if an atom loses one electron, what changed in the nucleus and what changed in the charge? The proton count fixes the element and does not change in this event. The electron count does. An atom that lost an electron has more protons than electrons and is a positive ion. An atom that gained an electron is a negative ion. Write the relation before the numbers: $Q = (N_p - N_e)e$. Example. Sodium has 11 protons and, after losing one electron, 10 electrons. $Q = (11-10)\\times 1.602\\times 10^{-19} = +1.602\\times 10^{-19}\\,\\mathrm{C}$. Check: one elementary charge is the scale later used in electrolysis. Mistake: imagining that a positive ion gained a proton. Limit: this is not a chemical-bond model and it does not compute ionization energy.`,
          ["Іон — атом із нерівною кількістю протонів і електронів", "Знак іона визначає надлишок або брак електронів"],
          ["An ion has unequal proton and electron counts", "The ion sign follows the electron surplus or deficit"]),
        num("ee-01-l2-n-v2", "Атом із 8 протонами захопив 2 зайві електрони. Який сумарний заряд у кулонах? Знак збережіть.", "An atom with 8 protons captures 2 extra electrons. What is the net charge in coulombs? Keep the sign.", -3.204e-19, "C"),
        mcq("ee-01-l2-q-v2", "Додатний іон утворюється, коли атом…", "A positive ion forms when an atom…",
          ["втрачає один або кілька електронів", "отримує новий протон з повітря", "втрачає нейтрон", "подвоює масу ядра"],
          ["loses one or more electrons", "gains a new proton from the air", "loses a neutron", "doubles the nuclear mass"], 0),
        createMatch({
          id: "ee-01-l2-m-v2",
          promptUk: "Зіставте опис і назву.",
          promptEn: "Match the description with the name.",
          pairs: [
            { left: "більше електронів, ніж протонів", right: "від'ємний іон" },
            { left: "більше протонів, ніж електронів", right: "додатний іон" },
            { left: "порівну протонів і електронів", right: "нейтральний атом" },
          ],
          explanationUk: "Знак визначає різниця кількостей, а не маса.",
          explanationEn: "The sign is the count difference, not the mass.",
        }),
        explain("ee-01-l2-x-v2", "Поясніть, чому додатний іон лишається тим самим елементом.", "Explain why a positive ion is still the same element.",
          "протон", "proton",
          "Хімічний елемент задає число протонів у ядрі. Втрата електрона змінює заряд, але не число протонів, тому це іон того самого елемента.",
          "The element is fixed by the proton count in the nucleus. Losing an electron changes the charge and does not change the proton count, so the ion is the same element."),
      ]),
      taught("ee-01-l3", "Провідники і діелектрики", "Conductors and dielectrics", 1, [
        concept("ee-01-l3-cond-v2", "Чому заряд розтікається по металу і лишається плямою на склі?", "Why does charge spread on a metal and stay in a patch on glass?",
          `Питання практичне: куди подінеться надлишковий заряд, якщо його передати металевій кулі, і куди він подінеться на сухій скляній паличці? У металі частина електронів не прив'язана до одного атома. Їх називають вільними. Вони можуть пересуватися всередині зразка, доки взаємне відштовхування не рознесе надлишок по поверхні. У склі чи сухому пластику електрони міцно тримаються своїх атомів. Такий матеріал називають діелектриком: заряд лишається там, куди його поклали. Математики кола тут ще немає. Є лише якісне правило рухливості і один підрахунок. Приклад. На металеву кулю передали $10^{-8}\\,\\mathrm{C}$. Цей заряд не лишається в точці дотику: вільні електрони перерозподіляються, доки поле всередині провідника в електростатиці не зникне. Помилка — називати діелектрик «матеріалом без зарядів». Заряди там є, вони просто не вільні. Межа: провідність реальних матеріалів залежить від температури і вологи, а ідеальний поділ «метал / скло» — навчальна модель.`,
          `Practical question: where does extra charge go on a metal sphere, and where does it stay on a dry glass rod? In a metal some electrons are not tied to one atom. Those free electrons move inside the sample until mutual repulsion spreads the surplus over the surface. In glass or dry plastic the electrons stay with their atoms. That material is a dielectric: charge remains where it was placed. There is no circuit equation yet. There is a mobility rule and one count. Example. A metal sphere receives $10^{-8}\\,\\mathrm{C}$. That charge does not stay at the contact point. Free electrons rearrange until, in electrostatics, the field inside the conductor is gone. Mistake: calling a dielectric a material with no charges. The charges are there. They are not free. Limit: real conductivity depends on temperature and moisture. The ideal split metal versus glass is a teaching model.`,
          ["У провіднику є вільні електрони", "У діелектрику заряд майже не рухаєтся"],
          ["A conductor has free electrons", "Charge hardly moves in a dielectric"]),
        mcq("ee-01-l3-q-v2", "Чому надлишковий заряд на ізольованій металевій кулі опиняється на поверхні?", "Why does surplus charge on an isolated metal sphere end on the surface?",
          ["Вільні електрони відштовхуються і розходяться якнайдалі", "Протони виходять з ядра на поверхню", "Метал знищує заряд усередині", "Куля не містить електронів"],
          ["Free electrons repel and move as far apart as they can", "Protons leave the nucleus for the surface", "The metal destroys charge inside", "The sphere contains no electrons"], 0),
        num("ee-01-l3-n-v2", "На діелектричну плівку поклали $5\\times 10^{9}$ зайвих електронів, і вони не розтікаються. Який заряд плями в кулонах? Знак збережіть.", "A dielectric film receives $5\\times 10^{9}$ extra electrons and they do not spread. What is the patch charge in coulombs? Keep the sign.", -8.01e-10, "C"),
        createMatch({
          id: "ee-01-l3-m-v2",
          promptUk: "Зіставте матеріал і поведінку заряду.",
          promptEn: "Match the material with the charge behaviour.",
          pairs: [
            { left: "мідь", right: "заряд розтікається" },
            { left: "сухе скло", right: "заряд лишається плямою" },
            { left: "солона вода", right: "рухаються іони" },
          ],
          explanationUk: "У металі вільні електрони, у склі їх немає, у розчині носії — іони.",
          explanationEn: "A metal has free electrons, dry glass does not, and a solution carries ions.",
        }),
        explain("ee-01-l3-x-v2", "Поясніть різницю між провідником і діелектриком без формул кола.", "Explain the difference between a conductor and a dielectric without any circuit formula.",
          "вільн", "free",
          "У провіднику є вільні електрони, тому надлишковий заряд перерозподіляється. У діелектрику електрони прив'язані до атомів, і заряд лишається на місці.",
          "A conductor has free electrons, so surplus charge rearranges. In a dielectric the electrons are bound to atoms and the charge stays put."),
      ]),
      taught("ee-01-l4", "Збереження заряду", "Conservation of charge", 1, [
        concept("ee-01-l4-cons-v2", "Куди зникає заряд, якщо два тіла торкнулись?", "Where does charge go when two objects touch?",
          `Питання: металева куля з зарядом $+6\\,\\mathrm{nC}$ торкається такої самої кулі із зарядом $-2\\,\\mathrm{nC}$. Який заряд буде на кожній після розведення, якщо вони однакові? Закон, який тут потрібен, один: у замкненій системі сума зарядів не змінюється. Електрони переходять, але не зникають. Дотик двох однакових провідних куль вирівнює заряди, бо вільні носії рухаються, доки потенціали не зрівняються, а для однакових куль це означає рівні заряди. Математика: $Q_1' = Q_2' = (Q_1+Q_2)/2$. Приклад. Сума $6+(-2) = 4\\,\\mathrm{nC}$, кожна куля отримує $2\\,\\mathrm{nC}$. Перевірка: $2+2 = 4$, сума збереглась. Помилка — додати модулі $6+2$ і сказати, що з'явилось $8\\,\\mathrm{nC}$. Межа: якщо кулі різні за розміром, заряди не діляться порівну, хоча сума все одно зберігається.`,
          `Question: a metal sphere with $+6\\,\\mathrm{nC}$ touches an identical sphere with $-2\\,\\mathrm{nC}$. What charge does each have after they separate? The needed rule is conservation: in a closed system the algebraic sum of charge does not change. Electrons move and do not vanish. Touching two identical conducting spheres equalises the charges, because free carriers move until the potentials match, and identical spheres then carry equal charges. The arithmetic is $Q_1' = Q_2' = (Q_1+Q_2)/2$. Example. The sum is $6+(-2) = 4\\,\\mathrm{nC}$, so each sphere gets $2\\,\\mathrm{nC}$. Check: $2+2 = 4$. Mistake: adding the magnitudes $6+2$ and claiming $8\\,\\mathrm{nC}$ appeared. Limit: unequal spheres do not split the charge in half, but the sum is still conserved.`,
          ["Алгебраїчна сума заряду зберігається", "Однакові провідні кулі ділять заряд порівну"],
          ["The algebraic charge sum is conserved", "Identical conducting spheres share charge equally"]),
        num("ee-01-l4-n-v2", "Кулі $+8\\,\\mathrm{nC}$ і $-2\\,\\mathrm{nC}$ однакові й торкаються. Який заряд кожної після розведення, у нанокулонах?", "Identical spheres of $+8\\,\\mathrm{nC}$ and $-2\\,\\mathrm{nC}$ touch. What is each charge after separation, in nanocoulombs?", 3, "nC"),
        mcq("ee-01-l4-q-v2", "Два тіла мали $+3\\,\\mathrm{nC}$ і $-3\\,\\mathrm{nC}$. Після контакту однакових куль заряд кожної став 0. Це означає, що…", "Two identical spheres held $+3\\,\\mathrm{nC}$ and $-3\\,\\mathrm{nC}$. After contact each reads 0. This means…",
          ["заряди компенсувались, сума лишилась нульовою", "заряд зник без переносу частинок", "протони знищили електрони як масу", "порушилось збереження"],
          ["the charges cancelled and the sum stayed zero", "charge vanished with no particle transfer", "protons destroyed electrons as mass", "conservation failed"], 0),
        num("ee-01-l4-n2-v2", "Три однакові кулі мають $9\\,\\mathrm{nC}$, $0$ і $0$. Першу по черзі торкають до другої і до третьої, щоразу розводячи. Який заряд лишиться на першій, у нКл? Підказка: після першого дотику на першій $4.5$, після другого вона ділить $4.5$ з нульовою кулею.", "Three identical spheres hold $9\\,\\mathrm{nC}$, $0$, and $0$. The first touches the second, then the third. What charge remains on the first, in nC?", 2.25, "nC"),
        explain("ee-01-l4-x-v2", "Поясніть, чому не можна додавати лише модулі зарядів.", "Explain why you must not add only the magnitudes of charges.",
          "сума", "sum",
          "Збереження стосується алгебраїчної суми зі знаком. Додатний і від'ємний заряд компенсуються, тому модулі додавати не можна: сума $+6$ і $-2$ дорівнює $+4$, а не $8$.",
          "Conservation applies to the algebraic sum, signs included. Positive and negative charge cancel, so magnitudes must not be added: the sum of $+6$ and $-2$ is $+4$, not $8$."),
      ]),
      taught("ee-01-l5", "Закон Кулона", "Coulomb's law", 2, [
        concept("ee-01-l5-coulomb-v2", "З якою силою відштовхуються два малі заряди?", "With what force do two small charges repel?",
          `Питання: чи можна вже порахувати силу, якщо відомі два заряди і відстань? Так, для точкових зарядів у повітрі чи вакуумі. Силу вводять після самої формули, не раніше. $F = k\\,|q_1 q_2|/r^2$, де $k = 8.99\\times 10^{9}\\,\\mathrm{N\\,m^2/C^2}$. Напрям: однакові знаки відштовхуються, різні притягуються. Приклад. $q_1 = q_2 = 1\\,\\mu\\mathrm{C}$, $r = 1\\,\\mathrm{m}$. $F = 8.99\\times 10^{9}\\times 10^{-12}/1 = 8.99\\,\\mathrm{N}$. Перевірка: два мікрокулони на відстані метра штовхають із силою порядку ваги тіла масою близько $0.9\\,\\mathrm{kg}$. Це правдоподібно велика сила для такого заряду, тому мікрокулон — уже чималий заряд. Другий приклад для самостійної звірки: $2\\,\\mu\\mathrm{C}$ і $3\\,\\mu\\mathrm{C}$ на $2\\,\\mathrm{m}$: $F = 8.99\\times 10^{9}\\times 6\\times 10^{-12}/4 = 0.0135\\,\\mathrm{N}$. Помилка — лінійно ділити силу на відстань замість квадрата. Межа: формула точкова, заряди нерухомі, середовище — вакуум. Розподілений заряд і рух носіїв сюди не входять.`,
          `Question: can the force be calculated once two charges and a distance are known? Yes, for point charges in air or vacuum. State the relation before using it: $F = k\\,|q_1 q_2|/r^2$ with $k = 8.99\\times 10^{9}\\,\\mathrm{N\\,m^2/C^2}$. Like signs repel and opposite signs attract. Example. $q_1 = q_2 = 1\\,\\mu\\mathrm{C}$ at $r = 1\\,\\mathrm{m}$. $F = 8.99\\times 10^{9}\\times 10^{-12} = 8.99\\,\\mathrm{N}$. Check: two microcoulombs a metre apart push about as hard as the weight of a $0.9\\,\\mathrm{kg}$ mass. A microcoulomb is a large charge. Second check: $2\\,\\mu\\mathrm{C}$ and $3\\,\\mu\\mathrm{C}$ at $2\\,\\mathrm{m}$ give $F = 8.99\\times 10^{9}\\times 6\\times 10^{-12}/4 = 0.0135\\,\\mathrm{N}$. Mistake: letting the force fall in proportion to distance instead of distance squared. Limit: the charges are points, at rest, in vacuum. Distributed charge and moving carriers are outside this model.`,
          ["Сила пропорційна добутку зарядів", "Сила спадає як 1/r^2"],
          ["Force is proportional to the product of the charges", "Force falls as 1/r^2"]),
        num("ee-01-l5-n-v2", "Два заряди по $1\\,\\mu\\mathrm{C}$ на відстані $2\\,\\mathrm{m}$. Сила в ньютонах? Візьміть $k = 8.99\\times 10^{9}$.", "Two $1\\,\\mu\\mathrm{C}$ charges are $2\\,\\mathrm{m}$ apart. What is the force in newtons? Use $k = 8.99\\times 10^{9}$.", 2.2475, "N"),
        num("ee-01-l5-n2-v2", "Заряди $2\\,\\mu\\mathrm{C}$ і $3\\,\\mu\\mathrm{C}$ на відстані $2\\,\\mathrm{m}$. Сила в ньютонах?", "Charges of $2\\,\\mu\\mathrm{C}$ and $3\\,\\mu\\mathrm{C}$ are $2\\,\\mathrm{m}$ apart. Force in newtons?", 0.013485, "N"),
        mcq("ee-01-l5-q-v2", "Відстань між зарядами збільшили вдвічі, заряди ті самі. Сила…", "The distance between two charges is doubled and the charges stay the same. The force…",
          ["зменшується вчетверо", "зменшується вдвічі", "не змінюється", "збільшується вдвічі"],
          ["falls by a factor of four", "falls by a factor of two", "stays the same", "doubles"], 0),
        explain("ee-01-l5-x-v2", "Поясніть, чому однакові заряди не можуть самі собою зібратися в одну точку.", "Explain why like charges do not gather themselves into one point.",
          "відштовх", "repel",
          "Однакові заряди відштовхуються. Сила Кулона розштовхує їх тим сильніше, чим менша відстань, тому без зовнішньої дії вони не збираються в точку.",
          "Like charges repel. Coulomb's force pushes them apart more strongly as the distance shrinks, so they do not gather at a point by themselves."),
      ]),
      exam("ee-01-exam", "Контрольна: заряд і речовина", "Exam: charge and matter", [
        num("ee-01-exam-a1-v2", "$4\\times 10^{10}$ електронів. Модуль заряду в кулонах?", "Magnitude of the charge of $4\\times 10^{10}$ electrons, in coulombs?", 6.408e-9, "C", "A"),
        num("ee-01-exam-a2-v2", "Атом має 12 протонів і 10 електронів. Заряд у кулонах?", "An atom has 12 protons and 10 electrons. Charge in coulombs?", 3.204e-19, "C", "A"),
        num("ee-01-exam-a3-v2", "Однакові кулі $+10\\,\\mathrm{nC}$ і $+2\\,\\mathrm{nC}$ торкнулись. Заряд кожної в нКл?", "Identical spheres of $+10\\,\\mathrm{nC}$ and $+2\\,\\mathrm{nC}$ touch. Charge of each in nC?", 6, "nC", "A"),
        num("ee-01-exam-a4-v2", "Два заряди по $1\\,\\mu\\mathrm{C}$ на відстані $1\\,\\mathrm{m}$. Сила в ньютонах? $k=8.99\\times 10^9$.", "Two $1\\,\\mu\\mathrm{C}$ charges, $1\\,\\mathrm{m}$ apart. Force in newtons? $k=8.99\\times 10^9$.", 8.99, "N", "A"),
        num("ee-01-exam-a5-v2", "Ту саму пару зарядів рознесли на $3\\,\\mathrm{m}$. Сила в ньютонах?", "The same pair is moved to $3\\,\\mathrm{m}$. Force in newtons?", 0.9989, "N", "A"),
        num("ee-01-exam-a6-v2", "На плівку поклали $10^{10}$ зайвих електронів. Заряд плями в кулонах?", "A film receives $10^{10}$ extra electrons. Patch charge in coulombs?", -1.602e-9, "C", "A"),
        mcq("ee-01-exam-a7-v2", "Нейтрон…", "A neutron…", ["не має заряду", "заряджений додатно", "заряджений від'ємно", "має заряд 2e"], ["has no charge", "is positive", "is negative", "has charge 2e"], 0, "A"),
        mcq("ee-01-exam-a8-v2", "У діелектрику надлишковий заряд…", "In a dielectric, surplus charge…", ["майже не розтікається", "миттєво йде в землю сам", "знищується", "стає протонами"], ["hardly spreads", "flows to ground by itself", "is destroyed", "becomes protons"], 0, "A"),
        mcq("ee-01-exam-a9-v2", "Збереження заряду означає, що…", "Charge conservation means…", ["алгебраїчна сума в замкненій системі стала", "модулі завжди додаються", "заряд може зникнути", "протони перетворюються на електрони"], ["the algebraic sum in a closed system is constant", "magnitudes are always added", "charge may vanish", "protons turn into electrons"], 0, "A"),
        mcq("ee-01-exam-a10-v2", "Якщо відстань зменшити вдвічі, сила Кулона…", "If the distance is halved, the Coulomb force…", ["зростає вчетверо", "зростає вдвічі", "не змінюється", "зменшується вдвічі"], ["grows by four", "doubles", "is unchanged", "halves"], 0, "A"),
        num("ee-01-exam-b1-v2", "$5\\times 10^{9}$ протонів. Модуль заряду в кулонах?", "Magnitude of the charge of $5\\times 10^{9}$ protons, in coulombs?", 8.01e-10, "C", "B"),
        num("ee-01-exam-b2-v2", "Атом має 6 протонів і 8 електронів. Заряд у кулонах?", "An atom has 6 protons and 8 electrons. Charge in coulombs?", -3.204e-19, "C", "B"),
        num("ee-01-exam-b3-v2", "Однакові кулі $+4\\,\\mathrm{nC}$ і $-4\\,\\mathrm{nC}$ торкнулись. Заряд кожної в нКл?", "Identical spheres of $+4\\,\\mathrm{nC}$ and $-4\\,\\mathrm{nC}$ touch. Charge of each in nC?", 0, "nC", "B"),
        num("ee-01-exam-b4-v2", "Заряди $2\\,\\mu\\mathrm{C}$ і $2\\,\\mu\\mathrm{C}$ на відстані $1\\,\\mathrm{m}$. Сила в ньютонах?", "Charges $2\\,\\mu\\mathrm{C}$ and $2\\,\\mu\\mathrm{C}$ at $1\\,\\mathrm{m}$. Force in newtons?", 35.96, "N", "B"),
        num("ee-01-exam-b5-v2", "Цю пару рознесли на $2\\,\\mathrm{m}$. Сила в ньютонах?", "That pair is moved to $2\\,\\mathrm{m}$. Force in newtons?", 8.99, "N", "B"),
        num("ee-01-exam-b6-v2", "З тіла зняли $2\\times 10^{10}$ електронів. Заряд тіла в кулонах?", "An object loses $2\\times 10^{10}$ electrons. Its charge in coulombs?", 3.204e-9, "C", "B"),
        mcq("ee-01-exam-b7-v2", "Додатний іон має…", "A positive ion has…", ["менше електронів, ніж протонів", "зайвий нейтрон", "новий протон з повітря", "нульову масу"], ["fewer electrons than protons", "an extra neutron", "a new proton from the air", "zero mass"], 0, "B"),
        mcq("ee-01-exam-b8-v2", "Вільні електрони є насамперед у…", "Free electrons are found first of all in…", ["металі", "сухому склі", "вакуумі між зарядами", "нейтроні"], ["a metal", "dry glass", "the vacuum between charges", "a neutron"], 0, "B"),
        mcq("ee-01-exam-b9-v2", "Після дотику двох куль сума зарядів…", "After two spheres touch, the charge sum…", ["зберігається", "завжди стає нулем", "подвоюється", "залежить від кольору"], ["is conserved", "always becomes zero", "doubles", "depends on colour"], 0, "B"),
        mcq("ee-01-exam-b10-v2", "Різні за знаком точкові заряди…", "Point charges of opposite sign…", ["притягуються", "відштовхуються", "не діють", "знищують масу"], ["attract", "repel", "do not interact", "destroy mass"], 0, "B"),
      ]),
    ],
  }),
  ...stage1Rest,
];
