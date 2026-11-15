import { fmt, n, q, num, L, U } from "./ee-shape.mjs";

const vth = 6;
const rth = 1200;
const rl = 1800;
const vl = (vth * rl) / (rth + rl);
const iNorton = vth / rth;
const vlOther = (vth * rth) / (rth + rth);
const supA = (10 * 500) / 1500;
const supB = (5 * 500) / 1500;

const tol = 0.05 * 1000;
const rHot = 100 * (1 + 0.004 * 50);
const iMax = Math.sqrt(0.25 / 100);
const twoWire = 1 + 0.4;

const qCap = 100e-6 * 10;
const eCap = 0.5 * 100e-6 * 100;
const cSeries = 50e-6;
const cPar = 200e-6;
const cDie = 47e-9 * 2;

const vL = 0.2 * (2 / 0.01);
const eL = 0.5 * 0.2 * 4;
const lAiding = 0.2 + 0.3 + 2 * 0.05;
const lPar = 0.1;

const e1 = Math.exp(-1);
const ln100 = Math.log(100);
const integral = 3 * 4;

const tauRc = 1;
const vCh = 5 * (1 - e1);
const vDis = 5 * e1;
const tauRl = 0.02;
const iInf = 1.2;
const iTau = iInf * (1 - e1);

const w0 = 10000;
const alpha = 500;
const wd = Math.sqrt(w0 * w0 - alpha * alpha);
const qFactor = (w0 * 0.01) / 10;

