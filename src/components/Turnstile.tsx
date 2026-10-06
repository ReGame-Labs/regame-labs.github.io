import { useEffect, useRef } from 'react'
import { TURNSTILE_SITE_KEY } from '../lib/chatApi'
import type { Locale } from '../lib/i18n'

interface TurnstileApi {
  render: (el: HTMLElement, options: Record<string, unknown>) => string
  remove: (id: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

let script: Promise<TurnstileApi> | null = null

/** Loads Cloudflare's script once, only when someone is about to write */
function loadTurnstile(): Promise<TurnstileApi> {
  script ??= new Promise((resolve, reject) => {
    const el = document.createElement('script')
    el.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    el.async = true
    el.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error('turnstile missing')))
    el.onerror = () => {
      script = null
      reject(new Error('turnstile failed to load'))
    }
    document.head.appendChild(el)
  })
  return script
}

/** The captcha a first message needs; it only asks the visitor anything when Cloudflare is unsure */
export function Turnstile({ locale, theme, onToken }: { locale: Locale; theme: 'dark' | 'light'; onToken: (token: string | null) => void }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let id: string | null = null
    let cancelled = false
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !ref.current) return
        id = turnstile.render(ref.current, {
          sitekey: TURNSTILE_SITE_KEY,
          appearance: 'interaction-only',
          theme,
          language: locale,
          callback: (token: string) => onToken(token),
          'expired-callback': () => onToken(null),
          'error-callback': () => onToken(null),
        })
      })
      .catch(() => onToken(null))
    return () => {
      cancelled = true
      if (id) window.turnstile?.remove(id)
    }
  }, [locale, theme, onToken])

  return <div className="turnstile" ref={ref} />
}
