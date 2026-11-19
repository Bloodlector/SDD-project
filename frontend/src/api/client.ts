const API_URL = "http://localhost:3000";

type ApiResult<T> = { data: T } | { error: string };

type ErrorResponse = { message?: string };

export async function postJson<T>(path: string, body: Record<string, unknown>): Promise<ApiResult<T>> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const response = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data: unknown = await response.json();

    if (response.ok) {
      return { data: data as T };
    }

    if (response.status === 0) {
      return { error: "Ошибка сети" };
    }

    if (response.status === 504 || response.status === 504) {
      return { error: "Превышено время ожидания" };
    }

    const errorResponse = data as ErrorResponse;
    return { error: errorResponse.message ?? "Ошибка сервера" };
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return { error: "Превышено время ожидания" };
    }
    return { error: "Ошибка сети" };
  }
}
