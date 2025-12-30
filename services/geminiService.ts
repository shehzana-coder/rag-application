
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Initialize GoogleGenAI with API key directly from process.env.API_KEY as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const refineAndCategorize = async (rawText: string, url: string) => {
  try {
    // Fix: Using generateContent with systemInstruction and proper Gemini 3 model
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `RAW TEXT: ${rawText.substring(0, 3000)}`,
      config: {
        systemInstruction: `You are an intelligent RAG assistant.
        Refine the raw web text provided from the URL ${url}. 
        1. Clean noise, ads, and navigation elements.
        2. Group the data by similarity category.
        3. Return as a clean JSON.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            refinedContent: { type: Type.STRING },
            category: { type: Type.STRING },
            similarityScore: { type: Type.NUMBER }
          },
          required: ["refinedContent", "category"]
        }
      }
    });

    // Fix: Access response.text directly (property, not a method)
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini refinement failed:", error);
    return { refinedContent: rawText, category: "Uncategorized" };
  }
};
