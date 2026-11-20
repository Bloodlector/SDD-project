import { z } from "zod";

export const messageSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  timestamp: z.string().datetime().optional(),
});

export type MessageDto = z.infer<typeof messageSchema>;
