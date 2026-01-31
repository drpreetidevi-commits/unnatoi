/**
 * AI Service for Palm Reader App
 * Handles communication with OpenRouter API.
 */

const BASE_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

// 🧠 Model Configurations
const MODELS = {
  TEXT: 'liquid/lfm-2.5-1.2b-thinking:free', // Logic & Reasoning
  VISION: 'allenai/molmo-2-8b:free'          // Image Analysis
};

/**
 * 🛡️ STRICT SYSTEM PROMPT
 * Enforces the non-predictive, spiritual, and calm nature of the app.
 */
const BASE_SYSTEM_PROMPT = `
You are a wise, empathetic, and spiritual Palm Reader and Astrologer AI.
Your purpose is to provide guidance, reflection, and insight, NOT to predict the future.

🚨 ABSOLUTE RULES:
1. NEVER make absolute predictions (e.g., "You will marry next year"). instead say "You may find opportunities for connection."
2. NEVER give medical, legal, or financial advice.
3. NEVER use fear-based language (e.g., "curse", "danger", "death", "bad omen").
4. ALWAYS keep the tone calm, mystical, supportive, and positive.
5. ALWAYS provide long-form, structured answers.
6. If a user asks about death or health, gently redirect them to professional help and focus on emotional well-being.
7. Focus on "Potential", "Energy", "Tendencies", and "Self-Reflection".

STRUCTURE YOUR RESPONSE:
- Use smooth, flowing sentences.
- Use bullet points for key insights.
- End with a short, uplifting affirmation.
`;

/**
 * Generate a chat response based on conversation history.
 * @param {Array} messages - Chat history [{role: 'user', content: '...'}, ...]
 * @param {String} language - User's selected language (e.g., 'en', 'hi')
 */
export const getChatCompletion = async (messages, language = 'en') => {
  try {
    if (!API_KEY) throw new Error('API Key is missing');

    const localizedSystemPrompt = `${BASE_SYSTEM_PROMPT}\n\nIMPORTANT: Respond strictly in the following language code: ${language}.`;

    const payload = {
      model: MODELS.TEXT,
      messages: [
        { role: 'system', content: localizedSystemPrompt },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 1000,
    };

    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'HTTP-Referer': window.location.origin,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'AI Service Error');
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'The stars are silent at the moment. Please try again.';

  } catch (error) {
    console.error('AI Chat Error:', error);
    return 'I sense a disturbance in the connection. Please breathe and try again shortly.';
  }
};

/**
 * Analyze a Palm Image using Vision AI.
 * @param {String} base64Image - Base64 encoded image string
 * @param {String} language - Output language
 */
export const analyzePalmImage = async (base64Image, language = 'en') => {
  try {
    if (!API_KEY) throw new Error('API Key is missing');

    const prompt = `
      Look at this palm closely. Identify the major lines (Heart Line, Head Line, Life Line, Fate Line) if visible.
      Provide a spiritual interpretation of the hand's shape and lines.
      
      Do NOT predict the future. Focus on personality traits, emotional style, and potential energy.
      Format the output as valid JSON with these keys:
      {
        "heart_line": "interpretation...",
        "head_line": "interpretation...",
        "life_line": "interpretation...",
        "fate_line": "interpretation...",
        "summary": "overall spiritual summary..."
      }
      Respond in language: ${language}.
    `;

    const payload = {
      model: MODELS.VISION,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url: base64Image } }
          ]
        }
      ],
      temperature: 0.5,
      max_tokens: 1200,
    };

    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'HTTP-Referer': window.location.origin,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error('Vision AI Error');

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    // Helper to extract JSON from markdown code blocks if necessary
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    // Fallback if model doesn't return strict JSON
    return {
      summary: content,
      heart_line: "Analysis blended in summary.",
      head_line: "Analysis blended in summary.",
      life_line: "Analysis blended in summary.",
      fate_line: "Analysis blended in summary."
    };

  } catch (error) {
    console.error('AI Vision Error:', error);
    throw error;
  }
};
