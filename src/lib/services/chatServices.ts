import { prisma } from "../prisma";

export async function createNewChat({
  title,
  userId,
}: {
  title: string;
  userId: string;
}) {
  if (!title || !userId) {
    throw new Error("Title and User ID are required to create a chat.");
  }

  const newChat = await prisma.chatSession.create({
    data: {
      title,
      userId,
    },
  });

  return { sessionId: newChat.id };
}
