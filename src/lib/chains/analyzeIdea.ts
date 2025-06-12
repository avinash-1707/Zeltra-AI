import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";

// Setting up Gemini
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 0.5,
  maxOutputTokens: 2048,
  topP: 1,
  topK: 40,
  apiKey: process.env.GEMINI_API_KEY,
});

// Buffer memory for temporary storage
const memory = new BufferMemory({
  returnMessages: true,
  memoryKey: "chat_context",
});

export async function analyzeIdeaChain(idea: string): Promise<string> {
  const contexualizeQSystemPrompt = `You are an expert enterpreneur and a pro startup guy, the user have an idea which he want to create a startup on. You have to do the following things:
  > Try to figure out the niche of the idea and find out the necesarry features for some startup product in that niche.
   > Expand the idea that the user have just provided by your knowledge and by asking user specific questions to get the better idea of what the user wants to build.
    > The user will just give you a basic idea, you have to ask follow up questions to user to get what the user wants to build.
     > If the user is not sure, you have to expand the idea yourself by your knowledge.`;

  const contexualizeQPrompt = ChatPromptTemplate.fromMessages([
    ["system", contexualizeQSystemPrompt],
    new MessagesPlaceholder("chat_context"),
    ["human", "{idea}"],
  ]);

  const chain = new ConversationChain({
    prompt: contexualizeQPrompt,
    llm: model,
    memory,
  });

  const response = await chain.call({ idea });
  return response.response;
}
