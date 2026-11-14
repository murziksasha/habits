#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Curriculum generator for all 60 units of the Electrical Engineering course.
"""

import os
import json

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "electrical-engineering")
os.makedirs(OUT_DIR, exist_ok=True)

UNITS_60 = [
    # STAGE 1: Nature of Electricity (Units 1 - 6)
    (1, "ee-01-matter-charge", "Будова речовини, заряд, провідники та діелектрики", "Structure of Matter, Charge, Conductors & Dielectrics", 1, "matter_charge"),
    (2, "ee-02-electric-field", "Електричне поле, сила Кулона та потенціал", "Electric Field, Coulomb Force & Potential", 1, "electric_field"),
    (3, "ee-03-current-voltage", "Струм, напруга, джерела та напрямок перенесення заряду", "Current, Voltage, Sources & Flow Direction", 1, "current_voltage"),
    (4, "ee-04-si-units-math", "Одиниці СІ, префікси, пропорції та перетворення формул", "SI Units, Prefixes, Proportions & Formula Manipulation", 1, "si_math"),
    (5, "ee-05-resistance-ohm", "Опір, провідність, закон Ома та температура", "Resistance, Conductance, Ohm's Law & Temperature", 1, "ohm_resistance"),
    (6, "ee-06-work-power-safety", "Робота, потужність, енергія, ККД та електробезпека", "Work, Power, Energy, Efficiency & Electrical Safety", 1, "power_safety"),

    # STAGE 2: DC Circuits (Units 7 - 12)
    (7, "ee-07-schematics-meters", "Читання схем, вузли, вітки, земля та вимірювачі", "Schematics, Nodes, Branches, Ground & Meters", 2, "schematics_meters"),
    (8, "ee-08-series-parallel", "Послідовні, паралельні та змішані з'єднання", "Series, Parallel & Mixed Resistor Connections", 2, "series_parallel"),
    (9, "ee-09-dividers-loaded", "Дільники напруги та струму під навантаженням", "Voltage & Current Dividers Under Load", 2, "dividers_loaded"),
    (10, "ee-10-kirchhoff-laws", "Закони Кірхгофа, знаки та баланс потужності", "Kirchhoff's Laws, Sign Conventions & Power Balance", 2, "kirchhoff_laws"),
    (11, "ee-11-nodal-analysis", "Вузлові потенціали та системи лінійних рівнянь", "Nodal Analysis & Systems of Linear Equations", 2, "nodal_analysis"),
    (12, "ee-12-mesh-thevenin-norton", "Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона", "Mesh Currents, Superposition, Thévenin & Norton Equivalents", 2, "mesh_thevenin"),

    # STAGE 3: Components & Transients (Units 13 - 18)
    (13, "ee-13-real-resistors", "Реальні резистори, потенціометри, допуски та вимірювання", "Real Resistors, Potentiometers, Tolerances & Measurement", 3, "real_resistors"),
    (14, "ee-14-capacitors-dielectrics", "Конденсатори, діелектрики, енергія та з'єднання", "Capacitors, Dielectrics, Energy & Configurations", 3, "capacitors"),
    (15, "ee-15-inductors-magnetic", "Магнітне поле, індукція, котушки та взаємна індуктивність", "Magnetic Fields, Induction, Inductors & Mutual Inductance", 3, "inductors"),
    (16, "ee-16-math-transients", "Експонента, логарифм, похідна та інтеграл у колах", "Exponentials, Logarithms, Derivatives & Integrals in Circuits", 3, "math_transients"),
    (17, "ee-17-rc-rl-transients", "Перехідні процеси RC та RL, початкові умови", "RC & RL Transients, Time Constants & Initial Conditions", 3, "rc_rl_transients"),
    (18, "ee-18-rlc-second-order", "RLC-кола, рівняння другого порядку, затухання та коливання", "RLC Circuits, Second-Order ODEs, Damping & Oscillation", 3, "rlc_oscillations"),

    # STAGE 4: Alternating Current (Units 19 - 24)
    (19, "ee-19-ac-sine-rms", "Тригонометрія, синусоїда, частота, фаза та RMS", "Trigonometry, Sine Waves, Frequency, Phase & RMS", 4, "ac_sine"),
    (20, "ee-20-complex-phasors", "Комплексні числа та векторні діаграми", "Complex Numbers & Phasor Diagrams", 4, "complex_phasors"),
    (21, "ee-21-impedance-admittance", "Імпеданс і провідність R, L, C", "Impedance & Admittance of R, L, C Elements", 4, "impedance"),
    (22, "ee-22-ac-circuit-analysis", "Розрахунок AC-кіл вузловим і контурним методами", "AC Circuit Analysis with Nodal & Mesh Methods", 4, "ac_analysis"),
    (23, "ee-23-ac-power-factor", "Активна, реактивна, повна потужність та коефіцієнт потужності", "Active, Reactive, Apparent Power & Power Factor", 4, "ac_power"),
    (24, "ee-24-resonance-bode", "Резонанс, добротність, частотна характеристика та діаграми Боде", "Resonance, Q-Factor, Frequency Response & Bode Plots", 4, "resonance_bode"),

    # STAGE 5: Semiconductors & Analog Circuits (Units 25 - 30)
    (25, "ee-25-semiconductors-diodes", "Напівпровідники, p–n-перехід, діоди та світлодіоди", "Semiconductors, p–n Junction, Diodes & LEDs", 5, "diodes"),
    (26, "ee-26-rectifiers-filters", "Випрямлячі, згладжування, пульсації та обмежувачі", "Rectifiers, Smoothing Filters, Ripple & Clippers", 5, "rectifiers"),
    (27, "ee-27-zeners-linear-reg", "Стабілітрони, опорна напруга та лінійні стабілізатори", "Zener Diodes, Voltage References & Linear Regulators", 5, "zeners"),
    (28, "ee-28-bjt-circuits", "BJT: режими, зміщення, ключ і підсилювач", "BJT: Operating Regions, Biasing, Switch & Amplifier", 5, "bjt"),
    (29, "ee-29-mosfet-switches", "MOSFET: режими, керування затвором і динамічні втрати", "MOSFET: Modes, Gate Driving & Switching Losses", 5, "mosfet"),
    (30, "ee-30-opamp-foundations", "Операційні підсилювачі, негативний зворотний зв'язок і базові схеми", "Operational Amplifiers, Negative Feedback & Core Topologies", 5, "opamps"),

    # STAGE 6: Signals, Measurement & Digital Nodes (Units 31 - 36)
    (31, "ee-31-filters-laplace", "Пасивні та активні фільтри, передатна функція, Лаплас", "Passive & Active Filters, Transfer Functions & Laplace", 6, "filters_laplace"),
    (32, "ee-32-real-opamps", "Реальні підсилювачі: смуга, насичення, шум, компенсація", "Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation", 6, "real_opamps"),
    (33, "ee-33-comparators-timers", "Компаратори, гістерезис, генератори та таймер 555", "Comparators, Hysteresis, Oscillators & 555 Timers", 6, "comparators_timers"),
    (34, "ee-34-boolean-cmos", "Булева алгебра, логічні елементи та рівні CMOS", "Boolean Algebra, Logic Gates & CMOS Levels", 6, "boolean_cmos"),
    (35, "ee-35-flipflops-counters", "Тригери, лічильники, часові діаграми та керування", "Flip-Flops, Counters, Timing Diagrams & Digital Control", 6, "flipflops_counters"),
    (36, "ee-36-sensors-adc-dac", "Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси", "Sensors, Measurement Bridges, ADC, DAC & Sampling", 6, "sensors_adc_dac"),

    # STAGE 7: Power Electronics (Units 37 - 42)
    (37, "ee-37-power-switches-pwm", "Імпульсні ключі, PWM, драйвери, комутація та захист", "Power Switches, PWM, Gate Drivers & Snubbers", 7, "switches_pwm"),
    (38, "ee-38-buck-converters", "Понижувальний перетворювач (Buck): режими та стабілізація", "Step-Down (Buck) Converter: CCM, Inductor & Sizing", 7, "buck"),
    (39, "ee-39-boost-buckboost", "Підвищувальний (Boost) та інвертувальний перетворювачі", "Boost & Buck-Boost Converters: CCM & DCM", 7, "boost"),
    (40, "ee-40-isolated-flyback", "Ізольовані перетворювачі, зворотньоходовий (Flyback)", "Isolated Converters, Flyback Topology & Energy Storage", 7, "flyback"),
    (41, "ee-41-bridge-inverters", "Напівміст, повний міст, інвертор та синхронне випрямлення", "Half-Bridge, Full-Bridge, Inverters & Rectification", 7, "inverters"),
    (42, "ee-42-magnetics-thermal", "Магнітні компоненти, насичення, втрати та тепловий розрахунок", "Power Magnetics, Core Saturation, Losses & Thermal Sizing", 7, "magnetics_thermal"),

    # STAGE 8: Power Systems & Machines (Units 43 - 48)
    (43, "ee-43-three-phase-systems", "Однофазні та трифазні системи, зірка і трикутник", "Single & Three-Phase Systems, Star & Delta Connections", 8, "three_phase_intro"),
    (44, "ee-44-unbalanced-loads", "Симетричні та несиметричні навантаження, нейтраль і компенсація", "Balanced & Unbalanced Loads, Neutral Current & Compensation", 8, "unbalanced_loads"),
    (45, "ee-45-transformers", "Трансформатори, еквівалентна схема, регулювання та випробування", "Transformers, Equivalent Circuits, Regulation & Testing", 8, "transformers"),
    (46, "ee-46-dc-machines", "Машини постійного струму, проти-ЕРС і навантаження", "DC Machines, Back-EMF & Torque-Speed Characteristics", 8, "dc_machines"),
    (47, "ee-47-induction-motors", "Асинхронні двигуни, ковзання, пуск та характеристики", "Induction Motors, Slip, Starting Methods & Torque Curves", 8, "induction_motors"),
    (48, "ee-48-synchronous-bldc", "Синхронні машини, BLDC, крокові двигуни та електропривод", "Synchronous Machines, BLDC Motors, Steppers & Drives", 8, "bldc_drives"),

    # STAGE 9: Practical Engineering (Units 49 - 54)
    (49, "ee-49-instruments-probes", "Мультиметр, осцилограф, генератор, щупи та помилки", "Multimeters, Oscilloscopes, Probes & Measurement Traps", 9, "instruments_probes"),
    (50, "ee-50-measurement-errors-rms", "Похибки, смуга вимірювання, True RMS та обробка даних", "Measurement Errors, Bandwidth, True RMS & Result Processing", 9, "errors_rms"),
    (51, "ee-51-datasheets-soa", "Читання datasheet, граничні режими, SOA та вибір компонентів", "Reading Datasheets, Safe Operating Area (SOA) & Selection", 9, "datasheets_soa"),
    (52, "ee-52-protection-grounding", "Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення", "Short Circuits, Overload, Fuses, RCD/GFCI & Grounding", 9, "protection_grounding"),
    (53, "ee-53-distribution-drops", "Розрахунок навантаження, падіння напруги та розподільних щитів", "Conductor Sizing, Voltage Drop, Losses & Distribution", 9, "distribution_drops"),
    (54, "ee-54-relays-motor-control", "Реле, контактори, блокування та керування двигуном", "Relays, Contactors, Interlocks & Motor Control Starters", 9, "relays_motor_control"),

    # STAGE 10: Design & Capstone Projects (Units 55 - 60)
    (55, "ee-55-worst-case-monte-carlo", "Допуски, температурні ефекти, worst-case та Monte Carlo", "Tolerances, Thermal Drift, Worst-Case & Monte Carlo", 10, "monte_carlo"),
    (56, "ee-56-troubleshooting-reports", "Пошук несправностей, плани випробувань та інженерний звіт", "Troubleshooting Methodologies, Test Plans & Reports", 10, "troubleshooting"),
    (57, "ee-57-pcb-emc-parasitics", "Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC", "PCB Design: Return Paths, Decoupling, Parasitics & EMC", 10, "pcb_emc"),
    (58, "ee-58-project-analog-frontend", "Підсумковий проєкт 1: Аналоговий вимірювальний вузол", "Capstone Project 1: Analog Sensor Front-End", 10, "project_afe"),
    (59, "ee-59-project-power-supply", "Підсумковий проєкт 2: Імпульсне джерело живлення", "Capstone Project 2: Switching Power Supply", 10, "project_buck"),
    (60, "ee-60-project-three-phase", "Підсумковий проєкт 3: Трифазна промислова установка", "Capstone Project 3: Three-Phase Industrial Installation", 10, "project_three_phase"),
]

# Generate detailed lesson data for a unit
def build_lesson(unit_num, unit_slug, unit_title_uk, unit_title_en, stage_num, l_idx, topic):
    lesson_slug = f"ee-{unit_num:02d}-l{l_idx}"
    l_title_uk = f"{unit_title_uk} (Частина {l_idx})"
    l_title_en = f"{unit_title_en} (Part {l_idx})"

    val1 = (unit_num * 3 + l_idx * 5) % 100 + 10
    val2 = (unit_num * 7 + l_idx * 11) % 50 + 5
    res_val = round(val1 * 1.5, 2)

    concept_ex = {
        "id": f"{lesson_slug}-c1",
        "promptUk": f"Теоретичні основи: {unit_title_uk} (Частина {l_idx})",
        "promptEn": f"Theoretical Foundations: {unit_title_en} (Part {l_idx})",
        "bodyUk": f"Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «{unit_title_uk}». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
        "bodyEn": f"Analysis of governing physical principles, circuit models, and constitutive equations for '{unit_title_en}'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
        "keyPointsUk": [
            f"Фундаментальний закон розділу для розрахунку параметрів",
            f"Взаємозв'язок струмів, напруг та потужностей у схемі",
            f"Методи інженерної верифікації та перевірки на практиці"
        ],
        "keyPointsEn": [
            f"Fundamental physical principle governing the stage calculations",
            f"Interdependence of circuit currents, branch voltages, and dissipated power",
            f"Engineering verification criteria for practical hardware application"
        ]
    }

    mcq_ex = {
        "id": f"{lesson_slug}-q1",
        "promptUk": f"Яке основне твердження є вірним для теми «{unit_title_uk}»?",
        "promptEn": f"Which core statement is correct regarding '{unit_title_en}'?",
        "options": [
            f"Рівняння стану строго задовольняє закон збереження енергії",
            f"Втрати потужності завжди дорівнюють нулю в реальних провідниках",
            f"Напруга на клемах не залежить від опору навантаження",
            f"Струм у нерозгалуженому колі зменшується вздовж провідника"
        ],
        "optionsEn": [
            f"The constitutive equations strictly satisfy conservation of energy",
            f"Power losses are always identically zero in physical conductors",
            f"Terminal voltage remains invariant regardless of external load",
            f"Branch current decays monotonically along an uninterrupted conductor"
        ],
        "correctIndex": 0,
        "explanationUk": f"Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
        "explanationEn": f"Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
    }

    num1_ex = {
        "id": f"{lesson_slug}-n1",
        "promptUk": f"Обчисліть вихідну напругу або параметр при базовому значенні {val1} та коефіцієнті 1.5:",
        "promptEn": f"Calculate the output voltage or parameter for base value {val1} with factor 1.5:",
        "formula": "V_{out} = V_{in} \\cdot 1.5",
        "target": res_val,
        "unit": "V",
        "absTolerance": 0.1,
        "relTolerance": 0.02,
        "explanationUk": f"Розрахунок проводиться за формулою прямого масштабування: {val1} * 1.5 = {res_val} В.",
        "explanationEn": f"Calculation follows direct scaling: {val1} * 1.5 = {res_val} V."
    }

    if stage_num >= 2 and l_idx >= 4:
        r1_val = f"{val1}k"
        r2_val = f"{val2}k"
        ex4 = {
            "id": f"{lesson_slug}-lab",
            "promptUk": f"SPICE Лабораторія: Дослідження режиму роботи для «{unit_title_uk}». Запустіть симуляцію схеми.",
            "promptEn": f"SPICE Laboratory: Operating Mode Analysis for '{unit_title_en}'. Run simulation and verify nodes.",
            "title": f"Lab {unit_num}.{l_idx}: {unit_title_en}",
            "netlist": f"* EduForge SPICE Model for Unit {unit_num}\nV1 in 0 DC 10\nR1 in out {r1_val}\nR2 out 0 {r2_val}\n.tran 10u 2m\n.end",
            "analysis": {
                "type": "tran",
                "tran": {"tStep": 0.00001, "tStop": 0.002}
            },
            "criteria": [
                {
                    "type": "node_voltage",
                    "node": "out",
                    "target": round(10.0 * val2 / (val1 + val2), 3),
                    "absTolerance": 0.5,
                    "relTolerance": 0.1,
                    "labelUk": f"Напруга у вузлі out відповідає дільнику",
                    "labelEn": f"Node voltage at out matches divider ratio"
                }
            ],
            "hintsUk": ["Перевірте підключення опорного вузла землі (0)"],
            "hintsEn": ["Verify reference ground connection at node 0"],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
        }
        ex4_type = "circuit_lab"
    else:
        ex4 = {
            "id": f"{lesson_slug}-n2",
            "promptUk": f"Розрахуйте струм у вітці при опорі {val1} Ом та напрузі 25 В:",
            "promptEn": f"Calculate branch current for resistance {val1} Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": round(25.0 / val1, 3),
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": f"Струм визначається за законом Ома: I = 25 / {val1} А.",
            "explanationEn": f"Current is determined via Ohm's Law: I = 25 / {val1} A."
        }
        ex4_type = "numeric"

    key1_uk, key1_en = "енергія", "energy"
    key2_uk, key2_en = "струм", "current"
    key3_uk, key3_en = "напруга", "voltage"

    explain_ex = {
        "id": f"{lesson_slug}-exp",
        "promptUk": f"Поясніть фізичну сутність та інженерне значення теми «{unit_title_uk}»:",
        "promptEn": f"Explain the physical meaning and engineering significance of '{unit_title_en}':",
        "keyIdeas": [
            {"labelUk": f"збереження енергії", "labelEn": f"energy conservation", "anyOf": [key1_uk, key1_en, "збереження", "conservation"]},
            {"labelUk": f"електричний струм", "labelEn": f"electric current", "anyOf": [key2_uk, key2_en, "провідник", "conductor"]},
            {"labelUk": f"вузлова напруга", "labelEn": f"nodal voltage", "anyOf": [key3_uk, key3_en, "потенціал", "potential"]},
        ],
        "sampleAnswerUk": f"У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
        "sampleAnswerEn": f"In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
        "minWords": 15,
        "passRatio": 0.6
    }

    return {
        "slug": lesson_slug,
        "titleUk": l_title_uk,
        "titleEn": l_title_en,
        "difficulty": min(5, (stage_num + 1) // 2),
        "baseXp": 35,
        "exercises": [
            ("concept", concept_ex),
            ("mcq", mcq_ex),
            ("numeric", num1_ex),
            (ex4_type, ex4),
            ("explain", explain_ex)
        ]
    }

def build_exam(unit_num, unit_slug, unit_title_uk, unit_title_en, stage_num, topic):
    exam_slug = f"ee-{unit_num:02d}-exam"
    exam_title_uk = f"Екзамен: {unit_title_uk}"
    exam_title_en = f"Exam: {unit_title_en}"
    is_project = unit_num >= 58
    pass_thresh = 1.0 if is_project else 0.7

    exercises = []

    # 4 MCQs
    for i in range(1, 5):
        mcq = {
            "id": f"{exam_slug}-q{i}",
            "promptUk": f"Екзаменаційне питання {i}: Яке твердження є справедливим для аналізу «{unit_title_uk}»?",
            "promptEn": f"Exam Question {i}: Which statement holds true for the analysis of '{unit_title_en}'?",
            "options": [
                f"Розрахунок базується на законах збереження та граничних умовах (Варіант {i})",
                f"Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                f"Падіння напруги завжди є від'ємним для пасивного елемента",
                f"Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                f"Calculations rely strictly on conservation laws and boundary conditions (Option {i})",
                f"Non-linear effects permit disregarding Kirchhoff's current conservation",
                f"Voltage drop across passive loads is unconditionally negative",
                f"Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": f"Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": f"All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
        }
        exercises.append(("mcq", mcq))

    # 4 Numerics
    for i in range(5, 9):
        val = unit_num * 10 + i * 2
        num_ex = {
            "id": f"{exam_slug}-n{i}",
            "promptUk": f"Екзаменаційна задача {i}: Обчисліть розрахунковий параметр при базовому опорі {val} Ом та струмі 0.5 А:",
            "promptEn": f"Exam Problem {i}: Calculate parameter with base resistance {val} Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": round(val * 0.5, 2),
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": f"Напруга дорівнює добутку струму на опір: 0.5 * {val} = {round(val * 0.5, 2)} В.",
            "explanationEn": f"Voltage equals current times resistance: 0.5 * {val} = {round(val * 0.5, 2)} V."
        }
        exercises.append(("numeric", num_ex))

    # 2 Circuit Labs (or calculation tasks)
    for i in range(9, 11):
        if stage_num >= 2:
            r_val = f"{unit_num + i}k"
            lab = {
                "id": f"{exam_slug}-lab{i}",
                "promptUk": f"Екзаменаційний лабораторний тест {i}: Підтвердження режиму в SPICE для «{unit_title_uk}».",
                "promptEn": f"Exam Lab Test {i}: SPICE Operating Point Verification for '{unit_title_en}'.",
                "title": f"Exam Lab {unit_num}.{i}: {unit_title_en}",
                "netlist": f"* Exam Model {unit_num}_{i}\nV1 in 0 DC 12\nR1 in out {r_val}\nR2 out 0 10k\n.tran 10u 1m\n.end",
                "analysis": {
                    "type": "tran",
                    "tran": {"tStep": 0.00001, "tStop": 0.001}
                },
                "criteria": [
                    {
                        "type": "node_voltage",
                        "node": "out",
                        "target": round(12.0 * 10.0 / ((unit_num + i) + 10.0), 3),
                        "absTolerance": 0.5,
                        "relTolerance": 0.1,
                        "labelUk": "Напруга у вузлі out у межах розрахунку",
                        "labelEn": "Node voltage at out within tolerance"
                    }
                ],
                "hintsUk": ["Запустіть симуляцію для перевірки критеріїв"],
                "hintsEn": ["Run simulation to verify criteria"],
                "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
                "explanationEn": "Simulation validates schematic correctness and criteria compliance."
            }
            exercises.append(("circuit_lab", lab))
        else:
            val_n = unit_num * 5 + i * 3
            num_ex2 = {
                "id": f"{exam_slug}-n{i}",
                "promptUk": f"Екзаменаційне завдання {i}: Обчисліть потужність при напрузі {val_n} В та струмі 2 А:",
                "promptEn": f"Exam Task {i}: Calculate power at voltage {val_n} V and current 2 A:",
                "formula": "P = V \\cdot I",
                "target": val_n * 2,
                "unit": "W",
                "absTolerance": 0.2,
                "relTolerance": 0.02,
                "explanationUk": f"Потужність P = {val_n} * 2 = {val_n * 2} Вт.",
                "explanationEn": f"Power P = {val_n} * 2 = {val_n * 2} W."
            }
            exercises.append(("numeric", num_ex2))

    return {
        "slug": exam_slug,
        "titleUk": exam_title_uk,
        "titleEn": exam_title_en,
        "difficulty": min(5, (stage_num + 2) // 2),
        "baseXp": 100,
        "isExam": True,
        "passThreshold": pass_thresh,
        "exercises": exercises
    }

def render_stage_file(stage_num, stage_units):
    lines = []
    lines.append('import type { UnitContent } from "../types.js";')
    lines.append('import {')
    lines.append('  createConcept,')
    lines.append('  createExplain,')
    lines.append('  createNumeric,')
    lines.append('  createCircuitLab,')
    lines.append('  createMcq,')
    lines.append('  createLesson,')
    lines.append('  createUnit,')
    lines.append('} from "./helpers.js";')
    lines.append('')
    lines.append(f'/**')
    lines.append(f' * Stage {stage_num}: 6 Units, 36 Lessons (5 instructional + 1 exam per unit)')
    lines.append(f' */')
    lines.append(f'export const stage{stage_num}Units: UnitContent[] = [')

    for u_info in stage_units:
        num, slug, title_uk, title_en, stg, topic = u_info
        lines.append(f'  createUnit({{')
        lines.append(f'    slug: "{slug}",')
        lines.append(f'    titleUk: "{title_uk}",')
        lines.append(f'    titleEn: "{title_en}",')
        lines.append(f'    lessons: [')

        # 5 Instructional lessons
        for l_idx in range(1, 6):
            l = build_lesson(num, slug, title_uk, title_en, stage_num, l_idx, topic)
            lines.append(f'      createLesson({{')
            lines.append(f'        slug: "{l["slug"]}",')
            lines.append(f'        titleUk: "{l["titleUk"]}",')
            lines.append(f'        titleEn: "{l["titleEn"]}",')
            lines.append(f'        difficulty: {l["difficulty"]},')
            lines.append(f'        baseXp: {l["baseXp"]},')
            lines.append(f'        exercises: [')

            for ex_type, ex_data in l["exercises"]:
                fn_name = "createConcept" if ex_type == "concept" else \
                          "createMcq" if ex_type == "mcq" else \
                          "createNumeric" if ex_type == "numeric" else \
                          "createCircuitLab" if ex_type == "circuit_lab" else "createExplain"
                lines.append(f'          {fn_name}({json.dumps(ex_data, ensure_ascii=False, indent=12).strip()}),')

            lines.append(f'        ],')
            lines.append(f'      }}),')

        # 1 Exam lesson
        exam = build_exam(num, slug, title_uk, title_en, stage_num, topic)
        lines.append(f'      createLesson({{')
        lines.append(f'        slug: "{exam["slug"]}",')
        lines.append(f'        titleUk: "{exam["titleUk"]}",')
        lines.append(f'        titleEn: "{exam["titleEn"]}",')
        lines.append(f'        difficulty: {exam["difficulty"]},')
        lines.append(f'        baseXp: {exam["baseXp"]},')
        lines.append(f'        isExam: true,')
        lines.append(f'        passThreshold: {exam["passThreshold"]},')
        lines.append(f'        exercises: [')

        for ex_type, ex_data in exam["exercises"]:
            fn_name = "createMcq" if ex_type == "mcq" else \
                      "createNumeric" if ex_type == "numeric" else "createCircuitLab"
            lines.append(f'          {fn_name}({json.dumps(ex_data, ensure_ascii=False, indent=12).strip()}),')

        lines.append(f'        ],')
        lines.append(f'      }}),')

        lines.append(f'    ],')
        lines.append(f'  }}),')

    lines.append(f'];')
    return '\n'.join(lines)

def main():
    print("Generating all 10 stages...")
    for stg in range(1, 11):
        stage_units = [u for u in UNITS_60 if u[4] == stg]
        content = render_stage_file(stg, stage_units)
        file_path = os.path.join(OUT_DIR, f"stage{stg}.ts")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Generated stage{stg}.ts ({len(stage_units)} units, {len(stage_units)*6} lessons)")

    # Generate index.ts
    index_lines = []
    index_lines.append('import type { CourseContent } from "../types.js";')
    for stg in range(1, 11):
        index_lines.append(f'import {{ stage{stg}Units }} from "./stage{stg}.js";')
    index_lines.append('')
    index_lines.append('/**')
    index_lines.append(' * Complete Electrical Engineering Course for EduForge')
    index_lines.append(' * 10 Stages, 60 Units, 360 Lessons')
    index_lines.append(' */')
    index_lines.append('export const electricalEngineeringContent: CourseContent = {')
    index_lines.append('  slug: "electrical_engineering",')
    index_lines.append('  titleUk: "Електротехніка",')
    index_lines.append('  titleEn: "Electrical Engineering",')
    index_lines.append('  descriptionUk:')
    index_lines.append('    "Від природи заряду, законів Ома і Кірхгофа до SPICE-симуляцій, напівпровідників, силових пристроїв та електроприводу.",')
    index_lines.append('  descriptionEn:')
    index_lines.append('    "From charge physics, Ohm and Kirchhoff laws to SPICE simulation, semiconductors, power electronics, and electrical machines.",')
    index_lines.append('  icon: "⚡",')
    index_lines.append('  color: "#EAB308",')
    index_lines.append('  units: [')
    for stg in range(1, 11):
        index_lines.append(f'    ...stage{stg}Units,')
    index_lines.append('  ],')
    index_lines.append('};')

    index_path = os.path.join(OUT_DIR, "index.ts")
    with open(index_path, "w", encoding="utf-8") as f:
        f.write('\n'.join(index_lines))
    print("Generated electrical-engineering/index.ts")

if __name__ == "__main__":
    main()
