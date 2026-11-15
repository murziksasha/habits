import { fmt, n, q, num, L, U } from "./ee-shape.mjs";

const vex = 5;
const bias = 1.65;
const arm = 1000;
const gain = 100;
function vRight(rs) {
  return (vex * rs) / (arm + rs);
}
function vDiff(rs) {
  return vRight(rs) - vex / 2;
}
function vOut(rs, g = gain) {
  return bias + g * vDiff(rs);
}
const v1010 = vOut(1010);
const v1000 = vOut(1000);
const v990 = vOut(990);
const vGain10 = vOut(1010, 10);
const vOpen = vOut(1e8);
const vSwap = 2 * bias - v1010;
const sens = (v1010 - v1000) / 10;
const headHi = 3.3 - v1010;
const headLo = v990;
const rTh = 500;
const gLoaded = 10e6 / (1e5 + rTh);
const vLoaded = bias + gLoaded * vDiff(1010);
const rFilt = 1 / (2 * Math.PI * 1000 * 10e-9);
const fcBad = 1 / (2 * Math.PI * rFilt * 100e-9);

const vinH = 24;
const vinL = 18;
const vreg = 5;
const dutyH = vreg / vinH;
const dutyL = vreg / vinL;
const fSw = 1e5;
const lind = 220e-6;
const cout = 22e-6;
const dI24 = ((vinH - vreg) * dutyH) / (fSw * lind);
const dI18 = ((vinL - vreg) * dutyL) / (fSw * lind);
const rippleC = dI24 / (8 * fSw * cout);
const esr = 0.05;
const rippleE = esr * dI24;
const rds = 0.05;
const pSw = rds * dutyH;
const vf = 0.5;
const pDiode = (1 - dutyH) * vf;
const pDcr = 0.1;
const pLoss = pSw + pDiode + pDcr;
const pOut = 5;
const eta = pOut / (pOut + pLoss);
const buck1A = (vreg * 5) / (5 + 0.1);
const buckLight = (vreg * 50) / (50 + 0.1);
const buckStuck = (12 * 5) / (5 + 0.1);
const sag = (0.9 * 10e-6) / cout;
const dIsmall = ((vinH - vreg) * dutyH) / (fSw * 22e-6);
const rippleBad = dI24 / (8 * fSw * 2.2e-6);
const iBoundary = dI24 / 2;

const pMotor = 3000;
const pf = 0.75;
const vl = 400;
const sMotor = pMotor / pf;
const iLine = sMotor / (vl * Math.sqrt(3));
const vph = vl / Math.sqrt(3);
const zPhase = 40;
const rPhase = 30;
const xPhase = zPhase * Math.sqrt(1 - pf * pf);
const qMotor = sMotor * Math.sqrt(1 - pf * pf);
const pfGoal = 0.95;
const sGoal = pMotor / pfGoal;
const qGoal = sGoal * Math.sqrt(1 - pfGoal * pfGoal);
const qComp = qMotor - qGoal;
const omega = 2 * Math.PI * 50;
const cWye = qComp / (3 * vph * vph * omega);
const cDelta = qComp / (3 * vl * vl * omega);
const zLine = 0.5;
const dropPhase = iLine * zLine;
const dropLine = Math.sqrt(3) * dropPhase;
const pLine = 3 * iLine * iLine * 0.4;
const pTwo = 2000;
const vPhaseR = vph * pf;

