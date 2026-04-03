const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? '/api'

type RequestOptions = Omit<RequestInit, 'method' | 'body'>

async function request<T>(
  method: string,
  endpoint: string,
  body?: unknown,
  options?: RequestOptions,
): Promise<T> {
  const url = `${API_BASE}${endpoint}`

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export function getApi<T>(endpoint: string, options?: RequestOptions): Promise<T> {
  return request<T>('GET', endpoint, undefined, options)
}

export function postApi<T>(endpoint: string, body: unknown, options?: RequestOptions): Promise<T> {
  return request<T>('POST', endpoint, body, options)
}

export function putApi<T>(endpoint: string, body: unknown, options?: RequestOptions): Promise<T> {
  return request<T>('PUT', endpoint, body, options)
}

export function deleteApi<T>(endpoint: string, options?: RequestOptions): Promise<T> {
  return request<T>('DELETE', endpoint, undefined, options)
}
