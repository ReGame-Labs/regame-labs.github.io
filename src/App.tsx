import { useEffect } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ProjectCard } from './components/ProjectCard'
import { projects } from './data/projects'
import { useMessages, useSiteStore } from './store/useSiteStore'

const year = new Date().getFullYear()

export default function App() {
  const { locale, t } = useMessages()
  const theme = useSiteStore((s) => s.theme)
  const loadProgress = useSiteStore((s) => s.loadProgress)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  useEffect(loadProgress, [loadProgress])

  return (
    <>
      <Header />
      <main>
        <Hero />

        <section className="section" id="projects">
          <div className="container">
            <h2>{t.projects.title}</h2>
            <p className="section__lead">{t.projects.lead}</p>
            <div className="projects">
              {projects.map((p) => (
                <ProjectCard key={p.repo} project={p} />
              ))}
            </div>
          </div>
        </section>

        <section className="section section--alt" id="approach">
          <div className="container">
            <h2>{t.approach.title}</h2>
            <div className="approach">
              {t.approach.items.map((item, i) => (
                <div className="card approach__item" key={item.title}>
                  <span className="approach__index mono">0{i + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <p>{t.footer.note}</p>
          <p className="footer__muted">
            {t.footer.trademarks} © {year} ReGame Labs
          </p>
        </div>
      </footer>
    </>
  )
}
