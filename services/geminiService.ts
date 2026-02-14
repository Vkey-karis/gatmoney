
import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION_BASE } from '../constants';
import { GeneratedGig, Language, BusinessReport } from '../types';

/**
 * Strict adherence to SDK rules.
 * API key exclusively from process.env.API_KEY.
 */
const getClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export interface ChatResponse {
  text: string;
  sources?: { title: string; uri: string }[];
}

/**
 * Global Support Bot Logic - Search-grounded for up-to-date app and market support.
 */
export const getSupportResponse = async (message: string, history: any[]): Promise<string> => {
  const ai = getClient();
  const systemInstruction = `
    You are the "GAT Support Hero" for GATSMONEY.com.
    Your mission is to help users navigate the app and understand the GAT (Gig, Action, Tool) strategy.
    
    APP STRUCTURE:
    - Hub (Dashboard): Overview of earnings and visual GAT flow.
    - Find Gigs (Generator): The engine where users input skills to get a GAT plan.
    - Learn GAT: Lessons on how to scale to $10k/month.
    - My Library: Where saved GAT plans are stored.
    - Video/Image Studios: Tools to fulfill gigs.
    - AI Coach: Deeper strategy consultation.
    
    Always use Google Search to provide current context about gig platforms or AI tools.
    Keep responses friendly, very short, and encouraging.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [...history, { role: 'user', parts: [{ text: message }] }],
      config: {
        systemInstruction,
        tools: [{ googleSearch: {} }]
      }
    });
    return response.text || "I'm here to help! How can I assist you with your GAT strategy?";
  } catch (error) {
    console.error("Support Bot Error:", error);
    return "I'm having a small glitch. Try the AI Coach for deep help!";
  }
};

/**
 * Main Coaching Logic - Using gemini-3-flash-preview with search grounding for real-time market data.
 */
export const chatWithCoach = async (
  history: { role: string; text: string }[],
  message: string,
  useThinking: boolean = false,
  language: Language = 'EN'
): Promise<ChatResponse> => {
  const ai = getClient();
  const chatHistory = history.map(h => ({
    role: h.role,
    parts: [{ text: h.text }]
  }));

  try {
    // Standardizing on gemini-3-flash-preview for fast, search-grounded market analysis.
    const model = 'gemini-3-flash-preview';
    const localizedInstruction = `${SYSTEM_INSTRUCTION_BASE}\nIMPORTANT: RESPOND ENTIRELY IN THE LANGUAGE CODE: ${language}.`;

    const config: any = {
      systemInstruction: localizedInstruction,
      tools: [{ googleSearch: {} }]
    };

    const chat = ai.chats.create({
      model: model,
      config: config,
      history: chatHistory
    });

    const currentYear = new Date().getFullYear();
    const result = await chat.sendMessage({ message: `[SEARCH THE WEB FOR LATEST ${currentYear} TRENDS. RESPOND IN ${language}] ${message}` });

    const sources = result.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.filter(chunk => chunk.web)
      ?.map(chunk => ({ title: chunk.web.title, uri: chunk.web.uri })) || [];

    return {
      text: result.text || "I couldn't generate a response.",
      sources: sources.length > 0 ? sources : undefined
    };
  } catch (error) {
    console.error("Chat Error:", error);
    return { text: "Connection error with the GAT neural network. Please retry." };
  }
};

export interface GeneratedGigWithSources extends GeneratedGig {
  sources?: { title: string; uri: string }[];
}

export interface BusinessReportWithSources extends BusinessReport {
  sources?: { title: string; uri: string }[];
}

/**
 * GAT Strategy Generation - Uses Search Grounding to find high-value gaps.
 */
export const generateGATStrategy = async (
  skills: string,
  interests: string,
  language: Language = 'EN'
): Promise<GeneratedGigWithSources | null> => {
  const ai = getClient();

  const currentYear = new Date().getFullYear();
  const prompt = `
    Based on the user's skills: "${skills}" and interests: "${interests}", 
    generate a LIVE, HIGH-VALUE GAT (Gig + Action + Tool) strategy for ${currentYear}.
    
    USE GOOGLE SEARCH to find actual gig postings or emerging gaps in markets like Fiverr/Upwork.
    Find specific AI tool releases from late ${currentYear - 1}/early ${currentYear}.
    
    Return the response in JSON format matching the schema.
    IMPORTANT: TRANSLATE ALL CONTENT IN THE JSON VALUES TO LANGUAGE CODE: ${language}.
  `;

  try {
    const localizedInstruction = `${SYSTEM_INSTRUCTION_BASE}\nRESPOND IN LANGUAGE: ${language}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: localizedInstruction,
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            gigTitle: { type: Type.STRING },
            actionPlan: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            recommendedTools: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            estimatedEarnings: { type: Type.STRING },
            pricingBands: {
              type: Type.OBJECT,
              properties: {
                low: { type: Type.STRING },
                mid: { type: Type.STRING },
                high: { type: Type.STRING }
              }
            },
            competitionDensity: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
            aiLeverageScore: { type: Type.NUMBER },
            marketConfidence: { type: Type.NUMBER }
          },
          required: ["gigTitle", "actionPlan", "recommendedTools", "estimatedEarnings", "pricingBands", "competitionDensity", "aiLeverageScore", "marketConfidence"]
        }
      }
    });

    if (response.text) {
      const gig = JSON.parse(response.text.trim()) as GeneratedGig;
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.filter(chunk => chunk.web)
        ?.map(chunk => ({ title: chunk.web.title, uri: chunk.web.uri })) || [];

      return { ...gig, sources: sources.length > 0 ? sources : undefined };
    }
    return null;

  } catch (error) {
    console.error("Generation Error:", error);
    return null;
  }
};

