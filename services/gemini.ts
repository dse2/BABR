/* IMPORTANTE: Estamos usando a biblioteca correta para web agora */
import { GoogleGenerativeAI } from "@google/generative-ai";

/* AQUI O SEGREDO: Usamos import.meta.env para pegar a chave do Vite */
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const getStyleAssistantResponse = async (userMessage: string) => {
  try {
    /* Usando um modelo que funciona rápido e é gratuito para testes */
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      System Instruction: Você é o assistente virtual da Man's Space - Barber Street. Seja educado, use um tom profissional e moderno. Ajude com cortes e barbas. Preços: Corte R$40, Barba R$40. Local: Vale do Jatobá, BH.
      User Message: ${userMessage}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
    
  } catch (error) {
    console.error("Erro na IA:", error);
    return "Erro técnico. Tente novamente mais tarde.";
  }
};