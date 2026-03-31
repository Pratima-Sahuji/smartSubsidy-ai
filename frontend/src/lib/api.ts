const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export interface FarmerProfile {
  name: string;
  district: string;
  state: string;
  cropType: string;
  landSize: number;
  previousSubsidyClaimed: boolean;
}

export interface RuleResult {
  id: string;
  schemeName: string;
  isEligible: boolean;
  reasons: string[];
  benefitStr?: string;
  documents?: string[];
}

export interface EligibilityResponse {
  eligible: RuleResult[];
  rejected: RuleResult[];
}

export async function checkEligibility(data: FarmerProfile): Promise<EligibilityResponse> {
  const response = await fetch(`${API_URL}/check-eligibility`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to check eligibility");
  }

  return response.json();
}

export async function getApplicationStatus(id: string) {
  const response = await fetch(`${API_URL}/application/${id}`);
  
  if (!response.ok) {
    throw new Error("Application not found");
  }
  
  return response.json();
}
