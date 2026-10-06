import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ORG, projects, type Measures } from '../data/projects'
import { DEFAULT_LOCALE, messages, type Locale } from '../lib/i18n'

export type Theme = 'dark' | 'light'

/** live: decomp.dev answered; snapshot: it didn't, so the bundled numbers stand */
export type ProgressSource = 'loading' | 'live' | 'snapshot'

export interface VersionProgress {
  source: ProgressSource
  measures: Measures
  /** Date of the commit decomp.dev measured, for live data */
  date?: string
}

interface SiteState {
  locale: Locale
  theme: Theme
  /** Keyed by `${repo}/${exe}` */
  progress: Record<string, VersionProgress>
  progressRequested: boolean
  setLocale: (locale: Locale) => void
  toggleTheme: () => void
  loadProgress: () => void
}

export const progressKey = (repo: string, exe: string) => `${repo}/${exe}`

interface DecompDevReport {
  commit: { timestamp: string }
  measures: {
    matched_code_percent: number
    matched_data_percent: number
    matched_functions: number
    total_functions: number
  }
}

const fetchVersion = async (repo: string, exe: string): Promise<VersionProgress> => {
  const res = await fetch(`https://decomp.dev/${ORG}/${repo}.json?version=${encodeURIComponent(exe)}`)
  if (!res.ok) throw new Error(`decomp.dev ${res.status}`)
  const { commit, measures: m }: DecompDevReport = await res.json()
  return {
    source: 'live',
    date: commit.timestamp.slice(0, 10),
    measures: {
      codePercent: m.matched_code_percent,
      dataPercent: m.matched_data_percent,
      matchedFunctions: m.matched_functions,
      totalFunctions: m.total_functions,
    },
  }
}

const initialProgress = (): Record<string, VersionProgress> =>
  Object.fromEntries(
    projects.flatMap((p) =>
      p.versions.map((v) => [
        progressKey(p.repo, v.exe),
        { source: 'loading', measures: p.snapshot.measures[v.exe] },
      ]),
    ),
  )

const prefersLight = () =>
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: light)').matches

export const useSiteStore = create<SiteState>()(
  persist(
    (set, get) => ({
      locale: DEFAULT_LOCALE,
      theme: prefersLight() ? 'light' : 'dark',
      progress: initialProgress(),
      progressRequested: false,
      setLocale: (locale) => set({ locale }),
      toggleTheme: () => set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),
      loadProgress: () => {
        if (get().progressRequested) return
        set({ progressRequested: true })
        for (const p of projects) {
          for (const v of p.versions) {
            const key = progressKey(p.repo, v.exe)
            fetchVersion(p.repo, v.exe)
              .then((live) => set((s) => ({ progress: { ...s.progress, [key]: live } })))
              .catch(() =>
                set((s) => ({
                  progress: { ...s.progress, [key]: { ...s.progress[key], source: 'snapshot' } },
                })),
              )
          }
        }
      },
    }),
    {
      name: 'regame-labs-prefs',
      storage: createJSONStorage(() => localStorage),
      // only the viewer's preferences survive a reload; progress is always refetched
      partialize: ({ locale, theme }) => ({ locale, theme }),
    },
  ),
)

export const useMessages = () => {
  const locale = useSiteStore((s) => s.locale)
  return { locale, t: messages[locale] }
}
