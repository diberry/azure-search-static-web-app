const runtimeBackendUrl =
  (typeof window !== 'undefined' && window.__APP_CONFIG__?.BACKEND_URL) || '';
const baseURL = import.meta.env.DEV
  ? (import.meta.env.VITE_REACT_APP_BACKEND_URL || 'http://localhost:7071')
  : (runtimeBackendUrl || import.meta.env.VITE_REACT_APP_BACKEND_URL || '');

type QueryValue = string | number | boolean;

interface FetchOptions {
  query?: Record<string, QueryValue>;
  body?: unknown;
  headers?: Record<string, string>;
  method?: string;
  signal?: AbortSignal;
}

function buildQueryString(params: Record<string, QueryValue>): string {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

export default async function fetchInstance<T>(
  url: string,
  {
    query = {},
    body = null,
    headers = {},
    method = 'GET',
    signal,
  }: FetchOptions = {},
): Promise<T> {
  const queryString = buildQueryString(query);
  const fullUrl = baseURL
    ? `${baseURL}${url}${queryString ? `?${queryString}` : ''}`
    : `${url}${queryString ? `?${queryString}` : ''}`;
  const response = await fetch(fullUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
    signal,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
