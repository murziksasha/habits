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
 * Stage 5: 6 Units, 36 Lessons (5 instructional + 1 exam per unit)
 */
export const stage5Units: UnitContent[] = [
  createUnit({
    slug: "ee-25-semiconductors-diodes",
    titleUk: "Напівпровідники, p–n-перехід, діоди та світлодіоди",
    titleEn: "Semiconductors, p–n Junction, Diodes & LEDs",
    lessons: [
      createLesson({
        slug: "ee-25-l1",
        titleUk: "Напівпровідники, p–n-перехід, діоди та світлодіоди (Частина 1)",
        titleEn: "Semiconductors, p–n Junction, Diodes & LEDs (Part 1)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-25-l1-c1",
            "promptUk": "Теоретичні основи: Напівпровідники, p–n-перехід, діоди та світлодіоди (Частина 1)",
            "promptEn": "Theoretical Foundations: Semiconductors, p–n Junction, Diodes & LEDs (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Напівпровідники, p–n-перехід, діоди та світлодіоди». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Semiconductors, p–n Junction, Diodes & LEDs'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-25-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Напівпровідники, p–n-перехід, діоди та світлодіоди»?",
            "promptEn": "Which core statement is correct regarding 'Semiconductors, p–n Junction, Diodes & LEDs'?",
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
            "id": "ee-25-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 90 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 90 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 135.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 90 * 1.5 = 135.0 В.",
            "explanationEn": "Calculation follows direct scaling: 90 * 1.5 = 135.0 V."
}),
          createNumeric({
            "id": "ee-25-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 90 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 90 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.278,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 90 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 90 A."
}),
          createExplain({
            "id": "ee-25-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Напівпровідники, p–n-перехід, діоди та світлодіоди»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Semiconductors, p–n Junction, Diodes & LEDs':",
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
        slug: "ee-25-l2",
        titleUk: "Напівпровідники, p–n-перехід, діоди та світлодіоди (Частина 2)",
        titleEn: "Semiconductors, p–n Junction, Diodes & LEDs (Part 2)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-25-l2-c1",
            "promptUk": "Теоретичні основи: Напівпровідники, p–n-перехід, діоди та світлодіоди (Частина 2)",
            "promptEn": "Theoretical Foundations: Semiconductors, p–n Junction, Diodes & LEDs (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Напівпровідники, p–n-перехід, діоди та світлодіоди». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Semiconductors, p–n Junction, Diodes & LEDs'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-25-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Напівпровідники, p–n-перехід, діоди та світлодіоди»?",
            "promptEn": "Which core statement is correct regarding 'Semiconductors, p–n Junction, Diodes & LEDs'?",
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
            "id": "ee-25-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 95 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 95 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 142.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 95 * 1.5 = 142.5 В.",
            "explanationEn": "Calculation follows direct scaling: 95 * 1.5 = 142.5 V."
}),
          createNumeric({
            "id": "ee-25-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 95 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 95 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.263,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 95 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 95 A."
}),
          createExplain({
            "id": "ee-25-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Напівпровідники, p–n-перехід, діоди та світлодіоди»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Semiconductors, p–n Junction, Diodes & LEDs':",
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
        slug: "ee-25-l3",
        titleUk: "Напівпровідники, p–n-перехід, діоди та світлодіоди (Частина 3)",
        titleEn: "Semiconductors, p–n Junction, Diodes & LEDs (Part 3)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-25-l3-c1",
            "promptUk": "Теоретичні основи: Напівпровідники, p–n-перехід, діоди та світлодіоди (Частина 3)",
            "promptEn": "Theoretical Foundations: Semiconductors, p–n Junction, Diodes & LEDs (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Напівпровідники, p–n-перехід, діоди та світлодіоди». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Semiconductors, p–n Junction, Diodes & LEDs'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-25-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Напівпровідники, p–n-перехід, діоди та світлодіоди»?",
            "promptEn": "Which core statement is correct regarding 'Semiconductors, p–n Junction, Diodes & LEDs'?",
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
            "id": "ee-25-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 100 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 100 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 150.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 100 * 1.5 = 150.0 В.",
            "explanationEn": "Calculation follows direct scaling: 100 * 1.5 = 150.0 V."
}),
          createNumeric({
            "id": "ee-25-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 100 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 100 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.25,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 100 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 100 A."
}),
          createExplain({
            "id": "ee-25-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Напівпровідники, p–n-перехід, діоди та світлодіоди»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Semiconductors, p–n Junction, Diodes & LEDs':",
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
        slug: "ee-25-l4",
        titleUk: "Напівпровідники, p–n-перехід, діоди та світлодіоди (Частина 4)",
        titleEn: "Semiconductors, p–n Junction, Diodes & LEDs (Part 4)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-25-l4-c1",
            "promptUk": "Теоретичні основи: Напівпровідники, p–n-перехід, діоди та світлодіоди (Частина 4)",
            "promptEn": "Theoretical Foundations: Semiconductors, p–n Junction, Diodes & LEDs (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Напівпровідники, p–n-перехід, діоди та світлодіоди». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Semiconductors, p–n Junction, Diodes & LEDs'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-25-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Напівпровідники, p–n-перехід, діоди та світлодіоди»?",
            "promptEn": "Which core statement is correct regarding 'Semiconductors, p–n Junction, Diodes & LEDs'?",
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
            "id": "ee-25-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 105 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 105 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 157.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 105 * 1.5 = 157.5 В.",
            "explanationEn": "Calculation follows direct scaling: 105 * 1.5 = 157.5 V."
}),
          createCircuitLab({
            "id": "ee-25-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Напівпровідники, p–n-перехід, діоди та світлодіоди». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Semiconductors, p–n Junction, Diodes & LEDs'. Run simulation and verify nodes.",
            "title": "Lab 25.4: Semiconductors, p–n Junction, Diodes & LEDs",
            "netlist": "* EduForge SPICE Model for Unit 25\nV1 in 0 DC 10\nR1 in out 105k\nR2 out 0 24k\n.tran 10u 2m\n.end",
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
                                    "target": 1.86,
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
            "id": "ee-25-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Напівпровідники, p–n-перехід, діоди та світлодіоди»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Semiconductors, p–n Junction, Diodes & LEDs':",
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
        slug: "ee-25-l5",
        titleUk: "Напівпровідники, p–n-перехід, діоди та світлодіоди (Частина 5)",
        titleEn: "Semiconductors, p–n Junction, Diodes & LEDs (Part 5)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-25-l5-c1",
            "promptUk": "Теоретичні основи: Напівпровідники, p–n-перехід, діоди та світлодіоди (Частина 5)",
            "promptEn": "Theoretical Foundations: Semiconductors, p–n Junction, Diodes & LEDs (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Напівпровідники, p–n-перехід, діоди та світлодіоди». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Semiconductors, p–n Junction, Diodes & LEDs'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-25-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Напівпровідники, p–n-перехід, діоди та світлодіоди»?",
            "promptEn": "Which core statement is correct regarding 'Semiconductors, p–n Junction, Diodes & LEDs'?",
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
            "id": "ee-25-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 10 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 10 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 15.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 10 * 1.5 = 15.0 В.",
            "explanationEn": "Calculation follows direct scaling: 10 * 1.5 = 15.0 V."
}),
          createCircuitLab({
            "id": "ee-25-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Напівпровідники, p–n-перехід, діоди та світлодіоди». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Semiconductors, p–n Junction, Diodes & LEDs'. Run simulation and verify nodes.",
            "title": "Lab 25.5: Semiconductors, p–n Junction, Diodes & LEDs",
            "netlist": "* EduForge SPICE Model for Unit 25\nV1 in 0 DC 10\nR1 in out 10k\nR2 out 0 35k\n.tran 10u 2m\n.end",
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
                                    "target": 7.778,
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
            "id": "ee-25-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Напівпровідники, p–n-перехід, діоди та світлодіоди»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Semiconductors, p–n Junction, Diodes & LEDs':",
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
        slug: "ee-25-exam",
        titleUk: "Екзамен: Напівпровідники, p–n-перехід, діоди та світлодіоди",
        titleEn: "Exam: Semiconductors, p–n Junction, Diodes & LEDs",
        difficulty: 3,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-25-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Напівпровідники, p–n-перехід, діоди та світлодіоди»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Semiconductors, p–n Junction, Diodes & LEDs'?",
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
            "id": "ee-25-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Напівпровідники, p–n-перехід, діоди та світлодіоди»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Semiconductors, p–n Junction, Diodes & LEDs'?",
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
            "id": "ee-25-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Напівпровідники, p–n-перехід, діоди та світлодіоди»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Semiconductors, p–n Junction, Diodes & LEDs'?",
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
            "id": "ee-25-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Напівпровідники, p–n-перехід, діоди та світлодіоди»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Semiconductors, p–n Junction, Diodes & LEDs'?",
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
            "id": "ee-25-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 260 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 260 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 130.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 260 = 130.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 260 = 130.0 V."
}),
          createNumeric({
            "id": "ee-25-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 262 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 262 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 131.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 262 = 131.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 262 = 131.0 V."
}),
          createNumeric({
            "id": "ee-25-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 264 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 264 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 132.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 264 = 132.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 264 = 132.0 V."
}),
          createNumeric({
            "id": "ee-25-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 266 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 266 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 133.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 266 = 133.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 266 = 133.0 V."
}),
          createCircuitLab({
            "id": "ee-25-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Напівпровідники, p–n-перехід, діоди та світлодіоди».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Semiconductors, p–n Junction, Diodes & LEDs'.",
            "title": "Exam Lab 25.9: Semiconductors, p–n Junction, Diodes & LEDs",
            "netlist": "* Exam Model 25_9\nV1 in 0 DC 12\nR1 in out 34k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 2.727,
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
            "id": "ee-25-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Напівпровідники, p–n-перехід, діоди та світлодіоди».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Semiconductors, p–n Junction, Diodes & LEDs'.",
            "title": "Exam Lab 25.10: Semiconductors, p–n Junction, Diodes & LEDs",
            "netlist": "* Exam Model 25_10\nV1 in 0 DC 12\nR1 in out 35k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 2.667,
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
    slug: "ee-26-rectifiers-filters",
    titleUk: "Випрямлячі, згладжування, пульсації та обмежувачі",
    titleEn: "Rectifiers, Smoothing Filters, Ripple & Clippers",
    lessons: [
      createLesson({
        slug: "ee-26-l1",
        titleUk: "Випрямлячі, згладжування, пульсації та обмежувачі (Частина 1)",
        titleEn: "Rectifiers, Smoothing Filters, Ripple & Clippers (Part 1)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-26-l1-c1",
            "promptUk": "Теоретичні основи: Випрямлячі, згладжування, пульсації та обмежувачі (Частина 1)",
            "promptEn": "Theoretical Foundations: Rectifiers, Smoothing Filters, Ripple & Clippers (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Випрямлячі, згладжування, пульсації та обмежувачі». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Rectifiers, Smoothing Filters, Ripple & Clippers'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-26-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Випрямлячі, згладжування, пульсації та обмежувачі»?",
            "promptEn": "Which core statement is correct regarding 'Rectifiers, Smoothing Filters, Ripple & Clippers'?",
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
            "id": "ee-26-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 93 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 93 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 139.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 93 * 1.5 = 139.5 В.",
            "explanationEn": "Calculation follows direct scaling: 93 * 1.5 = 139.5 V."
}),
          createNumeric({
            "id": "ee-26-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 93 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 93 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.269,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 93 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 93 A."
}),
          createExplain({
            "id": "ee-26-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Випрямлячі, згладжування, пульсації та обмежувачі»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Rectifiers, Smoothing Filters, Ripple & Clippers':",
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
        slug: "ee-26-l2",
        titleUk: "Випрямлячі, згладжування, пульсації та обмежувачі (Частина 2)",
        titleEn: "Rectifiers, Smoothing Filters, Ripple & Clippers (Part 2)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-26-l2-c1",
            "promptUk": "Теоретичні основи: Випрямлячі, згладжування, пульсації та обмежувачі (Частина 2)",
            "promptEn": "Theoretical Foundations: Rectifiers, Smoothing Filters, Ripple & Clippers (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Випрямлячі, згладжування, пульсації та обмежувачі». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Rectifiers, Smoothing Filters, Ripple & Clippers'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-26-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Випрямлячі, згладжування, пульсації та обмежувачі»?",
            "promptEn": "Which core statement is correct regarding 'Rectifiers, Smoothing Filters, Ripple & Clippers'?",
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
            "id": "ee-26-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 98 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 98 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 147.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 98 * 1.5 = 147.0 В.",
            "explanationEn": "Calculation follows direct scaling: 98 * 1.5 = 147.0 V."
}),
          createNumeric({
            "id": "ee-26-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 98 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 98 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.255,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 98 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 98 A."
}),
          createExplain({
            "id": "ee-26-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Випрямлячі, згладжування, пульсації та обмежувачі»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Rectifiers, Smoothing Filters, Ripple & Clippers':",
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
        slug: "ee-26-l3",
        titleUk: "Випрямлячі, згладжування, пульсації та обмежувачі (Частина 3)",
        titleEn: "Rectifiers, Smoothing Filters, Ripple & Clippers (Part 3)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-26-l3-c1",
            "promptUk": "Теоретичні основи: Випрямлячі, згладжування, пульсації та обмежувачі (Частина 3)",
            "promptEn": "Theoretical Foundations: Rectifiers, Smoothing Filters, Ripple & Clippers (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Випрямлячі, згладжування, пульсації та обмежувачі». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Rectifiers, Smoothing Filters, Ripple & Clippers'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-26-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Випрямлячі, згладжування, пульсації та обмежувачі»?",
            "promptEn": "Which core statement is correct regarding 'Rectifiers, Smoothing Filters, Ripple & Clippers'?",
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
            "id": "ee-26-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 103 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 103 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 154.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 103 * 1.5 = 154.5 В.",
            "explanationEn": "Calculation follows direct scaling: 103 * 1.5 = 154.5 V."
}),
          createNumeric({
            "id": "ee-26-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 103 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 103 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.243,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 103 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 103 A."
}),
          createExplain({
            "id": "ee-26-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Випрямлячі, згладжування, пульсації та обмежувачі»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Rectifiers, Smoothing Filters, Ripple & Clippers':",
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
        slug: "ee-26-l4",
        titleUk: "Випрямлячі, згладжування, пульсації та обмежувачі (Частина 4)",
        titleEn: "Rectifiers, Smoothing Filters, Ripple & Clippers (Part 4)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-26-l4-c1",
            "promptUk": "Теоретичні основи: Випрямлячі, згладжування, пульсації та обмежувачі (Частина 4)",
            "promptEn": "Theoretical Foundations: Rectifiers, Smoothing Filters, Ripple & Clippers (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Випрямлячі, згладжування, пульсації та обмежувачі». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Rectifiers, Smoothing Filters, Ripple & Clippers'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-26-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Випрямлячі, згладжування, пульсації та обмежувачі»?",
            "promptEn": "Which core statement is correct regarding 'Rectifiers, Smoothing Filters, Ripple & Clippers'?",
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
            "id": "ee-26-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 108 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 108 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 162.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 108 * 1.5 = 162.0 В.",
            "explanationEn": "Calculation follows direct scaling: 108 * 1.5 = 162.0 V."
}),
          createCircuitLab({
            "id": "ee-26-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Випрямлячі, згладжування, пульсації та обмежувачі». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Rectifiers, Smoothing Filters, Ripple & Clippers'. Run simulation and verify nodes.",
            "title": "Lab 26.4: Rectifiers, Smoothing Filters, Ripple & Clippers",
            "netlist": "* EduForge SPICE Model for Unit 26\nV1 in 0 DC 10\nR1 in out 108k\nR2 out 0 31k\n.tran 10u 2m\n.end",
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
                                    "target": 2.23,
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
            "id": "ee-26-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Випрямлячі, згладжування, пульсації та обмежувачі»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Rectifiers, Smoothing Filters, Ripple & Clippers':",
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
        slug: "ee-26-l5",
        titleUk: "Випрямлячі, згладжування, пульсації та обмежувачі (Частина 5)",
        titleEn: "Rectifiers, Smoothing Filters, Ripple & Clippers (Part 5)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-26-l5-c1",
            "promptUk": "Теоретичні основи: Випрямлячі, згладжування, пульсації та обмежувачі (Частина 5)",
            "promptEn": "Theoretical Foundations: Rectifiers, Smoothing Filters, Ripple & Clippers (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Випрямлячі, згладжування, пульсації та обмежувачі». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Rectifiers, Smoothing Filters, Ripple & Clippers'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-26-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Випрямлячі, згладжування, пульсації та обмежувачі»?",
            "promptEn": "Which core statement is correct regarding 'Rectifiers, Smoothing Filters, Ripple & Clippers'?",
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
            "id": "ee-26-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 13 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 13 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 19.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 13 * 1.5 = 19.5 В.",
            "explanationEn": "Calculation follows direct scaling: 13 * 1.5 = 19.5 V."
}),
          createCircuitLab({
            "id": "ee-26-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Випрямлячі, згладжування, пульсації та обмежувачі». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Rectifiers, Smoothing Filters, Ripple & Clippers'. Run simulation and verify nodes.",
            "title": "Lab 26.5: Rectifiers, Smoothing Filters, Ripple & Clippers",
            "netlist": "* EduForge SPICE Model for Unit 26\nV1 in 0 DC 10\nR1 in out 13k\nR2 out 0 42k\n.tran 10u 2m\n.end",
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
                                    "target": 7.636,
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
            "id": "ee-26-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Випрямлячі, згладжування, пульсації та обмежувачі»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Rectifiers, Smoothing Filters, Ripple & Clippers':",
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
        slug: "ee-26-exam",
        titleUk: "Екзамен: Випрямлячі, згладжування, пульсації та обмежувачі",
        titleEn: "Exam: Rectifiers, Smoothing Filters, Ripple & Clippers",
        difficulty: 3,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-26-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Випрямлячі, згладжування, пульсації та обмежувачі»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Rectifiers, Smoothing Filters, Ripple & Clippers'?",
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
            "id": "ee-26-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Випрямлячі, згладжування, пульсації та обмежувачі»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Rectifiers, Smoothing Filters, Ripple & Clippers'?",
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
            "id": "ee-26-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Випрямлячі, згладжування, пульсації та обмежувачі»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Rectifiers, Smoothing Filters, Ripple & Clippers'?",
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
            "id": "ee-26-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Випрямлячі, згладжування, пульсації та обмежувачі»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Rectifiers, Smoothing Filters, Ripple & Clippers'?",
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
            "id": "ee-26-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 270 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 270 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 135.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 270 = 135.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 270 = 135.0 V."
}),
          createNumeric({
            "id": "ee-26-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 272 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 272 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 136.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 272 = 136.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 272 = 136.0 V."
}),
          createNumeric({
            "id": "ee-26-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 274 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 274 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 137.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 274 = 137.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 274 = 137.0 V."
}),
          createNumeric({
            "id": "ee-26-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 276 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 276 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 138.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 276 = 138.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 276 = 138.0 V."
}),
          createCircuitLab({
            "id": "ee-26-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Випрямлячі, згладжування, пульсації та обмежувачі».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Rectifiers, Smoothing Filters, Ripple & Clippers'.",
            "title": "Exam Lab 26.9: Rectifiers, Smoothing Filters, Ripple & Clippers",
            "netlist": "* Exam Model 26_9\nV1 in 0 DC 12\nR1 in out 35k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 2.667,
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
            "id": "ee-26-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Випрямлячі, згладжування, пульсації та обмежувачі».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Rectifiers, Smoothing Filters, Ripple & Clippers'.",
            "title": "Exam Lab 26.10: Rectifiers, Smoothing Filters, Ripple & Clippers",
            "netlist": "* Exam Model 26_10\nV1 in 0 DC 12\nR1 in out 36k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 2.609,
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
    slug: "ee-27-zeners-linear-reg",
    titleUk: "Стабілітрони, опорна напруга та лінійні стабілізатори",
    titleEn: "Zener Diodes, Voltage References & Linear Regulators",
    lessons: [
      createLesson({
        slug: "ee-27-l1",
        titleUk: "Стабілітрони, опорна напруга та лінійні стабілізатори (Частина 1)",
        titleEn: "Zener Diodes, Voltage References & Linear Regulators (Part 1)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-27-l1-c1",
            "promptUk": "Теоретичні основи: Стабілітрони, опорна напруга та лінійні стабілізатори (Частина 1)",
            "promptEn": "Theoretical Foundations: Zener Diodes, Voltage References & Linear Regulators (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Стабілітрони, опорна напруга та лінійні стабілізатори». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Zener Diodes, Voltage References & Linear Regulators'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-27-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Стабілітрони, опорна напруга та лінійні стабілізатори»?",
            "promptEn": "Which core statement is correct regarding 'Zener Diodes, Voltage References & Linear Regulators'?",
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
            "id": "ee-27-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 96 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 96 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 144.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 96 * 1.5 = 144.0 В.",
            "explanationEn": "Calculation follows direct scaling: 96 * 1.5 = 144.0 V."
}),
          createNumeric({
            "id": "ee-27-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 96 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 96 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.26,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 96 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 96 A."
}),
          createExplain({
            "id": "ee-27-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Стабілітрони, опорна напруга та лінійні стабілізатори»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Zener Diodes, Voltage References & Linear Regulators':",
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
        slug: "ee-27-l2",
        titleUk: "Стабілітрони, опорна напруга та лінійні стабілізатори (Частина 2)",
        titleEn: "Zener Diodes, Voltage References & Linear Regulators (Part 2)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-27-l2-c1",
            "promptUk": "Теоретичні основи: Стабілітрони, опорна напруга та лінійні стабілізатори (Частина 2)",
            "promptEn": "Theoretical Foundations: Zener Diodes, Voltage References & Linear Regulators (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Стабілітрони, опорна напруга та лінійні стабілізатори». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Zener Diodes, Voltage References & Linear Regulators'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-27-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Стабілітрони, опорна напруга та лінійні стабілізатори»?",
            "promptEn": "Which core statement is correct regarding 'Zener Diodes, Voltage References & Linear Regulators'?",
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
            "id": "ee-27-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 101 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 101 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 151.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 101 * 1.5 = 151.5 В.",
            "explanationEn": "Calculation follows direct scaling: 101 * 1.5 = 151.5 V."
}),
          createNumeric({
            "id": "ee-27-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 101 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 101 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.248,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 101 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 101 A."
}),
          createExplain({
            "id": "ee-27-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Стабілітрони, опорна напруга та лінійні стабілізатори»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Zener Diodes, Voltage References & Linear Regulators':",
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
        slug: "ee-27-l3",
        titleUk: "Стабілітрони, опорна напруга та лінійні стабілізатори (Частина 3)",
        titleEn: "Zener Diodes, Voltage References & Linear Regulators (Part 3)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-27-l3-c1",
            "promptUk": "Теоретичні основи: Стабілітрони, опорна напруга та лінійні стабілізатори (Частина 3)",
            "promptEn": "Theoretical Foundations: Zener Diodes, Voltage References & Linear Regulators (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Стабілітрони, опорна напруга та лінійні стабілізатори». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Zener Diodes, Voltage References & Linear Regulators'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-27-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Стабілітрони, опорна напруга та лінійні стабілізатори»?",
            "promptEn": "Which core statement is correct regarding 'Zener Diodes, Voltage References & Linear Regulators'?",
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
            "id": "ee-27-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 106 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 106 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 159.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 106 * 1.5 = 159.0 В.",
            "explanationEn": "Calculation follows direct scaling: 106 * 1.5 = 159.0 V."
}),
          createNumeric({
            "id": "ee-27-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 106 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 106 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.236,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 106 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 106 A."
}),
          createExplain({
            "id": "ee-27-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Стабілітрони, опорна напруга та лінійні стабілізатори»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Zener Diodes, Voltage References & Linear Regulators':",
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
        slug: "ee-27-l4",
        titleUk: "Стабілітрони, опорна напруга та лінійні стабілізатори (Частина 4)",
        titleEn: "Zener Diodes, Voltage References & Linear Regulators (Part 4)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-27-l4-c1",
            "promptUk": "Теоретичні основи: Стабілітрони, опорна напруга та лінійні стабілізатори (Частина 4)",
            "promptEn": "Theoretical Foundations: Zener Diodes, Voltage References & Linear Regulators (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Стабілітрони, опорна напруга та лінійні стабілізатори». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Zener Diodes, Voltage References & Linear Regulators'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-27-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Стабілітрони, опорна напруга та лінійні стабілізатори»?",
            "promptEn": "Which core statement is correct regarding 'Zener Diodes, Voltage References & Linear Regulators'?",
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
            "id": "ee-27-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 11 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 11 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 16.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 11 * 1.5 = 16.5 В.",
            "explanationEn": "Calculation follows direct scaling: 11 * 1.5 = 16.5 V."
}),
          createCircuitLab({
            "id": "ee-27-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Стабілітрони, опорна напруга та лінійні стабілізатори». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Zener Diodes, Voltage References & Linear Regulators'. Run simulation and verify nodes.",
            "title": "Lab 27.4: Zener Diodes, Voltage References & Linear Regulators",
            "netlist": "* EduForge SPICE Model for Unit 27\nV1 in 0 DC 10\nR1 in out 11k\nR2 out 0 38k\n.tran 10u 2m\n.end",
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
                                    "target": 7.755,
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
            "id": "ee-27-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Стабілітрони, опорна напруга та лінійні стабілізатори»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Zener Diodes, Voltage References & Linear Regulators':",
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
        slug: "ee-27-l5",
        titleUk: "Стабілітрони, опорна напруга та лінійні стабілізатори (Частина 5)",
        titleEn: "Zener Diodes, Voltage References & Linear Regulators (Part 5)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-27-l5-c1",
            "promptUk": "Теоретичні основи: Стабілітрони, опорна напруга та лінійні стабілізатори (Частина 5)",
            "promptEn": "Theoretical Foundations: Zener Diodes, Voltage References & Linear Regulators (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Стабілітрони, опорна напруга та лінійні стабілізатори». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Zener Diodes, Voltage References & Linear Regulators'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-27-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Стабілітрони, опорна напруга та лінійні стабілізатори»?",
            "promptEn": "Which core statement is correct regarding 'Zener Diodes, Voltage References & Linear Regulators'?",
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
            "id": "ee-27-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 16 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 16 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 24.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 16 * 1.5 = 24.0 В.",
            "explanationEn": "Calculation follows direct scaling: 16 * 1.5 = 24.0 V."
}),
          createCircuitLab({
            "id": "ee-27-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Стабілітрони, опорна напруга та лінійні стабілізатори». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Zener Diodes, Voltage References & Linear Regulators'. Run simulation and verify nodes.",
            "title": "Lab 27.5: Zener Diodes, Voltage References & Linear Regulators",
            "netlist": "* EduForge SPICE Model for Unit 27\nV1 in 0 DC 10\nR1 in out 16k\nR2 out 0 49k\n.tran 10u 2m\n.end",
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
                                    "target": 7.538,
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
            "id": "ee-27-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Стабілітрони, опорна напруга та лінійні стабілізатори»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Zener Diodes, Voltage References & Linear Regulators':",
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
        slug: "ee-27-exam",
        titleUk: "Екзамен: Стабілітрони, опорна напруга та лінійні стабілізатори",
        titleEn: "Exam: Zener Diodes, Voltage References & Linear Regulators",
        difficulty: 3,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-27-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Стабілітрони, опорна напруга та лінійні стабілізатори»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Zener Diodes, Voltage References & Linear Regulators'?",
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
            "id": "ee-27-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Стабілітрони, опорна напруга та лінійні стабілізатори»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Zener Diodes, Voltage References & Linear Regulators'?",
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
            "id": "ee-27-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Стабілітрони, опорна напруга та лінійні стабілізатори»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Zener Diodes, Voltage References & Linear Regulators'?",
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
            "id": "ee-27-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Стабілітрони, опорна напруга та лінійні стабілізатори»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Zener Diodes, Voltage References & Linear Regulators'?",
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
            "id": "ee-27-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 280 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 280 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 140.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 280 = 140.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 280 = 140.0 V."
}),
          createNumeric({
            "id": "ee-27-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 282 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 282 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 141.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 282 = 141.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 282 = 141.0 V."
}),
          createNumeric({
            "id": "ee-27-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 284 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 284 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 142.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 284 = 142.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 284 = 142.0 V."
}),
          createNumeric({
            "id": "ee-27-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 286 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 286 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 143.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 286 = 143.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 286 = 143.0 V."
}),
          createCircuitLab({
            "id": "ee-27-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Стабілітрони, опорна напруга та лінійні стабілізатори».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Zener Diodes, Voltage References & Linear Regulators'.",
            "title": "Exam Lab 27.9: Zener Diodes, Voltage References & Linear Regulators",
            "netlist": "* Exam Model 27_9\nV1 in 0 DC 12\nR1 in out 36k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 2.609,
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
            "id": "ee-27-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Стабілітрони, опорна напруга та лінійні стабілізатори».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Zener Diodes, Voltage References & Linear Regulators'.",
            "title": "Exam Lab 27.10: Zener Diodes, Voltage References & Linear Regulators",
            "netlist": "* Exam Model 27_10\nV1 in 0 DC 12\nR1 in out 37k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 2.553,
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
    slug: "ee-28-bjt-circuits",
    titleUk: "BJT: режими, зміщення, ключ і підсилювач",
    titleEn: "BJT: Operating Regions, Biasing, Switch & Amplifier",
    lessons: [
      createLesson({
        slug: "ee-28-l1",
        titleUk: "BJT: режими, зміщення, ключ і підсилювач (Частина 1)",
        titleEn: "BJT: Operating Regions, Biasing, Switch & Amplifier (Part 1)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-28-l1-c1",
            "promptUk": "Теоретичні основи: BJT: режими, зміщення, ключ і підсилювач (Частина 1)",
            "promptEn": "Theoretical Foundations: BJT: Operating Regions, Biasing, Switch & Amplifier (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «BJT: режими, зміщення, ключ і підсилювач». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'BJT: Operating Regions, Biasing, Switch & Amplifier'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-28-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «BJT: режими, зміщення, ключ і підсилювач»?",
            "promptEn": "Which core statement is correct regarding 'BJT: Operating Regions, Biasing, Switch & Amplifier'?",
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
            "id": "ee-28-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 99 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 99 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 148.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 99 * 1.5 = 148.5 В.",
            "explanationEn": "Calculation follows direct scaling: 99 * 1.5 = 148.5 V."
}),
          createNumeric({
            "id": "ee-28-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 99 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 99 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.253,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 99 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 99 A."
}),
          createExplain({
            "id": "ee-28-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «BJT: режими, зміщення, ключ і підсилювач»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'BJT: Operating Regions, Biasing, Switch & Amplifier':",
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
        slug: "ee-28-l2",
        titleUk: "BJT: режими, зміщення, ключ і підсилювач (Частина 2)",
        titleEn: "BJT: Operating Regions, Biasing, Switch & Amplifier (Part 2)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-28-l2-c1",
            "promptUk": "Теоретичні основи: BJT: режими, зміщення, ключ і підсилювач (Частина 2)",
            "promptEn": "Theoretical Foundations: BJT: Operating Regions, Biasing, Switch & Amplifier (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «BJT: режими, зміщення, ключ і підсилювач». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'BJT: Operating Regions, Biasing, Switch & Amplifier'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-28-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «BJT: режими, зміщення, ключ і підсилювач»?",
            "promptEn": "Which core statement is correct regarding 'BJT: Operating Regions, Biasing, Switch & Amplifier'?",
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
            "id": "ee-28-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 104 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 104 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 156.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 104 * 1.5 = 156.0 В.",
            "explanationEn": "Calculation follows direct scaling: 104 * 1.5 = 156.0 V."
}),
          createNumeric({
            "id": "ee-28-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 104 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 104 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.24,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 104 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 104 A."
}),
          createExplain({
            "id": "ee-28-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «BJT: режими, зміщення, ключ і підсилювач»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'BJT: Operating Regions, Biasing, Switch & Amplifier':",
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
        slug: "ee-28-l3",
        titleUk: "BJT: режими, зміщення, ключ і підсилювач (Частина 3)",
        titleEn: "BJT: Operating Regions, Biasing, Switch & Amplifier (Part 3)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-28-l3-c1",
            "promptUk": "Теоретичні основи: BJT: режими, зміщення, ключ і підсилювач (Частина 3)",
            "promptEn": "Theoretical Foundations: BJT: Operating Regions, Biasing, Switch & Amplifier (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «BJT: режими, зміщення, ключ і підсилювач». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'BJT: Operating Regions, Biasing, Switch & Amplifier'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-28-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «BJT: режими, зміщення, ключ і підсилювач»?",
            "promptEn": "Which core statement is correct regarding 'BJT: Operating Regions, Biasing, Switch & Amplifier'?",
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
            "id": "ee-28-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 109 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 109 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 163.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 109 * 1.5 = 163.5 В.",
            "explanationEn": "Calculation follows direct scaling: 109 * 1.5 = 163.5 V."
}),
          createNumeric({
            "id": "ee-28-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 109 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 109 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.229,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 109 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 109 A."
}),
          createExplain({
            "id": "ee-28-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «BJT: режими, зміщення, ключ і підсилювач»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'BJT: Operating Regions, Biasing, Switch & Amplifier':",
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
        slug: "ee-28-l4",
        titleUk: "BJT: режими, зміщення, ключ і підсилювач (Частина 4)",
        titleEn: "BJT: Operating Regions, Biasing, Switch & Amplifier (Part 4)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-28-l4-c1",
            "promptUk": "Теоретичні основи: BJT: режими, зміщення, ключ і підсилювач (Частина 4)",
            "promptEn": "Theoretical Foundations: BJT: Operating Regions, Biasing, Switch & Amplifier (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «BJT: режими, зміщення, ключ і підсилювач». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'BJT: Operating Regions, Biasing, Switch & Amplifier'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-28-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «BJT: режими, зміщення, ключ і підсилювач»?",
            "promptEn": "Which core statement is correct regarding 'BJT: Operating Regions, Biasing, Switch & Amplifier'?",
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
            "id": "ee-28-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 14 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 14 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 21.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 14 * 1.5 = 21.0 В.",
            "explanationEn": "Calculation follows direct scaling: 14 * 1.5 = 21.0 V."
}),
          createCircuitLab({
            "id": "ee-28-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «BJT: режими, зміщення, ключ і підсилювач». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'BJT: Operating Regions, Biasing, Switch & Amplifier'. Run simulation and verify nodes.",
            "title": "Lab 28.4: BJT: Operating Regions, Biasing, Switch & Amplifier",
            "netlist": "* EduForge SPICE Model for Unit 28\nV1 in 0 DC 10\nR1 in out 14k\nR2 out 0 45k\n.tran 10u 2m\n.end",
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
                                    "target": 7.627,
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
            "id": "ee-28-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «BJT: режими, зміщення, ключ і підсилювач»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'BJT: Operating Regions, Biasing, Switch & Amplifier':",
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
        slug: "ee-28-l5",
        titleUk: "BJT: режими, зміщення, ключ і підсилювач (Частина 5)",
        titleEn: "BJT: Operating Regions, Biasing, Switch & Amplifier (Part 5)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-28-l5-c1",
            "promptUk": "Теоретичні основи: BJT: режими, зміщення, ключ і підсилювач (Частина 5)",
            "promptEn": "Theoretical Foundations: BJT: Operating Regions, Biasing, Switch & Amplifier (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «BJT: режими, зміщення, ключ і підсилювач». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'BJT: Operating Regions, Biasing, Switch & Amplifier'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-28-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «BJT: режими, зміщення, ключ і підсилювач»?",
            "promptEn": "Which core statement is correct regarding 'BJT: Operating Regions, Biasing, Switch & Amplifier'?",
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
            "id": "ee-28-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 19 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 19 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 28.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 19 * 1.5 = 28.5 В.",
            "explanationEn": "Calculation follows direct scaling: 19 * 1.5 = 28.5 V."
}),
          createCircuitLab({
            "id": "ee-28-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «BJT: режими, зміщення, ключ і підсилювач». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'BJT: Operating Regions, Biasing, Switch & Amplifier'. Run simulation and verify nodes.",
            "title": "Lab 28.5: BJT: Operating Regions, Biasing, Switch & Amplifier",
            "netlist": "* EduForge SPICE Model for Unit 28\nV1 in 0 DC 10\nR1 in out 19k\nR2 out 0 6k\n.tran 10u 2m\n.end",
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
                                    "target": 2.4,
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
            "id": "ee-28-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «BJT: режими, зміщення, ключ і підсилювач»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'BJT: Operating Regions, Biasing, Switch & Amplifier':",
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
        slug: "ee-28-exam",
        titleUk: "Екзамен: BJT: режими, зміщення, ключ і підсилювач",
        titleEn: "Exam: BJT: Operating Regions, Biasing, Switch & Amplifier",
        difficulty: 3,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-28-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «BJT: режими, зміщення, ключ і підсилювач»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'BJT: Operating Regions, Biasing, Switch & Amplifier'?",
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
            "id": "ee-28-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «BJT: режими, зміщення, ключ і підсилювач»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'BJT: Operating Regions, Biasing, Switch & Amplifier'?",
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
            "id": "ee-28-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «BJT: режими, зміщення, ключ і підсилювач»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'BJT: Operating Regions, Biasing, Switch & Amplifier'?",
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
            "id": "ee-28-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «BJT: режими, зміщення, ключ і підсилювач»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'BJT: Operating Regions, Biasing, Switch & Amplifier'?",
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
            "id": "ee-28-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 290 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 290 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 145.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 290 = 145.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 290 = 145.0 V."
}),
          createNumeric({
            "id": "ee-28-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 292 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 292 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 146.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 292 = 146.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 292 = 146.0 V."
}),
          createNumeric({
            "id": "ee-28-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 294 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 294 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 147.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 294 = 147.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 294 = 147.0 V."
}),
          createNumeric({
            "id": "ee-28-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 296 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 296 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 148.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 296 = 148.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 296 = 148.0 V."
}),
          createCircuitLab({
            "id": "ee-28-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «BJT: режими, зміщення, ключ і підсилювач».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'BJT: Operating Regions, Biasing, Switch & Amplifier'.",
            "title": "Exam Lab 28.9: BJT: Operating Regions, Biasing, Switch & Amplifier",
            "netlist": "* Exam Model 28_9\nV1 in 0 DC 12\nR1 in out 37k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 2.553,
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
            "id": "ee-28-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «BJT: режими, зміщення, ключ і підсилювач».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'BJT: Operating Regions, Biasing, Switch & Amplifier'.",
            "title": "Exam Lab 28.10: BJT: Operating Regions, Biasing, Switch & Amplifier",
            "netlist": "* Exam Model 28_10\nV1 in 0 DC 12\nR1 in out 38k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 2.5,
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
    slug: "ee-29-mosfet-switches",
    titleUk: "MOSFET: режими, керування затвором і динамічні втрати",
    titleEn: "MOSFET: Modes, Gate Driving & Switching Losses",
    lessons: [
      createLesson({
        slug: "ee-29-l1",
        titleUk: "MOSFET: режими, керування затвором і динамічні втрати (Частина 1)",
        titleEn: "MOSFET: Modes, Gate Driving & Switching Losses (Part 1)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-29-l1-c1",
            "promptUk": "Теоретичні основи: MOSFET: режими, керування затвором і динамічні втрати (Частина 1)",
            "promptEn": "Theoretical Foundations: MOSFET: Modes, Gate Driving & Switching Losses (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «MOSFET: режими, керування затвором і динамічні втрати». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'MOSFET: Modes, Gate Driving & Switching Losses'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-29-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «MOSFET: режими, керування затвором і динамічні втрати»?",
            "promptEn": "Which core statement is correct regarding 'MOSFET: Modes, Gate Driving & Switching Losses'?",
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
            "id": "ee-29-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 102 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 102 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 153.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 102 * 1.5 = 153.0 В.",
            "explanationEn": "Calculation follows direct scaling: 102 * 1.5 = 153.0 V."
}),
          createNumeric({
            "id": "ee-29-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 102 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 102 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.245,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 102 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 102 A."
}),
          createExplain({
            "id": "ee-29-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «MOSFET: режими, керування затвором і динамічні втрати»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'MOSFET: Modes, Gate Driving & Switching Losses':",
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
        slug: "ee-29-l2",
        titleUk: "MOSFET: режими, керування затвором і динамічні втрати (Частина 2)",
        titleEn: "MOSFET: Modes, Gate Driving & Switching Losses (Part 2)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-29-l2-c1",
            "promptUk": "Теоретичні основи: MOSFET: режими, керування затвором і динамічні втрати (Частина 2)",
            "promptEn": "Theoretical Foundations: MOSFET: Modes, Gate Driving & Switching Losses (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «MOSFET: режими, керування затвором і динамічні втрати». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'MOSFET: Modes, Gate Driving & Switching Losses'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-29-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «MOSFET: режими, керування затвором і динамічні втрати»?",
            "promptEn": "Which core statement is correct regarding 'MOSFET: Modes, Gate Driving & Switching Losses'?",
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
            "id": "ee-29-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 107 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 107 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 160.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 107 * 1.5 = 160.5 В.",
            "explanationEn": "Calculation follows direct scaling: 107 * 1.5 = 160.5 V."
}),
          createNumeric({
            "id": "ee-29-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 107 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 107 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.234,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 107 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 107 A."
}),
          createExplain({
            "id": "ee-29-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «MOSFET: режими, керування затвором і динамічні втрати»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'MOSFET: Modes, Gate Driving & Switching Losses':",
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
        slug: "ee-29-l3",
        titleUk: "MOSFET: режими, керування затвором і динамічні втрати (Частина 3)",
        titleEn: "MOSFET: Modes, Gate Driving & Switching Losses (Part 3)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-29-l3-c1",
            "promptUk": "Теоретичні основи: MOSFET: режими, керування затвором і динамічні втрати (Частина 3)",
            "promptEn": "Theoretical Foundations: MOSFET: Modes, Gate Driving & Switching Losses (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «MOSFET: режими, керування затвором і динамічні втрати». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'MOSFET: Modes, Gate Driving & Switching Losses'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-29-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «MOSFET: режими, керування затвором і динамічні втрати»?",
            "promptEn": "Which core statement is correct regarding 'MOSFET: Modes, Gate Driving & Switching Losses'?",
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
            "id": "ee-29-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 12 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 12 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 18.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 12 * 1.5 = 18.0 В.",
            "explanationEn": "Calculation follows direct scaling: 12 * 1.5 = 18.0 V."
}),
          createNumeric({
            "id": "ee-29-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 12 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 12 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 2.083,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 12 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 12 A."
}),
          createExplain({
            "id": "ee-29-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «MOSFET: режими, керування затвором і динамічні втрати»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'MOSFET: Modes, Gate Driving & Switching Losses':",
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
        slug: "ee-29-l4",
        titleUk: "MOSFET: режими, керування затвором і динамічні втрати (Частина 4)",
        titleEn: "MOSFET: Modes, Gate Driving & Switching Losses (Part 4)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-29-l4-c1",
            "promptUk": "Теоретичні основи: MOSFET: режими, керування затвором і динамічні втрати (Частина 4)",
            "promptEn": "Theoretical Foundations: MOSFET: Modes, Gate Driving & Switching Losses (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «MOSFET: режими, керування затвором і динамічні втрати». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'MOSFET: Modes, Gate Driving & Switching Losses'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-29-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «MOSFET: режими, керування затвором і динамічні втрати»?",
            "promptEn": "Which core statement is correct regarding 'MOSFET: Modes, Gate Driving & Switching Losses'?",
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
            "id": "ee-29-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 17 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 17 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 25.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 17 * 1.5 = 25.5 В.",
            "explanationEn": "Calculation follows direct scaling: 17 * 1.5 = 25.5 V."
}),
          createCircuitLab({
            "id": "ee-29-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «MOSFET: режими, керування затвором і динамічні втрати». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'MOSFET: Modes, Gate Driving & Switching Losses'. Run simulation and verify nodes.",
            "title": "Lab 29.4: MOSFET: Modes, Gate Driving & Switching Losses",
            "netlist": "* EduForge SPICE Model for Unit 29\nV1 in 0 DC 10\nR1 in out 17k\nR2 out 0 52k\n.tran 10u 2m\n.end",
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
                                    "target": 7.536,
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
            "id": "ee-29-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «MOSFET: режими, керування затвором і динамічні втрати»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'MOSFET: Modes, Gate Driving & Switching Losses':",
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
        slug: "ee-29-l5",
        titleUk: "MOSFET: режими, керування затвором і динамічні втрати (Частина 5)",
        titleEn: "MOSFET: Modes, Gate Driving & Switching Losses (Part 5)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-29-l5-c1",
            "promptUk": "Теоретичні основи: MOSFET: режими, керування затвором і динамічні втрати (Частина 5)",
            "promptEn": "Theoretical Foundations: MOSFET: Modes, Gate Driving & Switching Losses (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «MOSFET: режими, керування затвором і динамічні втрати». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'MOSFET: Modes, Gate Driving & Switching Losses'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-29-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «MOSFET: режими, керування затвором і динамічні втрати»?",
            "promptEn": "Which core statement is correct regarding 'MOSFET: Modes, Gate Driving & Switching Losses'?",
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
            "id": "ee-29-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 22 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 22 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 33.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 22 * 1.5 = 33.0 В.",
            "explanationEn": "Calculation follows direct scaling: 22 * 1.5 = 33.0 V."
}),
          createCircuitLab({
            "id": "ee-29-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «MOSFET: режими, керування затвором і динамічні втрати». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'MOSFET: Modes, Gate Driving & Switching Losses'. Run simulation and verify nodes.",
            "title": "Lab 29.5: MOSFET: Modes, Gate Driving & Switching Losses",
            "netlist": "* EduForge SPICE Model for Unit 29\nV1 in 0 DC 10\nR1 in out 22k\nR2 out 0 13k\n.tran 10u 2m\n.end",
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
                                    "target": 3.714,
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
            "id": "ee-29-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «MOSFET: режими, керування затвором і динамічні втрати»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'MOSFET: Modes, Gate Driving & Switching Losses':",
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
        slug: "ee-29-exam",
        titleUk: "Екзамен: MOSFET: режими, керування затвором і динамічні втрати",
        titleEn: "Exam: MOSFET: Modes, Gate Driving & Switching Losses",
        difficulty: 3,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-29-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «MOSFET: режими, керування затвором і динамічні втрати»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'MOSFET: Modes, Gate Driving & Switching Losses'?",
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
            "id": "ee-29-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «MOSFET: режими, керування затвором і динамічні втрати»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'MOSFET: Modes, Gate Driving & Switching Losses'?",
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
            "id": "ee-29-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «MOSFET: режими, керування затвором і динамічні втрати»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'MOSFET: Modes, Gate Driving & Switching Losses'?",
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
            "id": "ee-29-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «MOSFET: режими, керування затвором і динамічні втрати»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'MOSFET: Modes, Gate Driving & Switching Losses'?",
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
            "id": "ee-29-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 300 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 300 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 150.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 300 = 150.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 300 = 150.0 V."
}),
          createNumeric({
            "id": "ee-29-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 302 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 302 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 151.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 302 = 151.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 302 = 151.0 V."
}),
          createNumeric({
            "id": "ee-29-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 304 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 304 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 152.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 304 = 152.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 304 = 152.0 V."
}),
          createNumeric({
            "id": "ee-29-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 306 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 306 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 153.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 306 = 153.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 306 = 153.0 V."
}),
          createCircuitLab({
            "id": "ee-29-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «MOSFET: режими, керування затвором і динамічні втрати».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'MOSFET: Modes, Gate Driving & Switching Losses'.",
            "title": "Exam Lab 29.9: MOSFET: Modes, Gate Driving & Switching Losses",
            "netlist": "* Exam Model 29_9\nV1 in 0 DC 12\nR1 in out 38k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 2.5,
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
            "id": "ee-29-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «MOSFET: режими, керування затвором і динамічні втрати».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'MOSFET: Modes, Gate Driving & Switching Losses'.",
            "title": "Exam Lab 29.10: MOSFET: Modes, Gate Driving & Switching Losses",
            "netlist": "* Exam Model 29_10\nV1 in 0 DC 12\nR1 in out 39k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 2.449,
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
    slug: "ee-30-opamp-foundations",
    titleUk: "Операційні підсилювачі, негативний зворотний зв'язок і базові схеми",
    titleEn: "Operational Amplifiers, Negative Feedback & Core Topologies",
    lessons: [
      createLesson({
        slug: "ee-30-l1",
        titleUk: "Операційні підсилювачі, негативний зворотний зв'язок і базові схеми (Частина 1)",
        titleEn: "Operational Amplifiers, Negative Feedback & Core Topologies (Part 1)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-30-l1-c1",
            "promptUk": "Теоретичні основи: Операційні підсилювачі, негативний зворотний зв'язок і базові схеми (Частина 1)",
            "promptEn": "Theoretical Foundations: Operational Amplifiers, Negative Feedback & Core Topologies (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Операційні підсилювачі, негативний зворотний зв'язок і базові схеми». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Operational Amplifiers, Negative Feedback & Core Topologies'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-30-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Операційні підсилювачі, негативний зворотний зв'язок і базові схеми»?",
            "promptEn": "Which core statement is correct regarding 'Operational Amplifiers, Negative Feedback & Core Topologies'?",
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
            "id": "ee-30-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 105 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 105 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 157.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 105 * 1.5 = 157.5 В.",
            "explanationEn": "Calculation follows direct scaling: 105 * 1.5 = 157.5 V."
}),
          createNumeric({
            "id": "ee-30-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 105 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 105 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.238,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 105 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 105 A."
}),
          createExplain({
            "id": "ee-30-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Операційні підсилювачі, негативний зворотний зв'язок і базові схеми»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Operational Amplifiers, Negative Feedback & Core Topologies':",
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
        slug: "ee-30-l2",
        titleUk: "Операційні підсилювачі, негативний зворотний зв'язок і базові схеми (Частина 2)",
        titleEn: "Operational Amplifiers, Negative Feedback & Core Topologies (Part 2)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-30-l2-c1",
            "promptUk": "Теоретичні основи: Операційні підсилювачі, негативний зворотний зв'язок і базові схеми (Частина 2)",
            "promptEn": "Theoretical Foundations: Operational Amplifiers, Negative Feedback & Core Topologies (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Операційні підсилювачі, негативний зворотний зв'язок і базові схеми». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Operational Amplifiers, Negative Feedback & Core Topologies'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-30-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Операційні підсилювачі, негативний зворотний зв'язок і базові схеми»?",
            "promptEn": "Which core statement is correct regarding 'Operational Amplifiers, Negative Feedback & Core Topologies'?",
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
            "id": "ee-30-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 10 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 10 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 15.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 10 * 1.5 = 15.0 В.",
            "explanationEn": "Calculation follows direct scaling: 10 * 1.5 = 15.0 V."
}),
          createNumeric({
            "id": "ee-30-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 10 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 10 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 2.5,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 10 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 10 A."
}),
          createExplain({
            "id": "ee-30-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Операційні підсилювачі, негативний зворотний зв'язок і базові схеми»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Operational Amplifiers, Negative Feedback & Core Topologies':",
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
        slug: "ee-30-l3",
        titleUk: "Операційні підсилювачі, негативний зворотний зв'язок і базові схеми (Частина 3)",
        titleEn: "Operational Amplifiers, Negative Feedback & Core Topologies (Part 3)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-30-l3-c1",
            "promptUk": "Теоретичні основи: Операційні підсилювачі, негативний зворотний зв'язок і базові схеми (Частина 3)",
            "promptEn": "Theoretical Foundations: Operational Amplifiers, Negative Feedback & Core Topologies (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Операційні підсилювачі, негативний зворотний зв'язок і базові схеми». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Operational Amplifiers, Negative Feedback & Core Topologies'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-30-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Операційні підсилювачі, негативний зворотний зв'язок і базові схеми»?",
            "promptEn": "Which core statement is correct regarding 'Operational Amplifiers, Negative Feedback & Core Topologies'?",
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
            "id": "ee-30-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 15 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 15 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 22.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 15 * 1.5 = 22.5 В.",
            "explanationEn": "Calculation follows direct scaling: 15 * 1.5 = 22.5 V."
}),
          createNumeric({
            "id": "ee-30-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 15 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 15 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 1.667,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 15 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 15 A."
}),
          createExplain({
            "id": "ee-30-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Операційні підсилювачі, негативний зворотний зв'язок і базові схеми»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Operational Amplifiers, Negative Feedback & Core Topologies':",
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
        slug: "ee-30-l4",
        titleUk: "Операційні підсилювачі, негативний зворотний зв'язок і базові схеми (Частина 4)",
        titleEn: "Operational Amplifiers, Negative Feedback & Core Topologies (Part 4)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-30-l4-c1",
            "promptUk": "Теоретичні основи: Операційні підсилювачі, негативний зворотний зв'язок і базові схеми (Частина 4)",
            "promptEn": "Theoretical Foundations: Operational Amplifiers, Negative Feedback & Core Topologies (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Операційні підсилювачі, негативний зворотний зв'язок і базові схеми». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Operational Amplifiers, Negative Feedback & Core Topologies'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-30-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Операційні підсилювачі, негативний зворотний зв'язок і базові схеми»?",
            "promptEn": "Which core statement is correct regarding 'Operational Amplifiers, Negative Feedback & Core Topologies'?",
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
            "id": "ee-30-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 20 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 20 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 30.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 20 * 1.5 = 30.0 В.",
            "explanationEn": "Calculation follows direct scaling: 20 * 1.5 = 30.0 V."
}),
          createCircuitLab({
            "id": "ee-30-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Операційні підсилювачі, негативний зворотний зв'язок і базові схеми». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Operational Amplifiers, Negative Feedback & Core Topologies'. Run simulation and verify nodes.",
            "title": "Lab 30.4: Operational Amplifiers, Negative Feedback & Core Topologies",
            "netlist": "* EduForge SPICE Model for Unit 30\nV1 in 0 DC 10\nR1 in out 20k\nR2 out 0 9k\n.tran 10u 2m\n.end",
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
                                    "target": 3.103,
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
            "id": "ee-30-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Операційні підсилювачі, негативний зворотний зв'язок і базові схеми»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Operational Amplifiers, Negative Feedback & Core Topologies':",
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
        slug: "ee-30-l5",
        titleUk: "Операційні підсилювачі, негативний зворотний зв'язок і базові схеми (Частина 5)",
        titleEn: "Operational Amplifiers, Negative Feedback & Core Topologies (Part 5)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-30-l5-c1",
            "promptUk": "Теоретичні основи: Операційні підсилювачі, негативний зворотний зв'язок і базові схеми (Частина 5)",
            "promptEn": "Theoretical Foundations: Operational Amplifiers, Negative Feedback & Core Topologies (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Операційні підсилювачі, негативний зворотний зв'язок і базові схеми». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Operational Amplifiers, Negative Feedback & Core Topologies'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-30-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Операційні підсилювачі, негативний зворотний зв'язок і базові схеми»?",
            "promptEn": "Which core statement is correct regarding 'Operational Amplifiers, Negative Feedback & Core Topologies'?",
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
            "id": "ee-30-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 25 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 25 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 37.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 25 * 1.5 = 37.5 В.",
            "explanationEn": "Calculation follows direct scaling: 25 * 1.5 = 37.5 V."
}),
          createCircuitLab({
            "id": "ee-30-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Операційні підсилювачі, негативний зворотний зв'язок і базові схеми». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Operational Amplifiers, Negative Feedback & Core Topologies'. Run simulation and verify nodes.",
            "title": "Lab 30.5: Operational Amplifiers, Negative Feedback & Core Topologies",
            "netlist": "* EduForge SPICE Model for Unit 30\nV1 in 0 DC 10\nR1 in out 25k\nR2 out 0 20k\n.tran 10u 2m\n.end",
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
                                    "target": 4.444,
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
            "id": "ee-30-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Операційні підсилювачі, негативний зворотний зв'язок і базові схеми»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Operational Amplifiers, Negative Feedback & Core Topologies':",
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
        slug: "ee-30-exam",
        titleUk: "Екзамен: Операційні підсилювачі, негативний зворотний зв'язок і базові схеми",
        titleEn: "Exam: Operational Amplifiers, Negative Feedback & Core Topologies",
        difficulty: 3,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-30-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Операційні підсилювачі, негативний зворотний зв'язок і базові схеми»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Operational Amplifiers, Negative Feedback & Core Topologies'?",
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
            "id": "ee-30-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Операційні підсилювачі, негативний зворотний зв'язок і базові схеми»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Operational Amplifiers, Negative Feedback & Core Topologies'?",
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
            "id": "ee-30-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Операційні підсилювачі, негативний зворотний зв'язок і базові схеми»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Operational Amplifiers, Negative Feedback & Core Topologies'?",
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
            "id": "ee-30-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Операційні підсилювачі, негативний зворотний зв'язок і базові схеми»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Operational Amplifiers, Negative Feedback & Core Topologies'?",
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
            "id": "ee-30-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 310 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 310 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 155.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 310 = 155.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 310 = 155.0 V."
}),
          createNumeric({
            "id": "ee-30-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 312 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 312 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 156.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 312 = 156.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 312 = 156.0 V."
}),
          createNumeric({
            "id": "ee-30-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 314 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 314 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 157.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 314 = 157.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 314 = 157.0 V."
}),
          createNumeric({
            "id": "ee-30-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 316 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 316 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 158.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 316 = 158.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 316 = 158.0 V."
}),
          createCircuitLab({
            "id": "ee-30-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Операційні підсилювачі, негативний зворотний зв'язок і базові схеми».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Operational Amplifiers, Negative Feedback & Core Topologies'.",
            "title": "Exam Lab 30.9: Operational Amplifiers, Negative Feedback & Core Topologies",
            "netlist": "* Exam Model 30_9\nV1 in 0 DC 12\nR1 in out 39k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 2.449,
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
            "id": "ee-30-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Операційні підсилювачі, негативний зворотний зв'язок і базові схеми».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Operational Amplifiers, Negative Feedback & Core Topologies'.",
            "title": "Exam Lab 30.10: Operational Amplifiers, Negative Feedback & Core Topologies",
            "netlist": "* Exam Model 30_10\nV1 in 0 DC 12\nR1 in out 40k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 2.4,
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