export const units = [
  U({
    code: "ee-58",
    slug: "ee-58-project-analog-frontend",
    titleUk: "Проєкт: мостовий вимірювальний вузол",
    titleEn: "Project: a bridge measurement front end",
    pass: 1,
    prereqUk: "Міст, диференціальний підсилювач, зміщення і RC-фільтр нижніх частот.",
    prereqEn: "A bridge, a differential amplifier, a bias, and an RC low-pass filter.",
    outcomeUk: "Учень рахує вихід моста при 990, 1000 і 1010 Ом, ставить підсилення близько 100 і зміщення 1,65 В, тримає вихід у вікні 0–3,3 В і впізнає переставлене плече, обрив і підсилення 10.",
    outcomeEn: "The learner computes the bridge output at 990, 1000, and 1010 Ω, sets a gain near 100 and a bias of 1.65 V, keeps the output inside 0–3.3 V, and recognises a swapped arm, an open, and a gain of 10.",
    formulaUk: "Праве плече 5·Rs/(1000+Rs), ліве 2,5 В. Вихід ідеальної моделі 1,65 + 100·(Vправо−2,5). Фільтр: R = 1/(2π·1 кГц·10 нФ). Модель без рейок живлення: обрив датчика дає близько 252 В, а реальний підсилювач зупиниться на своєму живленні.",
    formulaEn: "The right arm is 5·Rs/(1000+Rs), the left is 2.5 V. The ideal-model output is 1.65 + 100·(Vright−2.5). The filter is R = 1/(2π·1 kHz·10 nF). The model has no supply rails: an open sensor gives about 252 V, while a real amplifier stops at its supply.",
    labNoteUk: "Сервер ганяє операційну точку еталона на 990, 1000 і 1010 Ом, на підсиленні 10 (обидва резистори зворотного зв'язку) і на обриві. Окреме AC-коло перевіряє зріз 1 кГц. Готове джерело на вузлі out відхиляється.",
    labNoteEn: "The server runs the reference operating point at 990, 1000, and 1010 Ω, at a gain of 10 (both feedback resistors), and at an open. A separate AC circuit checks the 1 kHz cutoff. A ready-made source on node out is rejected.",
    lessons: [
      L({
        d: 3,
        titleUk: "Вікно, яке вузол має витримати",
        titleEn: "The window the front end has to keep",
        tokenUk: "вікно",
        tokenEn: "window",
        qUk: "Які межі виходу задає інтерфейс 0–3,3 В, і що в них має потрапити при датчику 990, 1000 і 1010 Ом?",
        qEn: "What output limits does a 0–3.3 V interface set, and what has to land inside them at a sensor of 990, 1000, and 1010 Ω?",
        modelUk: "Міст живиться від 5 В. Три плечі по 1 кОм, четверте — датчик. На 1000 Ом різниця плечей нуль, і вихід має сидіти на зміщенні 1,65 В, посередині вікна інтерфейсу. На 1010 Ом різниця додатна, на 990 Ом від'ємна. Підсилення близько 100 розгортає ці мілівольти так, щоб обидва краї лишились між 0 і 3,3 В. Фільтр 1 кГц стоїть після підсилювача і на постійному струмі напруги не змінює. Вимога ще не є схемою: вона каже, який результат потім перевіряти.",
        modelEn: "The bridge is excited by 5 V. Three arms are 1 kΩ, and the fourth is the sensor. At 1000 Ω the arm difference is zero, and the output has to sit on the 1.65 V bias, in the middle of the interface window. At 1010 Ω the difference is positive, and at 990 Ω it is negative. A gain near 100 unfolds those millivolts so that both edges stay between 0 and 3.3 V. The 1 kHz filter follows the amplifier and does not change the DC voltage. A requirement is not yet a schematic: it says which result to check afterwards.",
        exUk: `На 1000 Ом вихід ${fmt(v1000)} В. На 1010 Ом ${fmt(v1010)} В. На 990 Ом ${fmt(v990)} В. Обидва краї всередині 0–3,3 В.`,
        exEn: `At 1000 Ω the output is ${fmt(v1000)} V. At 1010 Ω it is ${fmt(v1010)} V. At 990 Ω it is ${fmt(v990)} V. Both edges are inside 0–3.3 V.`,
        checkUk: "1,65 В є серединою. 2,89 В менше за 3,3 В. 0,39 В більше за 0.",
        checkEn: "1.65 V is the middle. 2.89 V is below 3.3 V. 0.39 V is above 0.",
        errUk: "Помилка — прийняти вимогу «підсилення 100» і не перевірити, чи краї датчика ще в вікні.",
        errEn: "The mistake is to accept the requirement “a gain of 100” and not check whether the sensor edges are still inside the window.",
        limUk: "0 і 3,3 В є межами інтерфейсу в умові, а не виміром конкретного перетворювача. Запас до межі рахують окремо.",
        limEn: "0 and 3.3 V are the interface limits in the problem, not a measurement of a particular converter. The margin to the limit is computed separately.",
        nums: [
          num(v1000, "V", "Вихід при датчику 1000 Ом, зміщенні 1,65 В і нульовій різниці моста?", "Output at a 1000 ohm sensor, a 1.65 V bias, and zero bridge difference?"),
          num(3.3, "V", "Верхня межа вікна інтерфейсу в умові проєкту, у вольтах?", "Upper edge of the interface window in the project statement, in volts?"),
        ],
        mcq: {
          uk: "Фільтр 1 кГц після підсилювача на постійній напрузі…",
          en: "A 1 kHz filter after the amplifier, at DC,…",
          optionsUk: ["не змінює усталену напругу ненавантаженого виходу", "множить її на 100 ще раз", "прибирає зміщення 1,65 В", "робить міст непотрібним"],
          optionsEn: ["does not change the steady voltage of an unloaded output", "multiplies it by 100 again", "removes the 1.65 V bias", "makes the bridge unnecessary"],
          correct: 0,
        },
      }),
      L({
        d: 4,
        titleUk: "Різниця плечей і вихід",
        titleEn: "The arm difference and the output",
        tokenUk: "різниця",
        tokenEn: "difference",
        qUk: "Які напруги плечей і який вихід дають 1010 Ом і 990 Ом при підсиленні 100?",
        qEn: "What arm voltages and what output do 1010 Ω and 990 Ω give at a gain of 100?",
        modelUk: "Ліве плече двох рівних 1 кОм ділить 5 В навпіл. Праве плече ділить 5 В між 1 кОм і датчиком. Різниця є правою напругою мінус 2,5 В. Ідеальний диференціальний каскад із рівними плечима зворотного зв'язку додає зміщення: вихід = 1,65 + 100·різниця. На 1010 Ом різниця близько 12,4 мВ і вихід близько 2,89 В. На 990 Ом знак різниці протилежний і вихід близько 0,39 В. Похідну «помнож на півтора» тут немає до чого прикладати: опір входить у дріб плеча.",
        modelEn: "The left arm of two equal 1 kΩ resistors splits 5 V in half. The right arm splits 5 V between 1 kΩ and the sensor. The difference is the right voltage minus 2.5 V. An ideal differential stage with equal feedback arms adds the bias: output = 1.65 + 100·difference. At 1010 Ω the difference is about 12.4 mV and the output is about 2.89 V. At 990 Ω the sign of the difference is opposite and the output is about 0.39 V. There is no place here for a derivative that says “multiply by one and a half”: the resistance enters the arm fraction.",
        exUk: `При 1010 Ом праве плече ${fmt(vRight(1010))} В, різниця ${fmt(vDiff(1010))} В, вихід ${fmt(v1010)} В. При 990 Ом вихід ${fmt(v990)} В.`,
        exEn: `At 1010 Ω the right arm is ${fmt(vRight(1010))} V, the difference is ${fmt(vDiff(1010))} V, and the output is ${fmt(v1010)} V. At 990 Ω the output is ${fmt(v990)} V.`,
        checkUk: "5·1010/2010 − 2,5 ≈ 0,01244 В. 1,65 + 100·0,01244 ≈ 2,894 В. Для 990 Ом знак мінуса.",
        checkEn: "5·1010/2010 − 2.5 is about 0.01244 V. 1.65 + 100·0.01244 is about 2.894 V. For 990 Ω the sign is minus.",
        errUk: "Помилка — помножити сам опір 1010 Ом на 100 і назвати це вольтами виходу.",
        errEn: "The mistake is to multiply the resistance 1010 Ω itself by 100 and call that the output volts.",
        limUk: "Формула поки без вхідного опору каскаду і без кінцевого підсилення операційного підсилювача. Навантаження моста рахують наступним кроком.",
        limEn: "The formula still omits the stage input resistance and the finite gain of the operational amplifier. Bridge loading is the next step.",
        nums: [
          num(v1010, "V", "Вихід при датчику 1010 Ом, підсиленні 100 і зміщенні 1,65 В?", "Output at a 1010 ohm sensor, a gain of 100, and a 1.65 V bias?"),
          num(v990, "V", "Вихід при датчику 990 Ом за тих самих підсилення і зміщення?", "Output at a 990 ohm sensor with the same gain and bias?"),
        ],
        mcq: {
          uk: "Коли датчик більший за 1 кОм, різниця правого і лівого плеча…",
          en: "When the sensor is larger than 1 kΩ, the difference of the right and left arms…",
          optionsUk: ["додатна, і вихід вищий за 1,65 В", "від'ємна", "завжди нуль", "дорівнює напрузі живлення моста"],
          optionsEn: ["is positive, and the output is above 1.65 V", "is negative", "is always zero", "equals the bridge supply"],
          correct: 0,
        },
      }),
      L({
        d: 4,
        titleUk: "Еталон, який перевіряє сервер",
        titleEn: "The reference the server checks",
        tokenUk: "еталон",
        tokenEn: "reference",
        qUk: "Які позначення еталона сервер змінює в випробуваннях, і чому готове джерело на виході не зараховується?",
        qEn: "Which reference designators does the server change in the trials, and why is a ready-made source on the output not accepted?",
        modelUk: "Еталон тримає позначення RS, RF і RG. Сервер підставляє 990, 1000 і 1010 Ом у RS і знову рахує вузол out. Підсилення 10 отримують, коли обидва резистори зворотного зв'язку, RF і RG, стають 1 МОм: одне лише RF ламає рівність плечей, і формула 1,65+10·різниця вже не діє. Обрив замінюють дуже великим RS. Окреме коло з резистором і 10 нФ перевіряє зріз 1 кГц, бо одна картка аналізу не є водночас операційною точкою і частотною розгорткою. Нове джерело, підключене просто до вузла out, сервер відхиляє як підміну відповіді.",
        modelEn: "The reference keeps the designators RS, RF, and RG. The server substitutes 990, 1000, and 1010 Ω into RS and computes node out again. A gain of 10 is obtained when both feedback resistors, RF and RG, become 1 MΩ: RF alone breaks the equality of the arms, and the formula 1.65+10·difference no longer applies. An open is replaced by a very large RS. A separate resistor and 10 nF circuit checks the 1 kHz cutoff, because one analysis card is not both an operating point and a frequency sweep. A new source tied straight across node out is rejected as a substitution of the answer.",
        exUk: `Опір фільтра на 1 кГц з конденсатором 10 нФ дорівнює ${fmt(rFilt)} Ом. Вихід еталона при 1010 Ом ${fmt(v1010)} В.`,
        exEn: `The filter resistance for 1 kHz with a 10 nF capacitor is ${fmt(rFilt)} Ω. The reference output at 1010 Ω is ${fmt(v1010)} V.`,
        checkUk: "1/(2π·1000·10·10⁻⁹) дає опір фільтра. Підсилення 10 вимагає двох резисторів, не одного.",
        checkEn: "1/(2π·1000·10·10⁻⁹) gives the filter resistance. A gain of 10 requires two resistors, not one.",
        errUk: "Помилка — поставити на out джерело 2,89 В і вважати міст перевіреним.",
        errEn: "The mistake is to place a 2.89 V source on out and treat the bridge as checked.",
        limUk: "Еталонний підсилювач у моделі не має насичення. Число близько 252 В при обриві є необмеженою моделлю, а не напругою, яку витримає мікросхема.",
        limEn: "The reference amplifier in the model has no saturation. The number near 252 V at an open is the unbounded model, not a voltage a chip will survive.",
        labs: ["analog", "filter"],
        labPrompts: {
          analog: {
            uk: "Здайте еталон моста з позначеннями RS, RF і RG. Сервер перевірить 1010 Ом, а потім підставить інші опори. Не замінюйте вузол out готовим джерелом.",
            en: "Submit the bridge reference with designators RS, RF, and RG. The server checks 1010 ohm, then substitutes the other resistances. Do not replace node out with a ready-made source.",
          },
          filter: {
            uk: "Здайте ланку резистора і 10 нФ, яка дає зріз 1 кГц. Сервер зніме частотну характеристику вузла adc.",
            en: "Submit the resistor and 10 nF network that gives a 1 kHz cutoff. The server sweeps node adc.",
          },
        },
        nums: [
          num(rFilt, "ohm", "Опір, який із конденсатором 10 нФ дає зріз 1 кГц, в омах?", "Resistance that gives a 1 kHz cutoff with a 10 nF capacitor, in ohms?"),
          num(vGain10, "V", "Вихід при 1010 Ом, якщо обидва резистори зворотного зв'язку задають підсилення 10?", "Output at 1010 ohm if both feedback resistors set a gain of 10?"),
        ],
        mcq: {
          uk: "Готове джерело на вимірюваному виході…",
          en: "A ready-made source on the measured output…",
          optionsUk: ["не є розв'язком моста", "замінює перевірку датчика", "потрібне для зміщення", "є фільтром"],
          optionsEn: ["is not a solution of the bridge", "replaces the sensor check", "is required for the bias", "is the filter"],
          correct: 0,
        },
      }),
      L({
        d: 4,
        titleUk: "Запас, чутливість і навантаження моста",
        titleEn: "Margin, sensitivity, and bridge loading",
        tokenUk: "запас",
        tokenEn: "margin",
        qUk: "Скільки вольт лишається до 3,3 В на 1010 Ом, і як 500 Ом Тевенена змінюють підсилення?",
        qEn: "How many volts remain before 3.3 V at 1010 Ω, and how does a 500 Ω Thevenin resistance change the gain?",
        modelUk: "Запас зверху є 3,3 мінус вихід при 1010 Ом. Запас знизу є сам вихід при 990 Ом, бо нижня межа вікна нуль. Чутливість на цьому кроці — приріст виходу на один ом датчика між 1000 і 1010. Кожне плече моста з двох 1 кОм має опір Тевенена близько 500 Ом. Якщо вхідний резистор каскаду 100 кОм, перше наближення підсилення є 10 МОм / (100 кОм + 500 Ом), трохи менше за 100. Це наближення, бо ліве і праве плечі не зовсім однакові при 1010 Ом. Його пишуть поруч із ідеальними 2,89 В, а не замість виміру.",
        modelEn: "The upper margin is 3.3 minus the output at 1010 Ω. The lower margin is the output at 990 Ω itself, because the lower window edge is zero. The sensitivity on this step is the output change per ohm of sensor between 1000 and 1010. Each arm of two 1 kΩ resistors has a Thevenin resistance near 500 Ω. If the stage input resistor is 100 kΩ, a first estimate of the gain is 10 MΩ / (100 kΩ + 500 Ω), a little under 100. That is an estimate, because the left and right arms are not exactly equal at 1010 Ω. It is written beside the ideal 2.89 V, not instead of a measurement.",
        exUk: `Запас до 3,3 В ${fmt(headHi)} В. Вихід при 990 Ом ${fmt(headLo)} В. Чутливість ${fmt(sens)} В/Ом. Оцінка з 500 Ом дає ${fmt(vLoaded)} В замість ${fmt(v1010)} В.`,
        exEn: `The margin to 3.3 V is ${fmt(headHi)} V. The output at 990 Ω is ${fmt(headLo)} V. The sensitivity is ${fmt(sens)} V/Ω. The estimate with 500 Ω gives ${fmt(vLoaded)} V instead of ${fmt(v1010)} V.`,
        checkUk: "3,3 − 2,894 ≈ 0,406 В. (2,894 − 1,65)/10 ≈ 0,124 В на ом. 10⁷/(10⁵+500) ≈ 99,50.",
        checkEn: "3.3 − 2.894 is about 0.406 V. (2.894 − 1.65)/10 is about 0.124 V per ohm. 10⁷/(10⁵+500) is about 99.50.",
        errUk: "Помилка — назвати ідеальні 2,89 В виміром, не сказавши про 500 Ом джерела моста.",
        errEn: "The mistake is to call the ideal 2.89 V a measurement without mentioning the 500 Ω of the bridge source.",
        limUk: "Однакові 500 Ом на обох входах є номінальним наближенням. При 1010 Ом правий опір Тевенена трохи інший, і точний розрахунок уже не ділить одне число навпіл.",
        limEn: "Equal 500 Ω at both inputs is a nominal estimate. At 1010 Ω the right Thevenin resistance is slightly different, and an exact calculation no longer splits one number in half.",
        nums: [
          num(headHi, "V", "Запас від виходу при 1010 Ом до межі 3,3 В, у вольтах?", "Margin from the output at 1010 ohm up to the 3.3 V limit, in volts?"),
          num(sens, "V", "Приріст виходу на один ом між 1000 і 1010 Ом, у вольтах на ом?", "Output change per ohm between 1000 and 1010 ohm, in volts per ohm?"),
        ],
        mcq: {
          uk: "Опір Тевенена плеча зменшує підсилення, бо…",
          en: "The arm Thevenin resistance reduces the gain because…",
          optionsUk: ["він стоїть послідовно із вхідним резистором каскаду", "він збільшує живлення моста", "він прибирає зміщення", "він є ємністю фільтра"],
          optionsEn: ["it sits in series with the stage input resistor", "it increases the bridge supply", "it removes the bias", "it is the filter capacitance"],
          correct: 0,
        },
      }),
      L({
        d: 4,
        titleUk: "Три несправності, які мають дати інший вихід",
        titleEn: "Three faults that must give another output",
        tokenUk: "несправність",
        tokenEn: "fault",
        qUk: "Який вихід дають переставлене плече, обрив датчика і підсилення 10, і чим вони не схожі на справний 1010 Ом?",
        qEn: "What output do a swapped arm, an open sensor, and a gain of 10 give, and how are they unlike a healthy 1010 Ω?",
        modelUk: "Якщо датчик і нижнє ліве плече поміняти місцями, знак різниці змінюється. Вихід стає 3,3 В мінус справний вихід при 1010 Ом, близько 0,41 В, тобто схожий на справні 990 Ом. Це і є пастка: число майже знайоме, а датчик насправді 1010 Ом. Обрив у необмеженій моделі штовхає вихід близько 252 В, далеко за 3,3 В. Підсилення 10, коли RF і RG разом дорівнюють 1 МОм, лишає вихід близько 1,77 В: зміщення є, а розмах датчика замалий. Справний еталон на 1010 Ом не збігається з жодним із цих трьох чисел.",
        modelEn: "If the sensor and the lower left arm trade places, the sign of the difference changes. The output becomes 3.3 V minus the healthy output at 1010 Ω, about 0.41 V, so it looks like a healthy 990 Ω. That is the trap: the number is almost familiar, while the sensor is actually 1010 Ω. An open in the unbounded model pushes the output near 252 V, far beyond 3.3 V. A gain of 10, when RF and RG together are 1 MΩ, leaves the output near 1.77 V: the bias is there, and the sensor swing is too small. The healthy reference at 1010 Ω matches none of these three numbers.",
        exUk: `Переставлене плече ${fmt(vSwap)} В. Обрив у моделі без рейок ${fmt(vOpen)} В. Підсилення 10 дає ${fmt(vGain10)} В. Справні 1010 Ом лишаються ${fmt(v1010)} В.`,
        exEn: `The swapped arm is ${fmt(vSwap)} V. The open in the model without rails is ${fmt(vOpen)} V. A gain of 10 gives ${fmt(vGain10)} V. A healthy 1010 Ω remains ${fmt(v1010)} V.`,
        checkUk: "3,3 − 2,894 ≈ 0,406 В для переставленого плеча. 1,65 + 100·2,5 ≈ 252 В для обриву. 1,65 + 10·0,01244 ≈ 1,774 В.",
        checkEn: "3.3 − 2.894 is about 0.406 V for the swapped arm. 1.65 + 100·2.5 is about 252 V for the open. 1.65 + 10·0.01244 is about 1.774 V.",
        errUk: "Помилка — побачити 0,41 В і сказати «датчик 990 Ом», не перевіривши, чи плече не переставлене.",
        errEn: "The mistake is to see 0.41 V and say “the sensor is 990 Ω” without checking whether an arm was swapped.",
        limUk: "252 В не з'являться на виводі мікросхеми з живленням 5 В. Насичення треба назвати окремо: лабораторна модель його навмисно не має, щоб обрив було видно числом.",
        limEn: "252 V will not appear on the pin of a chip supplied from 5 V. Saturation has to be named separately: the lab model omits it on purpose, so the open stays visible as a number.",
        nums: [
          num(vSwap, "V", "Вихід, якщо нижнє ліве плече 1010 Ом, а датчик став 1000 Ом, підсилення 100?", "Output if the lower left arm is 1010 ohm and the sensor is now 1000 ohm, at a gain of 100?"),
          num(vOpen, "V", "Вихід необмеженої моделі, якщо опір датчика дуже великий і різниця плечей 2,5 В?", "Output of the unbounded model if the sensor resistance is very large and the arm difference is 2.5 V?"),
        ],
        mcq: {
          uk: "Вихід близько 0,41 В при встановлених 1010 Ом насамперед перевіряють як…",
          en: "An output near 0.41 V when 1010 Ω was installed is first checked as…",
          optionsUk: ["переставлене плече, а не автоматично датчик 990 Ом", "справну роботу", "обрив, бо обрив дає 0,41 В", "фільтр 1 кГц"],
          optionsEn: ["a swapped arm, not automatically a 990 Ω sensor", "healthy operation", "an open, because an open gives 0.41 V", "the 1 kHz filter"],
          correct: 0,
        },
      }),
    ],
    examA: [
      n(v1010, "V", "Датчик 1010 Ом, підсилення 100, зміщення 1,65 В. Вихід?", "Sensor 1010 ohm, gain 100, bias 1.65 V. Output?"),
      n(v990, "V", "Датчик 990 Ом, ті самі підсилення і зміщення. Вихід?", "Sensor 990 ohm, the same gain and bias. Output?"),
      n(v1000, "V", "Датчик 1000 Ом. Вихід?", "Sensor 1000 ohm. Output?"),
      n(rFilt, "ohm", "Резистор фільтра 1 кГц із конденсатором 10 нФ, в омах?", "Filter resistor for 1 kHz with a 10 nF capacitor, in ohms?"),
      n(headHi, "V", "Запас від виходу 1010 Ом до 3,3 В?", "Margin from the 1010 ohm output up to 3.3 V?"),
      n(vGain10, "V", "Вихід при підсиленні 10 і датчику 1010 Ом, обидва резистори зворотного зв'язку змінені разом?", "Output at a gain of 10 and a 1010 ohm sensor, both feedback resistors changed together?"),
      q("Справний вихід при 1010 Ом…", "A healthy output at 1010 Ω…", ["близько 2,89 В і всередині 0–3,3 В", "дорівнює 5 В", "від'ємний", "дорівнює опору датчика"], ["is near 2.89 V and inside 0–3.3 V", "equals 5 V", "is negative", "equals the sensor resistance"], 0),
      q("Обрив датчика в моделі без рейок…", "An open sensor in the model without rails…", ["виводить напругу далеко за 3,3 В", "лишає рівно 1,65 В", "дає зріз фільтра", "є справним 1010 Ом"], ["drives the voltage far beyond 3.3 V", "leaves exactly 1.65 V", "gives the filter cutoff", "is a healthy 1010 Ω"], 0),
      q("Переставлене плече при 1010 Ом…", "A swapped arm at 1010 Ω…", ["змінює знак і дає вихід, схожий на справні 990 Ом", "не змінює вихід", "прибирає зміщення", "робить зріз 100 Гц"], ["changes the sign and gives an output like a healthy 990 Ω", "does not change the output", "removes the bias", "makes the cutoff 100 Hz"], 0),
      q("Джерело, підключене просто до out…", "A source tied straight to out…", ["не підтверджує міст", "є еталоном", "замінює RS", "потрібне замість RG"], ["does not confirm the bridge", "is the reference", "replaces RS", "is required instead of RG"], 0),
    ],
    examB: [
      n(vOut(1020), "V", "Датчик 1020 Ом, підсилення 100, зміщення 1,65 В. Який вихід дає ідеальна формула, навіть якщо він уже поза вікном?", "Sensor 1020 ohm, gain 100, bias 1.65 V. What output does the ideal formula give, even if it is already outside the window?"),
      n(vDiff(1010), "V", "Різниця плечей при 1010 Ом, у вольтах, до підсилення?", "Arm difference at 1010 ohm, in volts, before the gain?"),
      n(fcBad, "Hz", "Частота зрізу, якщо конденсатор став 100 нФ, а резистор лишився на 1 кГц?", "Cutoff frequency if the capacitor became 100 nF and the resistor stayed at the 1 kHz value?"),
      n(vLoaded, "V", "Оцінка виходу при 1010 Ом, якщо підсилення взяти 10 МОм/(100 кОм+500 Ом)?", "Estimated output at 1010 ohm if the gain is taken as 10 MΩ/(100 kΩ+500 Ω)?"),
      n(gLoaded, "1", "Це наближене підсилення числом, без одиниць вольта. Відповідь числом.", "That estimated gain as a number, with no volt unit. Answer with the number."),
      n(vSwap, "V", "Вихід переставленого плеча при встановлених 1010 Ом?", "Output of the swapped arm when 1010 ohm was installed?"),
      q("1020 Ом при підсиленні 100…", "1020 Ω at a gain of 100…", ["виходить за верх вікна 3,3 В у ідеальній формулі", "лишається на 1,65 В", "дає нуль", "є обривом"], ["goes beyond the top of the 3.3 V window in the ideal formula", "stays at 1.65 V", "gives zero", "is an open"], 0),
      q("Зріз перевіряють окремим AC-колом, бо…", "The cutoff is checked with a separate AC circuit because…", ["одна картка аналізу не містить і операційну точку, і розгортку", "міст не має опорів", "зміщення скасовує частоту", "датчик є конденсатором"], ["one analysis card does not hold both an operating point and a sweep", "the bridge has no resistors", "the bias cancels frequency", "the sensor is a capacitor"], 0),
      q("Підсилення 10 при зміні лише одного резистора зворотного зв'язку…", "A gain of 10 from changing only one feedback resistor…", ["ламає рівність плечей, і формула з одним коефіцієнтом уже не та", "лишає формулу точною", "робить міст нулем", "є фільтром"], ["breaks the equality of the arms, and the single-factor formula is no longer the one to use", "keeps the formula exact", "makes the bridge zero", "is the filter"], 0),
      q("Запас знизу при 990 Ом є…", "The lower margin at 990 Ω is…", ["самою напругою виходу, бо межа вікна нуль", "напругою живлення 5 В", "опором датчика", "частотою зрізу"], ["the output voltage itself, because the window edge is zero", "the 5 V supply", "the sensor resistance", "the cutoff frequency"], 0),
    ],
  }),
  U({
    code: "ee-59",
    slug: "ee-59-project-power-supply",
    titleUk: "Проєкт: понижувальний імпульсний перетворювач",
    titleEn: "Project: a step-down switching converter",
    pass: 1,
    prereqUk: "Шпаруватість, пульсація струму котушки, ESR і оцінка провалу конденсатора.",
    prereqEn: "Duty ratio, inductor current ripple, ESR, and an estimate of capacitor sag.",
    outcomeUk: "Учень рахує шпаруватість від 24 В і від 18 В на 5 В, пульсацію струму і напруги, втрати ключа, діода і котушки, і впізнає застряглу шпаруватість 0,5, замалу індуктивність і замалий конденсатор.",
    outcomeEn: "The learner computes the duty from 24 V and from 18 V down to 5 V, the current and voltage ripple, the switch, diode, and inductor losses, and recognises a stuck duty of 0.5, too little inductance, and too little capacitance.",
    formulaUk: "D = 5/Vin для ідеального понижувача. ΔI = (Vin−5)·D/(f·L) при f = 100 кГц і L = 220 мкГн. Пульсація ідеального конденсатора ΔI/(8·f·C). Лабораторія перевіряє середню модель: джерело D·Vin, опір котушки 0,1 Ом і навантаження. Імпульсний фронт ця операційна точка не малює.",
    formulaEn: "D = 5/Vin for an ideal step-down converter. ΔI = (Vin−5)·D/(f·L) at f = 100 kHz and L = 220 µH. The ideal capacitor ripple is ΔI/(8·f·C). The lab checks the average model: a source D·Vin, an inductor resistance of 0.1 Ω, and the load. That operating point does not draw the switching edge.",
    labNoteUk: "Сервер перевіряє середню напругу при 5 Ом і при 50 Ом, застрягле джерело 12 В і опір котушки 1 Ом. Пульсацію і провал за 10 мкс перевіряє числом.",
    labNoteEn: "The server checks the average voltage at 5 Ω and at 50 Ω, a stuck 12 V source, and an inductor resistance of 1 Ω. Ripple and the sag over 10 µs are checked as numbers.",
    lessons: [
      L({
        d: 3,
        titleUk: "Шпаруватість на двох входах",
        titleEn: "Duty at two inputs",
        tokenUk: "шпаруватість",
        tokenEn: "duty",
        qUk: "Яка шпаруватість ідеального понижувача тримає 5 В від 24 В і яка від 18 В?",
        qEn: "What duty of an ideal step-down converter holds 5 V from 24 V, and what duty holds it from 18 V?",
        modelUk: "У ідеальному понижувачі середня напруга вузла ключа дорівнює D·Vin і має стати 5 В. Тому D = 5/Vin, а не Vin/5 і не 5·Vin. Від 24 В шпаруватість 5/24. Від 18 В вона більша: 5/18, бо тій самій п'ятірці треба довша частка нижчої напруги. Навантаження 0,1 А і 1 А цю ідеальну шпаруватість не змінює, поки спади на ключі, діоді і котушці ще не входять у рівняння. Їх додають окремим рядком втрат.",
        modelEn: "In an ideal step-down converter the average switch-node voltage is D·Vin and has to become 5 V. So D = 5/Vin, not Vin/5 and not 5·Vin. From 24 V the duty is 5/24. From 18 V it is larger, 5/18, because the same five volts need a longer fraction of the lower voltage. Loads of 0.1 A and 1 A do not change this ideal duty, while the drops of the switch, the diode, and the inductor are not yet in the equation. Those are added as a separate loss line.",
        exUk: `Від 24 В шпаруватість ${fmt(dutyH)}. Від 18 В ${fmt(dutyL)}. Добуток 24·5/24 = 5 В, і 18·5/18 = 5 В.`,
        exEn: `From 24 V the duty is ${fmt(dutyH)}. From 18 V it is ${fmt(dutyL)}. The product 24·5/24 = 5 V, and 18·5/18 = 5 V.`,
        checkUk: "5/24 ≈ 0,208. 5/18 ≈ 0,278. Обидва добутки дають 5.",
        checkEn: "5/24 is about 0.208. 5/18 is about 0.278. Both products give 5.",
        errUk: "Помилка — поставити D = Vin/Vout і отримати шпаруватість більшу за одиницю.",
        errEn: "The mistake is to set D = Vin/Vout and get a duty greater than one.",
        limUk: "D = 5/Vin мовчить про спад на діоді і на опорі котушки. З ними шпаруватість має бути трохи більша, і це вже інше рівняння.",
        limEn: "D = 5/Vin is silent about the diode drop and the inductor resistance. With those, the duty has to be a little larger, and that is a different equation.",
        nums: [
          num(dutyH, "1", "Шпаруватість ідеального понижувача 24 В → 5 В. Відповідь числом.", "Duty of an ideal step-down converter from 24 V to 5 V. Answer with the number."),
          num(dutyL, "1", "Шпаруватість ідеального понижувача 18 В → 5 В. Відповідь числом.", "Duty of an ideal step-down converter from 18 V to 5 V. Answer with the number."),
        ],
        mcq: {
          uk: "Нижча вхідна напруга при тих самих 5 В вимагає…",
          en: "A lower input voltage at the same 5 V requires…",
          optionsUk: ["більшої шпаруватості", "меншої шпаруватості", "шпаруватості понад 1", "нульової шпаруватості"],
          optionsEn: ["a larger duty", "a smaller duty", "a duty above 1", "zero duty"],
          correct: 0,
        },
      }),
      L({
        d: 4,
        titleUk: "Пульсація струму котушки",
        titleEn: "Inductor current ripple",
        tokenUk: "пульсація",
        tokenEn: "ripple",
        qUk: "Який розмах струму котушки 220 мкГн на 100 кГц від 24 В і від 18 В?",
        qEn: "What is the current swing of a 220 µH inductor at 100 kHz from 24 V and from 18 V?",
        modelUk: "Поки ключ увімкнений, на котушці лежить Vin−5. Розмах струму (Vin−5)·D/(f·L). Для 24 В, D = 5/24, 100 кГц і 220 мкГн він близько 0,180 А. Для 18 В він трохи менший, бо добуток (Vin−5)·D не однаковий на обох входах. Межа безперервного струму є половиною розмаху: якщо навантаження менше за цю половину, трикутник упирається в нуль і формула розмаху для безперервного режиму вже не та. При 0,1 А і розмаху 0,18 А режим ще безперервний, але запас малий.",
        modelEn: "While the switch is on, the inductor sees Vin−5. The current swing is (Vin−5)·D/(f·L). For 24 V, D = 5/24, 100 kHz, and 220 µH it is about 0.180 A. For 18 V it is a little smaller, because the product (Vin−5)·D is not the same at both inputs. The continuous-current boundary is half of the swing: if the load is smaller than that half, the triangle hits zero and the continuous-mode swing formula is no longer the one to use. At 0.1 A and a swing of 0.18 A the mode is still continuous, but the margin is small.",
        exUk: `Розмах від 24 В ${fmt(dI24)} А. Від 18 В ${fmt(dI18)} А. Половина розмаху при 24 В ${fmt(iBoundary)} А.`,
        exEn: `The swing from 24 V is ${fmt(dI24)} A. From 18 V it is ${fmt(dI18)} A. Half of the swing at 24 V is ${fmt(iBoundary)} A.`,
        checkUk: "(24−5)·(5/24)/(10⁵·220·10⁻⁶) ≈ 0,180 А. 0,1 А більше за половину цього розмаху.",
        checkEn: "(24−5)·(5/24)/(10⁵·220·10⁻⁶) is about 0.180 A. 0.1 A is greater than half of that swing.",
        errUk: "Помилка — порахувати розмах як 5/(f·L), без різниці Vin−5 і без шпаруватості.",
        errEn: "The mistake is to compute the swing as 5/(f·L), with no Vin−5 and no duty.",
        limUk: "Формула розмаху для режиму, де струм не торкається нуля. Нижче за половину розмаху потрібна формула переривчастого струму.",
        limEn: "The swing formula is for the mode where the current does not touch zero. Below half of the swing, the discontinuous-current formula is the one to use.",
        nums: [
          num(dI24, "A", "Розмах струму котушки 220 мкГн, 100 кГц, 24 В на 5 В, в амперах?", "Current swing of a 220 µH inductor, 100 kHz, 24 V to 5 V, in amperes?"),
          num(iBoundary, "A", "Найменший середній струм, при якому цей розмах ще не впирається в нуль?", "Smallest average current at which this swing still does not hit zero?"),
        ],
        mcq: {
          uk: "Навантаження 0,1 А при розмаху 0,18 А…",
          en: "A load of 0.1 A at a swing of 0.18 A…",
          optionsUk: ["ще вище за межу безперервного струму, але близько до неї", "глибоко в переривчастому режимі", "не залежить від котушки", "вимагає шпаруватості 1"],
          optionsEn: ["is still above the continuous-current boundary, but close to it", "is deep in discontinuous mode", "does not depend on the inductor", "requires a duty of 1"],
          correct: 0,
        },
      }),
      L({
        d: 3,
        titleUk: "Середня модель, яку здають на сервер",
        titleEn: "The average model submitted to the server",
        tokenUk: "середня",
        tokenEn: "average",
        qUk: "Яку напругу дає середня модель при навантаженні 1 А і при 0,1 А, якщо опір котушки 0,1 Ом?",
        qEn: "What voltage does the average model give at a 1 A load and at 0.1 A, if the inductor resistance is 0.1 Ω?",
        modelUk: "Лабораторне джерело дорівнює середній напрузі вузла ключа, тобто 5 В, коли шпаруватість правильна. Далі стоять 0,1 Ом котушки і навантаження. При 5 Ом, тобто близько 1 А, вихід 5·5/5,1. При 50 Ом, тобто близько 0,1 А, спад на 0,1 Ом майже зникає. Це операційна точка, а не малюнок імпульсів: пульсацію вона не показує. Якщо джерело застрягло на 12 В, як при шпаруватості 0,5 від 24 В без зворотного зв'язку, вихід іде до 12·5/5,1. Підміна виходу готовим джерелом 5 В не проходить це випробування, бо сервер змінює саме джерело середньої напруги.",
        modelEn: "The lab source equals the average switch-node voltage, that is 5 V, when the duty is right. Then come 0.1 Ω of the inductor and the load. At 5 Ω, about 1 A, the output is 5·5/5.1. At 50 Ω, about 0.1 A, the drop on 0.1 Ω almost disappears. This is an operating point, not a drawing of the pulses: it does not show the ripple. If the source is stuck at 12 V, as at a duty of 0.5 from 24 V with no feedback, the output goes to 12·5/5.1. Substituting a ready-made 5 V source for the output does not pass this trial, because the server changes the average-voltage source itself.",
        exUk: `При 5 Ом вихід ${fmt(buck1A)} В. При 50 Ом ${fmt(buckLight)} В. Застряглі 12 В дають ${fmt(buckStuck)} В.`,
        exEn: `At 5 Ω the output is ${fmt(buck1A)} V. At 50 Ω it is ${fmt(buckLight)} V. A stuck 12 V gives ${fmt(buckStuck)} V.`,
        checkUk: "5·5/5,1 ≈ 4,902 В. 12·5/5,1 ≈ 11,76 В, це вже не вікно 5 В ±5%.",
        checkEn: "5·5/5.1 is about 4.902 V. 12·5/5.1 is about 11.76 V, which is no longer the 5 V ±5% window.",
        errUk: "Помилка — здати джерело 5 В просто на навантаження і назвати це котушкою.",
        errEn: "The mistake is to submit a 5 V source straight into the load and call that the inductor.",
        limUk: "Середня модель не містить діода, фронту і викиду. Втрати діода і пульсацію рахують поруч, іншими рядками.",
        limEn: "The average model contains no diode, no edge, and no spike. The diode loss and the ripple are computed beside it, on other lines.",
        labs: ["buck"],
        labPrompts: {
          buck: {
            uk: "Здайте середню модель: джерело VAVG, опір котушки RDCR і навантаження RLOAD. Не підміняйте вузол out готовим джерелом.",
            en: "Submit the average model: source VAVG, inductor resistance RDCR, and load RLOAD. Do not replace node out with a ready-made source.",
          },
        },
        nums: [
          num(buck1A, "V", "Вихід середньої моделі: 5 В, 0,1 Ом і навантаження 5 Ом?", "Output of the average model: 5 V, 0.1 ohm, and a 5 ohm load?"),
          num(buckStuck, "V", "Вихід тієї моделі, якщо джерело застрягло на 12 В, а навантаження лишилось 5 Ом?", "Output of that model if the source is stuck at 12 V and the load remains 5 ohm?"),
        ],
        mcq: {
          uk: "Операційна точка середньої моделі…",
          en: "The operating point of the average model…",
          optionsUk: ["перевіряє спад на опорі котушки і не малює пульсацію", "замінює розрахунок розмаху струму", "має шпаруватість понад 1", "не чує застряглих 12 В"],
          optionsEn: ["checks the drop on the inductor resistance and does not draw the ripple", "replaces the current-swing calculation", "has a duty above 1", "does not notice a stuck 12 V"],
          correct: 0,
        },
      }),
      L({
        d: 4,
        titleUk: "Пульсація на конденсаторі і провал кроку",
        titleEn: "Capacitor ripple and the step sag",
        tokenUk: "конденсатор",
        tokenEn: "capacitor",
        qUk: "Яку пульсацію дають 22 мкФ і ESR 50 мОм, і який провал дає крок 0,9 А за 10 мкс?",
        qEn: "What ripple do 22 µF and an ESR of 50 mΩ give, and what sag does a 0.9 A step give over 10 µs?",
        modelUk: "Ідеальна ємність при трикутному струмі розмаху ΔI дає пульсацію ΔI/(8·f·C). Для розмаху від 24 В і 22 мкФ це близько 10 мВ. ESR 50 мОм додає ще ΔI·ESR, теж близько 9 мВ. Сума лишається в вимозі 100 мВ, якщо ці два внески не забути скласти. Окремо: якщо струм навантаження стрибає на 0,9 А, а котушка ще 10 мкс не встигає, конденсатор віддає 0,9·10 мкс і напруга падає на Q/C. Це оцінка замороженої котушки, не повний перехідний процес зворотного зв'язку. Вона показує, що 10 мкс уже багато для 22 мкФ.",
        modelEn: "An ideal capacitance with a triangular current of swing ΔI gives a ripple ΔI/(8·f·C). For the swing from 24 V and 22 µF that is about 10 mV. An ESR of 50 mΩ adds another ΔI·ESR, also about 9 mV. The sum stays inside the 100 mV requirement if these two contributions are not forgotten. Separately: if the load current steps by 0.9 A and the inductor has not caught up for 10 µs, the capacitor supplies 0.9·10 µs and the voltage falls by Q/C. That is a frozen-inductor estimate, not the full feedback transient. It shows that 10 µs is already a lot for 22 µF.",
        exUk: `Пульсація ємності ${fmt(rippleC)} В. Внесок ESR ${fmt(rippleE)} В. Провал за 10 мкс ${fmt(sag)} В.`,
        exEn: `The capacitive ripple is ${fmt(rippleC)} V. The ESR contribution is ${fmt(rippleE)} V. The sag over 10 µs is ${fmt(sag)} V.`,
        checkUk: "0,180/(8·10⁵·22·10⁻⁶) ≈ 0,010 В. 0,05·0,180 ≈ 0,009 В. 0,9·10⁻⁵/22·10⁻⁶ ≈ 0,409 В.",
        checkEn: "0.180/(8·10⁵·22·10⁻⁶) is about 0.010 V. 0.05·0.180 is about 0.009 V. 0.9·10⁻⁵/22·10⁻⁶ is about 0.409 V.",
        errUk: "Помилка — порівняти з 100 мВ лише ємнісну пульсацію і промовчати ESR, або назвати провал 0,4 В усталеною пульсацією.",
        errEn: "The mistake is to compare only the capacitive ripple with 100 mV and stay silent about ESR, or to call the 0.4 V sag the steady ripple.",
        limUk: "ΔI/(8·f·C) є оцінкою трикутника в безперервному режимі. Провал Q/C не включає струм, який котушка вже встигла додати за ці 10 мкс.",
        limEn: "ΔI/(8·f·C) is an estimate of the triangle in continuous mode. The sag Q/C does not include the current the inductor has already managed to add during those 10 µs.",
        nums: [
          num(rippleC, "V", "Ємнісна пульсація 22 мкФ при розмаху струму від 24 В, у вольтах?", "Capacitive ripple of 22 µF at the current swing from 24 V, in volts?"),
          num(sag, "V", "Провал напруги, якщо 22 мкФ сам віддає 0,9 А протягом 10 мкс?", "Voltage sag if 22 µF alone supplies 0.9 A for 10 µs?"),
        ],
        mcq: {
          uk: "Провал Q/C за 10 мкс…",
          en: "The sag Q/C over 10 µs…",
          optionsUk: ["є оцінкою замороженої котушки, не малюнком усього перехідного процесу", "є усталеною пульсацією 100 кГц", "не залежить від ємності", "замінює шпаруватість"],
          optionsEn: ["is a frozen-inductor estimate, not a drawing of the whole transient", "is the steady ripple at 100 kHz", "does not depend on capacitance", "replaces the duty"],
          correct: 0,
        },
      }),
      L({
        d: 4,
        titleUk: "Втрати і три несправності",
        titleEn: "Losses and three faults",
        tokenUk: "втрата",
        tokenEn: "loss",
        qUk: "Які втрати при 1 А від 24 В, і які числа видають шпаруватість 0,5, котушку 22 мкГн і конденсатор 2,2 мкФ?",
        qEn: "What are the losses at 1 A from 24 V, and which numbers reveal a duty of 0.5, a 22 µH inductor, and a 2.2 µF capacitor?",
        modelUk: "Провідність ключа: 0,05 Ом·1²·D. Діод із спадом 0,5 В проводить решту періоду: 1·(1−D)·0,5. Мідь котушки в цій умові 0,1 Ом·1², без змінного складника. Сума, поділена на суму з 5 Вт виходу, дає ККД умови, не вимір корпусу. Несправності інші: шпаруватість 0,5 від 24 В дає середні 12 В. Котушка вдесятеро менша дає вдесятеро більший розмах струму, і половина цього розмаху вже більша за 0,1 А, тож межа безперервності пройдена. Конденсатор 2,2 мкФ дає вдесятеро більшу ємнісну пульсацію. Кожне число чіпає свій рядок і не лікується підгонкою іншого.",
        modelEn: "Switch conduction: 0.05 Ω·1²·D. A diode with a 0.5 V drop conducts the rest of the period: 1·(1−D)·0.5. The inductor copper in this problem is 0.1 Ω·1², with no AC term. The sum, divided into the sum with 5 W of output, gives the efficiency of the problem, not a measurement of a package. The faults are different: a duty of 0.5 from 24 V gives an average of 12 V. An inductor ten times smaller gives ten times the current swing, and half of that swing is already greater than 0.1 A, so the continuous boundary has been crossed. A 2.2 µF capacitor gives ten times the capacitive ripple. Each number touches its own line and is not cured by adjusting another.",
        exUk: `Втрати ключа ${fmt(pSw)} Вт, діода ${fmt(pDiode)} Вт, міді ${fmt(pDcr)} Вт. ККД умови ${fmt(eta)}. Розмах при 22 мкГн ${fmt(dIsmall)} А. Пульсація при 2,2 мкФ ${fmt(rippleBad)} В.`,
        exEn: `Switch loss ${fmt(pSw)} W, diode ${fmt(pDiode)} W, copper ${fmt(pDcr)} W. The efficiency of the problem is ${fmt(eta)}. The swing at 22 µH is ${fmt(dIsmall)} A. The ripple at 2.2 µF is ${fmt(rippleBad)} V.`,
        checkUk: "0,05·5/24 ≈ 0,0104 Вт. (19/24)·0,5 ≈ 0,396 Вт. 0,180·10 ≈ 1,80 А при котушці 22 мкГн.",
        checkEn: "0.05·5/24 is about 0.0104 W. (19/24)·0.5 is about 0.396 W. 0.180·10 = 1.80 A at a 22 µH inductor.",
        errUk: "Помилка — збільшити конденсатор, щоб сховати застряглі 12 В, або зменшити шпаруватість, щоб сховати пульсацію ємності.",
        errEn: "The mistake is to enlarge the capacitor in order to hide a stuck 12 V, or to reduce the duty in order to hide the capacitive ripple.",
        limUk: "0,5 В на діоді і 0,05 Ом ключа є числами умови. Інший діод і інший ключ дають інший рядок, і ККД умови не переносять на корпус без цих чисел.",
        limEn: "The 0.5 V diode and the 0.05 Ω switch are numbers of the problem. Another diode and another switch give another line, and the efficiency of the problem does not transfer to a package without those numbers.",
        nums: [
          num(eta, "1", "ККД умови при виході 5 Вт і сумі втрат ключа, діода та 0,1 Ом. Відповідь числом частки, не відсотком.", "Efficiency of the problem at 5 W output and the sum of switch, diode, and 0.1 ohm losses. Answer with the fraction, not a percent."),
          num(dIsmall, "A", "Розмах струму, якщо котушка 22 мкГн, а решта умови 24 В та сама?", "Current swing if the inductor is 22 µH and the rest of the 24 V problem is the same?"),
        ],
        mcq: {
          uk: "Середні 12 В при вході 24 В означають…",
          en: "An average of 12 V at a 24 V input means…",
          optionsUk: ["шпаруватість близько 0,5, а не помилку конденсатора", "замалий конденсатор", "замалу котушку", "справні 5 В"],
          optionsEn: ["a duty near 0.5, not a capacitor error", "too little capacitance", "too little inductance", "a healthy 5 V"],
          correct: 0,
        },
      }),
    ],
    examA: [
      n(dutyH, "1", "Ідеальна шпаруватість 24 В → 5 В. Відповідь числом.", "Ideal duty from 24 V to 5 V. Answer with the number."),
      n(dI24, "A", "Розмах струму 220 мкГн на 100 кГц від 24 В до 5 В?", "Current swing of 220 µH at 100 kHz from 24 V to 5 V?"),
      n(rippleC, "V", "Ємнісна пульсація 22 мкФ при цьому розмаху?", "Capacitive ripple of 22 µF at this swing?"),
      n(rippleE, "V", "Пульсація від ESR 50 мОм при цьому розмаху?", "Ripple from an ESR of 50 mΩ at this swing?"),
      n(buckStuck, "V", "Середня модель: джерело 12 В, 0,1 Ом, навантаження 5 Ом. Вихід?", "Average model: a 12 V source, 0.1 ohm, a 5 ohm load. Output?"),
      n(sag, "V", "Провал 22 мкФ, який сам живить крок 0,9 А протягом 10 мкс?", "Sag of 22 µF that alone feeds a 0.9 A step for 10 µs?"),
      q("D ідеального понижувача…", "The duty of an ideal step-down converter…", ["дорівнює Vout/Vin", "дорівнює Vin/Vout", "завжди 0,5", "не залежить від виходу"], ["equals Vout/Vin", "equals Vin/Vout", "is always 0.5", "does not depend on the output"], 0),
      q("Розмах, удвічі більший за середній струм навантаження…", "A swing twice the average load current…", ["ставить режим на межу безперервного струму", "не чіпає режим", "скасовує шпаруватість", "є пульсацією ESR"], ["puts the mode on the continuous-current boundary", "does not touch the mode", "cancels the duty", "is the ESR ripple"], 0),
      q("Застряглі 12 В лікують…", "A stuck 12 V is treated by…", ["шпаруватістю, а не більшим конденсатором", "лише ESR", "лише частотою", "прибиранням навантаження назавжди"], ["the duty, not a larger capacitor", "only the ESR", "only the frequency", "removing the load forever"], 0),
      q("Оцінка Q/C…", "The estimate Q/C…", ["заморожує котушку на час вікна", "є усталеною пульсацією", "замінює D = Vout/Vin", "не має одиниць"], ["freezes the inductor for the window", "is the steady ripple", "replaces D = Vout/Vin", "has no units"], 0),
    ],
    examB: [
      n(dutyL, "1", "Ідеальна шпаруватість 18 В → 5 В. Відповідь числом.", "Ideal duty from 18 V to 5 V. Answer with the number."),
      n(dI18, "A", "Розмах струму 220 мкГн на 100 кГц від 18 В до 5 В?", "Current swing of 220 µH at 100 kHz from 18 V to 5 V?"),
      n(buckLight, "V", "Середня модель при джерелі 5 В, 0,1 Ом і навантаженні 50 Ом?", "Average model at a 5 V source, 0.1 ohm, and a 50 ohm load?"),
      n(pDiode, "W", "Втрати діода 0,5 В при струмі 1 А і шпаруватості 5/24, у ватах?", "Loss of a 0.5 V diode at 1 A and a duty of 5/24, in watts?"),
      n(pLoss, "W", "Сума втрат ключа 0,05 Ом, цього діода і міді 0,1 Ом при 1 А?", "Sum of the 0.05 ohm switch, this diode, and 0.1 ohm of copper at 1 A?"),
      n(rippleBad, "V", "Ємнісна пульсація, якщо конденсатор 2,2 мкФ, а розмах струму від 24 В той самий?", "Capacitive ripple if the capacitor is 2.2 µF and the current swing from 24 V is the same?"),
      q("Від 18 В шпаруватість ідеального понижувача…", "From 18 V the duty of an ideal step-down converter…", ["більша, ніж від 24 В", "менша, ніж від 24 В", "дорівнює 24/18", "нульова"], ["is larger than from 24 V", "is smaller than from 24 V", "equals 24/18", "is zero"], 0),
      q("Котушка 22 мкГн замість 220 мкГн…", "A 22 µH inductor instead of 220 µH…", ["збільшує розмах струму вдесятеро", "збільшує шпаруватість удесятеро", "прибирає пульсацію", "робить вихід 12 В"], ["increases the current swing tenfold", "increases the duty tenfold", "removes the ripple", "makes the output 12 V"], 0),
      q("ESR і ємнісна пульсація…", "ESR and capacitive ripple…", ["додаються як два внески, жоден не замінює інший", "завжди рівні", "скасовують один одного завжди", "є шпаруватістю"], ["add as two contributions, and neither replaces the other", "are always equal", "always cancel each other", "are the duty"], 0),
      q("ККД у цьому уроці…", "The efficiency in this lesson…", ["є часткою 5 Вт і названих втрат умови", "є виміром корпусу з полиці", "не включає діод", "дорівнює шпаруватості"], ["is the fraction of 5 W and the named losses of the problem", "is a measurement of a package from a shelf", "does not include the diode", "equals the duty"], 0),
    ],
  }),
  U({
    code: "ee-60",
    slug: "ee-60-project-three-phase",
    titleUk: "Проєкт: трифазне коло і еквівалент двигуна",
    titleEn: "Project: a three-phase circuit and a motor equivalent",
    pass: 1,
    prereqUk: "Лінійна і фазна напруга, потужність трифазного кола і комплексний опір.",
    prereqEn: "Line and phase voltage, three-phase power, and a complex impedance.",
    outcomeUk: "Учень відділяє електричні 3 кВт при коефіцієнті 0,75 від механічної потужності, рахує струм, опір фази, спад на лінії, компенсацію до 0,95 і струм нейтралі при обриві однієї фази.",
    outcomeEn: "The learner separates an electrical 3 kW at a factor of 0.75 from mechanical power, and computes the current, the phase impedance, the line drop, compensation to 0.95, and the neutral current when one phase is open.",
    formulaUk: "S = 3000/0,75 = 4000 ВА. Струм лінії S/(400·√3). Фазний опір 40 Ом: 30 Ом і √(40²−30²). Компенсація до 0,95 забирає різницю реактивних потужностей. Лабораторія — одна фаза цього еквівалента на 50 Гц, без лінії і без вала.",
    formulaEn: "S = 3000/0.75 = 4000 VA. The line current is S/(400·√3). The phase impedance is 40 Ω: 30 Ω and √(40²−30²). Compensation to 0.95 removes the difference of the reactive powers. The lab is one phase of this equivalent at 50 Hz, with no line and no shaft.",
    labNoteUk: "Сервер міряє модуль напруги на 30 Ом однієї фази, підстановку 40 Ом замість 30 Ом і обрив. Конденсатор компенсації і лінію 0,4+j0,3 перевіряє числом.",
    labNoteEn: "The server measures the magnitude of the voltage on 30 Ω of one phase, the substitution of 40 Ω for 30 Ω, and an open. The compensation capacitor and the 0.4+j0.3 line are checked as numbers.",
    lessons: [
      L({
        d: 3,
        titleUk: "Що саме означають 3 кВт",
        titleEn: "What the 3 kW actually are",
        tokenUk: "еквівалент",
        tokenEn: "equivalent",
        qUk: "Чому 3 кВт при коефіцієнті 0,75 є електричною потужністю на затискачах, а не потужністю на валу?",
        qEn: "Why is 3 kW at a factor of 0.75 the electrical power at the terminals, and not the power on the shaft?",
        modelUk: "Умова дає лінійну напругу 400 В, частоту 50 Гц і електричну потужність 3 кВт при коефіцієнті 0,75. З них виходять повна потужність, струм лінії і опір фази. Ковзання, момент і втрати ротора в цих числах не названі, тож вал з них не відновлюється. Еквівалент однієї фази — послідовні 30 Ом і реактивний опір — повторює струм і електричну потужність на затискачах. Він не крутить вал і не знає, холодний ротор чи вже в номінальному ковзанні. Це обмеження пишуть у звіті перед будь-яким механічним висновком.",
        modelEn: "The problem gives a line voltage of 400 V, a frequency of 50 Hz, and an electrical power of 3 kW at a factor of 0.75. From those come the apparent power, the line current, and the phase impedance. Slip, torque, and rotor loss are not named in these numbers, so the shaft cannot be recovered from them. The one-phase equivalent, 30 Ω in series with a reactance, repeats the current and the electrical power at the terminals. It does not turn a shaft and does not know whether the rotor is cold or already at rated slip. That limit is written in the report before any mechanical conclusion.",
        exUk: `Повна потужність ${fmt(sMotor)} ВА. Струм лінії ${fmt(iLine)} А. Фазна напруга ${fmt(vph)} В. Опір фази ${fmt(zPhase)} Ом.`,
        exEn: `The apparent power is ${fmt(sMotor)} VA. The line current is ${fmt(iLine)} A. The phase voltage is ${fmt(vph)} V. The phase impedance is ${fmt(zPhase)} Ω.`,
        checkUk: "3000/0,75 = 4000 ВА. 4000/(400·√3) = 10/√3 А. (400/√3) / (10/√3) = 40 Ом.",
        checkEn: "3000/0.75 = 4000 VA. 4000/(400·√3) = 10/√3 A. (400/√3) / (10/√3) = 40 Ω.",
        errUk: "Помилка — поділити 3 кВт на кутову швидкість і назвати результат моментом цього еквівалента.",
        errEn: "The mistake is to divide 3 kW by an angular speed and call the result the torque of this equivalent.",
        limUk: "40 Ом повторюють лише заданий електричний режим. Пуск, обрив фази обмотки і насичення сталі сюди не входять.",
        limEn: "40 Ω repeat only the stated electrical regime. Starting, an open winding phase, and steel saturation are not included.",
        nums: [
          num(sMotor, "VA", "Повна потужність 3 кВт при коефіцієнті 0,75, у вольт-амперах?", "Apparent power of 3 kW at a factor of 0.75, in volt-amperes?"),
          num(iLine, "A", "Струм лінії при 400 В і цій повній потужності, в амперах?", "Line current at 400 V and this apparent power, in amperes?"),
        ],
        mcq: {
          uk: "Еквівалент 30 Ом і реактивного опору передає…",
          en: "The equivalent of 30 Ω and a reactance carries…",
          optionsUk: ["струм і електричну потужність на затискачах, не момент на валу", "механічну потужність вала", "ковзання", "насичення сталі"],
          optionsEn: ["the current and the electrical power at the terminals, not the shaft torque", "the mechanical shaft power", "the slip", "steel saturation"],
          correct: 0,
        },
      }),
      L({
        d: 4,
        titleUk: "Фаза, лінія і спад",
        titleEn: "Phase, line, and drop",
        tokenUk: "спад",
        tokenEn: "drop",
        qUk: "Які активна і реактивна складові 40 Ом, і який модуль спаду дає лінія 0,4+j0,3 Ом?",
        qEn: "What are the resistive and reactive parts of 40 Ω, and what drop magnitude does a line of 0.4+j0.3 Ω give?",
        modelUk: "Коефіцієнт 0,75 кладе на активний опір 30 Ом із 40. Решта є реактивним опором √(40²−30²). Лабораторія однієї фази ставить ці 30 Ом після індуктивності і міряє модуль напруги на опорі: він дорівнює фазній напрузі, помноженій на 0,75. Лінія 0,4+j0,3 Ом має модуль 0,5 Ом. Модуль фазного спаду є струм лінії помножити на 0,5. Модуль лінійної оцінки — ще √3, якщо три фази симетричні. Цей модуль не віднімають від 400 В як точну напругу в кінці: спад може стояти під кутом до напруги, і модуль суми не є різницею модулів.",
        modelEn: "A factor of 0.75 puts 30 Ω of the 40 into resistance. The rest is the reactance √(40²−30²). The one-phase lab places these 30 Ω after the inductance and measures the magnitude of the voltage on the resistance: it equals the phase voltage times 0.75. A line of 0.4+j0.3 Ω has a magnitude of 0.5 Ω. The phase drop magnitude is the line current times 0.5. A line-to-line estimate takes another √3 when the three phases are symmetric. That magnitude is not subtracted from 400 V as the exact voltage at the far end: the drop can sit at an angle to the voltage, and the magnitude of a sum is not the difference of the magnitudes.",
        exUk: `Активні ${fmt(rPhase)} Ом, реактивні ${fmt(xPhase)} Ом. Напруга на 30 Ом ${fmt(vPhaseR)} В. Модуль фазного спаду лінії ${fmt(dropPhase)} В. Модуль лінійної оцінки ${fmt(dropLine)} В.`,
        exEn: `The resistance is ${fmt(rPhase)} Ω and the reactance is ${fmt(xPhase)} Ω. The voltage on 30 Ω is ${fmt(vPhaseR)} V. The phase line-drop magnitude is ${fmt(dropPhase)} V. The line-to-line estimate magnitude is ${fmt(dropLine)} V.`,
        checkUk: "0,75·40 = 30. √(1600−900) = √700. (10/√3)·0,5 є фазним модулем спаду.",
        checkEn: "0.75·40 = 30. √(1600−900) = √700. (10/√3)·0.5 is the phase drop magnitude.",
        errUk: "Помилка — відняти модуль лінійного спаду від 400 В і назвати різницю точною напругою в кінці лінії.",
        errEn: "The mistake is to subtract the line-drop magnitude from 400 V and call the difference the exact voltage at the end of the line.",
        limUk: "Струм для спаду взято з режиму без лінії, ніби лінія не зменшує струм. Для 0,5 Ом поруч із 40 Ом це наближення, і звіт так і каже.",
        limEn: "The current used for the drop is taken from the regime without the line, as if the line did not reduce the current. Next to 40 Ω, 0.5 Ω makes that an approximation, and the report says so.",
        nums: [
          num(xPhase, "ohm", "Реактивний опір фази при модулі 40 Ом і коефіцієнті 0,75, в омах?", "Phase reactance at a magnitude of 40 ohm and a factor of 0.75, in ohms?"),
          num(dropLine, "V", "Модуль лінійної оцінки спаду на лінії 0,5 Ом при струмі 10/√3 А? Не віднімайте його від 400 В.", "Magnitude of the line-to-line drop estimate on a 0.5 ohm line at a current of 10/√3 A? Do not subtract it from 400 V."),
        ],
        mcq: {
          uk: "Модуль спаду на комплексній лінії…",
          en: "The magnitude of the drop on a complex line…",
          optionsUk: ["не є числом, яке завжди можна відняти від 400 В", "завжди віднімається від 400 В точно", "дорівнює активній потужності", "скасовує коефіцієнт 0,75"],
          optionsEn: ["is not a number that can always be subtracted from 400 V", "is always subtracted from 400 V exactly", "equals the active power", "cancels the factor of 0.75"],
          correct: 0,
        },
      }),
      L({
        d: 3,
        titleUk: "Одна фаза на сервері",
        titleEn: "One phase on the server",
        tokenUk: "фаза",
        tokenEn: "phase",
        qUk: "Що саме міряє лабораторна фаза, і яку несправність видно, якщо 30 Ом замінити модулем 40 Ом?",
        qEn: "What does the lab phase actually measure, and which fault shows if 30 Ω is replaced by the magnitude of 40 Ω?",
        modelUk: "Джерело фази має модуль 400/√3. Далі індуктивність реактивного опору і резистор RM = 30 Ом. Модуль напруги на RM у справному колі є 0,75 фазної напруги. Якщо замість 30 Ом підставити 40 Ом, лишивши реактивність, модуль уже інший: активна частка перестала бути 0,75. Обрив замінюють дуже великим RM, і напруга вузла піднімається до фазної, бо струм зникає. Готове джерело на цьому вузлі сервер відхиляє. Лінії 0,4+j0,3 у цьому колі немає навмисно: її спад пораховано окремо як наближення жорсткого струму.",
        modelEn: "The phase source has the magnitude 400/√3. Then come the inductance of the reactance and the resistor RM = 30 Ω. The magnitude of the voltage on RM in the healthy circuit is 0.75 of the phase voltage. If 40 Ω is substituted for 30 Ω while the reactance stays, the magnitude is already different: the resistive fraction is no longer 0.75. An open is replaced by a very large RM, and the node voltage rises toward the phase voltage because the current disappears. A ready-made source on this node is rejected. The 0.4+j0.3 line is absent from this circuit on purpose: its drop was computed separately as a stiff-current approximation.",
        exUk: `Справна напруга на 30 Ом ${fmt(vPhaseR)} В. Реактивний опір ${fmt(xPhase)} Ом. Струм лінії, яким рахували спад, ${fmt(iLine)} А.`,
        exEn: `The healthy voltage on 30 Ω is ${fmt(vPhaseR)} V. The reactance is ${fmt(xPhase)} Ω. The line current used for the drop is ${fmt(iLine)} A.`,
        checkUk: "0,75·400/√3 ≈ 173,2 В. Це напруга на опорі, не повна фазна напруга.",
        checkEn: "0.75·400/√3 is about 173.2 V. That is the voltage on the resistance, not the full phase voltage.",
        errUk: "Помилка — поставити джерело цієї напруги замість резистора і вважати еквівалент перевіреним.",
        errEn: "The mistake is to place a source of that voltage instead of the resistor and treat the equivalent as checked.",
        limUk: "Одна фаза не показує несиметрію трьох провідників. Обрив у трифазному звіті рахують окремо, векторною сумою.",
        limEn: "One phase does not show the unbalance of three conductors. An open in the three-phase report is computed separately, as a vector sum.",
        labs: ["phase"],
        labPrompts: {
          phase: {
            uk: "Здайте одну фазу еквівалента: джерело VA, індуктивність LM і резистор RM. Сервер перевірить модуль на вузлі lr.",
            en: "Submit one phase of the equivalent: source VA, inductance LM, and resistor RM. The server checks the magnitude at node lr.",
          },
        },
        nums: [
          num(vPhaseR, "V", "Модуль напруги на 30 Ом справної фази при фазній напрузі 400/√3, у вольтах?", "Magnitude of the voltage on 30 ohm of a healthy phase at a phase voltage of 400/√3, in volts?"),
          num(vph, "V", "Фазна напруга лінійних 400 В, у вольтах?", "Phase voltage of a 400 V line voltage, in volts?"),
        ],
        mcq: {
          uk: "Заміна 30 Ом на 40 Ом при тій самій реактивності…",
          en: "Replacing 30 Ω by 40 Ω at the same reactance…",
          optionsUk: ["змінює модуль на резисторі і вже не є коефіцієнтом 0,75", "нічого не змінює", "прибирає індуктивність", "робить потужність механічною"],
          optionsEn: ["changes the magnitude on the resistor and is no longer a factor of 0.75", "changes nothing", "removes the inductance", "makes the power mechanical"],
          correct: 0,
        },
      }),
      L({
        d: 4,
        titleUk: "Компенсація до 0,95",
        titleEn: "Compensation to 0.95",
        tokenUk: "компенсація",
        tokenEn: "compensation",
        qUk: "Яку реактивну потужність треба прибрати, щоб коефіцієнт став 0,95, і яка ємність на фазу в зірці?",
        qEn: "What reactive power has to be removed so the factor becomes 0.95, and what capacitance per phase is that in a wye?",
        modelUk: "Активні 3 кВт лишаються. Повна потужність при 0,95 є 3000/0,95, і нова реактивна менша за стару. Різниця є потужністю конденсаторів. У зірці вона ділиться на три фази і на Vфази²·ω. У трикутнику та сама реактивна потужність ділиться на Vлінійне²·ω, тож ємність на гілку менша рівно втричі, бо лінійна напруга більша за фазну в √3, а квадрат дає три. Конденсатор не змінює активні 3 кВт у цій моделі і не додає моменту на валу.",
        modelEn: "The active 3 kW stays. The apparent power at 0.95 is 3000/0.95, and the new reactive power is smaller than the old one. The difference is the capacitor power. In a wye it is split across three phases and across Vphase²·ω. In a delta the same reactive power is split across Vline²·ω, so the capacitance per branch is smaller by exactly three, because the line voltage is √3 times the phase voltage and the square gives three. The capacitor does not change the active 3 kW in this model and does not add shaft torque.",
        exUk: `Реактивна потужність зараз ${fmt(qMotor)} вар. Після 0,95 лишається ${fmt(qGoal)} вар. Треба прибрати ${fmt(qComp)} вар. Ємність на фазу зірки ${fmt(cWye)} Ф.`,
        exEn: `The reactive power now is ${fmt(qMotor)} var. After 0.95, ${fmt(qGoal)} var remains. ${fmt(qComp)} var has to be removed. The capacitance per wye phase is ${fmt(cWye)} F.`,
        checkUk: "Q = 4000·√(1−0,75²). Q2 = (3000/0,95)·√(1−0,95²). Cзірки = Qc/(3·Vф²·ω).",
        checkEn: "Q = 4000·√(1−0.75²). Q2 = (3000/0.95)·√(1−0.95²). Cwye = Qc/(3·Vph²·ω).",
        errUk: "Помилка — компенсувати всю реактивну потужність до нуля, хоча вимога лише 0,95, або взяти ємність трикутника як ємність зірки.",
        errEn: "The mistake is to compensate all of the reactive power down to zero although the requirement is only 0.95, or to take the delta capacitance as the wye capacitance.",
        limUk: "Конденсатор пораховано на симетричну синусоїду 50 Гц. Гармоніки і перенапруга при вмиканні в цю ємність не входять.",
        limEn: "The capacitor is computed for a symmetric 50 Hz sine. Harmonics and the overvoltage at closing are not inside this capacitance.",
        nums: [
          num(qComp, "var", "Реактивна потужність, яку треба прибрати, щоб від 0,75 перейти до 0,95, у варах?", "Reactive power to remove to go from 0.75 to 0.95, in vars?"),
          num(cWye, "F", "Ємність на фазу зірки для цієї потужності при 50 Гц, у фарадах?", "Capacitance per wye phase for this power at 50 Hz, in farads?"),
        ],
        mcq: {
          uk: "Ємність гілки трикутника порівняно з фазою зірки…",
          en: "A delta branch capacitance compared with a wye phase…",
          optionsUk: ["менша втричі при тій самій реактивній потужності", "більша втричі", "така сама", "не залежить від напруги"],
          optionsEn: ["is three times smaller at the same reactive power", "is three times larger", "is the same", "does not depend on voltage"],
          correct: 0,
        },
      }),
      L({
        d: 4,
        titleUk: "Обрив фази і межа звіту",
        titleEn: "An open phase and the limit of the report",
        tokenUk: "обрив",
        tokenEn: "open",
        qUk: "Які струм нейтралі і електрична потужність лишаються, якщо одна фаза зірки з нейтраллю обірвана?",
        qEn: "What neutral current and electrical power remain if one phase of a wye with a neutral is open?",
        modelUk: "При цілій нейтралі дві вцілілі фази лишаються під фазною напругою. Струм кожної є колишнім фазним струмом, якщо еквівалент лінійний. Векторна сума двох рівних струмів під 120° дорівнює третьому за модулем, тож нейтраль несе струм однієї фази, а не нуль і не суму двох арифметично. Електрична потужність двох фаз є 2000 Вт, бо третина з 3000 зникла разом із фазою. Це все ще електричні вати на затискачах. Вал, перегрів уцілілих обмоток і захист у це число не входять. Звіт зупиняється на струмі, потужності і реченні про межу еквівалента.",
        modelEn: "With the neutral intact, the two surviving phases stay at the phase voltage. Each current is the former phase current if the equivalent is linear. The vector sum of two equal currents at 120° equals the third in magnitude, so the neutral carries one phase current, not zero and not the arithmetic sum of the two. The electrical power of the two phases is 2000 W, because one third of 3000 disappeared with the phase. Those are still electrical watts at the terminals. The shaft, the heating of the surviving windings, and the protection are not inside this number. The report stops at the current, the power, and a sentence about the limit of the equivalent.",
        exUk: `Струм нейтралі при обриві ${fmt(iLine)} А. Електрична потужність двох фаз ${fmt(pTwo)} Вт. Втрати в лінії справного режиму ${fmt(pLine)} Вт на активних 0,4 Ом.`,
        exEn: `The neutral current at the open is ${fmt(iLine)} A. The electrical power of the two phases is ${fmt(pTwo)} W. The line loss of the healthy regime is ${fmt(pLine)} W in the resistive 0.4 Ω.`,
        checkUk: "Сума двох струмів під 120° має модуль одного струму. 3000·2/3 = 2000 Вт. 3·I²·0,4 є втратами лінії, не валом.",
        checkEn: "The sum of two currents at 120° has the magnitude of one current. 3000·2/3 = 2000 W. 3·I²·0.4 is the line loss, not the shaft.",
        errUk: "Помилка — сказати, що нейтраль без однієї фази не несе струму, бо «зірка збалансована», або назвати 2000 Вт потужністю на валу.",
        errEn: "The mistake is to say the neutral carries no current with one phase missing because “the wye is balanced,” or to call 2000 W the power on the shaft.",
        limUk: "2000 Вт тримаються, поки нейтраль жорстка і дві фази лишились на своїх 40 Ом. Просіла нейтраль або насичення змінюють і струм, і потужність.",
        limEn: "2000 W holds while the neutral is stiff and the two phases stayed at their 40 Ω. A sagging neutral or saturation changes both the current and the power.",
        nums: [
          num(iLine, "A", "Модуль струму нейтралі, якщо одна фаза зірки обірвана, а дві лишились при колишньому фазному струмі?", "Magnitude of the neutral current if one wye phase is open and the two others stay at the former phase current?"),
          num(pTwo, "W", "Електрична потужність двох уцілілих фаз, у ватах?", "Electrical power of the two surviving phases, in watts?"),
        ],
        mcq: {
          uk: "Після обриву однієї фази звіт має сказати…",
          en: "After one phase opens, the report has to say…",
          optionsUk: ["що 2000 Вт електричні і вал із них не відновлено", "що вал лишився 3 кВт", "що нейтраль без струму", "що коефіцієнт став 1 сам"],
          optionsEn: ["that 2000 W is electrical and the shaft is not recovered from it", "that the shaft stayed at 3 kW", "that the neutral current is zero", "that the factor became 1 by itself"],
          correct: 0,
        },
      }),
    ],
    examA: [
      n(iLine, "A", "Струм лінії 3 кВт, 400 В, коефіцієнт 0,75?", "Line current at 3 kW, 400 V, factor 0.75?"),
      n(rPhase, "ohm", "Активний опір фази при модулі 40 Ом і коефіцієнті 0,75?", "Resistive part of a 40 ohm phase at a factor of 0.75?"),
      n(xPhase, "ohm", "Реактивний опір тієї фази, в омах?", "Reactance of that phase, in ohms?"),
      n(qComp, "var", "Реактивна потужність компенсації з 0,75 до 0,95, у варах?", "Reactive power of the compensation from 0.75 to 0.95, in vars?"),
      n(cWye, "F", "Ємність на фазу зірки, у фарадах?", "Capacitance per wye phase, in farads?"),
      n(pLine, "W", "Втрати трьох провідників по 0,4 Ом при струмі справного режиму?", "Loss of three conductors of 0.4 ohm each at the healthy-regime current?"),
      q("3 кВт у цьому проєкті…", "The 3 kW in this project…", ["електричні на затискачах, не вал", "потужність на валу", "втрати лише лінії", "реактивна потужність"], ["are electrical at the terminals, not the shaft", "are the shaft power", "are only the line loss", "are the reactive power"], 0),
      q("Модуль спаду лінії…", "The magnitude of the line drop…", ["не віднімають наосліп від 400 В", "завжди є новою лінійною напругою після віднімання", "дорівнює 3 кВт", "нульовий при коефіцієнті 0,75"], ["is not subtracted blindly from 400 V", "is always the new line voltage after subtraction", "equals 3 kW", "is zero at a factor of 0.75"], 0),
      q("Ємність трикутника при тій самій реактивній потужності…", "The delta capacitance at the same reactive power…", ["втричі менша за фазу зірки", "втричі більша", "рівна опору 40 Ом", "скасовує струм"], ["is three times smaller than a wye phase", "is three times larger", "equals the 40 ohm resistance", "cancels the current"], 0),
      q("Обрив однієї фази при цілій нейтралі…", "An open of one phase with the neutral intact…", ["дає нейтралі модуль одного фазного струму", "залишає нейтраль без струму", "піднімає потужність до 4000 Вт", "робить еквівалент механічним"], ["gives the neutral the magnitude of one phase current", "leaves the neutral with no current", "raises the power to 4000 W", "makes the equivalent mechanical"], 0),
    ],
    examB: [
      n(vph, "V", "Фазна напруга при лінійних 400 В?", "Phase voltage at a line voltage of 400 V?"),
      n(vPhaseR, "V", "Модуль напруги на активних 30 Ом при фазній напрузі 400/√3?", "Magnitude of the voltage on the resistive 30 ohm at a phase voltage of 400/√3?"),
      n(dropPhase, "V", "Модуль фазного спаду на лінії 0,5 Ом при струмі 10/√3 А?", "Magnitude of the phase drop on a 0.5 ohm line at a current of 10/√3 A?"),
      n(cDelta, "F", "Ємність однієї гілки трикутника для тієї самої компенсації, у фарадах?", "Capacitance of one delta branch for the same compensation, in farads?"),
      n(pTwo, "W", "Електрична потужність двох фаз після обриву третьої, у ватах?", "Electrical power of two phases after the third opens, in watts?"),
      n(qMotor, "var", "Реактивна потужність режиму 4000 ВА при коефіцієнті 0,75, у варах?", "Reactive power of the 4000 VA regime at a factor of 0.75, in vars?"),
      q("Поділити 3 кВт на кутову швидкість…", "Dividing 3 kW by an angular speed…", ["не дає моменту цього електричного еквівалента", "дає момент вала точно", "дає ємність зірки", "скасовує струм нейтралі"], ["does not give the torque of this electrical equivalent", "gives the shaft torque exactly", "gives the wye capacitance", "cancels the neutral current"], 0),
      q("Жорсткий струм у розрахунку спаду лінії…", "The stiff current in the line-drop calculation…", ["є наближенням, бо лінія трохи зменшує струм", "точний для будь-якої лінії", "не має відношення до 0,5 Ом", "робить потужність механічною"], ["is an approximation, because the line reduces the current a little", "is exact for every line", "has nothing to do with 0.5 Ω", "makes the power mechanical"], 0),
      q("Компенсація до 0,95…", "Compensation to 0.95…", ["прибирає не всю реактивну потужність", "доводить реактивну потужність до нуля обов'язково", "збільшує активні 3 кВт", "замінює нейтраль"], ["does not remove all of the reactive power", "necessarily brings the reactive power to zero", "increases the active 3 kW", "replaces the neutral"], 0),
      q("2000 Вт після обриву фази…", "2000 W after a phase opens…", ["електричні на двох фазах, поки нейтраль тримає фазну напругу", "потужність на валу", "втрати лінії", "ємність конденсатора"], ["are electrical on two phases, while the neutral holds the phase voltage", "are the shaft power", "are the line loss", "are the capacitor's capacitance"], 0),
    ],
  }),
];
