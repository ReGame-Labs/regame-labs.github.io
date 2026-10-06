import type { Resource, ResourceCategory } from '../data/resources'
import { useResourceStore } from '../store/useResourceStore'
import { useMessages } from '../store/useSiteStore'

const icons: Record<ResourceCategory, React.ReactNode> = {
  docs: <path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2zM4 5v16M8 7h6" />,
  analysis: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.5-4.5M9 11h4M11 9v4" />
    </>
  ),
  debug: (
    <>
      <rect x="8" y="6" width="8" height="13" rx="4" />
      <path d="M12 10v9M4 13h4M16 13h4M5 7l3 2M19 7l-3 2M5 19l3-2M19 19l-3-2M10 4l1 2M14 4l-1 2" />
    </>
  ),
  matching: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />
    </>
  ),
}

export function ResourceCard({ resource: r, highlighted }: { resource: Resource; highlighted: boolean }) {
  const { locale, t } = useMessages()
  const open = useResourceStore((s) => !!s.expanded[r.id])
  const toggleExpanded = useResourceStore((s) => s.toggleExpanded)
  const detailsId = `resource-${r.id}`

  return (
    <article className={`card resource resource--${r.category}${highlighted ? ' is-highlighted' : ''}`}>
      <header className="resource__head">
        <span className="resource__icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {icons[r.category]}
          </svg>
        </span>
        <div className="resource__title">
          <h3 className="mono">{r.name}</h3>
          <span className="resource__category">
            {t.resources.categories[r.category]}
            {r.stage ? ` · ${t.resources.stages[r.stage].name}` : ` · ${t.resources.reference}`}
          </span>
        </div>
      </header>

      <ul className="resource__tags">
        {r.platforms.map((p) => (
          <li key={p}>{p}</li>
        ))}
        {r.used && <li className="is-used">★ {t.resources.used}</li>}
      </ul>

      <p className="resource__summary">{r.summary[locale]}</p>

      <div id={detailsId} className="resource__details" hidden={!open}>
        <p>{r.details[locale]}</p>
      </div>

      <footer className="resource__foot">
        <button type="button" className="link-button" aria-expanded={open} aria-controls={detailsId} onClick={() => toggleExpanded(r.id)}>
          {open ? t.resources.less : t.resources.more}
          <span className={`chevron${open ? ' is-open' : ''}`} aria-hidden="true">
            ▾
          </span>
        </button>
        <a href={r.url} target="_blank" rel="noreferrer">
          {t.resources.visit} ↗
        </a>
      </footer>
    </article>
  )
}
