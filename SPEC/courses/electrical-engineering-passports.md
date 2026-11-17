# Electrical engineering module passports

These passports are the authored version-2 programme. Lesson prose in `packages/content/src/electrical-engineering/` is the student-facing text. Numbers below are the same worked examples.

### ee-10 `ee-10-kirchhoff-laws`

- Titles: Закони Кірхгофа / Kirchhoff's laws
- Prerequisites: Вузол, вітка, контур, струм і напруга зі знаком. / Node, branch, loop, and signed current and voltage.
- Lesson topics:
1. Баланс струмів у вузлі / Current balance at a node
2. Баланс напруг контуру / Voltage balance around a loop
3. Знак потужності / The sign of power
4. Баланс потужності кола / Power balance of a circuit
5. Вузол із трьома відомими стрілками / A node with three known arrows
- Observable results: Учень записує баланс струмів вузла, баланс напруг контуру і зводить його з балансом потужності. / The learner writes a node current balance, a loop voltage balance, and ties both to the power balance.
- Formula and model limit: Сума струмів у вузлі дорівнює нулю. Сума напруг уздовж контуру дорівнює нулю. Потужність джерела, що віддає, додатна в балансі віддачі. / The sum of currents at a node is zero. The sum of voltages around a loop is zero. Power delivered by a source is positive on the delivery side of the balance.
- Worked example: Входить 0.05 А, одна вітка забирає 0.02 А. Третя вітка забирає 0.03 А. Сума виходів 0.05 А дорівнює входу.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — додати модулі всіх стрілок без рішення, які входять, а які виходять.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-11 `ee-11-nodal-analysis`

- Titles: Вузлові напруги / Node voltages
- Prerequisites: Закон Ома, перший закон Кірхгофа, провідність як 1/R. / Ohm's law, Kirchhoff's current law, and conductance as 1/R.
- Lesson topics:
1. Один вузол між двома джерелами / One node between two sources
2. Дільник як вузлове рівняння / A divider written as a node equation
3. Рівняння в провідностях / The equation in conductances
4. Два невідомі вузли / Two unknown nodes
5. Перевірка розв'язку потужністю / Checking the solution with power
- Observable results: Учень обирає опорний вузол, пише рівняння струмів через невідомі напруги і перевіряє розв'язок балансом потужності. / The learner picks a reference node, writes current equations in the unknown voltages, and checks the solution with a power balance.
- Formula and model limit: Струм резистора між вузлами a і b є (Va−Vb)/R. Сума таких струмів у вузлі нульова. / The resistor current between nodes a and b is (Va−Vb)/R. The sum of those currents at a node is zero.
- Worked example: (V−10) + V + (V−5) = 0, бо кожен опір 1000 Ом. 3V = 15, V = 5 В. Струм від джерела 10 В дорівнює 0.005 А.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — усереднити 10 В і 5 В без третього резистора в нуль і отримати 7,5 В.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-12 `ee-12-mesh-thevenin-norton`

- Titles: Тевенен, Нортон і суперпозиція / Thévenin, Norton, and superposition
- Prerequisites: Дільник, паралель опорів і баланс одного вузла. / The divider, parallel resistance, and a single-node balance.
- Lesson topics:
1. Напруга і опір Тевенена / Thévenin voltage and resistance
2. Навантаження на еквівалент / A load on the equivalent
3. Джерело струму Нортона / The Norton current source
4. Суперпозиція двох джерел / Superposition of two sources
5. Підміна готовим джерелом виходу / Substituting a ready-made output source
- Observable results: Учень замінює лінійне коло еквівалентом, навантажує його і відрізняє справжню схему від ідеального джерела готової напруги. / The learner replaces a linear circuit by an equivalent, loads it, and tells the real network from an ideal source of the desired voltage.
- Formula and model limit: Vth — напруга холостого ходу. Rth — опір з боку клем при вимкнених незалежних джерелах. In = Vth/Rth. / Vth is the open-circuit voltage. Rth is the resistance seen at the terminals with independent sources deactivated. In = Vth/Rth.
- Worked example: Холостий хід 10·3/5 = 6 В. Rth = 2000 паралельно 3000 = 1200 Ом. Еквівалент — 6 В послідовно з 1200 Ом.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — взяти Rth як суму 2 кОм і 3 кОм, залишивши джерело ввімкненим у розрахунку опору.
- Laboratory: Урок 1 вимірює холостий хід дільника 10 В, 2 кОм і 3 кОм: вузол out має дати Vth = 6 В. / Lesson 1 measures the open circuit of the 10 V, 2 kΩ, 3 kΩ divider: node out must read Vth = 6 V.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-13 `ee-13-real-resistors`

- Titles: Реальний резистор / A real resistor
- Prerequisites: Закон Ома, потужність і префікси одиниць. / Ohm's law, power, and unit prefixes.
- Lesson topics:
1. Допуск номіналу / Tolerance of the nominal value
2. Зсув від температури / Shift with temperature
3. Межа за потужністю / The power limit
4. Повзунок без навантаження / An unloaded wiper
5. Два проводи щупа / Two probe leads
- Observable results: Учень рахує допуск, температурний зсув, границю за потужністю і помилку двопровідного виміру малого опору. / The learner calculates tolerance, a temperature shift, the power limit, and the error of a two-wire measurement of a small resistance.
- Formula and model limit: R(T) = R0(1+αΔT). Imax = sqrt(Pном/R). Два провідники щупа додаються до показу. / R(T) = R0(1+αΔT). Imax = sqrt(Prated/R). The two probe leads add to the reading.
- Worked example: П'ять відсотків від 1000 Ом — це 50 Ом. Нижня межа 950 Ом, верхня 1050 Ом.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — додати 5 Ом замість 5 відсотків або вважати допуск випадковим виміром одного дня.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-14 `ee-14-capacitors-dielectrics`

- Titles: Конденсатор і енергія поля / The capacitor and field energy
- Prerequisites: Заряд, напруга і паралельне з'єднання двох опорів як зразок паралелі. / Charge, voltage, and the parallel connection of two resistors as a picture of a parallel join.
- Lesson topics:
1. Заряд на обкладках / Charge on the plates
2. Енергія електричного поля / Energy of the electric field
3. Послідовно і паралельно / Series and parallel
4. Діелектрик між пластинами / A dielectric between the plates
5. Напруга не стрибає / Voltage does not jump
- Observable results: Учень рахує заряд і енергію, згортає послідовні й паралельні ємності і бачить, що діелектрик збільшує ємність. / The learner calculates charge and energy, reduces series and parallel capacitances, and sees that a dielectric increases capacitance.
- Formula and model limit: Q = CU. Енергія = CU²/2. Послідовні ємності згортають як паралельні опори. Паралельні ємності додають. / Q = CU. Energy = CU²/2. Series capacitances reduce like parallel resistors. Parallel capacitances add.
- Worked example: C = 100·10⁻⁶ Ф, U = 10 В. Q = 0.001 Кл. Це 1 мКл на одній обкладці і −1 мКл на іншій.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — скласти заряди двох обкладок як 0,002 Кл і сказати, що конденсатор накопичив саме стільки сумарного заряду.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-15 `ee-15-inductors-magnetic`

- Titles: Котушка і магнітний потік / The inductor and magnetic flux
- Prerequisites: Напруга, струм і енергія конденсатора як паралель до енергії котушки. / Voltage, current, and capacitor energy as the parallel of inductor energy.
- Lesson topics:
1. Напруга самоіндукції / Self-induced voltage
2. Енергія струму / Energy of the current
3. Струм не стрибає / Current does not jump
4. Взаємна індуктивність / Mutual inductance
5. З'єднання котушок / Connecting inductors
- Observable results: Учень рахує напругу самоіндукції, енергію струму, взаємну індуктивність і з'єднання котушок. / The learner calculates self-induced voltage, the energy of a current, mutual inductance, and inductor connections.
- Formula and model limit: u = L di/dt. Енергія = LI²/2. Послідовно з підмагнічуванням L = L1+L2+2M. / u = L di/dt. Energy = LI²/2. Series aiding, L = L1+L2+2M.
- Worked example: di/dt = 2/0,01 = 200 А/с. u = 0,2·200 = 40 В.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — помножити L на струм 2 А і назвати це напругою, ніби котушка є резистором.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-16 `ee-16-math-transients`

- Titles: Експонента в рівнянні кола / The exponential in a circuit equation
- Prerequisites: Напруга, струм і запис степеня. Похідна тут уводиться на експоненті, до RC. / Voltage, current, and the writing of a power. The derivative is introduced on the exponential, before the RC circuit.
- Lesson topics:
1. Що означає e у степені / What e to a power means
2. Постійна часу як масштаб / The time constant as a scale
3. Похідна на старті / The derivative at the start
4. Площа під сталою / Area under a constant
5. Час до одного відсотка / Time down to one percent
- Observable results: Учень читає e^{−t/τ}, рахує значення при t = τ, час спаду до 1% і похідну в нулі. / The learner reads e^{−t/τ}, computes the value at t = τ, the time to fall to 1%, and the derivative at zero.
- Formula and model limit: e^0 = 1. e^{−1} ≈ 0,3679. Час до 1% є τ·ln(100). Похідна e^{−t/τ} у нулі дорівнює −1/τ. / e^0 = 1. e^{−1} ≈ 0.3679. The time to 1% is τ·ln(100). The derivative of e^{−t/τ} at zero is −1/τ.
- Worked example: e^0 = 1. e^{−1} = 0.367879. П'ять вольт, помножені на цей спад, дають 1.839397 В.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — вважати e^{−1} нулем або одиницею. За одну постійну процес не закінчений і не стоїть на місці.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-17 `ee-17-rc-rl-transients`

- Titles: Перехідні RC і RL / RC and RL transients
- Prerequisites: Експонента, неперервність напруги конденсатора і струму котушки. / The exponential, continuity of capacitor voltage, and continuity of inductor current.
- Lesson topics:
1. Постійна RC / The RC time constant
2. Розряд через резистор / Discharge through a resistor
3. Початкова напруга не нуль / A starting voltage that is not zero
4. Коло RL від нуля / An RL circuit from zero
5. Енергія, яку забрав резистор / Energy taken by the resistor
- Observable results: Учень рахує τ, напругу заряджання і розряджання RC та струм RL у момент t = τ. / The learner calculates τ, the charge and discharge voltage of an RC, and the RL current at t = τ.
- Formula and model limit: τ_RC = RC. τ_RL = L/R. Заряд  U(1−e^{−t/τ}). Розряд U0·e^{−t/τ}. Струм RL: I∞(1−e^{−t/τ}) від нуля. / τ_RC = RC. τ_RL = L/R. Charge: U(1−e^{−t/τ}). Discharge: U0·e^{−t/τ}. RL current from zero: I∞(1−e^{−t/τ}).
- Worked example: R = 10 кОм, C = 100 мкФ, τ = 1 с. При t = 1 с напруга 3.160603 В.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — поставити в кінці першої секунди вже 5 В або порахувати τ як R/C.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-18 `ee-18-rlc-second-order`

