import { z } from "zod";

export const AnalyzeSchema = z.object({
  message: z.string().min(10, "Idea should be descriptive"),
  sessionId: z.string().uuid(), // Optional filter
  userId: z.string().uuid(),
  proceedToSerp: z.boolean().optional(),
  proceedToPrompt: z.boolean().optional(),
});
