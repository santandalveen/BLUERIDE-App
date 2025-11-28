import { GoogleGenAI, Chat } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the BlueRide Assistant, a helpful customer support agent for BlueRide Malawi.
Your goal is to assist users with:
1. Booking a ride (Taxi services) - Emphasize speed and reliability.
2. Renting a car - We have sedans, SUVs, minibuses, and luxury vehicles.
3. Becoming a driver - Explain they can earn money with their own car, bike, or minibus.

Tone: Friendly, professional, and Malawian-warmth.
Formatting: Keep responses concise (under 100 words unless detailed info is requested).
If a user wants to book or apply, guide them to use the buttons on the main page, but you can answer questions about the process.
Pricing: Prices vary by distance and vehicle type. Renting starts from affordable daily rates.
Location: Malawi (Lilongwe, Blantyre, Mzuzu, etc.).
`;

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string) => {
  const chat = getChatSession();
  try {
    const response = await chat.sendMessageStream({ message });
    return response;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};