- Titles: Коливальний контур / The resonant transient
- Prerequisites: Експонента RC, енергія конденсатора і котушки. / The RC exponential and the energy of a capacitor and an inductor.
- Lesson topics:
1. Власна частота / Natural frequency
2. Затухання і три режими / Damping and three regimes
3. Частота кільця / The ring frequency
4. Межа без кільця / The boundary with no ring
5. Обмін енергією / The exchange of energy
- Observable results: Учень відрізняє коливальний, критичний і аперіодичний режим, рахує ω0, α і частоту обвідної. / The learner distinguishes underdamped, critical, and overdamped behaviour and calculates ω0, α, and the ring frequency.
- Formula and model limit: ω0 = 1/sqrt(LC). α = R/(2L) для послідовного RLC. Коливання, коли α < ω0. Частота кільця ωd = sqrt(ω0²−α²). / ω0 = 1/sqrt(LC). For a series RLC, α = R/(2L). Ringing when α < ω0. The ring frequency is ωd = sqrt(ω0²−α²).
- Worked example: LC = 10⁻⁸. sqrt(LC) = 10⁻⁴. ω0 = 10000 рад/с.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — підставити R у формулу ω0 або назвати радіани за секунду герцами без 2π.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-19 `ee-19-ac-sine-rms`

- Titles: Синусоїда і діюче значення / The sine wave and the RMS value
- Prerequisites: Напруга постійного кола і квадрат у формулі потужності. / DC voltage and the square in the power formula.
- Lesson topics:
1. Період і частота / Period and frequency
2. Амплітуда і розмах / Amplitude and peak-to-peak
3. Середнє за період / The average over a period
4. Діюче значення / The RMS value
5. Зсув фази / A phase shift
- Observable results: Учень відрізняє амплітуду, розмах, середнє і діюче значення та рахує період із частоти. / The learner distinguishes amplitude, peak-to-peak, average, and RMS, and computes the period from the frequency.
- Formula and model limit: Vrms = Vp/sqrt(2) для синусоїди. Середнє за період дорівнює нулю. Розмах — це 2Vp. T = 1/f. / For a sine wave Vrms = Vp/sqrt(2). The average over a period is zero. Peak-to-peak is 2Vp. T = 1/f.
- Worked example: f = 50 Гц. T = 0.02 с. ω = 314.159265 рад/с.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — назвати періодом саму частоту 50 або записати ω = 50.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-20 `ee-20-complex-phasors`

- Titles: Комплексний запис / Complex notation
- Prerequisites: Синусоїда однієї частоти, теорема Піфагора і кут у градусах. / A sine of one frequency, Pythagoras, and an angle in degrees.
- Lesson topics:
1. Прямокутна форма / Rectangular form
2. Полярна форма / Polar form
3. Множення на j / Multiplication by j
4. Ділення і спряжене / Division and the conjugate
5. Одна стрілка, два записи / One arrow, two writings
- Observable results: Учень переводить 3+j4 у модуль і кут, множить на j як поворот і не плутає форми запису одного числа. / The learner converts 3+j4 into a magnitude and an angle, multiplies by j as a rotation, and does not confuse two writings of one number.
- Formula and model limit: Модуль sqrt(a²+b²). Кут atan2(b, a). Множення на j повертає на +90 градусів. Порівняння комплексних чисел іде за модулем різниці, не за формою запису. / The magnitude is sqrt(a²+b²). The angle is atan2(b, a). Multiplication by j rotates by +90 degrees. Complex numbers are compared by the magnitude of the difference, not by the written form.
- Worked example: 3 + j4 має модуль 5 і кут 53.130102 градусів. Запис 5∠53,13° є тим самим числом.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — додати 3 і 4 як 7 або вважати j одиницею струму.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-21 `ee-21-impedance-admittance`

- Titles: Комплексний опір / Complex impedance
- Prerequisites: Діюче значення, комплексний запис і закон Ома для сталих величин. / RMS, complex notation, and Ohm's law for steady quantities.
- Lesson topics:
1. Опір, індуктивність і ємність / Resistance, inductance, and capacitance
2. Послідовні 30 Ом і j40 Ом / 30 ohm in series with j40 ohm
3. Струм від напруги 10 В / Current from a 10 V source
4. Ємнісний опір на 50 Гц / Capacitive reactance at 50 Hz
5. Провідність / Admittance
- Observable results: Учень будує імпеданс R, L і C, ділить напругу на 30+j40 і читає модуль струму й фазу. / The learner builds the impedance of R, L, and C, divides a voltage by 30+j40, and reads the current magnitude and phase.
- Formula and model limit: Z_R = R. Z_L = jωL. Z_C = −j/(ωC). Струм I = U/Z. Модуль |U|/|Z|. / Z_R = R. Z_L = jωL. Z_C = −j/(ωC). The current is I = U/Z. The magnitude is |U|/|Z|.
- Worked example: 30 Ом → 30 + j0. Котушка 40 Ом → 0 + j40. Конденсатор 40 Ом → 0 − j40. Модуль кожного реактивного елемента 40 Ом.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — записати котушку як −jX або складати оми резистора з омами реактансу арифметично до множення на j.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-22 `ee-22-ac-circuit-analysis`

- Titles: Аналіз кіл змінного струму / AC circuit analysis
- Prerequisites: Імпеданс як комплексне число і правила послідовного та паралельного з'єднання. / Impedance as a complex number, and the series and parallel connection rules.
- Lesson topics:
1. Послідовне додавання імпедансів / Adding impedances in series
2. Комплексний дільник напруги / A complex voltage divider
3. Паралельне з'єднання / A parallel connection
4. Дільник струму / A current divider
5. Перевірка суми напруг / Checking the voltage sum
- Observable results: Учень додає імпеданси, ділить комплексну напругу і струм і перевіряє суму фазорів за законом Кірхгофа. / The learner adds impedances, divides a complex voltage and current, and checks a phasor sum with Kirchhoff's law.
- Formula and model limit: Послідовно Z додаються. Паралельно додаються провідності. Дільник: Vout = Vin·Z2/(Z1+Z2). Модуль суми не дорівнює сумі модулів. / Series impedances add. Parallel branches add as admittances. The divider is Vout = Vin·Z2/(Z1+Z2). The magnitude of a sum is not the sum of the magnitudes.
- Worked example: Z = 70+j10 Ом, |Z| = 70.710678 Ом. I = 10/Z = 0.14+j(-0.02) А, модуль 0.141421 А.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — скласти 50 Ом і 50 Ом у 100 Ом. Модулі двох комплексних доданків не є імпедансом кола.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-23 `ee-23-ac-power-factor`

- Titles: Потужність змінного струму і коефіцієнт потужності / AC power and power factor
- Prerequisites: Діючі значення і косинус кута між напругою та струмом. / RMS values and the cosine of the angle between voltage and current.
- Lesson topics:
1. Три сторони трикутника потужності / The three sides of the power triangle
2. Кут і знак реактивної потужності / Angle and the sign of reactive power
3. Компенсація до нового коефіцієнта / Compensation to a new factor
4. Ємність за реактивною потужністю / Capacitance from reactive power
5. Чисто активне і чисто реактивне навантаження / A purely real load and a purely reactive load
- Observable results: Учень розділяє активну, реактивну і повну потужність та обирає конденсатор компенсації до заданого коефіцієнта. / The learner separates real, reactive, and apparent power and selects a compensation capacitor for a stated power factor.
- Formula and model limit: P = V·I·cosφ, S = V·I, Q = V·I·sinφ. Конденсатор зменшує індуктивну реактивну потужність і не змінює активну. / P = V·I·cosφ, S = V·I, Q = V·I·sinφ. A capacitor reduces inductive reactive power and does not change the real power.
- Worked example: P = 120 Вт, S = 200 ВА, Q = 160 вар. Кут 53.130102°.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — назвати добуток 100·2 активною потужністю. Без косинуса кута це повна потужність.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-24 `ee-24-resonance-bode`

- Titles: Резонанс і діаграма Боде / Resonance and the Bode diagram
- Prerequisites: Реактанс котушки і конденсатора та десятковий логарифм відношення напруг. / Inductive and capacitive reactance, and the base-10 logarithm of a voltage ratio.
- Lesson topics:
1. Частота послідовного резонансу / Series resonant frequency
2. Добротність і напруга на котушці / Quality factor and the coil voltage
3. Смуга пропускання / Bandwidth
4. Модуль фільтра нижніх частот / Magnitude of a low-pass filter
5. Фаза на зрізі і за ним / Phase at cutoff and beyond
- Observable results: Учень знаходить індуктивність резонансу, добротність, смугу і читає спад фільтра нижніх частот у децибелах. / The learner finds the inductance for resonance, the quality factor, the bandwidth, and reads the roll-off of a low-pass filter in decibels.
- Formula and model limit: ω0 = 1/sqrt(L·C). Для послідовного контуру Q = ω0·L/R, смуга f0/Q. Для ланки RC |H| = 1/sqrt(1+(f/fc)²), 20·lg|H| дає дБ. / ω0 = 1/sqrt(L·C). For a series loop Q = ω0·L/R and the bandwidth is f0/Q. For an RC section |H| = 1/sqrt(1+(f/fc)²), and 20·log10|H| is the decibel value.
- Worked example: ω = 6283.185307 рад/с. L = 0.02533 Гн. Реактанс кожного накопичувача 159.154943 Ом.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — підставити 1000 Гц у формулу без 2π або вважати резонансом рівність L і C у їхніх одиницях.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-25 `ee-25-semiconductors-diodes`

