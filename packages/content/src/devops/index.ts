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
import { k8sWorkloads } from "./k8s-workloads.js";
import { trafficIdentity } from "./traffic-identity.js";
import { gitopsDelivery } from "./gitops-delivery.js";
import { dataPlane } from "./data-plane.js";
import { alertsRunbooks } from "./alerts-runbooks.js";
import { incidentDrills } from "./incident-drills.js";

export const devopsContent: CourseContent = {
  slug: "devops",
  titleUk: "DevOps",
  titleEn: "DevOps",
  descriptionUk:
    "Один сервіс forge-status: огляд від Git до Kubernetes, потім «Тримати сервіс» і «На зміні». AWS перед Terraform; CI завершується образом. GitOps-доставка, відновлення бази й інциденти.",
  descriptionEn:
    "One service, forge-status: a Git-to-Kubernetes survey, then Stay up and On call. AWS before Terraform; CI ends at the image. GitOps delivery, database recovery, and incidents.",
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
    k8sWorkloads,
    trafficIdentity,
    gitopsDelivery,
    dataPlane,
    alertsRunbooks,
    incidentDrills,
    sreCapstone,
  ],
};
