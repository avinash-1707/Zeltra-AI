import { z } from "zod";

export const ChatMessageSchema = z.object({
  id: z.string().uuid().optional(),
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1),
  createdAt: z.string().optional(), // ISO format
});