- Titles: p–n-перехід і діод / The p–n junction and the diode
- Prerequisites: Закон Ома для резистора і знак напруги на елементі. / Ohm's law for a resistor and the sign of the voltage on an element.
- Lesson topics:
1. Що фіксує модель постійного спаду / What the constant-drop model fixes
2. Струм і потужність послідовного кола / Current and power in the series circuit
3. Два послідовні діоди / Two diodes in series
4. Зворотне ввімкнення / Reverse connection
5. Чутливість до прийнятого спаду / Sensitivity to the assumed drop
- Observable results: Учень рахує прямий струм діода з фіксованим спадом 0,7 В, розрізняє зворотний режим і бачить, наскільки результат чутливий до прийнятого спаду. / The learner computes the forward current of a diode with a fixed 0.7 V drop, separates the reverse regime, and sees how sensitive the result is to the assumed drop.
- Formula and model limit: У прямій моделі цього модуля Vd = 0,7 В, I = (Vs−Vd)/R. У зворотному напрямі ідеалізований струм дорівнює нулю до пробою. Потужність діода Vd·I. / In the forward model of this module Vd = 0.7 V and I = (Vs−Vd)/R. In reverse the idealised current is zero until breakdown. Diode power is Vd·I.
- Worked example: Діод і резистор 430 Ом живляться від 5 В. На резисторі лишається 4,3 В. Струм 0,01 А. На діоді лишається 0,7 В, а не 0 В і не 5 В.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — поділити всі 5 В на 430 Ом і отримати 0,0116 А, ніби діод є провідником без спаду.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-26 `ee-26-rectifiers-filters`

- Titles: Випрямлення і конденсатор фільтра / Rectification and the filter capacitor
- Prerequisites: Прямий спад діода, амплітуда синусоїди і період мережі. / The diode forward drop, the sine amplitude, and the mains period.
- Lesson topics:
1. Один діод / A single diode
2. Мостовий випрямляч / A bridge rectifier
3. Конденсатор і розмах пульсацій / The capacitor and the ripple
4. Зворотна напруга діода / The diode reverse voltage
5. Коли пік не досягається / When the peak is not reached
- Observable results: Учень відрізняє однопівперіодну схему від моста, оцінює пік, середнє і наближений розмах пульсацій конденсатора. / The learner distinguishes a half-wave rectifier from a bridge, and estimates the peak, the average, and the approximate capacitor ripple.
- Formula and model limit: Пік моста Vp−2·0,7. Пік одного діода Vp−0,7. Наближення пульсацій ΔV ≈ I/(f·C), де f — частота імпульсів заряджання, не обов'язково частота мережі. / The bridge peak is Vp−2·0.7. One diode peak is Vp−0.7. The ripple approximation is ΔV ≈ I/(f·C), where f is the recharge rate, not necessarily the mains frequency.
- Worked example: Vp = 10 В, пік виходу 9.3 В. При мережі 50 Гц імпульси йдуть 50 разів на секунду.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — зняти два спади там, де діод один, або залишити на виході знакозмінну синусоїду.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-27 `ee-27-zeners-linear-reg`

- Titles: Стабілітрон і межа лінійного стабілізатора / The Zener diode and the limit of a linear stabiliser
- Prerequisites: Прямий і зворотний режим діода та закон Ома для послідовного резистора. / Forward and reverse diode behaviour, and Ohm's law for a series resistor.
- Lesson topics:
1. Струм без навантаження / Current with no load
2. Поділ струму з навантаженням / Sharing current with a load
3. Найменший опір, який ще тримається / The smallest resistance that still holds
4. Коло, яке вже відпустило / A circuit that has already let go
5. Нагрів баласта і стабілітрона / Heating of the ballast and of the Zener
- Observable results: Учень рахує струм стабілітрона без навантаження і з навантаженням, знаходить межу опору навантаження і впізнає режим, де стабілітрон уже відпустив. / The learner computes the Zener current with and without a load, finds the load-resistance limit, and recognises the regime in which the Zener has already let go.
- Formula and model limit: Поки стабілітрон тримає Vz, Iz = (Vin−Vz)/Rs − Vz/RL. Якщо потрібний струм навантаження більший за (Vin−Vz)/Rs, модель жорсткої напруги Vz недійсна. / While the Zener holds Vz, Iz = (Vin−Vz)/Rs − Vz/RL. If the load current demanded exceeds (Vin−Vz)/Rs, the stiff-Vz model is no longer valid.
- Worked example: Iz = (12−5,1)/220 = 0.031364 А. Потужність 0.159955 Вт.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — поділити 12 В на 220 Ом і вважати, що на стабілітроні теж 12 В. Тоді це вже не режим стабілізації.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-28 `ee-28-bjt-circuits`

- Titles: Біполярний транзистор у активному режимі і в насиченні / The bipolar transistor in the active region and in saturation
- Prerequisites: Струм діода, спад 0,7 В і закон Кірхгофа для контуру колектора. / Diode current, the 0.7 V drop, and Kirchhoff's law around the collector loop.
- Lesson topics:
1. Струми трьох виводів / Currents of the three terminals
2. Напруга колектор-емітер / Collector-emitter voltage
3. Насичення і форсований β / Saturation and the forced beta
4. Потужність на кристалі / Power in the device
5. Відсічка / Cutoff
- Observable results: Учень знаходить струми з β, напругу Vce, межу насичення і потужність переходу. / The learner finds the currents from β, the voltage Vce, the saturation boundary, and the junction power.
- Formula and model limit: В активному режимі Ic = β·Ib, Ie = Ic+Ib, Vbe = 0,7 В. Насичення, коли форсований β менший за паспортний. Відсічка: Ib = 0, Ic = 0. / In the active region Ic = β·Ib, Ie = Ic+Ib, and Vbe = 0.7 V. Saturation is when the forced β is below the datasheet β. Cutoff: Ib = 0 and Ic = 0.
- Worked example: Ic = 0.002 А. Ie = 0.00202 А. Частка бази в струмі емітера лише 0.009901.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — записати Ie = Ic − Ib. Напрями виводів n-p-n у активному режимі складають базу з колектором в емітер.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-29 `ee-29-mosfet-switches`

- Titles: МДН-транзистор як ключ / The MOSFET as a switch
- Prerequisites: Поріг відкривання, закон Ома і потужність I²·R. / A threshold voltage, Ohm's law, and the power I²·R.
- Lesson topics:
1. Поріг і закритий ключ / Threshold and the off switch
2. Відкритий канал / The on channel
3. Заряд затвора / Gate charge
4. Два доданки втрат / Two loss terms
5. Напруга на закритому стоці / Voltage on an off drain
- Observable results: Учень відрізняє закритий ключ від відкритого, рахує спад і тепло каналу та окремо роботу кола затвора. / The learner separates an off switch from an on switch, computes the channel drop and heat, and treats the gate-drive work separately.
- Formula and model limit: У моделі ключа Id = 0, якщо Vgs < Vth. Якщо ключ відкритий, Vds = Id·Rds(on), P = Id²·Rds(on). Енергія затвора за цикл близько Qg·Vdrive. / In the switch model Id = 0 when Vgs < Vth. When the switch is on, Vds = Id·Rds(on) and P = Id²·Rds(on). The gate energy per cycle is about Qg·Vdrive.
- Worked example: Vgs = 2 В, Vth = 3 В. Id = 0. Якщо в стоці резистор до 12 В, напруга на ключі 12 В, а на резисторі 0 В.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — усе одно помножити струм навантаження на Rds(on), хоча затвор нижче порога і цей опір не підключений.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-30 `ee-30-opamp-foundations`

- Titles: Операційний підсилювач: підсилення, віртуальний нуль і насичення / The operational amplifier: gain, virtual ground, and saturation
- Prerequisites: Дільник напруги і знак струму в резисторі. / A voltage divider and the sign of the current in a resistor.
- Lesson topics:
1. Неінверсний коефіцієнт / Non-inverting gain
2. Інверсний вхід і віртуальний нуль / The inverting input and the virtual ground
3. Упирання в шину / Running into a rail
4. Струм, який вихід ще може віддати / Current the output can still deliver
5. Зсув, помножений на коефіцієнт / An offset multiplied by the gain
- Observable results: Учень рахує неінверсне і інверсне підсилення, струм у віртуальний нуль і упирання виходу в живлення. / The learner computes non-inverting and inverting gain, the current into a virtual ground, and an output that has run into the supply.
- Formula and model limit: Неінверсний коефіцієнт 1+Rf/Rg. Інверсний −Rf/Rin. Ідеальний вхідний струм нульовий. Вихід не виходить за межі прийнятих шин. / The non-inverting gain is 1+Rf/Rg. The inverting gain is −Rf/Rin. The ideal input current is zero. The output does not pass the assumed rails.
- Worked example: Коефіцієнт 100. Вихід 1 В.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — взяти лише Rf/Rg і загубити одиницю. Тоді вихід став би 0,99 В, а напруга на інверсному вході не збіглася б із прямою.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-31 `ee-31-filters-laplace`

- Titles: Фільтри першого порядку і смуга / First-order filters and bandwidth
- Prerequisites: Частота зрізу RC-ланки, децибел і середнє геометричне двох частот. / The cutoff of an RC section, the decibel, and the geometric mean of two frequencies.
- Lesson topics:
1. Нижні частоти на зрізі і за ним / Low-pass at cutoff and beyond
2. Верхні частоти / High-pass behaviour
3. Центр смуги / The centre of a band
4. Два однакових полюси / Two identical poles
5. Навантаження, яке зсуває полюс / A load that moves the pole
- Observable results: Учень читає модуль фільтра нижніх і верхніх частот, знаходить центр смуги і бачить нахил двох однакових полюсів. / The learner reads the magnitude of a low-pass and a high-pass filter, finds the centre of a band, and sees the slope of two identical poles.
- Formula and model limit: Для одиничного коефіцієнта на прохідній ділянці |Hнч| = 1/sqrt(1+(f/fc)²), |Hвч| = (f/fc)/sqrt(1+(f/fc)²). Центр смуги sqrt(fL·fH). / For unity gain in the pass band, |Hlow| = 1/sqrt(1+(f/fc)²) and |Hhigh| = (f/fc)/sqrt(1+(f/fc)²). The band centre is sqrt(fL·fH).
- Worked example: На fc модуль 0.707107. На 10·fc модуль 0.099504, або -20.043214 дБ.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — поставити модуль 0,5 на частоті зрізу. Поріг визначений як 1/sqrt(2) для напруги, а половина потужності якраз відповідає цьому модулю, не модулю 0,5.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-32 `ee-32-real-opamps`

