
import { GoogleGenAI } from "@google/genai";

// Always use process.env.API_KEY directly as per SDK requirements
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStyleAssistantResponse = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: "Você é o assistente virtual da Man's Space - Barber Street. Seja educado, use um tom profissional e moderno (estilo barbearia premium). Ajude os clientes a escolherem cortes (degradê, social, freestyle) e barbas baseando-se no que eles descrevem. Se perguntarem sobre preços ou horários, cite que temos Corte por R$40 e Barba por R$40. Localização: Vale do Jatobá, BH.",
      },
    });
    // Accessing the .text property directly as per the latest SDK guidelines
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Desculpe, tive um pequeno problema técnico. Como posso ajudar com seu agendamento hoje?";
  }
};
