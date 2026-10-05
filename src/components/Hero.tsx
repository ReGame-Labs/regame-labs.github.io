import { ORG, projects } from '../data/projects'
import { formatNumber } from '../lib/i18n'
import { useMessages, useSiteStore } from '../store/useSiteStore'

export function Hero() {
  const { locale, t } = useMessages()
  const functions = useSiteStore((s) =>
    Object.values(s.progress).reduce((sum, v) => sum + v.measures.matchedFunctions, 0),
  )
  const releases = projects.reduce((sum, p) => sum + p.versions.length, 0)

  return (
    <section className="hero" id="top">
      <div className="container">
        <p className="eyebrow">{t.hero.eyebrow}</p>
        <h1>{t.hero.title}</h1>
        <p className="hero__lead">{t.hero.lead}</p>
        <div className="hero__ctas">
          <a className="button button--primary" href="#projects">
            {t.hero.ctaProjects}
          </a>
          <a className="button" href={`https://github.com/${ORG}`} target="_blank" rel="noreferrer">
            {t.hero.ctaGithub}
          </a>
        </div>
        <dl className="stats">
          <div>
            <dt>{t.stats.games}</dt>
            <dd>{projects.length}</dd>
          </div>
          <div>
            <dt>{t.stats.releases}</dt>
            <dd>{releases}</dd>
          </div>
          <div>
            <dt>{t.stats.functions}</dt>
            <dd>{formatNumber(functions, locale)}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
