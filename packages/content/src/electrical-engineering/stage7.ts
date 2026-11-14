import type { UnitContent } from "../types.js";
import {
  createConcept,
  createExplain,
  createNumeric,
  createCircuitLab,
  createMcq,
  createLesson,
  createUnit,
} from "./helpers.js";

/**
 * Stage 7: 6 Units, 36 Lessons (5 instructional + 1 exam per unit)
 */
export const stage7Units: UnitContent[] = [
  createUnit({
    slug: "ee-37-power-switches-pwm",
    titleUk: "Імпульсні ключі, PWM, драйвери, комутація та захист",
    titleEn: "Power Switches, PWM, Gate Drivers & Snubbers",
    lessons: [
      createLesson({
        slug: "ee-37-l1",
        titleUk: "Імпульсні ключі, PWM, драйвери, комутація та захист (Частина 1)",
        titleEn: "Power Switches, PWM, Gate Drivers & Snubbers (Part 1)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-37-l1-c1",
            "promptUk": "Теоретичні основи: Імпульсні ключі, PWM, драйвери, комутація та захист (Частина 1)",
            "promptEn": "Theoretical Foundations: Power Switches, PWM, Gate Drivers & Snubbers (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Імпульсні ключі, PWM, драйвери, комутація та захист». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Power Switches, PWM, Gate Drivers & Snubbers'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-37-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Імпульсні ключі, PWM, драйвери, комутація та захист»?",
            "promptEn": "Which core statement is correct regarding 'Power Switches, PWM, Gate Drivers & Snubbers'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-37-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 26 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 26 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 39.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 26 * 1.5 = 39.0 В.",
            "explanationEn": "Calculation follows direct scaling: 26 * 1.5 = 39.0 V."
}),
          createNumeric({
            "id": "ee-37-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 26 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 26 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.962,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 26 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 26 A."
}),
          createExplain({
            "id": "ee-37-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Імпульсні ключі, PWM, драйвери, комутація та захист»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Power Switches, PWM, Gate Drivers & Snubbers':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-37-l2",
        titleUk: "Імпульсні ключі, PWM, драйвери, комутація та захист (Частина 2)",
        titleEn: "Power Switches, PWM, Gate Drivers & Snubbers (Part 2)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-37-l2-c1",
            "promptUk": "Теоретичні основи: Імпульсні ключі, PWM, драйвери, комутація та захист (Частина 2)",
            "promptEn": "Theoretical Foundations: Power Switches, PWM, Gate Drivers & Snubbers (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Імпульсні ключі, PWM, драйвери, комутація та захист». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Power Switches, PWM, Gate Drivers & Snubbers'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-37-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Імпульсні ключі, PWM, драйвери, комутація та захист»?",
            "promptEn": "Which core statement is correct regarding 'Power Switches, PWM, Gate Drivers & Snubbers'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-37-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 31 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 31 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 46.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 31 * 1.5 = 46.5 В.",
            "explanationEn": "Calculation follows direct scaling: 31 * 1.5 = 46.5 V."
}),
          createNumeric({
            "id": "ee-37-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 31 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 31 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.806,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 31 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 31 A."
}),
          createExplain({
            "id": "ee-37-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Імпульсні ключі, PWM, драйвери, комутація та захист»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Power Switches, PWM, Gate Drivers & Snubbers':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-37-l3",
        titleUk: "Імпульсні ключі, PWM, драйвери, комутація та захист (Частина 3)",
        titleEn: "Power Switches, PWM, Gate Drivers & Snubbers (Part 3)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-37-l3-c1",
            "promptUk": "Теоретичні основи: Імпульсні ключі, PWM, драйвери, комутація та захист (Частина 3)",
            "promptEn": "Theoretical Foundations: Power Switches, PWM, Gate Drivers & Snubbers (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Імпульсні ключі, PWM, драйвери, комутація та захист». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Power Switches, PWM, Gate Drivers & Snubbers'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-37-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Імпульсні ключі, PWM, драйвери, комутація та захист»?",
            "promptEn": "Which core statement is correct regarding 'Power Switches, PWM, Gate Drivers & Snubbers'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-37-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 36 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 36 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 54.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 36 * 1.5 = 54.0 В.",
            "explanationEn": "Calculation follows direct scaling: 36 * 1.5 = 54.0 V."
}),
          createNumeric({
            "id": "ee-37-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 36 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 36 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.694,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 36 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 36 A."
}),
          createExplain({
            "id": "ee-37-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Імпульсні ключі, PWM, драйвери, комутація та захист»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Power Switches, PWM, Gate Drivers & Snubbers':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-37-l4",
        titleUk: "Імпульсні ключі, PWM, драйвери, комутація та захист (Частина 4)",
        titleEn: "Power Switches, PWM, Gate Drivers & Snubbers (Part 4)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-37-l4-c1",
            "promptUk": "Теоретичні основи: Імпульсні ключі, PWM, драйвери, комутація та захист (Частина 4)",
            "promptEn": "Theoretical Foundations: Power Switches, PWM, Gate Drivers & Snubbers (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Імпульсні ключі, PWM, драйвери, комутація та захист». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Power Switches, PWM, Gate Drivers & Snubbers'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-37-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Імпульсні ключі, PWM, драйвери, комутація та захист»?",
            "promptEn": "Which core statement is correct regarding 'Power Switches, PWM, Gate Drivers & Snubbers'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-37-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 41 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 41 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 61.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 41 * 1.5 = 61.5 В.",
            "explanationEn": "Calculation follows direct scaling: 41 * 1.5 = 61.5 V."
}),
          createCircuitLab({
            "id": "ee-37-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Імпульсні ключі, PWM, драйвери, комутація та захист». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Power Switches, PWM, Gate Drivers & Snubbers'. Run simulation and verify nodes.",
            "title": "Lab 37.4: Power Switches, PWM, Gate Drivers & Snubbers",
            "netlist": "* EduForge SPICE Model for Unit 37\nV1 in 0 DC 10\nR1 in out 41k\nR2 out 0 8k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 1.633,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-37-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Імпульсні ключі, PWM, драйвери, комутація та захист»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Power Switches, PWM, Gate Drivers & Snubbers':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-37-l5",
        titleUk: "Імпульсні ключі, PWM, драйвери, комутація та захист (Частина 5)",
        titleEn: "Power Switches, PWM, Gate Drivers & Snubbers (Part 5)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-37-l5-c1",
            "promptUk": "Теоретичні основи: Імпульсні ключі, PWM, драйвери, комутація та захист (Частина 5)",
            "promptEn": "Theoretical Foundations: Power Switches, PWM, Gate Drivers & Snubbers (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Імпульсні ключі, PWM, драйвери, комутація та захист». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Power Switches, PWM, Gate Drivers & Snubbers'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-37-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Імпульсні ключі, PWM, драйвери, комутація та захист»?",
            "promptEn": "Which core statement is correct regarding 'Power Switches, PWM, Gate Drivers & Snubbers'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-37-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 46 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 46 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 69.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 46 * 1.5 = 69.0 В.",
            "explanationEn": "Calculation follows direct scaling: 46 * 1.5 = 69.0 V."
}),
          createCircuitLab({
            "id": "ee-37-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Імпульсні ключі, PWM, драйвери, комутація та захист». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Power Switches, PWM, Gate Drivers & Snubbers'. Run simulation and verify nodes.",
            "title": "Lab 37.5: Power Switches, PWM, Gate Drivers & Snubbers",
            "netlist": "* EduForge SPICE Model for Unit 37\nV1 in 0 DC 10\nR1 in out 46k\nR2 out 0 19k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.923,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-37-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Імпульсні ключі, PWM, драйвери, комутація та захист»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Power Switches, PWM, Gate Drivers & Snubbers':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-37-exam",
        titleUk: "Екзамен: Імпульсні ключі, PWM, драйвери, комутація та захист",
        titleEn: "Exam: Power Switches, PWM, Gate Drivers & Snubbers",
        difficulty: 4,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-37-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Імпульсні ключі, PWM, драйвери, комутація та захист»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Power Switches, PWM, Gate Drivers & Snubbers'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 1)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 1)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-37-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Імпульсні ключі, PWM, драйвери, комутація та захист»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Power Switches, PWM, Gate Drivers & Snubbers'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 2)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 2)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-37-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Імпульсні ключі, PWM, драйвери, комутація та захист»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Power Switches, PWM, Gate Drivers & Snubbers'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 3)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 3)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-37-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Імпульсні ключі, PWM, драйвери, комутація та захист»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Power Switches, PWM, Gate Drivers & Snubbers'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 4)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 4)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createNumeric({
            "id": "ee-37-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 380 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 380 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 190.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 380 = 190.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 380 = 190.0 V."
}),
          createNumeric({
            "id": "ee-37-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 382 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 382 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 191.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 382 = 191.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 382 = 191.0 V."
}),
          createNumeric({
            "id": "ee-37-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 384 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 384 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 192.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 384 = 192.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 384 = 192.0 V."
}),
          createNumeric({
            "id": "ee-37-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 386 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 386 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 193.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 386 = 193.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 386 = 193.0 V."
}),
          createCircuitLab({
            "id": "ee-37-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Імпульсні ключі, PWM, драйвери, комутація та захист».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Power Switches, PWM, Gate Drivers & Snubbers'.",
            "title": "Exam Lab 37.9: Power Switches, PWM, Gate Drivers & Snubbers",
            "netlist": "* Exam Model 37_9\nV1 in 0 DC 12\nR1 in out 46k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.143,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
          createCircuitLab({
            "id": "ee-37-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Імпульсні ключі, PWM, драйвери, комутація та захист».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Power Switches, PWM, Gate Drivers & Snubbers'.",
            "title": "Exam Lab 37.10: Power Switches, PWM, Gate Drivers & Snubbers",
            "netlist": "* Exam Model 37_10\nV1 in 0 DC 12\nR1 in out 47k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.105,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
        ],
      }),
    ],
  }),
  createUnit({
    slug: "ee-38-buck-converters",
    titleUk: "Понижувальний перетворювач (Buck): режими та стабілізація",
    titleEn: "Step-Down (Buck) Converter: CCM, Inductor & Sizing",
    lessons: [
      createLesson({
        slug: "ee-38-l1",
        titleUk: "Понижувальний перетворювач (Buck): режими та стабілізація (Частина 1)",
        titleEn: "Step-Down (Buck) Converter: CCM, Inductor & Sizing (Part 1)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-38-l1-c1",
            "promptUk": "Теоретичні основи: Понижувальний перетворювач (Buck): режими та стабілізація (Частина 1)",
            "promptEn": "Theoretical Foundations: Step-Down (Buck) Converter: CCM, Inductor & Sizing (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Понижувальний перетворювач (Buck): режими та стабілізація». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Step-Down (Buck) Converter: CCM, Inductor & Sizing'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-38-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Понижувальний перетворювач (Buck): режими та стабілізація»?",
            "promptEn": "Which core statement is correct regarding 'Step-Down (Buck) Converter: CCM, Inductor & Sizing'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-38-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 29 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 29 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 43.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 29 * 1.5 = 43.5 В.",
            "explanationEn": "Calculation follows direct scaling: 29 * 1.5 = 43.5 V."
}),
          createNumeric({
            "id": "ee-38-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 29 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 29 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.862,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 29 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 29 A."
}),
          createExplain({
            "id": "ee-38-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Понижувальний перетворювач (Buck): режими та стабілізація»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Step-Down (Buck) Converter: CCM, Inductor & Sizing':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-38-l2",
        titleUk: "Понижувальний перетворювач (Buck): режими та стабілізація (Частина 2)",
        titleEn: "Step-Down (Buck) Converter: CCM, Inductor & Sizing (Part 2)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-38-l2-c1",
            "promptUk": "Теоретичні основи: Понижувальний перетворювач (Buck): режими та стабілізація (Частина 2)",
            "promptEn": "Theoretical Foundations: Step-Down (Buck) Converter: CCM, Inductor & Sizing (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Понижувальний перетворювач (Buck): режими та стабілізація». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Step-Down (Buck) Converter: CCM, Inductor & Sizing'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-38-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Понижувальний перетворювач (Buck): режими та стабілізація»?",
            "promptEn": "Which core statement is correct regarding 'Step-Down (Buck) Converter: CCM, Inductor & Sizing'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-38-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 34 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 34 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 51.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 34 * 1.5 = 51.0 В.",
            "explanationEn": "Calculation follows direct scaling: 34 * 1.5 = 51.0 V."
}),
          createNumeric({
            "id": "ee-38-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 34 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 34 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.735,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 34 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 34 A."
}),
          createExplain({
            "id": "ee-38-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Понижувальний перетворювач (Buck): режими та стабілізація»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Step-Down (Buck) Converter: CCM, Inductor & Sizing':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-38-l3",
        titleUk: "Понижувальний перетворювач (Buck): режими та стабілізація (Частина 3)",
        titleEn: "Step-Down (Buck) Converter: CCM, Inductor & Sizing (Part 3)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-38-l3-c1",
            "promptUk": "Теоретичні основи: Понижувальний перетворювач (Buck): режими та стабілізація (Частина 3)",
            "promptEn": "Theoretical Foundations: Step-Down (Buck) Converter: CCM, Inductor & Sizing (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Понижувальний перетворювач (Buck): режими та стабілізація». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Step-Down (Buck) Converter: CCM, Inductor & Sizing'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-38-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Понижувальний перетворювач (Buck): режими та стабілізація»?",
            "promptEn": "Which core statement is correct regarding 'Step-Down (Buck) Converter: CCM, Inductor & Sizing'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-38-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 39 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 39 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 58.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 39 * 1.5 = 58.5 В.",
            "explanationEn": "Calculation follows direct scaling: 39 * 1.5 = 58.5 V."
}),
          createNumeric({
            "id": "ee-38-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 39 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 39 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.641,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 39 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 39 A."
}),
          createExplain({
            "id": "ee-38-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Понижувальний перетворювач (Buck): режими та стабілізація»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Step-Down (Buck) Converter: CCM, Inductor & Sizing':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-38-l4",
        titleUk: "Понижувальний перетворювач (Buck): режими та стабілізація (Частина 4)",
        titleEn: "Step-Down (Buck) Converter: CCM, Inductor & Sizing (Part 4)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-38-l4-c1",
            "promptUk": "Теоретичні основи: Понижувальний перетворювач (Buck): режими та стабілізація (Частина 4)",
            "promptEn": "Theoretical Foundations: Step-Down (Buck) Converter: CCM, Inductor & Sizing (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Понижувальний перетворювач (Buck): режими та стабілізація». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Step-Down (Buck) Converter: CCM, Inductor & Sizing'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-38-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Понижувальний перетворювач (Buck): режими та стабілізація»?",
            "promptEn": "Which core statement is correct regarding 'Step-Down (Buck) Converter: CCM, Inductor & Sizing'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-38-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 44 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 44 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 66.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 44 * 1.5 = 66.0 В.",
            "explanationEn": "Calculation follows direct scaling: 44 * 1.5 = 66.0 V."
}),
          createCircuitLab({
            "id": "ee-38-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Понижувальний перетворювач (Buck): режими та стабілізація». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Step-Down (Buck) Converter: CCM, Inductor & Sizing'. Run simulation and verify nodes.",
            "title": "Lab 38.4: Step-Down (Buck) Converter: CCM, Inductor & Sizing",
            "netlist": "* EduForge SPICE Model for Unit 38\nV1 in 0 DC 10\nR1 in out 44k\nR2 out 0 15k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.542,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-38-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Понижувальний перетворювач (Buck): режими та стабілізація»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Step-Down (Buck) Converter: CCM, Inductor & Sizing':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-38-l5",
        titleUk: "Понижувальний перетворювач (Buck): режими та стабілізація (Частина 5)",
        titleEn: "Step-Down (Buck) Converter: CCM, Inductor & Sizing (Part 5)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-38-l5-c1",
            "promptUk": "Теоретичні основи: Понижувальний перетворювач (Buck): режими та стабілізація (Частина 5)",
            "promptEn": "Theoretical Foundations: Step-Down (Buck) Converter: CCM, Inductor & Sizing (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Понижувальний перетворювач (Buck): режими та стабілізація». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Step-Down (Buck) Converter: CCM, Inductor & Sizing'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-38-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Понижувальний перетворювач (Buck): режими та стабілізація»?",
            "promptEn": "Which core statement is correct regarding 'Step-Down (Buck) Converter: CCM, Inductor & Sizing'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-38-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 49 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 49 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 73.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 49 * 1.5 = 73.5 В.",
            "explanationEn": "Calculation follows direct scaling: 49 * 1.5 = 73.5 V."
}),
          createCircuitLab({
            "id": "ee-38-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Понижувальний перетворювач (Buck): режими та стабілізація». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Step-Down (Buck) Converter: CCM, Inductor & Sizing'. Run simulation and verify nodes.",
            "title": "Lab 38.5: Step-Down (Buck) Converter: CCM, Inductor & Sizing",
            "netlist": "* EduForge SPICE Model for Unit 38\nV1 in 0 DC 10\nR1 in out 49k\nR2 out 0 26k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 3.467,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-38-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Понижувальний перетворювач (Buck): режими та стабілізація»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Step-Down (Buck) Converter: CCM, Inductor & Sizing':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-38-exam",
        titleUk: "Екзамен: Понижувальний перетворювач (Buck): режими та стабілізація",
        titleEn: "Exam: Step-Down (Buck) Converter: CCM, Inductor & Sizing",
        difficulty: 4,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-38-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Понижувальний перетворювач (Buck): режими та стабілізація»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Step-Down (Buck) Converter: CCM, Inductor & Sizing'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 1)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 1)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-38-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Понижувальний перетворювач (Buck): режими та стабілізація»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Step-Down (Buck) Converter: CCM, Inductor & Sizing'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 2)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 2)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-38-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Понижувальний перетворювач (Buck): режими та стабілізація»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Step-Down (Buck) Converter: CCM, Inductor & Sizing'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 3)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 3)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-38-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Понижувальний перетворювач (Buck): режими та стабілізація»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Step-Down (Buck) Converter: CCM, Inductor & Sizing'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 4)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 4)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createNumeric({
            "id": "ee-38-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 390 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 390 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 195.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 390 = 195.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 390 = 195.0 V."
}),
          createNumeric({
            "id": "ee-38-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 392 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 392 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 196.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 392 = 196.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 392 = 196.0 V."
}),
          createNumeric({
            "id": "ee-38-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 394 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 394 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 197.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 394 = 197.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 394 = 197.0 V."
}),
          createNumeric({
            "id": "ee-38-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 396 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 396 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 198.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 396 = 198.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 396 = 198.0 V."
}),
          createCircuitLab({
            "id": "ee-38-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Понижувальний перетворювач (Buck): режими та стабілізація».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Step-Down (Buck) Converter: CCM, Inductor & Sizing'.",
            "title": "Exam Lab 38.9: Step-Down (Buck) Converter: CCM, Inductor & Sizing",
            "netlist": "* Exam Model 38_9\nV1 in 0 DC 12\nR1 in out 47k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.105,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
          createCircuitLab({
            "id": "ee-38-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Понижувальний перетворювач (Buck): режими та стабілізація».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Step-Down (Buck) Converter: CCM, Inductor & Sizing'.",
            "title": "Exam Lab 38.10: Step-Down (Buck) Converter: CCM, Inductor & Sizing",
            "netlist": "* Exam Model 38_10\nV1 in 0 DC 12\nR1 in out 48k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.069,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
        ],
      }),
    ],
  }),
  createUnit({
    slug: "ee-39-boost-buckboost",
    titleUk: "Підвищувальний (Boost) та інвертувальний перетворювачі",
    titleEn: "Boost & Buck-Boost Converters: CCM & DCM",
    lessons: [
      createLesson({
        slug: "ee-39-l1",
        titleUk: "Підвищувальний (Boost) та інвертувальний перетворювачі (Частина 1)",
        titleEn: "Boost & Buck-Boost Converters: CCM & DCM (Part 1)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-39-l1-c1",
            "promptUk": "Теоретичні основи: Підвищувальний (Boost) та інвертувальний перетворювачі (Частина 1)",
            "promptEn": "Theoretical Foundations: Boost & Buck-Boost Converters: CCM & DCM (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Підвищувальний (Boost) та інвертувальний перетворювачі». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Boost & Buck-Boost Converters: CCM & DCM'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-39-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Підвищувальний (Boost) та інвертувальний перетворювачі»?",
            "promptEn": "Which core statement is correct regarding 'Boost & Buck-Boost Converters: CCM & DCM'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-39-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 32 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 32 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 48.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 32 * 1.5 = 48.0 В.",
            "explanationEn": "Calculation follows direct scaling: 32 * 1.5 = 48.0 V."
}),
          createNumeric({
            "id": "ee-39-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 32 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 32 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.781,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 32 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 32 A."
}),
          createExplain({
            "id": "ee-39-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Підвищувальний (Boost) та інвертувальний перетворювачі»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Boost & Buck-Boost Converters: CCM & DCM':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-39-l2",
        titleUk: "Підвищувальний (Boost) та інвертувальний перетворювачі (Частина 2)",
        titleEn: "Boost & Buck-Boost Converters: CCM & DCM (Part 2)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-39-l2-c1",
            "promptUk": "Теоретичні основи: Підвищувальний (Boost) та інвертувальний перетворювачі (Частина 2)",
            "promptEn": "Theoretical Foundations: Boost & Buck-Boost Converters: CCM & DCM (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Підвищувальний (Boost) та інвертувальний перетворювачі». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Boost & Buck-Boost Converters: CCM & DCM'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-39-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Підвищувальний (Boost) та інвертувальний перетворювачі»?",
            "promptEn": "Which core statement is correct regarding 'Boost & Buck-Boost Converters: CCM & DCM'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-39-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 37 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 37 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 55.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 37 * 1.5 = 55.5 В.",
            "explanationEn": "Calculation follows direct scaling: 37 * 1.5 = 55.5 V."
}),
          createNumeric({
            "id": "ee-39-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 37 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 37 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.676,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 37 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 37 A."
}),
          createExplain({
            "id": "ee-39-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Підвищувальний (Boost) та інвертувальний перетворювачі»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Boost & Buck-Boost Converters: CCM & DCM':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-39-l3",
        titleUk: "Підвищувальний (Boost) та інвертувальний перетворювачі (Частина 3)",
        titleEn: "Boost & Buck-Boost Converters: CCM & DCM (Part 3)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-39-l3-c1",
            "promptUk": "Теоретичні основи: Підвищувальний (Boost) та інвертувальний перетворювачі (Частина 3)",
            "promptEn": "Theoretical Foundations: Boost & Buck-Boost Converters: CCM & DCM (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Підвищувальний (Boost) та інвертувальний перетворювачі». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Boost & Buck-Boost Converters: CCM & DCM'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-39-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Підвищувальний (Boost) та інвертувальний перетворювачі»?",
            "promptEn": "Which core statement is correct regarding 'Boost & Buck-Boost Converters: CCM & DCM'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-39-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 42 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 42 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 63.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 42 * 1.5 = 63.0 В.",
            "explanationEn": "Calculation follows direct scaling: 42 * 1.5 = 63.0 V."
}),
          createNumeric({
            "id": "ee-39-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 42 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 42 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.595,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 42 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 42 A."
}),
          createExplain({
            "id": "ee-39-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Підвищувальний (Boost) та інвертувальний перетворювачі»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Boost & Buck-Boost Converters: CCM & DCM':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-39-l4",
        titleUk: "Підвищувальний (Boost) та інвертувальний перетворювачі (Частина 4)",
        titleEn: "Boost & Buck-Boost Converters: CCM & DCM (Part 4)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-39-l4-c1",
            "promptUk": "Теоретичні основи: Підвищувальний (Boost) та інвертувальний перетворювачі (Частина 4)",
            "promptEn": "Theoretical Foundations: Boost & Buck-Boost Converters: CCM & DCM (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Підвищувальний (Boost) та інвертувальний перетворювачі». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Boost & Buck-Boost Converters: CCM & DCM'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-39-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Підвищувальний (Boost) та інвертувальний перетворювачі»?",
            "promptEn": "Which core statement is correct regarding 'Boost & Buck-Boost Converters: CCM & DCM'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-39-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 47 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 47 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 70.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 47 * 1.5 = 70.5 В.",
            "explanationEn": "Calculation follows direct scaling: 47 * 1.5 = 70.5 V."
}),
          createCircuitLab({
            "id": "ee-39-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Підвищувальний (Boost) та інвертувальний перетворювачі». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Boost & Buck-Boost Converters: CCM & DCM'. Run simulation and verify nodes.",
            "title": "Lab 39.4: Boost & Buck-Boost Converters: CCM & DCM",
            "netlist": "* EduForge SPICE Model for Unit 39\nV1 in 0 DC 10\nR1 in out 47k\nR2 out 0 22k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 3.188,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-39-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Підвищувальний (Boost) та інвертувальний перетворювачі»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Boost & Buck-Boost Converters: CCM & DCM':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-39-l5",
        titleUk: "Підвищувальний (Boost) та інвертувальний перетворювачі (Частина 5)",
        titleEn: "Boost & Buck-Boost Converters: CCM & DCM (Part 5)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-39-l5-c1",
            "promptUk": "Теоретичні основи: Підвищувальний (Boost) та інвертувальний перетворювачі (Частина 5)",
            "promptEn": "Theoretical Foundations: Boost & Buck-Boost Converters: CCM & DCM (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Підвищувальний (Boost) та інвертувальний перетворювачі». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Boost & Buck-Boost Converters: CCM & DCM'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-39-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Підвищувальний (Boost) та інвертувальний перетворювачі»?",
            "promptEn": "Which core statement is correct regarding 'Boost & Buck-Boost Converters: CCM & DCM'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-39-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 52 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 52 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 78.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 52 * 1.5 = 78.0 В.",
            "explanationEn": "Calculation follows direct scaling: 52 * 1.5 = 78.0 V."
}),
          createCircuitLab({
            "id": "ee-39-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Підвищувальний (Boost) та інвертувальний перетворювачі». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Boost & Buck-Boost Converters: CCM & DCM'. Run simulation and verify nodes.",
            "title": "Lab 39.5: Boost & Buck-Boost Converters: CCM & DCM",
            "netlist": "* EduForge SPICE Model for Unit 39\nV1 in 0 DC 10\nR1 in out 52k\nR2 out 0 33k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 3.882,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-39-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Підвищувальний (Boost) та інвертувальний перетворювачі»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Boost & Buck-Boost Converters: CCM & DCM':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-39-exam",
        titleUk: "Екзамен: Підвищувальний (Boost) та інвертувальний перетворювачі",
        titleEn: "Exam: Boost & Buck-Boost Converters: CCM & DCM",
        difficulty: 4,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-39-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Підвищувальний (Boost) та інвертувальний перетворювачі»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Boost & Buck-Boost Converters: CCM & DCM'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 1)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 1)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-39-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Підвищувальний (Boost) та інвертувальний перетворювачі»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Boost & Buck-Boost Converters: CCM & DCM'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 2)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 2)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-39-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Підвищувальний (Boost) та інвертувальний перетворювачі»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Boost & Buck-Boost Converters: CCM & DCM'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 3)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 3)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-39-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Підвищувальний (Boost) та інвертувальний перетворювачі»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Boost & Buck-Boost Converters: CCM & DCM'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 4)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 4)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createNumeric({
            "id": "ee-39-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 400 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 400 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 200.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 400 = 200.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 400 = 200.0 V."
}),
          createNumeric({
            "id": "ee-39-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 402 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 402 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 201.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 402 = 201.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 402 = 201.0 V."
}),
          createNumeric({
            "id": "ee-39-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 404 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 404 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 202.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 404 = 202.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 404 = 202.0 V."
}),
          createNumeric({
            "id": "ee-39-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 406 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 406 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 203.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 406 = 203.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 406 = 203.0 V."
}),
          createCircuitLab({
            "id": "ee-39-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Підвищувальний (Boost) та інвертувальний перетворювачі».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Boost & Buck-Boost Converters: CCM & DCM'.",
            "title": "Exam Lab 39.9: Boost & Buck-Boost Converters: CCM & DCM",
            "netlist": "* Exam Model 39_9\nV1 in 0 DC 12\nR1 in out 48k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.069,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
          createCircuitLab({
            "id": "ee-39-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Підвищувальний (Boost) та інвертувальний перетворювачі».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Boost & Buck-Boost Converters: CCM & DCM'.",
            "title": "Exam Lab 39.10: Boost & Buck-Boost Converters: CCM & DCM",
            "netlist": "* Exam Model 39_10\nV1 in 0 DC 12\nR1 in out 49k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.034,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
        ],
      }),
    ],
  }),
  createUnit({
    slug: "ee-40-isolated-flyback",
    titleUk: "Ізольовані перетворювачі, зворотньоходовий (Flyback)",
    titleEn: "Isolated Converters, Flyback Topology & Energy Storage",
    lessons: [
      createLesson({
        slug: "ee-40-l1",
        titleUk: "Ізольовані перетворювачі, зворотньоходовий (Flyback) (Частина 1)",
        titleEn: "Isolated Converters, Flyback Topology & Energy Storage (Part 1)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-40-l1-c1",
            "promptUk": "Теоретичні основи: Ізольовані перетворювачі, зворотньоходовий (Flyback) (Частина 1)",
            "promptEn": "Theoretical Foundations: Isolated Converters, Flyback Topology & Energy Storage (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Ізольовані перетворювачі, зворотньоходовий (Flyback)». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Isolated Converters, Flyback Topology & Energy Storage'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-40-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Ізольовані перетворювачі, зворотньоходовий (Flyback)»?",
            "promptEn": "Which core statement is correct regarding 'Isolated Converters, Flyback Topology & Energy Storage'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-40-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 35 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 35 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 52.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 35 * 1.5 = 52.5 В.",
            "explanationEn": "Calculation follows direct scaling: 35 * 1.5 = 52.5 V."
}),
          createNumeric({
            "id": "ee-40-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 35 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 35 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.714,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 35 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 35 A."
}),
          createExplain({
            "id": "ee-40-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Ізольовані перетворювачі, зворотньоходовий (Flyback)»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Isolated Converters, Flyback Topology & Energy Storage':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-40-l2",
        titleUk: "Ізольовані перетворювачі, зворотньоходовий (Flyback) (Частина 2)",
        titleEn: "Isolated Converters, Flyback Topology & Energy Storage (Part 2)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-40-l2-c1",
            "promptUk": "Теоретичні основи: Ізольовані перетворювачі, зворотньоходовий (Flyback) (Частина 2)",
            "promptEn": "Theoretical Foundations: Isolated Converters, Flyback Topology & Energy Storage (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Ізольовані перетворювачі, зворотньоходовий (Flyback)». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Isolated Converters, Flyback Topology & Energy Storage'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-40-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Ізольовані перетворювачі, зворотньоходовий (Flyback)»?",
            "promptEn": "Which core statement is correct regarding 'Isolated Converters, Flyback Topology & Energy Storage'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-40-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 40 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 40 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 60.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 40 * 1.5 = 60.0 В.",
            "explanationEn": "Calculation follows direct scaling: 40 * 1.5 = 60.0 V."
}),
          createNumeric({
            "id": "ee-40-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 40 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 40 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.625,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 40 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 40 A."
}),
          createExplain({
            "id": "ee-40-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Ізольовані перетворювачі, зворотньоходовий (Flyback)»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Isolated Converters, Flyback Topology & Energy Storage':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-40-l3",
        titleUk: "Ізольовані перетворювачі, зворотньоходовий (Flyback) (Частина 3)",
        titleEn: "Isolated Converters, Flyback Topology & Energy Storage (Part 3)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-40-l3-c1",
            "promptUk": "Теоретичні основи: Ізольовані перетворювачі, зворотньоходовий (Flyback) (Частина 3)",
            "promptEn": "Theoretical Foundations: Isolated Converters, Flyback Topology & Energy Storage (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Ізольовані перетворювачі, зворотньоходовий (Flyback)». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Isolated Converters, Flyback Topology & Energy Storage'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-40-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Ізольовані перетворювачі, зворотньоходовий (Flyback)»?",
            "promptEn": "Which core statement is correct regarding 'Isolated Converters, Flyback Topology & Energy Storage'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-40-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 45 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 45 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 67.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 45 * 1.5 = 67.5 В.",
            "explanationEn": "Calculation follows direct scaling: 45 * 1.5 = 67.5 V."
}),
          createNumeric({
            "id": "ee-40-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 45 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 45 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.556,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 45 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 45 A."
}),
          createExplain({
            "id": "ee-40-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Ізольовані перетворювачі, зворотньоходовий (Flyback)»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Isolated Converters, Flyback Topology & Energy Storage':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-40-l4",
        titleUk: "Ізольовані перетворювачі, зворотньоходовий (Flyback) (Частина 4)",
        titleEn: "Isolated Converters, Flyback Topology & Energy Storage (Part 4)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-40-l4-c1",
            "promptUk": "Теоретичні основи: Ізольовані перетворювачі, зворотньоходовий (Flyback) (Частина 4)",
            "promptEn": "Theoretical Foundations: Isolated Converters, Flyback Topology & Energy Storage (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Ізольовані перетворювачі, зворотньоходовий (Flyback)». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Isolated Converters, Flyback Topology & Energy Storage'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-40-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Ізольовані перетворювачі, зворотньоходовий (Flyback)»?",
            "promptEn": "Which core statement is correct regarding 'Isolated Converters, Flyback Topology & Energy Storage'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-40-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 50 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 50 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 75.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 50 * 1.5 = 75.0 В.",
            "explanationEn": "Calculation follows direct scaling: 50 * 1.5 = 75.0 V."
}),
          createCircuitLab({
            "id": "ee-40-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Ізольовані перетворювачі, зворотньоходовий (Flyback)». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Isolated Converters, Flyback Topology & Energy Storage'. Run simulation and verify nodes.",
            "title": "Lab 40.4: Isolated Converters, Flyback Topology & Energy Storage",
            "netlist": "* EduForge SPICE Model for Unit 40\nV1 in 0 DC 10\nR1 in out 50k\nR2 out 0 29k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 3.671,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-40-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Ізольовані перетворювачі, зворотньоходовий (Flyback)»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Isolated Converters, Flyback Topology & Energy Storage':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-40-l5",
        titleUk: "Ізольовані перетворювачі, зворотньоходовий (Flyback) (Частина 5)",
        titleEn: "Isolated Converters, Flyback Topology & Energy Storage (Part 5)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-40-l5-c1",
            "promptUk": "Теоретичні основи: Ізольовані перетворювачі, зворотньоходовий (Flyback) (Частина 5)",
            "promptEn": "Theoretical Foundations: Isolated Converters, Flyback Topology & Energy Storage (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Ізольовані перетворювачі, зворотньоходовий (Flyback)». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Isolated Converters, Flyback Topology & Energy Storage'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-40-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Ізольовані перетворювачі, зворотньоходовий (Flyback)»?",
            "promptEn": "Which core statement is correct regarding 'Isolated Converters, Flyback Topology & Energy Storage'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-40-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 55 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 55 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 82.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 55 * 1.5 = 82.5 В.",
            "explanationEn": "Calculation follows direct scaling: 55 * 1.5 = 82.5 V."
}),
          createCircuitLab({
            "id": "ee-40-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Ізольовані перетворювачі, зворотньоходовий (Flyback)». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Isolated Converters, Flyback Topology & Energy Storage'. Run simulation and verify nodes.",
            "title": "Lab 40.5: Isolated Converters, Flyback Topology & Energy Storage",
            "netlist": "* EduForge SPICE Model for Unit 40\nV1 in 0 DC 10\nR1 in out 55k\nR2 out 0 40k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 4.211,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-40-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Ізольовані перетворювачі, зворотньоходовий (Flyback)»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Isolated Converters, Flyback Topology & Energy Storage':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-40-exam",
        titleUk: "Екзамен: Ізольовані перетворювачі, зворотньоходовий (Flyback)",
        titleEn: "Exam: Isolated Converters, Flyback Topology & Energy Storage",
        difficulty: 4,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-40-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Ізольовані перетворювачі, зворотньоходовий (Flyback)»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Isolated Converters, Flyback Topology & Energy Storage'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 1)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 1)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-40-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Ізольовані перетворювачі, зворотньоходовий (Flyback)»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Isolated Converters, Flyback Topology & Energy Storage'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 2)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 2)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-40-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Ізольовані перетворювачі, зворотньоходовий (Flyback)»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Isolated Converters, Flyback Topology & Energy Storage'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 3)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 3)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-40-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Ізольовані перетворювачі, зворотньоходовий (Flyback)»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Isolated Converters, Flyback Topology & Energy Storage'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 4)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 4)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createNumeric({
            "id": "ee-40-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 410 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 410 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 205.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 410 = 205.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 410 = 205.0 V."
}),
          createNumeric({
            "id": "ee-40-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 412 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 412 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 206.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 412 = 206.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 412 = 206.0 V."
}),
          createNumeric({
            "id": "ee-40-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 414 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 414 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 207.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 414 = 207.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 414 = 207.0 V."
}),
          createNumeric({
            "id": "ee-40-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 416 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 416 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 208.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 416 = 208.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 416 = 208.0 V."
}),
          createCircuitLab({
            "id": "ee-40-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Ізольовані перетворювачі, зворотньоходовий (Flyback)».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Isolated Converters, Flyback Topology & Energy Storage'.",
            "title": "Exam Lab 40.9: Isolated Converters, Flyback Topology & Energy Storage",
            "netlist": "* Exam Model 40_9\nV1 in 0 DC 12\nR1 in out 49k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.034,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
          createCircuitLab({
            "id": "ee-40-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Ізольовані перетворювачі, зворотньоходовий (Flyback)».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Isolated Converters, Flyback Topology & Energy Storage'.",
            "title": "Exam Lab 40.10: Isolated Converters, Flyback Topology & Energy Storage",
            "netlist": "* Exam Model 40_10\nV1 in 0 DC 12\nR1 in out 50k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.0,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
        ],
      }),
    ],
  }),
  createUnit({
    slug: "ee-41-bridge-inverters",
    titleUk: "Напівміст, повний міст, інвертор та синхронне випрямлення",
    titleEn: "Half-Bridge, Full-Bridge, Inverters & Rectification",
    lessons: [
      createLesson({
        slug: "ee-41-l1",
        titleUk: "Напівміст, повний міст, інвертор та синхронне випрямлення (Частина 1)",
        titleEn: "Half-Bridge, Full-Bridge, Inverters & Rectification (Part 1)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-41-l1-c1",
            "promptUk": "Теоретичні основи: Напівміст, повний міст, інвертор та синхронне випрямлення (Частина 1)",
            "promptEn": "Theoretical Foundations: Half-Bridge, Full-Bridge, Inverters & Rectification (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Напівміст, повний міст, інвертор та синхронне випрямлення». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Half-Bridge, Full-Bridge, Inverters & Rectification'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-41-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Напівміст, повний міст, інвертор та синхронне випрямлення»?",
            "promptEn": "Which core statement is correct regarding 'Half-Bridge, Full-Bridge, Inverters & Rectification'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-41-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 38 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 38 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 57.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 38 * 1.5 = 57.0 В.",
            "explanationEn": "Calculation follows direct scaling: 38 * 1.5 = 57.0 V."
}),
          createNumeric({
            "id": "ee-41-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 38 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 38 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.658,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 38 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 38 A."
}),
          createExplain({
            "id": "ee-41-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Напівміст, повний міст, інвертор та синхронне випрямлення»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Half-Bridge, Full-Bridge, Inverters & Rectification':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-41-l2",
        titleUk: "Напівміст, повний міст, інвертор та синхронне випрямлення (Частина 2)",
        titleEn: "Half-Bridge, Full-Bridge, Inverters & Rectification (Part 2)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-41-l2-c1",
            "promptUk": "Теоретичні основи: Напівміст, повний міст, інвертор та синхронне випрямлення (Частина 2)",
            "promptEn": "Theoretical Foundations: Half-Bridge, Full-Bridge, Inverters & Rectification (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Напівміст, повний міст, інвертор та синхронне випрямлення». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Half-Bridge, Full-Bridge, Inverters & Rectification'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-41-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Напівміст, повний міст, інвертор та синхронне випрямлення»?",
            "promptEn": "Which core statement is correct regarding 'Half-Bridge, Full-Bridge, Inverters & Rectification'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-41-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 43 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 43 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 64.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 43 * 1.5 = 64.5 В.",
            "explanationEn": "Calculation follows direct scaling: 43 * 1.5 = 64.5 V."
}),
          createNumeric({
            "id": "ee-41-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 43 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 43 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.581,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 43 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 43 A."
}),
          createExplain({
            "id": "ee-41-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Напівміст, повний міст, інвертор та синхронне випрямлення»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Half-Bridge, Full-Bridge, Inverters & Rectification':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-41-l3",
        titleUk: "Напівміст, повний міст, інвертор та синхронне випрямлення (Частина 3)",
        titleEn: "Half-Bridge, Full-Bridge, Inverters & Rectification (Part 3)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-41-l3-c1",
            "promptUk": "Теоретичні основи: Напівміст, повний міст, інвертор та синхронне випрямлення (Частина 3)",
            "promptEn": "Theoretical Foundations: Half-Bridge, Full-Bridge, Inverters & Rectification (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Напівміст, повний міст, інвертор та синхронне випрямлення». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Half-Bridge, Full-Bridge, Inverters & Rectification'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-41-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Напівміст, повний міст, інвертор та синхронне випрямлення»?",
            "promptEn": "Which core statement is correct regarding 'Half-Bridge, Full-Bridge, Inverters & Rectification'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-41-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 48 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 48 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 72.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 48 * 1.5 = 72.0 В.",
            "explanationEn": "Calculation follows direct scaling: 48 * 1.5 = 72.0 V."
}),
          createNumeric({
            "id": "ee-41-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 48 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 48 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.521,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 48 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 48 A."
}),
          createExplain({
            "id": "ee-41-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Напівміст, повний міст, інвертор та синхронне випрямлення»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Half-Bridge, Full-Bridge, Inverters & Rectification':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-41-l4",
        titleUk: "Напівміст, повний міст, інвертор та синхронне випрямлення (Частина 4)",
        titleEn: "Half-Bridge, Full-Bridge, Inverters & Rectification (Part 4)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-41-l4-c1",
            "promptUk": "Теоретичні основи: Напівміст, повний міст, інвертор та синхронне випрямлення (Частина 4)",
            "promptEn": "Theoretical Foundations: Half-Bridge, Full-Bridge, Inverters & Rectification (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Напівміст, повний міст, інвертор та синхронне випрямлення». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Half-Bridge, Full-Bridge, Inverters & Rectification'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-41-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Напівміст, повний міст, інвертор та синхронне випрямлення»?",
            "promptEn": "Which core statement is correct regarding 'Half-Bridge, Full-Bridge, Inverters & Rectification'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-41-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 53 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 53 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 79.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 53 * 1.5 = 79.5 В.",
            "explanationEn": "Calculation follows direct scaling: 53 * 1.5 = 79.5 V."
}),
          createCircuitLab({
            "id": "ee-41-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Напівміст, повний міст, інвертор та синхронне випрямлення». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Half-Bridge, Full-Bridge, Inverters & Rectification'. Run simulation and verify nodes.",
            "title": "Lab 41.4: Half-Bridge, Full-Bridge, Inverters & Rectification",
            "netlist": "* EduForge SPICE Model for Unit 41\nV1 in 0 DC 10\nR1 in out 53k\nR2 out 0 36k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 4.045,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-41-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Напівміст, повний міст, інвертор та синхронне випрямлення»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Half-Bridge, Full-Bridge, Inverters & Rectification':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-41-l5",
        titleUk: "Напівміст, повний міст, інвертор та синхронне випрямлення (Частина 5)",
        titleEn: "Half-Bridge, Full-Bridge, Inverters & Rectification (Part 5)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-41-l5-c1",
            "promptUk": "Теоретичні основи: Напівміст, повний міст, інвертор та синхронне випрямлення (Частина 5)",
            "promptEn": "Theoretical Foundations: Half-Bridge, Full-Bridge, Inverters & Rectification (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Напівміст, повний міст, інвертор та синхронне випрямлення». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Half-Bridge, Full-Bridge, Inverters & Rectification'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-41-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Напівміст, повний міст, інвертор та синхронне випрямлення»?",
            "promptEn": "Which core statement is correct regarding 'Half-Bridge, Full-Bridge, Inverters & Rectification'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-41-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 58 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 58 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 87.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 58 * 1.5 = 87.0 В.",
            "explanationEn": "Calculation follows direct scaling: 58 * 1.5 = 87.0 V."
}),
          createCircuitLab({
            "id": "ee-41-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Напівміст, повний міст, інвертор та синхронне випрямлення». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Half-Bridge, Full-Bridge, Inverters & Rectification'. Run simulation and verify nodes.",
            "title": "Lab 41.5: Half-Bridge, Full-Bridge, Inverters & Rectification",
            "netlist": "* EduForge SPICE Model for Unit 41\nV1 in 0 DC 10\nR1 in out 58k\nR2 out 0 47k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 4.476,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-41-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Напівміст, повний міст, інвертор та синхронне випрямлення»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Half-Bridge, Full-Bridge, Inverters & Rectification':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-41-exam",
        titleUk: "Екзамен: Напівміст, повний міст, інвертор та синхронне випрямлення",
        titleEn: "Exam: Half-Bridge, Full-Bridge, Inverters & Rectification",
        difficulty: 4,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-41-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Напівміст, повний міст, інвертор та синхронне випрямлення»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Half-Bridge, Full-Bridge, Inverters & Rectification'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 1)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 1)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-41-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Напівміст, повний міст, інвертор та синхронне випрямлення»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Half-Bridge, Full-Bridge, Inverters & Rectification'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 2)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 2)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-41-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Напівміст, повний міст, інвертор та синхронне випрямлення»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Half-Bridge, Full-Bridge, Inverters & Rectification'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 3)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 3)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-41-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Напівміст, повний міст, інвертор та синхронне випрямлення»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Half-Bridge, Full-Bridge, Inverters & Rectification'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 4)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 4)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createNumeric({
            "id": "ee-41-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 420 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 420 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 210.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 420 = 210.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 420 = 210.0 V."
}),
          createNumeric({
            "id": "ee-41-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 422 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 422 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 211.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 422 = 211.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 422 = 211.0 V."
}),
          createNumeric({
            "id": "ee-41-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 424 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 424 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 212.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 424 = 212.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 424 = 212.0 V."
}),
          createNumeric({
            "id": "ee-41-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 426 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 426 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 213.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 426 = 213.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 426 = 213.0 V."
}),
          createCircuitLab({
            "id": "ee-41-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Напівміст, повний міст, інвертор та синхронне випрямлення».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Half-Bridge, Full-Bridge, Inverters & Rectification'.",
            "title": "Exam Lab 41.9: Half-Bridge, Full-Bridge, Inverters & Rectification",
            "netlist": "* Exam Model 41_9\nV1 in 0 DC 12\nR1 in out 50k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.0,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
          createCircuitLab({
            "id": "ee-41-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Напівміст, повний міст, інвертор та синхронне випрямлення».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Half-Bridge, Full-Bridge, Inverters & Rectification'.",
            "title": "Exam Lab 41.10: Half-Bridge, Full-Bridge, Inverters & Rectification",
            "netlist": "* Exam Model 41_10\nV1 in 0 DC 12\nR1 in out 51k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 1.967,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
        ],
      }),
    ],
  }),
  createUnit({
    slug: "ee-42-magnetics-thermal",
    titleUk: "Магнітні компоненти, насичення, втрати та тепловий розрахунок",
    titleEn: "Power Magnetics, Core Saturation, Losses & Thermal Sizing",
    lessons: [
      createLesson({
        slug: "ee-42-l1",
        titleUk: "Магнітні компоненти, насичення, втрати та тепловий розрахунок (Частина 1)",
        titleEn: "Power Magnetics, Core Saturation, Losses & Thermal Sizing (Part 1)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-42-l1-c1",
            "promptUk": "Теоретичні основи: Магнітні компоненти, насичення, втрати та тепловий розрахунок (Частина 1)",
            "promptEn": "Theoretical Foundations: Power Magnetics, Core Saturation, Losses & Thermal Sizing (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Магнітні компоненти, насичення, втрати та тепловий розрахунок». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Power Magnetics, Core Saturation, Losses & Thermal Sizing'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-42-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Магнітні компоненти, насичення, втрати та тепловий розрахунок»?",
            "promptEn": "Which core statement is correct regarding 'Power Magnetics, Core Saturation, Losses & Thermal Sizing'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-42-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 41 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 41 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 61.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 41 * 1.5 = 61.5 В.",
            "explanationEn": "Calculation follows direct scaling: 41 * 1.5 = 61.5 V."
}),
          createNumeric({
            "id": "ee-42-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 41 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 41 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.61,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 41 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 41 A."
}),
          createExplain({
            "id": "ee-42-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Магнітні компоненти, насичення, втрати та тепловий розрахунок»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Power Magnetics, Core Saturation, Losses & Thermal Sizing':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-42-l2",
        titleUk: "Магнітні компоненти, насичення, втрати та тепловий розрахунок (Частина 2)",
        titleEn: "Power Magnetics, Core Saturation, Losses & Thermal Sizing (Part 2)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-42-l2-c1",
            "promptUk": "Теоретичні основи: Магнітні компоненти, насичення, втрати та тепловий розрахунок (Частина 2)",
            "promptEn": "Theoretical Foundations: Power Magnetics, Core Saturation, Losses & Thermal Sizing (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Магнітні компоненти, насичення, втрати та тепловий розрахунок». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Power Magnetics, Core Saturation, Losses & Thermal Sizing'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-42-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Магнітні компоненти, насичення, втрати та тепловий розрахунок»?",
            "promptEn": "Which core statement is correct regarding 'Power Magnetics, Core Saturation, Losses & Thermal Sizing'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-42-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 46 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 46 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 69.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 46 * 1.5 = 69.0 В.",
            "explanationEn": "Calculation follows direct scaling: 46 * 1.5 = 69.0 V."
}),
          createNumeric({
            "id": "ee-42-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 46 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 46 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.543,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 46 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 46 A."
}),
          createExplain({
            "id": "ee-42-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Магнітні компоненти, насичення, втрати та тепловий розрахунок»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Power Magnetics, Core Saturation, Losses & Thermal Sizing':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-42-l3",
        titleUk: "Магнітні компоненти, насичення, втрати та тепловий розрахунок (Частина 3)",
        titleEn: "Power Magnetics, Core Saturation, Losses & Thermal Sizing (Part 3)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-42-l3-c1",
            "promptUk": "Теоретичні основи: Магнітні компоненти, насичення, втрати та тепловий розрахунок (Частина 3)",
            "promptEn": "Theoretical Foundations: Power Magnetics, Core Saturation, Losses & Thermal Sizing (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Магнітні компоненти, насичення, втрати та тепловий розрахунок». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Power Magnetics, Core Saturation, Losses & Thermal Sizing'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-42-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Магнітні компоненти, насичення, втрати та тепловий розрахунок»?",
            "promptEn": "Which core statement is correct regarding 'Power Magnetics, Core Saturation, Losses & Thermal Sizing'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-42-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 51 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 51 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 76.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 51 * 1.5 = 76.5 В.",
            "explanationEn": "Calculation follows direct scaling: 51 * 1.5 = 76.5 V."
}),
          createNumeric({
            "id": "ee-42-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 51 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 51 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.49,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 51 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 51 A."
}),
          createExplain({
            "id": "ee-42-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Магнітні компоненти, насичення, втрати та тепловий розрахунок»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Power Magnetics, Core Saturation, Losses & Thermal Sizing':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-42-l4",
        titleUk: "Магнітні компоненти, насичення, втрати та тепловий розрахунок (Частина 4)",
        titleEn: "Power Magnetics, Core Saturation, Losses & Thermal Sizing (Part 4)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-42-l4-c1",
            "promptUk": "Теоретичні основи: Магнітні компоненти, насичення, втрати та тепловий розрахунок (Частина 4)",
            "promptEn": "Theoretical Foundations: Power Magnetics, Core Saturation, Losses & Thermal Sizing (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Магнітні компоненти, насичення, втрати та тепловий розрахунок». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Power Magnetics, Core Saturation, Losses & Thermal Sizing'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-42-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Магнітні компоненти, насичення, втрати та тепловий розрахунок»?",
            "promptEn": "Which core statement is correct regarding 'Power Magnetics, Core Saturation, Losses & Thermal Sizing'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-42-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 56 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 56 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 84.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 56 * 1.5 = 84.0 В.",
            "explanationEn": "Calculation follows direct scaling: 56 * 1.5 = 84.0 V."
}),
          createCircuitLab({
            "id": "ee-42-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Магнітні компоненти, насичення, втрати та тепловий розрахунок». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Power Magnetics, Core Saturation, Losses & Thermal Sizing'. Run simulation and verify nodes.",
            "title": "Lab 42.4: Power Magnetics, Core Saturation, Losses & Thermal Sizing",
            "netlist": "* EduForge SPICE Model for Unit 42\nV1 in 0 DC 10\nR1 in out 56k\nR2 out 0 43k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 4.343,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-42-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Магнітні компоненти, насичення, втрати та тепловий розрахунок»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Power Magnetics, Core Saturation, Losses & Thermal Sizing':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-42-l5",
        titleUk: "Магнітні компоненти, насичення, втрати та тепловий розрахунок (Частина 5)",
        titleEn: "Power Magnetics, Core Saturation, Losses & Thermal Sizing (Part 5)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-42-l5-c1",
            "promptUk": "Теоретичні основи: Магнітні компоненти, насичення, втрати та тепловий розрахунок (Частина 5)",
            "promptEn": "Theoretical Foundations: Power Magnetics, Core Saturation, Losses & Thermal Sizing (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Магнітні компоненти, насичення, втрати та тепловий розрахунок». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Power Magnetics, Core Saturation, Losses & Thermal Sizing'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-42-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Магнітні компоненти, насичення, втрати та тепловий розрахунок»?",
            "promptEn": "Which core statement is correct regarding 'Power Magnetics, Core Saturation, Losses & Thermal Sizing'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-42-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 61 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 61 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 91.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 61 * 1.5 = 91.5 В.",
            "explanationEn": "Calculation follows direct scaling: 61 * 1.5 = 91.5 V."
}),
          createCircuitLab({
            "id": "ee-42-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Магнітні компоненти, насичення, втрати та тепловий розрахунок». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Power Magnetics, Core Saturation, Losses & Thermal Sizing'. Run simulation and verify nodes.",
            "title": "Lab 42.5: Power Magnetics, Core Saturation, Losses & Thermal Sizing",
            "netlist": "* EduForge SPICE Model for Unit 42\nV1 in 0 DC 10\nR1 in out 61k\nR2 out 0 54k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 4.696,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-42-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Магнітні компоненти, насичення, втрати та тепловий розрахунок»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Power Magnetics, Core Saturation, Losses & Thermal Sizing':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-42-exam",
        titleUk: "Екзамен: Магнітні компоненти, насичення, втрати та тепловий розрахунок",
        titleEn: "Exam: Power Magnetics, Core Saturation, Losses & Thermal Sizing",
        difficulty: 4,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-42-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Магнітні компоненти, насичення, втрати та тепловий розрахунок»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Power Magnetics, Core Saturation, Losses & Thermal Sizing'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 1)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 1)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-42-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Магнітні компоненти, насичення, втрати та тепловий розрахунок»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Power Magnetics, Core Saturation, Losses & Thermal Sizing'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 2)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 2)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-42-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Магнітні компоненти, насичення, втрати та тепловий розрахунок»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Power Magnetics, Core Saturation, Losses & Thermal Sizing'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 3)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 3)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-42-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Магнітні компоненти, насичення, втрати та тепловий розрахунок»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Power Magnetics, Core Saturation, Losses & Thermal Sizing'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 4)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 4)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createNumeric({
            "id": "ee-42-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 430 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 430 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 215.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 430 = 215.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 430 = 215.0 V."
}),
          createNumeric({
            "id": "ee-42-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 432 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 432 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 216.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 432 = 216.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 432 = 216.0 V."
}),
          createNumeric({
            "id": "ee-42-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 434 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 434 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 217.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 434 = 217.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 434 = 217.0 V."
}),
          createNumeric({
            "id": "ee-42-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 436 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 436 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 218.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 436 = 218.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 436 = 218.0 V."
}),
          createCircuitLab({
            "id": "ee-42-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Магнітні компоненти, насичення, втрати та тепловий розрахунок».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Power Magnetics, Core Saturation, Losses & Thermal Sizing'.",
            "title": "Exam Lab 42.9: Power Magnetics, Core Saturation, Losses & Thermal Sizing",
            "netlist": "* Exam Model 42_9\nV1 in 0 DC 12\nR1 in out 51k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 1.967,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
          createCircuitLab({
            "id": "ee-42-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Магнітні компоненти, насичення, втрати та тепловий розрахунок».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Power Magnetics, Core Saturation, Losses & Thermal Sizing'.",
            "title": "Exam Lab 42.10: Power Magnetics, Core Saturation, Losses & Thermal Sizing",
            "netlist": "* Exam Model 42_10\nV1 in 0 DC 12\nR1 in out 52k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 1.935,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
        ],
      }),
    ],
  }),
];