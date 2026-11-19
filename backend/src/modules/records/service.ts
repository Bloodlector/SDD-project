import { randomUUID } from "node:crypto";
import { publishRecord } from "./repository.js";
import type { CreateRecordInput } from "./schemas.js";

export interface RecordDto {
  id: string;
  name: string;
  description: string;
}

export async function createRecord(input: CreateRecordInput): Promise<RecordDto> {
  const record: RecordDto = {
    id: randomUUID(),
    name: input.name,
    description: input.description,
  };

  await publishRecord(record);
  return record;
}
