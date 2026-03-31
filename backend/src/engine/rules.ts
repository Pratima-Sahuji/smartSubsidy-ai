import { schemes } from "../data/mockData";

export interface FarmerProfile {
  name: string;
  district: string;
  state: string;
  cropType: string;
  landSize: number; // in hectares
  previousSubsidyClaimed: boolean;
}

export interface RuleResult {
  schemeName: string;
  isEligible: boolean;
  reasons: string[];
  benefitStr?: string;
  documents?: string[];
  id: string;
}

export function checkEligibility(profile: FarmerProfile): {
  eligible: RuleResult[];
  rejected: RuleResult[];
} {
  const eligible: RuleResult[] = [];
  const rejected: RuleResult[] = [];

  for (const scheme of schemes) {
    let isEligible = true;
    const reasons: string[] = [];

    // Drought/water intensive rules
    if (scheme.id === "SCH-001") { // Drip Irrigation
      if (profile.landSize < 1) {
        isEligible = false;
        reasons.push("Land size too small. Requires at least 1 hectare.");
      }
      if (profile.cropType.toLowerCase() === 'wheat' && profile.district.toLowerCase() === 'coastal') {
        isEligible = false;
        reasons.push("Water-intensive crops in coastal regions prioritize other schemes.");
      }
    }

    // Solar Pump rules
    if (scheme.id === "SCH-002") {
      if (profile.previousSubsidyClaimed) {
        isEligible = false;
        reasons.push("Already claimed a subsidy recently. Cooling off period active.");
      }
      if (profile.district.toLowerCase().includes("urban")) {
        isEligible = false;
        reasons.push("Scheme primarily for remote/rural agricultural fields.");
      }
    }

    // Crop Insurance
    if (scheme.id === "SCH-003") {
       // Almost universal, but let's add a small block
       if (profile.landSize > 20) {
          isEligible = false;
          reasons.push("Exceeds maximum coverable land holding limit for this tier.");
       }
    }

    // Seed assistance
    if (scheme.id === "SCH-004") {
      if (profile.landSize > 5) {
        isEligible = false;
        reasons.push("Only for marginal/small farmers (<= 5 hectares).");
      }
    }

    // Organic Farming
    if (scheme.id === "SCH-005") {
      if (profile.cropType.toLowerCase().includes("tobacco")) {
        isEligible = false;
        reasons.push("Incentive not applicable for tobacco cultivation.");
      }
    }

    const result: RuleResult = {
      id: scheme.id,
      schemeName: scheme.name,
      isEligible,
      reasons: isEligible ? ["All criteria met."] : reasons,
      benefitStr: scheme.benefit,
      documents: scheme.requiredDocuments
    };

    if (isEligible) eligible.push(result);
    else rejected.push(result);
  }

  return { eligible, rejected };
}
