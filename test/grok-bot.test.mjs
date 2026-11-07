import test from "node:test";
import assert from "node:assert/strict";
import { evaluateBrowserStepSafety, validateTwoBotHandoffPayload } from "../src/workflow-safety-validator.mjs";

test("Browser workflow safety gate blocks login and checkout actions automatically", () => {
  assert.equal(evaluateBrowserStepSafety("extract_public_hackathon_table").allowed, true);
  const blocked = evaluateBrowserStepSafety("submit_credit_card_checkout");
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.stoppedBySafetyRule, true);
});

test("Two-bot handoff validator verifies required launch brief fields", () => {
  const validBrief = {
    featureName: "SolanaSentinel CPI Firewall",
    targetAudience: "Solana DeFi developers",
    launchDate: "2026-11-08",
    keyBenefit: "Blocks unauthorized SetAuthority drains before signing",
    verifyCommand: "npm test"
  };
  assert.equal(validateTwoBotHandoffPayload(validBrief).valid, true);
});
