import { ORG } from '../data/projects'
import type { Locale } from '../lib/i18n'
import { heartSprite } from '../lib/pixels'
import { SUPPORT_URL } from '../lib/support'
import { useMessages, useSiteStore } from '../store/useSiteStore'
import { Logo } from './Logo'
import { PixelSprite } from './PixelSprite'

const locales: Locale[] = ['es', 'en']

export function Header() {
  const { locale, t } = useMessages()
  const theme = useSiteStore((s) => s.theme)
  const setLocale = useSiteStore((s) => s.setLocale)
  const toggleTheme = useSiteStore((s) => s.toggleTheme)

  return (
    <header className="header">
      <div className="container header__inner">
        <a className="brand" href="#top">
          <Logo />
          <span>ReGame Labs</span>
        </a>
        <nav className="header__nav">
          <a href="#projects">{t.nav.projects}</a>
          <a href="#approach">{t.nav.approach}</a>
          <a href="#resources">{t.nav.resources}</a>
          <a href={`https://github.com/${ORG}`} target="_blank" rel="noreferrer">
            {t.nav.github}
          </a>
        </nav>
        <div className="header__actions">
          {SUPPORT_URL && (
            <a className="support-link" href={SUPPORT_URL} target="_blank" rel="noreferrer" title={t.support.title}>
              <PixelSprite make={heartSprite} size={16} />
              <span>{t.support.short}</span>
            </a>
          )}
          <div className="segmented" role="group" aria-label={t.language}>
            {locales.map((l) => (
              <button
                key={l}
                type="button"
                aria-pressed={locale === l}
                onClick={() => setLocale(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t.theme.toLight : t.theme.toDark}
            title={theme === 'dark' ? t.theme.toLight : t.theme.toDark}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  )
}

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
)