- Titles: Реальний операційний підсилювач / A real operational amplifier
- Prerequisites: Ідеальний коефіцієнт, децибел і синусоїда з обмеженою швидкістю зростання. / Ideal gain, the decibel, and a sine wave with a limited rate of rise.
- Lesson topics:
1. Добуток підсилення на смугу / The gain-bandwidth product
2. Швидкість наростання / Slew rate
3. Струм зміщення на великому опорі / Bias current on a large resistance
4. Коефіцієнт придушення синфазного сигналу / Common-mode rejection
5. Яка межа спрацює першою / Which limit arrives first
- Observable results: Учень ділить добуток підсилення на смугу, оцінює межу швидкості наростання, струм зміщення і помилку синфазного сигналу. / The learner divides the gain-bandwidth product, estimates the slew-rate limit, the bias current, and the common-mode error.
- Formula and model limit: Для однополюсного підсилювача f−3дБ ≈ GBW/Gзамкн. Межа синусоїди f = SR/(2π·Vp). Помилка від струму зміщення Ib·R. Помилка синфазного сигналу ділиться на 10^(CMRR/20). / For a single-pole amplifier the closed-loop f−3dB is about GBW/Gclosed. The sine-wave limit is f = SR/(2π·Vp). The bias-current error is Ib·R. A common-mode error is divided by 10^(CMRR/20).
- Worked example: Смуга 10000 Гц. На 100 кГц той самий підсилювач уже не втримає коефіцієнт 100.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — лишити смугу 1 МГц при коефіцієнті 100. Мегагерц є добутком, а не готовою смугою будь-якого каскаду.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-33 `ee-33-comparators-timers`

- Titles: Компаратор, гістерезис і таймер / A comparator, hysteresis, and a timer
- Prerequisites: Поріг напруги, заряд конденсатора і період як сума двох інтервалів. / A voltage threshold, the charge of a capacitor, and a period as the sum of two intervals.
- Lesson topics:
1. Один поріг / A single threshold
2. Два пороги гістерезису / The two thresholds of hysteresis
3. Верхній інтервал таймера / The high interval of the timer
4. Період і шпаруватість / Period and duty
5. Зв'язок із шумом компаратора / The link with comparator noise
- Observable results: Учень відрізняє однопороговий компаратор від тригера Шмітта і рахує період автоколивального таймера з двома резисторами. / The learner distinguishes a single-threshold comparator from a Schmitt trigger and computes the period of an astable timer with two resistors.
- Formula and model limit: Без гістерезису рішення залежить лише від порівняння з одним порогом. Із гістерезисом є верхній і нижній пороги. Для таймера Thigh = ln(2)·(RA+RB)·C, Tlow = ln(2)·RB·C. / Without hysteresis the decision depends only on a comparison with one threshold. With hysteresis there is an upper and a lower threshold. For the timer, Thigh = ln(2)·(RA+RB)·C and Tlow = ln(2)·RB·C.
- Worked example: 3 > 2,5, тож вихід 5 В. Якби вхід був 2 В, вихід цієї моделі став би 0 В.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — помножити 3 В на коефіцієнт операційного підсилювача і шукати проміжний рівень. Компаратор цього завдання працює як перемикач шин.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-34 `ee-34-boolean-cmos`

- Titles: Логіка і КМОН-інвертор / Logic and the CMOS inverter
- Prerequisites: Два рівні напруги і заряд ємності від прямокутного перепаду. / Two voltage levels and the charge of a capacitance from a rectangular step.
- Lesson topics:
1. Інвертор як пара ключів / An inverter as a pair of switches
2. Статична і динамічна потужність / Static and dynamic power
3. Запас завадостійкості / Noise margin
4. NAND і два входи / NAND and two inputs
5. Два виходи, замкнені один на одного / Two outputs tied together
- Observable results: Учень читає NAND, рахує динамічну потужність КМОН і запас завадостійкості, та відрізняє її від статичної. / The learner reads a NAND, computes CMOS dynamic power and a noise margin, and separates that power from the static term.
- Formula and model limit: Ідеальна статична потужність КМОН-інвертора нульова. Динамічна P ≈ C·V²·f. Запас високого рівня Vdd−Vih, запас низького Vil−0 у цій навчальній сітці. / The ideal static power of a CMOS inverter is zero. Dynamic power is about C·V²·f. The high margin is Vdd−Vih, and the low margin is Vil−0 in this classroom grid.
- Worked example: Вхід 0 В дає вихід 5 В. Вхід 5 В дає вихід 0 В. Середина 2,5 В не є стійким логічним рівнем цієї моделі.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — лишити вихід на 2,5 В як «невизначений, але робочий» рівень. Для наступного каскаду це якраз найгірша напруга.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-35 `ee-35-flipflops-counters`

- Titles: Тригери і двійковий лічильник / Flip-flops and a binary counter
- Prerequisites: Логічний рівень, період такту і степінь двійки. / A logic level, the clock period, and a power of two.
- Lesson topics:
1. Поділ частоти на два / Dividing the frequency by two
2. Модуль із чотирьох розрядів / A modulus of four bits
3. Час встановлення / Setup time
4. Старший розряд і проміжні коди / The high bit and the intermediate codes
5. Скидання і початковий стан / Reset and the initial state
- Observable results: Учень ділить частоту тригером, збирає модуль лічильника і впізнає порушення часу встановлення. / The learner divides a frequency with a flip-flop, builds a counter modulus, and recognises a setup-time violation.
- Formula and model limit: Тригер T ділить частоту такту на 2. Модуль n тригерів у двійковому лічильнику 2^n. Час встановлення вимагає, щоб дані були стабільні раніше за фронт на заявлений інтервал. / A T flip-flop divides the clock frequency by 2. The modulus of n flip-flops in a binary counter is 2^n. Setup time requires the data to be stable before the edge by the stated interval.
- Worked example: Такт 1 МГц має період 1 мкс. Вихід має період 2 мкс і частоту 500 кГц.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — лишити на виході ту саму частоту 1 МГц, ніби тригер є провідником такту.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-36 `ee-36-sensors-adc-dac`

- Titles: Дискретизація, АЦП і ЦАП / Sampling, the ADC, and the DAC
- Prerequisites: Двійковий модуль, дільник опорної напруги і частота Найквіста. / A binary modulus, a divider of a reference voltage, and the Nyquist frequency.
- Lesson topics:
1. Ціна молодшого розряду / The value of one LSB
2. Код середини шкали / The midscale code
3. Крок ЦАП / A DAC step
4. Частота Найквіста / The Nyquist frequency
5. Накладання спектра / Aliasing
- Observable results: Учень знаходить ціну молодшого розряду, код заданої напруги, крок ЦАП і частоту накладання. / The learner finds the value of one LSB, the code of a stated voltage, a DAC step, and an alias frequency.
- Formula and model limit: LSB = Vref/2^n для n-розрядного АЦП з кодами 0…2^n−1 у цій моделі. ЦАП: V = код/2^n·Vref. Накладання f_alias = |f − k·fs| у межах fs/2. / LSB = Vref/2^n for an n-bit ADC with codes 0…2^n−1 in this model. A DAC gives V = code/2^n·Vref. An alias is f_alias = |f − k·fs| folded into fs/2.
- Worked example: LSB = 0.003223 В. Половина кроку 0.001611 В.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — поділити опору на 10 або на 1000 замість 2^10.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-38 `ee-38-buck-converters`

- Titles: Знижувальний перетворювач / The buck converter
- Prerequisites: Шпаруватість, індуктивність і баланс вольт-секунд на котушці. / Duty ratio, inductance, and the volt-second balance on a coil.
- Lesson topics:
1. Шпаруватість усталеного режиму / Steady-state duty
2. Розмах струму котушки / Coil-current ripple
3. Межа безперервного струму / The continuous-current boundary
4. Пульсація на конденсаторі і на ESR / Ripple on the capacitor and on the ESR
5. Три доданки втрат / Three loss terms
- Observable results: Учень знаходить шпаруватість 24 В → 5 В, розмах струму котушки, межу переривчастого режиму і окремі втрати ключа, діода та опору обмотки. / The learner finds the duty of a 24 V to 5 V buck, the coil-current ripple, the discontinuous-mode boundary, and the separate losses of the switch, the diode, and the winding resistance.
- Formula and model limit: D = Vout/Vin для ідеального buck. ΔI = (Vin−Vout)·D/(f·L). Межа безперервного струму ΔI/2. Втрати провідності ключа I²·Rds·D, діода Vf·I·(1−D). / D = Vout/Vin for an ideal buck. ΔI = (Vin−Vout)·D/(f·L). The continuous-current boundary is ΔI/2. Switch conduction loss is I²·Rds·D, and diode loss is Vf·I·(1−D).
- Worked example: З 24 В шпаруватість 0.208333. З 18 В шпаруватість 0.277778.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — лишити шпаруватість 5/24, коли вхід уже 18 В. Вихід тоді став би 18·5/24 = 3,75 В.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-39 `ee-39-boost-buckboost`

- Titles: Підвищувальний і інвертувальний перетворювачі / Boost and buck-boost converters
- Prerequisites: Баланс вольт-секунд buck і неперервність струму котушки. / The volt-second balance of a buck and the continuity of coil current.
- Lesson topics:
1. Шпаруватість boost / Boost duty
2. Вхідний струм boost / Boost input current
3. Інвертувальний buck-boost / An inverting buck-boost
4. Струм інвертувальної схеми / Current of the inverting circuit
5. Що ламає ідеальне підвищення / What breaks the ideal step-up
- Observable results: Учень рахує шпаруватість і струм входу boost і buck-boost та не плутає їх із знижувальним каскадом. / The learner computes the duty and the input current of a boost and a buck-boost, and does not confuse them with a step-down stage.
- Formula and model limit: Boost: Vout = Vin/(1−D), Iin = Iout/(1−D) без втрат. Buck-boost: |Vout|/Vin = D/(1−D). Котушка boost стоїть у вході, тож її середній струм є вхідним. / Boost: Vout = Vin/(1−D), and with no loss Iin = Iout/(1−D). Buck-boost: |Vout|/Vin = D/(1−D). The boost coil stands at the input, so its average current is the input current.
- Worked example: D = 0.5. Перевірка: 12/(1−0,5) = 24 В.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — взяти D = 24/12 = 2. Шпаруватість більша за одиницю не існує, а подвоєння тут сидить у знаменнику 1−D.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-40 `ee-40-isolated-flyback`

