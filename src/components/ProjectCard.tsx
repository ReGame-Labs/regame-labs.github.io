import { decompDevUrl, repoUrl, type GameVersion, type Project } from '../data/projects'
import { formatDate, formatNumber } from '../lib/i18n'
import { progressKey, useMessages, useSiteStore, type VersionProgress } from '../store/useSiteStore'

function Bar({ label, percent, detail }: { label: string; percent: number; detail?: string }) {
  const value = Math.round(percent * 100) / 100
  return (
    <div className="bar">
      <div className="bar__label">
        <span>{label}</span>
        <span className="mono">{detail ?? `${value}%`}</span>
      </div>
      <div className="bar__track" role="progressbar" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
        <div className="bar__fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

function VersionRow({ project, version, progress }: { project: Project; version: GameVersion; progress: VersionProgress }) {
  const { locale, t } = useMessages()
  const m = progress.measures
  const functionsPercent = m.totalFunctions ? (m.matchedFunctions / m.totalFunctions) * 100 : 0

  return (
    <li className="version">
      <div className="version__head">
        <span className={`region region--${version.region}`}>{t.region[version.region]}</span>
        <a className="mono version__exe" href={decompDevUrl(project, version.exe)} target="_blank" rel="noreferrer">
          {version.exe}
        </a>
        <span className="version__units">
          {version.title && <em>{version.title} · </em>}
          {formatNumber(version.units, locale)} {t.projects.units}
        </span>
      </div>
      <div className="version__bars">
        <Bar label={t.projects.code} percent={m.codePercent} />
        <Bar label={t.projects.data} percent={m.dataPercent} />
        <Bar
          label={t.projects.functions}
          percent={functionsPercent}
          detail={`${formatNumber(m.matchedFunctions, locale)} / ${formatNumber(m.totalFunctions, locale)}`}
        />
      </div>
    </li>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  const { locale, t } = useMessages()
  const progress = useSiteStore((s) => s.progress)
  const rows = project.versions.map((v) => ({ version: v, progress: progress[progressKey(project.repo, v.exe)] }))

  const sources = new Set(rows.map((r) => r.progress.source))
  const liveDate = rows.map((r) => r.progress.date).filter(Boolean).sort().at(-1)
  const status = sources.has('loading')
    ? { kind: 'loading', text: t.projects.loading }
    : sources.has('live') && liveDate
      ? { kind: 'live', text: `${t.projects.live} · ${formatDate(liveDate, locale)}` }
      : { kind: 'snapshot', text: t.projects.snapshot(formatDate(project.snapshot.date, locale)) }

  return (
    <article className="card project">
      <header className="project__head">
        <div>
          <h3>{project.title}</h3>
          <p className="project__meta">
            {project.platform} · {project.year} · <span className="mono">{project.repo}</span>
          </p>
        </div>
        <a className="build-badge" href={`${repoUrl(project)}/actions/workflows/build.yaml`} target="_blank" rel="noreferrer">
          <img src={`${repoUrl(project)}/actions/workflows/build.yaml/badge.svg`} alt="Build status" height="20" />
        </a>
      </header>

      <p className="project__summary">{project.summary[locale]}</p>

      <ul className="chips">
        {project.compilers.map((c) => (
          <li key={c} className="chip" title={t.projects.compiler}>
            {c}
          </li>
        ))}
        <li className="chip chip--muted">
          {project.fakeMatches} / {project.hacks} {t.projects.fakeHacks}
        </li>
      </ul>

      <ul className="versions">
        {rows.map(({ version, progress }) => (
          <VersionRow key={version.exe} project={project} version={version} progress={progress} />
        ))}
      </ul>

      <footer className="project__foot">
        <span className={`status status--${status.kind}`}>{status.text}</span>
        <div className="project__links">
          <a href={repoUrl(project)} target="_blank" rel="noreferrer">
            {t.projects.repo} ↗
          </a>
          <a href={decompDevUrl(project)} target="_blank" rel="noreferrer">
            {t.projects.progress} ↗
          </a>
        </div>
      </footer>
    </article>
  )
}
