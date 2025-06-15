import { z } from "zod";
import { ChatMessageSchema } from "./chatMessageSchema";

export const ChatSessionSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid(),
  title: z.string().min(1).max(100),
  messages: z.array(ChatMessageSchema),
  createdAt: z.string().optional(),
});
