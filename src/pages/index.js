import { useState, useRef, useEffect } from 'react';

const SUGGESTIONS = [
  { label: 'hello', lang: 'en' },
  { label: 'how are you', lang: 'en' },
  { label: 'سلام', lang: 'fa' },
  { label: 'چه خبر؟', lang: 'fa' },
];

const SENTIMENT_STYLES = {
  positive: { label: 'positive', color: '#4B7B62' },
  negative: { label: 'negative', color: '#B3471F' },
  neutral: { label: 'neutral', color: '#8A8478' },
};

function isPersian(text) {
  return /[\u0600-\u06FF]/.test(text);
}

function sentimentBucket(score) {
  if (score === undefined || score === null) return null;
  if (score > 0.15) return 'positive';
  if (score < -0.15) return 'negative';
  return 'neutral';
}

function AnalysisSlip({ data }) {
  const bucket = sentimentBucket(data?.sentiment?.score);
  const confidence = data?.score ? Math.round(data.score * 100) : null;

  return (
    <div className="slip">
      <div className="slip-row">
        <span className="slip-key">intent</span>
        <span className="slip-val">{data.intent || 'None'}</span>
      </div>
      <div className="slip-row">
        <span className="slip-key">lang</span>
        <span className="slip-val">{data.lang}</span>
      </div>
      {confidence !== null && (
        <div className="slip-row">
          <span className="slip-key">confidence</span>
          <div className="meter">
            <div className="meter-fill" style={{ width: `${confidence}%` }} />
          </div>
          <span className="slip-val slip-num">{confidence}%</span>
        </div>
      )}
      {bucket && (
        <div className="slip-row">
          <span className="slip-key">sentiment</span>
          <span
            className="sentiment-chip"
            style={{ color: SENTIMENT_STYLES[bucket].color, borderColor: SENTIMENT_STYLES[bucket].color }}
          >
            {SENTIMENT_STYLES[bucket].label} · {data.sentiment.score.toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg = { id: Date.now(), role: 'user', text: trimmed, lang: isPersian(trimmed) ? 'fa' : 'en' };
    setMessages((prev) => [...prev, userMsg]);
    setMessage('');
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/nlp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });
      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'bot', text: data.answer || 'No match found.', data },
      ]);
    } catch {
      setError("Couldn't reach the NLP engine. Is the dev server running?");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(message);
  }

  return (
    <div className="page">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,650&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;600&family=Vazirmatn:wght@400;600&display=swap');

        * { box-sizing: border-box; }
        html, body, #__next { height: 100%; margin: 0; }
        body { background: #16140f; }
      `}</style>

      <style jsx>{`
        .page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          background:
            radial-gradient(circle at 15% 0%, rgba(196, 149, 74, 0.10), transparent 45%),
            radial-gradient(circle at 85% 10%, rgba(79, 70, 229, 0.14), transparent 40%),
            #16140f;
          color: #ECE6D8;
          font-family: 'Inter', sans-serif;
          padding: 28px 16px 16px;
        }

        .header {
          width: 100%;
          max-width: 640px;
          margin-bottom: 18px;
        }

        .eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #C2956C;
          margin: 0 0 6px;
        }

        h1 {
          font-family: 'Fraunces', serif;
          font-weight: 650;
          font-size: 30px;
          margin: 0 0 6px;
          color: #F6F1E4;
        }

        .subtitle {
          margin: 0;
          color: #9C9486;
          font-size: 14px;
          line-height: 1.5;
          max-width: 52ch;
        }

        .chat-shell {
          width: 100%;
          max-width: 640px;
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #1C1A14;
          border: 1px solid #2E2A21;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 30px 60px -25px rgba(0, 0, 0, 0.6);
        }

        .messages {
          flex: 1;
          overflow-y: auto;
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-height: 380px;
          max-height: 56vh;
        }

        .empty-state {
          margin: auto;
          text-align: center;
          color: #6F6859;
          font-size: 13px;
          max-width: 36ch;
        }

        .row {
          display: flex;
          flex-direction: column;
          max-width: 86%;
        }
        .row.user { align-self: flex-end; align-items: flex-end; }
        .row.bot { align-self: flex-start; align-items: flex-start; }

        .bubble {
          padding: 10px 14px;
          border-radius: 14px;
          font-size: 14.5px;
          line-height: 1.5;
          word-break: break-word;
        }

        .bubble.user {
          background: #4F46E5;
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        .bubble.user.rtl {
          border-bottom-right-radius: 14px;
          border-bottom-left-radius: 4px;
        }

        .bubble.bot {
          background: #2A271E;
          color: #EFE9DA;
          border-bottom-left-radius: 4px;
        }
        .bubble.bot.rtl {
          border-bottom-left-radius: 14px;
          border-bottom-right-radius: 4px;
        }

        .rtl { direction: rtl; font-family: 'Vazirmatn', sans-serif; text-align: right; }

        /* the analysis slip — printed readout under each bot reply */
        .slip {
          margin-top: 6px;
          width: 100%;
          background: #F6F1E4;
          color: #2A2620;
          border-radius: 2px;
          padding: 10px 12px 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          position: relative;
        }
        .slip::before {
          content: '';
          position: absolute;
          top: -1px; left: 0; right: 0;
          height: 6px;
          background-image: radial-gradient(circle, #16140f 2.5px, transparent 2.6px);
          background-size: 12px 12px;
          background-position: 0 -6px;
        }

        .slip-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 2px 0;
        }
        .slip-key {
          color: #8A8167;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          width: 72px;
          flex-shrink: 0;
        }
        .slip-val { font-weight: 600; }
        .slip-num { width: 36px; text-align: right; }

        .meter {
          flex: 1;
          height: 5px;
          background: #E2DAC4;
          border-radius: 3px;
          overflow: hidden;
        }
        .meter-fill {
          height: 100%;
          background: #C2790A;
        }

        .sentiment-chip {
          border: 1px solid;
          border-radius: 999px;
          padding: 1px 8px;
          font-size: 10.5px;
        }

        .typing {
          align-self: flex-start;
          display: flex;
          gap: 4px;
          padding: 12px 14px;
          background: #2A271E;
          border-radius: 14px;
          border-bottom-left-radius: 4px;
        }
        .dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #8A8167;
          animation: bounce 1.1s infinite ease-in-out;
        }
        .dot:nth-child(2) { animation-delay: 0.15s; }
        .dot:nth-child(3) { animation-delay: 0.3s; }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-4px); opacity: 1; }
        }

        .suggestions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 0 18px 14px;
        }
        .chip {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          background: #2A271E;
          border: 1px solid #3A362B;
          color: #C9C2AE;
          padding: 6px 11px;
          border-radius: 999px;
          cursor: pointer;
        }
        .chip:hover { border-color: #C2956C; color: #F6F1E4; }

        .composer {
          display: flex;
          gap: 8px;
          padding: 14px;
          border-top: 1px solid #2E2A21;
          background: #1C1A14;
        }
        .composer input {
          flex: 1;
          background: #16140f;
          border: 1px solid #2E2A21;
          color: #ECE6D8;
          border-radius: 10px;
          padding: 11px 14px;
          font-size: 14px;
          outline: none;
          font-family: inherit;
        }
        .composer input::placeholder { color: #5F584A; }
        .composer input:focus { border-color: #4F46E5; }
        .composer input.rtl { direction: rtl; font-family: 'Vazirmatn', sans-serif; }

        .send-btn {
          background: #4F46E5;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 0 18px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }
        .send-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .send-btn:not(:disabled):hover { background: #4338CA; }

        .error-banner {
          margin: 10px 18px 0;
          font-size: 12.5px;
          color: #E2A98A;
          font-family: 'JetBrains Mono', monospace;
        }

        @media (prefers-reduced-motion: reduce) {
          .dot { animation: none; }
        }
      `}</style>

      <div className="header">
        <p className="eyebrow">NLP.js · bilingual intent engine</p>
        <h1>Two-language chat lab</h1>
        <p className="subtitle">
          Every reply prints an analysis slip below it — the detected intent, language,
          confidence, and sentiment the model actually scored. Speak English or Persian.
        </p>
      </div>

      <div className="chat-shell">
        <div className="messages" ref={scrollRef}>
          {messages.length === 0 && (
            <div className="empty-state">
              No messages yet — try a greeting below, in either language.
            </div>
          )}

          {messages.map((m) => {
            const rtl = m.lang === 'fa' || (m.data && m.data.lang === 'fa');
            return (
              <div key={m.id} className={`row ${m.role}`}>
                <div className={`bubble ${m.role} ${rtl ? 'rtl' : ''}`}>{m.text}</div>
                {m.role === 'bot' && m.data && <AnalysisSlip data={m.data} />}
              </div>
            );
          })}

          {loading && (
            <div className="typing">
              <span className="dot" /><span className="dot" /><span className="dot" />
            </div>
          )}
        </div>

        {error && <div className="error-banner">⚠ {error}</div>}

        {messages.length === 0 && (
          <div className="suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s.label} className="chip" onClick={() => sendMessage(s.label)}>
                {s.label}
              </button>
            ))}
          </div>
        )}

        <form className="composer" onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type in English or فارسی..."
            className={isPersian(message) ? 'rtl' : ''}
          />
          <button type="submit" className="send-btn" disabled={loading || !message.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