- Titles: Зворотноходовий перетворювач / The flyback converter
- Prerequisites: Шпаруватість buck-boost і середній струм котушки. / The buck-boost duty and the average coil current.
- Lesson topics:
1. Перенесення балансу на обмотки / Carrying the balance onto the windings
2. Середній струм відкритого ключа / Average current while the switch is on
3. Перевірка безперервності / A continuity check
4. Напруга на ключі / Voltage on the switch
5. Підміна готовою напругою / Substituting a ready-made voltage
- Observable results: Учень переносить баланс buck-boost на обмотки зворотного ходу, перевіряє безперервність струму первинної обмотки і напругу ключа. / The learner carries the buck-boost balance onto flyback windings, checks continuity of the primary current, and finds the switch voltage.
- Formula and model limit: Vout = Vin·(Ns/Np)·D/(1−D) без втрат. Струм первинної обмотки під час відкритого ключа має середнє Iin/D. Ключ бачить Vin+Vout·(Np/Ns). / With no loss, Vout = Vin·(Ns/Np)·D/(1−D). During the on-time the primary current has an average Iin/D. The switch sees Vin+Vout·(Np/Ns).
- Worked example: D = 0.454545. Перевірка: 6·(5/11)/(6/11) = 5 В.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — вважати, що обидві обмотки працюють як звичайний трансформатор одночасно. У зворотному ході енергія спочатку тільки входить, потім тільки виходить.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-41 `ee-41-bridge-inverters`

- Titles: Мостовий інвертор / The bridge inverter
- Prerequisites: ШІМ, діод зворотного струму і баланс напруги на котушці. / PWM, the freewheel diode, and voltage balance on a coil.
- Lesson topics:
1. Перша гармоніка прямокутника / Fundamental of a square wave
2. Пауза між ключами одного плеча / Blanking between the devices of one leg
3. Лінійна модуляція моста / Linear modulation of the bridge
4. Резистор повторює напругу, котушка тримає струм / A resistor follows voltage, a coil holds current
5. Наскрізний струм і провал шини / Shoot-through and bus sag
- Observable results: Учень відрізняє діюче значення прямокутника від амплітуди першої гармоніки, рахує частку паузи в періоді, лінійну модуляцію H-моста, потужність на резисторі і стелю наскрізного струму. / The learner separates the RMS of a square wave from the amplitude of its first harmonic, computes the blanking fraction of a period, the linear modulation of an H-bridge, resistor power, and the resistive ceiling of shoot-through.
- Formula and model limit: Прямокутник ±Vdc має діюче значення Vdc. Амплітуда першої гармоніки 4·Vdc/π. Лінійний двополярний ШІМ цього моста: амплітуда першої гармоніки m·Vdc при m ≤ 1. Одна пауза td займає частку td·f. Наскрізний струм ідеальної оцінки Vdc/(2·Rds). / A ±Vdc square has RMS equal to Vdc. The first-harmonic amplitude is 4·Vdc/π. Linear bipolar PWM of this bridge has first-harmonic amplitude m·Vdc for m ≤ 1. One blanking interval td occupies the fraction td·f. The ideal shoot-through estimate is Vdc/(2·Rds).
- Worked example: Амплітуда першої гармоніки 61.115498 В. Діюче значення прямокутника 48 В. Третя гармоніка має амплітуду 20.371833 В. Діюче значення самої першої гармоніки 43.215183 В, і воно менше за діюче значення прямокутника.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — назвати діюче значення прямокутника Vdc/√2 або сказати, що амплітуда першої гармоніки дорівнює Vdc.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-42 `ee-42-magnetics-thermal`

- Titles: Магнітний і тепловий розрахунок / Magnetics and heating
- Prerequisites: Вольт-секунди котушки, втрати I²R і опір тепловому потоку. / Volt-seconds on a coil, I²R loss, and resistance to heat flow.
- Lesson topics:
1. Індукція з вольт-секунд / Flux density from volt-seconds
2. Витки, опір і втрати міді / Turns, resistance, and copper loss
3. Перевищення температури / Temperature rise
4. Втрати осердя додають окремо / Core loss is added separately
5. Насичення за струмом / Saturation as a current limit
- Observable results: Учень знаходить індукцію з добутку напруги на час, опір і втрати міді, перевищення температури та окремо перевіряє струм насичення. / The learner finds flux density from the product of voltage and time, copper resistance and loss, temperature rise, and checks saturation current as a separate limit.
- Formula and model limit: B = V·t_on/(N·Ae) для ідеальної котушки. Pcu = I²·R, ΔT = P·Rth. Струм насичення деталі із зазором не виводиться з цього B. Глибина скін-шару міді δ = 1/√(π·f·μ0·σ) показує, коли R на постійному струмі занижує втрати. / B = V·t_on/(N·Ae) for an ideal coil. Pcu = I²·R and ΔT = P·Rth. The saturation current of a gapped part is not derived from that B. The copper skin depth δ = 1/√(π·f·μ0·σ) shows when the DC resistance understates the loss.
- Worked example: Індукція 0.3 Тл. Потік 0.000006 Вб. Якщо тримати 12 В уже 10 мкс, індукція стає 0.6 Тл. Умова цього навчального осердя: коліно кривої прийнято 0,35 Тл, тож 0,6 Тл уже далеко за нею. Це умова задачі, а не рядок каталогу.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — поділити напругу на витки і площу без часу, або підставити 20 мм² як 20 м².
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-43 `ee-43-three-phase-systems`

- Titles: Трифазна симетрична система / The balanced three-phase system
- Prerequisites: Діючі значення синусоїди, комплексний опір і потужності P, Q, S. / RMS of a sine wave, complex impedance, and the powers P, Q, and S.
- Lesson topics:
1. Лінійна і фазна напруга зірки / Line and phase voltage of a wye
2. Трикутник на тих самих лініях / A delta on the same lines
3. Активна і реактивна потужність / Active and reactive power
4. Опір однієї фази зірки / Impedance of one wye phase
5. Два ватметри / Two wattmeters
- Observable results: Учень розрізняє лінійні й фазні величини зірки та трикутника, рахує P і Q та два покази ватметрів. / The learner separates line and phase quantities of a wye and a delta, computes P and Q, and the two wattmeter readings.
- Formula and model limit: У зірці Vph = VL/√3 і IL = Iph. У трикутнику Vph = VL і IL = √3·Iph. S = √3·VL·IL, P = S·pf, Q = S·sinφ. Покази двох ватметрів у сумі дають P, а tanφ = √3·(Wбільший−Wменший)/P. / In a wye, Vph = VL/√3 and IL = Iph. In a delta, Vph = VL and IL = √3·Iph. S = √3·VL·IL, P = S·pf, and Q = S·sinφ. Two wattmeter readings sum to P, and tanφ = √3·(Wlarger−Wsmaller)/P.
- Worked example: Фазна напруга 230.940108 В. Потужність 6928.20323 Вт. Перевірка 3·Vph·10 дає те саме число, бо Vph·√3 повертає 400 В.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — взяти фазну напругу як 400/3 або порахувати потужність як VL·IL без √3.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-44 `ee-44-unbalanced-loads`

- Titles: Несиметрія, нейтраль і компенсація / Unbalance, the neutral, and compensation
- Prerequisites: Симетрична зірка, комплексне додавання струмів і реактивна потужність. / A balanced wye, complex addition of currents, and reactive power.
- Lesson topics:
1. Струм нейтралі трьох різних струмів / Neutral current of three different currents
2. Обрив нейтралі / An open neutral
3. Обрив однієї фази при цілій нейтралі / One phase open, neutral intact
4. Компенсація до коефіцієнта 0,95 / Compensation to a power factor of 0.95
5. Трикутник конденсаторів / A delta of capacitors
- Observable results: Учень знаходить струм нейтралі при заданих фазних струмах, зсув напруги при обриві нейтралі і ємність компенсації до pf 0,95. / The learner finds the neutral current for stated phase currents, the voltage shift when the neutral opens, and the capacitance that compensates to a pf of 0.95.
- Formula and model limit: Струми 10 А, 10 А і 5 А під 120° дають |In| = 5 А. Обірвана нейтраль: напруга зміщення є напругою Міллмана. Компенсація зіркою: Qc = Q − P·tanφ2, C = Qc/(3·Vph²·ω). Трикутник конденсаторів бачить VL, тож його ємність менша втричі. / Currents of 10 A, 10 A, and 5 A at 120° give |In| = 5 A. An open neutral: the shift is the Millman voltage. Wye compensation: Qc = Q − P·tanφ2 and C = Qc/(3·Vph²·ω). A delta of capacitors sees VL, so its capacitance is three times smaller.
- Worked example: Дійсна складова суми 2.5 А, уявна -4.330127 А, модуль 5 А. Половина меншого струму не є відповіддю: модуль вийшов рівним 5 А лише після гіпотенузи.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — сказати, що нейтраль завжди без струму, або додати 10+10+5 = 25 А як модуль.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-45 `ee-45-transformers`

- Titles: Трансформатор / The transformer
- Prerequisites: Фазна напруга, струм і поділ втрат на сталі та залежні від струму. / Phase voltage, current, and the split of loss into a constant part and a current-dependent part.
- Lesson topics:
1. Ідеальне відношення 230/23 / The ideal 230/23 ratio
2. Зміна напруги під навантаженням / Voltage change under load
3. ККД при окремих втратах сталі й міді / Efficiency with steel and copper loss kept apart
4. Опір, приведений до первинної обмотки / Impedance referred to the primary
5. Досліди холостого ходу і короткого замикання / Open-circuit and short-circuit tests
- Observable results: Учень знаходить витки й струми ідеального трансформатора 230/23 В, зміну напруги, ККД із окремими втратами сталі й міді та опір, приведений до первинної обмотки. / The learner finds the turns ratio and currents of an ideal 230/23 V transformer, the voltage change, the efficiency with steel and copper loss kept separate, and the impedance referred to the primary.
- Formula and model limit: Ідеально a = V1/V2 = I2/I1. Зміна напруги (Vнх − Vнаван)/Vнаван. η = Pout/(Pout+Psteel+Pcu). Опір вторинної обмотки, приведений до первинної, множать на a². Втрати міді при половинному струмі падають учетверо, втрати сталі при номінальній напрузі ні. / Ideally a = V1/V2 = I2/I1. The voltage change is (Vno-load − Vload)/Vload. η = Pout/(Pout+Psteel+Pcu). A secondary impedance referred to the primary is multiplied by a². Copper loss at half current falls by four, and steel loss at rated voltage does not.
- Worked example: Відношення 10. Первинний струм 1 А. Добуток 230·1 дорівнює добутку 23·10: обидва по 230 ВА.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — взяти первинний струм теж 10 А або перевернути відношення і отримати на вторинній обмотці 2300 В.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-46 `ee-46-dc-machines`

