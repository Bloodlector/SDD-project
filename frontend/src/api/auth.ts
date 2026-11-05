const API_URL = "http://localhost:3000";

export interface AuthResponse {
  message: string;
  user: { id: string; username: string };
}

export interface ValidationError {
  code: string;
  message: string;
  errors: unknown[];
}

type ApiResult<T> = { data: T } | { error: string };

type ErrorResponse = { message?: string };

async function request<T>(path: string, body: Record<string, string>): Promise<ApiResult<T>> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data: unknown = await response.json();

    if (response.ok) {
      return { data: data as T };
    }

    const errorResponse = data as ErrorResponse;
    return { error: errorResponse.message ?? "Ошибка сервера" };
  } catch {
    return { error: "Не удалось подключиться к серверу" };
  }
}

export async function login(username: string, password: string): Promise<ApiResult<AuthResponse>> {
  return request<AuthResponse>("/api/auth/login", { username, password });
}

export async function register(username: string, password: string): Promise<ApiResult<AuthResponse>> {
  return request<AuthResponse>("/api/auth/register", { username, password });
}
