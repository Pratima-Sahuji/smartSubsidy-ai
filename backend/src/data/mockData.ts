export const schemes = [
  {
    id: "SCH-001",
    name: "Drip Irrigation Subsidy",
    description: "Financial assistance for installing micro-irrigation systems.",
    benefit: "Up to 80% of installation cost",
    requiredDocuments: ["Aadhaar", "Land Records (7/12)", "Quotation from authorized dealer"]
  },
  {
    id: "SCH-002",
    name: "Solar Pump Subsidy",
    description: "Subsidized solar water pumps for remote agriculture fields.",
    benefit: "60% subsidy on standard pump units",
    requiredDocuments: ["Aadhaar", "Land Records", "Electricity Bill (if any)"]
  },
  {
    id: "SCH-003",
    name: "Crop Insurance Scheme",
    description: "Protection against crop loss due to natural calamities.",
    benefit: "Full cover based on premium paid",
    requiredDocuments: ["Bank Passbook", "Sowing Certificate"]
  },
  {
    id: "SCH-004",
    name: "Seed Assistance",
    description: "Subsidized high-yield seeds for marginal farmers.",
    benefit: "50% off on certified seeds",
    requiredDocuments: ["Farmer ID"]
  },
  {
    id: "SCH-005",
    name: "Organic Farming Support",
    description: "Incentives for adopting organic farming practices over 3 years.",
    benefit: "₹10,000 per hectare annually",
    requiredDocuments: ["Soil Health Card", "Pledge form"]
  }
];

export const mockApplications = {
  "APP-1234": {
    status: "approved",
    scheme: "Solar Pump Subsidy",
    date: "2023-10-15"
  },
  "APP-5678": {
    status: "pending",
    scheme: "Crop Insurance Scheme",
    date: "2023-12-01"
  },
  "APP-9101": {
    status: "rejected",
    scheme: "Drip Irrigation Subsidy",
    reasons: ["Land size criteria not met (requires > 1 hectare)", "District not in priority zone"],
    date: "2023-11-20"
  }
};
