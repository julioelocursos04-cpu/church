import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getVerseOfTheDay() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Gere um versículo bíblico aleatório em português e uma breve reflexão de 2 linhas para o dia de hoje. Retorne apenas o versículo, o endereço bíblico e a reflexão.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            verse: { type: "string" },
            reference: { type: "string" },
            reflection: { type: "string" }
          },
          required: ["verse", "reference", "reflection"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error fetching verse:", error);
    return {
      verse: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.",
      reference: "João 3:16",
      reflection: "Um lembrete do amor infinito de Deus por nós."
    };
  }
}
