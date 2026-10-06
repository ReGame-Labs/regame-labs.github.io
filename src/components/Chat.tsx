import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { chatEnabled } from '../lib/chatApi'
import { bubbleSprite } from '../lib/pixels'
import { unreadCount, useChatStore } from '../store/useChatStore'
import { useMessages, useSiteStore } from '../store/useSiteStore'
import { Logo } from './Logo'
import { PixelSprite } from './PixelSprite'
import { Turnstile } from './Turnstile'

const OPEN_POLL_MS = 4000
const CLOSED_POLL_MS = 60000

/** Asks the Worker for news on an interval, but never while the tab is hidden */
function usePolling() {
  const open = useChatStore((s) => s.open)
  const hasConversation = useChatStore((s) => s.token !== null)
  const refresh = useChatStore((s) => s.refresh)

  useEffect(() => {
    // a closed chat without a conversation has nothing to wait for
    if (!open && !hasConversation) return
    const tick = () => {
      if (!document.hidden) void refresh()
    }
    tick()
    const id = setInterval(tick, open ? OPEN_POLL_MS : CLOSED_POLL_MS)
    document.addEventListener('visibilitychange', tick)
    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', tick)
    }
  }, [open, hasConversation, refresh])
}

function EmailForm() {
  const { t } = useMessages()
  const email = useChatStore((s) => s.email)
  const saveEmail = useChatStore((s) => s.saveEmail)
  const [value, setValue] = useState('')

  if (email) {
    return (
      <p className="chat__email">
        {t.chat.emailSaved(email)}{' '}
        <button type="button" className="link-button" onClick={() => void saveEmail(null)}>
          {t.chat.emailRemove}
        </button>
      </p>
    )
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (await saveEmail(value)) setValue('')
  }

  return (
    <form className="chat__email" onSubmit={submit}>
      <label htmlFor="chat-email">{t.chat.emailPrompt}</label>
      <div className="chat__email-row">
        <input
          id="chat-email"
          className="chat__input"
          type="email"
          autoComplete="email"
          required
          value={value}
          placeholder={t.chat.emailPlaceholder}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="chat__mini-button">
          {t.chat.emailSave}
        </button>
      </div>
    </form>
  )
}

function ChatPanel() {
  const { locale, t } = useMessages()
  const theme = useSiteStore((s) => s.theme)
  const messages = useChatStore((s) => s.messages)
  const online = useChatStore((s) => s.online)
  const hasConversation = useChatStore((s) => s.token !== null)
  const sending = useChatStore((s) => s.sending)
  const error = useChatStore((s) => s.error)
  const turnstileToken = useChatStore((s) => s.turnstileToken)
  const captchaNonce = useChatStore((s) => s.captchaNonce)
  const setOpen = useChatStore((s) => s.setOpen)
  const setTurnstileToken = useChatStore((s) => s.setTurnstileToken)
  const send = useChatStore((s) => s.send)
  const markSeen = useChatStore((s) => s.markSeen)

  const [draft, setDraft] = useState('')
  const listRef = useRef<HTMLOListElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const onToken = useCallback((token: string | null) => setTurnstileToken(token), [setTurnstileToken])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    markSeen()
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
  }, [messages, markSeen])

  const waitingForCaptcha = !hasConversation && !turnstileToken

  const submit = async (e?: FormEvent) => {
    e?.preventDefault()
    if (waitingForCaptcha) return
    if (await send(draft, locale)) setDraft('')
  }

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      void submit()
    }
  }

  const time = (ms: number) =>
    new Date(ms).toLocaleTimeString(locale === 'es' ? 'es' : 'en-US', { hour: 'numeric', minute: '2-digit' })

  return (
    <section className="chat__panel card" role="dialog" aria-label={t.chat.title}>
      <header className="chat__head">
        <Logo size={28} />
        <div>
          <h2 className="chat__title">{t.chat.title}</h2>
          <p className={`chat__status${online ? ' is-online' : ''}`}>
            <span className="chat__dot" aria-hidden="true" />
            {online ? t.chat.online : t.chat.away}
          </p>
        </div>
        <button type="button" className="icon-button chat__close" aria-label={t.chat.close} onClick={() => setOpen(false)}>
          ✕
        </button>
      </header>

      <ol className="chat__messages" ref={listRef} aria-live="polite">
        <li className="chat__message is-owner">
          <p>{t.chat.greeting}</p>
        </li>
        {messages.map((m) => (
          <li key={m.id} className={`chat__message is-${m.sender}`}>
            <p>{m.body}</p>
            <time dateTime={new Date(m.createdAt).toISOString()}>
              {m.sender === 'visitor' ? `${t.chat.you} · ` : ''}
              {time(m.createdAt)}
            </time>
          </li>
        ))}
      </ol>

      <div className="chat__foot">
        {hasConversation && !online && <EmailForm />}
        {!hasConversation && <p className="chat__note">{t.chat.privacy}</p>}
        {!hasConversation && <Turnstile key={captchaNonce} locale={locale} theme={theme} onToken={onToken} />}
        {error && (
          <p className="chat__error" role="alert">
            {t.chat.errors[error] ?? t.chat.errors.generic}
          </p>
        )}

        <form className="chat__compose" onSubmit={submit}>
          <textarea
            ref={inputRef}
            className="chat__input"
            rows={2}
            maxLength={2000}
            value={draft}
            placeholder={t.chat.placeholder}
            aria-label={t.chat.placeholder}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <button type="submit" className="button button--primary chat__send" disabled={sending || waitingForCaptcha || !draft.trim()}>
            {sending ? t.chat.sending : t.chat.send}
          </button>
        </form>
        {waitingForCaptcha && draft.trim() && <p className="chat__note">{t.chat.verifying}</p>}
      </div>
    </section>
  )
}

function ChatWidget() {
  const { t } = useMessages()
  const open = useChatStore((s) => s.open)
  const unread = useChatStore(unreadCount)
  const setOpen = useChatStore((s) => s.setOpen)
  usePolling()

  useEffect(() => {
    if (!open) return
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  return (
    <div className="chat">
      {open && <ChatPanel />}
      <button
        type="button"
        className={`chat__toggle${open ? ' is-open' : ''}`}
        aria-label={open ? t.chat.close : t.chat.open}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <PixelSprite make={bubbleSprite} size={34} />
        {!open && unread > 0 && <span className="chat__badge">{unread}</span>}
      </button>
    </div>
  )
}

/** Renders nothing until the site is built with the chat Worker's URL */
export function Chat() {
  return chatEnabled ? <ChatWidget /> : null
}
