import { postJson } from "./client.js";

export interface CreateRecordInput {
  id: string;
  name: string;
  description: string;
  timestamp?: string;
}

export interface CreateRecordResponse {
  message: string;
  record: {
    id: string;
    name: string;
    description: string;
    timestamp?: string;
  };
}

export async function createRecord(name: string, description: string): Promise<ApiResult<CreateRecordResponse>> {
  return postJson<CreateRecordResponse>("/api/records", {
    id: crypto.randomUUID(),
    name,
    description,
  });
}

type ApiResult<T> = { data: T } | { error: string };