/**
 * Business Intelligence Generation
 */
export const generateBusinessIntelligence = async (
  industry: string,
  region: string,
  goals: string
): Promise<BusinessReportWithSources | null> => {
  const ai = getClient();
  const currentYear = new Date().getFullYear();

  const prompt = `
    ACT AS AN EXPERT BUSINESS STRATEGIST.
    
    TASK: Analyze the ${industry} industry in ${region} for ${currentYear}.
    STRATEGIC GOALS: "${goals}".
    
    STEP 1: USE GOOGLE SEARCH to find real-time market data, trends, and forum discussions.
    STEP 2: Synthesize the findings into a structured report.  
    
    OUTPUT FORMAT:
    You must return a valid JSON object wrapped in \`\`\`json\`\`\` code block.
    The JSON structure must be:
    {
      "industry": "string",
      "region": "string",
      "serviceGaps": ["string", "string", "string"],
      "competitorWeaknesses": ["string", "string", "string"],
      "automationOpportunities": [
        { "area": "string", "tool": "string", "estimatedRoi": "string" }
      ],
      "revenueExpansion": ["string", "string"],
      "implementationRoadmap": [
        { "phase": "string", "actions": ["string", "string"] }
      ],
      "marketConfidence": number (0-100),
      "trendDirection": "Up" | "Down" | "Stable"
    }
    
    Your response must contain ONLY the JSON block. Do not include introductory text.
    Ensure "serviceGaps", "competitorWeaknesses", "automationOpportunities", and "implementationRoadmap" have at least 3 items each. 
    Translate all content to language code: EN.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_BASE,
        tools: [{ googleSearch: {} }],
        // responseMimeType: "application/json", <--- REMOVED strict schema to allow tool use flexibility
      }
    });

    if (response.text) {
      let jsonString = response.text.trim();
      // Clean up markdown code blocks if present
      if (jsonString.includes('```json')) {
        jsonString = jsonString.split('```json')[1].split('```')[0].trim();
      } else if (jsonString.includes('```')) {
        jsonString = jsonString.split('```')[1].split('```')[0].trim();
      }

      const report = JSON.parse(jsonString) as BusinessReport;
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.filter(chunk => chunk.web)
        ?.map(chunk => ({ title: chunk.web.title, uri: chunk.web.uri })) || [];

      return { ...report, sources: sources.length > 0 ? sources : undefined };
    }
    return null;
  } catch (error) {
    console.error("Business Intel Error:", error);
    return null;
  }
};

export const generateVideo = async (prompt: string, durationSeconds: number = 5): Promise<string | null> => {
  if ((window as any).aistudio) {
    const hasKey = await (window as any).aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await (window as any).aistudio.openSelectKey();
    }
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9',
        durationSeconds: durationSeconds,
      }
    });

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (downloadLink) {
      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    }
    return null;
  } catch (error) {
    console.error("Video Gen Error:", error);
    throw error;
  }
};

export const editImage = async (imageBase64: string, mimeType: string, prompt: string): Promise<string | null> => {
  const ai = getClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ inlineData: { data: imageBase64, mimeType } }, { text: prompt }]
      }
    });
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return null;
  } catch (error) {
    console.error("Image Edit Error:", error);
    throw error;
  }
};
