import { randomUUID } from "node:crypto";
import { publishRecord } from "./repository.js";
import type { CreateRecordInput } from "./schemas.js";

export interface RecordDto {
  id: string;
  name: string;
  description: string;
  timestamp?: string;
}

export async function createRecord(input: CreateRecordInput): Promise<RecordDto> {
  const now = new Date().toISOString();
  const record: RecordDto = {
    id: randomUUID(),
    name: input.name,
    description: input.description,
    timestamp: now,
  };

  await publishRecord(record);
  return record;
}
