import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ChatError, chatApi, type ChatMessage, type Handler } from '../lib/chatApi'
import type { Locale } from '../lib/i18n'

interface ChatState {
  /** Proves this browser owns the conversation; the Worker only keeps its hash */
  token: string | null
  email: string | null
  /** The newest owner message the visitor has seen, for the unread badge */
  lastSeenId: number

  open: boolean
  messages: ChatMessage[]
  online: boolean
  handler: Handler
  /** When the visitor last wrote to the assistant, until its answer arrives */
  waitingSince: number | null
  sending: boolean
  error: string | null
  turnstileToken: string | null
  /** Bumped to get a fresh captcha after one was used or rejected */
  captchaNonce: number

  setOpen: (open: boolean) => void
  setTurnstileToken: (token: string | null) => void
  refresh: () => Promise<void>
  send: (text: string, locale: Locale) => Promise<boolean>
  saveEmail: (email: string | null) => Promise<boolean>
  markSeen: () => void
}

const merge = (current: ChatMessage[], incoming: ChatMessage[]) => {
  const known = new Set(current.map((m) => m.id))
  const added = incoming.filter((m) => !known.has(m.id))
  return added.length ? [...current, ...added].sort((a, b) => a.id - b.id) : current
}

/** How long the widget shows the assistant typing before it gives up waiting */
const TYPING_TIMEOUT_MS = 60000

const errorCode = (error: unknown) => (error instanceof ChatError ? error.code : 'generic')

export const unreadCount = (s: Pick<ChatState, 'messages' | 'lastSeenId'>) =>
  s.messages.filter((m) => m.sender !== 'visitor' && m.id > s.lastSeenId).length

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      token: null,
      email: null,
      lastSeenId: 0,
      open: false,
      messages: [],
      online: false,
      handler: 'bot',
      waitingSince: null,
      sending: false,
      error: null,
      turnstileToken: null,
      captchaNonce: 0,

      setOpen: (open) => set({ open, error: null }),

      setTurnstileToken: (turnstileToken) => set({ turnstileToken }),

      // New messages for an existing conversation, or just availability before one exists
      refresh: async () => {
        const { token, messages } = get()
        try {
          if (!token) {
            set({ online: (await chatApi.status()).online })
            return
          }
          const after = messages.at(-1)?.id ?? 0
          const data = await chatApi.poll(token, after)
          // the token may have been answered while this request was in flight
          if (get().token !== token) return
          const answered = data.handler === 'owner' || data.messages.some((m) => m.sender !== 'visitor')
          const expired = (since: number | null) => since !== null && Date.now() - since > TYPING_TIMEOUT_MS
          set((s) => ({
            messages: merge(s.messages, data.messages),
            online: data.online,
            email: data.email,
            handler: data.handler,
            waitingSince: answered || expired(s.waitingSince) ? null : s.waitingSince,
          }))
        } catch (error) {
          // a token the Worker no longer knows: start over instead of failing forever
          if (error instanceof ChatError && error.status === 401) {
            set({ token: null, email: null, messages: [], lastSeenId: 0, handler: 'bot', waitingSince: null })
          }
        }
      },

      send: async (text, locale) => {
        const { token, turnstileToken, sending } = get()
        const message = text.trim()
        if (!message || sending) return false
        set({ sending: true, error: null })
        try {
          let handler: Handler
          if (token) {
            const data = await chatApi.send(token, message)
            handler = data.handler
            set((s) => ({ messages: merge(s.messages, [data.message]) }))
          } else {
            if (!turnstileToken) throw new ChatError('captcha_required', 400)
            const data = await chatApi.start(message, locale, turnstileToken)
            handler = data.handler
            set({ token: data.token, messages: data.messages, turnstileToken: null })
          }
          // the assistant answers a moment later; the widget shows it typing meanwhile
          set({ handler, waitingSince: handler === 'bot' ? Date.now() : null })
          return true
        } catch (error) {
          const code = errorCode(error)
          // a captcha token works once, so any failed start needs a new one
          if (!token) set((s) => ({ captchaNonce: s.captchaNonce + 1, turnstileToken: null }))
          set({ error: code })
          return false
        } finally {
          set({ sending: false })
        }
      },

      saveEmail: async (email) => {
        const { token } = get()
        if (!token) return false
        set({ error: null })
        try {
          set({ email: (await chatApi.setEmail(token, email)).email })
          return true
        } catch (error) {
          set({ error: errorCode(error) })
          return false
        }
      },

      markSeen: () => {
        const last = get().messages.at(-1)?.id ?? 0
        if (last > get().lastSeenId) set({ lastSeenId: last })
      },
    }),
    {
      name: 'regame-labs-chat',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ token: s.token, email: s.email, lastSeenId: s.lastSeenId }),
    },
  ),
)
