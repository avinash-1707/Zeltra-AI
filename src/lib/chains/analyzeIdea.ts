import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ConversationChain } from "langchain/chains";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { prisma } from "../prisma";

// Setting up Gemini
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 0.5,
  maxOutputTokens: 2048,
  topP: 1,
  topK: 40,
  apiKey: process.env.GEMINI_API_KEY,
});

export async function analyzeIdeaChain(
  idea: string,
  sessionId: string
): Promise<string> {
  // Loading messages from db
  const messagesFromDB = await prisma.message.findMany({
    where: { sessionId },
    orderBy: { createdAt: "asc" },
  });

  //storing messages in history
  const messageHistory = new ChatMessageHistory();
  for (const msg of messagesFromDB) {
    if (msg.role === "human") {
      await messageHistory.addUserMessage(msg.content);
    }
    if (msg.role === "ai") {
      await messageHistory.addAIMessage(msg.content);
    }
  }

  //setting up buffer memory
  const memory = new BufferMemory({
    chatHistory: messageHistory,
    memoryKey: "chat_context",
    returnMessages: true,
  });

  const contexualizeQSystemPrompt = `You are an expert enterpreneur and a pro startup guy, the user have an idea which he want to create a startup on. You have to do the following things:
  > Try to figure out the niche of the idea and find out the necesarry features for some startup product in that niche.
   > Expand the idea that the user have just provided by your knowledge and by asking user specific questions to get the better idea of what the user wants to build.
    > The user will just give you a basic idea, you have to ask follow up questions to user to get what the user wants to build.
     > If the user is not sure, you have to expand the idea yourself by your knowledge.
      >Respond using GitHub-flavored Markdown syntax: use **bold**, *italic*, \n for line breaks, - for bullet points,and format clearly with spacing and structure. Avoid using HTML tags.`;

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

  const saveToDb = await prisma.message.createMany({
    data: [
      { sessionId, role: "human", content: idea },
      { sessionId, role: "ai", content: response.response },
    ],
  });

  console.log(response.response);
  if (saveToDb) return response.response;
  return "There is an error in saving message to Db";
}
