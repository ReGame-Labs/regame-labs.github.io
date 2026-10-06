import type { Region } from '../data/projects'

export type Locale = 'es' | 'en'

const es = {
  nav: { projects: 'Proyectos', approach: 'Cómo trabajamos', github: 'GitHub' },
  hero: {
    eyebrow: 'Decompilación de PlayStation',
    title: 'Devolvemos los clásicos a su código fuente.',
    lead: 'ReGame Labs reconstruye juegos de PlayStation en C que, al compilarse con las herramientas originales, produce los mismos binarios byte a byte.',
    ctaProjects: 'Ver proyectos',
    ctaGithub: 'Organización en GitHub',
  },
  stats: { games: 'juegos', releases: 'ediciones', functions: 'funciones en C' },
  projects: {
    title: 'Proyectos',
    lead: 'Cada edición se compila desde el mismo código y se compara contra el ejecutable original.',
    code: 'Código',
    data: 'Datos',
    functions: 'Funciones',
    units: 'unidades',
    compiler: 'Compilador',
    fakeHacks: 'fake matches / hacks',
    repo: 'Repositorio',
    progress: 'Progreso',
    live: 'En vivo desde decomp.dev',
    loading: 'Consultando decomp.dev…',
    snapshot: (date: string) => `Último dato publicado · ${date}`,
  },
  approach: {
    title: 'Cómo trabajamos',
    items: [
      {
        title: 'Matching, no aproximado',
        body: 'Cada función se escribe en C hasta que el compilador de la época genera exactamente las mismas instrucciones. El build compara el resultado con el SHA-1 del original.',
      },
      {
        title: 'Sin datos del juego',
        body: 'Los repositorios contienen solo código y herramientas. Para compilar necesitas tu propia copia del juego.',
      },
      {
        title: 'Varias ediciones, un código',
        body: 'Las ediciones de EE. UU., Japón y Europa se compilan desde el mismo árbol de fuentes, con las diferencias marcadas por versión.',
      },
      {
        title: 'Progreso medible',
        body: 'objdiff mide cada build y decomp.dev publica el avance de código, datos y funciones de cada edición.',
      },
    ],
  },
  footer: {
    note: 'Proyectos de preservación y estudio. No distribuimos datos ni binarios de los juegos.',
    trademarks: 'Los nombres de los juegos son marcas de sus respectivos dueños.',
  },
  region: { us: 'EE. UU.', jp: 'Japón', eu: 'Europa' } satisfies Record<Region, string>,
  theme: { toLight: 'Cambiar a tema claro', toDark: 'Cambiar a tema oscuro' },
  language: 'Idioma',
}

export type Messages = typeof es

const en: Messages = {
  nav: { projects: 'Projects', approach: 'How we work', github: 'GitHub' },
  hero: {
    eyebrow: 'PlayStation decompilation',
    title: 'Bringing the classics back to source.',
    lead: 'ReGame Labs rebuilds PlayStation games as C source that, compiled with the original tools, produces the very same binaries, byte for byte.',
    ctaProjects: 'See projects',
    ctaGithub: 'Organization on GitHub',
  },
  stats: { games: 'games', releases: 'releases', functions: 'functions in C' },
  projects: {
    title: 'Projects',
    lead: 'Every release builds from the same source and is checked against the original executable.',
    code: 'Code',
    data: 'Data',
    functions: 'Functions',
    units: 'units',
    compiler: 'Compiler',
    fakeHacks: 'fake matches / hacks',
    repo: 'Repository',
    progress: 'Progress',
    live: 'Live from decomp.dev',
    loading: 'Asking decomp.dev…',
    snapshot: (date: string) => `Last published numbers · ${date}`,
  },
  approach: {
    title: 'How we work',
    items: [
      {
        title: 'Matching, not approximate',
        body: 'Every function is written in C until the period compiler emits exactly the same instructions. The build checks the result against the original SHA-1.',
      },
      {
        title: 'No game data',
        body: 'The repositories hold only code and tools. You need your own copy of the game to build.',
      },
      {
        title: 'Several releases, one source',
        body: 'The USA, Japan and Europe releases build from the same source tree, with the differences marked per version.',
      },
      {
        title: 'Measurable progress',
        body: 'objdiff measures every build and decomp.dev publishes the code, data and function progress of each release.',
      },
    ],
  },
  footer: {
    note: 'Preservation and research projects. We distribute no game data or binaries.',
    trademarks: 'Game titles are trademarks of their respective owners.',
  },
  region: { us: 'USA', jp: 'Japan', eu: 'Europe' },
  theme: { toLight: 'Switch to light theme', toDark: 'Switch to dark theme' },
  language: 'Language',
}

export const messages: Record<Locale, Messages> = { es, en }

export const detectLocale = (): Locale =>
  typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'

export const formatDate = (iso: string, locale: Locale) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString(locale === 'es' ? 'es' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

export const formatNumber = (n: number, locale: Locale) =>
  n.toLocaleString(locale === 'es' ? 'es' : 'en-US')
