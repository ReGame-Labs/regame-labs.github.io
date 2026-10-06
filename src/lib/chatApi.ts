import type { Locale } from './i18n'

const API = (import.meta.env.VITE_CHAT_API_URL ?? '').replace(/\/+$/, '')
export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY ?? ''
export const chatEnabled = API !== '' && TURNSTILE_SITE_KEY !== ''

export interface ChatMessage {
  id: number
  sender: 'visitor' | 'owner'
  body: string
  createdAt: number
}

/** `code` is the Worker's error code, or 'network' when it couldn't be reached */
export class ChatError extends Error {
  readonly code: string
  readonly status: number

  constructor(code: string, status: number) {
    super(code)
    this.code = code
    this.status = status
  }
}

async function request<T>(path: string, init: RequestInit & { token?: string; json?: unknown } = {}): Promise<T> {
  const headers = new Headers(init.headers)
  if (init.token) headers.set('Authorization', `Bearer ${init.token}`)
  if (init.json !== undefined) headers.set('Content-Type', 'application/json')

  let res: Response
  try {
    res = await fetch(`${API}${path}`, { ...init, headers, body: init.json !== undefined ? JSON.stringify(init.json) : init.body })
  } catch {
    throw new ChatError('network', 0)
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new ChatError(typeof data.error === 'string' ? data.error : 'generic', res.status)
  return data as T
}

export const chatApi = {
  status: () => request<{ online: boolean }>('/status'),

  start: (message: string, locale: Locale, turnstileToken: string) =>
    request<{ token: string; conversationId: number; messages: ChatMessage[] }>('/conversations', {
      method: 'POST',
      json: { message, locale, turnstileToken },
    }),

  send: (token: string, message: string) =>
    request<{ message: ChatMessage }>('/messages', { method: 'POST', token, json: { message } }),

  poll: (token: string, after: number) =>
    request<{ messages: ChatMessage[]; online: boolean; email: string | null }>(`/messages?after=${after}`, { token }),

  setEmail: (token: string, email: string | null) =>
    request<{ email: string | null }>('/contact', { method: 'PUT', token, json: { email } }),
}
