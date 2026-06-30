module.exports = [
"[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("styled-jsx/style.js", () => require("styled-jsx/style.js"));

module.exports = mod;
}),
"[project]/src/pages/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
;
const SUGGESTIONS = [
    {
        label: 'hello',
        lang: 'en'
    },
    {
        label: 'how are you',
        lang: 'en'
    },
    {
        label: 'سلام',
        lang: 'fa'
    },
    {
        label: 'چه خبر؟',
        lang: 'fa'
    }
];
const SENTIMENT_STYLES = {
    positive: {
        label: 'positive',
        color: '#4B7B62'
    },
    negative: {
        label: 'negative',
        color: '#B3471F'
    },
    neutral: {
        label: 'neutral',
        color: '#8A8478'
    }
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "slip",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "slip-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "slip-key",
                        children: "intent"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.js",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "slip-val",
                        children: data.intent || 'None'
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.js",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/index.js",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "slip-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "slip-key",
                        children: "lang"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.js",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "slip-val",
                        children: data.lang
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.js",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/index.js",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            confidence !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "slip-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "slip-key",
                        children: "confidence"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.js",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "meter",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "meter-fill",
                            style: {
                                width: `${confidence}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/pages/index.js",
                            lineNumber: 45,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.js",
                        lineNumber: 44,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "slip-val slip-num",
                        children: [
                            confidence,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/index.js",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/index.js",
                lineNumber: 42,
                columnNumber: 9
            }, this),
            bucket && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "slip-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "slip-key",
                        children: "sentiment"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.js",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "sentiment-chip",
                        style: {
                            color: SENTIMENT_STYLES[bucket].color,
                            borderColor: SENTIMENT_STYLES[bucket].color
                        },
                        children: [
                            SENTIMENT_STYLES[bucket].label,
                            " · ",
                            data.sentiment.score.toFixed(2)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/index.js",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/index.js",
                lineNumber: 51,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/index.js",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
function Home() {
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }, [
        messages,
        loading
    ]);
    async function sendMessage(text) {
        const trimmed = text.trim();
        if (!trimmed || loading) return;
        const userMsg = {
            id: Date.now(),
            role: 'user',
            text: trimmed,
            lang: isPersian(trimmed) ? 'fa' : 'en'
        };
        setMessages((prev)=>[
                ...prev,
                userMsg
            ]);
        setMessage('');
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/nlp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: trimmed
                })
            });
            if (!res.ok) throw new Error('Request failed');
            const data = await res.json();
            setMessages((prev)=>[
                    ...prev,
                    {
                        id: Date.now() + 1,
                        role: 'bot',
                        text: data.answer || 'No match found.',
                        data
                    }
                ]);
        } catch  {
            setError("Couldn't reach the NLP engine. Is the dev server running?");
        } finally{
            setLoading(false);
        }
    }
    function handleSubmit(e) {
        e.preventDefault();
        sendMessage(message);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "jsx-d2bbabb052058959" + " " + "page",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "510a2673d49138f1",
                children: '@import "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,650&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;600&family=Vazirmatn:wght@400;600&display=swap";*{box-sizing:border-box}html,body,#__next{height:100%;margin:0}body{background:#16140f}'
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "90c84dacd65c1601",
                children: '.page.jsx-d2bbabb052058959{color:#ece6d8;background:radial-gradient(circle at 15% 0,#c4954a1a,#0000 45%),radial-gradient(circle at 85% 10%,#4f46e524,#0000 40%),#16140f;flex-direction:column;align-items:center;min-height:100vh;padding:28px 16px 16px;font-family:Inter,sans-serif;display:flex}.header.jsx-d2bbabb052058959{width:100%;max-width:640px;margin-bottom:18px}.eyebrow.jsx-d2bbabb052058959{letter-spacing:.18em;text-transform:uppercase;color:#c2956c;margin:0 0 6px;font-family:JetBrains Mono,monospace;font-size:11px}h1.jsx-d2bbabb052058959{color:#f6f1e4;margin:0 0 6px;font-family:Fraunces,serif;font-size:30px;font-weight:650}.subtitle.jsx-d2bbabb052058959{color:#9c9486;max-width:52ch;margin:0;font-size:14px;line-height:1.5}.chat-shell.jsx-d2bbabb052058959{background:#1c1a14;border:1px solid #2e2a21;border-radius:18px;flex-direction:column;flex:1;width:100%;max-width:640px;display:flex;overflow:hidden;box-shadow:0 30px 60px -25px #0009}.messages.jsx-d2bbabb052058959{flex-direction:column;flex:1;gap:14px;min-height:380px;max-height:56vh;padding:22px;display:flex;overflow-y:auto}.empty-state.jsx-d2bbabb052058959{text-align:center;color:#6f6859;max-width:36ch;margin:auto;font-size:13px}.row.jsx-d2bbabb052058959{flex-direction:column;max-width:86%;display:flex}.row.user.jsx-d2bbabb052058959{align-self:flex-end;align-items:flex-end}.row.bot.jsx-d2bbabb052058959{align-self:flex-start;align-items:flex-start}.bubble.jsx-d2bbabb052058959{word-break:break-word;border-radius:14px;padding:10px 14px;font-size:14.5px;line-height:1.5}.bubble.user.jsx-d2bbabb052058959{color:#fff;background:#4f46e5;border-bottom-right-radius:4px}.bubble.user.rtl.jsx-d2bbabb052058959{border-bottom-right-radius:14px;border-bottom-left-radius:4px}.bubble.bot.jsx-d2bbabb052058959{color:#efe9da;background:#2a271e;border-bottom-left-radius:4px}.bubble.bot.rtl.jsx-d2bbabb052058959{border-bottom-right-radius:4px;border-bottom-left-radius:14px}.rtl.jsx-d2bbabb052058959{text-align:right;direction:rtl;font-family:Vazirmatn,sans-serif}.slip.jsx-d2bbabb052058959{color:#2a2620;background:#f6f1e4;border-radius:2px;width:100%;margin-top:6px;padding:10px 12px 8px;font-family:JetBrains Mono,monospace;font-size:11px;position:relative}.slip.jsx-d2bbabb052058959:before{content:"";background-image:radial-gradient(circle,#16140f 2.5px,#0000 2.6px);background-position:0 -6px;background-size:12px 12px;height:6px;position:absolute;top:-1px;left:0;right:0}.slip-row.jsx-d2bbabb052058959{align-items:center;gap:8px;padding:2px 0;display:flex}.slip-key.jsx-d2bbabb052058959{color:#8a8167;text-transform:uppercase;letter-spacing:.06em;flex-shrink:0;width:72px}.slip-val.jsx-d2bbabb052058959{font-weight:600}.slip-num.jsx-d2bbabb052058959{text-align:right;width:36px}.meter.jsx-d2bbabb052058959{background:#e2dac4;border-radius:3px;flex:1;height:5px;overflow:hidden}.meter-fill.jsx-d2bbabb052058959{background:#c2790a;height:100%}.sentiment-chip.jsx-d2bbabb052058959{border:1px solid;border-radius:999px;padding:1px 8px;font-size:10.5px}.typing.jsx-d2bbabb052058959{background:#2a271e;border-radius:14px 14px 14px 4px;align-self:flex-start;gap:4px;padding:12px 14px;display:flex}.dot.jsx-d2bbabb052058959{background:#8a8167;border-radius:50%;width:6px;height:6px;animation:1.1s ease-in-out infinite bounce}.dot.jsx-d2bbabb052058959:nth-child(2){animation-delay:.15s}.dot.jsx-d2bbabb052058959:nth-child(3){animation-delay:.3s}@keyframes bounce{0%,60%,to{opacity:.5;transform:translateY(0)}30%{opacity:1;transform:translateY(-4px)}}.suggestions.jsx-d2bbabb052058959{flex-wrap:wrap;gap:8px;padding:0 18px 14px;display:flex}.chip.jsx-d2bbabb052058959{color:#c9c2ae;cursor:pointer;background:#2a271e;border:1px solid #3a362b;border-radius:999px;padding:6px 11px;font-family:JetBrains Mono,monospace;font-size:12px}.chip.jsx-d2bbabb052058959:hover{color:#f6f1e4;border-color:#c2956c}.composer.jsx-d2bbabb052058959{background:#1c1a14;border-top:1px solid #2e2a21;gap:8px;padding:14px;display:flex}.composer.jsx-d2bbabb052058959 input.jsx-d2bbabb052058959{color:#ece6d8;background:#16140f;border:1px solid #2e2a21;border-radius:10px;outline:none;flex:1;padding:11px 14px;font-family:inherit;font-size:14px}.composer.jsx-d2bbabb052058959 input.jsx-d2bbabb052058959::placeholder{color:#5f584a}.composer.jsx-d2bbabb052058959 input.jsx-d2bbabb052058959:focus{border-color:#4f46e5}.composer.jsx-d2bbabb052058959 input.rtl.jsx-d2bbabb052058959{direction:rtl;font-family:Vazirmatn,sans-serif}.send-btn.jsx-d2bbabb052058959{color:#fff;cursor:pointer;background:#4f46e5;border:none;border-radius:10px;padding:0 18px;font-size:14px;font-weight:600}.send-btn.jsx-d2bbabb052058959:disabled{opacity:.5;cursor:not-allowed}.send-btn.jsx-d2bbabb052058959:not(:disabled):hover{background:#4338ca}.error-banner.jsx-d2bbabb052058959{color:#e2a98a;margin:10px 18px 0;font-family:JetBrains Mono,monospace;font-size:12.5px}@media (prefers-reduced-motion:reduce){.dot.jsx-d2bbabb052058959{animation:none}}'
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-d2bbabb052058959" + " " + "header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "jsx-d2bbabb052058959" + " " + "eyebrow",
                        children: "NLP.js · bilingual intent engine"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.js",
                        lineNumber: 380,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        className: "jsx-d2bbabb052058959",
                        children: "Two-language chat lab"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.js",
                        lineNumber: 381,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "jsx-d2bbabb052058959" + " " + "subtitle",
                        children: "Every reply prints an analysis slip below it — the detected intent, language, confidence, and sentiment the model actually scored. Speak English or Persian."
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.js",
                        lineNumber: 382,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/index.js",
                lineNumber: 379,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-d2bbabb052058959" + " " + "chat-shell",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        ref: scrollRef,
                        className: "jsx-d2bbabb052058959" + " " + "messages",
                        children: [
                            messages.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-d2bbabb052058959" + " " + "empty-state",
                                children: "No messages yet — try a greeting below, in either language."
                            }, void 0, false, {
                                fileName: "[project]/src/pages/index.js",
                                lineNumber: 391,
                                columnNumber: 13
                            }, this),
                            messages.map((m)=>{
                                const rtl = m.lang === 'fa' || m.data && m.data.lang === 'fa';
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-d2bbabb052058959" + " " + `row ${m.role}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "jsx-d2bbabb052058959" + " " + `bubble ${m.role} ${rtl ? 'rtl' : ''}`,
                                            children: m.text
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/index.js",
                                            lineNumber: 400,
                                            columnNumber: 17
                                        }, this),
                                        m.role === 'bot' && m.data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(AnalysisSlip, {
                                            data: m.data
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/index.js",
                                            lineNumber: 401,
                                            columnNumber: 48
                                        }, this)
                                    ]
                                }, m.id, true, {
                                    fileName: "[project]/src/pages/index.js",
                                    lineNumber: 399,
                                    columnNumber: 15
                                }, this);
                            }),
                            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-d2bbabb052058959" + " " + "typing",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "jsx-d2bbabb052058959" + " " + "dot"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/index.js",
                                        lineNumber: 408,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "jsx-d2bbabb052058959" + " " + "dot"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/index.js",
                                        lineNumber: 408,
                                        columnNumber: 39
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "jsx-d2bbabb052058959" + " " + "dot"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/index.js",
                                        lineNumber: 408,
                                        columnNumber: 63
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/index.js",
                                lineNumber: 407,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/index.js",
                        lineNumber: 389,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-d2bbabb052058959" + " " + "error-banner",
                        children: [
                            "⚠ ",
                            error
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/index.js",
                        lineNumber: 413,
                        columnNumber: 19
                    }, this),
                    messages.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-d2bbabb052058959" + " " + "suggestions",
                        children: SUGGESTIONS.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>sendMessage(s.label),
                                className: "jsx-d2bbabb052058959" + " " + "chip",
                                children: s.label
                            }, s.label, false, {
                                fileName: "[project]/src/pages/index.js",
                                lineNumber: 418,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.js",
                        lineNumber: 416,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                        onSubmit: handleSubmit,
                        className: "jsx-d2bbabb052058959" + " " + "composer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: message,
                                onChange: (e)=>setMessage(e.target.value),
                                placeholder: "Type in English or فارسی...",
                                className: "jsx-d2bbabb052058959" + " " + ((isPersian(message) ? 'rtl' : '') || "")
                            }, void 0, false, {
                                fileName: "[project]/src/pages/index.js",
                                lineNumber: 426,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: loading || !message.trim(),
                                className: "jsx-d2bbabb052058959" + " " + "send-btn",
                                children: "Send"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/index.js",
                                lineNumber: 433,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/index.js",
                        lineNumber: 425,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/index.js",
                lineNumber: 388,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/index.js",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__08pesl6._.js.map