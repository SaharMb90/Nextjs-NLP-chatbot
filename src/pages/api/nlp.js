import engine from '@/lib/nlp';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, confirmIntent, lang } = req.body || {};

  try {
    // The user picked one of the suggested topics after a clarification.
    if (confirmIntent) {
      return res.status(200).json(await engine.answerIntent(confirmIntent, lang === 'fa' ? 'fa' : 'en'));
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }
    if (message.length > 500) {
      return res.status(400).json({ error: 'Message is too long (500 characters max)' });
    }

    return res.status(200).json(await engine.respond(message.trim()));
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'The NLP engine failed to process this message.' });
  }
}
