import type { CourseContent } from "../types.js";
import { awsSurvival } from "./aws-survival.js";
import { bashUnit } from "./bash.js";
import { ci } from "./ci.js";
import { containers } from "./containers.js";
import { devsecopsGitops } from "./devsecops-gitops.js";
import { gitWorkstation } from "./git-workstation.js";
import { iac } from "./iac.js";
import { kubernetes } from "./kubernetes.js";
import { linuxBase } from "./linux-base.js";
import { networks } from "./networks.js";
import { observability } from "./observability.js";
import { pythonOps } from "./python-ops.js";
import { sreCapstone } from "./sre-capstone.js";

export const devopsContent: CourseContent = {
  slug: "devops",
  titleUk: "DevOps",
  titleEn: "DevOps",
  descriptionUk:
    "Один сервіс forge-status: Git, Linux, bash, мережа, Python, контейнери, AWS до Terraform, CI до образу, Kubernetes, спостережність, GitOps і бюджет помилок.",
  descriptionEn:
    "One service, forge-status: Git, Linux, bash, the network, Python, containers, AWS before Terraform, CI through the image, Kubernetes, observability, GitOps, and an error budget.",
  icon: "🚀",
  color: "#7C3AED",
  units: [
    gitWorkstation,
    linuxBase,
    bashUnit,
    networks,
    pythonOps,
    containers,
    awsSurvival,
    iac,
    ci,
    kubernetes,
    observability,
    devsecopsGitops,
    sreCapstone,
  ],
};
