/* eslint-disable @typescript-eslint/no-require-imports */

import { NlpManager } from 'node-nlp';
const fs = require('fs');
const path = require('path');

// Persian detector
function isPersian(text) {
  return /[\u0600-\u06FF]/.test(text);
}

// Load training data
const dataPath = path.join(process.cwd(), 'src', 'data', 'training-data.json');
let trainingData = {};

try {
  trainingData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
} catch (error) {
  console.error('Error loading training data:', error);
}

// Extract supported languages
const supportedLanguages = Object.keys(trainingData);

// Init manager
const manager = new NlpManager({ languages: supportedLanguages, forceNER: true });

let trained = false;

// Train from JSON
export async function trainNLP() {
  if (trained) {
    console.log('NLP model is already trained.');
    return;
  }

  try {
    for (const lang of supportedLanguages) {
      const { documents, answers } = trainingData[lang];

      documents.forEach(doc => manager.addDocument(lang, doc.text, doc.intent));

      for (const intent in answers) {
        manager.addAnswer(lang, intent, answers[intent]);
      }
    }

    await manager.train();
    manager.save();
    trained = true;
    console.log('NLP model trained and saved.');
  } catch (error) {
    console.error('Error during NLP training:', error);
    throw new Error('Failed to train NLP model');
  }
}

// Process message
export async function processMessage(text) {
  if (!trained) {
    throw new Error('NLP model is not trained yet.');
  }

  const lang = isPersian(text) ? 'fa' : 'en';

  try {
    const result = await manager.process(lang, text);

    return {
      text,
      lang,
      intent: result.intent,
      sentiment: result.sentiment,
      answer: result.answer,
      score: result.score,
    };
  } catch (error) {
    console.error('Error processing message:', error);
    throw new Error('Failed to process the message');
  }
}
