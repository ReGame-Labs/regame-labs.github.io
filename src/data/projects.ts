export const ORG = 'ReGame-Labs'

export type Region = 'us' | 'jp' | 'eu'

export interface Measures {
  codePercent: number
  dataPercent: number
  matchedFunctions: number
  totalFunctions: number
}

export interface GameVersion {
  /** Executable name, also the version id decomp.dev uses */
  exe: string
  region: Region
  /** Title of this release, when it differs from the project's */
  title?: string
  units: number
}

export interface Project {
  /** Repository name in the organization */
  repo: string
  title: string
  platform: string
  year: number
  compilers: string[]
  versions: GameVersion[]
  fakeMatches: number
  hacks: number
  summary: { es: string; en: string }
  /** Last numbers published on decomp.dev, shown until live data loads */
  snapshot: { date: string; measures: Record<string, Measures> }
}

const complete = (functions: number): Measures => ({
  codePercent: 100,
  dataPercent: 100,
  matchedFunctions: functions,
  totalFunctions: functions,
})

export const projects: Project[] = [
  {
    repo: 'dcb_decomp',
    title: 'Digimon Digital Card Battle',
    platform: 'PlayStation',
    year: 2000,
    compilers: ['GCC 2.95.2', 'GCC 2.8.1'],
    versions: [
      { exe: 'SLUS_013.28', region: 'us', units: 154 },
      { exe: 'SLPS_025.06', region: 'jp', title: 'Digimon Card Battle', units: 118 },
      { exe: 'SLES_039.00', region: 'eu', units: 167 },
    ],
    fakeMatches: 8,
    hacks: 132,
    summary: {
      es: 'El juego de cartas de Digimon, con sus tres ediciones: el C se compila de nuevo en ejecutables y overlays idénticos byte a byte.',
      en: 'The Digimon card game, all three releases: C source that compiles back into byte-identical executables and overlays.',
    },
    snapshot: {
      date: '2026-10-02',
      measures: {
        'SLUS_013.28': complete(1370),
        'SLPS_025.06': complete(1191),
        'SLES_039.00': complete(1598),
      },
    },
  },
  {
    repo: 'dw3_decomp',
    title: 'Digimon World 3',
    platform: 'PlayStation',
    year: 2002,
    compilers: ['GCC 2.8.1'],
    versions: [
      { exe: 'SLES_039.36', region: 'eu', title: 'Digimon World 2003', units: 357 },
      { exe: 'SLUS_014.36', region: 'us', units: 301 },
    ],
    fakeMatches: 0,
    hacks: 191,
    summary: {
      es: 'El RPG de Digimon para PlayStation: el ejecutable, los overlays y los escenarios se reconstruyen idénticos desde el mismo código C.',
      en: 'The Digimon RPG for the PlayStation: the executable, its overlays and its stages rebuild byte for byte from the same C source.',
    },
    snapshot: {
      date: '2026-10-05',
      measures: {
        'SLES_039.36': complete(3606),
        'SLUS_014.36': complete(3380),
      },
    },
  },
]

export const repoUrl = (p: Project) => `https://github.com/${ORG}/${p.repo}`
export const decompDevUrl = (p: Project, exe?: string) =>
  `https://decomp.dev/${ORG}/${p.repo}${exe ? `/${exe}` : ''}`
