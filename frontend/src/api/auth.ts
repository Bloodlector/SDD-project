import { postJson } from "./client.js";

export interface AuthResponse {
  message: string;
  user: { id: string; username: string };
}

export interface ValidationError {
  code: string;
  message: string;
  errors: unknown[];
}

export async function login(username: string, password: string): Promise<ApiResult<AuthResponse>> {
  return postJson<AuthResponse>("/api/auth/login", { username, password });
}

export async function register(username: string, password: string): Promise<ApiResult<AuthResponse>> {
  return postJson<AuthResponse>("/api/auth/register", { username, password });
}

type ApiResult<T> = { data: T } | { error: string };
