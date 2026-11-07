/**
 * Grok Bot Browser Workflow Safety Gate & Two-Bot Handoff Schema Validator
 * Enforces the stop-before-login/payment rule and validates JSON handoff contracts between Bot A and Bot B.
 */

const FORBIDDEN_BROWSER_ACTIONS = ["login", "signin", "password", "checkout", "credit_card", "register_submit"];

export function evaluateBrowserStepSafety(stepAction = "") {
  const normalized = String(stepAction).toLowerCase();
  const violatedRule = FORBIDDEN_BROWSER_ACTIONS.find((rule) => normalized.includes(rule)) || null;
  return {
    stepAction,
    allowed: violatedRule === null,
    stoppedBySafetyRule: violatedRule !== null,
    violatedRule
  };
}

export function validateTwoBotHandoffPayload(payload = {}) {
  const requiredKeys = ["featureName", "targetAudience", "launchDate", "keyBenefit", "verifyCommand"];
  const missingKeys = requiredKeys.filter((k) => !payload[k] || String(payload[k]).trim() === "");
  return {
    valid: missingKeys.length === 0,
    missingKeys
  };
}
