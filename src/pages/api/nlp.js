import { trainNLP, processMessage } from '@/lib/nlp';

let trained = false;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { message } = req.body;

  if (!trained) {
    await trainNLP();
    trained = true;
  }

  const result = await processMessage(message);
  res.status(200).json(result);
}
