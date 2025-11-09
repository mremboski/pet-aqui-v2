export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5174";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function api<T>(
  path: string,
  options: { method?: HttpMethod; body?: any; token?: string } = {}
): Promise<T> {
  const { method = "GET", body, token } = options;
  
  const url = `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`Erro API ${method} ${url} -> ${res.status}: ${text}`);
    throw new Error(`API ${method} ${path} -> ${res.status}`);
  }

  return res.json() as Promise<T>;
}
