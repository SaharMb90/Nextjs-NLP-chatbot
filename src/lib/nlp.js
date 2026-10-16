// Imported (not read with fs) so the data is bundled into the Vercel function.
import trainingData from '../data/training-data.json';
import { createEngine } from './engine.mjs';

let engine = globalThis.__nlpEngine;
if (!engine) {
  engine = createEngine(trainingData);
  globalThis.__nlpEngine = engine;
}

export default engine;
