// ===========================================================================
//  TDD suite for the CSCO Interview Gauntlet.
//  Run:  node tests/test_bank.mjs
//  Validates (a) the question-bank data contract and (b) the stage-unlock logic.
//  Zero dependencies.
// ===========================================================================
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

let passed = 0;
let failed = 0;
const failures = [];

function ok(cond, msg) {
  if (cond) { passed++; }
  else { failed++; failures.push(msg); }
}
function section(name) { /* grouping only */ void name; }

// --- Load questions.js in a sandbox that mimics a browser global ------------
function loadBank() {
  const file = path.join(ROOT, "questions.js");
  ok(fs.existsSync(file), "questions.js exists");
  if (!fs.existsSync(file)) return null;
  const code = fs.readFileSync(file, "utf8");
  const sandbox = { window: {}, globalThis: {} };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: "questions.js" });
  return sandbox.QUESTION_BANK || sandbox.window.QUESTION_BANK;
}

// --- Stage-unlock logic under test (mirrors index.html) ---------------------
function makeGame(bankLength) {
  const cleared = [];
  return {
    cleared,
    isCleared: (i) => cleared.indexOf(i) !== -1,
    isUnlocked(i) { return i === 0 || this.isCleared(i - 1); },
    clear(i) { if (cleared.indexOf(i) === -1) cleared.push(i); },
    allDone() { return cleared.length === bankLength; }
  };
}

// ===========================================================================
section("Data contract");
const bank = loadBank();
ok(Array.isArray(bank), "QUESTION_BANK is an array");

if (Array.isArray(bank)) {
  ok(bank.length === 19, `19 stages (got ${bank.length})`);

  let totalQ = 0;
  const EXPECTED_SECTIONS = [
    "CAREER PATH & EXPERIENCE-FIRST BACKGROUND",
    "LEADERSHIP & PEOPLE DEVELOPMENT",
    "STRATEGIC PLANNING & S&OP",
    "SOURCING, PROCUREMENT & VENDOR NEGOTIATION",
    "FINANCIAL OWNERSHIP, P&L & COST REDUCTION",
    "LOGISTICS, TRANSPORTATION & DISTRIBUTION",
    "WAREHOUSING & INVENTORY MANAGEMENT",
    "DEMAND & SUPPLY PLANNING / FORECASTING",
    "QUALITY MANAGEMENT",
    "DATA, ANALYTICS & TECHNOLOGY",
    "RISK, RESILIENCE & CYBERSECURITY",
    "FEDERAL CONTRACTING, NAICS & COMPLIANCE",
    "SMALL-BUSINESS / LEAN-ORG FIT & PRICE DISCIPLINE",
    "CONTINUOUS IMPROVEMENT (LEAN / SIX SIGMA)",
    "COMMUNICATION & STAKEHOLDER MANAGEMENT",
    "BEHAVIORAL / SITUATIONAL (STAR)",
    "ETHICS, CULTURE & FAIR-CHANCE VALUES",
    "SCENARIO & PROBLEM-SOLVING",
    "MOTIVATION, FIT & CLOSING"
  ];

  bank.forEach((stage, si) => {
    ok(stage && typeof stage.section === "string" && stage.section.length > 0,
      `stage ${si + 1} has a section name`);
    ok(EXPECTED_SECTIONS[si] === undefined || stage.section === EXPECTED_SECTIONS[si],
      `stage ${si + 1} section matches source ("${stage && stage.section}")`);
    ok(Array.isArray(stage.questions) && stage.questions.length > 0,
      `stage ${si + 1} has questions`);

    (stage.questions || []).forEach((q, qi) => {
      totalQ++;
      const where = `S${si + 1}Q${qi + 1}`;
      ok(typeof q.q === "string" && q.q.trim().length > 0, `${where}: has question text`);
      ok(Array.isArray(q.options) && q.options.length >= 3, `${where}: >=3 options`);
      const correct = (q.options || []).filter((o) => o && o.correct === true);
      ok(correct.length === 1, `${where}: exactly one correct option (got ${correct.length})`);
      (q.options || []).forEach((o, oi) =>
        ok(o && typeof o.text === "string" && o.text.trim().length > 0,
          `${where} opt ${oi + 1}: has text`));
      ok(typeof q.why === "string" && q.why.trim().length > 0, `${where}: has explanation`);
    });
  });

  ok(totalQ === 300, `300 total questions (got ${totalQ})`);

  // Correct-answer position should vary (not always index 0) to avoid a tell.
  const positions = {};
  bank.forEach((stage) => (stage.questions || []).forEach((q) => {
    const idx = (q.options || []).findIndex((o) => o && o.correct === true);
    positions[idx] = (positions[idx] || 0) + 1;
  }));
  const distinctPositions = Object.keys(positions).length;
  ok(distinctPositions >= 2, `correct answer appears in >=2 positions (got ${distinctPositions})`);
}

// ===========================================================================
section("Stage-unlock logic");
{
  const g = makeGame(19);
  ok(g.isUnlocked(0) === true, "stage 0 starts unlocked");
  ok(g.isUnlocked(1) === false, "stage 1 starts locked");
  ok(g.isUnlocked(18) === false, "final stage starts locked");

  // Cannot reach the last stage without clearing all prior ones.
  g.clear(0);
  ok(g.isUnlocked(1) === true, "clearing stage 0 unlocks stage 1");
  ok(g.isUnlocked(2) === false, "stage 2 still locked after only stage 0");

  for (let i = 1; i < 18; i++) g.clear(i);
  ok(g.isUnlocked(18) === true, "final stage unlocks after clearing 0..17");
  ok(g.allDone() === false, "not done until final stage cleared");
  g.clear(18);
  ok(g.allDone() === true, "done after clearing all 19 stages");
}

// ===========================================================================
console.log(`\n  PASS ${passed}  FAIL ${failed}`);
if (failed) {
  console.log("\n  Failures:");
  failures.slice(0, 40).forEach((f) => console.log("   - " + f));
  if (failures.length > 40) console.log(`   ...and ${failures.length - 40} more`);
  process.exit(1);
} else {
  console.log("  All tests passed ✓\n");
}
