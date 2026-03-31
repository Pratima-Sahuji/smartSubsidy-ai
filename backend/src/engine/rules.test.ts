import assert from 'assert';
import { checkEligibility, FarmerProfile } from './rules';

console.log("Running Rule Engine Tests...\n");

const testProfile: FarmerProfile = {
  name: "Rajesh",
  district: "Pune",
  state: "Maharashtra",
  cropType: "Wheat",
  landSize: 2.5,
  previousSubsidyClaimed: false
};

const result = checkEligibility(testProfile);

// Drip Irrigation expects >= 1 Ha (Test passed)
const hasDrip = result.eligible.some(r => r.id === 'SCH-001');
assert.strictEqual(hasDrip, true, "Should be eligible for Drip Irrigation");

// Solar pump expects previousSubsidyClaimed to be false
const hasSolar = result.eligible.some(r => r.id === 'SCH-002');
assert.strictEqual(hasSolar, true, "Should be eligible for Solar Pump");

// Over limit Seed Assistance (<= 5 Ha) - Rajes is 2.5, so he gets it
const hasSeed = result.eligible.some(r => r.id === 'SCH-004');
assert.strictEqual(hasSeed, true, "Should be eligible for Seed Assist");

console.log("✅ All sample tests passed successfully!");