export const units = [
  U({
    code: "ee-12",
    slug: "ee-12-mesh-thevenin-norton",
    titleUk: "Тевенен, Нортон і суперпозиція",
    titleEn: "Thévenin, Norton, and superposition",
    prereqUk: "Дільник, паралель опорів і баланс одного вузла.",
    prereqEn: "The divider, parallel resistance, and a single-node balance.",
    outcomeUk: "Учень замінює лінійне коло еквівалентом, навантажує його і відрізняє справжню схему від ідеального джерела готової напруги.",
    outcomeEn: "The learner replaces a linear circuit by an equivalent, loads it, and tells the real network from an ideal source of the desired voltage.",
    formulaUk: "Vth — напруга холостого ходу. Rth — опір з боку клем при вимкнених незалежних джерелах. In = Vth/Rth.",
    formulaEn: "Vth is the open-circuit voltage. Rth is the resistance seen at the terminals with independent sources deactivated. In = Vth/Rth.",
    labNoteUk: "Урок 1 вимірює холостий хід дільника 10 В, 2 кОм і 3 кОм: вузол out має дати Vth = 6 В.",
    labNoteEn: "Lesson 1 measures the open circuit of the 10 V, 2 kΩ, 3 kΩ divider: node out must read Vth = 6 V.",
    lessons: [
      L({
        titleUk: "Напруга і опір Тевенена",
        titleEn: "Thévenin voltage and resistance",
        tokenUk: "еквівалент",
        tokenEn: "equivalent",
        qUk: "Чим замінити дільник 10 В, 2 кОм і 3 кОм, якщо навантаження чіпляють до виходу?",
        qEn: "What replaces a 10 V, 2 kΩ and 3 kΩ divider once a load is attached at the output?",
        modelUk: "Лінійне коло з боку двох клем є джерелом Vth послідовно з Rth. Vth — це напруга, коли навантаження зняте. Rth — паралель плечей, бо ідеальне джерело напруги з боку клем є закороткою.",
        modelEn: "A linear circuit at two terminals is a source Vth in series with Rth. Vth is the voltage with the load removed. Rth is the parallel of the arms, because an ideal voltage source looks like a short from the terminals.",
        exUk: `Холостий хід 10·3/5 = ${fmt(vth)} В. Rth = 2000 паралельно 3000 = ${fmt(rth)} Ом. Еквівалент — 6 В послідовно з 1200 Ом.`,
        exEn: `The open circuit is 10·3/5 = ${fmt(vth)} V. Rth is 2000 in parallel with 3000, which is ${fmt(rth)} ohm. The equivalent is 6 V in series with 1200 ohm.`,
        checkUk: "Зняте навантаження справді дає 6 В, як ненавантажений дільник. Закорочені клеми дали б струм 6/1200 = 0,005 А, і це вже дослід Нортона.",
        checkEn: "With the load removed the voltage is 6 V, the same unloaded divider. Shorted terminals would carry 6/1200 = 0.005 A, which is the Norton test.",
        errUk: "Помилка — взяти Rth як суму 2 кОм і 3 кОм, залишивши джерело ввімкненим у розрахунку опору.",
        errEn: "The mistake is to take Rth as the sum of 2 kΩ and 3 kΩ, leaving the source active in the resistance calculation.",
        limUk: "Еквівалент чинний для лінійного кола і саме цих двох клем. Він не зберігає внутрішні струми, яких на клемах не видно.",
        limEn: "The equivalent holds for a linear circuit and for these two terminals. It does not preserve internal currents that never appear at the terminals.",
        lab: { vin: 10, r1: 2000, r2: 3000, uk: "Виміряйте холостий хід: 10 В, 2 кОм і 3 кОм. Вузол out є Vth.", en: "Measure the open circuit: 10 V, 2 kΩ and 3 kΩ. Node out is Vth." },
        nums: [
          num(vth, "V", "Дільник 10 В, 2 кОм і 3 кОм без навантаження. Vth у вольтах?", "Divider 10 V, 2 kΩ and 3 kΩ with no load. Vth in volts?"),
          num(rth, "ohm", "Rth цього дільника в омах?", "Rth of this divider in ohms?"),
        ],
        mcq: {
          uk: "Коли шукають Rth, ідеальне джерело напруги…",
          en: "When finding Rth, an ideal voltage source is…",
          optionsUk: ["замінюють закороткою", "лишають увімкненим", "замінюють розривом", "множать на струм"],
          optionsEn: ["replaced by a short", "left running", "replaced by an open", "multiplied by the current"],
          correct: 0,
        },
      }),
      L({
        titleUk: "Навантаження на еквівалент",
        titleEn: "A load on the equivalent",
        tokenUk: "навантаження",
        tokenEn: "load",
        qUk: "Яка напруга на 1800 Ом, якщо еквівалент — це 6 В і 1200 Ом?",
        qEn: "What voltage appears on 1800 ohm if the equivalent is 6 V and 1200 ohm?",
        modelUk: "Навантаження і Rth утворюють новий дільник. Струм один. Напруга на RL є Vth·RL/(Rth+RL). Повний дільник рахувати знову не потрібно.",
        modelEn: "The load and Rth form a new divider. There is one current. The voltage on RL is Vth·RL/(Rth+RL). The original divider does not need to be solved again.",
        exUk: `RL = ${rl} Ом. Вихід ${fmt(vth)}·${rl}/(${rth}+${rl}) = ${fmt(vl)} В. Струм ${fmt(vl / rl)} А.`,
        exEn: `RL is ${rl} ohm. The output is ${fmt(vth)}·${rl}/(${rth}+${rl}) = ${fmt(vl)} V. The current is ${fmt(vl / rl)} A.`,
        checkUk: "Частка 1800/3000 = 0,6, і 0,6·6 = 3,6. Потужність навантаження 3,6²/1800 = 0,0072 Вт.",
        checkEn: "The fraction 1800/3000 is 0.6, and 0.6·6 is 3.6. Load power is 3.6 squared over 1800, which is 0.0072 W.",
        errUk: "Помилка — віддати навантаженню всі 6 В, ніби Rth не стоїть у струмі.",
        errEn: "The mistake is to give the load the full 6 V, as if Rth were not in the current path.",
        limUk: "Формула для сталого опору навантаження. Нелінійне навантаження вимагає робочої точки, а не одного ділення.",
        limEn: "The formula is for a constant load resistance. A nonlinear load needs an operating point, not one division.",
        nums: [
          num(vl, "V", "Vth = 6 В, Rth = 1200 Ом, RL = 1800 Ом. Напруга навантаження у вольтах?", "Vth = 6 V, Rth = 1200 ohm, RL = 1800 ohm. Load voltage in volts?"),
          num(vl / rl, "A", "Струм цього навантаження в амперах?", "Current of this load in amperes?"),
        ],
        mcq: {
          uk: "Rth у колі навантаження…",
          en: "Rth in the loaded circuit…",
          optionsUk: ["ділить напругу разом із RL", "не впливає на вихід ніколи", "стоїть паралельно ідеальному Vth без струму", "піднімає Vth"],
          optionsEn: ["shares voltage with RL", "never affects the output", "sits across an ideal Vth and takes no current", "raises Vth"],
          correct: 0,
        },
      }),
      L({
        titleUk: "Джерело струму Нортона",
        titleEn: "The Norton current source",
        tokenUk: "Нортон",
        tokenEn: "Norton",
        qUk: "Який струм короткого замикання клем із Vth = 6 В і Rth = 1200 Ом?",
        qEn: "What is the short-circuit current of terminals with Vth = 6 V and Rth = 1200 ohm?",
        modelUk: "Еквівалент Нортона — джерело струму In паралельно з тим самим Rth. In є струмом закорочених клем і дорівнює Vth/Rth. На тому самому RL напруга збігається з Тевененом.",
        modelEn: "The Norton equivalent is a current source In in parallel with the same Rth. In is the current of the shorted terminals and equals Vth/Rth. On the same RL the voltage matches Thévenin.",
        exUk: `In = ${fmt(vth)}/${fmt(rth)} = ${fmt(iNorton)} А. Паралель Rth і RL дає ${fmt((rth * rl) / (rth + rl))} Ом. Напруга ${fmt(iNorton)}·${fmt((rth * rl) / (rth + rl))} = ${fmt(vl)} В.`,
        exEn: `In = ${fmt(vth)}/${fmt(rth)} = ${fmt(iNorton)} A. The parallel of Rth and RL is ${fmt((rth * rl) / (rth + rl))} ohm. The voltage is ${fmt(iNorton)}·${fmt((rth * rl) / (rth + rl))} = ${fmt(vl)} V.`,
        checkUk: "3,6 В зійшлися з дільником Тевенена. Два малюнки — одна пара клем.",
        checkEn: "3.6 V agrees with the Thévenin divider. The two drawings are one pair of terminals.",
        errUk: "Помилка — поставити In послідовно з Rth і вважати це Нортоном.",
        errEn: "The mistake is to place In in series with Rth and call that Norton.",
        limUk: "Перехід між формами потребує скінченного ненульового Rth. Ідеальне джерело напруги не має нормального Нортона.",
        limEn: "Moving between the forms needs a finite nonzero Rth. An ideal voltage source has no ordinary Norton form.",
        nums: [
          num(iNorton, "A", "Vth = 6 В, Rth = 1200 Ом. Струм Нортона в амперах?", "Vth = 6 V, Rth = 1200 ohm. Norton current in amperes?"),
          num(vl, "V", "Той самий Нортон на RL = 1800 Ом. Напруга у вольтах?", "That same Norton source on RL = 1800 ohm. Voltage in volts?"),
        ],
        mcq: {
          uk: "Джерело Нортона відносно Rth стоїть…",
          en: "The Norton source, relative to Rth, is…",
          optionsUk: ["паралельно", "послідовно", "замість навантаження завжди", "у розриві землі"],
          optionsEn: ["in parallel", "in series", "in place of the load, always", "in a break of ground"],
          correct: 0,
        },
      }),
      L({
        titleUk: "Суперпозиція двох джерел",
        titleEn: "Superposition of two sources",
        tokenUk: "суперпозиція",
        tokenEn: "superposition",
        qUk: "Яка напруга вузла, якщо порахувати 10 В і 5 В окремо?",
        qEn: "What is the node voltage if the 10 V source and the 5 V source are solved separately?",
        modelUk: "У лінійному колі кожне незалежне джерело вмикають по черзі. Інше джерело напруги замінюють закороткою. Напруги вузла додають. Джерело струму вимикали б розривом.",
        modelEn: "In a linear circuit each independent source is turned on in turn. The other voltage source is replaced by a short. The node voltages add. A current source would be removed by an open.",
        exUk: `Лише 10 В: два кілооми в нуль паралельно дають 500 Ом, вихід ${fmt(supA)} В. Лише 5 В: так само ${fmt(supB)} В. Сума ${fmt(supA + supB)} В.`,
        exEn: `With only 10 V, two kilohms to zero in parallel make 500 ohm and the output is ${fmt(supA)} V. With only 5 V the output is ${fmt(supB)} V. The sum is ${fmt(supA + supB)} V.`,
        checkUk: "Пряме вузлове рівняння того самого кола також дало 5 В. Суперпозиція не створила нового фізичного режиму, вона розклала лінійну задачу.",
        checkEn: "The direct node equation of the same circuit also gave 5 V. Superposition did not create a new physical regime. It split a linear problem.",
        errUk: "Помилка — додати потужності окремих дослідів. Потужність квадратична, і суперпозиція для неї не діє.",
        errEn: "The mistake is to add the powers of the separate experiments. Power is quadratic, and superposition does not apply to it.",
        limUk: "Лише лінійні струми і напруги. Діод, насичений транзистор і I²R так не додають.",
        limEn: "Only linear currents and voltages. A diode, a saturated transistor, and I squared R do not add this way.",
        nums: [
          num(supA, "V", "Внесок лише джерела 10 В у описаному вузлі, у вольтах?", "Contribution of the 10 V source alone at the described node, in volts?"),
          num(supA + supB, "V", "Сума внесків 10 В і 5 В, у вольтах?", "Sum of the 10 V and 5 V contributions, in volts?"),
        ],
        mcq: {
          uk: "Під час суперпозиції друге джерело напруги…",
          en: "During superposition the other voltage source is…",
          optionsUk: ["замінюють закороткою", "лишають увімкненим", "замінюють розривом", "підносять до квадрата"],
          optionsEn: ["replaced by a short", "left running", "replaced by an open", "squared"],
          correct: 0,
        },
      }),
      L({
        titleUk: "Підміна готовим джерелом виходу",
        titleEn: "Substituting a ready-made output source",
        tokenUk: "підміна",
        tokenEn: "substitution",
        qUk: "Чому ідеальні 3,6 В замість еквівалента проходять одну нагрузку і провалюють іншу?",
        qEn: "Why do ideal 3.6 V in place of the equivalent pass one load and fail another?",
        modelUk: "Справжній еквівалент має Rth. Напруга на RL падає, коли RL зменшують. Ідеальне джерело потрібної напруги тримає 3,6 В на будь-якому RL. Один збіг не доводить схему.",
        modelEn: "The real equivalent has Rth. The voltage on RL falls when RL is reduced. An ideal source of the desired voltage holds 3.6 V at any RL. One agreement does not prove the circuit.",
        exUk: `При RL = Rth = 1200 Ом справжня напруга ${fmt(vlOther)} В. Підмінне джерело 3,6 В усе ще покаже 3,6 В. Різниця ${fmt(vl - vlOther)} В викриває підміну.`,
        exEn: `At RL = Rth = 1200 ohm the true voltage is ${fmt(vlOther)} V. A substitute 3.6 V source still reads 3.6 V. The difference of ${fmt(vl - vlOther)} V exposes the substitution.`,
        checkUk: "На 1800 Ом обидві моделі дають 3,6 В, тому цей єдиний дослід сліпий. Друге навантаження є обов'язковою перевіркою.",
        checkEn: "At 1800 ohm both models give 3.6 V, so that single test is blind. A second load is a required check.",
        errUk: "Помилка — прийняти роботу, якщо вихід збігся на одному обумовленому навантаженні.",
        errEn: "The mistake is to accept the work when the output matches at one specified load.",
        limUk: "Аргумент стосується лінійного резистивного еквівалента. Стабілізатор із зворотним зв'язком навмисно тримає напругу, і його перевіряють інакше: струмом і межею входу.",
        limEn: "The argument is about a linear resistive equivalent. A feedback regulator is meant to hold the voltage, and it is tested differently: by current and by the input limit.",
        nums: [
          num(vlOther, "V", "Vth = 6 В, Rth = 1200 Ом, RL = 1200 Ом. Справжня напруга у вольтах?", "Vth = 6 V, Rth = 1200 ohm, RL = 1200 ohm. True voltage in volts?"),
          num(3.6, "V", "Ідеальне джерело 3,6 В на тому самому RL = 1200 Ом. Яку напругу воно втримає, у вольтах?", "An ideal 3.6 V source on the same RL = 1200 ohm. What voltage does it hold, in volts?"),
        ],
        mcq: {
          uk: "Збіг на одному навантаженні…",
          en: "Agreement at one load…",
          optionsUk: ["не відрізняє еквівалент від ідеального джерела цієї напруги", "доводить увесь проєкт", "вимірює Rth сам", "скасовує другий дослід"],
          optionsEn: ["does not distinguish the equivalent from an ideal source of that voltage", "proves the whole design", "measures Rth by itself", "cancels the second test"],
          correct: 0,
        },
      }),
    ],
    examA: [
      n(8, "V", "Дільник 12 В, зверху 1 кОм, знизу 2 кОм. Vth у вольтах?", "Divider 12 V, 1 kΩ on top, 2 kΩ below. Vth in volts?"),
      n(666.666667, "ohm", "Rth цього дільника: 1000 паралельно 2000. В омах?", "Rth of this divider: 1000 in parallel with 2000. In ohms?"),
      n(4, "V", "Vth = 8 В, Rth = 2000 Ом, RL = 2000 Ом. Напруга у вольтах?", "Vth = 8 V, Rth = 2000 ohm, RL = 2000 ohm. Voltage in volts?"),
      n(0.004, "A", "In для Vth = 8 В і Rth = 2000 Ом, в амперах?", "In for Vth = 8 V and Rth = 2000 ohm, in amperes?"),
      n(2, "V", "Внесок одного джерела 6 В у вузол, де частка дорівнює одній третині. У вольтах?", "Contribution of one 6 V source at a node whose fraction is one third. In volts?"),
      n(3, "V", "Справжня напруга при Vth = 6 В і RL = Rth. У вольтах?", "True voltage when Vth = 6 V and RL = Rth. In volts?"),
      q("Rth шукають при незалежних джерелах напруги…", "Rth is found with independent voltage sources…", ["закорочених", "увімкнених", "піднесених до квадрата", "замінених на RL"], ["shorted", "left on", "squared", "replaced by RL"]),
      q("Нортон від Тевенена відрізняється тим, що…", "Norton differs from Thévenin in that…", ["струм стоїть паралельно Rth", "опір інший завжди", "напруга холостого ходу інша", "навантаження заборонене"], ["the current sits in parallel with Rth", "the resistance is always different", "the open-circuit voltage differs", "a load is forbidden"]),
      q("Потужності двох дослідів суперпозиції…", "The powers of two superposition experiments…", ["не додають", "завжди додають", "ділять на Rth", "є струмами"], ["do not add", "always add", "are divided by Rth", "are currents"]),
      q("Ідеальне джерело рівно тієї напруги, що потрібна на одному RL…", "An ideal source of exactly the voltage required at one RL…", ["провалюється на іншому RL, якщо в схемі є Rth", "замінює будь-який проєкт", "вимірює суперпозицію", "робить In нулем"], ["fails at another RL if the network has Rth", "replaces any design", "measures superposition", "makes In zero"]),
    ],
    examB: [
      n(4, "V", "Дільник 16 В, два рівні плечі по 2 кОм. Vth у вольтах?", "Divider 16 V, two equal 2 kΩ arms. Vth in volts?"),
      n(1000, "ohm", "Rth двох паралельних 2 кОм, в омах?", "Rth of two parallel 2 kΩ resistors, in ohms?"),
      n(2, "V", "Vth = 4 В, Rth = 1000 Ом, RL = 1000 Ом. Напруга у вольтах?", "Vth = 4 V, Rth = 1000 ohm, RL = 1000 ohm. Voltage in volts?"),
      n(0.004, "A", "In для 4 В і 1000 Ом, в амперах?", "In for 4 V and 1000 ohm, in amperes?"),
      n(1.5, "V", "Два рівні внески суперпозиції по 0,75 В. Сума у вольтах?", "Two equal superposition contributions of 0.75 V. Sum in volts?"),
      n(0.002, "A", "Струм навантаження 2 В на 1000 Ом, в амперах?", "Current of a 2 V load on 1000 ohm, in amperes?"),
      q("Vth — це…", "Vth is…", ["напруга розімкнених клем", "струм короткого замикання", "опір навантаження", "сума потужностей"], ["the open-terminal voltage", "the short-circuit current", "the load resistance", "the sum of the powers"]),
      q("Джерело струму під час суперпозиції вимикають…", "A current source during superposition is removed by…", ["розривом його гілки", "закороткою", "множенням на RL", "піднесенням до квадрата"], ["an open in its branch", "a short", "multiplication by RL", "squaring"]),
      q("Один дослід на обумовленому RL…", "One test at the specified RL…", ["не бачить підміну ідеальним джерелом", "вимірює Rth повністю", "замінює другий дослід", "доводить нелінійність"], ["cannot see a substitution by an ideal source", "measures Rth completely", "replaces the second test", "proves nonlinearity"]),
      q("Еквівалент двох клем…", "A two-terminal equivalent…", ["не показує внутрішні струми", "зберігає кожен внутрішній резистор", "працює для діода так само", "скасовує лінійність"], ["does not show internal currents", "keeps every internal resistor", "works the same for a diode", "cancels linearity"]),
    ],
  }),
  U({
    code: "ee-13",
    slug: "ee-13-real-resistors",
    titleUk: "Реальний резистор",
    titleEn: "A real resistor",
    prereqUk: "Закон Ома, потужність і префікси одиниць.",
    prereqEn: "Ohm's law, power, and unit prefixes.",
    outcomeUk: "Учень рахує допуск, температурний зсув, границю за потужністю і помилку двопровідного виміру малого опору.",
    outcomeEn: "The learner calculates tolerance, a temperature shift, the power limit, and the error of a two-wire measurement of a small resistance.",
    formulaUk: "R(T) = R0(1+αΔT). Imax = sqrt(Pном/R). Два провідники щупа додаються до показу.",
    formulaEn: "R(T) = R0(1+αΔT). Imax = sqrt(Prated/R). The two probe leads add to the reading.",
    lessons: [
      L({
        titleUk: "Допуск номіналу",
        titleEn: "Tolerance of the nominal value",
        tokenUk: "допуск",
        tokenEn: "tolerance",
        qUk: "У яких межах лежить резистор 1000 Ом ±5%?",
        qEn: "Within what limits does a 1000 ohm ±5% resistor lie?",
        modelUk: "Допуск — це дозволений відхил від написаного номіналу, не виміряна похибка конкретного екземпляра. Межі 1000·(1±0,05).",
        modelEn: "Tolerance is the allowed departure from the printed nominal value, not the measured error of one specimen. The limits are 1000·(1±0.05).",
        exUk: `П'ять відсотків від 1000 Ом — це ${fmt(tol)} Ом. Нижня межа ${fmt(1000 - tol)} Ом, верхня ${fmt(1000 + tol)} Ом.`,
        exEn: `Five percent of 1000 ohm is ${fmt(tol)} ohm. The lower limit is ${fmt(1000 - tol)} ohm and the upper limit is ${fmt(1000 + tol)} ohm.`,
        checkUk: "950 і 1050 симетричні навколо 1000. Резистор 940 Ом уже поза цим допуском, навіть якщо коло ще працює.",
        checkEn: "950 and 1050 are symmetric about 1000. A 940 ohm resistor is outside this tolerance even if the circuit still works.",
        errUk: "Помилка — додати 5 Ом замість 5 відсотків або вважати допуск випадковим виміром одного дня.",
        errEn: "The mistake is to add 5 ohm instead of 5 percent, or to treat the tolerance as one day's random measurement.",
        limUk: "Смуга допуску не замінює температурний коефіцієнт. Обидва відхили можуть додатися.",
        limEn: "The tolerance band does not replace the temperature coefficient. Both departures can add.",
        nums: [
          num(1000 - tol, "ohm", "1000 Ом ±5%. Нижня межа в омах?", "1000 ohm ±5%. Lower limit in ohms?"),
          num(1000 + tol, "ohm", "Верхня межа того самого резистора в омах?", "Upper limit of that same resistor in ohms?"),
        ],
        mcq: {
          uk: "Напис ±5% означає…",
          en: "The marking ±5% means…",
          optionsUk: ["дозволений відхил від номіналу", "обов'язкову похибку виміру сьогодні", "потужність 5 Вт", "температуру 5 градусів"],
          optionsEn: ["the allowed departure from nominal", "a required measurement error today", "a power of 5 W", "a temperature of 5 degrees"],
          correct: 0,
        },
      }),
      L({
        titleUk: "Зсув від температури",
        titleEn: "Shift with temperature",
        tokenUk: "температура",
        tokenEn: "temperature",
        qUk: "Яким стане опір 100 Ом, якщо α = 0,004 1/°C і деталь нагрілась на 50 °C?",
        qEn: "What does 100 ohm become if α = 0.004 per °C and the part heats by 50 °C?",
        modelUk: "Лінійна модель R = R0(1+αΔT) описує металевий резистор у помірному інтервалі. α тут додатний: нагрів збільшує опір.",
        modelEn: "The linear model R = R0(1+αΔT) describes a metal resistor over a moderate interval. Alpha here is positive: heating increases the resistance.",
        exUk: `αΔT = 0,004·50 = 0,2. Приріст 20 Ом. Новий опір ${fmt(rHot)} Ом.`,
        exEn: `αΔT = 0.004·50 = 0.2. The increase is 20 ohm. The new resistance is ${fmt(rHot)} ohm.`,
        checkUk: "100·1,2 = 120. Якби α був від'ємний, той самий нагрів зменшив би опір. Знак α беруть із типу матеріалу, не з назви уроку.",
        checkEn: "100·1.2 = 120. If alpha were negative, the same heating would lower the resistance. The sign of alpha comes from the material, not from the lesson title.",
        errUk: "Помилка — додати 0,004 Ом на весь нагрів, забувши помножити на R0 і на ΔT.",
        errEn: "The mistake is to add 0.004 ohm for the whole temperature rise, forgetting to multiply by R0 and by ΔT.",
        limUk: "Лінійний α не діє біля перегріву, де резистор уже змінює структуру або йде в обрив. Це модель помірного зсуву.",
        limEn: "A linear alpha does not hold near overheating, where the resistor changes structure or opens. This is a moderate-shift model.",
        nums: [
          num(rHot, "ohm", "R0 = 100 Ом, α = 0,004 1/°C, ΔT = 50 °C. Новий опір в омах?", "R0 = 100 ohm, α = 0.004 per °C, ΔT = 50 °C. New resistance in ohms?"),
          num(20, "ohm", "На скільки ом виріс опір у цьому прикладі?", "By how many ohms did the resistance rise in this example?"),
        ],
        mcq: {
          uk: "Додатний α металевого резистора означає, що з нагрівом опір…",
          en: "A positive alpha of a metal resistor means that with heat the resistance…",
          optionsUk: ["зростає", "завжди падає", "стає ємністю", "не залежить від ΔT"],
          optionsEn: ["rises", "always falls", "becomes a capacitance", "does not depend on ΔT"],
          correct: 0,
        },
      }),
      L({
        titleUk: "Межа за потужністю",
        titleEn: "The power limit",
        tokenUk: "потужність",
        tokenEn: "power",
        qUk: "Який найбільший струм витримує резистор 100 Ом із номіналом 0,25 Вт у цій моделі?",
        qEn: "What is the largest current a 100 ohm, 0.25 W resistor can take in this model?",
        modelUk: "Номінал потужності задає P = I²R. Звідси Imax = sqrt(P/R), а Vmax = sqrt(P·R). Перевищення гріє вище умови, для якої написано номінал.",
        modelEn: "The power rating sets P = I squared R. Then Imax = sqrt(P/R) and Vmax = sqrt(P·R). Exceeding it heats the part above the condition for which the rating was written.",
        exUk: `Imax = sqrt(0,25/100) = ${fmt(iMax)} А. Напруга при цьому ${fmt(iMax * 100)} В. Потужність знов 0,25 Вт.`,
        exEn: `Imax = sqrt(0.25/100) = ${fmt(iMax)} A. The voltage at that current is ${fmt(iMax * 100)} V. The power is again 0.25 W.`,
        checkUk: "0,05²·100 = 0,25. Струм 0,1 А дав би 1 Вт, учетверо вище номіналу.",
        checkEn: "0.05 squared times 100 is 0.25. A current of 0.1 A would make 1 W, four times the rating.",
        errUk: "Помилка — ділити 0,25 Вт на 100 Ом і назвати результат струмом. Так виходить провідність, помножена не на ту величину.",
        errEn: "The mistake is to divide 0.25 W by 100 ohm and call the result a current. That produces the wrong dimension.",
        limUk: "0,25 Вт тут узято як навчальний номінал за типової умови охолодження. Реальний корпус і група резисторів знижують дозволену потужність.",
        limEn: "0.25 W is taken here as a classroom rating at a typical cooling condition. A real package and a group of resistors reduce the allowed power.",
        nums: [
          num(iMax, "A", "100 Ом, номінал 0,25 Вт. Найбільший струм в амперах?", "100 ohm, rating 0.25 W. Largest current in amperes?"),
          num(5, "V", "Яка напруга на цьому резисторі при струмі 0,05 А, у вольтах?", "What voltage is on this resistor at 0.05 A, in volts?"),
        ],
        mcq: {
          uk: "Imax з потужності і опору — це…",
          en: "Imax from power and resistance is…",
          optionsUk: ["sqrt(P/R)", "P/R", "P·R", "R/P"],
          optionsEn: ["sqrt(P/R)", "P/R", "P·R", "R/P"],
          correct: 0,
        },
      }),
      L({
        titleUk: "Повзунок без навантаження",
        titleEn: "An unloaded wiper",
        tokenUk: "повзунок",
        tokenEn: "wiper",
        qUk: "Яку напругу дає лінійний потенціометр 10 кОм, якщо повзунок стоїть на 30% від нижнього кінця?",
        qEn: "What voltage does a linear 10 kΩ potentiometer give when the wiper is 30% up from the bottom end?",
        modelUk: "Без навантаження повзунок ділить доріжку як дільник. Лінійність означає, що опір пропорційний положенню. 30% знизу — це 3 кОм знизу і 7 кОм зверху.",
        modelEn: "With no load the wiper divides the track as a divider. Linearity means resistance is proportional to position. Thirty percent from the bottom is 3 kΩ below and 7 kΩ above.",
        exUk: "Джерело 10 В. Частка 0,3. Вихід 3 В. Струм доріжки 10/10000 = 0,001 А, якщо повзунок нічого не забирає.",
        exEn: "The source is 10 V. The fraction is 0.3. The output is 3 V. The track current is 10/10000 = 0.001 A if the wiper draws nothing.",
        checkUk: "3 кОм / 10 кОм · 10 В = 3 В. Навантаження на повзунку зменшить цю напругу, як будь-який навантажений дільник.",
        checkEn: "3 kΩ / 10 kΩ times 10 V is 3 V. A load on the wiper lowers this voltage, like any loaded divider.",
        errUk: "Помилка — вважати 30% положенням від верхнього кінця і отримати 7 В.",
        errEn: "The mistake is to read 30% as a position from the top end and get 7 V.",
        limUk: "Доріжка ідеально лінійна і не навантажена. Реальний повзунок має опір контакту, а шкала може бути логарифмічною.",
        limEn: "The track is perfectly linear and unloaded. A real wiper has contact resistance, and the scale may be logarithmic.",
        nums: [
          num(3, "V", "10 В на лінійному потенціометрі, повзунок на 30% від низу. Вихід у вольтах?", "10 V across a linear potentiometer, wiper at 30% from the bottom. Output in volts?"),
          num(0.001, "A", "Струм доріжки 10 кОм від 10 В, якщо повзунок не навантажений, в амперах?", "Track current of 10 kΩ from 10 V if the wiper is unloaded, in amperes?"),
        ],
        mcq: {
          uk: "Навантаження на повзунку…",
          en: "A load on the wiper…",
          optionsUk: ["знижує напругу відносно ненавантаженої частки", "не змінює вихід ніколи", "робить доріжку джерелом струму", "піднімає 30% до 70% саме"],
          optionsEn: ["lowers the voltage relative to the unloaded fraction", "never changes the output", "makes the track a current source", "raises 30% to 70% by itself"],
          correct: 0,
        },
      }),
      L({
        titleUk: "Два проводи щупа",
        titleEn: "Two probe leads",
        tokenUk: "щуп",
        tokenEn: "probe",
        qUk: "Що покаже двопровідний омметр на резисторі 1 Ом, якщо кожен провід щупа має 0,2 Ом?",
        qEn: "What does a two-wire ohmmeter read on a 1 ohm resistor if each probe lead has 0.2 ohm?",
        modelUk: "Двопровідний вимір вмикає опір двох проводів послідовно з деталлю. Чотирипровідний вимір відділяє струм від кіл напруги, і спадок проводів майже не входить у показ.",
        modelEn: "A two-wire measurement puts the resistance of both leads in series with the part. A four-wire measurement separates the current from the voltage pair, so the lead drop hardly enters the reading.",
        exUk: `Два проводи дають ${fmt(0.4)} Ом. Показ ${fmt(twoWire)} Ом замість 1 Ом. Абсолютна помилка 0,4 Ом, тобто 40% від шуканого.`,
        exEn: `The two leads contribute ${fmt(0.4)} ohm. The reading is ${fmt(twoWire)} ohm instead of 1 ohm. The absolute error is 0.4 ohm, which is 40% of the value sought.`,
        checkUk: "1 + 0,2 + 0,2 = 1,4. На резисторі 10 кОм ті самі 0,4 Ом були б непомітні. Малий опір і вимагає чотирьох проводів.",
        checkEn: "1 + 0.2 + 0.2 = 1.4. On a 10 kΩ resistor the same 0.4 ohm would be invisible. A small resistance is what calls for four wires.",
        errUk: "Помилка — відняти лише один провід або вважати показ 1,4 Ом істинним опором деталі.",
        errEn: "The mistake is to subtract only one lead, or to treat the 1.4 ohm reading as the true resistance of the part.",
        limUk: "0,2 Ом на провід — навчальне припущення, не паспорт конкретного щупа. Контакт і нагрів додають своє.",
        limEn: "0.2 ohm per lead is a classroom assumption, not the datasheet of a particular probe. Contact and heating add their own terms.",
        nums: [
          num(twoWire, "ohm", "Резистор 1 Ом і два проводи по 0,2 Ом. Двопровідний показ в омах?", "A 1 ohm resistor and two leads of 0.2 ohm. Two-wire reading in ohms?"),
          num(0.4, "ohm", "Яка абсолютна помилка цього показу, в омах?", "What is the absolute error of that reading, in ohms?"),
        ],
        mcq: {
          uk: "Чотирипровідний вимір малого опору потрібен, бо…",
          en: "A four-wire measurement of a small resistance is needed because…",
          optionsUk: ["опори проводів інакше входять у показ", "він збільшує допуск резистора", "він скасовує закон Ома", "він міряє лише напругу мережі"],
          optionsEn: ["lead resistance would otherwise enter the reading", "it increases the resistor tolerance", "it cancels Ohm's law", "it measures only the mains voltage"],
          correct: 0,
        },
      }),
    ],
    examA: [
      n(970, "ohm", "1000 Ом ±3%. Нижня межа в омах?", "1000 ohm ±3%. Lower limit in ohms?"),
      n(1030, "ohm", "Верхня межа 1000 Ом ±3%, в омах?", "Upper limit of 1000 ohm ±3%, in ohms?"),
      n(110, "ohm", "R0 = 100 Ом, α = 0,002 1/°C, ΔT = 50 °C. Новий опір в омах?", "R0 = 100 ohm, α = 0.002 per °C, ΔT = 50 °C. New resistance in ohms?"),
      n(0.1, "A", "Резистор 100 Ом, номінал 1 Вт. Imax в амперах?", "A 100 ohm resistor rated 1 W. Imax in amperes?"),
      n(2, "V", "Лінійний повзунок на 20% від низу, джерело 10 В, без навантаження. Вихід у вольтах?", "A linear wiper at 20% from the bottom, 10 V source, no load. Output in volts?"),
      n(1.2, "ohm", "0,8 Ом деталі і два проводи по 0,2 Ом. Двопровідний показ в омах?", "A 0.8 ohm part and two leads of 0.2 ohm. Two-wire reading in ohms?"),
      q("Допуск ±5% рахують від…", "A ±5% tolerance is computed from…", ["номіналу", "випадкового виміру сусіда", "потужності у ватах", "довжини щупа"], ["the nominal value", "a neighbour's random measurement", "the power in watts", "the probe length"]),
      q("Додатний α збільшує опір, коли…", "A positive alpha increases resistance when…", ["температура зростає", "температура падає", "струм нульовий обов'язково", "щуп чотирипровідний"], ["temperature rises", "temperature falls", "the current is necessarily zero", "the probe is four-wire"]),
      q("Imax = sqrt(P/R) має вимір…", "Imax = sqrt(P/R) has the dimension of…", ["струму", "опору", "напруги у квадраті", "допуску"], ["current", "resistance", "voltage squared", "tolerance"]),
      q("Два проводи щупа на малому опорі…", "Two probe leads on a small resistance…", ["додають помітну помилку", "завжди невидимі", "зменшують опір деталі", "замінюють α"], ["add a visible error", "are always invisible", "reduce the part's resistance", "replace alpha"]),
    ],
    examB: [
      n(980, "ohm", "1000 Ом ±2%. Нижня межа в омах?", "1000 ohm ±2%. Lower limit in ohms?"),
      n(140, "ohm", "100 Ом, α = 0,004, ΔT = 100 °C. Новий опір в омах?", "100 ohm, α = 0.004, ΔT = 100 °C. New resistance in ohms?"),
      n(40, "ohm", "Приріст опору в попередній задачі, в омах?", "The resistance increase in the previous problem, in ohms?"),
      n(10, "V", "100 Ом і 0,1 А на межі 1 Вт. Напруга у вольтах?", "100 ohm and 0.1 A at the 1 W limit. Voltage in volts?"),
      n(6, "V", "Повзунок на 60% від низу, джерело 10 В, без навантаження. Вихід у вольтах?", "Wiper at 60% from the bottom, 10 V source, no load. Output in volts?"),
      n(0.5, "ohm", "Показ 2,5 Ом, деталь 2,0 Ом. Помилка проводів в омах?", "The reading is 2.5 ohm and the component is 2.0 ohm. Lead error in ohms?"),
      q("Лінійний потенціометр без навантаження…", "A linear potentiometer with no load…", ["ділить напругу пропорційно положенню", "завжди дає половину", "має α у формулі виходу", "не має струму доріжки"], ["divides voltage in proportion to position", "always gives half", "has alpha in the output formula", "has no track current"]),
      q("Номінал 0,25 Вт…", "A 0.25 W rating…", ["обмежує I²R за прийнятої умови охолодження", "є опором", "є допуском", "скасовує нагрів"], ["limits I squared R at the assumed cooling", "is a resistance", "is a tolerance", "cancels heating"]),
      q("Чотири проводи потрібні насамперед для…", "Four wires are needed first of all for…", ["малого опору", "мегаомного дільника завжди", "виміру α без резистора", "потужності джерела мережі"], ["a small resistance", "a megohm divider, always", "measuring alpha without a resistor", "the power of the mains source"]),
      q("Допуск і температурний зсув…", "Tolerance and the temperature shift…", ["можуть додатися", "взаємно знищуються завжди", "є однією величиною", "не мають одиниць"], ["can add", "always cancel each other", "are one quantity", "have no units"]),
    ],
  }),
];
