const { NlpManager } = require('node-nlp');
const fs = require('fs');
const path = require('path');

// Persian detector
function isPersian(text) {
  return /[\u0600-\u06FF]/.test(text);
}

// Load training data
const dataPath = path.join(process.cwd(), 'src', 'data', 'training-data.json');
const trainingData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Extract supported languages
const supportedLanguages = Object.keys(trainingData);

// Init manager
const manager = new NlpManager({ languages: supportedLanguages, forceNER: true });

// Train from JSON
async function trainNLP() {
  for (const lang of supportedLanguages) {
    const { documents, answers } = trainingData[lang];

    documents.forEach(doc => manager.addDocument(lang, doc.text, doc.intent));

    for (const intent in answers) {
      manager.addAnswer(lang, intent, answers[intent]);
    }
  }

  await manager.train();
  manager.save();
}

// Process message
async function processMessage(text) {
  const lang = isPersian(text) ? 'fa' : 'en';
  const result = await manager.process(lang, text);

  return {
    text,
    lang,
    intent: result.intent,
    sentiment: result.sentiment,
    answer: result.answer,
    score: result.score,
  };
}

module.exports = { trainNLP, processMessage };
