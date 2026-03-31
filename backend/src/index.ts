import express from "express";
import cors from "cors";
import { z } from "zod";
import { schemes, mockApplications } from "./data/mockData";
import { checkEligibility, FarmerProfile } from "./engine/rules";

const app = express();
app.use(cors());
app.use(express.json());

const farmerSchema = z.object({
  name: z.string().min(2),
  district: z.string().min(2),
  state: z.string().min(2),
  cropType: z.string().min(2),
  landSize: z.number().positive(),
  previousSubsidyClaimed: z.boolean(),
});

// Endpoint 1: Get all schemes
app.get("/api/schemes", (req, res) => {
  res.json({ schemes });
});

// Endpoint 2: Check Eligibility (The Core Rule Engine)
app.post("/api/check-eligibility", (req, res) => {
  const result = farmerSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Invalid farmer data", details: result.error.issues });
  }

  const profile: FarmerProfile = result.data;
  const analysis = checkEligibility(profile);

  // Return realistic mock response
  setTimeout(() => { // simulate network/processing delay
    res.json(analysis);
  }, 600);
});

// Endpoint 3: Application Status Decoder
app.get("/api/application/:id", (req, res) => {
  const { id } = req.params;
  const application = mockApplications[id as keyof typeof mockApplications];

  if (!application) {
    return res.status(404).json({ error: "Application not found" });
  }

  res.json({ application });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SmartSubsidy AI Mock API running on port ${PORT}`);
});
