// Core engine shared by the API route and the evaluation script.
// The decision policy is the point of this project: the bot only answers
// when its confidence is high, asks the user to choose when it is unsure,
// and routes sensitive topics to people instead of answering them.
import nlpPkg from 'node-nlp';

const { NlpManager } = nlpPkg;

const STOPWORDS = new Set([
  'i', 'me', 'my', 'a', 'an', 'the', 'is', 'are', 'am', 'do', 'does', 'to', 'for', 'of', 'in', 'on',
  'at', 'can', 'how', 'what', 'when', 'where', 'it', 'and', 'or', 'there', 'be', 'you', 'your', 'good',
  'who', 'which', 'please', 'get', 'want', 'need', 'this', 'that', 'with', 'about',
  'من', 'رو', 'را', 'به', 'از', 'در', 'که', 'این', 'اون', 'یه', 'یک', 'با', 'هست', 'میشه', 'چطور', 'کی', 'چی',
  'کن', 'کجا', 'کجاست', 'برام', 'برای', 'هم', 'خوب', 'یه', 'رو',
]);

export function isPersian(text) {
  return /[\u0600-\u06FF]/.test(text);
}

function tokens(text) {
  return text
    .toLowerCase()
    .replace(/[\u200c]/g, ' ')
    .split(/[^\p{L}\p{N}]+/u)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

export function createEngine(data) {
  const languages = ['en', 'fa'].filter((l) => data[l]);
  const policy = data.policy;
  const manager = new NlpManager({ languages, forceNER: false, nlu: { log: false }, autoSave: false });

  // vocabulary per intent, used to show which words the decision rests on
  const vocab = {};
  for (const lang of languages) {
    vocab[lang] = {};
    for (const doc of data[lang].documents) {
      vocab[lang][doc.intent] ??= new Set();
      tokens(doc.text).forEach((t) => vocab[lang][doc.intent].add(t));
    }
  }

  let trainedPromise = null;
  function train() {
    if (!trainedPromise) {
      for (const lang of languages) {
        const { documents, answers } = data[lang];
        documents.forEach((d) => manager.addDocument(lang, d.text, d.intent));
        Object.entries(answers).forEach(([intent, a]) => manager.addAnswer(lang, intent, a));
      }
      trainedPromise = manager.train();
    }
    return trainedPromise;
  }

  async function classify(text) {
    await train();
    const lang = isPersian(text) ? 'fa' : 'en';
    const result = await manager.process(lang, text);
    const ranked = (result.classifications || [])
      .filter((c) => c.intent !== 'None')
      .sort((a, b) => b.score - a.score);
    const top = ranked[0] || { intent: 'None', score: 0 };
    return { lang, result, ranked, top };
  }

  // Words in the user's message that also appear in training examples of an intent.
  function evidenceFor(text, lang, intent) {
    const v = vocab[lang]?.[intent];
    return v ? tokens(text).filter((t) => v.has(t)) : [];
  }

  // useEvidence=false gives the confidence-only baseline used in the evaluation.
  function decide(top, evidence, { useEvidence = true } = {}) {
    // Possible distress is escalated even on weak evidence: a needless referral
    // costs little, a missed one costs a lot.
    if (policy.sensitiveIntents.includes(top.intent) && top.score >= policy.sensitiveThreshold) return 'handoff';
    // The classifier's scores sum to 1 across known intents, so off-topic text can
    // still score high. If no word of the message is shared with the intent's
    // training examples, the score is not trusted.
    if (useEvidence && evidence.length === 0) return 'abstain';
    if (policy.handoffIntents.includes(top.intent) && top.score >= policy.clarifyThreshold) return 'handoff';
    if (top.score >= policy.answerThreshold) return 'answer';
    if (top.score >= policy.clarifyThreshold) return 'clarify';
    return 'abstain';
  }

  async function respond(text) {
    const { lang, result, ranked, top } = await classify(text);
    const evidence = evidenceFor(text, lang, top.intent);
    const decision = decide(top, evidence);
    const labels = data[lang].labels;
    const answers = data[lang].answers;
    const fa = lang === 'fa';

    const alternatives = ranked.slice(0, 3).map((c) => ({
      intent: c.intent,
      label: labels[c.intent] || c.intent,
      score: Number(c.score.toFixed(3)),
    }));

    let answer;
    if (decision === 'answer' || decision === 'handoff') {
      answer = answers[top.intent];
    } else if (decision === 'clarify') {
      answer = fa
        ? 'مطمئن نیستم منظورت را درست فهمیده باشم. کدام‌یک از این‌هاست؟'
        : "I'm not sure I understood. Which of these did you mean?";
    } else {
      answer = fa
        ? 'این سؤال خارج از موضوعاتی است که می‌شناسم، پس حدس نمی‌زنم. می‌توانی آن را طور دیگری بپرسی یا با خدمات دانشجویی صحبت کنی.'
        : "That's outside the topics I know, so I won't guess. Try rephrasing, or contact student services.";
    }

    return {
      text,
      lang,
      decision,
      intent: top.intent,
      label: labels[top.intent] || null,
      score: Number(top.score.toFixed(3)),
      answer,
      alternatives,
      evidence,
      sentiment: result.sentiment ? { score: result.sentiment.score, vote: result.sentiment.vote } : null,
      thresholds: { answer: policy.answerThreshold, clarify: policy.clarifyThreshold },
    };
  }

  async function answerIntent(intent, lang) {
    const set = data[lang] || data.en;
    return {
      lang,
      decision: 'answer',
      intent,
      label: set.labels[intent] || intent,
      score: 1,
      answer: set.answers[intent],
      alternatives: [],
      evidence: [],
      sentiment: null,
      confirmedByUser: true,
      thresholds: { answer: policy.answerThreshold, clarify: policy.clarifyThreshold },
    };
  }

  return { train, classify, decide, evidenceFor, respond, answerIntent, policy };
}
