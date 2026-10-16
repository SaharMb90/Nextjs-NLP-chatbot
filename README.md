# Campus NLP assistant: a chatbot that knows when it doesn't know

A bilingual (English and Persian) intent-based assistant for university questions, built to study one responsible-NLP question: **when should a conversational system answer, ask, decline, or hand over to a person?**

Live demo: https://nextjs-nlp-chatbot-bptm-7fu2nn79u-saharmb90s-projects.vercel.app/

## What it does

Every reply carries a visible decision and the evidence behind it:

| Decision | When | Why |
| --- | --- | --- |
| Answer | Top intent confidence ≥ 0.70 and at least one word shared with that intent's training examples | Only answer when the model is confident *and* the confidence is grounded in the input |
| Ask to clarify | Confidence between 0.45 and 0.70 | The user picks from the top three topics instead of receiving a guess |
| Decline to guess | Confidence < 0.45, or no shared words | Off-topic questions get an honest "I don't know" |
| Refer to a person | Possible distress (confidence ≥ 0.30), or an explicit request for a human | A needless referral costs little; a missed one costs a lot |

The interface shows the top three intents with their scores against both thresholds, so users can see how close a decision was.

## Why the evidence check exists

The classifier's scores are normalised across known intents, so text the bot was never trained on can still receive a high score. In testing, "what is the capital of France" scored 0.80 for *student visa*, and a Persian request for a poem scored 0.90 for *talk to a person*. Confidence alone is not a reliable signal of competence outside the training distribution. The evidence check refuses to trust a score that no word in the message supports.

## Evaluation

Held-out test set: 31 in-scope and 6 out-of-scope queries per language, phrased differently from the training data (`src/data/test-set.json`). Run `npm run evaluate`.

| Metric | English: confidence only | English: + evidence check | Persian: confidence only | Persian: + evidence check |
| --- | --- | --- | --- | --- |
| Top-1 accuracy (in-scope) | 87% | 87% | 97% | 97% |
| Coverage (answered or handed off) | 84% | 81% | 90% | 87% |
| Accuracy on answered queries | 100% | 100% | 96% | 100% |
| Out-of-scope queries declined or clarified | 33% | 100% | 50% | 100% |
| Wellbeing queries routed to a person | 100% | 100% | 100% | 100% |
| Expected calibration error (lower is better) | 0.085 | 0.085 | 0.096 | 0.096 |

**Limitations, stated plainly.** High confidence can still be wrong: before location intents were added, "where is the library?" was answered with library opening hours at 100% confidence, because the only intent containing "library" was about hours. The evidence check cannot catch a wrong intent that shares words with the right one; it only catches off-topic input. The test set is small (74 queries), so each percentage point carries wide uncertainty. The stopword list was adjusted after inspecting errors on this test set, so the out-of-scope figures are optimistic; a fresh test set is needed for an unbiased estimate. Bot answers are deliberately generic and point to official sources rather than inventing dates, fees or visa rules.

## Data

272 training utterances across 17 intents (8 per intent per language), including greetings, library hours and location, campus locations, deadlines, fees, visas, accommodation, IT, exams, course registration, funding, wellbeing and human handoff. Persian examples use informal spoken forms as well as written ones.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run evaluate   # prints the table above and writes results/eval.json
```

## Structure

- `src/lib/engine.mjs`: classifier, decision policy and evidence check (shared by the app and the evaluation)
- `src/pages/api/nlp.js`: API route
- `src/pages/index.js`: chat interface with the decision slip
- `src/data/`: training data, thresholds and the held-out test set
- `scripts/evaluate.mjs`: accuracy, coverage, selective accuracy, out-of-scope handling and expected calibration error

Built with Next.js and NLP.js (node-nlp). Licence: Apache-2.0.
