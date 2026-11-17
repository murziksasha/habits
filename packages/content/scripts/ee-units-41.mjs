import { fmt, n, q, num, L, U } from "./ee-shape.mjs";

const vdc = 48;
const fundPeak = (4 * vdc) / Math.PI;
const fundRms = fundPeak / Math.SQRT2;
const thirdPeak = fundPeak / 3;
const fBridge = 20e3;
const tDead = 500e-9;
const deadFrac = tDead * fBridge;
const deadBoth = 2 * deadFrac;
const mIndex = 0.8;
const vPwm = mIndex * vdc;
const over = 4 / Math.PI;
const rLoad = 12;
const iSquare = vdc / rLoad;
const pSquare = vdc * iSquare;
const pFund = pSquare * (8 / Math.PI ** 2);
const rds = 0.05;
const iShoot = vdc / (2 * rds);
const dvCap = (4 * 500e-9) / 100e-6;
const esrDrop = 4 * 0.05;

const vOn = 12;
const tOn = 5e-6;
const nTurns = 10;
const ae = 20e-6;
const bAc = (vOn * tOn) / (nTurns * ae);
const bLong = (vOn * (2 * tOn)) / (nTurns * ae);
const flux = bAc * ae;
const rPerM = 0.2;
const turnLen = 0.04;
const rCu = nTurns * turnLen * rPerM;
const iCu = 2;
const pCu = iCu * iCu * rCu;
const rTh = 40;
const dT = pCu * rTh;
const pCu4 = 4 * 4 * rCu;
const dT4 = pCu4 * rTh;
const pCore = 0.4;
const pTot = pCu + pCore;
const dTtot = pTot * rTh;
const mu0 = Math.PI * 4e-7;
const sigmaCu = 5.8e7;
const skin = 1 / Math.sqrt(Math.PI * 100e3 * mu0 * sigmaCu);
const iAvg = 1.2;
const diL = 0.4;
const iPk = iAvg + diL / 2;
const iPkHalf = iAvg + diL;
const iSat = 1.5;
const bHalfTurns = bAc / 2;
const rDoubleN = rCu * 2;
const pDoubleN = iCu * iCu * rDoubleN;

