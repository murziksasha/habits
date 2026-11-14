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
 * Stage 3: 6 Units, 36 Lessons (5 instructional + 1 exam per unit)
 */
export const stage3Units: UnitContent[] = [
  createUnit({
    slug: "ee-13-real-resistors",
    titleUk: "Реальні резистори, потенціометри, допуски та вимірювання",
    titleEn: "Real Resistors, Potentiometers, Tolerances & Measurement",
    lessons: [
      createLesson({
        slug: "ee-13-l1",
        titleUk: "Реальні резистори, потенціометри, допуски та вимірювання (Частина 1)",
        titleEn: "Real Resistors, Potentiometers, Tolerances & Measurement (Part 1)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-13-l1-c1",
            "promptUk": "Теоретичні основи: Реальні резистори, потенціометри, допуски та вимірювання (Частина 1)",
            "promptEn": "Theoretical Foundations: Real Resistors, Potentiometers, Tolerances & Measurement (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Реальні резистори, потенціометри, допуски та вимірювання». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Real Resistors, Potentiometers, Tolerances & Measurement'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-13-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Реальні резистори, потенціометри, допуски та вимірювання»?",
            "promptEn": "Which core statement is correct regarding 'Real Resistors, Potentiometers, Tolerances & Measurement'?",
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
            "id": "ee-13-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 54 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 54 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 81.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 54 * 1.5 = 81.0 В.",
            "explanationEn": "Calculation follows direct scaling: 54 * 1.5 = 81.0 V."
}),
          createNumeric({
            "id": "ee-13-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 54 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 54 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.463,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 54 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 54 A."
}),
          createExplain({
            "id": "ee-13-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Реальні резистори, потенціометри, допуски та вимірювання»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Real Resistors, Potentiometers, Tolerances & Measurement':",
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
        slug: "ee-13-l2",
        titleUk: "Реальні резистори, потенціометри, допуски та вимірювання (Частина 2)",
        titleEn: "Real Resistors, Potentiometers, Tolerances & Measurement (Part 2)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-13-l2-c1",
            "promptUk": "Теоретичні основи: Реальні резистори, потенціометри, допуски та вимірювання (Частина 2)",
            "promptEn": "Theoretical Foundations: Real Resistors, Potentiometers, Tolerances & Measurement (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Реальні резистори, потенціометри, допуски та вимірювання». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Real Resistors, Potentiometers, Tolerances & Measurement'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-13-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Реальні резистори, потенціометри, допуски та вимірювання»?",
            "promptEn": "Which core statement is correct regarding 'Real Resistors, Potentiometers, Tolerances & Measurement'?",
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
            "id": "ee-13-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 59 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 59 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 88.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 59 * 1.5 = 88.5 В.",
            "explanationEn": "Calculation follows direct scaling: 59 * 1.5 = 88.5 V."
}),
          createNumeric({
            "id": "ee-13-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 59 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 59 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.424,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 59 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 59 A."
}),
          createExplain({
            "id": "ee-13-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Реальні резистори, потенціометри, допуски та вимірювання»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Real Resistors, Potentiometers, Tolerances & Measurement':",
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
        slug: "ee-13-l3",
        titleUk: "Реальні резистори, потенціометри, допуски та вимірювання (Частина 3)",
        titleEn: "Real Resistors, Potentiometers, Tolerances & Measurement (Part 3)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-13-l3-c1",
            "promptUk": "Теоретичні основи: Реальні резистори, потенціометри, допуски та вимірювання (Частина 3)",
            "promptEn": "Theoretical Foundations: Real Resistors, Potentiometers, Tolerances & Measurement (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Реальні резистори, потенціометри, допуски та вимірювання». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Real Resistors, Potentiometers, Tolerances & Measurement'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-13-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Реальні резистори, потенціометри, допуски та вимірювання»?",
            "promptEn": "Which core statement is correct regarding 'Real Resistors, Potentiometers, Tolerances & Measurement'?",
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
            "id": "ee-13-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 64 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 64 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 96.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 64 * 1.5 = 96.0 В.",
            "explanationEn": "Calculation follows direct scaling: 64 * 1.5 = 96.0 V."
}),
          createNumeric({
            "id": "ee-13-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 64 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 64 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.391,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 64 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 64 A."
}),
          createExplain({
            "id": "ee-13-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Реальні резистори, потенціометри, допуски та вимірювання»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Real Resistors, Potentiometers, Tolerances & Measurement':",
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
        slug: "ee-13-l4",
        titleUk: "Реальні резистори, потенціометри, допуски та вимірювання (Частина 4)",
        titleEn: "Real Resistors, Potentiometers, Tolerances & Measurement (Part 4)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-13-l4-c1",
            "promptUk": "Теоретичні основи: Реальні резистори, потенціометри, допуски та вимірювання (Частина 4)",
            "promptEn": "Theoretical Foundations: Real Resistors, Potentiometers, Tolerances & Measurement (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Реальні резистори, потенціометри, допуски та вимірювання». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Real Resistors, Potentiometers, Tolerances & Measurement'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-13-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Реальні резистори, потенціометри, допуски та вимірювання»?",
            "promptEn": "Which core statement is correct regarding 'Real Resistors, Potentiometers, Tolerances & Measurement'?",
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
            "id": "ee-13-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 69 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 69 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 103.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 69 * 1.5 = 103.5 В.",
            "explanationEn": "Calculation follows direct scaling: 69 * 1.5 = 103.5 V."
}),
          createCircuitLab({
            "id": "ee-13-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Реальні резистори, потенціометри, допуски та вимірювання». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Real Resistors, Potentiometers, Tolerances & Measurement'. Run simulation and verify nodes.",
            "title": "Lab 13.4: Real Resistors, Potentiometers, Tolerances & Measurement",
            "netlist": "* EduForge SPICE Model for Unit 13\nV1 in 0 DC 10\nR1 in out 69k\nR2 out 0 40k\n.tran 10u 2m\n.end",
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
                                    "target": 3.67,
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
            "id": "ee-13-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Реальні резистори, потенціометри, допуски та вимірювання»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Real Resistors, Potentiometers, Tolerances & Measurement':",
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
        slug: "ee-13-l5",
        titleUk: "Реальні резистори, потенціометри, допуски та вимірювання (Частина 5)",
        titleEn: "Real Resistors, Potentiometers, Tolerances & Measurement (Part 5)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-13-l5-c1",
            "promptUk": "Теоретичні основи: Реальні резистори, потенціометри, допуски та вимірювання (Частина 5)",
            "promptEn": "Theoretical Foundations: Real Resistors, Potentiometers, Tolerances & Measurement (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Реальні резистори, потенціометри, допуски та вимірювання». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Real Resistors, Potentiometers, Tolerances & Measurement'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-13-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Реальні резистори, потенціометри, допуски та вимірювання»?",
            "promptEn": "Which core statement is correct regarding 'Real Resistors, Potentiometers, Tolerances & Measurement'?",
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
            "id": "ee-13-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 74 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 74 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 111.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 74 * 1.5 = 111.0 В.",
            "explanationEn": "Calculation follows direct scaling: 74 * 1.5 = 111.0 V."
}),
          createCircuitLab({
            "id": "ee-13-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Реальні резистори, потенціометри, допуски та вимірювання». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Real Resistors, Potentiometers, Tolerances & Measurement'. Run simulation and verify nodes.",
            "title": "Lab 13.5: Real Resistors, Potentiometers, Tolerances & Measurement",
            "netlist": "* EduForge SPICE Model for Unit 13\nV1 in 0 DC 10\nR1 in out 74k\nR2 out 0 51k\n.tran 10u 2m\n.end",
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
                                    "target": 4.08,
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
            "id": "ee-13-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Реальні резистори, потенціометри, допуски та вимірювання»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Real Resistors, Potentiometers, Tolerances & Measurement':",
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
        slug: "ee-13-exam",
        titleUk: "Екзамен: Реальні резистори, потенціометри, допуски та вимірювання",
        titleEn: "Exam: Real Resistors, Potentiometers, Tolerances & Measurement",
        difficulty: 2,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-13-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Реальні резистори, потенціометри, допуски та вимірювання»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Real Resistors, Potentiometers, Tolerances & Measurement'?",
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
            "id": "ee-13-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Реальні резистори, потенціометри, допуски та вимірювання»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Real Resistors, Potentiometers, Tolerances & Measurement'?",
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
            "id": "ee-13-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Реальні резистори, потенціометри, допуски та вимірювання»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Real Resistors, Potentiometers, Tolerances & Measurement'?",
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
            "id": "ee-13-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Реальні резистори, потенціометри, допуски та вимірювання»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Real Resistors, Potentiometers, Tolerances & Measurement'?",
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
            "id": "ee-13-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 140 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 140 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 70.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 140 = 70.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 140 = 70.0 V."
}),
          createNumeric({
            "id": "ee-13-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 142 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 142 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 71.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 142 = 71.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 142 = 71.0 V."
}),
          createNumeric({
            "id": "ee-13-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 144 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 144 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 72.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 144 = 72.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 144 = 72.0 V."
}),
          createNumeric({
            "id": "ee-13-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 146 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 146 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 73.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 146 = 73.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 146 = 73.0 V."
}),
          createCircuitLab({
            "id": "ee-13-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Реальні резистори, потенціометри, допуски та вимірювання».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Real Resistors, Potentiometers, Tolerances & Measurement'.",
            "title": "Exam Lab 13.9: Real Resistors, Potentiometers, Tolerances & Measurement",
            "netlist": "* Exam Model 13_9\nV1 in 0 DC 12\nR1 in out 22k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 3.75,
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
            "id": "ee-13-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Реальні резистори, потенціометри, допуски та вимірювання».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Real Resistors, Potentiometers, Tolerances & Measurement'.",
            "title": "Exam Lab 13.10: Real Resistors, Potentiometers, Tolerances & Measurement",
            "netlist": "* Exam Model 13_10\nV1 in 0 DC 12\nR1 in out 23k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 3.636,
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
    slug: "ee-14-capacitors-dielectrics",
    titleUk: "Конденсатори, діелектрики, енергія та з'єднання",
    titleEn: "Capacitors, Dielectrics, Energy & Configurations",
    lessons: [
      createLesson({
        slug: "ee-14-l1",
        titleUk: "Конденсатори, діелектрики, енергія та з'єднання (Частина 1)",
        titleEn: "Capacitors, Dielectrics, Energy & Configurations (Part 1)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-14-l1-c1",
            "promptUk": "Теоретичні основи: Конденсатори, діелектрики, енергія та з'єднання (Частина 1)",
            "promptEn": "Theoretical Foundations: Capacitors, Dielectrics, Energy & Configurations (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Конденсатори, діелектрики, енергія та з'єднання». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Capacitors, Dielectrics, Energy & Configurations'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-14-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Конденсатори, діелектрики, енергія та з'єднання»?",
            "promptEn": "Which core statement is correct regarding 'Capacitors, Dielectrics, Energy & Configurations'?",
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
            "id": "ee-14-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 57 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 57 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 85.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 57 * 1.5 = 85.5 В.",
            "explanationEn": "Calculation follows direct scaling: 57 * 1.5 = 85.5 V."
}),
          createNumeric({
            "id": "ee-14-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 57 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 57 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.439,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 57 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 57 A."
}),
          createExplain({
            "id": "ee-14-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Конденсатори, діелектрики, енергія та з'єднання»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Capacitors, Dielectrics, Energy & Configurations':",
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
        slug: "ee-14-l2",
        titleUk: "Конденсатори, діелектрики, енергія та з'єднання (Частина 2)",
        titleEn: "Capacitors, Dielectrics, Energy & Configurations (Part 2)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-14-l2-c1",
            "promptUk": "Теоретичні основи: Конденсатори, діелектрики, енергія та з'єднання (Частина 2)",
            "promptEn": "Theoretical Foundations: Capacitors, Dielectrics, Energy & Configurations (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Конденсатори, діелектрики, енергія та з'єднання». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Capacitors, Dielectrics, Energy & Configurations'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-14-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Конденсатори, діелектрики, енергія та з'єднання»?",
            "promptEn": "Which core statement is correct regarding 'Capacitors, Dielectrics, Energy & Configurations'?",
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
            "id": "ee-14-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 62 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 62 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 93.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 62 * 1.5 = 93.0 В.",
            "explanationEn": "Calculation follows direct scaling: 62 * 1.5 = 93.0 V."
}),
          createNumeric({
            "id": "ee-14-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 62 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 62 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.403,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 62 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 62 A."
}),
          createExplain({
            "id": "ee-14-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Конденсатори, діелектрики, енергія та з'єднання»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Capacitors, Dielectrics, Energy & Configurations':",
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
        slug: "ee-14-l3",
        titleUk: "Конденсатори, діелектрики, енергія та з'єднання (Частина 3)",
        titleEn: "Capacitors, Dielectrics, Energy & Configurations (Part 3)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-14-l3-c1",
            "promptUk": "Теоретичні основи: Конденсатори, діелектрики, енергія та з'єднання (Частина 3)",
            "promptEn": "Theoretical Foundations: Capacitors, Dielectrics, Energy & Configurations (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Конденсатори, діелектрики, енергія та з'єднання». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Capacitors, Dielectrics, Energy & Configurations'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-14-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Конденсатори, діелектрики, енергія та з'єднання»?",
            "promptEn": "Which core statement is correct regarding 'Capacitors, Dielectrics, Energy & Configurations'?",
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
            "id": "ee-14-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 67 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 67 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 100.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 67 * 1.5 = 100.5 В.",
            "explanationEn": "Calculation follows direct scaling: 67 * 1.5 = 100.5 V."
}),
          createNumeric({
            "id": "ee-14-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 67 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 67 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.373,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 67 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 67 A."
}),
          createExplain({
            "id": "ee-14-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Конденсатори, діелектрики, енергія та з'єднання»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Capacitors, Dielectrics, Energy & Configurations':",
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
        slug: "ee-14-l4",
        titleUk: "Конденсатори, діелектрики, енергія та з'єднання (Частина 4)",
        titleEn: "Capacitors, Dielectrics, Energy & Configurations (Part 4)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-14-l4-c1",
            "promptUk": "Теоретичні основи: Конденсатори, діелектрики, енергія та з'єднання (Частина 4)",
            "promptEn": "Theoretical Foundations: Capacitors, Dielectrics, Energy & Configurations (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Конденсатори, діелектрики, енергія та з'єднання». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Capacitors, Dielectrics, Energy & Configurations'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-14-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Конденсатори, діелектрики, енергія та з'єднання»?",
            "promptEn": "Which core statement is correct regarding 'Capacitors, Dielectrics, Energy & Configurations'?",
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
            "id": "ee-14-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 72 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 72 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 108.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 72 * 1.5 = 108.0 В.",
            "explanationEn": "Calculation follows direct scaling: 72 * 1.5 = 108.0 V."
}),
          createCircuitLab({
            "id": "ee-14-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Конденсатори, діелектрики, енергія та з'єднання». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Capacitors, Dielectrics, Energy & Configurations'. Run simulation and verify nodes.",
            "title": "Lab 14.4: Capacitors, Dielectrics, Energy & Configurations",
            "netlist": "* EduForge SPICE Model for Unit 14\nV1 in 0 DC 10\nR1 in out 72k\nR2 out 0 47k\n.tran 10u 2m\n.end",
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
                                    "target": 3.95,
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
            "id": "ee-14-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Конденсатори, діелектрики, енергія та з'єднання»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Capacitors, Dielectrics, Energy & Configurations':",
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
        slug: "ee-14-l5",
        titleUk: "Конденсатори, діелектрики, енергія та з'єднання (Частина 5)",
        titleEn: "Capacitors, Dielectrics, Energy & Configurations (Part 5)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-14-l5-c1",
            "promptUk": "Теоретичні основи: Конденсатори, діелектрики, енергія та з'єднання (Частина 5)",
            "promptEn": "Theoretical Foundations: Capacitors, Dielectrics, Energy & Configurations (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Конденсатори, діелектрики, енергія та з'єднання». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Capacitors, Dielectrics, Energy & Configurations'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-14-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Конденсатори, діелектрики, енергія та з'єднання»?",
            "promptEn": "Which core statement is correct regarding 'Capacitors, Dielectrics, Energy & Configurations'?",
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
            "id": "ee-14-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 77 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 77 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 115.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 77 * 1.5 = 115.5 В.",
            "explanationEn": "Calculation follows direct scaling: 77 * 1.5 = 115.5 V."
}),
          createCircuitLab({
            "id": "ee-14-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Конденсатори, діелектрики, енергія та з'єднання». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Capacitors, Dielectrics, Energy & Configurations'. Run simulation and verify nodes.",
            "title": "Lab 14.5: Capacitors, Dielectrics, Energy & Configurations",
            "netlist": "* EduForge SPICE Model for Unit 14\nV1 in 0 DC 10\nR1 in out 77k\nR2 out 0 8k\n.tran 10u 2m\n.end",
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
                                    "target": 0.941,
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
            "id": "ee-14-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Конденсатори, діелектрики, енергія та з'єднання»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Capacitors, Dielectrics, Energy & Configurations':",
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
        slug: "ee-14-exam",
        titleUk: "Екзамен: Конденсатори, діелектрики, енергія та з'єднання",
        titleEn: "Exam: Capacitors, Dielectrics, Energy & Configurations",
        difficulty: 2,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-14-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Конденсатори, діелектрики, енергія та з'єднання»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Capacitors, Dielectrics, Energy & Configurations'?",
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
            "id": "ee-14-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Конденсатори, діелектрики, енергія та з'єднання»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Capacitors, Dielectrics, Energy & Configurations'?",
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
            "id": "ee-14-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Конденсатори, діелектрики, енергія та з'єднання»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Capacitors, Dielectrics, Energy & Configurations'?",
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
            "id": "ee-14-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Конденсатори, діелектрики, енергія та з'єднання»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Capacitors, Dielectrics, Energy & Configurations'?",
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
            "id": "ee-14-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 150 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 150 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 75.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 150 = 75.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 150 = 75.0 V."
}),
          createNumeric({
            "id": "ee-14-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 152 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 152 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 76.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 152 = 76.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 152 = 76.0 V."
}),
          createNumeric({
            "id": "ee-14-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 154 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 154 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 77.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 154 = 77.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 154 = 77.0 V."
}),
          createNumeric({
            "id": "ee-14-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 156 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 156 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 78.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 156 = 78.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 156 = 78.0 V."
}),
          createCircuitLab({
            "id": "ee-14-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Конденсатори, діелектрики, енергія та з'єднання».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Capacitors, Dielectrics, Energy & Configurations'.",
            "title": "Exam Lab 14.9: Capacitors, Dielectrics, Energy & Configurations",
            "netlist": "* Exam Model 14_9\nV1 in 0 DC 12\nR1 in out 23k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 3.636,
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
            "id": "ee-14-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Конденсатори, діелектрики, енергія та з'єднання».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Capacitors, Dielectrics, Energy & Configurations'.",
            "title": "Exam Lab 14.10: Capacitors, Dielectrics, Energy & Configurations",
            "netlist": "* Exam Model 14_10\nV1 in 0 DC 12\nR1 in out 24k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 3.529,
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
    slug: "ee-15-inductors-magnetic",
    titleUk: "Магнітне поле, індукція, котушки та взаємна індуктивність",
    titleEn: "Magnetic Fields, Induction, Inductors & Mutual Inductance",
    lessons: [
      createLesson({
        slug: "ee-15-l1",
        titleUk: "Магнітне поле, індукція, котушки та взаємна індуктивність (Частина 1)",
        titleEn: "Magnetic Fields, Induction, Inductors & Mutual Inductance (Part 1)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-15-l1-c1",
            "promptUk": "Теоретичні основи: Магнітне поле, індукція, котушки та взаємна індуктивність (Частина 1)",
            "promptEn": "Theoretical Foundations: Magnetic Fields, Induction, Inductors & Mutual Inductance (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Магнітне поле, індукція, котушки та взаємна індуктивність». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Magnetic Fields, Induction, Inductors & Mutual Inductance'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-15-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Магнітне поле, індукція, котушки та взаємна індуктивність»?",
            "promptEn": "Which core statement is correct regarding 'Magnetic Fields, Induction, Inductors & Mutual Inductance'?",
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
            "id": "ee-15-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 60 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 60 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 90.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 60 * 1.5 = 90.0 В.",
            "explanationEn": "Calculation follows direct scaling: 60 * 1.5 = 90.0 V."
}),
          createNumeric({
            "id": "ee-15-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 60 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 60 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.417,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 60 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 60 A."
}),
          createExplain({
            "id": "ee-15-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Магнітне поле, індукція, котушки та взаємна індуктивність»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Magnetic Fields, Induction, Inductors & Mutual Inductance':",
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
        slug: "ee-15-l2",
        titleUk: "Магнітне поле, індукція, котушки та взаємна індуктивність (Частина 2)",
        titleEn: "Magnetic Fields, Induction, Inductors & Mutual Inductance (Part 2)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-15-l2-c1",
            "promptUk": "Теоретичні основи: Магнітне поле, індукція, котушки та взаємна індуктивність (Частина 2)",
            "promptEn": "Theoretical Foundations: Magnetic Fields, Induction, Inductors & Mutual Inductance (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Магнітне поле, індукція, котушки та взаємна індуктивність». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Magnetic Fields, Induction, Inductors & Mutual Inductance'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-15-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Магнітне поле, індукція, котушки та взаємна індуктивність»?",
            "promptEn": "Which core statement is correct regarding 'Magnetic Fields, Induction, Inductors & Mutual Inductance'?",
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
            "id": "ee-15-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 65 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 65 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 97.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 65 * 1.5 = 97.5 В.",
            "explanationEn": "Calculation follows direct scaling: 65 * 1.5 = 97.5 V."
}),
          createNumeric({
            "id": "ee-15-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 65 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 65 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.385,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 65 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 65 A."
}),
          createExplain({
            "id": "ee-15-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Магнітне поле, індукція, котушки та взаємна індуктивність»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Magnetic Fields, Induction, Inductors & Mutual Inductance':",
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
        slug: "ee-15-l3",
        titleUk: "Магнітне поле, індукція, котушки та взаємна індуктивність (Частина 3)",
        titleEn: "Magnetic Fields, Induction, Inductors & Mutual Inductance (Part 3)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-15-l3-c1",
            "promptUk": "Теоретичні основи: Магнітне поле, індукція, котушки та взаємна індуктивність (Частина 3)",
            "promptEn": "Theoretical Foundations: Magnetic Fields, Induction, Inductors & Mutual Inductance (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Магнітне поле, індукція, котушки та взаємна індуктивність». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Magnetic Fields, Induction, Inductors & Mutual Inductance'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-15-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Магнітне поле, індукція, котушки та взаємна індуктивність»?",
            "promptEn": "Which core statement is correct regarding 'Magnetic Fields, Induction, Inductors & Mutual Inductance'?",
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
            "id": "ee-15-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 70 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 70 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 105.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 70 * 1.5 = 105.0 В.",
            "explanationEn": "Calculation follows direct scaling: 70 * 1.5 = 105.0 V."
}),
          createNumeric({
            "id": "ee-15-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 70 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 70 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.357,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 70 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 70 A."
}),
          createExplain({
            "id": "ee-15-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Магнітне поле, індукція, котушки та взаємна індуктивність»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Magnetic Fields, Induction, Inductors & Mutual Inductance':",
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
        slug: "ee-15-l4",
        titleUk: "Магнітне поле, індукція, котушки та взаємна індуктивність (Частина 4)",
        titleEn: "Magnetic Fields, Induction, Inductors & Mutual Inductance (Part 4)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-15-l4-c1",
            "promptUk": "Теоретичні основи: Магнітне поле, індукція, котушки та взаємна індуктивність (Частина 4)",
            "promptEn": "Theoretical Foundations: Magnetic Fields, Induction, Inductors & Mutual Inductance (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Магнітне поле, індукція, котушки та взаємна індуктивність». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Magnetic Fields, Induction, Inductors & Mutual Inductance'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-15-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Магнітне поле, індукція, котушки та взаємна індуктивність»?",
            "promptEn": "Which core statement is correct regarding 'Magnetic Fields, Induction, Inductors & Mutual Inductance'?",
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
            "id": "ee-15-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 75 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 75 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 112.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 75 * 1.5 = 112.5 В.",
            "explanationEn": "Calculation follows direct scaling: 75 * 1.5 = 112.5 V."
}),
          createCircuitLab({
            "id": "ee-15-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Магнітне поле, індукція, котушки та взаємна індуктивність». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Magnetic Fields, Induction, Inductors & Mutual Inductance'. Run simulation and verify nodes.",
            "title": "Lab 15.4: Magnetic Fields, Induction, Inductors & Mutual Inductance",
            "netlist": "* EduForge SPICE Model for Unit 15\nV1 in 0 DC 10\nR1 in out 75k\nR2 out 0 54k\n.tran 10u 2m\n.end",
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
                                    "target": 4.186,
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
            "id": "ee-15-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Магнітне поле, індукція, котушки та взаємна індуктивність»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Magnetic Fields, Induction, Inductors & Mutual Inductance':",
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
        slug: "ee-15-l5",
        titleUk: "Магнітне поле, індукція, котушки та взаємна індуктивність (Частина 5)",
        titleEn: "Magnetic Fields, Induction, Inductors & Mutual Inductance (Part 5)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-15-l5-c1",
            "promptUk": "Теоретичні основи: Магнітне поле, індукція, котушки та взаємна індуктивність (Частина 5)",
            "promptEn": "Theoretical Foundations: Magnetic Fields, Induction, Inductors & Mutual Inductance (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Магнітне поле, індукція, котушки та взаємна індуктивність». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Magnetic Fields, Induction, Inductors & Mutual Inductance'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-15-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Магнітне поле, індукція, котушки та взаємна індуктивність»?",
            "promptEn": "Which core statement is correct regarding 'Magnetic Fields, Induction, Inductors & Mutual Inductance'?",
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
            "id": "ee-15-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 80 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 80 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 120.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 80 * 1.5 = 120.0 В.",
            "explanationEn": "Calculation follows direct scaling: 80 * 1.5 = 120.0 V."
}),
          createCircuitLab({
            "id": "ee-15-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Магнітне поле, індукція, котушки та взаємна індуктивність». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Magnetic Fields, Induction, Inductors & Mutual Inductance'. Run simulation and verify nodes.",
            "title": "Lab 15.5: Magnetic Fields, Induction, Inductors & Mutual Inductance",
            "netlist": "* EduForge SPICE Model for Unit 15\nV1 in 0 DC 10\nR1 in out 80k\nR2 out 0 15k\n.tran 10u 2m\n.end",
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
                                    "target": 1.579,
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
            "id": "ee-15-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Магнітне поле, індукція, котушки та взаємна індуктивність»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Magnetic Fields, Induction, Inductors & Mutual Inductance':",
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
        slug: "ee-15-exam",
        titleUk: "Екзамен: Магнітне поле, індукція, котушки та взаємна індуктивність",
        titleEn: "Exam: Magnetic Fields, Induction, Inductors & Mutual Inductance",
        difficulty: 2,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-15-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Магнітне поле, індукція, котушки та взаємна індуктивність»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Magnetic Fields, Induction, Inductors & Mutual Inductance'?",
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
            "id": "ee-15-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Магнітне поле, індукція, котушки та взаємна індуктивність»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Magnetic Fields, Induction, Inductors & Mutual Inductance'?",
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
            "id": "ee-15-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Магнітне поле, індукція, котушки та взаємна індуктивність»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Magnetic Fields, Induction, Inductors & Mutual Inductance'?",
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
            "id": "ee-15-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Магнітне поле, індукція, котушки та взаємна індуктивність»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Magnetic Fields, Induction, Inductors & Mutual Inductance'?",
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
            "id": "ee-15-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 160 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 160 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 80.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 160 = 80.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 160 = 80.0 V."
}),
          createNumeric({
            "id": "ee-15-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 162 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 162 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 81.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 162 = 81.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 162 = 81.0 V."
}),
          createNumeric({
            "id": "ee-15-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 164 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 164 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 82.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 164 = 82.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 164 = 82.0 V."
}),
          createNumeric({
            "id": "ee-15-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 166 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 166 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 83.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 166 = 83.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 166 = 83.0 V."
}),
          createCircuitLab({
            "id": "ee-15-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Магнітне поле, індукція, котушки та взаємна індуктивність».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Magnetic Fields, Induction, Inductors & Mutual Inductance'.",
            "title": "Exam Lab 15.9: Magnetic Fields, Induction, Inductors & Mutual Inductance",
            "netlist": "* Exam Model 15_9\nV1 in 0 DC 12\nR1 in out 24k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 3.529,
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
            "id": "ee-15-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Магнітне поле, індукція, котушки та взаємна індуктивність».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Magnetic Fields, Induction, Inductors & Mutual Inductance'.",
            "title": "Exam Lab 15.10: Magnetic Fields, Induction, Inductors & Mutual Inductance",
            "netlist": "* Exam Model 15_10\nV1 in 0 DC 12\nR1 in out 25k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 3.429,
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
    slug: "ee-16-math-transients",
    titleUk: "Експонента, логарифм, похідна та інтеграл у колах",
    titleEn: "Exponentials, Logarithms, Derivatives & Integrals in Circuits",
    lessons: [
      createLesson({
        slug: "ee-16-l1",
        titleUk: "Експонента, логарифм, похідна та інтеграл у колах (Частина 1)",
        titleEn: "Exponentials, Logarithms, Derivatives & Integrals in Circuits (Part 1)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-16-l1-c1",
            "promptUk": "Теоретичні основи: Експонента, логарифм, похідна та інтеграл у колах (Частина 1)",
            "promptEn": "Theoretical Foundations: Exponentials, Logarithms, Derivatives & Integrals in Circuits (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Експонента, логарифм, похідна та інтеграл у колах». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Exponentials, Logarithms, Derivatives & Integrals in Circuits'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-16-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Експонента, логарифм, похідна та інтеграл у колах»?",
            "promptEn": "Which core statement is correct regarding 'Exponentials, Logarithms, Derivatives & Integrals in Circuits'?",
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
            "id": "ee-16-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 63 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 63 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 94.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 63 * 1.5 = 94.5 В.",
            "explanationEn": "Calculation follows direct scaling: 63 * 1.5 = 94.5 V."
}),
          createNumeric({
            "id": "ee-16-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 63 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 63 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.397,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 63 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 63 A."
}),
          createExplain({
            "id": "ee-16-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Експонента, логарифм, похідна та інтеграл у колах»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Exponentials, Logarithms, Derivatives & Integrals in Circuits':",
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
        slug: "ee-16-l2",
        titleUk: "Експонента, логарифм, похідна та інтеграл у колах (Частина 2)",
        titleEn: "Exponentials, Logarithms, Derivatives & Integrals in Circuits (Part 2)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-16-l2-c1",
            "promptUk": "Теоретичні основи: Експонента, логарифм, похідна та інтеграл у колах (Частина 2)",
            "promptEn": "Theoretical Foundations: Exponentials, Logarithms, Derivatives & Integrals in Circuits (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Експонента, логарифм, похідна та інтеграл у колах». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Exponentials, Logarithms, Derivatives & Integrals in Circuits'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-16-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Експонента, логарифм, похідна та інтеграл у колах»?",
            "promptEn": "Which core statement is correct regarding 'Exponentials, Logarithms, Derivatives & Integrals in Circuits'?",
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
            "id": "ee-16-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 68 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 68 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 102.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 68 * 1.5 = 102.0 В.",
            "explanationEn": "Calculation follows direct scaling: 68 * 1.5 = 102.0 V."
}),
          createNumeric({
            "id": "ee-16-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 68 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 68 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.368,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 68 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 68 A."
}),
          createExplain({
            "id": "ee-16-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Експонента, логарифм, похідна та інтеграл у колах»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Exponentials, Logarithms, Derivatives & Integrals in Circuits':",
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
        slug: "ee-16-l3",
        titleUk: "Експонента, логарифм, похідна та інтеграл у колах (Частина 3)",
        titleEn: "Exponentials, Logarithms, Derivatives & Integrals in Circuits (Part 3)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-16-l3-c1",
            "promptUk": "Теоретичні основи: Експонента, логарифм, похідна та інтеграл у колах (Частина 3)",
            "promptEn": "Theoretical Foundations: Exponentials, Logarithms, Derivatives & Integrals in Circuits (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Експонента, логарифм, похідна та інтеграл у колах». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Exponentials, Logarithms, Derivatives & Integrals in Circuits'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-16-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Експонента, логарифм, похідна та інтеграл у колах»?",
            "promptEn": "Which core statement is correct regarding 'Exponentials, Logarithms, Derivatives & Integrals in Circuits'?",
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
            "id": "ee-16-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 73 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 73 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 109.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 73 * 1.5 = 109.5 В.",
            "explanationEn": "Calculation follows direct scaling: 73 * 1.5 = 109.5 V."
}),
          createNumeric({
            "id": "ee-16-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 73 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 73 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.342,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 73 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 73 A."
}),
          createExplain({
            "id": "ee-16-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Експонента, логарифм, похідна та інтеграл у колах»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Exponentials, Logarithms, Derivatives & Integrals in Circuits':",
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
        slug: "ee-16-l4",
        titleUk: "Експонента, логарифм, похідна та інтеграл у колах (Частина 4)",
        titleEn: "Exponentials, Logarithms, Derivatives & Integrals in Circuits (Part 4)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-16-l4-c1",
            "promptUk": "Теоретичні основи: Експонента, логарифм, похідна та інтеграл у колах (Частина 4)",
            "promptEn": "Theoretical Foundations: Exponentials, Logarithms, Derivatives & Integrals in Circuits (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Експонента, логарифм, похідна та інтеграл у колах». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Exponentials, Logarithms, Derivatives & Integrals in Circuits'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-16-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Експонента, логарифм, похідна та інтеграл у колах»?",
            "promptEn": "Which core statement is correct regarding 'Exponentials, Logarithms, Derivatives & Integrals in Circuits'?",
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
            "id": "ee-16-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 78 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 78 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 117.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 78 * 1.5 = 117.0 В.",
            "explanationEn": "Calculation follows direct scaling: 78 * 1.5 = 117.0 V."
}),
          createCircuitLab({
            "id": "ee-16-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Експонента, логарифм, похідна та інтеграл у колах». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Exponentials, Logarithms, Derivatives & Integrals in Circuits'. Run simulation and verify nodes.",
            "title": "Lab 16.4: Exponentials, Logarithms, Derivatives & Integrals in Circuits",
            "netlist": "* EduForge SPICE Model for Unit 16\nV1 in 0 DC 10\nR1 in out 78k\nR2 out 0 11k\n.tran 10u 2m\n.end",
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
                                    "target": 1.236,
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
            "id": "ee-16-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Експонента, логарифм, похідна та інтеграл у колах»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Exponentials, Logarithms, Derivatives & Integrals in Circuits':",
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
        slug: "ee-16-l5",
        titleUk: "Експонента, логарифм, похідна та інтеграл у колах (Частина 5)",
        titleEn: "Exponentials, Logarithms, Derivatives & Integrals in Circuits (Part 5)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-16-l5-c1",
            "promptUk": "Теоретичні основи: Експонента, логарифм, похідна та інтеграл у колах (Частина 5)",
            "promptEn": "Theoretical Foundations: Exponentials, Logarithms, Derivatives & Integrals in Circuits (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Експонента, логарифм, похідна та інтеграл у колах». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Exponentials, Logarithms, Derivatives & Integrals in Circuits'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-16-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Експонента, логарифм, похідна та інтеграл у колах»?",
            "promptEn": "Which core statement is correct regarding 'Exponentials, Logarithms, Derivatives & Integrals in Circuits'?",
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
            "id": "ee-16-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 83 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 83 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 124.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 83 * 1.5 = 124.5 В.",
            "explanationEn": "Calculation follows direct scaling: 83 * 1.5 = 124.5 V."
}),
          createCircuitLab({
            "id": "ee-16-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Експонента, логарифм, похідна та інтеграл у колах». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Exponentials, Logarithms, Derivatives & Integrals in Circuits'. Run simulation and verify nodes.",
            "title": "Lab 16.5: Exponentials, Logarithms, Derivatives & Integrals in Circuits",
            "netlist": "* EduForge SPICE Model for Unit 16\nV1 in 0 DC 10\nR1 in out 83k\nR2 out 0 22k\n.tran 10u 2m\n.end",
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
                                    "target": 2.095,
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
            "id": "ee-16-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Експонента, логарифм, похідна та інтеграл у колах»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Exponentials, Logarithms, Derivatives & Integrals in Circuits':",
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
        slug: "ee-16-exam",
        titleUk: "Екзамен: Експонента, логарифм, похідна та інтеграл у колах",
        titleEn: "Exam: Exponentials, Logarithms, Derivatives & Integrals in Circuits",
        difficulty: 2,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-16-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Експонента, логарифм, похідна та інтеграл у колах»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Exponentials, Logarithms, Derivatives & Integrals in Circuits'?",
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
            "id": "ee-16-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Експонента, логарифм, похідна та інтеграл у колах»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Exponentials, Logarithms, Derivatives & Integrals in Circuits'?",
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
            "id": "ee-16-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Експонента, логарифм, похідна та інтеграл у колах»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Exponentials, Logarithms, Derivatives & Integrals in Circuits'?",
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
            "id": "ee-16-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Експонента, логарифм, похідна та інтеграл у колах»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Exponentials, Logarithms, Derivatives & Integrals in Circuits'?",
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
            "id": "ee-16-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 170 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 170 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 85.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 170 = 85.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 170 = 85.0 V."
}),
          createNumeric({
            "id": "ee-16-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 172 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 172 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 86.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 172 = 86.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 172 = 86.0 V."
}),
          createNumeric({
            "id": "ee-16-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 174 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 174 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 87.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 174 = 87.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 174 = 87.0 V."
}),
          createNumeric({
            "id": "ee-16-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 176 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 176 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 88.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 176 = 88.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 176 = 88.0 V."
}),
          createCircuitLab({
            "id": "ee-16-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Експонента, логарифм, похідна та інтеграл у колах».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Exponentials, Logarithms, Derivatives & Integrals in Circuits'.",
            "title": "Exam Lab 16.9: Exponentials, Logarithms, Derivatives & Integrals in Circuits",
            "netlist": "* Exam Model 16_9\nV1 in 0 DC 12\nR1 in out 25k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 3.429,
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
            "id": "ee-16-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Експонента, логарифм, похідна та інтеграл у колах».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Exponentials, Logarithms, Derivatives & Integrals in Circuits'.",
            "title": "Exam Lab 16.10: Exponentials, Logarithms, Derivatives & Integrals in Circuits",
            "netlist": "* Exam Model 16_10\nV1 in 0 DC 12\nR1 in out 26k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 3.333,
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
    slug: "ee-17-rc-rl-transients",
    titleUk: "Перехідні процеси RC та RL, початкові умови",
    titleEn: "RC & RL Transients, Time Constants & Initial Conditions",
    lessons: [
      createLesson({
        slug: "ee-17-l1",
        titleUk: "Перехідні процеси RC та RL, початкові умови (Частина 1)",
        titleEn: "RC & RL Transients, Time Constants & Initial Conditions (Part 1)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-17-l1-c1",
            "promptUk": "Теоретичні основи: Перехідні процеси RC та RL, початкові умови (Частина 1)",
            "promptEn": "Theoretical Foundations: RC & RL Transients, Time Constants & Initial Conditions (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Перехідні процеси RC та RL, початкові умови». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'RC & RL Transients, Time Constants & Initial Conditions'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-17-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Перехідні процеси RC та RL, початкові умови»?",
            "promptEn": "Which core statement is correct regarding 'RC & RL Transients, Time Constants & Initial Conditions'?",
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
            "id": "ee-17-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 66 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 66 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 99.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 66 * 1.5 = 99.0 В.",
            "explanationEn": "Calculation follows direct scaling: 66 * 1.5 = 99.0 V."
}),
          createNumeric({
            "id": "ee-17-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 66 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 66 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.379,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 66 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 66 A."
}),
          createExplain({
            "id": "ee-17-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Перехідні процеси RC та RL, початкові умови»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'RC & RL Transients, Time Constants & Initial Conditions':",
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
        slug: "ee-17-l2",
        titleUk: "Перехідні процеси RC та RL, початкові умови (Частина 2)",
        titleEn: "RC & RL Transients, Time Constants & Initial Conditions (Part 2)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-17-l2-c1",
            "promptUk": "Теоретичні основи: Перехідні процеси RC та RL, початкові умови (Частина 2)",
            "promptEn": "Theoretical Foundations: RC & RL Transients, Time Constants & Initial Conditions (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Перехідні процеси RC та RL, початкові умови». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'RC & RL Transients, Time Constants & Initial Conditions'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-17-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Перехідні процеси RC та RL, початкові умови»?",
            "promptEn": "Which core statement is correct regarding 'RC & RL Transients, Time Constants & Initial Conditions'?",
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
            "id": "ee-17-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 71 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 71 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 106.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 71 * 1.5 = 106.5 В.",
            "explanationEn": "Calculation follows direct scaling: 71 * 1.5 = 106.5 V."
}),
          createNumeric({
            "id": "ee-17-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 71 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 71 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.352,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 71 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 71 A."
}),
          createExplain({
            "id": "ee-17-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Перехідні процеси RC та RL, початкові умови»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'RC & RL Transients, Time Constants & Initial Conditions':",
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
        slug: "ee-17-l3",
        titleUk: "Перехідні процеси RC та RL, початкові умови (Частина 3)",
        titleEn: "RC & RL Transients, Time Constants & Initial Conditions (Part 3)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-17-l3-c1",
            "promptUk": "Теоретичні основи: Перехідні процеси RC та RL, початкові умови (Частина 3)",
            "promptEn": "Theoretical Foundations: RC & RL Transients, Time Constants & Initial Conditions (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Перехідні процеси RC та RL, початкові умови». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'RC & RL Transients, Time Constants & Initial Conditions'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-17-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Перехідні процеси RC та RL, початкові умови»?",
            "promptEn": "Which core statement is correct regarding 'RC & RL Transients, Time Constants & Initial Conditions'?",
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
            "id": "ee-17-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 76 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 76 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 114.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 76 * 1.5 = 114.0 В.",
            "explanationEn": "Calculation follows direct scaling: 76 * 1.5 = 114.0 V."
}),
          createNumeric({
            "id": "ee-17-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 76 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 76 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.329,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 76 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 76 A."
}),
          createExplain({
            "id": "ee-17-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Перехідні процеси RC та RL, початкові умови»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'RC & RL Transients, Time Constants & Initial Conditions':",
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
        slug: "ee-17-l4",
        titleUk: "Перехідні процеси RC та RL, початкові умови (Частина 4)",
        titleEn: "RC & RL Transients, Time Constants & Initial Conditions (Part 4)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-17-l4-c1",
            "promptUk": "Теоретичні основи: Перехідні процеси RC та RL, початкові умови (Частина 4)",
            "promptEn": "Theoretical Foundations: RC & RL Transients, Time Constants & Initial Conditions (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Перехідні процеси RC та RL, початкові умови». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'RC & RL Transients, Time Constants & Initial Conditions'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-17-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Перехідні процеси RC та RL, початкові умови»?",
            "promptEn": "Which core statement is correct regarding 'RC & RL Transients, Time Constants & Initial Conditions'?",
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
            "id": "ee-17-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 81 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 81 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 121.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 81 * 1.5 = 121.5 В.",
            "explanationEn": "Calculation follows direct scaling: 81 * 1.5 = 121.5 V."
}),
          createCircuitLab({
            "id": "ee-17-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Перехідні процеси RC та RL, початкові умови». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'RC & RL Transients, Time Constants & Initial Conditions'. Run simulation and verify nodes.",
            "title": "Lab 17.4: RC & RL Transients, Time Constants & Initial Conditions",
            "netlist": "* EduForge SPICE Model for Unit 17\nV1 in 0 DC 10\nR1 in out 81k\nR2 out 0 18k\n.tran 10u 2m\n.end",
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
                                    "target": 1.818,
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
            "id": "ee-17-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Перехідні процеси RC та RL, початкові умови»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'RC & RL Transients, Time Constants & Initial Conditions':",
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
        slug: "ee-17-l5",
        titleUk: "Перехідні процеси RC та RL, початкові умови (Частина 5)",
        titleEn: "RC & RL Transients, Time Constants & Initial Conditions (Part 5)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-17-l5-c1",
            "promptUk": "Теоретичні основи: Перехідні процеси RC та RL, початкові умови (Частина 5)",
            "promptEn": "Theoretical Foundations: RC & RL Transients, Time Constants & Initial Conditions (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Перехідні процеси RC та RL, початкові умови». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'RC & RL Transients, Time Constants & Initial Conditions'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-17-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Перехідні процеси RC та RL, початкові умови»?",
            "promptEn": "Which core statement is correct regarding 'RC & RL Transients, Time Constants & Initial Conditions'?",
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
            "id": "ee-17-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 86 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 86 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 129.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 86 * 1.5 = 129.0 В.",
            "explanationEn": "Calculation follows direct scaling: 86 * 1.5 = 129.0 V."
}),
          createCircuitLab({
            "id": "ee-17-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Перехідні процеси RC та RL, початкові умови». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'RC & RL Transients, Time Constants & Initial Conditions'. Run simulation and verify nodes.",
            "title": "Lab 17.5: RC & RL Transients, Time Constants & Initial Conditions",
            "netlist": "* EduForge SPICE Model for Unit 17\nV1 in 0 DC 10\nR1 in out 86k\nR2 out 0 29k\n.tran 10u 2m\n.end",
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
                                    "target": 2.522,
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
            "id": "ee-17-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Перехідні процеси RC та RL, початкові умови»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'RC & RL Transients, Time Constants & Initial Conditions':",
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
        slug: "ee-17-exam",
        titleUk: "Екзамен: Перехідні процеси RC та RL, початкові умови",
        titleEn: "Exam: RC & RL Transients, Time Constants & Initial Conditions",
        difficulty: 2,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-17-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Перехідні процеси RC та RL, початкові умови»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'RC & RL Transients, Time Constants & Initial Conditions'?",
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
            "id": "ee-17-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Перехідні процеси RC та RL, початкові умови»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'RC & RL Transients, Time Constants & Initial Conditions'?",
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
            "id": "ee-17-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Перехідні процеси RC та RL, початкові умови»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'RC & RL Transients, Time Constants & Initial Conditions'?",
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
            "id": "ee-17-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Перехідні процеси RC та RL, початкові умови»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'RC & RL Transients, Time Constants & Initial Conditions'?",
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
            "id": "ee-17-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 180 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 180 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 90.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 180 = 90.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 180 = 90.0 V."
}),
          createNumeric({
            "id": "ee-17-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 182 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 182 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 91.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 182 = 91.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 182 = 91.0 V."
}),
          createNumeric({
            "id": "ee-17-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 184 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 184 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 92.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 184 = 92.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 184 = 92.0 V."
}),
          createNumeric({
            "id": "ee-17-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 186 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 186 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 93.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 186 = 93.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 186 = 93.0 V."
}),
          createCircuitLab({
            "id": "ee-17-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Перехідні процеси RC та RL, початкові умови».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'RC & RL Transients, Time Constants & Initial Conditions'.",
            "title": "Exam Lab 17.9: RC & RL Transients, Time Constants & Initial Conditions",
            "netlist": "* Exam Model 17_9\nV1 in 0 DC 12\nR1 in out 26k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 3.333,
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
            "id": "ee-17-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Перехідні процеси RC та RL, початкові умови».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'RC & RL Transients, Time Constants & Initial Conditions'.",
            "title": "Exam Lab 17.10: RC & RL Transients, Time Constants & Initial Conditions",
            "netlist": "* Exam Model 17_10\nV1 in 0 DC 12\nR1 in out 27k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 3.243,
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
    slug: "ee-18-rlc-second-order",
    titleUk: "RLC-кола, рівняння другого порядку, затухання та коливання",
    titleEn: "RLC Circuits, Second-Order ODEs, Damping & Oscillation",
    lessons: [
      createLesson({
        slug: "ee-18-l1",
        titleUk: "RLC-кола, рівняння другого порядку, затухання та коливання (Частина 1)",
        titleEn: "RLC Circuits, Second-Order ODEs, Damping & Oscillation (Part 1)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-18-l1-c1",
            "promptUk": "Теоретичні основи: RLC-кола, рівняння другого порядку, затухання та коливання (Частина 1)",
            "promptEn": "Theoretical Foundations: RLC Circuits, Second-Order ODEs, Damping & Oscillation (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «RLC-кола, рівняння другого порядку, затухання та коливання». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'RLC Circuits, Second-Order ODEs, Damping & Oscillation'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-18-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «RLC-кола, рівняння другого порядку, затухання та коливання»?",
            "promptEn": "Which core statement is correct regarding 'RLC Circuits, Second-Order ODEs, Damping & Oscillation'?",
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
            "id": "ee-18-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 69 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 69 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 103.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 69 * 1.5 = 103.5 В.",
            "explanationEn": "Calculation follows direct scaling: 69 * 1.5 = 103.5 V."
}),
          createNumeric({
            "id": "ee-18-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 69 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 69 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.362,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 69 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 69 A."
}),
          createExplain({
            "id": "ee-18-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «RLC-кола, рівняння другого порядку, затухання та коливання»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'RLC Circuits, Second-Order ODEs, Damping & Oscillation':",
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
        slug: "ee-18-l2",
        titleUk: "RLC-кола, рівняння другого порядку, затухання та коливання (Частина 2)",
        titleEn: "RLC Circuits, Second-Order ODEs, Damping & Oscillation (Part 2)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-18-l2-c1",
            "promptUk": "Теоретичні основи: RLC-кола, рівняння другого порядку, затухання та коливання (Частина 2)",
            "promptEn": "Theoretical Foundations: RLC Circuits, Second-Order ODEs, Damping & Oscillation (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «RLC-кола, рівняння другого порядку, затухання та коливання». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'RLC Circuits, Second-Order ODEs, Damping & Oscillation'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-18-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «RLC-кола, рівняння другого порядку, затухання та коливання»?",
            "promptEn": "Which core statement is correct regarding 'RLC Circuits, Second-Order ODEs, Damping & Oscillation'?",
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
            "id": "ee-18-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 74 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 74 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 111.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 74 * 1.5 = 111.0 В.",
            "explanationEn": "Calculation follows direct scaling: 74 * 1.5 = 111.0 V."
}),
          createNumeric({
            "id": "ee-18-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 74 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 74 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.338,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 74 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 74 A."
}),
          createExplain({
            "id": "ee-18-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «RLC-кола, рівняння другого порядку, затухання та коливання»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'RLC Circuits, Second-Order ODEs, Damping & Oscillation':",
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
        slug: "ee-18-l3",
        titleUk: "RLC-кола, рівняння другого порядку, затухання та коливання (Частина 3)",
        titleEn: "RLC Circuits, Second-Order ODEs, Damping & Oscillation (Part 3)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-18-l3-c1",
            "promptUk": "Теоретичні основи: RLC-кола, рівняння другого порядку, затухання та коливання (Частина 3)",
            "promptEn": "Theoretical Foundations: RLC Circuits, Second-Order ODEs, Damping & Oscillation (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «RLC-кола, рівняння другого порядку, затухання та коливання». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'RLC Circuits, Second-Order ODEs, Damping & Oscillation'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-18-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «RLC-кола, рівняння другого порядку, затухання та коливання»?",
            "promptEn": "Which core statement is correct regarding 'RLC Circuits, Second-Order ODEs, Damping & Oscillation'?",
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
            "id": "ee-18-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 79 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 79 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 118.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 79 * 1.5 = 118.5 В.",
            "explanationEn": "Calculation follows direct scaling: 79 * 1.5 = 118.5 V."
}),
          createNumeric({
            "id": "ee-18-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 79 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 79 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.316,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 79 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 79 A."
}),
          createExplain({
            "id": "ee-18-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «RLC-кола, рівняння другого порядку, затухання та коливання»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'RLC Circuits, Second-Order ODEs, Damping & Oscillation':",
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
        slug: "ee-18-l4",
        titleUk: "RLC-кола, рівняння другого порядку, затухання та коливання (Частина 4)",
        titleEn: "RLC Circuits, Second-Order ODEs, Damping & Oscillation (Part 4)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-18-l4-c1",
            "promptUk": "Теоретичні основи: RLC-кола, рівняння другого порядку, затухання та коливання (Частина 4)",
            "promptEn": "Theoretical Foundations: RLC Circuits, Second-Order ODEs, Damping & Oscillation (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «RLC-кола, рівняння другого порядку, затухання та коливання». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'RLC Circuits, Second-Order ODEs, Damping & Oscillation'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-18-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «RLC-кола, рівняння другого порядку, затухання та коливання»?",
            "promptEn": "Which core statement is correct regarding 'RLC Circuits, Second-Order ODEs, Damping & Oscillation'?",
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
            "id": "ee-18-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 84 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 84 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 126.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 84 * 1.5 = 126.0 В.",
            "explanationEn": "Calculation follows direct scaling: 84 * 1.5 = 126.0 V."
}),
          createCircuitLab({
            "id": "ee-18-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «RLC-кола, рівняння другого порядку, затухання та коливання». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'RLC Circuits, Second-Order ODEs, Damping & Oscillation'. Run simulation and verify nodes.",
            "title": "Lab 18.4: RLC Circuits, Second-Order ODEs, Damping & Oscillation",
            "netlist": "* EduForge SPICE Model for Unit 18\nV1 in 0 DC 10\nR1 in out 84k\nR2 out 0 25k\n.tran 10u 2m\n.end",
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
                                    "target": 2.294,
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
            "id": "ee-18-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «RLC-кола, рівняння другого порядку, затухання та коливання»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'RLC Circuits, Second-Order ODEs, Damping & Oscillation':",
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
        slug: "ee-18-l5",
        titleUk: "RLC-кола, рівняння другого порядку, затухання та коливання (Частина 5)",
        titleEn: "RLC Circuits, Second-Order ODEs, Damping & Oscillation (Part 5)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-18-l5-c1",
            "promptUk": "Теоретичні основи: RLC-кола, рівняння другого порядку, затухання та коливання (Частина 5)",
            "promptEn": "Theoretical Foundations: RLC Circuits, Second-Order ODEs, Damping & Oscillation (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «RLC-кола, рівняння другого порядку, затухання та коливання». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'RLC Circuits, Second-Order ODEs, Damping & Oscillation'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-18-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «RLC-кола, рівняння другого порядку, затухання та коливання»?",
            "promptEn": "Which core statement is correct regarding 'RLC Circuits, Second-Order ODEs, Damping & Oscillation'?",
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
            "id": "ee-18-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 89 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 89 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 133.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 89 * 1.5 = 133.5 В.",
            "explanationEn": "Calculation follows direct scaling: 89 * 1.5 = 133.5 V."
}),
          createCircuitLab({
            "id": "ee-18-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «RLC-кола, рівняння другого порядку, затухання та коливання». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'RLC Circuits, Second-Order ODEs, Damping & Oscillation'. Run simulation and verify nodes.",
            "title": "Lab 18.5: RLC Circuits, Second-Order ODEs, Damping & Oscillation",
            "netlist": "* EduForge SPICE Model for Unit 18\nV1 in 0 DC 10\nR1 in out 89k\nR2 out 0 36k\n.tran 10u 2m\n.end",
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
                                    "target": 2.88,
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
            "id": "ee-18-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «RLC-кола, рівняння другого порядку, затухання та коливання»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'RLC Circuits, Second-Order ODEs, Damping & Oscillation':",
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
        slug: "ee-18-exam",
        titleUk: "Екзамен: RLC-кола, рівняння другого порядку, затухання та коливання",
        titleEn: "Exam: RLC Circuits, Second-Order ODEs, Damping & Oscillation",
        difficulty: 2,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-18-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «RLC-кола, рівняння другого порядку, затухання та коливання»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'RLC Circuits, Second-Order ODEs, Damping & Oscillation'?",
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
            "id": "ee-18-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «RLC-кола, рівняння другого порядку, затухання та коливання»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'RLC Circuits, Second-Order ODEs, Damping & Oscillation'?",
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
            "id": "ee-18-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «RLC-кола, рівняння другого порядку, затухання та коливання»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'RLC Circuits, Second-Order ODEs, Damping & Oscillation'?",
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
            "id": "ee-18-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «RLC-кола, рівняння другого порядку, затухання та коливання»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'RLC Circuits, Second-Order ODEs, Damping & Oscillation'?",
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
            "id": "ee-18-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 190 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 190 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 95.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 190 = 95.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 190 = 95.0 V."
}),
          createNumeric({
            "id": "ee-18-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 192 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 192 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 96.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 192 = 96.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 192 = 96.0 V."
}),
          createNumeric({
            "id": "ee-18-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 194 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 194 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 97.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 194 = 97.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 194 = 97.0 V."
}),
          createNumeric({
            "id": "ee-18-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 196 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 196 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 98.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 196 = 98.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 196 = 98.0 V."
}),
          createCircuitLab({
            "id": "ee-18-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «RLC-кола, рівняння другого порядку, затухання та коливання».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'RLC Circuits, Second-Order ODEs, Damping & Oscillation'.",
            "title": "Exam Lab 18.9: RLC Circuits, Second-Order ODEs, Damping & Oscillation",
            "netlist": "* Exam Model 18_9\nV1 in 0 DC 12\nR1 in out 27k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 3.243,
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
            "id": "ee-18-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «RLC-кола, рівняння другого порядку, затухання та коливання».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'RLC Circuits, Second-Order ODEs, Damping & Oscillation'.",
            "title": "Exam Lab 18.10: RLC Circuits, Second-Order ODEs, Damping & Oscillation",
            "netlist": "* Exam Model 18_10\nV1 in 0 DC 12\nR1 in out 28k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 3.158,
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