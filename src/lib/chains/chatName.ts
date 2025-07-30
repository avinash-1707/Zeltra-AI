import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export async function suggestChatName(message: string): Promise<string> {
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0.8,
    maxOutputTokens: 2048,
    topP: 1,
    topK: 40,
    apiKey: process.env.GEMINI_API_KEY,
  });

  const systemPrompt = `You are a side tool for an ai chatbot tool, your job is to suggest a chat session title for a chat session. You will be given the first message of the chat session, from the message you have to suggest a very short (3-4 words) title for the chat session. For example, if you recieve a message like 'i want to create a learning platform for students and professionals', then you will return 'Learning platform tool'. Don't return anything before or after the title, strictly the title only.
    
    Here is your message to return the chat title:
    
    Message : ${message}`;

  const res = await model.invoke(systemPrompt);
  return res.content.toString().trim();
}
