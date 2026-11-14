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
 * Stage 8: 6 Units, 36 Lessons (5 instructional + 1 exam per unit)
 */
export const stage8Units: UnitContent[] = [
  createUnit({
    slug: "ee-43-three-phase-systems",
    titleUk: "Однофазні та трифазні системи, зірка і трикутник",
    titleEn: "Single & Three-Phase Systems, Star & Delta Connections",
    lessons: [
      createLesson({
        slug: "ee-43-l1",
        titleUk: "Однофазні та трифазні системи, зірка і трикутник (Частина 1)",
        titleEn: "Single & Three-Phase Systems, Star & Delta Connections (Part 1)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-43-l1-c1",
            "promptUk": "Теоретичні основи: Однофазні та трифазні системи, зірка і трикутник (Частина 1)",
            "promptEn": "Theoretical Foundations: Single & Three-Phase Systems, Star & Delta Connections (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Однофазні та трифазні системи, зірка і трикутник». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Single & Three-Phase Systems, Star & Delta Connections'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-43-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Однофазні та трифазні системи, зірка і трикутник»?",
            "promptEn": "Which core statement is correct regarding 'Single & Three-Phase Systems, Star & Delta Connections'?",
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
            "id": "ee-43-l1-n1",
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
            "id": "ee-43-l1-n2",
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
            "id": "ee-43-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Однофазні та трифазні системи, зірка і трикутник»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Single & Three-Phase Systems, Star & Delta Connections':",
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
        slug: "ee-43-l2",
        titleUk: "Однофазні та трифазні системи, зірка і трикутник (Частина 2)",
        titleEn: "Single & Three-Phase Systems, Star & Delta Connections (Part 2)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-43-l2-c1",
            "promptUk": "Теоретичні основи: Однофазні та трифазні системи, зірка і трикутник (Частина 2)",
            "promptEn": "Theoretical Foundations: Single & Three-Phase Systems, Star & Delta Connections (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Однофазні та трифазні системи, зірка і трикутник». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Single & Three-Phase Systems, Star & Delta Connections'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-43-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Однофазні та трифазні системи, зірка і трикутник»?",
            "promptEn": "Which core statement is correct regarding 'Single & Three-Phase Systems, Star & Delta Connections'?",
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
            "id": "ee-43-l2-n1",
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
            "id": "ee-43-l2-n2",
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
            "id": "ee-43-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Однофазні та трифазні системи, зірка і трикутник»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Single & Three-Phase Systems, Star & Delta Connections':",
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
        slug: "ee-43-l3",
        titleUk: "Однофазні та трифазні системи, зірка і трикутник (Частина 3)",
        titleEn: "Single & Three-Phase Systems, Star & Delta Connections (Part 3)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-43-l3-c1",
            "promptUk": "Теоретичні основи: Однофазні та трифазні системи, зірка і трикутник (Частина 3)",
            "promptEn": "Theoretical Foundations: Single & Three-Phase Systems, Star & Delta Connections (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Однофазні та трифазні системи, зірка і трикутник». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Single & Three-Phase Systems, Star & Delta Connections'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-43-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Однофазні та трифазні системи, зірка і трикутник»?",
            "promptEn": "Which core statement is correct regarding 'Single & Three-Phase Systems, Star & Delta Connections'?",
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
            "id": "ee-43-l3-n1",
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
            "id": "ee-43-l3-n2",
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
            "id": "ee-43-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Однофазні та трифазні системи, зірка і трикутник»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Single & Three-Phase Systems, Star & Delta Connections':",
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
        slug: "ee-43-l4",
        titleUk: "Однофазні та трифазні системи, зірка і трикутник (Частина 4)",
        titleEn: "Single & Three-Phase Systems, Star & Delta Connections (Part 4)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-43-l4-c1",
            "promptUk": "Теоретичні основи: Однофазні та трифазні системи, зірка і трикутник (Частина 4)",
            "promptEn": "Theoretical Foundations: Single & Three-Phase Systems, Star & Delta Connections (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Однофазні та трифазні системи, зірка і трикутник». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Single & Three-Phase Systems, Star & Delta Connections'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-43-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Однофазні та трифазні системи, зірка і трикутник»?",
            "promptEn": "Which core statement is correct regarding 'Single & Three-Phase Systems, Star & Delta Connections'?",
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
            "id": "ee-43-l4-n1",
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
            "id": "ee-43-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Однофазні та трифазні системи, зірка і трикутник». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Single & Three-Phase Systems, Star & Delta Connections'. Run simulation and verify nodes.",
            "title": "Lab 43.4: Single & Three-Phase Systems, Star & Delta Connections",
            "netlist": "* EduForge SPICE Model for Unit 43\nV1 in 0 DC 10\nR1 in out 59k\nR2 out 0 50k\n.tran 10u 2m\n.end",
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
                                    "target": 4.587,
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
            "id": "ee-43-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Однофазні та трифазні системи, зірка і трикутник»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Single & Three-Phase Systems, Star & Delta Connections':",
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
        slug: "ee-43-l5",
        titleUk: "Однофазні та трифазні системи, зірка і трикутник (Частина 5)",
        titleEn: "Single & Three-Phase Systems, Star & Delta Connections (Part 5)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-43-l5-c1",
            "promptUk": "Теоретичні основи: Однофазні та трифазні системи, зірка і трикутник (Частина 5)",
            "promptEn": "Theoretical Foundations: Single & Three-Phase Systems, Star & Delta Connections (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Однофазні та трифазні системи, зірка і трикутник». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Single & Three-Phase Systems, Star & Delta Connections'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-43-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Однофазні та трифазні системи, зірка і трикутник»?",
            "promptEn": "Which core statement is correct regarding 'Single & Three-Phase Systems, Star & Delta Connections'?",
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
            "id": "ee-43-l5-n1",
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
          createCircuitLab({
            "id": "ee-43-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Однофазні та трифазні системи, зірка і трикутник». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Single & Three-Phase Systems, Star & Delta Connections'. Run simulation and verify nodes.",
            "title": "Lab 43.5: Single & Three-Phase Systems, Star & Delta Connections",
            "netlist": "* EduForge SPICE Model for Unit 43\nV1 in 0 DC 10\nR1 in out 64k\nR2 out 0 11k\n.tran 10u 2m\n.end",
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
                                    "target": 1.467,
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
            "id": "ee-43-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Однофазні та трифазні системи, зірка і трикутник»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Single & Three-Phase Systems, Star & Delta Connections':",
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
        slug: "ee-43-exam",
        titleUk: "Екзамен: Однофазні та трифазні системи, зірка і трикутник",
        titleEn: "Exam: Single & Three-Phase Systems, Star & Delta Connections",
        difficulty: 5,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-43-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Однофазні та трифазні системи, зірка і трикутник»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Single & Three-Phase Systems, Star & Delta Connections'?",
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
            "id": "ee-43-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Однофазні та трифазні системи, зірка і трикутник»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Single & Three-Phase Systems, Star & Delta Connections'?",
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
            "id": "ee-43-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Однофазні та трифазні системи, зірка і трикутник»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Single & Three-Phase Systems, Star & Delta Connections'?",
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
            "id": "ee-43-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Однофазні та трифазні системи, зірка і трикутник»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Single & Three-Phase Systems, Star & Delta Connections'?",
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
            "id": "ee-43-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 440 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 440 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 220.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 440 = 220.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 440 = 220.0 V."
}),
          createNumeric({
            "id": "ee-43-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 442 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 442 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 221.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 442 = 221.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 442 = 221.0 V."
}),
          createNumeric({
            "id": "ee-43-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 444 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 444 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 222.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 444 = 222.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 444 = 222.0 V."
}),
          createNumeric({
            "id": "ee-43-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 446 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 446 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 223.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 446 = 223.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 446 = 223.0 V."
}),
          createCircuitLab({
            "id": "ee-43-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Однофазні та трифазні системи, зірка і трикутник».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Single & Three-Phase Systems, Star & Delta Connections'.",
            "title": "Exam Lab 43.9: Single & Three-Phase Systems, Star & Delta Connections",
            "netlist": "* Exam Model 43_9\nV1 in 0 DC 12\nR1 in out 52k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
          createCircuitLab({
            "id": "ee-43-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Однофазні та трифазні системи, зірка і трикутник».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Single & Three-Phase Systems, Star & Delta Connections'.",
            "title": "Exam Lab 43.10: Single & Three-Phase Systems, Star & Delta Connections",
            "netlist": "* Exam Model 43_10\nV1 in 0 DC 12\nR1 in out 53k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 1.905,
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
    slug: "ee-44-unbalanced-loads",
    titleUk: "Симетричні та несиметричні навантаження, нейтраль і компенсація",
    titleEn: "Balanced & Unbalanced Loads, Neutral Current & Compensation",
    lessons: [
      createLesson({
        slug: "ee-44-l1",
        titleUk: "Симетричні та несиметричні навантаження, нейтраль і компенсація (Частина 1)",
        titleEn: "Balanced & Unbalanced Loads, Neutral Current & Compensation (Part 1)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-44-l1-c1",
            "promptUk": "Теоретичні основи: Симетричні та несиметричні навантаження, нейтраль і компенсація (Частина 1)",
            "promptEn": "Theoretical Foundations: Balanced & Unbalanced Loads, Neutral Current & Compensation (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Симетричні та несиметричні навантаження, нейтраль і компенсація». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Balanced & Unbalanced Loads, Neutral Current & Compensation'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-44-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Симетричні та несиметричні навантаження, нейтраль і компенсація»?",
            "promptEn": "Which core statement is correct regarding 'Balanced & Unbalanced Loads, Neutral Current & Compensation'?",
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
            "id": "ee-44-l1-n1",
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
            "id": "ee-44-l1-n2",
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
            "id": "ee-44-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Симетричні та несиметричні навантаження, нейтраль і компенсація»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Balanced & Unbalanced Loads, Neutral Current & Compensation':",
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
        slug: "ee-44-l2",
        titleUk: "Симетричні та несиметричні навантаження, нейтраль і компенсація (Частина 2)",
        titleEn: "Balanced & Unbalanced Loads, Neutral Current & Compensation (Part 2)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-44-l2-c1",
            "promptUk": "Теоретичні основи: Симетричні та несиметричні навантаження, нейтраль і компенсація (Частина 2)",
            "promptEn": "Theoretical Foundations: Balanced & Unbalanced Loads, Neutral Current & Compensation (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Симетричні та несиметричні навантаження, нейтраль і компенсація». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Balanced & Unbalanced Loads, Neutral Current & Compensation'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-44-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Симетричні та несиметричні навантаження, нейтраль і компенсація»?",
            "promptEn": "Which core statement is correct regarding 'Balanced & Unbalanced Loads, Neutral Current & Compensation'?",
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
            "id": "ee-44-l2-n1",
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
            "id": "ee-44-l2-n2",
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
            "id": "ee-44-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Симетричні та несиметричні навантаження, нейтраль і компенсація»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Balanced & Unbalanced Loads, Neutral Current & Compensation':",
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
        slug: "ee-44-l3",
        titleUk: "Симетричні та несиметричні навантаження, нейтраль і компенсація (Частина 3)",
        titleEn: "Balanced & Unbalanced Loads, Neutral Current & Compensation (Part 3)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-44-l3-c1",
            "promptUk": "Теоретичні основи: Симетричні та несиметричні навантаження, нейтраль і компенсація (Частина 3)",
            "promptEn": "Theoretical Foundations: Balanced & Unbalanced Loads, Neutral Current & Compensation (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Симетричні та несиметричні навантаження, нейтраль і компенсація». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Balanced & Unbalanced Loads, Neutral Current & Compensation'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-44-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Симетричні та несиметричні навантаження, нейтраль і компенсація»?",
            "promptEn": "Which core statement is correct regarding 'Balanced & Unbalanced Loads, Neutral Current & Compensation'?",
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
            "id": "ee-44-l3-n1",
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
            "id": "ee-44-l3-n2",
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
            "id": "ee-44-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Симетричні та несиметричні навантаження, нейтраль і компенсація»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Balanced & Unbalanced Loads, Neutral Current & Compensation':",
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
        slug: "ee-44-l4",
        titleUk: "Симетричні та несиметричні навантаження, нейтраль і компенсація (Частина 4)",
        titleEn: "Balanced & Unbalanced Loads, Neutral Current & Compensation (Part 4)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-44-l4-c1",
            "promptUk": "Теоретичні основи: Симетричні та несиметричні навантаження, нейтраль і компенсація (Частина 4)",
            "promptEn": "Theoretical Foundations: Balanced & Unbalanced Loads, Neutral Current & Compensation (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Симетричні та несиметричні навантаження, нейтраль і компенсація». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Balanced & Unbalanced Loads, Neutral Current & Compensation'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-44-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Симетричні та несиметричні навантаження, нейтраль і компенсація»?",
            "promptEn": "Which core statement is correct regarding 'Balanced & Unbalanced Loads, Neutral Current & Compensation'?",
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
            "id": "ee-44-l4-n1",
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
            "id": "ee-44-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Симетричні та несиметричні навантаження, нейтраль і компенсація». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Balanced & Unbalanced Loads, Neutral Current & Compensation'. Run simulation and verify nodes.",
            "title": "Lab 44.4: Balanced & Unbalanced Loads, Neutral Current & Compensation",
            "netlist": "* EduForge SPICE Model for Unit 44\nV1 in 0 DC 10\nR1 in out 62k\nR2 out 0 7k\n.tran 10u 2m\n.end",
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
                                    "target": 1.014,
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
            "id": "ee-44-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Симетричні та несиметричні навантаження, нейтраль і компенсація»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Balanced & Unbalanced Loads, Neutral Current & Compensation':",
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
        slug: "ee-44-l5",
        titleUk: "Симетричні та несиметричні навантаження, нейтраль і компенсація (Частина 5)",
        titleEn: "Balanced & Unbalanced Loads, Neutral Current & Compensation (Part 5)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-44-l5-c1",
            "promptUk": "Теоретичні основи: Симетричні та несиметричні навантаження, нейтраль і компенсація (Частина 5)",
            "promptEn": "Theoretical Foundations: Balanced & Unbalanced Loads, Neutral Current & Compensation (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Симетричні та несиметричні навантаження, нейтраль і компенсація». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Balanced & Unbalanced Loads, Neutral Current & Compensation'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-44-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Симетричні та несиметричні навантаження, нейтраль і компенсація»?",
            "promptEn": "Which core statement is correct regarding 'Balanced & Unbalanced Loads, Neutral Current & Compensation'?",
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
            "id": "ee-44-l5-n1",
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
          createCircuitLab({
            "id": "ee-44-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Симетричні та несиметричні навантаження, нейтраль і компенсація». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Balanced & Unbalanced Loads, Neutral Current & Compensation'. Run simulation and verify nodes.",
            "title": "Lab 44.5: Balanced & Unbalanced Loads, Neutral Current & Compensation",
            "netlist": "* EduForge SPICE Model for Unit 44\nV1 in 0 DC 10\nR1 in out 67k\nR2 out 0 18k\n.tran 10u 2m\n.end",
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
                                    "target": 2.118,
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
            "id": "ee-44-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Симетричні та несиметричні навантаження, нейтраль і компенсація»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Balanced & Unbalanced Loads, Neutral Current & Compensation':",
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
        slug: "ee-44-exam",
        titleUk: "Екзамен: Симетричні та несиметричні навантаження, нейтраль і компенсація",
        titleEn: "Exam: Balanced & Unbalanced Loads, Neutral Current & Compensation",
        difficulty: 5,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-44-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Симетричні та несиметричні навантаження, нейтраль і компенсація»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Balanced & Unbalanced Loads, Neutral Current & Compensation'?",
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
            "id": "ee-44-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Симетричні та несиметричні навантаження, нейтраль і компенсація»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Balanced & Unbalanced Loads, Neutral Current & Compensation'?",
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
            "id": "ee-44-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Симетричні та несиметричні навантаження, нейтраль і компенсація»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Balanced & Unbalanced Loads, Neutral Current & Compensation'?",
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
            "id": "ee-44-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Симетричні та несиметричні навантаження, нейтраль і компенсація»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Balanced & Unbalanced Loads, Neutral Current & Compensation'?",
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
            "id": "ee-44-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 450 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 450 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 225.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 450 = 225.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 450 = 225.0 V."
}),
          createNumeric({
            "id": "ee-44-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 452 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 452 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 226.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 452 = 226.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 452 = 226.0 V."
}),
          createNumeric({
            "id": "ee-44-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 454 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 454 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 227.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 454 = 227.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 454 = 227.0 V."
}),
          createNumeric({
            "id": "ee-44-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 456 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 456 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 228.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 456 = 228.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 456 = 228.0 V."
}),
          createCircuitLab({
            "id": "ee-44-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Симетричні та несиметричні навантаження, нейтраль і компенсація».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Balanced & Unbalanced Loads, Neutral Current & Compensation'.",
            "title": "Exam Lab 44.9: Balanced & Unbalanced Loads, Neutral Current & Compensation",
            "netlist": "* Exam Model 44_9\nV1 in 0 DC 12\nR1 in out 53k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 1.905,
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
            "id": "ee-44-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Симетричні та несиметричні навантаження, нейтраль і компенсація».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Balanced & Unbalanced Loads, Neutral Current & Compensation'.",
            "title": "Exam Lab 44.10: Balanced & Unbalanced Loads, Neutral Current & Compensation",
            "netlist": "* Exam Model 44_10\nV1 in 0 DC 12\nR1 in out 54k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 1.875,
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
    slug: "ee-45-transformers",
    titleUk: "Трансформатори, еквівалентна схема, регулювання та випробування",
    titleEn: "Transformers, Equivalent Circuits, Regulation & Testing",
    lessons: [
      createLesson({
        slug: "ee-45-l1",
        titleUk: "Трансформатори, еквівалентна схема, регулювання та випробування (Частина 1)",
        titleEn: "Transformers, Equivalent Circuits, Regulation & Testing (Part 1)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-45-l1-c1",
            "promptUk": "Теоретичні основи: Трансформатори, еквівалентна схема, регулювання та випробування (Частина 1)",
            "promptEn": "Theoretical Foundations: Transformers, Equivalent Circuits, Regulation & Testing (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Трансформатори, еквівалентна схема, регулювання та випробування». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Transformers, Equivalent Circuits, Regulation & Testing'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-45-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Трансформатори, еквівалентна схема, регулювання та випробування»?",
            "promptEn": "Which core statement is correct regarding 'Transformers, Equivalent Circuits, Regulation & Testing'?",
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
            "id": "ee-45-l1-n1",
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
            "id": "ee-45-l1-n2",
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
            "id": "ee-45-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Трансформатори, еквівалентна схема, регулювання та випробування»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Transformers, Equivalent Circuits, Regulation & Testing':",
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
        slug: "ee-45-l2",
        titleUk: "Трансформатори, еквівалентна схема, регулювання та випробування (Частина 2)",
        titleEn: "Transformers, Equivalent Circuits, Regulation & Testing (Part 2)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-45-l2-c1",
            "promptUk": "Теоретичні основи: Трансформатори, еквівалентна схема, регулювання та випробування (Частина 2)",
            "promptEn": "Theoretical Foundations: Transformers, Equivalent Circuits, Regulation & Testing (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Трансформатори, еквівалентна схема, регулювання та випробування». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Transformers, Equivalent Circuits, Regulation & Testing'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-45-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Трансформатори, еквівалентна схема, регулювання та випробування»?",
            "promptEn": "Which core statement is correct regarding 'Transformers, Equivalent Circuits, Regulation & Testing'?",
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
            "id": "ee-45-l2-n1",
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
            "id": "ee-45-l2-n2",
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
            "id": "ee-45-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Трансформатори, еквівалентна схема, регулювання та випробування»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Transformers, Equivalent Circuits, Regulation & Testing':",
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
        slug: "ee-45-l3",
        titleUk: "Трансформатори, еквівалентна схема, регулювання та випробування (Частина 3)",
        titleEn: "Transformers, Equivalent Circuits, Regulation & Testing (Part 3)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-45-l3-c1",
            "promptUk": "Теоретичні основи: Трансформатори, еквівалентна схема, регулювання та випробування (Частина 3)",
            "promptEn": "Theoretical Foundations: Transformers, Equivalent Circuits, Regulation & Testing (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Трансформатори, еквівалентна схема, регулювання та випробування». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Transformers, Equivalent Circuits, Regulation & Testing'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-45-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Трансформатори, еквівалентна схема, регулювання та випробування»?",
            "promptEn": "Which core statement is correct regarding 'Transformers, Equivalent Circuits, Regulation & Testing'?",
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
            "id": "ee-45-l3-n1",
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
            "id": "ee-45-l3-n2",
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
            "id": "ee-45-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Трансформатори, еквівалентна схема, регулювання та випробування»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Transformers, Equivalent Circuits, Regulation & Testing':",
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
        slug: "ee-45-l4",
        titleUk: "Трансформатори, еквівалентна схема, регулювання та випробування (Частина 4)",
        titleEn: "Transformers, Equivalent Circuits, Regulation & Testing (Part 4)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-45-l4-c1",
            "promptUk": "Теоретичні основи: Трансформатори, еквівалентна схема, регулювання та випробування (Частина 4)",
            "promptEn": "Theoretical Foundations: Transformers, Equivalent Circuits, Regulation & Testing (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Трансформатори, еквівалентна схема, регулювання та випробування». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Transformers, Equivalent Circuits, Regulation & Testing'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-45-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Трансформатори, еквівалентна схема, регулювання та випробування»?",
            "promptEn": "Which core statement is correct regarding 'Transformers, Equivalent Circuits, Regulation & Testing'?",
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
            "id": "ee-45-l4-n1",
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
            "id": "ee-45-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Трансформатори, еквівалентна схема, регулювання та випробування». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Transformers, Equivalent Circuits, Regulation & Testing'. Run simulation and verify nodes.",
            "title": "Lab 45.4: Transformers, Equivalent Circuits, Regulation & Testing",
            "netlist": "* EduForge SPICE Model for Unit 45\nV1 in 0 DC 10\nR1 in out 65k\nR2 out 0 14k\n.tran 10u 2m\n.end",
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
                                    "target": 1.772,
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
            "id": "ee-45-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Трансформатори, еквівалентна схема, регулювання та випробування»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Transformers, Equivalent Circuits, Regulation & Testing':",
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
        slug: "ee-45-l5",
        titleUk: "Трансформатори, еквівалентна схема, регулювання та випробування (Частина 5)",
        titleEn: "Transformers, Equivalent Circuits, Regulation & Testing (Part 5)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-45-l5-c1",
            "promptUk": "Теоретичні основи: Трансформатори, еквівалентна схема, регулювання та випробування (Частина 5)",
            "promptEn": "Theoretical Foundations: Transformers, Equivalent Circuits, Regulation & Testing (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Трансформатори, еквівалентна схема, регулювання та випробування». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Transformers, Equivalent Circuits, Regulation & Testing'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-45-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Трансформатори, еквівалентна схема, регулювання та випробування»?",
            "promptEn": "Which core statement is correct regarding 'Transformers, Equivalent Circuits, Regulation & Testing'?",
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
            "id": "ee-45-l5-n1",
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
          createCircuitLab({
            "id": "ee-45-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Трансформатори, еквівалентна схема, регулювання та випробування». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Transformers, Equivalent Circuits, Regulation & Testing'. Run simulation and verify nodes.",
            "title": "Lab 45.5: Transformers, Equivalent Circuits, Regulation & Testing",
            "netlist": "* EduForge SPICE Model for Unit 45\nV1 in 0 DC 10\nR1 in out 70k\nR2 out 0 25k\n.tran 10u 2m\n.end",
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
                                    "target": 2.632,
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
            "id": "ee-45-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Трансформатори, еквівалентна схема, регулювання та випробування»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Transformers, Equivalent Circuits, Regulation & Testing':",
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
        slug: "ee-45-exam",
        titleUk: "Екзамен: Трансформатори, еквівалентна схема, регулювання та випробування",
        titleEn: "Exam: Transformers, Equivalent Circuits, Regulation & Testing",
        difficulty: 5,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-45-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Трансформатори, еквівалентна схема, регулювання та випробування»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Transformers, Equivalent Circuits, Regulation & Testing'?",
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
            "id": "ee-45-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Трансформатори, еквівалентна схема, регулювання та випробування»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Transformers, Equivalent Circuits, Regulation & Testing'?",
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
            "id": "ee-45-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Трансформатори, еквівалентна схема, регулювання та випробування»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Transformers, Equivalent Circuits, Regulation & Testing'?",
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
            "id": "ee-45-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Трансформатори, еквівалентна схема, регулювання та випробування»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Transformers, Equivalent Circuits, Regulation & Testing'?",
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
            "id": "ee-45-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 460 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 460 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 230.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 460 = 230.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 460 = 230.0 V."
}),
          createNumeric({
            "id": "ee-45-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 462 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 462 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 231.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 462 = 231.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 462 = 231.0 V."
}),
          createNumeric({
            "id": "ee-45-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 464 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 464 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 232.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 464 = 232.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 464 = 232.0 V."
}),
          createNumeric({
            "id": "ee-45-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 466 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 466 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 233.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 466 = 233.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 466 = 233.0 V."
}),
          createCircuitLab({
            "id": "ee-45-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Трансформатори, еквівалентна схема, регулювання та випробування».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Transformers, Equivalent Circuits, Regulation & Testing'.",
            "title": "Exam Lab 45.9: Transformers, Equivalent Circuits, Regulation & Testing",
            "netlist": "* Exam Model 45_9\nV1 in 0 DC 12\nR1 in out 54k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 1.875,
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
            "id": "ee-45-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Трансформатори, еквівалентна схема, регулювання та випробування».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Transformers, Equivalent Circuits, Regulation & Testing'.",
            "title": "Exam Lab 45.10: Transformers, Equivalent Circuits, Regulation & Testing",
            "netlist": "* Exam Model 45_10\nV1 in 0 DC 12\nR1 in out 55k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 1.846,
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
    slug: "ee-46-dc-machines",
    titleUk: "Машини постійного струму, проти-ЕРС і навантаження",
    titleEn: "DC Machines, Back-EMF & Torque-Speed Characteristics",
    lessons: [
      createLesson({
        slug: "ee-46-l1",
        titleUk: "Машини постійного струму, проти-ЕРС і навантаження (Частина 1)",
        titleEn: "DC Machines, Back-EMF & Torque-Speed Characteristics (Part 1)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-46-l1-c1",
            "promptUk": "Теоретичні основи: Машини постійного струму, проти-ЕРС і навантаження (Частина 1)",
            "promptEn": "Theoretical Foundations: DC Machines, Back-EMF & Torque-Speed Characteristics (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Машини постійного струму, проти-ЕРС і навантаження». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'DC Machines, Back-EMF & Torque-Speed Characteristics'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-46-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Машини постійного струму, проти-ЕРС і навантаження»?",
            "promptEn": "Which core statement is correct regarding 'DC Machines, Back-EMF & Torque-Speed Characteristics'?",
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
            "id": "ee-46-l1-n1",
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
            "id": "ee-46-l1-n2",
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
            "id": "ee-46-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Машини постійного струму, проти-ЕРС і навантаження»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'DC Machines, Back-EMF & Torque-Speed Characteristics':",
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
        slug: "ee-46-l2",
        titleUk: "Машини постійного струму, проти-ЕРС і навантаження (Частина 2)",
        titleEn: "DC Machines, Back-EMF & Torque-Speed Characteristics (Part 2)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-46-l2-c1",
            "promptUk": "Теоретичні основи: Машини постійного струму, проти-ЕРС і навантаження (Частина 2)",
            "promptEn": "Theoretical Foundations: DC Machines, Back-EMF & Torque-Speed Characteristics (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Машини постійного струму, проти-ЕРС і навантаження». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'DC Machines, Back-EMF & Torque-Speed Characteristics'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-46-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Машини постійного струму, проти-ЕРС і навантаження»?",
            "promptEn": "Which core statement is correct regarding 'DC Machines, Back-EMF & Torque-Speed Characteristics'?",
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
            "id": "ee-46-l2-n1",
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
            "id": "ee-46-l2-n2",
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
            "id": "ee-46-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Машини постійного струму, проти-ЕРС і навантаження»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'DC Machines, Back-EMF & Torque-Speed Characteristics':",
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
        slug: "ee-46-l3",
        titleUk: "Машини постійного струму, проти-ЕРС і навантаження (Частина 3)",
        titleEn: "DC Machines, Back-EMF & Torque-Speed Characteristics (Part 3)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-46-l3-c1",
            "promptUk": "Теоретичні основи: Машини постійного струму, проти-ЕРС і навантаження (Частина 3)",
            "promptEn": "Theoretical Foundations: DC Machines, Back-EMF & Torque-Speed Characteristics (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Машини постійного струму, проти-ЕРС і навантаження». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'DC Machines, Back-EMF & Torque-Speed Characteristics'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-46-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Машини постійного струму, проти-ЕРС і навантаження»?",
            "promptEn": "Which core statement is correct regarding 'DC Machines, Back-EMF & Torque-Speed Characteristics'?",
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
            "id": "ee-46-l3-n1",
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
            "id": "ee-46-l3-n2",
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
            "id": "ee-46-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Машини постійного струму, проти-ЕРС і навантаження»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'DC Machines, Back-EMF & Torque-Speed Characteristics':",
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
        slug: "ee-46-l4",
        titleUk: "Машини постійного струму, проти-ЕРС і навантаження (Частина 4)",
        titleEn: "DC Machines, Back-EMF & Torque-Speed Characteristics (Part 4)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-46-l4-c1",
            "promptUk": "Теоретичні основи: Машини постійного струму, проти-ЕРС і навантаження (Частина 4)",
            "promptEn": "Theoretical Foundations: DC Machines, Back-EMF & Torque-Speed Characteristics (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Машини постійного струму, проти-ЕРС і навантаження». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'DC Machines, Back-EMF & Torque-Speed Characteristics'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-46-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Машини постійного струму, проти-ЕРС і навантаження»?",
            "promptEn": "Which core statement is correct regarding 'DC Machines, Back-EMF & Torque-Speed Characteristics'?",
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
            "id": "ee-46-l4-n1",
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
            "id": "ee-46-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Машини постійного струму, проти-ЕРС і навантаження». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'DC Machines, Back-EMF & Torque-Speed Characteristics'. Run simulation and verify nodes.",
            "title": "Lab 46.4: DC Machines, Back-EMF & Torque-Speed Characteristics",
            "netlist": "* EduForge SPICE Model for Unit 46\nV1 in 0 DC 10\nR1 in out 68k\nR2 out 0 21k\n.tran 10u 2m\n.end",
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
                                    "target": 2.36,
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
            "id": "ee-46-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Машини постійного струму, проти-ЕРС і навантаження»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'DC Machines, Back-EMF & Torque-Speed Characteristics':",
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
        slug: "ee-46-l5",
        titleUk: "Машини постійного струму, проти-ЕРС і навантаження (Частина 5)",
        titleEn: "DC Machines, Back-EMF & Torque-Speed Characteristics (Part 5)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-46-l5-c1",
            "promptUk": "Теоретичні основи: Машини постійного струму, проти-ЕРС і навантаження (Частина 5)",
            "promptEn": "Theoretical Foundations: DC Machines, Back-EMF & Torque-Speed Characteristics (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Машини постійного струму, проти-ЕРС і навантаження». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'DC Machines, Back-EMF & Torque-Speed Characteristics'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-46-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Машини постійного струму, проти-ЕРС і навантаження»?",
            "promptEn": "Which core statement is correct regarding 'DC Machines, Back-EMF & Torque-Speed Characteristics'?",
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
            "id": "ee-46-l5-n1",
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
          createCircuitLab({
            "id": "ee-46-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Машини постійного струму, проти-ЕРС і навантаження». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'DC Machines, Back-EMF & Torque-Speed Characteristics'. Run simulation and verify nodes.",
            "title": "Lab 46.5: DC Machines, Back-EMF & Torque-Speed Characteristics",
            "netlist": "* EduForge SPICE Model for Unit 46\nV1 in 0 DC 10\nR1 in out 73k\nR2 out 0 32k\n.tran 10u 2m\n.end",
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
                                    "target": 3.048,
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
            "id": "ee-46-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Машини постійного струму, проти-ЕРС і навантаження»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'DC Machines, Back-EMF & Torque-Speed Characteristics':",
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
        slug: "ee-46-exam",
        titleUk: "Екзамен: Машини постійного струму, проти-ЕРС і навантаження",
        titleEn: "Exam: DC Machines, Back-EMF & Torque-Speed Characteristics",
        difficulty: 5,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-46-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Машини постійного струму, проти-ЕРС і навантаження»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'DC Machines, Back-EMF & Torque-Speed Characteristics'?",
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
            "id": "ee-46-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Машини постійного струму, проти-ЕРС і навантаження»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'DC Machines, Back-EMF & Torque-Speed Characteristics'?",
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
            "id": "ee-46-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Машини постійного струму, проти-ЕРС і навантаження»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'DC Machines, Back-EMF & Torque-Speed Characteristics'?",
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
            "id": "ee-46-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Машини постійного струму, проти-ЕРС і навантаження»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'DC Machines, Back-EMF & Torque-Speed Characteristics'?",
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
            "id": "ee-46-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 470 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 470 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 235.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 470 = 235.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 470 = 235.0 V."
}),
          createNumeric({
            "id": "ee-46-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 472 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 472 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 236.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 472 = 236.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 472 = 236.0 V."
}),
          createNumeric({
            "id": "ee-46-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 474 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 474 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 237.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 474 = 237.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 474 = 237.0 V."
}),
          createNumeric({
            "id": "ee-46-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 476 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 476 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 238.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 476 = 238.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 476 = 238.0 V."
}),
          createCircuitLab({
            "id": "ee-46-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Машини постійного струму, проти-ЕРС і навантаження».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'DC Machines, Back-EMF & Torque-Speed Characteristics'.",
            "title": "Exam Lab 46.9: DC Machines, Back-EMF & Torque-Speed Characteristics",
            "netlist": "* Exam Model 46_9\nV1 in 0 DC 12\nR1 in out 55k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 1.846,
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
            "id": "ee-46-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Машини постійного струму, проти-ЕРС і навантаження».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'DC Machines, Back-EMF & Torque-Speed Characteristics'.",
            "title": "Exam Lab 46.10: DC Machines, Back-EMF & Torque-Speed Characteristics",
            "netlist": "* Exam Model 46_10\nV1 in 0 DC 12\nR1 in out 56k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 1.818,
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
    slug: "ee-47-induction-motors",
    titleUk: "Асинхронні двигуни, ковзання, пуск та характеристики",
    titleEn: "Induction Motors, Slip, Starting Methods & Torque Curves",
    lessons: [
      createLesson({
        slug: "ee-47-l1",
        titleUk: "Асинхронні двигуни, ковзання, пуск та характеристики (Частина 1)",
        titleEn: "Induction Motors, Slip, Starting Methods & Torque Curves (Part 1)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-47-l1-c1",
            "promptUk": "Теоретичні основи: Асинхронні двигуни, ковзання, пуск та характеристики (Частина 1)",
            "promptEn": "Theoretical Foundations: Induction Motors, Slip, Starting Methods & Torque Curves (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Асинхронні двигуни, ковзання, пуск та характеристики». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Induction Motors, Slip, Starting Methods & Torque Curves'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-47-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Асинхронні двигуни, ковзання, пуск та характеристики»?",
            "promptEn": "Which core statement is correct regarding 'Induction Motors, Slip, Starting Methods & Torque Curves'?",
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
            "id": "ee-47-l1-n1",
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
            "id": "ee-47-l1-n2",
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
            "id": "ee-47-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Асинхронні двигуни, ковзання, пуск та характеристики»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Induction Motors, Slip, Starting Methods & Torque Curves':",
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
        slug: "ee-47-l2",
        titleUk: "Асинхронні двигуни, ковзання, пуск та характеристики (Частина 2)",
        titleEn: "Induction Motors, Slip, Starting Methods & Torque Curves (Part 2)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-47-l2-c1",
            "promptUk": "Теоретичні основи: Асинхронні двигуни, ковзання, пуск та характеристики (Частина 2)",
            "promptEn": "Theoretical Foundations: Induction Motors, Slip, Starting Methods & Torque Curves (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Асинхронні двигуни, ковзання, пуск та характеристики». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Induction Motors, Slip, Starting Methods & Torque Curves'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-47-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Асинхронні двигуни, ковзання, пуск та характеристики»?",
            "promptEn": "Which core statement is correct regarding 'Induction Motors, Slip, Starting Methods & Torque Curves'?",
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
            "id": "ee-47-l2-n1",
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
            "id": "ee-47-l2-n2",
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
            "id": "ee-47-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Асинхронні двигуни, ковзання, пуск та характеристики»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Induction Motors, Slip, Starting Methods & Torque Curves':",
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
        slug: "ee-47-l3",
        titleUk: "Асинхронні двигуни, ковзання, пуск та характеристики (Частина 3)",
        titleEn: "Induction Motors, Slip, Starting Methods & Torque Curves (Part 3)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-47-l3-c1",
            "promptUk": "Теоретичні основи: Асинхронні двигуни, ковзання, пуск та характеристики (Частина 3)",
            "promptEn": "Theoretical Foundations: Induction Motors, Slip, Starting Methods & Torque Curves (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Асинхронні двигуни, ковзання, пуск та характеристики». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Induction Motors, Slip, Starting Methods & Torque Curves'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-47-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Асинхронні двигуни, ковзання, пуск та характеристики»?",
            "promptEn": "Which core statement is correct regarding 'Induction Motors, Slip, Starting Methods & Torque Curves'?",
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
            "id": "ee-47-l3-n1",
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
            "id": "ee-47-l3-n2",
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
            "id": "ee-47-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Асинхронні двигуни, ковзання, пуск та характеристики»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Induction Motors, Slip, Starting Methods & Torque Curves':",
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
        slug: "ee-47-l4",
        titleUk: "Асинхронні двигуни, ковзання, пуск та характеристики (Частина 4)",
        titleEn: "Induction Motors, Slip, Starting Methods & Torque Curves (Part 4)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-47-l4-c1",
            "promptUk": "Теоретичні основи: Асинхронні двигуни, ковзання, пуск та характеристики (Частина 4)",
            "promptEn": "Theoretical Foundations: Induction Motors, Slip, Starting Methods & Torque Curves (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Асинхронні двигуни, ковзання, пуск та характеристики». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Induction Motors, Slip, Starting Methods & Torque Curves'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-47-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Асинхронні двигуни, ковзання, пуск та характеристики»?",
            "promptEn": "Which core statement is correct regarding 'Induction Motors, Slip, Starting Methods & Torque Curves'?",
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
            "id": "ee-47-l4-n1",
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
            "id": "ee-47-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Асинхронні двигуни, ковзання, пуск та характеристики». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Induction Motors, Slip, Starting Methods & Torque Curves'. Run simulation and verify nodes.",
            "title": "Lab 47.4: Induction Motors, Slip, Starting Methods & Torque Curves",
            "netlist": "* EduForge SPICE Model for Unit 47\nV1 in 0 DC 10\nR1 in out 71k\nR2 out 0 28k\n.tran 10u 2m\n.end",
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
                                    "target": 2.828,
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
            "id": "ee-47-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Асинхронні двигуни, ковзання, пуск та характеристики»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Induction Motors, Slip, Starting Methods & Torque Curves':",
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
        slug: "ee-47-l5",
        titleUk: "Асинхронні двигуни, ковзання, пуск та характеристики (Частина 5)",
        titleEn: "Induction Motors, Slip, Starting Methods & Torque Curves (Part 5)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-47-l5-c1",
            "promptUk": "Теоретичні основи: Асинхронні двигуни, ковзання, пуск та характеристики (Частина 5)",
            "promptEn": "Theoretical Foundations: Induction Motors, Slip, Starting Methods & Torque Curves (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Асинхронні двигуни, ковзання, пуск та характеристики». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Induction Motors, Slip, Starting Methods & Torque Curves'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-47-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Асинхронні двигуни, ковзання, пуск та характеристики»?",
            "promptEn": "Which core statement is correct regarding 'Induction Motors, Slip, Starting Methods & Torque Curves'?",
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
            "id": "ee-47-l5-n1",
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
          createCircuitLab({
            "id": "ee-47-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Асинхронні двигуни, ковзання, пуск та характеристики». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Induction Motors, Slip, Starting Methods & Torque Curves'. Run simulation and verify nodes.",
            "title": "Lab 47.5: Induction Motors, Slip, Starting Methods & Torque Curves",
            "netlist": "* EduForge SPICE Model for Unit 47\nV1 in 0 DC 10\nR1 in out 76k\nR2 out 0 39k\n.tran 10u 2m\n.end",
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
                                    "target": 3.391,
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
            "id": "ee-47-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Асинхронні двигуни, ковзання, пуск та характеристики»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Induction Motors, Slip, Starting Methods & Torque Curves':",
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
        slug: "ee-47-exam",
        titleUk: "Екзамен: Асинхронні двигуни, ковзання, пуск та характеристики",
        titleEn: "Exam: Induction Motors, Slip, Starting Methods & Torque Curves",
        difficulty: 5,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-47-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Асинхронні двигуни, ковзання, пуск та характеристики»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Induction Motors, Slip, Starting Methods & Torque Curves'?",
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
            "id": "ee-47-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Асинхронні двигуни, ковзання, пуск та характеристики»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Induction Motors, Slip, Starting Methods & Torque Curves'?",
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
            "id": "ee-47-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Асинхронні двигуни, ковзання, пуск та характеристики»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Induction Motors, Slip, Starting Methods & Torque Curves'?",
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
            "id": "ee-47-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Асинхронні двигуни, ковзання, пуск та характеристики»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Induction Motors, Slip, Starting Methods & Torque Curves'?",
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
            "id": "ee-47-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 480 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 480 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 240.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 480 = 240.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 480 = 240.0 V."
}),
          createNumeric({
            "id": "ee-47-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 482 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 482 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 241.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 482 = 241.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 482 = 241.0 V."
}),
          createNumeric({
            "id": "ee-47-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 484 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 484 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 242.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 484 = 242.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 484 = 242.0 V."
}),
          createNumeric({
            "id": "ee-47-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 486 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 486 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 243.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 486 = 243.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 486 = 243.0 V."
}),
          createCircuitLab({
            "id": "ee-47-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Асинхронні двигуни, ковзання, пуск та характеристики».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Induction Motors, Slip, Starting Methods & Torque Curves'.",
            "title": "Exam Lab 47.9: Induction Motors, Slip, Starting Methods & Torque Curves",
            "netlist": "* Exam Model 47_9\nV1 in 0 DC 12\nR1 in out 56k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 1.818,
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
            "id": "ee-47-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Асинхронні двигуни, ковзання, пуск та характеристики».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Induction Motors, Slip, Starting Methods & Torque Curves'.",
            "title": "Exam Lab 47.10: Induction Motors, Slip, Starting Methods & Torque Curves",
            "netlist": "* Exam Model 47_10\nV1 in 0 DC 12\nR1 in out 57k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 1.791,
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
    slug: "ee-48-synchronous-bldc",
    titleUk: "Синхронні машини, BLDC, крокові двигуни та електропривод",
    titleEn: "Synchronous Machines, BLDC Motors, Steppers & Drives",
    lessons: [
      createLesson({
        slug: "ee-48-l1",
        titleUk: "Синхронні машини, BLDC, крокові двигуни та електропривод (Частина 1)",
        titleEn: "Synchronous Machines, BLDC Motors, Steppers & Drives (Part 1)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-48-l1-c1",
            "promptUk": "Теоретичні основи: Синхронні машини, BLDC, крокові двигуни та електропривод (Частина 1)",
            "promptEn": "Theoretical Foundations: Synchronous Machines, BLDC Motors, Steppers & Drives (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Синхронні машини, BLDC, крокові двигуни та електропривод». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Synchronous Machines, BLDC Motors, Steppers & Drives'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-48-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Синхронні машини, BLDC, крокові двигуни та електропривод»?",
            "promptEn": "Which core statement is correct regarding 'Synchronous Machines, BLDC Motors, Steppers & Drives'?",
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
            "id": "ee-48-l1-n1",
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
            "id": "ee-48-l1-n2",
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
            "id": "ee-48-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Синхронні машини, BLDC, крокові двигуни та електропривод»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Synchronous Machines, BLDC Motors, Steppers & Drives':",
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
        slug: "ee-48-l2",
        titleUk: "Синхронні машини, BLDC, крокові двигуни та електропривод (Частина 2)",
        titleEn: "Synchronous Machines, BLDC Motors, Steppers & Drives (Part 2)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-48-l2-c1",
            "promptUk": "Теоретичні основи: Синхронні машини, BLDC, крокові двигуни та електропривод (Частина 2)",
            "promptEn": "Theoretical Foundations: Synchronous Machines, BLDC Motors, Steppers & Drives (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Синхронні машини, BLDC, крокові двигуни та електропривод». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Synchronous Machines, BLDC Motors, Steppers & Drives'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-48-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Синхронні машини, BLDC, крокові двигуни та електропривод»?",
            "promptEn": "Which core statement is correct regarding 'Synchronous Machines, BLDC Motors, Steppers & Drives'?",
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
            "id": "ee-48-l2-n1",
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
            "id": "ee-48-l2-n2",
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
            "id": "ee-48-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Синхронні машини, BLDC, крокові двигуни та електропривод»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Synchronous Machines, BLDC Motors, Steppers & Drives':",
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
        slug: "ee-48-l3",
        titleUk: "Синхронні машини, BLDC, крокові двигуни та електропривод (Частина 3)",
        titleEn: "Synchronous Machines, BLDC Motors, Steppers & Drives (Part 3)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-48-l3-c1",
            "promptUk": "Теоретичні основи: Синхронні машини, BLDC, крокові двигуни та електропривод (Частина 3)",
            "promptEn": "Theoretical Foundations: Synchronous Machines, BLDC Motors, Steppers & Drives (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Синхронні машини, BLDC, крокові двигуни та електропривод». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Synchronous Machines, BLDC Motors, Steppers & Drives'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-48-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Синхронні машини, BLDC, крокові двигуни та електропривод»?",
            "promptEn": "Which core statement is correct regarding 'Synchronous Machines, BLDC Motors, Steppers & Drives'?",
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
            "id": "ee-48-l3-n1",
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
            "id": "ee-48-l3-n2",
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
            "id": "ee-48-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Синхронні машини, BLDC, крокові двигуни та електропривод»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Synchronous Machines, BLDC Motors, Steppers & Drives':",
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
        slug: "ee-48-l4",
        titleUk: "Синхронні машини, BLDC, крокові двигуни та електропривод (Частина 4)",
        titleEn: "Synchronous Machines, BLDC Motors, Steppers & Drives (Part 4)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-48-l4-c1",
            "promptUk": "Теоретичні основи: Синхронні машини, BLDC, крокові двигуни та електропривод (Частина 4)",
            "promptEn": "Theoretical Foundations: Synchronous Machines, BLDC Motors, Steppers & Drives (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Синхронні машини, BLDC, крокові двигуни та електропривод». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Synchronous Machines, BLDC Motors, Steppers & Drives'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-48-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Синхронні машини, BLDC, крокові двигуни та електропривод»?",
            "promptEn": "Which core statement is correct regarding 'Synchronous Machines, BLDC Motors, Steppers & Drives'?",
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
            "id": "ee-48-l4-n1",
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
            "id": "ee-48-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Синхронні машини, BLDC, крокові двигуни та електропривод». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Synchronous Machines, BLDC Motors, Steppers & Drives'. Run simulation and verify nodes.",
            "title": "Lab 48.4: Synchronous Machines, BLDC Motors, Steppers & Drives",
            "netlist": "* EduForge SPICE Model for Unit 48\nV1 in 0 DC 10\nR1 in out 74k\nR2 out 0 35k\n.tran 10u 2m\n.end",
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
                                    "target": 3.211,
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
            "id": "ee-48-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Синхронні машини, BLDC, крокові двигуни та електропривод»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Synchronous Machines, BLDC Motors, Steppers & Drives':",
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
        slug: "ee-48-l5",
        titleUk: "Синхронні машини, BLDC, крокові двигуни та електропривод (Частина 5)",
        titleEn: "Synchronous Machines, BLDC Motors, Steppers & Drives (Part 5)",
        difficulty: 4,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-48-l5-c1",
            "promptUk": "Теоретичні основи: Синхронні машини, BLDC, крокові двигуни та електропривод (Частина 5)",
            "promptEn": "Theoretical Foundations: Synchronous Machines, BLDC Motors, Steppers & Drives (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Синхронні машини, BLDC, крокові двигуни та електропривод». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Synchronous Machines, BLDC Motors, Steppers & Drives'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-48-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Синхронні машини, BLDC, крокові двигуни та електропривод»?",
            "promptEn": "Which core statement is correct regarding 'Synchronous Machines, BLDC Motors, Steppers & Drives'?",
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
            "id": "ee-48-l5-n1",
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
          createCircuitLab({
            "id": "ee-48-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Синхронні машини, BLDC, крокові двигуни та електропривод». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Synchronous Machines, BLDC Motors, Steppers & Drives'. Run simulation and verify nodes.",
            "title": "Lab 48.5: Synchronous Machines, BLDC Motors, Steppers & Drives",
            "netlist": "* EduForge SPICE Model for Unit 48\nV1 in 0 DC 10\nR1 in out 79k\nR2 out 0 46k\n.tran 10u 2m\n.end",
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
                                    "target": 3.68,
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
            "id": "ee-48-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Синхронні машини, BLDC, крокові двигуни та електропривод»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Synchronous Machines, BLDC Motors, Steppers & Drives':",
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
        slug: "ee-48-exam",
        titleUk: "Екзамен: Синхронні машини, BLDC, крокові двигуни та електропривод",
        titleEn: "Exam: Synchronous Machines, BLDC Motors, Steppers & Drives",
        difficulty: 5,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-48-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Синхронні машини, BLDC, крокові двигуни та електропривод»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Synchronous Machines, BLDC Motors, Steppers & Drives'?",
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
            "id": "ee-48-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Синхронні машини, BLDC, крокові двигуни та електропривод»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Synchronous Machines, BLDC Motors, Steppers & Drives'?",
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
            "id": "ee-48-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Синхронні машини, BLDC, крокові двигуни та електропривод»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Synchronous Machines, BLDC Motors, Steppers & Drives'?",
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
            "id": "ee-48-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Синхронні машини, BLDC, крокові двигуни та електропривод»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Synchronous Machines, BLDC Motors, Steppers & Drives'?",
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
            "id": "ee-48-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 490 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 490 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 245.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 490 = 245.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 490 = 245.0 V."
}),
          createNumeric({
            "id": "ee-48-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 492 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 492 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 246.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 492 = 246.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 492 = 246.0 V."
}),
          createNumeric({
            "id": "ee-48-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 494 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 494 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 247.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 494 = 247.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 494 = 247.0 V."
}),
          createNumeric({
            "id": "ee-48-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 496 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 496 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 248.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 496 = 248.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 496 = 248.0 V."
}),
          createCircuitLab({
            "id": "ee-48-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Синхронні машини, BLDC, крокові двигуни та електропривод».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Synchronous Machines, BLDC Motors, Steppers & Drives'.",
            "title": "Exam Lab 48.9: Synchronous Machines, BLDC Motors, Steppers & Drives",
            "netlist": "* Exam Model 48_9\nV1 in 0 DC 12\nR1 in out 57k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 1.791,
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
            "id": "ee-48-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Синхронні машини, BLDC, крокові двигуни та електропривод».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Synchronous Machines, BLDC Motors, Steppers & Drives'.",
            "title": "Exam Lab 48.10: Synchronous Machines, BLDC Motors, Steppers & Drives",
            "netlist": "* Exam Model 48_10\nV1 in 0 DC 12\nR1 in out 58k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 1.765,
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