- Titles: Машина постійного струму / The DC machine
- Prerequisites: Потужність, кутова швидкість і спад напруги на опорі якоря. / Power, angular speed, and the voltage drop on the armature resistance.
- Lesson topics:
1. Проти-ЕРС і перетворена потужність / Back-emf and converted power
2. Момент з перетвореної потужності / Torque from converted power
3. Той самий якір як генератор / The same armature as a generator
4. Потік і швидкість при тій самій проти-ЕРС / Flux and speed at the same back-emf
5. Три різні потужності одного режиму / Three different powers of one regime
- Observable results: Учень розділяє напругу якоря і проти-ЕРС, перетворену потужність і момент на валу, а також не переносить рівняння двигуна на генератор без зміни знака. / The learner separates armature voltage from back-emf, converted power from shaft torque, and does not move the motor equation onto a generator without changing the sign.
- Formula and model limit: Двигун: Eb = V − Ia·Ra, Pconv = Eb·Ia. Момент із перетвореної потужності T = Pconv/ω, ω = 2·π·n/60. Генератор: Eb = V + Ia·Ra. При тій самій Eb швидкість обернено пропорційна потоку. Механічні втрати віднімають уже від Pconv. / Motor: Eb = V − Ia·Ra and Pconv = Eb·Ia. Torque from converted power is T = Pconv/ω, with ω = 2·π·n/60. Generator: Eb = V + Ia·Ra. At the same Eb, speed is inversely proportional to flux. Mechanical loss is subtracted only after Pconv.
- Worked example: Проти-ЕРС 210 В. Перетворена потужність 2100 Вт. Електрична потужність на клемах 2200 Вт, втрати в міді якоря 100 Вт.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — помножити 220 В на 10 А і назвати 2200 Вт потужністю на валу.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-47 `ee-47-induction-motors`

- Titles: Асинхронний двигун / The induction motor
- Prerequisites: Трифазна потужність, ковзання і поділ потужності повітряного зазору. / Three-phase power, slip, and the split of air-gap power.
- Lesson topics:
1. Електричний вхід еквівалента / Electrical input of the equivalent
2. Опір фази еквівалента / Phase impedance of the equivalent
3. Ковзання і швидкість поля / Slip and field speed
4. Потужність зазору і мідь ротора / Air-gap power and rotor copper
5. Пуск і межа еквівалента / Starting and the limit of the equivalent
- Observable results: Учень не змішує електричний вхід 3 кВт еквівалента з розвиненою механічною потужністю, рахує струм, опір фази, ковзання і втрати ротора. / The learner does not mix the 3 kW electrical input of the equivalent with the developed mechanical power, and computes current, phase impedance, slip, and rotor loss.
- Formula and model limit: Електричний вхід: S = P/pf, I = S/(√3·VL). Для цього еквівалента |Z| = 40 Ом, R = 30 Ом, X = √700 Ом. Швидкість поля ns = 120·f/p. Pconv = (1−s)·Pag, втрати міді ротора s·Pag. Число 3 кВт тут є електричним входом, а 2500 Вт — окремо заданою розвиненою потужністю. / Electrical input: S = P/pf and I = S/(√3·VL). For this equivalent |Z| = 40 Ω, R = 30 Ω, and X = √700 Ω. Field speed is ns = 120·f/p. Pconv = (1−s)·Pag and rotor copper loss is s·Pag. The 3 kW here is the electrical input, and 2500 W is a separately stated developed power.
- Worked example: Повна потужність 4000 ВА. Струм лінії 5.773503 А. При pf = 1 той самий електричний вхід вимагав би струм 4.330127 А.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — назвати 3 кВт потужністю на валу або порахувати струм як 3000/(√3·400), викинувши коефіцієнт потужності.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-48 `ee-48-synchronous-bldc`

- Titles: Синхронна машина і безщітковий привід / The synchronous machine and a brushless drive
- Prerequisites: Число полюсів, момент P/ω і окремі електричні та механічні припущення. / Pole count, torque P/ω, and separate electrical and mechanical assumptions.
- Lesson topics:
1. Частота і число полюсів / Frequency and pole count
2. Момент при синхронній швидкості / Torque at synchronous speed
3. Струм при коефіцієнті потужності 1 / Current at a power factor of 1
4. Момент і поличка ЕРС безщіткового приводу / Torque and the flat-top back-emf of a brushless drive
5. Помилка пар полюсів у приводі / The pole-pair mistake in a drive
- Observable results: Учень зв'язує частоту з числом полюсів, рахує момент синхронної швидкості, струм при pf = 1 і пару момент-ЕРС безщіткового приводу за явно названим означенням. / The learner links frequency to pole count, computes torque at synchronous speed, the current at pf = 1, and the torque and back-emf pair of a brushless drive under a definition that is named explicitly.
- Formula and model limit: fe = n·p/120, де p — число полюсів. При нульовому ковзанні T = P/ω лише для тієї потужності, яку назвали. I = P/(√3·VL) при pf = 1 і без втрат. Для BLDC цього уроку T = Kt·I і E = Kt·ω, де E є поличкою лінійної ЕРС. Рівність Ke = Kt є означенням уроку, не універсальним рядком паспорта. / fe = n·p/120, where p is the number of poles. At zero slip, T = P/ω only for the power that was named. I = P/(√3·VL) at pf = 1 and with no loss. For the BLDC of this lesson, T = Kt·I and E = Kt·ω, where E is the flat top of the line-to-line back-emf. The equality Ke = Kt is a definition of the lesson, not a universal nameplate line.
- Worked example: Частота при 4 полюсах 50 Гц. Швидкість при 6 полюсах 1000 об/хв. Якщо в формулу для 4-полюсної машини підставити 2, вийде 25 Гц, і це вже помилка підстановки.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — поділити число полюсів на два перед формулою, яка вже очікує повне число полюсів.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-49 `ee-49-instruments-probes`

- Titles: Прилади і щупи / Instruments and probes
- Prerequisites: Подільник напруги, стала часу RC і індуктивний викид L·di/dt. / A voltage divider, an RC time constant, and the inductive spike L·di/dt.
- Lesson topics:
1. Подільник щупа 10× / The 10× probe divider
2. Чим щуп навантажує коло / How a probe loads a circuit
3. Смуга і оцінка фронту / Bandwidth and a rise-time estimate
4. Петля дроту землі / The ground-lead loop
5. Що саме показує прилад / What the instrument is actually showing
- Observable results: Учень узгоджує щуп 10× з входом осцилографа, оцінює навантаження кола і не плутає смугу однополюсної моделі з паспортною цифрою без означення. / The learner matches a 10× probe to the oscilloscope input, estimates circuit loading, and does not confuse the bandwidth of a one-pole model with a nameplate figure that has no definition.
- Formula and model limit: Для щупа 10× опір наконечника 9 МОм і вхід осцилографа 1 МОм. Компенсація: 9 МОм·Cщупа = 1 МОм·Cвходу. Оцінка фронту однополюсної моделі tr ≈ 0,35/BW. Викид петлі землі L·di/dt. / For a 10× probe the tip resistance is 9 MΩ and the oscilloscope input is 1 MΩ. Compensation: 9 MΩ·Cprobe = 1 MΩ·Cinput. A one-pole rise-time estimate is tr ≈ 0.35/BW. The ground-lead spike is L·di/dt.
- Worked example: Ослаблення 10. Ємність компенсації 0 Ф. Добуток 9 МОм·2 пФ дорівнює добутку 1 МОм·18 пФ.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — поставити в наконечник 10 МОм і чекати ослаблення рівно 10, або підібрати ємність 18 пФ, таку саму, як на вході.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-50 `ee-50-measurement-errors-rms`

- Titles: Похибка, допуск і діюче значення / Error, tolerance, and RMS
- Prerequisites: Подільник, діюче значення синусоїди і незалежні внески похибки. / A divider, the RMS of a sine wave, and independent error contributions.
- Lesson topics:
1. Абсолютна і відносна похибка / Absolute and relative error
2. Корінь із суми квадратів / Root-sum-square
3. Кути допуску подільника / Tolerance corners of a divider
4. Опір амперметра в колі / Ammeter resistance in the circuit
5. Яку похибку куди підставляти / Which error goes where
- Observable results: Учень відрізняє абсолютну похибку від відносної, складає незалежні внески коренем із суми квадратів і рахує кути допуску подільника окремо від цієї статистичної оцінки. / The learner separates absolute error from relative error, combines independent contributions by a root-sum-square, and computes divider tolerance corners separately from that statistical estimate.
- Formula and model limit: Відносна похибка = абсолютна / показ. RSS = √(e1²+e2²) для незалежних внесків однієї бази. Кути подільника 10·R2/(R1+R2) при ±1% беруть найгірші знаки, а не RSS, поки розподіл не заданий. / Relative error = absolute / reading. RSS = √(e1²+e2²) for independent contributions on one base. The corners of the divider 10·R2/(R1+R2) at ±1% take the worst signs, not an RSS, until a distribution is stated.
- Worked example: На 10 В відносна похибка 0.01. На 0,5 В вона 0.2. Абсолютні 0,1 В не змінились.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — сказати, що 0,1 В є 1% на будь-якому показі цієї шкали.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-51 `ee-51-datasheets-soa`

- Titles: Область безпечної роботи / The safe operating area
- Prerequisites: Тепловий опір, добуток напруги і струму, відмінність імпульсу від постійного режиму. / Thermal resistance, the product of voltage and current, and the difference between a pulse and a DC regime.
- Lesson topics:
1. Теплова стеля потужності / The thermal power ceiling
2. Гіпербола напруга-струм / The voltage-current hyperbola
3. Імпульс і перехідний тепловий опір / A pulse and transient thermal impedance
4. Втрати відкритого ключа це I²R / The loss of a closed switch is I²R
5. Три межі не замінюють одна одну / Three limits do not replace one another
- Observable results: Учень обмежує струм гіперболою теплової потужності, а не рядком максимального струму стоку, і підставляє імпульсний тепловий опір лише коли його задано. / The learner limits current by the thermal-power hyperbola, not by the maximum-drain-current line, and substitutes a pulse thermal impedance only when it has been given.
- Formula and model limit: P = (Tjmax − Tamb)/Rthja. При сталій напрузі I = P/V. Максимальний струм стоку з умови задачі є іншою межею. Якщо для імпульсу дано Zth = 0,2·Rth, імпульсна потужність P·Rth/Zth. Числа не зняті з паспорта названого транзистора. / P = (Tjmax − Tamb)/Rthja. At a fixed voltage, I = P/V. The maximum drain current in the problem is a different limit. If a pulse is given Zth = 0.2·Rth, the pulse power is P·Rth/Zth. The numbers are not taken from the nameplate of a named transistor.
- Worked example: Дозволена потужність 3.125 Вт. Перевищення 125 К. Повітря 25 °C плюс це перевищення дає 150 °C лише в моделі одного опору.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — поділити 150 на 40 і викинути повітря або назвати 3,125 Вт струмом.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-52 `ee-52-protection-grounding`

