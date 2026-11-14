import type { CourseContent } from "../types.js";
import { stage1Units } from "./stage1.js";
import { stage2Units } from "./stage2.js";
import { stage3Units } from "./stage3.js";
import { stage4Units } from "./stage4.js";
import { stage5Units } from "./stage5.js";
import { stage6Units } from "./stage6.js";
import { stage7Units } from "./stage7.js";
import { stage8Units } from "./stage8.js";
import { stage9Units } from "./stage9.js";
import { stage10Units } from "./stage10.js";

/**
 * Complete Electrical Engineering Course for EduForge
 * 10 Stages, 60 Units, 360 Lessons
 */
export const electricalEngineeringContent: CourseContent = {
  slug: "electrical_engineering",
  titleUk: "Електротехніка",
  titleEn: "Electrical Engineering",
  descriptionUk:
    "Від природи заряду, законів Ома і Кірхгофа до SPICE-симуляцій, напівпровідників, силових пристроїв та електроприводу.",
  descriptionEn:
    "From charge physics, Ohm and Kirchhoff laws to SPICE simulation, semiconductors, power electronics, and electrical machines.",
  icon: "⚡",
  color: "#EAB308",
  units: [
    ...stage1Units,
    ...stage2Units,
    ...stage3Units,
    ...stage4Units,
    ...stage5Units,
    ...stage6Units,
    ...stage7Units,
    ...stage8Units,
    ...stage9Units,
    ...stage10Units,
  ],
};