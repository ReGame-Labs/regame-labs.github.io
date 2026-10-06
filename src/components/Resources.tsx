import { useMemo } from 'react'
import type { ResourceCategory } from '../data/resources'
import { filterResources, useResourceStore } from '../store/useResourceStore'
import { useMessages } from '../store/useSiteStore'
import { Constellation } from './Constellation'
import { ResourceCard } from './ResourceCard'

const categories: (ResourceCategory | 'all')[] = ['all', 'docs', 'analysis', 'debug', 'matching', 'projects', 'community']

export function Resources() {
  const { locale, t } = useMessages()
  const category = useResourceStore((s) => s.category)
  const stage = useResourceStore((s) => s.stage)
  const query = useResourceStore((s) => s.query)
  const onlyUsed = useResourceStore((s) => s.onlyUsed)
  const setCategory = useResourceStore((s) => s.setCategory)
  const setQuery = useResourceStore((s) => s.setQuery)
  const toggleOnlyUsed = useResourceStore((s) => s.toggleOnlyUsed)
  const clearFilters = useResourceStore((s) => s.clearFilters)

  const shown = useMemo(
    () => filterResources({ category, stage, query, onlyUsed }, locale),
    [category, stage, query, onlyUsed, locale],
  )
  const filtered = category !== 'all' || stage !== null || query !== '' || onlyUsed

  return (
    <section className="section" id="resources">
      <div className="container">
        <h2>{t.resources.title}</h2>
        <p className="section__lead">{t.resources.lead}</p>

        <Constellation />

        <div className="toolbar">
          <div className="toolbar__filters" role="group" aria-label={t.resources.title}>
            {categories.map((c) => (
              <button key={c} type="button" className="filter" aria-pressed={category === c} onClick={() => setCategory(c)}>
                {c === 'all' ? t.resources.all : t.resources.categories[c]}
              </button>
            ))}
          </div>
          <div className="toolbar__right">
            <label className="toggle">
              <input type="checkbox" checked={onlyUsed} onChange={toggleOnlyUsed} />
              <span className="toggle__track" aria-hidden="true" />
              {t.resources.onlyUsed}
            </label>
            <input
              className="search"
              type="search"
              value={query}
              placeholder={t.resources.search}
              aria-label={t.resources.search}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="toolbar__status" aria-live="polite">
          <span>{t.resources.count(shown.length)}</span>
          {stage && <span className="chip">{t.resources.stages[stage].name}</span>}
          {filtered && (
            <button type="button" className="link-button" onClick={clearFilters}>
              {t.resources.clear}
            </button>
          )}
        </div>

        {shown.length ? (
          <div className="resources">
            {shown.map((r) => (
              <ResourceCard key={r.id} resource={r} highlighted={stage !== null && r.stage === stage} />
            ))}
          </div>
        ) : (
          <p className="resources__empty">{t.resources.empty}</p>
        )}
      </div>
    </section>
  )
}