- Titles: Захист і заземлення / Protection and earthing
- Prerequisites: Закон Ома для петлі джерело-лінія-замикання і спад I·R. / Ohm's law for the source-line-fault loop and the drop I·R.
- Lesson topics:
1. Струм петлі замикання / Fault-loop current
2. Напруга дотику / Touch voltage
3. Коли запобіжник не бачить замикання / When a fuse does not see the fault
4. Нагрів провідника не є дозволом / Conductor heating is not a permission
5. Корпус без захисного провідника / An enclosure with no protective conductor
- Observable results: Учень рахує струм петлі замикання, напругу дотику на захисному провіднику і відрізняє цю навчальну оцінку від норми монтажу, якої тут не цитують. / The learner computes the fault-loop current, the touch voltage on the protective conductor, and keeps this teaching estimate apart from an installation rule, which is not quoted here.
- Formula and model limit: Iзамк = U / Zпетлі. Напруга дотику в цій моделі Iзамк·Rpe. Поріг 50 В є порогом вправи, не цитатою норми для будинку. Нагрів провідника I²R є тепловим прикладом, не дозволом на переріз. / Ifault = U / Zloop. Touch voltage in this model is Ifault·Rpe. The 50 V threshold is a threshold of the exercise, not a quotation of a rule for a building. Conductor heating I²R is a thermal example, not permission for a cross-section.
- Worked example: Струм петлі 115 А. Якби хтось поділив 230 В лише на 0,2 Ом захисного провідника, вийшло б 1150 А, і це вже інша, неповна петля.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — взяти струм замикання з одного лише опору захисного провідника.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-53 `ee-53-distribution-drops`

- Titles: Спад напруги в лінії / Voltage drop on a line
- Prerequisites: Струм навантаження, опір лінії і лінійна напруга трифазної системи. / Load current, line resistance, and the line voltage of a three-phase system.
- Lesson topics:
1. Резистивна однофазна лінія / A resistive single-phase line
2. Зворотний провід / The return conductor
3. Модуль трифазного спаду / Magnitude of a three-phase drop
4. Відсоток ще не є напругою в кінці / A percent is not yet the voltage at the end
5. Той самий струм, інша довжина / The same current, another length
- Observable results: Учень рахує спад однофазної резистивної лінії як I·R і модуль трифазного спаду як √3·I·|Z|, не віднімаючи ці числа від напруги без названого припущення про кут. / The learner computes the drop of a single-phase resistive line as I·R and the magnitude of a three-phase drop as √3·I·|Z|, and does not subtract those numbers from the voltage without a named assumption about the angle.
- Formula and model limit: Однофазний резистивний спад I·R, зворотний провід подвоює R, якщо він такий самий. Модуль лінійного спаду симетричної лінії √3·I·|Z|. Відсоток цього модуля від 400 В не є точною напругою в кінці лінії, поки кут Z не названо. / A single-phase resistive drop is I·R, and the return conductor doubles R when it is the same. The magnitude of the line drop of a balanced line is √3·I·|Z|. The percent of that magnitude relative to 400 V is not the exact voltage at the end of the line until the angle of Z is named.
- Worked example: Спад 6 В. Напруга в кінці 224 В. Частка спаду від 230 В дорівнює 0.026087.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — відняти I·R від 230 В і для лінії з помітною індуктивністю, не назвавши кут.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-54 `ee-54-relays-motor-control`

- Titles: Котушка, контактор і прямий пуск / A coil, a contactor, and direct-on-line starting
- Prerequisites: Потужність котушки постійного струму, струм якоря і відмінність пускового струму від номінального. / The power of a DC coil, armature current, and the difference between starting current and rated current.
- Lesson topics:
1. Утримана котушка постійного струму / A sealed DC coil
2. Кидок, поки якір відкритий / Inrush while the armature is open
3. Прямий пуск і шестикратний струм / Direct-on-line start and a sixfold current
4. Просідання напруги на котушці / Voltage sag on the coil
5. Хибне спрацьовування і обрив фази / A false trip and an open phase
- Observable results: Учень рахує струм утриманої котушки постійного струму, не переносить цю потужність на пусковий струм двигуна і не ставить тепловий захист на шестикратний пуск. / The learner computes the current of a sealed DC coil, does not move that power onto the motor starting current, and does not set a thermal overload at six times the start.
- Formula and model limit: Для котушки постійного струму I = P/V і R = V²/P. Кидок увімкнення в умові заданий окремим множником, бо якір ще відкритий. Прямий пуск двигуна в умові Iпуск = 6·Iном. Уставка теплового захисту близька до Iном, не до Iпуск. Множник 6 є умовою, не нормою всіх двигунів. / For a DC coil, I = P/V and R = V²/P. The inrush is given by a separate factor in the problem, because the armature is still open. Direct-on-line starting in the problem is Istart = 6·Irated. A thermal overload setting is near Irated, not near Istart. The factor 6 is a condition of the problem, not a rule for every motor.
- Worked example: Струм 0.208333 А. Опір 115.2 Ом. Добуток 24·I повертає 5 Вт.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — взяти 5 Вт як потужність двигуна або порахувати струм котушки змінного струму після притягання як 5/24.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-55 `ee-55-worst-case-monte-carlo`

- Titles: Найгірший випадок і відтворювана вибірка / Worst case and a reproducible sample
- Prerequisites: Подільник, допуск резистора і різниця між кутом поля допусків та коренем із суми квадратів. / A divider, a resistor tolerance, and the difference between a tolerance corner and a root-sum-square.
- Lesson topics:
1. Точні кути дільника / Exact divider corners
2. Лінійна оцінка поруч із точним кутом / A linear estimate beside the exact corner
3. Вісім відтворюваних проб / Eight reproducible draws
4. Найгірша потужність іншого кола / The worst power of a different circuit
5. Що можна написати у висновку / What the conclusion may say
- Observable results: Учень перелічує кути двох незалежних допусків, відрізняє лінійну оцінку від точного кута і не видає вісім відтворюваних проб за межу. / The learner lists the corners of two independent tolerances, separates a linear estimate from the exact corner, and does not present eight reproducible draws as a bound.
- Formula and model limit: Для дільника 10 В, 2 кОм і 3 кОм із допуском 1% точні краї: R1 мінімальний разом із R2 максимальним, і навпаки. Лінійна оцінка використовує похідні. Вісім проб дає генератор із фіксованим зерном 20261114, рівномірно в межах допуску. / For a 10 V divider, 2 kΩ and 3 kΩ at 1%, the exact edges are minimum R1 with maximum R2, and the opposite pair. The linear estimate uses the derivatives. Eight draws come from a generator with the fixed seed 20261114, uniform inside the tolerance.
- Worked example: Верхній край 6.047904 В. Нижній край 5.951904 В. Різниця країв 0.096 В. Номінал 6 В.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — скласти два відсотки і назвати 6 В ±2% найгіршим випадком. Відсотки опорів не додаються до відсотка напруги один до одного.
- Laboratory: Лабораторія перевіряє номінальні 6 В. Краї допуску і вибірку сервер перевіряє числом, бо модель лабораторії не розкидає допуск сама. / The lab checks the nominal 6 V. The server checks the tolerance edges and the sample as numbers, because the lab model does not scatter the tolerance by itself.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-56 `ee-56-troubleshooting-reports`

- Titles: Діагностика і звіт про вимір / Diagnosis and a measurement report
- Prerequisites: Ненавантажений дільник і те, що обрив вітки прибирає струм, а коротке замикання прибирає напругу на деталі. / An unloaded divider, and the fact that an open branch removes current while a short removes the voltage on that part.
- Lesson topics:
1. Обрив нижнього плеча / An open lower arm
2. Обрив верхнього плеча / An open upper arm
3. Коротке замикання має той самий показ / A short can share the reading
4. Зайве навантаження / An unexpected load
5. Речення звіту / The sentence in the report
- Observable results: Учень за показанням відрізняє обрив нижнього плеча, обрив верхнього і зайве навантаження, і записує вимір, який розділяє дві гіпотези. / The learner uses a reading to separate an open lower arm, an open upper arm, and an extra load, and writes the measurement that splits two hypotheses.
- Formula and model limit: Дільник 10 В, 2 кОм зверху і 3 кОм знизу дає 6 В. Обрив нижнього плеча лишає вузол на напрузі джерела. Обрив верхнього садить вузол на нуль через нижнє плече. Паралельні 3 кОм до нижнього плеча дають 1,5 кОм і напругу 10·1,5/3,5. / A 10 V divider, 2 kΩ above and 3 kΩ below, gives 6 V. An open lower arm leaves the node at the source voltage. An open upper arm pulls the node to zero through the lower arm. An extra 3 kΩ across the lower arm makes 1.5 kΩ and the voltage 10·1.5/3.5.
- Worked example: Показ при обриві нижнього плеча 10 В. Номінал був 6 В. Різниця 4 В.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — чекати нуль, ніби обрив будь-де вимикає вузол.
- Laboratory: Числову відповідь перевіряє сервер. Схему цього модуля учень збирає в браузерній лабораторії і звіряє з еталоном уроку. / The server grades the numeric answer. The learner builds this module's circuit in the browser lab and compares it with the lesson reference.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-57 `ee-57-pcb-emc-parasitics`

- Titles: Паразитні петлі, ємність шару і зв'язок / Parasitic loops, plane capacitance, and coupling
- Prerequisites: Індуктивний викид L·di/dt, омічний спад і резонанс LC. / The inductive spike L·di/dt, a resistive drop, and LC resonance.
- Lesson topics:
1. Викид петлі і омічний спад / Loop spike and resistive drop
2. Резонанс виводів конденсатора / Resonance of a capacitor's leads
3. Ємність двох шарів / Capacitance of two planes
4. Наводка взаємної індуктивності / Pickup from mutual inductance
5. Яку правку макета вибирати / Which layout change to choose
- Observable results: Учень рахує викид петлі окремо від омічного спаду, резонанс виводу конденсатора, ємність двох шарів і наводку взаємної індуктивності. / The learner computes a loop spike apart from the resistive drop, the resonance of a capacitor lead, the capacitance of two planes, and the pickup of a mutual inductance.
- Formula and model limit: Петля 20 нГн при 10⁸ А/с дає 2 В. Опір 10 мОм при 2 А дає 0,02 В. Конденсатор 100 нФ з індуктивністю виводів 2 нГн резонує на 1/(2π√(LC)). Два шари: ε0·4,5·0,01 м² / 0,2 мм. Взаємні 5 нГн при тій самій швидкості струму дають 0,5 В. / A 20 nH loop at 10⁸ A/s gives 2 V. A resistance of 10 mΩ at 2 A gives 0.02 V. A 100 nF capacitor with 2 nH of lead inductance resonates at 1/(2π√(LC)). Two planes: ε0·4.5·0.01 m² / 0.2 mm. A mutual 5 nH at the same current slope gives 0.5 V.
- Worked example: Індуктивний викид 2 В. Омічний спад 0.02 В. Вони відрізняються у сто разів при цих числах.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — помножити 20 нГн на струм 2 А і назвати це викидом.
- Laboratory: Числа паразитних елементів є умовою задачі, не виміром конкретної плати. Лабораторія курсу перевіряє ці формули числом. / The parasitic numbers are conditions of the problem, not a measurement of a particular board. The course lab checks these formulas as numbers.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-58 `ee-58-project-analog-frontend`

