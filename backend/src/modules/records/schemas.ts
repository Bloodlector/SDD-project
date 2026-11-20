import { z } from "zod";

export const RECORD_NAME_MAX = 20;
export const RECORD_DESCRIPTION_MAX = 2000;

export const createRecordSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1).max(RECORD_NAME_MAX),
  description: z.string().trim().max(RECORD_DESCRIPTION_MAX),
  timestamp: z.string().optional(),
});

export type CreateRecordInput = z.infer<typeof createRecordSchema>;
