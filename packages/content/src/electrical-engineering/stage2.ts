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
 * Stage 2: 6 Units, 36 Lessons (5 instructional + 1 exam per unit)
 */
export const stage2Units: UnitContent[] = [
  createUnit({
    slug: "ee-07-schematics-meters",
    titleUk: "Читання схем, вузли, вітки, земля та вимірювачі",
    titleEn: "Schematics, Nodes, Branches, Ground & Meters",
    lessons: [
      createLesson({
        slug: "ee-07-l1",
        titleUk: "Читання схем, вузли, вітки, земля та вимірювачі (Частина 1)",
        titleEn: "Schematics, Nodes, Branches, Ground & Meters (Part 1)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-07-l1-c1",
            "promptUk": "Теоретичні основи: Читання схем, вузли, вітки, земля та вимірювачі (Частина 1)",
            "promptEn": "Theoretical Foundations: Schematics, Nodes, Branches, Ground & Meters (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Читання схем, вузли, вітки, земля та вимірювачі». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Schematics, Nodes, Branches, Ground & Meters'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-07-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Читання схем, вузли, вітки, земля та вимірювачі»?",
            "promptEn": "Which core statement is correct regarding 'Schematics, Nodes, Branches, Ground & Meters'?",
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
            "id": "ee-07-l1-n1",
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
            "id": "ee-07-l1-n2",
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
            "id": "ee-07-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Читання схем, вузли, вітки, земля та вимірювачі»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Schematics, Nodes, Branches, Ground & Meters':",
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
        slug: "ee-07-l2",
        titleUk: "Читання схем, вузли, вітки, земля та вимірювачі (Частина 2)",
        titleEn: "Schematics, Nodes, Branches, Ground & Meters (Part 2)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-07-l2-c1",
            "promptUk": "Теоретичні основи: Читання схем, вузли, вітки, земля та вимірювачі (Частина 2)",
            "promptEn": "Theoretical Foundations: Schematics, Nodes, Branches, Ground & Meters (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Читання схем, вузли, вітки, земля та вимірювачі». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Schematics, Nodes, Branches, Ground & Meters'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-07-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Читання схем, вузли, вітки, земля та вимірювачі»?",
            "promptEn": "Which core statement is correct regarding 'Schematics, Nodes, Branches, Ground & Meters'?",
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
            "id": "ee-07-l2-n1",
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
            "id": "ee-07-l2-n2",
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
            "id": "ee-07-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Читання схем, вузли, вітки, земля та вимірювачі»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Schematics, Nodes, Branches, Ground & Meters':",
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
        slug: "ee-07-l3",
        titleUk: "Читання схем, вузли, вітки, земля та вимірювачі (Частина 3)",
        titleEn: "Schematics, Nodes, Branches, Ground & Meters (Part 3)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-07-l3-c1",
            "promptUk": "Теоретичні основи: Читання схем, вузли, вітки, земля та вимірювачі (Частина 3)",
            "promptEn": "Theoretical Foundations: Schematics, Nodes, Branches, Ground & Meters (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Читання схем, вузли, вітки, земля та вимірювачі». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Schematics, Nodes, Branches, Ground & Meters'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-07-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Читання схем, вузли, вітки, земля та вимірювачі»?",
            "promptEn": "Which core statement is correct regarding 'Schematics, Nodes, Branches, Ground & Meters'?",
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
            "id": "ee-07-l3-n1",
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
            "id": "ee-07-l3-n2",
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
            "id": "ee-07-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Читання схем, вузли, вітки, земля та вимірювачі»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Schematics, Nodes, Branches, Ground & Meters':",
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
        slug: "ee-07-l4",
        titleUk: "Читання схем, вузли, вітки, земля та вимірювачі (Частина 4)",
        titleEn: "Schematics, Nodes, Branches, Ground & Meters (Part 4)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-07-l4-c1",
            "promptUk": "Теоретичні основи: Читання схем, вузли, вітки, земля та вимірювачі (Частина 4)",
            "promptEn": "Theoretical Foundations: Schematics, Nodes, Branches, Ground & Meters (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Читання схем, вузли, вітки, земля та вимірювачі». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Schematics, Nodes, Branches, Ground & Meters'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-07-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Читання схем, вузли, вітки, земля та вимірювачі»?",
            "promptEn": "Which core statement is correct regarding 'Schematics, Nodes, Branches, Ground & Meters'?",
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
            "id": "ee-07-l4-n1",
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
          createCircuitLab({
            "id": "ee-07-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Читання схем, вузли, вітки, земля та вимірювачі». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Schematics, Nodes, Branches, Ground & Meters'. Run simulation and verify nodes.",
            "title": "Lab 7.4: Schematics, Nodes, Branches, Ground & Meters",
            "netlist": "* EduForge SPICE Model for Unit 7\nV1 in 0 DC 10\nR1 in out 51k\nR2 out 0 48k\n.tran 10u 2m\n.end",
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
                                    "target": 4.848,
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
            "id": "ee-07-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Читання схем, вузли, вітки, земля та вимірювачі»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Schematics, Nodes, Branches, Ground & Meters':",
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
        slug: "ee-07-l5",
        titleUk: "Читання схем, вузли, вітки, земля та вимірювачі (Частина 5)",
        titleEn: "Schematics, Nodes, Branches, Ground & Meters (Part 5)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-07-l5-c1",
            "promptUk": "Теоретичні основи: Читання схем, вузли, вітки, земля та вимірювачі (Частина 5)",
            "promptEn": "Theoretical Foundations: Schematics, Nodes, Branches, Ground & Meters (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Читання схем, вузли, вітки, земля та вимірювачі». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Schematics, Nodes, Branches, Ground & Meters'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-07-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Читання схем, вузли, вітки, земля та вимірювачі»?",
            "promptEn": "Which core statement is correct regarding 'Schematics, Nodes, Branches, Ground & Meters'?",
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
            "id": "ee-07-l5-n1",
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
            "id": "ee-07-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Читання схем, вузли, вітки, земля та вимірювачі». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Schematics, Nodes, Branches, Ground & Meters'. Run simulation and verify nodes.",
            "title": "Lab 7.5: Schematics, Nodes, Branches, Ground & Meters",
            "netlist": "* EduForge SPICE Model for Unit 7\nV1 in 0 DC 10\nR1 in out 56k\nR2 out 0 9k\n.tran 10u 2m\n.end",
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
                                    "target": 1.385,
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
            "id": "ee-07-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Читання схем, вузли, вітки, земля та вимірювачі»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Schematics, Nodes, Branches, Ground & Meters':",
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
        slug: "ee-07-exam",
        titleUk: "Екзамен: Читання схем, вузли, вітки, земля та вимірювачі",
        titleEn: "Exam: Schematics, Nodes, Branches, Ground & Meters",
        difficulty: 2,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-07-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Читання схем, вузли, вітки, земля та вимірювачі»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Schematics, Nodes, Branches, Ground & Meters'?",
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
            "id": "ee-07-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Читання схем, вузли, вітки, земля та вимірювачі»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Schematics, Nodes, Branches, Ground & Meters'?",
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
            "id": "ee-07-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Читання схем, вузли, вітки, земля та вимірювачі»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Schematics, Nodes, Branches, Ground & Meters'?",
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
            "id": "ee-07-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Читання схем, вузли, вітки, земля та вимірювачі»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Schematics, Nodes, Branches, Ground & Meters'?",
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
            "id": "ee-07-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 80 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 80 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 40.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 80 = 40.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 80 = 40.0 V."
}),
          createNumeric({
            "id": "ee-07-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 82 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 82 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 41.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 82 = 41.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 82 = 41.0 V."
}),
          createNumeric({
            "id": "ee-07-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 84 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 84 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 42.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 84 = 42.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 84 = 42.0 V."
}),
          createNumeric({
            "id": "ee-07-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 86 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 86 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 43.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 86 = 43.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 86 = 43.0 V."
}),
          createCircuitLab({
            "id": "ee-07-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Читання схем, вузли, вітки, земля та вимірювачі».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Schematics, Nodes, Branches, Ground & Meters'.",
            "title": "Exam Lab 7.9: Schematics, Nodes, Branches, Ground & Meters",
            "netlist": "* Exam Model 7_9\nV1 in 0 DC 12\nR1 in out 16k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 4.615,
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
            "id": "ee-07-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Читання схем, вузли, вітки, земля та вимірювачі».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Schematics, Nodes, Branches, Ground & Meters'.",
            "title": "Exam Lab 7.10: Schematics, Nodes, Branches, Ground & Meters",
            "netlist": "* Exam Model 7_10\nV1 in 0 DC 12\nR1 in out 17k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 4.444,
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
    slug: "ee-08-series-parallel",
    titleUk: "Послідовні, паралельні та змішані з'єднання",
    titleEn: "Series, Parallel & Mixed Resistor Connections",
    lessons: [
      createLesson({
        slug: "ee-08-l1",
        titleUk: "Послідовні, паралельні та змішані з'єднання (Частина 1)",
        titleEn: "Series, Parallel & Mixed Resistor Connections (Part 1)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-08-l1-c1",
            "promptUk": "Теоретичні основи: Послідовні, паралельні та змішані з'єднання (Частина 1)",
            "promptEn": "Theoretical Foundations: Series, Parallel & Mixed Resistor Connections (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Послідовні, паралельні та змішані з'єднання». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Series, Parallel & Mixed Resistor Connections'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-08-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Послідовні, паралельні та змішані з'єднання»?",
            "promptEn": "Which core statement is correct regarding 'Series, Parallel & Mixed Resistor Connections'?",
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
            "id": "ee-08-l1-n1",
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
            "id": "ee-08-l1-n2",
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
            "id": "ee-08-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Послідовні, паралельні та змішані з'єднання»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Series, Parallel & Mixed Resistor Connections':",
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
        slug: "ee-08-l2",
        titleUk: "Послідовні, паралельні та змішані з'єднання (Частина 2)",
        titleEn: "Series, Parallel & Mixed Resistor Connections (Part 2)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-08-l2-c1",
            "promptUk": "Теоретичні основи: Послідовні, паралельні та змішані з'єднання (Частина 2)",
            "promptEn": "Theoretical Foundations: Series, Parallel & Mixed Resistor Connections (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Послідовні, паралельні та змішані з'єднання». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Series, Parallel & Mixed Resistor Connections'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-08-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Послідовні, паралельні та змішані з'єднання»?",
            "promptEn": "Which core statement is correct regarding 'Series, Parallel & Mixed Resistor Connections'?",
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
            "id": "ee-08-l2-n1",
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
          createNumeric({
            "id": "ee-08-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 44 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 44 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.568,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 44 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 44 A."
}),
          createExplain({
            "id": "ee-08-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Послідовні, паралельні та змішані з'єднання»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Series, Parallel & Mixed Resistor Connections':",
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
        slug: "ee-08-l3",
        titleUk: "Послідовні, паралельні та змішані з'єднання (Частина 3)",
        titleEn: "Series, Parallel & Mixed Resistor Connections (Part 3)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-08-l3-c1",
            "promptUk": "Теоретичні основи: Послідовні, паралельні та змішані з'єднання (Частина 3)",
            "promptEn": "Theoretical Foundations: Series, Parallel & Mixed Resistor Connections (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Послідовні, паралельні та змішані з'єднання». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Series, Parallel & Mixed Resistor Connections'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-08-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Послідовні, паралельні та змішані з'єднання»?",
            "promptEn": "Which core statement is correct regarding 'Series, Parallel & Mixed Resistor Connections'?",
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
            "id": "ee-08-l3-n1",
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
          createNumeric({
            "id": "ee-08-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 49 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 49 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.51,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 49 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 49 A."
}),
          createExplain({
            "id": "ee-08-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Послідовні, паралельні та змішані з'єднання»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Series, Parallel & Mixed Resistor Connections':",
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
        slug: "ee-08-l4",
        titleUk: "Послідовні, паралельні та змішані з'єднання (Частина 4)",
        titleEn: "Series, Parallel & Mixed Resistor Connections (Part 4)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-08-l4-c1",
            "promptUk": "Теоретичні основи: Послідовні, паралельні та змішані з'єднання (Частина 4)",
            "promptEn": "Theoretical Foundations: Series, Parallel & Mixed Resistor Connections (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Послідовні, паралельні та змішані з'єднання». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Series, Parallel & Mixed Resistor Connections'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-08-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Послідовні, паралельні та змішані з'єднання»?",
            "promptEn": "Which core statement is correct regarding 'Series, Parallel & Mixed Resistor Connections'?",
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
            "id": "ee-08-l4-n1",
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
          createCircuitLab({
            "id": "ee-08-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Послідовні, паралельні та змішані з'єднання». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Series, Parallel & Mixed Resistor Connections'. Run simulation and verify nodes.",
            "title": "Lab 8.4: Series, Parallel & Mixed Resistor Connections",
            "netlist": "* EduForge SPICE Model for Unit 8\nV1 in 0 DC 10\nR1 in out 54k\nR2 out 0 5k\n.tran 10u 2m\n.end",
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
                                    "target": 0.847,
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
            "id": "ee-08-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Послідовні, паралельні та змішані з'єднання»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Series, Parallel & Mixed Resistor Connections':",
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
        slug: "ee-08-l5",
        titleUk: "Послідовні, паралельні та змішані з'єднання (Частина 5)",
        titleEn: "Series, Parallel & Mixed Resistor Connections (Part 5)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-08-l5-c1",
            "promptUk": "Теоретичні основи: Послідовні, паралельні та змішані з'єднання (Частина 5)",
            "promptEn": "Theoretical Foundations: Series, Parallel & Mixed Resistor Connections (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Послідовні, паралельні та змішані з'єднання». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Series, Parallel & Mixed Resistor Connections'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-08-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Послідовні, паралельні та змішані з'єднання»?",
            "promptEn": "Which core statement is correct regarding 'Series, Parallel & Mixed Resistor Connections'?",
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
            "id": "ee-08-l5-n1",
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
          createCircuitLab({
            "id": "ee-08-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Послідовні, паралельні та змішані з'єднання». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Series, Parallel & Mixed Resistor Connections'. Run simulation and verify nodes.",
            "title": "Lab 8.5: Series, Parallel & Mixed Resistor Connections",
            "netlist": "* EduForge SPICE Model for Unit 8\nV1 in 0 DC 10\nR1 in out 59k\nR2 out 0 16k\n.tran 10u 2m\n.end",
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
                                    "target": 2.133,
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
            "id": "ee-08-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Послідовні, паралельні та змішані з'єднання»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Series, Parallel & Mixed Resistor Connections':",
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
        slug: "ee-08-exam",
        titleUk: "Екзамен: Послідовні, паралельні та змішані з'єднання",
        titleEn: "Exam: Series, Parallel & Mixed Resistor Connections",
        difficulty: 2,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-08-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Послідовні, паралельні та змішані з'єднання»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Series, Parallel & Mixed Resistor Connections'?",
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
            "id": "ee-08-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Послідовні, паралельні та змішані з'єднання»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Series, Parallel & Mixed Resistor Connections'?",
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
            "id": "ee-08-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Послідовні, паралельні та змішані з'єднання»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Series, Parallel & Mixed Resistor Connections'?",
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
            "id": "ee-08-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Послідовні, паралельні та змішані з'єднання»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Series, Parallel & Mixed Resistor Connections'?",
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
            "id": "ee-08-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 90 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 90 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 45.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 90 = 45.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 90 = 45.0 V."
}),
          createNumeric({
            "id": "ee-08-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 92 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 92 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 46.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 92 = 46.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 92 = 46.0 V."
}),
          createNumeric({
            "id": "ee-08-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 94 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 94 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 47.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 94 = 47.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 94 = 47.0 V."
}),
          createNumeric({
            "id": "ee-08-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 96 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 96 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 48.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 96 = 48.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 96 = 48.0 V."
}),
          createCircuitLab({
            "id": "ee-08-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Послідовні, паралельні та змішані з'єднання».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Series, Parallel & Mixed Resistor Connections'.",
            "title": "Exam Lab 8.9: Series, Parallel & Mixed Resistor Connections",
            "netlist": "* Exam Model 8_9\nV1 in 0 DC 12\nR1 in out 17k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 4.444,
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
            "id": "ee-08-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Послідовні, паралельні та змішані з'єднання».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Series, Parallel & Mixed Resistor Connections'.",
            "title": "Exam Lab 8.10: Series, Parallel & Mixed Resistor Connections",
            "netlist": "* Exam Model 8_10\nV1 in 0 DC 12\nR1 in out 18k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 4.286,
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
    slug: "ee-09-dividers-loaded",
    titleUk: "Дільники напруги та струму під навантаженням",
    titleEn: "Voltage & Current Dividers Under Load",
    lessons: [
      createLesson({
        slug: "ee-09-l1",
        titleUk: "Дільники напруги та струму під навантаженням (Частина 1)",
        titleEn: "Voltage & Current Dividers Under Load (Part 1)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-09-l1-c1",
            "promptUk": "Теоретичні основи: Дільники напруги та струму під навантаженням (Частина 1)",
            "promptEn": "Theoretical Foundations: Voltage & Current Dividers Under Load (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Дільники напруги та струму під навантаженням». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Voltage & Current Dividers Under Load'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-09-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Дільники напруги та струму під навантаженням»?",
            "promptEn": "Which core statement is correct regarding 'Voltage & Current Dividers Under Load'?",
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
            "id": "ee-09-l1-n1",
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
            "id": "ee-09-l1-n2",
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
            "id": "ee-09-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Дільники напруги та струму під навантаженням»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Voltage & Current Dividers Under Load':",
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
        slug: "ee-09-l2",
        titleUk: "Дільники напруги та струму під навантаженням (Частина 2)",
        titleEn: "Voltage & Current Dividers Under Load (Part 2)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-09-l2-c1",
            "promptUk": "Теоретичні основи: Дільники напруги та струму під навантаженням (Частина 2)",
            "promptEn": "Theoretical Foundations: Voltage & Current Dividers Under Load (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Дільники напруги та струму під навантаженням». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Voltage & Current Dividers Under Load'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-09-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Дільники напруги та струму під навантаженням»?",
            "promptEn": "Which core statement is correct regarding 'Voltage & Current Dividers Under Load'?",
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
            "id": "ee-09-l2-n1",
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
          createNumeric({
            "id": "ee-09-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 47 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 47 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.532,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 47 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 47 A."
}),
          createExplain({
            "id": "ee-09-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Дільники напруги та струму під навантаженням»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Voltage & Current Dividers Under Load':",
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
        slug: "ee-09-l3",
        titleUk: "Дільники напруги та струму під навантаженням (Частина 3)",
        titleEn: "Voltage & Current Dividers Under Load (Part 3)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-09-l3-c1",
            "promptUk": "Теоретичні основи: Дільники напруги та струму під навантаженням (Частина 3)",
            "promptEn": "Theoretical Foundations: Voltage & Current Dividers Under Load (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Дільники напруги та струму під навантаженням». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Voltage & Current Dividers Under Load'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-09-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Дільники напруги та струму під навантаженням»?",
            "promptEn": "Which core statement is correct regarding 'Voltage & Current Dividers Under Load'?",
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
            "id": "ee-09-l3-n1",
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
          createNumeric({
            "id": "ee-09-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 52 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 52 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.481,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 52 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 52 A."
}),
          createExplain({
            "id": "ee-09-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Дільники напруги та струму під навантаженням»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Voltage & Current Dividers Under Load':",
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
        slug: "ee-09-l4",
        titleUk: "Дільники напруги та струму під навантаженням (Частина 4)",
        titleEn: "Voltage & Current Dividers Under Load (Part 4)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-09-l4-c1",
            "promptUk": "Теоретичні основи: Дільники напруги та струму під навантаженням (Частина 4)",
            "promptEn": "Theoretical Foundations: Voltage & Current Dividers Under Load (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Дільники напруги та струму під навантаженням». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Voltage & Current Dividers Under Load'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-09-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Дільники напруги та струму під навантаженням»?",
            "promptEn": "Which core statement is correct regarding 'Voltage & Current Dividers Under Load'?",
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
            "id": "ee-09-l4-n1",
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
          createCircuitLab({
            "id": "ee-09-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Дільники напруги та струму під навантаженням». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Voltage & Current Dividers Under Load'. Run simulation and verify nodes.",
            "title": "Lab 9.4: Voltage & Current Dividers Under Load",
            "netlist": "* EduForge SPICE Model for Unit 9\nV1 in 0 DC 10\nR1 in out 57k\nR2 out 0 12k\n.tran 10u 2m\n.end",
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
                                    "target": 1.739,
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
            "id": "ee-09-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Дільники напруги та струму під навантаженням»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Voltage & Current Dividers Under Load':",
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
        slug: "ee-09-l5",
        titleUk: "Дільники напруги та струму під навантаженням (Частина 5)",
        titleEn: "Voltage & Current Dividers Under Load (Part 5)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-09-l5-c1",
            "promptUk": "Теоретичні основи: Дільники напруги та струму під навантаженням (Частина 5)",
            "promptEn": "Theoretical Foundations: Voltage & Current Dividers Under Load (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Дільники напруги та струму під навантаженням». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Voltage & Current Dividers Under Load'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-09-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Дільники напруги та струму під навантаженням»?",
            "promptEn": "Which core statement is correct regarding 'Voltage & Current Dividers Under Load'?",
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
            "id": "ee-09-l5-n1",
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
          createCircuitLab({
            "id": "ee-09-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Дільники напруги та струму під навантаженням». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Voltage & Current Dividers Under Load'. Run simulation and verify nodes.",
            "title": "Lab 9.5: Voltage & Current Dividers Under Load",
            "netlist": "* EduForge SPICE Model for Unit 9\nV1 in 0 DC 10\nR1 in out 62k\nR2 out 0 23k\n.tran 10u 2m\n.end",
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
                                    "target": 2.706,
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
            "id": "ee-09-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Дільники напруги та струму під навантаженням»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Voltage & Current Dividers Under Load':",
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
        slug: "ee-09-exam",
        titleUk: "Екзамен: Дільники напруги та струму під навантаженням",
        titleEn: "Exam: Voltage & Current Dividers Under Load",
        difficulty: 2,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-09-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Дільники напруги та струму під навантаженням»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Voltage & Current Dividers Under Load'?",
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
            "id": "ee-09-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Дільники напруги та струму під навантаженням»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Voltage & Current Dividers Under Load'?",
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
            "id": "ee-09-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Дільники напруги та струму під навантаженням»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Voltage & Current Dividers Under Load'?",
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
            "id": "ee-09-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Дільники напруги та струму під навантаженням»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Voltage & Current Dividers Under Load'?",
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
            "id": "ee-09-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 100 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 100 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 50.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 100 = 50.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 100 = 50.0 V."
}),
          createNumeric({
            "id": "ee-09-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 102 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 102 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 51.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 102 = 51.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 102 = 51.0 V."
}),
          createNumeric({
            "id": "ee-09-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 104 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 104 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 52.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 104 = 52.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 104 = 52.0 V."
}),
          createNumeric({
            "id": "ee-09-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 106 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 106 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 53.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 106 = 53.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 106 = 53.0 V."
}),
          createCircuitLab({
            "id": "ee-09-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Дільники напруги та струму під навантаженням».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Voltage & Current Dividers Under Load'.",
            "title": "Exam Lab 9.9: Voltage & Current Dividers Under Load",
            "netlist": "* Exam Model 9_9\nV1 in 0 DC 12\nR1 in out 18k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 4.286,
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
            "id": "ee-09-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Дільники напруги та струму під навантаженням».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Voltage & Current Dividers Under Load'.",
            "title": "Exam Lab 9.10: Voltage & Current Dividers Under Load",
            "netlist": "* Exam Model 9_10\nV1 in 0 DC 12\nR1 in out 19k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 4.138,
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
    slug: "ee-10-kirchhoff-laws",
    titleUk: "Закони Кірхгофа, знаки та баланс потужності",
    titleEn: "Kirchhoff's Laws, Sign Conventions & Power Balance",
    lessons: [
      createLesson({
        slug: "ee-10-l1",
        titleUk: "Закони Кірхгофа, знаки та баланс потужності (Частина 1)",
        titleEn: "Kirchhoff's Laws, Sign Conventions & Power Balance (Part 1)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-10-l1-c1",
            "promptUk": "Теоретичні основи: Закони Кірхгофа, знаки та баланс потужності (Частина 1)",
            "promptEn": "Theoretical Foundations: Kirchhoff's Laws, Sign Conventions & Power Balance (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Закони Кірхгофа, знаки та баланс потужності». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Kirchhoff's Laws, Sign Conventions & Power Balance'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-10-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Закони Кірхгофа, знаки та баланс потужності»?",
            "promptEn": "Which core statement is correct regarding 'Kirchhoff's Laws, Sign Conventions & Power Balance'?",
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
            "id": "ee-10-l1-n1",
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
            "id": "ee-10-l1-n2",
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
            "id": "ee-10-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Закони Кірхгофа, знаки та баланс потужності»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Kirchhoff's Laws, Sign Conventions & Power Balance':",
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
        slug: "ee-10-l2",
        titleUk: "Закони Кірхгофа, знаки та баланс потужності (Частина 2)",
        titleEn: "Kirchhoff's Laws, Sign Conventions & Power Balance (Part 2)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-10-l2-c1",
            "promptUk": "Теоретичні основи: Закони Кірхгофа, знаки та баланс потужності (Частина 2)",
            "promptEn": "Theoretical Foundations: Kirchhoff's Laws, Sign Conventions & Power Balance (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Закони Кірхгофа, знаки та баланс потужності». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Kirchhoff's Laws, Sign Conventions & Power Balance'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-10-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Закони Кірхгофа, знаки та баланс потужності»?",
            "promptEn": "Which core statement is correct regarding 'Kirchhoff's Laws, Sign Conventions & Power Balance'?",
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
            "id": "ee-10-l2-n1",
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
          createNumeric({
            "id": "ee-10-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 50 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 50 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.5,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 50 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 50 A."
}),
          createExplain({
            "id": "ee-10-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Закони Кірхгофа, знаки та баланс потужності»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Kirchhoff's Laws, Sign Conventions & Power Balance':",
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
        slug: "ee-10-l3",
        titleUk: "Закони Кірхгофа, знаки та баланс потужності (Частина 3)",
        titleEn: "Kirchhoff's Laws, Sign Conventions & Power Balance (Part 3)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-10-l3-c1",
            "promptUk": "Теоретичні основи: Закони Кірхгофа, знаки та баланс потужності (Частина 3)",
            "promptEn": "Theoretical Foundations: Kirchhoff's Laws, Sign Conventions & Power Balance (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Закони Кірхгофа, знаки та баланс потужності». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Kirchhoff's Laws, Sign Conventions & Power Balance'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-10-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Закони Кірхгофа, знаки та баланс потужності»?",
            "promptEn": "Which core statement is correct regarding 'Kirchhoff's Laws, Sign Conventions & Power Balance'?",
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
            "id": "ee-10-l3-n1",
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
          createNumeric({
            "id": "ee-10-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 55 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 55 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.455,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 55 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 55 A."
}),
          createExplain({
            "id": "ee-10-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Закони Кірхгофа, знаки та баланс потужності»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Kirchhoff's Laws, Sign Conventions & Power Balance':",
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
        slug: "ee-10-l4",
        titleUk: "Закони Кірхгофа, знаки та баланс потужності (Частина 4)",
        titleEn: "Kirchhoff's Laws, Sign Conventions & Power Balance (Part 4)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-10-l4-c1",
            "promptUk": "Теоретичні основи: Закони Кірхгофа, знаки та баланс потужності (Частина 4)",
            "promptEn": "Theoretical Foundations: Kirchhoff's Laws, Sign Conventions & Power Balance (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Закони Кірхгофа, знаки та баланс потужності». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Kirchhoff's Laws, Sign Conventions & Power Balance'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-10-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Закони Кірхгофа, знаки та баланс потужності»?",
            "promptEn": "Which core statement is correct regarding 'Kirchhoff's Laws, Sign Conventions & Power Balance'?",
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
            "id": "ee-10-l4-n1",
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
          createCircuitLab({
            "id": "ee-10-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Закони Кірхгофа, знаки та баланс потужності». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Kirchhoff's Laws, Sign Conventions & Power Balance'. Run simulation and verify nodes.",
            "title": "Lab 10.4: Kirchhoff's Laws, Sign Conventions & Power Balance",
            "netlist": "* EduForge SPICE Model for Unit 10\nV1 in 0 DC 10\nR1 in out 60k\nR2 out 0 19k\n.tran 10u 2m\n.end",
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
                                    "target": 2.405,
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
            "id": "ee-10-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Закони Кірхгофа, знаки та баланс потужності»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Kirchhoff's Laws, Sign Conventions & Power Balance':",
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
        slug: "ee-10-l5",
        titleUk: "Закони Кірхгофа, знаки та баланс потужності (Частина 5)",
        titleEn: "Kirchhoff's Laws, Sign Conventions & Power Balance (Part 5)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-10-l5-c1",
            "promptUk": "Теоретичні основи: Закони Кірхгофа, знаки та баланс потужності (Частина 5)",
            "promptEn": "Theoretical Foundations: Kirchhoff's Laws, Sign Conventions & Power Balance (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Закони Кірхгофа, знаки та баланс потужності». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Kirchhoff's Laws, Sign Conventions & Power Balance'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-10-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Закони Кірхгофа, знаки та баланс потужності»?",
            "promptEn": "Which core statement is correct regarding 'Kirchhoff's Laws, Sign Conventions & Power Balance'?",
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
            "id": "ee-10-l5-n1",
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
          createCircuitLab({
            "id": "ee-10-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Закони Кірхгофа, знаки та баланс потужності». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Kirchhoff's Laws, Sign Conventions & Power Balance'. Run simulation and verify nodes.",
            "title": "Lab 10.5: Kirchhoff's Laws, Sign Conventions & Power Balance",
            "netlist": "* EduForge SPICE Model for Unit 10\nV1 in 0 DC 10\nR1 in out 65k\nR2 out 0 30k\n.tran 10u 2m\n.end",
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
                                    "target": 3.158,
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
            "id": "ee-10-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Закони Кірхгофа, знаки та баланс потужності»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Kirchhoff's Laws, Sign Conventions & Power Balance':",
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
        slug: "ee-10-exam",
        titleUk: "Екзамен: Закони Кірхгофа, знаки та баланс потужності",
        titleEn: "Exam: Kirchhoff's Laws, Sign Conventions & Power Balance",
        difficulty: 2,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-10-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Закони Кірхгофа, знаки та баланс потужності»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Kirchhoff's Laws, Sign Conventions & Power Balance'?",
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
            "id": "ee-10-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Закони Кірхгофа, знаки та баланс потужності»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Kirchhoff's Laws, Sign Conventions & Power Balance'?",
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
            "id": "ee-10-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Закони Кірхгофа, знаки та баланс потужності»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Kirchhoff's Laws, Sign Conventions & Power Balance'?",
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
            "id": "ee-10-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Закони Кірхгофа, знаки та баланс потужності»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Kirchhoff's Laws, Sign Conventions & Power Balance'?",
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
            "id": "ee-10-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 110 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 110 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 55.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 110 = 55.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 110 = 55.0 V."
}),
          createNumeric({
            "id": "ee-10-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 112 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 112 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 56.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 112 = 56.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 112 = 56.0 V."
}),
          createNumeric({
            "id": "ee-10-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 114 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 114 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 57.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 114 = 57.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 114 = 57.0 V."
}),
          createNumeric({
            "id": "ee-10-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 116 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 116 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 58.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 116 = 58.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 116 = 58.0 V."
}),
          createCircuitLab({
            "id": "ee-10-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Закони Кірхгофа, знаки та баланс потужності».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Kirchhoff's Laws, Sign Conventions & Power Balance'.",
            "title": "Exam Lab 10.9: Kirchhoff's Laws, Sign Conventions & Power Balance",
            "netlist": "* Exam Model 10_9\nV1 in 0 DC 12\nR1 in out 19k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 4.138,
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
            "id": "ee-10-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Закони Кірхгофа, знаки та баланс потужності».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Kirchhoff's Laws, Sign Conventions & Power Balance'.",
            "title": "Exam Lab 10.10: Kirchhoff's Laws, Sign Conventions & Power Balance",
            "netlist": "* Exam Model 10_10\nV1 in 0 DC 12\nR1 in out 20k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 4.0,
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
    slug: "ee-11-nodal-analysis",
    titleUk: "Вузлові потенціали та системи лінійних рівнянь",
    titleEn: "Nodal Analysis & Systems of Linear Equations",
    lessons: [
      createLesson({
        slug: "ee-11-l1",
        titleUk: "Вузлові потенціали та системи лінійних рівнянь (Частина 1)",
        titleEn: "Nodal Analysis & Systems of Linear Equations (Part 1)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-11-l1-c1",
            "promptUk": "Теоретичні основи: Вузлові потенціали та системи лінійних рівнянь (Частина 1)",
            "promptEn": "Theoretical Foundations: Nodal Analysis & Systems of Linear Equations (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Вузлові потенціали та системи лінійних рівнянь». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Nodal Analysis & Systems of Linear Equations'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-11-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Вузлові потенціали та системи лінійних рівнянь»?",
            "promptEn": "Which core statement is correct regarding 'Nodal Analysis & Systems of Linear Equations'?",
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
            "id": "ee-11-l1-n1",
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
            "id": "ee-11-l1-n2",
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
            "id": "ee-11-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Вузлові потенціали та системи лінійних рівнянь»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Nodal Analysis & Systems of Linear Equations':",
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
        slug: "ee-11-l2",
        titleUk: "Вузлові потенціали та системи лінійних рівнянь (Частина 2)",
        titleEn: "Nodal Analysis & Systems of Linear Equations (Part 2)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-11-l2-c1",
            "promptUk": "Теоретичні основи: Вузлові потенціали та системи лінійних рівнянь (Частина 2)",
            "promptEn": "Theoretical Foundations: Nodal Analysis & Systems of Linear Equations (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Вузлові потенціали та системи лінійних рівнянь». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Nodal Analysis & Systems of Linear Equations'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-11-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Вузлові потенціали та системи лінійних рівнянь»?",
            "promptEn": "Which core statement is correct regarding 'Nodal Analysis & Systems of Linear Equations'?",
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
            "id": "ee-11-l2-n1",
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
          createNumeric({
            "id": "ee-11-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 53 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 53 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.472,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 53 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 53 A."
}),
          createExplain({
            "id": "ee-11-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Вузлові потенціали та системи лінійних рівнянь»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Nodal Analysis & Systems of Linear Equations':",
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
        slug: "ee-11-l3",
        titleUk: "Вузлові потенціали та системи лінійних рівнянь (Частина 3)",
        titleEn: "Nodal Analysis & Systems of Linear Equations (Part 3)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-11-l3-c1",
            "promptUk": "Теоретичні основи: Вузлові потенціали та системи лінійних рівнянь (Частина 3)",
            "promptEn": "Theoretical Foundations: Nodal Analysis & Systems of Linear Equations (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Вузлові потенціали та системи лінійних рівнянь». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Nodal Analysis & Systems of Linear Equations'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-11-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Вузлові потенціали та системи лінійних рівнянь»?",
            "promptEn": "Which core statement is correct regarding 'Nodal Analysis & Systems of Linear Equations'?",
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
            "id": "ee-11-l3-n1",
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
          createNumeric({
            "id": "ee-11-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 58 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 58 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.431,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 58 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 58 A."
}),
          createExplain({
            "id": "ee-11-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Вузлові потенціали та системи лінійних рівнянь»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Nodal Analysis & Systems of Linear Equations':",
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
        slug: "ee-11-l4",
        titleUk: "Вузлові потенціали та системи лінійних рівнянь (Частина 4)",
        titleEn: "Nodal Analysis & Systems of Linear Equations (Part 4)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-11-l4-c1",
            "promptUk": "Теоретичні основи: Вузлові потенціали та системи лінійних рівнянь (Частина 4)",
            "promptEn": "Theoretical Foundations: Nodal Analysis & Systems of Linear Equations (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Вузлові потенціали та системи лінійних рівнянь». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Nodal Analysis & Systems of Linear Equations'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-11-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Вузлові потенціали та системи лінійних рівнянь»?",
            "promptEn": "Which core statement is correct regarding 'Nodal Analysis & Systems of Linear Equations'?",
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
            "id": "ee-11-l4-n1",
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
          createCircuitLab({
            "id": "ee-11-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Вузлові потенціали та системи лінійних рівнянь». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Nodal Analysis & Systems of Linear Equations'. Run simulation and verify nodes.",
            "title": "Lab 11.4: Nodal Analysis & Systems of Linear Equations",
            "netlist": "* EduForge SPICE Model for Unit 11\nV1 in 0 DC 10\nR1 in out 63k\nR2 out 0 26k\n.tran 10u 2m\n.end",
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
                                    "target": 2.921,
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
            "id": "ee-11-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Вузлові потенціали та системи лінійних рівнянь»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Nodal Analysis & Systems of Linear Equations':",
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
        slug: "ee-11-l5",
        titleUk: "Вузлові потенціали та системи лінійних рівнянь (Частина 5)",
        titleEn: "Nodal Analysis & Systems of Linear Equations (Part 5)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-11-l5-c1",
            "promptUk": "Теоретичні основи: Вузлові потенціали та системи лінійних рівнянь (Частина 5)",
            "promptEn": "Theoretical Foundations: Nodal Analysis & Systems of Linear Equations (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Вузлові потенціали та системи лінійних рівнянь». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Nodal Analysis & Systems of Linear Equations'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-11-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Вузлові потенціали та системи лінійних рівнянь»?",
            "promptEn": "Which core statement is correct regarding 'Nodal Analysis & Systems of Linear Equations'?",
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
            "id": "ee-11-l5-n1",
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
          createCircuitLab({
            "id": "ee-11-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Вузлові потенціали та системи лінійних рівнянь». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Nodal Analysis & Systems of Linear Equations'. Run simulation and verify nodes.",
            "title": "Lab 11.5: Nodal Analysis & Systems of Linear Equations",
            "netlist": "* EduForge SPICE Model for Unit 11\nV1 in 0 DC 10\nR1 in out 68k\nR2 out 0 37k\n.tran 10u 2m\n.end",
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
                                    "target": 3.524,
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
            "id": "ee-11-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Вузлові потенціали та системи лінійних рівнянь»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Nodal Analysis & Systems of Linear Equations':",
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
        slug: "ee-11-exam",
        titleUk: "Екзамен: Вузлові потенціали та системи лінійних рівнянь",
        titleEn: "Exam: Nodal Analysis & Systems of Linear Equations",
        difficulty: 2,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-11-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Вузлові потенціали та системи лінійних рівнянь»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Nodal Analysis & Systems of Linear Equations'?",
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
            "id": "ee-11-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Вузлові потенціали та системи лінійних рівнянь»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Nodal Analysis & Systems of Linear Equations'?",
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
            "id": "ee-11-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Вузлові потенціали та системи лінійних рівнянь»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Nodal Analysis & Systems of Linear Equations'?",
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
            "id": "ee-11-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Вузлові потенціали та системи лінійних рівнянь»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Nodal Analysis & Systems of Linear Equations'?",
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
            "id": "ee-11-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 120 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 120 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 60.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 120 = 60.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 120 = 60.0 V."
}),
          createNumeric({
            "id": "ee-11-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 122 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 122 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 61.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 122 = 61.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 122 = 61.0 V."
}),
          createNumeric({
            "id": "ee-11-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 124 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 124 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 62.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 124 = 62.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 124 = 62.0 V."
}),
          createNumeric({
            "id": "ee-11-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 126 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 126 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 63.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 126 = 63.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 126 = 63.0 V."
}),
          createCircuitLab({
            "id": "ee-11-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Вузлові потенціали та системи лінійних рівнянь».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Nodal Analysis & Systems of Linear Equations'.",
            "title": "Exam Lab 11.9: Nodal Analysis & Systems of Linear Equations",
            "netlist": "* Exam Model 11_9\nV1 in 0 DC 12\nR1 in out 20k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 4.0,
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
            "id": "ee-11-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Вузлові потенціали та системи лінійних рівнянь».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Nodal Analysis & Systems of Linear Equations'.",
            "title": "Exam Lab 11.10: Nodal Analysis & Systems of Linear Equations",
            "netlist": "* Exam Model 11_10\nV1 in 0 DC 12\nR1 in out 21k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 3.871,
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
    slug: "ee-12-mesh-thevenin-norton",
    titleUk: "Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона",
    titleEn: "Mesh Currents, Superposition, Thévenin & Norton Equivalents",
    lessons: [
      createLesson({
        slug: "ee-12-l1",
        titleUk: "Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона (Частина 1)",
        titleEn: "Mesh Currents, Superposition, Thévenin & Norton Equivalents (Part 1)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-12-l1-c1",
            "promptUk": "Теоретичні основи: Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона (Частина 1)",
            "promptEn": "Theoretical Foundations: Mesh Currents, Superposition, Thévenin & Norton Equivalents (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Mesh Currents, Superposition, Thévenin & Norton Equivalents'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-12-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона»?",
            "promptEn": "Which core statement is correct regarding 'Mesh Currents, Superposition, Thévenin & Norton Equivalents'?",
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
            "id": "ee-12-l1-n1",
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
            "id": "ee-12-l1-n2",
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
            "id": "ee-12-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Mesh Currents, Superposition, Thévenin & Norton Equivalents':",
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
        slug: "ee-12-l2",
        titleUk: "Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона (Частина 2)",
        titleEn: "Mesh Currents, Superposition, Thévenin & Norton Equivalents (Part 2)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-12-l2-c1",
            "promptUk": "Теоретичні основи: Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона (Частина 2)",
            "promptEn": "Theoretical Foundations: Mesh Currents, Superposition, Thévenin & Norton Equivalents (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Mesh Currents, Superposition, Thévenin & Norton Equivalents'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-12-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона»?",
            "promptEn": "Which core statement is correct regarding 'Mesh Currents, Superposition, Thévenin & Norton Equivalents'?",
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
            "id": "ee-12-l2-n1",
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
          createNumeric({
            "id": "ee-12-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 56 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 56 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.446,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 56 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 56 A."
}),
          createExplain({
            "id": "ee-12-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Mesh Currents, Superposition, Thévenin & Norton Equivalents':",
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
        slug: "ee-12-l3",
        titleUk: "Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона (Частина 3)",
        titleEn: "Mesh Currents, Superposition, Thévenin & Norton Equivalents (Part 3)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-12-l3-c1",
            "promptUk": "Теоретичні основи: Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона (Частина 3)",
            "promptEn": "Theoretical Foundations: Mesh Currents, Superposition, Thévenin & Norton Equivalents (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Mesh Currents, Superposition, Thévenin & Norton Equivalents'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-12-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона»?",
            "promptEn": "Which core statement is correct regarding 'Mesh Currents, Superposition, Thévenin & Norton Equivalents'?",
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
            "id": "ee-12-l3-n1",
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
          createNumeric({
            "id": "ee-12-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 61 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 61 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.41,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 61 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 61 A."
}),
          createExplain({
            "id": "ee-12-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Mesh Currents, Superposition, Thévenin & Norton Equivalents':",
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
        slug: "ee-12-l4",
        titleUk: "Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона (Частина 4)",
        titleEn: "Mesh Currents, Superposition, Thévenin & Norton Equivalents (Part 4)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-12-l4-c1",
            "promptUk": "Теоретичні основи: Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона (Частина 4)",
            "promptEn": "Theoretical Foundations: Mesh Currents, Superposition, Thévenin & Norton Equivalents (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Mesh Currents, Superposition, Thévenin & Norton Equivalents'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-12-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона»?",
            "promptEn": "Which core statement is correct regarding 'Mesh Currents, Superposition, Thévenin & Norton Equivalents'?",
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
            "id": "ee-12-l4-n1",
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
          createCircuitLab({
            "id": "ee-12-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Mesh Currents, Superposition, Thévenin & Norton Equivalents'. Run simulation and verify nodes.",
            "title": "Lab 12.4: Mesh Currents, Superposition, Thévenin & Norton Equivalents",
            "netlist": "* EduForge SPICE Model for Unit 12\nV1 in 0 DC 10\nR1 in out 66k\nR2 out 0 33k\n.tran 10u 2m\n.end",
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
                                    "target": 3.333,
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
            "id": "ee-12-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Mesh Currents, Superposition, Thévenin & Norton Equivalents':",
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
        slug: "ee-12-l5",
        titleUk: "Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона (Частина 5)",
        titleEn: "Mesh Currents, Superposition, Thévenin & Norton Equivalents (Part 5)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-12-l5-c1",
            "promptUk": "Теоретичні основи: Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона (Частина 5)",
            "promptEn": "Theoretical Foundations: Mesh Currents, Superposition, Thévenin & Norton Equivalents (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Mesh Currents, Superposition, Thévenin & Norton Equivalents'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-12-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона»?",
            "promptEn": "Which core statement is correct regarding 'Mesh Currents, Superposition, Thévenin & Norton Equivalents'?",
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
            "id": "ee-12-l5-n1",
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
          createCircuitLab({
            "id": "ee-12-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Mesh Currents, Superposition, Thévenin & Norton Equivalents'. Run simulation and verify nodes.",
            "title": "Lab 12.5: Mesh Currents, Superposition, Thévenin & Norton Equivalents",
            "netlist": "* EduForge SPICE Model for Unit 12\nV1 in 0 DC 10\nR1 in out 71k\nR2 out 0 44k\n.tran 10u 2m\n.end",
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
                                    "target": 3.826,
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
            "id": "ee-12-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Mesh Currents, Superposition, Thévenin & Norton Equivalents':",
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
        slug: "ee-12-exam",
        titleUk: "Екзамен: Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона",
        titleEn: "Exam: Mesh Currents, Superposition, Thévenin & Norton Equivalents",
        difficulty: 2,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-12-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Mesh Currents, Superposition, Thévenin & Norton Equivalents'?",
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
            "id": "ee-12-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Mesh Currents, Superposition, Thévenin & Norton Equivalents'?",
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
            "id": "ee-12-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Mesh Currents, Superposition, Thévenin & Norton Equivalents'?",
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
            "id": "ee-12-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Mesh Currents, Superposition, Thévenin & Norton Equivalents'?",
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
            "id": "ee-12-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 130 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 130 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 65.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 130 = 65.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 130 = 65.0 V."
}),
          createNumeric({
            "id": "ee-12-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 132 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 132 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 66.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 132 = 66.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 132 = 66.0 V."
}),
          createNumeric({
            "id": "ee-12-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 134 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 134 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 67.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 134 = 67.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 134 = 67.0 V."
}),
          createNumeric({
            "id": "ee-12-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 136 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 136 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 68.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 136 = 68.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 136 = 68.0 V."
}),
          createCircuitLab({
            "id": "ee-12-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Mesh Currents, Superposition, Thévenin & Norton Equivalents'.",
            "title": "Exam Lab 12.9: Mesh Currents, Superposition, Thévenin & Norton Equivalents",
            "netlist": "* Exam Model 12_9\nV1 in 0 DC 12\nR1 in out 21k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 3.871,
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
            "id": "ee-12-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Контурні струми, суперпозиція, еквіваленти Тевеніна і Нортона».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Mesh Currents, Superposition, Thévenin & Norton Equivalents'.",
            "title": "Exam Lab 12.10: Mesh Currents, Superposition, Thévenin & Norton Equivalents",
            "netlist": "* Exam Model 12_10\nV1 in 0 DC 12\nR1 in out 22k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
        ],
      }),
    ],
  }),
];