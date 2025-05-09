import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/nlp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setResponse(data);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>🧠 NLP.js Chat</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>

      {response && (
        <div style={{ marginTop: 20 }}>
          <h2>🔍 Analysis Result</h2>
          <p><strong>Input:</strong> {response.text}</p>
          <p><strong>Language:</strong> {response.lang}</p>
          <p><strong>Intent:</strong> {response.intent}</p>
          <p><strong>Answer:</strong> {response.answer}</p>
          <p><strong>Sentiment:</strong> {response.sentiment.vote} ({response.sentiment.score})</p>
        </div>
      )}
    </div>
  );
}
