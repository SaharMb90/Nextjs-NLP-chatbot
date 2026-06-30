module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/src/lib/nlp.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "processMessage",
    ()=>processMessage,
    "trainNLP",
    ()=>trainNLP
]);
/* eslint-disable @typescript-eslint/no-require-imports */ var __TURBOPACK__imported__module__$5b$externals$5d2f$node$2d$nlp__$5b$external$5d$__$28$node$2d$nlp$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$node$2d$nlp$29$__ = __turbopack_context__.i("[externals]/node-nlp [external] (node-nlp, cjs, [project]/node_modules/node-nlp)");
;
const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const path = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
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
const manager = new __TURBOPACK__imported__module__$5b$externals$5d2f$node$2d$nlp__$5b$external$5d$__$28$node$2d$nlp$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$node$2d$nlp$29$__["NlpManager"]({
    languages: supportedLanguages,
    forceNER: true
});
let trained = false;
async function trainNLP() {
    if (trained) {
        console.log('NLP model is already trained.');
        return;
    }
    try {
        for (const lang of supportedLanguages){
            const { documents, answers } = trainingData[lang];
            documents.forEach((doc)=>manager.addDocument(lang, doc.text, doc.intent));
            for(const intent in answers){
                manager.addAnswer(lang, intent, answers[intent]);
            }
        }
        await manager.train();
        trained = true;
        console.log('NLP model trained (in-memory, not persisted to disk).');
    } catch (error) {
        console.error('Error during NLP training:', error);
        throw new Error('Failed to train NLP model');
    }
}
async function processMessage(text) {
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
            score: result.score
        };
    } catch (error) {
        console.error('Error processing message:', error);
        throw new Error('Failed to process the message');
    }
}
}),
"[project]/src/pages/api/nlp.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$nlp$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/nlp.js [api] (ecmascript)");
;
let trained = false;
async function handler(req, res) {
    // Ensure that only POST requests are allowed
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed'
        });
    }
    try {
        // Ensure the request has a 'message' body
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({
                error: 'Message is required'
            });
        }
        // Train the NLP model if it hasn't been trained yet
        if (!trained) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$nlp$2e$js__$5b$api$5d$__$28$ecmascript$29$__["trainNLP"])();
            trained = true;
        }
        // Process the message with the trained model
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$nlp$2e$js__$5b$api$5d$__$28$ecmascript$29$__["processMessage"])(message);
        // Return the result as a JSON response
        return res.status(200).json(result);
    } catch (error) {
        console.error('API error:', error);
        return res.status(500).json({
            error: error.message,
            stack: error.stack
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0o_i30d._.js.map