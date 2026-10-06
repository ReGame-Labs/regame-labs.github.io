/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the chat Worker; without it the chat widget stays hidden */
  readonly VITE_CHAT_API_URL?: string
  /** Turnstile site key the chat uses before a first message */
  readonly VITE_TURNSTILE_SITE_KEY?: string
  /** The Open Collective page; without it the support links stay hidden */
  readonly VITE_OPENCOLLECTIVE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