- Titles: Проєкт: мостовий вимірювальний вузол / Project: a bridge measurement front end
- Prerequisites: Міст, диференціальний підсилювач, зміщення і RC-фільтр нижніх частот. / A bridge, a differential amplifier, a bias, and an RC low-pass filter.
- Lesson topics:
1. Вікно, яке вузол має витримати / The window the front end has to keep
2. Різниця плечей і вихід / The arm difference and the output
3. Еталон, який перевіряє сервер / The reference the server checks
4. Запас, чутливість і навантаження моста / Margin, sensitivity, and bridge loading
5. Три несправності, які мають дати інший вихід / Three faults that must give another output
- Observable results: Учень рахує вихід моста при 990, 1000 і 1010 Ом, ставить підсилення близько 100 і зміщення 1,65 В, тримає вихід у вікні 0–3,3 В і впізнає переставлене плече, обрив і підсилення 10. / The learner computes the bridge output at 990, 1000, and 1010 Ω, sets a gain near 100 and a bias of 1.65 V, keeps the output inside 0–3.3 V, and recognises a swapped arm, an open, and a gain of 10.
- Formula and model limit: Праве плече 5·Rs/(1000+Rs), ліве 2,5 В. Вихід ідеальної моделі 1,65 + 100·(Vправо−2,5). Фільтр: R = 1/(2π·1 кГц·10 нФ). Модель без рейок живлення: обрив датчика дає близько 252 В, а реальний підсилювач зупиниться на своєму живленні. / The right arm is 5·Rs/(1000+Rs), the left is 2.5 V. The ideal-model output is 1.65 + 100·(Vright−2.5). The filter is R = 1/(2π·1 kHz·10 nF). The model has no supply rails: an open sensor gives about 252 V, while a real amplifier stops at its supply.
- Worked example: На 1000 Ом вихід 1.65 В. На 1010 Ом 2.893781 В. На 990 Ом 0.393719 В. Обидва краї всередині 0–3,3 В.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — прийняти вимогу «підсилення 100» і не перевірити, чи краї датчика ще в вікні.
- Laboratory: Сервер ганяє операційну точку еталона на 990, 1000 і 1010 Ом, на підсиленні 10 (обидва резистори зворотного зв'язку) і на обриві. Окреме AC-коло перевіряє зріз 1 кГц. Готове джерело на вузлі out відхиляється. / The server runs the reference operating point at 990, 1000, and 1010 Ω, at a gain of 10 (both feedback resistors), and at an open. A separate AC circuit checks the 1 kHz cutoff. A ready-made source on node out is rejected.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold is 1.0: every item on the served form is required.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-59 `ee-59-project-power-supply`

- Titles: Проєкт: понижувальний імпульсний перетворювач / Project: a step-down switching converter
- Prerequisites: Шпаруватість, пульсація струму котушки, ESR і оцінка провалу конденсатора. / Duty ratio, inductor current ripple, ESR, and an estimate of capacitor sag.
- Lesson topics:
1. Шпаруватість на двох входах / Duty at two inputs
2. Пульсація струму котушки / Inductor current ripple
3. Середня модель, яку здають на сервер / The average model submitted to the server
4. Пульсація на конденсаторі і провал кроку / Capacitor ripple and the step sag
5. Втрати і три несправності / Losses and three faults
- Observable results: Учень рахує шпаруватість від 24 В і від 18 В на 5 В, пульсацію струму і напруги, втрати ключа, діода і котушки, і впізнає застряглу шпаруватість 0,5, замалу індуктивність і замалий конденсатор. / The learner computes the duty from 24 V and from 18 V down to 5 V, the current and voltage ripple, the switch, diode, and inductor losses, and recognises a stuck duty of 0.5, too little inductance, and too little capacitance.
- Formula and model limit: D = 5/Vin для ідеального понижувача. ΔI = (Vin−5)·D/(f·L) при f = 100 кГц і L = 220 мкГн. Пульсація ідеального конденсатора ΔI/(8·f·C). Лабораторія перевіряє середню модель: джерело D·Vin, опір котушки 0,1 Ом і навантаження. Імпульсний фронт ця операційна точка не малює. / D = 5/Vin for an ideal step-down converter. ΔI = (Vin−5)·D/(f·L) at f = 100 kHz and L = 220 µH. The ideal capacitor ripple is ΔI/(8·f·C). The lab checks the average model: a source D·Vin, an inductor resistance of 0.1 Ω, and the load. That operating point does not draw the switching edge.
- Worked example: Від 24 В шпаруватість 0.208333. Від 18 В 0.277778. Добуток 24·5/24 = 5 В, і 18·5/18 = 5 В.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — поставити D = Vin/Vout і отримати шпаруватість більшу за одиницю.
- Laboratory: Сервер перевіряє середню напругу при 5 Ом і при 50 Ом, застрягле джерело 12 В і опір котушки 1 Ом. Пульсацію і провал за 10 мкс перевіряє числом. / The server checks the average voltage at 5 Ω and at 50 Ω, a stuck 12 V source, and an inductor resistance of 1 Ω. Ripple and the sag over 10 µs are checked as numbers.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold is 1.0: every item on the served form is required.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-60 `ee-60-project-three-phase`

- Titles: Проєкт: трифазне коло і еквівалент двигуна / Project: a three-phase circuit and a motor equivalent
- Prerequisites: Лінійна і фазна напруга, потужність трифазного кола і комплексний опір. / Line and phase voltage, three-phase power, and a complex impedance.
- Lesson topics:
1. Що саме означають 3 кВт / What the 3 kW actually are
2. Фаза, лінія і спад / Phase, line, and drop
3. Одна фаза на сервері / One phase on the server
4. Компенсація до 0,95 / Compensation to 0.95
5. Обрив фази і межа звіту / An open phase and the limit of the report
- Observable results: Учень відділяє електричні 3 кВт при коефіцієнті 0,75 від механічної потужності, рахує струм, опір фази, спад на лінії, компенсацію до 0,95 і струм нейтралі при обриві однієї фази. / The learner separates an electrical 3 kW at a factor of 0.75 from mechanical power, and computes the current, the phase impedance, the line drop, compensation to 0.95, and the neutral current when one phase is open.
- Formula and model limit: S = 3000/0,75 = 4000 ВА. Струм лінії S/(400·√3). Фазний опір 40 Ом: 30 Ом і √(40²−30²). Компенсація до 0,95 забирає різницю реактивних потужностей. Лабораторія — одна фаза цього еквівалента на 50 Гц, без лінії і без вала. / S = 3000/0.75 = 4000 VA. The line current is S/(400·√3). The phase impedance is 40 Ω: 30 Ω and √(40²−30²). Compensation to 0.95 removes the difference of the reactive powers. The lab is one phase of this equivalent at 50 Hz, with no line and no shaft.
- Worked example: Повна потужність 4000 ВА. Струм лінії 5.773503 А. Фазна напруга 230.940108 В. Опір фази 40 Ом.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — поділити 3 кВт на кутову швидкість і назвати результат моментом цього еквівалента.
- Laboratory: Сервер міряє модуль напруги на 30 Ом однієї фази, підстановку 40 Ом замість 30 Ом і обрив. Конденсатор компенсації і лінію 0,4+j0,3 перевіряє числом. / The server measures the magnitude of the voltage on 30 Ω of one phase, the substitution of 40 Ω for 30 Ω, and an open. The compensation capacitor and the 0.4+j0.3 line are checked as numbers.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold is 1.0: every item on the served form is required.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

### ee-09 `ee-09-dividers-loaded`

- Titles: Навантажений дільник / The loaded divider
- Prerequisites: Послідовне і паралельне з'єднання, закон Ома, потужність резистора. / Series and parallel connections, Ohm's law, and resistor power.
- Lesson topics:
1. Ненавантажений дільник / Unloaded divider
2. Те саме коло з навантаженням / The same circuit with a load
3. Вибір плечей під задані 5 В / Choosing arms for a required 5 V
4. Переставлені плечі / Arms swapped
5. Дільник струму / Current divider
- Observable results: Учень рахує ненавантажений і навантажений дільник, обирає опори під задану напругу і бачить обрив або перестановку плечей. / The learner calculates an unloaded and a loaded divider, picks resistors for a required voltage, and recognises an open or a swapped arm.
- Formula and model limit: Без навантаження Vout = Vin·R2/(R1+R2). З навантаженням нижнє плече замінюють на R2 паралельно RL. / Unloaded, Vout = Vin·R2/(R1+R2). With a load, the lower arm becomes R2 in parallel with RL.
- Worked example: Зверху 2000 Ом, знизу 3000 Ом, джерело 10 В. Сума 5000 Ом. Струм 0.002 А. Вихід 6 В, на верхньому плечі 4 В.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson; exam forms A and B have ten items and at most four multiple-choice items.
- Characteristic mistake: Помилка — порівну поділити 10 В, хоча плечі 2 кОм і 3 кОм не рівні, або застосувати цю формулу вже після підключення навантаження.
- Laboratory: Урок 1 містить лабораторну схему ненавантаженого дільника 10 В, 2 кОм і 3 кОм. Сервер перевіряє напругу вузла out. / Lesson 1 contains the unloaded divider lab: 10 V, 2 kΩ and 3 kΩ. The server checks the voltage at node out.
- Exam matrix: six calculations plus four interpretation or diagnosis items on each form. Pass threshold stays 0.7.
- Sources: Ідеальна зосереджена модель для навчання. Одиниці зіставлено з брошурою SI (BIPM). Числа є навчальним прикладом, а не виміром конкретного виробу.

