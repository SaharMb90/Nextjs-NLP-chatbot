import { useState, useRef, useEffect } from 'react';

const SUGGESTIONS = [
  'when is the library open',
  'is the phd fully funded',
  'what is the weather tomorrow',
  'ددلاین اپلای کیه',
  'خیلی استرس دارم',
];

const DECISIONS = {
  answer: { en: 'Answered', fa: 'پاسخ داده شد', tone: 'ok' },
  clarify: { en: 'Not sure — pick a topic', fa: 'مطمئن نیستم — یکی را انتخاب کن', tone: 'warn' },
  abstain: { en: 'Declined to guess', fa: 'حدس نزد', tone: 'muted' },
  handoff: { en: 'Referred to a person', fa: 'ارجاع به انسان', tone: 'human' },
};

const WHY = {
  answer: 'Confidence passed the answer threshold and words in your message match this topic.',
  clarify: 'Confidence fell between the two thresholds, so you choose instead of the bot guessing.',
  abstain: 'Confidence was too low, or no word in your message matches any topic the bot knows.',
  handoff: 'This topic is sensitive or you asked for a person, so the bot points to people instead of answering.',
};

function isPersian(text) {
  return /[\u0600-\u06FF]/.test(text);
}

function Decision({ data, onPick }) {
  const [open, setOpen] = useState(false);
  const d = DECISIONS[data.decision] || DECISIONS.abstain;
  const fa = data.lang === 'fa';
  const conf = Math.round((data.score || 0) * 100);
  const alts = (data.alternatives || []).filter((a) => a.score >= 0.05);

  return (
    <div className="meta">
      <div className="meta-line">
        <span className={`status ${d.tone}`}>
          <span className="pulse" />
          {fa ? d.fa : d.en}
        </span>
        {!data.confirmedByUser && data.decision !== 'abstain' && (
          <span className="conf">{conf >= 70 ? 'high' : conf >= 45 ? 'medium' : 'low'} confidence</span>
        )}
        {!data.confirmedByUser && (
          <button className="why" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            {open ? 'Hide reasoning' : 'Why?'}
          </button>
        )}
      </div>

      {data.decision === 'clarify' && (
        <div className="choices">
          {data.alternatives.map((a) => (
            <button key={a.intent} className="choice" onClick={() => onPick(a.intent, data.lang)}>
              {a.label}
            </button>
          ))}
        </div>
      )}

      {open && (
        <div className="reasoning">
          <p>{WHY[data.decision]}</p>
          {alts.length > 0 && (
            <ul className="alts">
              {alts.map((a) => (
                <li key={a.intent}>
                  <span className="alt-name">{a.label}</span>
                  <span className="track">
                    <span className="fill" style={{ width: `${a.score * 100}%` }} />
                    <span className="mark" style={{ left: `${data.thresholds.clarify * 100}%` }} />
                    <span className="mark strong" style={{ left: `${data.thresholds.answer * 100}%` }} />
                  </span>
                  <span className="alt-num">{Math.round(a.score * 100)}%</span>
                </li>
              ))}
            </ul>
          )}
          <p className="evidence">
            Matching words:{' '}
            {data.evidence?.length ? data.evidence.map((w) => <code key={w}>{w}</code>) : <em>none</em>}
          </p>
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
    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', text: trimmed, lang: isPersian(trimmed) ? 'fa' : 'en' }]);
    setMessage('');
    setLoading(true);
    setError(null);
    await callEngine({ message: trimmed });
  }

  async function pickIntent(intent, lang) {
    if (loading) return;
    setLoading(true);
    setError(null);
    await callEngine({ confirmIntent: intent, lang });
  }

  async function callEngine(body) {
    try {
      const res = await fetch('/api/nlp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Server returned ${res.status}`);
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'bot', text: data.answer, data }]);
    } catch (err) {
      setError(`The engine did not respond: ${err.message}. Try again in a moment.`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;700&family=Inter:wght@400;500;600&family=Vazirmatn:wght@400;600&display=swap');

        :root {
          --bg: #07061a;
          --surface: #110f2b;
          --surface-2: #1a1740;
          --line: #2b2766;
          --text: #ecebff;
          --muted: #8f8cc2;
          --violet: #a855f7;
          --blue: #3b82f6;
          --cyan: #22d3ee;
          --green: #34d399;
          --amber: #fbbf24;
          --pink: #f472b6;
        }
        * { box-sizing: border-box; }
        html, body, #__next { height: 100%; margin: 0; }
        body { background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; }

        .page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 36px 16px 20px;
          background:
            radial-gradient(60% 40% at 20% 0%, rgba(168, 85, 247, 0.28), transparent 70%),
            radial-gradient(50% 40% at 90% 10%, rgba(34, 211, 238, 0.18), transparent 70%),
            var(--bg);
        }

        .header { width: 100%; max-width: 680px; margin-bottom: 22px; }
        h1 {
          font-family: 'Sora', sans-serif;
          font-weight: 700;
          font-size: clamp(26px, 4vw, 36px);
          line-height: 1.15;
          margin: 0 0 10px;
          background: linear-gradient(90deg, #f5f3ff 0%, #c4b5fd 45%, var(--cyan) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .subtitle { margin: 0; color: var(--muted); font-size: 14.5px; line-height: 1.6; max-width: 60ch; }

        .chat {
          width: 100%;
          max-width: 680px;
          flex: 1;
          display: flex;
          flex-direction: column;
          background: rgba(17, 15, 43, 0.82);
          border: 1px solid var(--line);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 0 0 1px rgba(168, 85, 247, 0.08), 0 0 60px -10px rgba(168, 85, 247, 0.35);
          backdrop-filter: blur(8px);
        }

        .messages {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-height: 400px;
          max-height: 60vh;
          scrollbar-color: var(--line) transparent;
        }
        .empty { margin: auto; text-align: center; color: var(--muted); font-size: 14px; max-width: 38ch; line-height: 1.6; }

        .row { display: flex; flex-direction: column; max-width: 84%; gap: 6px; }
        .row.user { align-self: flex-end; align-items: flex-end; }
        .row.bot { align-self: flex-start; align-items: flex-start; }

        .bubble { padding: 11px 15px; border-radius: 16px; font-size: 15px; line-height: 1.55; word-break: break-word; }
        .bubble.user {
          background: linear-gradient(135deg, var(--violet), var(--blue));
          color: #fff;
          border-bottom-right-radius: 5px;
          box-shadow: 0 6px 24px -8px rgba(124, 58, 237, 0.7);
        }
        .bubble.bot { background: var(--surface-2); border: 1px solid var(--line); border-bottom-left-radius: 5px; }
        .rtl { direction: rtl; text-align: right; font-family: 'Vazirmatn', sans-serif; }
        .bubble.user.rtl { border-bottom-right-radius: 16px; border-bottom-left-radius: 5px; }
        .bubble.bot.rtl { border-bottom-left-radius: 16px; border-bottom-right-radius: 5px; }

        .meta { font-size: 12.5px; color: var(--muted); width: 100%; }
        .meta-line { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .status { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; }
        .pulse { width: 7px; height: 7px; border-radius: 50%; background: currentColor; box-shadow: 0 0 8px currentColor; }
        .status.ok { color: var(--green); }
        .status.warn { color: var(--amber); }
        .status.muted { color: var(--muted); }
        .status.human { color: var(--pink); }
        .conf { color: var(--muted); }
        .why {
          background: none;
          border: none;
          color: var(--cyan);
          font: inherit;
          cursor: pointer;
          padding: 0;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .choices { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
        .choice, .chip {
          font: inherit;
          font-size: 13px;
          color: var(--text);
          background: rgba(168, 85, 247, 0.12);
          border: 1px solid rgba(168, 85, 247, 0.5);
          padding: 7px 13px;
          border-radius: 999px;
          cursor: pointer;
          transition: box-shadow 0.15s, border-color 0.15s;
        }
        .choice:hover, .chip:hover { border-color: var(--cyan); box-shadow: 0 0 14px -2px rgba(34, 211, 238, 0.6); }

        .reasoning {
          margin-top: 8px;
          padding: 12px 14px;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 12px;
          max-width: 460px;
        }
        .reasoning p { margin: 0 0 10px; line-height: 1.5; }
        .alts { list-style: none; margin: 0 0 10px; padding: 0; display: grid; gap: 7px; }
        .alts li { display: grid; grid-template-columns: 140px 1fr 38px; align-items: center; gap: 10px; }
        .alt-name { color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .track { position: relative; height: 6px; background: var(--surface-2); border-radius: 3px; }
        .fill { position: absolute; inset: 0 auto 0 0; border-radius: 3px; background: linear-gradient(90deg, var(--violet), var(--cyan)); }
        .mark { position: absolute; top: -3px; bottom: -3px; width: 1px; background: var(--muted); opacity: 0.6; }
        .mark.strong { background: var(--text); opacity: 0.9; }
        .alt-num { text-align: right; color: var(--text); font-variant-numeric: tabular-nums; }
        .evidence { margin: 0 !important; }
        .evidence code {
          font-family: inherit;
          color: var(--cyan);
          background: rgba(34, 211, 238, 0.1);
          padding: 1px 6px;
          border-radius: 6px;
          margin-right: 4px;
        }

        .typing { align-self: flex-start; display: flex; gap: 5px; padding: 13px 15px; background: var(--surface-2); border: 1px solid var(--line); border-radius: 16px; }
        .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--violet); animation: bounce 1.1s infinite ease-in-out; }
        .dot:nth-child(2) { animation-delay: 0.15s; background: #8b7cf6; }
        .dot:nth-child(3) { animation-delay: 0.3s; background: var(--cyan); }
        @keyframes bounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.5; } 30% { transform: translateY(-4px); opacity: 1; } }

        .suggestions { display: flex; flex-wrap: wrap; gap: 8px; padding: 0 20px 16px; }

        .composer { display: flex; gap: 10px; padding: 14px; border-top: 1px solid var(--line); }
        .composer input {
          flex: 1;
          background: var(--bg);
          border: 1px solid var(--line);
          color: var(--text);
          border-radius: 12px;
          padding: 12px 15px;
          font: inherit;
          font-size: 15px;
          outline: none;
        }
        .composer input::placeholder { color: #5d5a8f; }
        .composer input:focus { border-color: var(--violet); box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.25); }
        .composer input.rtl { font-family: 'Vazirmatn', sans-serif; }
        .send {
          background: linear-gradient(135deg, var(--violet), var(--blue));
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 0 22px;
          font: inherit;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 0 20px -6px rgba(168, 85, 247, 0.9);
        }
        .send:disabled { opacity: 0.4; cursor: not-allowed; box-shadow: none; }

        .why:focus-visible, .choice:focus-visible, .chip:focus-visible, .send:focus-visible {
          outline: 2px solid var(--cyan);
          outline-offset: 2px;
        }
        .error { margin: 10px 20px 0; font-size: 13px; color: #fca5a5; }

        @media (max-width: 560px) {
          .row { max-width: 94%; }
          .alts li { grid-template-columns: 100px 1fr 34px; }
        }
        @media (prefers-reduced-motion: reduce) { .dot { animation: none; } }
      `}</style>

      <header className="header">
        <h1>A campus assistant that knows when it doesn&apos;t know</h1>
        <p className="subtitle">
          Ask about the library, deadlines, fees, visas, housing, Wi-Fi, exams or funding, in English
          or Persian. When it isn&apos;t sure, it asks you to choose; when a question is off-topic, it
          says so instead of guessing.
        </p>
      </header>

      <main className="chat">
        <div className="messages" ref={scrollRef}>
          {messages.length === 0 && (
            <div className="empty">Try a question below — including the off-topic one, to see the bot decline.</div>
          )}

          {messages.map((m) => {
            const rtl = m.lang === 'fa' || m.data?.lang === 'fa';
            return (
              <div key={m.id} className={`row ${m.role}`}>
                <div className={`bubble ${m.role} ${rtl ? 'rtl' : ''}`}>{m.text}</div>
                {m.role === 'bot' && m.data && <Decision data={m.data} onPick={pickIntent} />}
              </div>
            );
          })}

          {loading && (
            <div className="typing" aria-label="Thinking">
              <span className="dot" /><span className="dot" /><span className="dot" />
            </div>
          )}
        </div>

        {error && <div className="error">{error}</div>}

        {messages.length === 0 && (
          <div className="suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} className={`chip ${isPersian(s) ? 'rtl' : ''}`} onClick={() => sendMessage(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        <form
          className="composer"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(message);
          }}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type in English or فارسی…"
            aria-label="Message"
            className={isPersian(message) ? 'rtl' : ''}
          />
          <button type="submit" className="send" disabled={loading || !message.trim()}>
            Send
          </button>
        </form>
      </main>
    </div>
  );
}
