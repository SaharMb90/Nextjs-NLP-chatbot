import { trainNLP, processMessage } from '@/lib/nlp';

let trained = false;

export default async function handler(req, res) {
  // Ensure that only POST requests are allowed
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Ensure the request has a 'message' body
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Train the NLP model if it hasn't been trained yet
    if (!trained) {
      await trainNLP();
      trained = true;
    }

    // Process the message with the trained model
    const result = await processMessage(message);

    // Return the result as a JSON response
    return res.status(200).json(result);
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
