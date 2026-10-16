// Held-out evaluation: accuracy, calibration and the coverage/accuracy trade-off
// of the abstention policy. Run with: npm run evaluate
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createEngine } from '../src/lib/engine.mjs';

const data = JSON.parse(readFileSync(new URL('../src/data/training-data.json', import.meta.url)));
const test = JSON.parse(readFileSync(new URL('../src/data/test-set.json', import.meta.url)));
const engine = createEngine(data);
await engine.train();

function ece(rows, bins = 10) {
  let total = 0;
  for (let b = 0; b < bins; b++) {
    const lo = b / bins, hi = (b + 1) / bins;
    const inBin = rows.filter((r) => r.conf > lo && r.conf <= hi);
    if (!inBin.length) continue;
    const acc = inBin.filter((r) => r.correct).length / inBin.length;
    const conf = inBin.reduce((s, r) => s + r.conf, 0) / inBin.length;
    total += (inBin.length / rows.length) * Math.abs(acc - conf);
  }
  return total;
}

async function evaluate(useEvidence) {
const report = {};
for (const lang of Object.keys(test)) {
  const inScope = [], outScope = [];
  for (const { text, intent } of test[lang]) {
    const { top } = await engine.classify(text);
    const decision = engine.decide(top, engine.evidenceFor(text, lang, top.intent), { useEvidence });
    const row = { text, gold: intent, pred: top.intent, conf: top.score, decision, correct: top.intent === intent };
    (intent ? inScope : outScope).push(row);
  }
  const answered = inScope.filter((r) => r.decision === 'answer' || r.decision === 'handoff');
  const sensitive = inScope.filter((r) => engine.policy.sensitiveIntents.includes(r.gold));
  report[lang] = {
    inScope: inScope.length,
    outOfScope: outScope.length,
    top1Accuracy: inScope.filter((r) => r.correct).length / inScope.length,
    coverage: answered.length / inScope.length,
    selectiveAccuracy: answered.length ? answered.filter((r) => r.correct).length / answered.length : 0,
    outOfScopeAbstention: outScope.filter((r) => r.decision === 'abstain' || r.decision === 'clarify').length / outScope.length,
    outOfScopeWrongHandoff: outScope.filter((r) => r.decision === 'handoff').length / outScope.length,
    sensitiveRoutedToHuman: sensitive.filter((r) => r.decision === 'handoff').length / (sensitive.length || 1),
    ece: ece(inScope),
    errors: inScope.filter((r) => !r.correct).map(({ text, gold, pred, conf }) => ({ text, gold, pred, conf: +conf.toFixed(2) })),
    outOfScopeAnswered: outScope.filter((r) => r.decision === 'answer' || r.decision === 'handoff').map(({ text, pred, conf }) => ({ text, pred, conf: +conf.toFixed(2) })),
  };
}
return report;
}

const baseline = await evaluate(false);
const report = await evaluate(true);

const pct = (x) => `${(x * 100).toFixed(0)}%`;
console.log('| Metric | English: confidence only | English: + evidence check | Persian: confidence only | Persian: + evidence check |\n| --- | --- | --- | --- | --- |');
const rows = [
  ['Top-1 accuracy (in-scope)', 'top1Accuracy', pct],
  ['Coverage (answered or handed off)', 'coverage', pct],
  ['Accuracy on answered queries', 'selectiveAccuracy', pct],
  ['Out-of-scope queries declined or clarified', 'outOfScopeAbstention', pct],
  ['Wellbeing queries routed to a person', 'sensitiveRoutedToHuman', pct],
  ['Expected calibration error (lower is better)', 'ece', (x) => x.toFixed(3)],
];
for (const [name, key, f] of rows) {
  console.log(`| ${name} | ${f(baseline.en[key])} | ${f(report.en[key])} | ${f(baseline.fa[key])} | ${f(report.fa[key])} |`);
}

mkdirSync(new URL('../results/', import.meta.url), { recursive: true });
writeFileSync(new URL('../results/eval.json', import.meta.url), JSON.stringify({ confidenceOnly: baseline, withEvidenceCheck: report }, null, 2));
console.log('\nFull report with every error: results/eval.json');