export const units = [
  U({
    code: "ee-41",
    slug: "ee-41-bridge-inverters",
    titleUk: "Мостовий інвертор",
    titleEn: "The bridge inverter",
    prereqUk: "ШІМ, діод зворотного струму і баланс напруги на котушці.",
    prereqEn: "PWM, the freewheel diode, and voltage balance on a coil.",
    outcomeUk: "Учень відрізняє діюче значення прямокутника від амплітуди першої гармоніки, рахує частку паузи в періоді, лінійну модуляцію H-моста, потужність на резисторі і стелю наскрізного струму.",
    outcomeEn: "The learner separates the RMS of a square wave from the amplitude of its first harmonic, computes the blanking fraction of a period, the linear modulation of an H-bridge, resistor power, and the resistive ceiling of shoot-through.",
    formulaUk: "Прямокутник ±Vdc має діюче значення Vdc. Амплітуда першої гармоніки 4·Vdc/π. Лінійний двополярний ШІМ цього моста: амплітуда першої гармоніки m·Vdc при m ≤ 1. Одна пауза td займає частку td·f. Наскрізний струм ідеальної оцінки Vdc/(2·Rds).",
    formulaEn: "A ±Vdc square has RMS equal to Vdc. The first-harmonic amplitude is 4·Vdc/π. Linear bipolar PWM of this bridge has first-harmonic amplitude m·Vdc for m ≤ 1. One blanking interval td occupies the fraction td·f. The ideal shoot-through estimate is Vdc/(2·Rds).",
    lessons: [
      L({
        d: 4,
        titleUk: "Перша гармоніка прямокутника",
        titleEn: "Fundamental of a square wave",
        tokenUk: "гармоніка",
        tokenEn: "fundamental",
        qUk: "Яка амплітуда першої гармоніки напруги ±48 В і яке діюче значення має сам прямокутник?",
        qEn: "What is the first-harmonic amplitude of a ±48 V square, and what RMS does the square itself have?",
        modelUk: "Однофазний H-міст у цьому уроці підключає навантаження або до +Vdc, або до −Vdc. Якщо кожен стан триває половину періоду, напруга є прямокутником з розмахом від +Vdc до −Vdc. Діюче значення такого прямокутника дорівнює Vdc, бо квадрат напруги весь час є Vdc². Синусна формула Vpeak/√2 сюди не переноситься. Ряд Фур'є цього прямокутника має першу гармоніку з амплітудою 4·Vdc/π, далі непарні гармоніки з амплітудами, що спадають як 1, 1/3, 1/5. Амплітуда першої гармоніки більша за Vdc: плоску вершину збирає сума гармонік, а не одна синусоїда.",
        modelEn: "The single-phase H-bridge in this lesson ties the load either to +Vdc or to −Vdc. When each state lasts half a period, the voltage is a square from +Vdc to −Vdc. The RMS of that square equals Vdc, because the squared voltage is Vdc² the whole time. The sine formula Vpeak/√2 does not transfer here. The Fourier series of this square has a first harmonic of amplitude 4·Vdc/π, then odd harmonics whose amplitudes fall as 1, 1/3, 1/5. The first-harmonic amplitude is larger than Vdc: the flat top is the sum of the harmonics, not one sine.",
        exUk: `Амплітуда першої гармоніки ${fmt(fundPeak)} В. Діюче значення прямокутника ${fmt(vdc)} В. Третя гармоніка має амплітуду ${fmt(thirdPeak)} В. Діюче значення самої першої гармоніки ${fmt(fundRms)} В, і воно менше за діюче значення прямокутника.`,
        exEn: `The first-harmonic amplitude is ${fmt(fundPeak)} V. The RMS of the square is ${fmt(vdc)} V. The third harmonic has amplitude ${fmt(thirdPeak)} V. The RMS of the first harmonic alone is ${fmt(fundRms)} V, and that is less than the RMS of the square.`,
        checkUk: "4·48/π більше за 48, а 48² є середнім квадратом прямокутника. Діюче значення прямокутника не ділять на √2.",
        checkEn: "4·48/π is greater than 48, and 48² is the mean square of the square wave. The RMS of the square is not divided by √2.",
        errUk: "Помилка — назвати діюче значення прямокутника Vdc/√2 або сказати, що амплітуда першої гармоніки дорівнює Vdc.",
        errEn: "The mistake is to call the RMS of the square Vdc/√2, or to say that the first-harmonic amplitude equals Vdc.",
        limUk: "Ряд належить ідеальному прямокутнику без паузи між ключами і без фільтра. Реальний міст має час перемикання, а після LC-фільтра на навантаженні лишається переважно перша гармоніка.",
        limEn: "The series belongs to an ideal square with no blanking between the switches and with no filter. A real bridge has switching time, and after an LC filter the load keeps mostly the first harmonic.",
        nums: [
          num(fundPeak, "V", "Амплітуда першої гармоніки прямокутника ±48 В, у вольтах?", "Amplitude of the first harmonic of a ±48 V square, in volts?"),
          num(vdc, "V", "Діюче значення цього прямокутника ±48 В, у вольтах?", "RMS of this ±48 V square, in volts?"),
        ],
        mcq: {
          uk: "Амплітуда першої гармоніки ідеального прямокутника ±Vdc…",
          en: "The first-harmonic amplitude of an ideal ±Vdc square…",
          optionsUk: ["дорівнює 4·Vdc/π і перевищує Vdc", "дорівнює Vdc/√2", "дорівнює Vdc", "не існує, бо форма плоска"],
          optionsEn: ["equals 4·Vdc/π and exceeds Vdc", "equals Vdc/√2", "equals Vdc", "does not exist, because the shape is flat"],
          correct: 0,
        },
      }),
      L({
        d: 4,
        titleUk: "Пауза між ключами одного плеча",
        titleEn: "Blanking between the devices of one leg",
        tokenUk: "пауза",
        tokenEn: "blanking",
        qUk: "Яку частку періоду 20 кГц займає одна пауза 500 нс, і яку частку займають дві такі паузи?",
        qEn: "What fraction of a 20 kHz period is one 500 ns blanking interval, and what fraction is two such intervals?",
        modelUk: "У плечі моста два ключі дивляться на одну шину. Якщо обидва відкриті, шина замкнена через них. Між командою закрити один ключ і командою відкрити другий вставляють паузу, щоб перший встиг вийти з провідності. На частоті f одна пауза td займає частку td·f періоду. Дві паузи на період, по одній на кожен фронт, займають 2·td·f. Протягом паузи команда затворів не задає напругу виходу. Струм котушки не зникає: він замикається через зворотний діод того ключа, який дозволяє напрямок струму. Напруга в цю мить залежить від знака струму, а не від наступної команди.",
        modelEn: "The two switches of one bridge leg both face the same bus. If both are on, the bus is shorted through them. A blanking interval is inserted between the command that turns one device off and the command that turns the other on, so the first device can leave conduction. At frequency f one interval td occupies the fraction td·f of the period. Two intervals in a period, one on each edge, occupy 2·td·f. During the interval the gate commands do not set the output voltage. Coil current does not vanish: it closes through the freewheel diode of the device that matches the current direction. The voltage at that moment depends on the sign of the current, not on the next command.",
        exUk: `Період 20 кГц дорівнює 50 мкс. Одна пауза 500 нс є часткою ${fmt(deadFrac)}. Дві паузи є часткою ${fmt(deadBoth)}. Це ще не означає, що середня напруга менша на 2 відсотки: діод може втримати вихід біля додатного або від'ємного рейка.`,
        exEn: `The period at 20 kHz is 50 µs. One 500 ns blanking interval is the fraction ${fmt(deadFrac)}. Two intervals are the fraction ${fmt(deadBoth)}. That does not yet mean the average voltage is 2 percent low: the diode can hold the output near the positive or the negative rail.`,
        checkUk: "500 нс / 50 мкс = 0,01. Дві такі паузи дають 0,02. Обидва числа є частками періоду, а не вольтами.",
        checkEn: "500 ns / 50 µs = 0.01. Two such intervals give 0.02. Both numbers are fractions of the period, not volts.",
        errUk: "Помилка — вважати, що вихідна напруга повторює команди затворів і під час паузи, або що пауза завжди зменшує діюче значення на ту саму частку.",
        errEn: "The mistake is to treat the output voltage as a copy of the gate commands during the blanking interval, or to treat the interval as a fixed loss of RMS.",
        limUk: "Частка часу не є універсальною поправкою напруги. При активному навантаженні струм згасає і діод не тримає рейок так, як при струмі двигуна. Час вимкнення конкретного ключа в цю частку не входить, поки його не виміряно.",
        limEn: "The time fraction is not a universal voltage correction. With a resistive load the current dies away, and the diode does not hold a rail the way it does with motor current. The turn-off time of a particular device is not inside this fraction until it has been measured.",
        nums: [
          num(deadFrac, "1", "Частка періоду 20 кГц, яку займає одна пауза 500 нс.", "Fraction of a 20 kHz period occupied by one 500 ns blanking interval."),
          num(deadBoth, "1", "Частка періоду, яку займають дві такі паузи.", "Fraction of the period occupied by two such intervals."),
        ],
        mcq: {
          uk: "Під час паузи між ключами плеча струм котушки…",
          en: "During the blanking interval of a bridge leg, coil current…",
          optionsUk: ["замикається через зворотний діод", "обов'язково стає нулем", "замикає шину накоротко сам", "задається лише командою затвора"],
          optionsEn: ["closes through a freewheel diode", "must become zero", "shorts the bus by itself", "is set only by the gate command"],
          correct: 0,
        },
      }),
      L({
        d: 4,
        titleUk: "Лінійна модуляція моста",
        titleEn: "Linear modulation of the bridge",
        tokenUk: "модуляція",
        tokenEn: "modulation",
        qUk: "Яка амплітуда першої гармоніки лінійного двополярного ШІМ при m = 0,8 і шині 48 В?",
        qEn: "What is the first-harmonic amplitude of linear bipolar PWM at m = 0.8 on a 48 V bus?",
        modelUk: "У лінійному двополярному ШІМ цей самий H-міст і далі стрибає між +Vdc і −Vdc, але частка часу біля кожного рейка змінюється разом із синусною командою. Поки індекс модуляції m не перевищує 1, амплітуда першої гармоніки дорівнює m·Vdc. Це інша формула, ніж 4·Vdc/π. Число 4/π більше за 1 і описує межу прямокутника, коли команда вже не лінійна. Підставляти m у ряд прямокутника, або множити m·Vdc ще на 4/π, змішує два режими.",
        modelEn: "In linear bipolar PWM this same H-bridge still jumps between +Vdc and −Vdc, but the fraction of time spent at each rail changes with the sine command. While the modulation index m does not exceed 1, the first-harmonic amplitude equals m·Vdc. That is a different formula from 4·Vdc/π. The number 4/π is greater than 1 and describes the square-wave ceiling, when the command is no longer linear. Putting m into the square-wave series, or multiplying m·Vdc again by 4/π, mixes the two regimes.",
        exUk: `При m = 0,8 і Vdc = 48 В амплітуда першої гармоніки ${fmt(vPwm)} В. Межа прямокутника для тієї самої шини є ${fmt(fundPeak)} В, тобто m мав би стати ${fmt(over)}, а це вже поза лінійним діапазоном.`,
        exEn: `At m = 0.8 and Vdc = 48 V the first-harmonic amplitude is ${fmt(vPwm)} V. The square-wave ceiling on the same bus is ${fmt(fundPeak)} V, so m would have to become ${fmt(over)}, which is already outside the linear range.`,
        checkUk: "0,8·48 = 38,4. Це менше і за 48, і за 4·48/π. Лінійна формула не перевищує шину.",
        checkEn: "0.8·48 = 38.4. That is less than both 48 and 4·48/π. The linear formula does not exceed the bus.",
        errUk: "Помилка — рахувати будь-який ШІМ як прямокутник 4·Vdc/π або помножити m·Vdc на 4/π ще раз.",
        errEn: "The mistake is to treat every PWM waveform as the square 4·Vdc/π, or to multiply m·Vdc by 4/π a second time.",
        limUk: "Формула m·Vdc належить ідеальному двополярному порівнянню без паузи, без спаду ключів і без перемодуляції. При m > 1 з'являються додаткові гармоніки, і лінійний зв'язок команди з першою гармонікою закінчується.",
        limEn: "The formula m·Vdc belongs to an ideal bipolar comparison with no blanking, no device drop, and no overmodulation. Above m = 1 extra harmonics appear, and the linear link from the command to the first harmonic ends.",
        nums: [
          num(vPwm, "V", "Амплітуда першої гармоніки при m = 0,8 і шині 48 В, у вольтах?", "First-harmonic amplitude at m = 0.8 and a 48 V bus, in volts?"),
          num(over, "1", "Який індекс m збігся б із межею прямокутника 4/π?", "Which index m would meet the square-wave ceiling 4/π?"),
        ],
        mcq: {
          uk: "Поки m ≤ 1, амплітуда першої гармоніки цього двополярного моста…",
          en: "While m ≤ 1, the first-harmonic amplitude of this bipolar bridge…",
          optionsUk: ["дорівнює m·Vdc", "завжди дорівнює 4·Vdc/π", "дорівнює Vdc/m", "не залежить від шини"],
          optionsEn: ["equals m·Vdc", "always equals 4·Vdc/π", "equals Vdc/m", "does not depend on the bus"],
          correct: 0,
        },
      }),
      L({
        d: 4,
        titleUk: "Резистор повторює напругу, котушка тримає струм",
        titleEn: "A resistor follows voltage, a coil holds current",
        tokenUk: "діод",
        tokenEn: "diode",
        qUk: "Які струм і потужність прямокутника ±48 В на резисторі 12 Ом?",
        qEn: "What current and power does a ±48 V square produce in a 12 Ω resistor?",
        modelUk: "На резисторі струм має ту саму форму, що й напруга, і знак струму змінюється разом із напругою. Діючі значення збігаються з амплітудами прямокутника: I = Vdc/R, P = Vdc·I = I²·R. Котушка так не робить. Струм котушки є інтегралом напруги і не стрибає, коли команда моста змінює знак. У мить зміни знака струм ще тече в попередній бік і замикається через зворотний діод. Джерело шини не розвертає цей струм миттєво. Частка потужності резистора, що сидить у першій гармоніці, дорівнює 8/π², бо діюче значення першої гармоніки менше за діюче значення прямокутника.",
        modelEn: "In a resistor the current has the same shape as the voltage, and the sign of the current changes with the voltage. The RMS values match the square-wave amplitudes: I = Vdc/R and P = Vdc·I = I²·R. A coil does not do that. Coil current is the integral of voltage and does not jump when the bridge command changes sign. At the sign change the current still flows the previous way and closes through a freewheel diode. The bus source does not reverse that current in the same instant. The fraction of resistor power that sits in the first harmonic equals 8/π², because the RMS of the first harmonic is smaller than the RMS of the square.",
        exUk: `Струм резистора ${fmt(iSquare)} А, потужність ${fmt(pSquare)} Вт. Перевірка I²·R дає ті самі ${fmt(pSquare)} Вт. У першій гармоніці лишається ${fmt(pFund)} Вт. Решта йде в непарні гармоніки резистора.`,
        exEn: `The resistor current is ${fmt(iSquare)} A and the power is ${fmt(pSquare)} W. The check I²·R returns the same ${fmt(pSquare)} W. The first harmonic keeps ${fmt(pFund)} W. The rest goes into the odd harmonics of the resistor.`,
        checkUk: "48/12 = 4 і 48·4 = 192. Квадрат струму 16, помножений на 12, знову 192.",
        checkEn: "48/12 = 4 and 48·4 = 192. The square of the current is 16, and 16·12 is 192 again.",
        errUk: "Помилка — розвернути струм котушки в ту саму наносекунду, що й команду напруги, або порахувати потужність резистора лише з першої гармоніки і назвати це повною потужністю.",
        errEn: "The mistake is to reverse a coil current in the same nanosecond as the voltage command, or to compute resistor power from the first harmonic alone and call that the whole power.",
        limUk: "Прямокутний струм є властивістю резистора без індуктивності виводів. Навіть короткий дріт має індуктивність, тож ідеальний стрибок струму є межею моделі, а не осцилограмою.",
        limEn: "A square current is a property of a resistor with no lead inductance. Even a short wire has inductance, so an ideal current step is a limit of the model, not an oscillogram.",
        nums: [
          num(iSquare, "A", "Діючий струм прямокутника ±48 В на 12 Ом, в амперах?", "RMS current of a ±48 V square in 12 Ω, in amperes?"),
          num(pSquare, "W", "Потужність цього резистора, у ватах?", "Power in that resistor, in watts?"),
        ],
        mcq: {
          uk: "Коли команда моста змінює знак, струм котушки…",
          en: "When the bridge command changes sign, coil current…",
          optionsUk: ["ще тече попереднім шляхом через діод", "змінює знак разом із командою", "одразу дорівнює Vdc/R", "зникає, бо середня напруга нуль"],
          optionsEn: ["still flows the previous way through a diode", "changes sign with the command", "equals Vdc/R at once", "vanishes, because the average voltage is zero"],
          correct: 0,
        },
      }),
      L({
        d: 4,
        titleUk: "Наскрізний струм і провал шини",
        titleEn: "Shoot-through and bus sag",
        tokenUk: "наскрізний",
        tokenEn: "shoot",
        qUk: "Який струм дає ідеальна оцінка наскрізного плеча при 48 В і двох опорах 0,05 Ом, і який провал дає ємність 100 мкФ від імпульсу 4 А тривалістю 500 нс?",
        qEn: "What current does the ideal shoot-through estimate give at 48 V with two 0.05 Ω devices, and what sag does 100 µF show for a 4 A pulse lasting 500 ns?",
        modelUk: "Якщо обидва ключі плеча відкриті, шина бачить два опори каналу послідовно і майже не бачить навантаження. Стеля струму ідеальної оцінки I = Vdc/(Rds1+Rds2). Індуктивність шини не дає струму досягти цієї стелі за наносекунду, але стеля показує, чому пауза обов'язкова. Окремо конденсатор шини віддає імпульс струму ключам. Якщо весь імпульс іде з конденсатора і ESR нульовий, провал ΔV = I·Δt/C. Справжня добавка I·ESR часто більша за цей ємнісний провал. Ідеальне джерело, приєднане замість виходу моста, тримає напругу навантаження і ховає і наскрізний струм, і провал шини. Перевірка має бачити струм плеча або стан обох ключів.",
        modelEn: "If both devices of a leg are on, the bus sees the two channel resistances in series and barely sees the load. The ceiling of the ideal estimate is I = Vdc/(Rds1+Rds2). Bus inductance does not let the current reach that ceiling in a nanosecond, but the ceiling shows why the blanking interval is required. Separately, the bus capacitor supplies the current pulse to the switches. If the whole pulse comes from the capacitor and the ESR is zero, the sag is ΔV = I·Δt/C. The real addition I·ESR is often larger than that capacitive sag. An ideal source pasted in place of the bridge output holds the load voltage and hides both the shoot-through current and the bus sag. A check has to see the leg current or the state of both switches.",
        exUk: `Стеля наскрізного струму ${fmt(iShoot)} А. Ємнісний провал ${fmt(dvCap)} В. При ESR 0,05 Ом і тих самих 4 А резистивна добавка ${fmt(esrDrop)} В, у десять разів більша за ємнісний провал цього прикладу.`,
        exEn: `The shoot-through ceiling is ${fmt(iShoot)} A. The capacitive sag is ${fmt(dvCap)} V. At an ESR of 0.05 Ω and the same 4 A, the resistive addition is ${fmt(esrDrop)} V, ten times the capacitive sag of this example.`,
        checkUk: "48/0,1 = 480. Імпульс 4·500 нс / 100 мкФ = 0,02 В. Добуток 4·0,05 = 0,2 В дає добавку ESR.",
        checkEn: "48/0.1 = 480. The pulse 4·500 ns / 100 µF = 0.02 V. The product 4·0.05 = 0.2 V is the ESR addition.",
        errUk: "Помилка — вважати міст справним, бо на навантаженні є потрібна напруга від підміненого ідеального джерела, або лишити в розрахунку провал лише ємність і викинути ESR.",
        errEn: "The mistake is to call the bridge healthy because the load shows the wanted voltage from a substituted ideal source, or to keep only the capacitor in the sag calculation and throw out the ESR.",
        limUk: "480 А є резистивною стелею без індуктивності шини і без обмеження драйвера. За перші наносекунди струм менший. Число 0,02 В не включає індуктивність виводів конденсатора, яка дає свій викид на фронті.",
        limEn: "480 A is a resistive ceiling with no bus inductance and no driver limit. Over the first nanoseconds the current is smaller. The figure 0.02 V does not include the capacitor lead inductance, which adds its own spike on the edge.",
        nums: [
          num(iShoot, "A", "Ідеальна стеля наскрізного струму при 48 В і двох опорах по 0,05 Ом, в амперах?", "Ideal shoot-through ceiling at 48 V and two 0.05 Ω devices, in amperes?"),
          num(dvCap, "V", "Ємнісний провал 100 мкФ від імпульсу 4 А і 500 нс, у вольтах?", "Capacitive sag of 100 µF for a 4 A, 500 ns pulse, in volts?"),
        ],
        mcq: {
          uk: "Ідеальне джерело замість виходу моста…",
          en: "An ideal source in place of the bridge output…",
          optionsUk: ["ховає наскрізний струм плеча", "доводить, що пауза достатня", "вимірює ESR конденсатора", "скасовує струм котушки завжди"],
          optionsEn: ["hides the shoot-through current of the leg", "proves that the blanking interval is long enough", "measures the capacitor ESR", "always cancels coil current"],
          correct: 0,
        },
      }),
    ],
    examA: [
      n((4 * 60) / Math.PI, "V", "Амплітуда першої гармоніки прямокутника ±60 В, у вольтах?", "Amplitude of the first harmonic of a ±60 V square, in volts?"),
      n(60, "V", "Діюче значення прямокутника ±60 В, у вольтах?", "RMS of a ±60 V square, in volts?"),
      n(1e-6 * 10e3, "1", "Частка періоду 10 кГц, яку займає одна пауза 1 мкс.", "Fraction of a 10 kHz period occupied by one 1 µs blanking interval."),
      n(0.6 * 100, "V", "Амплітуда першої гармоніки лінійного двополярного ШІМ при m = 0,6 і шині 100 В, у вольтах?", "First-harmonic amplitude of linear bipolar PWM at m = 0.6 and a 100 V bus, in volts?"),
      n(24 / 8, "A", "Діючий струм прямокутника ±24 В на 8 Ом, в амперах?", "RMS current of a ±24 V square in 8 Ω, in amperes?"),
      n(24 * 3, "W", "Потужність цього резистора 8 Ом, у ватах?", "Power in that 8 Ω resistor, in watts?"),
      q("Діюче значення прямокутника ±Vdc…", "The RMS of a ±Vdc square…", ["дорівнює Vdc", "дорівнює Vdc/√2", "дорівнює 4·Vdc/π", "завжди нуль"], ["equals Vdc", "equals Vdc/√2", "equals 4·Vdc/π", "is always zero"]),
      q("Лінійний індекс m = 0,6…", "A linear index m = 0.6…", ["не замінюють формулою прямокутника 4/π", "означає амплітуду 4·Vdc/π", "вимикає обидва ключі плеча", "робить діюче значення нулем"], ["is not replaced by the square-wave formula 4/π", "means an amplitude of 4·Vdc/π", "turns both devices of a leg off", "sets the RMS to zero"]),
      q("Пауза між ключами плеча потрібна, бо…", "Blanking between the devices of one leg is required because…", ["одночасна провідність замикає шину", "вона збільшує першу гармоніку у 4/π", "діод не існує в мості", "резистор не споживає потужності"], ["simultaneous conduction shorts the bus", "it increases the first harmonic by 4/π", "a bridge has no diode", "a resistor consumes no power"]),
      q("Підміна виходу ідеальним джерелом…", "Replacing the output with an ideal source…", ["не показує струм плеча", "доводить відсутність наскрізного режиму", "вимірює паузу", "прибирає гармоніки з ряду Фур'є як факт"], ["does not show the leg current", "proves that shoot-through is absent", "measures the blanking interval", "removes harmonics from the Fourier series as a fact"]),
    ],
    examB: [
      n(thirdPeak, "V", "Амплітуда третьої гармоніки прямокутника ±48 В, у вольтах?", "Amplitude of the third harmonic of a ±48 V square, in volts?"),
      n(fundRms, "V", "Діюче значення першої гармоніки прямокутника ±48 В, у вольтах?", "RMS of the first harmonic of a ±48 V square, in volts?"),
      n(pFund, "W", "Потужність першої гармоніки в резисторі 12 Ом при прямокутнику ±48 В, у ватах?", "First-harmonic power in a 12 Ω resistor for a ±48 V square, in watts?"),
      n(deadBoth, "1", "Частка періоду 20 кГц, яку займають дві паузи по 500 нс.", "Fraction of a 20 kHz period occupied by two 500 ns blanking intervals."),
      n(24 / 0.2, "A", "Ідеальна стеля наскрізного струму при 24 В і двох опорах по 0,1 Ом, в амперах?", "Ideal shoot-through ceiling at 24 V and two 0.1 Ω devices, in amperes?"),
      n((10 * 1e-6) / 50e-6, "V", "Ємнісний провал 50 мкФ від імпульсу 10 А і 1 мкс, у вольтах?", "Capacitive sag of 50 µF for a 10 A, 1 µs pulse, in volts?"),
      q("Третя гармоніка прямокутника…", "The third harmonic of the square…", ["має амплітуду втричі меншу за першу", "дорівнює першій", "скасовує діюче значення", "існує лише при m = 0,8"], ["has one third of the first-harmonic amplitude", "equals the first harmonic", "cancels the RMS", "exists only at m = 0.8"]),
      q("Струм котушки в мить зміни знака команди…", "Coil current at the instant the command changes sign…", ["ще не дорівнює новій напрузі, поділеній на опір", "обов'язково нуль", "не може текти через діод", "дорівнює наскрізному струму"], ["is not yet the new voltage divided by resistance", "must be zero", "cannot flow through a diode", "equals the shoot-through current"]),
      q("Добавка I·ESR на імпульсі шини…", "The I·ESR addition on a bus pulse…", ["може перевищити ємнісний провал I·Δt/C", "завжди нуль, якщо конденсатор стоїть", "скасовує паузу", "дорівнює 4·Vdc/π"], ["can exceed the capacitive sag I·Δt/C", "is always zero if a capacitor is fitted", "cancels the blanking interval", "equals 4·Vdc/π"]),
      q("Індекс 4/π…", "The index 4/π…", ["лежить поза лінійним діапазоном m ≤ 1", "є шпаруватістю buck", "дорівнює частці паузи 500 нс", "вимикає діод"], ["lies outside the linear range m ≤ 1", "is the duty of a buck", "equals the fraction of a 500 ns blanking interval", "turns the diode off"]),
    ],
  }),
  U({
    code: "ee-42",
    slug: "ee-42-magnetics-thermal",
    titleUk: "Магнітний і тепловий розрахунок",
    titleEn: "Magnetics and heating",
    prereqUk: "Вольт-секунди котушки, втрати I²R і опір тепловому потоку.",
    prereqEn: "Volt-seconds on a coil, I²R loss, and resistance to heat flow.",
    outcomeUk: "Учень знаходить індукцію з добутку напруги на час, опір і втрати міді, перевищення температури та окремо перевіряє струм насичення.",
    outcomeEn: "The learner finds flux density from the product of voltage and time, copper resistance and loss, temperature rise, and checks saturation current as a separate limit.",
    formulaUk: "B = V·t_on/(N·Ae) для ідеальної котушки. Pcu = I²·R, ΔT = P·Rth. Струм насичення деталі із зазором не виводиться з цього B. Глибина скін-шару міді δ = 1/√(π·f·μ0·σ) показує, коли R на постійному струмі занижує втрати.",
    formulaEn: "B = V·t_on/(N·Ae) for an ideal coil. Pcu = I²·R and ΔT = P·Rth. The saturation current of a gapped part is not derived from that B. The copper skin depth δ = 1/√(π·f·μ0·σ) shows when the DC resistance understates the loss.",
    lessons: [
      L({
        d: 4,
        titleUk: "Індукція з вольт-секунд",
        titleEn: "Flux density from volt-seconds",
        tokenUk: "індукція",
        tokenEn: "flux",
        qUk: "Яка індукція в осерді з Ae = 20 мм² і 10 витками, якщо 12 В прикладені 5 мкс?",
        qEn: "What flux density is in a core of Ae = 20 mm² and 10 turns when 12 V is applied for 5 µs?",
        modelUk: "Закон Фарадея для ідеальної обмотки: добуток напруги на час дорівнює зміні потокозчеплення N·B·Ae, якщо опір проводу не забирає частину напруги. Звідси B = V·t_on/(N·Ae). Площа в формулі є в квадратних метрах: 20 мм² = 20·10⁻⁶ м². Подвоєння часу відкритого стану подвоює приріст індукції. Подвоєння витків або площі зменшує його вдвічі. Частота сама по собі в формулу не входить, поки з неї не отримано час.",
        modelEn: "Faraday's law for an ideal winding says the product of voltage and time equals the change of flux linkage N·B·Ae, when the wire resistance takes none of the voltage. Then B = V·t_on/(N·Ae). The area in the formula is in square metres: 20 mm² = 20·10⁻⁶ m². Doubling the on-time doubles the flux-density step. Doubling the turns or the area halves it. Frequency does not enter the formula by itself until a time has been obtained from it.",
        exUk: `Індукція ${fmt(bAc)} Тл. Потік ${fmt(flux)} Вб. Якщо тримати 12 В уже 10 мкс, індукція стає ${fmt(bLong)} Тл. Умова цього навчального осердя: коліно кривої прийнято 0,35 Тл, тож 0,6 Тл уже далеко за нею. Це умова задачі, а не рядок каталогу.`,
        exEn: `The flux density is ${fmt(bAc)} T. The flux is ${fmt(flux)} Wb. Holding 12 V for 10 µs instead makes the flux density ${fmt(bLong)} T. The condition of this classroom core takes the knee at 0.35 T, so 0.6 T is far past it. That is a condition of the problem, not a catalog line.`,
        checkUk: "12·5·10⁻⁶ / (10·20·10⁻⁶) = 60·10⁻⁶ / 200·10⁻⁶ = 0,3. Потік 0,3·20·10⁻⁶ = 6·10⁻⁶ Вб.",
        checkEn: "12·5·10⁻⁶ / (10·20·10⁻⁶) = 60·10⁻⁶ / 200·10⁻⁶ = 0.3. The flux is 0.3·20·10⁻⁶ = 6·10⁻⁶ Wb.",
        errUk: "Помилка — поділити напругу на витки і площу без часу, або підставити 20 мм² як 20 м².",
        errEn: "The mistake is to divide voltage by turns and area with no time, or to enter 20 mm² as 20 m².",
        limUk: "0,3 Тл є приріст від цього імпульсу, а не повна індукція, якщо в осерді вже є постійне зміщення. Формула не бачить струм навантаження і не замінює окрему перевірку струму насичення.",
        limEn: "0.3 T is the step from this pulse, not the whole flux density if the core already has a DC bias. The formula does not see the load current and does not replace a separate saturation-current check.",
        nums: [
          num(bAc, "T", "Індукція при 12 В, 5 мкс, 10 витках і Ae = 20·10⁻⁶ м², у теслах?", "Flux density at 12 V, 5 µs, 10 turns, and Ae = 20·10⁻⁶ m², in tesla?"),
          num(flux, "Wb", "Потік цього прикладу, у веберах?", "Flux of this example, in webers?"),
        ],
        mcq: {
          uk: "Подвоєння часу прикладеної напруги при незмінних витках і площі…",
          en: "Doubling the time the voltage is applied, with the same turns and area…",
          optionsUk: ["подвоює приріст індукції", "не змінює B", "зменшує B вдвічі", "скасовує закон Фарадея"],
          optionsEn: ["doubles the flux-density step", "does not change B", "halves B", "cancels Faraday's law"],
          correct: 0,
        },
      }),
      L({
        d: 4,
        titleUk: "Витки, опір і втрати міді",
        titleEn: "Turns, resistance, and copper loss",
        tokenUk: "мідь",
        tokenEn: "copper",
        qUk: "Який опір і які втрати має обмотка з 10 витків середньою довжиною 40 мм при 0,2 Ом/м і струмі 2 А?",
        qEn: "What resistance and loss does a winding of 10 turns of mean length 40 mm have at 0.2 Ω/m and 2 A?",
        modelUk: "Додаткові витки зменшують приріст індукції, але подовжують провід. Довжина проводу тут є числом витків, помноженим на середню довжину витка. Опір є цією довжиною, помноженою на опір одного метра. Втрати міді I²·R ростуть з квадратом струму і лінійно з числом витків, якщо переріз проводу не змінили. Подвоєння витків у цьому прикладі зрізає індукцію з 0,3 Тл до 0,15 Тл і водночас подвоює опір. Вікно осердя може не прийняти довший провід того самого перерізу: тоді переріз зменшують, і опір росте ще сильніше. Цей урок лишає переріз сталим і рахує лише довжину.",
        modelEn: "Extra turns reduce the flux-density step, but they lengthen the wire. The wire length here is the turn count times the mean length of one turn. Resistance is that length times the resistance of one metre. Copper loss I²·R grows with the square of current and linearly with the turn count when the wire cross-section is left unchanged. Doubling the turns in this example cuts the flux density from 0.3 T to 0.15 T and at the same time doubles the resistance. The core window may refuse a longer wire of the same cross-section: the cross-section is then reduced, and the resistance rises further. This lesson keeps the cross-section fixed and counts only the length.",
        exUk: `Довжина проводу 0,4 м, опір ${fmt(rCu)} Ом, втрати при 2 А ${fmt(pCu)} Вт. При 20 витках індукція ${fmt(bHalfTurns)} Тл, опір ${fmt(rDoubleN)} Ом, втрати при тому самому струмі ${fmt(pDoubleN)} Вт.`,
        exEn: `The wire length is 0.4 m, the resistance is ${fmt(rCu)} Ω, and the loss at 2 A is ${fmt(pCu)} W. At 20 turns the flux density is ${fmt(bHalfTurns)} T, the resistance is ${fmt(rDoubleN)} Ω, and the loss at the same current is ${fmt(pDoubleN)} W.`,
        checkUk: "10·0,04·0,2 = 0,08 Ом. 2²·0,08 = 0,32 Вт. Подвоєні витки дають 0,16 Ом і 0,64 Вт.",
        checkEn: "10·0.04·0.2 = 0.08 Ω. 2²·0.08 = 0.32 W. Twice the turns give 0.16 Ω and 0.64 W.",
        errUk: "Помилка — додавати витки лише як спосіб зменшити індукцію і не перерахувати I²·R.",
        errEn: "The mistake is to add turns only as a way to reduce flux density and not recompute I²·R.",
        limUk: "0,2 Ом/м є опір на постійному струмі для цього перерізу в умові задачі. На 100 кГц глибина скін-шару міді близько 0,2 мм, і товщий провід має вищий опір на змінному струмі, ніж це число.",
        limEn: "0.2 Ω/m is the DC resistance of this cross-section in the problem statement. At 100 kHz the skin depth of copper is about 0.2 mm, and a thicker wire has a higher AC resistance than this figure.",
        nums: [
          num(rCu, "ohm", "Опір 10 витків по 40 мм при 0,2 Ом/м, в омах?", "Resistance of 10 turns of 40 mm at 0.2 Ω/m, in ohms?"),
          num(pCu, "W", "Втрати міді при струмі 2 А, у ватах?", "Copper loss at 2 A, in watts?"),
        ],
        mcq: {
          uk: "Подвоєння витків при тому самому перерізі проводу…",
          en: "Doubling the turns at the same wire cross-section…",
          optionsUk: ["зменшує приріст індукції і збільшує опір", "зменшує і індукцію, і опір", "не чіпає довжину проводу", "скасовує втрати I²R"],
          optionsEn: ["reduces the flux-density step and raises the resistance", "reduces both flux density and resistance", "does not change the wire length", "cancels I²R loss"],
          correct: 0,
        },
      }),
      L({
        d: 4,
        titleUk: "Перевищення температури",
        titleEn: "Temperature rise",
        tokenUk: "перевищення",
        tokenEn: "rise",
        qUk: "На скільки кельвінів підніметься температура вузла при втратах 0,32 Вт і тепловому опорі 40 К/Вт, і на скільки при струмі 4 А?",
        qEn: "By how many kelvin does the node rise at a loss of 0.32 W and a thermal resistance of 40 K/W, and by how many at 4 A?",
        modelUk: "Тепловий опір Rth у цій задачі заданий для шляху від гарячої точки вузла до навколишнього повітря: 40 К/Вт. Перевищення є добутком потужності втрат на цей опір: ΔT = P·Rth. Воно не є абсолютною температурою. Абсолютна оцінка додає температуру повітря, і лише тоді, коли весь тепловий потік справді йде через цей один опір. Струм 4 А замість 2 А піднімає втрати міді вчетверо, бо потужність залежить від квадрата струму. Ділити потужність на тепловий опір — це перевернути формулу.",
        modelEn: "The thermal resistance Rth in this problem is given for the path from the hot spot of the assembly to the surrounding air: 40 K/W. The rise is the loss times that resistance: ΔT = P·Rth. It is not an absolute temperature. An absolute estimate adds the air temperature, and only when the whole heat flow really takes that one resistance. A current of 4 A instead of 2 A multiplies the copper loss by four, because the power depends on the square of the current. Dividing power by thermal resistance inverts the formula.",
        exUk: `При 0,32 Вт перевищення ${fmt(dT)} К. При 4 А втрати міді ${fmt(pCu4)} Вт і перевищення ${fmt(dT4)} К. Якщо повітря має 40 °C, гаряча точка від самих цих втрат міді була б 40+12,8 = 52,8 °C. Втрати осердя в ці 12,8 К ще не входять.`,
        exEn: `At 0.32 W the rise is ${fmt(dT)} K. At 4 A the copper loss is ${fmt(pCu4)} W and the rise is ${fmt(dT4)} K. If the air is at 40 °C, the hot spot from this copper loss alone would be 40+12.8 = 52.8 °C. Core loss is not inside those 12.8 K yet.`,
        checkUk: "0,32·40 = 12,8. Струм удвічі більший дає вчетверо більші втрати: 1,28·40 = 51,2.",
        checkEn: "0.32·40 = 12.8. Twice the current gives four times the loss: 1.28·40 = 51.2.",
        errUk: "Помилка — назвати 12,8 К абсолютною температурою або поділити 0,32 Вт на 40 і отримати частку кельвіна.",
        errEn: "The mistake is to call 12.8 K an absolute temperature, or to divide 0.32 W by 40 and get a fraction of a kelvin.",
        limUk: "40 К/Вт є числом умови, а не виміром названого радіатора. Якщо частина тепла йде в плату іншим шляхом, один опір завищує перевищення. Інтервал у кельвінах і інтервал у градусах Цельсія тут однакові за розміром.",
        limEn: "40 K/W is a number from the problem, not a measurement of a named heatsink. If some heat leaves through the board by another path, one resistance overstates the rise. An interval in kelvin and an interval in degrees Celsius have the same size here.",
        nums: [
          num(dT, "K", "Перевищення при 0,32 Вт і 40 К/Вт, у кельвінах?", "Rise at 0.32 W and 40 K/W, in kelvin?"),
          num(dT4, "K", "Перевищення від втрат міді при струмі 4 А і тому самому опорі, у кельвінах?", "Rise from the copper loss at 4 A and the same resistance, in kelvin?"),
        ],
        mcq: {
          uk: "ΔT = P·Rth є…",
          en: "ΔT = P·Rth is…",
          optionsUk: ["перевищенням над навколишнім повітрям", "абсолютною температурою в кельвінах від абсолютного нуля без додавання повітря", "напругою на обмотці", "індукцією осердя"],
          optionsEn: ["a rise above the surrounding air", "the absolute temperature in kelvin from absolute zero with no air added", "the voltage on the winding", "the flux density of the core"],
          correct: 0,
        },
      }),
      L({
        d: 4,
        titleUk: "Втрати осердя додають окремо",
        titleEn: "Core loss is added separately",
        tokenUk: "осердя",
        tokenEn: "core",
        qUk: "Які повні втрати і яке перевищення, якщо до 0,32 Вт міді умова задачі додає 0,40 Вт осердя?",
        qEn: "What is the total loss and the rise when the problem adds 0.40 W of core loss to 0.32 W of copper?",
        modelUk: "Втрати осердя не випливають з I²·R. Їх задає зміна індукції, частота і матеріал. У цій задачі число 0,40 Вт просто дано для робочої точки 0,3 Тл і 100 кГц. Його не треба виводити зі степеневої формули і не треба вважати рядком каталогу. Повні втрати є сумою міді й осердя. Перевищення рахують уже від суми, тим самим тепловим опором. Глибина скін-шару нагадує іншу діру в обліку міді: при σ = 5,8·10⁷ См/м і μ0 глибина на 100 кГц близька до 0,21 мм. Якщо радіус проводу більший, опір на постійному струмі занижує втрати, і навіть сума 0,72 Вт є неповною.",
        modelEn: "Core loss does not follow from I²·R. It is set by the flux-density swing, the frequency, and the material. In this problem the figure 0.40 W is simply given for the point 0.3 T and 100 kHz. It is not to be derived from a power law and it is not a catalog line. The total loss is the sum of copper and core. The rise is then computed from that sum, with the same thermal resistance. Skin depth points at another hole in the copper account: at σ = 5.8·10⁷ S/m and μ0 the depth at 100 kHz is near 0.21 mm. If the wire radius is larger, the DC resistance understates the loss, and even the sum 0.72 W is incomplete.",
        exUk: `Сума ${fmt(pTot)} Вт. Перевищення ${fmt(dTtot)} К. Глибина скін-шару ${fmt(skin)} м. Поки провід тонший за цю глибину, опір постійного струму ще близький до опору на цій частоті.`,
        exEn: `The sum is ${fmt(pTot)} W. The rise is ${fmt(dTtot)} K. The skin depth is ${fmt(skin)} m. While the wire is thinner than this depth, the DC resistance is still close to the resistance at this frequency.`,
        checkUk: "0,32+0,40 = 0,72. 0,72·40 = 28,8. Сума більша за одні лише втрати міді, тож 12,8 К було неповною відповіддю про нагрів.",
        checkEn: "0.32+0.40 = 0.72. 0.72·40 = 28.8. The sum is larger than the copper loss alone, so 12.8 K was an incomplete answer about heating.",
        errUk: "Помилка — зупинити тепловий рахунок на втратах міді і сказати, що осердя не гріється, бо його опір постійному струму нескінченний.",
        errEn: "The mistake is to stop the thermal account at the copper loss and say the core does not heat because its DC resistance is infinite.",
        limUk: "0,40 Вт не масштабують на іншу індукцію без нової умови. Скін-шар пораховано для рівномірної міді і не включає ефект близькості сусідніх витків, який додає втрати ще раз.",
        limEn: "0.40 W is not scaled to another flux density without a new statement. The skin depth is computed for uniform copper and does not include the proximity effect of neighbouring turns, which adds loss again.",
        nums: [
          num(pTot, "W", "Сума втрат міді 0,32 Вт і осердя 0,40 Вт, у ватах?", "Sum of 0.32 W copper loss and 0.40 W core loss, in watts?"),
          num(dTtot, "K", "Перевищення від цієї суми при 40 К/Вт, у кельвінах?", "Rise from that sum at 40 K/W, in kelvin?"),
        ],
        mcq: {
          uk: "Втрати осердя в цьому уроці…",
          en: "The core loss in this lesson…",
          optionsUk: ["додають до I²R як окреме дане число", "дорівнюють нулю, бо ферит ізолює", "вже сидять усередині 0,32 Вт", "скасовують тепловий опір"],
          optionsEn: ["are added to I²R as a separate given number", "equal zero, because ferrite insulates", "already sit inside the 0.32 W", "cancel the thermal resistance"],
          correct: 0,
        },
      }),
      L({
        d: 4,
        titleUk: "Насичення за струмом",
        titleEn: "Saturation as a current limit",
        tokenUk: "насичення",
        tokenEn: "saturation",
        qUk: "Який пік струму при середньому 1,2 А і розмаху 0,4 А, і який пік буде, якщо індуктивність упаде вдвічі?",
        qEn: "What is the current peak at an average of 1.2 A and a ripple of 0.4 A, and what peak appears if the inductance falls by half?",
        modelUk: "Перевірка вольт-секунд дала 0,3 Тл змінного розмаху. Вона не назвала струм. Котушка із зазором у силовому каскаді має окрему межу: струм насичення, після якого індуктивність різко падає. Умова задачі дає цю межу 1,5 А. Пік трикутника є середнім струмом плюс половина розмаху. Якщо пік нижче межі, лінійний трикутник ще сумісний із заявленою індуктивністю. Якщо через насичення індуктивність падає вдвічі, розмах подвоюється і новий пік може перетнути межу. Тоді вихідний трикутник уже не є доказом, що деталь лишилась лінійною.",
        modelEn: "The volt-second check gave a 0.3 T alternating swing. It did not name a current. A gapped coil in a power stage has a separate limit: the saturation current, past which the inductance falls sharply. The problem states that limit as 1.5 A. The crest of the triangle is the average current plus half the ripple. If the crest is below the limit, the linear triangle is still compatible with the stated inductance. If saturation drops the inductance by half, the ripple doubles and the new crest can cross the limit. The original triangle is then no longer evidence that the part stayed linear.",
        exUk: `Пік ${fmt(iPk)} А, запас до 1,5 А є ${fmt(iSat - iPk)} А. При половині індуктивності розмах 0,8 А і пік ${fmt(iPkHalf)} А, уже вище за 1,5 А. Змінна індукція 0,3 Тл при цьому могла змінитися мало: її задають вольт-секунди, а не середній струм.`,
        exEn: `The crest is ${fmt(iPk)} A, and the margin to 1.5 A is ${fmt(iSat - iPk)} A. At half the inductance the ripple is 0.8 A and the crest is ${fmt(iPkHalf)} A, already above 1.5 A. The 0.3 T alternating density may have changed little: volt-seconds set it, not the average current.`,
        checkUk: "1,2 + 0,4/2 = 1,4, і 1,5 − 1,4 = 0,1. При подвійному розмаху 1,2 + 0,4 = 1,6.",
        checkEn: "1.2 + 0.4/2 = 1.4, and 1.5 − 1.4 = 0.1. With the ripple doubled, 1.2 + 0.4 = 1.6.",
        errUk: "Помилка — вважати деталь ненасиченою, бо 0,3 Тл менше за 0,35 Тл, і не порівняти пік струму з межею 1,5 А.",
        errEn: "The mistake is to call the part unsaturated because 0.3 T is below 0.35 T, and not to compare the current crest with the 1.5 A limit.",
        limUk: "Межа 1,5 А є умовою задачі для цієї деталі із зазором. Вона не є загальною властивістю фериту і не виводиться з B = 0,3 Тл. Падіння індуктивності вдвічі взяте як ілюстрація, а не як виміряна крива.",
        limEn: "The 1.5 A limit is a condition of the problem for this gapped part. It is not a general property of ferrite and it is not derived from B = 0.3 T. The fall of inductance by half is an illustration, not a measured curve.",
        nums: [
          num(iPk, "A", "Пік струму при середньому 1,2 А і розмаху 0,4 А, в амперах?", "Current crest at an average of 1.2 A and a ripple of 0.4 A, in amperes?"),
          num(iPkHalf, "A", "Пік, якщо розмах подвоївся через падіння індуктивності вдвічі, в амперах?", "Crest if the ripple doubled because the inductance fell by half, in amperes?"),
        ],
        mcq: {
          uk: "Вольт-секундна індукція і струм насичення…",
          en: "Volt-second flux density and saturation current…",
          optionsUk: ["є двома різними перевірками", "завжди дають одне й те саме число", "скасовують одна одну", "замінюють розрахунок втрат міді"],
          optionsEn: ["are two different checks", "always give the same number", "cancel each other", "replace the copper-loss calculation"],
          correct: 0,
        },
      }),
    ],
    examA: [
      n((24 * 5e-6) / (10 * 20e-6), "T", "Індукція при 24 В, 5 мкс, 10 витках і Ae = 20·10⁻⁶ м², у теслах?", "Flux density at 24 V, 5 µs, 10 turns, and Ae = 20·10⁻⁶ m², in tesla?"),
      n(0.6 * 20e-6, "Wb", "Потік при індукції 0,6 Тл і тій самій площі, у веберах?", "Flux at 0.6 T and that same area, in webers?"),
      n(20 * 0.04 * 0.2, "ohm", "Опір 20 витків по 40 мм при 0,2 Ом/м, в омах?", "Resistance of 20 turns of 40 mm at 0.2 Ω/m, in ohms?"),
      n(3 * 3 * 0.1, "W", "Втрати міді при 3 А і опорі 0,1 Ом, у ватах?", "Copper loss at 3 A and 0.1 Ω, in watts?"),
      n(0.9 * 25, "K", "Перевищення при 0,9 Вт і 25 К/Вт, у кельвінах?", "Rise at 0.9 W and 25 K/W, in kelvin?"),
      n(2 + 0.5 / 2, "A", "Пік при середньому струмі 2 А і розмаху 0,5 А, в амперах?", "Crest at an average current of 2 A and a ripple of 0.5 A, in amperes?"),
      q("Площу 20 мм² у формулі індукції підставляють…", "An area of 20 mm² enters the flux-density formula…", ["як 20·10⁻⁶ м²", "як 20 м²", "як 20 Тл", "вона не потрібна"], ["as 20·10⁻⁶ m²", "as 20 m²", "as 20 T", "it is not needed"]),
      q("Додаткові витки при тому самому перерізі…", "Extra turns at the same cross-section…", ["ріжуть приріст індукції і піднімають I²R", "ріжуть і індукцію, і втрати міді завжди", "не змінюють довжину", "прибирають потребу в тепловому опорі"], ["cut the flux-density step and raise I²R", "always cut both flux density and copper loss", "do not change the length", "remove the need for a thermal resistance"]),
      q("12,8 К у прикладі уроку є…", "The 12.8 K of the lesson example is…", ["перевищенням, а не температурою повітря", "температурою повітря", "індукцією", "струмом насичення"], ["a rise, not the air temperature", "the air temperature", "a flux density", "the saturation current"]),
      q("Межа 1,5 А…", "The 1.5 A limit…", ["не виводиться з одного лише значення 0,3 Тл", "дорівнює 0,3 А", "скасовує розмах струму", "є тепловим опором"], ["is not derived from the value 0.3 T alone", "equals 0.3 A", "cancels the current ripple", "is the thermal resistance"]),
    ],
    examB: [
      n(bHalfTurns, "T", "Індукція урочного імпульсу 12 В і 5 мкс, якщо витків стало 20, у теслах?", "Flux density of the lesson pulse of 12 V and 5 µs when the turns become 20, in tesla?"),
      n(skin, "m", "Глибина скін-шару міді на 100 кГц при σ = 5,8·10⁷ См/м, у метрах?", "Skin depth of copper at 100 kHz with σ = 5.8·10⁷ S/m, in metres?"),
      n(0.5 + 0.2, "W", "Сума втрат міді 0,5 Вт і осердя 0,2 Вт, у ватах?", "Sum of 0.5 W copper loss and 0.2 W core loss, in watts?"),
      n(0.7 * 40, "K", "Перевищення від 0,7 Вт при 40 К/Вт, у кельвінах?", "Rise from 0.7 W at 40 K/W, in kelvin?"),
      n(0.8 + 0.3 / 2, "A", "Пік при середньому 0,8 А і розмаху 0,3 А, в амперах?", "Crest at an average of 0.8 A and a ripple of 0.3 A, in amperes?"),
      n(0.5 * 220e-6 * 1.4 * 1.4, "J", "Енергія котушки 220 мкГн при струмі 1,4 А, у джоулях?", "Energy of a 220 µH coil at 1.4 A, in joules?"),
      q("Глибина скін-шару менша за радіус проводу означає, що…", "A skin depth smaller than the wire radius means that…", ["опір на змінному струмі вищий за опір на постійному", "втрати міді зникають", "осердя не гріється", "індукція подвоюється"], ["the AC resistance is higher than the DC resistance", "copper loss disappears", "the core does not heat", "the flux density doubles"]),
      q("Число 0,40 Вт втрат осердя в уроці…", "The 0.40 W core-loss figure in the lesson…", ["дане умовою задачі, а не виміряне з каталогу в цьому тексті", "виведене з I²R", "є тепловим опором", "дорівнює потоку у веберах"], ["is given by the problem, not measured from a catalog in this text", "is derived from I²R", "is the thermal resistance", "equals the flux in webers"]),
      q("Падіння індуктивності вдвічі при тому самому середньому струмі…", "A fall of inductance by half at the same average current…", ["піднімає пік трикутника", "зменшує розмах", "не чіпає пік", "скасовує вольт-секунди як окрему перевірку"], ["raises the crest of the triangle", "reduces the ripple", "does not touch the crest", "cancels volt-seconds as a separate check"]),
      q("B = V·t_on/(N·Ae) не замінює перевірку Isat, бо…", "B = V·t_on/(N·Ae) does not replace an Isat check, because…", ["струм зміщення в цю формулу не входить", "вони завжди чисельно рівні", "Isat вимірюють у теслах", "тепловий опір уже містить струм"], ["bias current does not enter that formula", "they are always numerically equal", "Isat is measured in tesla", "thermal resistance already contains the current"]),
    ],
  }),
];
